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

  // Chamada pelo pg_cron ou por funções internas. ATENÇÃO: o ambiente injeta
  // SUPABASE_SERVICE_ROLE_KEY/ANON_KEY no formato NOVO (sb_*), então comparar
  // com o JWT legado que o pg_cron envia dá 403 em toda execução — por isso o
  // caminho principal é o CRON_SECRET (header x-cron-secret), gravado igual no
  // secret da função e no vault do banco. O processamento é IDEMPOTENTE
  // (reivindicação atômica abaixo): chamadas repetidas não duplicam envio.
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
        const isRecurring = ann.schedule_type === "recurring" && !!ann.recurrence_time_brt;
        // Próximo estado JÁ calculado: um recorrente é REAGENDADO para a próxima
        // ocorrência; um 'once' é encerrado (next_run_at nulo, inativo).
        const nextRun = isRecurring
          ? computeNextRun(ann.recurrence_time_brt, ann.recurrence_days).toISOString()
          : null;

        // REIVINDICAÇÃO ATÔMICA **com reagendamento embutido**: só afeta a linha
        // se ela ainda estiver vencida (evita envio duplicado por concorrência) e,
        // no MESMO update, já grava o próximo horário. Assim o RECORRENTE nunca
        // fica "preso" se o envio falhar ou a função for interrompida depois —
        // antes o next_run era zerado e só reagendado no fim, e qualquer erro no
        // meio matava a recorrência.
        const { data: claimed } = await serviceClient
          .from("admin_push_announcements")
          .update({
            next_run_at: nextRun,
            is_active: isRecurring ? true : false,
            last_sent_at: nowIso,
            send_count: (ann.send_count ?? 0) + 1,
          })
          .eq("id", ann.id)
          .lte("next_run_at", nowIso)
          .not("next_run_at", "is", null)
          .select("id")
          .maybeSingle();
        if (!claimed) continue;

        // PUSH (nativo FCM + web) — MESMA função do envio imediato que já funciona.
        // Envia com o cron-secret (auth à prova do formato sb_* da chave) e com um
        // `source` que identifica o tipo no push_send_log (auditável em SQL). A
        // resposta é conferida: antes era "fire-and-forget" e uma falha do envio
        // passava despercebida (o sino do app enchia, mas o push não saía).
        try {
          const pres = await fetch(`${supabaseUrl}/functions/v1/send-push-notification`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${supabaseServiceKey}`,
              ...(cronSecret ? { "x-cron-secret": cronSecret } : {}),
            },
            body: JSON.stringify({
              title: ann.title,
              message: ann.message,
              url: ann.url || "/home",
              source: isRecurring ? "sched:recurring" : "sched:once",
            }),
          });
          if (!pres.ok) {
            const t = await pres.text();
            console.error("push send failed for", ann.id, pres.status, t.slice(0, 300));
          }
        } catch (e) {
          console.error("push fetch threw for", ann.id, e);
        }

        // Sino do app (todos os usuários) — INDEPENDENTE do push, para o aviso
        // ficar sempre no ícone de notificações mesmo se o push falhar.
        try {
          await serviceClient.rpc("broadcast_admin_notification_internal", {
            p_title: ann.title,
            p_body: ann.message,
            p_link: ann.url || "/home",
          });
        } catch (e) {
          console.error("in-app broadcast failed for", ann.id, e);
        }

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
