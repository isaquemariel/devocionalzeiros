import { lazy, Suspense, useEffect, useMemo } from "react";
import HeroSection from "@/components/landing/HeroSection";
import BookLayout from "@/components/landing/BookLayout";
import { preloadImagesInBackground } from "@/hooks/useImagePreloader";

import cardLeituraBiblica from "@/assets/card-leitura-biblica-new.png";
import cardDevocional from "@/assets/card-devocional-new.png";
import cardRanking from "@/assets/card-ranking.png";
import cardChat from "@/assets/card-chat.png";
import cardSermao from "@/assets/card-sermao.png";
import cardQuiz from "@/assets/card-quiz.png";
import cardEmbaixador from "@/assets/card-embaixador.png";
import cardBibliaEstudo from "@/assets/card-biblia-estudo.png";

const homeImages = [
  cardLeituraBiblica, cardDevocional, cardRanking, cardChat,
  cardSermao, cardQuiz, cardEmbaixador, cardBibliaEstudo,
];

const TargetAudienceSection = lazy(() => import("@/components/landing/TargetAudienceSection"));
const FeatureShowcaseSection = lazy(() => import("@/components/landing/FeatureShowcaseSection"));
const FounderSection = lazy(() => import("@/components/landing/FounderSection"));
const TestimonialsSection = lazy(() => import("@/components/landing/TestimonialsSection"));
const RPGHighlightSection = lazy(() => import("@/components/landing/RPGHighlightSection"));
const PricingSection = lazy(() => import("@/components/landing/PricingSection"));
const FinalCTASection = lazy(() => import("@/components/landing/FinalCTASection"));
const ContactSection = lazy(() => import("@/components/landing/ContactSection"));
const Footer = lazy(() => import("@/components/landing/Footer"));

const SectionLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const Index = () => {
  useEffect(() => {
    const idleCallback = typeof requestIdleCallback !== 'undefined' 
      ? requestIdleCallback 
      : (cb: () => void) => setTimeout(cb, 1);
    idleCallback(() => {
      preloadImagesInBackground(homeImages);
    });
  }, []);

  const pages = useMemo(() => [
    {
      id: "hero",
      label: "Início",
      content: (onAdvance: () => void) => <HeroSection onAdvance={onAdvance} />,
    },
    {
      id: "target",
      label: "Para quem é",
      content: (
        <Suspense fallback={<SectionLoader />}>
          <TargetAudienceSection />
        </Suspense>
      ),
    },
    {
      id: "features",
      label: "Funcionalidades",
      content: (
        <Suspense fallback={<SectionLoader />}>
          <FeatureShowcaseSection />
        </Suspense>
      ),
    },
    {
      id: "founder",
      label: "Fundador",
      content: (
        <Suspense fallback={<SectionLoader />}>
          <FounderSection />
        </Suspense>
      ),
    },
    {
      id: "testimonials",
      label: "Depoimentos",
      content: (
        <Suspense fallback={<SectionLoader />}>
          <TestimonialsSection />
        </Suspense>
      ),
    },
    {
      id: "rpg",
      label: "RPG Bíblico",
      content: (
        <Suspense fallback={<SectionLoader />}>
          <RPGHighlightSection />
        </Suspense>
      ),
    },
    {
      id: "pricing",
      label: "Planos",
      content: (
        <Suspense fallback={<SectionLoader />}>
          <div id="planos">
            <PricingSection />
          </div>
        </Suspense>
      ),
    },
    {
      id: "final",
      label: "Começar",
      content: (
        <Suspense fallback={<SectionLoader />}>
          <FinalCTASection />
          <ContactSection />
          <Footer />
        </Suspense>
      ),
    },
  ], []);

  return <BookLayout pages={pages} />;
};

export default Index;
