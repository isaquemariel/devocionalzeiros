import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, AlertTriangle, Sparkles, Heart, Highlighter, Link2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { getBookById } from "@/lib/studyBibleData";
import { useUsageLimits } from "@/hooks/useUsageLimits";
import { useUserPlan } from "@/hooks/useUserPlan";
import { useAuth } from "@/hooks/useAuth";
import { useVerseFavorites } from "@/hooks/useVerseFavorites";
import { UsageLimitModal } from "@/components/shared/UsageLimitModal";
import { BibleTranslation } from "@/lib/bibleService";

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

const DEFAULT_HIGHLIGHT = "yellow";

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
}: RPGReadingPhaseProps) => {
  const { user } = useAuth();
  const { planType } = useUserPlan(user?.email || undefined);
  const { checkLimit, incrementUsage } = useUsageLimits(userId, planType);

  // Favoritos e grifos compartilhados com a Bíblia de Estudo (mesma tabela, mesmo bookId)
  const { isFavorite, getHighlightColor, toggleFavorite, setHighlight } = useVerseFavorites(userId);

  const [selectedVerse, setSelectedVerse] = useState<number | null>(null);
  const [verseStudy, setVerseStudy] = useState<VerseStudyData | null>(null);
  const [studyLoading, setStudyLoading] = useState(false);
  const [usageLimitModal, setUsageLimitModal] = useState<{ isOpen: boolean; featureName: string; currentUsage: number; limit: number; isBlocked: boolean } | null>(null);

  const handleToggleFavorite = useCallback(async (verse: Verse, e: React.MouseEvent) => {
    e.stopPropagation();
    await toggleFavorite(bookId, chapter, verse.number, verse.text);
  }, [bookId, chapter, toggleFavorite]);

  const handleToggleHighlight = useCallback(async (verse: Verse, e: React.MouseEvent) => {
    e.stopPropagation();
    const current = getHighlightColor(bookId, chapter, verse.number);
    await setHighlight(bookId, chapter, verse.number, current ? null : DEFAULT_HIGHLIGHT);
  }, [bookId, chapter, getHighlightColor, setHighlight]);

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
      // Usa a MESMA edge function `verse-study` da Bíblia de Estudo.
      // O cache (`verse_studies_cache`) é compartilhado pelo bookId — economiza tokens e garante coerência.
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
          <div className="flex items-center justify-between mb-3 gap-2 flex-wrap">
            <h2 className="text-lg font-bold text-amber-400">{bookName} {chapter}</h2>
            <div className="flex items-center gap-1.5 text-[10px] text-white/30 bg-white/5 px-2 py-1 rounded-full">
              <Sparkles className="w-3 h-3" />
              Toque para estudar
            </div>
          </div>

          {/* Aviso de sincronização com a Bíblia de Estudo */}
          <div className="flex items-center gap-1.5 mb-2 flex-wrap">
            {translation && (
              <span className="text-[10px] text-white/30 bg-white/5 px-2 py-1 rounded-full border border-white/10">
                Versão: <span className="text-amber-300/80 font-bold">{translation}</span>
              </span>
            )}
            <span className="text-[10px] text-emerald-300/70 bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-500/20 inline-flex items-center gap-1">
              <Link2 className="w-2.5 h-2.5" />
              Sincronizado com a Bíblia de Estudo
            </span>
          </div>

          {verses.map((v) => {
            const fav = isFavorite(bookId, chapter, v.number);
            const highlighted = !!getHighlightColor(bookId, chapter, v.number);
            const isOpen = selectedVerse === v.number;

            return (
              <div key={v.number}>
                <div
                  className={`group relative rounded transition-all ${
                    isOpen ? "bg-amber-500/10 border-l-2 border-amber-400" : "hover:bg-white/5"
                  } ${highlighted ? "bg-yellow-400/10" : ""}`}
                >
                  <button
                    onClick={() => handleVerseClick(v)}
                    className="w-full text-left text-sm leading-relaxed py-1 pl-1 pr-16 rounded"
                  >
                    <span className="text-amber-500/60 text-xs font-bold mr-1.5">{v.number}</span>
                    <span className={`${highlighted ? "text-yellow-200" : "text-white/75"}`}>{v.text}</span>
                  </button>

                  {/* Ações inline (favoritar / grifar) — compartilhadas com a Bíblia de Estudo */}
                  <div className="absolute top-1 right-1 flex items-center gap-0.5 opacity-60 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => handleToggleHighlight(v, e)}
                      title={highlighted ? "Remover grifo" : "Grifar"}
                      className={`p-1.5 rounded-md transition-colors ${
                        highlighted ? "text-yellow-300 bg-yellow-400/10" : "text-white/40 hover:text-yellow-300 hover:bg-white/5"
                      }`}
                    >
                      <Highlighter className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => handleToggleFavorite(v, e)}
                      title={fav ? "Remover dos favoritos" : "Favoritar"}
                      className={`p-1.5 rounded-md transition-colors ${
                        fav ? "text-red-400 bg-red-500/10" : "text-white/40 hover:text-red-300 hover:bg-white/5"
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${fav ? "fill-current" : ""}`} />
                    </button>
                  </div>
                </div>

                {/* Verse Study Inline Panel */}
                <AnimatePresence>
                  {isOpen && (
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
                            <div>
                              <p className="text-[10px] font-bold text-amber-400 uppercase mb-1">📖 Comentário</p>
                              <p className="text-xs text-white/70 leading-relaxed">{verseStudy.commentary}</p>
                            </div>

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
            );
          })}
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
