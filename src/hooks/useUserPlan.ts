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

export const useUserPlan = (userEmail?: string): PlanAccess => {
  const cached = userEmail ? planCache.get(userEmail) : null;
  const isValidCache = cached && (Date.now() - cached.fetchedAt < PLAN_CACHE_TTL);
  
  const [planType, setPlanType] = useState<PlanType>(isValidCache ? cached!.planType : null);
  const [loading, setLoading] = useState(!isValidCache);

  useEffect(() => {
    if (!userEmail) {
      setLoading(false);
      return;
    }

    // Use cache if valid
    const cached = planCache.get(userEmail);
    if (cached && Date.now() - cached.fetchedAt < PLAN_CACHE_TTL) {
      setPlanType(cached.planType);
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
          const returnedPlan = (data as PlanType) || "free";
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

    fetchUserPlan();
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
