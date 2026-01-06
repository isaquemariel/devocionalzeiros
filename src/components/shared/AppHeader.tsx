import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { ArrowLeft, HelpCircle, Settings, Star, Crown, Trophy } from "lucide-react";
import { useUserPoints } from "@/hooks/useUserPoints";
import { SettingsDialog } from "@/components/settings/SettingsDialog";
import { useState } from "react";
import logoWhite from "@/assets/logo-white.png";
import logoBlack from "@/assets/logo-black.png";

interface AppHeaderProps {
  userId?: string;
  showBack?: boolean;
  showLogo?: boolean;
  rightContent?: React.ReactNode;
}

export function AppHeader({ 
  userId, 
  showBack = true, 
  showLogo = true,
  rightContent 
}: AppHeaderProps) {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { points, loading: pointsLoading } = useUserPoints(userId);

  return (
    <>
      <motion.header 
        className="flex items-center justify-between mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
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
              src={theme === "dark" ? logoWhite : logoBlack} 
              alt="CLUBE HD" 
              className="h-8 sm:h-10 w-auto"
            />
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Points & Rank Display */}
          {userId && !pointsLoading && points && (
            <motion.div 
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/30"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {points.rank === 1 ? (
                <Crown className="w-4 h-4 text-yellow-500" />
              ) : points.rank <= 3 ? (
                <Trophy className="w-4 h-4 text-yellow-500" />
              ) : (
                <Star className="w-4 h-4 text-yellow-500" />
              )}
              <span className="font-semibold text-sm text-yellow-400">
                {points.totalPoints} pts
              </span>
              <span className="text-xs text-yellow-400/70">
                #{points.rank}
              </span>
            </motion.div>
          )}

          {/* Support Button */}
          <button
            onClick={() => window.open("https://wa.me/+5584998982478?text=Oii%2C%20equipe.%20Preciso%20de%20suporte.%20", "_blank")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-600 hover:bg-green-700 text-white text-xs font-medium transition-colors"
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
      </motion.header>

      <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
    </>
  );
}
