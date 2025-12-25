import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Users, Calendar, BookOpen } from "lucide-react";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { icon: Users, value: "1500+", label: "Vidas impactadas" },
    { icon: Calendar, value: "55+", label: "Imersões realizadas" },
    { icon: BookOpen, value: "10", label: "Anos de jornada" },
  ];

  return (
    <section id="sobre" ref={ref} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-2xl bg-card border border-border overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-primary/10 to-transparent flex items-center justify-center">
                <span className="text-6xl font-bold text-primary/20">IM</span>
              </div>
            </div>
            {/* Decorative glow */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-[80px]" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="section-title text-foreground mb-6">
              Quem está por trás dos Devocionalzeiros
            </h2>

            <div className="space-y-4 text-gray-light/80 text-lg leading-relaxed mb-8">
              <p>
                Sou <span className="text-foreground font-medium">Isaque Mariel</span> - teólogo, pastor auxiliar, esposo e pai. 
                Estudo as Escrituras desde os 11 anos e, ao longo dessa caminhada, fui confrontado por uma fé muitas vezes 
                vivida apenas no discurso.
              </p>
              <p>
                Desse confronto nasceu o <span className="text-primary font-medium">Devocionalzeiros</span>: um movimento de fé prática, 
                bíblica e constante. Hoje, caminho junto com mais de 1500 pessoas que decidiram amadurecer espiritualmente 
                e viver de forma integral.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="glass-card rounded-xl p-4 text-center"
                >
                  <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <motion.a
              href="#"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="btn-secondary inline-block"
            >
              Conhecer minha história
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;