import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LogOut,
  Loader2,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Settings
} from "lucide-react";
import { useRankingNotifications } from "@/hooks/useRankingNotifications";
import { useAuth } from "@/hooks/useAuth";
import { useReadingProgress } from "@/hooks/useReadingProgress";
import { useUserPoints } from "@/hooks/useUserPoints";
import { useDailyLogin } from "@/hooks/useDailyLogin";
import { readingPlans, ReadingPlan, getBrazilDate } from "@/lib/bibleData";
import { AvatarUpload } from "@/components/profile/AvatarUpload";
import { PointsDisplay } from "@/components/quiz/PointsDisplay";
import { SettingsDialog } from "@/components/settings/SettingsDialog";
import logoWhite from "@/assets/logo-white.png";

// Card images
import cardLeituraBiblica from "@/assets/card-leitura-biblica.png";
import cardDevocional from "@/assets/card-devocional.png";
import cardRanking from "@/assets/card-ranking.png";
import cardChat from "@/assets/card-chat.png";
import cardSermao from "@/assets/card-sermao.png";
import cardQuiz from "@/assets/card-quiz.png";

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
                    loading="lazy"
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
  const [settingsOpen, setSettingsOpen] = useState(false);

  const startDate = profile?.created_at ? new Date(profile.created_at) : getBrazilDate();
  const currentPlan = (profile?.reading_plan || "365") as ReadingPlan;

  const {
    loading: scheduleLoading,
  } = useReadingProgress(user?.id, currentPlan, startDate);

  const { points, loading: pointsLoading } = useUserPoints(user?.id);
  
  // Record daily login
  useDailyLogin(user?.id);

  // Enable ranking notifications while user is on Home
  useRankingNotifications(user?.id);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  if (authLoading || (user && scheduleLoading)) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white overflow-x-hidden">
      {/* Premium Ambient Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[800px] h-[800px] bg-blue-600/8 rounded-full blur-[150px] -translate-y-1/2" />
        <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-primary/6 rounded-full blur-[120px] -translate-x-1/2" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px] translate-x-1/2" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <motion.header 
          className="flex items-center justify-between mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3">
            <img 
              src={logoWhite} 
              alt="CLUBE HD" 
              className="h-10 sm:h-12 w-auto"
            />
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => window.open("https://wa.me/+5584998982478?text=Oii%2C%20equipe.%20Preciso%20de%20suporte.%20", "_blank")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-600 hover:bg-green-700 text-white text-xs font-medium transition-colors"
              title="Suporte via WhatsApp"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Suporte</span>
            </button>
            <button
              onClick={() => setSettingsOpen(true)}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all"
              title="Configurações"
            >
              <Settings className="w-5 h-5 text-white/70" />
            </button>
            <button
              onClick={handleSignOut}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all"
              title="Sair"
            >
              <LogOut className="w-5 h-5 text-white/70" />
            </button>
          </div>
        </motion.header>

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
          
          {/* Points Display */}
          {points && !pointsLoading && (
            <PointsDisplay
              totalPoints={points.totalPoints}
              activeDays={points.activeDays}
              rank={points.rank}
              size="md"
            />
          )}
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

      {/* Settings Dialog */}
      <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
    </div>
  );
};

export default Home;