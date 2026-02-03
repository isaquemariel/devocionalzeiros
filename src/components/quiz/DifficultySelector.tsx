import { motion } from "framer-motion";
import { Zap, Brain, Trophy, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export type Difficulty = "easy" | "medium" | "hard";

interface DifficultySelectorProps {
  onSelectDifficulty: (difficulty: Difficulty) => void;
  onBack: () => void;
  modeName: string;
  modeColor: "amber" | "purple" | "emerald";
}

const difficultyConfig = {
  easy: {
    icon: Zap,
    label: "Fácil",
    description: "Perguntas básicas sobre o texto",
    points: 1,
    color: "green",
    gradient: "from-green-400 to-green-600",
    bgGradient: "from-green-500/10 to-green-600/5",
    border: "border-green-500/50",
    hoverBorder: "hover:border-green-400",
    shadow: "shadow-green-500/30",
    textColor: "text-green-400",
    badge: "bg-green-500/20 text-green-400",
  },
  medium: {
    icon: Brain,
    label: "Médio",
    description: "Requer conhecimento mais detalhado",
    points: 2,
    color: "amber",
    gradient: "from-amber-400 to-amber-600",
    bgGradient: "from-amber-500/10 to-amber-600/5",
    border: "border-amber-500/50",
    hoverBorder: "hover:border-amber-400",
    shadow: "shadow-amber-500/30",
    textColor: "text-amber-400",
    badge: "bg-amber-500/20 text-amber-400",
  },
  hard: {
    icon: Trophy,
    label: "Difícil",
    description: "Para verdadeiros estudiosos da Bíblia",
    points: 3,
    color: "red",
    gradient: "from-red-400 to-red-600",
    bgGradient: "from-red-500/10 to-red-600/5",
    border: "border-red-500/50",
    hoverBorder: "hover:border-red-400",
    shadow: "shadow-red-500/30",
    textColor: "text-red-400",
    badge: "bg-red-500/20 text-red-400",
  },
};

export const DifficultySelector = ({
  onSelectDifficulty,
  onBack,
  modeName,
  modeColor,
}: DifficultySelectorProps) => {
  const modeColors = {
    amber: "from-amber-400 to-amber-600",
    purple: "from-purple-400 to-purple-600",
    emerald: "from-emerald-400 to-emerald-600",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent"
        >
          {modeName}
        </motion.h1>
        <p className="text-muted-foreground mt-3">
          Escolha o nível de dificuldade
        </p>
      </div>

      {/* Difficulty Cards */}
      <div className="grid gap-4">
        {(["easy", "medium", "hard"] as const).map((difficulty, index) => {
          const config = difficultyConfig[difficulty];
          const Icon = config.icon;

          return (
            <motion.button
              key={difficulty}
              initial={{ x: index % 2 === 0 ? -20 : 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 * (index + 1) }}
              onClick={() => onSelectDifficulty(difficulty)}
              className={`relative overflow-hidden rounded-2xl border-2 ${config.border} bg-gradient-to-br ${config.bgGradient} p-5 text-left transition-all ${config.hoverBorder} hover:shadow-lg group`}
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-${config.color}-500/10 rounded-full blur-[50px] group-hover:bg-${config.color}-500/20 transition-colors`} />

              <div className="relative z-10 flex items-start gap-4">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${config.gradient} flex items-center justify-center shadow-lg ${config.shadow} flex-shrink-0`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
                    {config.label}
                    <span className={`px-2 py-0.5 rounded-full ${config.badge} text-xs font-medium`}>
                      +{config.points} {config.points === 1 ? "ponto" : "pontos"}/acerto
                    </span>
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {config.description}
                  </p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Back Button */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Button
          variant="outline"
          onClick={onBack}
          className="w-full h-12 border-border/50 hover:bg-white/5"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
      </motion.div>
    </div>
  );
};
