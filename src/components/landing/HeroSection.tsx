import { motion } from "framer-motion";
import { useState, useRef, useEffect, memo } from "react";
import { PremiumButton } from "@/components/ui/premium-button";
import { ArrowRight, BookOpen, Trophy, Users, Sparkles, Play, Pause, RotateCcw, Volume2, VolumeX } from "lucide-react";
import appDemoVideo from "@/assets/app-demo-video.mp4";

// Memoized floating element to prevent re-renders
const FloatingBadge = memo(({ 
  children, 
  animation, 
  className,
  delay = 0 
}: { 
  children: React.ReactNode; 
  animation: { y: number[]; rotate?: number[] };
  className: string;
  delay?: number;
}) => (
  <motion.div
    animate={animation}
    transition={{ 
      duration: animation.rotate ? 4 : 3.5, 
      repeat: Infinity,
      ease: "easeInOut",
      delay
    }}
    className={className}
  >
    {children}
  </motion.div>
));

FloatingBadge.displayName = 'FloatingBadge';

const HeroSection = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      setIsPlaying(false);
      setHasEnded(true);
      setProgress(100);
    };

    const handleTimeUpdate = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    const handleCanPlay = () => {
      setVideoLoaded(true);
      if (!hasStartedRef.current) {
        hasStartedRef.current = true;
        video.currentTime = 0;
        video.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {});
      }
    };

    video.addEventListener('ended', handleEnded);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('canplay', handleCanPlay);

    // If already ready
    if (video.readyState >= 3 && !hasStartedRef.current) {
      setVideoLoaded(true);
      hasStartedRef.current = true;
      video.currentTime = 0;
      video.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {});
    }

    return () => {
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, []);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (hasEnded) {
      video.currentTime = 0;
      video.play();
      setHasEnded(false);
      setIsPlaying(true);
      setProgress(0);
    } else if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(!isMuted);
  };

  const highlights = [
    { icon: BookOpen, text: "Planos de leitura personalizados" },
    { icon: Trophy, text: "Sistema de pontos e ranking" },
    { icon: Users, text: "Comunidade engajada" },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden noise-overlay pt-24 pb-16">
      {/* Background Effects */}
      <div className="absolute inset-0 geometric-grid opacity-30" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-glow-pulse" />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-bright/10 rounded-full blur-[100px] animate-glow-pulse"
        style={{ animationDelay: "1.5s" }}
      />

      {/* Geometric Accent Lines */}
      <div className="absolute top-20 left-10 w-px h-40 bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
      <div className="absolute top-40 right-20 w-px h-60 bg-gradient-to-b from-transparent via-primary/20 to-transparent" />

      <div className="container relative z-10 px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left order-2 lg:order-1"
          >
            {/* Impactful Statistic */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-5"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-destructive mb-1">
                70% dos cristãos
              </h1>
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-destructive/80">
                nunca leram a Bíblia toda
              </p>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-base md:text-lg text-foreground/70 mb-4"
            >
              Você <span className="text-primary font-semibold">não precisa</span> fazer parte dessa estatística
            </motion.p>

            {/* App Introduction */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl lg:text-3xl text-foreground font-semibold mb-4"
            >
              Conheça o{" "}
              <span className="font-black bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(245,158,11,0.4)]">
                CLUBE HD
              </span>
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-base text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-6 leading-relaxed"
            >
              O aplicativo que vai te ajudar a criar o{" "}
              <span className="text-foreground font-medium">hábito diário de leitura bíblica</span> com{" "}
              <span className="text-primary font-semibold">gamificação</span>,{" "}
              <span className="text-primary font-semibold">pontuação</span> e{" "}
              <span className="text-primary font-semibold">ranking</span>.
            </motion.p>

            {/* Constancy Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-6"
            >
              <p className="text-foreground/80 italic text-base mb-5 border-l-2 border-primary pl-4 max-w-md mx-auto lg:mx-0 text-left">
                "Fé não é intensidade momentânea. É{" "}
                <span className="text-primary font-semibold">constância diária</span> diante de Deus."
              </p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-2 md:gap-3">
                {highlights.map((item, index) => (
                  <motion.div
                    key={item.text}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 border border-border/50"
                  >
                    <item.icon className="w-3.5 h-3.5 text-primary" />
                    <span className="text-xs text-foreground/80">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex flex-col items-center lg:items-start gap-3"
            >
              <div className="flex flex-col items-center gap-2">
                <a
                  href="#planos"
                  onClick={() => typeof window !== "undefined" && (window as any).fbq?.("track", "Lead")}
                >
                  <PremiumButton size="lg" className="group px-8">
                    <span className="whitespace-nowrap">
                      QUERO SAIR DESSA ESTATÍSTICA
                    </span>
                    <ArrowRight className="w-5 h-5 flex-shrink-0 transition-transform group-hover:translate-x-1" />
                  </PremiumButton>
                </a>
                
                {/* Social Proof */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.1 }}
                  className="text-xs text-muted-foreground text-center"
                >
                  <span className="text-foreground font-semibold">+1.500</span> pessoas já transformaram sua vida
                </motion.p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Phone Mockup with Video */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="relative flex justify-center order-1 lg:order-2"
          >
            {/* Glow Effects behind phone */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[500px] md:w-[350px] md:h-[600px] bg-primary/20 rounded-full blur-[100px] animate-glow-pulse" />
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[400px] md:w-[300px] md:h-[500px] bg-amber-500/15 rounded-full blur-[80px] animate-glow-pulse"
              style={{ animationDelay: "1s" }}
            />
            
            {/* Floating Elements */}
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-4 -right-4 md:top-0 md:right-4 z-20"
            >
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-amber-500/20 to-amber-600/10 border border-amber-500/30 backdrop-blur-sm">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-semibold text-amber-400">Top 1</span>
              </div>
            </motion.div>

            <motion.div
              animate={{ 
                y: [0, 10, 0],
                rotate: [0, -5, 0]
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
              className="absolute -bottom-2 -left-4 md:bottom-4 md:left-0 z-20"
            >
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-xs font-semibold text-primary">+50 pts</span>
              </div>
            </motion.div>

            <motion.div
              animate={{ 
                y: [0, -8, 0],
              }}
              transition={{ 
                duration: 3.5, 
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute top-1/2 -right-8 md:-right-4 z-20"
            >
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 backdrop-blur-sm">
                <BookOpen className="w-4 h-4 text-primary" />
                <span className="text-xs font-semibold text-primary">7 dias</span>
              </div>
            </motion.div>

            {/* Phone Mockup */}
            <motion.div
              animate={{ 
                y: [0, -8, 0]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative z-10"
            >
              {/* Phone Frame */}
              <div className="relative w-[240px] h-[490px] sm:w-[260px] sm:h-[530px] md:w-[280px] md:h-[570px]">
                {/* Phone Border/Frame */}
                <div className="absolute inset-0 rounded-[40px] bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-900 p-[3px] shadow-2xl shadow-black/50">
                  <div className="absolute inset-[3px] rounded-[37px] bg-black overflow-hidden">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-b-2xl z-20" />
                    
                    {/* Screen Content - Video */}
                      <div className="relative w-full h-full rounded-[34px] overflow-hidden bg-zinc-900">
                        {/* Loading placeholder */}
                        {!videoLoaded && (
                          <div className="absolute inset-0 flex items-center justify-center bg-zinc-900 z-10">
                            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                          </div>
                        )}
                        <video
                          ref={videoRef}
                          src={appDemoVideo}
                          autoPlay
                          muted
                          playsInline
                          preload="auto"
                          className={`w-full h-full object-cover transition-opacity duration-150 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
                        />
                        {/* Loading placeholder */}
                        {!videoLoaded && (
                          <div className="absolute inset-0 flex items-center justify-center bg-zinc-900">
                            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                          </div>
                        )}
                        
                        {/* Progress Bar */}
                        {videoLoaded && (
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-30">
                            <div 
                              className="h-full bg-primary transition-all duration-150 ease-linear"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        )}
                        
                        {/* Video Controls */}
                        {videoLoaded && (
                          <div className="absolute bottom-4 right-4 z-30 flex gap-2">
                            <button
                              onClick={toggleMute}
                              className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
                              aria-label={isMuted ? "Ativar som" : "Desativar som"}
                            >
                              {isMuted ? (
                                <VolumeX className="w-4 h-4" />
                              ) : (
                                <Volume2 className="w-4 h-4" />
                              )}
                            </button>
                            <button
                              onClick={togglePlayPause}
                              className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
                              aria-label={hasEnded ? "Replay" : isPlaying ? "Pause" : "Play"}
                            >
                              {hasEnded ? (
                                <RotateCcw className="w-4 h-4" />
                              ) : isPlaying ? (
                                <Pause className="w-4 h-4" />
                              ) : (
                                <Play className="w-4 h-4 ml-0.5" />
                              )}
                            </button>
                          </div>
                        )}
                      </div>
                  </div>
                </div>

                {/* Side Button (Power) */}
                <div className="absolute right-[-2px] top-28 w-[3px] h-12 bg-zinc-700 rounded-l-sm" />
                
                {/* Side Buttons (Volume) */}
                <div className="absolute left-[-2px] top-24 w-[3px] h-8 bg-zinc-700 rounded-r-sm" />
                <div className="absolute left-[-2px] top-36 w-[3px] h-8 bg-zinc-700 rounded-r-sm" />

                {/* Reflection Effect */}
                <div className="absolute inset-0 rounded-[40px] bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
