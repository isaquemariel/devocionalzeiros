import { motion } from "framer-motion";
import { Lock, BookOpen, Trophy } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { RPG_BIBLE_BOOKS, RPG_REGION_THEMES, RPGRegion } from "@/lib/rpgBibleData";
import { Mascot3D } from "@/components/shared/Mascot3D";
import { useMemo } from "react";

// Background images per region
import bgCreation from "@/assets/rpg-bg-creation.jpg";
import bgDesert from "@/assets/rpg-bg-desert.jpg";
import bgConquest from "@/assets/rpg-bg-conquest.jpg";
import bgKingdom from "@/assets/rpg-bg-kingdom.jpg";
import bgExile from "@/assets/rpg-bg-exile.jpg";
import bgWisdom from "@/assets/rpg-bg-wisdom.jpg";
import bgProphets from "@/assets/rpg-bg-prophets.jpg";
import bgMinorProphets from "@/assets/rpg-bg-minor-prophets.jpg";
import bgGospels from "@/assets/rpg-bg-gospels.jpg";
import bgActs from "@/assets/rpg-bg-acts.jpg";
import bgEpistles from "@/assets/rpg-bg-epistles.jpg";
import bgRevelation from "@/assets/rpg-bg-revelation.jpg";

const REGION_BG_IMAGE: Record<RPGRegion, string> = {
  creation: bgCreation,
  desert: bgDesert,
  conquest: bgConquest,
  kingdom: bgKingdom,
  exile: bgExile,
  wisdom: bgWisdom,
  prophets: bgProphets,
  minor_prophets: bgMinorProphets,
  gospels: bgGospels,
  acts: bgActs,
  epistles: bgEpistles,
  revelation: bgRevelation,
};

interface RPGStageMapProps {
  selectedLevel: number;
  getBookProgress: (bookIndex: number) => { completed: number; total: number; percent: number };
  isStageUnlocked: (bookIndex: number, chapter: number) => boolean;
}

// Generate winding snake-path positions fitting inside the SVG viewBox
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

// Build SVG quadratic bezier path string
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

const RPGStageMap = ({ selectedLevel, getBookProgress, isStageUnlocked }: RPGStageMapProps) => {
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

  // Current mascot position
  const mascotIdx = nextChapter !== undefined ? nextChapter - 1 : null;
  const mascotPos = mascotIdx !== null ? pathPositions[mascotIdx] : null;

  if (!book) return null;

  const bgImage = REGION_BG_IMAGE[region];

  return (
    <motion.div
      key="stages"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
    >
      {/* Book header */}
      <div className={`relative rounded-xl overflow-hidden mb-3 p-3 bg-gradient-to-r ${theme.gradient}`}>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">{theme.emoji}</span>
            <BookOpen className="w-4 h-4 text-white/80" />
            <h2 className="text-base font-black text-white">{book.name}</h2>
            <span className="text-[10px] text-white/50 ml-auto">Nível {book.index + 1}</span>
          </div>
          <div className="flex items-center gap-2">
            <Progress value={progress.percent} className="h-2 flex-1 bg-black/30 [&>div]:bg-white/80" />
            <span className="text-xs text-white/70 font-bold">{progress.completed}/{progress.total}</span>
          </div>
        </div>
      </div>

      {/* Scrollable map area — responsive height */}
      <ScrollArea className="h-[calc(100vh-220px)]">
        {/* Map container — fully responsive via SVG viewBox */}
        <div className="relative w-full rounded-xl overflow-hidden border border-white/10">
          {/* Themed background image */}
          <img
            src={bgImage}
            alt={`${book.name} map`}
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
          />
          {/* Dark overlay so nodes and path are visible */}
          <div className="absolute inset-0 bg-black/40" />

          {/* SVG with viewBox scales to any container size */}
          <svg
            viewBox={`0 0 ${VIEW_W} ${viewH}`}
            className="relative w-full h-auto block"
            preserveAspectRatio="xMidYMin meet"
          >
            {/* Dirt path shadow */}
            {fullPathD && (
              <>
                <path d={fullPathD} fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth={28} strokeLinecap="round" strokeLinejoin="round" />
                <path d={fullPathD} fill="none" stroke="#5C3D2E" strokeWidth={22} strokeLinecap="round" strokeLinejoin="round" />
                <path d={fullPathD} fill="none" stroke="#8B6914" strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" opacity={0.3} />
                <path d={fullPathD} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={2} strokeDasharray="6 10" strokeLinecap="round" />
              </>
            )}

            {/* Completed path glow */}
            {completedPathD && (
              <>
                <path d={completedPathD} fill="none" stroke={theme.accentColor} strokeWidth={24} strokeLinecap="round" strokeLinejoin="round" opacity={0.15} />
                <path d={completedPathD} fill="none" stroke={theme.accentColor} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" opacity={0.25} />
              </>
            )}

            {/* Chapter nodes — inside SVG so they stay on the path */}
            {chapters.map((chapter, i) => {
              const pos = pathPositions[i];
              if (!pos) return null;
              const unlocked = isStageUnlocked(selectedLevel, chapter);
              const completed = progress.completed >= chapter && unlocked;
              const isNext = chapter === nextChapter;
              const r = 18;

              return (
                <g key={chapter}>
                  {/* Pulse ring for next */}
                  {isNext && (
                    <circle cx={pos.x} cy={pos.y} r={r + 6} fill="none" stroke={theme.accentColor} strokeWidth={2} opacity={0.5}>
                      <animate attributeName="r" values={`${r + 4};${r + 12};${r + 4}`} dur="1.5s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.6;0;0.6" dur="1.5s" repeatCount="indefinite" />
                    </circle>
                  )}

                  {/* Node outer glow */}
                  {completed && (
                    <circle cx={pos.x} cy={pos.y} r={r + 3} fill="rgba(34,197,94,0.3)" />
                  )}
                  {isNext && (
                    <circle cx={pos.x} cy={pos.y} r={r + 3} fill="rgba(245,158,11,0.3)" />
                  )}

                  {/* Node circle */}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={r}
                    fill={
                      completed ? "#22c55e"
                        : isNext ? "#f59e0b"
                        : unlocked ? "rgba(255,255,255,0.25)"
                        : "rgba(0,0,0,0.5)"
                    }
                    stroke={
                      completed ? "#86efac"
                        : isNext ? "#fcd34d"
                        : unlocked ? "rgba(255,255,255,0.4)"
                        : "rgba(255,255,255,0.15)"
                    }
                    strokeWidth={3}
                  />

                  {/* Node inner — star, number, or lock */}
                  {completed ? (
                    <text x={pos.x} y={pos.y + 5} textAnchor="middle" fontSize={16}>⭐</text>
                  ) : !unlocked ? (
                    <text x={pos.x} y={pos.y + 5} textAnchor="middle" fontSize={12} fill="rgba(255,255,255,0.3)">🔒</text>
                  ) : (
                    <text
                      x={pos.x}
                      y={pos.y + 5}
                      textAnchor="middle"
                      fontSize={13}
                      fontWeight="900"
                      fill={isNext ? "#000" : "rgba(255,255,255,0.8)"}
                    >
                      {chapter}
                    </text>
                  )}

                  {/* Milestone label */}
                  {(chapter === 1 || chapter === chapters.length || chapter % 10 === 0) && (
                    <text x={pos.x} y={pos.y + r + 14} textAnchor="middle" fontSize={9} fill="rgba(255,255,255,0.5)" fontWeight="bold">
                      {chapter}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Start flag */}
            {pathPositions[0] && (
              <text x={pathPositions[0].x} y={pathPositions[0].y - 28} textAnchor="middle" fontSize={22}>🏁</text>
            )}

            {/* End flag */}
            {pathPositions.length > 0 && (
              <text
                x={pathPositions[pathPositions.length - 1].x + 22}
                y={pathPositions[pathPositions.length - 1].y - 8}
                fontSize={22}
              >
                {progress.percent === 100 ? "🏆" : "🚩"}
              </text>
            )}

            {/* Mascot on current stage — rendered inside SVG via foreignObject */}
            {mascotPos && (
              <foreignObject
                x={mascotPos.x - 24}
                y={mascotPos.y - 58}
                width={48}
                height={48}
                className="overflow-visible pointer-events-none"
              >
                <div className="w-12 h-12 animate-bounce">
                  <Mascot3D mood="happy" size="sm" />
                </div>
              </foreignObject>
            )}
          </svg>
        </div>

        {/* Book completed celebration */}
        {progress.percent === 100 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`mt-4 mx-auto max-w-[420px] p-4 rounded-xl bg-gradient-to-r ${theme.gradient} relative overflow-hidden text-center`}
          >
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative z-10 flex flex-col items-center gap-2">
              <Mascot3D mood="champion" size="md" />
              <Trophy className="w-8 h-8 text-white" />
              <p className="font-black text-white">LIVRO COMPLETO!</p>
              <p className="text-xs text-white/60">Boss derrotado — {book.name} conquistado</p>
            </div>
          </motion.div>
        )}

        <div className="h-8" />
      </ScrollArea>
    </motion.div>
  );
};

export default RPGStageMap;
