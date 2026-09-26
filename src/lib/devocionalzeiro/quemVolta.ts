/**
 * QUEM VOLTA — o primeiro nome e a conta da última pessoa que entrou NESTE
 * aparelho. Fica só no aparelho (localStorage), e serve para a tela inicial
 * receber quem saiu da conta pelo nome ("Oi de novo, Ana!"), com o
 * Devocionalzeiro vestido como ela o deixou no RPG, e chamá-la de volta para
 * a jornada de onde parou. Some quando a conta é excluída.
 */
const CHAVE = "dz.quemVolta";

export interface QuemVolta { nome: string; uid: string }

export function lembrarQuemVolta(uid: string, nomeCompleto: string | null | undefined): void {
  const nome = (nomeCompleto ?? "").trim().split(/\s+/)[0]?.slice(0, 24) ?? "";
  try { localStorage.setItem(CHAVE, JSON.stringify({ nome, uid })); } catch { /* sem armazenamento: tudo bem */ }
}

export function lerQuemVolta(): QuemVolta | null {
  try {
    const q = JSON.parse(localStorage.getItem(CHAVE) ?? "null") as Partial<QuemVolta> | null;
    return q && typeof q.uid === "string" ? { uid: q.uid, nome: typeof q.nome === "string" ? q.nome : "" } : null;
  } catch { return null; }
}

export function esquecerQuemVolta(): void {
  try { localStorage.removeItem(CHAVE); } catch { /* ok */ }
}
