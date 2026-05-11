import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
// @deno-types="npm:@types/web-push"
import webpush from "npm:web-push";

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

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    // Require service-role caller — prevents arbitrary push spam/phishing.
    const authHeader = req.headers.get("Authorization") ?? "";
    if (!authHeader.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const claims = parseJwtClaims(authHeader.slice("Bearer ".length).trim());
    if (claims?.role !== "service_role") {
      return new Response(JSON.stringify({ error: "Forbidden" }), {
        status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    // Strip surrounding quotes and "=" padding — web-push requires clean Base64url
    const sanitize = (k: string) => k.replace(/^"/, "").replace(/"$/, "").replace(/=+$/, "");
    const vapidPublicKey = sanitize(Deno.env.get("VAPID_PUBLIC_KEY") ?? "");
    const vapidPrivateKey = sanitize(Deno.env.get("VAPID_PRIVATE_KEY") ?? "");
    const vapidEmail = Deno.env.get("VAPID_EMAIL") ?? "mailto:devocionalzeiros@gmail.com";

    if (!vapidPublicKey || !vapidPrivateKey) {
      return new Response(JSON.stringify({ error: "VAPID keys not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    webpush.setVapidDetails(vapidEmail, vapidPublicKey, vapidPrivateKey);

    const serviceClient = createClient(supabaseUrl, supabaseServiceKey);

    const body = await req.json();
    const { user_id, title, message, url } = body;

    // Fetch subscriptions for this user (or all users if no user_id)
    let query = serviceClient.from("push_subscriptions").select("*");
    if (user_id) query = query.eq("user_id", user_id);

    const { data: subscriptions, error } = await query;
    if (error) throw error;

    if (!subscriptions || subscriptions.length === 0) {
      return new Response(JSON.stringify({ sent: 0 }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const payload = JSON.stringify({
      title: title ?? "Devocionalzeiros 🙏",
      body: message ?? "Você tem um novo devocional aguardando!",
      icon: "/pwa-192x192.png",
      badge: "/pwa-192x192.png",
      url: url ?? "/devocional",
    });

    let sent = 0;
    let failed = 0;
    const toDelete: string[] = [];

    for (const sub of subscriptions) {
      try {
        await webpush.sendNotification(
          { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
          payload
        );
        sent++;
      } catch (err: any) {
        if (err?.statusCode === 410 || err?.statusCode === 404) {
          toDelete.push(sub.id);
        }
        failed++;
        console.error("Push send error:", err?.statusCode, sub.endpoint);
      }
    }

    if (toDelete.length > 0) {
      await serviceClient.from("push_subscriptions").delete().in("id", toDelete);
    }

    // Fan-out to native (FCM) devices — fire and forget
    let nativeResult: any = { sent: 0, failed: 0 };
    try {
      const { data: nr } = await serviceClient.functions.invoke("send-native-push", {
        body: { user_id, title, message, url },
      });
      if (nr) nativeResult = nr;
    } catch (e) {
      console.error("native push fan-out failed", e);
    }

    return new Response(JSON.stringify({
      web: { sent, failed },
      native: nativeResult,
      sent: sent + (nativeResult.sent ?? 0),
    }), {
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
