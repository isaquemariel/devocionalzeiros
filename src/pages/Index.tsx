import { lazy, Suspense, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import HeroSection from "@/components/landing/HeroSection";
import LandingHeader from "@/components/landing/LandingHeader";

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

const SectionDivider = lazy(() => import("@/components/landing/SectionDivider"));
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
  <div className="min-h-[50vh] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const Index = () => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);

  // Redirect authenticated users to /home
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        navigate("/home", { replace: true });
      } else {
        setChecked(true);
      }
    });
  }, [navigate]);

  useEffect(() => {
    const idleCallback = typeof requestIdleCallback !== 'undefined' 
      ? requestIdleCallback 
      : (cb: () => void) => setTimeout(cb, 1);
    idleCallback(() => {
      preloadImagesInBackground(homeImages);
    });
  }, []);

  if (!checked) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background overflow-x-hidden landing-gold">
      <LandingHeader />
      <HeroSection />
      <Suspense fallback={null}><SectionDivider /></Suspense>
      <Suspense fallback={<SectionLoader />}><TestimonialsSection /></Suspense>
      <Suspense fallback={null}><SectionDivider /></Suspense>
      <Suspense fallback={<SectionLoader />}><RPGHighlightSection /></Suspense>
      <Suspense fallback={null}><SectionDivider /></Suspense>
      <Suspense fallback={<SectionLoader />}><PricingSection /></Suspense>
      <Suspense fallback={null}><SectionDivider /></Suspense>
      <Suspense fallback={<SectionLoader />}><ContactSection /></Suspense>
      <Suspense fallback={null}><Footer /></Suspense>
    </main>
  );
};

export default Index;
