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
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    // Strip "=" padding — web-push requires Base64url without padding
    const sanitize = (k: string) => k.replace(/=+$/, "");
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
        // 410 Gone = subscription expired/unsubscribed
        if (err?.statusCode === 410 || err?.statusCode === 404) {
          toDelete.push(sub.id);
        }
        failed++;
        console.error("Push send error:", err?.statusCode, sub.endpoint);
      }
    }

    // Clean up expired subscriptions
    if (toDelete.length > 0) {
      await serviceClient.from("push_subscriptions").delete().in("id", toDelete);
    }

    return new Response(JSON.stringify({ sent, failed }), {
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
