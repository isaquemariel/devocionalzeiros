import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { 
  Trophy, 
  ArrowLeft, 
  Crown,
  Medal,
  RefreshCw,
  Loader2,
  User
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import logoWhite from "@/assets/logo-white.png";
import logoBlack from "@/assets/logo-black.png";

interface RankingUser {
  user_id: string;
  full_name: string | null;
  chapters_read: number;
  total_reading_time: number;
  active_days: number;
  rank: number;
}

const Ranking = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { user, loading: authLoading } = useAuth();
  const [rankings, setRankings] = useState<RankingUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [previousRank, setPreviousRank] = useState<number | null>(null);

  const fetchRankings = async () => {
    try {
      const { data, error } = await supabase.rpc('get_user_rankings');
      
      if (error) throw error;
      
      const formattedData = (data || []).map((item: any) => ({
        user_id: item.user_id,
        full_name: item.full_name,
        chapters_read: Number(item.chapters_read),
        total_reading_time: Number(item.total_reading_time),
        active_days: Number(item.active_days),
        rank: Number(item.rank),
      }));
      
      // Check if current user entered top 5
      if (user) {
        const currentUserRank = formattedData.find(r => r.user_id === user.id);
        if (currentUserRank && previousRank !== null) {
          if (currentUserRank.rank <= 5 && previousRank > 5) {
            toast({
              title: "🏆 Parabéns!",
              description: `Você entrou no Top 5! Agora você está em ${currentUserRank.rank}º lugar!`,
            });
          } else if (currentUserRank.rank < previousRank && currentUserRank.rank <= 5) {
            toast({
              title: "🔥 Subindo no ranking!",
              description: `Você subiu para ${currentUserRank.rank}º lugar!`,
            });
          }
        }
        if (currentUserRank) {
          setPreviousRank(currentUserRank.rank);
        }
      }
      
      setRankings(formattedData);
    } catch (error) {
      console.error('Error fetching rankings:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
      return;
    }
    
    if (user) {
      fetchRankings();
      
      // Subscribe to realtime changes
      const channel = supabase
        .channel('ranking-updates')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'reading_progress'
          },
          () => {
            fetchRankings();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [user, authLoading, navigate]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchRankings();
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Carregando ranking...</p>
        </div>
      </div>
    );
  }

  const topThree = rankings.slice(0, 3);
  const restOfRanking = rankings.slice(3, 10);
  const currentUserRanking = rankings.find(r => r.user_id === user?.id);

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return "from-yellow-400 to-amber-500";
      case 2: return "from-gray-300 to-gray-400";
      case 3: return "from-amber-600 to-amber-700";
      default: return "from-primary/20 to-primary/30";
    }
  };

  const getPodiumHeight = (rank: number) => {
    switch (rank) {
      case 1: return "h-32";
      case 2: return "h-24";
      case 3: return "h-20";
      default: return "h-16";
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-yellow-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <motion.header 
          className="flex items-center justify-between mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/home")}
              className="p-2 rounded-lg hover:bg-muted/10 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <img 
              src={theme === "dark" ? logoWhite : logoBlack} 
              alt="CLUBE HD" 
              className="h-8 sm:h-10 w-auto"
            />
          </div>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border/50 hover:bg-muted/10 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            <span className="text-sm hidden sm:inline">Atualizar</span>
          </button>
        </motion.header>

        {/* Title */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Trophy className="w-8 h-8 text-yellow-500" />
            <h1 className="text-2xl sm:text-3xl font-bold">Ranking Devocionalzeiros</h1>
          </div>
          <p className="text-muted-foreground text-sm">
            Os leitores mais ativos da comunidade
          </p>
        </motion.div>

        {/* Podium Section */}
        {topThree.length > 0 && (
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-end justify-center gap-4">
              {/* 2nd Place */}
              {topThree[1] && (
                <motion.div
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="relative mb-2">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 p-1">
                      <div className="w-full h-full rounded-full bg-muted flex items-center justify-center">
                        <User className="w-8 h-8 text-muted-foreground" />
                      </div>
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gray-400 flex items-center justify-center text-white text-xs font-bold">
                      2
                    </div>
                  </div>
                  <p className="font-semibold text-sm truncate max-w-[80px] sm:max-w-[100px]">
                    {topThree[1].full_name || 'Anônimo'}
                  </p>
                  <p className="text-xs text-muted-foreground">{topThree[1].chapters_read} caps</p>
                  <div className={`w-20 sm:w-24 ${getPodiumHeight(2)} bg-gradient-to-b from-gray-300 to-gray-400 rounded-t-lg mt-2 flex items-center justify-center`}>
                    <span className="text-3xl font-bold text-white/80">2º</span>
                  </div>
                </motion.div>
              )}

              {/* 1st Place */}
              {topThree[0] && (
                <motion.div
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Crown className="w-8 h-8 text-yellow-500 mb-1" />
                  </motion.div>
                  <div className="relative mb-2">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 p-1 shadow-lg shadow-yellow-500/30">
                      <div className="w-full h-full rounded-full bg-muted flex items-center justify-center">
                        <User className="w-10 h-10 text-muted-foreground" />
                      </div>
                    </div>
                    <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-yellow-500 flex items-center justify-center text-white text-sm font-bold shadow-md">
                      1
                    </div>
                  </div>
                  <p className="font-bold text-base truncate max-w-[100px] sm:max-w-[120px]">
                    {topThree[0].full_name || 'Anônimo'}
                  </p>
                  <p className="text-xs text-yellow-500 font-medium flex items-center gap-1">
                    <Trophy className="w-3 h-3" /> Campeão do Mês
                  </p>
                  <p className="text-xs text-muted-foreground">{topThree[0].chapters_read} capítulos</p>
                  <div className={`w-24 sm:w-28 ${getPodiumHeight(1)} bg-gradient-to-b from-yellow-400 to-amber-500 rounded-t-lg mt-2 flex items-center justify-center shadow-lg shadow-yellow-500/20`}>
                    <span className="text-4xl font-bold text-white/90">1º</span>
                  </div>
                </motion.div>
              )}

              {/* 3rd Place */}
              {topThree[2] && (
                <motion.div
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="relative mb-2">
                    <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-full bg-gradient-to-br from-amber-600 to-amber-700 p-1">
                      <div className="w-full h-full rounded-full bg-muted flex items-center justify-center">
                        <User className="w-7 h-7 text-muted-foreground" />
                      </div>
                    </div>
                    <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-600 flex items-center justify-center text-white text-xs font-bold">
                      3
                    </div>
                  </div>
                  <p className="font-semibold text-sm truncate max-w-[70px] sm:max-w-[90px]">
                    {topThree[2].full_name || 'Anônimo'}
                  </p>
                  <p className="text-xs text-muted-foreground">{topThree[2].chapters_read} caps</p>
                  <div className={`w-18 sm:w-22 ${getPodiumHeight(3)} bg-gradient-to-b from-amber-600 to-amber-700 rounded-t-lg mt-2 flex items-center justify-center`}>
                    <span className="text-2xl font-bold text-white/80">3º</span>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* Rest of Ranking */}
        <motion.div
          className="space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Medal className="w-5 h-5 text-primary" />
            Top 10
          </h2>
          
          <AnimatePresence>
            {restOfRanking.map((rankUser, index) => (
              <motion.div
                key={rankUser.user_id}
                className={`flex items-center gap-4 p-4 rounded-xl bg-card/50 backdrop-blur-sm border ${
                  rankUser.user_id === user?.id 
                    ? 'border-primary/50 bg-primary/5' 
                    : 'border-border/50'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.05 }}
              >
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-bold text-muted-foreground">
                  {rankUser.rank}º
                </div>
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <User className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">
                    {rankUser.full_name || 'Anônimo'}
                    {rankUser.user_id === user?.id && (
                      <span className="text-xs text-primary ml-2">(você)</span>
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {rankUser.chapters_read} capítulos • {rankUser.active_days} dias ativos
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {rankings.length === 0 && (
            <div className="text-center py-12">
              <Trophy className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                Nenhum leitor no ranking ainda. Seja o primeiro!
              </p>
            </div>
          )}
        </motion.div>

        {/* Current User Position (if not in top 10) */}
        {currentUserRanking && currentUserRanking.rank > 10 && (
          <motion.div
            className="mt-6 p-4 rounded-xl bg-primary/10 border border-primary/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <p className="text-sm text-center">
              Sua posição atual: <span className="font-bold text-primary">{currentUserRanking.rank}º lugar</span>
              {' '}com {currentUserRanking.chapters_read} capítulos lidos
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Ranking;
