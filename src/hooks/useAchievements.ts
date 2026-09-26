import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { buscarEstatisticas, montarConquistas, type Conquista } from "@/lib/conquistas";

export type { Conquista };

type Resgate = { success: boolean; points?: number; jaEra?: boolean };

/**
 * As conquistas da pessoa (a lista e a conta moram em `lib/conquistas`) e o
 * RESGATE.
 *
 * - O resgate confere a resposta do banco (que agora também confere se a
 *   conquista foi mesmo alcançada): recusado não vira "resgatada".
 * - Já resgatada noutro aparelho (23505) não vira "+N pontos" de novo.
 * - Erro ao carregar vira ESTADO (`erro`), com nova tentativa — não uma lista
 *   vazia que parecia "todas resgatadas".
 * - Trocou de conta com um pedido no ar: a resposta velha é descartada.
 */
export const useAchievements = (userId: string | undefined) => {
  const [conquistas, setConquistas] = useState<Conquista[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(false);
  const pedido = useRef(0);

  const fetchAchievements = useCallback(async () => {
    const meu = ++pedido.current;
    if (!userId) { setConquistas([]); setErro(false); setLoading(false); return; }
    setErro(false);
    try {
      const { estat, resgatadas } = await buscarEstatisticas(userId);
      if (meu !== pedido.current) return;
      setConquistas(montarConquistas(estat, resgatadas));
    } catch (error) {
      if (meu !== pedido.current) return;
      console.error("Error fetching achievements:", error);
      setErro(true);
    } finally {
      if (meu === pedido.current) setLoading(false);
    }
  }, [userId]);

  // outra conta: nada da anterior fica na tela enquanto a nova carrega
  useEffect(() => { setConquistas([]); setLoading(true); }, [userId]);

  const totalClaimablePoints = conquistas.filter((c) => c.desbloqueada && !c.resgatada).reduce((s, c) => s + c.pontos, 0);

  const claimAchievement = async (id: string): Promise<Resgate> => {
    if (!userId) return { success: false };
    const c = conquistas.find((x) => x.id === id);
    if (!c || !c.desbloqueada || c.resgatada) return { success: false };
    const { error } = await supabase
      .from("achievement_claims" as never)
      .insert({ user_id: userId, achievement_id: id, points_awarded: c.pontos } as never);
    const jaEra = (error as { code?: string } | null)?.code === "23505";
    if (error && !jaEra) {
      console.error("Error claiming achievement:", error);
      return { success: false };
    }
    setConquistas((prev) => prev.map((x) => (x.id === id ? { ...x, resgatada: true } : x)));
    // já era dela (outro aparelho, duplo toque): marca, mas não soma de novo
    return { success: true, points: jaEra ? 0 : c.pontos, jaEra };
  };

  const claimAllAchievements = async (): Promise<{ success: boolean; totalPoints: number }> => {
    if (!userId) return { success: false, totalPoints: 0 };
    const pendentes = conquistas.filter((c) => c.desbloqueada && !c.resgatada);
    if (!pendentes.length) return { success: false, totalPoints: 0 };
    const { error } = await supabase
      .from("achievement_claims" as never)
      .insert(pendentes.map((c) => ({ user_id: userId, achievement_id: c.id, points_awarded: c.pontos })) as never);
    if (error) {
      // um lote com uma recusada falha inteiro: resgata uma a uma e soma só as NOVAS
      let total = 0;
      let alguma = false;
      for (const c of pendentes) {
        const r = await claimAchievement(c.id);
        if (r.success) { alguma = true; total += r.points ?? 0; }
      }
      await fetchAchievements();
      if (!alguma) console.error("Error claiming all achievements:", error);
      return { success: alguma, totalPoints: total };
    }
    const total = pendentes.reduce((s, c) => s + c.pontos, 0);
    const ids = new Set(pendentes.map((c) => c.id));
    setConquistas((prev) => prev.map((x) => (ids.has(x.id) ? { ...x, resgatada: true } : x)));
    return { success: true, totalPoints: total };
  };

  useEffect(() => { fetchAchievements(); }, [fetchAchievements]);

  return { conquistas, loading, erro, totalClaimablePoints, claimAchievement, claimAllAchievements, refetch: fetchAchievements };
};
