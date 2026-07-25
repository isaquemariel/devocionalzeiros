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
  window_start: string | null;
  reset_at: string | null;
}

// Janela de bloqueio: 24h a partir do momento em que o limite é atingido.
const WINDOW_MS = 24 * 60 * 60 * 1000;

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
    community_post_prayer: 1,
    community_post_thanks: 1,
    community_reply: 3,
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
    community_post_prayer: -1,
    community_post_thanks: -1,
    community_reply: -1,
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
    community_post_prayer: -1,
    community_post_thanks: -1,
    community_reply: -1,
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
    community_post_prayer: -1,
    community_post_thanks: -1,
    community_reply: -1,
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
    community_post_prayer: -1,
    community_post_thanks: -1,
    community_reply: -1,
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
  community_post_prayer: "Pedido de oração",
  community_post_thanks: "Testemunho de gratidão",
  community_reply: "Resposta na comunidade",
};

// Dado o registro de uma feature, calcula o uso EFETIVO (0 se a janela de 24h já
// expirou) e o instante (epoch ms) em que o limite volta a liberar.
function windowState(
  rec: UsageRecord | undefined,
  nowMs: number
): { effectiveUsage: number; resetAtMs: number | null } {
  if (!rec) return { effectiveUsage: 0, resetAtMs: null };
  const ws = rec.window_start ? new Date(rec.window_start).getTime() : null;
  const ra = rec.reset_at ? new Date(rec.reset_at).getTime() : null;
  const expired =
    (ra != null && nowMs >= ra) ||
    (ra == null && ws != null && nowMs >= ws + WINDOW_MS);
  if (expired) return { effectiveUsage: 0, resetAtMs: null };
  const resetAtMs = ra != null ? ra : ws != null ? ws + WINDOW_MS : null;
  return { effectiveUsage: rec.usage_count || 0, resetAtMs };
}

export interface UsageLimitResult {
  canUse: boolean;
  currentUsage: number;
  limit: number;
  isUnlimited: boolean;
  isBlocked: boolean;
  timeUntilReset: string | null; // e.g. "5h 23min"
  msUntilReset: number;
  resetAt: number | null; // epoch ms de quando o limite libera (janela 24h)
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
      // Modelo de janela deslizante: UMA linha por (user, feature). O reset é
      // controlado por window_start/reset_at (24h a partir do bloqueio), não
      // mais pela data do calendário — por isso não filtramos por usage_date.
      const { data, error } = await supabase
        .from("daily_usage_limits")
        .select("feature_key, usage_count, last_used_at, window_start, reset_at")
        .eq("user_id", userId);

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
      return windowState(record, now).effectiveUsage;
    },
    [usageRecords, now]
  );

  // Tempo até liberar o limite de UMA feature (janela de 24h a partir do
  // bloqueio). Retorna também o instante absoluto (resetAt, epoch ms).
  const getTimeUntilReset = useCallback(
    (featureKey?: FeatureKey): { text: string | null; ms: number; resetAt: number | null } => {
      if (!featureKey) return { text: null, ms: 0, resetAt: null };
      const record = usageRecords.find((r) => r.feature_key === featureKey);
      const { resetAtMs } = windowState(record, now);
      if (resetAtMs == null) return { text: null, ms: 0, resetAt: null };

      const msLeft = resetAtMs - now;
      if (msLeft <= 0) return { text: null, ms: 0, resetAt: resetAtMs };

      const hours = Math.floor(msLeft / (1000 * 60 * 60));
      const minutes = Math.floor((msLeft % (1000 * 60 * 60)) / (1000 * 60));
      const text = hours > 0 ? `${hours}h ${minutes}min` : `${minutes}min`;
      return { text, ms: msLeft, resetAt: resetAtMs };
    },
    [usageRecords, now]
  );

  const checkLimit = useCallback(
    (featureKey: FeatureKey): UsageLimitResult => {
      const limit = getLimit(featureKey);
      const currentUsage = getUsage(featureKey);
      const isUnlimited = limit === -1;
      const isBlocked = limit === 0;
      const canUse = isUnlimited || (!isBlocked && currentUsage < limit);
      const { text: timeUntilReset, ms: msUntilReset, resetAt } = getTimeUntilReset(featureKey);

      return {
        canUse,
        currentUsage,
        limit,
        isUnlimited,
        isBlocked,
        // reset só faz sentido para limite diário atingido (não para gate de plano)
        timeUntilReset: canUse || isBlocked ? null : timeUntilReset,
        msUntilReset,
        resetAt: canUse || isBlocked ? null : resetAt,
      };
    },
    [getLimit, getUsage, getTimeUntilReset]
  );

  const incrementUsage = useCallback(
    async (_featureKey: FeatureKey): Promise<boolean> => {
      if (!userId) return false;
      // NOTE: For AI features, the edge function calls `increment_daily_usage` server-side
      // (see supabase/functions/_shared/enforce-usage.ts). Calling it again here would
      // double-charge the user. Instead we just refetch usage to refresh the local UI.
      await fetchUsage();
      return true;
    },
    [userId, fetchUsage]
  );

  // Consumo client-side (para recursos SEM edge function que já incrementa no
  // servidor — ex.: entrar num estágio do RPG com desafio próprio). Chama a RPC
  // increment_daily_usage e atualiza a contagem local.
  const consume = useCallback(
    async (featureKey: FeatureKey): Promise<boolean> => {
      if (!userId) return false;
      let ok = true;
      try {
        // A RPC levanta erro se o plano bloqueia ou se o limite diário já foi atingido.
        const { error } = await supabase.rpc("increment_daily_usage", { p_feature_key: featureKey });
        if (error) { ok = false; console.error("increment_daily_usage error:", error); }
      } catch (e) {
        ok = false;
        console.error("consume error:", e);
      }
      await fetchUsage();
      return ok;
    },
    [userId, fetchUsage]
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
    consume,
    getRemainingUses,
    getTimeUntilReset,
    refetch: fetchUsage,
  };
};
