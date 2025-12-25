import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Youtube, Instagram, Music2, MessageCircle } from "lucide-react";

const ChannelsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const channels = [
    {
      icon: Youtube,
      name: "YouTube",
      description: "Assista aos vídeos",
      link: "https://youtube.com/@devocionalzeiros",
      color: "hover:border-red-500/50 hover:shadow-red-500/20",
    },
    {
      icon: Instagram,
      name: "Instagram",
      description: "@devocionalzeiros",
      link: "https://instagram.com/devocionalzeiros",
      color: "hover:border-pink-500/50 hover:shadow-pink-500/20",
    },
    {
      icon: Music2,
      name: "TikTok",
      description: "Conteúdo rápido",
      link: "https://tiktok.com/@devocionalzeiros",
      color: "hover:border-cyan-500/50 hover:shadow-cyan-500/20",
    },
    {
      icon: MessageCircle,
      name: "Threads",
      description: "Reflexões diárias",
      link: "https://threads.net/@devocionalzeiros",
      color: "hover:border-foreground/50 hover:shadow-foreground/20",
    },
  ];

  return (
    <section id="canais" ref={ref} className="relative py-24 lg:py-32 overflow-hidden bg-card/30">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title text-foreground mb-4">Conecte-se nos canais</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Conteúdo diário sobre fé, constância e crescimento
          </p>
        </motion.div>

        {/* Channels Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 max-w-4xl mx-auto">
          {channels.map((channel, index) => (
            <motion.a
              key={channel.name}
              href={channel.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className={`glass-card rounded-2xl p-6 lg:p-8 text-center group transition-all duration-300 hover:scale-105 ${channel.color} hover:shadow-lg`}
            >
              <channel.icon className="w-10 h-10 mx-auto mb-4 text-foreground group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold text-foreground mb-1">{channel.name}</h3>
              <p className="text-sm text-muted-foreground">{channel.description}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChannelsSection;