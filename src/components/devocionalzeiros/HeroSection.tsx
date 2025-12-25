import { motion } from "framer-motion";
import { ChevronDown, BookOpen } from "lucide-react";
import { useEffect, useState } from "react";

// Floating particles component
const FloatingParticles = () => {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-primary/30"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Animated 3D Bible component
const AnimatedBible = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ duration: 1.2, delay: 2.4, ease: "easeOut" }}
      className="relative perspective-1000"
    >
      <motion.div
        className="relative w-28 h-36 md:w-36 md:h-44 mx-auto"
        animate={{
          rotateY: [0, 5, 0, -5, 0],
          rotateX: [0, 2, 0, -2, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Book shadow */}
        <div className="absolute inset-0 bg-primary/20 rounded-lg blur-xl transform translate-y-4 scale-90" />
        
        {/* Book cover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-blue-600 to-primary rounded-lg shadow-2xl border border-primary/30 overflow-hidden">
          {/* Cover texture */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1),transparent_50%)]" />
          </div>
          
          {/* Cross emboss */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-12 h-16 md:w-16 md:h-20">
              <div className="absolute left-1/2 top-0 w-1.5 h-full bg-gradient-to-b from-white/40 via-white/20 to-white/40 -translate-x-1/2 rounded-full" />
              <div className="absolute top-1/4 left-0 w-full h-1.5 bg-gradient-to-r from-white/40 via-white/20 to-white/40 rounded-full" />
            </div>
          </div>
          
          {/* Spine highlight */}
          <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-black/30 to-transparent" />
          
          {/* Bottom text */}
          <div className="absolute bottom-2 left-0 right-0 text-center">
            <span className="text-xs font-medium text-white/60 tracking-wider">BÍBLIA</span>
          </div>
        </div>
        
        {/* Book pages */}
        <div className="absolute right-0 top-1 bottom-1 w-2 bg-gradient-to-l from-gray-100 to-gray-200 rounded-r-sm">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute left-0 w-full h-px bg-gray-300"
              style={{ top: `${(i + 1) * 16}%` }}
            />
          ))}
        </div>
        
        {/* Glow effect */}
        <motion.div
          className="absolute -inset-4 bg-primary/20 rounded-2xl blur-2xl"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </motion.div>
  );
};

const HeroSection = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToExplore = () => {
    const element = document.querySelector("#sobre");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const textLines = [
    { text: "Você não foi chamado para caminhar sozinho.", delay: 0.3 },
    { text: "Constância se constrói em comunidade.", delay: 1.2 },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Dynamic gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-primary/5" />
      
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary) / 0.1) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          x: [0, -20, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Subtle grid */}
      <div className="absolute inset-0 geometric-grid opacity-20" />
      
      {/* Floating particles */}
      {mounted && <FloatingParticles />}
      
      {/* Noise overlay */}
      <div className="absolute inset-0 noise-overlay" />
      
      {/* Geometric accent lines */}
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: 160 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute top-20 left-10 w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent"
      />
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: 200 }}
        transition={{ duration: 1.5, delay: 0.8 }}
        className="absolute top-32 right-16 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent"
      />
      
      <div className="container relative z-10 px-4 sm:px-6 py-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Animated Text Sequence */}
          {textLines.map((line, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: line.delay, ease: "easeOut" }}
              className="text-xl md:text-2xl lg:text-3xl text-foreground/80 mb-6 font-light tracking-wide"
            >
              {line.text}
            </motion.p>
          ))}

          {/* Main Title with staggered letter animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 2 }}
            className="mb-8 mt-10"
          >
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-extrabold tracking-tight">
              <motion.span
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2.1 }}
                className="inline-block text-foreground mr-4"
              >
                BEM-VINDOS
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 2.3 }}
                className="inline-block"
              >
                <span className="bg-gradient-to-r from-primary via-blue-400 to-primary bg-clip-text text-transparent animate-gradient-x">
                  DEVOCIONALZEIROS
                </span>
              </motion.span>
            </h1>
            
            {/* Glowing underline */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 2.6 }}
              className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-6 max-w-md"
            />
          </motion.div>

          {/* Animated 3D Bible */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 2.4 }}
            className="mb-12"
          >
            <AnimatedBible />
          </motion.div>

          {/* CTA Button with impactful hover */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3 }}
          >
            <button
              onClick={scrollToExplore}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(37,99,235,0.5)] hover:scale-105"
            >
              {/* Button glow effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-primary via-blue-400 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Ripple effect on hover */}
              <span className="absolute inset-0 scale-0 group-hover:scale-100 bg-white/10 rounded-xl transition-transform duration-500" />
              
              <span className="relative flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Explorar o Ecossistema
              </span>
              
              <ChevronDown className="relative w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" />
            </button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 3.5 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="cursor-pointer group"
              onClick={scrollToExplore}
            >
              <div className="relative">
                {/* Pulsing ring */}
                <motion.div
                  className="absolute -inset-3 rounded-full border border-primary/30"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <ChevronDown className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
