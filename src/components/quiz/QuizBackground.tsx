import { motion } from "framer-motion";

export const QuizBackground = () => {
  const questionMarks = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 5,
    duration: 15 + Math.random() * 10,
    size: 20 + Math.random() * 40,
    opacity: 0.03 + Math.random() * 0.07,
  }));

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-950/40 via-background to-purple-950/30" />
      
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-0 -left-20 w-96 h-96 bg-amber-500/20 rounded-full blur-[120px]"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-0 -right-20 w-80 h-80 bg-purple-500/20 rounded-full blur-[100px]"
        animate={{
          x: [0, -40, 0],
          y: [0, -50, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-64 h-64 bg-primary/15 rounded-full blur-[80px]"
        animate={{
          x: [-100, 100, -100],
          y: [-50, 50, -50],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating question marks */}
      {questionMarks.map((mark) => (
        <motion.div
          key={mark.id}
          className="absolute text-amber-400 font-bold select-none"
          style={{
            left: mark.left,
            fontSize: mark.size,
            opacity: mark.opacity,
            bottom: -100,
          }}
          animate={{
            y: [0, -window.innerHeight - 200],
            rotate: [0, 360],
            opacity: [0, mark.opacity, mark.opacity, 0],
          }}
          transition={{
            duration: mark.duration,
            repeat: Infinity,
            delay: mark.delay,
            ease: "linear",
          }}
        >
          ?
        </motion.div>
      ))}

      {/* Static decorative question marks */}
      <div className="absolute top-20 left-10 text-6xl text-amber-500/10 font-bold rotate-12">?</div>
      <div className="absolute top-40 right-16 text-8xl text-purple-500/10 font-bold -rotate-12">?</div>
      <div className="absolute bottom-32 left-20 text-7xl text-primary/10 font-bold rotate-45">?</div>
      <div className="absolute bottom-20 right-10 text-5xl text-amber-400/10 font-bold -rotate-30">?</div>
      <div className="absolute top-1/3 right-1/4 text-9xl text-amber-500/5 font-bold rotate-6">?</div>

      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};
