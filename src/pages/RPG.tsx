import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Zap, Flame } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useUserPlan } from "@/hooks/useUserPlan";
import { useAdminCheck } from "@/hooks/useAdminCheck";
import { useRPGProgress } from "@/hooks/useRPGProgress";
import { useUsageLimits } from "@/hooks/useUsageLimits";
import { UsageLimitModal } from "@/components/shared/UsageLimitModal";
import { RPG_REGION_THEMES, RPG_BIBLE_BOOKS } from "@/lib/rpgBibleData";
import { MascotLoader } from "@/components/shared/FloatingMascot";
import RPGHome from "@/components/rpg/RPGHome";
import RPGWorldMap from "@/components/rpg/RPGWorldMap";
import RPGBookIntro from "@/components/rpg/RPGBookIntro";
import RPGStageMap from "@/components/rpg/RPGStageMap";
import RPGChapterModal from "@/components/rpg/RPGChapterModal";
import RPGOnboarding from "@/components/rpg/RPGOnboarding";
import RPGWardrobe from "@/components/rpg/RPGWardrobe";
import RPGBossIntro from "@/components/rpg/RPGBossIntro";
import { getEquippedLook } from "@/lib/rpgRewards";

type View = "home" | "world" | "book-intro" | "stages" | "wardrobe";

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
  const { stats, stageProgress, loading: rpgLoading, initializeStats, saveCharacter, isStageUnlocked, getBookProgress, overallPercent, refetch } = useRPGProgress(user?.id);

  const { checkLimit } = useUsageLimits(user?.id, planType);

  const [view, setView] = useState<View>("home");
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [chapterModal, setChapterModal] = useState<{ bookIndex: number; chapter: number; reviewMode?: boolean } | null>(null);
  const [showLimitModal, setShowLimitModal] = useState<{ currentUsage: number; limit: number } | null>(null);
  const [bossIntro, setBossIntro] = useState<{ bookIndex: number; chapter: number } | null>(null);

  // Primeiro acesso: nome do personagem vive na CONTA (banco), não no navegador
  const charName = stats?.characterName ?? null;
  const needsOnboarding = !!stats && !stats.characterName;

  const currentBook = selectedLevel !== null ? RPG_BIBLE_BOOKS[selectedLevel] : null;
  const currentTheme = currentBook ? RPG_REGION_THEMES[currentBook.region] : null;

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth");
  }, [authLoading, user, navigate]);

  // RPG is now available to all plans (with usage limits for non-premium)
  // No plan-based redirect needed

  useEffect(() => {
    if (user && !rpgLoading && !stats) {
      initializeStats();
    }
  }, [user, rpgLoading, stats, initializeStats]);

  // espera stats carregarem (evita piscar o onboarding antes de saber o nome)
  if (authLoading || planLoading || rpgLoading || (!!user && !stats)) return <MascotLoader />;

  // Onboarding de primeiro acesso (nomear o personagem + tutorial)
  if (needsOnboarding && user) {
    return (
      <RPGOnboarding
        userId={user.id}
        onDone={async (n) => {
          await saveCharacter(n); // salva na conta; o onboarding fecha ao refletir no stats
        }}
      />
    );
  }

  const handleBack = () => {
    if (view === "stages") setView("world");
    else if (view === "book-intro") setView("world");
    else if (view === "world") setView("home");
    else if (view === "wardrobe") setView("home");
    else navigate("/home");
  };

  const equippedLook = user ? getEquippedLook(user.id) : undefined;

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
    const isCompleted = stageProgress.some(p => p.bookIndex === selectedLevel && p.chapterNumber === chapter && p.isCompleted);
    
    // Review mode or admin: open directly
    if (isCompleted || isAdmin) {
      setChapterModal({ bookIndex: selectedLevel, chapter, reviewMode: isCompleted });
      return;
    }
    
    // New stage: check daily limit
    const limitResult = checkLimit('rpg_quiz');
    if (!limitResult.canUse) {
      setShowLimitModal({ currentUsage: limitResult.currentUsage, limit: limitResult.limit });
      return;
    }

    // Último capítulo do livro = batalha de chefe (intro dramática antes do desafio)
    const lastChapter = RPG_BIBLE_BOOKS[selectedLevel]?.chapters;
    if (chapter === lastChapter) {
      setBossIntro({ bookIndex: selectedLevel, chapter });
      return;
    }

    setChapterModal({ bookIndex: selectedLevel, chapter, reviewMode: false });
  };

  const handleChapterComplete = (_xp: number) => {
    refetch();
  };

  return (
    <div className="rpg-root min-h-screen text-white overflow-x-hidden relative">
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

      <div className="relative z-10 max-w-2xl lg:max-w-4xl mx-auto px-4 py-6 pb-24">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button onClick={handleBack} className="p-2 rounded-xl bg-[#20180d] border-2 border-[#3a2c18] hover:bg-[#2a2012] transition-all">
            <ArrowLeft className="w-5 h-5 text-[#e8b04b]" />
          </button>
          <div className="flex-1">
            <h1 className="rpg-title text-lg">
              O JOGO DA <span className="hl">BÍBLIA</span>
            </h1>
            <p className="text-xs text-[#9c8b68]">
              {view === "world"
                ? "Mapa da Bíblia"
                : (view === "book-intro" || view === "stages") && currentBook
                  ? currentBook.name
                  : charName
                    ? `Jornada de ${charName}`
                    : "Explore a Palavra"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#0b0f1ad9] border border-[#e8b04b66]">
              <Zap className="w-3.5 h-3.5 text-[#ffd889]" />
              <span className="text-xs font-bold text-[#ffd889]">{stats?.totalXp || 0} XP</span>
            </div>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#0b0f1ad9] border border-[#e8846b66]">
              <Flame className="w-3.5 h-3.5 text-[#e8846b]" />
              <span className="text-xs font-bold text-[#e8846b]">{stats?.streakDays || 0}</span>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {view === "home" && (
            <RPGHome
              stats={stats}
              overallPercent={overallPercent}
              onPlay={() => setView("world")}
              onContinue={() => {
                let idx = 0;
                for (let i = 0; i < RPG_BIBLE_BOOKS.length; i++) {
                  if (getBookProgress(i).percent < 100) { idx = i; break; }
                }
                setSelectedLevel(idx);
                setView("stages");
              }}
              onWardrobe={() => setView("wardrobe")}
              look={equippedLook}
              characterName={charName}
            />
          )}
          {view === "wardrobe" && user && (
            <RPGWardrobe userId={user.id} getBookProgress={getBookProgress} />
          )}
          {view === "world" && (
            <RPGWorldMap
              currentLevel={stats?.currentLevel || 1}
              getBookProgress={getBookProgress}
              onSelectBook={handleSelectBook}
              isAdmin={isAdmin}
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

      {/* Boss Intro (capítulo final do livro) */}
      {bossIntro && (
        <RPGBossIntro
          region={RPG_BIBLE_BOOKS[bossIntro.bookIndex].region}
          bookName={RPG_BIBLE_BOOKS[bossIntro.bookIndex].name}
          look={equippedLook}
          onFight={() => {
            setChapterModal({ bookIndex: bossIntro.bookIndex, chapter: bossIntro.chapter, reviewMode: false });
            setBossIntro(null);
          }}
          onCancel={() => setBossIntro(null)}
        />
      )}

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

      {/* Usage Limit Modal */}
      <UsageLimitModal
        isOpen={!!showLimitModal}
        onClose={() => setShowLimitModal(null)}
        featureName="Estágios do RPG"
        currentUsage={showLimitModal?.currentUsage || 0}
        limit={showLimitModal?.limit || 0}
        planType={planType || "free"}
      />
    </div>
  );
};

export default RPG;