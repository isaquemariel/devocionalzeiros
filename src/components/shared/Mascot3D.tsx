import { motion } from "framer-motion";
import mascotVideo from "@/assets/mascot-3d.mp4";

type MascotMood = "happy" | "sad" | "champion" | "idle";

interface Mascot3DProps {
  mood?: MascotMood;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: { container: "w-16 h-16", video: "w-20 h-20" },
  md: { container: "w-24 h-24", video: "w-28 h-28" },
  lg: { container: "w-32 h-32", video: "w-36 h-36" },
};

const moodConfig = {
  happy: {
    glowColor: "rgba(74,222,128,0.4)",
    particles: ["✨", "⭐", "🎉"],
    animation: {
      y: [0, -6, 0],
      scale: [1, 1.05, 1],
    },
    transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" as const },
  },
  sad: {
    glowColor: "rgba(239,68,68,0.25)",
    particles: ["💧"],
    animation: {
      y: [0, 3, 0],
      scale: [1, 0.96, 1],
    },
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" as const },
  },
  champion: {
    glowColor: "rgba(251,191,36,0.5)",
    particles: ["🏆", "✨", "🔥", "⭐"],
    animation: {
      y: [0, -8, 0],
      scale: [1, 1.08, 1],
    },
    transition: { duration: 1.2, repeat: Infinity, ease: "easeInOut" as const },
  },
  idle: {
    glowColor: "hsl(var(--primary) / 0.2)",
    particles: [],
    animation: {
      y: [0, -3, 0],
      scale: [1, 1.02, 1],
    },
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" as const },
  },
};

const Particle = ({ emoji, index, total }: { emoji: string; index: number; total: number }) => {
  const angle = (360 / total) * index;
  const radius = 45;
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
        duration: 2.5,
        repeat: Infinity,
        delay: index * 0.4,
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
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      {mood === "champion" && (
        <motion.div
          className="absolute inset-[-6px] rounded-full border-2"
          style={{ borderColor: color }}
          animate={{
            rotate: 360,
            scale: [1, 1.05, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
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

export const Mascot3D = ({ mood = "idle", size = "md", className = "" }: Mascot3DProps) => {
  const config = moodConfig[mood];
  const sizes = sizeMap[size];

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {/* Glow ring */}
      <div className={`absolute ${sizes.container}`}>
        <GlowRing color={config.glowColor} mood={mood} />
      </div>

      {/* Particles */}
      {config.particles.map((emoji, i) => (
        <Particle key={`${emoji}-${i}`} emoji={emoji} index={i} total={config.particles.length} />
      ))}

      {/* 3D Mascot Video */}
      <motion.div
        className={`relative ${sizes.container} overflow-hidden rounded-full`}
        animate={config.animation}
        transition={config.transition}
      >
        <motion.video
          src={mascotVideo}
          autoPlay
          loop
          muted
          playsInline
          className={`${sizes.video} object-cover absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 12, stiffness: 200 }}
        />
      </motion.div>
    </div>
  );
};

export default Mascot3D;
