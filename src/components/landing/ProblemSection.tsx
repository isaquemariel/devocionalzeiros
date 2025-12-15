import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { PremiumButton } from "@/components/ui/premium-button";
import { ArrowRight, AlertCircle } from "lucide-react";

const ProblemSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const problems = [
    "Oram, mas vivem desorganizados",
    "Creem, mas não crescem",
    "Trabalham muito, mas sem propósito",
    "Consomem conteúdo, mas não se transformam",
  ];

  const results = [
    "Fé fragmentada",
    "Mente cansada",
    "Corpo negligenciado",
    "Negócios desalinhados",
    "Vida espiritual desconectada da rotina",
  ];

  return (
    <section ref={ref} className="relative py-24 md:py-32 overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      <div className="absolute top-1/2 left-0 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute top-1/2 right-0 w-1/2 h-px bg-gradient-to-l from-transparent via-primary/20 to-transparent" />

      <div className="container relative z-10 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              O problema não é falta de fé.
              <br />
              <span className="text-gradient">É falta de direção e estrutura.</span>
            </h2>
          </motion.div>

          {/* Problems */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <p className="text-lg text-muted-foreground text-center mb-8">Muitos cristãos:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {problems.map((problem, index) => (
                <motion.div
                  key={problem}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-3 p-4 rounded-xl bg-secondary/30 border border-border/50"
                >
                  <div className="w-2 h-2 rounded-full bg-muted-foreground" />
                  <span className="text-foreground">{problem}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-12"
          >
            <p className="text-lg text-muted-foreground text-center mb-8">O resultado?</p>
            <div className="flex flex-wrap justify-center gap-3">
              {results.map((result, index) => (
                <motion.span
                  key={result}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 border border-destructive/20 text-sm text-foreground"
                >
                  <AlertCircle className="w-3 h-3 text-destructive" />
                  {result}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Solution Statement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center"
          >
            <p className="text-2xl md:text-3xl font-semibold text-foreground mb-10">
              O <span className="text-gradient">CLUBE HD</span> existe para romper esse ciclo.
            </p>

            <PremiumButton variant="secondary" className="group">
              QUERO SAIR DO RASO E CRESCER
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </PremiumButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
