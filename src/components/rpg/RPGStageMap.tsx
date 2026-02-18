import { motion } from "framer-motion";
import { Lock, BookOpen, Trophy } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { RPG_BIBLE_BOOKS, RPG_REGION_THEMES, RPGRegion } from "@/lib/rpgBibleData";
import { Mascot3D } from "@/components/shared/Mascot3D";
import { useMemo } from "react";

// Region-specific terrain decorations (positioned around the path)
const REGION_TERRAIN: Record<RPGRegion, { emoji: string; count: number }[]> = {
  creation: [
    { emoji: "🌳", count: 6 }, { emoji: "🌸", count: 4 }, { emoji: "🦋", count: 3 }, { emoji: "🌿", count: 5 },
  ],
  desert: [
    { emoji: "🌵", count: 5 }, { emoji: "🏜️", count: 3 }, { emoji: "🦂", count: 2 }, { emoji: "☀️", count: 2 },
  ],
  conquest: [
    { emoji: "⚔️", count: 4 }, { emoji: "🏹", count: 3 }, { emoji: "🛡️", count: 3 }, { emoji: "🗡️", count: 2 },
  ],
  kingdom: [
    { emoji: "🏰", count: 3 }, { emoji: "👑", count: 2 }, { emoji: "⚜️", count: 4 }, { emoji: "🏛️", count: 2 },
  ],
  exile: [
    { emoji: "🧱", count: 5 }, { emoji: "⛓️", count: 3 }, { emoji: "🕊️", count: 3 }, { emoji: "🏚️", count: 2 },
  ],
  wisdom: [
    { emoji: "📜", count: 4 }, { emoji: "🕯️", count: 4 }, { emoji: "🎵", count: 3 }, { emoji: "📖", count: 3 },
  ],
  prophets: [
    { emoji: "🔥", count: 4 }, { emoji: "👁️", count: 3 }, { emoji: "⚡", count: 3 }, { emoji: "💫", count: 2 },
  ],
  minor_prophets: [
    { emoji: "📣", count: 3 }, { emoji: "🌊", count: 3 }, { emoji: "🐋", count: 1 }, { emoji: "🌬️", count: 3 },
  ],
  gospels: [
    { emoji: "✝️", count: 3 }, { emoji: "🕊️", count: 4 }, { emoji: "🐑", count: 3 }, { emoji: "⛪", count: 2 },
  ],
  acts: [
    { emoji: "🔥", count: 4 }, { emoji: "🌍", count: 2 }, { emoji: "⛵", count: 3 }, { emoji: "📜", count: 2 },
  ],
  epistles: [
    { emoji: "✉️", count: 4 }, { emoji: "📖", count: 3 }, { emoji: "🙏", count: 3 }, { emoji: "⛪", count: 2 },
  ],
  revelation: [
    { emoji: "🌟", count: 4 }, { emoji: "👑", count: 3 }, { emoji: "🔥", count: 3 }, { emoji: "🦁", count: 2 },
  ],
};

interface RPGStageMapProps {
  selectedLevel: number;
  getBookProgress: (bookIndex: number) => { completed: number; total: number; percent: number };
  isStageUnlocked: (bookIndex: number, chapter: number) => boolean;
}

// Generate a winding path of node positions for the overworld map
function generatePathPositions(count: number): { x: number; y: number }[] {
  const positions: { x: number; y: number }[] = [];
  const COLS = 4;
  const NODE_SPACING_Y = 80;
  const MARGIN_X = 50;
  const MAP_WIDTH = 320;
  const usableWidth = MAP_WIDTH - MARGIN_X * 2;

  for (let i = 0; i < count; i++) {
    const row = Math.floor(i / COLS);
    const colInRow = i % COLS;
    const isEvenRow = row % 2 === 0;
    
    // Snake pattern: left-to-right on even rows, right-to-left on odd rows
    const col = isEvenRow ? colInRow : (COLS - 1 - colInRow);
    
    const x = MARGIN_X + (col / (COLS - 1)) * usableWidth;
    const y = 60 + row * NODE_SPACING_Y;
    
    // Add slight organic wobble
    const wobbleX = Math.sin(i * 1.7) * 8;
    const wobbleY = Math.cos(i * 2.3) * 5;
    
    positions.push({ x: x + wobbleX, y: y + wobbleY });
  }
  
  return positions;
}

// Generate decorative terrain items positioned around the path
function generateTerrainItems(region: RPGRegion, pathPositions: { x: number; y: number }[], mapHeight: number) {
  const terrain = REGION_TERRAIN[region];
  const items: { emoji: string; x: number; y: number; size: number; delay: number }[] = [];
  
  // Seed-based pseudo-random for consistent placement
  let seed = region.length * 17;
  const rand = () => {
    seed = (seed * 16807 + 0) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  terrain.forEach(({ emoji, count }) => {
    for (let i = 0; i < count; i++) {
      const x = 10 + rand() * 300;
      const y = 30 + rand() * (mapHeight - 60);
      
      // Don't place too close to any path node
      const tooClose = pathPositions.some(p => 
        Math.abs(p.x - x) < 30 && Math.abs(p.y - y) < 30
      );
      if (tooClose) continue;
      
      items.push({
        emoji,
        x,
        y,
        size: 16 + rand() * 12,
        delay: rand() * 5,
      });
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

  const pathPositions = useMemo(() => generatePathPositions(chapters.length), [chapters.length]);
  const mapHeight = useMemo(() => {
    if (pathPositions.length === 0) return 400;
    return Math.max(400, pathPositions[pathPositions.length - 1].y + 100);
  }, [pathPositions]);
  const terrainItems = useMemo(
    () => generateTerrainItems(region, pathPositions, mapHeight),
    [region, pathPositions, mapHeight]
  );

  // Build SVG path string connecting all nodes
  const pathD = useMemo(() => {
    if (pathPositions.length < 2) return "";
    let d = `M ${pathPositions[0].x} ${pathPositions[0].y}`;
    for (let i = 1; i < pathPositions.length; i++) {
      const prev = pathPositions[i - 1];
      const curr = pathPositions[i];
      // Use quadratic curves for smooth winding
      const cpx = (prev.x + curr.x) / 2;
      const cpy = (prev.y + curr.y) / 2;
      d += ` Q ${prev.x + (curr.x - prev.x) * 0.1} ${cpy}, ${cpx} ${cpy}`;
      d += ` T ${curr.x} ${curr.y}`;
    }
    return d;
  }, [pathPositions]);

  // Completed path (up to last completed chapter)
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

  if (!book) return null;

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
        {/* === 2D RPG OVERWORLD MAP === */}
        <div
          className="relative rounded-xl overflow-hidden mx-auto"
          style={{ width: 320, height: mapHeight }}
        >
          {/* Ground / terrain background */}
          <div className={`absolute inset-0 bg-gradient-to-b ${theme.bgGradient}`} />
          
          {/* Grass/ground texture */}
          <div className="absolute inset-0 opacity-[0.07]" style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, rgba(34,197,94,0.4) 0%, transparent 3%),
              radial-gradient(circle at 60% 15%, rgba(34,197,94,0.3) 0%, transparent 2%),
              radial-gradient(circle at 80% 70%, rgba(34,197,94,0.3) 0%, transparent 3%),
              radial-gradient(circle at 40% 80%, rgba(34,197,94,0.4) 0%, transparent 2%)
            `,
            backgroundSize: '60px 60px',
          }} />

          {/* Terrain decorations */}
          {terrainItems.map((item, i) => (
            <motion.div
              key={`terrain-${i}`}
              className="absolute pointer-events-none select-none"
              style={{
                left: item.x,
                top: item.y,
                fontSize: item.size,
                zIndex: 1,
              }}
              animate={{
                y: [-2, 2, -2],
                rotate: [-2, 2, -2],
              }}
              transition={{
                duration: 4 + item.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {item.emoji}
            </motion.div>
          ))}

          {/* SVG layer: path + nodes */}
          <svg
            className="absolute inset-0 z-10"
            width={320}
            height={mapHeight}
            viewBox={`0 0 320 ${mapHeight}`}
          >
            {/* Dirt path shadow */}
            {pathD && (
            <path
              d={pathD}
              fill="none"
              stroke="rgba(0,0,0,0.3)"
              strokeWidth={28}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            )}
            {/* Dirt path base */}
            {pathD && (
            <path
              d={pathD}
              fill="none"
              stroke="#5C3D2E"
              strokeWidth={24}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            )}
            {/* Dirt path lighter center */}
            {pathD && (
            <path
              d={pathD}
              fill="none"
              stroke="#8B6914"
              strokeWidth={16}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={0.4}
            />
            )}
            {/* Dotted center line */}
            {pathD && (
            <path
              d={pathD}
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth={2}
              strokeDasharray="6 10"
              strokeLinecap="round"
            />
            )}

            {/* Completed path glow */}
            {completedPathD && (
              <>
                <path
                  d={completedPathD}
                  fill="none"
                  stroke={theme.accentColor}
                  strokeWidth={26}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity={0.15}
                />
                <path
                  d={completedPathD}
                  fill="none"
                  stroke={theme.accentColor}
                  strokeWidth={16}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity={0.25}
                />
              </>
            )}
          </svg>

          {/* Chapter nodes (HTML overlay for interactivity) */}
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
                  left: pos.x - 20,
                  top: pos.y - 20,
                  width: 40,
                  height: 40,
                }}
              >
                {/* Mascot on current chapter */}
                {isNext && (
                  <motion.div
                    className="absolute -top-12 left-1/2 -translate-x-1/2 z-30"
                    animate={{ y: [-4, 4, -4] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Mascot3D mood="happy" size="xs" />
                    <motion.div
                      className="absolute -top-5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-amber-500/90 text-black text-[7px] font-bold px-1.5 py-0.5 rounded-full shadow-lg"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      Vamos! ⚔️
                    </motion.div>
                  </motion.div>
                )}

                <motion.button
                  disabled={!unlocked}
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-[3px] font-black text-sm transition-all relative ${
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
                  transition={{ delay: i * 0.015, type: "spring", stiffness: 300 }}
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
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[8px] text-white/40 font-bold whitespace-nowrap">
                    {chapter}
                  </div>
                )}
              </div>
            );
          })}

          {/* Start flag */}
          {pathPositions[0] && (
            <div
              className="absolute z-15 pointer-events-none"
              style={{ left: pathPositions[0].x - 10, top: pathPositions[0].y - 35 }}
            >
              <span className="text-xl">🏁</span>
            </div>
          )}

          {/* End flag / boss */}
          {pathPositions[pathPositions.length - 1] && (
            <div
              className="absolute z-15 pointer-events-none"
              style={{
                left: pathPositions[pathPositions.length - 1].x + 15,
                top: pathPositions[pathPositions.length - 1].y - 15,
              }}
            >
              <span className="text-xl">{progress.percent === 100 ? "🏆" : "🚩"}</span>
            </div>
          )}

          {/* Ambient floating particles */}
          {theme.particleEmoji.map((emoji, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute text-lg opacity-15 pointer-events-none z-5"
              style={{ left: `${15 + i * 30}%`, top: `${5 + i * 15}%` }}
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
            className={`mt-4 mx-auto max-w-[320px] p-4 rounded-xl bg-gradient-to-r ${theme.gradient} relative overflow-hidden text-center`}
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
