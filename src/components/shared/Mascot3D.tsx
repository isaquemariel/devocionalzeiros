import { motion } from "framer-motion";

type MascotMood = "happy" | "sad" | "champion" | "idle";

interface Mascot3DProps {
  mood?: MascotMood;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: 80,
  md: 120,
  lg: 160,
};

const moodConfig = {
  happy: {
    glowColor: "rgba(0,180,255,0.4)",
    particles: ["✨", "⭐", "🎉"],
    flameIntensity: 1.2,
    eyeExpression: "happy" as const,
    mouthExpression: "smile" as const,
    animation: { y: [0, -6, 0], scale: [1, 1.05, 1] },
    transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" as const },
  },
  sad: {
    glowColor: "rgba(239,68,68,0.25)",
    particles: ["💧"],
    flameIntensity: 0.5,
    eyeExpression: "sad" as const,
    mouthExpression: "frown" as const,
    animation: { y: [0, 3, 0], scale: [1, 0.96, 1] },
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" as const },
  },
  champion: {
    glowColor: "rgba(0,180,255,0.5)",
    particles: ["🏆", "✨", "🔥", "⭐"],
    flameIntensity: 1.5,
    eyeExpression: "happy" as const,
    mouthExpression: "grin" as const,
    animation: { y: [0, -8, 0], scale: [1, 1.08, 1] },
    transition: { duration: 1.2, repeat: Infinity, ease: "easeInOut" as const },
  },
  idle: {
    glowColor: "rgba(0,150,255,0.15)",
    particles: [],
    flameIntensity: 1,
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

const GlowRing = ({ color, mood }: { color: string; mood: MascotMood }) => {
  if (mood === "idle") return null;
  return (
    <>
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ background: `radial-gradient(circle, ${color} 0%, transparent 70%)` }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.4, 0.15] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      {mood === "champion" && (
        <motion.div
          className="absolute inset-[-6px] rounded-full border-2"
          style={{ borderColor: color }}
          animate={{ rotate: 360, scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{
            rotate: { duration: 6, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity },
            opacity: { duration: 2, repeat: Infinity },
          }}
        />
      )}
    </>
  );
};

const MascotSVG = ({
  eyeExpression,
  mouthExpression,
  flameIntensity,
}: {
  eyeExpression: "happy" | "sad" | "neutral";
  mouthExpression: "smile" | "frown" | "grin" | "neutral";
  flameIntensity: number;
}) => {
  return (
    <svg viewBox="0 0 220 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id="bodyGrad" cx="0.45" cy="0.4" r="0.6">
          <stop offset="0%" stopColor="#2A3A5C" />
          <stop offset="50%" stopColor="#1A2744" />
          <stop offset="100%" stopColor="#0F1B30" />
        </radialGradient>
        <radialGradient id="glowEdge" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#00B4FF" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#00B4FF" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="flameGrad" x1="0.5" y1="1" x2="0.5" y2="0">
          <stop offset="0%" stopColor="#00B4FF" />
          <stop offset="40%" stopColor="#00D4FF" />
          <stop offset="70%" stopColor="#80EAFF" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="flameInner" x1="0.5" y1="1" x2="0.5" y2="0">
          <stop offset="0%" stopColor="#0090DD" />
          <stop offset="100%" stopColor="#00D4FF" stopOpacity="0.5" />
        </linearGradient>
        <radialGradient id="eyeGrad" cx="0.4" cy="0.35" r="0.6">
          <stop offset="0%" stopColor="#60CFFF" />
          <stop offset="50%" stopColor="#00A0E0" />
          <stop offset="100%" stopColor="#005A8C" />
        </radialGradient>
        <radialGradient id="sparkle" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#00D4FF" stopOpacity="0" />
        </radialGradient>
        <filter id="flameGlow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="bodyGlow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="glassGlow">
          <feGaussianBlur stdDeviation="1" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ========== FLAME ON TOP ========== */}
      <motion.g
        filter="url(#flameGlow)"
        animate={{
          scaleY: [0.95 * flameIntensity, 1.1 * flameIntensity, 0.95 * flameIntensity],
          scaleX: [1, 0.95, 1],
        }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "110px 95px" }}
      >
        {/* Outer flame */}
        <motion.path
          d="M110 20 Q130 50 125 70 Q135 55 130 35 Q140 60 128 80 Q120 92 110 95 Q100 92 92 80 Q80 60 90 35 Q85 55 95 70 Q90 50 110 20Z"
          fill="url(#flameGrad)"
          opacity="0.9"
          animate={{
            d: [
              "M110 20 Q130 50 125 70 Q135 55 130 35 Q140 60 128 80 Q120 92 110 95 Q100 92 92 80 Q80 60 90 35 Q85 55 95 70 Q90 50 110 20Z",
              "M110 15 Q128 48 123 68 Q133 52 128 32 Q138 58 126 78 Q118 90 110 93 Q102 90 94 78 Q82 58 92 32 Q87 52 97 68 Q92 48 110 15Z",
              "M110 20 Q130 50 125 70 Q135 55 130 35 Q140 60 128 80 Q120 92 110 95 Q100 92 92 80 Q80 60 90 35 Q85 55 95 70 Q90 50 110 20Z",
            ],
          }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Inner flame */}
        <motion.path
          d="M110 45 Q120 60 118 75 Q125 65 120 55 Q128 70 118 82 Q114 90 110 92 Q106 90 102 82 Q92 70 100 55 Q95 65 102 75 Q100 60 110 45Z"
          fill="url(#flameInner)"
          opacity="0.7"
          animate={{
            d: [
              "M110 45 Q120 60 118 75 Q125 65 120 55 Q128 70 118 82 Q114 90 110 92 Q106 90 102 82 Q92 70 100 55 Q95 65 102 75 Q100 60 110 45Z",
              "M110 40 Q118 58 116 73 Q123 63 118 53 Q126 68 116 80 Q112 88 110 90 Q108 88 104 80 Q94 68 102 53 Q97 63 104 73 Q102 58 110 40Z",
              "M110 45 Q120 60 118 75 Q125 65 120 55 Q128 70 118 82 Q114 90 110 92 Q106 90 102 82 Q92 70 100 55 Q95 65 102 75 Q100 60 110 45Z",
            ],
          }}
          transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.g>

      {/* ========== BODY: Letter D shape ========== */}
      <motion.g
        animate={{ y: [0, 1, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Main D body - left flat side + right rounded */}
        <path
          d="M65 95 L65 235 Q65 248 78 248 L105 248 Q165 248 165 175 Q165 95 105 95 L78 95 Q65 95 65 95Z"
          fill="url(#bodyGrad)"
          stroke="#00B4FF"
          strokeWidth="1.5"
          strokeOpacity="0.3"
        />

        {/* Subtle body sparkles */}
        <motion.circle cx="85" cy="130" r="1.5" fill="#00D4FF" opacity="0.4"
          animate={{ opacity: [0.2, 0.6, 0.2], scale: [1, 1.5, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0 }}
        />
        <motion.circle cx="130" cy="150" r="1" fill="#00D4FF" opacity="0.3"
          animate={{ opacity: [0.1, 0.5, 0.1], scale: [1, 1.3, 1] }}
          transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
        />
        <motion.circle cx="95" cy="200" r="1.2" fill="#00D4FF" opacity="0.3"
          animate={{ opacity: [0.15, 0.5, 0.15], scale: [1, 1.4, 1] }}
          transition={{ duration: 2.8, repeat: Infinity, delay: 1 }}
        />
        <motion.circle cx="140" cy="190" r="0.8" fill="#00D4FF" opacity="0.2"
          animate={{ opacity: [0.1, 0.4, 0.1] }}
          transition={{ duration: 3.5, repeat: Infinity, delay: 1.5 }}
        />

        {/* Inner D cutout glow line */}
        <path
          d="M95 125 L95 215 Q95 225 105 225 L110 225 Q135 225 135 175 Q135 125 110 125 L105 125 Q95 125 95 125Z"
          fill="none"
          stroke="#00B4FF"
          strokeWidth="2"
          strokeOpacity="0.35"
        />

        {/* Small flame icon on body */}
        <motion.g
          animate={{ opacity: [0.5, 0.9, 0.5], scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ transformOrigin: "115px 195px" }}
        >
          <path
            d="M115 185 Q120 190 118 196 Q122 192 119 187 Q124 193 118 200 Q116 203 115 204 Q114 203 112 200 Q106 193 111 187 Q108 192 112 196 Q110 190 115 185Z"
            fill="#00B4FF"
            opacity="0.7"
          />
        </motion.g>

        {/* ========== LEGS ========== */}
        <motion.g
          animate={{ rotate: [-1, 1, -1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "95px 248px" }}
        >
          <ellipse cx="90" cy="258" rx="12" ry="8" fill="#0F1B30" />
          <ellipse cx="90" cy="258" rx="10" ry="6" fill="#1A2744" />
        </motion.g>
        <motion.g
          animate={{ rotate: [1, -1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          style={{ transformOrigin: "130px 248px" }}
        >
          <ellipse cx="130" cy="258" rx="12" ry="8" fill="#0F1B30" />
          <ellipse cx="130" cy="258" rx="10" ry="6" fill="#1A2744" />
        </motion.g>

        {/* ========== LEFT ARM ========== */}
        <motion.g
          animate={{
            rotate: [-5, 5, -5],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "65px 150px" }}
        >
          <ellipse cx="52" cy="170" rx="14" ry="18" fill="#0F1B30" />
          <ellipse cx="52" cy="170" rx="12" ry="16" fill="#1A2744" />
        </motion.g>

        {/* ========== RIGHT ARM ========== */}
        <motion.g
          animate={{
            rotate: [5, -5, 5],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          style={{ transformOrigin: "155px 150px" }}
        >
          <ellipse cx="168" cy="170" rx="14" ry="18" fill="#0F1B30" />
          <ellipse cx="168" cy="170" rx="12" ry="16" fill="#1A2744" />
        </motion.g>

        {/* ========== GLASSES ========== */}
        <g filter="url(#glassGlow)">
          {/* Left lens */}
          <ellipse cx="95" cy="155" rx="16" ry="15" fill="none" stroke="#00B4FF" strokeWidth="2.5" opacity="0.8" />
          <ellipse cx="95" cy="155" rx="14" ry="13" fill="#0A1628" opacity="0.5" />
          {/* Right lens */}
          <ellipse cx="130" cy="155" rx="16" ry="15" fill="none" stroke="#00B4FF" strokeWidth="2.5" opacity="0.8" />
          <ellipse cx="130" cy="155" rx="14" ry="13" fill="#0A1628" opacity="0.5" />
          {/* Bridge */}
          <path d="M111 155 Q112.5 150 114 155" stroke="#00B4FF" strokeWidth="2" opacity="0.7" fill="none" />
          {/* Temple arms */}
          <path d="M79 152 Q70 148 65 150" stroke="#00B4FF" strokeWidth="2" opacity="0.6" fill="none" />
          <path d="M146 152 Q155 148 160 150" stroke="#00B4FF" strokeWidth="2" opacity="0.6" fill="none" />
          {/* Lens glare */}
          <ellipse cx="89" cy="149" rx="4" ry="2.5" fill="white" opacity="0.15" transform="rotate(-15, 89, 149)" />
          <ellipse cx="124" cy="149" rx="4" ry="2.5" fill="white" opacity="0.15" transform="rotate(-15, 124, 149)" />
        </g>

        {/* ========== EYES (inside glasses) ========== */}
        <g>
          {eyeExpression === "happy" ? (
            <>
              <motion.path
                d="M88 155 Q95 148 102 155"
                stroke="#00D4FF" strokeWidth="3" strokeLinecap="round" fill="none"
                animate={{ d: ["M88 155 Q95 148 102 155", "M88 154 Q95 147 102 154", "M88 155 Q95 148 102 155"] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.path
                d="M123 155 Q130 148 137 155"
                stroke="#00D4FF" strokeWidth="3" strokeLinecap="round" fill="none"
                animate={{ d: ["M123 155 Q130 148 137 155", "M123 154 Q130 147 137 154", "M123 155 Q130 148 137 155"] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </>
          ) : (
            <>
              {/* Left eye */}
              <motion.g
                animate={{ scaleY: [1, 1, 0.08, 1, 1] }}
                transition={{ duration: 4, repeat: Infinity, times: [0, 0.42, 0.48, 0.54, 1] }}
                style={{ transformOrigin: "95px 155px" }}
              >
                <circle cx="95" cy="155" r="8" fill="url(#eyeGrad)" />
                <circle cx="95" cy="155" r="4.5" fill="#0A1628" />
                <circle cx={eyeExpression === "sad" ? "97" : "93"} cy="152" r="2" fill="white" opacity="0.8" />
                <circle cx={eyeExpression === "sad" ? "99" : "96"} cy="155" r="1" fill="white" opacity="0.4" />
              </motion.g>
              {/* Right eye */}
              <motion.g
                animate={{ scaleY: [1, 1, 0.08, 1, 1] }}
                transition={{ duration: 4, repeat: Infinity, times: [0, 0.42, 0.48, 0.54, 1] }}
                style={{ transformOrigin: "130px 155px" }}
              >
                <circle cx="130" cy="155" r="8" fill="url(#eyeGrad)" />
                <circle cx="130" cy="155" r="4.5" fill="#0A1628" />
                <circle cx={eyeExpression === "sad" ? "132" : "128"} cy="152" r="2" fill="white" opacity="0.8" />
                <circle cx={eyeExpression === "sad" ? "134" : "131"} cy="155" r="1" fill="white" opacity="0.4" />
              </motion.g>
            </>
          )}
        </g>

        {/* ========== MOUTH ========== */}
        {mouthExpression === "grin" ? (
          <motion.path
            d="M100 178 Q112 190 125 178"
            stroke="#00B4FF" strokeWidth="2.5" strokeLinecap="round" fill="none"
            animate={{ d: ["M100 178 Q112 190 125 178", "M101 178 Q112 189 124 178", "M100 178 Q112 190 125 178"] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        ) : mouthExpression === "smile" ? (
          <motion.path
            d="M102 178 Q112 186 122 178"
            stroke="#00B4FF" strokeWidth="2" strokeLinecap="round" fill="none"
            animate={{ d: ["M102 178 Q112 186 122 178", "M103 178 Q112 185 121 178", "M102 178 Q112 186 122 178"] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
        ) : mouthExpression === "frown" ? (
          <path d="M102 182 Q112 176 122 182" stroke="#4080AA" strokeWidth="2" strokeLinecap="round" fill="none" />
        ) : (
          <motion.path
            d="M104 179 Q112 183 120 179"
            stroke="#00B4FF" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.7"
            animate={{ d: ["M104 179 Q112 183 120 179", "M104 179 Q112 184 120 179", "M104 179 Q112 183 120 179"] }}
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
    <div className={`relative inline-flex items-center justify-center ${className}`} style={{ width: px, height: px * 1.2 }}>
      {/* Glow ring */}
      <div className="absolute inset-0">
        <GlowRing color={config.glowColor} mood={mood} />
      </div>

      {/* Particles */}
      {config.particles.map((emoji, i) => (
        <Particle key={`${emoji}-${i}`} emoji={emoji} index={i} total={config.particles.length} />
      ))}

      {/* Animated mascot */}
      <motion.div
        className="relative w-full h-full"
        animate={config.animation}
        transition={config.transition}
        style={{ filter: "drop-shadow(0 4px 25px rgba(0, 180, 255, 0.25))" }}
      >
        <MascotSVG
          eyeExpression={config.eyeExpression}
          mouthExpression={config.mouthExpression}
          flameIntensity={config.flameIntensity}
        />
      </motion.div>
    </div>
  );
};

export default Mascot3D;
