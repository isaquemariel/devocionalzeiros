import { motion } from "framer-motion";
import { Lock, BookOpen, Trophy } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { RPG_BIBLE_BOOKS, RPG_REGION_THEMES } from "@/lib/rpgBibleData";

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

  // Create a winding path layout
  const COLS = 5;
  const rows: number[][] = [];
  for (let i = 0; i < chapters.length; i += COLS) {
    const row = chapters.slice(i, i + COLS);
    // Reverse every other row for snake pattern
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
        {/* Themed background */}
        <div className={`relative bg-gradient-to-b ${theme.bgGradient} rounded-xl p-4 min-h-[400px]`}>
          {/* Floating particles */}
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

          {/* Snake path grid */}
          <div className="relative z-10 space-y-2">
            {rows.map((row, rowIdx) => (
              <div key={rowIdx} className="flex justify-center gap-2">
                {row.map((chapter) => {
                  const unlocked = isStageUnlocked(selectedLevel, chapter);
                  const completed = progress.completed >= chapter && unlocked;
                  const isNext = unlocked && !completed;

                  return (
                    <motion.button
                      key={chapter}
                      disabled={!unlocked}
                      className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex flex-col items-center justify-center border-2 transition-all text-sm font-bold relative ${
                        completed
                          ? "bg-green-500/20 border-green-500/40 text-green-400 shadow-[0_0_12px_rgba(34,197,94,0.2)]"
                          : isNext
                          ? `bg-gradient-to-b from-amber-500/20 to-amber-600/10 border-amber-500/50 text-amber-400 shadow-[0_0_20px_${theme.glowColor}]`
                          : unlocked
                          ? "bg-white/5 border-white/10 text-white/60"
                          : "bg-white/[0.02] border-white/[0.04] text-white/10"
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
                        <>
                          <span className="text-base">{chapter}</span>
                          {isNext && (
                            <motion.div
                              className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-amber-400"
                              animate={{ scale: [1, 1.3, 1] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            />
                          )}
                        </>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Connecting path lines (visual decoration) */}
          {rows.length > 1 && (
            <div className="absolute inset-0 pointer-events-none z-0">
              {rows.map((_, rowIdx) => {
                if (rowIdx === rows.length - 1) return null;
                const isEven = rowIdx % 2 === 0;
                return (
                  <div
                    key={`path-${rowIdx}`}
                    className="absolute w-0.5 h-4 bg-white/10"
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
            <div className="relative z-10">
              <Trophy className="w-8 h-8 text-white mx-auto mb-2" />
              <p className="font-black text-white">LIVRO COMPLETO!</p>
              <p className="text-xs text-white/60 mt-1">Boss derrotado — {book.name} conquistado</p>
            </div>
          </motion.div>
        )}

        <div className="h-8" />
      </ScrollArea>
    </motion.div>
  );
};

export default RPGStageMap;
