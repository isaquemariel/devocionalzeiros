import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Sparkles, Gift, ArrowRight } from "lucide-react";
import { Mascot3D } from "@/components/shared/Mascot3D";

interface PlanCompletionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectNewPlan: () => void;
  planName: string;
  bonusPoints: number;
}

export const PlanCompletionModal = ({
  isOpen,
  onClose,
  onSelectNewPlan,
  planName,
  bonusPoints,
}: PlanCompletionModalProps) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="dark fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="w-full max-w-md bg-card border border-border rounded-3xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Animated Background */}
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 via-orange-500/20 to-red-500/20" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-amber-400/30 rounded-full blur-3xl" />
            
            {/* Content */}
            <div className="relative p-8 text-center">
              {/* Mascot happy */}
              <div className="mb-6">
                <Mascot3D mood="happy" size="lg" />
              </div>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl sm:text-3xl font-bold mb-2"
              >
                🎉 Parabéns!
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-muted-foreground mb-6"
              >
                Você concluiu o plano
                <br />
                <span className="text-foreground font-semibold">{planName}</span>
              </motion.p>

              {/* Bonus Points */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 mb-6"
              >
                <Gift className="w-5 h-5 text-amber-500" />
                <span className="text-lg font-bold text-amber-500">+{bonusPoints} pontos bônus!</span>
                <Sparkles className="w-5 h-5 text-amber-500" />
              </motion.div>

              {/* CTA Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                onClick={onSelectNewPlan}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold text-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Escolher Próximo Plano</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                onClick={onClose}
                className="mt-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Continuar mais tarde
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
