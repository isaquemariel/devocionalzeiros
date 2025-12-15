import HeroSection from "@/components/landing/HeroSection";
import ProblemSection from "@/components/landing/ProblemSection";
import SolutionSection from "@/components/landing/SolutionSection";
import FounderSection from "@/components/landing/FounderSection";
import BusinessSection from "@/components/landing/BusinessSection";
import CommunitySection from "@/components/landing/CommunitySection";
import FinalSection from "@/components/landing/FinalSection";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <FounderSection />
      <BusinessSection />
      <CommunitySection />
      <FinalSection />
      <Footer />
    </main>
  );
};

export default Index;
