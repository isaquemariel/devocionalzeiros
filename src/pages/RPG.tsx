import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Zap, Flame } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useUserPlan } from "@/hooks/useUserPlan";
import { useAdminCheck } from "@/hooks/useAdminCheck";
import { useRPGProgress } from "@/hooks/useRPGProgress";
import { RPG_REGION_THEMES, RPG_BIBLE_BOOKS } from "@/lib/rpgBibleData";
import { MascotLoader } from "@/components/shared/FloatingMascot";
import RPGHome from "@/components/rpg/RPGHome";
import RPGWorldMap from "@/components/rpg/RPGWorldMap";
import RPGBookIntro from "@/components/rpg/RPGBookIntro";
import RPGStageMap from "@/components/rpg/RPGStageMap";
import RPGChapterModal from "@/components/rpg/RPGChapterModal";

type View = "home" | "world" | "book-intro" | "stages";

// Track which book intros have been seen per user in localStorage
const getSeenIntrosKey = (userId: string) => `rpg_seen_intros_${userId}`;
const getSeenIntros = (userId: string): Set<number> => {
  try {
    const raw = localStorage.getItem(getSeenIntrosKey(userId));
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch { return new Set(); }
};
const markIntroSeen = (userId: string, bookIndex: number) => {
  const seen = getSeenIntros(userId);
  seen.add(bookIndex);
  localStorage.setItem(getSeenIntrosKey(userId), JSON.stringify([...seen]));
};

const RPG = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { planType, loading: planLoading } = useUserPlan(user?.email || undefined);
  const { isAdmin } = useAdminCheck();
  const { stats, loading: rpgLoading, initializeStats, isStageUnlocked, getBookProgress, overallPercent, refetch } = useRPGProgress(user?.id);

  const [view, setView] = useState<View>("home");
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [chapterModal, setChapterModal] = useState<{ bookIndex: number; chapter: number; reviewMode?: boolean } | null>(null);

  const currentBook = selectedLevel !== null ? RPG_BIBLE_BOOKS[selectedLevel] : null;
  const currentTheme = currentBook ? RPG_REGION_THEMES[currentBook.region] : null;

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth");
  }, [authLoading, user, navigate]);

  useEffect(() => {
    if (!planLoading && planType && !["admin", "embaixador", "premium"].includes(planType)) {
      navigate("/home");
    }
  }, [planLoading, planType, navigate]);

  useEffect(() => {
    if (user && !rpgLoading && !stats) {
      initializeStats();
    }
  }, [user, rpgLoading, stats, initializeStats]);

  if (authLoading || planLoading || rpgLoading) return <MascotLoader />;

  const handleBack = () => {
    if (view === "stages") setView("world");
    else if (view === "book-intro") setView("world");
    else if (view === "world") setView("home");
    else navigate("/home");
  };

  const handleSelectBook = (idx: number) => {
    setSelectedLevel(idx);
    // Only show intro if user hasn't seen it before
    if (user && getSeenIntros(user.id).has(idx)) {
      setView("stages");
    } else {
      setView("book-intro");
    }
  };

  const handleIntroContinue = () => {
    if (user && selectedLevel !== null) {
      markIntroSeen(user.id, selectedLevel);
    }
    setView("stages");
  };

  const handleShowIntroFromMap = () => {
    setView("book-intro");
  };

  const handleChapterClick = (chapter: number) => {
    if (selectedLevel === null) return;
    const progress = getBookProgress(selectedLevel);
    const isCompleted = progress.completed >= chapter;
    setChapterModal({ bookIndex: selectedLevel, chapter, reviewMode: isCompleted });
  };

  const handleChapterComplete = (_xp: number) => {
    refetch();
  };

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white overflow-x-hidden relative">
      {/* Dynamic background */}
      <div className="fixed inset-0 pointer-events-none transition-all duration-1000">
        <div className={`absolute inset-0 bg-gradient-to-b ${
          currentTheme ? currentTheme.bgGradient : "from-[#0a0a2e] via-[#0a0a1a] to-[#1a0a0a]"
        } transition-all duration-1000`} />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] rounded-full blur-[200px] transition-all duration-1000"
          style={{ backgroundColor: currentTheme?.glowColor || "rgba(59,130,246,0.06)" }}
        />
        <div className="absolute bottom-0 left-1/4 w-[800px] h-[400px] bg-orange-600/[0.04] rounded-full blur-[180px]" />
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-amber-400/30 rounded-full"
            style={{ left: `${10 + i * 12}%`, top: `${20 + (i % 3) * 25}%` }}
            animate={{ y: [-20, 20, -20], opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-2xl lg:max-w-3xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button onClick={handleBack} className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-black bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
              O JOGO DA BÍBLIA
            </h1>
            <p className="text-xs text-white/40">
              {view === "world" ? "Mapa da Bíblia" : (view === "book-intro" || view === "stages") && currentBook ? currentBook.name : "Explore a Palavra"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/30">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-xs font-bold text-amber-400">{stats?.totalXp || 0} XP</span>
            </div>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-orange-500/20 border border-orange-500/30">
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              <span className="text-xs font-bold text-orange-400">{stats?.streakDays || 0}</span>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {view === "home" && (
            <RPGHome stats={stats} overallPercent={overallPercent} onPlay={() => setView("world")} />
          )}
          {view === "world" && (
            <RPGWorldMap
              currentLevel={stats?.currentLevel || 1}
              getBookProgress={getBookProgress}
              onSelectBook={handleSelectBook}
            />
          )}
          {view === "book-intro" && selectedLevel !== null && (
            <RPGBookIntro
              bookIndex={selectedLevel}
              onContinue={handleIntroContinue}
            />
          )}
          {view === "stages" && selectedLevel !== null && (
            <RPGStageMap
              selectedLevel={selectedLevel}
              getBookProgress={getBookProgress}
              isStageUnlocked={isAdmin ? () => true : isStageUnlocked}
              onChapterClick={handleChapterClick}
              onShowIntro={handleShowIntroFromMap}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Chapter Modal */}
      {chapterModal && user && (
        <RPGChapterModal
          isOpen={!!chapterModal}
          onClose={() => setChapterModal(null)}
          bookIndex={chapterModal.bookIndex}
          chapter={chapterModal.chapter}
          userId={user.id}
          onComplete={handleChapterComplete}
          reviewMode={chapterModal.reviewMode}
          isAdmin={isAdmin}
        />
      )}
    </div>
  );
};

export default RPG;