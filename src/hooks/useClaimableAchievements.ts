import { useState, useEffect, useCallback } from "react";
import { buscarEstatisticas, montarConquistas, type Conquista } from "@/lib/conquistas";

// Cache para não refazer a conta a cada tela (5 min); o resgate invalida.
let cachedData: { userId: string; lista: Conquista[]; fetchedAt: number } | null = null;
const CACHE_TTL = 5 * 60 * 1000;

/**
 * As conquistas prontas para resgatar — o selo do cabeçalho e o aviso do
 * Devocionalzeiro. Usa a MESMA lista da página (`lib/conquistas`): antes havia
 * aqui uma cópia com 28 das 43, e o selo contava menos que a página.
 */
export const useClaimableAchievements = (userId: string | undefined) => {
  const [resgataveis, setResgataveis] = useState<Conquista[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchClaimable = useCallback(async (fresco = false) => {
    if (!userId) { setResgataveis([]); setLoading(false); return; }
    if (!fresco && cachedData && cachedData.userId === userId && Date.now() - cachedData.fetchedAt < CACHE_TTL) {
      setResgataveis(cachedData.lista);
      setLoading(false);
      return;
    }
    try {
      const { estat, resgatadas } = await buscarEstatisticas(userId);
      const lista = montarConquistas(estat, resgatadas).filter((c) => c.desbloqueada && !c.resgatada);
      cachedData = { userId, lista, fetchedAt: Date.now() };
      setResgataveis(lista);
    } catch (e) {
      console.error("Error fetching claimable achievements:", e);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => { fetchClaimable(); }, [fetchClaimable]);

  // resgatou (em qualquer tela) ou algo mudou as estatísticas: refaz a conta
  useEffect(() => {
    const fresco = () => { cachedData = null; fetchClaimable(true); };
    window.addEventListener("achievement-claimed", fresco);
    window.addEventListener("achievements-refresh", fresco);
    return () => {
      window.removeEventListener("achievement-claimed", fresco);
      window.removeEventListener("achievements-refresh", fresco);
    };
  }, [fetchClaimable]);

  return {
    resgataveis,
    claimableCount: resgataveis.length,
    claimablePoints: resgataveis.reduce((s, c) => s + c.pontos, 0),
    loading,
    refetch: () => { cachedData = null; return fetchClaimable(true); },
  };
};
