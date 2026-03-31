import { useEffect, useState, useRef, useCallback, memo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  LogOut,
  ChevronLeft,
  ChevronRight,
  Download } from
"lucide-react";
import { MascotLoader, DraggableFloatingMascot } from "@/components/shared/FloatingMascot";
import { LockedFeatureModal } from "@/components/shared/LockedFeatureModal";
import { useRankingNotifications } from "@/hooks/useRankingNotifications";
import { useAuth } from "@/hooks/useAuth";
import { useReadingProgress } from "@/hooks/useReadingProgress";
import { useDailyLogin } from "@/hooks/useDailyLogin";
import { useImagePreloader } from "@/hooks/useImagePreloader";
import { useUserPlan } from "@/hooks/useUserPlan";
import { useUpgradeCelebration } from "@/hooks/useUpgradeCelebration";
import { ReadingPlan, getBrazilDate } from "@/lib/bibleData";
import { AppHeader } from "@/components/shared/AppHeader";
import { Top3CelebrationModal } from "@/components/ranking/Top3CelebrationModal";

import { UpgradeCelebrationModal } from "@/components/shared/UpgradeCelebrationModal";
import { AdminUserCounter } from "@/components/admin/AdminUserCounter";
import InstallAppModal from "@/components/shared/InstallAppModal";
import { DailyUpgradeModal } from "@/components/shared/DailyUpgradeModal";
import { BottomNavBar } from "@/components/shared/BottomNavBar";

// Card images
import cardLeituraBiblica from "@/assets/card-leitura-biblica-new.png";
import cardDevocional from "@/assets/card-devocional-new.png";

import cardChat from "@/assets/card-chat.png";
import cardSermao from "@/assets/card-sermao.png";
import cardQuiz from "@/assets/card-quiz.png";
import cardBibliaEstudo from "@/assets/card-biblia-estudo.png";
import cardRpg from "@/assets/card-rpg.png";
import cardFinancas from "@/assets/card-financas.png";

// Preload all card images
const cardImages = [cardLeituraBiblica, cardQuiz, cardDevocional, cardChat, cardSermao, cardBibliaEstudo, cardRpg, cardFinancas];

// Feature display names for the modal
const FEATURE_NAMES: Record<string, string> = {
  leitura: "Leitura Bíblica",
  quiz: "Quiz Bíblico",
  devocional: "Devocional",
  ranking: "Ranking",
  chat: "Chat IA",
  sermao: "Gerador de Sermão",
  embaixador: "Programa Embaixador",
  bibliaEstudo: "Bíblia de Estudo",
  estudoVersiculo: "Estudo de Versículos",
  rpg: "Devocionalzeiros RPG",
  financas: "Devocionalzeiros Finanças"
};

interface FeatureItem {
  id: string;
  image: string;
  altText: string;
  route: string;
}

const baseFeatureItems: FeatureItem[] = [
{ id: "quiz", image: cardQuiz, altText: "Quiz Bíblico", route: "/quiz" },
{ id: "rpg", image: cardRpg, altText: "Jogo da Bíblia", route: "/rpg" },
{ id: "devocional", image: cardDevocional, altText: "Devocional", route: "/devocional" },
{ id: "bibliaEstudo", image: cardBibliaEstudo, altText: "Bíblia de Estudo", route: "/biblia-estudo" },
{ id: "leitura", image: cardLeituraBiblica, altText: "Leitura Bíblica", route: "/biblia" },
{ id: "financas", image: cardFinancas, altText: "Devocionalzeiros Finanças", route: "/financas" },
{ id: "chat", image: cardChat, altText: "Devocionalzeiro Chat", route: "/chat" },
{ id: "sermao", image: cardSermao, altText: "Gerador de Sermão", route: "/sermao" },
];


interface PremiumCarouselProps {
  items: FeatureItem[];
  onNavigate: (route: string, id: string) => void;
  lockedIds?: string[];
  activeIndex?: number;
}

const PremiumCarousel = memo(({ items, onNavigate, lockedIds = [] }: PremiumCarouselProps) => {
  const devocionalIndex = items.findIndex((item) => item.id === "devocional");
  const [activeIndex, setActiveIndex] = useState(devocionalIndex >= 0 ? devocionalIndex : 1);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const isSwiping = useRef(false);

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const goToPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  const handleCardClick = useCallback((index: number, item: FeatureItem) => {
    if (isSwiping.current) {
      isSwiping.current = false;
      return;
    }

    if (index === activeIndex) {
      onNavigate(item.route, item.id);
    } else {
      setActiveIndex(index);
    }
  }, [activeIndex, onNavigate]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
    isSwiping.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
    const diff = Math.abs(touchStartX.current - touchEndX.current);
    if (diff > 10) {
      isSwiping.current = true;
    }
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goToNext();else
      goToPrev();
    }
  };

  const getCardPosition = (index: number) => {
    const diff = index - activeIndex;
    const normalizedDiff = (diff + items.length + Math.floor(items.length / 2)) % items.length - Math.floor(items.length / 2);
    return normalizedDiff;
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      <div
        className="relative h-[280px] sm:h-[340px] md:h-[400px] lg:h-[460px] flex items-center justify-center overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}>
        
        <div className="absolute w-48 h-48 sm:w-64 sm:h-64 bg-primary/20 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative w-full h-full flex items-center justify-center">
          {items.map((item, index) => {
            const position = getCardPosition(index);
            const isActive = position === 0;
            const isVisible = Math.abs(position) <= 1;
            const isLocked = lockedIds.includes(item.id);

            if (!isVisible) return null;

            return (
              <motion.div
                key={item.id}
                onClick={() => handleCardClick(index, item)}
                className={`absolute cursor-pointer select-none ${isActive ? 'z-30' : 'z-10'}`}
                style={{
                  transform: `translateX(${position * 85}%) scale(${isActive ? 1 : 0.75}) rotateY(${position * -15}deg)`,
                  opacity: isActive ? 1 : 0.5,
                  transition: 'transform 0.4s ease-out, opacity 0.3s ease-out',
                  perspective: '1000px',
                  transformStyle: 'preserve-3d'
                }}>
                
                <div
                  className={`
                    relative w-48 sm:w-56 md:w-64 lg:w-72 aspect-[3/4] rounded-2xl overflow-hidden
                    transition-shadow duration-300
                    ${isActive ?
                  'shadow-[0_0_60px_rgba(59,130,246,0.4)] ring-2 ring-primary/50' :
                  'shadow-xl grayscale-[30%]'}
                  `
                  }>
                  
                  <img
                    src={item.image}
                    alt={item.altText}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="eager"
                    decoding="async"
                    draggable={false} />

                  {isActive && !isLocked &&
                  <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/60 via-black/20 to-transparent hidden sm:flex items-end justify-center pb-4">
                      <div className="flex items-center gap-1 text-white/90 text-xs font-medium uppercase tracking-wider">
                        <span>Clique para acessar</span>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  }
                  
                  <div className={`
                    absolute inset-0 rounded-2xl border pointer-events-none
                    ${isActive ? 'border-primary/60' : 'border-white/10'}
                  `} />
                </div>
              </motion.div>);

          })}
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 mt-4">
        <button
          onClick={goToPrev}
          className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all active:scale-95">
          
          <ChevronLeft className="w-5 h-5 text-white/70" />
        </button>

        <div className="flex items-center gap-2">
          {items.map((_, index) =>
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`
                h-2 rounded-full transition-all duration-300
                ${index === activeIndex ?
            'w-8 bg-primary' :
            'w-2 bg-white/20 hover:bg-white/40'}
              `
            } />

          )}
        </div>

        <button
          onClick={goToNext}
          className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all active:scale-95">
          
          <ChevronRight className="w-5 h-5 text-white/70" />
        </button>
      </div>
    </div>);

});

PremiumCarousel.displayName = 'PremiumCarousel';

const Home = () => {
  const navigate = useNavigate();
  const { user, profile, loading: authLoading, signOut } = useAuth();

  // Preload images for smooth carousel
  const { imagesLoaded } = useImagePreloader(cardImages);

  const startDate = profile?.created_at ? new Date(profile.created_at) : getBrazilDate();
  const currentPlan = (profile?.reading_plan || "365") as ReadingPlan;

  const {
    loading: scheduleLoading
  } = useReadingProgress(user?.id, currentPlan, startDate);

  // Record daily login
  useDailyLogin(user?.id);

  // Enable ranking notifications while user is on Home
  const { showTop3Modal, top3Rank, closeTop3Modal } = useRankingNotifications(user?.id);

  // Get user plan
  const { planType, loading: planLoading, isInactive } = useUserPlan(user?.email || undefined);

  const LOCKED_FOR_FREE = ["chat", "sermao"];
  const LOCKED_FOR_GOLD: string[] = [];

  const isFeatureLocked = useCallback((featureId: string): boolean => {
    if (planType === "free" || planType === null) return LOCKED_FOR_FREE.includes(featureId);
    if (planType === "gold") return LOCKED_FOR_GOLD.includes(featureId);
    return false;
  }, [planType]);

  const [lockedModal, setLockedModal] = useState<{open: boolean;featureId: string;featureName: string;}>({
    open: false, featureId: "", featureName: ""
  });

  const handleNavigate = useCallback((route: string, featureId: string) => {
    if (isFeatureLocked(featureId)) {
      const name = FEATURE_NAMES[featureId] || featureId;
      setLockedModal({ open: true, featureId, featureName: name });
      return;
    }
    navigate(route);
  }, [isFeatureLocked, navigate]);

  const featureItems = baseFeatureItems;

  const lockedIds = baseFeatureItems.
  filter((item) => isFeatureLocked(item.id)).
  map((item) => item.id);

  // Upgrade celebration
  const { showCelebration, newPlanName, dismissCelebration } = useUpgradeCelebration(
    user?.email || undefined,
    planType
  );

  const [showInstallModal, setShowInstallModal] = useState(false);

  // Listen for install modal event from settings
  useEffect(() => {
    const handler = () => setShowInstallModal(true);
    window.addEventListener("open-install-modal", handler);
    return () => window.removeEventListener("open-install-modal", handler);
  }, []);
  const [showDailyUpgrade, setShowDailyUpgrade] = useState(false);

  // Show daily upgrade popup for free users every 24h
  useEffect(() => {
    if (planLoading || !user || planType !== "free") return;

    const key = `daily_upgrade_shown_ts_${user.id}`;
    const lastShownTs = localStorage.getItem(key);
    const now = Date.now();
    const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;

    if (!lastShownTs || now - parseInt(lastShownTs, 10) >= TWENTY_FOUR_HOURS) {
      const timer = setTimeout(() => {
        setShowDailyUpgrade(true);
        localStorage.setItem(key, String(now));
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [planLoading, planType, user]);

  // Redirect to auth if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  // Force logout if user is inactive (deactivated by admin)
  useEffect(() => {
    if (!planLoading && isInactive && user) {
      signOut().then(() => {
        navigate("/auth");
        setTimeout(() => {
          toast.error("Seu acesso foi desativado. Entre em contato com o suporte para mais informações.", {
            duration: 8000
          });
        }, 100);
      });
    }
  }, [planLoading, isInactive, user, signOut, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  if (authLoading || user && scheduleLoading || !imagesLoaded || planLoading) {
    return <MascotLoader />;
  }

   return (
    <div className="h-[100svh] bg-black text-white overflow-hidden noise-overlay flex flex-col">
      {/* Subtle Texture Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden bg-black">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} />
        <div className="absolute top-0 right-1/4 w-[800px] h-[800px] bg-blue-600/[0.03] rounded-full blur-[200px] -translate-y-1/2" />
        <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-primary/[0.02] rounded-full blur-[180px] -translate-x-1/2" />
      </div>

      <div className="relative z-10 flex-1 flex flex-col max-w-6xl mx-auto w-full px-4 sm:px-6 pt-4 pb-16">
        {/* Header */}
        <AppHeader
          userId={user?.id}
          userEmail={user?.email || undefined}
          showBack={false}
          profileName={profile?.full_name || undefined}
          profileAvatarUrl={profile?.avatar_url || undefined}
          rightContent={
          <button
            onClick={handleSignOut}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all"
            title="Sair">
              <LogOut className="w-5 h-5 text-white/70" />
            </button>
          } />

        {/* Premium Carousel — fills remaining space, vertically centered */}
        <div className="flex-1 flex items-center justify-center">
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}>
            <PremiumCarousel
              items={featureItems}
              onNavigate={handleNavigate}
              lockedIds={lockedIds} />
          </motion.div>
        </div>
      </div>

      {/* Top 3 Celebration Modal */}
      <Top3CelebrationModal
        isOpen={showTop3Modal}
        rank={top3Rank}
        onClose={closeTop3Modal} />
      

      {/* Upgrade Celebration Modal */}
      <UpgradeCelebrationModal
        isOpen={showCelebration}
        onClose={dismissCelebration}
        planName={newPlanName} />
      

      {/* Daily Upgrade Modal for Free Users */}
      <DailyUpgradeModal isOpen={showDailyUpgrade} onClose={() => setShowDailyUpgrade(false)} />

      {/* Install App Modal */}
      <InstallAppModal isOpen={showInstallModal} onClose={() => setShowInstallModal(false)} />

      {/* Locked Feature Modal */}
      <LockedFeatureModal
        isOpen={lockedModal.open}
        onClose={() => setLockedModal((m) => ({ ...m, open: false }))}
        featureName={lockedModal.featureName}
        featureId={lockedModal.featureId}
        currentPlan={planType || "free"} />
      

      {/* Draggable Floating Mascot with Devotional Reminder */}
      <DraggableFloatingMascot userId={user?.id} />

      {/* Fixed Bottom Navigation Bar */}
      <BottomNavBar />
    </div>);

};

export default Home;