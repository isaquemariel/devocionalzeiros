import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen, Loader2, CheckCircle2, Clock, Zap, Trophy, AlertTriangle } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { Mascot3D } from "@/components/shared/Mascot3D";
import { RPG_BIBLE_BOOKS } from "@/lib/rpgBibleData";
import { toast } from "sonner";

type Phase = "reading" | "quiz" | "result";

interface QuizQuestion {
  question: string;
  options: string[];
  correct_answer: string;
}

interface RPGChapterModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookIndex: number;
  chapter: number;
  userId: string;
  onComplete: (xpEarned: number) => void;
}

const MIN_READING_SECONDS = 60; // 1 minute minimum reading
const XP_BASE = 20;
const XP_QUIZ_BONUS = 15;

const RPGChapterModal = ({ isOpen, onClose, bookIndex, chapter, userId, onComplete }: RPGChapterModalProps) => {
  const book = RPG_BIBLE_BOOKS[bookIndex];
  const bookName = book?.name || "";

  const [phase, setPhase] = useState<Phase>("reading");
  const [explanation, setExplanation] = useState("");
  const [isLoadingText, setIsLoadingText] = useState(false);
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

  // Result
  const [xpEarned, setXpEarned] = useState(0);

  // Start timer when reading phase begins
  useEffect(() => {
    if (isOpen && phase === "reading") {
      timerRef.current = setInterval(() => setElapsedSeconds(s => s + 1), 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isOpen, phase]);

  // Fetch chapter explanation
  useEffect(() => {
    if (isOpen && bookName && chapter) {
      fetchExplanation();
    }
    return () => {
      setExplanation("");
      setError(null);
      setElapsedSeconds(0);
      setPhase("reading");
      setQuestions([]);
      setCurrentQ(0);
      setCorrectCount(0);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setXpEarned(0);
    };
  }, [isOpen, bookName, chapter]);

  const fetchExplanation = async () => {
    setIsLoadingText(true);
    setExplanation("");
    setError(null);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) throw new Error("Sessão expirada");

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chapter-explanation`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({ book: bookName, chapter }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao carregar explicação");
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("Erro ao iniciar leitura");
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        let idx: number;
        while ((idx = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, idx);
          buffer = buffer.slice(idx + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") break;
          try {
            const parsed = JSON.parse(json);
            const c = parsed.choices?.[0]?.delta?.content;
            if (c) setExplanation(prev => prev + c);
          } catch { buffer = line + "\n" + buffer; break; }
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setIsLoadingText(false);
    }
  };

  // Proceed to quiz
  const handleProceedToQuiz = async () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setPhase("quiz");
    setIsLoadingQuiz(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) throw new Error("Sessão expirada");

      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/quiz-generator`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            chapters: [{ bookName, chapterNumber: chapter }],
            difficulty: "easy",
            mode: "free",
            questionsPerChapter: 2,
          }),
        }
      );
      if (!res.ok) throw new Error("Erro ao carregar quiz");
      const data = await res.json();
      const rawQs = data.questions?.[0]?.questions || [];
      // Normalize options: quiz-generator returns { A, B, C } objects
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
      // If quiz fails, skip to result with base XP only
      toast.error("Quiz indisponível, prosseguindo...");
      await completeChapter(0);
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

    // Auto-advance after 1.5s
    setTimeout(() => {
      if (currentQ + 1 < questions.length) {
        setCurrentQ(q => q + 1);
        setSelectedAnswer(null);
        setIsAnswered(false);
      } else {
        const finalCorrect = isCorrect ? correctCount + 1 : correctCount;
        completeChapter(finalCorrect);
      }
    }, 1500);
  };

  const completeChapter = async (quizCorrect: number) => {
    const xp = XP_BASE + (quizCorrect * XP_QUIZ_BONUS);
    setXpEarned(xp);
    setPhase("result");

    try {
      // Save progress
      await supabase.from("rpg_progress").upsert({
        user_id: userId,
        book_index: bookIndex,
        chapter_number: chapter,
        is_completed: true,
        completed_at: new Date().toISOString(),
        reading_time_seconds: elapsedSeconds,
        quiz_correct: quizCorrect,
        quiz_total: questions.length || 2,
      }, { onConflict: "user_id,book_index,chapter_number" });

      // Update user stats — add XP
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

      // Also save to reading_progress for ranking points
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

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-2xl h-[90vh] flex flex-col p-0 gap-0 bg-[#0a0a1a] border-amber-500/20 text-white">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <div>
              <DialogTitle className="text-base font-black text-white">
                {bookName} {chapter}
              </DialogTitle>
              <p className="text-xs text-white/40">
                {phase === "reading" ? "📖 Leitura" : phase === "quiz" ? "❓ Quiz" : "🏆 Resultado"}
              </p>
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
            {/* READING PHASE */}
            {phase === "reading" && (
              <motion.div key="reading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full flex flex-col">
                <ScrollArea className="flex-1 p-4">
                  {isLoadingText && !explanation ? (
                    <div className="flex flex-col items-center justify-center py-12 gap-4">
                      <Loader2 className="w-8 h-8 animate-spin text-amber-400" />
                      <p className="text-white/50 text-sm">Gerando explicação teológica...</p>
                    </div>
                  ) : error ? (
                    <div className="flex flex-col items-center justify-center py-12 gap-4">
                      <AlertTriangle className="w-8 h-8 text-red-400" />
                      <p className="text-red-400 text-sm">{error}</p>
                      <Button onClick={fetchExplanation} variant="outline" size="sm" className="border-white/20 text-white">
                        Tentar novamente
                      </Button>
                    </div>
                  ) : (
                    <div className="prose prose-sm prose-invert max-w-none">
                      <div className="whitespace-pre-wrap text-white/80 leading-relaxed text-sm">
                        {explanation.split("\n").map((line, i) => {
                          if (line.startsWith("### ")) return <h3 key={i} className="text-base font-bold text-amber-400 mt-4 mb-2">{line.slice(4)}</h3>;
                          if (line.startsWith("## ")) return <h2 key={i} className="text-lg font-bold text-amber-300 mt-5 mb-2">{line.slice(3)}</h2>;
                          if (line.startsWith("# ")) return <h1 key={i} className="text-xl font-bold text-amber-200 mt-6 mb-3">{line.slice(2)}</h1>;
                          if (line.startsWith("- ") || line.startsWith("* ")) return <li key={i} className="ml-4 text-white/60">{line.slice(2)}</li>;
                          if (line.startsWith("> ")) return <blockquote key={i} className="border-l-4 border-amber-500/50 pl-4 italic text-white/50 my-3">{line.slice(2)}</blockquote>;
                          if (line.trim() === "") return <br key={i} />;
                          return <p key={i} className="text-white/70 my-1.5">{line}</p>;
                        })}
                        {isLoadingText && <span className="inline-block w-2 h-4 bg-amber-400/50 animate-pulse ml-1" />}
                      </div>
                    </div>
                  )}
                </ScrollArea>

                {/* Reading footer */}
                <div className="p-4 border-t border-white/10">
                  {!canProceed && (
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-xs text-white/40 mb-1">
                        <span>Tempo mínimo de leitura</span>
                        <span>{formatTime(elapsedSeconds)} / {formatTime(MIN_READING_SECONDS)}</span>
                      </div>
                      <Progress value={(elapsedSeconds / MIN_READING_SECONDS) * 100} className="h-1.5 bg-white/10 [&>div]:bg-amber-500" />
                    </div>
                  )}
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
                        {questions[currentQ].options.map((opt, i) => {
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
                  <p>📖 Leitura: +{XP_BASE} XP</p>
                  {correctCount > 0 && <p>✅ Quiz bônus: +{correctCount * XP_QUIZ_BONUS} XP</p>}
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
