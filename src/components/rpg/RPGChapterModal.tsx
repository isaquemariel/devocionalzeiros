import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen, Loader2, CheckCircle2, Clock, Zap, Trophy, AlertTriangle, Heart, ChevronRight, Sparkles, Eye, Share2, Download, MessageCircle } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { useUsageLimits } from "@/hooks/useUsageLimits";
import { useUserPlan } from "@/hooks/useUserPlan";
import { useAuth } from "@/hooks/useAuth";
import { UsageLimitModal } from "@/components/shared/UsageLimitModal";
import { Mascot3D } from "@/components/shared/Mascot3D";
import { RPG_BIBLE_BOOKS } from "@/lib/rpgBibleData";
import { fetchChapterVerses } from "@/lib/bibleService";
import { toast } from "sonner";
import { toPng } from "html-to-image";
import RPGReadingPhase from "./RPGReadingPhase";
import RPGQuizPhase from "./RPGQuizPhase";
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
  reviewMode?: boolean;
  isAdmin?: boolean;
}

const MIN_READING_SECONDS = 180;
const MAX_READING_SECONDS = 300;
const XP_BASE = 10;
const XP_QUIZ_BONUS = 5;

const RPGChapterModal = ({ isOpen, onClose, bookIndex, chapter, userId, onComplete, reviewMode = false, isAdmin = false }: RPGChapterModalProps) => {
  const { user } = useAuth();
  const { planType } = useUserPlan(user?.email || undefined);
  const { checkLimit, incrementUsage } = useUsageLimits(userId, planType);
  const [usageLimitModal, setUsageLimitModal] = useState<{ isOpen: boolean; featureName: string; currentUsage: number; limit: number; isBlocked: boolean } | null>(null);
  const book = RPG_BIBLE_BOOKS[bookIndex];
  const bookName = book?.name || "";
  const bookId = book?.id || "";

  const [phase, setPhase] = useState<Phase>(reviewMode ? "reading" : "chapter-intro");

  // Chapter intro
  const [chapterSummary, setChapterSummary] = useState<ChapterSummary | null>(null);
  const [isLoadingIntro, setIsLoadingIntro] = useState(false);

  // Bible verses
  const [verses, setVerses] = useState<{ number: number; text: string }[]>([]);
  const [isLoadingVerses, setIsLoadingVerses] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Timer
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const canProceed = reviewMode || isAdmin || elapsedSeconds >= MIN_READING_SECONDS;

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
  const [reviewTab, setReviewTab] = useState<"reading" | "quiz" | "devotional">("reading");

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
    try {
      blockDialogClose.current = true;
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.style.display = "none";
      link.download = `rpg-devocional-${bookName}-${chapter}.png`;
      link.href = blobUrl;
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);
        blockDialogClose.current = false;
      }, 500);
      toast.success("Imagem baixada! Poste nos Stories 📸");
    } catch (err) {
      console.error("Download error:", err);
      blockDialogClose.current = false;
      toast.error("Erro ao baixar imagem");
    }
  }, [shareImagePreview, generateShareImage, bookName, chapter]);

  const handleShareWhatsApp = useCallback(async () => {
    let dataUrl = shareImagePreview;
    if (!dataUrl) dataUrl = await generateShareImage();
    if (!dataUrl) return;
    blockDialogClose.current = true;
    if (navigator.share && navigator.canShare) {
      try {
        const response = await fetch(dataUrl);
        const blob = await response.blob();
        const file = new File([blob], "rpg-devocional.png", { type: "image/png" });
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({ files: [file], title: "Devocional RPG", text: "Confira meu devocional do RPG Bíblico! 🎮🙏\n\nAcesse: devocionalzeiros.com.br" });
          blockDialogClose.current = false;
          return;
        }
      } catch (err) { if ((err as Error).name !== "AbortError") console.error(err); }
    }
    // Fallback: download via blob URL to avoid Dialog close
    try {
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.style.display = "none";
      link.download = `rpg-devocional-${bookName}-${chapter}.png`;
      link.href = blobUrl;
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);
        blockDialogClose.current = false;
        window.open(`https://wa.me/?text=${encodeURIComponent("Confira meu devocional do RPG Bíblico! 🎮🙏\n\nAcesse: devocionalzeiros.com.br")}`, "_blank");
      }, 500);
    } catch (err) {
      console.error("Share error:", err);
      blockDialogClose.current = false;
    }
  }, [shareImagePreview, generateShareImage, bookName, chapter]);

  // Start timer when reading phase begins (non-review only)
  useEffect(() => {
    if (isOpen && phase === "reading" && !reviewMode) {
      timerRef.current = setInterval(() => setElapsedSeconds(s => s + 1), 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isOpen, phase, reviewMode]);

  // Quiz timer
  useEffect(() => {
    if (phase === "quiz" && !isLoadingQuiz && questions.length > 0 && !isAnswered && !reviewMode && !isAdmin) {
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
  }, [phase, currentQ, isLoadingQuiz, isAnswered, reviewMode]);

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
      if (!reviewMode) loadChapterIntro();
      loadVerses();
      if (reviewMode) {
        loadReviewData();
      }
    }
    return () => {
      setChapterSummary(null);
      setVerses([]);
      setError(null);
      setElapsedSeconds(0);
      setPhase(reviewMode ? "reading" : "chapter-intro");
      setQuestions([]);
      setCurrentQ(0);
      setCorrectCount(0);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setXpEarned(0);
      setDevotional(null);
      setAnsweredQuestions([]);
      setReviewTab("reading");
    };
  }, [isOpen, bookId, chapter]);

  const loadReviewData = async () => {
    // Load cached devotional for review
    try {
      const { data: cached } = await supabase
        .from("verse_devotionals_cache")
        .select("devotional_data")
        .eq("book_id", bookId)
        .eq("chapter_number", chapter)
        .limit(1)
        .maybeSingle();
      
      if (cached?.devotional_data) {
        const d = cached.devotional_data as any;
        setDevotional({
          title: d.title || `${bookName} ${chapter}`,
          reflection: d.reflection || d.meditation || "",
          application: d.application || "",
          prayer: d.prayer || "",
        });
      }
    } catch (err) {
      console.error("Error loading review devotional:", err);
    }

    // Load cached quiz for review
    try {
      const { data: quizCache } = await supabase
        .from("rpg_quiz_cache")
        .select("questions")
        .eq("book_name", bookName)
        .eq("chapter_number", chapter)
        .order("question_set", { ascending: true })
        .limit(1)
        .maybeSingle();
      
      if (quizCache?.questions) {
        const rawQs = quizCache.questions as any[];
        setQuestions(rawQs.slice(0, 2).map((q: any) => ({
          question: q.question,
          options: Array.isArray(q.options) ? q.options : Object.values(q.options || {}),
          correct_answer: Array.isArray(q.options) ? q.correct_answer : q.options?.[q.correct_answer] || q.correct_answer,
        })));
      }
    } catch (err) {
      console.error("Error loading review quiz:", err);
    }
  };

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
    setIsLoadingVerses(true);
    setError(null);
    try {
      // First attempt: use bibleService (direct API + proxy fallback internally)
      let result = await fetchChapterVerses(bookId, chapter);

      // If empty, force via proxy directly (bible-proxy edge function)
      if (result.length === 0) {
        const bookInfo = (await import('@/lib/bibleService')).BOOK_ID_MAP[bookId];
        if (bookInfo) {
          const { data, error: proxyErr } = await supabase.functions.invoke('bible-proxy', {
            body: { bookNumber: bookInfo.apiNumber, chapter, translation: 'ARC' },
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
    } catch (err) {
      // Retry up to 3 times with progressive delay
      if (attempt < 3) {
        setTimeout(() => loadVerses(attempt + 1), attempt * 1500);
      } else {
        setError(err instanceof Error ? err.message : "Erro ao carregar capítulo");
      }
    } finally {
      if (attempt >= 3 || (await fetchChapterVerses(bookId, chapter).then(r => r.length > 0).catch(() => false))) {
        setIsLoadingVerses(false);
      }
    }
  };

  const handleStartReading = () => {
    setPhase("reading");
  };

  const handleProceedToQuiz = async () => {
    if (timerRef.current) clearInterval(timerRef.current);
    
    // Check RPG quiz usage limit
    if (!isAdmin && !reviewMode) {
      const quizLimit = checkLimit("rpg_quiz");
      if (!quizLimit.canUse) {
        setUsageLimitModal({
          isOpen: true,
          featureName: "Quiz do RPG",
          currentUsage: quizLimit.currentUsage,
          limit: quizLimit.limit,
          isBlocked: quizLimit.isBlocked,
        });
        return;
      }
      await incrementUsage("rpg_quiz");
    }
    
    setPhase("quiz");
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
    const xp = XP_BASE + (correctCount * XP_QUIZ_BONUS);
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

      const { data: stats, error: statsError } = await supabase
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

  const progressPercent = Math.min((elapsedSeconds / MAX_READING_SECONDS) * 100, 100);

  const phaseLabel = reviewMode 
    ? `👁️ Revisão — ${reviewTab === "reading" ? "Leitura" : reviewTab === "quiz" ? "Quiz" : "Devocional"}`
    : phase === "chapter-intro" ? "📜 Introdução" 
    : phase === "reading" ? "📖 Leitura" 
    : phase === "quiz" ? "❓ Quiz" 
    : phase === "devotional" ? "🙏 Devocional" 
    : "🏆 Resultado";

  return (
    <>
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open && !blockDialogClose.current && !showShareModal) handleClose(); }}>
      <DialogContent className="max-w-2xl h-[90dvh] flex flex-col p-0 gap-0 bg-[#0a0a1a] border-amber-500/20 text-white [&>button:last-child]:hidden overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <div>
              <DialogTitle className="text-base font-black text-white">
                {bookName} {chapter}
              </DialogTitle>
              <p className="text-xs text-white/40">{phaseLabel}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {phase === "reading" && !reviewMode && (
              <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                canProceed ? "bg-green-500/20 text-green-400" : "bg-amber-500/20 text-amber-400"
              }`}>
                <Clock className="w-3.5 h-3.5" />
                {formatTime(elapsedSeconds)}
              </div>
            )}
            {reviewMode && (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-400">
                <Eye className="w-3.5 h-3.5" />
                Revisão
              </div>
            )}
            <button onClick={handleClose} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors">
              <X className="w-5 h-5 text-white/50" />
            </button>
          </div>
        </div>

        {/* Review mode tabs */}
        {reviewMode && (
          <div className="flex items-center gap-1 p-2 border-b border-white/10 bg-white/[0.02]">
            {(["reading", "quiz", "devotional"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setReviewTab(tab)}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                  reviewTab === tab
                    ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                    : "text-white/40 hover:text-white/60 hover:bg-white/5"
                }`}
              >
                {tab === "reading" ? "📖 Leitura" : tab === "quiz" ? "❓ Quiz" : "🙏 Devocional"}
              </button>
            ))}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            {/* REVIEW MODE */}
            {reviewMode && (
              <motion.div key={`review-${reviewTab}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full flex flex-col">
                {reviewTab === "reading" && (
                <RPGReadingPhase
                    bookName={bookName}
                    bookId={bookId}
                    chapter={chapter}
                    verses={verses}
                    isLoading={isLoadingVerses}
                    error={error}
                    onRetry={loadVerses}
                    userId={userId}
                    reviewMode
                    isAdmin={isAdmin}
                  />
                )}
                {reviewTab === "quiz" && (
                  <div className="flex-1 overflow-y-auto p-4">
                    {questions.length > 0 ? (
                      <div className="space-y-4">
                        <div className="text-center mb-4">
                          <h3 className="text-sm font-bold text-amber-400">Gabarito do Quiz</h3>
                          <p className="text-xs text-white/40">{bookName} {chapter}</p>
                        </div>
                        {questions.map((q, i) => (
                          <div key={i} className="bg-white/5 rounded-xl p-4 border border-white/10">
                            <p className="text-sm font-bold text-white mb-3">{i + 1}. {q.question}</p>
                            <div className="space-y-1.5">
                              {q.options.map((opt, j) => {
                                const isCorrect = opt === q.correct_answer;
                                return (
                                  <div key={j} className={`text-xs p-2 rounded-lg ${
                                    isCorrect ? "bg-green-500/20 text-green-400 border border-green-500/30" : "text-white/50"
                                  }`}>
                                    {isCorrect && "✅ "}{opt}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12 gap-3">
                        <p className="text-white/40 text-sm">Quiz não disponível para revisão</p>
                      </div>
                    )}
                  </div>
                )}
                {reviewTab === "devotional" && (
                  <>
                    <div className="flex-1 overflow-y-auto p-4">
                      {devotional ? (
                        <div className="space-y-5">
                          <div className="text-center">
                            <Heart className="w-8 h-8 text-rose-400 mx-auto mb-2" />
                            <h2 className="text-lg font-black text-amber-400">{devotional.title}</h2>
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
                      ) : (
                        <div className="flex flex-col items-center justify-center py-12 gap-3">
                          <p className="text-white/40 text-sm">Devocional não disponível para revisão</p>
                        </div>
                      )}
                    </div>
                    {devotional && (
                      <div className="p-4 border-t border-white/10">
                        <Button onClick={handleShareOpen} className="w-full bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-500 hover:to-indigo-400 text-white font-semibold rounded-xl">
                          <Share2 className="w-4 h-4 mr-2" />
                          Compartilhar Devocional
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </motion.div>
            )}

            {/* NORMAL MODE - CHAPTER INTRO */}
            {!reviewMode && phase === "chapter-intro" && (
              <motion.div key="chapter-intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full flex flex-col">
                <div className="flex-1 overflow-y-auto p-4">
                  {isLoadingIntro ? (
                    <div className="flex flex-col items-center justify-center py-12 gap-4">
                      <motion.div animate={{ y: [-3, 3, -3] }} transition={{ duration: 2, repeat: Infinity }}>
                        <Mascot3D mood="happy" size="lg" />
                      </motion.div>
                      <p className="text-white/50 text-sm">Preparando a jornada...</p>
                    </div>
                  ) : chapterSummary ? (
                    <div className="space-y-4">
                      <div className="flex flex-col items-center">
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.1 }}>
                          <Mascot3D mood="happy" size="lg" />
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
                          <Sparkles className="w-4 h-4 text-blue-400" />
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
                  <Button onClick={handleStartReading} disabled={isLoadingIntro} className="w-full py-3 bg-gradient-to-r from-amber-600 to-yellow-500 text-black font-bold rounded-xl disabled:opacity-40">
                    <ChevronRight className="w-4 h-4 mr-2" />
                    Iniciar Leitura
                  </Button>
                </div>
              </motion.div>
            )}

            {/* READING PHASE with Study Bible integration */}
            {!reviewMode && phase === "reading" && (
              <motion.div key="reading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full flex flex-col">
                <RPGReadingPhase
                  bookName={bookName}
                  bookId={bookId}
                  chapter={chapter}
                  verses={verses}
                  isLoading={isLoadingVerses}
                  error={error}
                  onRetry={loadVerses}
                  userId={userId}
                  isAdmin={isAdmin}
                />
                <div className="p-4 border-t border-white/10">
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-xs text-white/40 mb-1">
                      <span>{canProceed ? "✅ Pode avançar!" : "Leia por pelo menos 3 minutos"}</span>
                      <span>{formatTime(elapsedSeconds)} / {formatTime(MAX_READING_SECONDS)}</span>
                    </div>
                    <Progress value={progressPercent} className="h-1.5 bg-white/10 [&>div]:bg-amber-500" />
                  </div>
                  <Button onClick={handleProceedToQuiz} disabled={!canProceed} className="w-full py-3 bg-gradient-to-r from-amber-600 to-yellow-500 text-black font-bold rounded-xl disabled:opacity-40">
                    {canProceed ? "⚔️ Ir para o Quiz" : `⏳ Aguarde ${formatTime(MIN_READING_SECONDS - elapsedSeconds)}`}
                  </Button>
                </div>
              </motion.div>
            )}

            {/* ENHANCED QUIZ PHASE */}
            {!reviewMode && phase === "quiz" && (
              <RPGQuizPhase
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

            {/* DEVOTIONAL PHASE */}
            {!reviewMode && phase === "devotional" && (
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
                  <Button onClick={handleCompleteChapter} disabled={isLoadingDevotional} className="w-full py-3 bg-gradient-to-r from-amber-600 to-yellow-500 text-black font-bold rounded-xl disabled:opacity-40">
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
            {!reviewMode && phase === "result" && (
              <motion.div key="result" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="h-full flex flex-col items-center justify-center p-6 gap-4 text-center">
                <Mascot3D mood={correctCount >= 1 ? "champion" : "happy"} size="lg" />
                <div className="space-y-2">
                  <h2 className="text-2xl font-black text-amber-400">CAPÍTULO COMPLETO!</h2>
                  <p className="text-white/50 text-sm">{bookName} {chapter}</p>
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
                <div className="text-xs text-white/30 space-y-1">
                  <p>📖 Leitura: +{XP_BASE} pontos</p>
                  {correctCount > 0 && <p>✅ Quiz: +{correctCount * XP_QUIZ_BONUS} pontos</p>}
                  <p>🙏 Devocional concluído</p>
                </div>
                <Button onClick={handleClose} className="w-full py-3 mt-4 bg-gradient-to-r from-amber-600 to-yellow-500 text-black font-bold rounded-xl">
                  <Trophy className="w-4 h-4 mr-2" />
                  Continuar Jornada
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>

    {/* Hidden shareable card for image generation - MUST be outside Dialog portal */}
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
