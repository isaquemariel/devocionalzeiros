import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { triggerConfetti } from '@/utils/confetti';
import { useGameSounds } from '@/hooks/useGameSounds';

interface QuizQuestion {
  question: string;
  options: { A: string; B: string; C: string };
  correct_answer: 'A' | 'B' | 'C';
}

interface ChapterQuestions {
  bookName: string;
  chapterNumber: number;
  questions: QuizQuestion[];
}

interface QuizAttempt {
  bookName: string;
  chapterNumber: number;
  questionIndex: number;
  isCorrect: boolean;
}

export const useQuiz = (userId: string | undefined) => {
  const [questions, setQuestions] = useState<ChapterQuestions[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Map<string, 'A' | 'B' | 'C'>>(new Map());
  const [results, setResults] = useState<{ correct: number; total: number } | null>(null);
  const [todayAttempts, setTodayAttempts] = useState<QuizAttempt[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const { playSound } = useGameSounds();

  // Flatten all questions into a single list
  const flatQuestions = questions.flatMap((chapterQ) =>
    chapterQ.questions.map((q, idx) => ({
      ...q,
      bookName: chapterQ.bookName,
      chapterNumber: chapterQ.chapterNumber,
      questionIndex: idx,
    }))
  );

  const totalQuestions = flatQuestions.length;
  const currentQuestion = flatQuestions[currentQuestionIndex];

  // Fetch today's attempts to know which questions already answered
  const fetchTodayAttempts = useCallback(async () => {
    if (!userId) return;

    // Use Brasilia timezone for date calculation
    const now = new Date();
    const brasiliaDate = new Date(now.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
    const today = brasiliaDate.toISOString().split('T')[0];
    
    console.log('Quiz: Fetching attempts for date (Brasilia):', today);
    
    // Use any to bypass type checking for new tables not yet in types.ts
    const { data, error } = await (supabase as any)
      .from('quiz_attempts')
      .select('*')
      .eq('user_id', userId)
      .eq('quiz_date', today);

    if (!error && data) {
      console.log('Quiz: Found', data.length, 'attempts for today');
      setTodayAttempts(data.map((a: any) => ({
        bookName: a.book_name,
        chapterNumber: a.chapter_number,
        questionIndex: a.question_index,
        isCorrect: a.is_correct,
      })));
    } else {
      console.log('Quiz: No attempts found or error:', error?.message);
      setTodayAttempts([]);
    }
  }, [userId]);

  useEffect(() => {
    fetchTodayAttempts();
  }, [fetchTodayAttempts]);

  // Load quiz questions for completed chapters
  const loadQuiz = async (completedChapters: Array<{ book: string; chapter: number }>) => {
    console.log('loadQuiz called with:', completedChapters);
    console.log('todayAttempts:', todayAttempts);
    
    if (!userId || completedChapters.length === 0) {
      console.log('loadQuiz early return - no userId or empty chapters');
      return;
    }

    setLoading(true);
    setResults(null);
    setQuizCompleted(false);
    setCurrentQuestionIndex(0);
    setAnswers(new Map());

    try {
      // Try to refresh the session first
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !sessionData.session?.access_token) {
        console.log('Session expired or missing, attempting refresh...');
        const { error: refreshError } = await supabase.auth.refreshSession();
        
        if (refreshError) {
          console.log('Refresh failed, signing out user');
          await supabase.auth.signOut();
          toast({
            title: "Sessão expirada",
            description: "Faça login novamente para continuar.",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }
      }

      // Filter out chapters that already have all questions answered today
      const chaptersToLoad = completedChapters.filter(ch => {
        const attemptedCount = todayAttempts.filter(
          a => a.bookName === ch.book && a.chapterNumber === ch.chapter
        ).length;
        return attemptedCount < 2; // Max 2 questions per chapter
      });

      if (chaptersToLoad.length === 0) {
        toast({
          title: "Quiz completo!",
          description: "Você já respondeu todas as perguntas de hoje.",
        });
        setLoading(false);
        return;
      }

      const response = await supabase.functions.invoke('quiz-generator', {
        body: {
          chapters: chaptersToLoad.map(ch => ({
            bookName: ch.book,
            chapterNumber: ch.chapter,
          })),
        },
      });

      if (response.error) {
        console.error('Quiz function error:', response.error);
        
        // Check if it's an auth error
        const errorMessage = response.error.message || '';
        if (errorMessage.includes('session') || 
            errorMessage.includes('token') || 
            errorMessage.includes('expired') ||
            errorMessage.includes('401') ||
            errorMessage.includes('Auth')) {
          await supabase.auth.signOut();
          toast({
            title: "Sessão expirada",
            description: "Faça login novamente para continuar.",
            variant: "destructive",
          });
          return;
        }
        
        throw new Error(errorMessage || 'Erro ao carregar quiz');
      }

      const data = response.data;
      
      if (data.questions) {
        // Filter out already answered questions
        const filteredQuestions = data.questions.map((chQ: ChapterQuestions) => {
          const remainingQuestions = chQ.questions.filter((_, idx) => {
            const alreadyAnswered = todayAttempts.some(
              a => a.bookName === chQ.bookName && 
                   a.chapterNumber === chQ.chapterNumber && 
                   a.questionIndex === idx
            );
            return !alreadyAnswered;
          });
          return { ...chQ, questions: remainingQuestions };
        }).filter((chQ: ChapterQuestions) => chQ.questions.length > 0);

        setQuestions(filteredQuestions);
      }
    } catch (error) {
      console.error('Error loading quiz:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      toast({
        title: "Erro ao carregar quiz",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Submit an answer (null = timeout, no answer given)
  const submitAnswer = useCallback(async (answer: 'A' | 'B' | 'C' | null) => {
    if (!userId) return;
    
    // Get current question from flat questions using current index
    const currentQ = flatQuestions[currentQuestionIndex];
    if (!currentQ) return;

    const isCorrect = answer !== null && answer === currentQ.correct_answer;
    const pointsEarned = isCorrect ? 1 : 0;

    // Use Brasilia timezone for date
    const now = new Date();
    const brasiliaDate = new Date(now.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
    const quizDate = brasiliaDate.toISOString().split('T')[0];

    // Store in database (use any for new table)
    try {
      await (supabase as any).from('quiz_attempts').insert({
        user_id: userId,
        book_name: currentQ.bookName,
        chapter_number: currentQ.chapterNumber,
        question_index: currentQ.questionIndex,
        is_correct: isCorrect,
        points_earned: pointsEarned,
        quiz_date: quizDate,
      });

      // Update local answers only if an answer was given
      if (answer !== null) {
        const key = `${currentQ.bookName}-${currentQ.chapterNumber}-${currentQ.questionIndex}`;
        setAnswers(prev => new Map(prev).set(key, answer));
      }

      // Update today attempts
      setTodayAttempts(prev => [...prev, {
        bookName: currentQ.bookName,
        chapterNumber: currentQ.chapterNumber,
        questionIndex: currentQ.questionIndex,
        isCorrect,
      }]);

      if (answer === null) {
        playSound('wrong');
        toast({
          title: "Tempo esgotado! ⏱️",
          description: `A resposta certa era: ${currentQ.correct_answer}`,
          variant: "destructive",
        });
      } else if (isCorrect) {
        playSound('correct');
        triggerConfetti('complete');
        toast({
          title: "Correto! ✓",
          description: "+1 ponto",
        });
      } else {
        playSound('wrong');
        toast({
          title: "Incorreto",
          description: `A resposta certa era: ${currentQ.correct_answer}`,
          variant: "destructive",
        });
      }

      // Move to next question or finish
      const total = flatQuestions.length;
      if (currentQuestionIndex < total - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        // Quiz finished - calculate results
        const correctCount = todayAttempts.filter(a => a.isCorrect).length + (isCorrect ? 1 : 0);
        const totalAnswered = todayAttempts.length + 1;
        
        setResults({ correct: correctCount, total: totalAnswered });
        setQuizCompleted(true);
        
        if (correctCount === totalAnswered) {
          triggerConfetti('celebration');
        } else {
          triggerConfetti('achievement');
        }
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
      toast({
        title: "Erro ao salvar resposta",
        description: "Tente novamente.",
        variant: "destructive",
      });
    }
  }, [userId, flatQuestions, currentQuestionIndex, todayAttempts, playSound]);

  const resetQuiz = () => {
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setAnswers(new Map());
    setResults(null);
    setQuizCompleted(false);
  };

  return {
    questions,
    loading,
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    results,
    quizCompleted,
    loadQuiz,
    submitAnswer,
    resetQuiz,
    todayAttempts,
  };
};
