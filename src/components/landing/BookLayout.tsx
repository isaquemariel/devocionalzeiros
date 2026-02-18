import { useState, useCallback, useRef, useEffect, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BookPage {
  id: string;
  label: string;
  content: ReactNode | ((onAdvance: () => void) => ReactNode);
}

interface BookLayoutProps {
  pages: BookPage[];
}

const pageVariants = {
  enter: (direction: number) => ({
    rotateY: direction > 0 ? 90 : -90,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    rotateY: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    rotateY: direction > 0 ? -90 : 90,
    opacity: 0,
    scale: 0.95,
  }),
};

const pageTransition = {
  type: "tween" as const,
  duration: 0.5,
  ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
};

const BookLayout = ({ pages }: BookLayoutProps) => {
  const [[currentPage, direction], setPage] = useState([0, 0]);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const goToPage = useCallback(
    (index: number) => {
      if (index < 0 || index >= pages.length || index === currentPage) return;
      setPage([index, index > currentPage ? 1 : -1]);
    },
    [currentPage, pages.length]
  );

  const nextPage = useCallback(() => goToPage(currentPage + 1), [currentPage, goToPage]);
  const prevPage = useCallback(() => goToPage(currentPage - 1), [currentPage, goToPage]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        nextPage();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        prevPage();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextPage, prevPage]);

  // Touch/swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    // Only trigger if horizontal swipe is dominant and > 60px
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 60) {
      if (dx < 0) nextPage();
      else prevPage();
    }
  };

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative min-h-screen bg-background overflow-hidden landing-gold"
      style={{ perspective: "1400px" }}
    >
      {/* Page content with flip animation */}
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentPage}
          custom={direction}
          variants={pageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={pageTransition}
          style={{ transformStyle: "preserve-3d", transformOrigin: direction > 0 ? "left center" : "right center" }}
          className="min-h-screen w-full"
        >
          {/* Subtle page texture overlay */}
          <div className="absolute inset-0 pointer-events-none z-[1] opacity-[0.02] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />
          
          {/* Page fold shadow on left edge */}
          {currentPage > 0 && (
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/[0.08] to-transparent pointer-events-none z-[2]" />
          )}
          
          {/* Page fold shadow on right edge */}
          {currentPage < pages.length - 1 && (
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/[0.06] to-transparent pointer-events-none z-[2]" />
          )}

          {/* Scrollable content within the page */}
          <div className="min-h-screen overflow-y-auto">
            {typeof pages[currentPage].content === "function"
              ? (pages[currentPage].content as (onAdvance: () => void) => ReactNode)(nextPage)
              : pages[currentPage].content}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation arrows - fixed */}
      {currentPage > 0 && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={prevPage}
          className="fixed left-3 top-1/2 -translate-y-1/2 z-50 w-10 h-10 md:w-12 md:h-12 rounded-full bg-background/80 border border-border/50 backdrop-blur-sm flex items-center justify-center text-foreground/60 hover:text-foreground hover:bg-background transition-all duration-200 shadow-lg hover:scale-110"
          aria-label="Página anterior"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </motion.button>
      )}

      {currentPage < pages.length - 1 && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={nextPage}
          className="fixed right-3 top-1/2 -translate-y-1/2 z-50 w-10 h-10 md:w-12 md:h-12 rounded-full bg-background/80 border border-border/50 backdrop-blur-sm flex items-center justify-center text-foreground/60 hover:text-foreground hover:bg-background transition-all duration-200 shadow-lg hover:scale-110"
          aria-label="Próxima página"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </motion.button>
      )}

      {/* Page indicator - bottom */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1.5 px-3 py-2 rounded-full bg-background/80 border border-border/50 backdrop-blur-sm shadow-lg">
        {pages.map((page, i) => (
          <button
            key={page.id}
            onClick={() => goToPage(i)}
            className={`group relative transition-all duration-300 ${
              i === currentPage ? "w-8 h-2.5" : "w-2.5 h-2.5"
            } rounded-full`}
            aria-label={page.label}
            title={page.label}
          >
            <div
              className={`absolute inset-0 rounded-full transition-all duration-300 ${
                i === currentPage
                  ? "bg-primary shadow-[0_0_8px_hsl(var(--primary)/0.4)]"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
            />
          </button>
        ))}
        <span className="text-[10px] text-muted-foreground ml-2 font-medium tabular-nums">
          {currentPage + 1}/{pages.length}
        </span>
      </div>
    </div>
  );
};

export default BookLayout;
