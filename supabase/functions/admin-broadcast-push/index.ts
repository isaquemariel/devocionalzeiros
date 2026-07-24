import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const userClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: { user }, error: authError } = await userClient.auth.getUser();
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Verify admin
    const { data: isAdmin } = await userClient.rpc("is_current_user_admin");
    if (!isAdmin) {
      return new Response(JSON.stringify({ error: "Forbidden" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { announcement_id } = await req.json();
    if (!announcement_id) {
      return new Response(JSON.stringify({ error: "announcement_id required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const serviceClient = createClient(supabaseUrl, supabaseServiceKey);
    const { data: announcement, error } = await serviceClient
      .from("admin_push_announcements")
      .select("*")
      .eq("id", announcement_id)
      .maybeSingle();

    if (error || !announcement) {
      return new Response(JSON.stringify({ error: "Announcement not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Trigger send-push-notification (broadcast - no user_id)
    const sendRes = await fetch(`${supabaseUrl}/functions/v1/send-push-notification`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${supabaseServiceKey}`,
      },
      body: JSON.stringify({
        title: announcement.title,
        message: announcement.message,
        url: announcement.url || "/home",
      }),
    });

    // Lê a resposta com robustez e verifica se o envio realmente deu certo —
    // antes retornávamos success:true mesmo quando o envio falhava (ex.: 500),
    // mascarando o problema no painel.
    const rawText = await sendRes.text();
    let result: any;
    try { result = JSON.parse(rawText); } catch { result = { raw: rawText }; }

    if (!sendRes.ok) {
      console.error("send-push-notification failed", sendRes.status, rawText);
      return new Response(JSON.stringify({ success: false, status: sendRes.status, ...result }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    await serviceClient
      .from("admin_push_announcements")
      .update({
        last_sent_at: new Date().toISOString(),
        send_count: (announcement.send_count ?? 0) + 1,
      })
      .eq("id", announcement_id);

    return new Response(JSON.stringify({ success: true, ...result }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("admin-broadcast-push error:", err);
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
