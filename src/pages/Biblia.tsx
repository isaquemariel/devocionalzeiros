import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Flame, 
  BookOpen, 
  Calendar, 
  Trophy, 
  BarChart3, 
  CheckCircle2,
  ChevronRight,
  Sparkles,
  LogOut,
  Settings,
  Loader2
} from "lucide-react";
import AchievementsGrid from "@/components/biblia/AchievementsGrid";
import StatisticsGrid from "@/components/biblia/StatisticsGrid";
import PlanSelection from "@/components/biblia/PlanSelection";
import ReadingCalendar from "@/components/biblia/ReadingCalendar";
import PomodoroTimer from "@/components/biblia/PomodoroTimer";
import { useGameSounds } from "@/hooks/useGameSounds";
import { triggerConfetti } from "@/utils/confetti";
import { useAuth } from "@/hooks/useAuth";
import { useReadingProgress } from "@/hooks/useReadingProgress";
import { readingPlans, ReadingPlan, getBrazilDate, formatDateBR } from "@/lib/bibleData";
import { toast } from "sonner";

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
  const navigate = useNavigate();
  const { user, profile, loading: authLoading, signOut, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState("calendario");
  const [showPlanSelection, setShowPlanSelection] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [totalReadingMinutes, setTotalReadingMinutes] = useState(0);
  const { playSound } = useGameSounds();

  // Get plan start date from profile creation or today
  const startDate = useMemo(() => {
    if (profile?.created_at) {
      return new Date(profile.created_at);
    }
    return getBrazilDate();
  }, [profile]);

  const currentPlan = (profile?.reading_plan || "365") as ReadingPlan;
  const planConfig = readingPlans[currentPlan];

  const {
    schedule,
    loading: scheduleLoading,
    currentDay,
    streak,
    markChapterComplete,
    markDayComplete,
    regenerateSchedule,
    getTodaySchedule,
  } = useReadingProgress(user?.id, currentPlan, startDate);

  const todaySchedule = getTodaySchedule();

  // Redirect to auth if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  // Show onboarding if needed
  useEffect(() => {
    if (profile && !profile.has_completed_onboarding) {
      setShowPlanSelection(true);
    }
  }, [profile]);

  const tabs = [
    { id: "calendario", label: "Calendário", icon: Calendar },
    { id: "estatisticas", label: "Estatísticas", icon: BarChart3 },
    { id: "conquistas", label: "Conquistas", icon: Trophy },
  ];

  const handleSelectPlan = async (plan: ReadingPlan) => {
    const { error } = await updateProfile({
      reading_plan: plan,
      has_completed_onboarding: true,
    });

    if (error) {
      toast.error("Erro ao salvar plano. Tente novamente.");
      return;
    }

    // If changing plan (not onboarding), regenerate schedule
    if (profile?.has_completed_onboarding) {
      await regenerateSchedule(plan);
      toast.success("Plano alterado com sucesso!");
    } else {
      // For onboarding, generate initial schedule
      await regenerateSchedule(plan);
      toast.success("Plano configurado! Vamos começar sua jornada.");
    }

    setShowPlanSelection(false);
    playSound("success");
    triggerConfetti("celebration");
  };

  const handleToggleChapter = async (book: string, chapter: number) => {
    if (!todaySchedule) return;

    const chapterData = todaySchedule.chapters.find(
      (c) => c.book === book && c.chapter === chapter
    );

    if (chapterData?.isCompleted) return; // Already completed

    await markChapterComplete(todaySchedule.date, book, chapter);
    playSound("complete");
    triggerConfetti("complete");

    // Check if all chapters are now complete
    const updatedChapters = todaySchedule.chapters.map((c) =>
      c.book === book && c.chapter === chapter ? { ...c, isCompleted: true } : c
    );

    if (updatedChapters.every((c) => c.isCompleted)) {
      playSound("achievement");
      triggerConfetti("celebration");
      toast.success("Parabéns! Leitura do dia concluída! 🎉");
    }
  };

  const handleMarkAllAsRead = async () => {
    if (!todaySchedule) return;

    await markDayComplete(todaySchedule.date);
    playSound("achievement");
    triggerConfetti("celebration");
    toast.success("Leitura do dia concluída! 🎉");
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  if (authLoading || (user && scheduleLoading)) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Carregando sua jornada...</p>
        </div>
      </div>
    );
  }

  if (showPlanSelection) {
    return (
      <PlanSelection
        onSelectPlan={handleSelectPlan}
        currentPlan={profile?.has_completed_onboarding ? currentPlan : undefined}
        isChangingPlan={profile?.has_completed_onboarding || false}
      />
    );
  }

  const todayDate = getBrazilDate();
  const formattedDate = formatDateBR(todayDate);
  const totalDays = planConfig.totalDays;
  const progressPercent = Math.round((currentDay / totalDays) * 100);
  const allCompleted = todaySchedule?.isCompleted || false;

  // Week days for mini calendar
  const getWeekDays = () => {
    const today = getBrazilDate();
    const dayOfWeek = today.getDay();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - dayOfWeek + 1); // Start from Monday

    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + i);
      const dateKey = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
      const daySchedule = schedule.find((s) => s.date === dateKey);

      return {
        day: i + 1,
        label: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"][i],
        completed: daySchedule?.isCompleted || false,
        current: date.toDateString() === today.toDateString(),
      };
    });
  };

  const weekDays = getWeekDays();

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
              <p className="text-xs sm:text-sm text-muted-foreground">{planConfig.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <StreakBadge days={streak} />
            <button
              onClick={() => setShowPlanSelection(true)}
              className="p-2 rounded-lg hover:bg-muted/10 transition-colors"
              title="Alterar plano"
            >
              <Settings className="w-5 h-5 text-muted-foreground" />
            </button>
            <button
              onClick={handleSignOut}
              className="p-2 rounded-lg hover:bg-muted/10 transition-colors"
              title="Sair"
            >
              <LogOut className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
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
                  <p className="text-sm text-muted-foreground">Progresso</p>
                  <p className="text-2xl font-bold">Dia {currentDay} <span className="text-muted-foreground font-normal text-base">de {totalDays}</span></p>
                </div>
                <ProgressRing progress={progressPercent} />
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

            {/* Pomodoro Timer */}
            <PomodoroTimer
              onTimeUpdate={(minutes) => setTotalReadingMinutes(minutes)}
              onSessionComplete={(minutes) => {
                toast.success(`Sessão de ${minutes} minutos concluída! 🎉`);
                playSound("achievement");
              }}
            />

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
                    <p className="text-sm text-muted-foreground">{formattedDate} • Dia {currentDay}</p>
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
                {todaySchedule?.chapters.map((chapter, index) => (
                  <motion.button
                    key={`${chapter.book}-${chapter.chapter}`}
                    onClick={() => handleToggleChapter(chapter.book, chapter.chapter)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
                      chapter.isCompleted
                        ? "bg-accent/10 border-accent/30"
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
                        chapter.isCompleted
                          ? "bg-accent text-accent-foreground"
                          : "bg-muted/20"
                      }`}>
                        {chapter.isCompleted 
                          ? <CheckCircle2 className="w-4 h-4" />
                          : <span className="text-sm font-medium">{index + 1}</span>
                        }
                      </div>
                      <span className={`font-medium ${chapter.isCompleted ? "line-through opacity-60" : ""}`}>
                        {chapter.book} {chapter.chapter}
                      </span>
                    </div>
                    <ChevronRight className={`w-5 h-5 transition-transform ${
                      chapter.isCompleted ? "text-accent" : "text-muted-foreground"
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
                    handleMarkAllAsRead();
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

            {/* Tab Content */}
            {activeTab === "calendario" && (
              <ReadingCalendar
                schedule={schedule.map((s) => ({
                  ...s,
                  chapters: s.chapters.map((c) => ({
                    book: c.book,
                    chapter: c.chapter,
                  })),
                }))}
                onDayClick={(date) => {
                  // Could open a modal with day details
                  console.log("Day clicked:", date);
                }}
                currentDay={currentDay}
                totalDays={totalDays}
              />
            )}

            {activeTab === "estatisticas" && (
              <StatisticsGrid 
                schedule={schedule} 
                streak={streak} 
                totalReadingMinutes={totalReadingMinutes}
              />
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
