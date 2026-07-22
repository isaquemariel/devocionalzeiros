import { motion } from "framer-motion";
import { Zap, Flame, Shield, Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { TOTAL_CHAPTERS, getBookByIndex, RPG_BIBLE_BOOKS } from "@/lib/rpgBibleData";
import RPGMascotCanvas from "@/components/rpg/RPGMascotCanvas";
import cardRpg from "@/assets/card-rpg.png";

interface RPGHomeProps {
  stats: {
    totalXp: number;
    currentLevel: number;
    currentStage: number;
    streakDays: number;
    completedChapters: number;
  } | null;
  overallPercent: number;
  onPlay: () => void;
}

const RPGHome = ({ stats, overallPercent, onPlay }: RPGHomeProps) => {
  const currentBook = stats ? getBookByIndex(stats.currentLevel - 1) : RPG_BIBLE_BOOKS[0];

  return (
    <motion.div
      key="home"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* Hero Card — cover with the Devocionalzeiro standing in front */}
      <div className="relative rounded-2xl overflow-hidden border border-amber-500/30 shadow-[0_0_40px_rgba(217,119,6,0.2)]">
        <img src={cardRpg} alt="O Jogo da Bíblia" className="w-full aspect-[3/4] max-h-[340px] object-cover object-top" />
        {/* gradient so the mascot reads clearly against the art */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
        <motion.div
          className="absolute left-1/2 bottom-3 -translate-x-1/2 drop-shadow-[0_6px_16px_rgba(0,0,0,0.6)]"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <RPGMascotCanvas size={128} mood="idle" />
        </motion.div>
      </div>

      <button onClick={onPlay} className="rpg-btn w-full py-4 text-lg uppercase tracking-wider">
        ⚔️ JORNADA BÍBLICA
      </button>

      {/* Progress Bar */}
      <div className="rpg-panel p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-bold text-[#b8a67f]">Progresso da Bíblia</span>
          <span className="text-xs text-[#ffd889] font-bold">{stats?.completedChapters || 0}/{TOTAL_CHAPTERS} capítulos</span>
        </div>
        <Progress value={overallPercent} className="h-3 bg-black/40 [&>div]:bg-gradient-to-r [&>div]:from-[#e8b04b] [&>div]:to-[#ffd889]" />
        <p className="text-xs text-[#9c8b68] mt-1.5">
          Nível {stats?.currentLevel || 1} — {currentBook?.name || "Gênesis"}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: Shield, value: `Lv.${stats?.currentLevel || 1}`, label: "Nível", color: "#7fb0ff" },
          { icon: Star, value: stats?.totalXp || 0, label: "XP Total", color: "#ffd889" },
          { icon: Flame, value: stats?.streakDays || 0, label: "Streak", color: "#e8846b" },
        ].map(({ icon: Icon, value, label, color }) => (
          <div key={label} className="rpg-panel p-3 text-center">
            <Icon className="w-5 h-5 mx-auto mb-1" style={{ color }} />
            <p className="text-lg font-black" style={{ color }}>{value}</p>
            <p className="text-[10px] text-[#9c8b68] uppercase">{label}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default RPGHome;
