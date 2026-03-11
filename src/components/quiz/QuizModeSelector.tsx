import { motion } from "framer-motion";
import { BookOpen, Shuffle, Calendar, ArrowRight, Dices, Lock } from "lucide-react";

export type QuizMode = "plan" | "free" | "random" | null;

interface QuizModeSelectorProps {
  onSelectMode: (mode: QuizMode) => void;
  hasQuestionsFromPlan: boolean;
  chaptersReadToday: number;
  isPremium?: boolean;
}

export const QuizModeSelector = ({
  onSelectMode,
  hasQuestionsFromPlan,
  chaptersReadToday,
  isPremium = false,
}: QuizModeSelectorProps) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 bg-clip-text text-transparent"
        >
          Quiz Bíblico
        </motion.h1>
        <p className="text-muted-foreground mt-3">
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
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Selecione qualquer livro e capítulo da Bíblia
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-purple-400 transition-colors flex-shrink-0 mt-2" />
          </div>
        </motion.button>

        {/* Random Mode */}
        <motion.button
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          onClick={() => onSelectMode("random")}
          className={`relative overflow-hidden rounded-2xl border-2 p-5 text-left transition-all group ${
            isPremium
              ? "border-emerald-500/50 bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-500/20"
              : "border-purple-500/30 bg-gradient-to-br from-purple-500/5 to-purple-600/5 hover:border-purple-400/50 hover:shadow-lg hover:shadow-purple-500/10"
          }`}
        >
          <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-[50px] transition-colors ${isPremium ? "bg-emerald-500/10 group-hover:bg-emerald-500/20" : "bg-purple-500/5 group-hover:bg-purple-500/10"}`} />
          
          <div className="relative z-10 flex items-start gap-4">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0 ${
              isPremium
                ? "bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-emerald-500/30"
                : "bg-gradient-to-br from-purple-500/30 to-purple-600/20 shadow-purple-500/20 border border-purple-500/20"
            }`}>
              {isPremium ? (
                <Dices className="w-7 h-7 text-white" />
              ) : (
                <Lock className="w-7 h-7 text-purple-400" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className={`font-bold text-lg flex items-center gap-2 ${isPremium ? "text-foreground" : "text-muted-foreground"}`}>
                Modo Aleatório
                {isPremium ? (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-medium">
                    5 perguntas
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400 text-xs font-semibold">
                    PREMIUM
                  </span>
                )}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {isPremium ? "Capítulos surpresa de toda a Bíblia!" : "Disponível apenas no plano Premium"}
              </p>
            </div>
            {isPremium
              ? <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-emerald-400 transition-colors flex-shrink-0 mt-2" />
              : <Lock className="w-4 h-4 text-purple-400/60 flex-shrink-0 mt-2.5" />
            }
          </div>
        </motion.button>
      </div>

      {/* Info */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex items-center gap-3 p-4 rounded-xl bg-muted/20 border border-border/50"
      >
        <BookOpen className="w-5 h-5 text-primary flex-shrink-0" />
        <p className="text-sm text-muted-foreground">
          Pontos variam por dificuldade: <strong className="text-green-400">Fácil +1</strong> • <strong className="text-amber-400">Médio +2</strong> • <strong className="text-red-400">Difícil +3</strong>
        </p>
      </motion.div>
    </div>
  );
};
