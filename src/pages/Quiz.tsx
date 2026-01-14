import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  CheckCircle2, XCircle, Trophy, Loader2, Clock, Sparkles, Zap, 
  ArrowLeft, Brain, BookOpen 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppHeader } from "@/components/shared/AppHeader";
import { useAuth } from "@/hooks/useAuth";
import { useQuiz } from "@/hooks/useQuiz";
import { useReadingProgress } from "@/hooks/useReadingProgress";
import { readingPlans, ReadingPlan, getBrazilDate } from "@/lib/bibleData";

const TIMER_SECONDS = 30;

const Quiz = () => {
  const navigate = useNavigate();
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
    todayAttempts 
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
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const [quizStarted, setQuizStarted] = useState(false);
  const hasTimedOut = useRef(false);

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

  // Timer countdown - simple and direct approach
  useEffect(() => {
    // Only run timer when we have an active question and quiz is running
    const shouldRunTimer = quizStarted && 
                           currentQuestion && 
                           !quizLoading && 
                           !quizCompleted && 
                           !answered && 
                           !isTransitioning;
    
    if (!shouldRunTimer) {
      return;
    }

    // Reset timer for new question
    setTimeLeft(TIMER_SECONDS);
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
  }, [quizStarted, currentQuestionIndex, quizLoading, quizCompleted, answered, isTransitioning]);

  // Handle timeout
  useEffect(() => {
    if (timeLeft === 0 && !answered && !isTransitioning && !hasTimedOut.current && currentQuestion && quizStarted) {
      hasTimedOut.current = true;
      setIsTransitioning(true);
      
      setTimeout(() => {
        setSelectedAnswer(null);
        setIsTransitioning(false);
        submitAnswer(null);
      }, 500);
    }
  }, [timeLeft, answered, isTransitioning, currentQuestion, submitAnswer, quizStarted]);

  const handleStartQuiz = async () => {
    if (!hasQuestionsAvailable) return;
    
    // Load questions first, then start quiz
    await loadQuiz(completedChaptersToday.map(ch => ({ book: ch.book, chapter: ch.chapter })));
    setQuizStarted(true);
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
    setQuizStarted(false);
    setSelectedAnswer(null);
    setAnswered(false);
  };

  const handleGoBack = () => {
    if (quizStarted && !quizCompleted) {
      handleEndQuiz();
    } else {
      navigate(-1); // Navigate to previous page in history
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

  if (authLoading || scheduleLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    navigate('/auth');
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-x-hidden">
      <AppHeader />
      
      <main className="flex-1 w-full max-w-2xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6">
        {/* Back Button */}
        <button
          onClick={handleGoBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>{quizStarted && !quizCompleted ? 'Encerrar Quiz' : 'Voltar'}</span>
        </button>

        {!quizStarted ? (
          /* Quiz Start Screen */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Header Card */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-600/20 via-yellow-600/15 to-orange-600/20 border border-amber-500/30 p-4 sm:p-6">
              <div className="absolute top-0 right-0 w-32 sm:w-40 h-32 sm:h-40 bg-amber-500/20 rounded-full blur-[60px]" />
              
              <motion.div
                className="absolute top-4 right-4"
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-6 h-6 text-amber-400" />
              </motion.div>
              
              <div className="relative z-10">
                <div className="w-12 sm:w-16 h-12 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center mb-3 sm:mb-4 shadow-lg shadow-amber-500/30">
                  <Trophy className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
                </div>
                
                <h1 className="text-xl sm:text-2xl font-bold mb-2 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 bg-clip-text text-transparent">
                  Quiz Bíblico
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Teste seu conhecimento sobre os capítulos que você leu hoje
                </p>
              </div>
            </div>

            {/* Stats Card */}
            <div className="rounded-xl bg-card border border-border p-4 sm:p-5 space-y-4">
              <h3 className="font-semibold text-base sm:text-lg flex items-center gap-2">
                <BookOpen className="w-4 sm:w-5 h-4 sm:h-5 text-primary" />
                Seu Progresso Hoje
              </h3>
              
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="p-3 sm:p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">{chaptersReadToday}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Capítulos lidos</div>
                </div>
                <div className="p-3 sm:p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <div className="text-2xl sm:text-3xl font-bold text-amber-400 mb-1">{questionsAnsweredForTodayChapters}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Perguntas respondidas</div>
                </div>
              </div>

              {chaptersReadToday > 0 && (
                <div className="p-3 sm:p-4 rounded-lg bg-muted/30 border border-border">
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm text-muted-foreground">Perguntas disponíveis</span>
                    <span className="text-base sm:text-lg font-bold text-foreground">
                      {Math.max(0, maxQuestions - questionsAnsweredForTodayChapters)}
                    </span>
                  </div>
                  <div className="w-full h-1.5 sm:h-2 bg-muted/50 rounded-full mt-2 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full transition-all"
                      style={{ width: `${(questionsAnsweredForTodayChapters / maxQuestions) * 100}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Start Button */}
            {hasQuestionsAvailable ? (
              <Button
                onClick={handleStartQuiz}
                disabled={quizLoading}
                className="w-full h-12 sm:h-14 text-base sm:text-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-lg shadow-amber-500/30"
              >
                {quizLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Carregando perguntas...
                  </>
                ) : (
                  <>
                    <Brain className="w-5 h-5 mr-2" />
                    Iniciar Quiz
                  </>
                )}
              </Button>
            ) : chaptersReadToday === 0 ? (
              <div className="text-center p-4 sm:p-6 rounded-xl bg-muted/30 border border-border">
                <Brain className="w-10 sm:w-12 h-10 sm:h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm sm:text-base text-muted-foreground mb-4">
                  Leia capítulos da Bíblia para desbloquear perguntas do quiz
                </p>
                <Button onClick={() => navigate('/biblia')} variant="outline" className="text-sm sm:text-base">
                  Ir para Leitura Bíblica
                </Button>
              </div>
            ) : (
              <div className="text-center p-4 sm:p-6 rounded-xl bg-green-500/10 border border-green-500/30">
                <CheckCircle2 className="w-10 sm:w-12 h-10 sm:h-12 text-green-400 mx-auto mb-3" />
                <p className="text-green-400 font-medium mb-2 text-sm sm:text-base">Quiz completo para hoje! ✓</p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Você respondeu todas as {questionsAnsweredForTodayChapters} perguntas disponíveis
                </p>
              </div>
            )}
          </motion.div>
        ) : quizLoading ? (
          /* Loading State */
          <div className="flex flex-col items-center justify-center py-12 sm:py-20 gap-4">
            <div className="relative">
              <Loader2 className="w-12 h-12 animate-spin text-primary" />
              <div className="absolute inset-0 animate-ping">
                <Loader2 className="w-12 h-12 text-primary/30" />
              </div>
            </div>
            <p className="text-muted-foreground text-lg">Carregando perguntas...</p>
          </div>
        ) : quizCompleted && results ? (
          /* Results Screen */
          <motion.div
            className="text-center py-6 sm:py-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="relative w-20 sm:w-28 h-20 sm:h-28 mx-auto mb-6 sm:mb-8">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-400/30 to-amber-600/30 animate-pulse" />
              <div className="absolute inset-2 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-xl shadow-amber-500/40">
                <Trophy className="w-10 sm:w-14 h-10 sm:h-14 text-white drop-shadow-lg" />
              </div>
              <Sparkles className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 w-5 sm:w-7 h-5 sm:h-7 text-amber-400 animate-pulse" />
              <Sparkles className="absolute -bottom-0.5 sm:-bottom-1 -left-0.5 sm:-left-1 w-4 sm:w-6 h-4 sm:h-6 text-primary animate-pulse delay-150" />
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 bg-clip-text text-transparent">
              Parabéns!
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg mb-6 sm:mb-8">
              Você completou o quiz de hoje!
            </p>
            
            <div className="flex justify-center gap-3 sm:gap-6 mb-6 sm:mb-8">
              <div className="text-center p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-green-500/10 border border-green-500/30 min-w-[90px] sm:min-w-[120px]">
                <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-green-400 mb-1 sm:mb-2">
                  <CheckCircle2 className="w-5 sm:w-7 h-5 sm:h-7" />
                  <span className="text-2xl sm:text-4xl font-bold">{results.correct}</span>
                </div>
                <p className="text-xs sm:text-sm text-green-400/80">Acertos</p>
              </div>
              <div className="text-center p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-red-500/10 border border-red-500/30 min-w-[90px] sm:min-w-[120px]">
                <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-red-400 mb-1 sm:mb-2">
                  <XCircle className="w-5 sm:w-7 h-5 sm:h-7" />
                  <span className="text-2xl sm:text-4xl font-bold">{results.total - results.correct}</span>
                </div>
                <p className="text-xs sm:text-sm text-red-400/80">Erros</p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-5 sm:px-8 py-3 sm:py-4 rounded-full bg-gradient-to-r from-primary/20 to-blue-500/20 border border-primary/40 mb-6 sm:mb-8">
              <Zap className="w-5 sm:w-6 h-5 sm:h-6 text-primary" />
              <span className="text-base sm:text-xl font-bold text-primary">
                +{results.correct} pontos ganhos!
              </span>
            </div>

            <div className="space-y-3">
              <Button 
                onClick={() => navigate('/biblia')} 
                className="w-full h-11 sm:h-12 text-sm sm:text-base bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90 shadow-lg shadow-primary/30"
              >
                Continuar Leitura
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
        ) : currentQuestion ? (
          /* Question Screen */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* Chapter Info */}
            <div className="text-center mb-3 sm:mb-4">
              <span className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 border border-primary/20 text-xs sm:text-sm font-medium text-primary">
                <BookOpen className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                {currentQuestion.bookName} {currentQuestion.chapterNumber}
              </span>
            </div>

            {/* Progress and Timer */}
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <span className="text-xs sm:text-sm font-medium text-muted-foreground">
                Pergunta {currentQuestionIndex + 1} de {totalQuestions}
              </span>
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
                animate={{ width: `${(timeLeft / TIMER_SECONDS) * 100}%` }}
                transition={{ duration: 0.5, ease: 'linear' }}
              />
            </div>

            {/* Question */}
            <div className="relative p-4 sm:p-5 rounded-xl bg-gradient-to-br from-primary/10 to-blue-500/5 border border-primary/20 mb-4 sm:mb-6">
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
                      ? 'border-primary bg-primary/15 shadow-lg shadow-primary/20'
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
                          ? 'bg-gradient-to-br from-primary to-blue-500 text-white shadow-md shadow-primary/30'
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
                className="flex-1 h-10 sm:h-11 text-sm bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90 shadow-lg shadow-primary/30 disabled:opacity-50 disabled:shadow-none"
              >
                Confirmar
              </Button>
            </div>
          </motion.div>
        ) : (
          /* No Questions Available */
          <div className="text-center py-12 sm:py-16">
            <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-muted/20 flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Trophy className="w-8 sm:w-10 h-8 sm:h-10 text-muted-foreground" />
            </div>
            <p className="text-base sm:text-lg text-muted-foreground mb-4 sm:mb-6">
              Nenhuma pergunta disponível
            </p>
            <Button onClick={() => navigate('/biblia')} className="text-sm sm:text-base">
              Voltar para Leitura
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Quiz;
