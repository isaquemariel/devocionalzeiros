import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, XCircle, Trophy, Loader2, Clock, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import mascotHappy from "@/assets/mascot-happy.png";
import mascotSad from "@/assets/mascot-sad.png";
import mascotChampion from "@/assets/mascot-champion.png";

const TIMER_SECONDS = 30;

interface QuizQuestion {
  question: string;
  options: { A: string; B: string; C: string };
  correct_answer: 'A' | 'B' | 'C';
  bookName: string;
  chapterNumber: number;
  questionIndex: number;
}

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentQuestion: QuizQuestion | undefined;
  currentQuestionIndex: number;
  totalQuestions: number;
  onSubmitAnswer: (answer: 'A' | 'B' | 'C' | null) => void;
  results: { correct: number; total: number } | null;
  quizCompleted: boolean;
  loading: boolean;
  onEndQuiz: () => void;
}

export const QuizModal = ({
  isOpen,
  onClose,
  currentQuestion,
  currentQuestionIndex,
  totalQuestions,
  onSubmitAnswer,
  results,
  quizCompleted,
  loading,
  onEndQuiz,
}: QuizModalProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<'A' | 'B' | 'C' | null>(null);
  const [answered, setAnswered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const hasTimedOut = useRef(false);

  // Reset timer when question changes
  useEffect(() => {
    if (currentQuestion && !loading && !quizCompleted && !isTransitioning) {
      setTimeLeft(TIMER_SECONDS);
      hasTimedOut.current = false;
    }
  }, [currentQuestionIndex, currentQuestion, loading, quizCompleted, isTransitioning]);

  // Timer countdown
  useEffect(() => {
    if (!currentQuestion || loading || quizCompleted || answered || isTransitioning) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [currentQuestion, loading, quizCompleted, answered, isTransitioning]);

  // Handle timeout - move to next question
  useEffect(() => {
    if (timeLeft === 0 && !answered && !isTransitioning && !hasTimedOut.current && currentQuestion) {
      hasTimedOut.current = true;
      setIsTransitioning(true);
      
      // Small delay then move to next
      setTimeout(() => {
        setSelectedAnswer(null);
        setIsTransitioning(false);
        onSubmitAnswer(null); // null indicates timeout/no answer
      }, 500);
    }
  }, [timeLeft, answered, isTransitioning, currentQuestion, onSubmitAnswer]);

  const handleSelectAnswer = (answer: 'A' | 'B' | 'C') => {
    if (answered || isTransitioning || timeLeft === 0) return;
    setSelectedAnswer(answer);
  };

  const handleConfirmAnswer = useCallback(() => {
    if (!selectedAnswer || answered || isTransitioning) return;
    setAnswered(true);
    
    // Stop timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    // Show result for 1.5s then reset BEFORE calling submit
    setTimeout(() => {
      setIsTransitioning(true);
      const answerToSubmit = selectedAnswer;
      setSelectedAnswer(null);
      setAnswered(false);
      
      // Small delay to ensure state is clean before next question renders
      setTimeout(() => {
        setIsTransitioning(false);
        onSubmitAnswer(answerToSubmit);
      }, 100);
    }, 1500);
  }, [selectedAnswer, answered, isTransitioning, onSubmitAnswer]);

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

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="w-full max-w-lg bg-gradient-to-b from-[hsl(220,30%,8%)] to-[hsl(220,30%,4%)] rounded-2xl border border-primary/30 shadow-2xl shadow-primary/20 overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
        >
          {/* Header */}
          <div className="relative flex items-center justify-between p-4 border-b border-primary/20 bg-gradient-to-r from-primary/20 via-blue-500/15 to-amber-500/10">
            {/* Animated glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-amber-500/10 animate-pulse" />
            
            <div className="relative flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/30">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-lg bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  Quiz Bíblico
                </h2>
                {!quizCompleted && currentQuestion && (
                  <p className="text-xs text-primary/80 font-medium">
                    {currentQuestion.bookName} {currentQuestion.chapterNumber}
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="relative p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12 gap-4">
                <div className="relative">
                  <Loader2 className="w-10 h-10 animate-spin text-primary" />
                  <div className="absolute inset-0 animate-ping">
                    <Loader2 className="w-10 h-10 text-primary/30" />
                  </div>
                </div>
                <p className="text-muted-foreground">Carregando perguntas...</p>
              </div>
            ) : quizCompleted && results ? (
              /* Results Screen */
              <motion.div
                className="text-center py-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {(() => {
                  const moreCorrect = results.correct > results.total - results.correct;
                  const allCorrect = results.correct === results.total;
                  const allWrong = results.correct === 0;
                  const mascotImg = moreCorrect ? mascotChampion : mascotSad;
                  const title = allCorrect ? "Perfeito! 🏆" : moreCorrect ? "Muito bem!" : allWrong ? "Não desista!" : "Continue tentando!";
                  const subtitle = allCorrect 
                    ? "Você acertou todas!" 
                    : moreCorrect 
                    ? "Você está no caminho certo! 💪" 
                    : allWrong 
                    ? "Cada erro é uma chance de aprender. Tente novamente! 📖"
                    : "Não desanime! Revise e tente de novo! 🙏";
                  return (
                    <>
                      <motion.div 
                        className="relative w-28 h-28 mx-auto mb-6"
                        initial={{ scale: 0, rotate: -10 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", damping: 8, delay: 0.2 }}
                      >
                        <motion.img 
                          src={mascotImg} 
                          alt={title} 
                          className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(251,191,36,0.4)]"
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-amber-400 animate-pulse" />
                      </motion.div>
                      <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 bg-clip-text text-transparent">
                        {title}
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        {subtitle}
                      </p>
                    </>
                  );
                })()}
                
                <div className="flex justify-center gap-8 mb-8">
                  <div className="text-center p-4 rounded-xl bg-green-500/10 border border-green-500/30">
                    <div className="flex items-center justify-center gap-2 text-green-400 mb-1">
                      <CheckCircle2 className="w-6 h-6" />
                      <span className="text-3xl font-bold">{results.correct}</span>
                    </div>
                    <p className="text-xs text-green-400/80">Acertos</p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-red-500/10 border border-red-500/30">
                    <div className="flex items-center justify-center gap-2 text-red-400 mb-1">
                      <XCircle className="w-6 h-6" />
                      <span className="text-3xl font-bold">{results.total - results.correct}</span>
                    </div>
                    <p className="text-xs text-red-400/80">Erros</p>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary/20 to-blue-500/20 border border-primary/40 mb-6">
                  <Zap className="w-5 h-5 text-primary" />
                  <span className="text-lg font-bold text-primary">
                    +{results.correct} pontos ganhos!
                  </span>
                </div>

                <Button 
                  onClick={onClose} 
                  className="w-full bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90 shadow-lg shadow-primary/30"
                >
                  Fechar
                </Button>
              </motion.div>
            ) : currentQuestion ? (
              /* Question Screen */
              <div>
                {/* Progress and Timer */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-muted-foreground">
                    Pergunta {currentQuestionIndex + 1} de {totalQuestions}
                  </span>
                  <div className="flex items-center gap-3">
                    {/* Timer */}
                    <div className={`flex items-center gap-1.5 font-bold ${getTimerColor()} ${timeLeft <= 10 ? 'animate-pulse' : ''}`}>
                      <Clock className="w-4 h-4" />
                      <span className="tabular-nums text-lg">{timeLeft}s</span>
                    </div>
                    <div className="flex gap-1.5">
                      {Array.from({ length: totalQuestions }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-2.5 h-2.5 rounded-full transition-all ${
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
                <div className="w-full h-2 bg-muted/30 rounded-full mb-6 overflow-hidden">
                  <motion.div
                    className={`h-full ${getTimerBgColor()} rounded-full`}
                    initial={{ width: '100%' }}
                    animate={{ width: `${(timeLeft / TIMER_SECONDS) * 100}%` }}
                    transition={{ duration: 0.5, ease: 'linear' }}
                  />
                </div>

                {/* Question */}
                <div className="relative p-4 rounded-xl bg-gradient-to-br from-primary/10 to-blue-500/5 border border-primary/20 mb-6">
                  <p className="text-lg font-medium leading-relaxed text-white/95">
                    {currentQuestion.question}
                  </p>
                </div>

                {/* Options */}
                <div className="space-y-3 mb-6">
                  {(['A', 'B', 'C'] as const).map((option) => (
                    <motion.button
                      key={option}
                      onClick={() => handleSelectAnswer(option)}
                      disabled={answered}
                      whileHover={!answered ? { scale: 1.01 } : {}}
                      whileTap={!answered ? { scale: 0.99 } : {}}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                        answered
                          ? selectedAnswer === option
                            ? option === currentQuestion.correct_answer
                              ? 'border-green-500 bg-green-500/15 shadow-lg shadow-green-500/20'
                              : 'border-red-500 bg-red-500/15 shadow-lg shadow-red-500/20'
                            : 'border-border/30 opacity-50'
                          : selectedAnswer === option
                          ? 'border-primary bg-primary/15 shadow-lg shadow-primary/20'
                          : 'border-border/30 hover:border-primary/50 hover:bg-primary/5'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm transition-all ${
                            answered
                              ? selectedAnswer === option
                                ? option === currentQuestion.correct_answer
                                  ? 'bg-gradient-to-br from-green-400 to-green-600 text-white shadow-md shadow-green-500/30'
                                  : 'bg-gradient-to-br from-red-400 to-red-600 text-white shadow-md shadow-red-500/30'
                                : 'bg-muted/50 text-muted-foreground'
                              : selectedAnswer === option
                              ? 'bg-gradient-to-br from-primary to-blue-500 text-white shadow-md shadow-primary/30'
                              : 'bg-muted/50 text-muted-foreground'
                          }`}
                        >
                          {option}
                        </div>
                        <span className="flex-1 text-white/90">
                          {currentQuestion.options[option]}
                        </span>
                        {answered && selectedAnswer === option && (
                          <motion.img 
                            src={option === currentQuestion.correct_answer ? mascotHappy : mascotSad} 
                            alt={option === currentQuestion.correct_answer ? "Acertou!" : "Errou!"} 
                            className="w-10 h-10 object-contain"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", damping: 8 }}
                          />
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={onEndQuiz}
                    className="flex-1 border-border/50 hover:bg-white/5"
                  >
                    Encerrar Quiz
                  </Button>
                  <Button
                    onClick={handleConfirmAnswer}
                    disabled={!selectedAnswer || answered}
                    className="flex-1 bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90 shadow-lg shadow-primary/30 disabled:opacity-50 disabled:shadow-none"
                  >
                    Confirmar
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-muted/20 flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">
                  Nenhuma pergunta disponível
                </p>
                <Button onClick={onClose} className="mt-4">
                  Fechar
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
