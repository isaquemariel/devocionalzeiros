import { motion } from "framer-motion";
import { Lock, BookOpen, Trophy } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { RPG_BIBLE_BOOKS, RPG_REGION_THEMES, RPGRegion } from "@/lib/rpgBibleData";
import { Mascot3D } from "@/components/shared/Mascot3D";
import { useMemo } from "react";

// Region-specific themed terrain — contextual to each biblical era
const REGION_TERRAIN: Record<RPGRegion, { emoji: string; count: number }[]> = {
  creation: [
    { emoji: "🌳", count: 5 }, { emoji: "🌿", count: 4 }, { emoji: "🦋", count: 2 }, { emoji: "🌺", count: 3 },
  ],
  desert: [
    { emoji: "🌵", count: 5 }, { emoji: "🏜️", count: 3 }, { emoji: "🦂", count: 2 }, { emoji: "💀", count: 1 },
  ],
  conquest: [
    { emoji: "⚔️", count: 4 }, { emoji: "🏹", count: 3 }, { emoji: "🛡️", count: 3 }, { emoji: "🗡️", count: 2 },
  ],
  kingdom: [
    { emoji: "🏰", count: 3 }, { emoji: "👑", count: 3 }, { emoji: "⚜️", count: 3 }, { emoji: "🏛️", count: 2 },
  ],
  exile: [
    { emoji: "🧱", count: 4 }, { emoji: "⛓️", count: 3 }, { emoji: "🕊️", count: 2 }, { emoji: "🏚️", count: 2 },
  ],
  wisdom: [
    { emoji: "📜", count: 4 }, { emoji: "🕯️", count: 4 }, { emoji: "🎵", count: 2 }, { emoji: "📖", count: 3 },
  ],
  prophets: [
    { emoji: "🔥", count: 4 }, { emoji: "👁️", count: 3 }, { emoji: "⚡", count: 3 }, { emoji: "💫", count: 2 },
  ],
  minor_prophets: [
    { emoji: "📣", count: 3 }, { emoji: "🌊", count: 3 }, { emoji: "🐋", count: 1 }, { emoji: "🌬️", count: 2 },
  ],
  gospels: [
    { emoji: "✝️", count: 3 }, { emoji: "🕊️", count: 4 }, { emoji: "🐑", count: 3 }, { emoji: "⛪", count: 2 },
  ],
  acts: [
    { emoji: "🔥", count: 3 }, { emoji: "🌍", count: 2 }, { emoji: "⛵", count: 3 }, { emoji: "📜", count: 2 },
  ],
  epistles: [
    { emoji: "✉️", count: 3 }, { emoji: "📖", count: 3 }, { emoji: "🙏", count: 2 }, { emoji: "⛪", count: 2 },
  ],
  revelation: [
    { emoji: "🌟", count: 4 }, { emoji: "👑", count: 3 }, { emoji: "🔥", count: 3 }, { emoji: "🦁", count: 2 },
  ],
};

// Region-specific ground CSS textures for strong themed backgrounds
const REGION_BG_STYLE: Record<RPGRegion, React.CSSProperties> = {
  creation: {
    backgroundImage: `
      radial-gradient(ellipse at 30% 20%, rgba(34,197,94,0.25) 0%, transparent 50%),
      radial-gradient(ellipse at 70% 60%, rgba(59,130,246,0.15) 0%, transparent 50%),
      radial-gradient(ellipse at 50% 90%, rgba(34,197,94,0.2) 0%, transparent 40%),
      repeating-conic-gradient(rgba(34,197,94,0.03) 0% 25%, transparent 25% 50%) 
    `,
  },
  desert: {
    backgroundImage: `
      radial-gradient(ellipse at 40% 30%, rgba(245,158,11,0.3) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 70%, rgba(234,88,12,0.2) 0%, transparent 50%),
      radial-gradient(ellipse at 20% 80%, rgba(180,83,9,0.15) 0%, transparent 40%),
      repeating-linear-gradient(45deg, rgba(245,158,11,0.04) 0px, transparent 4px, transparent 8px)
    `,
  },
  conquest: {
    backgroundImage: `
      radial-gradient(ellipse at 50% 30%, rgba(239,68,68,0.2) 0%, transparent 50%),
      radial-gradient(ellipse at 20% 70%, rgba(185,28,28,0.15) 0%, transparent 40%),
      repeating-linear-gradient(135deg, rgba(239,68,68,0.03) 0px, transparent 3px, transparent 6px)
    `,
  },
  kingdom: {
    backgroundImage: `
      radial-gradient(ellipse at 50% 20%, rgba(168,85,247,0.25) 0%, transparent 50%),
      radial-gradient(ellipse at 30% 70%, rgba(217,119,6,0.2) 0%, transparent 40%),
      radial-gradient(ellipse at 80% 50%, rgba(168,85,247,0.1) 0%, transparent 50%)
    `,
  },
  exile: {
    backgroundImage: `
      radial-gradient(ellipse at 50% 40%, rgba(120,113,108,0.25) 0%, transparent 50%),
      radial-gradient(ellipse at 30% 80%, rgba(87,83,78,0.2) 0%, transparent 40%),
      repeating-linear-gradient(0deg, rgba(120,113,108,0.05) 0px, transparent 2px, transparent 8px)
    `,
  },
  wisdom: {
    backgroundImage: `
      radial-gradient(ellipse at 50% 30%, rgba(234,179,8,0.2) 0%, transparent 50%),
      radial-gradient(ellipse at 20% 60%, rgba(168,85,247,0.15) 0%, transparent 40%),
      radial-gradient(ellipse at 80% 80%, rgba(234,179,8,0.1) 0%, transparent 40%)
    `,
  },
  prophets: {
    backgroundImage: `
      radial-gradient(ellipse at 40% 25%, rgba(239,68,68,0.3) 0%, transparent 50%),
      radial-gradient(ellipse at 70% 70%, rgba(245,158,11,0.2) 0%, transparent 50%),
      repeating-linear-gradient(90deg, rgba(239,68,68,0.03) 0px, transparent 2px, transparent 6px)
    `,
  },
  minor_prophets: {
    backgroundImage: `
      radial-gradient(ellipse at 50% 40%, rgba(6,182,212,0.2) 0%, transparent 50%),
      radial-gradient(ellipse at 30% 70%, rgba(34,211,238,0.15) 0%, transparent 40%)
    `,
  },
  gospels: {
    backgroundImage: `
      radial-gradient(ellipse at 50% 30%, rgba(234,179,8,0.3) 0%, transparent 50%),
      radial-gradient(ellipse at 30% 70%, rgba(253,224,71,0.15) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 50%, rgba(250,204,21,0.1) 0%, transparent 40%)
    `,
  },
  acts: {
    backgroundImage: `
      radial-gradient(ellipse at 40% 30%, rgba(239,68,68,0.25) 0%, transparent 50%),
      radial-gradient(ellipse at 70% 60%, rgba(59,130,246,0.2) 0%, transparent 50%)
    `,
  },
  epistles: {
    backgroundImage: `
      radial-gradient(ellipse at 50% 30%, rgba(99,102,241,0.2) 0%, transparent 50%),
      radial-gradient(ellipse at 30% 70%, rgba(139,92,246,0.15) 0%, transparent 40%)
    `,
  },
  revelation: {
    backgroundImage: `
      radial-gradient(ellipse at 50% 20%, rgba(234,179,8,0.35) 0%, transparent 40%),
      radial-gradient(ellipse at 30% 60%, rgba(239,68,68,0.25) 0%, transparent 50%),
      radial-gradient(ellipse at 70% 80%, rgba(168,85,247,0.2) 0%, transparent 40%),
      repeating-linear-gradient(60deg, rgba(234,179,8,0.04) 0px, transparent 3px, transparent 6px)
    `,
  },
};

interface RPGStageMapProps {
  selectedLevel: number;
  getBookProgress: (bookIndex: number) => { completed: number; total: number; percent: number };
  isStageUnlocked: (bookIndex: number, chapter: number) => boolean;
}

// Generate winding path positions — responsive via a scale factor
function generatePathPositions(count: number, mapWidth: number): { x: number; y: number }[] {
  const positions: { x: number; y: number }[] = [];
  const COLS = 4;
  const NODE_SPACING_Y = 80;
  const MARGIN_X = mapWidth * 0.12;
  const usableWidth = mapWidth - MARGIN_X * 2;

  for (let i = 0; i < count; i++) {
    const row = Math.floor(i / COLS);
    const colInRow = i % COLS;
    const isEvenRow = row % 2 === 0;
    const col = isEvenRow ? colInRow : (COLS - 1 - colInRow);
    const x = MARGIN_X + (col / (COLS - 1)) * usableWidth;
    const y = 60 + row * NODE_SPACING_Y;
    const wobbleX = Math.sin(i * 1.7) * 8;
    const wobbleY = Math.cos(i * 2.3) * 5;
    positions.push({ x: x + wobbleX, y: y + wobbleY });
  }
  return positions;
}

// Generate terrain items positioned around the path
function generateTerrainItems(region: RPGRegion, pathPositions: { x: number; y: number }[], mapWidth: number, mapHeight: number) {
  const terrain = REGION_TERRAIN[region];
  const items: { emoji: string; x: number; y: number; size: number; delay: number }[] = [];
  let seed = region.length * 17;
  const rand = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };

  terrain.forEach(({ emoji, count }) => {
    for (let i = 0; i < count; i++) {
      const x = 10 + rand() * (mapWidth - 20);
      const y = 30 + rand() * (mapHeight - 60);
      const tooClose = pathPositions.some(p => Math.abs(p.x - x) < 35 && Math.abs(p.y - y) < 35);
      if (tooClose) continue;
      items.push({ emoji, x, y, size: 18 + rand() * 14, delay: rand() * 5 });
    }
  });
  return items;
}

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

  // Responsive map width
  const MAP_WIDTH = 420;

  const pathPositions = useMemo(() => generatePathPositions(chapters.length, MAP_WIDTH), [chapters.length]);
  const mapHeight = useMemo(() => {
    if (pathPositions.length === 0) return 400;
    return Math.max(400, pathPositions[pathPositions.length - 1].y + 120);
  }, [pathPositions]);
  const terrainItems = useMemo(
    () => generateTerrainItems(region, pathPositions, MAP_WIDTH, mapHeight),
    [region, pathPositions, mapHeight]
  );

  // SVG path connecting all nodes
  const pathD = useMemo(() => {
    if (pathPositions.length < 2) return "";
    let d = `M ${pathPositions[0].x} ${pathPositions[0].y}`;
    for (let i = 1; i < pathPositions.length; i++) {
      const prev = pathPositions[i - 1];
      const curr = pathPositions[i];
      const cpx = (prev.x + curr.x) / 2;
      const cpy = (prev.y + curr.y) / 2;
      d += ` Q ${prev.x + (curr.x - prev.x) * 0.1} ${cpy}, ${cpx} ${cpy}`;
      d += ` T ${curr.x} ${curr.y}`;
    }
    return d;
  }, [pathPositions]);

  // Completed path
  const completedPathD = useMemo(() => {
    const completedCount = progress.completed;
    if (completedCount < 2 || pathPositions.length < 2) return "";
    const end = Math.min(completedCount, pathPositions.length);
    let d = `M ${pathPositions[0].x} ${pathPositions[0].y}`;
    for (let i = 1; i < end; i++) {
      const prev = pathPositions[i - 1];
      const curr = pathPositions[i];
      const cpx = (prev.x + curr.x) / 2;
      const cpy = (prev.y + curr.y) / 2;
      d += ` Q ${prev.x + (curr.x - prev.x) * 0.1} ${cpy}, ${cpx} ${cpy}`;
      d += ` T ${curr.x} ${curr.y}`;
    }
    return d;
  }, [pathPositions, progress.completed]);

  // Find position of the mascot (current next chapter)
  const mascotPos = useMemo(() => {
    if (nextChapter === undefined) return null;
    const idx = nextChapter - 1;
    return pathPositions[idx] || null;
  }, [nextChapter, pathPositions]);

  if (!book) return null;

  const regionBgStyle = REGION_BG_STYLE[region] || {};

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

      <ScrollArea className="h-[calc(100vh-240px)]">
        {/* === 2D RPG OVERWORLD MAP — responsive container === */}
        <div
          className="relative rounded-xl overflow-hidden mx-auto w-full max-w-[420px] md:max-w-[600px] lg:max-w-[700px]"
          style={{ height: mapHeight, aspectRatio: `${MAP_WIDTH} / ${mapHeight}` }}
        >
          {/* Strong themed background */}
          <div className={`absolute inset-0 bg-gradient-to-b ${theme.bgGradient}`} />
          <div className="absolute inset-0" style={regionBgStyle} />

          {/* Subtle grid overlay for RPG feel */}
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }} />

          {/* Terrain decorations */}
          {terrainItems.map((item, i) => (
            <motion.div
              key={`terrain-${i}`}
              className="absolute pointer-events-none select-none"
              style={{
                left: `${(item.x / MAP_WIDTH) * 100}%`,
                top: item.y,
                fontSize: item.size,
                zIndex: 1,
              }}
              animate={{ y: [-2, 2, -2], rotate: [-1, 1, -1] }}
              transition={{ duration: 4 + item.delay, repeat: Infinity, ease: "easeInOut" }}
            >
              {item.emoji}
            </motion.div>
          ))}

          {/* SVG layer: path */}
          <svg
            className="absolute inset-0 z-10 w-full h-full"
            viewBox={`0 0 ${MAP_WIDTH} ${mapHeight}`}
            preserveAspectRatio="xMidYMin meet"
          >
            {pathD && (
              <>
                {/* Dirt path shadow */}
                <path d={pathD} fill="none" stroke="rgba(0,0,0,0.35)" strokeWidth={30} strokeLinecap="round" strokeLinejoin="round" />
                {/* Dirt path base */}
                <path d={pathD} fill="none" stroke="#5C3D2E" strokeWidth={26} strokeLinecap="round" strokeLinejoin="round" />
                {/* Lighter center */}
                <path d={pathD} fill="none" stroke="#8B6914" strokeWidth={18} strokeLinecap="round" strokeLinejoin="round" opacity={0.35} />
                {/* Dotted center */}
                <path d={pathD} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={2} strokeDasharray="6 10" strokeLinecap="round" />
              </>
            )}
            {/* Completed path glow */}
            {completedPathD && (
              <>
                <path d={completedPathD} fill="none" stroke={theme.accentColor} strokeWidth={28} strokeLinecap="round" strokeLinejoin="round" opacity={0.12} />
                <path d={completedPathD} fill="none" stroke={theme.accentColor} strokeWidth={18} strokeLinecap="round" strokeLinejoin="round" opacity={0.2} />
              </>
            )}
          </svg>

          {/* Chapter nodes — positioned with percentages for responsiveness */}
          {chapters.map((chapter, i) => {
            const pos = pathPositions[i];
            if (!pos) return null;
            const unlocked = isStageUnlocked(selectedLevel, chapter);
            const completed = progress.completed >= chapter && unlocked;
            const isNext = chapter === nextChapter;

            return (
              <div
                key={chapter}
                className="absolute z-20"
                style={{
                  left: `${(pos.x / MAP_WIDTH) * 100}%`,
                  top: pos.y,
                  width: 44,
                  height: 44,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <motion.button
                  disabled={!unlocked}
                  className={`w-11 h-11 rounded-full flex items-center justify-center border-[3px] font-black text-sm transition-all relative ${
                    completed
                      ? "bg-green-500 border-green-300 text-white shadow-[0_0_12px_rgba(34,197,94,0.5),0_4px_0_#166534]"
                      : isNext
                      ? "bg-amber-500 border-amber-300 text-black shadow-[0_0_20px_rgba(245,158,11,0.6),0_4px_0_#92400e]"
                      : unlocked
                      ? "bg-white/20 border-white/30 text-white/80 shadow-[0_4px_0_rgba(0,0,0,0.3)]"
                      : "bg-black/30 border-white/10 text-white/20 shadow-[0_2px_0_rgba(0,0,0,0.2)]"
                  }`}
                  whileTap={unlocked ? { scale: 0.85, y: 4 } : {}}
                  whileHover={unlocked ? { scale: 1.1 } : {}}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.012, type: "spring", stiffness: 300 }}
                >
                  {!unlocked ? (
                    <Lock className="w-3.5 h-3.5" />
                  ) : completed ? (
                    <span className="text-sm">⭐</span>
                  ) : (
                    <span>{chapter}</span>
                  )}

                  {/* Pulse ring on next chapter */}
                  {isNext && (
                    <motion.div
                      className="absolute inset-[-6px] rounded-full border-2 border-amber-400/60"
                      animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                </motion.button>

                {/* Chapter label for milestones */}
                {(chapter === 1 || chapter === chapters.length || chapter % 10 === 0) && (
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-[8px] text-white/40 font-bold whitespace-nowrap">
                    {chapter}
                  </div>
                )}
              </div>
            );
          })}

          {/* MASCOT — walking character on the current stage */}
          {mascotPos && (
            <motion.div
              className="absolute z-30 pointer-events-none"
              style={{
                left: `${(mascotPos.x / MAP_WIDTH) * 100}%`,
                top: mascotPos.y,
                transform: "translate(-50%, -100%)",
              }}
              // Smooth walking animation: bob + sway
              animate={{
                y: [-2, -8, -2],
                rotate: [-3, 3, -3],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="relative">
                <Mascot3D mood="happy" size="sm" />
                {/* Speech bubble */}
                <motion.div
                  className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-amber-500/90 text-black text-[8px] font-bold px-2 py-0.5 rounded-full shadow-lg"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: [0, 1, 1, 0], scale: [0, 1, 1, 0.8] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                >
                  Vamos! ⚔️
                </motion.div>
                {/* Walking "dust" effect */}
                <motion.div
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5"
                  animate={{ opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 0.4, repeat: Infinity }}
                >
                  <span className="text-[6px] text-white/30">💨</span>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Start flag */}
          {pathPositions[0] && (
            <div
              className="absolute z-15 pointer-events-none"
              style={{ left: `${(pathPositions[0].x / MAP_WIDTH) * 100}%`, top: pathPositions[0].y - 35, transform: "translateX(-50%)" }}
            >
              <span className="text-xl">🏁</span>
            </div>
          )}

          {/* End flag */}
          {pathPositions.length > 0 && pathPositions[pathPositions.length - 1] && (
            <div
              className="absolute z-15 pointer-events-none"
              style={{
                left: `${((pathPositions[pathPositions.length - 1].x + 20) / MAP_WIDTH) * 100}%`,
                top: pathPositions[pathPositions.length - 1].y - 15,
              }}
            >
              <span className="text-xl">{progress.percent === 100 ? "🏆" : "🚩"}</span>
            </div>
          )}

          {/* Ambient particles */}
          {theme.particleEmoji.map((emoji, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute text-lg opacity-10 pointer-events-none z-5"
              style={{ left: `${15 + i * 25}%`, top: `${5 + i * 15}%` }}
              animate={{ y: [-15, 15, -15], x: [-5, 5, -5], rotate: [0, 15, -15, 0] }}
              transition={{ duration: 6 + i * 2, repeat: Infinity }}
            >
              {emoji}
            </motion.div>
          ))}
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
