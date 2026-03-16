import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { PremiumButton } from "@/components/ui/premium-button";
import { ArrowRight, Target, Lightbulb, TrendingUp, Smartphone, Wallet, Clock, CheckCircle2 } from "lucide-react";

const BusinessSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const preparations = [
    { icon: Target, text: "Trabalhar melhor" },
    { icon: Lightbulb, text: "Pensar com clareza" },
    { icon: TrendingUp, text: "Empreender sem perder valores" },
    { icon: Smartphone, text: "Usar o digital com propósito" },
    { icon: Wallet, text: "Crescer financeiramente sem adoecer espiritualmente" },
  ];

  const learnings = [
    "Organizar sua rotina",
    "Tomar decisões com sabedoria",
    "Produzir mais, sem perder a alma",
    "Crescer profissionalmente com consciência cristã",
  ];

  return (
    <section ref={ref} className="relative py-16 md:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 border border-primary/10 rounded-full" />
      <div className="absolute bottom-20 right-10 w-48 h-48 border border-primary/5 rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-[200px]" />

      <div className="container relative z-10 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Crescer na fé <span className="text-gradient">sem fugir da realidade.</span>
            </h2>
          </motion.div>

          {/* Preparations Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <p className="text-lg text-muted-foreground text-center mb-8">O CLUBE HD prepara você para:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {preparations.map((item, index) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex flex-col items-center text-center p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-colors duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Digital Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-16"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="p-8 rounded-2xl border-gradient bg-gradient-to-br from-card to-background">
                <p className="text-lg text-muted-foreground mb-4">Aqui, o digital é:</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Smartphone className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-foreground font-medium">Ferramenta, não vício</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Target className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-foreground font-medium">Meio, não fim</span>
                  </div>
                </div>
              </div>

              <div className="p-8 rounded-2xl border-gradient bg-gradient-to-br from-card to-background">
                <p className="text-lg text-muted-foreground mb-4">Você aprende a:</p>
                <div className="space-y-3">
                  {learnings.map((learning, index) => (
                    <motion.div
                      key={learning}
                      initial={{ opacity: 0, x: 20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-foreground">{learning}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center flex justify-center"
          >
            <a href="https://quizclubehd.lovable.app" target="_blank" rel="noopener noreferrer" onClick={() => typeof window !== 'undefined' && (window as any).fbq?.('track', 'Lead')}>
              <PremiumButton variant="secondary" className="group max-w-full">
                <span className="whitespace-normal text-center leading-tight">QUERO CRESCER COM PROPÓSITO</span>
                <ArrowRight className="w-5 h-5 flex-shrink-0 transition-transform group-hover:translate-x-1" />
              </PremiumButton>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BusinessSection;
