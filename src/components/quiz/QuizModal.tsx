import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, XCircle, Trophy, Loader2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    if (timeLeft <= 10) return 'text-yellow-500';
    return 'text-primary';
  };

  const getTimerBgColor = () => {
    if (timeLeft <= 5) return 'bg-red-500';
    if (timeLeft <= 10) return 'bg-yellow-500';
    return 'bg-primary';
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="w-full max-w-lg bg-card rounded-2xl border border-border/50 shadow-2xl overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border/30 bg-gradient-to-r from-primary/10 to-blue-500/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="font-bold text-lg">Quiz Bíblico</h2>
                {!quizCompleted && currentQuestion && (
                  <p className="text-xs text-muted-foreground">
                    {currentQuestion.bookName} {currentQuestion.chapterNumber}
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-muted/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12 gap-4">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <p className="text-muted-foreground">Carregando perguntas...</p>
              </div>
            ) : quizCompleted && results ? (
              /* Results Screen */
              <motion.div
                className="text-center py-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 mx-auto mb-6 flex items-center justify-center shadow-lg shadow-yellow-500/30">
                  <Trophy className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Parabéns!</h3>
                <p className="text-muted-foreground mb-6">
                  Você completou o quiz de hoje!
                </p>
                
                <div className="flex justify-center gap-8 mb-8">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 text-green-500 mb-1">
                      <CheckCircle2 className="w-5 h-5" />
                      <span className="text-2xl font-bold">{results.correct}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Acertos</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 text-red-500 mb-1">
                      <XCircle className="w-5 h-5" />
                      <span className="text-2xl font-bold">{results.total - results.correct}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Erros</p>
                  </div>
                </div>

                <p className="text-lg font-semibold text-primary mb-6">
                  +{results.correct} pontos ganhos!
                </p>

                <Button onClick={onClose} className="w-full">
                  Fechar
                </Button>
              </motion.div>
            ) : currentQuestion ? (
              /* Question Screen */
              <div>
                {/* Progress and Timer */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-muted-foreground">
                    Pergunta {currentQuestionIndex + 1} de {totalQuestions}
                  </span>
                  <div className="flex items-center gap-3">
                    {/* Timer */}
                    <div className={`flex items-center gap-1.5 font-bold ${getTimerColor()}`}>
                      <Clock className="w-4 h-4" />
                      <span className="tabular-nums">{timeLeft}s</span>
                    </div>
                    <div className="flex gap-1">
                      {Array.from({ length: totalQuestions }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            i < currentQuestionIndex
                              ? 'bg-green-500'
                              : i === currentQuestionIndex
                              ? 'bg-primary'
                              : 'bg-muted'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Timer Progress Bar */}
                <div className="w-full h-1.5 bg-muted rounded-full mb-4 overflow-hidden">
                  <motion.div
                    className={`h-full ${getTimerBgColor()} rounded-full`}
                    initial={{ width: '100%' }}
                    animate={{ width: `${(timeLeft / TIMER_SECONDS) * 100}%` }}
                    transition={{ duration: 0.5, ease: 'linear' }}
                  />
                </div>

                {/* Question */}
                <p className="text-lg font-medium mb-6 leading-relaxed">
                  {currentQuestion.question}
                </p>

                {/* Options */}
                <div className="space-y-3 mb-6">
                  {(['A', 'B', 'C'] as const).map((option) => (
                    <button
                      key={option}
                      onClick={() => handleSelectAnswer(option)}
                      disabled={answered}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                        answered
                          ? selectedAnswer === option
                            ? option === currentQuestion.correct_answer
                              ? 'border-green-500 bg-green-500/10'
                              : 'border-red-500 bg-red-500/10'
                            : option === currentQuestion.correct_answer
                            ? 'border-green-500 bg-green-500/10'
                            : 'border-border/50'
                          : selectedAnswer === option
                          ? 'border-primary bg-primary/10'
                          : 'border-border/50 hover:border-primary/50 hover:bg-muted/20'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                            answered
                              ? selectedAnswer === option
                                ? option === currentQuestion.correct_answer
                                  ? 'bg-green-500 text-white'
                                  : 'bg-red-500 text-white'
                                : option === currentQuestion.correct_answer
                                ? 'bg-green-500 text-white'
                                : 'bg-muted text-muted-foreground'
                              : selectedAnswer === option
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          {option}
                        </div>
                        <span className="flex-1">
                          {currentQuestion.options[option]}
                        </span>
                        {answered && option === currentQuestion.correct_answer && (
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                        )}
                        {answered && selectedAnswer === option && option !== currentQuestion.correct_answer && (
                          <XCircle className="w-5 h-5 text-red-500" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={onEndQuiz}
                    className="flex-1"
                  >
                    Encerrar Quiz
                  </Button>
                  <Button
                    onClick={handleConfirmAnswer}
                    disabled={!selectedAnswer || answered}
                    className="flex-1"
                  >
                    Confirmar
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Trophy className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
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
