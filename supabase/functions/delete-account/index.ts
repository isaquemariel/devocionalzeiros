import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Missing authorization" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Create a client with the user's JWT to verify identity
    const supabaseUser = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user }, error: userError } = await supabaseUser.auth.getUser();
    if (userError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const userId = user.id;

    // Create admin client with service role key to delete user data
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Delete all user data from all tables in parallel
    await Promise.allSettled([
      supabaseAdmin.from("reading_schedule").delete().eq("user_id", userId),
      supabaseAdmin.from("reading_progress").delete().eq("user_id", userId),
      supabaseAdmin.from("quiz_attempts").delete().eq("user_id", userId),
      supabaseAdmin.from("devotional_completions").delete().eq("user_id", userId),
      supabaseAdmin.from("devotional_favorites").delete().eq("user_id", userId),
      supabaseAdmin.from("daily_logins").delete().eq("user_id", userId),
      supabaseAdmin.from("daily_usage_limits").delete().eq("user_id", userId),
      supabaseAdmin.from("achievement_claims").delete().eq("user_id", userId),
      supabaseAdmin.from("verse_favorites").delete().eq("user_id", userId),
      supabaseAdmin.from("verse_highlights").delete().eq("user_id", userId),
      supabaseAdmin.from("ranking_notifications").delete().eq("user_id", userId),
      supabaseAdmin.from("rpg_progress").delete().eq("user_id", userId),
      supabaseAdmin.from("rpg_user_stats").delete().eq("user_id", userId),
      supabaseAdmin.from("rpg_quiz_attempts_tracker").delete().eq("user_id", userId),
      supabaseAdmin.from("plan_completions").delete().eq("user_id", userId),
      supabaseAdmin.from("custom_reading_plans").delete().eq("user_id", userId),
      supabaseAdmin.from("saved_sermons").delete().eq("user_id", userId),
      supabaseAdmin.from("whatsapp_reminders_sent").delete().eq("user_id", userId),
    ]);

    // Delete chat messages via conversations
    const { data: convs } = await supabaseAdmin
      .from("chat_conversations")
      .select("id")
      .eq("user_id", userId);
    if (convs && convs.length > 0) {
      const convIds = convs.map((c: any) => c.id);
      await supabaseAdmin.from("chat_messages").delete().in("conversation_id", convIds);
      await supabaseAdmin.from("chat_conversations").delete().eq("user_id", userId);
    }

    // Delete profile
    await supabaseAdmin.from("profiles").delete().eq("user_id", userId);

    // Delete authorized_purchase (set to inactive, keep email for audit or fully delete)
    await supabaseAdmin
      .from("authorized_purchases")
      .update({ status: "deleted", updated_at: new Date().toISOString() })
      .eq("user_id", userId);

    // Delete avatar from storage
    await supabaseAdmin.storage.from("avatars").remove([`${userId}/avatar`]);

    // Finally delete the auth user
    const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(userId);
    if (deleteError) {
      console.error("Error deleting auth user:", deleteError);
      return new Response(JSON.stringify({ error: "Failed to delete auth user" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
