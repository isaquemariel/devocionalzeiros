import { useState } from "react";
import { Heart, Highlighter, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Default highlight color (yellow)
const DEFAULT_HIGHLIGHT_COLOR = "yellow";

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
  const [loading, setLoading] = useState(false);

  const handleFavoriteClick = async () => {
    setLoading(true);
    await onToggleFavorite();
    setLoading(false);
  };

  const handleHighlightToggle = async () => {
    setLoading(true);
    // Toggle: if already highlighted, remove; otherwise apply default color
    if (highlightColor) {
      await onSetHighlight(null);
    } else {
      await onSetHighlight(DEFAULT_HIGHLIGHT_COLOR);
    }
    setLoading(false);
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
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent 
        className="w-[min(16rem,calc(100vw-2rem))] p-0 bg-zinc-900/95 border-amber-500/30 backdrop-blur-md"
        sideOffset={8}
        align="start"
        avoidCollisions={true}
        collisionPadding={8}
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

          {/* Grifar - Toggle simples */}
          <Button
            variant="ghost"
            size="sm"
            disabled={loading}
            onClick={handleHighlightToggle}
            className={`w-full justify-start gap-3 h-10 ${
              highlightColor ? 'text-amber-400 hover:text-amber-300' : 'text-white/80 hover:text-white'
            }`}
          >
            <Highlighter className={`w-4 h-4 ${highlightColor ? 'fill-amber-400/30' : ''}`} />
            {highlightColor ? 'Remover Grifo' : 'Grifar'}
          </Button>

          {/* Divider */}
          <div className="border-t border-white/10 my-2" />

          {/* Explicação */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleStudyClick}
            className="w-full justify-start gap-3 h-10 text-white/80 hover:text-white"
          >
            <BookOpen className="w-4 h-4" />
            Explicação do Versículo
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
