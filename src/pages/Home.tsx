import { useEffect, useState, useRef, useCallback, memo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Lock
} from "lucide-react";
import { MascotLoader } from "@/components/shared/FloatingMascot";
import { useRankingNotifications } from "@/hooks/useRankingNotifications";
import { useAuth } from "@/hooks/useAuth";
import { useReadingProgress } from "@/hooks/useReadingProgress";
import { useDailyLogin } from "@/hooks/useDailyLogin";
import { useImagePreloader } from "@/hooks/useImagePreloader";
import { useUserPlan } from "@/hooks/useUserPlan";
import { useUpgradeCelebration } from "@/hooks/useUpgradeCelebration";
import { useOnlinePresence } from "@/hooks/useOnlinePresence";
import { ReadingPlan, getBrazilDate } from "@/lib/bibleData";
import { AvatarUpload } from "@/components/profile/AvatarUpload";
import { AppHeader } from "@/components/shared/AppHeader";
import { Top3CelebrationModal } from "@/components/ranking/Top3CelebrationModal";
// DailyDevotionalReminder logic is now inside DraggableFloatingMascot
import { LockedFeatureModal } from "@/components/shared/LockedFeatureModal";
import { UpgradeCelebrationModal } from "@/components/shared/UpgradeCelebrationModal";
import { AdminUserCounter } from "@/components/admin/AdminUserCounter";


// Card images
import cardLeituraBiblica from "@/assets/card-leitura-biblica-new.png";
import cardDevocional from "@/assets/card-devocional-new.png";
import cardRanking from "@/assets/card-ranking.png";
import cardChat from "@/assets/card-chat.png";
import cardSermao from "@/assets/card-sermao.png";
import cardQuiz from "@/assets/card-quiz.png";
import cardEmbaixador from "@/assets/card-embaixador.png";
import cardBibliaEstudo from "@/assets/card-biblia-estudo.png";
import cardRpg from "@/assets/card-rpg.png";

// Preload all card images
const cardImages = [cardLeituraBiblica, cardQuiz, cardDevocional, cardRanking, cardChat, cardSermao, cardEmbaixador, cardBibliaEstudo, cardRpg];

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
};

interface FeatureItem {
  id: string;
  image: string;
  altText: string;
  route: string;
}

// Reordered: Devocional (center), Bíblia de Estudo, Leitura Bíblica
const baseFeatureItems: FeatureItem[] = [
  { id: "quiz", image: cardQuiz, altText: "Quiz Bíblico", route: "/quiz" },
  { id: "rpg", image: cardRpg, altText: "Jogo da Bíblia", route: "/rpg" },
  { id: "devocional", image: cardDevocional, altText: "Devocional", route: "/devocional" },
  { id: "bibliaEstudo", image: cardBibliaEstudo, altText: "Bíblia de Estudo", route: "/biblia-estudo" },
  { id: "leitura", image: cardLeituraBiblica, altText: "Leitura Bíblica", route: "/biblia" },
  { id: "ranking", image: cardRanking, altText: "Ranking", route: "/ranking" },
  { id: "chat", image: cardChat, altText: "Devocionalzeiro Chat", route: "/chat" },
  { id: "sermao", image: cardSermao, altText: "Gerador de Sermão", route: "/sermao" },
  { id: "embaixador", image: cardEmbaixador, altText: "Seja um Embaixador", route: "/embaixador" },
];

interface PremiumCarouselProps {
  items: FeatureItem[];
  onNavigate: (route: string) => void;
  lockedFeatures: string[];
  onLockedClick: (featureId: string) => void;
  activeIndex?: number;
}

const PremiumCarousel = memo(({ items, onNavigate, lockedFeatures, onLockedClick }: PremiumCarouselProps) => {
  // Start with devocional centered
  const devocionalIndex = items.findIndex(item => item.id === "devocional");
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
      // Check if feature is locked
      if (lockedFeatures.includes(item.id)) {
        onLockedClick(item.id);
      } else {
        onNavigate(item.route);
      }
    } else {
      setActiveIndex(index);
    }
  }, [activeIndex, onNavigate, lockedFeatures, onLockedClick]);

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
      if (diff > 0) goToNext();
      else goToPrev();
    }
  };

  const getCardPosition = (index: number) => {
    const diff = index - activeIndex;
    const normalizedDiff = ((diff + items.length + Math.floor(items.length / 2)) % items.length) - Math.floor(items.length / 2);
    return normalizedDiff;
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      <div 
        className="relative h-[340px] sm:h-[400px] md:h-[460px] lg:h-[520px] flex items-center justify-center overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="absolute w-48 h-48 sm:w-64 sm:h-64 bg-primary/20 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative w-full h-full flex items-center justify-center">
          {items.map((item, index) => {
            const position = getCardPosition(index);
            const isActive = position === 0;
            const isVisible = Math.abs(position) <= 1;

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
                  transformStyle: 'preserve-3d',
                }}
              >
                <div 
                  className={`
                    relative w-48 sm:w-56 md:w-64 lg:w-72 aspect-[3/4] rounded-2xl overflow-hidden
                    transition-shadow duration-300
                    ${isActive 
                      ? 'shadow-[0_0_60px_rgba(59,130,246,0.4)] ring-2 ring-primary/50' 
                      : 'shadow-xl grayscale-[30%]'
                    }
                  `}
                >
                  <img 
                    src={item.image}
                    alt={item.altText}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="eager"
                    decoding="async"
                    draggable={false}
                  />
                  
                  {/* Lock overlay for locked features */}
                  {lockedFeatures.includes(item.id) && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center border-2 border-amber-500/50">
                        <Lock className="w-8 h-8 text-amber-400" />
                      </div>
                    </div>
                  )}
                  
                  {isActive && !lockedFeatures.includes(item.id) && (
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/60 via-black/20 to-transparent hidden sm:flex items-end justify-center pb-4">
                      <div className="flex items-center gap-1 text-white/90 text-xs font-medium uppercase tracking-wider">
                        <span>Clique para acessar</span>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  )}
                  
                  {isActive && lockedFeatures.includes(item.id) && (
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end justify-center pb-4">
                      <div className="flex items-center gap-1 text-amber-400 text-xs font-medium uppercase tracking-wider">
                        <Lock className="w-3 h-3" />
                        <span>Upgrade necessário</span>
                      </div>
                    </div>
                  )}
                  
                  <div className={`
                    absolute inset-0 rounded-2xl border pointer-events-none
                    ${isActive ? 'border-primary/60' : 'border-white/10'}
                  `} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 mt-4">
        <button
          onClick={goToPrev}
          className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all active:scale-95"
        >
          <ChevronLeft className="w-5 h-5 text-white/70" />
        </button>

        <div className="flex items-center gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`
                h-2 rounded-full transition-all duration-300
                ${index === activeIndex 
                  ? 'w-8 bg-primary' 
                  : 'w-2 bg-white/20 hover:bg-white/40'
                }
              `}
            />
          ))}
        </div>

        <button
          onClick={goToNext}
          className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all active:scale-95"
        >
          <ChevronRight className="w-5 h-5 text-white/70" />
        </button>
      </div>
    </div>
  );
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
    loading: scheduleLoading,
  } = useReadingProgress(user?.id, currentPlan, startDate);
  
  // Record daily login
  useDailyLogin(user?.id);

  // Track online presence for realtime counter
  useOnlinePresence(user?.id);

  // Enable ranking notifications while user is on Home
  const { showTop3Modal, top3Rank, closeTop3Modal } = useRankingNotifications(user?.id);

  // Get user plan and locked features
  const { planType, loading: planLoading, getLockedFeatures, isInactive } = useUserPlan(user?.email || undefined);
  const lockedFeatures = getLockedFeatures();
  const isFreePlan = planType === "start";

  // RPG visible for all users, but locked for non-premium/admin/embaixador
  const featureItems = baseFeatureItems;
  
  // Upgrade celebration
  const { showCelebration, newPlanName, dismissCelebration } = useUpgradeCelebration(
    user?.email || undefined,
    planType
  );
  
  // State for locked feature modal
  const [lockedModalOpen, setLockedModalOpen] = useState(false);
  const [lockedFeatureId, setLockedFeatureId] = useState<string | null>(null);

  const handleLockedClick = useCallback((featureId: string) => {
    setLockedFeatureId(featureId);
    setLockedModalOpen(true);
  }, []);

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
        // Show message after redirect
        setTimeout(() => {
          toast.error("Seu acesso foi desativado. Entre em contato com o suporte para mais informações.", {
            duration: 8000,
          });
        }, 100);
      });
    }
  }, [planLoading, isInactive, user, signOut, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  if (authLoading || (user && scheduleLoading) || !imagesLoaded || planLoading) {
    return <MascotLoader />;
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden noise-overlay">
      {/* Subtle Texture Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden bg-black">
        {/* Subtle grid texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} />
        {/* Very subtle blue ambient glow */}
        <div className="absolute top-0 right-1/4 w-[800px] h-[800px] bg-blue-600/[0.03] rounded-full blur-[200px] -translate-y-1/2" />
        <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-primary/[0.02] rounded-full blur-[180px] -translate-x-1/2" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <AppHeader 
          userId={user?.id}
          userEmail={user?.email || undefined}
          showBack={false}
          rightContent={
            <button
              onClick={handleSignOut}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all"
              title="Sair"
            >
              <LogOut className="w-5 h-5 text-white/70" />
            </button>
          }
        />

        {/* Admin User Counter - Only visible for admins */}
        <AdminUserCounter />

        {/* Welcome Section with Points */}
        <motion.div
          className="mb-6 flex flex-col items-center text-center gap-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex flex-col items-center gap-4">
            {user && (
              <AvatarUpload 
                userId={user.id} 
                currentAvatarUrl={profile?.avatar_url}
                size="lg"
              />
            )}
            <div className="text-center">
              <p className="text-white/50 text-sm font-medium uppercase tracking-wider mb-1">
                Bem-vindo de volta
              </p>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
                {profile?.full_name 
                  ? profile.full_name.split(' ').slice(0, 2).join(' ') 
                  : 'Membro'}
              </h1>
            </div>
          </div>

        </motion.div>

        {/* Section Title */}
        <motion.div
          className="mb-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-wider bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 bg-clip-text text-transparent [text-shadow:0_0_30px_rgba(217,119,6,0.6),0_0_60px_rgba(217,119,6,0.3)]">
            ÁREA DO DEVOCIONALZEIRO
          </h2>
          <p className="text-sm text-white/40 mt-1">
            Selecione uma ferramenta para continuar sua jornada
          </p>
        </motion.div>

        {/* Premium Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <PremiumCarousel 
            items={featureItems} 
            onNavigate={navigate}
            lockedFeatures={lockedFeatures}
            onLockedClick={handleLockedClick}
          />
        </motion.div>

        {/* Footer */}
        <motion.footer
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p className="text-xs text-white/30">
            CLUBE HD © {new Date().getFullYear()} • Todos os direitos reservados
          </p>
        </motion.footer>
      </div>

      {/* Top 3 Celebration Modal */}
      <Top3CelebrationModal
        isOpen={showTop3Modal}
        rank={top3Rank}
        onClose={closeTop3Modal}
      />

      {/* Locked Feature Modal */}
      <LockedFeatureModal
        isOpen={lockedModalOpen}
        onClose={() => setLockedModalOpen(false)}
        featureName={lockedFeatureId ? FEATURE_NAMES[lockedFeatureId] : ""}
        isFreePlan={isFreePlan}
        currentPlan={planType || "start"}
      />

      {/* Upgrade Celebration Modal */}
      <UpgradeCelebrationModal
        isOpen={showCelebration}
        onClose={dismissCelebration}
        planName={newPlanName}
      />

    </div>
  );
};

export default Home;