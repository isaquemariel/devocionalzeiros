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
  Quote,
  Feather,
  Share2
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useGameSounds } from "@/hooks/useGameSounds";
import { useDevotionalFavorites } from "@/hooks/useDevotionalFavorites";
import { triggerConfetti } from "@/utils/confetti";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { AppHeader } from "@/components/shared/AppHeader";
import { DevotionalCalendar } from "@/components/devocional/DevotionalCalendar";
import { devotionals, AVAILABLE_DEVOTIONAL_DAYS, Devotional } from "@/data/devotionals";
import { format, startOfYear, differenceInDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ShareableDevotionalCard } from "@/components/devocional/ShareableDevotionalCard";
import { ShareOptionsModal } from "@/components/devocional/ShareOptionsModal";
import { useShareDevotional } from "@/hooks/useShareDevotional";


const Devocional = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { playSound } = useGameSounds();
  const { favorites, isFavorite, toggleFavorite } = useDevotionalFavorites(user?.id);
  const [showCalendar, setShowCalendar] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedDayOfYear, setSelectedDayOfYear] = useState<number | null>(null);
  const [completedDates, setCompletedDates] = useState<string[]>([]);
  const [showShareModal, setShowShareModal] = useState(false);
  const [isFavoriting, setIsFavoriting] = useState(false);
  const [stats, setStats] = useState({
    totalCompleted: 0,
    currentStreak: 0,
    bestStreak: 0,
  });

  const {
    cardRef,
    isGenerating,
    imagePreview,
    generateImage,
    downloadImage,
    shareToWhatsApp,
    setImagePreview,
  } = useShareDevotional();

  const handleOpenShareModal = async () => {
    setShowShareModal(true);
    // Generate preview when opening modal
    if (!imagePreview) {
      await generateImage();
    }
  };

  const handleCloseShareModal = () => {
    setShowShareModal(false);
    setImagePreview(null);
  };

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
    return format(selectedDate, "d 'de' MMMM, yyyy", { locale: ptBR });
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
        const { data: completions } = await supabase
          .from("devotional_completions")
          .select("devotional_date")
          .eq("user_id", user.id)
          .order("devotional_date", { ascending: false });

        if (completions) {
          const totalCompleted = completions.length;
          const dates = completions.map(c => c.devotional_date);
          setCompletedDates(dates);

          let currentStreak = 0;
          let bestStreak = 0;
          let tempStreak = 0;
          let lastDate: Date | null = null;

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

  const handleToggleFavorite = async () => {
    if (!selectedDayOfYear || isFavoriting) return;
    
    setIsFavoriting(true);
    try {
      const result = await toggleFavorite(selectedDayOfYear);
      if (result.success) {
        if (result.action === 'added') {
          toast.success("❤️ Devocional favoritado!", {
            description: "Você pode encontrá-lo na aba Favoritos do calendário.",
          });
        } else {
          toast.success("Devocional removido dos favoritos");
        }
      }
    } finally {
      setIsFavoriting(false);
    }
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
      <div className="relative z-10 max-w-4xl mx-auto px-2 sm:px-4 md:px-6 py-3 sm:py-5">
        {/* Header */}
        <AppHeader
          userId={user?.id}
          userEmail={user?.email}
          showBack={true}
          showLogo={true}
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
                className="grid grid-cols-3 gap-2 mb-4"
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
                favorites={favorites}
              />
            </motion.div>
          ) : selectedDevotional ? (
            <motion.div
              key="devotional"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* Back Button */}
              <motion.button
                onClick={handleBackToCalendar}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
                whileHover={{ x: -4 }}
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Voltar ao Calendário</span>
              </motion.button>

              {/* Notebook Page Container with page-turn animation */}
              <div className="animate-page-turn">
                <div className="notebook-page relative">
                  {/* Paper texture background - aged cream/ivory tone */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-50/90 via-yellow-50/70 to-orange-50/50 dark:from-stone-900/80 dark:via-amber-950/40 dark:to-stone-900/60" />
                  
                  {/* Notebook lines */}
                  <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                    <div className="notebook-lines h-full w-full" />
                  </div>

                  {/* Red margin line */}
                  <div className="absolute left-10 sm:left-14 top-0 bottom-0 w-[1px] bg-red-300/40 dark:bg-red-500/20" />

                  {/* Content */}
                  <div className="relative z-10 p-6 sm:p-8 pl-12 sm:pl-20 space-y-8">
                  
                  {/* Header */}
                  <div className="text-center pb-6 border-b border-amber-200/50 dark:border-amber-800/30">
                    <motion.div 
                      className="inline-flex items-center gap-2 text-amber-600/70 dark:text-amber-400/60 mb-3"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Feather className="w-4 h-4" />
                      <span className="text-sm font-medium tracking-wider uppercase">{formattedDate}</span>
                    </motion.div>
                    
                    <motion.h1 
                      className="text-2xl sm:text-3xl font-serif font-bold text-stone-800 dark:text-amber-100 mb-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {String(selectedDevotional.id).padStart(2, "0")}. {selectedDevotional.title}
                    </motion.h1>
                    
                    {isCompleted && (
                      <motion.div 
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.4 }}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span className="text-sm font-medium">Leitura Concluída</span>
                      </motion.div>
                    )}
                  </div>

                  {/* Verse Section */}
                  <motion.section 
                    className="space-y-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 }}
                  >
                    <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
                      <BookOpen className="w-4 h-4" />
                      <h2 className="text-sm font-semibold uppercase tracking-wider">Versículo</h2>
                    </div>
                    <blockquote className="font-serif text-lg sm:text-xl text-stone-700 dark:text-stone-300 italic leading-relaxed">
                      "{selectedDevotional.verse.text}"
                    </blockquote>
                    <cite className="block text-sm text-amber-600 dark:text-amber-500 font-medium not-italic">
                      — {selectedDevotional.verse.reference}
                    </cite>
                  </motion.section>

                  {/* Divider */}
                  <div className="flex items-center gap-4 py-2">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-300/50 to-transparent dark:via-amber-700/30" />
                    <span className="text-amber-400 dark:text-amber-600">✦</span>
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-300/50 to-transparent dark:via-amber-700/30" />
                  </div>

                  {/* Meditation Section */}
                  <motion.section 
                    className="space-y-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
                      <Heart className="w-4 h-4" />
                      <h2 className="text-sm font-semibold uppercase tracking-wider">Meditação</h2>
                    </div>
                    <p className="text-stone-600 dark:text-stone-400 leading-relaxed whitespace-pre-line">
                      {selectedDevotional.meditation}
                    </p>
                  </motion.section>

                  {/* Prayer Section */}
                  <motion.section 
                    className="space-y-3 p-4 sm:p-5 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border-l-4 border-blue-400 dark:border-blue-600"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.45 }}
                  >
                    <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                      <MessageCircle className="w-4 h-4" />
                      <h2 className="text-sm font-semibold uppercase tracking-wider">Oração</h2>
                    </div>
                    <p className="font-serif italic text-stone-600 dark:text-stone-400 leading-relaxed">
                      {selectedDevotional.prayer}
                    </p>
                  </motion.section>

                  {/* Phrase of the Day */}
                  <motion.section 
                    className="space-y-4 text-center py-6"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="flex items-center justify-center gap-2 text-yellow-600 dark:text-yellow-500">
                      <Quote className="w-4 h-4" />
                      <h2 className="text-sm font-semibold uppercase tracking-wider">Frase do Dia</h2>
                    </div>
                    <blockquote className="font-serif text-xl sm:text-2xl text-stone-700 dark:text-stone-300 italic leading-relaxed max-w-lg mx-auto">
                      "{selectedDevotional.phraseOfDay.text}"
                    </blockquote>
                    <p className="text-sm text-stone-500 dark:text-stone-500">
                      — {selectedDevotional.phraseOfDay.author}
                    </p>
                  </motion.section>

                  {/* Application Section */}
                  <motion.section 
                    className="space-y-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.55 }}
                  >
                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                      <Star className="w-4 h-4" />
                      <h2 className="text-sm font-semibold uppercase tracking-wider">Aplicação</h2>
                    </div>
                    <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
                      {selectedDevotional.application}
                    </p>
                  </motion.section>

                  {/* Complete and Share Buttons */}
                  <motion.div 
                    className="pt-6 border-t border-amber-200/50 dark:border-amber-800/30"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <div className="flex gap-3">
                      {/* Complete Button */}
                      <motion.button
                        onClick={handleComplete}
                        disabled={isCompleted}
                        className={`flex-1 py-4 rounded-xl font-medium text-base transition-all ${
                          isCompleted
                            ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 cursor-default"
                            : "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02]"
                        }`}
                        whileHover={!isCompleted ? { scale: 1.02 } : {}}
                        whileTap={!isCompleted ? { scale: 0.98 } : {}}
                      >
                        {isCompleted ? (
                          <span className="flex items-center justify-center gap-2">
                            <CheckCircle2 className="w-5 h-5" />
                            Devocional Concluído
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-2">
                            <Feather className="w-5 h-5" />
                            Marcar como Lido
                          </span>
                        )}
                      </motion.button>

                      {/* Favorite Button */}
                      <motion.button
                        onClick={handleToggleFavorite}
                        disabled={isFavoriting}
                        className={`p-4 rounded-xl transition-all ${
                          selectedDayOfYear && isFavorite(selectedDayOfYear)
                            ? "bg-rose-500 text-white shadow-[0_0_20px_rgba(244,63,94,0.6)]"
                            : "bg-rose-500/20 text-rose-400 border border-rose-500/30 hover:bg-rose-500/30"
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        title={selectedDayOfYear && isFavorite(selectedDayOfYear) ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                      >
                        <Heart 
                          className={`w-5 h-5 ${selectedDayOfYear && isFavorite(selectedDayOfYear) ? "fill-white" : ""}`} 
                        />
                      </motion.button>

                      {/* Share Button */}
                      <motion.button
                        onClick={handleOpenShareModal}
                        className="p-4 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-[0_0_20px_rgba(59,130,246,0.6),0_0_40px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.8),0_0_60px_rgba(59,130,246,0.4)] transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        animate={{ 
                          scale: [1, 1.1, 1],
                          boxShadow: [
                            "0 0 20px rgba(59,130,246,0.6), 0 0 40px rgba(59,130,246,0.3)",
                            "0 0 30px rgba(59,130,246,0.8), 0 0 60px rgba(59,130,246,0.5)",
                            "0 0 20px rgba(59,130,246,0.6), 0 0 40px rgba(59,130,246,0.3)"
                          ]
                        }}
                        transition={{ 
                          duration: 1.2, 
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        title="Compartilhar"
                      >
                        <Share2 className="w-5 h-5 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                      </motion.button>
                    </div>

                    {!isCompleted && (
                      <motion.p 
                        className="text-center text-sm text-stone-500 dark:text-stone-500 mt-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                      >
                        Complete o devocional para ganhar pontos e manter sua sequência ✨
                      </motion.p>
                    )}
                  </motion.div>

                  </div>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* Share Modal */}
        <ShareOptionsModal
          isOpen={showShareModal}
          onClose={handleCloseShareModal}
          imagePreview={imagePreview}
          isGenerating={isGenerating}
          onShareWhatsApp={shareToWhatsApp}
          onDownload={downloadImage}
        />

        {/* Hidden Shareable Card for Image Generation */}
        {selectedDevotional && selectedDate && (
          <div style={{ position: "absolute", left: "-9999px", top: "-9999px" }}>
            <ShareableDevotionalCard
              ref={cardRef}
              title={selectedDevotional.title}
              verse={selectedDevotional.verse}
              meditation={selectedDevotional.meditation}
              date={selectedDate}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Devocional;
