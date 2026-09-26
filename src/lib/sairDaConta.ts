import { apagarRascunho } from "@/lib/jornada/motor";
import { esquecerQuemVolta } from "@/lib/devocionalzeiro/quemVolta";
import { soltarPushDesteAparelho } from "@/lib/pushDoAparelho";

/**
 * SAIR DA CONTA sem deixar rastro da conta no aparelho.
 *
 * Chame ANTES do `supabase.auth.signOut()` (ainda com a sessão válida):
 * - os pushes deste aparelho deixam de ser da conta que sai;
 * - o destino pendurado de um cadastro abandonado (`post_signup_redirect`) e
 *   o rascunho da jornada não vão parar na próxima pessoa que entrar.
 * O "Oi de novo, <nome>" da tela inicial (`quemVolta`) fica — é de propósito.
 */
export async function prepararSaida(): Promise<void> {
  await soltarPushDesteAparelho().catch(() => undefined);
  try { localStorage.removeItem("post_signup_redirect"); } catch { /* ok */ }
  apagarRascunho();
}

/**
 * CONTA EXCLUÍDA: some tudo dela no aparelho — o nome da tela inicial, o
 * visual do RPG, o que ela possuía, os avisos de conquista… Toda chave local
 * da conta leva o id dela no nome, então basta varrer por ele.
 */
export function limparDadosLocaisDaConta(uid: string | undefined | null): void {
  esquecerQuemVolta();
  if (!uid) return;
  try {
    const chaves: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.includes(uid)) chaves.push(k);
    }
    chaves.forEach((k) => localStorage.removeItem(k));
  } catch { /* sem armazenamento: nada a limpar */ }
}
