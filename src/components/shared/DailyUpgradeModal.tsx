import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { X, Crown, Sparkles, Infinity, BookOpen, MessageCircle, Gamepad2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DailyUpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const benefits = [
  { icon: Infinity, label: "Uso ilimitado de todas as ferramentas" },
  { icon: Gamepad2, label: "RPG Bíblico completo sem restrições" },
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
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ type: "spring", damping: 22, stiffness: 320 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-5"
          >
            <div className="relative w-full max-w-sm overflow-hidden rounded-3xl shadow-2xl">
              {/* Glowing border via pseudo-layer */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-amber-400 via-orange-500 to-yellow-500 p-[2px]">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950" />
              </div>

              {/* Ambient glow behind the card */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-amber-500/20 via-orange-500/15 to-yellow-400/10 blur-2xl -z-10" />

              {/* Content */}
              <div className="relative p-4">
                {/* Close */}
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 p-1.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <X className="w-3.5 h-3.5 text-white/70" />
                </button>

                {/* Crown icon with glow */}
                <div className="flex justify-center mb-3">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-400/40 to-orange-500/30 blur-xl scale-150" />
                    <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400/30 to-orange-500/20 border border-amber-400/40 flex items-center justify-center">
                      <Crown className="w-6 h-6 text-amber-400" />
                    </div>
                  </div>
                </div>

                {/* Title */}
                <div className="text-center mb-3">
                  <h3 className="text-base font-extrabold text-white mb-0.5 leading-tight">
                    🔓 Desbloqueie o Premium!
                  </h3>
                  <p className="text-white/55 text-xs">
                    Leve sua jornada espiritual ao próximo nível
                  </p>
                </div>

                {/* Benefits */}
                <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 mb-3 space-y-2">
                  {benefits.map((b, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-500/30 to-orange-500/20 border border-amber-400/20 flex items-center justify-center shrink-0">
                        <b.icon className="w-3.5 h-3.5 text-amber-400" />
                      </div>
                      <span className="text-white/80 text-xs">{b.label}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Button
                  onClick={handleUpgrade}
                  className="w-full h-10 font-extrabold text-sm rounded-xl bg-gradient-to-r from-amber-400 via-orange-500 to-yellow-400 hover:from-amber-300 hover:via-orange-400 hover:to-yellow-300 text-zinc-900 shadow-lg shadow-amber-500/40 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Zap className="w-3.5 h-3.5" />
                  Ver Planos Premium
                  <Sparkles className="w-3.5 h-3.5" />
                </Button>

                <button
                  onClick={onClose}
                  className="w-full mt-2 py-1 text-white/35 hover:text-white/55 text-xs transition-colors"
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
