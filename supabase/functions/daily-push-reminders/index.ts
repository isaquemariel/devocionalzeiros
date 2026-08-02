import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    // Chamada pelo pg_cron ou internamente. O ambiente injeta as chaves no
    // formato NOVO (sb_*), então comparar com o JWT legado do pg_cron dá 403
    // em toda execução — o caminho principal é o CRON_SECRET (x-cron-secret),
    // gravado igual no secret da função e no vault do banco. A trava diária
    // abaixo garante NO MÁXIMO 1 envio/dia mesmo com chamadas repetidas.
    const cronSecret = Deno.env.get("CRON_SECRET") ?? "";
    const cronHeader = req.headers.get("x-cron-secret") ?? "";
    const authHeader = req.headers.get("Authorization") ?? "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7).trim() : "";
    const okCaller =
      (!!cronSecret && cronHeader === cronSecret) ||
      (!!token && (
        token === Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ||
        token === Deno.env.get("SUPABASE_ANON_KEY")
      ));
    if (!okCaller) {
      return new Response(JSON.stringify({ error: "Forbidden" }), {
        status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const serviceClient = createClient(supabaseUrl, supabaseServiceKey);

    const today = new Date().toISOString().split("T")[0];

    // TRAVA DIÁRIA (idempotência): só a PRIMEIRA chamada do dia envia. As
    // demais retornam já-enviado — protege contra reexecuções do cron e
    // contra qualquer chamada anônima repetida.
    const { data: lock } = await serviceClient
      .from("cron_run_log")
      .update({ last_run_date: today })
      .eq("fn", "daily-push-reminders")
      .neq("last_run_date", today)
      .select("fn")
      .maybeSingle();
    if (!lock) {
      const { error: insErr } = await serviceClient
        .from("cron_run_log")
        .insert({ fn: "daily-push-reminders", last_run_date: today });
      if (insErr) {
        return new Response(JSON.stringify({ skipped: "already-ran-today" }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    // Get all users who can receive push: web subscribers (push_subscriptions)
    // AND native app users (native_push_tokens). Native-only users were being
    // skipped before, so they never got the daily reminder.
    const [{ data: webSubs, error: webErr }, { data: nativeSubs, error: nativeErr }] =
      await Promise.all([
        serviceClient.from("push_subscriptions").select("user_id").limit(2000),
        serviceClient.from("native_push_tokens").select("user_id").limit(2000),
      ]);

    if (webErr) throw webErr;
    if (nativeErr) throw nativeErr;

    const userIds = [
      ...new Set([
        ...(webSubs ?? []).map((s: any) => s.user_id),
        ...(nativeSubs ?? []).map((s: any) => s.user_id),
      ]),
    ].filter(Boolean);

    if (userIds.length === 0) {
      return new Response(JSON.stringify({ notified: 0 }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Find which users already completed today's devotional
    const { data: completed } = await serviceClient
      .from("devotional_completions")
      .select("user_id")
      .eq("devotional_date", today)
      .in("user_id", userIds);

    const completedIds = new Set((completed ?? []).map((c: any) => c.user_id));
    const toNotify = userIds.filter((id) => !completedIds.has(id));

    let notified = 0;
    for (const userId of toNotify) {
      try {
        const res = await fetch(
          `${supabaseUrl}/functions/v1/send-push-notification`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${supabaseServiceKey}`,
            },
            body: JSON.stringify({
              user_id: userId,
              title: "Devocional do dia 🙏",
              message: "Que tal começar o dia com a Palavra? Seu devocional está esperando!",
              url: "/devocional",
            }),
          }
        );
        if (res.ok) notified++;
      } catch (e) {
        console.error("Error notifying user", userId, e);
      }
    }

    return new Response(JSON.stringify({ notified, total: toNotify.length }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("daily-push-reminders error:", err);
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
