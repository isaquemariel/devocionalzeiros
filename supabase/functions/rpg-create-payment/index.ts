import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import Stripe from "https://esm.sh/stripe@17.5.0?target=deno";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const PRICES: Record<string, number> = {
  "head:cap": 190,
  "head:hat": 190,
  "robe:pilgrim": 490,
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  try {
    const authHeader = req.headers.get("Authorization") ?? "";
    if (!authHeader.startsWith("Bearer ")) return json({ error: "Missing auth" }, 401);

    const supaUrl = Deno.env.get("SUPABASE_URL")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const stripeSecret = Deno.env.get("STRIPE_SECRET_KEY");
    const stripePublic = Deno.env.get("STRIPE_PUBLIC_KEY");
    if (!stripeSecret || !stripePublic) return json({ error: "Stripe keys not configured" }, 500);

    const userClient = createClient(supaUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: userData, error: userErr } = await userClient.auth.getUser();
    if (userErr || !userData?.user) return json({ error: "Unauthorized" }, 401);
    const user = userData.user;

    const body = await req.json().catch(() => ({}));
    const cosmeticId = String(body?.cosmeticId ?? "");
    const amount = PRICES[cosmeticId];
    if (!amount) return json({ error: "Invalid cosmeticId" }, 400);

    const admin = createClient(supaUrl, serviceKey);
    const stripe = new Stripe(stripeSecret, { apiVersion: "2024-11-20.acacia" });

    // Get or create Stripe customer
    let customerId: string | null = null;
    const { data: existing } = await admin
      .from("stripe_customers")
      .select("customer_id")
      .eq("user_id", user.id)
      .maybeSingle();
    if (existing?.customer_id) {
      customerId = existing.customer_id;
    } else {
      const customer = await stripe.customers.create({
        email: user.email ?? undefined,
        metadata: { user_id: user.id },
      });
      customerId = customer.id;
      await admin
        .from("stripe_customers")
        .upsert({ user_id: user.id, customer_id: customerId, updated_at: new Date().toISOString() });
    }

    const pi = await stripe.paymentIntents.create({
      amount,
      currency: "brl",
      customer: customerId,
      setup_future_usage: "off_session",
      metadata: { user_id: user.id, cosmetic_id: cosmeticId },
      // Só cartão (+ Apple/Google Pay). Sem boleto.
      payment_method_types: ["card"],
    });

    let customerSessionClientSecret: string | null = null;
    try {
      // deno-lint-ignore no-explicit-any
      const cs = await (stripe as any).customerSessions.create({
        customer: customerId,
        components: {
          payment_element: {
            enabled: true,
            features: {
              payment_method_save: "enabled",
              payment_method_redisplay: "enabled",
              payment_method_remove: "enabled",
            },
          },
        },
      });
      customerSessionClientSecret = cs.client_secret ?? null;
    } catch (_e) {
      customerSessionClientSecret = null;
    }

    return json({
      clientSecret: pi.client_secret,
      customerSessionClientSecret,
      publishableKey: stripePublic,
      amount,
      currency: "brl",
    });
  } catch (e) {
    console.error("rpg-create-payment error", e);
    return json({ error: (e as Error).message ?? "Internal error" }, 500);
  }
});
