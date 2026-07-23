import { useEffect, useMemo, useRef, useState } from "react";
import { drawScene, seedParticles, type Particle, type SceneDims } from "@/lib/rpgScene";
import { drawMascot, DEFAULT_LOOK, type MascotLook } from "@/lib/rpgMascot";
import { hasLivingScene, drawLivingScene } from "@/lib/rpgLivingScene";
import { drawVerseAccents, detectSetting, drawSettingTerrain } from "@/lib/rpgVerseFx";
import { RPG_BIBLE_BOOKS } from "@/lib/rpgBibleData";

// ============================================================================
// Pano de fundo reutilizável dos DESAFIOS — a mesma cena/ambiente do capítulo
// que acabamos de ler, no seu estado "conclusivo". Assim cada desafio acontece
// SOBRE o lugar onde estávamos, como a conclusão daquele cenário. O desafio em
// si (grade, cartas, perguntas) flutua por cima em pop-up.
// ============================================================================

const CAM_H = 200;

interface Props {
  bookId: string;
  chapter: number;
  chapterText?: string; // texto do capítulo → detecta o ambiente (monte, mar, deserto…)
  look?: Partial<MascotLook>;
  showHero?: boolean; // desenha o mascote no chão da cena
  dim?: number; // escurecimento p/ destacar o pop-up (0..1)
}

export default function RPGSceneBackdrop({ bookId, chapter, chapterText = "", look, showHero = false, dim = 0.55 }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [box, setBox] = useState({ w: 360, h: 220 });
  const book = RPG_BIBLE_BOOKS.find((b) => b.id === bookId);
  const region = book?.region || "creation";
  const setting = useMemo(() => detectSetting(chapterText), [chapterText]);

  const lookRef = useRef<MascotLook>(DEFAULT_LOOK);
  lookRef.current = { ...DEFAULT_LOOK, ...(look || {}) };
  const settingRef = useRef(setting);
  settingRef.current = setting;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const cr = entries[0]?.contentRect;
      if (cr) setBox({ w: Math.max(1, cr.width), h: Math.max(1, cr.height) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const camW = Math.max(130, Math.min(620, Math.round(CAM_H * (box.w / box.h))));
  const ground = Math.round(CAM_H * 0.7);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = camW;
    canvas.height = CAM_H;
    const g = canvas.getContext("2d");
    if (!g) return;
    g.imageSmoothingEnabled = false;
    const dims: SceneDims = { W: camW, H: CAM_H, GROUND: ground };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seed = 7;
    const rand = () => (seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;
    const particles: Particle[] = seedParticles(region, dims, rand);
    const living = hasLivingScene(bookId, chapter);
    let t = 0, last = 0, raf = 0, mounted = true;
    const frame = (now: number) => {
      if (!mounted) return;
      const dt = Math.min(48, now - last || 16);
      last = now;
      t += dt;
      g.clearRect(0, 0, camW, CAM_H);
      if (living) {
        // estado pleno da cena viva (a "conclusão" daquele capítulo)
        drawLivingScene(g, { key: `${bookId}:${chapter}`, verseNumber: 999, dims, t, reduce });
      } else {
        drawScene(g, { region, dims, particles, t, scroll: 0, reduce });
        drawSettingTerrain(g, { setting: settingRef.current, dims, t, reduce });
        drawVerseAccents(g, { text: chapterText, dims, t, reduce });
      }
      if (showHero) drawMascot(g, Math.round(camW * 0.5), ground, lookRef.current, { t, reduce, walking: false, mood: "happy" });
      if (reduce) return;
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => { mounted = false; if (raf) cancelAnimationFrame(raf); };
  }, [bookId, chapter, region, camW, ground, showHero, chapterText]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ imageRendering: "pixelated" }} aria-hidden="true" />
      <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, rgba(5,7,12,${dim * 0.7}), rgba(5,7,12,${dim}))` }} />
    </div>
  );
}
