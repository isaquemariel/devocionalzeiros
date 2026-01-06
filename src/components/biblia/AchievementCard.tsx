import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface AchievementCardProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
  rarity: "comum" | "raro" | "epico" | "lendario";
  unlockedAt?: string;
}

const rarityConfig = {
  comum: {
    gradient: "from-slate-400 to-slate-500",
    glow: "shadow-slate-500/20",
    border: "border-slate-500/30",
    bg: "bg-slate-500/10",
    label: "Comum",
    labelColor: "text-slate-400",
  },
  raro: {
    gradient: "from-blue-400 to-blue-600",
    glow: "shadow-blue-500/30",
    border: "border-blue-500/30",
    bg: "bg-blue-500/10",
    label: "Raro",
    labelColor: "text-blue-400",
  },
  epico: {
    gradient: "from-amber-400 to-amber-600",
    glow: "shadow-amber-500/30",
    border: "border-amber-500/30",
    bg: "bg-amber-500/10",
    label: "Épico",
    labelColor: "text-amber-400",
  },
  lendario: {
    gradient: "from-amber-400 to-orange-500",
    glow: "shadow-amber-500/40",
    border: "border-amber-500/30",
    bg: "bg-amber-500/10",
    label: "Lendário",
    labelColor: "text-amber-400",
  },
};

const AchievementCard = ({
  title,
  description,
  icon: Icon,
  unlocked,
  progress,
  maxProgress,
  rarity,
  unlockedAt,
}: AchievementCardProps) => {
  const config = rarityConfig[rarity];
  const hasProgress = progress !== undefined && maxProgress !== undefined;
  const progressPercent = hasProgress ? (progress / maxProgress) * 100 : 0;

  return (
    <motion.div
      className={`relative p-5 rounded-2xl border transition-all ${
        unlocked
          ? `${config.bg} ${config.border} shadow-lg ${config.glow}`
          : "bg-muted/5 border-border/30"
      }`}
      whileHover={{ scale: unlocked ? 1.02 : 1.01 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Rarity Badge */}
      <div className="absolute top-3 right-3">
        <span className={`text-[10px] font-semibold uppercase tracking-wider ${
          unlocked ? config.labelColor : "text-muted-foreground/50"
        }`}>
          {config.label}
        </span>
      </div>

      <div className="flex items-start gap-4">
        {/* Icon Container */}
        <div className={`relative w-14 h-14 rounded-xl flex items-center justify-center ${
          unlocked 
            ? `bg-gradient-to-br ${config.gradient}` 
            : "bg-muted/20"
        }`}>
          {unlocked ? (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Icon className="w-7 h-7 text-white" />
            </motion.div>
          ) : (
            <Lock className="w-6 h-6 text-muted-foreground/40" />
          )}
          
          {/* Glow effect for unlocked */}
          {unlocked && (
            <motion.div
              className={`absolute inset-0 rounded-xl bg-gradient-to-br ${config.gradient} blur-lg opacity-40`}
              animate={{ 
                opacity: [0.3, 0.5, 0.3],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className={`font-semibold mb-1 ${
            unlocked ? "text-foreground" : "text-muted-foreground/60"
          }`}>
            {title}
          </h3>
          <p className={`text-sm leading-relaxed ${
            unlocked ? "text-muted-foreground" : "text-muted-foreground/40"
          }`}>
            {description}
          </p>

          {/* Progress Bar */}
          {hasProgress && !unlocked && (
            <div className="mt-3">
              <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                <span>{progress} / {maxProgress}</span>
                <span>{Math.round(progressPercent)}%</span>
              </div>
              <div className="h-1.5 bg-muted/20 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full bg-gradient-to-r ${config.gradient}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
            </div>
          )}

          {/* Unlocked date */}
          {unlocked && unlockedAt && (
            <p className="text-xs text-muted-foreground/60 mt-2">
              Desbloqueado em {unlockedAt}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AchievementCard;
