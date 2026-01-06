import { motion, AnimatePresence } from "framer-motion";
import { Lock, MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LockedFeatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureName: string;
}

export const LockedFeatureModal = ({
  isOpen,
  onClose,
  featureName,
}: LockedFeatureModalProps) => {
  const handleUpgradeClick = () => {
    const message = encodeURIComponent("Oii, quero fazer um upgrade de plano.");
    const whatsappNumber = "5584998982478";
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  };

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
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 max-w-md mx-auto"
          >
            <div className="relative bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl border border-white/10 p-6 shadow-2xl">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4 text-white/60" />
              </button>

              {/* Lock Icon */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-amber-500/20 flex items-center justify-center">
                    <Lock className="w-10 h-10 text-amber-400" />
                  </div>
                  <div className="absolute inset-0 w-20 h-20 rounded-full bg-amber-500/20 animate-ping" />
                </div>
              </div>

              {/* Content */}
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  Recurso Bloqueado
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  O recurso <span className="text-amber-400 font-semibold">{featureName}</span> não está 
                  disponível no seu plano atual. Faça um upgrade para desbloquear!
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  onClick={handleUpgradeClick}
                  className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-green-500/20"
                >
                  <MessageCircle className="w-5 h-5" />
                  Falar com Suporte
                </Button>

                <button
                  onClick={onClose}
                  className="w-full py-3 text-white/50 hover:text-white/70 text-sm transition-colors"
                >
                  Talvez depois
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
