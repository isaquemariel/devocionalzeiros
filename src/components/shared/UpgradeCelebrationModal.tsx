import { motion, AnimatePresence } from "framer-motion";
import { Crown, Sparkles, PartyPopper, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { triggerConfetti } from "@/utils/confetti";

interface UpgradeCelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
}

const PLAN_CONFIG: Record<string, {
  gradient: string;
  iconBg: string;
  icon: typeof Crown;
  description: string;
  color: string;
}> = {
  gold: {
    gradient: "from-amber-500 to-amber-600",
    iconBg: "bg-gradient-to-br from-amber-500 to-amber-600",
    icon: Sparkles,
    description: "Você agora tem acesso ao Quiz, Estudo de Versículos e Devocionais personalizados!",
    color: "text-amber-400",
  },
  premium: {
    gradient: "from-purple-500 to-purple-600",
    iconBg: "bg-gradient-to-br from-purple-500 to-purple-600",
    icon: Crown,
    description: "Você agora tem acesso TOTAL: Chat IA, Gerador de Sermão e muito mais!",
    color: "text-purple-400",
  },
  embaixador: {
    gradient: "from-emerald-500 to-emerald-600",
    iconBg: "bg-gradient-to-br from-emerald-500 to-emerald-600",
    icon: Star,
    description: "Você agora faz parte do time de Embaixadores! Bem-vindo à família!",
    color: "text-emerald-400",
  },
};

export const UpgradeCelebrationModal = ({
  isOpen,
  onClose,
  planName,
}: UpgradeCelebrationModalProps) => {
  const planKey = planName.toLowerCase();
  const config = PLAN_CONFIG[planKey] || PLAN_CONFIG.gold;
  const PlanIcon = config.icon;

  useEffect(() => {
    if (isOpen) {
      // Trigger confetti celebration
      triggerConfetti("celebration");
      
      // Second burst for extra celebration
      setTimeout(() => {
        triggerConfetti("achievement");
      }, 500);
    }
  }, [isOpen]);

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="upgrade-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 20, stiffness: 200 }}
              className="relative w-full max-w-sm"
            >
              <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-b from-zinc-900 to-black shadow-2xl">
                {/* Animated glow background */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-20`}
                  animate={{
                    opacity: [0.1, 0.25, 0.1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Sparkle particles */}
                <div className="absolute inset-0 overflow-hidden">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`absolute w-1 h-1 rounded-full ${config.color}`}
                      initial={{
                        x: Math.random() * 400 - 200,
                        y: Math.random() * 400 - 200,
                        opacity: 0,
                        scale: 0,
                      }}
                      animate={{
                        y: [null, -400],
                        opacity: [0, 1, 0],
                        scale: [0, 1.5, 0],
                      }}
                      transition={{
                        duration: 2 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                        ease: "easeOut",
                      }}
                      style={{
                        left: `${20 + Math.random() * 60}%`,
                        top: `${50 + Math.random() * 50}%`,
                      }}
                    />
                  ))}
                </div>

                <div className="relative p-6 text-center">
                  {/* Party icon */}
                  <motion.div
                    initial={{ rotate: -20, scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="flex justify-center mb-4"
                  >
                    <div className="relative">
                      <motion.div
                        animate={{
                          rotate: [0, 10, -10, 0],
                        }}
                        transition={{
                          duration: 0.5,
                          repeat: Infinity,
                          repeatDelay: 1,
                        }}
                      >
                        <PartyPopper className="w-16 h-16 text-amber-400" />
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Title */}
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-2xl font-bold text-white mb-2"
                  >
                    Parabéns! 🎉
                  </motion.h2>

                  {/* Plan badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r shadow-lg mb-4"
                    style={{
                      background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
                    }}
                  >
                    <div className={`w-8 h-8 rounded-lg ${config.iconBg} flex items-center justify-center`}>
                      <PlanIcon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-lg font-bold text-white">
                      Plano {planName.toUpperCase()}
                    </span>
                  </motion.div>

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-white/70 text-sm mb-6 leading-relaxed"
                  >
                    {config.description}
                  </motion.p>

                  {/* Unlock animation */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex justify-center gap-3 mb-6"
                  >
                    {[Zap, Star, Crown].map((Icon, idx) => (
                      <motion.div
                        key={idx}
                        animate={{
                          y: [0, -5, 0],
                        }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: idx * 0.2,
                        }}
                        className={`w-10 h-10 rounded-xl ${config.iconBg} flex items-center justify-center shadow-lg`}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* CTA Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <Button
                      onClick={onClose}
                      className={`w-full h-12 font-bold text-base rounded-xl bg-gradient-to-r ${config.gradient} hover:opacity-90 text-white shadow-lg transition-all`}
                    >
                      <Sparkles className="w-5 h-5 mr-2" />
                      Começar a explorar!
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
