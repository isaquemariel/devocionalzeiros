import { useSyncExternalStore, useEffect, useCallback } from "react";
import { buscarEstatisticas, montarConquistas, type Conquista } from "@/lib/conquistas";

/**
 * As conquistas prontas para resgatar — o selo do cabeçalho e o aviso do
 * Devocionalzeiro. Usa a MESMA lista da página (`lib/conquistas`).
 *
 * UMA loja para todas as telas: antes cada instância tinha o seu estado, e o
 * aviso novo do Devocionalzeiro não atualizava o selo do cabeçalho; cada
 * resgate também disparava duas buscas completas em paralelo. Agora o pedido
 * no ar é compartilhado, e a resposta de uma conta que já saiu é descartada.
 */
const CACHE_TTL = 5 * 60 * 1000;

let estado: { userId: string | null; lista: Conquista[]; fetchedAt: number; loading: boolean } = {
  userId: null, lista: [], fetchedAt: 0, loading: true,
};
let noAr: { userId: string; p: Promise<void>; desde: number } | null = null;
const ouvintes = new Set<() => void>();
const mudar = (novo: Partial<typeof estado>) => { estado = { ...estado, ...novo }; ouvintes.forEach((f) => f()); };
const assinar = (f: () => void) => { ouvintes.add(f); return () => { ouvintes.delete(f); }; };

function buscar(userId: string, fresco: boolean): Promise<void> {
  if (!fresco && estado.userId === userId && Date.now() - estado.fetchedAt < CACHE_TTL) return Promise.resolve();
  // o mesmo pedido serve a todas as telas (um evento chega a todas juntas)
  if (noAr && noAr.userId === userId && (!fresco || Date.now() - noAr.desde < 800)) return noAr.p;
  if (estado.userId !== userId) mudar({ userId, lista: [], fetchedAt: 0, loading: true });
  const p = (async () => {
    try {
      const { estat, resgatadas } = await buscarEstatisticas(userId);
      if (estado.userId !== userId) return; // trocou de conta no meio
      const lista = montarConquistas(estat, resgatadas).filter((c) => c.desbloqueada && !c.resgatada);
      mudar({ lista, fetchedAt: Date.now(), loading: false });
    } catch (e) {
      console.error("Error fetching claimable achievements:", e);
      if (estado.userId === userId) mudar({ loading: false });
    } finally {
      if (noAr?.p === p) noAr = null;
    }
  })();
  noAr = { userId, p, desde: Date.now() };
  return p;
}

export const useClaimableAchievements = (userId: string | undefined) => {
  const s = useSyncExternalStore(assinar, () => estado, () => estado);

  useEffect(() => {
    if (!userId) { if (estado.userId !== null) mudar({ userId: null, lista: [], fetchedAt: 0, loading: false }); return; }
    void buscar(userId, false);
  }, [userId]);

  // resgatou (em qualquer tela) ou algo mudou as estatísticas: refaz a conta (uma vez)
  useEffect(() => {
    if (!userId) return;
    const fresco = () => { void buscar(userId, true); };
    window.addEventListener("achievement-claimed", fresco);
    window.addEventListener("achievements-refresh", fresco);
    return () => {
      window.removeEventListener("achievement-claimed", fresco);
      window.removeEventListener("achievements-refresh", fresco);
    };
  }, [userId]);

  const refetch = useCallback(() => (userId ? buscar(userId, true) : Promise.resolve()), [userId]);
  const minhas = userId && s.userId === userId ? s.lista : [];

  return {
    resgataveis: minhas,
    claimableCount: minhas.length,
    claimablePoints: minhas.reduce((t, c) => t + c.pontos, 0),
    loading: !!userId && (s.userId !== userId || s.loading),
    refetch,
  };
};
