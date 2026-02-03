import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, XCircle, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WrongAnswer {
  bookName: string;
  chapterNumber: number;
  question: string;
  options: { A: string; B: string; C: string };
  userAnswer: 'A' | 'B' | 'C' | null;
  correctAnswer: 'A' | 'B' | 'C';
}

interface QuizGabaritoModalProps {
  isOpen: boolean;
  onClose: () => void;
  wrongAnswers: WrongAnswer[];
  themeColor: "amber" | "purple" | "emerald";
}

const themeClasses = {
  amber: {
    bg: "bg-gradient-to-br from-amber-500/10 to-amber-600/5",
    border: "border-amber-500/30",
    text: "text-amber-400",
    badge: "bg-amber-500/20 text-amber-400",
  },
  purple: {
    bg: "bg-gradient-to-br from-purple-500/10 to-purple-600/5",
    border: "border-purple-500/30",
    text: "text-purple-400",
    badge: "bg-purple-500/20 text-purple-400",
  },
  emerald: {
    bg: "bg-gradient-to-br from-emerald-500/10 to-emerald-600/5",
    border: "border-emerald-500/30",
    text: "text-emerald-400",
    badge: "bg-emerald-500/20 text-emerald-400",
  },
};

export const QuizGabaritoModal = ({
  isOpen,
  onClose,
  wrongAnswers,
  themeColor,
}: QuizGabaritoModalProps) => {
  const theme = themeClasses[themeColor];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          className={`relative w-full max-w-lg max-h-[85vh] overflow-hidden rounded-2xl border ${theme.border} bg-background shadow-2xl`}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          {/* Header */}
          <div className={`flex items-center justify-between p-4 border-b ${theme.border} ${theme.bg}`}>
            <div className="flex items-center gap-2">
              <BookOpen className={`w-5 h-5 ${theme.text}`} />
              <h2 className="text-lg font-bold">Gabarito dos Erros</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[60vh] p-4 space-y-4">
            {wrongAnswers.length === 0 ? (
              <div className="text-center py-8">
                <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto mb-3" />
                <p className="text-muted-foreground">
                  Parabéns! Você não errou nenhuma pergunta! 🎉
                </p>
              </div>
            ) : (
              wrongAnswers.map((item, index) => (
                <motion.div
                  key={index}
                  className={`p-4 rounded-xl border ${theme.border} ${theme.bg}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Chapter Badge */}
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium mb-3 ${theme.badge}`}>
                    <BookOpen className="w-3 h-3" />
                    {item.bookName} {item.chapterNumber}
                  </div>

                  {/* Question */}
                  <p className="text-sm font-medium text-white/90 mb-3">
                    {item.question}
                  </p>

                  {/* Answers */}
                  <div className="space-y-2">
                    {(['A', 'B', 'C'] as const).map((option) => {
                      const isUserAnswer = item.userAnswer === option;
                      const isCorrect = item.correctAnswer === option;
                      
                      return (
                        <div
                          key={option}
                          className={`flex items-center gap-2 p-2.5 rounded-lg text-sm ${
                            isCorrect
                              ? 'bg-green-500/15 border border-green-500/30'
                              : isUserAnswer
                              ? 'bg-red-500/15 border border-red-500/30'
                              : 'bg-muted/10 border border-transparent'
                          }`}
                        >
                          <span className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold ${
                            isCorrect
                              ? 'bg-green-500 text-white'
                              : isUserAnswer
                              ? 'bg-red-500 text-white'
                              : 'bg-muted/30 text-muted-foreground'
                          }`}>
                            {option}
                          </span>
                          <span className={`flex-1 ${
                            isCorrect ? 'text-green-400' : isUserAnswer ? 'text-red-400' : 'text-muted-foreground'
                          }`}>
                            {item.options[option]}
                          </span>
                          {isCorrect && (
                            <CheckCircle2 className="w-4 h-4 text-green-400" />
                          )}
                          {isUserAnswer && !isCorrect && (
                            <XCircle className="w-4 h-4 text-red-400" />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Your Answer Label */}
                  {item.userAnswer ? (
                    <p className="text-xs text-muted-foreground mt-2">
                      Sua resposta: <span className="text-red-400 font-medium">{item.userAnswer}</span> • 
                      Correta: <span className="text-green-400 font-medium">{item.correctAnswer}</span>
                    </p>
                  ) : (
                    <p className="text-xs text-muted-foreground mt-2">
                      Tempo esgotado • Correta: <span className="text-green-400 font-medium">{item.correctAnswer}</span>
                    </p>
                  )}
                </motion.div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-border/30">
            <Button
              onClick={onClose}
              className="w-full"
              variant="outline"
            >
              Fechar
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
