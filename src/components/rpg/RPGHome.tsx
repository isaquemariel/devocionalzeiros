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
        className="w-full py-4 rounded-xl font-black text-lg uppercase tracking-wider transition-all active:translate-y-1 active:shadow-none animate-[button3dPulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]"
        style={{
          background: "linear-gradient(180deg, #f59e0b 0%, #d97706 50%, #b45309 100%)",
          color: "#1a0a00",
          boxShadow: "0 6px 0 #92400e, 0 8px 16px rgba(0,0,0,0.5), inset 0 2px 0 rgba(255,255,255,0.3)",
          textShadow: "0 1px 1px rgba(255,255,255,0.3)",
          border: "1px solid rgba(255,255,255,0.15)",
        }}
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
