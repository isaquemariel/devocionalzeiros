import { supabase } from "@/integrations/supabase/client";
import type { Json, TablesUpdate } from "@/integrations/supabase/types";
import type { Estado } from "./tipos";
import { apagarRascunho, lerRascunho, sanearRespostas } from "./motor";

/**
 * Leva as respostas da jornada para o perfil, DEPOIS que a conta existe.
 *
 * Roda nos dois caminhos: logo após o `signUp` por e-mail e na volta do
 * Google. Por isso é IDEMPOTENTE e CONSERVADOR — só preenche campo VAZIO:
 *
 * - Quem já tinha conta e escolhe "Continuar com Google" no fim da jornada
 *   cai na conta antiga. Sobrescrever o nome, a origem ou o WhatsApp dela
 *   com as respostas de agora apagaria dado bom com dado de um clique.
 * - Rodar duas vezes (efeito do React em dobro, volta do Google repetida)
 *   não pode estragar nada.
 *
 * O rascunho só é apagado depois do update dar certo. Se a rede falhar, ele
 * fica enquanto a aba viver (ver `motor.ts`), e o próximo login nela aplica.
 */
export type ResultadoAplicacao = "aplicada" | "nada" | "falhou";

export async function aplicarJornada(userId: string, estado: Estado | null = lerRascunho()): Promise<ResultadoAplicacao> {
  if (!estado) return "nada";
  // Saneado de novo aqui, na porta do banco: o estado pode ter vindo do
  // armazenamento do aparelho, e o perfil só recebe o que o roteiro produziria.
  const r = sanearRespostas(estado.respostas);
  // rascunho que nem passou do "Bora!" não tem nada a gravar
  if (!r.apelido && !r.origem && !r.meta_min) {
    apagarRascunho();
    return "nada";
  }

  const { data: atual, error: erroLer } = await supabase
    .from("profiles")
    .select("full_name, referral_source, whatsapp_phone, jornada")
    .eq("user_id", userId)
    .maybeSingle();
  if (erroLer) return "falhou";
  // O perfil nasce por trigger no insert de auth.users; se ainda não existe,
  // é corrida com o trigger — melhor tentar de novo depois do que criar à mão.
  if (!atual) return "falhou";

  const vazio = (v: unknown) => v === null || v === undefined || (typeof v === "string" && !v.trim());
  const mudancas: TablesUpdate<"profiles"> = {};

  if (vazio(atual.full_name) && r.apelido) mudancas.full_name = r.apelido.trim();
  if (vazio(atual.referral_source) && r.origem) mudancas.referral_source = r.origem;
  if (vazio(atual.whatsapp_phone) && r.whatsapp?.numero) {
    mudancas.whatsapp_phone = `${r.whatsapp.ddi.replace("+", "")}${r.whatsapp.numero.replace(/\D/g, "")}`;
    mudancas.whatsapp_country_code = r.whatsapp.ddi;
  }
  if (vazio(atual.jornada)) {
    const jornada = {
      v: 1,
      apelido: r.apelido?.trim() ?? null,
      motivos: r.motivos ?? [],
      familiaridade: r.familiaridade ?? null,
      meta_min: r.meta_min ?? null,
      concluida_em: new Date().toISOString(),
    };
    mudancas.jornada = jornada as unknown as Json;
  }

  if (Object.keys(mudancas).length > 0) {
    const { error } = await supabase.from("profiles").update(mudancas).eq("user_id", userId);
    if (error) return "falhou";
  }
  apagarRascunho();
  return "aplicada";
}
