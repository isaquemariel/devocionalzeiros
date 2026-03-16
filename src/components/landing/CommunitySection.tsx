import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import communityCertificates from "@/assets/community-certificates.jpg";
import groupPhoto from "@/assets/group-photo.jpg";
import networking1 from "@/assets/networking-1.jpg";
import networking2 from "@/assets/networking-2.jpg";

const CommunitySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-secondary/20" />
      <div className="absolute inset-0 geometric-grid opacity-10" />

      <div className="container relative z-10 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-primary font-semibold text-sm tracking-widest uppercase mb-4 block">
              Comunidade
            </span>
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Você não caminha{" "}
              <span className="text-gradient">sozinho</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              No CLUBE HD, crescimento acontece em comunidade. 
              Pessoas reais, histórias reais, transformação real.
            </p>
          </motion.div>

          {/* Photo Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {/* Large Main Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="col-span-2 row-span-2 relative group"
            >
              <div className="aspect-square md:aspect-auto md:h-full rounded-2xl overflow-hidden border-gradient">
                <img
                  src={groupPhoto}
                  alt="Comunidade CLUBE HD reunida"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-sm text-primary font-medium">Imersão</span>
                  <p className="text-foreground font-semibold">Empreendendo com Propósito</p>
                </div>
              </div>
            </motion.div>

            {/* Networking 1 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative group"
            >
              <div className="aspect-square rounded-xl overflow-hidden border border-border/30">
                <img
                  src={networking1}
                  alt="Networking e mentoria"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </motion.div>

            {/* Networking 2 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative group"
            >
              <div className="aspect-square rounded-xl overflow-hidden border border-border/30">
                <img
                  src={networking2}
                  alt="Conexões genuínas"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </motion.div>

            {/* Certificates Photo - spans 2 columns */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="col-span-2 relative group"
            >
              <div className="aspect-video rounded-xl overflow-hidden border border-border/30">
                <img
                  src={communityCertificates}
                  alt="Membros certificados"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                    Certificação
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Community Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center"
          >
            <p className="text-xl text-muted-foreground">
              Mais que um curso.{" "}
              <span className="text-foreground font-semibold">Um ecossistema de crescimento.</span>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
