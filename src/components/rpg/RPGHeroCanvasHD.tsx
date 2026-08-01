import { useEffect, useRef } from "react";
import { DEFAULT_LOOK, type MascotLook, type MascotMood } from "@/lib/rpgMascot";
import { drawHeroHD, drawPetHD } from "@/lib/rpgStageHD";

interface RPGHeroCanvasHDProps {
  look?: Partial<MascotLook>;
  /** aceito por compatibilidade com o RPGMascotCanvas (o HD tem expressão própria) */
  mood?: MascotMood;
  walking?: boolean;
  /** Largura CSS em px. Default 120. */
  size?: number;
  className?: string;
}

// Viewport lógico (mesmas unidades da CENA VIVA: herói ~48 de altura).
// Largura comporta asas/aura/carruagem; altura comporta montaria + chapéu.
const CW = 96;
const CH = 104;
const BX = CW / 2;
const FEET_Y = CH - 6;

/**
 * Renderiza o Devocionalzeiro HD (o MESMO desenho da cena viva) em um canvas
 * supersampled e animado. Usado na home do RPG e no guarda-roupa/loja para o
 * visual ficar idêntico ao do jogo.
 */
const RPGHeroCanvasHD = ({
  look,
  walking = false,
  size = 120,
  className = "",
}: RPGHeroCanvasHDProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>();
  const propsRef = useRef({ look, walking });
  propsRef.current = { look, walking };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const g = canvas.getContext("2d");
    if (!g) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let t = 0;
    let last = 0;
    let mounted = true;

    const frame = (now: number) => {
      if (!mounted) return;
      const dt = Math.min(48, now - last || 16);
      last = now;
      t += dt;
      const { look: lk, walking: wk } = propsRef.current;
      const full: MascotLook = { ...DEFAULT_LOOK, ...(lk || {}) };
      // supersampling: desenha em unidades lógicas com nitidez de retina
      const k = canvas.width / CW;
      g.setTransform(k, 0, 0, k, 0, 0);
      g.clearRect(0, 0, CW, CH);
      g.imageSmoothingEnabled = true;
      drawHeroHD(g, BX + (full.pet !== "none" ? 6 : 0), FEET_Y, full, { t, reduce, walking: wk, face: 1 });
      if (full.pet !== "none") drawPetHD(g, BX - 30, FEET_Y, full.pet, t, reduce);
      if (reduce) return; // um frame estático
      rafRef.current = requestAnimationFrame(frame);
    };
    rafRef.current = requestAnimationFrame(frame);

    return () => {
      mounted = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

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
