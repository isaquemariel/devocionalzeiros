import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Loader2, AlertTriangle, X, ChevronLeft, Sparkles, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { getBookById } from "@/lib/studyBibleData";
import { useUsageLimits, FeatureKey } from "@/hooks/useUsageLimits";
import { useUserPlan } from "@/hooks/useUserPlan";
import { useAuth } from "@/hooks/useAuth";
import { UsageLimitModal } from "@/components/shared/UsageLimitModal";
import { BIBLE_TRANSLATIONS, BibleTranslation } from "@/lib/bibleService";

interface Verse {
  number: number;
  text: string;
}

interface VerseStudyData {
  commentary: string;
  keyWords: { word: string; original?: string; meaning?: string }[];
  crossReferences: string[];
  source: string;
}

interface RPGReadingPhaseProps {
  bookName: string;
  bookId: string;
  chapter: number;
  verses: Verse[];
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
  userId: string;
  reviewMode?: boolean;
  isAdmin?: boolean;
  translation?: BibleTranslation;
  onTranslationChange?: (t: BibleTranslation) => void;
}

const RPGReadingPhase = ({
  bookName,
  bookId,
  chapter,
  verses,
  isLoading,
  error,
  onRetry,
  userId,
  reviewMode = false,
  isAdmin = false,
  translation,
  onTranslationChange,
}: RPGReadingPhaseProps) => {
  const { user } = useAuth();
  const { planType } = useUserPlan(user?.email || undefined);
  const { checkLimit, incrementUsage } = useUsageLimits(userId, planType);

  const [selectedVerse, setSelectedVerse] = useState<number | null>(null);
  const [verseStudy, setVerseStudy] = useState<VerseStudyData | null>(null);
  const [studyLoading, setStudyLoading] = useState(false);
  const [usageLimitModal, setUsageLimitModal] = useState<{ isOpen: boolean; featureName: string; currentUsage: number; limit: number; isBlocked: boolean } | null>(null);

  const handleVerseClick = useCallback(async (verse: Verse) => {
    if (selectedVerse === verse.number) {
      setSelectedVerse(null);
      setVerseStudy(null);
      return;
    }

    // Check usage limit for verse explanation (skip for admin/review)
    if (!isAdmin && !reviewMode) {
      const limit = checkLimit("rpg_verse_explanation");
      if (!limit.canUse) {
        setUsageLimitModal({
          isOpen: true,
          featureName: "Explicação de Versículo (RPG)",
          currentUsage: limit.currentUsage,
          limit: limit.limit,
          isBlocked: limit.isBlocked,
        });
        return;
      }
      await incrementUsage("rpg_verse_explanation");
    }

    setSelectedVerse(verse.number);
    setVerseStudy(null);
    setStudyLoading(true);

    try {
      const book = getBookById(bookId);
      const { data, error: fnError } = await supabase.functions.invoke('verse-study', {
        body: {
          bookId,
          bookName: book?.name || bookName,
          chapter,
          verseNumber: verse.number,
          verseText: verse.text,
          testament: book?.testament || 'old',
        },
      });

      if (fnError) throw fnError;
      if (data?.commentary) {
        setVerseStudy(data as VerseStudyData);
      }
    } catch (err) {
      console.error("Error fetching verse study:", err);
      setVerseStudy({
        commentary: "Não foi possível carregar a explicação. Tente novamente.",
        keyWords: [],
        crossReferences: [],
        source: "Erro",
      });
    } finally {
      setStudyLoading(false);
    }
  }, [selectedVerse, bookId, bookName, chapter, isAdmin, reviewMode, checkLimit, incrementUsage]);

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-12 gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-amber-400" />
        <p className="text-white/50 text-sm">Carregando capítulo...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-12 gap-4">
        <AlertTriangle className="w-8 h-8 text-red-400" />
        <p className="text-red-400 text-sm">{error}</p>
        <Button onClick={onRetry} variant="outline" size="sm" className="border-white/20 text-white">
          Tentar novamente
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-0.5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-amber-400">{bookName} {chapter}</h2>
            <div className="flex items-center gap-1.5 text-[10px] text-white/30 bg-white/5 px-2 py-1 rounded-full">
              <Sparkles className="w-3 h-3" />
              Toque no versículo para estudar
            </div>
          </div>

          {verses.map((v) => (
            <div key={v.number}>
              <button
                onClick={() => handleVerseClick(v)}
                className={`w-full text-left text-sm leading-relaxed py-1 px-1 rounded transition-all ${
                  selectedVerse === v.number
                    ? "bg-amber-500/10 border-l-2 border-amber-400"
                    : "hover:bg-white/5"
                }`}
              >
                <span className="text-amber-500/60 text-xs font-bold mr-1.5">{v.number}</span>
                <span className="text-white/75">{v.text}</span>
              </button>

              {/* Verse Study Inline Panel */}
              <AnimatePresence>
                {selectedVerse === v.number && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="ml-2 my-2 p-3 rounded-xl bg-gradient-to-br from-amber-500/10 to-blue-500/5 border border-amber-500/20">
                      {studyLoading ? (
                        <div className="flex items-center gap-2 py-2">
                          <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                          <span className="text-xs text-white/50">Carregando explicação...</span>
                        </div>
                      ) : verseStudy ? (
                        <div className="space-y-3">
                          {/* Commentary */}
                          <div>
                            <p className="text-[10px] font-bold text-amber-400 uppercase mb-1">📖 Comentário</p>
                            <p className="text-xs text-white/70 leading-relaxed">{verseStudy.commentary}</p>
                          </div>

                          {/* Key Words */}
                          {verseStudy.keyWords && verseStudy.keyWords.length > 0 && (
                            <div>
                              <p className="text-[10px] font-bold text-blue-400 uppercase mb-1">🔤 Palavras-chave</p>
                              <div className="flex flex-wrap gap-1.5">
                                {verseStudy.keyWords.map((kw, i) => (
                                  <span key={i} className="text-[10px] bg-blue-500/15 text-blue-300 px-2 py-0.5 rounded-full border border-blue-500/20">
                                    {typeof kw === 'string' ? kw : kw.word}
                                    {typeof kw !== 'string' && kw.original && <span className="text-blue-400/60 ml-1">({kw.original})</span>}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Cross References */}
                          {verseStudy.crossReferences && verseStudy.crossReferences.length > 0 && (
                            <div>
                              <p className="text-[10px] font-bold text-green-400 uppercase mb-1">🔗 Referências Cruzadas</p>
                              <div className="flex flex-wrap gap-1.5">
                                {verseStudy.crossReferences.map((ref, i) => (
                                  <span key={i} className="text-[10px] bg-green-500/15 text-green-300 px-2 py-0.5 rounded-full border border-green-500/20">
                                    {ref}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Source */}
                          {verseStudy.source && (
                            <p className="text-[9px] text-white/30 italic">Fonte: {verseStudy.source}</p>
                          )}

                          <button
                            onClick={() => { setSelectedVerse(null); setVerseStudy(null); }}
                            className="text-[10px] text-amber-400/60 hover:text-amber-400 transition-colors"
                          >
                            ✕ Fechar explicação
                          </button>
                        </div>
                      ) : null}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

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

export default RPGReadingPhase;
