// Sends push notifications to native Android/iOS devices via FCM HTTP v1 API.
// Authenticates with a Service Account JSON stored in FIREBASE_SERVICE_ACCOUNT_JSON.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { create, getNumericDate } from "https://deno.land/x/djwt@v3.0.2/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function parseJwtClaims(token: string): Record<string, unknown> | null {
  const parts = token.split(".");
  if (parts.length < 2) return null;
  try {
    const payload = parts[1].replaceAll("-", "+").replaceAll("_", "/")
      .padEnd(Math.ceil(parts[1].length / 4) * 4, "=");
    return JSON.parse(atob(payload));
  } catch { return null; }
}

// Convert PEM private key to CryptoKey for RS256 signing.
async function importPrivateKey(pem: string): Promise<CryptoKey> {
  const pemContents = pem
    .replace(/-----BEGIN PRIVATE KEY-----/, "")
    .replace(/-----END PRIVATE KEY-----/, "")
    .replace(/\s+/g, "");
  const binary = Uint8Array.from(atob(pemContents), (c) => c.charCodeAt(0));
  return await crypto.subtle.importKey(
    "pkcs8",
    binary,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"],
  );
}

// In-memory cache of OAuth access token (per cold start)
let cachedToken: { token: string; exp: number } | null = null;

async function getAccessToken(serviceAccount: any): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  if (cachedToken && cachedToken.exp > now + 60) return cachedToken.token;

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
  if (!res.ok) {
    throw new Error(`OAuth token exchange failed: ${res.status} ${await res.text()}`);
  }
  const json = await res.json();
  cachedToken = { token: json.access_token, exp: now + (json.expires_in ?? 3600) };
  return cachedToken.token;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    // Service-role only — verify by direct key comparison
    const authHeader = req.headers.get("Authorization") ?? "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7).trim() : "";
    if (!token || token !== Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")) {
      return new Response(JSON.stringify({ error: "Forbidden" }), {
        status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const saRaw = Deno.env.get("FIREBASE_SERVICE_ACCOUNT_JSON");
    if (!saRaw) {
      return new Response(JSON.stringify({ error: "FIREBASE_SERVICE_ACCOUNT_JSON not set" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const serviceAccount = JSON.parse(saRaw);
    const projectId = serviceAccount.project_id;

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { user_id, title, message, url } = await req.json();

    let query = supabase.from("native_push_tokens").select("*");
    if (user_id) query = query.eq("user_id", user_id);
    const { data: tokens, error } = await query;
    if (error) throw error;
    if (!tokens?.length) {
      return new Response(JSON.stringify({ sent: 0, failed: 0 }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const accessToken = await getAccessToken(serviceAccount);
    const fcmUrl = `https://fcm.googleapis.com/v1/projects/${projectId}/messages:send`;

    const notifTitle = title ?? "Devocionalzeiros 🙏";
    const notifBody = message ?? "Você tem um novo devocional aguardando!";
    const clickUrl = url ?? "/devocional";

    let sent = 0, failed = 0;
    const stale: string[] = [];

    await Promise.all(tokens.map(async (t) => {
      const body = {
        message: {
          token: t.token,
          notification: { title: notifTitle, body: notifBody },
          data: { url: clickUrl },
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
        if (res.ok) {
          sent++;
        } else {
          failed++;
          const txt = await res.text();
          console.error("FCM error", res.status, txt);
          // UNREGISTERED / INVALID_ARGUMENT -> token is dead
          if (res.status === 404 || /UNREGISTERED|INVALID_ARGUMENT/i.test(txt)) {
            stale.push(t.id);
          }
        }
      } catch (e) {
        failed++;
        console.error("FCM send exception", e);
      }
    }));

    if (stale.length) {
      await supabase.from("native_push_tokens").delete().in("id", stale);
    }

    return new Response(JSON.stringify({ sent, failed, stale_removed: stale.length }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("send-native-push error:", err);
    return new Response(JSON.stringify({ error: String(err?.message ?? err) }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
