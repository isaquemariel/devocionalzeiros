import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { PremiumButton } from "@/components/ui/premium-button";
import { PremiumCard, PremiumCardHeader, PremiumCardTitle, PremiumCardDescription } from "@/components/ui/premium-card";
import { ArrowRight, Brain, Dumbbell, Flame } from "lucide-react";

const SolutionSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const pillars = [
    {
      icon: Brain,
      title: "MENTE",
      description: "Disciplina, clareza, identidade, decisões, constância e mentalidade saudável.",
      gradient: "from-blue-500/20 to-cyan-500/10",
      iconColor: "text-blue-400",
    },
    {
      icon: Dumbbell,
      title: "CORPO",
      description: "Rotina, hábitos, responsabilidade, limites, energia e cuidado com a vida prática.",
      gradient: "from-emerald-500/20 to-teal-500/10",
      iconColor: "text-emerald-400",
    },
    {
      icon: Flame,
      title: "ESPÍRITO",
      description: "Vida devocional, Palavra, oração, maturidade espiritual e relacionamento com Deus.",
      gradient: "from-orange-500/20 to-amber-500/10",
      iconColor: "text-orange-400",
    },
  ];

  return (
    <section ref={ref} className="relative py-24 md:py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 geometric-grid opacity-20" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-blue-bright/5 rounded-full blur-[120px]" />

      <div className="container relative z-10 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Um clube para <span className="text-gradient">pessoas inconformadas.</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              O CLUBE HD é um ambiente de desenvolvimento contínuo, onde você aprende a crescer de forma equilibrada em
              três áreas essenciais:
            </p>
          </motion.div>

          {/* Pillars Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
              >
                <PremiumCard className="h-full text-center relative overflow-hidden">
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${pillar.gradient} opacity-50`} />

                  <div className="relative z-10">
                    <PremiumCardHeader className="items-center">
                      <div
                        className={`w-16 h-16 rounded-2xl bg-secondary/50 flex items-center justify-center mb-4 ${pillar.iconColor}`}
                      >
                        <pillar.icon className="w-8 h-8" />
                      </div>
                      <PremiumCardTitle className="text-xl font-bold tracking-widest">{pillar.title}</PremiumCardTitle>
                    </PremiumCardHeader>
                    <PremiumCardDescription className="text-base">{pillar.description}</PremiumCardDescription>
                  </div>
                </PremiumCard>
              </motion.div>
            ))}
          </div>

          {/* Bottom Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center flex flex-col items-center"
          >
            <p className="text-xl md:text-2xl text-muted-foreground mb-4">Tudo integrado.</p>
            <p className="text-lg text-foreground font-medium mb-10">
              Aqui, fé não atrapalha o crescimento pessoal.
              <br />
              <span className="text-gradient font-semibold">Ela sustenta.</span>
            </p>

            <PremiumButton className="group">
              QUERO VIVER EM EQUILÍBRIO
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </PremiumButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
