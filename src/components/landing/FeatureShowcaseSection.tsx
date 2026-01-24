import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Volume2, VolumeX, Play, Pause, RotateCcw, BookHeart, Sparkles, BookOpen, ChevronRight, Highlighter, Search } from "lucide-react";
import devocionalVideo1 from "@/assets/devocional-video-1.mp4";
import devocionalVideo2 from "@/assets/devocional-video-2.mp4";
import bibliaEstudoVideo1 from "@/assets/biblia-estudo-video-1.mp4";
import bibliaEstudoVideo2 from "@/assets/biblia-estudo-video-2.mp4";
import bibliaEstudoVideo3 from "@/assets/biblia-estudo-video-3.mp4";

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
    videos: [devocionalVideo1, devocionalVideo2],
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
    videos: [bibliaEstudoVideo1, bibliaEstudoVideo2, bibliaEstudoVideo3],
    floatingBadges: [
      { icon: Highlighter, text: "Versículo grifado", position: "top" },
      { icon: Search, text: "Busca inteligente", position: "bottom" },
    ],
  },
];

const FeatureShowcaseSection = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [showNextFeature, setShowNextFeature] = useState(false);

  const feature = features[currentFeatureIndex];
  const currentVideos = feature.videos;
  const hasNextFeature = currentFeatureIndex < features.length - 1;

  // Handle video progress
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const currentProgress = (video.currentTime / video.duration) * 100;
      setProgress(currentProgress);
    };

    const handleEnded = () => {
      if (currentVideoIndex < currentVideos.length - 1) {
        // Move to next video in same feature
        setCurrentVideoIndex(prev => prev + 1);
        setProgress(0);
      } else if (hasNextFeature) {
        // Show next feature button
        setShowNextFeature(true);
        setIsPlaying(false);
      } else {
        // Loop back to first feature
        setShowNextFeature(true);
        setIsPlaying(false);
      }
    };

    const handleLoadedData = () => {
      setIsVideoLoaded(true);
      if (isPlaying) {
        video.play().catch(() => {});
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);
    video.addEventListener("loadeddata", handleLoadedData);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("loadeddata", handleLoadedData);
    };
  }, [currentVideoIndex, currentVideos.length, isPlaying, hasNextFeature]);

  // Auto-play when video changes
  useEffect(() => {
    const video = videoRef.current;
    if (!video || showNextFeature) return;

    setIsVideoLoaded(false);
    video.load();
  }, [currentVideoIndex, currentFeatureIndex, showNextFeature]);

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
    } else {
      // Loop back to first feature
      setCurrentFeatureIndex(0);
    }
    setCurrentVideoIndex(0);
    setShowNextFeature(false);
    setIsPlaying(true);
    setProgress(0);
  };

  const handleReplay = () => {
    setCurrentVideoIndex(0);
    setShowNextFeature(false);
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
          transition={{ duration: 0.6 }}
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
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center gap-2 mb-10"
        >
          {features.map((f, index) => (
            <button
              key={f.id}
              onClick={() => {
                setCurrentFeatureIndex(index);
                setCurrentVideoIndex(0);
                setShowNextFeature(false);
                setIsPlaying(true);
                setProgress(0);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
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
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-2 lg:order-1 text-center lg:text-left"
          >
            {/* Feature Icon & Title */}
            <AnimatePresence mode="wait">
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
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
                  transition={{ delay: 0.3 + index * 0.1 }}
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
              transition={{ delay: 0.5 }}
              className="text-sm text-muted-foreground mt-4"
            >
              Funcionalidade {currentFeatureIndex + 1} de {features.length}
            </motion.p>
          </motion.div>

          {/* Right Side - Phone Mockup with Video */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3, type: "spring", stiffness: 100 }}
            className="relative flex justify-center order-1 lg:order-2"
          >
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
                    opacity: { duration: 0.3 },
                    scale: { duration: 0.3 },
                    x: { duration: 0.3 }
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
                    opacity: { duration: 0.3 },
                    scale: { duration: 0.3 },
                    x: { duration: 0.3 }
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

            {/* Phone Mockup with Floating Animation */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10"
            >
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
                      {/* Loading State */}
                      {!isVideoLoaded && !showNextFeature && (
                        <div className="absolute inset-0 flex items-center justify-center bg-background z-20">
                          <div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin" />
                        </div>
                      )}

                      {/* Video */}
                      <video
                        ref={videoRef}
                        src={currentVideos[currentVideoIndex]}
                        muted={isMuted}
                        playsInline
                        autoPlay
                        preload="auto"
                        className={`w-full h-full object-cover transition-opacity duration-300 ${
                          isVideoLoaded ? "opacity-100" : "opacity-0"
                        }`}
                      />

                      {/* Next Feature / Replay Overlay */}
                      {showNextFeature && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center gap-4 z-20"
                        >
                          {/* Next Feature Button */}
                          <motion.button
                            onClick={handleNextFeature}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground font-semibold shadow-lg"
                          >
                            <span>{hasNextFeature ? "Próxima funcionalidade" : "Ver do início"}</span>
                            <ChevronRight className="w-5 h-5" />
                          </motion.button>

                          {/* Replay Button */}
                          <motion.button
                            onClick={handleReplay}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/50 text-muted-foreground text-sm"
                          >
                            <RotateCcw className="w-4 h-4" />
                            <span>Assistir novamente</span>
                          </motion.button>
                        </motion.div>
                      )}

                      {/* Video Controls Overlay */}
                      {!showNextFeature && (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
                          <motion.button
                            onClick={togglePlay}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-colors hover:bg-black/80"
                          >
                            {isPlaying ? (
                              <Pause className="w-4 h-4 text-white" />
                            ) : (
                              <Play className="w-4 h-4 text-white ml-0.5" />
                            )}
                          </motion.button>

                          <motion.button
                            onClick={toggleMute}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-colors hover:bg-black/80"
                          >
                            {isMuted ? (
                              <VolumeX className="w-4 h-4 text-white" />
                            ) : (
                              <Volume2 className="w-4 h-4 text-white" />
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
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcaseSection;
