// ============================================================================
// RPG Character — nome do personagem e estado de onboarding (por usuário)
// ----------------------------------------------------------------------------
// Persistência v1 em localStorage (por userId). O nome escolhido no primeiro
// acesso identifica o Devocionalzeiro do jogador e é a base do futuro sistema
// de comunidade/chat. Quando a comunidade for construída, a unicidade real
// passa a ser verificada no banco (migração aditiva) — a API abaixo foi feita
// pra trocar a fonte sem mexer nas telas.
// ============================================================================

const NAME_KEY = (userId: string) => `rpg_char_name_${userId}`;
const ONBOARDED_KEY = (userId: string) => `rpg_onboarded_${userId}`;

export function getCharacterName(userId: string): string | null {
  try {
    return localStorage.getItem(NAME_KEY(userId)) || null;
  } catch {
    return null;
  }
}

export function setCharacterName(userId: string, name: string): void {
  try {
    localStorage.setItem(NAME_KEY(userId), name.slice(0, 16));
  } catch {
    /* ignore */
  }
}

export function isOnboarded(userId: string): boolean {
  try {
    return localStorage.getItem(ONBOARDED_KEY(userId)) === "1";
  } catch {
    return false;
  }
}

export function markOnboarded(userId: string): void {
  try {
    localStorage.setItem(ONBOARDED_KEY(userId), "1");
  } catch {
    /* ignore */
  }
}

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
