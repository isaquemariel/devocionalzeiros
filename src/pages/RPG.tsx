import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Shield, Sword, Flame, Lock, Star, ChevronRight, Trophy, Zap, BookOpen } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useUserPlan } from "@/hooks/useUserPlan";
import { useRPGProgress } from "@/hooks/useRPGProgress";
import { RPG_BIBLE_BOOKS, TOTAL_CHAPTERS, getBookByIndex } from "@/lib/rpgBibleData";
import { MascotLoader } from "@/components/shared/FloatingMascot";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import cardRpg from "@/assets/card-rpg.png";

type View = "home" | "levels" | "stages";

const RPG = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { planType, loading: planLoading } = useUserPlan(user?.email || undefined);
  const { stats, loading: rpgLoading, initializeStats, isStageUnlocked, getBookProgress, overallPercent } = useRPGProgress(user?.id);

  const [view, setView] = useState<View>("home");
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);

  // Guard: only admin/embaixador
  useEffect(() => {
    if (!authLoading && !user) navigate("/auth");
  }, [authLoading, user, navigate]);

  useEffect(() => {
    if (!planLoading && planType && !["admin", "embaixador"].includes(planType)) {
      navigate("/home");
    }
  }, [planLoading, planType, navigate]);

  // Initialize stats on first visit
  useEffect(() => {
    if (user && !rpgLoading && !stats) {
      initializeStats();
    }
  }, [user, rpgLoading, stats, initializeStats]);

  if (authLoading || planLoading || rpgLoading) return <MascotLoader />;

  const currentBook = stats ? getBookByIndex(stats.currentLevel - 1) : RPG_BIBLE_BOOKS[0];

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white overflow-x-hidden relative">
      {/* Animated background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a2e] via-[#0a0a1a] to-[#1a0a0a]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-blue-600/[0.06] rounded-full blur-[200px]" />
        <div className="absolute bottom-0 left-1/4 w-[800px] h-[400px] bg-orange-600/[0.04] rounded-full blur-[180px]" />
        {/* Floating particles */}
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

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => view === "home" ? navigate("/home") : view === "stages" ? setView("levels") : setView("home")}
            className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-black bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
              DEVOCIONALZEIROS RPG
            </h1>
            <p className="text-xs text-white/40">O Jogo da Bíblia</p>
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
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Hero Card */}
              <div className="relative rounded-2xl overflow-hidden border border-amber-500/30 shadow-[0_0_40px_rgba(217,119,6,0.2)]">
                <img src={cardRpg} alt="RPG Cover" className="w-full aspect-[3/4] max-h-[340px] object-cover object-top" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <button
                    onClick={() => setView("levels")}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 text-black font-black text-lg uppercase tracking-wider shadow-[0_0_30px_rgba(217,119,6,0.5)] hover:shadow-[0_0_50px_rgba(217,119,6,0.7)] transition-all active:scale-95"
                  >
                    ⚔️ JOGAR AGORA
                  </button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
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
                <div className="p-3 rounded-xl bg-gradient-to-b from-blue-500/10 to-blue-600/5 border border-blue-500/20 text-center">
                  <Shield className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                  <p className="text-lg font-black text-blue-400">Lv.{stats?.currentLevel || 1}</p>
                  <p className="text-[10px] text-white/40 uppercase">Nível</p>
                </div>
                <div className="p-3 rounded-xl bg-gradient-to-b from-amber-500/10 to-amber-600/5 border border-amber-500/20 text-center">
                  <Star className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                  <p className="text-lg font-black text-amber-400">{stats?.totalXp || 0}</p>
                  <p className="text-[10px] text-white/40 uppercase">XP Total</p>
                </div>
                <div className="p-3 rounded-xl bg-gradient-to-b from-orange-500/10 to-orange-600/5 border border-orange-500/20 text-center">
                  <Flame className="w-5 h-5 text-orange-400 mx-auto mb-1" />
                  <p className="text-lg font-black text-orange-400">{stats?.streakDays || 0}</p>
                  <p className="text-[10px] text-white/40 uppercase">Streak</p>
                </div>
              </div>
            </motion.div>
          )}

          {view === "levels" && (
            <motion.div
              key="levels"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
            >
              <h2 className="text-lg font-black mb-4 flex items-center gap-2">
                <Sword className="w-5 h-5 text-amber-400" />
                MAPA DE NÍVEIS
              </h2>
              <ScrollArea className="h-[calc(100vh-180px)]">
                <div className="space-y-2 pb-8">
                  {RPG_BIBLE_BOOKS.map((book) => {
                    const progress = getBookProgress(book.index);
                    const isCurrentOrPast = book.index < (stats?.currentLevel || 1);
                    const isCurrent = book.index === (stats?.currentLevel || 1) - 1;
                    const isUnlocked = book.index === 0 || isCurrentOrPast || isCurrent;
                    const isComplete = progress.percent === 100;

                    return (
                      <motion.button
                        key={book.id}
                        onClick={() => {
                          if (isUnlocked) {
                            setSelectedLevel(book.index);
                            setView("stages");
                          }
                        }}
                        disabled={!isUnlocked}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                          isCurrent
                            ? "bg-gradient-to-r from-amber-500/15 to-yellow-500/10 border-amber-500/40 shadow-[0_0_20px_rgba(217,119,6,0.15)]"
                            : isComplete
                            ? "bg-gradient-to-r from-green-500/10 to-emerald-500/5 border-green-500/30"
                            : isUnlocked
                            ? "bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/20"
                            : "bg-white/[0.02] border-white/5 opacity-40"
                        }`}
                        whileTap={isUnlocked ? { scale: 0.98 } : {}}
                      >
                        {/* Level Number */}
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-black text-sm shrink-0 ${
                          isComplete
                            ? "bg-green-500/20 text-green-400"
                            : isCurrent
                            ? "bg-amber-500/20 text-amber-400"
                            : isUnlocked
                            ? "bg-white/10 text-white/60"
                            : "bg-white/5 text-white/20"
                        }`}>
                          {isComplete ? "✓" : !isUnlocked ? <Lock className="w-4 h-4" /> : book.index + 1}
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className={`font-bold text-sm truncate ${isCurrent ? "text-amber-300" : isComplete ? "text-green-400" : "text-white/80"}`}>
                            {book.name}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all ${isComplete ? "bg-green-400" : "bg-amber-400"}`}
                                style={{ width: `${progress.percent}%` }}
                              />
                            </div>
                            <span className="text-[10px] text-white/40 shrink-0">{progress.completed}/{progress.total}</span>
                          </div>
                        </div>

                        {isUnlocked && (
                          <ChevronRight className={`w-4 h-4 shrink-0 ${isCurrent ? "text-amber-400" : "text-white/30"}`} />
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </ScrollArea>
            </motion.div>
          )}

          {view === "stages" && selectedLevel !== null && (
            <motion.div
              key="stages"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
            >
              {(() => {
                const book = RPG_BIBLE_BOOKS[selectedLevel];
                if (!book) return null;
                const progress = getBookProgress(selectedLevel);

                return (
                  <>
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-1">
                        <BookOpen className="w-5 h-5 text-amber-400" />
                        <h2 className="text-lg font-black">{book.name}</h2>
                        <span className="text-xs text-white/40">Nível {book.index + 1}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={progress.percent} className="h-2 flex-1 bg-white/10 [&>div]:bg-gradient-to-r [&>div]:from-amber-500 [&>div]:to-yellow-400" />
                        <span className="text-xs text-white/50">{progress.completed}/{progress.total}</span>
                      </div>
                    </div>

                    <ScrollArea className="h-[calc(100vh-220px)]">
                      <div className="grid grid-cols-5 sm:grid-cols-6 gap-2 pb-8">
                        {Array.from({ length: book.chapters }, (_, i) => {
                          const chapter = i + 1;
                          const unlocked = isStageUnlocked(selectedLevel, chapter);
                          const completed = progress.completed >= chapter && unlocked;
                          // A more specific check would be via stageProgress, simplifying for MVP

                          return (
                            <motion.button
                              key={chapter}
                              disabled={!unlocked}
                              className={`aspect-square rounded-xl flex flex-col items-center justify-center border transition-all text-sm font-bold ${
                                completed
                                  ? "bg-gradient-to-b from-green-500/20 to-green-600/10 border-green-500/30 text-green-400"
                                  : unlocked
                                  ? "bg-gradient-to-b from-amber-500/15 to-amber-600/5 border-amber-500/30 text-amber-400 hover:shadow-[0_0_15px_rgba(217,119,6,0.3)] active:scale-95"
                                  : "bg-white/[0.02] border-white/5 text-white/15"
                              }`}
                              whileTap={unlocked ? { scale: 0.9 } : {}}
                            >
                              {!unlocked ? (
                                <Lock className="w-3.5 h-3.5" />
                              ) : completed ? (
                                <>
                                  <span>✓</span>
                                  <span className="text-[9px] mt-0.5">{chapter}</span>
                                </>
                              ) : (
                                <span>{chapter}</span>
                              )}
                            </motion.button>
                          );
                        })}
                      </div>
                    </ScrollArea>

                    {/* Boss indicator */}
                    {progress.percent === 100 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-4 p-4 rounded-xl bg-gradient-to-r from-amber-500/20 to-yellow-500/10 border border-amber-500/40 text-center"
                      >
                        <Trophy className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                        <p className="font-black text-amber-300">LIVRO COMPLETO!</p>
                        <p className="text-xs text-white/50 mt-1">Boss derrotado — {book.name} conquistado</p>
                      </motion.div>
                    )}
                  </>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RPG;
