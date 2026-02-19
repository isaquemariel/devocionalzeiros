import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, HelpCircle, Settings, Star, Crown, Trophy, Flame, Sparkles, Gift, Zap } from "lucide-react";
import { useUserPoints } from "@/hooks/useUserPoints";
import { useUserPlan, PlanType } from "@/hooks/useUserPlan";
import { useClaimableAchievements } from "@/hooks/useClaimableAchievements";
import { SettingsDialog } from "@/components/settings/SettingsDialog";
import { HeaderMascot } from "@/components/shared/FloatingMascot";
import { useState, useEffect, useCallback } from "react";
import { getBrazilDateString } from "@/lib/bibleData";
import logoHeader from "@/assets/logo-new.png";

interface AppHeaderProps {
  userId?: string;
  userEmail?: string;
  showBack?: boolean;
  showLogo?: boolean;
  rightContent?: React.ReactNode;
}

const PLAN_CONFIG: Record<NonNullable<PlanType>, { label: string; colors: string; icon?: boolean }> = {
  free: { 
    label: "GRATUITO", 
    colors: "bg-gradient-to-r from-gray-600/30 to-gray-500/30 border-gray-500/40 text-gray-300"
  },
  gold: {
    label: "GOLD", 
    colors: "bg-gradient-to-r from-yellow-500/30 to-amber-500/30 border-yellow-500/50 text-yellow-400",
    icon: true
  },
  premium: { 
    label: "PREMIUM", 
    colors: "bg-gradient-to-r from-purple-500/30 to-pink-500/30 border-purple-500/50 text-purple-400",
    icon: true
  },
  embaixador: { 
    label: "EMBAIXADOR", 
    colors: "bg-gradient-to-r from-pink-500/30 to-rose-500/30 border-pink-500/50 text-pink-400",
    icon: true
  },
  admin: { 
    label: "ADMIN", 
    colors: "bg-gradient-to-r from-red-600/40 to-red-500/40 border-red-500/60 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.4)]",
    icon: true
  },
  inactive: { 
    label: "INATIVO", 
    colors: "bg-gradient-to-r from-red-800/30 to-red-700/30 border-red-600/40 text-red-400"
  },
};

export function AppHeader({ 
  userId, 
  userEmail,
  showBack = true, 
  showLogo = true,
  rightContent 
}: AppHeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { points, loading: pointsLoading, refetch } = useUserPoints(userId);
  const { planType, loading: planLoading } = useUserPlan(userEmail);
  const { claimableCount, claimablePoints } = useClaimableAchievements(userId);
  const [currentDate, setCurrentDate] = useState(getBrazilDateString());
  const isHomePage = location.pathname === "/home";
  const isConquistasPage = location.pathname === "/conquistas";

  // Check for day change and refresh data
  const checkDayChange = useCallback(() => {
    const newDate = getBrazilDateString();
    if (newDate !== currentDate) {
      setCurrentDate(newDate);
      refetch();
      // Force page reload for full data refresh
      window.location.reload();
    }
  }, [currentDate, refetch]);

  useEffect(() => {
    // Check every minute for day change
    const interval = setInterval(checkDayChange, 60000);
    
    // Also check when tab becomes visible
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        checkDayChange();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [checkDayChange]);

  return (
    <>
      <motion.header 
        className="flex flex-col gap-4 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Top row: Back, Logo, Support, Settings - Menu suspenso style */}
        <div className="flex items-center justify-between bg-background/50 backdrop-blur-sm rounded-xl px-3 py-2 border border-border/20">
          <div className="flex items-center gap-3">
            {showBack && (
              <button
                onClick={() => navigate(-1)}
                className="p-2 rounded-lg hover:bg-muted/10 transition-colors"
                title="Voltar"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            {/* On Home page: show larger community button instead of logo */}
            {isHomePage ? (
              <button
                onClick={() => window.open("https://chat.whatsapp.com/G3RUHiKTrLh8mZFUDK2j5a", "_blank")}
                className="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-full bg-green-600 hover:bg-green-700 text-white text-xs font-medium transition-colors"
                title="Comunidade no WhatsApp"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                <span>Comunidade</span>
              </button>
            ) : (
              showLogo && (
                <img 
                  src={logoHeader} 
                  alt="CLUBE HD" 
                  className="h-10 sm:h-12 w-auto rounded-full object-cover border-2 border-border/30"
                />
              )
            )}
          </div>

          {/* Header mascot - only on non-home pages */}
          {!isHomePage && <HeaderMascot />}

          <div className="flex items-center gap-2">
            {/* Support Button */}
            <button
              onClick={() => window.open("https://wa.me/+5584999488698?text=Oii%2C%20equipe.%20Preciso%20de%20suporte.%20", "_blank")}
              className="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-medium transition-colors"
              title="Suporte via WhatsApp"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Suporte</span>
            </button>

            {/* Settings Button */}
            <button
              onClick={() => setSettingsOpen(true)}
              className="p-2.5 rounded-xl bg-muted/10 hover:bg-muted/20 border border-border/30 hover:border-border/50 transition-all"
              title="Configurações"
            >
              <Settings className="w-5 h-5 text-muted-foreground" />
            </button>

            {/* Additional right content */}
            {rightContent}
          </div>
        </div>

        {/* Divider line */}
        {userId && (
          <div className="w-full h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
        )}

        {/* Bottom row: Plan badge + Stats (Days, Points, Rank) */}
        {userId && (
          <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
            {/* Plan Badge */}
            {!planLoading && planType && (
              <motion.div 
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border font-bold text-xs tracking-wide ${PLAN_CONFIG[planType].colors}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, delay: 0 }}
              >
                {PLAN_CONFIG[planType].icon && (
                  <Sparkles className="w-3.5 h-3.5" />
                )}
                <span>{PLAN_CONFIG[planType].label}</span>
              </motion.div>
            )}

            {!pointsLoading && points && (
              <>
                {/* Days logged */}
                <motion.div 
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                >
                  <Flame className="w-4 h-4 text-orange-500" />
                  <span className="font-semibold text-sm text-orange-400">
                    {points.activeDays}
                  </span>
                  <span className="text-xs text-orange-400/70">dias</span>
                </motion.div>

                {/* Points */}
                <motion.div 
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/30"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
                >
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="font-semibold text-sm text-yellow-400">
                    {points.totalPoints} pts
                  </span>
                </motion.div>

                {/* Ranking position - clickable shortcut to /ranking */}
                <motion.button
                  onClick={() => navigate("/ranking")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full cursor-pointer ${
                    points.rank === 1 
                      ? 'bg-gradient-to-r from-yellow-400/30 to-amber-400/30 border border-yellow-400/50'
                      : 'bg-gradient-to-r from-blue-400/40 to-sky-400/40 border-2 border-blue-400/70'
                  }`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, delay: 0.3 }}
                  title="Ver Ranking"
                >
                  {points.rank === 1 ? (
                    <Crown className="w-4 h-4 text-yellow-400" />
                  ) : (
                    <Trophy className="w-5 h-5 text-blue-400" />
                  )}
                  <span className={`font-bold text-sm ${
                    points.rank === 1 
                      ? 'text-yellow-400' 
                      : 'text-blue-400'
                  }`}>
                    #{points.rank}
                  </span>
                </motion.button>

                {/* Upgrade Button - only for free and gold users */}
                {!planLoading && (planType === 'free' || planType === 'gold') && (
                  <motion.button
                    onClick={() => navigate("/planos")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                      planType === 'free'
                        ? 'bg-gradient-to-r from-yellow-500 to-amber-500 border-yellow-400/50 hover:from-yellow-400 hover:to-amber-400'
                        : 'bg-gradient-to-r from-purple-600 to-pink-600 border-purple-400/50 hover:from-purple-500 hover:to-pink-500'
                    }`}
                    initial={{ scale: 0 }}
                    animate={{ 
                      scale: [1, 1.05, 1],
                      boxShadow: [
                        "0 0 10px rgba(168,85,247,0.3)",
                        "0 0 20px rgba(168,85,247,0.6)",
                        "0 0 10px rgba(168,85,247,0.3)"
                      ]
                    }}
                    transition={{ 
                      scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                      boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                      type: "spring", 
                      stiffness: 300, 
                      delay: 0.35 
                    }}
                    title="Fazer Upgrade"
                  >
                    <Zap className="w-4 h-4 text-white" />
                    <span className="font-bold text-sm text-white uppercase tracking-wide">UPGRADE</span>
                  </motion.button>
                )}

                {/* Claimable Achievements Badge */}
                {claimableCount > 0 && !isConquistasPage && (
                  <motion.button
                    onClick={() => navigate("/conquistas")}
                    className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-500/30 to-green-500/30 border border-emerald-500/50 hover:border-emerald-400/70 transition-all"
                    initial={{ scale: 0 }}
                    animate={{ 
                      scale: [1, 1.05, 1],
                      boxShadow: [
                        "0 0 10px rgba(16,185,129,0.3)",
                        "0 0 20px rgba(16,185,129,0.6)",
                        "0 0 10px rgba(16,185,129,0.3)"
                      ]
                    }}
                    transition={{ 
                      scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
                      boxShadow: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
                      type: "spring", 
                      stiffness: 300, 
                      delay: 0.4 
                    }}
                    title="Conquistas para resgatar"
                  >
                    <Gift className="w-4 h-4 text-emerald-400" />
                    <span className="font-bold text-sm text-emerald-400">
                      +{claimablePoints}
                    </span>
                    {/* Badge count */}
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-emerald-500 text-white text-xs font-bold flex items-center justify-center shadow-lg">
                      {claimableCount}
                    </span>
                  </motion.button>
                )}
              </>
            )}
          </div>
        )}
      </motion.header>

      <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
    </>
  );
}
