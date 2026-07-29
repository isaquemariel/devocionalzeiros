import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

/**
 * Resgate diário de Talentos + constância (streak de login). Servidor-autoritativo
 * via RPCs rpg_get_daily / rpg_claim_daily. O streak é semeado do progresso atual
 * do usuário (sem marcos retroativos) e a barra aponta para o próximo marco.
 */
export interface DailyState {
  streak: number;
  canClaim: boolean;         // ainda não resgatou hoje
  nextMilestone: number | null; // próximo marco de constância (null = maxou 365)
  lastMilestone: number;     // maior marco já alcançado
  dailyAmount: number;       // talentos da base diária
}

export interface DailyClaimResult {
  claimed: boolean;
  alreadyClaimed: boolean;
  dailyAmount: number;
  bonusAmount: number;
  bonusMilestone: number | null; // marco batido HOJE (dispara comemoração de bônus)
  total: number;
  streak: number;
  nextMilestone: number | null;
  lastMilestone: number;
  balance: number;
}

export interface UseRPGDailyReturn {
  state: DailyState | null;
  loading: boolean;
  claim: () => Promise<DailyClaimResult | null>;
  refetch: () => Promise<void>;
}

export const useRPGDaily = (userId?: string): UseRPGDailyReturn => {
  const [state, setState] = useState<DailyState | null>(null);
  const [loading, setLoading] = useState(true);

  const refetch = useCallback(async () => {
    if (!userId) { setLoading(false); return; }
    const { data, error } = await supabase.rpc("rpg_get_daily" as never);
    if (error) { console.error("rpg_get_daily error:", error); setLoading(false); return; }
    const d = data as {
      streak?: number; can_claim?: boolean; next_milestone?: number | null;
      last_milestone?: number; daily_amount?: number;
    } | null;
    if (d) {
      setState({
        streak: d.streak ?? 0,
        canClaim: !!d.can_claim,
        nextMilestone: d.next_milestone ?? null,
        lastMilestone: d.last_milestone ?? 0,
        dailyAmount: d.daily_amount ?? 1,
      });
    }
    setLoading(false);
  }, [userId]);

  useEffect(() => { refetch(); }, [refetch]);

  /** Resgata o talento do dia (base + bônus de marco). Atualiza o estado local. */
  const claim = useCallback(async (): Promise<DailyClaimResult | null> => {
    const { data, error } = await supabase.rpc("rpg_claim_daily" as never);
    if (error) { console.error("rpg_claim_daily error:", error); return null; }
    const d = data as {
      claimed?: boolean; already_claimed?: boolean; daily_amount?: number;
      bonus_amount?: number; bonus_milestone?: number | null; total?: number;
      streak?: number; next_milestone?: number | null; last_milestone?: number; balance?: number;
    } | null;
    if (!d) return null;
    const res: DailyClaimResult = {
      claimed: !!d.claimed,
      alreadyClaimed: !!d.already_claimed,
      dailyAmount: d.daily_amount ?? 0,
      bonusAmount: d.bonus_amount ?? 0,
      bonusMilestone: d.bonus_milestone ?? null,
      total: d.total ?? 0,
      streak: d.streak ?? 0,
      nextMilestone: d.next_milestone ?? null,
      lastMilestone: d.last_milestone ?? 0,
      balance: d.balance ?? 0,
    };
    setState((s) => s ? {
      ...s, streak: res.streak, canClaim: false,
      nextMilestone: res.nextMilestone, lastMilestone: res.lastMilestone,
    } : s);
    // avisa a carteira (HUD) para atualizar o saldo exibido
    if (res.claimed && res.total > 0) window.dispatchEvent(new Event("rpg:talents-changed"));
    return res;
  }, []);

  return { state, loading, claim, refetch };
};
