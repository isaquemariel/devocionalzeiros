import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { PremiumButton } from "@/components/ui/premium-button";
import { 
  ArrowRight, 
  Heart, 
  Clock, 
  BookOpen, 
  Sparkles, 
  Target,
  CheckCircle,
  AlertCircle
} from "lucide-react";

const TargetAudienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const painPoints = [
    {
      icon: Heart,
      text: "Sente culpa por não conseguir manter uma vida devocional constante",
    },
    {
      icon: Clock,
      text: "Começa planos de leitura, mas sempre abandona no meio do caminho",
    },
    {
      icon: AlertCircle,
      text: "Se distrai facilmente e não consegue se concentrar na oração",
    },
    {
      icon: BookOpen,
      text: "Acha a Bíblia difícil de entender sozinho(a)",
    },
    {
      icon: Target,
      text: "Tem uma rotina corrida e sente que não sobra tempo para Deus",
    },
  ];

  const benefits = [
    "Devocionais diários que cabem na sua rotina",
    "Planos de leitura personalizados para seu ritmo",
    "Explicações claras que tornam a Bíblia acessível",
    "Comunidade que caminha junto com você",
    "Ferramentas que transformam intenção em hábito",
  ];

  return (
    <section ref={ref} className="relative py-20 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />
      <div className="absolute inset-0 geometric-grid opacity-10" />
      
      {/* Subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />

      <div className="container relative z-10 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-6"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              Você não está sozinho(a)
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Para quem é o{" "}
              <span className="text-gradient">Devocionalzeiros?</span>
            </h2>
          </motion.div>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-lg md:text-xl text-muted-foreground text-center mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Se você já tentou ter uma vida devocional constante, mas sempre sentiu que 
            algo estava faltando, essa mensagem é para você.
          </motion.p>

          {/* Pain Points */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <p className="text-center text-foreground font-semibold mb-8 text-lg">
              Talvez você se identifique com isso:
            </p>
            <div className="grid gap-4 max-w-2xl mx-auto">
              {painPoints.map((pain, index) => (
                <motion.div
                  key={pain.text}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-card/50 border border-border/50 hover:border-primary/30 transition-colors duration-300"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                    <pain.icon className="w-5 h-5 text-destructive/70" />
                  </div>
                  <p className="text-foreground leading-relaxed pt-1.5">{pain.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Objection Break */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-center mb-12 py-8 px-6 rounded-2xl bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border border-primary/20"
          >
            <p className="text-xl md:text-2xl font-semibold text-foreground mb-3">
              O problema <span className="text-primary">não é falta de fé</span>.
            </p>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              É falta de uma estrutura prática que transforme sua vontade de buscar a Deus 
              em um hábito que dura.
            </p>
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mb-12"
          >
            <p className="text-center text-foreground font-semibold mb-8 text-lg">
              É por isso que criamos o Devocionalzeiros:
            </p>
            <div className="grid gap-3 max-w-xl mx-auto">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors duration-300"
                >
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-center"
          >
            <p className="text-muted-foreground mb-6 text-lg">
              Você não precisa se esforçar mais.{" "}
              <span className="text-foreground font-medium">Precisa de apoio certo.</span>
            </p>
            <a 
              href="#pricing" 
              onClick={() => typeof window !== 'undefined' && (window as any).fbq?.('track', 'Lead')}
            >
              <PremiumButton size="lg" className="group">
                <Sparkles className="w-5 h-5" />
                <span>Quero começar minha jornada</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </PremiumButton>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TargetAudienceSection;
