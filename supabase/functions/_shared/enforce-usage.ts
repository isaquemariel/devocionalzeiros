import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

/**
 * Server-side enforcement of per-user plan + daily usage limits for AI features.
 * Calls the `increment_daily_usage` RPC as the authenticated user. The RPC raises
 * when the user's plan blocks the feature or when the daily limit is reached.
 *
 * Returns a Response (which the caller MUST return) when the request should be
 * rejected, or null when the user is allowed to proceed.
 */
export async function enforceUsage(
  authHeader: string | null,
  featureKey: string
): Promise<Response | null> {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return new Response(JSON.stringify({ error: "Não autorizado" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
  const client = createClient(supabaseUrl, supabaseAnonKey, {
    global: { headers: { Authorization: authHeader } },
  });

  const { error } = await client.rpc("increment_daily_usage", { p_feature_key: featureKey });
  if (!error) return null;

  const msg = error.message || "";
  if (msg.includes("Feature blocked")) {
    return new Response(
      JSON.stringify({
        error: "Recurso não disponível no seu plano atual.",
        code: "feature_blocked",
      }),
      { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
  if (msg.includes("Daily limit")) {
    return new Response(
      JSON.stringify({
        error: "Limite diário atingido. Tente novamente amanhã ou faça upgrade do plano.",
        code: "daily_limit",
      }),
      { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
  if (msg.includes("Not authenticated")) {
    return new Response(JSON.stringify({ error: "Não autorizado" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
  console.error("enforceUsage RPC error:", msg);
  return new Response(JSON.stringify({ error: "Erro ao validar uso." }), {
    status: 500,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

/**
 * Refund one use of a feature for the authenticated user (today, Brasília),
 * flooring at 0. Call this ONLY after enforceUsage has already succeeded (i.e.
 * the counter was incremented) and the AI work then failed, so the user is not
 * charged for a request that produced nothing. Best-effort: never throws.
 */
export async function refundUsage(
  authHeader: string | null,
  featureKey: string
): Promise<void> {
  if (!authHeader || !authHeader.startsWith("Bearer ")) return;
  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const client = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    await client.rpc("refund_daily_usage", { p_feature_key: featureKey });
  } catch (e) {
    console.error("refundUsage failed:", e);
  }
}
