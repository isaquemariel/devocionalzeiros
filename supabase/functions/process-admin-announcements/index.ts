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

    // Quantas RODADAS do cron uma mesma ocorrência pode gastar antes de
    // desistir, e daqui a quanto tempo ela volta a ser tentada.
    const MAX_TENTATIVAS = 3;
    const ESPERA_RETENTATIVA_MS = 5 * 60 * 1000;

    /** Chama o envio de push e diz, sem rodeios, se a mensagem SAIU.
     *  Uma resposta 200 com zero entregues e falhas contadas é fracasso — foi
     *  assim que uma chave VAPID trocada deixou todo mundo sem aviso enquanto
     *  o painel dizia "enviado". Zero entregues SEM falha nenhuma é só não
     *  haver inscrito, e isso não é erro de ninguém. */
    const enviarPush = async (ann: Record<string, unknown>, source: string): Promise<{ ok: boolean; erro?: string }> => {
      let ultimo = "";
      // duas tentativas na mesma rodada: a queda que motivou isto foi um
      // soluço de rede, e esperar cinco minutos por ele é caro demais.
      for (let tentativa = 0; tentativa < 2; tentativa++) {
        if (tentativa > 0) await new Promise((r) => setTimeout(r, 2000));
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
              source,
            }),
          });
          const texto = await pres.text();
          if (!pres.ok) { ultimo = `HTTP ${pres.status}: ${texto.slice(0, 200)}`; continue; }

          let corpo: any = null;
          try { corpo = JSON.parse(texto); } catch { /* resposta não-JSON */ }
          const entregues = Number(corpo?.web?.sent ?? 0) + Number(corpo?.native?.sent ?? 0);
          const recusados = Number(corpo?.web?.failed ?? 0) + Number(corpo?.native?.failed ?? 0);
          if (entregues === 0 && recusados > 0) {
            ultimo = `nenhum aparelho recebeu (${recusados} recusa(s)): ${JSON.stringify(corpo?.web?.rejected ?? {})}`;
            continue;
          }
          return { ok: true };
        } catch (e) {
          ultimo = `falha de rede: ${e instanceof Error ? e.message : String(e)}`;
        }
      }
      return { ok: false, erro: ultimo || "falha desconhecida no envio" };
    };

    /** Grava o resultado da entrega. Se as colunas novas ainda não existirem
     *  no banco (migração aplicada depois do deploy da função), regrava só com
     *  as antigas em vez de perder o registro inteiro — o pior desfecho aqui
     *  seria a correção deixar o anúncio em estado pior do que o de antes. */
    const gravarResultado = async (id: string, campos: Record<string, unknown>) => {
      const { error } = await serviceClient.from("admin_push_announcements").update(campos).eq("id", id);
      if (!error) return;
      const semColuna = /column .* does not exist|could not find/i.test(`${error.message} ${error.code ?? ""}`);
      if (!semColuna) { console.error("não consegui gravar o resultado de", id, error); return; }
      const { last_error: _e, last_error_at: _ea, retry_count: _rc, ...antigos } = campos as Record<string, unknown>;
      if (Object.keys(antigos).length === 0) return;
      const { error: erro2 } = await serviceClient.from("admin_push_announcements").update(antigos).eq("id", id);
      if (erro2) console.error("nem com as colunas antigas", id, erro2);
    };

    let processed = 0;
    let falhas = 0;
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
        // fica "preso" se o envio falhar ou a função for interrompida depois.
        //
        // O que NÃO se grava aqui é a ENTREGA: `last_sent_at` e `send_count` só
        // são tocados depois de o push realmente sair. Antes eram escritos junto
        // com a reivindicação, e um envio que falhava ficava registrado como
        // enviado — a ocorrência morria em silêncio e o painel mentia.
        const { data: claimed } = await serviceClient
          .from("admin_push_announcements")
          .update({ next_run_at: nextRun, is_active: isRecurring ? true : false })
          .eq("id", ann.id)
          .lte("next_run_at", nowIso)
          .not("next_run_at", "is", null)
          .select("id")
          .maybeSingle();
        if (!claimed) continue;

        const tentativasGastas = Number(ann.retry_count ?? 0);

        // Sino do app (todos os usuários) — INDEPENDENTE do push, para o aviso
        // ficar sempre no ícone de notificações mesmo se o push falhar. Só na
        // PRIMEIRA tentativa: numa retentativa o sino já tem o aviso, e repetir
        // encheria a caixa de cópias da mesma mensagem.
        if (tentativasGastas === 0) {
          try {
            await serviceClient.rpc("broadcast_admin_notification_internal", {
              p_title: ann.title,
              p_body: ann.message,
              p_link: ann.url || "/home",
            });
          } catch (e) {
            console.error("in-app broadcast failed for", ann.id, e);
          }
        }

        // PUSH (nativo FCM + web) — MESMA função do envio imediato.
        const base = isRecurring ? "sched:recurring" : "sched:once";
        const entrega = await enviarPush(ann, tentativasGastas > 0 ? `${base}:retry` : base);

        if (entrega.ok) {
          await gravarResultado(ann.id, {
            last_sent_at: nowIso,
            send_count: (ann.send_count ?? 0) + 1,
            last_error: null,
            last_error_at: null,
            retry_count: 0,
          });
          processed++;
        } else {
          // Não entregou: fica escrito o porquê, e a ocorrência volta para a
          // fila daqui a pouco — sem atropelar a cadência normal, porque quando
          // a retentativa disparar o próximo horário é recalculado do zero.
          const podeTentar = tentativasGastas + 1 < MAX_TENTATIVAS;
          const retryAt = new Date(Date.now() + ESPERA_RETENTATIVA_MS).toISOString();
          const remarcar = podeTentar
            ? { next_run_at: nextRun && nextRun < retryAt ? nextRun : retryAt, is_active: true }
            : {};
          await gravarResultado(ann.id, {
            last_error: (entrega.erro ?? "").slice(0, 400),
            last_error_at: nowIso,
            retry_count: tentativasGastas + 1,
            ...remarcar,
          });
          console.error("push não entregue para", ann.id, entrega.erro, podeTentar ? "(retentativa marcada)" : "(desistindo)");
          falhas++;
        }
      } catch (e) {
        console.error("Failed to process announcement", ann.id, e);
        falhas++;
      }
    }

    return new Response(JSON.stringify({ processed, falhas, total: due?.length ?? 0 }), {
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
