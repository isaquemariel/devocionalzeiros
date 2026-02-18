import { motion } from "framer-motion";
import { useState, memo } from "react";
import { PremiumButton } from "@/components/ui/premium-button";
import { ArrowRight, BookOpen, Trophy, Users, Sparkles } from "lucide-react";
import heroBibleImage from "@/assets/hero-bible-image.png";

const FloatingBadge = memo(({ 
  children, 
  animation, 
  className,
  delay = 0 
}: { 
  children: React.ReactNode; 
  animation: { y: number[]; rotate?: number[] };
  className: string;
  delay?: number;
}) => (
  <motion.div
    animate={animation}
    transition={{ 
      duration: animation.rotate ? 4 : 3.5, 
      repeat: Infinity,
      ease: "easeInOut",
      delay
    }}
    className={className}
  >
    {children}
  </motion.div>
));

FloatingBadge.displayName = 'FloatingBadge';

const HeroSection = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const highlights = [
    { icon: Trophy, text: "Sistema de pontos e ranking" },
    { icon: Users, text: "Comunidade engajada" },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16">
      {/* Full-screen background image with overlay */}
      <div className="absolute inset-0">
        <img
          src={heroBibleImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center scale-110 blur-[2px]"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
      </div>

      <div className="absolute inset-0 geometric-grid opacity-10" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/15 rounded-full blur-[120px] animate-glow-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-[100px] animate-glow-pulse" style={{ animationDelay: "1.5s" }} />

      <div className="container relative z-10 px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left order-2 lg:order-1"
          >
            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black max-w-xl mx-auto lg:mx-0 mb-5 leading-[1.1] tracking-tight uppercase"
            >
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="block text-white"
              >
                SEJAM BEM-VINDOS À
              </motion.span>
              <motion.span
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, type: "spring", stiffness: 100 }}
                className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-[shimmer_3s_linear_infinite]"
              >
                PLATAFORMA DEVOCIONALZEIROS
              </motion.span>
            </motion.h1>

            {/* Sub headline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="text-base md:text-lg text-white/80 max-w-lg mx-auto lg:mx-0 mb-6 leading-relaxed"
            >
              O melhor aplicativo Cristão da atualidade para evoluir sua{" "}
              <span className="text-accent font-semibold">constância na leitura Bíblica</span> e{" "}
              <span className="text-accent font-semibold">aumentar sua fé</span>.
            </motion.p>

            {/* Quote */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="mb-6"
            >
              <p className="text-white/70 italic text-base mb-5 border-l-2 border-accent pl-4 max-w-md mx-auto lg:mx-0 text-left">
                "Fé não é intensidade momentânea. É{" "}
                <span className="text-accent font-semibold">constância diária</span> diante de Deus."
              </p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-2 md:gap-3">
                {highlights.map((item, index) => (
                  <motion.div
                    key={item.text}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm"
                  >
                    <item.icon className="w-3.5 h-3.5 text-primary" />
                    <span className="text-xs text-white/80">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="flex flex-col items-center lg:items-start gap-3"
            >
              <div className="flex flex-col items-center gap-2">
                <a
                  href="#planos"
                  onClick={() => typeof window !== "undefined" && (window as any).fbq?.("track", "Lead")}
                >
                  <PremiumButton size="lg" className="group px-8">
                    <span className="whitespace-nowrap">ACESSAR PLATAFORMA AGORA</span>
                    <ArrowRight className="w-5 h-5 flex-shrink-0 transition-transform group-hover:translate-x-1" />
                  </PremiumButton>
                </a>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.6 }}
                  className="text-xs text-white/50 text-center"
                >
                  <span className="text-white font-semibold">+1.500</span> pessoas já transformaram sua vida
                </motion.p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="relative flex justify-center order-1 lg:order-2"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[500px] md:w-[350px] md:h-[600px] bg-primary/25 rounded-full blur-[100px] animate-glow-pulse" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[400px] md:w-[300px] md:h-[500px] bg-accent/20 rounded-full blur-[80px] animate-glow-pulse" style={{ animationDelay: "1s" }} />
            
            <FloatingBadge animation={{ y: [0, -10, 0], rotate: [0, 5, 0] }} className="absolute -top-4 -right-4 md:top-0 md:right-4 z-20">
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-accent/30 to-accent/20 border border-accent/40 backdrop-blur-md">
                <Trophy className="w-4 h-4 text-accent" />
                <span className="text-xs font-semibold text-accent">Top 1</span>
              </div>
            </FloatingBadge>

            <FloatingBadge animation={{ y: [0, 10, 0], rotate: [0, -5, 0] }} className="absolute -bottom-2 -left-4 md:bottom-4 md:left-0 z-20" delay={0.5}>
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-primary/30 to-primary/20 border border-primary/40 backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-xs font-semibold text-primary">+50 pts</span>
              </div>
            </FloatingBadge>

            <FloatingBadge animation={{ y: [0, -8, 0] }} className="absolute top-1/2 -right-8 md:-right-4 z-20" delay={1}>
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-primary/30 to-primary/20 border border-primary/40 backdrop-blur-md">
                <BookOpen className="w-4 h-4 text-primary" />
                <span className="text-xs font-semibold text-primary">7 dias</span>
              </div>
            </FloatingBadge>

            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="relative z-10">
              <div className="relative w-[240px] h-[490px] sm:w-[260px] sm:h-[530px] md:w-[280px] md:h-[570px]">
                <div className="absolute inset-0 rounded-[40px] bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-900 p-[3px] shadow-2xl shadow-black/50">
                  <div className="absolute inset-[3px] rounded-[37px] bg-black overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-b-2xl z-20" />
                    <div className="relative w-full h-full rounded-[34px] overflow-hidden bg-background">
                      {!imageLoaded && (
                        <div className="absolute inset-0 flex items-center justify-center bg-background z-10">
                          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                        </div>
                      )}
                      <img
                        src={heroBibleImage}
                        alt="Bíblia de Estudo Devocionalzeiros"
                        loading="eager"
                        fetchPriority="high"
                        decoding="async"
                        onLoad={() => setImageLoaded(true)}
                        className={`w-full h-full object-contain transition-opacity duration-150 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                      />
                    </div>
                  </div>
                </div>
                <div className="absolute right-[-2px] top-28 w-[3px] h-12 bg-zinc-700 rounded-l-sm" />
                <div className="absolute left-[-2px] top-24 w-[3px] h-8 bg-zinc-700 rounded-r-sm" />
                <div className="absolute left-[-2px] top-36 w-[3px] h-8 bg-zinc-700 rounded-r-sm" />
                <div className="absolute inset-0 rounded-[40px] bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
