import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { RPG_BIBLE_BOOKS, TOTAL_CHAPTERS } from '@/lib/rpgBibleData';

interface RPGStats {
  totalXp: number;
  currentLevel: number;
  currentStage: number;
  streakDays: number;
  lockedUntil: string | null;
  completedChapters: number;
  characterName: string | null;
  celebratedLevel: number;
}

interface StageProgress {
  bookIndex: number;
  chapterNumber: number;
  isCompleted: boolean;
  readingTimeSeconds: number;
  quizCorrect: number;
  quizTotal: number;
}

export const useRPGProgress = (userId: string | undefined) => {
  const [stats, setStats] = useState<RPGStats | null>(null);
  const [stageProgress, setStageProgress] = useState<StageProgress[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    if (!userId) { setLoading(false); return; }

    try {
      // Fetch stats and progress in parallel
      const [statsRes, progressRes] = await Promise.all([
        supabase.from('rpg_user_stats').select('*').eq('user_id', userId).maybeSingle(),
        supabase.from('rpg_progress').select('*').eq('user_id', userId).order('book_index').order('chapter_number'),
      ]);

      if (statsRes.data) {
        const s = statsRes.data as any;
        setStats({
          totalXp: s.total_xp,
          currentLevel: s.current_level,
          currentStage: s.current_stage,
          streakDays: s.streak_days,
          lockedUntil: s.locked_until,
          completedChapters: 0, // will be overwritten below
          characterName: s.character_name ?? null,
          celebratedLevel: s.celebrated_level ?? 0,
        });
      }

      const progress = (progressRes.data || []).map((p: any) => ({
        bookIndex: p.book_index,
        chapterNumber: p.chapter_number,
        isCompleted: p.is_completed,
        readingTimeSeconds: p.reading_time_seconds,
        quizCorrect: p.quiz_correct,
        quizTotal: p.quiz_total,
      }));
      setStageProgress(progress);

      const completedCount = progress.filter((p: StageProgress) => p.isCompleted).length;

      // Update completed count in stats
      setStats(prev => prev ? { ...prev, completedChapters: completedCount } : {
        totalXp: 0, currentLevel: 0, currentStage: 1, streakDays: 0, lockedUntil: null, completedChapters: completedCount, characterName: null, celebratedLevel: 0
      });

    } catch (err) {
      console.error('Error fetching RPG data:', err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const initializeStats = useCallback(async () => {
    if (!userId) return;
    // Only insert if no row exists — never overwrite existing stats
    const { data: existing } = await supabase
      .from('rpg_user_stats')
      .select('id')
      .eq('user_id', userId)
      .maybeSingle();
    if (existing) { fetchData(); return; }
    const { error } = await supabase.from('rpg_user_stats').insert({
      user_id: userId,
      total_xp: 0,
      current_level: 1,
      current_stage: 1,
      streak_days: 0,
    });
    if (!error) fetchData();
  }, [userId, fetchData]);

  // Salva o nome do personagem na conta (persiste entre updates/aparelhos)
  const saveCharacter = useCallback(async (name: string): Promise<{ ok: boolean; error?: string }> => {
    if (!userId) return { ok: false };
    const clean = name.trim().slice(0, 10); // só letras · até 10 (validado no onboarding)
    // garante que a linha existe
    const { data: existing } = await supabase
      .from('rpg_user_stats')
      .select('id')
      .eq('user_id', userId)
      .maybeSingle();
    const res = existing
      ? await supabase.from('rpg_user_stats').update({ character_name: clean } as any).eq('user_id', userId)
      : await supabase.from('rpg_user_stats').insert({
          user_id: userId, total_xp: 0, current_level: 1, current_stage: 1, streak_days: 0,
          character_name: clean,
        } as any);
    if (res.error) {
      // 23505 = índice único → nome já em uso (corrida rara, pós-checagem)
      if ((res.error as any).code === '23505') return { ok: false, error: 'name_taken' };
      return { ok: false, error: res.error.message };
    }
    // otimista: reflete localmente na hora (fecha o onboarding sem esperar refetch)
    setStats(prev => (prev ? { ...prev, characterName: clean } : prev));
    return { ok: true };
  }, [userId]);

  // Marca no banco que o usuário já viu a comemoração deste nível (evita repetir).
  const markLevelCelebrated = useCallback(async (level: number) => {
    if (!userId) return;
    setStats(prev => (prev ? { ...prev, celebratedLevel: level } : prev)); // otimista
    await supabase.from('rpg_user_stats').update({ celebrated_level: level } as any).eq('user_id', userId);
  }, [userId]);

  const isStageUnlocked = useCallback((bookIndex: number, chapter: number): boolean => {
    if (bookIndex === 0 && chapter === 1) return true;
    // Previous chapter in same book
    if (chapter > 1) {
      return stageProgress.some(p => p.bookIndex === bookIndex && p.chapterNumber === chapter - 1 && p.isCompleted);
    }
    // First chapter of a book => previous book must be fully completed
    if (bookIndex > 0) {
      const prevBook = RPG_BIBLE_BOOKS[bookIndex - 1];
      return stageProgress.some(p => p.bookIndex === bookIndex - 1 && p.chapterNumber === prevBook.chapters && p.isCompleted);
    }
    return false;
  }, [stageProgress]);

  const getBookProgress = useCallback((bookIndex: number) => {
    const book = RPG_BIBLE_BOOKS[bookIndex];
    if (!book) return { completed: 0, total: 0, percent: 0 };
    const completed = stageProgress.filter(p => p.bookIndex === bookIndex && p.isCompleted).length;
    return { completed, total: book.chapters, percent: Math.round((completed / book.chapters) * 100) };
  }, [stageProgress]);

  const overallPercent = stats ? Math.round((stats.completedChapters / TOTAL_CHAPTERS) * 100) : 0;

  return {
    stats,
    stageProgress,
    loading,
    initializeStats,
    saveCharacter,
    isStageUnlocked,
    getBookProgress,
    overallPercent,
    markLevelCelebrated,
    refetch: fetchData,
  };
};
