// DIAGNÓSTICO: envia um push nativo de teste APENAS para os tokens do próprio
// admin que chama (nunca para outros usuários) e RETORNA o resultado detalhado
// do FCM (status + corpo do erro), para diagnosticar por que os pushes não chegam.
// Reaproveita exatamente a mesma lógica de autenticação FCM do send-native-push.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { create, getNumericDate } from "https://deno.land/x/djwt@v3.0.2/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const json = (d: unknown, status = 200) =>
  new Response(JSON.stringify(d), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

async function importPrivateKey(pem: string): Promise<CryptoKey> {
  const pemContents = pem
    .replace(/-----BEGIN PRIVATE KEY-----/, "")
    .replace(/-----END PRIVATE KEY-----/, "")
    .replace(/\s+/g, "");
  const binary = Uint8Array.from(atob(pemContents), (c) => c.charCodeAt(0));
  return await crypto.subtle.importKey(
    "pkcs8", binary,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["sign"],
  );
}

async function getAccessToken(serviceAccount: any): Promise<string> {
  const key = await importPrivateKey(serviceAccount.private_key);
  const jwt = await create(
    { alg: "RS256", typ: "JWT" },
    {
      iss: serviceAccount.client_email,
      scope: "https://www.googleapis.com/auth/firebase.messaging",
      aud: "https://oauth2.googleapis.com/token",
      iat: getNumericDate(0),
      exp: getNumericDate(3600),
    },
    key,
  );
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`OAuth token exchange failed: ${res.status} ${text}`);
  return JSON.parse(text).access_token;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // 1) Autentica o chamador (JWT do usuário) e confirma que é admin.
    const authHeader = req.headers.get("Authorization") ?? "";
    if (!authHeader.startsWith("Bearer ")) return json({ ok: false, stage: "auth", error: "unauthenticated" }, 401);
    const authClient = createClient(supabaseUrl, anonKey, { global: { headers: { Authorization: authHeader } } });
    const { data: { user }, error: authErr } = await authClient.auth.getUser();
    if (authErr || !user) return json({ ok: false, stage: "auth", error: "invalid_token" }, 401);

    const { data: isAdmin } = await authClient.rpc("is_current_user_admin");
    if (!isAdmin) return json({ ok: false, stage: "authz", error: "somente admin pode testar" }, 403);

    // 2) Service account do Firebase
    const saRaw = Deno.env.get("FIREBASE_SERVICE_ACCOUNT_JSON");
    if (!saRaw) {
      return json({ ok: false, stage: "service_account",
        error: "FIREBASE_SERVICE_ACCOUNT_JSON não está definido nos secrets. Este é provavelmente o problema." });
    }
    let serviceAccount: any;
    try {
      serviceAccount = JSON.parse(saRaw);
    } catch {
      return json({ ok: false, stage: "service_account_parse",
        error: "FIREBASE_SERVICE_ACCOUNT_JSON existe mas não é um JSON válido (provavelmente colaram a chave errada)." });
    }
    if (serviceAccount.type !== "service_account" || !serviceAccount.private_key || !serviceAccount.client_email) {
      return json({ ok: false, stage: "service_account_shape",
        error: "O JSON não parece uma conta de serviço do Firebase (faltam type/private_key/client_email). Baixe em Firebase Console > Contas de serviço > Gerar nova chave privada.",
        got_keys: Object.keys(serviceAccount) });
    }
    const projectId = serviceAccount.project_id;

    // 3) OAuth com o Google (assinatura da service account)
    let accessToken: string;
    try {
      accessToken = await getAccessToken(serviceAccount);
    } catch (e) {
      return json({ ok: false, stage: "oauth", project_id: projectId,
        error: String((e as Error)?.message ?? e),
        hint: "Falha ao autenticar a service account no Google (chave revogada/errada ou relógio). Verifique a chave." });
    }

    // 4) Tokens SOMENTE do próprio admin
    const service = createClient(supabaseUrl, serviceKey);
    const { data: tokens, error: tokErr } = await service
      .from("native_push_tokens").select("id, token, platform").eq("user_id", user.id);
    if (tokErr) return json({ ok: false, stage: "tokens", error: tokErr.message });
    if (!tokens?.length) {
      return json({ ok: false, stage: "no_token", project_id: projectId,
        error: "Seu usuário não tem token nativo salvo. Abra o app nativo logado nesta conta e permita notificações; depois teste de novo." });
    }

    // 5) Envia o teste e coleta o resultado exato do FCM por token
    const fcmUrl = `https://fcm.googleapis.com/v1/projects/${projectId}/messages:send`;
    const results = await Promise.all(tokens.map(async (t) => {
      const body = {
        message: {
          token: t.token,
          notification: { title: "🔔 Teste Devocionalzeiros", body: "Se você recebeu isto, o push nativo está funcionando!" },
          data: { url: "/home" },
          android: { priority: "HIGH", notification: { sound: "default", click_action: "FCM_PLUGIN_ACTIVITY" } },
          apns: { payload: { aps: { sound: "default", badge: 1 } } },
        },
      };
      try {
        const res = await fetch(fcmUrl, {
          method: "POST",
          headers: { "Authorization": `Bearer ${accessToken}`, "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const text = await res.text();
        return { platform: t.platform, status: res.status, ok: res.ok, response: text.slice(0, 500) };
      } catch (e) {
        return { platform: t.platform, status: 0, ok: false, response: String((e as Error)?.message ?? e) };
      }
    }));

    const anyOk = results.some((r) => r.ok);
    return json({
      ok: anyOk,
      stage: anyOk ? "sent" : "fcm_error",
      project_id: projectId,
      tokens_testados: tokens.length,
      resultados: results,
      dica: anyOk
        ? "FCM aceitou o envio. Se mesmo assim não chegou no aparelho, verifique canal de notificação/otimização de bateria no Android e o google-services.json do APK."
        : "O FCM rejeitou. Veja 'resultados[].response' para a mensagem exata (ex.: SENDER_ID_MISMATCH = projeto Firebase do APK diferente da service account).",
    });
  } catch (err) {
    return json({ ok: false, stage: "exception", error: String((err as Error)?.message ?? err) }, 500);
  }
});
