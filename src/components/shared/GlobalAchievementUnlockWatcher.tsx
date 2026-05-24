import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";
import AchievementClaimModal from "@/components/biblia/AchievementClaimModal";
import { useAuth } from "@/hooks/useAuth";
import { useAchievements, Achievement } from "@/hooks/useAchievements";
import { triggerConfetti } from "@/utils/confetti";

/**
 * Watches for newly unlocked achievements globally and shows the claim modal
 * on whichever page the user currently is. Claiming keeps the user on the
 * current page (just closes the modal).
 */
export const GlobalAchievementUnlockWatcher = () => {
  const { user } = useAuth();
  const location = useLocation();
  const { achievements, loading, claimAchievement, refetch } = useAchievements(user?.id);

  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<Achievement | null>(null);
  const [claiming, setClaiming] = useState(false);

  const seenRef = useRef<Set<string>>(new Set());
  const initializedRef = useRef(false);

  // Refetch when route changes (so unlocks from actions on previous page surface)
  // Skip on /conquistas — that page has its own modal handling.
  useEffect(() => {
    if (!user?.id) return;
    if (location.pathname === "/conquistas") return;
    refetch();
  }, [location.pathname, user?.id, refetch]);

  // Refetch on event (other components can dispatch this after granting points)
  useEffect(() => {
    const handler = () => refetch();
    window.addEventListener("achievements-refresh", handler);
    window.addEventListener("achievement-claimed", handler);
    return () => {
      window.removeEventListener("achievements-refresh", handler);
      window.removeEventListener("achievement-claimed", handler);
    };
  }, [refetch]);

  // Detect new unlocks
  useEffect(() => {
    if (loading || achievements.length === 0) return;
    if (!user?.id) return;
    if (location.pathname === "/conquistas") return;

    if (!initializedRef.current) {
      initializedRef.current = true;
      // Seed: don't auto-popup already-unclaimed-on-mount to avoid spam after login.
      // Only flag claimed ones as seen; unclaimed will surface via badge in header.
      achievements.forEach((a) => {
        if (a.claimed || a.unlocked) seenRef.current.add(a.id);
      });
      return;
    }

    if (modalOpen) return;

    const newlyUnlocked = achievements.find(
      (a) => a.unlocked && !a.claimed && !seenRef.current.has(a.id)
    );

    if (newlyUnlocked) {
      seenRef.current.add(newlyUnlocked.id);
      setSelected(newlyUnlocked);
      setModalOpen(true);
    }
  }, [achievements, loading, user?.id, location.pathname, modalOpen]);

  const handleClaim = async () => {
    if (!selected || claiming) return;
    setClaiming(true);
    try {
      const result = await claimAchievement(selected.id);
      if (result.success) {
        triggerConfetti("achievement");
        toast.success(`🎉 +${result.points} pontos resgatados!`, {
          description: `Conquista "${selected.title}" resgatada!`,
        });
        setModalOpen(false);
        setSelected(null);
        window.dispatchEvent(new CustomEvent("achievement-claimed"));
      } else {
        toast.error("Erro ao resgatar conquista");
      }
    } catch {
      toast.error("Erro ao resgatar conquista");
    } finally {
      setClaiming(false);
    }
  };

  if (!user?.id) return null;

  return (
    <AchievementClaimModal
      isOpen={modalOpen}
      onClose={() => {
        setModalOpen(false);
        setSelected(null);
      }}
      onClaim={handleClaim}
      achievement={selected}
      isClaiming={claiming}
    />
  );
};

export default GlobalAchievementUnlockWatcher;
