import { motion } from "framer-motion";
import { Zap, Flame, Shield, Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { TOTAL_CHAPTERS, getBookByIndex, RPG_BIBLE_BOOKS } from "@/lib/rpgBibleData";
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
      {/* Hero Card — cover only, no mascot */}
      <div className="relative rounded-2xl overflow-hidden border border-amber-500/30 shadow-[0_0_40px_rgba(217,119,6,0.2)]">
        <img src={cardRpg} alt="O Jogo da Bíblia" className="w-full aspect-[3/4] max-h-[340px] object-cover object-top" />
      </div>

      <button
        onClick={onPlay}
        className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 text-black font-black text-lg uppercase tracking-wider shadow-[0_0_30px_rgba(217,119,6,0.5)] hover:shadow-[0_0_50px_rgba(217,119,6,0.7)] transition-all active:scale-95"
      >
        ⚔️ JORNADA BÍBLICA
      </button>

      {/* Progress Bar */}
      <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-bold text-white/70">Progresso da Bíblia</span>
          <span className="text-xs text-amber-400 font-bold">{stats?.completedChapters || 0}/{TOTAL_CHAPTERS} capítulos</span>
        </div>
        <Progress value={overallPercent} className="h-3 bg-white/10 [&>div]:bg-gradient-to-r [&>div]:from-amber-500 [&>div]:to-yellow-400" />
        <p className="text-xs text-white/40 mt-1.5">
          Nível {stats?.currentLevel || 1} — {currentBook?.name || "Gênesis"}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: Shield, value: `Lv.${stats?.currentLevel || 1}`, label: "Nível", color: "blue" },
          { icon: Star, value: stats?.totalXp || 0, label: "XP Total", color: "amber" },
          { icon: Flame, value: stats?.streakDays || 0, label: "Streak", color: "orange" },
        ].map(({ icon: Icon, value, label, color }) => (
          <div key={label} className={`p-3 rounded-xl bg-gradient-to-b from-${color}-500/10 to-${color}-600/5 border border-${color}-500/20 text-center`}>
            <Icon className={`w-5 h-5 text-${color}-400 mx-auto mb-1`} />
            <p className={`text-lg font-black text-${color}-400`}>{value}</p>
            <p className="text-[10px] text-white/40 uppercase">{label}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default RPGHome;
