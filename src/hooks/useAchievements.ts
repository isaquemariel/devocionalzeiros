import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { 
  Flame, 
  BookOpen, 
  Crown, 
  Star, 
  Zap, 
  Heart, 
  Award,
  Target,
  Sparkles,
  Book,
  Calendar,
  Trophy,
  MessageCircle,
  Brain,
  Medal
} from "lucide-react";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  rarity: "comum" | "raro" | "epico" | "lendario";
  points: number;
  unlocked: boolean;
  claimed: boolean;
  progress: number;
  maxProgress: number;
  unlockedAt?: string;
}

// Helper to get Brasília date
const getBrasiliaDateString = (): string => {
  const now = new Date();
  const brasiliaDate = new Date(now.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
  const year = brasiliaDate.getFullYear();
  const month = (brasiliaDate.getMonth() + 1).toString().padStart(2, '0');
  const day = brasiliaDate.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const useAchievements = (userId: string | undefined) => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalClaimablePoints, setTotalClaimablePoints] = useState(0);

  const fetchAchievements = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      // Fetch user data in parallel
      const [
        { data: logins },
        { data: readingProgress },
        { data: readingSchedule },
        { data: quizAttempts },
        { data: devotionalCompletions },
        { data: claimedAchievements },
        { data: rpgProgress },
      ] = await Promise.all([
        supabase.from('daily_logins').select('login_date').eq('user_id', userId).order('login_date', { ascending: true }),
        supabase.from('reading_progress').select('book_name, chapter_number').eq('user_id', userId),
        supabase.from('reading_schedule').select('book_name, chapter_number, is_completed, completed_at').eq('user_id', userId).eq('is_completed', true),
        supabase.from('quiz_attempts').select('is_correct, points_earned, streak_count').eq('user_id', userId),
        supabase.from('devotional_completions').select('devotional_date').eq('user_id', userId),
        supabase.from('achievement_claims' as any).select('achievement_id').eq('user_id', userId),
        supabase.from('rpg_progress').select('is_completed, quiz_correct, quiz_total').eq('user_id', userId),
      ]);

      // Community stats (separate query to avoid breaking parallel typing)
      const { data: communityPosts } = await supabase
        .from('community_posts' as any)
        .select('post_type, is_answered')
        .eq('user_id', userId);
      const totalPrayerPosts = (communityPosts || []).filter((p: any) => p.post_type === 'prayer').length;
      const totalThanksPosts = (communityPosts || []).filter((p: any) => p.post_type === 'thanks').length;
      const totalAnsweredPrayers = (communityPosts || []).filter((p: any) => p.post_type === 'prayer' && p.is_answered).length;

      // Calculate stats
      const totalChaptersRead = (readingProgress?.length || 0) + (readingSchedule?.length || 0);
      const totalQuizCorrect = quizAttempts?.filter(q => q.is_correct).length || 0;
      const totalQuizHardCorrect = quizAttempts?.filter(q => q.is_correct && q.points_earned === 3).length || 0;
      const totalQuizMediumCorrect = quizAttempts?.filter(q => q.is_correct && q.points_earned === 2).length || 0;
      const totalQuizAttempts = quizAttempts?.length || 0;
      const totalDevotionals = devotionalCompletions?.length || 0;
      const totalLogins = logins?.length || 0;
      
      // RPG stats
      const rpgCompletedChapters = rpgProgress?.filter(p => p.is_completed).length || 0;
      const rpgPerfectChapters = rpgProgress?.filter(p => p.is_completed && p.quiz_correct === p.quiz_total && p.quiz_total > 0).length || 0;
      const rpgTotalXp = rpgProgress?.filter(p => p.is_completed).reduce((sum, p) => sum + 10 + (p.quiz_correct * 5), 0) || 0;
      
      // Calculate best quiz streak (max streak_count from all attempts)
      const bestQuizStreak = quizAttempts?.reduce((max, q) => Math.max(max, (q as any).streak_count || 0), 0) || 0;

      // Calculate current login streak
      let currentStreak = 0;
      if (logins && logins.length > 0) {
        const today = getBrasiliaDateString();
        const todayDate = new Date(today + 'T12:00:00');
        const lastLogin = logins[logins.length - 1].login_date;
        const lastLoginDate = new Date(lastLogin + 'T12:00:00');
        const daysSinceLastLogin = Math.round((todayDate.getTime() - lastLoginDate.getTime()) / (1000 * 60 * 60 * 24));
        
        if (daysSinceLastLogin <= 1) {
          currentStreak = 1;
          for (let i = logins.length - 1; i > 0; i--) {
            const currDate = new Date(logins[i].login_date + 'T12:00:00');
            const prevDate = new Date(logins[i - 1].login_date + 'T12:00:00');
            const diffDays = Math.round((currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24));
            if (diffDays === 1) {
              currentStreak++;
            } else {
              break;
            }
          }
        }
      }

      // Get claimed achievement IDs
      const claimedIds = new Set((claimedAchievements || []).map((c: any) => c.achievement_id));

      // Define achievements based on real user data
      const achievementDefinitions: Achievement[] = [
        // Leitura Achievements
        {
          id: "first_reading",
          title: "Primeiro Passo",
          description: "Complete sua primeira leitura",
          icon: BookOpen,
          rarity: "comum",
          points: 5,
          unlocked: totalChaptersRead >= 1,
          claimed: claimedIds.has("first_reading"),
          progress: Math.min(totalChaptersRead, 1),
          maxProgress: 1,
        },
        {
          id: "reader_10",
          title: "Leitor Dedicado",
          description: "Leia 10 capítulos da Bíblia",
          icon: Book,
          rarity: "comum",
          points: 5,
          unlocked: totalChaptersRead >= 10,
          claimed: claimedIds.has("reader_10"),
          progress: Math.min(totalChaptersRead, 10),
          maxProgress: 10,
        },
        {
          id: "reader_50",
          title: "Estudioso da Palavra",
          description: "Leia 50 capítulos da Bíblia",
          icon: Sparkles,
          rarity: "raro",
          points: 10,
          unlocked: totalChaptersRead >= 50,
          claimed: claimedIds.has("reader_50"),
          progress: Math.min(totalChaptersRead, 50),
          maxProgress: 50,
        },
        {
          id: "reader_100",
          title: "Mestre das Escrituras",
          description: "Leia 100 capítulos da Bíblia",
          icon: Crown,
          rarity: "epico",
          points: 15,
          unlocked: totalChaptersRead >= 100,
          claimed: claimedIds.has("reader_100"),
          progress: Math.min(totalChaptersRead, 100),
          maxProgress: 100,
        },
        {
          id: "reader_260",
          title: "Novo Testamento Completo",
          description: "Leia 260 capítulos (tamanho do NT)",
          icon: Star,
          rarity: "lendario",
          points: 20,
          unlocked: totalChaptersRead >= 260,
          claimed: claimedIds.has("reader_260"),
          progress: Math.min(totalChaptersRead, 260),
          maxProgress: 260,
        },

        // Streak Achievements
        {
          id: "streak_3",
          title: "Início Promissor",
          description: "Acesse o app por 3 dias seguidos",
          icon: Flame,
          rarity: "comum",
          points: 5,
          unlocked: currentStreak >= 3,
          claimed: claimedIds.has("streak_3"),
          progress: Math.min(currentStreak, 3),
          maxProgress: 3,
        },
        {
          id: "streak_7",
          title: "Chama Acesa",
          description: "Acesse o app por 7 dias seguidos",
          icon: Flame,
          rarity: "raro",
          points: 10,
          unlocked: currentStreak >= 7,
          claimed: claimedIds.has("streak_7"),
          progress: Math.min(currentStreak, 7),
          maxProgress: 7,
        },
        {
          id: "streak_30",
          title: "Fogo Inextinguível",
          description: "Acesse o app por 30 dias seguidos",
          icon: Zap,
          rarity: "epico",
          points: 15,
          unlocked: currentStreak >= 30,
          claimed: claimedIds.has("streak_30"),
          progress: Math.min(currentStreak, 30),
          maxProgress: 30,
        },
        {
          id: "streak_100",
          title: "Centurião da Fé",
          description: "Acesse o app por 100 dias seguidos",
          icon: Crown,
          rarity: "lendario",
          points: 20,
          unlocked: currentStreak >= 100,
          claimed: claimedIds.has("streak_100"),
          progress: Math.min(currentStreak, 100),
          maxProgress: 100,
        },

        // Quiz Achievements
        {
          id: "quiz_first",
          title: "Primeira Resposta",
          description: "Acerte sua primeira pergunta no quiz",
          icon: Brain,
          rarity: "comum",
          points: 5,
          unlocked: totalQuizCorrect >= 1,
          claimed: claimedIds.has("quiz_first"),
          progress: Math.min(totalQuizCorrect, 1),
          maxProgress: 1,
        },
        {
          id: "quiz_10",
          title: "Mente Afiada",
          description: "Acerte 10 perguntas no quiz",
          icon: Brain,
          rarity: "raro",
          points: 10,
          unlocked: totalQuizCorrect >= 10,
          claimed: claimedIds.has("quiz_10"),
          progress: Math.min(totalQuizCorrect, 10),
          maxProgress: 10,
        },
        {
          id: "quiz_50",
          title: "Sábio Bíblico",
          description: "Acerte 50 perguntas no quiz",
          icon: Trophy,
          rarity: "epico",
          points: 15,
          unlocked: totalQuizCorrect >= 50,
          claimed: claimedIds.has("quiz_50"),
          progress: Math.min(totalQuizCorrect, 50),
          maxProgress: 50,
        },
        {
          id: "quiz_100",
          title: "Mestre do Quiz",
          description: "Acerte 100 perguntas no quiz",
          icon: Trophy,
          rarity: "lendario",
          points: 20,
          unlocked: totalQuizCorrect >= 100,
          claimed: claimedIds.has("quiz_100"),
          progress: Math.min(totalQuizCorrect, 100),
          maxProgress: 100,
        },
        {
          id: "quiz_hard_10",
          title: "Desafiador",
          description: "Acerte 10 perguntas difíceis",
          icon: Zap,
          rarity: "raro",
          points: 10,
          unlocked: totalQuizHardCorrect >= 10,
          claimed: claimedIds.has("quiz_hard_10"),
          progress: Math.min(totalQuizHardCorrect, 10),
          maxProgress: 10,
        },
        {
          id: "quiz_hard_50",
          title: "Veterano do Difícil",
          description: "Acerte 50 perguntas difíceis",
          icon: Zap,
          rarity: "epico",
          points: 15,
          unlocked: totalQuizHardCorrect >= 50,
          claimed: claimedIds.has("quiz_hard_50"),
          progress: Math.min(totalQuizHardCorrect, 50),
          maxProgress: 50,
        },
        {
          id: "quiz_hard_100",
          title: "Lenda do Quiz Difícil",
          description: "Acerte 100 perguntas difíceis",
          icon: Crown,
          rarity: "lendario",
          points: 20,
          unlocked: totalQuizHardCorrect >= 100,
          claimed: claimedIds.has("quiz_hard_100"),
          progress: Math.min(totalQuizHardCorrect, 100),
          maxProgress: 100,
        },
        {
          id: "quiz_total_100",
          title: "Jogador Dedicado",
          description: "Responda 100 perguntas no quiz",
          icon: Target,
          rarity: "raro",
          points: 10,
          unlocked: totalQuizAttempts >= 100,
          claimed: claimedIds.has("quiz_total_100"),
          progress: Math.min(totalQuizAttempts, 100),
          maxProgress: 100,
        },
        {
          id: "quiz_total_500",
          title: "Maratonista do Quiz",
          description: "Responda 500 perguntas no quiz",
          icon: Medal,
          rarity: "lendario",
          points: 20,
          unlocked: totalQuizAttempts >= 500,
          claimed: claimedIds.has("quiz_total_500"),
          progress: Math.min(totalQuizAttempts, 500),
          maxProgress: 500,
        },

        // Quiz Streak Achievements
        {
          id: "quiz_streak_3",
          title: "Sequência Inicial",
          description: "Acerte 3 perguntas seguidas no quiz",
          icon: Flame,
          rarity: "comum",
          points: 5,
          unlocked: bestQuizStreak >= 3,
          claimed: claimedIds.has("quiz_streak_3"),
          progress: Math.min(bestQuizStreak, 3),
          maxProgress: 3,
        },
        {
          id: "quiz_streak_5",
          title: "Em Chamas",
          description: "Acerte 5 perguntas seguidas no quiz",
          icon: Flame,
          rarity: "raro",
          points: 10,
          unlocked: bestQuizStreak >= 5,
          claimed: claimedIds.has("quiz_streak_5"),
          progress: Math.min(bestQuizStreak, 5),
          maxProgress: 5,
        },
        {
          id: "quiz_streak_7",
          title: "Mente Brilhante",
          description: "Acerte 7 perguntas seguidas no quiz",
          icon: Sparkles,
          rarity: "epico",
          points: 15,
          unlocked: bestQuizStreak >= 7,
          claimed: claimedIds.has("quiz_streak_7"),
          progress: Math.min(bestQuizStreak, 7),
          maxProgress: 7,
        },
        {
          id: "quiz_streak_10",
          title: "Perfeição Absoluta",
          description: "Acerte 10 perguntas seguidas no quiz",
          icon: Crown,
          rarity: "lendario",
          points: 20,
          unlocked: bestQuizStreak >= 10,
          claimed: claimedIds.has("quiz_streak_10"),
          progress: Math.min(bestQuizStreak, 10),
          maxProgress: 10,
        },

        // Devocional Achievements
        {
          id: "devocional_first",
          title: "Momento com Deus",
          description: "Complete seu primeiro devocional",
          icon: Heart,
          rarity: "comum",
          points: 5,
          unlocked: totalDevotionals >= 1,
          claimed: claimedIds.has("devocional_first"),
          progress: Math.min(totalDevotionals, 1),
          maxProgress: 1,
        },
        {
          id: "devocional_7",
          title: "Semana de Devoção",
          description: "Complete 7 devocionais",
          icon: Heart,
          rarity: "raro",
          points: 10,
          unlocked: totalDevotionals >= 7,
          claimed: claimedIds.has("devocional_7"),
          progress: Math.min(totalDevotionals, 7),
          maxProgress: 7,
        },
        {
          id: "devocional_30",
          title: "Mês Devocional",
          description: "Complete 30 devocionais",
          icon: Award,
          rarity: "epico",
          points: 15,
          unlocked: totalDevotionals >= 30,
          claimed: claimedIds.has("devocional_30"),
          progress: Math.min(totalDevotionals, 30),
          maxProgress: 30,
        },

        // Constância Achievements
        {
          id: "login_10",
          title: "Visitante Frequente",
          description: "Acesse o app 10 vezes",
          icon: Calendar,
          rarity: "comum",
          points: 5,
          unlocked: totalLogins >= 10,
          claimed: claimedIds.has("login_10"),
          progress: Math.min(totalLogins, 10),
          maxProgress: 10,
        },
        {
          id: "login_50",
          title: "Usuário Fiel",
          description: "Acesse o app 50 vezes",
          icon: Target,
          rarity: "raro",
          points: 10,
          unlocked: totalLogins >= 50,
          claimed: claimedIds.has("login_50"),
          progress: Math.min(totalLogins, 50),
          maxProgress: 50,
        },
        {
          id: "login_100",
          title: "Devocionalzeiro de Ouro",
          description: "Acesse o app 100 vezes",
          icon: Medal,
          rarity: "lendario",
          points: 20,
          unlocked: totalLogins >= 100,
          claimed: claimedIds.has("login_100"),
          progress: Math.min(totalLogins, 100),
          maxProgress: 100,
        },

        // RPG / Jogo da Bíblia Achievements
        {
          id: "rpg_first",
          title: "Aventureiro",
          description: "Complete seu primeiro capítulo no Jogo da Bíblia",
          icon: Sparkles,
          rarity: "comum",
          points: 5,
          unlocked: rpgCompletedChapters >= 1,
          claimed: claimedIds.has("rpg_first"),
          progress: Math.min(rpgCompletedChapters, 1),
          maxProgress: 1,
        },
        {
          id: "rpg_10",
          title: "Explorador Bíblico",
          description: "Complete 10 capítulos no Jogo da Bíblia",
          icon: Target,
          rarity: "raro",
          points: 10,
          unlocked: rpgCompletedChapters >= 10,
          claimed: claimedIds.has("rpg_10"),
          progress: Math.min(rpgCompletedChapters, 10),
          maxProgress: 10,
        },
        {
          id: "rpg_50",
          title: "Herói da Fé",
          description: "Complete 50 capítulos no Jogo da Bíblia",
          icon: Award,
          rarity: "epico",
          points: 15,
          unlocked: rpgCompletedChapters >= 50,
          claimed: claimedIds.has("rpg_50"),
          progress: Math.min(rpgCompletedChapters, 50),
          maxProgress: 50,
        },
        {
          id: "rpg_100",
          title: "Lenda Bíblica",
          description: "Complete 100 capítulos no Jogo da Bíblia",
          icon: Crown,
          rarity: "lendario",
          points: 20,
          unlocked: rpgCompletedChapters >= 100,
          claimed: claimedIds.has("rpg_100"),
          progress: Math.min(rpgCompletedChapters, 100),
          maxProgress: 100,
        },
        {
          id: "rpg_perfect_5",
          title: "Jogador Perfeito",
          description: "Acerte todas as perguntas em 5 capítulos do Jogo",
          icon: Star,
          rarity: "raro",
          points: 10,
          unlocked: rpgPerfectChapters >= 5,
          claimed: claimedIds.has("rpg_perfect_5"),
          progress: Math.min(rpgPerfectChapters, 5),
          maxProgress: 5,
        },
        {
          id: "rpg_perfect_25",
          title: "Mestre do Jogo",
          description: "Acerte todas as perguntas em 25 capítulos do Jogo",
          icon: Crown,
          rarity: "epico",
          points: 15,
          unlocked: rpgPerfectChapters >= 25,
          claimed: claimedIds.has("rpg_perfect_25"),
          progress: Math.min(rpgPerfectChapters, 25),
          maxProgress: 25,
        },
        {
          id: "rpg_xp_100",
          title: "Centurião XP",
          description: "Acumule 100 XP no Jogo da Bíblia",
          icon: Zap,
          rarity: "raro",
          points: 10,
          unlocked: rpgTotalXp >= 100,
          claimed: claimedIds.has("rpg_xp_100"),
          progress: Math.min(rpgTotalXp, 100),
          maxProgress: 100,
        },
        {
          id: "rpg_xp_500",
          title: "Guerreiro da Palavra",
          description: "Acumule 500 XP no Jogo da Bíblia",
          icon: Trophy,
          rarity: "lendario",
          points: 20,
          unlocked: rpgTotalXp >= 500,
          claimed: claimedIds.has("rpg_xp_500"),
          progress: Math.min(rpgTotalXp, 500),
          maxProgress: 500,
        },

        // Community Achievements
        {
          id: "community_first_prayer",
          title: "Voz da Fé",
          description: "Publique seu primeiro pedido de oração",
          icon: Heart,
          rarity: "comum",
          points: 5,
          unlocked: totalPrayerPosts >= 1,
          claimed: claimedIds.has("community_first_prayer"),
          progress: Math.min(totalPrayerPosts, 1),
          maxProgress: 1,
        },
        {
          id: "community_prayer_10",
          title: "Coração Aberto",
          description: "Publique 10 pedidos de oração",
          icon: Heart,
          rarity: "raro",
          points: 10,
          unlocked: totalPrayerPosts >= 10,
          claimed: claimedIds.has("community_prayer_10"),
          progress: Math.min(totalPrayerPosts, 10),
          maxProgress: 10,
        },
        {
          id: "community_first_thanks",
          title: "Primeira Gratidão",
          description: "Publique seu primeiro agradecimento",
          icon: Sparkles,
          rarity: "comum",
          points: 5,
          unlocked: totalThanksPosts >= 1,
          claimed: claimedIds.has("community_first_thanks"),
          progress: Math.min(totalThanksPosts, 1),
          maxProgress: 1,
        },
        {
          id: "community_thanks_10",
          title: "Espírito Grato",
          description: "Publique 10 agradecimentos na comunidade",
          icon: Sparkles,
          rarity: "raro",
          points: 10,
          unlocked: totalThanksPosts >= 10,
          claimed: claimedIds.has("community_thanks_10"),
          progress: Math.min(totalThanksPosts, 10),
          maxProgress: 10,
        },
        {
          id: "community_thanks_50",
          title: "Gratidão Sem Fim",
          description: "Publique 50 agradecimentos",
          icon: Award,
          rarity: "epico",
          points: 15,
          unlocked: totalThanksPosts >= 50,
          claimed: claimedIds.has("community_thanks_50"),
          progress: Math.min(totalThanksPosts, 50),
          maxProgress: 50,
        },
        {
          id: "community_answered_1",
          title: "Oração Respondida",
          description: "Marque seu primeiro pedido como respondido",
          icon: CheckCircle2 as any,
          rarity: "raro",
          points: 10,
          unlocked: totalAnsweredPrayers >= 1,
          claimed: claimedIds.has("community_answered_1"),
          progress: Math.min(totalAnsweredPrayers, 1),
          maxProgress: 1,
        },
        {
          id: "community_answered_10",
          title: "Testemunho Vivo",
          description: "Tenha 10 pedidos marcados como respondidos",
          icon: Crown,
          rarity: "epico",
          points: 15,
          unlocked: totalAnsweredPrayers >= 10,
          claimed: claimedIds.has("community_answered_10"),
          progress: Math.min(totalAnsweredPrayers, 10),
          maxProgress: 10,
        },
      ];

      setAchievements(achievementDefinitions);
      
      // Calculate total claimable points
      const claimable = achievementDefinitions
        .filter(a => a.unlocked && !a.claimed)
        .reduce((sum, a) => sum + a.points, 0);
      setTotalClaimablePoints(claimable);

    } catch (error) {
      console.error('Error fetching achievements:', error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const claimAchievement = async (achievementId: string) => {
    if (!userId) return { success: false };

    const achievement = achievements.find(a => a.id === achievementId);
    if (!achievement || !achievement.unlocked || achievement.claimed) {
      return { success: false };
    }

    try {
      // Record the claim
      await (supabase as any)
        .from('achievement_claims')
        .insert({
          user_id: userId,
          achievement_id: achievementId,
          points_awarded: achievement.points,
        });

      // Update local state
      setAchievements(prev => prev.map(a => 
        a.id === achievementId ? { ...a, claimed: true } : a
      ));
      
      setTotalClaimablePoints(prev => prev - achievement.points);

      return { success: true, points: achievement.points };
    } catch (error) {
      console.error('Error claiming achievement:', error);
      return { success: false };
    }
  };

  const claimAllAchievements = async () => {
    if (!userId) return { success: false, totalPoints: 0 };

    const unclaimedAchievements = achievements.filter(a => a.unlocked && !a.claimed);
    if (unclaimedAchievements.length === 0) {
      return { success: false, totalPoints: 0 };
    }

    try {
      // Record all claims
      const claims = unclaimedAchievements.map(a => ({
        user_id: userId,
        achievement_id: a.id,
        points_awarded: a.points,
      }));

      await (supabase as any)
        .from('achievement_claims')
        .insert(claims);

      const totalPoints = unclaimedAchievements.reduce((sum, a) => sum + a.points, 0);

      // Update local state
      setAchievements(prev => prev.map(a => 
        a.unlocked ? { ...a, claimed: true } : a
      ));
      
      setTotalClaimablePoints(0);

      return { success: true, totalPoints };
    } catch (error) {
      console.error('Error claiming all achievements:', error);
      return { success: false, totalPoints: 0 };
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, [fetchAchievements]);

  return {
    achievements,
    loading,
    totalClaimablePoints,
    claimAchievement,
    claimAllAchievements,
    refetch: fetchAchievements,
  };
};
