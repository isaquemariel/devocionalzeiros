import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { Volume2, Play, Pause, RotateCcw, BookHeart, Sparkles, BookOpen, ChevronRight, ChevronLeft, Highlighter, Search, Calendar, Target, Brain, Trophy, Mic, FileText, MessageCircle, Bot, Medal, Users } from "lucide-react";

// Cover images
import coverDevocional from "@/assets/cover-devocional.png";
import coverBibliaEstudo from "@/assets/cover-biblia-estudo.png";
import coverPlanoLeitura from "@/assets/cover-plano-leitura.png";
import coverQuiz from "@/assets/cover-quiz.png";
import coverSermao from "@/assets/cover-sermao.png";
import coverChat from "@/assets/cover-chat.png";
import coverRanking from "@/assets/cover-ranking.png";

interface FeatureVideos {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  youtubeId: string;
  cover: string;
  floatingBadges: { icon: React.ElementType; text: string; position: "top" | "bottom" }[];
}

const features: FeatureVideos[] = [
  {
    id: "devocional",
    title: "Devocional Diário",
    subtitle: "Fortaleça sua fé",
    description: "Reflexões diárias para fortalecer sua fé e manter sua constância espiritual.",
    icon: BookHeart,
    youtubeId: "Ct1K3dGZCK4",
    cover: coverDevocional,
    floatingBadges: [
      { icon: Sparkles, text: "Nova reflexão", position: "top" },
      { icon: BookHeart, text: "Dia 7 ✓", position: "bottom" },
    ],
  },
  {
    id: "biblia-estudo",
    title: "Bíblia de Estudo",
    subtitle: "Estude a Palavra",
    description: "Acesse comentários, grifos, favoritos e explicações detalhadas de cada versículo.",
    icon: BookOpen,
    youtubeId: "4knjThLkyIQ",
    cover: coverBibliaEstudo,
    floatingBadges: [
      { icon: Highlighter, text: "Versículo grifado", position: "top" },
      { icon: Search, text: "Busca inteligente", position: "bottom" },
    ],
  },
  {
    id: "plano-leitura",
    title: "Planos de Leitura",
    subtitle: "Leia a Bíblia toda",
    description: "Planos personalizados para ler a Bíblia em 90, 184 ou 365 dias com acompanhamento diário.",
    icon: Calendar,
    youtubeId: "sZIyWaVyP5I",
    cover: coverPlanoLeitura,
    floatingBadges: [
      { icon: Calendar, text: "Plano 365 dias", position: "top" },
      { icon: Target, text: "Meta concluída", position: "bottom" },
    ],
  },
  {
    id: "quiz",
    title: "Quiz Bíblico",
    subtitle: "Teste seu conhecimento",
    description: "Responda perguntas sobre os capítulos lidos e ganhe pontos para subir no ranking.",
    icon: Brain,
    youtubeId: "em02FjClFfE",
    cover: coverQuiz,
    floatingBadges: [
      { icon: Brain, text: "+10 pontos", position: "top" },
      { icon: Trophy, text: "Resposta correta!", position: "bottom" },
    ],
  },
  {
    id: "sermao",
    title: "Gerador de Sermão",
    subtitle: "Crie sermões com IA",
    description: "Gere esboços de sermões expositivos, textuais ou temáticos com inteligência artificial.",
    icon: Mic,
    youtubeId: "NXhBeU7nxDY",
    cover: coverSermao,
    floatingBadges: [
      { icon: Mic, text: "Sermão gerado", position: "top" },
      { icon: FileText, text: "Exportar PDF", position: "bottom" },
    ],
  },
  {
    id: "chat",
    title: "Devocionalzeiro.CHAT",
    subtitle: "Assistente teológico",
    description: "Converse com uma IA especializada em teologia e tire suas dúvidas sobre a Bíblia.",
    icon: MessageCircle,
    youtubeId: "WqlVco4Qo08",
    cover: coverChat,
    floatingBadges: [
      { icon: Bot, text: "IA Teológica", position: "top" },
      { icon: MessageCircle, text: "Resposta instantânea", position: "bottom" },
    ],
  },
  {
    id: "ranking",
    title: "Ranking da Comunidade",
    subtitle: "Compita com a comunidade",
    description: "Veja sua posição no ranking global e dispute o Top 3 com outros membros.",
    icon: Trophy,
    youtubeId: "1cogBNiZlF8",
    cover: coverRanking,
    floatingBadges: [
      { icon: Medal, text: "Top 3 🏆", position: "top" },
      { icon: Users, text: "Comunidade ativa", position: "bottom" },
    ],
  },
];

// Preload cover images on module load
const allCoverImages = features.map(f => f.cover);

if (typeof window !== 'undefined') {
  // Preconnect to YouTube for faster video loading
  const preconnectUrls = [
    'https://www.youtube.com',
    'https://www.youtube-nocookie.com',
    'https://i.ytimg.com',
    'https://www.google.com',
  ];
  
  preconnectUrls.forEach(url => {
    const existingLink = document.querySelector(`link[href="${url}"]`);
    if (!existingLink) {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = url;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    }
  });

  // DNS prefetch for YouTube domains
  const dnsPrefetchUrls = [
    'https://googleads.g.doubleclick.net',
    'https://static.doubleclick.net',
  ];
  
  dnsPrefetchUrls.forEach(url => {
    const existingLink = document.querySelector(`link[href="${url}"]`);
    if (!existingLink) {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = url;
      document.head.appendChild(link);
    }
  });

  // Preload YouTube thumbnails for faster display
  features.forEach((f) => {
    const thumbnailUrl = `https://i.ytimg.com/vi/${f.youtubeId}/maxresdefault.jpg`;
    const existingLink = document.querySelector(`link[href="${thumbnailUrl}"]`);
    if (!existingLink) {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.as = 'image';
      link.href = thumbnailUrl;
      document.head.appendChild(link);
    }
  });

  // Preload all cover images with high priority
  allCoverImages.forEach((url, index) => {
    const existingLink = document.querySelector(`link[href="${url}"]`);
    if (!existingLink) {
      const link = document.createElement('link');
      link.rel = index < 3 ? 'preload' : 'prefetch';
      link.as = 'image';
      link.href = url;
      document.head.appendChild(link);
    }
  });

  // Preload cover images using Image objects for decoding
  allCoverImages.forEach((url) => {
    const img = new Image();
    img.src = url;
    if ('decode' in img) {
      img.decode().catch(() => {});
    }
  });
}

// Feature Showcase Component
const FeatureShowcaseSection = () => {
  const sectionRef = useRef(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showReplay, setShowReplay] = useState(false);
  const [coverLoaded, setCoverLoaded] = useState<Record<string, boolean>>({});

  const feature = features[currentFeatureIndex];
  const hasNextFeature = currentFeatureIndex < features.length - 1;
  const hasPrevFeature = currentFeatureIndex > 0;

  // YouTube embed URL with parameters
  const getYouTubeEmbedUrl = (videoId: string, autoplay: boolean = false) => {
    return `https://www.youtube.com/embed/${videoId}?autoplay=${autoplay ? 1 : 0}&mute=0&controls=0&modestbranding=1&rel=0&showinfo=0&playsinline=1&loop=1&playlist=${videoId}&enablejsapi=1`;
  };

  const handlePlay = () => {
    setIsPlaying(true);
    setShowReplay(false);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  const handleNextFeature = () => {
    if (hasNextFeature) {
      setCurrentFeatureIndex(prev => prev + 1);
      setShowReplay(false);
      setIsPlaying(false);
    }
  };

  const handlePrevFeature = () => {
    if (hasPrevFeature) {
      setCurrentFeatureIndex(prev => prev - 1);
      setShowReplay(false);
      setIsPlaying(false);
    }
  };

  const handleReplay = () => {
    setShowReplay(false);
    setIsPlaying(true);
  };

  const handleFeatureSelect = (index: number) => {
    setCurrentFeatureIndex(index);
    setShowReplay(false);
    setIsPlaying(false);
  };

  const handleCoverLoad = (id: string) => {
    setCoverLoaded(prev => ({ ...prev, [id]: true }));
  };

  // Get floating badges for current feature
  const topBadge = feature.floatingBadges.find(b => b.position === "top");
  const bottomBadge = feature.floatingBadges.find(b => b.position === "bottom");

  return (
    <section ref={sectionRef} className="relative py-20 md:py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 geometric-grid opacity-20" />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[180px]" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-accent/8 rounded-full blur-[150px]" />

      <div className="container relative z-10 px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Veja na <span className="text-gradient">prática</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Descubra como cada funcionalidade vai transformar sua jornada espiritual
          </p>
        </motion.div>

        {/* Feature Navigation Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex justify-center gap-2 mb-10 flex-wrap"
        >
          {features.map((f, index) => (
            <button
              key={f.id}
              onClick={() => handleFeatureSelect(index)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 ${
                currentFeatureIndex === index
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted"
              }`}
            >
              <f.icon className="w-4 h-4" />
              <span className="text-sm font-medium hidden sm:inline">{f.title}</span>
            </button>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-6xl mx-auto">
          {/* Left Side - Feature Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="order-2 lg:order-1 text-center lg:text-left"
          >
            {/* Feature Icon & Title */}
            <AnimatePresence mode="wait">
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.25 }}
                className="mb-6"
              >
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
                  <feature.icon className="w-5 h-5 text-primary" />
                  <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                    {feature.title}
                  </span>
                </div>
                
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-foreground">
                  {feature.subtitle} <span className="text-accent">todos os dias</span>
                </h3>
                
                <p className="text-lg text-muted-foreground max-w-md mx-auto lg:mx-0">
                  {feature.description}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Feature Counter */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-sm text-muted-foreground mt-8"
            >
              Funcionalidade {currentFeatureIndex + 1} de {features.length}
            </motion.p>
          </motion.div>

          {/* Right Side - Phone Mockup with Video */}
          <motion.div
            ref={phoneRef}
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 120 }}
            className="relative flex justify-center items-center order-1 lg:order-2"
          >
            {/* Left Arrow Navigation */}
            {hasPrevFeature && (
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.2, x: -4 }}
                whileTap={{ scale: 0.9 }}
                onClick={handlePrevFeature}
                className="absolute left-0 lg:-left-6 z-30 flex items-center justify-center text-accent hover:text-accent/80 transition-colors"
              >
                <ChevronLeft className="w-8 h-8 drop-shadow-[0_2px_4px_rgba(212,175,55,0.4)]" strokeWidth={2.5} />
              </motion.button>
            )}

            {/* Right Arrow Navigation */}
            {hasNextFeature && (
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.2, x: 4 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleNextFeature}
                className="absolute right-0 lg:-right-6 z-30 flex items-center justify-center text-accent hover:text-accent/80 transition-colors"
              >
                <ChevronRight className="w-8 h-8 drop-shadow-[0_2px_4px_rgba(212,175,55,0.4)]" strokeWidth={2.5} />
              </motion.button>
            )}

            {/* Animated Glow Effects */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[520px] md:w-[380px] md:h-[620px] bg-primary/20 rounded-[60px] blur-[100px]"
            />
            <motion.div
              animate={{
                scale: [1.1, 1, 1.1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[450px] md:w-[320px] md:h-[520px] bg-accent/15 rounded-[50px] blur-[80px]"
            />

            {/* Floating Decorative Elements - Dynamic based on feature */}
            <AnimatePresence mode="wait">
              {topBadge && (
                <motion.div
                  key={`top-${feature.id}`}
                  initial={{ opacity: 0, scale: 0.8, x: 20 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    x: 0,
                    y: [0, -15, 0], 
                    rotate: [0, 8, 0] 
                  }}
                  exit={{ opacity: 0, scale: 0.8, x: 20 }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    opacity: { duration: 0.2 },
                    scale: { duration: 0.2 },
                    x: { duration: 0.2 }
                  }}
                  className="absolute -top-6 -right-6 md:top-0 md:right-0 z-20"
                >
                  <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 backdrop-blur-md shadow-lg">
                    <topBadge.icon className="w-4 h-4 text-primary" />
                    <span className="text-sm font-semibold text-primary">{topBadge.text}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {bottomBadge && (
                <motion.div
                  key={`bottom-${feature.id}`}
                  initial={{ opacity: 0, scale: 0.8, x: -20 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    x: 0,
                    y: [0, 12, 0], 
                    rotate: [0, -6, 0] 
                  }}
                  exit={{ opacity: 0, scale: 0.8, x: -20 }}
                  transition={{ 
                    duration: 4.5, 
                    repeat: Infinity, 
                    ease: "easeInOut", 
                    delay: 0.8,
                    opacity: { duration: 0.2 },
                    scale: { duration: 0.2 },
                    x: { duration: 0.2 }
                  }}
                  className="absolute -bottom-4 -left-6 md:bottom-8 md:left-0 z-20"
                >
                  <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-accent/20 to-accent/10 border border-accent/30 backdrop-blur-md shadow-lg">
                    <bottomBadge.icon className="w-4 h-4 text-accent" />
                    <span className="text-sm font-semibold text-accent">{bottomBadge.text}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Phone Mockup - Static */}
            <div className="relative z-10">
              {/* Phone Frame */}
              <div className="relative w-[260px] h-[530px] sm:w-[280px] sm:h-[570px] md:w-[300px] md:h-[610px]">
                {/* Phone Border with Gradient */}
                <div className="absolute inset-0 rounded-[44px] bg-gradient-to-b from-zinc-600 via-zinc-800 to-zinc-900 p-[3px] shadow-2xl shadow-black/60">
                  <div className="absolute inset-[3px] rounded-[41px] bg-black overflow-hidden">
                    {/* Dynamic Island / Notch */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-7 bg-black rounded-full z-30 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-zinc-800" />
                    </div>

                    {/* Screen Content */}
                    <div className="relative w-full h-full rounded-[38px] overflow-hidden bg-background">
                      {/* Cover Image - Shows when not playing */}
                      {!isPlaying && (
                        <div className="absolute inset-0 w-full h-full z-10">
                          <img
                            src={feature.cover}
                            alt={feature.title}
                            className="w-full h-full object-cover"
                            onLoad={() => handleCoverLoad(feature.id)}
                          />
                        </div>
                      )}

                      {/* YouTube iframe - Only rendered when playing */}
                      {isPlaying && (
                        <>
                          <iframe
                            ref={iframeRef}
                            src={getYouTubeEmbedUrl(feature.youtubeId, true)}
                            className="absolute inset-0 w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title={`Vídeo de ${feature.title}`}
                          />

                          {/* Pause overlay - appears on hover */}
                          <div 
                            className="absolute inset-0 z-20 cursor-pointer opacity-0 hover:opacity-100 transition-opacity duration-300"
                            onClick={togglePlay}
                          >
                            <div className="absolute inset-0 bg-black/20" />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="w-14 h-14 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center"
                              >
                                <Pause className="w-6 h-6 text-white" fill="currentColor" />
                              </motion.div>
                            </div>
                          </div>
                        </>
                      )}

                      {/* Play Overlay - Shows when not playing */}
                      {!isPlaying && !showReplay && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 flex flex-col items-center justify-center z-20 cursor-pointer group/play"
                          onClick={handlePlay}
                        >
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-16 h-16 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center shadow-lg shadow-primary/30 group-hover/play:shadow-primary/50 transition-shadow duration-300"
                          >
                            <Play className="w-7 h-7 text-primary-foreground ml-1" fill="currentColor" />
                          </motion.div>
                          <div className="mt-4 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full">
                            <Volume2 className="w-3.5 h-3.5 text-white" />
                            <span className="text-xs text-white/90 font-medium">Com áudio</span>
                          </div>
                        </motion.div>
                      )}

                      {/* Replay Overlay */}
                      {showReplay && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.2 }}
                          className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center gap-4 z-20"
                        >
                          {/* Replay Button */}
                          <motion.button
                            onClick={handleReplay}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground font-semibold shadow-lg"
                          >
                            <RotateCcw className="w-5 h-5" />
                            <span>Assistir novamente</span>
                          </motion.button>

                          {/* Next Feature Hint */}
                          {hasNextFeature && (
                            <motion.p
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 }}
                              className="text-sm text-muted-foreground flex items-center gap-1"
                            >
                              Use as setas para ver mais <ChevronRight className="w-4 h-4" />
                            </motion.p>
                          )}
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Side Buttons */}
                <div className="absolute right-[-2px] top-32 w-[3px] h-14 bg-zinc-700 rounded-l-sm" />
                <div className="absolute left-[-2px] top-28 w-[3px] h-10 bg-zinc-700 rounded-r-sm" />
                <div className="absolute left-[-2px] top-44 w-[3px] h-10 bg-zinc-700 rounded-r-sm" />

                {/* Reflection */}
                <div className="absolute inset-0 rounded-[44px] bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcaseSection;
