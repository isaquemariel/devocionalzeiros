import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, ArrowRight } from "lucide-react";

const DevotionalsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const devotionals = [
    {
      title: "Tudo Novo",
      verse: "Eis que faço novas todas as coisas",
      reference: "Apocalipse 21:5",
      preview: "Um tempo novo de Deus está chegando em nossas vidas. Abra seus olhos espirituais para contemplar o extraordinário...",
      date: "25 de Dezembro, 2024",
    },
    {
      title: "O Cuidado de Deus",
      verse: "O Pai sabe que vocês precisam",
      reference: "Mateus 6:32",
      preview: "Jesus nos ensina a não nos preocuparmos com as necessidades diárias, pois Ele cuida de nós nos mínimos detalhes...",
      date: "24 de Dezembro, 2024",
    },
    {
      title: "Precisamos Trocar o Fardo",
      verse: "Venham a mim todos vocês que estão cansados",
      reference: "Mateus 11:28",
      preview: "Carregamos fardos pesados - preocupações, ansiedades, medos. Jesus nos convida a trocar por um mais leve...",
      date: "23 de Dezembro, 2024",
    },
  ];

  return (
    <section id="devocionais" ref={ref} className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title text-foreground mb-4">Devocionais Diários</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Conteúdo gratuito para alimentar sua jornada com Deus
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {devotionals.map((devotional, index) => (
            <motion.article
              key={devotional.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="glass-card-hover rounded-2xl p-6 lg:p-8 cursor-pointer group"
            >
              {/* Date */}
              <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
                <Calendar className="w-4 h-4" />
                <span>{devotional.date}</span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                {devotional.title}
              </h3>

              {/* Verse */}
              <blockquote className="border-l-2 border-primary pl-4 mb-4">
                <p className="text-gray-light/90 italic mb-1">"{devotional.verse}"</p>
                <cite className="text-primary text-sm not-italic">{devotional.reference}</cite>
              </blockquote>

              {/* Preview */}
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3">
                {devotional.preview}
              </p>

              {/* CTA */}
              <div className="flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all">
                <span>Ler devocional</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </motion.article>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <a
            href="https://notion.so"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center gap-2"
          >
            Ver todos os devocionais
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default DevotionalsSection;