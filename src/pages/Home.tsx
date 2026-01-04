import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  LogOut,
  Loader2,
  Flame,
  ChevronRight
} from "lucide-react";
import { useRankingNotifications } from "@/hooks/useRankingNotifications";
import { useAuth } from "@/hooks/useAuth";
import { useReadingProgress } from "@/hooks/useReadingProgress";
import { readingPlans, ReadingPlan, getBrazilDate } from "@/lib/bibleData";
import { AvatarUpload } from "@/components/profile/AvatarUpload";
import logoWhite from "@/assets/logo-white.png";

// Card images
import cardLeituraBiblica from "@/assets/card-leitura-biblica.png";
import cardDevocional from "@/assets/card-devocional.png";
import cardRanking from "@/assets/card-ranking.png";
import cardChat from "@/assets/card-chat.png";

const StreakBadge = ({ days }: { days: number }) => (
  <motion.div 
    className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/30"
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 400 }}
  >
    <motion.div
      animate={{ 
        scale: [1, 1.2, 1],
        rotate: [0, 5, -5, 0]
      }}
      transition={{ 
        duration: 2, 
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <Flame className="w-4 h-4 text-orange-500" />
    </motion.div>
    <span className="font-bold text-sm text-orange-400">{days} dias</span>
  </motion.div>
);

interface FeatureCardProps {
  image: string;
  altText: string;
  onClick: () => void;
  delay?: number;
}

const FeatureCard = ({ image, altText, onClick, delay = 0 }: FeatureCardProps) => (
  <motion.button
    onClick={onClick}
    className="group relative w-full aspect-[3/4] rounded-2xl overflow-hidden"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    whileHover={{ scale: 1.02, y: -4 }}
    whileTap={{ scale: 0.98 }}
  >
    {/* Background Image */}
    <div 
      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
      style={{ backgroundImage: `url(${image})` }}
      aria-label={altText}
    />
    
    {/* Hover Glow Effect */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
    
    {/* Border Glow */}
    <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-primary/40 transition-colors duration-500" />
  </motion.button>
);

const Home = () => {
  const navigate = useNavigate();
  const { user, profile, loading: authLoading, signOut } = useAuth();

  const startDate = profile?.created_at ? new Date(profile.created_at) : getBrazilDate();
  const currentPlan = (profile?.reading_plan || "365") as ReadingPlan;
  const planConfig = readingPlans[currentPlan];

  const {
    loading: scheduleLoading,
    currentDay,
    streak,
    getTodaySchedule,
  } = useReadingProgress(user?.id, currentPlan, startDate);

  // Enable ranking notifications while user is on Home
  useRankingNotifications(user?.id);

  const todaySchedule = getTodaySchedule();

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

  const totalDays = planConfig.totalDays;
  const todayChaptersCount = todaySchedule?.chapters.length || 0;
  const completedChapters = todaySchedule?.chapters.filter(c => c.isCompleted).length || 0;

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white">
      {/* Premium Ambient Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[800px] h-[800px] bg-blue-600/8 rounded-full blur-[150px] -translate-y-1/2" />
        <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-primary/6 rounded-full blur-[120px] -translate-x-1/2" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px] translate-x-1/2" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <motion.header 
          className="flex items-center justify-between mb-8"
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
          <div className="flex items-center gap-3">
            <StreakBadge days={streak} />
            <button
              onClick={handleSignOut}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all"
              title="Sair"
            >
              <LogOut className="w-5 h-5 text-white/70" />
            </button>
          </div>
        </motion.header>

        {/* Welcome Section */}
        <motion.div
          className="mb-10 flex items-center gap-5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
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
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          className="mb-8 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div className="grid grid-cols-3 divide-x divide-white/10">
            <div className="text-center px-4">
              <p className="text-2xl sm:text-3xl font-black text-primary">{currentDay}</p>
              <p className="text-xs text-white/50 uppercase tracking-wider mt-1">Dia Atual</p>
            </div>
            <div className="text-center px-4">
              <p className="text-2xl sm:text-3xl font-black text-white">{totalDays}</p>
              <p className="text-xs text-white/50 uppercase tracking-wider mt-1">Total Dias</p>
            </div>
            <div className="text-center px-4">
              <p className="text-2xl sm:text-3xl font-black text-green-400">{completedChapters}/{todayChaptersCount}</p>
              <p className="text-xs text-white/50 uppercase tracking-wider mt-1">Hoje</p>
            </div>
          </div>
        </motion.div>

        {/* Section Title */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-lg font-bold text-white/90 uppercase tracking-wider">
            ÁREA DO DEVOCIONALZEIRO
          </h2>
          <p className="text-sm text-white/40 mt-1">
            Selecione uma ferramenta para continuar sua jornada
          </p>
        </motion.div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <FeatureCard
            image={cardLeituraBiblica}
            altText="Leitura Bíblica"
            onClick={() => navigate("/biblia")}
            delay={0.25}
          />
          
          <FeatureCard
            image={cardDevocional}
            altText="Devocional"
            onClick={() => navigate("/devocional")}
            delay={0.3}
          />
          
          <FeatureCard
            image={cardRanking}
            altText="Ranking"
            onClick={() => navigate("/ranking")}
            delay={0.35}
          />
          
          <FeatureCard
            image={cardChat}
            altText="Devocionalzeiro Chat"
            onClick={() => navigate("/chat")}
            delay={0.4}
          />
        </div>

        {/* Footer */}
        <motion.footer
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p className="text-xs text-white/30">
            CLUBE HD © {new Date().getFullYear()} • Todos os direitos reservados
          </p>
        </motion.footer>
      </div>
    </div>
  );
};

export default Home;
