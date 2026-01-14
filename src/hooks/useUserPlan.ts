import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";

export type PlanType = "start" | "gold" | "premium" | "embaixador" | "admin" | "inactive" | null;

export interface PlanAccess {
  planType: PlanType;
  loading: boolean;
  isInactive: boolean;
  hasAccessTo: (feature: string) => boolean;
  getLockedFeatures: () => string[];
}

// Feature access mapping - admin has access to everything including admin panel
const PLAN_FEATURES: Record<string, string[]> = {
  start: ["leitura", "devocional", "ranking"],
  gold: ["leitura", "devocional", "ranking", "quiz", "bibliaEstudo"],
  premium: ["leitura", "devocional", "ranking", "quiz", "chat", "sermao", "bibliaEstudo"],
  embaixador: ["leitura", "devocional", "ranking", "quiz", "chat", "sermao", "bibliaEstudo"],
  admin: ["leitura", "devocional", "ranking", "quiz", "chat", "sermao", "admin", "bibliaEstudo"],
};

// All features for comparison
const ALL_FEATURES = ["leitura", "devocional", "ranking", "quiz", "chat", "sermao", "bibliaEstudo"];

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
          setPlanType("start"); // Default to free plan on error
        } else {
          setPlanType((data as PlanType) || "start");
        }
      } catch (err) {
        console.error("Error in fetchUserPlan:", err);
        setPlanType("start");
      } finally {
        setLoading(false);
      }
    };

    fetchUserPlan();
  }, [userEmail]);

  const isInactive = planType === "inactive";

  const hasAccessTo = useMemo(() => {
    return (feature: string): boolean => {
      if (!planType || planType === "inactive") return false;
      const allowedFeatures = PLAN_FEATURES[planType] || [];
      return allowedFeatures.includes(feature);
    };
  }, [planType]);

  const getLockedFeatures = useMemo(() => {
    return (): string[] => {
      if (!planType || planType === "inactive") return ALL_FEATURES;
      const allowedFeatures = PLAN_FEATURES[planType] || [];
      return ALL_FEATURES.filter((f) => !allowedFeatures.includes(f));
    };
  }, [planType]);

  return {
    planType,
    loading,
    isInactive,
    hasAccessTo,
    getLockedFeatures,
  };
};
