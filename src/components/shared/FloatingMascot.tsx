import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { Mascot3D } from "./Mascot3D";
import { supabase } from "@/integrations/supabase/client";

// Pages where the floating mascot should NOT appear at all
const EXCLUDED_ROUTES = ["/", "/clubehd", "/auth", "/seja-embaixador", "/adminhd"];

// Pages that are internal app pages
const APP_ROUTES = ["/home", "/biblia", "/biblia-estudo", "/ranking", "/devocional", "/chat", "/sermao", "/quiz", "/embaixador", "/verse-devotional", "/planos", "/conquistas"];

// Random Psalms for motivation
const PSALMS = [
  "O Senhor é o meu pastor; nada me faltará. — Salmo 23:1",
  "Entrega o teu caminho ao Senhor; confia nele, e ele tudo fará. — Salmo 37:5",
  "Deus é o nosso refúgio e fortaleza, socorro bem presente na angústia. — Salmo 46:1",
  "Cria em mim, ó Deus, um coração puro. — Salmo 51:10",
  "Alegrei-me quando me disseram: Vamos à casa do Senhor! — Salmo 122:1",
  "Bom é louvar ao Senhor e cantar louvores ao teu nome, ó Altíssimo. — Salmo 92:1",
  "Porque o Senhor é bom; a sua misericórdia dura para sempre. — Salmo 100:5",
  "Os que semeiam em lágrimas segarão com alegria. — Salmo 126:5",
  "Dá graças ao Senhor, porque ele é bom; a sua misericórdia dura para sempre. — Salmo 136:1",
  "Tu me sondas e me conheces. — Salmo 139:1",
  "Este é o dia que o Senhor fez; regozijemo-nos e alegremo-nos nele. — Salmo 118:24",
  "O Senhor é a minha luz e a minha salvação; de quem terei medo? — Salmo 27:1",
  "Espera no Senhor, anima-te e ele fortalecerá o teu coração. — Salmo 27:14",
  "Lâmpada para os meus pés é a tua palavra e luz para o meu caminho. — Salmo 119:105",
];

interface DraggableMascotProps {
  userId?: string;
}

/** Draggable floating mascot for /home */
export const DraggableFloatingMascot = ({ userId }: DraggableMascotProps) => {
  const navigate = useNavigate();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showBubble, setShowBubble] = useState(false);
  const [bubbleText, setBubbleText] = useState("");
  const [bubbleType, setBubbleType] = useState<"psalm" | "devotional">("psalm");
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const posStart = useRef({ x: 0, y: 0 });
  const hasMoved = useRef(false);
  const bubbleTimeout = useRef<ReturnType<typeof setTimeout>>();
  const containerRef = useRef<HTMLDivElement>(null);
  const hasCheckedDevotional = useRef(false);

  // Initialize position bottom-right
  useEffect(() => {
    setPosition({
      x: window.innerWidth - 80,
      y: window.innerHeight - 120,
    });
  }, []);

  // Check devotional completion and show reminder
  useEffect(() => {
    const checkDevotional = async () => {
      if (!userId || hasCheckedDevotional.current) return;
      hasCheckedDevotional.current = true;

      const today = new Date().toISOString().split('T')[0];
      const storageKey = `devotional_reminder_shown_${today}`;
      if (localStorage.getItem(storageKey) === 'true') return;
      localStorage.setItem(storageKey, 'true');

      try {
        const { data } = await supabase
          .from('devotional_completions')
          .select('id')
          .eq('user_id', userId)
          .eq('devotional_date', today)
          .maybeSingle();

        if (data) return; // Already completed

        setTimeout(() => {
          setBubbleType("devotional");
          setBubbleText("Já fez seu Devocional hoje? 📖");
          setShowBubble(true);
          bubbleTimeout.current = setTimeout(() => setShowBubble(false), 6000);
        }, 1200);
      } catch (e) {
        console.error('Error checking devotional:', e);
      }
    };
    checkDevotional();
  }, [userId]);

  const clampPosition = useCallback((x: number, y: number) => {
    const maxX = window.innerWidth - 60;
    const maxY = window.innerHeight - 60;
    return {
      x: Math.max(10, Math.min(x, maxX)),
      y: Math.max(60, Math.min(y, maxY)),
    };
  }, []);

  // Mouse drag
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
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      setPosition(clampPosition(posStart.current.x + dx, posStart.current.y + dy));
    };
    const handleMouseUp = () => {
      isDragging.current = false;
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [clampPosition]);

  // Touch drag
  const handleTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    hasMoved.current = false;
    const touch = e.touches[0];
    dragStart.current = { x: touch.clientX, y: touch.clientY };
    posStart.current = { ...position };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    hasMoved.current = true;
    const touch = e.touches[0];
    const dx = touch.clientX - dragStart.current.x;
    const dy = touch.clientY - dragStart.current.y;
    setPosition(clampPosition(posStart.current.x + dx, posStart.current.y + dy));
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  const handleClick = () => {
    if (hasMoved.current) return;
    // If devotional bubble is showing, navigate to devotional
    if (showBubble && bubbleType === "devotional") {
      setShowBubble(false);
      navigate("/devocional");
      return;
    }
    if (showBubble) {
      setShowBubble(false);
      return;
    }
    // Show random Psalm
    const psalm = PSALMS[Math.floor(Math.random() * PSALMS.length)];
    setBubbleType("psalm");
    setBubbleText(psalm);
    setShowBubble(true);
    clearTimeout(bubbleTimeout.current);
    bubbleTimeout.current = setTimeout(() => setShowBubble(false), 8000);
  };

  return (
    <div
      ref={containerRef}
      className="fixed z-50 select-none"
      style={{
        left: position.x,
        top: position.y,
        transform: "translate(-50%, -50%)",
        touchAction: "none",
        cursor: isDragging.current ? "grabbing" : "grab",
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={handleClick}
    >
      {/* Speech bubble */}
      <AnimatePresence>
        {showBubble && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-56 sm:w-64"
          >
            <div className={`relative rounded-xl px-3 py-2.5 text-xs leading-relaxed shadow-xl ${
              bubbleType === "devotional"
                ? "bg-amber-500 text-white"
                : "bg-white text-gray-800"
            }`}>
              {bubbleText}
              {/* Triangle pointer */}
              <div className={`absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent ${
                bubbleType === "devotional" ? "border-t-amber-500" : "border-t-white"
              }`} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mascot */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Mascot3D mood="idle" size="sm" />
      </motion.div>
    </div>
  );
};

/** Small mascot in the header for non-home pages */
export const HeaderMascot = () => (
  <motion.div
    className="flex-shrink-0"
    animate={{ y: [0, -2, 0] }}
    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
  >
    <Mascot3D mood="idle" size="xs" />
  </motion.div>
);

/** Global floating mascot — renders the right variant per route */
export const FloatingMascot = () => {
  const location = useLocation();
  const path = location.pathname;

  if (EXCLUDED_ROUTES.includes(path)) return null;
  const isAppRoute = APP_ROUTES.some(r => path.startsWith(r));
  if (!isAppRoute) return null;

  // Only the draggable version on /home (rendered inside Home.tsx now)
  // On other pages, the header mascot is rendered inside AppHeader
  return null;
};

/** Loading mascot - replaces spinner during page loads */
export const MascotLoader = () => (
  <div className="min-h-screen bg-black flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <Mascot3D mood="idle" size="lg" />
      </motion.div>
      <motion.p
        className="text-white/50 text-sm"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        Carregando...
      </motion.p>
    </div>
  </div>
);

export default FloatingMascot;
