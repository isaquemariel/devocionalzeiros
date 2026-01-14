import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Highlighter, BookOpen, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { HIGHLIGHT_COLORS } from "@/hooks/useVerseFavorites";

interface VerseOptionsPopoverProps {
  children: React.ReactNode;
  verseNumber: number;
  verseText: string;
  bookId: string;
  chapter: number;
  isFavorite: boolean;
  highlightColor: string | null;
  canAccessVerseStudy: boolean;
  onToggleFavorite: () => Promise<boolean | void>;
  onSetHighlight: (color: string | null) => Promise<void>;
  onOpenStudy: () => void;
  onShowLockedModal: () => void;
}

export const VerseOptionsPopover = ({
  children,
  verseNumber,
  verseText,
  isFavorite,
  highlightColor,
  canAccessVerseStudy,
  onToggleFavorite,
  onSetHighlight,
  onOpenStudy,
  onShowLockedModal,
}: VerseOptionsPopoverProps) => {
  const [open, setOpen] = useState(false);
  const [showHighlightColors, setShowHighlightColors] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFavoriteClick = async () => {
    setLoading(true);
    await onToggleFavorite();
    setLoading(false);
  };

  const handleHighlightClick = () => {
    setShowHighlightColors(!showHighlightColors);
  };

  const handleColorSelect = async (colorId: string | null) => {
    setLoading(true);
    await onSetHighlight(colorId);
    setLoading(false);
    setShowHighlightColors(false);
  };

  const handleStudyClick = () => {
    if (canAccessVerseStudy) {
      onOpenStudy();
      setOpen(false);
    } else {
      onShowLockedModal();
      setOpen(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={(isOpen) => {
      setOpen(isOpen);
      if (!isOpen) setShowHighlightColors(false);
    }}>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent 
        className="w-64 p-0 bg-zinc-900/95 border-amber-500/30 backdrop-blur-md"
        sideOffset={8}
        align="center"
      >
        <div className="p-3 border-b border-white/10">
          <p className="text-xs text-amber-400 font-semibold mb-1">
            Versículo {verseNumber}
          </p>
          <p className="text-xs text-white/60 line-clamp-2">
            {verseText.substring(0, 80)}...
          </p>
        </div>

        <div className="p-2 space-y-1">
          {/* Favoritar */}
          <Button
            variant="ghost"
            size="sm"
            disabled={loading}
            onClick={handleFavoriteClick}
            className={`w-full justify-start gap-3 h-10 ${
              isFavorite ? 'text-red-400 hover:text-red-300' : 'text-white/80 hover:text-white'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            {isFavorite ? 'Remover dos Favoritos' : 'Favoritar'}
          </Button>

          {/* Grifar */}
          <div>
            <Button
              variant="ghost"
              size="sm"
              disabled={loading}
              onClick={handleHighlightClick}
              className={`w-full justify-start gap-3 h-10 ${
                highlightColor ? 'text-amber-400 hover:text-amber-300' : 'text-white/80 hover:text-white'
              }`}
            >
              <Highlighter className="w-4 h-4" />
              {highlightColor ? 'Alterar Grifo' : 'Grifar'}
            </Button>

            {/* Color palette */}
            <AnimatePresence>
              {showHighlightColors && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-2 pb-2"
                >
                  <div className="flex items-center gap-2 mt-2 p-2 bg-white/5 rounded-lg">
                    {HIGHLIGHT_COLORS.map((color) => (
                      <button
                        key={color.id}
                        onClick={() => handleColorSelect(color.id)}
                        className={`w-7 h-7 rounded-full transition-all ${color.class} ${
                          highlightColor === color.id 
                            ? 'ring-2 ring-white ring-offset-2 ring-offset-zinc-900 scale-110' 
                            : 'hover:scale-110'
                        }`}
                        title={color.name}
                      >
                        {highlightColor === color.id && (
                          <Check className="w-4 h-4 text-zinc-900 mx-auto" />
                        )}
                      </button>
                    ))}
                    
                    {/* Remove highlight option */}
                    {highlightColor && (
                      <button
                        onClick={() => handleColorSelect(null)}
                        className="w-7 h-7 rounded-full bg-zinc-700 hover:bg-zinc-600 flex items-center justify-center transition-all hover:scale-110"
                        title="Remover grifo"
                      >
                        <X className="w-3 h-3 text-white/70" />
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Divider */}
          <div className="border-t border-white/10 my-2" />

          {/* Explicação */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleStudyClick}
            className={`w-full justify-start gap-3 h-10 ${
              canAccessVerseStudy 
                ? 'text-amber-400 hover:text-amber-300 hover:bg-amber-500/10' 
                : 'text-white/40 hover:text-white/50'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Explicação do Versículo
            {!canAccessVerseStudy && (
              <span className="ml-auto text-[10px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full">
                GOLD
              </span>
            )}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
