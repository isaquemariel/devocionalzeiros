import { motion } from "framer-motion";
import { 
  Flame, 
  BookOpen, 
  Crown, 
  Star, 
  Zap, 
  Heart, 
  Sunrise, 
  Moon,
  Award,
  Target,
  Sparkles,
  Book,
  Calendar,
  Trophy
} from "lucide-react";
import AchievementCard from "./AchievementCard";

// Achievement definitions
const achievements = [
  // Streak achievements
  {
    id: "first_reading",
    title: "Primeiro Passo",
    description: "Complete sua primeira leitura diária",
    icon: BookOpen,
    rarity: "comum" as const,
    unlocked: true,
    unlockedAt: "01/01/2025",
  },
  {
    id: "streak_7",
    title: "Chama Acesa",
    description: "Mantenha uma sequência de 7 dias de leitura",
    icon: Flame,
    rarity: "raro" as const,
    unlocked: false,
    progress: 2,
    maxProgress: 7,
  },
  {
    id: "streak_30",
    title: "Fogo Inextinguível",
    description: "Mantenha uma sequência de 30 dias de leitura",
    icon: Zap,
    rarity: "epico" as const,
    unlocked: false,
    progress: 2,
    maxProgress: 30,
  },
  {
    id: "streak_100",
    title: "Centurião da Fé",
    description: "Mantenha uma sequência de 100 dias de leitura",
    icon: Crown,
    rarity: "lendario" as const,
    unlocked: false,
    progress: 2,
    maxProgress: 100,
  },
  
  // Book completion achievements
  {
    id: "genesis_complete",
    title: "No Princípio",
    description: "Complete o livro de Gênesis",
    icon: Star,
    rarity: "raro" as const,
    unlocked: false,
    progress: 8,
    maxProgress: 50,
  },
  {
    id: "psalms_complete",
    title: "Salmista",
    description: "Complete o livro de Salmos",
    icon: Heart,
    rarity: "epico" as const,
    unlocked: false,
    progress: 2,
    maxProgress: 150,
  },
  {
    id: "new_testament",
    title: "Novo Começo",
    description: "Complete todo o Novo Testamento",
    icon: Book,
    rarity: "lendario" as const,
    unlocked: false,
    progress: 0,
    maxProgress: 260,
  },
  
  // Time-based achievements
  {
    id: "early_bird",
    title: "Madrugador",
    description: "Leia antes das 6h da manhã 7 vezes",
    icon: Sunrise,
    rarity: "raro" as const,
    unlocked: false,
    progress: 1,
    maxProgress: 7,
  },
  {
    id: "night_owl",
    title: "Vigia Noturno",
    description: "Leia após as 22h por 7 dias",
    icon: Moon,
    rarity: "raro" as const,
    unlocked: false,
    progress: 0,
    maxProgress: 7,
  },
  
  // Consistency achievements
  {
    id: "perfect_week",
    title: "Semana Perfeita",
    description: "Complete todas as leituras de uma semana",
    icon: Target,
    rarity: "comum" as const,
    unlocked: false,
    progress: 2,
    maxProgress: 7,
  },
  {
    id: "perfect_month",
    title: "Mês de Ouro",
    description: "Complete todas as leituras de um mês inteiro",
    icon: Award,
    rarity: "epico" as const,
    unlocked: false,
    progress: 2,
    maxProgress: 31,
  },
  {
    id: "yearly_champion",
    title: "Campeão Anual",
    description: "Complete a Bíblia inteira em 1 ano",
    icon: Trophy,
    rarity: "lendario" as const,
    unlocked: false,
    progress: 2,
    maxProgress: 365,
  },
];

const AchievementsGrid = () => {
  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Stats Header */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Conquistas Desbloqueadas</p>
            <p className="text-2xl font-bold">
              {unlockedCount} <span className="text-muted-foreground font-normal text-base">/ {totalCount}</span>
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-primary">
            {Math.round((unlockedCount / totalCount) * 100)}%
          </p>
          <p className="text-xs text-muted-foreground">completo</p>
        </div>
      </div>

      {/* Rarity Legend */}
      <div className="flex flex-wrap gap-3 justify-center">
        {[
          { label: "Comum", color: "bg-slate-500" },
          { label: "Raro", color: "bg-blue-500" },
          { label: "Épico", color: "bg-amber-500" },
          { label: "Lendário", color: "bg-orange-500" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${item.color}`} />
            <span className="text-xs text-muted-foreground">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Achievements Grid */}
      <div className="grid sm:grid-cols-2 gap-4">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <AchievementCard {...achievement} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default AchievementsGrid;
