import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { X, Heart, Crown, Sparkles } from "lucide-react";
import { useState } from "react";
import { VSLModal } from "@/components/shared/VSLModal";

interface DailyUpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DailyUpgradeModal = ({ isOpen, onClose }: DailyUpgradeModalProps) => {
  const navigate = useNavigate();
  const [showVSL, setShowVSL] = useState(false);

  const handleDonate = () => {
    onClose();
    setShowVSL(true);
  };

  const handleUpgrade = () => {
    onClose();
    setShowVSL(true);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="daily-upgrade-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/85 backdrop-blur-md z-50"
            />

            {/* Modal */}
            <motion.div
              key="daily-upgrade-modal"
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 30 }}
              transition={{ type: "spring", damping: 22, stiffness: 320 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            >
              <div className="relative w-full max-w-xs sm:max-w-md overflow-hidden rounded-3xl shadow-2xl">
                {/* Glowing border */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 p-[2px]">
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950" />
                </div>

                {/* Ambient glow */}
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-purple-500/20 via-pink-500/15 to-indigo-400/10 blur-2xl -z-10" />

                {/* Content */}
                <div className="relative p-5 sm:p-7">
                  {/* Close */}
                  <button
                    onClick={onClose}
                    className="absolute top-3 right-3 p-1.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    <X className="w-3.5 h-3.5 text-white/70" />
                  </button>

                  {/* Heart icon */}
                  <div className="flex justify-center mb-4">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-pink-400/40 to-purple-500/30 blur-xl scale-150" />
                      <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-pink-500/30 to-purple-500/20 border border-pink-400/40 flex items-center justify-center">
                        <Heart className="w-7 h-7 sm:w-8 sm:h-8 text-pink-400" fill="currentColor" />
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <div className="text-center mb-4 sm:mb-5">
                    <h3 className="text-base sm:text-lg font-extrabold text-white mb-2 sm:mb-3 leading-tight">
                      Ajude a manter os Devocionalzeiros no ar 🙏
                    </h3>
                    <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
                      Manter a plataforma Devocionalzeiros online tem custos mensais em dólar <span className="text-white/50">(servidores, sistema e atualizações)</span>.
                    </p>
                  </div>

                  {/* Main message */}
                  <div className="rounded-2xl border border-purple-500/25 bg-purple-500/8 p-3.5 sm:p-4 mb-4 sm:mb-5 space-y-2">
                    <p className="text-white/80 text-xs sm:text-sm leading-relaxed text-center">
                      Se este projeto tem <span className="text-pink-300 font-semibold">abençoado sua vida</span>, considere nos apoiar para que ele continue existindo e alcançando mais pessoas.
                    </p>
                    <div className="w-12 h-px bg-gradient-to-r from-transparent via-purple-400/40 to-transparent mx-auto" />
                    <p className="text-white/60 text-xs sm:text-sm leading-relaxed text-center">
                      Você pode ajudar fazendo uma <span className="text-amber-300 font-semibold">doação de qualquer valor</span> ou <span className="text-purple-300 font-semibold">assinando um de nossos planos</span>.
                    </p>
                    <p className="text-white/50 text-xs text-center pt-1">
                      Sua contribuição mantém este projeto de pé. 🙏
                    </p>
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-col gap-2.5">
                    {/* Donate button - large & pulsing */}
                    <motion.button
                      onClick={handleDonate}
                      animate={{ scale: [1, 1.04, 1], boxShadow: ["0 0 16px 2px rgba(236,72,153,0.35)", "0 0 32px 8px rgba(236,72,153,0.6)", "0 0 16px 2px rgba(236,72,153,0.35)"] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full flex items-center justify-center gap-2.5 h-14 font-extrabold text-base rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 text-white transition-colors"
                    >
                      <Heart className="w-5 h-5" fill="currentColor" />
                      Fazer uma Doação
                    </motion.button>

                    {/* Upgrade button */}
                    <button
                      onClick={handleUpgrade}
                      className="w-full flex items-center justify-center gap-2 h-11 font-bold text-sm rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-500/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Crown className="w-4 h-4" />
                      Ver Planos
                      <Sparkles className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={onClose}
                    className="w-full mt-3 py-1 text-white/30 hover:text-white/50 text-xs transition-colors"
                  >
                    Agora não
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <VSLModal
        isOpen={showVSL}
        onClose={() => setShowVSL(false)}
        onUnlocked={() => {
          setShowVSL(false);
          navigate("/planos");
        }}
      />
    </>
  );
};
