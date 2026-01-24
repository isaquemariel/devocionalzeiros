import { motion, AnimatePresence } from "framer-motion";
import { Gift, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";

interface AchievementClaimModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClaim: () => void;
  achievement: {
    title: string;
    description: string;
    icon: React.ElementType;
    rarity: "comum" | "raro" | "epico" | "lendario";
    points: number;
  } | null;
  isClaiming: boolean;
}

const rarityConfig = {
  comum: {
    gradient: "from-slate-400 to-slate-500",
    glow: "shadow-slate-500/30",
    border: "border-slate-500/50",
    bg: "bg-slate-500/20",
    labelColor: "text-slate-300",
  },
  raro: {
    gradient: "from-blue-400 to-blue-600",
    glow: "shadow-blue-500/40",
    border: "border-blue-500/50",
    bg: "bg-blue-500/20",
    labelColor: "text-blue-300",
  },
  epico: {
    gradient: "from-amber-400 to-amber-600",
    glow: "shadow-amber-500/40",
    border: "border-amber-500/50",
    bg: "bg-amber-500/20",
    labelColor: "text-amber-300",
  },
  lendario: {
    gradient: "from-amber-400 to-orange-500",
    glow: "shadow-orange-500/50",
    border: "border-orange-500/50",
    bg: "bg-orange-500/20",
    labelColor: "text-orange-300",
  },
};

const AchievementClaimModal = ({
  isOpen,
  onClose,
  onClaim,
  achievement,
  isClaiming,
}: AchievementClaimModalProps) => {
  if (!achievement) return null;

  const config = rarityConfig[achievement.rarity];
  const Icon = achievement.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-sm"
          >
            <div className={`relative rounded-3xl border-2 ${config.border} ${config.bg} backdrop-blur-xl overflow-hidden shadow-2xl ${config.glow}`}>
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
              >
                <X className="w-4 h-4 text-white/70" />
              </button>

              {/* Sparkle decorations */}
              <motion.div
                className="absolute top-6 left-6"
                animate={{ rotate: 360, opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Sparkles className="w-5 h-5 text-yellow-300/60" />
              </motion.div>
              <motion.div
                className="absolute bottom-8 right-8"
                animate={{ rotate: -360, opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Sparkles className="w-4 h-4 text-yellow-300/40" />
              </motion.div>

              {/* Content */}
              <div className="p-6 pt-8 flex flex-col items-center text-center">
                {/* Icon */}
                <motion.div
                  className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${config.gradient} flex items-center justify-center mb-4 shadow-lg`}
                  animate={{ 
                    boxShadow: [
                      "0 0 20px rgba(251, 191, 36, 0.3)",
                      "0 0 40px rgba(251, 191, 36, 0.5)",
                      "0 0 20px rgba(251, 191, 36, 0.3)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Icon className="w-10 h-10 text-white" />
                </motion.div>

                {/* Title */}
                <motion.h2
                  className="text-xl font-bold text-white mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  🎉 Conquista Desbloqueada!
                </motion.h2>

                {/* Achievement name */}
                <motion.p
                  className={`text-lg font-semibold ${config.labelColor} mb-1`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {achievement.title}
                </motion.p>

                {/* Description */}
                <motion.p
                  className="text-sm text-white/60 mb-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {achievement.description}
                </motion.p>

                {/* Points badge */}
                <motion.div
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${config.bg} border ${config.border} mb-5`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, type: "spring" }}
                >
                  <Gift className="w-4 h-4 text-yellow-300" />
                  <span className="text-lg font-bold text-yellow-300">+{achievement.points} pontos</span>
                </motion.div>

                {/* Claim button */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="w-full"
                >
                  <Button
                    onClick={onClaim}
                    disabled={isClaiming}
                    className={`w-full bg-gradient-to-r ${config.gradient} hover:opacity-90 text-white font-semibold py-3 rounded-xl shadow-lg`}
                  >
                    {isClaiming ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Gift className="w-5 h-5" />
                      </motion.div>
                    ) : (
                      <>
                        <Gift className="w-5 h-5 mr-2" />
                        Resgatar Pontos
                      </>
                    )}
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AchievementClaimModal;
