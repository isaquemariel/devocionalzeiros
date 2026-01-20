import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";

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
  const hasCheckedRef = useRef(false);

  useEffect(() => {
    if (!userEmail || !currentPlanType || currentPlanType === "inactive") {
      return;
    }

    // Prevent double-checking on re-renders
    if (hasCheckedRef.current) {
      return;
    }

    const checkAndCelebrate = async () => {
      hasCheckedRef.current = true;

      try {
        // Get user's last celebrated plan from database
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data: profile, error } = await supabase
          .from("profiles")
          .select("last_celebrated_plan")
          .eq("user_id", user.id)
          .single();

        if (error) {
          console.error("Error fetching profile for celebration:", error);
          return;
        }

        const lastCelebratedPlan = profile?.last_celebrated_plan;
        const currentPlanLevel = PLAN_HIERARCHY[currentPlanType] || 0;
        const lastCelebratedLevel = lastCelebratedPlan ? PLAN_HIERARCHY[lastCelebratedPlan] || 0 : 0;

        // Check if this is an upgrade (current plan is higher than last celebrated)
        if (currentPlanLevel > lastCelebratedLevel && lastCelebratedLevel > 0) {
          // This is an upgrade! Show celebration
          setNewPlanName(currentPlanType);
          setShowCelebration(true);

          // Save the new plan as celebrated in database
          await supabase
            .from("profiles")
            .update({ last_celebrated_plan: currentPlanType })
            .eq("user_id", user.id);
        } else if (!lastCelebratedPlan && currentPlanType !== "start") {
          // First time user with a paid plan - celebrate!
          setNewPlanName(currentPlanType);
          setShowCelebration(true);

          await supabase
            .from("profiles")
            .update({ last_celebrated_plan: currentPlanType })
            .eq("user_id", user.id);
        } else if (!lastCelebratedPlan) {
          // First time user with start plan - just save it, no celebration
          await supabase
            .from("profiles")
            .update({ last_celebrated_plan: currentPlanType })
            .eq("user_id", user.id);
        } else if (currentPlanType !== lastCelebratedPlan) {
          // Plan changed but not an upgrade (could be downgrade or lateral move)
          // Just update the storage without celebration
          await supabase
            .from("profiles")
            .update({ last_celebrated_plan: currentPlanType })
            .eq("user_id", user.id);
        }
      } catch (err) {
        console.error("Error in upgrade celebration check:", err);
      }
    };

    checkAndCelebrate();
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
