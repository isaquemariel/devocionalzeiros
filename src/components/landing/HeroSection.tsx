import { motion } from "framer-motion";
import { PremiumButton } from "@/components/ui/premium-button";
import { ArrowRight } from "lucide-react";
const HeroSection = () => {
  const benefits = ["Fé aplicada à vida real", "Mentalidade fortalecida", "Corpo disciplinado", "Negócios alinhados", "Digital consciente"];
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden noise-overlay">
      {/* Background Effects */}
      <div className="absolute inset-0 geometric-grid opacity-30" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-glow-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-bright/10 rounded-full blur-[100px] animate-glow-pulse" style={{
      animationDelay: "1.5s"
    }} />
      
      {/* Geometric Accent Lines */}
      <div className="absolute top-20 left-10 w-px h-40 bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
      <div className="absolute top-40 right-20 w-px h-60 bg-gradient-to-b from-transparent via-primary/20 to-transparent" />
      
      <div className="container relative z-10 px-6 py-20 md:py-32">
        <motion.div initial={{
        opacity: 0,
        y: 40
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8,
        ease: "easeOut"
      }} className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div initial={{
          opacity: 0,
          scale: 0.9
        }} animate={{
          opacity: 1,
          scale: 1
        }} transition={{
          duration: 0.6,
          delay: 0.2
        }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">CLUBE HÁBITO DEVOCIONAL</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1 initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.3
        }} className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-primary via-blue-bright to-primary bg-clip-text text-transparent">CLUBE HD</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.4
        }} className="text-xl md:text-2xl text-foreground/90 font-medium mb-6">
            Desenvolvimento pessoal e espiritual para quem quer crescer por inteiro.
          </motion.p>

          {/* Description */}
          <motion.p initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.5
        }} className="text-lg text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
            O <span className="text-foreground font-medium">CLUBE HÁBITO DEVOCIONAL</span> é um ambiente de crescimento para cristãos que decidiram levar a fé a sério, sem desconectar vida espiritual, mente, corpo, negócios e realidade digital.
          </motion.p>

          {/* Support Text */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.6
        }} className="mb-10">
            <p className="text-foreground font-medium mb-4">
              Aqui, crescimento não é só espiritual. <span className="text-primary">É integral.</span>
            </p>

            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-3 max-w-3xl mx-auto">
              {benefits.map((benefit, index) => <motion.li key={benefit} initial={{
              opacity: 0,
              x: -20
            }} animate={{
              opacity: 1,
              x: 0
            }} transition={{
              duration: 0.5,
              delay: 0.7 + index * 0.1
            }} className="flex items-center gap-2 text-sm text-foreground/80">
                  <span className="text-primary">✓</span>
                  <span>{benefit}</span>
                </motion.li>)}
            </ul>
          </motion.div>

          {/* CTA */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.9
        }} className="pt-4">
            <PremiumButton size="lg" className="group">
              Quero entrar para o CLUBE HD
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </PremiumButton>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>;
};
export default HeroSection;