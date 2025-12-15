import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { PremiumButton } from "@/components/ui/premium-button";
import {
  ArrowRight,
  CheckCircle,
  Sparkles,
  Package,
  Users,
  Video,
  MessageCircle,
  BookOpen,
  Calendar,
} from "lucide-react";
const FinalSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px",
  });
  const benefits = [
    {
      icon: Sparkles,
      title: "Acesso completo ao Ecossistema CLUBE HD (1 ano)",
      description:
        "Todo o ambiente de formação espiritual, pessoal e prática, com conteúdos, encontros e comunidade ativa.",
    },
    {
      icon: Package,
      title: "Kit exclusivo enviado para sua casa",
      description:
        "Um kit físico pensado para acompanhar sua jornada devocional, reforçando o compromisso, a identidade e o hábito desde o primeiro dia.",
    },
    {
      icon: Users,
      title: "6 Encontros Presenciais ao longo do ano",
      description:
        "Momentos presenciais de comunhão, aprendizado, networking, alinhamento e vida real, fortalecendo vínculos e aprofundando a caminhada.",
    },
    {
      icon: Video,
      title: "Encontros Online Mensais",
      description:
        "Mentorias ao vivo para alinhamento espiritual, profissional e emocional, mantendo ritmo, direção e constância ao longo do ano.",
    },
    {
      icon: MessageCircle,
      title: "Tira-dúvidas e acompanhamento",
      description: "Espaços direcionados para perguntas, clarezas e orientação prática dentro da jornada.",
    },
    {
      icon: BookOpen,
      title: "Clube de Leitura Bíblica Semanal",
      description:
        "Leitura guiada, compartilhada e aplicada das Escrituras, promovendo constância e profundidade na Palavra.",
    },
  ];
  const desires = [
    "Crescer espiritualmente com constância",
    "Desenvolver mente e corpo com disciplina",
    "Viver a fé de forma prática",
    "Evoluir nos negócios sem negociar princípios",
    "Caminhar em comunidade, não sozinho",
  ];
  return (
    <section ref={ref} className="relative py-24 md:py-40 overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-navy-medium to-background" />
      <div className="absolute inset-0 geometric-grid opacity-20" />

      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[200px] animate-glow-pulse" />
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-bright/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-[100px]" />

      {/* Decorative Lines */}
      <div className="absolute top-1/4 left-0 w-1/3 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute bottom-1/4 right-0 w-1/3 h-px bg-gradient-to-l from-transparent via-primary/30 to-transparent" />

      <div className="container relative z-10 px-6">
        {/* Receivables Section */}
        <div className="max-w-5xl mx-auto mb-24">
          {/* Title */}
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={
              isInView
                ? {
                    opacity: 1,
                    y: 0,
                  }
                : {}
            }
            transition={{
              duration: 0.8,
            }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
              }}
              animate={
                isInView
                  ? {
                      opacity: 1,
                      scale: 1,
                    }
                  : {}
              }
              transition={{
                duration: 0.6,
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 mb-8"
            >
              <Calendar className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">12 meses de formação</span>
            </motion.div>

            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
              O QUE VOCÊ RECEBE AO ENTRAR NO <span className="text-gradient">CLUBE HD</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Um ano inteiro vivendo dentro de um ecossistema de crescimento.
            </p>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={
              isInView
                ? {
                    opacity: 1,
                    y: 0,
                  }
                : {}
            }
            transition={{
              duration: 0.8,
              delay: 0.2,
            }}
            className="text-center mb-16"
          >
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Ao entrar no <span className="text-foreground font-semibold">CLUBE HÁBITO DEVOCIONAL</span>, você não está
              adquirindo um curso ou acesso pontual.
              <br />
              Você passa a fazer parte de um <span className="text-foreground font-semibold">ecossistema anual</span>,
              pensado para sustentar constância, amadurecimento espiritual e desenvolvimento integral.
            </p>
            <p className="text-lg text-primary font-medium mt-6">Durante 12 meses, você terá acesso a:</p>
          </motion.div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                animate={
                  isInView
                    ? {
                        opacity: 1,
                        y: 0,
                      }
                    : {}
                }
                transition={{
                  duration: 0.6,
                  delay: 0.3 + index * 0.1,
                }}
                className="group p-6 rounded-2xl bg-card/50 border border-border/30 hover:border-primary/40 transition-all duration-300 hover:bg-card/80"
              >
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Decision Section */}
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}

          {/* Title */}
          <motion.h2
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={
              isInView
                ? {
                    opacity: 1,
                    y: 0,
                  }
                : {}
            }
            transition={{
              duration: 0.8,
              delay: 0.9,
            }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
          >
            O CLUBE HD não é para todos.
            <br />
            <span className="text-gradient">É para quem decidiu amadurecer.</span>
          </motion.h2>

          {/* If you want section */}
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={
              isInView
                ? {
                    opacity: 1,
                    y: 0,
                  }
                : {}
            }
            transition={{
              duration: 0.8,
              delay: 1,
            }}
            className="mb-12"
          >
            <p className="text-lg text-muted-foreground mb-8">Se você quer:</p>
            <div className="flex flex-col gap-4 max-w-md mx-auto">
              {desires.map((desire, index) => (
                <motion.div
                  key={desire}
                  initial={{
                    opacity: 0,
                    x: -30,
                  }}
                  animate={
                    isInView
                      ? {
                          opacity: 1,
                          x: 0,
                        }
                      : {}
                  }
                  transition={{
                    duration: 0.5,
                    delay: 1.1 + index * 0.1,
                  }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-card/50 border border-border/30 text-left hover:border-primary/30 transition-colors duration-300"
                >
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{desire}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Conclusion */}
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={
              isInView
                ? {
                    opacity: 1,
                    y: 0,
                  }
                : {}
            }
            transition={{
              duration: 0.8,
              delay: 1.5,
            }}
            className="mb-12"
          >
            <p className="text-xl md:text-2xl text-foreground font-medium mb-4">
              Então o <span className="text-gradient font-bold">CLUBE HÁBITO DEVOCIONAL</span> é para você.
            </p>
            <p className="text-lg text-muted-foreground">
              Não é sobre intensidade momentânea.
              <br />
              <span className="text-foreground font-semibold">É sobre formação contínua.</span>
            </p>
          </motion.div>

          {/* Final CTA */}
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={
              isInView
                ? {
                    opacity: 1,
                    y: 0,
                  }
                : {}
            }
            transition={{
              duration: 0.8,
              delay: 1.7,
            }}
            className="relative"
          >
            {/* Glow behind button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-16 bg-primary/30 rounded-full blur-[40px] animate-glow-pulse" />
            </div>

            <PremiumButton size="lg" className="relative group text-lg px-12 py-6 h-auto">
              QUERO ME CANDIDATAR A UMA VAGA
              <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
            </PremiumButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
export default FinalSection;
