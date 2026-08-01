import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Trophy, ScrollText } from "lucide-react";

import { Progress } from "@/components/ui/progress";
import { RPG_BIBLE_BOOKS, RPG_REGION_THEMES, RPGRegion } from "@/lib/rpgBibleData";
import RPGHeroCanvasHD from "@/components/rpg/RPGHeroCanvasHD";
import { drawScenicHD } from "@/lib/rpgScenicHD";
import { bossThumbnail } from "@/lib/rpgBoss";
import type { MascotLook } from "@/lib/rpgMascot";

// Paisagem vetorial HD (retrato) fixa atrás do caminho rolável
const BG_DIMS = { W: 256, H: 384, GROUND: 250 };

/** Paisagem HD animada da região — o novo visual moderno do mapa. */
const SceneBackdrop = ({ region }: { region: RPGRegion }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const g = canvas.getContext("2d");
    if (!g) return;
    const dpr = Math.min(2.5, window.devicePixelRatio || 1.5);
    const k = dpr * 1.6; // supersample: nítido mesmo esticado
    canvas.width = Math.round(BG_DIMS.W * k);
    canvas.height = Math.round(BG_DIMS.H * k);
    g.setTransform(k, 0, 0, k, 0, 0);
    g.imageSmoothingEnabled = true;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let t = 0;
    let last = 0;
    let raf = 0;
    let mounted = true;
    const frame = (now: number) => {
      if (!mounted) return;
      const dt = Math.min(48, now - last || 16);
      last = now;
      t += dt;
      g.clearRect(0, 0, BG_DIMS.W, BG_DIMS.H);
      drawScenicHD(g, region, BG_DIMS, t, reduce);
      if (reduce) return;
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      mounted = false;
      if (raf) cancelAnimationFrame(raf);
    };
  }, [region]);
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full object-cover"
      aria-hidden="true"
    />
  );
};

interface RPGStageMapProps {
  selectedLevel: number;
  getBookProgress: (bookIndex: number) => { completed: number; total: number; percent: number };
  isStageUnlocked: (bookIndex: number, chapter: number) => boolean;
  onChapterClick?: (chapter: number) => void;
  onShowIntro?: () => void;
  look?: Partial<MascotLook>;
}

function generatePathPositions(count: number, viewW: number, cols: number): { x: number; y: number }[] {
  const positions: { x: number; y: number }[] = [];
  const COLS = cols;
  const NODE_SPACING_Y = 90;
  const MARGIN_X = viewW * 0.14;
  const usableWidth = viewW - MARGIN_X * 2;

  for (let i = 0; i < count; i++) {
    const row = Math.floor(i / COLS);
    const colInRow = i % COLS;
    const isEvenRow = row % 2 === 0;
    const col = isEvenRow ? colInRow : (COLS - 1 - colInRow);
    const x = MARGIN_X + (col / (COLS - 1)) * usableWidth;
    const y = 70 + row * NODE_SPACING_Y;
    const wobbleX = Math.sin(i * 1.7) * 6;
    const wobbleY = Math.cos(i * 2.3) * 4;
    positions.push({ x: x + wobbleX, y: y + wobbleY });
  }
  return positions;
}

function buildPathD(positions: { x: number; y: number }[]): string {
  if (positions.length < 2) return "";
  let d = `M ${positions[0].x} ${positions[0].y}`;
  for (let i = 1; i < positions.length; i++) {
    const prev = positions[i - 1];
    const curr = positions[i];
    const cx = (prev.x + curr.x) / 2;
    const cy = (prev.y + curr.y) / 2;
    d += ` Q ${prev.x + (curr.x - prev.x) * 0.15} ${cy}, ${cx} ${cy} T ${curr.x} ${curr.y}`;
  }
  return d;
}

// Dust particle component
const DustParticle = ({ x, y, delay }: { x: number; y: number; delay: number }) => (
  <motion.circle
    cx={x}
    cy={y}
    r={2}
    fill="rgba(217,168,89,0.6)"
    initial={{ opacity: 0, r: 1 }}
    animate={{
      opacity: [0, 0.8, 0],
      r: [1, 3, 0],
      cy: [y, y - 8, y - 15],
      cx: [x, x + (Math.random() - 0.5) * 12, x + (Math.random() - 0.5) * 20],
    }}
    transition={{ duration: 0.8, delay, ease: "easeOut" }}
  />
);

const RPGStageMap = ({ selectedLevel, getBookProgress, isStageUnlocked, onChapterClick, onShowIntro, look }: RPGStageMapProps) => {
  const book = RPG_BIBLE_BOOKS[selectedLevel];
  const progress = book ? getBookProgress(selectedLevel) : { completed: 0, total: 0, percent: 0 };
  const theme = book ? RPG_REGION_THEMES[book.region] : RPG_REGION_THEMES.creation;
  const chapters = book ? Array.from({ length: book.chapters }, (_, i) => i + 1) : [];
  const region = book?.region || "creation";

  const nextChapter = chapters.find((ch) => {
    const unlocked = isStageUnlocked(selectedLevel, ch);
    const completed = progress.completed >= ch && unlocked;
    return unlocked && !completed;
  });

  // desktop: mapa mais largo e com mais colunas → caminho horizontal (tela cheia)
  const [wide, setWide] = useState<boolean>(() => typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const on = () => setWide(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  const VIEW_W = wide ? 820 : 400;
  const COLS = wide ? 7 : 4;
  const pathPositions = useMemo(() => generatePathPositions(chapters.length, VIEW_W, COLS), [chapters.length, VIEW_W, COLS]);

  const viewH = useMemo(() => {
    if (pathPositions.length === 0) return 500;
    return Math.max(500, pathPositions[pathPositions.length - 1].y + 120);
  }, [pathPositions]);

  const fullPathD = useMemo(() => buildPathD(pathPositions), [pathPositions]);
  const completedPathD = useMemo(() => {
    const end = Math.min(progress.completed, pathPositions.length);
    if (end < 2) return "";
    return buildPathD(pathPositions.slice(0, end));
  }, [pathPositions, progress.completed]);

  // ---- herói no mapa: caminhada CONTÍNUA ao longo do traçado (não teleporta) ----
  const mascotTargetIdx = nextChapter !== undefined ? nextChapter - 1 : (progress.completed > 0 ? Math.min(progress.completed, pathPositions.length - 1) : 0);
  const prevMascotIdx = useRef(mascotTargetIdx);
  const [walker, setWalker] = useState<{ x: number; y: number; face: 1 | -1; moving: boolean } | null>(null);
  const [puffs, setPuffs] = useState<{ id: number; x: number; y: number }[]>([]);
  const [burst, setBurst] = useState<{ id: number; x: number; y: number } | null>(null);
  const fxIdRef = useRef(0);

  useEffect(() => {
    const target = pathPositions[mascotTargetIdx];
    if (!target) return;
    const prevIdx = prevMascotIdx.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prevIdx === mascotTargetIdx || !pathPositions[prevIdx] || reduce) {
      setWalker({ x: target.x, y: target.y, face: 1, moving: false });
      prevMascotIdx.current = mascotTargetIdx;
      return;
    }

    // passos entre o nó anterior e o alvo (segue o caminho, nó a nó)
    const dir = mascotTargetIdx > prevIdx ? 1 : -1;
    const steps: { x: number; y: number }[] = [];
    for (let i = prevIdx; dir > 0 ? i <= mascotTargetIdx : i >= mascotTargetIdx; i += dir) {
      if (pathPositions[i]) steps.push(pathPositions[i]);
    }
    prevMascotIdx.current = mascotTargetIdx;
    if (steps.length < 2) {
      setWalker({ x: target.x, y: target.y, face: 1, moving: false });
      return;
    }
    const segs: { a: { x: number; y: number }; b: { x: number; y: number }; len: number }[] = [];
    let total = 0;
    for (let i = 1; i < steps.length; i++) {
      const len = Math.hypot(steps[i].x - steps[i - 1].x, steps[i].y - steps[i - 1].y);
      segs.push({ a: steps[i - 1], b: steps[i], len });
      total += len;
    }
    const SPEED = 105; // px/s (espaço do SVG)
    let raf = 0;
    let lastPuff = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const d = ((now - t0) / 1000) * SPEED;
      if (d >= total) {
        setWalker({ x: target.x, y: target.y, face: 1, moving: false });
        // chegada: explosão de brilhos no nó
        const id = ++fxIdRef.current;
        setBurst({ id, x: target.x, y: target.y });
        window.setTimeout(() => setBurst((b) => (b && b.id === id ? null : b)), 950);
        return;
      }
      let acc = d;
      let seg = segs[0];
      for (const s of segs) { if (acc <= s.len) { seg = s; break; } acc -= s.len; }
      const f = seg.len ? acc / seg.len : 1;
      const x = seg.a.x + (seg.b.x - seg.a.x) * f;
      const y = seg.a.y + (seg.b.y - seg.a.y) * f;
      const face: 1 | -1 = seg.b.x >= seg.a.x ? 1 : -1;
      setWalker({ x, y, face, moving: true });
      // poeirinha nos pés enquanto anda
      if (now - lastPuff > 150) {
        lastPuff = now;
        const id = ++fxIdRef.current;
        setPuffs((ps) => [...ps.slice(-5), { id, x, y }]);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [mascotTargetIdx, pathPositions]);

  if (!book) return null;

  return (
    <motion.div key="stages" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} className="h-full flex flex-col">
      {/* Book header */}
      <div className={`relative rounded-xl overflow-hidden mb-3 p-3 bg-gradient-to-r ${theme.gradient} shrink-0`}>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">{theme.emoji}</span>
            <div className="flex-1 min-w-0">
              <h2 className="text-base font-black text-white">{book.name}</h2>
              {book.hebrewName && (
                <p className="text-[10px] text-amber-100/90 font-medium truncate">{book.hebrewName} — "{book.hebrewMeaning}"</p>
              )}
            </div>
            <div className="flex items-center gap-1.5 ml-auto shrink-0">
              {onShowIntro && (
                <button
                  onClick={onShowIntro}
                  className="p-1.5 rounded-lg bg-white/15 border border-white/30 hover:bg-white/25 transition-all"
                  title="Ler introdução do livro"
                >
                  <ScrollText className="w-3.5 h-3.5 text-white/90" />
                </button>
              )}
              <span className="text-[10px] text-white/85 font-bold">Nível {book.index + 1}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Progress value={progress.percent} className="h-2 flex-1 bg-black/40 [&>div]:bg-white" />
            <span className="text-xs text-white font-bold">{progress.completed}/{progress.total}</span>
          </div>
        </div>
      </div>

      {/* Map — paisagem HD de fundo (fixa) + caminho rolável por cima */}
      <div className="relative flex-1 min-h-0 rounded-xl overflow-hidden border border-white/10" aria-label={`${book.name} map`}>
        <SceneBackdrop region={region} />
        <div className="absolute inset-0 bg-black/15 pointer-events-none" />

        <div className="absolute inset-0 overflow-y-auto">
          <svg viewBox={`0 0 ${VIEW_W} ${viewH}`} className="relative w-full h-auto block" preserveAspectRatio="xMidYMin meet">
            <defs>
              <radialGradient id="nodeDone" cx="35%" cy="30%" r="80%">
                <stop offset="0%" stopColor="#7dedaa" />
                <stop offset="100%" stopColor="#15803d" />
              </radialGradient>
              <radialGradient id="nodeNext" cx="35%" cy="30%" r="80%">
                <stop offset="0%" stopColor="#ffe08a" />
                <stop offset="100%" stopColor="#d97706" />
              </radialGradient>
              <radialGradient id="nodeOpen" cx="35%" cy="30%" r="80%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.45)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.14)" />
              </radialGradient>
              <radialGradient id="nodeLock" cx="35%" cy="30%" r="80%">
                <stop offset="0%" stopColor="rgba(30,30,40,0.72)" />
                <stop offset="100%" stopColor="rgba(0,0,0,0.62)" />
              </radialGradient>
            </defs>

            {/* Estrada: sombra + borda + leito + luz central + pedrinhas */}
            {fullPathD && (
              <>
                <path d={fullPathD} fill="none" stroke="rgba(0,0,0,0.4)" strokeWidth={30} strokeLinecap="round" strokeLinejoin="round" />
                <path d={fullPathD} fill="none" stroke="#4a3520" strokeWidth={25} strokeLinecap="round" strokeLinejoin="round" />
                <path d={fullPathD} fill="none" stroke="#8a6a42" strokeWidth={20} strokeLinecap="round" strokeLinejoin="round" />
                <path d={fullPathD} fill="none" stroke="rgba(255,230,180,0.14)" strokeWidth={11} strokeLinecap="round" strokeLinejoin="round" />
                <path d={fullPathD} fill="none" stroke="rgba(255,240,200,0.45)" strokeWidth={1.8} strokeDasharray="1.5 11" strokeLinecap="round" />
              </>
            )}

            {/* Trecho conquistado: brilho da cor do livro + fluxo animado */}
            {completedPathD && (
              <>
                <path d={completedPathD} fill="none" stroke={theme.accentColor} strokeWidth={20} strokeLinecap="round" strokeLinejoin="round" opacity={0.16} />
                <path d={completedPathD} fill="none" stroke={theme.accentColor} strokeWidth={3} strokeDasharray="7 14" strokeLinecap="round" opacity={0.85}>
                  <animate attributeName="stroke-dashoffset" values="0;-42" dur="2.4s" repeatCount="indefinite" />
                </path>
              </>
            )}

            {/* Chapter nodes */}
            {chapters.map((chapter, i) => {
              const pos = pathPositions[i];
              if (!pos) return null;
                  const unlocked = isStageUnlocked(selectedLevel, chapter);
                  const completed = progress.completed >= chapter && unlocked;
                  const isNext = chapter === nextChapter;
                  const r = 18;
                  const clickable = (unlocked && onChapterClick);

              return (
                <g
                  key={chapter}
                  onClick={() => clickable && onChapterClick?.(chapter)}
                  style={{ cursor: clickable ? "pointer" : "default" }}
                >
                  {isNext && (
                    <circle cx={pos.x} cy={pos.y} r={r + 6} fill="none" stroke={theme.accentColor} strokeWidth={2} opacity={0.5}>
                      <animate attributeName="r" values={`${r + 4};${r + 12};${r + 4}`} dur="1.5s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.6;0;0.6" dur="1.5s" repeatCount="indefinite" />
                    </circle>
                  )}

                  {completed && <circle cx={pos.x} cy={pos.y} r={r + 3} fill="rgba(34,197,94,0.3)" />}
                  {isNext && <circle cx={pos.x} cy={pos.y} r={r + 3} fill="rgba(245,158,11,0.3)" />}

                  {/* sombra do nó no chão (assentado na estrada) */}
                  <ellipse cx={pos.x} cy={pos.y + r * 0.92} rx={r * 0.85} ry={4} fill="rgba(0,0,0,0.32)" />
                  <circle
                    cx={pos.x} cy={pos.y} r={r}
                    fill={completed ? "url(#nodeDone)" : isNext ? "url(#nodeNext)" : unlocked ? "url(#nodeOpen)" : "url(#nodeLock)"}
                    stroke={completed ? "#86efac" : isNext ? "#fcd34d" : unlocked ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.15)"}
                    strokeWidth={3}
                  />
                  {/* specular sutil (nó "vivo") */}
                  <ellipse cx={pos.x - r * 0.3} cy={pos.y - r * 0.42} rx={r * 0.42} ry={r * 0.2} fill="rgba(255,255,255,0.28)" />

                  {/* O NÚMERO do capítulo aparece SEMPRE (sem ambiguidade de qual é a fase) */}
                  <text x={pos.x} y={pos.y + 5} textAnchor="middle" fontSize={13} fontWeight="900"
                    fill={completed ? "#eafff0" : isNext ? "#000" : unlocked ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.4)"}>
                    {chapter}
                  </text>
                  {/* marcador de estado no canto do nó */}
                  {completed ? (
                    <text x={pos.x + r - 2} y={pos.y - r + 8} textAnchor="middle" fontSize={12}>⭐</text>
                  ) : !unlocked ? (
                    <text x={pos.x + r - 2} y={pos.y - r + 8} textAnchor="middle" fontSize={9}>🔒</text>
                  ) : null}
                </g>
              );
            })}

            {/* Flags */}
            {pathPositions[0] && <text x={pathPositions[0].x} y={pathPositions[0].y - 28} textAnchor="middle" fontSize={22}>🏁</text>}

            {/* Boss no nó final: o desafio que fecha o livro */}
            {pathPositions.length > 0 && (() => {
              const last = pathPositions[pathPositions.length - 1];
              const beaten = progress.percent === 100;
              return (
                <g>
                  {!beaten && (
                    <circle cx={last.x} cy={last.y - 30} r={16} fill="rgba(192,57,47,0.25)">
                      <animate attributeName="r" values="14;20;14" dur="1.4s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.5;0.15;0.5" dur="1.4s" repeatCount="indefinite" />
                    </circle>
                  )}
                  {beaten ? (
                    <text x={last.x} y={last.y - 22} textAnchor="middle" fontSize={26}>🏆</text>
                  ) : book ? (
                    <image
                      href={bossThumbnail(book.id, 72)}
                      x={last.x - 19}
                      y={last.y - 47}
                      width={38}
                      height={38}
                      style={{ imageRendering: "pixelated" }}
                    />
                  ) : (
                    <text x={last.x} y={last.y - 24} textAnchor="middle" fontSize={26}>⚔️</text>
                  )}
                  {!beaten && (
                    <text x={last.x} y={last.y - 44} textAnchor="middle" fontSize={9} fill="#fca5a5" fontWeight="bold">
                      BOSS
                    </text>
                  )}
                </g>
              );
            })()}

            {/* Poeirinha contínua enquanto o herói anda */}
            {puffs.map((p) => (
              <DustParticle key={p.id} x={p.x} y={p.y + 8} delay={0} />
            ))}

            {/* Explosão de brilhos na CHEGADA ao nó */}
            {burst && (
              <g key={burst.id}>
                {Array.from({ length: 10 }, (_, i) => {
                  const a = (i / 10) * Math.PI * 2;
                  return (
                    <motion.circle
                      key={i}
                      cx={burst.x} cy={burst.y - 6}
                      r={2}
                      fill={i % 2 ? theme.accentColor : "#fff3c0"}
                      initial={{ opacity: 1, cx: burst.x, cy: burst.y - 6, r: 2.4 }}
                      animate={{
                        opacity: 0,
                        cx: burst.x + Math.cos(a) * 26,
                        cy: burst.y - 6 + Math.sin(a) * 18 - 8,
                        r: 0.4,
                      }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  );
                })}
                <motion.circle
                  cx={burst.x} cy={burst.y}
                  fill="none" stroke={theme.accentColor} strokeWidth={2}
                  initial={{ r: 4, opacity: 0.9 }}
                  animate={{ r: 26, opacity: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                />
              </g>
            )}

            {/* Herói HD caminhando pelo mapa (vira pro lado que anda) */}
            {walker && (
              <foreignObject
                x={walker.x - 29}
                y={walker.y - 66}
                width={120}
                height={72}
                className="overflow-visible pointer-events-none"
              >
                <div className="relative flex items-end gap-1">
                  <div className="flex-shrink-0">
                    <RPGHeroCanvasHD look={look} frame="close" walking={walker.moving} face={walker.face} size={58} />
                  </div>
                  {/* balão à direita quando parado no próximo desafio */}
                  {!walker.moving && (
                    <motion.div
                      className="relative pointer-events-none mb-8"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.55 }}
                    >
                      <div className="relative rounded-lg px-1.5 py-0.5 text-[7px] font-bold bg-gradient-to-br from-[#1A2E50] to-[#243B63] text-blue-100 shadow-[0_2px_10px_rgba(59,130,246,0.3)] border border-blue-400/30 whitespace-nowrap">
                        Vamos! ⚔️
                        <div className="absolute left-[-4px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[3px] border-t-transparent border-b-[3px] border-b-transparent border-r-[4px] border-r-[#1A2E50]" />
                      </div>
                    </motion.div>
                  )}
                </div>
              </foreignObject>
            )}
          </svg>

          {/* Book completed */}
          {progress.percent === 100 && (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className={`mt-4 mx-auto max-w-[420px] p-4 rounded-xl bg-gradient-to-r ${theme.gradient} relative overflow-hidden text-center`}>
              <div className="absolute inset-0 bg-black/40" />
              <div className="relative z-10 flex flex-col items-center gap-2">
                <RPGHeroCanvasHD look={look} mood="happy" size={110} />
                <Trophy className="w-8 h-8 text-white" />
                <p className="font-black text-white">LIVRO COMPLETO!</p>
                <p className="text-xs text-white/60">Boss derrotado — {book.name} conquistado</p>
              </div>
            </motion.div>
          )}
          <div className="h-8" />
        </div>
      </div>
    </motion.div>
  );
};

export default RPGStageMap;
