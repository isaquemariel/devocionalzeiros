import { motion } from "framer-motion";
import { Lock, ChevronRight, Trophy, Sword } from "lucide-react";
import { getBooksByRegion, RPGBook, RPGRegionTheme } from "@/lib/rpgBibleData";


interface RPGWorldMapProps {
  currentLevel: number;
  getBookProgress: (bookIndex: number) => { completed: number; total: number; percent: number };
  onSelectBook: (bookIndex: number) => void;
  isAdmin?: boolean;
}

const RegionCard = ({
  theme,
  books,
  currentLevel,
  getBookProgress,
  onSelectBook,
  regionIndex,
  isAdmin = false,
}: {
  theme: RPGRegionTheme;
  books: RPGBook[];
  currentLevel: number;
  getBookProgress: RPGWorldMapProps["getBookProgress"];
  onSelectBook: (bookIndex: number) => void;
  regionIndex: number;
  isAdmin?: boolean;
}) => {
  const firstBookIndex = books[0]?.index ?? 0;
  const lastBookIndex = books[books.length - 1]?.index ?? 0;
  const isRegionUnlocked = isAdmin || firstBookIndex === 0 || firstBookIndex < currentLevel;
  const isCurrentRegion = isAdmin || (currentLevel - 1 >= firstBookIndex && currentLevel - 1 <= lastBookIndex);
  const regionCompleted = books.every(b => getBookProgress(b.index).percent === 100);

  const totalChapters = books.reduce((s, b) => s + b.chapters, 0);
  const completedChapters = books.reduce((s, b) => s + getBookProgress(b.index).completed, 0);
  const regionPercent = totalChapters > 0 ? Math.round((completedChapters / totalChapters) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: regionIndex * 0.08 }}
      className={`relative rounded-2xl overflow-hidden border transition-all ${
        isCurrentRegion
          ? "border-[#e8b04b]/60 shadow-[0_0_30px_rgba(232,176,75,0.22)]"
          : regionCompleted
          ? "border-green-500/30"
          : isRegionUnlocked
          ? "border-white/10 hover:border-white/20"
          : "border-white/5 opacity-50"
      }`}
    >

      {/* Region header with gradient */}
      <div className={`relative p-4 bg-gradient-to-r ${theme.gradient} bg-opacity-20`}>
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{theme.emoji}</span>
            <div>
              <h3 className="font-black text-sm text-white">{theme.name}</h3>
              <p className="text-[10px] text-white/60">{theme.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {regionCompleted && <Trophy className="w-4 h-4 text-green-400" />}
            <span className="text-xs font-bold text-white/70">{regionPercent}%</span>
          </div>
        </div>
        <div className="relative z-10 mt-2 h-1.5 rounded-full bg-black/30 overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${regionCompleted ? "bg-green-400" : "bg-[#e8b04b]"}`}
            initial={{ width: 0 }}
            animate={{ width: `${regionPercent}%` }}
            transition={{ duration: 0.8, delay: regionIndex * 0.1 }}
          />
        </div>
      </div>

      {/* Books in this region */}
      <div className={`bg-gradient-to-b ${theme.bgGradient} p-3 space-y-1.5`}>
        {books.map((book) => {
          const progress = getBookProgress(book.index);
          const isCurrentBook = isAdmin || book.index === currentLevel - 1;
          const isBookUnlocked = isAdmin || book.index === 0 || book.index < currentLevel;
          const isComplete = progress.percent === 100;

          return (
            <motion.button
              key={book.id}
              onClick={() => isBookUnlocked && onSelectBook(book.index)}
              disabled={!isBookUnlocked}
              className={`w-full flex items-center gap-3 p-2.5 rounded-xl border transition-all text-left relative ${
                isCurrentBook
                  ? "bg-white/10 border-[#e8b04b]/50 shadow-[0_0_15px_rgba(232,176,75,0.18)]"
                  : isComplete
                  ? "bg-green-500/10 border-green-500/20"
                  : isBookUnlocked
                  ? "bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.06]"
                  : "bg-transparent border-transparent"
              }`}
              whileTap={isBookUnlocked ? { scale: 0.98 } : {}}
            >

              {/* Level indicator */}
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center font-black text-xs shrink-0 ${
                  isCurrentBook ? "ml-3" : ""
                } ${
                  isComplete
                    ? "bg-green-500/20 text-green-400"
                    : isCurrentBook
                    ? "bg-[#e8b04b]/20 text-[#ffd889]"
                    : isBookUnlocked
                    ? "bg-white/10 text-white/50"
                    : "bg-white/5 text-white/15"
                }`}
              >
                {isComplete ? "✓" : !isBookUnlocked ? <Lock className="w-3.5 h-3.5" /> : book.index + 1}
              </div>

              <div className="flex-1 min-w-0">
                <p className={`font-bold text-xs truncate ${
                  isCurrentBook ? "text-white" : isComplete ? "text-green-400" : isBookUnlocked ? "text-white/70" : "text-white/25"
                }`}>
                  {book.name}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <div className="flex-1 h-1 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${isComplete ? "bg-green-400" : "bg-[#e8b04b]"}`}
                      style={{ width: `${progress.percent}%` }}
                    />
                  </div>
                  <span className="text-[9px] text-white/30 shrink-0">{progress.completed}/{progress.total}</span>
                </div>
              </div>

              {isBookUnlocked && (
                <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${isCurrentBook ? "text-[#ffd889]" : "text-white/20"}`} />
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};

const RPGWorldMap = ({ currentLevel, getBookProgress, onSelectBook, isAdmin = false }: RPGWorldMapProps) => {
  const regions = getBooksByRegion();

  return (
    <motion.div
      key="world-map"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
    >
      <h2 className="rpg-title text-lg mb-4 flex items-center gap-2">
        <Sword className="w-5 h-5 text-[#e8b04b]" />
        MAPA DA <span className="hl">BÍBLIA</span>
      </h2>
      <div className="overflow-y-auto h-[calc(100vh-180px)]">
        <div className="space-y-4 pb-8">
          {regions.map((r, i) => (
            <RegionCard
              key={r.region}
              theme={r.theme}
              books={r.books}
              currentLevel={currentLevel}
              getBookProgress={getBookProgress}
              onSelectBook={onSelectBook}
              regionIndex={i}
              isAdmin={isAdmin}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default RPGWorldMap;
