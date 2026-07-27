import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

/**
 * Carteira de Talentos (moeda do jogo). Servidor-autoritativo:
 * - balance   = saldo resgatado (gastável na loja)
 * - unclaimed = ganho aguardando resgate (dispara o pop-up)
 * Ganha-se concluindo capítulos e acertando desafios (trigger no banco).
 */
export const useRPGTalents = (userId: string | undefined) => {
  const [balance, setBalance] = useState(0);
  const [unclaimed, setUnclaimed] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchWallet = useCallback(async () => {
    if (!userId) { setLoading(false); return; }
    const { data } = await supabase
      .from("rpg_talents")
      .select("balance, unclaimed")
      .eq("user_id", userId)
      .maybeSingle();
    setBalance((data as { balance?: number } | null)?.balance ?? 0);
    setUnclaimed((data as { unclaimed?: number } | null)?.unclaimed ?? 0);
    setLoading(false);
  }, [userId]);

  useEffect(() => { fetchWallet(); }, [fetchWallet]);

  // outras partes do app (ex.: resgate diário) avisam que o saldo mudou
  useEffect(() => {
    const onChange = () => { fetchWallet(); };
    window.addEventListener("rpg:talents-changed", onChange);
    return () => window.removeEventListener("rpg:talents-changed", onChange);
  }, [fetchWallet]);

  /** Resgata os talentos pendentes. Retorna quanto foi resgatado. */
  const claim = useCallback(async (): Promise<number> => {
    const { data, error } = await supabase.rpc("rpg_claim_talents" as never);
    if (error) { console.error("claim talents error:", error); return 0; }
    const res = data as { claimed?: number; balance?: number } | null;
    if (res) {
      setBalance(res.balance ?? 0);
      setUnclaimed(0);
      return res.claimed ?? 0;
    }
    return 0;
  }, []);

  return { balance, unclaimed, loading, claim, refetch: fetchWallet, setBalance };
};
