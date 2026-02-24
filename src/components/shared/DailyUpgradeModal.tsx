import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { X, Crown, Sparkles, Infinity, BookOpen, MessageCircle, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DailyUpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const benefits = [
  { icon: Infinity, label: "Uso ilimitado de todas as ferramentas" },
  { icon: Gamepad2, label: "RPG Bíblico sem limites" },
  { icon: MessageCircle, label: "Chat IA e Sermões ilimitados" },
  { icon: BookOpen, label: "Planos de leitura personalizados por IA" },
];

export const DailyUpgradeModal = ({ isOpen, onClose }: DailyUpgradeModalProps) => {
  const navigate = useNavigate();

  const handleUpgrade = () => {
    onClose();
    navigate("/planos");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
          >
            <div className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-purple-500/20 shadow-2xl shadow-purple-500/10">
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950" />

              <div className="relative p-5">
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4 text-white/60" />
                </button>

                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/30 to-purple-700/20 border border-purple-500/30 flex items-center justify-center">
                    <Crown className="w-7 h-7 text-purple-400" />
                  </div>
                </div>

                {/* Title */}
                <div className="text-center mb-4">
                  <h3 className="text-lg font-bold text-white mb-1">
                    Eleve sua jornada espiritual
                  </h3>
                  <p className="text-white/50 text-xs">
                    Desbloqueie todo o potencial do Clube HD
                  </p>
                </div>

                {/* Benefits */}
                <div className="bg-white/5 rounded-xl p-3 mb-4 border border-white/5 space-y-2.5">
                  {benefits.map((b, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-500/15 flex items-center justify-center shrink-0">
                        <b.icon className="w-4 h-4 text-purple-400" />
                      </div>
                      <span className="text-white/80 text-xs">{b.label}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Button
                  onClick={handleUpgrade}
                  className="w-full h-11 font-bold text-sm rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 text-white shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  Ver Planos
                </Button>

                <button
                  onClick={onClose}
                  className="w-full mt-2 py-1.5 text-white/40 hover:text-white/60 text-xs transition-colors"
                >
                  Agora não
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
