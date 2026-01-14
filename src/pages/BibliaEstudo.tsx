import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
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
  MapPin
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useUserPlan } from "@/hooks/useUserPlan";
import { useStudyBible } from "@/hooks/useStudyBible";
import { AppHeader } from "@/components/shared/AppHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  STUDY_BIBLE_BOOKS,
  getOldTestamentBooks,
  getNewTestamentBooks,
  getBookById,
} from "@/lib/studyBibleData";
import { isOffline, searchBible, SearchResult, preloadBibleCache } from "@/lib/bibleService";

// Custom debounce hook for search
function useSearchDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

const BibliaEstudo = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { planType, loading: planLoading } = useUserPlan(user?.email || undefined);
  
  const [selectedBookId, setSelectedBookId] = useState<string>('john');
  const [selectedChapter, setSelectedChapter] = useState(1);
  const [selectedVerse, setSelectedVerse] = useState<number | null>(null);
  const [bookSelectorOpen, setBookSelectorOpen] = useState(false);
  const [studyModalOpen, setStudyModalOpen] = useState(false);
  const [selectedVerseIndex, setSelectedVerseIndex] = useState<number | null>(null);
  const [offline, setOffline] = useState(false);
  
  // Search states
  const [searchMode, setSearchMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [cacheLoading, setCacheLoading] = useState(false);
  
  const debouncedSearch = useSearchDebounce(searchQuery, 500);

  const {
    loading,
    error,
    verses,
    currentStudy,
    studyLoading,
    fetchChapter,
    fetchVerseStudy,
    clearStudy,
  } = useStudyBible();

  const selectedBook = getBookById(selectedBookId);

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

  useEffect(() => {
    if (!planLoading && planType && !['gold', 'premium', 'embaixador', 'admin'].includes(planType)) {
      navigate("/home");
    }
  }, [planType, planLoading, navigate]);

  // Fetch chapter when selection changes
  useEffect(() => {
    if (selectedBookId && selectedChapter) {
      fetchChapter(selectedBookId, selectedChapter);
    }
  }, [selectedBookId, selectedChapter, fetchChapter]);

  // Scroll to selected verse
  useEffect(() => {
    if (selectedVerse && verses.length > 0) {
      const element = document.getElementById(`verse-${selectedVerse}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Highlight briefly
        element.classList.add('bg-amber-500/30');
        setTimeout(() => {
          element.classList.remove('bg-amber-500/30');
        }, 2000);
      }
      setSelectedVerse(null);
    }
  }, [selectedVerse, verses]);

  // Search effect
  useEffect(() => {
    if (debouncedSearch.length >= 3) {
      setSearching(true);
      searchBible(debouncedSearch, 100).then(results => {
        setSearchResults(results);
        setSearching(false);
      });
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearch]);

  const handleVerseClick = (verseIndex: number) => {
    const verse = verses[verseIndex];
    if (!verse || !selectedBook) return;
    
    setSelectedVerseIndex(verseIndex);
    setStudyModalOpen(true);
    fetchVerseStudy(selectedBookId, selectedChapter, verse.number, verse.text);
  };

  const handlePrevChapter = () => {
    if (selectedChapter > 1) {
      setSelectedChapter(prev => prev - 1);
    }
  };

  const handleNextChapter = () => {
    if (selectedBook && selectedChapter < selectedBook.chapters) {
      setSelectedChapter(prev => prev + 1);
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

  const handlePreloadCache = async () => {
    setCacheLoading(true);
    await preloadBibleCache();
    setCacheLoading(false);
  };

  if (authLoading || planLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-950/20 via-black to-black text-white">
      {/* Background texture */}
      <div className="fixed inset-0 pointer-events-none opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }} />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-6">
        <AppHeader 
          userId={user?.id}
          userEmail={user?.email || undefined}
          showBack={true}
        />

        {/* Title */}
        <motion.div
          className="text-center mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <BookMarked className="w-6 h-6 text-amber-500" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              Bíblia de Estudo
            </h1>
          </div>
          <p className="text-white/50 text-sm">Versão Almeida • Devocionalzeiros</p>
          
          {offline && (
            <div className="flex items-center justify-center gap-2 mt-2 text-amber-400 text-xs">
              <WifiOff className="w-4 h-4" />
              <span>Modo offline (usando cache local)</span>
            </div>
          )}
        </motion.div>

        {/* Search Toggle */}
        <div className="flex justify-center mb-4">
          <Button
            variant={searchMode ? "default" : "outline"}
            size="sm"
            onClick={() => setSearchMode(!searchMode)}
            className={searchMode ? "bg-amber-600 hover:bg-amber-700" : "border-amber-500/30 hover:bg-amber-500/10"}
          >
            <Search className="w-4 h-4 mr-2" />
            Pesquisar na Bíblia
          </Button>
        </div>

        {/* Search Mode */}
        <AnimatePresence>
          {searchMode && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6"
            >
              <div className="bg-white/5 rounded-xl border border-amber-500/20 p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Digite uma palavra (mín. 3 letras)..."
                    className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40"
                    autoFocus
                  />
                  {searchQuery && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => { setSearchQuery(''); setSearchResults([]); }}
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                {/* Search Results */}
                {searching ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-5 h-5 animate-spin text-amber-500" />
                    <span className="ml-2 text-white/50 text-sm">Buscando...</span>
                  </div>
                ) : searchResults.length > 0 ? (
                  <ScrollArea className="h-[300px] mt-4">
                    <div className="space-y-2">
                      <p className="text-xs text-white/40 mb-2">
                        {searchResults.length} resultado{searchResults.length !== 1 ? 's' : ''} encontrado{searchResults.length !== 1 ? 's' : ''}
                      </p>
                      {searchResults.map((result, idx) => (
                        <motion.button
                          key={`${result.bookId}-${result.chapter}-${result.verse}-${idx}`}
                          onClick={() => handleSearchResultClick(result)}
                          className="w-full text-left p-3 rounded-lg bg-white/5 hover:bg-amber-500/10 border border-transparent hover:border-amber-500/30 transition-all"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.02 }}
                        >
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
                      ))}
                    </div>
                  </ScrollArea>
                ) : searchQuery.length >= 3 && !searching ? (
                  <div className="text-center py-8 text-white/40 text-sm">
                    Nenhum resultado encontrado para "{searchQuery}"
                  </div>
                ) : searchQuery.length > 0 && searchQuery.length < 3 ? (
                  <div className="text-center py-4 text-white/40 text-xs">
                    Digite pelo menos 3 caracteres para buscar
                  </div>
                ) : (
                  <div className="text-center py-4 space-y-3">
                    <p className="text-white/40 text-xs">
                      Busque por palavras como: amor, fé, esperança, salvação...
                    </p>
                    {!offline && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handlePreloadCache}
                        disabled={cacheLoading}
                        className="border-amber-500/30 text-amber-400 hover:bg-amber-500/10"
                      >
                        {cacheLoading ? (
                          <>
                            <Loader2 className="w-3 h-3 animate-spin mr-2" />
                            Carregando...
                          </>
                        ) : (
                          'Carregar Bíblia para busca offline'
                        )}
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          {/* Book Selector Button */}
          <Button
            variant="outline"
            onClick={() => setBookSelectorOpen(true)}
            className="bg-white/5 border-white/10 hover:bg-white/10"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            {selectedBook?.name || 'Livro'}
          </Button>

          {/* Chapter Selector */}
          <Select value={selectedChapter.toString()} onValueChange={(v) => setSelectedChapter(parseInt(v))}>
            <SelectTrigger className="w-24 bg-white/5 border-white/10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-[300px]">
              {selectedBook && Array.from({ length: selectedBook.chapters }, (_, i) => (
                <SelectItem key={i + 1} value={(i + 1).toString()}>Cap. {i + 1}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Verse Quick Jump */}
          <Select 
            value="" 
            onValueChange={(v) => {
              const verseNum = parseInt(v);
              setSelectedVerse(verseNum);
            }}
          >
            <SelectTrigger className="w-24 bg-white/5 border-white/10">
              <span className="text-white/60">Verso</span>
            </SelectTrigger>
            <SelectContent className="max-h-[300px]">
              {verses.map((v) => (
                <SelectItem key={v.number} value={v.number.toString()}>
                  v. {v.number}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Reading Area */}
        <motion.div
          className="bg-gradient-to-b from-amber-900/10 to-amber-950/5 rounded-2xl border border-amber-500/20 p-4 sm:p-6 min-h-[60vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <p className="text-amber-400 mb-4">{error}</p>
              <Button 
                variant="outline" 
                onClick={() => fetchChapter(selectedBookId, selectedChapter)}
                className="border-amber-500/30"
              >
                Tentar novamente
              </Button>
            </div>
          ) : (
            <>
              {/* Chapter Header */}
              <div className="text-center mb-6 pb-4 border-b border-amber-500/20">
                <h2 className="text-xl font-serif text-amber-400">
                  {selectedBook?.name} {selectedChapter}
                </h2>
                <p className="text-xs text-white/40 mt-1">
                  Toque em um versículo para ver o estudo
                </p>
              </div>

              {/* Verses */}
              <div className="space-y-3 font-serif text-base sm:text-lg leading-relaxed">
                {verses.map((verse, index) => (
                  <motion.p
                    key={verse.number}
                    id={`verse-${verse.number}`}
                    className="cursor-pointer hover:bg-amber-500/10 p-2 rounded-lg transition-all duration-300"
                    onClick={() => handleVerseClick(index)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.015 }}
                  >
                    <span className="text-amber-500 font-bold text-sm mr-2 align-super">
                      {verse.number}
                    </span>
                    <span className="text-white/90">{verse.text}</span>
                  </motion.p>
                ))}
              </div>

              {/* Chapter Navigation */}
              <div className="flex items-center justify-between mt-8 pt-4 border-t border-amber-500/20">
                <Button
                  variant="ghost"
                  onClick={handlePrevChapter}
                  disabled={selectedChapter <= 1}
                  className="text-amber-400 hover:text-amber-300"
                >
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
                  className="text-amber-400 hover:text-amber-300"
                >
                  Próximo
                  <ChevronRight className="w-5 h-5 ml-1" />
                </Button>
              </div>
            </>
          )}
        </motion.div>
      </div>

      {/* Book Selector Dialog */}
      <Dialog open={bookSelectorOpen} onOpenChange={setBookSelectorOpen}>
        <DialogContent className="bg-black/95 border-amber-500/30 max-w-lg max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="text-amber-400">Selecionar Livro</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[60vh]">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-white/50 mb-2">Antigo Testamento</h3>
                <div className="grid grid-cols-3 gap-2">
                  {getOldTestamentBooks().map(book => (
                    <Button
                      key={book.id}
                      variant="ghost"
                      size="sm"
                      onClick={() => handleBookSelect(book.id)}
                      className={`text-xs justify-start ${selectedBookId === book.id ? 'bg-amber-500/20 text-amber-400' : 'text-white/70'}`}
                    >
                      {book.shortName}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-bold text-white/50 mb-2">Novo Testamento</h3>
                <div className="grid grid-cols-3 gap-2">
                  {getNewTestamentBooks().map(book => (
                    <Button
                      key={book.id}
                      variant="ghost"
                      size="sm"
                      onClick={() => handleBookSelect(book.id)}
                      className={`text-xs justify-start ${selectedBookId === book.id ? 'bg-amber-500/20 text-amber-400' : 'text-white/70'}`}
                    >
                      {book.shortName}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Verse Study Modal */}
      <Dialog open={studyModalOpen} onOpenChange={(open) => { setStudyModalOpen(open); if (!open) clearStudy(); }}>
        <DialogContent className="bg-black/95 border-amber-500/30 max-w-lg max-h-[85vh]">
          <DialogHeader>
            <DialogTitle className="text-amber-400">
              {selectedBook?.name} {selectedChapter}:{selectedVerseIndex !== null ? verses[selectedVerseIndex]?.number : ''}
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[65vh]">
            {studyLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-amber-500" />
                <span className="ml-2 text-white/50">Gerando estudo...</span>
              </div>
            ) : currentStudy ? (
              <div className="space-y-4">
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
                        <span key={i} className="text-xs bg-white/10 px-2 py-1 rounded text-white/70">
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
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BibliaEstudo;
