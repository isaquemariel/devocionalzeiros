import { useState, useEffect, useMemo } from "react"; // refreshed
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { 
  BookOpen, 
  Calendar, 
  Trophy, 
  BarChart3, 
  CheckCircle2,
  ChevronRight,
  Loader2,
  Settings,
  Book,
  HelpCircle,
  Eye,
  Brain
} from "lucide-react";
import AchievementsGrid from "@/components/biblia/AchievementsGrid";
import StatisticsGrid from "@/components/biblia/StatisticsGrid";
import PlanSelection from "@/components/biblia/PlanSelection";
import ReadingCalendar from "@/components/biblia/ReadingCalendar";
import PomodoroTimer from "@/components/biblia/PomodoroTimer";
import ChapterReadingModal from "@/components/biblia/ChapterReadingModal";
import { CustomPlanModal } from "@/components/biblia/CustomPlanModal";
import { PlanCompletionModal } from "@/components/biblia/PlanCompletionModal";
import { PlanHistorySection } from "@/components/biblia/PlanHistorySection";
import { StudyBibleChapterModal } from "@/components/biblia/StudyBibleChapterModal";
import { QuizModal } from "@/components/quiz/QuizModal";
import { LockedFeatureModal } from "@/components/shared/LockedFeatureModal";
import { BottomNavBar } from "@/components/shared/BottomNavBar";
import { useGameSounds } from "@/hooks/useGameSounds";
import { triggerConfetti } from "@/utils/confetti";
import { useAuth } from "@/hooks/useAuth";
import { useReadingProgress } from "@/hooks/useReadingProgress";
import { useQuiz } from "@/hooks/useQuiz";
import { useDailyLogin } from "@/hooks/useDailyLogin";
import { useUserPlan } from "@/hooks/useUserPlan";
import { useUsageLimits } from "@/hooks/useUsageLimits";
import { UsageLimitModal } from "@/components/shared/UsageLimitModal";
import { readingPlans, ReadingPlan, getBrazilDate, formatDateBR, generateCustomReadingSchedule } from "@/lib/bibleData";
import { toast } from "sonner";
import { AppHeader } from "@/components/shared/AppHeader";
import { supabase } from "@/integrations/supabase/client";

const ProgressRing = ({ progress, size = 80, strokeWidth = 6 }: { progress: number; size?: number; strokeWidth?: number }) => {
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
        <span className="text-lg font-bold text-foreground">{progress}%</span>
      </div>
    </div>
  );
};

const Biblia = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { theme } = useTheme();
  const { user, profile, loading: authLoading, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState(() => {
    const tabParam = searchParams.get('tab');
    return tabParam === 'conquistas' || tabParam === 'estatisticas' ? tabParam : 'calendario';
  });
  const [showPlanSelection, setShowPlanSelection] = useState(false);
  const [showCustomPlanModal, setShowCustomPlanModal] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [totalReadingMinutes, setTotalReadingMinutes] = useState(0);
  const [selectedChapter, setSelectedChapter] = useState<{ book: string; chapter: number; isCompleted: boolean } | null>(null);
  const [studyBibleChapter, setStudyBibleChapter] = useState<{ book: string; chapter: number; isCompleted: boolean } | null>(null);
  const [quizModalOpen, setQuizModalOpen] = useState(false);
  const [lockedFeatureModal, setLockedFeatureModal] = useState<{ isOpen: boolean; featureName: string }>({ isOpen: false, featureName: "" });
  const { playSound } = useGameSounds();
  
  // User plan access - all features now accessible to all plans (with usage limits)
  const { planType, hasAccessTo } = useUserPlan(user?.email || undefined);
  const { checkLimit, incrementUsage } = useUsageLimits(user?.id, planType);
  const [usageLimitModal, setUsageLimitModal] = useState<{ isOpen: boolean; featureName: string; currentUsage: number; limit: number; isBlocked: boolean } | null>(null);
  const canAccessExplanations = true; // Now available to all with daily limits
  const canAccessQuiz = planType !== "free"; // Quiz in reading plan only for gold+ 
  const canAccessStudyBible = true; // Now available to all with daily limits
  const canAccessReading = hasAccessTo("leitura"); // Basic reading (all plans)
  const isPremium = planType === "premium" || planType === "embaixador" || planType === "admin";
  const isGoldPlus = planType === "gold" || isPremium;

  // Record daily login
  useDailyLogin(user?.id);

  // Quiz hook
  const quiz = useQuiz(user?.id);
  const startDate = useMemo(() => {
    if (profile?.created_at) {
      return new Date(profile.created_at);
    }
    return getBrazilDate();
  }, [profile]);

  const currentPlan = (profile?.reading_plan || "365") as ReadingPlan;
  const planConfig = currentPlan !== "custom" ? readingPlans[currentPlan as keyof typeof readingPlans] : readingPlans["365"];

  const {
    schedule,
    loading: scheduleLoading,
    currentDay,
    streak,
    markChapterComplete,
    markDayComplete,
    regenerateSchedule,
    getTodaySchedule,
    isPlanComplete,
  } = useReadingProgress(user?.id, currentPlan, startDate);

  const todaySchedule = getTodaySchedule();

  // Handle quiz=true query param
  const handleStartQuiz = () => {
    if (!canAccessQuiz) {
      setUsageLimitModal({
        isOpen: true,
        featureName: "Quiz no Plano de Leitura",
        currentUsage: 0,
        limit: 0,
        isBlocked: true,
      });
      return;
    }
    navigate('/quiz');
  };

  // Open quiz automatically if coming with ?quiz=true
  useEffect(() => {
    const openQuiz = searchParams.get('quiz') === 'true';
    if (openQuiz && todaySchedule && !scheduleLoading) {
      // Remove the query param
      setSearchParams({});
      // Start quiz
      handleStartQuiz();
    }
  }, [searchParams, todaySchedule, scheduleLoading]);

  // Redirect to auth if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  // Show plan selection on first access (onboarding)
  useEffect(() => {
    if (!authLoading && profile && !profile.has_completed_onboarding && !showPlanSelection) {
      setShowPlanSelection(true);
    }
  }, [authLoading, profile]);


  const tabs = [
    { id: "calendario", label: "Calendário", icon: Calendar },
    { id: "estatisticas", label: "Estatísticas", icon: BarChart3 },
    { id: "conquistas", label: "Conquistas", icon: Trophy },
  ];

  const menuItems = [
    {
      id: "quiz",
      label: "Quiz Bíblico",
      icon: Brain,
      color: "from-amber-500 to-orange-600",
      onClick: handleStartQuiz,
      disabled: false,
      comingSoon: false,
    },
    {
      id: "change-plan",
      label: "Alterar Plano",
      icon: Book,
      color: "from-primary to-accent",
      onClick: () => setShowPlanSelection(true),
    },
    {
      id: "support",
      label: "Suporte",
      icon: HelpCircle,
      color: "from-green-500 to-green-600",
      onClick: () => window.open("https://wa.me/+5584999488698?text=Oii%2C%20equipe.%20Preciso%20de%20suporte.%20", "_blank"),
      disabled: false,
      comingSoon: false,
    },
  ];

  const handleSelectPlan = async (plan: ReadingPlan) => {
    if (plan === "custom") {
      // Check custom plan usage limit
      const customPlanLimit = checkLimit("custom_plan");
      if (!customPlanLimit.canUse) {
        setUsageLimitModal({
          isOpen: true,
          featureName: "Plano Personalizado",
          currentUsage: customPlanLimit.currentUsage,
          limit: customPlanLimit.limit,
          isBlocked: customPlanLimit.isBlocked,
        });
        return;
      }
      // Open custom plan modal
      setShowPlanSelection(false);
      setShowCustomPlanModal(true);
      return;
    }

    const { error } = await updateProfile({
      reading_plan: plan as any,
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

  const handleCustomPlanConfirm = async (planData: { name: string; description: string; books: string[]; totalDays: number; totalChapters: number; chaptersPerDay: number }) => {
    if (!user?.id) return;

    try {
      // Save the custom plan to database
      const { data: customPlan, error: planError } = await supabase
        .from("custom_reading_plans")
        .insert({
          user_id: user.id,
          plan_name: planData.name,
          plan_description: planData.description,
          selected_books: planData.books,
          total_days: planData.totalDays,
          total_chapters: planData.totalChapters,
          chapters_per_day: planData.chaptersPerDay,
          is_active: true,
        })
        .select()
        .single();

      if (planError) throw planError;

      // Update profile to custom plan
      const { error: profileError } = await updateProfile({
        reading_plan: "custom",
        has_completed_onboarding: true,
      });

      if (profileError) throw profileError;

      // Regenerate schedule with custom books
      await regenerateSchedule("custom", planData.books, planData.totalDays);

      setShowCustomPlanModal(false);
      playSound("success");
      triggerConfetti("celebration");
      toast.success(`Plano "${planData.name}" criado com sucesso!`);
    } catch (error) {
      console.error("Error creating custom plan:", error);
      toast.error("Erro ao criar plano personalizado");
    }
  };

  const [hasShownCompletion, setHasShownCompletion] = useState(false);

  const handleRecordPlanCompletion = async () => {
    if (!user?.id || hasShownCompletion) return;

    try {
      // Check if already recorded this completion
      const { data: existing } = await supabase
        .from("plan_completions")
        .select("id")
        .eq("user_id", user.id)
        .eq("plan_type", currentPlan)
        .maybeSingle();

      if (existing) {
        // Already recorded
        return;
      }

      // Record completion in database
      await supabase.from("plan_completions").insert({
        user_id: user.id,
        plan_type: currentPlan,
        bonus_points: 10,
      });

      // Show celebration
      setHasShownCompletion(true);
      playSound("achievement");
      triggerConfetti("celebration");
      setShowCompletionModal(true);
    } catch (error) {
      console.error("Error recording plan completion:", error);
    }
  };

  // Check for plan completion
  useEffect(() => {
    if (!scheduleLoading && isPlanComplete() && schedule.length > 0 && !hasShownCompletion) {
      handleRecordPlanCompletion();
    }
  }, [scheduleLoading, schedule, hasShownCompletion]);

  const handleOpenChapter = async (book: string, chapter: number, isCompleted: boolean) => {
    // Check reading chapter explanation usage limit (not for premium/admin)
    if (!isPremium) {
      const chapterLimit = checkLimit("reading_chapter_explanation");
      if (!chapterLimit.canUse) {
        setUsageLimitModal({
          isOpen: true,
          featureName: "Explicação de Capítulo",
          currentUsage: chapterLimit.currentUsage,
          limit: chapterLimit.limit,
          isBlocked: chapterLimit.isBlocked,
        });
        return;
      }
      await incrementUsage("reading_chapter_explanation");
    }
    setSelectedChapter({ book, chapter, isCompleted });
  };

  const handleCloseChapter = () => {
    setSelectedChapter(null);
  };

  const handleMarkChapterFromModal = async () => {
    if (!selectedChapter || !todaySchedule) return;
    
    await markChapterComplete(todaySchedule.date, selectedChapter.book, selectedChapter.chapter);
    playSound("complete");
    triggerConfetti("complete");
    
    // Check if all chapters are now complete
    const updatedChapters = todaySchedule.chapters.map((c) =>
      c.book === selectedChapter.book && c.chapter === selectedChapter.chapter ? { ...c, isCompleted: true } : c
    );
    
    if (updatedChapters.every((c) => c.isCompleted)) {
      playSound("achievement");
      triggerConfetti("celebration");
      toast.success("Parabéns! Leitura do dia concluída! 🎉");
    }
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

  const handleOpenStudyBible = (book: string, chapter: number, isCompleted: boolean) => {
    // Basic reading is available for all plans with "leitura" access
    if (!canAccessReading) {
      setLockedFeatureModal({ isOpen: true, featureName: "Leitura Bíblica" });
      return;
    }
    setStudyBibleChapter({ book, chapter, isCompleted });
  };

  const handleCloseStudyBible = () => {
    setStudyBibleChapter(null);
  };

  const handleMarkFromStudyBible = async () => {
    if (!studyBibleChapter || !todaySchedule) return;
    
    // Mark in the reading schedule (plan progress)
    await markChapterComplete(todaySchedule.date, studyBibleChapter.book, studyBibleChapter.chapter);
    playSound("complete");
    triggerConfetti("complete");
    
    // Update local state
    setStudyBibleChapter({ ...studyBibleChapter, isCompleted: true });
    
    // Check if all chapters are now complete
    const updatedChapters = todaySchedule.chapters.map((c) =>
      c.book === studyBibleChapter.book && c.chapter === studyBibleChapter.chapter ? { ...c, isCompleted: true } : c
    );
    
    if (updatedChapters.every((c) => c.isCompleted)) {
      playSound("achievement");
      triggerConfetti("celebration");
      toast.success("Parabéns! Leitura do dia concluída! 🎉");
    }
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
        onOpenCustomPlan={() => {
          setShowPlanSelection(false);
          setShowCustomPlanModal(true);
        }}
        isPremium={isGoldPlus}
        onBack={() => setShowPlanSelection(false)}
        planType={planType || "free"}
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
    // Handle Sunday (dayOfWeek = 0) correctly - go back to previous Monday
    const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    weekStart.setDate(today.getDate() - daysToSubtract);

    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + i);
      const dateKey = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
      const daySchedule = schedule.find((s) => s.date === dateKey);

      return {
        day: date.getDate(), // Show actual calendar date
        label: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"][i],
        completed: daySchedule?.isCompleted || false,
        current: date.toDateString() === today.toDateString(),
      };
    });
  };

  const weekDays = getWeekDays();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 pb-32">
        {/* Header */}
        <AppHeader userId={user?.id} userEmail={user?.email || undefined} />

        {/* Top Section: Progress + Pomodoro */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* Progress Card - Compact */}
          <div className="p-4 sm:p-5 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50">
            <div className="flex items-center gap-4">
              <ProgressRing progress={progressPercent} size={70} strokeWidth={5} />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground mb-1">Progresso</p>
                <p className="text-lg font-bold">Dia {currentDay} <span className="text-muted-foreground font-normal text-sm">de {totalDays}</span></p>
              </div>
            </div>

            {/* Week Progress - Compact */}
            <div className="flex justify-between gap-1 mt-4">
              {weekDays.map((day) => (
                <motion.div
                  key={day.day}
                  className={`flex-1 flex flex-col items-center gap-1 p-1.5 rounded-lg transition-colors ${
                    day.current 
                      ? "bg-primary/10 border border-primary/30" 
                      : day.completed 
                        ? "bg-accent/10" 
                        : "bg-muted/5"
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="text-[10px] text-muted-foreground">{day.label}</span>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                    day.current 
                      ? "bg-primary text-primary-foreground" 
                      : day.completed 
                        ? "bg-accent text-accent-foreground" 
                        : "bg-muted/20 text-muted-foreground"
                  }`}>
                    {day.completed ? <CheckCircle2 className="w-3 h-3" /> : day.day}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Pomodoro Timer - Compact */}
          <PomodoroTimer
            onTimeUpdate={(minutes) => setTotalReadingMinutes(minutes)}
            onSessionComplete={(minutes) => {
              toast.success(`Sessão de ${minutes} minutos concluída! 🎉`);
              playSound("achievement");
            }}
          />
        </motion.div>

        {/* Main Grid: Menu Sidebar + Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Left Sidebar - Menu */}
          <motion.aside 
            className="lg:col-span-1 order-2 lg:order-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="p-4 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 sticky top-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <Settings className="w-4 h-4 text-primary" />
                </div>
                <h2 className="text-sm font-bold">Menu</h2>
              </div>

              <div className="space-y-2 mb-4">
                {menuItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    onClick={item.onClick}
                    disabled={item.disabled}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                      item.disabled
                        ? "bg-muted/5 border-border/30 opacity-60 cursor-not-allowed"
                        : "bg-muted/5 border-border/50 hover:bg-muted/10 hover:border-primary/30"
                    }`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    whileHover={!item.disabled ? { scale: 1.02 } : {}}
                    whileTap={!item.disabled ? { scale: 0.98 } : {}}
                  >
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0`}>
                      <item.icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-medium truncate">{item.label}</span>
                        {item.comingSoon && (
                          <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-muted/30 text-muted-foreground whitespace-nowrap">
                            Em breve
                          </span>
                        )}
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 flex-shrink-0 ${
                      item.disabled ? "text-muted-foreground/50" : "text-muted-foreground"
                    }`} />
                  </motion.button>
                ))}
              </div>

              {/* Plan History Section */}
              <PlanHistorySection
                userId={user?.id}
                isPremium={isGoldPlus}
                onRestartPlan={async (plan, customPlanCache) => {
                  if (plan === "custom" && customPlanCache) {
                    // Reuse cached custom plan
                    await updateProfile({
                      reading_plan: "custom",
                    });
                    await regenerateSchedule("custom", customPlanCache.selected_books, customPlanCache.total_days);
                    toast.success(`Plano "${customPlanCache.plan_name}" reiniciado!`);
                    playSound("success");
                    triggerConfetti("celebration");
                  } else {
                    await handleSelectPlan(plan);
                  }
                }}
              />
            </div>
          </motion.aside>

          {/* Main Content Area */}
          <motion.main 
            className="lg:col-span-3 order-1 lg:order-2 space-y-4 sm:space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Today's Reading Card */}
            <div className="p-4 sm:p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold">Leitura de Hoje</h2>
                    <p className="text-xs sm:text-sm text-muted-foreground">{formattedDate} • Dia {currentDay}</p>
                  </div>
                </div>
                {allCompleted && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent/20 text-accent text-xs font-medium"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Concluído</span>
                  </motion.div>
                )}
              </div>

              {/* Chapters List */}
              <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                {todaySchedule?.chapters.map((chapter, index) => (
                  <motion.div
                    key={`${chapter.book}-${chapter.chapter}`}
                    className={`w-full flex items-center justify-between p-3 sm:p-4 rounded-xl border transition-all ${
                      chapter.isCompleted
                        ? "bg-accent/10 border-accent/30"
                        : "bg-muted/5 border-border/50"
                    }`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center ${
                        chapter.isCompleted
                          ? "bg-accent text-accent-foreground"
                          : "bg-muted/20"
                      }`}>
                        {chapter.isCompleted 
                          ? <CheckCircle2 className="w-4 h-4" />
                          : <span className="text-sm font-medium">{index + 1}</span>
                        }
                      </div>
                      <span className={`font-medium text-sm sm:text-base ${chapter.isCompleted ? "line-through opacity-60" : ""}`}>
                        {chapter.book} {chapter.chapter}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      {/* Read in Study Bible */}
                      <motion.button
                        onClick={() => handleOpenStudyBible(chapter.book, chapter.chapter, chapter.isCompleted)}
                        className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-400 text-sm font-medium hover:bg-amber-500/20 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline text-xs">Ler</span>
                      </motion.button>
                      {/* Explanation button */}
                      <motion.button
                        onClick={() => handleOpenChapter(chapter.book, chapter.chapter, chapter.isCompleted)}
                        className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline text-xs">Explicação</span>
                      </motion.button>
                      {/* Quiz shortcut - only for completed chapters AND gold+ plans */}
                      {chapter.isCompleted && canAccessQuiz && (
                        <motion.button
                          onClick={() => {
                            navigate(`/quiz?mode=plano&book=${encodeURIComponent(chapter.book)}&chapter=${chapter.chapter}`);
                          }}
                          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-orange-500/10 text-orange-400 text-sm font-medium hover:bg-orange-500/20 transition-colors"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Brain className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline text-xs">Quiz</span>
                        </motion.button>
                      )}
                      {!chapter.isCompleted && (
                        <motion.button
                          onClick={() => handleToggleChapter(chapter.book, chapter.chapter)}
                          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-accent/10 text-accent text-sm font-medium hover:bg-accent/20 transition-colors"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline text-xs">Marcar</span>
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Mark as Complete Button */}
              <motion.button
                className={`w-full py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all ${
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
            <div className="flex gap-1.5 sm:gap-2 p-1 sm:p-1.5 rounded-xl bg-muted/10 border border-border/50">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 sm:py-3 px-2 sm:px-4 rounded-lg font-medium text-xs sm:text-sm transition-all ${
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/10"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="hidden xs:inline sm:inline">{tab.label}</span>
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
                    isCompleted: c.isCompleted,
                  })),
                }))}
                onDayClick={(date) => {
                  console.log("Day clicked:", date);
                }}
                onMarkDayComplete={async (date) => {
                  await markDayComplete(date);
                  playSound("achievement");
                  triggerConfetti("celebration");
                  toast.success("Leitura do dia marcada como concluída! 🎉");
                }}
                onMarkChapterComplete={async (date, book, chapter) => {
                  await markChapterComplete(date, book, chapter);
                  playSound("complete");
                  triggerConfetti("complete");
                }}
                onOpenChapter={(book, chapter, isCompleted) => {
                  setSelectedChapter({ book, chapter, isCompleted });
                }}
                onReadChapter={(book, chapter, isCompleted) => {
                  handleOpenStudyBible(book, chapter, isCompleted);
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
                userId={user?.id}
              />
            )}

            {activeTab === "conquistas" && (
              <AchievementsGrid userId={user?.id} />
            )}
          </motion.main>
        </div>
      </div>

      {/* Chapter Reading Modal */}
      {selectedChapter && (
        <ChapterReadingModal
          isOpen={!!selectedChapter}
          onClose={handleCloseChapter}
          book={selectedChapter.book}
          chapter={selectedChapter.chapter}
          isCompleted={selectedChapter.isCompleted}
          onMarkComplete={handleMarkChapterFromModal}
        />
      )}

      {/* Study Bible Chapter Modal */}
      {studyBibleChapter && (
        <StudyBibleChapterModal
          isOpen={!!studyBibleChapter}
          onClose={handleCloseStudyBible}
          bookName={studyBibleChapter.book}
          chapter={studyBibleChapter.chapter}
          userId={user?.id}
          isCompleted={studyBibleChapter.isCompleted}
          onMarkComplete={handleMarkFromStudyBible}
          canAccessStudyFeatures={canAccessStudyBible}
        />
      )}

      {/* Quiz Modal */}
      <QuizModal
        isOpen={quizModalOpen}
        onClose={() => setQuizModalOpen(false)}
        currentQuestion={quiz.currentQuestion}
        currentQuestionIndex={quiz.currentQuestionIndex}
        totalQuestions={quiz.totalQuestions}
        onSubmitAnswer={quiz.submitAnswer}
        results={quiz.results}
        quizCompleted={quiz.quizCompleted}
        loading={quiz.loading}
        onEndQuiz={() => {
          quiz.resetQuiz();
          setQuizModalOpen(false);
        }}
      />

      {/* Locked Feature Modal */}
      <LockedFeatureModal
        isOpen={lockedFeatureModal.isOpen}
        onClose={() => setLockedFeatureModal({ isOpen: false, featureName: "" })}
        featureName={lockedFeatureModal.featureName}
        isFreePlan={planType === "free"}
      />

      {/* Custom Plan Modal */}
      <CustomPlanModal
        isOpen={showCustomPlanModal}
        onClose={() => setShowCustomPlanModal(false)}
        onConfirm={handleCustomPlanConfirm}
      />

      {/* Plan Completion Modal */}
      <PlanCompletionModal
        isOpen={showCompletionModal}
        onClose={() => setShowCompletionModal(false)}
        onSelectNewPlan={() => {
          setShowCompletionModal(false);
          setShowPlanSelection(true);
        }}
        planName={planConfig?.name || "Plano Personalizado"}
        bonusPoints={10}
      />

      {/* Usage Limit Modal */}
      {usageLimitModal && (
        <UsageLimitModal
          isOpen={usageLimitModal.isOpen}
          onClose={() => setUsageLimitModal(null)}
          featureName={usageLimitModal.featureName}
          currentUsage={usageLimitModal.currentUsage}
          limit={usageLimitModal.limit}
          isBlocked={usageLimitModal.isBlocked}
          planType={planType || "free"}
        />
      )}
      <BottomNavBar />
    </div>
  );
};

export default Biblia;
