import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Book, ChevronRight, ArrowLeft, Search, Loader2, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { bibleBooks } from "@/lib/bibleData";

interface BookChapterSelectorProps {
  onSelect: (book: string, chapter: number) => void;
  onBack: () => void;
  loading: boolean;
}

export const BookChapterSelector = ({
  onSelect,
  onBack,
  loading,
}: BookChapterSelectorProps) => {
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBooks = useMemo(() => {
    if (!searchQuery) return bibleBooks;
    const query = searchQuery.toLowerCase();
    return bibleBooks.filter(book => 
      book.name.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const oldTestament = filteredBooks.filter(b => b.testament === "old");
  const newTestament = filteredBooks.filter(b => b.testament === "new");

  const selectedBookData = bibleBooks.find(b => b.name === selectedBook);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="relative">
          <Loader2 className="w-12 h-12 animate-spin text-purple-400" />
          <div className="absolute inset-0 animate-ping">
            <Loader2 className="w-12 h-12 text-purple-400/30" />
          </div>
        </div>
        <p className="text-muted-foreground text-lg">Gerando perguntas...</p>
        <p className="text-muted-foreground/60 text-sm">Isso pode levar alguns segundos</p>
      </div>
    );
  }

  if (selectedBook && selectedBookData) {
    const chapters = Array.from({ length: selectedBookData.chapters }, (_, i) => i + 1);
    
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-4"
      >
        {/* Header */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSelectedBook(null)}
            className="w-10 h-10 rounded-xl bg-muted/30 flex items-center justify-center hover:bg-muted/50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="font-bold text-xl text-foreground">{selectedBook}</h2>
            <p className="text-sm text-muted-foreground">
              Selecione o capítulo ({selectedBookData.chapters} capítulos)
            </p>
          </div>
        </div>

        {/* Chapters Grid */}
        <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 gap-2">
          {chapters.map((chapter) => (
            <motion.button
              key={chapter}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: chapter * 0.01 }}
              onClick={() => onSelect(selectedBook, chapter)}
              className="aspect-square rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/30 hover:border-purple-400 hover:bg-purple-500/30 flex items-center justify-center font-bold text-lg transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20"
            >
              {chapter}
            </motion.button>
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-xl bg-muted/30 flex items-center justify-center hover:bg-muted/50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="font-bold text-xl text-foreground">Escolha Livre</h2>
          <p className="text-sm text-muted-foreground">
            Selecione um livro da Bíblia
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Buscar livro..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-muted/20 border-border/50"
        />
      </div>

      {/* Books List */}
      <div className="overflow-y-auto h-[400px] pr-4">
        <div className="space-y-6">
          {/* Old Testament */}
          {oldTestament.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Book className="w-3.5 h-3.5" />
                Antigo Testamento ({oldTestament.length})
              </h3>
              <div className="grid gap-2">
                {oldTestament.map((book, index) => (
                  <motion.button
                    key={book.name}
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.02 }}
                    onClick={() => setSelectedBook(book.name)}
                    className="flex items-center justify-between p-3 rounded-xl bg-muted/10 border border-border/30 hover:border-amber-500/50 hover:bg-amber-500/10 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
                        <span className="text-xs font-bold text-amber-400">
                          {book.chapters}
                        </span>
                      </div>
                      <span className="font-medium">{book.name}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-amber-400 transition-colors" />
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* New Testament */}
          {newTestament.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-purple-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Book className="w-3.5 h-3.5" />
                Novo Testamento ({newTestament.length})
              </h3>
              <div className="grid gap-2">
                {newTestament.map((book, index) => (
                  <motion.button
                    key={book.name}
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.02 + 0.5 }}
                    onClick={() => setSelectedBook(book.name)}
                    className="flex items-center justify-between p-3 rounded-xl bg-muted/10 border border-border/30 hover:border-purple-500/50 hover:bg-purple-500/10 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                        <span className="text-xs font-bold text-purple-400">
                          {book.chapters}
                        </span>
                      </div>
                      <span className="font-medium">{book.name}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-purple-400 transition-colors" />
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {filteredBooks.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Nenhum livro encontrado</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
