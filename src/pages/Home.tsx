import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { 
  BookOpen, 
  Calendar,
  LogOut,
  Loader2,
  Flame,
  Bot,
  ChevronRight
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useReadingProgress } from "@/hooks/useReadingProgress";
import { readingPlans, ReadingPlan, getBrazilDate } from "@/lib/bibleData";
import logoWhite from "@/assets/logo-white.png";
import logoBlack from "@/assets/logo-black.png";

const StreakBadge = ({ days }: { days: number }) => (
  <motion.div 
    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/30"
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
    <span className="font-semibold text-sm text-orange-400">{days} dias</span>
  </motion.div>
);

const Home = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
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
  const progressPercent = Math.round((currentDay / totalDays) * 100);
  const todayChaptersCount = todaySchedule?.chapters.length || 0;
  const completedChapters = todaySchedule?.chapters.filter(c => c.isCompleted).length || 0;

  const menuCards = [
    {
      id: "reading-plan",
      title: "Plano de Leitura",
      subtitle: planConfig.name,
      description: `Dia ${currentDay} de ${totalDays}`,
      icon: Calendar,
      color: "from-primary to-accent",
      stats: [
        { label: "Progresso", value: `${progressPercent}%` },
        { label: "Hoje", value: `${completedChapters}/${todayChaptersCount}` },
      ],
      onClick: () => navigate("/biblia"),
    },
    {
      id: "devotional",
      title: "Devocional do Dia",
      subtitle: "Reflexão diária",
      description: "Estudo guiado para crescimento espiritual",
      icon: BookOpen,
      color: "from-purple-500 to-pink-500",
      onClick: () => navigate("/devocional"),
    },
    {
      id: "chat",
      title: "Devocionalzeiro.CHAT",
      subtitle: "Assistente IA",
      description: "Tire dúvidas e explore a Bíblia com IA",
      icon: Bot,
      color: "from-cyan-500 to-blue-600",
      onClick: () => navigate("/chat"),
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <motion.header 
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3">
            <img 
              src={theme === "dark" ? logoWhite : logoBlack} 
              alt="CLUBE HD" 
              className="h-10 sm:h-12 w-auto"
            />
          </div>
          <div className="flex items-center gap-3">
            <StreakBadge days={streak} />
            <button
              onClick={handleSignOut}
              className="p-2 rounded-lg hover:bg-muted/10 transition-colors"
              title="Sair"
            >
              <LogOut className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </motion.header>

        {/* Welcome Section */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            Olá{profile?.full_name ? `, ${profile.full_name.split(' ')[0]}` : ''}!
          </h1>
          <p className="text-muted-foreground">
            O que você gostaria de fazer hoje?
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 gap-4">
          {menuCards.map((card, index) => (
            <motion.button
              key={card.id}
              onClick={card.onClick}
              className="group w-full text-left p-5 sm:p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              whileHover={{ scale: 1.01, y: -2 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                  <card.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h2 className="text-lg sm:text-xl font-bold">{card.title}</h2>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-sm text-primary font-medium mb-1">{card.subtitle}</p>
                  <p className="text-sm text-muted-foreground">{card.description}</p>
                  
                  {card.stats && (
                    <div className="flex gap-4 mt-3">
                      {card.stats.map((stat, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">{stat.label}:</span>
                          <span className="text-sm font-semibold text-primary">{stat.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
