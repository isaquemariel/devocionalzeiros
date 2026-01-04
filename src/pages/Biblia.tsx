import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Flame, 
  BookOpen, 
  Calendar, 
  Trophy, 
  BarChart3, 
  CheckCircle2,
  ChevronRight,
  Sparkles
} from "lucide-react";
import AchievementsGrid from "@/components/biblia/AchievementsGrid";
import StatisticsGrid from "@/components/biblia/StatisticsGrid";
import { useGameSounds } from "@/hooks/useGameSounds";
import { triggerConfetti } from "@/utils/confetti";

// Mock data for demonstration
const todayReading = {
  day: 3,
  date: "03 de Janeiro",
  chapters: [
    { id: 1, name: "Gênesis 7", completed: false },
    { id: 2, name: "Gênesis 8", completed: false },
    { id: 3, name: "Salmos 2", completed: false, highlighted: true },
  ]
};

const weekDays = [
  { day: 1, label: "Seg", completed: true },
  { day: 2, label: "Ter", completed: true },
  { day: 3, label: "Qua", completed: false, current: true },
  { day: 4, label: "Qui", completed: false },
  { day: 5, label: "Sex", completed: false },
  { day: 6, label: "Sáb", completed: false },
  { day: 7, label: "Dom", completed: false },
];

const ProgressRing = ({ progress, size = 120, strokeWidth = 8 }: { progress: number; size?: number; strokeWidth?: number }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-muted/20"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#progressGradient)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ strokeDasharray: circumference }}
        />
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--accent))" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-foreground">{progress}%</span>
        <span className="text-xs text-muted-foreground">concluído</span>
      </div>
    </div>
  );
};

const StreakBadge = ({ days }: { days: number }) => (
  <motion.div 
    className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/30"
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 400 }}
  >
    <motion.div
      animate={{ 
        scale: [1, 1.2, 1],
        rotate: [0, 5, -5, 0]
      }}
      transition={{ 
        duration: 2, 
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
    </motion.div>
    <span className="font-semibold text-sm sm:text-base text-orange-400">{days} dias</span>
  </motion.div>
);

const Biblia = () => {
  const [activeTab, setActiveTab] = useState("calendario");
  const [completedChapters, setCompletedChapters] = useState<number[]>([]);
  const { playSound } = useGameSounds();

  const tabs = [
    { id: "calendario", label: "Calendário", icon: Calendar },
    { id: "estatisticas", label: "Estatísticas", icon: BarChart3 },
    { id: "conquistas", label: "Conquistas", icon: Trophy },
  ];

  const toggleChapter = (id: number) => {
    const isCompleting = !completedChapters.includes(id);
    
    setCompletedChapters(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
    
    if (isCompleting) {
      playSound("complete");
      triggerConfetti("complete");
    }
  };

  const markAllAsRead = () => {
    playSound("achievement");
    triggerConfetti("celebration");
    setCompletedChapters(todayReading.chapters.map(c => c.id));
  };

  const allCompleted = todayReading.chapters.every(c => completedChapters.includes(c.id));

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
        {/* Header */}
        <motion.header 
          className="flex items-center justify-between mb-6 sm:mb-8 md:mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold tracking-tight">Jornada Bíblica</h1>
              <p className="text-xs sm:text-sm text-muted-foreground">Bíblia em 1 Ano</p>
            </div>
          </div>
          <StreakBadge days={2} />
        </motion.header>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Left Column - Progress & Verse */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Progress Card */}
            <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm text-muted-foreground">Progresso Anual</p>
                  <p className="text-2xl font-bold">Dia {todayReading.day} <span className="text-muted-foreground font-normal text-base">de 365</span></p>
                </div>
                <ProgressRing progress={Math.round((todayReading.day / 365) * 100)} />
              </div>

              {/* Week Progress */}
              <div className="flex justify-between gap-1">
                {weekDays.map((day) => (
                  <motion.div
                    key={day.day}
                    className={`flex-1 flex flex-col items-center gap-2 p-2 rounded-xl transition-colors ${
                      day.current 
                        ? "bg-primary/10 border border-primary/30" 
                        : day.completed 
                          ? "bg-accent/10" 
                          : "bg-muted/5"
                    }`}
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="text-xs text-muted-foreground">{day.label}</span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      day.current 
                        ? "bg-primary text-primary-foreground" 
                        : day.completed 
                          ? "bg-accent text-accent-foreground" 
                          : "bg-muted/20 text-muted-foreground"
                    }`}>
                      {day.completed ? <CheckCircle2 className="w-4 h-4" /> : day.day}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Verse of the Day */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/5 border border-primary/20 relative overflow-hidden">
              <div className="absolute top-4 right-4 opacity-10">
                <Sparkles className="w-24 h-24" />
              </div>
              <p className="text-sm text-primary/80 font-medium mb-3">Versículo do Dia</p>
              <blockquote className="text-lg leading-relaxed mb-4 relative z-10">
                "Bem-aventurado o homem que... na sua lei medita de dia e de noite."
              </blockquote>
              <cite className="text-sm text-accent font-medium">— Salmos 1:1-2</cite>
            </div>
          </motion.div>

          {/* Center Column - Today's Reading */}
          <motion.div 
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Today's Reading Card */}
            <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Leitura de Hoje</h2>
                    <p className="text-sm text-muted-foreground">{todayReading.date} • Dia {todayReading.day}</p>
                  </div>
                </div>
                {allCompleted && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/20 text-accent text-sm font-medium"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Concluído
                  </motion.div>
                )}
              </div>

              {/* Chapters List */}
              <div className="space-y-3 mb-6">
                {todayReading.chapters.map((chapter, index) => (
                  <motion.button
                    key={chapter.id}
                    onClick={() => toggleChapter(chapter.id)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
                      completedChapters.includes(chapter.id)
                        ? "bg-accent/10 border-accent/30"
                        : chapter.highlighted
                          ? "bg-primary/5 border-primary/20"
                          : "bg-muted/5 border-border/50 hover:bg-muted/10"
                    }`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        completedChapters.includes(chapter.id)
                          ? "bg-accent text-accent-foreground"
                          : "bg-muted/20"
                      }`}>
                        {completedChapters.includes(chapter.id) 
                          ? <CheckCircle2 className="w-4 h-4" />
                          : <span className="text-sm font-medium">{index + 1}</span>
                        }
                      </div>
                      <span className={`font-medium ${
                        chapter.highlighted ? "text-primary" : ""
                      } ${completedChapters.includes(chapter.id) ? "line-through opacity-60" : ""}`}>
                        {chapter.name}
                      </span>
                    </div>
                    <ChevronRight className={`w-5 h-5 transition-transform ${
                      completedChapters.includes(chapter.id) ? "text-accent" : "text-muted-foreground"
                    }`} />
                  </motion.button>
                ))}
              </div>

              {/* Mark as Complete Button */}
              <motion.button
                className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${
                  allCompleted
                    ? "bg-accent/20 text-accent cursor-default"
                    : "bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90"
                }`}
                whileHover={!allCompleted ? { scale: 1.01 } : {}}
                whileTap={!allCompleted ? { scale: 0.99 } : {}}
                onClick={() => {
                  if (!allCompleted) {
                    markAllAsRead();
                  }
                }}
              >
                {allCompleted ? "✓ Leitura Concluída" : "Marcar Tudo como Lido"}
              </motion.button>
            </div>

            {/* Tabs Navigation */}
            <div className="flex gap-2 p-1.5 rounded-xl bg-muted/10 border border-border/50">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium text-sm transition-all ${
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/10"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content - Calendar Grid */}
            {activeTab === "calendario" && (
              <motion.div 
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {Array.from({ length: 12 }, (_, i) => ({
                  day: i + 1,
                  completed: i < 2,
                  current: i === 2,
                })).map((item) => (
                  <motion.div
                    key={item.day}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      item.current
                        ? "bg-primary/10 border-primary/30"
                        : item.completed
                          ? "bg-accent/10 border-accent/30"
                          : "bg-card/30 border-border/30 hover:bg-muted/10"
                    }`}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-lg font-bold ${
                        item.current ? "text-primary" : item.completed ? "text-accent" : ""
                      }`}>
                        Dia {item.day}
                      </span>
                      {item.completed && (
                        <CheckCircle2 className="w-5 h-5 text-accent" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {item.day < 10 ? `0${item.day}` : item.day} de Janeiro
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === "estatisticas" && (
              <StatisticsGrid />
            )}

            {activeTab === "conquistas" && (
              <AchievementsGrid />
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Biblia;
