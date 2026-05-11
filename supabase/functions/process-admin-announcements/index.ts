import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Compute next run for a recurring announcement (BRT time, optional weekday list)
function computeNextRun(timeBrt: string, days: number[] | null): Date {
  const [hh, mm] = timeBrt.split(":").map(Number);
  // Get "now" in BRT
  const nowUtc = new Date();
  // BRT = UTC-3 (no DST currently in Brazil)
  const brtNow = new Date(nowUtc.getTime() - 3 * 60 * 60 * 1000);

  for (let i = 0; i < 14; i++) {
    const candidate = new Date(brtNow);
    candidate.setUTCDate(brtNow.getUTCDate() + i);
    candidate.setUTCHours(hh, mm, 0, 0);
    const dayOfWeek = candidate.getUTCDay();
    const dayMatch = !days || days.length === 0 || days.includes(dayOfWeek);
    // Convert candidate (which is BRT representation) back to real UTC
    const candidateUtc = new Date(candidate.getTime() + 3 * 60 * 60 * 1000);
    if (dayMatch && candidateUtc.getTime() > nowUtc.getTime()) {
      return candidateUtc;
    }
  }
  // Fallback: 1 day from now
  return new Date(nowUtc.getTime() + 24 * 60 * 60 * 1000);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const serviceClient = createClient(supabaseUrl, supabaseServiceKey);

    const nowIso = new Date().toISOString();

    // Find active announcements ready to fire
    const { data: due, error } = await serviceClient
      .from("admin_push_announcements")
      .select("*")
      .eq("is_active", true)
      .lte("next_run_at", nowIso)
      .not("next_run_at", "is", null)
      .limit(50);

    if (error) throw error;

    let processed = 0;
    for (const ann of due ?? []) {
      try {
        // Send broadcast
        await fetch(`${supabaseUrl}/functions/v1/send-push-notification`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${supabaseServiceKey}`,
          },
          body: JSON.stringify({
            title: ann.title,
            message: ann.message,
            url: ann.url || "/home",
          }),
        });

        // Compute next state
        const updates: Record<string, unknown> = {
          last_sent_at: nowIso,
          send_count: (ann.send_count ?? 0) + 1,
        };

        if (ann.schedule_type === "recurring" && ann.recurrence_time_brt) {
          updates.next_run_at = computeNextRun(
            ann.recurrence_time_brt,
            ann.recurrence_days,
          ).toISOString();
        } else {
          // 'once' or anything non-recurring: clear next_run and deactivate
          updates.next_run_at = null;
          updates.is_active = false;
        }

        await serviceClient
          .from("admin_push_announcements")
          .update(updates)
          .eq("id", ann.id);

        processed++;
      } catch (e) {
        console.error("Failed to process announcement", ann.id, e);
      }
    }

    return new Response(JSON.stringify({ processed, total: due?.length ?? 0 }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("process-admin-announcements error:", err);
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
