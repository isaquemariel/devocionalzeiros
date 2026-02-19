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
              {/* Open Bible 2D */}
              <div className="relative w-[300px] sm:w-[360px] h-[180px] sm:h-[200px]">
                {/* Spine (center) */}
                <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-3 sm:w-4 bg-gradient-to-b from-amber-900 to-amber-950 z-20 rounded-sm shadow-[0_0_10px_rgba(0,0,0,0.4)]">
                  <div className="absolute inset-x-0 top-4 bottom-4 mx-auto w-[2px] bg-amber-600/20 rounded-full" />
                </div>

                {/* Left page */}
                <div className="absolute left-0 top-1 bottom-1 right-1/2 mr-1 bg-gradient-to-br from-amber-50 to-amber-100 rounded-l-lg shadow-[inset_-4px_0_8px_rgba(0,0,0,0.08)] overflow-hidden border border-amber-200/60">
                  {/* Page lines */}
                  <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 10px, rgba(120,80,20,0.12) 10px, rgba(120,80,20,0.12) 11px)' }} />
                  {/* Decorative faint text lines */}
                  <div className="absolute top-3 left-3 right-2 space-y-[5px] opacity-40">
                    <div className="h-[1.5px] w-3/4 bg-amber-800/10 rounded-full" />
                    <div className="h-[1.5px] w-full bg-amber-800/10 rounded-full" />
                    <div className="h-[1.5px] w-5/6 bg-amber-800/10 rounded-full" />
                  </div>
                  {/* Page curl */}
                  <div className="absolute bottom-0 left-0 w-5 h-5 bg-gradient-to-br from-amber-200 to-amber-100 rounded-tr-lg shadow-inner" />
                </div>

                {/* Right page */}
                <div className="absolute right-0 top-1 bottom-1 left-1/2 ml-1 bg-gradient-to-bl from-amber-50 to-amber-100 rounded-r-lg shadow-[inset_4px_0_8px_rgba(0,0,0,0.08)] overflow-hidden border border-amber-200/60">
                  {/* Page lines */}
                  <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 10px, rgba(120,80,20,0.12) 10px, rgba(120,80,20,0.12) 11px)' }} />
                  {/* Faint text lines */}
                  <div className="absolute top-3 left-2 right-3 space-y-[5px] opacity-40">
                    <div className="h-[1.5px] w-full bg-amber-800/10 rounded-full" />
                    <div className="h-[1.5px] w-4/5 bg-amber-800/10 rounded-full" />
                    <div className="h-[1.5px] w-2/3 bg-amber-800/10 rounded-full" />
                  </div>
                  {/* Page curl */}
                  <div className="absolute bottom-0 right-0 w-5 h-5 bg-gradient-to-bl from-amber-200 to-amber-100 rounded-tl-lg shadow-inner" />
                </div>

                {/* Centered CTA text spanning both pages */}
                <div className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none">
                  <p className="text-amber-600/60 text-[9px] sm:text-[10px] font-medium tracking-[0.25em] uppercase mb-1.5">Clique aqui</p>
                  <p className="text-amber-900 text-2xl sm:text-3xl font-black tracking-wider leading-none text-center drop-shadow-sm">COMEÇAR</p>
                  <p className="text-amber-900 text-2xl sm:text-3xl font-black tracking-wider leading-none text-center drop-shadow-sm">AGORA</p>
                  <div className="mt-2 w-16 h-[2px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent rounded-full" />
                </div>

                {/* Cover edges peeking behind pages */}
                <div className="absolute -left-1 top-0 bottom-0 w-2 bg-gradient-to-r from-amber-800 to-amber-700 rounded-l-md z-0" />
                <div className="absolute -right-1 top-0 bottom-0 w-2 bg-gradient-to-l from-amber-800 to-amber-700 rounded-r-md z-0" />
                <div className="absolute left-0 right-0 -bottom-1 h-2 bg-gradient-to-t from-amber-900 to-amber-800 rounded-b-md z-0" />
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
