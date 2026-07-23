import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { createClient } from 'npm:@supabase/supabase-js@2';
import Stripe from 'npm:stripe@17';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, { apiVersion: '2024-11-20.acacia' });
const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET') ?? '';

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const admin = createClient(supabaseUrl, serviceKey);

async function grantPlan(opts: {
  email: string;
  userId?: string | null;
  plan: string;
  status: 'active' | 'inactive';
  amountPaid?: number;
  transactionId?: string | null;
  paymentMethod?: string;
}) {
  const email = opts.email.toLowerCase();
  const now = new Date().toISOString();

  const { data: existing } = await admin
    .from('authorized_purchases')
    .select('id, amount_paid')
    .eq('email', email)
    .maybeSingle();

  const payload: Record<string, unknown> = {
    email,
    plan_type: opts.plan,
    status: opts.status,
    updated_at: now,
    last_event_at: now,
    last_event_type: opts.status === 'active' ? 'stripe_active' : 'stripe_inactive',
    payment_method: opts.paymentMethod ?? 'stripe',
  };
  if (opts.userId) payload.user_id = opts.userId;
  if (opts.transactionId) payload.transaction_id = opts.transactionId;
  if (opts.amountPaid && opts.amountPaid > 0) payload.amount_paid = opts.amountPaid;

  if (existing?.id) {
    await admin.from('authorized_purchases').update(payload).eq('id', existing.id);
  } else {
    payload.purchased_at = now;
    payload.product_name = `Stripe ${opts.plan}`;
    await admin.from('authorized_purchases').insert(payload);
  }
}

async function userInfoFromCustomer(customerId: string): Promise<{ email: string; userId: string | null } | null> {
  const { data: row } = await admin
    .from('stripe_customers')
    .select('user_id')
    .eq('customer_id', customerId)
    .maybeSingle();
  let userId = row?.user_id ?? null;
  let email = '';
  try {
    const customer = await stripe.customers.retrieve(customerId);
    if (!('deleted' in customer)) email = (customer as Stripe.Customer).email ?? '';
  } catch (_) { /* noop */ }
  if (!email && userId) {
    const { data: u } = await admin.auth.admin.getUserById(userId);
    email = u?.user?.email ?? '';
  }
  if (!email) return null;
  return { email, userId };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return new Response('method not allowed', { status: 405 });

  const sig = req.headers.get('stripe-signature');
  if (!sig || !webhookSecret) {
    return new Response(JSON.stringify({ error: 'missing_signature_or_secret' }), { status: 400 });
  }

  const raw = await req.text();
  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(raw, sig, webhookSecret);
  } catch (e) {
    console.error('signature verification failed', (e as Error).message);
    return new Response(JSON.stringify({ error: 'invalid_signature' }), { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const meta = (session.metadata ?? {}) as Record<string, string>;

        if (meta.tipo === 'doacao') {
          console.log('donation completed', session.id, session.amount_total);
          break;
        }

        if (session.mode === 'subscription') {
          const email = (meta.email || session.customer_details?.email || '').toLowerCase();
          const plan = meta.plan;
          if (!email || !plan) break;
          await grantPlan({
            email,
            userId: meta.user_id || null,
            plan,
            status: 'active',
            amountPaid: (session.amount_total ?? 0) / 100,
            transactionId: (session.subscription as string) || session.id,
          });
        }
        break;
      }

      case 'customer.subscription.updated':
      case 'customer.subscription.created': {
        const sub = event.data.object as Stripe.Subscription;
        const meta = (sub.metadata ?? {}) as Record<string, string>;
        const info = await userInfoFromCustomer(sub.customer as string);
        if (!info) break;
        const plan = meta.plan || 'gold';
        const active = ['active', 'trialing', 'past_due'].includes(sub.status);
        await grantPlan({
          email: info.email,
          userId: meta.user_id || info.userId,
          plan,
          status: active ? 'active' : 'inactive',
          transactionId: sub.id,
        });
        break;
      }

      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription;
        const meta = (sub.metadata ?? {}) as Record<string, string>;
        const info = await userInfoFromCustomer(sub.customer as string);
        if (!info) break;
        await grantPlan({
          email: info.email,
          userId: meta.user_id || info.userId,
          plan: meta.plan || 'gold',
          status: 'inactive',
          transactionId: sub.id,
        });
        break;
      }

      case 'invoice.paid': {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId = invoice.customer as string;
        if (!customerId) break;
        const info = await userInfoFromCustomer(customerId);
        if (!info) break;
        // Pull latest subscription metadata for plan
        const subId = (invoice.subscription as string) || null;
        let plan = 'gold';
        let userId = info.userId;
        if (subId) {
          try {
            const sub = await stripe.subscriptions.retrieve(subId);
            const meta = (sub.metadata ?? {}) as Record<string, string>;
            if (meta.plan) plan = meta.plan;
            if (meta.user_id) userId = meta.user_id;
          } catch (_) { /* noop */ }
        }
        await grantPlan({
          email: info.email,
          userId,
          plan,
          status: 'active',
          amountPaid: (invoice.amount_paid ?? 0) / 100,
          transactionId: subId || invoice.id,
        });
        break;
      }

      case 'invoice.payment_failed': {
        console.log('invoice.payment_failed', (event.data.object as Stripe.Invoice).id);
        break;
      }

      default:
        console.log('unhandled event', event.type);
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    console.error('webhook handler error', e);
    return new Response(JSON.stringify({ error: (e as Error).message }), { status: 500 });
  }
});
