import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Clock, X, Crown, Zap, Gem } from "lucide-react";
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
    navigate("/escolher-plano");
  };

  const isFreePlan = planType === "free";
  const upgradeColor = isFreePlan ? "amber" : "purple";

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="dark fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
          />
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="dark fixed inset-0 z-[70] flex items-center justify-center p-4 pb-28 sm:pb-6 overflow-y-auto"
          >
            <div className={`relative w-full max-w-sm max-h-[calc(100svh-7rem)] sm:max-h-[calc(100svh-3rem)] overflow-y-auto rounded-2xl border shadow-2xl ${
              upgradeColor === "purple"
                ? "border-purple-500/20 shadow-purple-500/10"
                : "border-amber-500/20 shadow-amber-500/10"
            }`}>
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950" />

              <div className="relative p-4 sm:p-5">
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4 text-white/60" />
                </button>

                {/* Timer Icon */}
                <div className="flex justify-center mb-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${
                    upgradeColor === "purple"
                      ? "bg-purple-500/20 border-purple-500/30"
                      : "bg-amber-500/20 border-amber-500/30"
                  }`}>
                    <Clock className={`w-6 h-6 ${
                      upgradeColor === "purple" ? "text-purple-400" : "text-amber-400"
                    }`} />
                  </div>
                </div>

                {/* Title */}
                <div className="text-center mb-3">
                  <h3 className="text-base font-bold text-white mb-1">
                    {isBlocked ? "Recurso disponível em plano superior" : "Limite diário atingido"}
                  </h3>
                  <p className="text-white/70 text-xs leading-relaxed">
                    {isBlocked
                      ? `No seu plano ${planType === "free" ? "gratuito" : "atual"}, ${featureName} não está disponível. Faça o upgrade para liberar o acesso.`
                      : `No seu plano ${planType === "free" ? "gratuito" : "atual"}, ${featureName} está disponível de forma limitada: ${limit} ${limit === 1 ? "uso" : "usos"} por dia (você já usou ${currentUsage}/${limit}). Aguarde a renovação diária ou faça o upgrade para usar sem limites.`}
                  </p>
                </div>

                {/* Countdown — sempre exibido para mostrar quando o recurso fica disponível novamente */}
                <div className="bg-white/5 rounded-xl p-3 mb-3 border border-white/5 text-center">
                  <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">
                    Disponível novamente em (Brasília)
                  </p>
                  <p className={`text-2xl font-mono font-bold ${
                    upgradeColor === "purple" ? "text-purple-400" : "text-amber-400"
                  }`}>
                    {countdown}
                  </p>
                </div>


                {/* Benefits — genérico, sem citar plano específico */}
                <div className="bg-white/5 rounded-xl p-3 mb-3 border border-white/5">
                  <p className={`text-[10px] font-semibold uppercase tracking-wider mb-2 ${
                    upgradeColor === "purple" ? "text-purple-400" : "text-amber-400"
                  }`}>
                    Com um plano superior:
                  </p>
                  <ul className="space-y-1.5">
                    <li className="flex items-center gap-2 text-white/80 text-xs">
                      <Gem className={`w-3.5 h-3.5 shrink-0 ${upgradeColor === "purple" ? "text-purple-400" : "text-amber-400"}`} />
                      Mais usos diários liberados
                    </li>
                    <li className="flex items-center gap-2 text-white/80 text-xs">
                      <Gem className={`w-3.5 h-3.5 shrink-0 ${upgradeColor === "purple" ? "text-purple-400" : "text-amber-400"}`} />
                      Recursos exclusivos da plataforma
                    </li>
                    <li className="flex items-center gap-2 text-white/80 text-xs">
                      <Gem className={`w-3.5 h-3.5 shrink-0 ${upgradeColor === "purple" ? "text-purple-400" : "text-amber-400"}`} />
                      Sem limites diários nas funções principais
                    </li>
                  </ul>
                </div>

                {/* CTA */}
                <div className="space-y-2">
                  <Button
                    onClick={handleUpgrade}
                    className={`w-full h-10 font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg ${
                      upgradeColor === "purple"
                        ? "bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 text-white shadow-purple-500/25"
                        : "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black shadow-amber-500/25"
                    }`}
                  >
                    <Crown className="w-4 h-4" />
                    Ver planos
                  </Button>


                  <button
                    onClick={onClose}
                    className="w-full py-1.5 text-white/40 hover:text-white/60 text-xs transition-colors"
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
