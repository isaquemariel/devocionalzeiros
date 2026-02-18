import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Gamepad2, Sparkles, Swords, Map, Trophy, Zap } from "lucide-react";
import rpgMapCreation from "@/assets/rpg-map-creation.jpg";
import rpgMapDesert from "@/assets/rpg-map-desert.jpg";
import rpgMapGospels from "@/assets/rpg-map-gospels.jpg";
import rpgMapRevelation from "@/assets/rpg-map-revelation.jpg";
import rpgBgCreation from "@/assets/rpg-bg-creation.jpg";

const RPGHighlightSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const maps = [
    { src: rpgMapCreation, label: "Criação", delay: 0.3 },
    { src: rpgMapDesert, label: "Deserto", delay: 0.4 },
    { src: rpgMapGospels, label: "Evangelhos", delay: 0.5 },
    { src: rpgMapRevelation, label: "Apocalipse", delay: 0.6 },
  ];

  return (
    <section id="novidade" ref={ref} className="relative py-20 md:py-32 overflow-hidden">
      {/* Epic background */}
      <div className="absolute inset-0">
        <img
          src={rpgBgCreation}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-purple-950/80 to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
      </div>

      {/* Animated glow orbs */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[150px]"
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-pink-500/20 rounded-full blur-[120px]"
      />

      <div className="container relative z-10 px-4 sm:px-6 max-w-6xl mx-auto">
        {/* Top badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-600/40 to-pink-600/40 border-2 border-purple-400/50 backdrop-blur-sm shadow-[0_0_30px_rgba(168,85,247,0.3)]"
            >
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <span className="text-sm font-black tracking-[0.2em] uppercase text-white">
                Novidade Épica
              </span>
              <Sparkles className="w-5 h-5 text-yellow-400" />
            </motion.div>
          </div>
        </motion.div>

        {/* Main title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-center mb-4"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            <span className="text-white">Devocionalzeiros</span>{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent">
              RPG
            </span>
          </h2>
          <div className="flex items-center justify-center gap-2 mt-2">
            <Gamepad2 className="w-5 h-5 text-purple-400" />
            <span className="text-purple-300/80 text-sm font-semibold tracking-widest uppercase">
              O Jogo da Bíblia
            </span>
            <Gamepad2 className="w-5 h-5 text-purple-400" />
          </div>
        </motion.div>

        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="text-center mb-12 max-w-2xl mx-auto"
        >
          <p className="text-2xl md:text-3xl font-bold text-white mb-3">
            Quem disse que ler a Bíblia precisa ser chato?
          </p>
          <p className="text-lg text-purple-200/80">
            Transformamos a leitura bíblica em uma aventura épica. 
            Explore mapas, complete capítulos, responda quiz e ganhe XP!
          </p>
        </motion.div>

        {/* 3D Map showcase */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative mb-12"
          style={{ perspective: "1200px" }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {maps.map((map, i) => (
              <motion.div
                key={map.label}
                initial={{ opacity: 0, rotateY: -15, scale: 0.85 }}
                animate={isInView ? { opacity: 1, rotateY: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: map.delay }}
                whileHover={{ scale: 1.05, rotateY: 5, z: 30 }}
                className="relative group cursor-pointer"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="relative rounded-xl overflow-hidden border-2 border-purple-500/30 shadow-[0_0_25px_rgba(168,85,247,0.2)] group-hover:shadow-[0_0_40px_rgba(168,85,247,0.4)] transition-shadow duration-300">
                  <img
                    src={map.src}
                    alt={`Mapa ${map.label}`}
                    className="w-full aspect-[4/3] object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <span className="text-white text-sm font-bold">{map.label}</span>
                  </div>
                  {/* Glow border on hover */}
                  <div className="absolute inset-0 rounded-xl border-2 border-purple-400/0 group-hover:border-purple-400/60 transition-all duration-300" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* "DEMO" floating badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.8, type: "spring" }}
            className="absolute -top-4 -right-2 md:-right-4 z-20"
          >
            <motion.div
              animate={{ rotate: [0, 6, -6, 0], y: [0, -3, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 shadow-[0_0_20px_rgba(245,158,11,0.5)] font-black text-sm text-black tracking-wider"
            >
              🎮 JOGAR
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Feature stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="grid grid-cols-3 gap-3 md:gap-6 max-w-xl mx-auto mb-10"
        >
          {[
            { icon: Map, value: "12", label: "Regiões", color: "text-purple-400" },
            { icon: Swords, value: "Quiz", label: "A cada capítulo", color: "text-pink-400" },
            { icon: Trophy, value: "XP", label: "Ganhe e suba de nível", color: "text-yellow-400" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }}
              className="text-center p-3 rounded-xl bg-white/5 border border-purple-500/20 backdrop-blur-sm"
            >
              <stat.icon className={`w-5 h-5 mx-auto mb-1 ${stat.color}`} />
              <div className="text-lg font-black text-white">{stat.value}</div>
              <div className="text-xs text-purple-300/70">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 1 }}
          className="flex justify-center"
        >
          <motion.div
            animate={{ boxShadow: ["0 0 20px rgba(168,85,247,0.3)", "0 0 40px rgba(168,85,247,0.5)", "0 0 20px rgba(168,85,247,0.3)"] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600/50 to-pink-600/50 border border-purple-400/40 backdrop-blur-sm"
          >
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-white font-semibold">
              Exclusivo para membros <span className="font-black text-yellow-400">PREMIUM</span>
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default RPGHighlightSection;
