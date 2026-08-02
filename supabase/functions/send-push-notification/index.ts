import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
// @deno-types="npm:@types/web-push"
import webpush from "npm:web-push";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    // Chamador confiável: service key interna (funções chamando funções) OU o
    // CRON_SECRET compartilhado (pg_cron/diagnóstico) — mesmo padrão do
    // process-admin-announcements, imune ao formato da chave (sb_* vs JWT).
    const cronSecret = Deno.env.get("CRON_SECRET") ?? "";
    const cronHeader = req.headers.get("x-cron-secret") ?? "";
    const authHeader = req.headers.get("Authorization") ?? "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice("Bearer ".length).trim() : "";
    const okCaller =
      (!!cronSecret && cronHeader === cronSecret) ||
      (!!token && token === Deno.env.get("SUPABASE_SERVICE_ROLE_KEY"));
    if (!okCaller) {
      return new Response(JSON.stringify({ error: "Forbidden" }), {
        status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const serviceClient = createClient(supabaseUrl, supabaseServiceKey);

    const body = await req.json();
    const { user_id, title, message, url, source } = body;

    // ---------------------------------------------------------------------
    // WEB PUSH (PWA) — best-effort. Se as chaves VAPID não estiverem
    // configuradas (ou o envio falhar), NÃO derruba a requisição: apenas
    // registra e segue para o push nativo. Antes, a ausência de VAPID fazia
    // a função retornar 500 ANTES do fan-out nativo, então o app nunca
    // recebia o push no broadcast.
    // ---------------------------------------------------------------------
    const web: { sent: number; failed: number; skipped?: string } = { sent: 0, failed: 0 };
    // Strip surrounding quotes and "=" padding — web-push requires clean Base64url
    const sanitize = (k: string) => k.replace(/^"/, "").replace(/"$/, "").replace(/=+$/, "");
    const vapidPublicKey = sanitize(Deno.env.get("VAPID_PUBLIC_KEY") ?? "");
    const vapidPrivateKey = sanitize(Deno.env.get("VAPID_PRIVATE_KEY") ?? "");
    const vapidEmail = Deno.env.get("VAPID_EMAIL") ?? "mailto:devocionalzeiros@gmail.com";

    if (vapidPublicKey && vapidPrivateKey) {
      try {
        webpush.setVapidDetails(vapidEmail, vapidPublicKey, vapidPrivateKey);

        let query = serviceClient.from("push_subscriptions").select("*");
        if (user_id) query = query.eq("user_id", user_id);
        const { data: subscriptions, error } = await query;
        if (error) throw error;

        const payload = JSON.stringify({
          title: title ?? "Devocionalzeiros 🙏",
          body: message ?? "Você tem um novo devocional aguardando!",
          icon: "/pwa-192x192.png",
          badge: "/pwa-192x192.png",
          url: url ?? "/devocional",
        });

        const toDelete: string[] = [];
        for (const sub of subscriptions ?? []) {
          try {
            await webpush.sendNotification(
              { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
              payload,
            );
            web.sent++;
          } catch (err: any) {
            if (err?.statusCode === 410 || err?.statusCode === 404) toDelete.push(sub.id);
            web.failed++;
            console.error("Push send error:", err?.statusCode, sub.endpoint);
          }
        }
        if (toDelete.length > 0) {
          await serviceClient.from("push_subscriptions").delete().in("id", toDelete);
        }
      } catch (e) {
        console.error("web push failed (continuing to native):", e);
        web.skipped = "error";
      }
    } else {
      // Sem VAPID configurado: web push indisponível, mas o nativo segue.
      web.skipped = "no-vapid";
    }

    // ---------------------------------------------------------------------
    // NATIVE PUSH (FCM / Android/iOS) — SEMPRE dispara, independente do web.
    // fetch direto (não functions.invoke): o invoke do supabase-js engolia o
    // erro HTTP e o broadcast "dava certo" sem nenhum push nativo sair.
    // Aqui o status/corpo da resposta são capturados e registrados.
    // ---------------------------------------------------------------------
    let native: any = { sent: 0, failed: 0 };
    try {
      const nres = await fetch(`${supabaseUrl}/functions/v1/send-native-push`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${supabaseServiceKey}`,
          ...(cronSecret ? { "x-cron-secret": cronSecret } : {}),
        },
        body: JSON.stringify({ user_id, title, message, url }),
      });
      const ntext = await nres.text();
      try { native = JSON.parse(ntext); } catch { native = { raw: ntext.slice(0, 500) }; }
      native.status = nres.status;
      if (!nres.ok) console.error("native fan-out failed", nres.status, ntext.slice(0, 500));
    } catch (e) {
      native = { sent: 0, failed: 0, error: String((e as Error)?.message ?? e) };
      console.error("native push fan-out failed", e);
    }

    const result = {
      web,
      native,
      sent: (web.sent ?? 0) + (native.sent ?? 0),
    };

    // Registro persistente do envio — os logs de edge function não são
    // acessíveis fora do dashboard, então cada envio fica auditável em SQL.
    try {
      await serviceClient.from("push_send_log").insert({
        source: source ?? "api",
        target_user_id: user_id ?? null,
        title: title ?? null,
        web: web as unknown as Record<string, unknown>,
        native: native as unknown as Record<string, unknown>,
      });
    } catch (e) {
      console.error("push_send_log insert failed", e);
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("send-push-notification error:", err);
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
