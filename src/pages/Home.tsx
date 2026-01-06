import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  LogOut,
  Loader2,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useRankingNotifications } from "@/hooks/useRankingNotifications";
import { useAuth } from "@/hooks/useAuth";
import { useReadingProgress } from "@/hooks/useReadingProgress";
import { useDailyLogin } from "@/hooks/useDailyLogin";
import { useImagePreloader } from "@/hooks/useImagePreloader";
import { ReadingPlan, getBrazilDate } from "@/lib/bibleData";
import { AvatarUpload } from "@/components/profile/AvatarUpload";
import { AppHeader } from "@/components/shared/AppHeader";
import { Top3CelebrationModal } from "@/components/ranking/Top3CelebrationModal";

// Card images
import cardLeituraBiblica from "@/assets/card-leitura-biblica.png";
import cardDevocional from "@/assets/card-devocional.png";
import cardRanking from "@/assets/card-ranking.png";
import cardChat from "@/assets/card-chat.png";
import cardSermao from "@/assets/card-sermao.png";
import cardQuiz from "@/assets/card-quiz.png";

// Preload all card images
const cardImages = [cardLeituraBiblica, cardQuiz, cardDevocional, cardRanking, cardChat, cardSermao];

interface FeatureItem {
  id: string;
  image: string;
  altText: string;
  route: string;
}

const featureItems: FeatureItem[] = [
  { id: "leitura", image: cardLeituraBiblica, altText: "Leitura Bíblica", route: "/biblia" },
  { id: "quiz", image: cardQuiz, altText: "Quiz Bíblico", route: "/biblia?quiz=true" },
  { id: "devocional", image: cardDevocional, altText: "Devocional", route: "/devocional" },
  { id: "ranking", image: cardRanking, altText: "Ranking", route: "/ranking" },
  { id: "chat", image: cardChat, altText: "Devocionalzeiro Chat", route: "/chat" },
  { id: "sermao", image: cardSermao, altText: "Gerador de Sermão", route: "/sermao" },
];

interface PremiumCarouselProps {
  items: FeatureItem[];
  onNavigate: (route: string) => void;
}

const PremiumCarousel = ({ items, onNavigate }: PremiumCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
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

  const handleCardClick = useCallback((index: number, route: string) => {
    if (isSwiping.current) {
      isSwiping.current = false;
      return;
    }
    
    if (index === activeIndex) {
      onNavigate(route);
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
        className="relative h-[280px] sm:h-[340px] md:h-[380px] lg:h-[420px] flex items-center justify-center overflow-hidden"
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
                onClick={() => handleCardClick(index, item.route)}
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
                    relative w-36 sm:w-44 md:w-52 lg:w-60 aspect-[3/4] rounded-2xl overflow-hidden
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
                  
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/60 via-black/20 to-transparent hidden sm:flex items-end justify-center pb-4">
                      <div className="flex items-center gap-1 text-white/90 text-xs font-medium uppercase tracking-wider">
                        <span>Clique para acessar</span>
                        <ChevronRight className="w-4 h-4" />
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
};

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

  // Enable ranking notifications while user is on Home
  const { showTop3Modal, top3Rank, closeTop3Modal } = useRankingNotifications(user?.id);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  if (authLoading || (user && scheduleLoading) || !imagesLoaded) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
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

        {/* Welcome Section with Points */}
        <motion.div
          className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex items-center gap-5">
            {user && (
              <AvatarUpload 
                userId={user.id} 
                currentAvatarUrl={profile?.avatar_url}
                size="lg"
              />
            )}
            <div>
              <p className="text-white/50 text-sm font-medium uppercase tracking-wider mb-1">
                Bem-vindo de volta
              </p>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
                {profile?.full_name ? profile.full_name.split(' ')[0] : 'Membro'}
              </h1>
            </div>
          </div>
        </motion.div>

        {/* Section Title */}
        <motion.div
          className="mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <h2 className="text-lg font-bold text-white/90 uppercase tracking-wider">
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
    </div>
  );
};

export default Home;