import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import founderPortrait from "@/assets/founder-portrait.jpg";
import speakingEvent from "@/assets/speaking-event.jpg";

const FounderSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

      <div className="container relative z-10 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image Column */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Main Portrait */}
              <div className="relative z-10">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden border-gradient">
                  <img
                    src={founderPortrait}
                    alt="Fundador do CLUBE HD"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>

              {/* Secondary Image - Speaking */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="absolute -bottom-8 -right-8 w-2/3 z-20"
              >
                <div className="rounded-xl overflow-hidden border-2 border-background shadow-2xl">
                  <img
                    src={speakingEvent}
                    alt="Palestrando em evento"
                    className="w-full h-full object-cover aspect-video"
                  />
                </div>
              </motion.div>

              {/* Glow Effect */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/10 rounded-full blur-[100px] -z-10" />
            </motion.div>

            {/* Content Column */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="md:pl-8"
            >
              <span className="text-primary font-semibold text-sm tracking-widest uppercase mb-4 block">
                Quem está por trás do CLUBE HD
              </span>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">Isaque Mariel</h2>

              <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                <p>
                  Sou{" "}
                  <span className="text-foreground font-medium">
                    teólogo, pastor auxiliar na Missão Resgate Natal, esposo da Sara e pai do Davi.
                  </span>
                  .
                </p>
                <p>
                  Cada encontro, cada conteúdo, cada mentoria é pensada para quem quer
                  <span className="text-foreground font-medium"> crescer por inteiro</span>: mente, corpo, espírito e
                  negócios.
                </p>
                <p className="text-foreground font-medium italic border-l-2 border-primary pl-4">
                  "Negócios não são apenas sobre dinheiro, são sobre propósito e impacto."
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-10">
                <div className="text-center md:text-left">
                  <div className="text-3xl md:text-4xl font-bold text-gradient">500+</div>
                  <div className="text-sm text-muted-foreground mt-1">Vidas impactadas</div>
                </div>
                <div className="text-center md:text-left">
                  <div className="text-3xl md:text-4xl font-bold text-gradient">50+</div>
                  <div className="text-sm text-muted-foreground mt-1">Imersões realizadas</div>
                </div>
                <div className="text-center md:text-left">
                  <div className="text-3xl md:text-4xl font-bold text-gradient">5</div>
                  <div className="text-sm text-muted-foreground mt-1">Anos de jornada</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
