// ============================================================================
// RPG Character — validação do nome do personagem no primeiro acesso.
// ----------------------------------------------------------------------------
// Regras: SÓ letras (com acento), de 3 a 10 letras, e ÚNICO entre todos os
// usuários (checado no banco via RPC is_character_name_available, pois a RLS
// não deixa o cliente ler os nomes das outras contas).
// ============================================================================
import { supabase } from "@/integrations/supabase/client";

// Nomes reservados (bloqueados independentemente do banco).
const RESERVED = new Set([
  "admin", "deus", "jesus", "devocionalzeiro", "devocionalzeiros", "clubehd", "suporte",
]);

export const NAME_MIN = 3;
export const NAME_MAX = 10;

// remove acentos e baixa a caixa — chave de comparação/normalização
export const normalizeName = (v: string): string =>
  v
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z]/g, "");

// mantém só letras (com acento) — usado no onChange do input
export const sanitizeName = (v: string): string =>
  v.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ]/g, "").slice(0, NAME_MAX);

// validação local (formato). Retorna motivo quando inválido.
export function validateNameFormat(v: string): { ok: boolean; reason?: string } {
  const t = v.trim();
  if (!t) return { ok: false };
  if (!/^[A-Za-zÀ-ÖØ-öø-ÿ]+$/.test(t)) return { ok: false, reason: "Use apenas letras (sem números ou símbolos)." };
  if (t.length < NAME_MIN) return { ok: false, reason: `Curto demais (mín. ${NAME_MIN} letras).` };
  if (t.length > NAME_MAX) return { ok: false, reason: `Máximo de ${NAME_MAX} letras.` };
  if (RESERVED.has(normalizeName(t))) return { ok: false, reason: "Esse nome é reservado." };
  return { ok: true };
}

export type DisponibilidadeNome = "livre" | "em-uso" | "falhou";

/**
 * Disponibilidade real: valida o formato e consulta o banco (RPC), excluindo o
 * próprio usuário (para reconfirmar o mesmo nome).
 *
 * Três respostas, não duas: antes, uma falha do RPC respondia "disponível"
 * (fail-open) — a pessoa via o ✓, seguia o tutorial inteiro e só no fim o
 * banco recusava. Agora "não consegui verificar" é um estado próprio, e o
 * botão de confirmar espera uma resposta de verdade.
 */
export async function verificarNome(name: string): Promise<DisponibilidadeNome> {
  if (!validateNameFormat(name).ok) return "em-uso";
  try {
    const { data: auth } = await supabase.auth.getUser();
    const { data, error } = await supabase.rpc("is_character_name_available", {
      name_input: name.trim(),
      exclude_user: auth?.user?.id ?? null,
    });
    if (error) { console.warn("name availability RPC failed:", error.message); return "falhou"; }
    return data === true ? "livre" : "em-uso";
  } catch (e) {
    console.warn("name availability check error:", e);
    return "falhou";
  }
}

export const suggestNames = (name: string): string[] => {
  const base = (normalizeName(name) || "heroi").slice(0, 7);
  const cap = base.charAt(0).toUpperCase() + base.slice(1);
  // sugestões continuam sendo SÓ letras (respeita a regra)
  return [cap + "el", cap + "im", "São" + cap.slice(0, 6)].map((s) => s.slice(0, NAME_MAX));
};
