import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface DevotionalFavorite {
  id: string;
  day_of_year: number;
  created_at: string;
}

export const useDevotionalFavorites = (userId: string | undefined) => {
  const [favorites, setFavorites] = useState<DevotionalFavorite[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('devotional_favorites')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFavorites(data || []);
    } catch (error) {
      console.error('Error fetching devotional favorites:', error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const isFavorite = useCallback((dayOfYear: number) => {
    return favorites.some(f => f.day_of_year === dayOfYear);
  }, [favorites]);

  const toggleFavorite = async (dayOfYear: number) => {
    if (!userId) return { success: false };

    const existing = favorites.find(f => f.day_of_year === dayOfYear);

    try {
      if (existing) {
        // Remove favorite
        const { error } = await supabase
          .from('devotional_favorites')
          .delete()
          .eq('user_id', userId)
          .eq('day_of_year', dayOfYear);

        if (error) throw error;

        setFavorites(prev => prev.filter(f => f.day_of_year !== dayOfYear));
        return { success: true, action: 'removed' as const };
      } else {
        // Add favorite
        const { data, error } = await supabase
          .from('devotional_favorites')
          .insert({ user_id: userId, day_of_year: dayOfYear })
          .select()
          .single();

        if (error) throw error;

        setFavorites(prev => [data, ...prev]);
        return { success: true, action: 'added' as const };
      }
    } catch (error) {
      console.error('Error toggling devotional favorite:', error);
      return { success: false };
    }
  };

  return {
    favorites,
    loading,
    isFavorite,
    toggleFavorite,
    refetch: fetchFavorites,
  };
};
