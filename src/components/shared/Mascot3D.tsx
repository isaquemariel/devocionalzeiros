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
    glowColor: "rgba(74,222,128,0.4)",
    particles: ["✨", "⭐", "🎉"],
    bodyColor: "#5B4A3F",
    robeColor: "#E8D5B7",
    accentColor: "#F5E6D3",
    eyeExpression: "happy" as const,
    mouthExpression: "smile" as const,
    animation: { y: [0, -6, 0], scale: [1, 1.05, 1] },
    transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" as const },
  },
  sad: {
    glowColor: "rgba(239,68,68,0.25)",
    particles: ["💧"],
    bodyColor: "#5B4A3F",
    robeColor: "#D4C4A8",
    accentColor: "#E8D5B7",
    eyeExpression: "sad" as const,
    mouthExpression: "frown" as const,
    animation: { y: [0, 3, 0], scale: [1, 0.96, 1] },
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" as const },
  },
  champion: {
    glowColor: "rgba(251,191,36,0.5)",
    particles: ["🏆", "✨", "🔥", "⭐"],
    bodyColor: "#5B4A3F",
    robeColor: "#F0E0C8",
    accentColor: "#FFD700",
    eyeExpression: "happy" as const,
    mouthExpression: "grin" as const,
    animation: { y: [0, -8, 0], scale: [1, 1.08, 1] },
    transition: { duration: 1.2, repeat: Infinity, ease: "easeInOut" as const },
  },
  idle: {
    glowColor: "hsl(var(--primary) / 0.2)",
    particles: [],
    bodyColor: "#5B4A3F",
    robeColor: "#E8D5B7",
    accentColor: "#F5E6D3",
    eyeExpression: "neutral" as const,
    mouthExpression: "neutral" as const,
    animation: { y: [0, -3, 0], scale: [1, 1.02, 1] },
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" as const },
  },
};

// Particle component
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

// Glow ring behind mascot
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

// SVG Mascot character
const MascotSVG = ({
  eyeExpression,
  mouthExpression,
  robeColor,
  accentColor,
}: {
  eyeExpression: "happy" | "sad" | "neutral";
  mouthExpression: "smile" | "frown" | "grin" | "neutral";
  robeColor: string;
  accentColor: string;
}) => {
  return (
    <svg viewBox="0 0 200 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        {/* Soft ambient light gradient */}
        <radialGradient id="skinGrad" cx="0.5" cy="0.35" r="0.55">
          <stop offset="0%" stopColor="#F5D6B8" />
          <stop offset="60%" stopColor="#E8BA94" />
          <stop offset="100%" stopColor="#D4A07A" />
        </radialGradient>
        <radialGradient id="robeGrad" cx="0.5" cy="0.3" r="0.7">
          <stop offset="0%" stopColor={accentColor} />
          <stop offset="100%" stopColor={robeColor} />
        </radialGradient>
        <linearGradient id="hairGrad" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor="#4A3728" />
          <stop offset="100%" stopColor="#3A2A1E" />
        </linearGradient>
        {/* Cross glow */}
        <radialGradient id="crossGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#FFD700" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Body / Robe */}
      <motion.path
        d="M60 130 Q60 115 75 110 L100 105 L125 110 Q140 115 140 130 L145 210 Q145 225 130 228 L70 228 Q55 225 55 210 Z"
        fill="url(#robeGrad)"
        stroke="#C4A882"
        strokeWidth="1"
        animate={{ d: [
          "M60 130 Q60 115 75 110 L100 105 L125 110 Q140 115 140 130 L145 210 Q145 225 130 228 L70 228 Q55 225 55 210 Z",
          "M61 130 Q61 115 75 111 L100 106 L125 111 Q139 115 139 130 L144 210 Q144 225 130 227 L70 227 Q56 225 56 210 Z",
          "M60 130 Q60 115 75 110 L100 105 L125 110 Q140 115 140 130 L145 210 Q145 225 130 228 L70 228 Q55 225 55 210 Z",
        ]}}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Robe fold lines */}
      <path d="M85 140 Q90 180 88 220" stroke="#C4A882" strokeWidth="0.8" opacity="0.4" fill="none" />
      <path d="M115 140 Q110 180 112 220" stroke="#C4A882" strokeWidth="0.8" opacity="0.4" fill="none" />
      <path d="M95 160 Q100 190 98 225" stroke="#C4A882" strokeWidth="0.5" opacity="0.3" fill="none" />

      {/* Robe collar / neckline */}
      <path d="M80 112 Q100 120 120 112" stroke="#C4A882" strokeWidth="1.5" fill="none" />

      {/* Small cross necklace */}
      <g>
        <circle cx="100" cy="130" r="8" fill="url(#crossGlow)" />
        <motion.g
          animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <rect x="98.5" y="124" width="3" height="14" rx="1" fill="#DAA520" />
          <rect x="94" y="128" width="12" height="3" rx="1" fill="#DAA520" />
        </motion.g>
      </g>

      {/* Neck */}
      <ellipse cx="100" cy="105" rx="12" ry="8" fill="url(#skinGrad)" />

      {/* Head */}
      <motion.ellipse
        cx="100"
        cy="70"
        rx="38"
        ry="42"
        fill="url(#skinGrad)"
        animate={{ ry: [42, 42.5, 42] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Ears */}
      <ellipse cx="62" cy="72" rx="7" ry="10" fill="#E8BA94" />
      <ellipse cx="62" cy="72" rx="4" ry="7" fill="#D4A07A" opacity="0.5" />
      <ellipse cx="138" cy="72" rx="7" ry="10" fill="#E8BA94" />
      <ellipse cx="138" cy="72" rx="4" ry="7" fill="#D4A07A" opacity="0.5" />

      {/* Hair */}
      <path
        d="M62 60 Q62 28 100 25 Q138 28 138 60 Q138 45 125 38 Q110 32 100 33 Q90 32 75 38 Q62 45 62 60Z"
        fill="url(#hairGrad)"
      />
      {/* Hair detail strands */}
      <path d="M75 35 Q80 30 85 33" stroke="#5A4030" strokeWidth="0.8" fill="none" opacity="0.5" />
      <path d="M110 33 Q115 28 122 35" stroke="#5A4030" strokeWidth="0.8" fill="none" opacity="0.5" />

      {/* Eyebrows */}
      {eyeExpression === "sad" ? (
        <>
          <path d="M78 54 Q83 56 90 55" stroke="#4A3728" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          <path d="M110 55 Q117 56 122 54" stroke="#4A3728" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        </>
      ) : (
        <>
          <motion.path
            d="M78 55 Q84 51 90 53"
            stroke="#4A3728" strokeWidth="1.8" strokeLinecap="round" fill="none"
            animate={{ d: ["M78 55 Q84 51 90 53", "M78 54 Q84 50 90 52", "M78 55 Q84 51 90 53"] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.path
            d="M110 53 Q116 51 122 55"
            stroke="#4A3728" strokeWidth="1.8" strokeLinecap="round" fill="none"
            animate={{ d: ["M110 53 Q116 51 122 55", "M110 52 Q116 50 122 54", "M110 53 Q116 51 122 55"] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </>
      )}

      {/* Eyes */}
      <g>
        {eyeExpression === "happy" ? (
          <>
            {/* Happy closed eyes (arcs) */}
            <motion.path
              d="M80 64 Q85 60 90 64"
              stroke="#3A2A1E" strokeWidth="2.5" strokeLinecap="round" fill="none"
              animate={{ d: ["M80 64 Q85 60 90 64", "M80 63 Q85 59 90 63", "M80 64 Q85 60 90 64"] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.path
              d="M110 64 Q115 60 120 64"
              stroke="#3A2A1E" strokeWidth="2.5" strokeLinecap="round" fill="none"
              animate={{ d: ["M110 64 Q115 60 120 64", "M110 63 Q115 59 120 63", "M110 64 Q115 60 120 64"] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </>
        ) : (
          <>
            {/* Open eyes with blinking */}
            <motion.g
              animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
              transition={{ duration: 4, repeat: Infinity, times: [0, 0.45, 0.5, 0.55, 1] }}
              style={{ transformOrigin: "85px 65px" }}
            >
              <ellipse cx="85" cy="65" rx="6" ry="7" fill="white" />
              <ellipse cx={eyeExpression === "sad" ? "86" : "85"} cy="65" rx="3.5" ry="4" fill="#3A2A1E" />
              <ellipse cx={eyeExpression === "sad" ? "87" : "86"} cy="63.5" rx="1.5" ry="1.5" fill="white" />
            </motion.g>
            <motion.g
              animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
              transition={{ duration: 4, repeat: Infinity, times: [0, 0.45, 0.5, 0.55, 1] }}
              style={{ transformOrigin: "115px 65px" }}
            >
              <ellipse cx="115" cy="65" rx="6" ry="7" fill="white" />
              <ellipse cx={eyeExpression === "sad" ? "116" : "115"} cy="65" rx="3.5" ry="4" fill="#3A2A1E" />
              <ellipse cx={eyeExpression === "sad" ? "117" : "116"} cy="63.5" rx="1.5" ry="1.5" fill="white" />
            </motion.g>
          </>
        )}
      </g>

      {/* Nose */}
      <ellipse cx="100" cy="74" rx="3" ry="2" fill="#D4A07A" opacity="0.6" />

      {/* Mouth */}
      {mouthExpression === "grin" ? (
        <motion.path
          d="M88 82 Q100 95 112 82"
          stroke="#C4756A" strokeWidth="2" strokeLinecap="round" fill="#E8918A" fillOpacity="0.3"
          animate={{ d: ["M88 82 Q100 95 112 82", "M89 82 Q100 94 111 82", "M88 82 Q100 95 112 82"] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      ) : mouthExpression === "smile" ? (
        <motion.path
          d="M90 82 Q100 90 110 82"
          stroke="#C4756A" strokeWidth="2" strokeLinecap="round" fill="none"
          animate={{ d: ["M90 82 Q100 90 110 82", "M91 82 Q100 89 109 82", "M90 82 Q100 90 110 82"] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
      ) : mouthExpression === "frown" ? (
        <path d="M90 86 Q100 80 110 86" stroke="#C4756A" strokeWidth="2" strokeLinecap="round" fill="none" />
      ) : (
        <motion.path
          d="M92 83 Q100 86 108 83"
          stroke="#C4756A" strokeWidth="1.8" strokeLinecap="round" fill="none"
          animate={{ d: ["M92 83 Q100 86 108 83", "M92 83 Q100 87 108 83", "M92 83 Q100 86 108 83"] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      )}

      {/* Cheek blush */}
      <ellipse cx="74" cy="76" rx="8" ry="5" fill="#F5A89A" opacity="0.25" />
      <ellipse cx="126" cy="76" rx="8" ry="5" fill="#F5A89A" opacity="0.25" />

      {/* Arms */}
      <motion.path
        d="M60 135 Q45 155 50 175 Q52 180 58 178 Q60 170 65 155"
        fill="url(#robeGrad)" stroke="#C4A882" strokeWidth="0.8"
        animate={{
          d: [
            "M60 135 Q45 155 50 175 Q52 180 58 178 Q60 170 65 155",
            "M60 136 Q44 154 49 174 Q51 179 57 177 Q59 169 65 154",
            "M60 135 Q45 155 50 175 Q52 180 58 178 Q60 170 65 155",
          ],
        }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Left hand */}
      <ellipse cx="54" cy="177" rx="6" ry="5" fill="url(#skinGrad)" />

      <motion.path
        d="M140 135 Q155 155 150 175 Q148 180 142 178 Q140 170 135 155"
        fill="url(#robeGrad)" stroke="#C4A882" strokeWidth="0.8"
        animate={{
          d: [
            "M140 135 Q155 155 150 175 Q148 180 142 178 Q140 170 135 155",
            "M140 136 Q156 154 151 174 Q149 179 143 177 Q141 169 135 154",
            "M140 135 Q155 155 150 175 Q148 180 142 178 Q140 170 135 155",
          ],
        }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
      />
      {/* Right hand */}
      <ellipse cx="146" cy="177" rx="6" ry="5" fill="url(#skinGrad)" />

      {/* Small book in hand (for champion/happy) */}
      {(mouthExpression === "grin" || mouthExpression === "smile") && (
        <motion.g
          animate={{ rotate: [-3, 3, -3] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ transformOrigin: "148px 172px" }}
        >
          <rect x="140" y="168" width="14" height="10" rx="1" fill="#8B4513" />
          <rect x="141" y="169" width="12" height="8" rx="0.5" fill="#F5E6D3" />
          <line x1="147" y1="169" x2="147" y2="177" stroke="#8B4513" strokeWidth="0.5" />
        </motion.g>
      )}
    </svg>
  );
};

export const Mascot3D = ({ mood = "idle", size = "md", className = "" }: Mascot3DProps) => {
  const config = moodConfig[mood];
  const px = sizeMap[size];

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`} style={{ width: px, height: px }}>
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
        style={{ filter: "drop-shadow(0 6px 20px rgba(90, 74, 63, 0.3))" }}
      >
        <MascotSVG
          eyeExpression={config.eyeExpression}
          mouthExpression={config.mouthExpression}
          robeColor={config.robeColor}
          accentColor={config.accentColor}
        />
      </motion.div>
    </div>
  );
};

export default Mascot3D;
