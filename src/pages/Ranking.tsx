import { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Crown, Medal, RefreshCw, Loader2, User, Star, Calendar, History } from "lucide-react";
import { BottomNavBar } from "@/components/shared/BottomNavBar";
import { useAuth } from "@/hooks/useAuth";
import { useAdminCheck } from "@/hooks/useAdminCheck";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { AppHeader } from "@/components/shared/AppHeader";
import { RankingHistoryModal } from "@/components/ranking/RankingHistoryModal";
import { UserDetailsModal } from "@/components/ranking/UserDetailsModal";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";


interface RankingUser {
  user_id: string;
  full_name: string | null;
  avatar_url: string | null;
  chapters_read: number;
  quiz_points: number;
  devotional_points: number;
  rpg_points: number;
  total_points: number;
  active_days: number;
  rank: number;
}

interface PreviousChampion {
  user_id: string;
  full_name: string | null;
  avatar_url: string | null;
  rank: number;
  total_points: number;
  month_year: string;
}

// Session-level cache for rankings to avoid re-fetching heavy RPC on every navigation
const rankingsCache: { data: RankingUser[]; champions: PreviousChampion[]; fetchedAt: number } | null = null;
let rankingsCacheRef = rankingsCache;
const RANKINGS_CACHE_TTL = 3 * 60 * 1000; // 3 minutes

const Ranking = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { isAdmin } = useAdminCheck();
  const [rankings, setRankings] = useState<RankingUser[]>([]);
  const [previousChampions, setPreviousChampions] = useState<PreviousChampion[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [previousRank, setPreviousRank] = useState<number | null>(null);
  const [historyModalOpen, setHistoryModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<RankingUser & { email?: string; phone?: string; plan_type?: string; created_at?: string } | null>(null);
  const [userDetailsOpen, setUserDetailsOpen] = useState(false);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  // Get current month name in Portuguese
  const currentMonth = format(new Date(), "MMMM 'de' yyyy", { locale: ptBR });
  const previousMonth = format(new Date(new Date().setMonth(new Date().getMonth() - 1)), "MMMM 'de' yyyy", { locale: ptBR });

  const handleUserClick = async (rankUser: RankingUser) => {
    if (!isAdmin) return;
    
    try {
      // Fetch only the specific user's data instead of all users
      const { data, error } = await supabase
        .from('profiles')
        .select('user_id, full_name, avatar_url, whatsapp_phone, created_at')
        .eq('user_id', rankUser.user_id)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;

      // Get plan type from authorized_purchases
      const { data: purchaseData } = await supabase
        .from('authorized_purchases')
        .select('plan_type, email, phone')
        .eq('user_id', rankUser.user_id)
        .maybeSingle();

      setSelectedUser({
        ...rankUser,
        email: purchaseData?.email,
        phone: data?.whatsapp_phone || purchaseData?.phone,
        plan_type: purchaseData?.plan_type || 'free',
        created_at: data?.created_at,
      });
      setUserDetailsOpen(true);
    } catch (error) {
      console.error("Error fetching user details:", error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os dados do usuário.",
        variant: "destructive",
      });
    }
  };

  const fetchRankings = async (force = false) => {
    // Use cache unless forced
    if (!force && rankingsCacheRef && Date.now() - rankingsCacheRef.fetchedAt < RANKINGS_CACHE_TTL) {
      setRankings(rankingsCacheRef.data);
      setPreviousChampions(rankingsCacheRef.champions);
      setLoading(false);
      setRefreshing(false);
      return;
    }

    try {
      // Fetch current month rankings
      const { data, error } = await supabase.rpc("get_user_rankings");
      if (error) throw error;

      const formattedData = (data || []).map((item: any) => ({
        user_id: item.user_id,
        full_name: item.full_name,
        avatar_url: item.avatar_url,
        chapters_read: Number(item.chapters_read),
        quiz_points: Number(item.quiz_points || 0),
        devotional_points: Number(item.devotional_points || 0),
        rpg_points: Number(item.rpg_points || 0),
        total_points: Number(item.total_points || item.chapters_read),
        active_days: Number(item.active_days),
        rank: Number(item.rank),
      }));

      // Fetch previous month champions
      const { data: championsData, error: championsError } = await supabase.rpc("get_previous_month_champions");
      if (!championsError && championsData) {
        setPreviousChampions(championsData as PreviousChampion[]);
      }

      // Check if current user entered top 5
      if (user) {
        const currentUserRank = formattedData.find((r) => r.user_id === user.id);
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
      
      // Update cache
      rankingsCacheRef = { data: formattedData, champions: previousChampions, fetchedAt: Date.now() };
      console.error("Error fetching rankings:", error);
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

      // Subscribe to realtime changes with debounce to avoid many re-fetches
      const debouncedFetch = () => {
        if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
        debounceTimerRef.current = setTimeout(() => fetchRankings(), 3000);
      };

      const channel = supabase
        .channel("ranking-updates")
        .on("postgres_changes", { event: "*", schema: "public", table: "reading_schedule" }, debouncedFetch)
        .on("postgres_changes", { event: "*", schema: "public", table: "quiz_attempts" }, debouncedFetch)
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
  const currentUserRanking = rankings.find((r) => r.user_id === user?.id);

  const getPodiumHeight = (rank: number) => {
    switch (rank) {
      case 1:
        return "h-32";
      case 2:
        return "h-24";
      case 3:
        return "h-20";
      default:
        return "h-16";
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-yellow-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 pb-24">
        {/* Header */}
        <AppHeader
          userId={user?.id}
          userEmail={user?.email || undefined}
          rightContent={
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border/50 hover:bg-muted/10 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
              <span className="text-sm hidden sm:inline">Atualizar</span>
            </button>
          }
        />

        {/* Title */}
        <motion.div
          className="text-center mb-8 relative"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Trophy className="w-8 h-8 text-yellow-500" />
            <h1 className="text-2xl sm:text-3xl font-bold">Ranking Devocionalzeiros</h1>
          </div>
          <div className="flex items-center justify-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-primary" />
            <p className="text-sm font-medium text-primary capitalize">{currentMonth}</p>
          </div>
          <p className="text-muted-foreground text-sm">
            Os pontos são zerados no dia 1 de cada mês. Quem será o campeão?
          </p>
        </motion.div>

        {/* Previous Month Champions */}
        {previousChampions.length > 0 && (
          <motion.div
            className="mb-8 p-4 rounded-xl bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/20"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <History className="w-5 h-5 text-amber-500" />
                <h2 className="font-semibold capitalize">Campeões de {previousMonth}</h2>
              </div>
              <button
                onClick={() => setHistoryModalOpen(true)}
                className="text-xs text-primary hover:underline flex items-center gap-1"
              >
                Ver histórico completo
              </button>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {previousChampions.map((champion) => (
                <div key={champion.user_id} className="flex items-center gap-3 px-4 py-2 rounded-lg bg-background/50">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    champion.rank === 1 ? "bg-yellow-500" : champion.rank === 2 ? "bg-gray-400" : "bg-amber-600"
                  }`}>
                    <span className="text-white font-bold text-sm">{champion.rank}º</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-muted overflow-hidden">
                    {champion.avatar_url ? (
                      <img src={champion.avatar_url} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <User className="w-4 h-4 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{champion.full_name || "Anônimo"}</p>
                    <p className="text-xs text-yellow-500">{champion.total_points} pts</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* History button when no previous champions */}
        {previousChampions.length === 0 && (
          <motion.div
            className="mb-8 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <button
              onClick={() => setHistoryModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border/50 hover:bg-muted/10 transition-colors text-sm"
            >
              <History className="w-4 h-4" />
              Ver histórico de campeões
            </button>
          </motion.div>
        )}

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
                  className={`flex flex-col items-center ${isAdmin ? "cursor-pointer hover:opacity-80 transition-opacity" : ""}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  onClick={() => handleUserClick(topThree[1])}
                >
                  <div className="relative mb-2">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 p-1">
                      <div className="w-full h-full rounded-full bg-muted flex items-center justify-center overflow-hidden">
                        {topThree[1].avatar_url ? (
                          <img src={topThree[1].avatar_url} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <User className="w-8 h-8 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gray-400 flex items-center justify-center text-white text-xs font-bold">
                      2
                    </div>
                  </div>
                  <p className="font-semibold text-sm truncate max-w-[80px] sm:max-w-[100px]">
                    {topThree[1].full_name || "Anônimo"}
                  </p>
                  <p className="text-xs text-yellow-500 font-medium flex items-center gap-1">
                    <Star className="w-3 h-3" /> {topThree[1].total_points} pts
                  </p>
                  <div
                    className={`w-20 sm:w-24 ${getPodiumHeight(2)} bg-gradient-to-b from-gray-300 to-gray-400 rounded-t-lg mt-2 flex items-center justify-center`}
                  >
                    <span className="text-3xl font-bold text-white/80">2º</span>
                  </div>
                </motion.div>
              )}

              {/* 1st Place */}
              {topThree[0] && (
                <motion.div
                  className={`flex flex-col items-center ${isAdmin ? "cursor-pointer hover:opacity-80 transition-opacity" : ""}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  onClick={() => handleUserClick(topThree[0])}
                >
                  <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                    <Crown className="w-8 h-8 text-yellow-500 mb-1" />
                  </motion.div>
                  <div className="relative mb-2">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 p-1 shadow-lg shadow-yellow-500/30">
                      <div className="w-full h-full rounded-full bg-muted flex items-center justify-center overflow-hidden">
                        {topThree[0].avatar_url ? (
                          <img src={topThree[0].avatar_url} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <User className="w-10 h-10 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                    <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-yellow-500 flex items-center justify-center text-white text-sm font-bold shadow-md">
                      1
                    </div>
                  </div>
                  <p className="font-bold text-base truncate max-w-[100px] sm:max-w-[120px]">
                    {topThree[0].full_name || "Anônimo"}
                  </p>
                  <p className="text-xs text-yellow-500 font-medium flex items-center gap-1">
                    <Trophy className="w-3 h-3" /> Líder Atual
                  </p>
                  <p className="text-xs text-yellow-400 font-bold flex items-center gap-1">
                    <Star className="w-3 h-3" /> {topThree[0].total_points} pontos
                  </p>
                  <div
                    className={`w-24 sm:w-28 ${getPodiumHeight(1)} bg-gradient-to-b from-yellow-400 to-amber-500 rounded-t-lg mt-2 flex items-center justify-center shadow-lg shadow-yellow-500/20`}
                  >
                    <span className="text-4xl font-bold text-white/90">1º</span>
                  </div>
                </motion.div>
              )}

              {/* 3rd Place */}
              {topThree[2] && (
                <motion.div
                  className={`flex flex-col items-center ${isAdmin ? "cursor-pointer hover:opacity-80 transition-opacity" : ""}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  onClick={() => handleUserClick(topThree[2])}
                >
                  <div className="relative mb-2">
                    <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-full bg-gradient-to-br from-amber-600 to-amber-700 p-1">
                      <div className="w-full h-full rounded-full bg-muted flex items-center justify-center overflow-hidden">
                        {topThree[2].avatar_url ? (
                          <img src={topThree[2].avatar_url} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <User className="w-7 h-7 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                    <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-600 flex items-center justify-center text-white text-xs font-bold">
                      3
                    </div>
                  </div>
                  <p className="font-semibold text-sm truncate max-w-[70px] sm:max-w-[90px]">
                    {topThree[2].full_name || "Anônimo"}
                  </p>
                  <p className="text-xs text-yellow-500 font-medium flex items-center gap-1">
                    <Star className="w-3 h-3" /> {topThree[2].total_points} pts
                  </p>
                  <div
                    className={`w-20 sm:w-24 ${getPodiumHeight(3)} bg-gradient-to-b from-amber-600 to-amber-700 rounded-t-lg mt-2 flex items-center justify-center`}
                  >
                    <span className="text-3xl font-bold text-white/80">3º</span>
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
                  rankUser.user_id === user?.id ? "border-primary/50 bg-primary/5" : "border-border/50"
                } ${isAdmin ? "cursor-pointer hover:bg-muted/20 transition-colors" : ""}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                onClick={() => handleUserClick(rankUser)}
              >
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-bold text-muted-foreground">
                  {rankUser.rank}º
                </div>
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                  {rankUser.avatar_url ? (
                    <img src={rankUser.avatar_url} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">
                    {rankUser.full_name || "Anônimo"}
                    {rankUser.user_id === user?.id && <span className="text-xs text-primary ml-2">(você)</span>}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {rankUser.chapters_read} caps + {rankUser.quiz_points} quiz + {rankUser.devotional_points} dev{rankUser.rpg_points > 0 ? ` + ${rankUser.rpg_points} jogo` : ""} ={" "}
                    <span className="text-yellow-500 font-medium">{rankUser.total_points} pts</span>
                  </p>
                </div>
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star className="w-4 h-4" />
                  <span className="font-bold">{rankUser.total_points}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {rankings.length === 0 && (
            <div className="text-center py-12">
              <Trophy className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Nenhum leitor no ranking ainda. Seja o primeiro!</p>
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
              Sua posição atual: <span className="font-bold text-primary">{currentUserRanking.rank}º lugar</span> com{" "}
              <span className="text-yellow-500 font-bold">{currentUserRanking.total_points} pontos</span>
            </p>
          </motion.div>
        )}
      </div>

      {/* History Modal */}
      <RankingHistoryModal open={historyModalOpen} onOpenChange={setHistoryModalOpen} />
      
      {/* User Details Modal (Admin only) */}
      <UserDetailsModal 
        open={userDetailsOpen} 
        onOpenChange={setUserDetailsOpen} 
        user={selectedUser} 
      />
      <BottomNavBar />
    </div>
  );
};

export default Ranking;
