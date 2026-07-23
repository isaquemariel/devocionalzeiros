import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { createClient } from 'npm:@supabase/supabase-js@2';
import Stripe from 'npm:stripe@17';

const PRICES: Record<string, Record<string, { amount: number; interval: 'month' | 'year' }>> = {
  gold: {
    monthly: { amount: 1490, interval: 'month' },
    annual: { amount: 14990, interval: 'year' },
  },
  premium: {
    monthly: { amount: 2990, interval: 'month' },
    annual: { amount: 24990, interval: 'year' },
  },
};

const PLAN_NAMES: Record<string, string> = {
  gold: 'Devocionalzeiros Gold',
  premium: 'Devocionalzeiros Premium',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'missing_auth' }), { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const anonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    const supabaseAuth = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: userData, error: userErr } = await supabaseAuth.auth.getUser();
    if (userErr || !userData.user) {
      return new Response(JSON.stringify({ error: 'invalid_auth' }), { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }
    const user = userData.user;
    const email = user.email;
    if (!email) {
      return new Response(JSON.stringify({ error: 'missing_email' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const body = await req.json().catch(() => ({}));
    const plan = body?.plan as string;
    const period = body?.period as string;

    if (!PRICES[plan] || !PRICES[plan][period]) {
      return new Response(JSON.stringify({ error: 'invalid_input' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const priceCfg = PRICES[plan][period];
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, { apiVersion: '2024-11-20.acacia' });
    const admin = createClient(supabaseUrl, serviceKey);

    let customerId: string | null = null;
    const { data: existing } = await admin
      .from('stripe_customers')
      .select('customer_id')
      .eq('user_id', user.id)
      .maybeSingle();
    if (existing?.customer_id) {
      customerId = existing.customer_id as string;
    } else {
      const customer = await stripe.customers.create({ email, metadata: { user_id: user.id } });
      customerId = customer.id;
      await admin.from('stripe_customers').upsert({ user_id: user.id, customer_id: customerId });
    }

    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      mode: 'subscription',
      customer: customerId!,
      redirect_on_completion: 'never',
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'brl',
            unit_amount: priceCfg.amount,
            recurring: { interval: priceCfg.interval },
            product_data: {
              name: `${PLAN_NAMES[plan]} (${period === 'annual' ? 'Anual' : 'Mensal'})`,
            },
          },
        },
      ],
      allow_promotion_codes: true,
      metadata: { user_id: user.id, email, plan, period },
      subscription_data: { metadata: { user_id: user.id, email, plan, period } },
    });

    return new Response(JSON.stringify({ clientSecret: session.client_secret, sessionId: session.id }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (e) {
    console.error('create-subscription-checkout error', e);
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
