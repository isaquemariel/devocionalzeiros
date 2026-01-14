import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, BookOpen, Brain, Trophy, MessageCircle, Mic, Sparkles, BookMarked } from "lucide-react";

import cardLeitura from "@/assets/card-leitura-biblica.png";
import cardDevocional from "@/assets/card-devocional.png";
import cardQuiz from "@/assets/card-quiz.png";
import cardChat from "@/assets/card-chat.png";
import cardRanking from "@/assets/card-ranking.png";
import cardSermao from "@/assets/card-sermao.png";
import cardBibliaEstudo from "@/assets/card-biblia-estudo.png";

interface Feature {
  id: string;
  image: string;
  title: string;
  description: string;
  icon: React.ElementType;
  plan: string;
}

const features: Feature[] = [
  {
    id: "leitura",
    image: cardLeitura,
    title: "Plano de Leitura Bíblica",
    description: "Escolha entre planos de 90, 184 ou 365 dias. Acompanhe seu progresso com calendário interativo.",
    icon: BookOpen,
    plan: "START",
  },
  {
    id: "devocional",
    image: cardDevocional,
    title: "Devocional Diário",
    description: "Meditações exclusivas com versículo, reflexão, oração e aplicação prática para cada dia.",
    icon: Sparkles,
    plan: "START",
  },
  {
    id: "ranking",
    image: cardRanking,
    title: "Pontuação e Ranking",
    description: "Ganhe pontos lendo capítulos, acertando quiz e mantendo sua constância. Dispute o Top 3!",
    icon: Trophy,
    plan: "START",
  },
  {
    id: "bibliaEstudo",
    image: cardBibliaEstudo,
    title: "Bíblia de Estudo",
    description: "Leia a Bíblia com estudos versículo por versículo, palavras em hebraico e grego, e comentários de teólogos renomados.",
    icon: BookMarked,
    plan: "GOLD",
  },
  {
    id: "chat",
    image: cardChat,
    title: "Devocionalzeiro.CHAT",
    description: "IA treinada para responder suas dúvidas teológicas com base em comentários bíblicos sólidos.",
    icon: MessageCircle,
    plan: "GOLD",
  },
  {
    id: "quiz",
    image: cardQuiz,
    title: "Quiz Bíblico",
    description: "Teste seu conhecimento sobre os capítulos lidos. Perguntas geradas por IA para cada leitura.",
    icon: Brain,
    plan: "GOLD",
  },
  {
    id: "sermao",
    image: cardSermao,
    title: "Gerador de Sermão",
    description: "Crie esboços exegéticos profissionais para suas pregações com ajuda de IA.",
    icon: Mic,
    plan: "PREMIUM",
  },
];

const AppShowcaseSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % features.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + features.length) % features.length);
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case "START":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      case "GOLD":
        return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      case "PREMIUM":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      default:
        return "bg-primary/20 text-primary border-primary/30";
    }
  };

  return (
    <section ref={ref} className="relative py-16 md:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />

      <div className="container relative z-10 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="text-primary font-semibold text-sm tracking-widest uppercase mb-4 block">
            Tudo que você precisa
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Um app completo para sua{" "}
            <span className="text-gradient">jornada devocional</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Funcionalidades pensadas para criar constância, engajamento e crescimento espiritual real.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative max-w-5xl mx-auto">
          <div className="flex items-center gap-4 md:gap-8">
            {/* Prev Button */}
            <button
              onClick={prevSlide}
              className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-secondary/50 border border-border/50 flex items-center justify-center text-foreground/70 hover:bg-secondary hover:text-foreground transition-all"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            {/* Cards Container */}
            <div className="flex-1 overflow-hidden">
              <motion.div
                className="flex"
                animate={{ x: `-${currentIndex * 100}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {features.map((feature) => (
                  <div key={feature.id} className="w-full flex-shrink-0 px-2">
                    <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden">
                      <div className="grid md:grid-cols-2 gap-6 p-6">
                        {/* Image */}
                        <div className="relative flex items-center justify-center perspective-1000">
                          <img
                            src={feature.image}
                            alt={feature.title}
                            className="w-full h-auto max-h-[300px] md:max-h-[350px] object-contain rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5),0_10px_20px_rgba(0,0,0,0.3)] transform hover:scale-105 hover:-rotate-1 transition-all duration-300 border border-white/10"
                            style={{
                              transform: 'perspective(1000px) rotateY(-5deg) rotateX(2deg)',
                            }}
                          />
                        </div>

                        {/* Content */}
                        <div className="flex flex-col justify-center">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                              <feature.icon className="w-5 h-5 text-primary" />
                            </div>
                            <span
                              className={`text-xs font-semibold px-3 py-1 rounded-full border ${getPlanColor(
                                feature.plan
                              )}`}
                            >
                              {feature.plan}
                            </span>
                          </div>

                          <h3 className="text-xl md:text-2xl font-bold mb-3">{feature.title}</h3>
                          <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Next Button */}
            <button
              onClick={nextSlide}
              className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-secondary/50 border border-border/50 flex items-center justify-center text-foreground/70 hover:bg-secondary hover:text-foreground transition-all"
              aria-label="Próximo"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "w-8 bg-primary"
                    : "bg-foreground/20 hover:bg-foreground/40"
                }`}
                aria-label={`Ir para slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center text-sm text-muted-foreground mt-8"
        >
          * Funcionalidades disponíveis de acordo com o plano escolhido
        </motion.p>
      </div>
    </section>
  );
};

export default AppShowcaseSection;
