import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Zap, Flame, HelpCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useUserPlan } from "@/hooks/useUserPlan";
import { useAdminCheck } from "@/hooks/useAdminCheck";
import { useRPGProgress } from "@/hooks/useRPGProgress";
import { useRPGDaily } from "@/hooks/useRPGDaily";
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
import RPGRoomsUpsellModal from "@/components/rpg/RPGRoomsUpsellModal";
import { getEquippedLookOwned, syncCosmeticsFromDB } from "@/lib/rpgRewards";
import { resolveChallenge } from "@/lib/rpgChallengeType";
import { LandscapeShell } from "@/components/rpg/LandscapeShell";

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
  const { planType, hasAccessTo, loading: planLoading } = useUserPlan(user?.email || undefined);
  const { isAdmin } = useAdminCheck();

  // Salas sociais: GOLD+ (admin sempre). Grátis vê o botão com cadeado.
  const roomsUnlocked = isAdmin || hasAccessTo("chat");
  const [roomsUpsell, setRoomsUpsell] = useState(false);
  const handleRooms = () => { if (roomsUnlocked) navigate("/mundo"); else setRoomsUpsell(true); };
  const { stats, stageProgress, loading: rpgLoading, initializeStats, saveCharacter, isStageUnlocked, getBookProgress, overallPercent, markLevelCelebrated, refetch } = useRPGProgress(user?.id);
  // Constância/resgate diário: fonte ÚNICA do streak (🔥 do cabeçalho + barra na home).
  const daily = useRPGDaily(user?.id);

  const { checkLimit, consume } = useUsageLimits(user?.id, planType);

  const [view, setView] = useState<View>("home");
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [chapterModal, setChapterModal] = useState<{ bookIndex: number; chapter: number; alreadyCompleted?: boolean } | null>(null);
  const [showLimitModal, setShowLimitModal] = useState<{ currentUsage: number; limit: number; resetAt?: number | null } | null>(null);

  // Mapa (escolha de livro + capítulos) em TELA CHEIA PAISAGEM no celular via
  // LandscapeShell. A HOME (e o guarda-roupa / intro do livro) PERMANECE VERTICAL:
  // o shell só entra nas views de mapa ("world" e "stages").
  const mapLandscape = view === "world" || view === "stages";
  const [isMobile, setIsMobile] = useState<boolean>(() => typeof window !== "undefined" && Math.min(window.innerWidth, window.innerHeight) < 560);
  useEffect(() => {
    const onResize = () => setIsMobile(Math.min(window.innerWidth, window.innerHeight) < 560);
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, []);
  // Os MAPAS (livros e estágios) agora ficam SEMPRE no layout vertical normal,
  // como o restante do app — sem overlay paisagem. Só a cena viva do estágio, os
  // desafios, o resultado e as batalhas de chefe ficam em tela cheia horizontal.
  const mapFullscreen = false;
  void mapLandscape; void isMobile;

  // Primeiro acesso: nome do personagem vive na CONTA (banco), não no navegador
  const charName = stats?.characterName ?? null;
  const needsOnboarding = !!stats && !stats.characterName;

  const currentBook = selectedLevel !== null ? RPG_BIBLE_BOOKS[selectedLevel] : null;
  const currentTheme = currentBook ? RPG_REGION_THEMES[currentBook.region] : null;

  // Look do mascote salvo na CONTA (durável). Hidrata o localStorage e re-renderiza.
  const [cosmeticsReady, setCosmeticsReady] = useState(0);
  useEffect(() => {
    if (user?.id) syncCosmeticsFromDB(user.id).then(() => setCosmeticsReady((v) => v + 1));
  }, [user?.id]);

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
        onDone={async (n) => {
          const r = await saveCharacter(n); // salva na conta; o onboarding fecha ao refletir no stats
          if (!r.ok && r.error === "name_taken") {
            const { toast } = await import("sonner");
            toast.error("Esse nome acabou de ser escolhido por outra pessoa. Escolha outro, por favor.");
          }
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

  const equippedLook = user ? getEquippedLookOwned(user.id, getBookProgress, isAdmin) : undefined;

  // Livro ATUAL = primeiro não concluído (onde a pessoa está de fato). É isso que
  // define o cenário da Home — não o nível de XP. Tudo concluído → último livro.
  const currentBookIndex = (() => {
    for (let i = 0; i < RPG_BIBLE_BOOKS.length; i++) if (getBookProgress(i).percent < 100) return i;
    return RPG_BIBLE_BOOKS.length - 1;
  })();

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

  const handleChapterClick = async (chapter: number) => {
    if (selectedLevel === null) return;
    const isCompleted = stageProgress.some(p => p.bookIndex === selectedLevel && p.chapterNumber === chapter && p.isCompleted);

    // Capítulo já concluído (ou admin): pode refazer a fase livremente, do mesmo
    // jeito, sem gastar o limite diário e sem afetar as outras.
    if (isCompleted || isAdmin) {
      setChapterModal({ bookIndex: selectedLevel, chapter, alreadyCompleted: isCompleted });
      return;
    }

    // FASE NOVA: o limite diário do free é checado e BLOQUEADO já na ENTRADA do
    // estágio (não deixa nem abrir se já passou do limite).
    const limitResult = checkLimit('rpg_quiz');
    if (!limitResult.canUse) {
      setShowLimitModal({ currentUsage: limitResult.currentUsage, limit: limitResult.limit, resetAt: limitResult.resetAt });
      return;
    }

    // Consome 1 uso ao ENTRAR num estágio de desafio próprio (o quiz por IA
    // consome no servidor; aqui garantimos o consumo dos capítulos curados).
    const book = RPG_BIBLE_BOOKS[selectedLevel];
    const isLast = !!book && chapter === book.chapters;
    const type = resolveChallenge(book?.id || "", chapter, isLast);
    if (type !== "quiz") {
      const ok = await consume("rpg_quiz");
      if (!ok) {
        // corrida rara: servidor já estava no limite → bloqueia a entrada
        setShowLimitModal({ currentUsage: limitResult.limit, limit: limitResult.limit, resetAt: limitResult.resetAt });
        return;
      }
    }

    setChapterModal({ bookIndex: selectedLevel, chapter, alreadyCompleted: false });
  };

  const handleChapterComplete = (_xp: number) => {
    refetch();
  };

  return (
    <div className="rpg-root h-[100dvh] text-white overflow-hidden relative flex flex-col">
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

      <div className="relative z-10 w-full max-w-2xl lg:max-w-5xl xl:max-w-6xl mx-auto px-4 pt-4 pb-3 flex flex-col flex-1 min-h-0">
        {/* Header */}
        <div className="flex items-center gap-3 mb-3 shrink-0">
          <button onClick={handleBack} className="p-2 rounded-xl bg-[#20180d] border-2 border-[#3a2c18] hover:bg-[#2a2012] transition-all">
            <ArrowLeft className="w-5 h-5 text-[#e8b04b]" />
          </button>
          <div className="flex-1 min-w-0">
            {view === "home" ? (
              <>
                <h1 className="rpg-title text-lg whitespace-nowrap">
                  O JOGO DA <span className="hl">BÍBLIA</span>
                </h1>
                <p className="text-xs text-[#9c8b68] truncate">
                  {charName ? `Jornada de ${charName}` : "Explore a Palavra"}
                </p>
              </>
            ) : (
              <h1 className="rpg-title text-lg truncate">
                {view === "world"
                  ? "Mapa da Bíblia"
                  : view === "wardrobe"
                    ? "Guarda-roupa"
                    : currentBook?.name || "Bíblia"}
              </h1>
            )}
          </div>
          {/* Pontos só fora da home (na home o card do personagem já mostra tudo) */}
          {view !== "home" && (
            <div className="flex items-center gap-2 shrink-0">
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#0b0f1ad9] border border-[#e8b04b66]">
                <Zap className="w-3.5 h-3.5 text-[#ffd889]" />
                <span className="text-xs font-bold text-[#ffd889]">{stats?.totalXp || 0}</span>
              </div>
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#0b0f1ad9] border border-[#e8846b66]">
                <Flame className="w-3.5 h-3.5 text-[#e8846b]" />
                <span className="text-xs font-bold text-[#e8846b]">{daily.state?.streak ?? stats?.streakDays ?? 0}</span>
              </div>
            </div>
          )}
          {/* Suporte — abre o WhatsApp da equipe com mensagem pronta do RPG */}
          <button
            onClick={() => window.open("https://wa.me/5584999488698?text=Oi%2C%20preciso%20de%20suporte%20no%20RPG.", "_blank", "noopener,noreferrer")}
            aria-label="Suporte do RPG"
            title="Preciso de suporte"
            className="shrink-0 p-2 rounded-xl bg-[#20180d] border-2 border-[#3a2c18] hover:bg-[#2a2012] hover:border-[#e8b04b66] transition-all"
          >
            <HelpCircle className="w-5 h-5 text-[#e8b04b]" />
          </button>
        </div>

        <div className="flex-1 min-h-0 relative">
        <AnimatePresence mode="wait">
          {view === "home" && (
            <RPGHome
              stats={stats}
              overallPercent={overallPercent}
              currentBookIndex={currentBookIndex}
              onPlay={() => setView("world")}
              onContinue={() => {
                setSelectedLevel(currentBookIndex);
                setView("stages");
              }}
              onWardrobe={() => setView("wardrobe")}
              onRooms={handleRooms}
              roomsLocked={!roomsUnlocked}
              look={equippedLook}
              characterName={charName}
              isAdmin={isAdmin}
              celebratedLevel={stats?.celebratedLevel}
              onLevelCelebrated={markLevelCelebrated}
              userId={user.id}
              daily={daily}
            />
          )}
          {view === "wardrobe" && user && (
            <RPGWardrobe userId={user.id} getBookProgress={getBookProgress} isAdmin={isAdmin} />
          )}
          {view === "world" && !mapFullscreen && (
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
              look={equippedLook}
            />
          )}
          {view === "stages" && selectedLevel !== null && !mapFullscreen && (
            <RPGStageMap
              selectedLevel={selectedLevel}
              getBookProgress={getBookProgress}
              isStageUnlocked={isAdmin ? () => true : isStageUnlocked}
              onChapterClick={handleChapterClick}
              onShowIntro={handleShowIntroFromMap}
              look={equippedLook}
              onNextBook={selectedLevel < RPG_BIBLE_BOOKS.length - 1
                ? () => { setSelectedLevel(selectedLevel + 1); setView("book-intro"); }
                : undefined}
            />
          )}
        </AnimatePresence>
        </div>
      </div>

      {/* Mapa (escolha de livro + capítulos) em TELA CHEIA PAISAGEM no celular,
          via LandscapeShell — automático e proporcional, sem botão. No desktop
          renderiza inline (acima). A HOME do RPG permanece vertical. */}
      {mapFullscreen && (
        <LandscapeShell zIndex={40} className="flex flex-col bg-[#07060c] text-white">
          {/* Top bar: voltar + título + XP/streak */}
          <div className="flex items-center gap-2 px-3 py-2 border-b-2 border-[#241a10] bg-[#0b0a12]/95"
               style={{ paddingTop: "max(0.5rem, env(safe-area-inset-top))" }}>
            <button onClick={handleBack} className="p-2 rounded-lg hover:bg-white/10" aria-label="Voltar">
              <ArrowLeft className="w-5 h-5 text-[#e8b04b]" />
            </button>
            <h1 className="rpg-title text-base truncate flex-1 min-w-0">
              {view === "world" ? "Mapa da Bíblia" : (currentBook?.name || "Bíblia")}
            </h1>
            <div className="flex items-center gap-2 shrink-0">
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#0b0f1ad9] border border-[#e8b04b66]">
                <Zap className="w-3.5 h-3.5 text-[#ffd889]" />
                <span className="text-xs font-bold text-[#ffd889]">{stats?.totalXp || 0}</span>
              </div>
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#0b0f1ad9] border border-[#e8846b66]">
                <Flame className="w-3.5 h-3.5 text-[#e8846b]" />
                <span className="text-xs font-bold text-[#e8846b]">{daily.state?.streak ?? stats?.streakDays ?? 0}</span>
              </div>
            </div>
          </div>

          {/* Mapa em si (mesma estrutura; só o enquadramento vira paisagem) */}
          <div className="relative flex-1 min-h-0 px-3 py-3">
            {view === "world" ? (
              <RPGWorldMap
                currentLevel={stats?.currentLevel || 1}
                getBookProgress={getBookProgress}
                onSelectBook={handleSelectBook}
                isAdmin={isAdmin}
              />
            ) : selectedLevel !== null ? (
              <RPGStageMap
                selectedLevel={selectedLevel}
                getBookProgress={getBookProgress}
                isStageUnlocked={isAdmin ? () => true : isStageUnlocked}
                onChapterClick={handleChapterClick}
                onShowIntro={handleShowIntroFromMap}
                look={equippedLook}
                onNextBook={selectedLevel < RPG_BIBLE_BOOKS.length - 1
                  ? () => { setSelectedLevel(selectedLevel + 1); setView("book-intro"); }
                  : undefined}
              />
            ) : null}
          </div>
        </LandscapeShell>
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
          alreadyCompleted={chapterModal.alreadyCompleted}
          isAdmin={isAdmin}
          look={equippedLook}
          characterName={charName}
          level={stats?.currentLevel ?? 0}
        />
      )}

      {/* Pop-up de upgrade das Salas (grátis) */}
      <RPGRoomsUpsellModal open={roomsUpsell} onClose={() => setRoomsUpsell(false)} />

      {/* Usage Limit Modal */}
      <UsageLimitModal
        isOpen={!!showLimitModal}
        onClose={() => setShowLimitModal(null)}
        featureName="Estágios do RPG"
        currentUsage={showLimitModal?.currentUsage || 0}
        limit={showLimitModal?.limit || 0}
        resetAt={showLimitModal?.resetAt}
        planType={planType || "free"}
      />
    </div>
  );
};

export default RPG;