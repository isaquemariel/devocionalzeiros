 import { motion } from "framer-motion";
 import { useInView } from "framer-motion";
 import { useRef, useState } from "react";
 import { Play, Pause, Volume2, ChevronLeft, ChevronRight } from "lucide-react";
 
 interface Testimonial {
   id: string;
   name: string;
   videoId: string;
 }
 
 const testimonials: Testimonial[] = [
   {
     id: "1",
     name: "Gabi Rodgher",
     videoId: "cslZiqYbfYI"
   },
   {
     id: "2",
     name: "Renan Noce",
     videoId: "wsOpceZGHvo"
   },
   {
     id: "3",
     name: "Aline Braga",
     videoId: "hmiQJVhg65E"
   },
   {
     id: "4",
     name: "Gabriely Borba",
     videoId: "LA0YiQhK6Sw"
   }
 ];
 
 const VideoCard = ({
   testimonial,
   isActive,
 }: {
   testimonial: Testimonial;
   isActive?: boolean;
 }) => {
   const [isPlaying, setIsPlaying] = useState(false);
   const iframeRef = useRef<HTMLIFrameElement>(null);
 
   const handlePlay = () => {
     setIsPlaying(true);
   };
 
   const togglePlay = () => {
     setIsPlaying(!isPlaying);
   };
 
   const embedUrl = `https://www.youtube.com/embed/${testimonial.videoId}?autoplay=${isPlaying ? 1 : 0}&mute=0&controls=0&modestbranding=1&rel=0&showinfo=0&playsinline=1&loop=1&playlist=${testimonial.videoId}&enablejsapi=1`;
 
   return (
     <div className="relative group h-full">
       <div 
         className={`relative aspect-[9/16] w-full rounded-2xl overflow-hidden bg-secondary/30 border shadow-2xl transition-all duration-300 ${
           isActive 
             ? 'border-primary/40 shadow-primary/20' 
             : 'border-white/10'
         }`}
       >
         {isActive && (
           <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 via-transparent to-primary/10 pointer-events-none z-10" />
         )}
 
         {!isPlaying && (
           <div className="absolute inset-0 z-20 cursor-pointer group/play" onClick={handlePlay}>
             <img 
               src={`https://img.youtube.com/vi/${testimonial.videoId}/maxresdefault.jpg`} 
               alt={`Depoimento de ${testimonial.name}`} 
               className="w-full h-full object-cover" 
               onError={e => {
                 e.currentTarget.src = `https://img.youtube.com/vi/${testimonial.videoId}/hqdefault.jpg`;
               }} 
             />
             <div className="absolute inset-0 bg-black/40 group-hover/play:bg-black/30 transition-colors duration-300" />
             <div className="absolute inset-0 flex items-center justify-center">
               <motion.div 
                 whileHover={{ scale: 1.1 }} 
                 whileTap={{ scale: 0.95 }} 
                 className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center shadow-lg shadow-primary/30 group-hover/play:shadow-primary/50 transition-shadow duration-300"
               >
                 <Play className="w-6 h-6 md:w-7 md:h-7 text-primary-foreground ml-1" fill="currentColor" />
               </motion.div>
             </div>
             <div className="absolute bottom-14 md:bottom-16 right-3 md:right-4 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-2.5 py-1 md:px-3 md:py-1.5 rounded-full">
               <Volume2 className="w-3 h-3 md:w-3.5 md:h-3.5 text-white" />
               <span className="text-[10px] md:text-xs text-white/90 font-medium">Com áudio</span>
             </div>
           </div>
         )}
 
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
             <div className="absolute inset-0 z-20 cursor-pointer opacity-0 hover:opacity-100 transition-opacity duration-300" onClick={togglePlay}>
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
 
         <div className="absolute bottom-3 md:bottom-4 left-3 md:left-4 z-30 pointer-events-none">
           <div className="bg-black/70 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/10">
             <span className="text-white font-semibold text-xs md:text-sm">{testimonial.name}</span>
           </div>
         </div>
       </div>
     </div>
   );
 };
 
 const TestimonialsSection = () => {
   const ref = useRef(null);
   const isInView = useInView(ref, { once: true, margin: "-100px" });
   const [currentIndex, setCurrentIndex] = useState(1);
 
   const handlePrev = () => {
     setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
   };
 
   const handleNext = () => {
     setCurrentIndex((prev) => (prev + 1) % testimonials.length);
   };
 
   const getVisibleTestimonials = () => {
     const prevIdx = (currentIndex - 1 + testimonials.length) % testimonials.length;
     const nextIdx = (currentIndex + 1) % testimonials.length;
     return [
       { testimonial: testimonials[prevIdx], position: 'left' as const },
       { testimonial: testimonials[currentIndex], position: 'center' as const },
       { testimonial: testimonials[nextIdx], position: 'right' as const },
     ];
   };
 
   const visibleItems = getVisibleTestimonials();
 
   return (
     <section ref={ref} className="relative py-16 md:py-24 overflow-hidden">
       <div className="absolute inset-0 geometric-grid opacity-10" />
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-primary/5 rounded-full blur-[60px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-bright/3 rounded-full blur-[50px]" />
 
       <div className="container relative z-10 px-4 md:px-6">
         <div className="max-w-6xl mx-auto">
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
               Veja os feedbacks de quem{" "}
               <span className="text-gradient">acessa a plataforma</span>
             </h2>
             <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
               Quem acessa o Devocionalzeiros compartilha com todas as pessoas.
             </p>
           </motion.div>
 
           <div className="relative">
             <button
               onClick={handlePrev}
               className="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-secondary/70 backdrop-blur-sm border border-white/10 flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
               aria-label="Anterior"
             >
               <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
             </button>
             
             <button
               onClick={handleNext}
               className="absolute right-0 md:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-secondary/70 backdrop-blur-sm border border-white/10 flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
               aria-label="Próximo"
             >
               <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
             </button>
 
             <div className="flex items-center justify-center gap-3 md:gap-6 px-12 md:px-20">
               {visibleItems.map(({ testimonial, position }) => (
                 <motion.div
                   key={`${testimonial.id}-${position}`}
                   initial={false}
                   animate={{
                     scale: position === 'center' ? 1 : 0.85,
                     opacity: position === 'center' ? 1 : 0.5,
                     zIndex: position === 'center' ? 10 : 1,
                   }}
                   transition={{ duration: 0.3, ease: "easeOut" }}
                   className={`flex-shrink-0 ${
                     position === 'center' 
                       ? 'w-[180px] sm:w-[220px] md:w-[260px] lg:w-[280px]' 
                       : 'w-[120px] sm:w-[160px] md:w-[200px] lg:w-[220px] hidden sm:block'
                   }`}
                 >
                   <VideoCard 
                     testimonial={testimonial} 
                     isActive={position === 'center'}
                   />
                 </motion.div>
               ))}
             </div>
 
             <div className="flex justify-center gap-2 mt-8">
               {testimonials.map((_, index) => (
                 <button
                   key={index}
                   onClick={() => setCurrentIndex(index)}
                   className={`transition-all duration-300 rounded-full ${
                     index === currentIndex
                       ? "w-8 h-2 bg-primary"
                       : "w-2 h-2 bg-foreground/20 hover:bg-foreground/40"
                   }`}
                   aria-label={`Ir para depoimento ${index + 1}`}
                 />
               ))}
             </div>
           </div>
 
           <motion.div 
             initial={{ opacity: 0 }} 
             animate={isInView ? { opacity: 1 } : {}} 
             transition={{ duration: 1, delay: 0.8 }} 
             className="flex justify-center mt-12"
           >
             <div className="flex items-center gap-2 text-muted-foreground text-sm">
               <div className="w-8 h-px bg-gradient-to-r from-transparent to-primary/50" />
               <span>Mais de 200 membros ativos</span>
               <div className="w-8 h-px bg-gradient-to-l from-transparent to-primary/50" />
             </div>
           </motion.div>
         </div>
       </div>
     </section>
   );
 };
 
 export default TestimonialsSection;