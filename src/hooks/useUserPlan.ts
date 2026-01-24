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
// bibliaEstudo = Bíblia de Estudo (reading + word search) - available from START
// estudoVersiculo = Verse Study + Verse Devotional (theological commentary) - GOLD+ only
const PLAN_FEATURES: Record<string, string[]> = {
  start: ["leitura", "devocional", "ranking", "bibliaEstudo"],
  gold: ["leitura", "devocional", "ranking", "quiz", "bibliaEstudo", "estudoVersiculo"],
  premium: ["leitura", "devocional", "ranking", "quiz", "chat", "sermao", "bibliaEstudo", "estudoVersiculo"],
  embaixador: ["leitura", "devocional", "ranking", "quiz", "chat", "sermao", "bibliaEstudo", "estudoVersiculo"],
  admin: ["leitura", "devocional", "ranking", "quiz", "chat", "sermao", "admin", "bibliaEstudo", "estudoVersiculo"],
};

// All features for comparison
const ALL_FEATURES = ["leitura", "devocional", "ranking", "quiz", "chat", "sermao", "bibliaEstudo", "estudoVersiculo"];

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
          // Default to free START plan on error (for users without authorized_purchases record)
          setPlanType("start");
        } else {
          // If no plan type found (null/empty), user is on free START plan
          setPlanType((data as PlanType) || "start");
        }
      } catch (err) {
        console.error("Error in fetchUserPlan:", err);
        // Default to free START plan
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
