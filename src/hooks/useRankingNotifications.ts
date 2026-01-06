import { useEffect, useRef, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface RankingNotificationState {
  showTop3Modal: boolean;
  top3Rank: number;
}

export const useRankingNotifications = (userId: string | undefined) => {
  const previousRankRef = useRef<number | null>(null);
  const isInitialLoadRef = useRef(true);
  const [notificationState, setNotificationState] = useState<RankingNotificationState>({
    showTop3Modal: false,
    top3Rank: 0
  });

  const closeTop3Modal = useCallback(() => {
    setNotificationState(prev => ({ ...prev, showTop3Modal: false }));
  }, []);

  useEffect(() => {
    if (!userId) return;

    const checkRanking = async () => {
      try {
        const { data, error } = await supabase.rpc('get_user_rankings');
        
        if (error) throw error;
        
        const currentUserRank = data?.find((r: any) => r.user_id === userId);
        
        if (currentUserRank) {
          const currentRank = Number(currentUserRank.rank);
          
          // Skip notification on initial load
          if (isInitialLoadRef.current) {
            previousRankRef.current = currentRank;
            isInitialLoadRef.current = false;
            return;
          }
          
          const previousRank = previousRankRef.current;
          
          if (previousRank !== null && currentRank !== previousRank) {
            // User entered top 3 - show special celebration modal
            if (currentRank <= 3 && previousRank > 3) {
              setNotificationState({
                showTop3Modal: true,
                top3Rank: currentRank
              });
            }
            // User moved up within top 3 (e.g., from 3rd to 2nd or 1st)
            else if (currentRank < previousRank && currentRank <= 3 && previousRank <= 3) {
              setNotificationState({
                showTop3Modal: true,
                top3Rank: currentRank
              });
            }
            // User entered top 5 but not top 3
            else if (currentRank <= 5 && currentRank > 3 && previousRank > 5) {
              toast({
                title: "🏆 Parabéns! Você entrou no Top 5!",
                description: `Você agora está em ${currentRank}º lugar no ranking!`,
              });
            }
            // User moved up within top 5 (but not in top 3)
            else if (currentRank < previousRank && currentRank <= 5 && currentRank > 3) {
              toast({
                title: "🔥 Você subiu no ranking!",
                description: `De ${previousRank}º para ${currentRank}º lugar!`,
              });
            }
          }
          
          previousRankRef.current = currentRank;
        }
      } catch (error) {
        console.error('Error checking ranking:', error);
      }
    };

    // Initial check
    checkRanking();

    // Subscribe to realtime changes on reading_progress
    const channel = supabase
      .channel('ranking-notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'reading_progress'
        },
        () => {
          // Check ranking after any reading progress change
          setTimeout(checkRanking, 1000);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  return {
    showTop3Modal: notificationState.showTop3Modal,
    top3Rank: notificationState.top3Rank,
    closeTop3Modal
  };
};
