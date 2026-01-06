import { motion } from "framer-motion";
import { Crown, Star, Flame } from "lucide-react";

interface PointsDisplayProps {
  totalPoints: number;
  activeDays: number;
  rank: number;
  size?: "sm" | "md" | "lg";
}

export const PointsDisplay = ({
  totalPoints,
  activeDays,
  rank,
  size = "md",
}: PointsDisplayProps) => {
  const isFirst = rank === 1;
  
  const sizeClasses = {
    sm: {
      container: "gap-2",
      badge: "px-2 py-1 text-xs",
      icon: "w-3 h-3",
      crown: "w-4 h-4",
    },
    md: {
      container: "gap-3",
      badge: "px-3 py-1.5 text-sm",
      icon: "w-4 h-4",
      crown: "w-5 h-5",
    },
    lg: {
      container: "gap-4",
      badge: "px-4 py-2 text-base",
      icon: "w-5 h-5",
      crown: "w-6 h-6",
    },
  };

  const classes = sizeClasses[size];

  return (
    <div className={`flex items-center ${classes.container}`}>
      {/* Active Days / Progress */}
      <div className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/30">
        <Flame className={`${classes.icon} text-orange-500`} />
        <span className="font-bold text-sm text-orange-400">{activeDays} dias</span>
      </div>

      {/* Points */}
      <div className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/30">
        <Star className={`${classes.icon} text-yellow-500`} />
        <span className="font-bold text-sm text-yellow-400">{totalPoints} pts</span>
      </div>

      {/* Rank */}
      <motion.div
        className={`flex items-center gap-1.5 px-3 py-2 rounded-full ${
          isFirst
            ? 'bg-gradient-to-r from-yellow-400/30 to-amber-400/30 border border-yellow-400/50 shadow-[0_0_15px_rgba(250,204,21,0.4)]'
            : 'bg-gradient-to-r from-blue-500/30 to-cyan-400/30 border border-cyan-400/50 shadow-[0_0_15px_rgba(34,211,238,0.4)]'
        }`}
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {isFirst && (
          <Crown className={`${classes.crown} text-yellow-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.8)]`} />
        )}
        <span className={`font-bold text-sm ${isFirst ? 'text-yellow-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.8)]' : 'text-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.8)]'}`}>
          #{rank}
        </span>
      </motion.div>
    </div>
  );
};
