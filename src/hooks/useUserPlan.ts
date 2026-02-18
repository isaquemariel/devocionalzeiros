import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";

export type PlanType = "start" | "gold" | "premium" | "embaixador" | "admin" | "inactive" | "free" | null;

export interface PlanAccess {
  planType: PlanType;
  loading: boolean;
  isInactive: boolean;
  hasAccessTo: (feature: string) => boolean;
  getLockedFeatures: () => string[];
  hasPaidPlan: boolean;
}

// Feature access mapping
// FREE (não comprou nada) = apenas devocional + embaixador
// START (plano pago básico) = leitura, devocional, ranking, bibliaEstudo
// GOLD = START + quiz, estudoVersiculo
// PREMIUM = GOLD + chat, sermao
// Admin = tudo
const PLAN_FEATURES: Record<string, string[]> = {
  free: ["devocional", "embaixador"],
  start: ["leitura", "devocional", "ranking", "bibliaEstudo", "embaixador"],
  gold: ["leitura", "devocional", "ranking", "quiz", "bibliaEstudo", "estudoVersiculo", "embaixador"],
  premium: ["leitura", "devocional", "ranking", "quiz", "chat", "sermao", "bibliaEstudo", "estudoVersiculo", "embaixador", "rpg"],
  embaixador: ["leitura", "devocional", "ranking", "quiz", "chat", "sermao", "bibliaEstudo", "estudoVersiculo", "embaixador", "rpg"],
  admin: ["leitura", "devocional", "ranking", "quiz", "chat", "sermao", "admin", "bibliaEstudo", "estudoVersiculo", "embaixador", "rpg"],
};

// All features for comparison
const ALL_FEATURES = ["leitura", "devocional", "ranking", "quiz", "chat", "sermao", "bibliaEstudo", "estudoVersiculo", "embaixador", "rpg"];

export const useUserPlan = (userEmail?: string): PlanAccess => {
  const [planType, setPlanType] = useState<PlanType>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserPlan = async () => {
      if (!userEmail) {
        setLoading(false);
        return;
      }

      try {
        // Use secure RPC function that validates user's own email via JWT
        const { data, error } = await supabase
          .rpc('get_user_plan_type', { email_input: userEmail });

        if (error) {
          console.error("Error fetching user plan:", error);
          // Default to free (não comprou nada) on error
          setPlanType("free");
        } else {
          // If no plan type found (null/empty), user is free (não comprou nenhum plano)
          const returnedPlan = data as PlanType;
          if (!returnedPlan || returnedPlan === null) {
            setPlanType("free");
          } else {
            setPlanType(returnedPlan);
          }
        }
      } catch (err) {
        console.error("Error in fetchUserPlan:", err);
        // Default to free
        setPlanType("free");
      } finally {
        setLoading(false);
      }
    };

    fetchUserPlan();
  }, [userEmail]);

  const isInactive = planType === "inactive";
  
  // Verifica se tem plano pago (start, gold, premium, embaixador, admin)
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
