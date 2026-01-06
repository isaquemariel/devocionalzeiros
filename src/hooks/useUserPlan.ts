import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";

export type PlanType = "start" | "gold" | "premium" | null;

export interface PlanAccess {
  planType: PlanType;
  loading: boolean;
  hasAccessTo: (feature: string) => boolean;
  getLockedFeatures: () => string[];
}

// Feature access mapping
const PLAN_FEATURES: Record<string, string[]> = {
  start: ["leitura", "devocional", "ranking"],
  gold: ["leitura", "devocional", "ranking", "quiz", "chat"],
  premium: ["leitura", "devocional", "ranking", "quiz", "chat", "sermao"],
};

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
        const { data, error } = await supabase
          .from("authorized_purchases")
          .select("plan_type")
          .eq("email", userEmail.toLowerCase().trim())
          .eq("status", "active")
          .maybeSingle();

        if (error) {
          console.error("Error fetching user plan:", error);
          setPlanType(null);
        } else {
          setPlanType((data?.plan_type as PlanType) || null);
        }
      } catch (err) {
        console.error("Error in fetchUserPlan:", err);
        setPlanType(null);
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
      if (!planType) return Object.keys(PLAN_FEATURES.premium);
      const allowedFeatures = PLAN_FEATURES[planType] || [];
      const allFeatures = PLAN_FEATURES.premium;
      return allFeatures.filter((f) => !allowedFeatures.includes(f));
    };
  }, [planType]);

  return {
    planType,
    loading,
    hasAccessTo,
    getLockedFeatures,
  };
};
