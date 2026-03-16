import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface UserPoints {
  chaptersRead: number;
  quizPoints: number;
  devotionalPoints: number;
  totalPoints: number;
  activeDays: number;
  rank: number;
}

// Session-level cache: avoids re-fetching on every re-mount (e.g. navigation)
const pointsCache = new Map<string, { data: UserPoints; fetchedAt: number }>();
const POINTS_CACHE_TTL = 2 * 60 * 1000; // 2 minutes

export const useUserPoints = (userId: string | undefined) => {
  const cached = userId ? pointsCache.get(userId) : null;
  const isValidCache = cached && (Date.now() - cached.fetchedAt < POINTS_CACHE_TTL);

  const [points, setPoints] = useState<UserPoints | null>(isValidCache ? cached!.data : null);
  const [loading, setLoading] = useState(!isValidCache);
  const isMounted = useRef(true);

  const fetchPoints = useCallback(async (force = false) => {
    if (!userId) {
      setLoading(false);
      return;
    }

    // Use cache unless forced refresh
    if (!force) {
      const cached = pointsCache.get(userId);
      if (cached && Date.now() - cached.fetchedAt < POINTS_CACHE_TTL) {
        setPoints(cached.data);
        setLoading(false);
        return;
      }
    }

    try {
      const { data, error } = await supabase.rpc('get_my_points');
      if (error) throw error;

      const row = Array.isArray(data) ? data[0] : data;
      const result: UserPoints = row ? {
        chaptersRead: Number(row.chapters_read),
        quizPoints: Number(row.quiz_points),
        devotionalPoints: Number(row.devotional_points || 0),
        totalPoints: Number(row.total_points),
        activeDays: Number(row.active_days),
        rank: Number(row.rank),
      } : { chaptersRead: 0, quizPoints: 0, devotionalPoints: 0, totalPoints: 0, activeDays: 0, rank: 0 };

      pointsCache.set(userId, { data: result, fetchedAt: Date.now() });
      if (isMounted.current) setPoints(result);
    } catch (error) {
      console.error('Error fetching user points:', error);
      if (isMounted.current) setPoints({ chaptersRead: 0, quizPoints: 0, devotionalPoints: 0, totalPoints: 0, activeDays: 0, rank: 0 });
    } finally {
      if (isMounted.current) setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    isMounted.current = true;
    fetchPoints();
    return () => { isMounted.current = false; };
  }, [fetchPoints]);

  return { points, loading, refetch: () => fetchPoints(true) };
};
