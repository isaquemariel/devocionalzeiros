import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, XCircle, Trophy, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  onSubmitAnswer: (answer: 'A' | 'B' | 'C') => void;
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

  const handleSelectAnswer = (answer: 'A' | 'B' | 'C') => {
    if (answered) return;
    setSelectedAnswer(answer);
  };

  const handleConfirmAnswer = () => {
    if (!selectedAnswer || answered) return;
    setAnswered(true);
    onSubmitAnswer(selectedAnswer);
    
    // Reset for next question after short delay
    setTimeout(() => {
      setSelectedAnswer(null);
      setAnswered(false);
    }, 1500);
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
                {/* Progress */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-muted-foreground">
                    Pergunta {currentQuestionIndex + 1} de {totalQuestions}
                  </span>
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
                        selectedAnswer === option
                          ? answered
                            ? option === currentQuestion.correct_answer
                              ? 'border-green-500 bg-green-500/10'
                              : 'border-red-500 bg-red-500/10'
                            : 'border-primary bg-primary/10'
                          : answered && option === currentQuestion.correct_answer
                          ? 'border-green-500 bg-green-500/10'
                          : 'border-border/50 hover:border-primary/50 hover:bg-muted/20'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                            selectedAnswer === option
                              ? answered
                                ? option === currentQuestion.correct_answer
                                  ? 'bg-green-500 text-white'
                                  : 'bg-red-500 text-white'
                                : 'bg-primary text-primary-foreground'
                              : answered && option === currentQuestion.correct_answer
                              ? 'bg-green-500 text-white'
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
