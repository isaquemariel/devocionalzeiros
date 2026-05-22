import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { triggerConfetti } from "@/utils/confetti";
import { Mascot3D } from "@/components/shared/Mascot3D";

interface Top3CelebrationModalProps {
  isOpen: boolean;
  rank: number;
  onClose: () => void;
}

export const Top3CelebrationModal = ({ isOpen, rank, onClose }: Top3CelebrationModalProps) => {
  const [visible, setVisible] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      // Trigger confetti celebration
      triggerConfetti("celebration");
      
      // Auto-close after 5 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 5000);

      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [isOpen, onClose]);

  const getRankMessage = (rank: number) => {
    switch (rank) {
      case 1:
        return "Você é o CAMPEÃO! 👑";
      case 2:
        return "Você conquistou o 2º lugar! 🥈";
      case 3:
        return "Você conquistou o 3º lugar! 🥉";
      default:
        return `Você está no Top ${rank}!`;
    }
  };

  const getRankIcon = (rank: number) => {
    const colors = {
      1: "text-yellow-400",
      2: "text-gray-300",
      3: "text-amber-600"
    };
    return colors[rank as 1 | 2 | 3] || "text-primary";
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="dark fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="relative mx-4 max-w-sm w-full bg-gradient-to-b from-card to-background border border-primary/30 rounded-3xl p-8 text-center shadow-[0_0_60px_rgba(59,130,246,0.3)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/20 via-cyan-500/10 to-primary/20 blur-xl opacity-50 -z-10" />
            
            {/* Mascot champion animation */}
            <div className="mb-6">
              <Mascot3D mood="champion" size="lg" />
            </div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-black text-foreground mb-2"
            >
              PARABÉNS! 🎉
            </motion.h2>

            {/* Rank message */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg font-bold text-primary mb-2"
            >
              {getRankMessage(rank)}
            </motion.p>

            {/* Encouragement */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-muted-foreground mb-6"
            >
              Continue assim! Sua dedicação está fazendo a diferença!
            </motion.p>

            {/* OK Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Button
                onClick={onClose}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 rounded-xl"
              >
                OK, Entendi!
              </Button>
            </motion.div>

            {/* Auto-close indicator */}
            <motion.div
              className="mt-4 h-1 bg-white/10 rounded-full overflow-hidden"
            >
              <motion.div
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 5, ease: "linear" }}
                className="h-full bg-primary/50"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
