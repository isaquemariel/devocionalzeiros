import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ChevronRight, Sparkles, BookOpen, ScrollText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Mascot3D } from "@/components/shared/Mascot3D";
import { supabase } from "@/integrations/supabase/client";
import { RPG_BIBLE_BOOKS, RPG_REGION_THEMES } from "@/lib/rpgBibleData";

interface RPGBookIntroProps {
  bookIndex: number;
  onContinue: () => void;
}

interface BookSummary {
  greeting: string;
  title: string;
  author: string;
  context: string;
  mainTheme: string;
  whatToExpect: string;
  funFact: string;
}

const RPGBookIntro = ({ bookIndex, onContinue }: RPGBookIntroProps) => {
  const book = RPG_BIBLE_BOOKS[bookIndex];
  const theme = book ? RPG_REGION_THEMES[book.region] : null;
  const [summary, setSummary] = useState<BookSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (!book) return;
    fetchBookSummary();
  }, [book?.id]);

  const fetchBookSummary = async () => {
    setIsLoading(true);
    try {
      // Check cache first via direct DB query (faster than edge function)
      const { data: cached } = await supabase
        .from("rpg_summaries_cache")
        .select("summary_data")
        .eq("summary_type", "book")
        .eq("book_name", book!.name)
        .eq("chapter_number", 0)
        .maybeSingle();

      if (cached?.summary_data) {
        setSummary(cached.summary_data as unknown as BookSummary);
        setTimeout(() => setShowContent(true), 300);
        setIsLoading(false);
        return;
      }

      // No cache — call edge function to generate & cache
      const { data, error } = await supabase.functions.invoke("rpg-book-summary", {
        body: { type: "book", bookName: book!.name },
      });
      if (error) throw error;
      setSummary(data);
      setTimeout(() => setShowContent(true), 500);
    } catch (err) {
      console.error("Error fetching book summary:", err);
      setSummary({
        greeting: `Prepare-se para ${book!.name}! 📖`,
        title: `Bem-vindo ao livro de ${book!.name}!`,
        author: "Um dos grandes livros da Bíblia Sagrada.",
        context: "Mergulhe nessa jornada incrível pela Palavra de Deus.",
        mainTheme: "Descubra os temas centrais durante sua leitura.",
        whatToExpect: `São ${book!.chapters} capítulos de sabedoria e revelação divina.`,
        funFact: "Cada capítulo é uma nova aventura!",
      });
      setTimeout(() => setShowContent(true), 300);
    } finally {
      setIsLoading(false);
    }
  };

  if (!book || !theme) return null;

  return (
    <motion.div
      key="book-intro"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative"
    >
      {/* Mascot with speech bubble at top */}
      <div className="flex flex-col items-center mb-4">
        <motion.div
          initial={{ scale: 0, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: "spring", delay: 0.2 }}
        >
          <Mascot3D mood="happy" size="lg" />
        </motion.div>

        {/* Speech bubble */}
        <AnimatePresence>
          {!isLoading && summary && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="relative mt-2 max-w-sm"
            >
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-amber-500/20 border-l border-t border-amber-500/30 rotate-45" />
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 text-center">
                <p className="text-sm text-amber-300 font-bold italic">"{summary.greeting}"</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-8 gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-amber-400" />
          <p className="text-white/40 text-xs">O mascote está preparando a introdução...</p>
        </div>
      ) : summary ? (
        <div className="overflow-y-auto h-[calc(100vh-380px)]">
          <motion.div className="space-y-3 pb-4">
            {/* Title card with Hebrew name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={showContent ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className={`rounded-xl p-4 bg-gradient-to-r ${theme.gradient} relative overflow-hidden`}
            >
              <div className="absolute inset-0 bg-black/50" />
              <div className="relative z-10 text-center">
                <span className="text-3xl mb-2 block">{theme.emoji}</span>
                <h2 className="text-lg font-black text-white">{book.name}</h2>
                {book.hebrewName && (
                  <p className="text-base text-amber-300 font-bold mt-1">{book.hebrewName}</p>
                )}
                {book.hebrewMeaning && (
                  <p className="text-xs text-white/70 italic mt-0.5">Significado: "{book.hebrewMeaning}"</p>
                )}
                <p className="text-xs text-white/50 mt-2">{book.chapters} capítulos · {book.testament === "old" ? "Antigo" : "Novo"} Testamento</p>
              </div>
            </motion.div>

            {/* Info cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={showContent ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="bg-white/5 rounded-xl p-3 border border-white/10"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <ScrollText className="w-3.5 h-3.5 text-blue-400" />
                <h3 className="text-xs font-bold text-blue-400 uppercase">Autoria</h3>
              </div>
              <p className="text-sm text-white/70 leading-relaxed">{summary.author}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={showContent ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="bg-white/5 rounded-xl p-3 border border-white/10"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                <h3 className="text-xs font-bold text-amber-400 uppercase">Contexto Histórico</h3>
              </div>
              <p className="text-sm text-white/70 leading-relaxed">{summary.context}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={showContent ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="bg-white/5 rounded-xl p-3 border border-white/10"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <Sparkles className="w-3.5 h-3.5 text-green-400" />
                <h3 className="text-xs font-bold text-green-400 uppercase">Tema Central</h3>
              </div>
              <p className="text-sm text-white/70 leading-relaxed">{summary.mainTheme}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={showContent ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="bg-amber-500/10 rounded-xl p-3 border border-amber-500/20"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-sm">⚔️</span>
                <h3 className="text-xs font-bold text-amber-400 uppercase">O que esperar</h3>
              </div>
              <p className="text-sm text-white/70 leading-relaxed">{summary.whatToExpect}</p>
            </motion.div>

            {summary.funFact && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={showContent ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 }}
                className="bg-purple-500/10 rounded-xl p-3 border border-purple-500/20"
              >
                <p className="text-xs text-purple-300 font-medium">💡 {summary.funFact}</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      ) : null}

      {/* Continue button */}
      <div className="mt-3">
        <Button
          onClick={onContinue}
          disabled={isLoading}
          className="w-full py-3 bg-gradient-to-r from-amber-600 to-yellow-500 text-black font-bold rounded-xl disabled:opacity-40"
        >
          <ChevronRight className="w-4 h-4 mr-2" />
          Explorar os Capítulos
        </Button>
      </div>
    </motion.div>
  );
};

export default RPGBookIntro;