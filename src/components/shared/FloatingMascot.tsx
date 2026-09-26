import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { Mascot3D } from "./Mascot3D";
import { Balao } from "@/components/jornada/Balao";
import { supabase } from "@/integrations/supabase/client";

// Pages where the floating mascot should NOT appear at all
const EXCLUDED_ROUTES = ["/", "/clubehd", "/auth", "/jornada", "/planos", "/escolher-plano", "/seja-embaixador", "/adminhd"];

// Pages that are internal app pages
const APP_ROUTES = ["/home", "/biblia", "/biblia-estudo", "/ranking", "/devocional", "/chat", "/sermao", "/quiz", "/embaixador", "/verse-devotional", "/planos", "/conquistas"];

// Versículos do dia — determinístico por data (mesmo para todos os usuários)
const DAILY_VERSES = [
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
  "Porque eu bem sei os planos que tenho para vós, diz o Senhor. — Jeremias 29:11",
  "Tudo posso naquele que me fortalece. — Filipenses 4:13",
  "O Senhor é bom, uma fortaleza no dia da angústia. — Naum 1:7",
  "Busquei o Senhor, e ele me respondeu; livrou-me de todos os meus temores. — Salmo 34:4",
  "Mas os que esperam no Senhor renovarão as suas forças. — Isaías 40:31",
  "Confia no Senhor de todo o teu coração. — Provérbios 3:5",
  "Não temas, porque eu sou contigo. — Isaías 41:10",
  "Ele sara os quebrantados de coração e lhes pensa as feridas. — Salmo 147:3",
  "O Senhor pelejará por vós, e vós vos calareis. — Êxodo 14:14",
  "Sede fortes e corajosos! — Josué 1:9",
  "A tua palavra é a verdade. — João 17:17",
  "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito. — João 3:16",
  "Eu sou o caminho, a verdade e a vida. — João 14:6",
  "O amor é paciente, o amor é bondoso. — 1 Coríntios 13:4",
  "Ainda que eu ande pelo vale da sombra da morte, não temerei mal algum. — Salmo 23:4",
  "Grande é o Senhor e muito digno de louvor. — Salmo 145:3",
];

/** Get today's verse — same for all users, changes every 24h */
function getDailyVerse(): string {
  const now = new Date();
  // Day count since epoch — deterministic, same timezone-independent
  const dayIndex = Math.floor(now.getTime() / 86400000);
  return DAILY_VERSES[dayIndex % DAILY_VERSES.length];
}

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
  const [falandoBalao, setFalandoBalao] = useState(false);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const posStart = useRef({ x: 0, y: 0 });
  const hasMoved = useRef(false);
  const bubbleTimeout = useRef<ReturnType<typeof setTimeout>>();
  const containerRef = useRef<HTMLDivElement>(null);
  const hasCheckedDevotional = useRef(false);

  // Initialize position between the stats badges and the carousel
  const [initialized, setInitialized] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      const x = 44;   // Left edge (matches screenshot)
      const y = 220;  // Below header (~80px) + badges row (~80px) + some gap
      setPosition({ x, y });
      setInitialized(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Check devotional completion and show appropriate bubble
  useEffect(() => {
    const checkDevotional = async () => {
      if (!userId || hasCheckedDevotional.current) return;
      hasCheckedDevotional.current = true;

      // Use Brasília timezone for date
      const today = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Sao_Paulo' });

      try {
        const { data } = await supabase
          .from('devotional_completions')
          .select('id')
          .eq('user_id', userId)
          .eq('devotional_date', today)
          .maybeSingle();

        if (!data) {
          // Devotional NOT done — always show reminder
          setTimeout(() => {
            setBubbleType("devotional");
            setBubbleText("Já fez seu Devocional hoje? 📖");
            setShowBubble(true);
            bubbleTimeout.current = setTimeout(() => setShowBubble(false), 8000);
          }, 1200);
        } else {
          // Devotional done — don't auto-show anything, verse shows on click
        }
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
    // Show daily verse (same for everyone)
    setBubbleType("psalm");
    setBubbleText(getDailyVerse());
    setShowBubble(true);
    clearTimeout(bubbleTimeout.current);
    bubbleTimeout.current = setTimeout(() => setShowBubble(false), 8000);
  };

  return (
    <div
      ref={containerRef}
      className="fixed z-[30] select-none"
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
      onTouchEnd={handleTouchEnd}
      onClick={handleClick}
    >
      {/* Mascot with speech bubble — ele acena e mexe a boca enquanto o balão está aberto */}
      <div className="relative">
        <Mascot3D mood="idle" size="sm" falando={showBubble && falandoBalao} gesto={showBubble ? "acenar" : undefined} />

        {/* Speech bubble - positioned top-right, tail points to mascot's mouth */}
        <AnimatePresence>
          {showBubble && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="absolute pointer-events-none"
              style={{
                // a ponta do rabicho (15 px da borda do balão) cai no meio dele
                bottom: "calc(100% - 4px)",
                left: "calc(50% - 15px)",
                transformOrigin: "15px 100%",
              }}
            >
              {/* o balão do RPG, saindo DELE: o rabicho desce até a cabeça */}
              <div className="rpg-root" style={{ background: "transparent", width: "min(240px, calc(100vw - 32px))" }}>
                <Balao
                  texto={bubbleText}
                  quem={bubbleType === "psalm" ? "Versículo do dia" : "Devocionalzeiro"}
                  onFalando={setFalandoBalao}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
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

/** Loading mascot — a ÚNICA tela de carregamento do app.
 *
 *  Toda espera de página inteira passa por aqui: antes havia meia dúzia de
 *  variações soltas (um spinner genérico numa página, um livro girando no
 *  login) e o leitor via um carregamento diferente a cada tela. `label` só
 *  troca a frase; a figura é sempre o personagem principal.
 */
export const MascotLoader = ({ label = "Carregando..." }: { label?: string }) => (
  <div className="min-h-screen bg-black flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      {/* ele caminha no lugar: a página está a caminho */}
      <Mascot3D mood="happy" size="lg" gesto="andar" />
      <motion.p
        className="text-white/50 text-sm"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {label}
      </motion.p>
    </div>
  </div>
);

export default FloatingMascot;
