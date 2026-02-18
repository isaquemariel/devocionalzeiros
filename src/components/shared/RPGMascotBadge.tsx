import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

/**
 * Small armored mascot that appears next to the user's avatar on Home.
 * Only rendered when user has RPG access (admin/embaixador).
 */
const RPGMascotBadge = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="flex flex-col items-center cursor-pointer"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 18, delay: 0.3 }}
      onClick={() => navigate("/rpg")}
      title="Ir para o Jogo da Bíblia"
    >
      {/* Armored mascot SVG */}
      <motion.div
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-14 h-14"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_8px_rgba(217,119,6,0.5)]">
          {/* Helmet */}
          <defs>
            <linearGradient id="helmet-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#d4a017" />
              <stop offset="100%" stopColor="#8b6914" />
            </linearGradient>
            <linearGradient id="body-armor" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4a90d9" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
            <linearGradient id="shield-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d97706" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
            <linearGradient id="sword-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e5e7eb" />
              <stop offset="100%" stopColor="#9ca3af" />
            </linearGradient>
          </defs>

          {/* Shield (left hand) */}
          <ellipse cx="22" cy="58" rx="12" ry="16" fill="url(#shield-grad)" stroke="#92400e" strokeWidth="1.5" />
          <line x1="22" y1="44" x2="22" y2="72" stroke="#92400e" strokeWidth="1" />
          <line x1="12" y1="58" x2="32" y2="58" stroke="#92400e" strokeWidth="1" />
          {/* Cross on shield */}
          <line x1="22" y1="50" x2="22" y2="66" stroke="#fef3c7" strokeWidth="2" />
          <line x1="16" y1="58" x2="28" y2="58" stroke="#fef3c7" strokeWidth="2" />

          {/* Sword (right hand) */}
          <rect x="72" y="20" width="3" height="36" rx="1" fill="url(#sword-grad)" stroke="#6b7280" strokeWidth="0.5" />
          {/* Sword guard */}
          <rect x="66" y="54" width="15" height="4" rx="2" fill="#d97706" />
          {/* Sword handle */}
          <rect x="72" y="58" width="3" height="10" rx="1" fill="#92400e" />
          {/* Sword pommel */}
          <circle cx="73.5" cy="70" r="3" fill="#d97706" />

          {/* Body with armor */}
          <rect x="35" y="45" width="30" height="30" rx="6" fill="url(#body-armor)" stroke="#1e40af" strokeWidth="1" />
          {/* Chest plate */}
          <path d="M40 48 L50 52 L60 48 L60 60 L50 65 L40 60 Z" fill="#93c5fd" opacity="0.4" stroke="#60a5fa" strokeWidth="0.5" />

          {/* Helmet */}
          <ellipse cx="50" cy="32" rx="18" ry="16" fill="url(#helmet-grad)" />
          {/* Visor */}
          <rect x="38" y="30" width="24" height="8" rx="3" fill="#1e293b" />
          {/* Eyes through visor */}
          <circle cx="44" cy="34" r="2.5" fill="#60a5fa">
            <animate attributeName="opacity" values="1;0.5;1" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="56" cy="34" r="2.5" fill="#60a5fa">
            <animate attributeName="opacity" values="1;0.5;1" dur="3s" repeatCount="indefinite" />
          </circle>
          {/* Helmet plume */}
          <path d="M50 16 Q55 10 52 5 Q58 12 55 18" fill="#ef4444" opacity="0.9">
            <animate attributeName="d" values="M50 16 Q55 10 52 5 Q58 12 55 18;M50 16 Q53 8 50 3 Q56 10 54 18;M50 16 Q55 10 52 5 Q58 12 55 18" dur="1.5s" repeatCount="indefinite" />
          </path>

          {/* Legs */}
          <rect x="38" y="75" width="10" height="12" rx="3" fill="#1e40af" />
          <rect x="52" y="75" width="10" height="12" rx="3" fill="#1e40af" />
          {/* Boots */}
          <rect x="36" y="84" width="14" height="6" rx="3" fill="#92400e" />
          <rect x="50" y="84" width="14" height="6" rx="3" fill="#92400e" />
        </svg>
      </motion.div>

      {/* "Vamos!" speech bubble */}
      <motion.div
        className="relative -mt-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-600 to-yellow-500 shadow-[0_0_12px_rgba(217,119,6,0.4)]"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-[10px] font-black text-black uppercase tracking-wider">⚔️ Vamos!</span>
      </motion.div>
    </motion.div>
  );
};

export default RPGMascotBadge;
