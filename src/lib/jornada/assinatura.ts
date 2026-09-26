import { supabase } from "@/integrations/supabase/client";
import { invalidatePlanCache } from "@/hooks/useUserPlan";
import type { ChavePago } from "@/lib/planos";

/**
 * Depois do pagamento, ESPERA o plano existir de verdade antes de soltar a
 * pessoa no app.
 *
 * Quem concede o plano é o webhook do Stripe (`stripe-webhook`), que grava em
 * `authorized_purchases`; o app lê pelo `get_user_plan_type`. O webhook chega
 * segundos DEPOIS de a tela de pagamento dizer "concluído". Sem esperar, a
 * Home perguntava o plano cedo, recebia "free" e guardava isso em cache por 5
 * minutos — a pessoa pagava e via o app sem a etiqueta do plano e com tudo
 * trancado.
 *
 * Pergunta ao banco (a mesma função que o app inteiro usa) até o plano
 * aparecer, e então descarta o cache: a próxima tela já lê o plano novo.
 * Devolve `false` se o tempo acabar — o pagamento foi feito, mas o plano ainda
 * não chegou, e a tela precisa dizer isso com honestidade.
 */
export async function esperarPlano(
  email: string,
  plano: ChavePago,
  { tentativas = 16, intervaloMs = 1500 }: { tentativas?: number; intervaloMs?: number } = {},
): Promise<boolean> {
  // premium e embaixador incluem tudo do gold; admin inclui tudo
  const serve = (p: unknown) =>
    p === plano || p === "admin" || (plano === "gold" && (p === "premium" || p === "embaixador")) || (plano === "premium" && p === "embaixador");
  for (let i = 0; i < tentativas; i++) {
    try {
      const { data } = await supabase.rpc("get_user_plan_type", { email_input: email });
      if (serve(data)) {
        invalidatePlanCache(email);
        return true;
      }
    } catch {
      /* rede instável: tenta de novo */
    }
    await new Promise((r) => setTimeout(r, intervaloMs));
  }
  invalidatePlanCache(email);
  return false;
}
