import { motion } from "framer-motion";
import { useState, memo } from "react";
import { PremiumButton } from "@/components/ui/premium-button";
import { ArrowRight, BookOpen, Trophy, Users, Sparkles, Flame } from "lucide-react";
import heroBibleImage from "@/assets/hero-bible-image.png";
import heroPhoneMockup from "@/assets/hero-phone-mockup.jpg";

const FloatingBadge = memo(({ 
  children, 
  animation, 
  className,
  delay = 0 
}: { 
  children: React.ReactNode; 
  animation: { y: number[] };
  className: string;
  delay?: number;
}) => (
  <motion.div
    animate={animation}
    transition={{ 
      duration: 5, 
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
    { icon: BookOpen, text: "Bíblia de Estudo Integrada" },
    { icon: Sparkles, text: "Quizzes Interativos" },
    { icon: Flame, text: "O Jogo da Bíblia RPG" },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16">
      {/* Dark cinematic background */}
      <div className="absolute inset-0 bg-black">
        <img
          src={heroBibleImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center scale-110 blur-sm opacity-25"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-black/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
      </div>

      {/* Static ambient glow — no animation, pure CSS */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary/15 rounded-full blur-[80px] opacity-60" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-accent/10 rounded-full blur-[60px] opacity-50" />

      <div className="container relative z-10 px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-center lg:text-left order-2 lg:order-1"
          >
            {/* Main Headline */}
            <h1 className="max-w-xl mx-auto lg:mx-0 mb-6 leading-[1.05] tracking-tight uppercase">
              <motion.span
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="block text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.15)]"
              >
                SEJAM BEM-VINDOS À
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mt-1"
              >
                <span 
                  className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-[shimmer_3s_linear_infinite]"
                  style={{ 
                    filter: "drop-shadow(0 0 20px hsl(var(--primary) / 0.3))",
                  }}
                >
                  PLATAFORMA DEVOCIONALZEIROS
                </span>
              </motion.span>
            </h1>

            {/* Sub headline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-base md:text-lg text-white/85 max-w-lg mx-auto lg:mx-0 mb-7 leading-relaxed font-medium"
            >
              O melhor aplicativo Cristão da atualidade para evoluir sua{" "}
              <span className="text-accent font-bold">constância na leitura Bíblica</span> e{" "}
              <span className="text-accent font-bold">aumentar sua fé</span>.
            </motion.p>

            {/* Feature highlights — simple fade, no 3D transforms */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mb-7"
            >
              <div className="flex flex-col items-center lg:items-start gap-2">
                {highlights.map((item, index) => (
                  <motion.div
                    key={item.text}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.8 + index * 0.08 }}
                    className="flex items-center gap-2.5 px-4 py-2 rounded-lg bg-white/[0.06] border border-white/[0.08]"
                  >
                    <div className="p-1 rounded-md bg-primary/20">
                      <item.icon className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-white/90">{item.text}</span>
                  </motion.div>
                ))}
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 1.1 }}
                  className="text-sm font-bold text-accent pl-4 mt-1"
                >
                  E muito mais...
                </motion.span>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="flex flex-col items-center lg:items-start gap-3"
            >
              <div className="flex flex-col items-center gap-2">
                <a
                  href="#novidade"
                  onClick={() => typeof window !== "undefined" && (window as any).fbq?.("track", "Lead")}
                >
                  <PremiumButton size="lg" className="group px-8">
                    <span className="whitespace-nowrap">ACESSAR PLATAFORMA AGORA</span>
                    <ArrowRight className="w-5 h-5 flex-shrink-0 transition-transform group-hover:translate-x-1" />
                  </PremiumButton>
                </a>
                
                <p className="text-xs text-white/50 text-center">
                  <span className="text-white font-semibold">+1.500</span> pessoas já transformaram sua vida
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Phone Mockup — static, no float animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="relative flex justify-center order-1 lg:order-2"
          >
            {/* Static glow behind phone */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[450px] md:w-[320px] md:h-[520px] bg-primary/20 rounded-full blur-[60px]" />

            <FloatingBadge animation={{ y: [0, -8, 0] }} className="absolute -top-4 -right-4 md:top-0 md:right-4 z-20">
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-accent/30 to-accent/20 border border-accent/40 backdrop-blur-md shadow-lg shadow-accent/10">
                <Trophy className="w-4 h-4 text-accent" />
                <span className="text-xs font-semibold text-accent">Top 1</span>
              </div>
            </FloatingBadge>

            <FloatingBadge animation={{ y: [0, 8, 0] }} className="absolute -bottom-2 -left-4 md:bottom-4 md:left-0 z-20" delay={0.5}>
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-primary/30 to-primary/20 border border-primary/40 backdrop-blur-md shadow-lg shadow-primary/10">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-xs font-semibold text-primary">+50 pts</span>
              </div>
            </FloatingBadge>

            <FloatingBadge animation={{ y: [0, -6, 0] }} className="absolute top-1/2 -right-8 md:-right-4 z-20" delay={1}>
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-primary/30 to-primary/20 border border-primary/40 backdrop-blur-md shadow-lg shadow-primary/10">
                <BookOpen className="w-4 h-4 text-primary" />
                <span className="text-xs font-semibold text-primary">7 dias</span>
              </div>
            </FloatingBadge>

            {/* Phone — no floating animation */}
            <div className="relative z-10">
              <div className="relative w-[240px] h-[490px] sm:w-[260px] sm:h-[530px] md:w-[280px] md:h-[570px]">
                <div 
                  className="absolute inset-0 rounded-[40px] bg-gradient-to-b from-zinc-600 via-zinc-800 to-zinc-900 p-[3px]"
                  style={{ boxShadow: "0 25px 60px -10px rgba(0,0,0,0.7), 0 0 30px hsl(var(--primary) / 0.1)" }}
                >
                  <div className="absolute inset-[3px] rounded-[37px] bg-black overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-b-2xl z-20" />
                    <div className="relative w-full h-full rounded-[34px] overflow-hidden bg-background">
                      {!imageLoaded && (
                        <div className="absolute inset-0 flex items-center justify-center bg-background z-10">
                          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                        </div>
                      )}
                      <img
                        src={heroPhoneMockup}
                        alt="Plataforma Devocionalzeiros"
                        loading="eager"
                        fetchPriority="high"
                        decoding="async"
                        onLoad={() => setImageLoaded(true)}
                        className={`w-full h-full object-cover object-top transition-opacity duration-150 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                      />
                    </div>
                  </div>
                </div>
                <div className="absolute right-[-2px] top-28 w-[3px] h-12 bg-zinc-700 rounded-l-sm" />
                <div className="absolute left-[-2px] top-24 w-[3px] h-8 bg-zinc-700 rounded-r-sm" />
                <div className="absolute left-[-2px] top-36 w-[3px] h-8 bg-zinc-700 rounded-r-sm" />
                <div className="absolute inset-0 rounded-[40px] bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
