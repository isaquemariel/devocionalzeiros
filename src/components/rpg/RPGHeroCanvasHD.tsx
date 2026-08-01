import { useEffect, useRef } from "react";
import { DEFAULT_LOOK, type MascotLook, type MascotMood } from "@/lib/rpgMascot";
import { drawHeroHD, drawPetHD, heroMountLift } from "@/lib/rpgStageHD";

export type HeroFrame = "full" | "close";

interface RPGHeroCanvasHDProps {
  look?: Partial<MascotLook>;
  /** aceito por compatibilidade com o RPGMascotCanvas (o HD tem expressão própria) */
  mood?: MascotMood;
  walking?: boolean;
  /** direção que o herói olha (1 = direita, -1 = esquerda) */
  face?: 1 | -1;
  /** "full" = provador/home (asas/aura/montaria com folga); "close" = marcadores */
  frame?: HeroFrame;
  /** Largura CSS em px. Default 120. */
  size?: number;
  className?: string;
}

// Viewports lógicos (mesmas unidades da CENA VIVA: herói ~48 de altura).
// full: comporta montaria grande + acessório de cabeça + asas/aura.
// close: enquadramento apertado para marcadores (mapa, listas).
const FRAMES: Record<HeroFrame, { CW: number; CH: number }> = {
  full: { CW: 96, CH: 120 },
  close: { CW: 84, CH: 104 },
};

const HERO_VIS = 53; // altura visual do herói (corpo + pés) no motor HD
const HEAD_ACC = 12; // folga dos acessórios de cabeça (coroa/turbante/chama…)

/** px do topo do canvas até o TOPO VISUAL do herói (cabeça + acessório),
 *  já considerando a elevação da montaria — a tag fica SEMPRE à mesma
 *  distância acima da cabeça, com ou sem montaria. */
export function heroHeadTop(size: number, look?: Partial<MascotLook>, frame: HeroFrame = "full"): number {
  const { CW, CH } = FRAMES[frame];
  const h = (size * CH) / CW;
  const topLogical = (CH - 6) - HERO_VIS - HEAD_ACC - heroMountLift(look?.mount ?? "none");
  return (topLogical / CH) * h;
}

/**
 * Renderiza o Devocionalzeiro HD (o MESMO desenho da cena viva) em um canvas
 * supersampled e animado. Usado na home, guarda-roupa/loja, mapa e demais
 * telas — para o visual ficar idêntico ao do jogo.
 */
const RPGHeroCanvasHD = ({
  look,
  walking = false,
  face = 1,
  frame = "full",
  size = 120,
  className = "",
}: RPGHeroCanvasHDProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>();
  const propsRef = useRef({ look, walking, face });
  propsRef.current = { look, walking, face };

  const { CW, CH } = FRAMES[frame];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const g = canvas.getContext("2d");
    if (!g) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const BX = CW / 2;
    const FEET_Y = CH - 6;
    let t = 0;
    let last = 0;
    let mounted = true;

    const frameFn = (now: number) => {
      if (!mounted) return;
      const dt = Math.min(48, now - last || 16);
      last = now;
      t += dt;
      const { look: lk, walking: wk, face: fc } = propsRef.current;
      const full: MascotLook = { ...DEFAULT_LOOK, ...(lk || {}) };
      // supersampling: desenha em unidades lógicas com nitidez de retina
      const k = canvas.width / CW;
      g.setTransform(k, 0, 0, k, 0, 0);
      g.clearRect(0, 0, CW, CH);
      g.imageSmoothingEnabled = true;
      drawHeroHD(g, BX + (full.pet !== "none" ? 6 : 0), FEET_Y, full, { t, reduce, walking: wk, face: fc });
      if (full.pet !== "none") drawPetHD(g, BX - 30, FEET_Y, full.pet, t, reduce);
      if (reduce) return; // um frame estático
      rafRef.current = requestAnimationFrame(frameFn);
    };
    rafRef.current = requestAnimationFrame(frameFn);

    return () => {
      mounted = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [CW, CH]);

  // resolução real do canvas: tamanho CSS × DPR (nítido em qualquer tela)
  const dpr = typeof window !== "undefined" ? Math.min(3, window.devicePixelRatio || 1) : 2;
  const pxW = Math.round(size * dpr);
  const pxH = Math.round(((size * CH) / CW) * dpr);
  return (
    <canvas
      ref={canvasRef}
      width={pxW}
      height={pxH}
      className={className}
      style={{ width: size, height: (size * CH) / CW }}
      aria-hidden="true"
    />
  );
};

export default RPGHeroCanvasHD;
