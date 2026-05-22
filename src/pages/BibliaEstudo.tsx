import { useState, useEffect, useCallback } from "react";
import { BottomNavBar } from "@/components/shared/BottomNavBar";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Loader2,
  BookMarked,
  WifiOff,
  Search,
  X,
  MapPin,
  Heart,
  Highlighter,
  Star,
  CheckCircle2,
  Feather,
  Brain } from
"lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { useUserPlan } from "@/hooks/useUserPlan";
import { useUsageLimits } from "@/hooks/useUsageLimits";
import { UsageLimitModal } from "@/components/shared/UsageLimitModal";
import { useStudyBible } from "@/hooks/useStudyBible";
import { useVerseFavorites, HIGHLIGHT_COLORS } from "@/hooks/useVerseFavorites";
import { AppHeader } from "@/components/shared/AppHeader";
import { VerseOptionsPopover } from "@/components/biblia/VerseOptionsPopover";
import { LockedFeatureModal } from "@/components/shared/LockedFeatureModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue } from
"@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle } from
"@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger } from
"@/components/ui/popover";

import { supabase } from "@/integrations/supabase/client";
import {
  STUDY_BIBLE_BOOKS,
  getOldTestamentBooks,
  getNewTestamentBooks,
  getBookById } from
"@/lib/studyBibleData";
import { isOffline, searchBible, SearchResult, getCacheStats, fetchChapterVerses, BOOK_ID_MAP, parseReference, findBookIdByName, getBibleTranslation, setBibleTranslation, BibleTranslation, BIBLE_TRANSLATIONS, clearBibleCache } from "@/lib/bibleService";

// Search is now triggered manually (Enter key or button click)

const BibliaEstudo = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { planType, loading: planLoading } = useUserPlan(user?.email || undefined);
  const { checkLimit, incrementUsage } = useUsageLimits(user?.id, planType);
  const [usageLimitModal, setUsageLimitModal] = useState<{isOpen: boolean;featureName: string;currentUsage: number;limit: number;isBlocked: boolean;} | null>(null);

  const [selectedBookId, setSelectedBookId] = useState<string>(() => {
    return sessionStorage.getItem('studyBible_bookId') || 'genesis';
  });
  const [selectedChapter, setSelectedChapter] = useState(() => {
    return parseInt(sessionStorage.getItem('studyBible_chapter') || '1', 10);
  });
  const [selectedVerse, setSelectedVerse] = useState<number | null>(null);
  const [bookSelectorOpen, setBookSelectorOpen] = useState(false);
  const [studyModalOpen, setStudyModalOpen] = useState(false);
  const [selectedVerseIndex, setSelectedVerseIndex] = useState<number | null>(null);
  const [offline, setOffline] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [chapterMarkedAsRead, setChapterMarkedAsRead] = useState(false);
  const [markingAsRead, setMarkingAsRead] = useState(false);
  const [lockedModalOpen, setLockedModalOpen] = useState(false);

  // Translation state — persisted in localStorage
  const [selectedTranslation, setSelectedTranslation] = useState<BibleTranslation>(() => getBibleTranslation());

  // Reference popup states
  const [referenceModalOpen, setReferenceModalOpen] = useState(false);
  const [referenceData, setReferenceData] = useState<{
    reference: string;
    bookId: string;
    chapter: number;
    verseStart: number;
    verseEnd: number;
    verses: {number: number;text: string;}[];
    loading: boolean;
    error: string | null;
  } | null>(null);

  // Search states
  const [searchMode, setSearchMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searching, setSearching] = useState(false);

  const [submittedSearch, setSubmittedSearch] = useState('');

  const {
    loading,
    error,
    verses,
    currentStudy,
    studyLoading,
    fetchChapter,
    fetchVerseStudy,
    clearStudy
  } = useStudyBible();

  const {
    favorites,
    isFavorite,
    getHighlightColor,
    toggleFavorite,
    setHighlight,
    loading: favoritesLoading
  } = useVerseFavorites(user?.id);

  const selectedBook = getBookById(selectedBookId);

  // Persist reading position in sessionStorage
  useEffect(() => {
    sessionStorage.setItem('studyBible_bookId', selectedBookId);
    sessionStorage.setItem('studyBible_chapter', String(selectedChapter));
  }, [selectedBookId, selectedChapter]);

  // Check online status
  useEffect(() => {
    const handleOnline = () => setOffline(false);
    const handleOffline = () => setOffline(true);

    setOffline(isOffline());

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Redirect if no access
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  // Study Bible is now available to all plans (with usage limits)
  // No plan-based redirect needed

  // All users can access verse study, but with daily limits enforced by useUsageLimits
  const canAccessVerseStudy = true;

  // Fetch chapter when selection or translation changes
  useEffect(() => {
    if (selectedBookId && selectedChapter) {
      fetchChapter(selectedBookId, selectedChapter, selectedTranslation);
      setChapterMarkedAsRead(false);
      if (user?.id) {
        checkIfChapterRead();
      }
    }
  }, [selectedBookId, selectedChapter, selectedTranslation, fetchChapter, user?.id]);

  // Handle translation change: save pref, clear verses, reload
  const handleTranslationChange = useCallback((tr: BibleTranslation) => {
    setBibleTranslation(tr);
    setSelectedTranslation(tr);
  }, []);

  // Check if chapter is already read
  const checkIfChapterRead = useCallback(async () => {
    if (!user?.id) return;
    const bookInfo = BOOK_ID_MAP[selectedBookId];
    if (!bookInfo) return;

    const { data } = await supabase.
    from('reading_progress').
    select('id').
    eq('user_id', user.id).
    eq('book_name', bookInfo.name).
    eq('chapter_number', selectedChapter).
    maybeSingle();

    setChapterMarkedAsRead(!!data);
  }, [user?.id, selectedBookId, selectedChapter]);

  // Mark chapter as read
  const handleMarkAsRead = async () => {
    if (!user?.id || markingAsRead) return;

    const bookInfo = BOOK_ID_MAP[selectedBookId];
    if (!bookInfo) return;

    setMarkingAsRead(true);
    try {
      // Check if already exists
      const { data: existing } = await supabase.
      from('reading_progress').
      select('id').
      eq('user_id', user.id).
      eq('book_name', bookInfo.name).
      eq('chapter_number', selectedChapter).
      maybeSingle();

      if (existing) {
        toast.info('Capítulo já foi marcado como lido!');
        setChapterMarkedAsRead(true);
        return;
      }

      const { error } = await supabase.from('reading_progress').insert({
        user_id: user.id,
        book_name: bookInfo.name,
        chapter_number: selectedChapter,
        reading_time_minutes: 0
      });

      if (error) throw error;

      toast.success(`+1 ponto! ${bookInfo.name} ${selectedChapter} marcado como lido`);
      setChapterMarkedAsRead(true);
    } catch (error) {
      console.error('Erro ao marcar como lido:', error);
      toast.error('Erro ao marcar capítulo como lido');
    } finally {
      setMarkingAsRead(false);
    }
  };

  // Handle reference click
  const handleReferenceClick = async (reference: string) => {
    // Usar o parser robusto de referências
    const parsed = parseReference(reference);

    if (!parsed) {
      toast.error(`Referência "${reference}" não reconhecida`);
      return;
    }

    const { bookId, chapter, verseStart, verseEnd } = parsed;
    const bookInfo = BOOK_ID_MAP[bookId];

    if (!bookInfo) {
      toast.error(`Livro não encontrado: ${reference}`);
      return;
    }

    setReferenceData({
      reference,
      bookId,
      chapter,
      verseStart,
      verseEnd,
      verses: [],
      loading: true,
      error: null
    });
    setReferenceModalOpen(true);

    // Fetch the verses
    try {
      const fetchedVerses = await fetchChapterVerses(bookId, chapter);
      // Filter verses in the range
      const targetVerses = fetchedVerses.filter(
        (v) => v.number >= verseStart && v.number <= verseEnd
      );

      if (targetVerses.length > 0) {
        setReferenceData((prev) => prev ? {
          ...prev,
          verses: targetVerses.map((v) => ({ number: v.number, text: v.text })),
          loading: false
        } : null);
      } else {
        setReferenceData((prev) => prev ? {
          ...prev,
          loading: false,
          error: `Versículo(s) ${verseStart}${verseEnd > verseStart ? `-${verseEnd}` : ''} não encontrado(s).`
        } : null);
      }
    } catch (err) {
      console.error('Erro ao buscar referência:', err);
      setReferenceData((prev) => prev ? {
        ...prev,
        loading: false,
        error: 'Erro ao carregar versículo. Tente novamente.'
      } : null);
    }
  };
  // Scroll to selected verse
  useEffect(() => {
    if (selectedVerse && verses.length > 0) {
      const element = document.getElementById(`verse-${selectedVerse}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.classList.add('bg-amber-500/30');
        setTimeout(() => {
          element.classList.remove('bg-amber-500/30');
        }, 2000);
      }
      setSelectedVerse(null);
    }
  }, [selectedVerse, verses]);

  // Search handler - triggered by Enter key or search button
  const handleSearchSubmit = useCallback(() => {
    const query = searchQuery.trim();
    if (query.length < 2) return;

    setSubmittedSearch(query);

    // Try to parse as a Bible reference first (e.g., "sl 91:3", "salmos 91", "Genesis 2")
    const parsed = parseReference(query);
    if (parsed) {
      setSelectedBookId(parsed.bookId);
      setSelectedChapter(parsed.chapter);
      if (parsed.verseStart > 0) {
        setSelectedVerse(parsed.verseStart);
      }
      setSearchMode(false);
      setSearchQuery('');
      setSearchResults([]);
      setSubmittedSearch('');
      return;
    }

    // Also try parsing as just a book name (e.g., "salmos", "genesis")
    const bookId = findBookIdByName(query);
    if (bookId) {
      setSelectedBookId(bookId);
      setSelectedChapter(1);
      setSearchMode(false);
      setSearchQuery('');
      setSearchResults([]);
      setSubmittedSearch('');
      return;
    }

    // Try parsing as "book chapter verse" with space (e.g., "salmos 91 5", "genesis 2 3")
    const bookChapterVerseMatch = query.match(/^(\d?\s*[^\d]+)\s+(\d+)\s+(\d+)$/i);
    if (bookChapterVerseMatch) {
      const matchedBookId = findBookIdByName(bookChapterVerseMatch[1].trim());
      const chapterNum = parseInt(bookChapterVerseMatch[2]);
      const verseNum = parseInt(bookChapterVerseMatch[3]);
      if (matchedBookId && !isNaN(chapterNum) && chapterNum > 0) {
        const bookInfo = BOOK_ID_MAP[matchedBookId];
        if (bookInfo && chapterNum <= bookInfo.chapters) {
          setSelectedBookId(matchedBookId);
          setSelectedChapter(chapterNum);
          if (verseNum > 0) setSelectedVerse(verseNum);
          setSearchMode(false);
          setSearchQuery('');
          setSearchResults([]);
          setSubmittedSearch('');
          return;
        }
      }
    }

    // Try parsing as "book chapter" without verse (e.g., "salmos 91", "genesis 2")
    const bookChapterMatch = query.match(/^(\d?\s*[^\d]+)\s+(\d+)$/i);
    if (bookChapterMatch) {
      const matchedBookId = findBookIdByName(bookChapterMatch[1].trim());
      const chapterNum = parseInt(bookChapterMatch[2]);
      if (matchedBookId && !isNaN(chapterNum) && chapterNum > 0) {
        const bookInfo = BOOK_ID_MAP[matchedBookId];
        if (bookInfo && chapterNum <= bookInfo.chapters) {
          setSelectedBookId(matchedBookId);
          setSelectedChapter(chapterNum);
          setSearchMode(false);
          setSearchQuery('');
          setSearchResults([]);
          setSubmittedSearch('');
          return;
        }
      }
    }

    // Fall back to word search (min 3 chars)
    if (query.length >= 3) {
      setSearching(true);
      searchBible(query, 100).then((results) => {
        setSearchResults(results);
        setSearching(false);
      });
    }
  }, [searchQuery]);

  const handleVerseStudy = async (verseIndex: number) => {
    const verse = verses[verseIndex];
    if (!verse || !selectedBook) return;

    // Check verse explanation usage limit
    const verseLimit = checkLimit("study_bible_verse_explanation");
    if (!verseLimit.canUse) {
      setUsageLimitModal({
        isOpen: true,
        featureName: "Explicação de Versículo (Estudo)",
        currentUsage: verseLimit.currentUsage,
        limit: verseLimit.limit,
        isBlocked: verseLimit.isBlocked
      });
      return;
    }
    await incrementUsage("study_bible_verse_explanation");

    setSelectedVerseIndex(verseIndex);
    setStudyModalOpen(true);
    fetchVerseStudy(selectedBookId, selectedChapter, verse.number, verse.text);
  };

  const handleShowLockedModal = () => {
    setLockedModalOpen(true);
  };

  const handlePrevChapter = () => {
    if (selectedChapter > 1) {
      setSelectedChapter((prev) => prev - 1);
    }
  };

  const handleNextChapter = () => {
    if (selectedBook && selectedChapter < selectedBook.chapters) {
      setSelectedChapter((prev) => prev + 1);
    }
  };

  const handleBookSelect = (bookId: string) => {
    setSelectedBookId(bookId);
    setSelectedChapter(1);
    setBookSelectorOpen(false);
  };

  const handleSearchResultClick = (result: SearchResult) => {
    setSelectedBookId(result.bookId);
    setSelectedChapter(result.chapter);
    setSelectedVerse(result.verse);
    setSearchMode(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleFavoriteClick = (bookId: string, chapter: number, verse: number) => {
    setSelectedBookId(bookId);
    setSelectedChapter(chapter);
    setSelectedVerse(verse);
    setShowFavorites(false);
  };

  const getHighlightClass = (color: string | null): string => {
    if (!color) return '';
    const colorConfig = HIGHLIGHT_COLORS.find((c) => c.id === color);
    return colorConfig?.class || '';
  };

  if (authLoading || planLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>);

  }

  return (
    <div className="min-h-screen bg-background text-foreground dark:bg-gradient-to-b dark:from-amber-950/20 dark:via-black dark:to-black dark:text-white">
      {/* Background texture */}
      <div className="fixed inset-0 pointer-events-none opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
      }} />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-6 pb-32">
        <AppHeader
          userId={user?.id}
          userEmail={user?.email || undefined}
          showBack={true} />
        

        {/* Title */}
        <motion.div
          className="text-center mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}>
          
          <div className="flex items-center justify-center gap-2 mb-2">
            <BookMarked className="w-6 h-6 text-amber-500" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              Bíblia de Estudo
            </h1>
          </div>
          <p className="text-white/50 text-sm">Devocionalzeiros</p>
          
          {/* Translation Selector */}
          <div className="flex items-center justify-center gap-2 mt-3">
            <Select value={selectedTranslation} onValueChange={(v) => handleTranslationChange(v as BibleTranslation)}>
              <SelectTrigger className="h-7 w-auto px-2 py-0 text-xs bg-amber-500/10 border-amber-500/30 text-amber-300 hover:bg-amber-500/20 focus:ring-amber-500/50 min-w-[100px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-neutral-900 border-amber-500/30">
                {BIBLE_TRANSLATIONS.map((t) =>
                <SelectItem key={t.id} value={t.id} className="text-white focus:bg-amber-500/20 focus:text-amber-300">
                    <span className="font-semibold">{t.id}</span>
                    <span className="text-white/50 ml-1 text-xs">— {t.description}</span>
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
          
          {offline &&
          <div className="flex items-center justify-center gap-2 mt-2 text-amber-400 text-xs">
              <WifiOff className="w-4 h-4" />
              
            </div>
          }
        </motion.div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-2 mb-4 flex-wrap">
          <Button
            variant={searchMode ? "default" : "outline"}
            size="sm"
            onClick={() => {setSearchMode(!searchMode);setShowFavorites(false);}}
            className={searchMode ? "bg-amber-600 hover:bg-amber-700" : "border-amber-500/30 hover:bg-amber-500/10"}>
            
            <Search className="w-4 h-4 mr-2" />
            Pesquisar
          </Button>
          
          <Button
            variant={showFavorites ? "default" : "outline"}
            size="sm"
            onClick={() => {setShowFavorites(!showFavorites);setSearchMode(false);}}
            className={showFavorites ? "bg-amber-600 hover:bg-amber-700" : "border-amber-500/30 hover:bg-amber-500/10"}>
            
            <Star className="w-4 h-4 mr-2" />
            Favoritos ({favorites.length})
          </Button>
        </div>

        {/* Favorites Panel */}
        <AnimatePresence>
          {showFavorites &&
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6">
            
              <div className="bg-white/5 rounded-xl border border-amber-500/20 p-4">
                <h3 className="text-amber-400 font-semibold mb-3 flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  Seus Versículos Favoritos
                </h3>
                
                {favorites.length === 0 ?
              <p className="text-white/40 text-sm text-center py-4">
                    Nenhum versículo favoritado ainda. Toque no ❤️ ao estudar um versículo.
                  </p> :

              <div className="overflow-y-auto h-[250px]">
                    <div className="space-y-2">
                      {favorites.map((fav) => {
                    const bookInfo = getBookById(fav.book_id);
                    return (
                      <motion.button
                        key={fav.id}
                        onClick={() => handleFavoriteClick(fav.book_id, fav.chapter_number, fav.verse_number)}
                        className="w-full text-left p-3 rounded-lg bg-white/5 hover:bg-amber-500/10 border border-transparent hover:border-amber-500/30 transition-all"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}>
                        
                            <div className="flex items-center gap-2 mb-1">
                              <Heart className="w-3 h-3 text-red-400 fill-current" />
                              <span className="text-amber-400 text-sm font-medium">
                                {bookInfo?.name || fav.book_id} {fav.chapter_number}:{fav.verse_number}
                              </span>
                            </div>
                            <p className="text-white/70 text-xs line-clamp-2">
                              {fav.verse_text}
                            </p>
                          </motion.button>);

                  })}
                    </div>
                  </div>
              }
              </div>
            </motion.div>
          }
        </AnimatePresence>

        {/* Search Mode */}
        <AnimatePresence>
          {searchMode &&
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6">
            
              <div className="bg-white/5 rounded-xl border border-amber-500/20 p-4">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {if (e.key === 'Enter') handleSearchSubmit();}}
                    placeholder="Palavra ou referência (ex: sl 91:3, salmos 91)..."
                    className="pl-10 pr-9 bg-white/5 border-white/10 text-white placeholder:text-white/40"
                    autoFocus />
                  
                    {searchQuery &&
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {setSearchQuery('');setSearchResults([]);setSubmittedSearch('');}}
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0">
                    
                        <X className="w-4 h-4" />
                      </Button>
                  }
                  </div>
                  <Button
                  onClick={handleSearchSubmit}
                  disabled={searchQuery.trim().length < 2}
                  className="bg-amber-600 hover:bg-amber-700 text-white px-4"
                  size="default">
                  
                    <Search className="w-4 h-4" />
                  </Button>
                </div>

                {/* Search Results */}
                {searching ?
              <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-5 h-5 animate-spin text-amber-500" />
                    <span className="ml-2 text-white/50 text-sm">Pesquisando na Bíblia...</span>
                  </div> :
              searchResults.length > 0 ?
              <div className="overflow-y-auto h-[300px] mt-4">
                    <div className="space-y-2">
                      <p className="text-xs text-white/40 mb-2">
                        {searchResults.length} resultado{searchResults.length !== 1 ? 's' : ''} encontrado{searchResults.length !== 1 ? 's' : ''}
                      </p>
                      {searchResults.map((result, idx) =>
                  <motion.button
                    key={`${result.bookId}-${result.chapter}-${result.verse}-${idx}`}
                    onClick={() => handleSearchResultClick(result)}
                    className="w-full text-left p-3 rounded-lg bg-white/5 hover:bg-amber-500/10 border border-transparent hover:border-amber-500/30 transition-all"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.02 }}>
                    
                          <div className="flex items-center gap-2 mb-1">
                            <MapPin className="w-3 h-3 text-amber-500" />
                            <span className="text-amber-400 text-sm font-medium">
                              {result.bookName} {result.chapter}:{result.verse}
                            </span>
                          </div>
                          <p className="text-white/70 text-xs line-clamp-2">
                            {result.highlight}
                          </p>
                        </motion.button>
                  )}
                    </div>
                  </div> :
              submittedSearch.length >= 3 && !searching ?
              <div className="text-center py-8 text-white/40 text-sm">
                    Nenhum resultado encontrado para "{submittedSearch}".
                  </div> :

              <div className="text-center py-4 space-y-2">
                    <p className="text-white/40 text-xs">
                      Busque por palavras como: amor, fé, esperança, salvação...
                    </p>
                    <p className="text-white/30 text-xs">
                      📖 Ou navegue por referência: sl 91:3, salmos 91, genesis 2
                    </p>
                    <p className="text-white/30 text-xs">
                      💡 Busca em toda a Bíblia
                    </p>
                  </div>
              }
              </div>
            </motion.div>
          }
        </AnimatePresence>

        {/* Navigation Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          {/* Book Selector Button */}
          <Button
            variant="outline"
            onClick={() => setBookSelectorOpen(true)}
            className="bg-white/5 border-white/10 hover:bg-white/10">
            
            <BookOpen className="w-4 h-4 mr-2" />
            {selectedBook?.name || 'Livro'}
          </Button>

          {/* Chapter Selector */}
          <Select value={selectedChapter.toString()} onValueChange={(v) => setSelectedChapter(parseInt(v))}>
            <SelectTrigger className="w-24 bg-white/5 border-white/10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-[300px]">
              {selectedBook && Array.from({ length: selectedBook.chapters }, (_, i) =>
              <SelectItem key={i + 1} value={(i + 1).toString()}>Cap. {i + 1}</SelectItem>
              )}
            </SelectContent>
          </Select>

          {/* Verse Quick Jump */}
          <Select
            value=""
            onValueChange={(v) => {
              const verseNum = parseInt(v);
              setSelectedVerse(verseNum);
            }}>
            
            <SelectTrigger className="w-24 bg-white/5 border-white/10">
              <span className="text-white/60">Verso</span>
            </SelectTrigger>
            <SelectContent className="max-h-[300px]">
              {verses.map((v) =>
              <SelectItem key={v.number} value={v.number.toString()}>
                  v. {v.number}
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>

        {/* Reading Area */}
        <motion.div
          className="bg-gradient-to-b from-amber-900/10 to-amber-950/5 rounded-2xl border border-amber-500/20 p-4 sm:p-6 min-h-[60vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}>
          
          {loading ?
          <div className="flex items-center justify-center h-64">
              <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
            </div> :
          error ?
          <div className="flex flex-col items-center justify-center h-64 text-center">
              <p className="text-amber-400 mb-4">{error}</p>
              <Button
              variant="outline"
              onClick={() => fetchChapter(selectedBookId, selectedChapter)}
              className="border-amber-500/30">
              
                Tentar novamente
              </Button>
            </div> :

          <>
              {/* Chapter Header */}
              <div className="text-center mb-6 pb-4 border-b border-amber-500/20">
                <h2 className="text-xl font-serif text-amber-400">
                  {selectedBook?.name} {selectedChapter}
                </h2>
                <p className="text-xs text-white/40 mt-1">
                  Toque em um versículo para opções
                </p>
              </div>

              {/* Verses */}
              <div className="space-y-3 font-serif text-base sm:text-lg leading-relaxed">
                {verses.map((verse, index) => {
                const highlightColor = getHighlightColor(selectedBookId, selectedChapter, verse.number);
                const isFav = isFavorite(selectedBookId, selectedChapter, verse.number);

                return (
                  <VerseOptionsPopover
                    key={verse.number}
                    verseNumber={verse.number}
                    verseText={verse.text}
                    bookId={selectedBookId}
                    chapter={selectedChapter}
                    isFavorite={isFav}
                    highlightColor={highlightColor}
                    canAccessVerseStudy={canAccessVerseStudy}
                    onToggleFavorite={() => toggleFavorite(selectedBookId, selectedChapter, verse.number, verse.text)}
                    onSetHighlight={(color) => setHighlight(selectedBookId, selectedChapter, verse.number, color)}
                    onOpenStudy={() => handleVerseStudy(index)}
                    onShowLockedModal={handleShowLockedModal}>
                    
                      <motion.div
                      id={`verse-${verse.number}`}
                      className={`relative cursor-pointer p-2 rounded-lg transition-all duration-300 ${
                      highlightColor ? getHighlightClass(highlightColor) : 'hover:bg-amber-500/10'}`
                      }
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.015 }}>
                      
                        <span className="text-amber-500 font-bold text-sm mr-2 align-super">
                          {verse.number}
                        </span>
                        <span className="text-white/90">{verse.text}</span>
                        
                        {/* Favorite indicator */}
                        {isFav &&
                      <Heart className="inline-block w-3 h-3 ml-1 text-red-400 fill-current align-super" />
                      }
                      </motion.div>
                    </VerseOptionsPopover>);

              })}
              </div>
              <div className="mt-8 pt-4 border-t border-amber-500/20 space-y-3">
                <Button
                onClick={handleMarkAsRead}
                disabled={markingAsRead || chapterMarkedAsRead}
                className={`w-full ${
                chapterMarkedAsRead ?
                'bg-green-600/20 text-green-400 border border-green-500/30' :
                'bg-amber-600 hover:bg-amber-700 text-white'}`
                }>
                
                  {markingAsRead ?
                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> :

                <CheckCircle2 className={`w-4 h-4 mr-2 ${chapterMarkedAsRead ? 'fill-current' : ''}`} />
                }
                  {chapterMarkedAsRead ? 'Capítulo Lido (+1 ponto)' : 'Marcar como Lido (+1 ponto)'}
                </Button>
                
                {/* Quiz Shortcut - Available when chapter is marked as read */}
                {chapterMarkedAsRead &&
              <Button
                onClick={() => {
                  // Check if user has quiz access (GOLD+)
                  if (!['gold', 'premium', 'embaixador', 'admin'].includes(planType || '')) {
                    setLockedModalOpen(true);
                    return;
                  }
                  const bookInfo = BOOK_ID_MAP[selectedBookId];
                  if (bookInfo) {
                    navigate(`/quiz?mode=capitulo&book=${encodeURIComponent(bookInfo.name)}&chapter=${selectedChapter}`);
                  }
                }}
                className="w-full bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 border border-orange-500/30">
                
                    <Brain className="w-4 h-4 mr-2" />
                    Quiz deste Capítulo
                  </Button>
              }
              </div>

              {/* Chapter Navigation */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-amber-500/20">
                <Button
                variant="ghost"
                onClick={handlePrevChapter}
                disabled={selectedChapter <= 1}
                className="text-amber-400 hover:text-amber-300">
                
                  <ChevronLeft className="w-5 h-5 mr-1" />
                  Anterior
                </Button>
                <span className="text-white/50 text-sm">
                  {selectedChapter} / {selectedBook?.chapters}
                </span>
                <Button
                variant="ghost"
                onClick={handleNextChapter}
                disabled={!selectedBook || selectedChapter >= selectedBook.chapters}
                className="text-amber-400 hover:text-amber-300">
                
                  Próximo
                  <ChevronRight className="w-5 h-5 ml-1" />
                </Button>
              </div>
            </>
          }
        </motion.div>
      </div>

      {/* Book Selector Dialog */}
      <Dialog open={bookSelectorOpen} onOpenChange={setBookSelectorOpen}>
        <DialogContent className="bg-black/95 border-amber-500/30 max-w-lg max-h-[85dvh] flex flex-col p-0 gap-0 [&>button]:hidden">
          <div className="shrink-0 flex items-center justify-between p-4 border-b border-amber-500/20">
            <h2 className="text-amber-400 font-semibold text-base">Selecionar Livro</h2>
            <button onClick={() => setBookSelectorOpen(false)} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors">
              <X className="w-4 h-4 text-white/50" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto overscroll-contain p-4 pb-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-white/50 mb-2">Antigo Testamento</h3>
                <div className="grid grid-cols-3 gap-2">
                {getOldTestamentBooks().map((book) =>
                  <Button
                    key={book.id}
                    variant="ghost"
                    size="sm"
                    onClick={() => handleBookSelect(book.id)}
                    className={`text-xs justify-start ${selectedBookId === book.id ? 'bg-amber-500/20 text-amber-400' : 'text-white/70'}`}>
                    
                      {book.name}
                    </Button>
                  )}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-bold text-white/50 mb-2">Novo Testamento</h3>
                <div className="grid grid-cols-3 gap-2">
                {getNewTestamentBooks().map((book) =>
                  <Button
                    key={book.id}
                    variant="ghost"
                    size="sm"
                    onClick={() => handleBookSelect(book.id)}
                    className={`text-xs justify-start ${selectedBookId === book.id ? 'bg-amber-500/20 text-amber-400' : 'text-white/70'}`}>
                    
                      {book.name}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Verse Study Modal */}
      <Dialog open={studyModalOpen} onOpenChange={(open) => {setStudyModalOpen(open);if (!open) clearStudy();}}>
        <DialogContent className="bg-black/95 border-amber-500/30 max-w-lg max-h-[88dvh] flex flex-col p-0 gap-0 [&>button]:hidden">
          {/* Header fixo */}
          <div className="shrink-0 flex items-center justify-between p-4 border-b border-amber-500/20">
            <h2 className="text-amber-400 font-semibold text-base">
              {selectedBook?.name} {selectedChapter}:{selectedVerseIndex !== null ? verses[selectedVerseIndex]?.number : ''}
            </h2>
            <button onClick={() => {setStudyModalOpen(false);clearStudy();}} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors">
              <X className="w-4 h-4 text-white/50" />
            </button>
          </div>
          {/* Área de scroll nativa para mobile */}
          <div className="flex-1 overflow-y-auto overscroll-contain p-4 pb-6">
            {studyLoading ?
            <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-amber-500" />
                <span className="ml-2 text-white/50">Gerando estudo...</span>
              </div> :
            currentStudy && selectedVerseIndex !== null ?
            <div className="space-y-4">
                {/* Actions: Favorite & Highlight */}
                <div className="flex items-center gap-2 pb-3 border-b border-white/10">
                  <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const verse = verses[selectedVerseIndex];
                    if (verse) {
                      toggleFavorite(selectedBookId, selectedChapter, verse.number, verse.text);
                    }
                  }}
                  className={`flex items-center gap-2 ${
                  isFavorite(selectedBookId, selectedChapter, verses[selectedVerseIndex]?.number || 0) ?
                  'text-red-400' :
                  'text-white/60 hover:text-red-400'}`
                  }>
                  
                    <Heart className={`w-4 h-4 ${
                  isFavorite(selectedBookId, selectedChapter, verses[selectedVerseIndex]?.number || 0) ?
                  'fill-current' :
                  ''}`
                  } />
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
                          {HIGHLIGHT_COLORS.map((color) =>
                        <button
                          key={color.id}
                          onClick={() => {
                            const verse = verses[selectedVerseIndex];
                            if (verse) {
                              setHighlight(selectedBookId, selectedChapter, verse.number, color.id);
                            }
                          }}
                          className={`w-8 h-8 rounded-full ${color.class} border-2 border-white/20 hover:border-white/50 transition-colors`}
                          title={color.name} />

                        )}
                          <button
                          onClick={() => {
                            const verse = verses[selectedVerseIndex];
                            if (verse) {
                              setHighlight(selectedBookId, selectedChapter, verse.number, null);
                            }
                          }}
                          className="w-8 h-8 rounded-full bg-white/10 border-2 border-white/20 hover:border-white/50 transition-colors flex items-center justify-center"
                          title="Remover grifo">
                          
                            <X className="w-4 h-4 text-white/60" />
                          </button>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Original Verse */}
                <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
                  <p className="font-serif text-white/90 italic">
                    "{selectedVerseIndex !== null ? verses[selectedVerseIndex]?.text : ''}"
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
                {currentStudy.keyWords && currentStudy.keyWords.length > 0 &&
              <div>
                    <h4 className="text-sm font-bold text-amber-400 mb-2">Palavras-Chave</h4>
                    <div className="space-y-2">
                      {currentStudy.keyWords.map((kw, i) =>
                  <div key={i} className="bg-white/5 p-3 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-amber-400 font-bold">{kw.word}</span>
                            <span className="text-xs text-white/40">({kw.language === 'hebrew' ? 'Hebraico' : 'Grego'})</span>
                          </div>
                          <p className="text-xs text-white/60">
                            <strong>{kw.original}</strong> ({kw.transliteration}) — {kw.meaning}
                          </p>
                        </div>
                  )}
                    </div>
                  </div>
              }

                {/* Cross References */}
                {currentStudy.crossReferences && currentStudy.crossReferences.length > 0 &&
              <div>
                    <h4 className="text-sm font-bold text-amber-400 mb-2">Referências</h4>
                    <div className="flex flex-wrap gap-2">
                      {currentStudy.crossReferences.map((ref, i) =>
                  <button
                    key={i}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReferenceClick(ref);
                    }}
                    className="text-xs bg-amber-500/20 hover:bg-amber-500/40 px-3 py-1.5 rounded-full text-amber-300 hover:text-amber-200 transition-colors cursor-pointer">
                    
                          {ref}
                        </button>
                  )}
                    </div>
                  </div>
              }

                {/* Source */}
                {currentStudy.source &&
              <p className="text-xs text-white/40 pt-2 border-t border-white/10">
                    Fonte: {currentStudy.source}
                  </p>
              }

                {/* Create Devotional Button */}
                <div className="pt-4 border-t border-white/10">
                  <button
                  onClick={() => {
                    const verse = verses[selectedVerseIndex];
                    if (verse && selectedBook) {
                      const params = new URLSearchParams({
                        book: selectedBook.name,
                        bookId: selectedBook.id,
                        chapter: selectedChapter.toString(),
                        verse: verse.number.toString(),
                        text: verse.text,
                        commentary: currentStudy.commentary || ''
                      });
                      navigate(`/verse-devotional?${params.toString()}`);
                    }
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white font-semibold transition-all">
                  
                    <Feather className="w-4 h-4" />
                    Fazer Devocional
                  </button>
                </div>
              </div> :
            null}
          </div>
        </DialogContent>
      </Dialog>

      {/* Reference Popup Modal */}
      <Dialog open={referenceModalOpen} onOpenChange={setReferenceModalOpen}>
        <DialogContent className="bg-black/95 border-amber-500/30 max-w-md max-h-[80dvh] flex flex-col p-0 gap-0 [&>button]:hidden">
          <div className="shrink-0 flex items-center justify-between p-4 border-b border-amber-500/20">
            <h2 className="text-amber-400 font-semibold text-base">{referenceData?.reference}</h2>
            <button onClick={() => setReferenceModalOpen(false)} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors">
              <X className="w-4 h-4 text-white/50" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto overscroll-contain p-4 pb-6">
            <div className="py-2">
              {referenceData?.loading ?
              <div className="flex items-center justify-center py-6">
                  <Loader2 className="w-5 h-5 animate-spin text-amber-500" />
                </div> :
              referenceData?.error ?
              <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/20">
                  <p className="text-red-400 text-sm">{referenceData.error}</p>
                </div> :

              <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20 space-y-3">
                  {referenceData?.verses.map((verse, idx) =>
                <p key={idx} className="font-serif text-white/90 text-sm leading-relaxed">
                      <span className="text-amber-400 font-bold mr-1">{verse.number}</span>
                      {verse.text}
                    </p>
                )}
                </div>
              }
            </div>
          </div>
          <div className="shrink-0 p-3 border-t border-amber-500/20">
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                if (referenceData) {
                  setSelectedBookId(referenceData.bookId);
                  setSelectedChapter(referenceData.chapter);
                  setSelectedVerse(referenceData.verseStart);
                  setReferenceModalOpen(false);
                  setStudyModalOpen(false);
                }
              }}
              className="w-full border-amber-500/30 text-amber-400 hover:bg-amber-500/10">
              
              Ir para este versículo
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Locked Feature Modal */}
      <LockedFeatureModal
        isOpen={lockedModalOpen}
        onClose={() => setLockedModalOpen(false)}
        featureName="Quiz Bíblico"
        isFreePlan={planType === 'free'} />
      

      {/* Usage Limit Modal */}
      {usageLimitModal &&
      <UsageLimitModal
        isOpen={usageLimitModal.isOpen}
        onClose={() => setUsageLimitModal(null)}
        featureName={usageLimitModal.featureName}
        currentUsage={usageLimitModal.currentUsage}
        limit={usageLimitModal.limit}
        isBlocked={usageLimitModal.isBlocked}
        planType={planType || "free"} />

      }
      <BottomNavBar />
    </div>);

};

export default BibliaEstudo;