import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { Volume2, VolumeX, Play, Pause, RotateCcw, BookHeart, Sparkles, BookOpen, ChevronRight, ChevronLeft, Highlighter, Search, Calendar, Target, Brain, Trophy, Mic, FileText, MessageCircle, Bot, Medal, Users } from "lucide-react";
import devocionalVideo from "@/assets/devocional-video-1.mp4";
import bibliaEstudoVideo from "@/assets/biblia-estudo-video-1.mp4";
import planoLeituraVideo from "@/assets/plano-leitura-video.mp4";
import quizVideo from "@/assets/quiz-video.mp4";
import sermaoVideo from "@/assets/sermao-video.mp4";
import chatVideo from "@/assets/chat-video.mp4";
import rankingVideo from "@/assets/ranking-video.mp4";

interface FeatureVideos {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  videos: string[];
  floatingBadges: { icon: React.ElementType; text: string; position: "top" | "bottom" }[];
}

const features: FeatureVideos[] = [
  {
    id: "devocional",
    title: "Devocional Diário",
    subtitle: "Fortaleça sua fé",
    description: "Reflexões diárias para fortalecer sua fé e manter sua constância espiritual.",
    icon: BookHeart,
    videos: [devocionalVideo],
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
    videos: [bibliaEstudoVideo],
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
    videos: [planoLeituraVideo],
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
    videos: [quizVideo],
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
    videos: [sermaoVideo],
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
    videos: [chatVideo],
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
    videos: [rankingVideo],
    floatingBadges: [
      { icon: Medal, text: "Top 3 🏆", position: "top" },
      { icon: Users, text: "Comunidade ativa", position: "bottom" },
    ],
  },
];

// Global preload - starts immediately when module loads
const preloadedVideoElements = new Map<string, HTMLVideoElement>();
let hasStartedPreload = false;

const preloadFirstVideo = () => {
  if (hasStartedPreload) return;
  hasStartedPreload = true;
  
  // Preload first video immediately with high priority
  const firstVideoSrc = features[0].videos[0];
  const video = document.createElement('video');
  video.src = firstVideoSrc;
  video.preload = 'auto';
  video.muted = true;
  video.playsInline = true;
  // Start loading immediately
  video.load();
  preloadedVideoElements.set(firstVideoSrc, video);
  
  // Preload second video after first is ready
  video.addEventListener('canplaythrough', () => {
    const secondVideoSrc = features[1]?.videos[0];
    if (secondVideoSrc && !preloadedVideoElements.has(secondVideoSrc)) {
      const video2 = document.createElement('video');
      video2.src = secondVideoSrc;
      video2.preload = 'auto';
      video2.muted = true;
      video2.load();
      preloadedVideoElements.set(secondVideoSrc, video2);
    }
  }, { once: true });
};

// Start preloading immediately when this module is imported
if (typeof window !== 'undefined') {
  // Use requestIdleCallback to not block initial render, but start ASAP
  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(preloadFirstVideo, { timeout: 500 });
  } else {
    setTimeout(preloadFirstVideo, 100);
  }
}

const FeatureShowcaseSection = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  // Start loading much earlier - 300px before phone is visible
  const isPhoneInView = useInView(phoneRef, { once: false, margin: "300px" });
  // Detect when section header is visible to start loading even earlier
  const isSectionNear = useInView(sectionRef, { once: true, margin: "500px" });
  
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [showReplay, setShowReplay] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  const feature = features[currentFeatureIndex];
  const currentVideos = feature.videos;
  const hasNextFeature = currentFeatureIndex < features.length - 1;
  const hasPrevFeature = currentFeatureIndex > 0;

  // Preload next videos in background
  const preloadNextVideo = useCallback((videoSrc: string) => {
    if (preloadedVideoElements.has(videoSrc)) return;
    
    const video = document.createElement('video');
    video.src = videoSrc;
    video.preload = 'auto';
    video.muted = true;
    video.load();
    preloadedVideoElements.set(videoSrc, video);
  }, []);

  // Start preloading when section is near (before it's even visible)
  useEffect(() => {
    if (isSectionNear) {
      preloadFirstVideo();
    }
  }, [isSectionNear]);

  // Preload current and next feature's video
  useEffect(() => {
    if (!isSectionNear) return;
    
    // Preload current video
    preloadNextVideo(currentVideos[currentVideoIndex]);
    
    // Preload next feature's first video
    if (hasNextFeature) {
      preloadNextVideo(features[currentFeatureIndex + 1].videos[0]);
    }
  }, [isSectionNear, currentFeatureIndex, currentVideoIndex, currentVideos, hasNextFeature, preloadNextVideo]);

  // Load video element when section is near (not just phone in view)
  useEffect(() => {
    if (isSectionNear && !shouldLoadVideo) {
      setShouldLoadVideo(true);
    }
  }, [isSectionNear, shouldLoadVideo]);

  // Reset video ready state when feature changes, but check if already preloaded
  useEffect(() => {
    const currentVideoSrc = currentVideos[currentVideoIndex];
    const preloadedVideo = preloadedVideoElements.get(currentVideoSrc);
    
    // If video is already fully loaded, mark as ready immediately
    if (preloadedVideo && preloadedVideo.readyState >= 4) {
      setIsVideoReady(true);
    } else {
      setIsVideoReady(false);
    }
  }, [currentFeatureIndex, currentVideoIndex, currentVideos]);

  // Play video when ready and in view
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoadVideo || showReplay) return;

    const playWhenReady = async () => {
      video.muted = true;
      setIsMuted(true);
      
      try {
        await video.play();
        setIsPlaying(true);
      } catch {
        // Silent fail - user interaction may be needed
      }
    };

    if (isPhoneInView && isVideoReady) {
      playWhenReady();
    } else if (!isPhoneInView && isPlaying) {
      setIsPlaying(false);
      video.pause();
    }
  }, [isPhoneInView, shouldLoadVideo, showReplay, isVideoReady, isPlaying]);

  // Handle video progress and events
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.duration > 0) {
        const currentProgress = (video.currentTime / video.duration) * 100;
        setProgress(currentProgress);
      }
    };

    const handleEnded = () => {
      if (currentVideoIndex < currentVideos.length - 1) {
        setCurrentVideoIndex(prev => prev + 1);
        setProgress(0);
      } else {
        setShowReplay(true);
        setIsPlaying(false);
      }
    };

    // canplaythrough fires when video can play without buffering
    const handleCanPlayThrough = () => {
      setIsVideoReady(true);
    };

    const handlePlaying = () => {
      setIsPlaying(true);
      setIsVideoReady(true);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);
    video.addEventListener("canplaythrough", handleCanPlayThrough);
    video.addEventListener("playing", handlePlaying);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("canplaythrough", handleCanPlayThrough);
      video.removeEventListener("playing", handlePlaying);
    };
  }, [currentVideoIndex, currentVideos.length]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleNextFeature = () => {
    if (hasNextFeature) {
      setCurrentFeatureIndex(prev => prev + 1);
      setCurrentVideoIndex(0);
      setShowReplay(false);
      setIsPlaying(true);
      setProgress(0);
    }
  };

  const handlePrevFeature = () => {
    if (hasPrevFeature) {
      setCurrentFeatureIndex(prev => prev - 1);
      setCurrentVideoIndex(0);
      setShowReplay(false);
      setIsPlaying(true);
      setProgress(0);
    }
  };

  const handleReplay = () => {
    setCurrentVideoIndex(0);
    setShowReplay(false);
    setIsPlaying(true);
    setProgress(0);
  };

  const handleFeatureSelect = (index: number) => {
    setCurrentFeatureIndex(index);
    setCurrentVideoIndex(0);
    setShowReplay(false);
    setIsPlaying(true);
    setProgress(0);
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

            {/* Video Progress Indicators */}
            <div className="flex items-center gap-2 justify-center lg:justify-start mt-8">
              {currentVideos.map((_, index) => (
                <motion.div
                  key={`${feature.id}-${index}`}
                  className="relative h-1.5 rounded-full bg-muted overflow-hidden"
                  style={{ width: `${100 / currentVideos.length}%`, maxWidth: "80px" }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                >
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-primary rounded-full"
                    style={{
                      width: index < currentVideoIndex 
                        ? "100%" 
                        : index === currentVideoIndex 
                          ? `${progress}%` 
                          : "0%"
                    }}
                    transition={{ duration: 0.1 }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Feature Counter */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-sm text-muted-foreground mt-4"
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
                      {/* Loading State - Shows gradient placeholder instead of black */}
                      {(!isVideoReady || !shouldLoadVideo) && !showReplay && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-primary/10 via-background to-accent/10 z-20">
                          <feature.icon className="w-12 h-12 text-primary/50 mb-4" />
                          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                        </div>
                      )}

                      {/* Video - Load aggressively with auto preload */}
                      {shouldLoadVideo ? (
                        <video
                          ref={videoRef}
                          src={currentVideos[currentVideoIndex]}
                          muted={isMuted}
                          playsInline
                          autoPlay
                          preload="auto"
                          className={`w-full h-full object-cover transition-opacity duration-150 ${
                            isVideoReady ? "opacity-100" : "opacity-0"
                          }`}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-b from-primary/10 via-background to-accent/10 flex flex-col items-center justify-center">
                          <feature.icon className="w-12 h-12 text-primary/50 mb-4" />
                          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                        </div>
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

                      {/* Video Controls Overlay */}
                      {!showReplay && (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
                          <motion.button
                            onClick={togglePlay}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-10 h-10 rounded-full bg-accent/90 backdrop-blur-sm border border-accent shadow-lg shadow-accent/30 flex items-center justify-center transition-colors hover:bg-accent"
                          >
                            {isPlaying ? (
                              <Pause className="w-4 h-4 text-accent-foreground" />
                            ) : (
                              <Play className="w-4 h-4 text-accent-foreground ml-0.5" />
                            )}
                          </motion.button>

                          <motion.button
                            onClick={toggleMute}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-10 h-10 rounded-full bg-accent/90 backdrop-blur-sm border border-accent shadow-lg shadow-accent/30 flex items-center justify-center transition-colors hover:bg-accent"
                          >
                            {isMuted ? (
                              <VolumeX className="w-4 h-4 text-accent-foreground" />
                            ) : (
                              <Volume2 className="w-4 h-4 text-accent-foreground" />
                            )}
                          </motion.button>
                        </div>
                      )}

                      {/* Progress Bar */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-20">
                        <motion.div
                          className="h-full bg-primary"
                          style={{ width: `${progress}%` }}
                          transition={{ duration: 0.1 }}
                        />
                      </div>
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
