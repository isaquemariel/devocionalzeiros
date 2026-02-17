import { motion } from "framer-motion";

type MascotMood = "happy" | "sad" | "champion" | "idle";

interface Mascot3DProps {
  mood?: MascotMood;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeMap = {
  sm: 70,
  md: 110,
  lg: 150,
  xl: 200,
};

const moodConfig = {
  happy: {
    particles: ["✨", "⭐", "🎉"],
    bodyPrimary: "#0A3D1A",
    bodySecondary: "#0F5A28",
    bodyDark: "#062E12",
    glowColor: "#22C55E",
    flameColor1: "#22C55E",
    flameColor2: "#4ADE80",
    flameColor3: "#BBF7D0",
    eyeColor: "#22C55E",
    accentColor: "#4ADE80",
    innerFlame: "#16A34A",
    mouthColor: "#4ADE80",
    eyeExpression: "happy" as const,
    mouthExpression: "grin" as const,
    animation: { y: [0, -6, 0], scale: [1, 1.05, 1] },
    transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" as const },
  },
  sad: {
    particles: ["💧"],
    bodyPrimary: "#3D0A0A",
    bodySecondary: "#5A1515",
    bodyDark: "#2E0606",
    glowColor: "#EF4444",
    flameColor1: "#EF4444",
    flameColor2: "#F87171",
    flameColor3: "#FECACA",
    eyeColor: "#EF4444",
    accentColor: "#F87171",
    innerFlame: "#DC2626",
    mouthColor: "#F87171",
    eyeExpression: "sad" as const,
    mouthExpression: "frown" as const,
    animation: { y: [0, 3, 0], scale: [1, 0.96, 1] },
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" as const },
  },
  champion: {
    particles: ["🏆", "✨", "🔥", "⭐"],
    bodyPrimary: "#1A2744",
    bodySecondary: "#2A3A5C",
    bodyDark: "#0F1B30",
    glowColor: "#FBBF24",
    flameColor1: "#FBBF24",
    flameColor2: "#FDE68A",
    flameColor3: "#FFFBEB",
    eyeColor: "#FBBF24",
    accentColor: "#FDE68A",
    innerFlame: "#F59E0B",
    mouthColor: "#FBBF24",
    eyeExpression: "happy" as const,
    mouthExpression: "grin" as const,
    animation: { y: [0, -8, 0], scale: [1, 1.08, 1] },
    transition: { duration: 1.2, repeat: Infinity, ease: "easeInOut" as const },
  },
  idle: {
    particles: [],
    bodyPrimary: "#1A2744",
    bodySecondary: "#2A3A5C",
    bodyDark: "#0F1B30",
    glowColor: "#00B4FF",
    flameColor1: "#00B4FF",
    flameColor2: "#60CFFF",
    flameColor3: "#DBEAFE",
    eyeColor: "#00B4FF",
    accentColor: "#60CFFF",
    innerFlame: "#0090DD",
    mouthColor: "#60CFFF",
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
  bodyPrimary,
  bodySecondary,
  bodyDark,
  glowColor,
  flameColor1,
  flameColor2,
  flameColor3,
  eyeColor,
  accentColor,
  innerFlame,
  mouthColor,
}: {
  eyeExpression: "happy" | "sad" | "neutral";
  mouthExpression: "grin" | "frown" | "neutral";
  bodyPrimary: string;
  bodySecondary: string;
  bodyDark: string;
  glowColor: string;
  flameColor1: string;
  flameColor2: string;
  flameColor3: string;
  eyeColor: string;
  accentColor: string;
  innerFlame: string;
  mouthColor: string;
}) => {
  return (
    <svg viewBox="0 0 200 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id="bodyGrad" cx="0.4" cy="0.35" r="0.65">
          <stop offset="0%" stopColor={bodySecondary} />
          <stop offset="60%" stopColor={bodyPrimary} />
          <stop offset="100%" stopColor={bodyDark} />
        </radialGradient>
        <linearGradient id="flameG" x1="0.5" y1="1" x2="0.5" y2="0">
          <stop offset="0%" stopColor={flameColor1} />
          <stop offset="45%" stopColor={flameColor2} />
          <stop offset="100%" stopColor={flameColor3} stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="flameInG" x1="0.5" y1="1" x2="0.5" y2="0">
          <stop offset="0%" stopColor={innerFlame} />
          <stop offset="100%" stopColor={flameColor2} stopOpacity="0.6" />
        </linearGradient>
        <radialGradient id="eyeG" cx="0.4" cy="0.35" r="0.6">
          <stop offset="0%" stopColor={accentColor} />
          <stop offset="55%" stopColor={eyeColor} />
          <stop offset="100%" stopColor={bodyDark} />
        </radialGradient>
        <filter id="fGlow">
          <feGaussianBlur stdDeviation="5" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="gGlow">
          <feGaussianBlur stdDeviation="1.5" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* ===== FLAME ===== */}
      <motion.g
        filter="url(#fGlow)"
        animate={{ scaleY: [0.92, 1.12, 0.92], scaleX: [1, 0.94, 1] }}
        transition={{ duration: 0.7, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "100px 82px" }}
      >
        <motion.path
          d="M100 12 Q122 42 117 60 Q128 48 122 30 Q134 52 120 72 Q112 82 100 85 Q88 82 80 72 Q66 52 78 30 Q72 48 83 60 Q78 42 100 12Z"
          fill="url(#flameG)" opacity="0.95"
          animate={{
            d: [
              "M100 12 Q122 42 117 60 Q128 48 122 30 Q134 52 120 72 Q112 82 100 85 Q88 82 80 72 Q66 52 78 30 Q72 48 83 60 Q78 42 100 12Z",
              "M100 8 Q120 40 115 58 Q126 45 120 28 Q132 50 118 70 Q110 80 100 83 Q90 80 82 70 Q68 50 80 28 Q74 45 85 58 Q80 40 100 8Z",
              "M100 12 Q122 42 117 60 Q128 48 122 30 Q134 52 120 72 Q112 82 100 85 Q88 82 80 72 Q66 52 78 30 Q72 48 83 60 Q78 42 100 12Z",
            ],
          }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M100 38 Q112 52 110 64 Q118 56 112 46 Q122 60 112 74 Q108 80 100 82 Q92 80 88 74 Q78 60 88 46 Q82 56 90 64 Q88 52 100 38Z"
          fill="url(#flameInG)" opacity="0.7"
          animate={{
            d: [
              "M100 38 Q112 52 110 64 Q118 56 112 46 Q122 60 112 74 Q108 80 100 82 Q92 80 88 74 Q78 60 88 46 Q82 56 90 64 Q88 52 100 38Z",
              "M100 34 Q110 50 108 62 Q116 54 110 44 Q120 58 110 72 Q106 78 100 80 Q94 78 90 72 Q80 58 90 44 Q84 54 92 62 Q90 50 100 34Z",
              "M100 38 Q112 52 110 64 Q118 56 112 46 Q122 60 112 74 Q108 80 100 82 Q92 80 88 74 Q78 60 88 46 Q82 56 90 64 Q88 52 100 38Z",
            ],
          }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.g>

      {/* ===== BODY: D-shape ===== */}
      <motion.g animate={{ y: [0, 1.5, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}>
        {/* Main D body */}
        <path
          d="M55 82 L55 218 Q55 235 70 235 L95 235 Q155 235 155 162 Q155 82 95 82 L70 82 Q55 82 55 82Z"
          fill="url(#bodyGrad)"
          stroke={glowColor}
          strokeWidth="1.2"
          strokeOpacity="0.25"
        />

        {/* Body sparkles */}
        <motion.circle cx="75" cy="120" r="1.2" fill={accentColor} opacity="0.5"
          animate={{ opacity: [0.2, 0.7, 0.2], scale: [1, 1.6, 1] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        />
        <motion.circle cx="120" cy="140" r="0.9" fill={accentColor} opacity="0.4"
          animate={{ opacity: [0.15, 0.6, 0.15], scale: [1, 1.4, 1] }}
          transition={{ duration: 2.8, repeat: Infinity, delay: 0.6 }}
        />
        <motion.circle cx="85" cy="190" r="1" fill={accentColor} opacity="0.35"
          animate={{ opacity: [0.1, 0.55, 0.1], scale: [1, 1.5, 1] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1.2 }}
        />
        <motion.circle cx="130" cy="175" r="0.7" fill={accentColor} opacity="0.3"
          animate={{ opacity: [0.1, 0.4, 0.1] }}
          transition={{ duration: 3.2, repeat: Infinity, delay: 1.8 }}
        />

        {/* Inner D glow edge */}
        <path
          d="M85 112 L85 202 Q85 212 95 212 L100 212 Q128 212 128 162 Q128 112 100 112 L95 112 Q85 112 85 112Z"
          fill="none" stroke={glowColor} strokeWidth="1.8" strokeOpacity="0.3"
        />

        {/* Small flame icon on belly */}
        <motion.g
          animate={{ opacity: [0.4, 0.85, 0.4], scale: [0.95, 1.08, 0.95] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          style={{ transformOrigin: "105px 185px" }}
        >
          <path
            d="M105 174 Q110 179 108 186 Q113 182 109 176 Q115 183 108 190 Q106 193 105 194 Q104 193 102 190 Q95 183 101 176 Q97 182 102 186 Q100 179 105 174Z"
            fill={glowColor} opacity="0.65"
          />
        </motion.g>

        {/* ===== LEGS ===== */}
        <motion.ellipse cx="80" cy="244" rx="13" ry="9" fill={bodyDark}
          animate={{ rotate: [-2, 2, -2] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "80px 235px" }}
        />
        <ellipse cx="80" cy="244" rx="11" ry="7" fill={bodyPrimary} />
        <motion.ellipse cx="120" cy="244" rx="13" ry="9" fill={bodyDark}
          animate={{ rotate: [2, -2, 2] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          style={{ transformOrigin: "120px 235px" }}
        />
        <ellipse cx="120" cy="244" rx="11" ry="7" fill={bodyPrimary} />

        {/* ===== LEFT ARM ===== */}
        <motion.g
          animate={{ rotate: [-6, 6, -6] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "55px 145px" }}
        >
          <ellipse cx="42" cy="158" rx="15" ry="20" fill={bodyDark} />
          <ellipse cx="42" cy="158" rx="13" ry="17" fill={bodyPrimary} />
        </motion.g>

        {/* ===== RIGHT ARM ===== */}
        <motion.g
          animate={{ rotate: [6, -6, 6] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          style={{ transformOrigin: "145px 145px" }}
        >
          <ellipse cx="158" cy="158" rx="15" ry="20" fill={bodyDark} />
          <ellipse cx="158" cy="158" rx="13" ry="17" fill={bodyPrimary} />
        </motion.g>

        {/* ===== GLASSES ===== */}
        <g filter="url(#gGlow)">
          <ellipse cx="87" cy="145" rx="17" ry="16" fill="none" stroke={glowColor} strokeWidth="2.5" opacity="0.75" />
          <ellipse cx="87" cy="145" rx="15" ry="14" fill={bodyDark} opacity="0.45" />
          <ellipse cx="113" cy="145" rx="17" ry="16" fill="none" stroke={glowColor} strokeWidth="2.5" opacity="0.75" />
          <ellipse cx="113" cy="145" rx="15" ry="14" fill={bodyDark} opacity="0.45" />
          {/* Bridge */}
          <path d="M104 143 Q100 139 96 143" stroke={glowColor} strokeWidth="2" opacity="0.65" fill="none" />
          {/* Temple arms */}
          <path d="M70 142 Q60 138 54 140" stroke={glowColor} strokeWidth="1.8" opacity="0.5" fill="none" />
          <path d="M130 142 Q140 138 146 140" stroke={glowColor} strokeWidth="1.8" opacity="0.5" fill="none" />
          {/* Lens glare */}
          <ellipse cx="82" cy="139" rx="5" ry="3" fill="white" opacity="0.12" transform="rotate(-20, 82, 139)" />
          <ellipse cx="108" cy="139" rx="5" ry="3" fill="white" opacity="0.12" transform="rotate(-20, 108, 139)" />
        </g>

        {/* ===== EYES ===== */}
        {eyeExpression === "happy" ? (
          <>
            <motion.path d="M79 145 Q87 136 95 145" stroke={eyeColor} strokeWidth="3" strokeLinecap="round" fill="none"
              animate={{ d: ["M79 145 Q87 136 95 145", "M79 144 Q87 135 95 144", "M79 145 Q87 136 95 145"] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
            <motion.path d="M105 145 Q113 136 121 145" stroke={eyeColor} strokeWidth="3" strokeLinecap="round" fill="none"
              animate={{ d: ["M105 145 Q113 136 121 145", "M105 144 Q113 135 121 144", "M105 145 Q113 136 121 145"] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
          </>
        ) : (
          <>
            <motion.g
              animate={{ scaleY: [1, 1, 0.06, 1, 1] }}
              transition={{ duration: 4, repeat: Infinity, times: [0, 0.4, 0.47, 0.54, 1] }}
              style={{ transformOrigin: "87px 145px" }}
            >
              <circle cx="87" cy="145" r="8.5" fill="url(#eyeG)" />
              <circle cx="87" cy="145" r="5" fill={bodyDark} />
              <circle cx={eyeExpression === "sad" ? "89" : "85"} cy="142" r="2.2" fill="white" opacity="0.85" />
              <circle cx={eyeExpression === "sad" ? "91" : "88"} cy="145" r="1" fill="white" opacity="0.4" />
            </motion.g>
            <motion.g
              animate={{ scaleY: [1, 1, 0.06, 1, 1] }}
              transition={{ duration: 4, repeat: Infinity, times: [0, 0.4, 0.47, 0.54, 1] }}
              style={{ transformOrigin: "113px 145px" }}
            >
              <circle cx="113" cy="145" r="8.5" fill="url(#eyeG)" />
              <circle cx="113" cy="145" r="5" fill={bodyDark} />
              <circle cx={eyeExpression === "sad" ? "115" : "111"} cy="142" r="2.2" fill="white" opacity="0.85" />
              <circle cx={eyeExpression === "sad" ? "117" : "114"} cy="145" r="1" fill="white" opacity="0.4" />
            </motion.g>
          </>
        )}

        {/* ===== EYEBROWS (sad) ===== */}
        {eyeExpression === "sad" && (
          <>
            <path d="M78 132 Q84 136 94 134" stroke={eyeColor} strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.7" />
            <path d="M122 134 Q116 136 106 132" stroke={eyeColor} strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.7" />
          </>
        )}

        {/* ===== MOUTH ===== */}
        {mouthExpression === "grin" ? (
          <motion.path
            d="M90 168 Q100 180 110 168"
            stroke={mouthColor} strokeWidth="2.5" strokeLinecap="round" fill="none"
            animate={{ d: ["M90 168 Q100 180 110 168", "M91 168 Q100 179 109 168", "M90 168 Q100 180 110 168"] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        ) : mouthExpression === "frown" ? (
          <motion.path
            d="M90 172 Q100 164 110 172"
            stroke={mouthColor} strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.8"
            animate={{ d: ["M90 172 Q100 164 110 172", "M90 173 Q100 165 110 173", "M90 172 Q100 164 110 172"] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
        ) : (
          <motion.path
            d="M93 169 Q100 174 107 169"
            stroke={mouthColor} strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.7"
            animate={{ d: ["M93 169 Q100 174 107 169", "M93 169 Q100 175 107 169", "M93 169 Q100 174 107 169"] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        )}
      </motion.g>
    </svg>
  );
};

export const Mascot3D = ({ mood = "idle", size = "md", className = "" }: Mascot3DProps) => {
  const config = moodConfig[mood];
  const px = sizeMap[size];

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
          bodyPrimary={config.bodyPrimary}
          bodySecondary={config.bodySecondary}
          bodyDark={config.bodyDark}
          glowColor={config.glowColor}
          flameColor1={config.flameColor1}
          flameColor2={config.flameColor2}
          flameColor3={config.flameColor3}
          eyeColor={config.eyeColor}
          accentColor={config.accentColor}
          innerFlame={config.innerFlame}
          mouthColor={config.mouthColor}
        />
      </motion.div>
    </div>
  );
};

export default Mascot3D;
