import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import RPGMascotCanvas from "@/components/rpg/RPGMascotCanvas";
import type { MascotMood, MascotLook } from "@/lib/rpgMascot";

interface QuizQuestion {
  question: string;
  options: string[];
  correct_answer: string;
}

interface RPGQuizPhaseProps {
  look?: Partial<MascotLook>;
  questions: QuizQuestion[];
  currentQ: number;
  selectedAnswer: string | null;
  isAnswered: boolean;
  isLoading: boolean;
  correctCount: number;
  timer: number;
  onSelectAnswer: (answer: string) => void;
  onConfirmAnswer: () => void;
}

const RPGQuizPhase = ({
  look,
  questions,
  currentQ,
  selectedAnswer,
  isAnswered,
  isLoading,
  correctCount,
  timer,
  onSelectAnswer,
  onConfirmAnswer,
}: RPGQuizPhaseProps) => {
  const getTimerColor = () => {
    if (timer > 20) return "text-green-400";
    if (timer > 10) return "text-amber-400";
    return "text-red-400";
  };

  const getTimerBg = () => {
    if (timer > 20) return "bg-green-500";
    if (timer > 10) return "bg-amber-500";
    return "bg-red-500";
  };

  const getMascotMood = (): MascotMood => {
    if (isLoading) return "happy";
    if (isAnswered) {
      const isCorrect = selectedAnswer === questions[currentQ]?.correct_answer;
      return isCorrect ? "happy" : "sad";
    }
    if (timer <= 10) return "sad";
    return "happy";
  };

  return (
    <motion.div
      key="quiz"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      className="h-full flex flex-col p-4"
    >
      {isLoading ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <motion.div animate={{ y: [-3, 3, -3] }} transition={{ duration: 2, repeat: Infinity }}>
            <RPGMascotCanvas look={look} mood="happy" size={120} />
          </motion.div>
          <Loader2 className="w-6 h-6 animate-spin text-amber-400" />
          <p className="text-white/50 text-sm">Preparando o quiz...</p>
        </div>
      ) : questions.length > 0 ? (
        <>
          {/* Header: Progress + Timer + Mascot */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1">
              <p className="text-xs text-white/40 mb-1">Pergunta {currentQ + 1} de {questions.length}</p>
              <Progress value={((currentQ + 1) / questions.length) * 100} className="h-1.5 bg-white/10 [&>div]:bg-amber-500" />
            </div>

            {/* Timer Circle */}
            <div className="relative">
              <svg className="w-14 h-14 -rotate-90" viewBox="0 0 56 56">
                <circle cx="28" cy="28" r="24" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
                <circle
                  cx="28" cy="28" r="24" fill="none"
                  stroke={timer > 20 ? "#22c55e" : timer > 10 ? "#f59e0b" : "#ef4444"}
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 24}
                  strokeDashoffset={2 * Math.PI * 24 * (1 - timer / 30)}
                  className="transition-all duration-1000"
                />
              </svg>
              <span className={`absolute inset-0 flex items-center justify-center text-sm font-black ${getTimerColor()}`}>
                {timer}
              </span>
            </div>

            {/* Mini mascot */}
            <motion.div
              className="w-14 h-14 flex items-center justify-center"
              animate={timer <= 10 && !isAnswered ? { rotate: [-5, 5, -5] } : {}}
              transition={{ duration: 0.3, repeat: Infinity }}
            >
              <RPGMascotCanvas look={look} mood={getMascotMood()} size={54} />
            </motion.div>
          </div>

          {/* Question */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQ}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1 flex flex-col"
            >
              <div className="rpg-dialogue p-4 mb-4">
                <p className="text-sm font-bold text-blue-50 leading-relaxed">{questions[currentQ].question}</p>
              </div>

              <div className="space-y-2.5 flex-1">
                {(questions[currentQ].options || []).map((opt, i) => {
                  const isCorrect = opt === questions[currentQ].correct_answer;
                  const isSelected = opt === selectedAnswer;
                  const letters = ["A", "B", "C", "D"];
                  const stateClass = isAnswered
                    ? isCorrect
                      ? "correct"
                      : isSelected
                        ? "wrong"
                        : ""
                    : isSelected
                      ? "sel"
                      : "";

                  return (
                    <motion.button
                      key={i}
                      onClick={() => onSelectAnswer(opt)}
                      disabled={isAnswered}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className={`rpg-opt w-full text-left p-3 flex items-center gap-3 ${stateClass}`}
                    >
                      <span className="k px-1.5 py-0.5 text-xs">{letters[i]}</span>
                      <span className="text-sm flex-1">{opt}</span>
                      {isAnswered && isCorrect && <span className="text-[#93d453]">✓</span>}
                      {isAnswered && isSelected && !isCorrect && <span className="text-[#e8846b]">✗</span>}
                    </motion.button>
                  );
                })}
              </div>

              {/* Mascot feedback */}
              {isAnswered && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center justify-center gap-2 py-2"
                >
                  <p className={`text-xs font-bold ${
                    selectedAnswer === questions[currentQ].correct_answer ? "text-[#93d453]" : "text-[#e8846b]"
                  }`}>
                    {selectedAnswer === questions[currentQ].correct_answer
                      ? "🎉 Correto! Mandou bem!"
                      : `❌ A resposta era: ${questions[currentQ].correct_answer}`
                    }
                  </p>
                </motion.div>
              )}

              <button
                onClick={onConfirmAnswer}
                disabled={!selectedAnswer || isAnswered}
                className="rpg-btn-green w-full py-3 mt-3"
              >
                {isAnswered ? "Próxima..." : "Confirmar Resposta"}
              </button>
            </motion.div>
          </AnimatePresence>
        </>
      ) : null}
    </motion.div>
  );
};

export default RPGQuizPhase;
