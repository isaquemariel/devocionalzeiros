import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface UserPoints {
  chaptersRead: number;
  quizPoints: number;
  devotionalPoints: number;
  totalPoints: number;
  activeDays: number;
  rank: number;
}

export const useUserPoints = (userId: string | undefined) => {
  const [points, setPoints] = useState<UserPoints | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchPoints = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.rpc('get_user_rankings');

      if (error) throw error;

      const userData = data?.find((u: any) => u.user_id === userId);

      if (userData) {
        setPoints({
          chaptersRead: Number(userData.chapters_read),
          quizPoints: Number(userData.quiz_points),
          devotionalPoints: Number(userData.devotional_points || 0),
          totalPoints: Number(userData.total_points),
          activeDays: Number(userData.active_days),
          rank: Number(userData.rank),
        });
      } else {
        setPoints({
          chaptersRead: 0,
          quizPoints: 0,
          devotionalPoints: 0,
          totalPoints: 0,
          activeDays: 0,
          rank: 0,
        });
      }
    } catch (error) {
      console.error('Error fetching user points:', error);
      setPoints({
        chaptersRead: 0,
        quizPoints: 0,
        devotionalPoints: 0,
        totalPoints: 0,
        activeDays: 0,
        rank: 0,
      });
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchPoints();
  }, [fetchPoints]);

  // Subscribe to changes in relevant tables
  useEffect(() => {
    if (!userId) return;

    const channel = supabase
      .channel('user-points-updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'quiz_attempts',
          filter: `user_id=eq.${userId}`,
        },
        () => {
          fetchPoints();
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'reading_schedule',
          filter: `user_id=eq.${userId}`,
        },
        () => {
          fetchPoints();
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'reading_progress',
          filter: `user_id=eq.${userId}`,
        },
        () => {
          fetchPoints();
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'devotional_completions',
          filter: `user_id=eq.${userId}`,
        },
        () => {
          fetchPoints();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, fetchPoints]);

  return { points, loading, refetch: fetchPoints };
};
