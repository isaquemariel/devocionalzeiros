import { lazy, Suspense } from "react";
import HeroSection from "@/components/landing/HeroSection";
import LandingHeader from "@/components/landing/LandingHeader";

const AppShowcaseSection = lazy(() => import("@/components/landing/AppShowcaseSection"));
const FounderSection = lazy(() => import("@/components/landing/FounderSection"));
const PricingSection = lazy(() => import("@/components/landing/PricingSection"));
const FinalCTASection = lazy(() => import("@/components/landing/FinalCTASection"));
const Footer = lazy(() => import("@/components/landing/Footer"));

const SectionLoader = () => (
  <div className="min-h-[50vh] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const Index = () => {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <LandingHeader />
      <HeroSection />
      <Suspense fallback={<SectionLoader />}>
        <AppShowcaseSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <FounderSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <PricingSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <FinalCTASection />
      </Suspense>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </main>
  );
};

export default Index;
