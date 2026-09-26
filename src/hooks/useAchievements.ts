import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { buscarEstatisticas, montarConquistas, type Conquista } from "@/lib/conquistas";

export type { Conquista };

/**
 * As conquistas da pessoa (a lista e a conta moram em `lib/conquistas`) e o
 * RESGATE.
 *
 * O resgate agora confere a resposta do banco: antes, um insert recusado (RLS,
 * gatilho, duplicado) voltava como sucesso e a tela marcava "resgatada" algo
 * que não estava gravado.
 */
export const useAchievements = (userId: string | undefined) => {
  const [conquistas, setConquistas] = useState<Conquista[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAchievements = useCallback(async () => {
    if (!userId) { setLoading(false); return; }
    try {
      const { estat, resgatadas } = await buscarEstatisticas(userId);
      setConquistas(montarConquistas(estat, resgatadas));
    } catch (error) {
      console.error("Error fetching achievements:", error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const totalClaimablePoints = conquistas.filter((c) => c.desbloqueada && !c.resgatada).reduce((s, c) => s + c.pontos, 0);

  const claimAchievement = async (id: string): Promise<{ success: boolean; points?: number }> => {
    if (!userId) return { success: false };
    const c = conquistas.find((x) => x.id === id);
    if (!c || !c.desbloqueada || c.resgatada) return { success: false };
    const { error } = await supabase
      .from("achievement_claims" as never)
      .insert({ user_id: userId, achievement_id: id, points_awarded: c.pontos } as never);
    // já resgatada (outro aparelho, duplo toque): trata como resgatada
    if (error && (error as { code?: string }).code !== "23505") {
      console.error("Error claiming achievement:", error);
      return { success: false };
    }
    setConquistas((prev) => prev.map((x) => (x.id === id ? { ...x, resgatada: true } : x)));
    return { success: true, points: c.pontos };
  };

  const claimAllAchievements = async (): Promise<{ success: boolean; totalPoints: number }> => {
    if (!userId) return { success: false, totalPoints: 0 };
    const pendentes = conquistas.filter((c) => c.desbloqueada && !c.resgatada);
    if (!pendentes.length) return { success: false, totalPoints: 0 };
    const { error } = await supabase
      .from("achievement_claims" as never)
      .insert(pendentes.map((c) => ({ user_id: userId, achievement_id: c.id, points_awarded: c.pontos })) as never);
    if (error) {
      // um lote com uma já resgatada falha inteiro: resgata uma a uma
      if ((error as { code?: string }).code === "23505") {
        let total = 0;
        for (const c of pendentes) { const r = await claimAchievement(c.id); if (r.success) total += c.pontos; }
        await fetchAchievements();
        return { success: total > 0, totalPoints: total };
      }
      console.error("Error claiming all achievements:", error);
      return { success: false, totalPoints: 0 };
    }
    const total = pendentes.reduce((s, c) => s + c.pontos, 0);
    setConquistas((prev) => prev.map((x) => (x.desbloqueada ? { ...x, resgatada: true } : x)));
    return { success: true, totalPoints: total };
  };

  useEffect(() => { fetchAchievements(); }, [fetchAchievements]);

  return { conquistas, loading, totalClaimablePoints, claimAchievement, claimAllAchievements, refetch: fetchAchievements };
};
