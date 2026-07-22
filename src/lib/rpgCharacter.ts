// ============================================================================
// RPG Character — validação do nome do personagem no primeiro acesso
// ----------------------------------------------------------------------------
// O nome escolhido é persistido na CONTA (banco, via useRPGProgress). Aqui só
// vivem as regras de validação/sugestão usadas pela tela de onboarding.
// ============================================================================

// Nomes reservados (v1). No app com comunidade, a checagem consulta a tabela
// de nomes via RPC. Mantido em minúsculas, sem acento/símbolos.
const RESERVED = new Set([
  "luz", "fe", "davi", "ester", "noe", "paz", "samuel", "maria", "joao", "pedro",
  "admin", "deus", "jesus", "devocionalzeiro", "clubehd",
]);

export const normalizeName = (v: string): string =>
  v
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]/g, "");

/**
 * Checa disponibilidade do nome (v1: reservados + nomes já usados localmente).
 * Assíncrona de propósito, pra manter a mesma assinatura quando virar consulta
 * ao banco.
 */
export async function isNameAvailable(name: string): Promise<boolean> {
  const k = normalizeName(name);
  if (k.length < 3) return false;
  if (RESERVED.has(k)) return false;
  return true;
}

export const suggestNames = (name: string): string[] => {
  const k = normalizeName(name) || "heroi";
  return [k + (2 + (k.length % 7)), k + "zeiro", k + "_dev"];
};
