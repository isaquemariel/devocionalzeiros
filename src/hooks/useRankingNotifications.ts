import { useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export const useRankingNotifications = (userId: string | undefined) => {
  const previousRankRef = useRef<number | null>(null);
  const isInitialLoadRef = useRef(true);

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
            // User entered top 5
            if (currentRank <= 5 && previousRank > 5) {
              toast({
                title: "🏆 Parabéns! Você entrou no Top 5!",
                description: `Você agora está em ${currentRank}º lugar no ranking!`,
              });
            }
            // User moved up within top 5
            else if (currentRank < previousRank && currentRank <= 5) {
              toast({
                title: "🔥 Você subiu no ranking!",
                description: `De ${previousRank}º para ${currentRank}º lugar!`,
              });
            }
            // User reached #1
            else if (currentRank === 1 && previousRank !== 1) {
              toast({
                title: "👑 Você é o Campeão!",
                description: "Você conquistou o 1º lugar no ranking!",
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
};
