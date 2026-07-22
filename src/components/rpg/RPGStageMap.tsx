import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Trophy, ScrollText } from "lucide-react";

import { Progress } from "@/components/ui/progress";
import { RPG_BIBLE_BOOKS, RPG_REGION_THEMES, RPGRegion } from "@/lib/rpgBibleData";
import RPGMascotCanvas from "@/components/rpg/RPGMascotCanvas";
import { drawScene, seedParticles, type Particle, type SceneDims } from "@/lib/rpgScene";
import { setupHiResCanvas } from "@/lib/rpgCanvas";

// Pixel-art backdrop dimensions (portrait, so the scene fills the map viewport)
const BG_DIMS: SceneDims = { W: 256, H: 384, GROUND: 250 };

/** Animated pixel-art scene used as the fixed backdrop behind the scrolling path. */
const SceneBackdrop = ({ region }: { region: RPGRegion }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const g = setupHiResCanvas(canvas, BG_DIMS.W, BG_DIMS.H, 5);
    if (!g) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seed = 7;
    const rand = () => {
      seed = (seed * 1103515245 + 12345) & 0x7fffffff;
      return seed / 0x7fffffff;
    };
    const particles: Particle[] = seedParticles(region, BG_DIMS, rand);
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
      drawScene(g, { region, dims: BG_DIMS, particles, t, scroll: 0, reduce });
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
}

function generatePathPositions(count: number, viewW: number): { x: number; y: number }[] {
  const positions: { x: number; y: number }[] = [];
  const COLS = 4;
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

const VIEW_W = 400;

// Boss temático por região — enfrentado ao concluir o último capítulo do livro
const BOSS_EMOJI: Record<RPGRegion, string> = {
  creation: "🐍", desert: "🦗", conquest: "🏰", kingdom: "⚔️", exile: "🦁",
  wisdom: "🌀", prophets: "🔥", minor_prophets: "🐋", gospels: "⛈️",
  acts: "⛓️", epistles: "🐺", revelation: "🐉",
};

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

const RPGStageMap = ({ selectedLevel, getBookProgress, isStageUnlocked, onChapterClick, onShowIntro }: RPGStageMapProps) => {
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

  const pathPositions = useMemo(() => generatePathPositions(chapters.length, VIEW_W), [chapters.length]);

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

  // Mascot smooth animation state
  const mascotTargetIdx = nextChapter !== undefined ? nextChapter - 1 : (progress.completed > 0 ? Math.min(progress.completed, pathPositions.length - 1) : 0);
  const prevMascotIdx = useRef(mascotTargetIdx);
  const [mascotAnimPos, setMascotAnimPos] = useState<{ x: number; y: number } | null>(null);
  const [showDust, setShowDust] = useState(false);

  // Smooth mascot walk animation
  useEffect(() => {
    const pos = pathPositions[mascotTargetIdx];
    if (!pos) return;

    const prevIdx = prevMascotIdx.current;
    if (prevIdx !== mascotTargetIdx && pathPositions[prevIdx]) {
      // Animate walking through intermediate nodes
      const start = Math.min(prevIdx, mascotTargetIdx);
      const end = Math.max(prevIdx, mascotTargetIdx);
      const direction = mascotTargetIdx > prevIdx ? 1 : -1;
      const steps: { x: number; y: number }[] = [];
      for (let i = prevIdx; direction > 0 ? i <= mascotTargetIdx : i >= mascotTargetIdx; i += direction) {
        if (pathPositions[i]) steps.push(pathPositions[i]);
      }

      setShowDust(true);
      let stepIdx = 0;
      const walkInterval = setInterval(() => {
        if (stepIdx < steps.length) {
          setMascotAnimPos(steps[stepIdx]);
          stepIdx++;
        } else {
          clearInterval(walkInterval);
          setShowDust(false);
        }
      }, 200);

      prevMascotIdx.current = mascotTargetIdx;
      return () => clearInterval(walkInterval);
    } else {
      setMascotAnimPos(pos);
      prevMascotIdx.current = mascotTargetIdx;
    }
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

      {/* Map — cena pixel-art de fundo (fixa) + caminho rolável por cima */}
      <div className="relative flex-1 min-h-0 rounded-xl overflow-hidden border border-white/10" aria-label={`${book.name} map`}>
        <SceneBackdrop region={region} />
        <div className="absolute inset-0 bg-black/30 pointer-events-none" />

        <div className="absolute inset-0 overflow-y-auto">
          <svg viewBox={`0 0 ${VIEW_W} ${viewH}`} className="relative w-full h-auto block" preserveAspectRatio="xMidYMin meet">
            {/* Path */}
            {fullPathD && (
              <>
                <path d={fullPathD} fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth={28} strokeLinecap="round" strokeLinejoin="round" />
                <path d={fullPathD} fill="none" stroke="#5C3D2E" strokeWidth={22} strokeLinecap="round" strokeLinejoin="round" />
                <path d={fullPathD} fill="none" stroke="#8B6914" strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" opacity={0.3} />
                <path d={fullPathD} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={2} strokeDasharray="6 10" strokeLinecap="round" />
              </>
            )}

            {completedPathD && (
              <>
                <path d={completedPathD} fill="none" stroke={theme.accentColor} strokeWidth={24} strokeLinecap="round" strokeLinejoin="round" opacity={0.15} />
                <path d={completedPathD} fill="none" stroke={theme.accentColor} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" opacity={0.25} />
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

                  <circle
                    cx={pos.x} cy={pos.y} r={r}
                    fill={completed ? "#22c55e" : isNext ? "#f59e0b" : unlocked ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.5)"}
                    stroke={completed ? "#86efac" : isNext ? "#fcd34d" : unlocked ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.15)"}
                    strokeWidth={3}
                  />

                  {completed ? (
                    <text x={pos.x} y={pos.y + 5} textAnchor="middle" fontSize={16}>⭐</text>
                  ) : !unlocked ? (
                    <text x={pos.x} y={pos.y + 5} textAnchor="middle" fontSize={12} fill="rgba(255,255,255,0.3)">🔒</text>
                  ) : (
                    <text x={pos.x} y={pos.y + 5} textAnchor="middle" fontSize={13} fontWeight="900" fill={isNext ? "#000" : "rgba(255,255,255,0.8)"}>
                      {chapter}
                    </text>
                  )}

                  {(chapter === 1 || chapter === chapters.length || chapter % 10 === 0) && (
                    <text x={pos.x} y={pos.y + r + 14} textAnchor="middle" fontSize={9} fill="rgba(255,255,255,0.5)" fontWeight="bold">
                      {chapter}
                    </text>
                  )}
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
                  <text x={last.x} y={last.y - 24} textAnchor="middle" fontSize={26}>
                    {beaten ? "🏆" : BOSS_EMOJI[region]}
                  </text>
                  {!beaten && (
                    <text x={last.x} y={last.y - 44} textAnchor="middle" fontSize={9} fill="#fca5a5" fontWeight="bold">
                      BOSS
                    </text>
                  )}
                </g>
              );
            })()}

            {/* Dust particles during walk */}
            {showDust && mascotAnimPos && (
              <>
                {[0, 0.1, 0.2, 0.3, 0.4].map((delay, i) => (
                  <DustParticle key={`dust-${i}`} x={mascotAnimPos.x} y={mascotAnimPos.y + 10} delay={delay} />
                ))}
              </>
            )}

            {/* Animated Mascot - centered on current stage node */}
            {mascotAnimPos && (
              <foreignObject
                x={mascotAnimPos.x - 24}
                y={mascotAnimPos.y - 56}
                width={100}
                height={48}
                className="overflow-visible pointer-events-none"
              >
                <div className="relative flex items-center gap-1">
                  <div className="flex-shrink-0">
                    <RPGMascotCanvas mood="idle" walking={showDust} size={46} />
                  </div>
                  {/* Speech bubble to the right of mascot */}
                  {!showDust && (
                    <motion.div
                      className="relative pointer-events-none"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 }}
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
                <RPGMascotCanvas mood="happy" size={92} />
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
