import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { PremiumButton } from "@/components/ui/premium-button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const FinalCTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const reasons = [
    "Sair da estatística dos 70%",
    "Criar constância na vida devocional",
    "Aprender enquanto lê com IA",
    "Competir e se motivar no ranking",
    "Fazer parte de uma comunidade real",
  ];

  return (
    <section ref={ref} className="relative py-16 md:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px]" />

      <div className="container relative z-10 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="text-primary font-semibold text-sm tracking-widest uppercase mb-4 block">
            Chegou a hora
          </span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            Você está pronto para{" "}
            <span className="text-gradient">transformar</span> sua vida devocional?
          </h2>

          <p className="text-lg text-muted-foreground mb-8">
            Milhares de cristãos já descobriram que constância é possível quando você tem as ferramentas
            certas e uma comunidade que te apoia.
          </p>

          {/* Reasons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-10"
          >
            {reasons.map((reason, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50"
              >
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span className="text-sm text-foreground/80">{reason}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <a
              href="#planos"
              onClick={() =>
                typeof window !== "undefined" && (window as any).fbq?.("track", "Lead")
              }
            >
              <PremiumButton size="lg" className="group">
                <span>QUERO COMEÇAR AGORA</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </PremiumButton>
            </a>
          </motion.div>

          <p className="mt-6 text-sm text-muted-foreground">
            Comece hoje e veja a diferença que a constância faz em 30 dias
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTASection;
