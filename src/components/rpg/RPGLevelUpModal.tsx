import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { triggerConfetti } from "@/utils/confetti";
import { getLevelTier, MAX_LEVEL } from "@/lib/rpgLevel";
import { RPGLevelBadge } from "@/components/rpg/RPGLevelBadge";

interface Props {
  isOpen: boolean;
  level: number;
  /** patente anterior — se mudou, destacamos a nova patente */
  previousLevel?: number;
  onClose: () => void;
}

/** Comemoração estilo RPG ao subir de nível (novo livro concluído). */
export const RPGLevelUpModal = ({ isOpen, level, previousLevel, onClose }: Props) => {
  const tier = getLevelTier(level);
  const prevTier = previousLevel != null ? getLevelTier(previousLevel) : null;
  const newRank = !prevTier || prevTier.title !== tier.title;
  const isMax = level >= MAX_LEVEL;

  useEffect(() => {
    if (isOpen) triggerConfetti("achievement");
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-xs rounded-2xl border-2 p-6 text-center overflow-hidden"
            style={{ borderColor: tier.color, background: "linear-gradient(180deg,#161a22,#0c0e13)" }}
            initial={{ scale: 0.7, y: 24 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* raios de fundo */}
            <div
              className="absolute inset-0 pointer-events-none opacity-30"
              style={{ background: `radial-gradient(circle at 50% 30%, ${tier.color}55, transparent 60%)` }}
            />

            <p className="relative text-xs font-black tracking-[0.2em] text-white/70 uppercase mb-1">
              {isMax ? "Nível Máximo!" : "Subiu de Nível!"}
            </p>

            <motion.div
              className="relative mx-auto my-3 flex justify-center"
              initial={{ rotate: -12, scale: 0.6 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
            >
              <RPGLevelBadge level={level} size={120} />
            </motion.div>

            <p className="relative text-3xl font-black text-white leading-none">Nível {level}</p>
            <p className="relative mt-1 text-sm font-bold" style={{ color: tier.color }}>
              {tier.emoji} {tier.title}
            </p>

            <p className="relative mt-3 text-xs text-white/70 leading-snug">
              {isMax
                ? "Você concluiu a jornada pela Bíblia inteira — a patente máxima, O Fiel. 🏆"
                : newRank
                ? `Você alcançou uma nova patente: ${tier.title}! Continue concluindo livros para evoluir.`
                : "Mais um livro da Bíblia concluído. Siga firme rumo ao nível 66!"}
            </p>

            <Button
              onClick={onClose}
              className="relative mt-5 w-full font-bold"
              style={{ background: tier.color, color: "#12151b" }}
            >
              Continuar
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RPGLevelUpModal;
