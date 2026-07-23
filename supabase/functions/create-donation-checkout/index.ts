import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { createClient } from 'npm:@supabase/supabase-js@2';
import Stripe from 'npm:stripe@17';

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
    const email = user.email ?? '';

    const body = await req.json().catch(() => ({}));
    const amount = Number(body?.amount);
    const returnUrl = body?.returnUrl as string;

    if (!Number.isFinite(amount) || amount < 500 || amount > 1000000) {
      return new Response(JSON.stringify({ error: 'invalid_amount' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }
    if (!returnUrl || typeof returnUrl !== 'string') {
      return new Response(JSON.stringify({ error: 'invalid_return_url' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, { apiVersion: '2024-11-20.acacia' });
    const admin = createClient(supabaseUrl, serviceKey);

    // Reuse Stripe customer if exists
    let customerId: string | undefined;
    const { data: existing } = await admin
      .from('stripe_customers')
      .select('customer_id')
      .eq('user_id', user.id)
      .maybeSingle();
    if (existing?.customer_id) {
      customerId = existing.customer_id as string;
    } else if (email) {
      const customer = await stripe.customers.create({ email, metadata: { user_id: user.id } });
      customerId = customer.id;
      await admin.from('stripe_customers').upsert({ user_id: user.id, customer_id: customerId });
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer: customerId,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'brl',
            unit_amount: Math.round(amount),
            product_data: { name: 'Doação — Devocionalzeiros' },
          },
        },
      ],
      metadata: { user_id: user.id, email, tipo: 'doacao' },
      payment_intent_data: {
        metadata: { user_id: user.id, email, tipo: 'doacao' },
      },
      success_url: `${returnUrl}?doacao=sucesso`,
      cancel_url: `${returnUrl}?doacao=cancelada`,
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (e) {
    console.error('create-donation-checkout error', e);
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
