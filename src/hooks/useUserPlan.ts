import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";

export type PlanType = "gold" | "premium" | "embaixador" | "admin" | "inactive" | "free" | null;

export interface PlanAccess {
  planType: PlanType;
  loading: boolean;
  isInactive: boolean;
  hasAccessTo: (feature: string) => boolean;
  getLockedFeatures: () => string[];
  hasPaidPlan: boolean;
}

const PLAN_FEATURES: Record<string, string[]> = {
  free: ["leitura", "devocional", "ranking", "quiz", "bibliaEstudo", "estudoVersiculo", "rpg"],
  gold: ["leitura", "devocional", "ranking", "quiz", "chat", "sermao", "bibliaEstudo", "estudoVersiculo", "rpg"],
  premium: ["leitura", "devocional", "ranking", "quiz", "chat", "sermao", "bibliaEstudo", "estudoVersiculo", "embaixador", "rpg"],
  embaixador: ["leitura", "devocional", "ranking", "quiz", "chat", "sermao", "bibliaEstudo", "estudoVersiculo", "embaixador", "rpg"],
  admin: ["leitura", "devocional", "ranking", "quiz", "chat", "sermao", "admin", "bibliaEstudo", "estudoVersiculo", "embaixador", "rpg"],
};

const ALL_FEATURES = ["leitura", "devocional", "ranking", "quiz", "chat", "sermao", "bibliaEstudo", "estudoVersiculo", "embaixador", "rpg"];

// Module-level cache to avoid re-fetching for the same email within the session
const planCache = new Map<string, { planType: PlanType; fetchedAt: number }>();
const PLAN_CACHE_TTL = 5 * 60 * 1000; // 5 minutes

/** Descarta o plano guardado em cache. Sem isto, depois de um upgrade (compra
 *  aprovada ou mudança pelo painel admin) o usuário continuaria vendo o plano
 *  antigo por até 5 minutos, mesmo com o banco já atualizado. Chame ao voltar
 *  do checkout ou ao trocar o plano de alguém. Sem argumento, limpa tudo. */
export const invalidatePlanCache = (email?: string) => {
  if (email) planCache.delete(email);
  else planCache.clear();
};

// Nunca bloqueamos ninguém por inatividade/assinatura vencida: uma conta
// "inactive" volta a ser tratada como FREE. A pessoa mantém a conta e o acesso
// gratuito pelo tempo que quiser — só perde tudo se EXCLUIR a própria conta.
const normalizePlan = (p: PlanType): PlanType => (p === "inactive" ? "free" : p);

export const useUserPlan = (userEmail?: string): PlanAccess => {
  const cached = userEmail ? planCache.get(userEmail) : null;
  const isValidCache = cached && (Date.now() - cached.fetchedAt < PLAN_CACHE_TTL);

  const [planType, setPlanType] = useState<PlanType>(isValidCache ? normalizePlan(cached!.planType) : null);
  const [loading, setLoading] = useState(!isValidCache);

  useEffect(() => {
    if (!userEmail) {
      setLoading(false);
      return;
    }

    const fetchUserPlan = async () => {
      try {
        const { data, error } = await supabase
          .rpc('get_user_plan_type', { email_input: userEmail });

        if (error) {
          console.error("Error fetching user plan:", error);
          setPlanType("free");
        } else {
          const returnedPlan = normalizePlan((data as PlanType) || "free");
          setPlanType(returnedPlan);
          planCache.set(userEmail, { planType: returnedPlan, fetchedAt: Date.now() });
        }
      } catch (err) {
        console.error("Error in fetchUserPlan:", err);
        setPlanType("free");
      } finally {
        setLoading(false);
      }
    };

    // Cache ainda fresco: aproveita e não consulta agora. O listener abaixo
    // continua registrado — antes ele ficava fora do caminho justamente no caso
    // mais comum (cache válido), e a revalidação nunca acontecia.
    const emCache = planCache.get(userEmail);
    if (emCache && Date.now() - emCache.fetchedAt < PLAN_CACHE_TTL) {
      setPlanType(normalizePlan(emCache.planType));
      setLoading(false);
    } else {
      fetchUserPlan();
    }

    // Revalida ao VOLTAR para o app. Sem isto, uma mudança de plano feita no
    // painel só chegaria ao aparelho da pessoa no próximo recarregamento — ela
    // continuaria vendo o plano antigo mesmo com o banco já atualizado. Ao
    // reabrir o app, o cache é descartado e o plano é buscado de novo.
    const revalidarAoVoltar = () => {
      if (document.visibilityState !== "visible") return;
      const atual = planCache.get(userEmail);
      // Só refaz se o cache já tem alguma idade, para não disparar uma consulta
      // a cada alternância rápida de aba.
      if (atual && Date.now() - atual.fetchedAt < 30_000) return;
      planCache.delete(userEmail);
      fetchUserPlan();
    };
    document.addEventListener("visibilitychange", revalidarAoVoltar);
    window.addEventListener("focus", revalidarAoVoltar);
    return () => {
      document.removeEventListener("visibilitychange", revalidarAoVoltar);
      window.removeEventListener("focus", revalidarAoVoltar);
    };
  }, [userEmail]);

  const isInactive = planType === "inactive";
  
  const hasPaidPlan = planType !== "free" && planType !== "inactive" && planType !== null;

  const hasAccessTo = useMemo(() => {
    return (feature: string): boolean => {
      if (!planType || planType === "inactive") return false;
      const allowedFeatures = PLAN_FEATURES[planType] || PLAN_FEATURES.free;
      return allowedFeatures.includes(feature);
    };
  }, [planType]);

  const getLockedFeatures = useMemo(() => {
    return (): string[] => {
      if (!planType || planType === "inactive") return ALL_FEATURES;
      const allowedFeatures = PLAN_FEATURES[planType] || PLAN_FEATURES.free;
      return ALL_FEATURES.filter((f) => !allowedFeatures.includes(f));
    };
  }, [planType]);

  return {
    planType,
    loading,
    isInactive,
    hasAccessTo,
    getLockedFeatures,
    hasPaidPlan,
  };
};
