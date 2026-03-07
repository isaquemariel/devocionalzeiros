import { useEffect, useRef, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useGameSounds } from "@/hooks/useGameSounds";
import { getBrazilDateString } from "@/lib/bibleData";

interface RankingNotificationState {
  showTop3Modal: boolean;
  top3Rank: number;
}

// Key for localStorage to track daily notifications
const RANKING_NOTIFICATION_KEY = 'ranking_notifications_today';

interface DailyNotifications {
  date: string;
  top3Shown: boolean;
  rankDropShown: boolean;
  lastKnownRank: number | null;
}

const getDailyNotifications = (): DailyNotifications => {
  try {
    const stored = localStorage.getItem(RANKING_NOTIFICATION_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      const today = getBrazilDateString();
      // Reset if it's a new day
      if (parsed.date !== today) {
        return { date: today, top3Shown: false, rankDropShown: false, lastKnownRank: parsed.lastKnownRank };
      }
      return parsed;
    }
  } catch (e) {
    console.error('Error reading ranking notifications:', e);
  }
  return { date: getBrazilDateString(), top3Shown: false, rankDropShown: false, lastKnownRank: null };
};

const saveDailyNotifications = (notifications: DailyNotifications) => {
  try {
    localStorage.setItem(RANKING_NOTIFICATION_KEY, JSON.stringify(notifications));
  } catch (e) {
    console.error('Error saving ranking notifications:', e);
  }
};

export const useRankingNotifications = (userId: string | undefined) => {
  const previousRankRef = useRef<number | null>(null);
  const isInitialLoadRef = useRef(true);
  const { playSound } = useGameSounds();
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
          const dailyNotifications = getDailyNotifications();
          
          // Skip notification on initial load, but set the rank
          if (isInitialLoadRef.current) {
            previousRankRef.current = dailyNotifications.lastKnownRank ?? currentRank;
            isInitialLoadRef.current = false;
            
            // Save current rank for next session/day comparison
            saveDailyNotifications({
              ...dailyNotifications,
              lastKnownRank: currentRank
            });
            return;
          }
          
          const previousRank = previousRankRef.current;
          
          if (previousRank !== null && currentRank !== previousRank) {
            // User entered top 3 or moved up within top 3 - show special celebration modal (once per day)
            if (currentRank <= 3 && (previousRank > 3 || currentRank < previousRank)) {
              if (!dailyNotifications.top3Shown) {
                setNotificationState({
                  showTop3Modal: true,
                  top3Rank: currentRank
                });
                playSound('rankUp', 0.4);
                saveDailyNotifications({
                  ...dailyNotifications,
                  top3Shown: true,
                  lastKnownRank: currentRank
                });
              }
            }
            // User entered top 5 but not top 3
            else if (currentRank <= 5 && currentRank > 3 && previousRank > 5) {
              toast({
                title: "🏆 Parabéns! Você entrou no Top 5!",
                description: `Você agora está em ${currentRank}º lugar no ranking!`,
              });
              playSound('rankUp', 0.35);
              saveDailyNotifications({
                ...dailyNotifications,
                lastKnownRank: currentRank
              });
            }
            // User moved up within top 5 (but not in top 3)
            else if (currentRank < previousRank && currentRank <= 5 && currentRank > 3) {
              toast({
                title: "🔥 Você subiu no ranking!",
                description: `De ${previousRank}º para ${currentRank}º lugar!`,
              });
              playSound('rankUp', 0.35);
              saveDailyNotifications({
                ...dailyNotifications,
                lastKnownRank: currentRank
              });
            }
            // User dropped in ranking - someone passed them (once per day)
            else if (currentRank > previousRank) {
              if (!dailyNotifications.rankDropShown) {
                toast({
                  title: "⚠️ Alguém te ultrapassou!",
                  description: `Você caiu de ${previousRank}º para ${currentRank}º lugar. Continue lendo para recuperar sua posição!`,
                  variant: "destructive",
                });
                playSound('rankDown', 0.3);
                saveDailyNotifications({
                  ...dailyNotifications,
                  rankDropShown: true,
                  lastKnownRank: currentRank
                });
              }
            }
          }
          
          previousRankRef.current = currentRank;
        }
      } catch (error) {
        console.error('Error checking ranking:', error);
      }
    };

    // Initial check only — no Realtime subscriptions to avoid triggering
    // get_user_rankings (heavy RPC) for ALL users on every action
    checkRanking();
  }, [userId, playSound]);

  return {
    showTop3Modal: notificationState.showTop3Modal,
    top3Rank: notificationState.top3Rank,
    closeTop3Modal
  };
};
