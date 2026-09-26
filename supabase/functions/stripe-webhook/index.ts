import { corsHeaders } from '../_shared/cors.ts';
import { createClient } from 'npm:@supabase/supabase-js@2';
import Stripe from 'npm:stripe@17';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, { apiVersion: '2024-11-20.acacia' as Stripe.LatestApiVersion });
const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET') ?? '';

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const admin = createClient(supabaseUrl, serviceKey);


/**
 * Grava o plano no registro da compra (um por e-mail).
 *
 * - Erro de banco LANÇA: o handler responde 500 e o Stripe reenvia o evento
 *   (as operações são idempotentes). Antes o erro era engolido, o Stripe
 *   recebia 200 e o pagante ficava sem plano para sempre.
 * - Desativar só vale para o registro QUE VEIO DESTA assinatura do Stripe:
 *   cancelar a assinatura não derruba um plano da Kiwify, vitalício ou dado
 *   pelo admin no mesmo e-mail.
 * - Sem `plan` no evento, mantém o plano que já está gravado (nunca rebaixa
 *   um Premium para Gold por falta de metadado).
 */
async function grantPlan(opts: {
  email: string;
  userId?: string | null;
  plan?: string | null;
  status: 'active' | 'inactive';
  amountPaid?: number;
  transactionId?: string | null;
  paymentMethod?: string;
}) {
  const email = opts.email.toLowerCase();
  const now = new Date().toISOString();

  const { data: existing, error: selErr } = await admin
    .from('authorized_purchases')
    .select('id, amount_paid, plan_type, status, transaction_id, payment_method')
    .eq('email', email)
    .maybeSingle();
  if (selErr) throw selErr;

  if (opts.status === 'inactive' && existing) {
    const desteStripe = (existing.payment_method ?? 'stripe') === 'stripe'
      && (!existing.transaction_id || !opts.transactionId || existing.transaction_id === opts.transactionId);
    if (!desteStripe) {
      console.log('inactive ignorado: o registro é de outra origem/assinatura', existing.id);
      return;
    }
  }

  const plano = opts.plan || existing?.plan_type || 'gold';
  const payload: Record<string, unknown> = {
    email,
    plan_type: plano,
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
    const { error } = await admin.from('authorized_purchases').update(payload).eq('id', existing.id);
    if (error) throw error;
  } else {
    payload.purchased_at = now;
    payload.product_name = `Stripe ${plano}`;
    const { error } = await admin.from('authorized_purchases').insert(payload);
    if (error) throw error;
  }
}

/**
 * De quem é este cliente do Stripe. Vale PRIMEIRO o vínculo do servidor
 * (`stripe_customers.user_id` → e-mail da conta): o e-mail do cliente no
 * Stripe pode ser editado por ele no portal, e usá-lo primeiro deixaria alguém
 * cancelar ou dar plano ao e-mail de outra pessoa.
 */
async function userInfoFromCustomer(customerId: string): Promise<{ email: string; userId: string | null } | null> {
  const { data: row, error } = await admin
    .from('stripe_customers')
    .select('user_id')
    .eq('customer_id', customerId)
    .maybeSingle();
  if (error) throw error;
  const userId = row?.user_id ?? null;
  let email = '';
  if (userId) {
    const { data: u } = await admin.auth.admin.getUserById(userId);
    email = u?.user?.email ?? '';
  }
  if (!email) {
    try {
      const customer = await stripe.customers.retrieve(customerId);
      if (!('deleted' in customer)) email = (customer as Stripe.Customer).email ?? '';
    } catch (_) { /* noop */ }
  }
  if (!email) return null;
  return { email, userId };
}

/**
 * O Stripe não garante a ordem dos eventos: um `subscription.updated` antigo
 * pode chegar depois do `deleted` e reativar o plano. Por isso o estado vem
 * sempre da assinatura como ela está AGORA no Stripe, não do evento.
 */
async function assinaturaAtual(subId: string, doEvento?: Stripe.Subscription): Promise<Stripe.Subscription | null> {
  try {
    return await stripe.subscriptions.retrieve(subId);
  } catch (e) {
    console.warn('não consegui reler a assinatura', subId, (e as Error).message);
    return doEvento ?? null;
  }
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

        if (meta.tipo === 'talents') {
          const userId = meta.user_id;
          const talents = parseInt(meta.talents || '0', 10);
          if (userId && talents > 0) {
            // idempotente por 'purchase:<session>' (não credita 2x o mesmo pagamento)
            const { error } = await admin.rpc('credit_talents', {
              p_user_id: userId, p_amount: talents, p_source: `purchase:${session.id}`,
            });
            // falhou: 500 e o Stripe reenvia (o crédito é idempotente)
            if (error) throw error;
            console.log('talents credited', userId, talents, session.id);
          }
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
      case 'customer.subscription.created':
      case 'customer.subscription.deleted': {
        const doEvento = event.data.object as Stripe.Subscription;
        const sub = await assinaturaAtual(doEvento.id, doEvento);
        if (!sub) break;
        const meta = (sub.metadata ?? {}) as Record<string, string>;
        const info = await userInfoFromCustomer(sub.customer as string);
        if (!info) break;
        const active = ['active', 'trialing', 'past_due'].includes(sub.status);
        await grantPlan({
          email: info.email,
          userId: info.userId || meta.user_id || null,
          plan: meta.plan || null,
          status: active ? 'active' : 'inactive',
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
        let plan: string | null = null;
        let userId = info.userId;
        if (subId) {
          const sub = await assinaturaAtual(subId);
          // fatura paga de uma assinatura que já foi cancelada: não reativa
          if (sub && !['active', 'trialing', 'past_due'].includes(sub.status)) break;
          const meta = (sub?.metadata ?? {}) as Record<string, string>;
          if (meta.plan) plan = meta.plan;
          if (!userId && meta.user_id) userId = meta.user_id;
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
    return new Response(JSON.stringify({ error: 'handler_failed' }), { status: 500 });
  }
});
