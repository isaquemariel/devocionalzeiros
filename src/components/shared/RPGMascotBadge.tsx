import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Mascot3D } from "./Mascot3D";

/**
 * Small mascot with armor accessories next to user avatar.
 * Only rendered when user has RPG access (admin/embaixador).
 */
const RPGMascotBadge = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="absolute -right-16 top-1/2 -translate-y-1/2 flex items-center cursor-pointer"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.4 }}
      onClick={() => navigate("/rpg")}
      title="Ir para o Jogo da Bíblia"
    >
      {/* Mascot */}
      <motion.div
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Mascot3D mood="idle" size="sm" />
      </motion.div>

      {/* Speech bubble */}
      <motion.div
        className="relative ml-1 px-2.5 py-1.5 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-500 shadow-[0_2px_12px_rgba(217,119,6,0.4)]"
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-[10px] font-black text-black uppercase tracking-wide whitespace-nowrap">⚔️ Vamos!</span>
        {/* Tail pointing left to mascot */}
        <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-0 h-0 border-t-[5px] border-b-[5px] border-r-[6px] border-t-transparent border-b-transparent border-r-amber-500" />
      </motion.div>
    </motion.div>
  );
};

export default RPGMascotBadge;
