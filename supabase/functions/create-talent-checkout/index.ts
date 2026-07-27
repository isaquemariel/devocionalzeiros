// Checkout para COMPRAR TALENTOS (moeda do jogo). R$ 1 = 20 talentos.
// O usuário escolhe o valor em R$; o webhook credita os talentos após o pagamento.
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { createClient } from 'npm:@supabase/supabase-js@2';
import Stripe from 'npm:stripe@17';

const TALENTS_PER_BRL = 20; // R$ 1 = 20 talentos

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

    const supabaseAuth = createClient(supabaseUrl, anonKey, { global: { headers: { Authorization: authHeader } } });
    const { data: userData, error: userErr } = await supabaseAuth.auth.getUser();
    if (userErr || !userData.user) {
      return new Response(JSON.stringify({ error: 'invalid_auth' }), { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }
    const user = userData.user;
    const email = user.email ?? '';

    const body = await req.json().catch(() => ({}));
    const amount = Number(body?.amount); // centavos de BRL
    if (!Number.isFinite(amount) || amount < 500 || amount > 1000000) {
      return new Response(JSON.stringify({ error: 'invalid_amount' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }
    // talentos = reais * 20 (piso). amount está em centavos → /100 * 20 = /5.
    const talents = Math.floor(amount / 5);

    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, { apiVersion: '2024-11-20.acacia' });
    const admin = createClient(supabaseUrl, serviceKey);

    let customerId: string | undefined;
    const { data: existing } = await admin.from('stripe_customers').select('customer_id').eq('user_id', user.id).maybeSingle();
    if (existing?.customer_id) {
      customerId = existing.customer_id as string;
    } else if (email) {
      const customer = await stripe.customers.create({ email, metadata: { user_id: user.id } });
      customerId = customer.id;
      await admin.from('stripe_customers').upsert({ user_id: user.id, customer_id: customerId });
    }

    const meta = { user_id: user.id, email, tipo: 'talents', talents: String(talents) };
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      mode: 'payment',
      payment_method_types: ['card'],
      customer: customerId,
      redirect_on_completion: 'never',
      line_items: [{
        quantity: 1,
        price_data: {
          currency: 'brl',
          unit_amount: Math.round(amount),
          product_data: { name: `${talents} Talentos — Devocionalzeiros` },
        },
      }],
      metadata: meta,
      payment_intent_data: { metadata: meta },
    });

    return new Response(JSON.stringify({
      clientSecret: session.client_secret,
      sessionId: session.id,
      publishableKey: Deno.env.get('STRIPE_PUBLIC_KEY') ?? '',
    }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  } catch (e) {
    console.error('create-talent-checkout error', e);
    return new Response(JSON.stringify({ error: (e as Error).message }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});
