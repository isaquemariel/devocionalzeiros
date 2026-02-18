import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Mascot3D } from "./Mascot3D";

/**
 * Tiny armored mascot beside user avatar with "Vamos!" bubble.
 * Only for users with RPG access.
 */
const RPGMascotBadge = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="flex flex-col items-center cursor-pointer"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.4 }}
      onClick={() => navigate("/rpg")}
      title="Ir para o Jogo da Bíblia"
    >
      {/* Mascot with tiny armor overlay */}
      <motion.div
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        <div className="w-10 h-10">
          <Mascot3D mood="idle" size="xs" />
        </div>
        {/* Tiny helmet on top */}
        <svg viewBox="0 0 40 20" className="absolute -top-2 left-1/2 -translate-x-1/2 w-7 h-4 pointer-events-none">
          <ellipse cx="20" cy="12" rx="14" ry="10" fill="#d97706" opacity="0.85" />
          <rect x="8" y="11" width="24" height="5" rx="2" fill="#1e293b" opacity="0.7" />
          {/* Plume */}
          <path d="M20 2 Q23 0 21 -2 Q25 2 23 5" fill="#ef4444" opacity="0.8">
            <animate attributeName="d" values="M20 2 Q23 0 21 -2 Q25 2 23 5;M20 2 Q22 -1 20 -3 Q24 1 22 5;M20 2 Q23 0 21 -2 Q25 2 23 5" dur="1.5s" repeatCount="indefinite" />
          </path>
        </svg>
        {/* Tiny sword */}
        <svg viewBox="0 0 12 24" className="absolute -right-2 top-1 w-3 h-5 pointer-events-none">
          <rect x="5" y="0" width="2" height="16" rx="0.5" fill="#d1d5db" />
          <rect x="2" y="14" width="8" height="2" rx="1" fill="#d97706" />
          <rect x="5" y="16" width="2" height="4" rx="0.5" fill="#92400e" />
        </svg>
        {/* Tiny shield */}
        <svg viewBox="0 0 14 18" className="absolute -left-2 top-2 w-3 h-4 pointer-events-none">
          <ellipse cx="7" cy="9" rx="6" ry="8" fill="#d97706" stroke="#92400e" strokeWidth="1" />
          <line x1="7" y1="3" x2="7" y2="15" stroke="#fef3c7" strokeWidth="1.2" />
          <line x1="2" y1="9" x2="12" y2="9" stroke="#fef3c7" strokeWidth="1.2" />
        </svg>
      </motion.div>

      {/* Speech bubble */}
      <motion.div
        className="relative -mt-0.5 px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-600 to-yellow-500 shadow-[0_2px_8px_rgba(217,119,6,0.35)]"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-[8px] font-black text-black uppercase tracking-wide whitespace-nowrap">⚔️ Vamos!</span>
        {/* Tail pointing up */}
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-r-[4px] border-b-[5px] border-l-transparent border-r-transparent border-b-amber-600" />
      </motion.div>
    </motion.div>
  );
};

export default RPGMascotBadge;
