import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  BookOpen, 
  Heart, 
  MessageCircle, 
  CheckCircle2,
  Flame,
  Calendar,
  Trophy,
  Loader2,
  ArrowLeft,
  Star,
  Quote
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useGameSounds } from "@/hooks/useGameSounds";
import { triggerConfetti } from "@/utils/confetti";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { AppHeader } from "@/components/shared/AppHeader";
import { DevotionalCalendar } from "@/components/devocional/DevotionalCalendar";
import { devotionals, AVAILABLE_DEVOTIONAL_DAYS, Devotional } from "@/data/devotionals";
import { format, startOfYear, differenceInDays } from "date-fns";
import { ptBR } from "date-fns/locale";

const Devocional = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { playSound } = useGameSounds();
  const [showCalendar, setShowCalendar] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedDayOfYear, setSelectedDayOfYear] = useState<number | null>(null);
  const [completedDates, setCompletedDates] = useState<string[]>([]);
  const [stats, setStats] = useState({
    totalCompleted: 0,
    currentStreak: 0,
    bestStreak: 0,
  });

  // Get today's date in Brazil timezone
  const today = useMemo(() => {
    const now = new Date();
    return new Date(now.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }));
  }, []);

  const todayStr = useMemo(() => {
    return format(today, "yyyy-MM-dd");
  }, [today]);

  const yearStart = useMemo(() => startOfYear(today), [today]);

  // Get the selected devotional based on day of year
  const selectedDevotional = useMemo(() => {
    if (selectedDayOfYear === null) return null;
    // Day of year 1 = devotional index 0
    const index = selectedDayOfYear - 1;
    if (index >= 0 && index < devotionals.length) {
      return devotionals[index];
    }
    return null;
  }, [selectedDayOfYear]);

  // Get formatted date for the selected day
  const selectedDate = useMemo(() => {
    if (selectedDayOfYear === null) return null;
    const date = new Date(yearStart);
    date.setDate(date.getDate() + selectedDayOfYear - 1);
    return date;
  }, [selectedDayOfYear, yearStart]);

  const formattedDate = useMemo(() => {
    if (!selectedDate) return "";
    return format(selectedDate, "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR });
  }, [selectedDate]);

  // Redirect to auth if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  // Load completion status and stats
  useEffect(() => {
    const loadData = async () => {
      if (!user) return;

      try {
        // Get all completions for stats
        const { data: completions } = await supabase
          .from("devotional_completions")
          .select("devotional_date")
          .eq("user_id", user.id)
          .order("devotional_date", { ascending: false });

        if (completions) {
          const totalCompleted = completions.length;
          const dates = completions.map(c => c.devotional_date);
          setCompletedDates(dates);

          // Calculate streaks
          let currentStreak = 0;
          let bestStreak = 0;
          let tempStreak = 0;
          let lastDate: Date | null = null;

          // Sort dates in ascending order for streak calculation
          const sortedDates = completions
            .map((c) => new Date(c.devotional_date))
            .sort((a, b) => a.getTime() - b.getTime());

          sortedDates.forEach((date) => {
            if (!lastDate) {
              tempStreak = 1;
            } else {
              const diff = Math.floor((date.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
              if (diff === 1) {
                tempStreak++;
              } else {
                tempStreak = 1;
              }
            }
            bestStreak = Math.max(bestStreak, tempStreak);
            lastDate = date;
          });

          // Check if current streak is active (includes today or yesterday)
          const yesterdayDate = new Date(today);
          yesterdayDate.setDate(yesterdayDate.getDate() - 1);

          if (lastDate) {
            const lastDateStr = format(lastDate, "yyyy-MM-dd");
            if (lastDateStr === todayStr || lastDateStr === format(yesterdayDate, "yyyy-MM-dd")) {
              currentStreak = tempStreak;
            }
          }

          setStats({ totalCompleted, currentStreak, bestStreak });
        }
      } catch (error) {
        console.error("Error loading devotional data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user, today, todayStr]);

  // Check if selected devotional is completed
  useEffect(() => {
    if (selectedDate) {
      const dateStr = format(selectedDate, "yyyy-MM-dd");
      setIsCompleted(completedDates.includes(dateStr));
    }
  }, [selectedDate, completedDates]);

  const handleSelectDate = (dayOfYear: number) => {
    setSelectedDayOfYear(dayOfYear);
    setShowCalendar(false);
  };

  const handleBackToCalendar = () => {
    setShowCalendar(true);
    setSelectedDayOfYear(null);
  };

  const handleComplete = async () => {
    if (!user || isCompleted || !selectedDate) return;

    const dateStr = format(selectedDate, "yyyy-MM-dd");

    try {
      const { error } = await supabase.from("devotional_completions").insert({
        user_id: user.id,
        devotional_date: dateStr,
      });

      if (error) throw error;

      setIsCompleted(true);
      setCompletedDates(prev => [...prev, dateStr]);
      setStats((prev) => ({
        ...prev,
        totalCompleted: prev.totalCompleted + 1,
        currentStreak: prev.currentStreak + 1,
        bestStreak: Math.max(prev.bestStreak, prev.currentStreak + 1),
      }));

      playSound("achievement");
      triggerConfetti("celebration");
      toast.success("Devocional concluído!");
    } catch (error) {
      console.error("Error completing devotional:", error);
      toast.error("Erro ao marcar como concluído");
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Carregando devocional...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-yellow-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6">
        {/* Header */}
        <AppHeader 
          userId={user?.id}
          rightContent={
            stats.currentStreak > 0 && (
              <motion.div 
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/30"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
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
                  <Flame className="w-4 h-4 text-orange-500" />
                </motion.div>
                <span className="font-semibold text-sm text-orange-400">{stats.currentStreak} dias</span>
              </motion.div>
            )
          }
        />

        <AnimatePresence mode="wait">
          {showCalendar ? (
            <motion.div
              key="calendar"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Stats Cards */}
              <motion.div 
                className="grid grid-cols-3 gap-3 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 text-center">
                  <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-gradient-to-br from-amber-500/20 to-yellow-500/20 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-amber-500" />
                  </div>
                  <p className="text-2xl font-bold">{stats.totalCompleted}</p>
                  <p className="text-xs text-muted-foreground">Devocionais</p>
                </div>
                <div className="p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 text-center">
                  <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-gradient-to-br from-orange-500/20 to-amber-500/20 flex items-center justify-center">
                    <Flame className="w-5 h-5 text-orange-500" />
                  </div>
                  <p className="text-2xl font-bold">{stats.currentStreak}</p>
                  <p className="text-xs text-muted-foreground">Sequência</p>
                </div>
                <div className="p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 text-center">
                  <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                  </div>
                  <p className="text-2xl font-bold">{stats.bestStreak}</p>
                  <p className="text-xs text-muted-foreground">Recorde</p>
                </div>
              </motion.div>

              <DevotionalCalendar
                onSelectDate={handleSelectDate}
                availableDays={AVAILABLE_DEVOTIONAL_DAYS}
                completedDates={completedDates}
              />
            </motion.div>
          ) : selectedDevotional ? (
            <motion.div
              key="devotional"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Back Button */}
              <motion.button
                onClick={handleBackToCalendar}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                whileHover={{ x: -4 }}
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Voltar ao Calendário</span>
              </motion.button>

              {/* Title Card */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 to-yellow-500/5 border border-amber-500/20 relative overflow-hidden">
                <div className="absolute top-4 right-4 opacity-10">
                  <Sparkles className="w-24 h-24" />
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground capitalize">{formattedDate}</p>
                  </div>
                </div>
                
                <h1 className="text-2xl sm:text-3xl font-bold text-center mt-4 mb-2">
                  {String(selectedDevotional.id).padStart(2, "0")} • {selectedDevotional.title}
                </h1>
                
                {isCompleted && (
                  <motion.div 
                    className="flex items-center justify-center gap-2 mt-4"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent">
                      <CheckCircle2 className="w-5 h-5" />
                      <span className="font-medium">Concluído!</span>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Verse */}
              <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Versículo do Dia</h3>
                    <p className="text-sm text-muted-foreground">Medite nesta palavra</p>
                  </div>
                </div>
                <blockquote className="text-lg leading-relaxed mb-4 italic border-l-4 border-primary/30 pl-4">
                  "{selectedDevotional.verse.text}"
                </blockquote>
                <cite className="text-sm text-accent font-medium">— {selectedDevotional.verse.reference}</cite>
              </div>

              {/* Meditation */}
              <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500/20 to-yellow-500/20 flex items-center justify-center flex-shrink-0">
                    <Heart className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Meditação</h3>
                    <p className="text-sm text-muted-foreground">Deixe a Palavra falar ao seu coração</p>
                  </div>
                </div>
                <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {selectedDevotional.meditation}
                </div>
              </div>

              {/* Prayer */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-accent/10 to-primary/5 border border-accent/20">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Oração</h3>
                    <p className="text-sm text-muted-foreground">Converse com Deus</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic leading-relaxed">
                  {selectedDevotional.prayer}
                </p>
              </div>

              {/* Phrase of the Day */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-yellow-500/10 to-orange-500/5 border border-yellow-500/20">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center flex-shrink-0">
                    <Quote className="w-5 h-5 text-yellow-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Frase do Dia</h3>
                    <p className="text-sm text-muted-foreground">Inspiração para refletir</p>
                  </div>
                </div>
                <blockquote className="text-lg leading-relaxed mb-2 italic text-center">
                  "{selectedDevotional.phraseOfDay.text}"
                </blockquote>
                <p className="text-sm text-muted-foreground text-center">
                  — {selectedDevotional.phraseOfDay.author}
                </p>
              </div>

              {/* Application */}
              <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <Star className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Aplicação</h3>
                    <p className="text-sm text-muted-foreground">Coloque em prática</p>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {selectedDevotional.application}
                </p>
              </div>

              {/* Complete Button */}
              <motion.button
                onClick={handleComplete}
                disabled={isCompleted}
                className={`w-full py-4 rounded-2xl font-semibold text-lg transition-all ${
                  isCompleted
                    ? "bg-accent/20 text-accent cursor-default"
                    : "bg-gradient-to-r from-amber-500 to-yellow-500 text-white hover:opacity-90"
                }`}
                whileHover={!isCompleted ? { scale: 1.01 } : {}}
                whileTap={!isCompleted ? { scale: 0.99 } : {}}
              >
                {isCompleted ? (
                  <span className="flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    Devocional Concluído
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Marcar como Concluído
                  </span>
                )}
              </motion.button>

              {/* Achievement Hint */}
              {!isCompleted && (
                <motion.p 
                  className="text-center text-sm text-muted-foreground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Complete devocionais diários para aumentar sua sequência!
                </motion.p>
              )}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Devocional;
