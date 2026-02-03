import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Play, Pause, Volume2 } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface Testimonial {
  id: string;
  name: string;
  videoId: string;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Geovana",
    videoId: "cslZiqYbfYI",
  },
  {
    id: "2",
    name: "Janine",
    videoId: "wsOpceZGHvo",
  },
  {
    id: "3",
    name: "Igor",
    videoId: "hmiQJVhg65E",
  },
];

const VideoCard = ({ testimonial, index }: { testimonial: Testimonial; index: number }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handlePlay = () => {
    setIsPlaying(true);
    setShowOverlay(false);
  };

  const handlePause = () => {
    setIsPlaying(false);
    setShowOverlay(true);
  };

  const togglePlay = () => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  // YouTube embed URL with parameters for minimal UI
  const embedUrl = `https://www.youtube.com/embed/${testimonial.videoId}?autoplay=${isPlaying ? 1 : 0}&mute=0&controls=0&modestbranding=1&rel=0&showinfo=0&playsinline=1&loop=1&playlist=${testimonial.videoId}&enablejsapi=1`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      viewport={{ once: true }}
      className="relative group"
    >
      <div className="relative aspect-[9/16] w-full max-w-[280px] mx-auto rounded-2xl overflow-hidden bg-secondary/30 border border-white/10 shadow-2xl">
        {/* Gradient border effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 via-transparent to-primary/10 pointer-events-none z-10" />
        
        {/* Video thumbnail/placeholder when not playing */}
        {!isPlaying && (
          <div 
            className="absolute inset-0 z-20 cursor-pointer group/play"
            onClick={handlePlay}
          >
            {/* Thumbnail from YouTube */}
            <img
              src={`https://img.youtube.com/vi/${testimonial.videoId}/maxresdefault.jpg`}
              alt={`Depoimento de ${testimonial.name}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback to hqdefault if maxresdefault doesn't exist
                e.currentTarget.src = `https://img.youtube.com/vi/${testimonial.videoId}/hqdefault.jpg`;
              }}
            />
            
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/40 group-hover/play:bg-black/30 transition-colors duration-300" />
            
            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-16 h-16 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center shadow-lg shadow-primary/30 group-hover/play:shadow-primary/50 transition-shadow duration-300"
              >
                <Play className="w-7 h-7 text-primary-foreground ml-1" fill="currentColor" />
              </motion.div>
            </div>
            
            {/* Audio indicator */}
            <div className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full">
              <Volume2 className="w-3.5 h-3.5 text-white" />
              <span className="text-xs text-white/90 font-medium">Com áudio</span>
            </div>
          </div>
        )}
        
        {/* YouTube iframe - only rendered when playing */}
        {isPlaying && (
          <>
            <iframe
              ref={iframeRef}
              src={embedUrl}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={`Depoimento de ${testimonial.name}`}
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
        
        {/* Name badge */}
        <div className="absolute bottom-4 left-4 z-30 pointer-events-none">
          <div className="bg-black/70 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
            <span className="text-white font-semibold text-sm">{testimonial.name}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-16 md:py-24 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 geometric-grid opacity-10" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-bright/5 rounded-full blur-[120px]" />

      <div className="container relative z-10 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 md:mb-16"
          >
            <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-widest uppercase bg-primary/10 text-primary rounded-full border border-primary/20">
              Depoimentos
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Veja os feedbacks de quem <span className="text-gradient">acessa a plataforma</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Histórias reais de pessoas transformadas pelo Clube HD
            </p>
          </motion.div>

          {/* Carousel for mobile */}
          <div className="md:hidden">
            <Carousel
              opts={{
                align: "center",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2">
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={testimonial.id} className="pl-2 basis-[85%]">
                    <VideoCard testimonial={testimonial} index={index} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center gap-2 mt-6">
                <CarouselPrevious className="static translate-y-0 bg-secondary/50 border-white/10 hover:bg-secondary/80" />
                <CarouselNext className="static translate-y-0 bg-secondary/50 border-white/10 hover:bg-secondary/80" />
              </div>
            </Carousel>
          </div>

          {/* Grid for desktop */}
          <div className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((testimonial, index) => (
              <VideoCard key={testimonial.id} testimonial={testimonial} index={index} />
            ))}
          </div>

          {/* Bottom decoration */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex justify-center mt-12"
          >
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <div className="w-8 h-px bg-gradient-to-r from-transparent to-primary/50" />
              <span>Mais de 500 membros ativos</span>
              <div className="w-8 h-px bg-gradient-to-l from-transparent to-primary/50" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
