import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  CheckCircle2, XCircle, Trophy, Loader2, Clock, Sparkles, Zap, 
  ArrowLeft, Brain, BookOpen, Dices, FileText, Flame
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppHeader } from "@/components/shared/AppHeader";
import { useAuth } from "@/hooks/useAuth";
import { useQuiz, QuizDifficulty, QuizGameMode } from "@/hooks/useQuiz";
import { useReadingProgress } from "@/hooks/useReadingProgress";
import { readingPlans, ReadingPlan, getBrazilDate } from "@/lib/bibleData";
import { QuizBackground } from "@/components/quiz/QuizBackground";
import { QuizModeSelector, QuizMode } from "@/components/quiz/QuizModeSelector";
import { BookChapterSelector } from "@/components/quiz/BookChapterSelector";
import { DifficultySelector, Difficulty } from "@/components/quiz/DifficultySelector";
import { QuizGabaritoModal } from "@/components/quiz/QuizGabaritoModal";

// Timer duration based on difficulty
const getTimerSeconds = (difficulty: QuizDifficulty): number => {
  return difficulty === 'hard' ? 60 : 30;
};

type QuizStep = "mode" | "difficulty" | "book-chapter" | "playing";

const Quiz = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { user, profile, loading: authLoading } = useAuth();
  const { 
    loading: quizLoading, 
    currentQuestion, 
    currentQuestionIndex, 
    totalQuestions,
    results,
    quizCompleted,
    loadQuiz,
    submitAnswer,
    resetQuiz,
    todayAttempts,
    currentDifficulty,
    currentMode,
    sessionPoints,
    answeredQuestions,
    currentStreak,
    bestSessionStreak,
  } = useQuiz(user?.id);

  // Get reading progress with correct params
  const startDate = useMemo(() => {
    if (profile?.created_at) {
      return new Date(profile.created_at);
    }
    return getBrazilDate();
  }, [profile]);

  const currentPlan = (profile?.reading_plan || "365") as ReadingPlan;

  const { getTodaySchedule, loading: scheduleLoading } = useReadingProgress(user?.id, currentPlan, startDate);
  const todaySchedule = getTodaySchedule();

  // Calculate chapters read today
  const completedChaptersToday = useMemo(() => {
    if (!todaySchedule) return [];
    return todaySchedule.chapters.filter(c => c.isCompleted);
  }, [todaySchedule]);

  const [selectedAnswer, setSelectedAnswer] = useState<'A' | 'B' | 'C' | null>(null);
  const [answered, setAnswered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizStep, setQuizStep] = useState<QuizStep>("mode");
  const [selectedMode, setSelectedMode] = useState<QuizMode>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>("medium");
  const [freeQuizLoading, setFreeQuizLoading] = useState(false);
  const [showGabarito, setShowGabarito] = useState(false);
  const hasTimedOut = useRef(false);
  const hasProcessedParams = useRef(false);

  const chaptersReadToday = completedChaptersToday.length;
  
  // Only count attempts for chapters that are scheduled for TODAY
  const questionsAnsweredForTodayChapters = useMemo(() => {
    return todayAttempts.filter(attempt => 
      completedChaptersToday.some(ch => 
        ch.book === attempt.bookName && ch.chapter === attempt.chapterNumber
      )
    ).length;
  }, [todayAttempts, completedChaptersToday]);
  
  const maxQuestions = chaptersReadToday * 2;
  const hasQuestionsAvailable = questionsAnsweredForTodayChapters < maxQuestions && chaptersReadToday > 0;

  const isPlaying = quizStep === "playing";

  // Timer countdown - simple and direct approach
  useEffect(() => {
    // Only run timer when we have an active question and quiz is running
    const shouldRunTimer = isPlaying && 
                           currentQuestion && 
                           !quizLoading && 
                           !quizCompleted && 
                           !answered && 
                           !isTransitioning;
    
    if (!shouldRunTimer) {
      return;
    }

    // Reset timer for new question based on difficulty
    setTimeLeft(getTimerSeconds(currentDifficulty));
    hasTimedOut.current = false;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, currentQuestionIndex, quizLoading, quizCompleted, answered, isTransitioning]);

  // Handle timeout
  useEffect(() => {
    if (timeLeft === 0 && !answered && !isTransitioning && !hasTimedOut.current && currentQuestion && isPlaying) {
      hasTimedOut.current = true;
      setIsTransitioning(true);
      
      setTimeout(() => {
        setSelectedAnswer(null);
        setIsTransitioning(false);
        submitAnswer(null);
      }, 500);
    }
  }, [timeLeft, answered, isTransitioning, currentQuestion, submitAnswer, isPlaying]);

  // Handle URL parameters for quick-start quiz
  useEffect(() => {
    if (hasProcessedParams.current || scheduleLoading || !user) return;
    
    const mode = searchParams.get('mode');
    const book = searchParams.get('book');
    const chapter = searchParams.get('chapter');
    
    if (!mode || !book || !chapter) return;
    
    hasProcessedParams.current = true;
    
    // Clear the URL params
    setSearchParams({});
    
    const chapterNum = parseInt(chapter, 10);
    if (isNaN(chapterNum)) return;
    
    // Auto-start quiz based on mode
    const startQuizWithChapter = async (difficulty: QuizDifficulty = 'medium') => {
      setFreeQuizLoading(true);
      try {
        if (mode === 'plano') {
          // For plan mode, use completed chapters from today that match
          const matchingChapters = completedChaptersToday.filter(
            ch => ch.book === book && ch.chapter === chapterNum
          );
          
          if (matchingChapters.length > 0) {
            await loadQuiz(
              [{ book, chapter: chapterNum }],
              difficulty,
              'plan' as QuizGameMode
            );
            setSelectedMode('plan');
            setQuizStep("playing");
          } else {
            // Chapter not in today's completed - use free mode instead
            await loadQuiz([{ book, chapter: chapterNum }], difficulty, 'free' as QuizGameMode);
            setSelectedMode('free');
            setQuizStep("playing");
          }
        } else if (mode === 'capitulo') {
          // Direct chapter quiz (from Bíblia de Estudo)
          await loadQuiz([{ book, chapter: chapterNum }], difficulty, 'free' as QuizGameMode);
          setSelectedMode('free');
          setQuizStep("playing");
        }
      } finally {
        setFreeQuizLoading(false);
      }
    };
    
    // Go straight to difficulty selection with auto-start
    setSelectedMode(mode === 'plano' ? 'plan' : 'free');
    setQuizStep("difficulty");
    
    // Store the chapter info for when difficulty is selected
    (window as any).__quizAutoStart = { book, chapter: chapterNum, mode };
  }, [searchParams, scheduleLoading, user, completedChaptersToday, loadQuiz, setSearchParams]);

  const handleSelectMode = (mode: QuizMode) => {
    setSelectedMode(mode);
    setQuizStep("difficulty");
  };

  const handleSelectDifficulty = async (difficulty: Difficulty) => {
    setSelectedDifficulty(difficulty);
    
    // Check if we have auto-start params from URL
    const autoStart = (window as any).__quizAutoStart;
    if (autoStart) {
      delete (window as any).__quizAutoStart;
      setFreeQuizLoading(true);
      try {
        const gameMode = autoStart.mode === 'plano' ? 'plan' : 'free';
        await loadQuiz([{ book: autoStart.book, chapter: autoStart.chapter }], difficulty as QuizDifficulty, gameMode as QuizGameMode);
        setQuizStep("playing");
      } finally {
        setFreeQuizLoading(false);
      }
      return;
    }
    
    if (selectedMode === "plan") {
      // Start plan quiz directly
      await loadQuiz(
        completedChaptersToday.map(ch => ({ book: ch.book, chapter: ch.chapter })),
        difficulty as QuizDifficulty,
        'plan' as QuizGameMode
      );
      setQuizStep("playing");
    } else if (selectedMode === "random") {
      // Start random quiz directly
      setFreeQuizLoading(true);
      try {
        await loadQuiz([], difficulty as QuizDifficulty, 'random' as QuizGameMode);
        setQuizStep("playing");
      } finally {
        setFreeQuizLoading(false);
      }
    } else if (selectedMode === "free") {
      // Go to book/chapter selection
      setQuizStep("book-chapter");
    }
  };

  const handleStartFreeQuiz = async (book: string, chapter: number) => {
    setFreeQuizLoading(true);
    try {
      await loadQuiz([{ book, chapter }], selectedDifficulty as QuizDifficulty, 'free' as QuizGameMode);
      setQuizStep("playing");
    } finally {
      setFreeQuizLoading(false);
    }
  };

  const handleSelectAnswer = (answer: 'A' | 'B' | 'C') => {
    if (answered || isTransitioning || timeLeft === 0) return;
    setSelectedAnswer(answer);
  };

  const handleConfirmAnswer = useCallback(() => {
    if (!selectedAnswer || answered || isTransitioning) return;
    setAnswered(true);
    
    setTimeout(() => {
      setIsTransitioning(true);
      const answerToSubmit = selectedAnswer;
      setSelectedAnswer(null);
      setAnswered(false);
      
      setTimeout(() => {
        setIsTransitioning(false);
        submitAnswer(answerToSubmit);
      }, 100);
    }, 1500);
  }, [selectedAnswer, answered, isTransitioning, submitAnswer]);

  const handleEndQuiz = () => {
    resetQuiz();
    setQuizStep("mode");
    setSelectedMode(null);
    setSelectedDifficulty("medium");
    setSelectedAnswer(null);
    setAnswered(false);
    setShowGabarito(false);
  };

  const handleGoBack = () => {
    if (quizStep === "playing" && !quizCompleted) {
      handleEndQuiz();
    } else if (quizStep === "book-chapter") {
      setQuizStep("difficulty");
    } else if (quizStep === "difficulty") {
      setQuizStep("mode");
      setSelectedMode(null);
    } else {
      navigate(-1);
    }
  };

  const getTimerColor = () => {
    if (timeLeft <= 5) return 'text-red-500';
    if (timeLeft <= 10) return 'text-amber-400';
    return 'text-primary';
  };

  const getTimerBgColor = () => {
    if (timeLeft <= 5) return 'bg-gradient-to-r from-red-500 to-red-600';
    if (timeLeft <= 10) return 'bg-gradient-to-r from-amber-400 to-amber-500';
    return 'bg-gradient-to-r from-primary to-blue-400';
  };

  const getModeColor = (): "amber" | "purple" | "emerald" => {
    if (selectedMode === "free") return "purple";
    if (selectedMode === "random") return "emerald";
    return "amber";
  };

  const getModeName = () => {
    if (selectedMode === "free") return "Escolha Livre";
    if (selectedMode === "random") return "Modo Aleatório";
    return "Plano de Leitura";
  };

  const getModeThemeClasses = () => {
    if (currentMode === "free" || selectedMode === "free") {
      return {
        border: "border-purple-500/20",
        bg: "bg-gradient-to-br from-purple-500/10 to-purple-600/5",
        text: "text-purple-400",
        badge: "bg-purple-500/10 border-purple-500/20 text-purple-400",
        button: "bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 shadow-purple-500/30",
        selected: "border-purple-400 bg-purple-500/15 shadow-lg shadow-purple-500/20",
        gradient: "bg-gradient-to-r from-purple-400 via-purple-300 to-purple-400",
        optionSelected: "bg-gradient-to-br from-purple-400 to-purple-600",
        glow: "bg-gradient-to-br from-purple-400/30 to-purple-600/30",
        icon: "bg-gradient-to-br from-purple-400 to-purple-600 shadow-purple-500/40",
      };
    }
    if (currentMode === "random" || selectedMode === "random") {
      return {
        border: "border-emerald-500/20",
        bg: "bg-gradient-to-br from-emerald-500/10 to-emerald-600/5",
        text: "text-emerald-400",
        badge: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
        button: "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 shadow-emerald-500/30",
        selected: "border-emerald-400 bg-emerald-500/15 shadow-lg shadow-emerald-500/20",
        gradient: "bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-400",
        optionSelected: "bg-gradient-to-br from-emerald-400 to-emerald-600",
        glow: "bg-gradient-to-br from-emerald-400/30 to-emerald-600/30",
        icon: "bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-emerald-500/40",
      };
    }
    return {
      border: "border-amber-500/20",
      bg: "bg-gradient-to-br from-amber-500/10 to-amber-600/5",
      text: "text-amber-400",
      badge: "bg-amber-500/10 border-amber-500/20 text-amber-400",
      button: "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-amber-500/30",
      selected: "border-amber-400 bg-amber-500/15 shadow-lg shadow-amber-500/20",
      gradient: "bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400",
      optionSelected: "bg-gradient-to-br from-amber-400 to-amber-600",
      glow: "bg-gradient-to-br from-amber-400/30 to-amber-600/30",
      icon: "bg-gradient-to-br from-amber-400 to-amber-600 shadow-amber-500/40",
    };
  };

  const theme = getModeThemeClasses();

  if (authLoading || scheduleLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <QuizBackground />
        <Loader2 className="w-8 h-8 animate-spin text-primary relative z-10" />
      </div>
    );
  }

  if (!user) {
    navigate('/auth');
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-x-hidden relative">
      <QuizBackground />
      <AppHeader />
      
      <main className="flex-1 w-full max-w-2xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 relative z-10">
        {/* Back Button */}
        <button
          onClick={handleGoBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>
            {isPlaying && !quizCompleted 
              ? 'Encerrar Quiz' 
              : quizStep !== "mode"
              ? 'Voltar' 
              : 'Voltar'}
          </span>
        </button>

        {/* Step 1: Mode Selection */}
        {quizStep === "mode" && (
          <QuizModeSelector
            onSelectMode={handleSelectMode}
            hasQuestionsFromPlan={hasQuestionsAvailable}
            chaptersReadToday={chaptersReadToday}
          />
        )}

        {/* Step 2: Difficulty Selection */}
        {quizStep === "difficulty" && !freeQuizLoading && (
          <DifficultySelector
            onSelectDifficulty={handleSelectDifficulty}
            onBack={() => {
              setQuizStep("mode");
              setSelectedMode(null);
            }}
            modeName={getModeName()}
            modeColor={getModeColor()}
          />
        )}

        {/* Loading state for random mode */}
        {(quizStep === "difficulty" && freeQuizLoading) && (
          <div className="flex flex-col items-center justify-center py-12 sm:py-20 gap-4">
            <div className="relative">
              <Loader2 className={`w-12 h-12 animate-spin ${theme.text}`} />
              <div className="absolute inset-0 animate-ping">
                <Loader2 className={`w-12 h-12 ${theme.text} opacity-30`} />
              </div>
            </div>
            <p className="text-muted-foreground text-lg">
              {selectedMode === "random" ? "Gerando quiz aleatório..." : "Carregando perguntas..."}
            </p>
          </div>
        )}

        {/* Step 3: Free Mode - Book/Chapter Selection */}
        {quizStep === "book-chapter" && (
          <BookChapterSelector
            onSelect={handleStartFreeQuiz}
            onBack={() => setQuizStep("difficulty")}
            loading={freeQuizLoading}
          />
        )}

        {/* Plan Mode Loading */}
        {isPlaying && quizLoading && (
          <div className="flex flex-col items-center justify-center py-12 sm:py-20 gap-4">
            <div className="relative">
              <Loader2 className={`w-12 h-12 animate-spin ${theme.text}`} />
              <div className="absolute inset-0 animate-ping">
                <Loader2 className={`w-12 h-12 ${theme.text} opacity-30`} />
              </div>
            </div>
            <p className="text-muted-foreground text-lg">Carregando perguntas...</p>
          </div>
        )}

        {/* Quiz in Progress */}
        {isPlaying && !quizLoading && !quizCompleted && currentQuestion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* Chapter Info + Difficulty Badge */}
            <div className="text-center mb-3 sm:mb-4">
              <div className="flex items-center justify-center gap-2 flex-wrap">
                <span className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border text-xs sm:text-sm font-medium ${theme.badge}`}>
                  <BookOpen className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                  {currentQuestion.bookName} {currentQuestion.chapterNumber}
                </span>
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                  currentDifficulty === 'easy' ? 'bg-green-500/20 text-green-400' :
                  currentDifficulty === 'hard' ? 'bg-red-500/20 text-red-400' :
                  'bg-amber-500/20 text-amber-400'
                }`}>
                  {currentDifficulty === 'easy' ? 'Fácil' : currentDifficulty === 'hard' ? 'Difícil' : 'Médio'}
                  <span className="opacity-70">
                    (+{currentDifficulty === 'easy' ? '1' : currentDifficulty === 'hard' ? '3' : '2'})
                  </span>
                </span>
              </div>
            </div>

            {/* Progress and Timer */}
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-medium text-muted-foreground">
                  Pergunta {currentQuestionIndex + 1} de {totalQuestions}
                </span>
                {/* Streak indicator */}
                {currentStreak >= 2 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-500/20 border border-orange-500/40"
                  >
                    <span className="text-orange-400 text-xs font-bold">🔥 {currentStreak}</span>
                  </motion.div>
                )}
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className={`flex items-center gap-1 sm:gap-1.5 font-bold ${getTimerColor()} ${timeLeft <= 10 ? 'animate-pulse' : ''}`}>
                  <Clock className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                  <span className="tabular-nums text-base sm:text-lg">{timeLeft}s</span>
                </div>
                <div className="flex gap-1 sm:gap-1.5">
                  {Array.from({ length: totalQuestions }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full transition-all ${
                        i < currentQuestionIndex
                          ? 'bg-green-500 shadow-sm shadow-green-500/50'
                          : i === currentQuestionIndex
                          ? 'bg-primary shadow-sm shadow-primary/50'
                          : 'bg-muted/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Timer Progress Bar */}
            <div className="w-full h-1.5 sm:h-2 bg-muted/30 rounded-full mb-4 sm:mb-6 overflow-hidden">
              <motion.div
                className={`h-full ${getTimerBgColor()} rounded-full`}
                initial={{ width: '100%' }}
                animate={{ width: `${(timeLeft / getTimerSeconds(currentDifficulty)) * 100}%` }}
                transition={{ duration: 0.5, ease: 'linear' }}
              />
            </div>

            {/* Question */}
            <div className={`relative p-4 sm:p-5 rounded-xl border mb-4 sm:mb-6 ${theme.bg} ${theme.border}`}>
              <p className="text-base sm:text-lg font-medium leading-relaxed text-white/95">
                {currentQuestion.question}
              </p>
            </div>

            {/* Options */}
            <div className="space-y-2.5 sm:space-y-3 mb-4 sm:mb-6">
              {(['A', 'B', 'C'] as const).map((option) => (
                <motion.button
                  key={option}
                  onClick={() => handleSelectAnswer(option)}
                  disabled={answered}
                  whileHover={!answered ? { scale: 1.01 } : {}}
                  whileTap={!answered ? { scale: 0.99 } : {}}
                  className={`w-full p-3 sm:p-4 rounded-xl border-2 text-left transition-all ${
                    answered
                      ? selectedAnswer === option
                        ? option === currentQuestion.correct_answer
                          ? 'border-green-500 bg-green-500/15 shadow-lg shadow-green-500/20'
                          : 'border-red-500 bg-red-500/15 shadow-lg shadow-red-500/20'
                        : option === currentQuestion.correct_answer
                        ? 'border-green-500 bg-green-500/15'
                        : 'border-border/30 opacity-50'
                      : selectedAnswer === option
                      ? theme.selected
                      : 'border-border/30 hover:border-primary/50 hover:bg-primary/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <div
                      className={`w-8 sm:w-10 h-8 sm:h-10 rounded-lg flex items-center justify-center font-bold text-xs sm:text-sm transition-all flex-shrink-0 ${
                        answered
                          ? selectedAnswer === option
                            ? option === currentQuestion.correct_answer
                              ? 'bg-gradient-to-br from-green-400 to-green-600 text-white shadow-md shadow-green-500/30'
                              : 'bg-gradient-to-br from-red-400 to-red-600 text-white shadow-md shadow-red-500/30'
                            : option === currentQuestion.correct_answer
                            ? 'bg-gradient-to-br from-green-400 to-green-600 text-white'
                            : 'bg-muted/50 text-muted-foreground'
                          : selectedAnswer === option
                          ? `${theme.optionSelected} text-white shadow-md`
                          : 'bg-muted/50 text-muted-foreground'
                      }`}
                    >
                      {option}
                    </div>
                    <span className="flex-1 text-sm sm:text-base text-white/90">
                      {currentQuestion.options[option]}
                    </span>
                    {answered && option === currentQuestion.correct_answer && (
                      <CheckCircle2 className="w-5 sm:w-6 h-5 sm:h-6 text-green-400 flex-shrink-0" />
                    )}
                    {answered && selectedAnswer === option && option !== currentQuestion.correct_answer && (
                      <XCircle className="w-5 sm:w-6 h-5 sm:h-6 text-red-400 flex-shrink-0" />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-2.5 sm:gap-3">
              <Button
                variant="outline"
                onClick={handleEndQuiz}
                className="flex-1 h-10 sm:h-11 text-sm border-border/50 hover:bg-white/5"
              >
                Encerrar
              </Button>
              <Button
                onClick={handleConfirmAnswer}
                disabled={!selectedAnswer || answered}
                className={`flex-1 h-10 sm:h-11 text-sm shadow-lg disabled:opacity-50 disabled:shadow-none ${theme.button}`}
              >
                Confirmar
              </Button>
            </div>
          </motion.div>
        )}

        {/* Results Screen */}
        {quizCompleted && results && (
          <motion.div
            className="text-center py-6 sm:py-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="relative w-20 sm:w-28 h-20 sm:h-28 mx-auto mb-6 sm:mb-8">
              <div className={`absolute inset-0 rounded-full animate-pulse ${theme.glow}`} />
              <div className={`absolute inset-2 rounded-full flex items-center justify-center shadow-xl ${theme.icon}`}>
                <Trophy className="w-10 sm:w-14 h-10 sm:h-14 text-white drop-shadow-lg" />
              </div>
              <Sparkles className={`absolute -top-1 sm:-top-2 -right-1 sm:-right-2 w-5 sm:w-7 h-5 sm:h-7 animate-pulse ${theme.text}`} />
              <Sparkles className="absolute -bottom-0.5 sm:-bottom-1 -left-0.5 sm:-left-1 w-4 sm:w-6 h-4 sm:h-6 text-primary animate-pulse delay-150" />
            </div>
            
            <h2 className={`text-2xl sm:text-3xl font-bold mb-2 sm:mb-3 bg-clip-text text-transparent ${theme.gradient}`}>
              Parabéns!
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg mb-6 sm:mb-8">
              {currentMode === "random" ? "Quiz aleatório completo!" : 
               currentMode === "free" ? "Você completou o quiz!" : 
               "Você completou o quiz de hoje!"}
            </p>
            
            <div className="flex justify-center gap-3 sm:gap-6 mb-6 sm:mb-8">
              <div className="text-center p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-green-500/10 border border-green-500/30 min-w-[80px] sm:min-w-[100px]">
                <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-green-400 mb-1 sm:mb-2">
                  <CheckCircle2 className="w-5 sm:w-7 h-5 sm:h-7" />
                  <span className="text-2xl sm:text-4xl font-bold">{results.correct}</span>
                </div>
                <p className="text-xs sm:text-sm text-green-400/80">Acertos</p>
              </div>
              <div className="text-center p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-red-500/10 border border-red-500/30 min-w-[80px] sm:min-w-[100px]">
                <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-red-400 mb-1 sm:mb-2">
                  <XCircle className="w-5 sm:w-7 h-5 sm:h-7" />
                  <span className="text-2xl sm:text-4xl font-bold">{results.total - results.correct}</span>
                </div>
                <p className="text-xs sm:text-sm text-red-400/80">Erros</p>
              </div>
              {results.bestStreak >= 2 && (
                <div className="text-center p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-orange-500/10 border border-orange-500/30 min-w-[80px] sm:min-w-[100px]">
                  <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-orange-400 mb-1 sm:mb-2">
                    <Flame className="w-5 sm:w-7 h-5 sm:h-7" />
                    <span className="text-2xl sm:text-4xl font-bold">{results.bestStreak}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-orange-400/80">Sequência</p>
                </div>
              )}
            </div>

            <div className={`flex flex-col items-center gap-2 px-5 sm:px-8 py-3 sm:py-4 rounded-2xl border mb-6 sm:mb-8 ${theme.bg} ${theme.border}`}>
              <div className="flex items-center gap-2">
                <Zap className={`w-5 sm:w-6 h-5 sm:h-6 ${theme.text}`} />
                <span className={`text-base sm:text-xl font-bold ${theme.text}`}>
                  +{results.pointsEarned} {results.pointsEarned === 1 ? 'ponto' : 'pontos'} {results.pointsEarned > 0 ? 'ganhos!' : ''}
                </span>
              </div>
              {results.streakBonus > 0 && (
                <div className="flex items-center gap-1.5 text-orange-400">
                  <Flame className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    (inclui +{results.streakBonus} bônus de sequência!)
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-3">
              {/* Gabarito Button - always show */}
              <Button 
                onClick={() => setShowGabarito(true)}
                variant="outline"
                className="w-full h-11 sm:h-12 text-sm sm:text-base border-amber-500/30 hover:bg-amber-500/10"
              >
                <FileText className="w-4 h-4 mr-2" />
                Ver Gabarito
              </Button>
              {/* Back to reading button - show when quiz was started from Bíblia de Estudo */}
              {(currentMode === 'free' || selectedMode === 'free') && answeredQuestions.length > 0 && (
                <Button 
                  onClick={() => {
                    // Navigate back - use browser history to return to exact position
                    navigate(-1);
                  }}
                  className="w-full h-11 sm:h-12 text-sm sm:text-base bg-amber-600 hover:bg-amber-700"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Voltar para a Leitura
                </Button>
              )}
              <Button 
                onClick={handleEndQuiz}
                className={`w-full h-11 sm:h-12 text-sm sm:text-base shadow-lg ${theme.button}`}
              >
                Jogar Novamente
              </Button>
              <Button 
                onClick={() => navigate('/ranking')} 
                variant="outline"
                className="w-full h-11 sm:h-12 text-sm sm:text-base"
              >
                Ver Ranking
              </Button>
            </div>
          </motion.div>
        )}

        {/* No Questions Available */}
        {isPlaying && !quizLoading && !currentQuestion && !quizCompleted && (
          <div className="text-center py-12 sm:py-16">
            <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-muted/20 flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Trophy className="w-8 sm:w-10 h-8 sm:h-10 text-muted-foreground" />
            </div>
            <p className="text-base sm:text-lg text-muted-foreground mb-4 sm:mb-6">
              Nenhuma pergunta disponível
            </p>
            <Button onClick={handleEndQuiz} className="text-sm sm:text-base">
              Voltar
            </Button>
          </div>
        )}
      </main>

      {/* Gabarito Modal */}
      <QuizGabaritoModal
        isOpen={showGabarito}
        onClose={() => setShowGabarito(false)}
        answeredQuestions={answeredQuestions}
        themeColor={getModeColor()}
      />
    </div>
  );
};

export default Quiz;
