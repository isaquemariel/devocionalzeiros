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
    const web: {
      sent: number; failed: number; skipped?: string;
      rejected?: Record<string, number>; purged?: number; parDeChaves?: string;
    } = { sent: 0, failed: 0 };
    // Strip surrounding quotes and "=" padding — web-push requires clean Base64url
    const sanitize = (k: string) => k.replace(/^"/, "").replace(/"$/, "").replace(/=+$/, "");
    const vapidPublicKey = sanitize(Deno.env.get("VAPID_PUBLIC_KEY") ?? "");
    const vapidPrivateKey = sanitize(Deno.env.get("VAPID_PRIVATE_KEY") ?? "");
    const vapidEmail = Deno.env.get("VAPID_EMAIL") ?? "mailto:devocionalzeiros@gmail.com";

    // -------------------------------------------------------------------
    // AS DUAS CHAVES SÃO MESMO DO MESMO PAR?
    //
    // Se não forem, o Google recusa TODOS os envios com 403 e a Apple com
    // 400 — e o único sinal disso, antes, era uma coluna de zeros no log.
    // A verificação é matemática e não precisa de rede: uma chave P-256 só
    // pode ser importada com `d` (a privada) e `x`/`y` (a pública) se os
    // três forem consistentes; o WebCrypto recusa a importação se não forem.
    // -------------------------------------------------------------------
    const b64u = (s: string) => s.replace(/-/g, "+").replace(/_/g, "/");
    const parOk = async (pub: string, priv: string): Promise<boolean> => {
      try {
        const raw = Uint8Array.from(atob(b64u(pub) + "==".slice(0, (4 - pub.length % 4) % 4)), (c) => c.charCodeAt(0));
        if (raw.length !== 65 || raw[0] !== 0x04) return false;
        const enc = (b: Uint8Array) => btoa(String.fromCharCode(...b)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
        await crypto.subtle.importKey(
          "jwk",
          { kty: "EC", crv: "P-256", x: enc(raw.slice(1, 33)), y: enc(raw.slice(33, 65)), d: priv, ext: true },
          { name: "ECDSA", namedCurve: "P-256" },
          false,
          ["sign"],
        );
        return true;
      } catch { return false; }
    };

    if (vapidPublicKey && vapidPrivateKey) {
      try {
        // O `sub` do JWT tem de ser mailto: ou https: — o Google devolve 403
        // se não for, e o sintoma é idêntico ao do par trocado. Vale dizer
        // qual das duas coisas está errada, em vez de deixar adivinhar.
        const assuntoOk = /^(mailto:\S+@\S+|https:\/\/\S+)$/.test(vapidEmail);
        web.parDeChaves = !assuntoOk
          ? `VAPID_EMAIL inválido ("${vapidEmail}") — tem de ser mailto:alguem@dominio ou https://…; sem isso o Google recusa com 403`
          : (await parOk(vapidPublicKey, vapidPrivateKey))
            ? "ok"
            : "INCOMPATÍVEL — VAPID_PUBLIC_KEY e VAPID_PRIVATE_KEY não são do mesmo par; todo envio será recusado (403/400)";
        if (web.parDeChaves !== "ok") console.error("VAPID:", web.parDeChaves);
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
        const rejected: Record<string, number> = {};
        for (const sub of subscriptions ?? []) {
          // Inscrição criada com OUTRA chave pública nunca vai passar: o
          // servidor de push compara-a com a assinatura e recusa. Não vale a
          // pena gastar a chamada — apaga-se, e o aparelho refaz a inscrição
          // sozinho na próxima vez que abrir o app (ver usePushNotifications).
          if (sub.vapid_key && sub.vapid_key !== vapidPublicKey) {
            toDelete.push(sub.id);
            rejected["chave-antiga"] = (rejected["chave-antiga"] ?? 0) + 1;
            continue;
          }
          try {
            await webpush.sendNotification(
              { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
              payload,
            );
            web.sent++;
          } catch (err: any) {
            const code = Number(err?.statusCode ?? 0);
            rejected[String(code || "erro")] = (rejected[String(code || "erro")] ?? 0) + 1;
            // 404/410: o servidor de push diz que a inscrição já não existe.
            // 403: a assinatura VAPID não corresponde à chave com que ela foi
            //      criada — nunca mais vai funcionar com as chaves atuais.
            // 400 (Apple): JWT recusado, mesma classe de problema.
            // Nos quatro casos a linha é lixo: guardá-la só faz o envio
            // seguinte demorar mais e o relatório mentir. Apagada, o aparelho
            // volta a inscrever-se sozinho ao abrir o app.
            // ...MAS só quando a nossa própria configuração está sã. Se o par
            // de chaves ou o VAPID_EMAIL estiverem errados, a culpa é nossa e
            // TODAS as inscrições recebem 403/400 — apagá-las apagaria a base
            // inteira por causa de um segredo mal colado. Nesse caso guarda-se
            // tudo e corrige-se o segredo. 404/410 são sempre do outro lado.
            const nossaCulpa = web.parDeChaves !== "ok";
            const morta = code === 410 || code === 404 ||
              (!nossaCulpa && (code === 403 || code === 400));
            if (morta) toDelete.push(sub.id);
            web.failed++;
            console.error("Push send error:", code, sub.endpoint);
          }
        }
        if (Object.keys(rejected).length > 0) web.rejected = rejected;
        if (toDelete.length > 0) {
          await serviceClient.from("push_subscriptions").delete().in("id", toDelete);
          web.purged = toDelete.length;
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
