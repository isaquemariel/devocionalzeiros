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
              whileHover={{ scale: 1.04, y: -3 }}
              whileTap={{ scale: 0.96 }}
            >
              {/* Bible 2D Shape */}
              <div className="relative w-[280px] sm:w-[320px] h-[160px] sm:h-[180px]">
                {/* Book spine (left edge) */}
                <div className="absolute left-0 top-1 bottom-1 w-4 sm:w-5 bg-gradient-to-r from-amber-950 to-amber-900 rounded-l-md z-10 shadow-[2px_0_4px_rgba(0,0,0,0.3)]">
                  <div className="absolute inset-x-0 top-3 bottom-3 mx-auto w-[2px] bg-amber-600/30 rounded-full" />
                </div>
                
                {/* Book cover */}
                <div className="absolute left-3 sm:left-4 right-0 top-0 bottom-0 bg-gradient-to-br from-amber-800 via-amber-900 to-amber-950 rounded-r-lg rounded-l-sm border-2 border-amber-600/40 shadow-[0_8px_30px_rgba(120,80,20,0.4),inset_0_1px_0_rgba(255,215,0,0.15)] overflow-hidden">
                  {/* Leather texture lines */}
                  <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 8px, rgba(255,215,0,0.1) 8px, rgba(255,215,0,0.1) 9px)' }} />
                  
                  {/* Gold border frame */}
                  <div className="absolute inset-3 sm:inset-4 border border-amber-500/30 rounded-sm" />
                  
                  {/* Cross */}
                  <div className="absolute top-5 sm:top-6 left-1/2 -translate-x-1/2">
                    <div className="relative w-6 h-8">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[3px] h-full bg-gradient-to-b from-amber-400 to-amber-500 rounded-full shadow-[0_0_8px_rgba(245,158,11,0.4)]" />
                      <div className="absolute top-[30%] left-0 w-full h-[3px] bg-gradient-to-r from-amber-400 to-amber-500 rounded-full shadow-[0_0_8px_rgba(245,158,11,0.4)]" />
                    </div>
                  </div>
                  
                  {/* Text on book */}
                  <div className="absolute bottom-4 sm:bottom-5 inset-x-0 text-center">
                    <p className="text-amber-400/90 text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase mb-1">Sua Jornada</p>
                    <p className="text-amber-200 text-base sm:text-lg font-black tracking-wider">COMEÇAR AGORA</p>
                  </div>
                  
                  {/* Subtle shine */}
                  <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/5 to-transparent" />
                </div>
                
                {/* Page edges (right side) */}
                <div className="absolute right-0 top-2 bottom-2 w-[6px] bg-gradient-to-r from-amber-100/80 to-amber-50/60 rounded-r-sm shadow-inner" style={{ backgroundImage: 'repeating-linear-gradient(180deg, transparent, transparent 2px, rgba(0,0,0,0.05) 2px, rgba(0,0,0,0.05) 3px)' }} />
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
