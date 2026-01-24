import { motion } from "framer-motion";
import { useState, memo } from "react";
import { PremiumButton } from "@/components/ui/premium-button";
import { ArrowRight, BookOpen, Trophy, Users, Sparkles } from "lucide-react";
import heroBibleImage from "@/assets/hero-bible-image.png";

// Memoized floating element to prevent re-renders
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

  // No useEffect needed for static image

  // No video controls needed

  const highlights = [
    { icon: BookOpen, text: "Planos de leitura personalizados" },
    { icon: Trophy, text: "Sistema de pontos e ranking" },
    { icon: Users, text: "Comunidade engajada" },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden noise-overlay pt-24 pb-16">
      {/* Background Effects */}
      <div className="absolute inset-0 geometric-grid opacity-30" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-glow-pulse" />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-bright/10 rounded-full blur-[100px] animate-glow-pulse"
        style={{ animationDelay: "1.5s" }}
      />

      {/* Geometric Accent Lines */}
      <div className="absolute top-20 left-10 w-px h-40 bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
      <div className="absolute top-40 right-20 w-px h-60 bg-gradient-to-b from-transparent via-primary/20 to-transparent" />

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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-foreground font-bold max-w-xl mx-auto lg:mx-0 mb-6 leading-relaxed"
            >
              O melhor aplicativo Cristão da atualidade para evoluir sua{" "}
              <span className="text-primary font-bold">constância na leitura Bíblica</span> e{" "}
              <span className="text-primary font-bold">aumentar sua fé</span>.
            </motion.h1>

            {/* Constancy Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-6"
            >
              <p className="text-foreground/80 italic text-base mb-5 border-l-2 border-primary pl-4 max-w-md mx-auto lg:mx-0 text-left">
                "Fé não é intensidade momentânea. É{" "}
                <span className="text-primary font-semibold">constância diária</span> diante de Deus."
              </p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-2 md:gap-3">
                {highlights.map((item, index) => (
                  <motion.div
                    key={item.text}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 border border-border/50"
                  >
                    <item.icon className="w-3.5 h-3.5 text-primary" />
                    <span className="text-xs text-foreground/80">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex flex-col items-center lg:items-start gap-3"
            >
              <div className="flex flex-col items-center gap-2">
                <a
                  href="#planos"
                  onClick={() => typeof window !== "undefined" && (window as any).fbq?.("track", "Lead")}
                >
                  <PremiumButton size="lg" className="group px-8">
                    <span className="whitespace-nowrap">
                      ACESSAR PLATAFORMA AGORA
                    </span>
                    <ArrowRight className="w-5 h-5 flex-shrink-0 transition-transform group-hover:translate-x-1" />
                  </PremiumButton>
                </a>
                
                {/* Social Proof */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.1 }}
                  className="text-xs text-muted-foreground text-center"
                >
                  <span className="text-foreground font-semibold">+1.500</span> pessoas já transformaram sua vida
                </motion.p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Phone Mockup with Video */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="relative flex justify-center order-1 lg:order-2"
          >
            {/* Glow Effects behind phone */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[500px] md:w-[350px] md:h-[600px] bg-primary/20 rounded-full blur-[100px] animate-glow-pulse" />
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[400px] md:w-[300px] md:h-[500px] bg-amber-500/15 rounded-full blur-[80px] animate-glow-pulse"
              style={{ animationDelay: "1s" }}
            />
            
            {/* Floating Elements */}
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-4 -right-4 md:top-0 md:right-4 z-20"
            >
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-amber-500/20 to-amber-600/10 border border-amber-500/30 backdrop-blur-sm">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-semibold text-amber-400">Top 1</span>
              </div>
            </motion.div>

            <motion.div
              animate={{ 
                y: [0, 10, 0],
                rotate: [0, -5, 0]
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
              className="absolute -bottom-2 -left-4 md:bottom-4 md:left-0 z-20"
            >
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-xs font-semibold text-primary">+50 pts</span>
              </div>
            </motion.div>

            <motion.div
              animate={{ 
                y: [0, -8, 0],
              }}
              transition={{ 
                duration: 3.5, 
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute top-1/2 -right-8 md:-right-4 z-20"
            >
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 backdrop-blur-sm">
                <BookOpen className="w-4 h-4 text-primary" />
                <span className="text-xs font-semibold text-primary">7 dias</span>
              </div>
            </motion.div>

            {/* Phone Mockup */}
            <motion.div
              animate={{ 
                y: [0, -8, 0]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative z-10"
            >
              {/* Phone Frame */}
              <div className="relative w-[240px] h-[490px] sm:w-[260px] sm:h-[530px] md:w-[280px] md:h-[570px]">
                {/* Phone Border/Frame */}
                <div className="absolute inset-0 rounded-[40px] bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-900 p-[3px] shadow-2xl shadow-black/50">
                  <div className="absolute inset-[3px] rounded-[37px] bg-black overflow-hidden">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-b-2xl z-20" />
                    
                    {/* Screen Content - Image */}
                      <div className="relative w-full h-full rounded-[34px] overflow-hidden bg-background">
                        {/* Loading placeholder */}
                        {!imageLoaded && (
                          <div className="absolute inset-0 flex items-center justify-center bg-background z-10">
                            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                          </div>
                        )}
                        <img
                          src={heroBibleImage}
                          alt="Bíblia de Estudo Devocionalzeiros"
                          onLoad={() => setImageLoaded(true)}
                          className={`w-full h-full object-contain transition-opacity duration-150 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                        />
                      </div>
                  </div>
                </div>

                {/* Side Button (Power) */}
                <div className="absolute right-[-2px] top-28 w-[3px] h-12 bg-zinc-700 rounded-l-sm" />
                
                {/* Side Buttons (Volume) */}
                <div className="absolute left-[-2px] top-24 w-[3px] h-8 bg-zinc-700 rounded-r-sm" />
                <div className="absolute left-[-2px] top-36 w-[3px] h-8 bg-zinc-700 rounded-r-sm" />

                {/* Reflection Effect */}
                <div className="absolute inset-0 rounded-[40px] bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
