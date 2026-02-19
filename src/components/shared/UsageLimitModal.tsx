import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Clock, X, Crown, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UsageLimitModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureName: string;
  currentUsage: number;
  limit: number;
  isBlocked?: boolean;
  planType?: string;
}

export const UsageLimitModal = ({
  isOpen,
  onClose,
  featureName,
  currentUsage,
  limit,
  isBlocked = false,
  planType = "free",
}: UsageLimitModalProps) => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState("");

  // Countdown timer
  useEffect(() => {
    if (!isOpen) return;

    const updateCountdown = () => {
      const now = new Date();
      const brasilOffset = -3 * 60;
      const localOffset = now.getTimezoneOffset();
      const diff = brasilOffset - (-localOffset);
      const brasilTime = new Date(now.getTime() + diff * 60 * 1000);
      const nextMidnight = new Date(brasilTime);
      nextMidnight.setHours(24, 0, 0, 0);
      const msLeft = nextMidnight.getTime() - brasilTime.getTime();

      if (msLeft <= 0) {
        setCountdown("Disponível agora!");
        return;
      }

      const hours = Math.floor(msLeft / (1000 * 60 * 60));
      const minutes = Math.floor((msLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((msLeft % (1000 * 60)) / 1000);
      setCountdown(`${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  const handleUpgrade = () => {
    onClose();
    navigate("/planos");
  };

  const isFreePlan = planType === "free";
  const upgradeTarget = isFreePlan ? "GOLD" : "PREMIUM";
  const upgradeColor = isFreePlan ? "amber" : "purple";

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
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className={`relative w-full max-w-md overflow-hidden rounded-2xl border shadow-2xl ${
              upgradeColor === "purple"
                ? "border-purple-500/20 shadow-purple-500/10"
                : "border-amber-500/20 shadow-amber-500/10"
            }`}>
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950" />

              <div className="relative p-6">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4 text-white/60" />
                </button>

                {/* Timer Icon */}
                <div className="flex justify-center mb-5">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border ${
                    upgradeColor === "purple"
                      ? "bg-purple-500/20 border-purple-500/30"
                      : "bg-amber-500/20 border-amber-500/30"
                  }`}>
                    <Clock className={`w-8 h-8 ${
                      upgradeColor === "purple" ? "text-purple-400" : "text-amber-400"
                    }`} />
                  </div>
                </div>

                {/* Title */}
                <div className="text-center mb-4">
                  <h3 className="text-lg font-bold text-white mb-1">
                    {isBlocked ? "Recurso disponível com upgrade" : "Limite diário atingido"}
                  </h3>
                  <p className="text-white/50 text-sm">
                    {isBlocked 
                      ? `${featureName} está disponível a partir do plano ${upgradeTarget}`
                      : `Você usou ${currentUsage}/${limit} de ${featureName} hoje`
                    }
                  </p>
                </div>

                {/* Countdown */}
                {!isBlocked && (
                  <div className="bg-white/5 rounded-xl p-4 mb-5 border border-white/5 text-center">
                    <p className="text-xs text-white/40 uppercase tracking-wider mb-2">Libera novamente em</p>
                    <p className={`text-3xl font-mono font-bold ${
                      upgradeColor === "purple" ? "text-purple-400" : "text-amber-400"
                    }`}>
                      {countdown}
                    </p>
                  </div>
                )}

                {/* Upgrade Benefits */}
                <div className="bg-white/5 rounded-xl p-4 mb-5 border border-white/5">
                  <p className={`text-xs font-semibold uppercase tracking-wider mb-3 ${
                    upgradeColor === "purple" ? "text-purple-400" : "text-amber-400"
                  }`}>
                    Com o plano {upgradeTarget}:
                  </p>
                  <ul className="space-y-2">
                    {isFreePlan ? (
                      <>
                        <li className="flex items-center gap-2 text-white/80 text-sm">
                          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                          Até 5x mais usos diários em todas as funções
                        </li>
                        <li className="flex items-center gap-2 text-white/80 text-sm">
                          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                          Quiz com modo Plano de Leitura desbloqueado
                        </li>
                        <li className="flex items-center gap-2 text-white/80 text-sm">
                          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                          Planos de leitura personalizados por IA
                        </li>
                      </>
                    ) : (
                      <>
                        <li className="flex items-center gap-2 text-white/80 text-sm">
                          <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
                          Uso ilimitado de todas as funções
                        </li>
                        <li className="flex items-center gap-2 text-white/80 text-sm">
                          <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
                          Jogo da Bíblia sem limites
                        </li>
                        <li className="flex items-center gap-2 text-white/80 text-sm">
                          <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
                          Chat IA e Sermões ilimitados
                        </li>
                      </>
                    )}
                  </ul>
                </div>

                {/* CTA */}
                <div className="space-y-3">
                  <Button
                    onClick={handleUpgrade}
                    className={`w-full h-12 font-bold text-base rounded-xl flex items-center justify-center gap-2 shadow-lg ${
                      upgradeColor === "purple"
                        ? "bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 text-white shadow-purple-500/25"
                        : "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black shadow-amber-500/25"
                    }`}
                  >
                    <Crown className="w-5 h-5" />
                    Fazer Upgrade para {upgradeTarget}
                  </Button>

                  <button
                    onClick={onClose}
                    className="w-full py-2 text-white/40 hover:text-white/60 text-sm transition-colors"
                  >
                    {isBlocked ? "Voltar" : "Aguardar liberação"}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
