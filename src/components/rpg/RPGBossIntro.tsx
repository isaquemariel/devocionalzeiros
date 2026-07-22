import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { drawScene, seedParticles, type Particle, type SceneDims } from "@/lib/rpgScene";
import { drawMascot, type MascotLook, DEFAULT_LOOK } from "@/lib/rpgMascot";
import { drawBoss, BOSS_INFO } from "@/lib/rpgBoss";
import type { RPGRegion } from "@/lib/rpgBibleData";

interface RPGBossIntroProps {
  region: RPGRegion;
  bookName: string;
  look?: Partial<MascotLook>;
  onFight: () => void;
  onCancel: () => void;
}

const W = 256;
const H = 168;
const GROUND = 128;
const DIMS: SceneDims = { W, H, GROUND };

const RPGBossIntro = ({ region, bookName, look, onFight, onCancel }: RPGBossIntroProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const boss = BOSS_INFO[region];
  const heroLook: MascotLook = { ...DEFAULT_LOOK, ...(look || {}) };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = W;
    canvas.height = H;
    const g = canvas.getContext("2d");
    if (!g) return;
    g.imageSmoothingEnabled = false;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seed = 5;
    const rand = () => {
      seed = (seed * 1103515245 + 12345) & 0x7fffffff;
      return seed / 0x7fffffff;
    };
    const particles: Particle[] = seedParticles(region, DIMS, rand);
    let t = 0;
    let last = 0;
    let raf = 0;
    let mounted = true;
    const frame = (now: number) => {
      if (!mounted) return;
      const dt = Math.min(48, now - last || 16);
      last = now;
      t += dt;
      g.clearRect(0, 0, W, H);
      drawScene(g, { region, dims: DIMS, particles, t, scroll: 0, reduce });
      drawMascot(g, Math.round(W * 0.28), GROUND, heroLook, { t, reduce });
      drawBoss(g, region, Math.round(W * 0.72), GROUND, t, reduce);
      if (reduce) return;
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      mounted = false;
      if (raf) cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [region]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="rpg-root fixed inset-0 z-[65] bg-[#05070c] flex flex-col overflow-hidden"
    >
      <div className="relative flex-1 min-h-0">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover" style={{ imageRendering: "pixelated" }} aria-hidden="true" />
        <div className="absolute inset-0 pointer-events-none mix-blend-multiply" style={{ background: "repeating-linear-gradient(180deg, rgba(0,0,0,0) 0 2px, rgba(0,0,0,.16) 2px 3px)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(120% 80% at 50% 40%, transparent 45%, rgba(5,7,12,.7) 100%)" }} />

        {/* Banner topo */}
        <div className="absolute top-4 left-0 right-0 flex flex-col items-center text-center px-4">
          <span className="rpg-eyebrow text-[#ff8a8a]">⚔ Chefe do Livro</span>
          <motion.h1
            className="rpg-title text-2xl mt-1"
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            {boss.name}
          </motion.h1>
          <div className="mt-2 rpg-dialogue px-3 py-1.5 max-w-xs">
            <p className="text-[12px] text-blue-50 italic">"{boss.taunt}"</p>
          </div>
        </div>
      </div>

      {/* Rodapé com ações */}
      <div className="shrink-0 p-4 bg-[#0b0805] border-t-2 border-[#3a2c18] flex flex-col gap-2">
        <p className="text-center text-[11px] text-[#b8a67f]">
          Vença o desafio final de <b className="text-[#ffd889]">{bookName}</b> para derrotar o chefe e concluir o livro.
        </p>
        <div className="flex gap-2">
          <button onClick={onCancel} className="rpg-btn-ghost px-4 py-3 text-sm">
            ◀ Voltar
          </button>
          <button onClick={onFight} className="rpg-btn flex-1 py-3 text-base uppercase tracking-wide">
            ⚔️ Enfrentar o chefe
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default RPGBossIntro;
