// Sincroniza vendas do Stripe (assinaturas + compras de RPG) para o ledger
// public.stripe_sales. Fonte de verdade de dinheiro = Stripe. Idempotente por
// charge_id. Autorização: JWT de admin OU a service-role key (para cron).
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

const ADMIN_EMAIL = "devocionalzeiros@gmail.com";

// Nomes legíveis dos cosméticos do RPG (para relatórios de vendas)
const COSMETIC_NAMES: Record<string, string> = {
  "head:cap": "Boné", "head:hat": "Chapéu",
  "robe:pilgrim": "Manto do Peregrino", "robe:priest": "Manto Sacerdotal",
  "robe:ephod": "Éfode", "robe:shepherd": "Manto de Pastor",
  "robe:purple": "Manto Púrpura", "robe:sackcloth": "Pano de Saco",
  "robe:wedding": "Traje de Núpcias",
  "weapon:staff": "Cajado", "weapon:sling": "Funda", "weapon:shofar": "Shofar",
  "weapon:torch": "Tocha", "weapon:spear": "Lança", "weapon:harp": "Harpa",
  "head:turban": "Turbante", "head:thorns": "Coroa de Espinhos",
  "head:kefiah": "Kefiá", "head:olive": "Coroa de Oliveira", "head:fisher": "Chapéu de Pescador",
  "beard": "Barba", "wings:gold": "Asas Douradas", "wings:crystal": "Asas de Cristal",
  "aura:pillar": "Aura Coluna de Fogo", "aura:shekinah": "Aura Shekinah",
  "aura:glory": "Aura da Glória", "wings:seraph": "Asas de Serafim",
  "mount:chariot": "Carruagem", "mount:horse": "Cavalo", "mount:camel": "Camelo", "mount:donkey": "Jumento",
  "pet:angel": "Anjo", "pet:dove": "Pomba", "pet:flame": "Chama", "pet:lamb": "Cordeiro", "pet:lion": "Leão",
  "color:yellow": "Cor Amarela", "color:red": "Cor Vermelha", "color:pink": "Cor Rosa",
  "color:skyblue": "Cor Azul-céu", "color:black": "Cor Preta", "color:white": "Cor Branca",
  "color:orange": "Cor Laranja", "color:green": "Cor Verde",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ ok: false, error: "Method not allowed" }, 405);

  try {
    const supaUrl = Deno.env.get("SUPABASE_URL")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const stripeSecret = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeSecret) return json({ ok: false, error: "Stripe not configured" }, 500);

    const admin = createClient(supaUrl, serviceKey);

    // ---- Autorização: admin JWT OU service-role key ----
    const authHeader = req.headers.get("Authorization") ?? "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7).trim() : "";
    let authorized = false;
    if (token && token === serviceKey) {
      authorized = true;
    } else if (token) {
      const userClient = createClient(supaUrl, anonKey, {
        global: { headers: { Authorization: authHeader } },
      });
      const { data: u } = await userClient.auth.getUser();
      const uid = u?.user?.id;
      const uemail = (u?.user?.email ?? "").toLowerCase();
      if (uid) {
        const { data: isAdmin } = await admin.rpc("has_role", { _user_id: uid, _role: "admin" });
        if (isAdmin === true || uemail === ADMIN_EMAIL) authorized = true;
      }
    }
    if (!authorized) return json({ ok: false, error: "Access denied: admin only" }, 403);

    const body = await req.json().catch(() => ({}));
    const sinceDays = Number(body?.since_days ?? 0);
    const createdFilter = sinceDays > 0
      ? { gte: Math.floor(Date.now() / 1000) - sinceDays * 86400 }
      : undefined;

    const stripe = new Stripe(stripeSecret, { apiVersion: "2024-11-20.acacia" });

    const subCache = new Map<string, { plan: string | null; interval: string | null }>();
    const rows: Record<string, unknown>[] = [];
    const byKind: Record<string, number> = { subscription: 0, rpg: 0, donation: 0, other: 0 };
    let processed = 0;
    let startingAfter: string | undefined;
    let pages = 0;

    while (pages < 100) {
      const page = await stripe.charges.list({
        limit: 100,
        ...(createdFilter ? { created: createdFilter } : {}),
        ...(startingAfter ? { starting_after: startingAfter } : {}),
        expand: ["data.payment_intent", "data.invoice"],
      });

      for (const ch of page.data) {
        processed++;
        if (ch.status !== "succeeded") continue;

        const pi = (ch.payment_intent && typeof ch.payment_intent === "object")
          ? ch.payment_intent as Stripe.PaymentIntent : null;
        const piMeta = (pi?.metadata ?? {}) as Record<string, string>;
        const inv = (ch.invoice && typeof ch.invoice === "object")
          ? ch.invoice as Stripe.Invoice : null;
        const invId = typeof ch.invoice === "string" ? ch.invoice : inv?.id ?? null;

        let kind = "other";
        let plan: string | null = null;
        let interval: string | null = null;
        let cosmeticId: string | null = null;
        let itemName: string | null = null;
        let subId: string | null = null;

        if (piMeta.cosmetic_id) {
          kind = "rpg";
          cosmeticId = piMeta.cosmetic_id;
          itemName = COSMETIC_NAMES[cosmeticId] ?? cosmeticId;
        } else if (piMeta.tipo === "talents") {
          kind = "talents";
          itemName = `${piMeta.talents ?? "?"} Talentos`;
        } else if (inv || invId) {
          kind = "subscription";
          subId = (inv?.subscription as string) ?? null;
          if (subId) {
            if (!subCache.has(subId)) {
              try {
                const s = await stripe.subscriptions.retrieve(subId);
                subCache.set(subId, {
                  plan: (s.metadata?.plan as string) ?? null,
                  interval: s.items?.data?.[0]?.price?.recurring?.interval ?? null,
                });
              } catch (_) {
                subCache.set(subId, { plan: null, interval: null });
              }
            }
            plan = subCache.get(subId)!.plan;
            interval = subCache.get(subId)!.interval;
          }
          itemName = plan ? `Assinatura ${plan}` : "Assinatura";
        } else if (piMeta.tipo === "doacao") {
          kind = "donation";
          itemName = "Doação";
        }

        const status = ch.refunded ? "refunded" : "paid";
        rows.push({
          charge_id: ch.id,
          payment_intent_id: typeof ch.payment_intent === "string" ? ch.payment_intent : pi?.id ?? null,
          invoice_id: invId,
          subscription_id: subId,
          kind,
          status,
          amount: (ch.amount ?? 0) / 100,
          currency: ch.currency ?? "brl",
          plan_type: plan,
          billing_interval: interval,
          cosmetic_id: cosmeticId,
          item_name: itemName,
          user_id: piMeta.user_id ?? null,
          email: ch.billing_details?.email ?? piMeta.email ?? null,
          customer_name: ch.billing_details?.name ?? null,
          occurred_at: new Date((ch.created ?? 0) * 1000).toISOString(),
          raw: { amount: ch.amount, refunded: ch.refunded, amount_refunded: ch.amount_refunded },
          synced_at: new Date().toISOString(),
        });
        byKind[kind] = (byKind[kind] ?? 0) + 1;
      }

      if (!page.has_more) break;
      startingAfter = page.data[page.data.length - 1]?.id;
      if (!startingAfter) break;
      pages++;
    }

    let upserted = 0;
    if (rows.length) {
      // upsert em lotes de 200 (idempotente por charge_id)
      for (let i = 0; i < rows.length; i += 200) {
        const batch = rows.slice(i, i + 200);
        const { error } = await admin
          .from("stripe_sales")
          .upsert(batch, { onConflict: "charge_id" });
        if (error) throw error;
        upserted += batch.length;
      }
    }

    return json({ ok: true, processed, upserted, byKind });
  } catch (e) {
    console.error("admin-sync-stripe-sales error", e);
    return json({ ok: false, error: (e as Error).message ?? "Internal error" }, 500);
  }
});
