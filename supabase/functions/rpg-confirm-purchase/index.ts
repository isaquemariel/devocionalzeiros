import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import Stripe from "https://esm.sh/stripe@17.5.0?target=deno";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

interface CosmeticsBlob {
  equip?: Record<string, string>;
  owned?: string[];
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  try {
    const authHeader = req.headers.get("Authorization") ?? "";
    if (!authHeader.startsWith("Bearer ")) return json({ ok: false, error: "Missing auth" }, 401);

    const supaUrl = Deno.env.get("SUPABASE_URL")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const stripeSecret = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeSecret) return json({ ok: false, error: "Stripe not configured" }, 500);

    const userClient = createClient(supaUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: userData, error: userErr } = await userClient.auth.getUser();
    if (userErr || !userData?.user) return json({ ok: false, error: "Unauthorized" }, 401);
    const user = userData.user;

    const body = await req.json().catch(() => ({}));
    const paymentIntentId = String(body?.paymentIntentId ?? "");
    if (!paymentIntentId) return json({ ok: false, error: "Missing paymentIntentId" }, 400);

    const stripe = new Stripe(stripeSecret, { apiVersion: "2024-11-20.acacia" });
    const pi = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (pi.status !== "succeeded") return json({ ok: false, error: "Payment not succeeded" });
    if (pi.metadata?.user_id !== user.id) return json({ ok: false, error: "User mismatch" });

    const cosmeticId = pi.metadata?.cosmetic_id;
    if (!cosmeticId) return json({ ok: false, error: "Missing cosmetic metadata" });

    const admin = createClient(supaUrl, serviceKey);
    const { data: statsRow } = await admin
      .from("rpg_user_stats")
      .select("cosmetics")
      .eq("user_id", user.id)
      .maybeSingle();

    const blob: CosmeticsBlob = (statsRow?.cosmetics as CosmeticsBlob) ?? {};
    const owned = new Set<string>(blob.owned ?? []);
    owned.add(cosmeticId);
    const newBlob: CosmeticsBlob = { equip: blob.equip ?? {}, owned: [...owned] };

    if (statsRow) {
      await admin
        .from("rpg_user_stats")
        .update({ cosmetics: newBlob })
        .eq("user_id", user.id);
    } else {
      await admin
        .from("rpg_user_stats")
        .insert({ user_id: user.id, cosmetics: newBlob });
    }

    return json({ ok: true, cosmeticId });
  } catch (e) {
    console.error("rpg-confirm-purchase error", e);
    return json({ ok: false, error: (e as Error).message ?? "Internal error" }, 500);
  }
});
