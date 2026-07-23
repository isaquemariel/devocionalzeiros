import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen, Loader2, CheckCircle2, Clock, Zap, Trophy, Heart, ChevronRight, Share2, Wand2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useUsageLimits } from "@/hooks/useUsageLimits";
import { useUserPlan } from "@/hooks/useUserPlan";
import { useAuth } from "@/hooks/useAuth";
import { UsageLimitModal } from "@/components/shared/UsageLimitModal";
import RPGMascotCanvas from "@/components/rpg/RPGMascotCanvas";
import type { MascotLook } from "@/lib/rpgMascot";
import { RPG_BIBLE_BOOKS } from "@/lib/rpgBibleData";
import { fetchChapterVerses, getBibleTranslation, setBibleTranslation, BibleTranslation } from "@/lib/bibleService";
import { toast } from "sonner";
import { toPng } from "html-to-image";
import RPGReadingScene from "./RPGReadingScene";
import RPGQuizPhase from "./RPGQuizPhase";
import RPGChallengeOrder from "./RPGChallengeOrder";
import RPGBossBattle from "./RPGBossBattle";
import RPGChallengeWordSearch from "./RPGChallengeWordSearch";
import RPGChallengeCrossword from "./RPGChallengeCrossword";
import RPGChallengeComplete from "./RPGChallengeComplete";
import RPGChallengeConnect from "./RPGChallengeConnect";
import RPGChallengeMemory from "./RPGChallengeMemory";
import { resolveChallenge } from "@/lib/rpgChallengeType";
import { ShareableRPGDevotionalCard } from "./ShareableRPGDevotionalCard";
import { ShareOptionsModal } from "@/components/devocional/ShareOptionsModal";

type Phase = "chapter-intro" | "reading" | "quiz" | "devotional" | "result";

interface QuizQuestion {
  question: string;
  options: string[];
  correct_answer: string;
}

interface Devotional {
  title: string;
  reflection: string;
  application: string;
  prayer: string;
}

interface ChapterSummary {
  greeting: string;
  summary: string;
  keyVerse: string;
  challenge: string;
}

export interface RPGChapterModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookIndex: number;
  chapter: number;
  userId: string;
  onComplete: (xpEarned: number) => void;
  alreadyCompleted?: boolean; // refazendo uma fase já concluída (não pontua de novo)
  isAdmin?: boolean;
  look?: Partial<MascotLook>;
}

const XP_BASE = 10;
const XP_QUIZ_BONUS = 5;

const RPGChapterModal = ({ isOpen, onClose, bookIndex, chapter, userId, onComplete, alreadyCompleted = false, isAdmin = false, look }: RPGChapterModalProps) => {
  const { user } = useAuth();
  const { planType } = useUserPlan(user?.email || undefined);
  const { checkLimit, incrementUsage } = useUsageLimits(userId, planType);
  const [usageLimitModal, setUsageLimitModal] = useState<{ isOpen: boolean; featureName: string; currentUsage: number; limit: number; isBlocked: boolean } | null>(null);
  const book = RPG_BIBLE_BOOKS[bookIndex];
  const bookName = book?.name || "";
  const bookId = book?.id || "";
  const isLastChapter = !!book && chapter === book.chapters;
  const challengeType = resolveChallenge(bookId, chapter, isLastChapter); // jogo revezado do capítulo
  const bossBattle = challengeType === "boss"; // último capítulo → batalha de chefe
  const customChallenge = challengeType !== "quiz"; // desafio próprio (não usa quiz por IA)

  const [phase, setPhase] = useState<Phase>("chapter-intro");

  // Chapter intro
  const [chapterSummary, setChapterSummary] = useState<ChapterSummary | null>(null);
  const [isLoadingIntro, setIsLoadingIntro] = useState(false);

  // Bible verses
  const [verses, setVerses] = useState<{ number: number; text: string }[]>([]);
  const chapterText = verses.map((v) => v.text).join(" "); // ambienta o cenário do desafio
  const [isLoadingVerses, setIsLoadingVerses] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Tradução unificada: o RPG sempre lê na mesma versão escolhida na Bíblia de Estudo.
  // Sem seletor próprio aqui — garante coerência total entre as duas telas.
  const [translation, setTranslation] = useState<BibleTranslation>(() => getBibleTranslation());

  // Reage a mudanças de tradução feitas em outras telas (Bíblia de Estudo) durante a sessão
  useEffect(() => {
    if (!isOpen) return;
    const sync = () => {
      const current = getBibleTranslation();
      setTranslation(prev => (prev === current ? prev : current));
    };
    sync();
    window.addEventListener('storage', sync);
    window.addEventListener('focus', sync);
    return () => {
      window.removeEventListener('storage', sync);
      window.removeEventListener('focus', sync);
    };
  }, [isOpen]);

  // Timer
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Quiz
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [isLoadingQuiz, setIsLoadingQuiz] = useState(false);
  const [currentQuestionSet, setCurrentQuestionSet] = useState<number>(1);
  // Enhanced quiz state
  const [quizTimer, setQuizTimer] = useState(30);
  const quizTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [answeredQuestions, setAnsweredQuestions] = useState<{question: string; selected: string | null; correct: string; isCorrect: boolean}[]>([]);

  // Devotional
  const [devotional, setDevotional] = useState<Devotional | null>(null);
  const [isLoadingDevotional, setIsLoadingDevotional] = useState(false);

  // Result
  const [xpEarned, setXpEarned] = useState(0);
  
  // Review sub-tabs

  // Share
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareImagePreview, setShareImagePreview] = useState<string | null>(null);
  const [isGeneratingShare, setIsGeneratingShare] = useState(false);
  const shareCardRef = useRef<HTMLDivElement>(null);
  const blockDialogClose = useRef(false);

  const generateShareImage = useCallback(async (): Promise<string | null> => {
    if (!shareCardRef.current) return null;
    setIsGeneratingShare(true);
    try {
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      const dataUrl = await toPng(shareCardRef.current, { quality: 0.95, pixelRatio: 1, cacheBust: true, skipFonts: true });
      setShareImagePreview(dataUrl);
      return dataUrl;
    } catch (err) {
      console.error("Error generating share image:", err);
      toast.error("Erro ao gerar imagem");
      return null;
    } finally {
      setIsGeneratingShare(false);
    }
  }, []);

  const handleShareOpen = useCallback(async () => {
    setShowShareModal(true);
    if (!shareImagePreview) {
      setTimeout(() => generateShareImage(), 300);
    }
  }, [shareImagePreview, generateShareImage]);

  const handleShareDownload = useCallback(async () => {
    let dataUrl = shareImagePreview;
    if (!dataUrl) dataUrl = await generateShareImage();
    if (!dataUrl) return;
    blockDialogClose.current = true;
    try {
      const { downloadImageSmart } = await import("@/lib/shareImage");
      await downloadImageSmart(dataUrl, `rpg-devocional-${bookName}-${chapter}.png`);
    } finally {
      setTimeout(() => { blockDialogClose.current = false; }, 500);
    }
  }, [shareImagePreview, generateShareImage, bookName, chapter]);

  const handleShareWhatsApp = useCallback(async () => {
    let dataUrl = shareImagePreview;
    if (!dataUrl) dataUrl = await generateShareImage();
    if (!dataUrl) return;
    blockDialogClose.current = true;
    try {
      const { shareImageSmart } = await import("@/lib/shareImage");
      await shareImageSmart(dataUrl, `rpg-devocional-${bookName}-${chapter}.png`);
    } finally {
      setTimeout(() => { blockDialogClose.current = false; }, 500);
    }
  }, [shareImagePreview, generateShareImage, bookName, chapter]);


  // Start timer when reading phase begins (non-review only)
  useEffect(() => {
    if (isOpen && phase === "reading") {
      timerRef.current = setInterval(() => setElapsedSeconds(s => s + 1), 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isOpen, phase]);

  // Quiz timer
  useEffect(() => {
    if (phase === "quiz" && !isLoadingQuiz && questions.length > 0 && !isAnswered && !isAdmin) {
      setQuizTimer(30);
      quizTimerRef.current = setInterval(() => {
        setQuizTimer(prev => {
          if (prev <= 1) {
            // Time's up - auto submit
            if (quizTimerRef.current) clearInterval(quizTimerRef.current);
            handleTimerExpired();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => { if (quizTimerRef.current) clearInterval(quizTimerRef.current); };
  }, [phase, currentQ, isLoadingQuiz, isAnswered]);

  const handleTimerExpired = () => {
    if (isAnswered) return;
    setIsAnswered(true);
    // Timed out = wrong
    setAnsweredQuestions(prev => [...prev, {
      question: questions[currentQ]?.question || "",
      selected: null,
      correct: questions[currentQ]?.correct_answer || "",
      isCorrect: false,
    }]);
    setTimeout(() => {
      if (currentQ + 1 < questions.length) {
        setCurrentQ(q => q + 1);
        setSelectedAnswer(null);
        setIsAnswered(false);
      } else {
        loadDevotional(correctCount);
      }
    }, 1500);
  };

  // Load chapter intro when opened
  useEffect(() => {
    if (isOpen && bookName && chapter) {
      loadChapterIntro();
      loadVerses();
    }
    return () => {
      setChapterSummary(null);
      setVerses([]);
      setError(null);
      setElapsedSeconds(0);
      setPhase("chapter-intro");
      setQuestions([]);
      setCurrentQ(0);
      setCorrectCount(0);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setXpEarned(0);
      setDevotional(null);
      setAnsweredQuestions([]);
      
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, bookId, chapter]);

  // Recarrega versículos ao trocar a tradução (sem re-disparar a intro)
  useEffect(() => {
    if (isOpen && bookName && chapter) {
      loadVerses();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [translation]);

  const loadChapterIntro = async () => {
    setIsLoadingIntro(true);
    try {
      const { data: cached } = await supabase
        .from("rpg_summaries_cache")
        .select("summary_data")
        .eq("summary_type", "chapter")
        .eq("book_name", bookName)
        .eq("chapter_number", chapter)
        .maybeSingle();

      if (cached?.summary_data) {
        setChapterSummary(cached.summary_data as unknown as ChapterSummary);
        setIsLoadingIntro(false);
        return;
      }

      const { data, error: fnError } = await supabase.functions.invoke("rpg-book-summary", {
        body: { type: "chapter", bookName, chapter },
      });
      if (fnError) throw fnError;
      setChapterSummary(data);
    } catch (err) {
      console.error("Error loading chapter intro:", err);
      setChapterSummary({
        greeting: `Vamos ler ${bookName} ${chapter}! 📖`,
        summary: `Prepare-se para mergulhar neste capítulo incrível de ${bookName}.`,
        keyVerse: "Preste atenção em cada versículo com o coração aberto.",
        challenge: "Qual verdade Deus quer revelar a você nesta leitura?",
      });
    } finally {
      setIsLoadingIntro(false);
    }
  };

  const loadVerses = async (attempt = 1) => {
    if (attempt === 1) {
      setIsLoadingVerses(true);
      setError(null);
    }
    try {
      // Usa a tradução escolhida pelo usuário (sem trocas silenciosas)
      let result = await fetchChapterVerses(bookId, chapter, translation);

      // Se a API direta retornar vazio, força via edge function proxy COM A MESMA tradução
      if (result.length === 0) {
        const { BOOK_ID_MAP } = await import('@/lib/bibleService');
        const bookInfo = BOOK_ID_MAP[bookId];
        if (bookInfo) {
          const { data, error: proxyErr } = await supabase.functions.invoke('bible-proxy', {
            body: { bookNumber: bookInfo.apiNumber, chapter, translation },
          });
          if (!proxyErr && data?.verses?.length > 0) {
            result = data.verses.map((v: { verse: number; text: string }) => ({
              number: v.verse,
              text: v.text,
            }));
          }
        }
      }

      if (result.length === 0) throw new Error("Não foi possível carregar os versículos");
      setVerses(result);
      setIsLoadingVerses(false);
    } catch (err) {
      if (attempt < 3) {
        // Retry with progressive delay (1.5s, 3s)
        setTimeout(() => loadVerses(attempt + 1), attempt * 1500);
      } else {
        setError(err instanceof Error ? err.message : "Erro ao carregar capítulo");
        setIsLoadingVerses(false);
      }
    }
  };

  const handleTranslationChange = useCallback((t: BibleTranslation) => {
    setTranslation(t);
    setBibleTranslation(t);
  }, []);

  const handleStartReading = () => {
    setPhase("reading");
  };

  const handleProceedToQuiz = async () => {
    if (timerRef.current) clearInterval(timerRef.current);
    // O limite diário (free) é consumido/bloqueado na ENTRADA do estágio
    // (ver RPG.tsx). Aqui não checa/consome de novo — evita bloquear no meio
    // de um estágio que a pessoa já entrou legitimamente.

    setPhase("quiz");

    // Capítulo com desafio próprio (ordenar / batalha de chefe): não busca quiz por IA.
    if (customChallenge) { setIsLoadingQuiz(false); return; }

    setIsLoadingQuiz(true);
    try {
      const res = await supabase.functions.invoke('rpg-quiz', {
        body: { bookName, chapter },
      });

      if (res.error) throw new Error("Erro ao carregar quiz");
      const data = res.data;
      const rawQs = data.questions || [];
      setCurrentQuestionSet(data.questionSet || 1);
      const normalized: QuizQuestion[] = rawQs.slice(0, 2).map((q: any) => ({
        question: q.question,
        options: Array.isArray(q.options) ? q.options : Object.values(q.options || {}),
        correct_answer: Array.isArray(q.options) ? q.correct_answer : q.options?.[q.correct_answer] || q.correct_answer,
      }));
      setQuestions(normalized);
    } catch {
      toast.error("Quiz indisponível, prosseguindo...");
      await loadDevotional(0);
    } finally {
      setIsLoadingQuiz(false);
    }
  };

  const handleSelectAnswer = (answer: string) => {
    if (isAnswered) return;
    setSelectedAnswer(answer);
  };

  const handleConfirmAnswer = () => {
    if (!selectedAnswer || isAnswered) return;
    if (quizTimerRef.current) clearInterval(quizTimerRef.current);
    setIsAnswered(true);
    const isCorrect = selectedAnswer === questions[currentQ].correct_answer;
    if (isCorrect) setCorrectCount(c => c + 1);
    
    setAnsweredQuestions(prev => [...prev, {
      question: questions[currentQ].question,
      selected: selectedAnswer,
      correct: questions[currentQ].correct_answer,
      isCorrect,
    }]);

    setTimeout(() => {
      if (currentQ + 1 < questions.length) {
        setCurrentQ(q => q + 1);
        setSelectedAnswer(null);
        setIsAnswered(false);
      } else {
        const finalCorrect = isCorrect ? correctCount + 1 : correctCount;
        loadDevotional(finalCorrect);
      }
    }, 1500);
  };

  const loadDevotional = async (quizCorrect: number) => {
    setPhase("devotional");
    setIsLoadingDevotional(true);
    setCorrectCount(quizCorrect);

    const failed = quizCorrect === 0 && !isAdmin;
    try {
      await supabase.from("rpg_quiz_attempts_tracker").insert({
        user_id: userId,
        book_name: bookName,
        chapter_number: chapter,
        question_set_used: currentQuestionSet,
        failed,
      });
    } catch (err) {
      console.error("Error tracking quiz attempt:", err);
    }

    try {
      // 1. Check cache first — use verse_number = 1 as canonical key for RPG chapters
      const { data: cached } = await supabase
        .from("verse_devotionals_cache")
        .select("devotional_data")
        .eq("book_id", bookId)
        .eq("chapter_number", chapter)
        .eq("verse_number", 1)
        .maybeSingle();

      if (cached?.devotional_data) {
        const d = cached.devotional_data as any;
        setDevotional({
          title: d.title || `${bookName} ${chapter}`,
          reflection: d.reflection || d.meditation || "",
          application: d.application || "",
          prayer: d.prayer || "",
        });
        setIsLoadingDevotional(false);
        return;
      }

      // 2. Cache miss — use verse 1 as deterministic key so it gets cached and reused
      const canonicalVerse = verses.find(v => v.number === 1) || verses[0] || { number: 1, text: "" };

      const { data, error: fnError } = await supabase.functions.invoke('verse-devotional-generator', {
        body: { bookName, bookId, chapter, verseNumber: canonicalVerse.number, verseText: canonicalVerse.text },
      });

      if (fnError) throw fnError;
      if (data?.error) throw new Error(data.error);

      setDevotional({
        title: data.title || `${bookName} ${chapter}`,
        reflection: data.reflection || data.meditation || "",
        application: data.application || "",
        prayer: data.prayer || "",
      });
    } catch (err) {
      console.error("Error loading devotional:", err);
      setDevotional({
        title: `${bookName} ${chapter}`,
        reflection: "Medite sobre o que você leu e como isso se aplica à sua vida hoje.",
        application: "Que mudança prática essa leitura inspira em você?",
        prayer: "Senhor, obrigado pela Tua Palavra. Ajuda-me a viver o que aprendi. Amém.",
      });
    } finally {
      setIsLoadingDevotional(false);
    }
  };

  const handleCompleteChapter = async () => {
    // Refazer uma fase já concluída NÃO pontua de novo (evita grind de XP)
    const isReplay = alreadyCompleted;
    const xp = isReplay ? 0 : XP_BASE + (correctCount * XP_QUIZ_BONUS);
    setXpEarned(xp);
    setPhase("result");

    try {
      await supabase.from("rpg_progress").upsert({
        user_id: userId,
        book_index: bookIndex,
        chapter_number: chapter,
        is_completed: true,
        completed_at: new Date().toISOString(),
        reading_time_seconds: elapsedSeconds,
        quiz_correct: correctCount,
        quiz_total: questions.length || 2,
      }, { onConflict: "user_id,book_index,chapter_number" });

      const { data: stats, error: statsError } = isReplay
        ? { data: null, error: null }
        : await supabase
            .from("rpg_user_stats")
            .select("total_xp, streak_days, last_played_at")
            .eq("user_id", userId)
            .single();

      if (statsError) {
        console.error("Error fetching rpg_user_stats:", statsError);
      }

      if (stats) {
        const now = new Date();
        const lastPlayed = stats.last_played_at ? new Date(stats.last_played_at) : null;
        const isNewDay = !lastPlayed || now.toDateString() !== lastPlayed.toDateString();
        const isConsecutive = lastPlayed && (now.getTime() - lastPlayed.getTime()) < 48 * 60 * 60 * 1000;

        const newXp = (stats.total_xp || 0) + xp;
        const newStreak = isNewDay ? (isConsecutive ? (stats.streak_days || 0) + 1 : 1) : (stats.streak_days || 0);

        const { error: updateError } = await supabase.from("rpg_user_stats").update({
          total_xp: newXp,
          streak_days: newStreak,
          last_played_at: now.toISOString(),
        }).eq("user_id", userId);

        if (updateError) {
          console.error("Error updating rpg_user_stats:", updateError);
          toast.error("Erro ao atualizar XP");
        }
      }

      await supabase.from("reading_progress").upsert({
        user_id: userId,
        book_name: bookName,
        chapter_number: chapter,
        reading_time_minutes: Math.ceil(elapsedSeconds / 60),
      }, { onConflict: "user_id,book_name,chapter_number" });

      onComplete(xp);
    } catch (err) {
      console.error("Error saving RPG progress:", err);
      toast.error("Erro ao salvar progresso");
    }
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const handleClose = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (quizTimerRef.current) clearInterval(quizTimerRef.current);
    onClose();
  };

  if (!book) return null;


  const phaseLabel =
    phase === "chapter-intro" ? "📜 Introdução"
    : phase === "reading" ? "📖 Leitura"
    : phase === "quiz" ? (bossBattle ? "⚔️ Batalha final" : customChallenge ? "⚔️ Desafio" : "❓ Quiz")
    : phase === "devotional" ? "🙏 Devocional"
    : "🏆 Resultado";

  if (!isOpen) return null;

  return (
    <>
    {/* Tela nativa full-screen (sem pop-up/portal) */}
    <div className="rpg-root fixed inset-0 z-[60] flex flex-col bg-[#0b0805] text-white overflow-hidden">
        {/* X flutuante no desafio/batalha (cabeçalho escondido p/ tela cheia) */}
        {customChallenge && phase === "quiz" && (
          <button onClick={handleClose} className="absolute top-2 right-2 z-20 w-8 h-8 rounded-full bg-black flex items-center justify-center border border-white/25" aria-label="Sair">
            <X className="w-5 h-5 text-white" />
          </button>
        )}
        {/* Header — escondido na leitura e no desafio (tela cheia, só com o X) */}
        {phase !== "reading" && !(customChallenge && phase === "quiz") && (
        <div className="flex items-center justify-between p-4 border-b-2 border-[#3a2c18]">
          <div className="flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-[#e8b04b]" />
            <div>
              <h2 className="rpg-title text-base">{bookName} {chapter}</h2>
              <p className="text-xs text-[#9c8b68]">{phaseLabel}</p>
            </div>
          </div>
          <button onClick={handleClose} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors">
            <X className="w-5 h-5 text-white/50" />
          </button>
        </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            {/* NORMAL MODE - CHAPTER INTRO */}
            {phase === "chapter-intro" && (
              <motion.div key="chapter-intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full flex flex-col">
                <div className="flex-1 overflow-y-auto p-4">
                  {isLoadingIntro ? (
                    <div className="flex flex-col items-center justify-center py-12 gap-4">
                      <motion.div animate={{ y: [-3, 3, -3] }} transition={{ duration: 2, repeat: Infinity }}>
                        <RPGMascotCanvas look={look} mood="happy" size={120} />
                      </motion.div>
                      <p className="text-white/50 text-sm">Preparando a jornada...</p>
                    </div>
                  ) : chapterSummary ? (
                    <div className="space-y-4">
                      <div className="flex flex-col items-center">
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.1 }}>
                          <RPGMascotCanvas look={look} mood="happy" size={120} />
                        </motion.div>
                        <motion.div initial={{ opacity: 0, y: -5, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.4 }} className="relative mt-2 max-w-xs">
                          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-amber-500/20 border-l border-t border-amber-500/30 rotate-45" />
                          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl px-4 py-2 text-center">
                            <p className="text-sm text-amber-300 font-bold italic">"{chapterSummary.greeting}"</p>
                          </div>
                        </motion.div>
                      </div>

                      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <div className="flex items-center gap-2 mb-2">
                          <BookOpen className="w-4 h-4 text-amber-400" />
                          <h3 className="text-xs font-bold text-amber-400 uppercase">Sobre este capítulo</h3>
                        </div>
                        <p className="text-sm text-white/70 leading-relaxed">{chapterSummary.summary}</p>
                      </motion.div>

                      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Wand2 className="w-4 h-4 text-blue-400" />
                          <h3 className="text-xs font-bold text-blue-400 uppercase">Versículo-chave</h3>
                        </div>
                        <p className="text-sm text-white/70 leading-relaxed italic">{chapterSummary.keyVerse}</p>
                      </motion.div>

                      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }} className="bg-green-500/10 rounded-xl p-4 border border-green-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm">🎯</span>
                          <h3 className="text-xs font-bold text-green-400 uppercase">Desafio da leitura</h3>
                        </div>
                        <p className="text-sm text-white/70 leading-relaxed">{chapterSummary.challenge}</p>
                      </motion.div>
                    </div>
                  ) : null}
                </div>

                <div className="p-4 border-t border-white/10">
                  <Button onClick={handleStartReading} disabled={isLoadingIntro} className="w-full py-3 rpg-btn disabled:opacity-40">
                    <ChevronRight className="w-4 h-4 mr-2" />
                    Iniciar Leitura
                  </Button>
                </div>
              </motion.div>
            )}

            {/* READING PHASE — cena do personagem em tela cheia (sem cronômetro) */}
            {phase === "reading" && (
              <motion.div key="reading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full flex flex-col">
                <RPGReadingScene
                  bookName={bookName}
                  bookId={bookId}
                  chapter={chapter}
                  verses={verses}
                  isLoading={isLoadingVerses}
                  error={error}
                  onRetry={loadVerses}
                  userId={userId}
                  isAdmin={isAdmin}
                  translation={translation}
                  look={look}
                  isBoss={!!book && chapter === book.chapters}
                  onFinish={handleProceedToQuiz}
                  onClose={handleClose}
                />
              </motion.div>
            )}

            {/* DESAFIO DO CAPÍTULO — minijogo, batalha de chefe ou quiz.
                Envolve num container de ALTURA CHEIA (h-full flex-col) para o
                desafio preencher a tela toda, sem faixa vazia embaixo. */}
            {phase === "quiz" && (
              <motion.div key="quiz" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full flex flex-col">
                {challengeType === "ordenar" ? (
                  <RPGChallengeOrder bookId={bookId} chapter={chapter} chapterText={chapterText} look={look} onWin={() => loadDevotional(2)} />
                ) : challengeType === "cacapalavras" ? (
                  <RPGChallengeWordSearch bookId={bookId} chapter={chapter} chapterText={chapterText} look={look} onWin={() => loadDevotional(2)} />
                ) : challengeType === "cruzada" ? (
                  <RPGChallengeCrossword bookId={bookId} chapter={chapter} chapterText={chapterText} look={look} onWin={() => loadDevotional(2)} />
                ) : challengeType === "completar" ? (
                  <RPGChallengeComplete bookId={bookId} chapter={chapter} chapterText={chapterText} look={look} onWin={() => loadDevotional(2)} />
                ) : challengeType === "ligar" ? (
                  <RPGChallengeConnect bookId={bookId} chapter={chapter} chapterText={chapterText} look={look} onWin={() => loadDevotional(2)} />
                ) : challengeType === "memoria" ? (
                  <RPGChallengeMemory bookId={bookId} chapter={chapter} chapterText={chapterText} look={look} onWin={() => loadDevotional(2)} />
                ) : challengeType === "boss" ? (
                  <RPGBossBattle bookId={bookId} chapter={chapter} look={look} onFinish={(c) => loadDevotional(c)} />
                ) : (
                  <RPGQuizPhase
                    look={look}
                    bookId={bookId}
                    chapter={chapter}
                    chapterText={chapterText}
                    questions={questions}
                    currentQ={currentQ}
                    selectedAnswer={selectedAnswer}
                    isAnswered={isAnswered}
                    isLoading={isLoadingQuiz}
                    correctCount={correctCount}
                    timer={quizTimer}
                    onSelectAnswer={handleSelectAnswer}
                    onConfirmAnswer={handleConfirmAnswer}
                  />
                )}
              </motion.div>
            )}

            {/* DEVOTIONAL PHASE */}
            {phase === "devotional" && (
              <motion.div key="devotional" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="h-full flex flex-col">
                <div className="flex-1 overflow-y-auto p-4">
                  {isLoadingDevotional ? (
                    <div className="flex flex-col items-center justify-center py-12 gap-4">
                      <Loader2 className="w-8 h-8 animate-spin text-amber-400" />
                      <p className="text-white/50 text-sm">Gerando devocional...</p>
                    </div>
                  ) : devotional ? (
                    <div className="space-y-5">
                      <div className="text-center">
                        <Heart className="w-8 h-8 text-rose-400 mx-auto mb-2" />
                        <h2 className="text-lg font-black text-amber-400">{devotional.title}</h2>
                        <p className="text-xs text-white/40 mt-1">{bookName} {chapter}</p>
                      </div>
                      {devotional.reflection && (
                        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                          <h3 className="text-xs font-bold text-amber-400 uppercase mb-2">💡 Reflexão</h3>
                          <p className="text-sm text-white/70 leading-relaxed">{devotional.reflection}</p>
                        </div>
                      )}
                      {devotional.application && (
                        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                          <h3 className="text-xs font-bold text-green-400 uppercase mb-2">🎯 Aplicação</h3>
                          <p className="text-sm text-white/70 leading-relaxed">{devotional.application}</p>
                        </div>
                      )}
                      {devotional.prayer && (
                        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                          <h3 className="text-xs font-bold text-blue-400 uppercase mb-2">🙏 Oração</h3>
                          <p className="text-sm text-white/70 leading-relaxed italic">{devotional.prayer}</p>
                        </div>
                      )}
                    </div>
                  ) : null}
                </div>
                <div className="p-4 border-t border-white/10 space-y-2">
                  <Button onClick={handleCompleteChapter} disabled={isLoadingDevotional} className="w-full py-3 rpg-btn disabled:opacity-40">
                    <Trophy className="w-4 h-4 mr-2" />
                    Completar Capítulo
                  </Button>
                  {devotional && (
                    <Button onClick={handleShareOpen} disabled={isLoadingDevotional} variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 font-semibold rounded-xl">
                      <Share2 className="w-4 h-4 mr-2" />
                      Compartilhar Devocional
                    </Button>
                  )}
                </div>
              </motion.div>
            )}

            {/* RESULT PHASE */}
            {phase === "result" && (
              <motion.div key="result" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="h-full flex flex-col items-center justify-center p-6 gap-4 text-center">
                <RPGMascotCanvas look={look} mood="happy" size={120} />
                <div className="space-y-2">
                  <h2 className="text-2xl font-black text-amber-400">{alreadyCompleted ? "REVISÃO CONCLUÍDA!" : "CAPÍTULO COMPLETO!"}</h2>
                  <p className="text-white/70 text-sm">{bookName} {chapter}</p>
                  {alreadyCompleted && <p className="text-[11px] text-white/50">Você refez a fase — o progresso foi mantido, sem pontos extras.</p>}
                </div>
                <div className="flex items-center gap-6 my-4">
                  <div className="text-center">
                    <div className="flex items-center gap-1 text-amber-400">
                      <Zap className="w-5 h-5" />
                      <span className="text-2xl font-black">+{xpEarned}</span>
                    </div>
                    <p className="text-[10px] text-white/40 uppercase">XP Ganho</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center gap-1 text-green-400">
                      <CheckCircle2 className="w-5 h-5" />
                      <span className="text-2xl font-black">{correctCount}/{questions.length || 2}</span>
                    </div>
                    <p className="text-[10px] text-white/40 uppercase">Quiz</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center gap-1 text-blue-400">
                      <Clock className="w-5 h-5" />
                      <span className="text-2xl font-black">{formatTime(elapsedSeconds)}</span>
                    </div>
                    <p className="text-[10px] text-white/40 uppercase">Tempo</p>
                  </div>
                </div>
                {!alreadyCompleted && (
                  <div className="text-xs text-white/40 space-y-1">
                    <p>📖 Leitura: +{XP_BASE} pontos</p>
                    {correctCount > 0 && <p>✅ Quiz: +{correctCount * XP_QUIZ_BONUS} pontos</p>}
                    <p>🙏 Devocional concluído</p>
                  </div>
                )}
                <Button onClick={handleClose} className="w-full py-3 mt-4 rpg-btn">
                  <Trophy className="w-4 h-4 mr-2" />
                  Continuar Jornada
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
    </div>

    {/* Hidden shareable card for image generation */}
    {devotional && (
      <div style={{ position: "fixed", left: "-9999px", top: 0, zIndex: -1, pointerEvents: "none", width: "1080px", height: "1920px" }}>
        <ShareableRPGDevotionalCard
          ref={shareCardRef}
          title={devotional.title}
          reflection={devotional.reflection}
          application={devotional.application}
          prayer={devotional.prayer}
          bookName={bookName}
          chapter={chapter}
        />
      </div>
    )}

    {/* Share modal - MUST be outside Dialog to avoid z-index conflicts */}
    <ShareOptionsModal
      isOpen={showShareModal}
      onClose={() => { setShowShareModal(false); setShareImagePreview(null); }}
      imagePreview={shareImagePreview}
      isGenerating={isGeneratingShare}
      onShareWhatsApp={handleShareWhatsApp}
      onDownload={handleShareDownload}
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
  </>
  );
};

export default RPGChapterModal;
