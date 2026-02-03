import { motion } from "framer-motion";
import { BookOpen, Shuffle, Calendar, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export type QuizMode = "plan" | "free" | null;

interface QuizModeSelectorProps {
  onSelectMode: (mode: QuizMode) => void;
  hasQuestionsFromPlan: boolean;
  chaptersReadToday: number;
}

export const QuizModeSelector = ({
  onSelectMode,
  hasQuestionsFromPlan,
  chaptersReadToday,
}: QuizModeSelectorProps) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 shadow-2xl shadow-amber-500/40 mb-4"
        >
          <Sparkles className="w-10 h-10 text-white" />
        </motion.div>
        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 bg-clip-text text-transparent">
          Quiz Bíblico
        </h1>
        <p className="text-muted-foreground mt-2">
          Escolha como você quer jogar!
        </p>
      </div>

      {/* Mode Cards */}
      <div className="grid gap-4">
        {/* Plan Mode */}
        <motion.button
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          onClick={() => onSelectMode("plan")}
          disabled={!hasQuestionsFromPlan && chaptersReadToday === 0}
          className={`relative overflow-hidden rounded-2xl border-2 p-5 text-left transition-all group ${
            hasQuestionsFromPlan
              ? "border-amber-500/50 bg-gradient-to-br from-amber-500/10 to-amber-600/5 hover:border-amber-400 hover:shadow-lg hover:shadow-amber-500/20"
              : chaptersReadToday === 0
              ? "border-muted/30 bg-muted/5 opacity-60 cursor-not-allowed"
              : "border-green-500/50 bg-gradient-to-br from-green-500/10 to-green-600/5"
          }`}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-[50px] group-hover:bg-amber-500/20 transition-colors" />
          
          <div className="relative z-10 flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/30 flex-shrink-0">
              <Calendar className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
                Plano de Leitura
                {hasQuestionsFromPlan && (
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-xs font-medium">
                    {chaptersReadToday * 2} perguntas
                  </span>
                )}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {chaptersReadToday === 0
                  ? "Leia capítulos hoje para desbloquear"
                  : hasQuestionsFromPlan
                  ? `Quiz sobre os ${chaptersReadToday} capítulos lidos hoje`
                  : "Você já completou o quiz de hoje! ✓"}
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-amber-400 transition-colors flex-shrink-0 mt-2" />
          </div>
        </motion.button>

        {/* Free Mode */}
        <motion.button
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          onClick={() => onSelectMode("free")}
          className="relative overflow-hidden rounded-2xl border-2 border-purple-500/50 bg-gradient-to-br from-purple-500/10 to-purple-600/5 p-5 text-left transition-all hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/20 group"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-[50px] group-hover:bg-purple-500/20 transition-colors" />
          
          <div className="relative z-10 flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/30 flex-shrink-0">
              <Shuffle className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
                Escolha Livre
                <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400 text-xs font-medium">
                  Novo!
                </span>
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Selecione qualquer livro e capítulo da Bíblia
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-purple-400 transition-colors flex-shrink-0 mt-2" />
          </div>
        </motion.button>
      </div>

      {/* Info */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex items-center gap-3 p-4 rounded-xl bg-muted/20 border border-border/50"
      >
        <BookOpen className="w-5 h-5 text-primary flex-shrink-0" />
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">+1 ponto</strong> por resposta correta. 
          30 segundos por pergunta!
        </p>
      </motion.div>
    </div>
  );
};
