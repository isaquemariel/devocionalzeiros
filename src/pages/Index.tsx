import { lazy, Suspense, useEffect } from "react";
import HeroSection from "@/components/landing/HeroSection";
import LandingHeader from "@/components/landing/LandingHeader";
import { preloadImagesInBackground } from "@/hooks/useImagePreloader";

// Assets to preload for internal pages (Home)
import cardLeituraBiblica from "@/assets/card-leitura-biblica-new.png";
import cardDevocional from "@/assets/card-devocional-new.png";
import cardRanking from "@/assets/card-ranking.png";
import cardChat from "@/assets/card-chat.png";
import cardSermao from "@/assets/card-sermao.png";
import cardQuiz from "@/assets/card-quiz.png";
import cardEmbaixador from "@/assets/card-embaixador.png";
import cardBibliaEstudo from "@/assets/card-biblia-estudo.png";

const homeImages = [
  cardLeituraBiblica,
  cardDevocional,
  cardRanking,
  cardChat,
  cardSermao,
  cardQuiz,
  cardEmbaixador,
  cardBibliaEstudo,
];

const FeatureShowcaseSection = lazy(() => import("@/components/landing/FeatureShowcaseSection"));
const FounderSection = lazy(() => import("@/components/landing/FounderSection"));
const TestimonialsSection = lazy(() => import("@/components/landing/TestimonialsSection"));
const PricingSection = lazy(() => import("@/components/landing/PricingSection"));
const FinalCTASection = lazy(() => import("@/components/landing/FinalCTASection"));
const ContactSection = lazy(() => import("@/components/landing/ContactSection"));
const Footer = lazy(() => import("@/components/landing/Footer"));

const SectionLoader = () => (
  <div className="min-h-[50vh] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const Index = () => {
  // Preload Home page images in the background when landing page loads
  useEffect(() => {
    // Use requestIdleCallback for background preloading
    const idleCallback = typeof requestIdleCallback !== 'undefined' 
      ? requestIdleCallback 
      : (cb: () => void) => setTimeout(cb, 1);
    
    idleCallback(() => {
      preloadImagesInBackground(homeImages);
    });
  }, []);

  return (
    <main className="min-h-screen bg-background overflow-x-hidden landing-gold">
      <LandingHeader />
      <HeroSection />
      <Suspense fallback={<SectionLoader />}>
        <FeatureShowcaseSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <FounderSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <TestimonialsSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <PricingSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <FinalCTASection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <ContactSection />
      </Suspense>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </main>
  );
};

export default Index;
