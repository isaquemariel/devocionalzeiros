import { motion } from "framer-motion";
import { useRef } from "react";

type MascotMood = "happy" | "sad" | "champion" | "idle";

interface Mascot3DProps {
  mood?: MascotMood;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeMap = {
  xs: 40,
  sm: 70,
  md: 110,
  lg: 150,
  xl: 200,
};

// Body is ALWAYS blue-based, only flames/accents change per mood
const BODY_PRIMARY = "#1A2E50";
const BODY_SECONDARY = "#243B63";
const BODY_DARK = "#0E1D35";
const GLASSES_COLOR = "#D4A017"; // Gold glasses like reference

const moodConfig = {
  happy: {
    particles: ["✨", "⭐", "🎉"],
    glowColor: "#22C55E",
    flameColor1: "#22C55E",
    flameColor2: "#4ADE80",
    flameColor3: "#BBF7D0",
    innerFlame: "#16A34A",
    accentColor: "#4ADE80",
    eyeExpression: "happy" as const,
    mouthExpression: "grin" as const,
    animation: { y: [0, -6, 0], scale: [1, 1.05, 1] },
    transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" as const },
  },
  sad: {
    particles: [],
    glowColor: "#EF4444",
    flameColor1: "#EF4444",
    flameColor2: "#F87171",
    flameColor3: "#FECACA",
    innerFlame: "#DC2626",
    accentColor: "#F87171",
    eyeExpression: "sad" as const,
    mouthExpression: "frown" as const,
    animation: { y: [0, 3, 0], scale: [1, 0.96, 1] },
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" as const },
  },
  champion: {
    particles: ["🏆", "✨", "🔥", "⭐"],
    glowColor: "#FBBF24",
    flameColor1: "#FBBF24",
    flameColor2: "#FDE68A",
    flameColor3: "#FFFBEB",
    innerFlame: "#F59E0B",
    accentColor: "#FDE68A",
    eyeExpression: "happy" as const,
    mouthExpression: "grin" as const,
    animation: { y: [0, -8, 0], scale: [1, 1.08, 1] },
    transition: { duration: 1.2, repeat: Infinity, ease: "easeInOut" as const },
  },
  idle: {
    particles: [],
    glowColor: "#3B82F6",
    flameColor1: "#F59E0B",
    flameColor2: "#FBBF24",
    flameColor3: "#FDE68A",
    innerFlame: "#D97706",
    accentColor: "#60A5FA",
    eyeExpression: "neutral" as const,
    mouthExpression: "neutral" as const,
    animation: { y: [0, -3, 0], scale: [1, 1.02, 1] },
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" as const },
  },
};

const Particle = ({ emoji, index, total }: { emoji: string; index: number; total: number }) => {
  const angle = (360 / total) * index;
  const radius = 50;
  const x = Math.cos((angle * Math.PI) / 180) * radius;
  const y = Math.sin((angle * Math.PI) / 180) * radius;
  return (
    <motion.span
      className="absolute text-sm pointer-events-none select-none"
      style={{ left: "50%", top: "50%" }}
      initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        x: [0, x * 0.5, x, x * 1.2],
        y: [0, y * 0.5 - 10, y - 20, y - 35],
        scale: [0, 1, 1, 0.5],
        rotate: [0, 180, 360],
      }}
      transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.4, ease: "easeOut" }}
    >
      {emoji}
    </motion.span>
  );
};

const MascotSVG = ({
  eyeExpression,
  mouthExpression,
  glowColor,
  flameColor1,
  flameColor2,
  flameColor3,
  accentColor,
  innerFlame,
  uid,
}: {
  eyeExpression: "happy" | "sad" | "neutral";
  mouthExpression: "grin" | "frown" | "neutral";
  glowColor: string;
  flameColor1: string;
  flameColor2: string;
  flameColor3: string;
  accentColor: string;
  innerFlame: string;
  uid: string;
}) => {
  const bp = BODY_PRIMARY;
  const bs = BODY_SECONDARY;
  const bd = BODY_DARK;
  const gc = GLASSES_COLOR;

  // Unique IDs per instance to prevent SVG gradient/filter conflicts
  const ids = {
    bodyGrad: `bodyGrad-${uid}`,
    flameG: `flameG-${uid}`,
    flameInG: `flameInG-${uid}`,
    eyeG: `eyeG-${uid}`,
    fGlow: `fGlow-${uid}`,
    gGlow: `gGlow-${uid}`,
  };

  return (
    <svg viewBox="0 0 220 290" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id={ids.bodyGrad} cx="0.4" cy="0.35" r="0.65">
          <stop offset="0%" stopColor={bs} />
          <stop offset="60%" stopColor={bp} />
          <stop offset="100%" stopColor={bd} />
        </radialGradient>
        <linearGradient id={ids.flameG} x1="0.5" y1="1" x2="0.5" y2="0">
          <stop offset="0%" stopColor={flameColor1} />
          <stop offset="45%" stopColor={flameColor2} />
          <stop offset="100%" stopColor={flameColor3} stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id={ids.flameInG} x1="0.5" y1="1" x2="0.5" y2="0">
          <stop offset="0%" stopColor={innerFlame} />
          <stop offset="100%" stopColor={flameColor2} stopOpacity="0.6" />
        </linearGradient>
        <radialGradient id={ids.eyeG} cx="0.4" cy="0.35" r="0.6">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="55%" stopColor="#E8E8E8" />
          <stop offset="100%" stopColor="#CCCCCC" />
        </radialGradient>
        <filter id={ids.fGlow}>
          <feGaussianBlur stdDeviation="5" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id={ids.gGlow}>
          <feGaussianBlur stdDeviation="2" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* ===== FLAME (wider, more like reference) ===== */}
      <motion.g
        filter={`url(#${ids.fGlow})`}
        animate={{ scaleY: [0.92, 1.12, 0.92], scaleX: [1, 0.94, 1] }}
        transition={{ duration: 0.7, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "110px 82px" }}
      >
        <motion.path
          d="M110 15 Q130 45 126 62 Q136 50 130 32 Q142 55 128 75 Q120 85 110 88 Q100 85 92 75 Q78 55 90 32 Q84 50 94 62 Q90 45 110 15Z"
          fill="url(#flameG)" opacity="0.95"
          animate={{
            d: [
              "M110 15 Q130 45 126 62 Q136 50 130 32 Q142 55 128 75 Q120 85 110 88 Q100 85 92 75 Q78 55 90 32 Q84 50 94 62 Q90 45 110 15Z",
              "M110 10 Q128 42 124 60 Q134 47 128 30 Q140 52 126 73 Q118 83 110 86 Q102 83 94 73 Q80 52 92 30 Q86 47 96 60 Q92 42 110 10Z",
              "M110 15 Q130 45 126 62 Q136 50 130 32 Q142 55 128 75 Q120 85 110 88 Q100 85 92 75 Q78 55 90 32 Q84 50 94 62 Q90 45 110 15Z",
            ],
          }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M110 40 Q120 54 118 66 Q126 58 120 48 Q130 62 120 76 Q116 82 110 84 Q104 82 100 76 Q90 62 100 48 Q94 58 102 66 Q100 54 110 40Z"
          fill="url(#flameInG)" opacity="0.7"
          animate={{
            d: [
              "M110 40 Q120 54 118 66 Q126 58 120 48 Q130 62 120 76 Q116 82 110 84 Q104 82 100 76 Q90 62 100 48 Q94 58 102 66 Q100 54 110 40Z",
              "M110 36 Q118 52 116 64 Q124 56 118 46 Q128 60 118 74 Q114 80 110 82 Q106 80 102 74 Q92 60 102 46 Q96 56 104 64 Q102 52 110 36Z",
              "M110 40 Q120 54 118 66 Q126 58 120 48 Q130 62 120 76 Q116 82 110 84 Q104 82 100 76 Q90 62 100 48 Q94 58 102 66 Q100 54 110 40Z",
            ],
          }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.g>

      {/* ===== BODY: Wide D-shape ===== */}
      <motion.g animate={{ y: [0, 1.5, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}>
        {/* Main D body - WIDER */}
        <path
          d="M50 85 L50 228 Q50 248 68 248 L105 248 Q170 248 170 168 Q170 85 105 85 L68 85 Q50 85 50 85Z"
          fill={`url(#${ids.bodyGrad})`}
          stroke="#3B82F6"
          strokeWidth="1.8"
          strokeOpacity="0.35"
        />
        {/* Subtle highlight on D face */}
        <path
          d="M60 100 L60 215 Q60 230 72 230 L100 230 Q155 230 155 168 Q155 100 100 100 L72 100 Q60 100 60 100Z"
          fill="#2563EB" opacity="0.08"
        />

        {/* Body sparkles */}
        <motion.circle cx="75" cy="125" r="1.2" fill={accentColor} opacity="0.5"
          animate={{ opacity: [0.2, 0.7, 0.2], scale: [1, 1.6, 1] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        />
        <motion.circle cx="135" cy="145" r="0.9" fill={accentColor} opacity="0.4"
          animate={{ opacity: [0.15, 0.6, 0.15], scale: [1, 1.4, 1] }}
          transition={{ duration: 2.8, repeat: Infinity, delay: 0.6 }}
        />
        <motion.circle cx="85" cy="200" r="1" fill={accentColor} opacity="0.35"
          animate={{ opacity: [0.1, 0.55, 0.1], scale: [1, 1.5, 1] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1.2 }}
        />

        {/* Inner D glow edge - brighter */}
        <path
          d="M88 115 L88 210 Q88 222 100 222 L108 222 Q142 222 142 168 Q142 115 108 115 L100 115 Q88 115 88 115Z"
          fill="none" stroke="#3B82F6" strokeWidth="2" strokeOpacity="0.3"
        />

        {/* Tie/accent on chest */}
        <path
          d="M110 195 L106 210 L110 225 L114 210Z"
          fill={glowColor} opacity="0.5"
        />
        <circle cx="110" cy="192" r="3" fill={glowColor} opacity="0.6" />

        {/* ===== PULSING HEART FLAME on belly ===== */}
        <motion.g
          animate={{ scale: [0.9, 1.15, 0.9], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "110px 205px" }}
        >
          <path
            d="M110 196 Q116 202 114 210 Q120 206 116 199 Q122 208 114 216 Q112 219 110 220 Q108 219 106 216 Q98 208 104 199 Q100 206 106 210 Q104 202 110 196Z"
            fill={glowColor} opacity="0.8"
          />
          <path
            d="M110 202 Q114 206 113 212 Q116 210 113 205 Q117 210 113 215 Q111 217 110 218 Q109 217 107 215 Q103 210 107 205 Q104 210 107 212 Q106 206 110 202Z"
            fill={flameColor3} opacity="0.5"
          />
        </motion.g>

        {/* ===== LEGS ===== */}
        <motion.g animate={{ rotate: [-2, 2, -2] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} style={{ transformOrigin: "85px 248px" }}>
          <ellipse cx="85" cy="258" rx="15" ry="10" fill={bd} />
          <ellipse cx="85" cy="258" rx="13" ry="8" fill={bp} />
        </motion.g>
        <motion.g animate={{ rotate: [2, -2, 2] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }} style={{ transformOrigin: "135px 248px" }}>
          <ellipse cx="135" cy="258" rx="15" ry="10" fill={bd} />
          <ellipse cx="135" cy="258" rx="13" ry="8" fill={bp} />
        </motion.g>

        {/* ===== LEFT ARM ===== */}
        <motion.g
          animate={{ rotate: [-6, 6, -6] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "50px 155px" }}
        >
          <ellipse cx="36" cy="168" rx="16" ry="22" fill={bd} />
          <ellipse cx="36" cy="168" rx="14" ry="19" fill={bp} />
        </motion.g>

        {/* ===== RIGHT ARM ===== */}
        <motion.g
          animate={{ rotate: [6, -6, 6] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          style={{ transformOrigin: "170px 155px" }}
        >
          <ellipse cx="184" cy="168" rx="16" ry="22" fill={bd} />
          <ellipse cx="184" cy="168" rx="14" ry="19" fill={bp} />
        </motion.g>

        {/* ===== GLASSES (spread apart, straight bridge, cartoon) ===== */}
        <g filter={`url(#${ids.gGlow})`}>
          {/* Left lens */}
          <circle cx="88" cy="148" r="24" fill="none" stroke={gc} strokeWidth="3.5" opacity="0.9" />
          <circle cx="88" cy="148" r="21" fill={bd} opacity="0.45" />
          {/* Right lens */}
          <circle cx="132" cy="148" r="24" fill="none" stroke={gc} strokeWidth="3.5" opacity="0.9" />
          <circle cx="132" cy="148" r="21" fill={bd} opacity="0.45" />
          {/* Bridge - straight line connecting the two lenses */}
          <line x1="112" y1="146" x2="108" y2="146" stroke={gc} strokeWidth="3.5" opacity="0.9" />
          {/* Temple arms */}
          <path d="M64 145 Q52 140 42 144" stroke={gc} strokeWidth="2.8" opacity="0.65" fill="none" />
          <path d="M156 145 Q168 140 178 144" stroke={gc} strokeWidth="2.8" opacity="0.65" fill="none" />
          {/* Lens glare */}
          <ellipse cx="80" cy="140" rx="8" ry="4.5" fill="white" opacity="0.15" transform="rotate(-20, 80, 140)" />
          <ellipse cx="124" cy="140" rx="8" ry="4.5" fill="white" opacity="0.15" transform="rotate(-20, 124, 140)" />
        </g>

        {/* ===== EYES (inside glasses, centered at 88 and 132) ===== */}
        {eyeExpression === "happy" ? (
          <>
            <motion.path d="M78 150 Q88 137 98 150" stroke={accentColor} strokeWidth="3.5" strokeLinecap="round" fill="none"
              animate={{ d: ["M78 150 Q88 137 98 150", "M78 149 Q88 136 98 149", "M78 150 Q88 137 98 150"] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
            <motion.path d="M122 150 Q132 137 142 150" stroke={accentColor} strokeWidth="3.5" strokeLinecap="round" fill="none"
              animate={{ d: ["M122 150 Q132 137 142 150", "M122 149 Q132 136 142 149", "M122 150 Q132 137 142 150"] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
          </>
        ) : (
          <>
            <motion.g
              animate={{ scaleY: [1, 1, 0.06, 1, 1] }}
              transition={{ duration: 4, repeat: Infinity, times: [0, 0.4, 0.47, 0.54, 1] }}
              style={{ transformOrigin: "88px 148px" }}
            >
              <circle cx="88" cy="148" r="11" fill="url(#eyeG)" />
              <circle cx="88" cy="148" r="6.5" fill={bd} />
              <circle cx={eyeExpression === "sad" ? "90" : "86"} cy="145" r="2.8" fill="white" opacity="0.9" />
              <circle cx={eyeExpression === "sad" ? "92" : "88"} cy="148" r="1.3" fill="white" opacity="0.45" />
            </motion.g>
            <motion.g
              animate={{ scaleY: [1, 1, 0.06, 1, 1] }}
              transition={{ duration: 4, repeat: Infinity, times: [0, 0.4, 0.47, 0.54, 1] }}
              style={{ transformOrigin: "132px 148px" }}
            >
              <circle cx="132" cy="148" r="11" fill="url(#eyeG)" />
              <circle cx="132" cy="148" r="6.5" fill={bd} />
              <circle cx={eyeExpression === "sad" ? "134" : "130"} cy="145" r="2.8" fill="white" opacity="0.9" />
              <circle cx={eyeExpression === "sad" ? "136" : "132"} cy="148" r="1.3" fill="white" opacity="0.45" />
            </motion.g>
          </>
        )}

        {/* ===== EYEBROWS + TEARS (sad) ===== */}
        {eyeExpression === "sad" && (
          <>
            <path d="M72 126 Q82 133 98 130" stroke={accentColor} strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.7" />
            <path d="M148 130 Q138 133 122 126" stroke={accentColor} strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.7" />
            {/* Tears falling from left eye */}
            <motion.g
              animate={{ y: [0, 45], opacity: [0.9, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeIn", delay: 0 }}
            >
              <ellipse cx="82" cy="160" rx="2.5" ry="4" fill="#60A5FA" opacity="0.8" />
            </motion.g>
            <motion.g
              animate={{ y: [0, 40], opacity: [0.8, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeIn", delay: 0.6 }}
            >
              <ellipse cx="86" cy="162" rx="2" ry="3.5" fill="#93C5FD" opacity="0.7" />
            </motion.g>
            {/* Tears falling from right eye */}
            <motion.g
              animate={{ y: [0, 45], opacity: [0.9, 0] }}
              transition={{ duration: 1.3, repeat: Infinity, ease: "easeIn", delay: 0.3 }}
            >
              <ellipse cx="138" cy="160" rx="2.5" ry="4" fill="#60A5FA" opacity="0.8" />
            </motion.g>
            <motion.g
              animate={{ y: [0, 40], opacity: [0.8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeIn", delay: 0.9 }}
            >
              <ellipse cx="134" cy="162" rx="2" ry="3.5" fill="#93C5FD" opacity="0.7" />
            </motion.g>
          </>
        )}

        {/* ===== MOUTH ===== */}
        {mouthExpression === "grin" ? (
          <motion.path
            d="M96 175 Q110 190 124 175"
            stroke={accentColor} strokeWidth="2.8" strokeLinecap="round" fill="none"
            animate={{ d: ["M96 175 Q110 190 124 175", "M97 175 Q110 189 123 175", "M96 175 Q110 190 124 175"] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        ) : mouthExpression === "frown" ? (
          <motion.path
            d="M96 180 Q110 170 124 180"
            stroke={accentColor} strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.8"
            animate={{ d: ["M96 180 Q110 170 124 180", "M96 181 Q110 171 124 181", "M96 180 Q110 170 124 180"] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
        ) : (
          <motion.path
            d="M100 176 Q110 182 120 176"
            stroke={accentColor} strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.7"
            animate={{ d: ["M100 176 Q110 182 120 176", "M100 176 Q110 183 120 176", "M100 176 Q110 182 120 176"] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        )}
      </motion.g>
    </svg>
  );
};

let _mascotInstanceCounter = 0;

export const Mascot3D = ({ mood = "idle", size = "md", className = "" }: Mascot3DProps) => {
  const config = moodConfig[mood];
  const px = sizeMap[size];
  // Unique ID per instance to prevent SVG gradient/filter conflicts when multiple mascots render simultaneously
  const uid = useRef(`m${++_mascotInstanceCounter}`).current;

  return (
    <div className={`relative inline-flex items-center justify-center pointer-events-none ${className}`} style={{ width: px, height: px * 1.15 }}>
      {/* Particles */}
      {config.particles.map((emoji, i) => (
        <Particle key={`${emoji}-${i}`} emoji={emoji} index={i} total={config.particles.length} />
      ))}

      {/* Animated mascot */}
      <motion.div
        className="relative w-full h-full"
        animate={config.animation}
        transition={config.transition}
        style={{ filter: `drop-shadow(0 4px 20px ${config.glowColor}40)` }}
      >
        <MascotSVG
          eyeExpression={config.eyeExpression}
          mouthExpression={config.mouthExpression}
          glowColor={config.glowColor}
          flameColor1={config.flameColor1}
          flameColor2={config.flameColor2}
          flameColor3={config.flameColor3}
          accentColor={config.accentColor}
          innerFlame={config.innerFlame}
        />
      </motion.div>
    </div>
  );
};

export default Mascot3D;
