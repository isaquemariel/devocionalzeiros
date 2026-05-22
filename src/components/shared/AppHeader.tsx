import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Settings, Star, Crown, Trophy, Flame, Sparkles, Gift, Heart, Camera, Loader2, User } from "lucide-react";
import { useUserPoints } from "@/hooks/useUserPoints";
import { useUserPlan, PlanType } from "@/hooks/useUserPlan";
import { useClaimableAchievements } from "@/hooks/useClaimableAchievements";
import { SettingsDialog } from "@/components/settings/SettingsDialog";
import { VSLModal } from "@/components/shared/VSLModal";
import { useState, useEffect, useCallback, useRef } from "react";
import { getBrazilDateString } from "@/lib/bibleData";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface AppHeaderProps {
  userId?: string;
  userEmail?: string;
  showBack?: boolean;
  showLogo?: boolean;
  rightContent?: React.ReactNode;
  profileName?: string;
  profileAvatarUrl?: string;
}

const PLAN_CONFIG: Record<NonNullable<PlanType>, { label: string; colors: string; icon?: boolean }> = {
  free: {
    label: "GRATUITO",
    colors: "bg-slate-200 border-slate-300 text-slate-700 dark:bg-gradient-to-r dark:from-gray-600/30 dark:to-gray-500/30 dark:border-gray-500/40 dark:text-gray-300"
  },
  gold: {
    label: "GOLD",
    colors: "bg-amber-500 border-amber-600 text-white dark:bg-gradient-to-r dark:from-yellow-500/30 dark:to-amber-500/30 dark:border-yellow-500/50 dark:text-yellow-400",
    icon: true
  },
  premium: {
    label: "PREMIUM",
    colors: "bg-purple-600 border-purple-700 text-white dark:bg-gradient-to-r dark:from-purple-500/30 dark:to-pink-500/30 dark:border-purple-500/50 dark:text-purple-400",
    icon: true
  },
  embaixador: {
    label: "EMBAIXADOR",
    colors: "bg-pink-600 border-pink-700 text-white dark:bg-gradient-to-r dark:from-pink-500/30 dark:to-rose-500/30 dark:border-pink-500/50 dark:text-pink-400",
    icon: true
  },
  admin: {
    label: "ADMIN",
    colors: "bg-red-600 border-red-700 text-white dark:bg-gradient-to-r dark:from-red-600/40 dark:to-red-500/40 dark:border-red-500/60 dark:text-red-400 dark:shadow-[0_0_15px_rgba(239,68,68,0.4)]",
    icon: true
  },
  inactive: {
    label: "INATIVO",
    colors: "bg-red-100 border-red-300 text-red-700 dark:bg-gradient-to-r dark:from-red-800/30 dark:to-red-700/30 dark:border-red-600/40 dark:text-red-400"
  },
};


/** Small inline avatar with upload-on-click for the header */
function HeaderAvatar({
  userId,
  avatarUrl: initialUrl,
  displayName,
  initial,
}: {
  userId: string;
  avatarUrl?: string;
  displayName: string;
  initial: string;
}) {
  const [url, setUrl] = useState(initialUrl);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { toast.error("Selecione uma imagem válida."); return; }
    if (file.size > 2 * 1024 * 1024) { toast.error("A imagem deve ter no máximo 2MB."); return; }

    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const fileName = `${userId}/avatar.${ext}`;
      const { error: upErr } = await supabase.storage.from("avatars").upload(fileName, file, { upsert: true });
      if (upErr) throw upErr;
      const { data: { publicUrl } } = supabase.storage.from("avatars").getPublicUrl(fileName);
      const urlWithBust = `${publicUrl}?t=${Date.now()}`;
      const { error: updErr } = await supabase.from("profiles").update({ avatar_url: urlWithBust }).eq("user_id", userId);
      if (updErr) throw updErr;
      setUrl(urlWithBust);
      toast.success("Foto atualizada com sucesso!");
    } catch {
      toast.error("Erro ao enviar imagem. Tente novamente.");
    } finally {
      setUploading(false);
      // reset input so same file can be re-selected
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <button
      type="button"
      onClick={() => fileInputRef.current?.click()}
      className="relative group shrink-0 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      title="Clique para alterar a foto"
    >
      {/* Avatar circle */}
      <div className="h-12 w-12 rounded-full overflow-hidden ring-2 ring-primary/40 bg-primary/20 flex items-center justify-center">
        {url ? (
          <img src={url} alt={displayName} className="w-full h-full object-cover" />
        ) : (
          <User className="w-5 h-5 text-primary" />
        )}
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        {uploading
          ? <Loader2 className="w-4 h-4 text-white animate-spin" />
          : <Camera className="w-4 h-4 text-white" />
        }
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="hidden"
        disabled={uploading}
      />
    </button>
  );
}

export function AppHeader({
  userId,
  userEmail,
  showBack = true,
  rightContent,
  profileName,
  profileAvatarUrl,
}: AppHeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [showVSL, setShowVSL] = useState(false);
  const { points, loading: pointsLoading, refetch } = useUserPoints(userId);
  const { planType, loading: planLoading } = useUserPlan(userEmail);
  const { claimableCount, claimablePoints } = useClaimableAchievements(userId);
  const [currentDate, setCurrentDate] = useState(getBrazilDateString());
  const isHomePage = location.pathname === "/home";
  const isConquistasPage = location.pathname === "/conquistas";

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
    const handleVisibility = () => { if (document.visibilityState === "visible") checkDayChange(); };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => { clearInterval(interval); document.removeEventListener("visibilitychange", handleVisibility); };
  }, [checkDayChange]);

  const nameParts = profileName ? profileName.trim().split(" ") : [];
  const displayName = nameParts.length >= 2
    ? `${nameParts[0]} ${nameParts[nameParts.length - 1]}`
    : nameParts[0] || "Membro";
  const avatarInitial = displayName[0]?.toUpperCase() ?? "U";

  return (
    <>
      <motion.header
        className="flex flex-col gap-4 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Top row */}
        <div className="flex items-center justify-between bg-background/50 backdrop-blur-sm rounded-xl px-4 py-3 border border-border/20">
          {/* Left side */}
          <div className="flex items-center gap-3 min-w-0">
            {showBack && !isHomePage && (
              <button
                onClick={() => navigate(-1)}
                className="p-2 rounded-lg hover:bg-muted/10 transition-colors shrink-0"
                title="Voltar"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}

            {/* Home: clickable avatar + greeting. Other pages: back arrow only (no logo, no mascot) */}
            {isHomePage && userId ? (
              <div className="flex items-center gap-3 min-w-0">
                <HeaderAvatar
                  userId={userId}
                  avatarUrl={profileAvatarUrl}
                  displayName={displayName}
                  initial={avatarInitial}
                />
                <div className="min-w-0 leading-tight">
                  <p className="text-[11px] text-muted-foreground/70 uppercase tracking-wider leading-none mb-1">
                    Olá,
                  </p>
                  <p className="text-base font-bold text-foreground truncate max-w-[160px]">
                    {displayName}
                  </p>
                </div>
              </div>
            ) : null}
          </div>

          {/* Right side — no mascot anywhere */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setSettingsOpen(true)}
              className="p-2.5 rounded-xl bg-muted/10 hover:bg-muted/20 border border-border/30 hover:border-border/50 transition-all"
              title="Configurações"
            >
              <Settings className="w-5 h-5 text-muted-foreground" />
            </button>

            {rightContent}
          </div>
        </div>

        {/* Divider */}
        {userId && isHomePage && (
          <div className="w-full h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
        )}

        {/* Stats row — only on Home */}
        {userId && isHomePage && (
          <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
            {!planLoading && planType && (
              <motion.div
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border font-bold text-xs tracking-wide ${PLAN_CONFIG[planType].colors}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, delay: 0 }}
              >
                {PLAN_CONFIG[planType].icon && <Sparkles className="w-3.5 h-3.5" />}
                <span>{PLAN_CONFIG[planType].label}</span>
              </motion.div>
            )}

            {!pointsLoading && points && (
              <>
                <motion.div
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-500 border border-orange-600 dark:bg-gradient-to-r dark:from-orange-500/20 dark:to-red-500/20 dark:border-orange-500/30"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                >
                  <Flame className="w-4 h-4 text-white dark:text-orange-500" />
                  <span className="font-semibold text-sm text-white dark:text-orange-400">{points.activeDays}</span>
                  <span className="text-xs text-white/90 dark:text-orange-400/70">dias</span>
                </motion.div>

                <motion.button
                  onClick={() => navigate("/conquistas")}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500 border border-amber-600 hover:bg-amber-600 dark:bg-gradient-to-r dark:from-yellow-500/20 dark:to-amber-500/20 dark:border-yellow-500/30 dark:hover:border-yellow-500/50 transition-all cursor-pointer"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
                  title="Resgatar Conquistas"
                >
                  <Star className="w-4 h-4 text-white dark:text-yellow-500" />
                  <span className="font-semibold text-sm text-white dark:text-yellow-400">{points.totalPoints} pts</span>
                </motion.button>

                <motion.button
                  onClick={() => navigate("/ranking")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full cursor-pointer ${
                    points.rank === 1
                      ? "bg-amber-500 border border-amber-600 dark:bg-gradient-to-r dark:from-yellow-400/30 dark:to-amber-400/30 dark:border-yellow-400/50"
                      : "bg-blue-600 border-2 border-blue-700 dark:bg-gradient-to-r dark:from-blue-400/40 dark:to-sky-400/40 dark:border-blue-400/70"
                  }`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, delay: 0.3 }}
                  title="Ver Ranking"
                >
                  {points.rank === 1
                    ? <Crown className="w-4 h-4 text-white dark:text-yellow-400" />
                    : <Trophy className="w-5 h-5 text-white dark:text-blue-400" />
                  }
                  <span className={`font-bold text-sm text-white ${points.rank === 1 ? "dark:text-yellow-400" : "dark:text-blue-400"}`}>
                    #{points.rank}
                  </span>
                </motion.button>


                {!planLoading && (planType === "free" || planType === "gold") && (
                  <motion.button
                    onClick={() => setShowVSL(true)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                      planType === "free"
                        ? "bg-gradient-to-r from-pink-500 to-rose-500 border-pink-400/50 hover:from-pink-400 hover:to-rose-400"
                        : "bg-gradient-to-r from-pink-500 to-rose-500 border-pink-400/50 hover:from-pink-400 hover:to-rose-400"
                    }`}
                    initial={{ scale: 0 }}
                    animate={{
                      scale: [1, 1.05, 1],
                      boxShadow: ["0 0 10px rgba(236,72,153,0.3)", "0 0 20px rgba(236,72,153,0.6)", "0 0 10px rgba(236,72,153,0.3)"]
                    }}
                    transition={{
                      scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                      boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                      type: "spring", stiffness: 300, delay: 0.35
                    }}
                    title="Ajude-nos"
                  >
                    <Heart className="w-4 h-4 text-white" fill="currentColor" />
                    <span className="font-bold text-sm text-white uppercase tracking-wide">AJUDE-NOS</span>
                  </motion.button>
                )}

                {claimableCount > 0 && !isConquistasPage && (
                  <motion.button
                    onClick={() => navigate("/conquistas")}
                    className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-500/30 to-green-500/30 border border-emerald-500/50 hover:border-emerald-400/70 transition-all"
                    initial={{ scale: 0 }}
                    animate={{
                      scale: [1, 1.05, 1],
                      boxShadow: ["0 0 10px rgba(16,185,129,0.3)", "0 0 20px rgba(16,185,129,0.6)", "0 0 10px rgba(16,185,129,0.3)"]
                    }}
                    transition={{
                      scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
                      boxShadow: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
                      type: "spring", stiffness: 300, delay: 0.4
                    }}
                    title="Conquistas para resgatar"
                  >
                    <Gift className="w-4 h-4 text-emerald-400" />
                    <span className="font-bold text-sm text-emerald-400">+{claimablePoints}</span>
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
      <VSLModal
        isOpen={showVSL}
        onClose={() => setShowVSL(false)}
        onUnlocked={() => {
          setShowVSL(false);
          navigate("/planos");
        }}
      />
    </>
  );
}
