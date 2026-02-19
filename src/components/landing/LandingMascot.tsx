import { useState, useRef, useEffect, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import mascotBase from "@/assets/mascot-base.png";

export const LandingMascot = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showBubble, setShowBubble] = useState(false);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const posStart = useRef({ x: 0, y: 0 });
  const hasMoved = useRef(false);
  const bubbleTimeout = useRef<ReturnType<typeof setTimeout>>();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPosition({ x: 60, y: window.innerHeight - 100 });
      setInitialized(true);
      setTimeout(() => {
        setShowBubble(true);
        bubbleTimeout.current = setTimeout(() => setShowBubble(false), 8000);
      }, 2000);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const clampPosition = useCallback((x: number, y: number) => ({
    x: Math.max(10, Math.min(x, window.innerWidth - 60)),
    y: Math.max(60, Math.min(y, window.innerHeight - 60)),
  }), []);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    hasMoved.current = false;
    dragStart.current = { x: e.clientX, y: e.clientY };
    posStart.current = { ...position };
    e.preventDefault();
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      hasMoved.current = true;
      setPosition(clampPosition(posStart.current.x + (e.clientX - dragStart.current.x), posStart.current.y + (e.clientY - dragStart.current.y)));
    };
    const handleMouseUp = () => { isDragging.current = false; };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => { window.removeEventListener("mousemove", handleMouseMove); window.removeEventListener("mouseup", handleMouseUp); };
  }, [clampPosition]);

  const handleTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    hasMoved.current = false;
    const t = e.touches[0];
    dragStart.current = { x: t.clientX, y: t.clientY };
    posStart.current = { ...position };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    hasMoved.current = true;
    const t = e.touches[0];
    setPosition(clampPosition(posStart.current.x + (t.clientX - dragStart.current.x), posStart.current.y + (t.clientY - dragStart.current.y)));
  };

  const handleClick = () => {
    if (hasMoved.current) return;
    if (showBubble) { setShowBubble(false); return; }
    setShowBubble(true);
    clearTimeout(bubbleTimeout.current);
    bubbleTimeout.current = setTimeout(() => setShowBubble(false), 8000);
  };

  return (
    <div
      className="fixed z-50 select-none"
      style={{
        left: position.x,
        top: position.y,
        transform: "translate(-50%, -50%)",
        touchAction: "none",
        cursor: isDragging.current ? "grabbing" : "grab",
        opacity: initialized ? 1 : 0,
        transition: "opacity 0.3s ease",
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={() => { isDragging.current = false; }}
      onClick={handleClick}
    >
      <div className="relative">
        {/* Use static image instead of animated SVG mascot */}
        <img src={mascotBase} alt="Mascote" className="w-[60px] h-auto" loading="lazy" />

        <AnimatePresence>
          {showBubble && (
            <div
              className="absolute pointer-events-none animate-scale-in"
              style={{ bottom: "calc(100% - 10px)", left: "50%", width: "max-content", maxWidth: "220px" }}
            >
              <div className="relative rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed font-medium bg-gradient-to-br from-primary/90 to-accent/80 text-white shadow-[0_4px_20px_hsl(var(--primary)/0.4)] border border-white/20">
                Fala, devocionalzeiro! 👋 Vamos começar sua jornada?
                <div className="absolute -bottom-2 left-3">
                  <div className="w-0 h-0 border-l-[8px] border-r-[4px] border-t-[10px] border-l-transparent border-r-transparent border-t-primary/90" style={{ transform: "rotate(-15deg)" }} />
                </div>
                <div className="absolute -bottom-3.5 left-1.5 w-2 h-2 rounded-full bg-primary/80" />
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LandingMascot;
