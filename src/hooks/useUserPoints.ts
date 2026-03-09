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
      const { data, error } = await supabase.rpc('get_my_points');

      if (error) throw error;

      const row = Array.isArray(data) ? data[0] : data;

      if (row) {
        setPoints({
          chaptersRead: Number(row.chapters_read),
          quizPoints: Number(row.quiz_points),
          devotionalPoints: Number(row.devotional_points || 0),
          totalPoints: Number(row.total_points),
          activeDays: Number(row.active_days),
          rank: Number(row.rank),
        });
      } else {
        setPoints({ chaptersRead: 0, quizPoints: 0, devotionalPoints: 0, totalPoints: 0, activeDays: 0, rank: 0 });
      }
    } catch (error) {
      console.error('Error fetching user points:', error);
      setPoints({ chaptersRead: 0, quizPoints: 0, devotionalPoints: 0, totalPoints: 0, activeDays: 0, rank: 0 });
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchPoints();
  }, [fetchPoints]);

  return { points, loading, refetch: fetchPoints };
};
