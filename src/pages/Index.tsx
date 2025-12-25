import { lazy, Suspense } from "react";
import Navbar from "@/components/devocionalzeiros/Navbar";
import HeroSection from "@/components/devocionalzeiros/HeroSection";

const AboutSection = lazy(() => import("@/components/devocionalzeiros/AboutSection"));
const DevotionalsSection = lazy(() => import("@/components/devocionalzeiros/DevotionalsSection"));
const ProjectsSection = lazy(() => import("@/components/devocionalzeiros/ProjectsSection"));
const ChannelsSection = lazy(() => import("@/components/devocionalzeiros/ChannelsSection"));
const Footer = lazy(() => import("@/components/devocionalzeiros/Footer"));

const SectionLoader = () => (
  <div className="min-h-[50vh] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const Index = () => {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <Suspense fallback={<SectionLoader />}>
        <AboutSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <DevotionalsSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <ProjectsSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <ChannelsSection />
      </Suspense>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </main>
  );
};

export default Index;