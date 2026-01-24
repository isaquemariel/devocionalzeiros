import { motion } from "framer-motion";
import { Lock, CheckCircle2, Gift } from "lucide-react";
import React from "react";

interface AchievementCardProps {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  unlocked: boolean;
  claimed?: boolean;
  progress?: number;
  maxProgress?: number;
  rarity: "comum" | "raro" | "epico" | "lendario";
  unlockedAt?: string;
  points?: number;
}

const rarityConfig = {
  comum: {
    gradient: "from-slate-400 to-slate-500",
    glow: "shadow-slate-500/20",
    border: "border-slate-500/30",
    bg: "bg-slate-500/10",
    label: "Comum",
    labelColor: "text-slate-400",
    pointsBg: "bg-slate-500/20",
  },
  raro: {
    gradient: "from-blue-400 to-blue-600",
    glow: "shadow-blue-500/30",
    border: "border-blue-500/30",
    bg: "bg-blue-500/10",
    label: "Raro",
    labelColor: "text-blue-400",
    pointsBg: "bg-blue-500/20",
  },
  epico: {
    gradient: "from-amber-400 to-amber-600",
    glow: "shadow-amber-500/30",
    border: "border-amber-500/30",
    bg: "bg-amber-500/10",
    label: "Épico",
    labelColor: "text-amber-400",
    pointsBg: "bg-amber-500/20",
  },
  lendario: {
    gradient: "from-amber-400 to-orange-500",
    glow: "shadow-amber-500/40",
    border: "border-amber-500/30",
    bg: "bg-amber-500/10",
    label: "Lendário",
    labelColor: "text-amber-400",
    pointsBg: "bg-amber-500/20",
  },
};

const AchievementCard = ({
  id,
  title,
  description,
  icon: Icon,
  unlocked,
  claimed = false,
  progress,
  maxProgress,
  rarity,
  unlockedAt,
  points = 0,
}: AchievementCardProps) => {
  const config = rarityConfig[rarity];
  const hasProgress = progress !== undefined && maxProgress !== undefined;
  const progressPercent = hasProgress ? (progress / maxProgress) * 100 : 0;
  const showProgress = !unlocked && hasProgress;

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
      {/* Status Indicators */}
      <div className="absolute top-3 right-3 flex items-center gap-2">
        {/* Points Badge */}
        {points > 0 && (
          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${config.pointsBg} ${config.labelColor}`}>
            +{points} pts
          </span>
        )}
        
        {/* Claimed Badge */}
        {unlocked && claimed && (
          <CheckCircle2 className="w-4 h-4 text-accent" />
        )}
        
        {/* Claimable Indicator */}
        {unlocked && !claimed && (
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Gift className="w-4 h-4 text-amber-400" />
          </motion.div>
        )}
      </div>

      <div className="flex items-start gap-4">
        {/* Icon Container */}
        <div className={`relative w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${
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
          <div className="flex items-center gap-2 mb-1">
            <h3 className={`font-semibold ${
              unlocked ? "text-foreground" : "text-muted-foreground/60"
            }`}>
              {title}
            </h3>
          </div>
          <p className={`text-sm leading-relaxed ${
            unlocked ? "text-muted-foreground" : "text-muted-foreground/40"
          }`}>
            {description}
          </p>

          {/* Progress Bar */}
          {showProgress && (
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

          {/* Rarity Label & Unlocked date */}
          <div className="flex items-center gap-2 mt-2">
            <span className={`text-[10px] font-semibold uppercase tracking-wider ${
              unlocked ? config.labelColor : "text-muted-foreground/50"
            }`}>
              {config.label}
            </span>
            {unlocked && unlockedAt && (
              <span className="text-[10px] text-muted-foreground/50">
                • {unlockedAt}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AchievementCard;
