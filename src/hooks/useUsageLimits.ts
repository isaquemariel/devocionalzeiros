import { useState, useEffect, useCallback, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PlanType } from "./useUserPlan";

export type FeatureKey =
  | "rpg_quiz"
  | "rpg_verse_explanation"
  | "quiz_free_choice"
  | "quiz_random"
  | "sermon"
  | "chat_question"
  | "reading_chapter_explanation"
  | "reading_verse_explanation"
  | "study_bible_verse_explanation"
  | "study_bible_quiz"
  | "custom_plan"
  | "community_post_prayer"
  | "community_post_thanks"
  | "community_reply";

interface UsageRecord {
  feature_key: string;
  usage_count: number;
  last_used_at: string;
}

// -1 = unlimited, 0 = blocked
const PLAN_LIMITS: Record<string, Record<FeatureKey, number>> = {
  free: {
    rpg_quiz: 2,
    rpg_verse_explanation: 2,
    quiz_free_choice: 1,
    quiz_random: 1,
    sermon: 0,
    chat_question: 0,
    reading_chapter_explanation: 4,
    reading_verse_explanation: 0,
    study_bible_verse_explanation: 2,
    study_bible_quiz: 1,
    custom_plan: 0,
  },
  gold: {
    rpg_quiz: 10,
    rpg_verse_explanation: 10,
    quiz_free_choice: 5,
    quiz_random: 5,
    sermon: 5,
    chat_question: 5,
    reading_chapter_explanation: 10,
    reading_verse_explanation: 10,
    study_bible_verse_explanation: 10,
    study_bible_quiz: 5,
    custom_plan: -1,
  },
  premium: {
    rpg_quiz: -1,
    rpg_verse_explanation: -1,
    quiz_free_choice: -1,
    quiz_random: -1,
    sermon: -1,
    chat_question: -1,
    reading_chapter_explanation: -1,
    reading_verse_explanation: -1,
    study_bible_verse_explanation: -1,
    study_bible_quiz: -1,
    custom_plan: -1,
  },
  embaixador: {
    rpg_quiz: -1,
    rpg_verse_explanation: -1,
    quiz_free_choice: -1,
    quiz_random: -1,
    sermon: -1,
    chat_question: -1,
    reading_chapter_explanation: -1,
    reading_verse_explanation: -1,
    study_bible_verse_explanation: -1,
    study_bible_quiz: -1,
    custom_plan: -1,
  },
  admin: {
    rpg_quiz: -1,
    rpg_verse_explanation: -1,
    quiz_free_choice: -1,
    quiz_random: -1,
    sermon: -1,
    chat_question: -1,
    reading_chapter_explanation: -1,
    reading_verse_explanation: -1,
    study_bible_verse_explanation: -1,
    study_bible_quiz: -1,
    custom_plan: -1,
  },
};

// Feature display names for UI
export const FEATURE_DISPLAY_NAMES: Record<FeatureKey, string> = {
  rpg_quiz: "Estágios do RPG",
  rpg_verse_explanation: "Explicação de Versículo (RPG)",
  quiz_free_choice: "Quiz Escolha Livre",
  quiz_random: "Quiz Modo Aleatório",
  sermon: "Gerador de Sermão",
  chat_question: "Pergunta ao Chat",
  reading_chapter_explanation: "Explicação de Capítulo",
  reading_verse_explanation: "Explicação de Versículo (Leitura)",
  study_bible_verse_explanation: "Explicação de Versículo (Estudo)",
  study_bible_quiz: "Quiz da Bíblia de Estudo",
  custom_plan: "Plano Personalizado",
};

function getBrazilDateString(): string {
  const now = new Date();
  // Brazil is UTC-3
  const brasilOffset = -3 * 60;
  const localOffset = now.getTimezoneOffset();
  const diff = brasilOffset - (-localOffset);
  const brasilTime = new Date(now.getTime() + diff * 60 * 1000);
  return brasilTime.toISOString().split("T")[0];
}

export interface UsageLimitResult {
  canUse: boolean;
  currentUsage: number;
  limit: number;
  isUnlimited: boolean;
  isBlocked: boolean;
  timeUntilReset: string | null; // e.g. "5h 23min"
  msUntilReset: number;
}

export const useUsageLimits = (userId?: string, planType?: PlanType) => {
  const [usageRecords, setUsageRecords] = useState<UsageRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [now, setNow] = useState(Date.now());

  // Update "now" every minute for countdown
  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(interval);
  }, []);

  // Fetch today's usage
  const fetchUsage = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      const today = getBrazilDateString();
      const { data, error } = await supabase
        .from("daily_usage_limits")
        .select("feature_key, usage_count, last_used_at")
        .eq("user_id", userId)
        .eq("usage_date", today);

      if (error) {
        console.error("Error fetching usage:", error);
      } else {
        setUsageRecords(data || []);
      }
    } catch (err) {
      console.error("Error in fetchUsage:", err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchUsage();
  }, [fetchUsage]);

  const getLimit = useCallback(
    (featureKey: FeatureKey): number => {
      const plan = planType || "free";
      const limits = PLAN_LIMITS[plan] || PLAN_LIMITS.free;
      return limits[featureKey] ?? 0;
    },
    [planType]
  );

  const getUsage = useCallback(
    (featureKey: FeatureKey): number => {
      const record = usageRecords.find((r) => r.feature_key === featureKey);
      return record?.usage_count || 0;
    },
    [usageRecords]
  );

  const getTimeUntilReset = useCallback((): { text: string | null; ms: number } => {
    // Reset happens at midnight Brazil time (UTC-3)
    const nowDate = new Date();
    // Get current Brazil time
    const brasilOffset = -3 * 60;
    const localOffset = nowDate.getTimezoneOffset();
    const diff = brasilOffset - (-localOffset);
    const brasilTime = new Date(nowDate.getTime() + diff * 60 * 1000);

    // Next midnight in Brazil
    const nextMidnight = new Date(brasilTime);
    nextMidnight.setHours(24, 0, 0, 0);

    const msLeft = nextMidnight.getTime() - brasilTime.getTime();
    if (msLeft <= 0) return { text: null, ms: 0 };

    const hours = Math.floor(msLeft / (1000 * 60 * 60));
    const minutes = Math.floor((msLeft % (1000 * 60 * 60)) / (1000 * 60));

    if (hours > 0) {
      return { text: `${hours}h ${minutes}min`, ms: msLeft };
    }
    return { text: `${minutes}min`, ms: msLeft };
  }, [now]); // re-evaluate when `now` updates

  const checkLimit = useCallback(
    (featureKey: FeatureKey): UsageLimitResult => {
      const limit = getLimit(featureKey);
      const currentUsage = getUsage(featureKey);
      const isUnlimited = limit === -1;
      const isBlocked = limit === 0;
      const canUse = isUnlimited || (!isBlocked && currentUsage < limit);
      const { text: timeUntilReset, ms: msUntilReset } = getTimeUntilReset();

      return {
        canUse,
        currentUsage,
        limit,
        isUnlimited,
        isBlocked,
        timeUntilReset: canUse ? null : timeUntilReset,
        msUntilReset,
      };
    },
    [getLimit, getUsage, getTimeUntilReset]
  );

  const incrementUsage = useCallback(
    async (featureKey: FeatureKey): Promise<boolean> => {
      if (!userId) return false;

      const { canUse } = checkLimit(featureKey);
      if (!canUse) return false;

      try {
        // Use server-side RPC to increment usage securely
        const { data, error } = await supabase.rpc("increment_daily_usage", {
          p_feature_key: featureKey,
        });

        if (error) throw error;

        const newCount = (data as any)?.usage_count ?? 1;

        // Update local state
        setUsageRecords((prev) => {
          const existing = prev.find((r) => r.feature_key === featureKey);
          if (existing) {
            return prev.map((r) =>
              r.feature_key === featureKey
                ? { ...r, usage_count: newCount, last_used_at: new Date().toISOString() }
                : r
            );
          }
          return [
            ...prev,
            { feature_key: featureKey, usage_count: newCount, last_used_at: new Date().toISOString() },
          ];
        });

        return true;
      } catch (err) {
        console.error("Error incrementing usage:", err);
        return false;
      }
    },
    [userId, checkLimit]
  );

  const getRemainingUses = useCallback(
    (featureKey: FeatureKey): number | null => {
      const limit = getLimit(featureKey);
      if (limit === -1) return null; // unlimited
      if (limit === 0) return 0;
      const usage = getUsage(featureKey);
      return Math.max(0, limit - usage);
    },
    [getLimit, getUsage]
  );

  return {
    loading,
    checkLimit,
    incrementUsage,
    getRemainingUses,
    getTimeUntilReset,
    refetch: fetchUsage,
  };
};
