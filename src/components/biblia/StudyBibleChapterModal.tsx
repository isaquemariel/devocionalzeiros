import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Loader2, 
  CheckCircle2, 
  BookMarked, 
  Heart,
  Highlighter,
  X,
  Feather,
  ExternalLink,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { fetchChapterVerses, BOOK_ID_MAP } from "@/lib/bibleService";
import { useStudyBible } from "@/hooks/useStudyBible";
import { useVerseFavorites, HIGHLIGHT_COLORS } from "@/hooks/useVerseFavorites";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Parse a Bible reference like "João 3:16" or "Gênesis 1:1-3" and find the bookId
const parseReference = (ref: string): { bookId: string; bookName: string; chapter: number; verseStart: number; verseEnd: number } | null => {
  // Match patterns like "João 3:16", "1 João 2:3", "Gênesis 1:1-3"
  const match = ref.match(/^(.+?)\s+(\d+):(\d+)(?:-(\d+))?$/);
  if (!match) return null;
  
  const [_, rawBookName, chapterStr, verseStartStr, verseEndStr] = match;
  const normalizedName = rawBookName.trim().toLowerCase();
  const verseStart = parseInt(verseStartStr, 10);
  const verseEnd = verseEndStr ? parseInt(verseEndStr, 10) : verseStart;
  
  // Search in BOOK_ID_MAP by name or aliases
  for (const [bookId, info] of Object.entries(BOOK_ID_MAP)) {
    if (
      info.name.toLowerCase() === normalizedName ||
      info.aliases.some(alias => alias.toLowerCase() === normalizedName)
    ) {
      return {
        bookId,
        bookName: info.name,
        chapter: parseInt(chapterStr, 10),
        verseStart,
        verseEnd,
      };
    }
  }
  
  return null;
};

interface StudyBibleChapterModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookName: string;
  chapter: number;
  userId?: string;
  onMarkComplete?: () => void;
  isCompleted?: boolean;
  canAccessStudyFeatures?: boolean; // Whether user can access verse study (gold+)
}

export const StudyBibleChapterModal: React.FC<StudyBibleChapterModalProps> = ({
  isOpen,
  onClose,
  bookName,
  chapter,
  userId,
  onMarkComplete,
  isCompleted: initialCompleted = false,
  canAccessStudyFeatures = false,
}) => {
  const [verses, setVerses] = useState<{ number: number; text: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVerseIndex, setSelectedVerseIndex] = useState<number | null>(null);
  const [showVerseStudy, setShowVerseStudy] = useState(false);
  const [isCompleted, setIsCompleted] = useState(initialCompleted);
  const [markingAsRead, setMarkingAsRead] = useState(false);
  
  // Cross-reference popup state
  const [referencePopup, setReferencePopup] = useState<{
    bookName: string;
    chapter: number;
    verseStart: number;
    verseEnd: number;
    verses: { number: number; text: string }[];
    loading: boolean;
    error: string | null;
  } | null>(null);

  // Get bookId from bookName
  const getBookIdFromName = (name: string): string | null => {
    const normalizedName = name.toLowerCase();
    for (const [bookId, info] of Object.entries(BOOK_ID_MAP)) {
      if (
        info.name.toLowerCase() === normalizedName ||
        info.aliases.some(alias => alias.toLowerCase() === normalizedName)
      ) {
        return bookId;
      }
    }
    return null;
  };

  const bookId = getBookIdFromName(bookName) || 'genesis';
  
  const {
    currentStudy,
    studyLoading,
    studyError,
    fetchVerseStudy,
    retryVerseStudy,
    clearStudy,
  } = useStudyBible();

  const {
    isFavorite,
    getHighlightColor,
    toggleFavorite,
    setHighlight,
  } = useVerseFavorites(userId);

  // Fetch chapter verses
  useEffect(() => {
    if (!isOpen || !bookName) return;
    
    const loadChapter = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const fetchedVerses = await fetchChapterVerses(bookId, chapter);
        if (fetchedVerses && fetchedVerses.length > 0) {
          setVerses(fetchedVerses);
        } else {
          setError('Não foi possível carregar o capítulo.');
        }
      } catch (err) {
        console.error('Error loading chapter:', err);
        setError('Erro ao carregar capítulo.');
      } finally {
        setLoading(false);
      }
    };

    loadChapter();
    setIsCompleted(initialCompleted);
  }, [isOpen, bookName, chapter, bookId, initialCompleted]);

  // Handle verse click - only show study if user has access
  const handleVerseClick = (index: number) => {
    if (!canAccessStudyFeatures) {
      toast.info("O estudo de versículos e devocional está disponível a partir do plano Gold", {
        action: {
          label: "Ver planos",
          onClick: () => window.location.href = "/#planos"
        }
      });
      return;
    }
    setSelectedVerseIndex(index);
    setShowVerseStudy(true);
    const verse = verses[index];
    if (verse) {
      fetchVerseStudy(bookId, chapter, verse.number, verse.text);
    }
  };

  // Handle mark as complete
  const handleMarkComplete = async () => {
    if (!userId || markingAsRead) return;
    
    setMarkingAsRead(true);
    try {
      // Check if already exists in reading_progress
      const { data: existing } = await supabase
        .from('reading_progress')
        .select('id')
        .eq('user_id', userId)
        .eq('book_name', bookName)
        .eq('chapter_number', chapter)
        .maybeSingle();

      if (!existing) {
        // Only insert if not already in reading_progress
        const { error } = await supabase.from('reading_progress').insert({
          user_id: userId,
          book_name: bookName,
          chapter_number: chapter,
          reading_time_minutes: 0,
        });

        if (error) throw error;
      }

      setIsCompleted(true);
      toast.success(`+1 ponto! ${bookName} ${chapter} marcado como lido`);
      
      // Call the parent callback to sync with reading plan
      onMarkComplete?.();
    } catch (err) {
      console.error('Erro ao marcar como lido:', err);
      toast.error('Erro ao marcar capítulo como lido');
    } finally {
      setMarkingAsRead(false);
    }
  };

  const getHighlightClass = (color: string | null): string => {
    if (!color) return '';
    const colorConfig = HIGHLIGHT_COLORS.find(c => c.id === color);
    return colorConfig?.class || '';
  };

  // Handle cross-reference click
  const handleReferenceClick = async (ref: string) => {
    const parsed = parseReference(ref);
    if (!parsed) {
      toast.error('Referência inválida');
      return;
    }
    
    setReferencePopup({
      bookName: parsed.bookName,
      chapter: parsed.chapter,
      verseStart: parsed.verseStart,
      verseEnd: parsed.verseEnd,
      verses: [],
      loading: true,
      error: null,
    });

    try {
      const fetchedVerses = await fetchChapterVerses(parsed.bookId, parsed.chapter);
      if (fetchedVerses && fetchedVerses.length > 0) {
        // Filter only the verses in the range
        const targetVerses = fetchedVerses.filter(
          v => v.number >= parsed.verseStart && v.number <= parsed.verseEnd
        );
        if (targetVerses.length > 0) {
          setReferencePopup(prev => prev ? {
            ...prev,
            verses: targetVerses,
            loading: false,
          } : null);
        } else {
          setReferencePopup(prev => prev ? {
            ...prev,
            loading: false,
            error: `Versículo(s) ${parsed.verseStart}${parsed.verseEnd > parsed.verseStart ? `-${parsed.verseEnd}` : ''} não encontrado(s).`,
          } : null);
        }
      } else {
        setReferencePopup(prev => prev ? {
          ...prev,
          loading: false,
          error: 'Não foi possível carregar a referência.',
        } : null);
      }
    } catch (err) {
      console.error('Error loading reference:', err);
      setReferencePopup(prev => prev ? {
        ...prev,
        loading: false,
        error: 'Erro ao carregar referência.',
      } : null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="bg-gradient-to-b from-amber-950/95 to-black/95 border-amber-500/30 max-w-2xl h-[90dvh] p-0 flex flex-col [&>button]:hidden">
        <DialogHeader className="shrink-0 p-4 border-b border-amber-500/20">
          <DialogTitle className="text-amber-400 flex items-center gap-2">
            <BookMarked className="w-5 h-5" />
            <span>{bookName} {chapter}</span>
            {isCompleted && (
              <span className="ml-2 text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
                Lido
              </span>
            )}
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="flex-1 min-h-0">
          <div className="p-4">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
              </div>
            ) : error ? (
              <div className="text-center py-12 text-amber-400">
                {error}
              </div>
            ) : (
              <AnimatePresence mode="wait">
                {showVerseStudy && selectedVerseIndex !== null ? (
                  <motion.div
                    key="study"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => { setShowVerseStudy(false); clearStudy(); }}
                      className="mb-4 text-white/60 hover:text-white"
                    >
                      ← Voltar para o capítulo
                    </Button>

                    {studyLoading ? (
                      <div className="flex items-center justify-center py-12">
                        <Loader2 className="w-6 h-6 animate-spin text-amber-500" />
                        <span className="ml-2 text-white/50">Gerando estudo...</span>
                      </div>
                    ) : currentStudy ? (
                      <div className="space-y-4">
                        {/* Actions */}
                        <div className="flex items-center gap-2 pb-3 border-b border-white/10">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              const verse = verses[selectedVerseIndex];
                              if (verse) {
                                toggleFavorite(bookId, chapter, verse.number, verse.text);
                              }
                            }}
                            className={`flex items-center gap-2 ${
                              isFavorite(bookId, chapter, verses[selectedVerseIndex]?.number || 0)
                                ? 'text-red-400'
                                : 'text-white/60 hover:text-red-400'
                            }`}
                          >
                            <Heart className={`w-4 h-4 ${
                              isFavorite(bookId, chapter, verses[selectedVerseIndex]?.number || 0)
                                ? 'fill-current'
                                : ''
                            }`} />
                            Favoritar
                          </Button>
                          
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="ghost" size="sm" className="flex items-center gap-2 text-white/60 hover:text-amber-400">
                                <Highlighter className="w-4 h-4" />
                                Grifar
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="bg-black/95 border-amber-500/30 w-48 p-2">
                              <div className="space-y-2">
                                <p className="text-xs text-white/50 mb-2">Escolha uma cor:</p>
                                <div className="flex flex-wrap gap-2">
                                  {HIGHLIGHT_COLORS.map((color) => (
                                    <button
                                      key={color.id}
                                      onClick={() => {
                                        const verse = verses[selectedVerseIndex];
                                        if (verse) {
                                          setHighlight(bookId, chapter, verse.number, color.id);
                                        }
                                      }}
                                      className={`w-8 h-8 rounded-full ${color.class} border-2 border-white/20 hover:border-white/50 transition-colors`}
                                      title={color.name}
                                    />
                                  ))}
                                  <button
                                    onClick={() => {
                                      const verse = verses[selectedVerseIndex];
                                      if (verse) {
                                        setHighlight(bookId, chapter, verse.number, null);
                                      }
                                    }}
                                    className="w-8 h-8 rounded-full bg-white/10 border-2 border-white/20 hover:border-white/50 transition-colors flex items-center justify-center"
                                    title="Remover grifo"
                                  >
                                    <X className="w-4 h-4 text-white/60" />
                                  </button>
                                </div>
                              </div>
                            </PopoverContent>
                          </Popover>
                        </div>

                        {/* Verse Text */}
                        <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
                          <p className="font-serif text-white/90 italic">
                            "{verses[selectedVerseIndex]?.text}"
                          </p>
                          <p className="text-xs text-amber-400 mt-2">
                            — {bookName} {chapter}:{verses[selectedVerseIndex]?.number}
                          </p>
                        </div>

                        {/* Commentary */}
                        <div>
                          <h4 className="text-sm font-bold text-amber-400 mb-2">Comentário</h4>
                          <p className="text-white/80 text-sm leading-relaxed whitespace-pre-wrap">
                            {currentStudy.commentary}
                          </p>
                          {/* Retry button when there was an error */}
                          {studyError && (
                            <Button
                              onClick={retryVerseStudy}
                              disabled={studyLoading}
                              className="mt-4 bg-amber-500 hover:bg-amber-600 text-black"
                              size="sm"
                            >
                              {studyLoading ? (
                                <>
                                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                  Carregando...
                                </>
                              ) : (
                                'Tentar novamente'
                              )}
                            </Button>
                          )}
                        </div>

                        {/* Key Words */}
                        {currentStudy.keyWords && currentStudy.keyWords.length > 0 && (
                          <div>
                            <h4 className="text-sm font-bold text-amber-400 mb-2">Palavras-Chave</h4>
                            <div className="space-y-2">
                              {currentStudy.keyWords.map((kw, i) => (
                                <div key={i} className="bg-white/5 p-3 rounded-lg">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="text-amber-400 font-bold">{kw.word}</span>
                                    <span className="text-xs text-white/40">({kw.language === 'hebrew' ? 'Hebraico' : 'Grego'})</span>
                                  </div>
                                  <p className="text-xs text-white/60">
                                    <strong>{kw.original}</strong> ({kw.transliteration}) — {kw.meaning}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Cross References */}
                        {currentStudy.crossReferences && currentStudy.crossReferences.length > 0 && (
                          <div>
                            <h4 className="text-sm font-bold text-amber-400 mb-2">Referências</h4>
                            <div className="flex flex-wrap gap-2">
                              {currentStudy.crossReferences.map((ref, i) => (
                                <button
                                  key={i}
                                  onClick={() => handleReferenceClick(ref)}
                                  className="text-xs bg-amber-500/20 px-3 py-1.5 rounded-full text-amber-300 hover:bg-amber-500/30 hover:text-amber-200 transition-colors cursor-pointer flex items-center gap-1"
                                >
                                  {ref}
                                  <ExternalLink className="w-3 h-3" />
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Source */}
                        {currentStudy.source && (
                          <p className="text-xs text-white/40 pt-2 border-t border-white/10">
                            Fonte: {currentStudy.source}
                          </p>
                        )}
                      </div>
                    ) : null}
                  </motion.div>
                ) : (
                  <motion.div
                    key="verses"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-3 font-serif text-base leading-relaxed"
                  >
                    <p className="text-xs text-white/40 text-center mb-4">
                      {canAccessStudyFeatures 
                        ? "Toque em um versículo para ver o estudo"
                        : "Leia o capítulo e marque como lido abaixo"}
                    </p>
                    
                    {verses.map((verse, index) => {
                      const highlightColor = getHighlightColor(bookId, chapter, verse.number);
                      const isFav = isFavorite(bookId, chapter, verse.number);
                      
                      return (
                        <motion.div
                          key={verse.number}
                          className={`relative cursor-pointer p-2 rounded-lg transition-all duration-300 ${
                            highlightColor ? getHighlightClass(highlightColor) : 'hover:bg-amber-500/10'
                          }`}
                          onClick={() => handleVerseClick(index)}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.01 }}
                        >
                          <span className="text-amber-500 font-bold text-sm mr-2 align-super">
                            {verse.number}
                          </span>
                          <span className="text-white/90">{verse.text}</span>
                          
                          {isFav && (
                            <Heart className="inline-block w-3 h-3 ml-1 text-red-400 fill-current align-super" />
                          )}
                        </motion.div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        </ScrollArea>

        {/* Footer with Mark as Read */}
        <div className="p-4 border-t border-amber-500/20 bg-black/50">
          <Button
            onClick={handleMarkComplete}
            disabled={markingAsRead || isCompleted}
            className={`w-full ${
              isCompleted
                ? 'bg-green-600/20 text-green-400 border border-green-500/30'
                : 'bg-amber-600 hover:bg-amber-700 text-white'
            }`}
          >
            {markingAsRead ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <CheckCircle2 className={`w-4 h-4 mr-2 ${isCompleted ? 'fill-current' : ''}`} />
            )}
            {isCompleted ? 'Capítulo Lido (+1 ponto)' : 'Marcar como Lido (+1 ponto)'}
          </Button>
        </div>
      </DialogContent>

      {/* Reference Popup Modal */}
      <Dialog open={!!referencePopup} onOpenChange={(open) => { if (!open) setReferencePopup(null); }}>
        <DialogContent className="bg-gradient-to-b from-amber-950/95 to-black/95 border-amber-500/30 max-w-lg max-h-[70dvh] p-0 overflow-hidden flex flex-col [&>button]:hidden">
          <DialogHeader className="p-4 border-b border-amber-500/20">
            <DialogTitle className="text-amber-400 flex items-center gap-2">
              <BookMarked className="w-5 h-5" />
              <span>
                {referencePopup?.bookName} {referencePopup?.chapter}:
                {referencePopup?.verseStart}
                {referencePopup && referencePopup.verseEnd > referencePopup.verseStart && `-${referencePopup.verseEnd}`}
              </span>
            </DialogTitle>
          </DialogHeader>
          
          <ScrollArea className="flex-1 max-h-[calc(70vh-120px)]">
            <div className="p-4">
              {referencePopup?.loading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-amber-500" />
                </div>
              ) : referencePopup?.error ? (
                <div className="text-center py-8 text-amber-400">
                  {referencePopup.error}
                </div>
              ) : referencePopup?.verses && referencePopup.verses.length > 0 ? (
                <div className="space-y-2 font-serif">
                  {referencePopup.verses.map((verse) => (
                    <div
                      key={verse.number}
                      className="bg-amber-500/10 p-3 rounded-lg border border-amber-500/20"
                    >
                      <span className="text-amber-500 font-bold text-sm mr-2 align-super">
                        {verse.number}
                      </span>
                      <span className="text-white/90">
                        {verse.text}
                      </span>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </ScrollArea>

          <div className="p-4 border-t border-amber-500/20 bg-black/50">
            <Button
              onClick={() => setReferencePopup(null)}
              variant="outline"
              className="w-full border-amber-500/30 text-amber-400 hover:bg-amber-500/10"
            >
              Fechar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Dialog>
  );
};
