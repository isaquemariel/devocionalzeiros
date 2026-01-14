import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

const STORAGE_KEY = "last_celebrated_plan";

interface UpgradeCelebrationResult {
  showCelebration: boolean;
  newPlanName: string;
  dismissCelebration: () => void;
}

// Plan hierarchy for detecting upgrades
const PLAN_HIERARCHY: Record<string, number> = {
  start: 1,
  gold: 2,
  premium: 3,
  embaixador: 4,
  admin: 5,
};

export const useUpgradeCelebration = (
  userEmail: string | undefined,
  currentPlanType: string | null
): UpgradeCelebrationResult => {
  const [showCelebration, setShowCelebration] = useState(false);
  const [newPlanName, setNewPlanName] = useState("");

  useEffect(() => {
    if (!userEmail || !currentPlanType || currentPlanType === "inactive") {
      return;
    }

    // Get the last celebrated plan from localStorage
    const lastCelebratedPlan = localStorage.getItem(STORAGE_KEY);
    const currentPlanLevel = PLAN_HIERARCHY[currentPlanType] || 0;
    const lastCelebratedLevel = lastCelebratedPlan ? PLAN_HIERARCHY[lastCelebratedPlan] || 0 : 0;

    // Check if this is an upgrade (current plan is higher than last celebrated)
    if (currentPlanLevel > lastCelebratedLevel && lastCelebratedLevel > 0) {
      // This is an upgrade! Show celebration
      setNewPlanName(currentPlanType);
      setShowCelebration(true);
      
      // Save the new plan as celebrated
      localStorage.setItem(STORAGE_KEY, currentPlanType);
    } else if (lastCelebratedPlan === null && currentPlanType !== "start") {
      // First time user with a paid plan - celebrate!
      setNewPlanName(currentPlanType);
      setShowCelebration(true);
      localStorage.setItem(STORAGE_KEY, currentPlanType);
    } else if (lastCelebratedPlan === null) {
      // First time user with start plan - just save it, no celebration
      localStorage.setItem(STORAGE_KEY, currentPlanType);
    } else if (currentPlanType !== lastCelebratedPlan) {
      // Plan changed but not an upgrade (could be downgrade or lateral move)
      // Just update the storage without celebration
      localStorage.setItem(STORAGE_KEY, currentPlanType);
    }
  }, [userEmail, currentPlanType]);

  const dismissCelebration = useCallback(() => {
    setShowCelebration(false);
  }, []);

  return {
    showCelebration,
    newPlanName,
    dismissCelebration,
  };
};
