import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, HelpCircle, Settings, Star, Crown, Trophy, Flame, Sparkles } from "lucide-react";
import { useUserPoints } from "@/hooks/useUserPoints";
import { useUserPlan, PlanType } from "@/hooks/useUserPlan";
import { SettingsDialog } from "@/components/settings/SettingsDialog";
import { useState, useEffect, useCallback } from "react";
import { getBrazilDateString } from "@/lib/bibleData";
import logoHeader from "@/assets/logo-header.png";

interface AppHeaderProps {
  userId?: string;
  userEmail?: string;
  showBack?: boolean;
  showLogo?: boolean;
  rightContent?: React.ReactNode;
}

const PLAN_CONFIG: Record<NonNullable<PlanType>, { label: string; colors: string; icon?: boolean }> = {
  gratuito: { 
    label: "GRATUITO", 
    colors: "bg-gradient-to-r from-slate-600/30 to-slate-500/30 border-slate-500/40 text-slate-300"
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
};

export function AppHeader({ 
  userId, 
  userEmail,
  showBack = true, 
  showLogo = true,
  rightContent 
}: AppHeaderProps) {
  const navigate = useNavigate();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { points, loading: pointsLoading, refetch } = useUserPoints(userId);
  const { planType, loading: planLoading } = useUserPlan(userEmail);
  const [currentDate, setCurrentDate] = useState(getBrazilDateString());

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
        className="flex flex-col gap-3 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Top row: Back, Logo, Support, Settings */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {showBack && (
              <button
                onClick={() => navigate("/home")}
                className="p-2 rounded-lg hover:bg-muted/10 transition-colors"
                title="Voltar"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            {showLogo && (
              <img 
                src={logoHeader} 
                alt="CLUBE HD" 
                className="h-9 sm:h-11 w-auto"
              />
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Support Button */}
            <button
              onClick={() => window.open("https://wa.me/+5584998982478?text=Oii%2C%20equipe.%20Preciso%20de%20suporte.%20", "_blank")}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-medium transition-colors"
              title="Suporte via WhatsApp"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Suporte</span>
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

                {/* Ranking position */}
                <motion.div 
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${
                    points.rank === 1 
                      ? 'bg-gradient-to-r from-yellow-400/30 to-amber-400/30 border border-yellow-400/50 shadow-[0_0_20px_rgba(250,204,21,0.6)]'
                      : 'bg-gradient-to-r from-blue-400/40 to-sky-400/40 border-2 border-blue-400/70 shadow-[0_0_20px_rgba(59,130,246,0.7)]'
                  }`}
                  initial={{ scale: 0 }}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ 
                    scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                    type: "spring", 
                    stiffness: 300, 
                    delay: 0.3 
                  }}
                >
                  {points.rank === 1 ? (
                    <Crown className="w-4 h-4 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]" />
                  ) : (
                    <Trophy className="w-5 h-5 text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,1)]" />
                  )}
                  <span className={`font-bold text-sm ${
                    points.rank === 1 
                      ? 'text-yellow-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.8)]' 
                      : 'text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,1)]'
                  }`}>
                    #{points.rank}
                  </span>
                </motion.div>
              </>
            )}
          </div>
        )}
      </motion.header>

      <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
    </>
  );
}
