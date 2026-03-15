import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, HelpCircle, Settings, Star, Crown, Trophy, Flame, Sparkles, Gift, Zap } from "lucide-react";
import { useUserPoints } from "@/hooks/useUserPoints";
import { useUserPlan, PlanType } from "@/hooks/useUserPlan";
import { useClaimableAchievements } from "@/hooks/useClaimableAchievements";
import { SettingsDialog } from "@/components/settings/SettingsDialog";
import { HeaderMascot } from "@/components/shared/FloatingMascot";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useState, useEffect, useCallback } from "react";
import { getBrazilDateString } from "@/lib/bibleData";
import logoHeader from "@/assets/logo-new.png";

interface AppHeaderProps {
  userId?: string;
  userEmail?: string;
  showBack?: boolean;
  showLogo?: boolean;
  rightContent?: React.ReactNode;
  /** Name shown in header greeting (Home page only) */
  profileName?: string;
  /** Avatar URL shown in header (Home page only) */
  profileAvatarUrl?: string;
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
  rightContent,
  profileName,
  profileAvatarUrl,
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
      window.location.reload();
    }
  }, [currentDate, refetch]);

  useEffect(() => {
    const interval = setInterval(checkDayChange, 60000);
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') checkDayChange();
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [checkDayChange]);

  // First name only (max 1 word) for header
  const firstName = profileName
    ? profileName.trim().split(' ')[0]
    : null;

  const avatarInitial = firstName ? firstName[0].toUpperCase() : "U";

  return (
    <>
      <motion.header 
        className="flex flex-col gap-4 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Top row */}
        <div className="flex items-center justify-between bg-background/50 backdrop-blur-sm rounded-xl px-3 py-2 border border-border/20">
          {/* Left side */}
          <div className="flex items-center gap-3 min-w-0">
            {showBack && (
              <button
                onClick={() => navigate(-1)}
                className="p-2 rounded-lg hover:bg-muted/10 transition-colors shrink-0"
                title="Voltar"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}

            {/* Home page: avatar + greeting */}
            {isHomePage && profileName ? (
              <div className="flex items-center gap-2.5 min-w-0">
                <Avatar className="h-9 w-9 shrink-0 ring-2 ring-primary/30 ring-offset-1 ring-offset-transparent">
                  <AvatarImage src={profileAvatarUrl || ""} alt={firstName || "avatar"} />
                  <AvatarFallback className="bg-primary/20 text-primary text-sm font-bold">
                    {avatarInitial}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 leading-tight">
                  <p className="text-[10px] text-muted-foreground/70 uppercase tracking-wider leading-none mb-0.5">
                    Bem-vindo de volta
                  </p>
                  <p className="text-sm font-bold text-foreground truncate max-w-[120px]">
                    {firstName}
                  </p>
                </div>
              </div>
            ) : (
              /* Non-home pages: logo */
              showLogo && (
                <img 
                  src={logoHeader} 
                  alt="CLUBE HD" 
                  className="h-10 sm:h-12 w-auto rounded-full object-cover border-2 border-border/30 shrink-0"
                />
              )
            )}
          </div>

          {/* Header mascot - only on non-home pages */}
          {!isHomePage && <HeaderMascot />}

          {/* Right side */}
          <div className="flex items-center gap-2 shrink-0">
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

        {/* Bottom row: Plan badge + Stats */}
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

                {/* Ranking position */}
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

                {/* Upgrade Button */}
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
