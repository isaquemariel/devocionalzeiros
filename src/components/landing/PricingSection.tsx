import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Heart, Gamepad2, Brain, MessageCircle, Trophy } from "lucide-react";
import { PremiumButton } from "@/components/ui/premium-button";

const features = [
  { icon: BookOpen, label: "Planos de Leitura" },
  { icon: Heart, label: "Devocional Diário" },
  { icon: Gamepad2, label: "RPG Bíblico" },
  { icon: Brain, label: "Quiz Bíblico" },
  { icon: MessageCircle, label: "Chat com IA" },
  { icon: Trophy, label: "Ranking da Comunidade" },
];

const PricingSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const navigate = useNavigate();

  const handleStart = () => {
    if (typeof window !== "undefined") {
      (window as any).fbq?.("track", "Lead", {
        content_name: "Free Signup CTA",
        content_category: "Landing",
      });
    }
    navigate("/auth");
  };

  return (
    <section id="planos" ref={ref} className="relative py-16 md:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 left-0 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[120px]" />

      <div className="container relative z-10 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Sua transformação espiritual{" "}
            <span className="text-gradient">começa aqui</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Cadastre-se gratuitamente e tenha acesso a todas as ferramentas para fortalecer sua fé todos os dias.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-10"
        >
          {features.map((feature, i) => (
            <motion.div
              key={feature.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
              className="flex items-center gap-3 p-3 rounded-xl bg-card/50 border border-border/50"
            >
              <feature.icon className="w-5 h-5 text-primary flex-shrink-0" />
              <span className="text-sm font-medium text-foreground/80">{feature.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <div className="relative inline-block">
            <div
              className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-800 blur-xl opacity-30"
              style={{ animation: 'pulse3d 2.5s ease-in-out infinite' }}
            />
            <motion.button
              onClick={handleStart}
              className="relative group cursor-pointer"
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.96 }}
            >
              {/* Open Bible 2D - smaller, text-focused */}
              <div className="relative w-[260px] sm:w-[300px] h-[140px] sm:h-[150px]">
                {/* Spine (center) */}
                <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-2 bg-gradient-to-b from-amber-800 to-amber-950 z-10 rounded-sm shadow-[0_0_6px_rgba(0,0,0,0.3)]" />

                {/* Left page */}
                <div className="absolute left-0 top-0 bottom-0 right-1/2 mr-[3px] bg-gradient-to-r from-white to-amber-50 rounded-l-md overflow-hidden border border-amber-300/40 shadow-md">
                  <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 9px, rgba(120,80,20,0.1) 9px, rgba(120,80,20,0.1) 10px)' }} />
                </div>

                {/* Right page */}
                <div className="absolute right-0 top-0 bottom-0 left-1/2 ml-[3px] bg-gradient-to-l from-white to-amber-50 rounded-r-md overflow-hidden border border-amber-300/40 shadow-md">
                  <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 9px, rgba(120,80,20,0.1) 9px, rgba(120,80,20,0.1) 10px)' }} />
                </div>

                {/* Cover edges */}
                <div className="absolute -left-[3px] top-0 bottom-0 w-[5px] bg-gradient-to-r from-amber-700 to-amber-600 rounded-l z-0" />
                <div className="absolute -right-[3px] top-0 bottom-0 w-[5px] bg-gradient-to-l from-amber-700 to-amber-600 rounded-r z-0" />
                <div className="absolute left-0 right-0 -bottom-[3px] h-[5px] bg-gradient-to-t from-amber-800 to-amber-700 rounded-b z-0" />

                {/* CTA text - centered, high contrast */}
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
                  <p className="text-amber-500 text-[10px] sm:text-xs font-semibold tracking-[0.3em] uppercase mb-2 drop-shadow-sm">✦ Clique aqui ✦</p>
                  <p className="text-amber-950 text-3xl sm:text-4xl font-black tracking-wide leading-none text-center" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.8)' }}>COMEÇAR</p>
                  <p className="text-amber-950 text-3xl sm:text-4xl font-black tracking-wide leading-none text-center" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.8)' }}>AGORA</p>
                </div>
              </div>
            </motion.button>
          </div>
          <p className="text-sm text-muted-foreground mt-5">
            ✨ Você está a um passo de se tornar um Devocionalzeiro
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
