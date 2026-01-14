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

interface StudyBibleChapterModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookName: string;
  chapter: number;
  userId?: string;
  onMarkComplete?: () => void;
  isCompleted?: boolean;
}

export const StudyBibleChapterModal: React.FC<StudyBibleChapterModalProps> = ({
  isOpen,
  onClose,
  bookName,
  chapter,
  userId,
  onMarkComplete,
  isCompleted: initialCompleted = false,
}) => {
  const [verses, setVerses] = useState<{ number: number; text: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVerseIndex, setSelectedVerseIndex] = useState<number | null>(null);
  const [showVerseStudy, setShowVerseStudy] = useState(false);
  const [isCompleted, setIsCompleted] = useState(initialCompleted);
  const [markingAsRead, setMarkingAsRead] = useState(false);

  // Get bookId from bookName
  const getBookIdFromName = (name: string): string | null => {
    const entry = Object.entries(BOOK_ID_MAP).find(([_, info]) => 
      info.name.toLowerCase() === name.toLowerCase()
    );
    return entry ? entry[0] : null;
  };

  const bookId = getBookIdFromName(bookName) || 'genesis';
  
  const {
    currentStudy,
    studyLoading,
    fetchVerseStudy,
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

  // Handle verse click
  const handleVerseClick = (index: number) => {
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
      // Check if already exists
      const { data: existing } = await supabase
        .from('reading_progress')
        .select('id')
        .eq('user_id', userId)
        .eq('book_name', bookName)
        .eq('chapter_number', chapter)
        .maybeSingle();

      if (existing) {
        toast.info('Capítulo já foi marcado como lido!');
        setIsCompleted(true);
        return;
      }

      const { error } = await supabase.from('reading_progress').insert({
        user_id: userId,
        book_name: bookName,
        chapter_number: chapter,
        reading_time_minutes: 0,
      });

      if (error) throw error;

      setIsCompleted(true);
      toast.success(`+1 ponto! ${bookName} ${chapter} marcado como lido`);
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

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-amber-950/95 to-black/95 border-amber-500/30 w-[95vw] max-w-2xl max-h-[90vh] p-0 overflow-hidden">
        <DialogHeader className="p-4 border-b border-amber-500/20">
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
        
        <ScrollArea className="flex-1 h-[calc(90vh-180px)]">
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
                                <span
                                  key={i}
                                  className="text-xs bg-amber-500/20 px-3 py-1.5 rounded-full text-amber-300"
                                >
                                  {ref}
                                </span>
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
                      Toque em um versículo para ver o estudo
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
    </Dialog>
  );
};
