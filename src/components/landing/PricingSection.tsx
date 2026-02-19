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
          <span className="text-primary font-semibold text-sm tracking-widest uppercase mb-4 block">
            Vamos juntos nessa jornada
          </span>
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
              className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary to-accent blur-lg opacity-50"
              style={{ animation: 'pulse3d 2.5s ease-in-out infinite' }}
            />
            <PremiumButton
              variant="primary"
              size="lg"
              onClick={handleStart}
              className="relative bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-lg shadow-primary/30 text-lg px-10 py-6"
            >
              Começar Jornada Agora
            </PremiumButton>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            ✨ 100% gratuito para começar • Sem cartão de crédito
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
