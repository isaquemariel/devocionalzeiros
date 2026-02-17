import { motion } from "framer-motion";
import mascotBase from "@/assets/mascot-base.png";

type MascotMood = "happy" | "sad" | "champion" | "idle";

interface Mascot3DProps {
  mood?: MascotMood;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: "w-12 h-12",
  md: "w-20 h-20",
  lg: "w-28 h-28",
};

const moodConfig = {
  happy: {
    filter: "drop-shadow(0 0 12px rgba(74,222,128,0.5)) brightness(1.1) saturate(1.2)",
    glowColor: "rgba(74,222,128,0.4)",
    particles: ["✨", "⭐", "🎉"],
    animation: {
      y: [0, -8, 0],
      rotate: [0, 5, -5, 0],
      scale: [1, 1.08, 1],
    },
    transition: { duration: 1.2, repeat: Infinity, ease: "easeInOut" as const },
  },
  sad: {
    filter: "drop-shadow(0 0 8px rgba(239,68,68,0.3)) brightness(0.85) saturate(0.7) grayscale(0.2)",
    glowColor: "rgba(239,68,68,0.25)",
    particles: ["💧"],
    animation: {
      y: [0, 3, 0],
      rotate: [0, -3, 0],
      scale: [1, 0.95, 1],
    },
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" as const },
  },
  champion: {
    filter: "drop-shadow(0 0 20px rgba(251,191,36,0.6)) brightness(1.15) saturate(1.3)",
    glowColor: "rgba(251,191,36,0.5)",
    particles: ["🏆", "✨", "🔥", "⭐"],
    animation: {
      y: [0, -10, 0],
      rotate: [0, 8, -8, 0],
      scale: [1, 1.12, 1],
    },
    transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" as const },
  },
  idle: {
    filter: "drop-shadow(0 0 6px rgba(var(--primary)/0.3))",
    glowColor: "hsl(var(--primary) / 0.2)",
    particles: [],
    animation: {
      y: [0, -4, 0],
      scale: [1, 1.02, 1],
    },
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" as const },
  },
};

const Particle = ({ emoji, index, total }: { emoji: string; index: number; total: number }) => {
  const angle = (360 / total) * index;
  const radius = 40;
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
      transition={{
        duration: 2,
        repeat: Infinity,
        delay: index * 0.3,
        ease: "easeOut",
      }}
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
        style={{
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        }}
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      {mood === "champion" && (
        <motion.div
          className="absolute inset-[-8px] rounded-full border-2"
          style={{ borderColor: color }}
          animate={{
            rotate: 360,
            scale: [1, 1.05, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{ rotate: { duration: 6, repeat: Infinity, ease: "linear" }, scale: { duration: 2, repeat: Infinity }, opacity: { duration: 2, repeat: Infinity } }}
        />
      )}
    </>
  );
};

export const Mascot3D = ({ mood = "idle", size = "md", className = "" }: Mascot3DProps) => {
  const config = moodConfig[mood];

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`} style={{ perspective: "600px" }}>
      {/* Glow ring */}
      <div className={`absolute ${sizeMap[size]}`}>
        <GlowRing color={config.glowColor} mood={mood} />
      </div>

      {/* Particles */}
      {config.particles.map((emoji, i) => (
        <Particle key={`${emoji}-${i}`} emoji={emoji} index={i} total={config.particles.length} />
      ))}

      {/* 3D Mascot */}
      <motion.div
        className={`relative ${sizeMap[size]}`}
        style={{ transformStyle: "preserve-3d" }}
        animate={config.animation}
        transition={config.transition}
      >
        <motion.img
          src={mascotBase}
          alt="Mascote Devocionalzeiros"
          className="w-full h-full object-contain"
          style={{ filter: config.filter }}
          initial={{ scale: 0, rotateY: -180 }}
          animate={{ scale: 1, rotateY: 0 }}
          transition={{ type: "spring", damping: 12, stiffness: 200 }}
        />

        {/* Mood overlay effects */}
        {mood === "sad" && (
          <motion.div
            className="absolute top-0 right-1 text-lg"
            animate={{ y: [0, 15, 30], opacity: [1, 0.7, 0], scale: [1, 0.8, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
          >
            💧
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Mascot3D;
