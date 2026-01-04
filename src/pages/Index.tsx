import { lazy, Suspense } from "react";
import HeroSection from "@/components/landing/HeroSection";

const ProblemSection = lazy(() => import("@/components/landing/ProblemSection"));
const SolutionSection = lazy(() => import("@/components/landing/SolutionSection"));
const FounderSection = lazy(() => import("@/components/landing/FounderSection"));
const BusinessSection = lazy(() => import("@/components/landing/BusinessSection"));
const CommunitySection = lazy(() => import("@/components/landing/CommunitySection"));
const FinalSection = lazy(() => import("@/components/landing/FinalSection"));
const Footer = lazy(() => import("@/components/landing/Footer"));

const SectionLoader = () => (
  <div className="min-h-[50vh] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const Index = () => {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <HeroSection />
      <Suspense fallback={<SectionLoader />}>
        <ProblemSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <SolutionSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <FounderSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <BusinessSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <CommunitySection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <FinalSection />
      </Suspense>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </main>
  );
};

export default Index;
