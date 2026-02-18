import { motion } from "framer-motion";
import { Lock, BookOpen, Trophy } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { RPG_BIBLE_BOOKS, RPG_REGION_THEMES, RPGRegion } from "@/lib/rpgBibleData";
import { Mascot3D } from "@/components/shared/Mascot3D";

// Import the 4 main region map images
import mapCreation from "@/assets/rpg-map-creation.jpg";
import mapDesert from "@/assets/rpg-map-desert.jpg";
import mapGospels from "@/assets/rpg-map-gospels.jpg";
import mapRevelation from "@/assets/rpg-map-revelation.jpg";

const REGION_MAPS: Partial<Record<RPGRegion, string>> = {
  creation: mapCreation,
  desert: mapDesert,
  gospels: mapGospels,
  revelation: mapRevelation,
};

// Enhanced CSS scenery elements for regions without images
const REGION_SCENERY: Record<string, { elements: React.ReactNode }> = {
  conquest: {
    elements: (
      <>
        {/* Swords and shields scattered */}
        {["⚔️", "🛡️", "🏹", "⚔️", "🗡️"].map((e, i) => (
          <motion.div key={i} className="absolute text-2xl opacity-15 pointer-events-none"
            style={{ left: `${10 + i * 20}%`, top: `${15 + (i % 3) * 25}%` }}
            animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 5 + i, repeat: Infinity }} >
            {e}
          </motion.div>
        ))}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(239,68,68,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,rgba(249,115,22,0.06),transparent_60%)]" />
      </>
    ),
  },
  kingdom: {
    elements: (
      <>
        {["👑", "🏰", "⚜️", "🏛️", "👑"].map((e, i) => (
          <motion.div key={i} className="absolute text-2xl opacity-15 pointer-events-none"
            style={{ left: `${8 + i * 18}%`, top: `${12 + (i % 3) * 28}%` }}
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 4 + i, repeat: Infinity }} >
            {e}
          </motion.div>
        ))}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_10%,rgba(234,179,8,0.1),transparent_50%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-amber-900/10 to-transparent" />
      </>
    ),
  },
  exile: {
    elements: (
      <>
        {["⛓️", "🕊️", "🧱", "🔗", "🕊️"].map((e, i) => (
          <motion.div key={i} className="absolute text-xl opacity-15 pointer-events-none"
            style={{ left: `${12 + i * 17}%`, top: `${18 + (i % 3) * 22}%` }}
            animate={{ opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 3 + i, repeat: Infinity }} >
            {e}
          </motion.div>
        ))}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_40%_50%,rgba(148,163,184,0.08),transparent_60%)]" />
        {/* Stone wall texture effect */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0px, transparent 1px, transparent 20px), repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0px, transparent 1px, transparent 14px)" }} />
      </>
    ),
  },
  wisdom: {
    elements: (
      <>
        {["📜", "🕯️", "🎵", "📖", "✨"].map((e, i) => (
          <motion.div key={i} className="absolute text-xl opacity-15 pointer-events-none"
            style={{ left: `${10 + i * 18}%`, top: `${15 + (i % 3) * 25}%` }}
            animate={{ y: [-8, 8, -8], rotate: [0, 3, -3, 0] }}
            transition={{ duration: 5 + i, repeat: Infinity }} >
            {e}
          </motion.div>
        ))}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(16,185,129,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_70%,rgba(6,182,212,0.06),transparent_50%)]" />
      </>
    ),
  },
  prophets: {
    elements: (
      <>
        {["🔥", "👁️", "⚡", "🔥", "💫"].map((e, i) => (
          <motion.div key={i} className="absolute text-2xl opacity-15 pointer-events-none"
            style={{ left: `${8 + i * 20}%`, top: `${10 + (i % 3) * 30}%` }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.25, 0.1] }}
            transition={{ duration: 3 + i * 0.7, repeat: Infinity }} >
            {e}
          </motion.div>
        ))}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(167,139,250,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_80%,rgba(192,38,211,0.06),transparent_50%)]" />
      </>
    ),
  },
  minor_prophets: {
    elements: (
      <>
        {["📣", "🌊", "🐋", "🌬️", "📣"].map((e, i) => (
          <motion.div key={i} className="absolute text-xl opacity-15 pointer-events-none"
            style={{ left: `${10 + i * 18}%`, top: `${15 + (i % 3) * 25}%` }}
            animate={{ x: [-5, 5, -5], y: [-3, 3, -3] }}
            transition={{ duration: 4 + i, repeat: Infinity }} >
            {e}
          </motion.div>
        ))}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,rgba(56,189,248,0.08),transparent_60%)]" />
      </>
    ),
  },
  acts: {
    elements: (
      <>
        {["🔥", "🌍", "⚡", "🕊️", "🔥"].map((e, i) => (
          <motion.div key={i} className="absolute text-xl opacity-15 pointer-events-none"
            style={{ left: `${10 + i * 18}%`, top: `${12 + (i % 3) * 28}%` }}
            animate={{ y: [-10, 0, -10], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 3 + i, repeat: Infinity }} >
            {e}
          </motion.div>
        ))}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(249,115,22,0.12),transparent_40%)]" />
        {/* Fire descending from top */}
        <div className="absolute top-0 left-1/4 right-1/4 h-32 bg-gradient-to-b from-orange-500/10 to-transparent rounded-full blur-xl" />
      </>
    ),
  },
  epistles: {
    elements: (
      <>
        {["✉️", "📖", "🙏", "✉️", "📜"].map((e, i) => (
          <motion.div key={i} className="absolute text-xl opacity-15 pointer-events-none"
            style={{ left: `${12 + i * 17}%`, top: `${15 + (i % 3) * 25}%` }}
            animate={{ rotate: [-2, 2, -2] }}
            transition={{ duration: 5 + i, repeat: Infinity }} >
            {e}
          </motion.div>
        ))}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_40%_30%,rgba(6,182,212,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_70%,rgba(16,185,129,0.06),transparent_50%)]" />
      </>
    ),
  },
};

interface RPGStageMapProps {
  selectedLevel: number;
  getBookProgress: (bookIndex: number) => { completed: number; total: number; percent: number };
  isStageUnlocked: (bookIndex: number, chapter: number) => boolean;
}

const RPGStageMap = ({ selectedLevel, getBookProgress, isStageUnlocked }: RPGStageMapProps) => {
  const book = RPG_BIBLE_BOOKS[selectedLevel];
  if (!book) return null;

  const progress = getBookProgress(selectedLevel);
  const theme = RPG_REGION_THEMES[book.region];
  const chapters = Array.from({ length: book.chapters }, (_, i) => i + 1);
  const mapImage = REGION_MAPS[book.region];
  const scenery = REGION_SCENERY[book.region];

  const nextChapter = chapters.find((ch) => {
    const unlocked = isStageUnlocked(selectedLevel, ch);
    const completed = progress.completed >= ch && unlocked;
    return unlocked && !completed;
  });

  const COLS = 5;
  const rows: number[][] = [];
  for (let i = 0; i < chapters.length; i += COLS) {
    const row = chapters.slice(i, i + COLS);
    if (rows.length % 2 === 1) row.reverse();
    rows.push(row);
  }

  return (
    <motion.div
      key="stages"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
    >
      {/* Book header with themed gradient */}
      <div className={`relative rounded-xl overflow-hidden mb-4 p-4 bg-gradient-to-r ${theme.gradient}`}>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">{theme.emoji}</span>
            <BookOpen className="w-5 h-5 text-white/80" />
            <h2 className="text-lg font-black text-white">{book.name}</h2>
            <span className="text-xs text-white/50 ml-auto">Nível {book.index + 1}</span>
          </div>
          <p className="text-[10px] text-white/50 mb-2">{theme.name} — {theme.description}</p>
          <div className="flex items-center gap-2">
            <Progress value={progress.percent} className="h-2 flex-1 bg-black/30 [&>div]:bg-white/80" />
            <span className="text-xs text-white/70 font-bold">{progress.completed}/{progress.total}</span>
          </div>
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-260px)]">
        {/* Map container with themed background */}
        <div className="relative rounded-xl overflow-hidden min-h-[400px]">
          {/* Background: Image or CSS gradient */}
          {mapImage ? (
            <>
              <img
                src={mapImage}
                alt={`Mapa ${theme.name}`}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />
              {/* Vignette effect */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.6)_100%)]" />
            </>
          ) : (
            <>
              <div className={`absolute inset-0 bg-gradient-to-b ${theme.bgGradient}`} />
              {/* Scenery elements */}
              {scenery?.elements}
            </>
          )}

          {/* Floating particles for all */}
          {theme.particleEmoji.map((emoji, i) => (
            <motion.div
              key={i}
              className="absolute text-lg opacity-20 pointer-events-none"
              style={{ left: `${15 + i * 30}%`, top: `${10 + i * 20}%` }}
              animate={{ y: [-10, 10, -10], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4 + i, repeat: Infinity }}
            >
              {emoji}
            </motion.div>
          ))}

          {/* Grid overlay for RPG map feel */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{ backgroundImage: "repeating-linear-gradient(0deg, rgba(255,255,255,0.5) 0px, transparent 1px, transparent 48px), repeating-linear-gradient(90deg, rgba(255,255,255,0.5) 0px, transparent 1px, transparent 48px)" }} 
          />

          {/* Snake path grid */}
          <div className="relative z-10 p-4 space-y-2">
            {rows.map((row, rowIdx) => (
              <div key={rowIdx} className="flex justify-center gap-2">
                {row.map((chapter) => {
                  const unlocked = isStageUnlocked(selectedLevel, chapter);
                  const completed = progress.completed >= chapter && unlocked;
                  const isNext = chapter === nextChapter;

                  return (
                    <div key={chapter} className="relative">
                      {/* Mascot standing on the next chapter */}
                      {isNext && (
                        <motion.div
                          className="absolute -top-9 left-1/2 -translate-x-1/2 z-20"
                          animate={{ y: [-3, 3, -3] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Mascot3D mood="happy" size="xs" />
                          <motion.div
                            className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-amber-500/90 text-black text-[7px] font-bold px-1.5 py-0.5 rounded-full"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 }}
                          >
                            Vamos! ⚔️
                          </motion.div>
                        </motion.div>
                      )}

                      <motion.button
                        disabled={!unlocked}
                        className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex flex-col items-center justify-center border-2 transition-all text-sm font-bold relative backdrop-blur-sm ${
                          completed
                            ? "bg-green-500/30 border-green-500/50 text-green-300 shadow-[0_0_12px_rgba(34,197,94,0.3)]"
                            : isNext
                            ? "bg-amber-500/30 border-amber-500/60 text-amber-300 shadow-[0_0_20px_rgba(217,119,6,0.4)]"
                            : unlocked
                            ? "bg-black/30 border-white/20 text-white/70"
                            : "bg-black/40 border-white/[0.06] text-white/15"
                        }`}
                        whileTap={unlocked ? { scale: 0.9 } : {}}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: chapter * 0.01 }}
                      >
                        {!unlocked ? (
                          <Lock className="w-3.5 h-3.5" />
                        ) : completed ? (
                          <>
                            <span className="text-base">✓</span>
                            <span className="text-[8px] opacity-60">{chapter}</span>
                          </>
                        ) : (
                          <span className="text-base">{chapter}</span>
                        )}

                        {isNext && (
                          <motion.div
                            className="absolute inset-0 rounded-2xl border-2 border-amber-400/60"
                            animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0, 0.6] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        )}
                      </motion.button>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Path connection lines */}
          {rows.length > 1 && (
            <div className="absolute inset-0 pointer-events-none z-0">
              {rows.map((_, rowIdx) => {
                if (rowIdx === rows.length - 1) return null;
                const isEven = rowIdx % 2 === 0;
                return (
                  <div
                    key={`path-${rowIdx}`}
                    className="absolute w-0.5 h-4 bg-white/15"
                    style={{
                      top: `${(rowIdx + 1) * 66 + 24}px`,
                      left: isEven ? "calc(85% - 2px)" : "calc(15% + 2px)",
                    }}
                  />
                );
              })}
            </div>
          )}
        </div>

        {/* Boss indicator */}
        {progress.percent === 100 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`mt-4 p-4 rounded-xl bg-gradient-to-r ${theme.gradient} relative overflow-hidden text-center`}
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
