import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";

export type PlanType = "gratuito" | "start" | "gold" | "premium" | "embaixador" | null;

export interface PlanAccess {
  planType: PlanType;
  loading: boolean;
  hasAccessTo: (feature: string) => boolean;
  getLockedFeatures: () => string[];
}

// Feature access mapping
const PLAN_FEATURES: Record<string, string[]> = {
  gratuito: ["devocional", "ranking"],
  start: ["leitura", "devocional", "ranking"],
  gold: ["leitura", "devocional", "ranking", "quiz", "chat"],
  premium: ["leitura", "devocional", "ranking", "quiz", "chat", "sermao"],
  embaixador: ["leitura", "devocional", "ranking", "quiz", "chat", "sermao"],
};

// All features for comparison
const ALL_FEATURES = ["leitura", "devocional", "ranking", "quiz", "chat", "sermao"];

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
          setPlanType("gratuito"); // Default to free plan on error
        } else {
          setPlanType((data as PlanType) || "gratuito");
        }
      } catch (err) {
        console.error("Error in fetchUserPlan:", err);
        setPlanType("gratuito");
      } finally {
        setLoading(false);
      }
    };

    fetchUserPlan();
  }, [userEmail]);

  const hasAccessTo = useMemo(() => {
    return (feature: string): boolean => {
      if (!planType) return false;
      const allowedFeatures = PLAN_FEATURES[planType] || [];
      return allowedFeatures.includes(feature);
    };
  }, [planType]);

  const getLockedFeatures = useMemo(() => {
    return (): string[] => {
      if (!planType) return ALL_FEATURES;
      const allowedFeatures = PLAN_FEATURES[planType] || [];
      return ALL_FEATURES.filter((f) => !allowedFeatures.includes(f));
    };
  }, [planType]);

  return {
    planType,
    loading,
    hasAccessTo,
    getLockedFeatures,
  };
};
