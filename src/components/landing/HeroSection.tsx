import { motion } from "framer-motion";
import { memo } from "react";
import { PremiumButton } from "@/components/ui/premium-button";
import { ArrowRight, BookOpen, Trophy, Sparkles, Flame } from "lucide-react";
import heroBibleImage from "@/assets/hero-bible-image.png";

const HeroSection = () => {
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

      {/* Static ambient glow */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary/15 rounded-full blur-[80px] opacity-60" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-accent/10 rounded-full blur-[60px] opacity-50" />

      <div className="container relative z-10 px-4 sm:px-6">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          
          {/* Welcome line */}
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.4em" }}
            animate={{ opacity: 1, letterSpacing: "0.22em" }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-[0.7rem] sm:text-xs uppercase text-amber-300/70 font-medium tracking-[0.22em] mb-3"
          >
            Sejam bem-vindos ao
          </motion.p>

          {/* Main Headline — instagrammable lettering */}
          <h1 className="leading-[1.05] mb-4">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="block text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight"
              style={{
                background: "linear-gradient(180deg, #ffffff 0%, #fbbf24 40%, #f59e0b 70%, #d97706 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 2px 16px rgba(245,158,11,0.4))",
              }}
            >
              Ecossistema
            </motion.span>
            <motion.span
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.7, type: "spring", stiffness: 120 }}
              className="block text-[clamp(1.7rem,7vw,4.5rem)] font-black uppercase tracking-[-0.02em] mt-[-2px]"
              style={{
                background: "linear-gradient(180deg, #ffffff 0%, #e2e8f0 40%, #94a3b8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 4px 24px rgba(255,255,255,0.15))",
              }}
            >
              Devocionalzeiros
            </motion.span>

            {/* Decorative underline */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="mx-auto mt-3 h-[2px] w-40 md:w-56 rounded-full"
              style={{ background: "linear-gradient(90deg, transparent, #f59e0b, #f97316, transparent)" }}
            />
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="text-base md:text-lg text-white/70 max-w-md mx-auto mb-8 leading-relaxed font-medium"
          >
            O lugar para todo cristão que{" "}
            <span className="text-amber-400 font-bold">ama a Palavra de Deus!</span>
          </motion.p>

          {/* Feature highlights */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mb-8"
          >
            <div className="flex flex-wrap justify-center gap-2">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.9 + index * 0.08 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.06] border border-white/[0.08]"
                >
                  <div className="p-1 rounded-md bg-primary/20">
                    <item.icon className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-white/90">{item.text}</span>
                </motion.div>
              ))}
            </div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 1.2 }}
              className="block text-sm font-bold text-accent mt-3"
            >
              E muito mais...
            </motion.span>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.3 }}
            className="flex flex-col items-center gap-3"
          >
            <a
              href="#novidade"
              onClick={() => typeof window !== "undefined" && (window as any).fbq?.("track", "Lead")}
            >
              <PremiumButton size="lg" className="group px-8">
                <span className="whitespace-nowrap">ACESSAR PLATAFORMA AGORA</span>
                <ArrowRight className="w-5 h-5 flex-shrink-0 transition-transform group-hover:translate-x-1" />
              </PremiumButton>
            </a>
            <p className="text-xs text-white/50">
              <span className="text-white font-semibold">+1.500</span> pessoas já transformaram sua vida
            </p>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
