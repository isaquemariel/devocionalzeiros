import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen, Loader2, CheckCircle2, Clock, Zap, Trophy, AlertTriangle, Heart, ChevronRight, Sparkles } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { Mascot3D } from "@/components/shared/Mascot3D";
import { RPG_BIBLE_BOOKS } from "@/lib/rpgBibleData";
import { fetchChapterVerses } from "@/lib/bibleService";
import { toast } from "sonner";

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

interface RPGChapterModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookIndex: number;
  chapter: number;
  userId: string;
  onComplete: (xpEarned: number) => void;
}

const MIN_READING_SECONDS = 180; // 3 min to advance
const MAX_READING_SECONDS = 300; // 5 min total
const XP_BASE = 10;
const XP_QUIZ_BONUS = 5;

const RPGChapterModal = ({ isOpen, onClose, bookIndex, chapter, userId, onComplete }: RPGChapterModalProps) => {
  const book = RPG_BIBLE_BOOKS[bookIndex];
  const bookName = book?.name || "";
  const bookId = book?.id || "";

  const [phase, setPhase] = useState<Phase>("chapter-intro");

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
  const canProceed = elapsedSeconds >= MIN_READING_SECONDS;

  // Quiz
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [isLoadingQuiz, setIsLoadingQuiz] = useState(false);
  const [currentQuestionSet, setCurrentQuestionSet] = useState<number>(1);

  // Devotional
  const [devotional, setDevotional] = useState<Devotional | null>(null);
  const [isLoadingDevotional, setIsLoadingDevotional] = useState(false);

  // Result
  const [xpEarned, setXpEarned] = useState(0);

  // Start timer when reading phase begins
  useEffect(() => {
    if (isOpen && phase === "reading") {
      timerRef.current = setInterval(() => setElapsedSeconds(s => s + 1), 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isOpen, phase]);

  // Load chapter intro when opened
  useEffect(() => {
    if (isOpen && bookName && chapter) {
      loadChapterIntro();
      loadVerses(); // Pre-load verses while showing intro
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
    };
  }, [isOpen, bookId, chapter]);

  const loadChapterIntro = async () => {
    setIsLoadingIntro(true);
    try {
      // Check cache first
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

      // No cache — generate and it will be cached by the edge function
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

  const loadVerses = async () => {
    setIsLoadingVerses(true);
    setError(null);
    try {
      const result = await fetchChapterVerses(bookId, chapter);
      if (result.length === 0) throw new Error("Não foi possível carregar os versículos");
      setVerses(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar capítulo");
    } finally {
      setIsLoadingVerses(false);
    }
  };

  const handleStartReading = () => {
    setPhase("reading");
  };

  // Proceed to quiz
  const handleProceedToQuiz = async () => {
    if (timerRef.current) clearInterval(timerRef.current);
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
        options: Array.isArray(q.options)
          ? q.options
          : Object.values(q.options || {}),
        correct_answer: Array.isArray(q.options)
          ? q.correct_answer
          : q.options?.[q.correct_answer] || q.correct_answer,
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
    setIsAnswered(true);
    const isCorrect = selectedAnswer === questions[currentQ].correct_answer;
    if (isCorrect) setCorrectCount(c => c + 1);

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

    // Track this quiz attempt
    const failed = quizCorrect === 0;
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
      const randomVerse = verses.length > 0
        ? verses[Math.floor(Math.random() * verses.length)]
        : { number: 1, text: "" };

      const { data, error: fnError } = await supabase.functions.invoke('verse-devotional-generator', {
        body: { bookName, bookId, chapter, verseNumber: randomVerse.number, verseText: randomVerse.text },
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

      const { data: stats } = await supabase
        .from("rpg_user_stats")
        .select("total_xp, streak_days, last_played_at")
        .eq("user_id", userId)
        .single();

      if (stats) {
        const now = new Date();
        const lastPlayed = stats.last_played_at ? new Date(stats.last_played_at) : null;
        const isNewDay = !lastPlayed || now.toDateString() !== lastPlayed.toDateString();
        const isConsecutive = lastPlayed && (now.getTime() - lastPlayed.getTime()) < 48 * 60 * 60 * 1000;

        await supabase.from("rpg_user_stats").update({
          total_xp: stats.total_xp + xp,
          streak_days: isNewDay ? (isConsecutive ? stats.streak_days + 1 : 1) : stats.streak_days,
          last_played_at: now.toISOString(),
        }).eq("user_id", userId);
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
    onClose();
  };

  if (!book) return null;

  const progressPercent = Math.min((elapsedSeconds / MAX_READING_SECONDS) * 100, 100);

  const phaseLabel = phase === "chapter-intro" ? "📜 Introdução" 
    : phase === "reading" ? "📖 Leitura" 
    : phase === "quiz" ? "❓ Quiz" 
    : phase === "devotional" ? "🙏 Devocional" 
    : "🏆 Resultado";

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-2xl h-[90vh] flex flex-col p-0 gap-0 bg-[#0a0a1a] border-amber-500/20 text-white [&>button:last-child]:hidden">
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
            {phase === "reading" && (
              <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                canProceed ? "bg-green-500/20 text-green-400" : "bg-amber-500/20 text-amber-400"
              }`}>
                <Clock className="w-3.5 h-3.5" />
                {formatTime(elapsedSeconds)}
              </div>
            )}
            <button onClick={handleClose} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors">
              <X className="w-5 h-5 text-white/50" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            {/* CHAPTER INTRO PHASE - Mascot introduces the chapter */}
            {phase === "chapter-intro" && (
              <motion.div key="chapter-intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full flex flex-col">
                <ScrollArea className="flex-1 p-4">
                  {isLoadingIntro ? (
                    <div className="flex flex-col items-center justify-center py-12 gap-4">
                      <motion.div animate={{ y: [-3, 3, -3] }} transition={{ duration: 2, repeat: Infinity }}>
                        <Mascot3D mood="happy" size="lg" />
                      </motion.div>
                      <p className="text-white/50 text-sm">Preparando a jornada...</p>
                    </div>
                  ) : chapterSummary ? (
                    <div className="space-y-4">
                      {/* Mascot with greeting */}
                      <div className="flex flex-col items-center">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", delay: 0.1 }}
                        >
                          <Mascot3D mood="happy" size="lg" />
                        </motion.div>
                        
                        <motion.div
                          initial={{ opacity: 0, y: -5, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ delay: 0.4 }}
                          className="relative mt-2 max-w-xs"
                        >
                          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-amber-500/20 border-l border-t border-amber-500/30 rotate-45" />
                          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl px-4 py-2 text-center">
                            <p className="text-sm text-amber-300 font-bold italic">"{chapterSummary.greeting}"</p>
                          </div>
                        </motion.div>
                      </div>

                      {/* Chapter summary */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="bg-white/5 rounded-xl p-4 border border-white/10"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <BookOpen className="w-4 h-4 text-amber-400" />
                          <h3 className="text-xs font-bold text-amber-400 uppercase">Sobre este capítulo</h3>
                        </div>
                        <p className="text-sm text-white/70 leading-relaxed">{chapterSummary.summary}</p>
                      </motion.div>

                      {/* Key verse */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/20"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Sparkles className="w-4 h-4 text-blue-400" />
                          <h3 className="text-xs font-bold text-blue-400 uppercase">Versículo-chave</h3>
                        </div>
                        <p className="text-sm text-white/70 leading-relaxed italic">{chapterSummary.keyVerse}</p>
                      </motion.div>

                      {/* Challenge */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.0 }}
                        className="bg-green-500/10 rounded-xl p-4 border border-green-500/20"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm">🎯</span>
                          <h3 className="text-xs font-bold text-green-400 uppercase">Desafio da leitura</h3>
                        </div>
                        <p className="text-sm text-white/70 leading-relaxed">{chapterSummary.challenge}</p>
                      </motion.div>
                    </div>
                  ) : null}
                </ScrollArea>

                <div className="p-4 border-t border-white/10">
                  <Button
                    onClick={handleStartReading}
                    disabled={isLoadingIntro}
                    className="w-full py-3 bg-gradient-to-r from-amber-600 to-yellow-500 text-black font-bold rounded-xl disabled:opacity-40"
                  >
                    <ChevronRight className="w-4 h-4 mr-2" />
                    Iniciar Leitura
                  </Button>
                </div>
              </motion.div>
            )}

            {/* READING PHASE - Bible text */}
            {phase === "reading" && (
              <motion.div key="reading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full flex flex-col">
                <ScrollArea className="flex-1 p-4">
                  {isLoadingVerses ? (
                    <div className="flex flex-col items-center justify-center py-12 gap-4">
                      <Loader2 className="w-8 h-8 animate-spin text-amber-400" />
                      <p className="text-white/50 text-sm">Carregando capítulo...</p>
                    </div>
                  ) : error ? (
                    <div className="flex flex-col items-center justify-center py-12 gap-4">
                      <AlertTriangle className="w-8 h-8 text-red-400" />
                      <p className="text-red-400 text-sm">{error}</p>
                      <Button onClick={loadVerses} variant="outline" size="sm" className="border-white/20 text-white">
                        Tentar novamente
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-0.5">
                      <h2 className="text-lg font-bold text-amber-400 mb-4">{bookName} {chapter}</h2>
                      {verses.map((v) => (
                        <p key={v.number} className="text-sm text-white/75 leading-relaxed">
                          <span className="text-amber-500/60 text-xs font-bold mr-1.5">{v.number}</span>
                          {v.text}
                        </p>
                      ))}
                    </div>
                  )}
                </ScrollArea>

                <div className="p-4 border-t border-white/10">
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-xs text-white/40 mb-1">
                      <span>{canProceed ? "✅ Pode avançar!" : "Leia por pelo menos 3 minutos"}</span>
                      <span>{formatTime(elapsedSeconds)} / {formatTime(MAX_READING_SECONDS)}</span>
                    </div>
                    <Progress value={progressPercent} className="h-1.5 bg-white/10 [&>div]:bg-amber-500" />
                  </div>
                  <Button
                    onClick={handleProceedToQuiz}
                    disabled={!canProceed}
                    className="w-full py-3 bg-gradient-to-r from-amber-600 to-yellow-500 text-black font-bold rounded-xl disabled:opacity-40"
                  >
                    {canProceed ? "⚔️ Ir para o Quiz" : `⏳ Aguarde ${formatTime(MIN_READING_SECONDS - elapsedSeconds)}`}
                  </Button>
                </div>
              </motion.div>
            )}

            {/* QUIZ PHASE */}
            {phase === "quiz" && (
              <motion.div key="quiz" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="h-full flex flex-col p-4">
                {isLoadingQuiz ? (
                  <div className="flex-1 flex flex-col items-center justify-center gap-4">
                    <Loader2 className="w-8 h-8 animate-spin text-amber-400" />
                    <p className="text-white/50 text-sm">Preparando o quiz...</p>
                  </div>
                ) : questions.length > 0 ? (
                  <>
                    <div className="text-center mb-4">
                      <p className="text-xs text-white/40 mb-1">Pergunta {currentQ + 1} de {questions.length}</p>
                      <Progress value={((currentQ + 1) / questions.length) * 100} className="h-1.5 bg-white/10 [&>div]:bg-amber-500" />
                    </div>

                    <div className="flex-1 flex flex-col">
                      <p className="text-sm font-bold text-white mb-4">{questions[currentQ].question}</p>

                      <div className="space-y-2 flex-1">
                        {(questions[currentQ].options || []).map((opt, i) => {
                          const isCorrect = opt === questions[currentQ].correct_answer;
                          const isSelected = opt === selectedAnswer;
                          let bg = "bg-white/5 border-white/10 hover:bg-white/10";
                          if (isAnswered) {
                            if (isCorrect) bg = "bg-green-500/20 border-green-500/50";
                            else if (isSelected && !isCorrect) bg = "bg-red-500/20 border-red-500/50";
                          } else if (isSelected) {
                            bg = "bg-amber-500/20 border-amber-500/50";
                          }

                          return (
                            <button
                              key={i}
                              onClick={() => handleSelectAnswer(opt)}
                              disabled={isAnswered}
                              className={`w-full text-left p-3 rounded-xl border transition-all text-sm ${bg}`}
                            >
                              <span className="text-white/80">{opt}</span>
                            </button>
                          );
                        })}
                      </div>

                      <Button
                        onClick={handleConfirmAnswer}
                        disabled={!selectedAnswer || isAnswered}
                        className="w-full py-3 mt-4 bg-gradient-to-r from-amber-600 to-yellow-500 text-black font-bold rounded-xl disabled:opacity-40"
                      >
                        Confirmar Resposta
                      </Button>
                    </div>
                  </>
                ) : null}
              </motion.div>
            )}

            {/* DEVOTIONAL PHASE */}
            {phase === "devotional" && (
              <motion.div key="devotional" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="h-full flex flex-col">
                <ScrollArea className="flex-1 p-4">
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
                </ScrollArea>

                <div className="p-4 border-t border-white/10">
                  <Button
                    onClick={handleCompleteChapter}
                    disabled={isLoadingDevotional}
                    className="w-full py-3 bg-gradient-to-r from-amber-600 to-yellow-500 text-black font-bold rounded-xl disabled:opacity-40"
                  >
                    <Trophy className="w-4 h-4 mr-2" />
                    Completar Capítulo
                  </Button>
                </div>
              </motion.div>
            )}

            {/* RESULT PHASE */}
            {phase === "result" && (
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

                <Button
                  onClick={handleClose}
                  className="w-full py-3 mt-4 bg-gradient-to-r from-amber-600 to-yellow-500 text-black font-bold rounded-xl"
                >
                  <Trophy className="w-4 h-4 mr-2" />
                  Continuar Jornada
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RPGChapterModal;
