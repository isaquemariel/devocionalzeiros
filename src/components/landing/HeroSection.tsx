import { motion } from "framer-motion";
import { PremiumButton } from "@/components/ui/premium-button";
import { ArrowRight, BookOpen, Trophy, Users } from "lucide-react";

const HeroSection = () => {
  const highlights = [
    { icon: BookOpen, text: "Planos de leitura personalizados" },
    { icon: Trophy, text: "Sistema de pontos e ranking" },
    { icon: Users, text: "Comunidade engajada" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden noise-overlay pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 geometric-grid opacity-30" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-glow-pulse" />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-bright/10 rounded-full blur-[100px] animate-glow-pulse"
        style={{ animationDelay: "1.5s" }}
      />

      {/* Geometric Accent Lines */}
      <div className="absolute top-20 left-10 w-px h-40 bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
      <div className="absolute top-40 right-20 w-px h-60 bg-gradient-to-b from-transparent via-primary/20 to-transparent" />

      <div className="container relative z-10 px-4 sm:px-6 py-16 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Impactful Statistic */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-destructive mb-2">
              70% dos cristãos
            </h1>
            <p className="text-2xl md:text-4xl lg:text-5xl font-bold text-destructive/80">
              nunca leram a Bíblia toda
            </p>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl text-foreground/70 mb-6"
          >
            Você <span className="text-primary font-semibold">não precisa</span> fazer parte dessa estatística
          </motion.p>

          {/* App Introduction */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-foreground/90 font-medium mb-4"
          >
            Conheça o <span className="text-primary font-bold">Devocionalzeiros</span>
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed"
          >
            O aplicativo que vai te ajudar a criar o{" "}
            <span className="text-foreground font-medium">hábito diário de leitura bíblica</span> com{" "}
            <span className="text-primary font-semibold">gamificação</span>,{" "}
            <span className="text-primary font-semibold">pontuação</span> e{" "}
            <span className="text-primary font-semibold">ranking</span> para te manter motivado.
          </motion.p>

          {/* Constancy Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-10"
          >
            <p className="text-foreground/80 italic text-lg mb-6 border-l-2 border-primary pl-4 max-w-2xl mx-auto text-left">
              "Fé não é intensidade momentânea. É{" "}
              <span className="text-primary font-semibold">constância diária</span> diante de Deus."
            </p>

            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50"
                >
                  <item.icon className="w-4 h-4 text-primary" />
                  <span className="text-sm text-foreground/80">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="pt-4 flex justify-center"
          >
            <a
              href="#planos"
              onClick={() => typeof window !== "undefined" && (window as any).fbq?.("track", "Lead")}
            >
              <PremiumButton size="lg" className="group max-w-full">
                <span className="whitespace-normal text-center leading-tight">
                  QUERO SAIR DESSA ESTATÍSTICA
                </span>
                <ArrowRight className="w-5 h-5 flex-shrink-0 transition-transform group-hover:translate-x-1" />
              </PremiumButton>
            </a>
          </motion.div>

          {/* Social Proof */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="mt-8 text-sm text-muted-foreground"
          >
            Mais de <span className="text-foreground font-semibold">1.500 pessoas</span> já transformaram
            sua vida devocional
          </motion.p>
        </motion.div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
