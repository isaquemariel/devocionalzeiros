import { useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Humor } from "@/lib/jornada/tipos";
import base from "@/assets/jornada/mascote-base.webp";
import feliz from "@/assets/jornada/mascote-happy.webp";
import campeao from "@/assets/jornada/mascote-champion.webp";
import triste from "@/assets/jornada/mascote-sad.webp";

const ARTE: Record<Humor, string> = { base, feliz, campeao, triste };

interface Props {
  humor: Humor;
  /** muda a cada reação — é a chave que dispara o pulinho */
  pulo?: number;
  tamanho?: number;
}

/**
 * O DEVOCIONALZEIRO em cena.
 *
 * - Respira: um sobe-e-desce lento, para ele nunca parecer um adesivo.
 * - Troca de expressão por crossfade. As quatro artes são pré-carregadas na
 *   montagem; sem isso, a primeira troca piscaria em branco enquanto a imagem
 *   baixa — justamente no momento da reação, que é o que dá vida a ele.
 * - Pula quando reage (`pulo` muda).
 * - Tem uma luz da cor da chama atrás: dá corpo à silhueta e amarra o
 *   personagem à paleta da jornada.
 *
 * As artes vieram RGB sobre fundo creme, e a do campeão com um xadrez de
 * "transparência" pintado no pixel. Estas são recortes (fundo removido e
 * bordas descontaminadas), de 1,2 MB para 21–40 KB cada.
 */
export function Mascote({ humor, pulo = 0, tamanho = 112 }: Props) {
  const reduzir = useReducedMotion();

  useEffect(() => {
    for (const src of Object.values(ARTE)) {
      const img = new Image();
      img.src = src;
    }
  }, []);

  return (
    <div className="relative shrink-0" style={{ width: tamanho, height: tamanho }} aria-hidden="true">
      <motion.div
        className="absolute inset-[8%] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(30,123,255,0.28) 0%, rgba(30,123,255,0) 70%)" }}
        animate={reduzir ? undefined : { scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        key={pulo}
        className="absolute inset-0"
        initial={reduzir || pulo === 0 ? false : { y: 0 }}
        animate={reduzir || pulo === 0 ? undefined : { y: [0, -16, 0, -5, 0] }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          className="absolute inset-0"
          animate={reduzir ? undefined : { y: [0, -3, 0], scaleY: [1, 1.015, 1] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "50% 100%" }}
        >
          <AnimatePresence initial={false}>
            <motion.img
              key={humor}
              src={ARTE[humor]}
              alt=""
              draggable={false}
              className="absolute inset-0 h-full w-full select-none object-contain drop-shadow-[0_8px_14px_rgba(20,40,90,0.18)]"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.22 }}
            />
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
}
