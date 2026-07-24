import { useEffect, useRef } from "react";
import { drawMascot, DEFAULT_LOOK, mountLift, type MascotLook, type MascotMood } from "@/lib/rpgMascot";

interface RPGMascotCanvasProps {
  look?: Partial<MascotLook>;
  mood?: MascotMood;
  walking?: boolean;
  /** Rendered CSS size in px (square-ish, portrait). Default 120. */
  size?: number;
  className?: string;
}

// Internal (logical) resolution — kept low for the crisp retro / pixelated look.
// feetY/bx chosen so head accessories (fire/crown/halo up to ~cy-28) have room.
const CW = 64;
const CH = 72;
const BX = 32;
const FEET_Y = 64;

/**
 * Renders the procedural pixel-art Devocionalzeiro on a <canvas>, animated via
 * requestAnimationFrame. Purely visual — no data/DB. Use for the RPG home hero,
 * previews, and the dress-up / rewards screens.
 */
const RPGMascotCanvas = ({
  look,
  mood = "idle",
  walking = false,
  size = 120,
  className = "",
}: RPGMascotCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>();
  // keep latest props in refs so the RAF loop always reads current values
  const propsRef = useRef({ look, mood, walking });
  propsRef.current = { look, mood, walking };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const g = canvas.getContext("2d");
    if (!g) return;
    g.imageSmoothingEnabled = false; // pixel art nítido

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let t = 0;
    let last = 0;
    let mounted = true;

    const frame = (now: number) => {
      if (!mounted) return;
      const dt = Math.min(48, now - last || 16);
      last = now;
      t += dt;
      g.clearRect(0, 0, CW, CH);
      const { look: lk, mood: md, walking: wk } = propsRef.current;
      const full: MascotLook = { ...DEFAULT_LOOK, ...(lk || {}) };
      // Montaria eleva o boneco; escala (só quando montado) de modo que a CABEÇA
      // fique na MESMA linha de quando está sem montaria — assim não corta o topo
      // e o rótulo de nome mantém a relação que já estava boa. Sem montaria: 1:1.
      const lift = mountLift(full.mount);
      const HEAD_TOP = 50;             // altura da cabeça acima dos pés (sem montaria)
      const sc = lift ? Math.min(1, HEAD_TOP / (HEAD_TOP + lift)) : 1;
      if (sc !== 1) {
        g.save();
        g.translate(BX, FEET_Y);
        g.scale(sc, sc);
        drawMascot(g, 0, 0, full, { t, reduce, mood: md, walking: wk });
        g.restore();
      } else {
        drawMascot(g, BX, FEET_Y, full, { t, reduce, mood: md, walking: wk });
      }
      // reduced-motion: draw a single static frame, don't keep looping
      if (reduce) return;
      rafRef.current = requestAnimationFrame(frame);
    };
    rafRef.current = requestAnimationFrame(frame);

    return () => {
      mounted = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={CW}
      height={CH}
      className={className}
      style={{
        width: size,
        height: (size * CH) / CW,
        imageRendering: "pixelated",
      }}
      aria-hidden="true"
    />
  );
};

export default RPGMascotCanvas;
