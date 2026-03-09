import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

const getBrasiliaDateString = (): string => {
  const now = new Date();
  const brasiliaDate = new Date(now.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
  const year = brasiliaDate.getFullYear();
  const month = (brasiliaDate.getMonth() + 1).toString().padStart(2, '0');
  const day = brasiliaDate.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const ACHIEVEMENT_DEFINITIONS = [
  // Reading
  { id: "first_reading", threshold: 1, getProgress: (s: any) => s.chaptersRead, points: 5 },
  { id: "reader_10", threshold: 10, getProgress: (s: any) => s.chaptersRead, points: 5 },
  { id: "reader_50", threshold: 50, getProgress: (s: any) => s.chaptersRead, points: 10 },
  { id: "reader_100", threshold: 100, getProgress: (s: any) => s.chaptersRead, points: 15 },
  { id: "reader_260", threshold: 260, getProgress: (s: any) => s.chaptersRead, points: 20 },
  // Streaks
  { id: "streak_3", threshold: 3, getProgress: (s: any) => s.currentStreak, points: 5 },
  { id: "streak_7", threshold: 7, getProgress: (s: any) => s.currentStreak, points: 10 },
  { id: "streak_30", threshold: 30, getProgress: (s: any) => s.currentStreak, points: 15 },
  { id: "streak_100", threshold: 100, getProgress: (s: any) => s.currentStreak, points: 20 },
  // Quiz
  { id: "quiz_first", threshold: 1, getProgress: (s: any) => s.quizCorrect, points: 5 },
  { id: "quiz_10", threshold: 10, getProgress: (s: any) => s.quizCorrect, points: 10 },
  { id: "quiz_50", threshold: 50, getProgress: (s: any) => s.quizCorrect, points: 15 },
  { id: "quiz_100", threshold: 100, getProgress: (s: any) => s.quizCorrect, points: 20 },
  { id: "quiz_hard_10", threshold: 10, getProgress: (s: any) => s.quizHardCorrect, points: 10 },
  { id: "quiz_hard_50", threshold: 50, getProgress: (s: any) => s.quizHardCorrect, points: 15 },
  { id: "quiz_hard_100", threshold: 100, getProgress: (s: any) => s.quizHardCorrect, points: 20 },
  { id: "quiz_total_100", threshold: 100, getProgress: (s: any) => s.quizTotal, points: 10 },
  { id: "quiz_total_500", threshold: 500, getProgress: (s: any) => s.quizTotal, points: 20 },
  // Quiz streaks
  { id: "quiz_streak_3", threshold: 3, getProgress: (s: any) => s.bestQuizStreak, points: 5 },
  { id: "quiz_streak_5", threshold: 5, getProgress: (s: any) => s.bestQuizStreak, points: 10 },
  { id: "quiz_streak_7", threshold: 7, getProgress: (s: any) => s.bestQuizStreak, points: 15 },
  { id: "quiz_streak_10", threshold: 10, getProgress: (s: any) => s.bestQuizStreak, points: 20 },
  // Devotionals
  { id: "devocional_first", threshold: 1, getProgress: (s: any) => s.devotionals, points: 5 },
  { id: "devocional_7", threshold: 7, getProgress: (s: any) => s.devotionals, points: 10 },
  { id: "devocional_30", threshold: 30, getProgress: (s: any) => s.devotionals, points: 15 },
  // Logins
  { id: "login_10", threshold: 10, getProgress: (s: any) => s.logins, points: 5 },
  { id: "login_50", threshold: 50, getProgress: (s: any) => s.logins, points: 10 },
  { id: "login_100", threshold: 100, getProgress: (s: any) => s.logins, points: 20 },
];

// Cache to avoid refetching too often (5 min TTL)
let cachedData: { userId: string; count: number; pts: number; fetchedAt: number } | null = null;
const CACHE_TTL = 5 * 60 * 1000;

export const useClaimableAchievements = (userId: string | undefined) => {
  const [claimableCount, setClaimableCount] = useState(0);
  const [claimablePoints, setClaimablePoints] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchClaimable = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    // Use cache if fresh
    if (cachedData && cachedData.userId === userId && Date.now() - cachedData.fetchedAt < CACHE_TTL) {
      setClaimableCount(cachedData.count);
      setClaimablePoints(cachedData.pts);
      setLoading(false);
      return;
    }

    try {
      const [
        { data: logins },
        { data: readingProgress },
        { data: readingSchedule },
        { data: quizAttempts },
        { data: devotionalCompletions },
        { data: claimedAchievements },
      ] = await Promise.all([
        supabase.from('daily_logins').select('login_date').eq('user_id', userId).order('login_date', { ascending: true }),
        supabase.from('reading_progress').select('id').eq('user_id', userId),
        supabase.from('reading_schedule').select('id').eq('user_id', userId).eq('is_completed', true),
        supabase.from('quiz_attempts').select('is_correct, points_earned, streak_count').eq('user_id', userId),
        supabase.from('devotional_completions').select('id').eq('user_id', userId),
        supabase.from('achievement_claims').select('achievement_id').eq('user_id', userId),
      ]);

      const stats = {
        chaptersRead: (readingProgress?.length || 0) + (readingSchedule?.length || 0),
        quizCorrect: quizAttempts?.filter(q => q.is_correct).length || 0,
        quizHardCorrect: quizAttempts?.filter(q => q.is_correct && q.points_earned === 3).length || 0,
        quizTotal: quizAttempts?.length || 0,
        bestQuizStreak: quizAttempts?.reduce((max, q) => Math.max(max, (q as any).streak_count || 0), 0) || 0,
        devotionals: devotionalCompletions?.length || 0,
        logins: logins?.length || 0,
        currentStreak: 0,
      };

      if (logins && logins.length > 0) {
        const today = getBrasiliaDateString();
        const todayDate = new Date(today + 'T12:00:00');
        const lastLogin = logins[logins.length - 1].login_date;
        const lastLoginDate = new Date(lastLogin + 'T12:00:00');
        const daysSinceLastLogin = Math.round((todayDate.getTime() - lastLoginDate.getTime()) / (1000 * 60 * 60 * 24));

        if (daysSinceLastLogin <= 1) {
          stats.currentStreak = 1;
          for (let i = logins.length - 1; i > 0; i--) {
            const currDate = new Date(logins[i].login_date + 'T12:00:00');
            const prevDate = new Date(logins[i - 1].login_date + 'T12:00:00');
            const diffDays = Math.round((currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24));
            if (diffDays === 1) { stats.currentStreak++; } else { break; }
          }
        }
      }

      const claimedIds = new Set((claimedAchievements || []).map((c: any) => c.achievement_id));
      let count = 0;
      let points = 0;

      for (const achievement of ACHIEVEMENT_DEFINITIONS) {
        const progress = achievement.getProgress(stats);
        if (progress >= achievement.threshold && !claimedIds.has(achievement.id)) {
          count++;
          points += achievement.points;
        }
      }

      cachedData = { userId, count, pts: points, fetchedAt: Date.now() };
      setClaimableCount(count);
      setClaimablePoints(points);
    } catch (error) {
      console.error('Error fetching claimable achievements:', error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchClaimable();
  }, [fetchClaimable]);

  // Invalidate cache and refetch when achievements are claimed
  const refetchFresh = useCallback(async () => {
    cachedData = null;
    await fetchClaimable();
  }, [fetchClaimable]);

  return { claimableCount, claimablePoints, loading, refetch: refetchFresh };
};
