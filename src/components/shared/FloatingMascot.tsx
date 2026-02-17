import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { Mascot3D } from "./Mascot3D";

// Pages where the floating mascot should NOT appear
const EXCLUDED_ROUTES = ["/", "/clubehd", "/auth", "/seja-embaixador", "/adminhd"];

// Pages that are internal app pages (mascot shows here)
const APP_ROUTES = ["/home", "/biblia", "/biblia-estudo", "/ranking", "/devocional", "/chat", "/sermao", "/quiz", "/embaixador", "/verse-devotional", "/planos", "/conquistas"];

export const FloatingMascot = () => {
  const location = useLocation();
  const path = location.pathname;

  // Don't show on excluded routes
  if (EXCLUDED_ROUTES.includes(path)) return null;

  // Only show on known app routes
  const isAppRoute = APP_ROUTES.some(r => path.startsWith(r));
  if (!isAppRoute) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed bottom-4 right-3 z-40 pointer-events-none select-none"
        initial={{ opacity: 0, scale: 0.5, y: 20 }}
        animate={{ opacity: 0.7, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.5, y: 20 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Mascot3D mood="idle" size="sm" />
      </motion.div>
    </AnimatePresence>
  );
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
