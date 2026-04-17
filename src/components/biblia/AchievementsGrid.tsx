import { motion } from "framer-motion";
import { Sparkles, Gift, Loader2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import AchievementCard from "./AchievementCard";
import AchievementClaimModal from "./AchievementClaimModal";
import { useAchievements, Achievement } from "@/hooks/useAchievements";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { triggerConfetti } from "@/utils/confetti";

interface AchievementsGridProps {
  userId?: string;
}

const AchievementsGrid = ({ userId }: AchievementsGridProps) => {
  const { achievements, loading, totalClaimablePoints, claimAchievement, claimAllAchievements, refetch } = useAchievements(userId);
  const [isClaiming, setIsClaiming] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [claimingInModal, setClaimingInModal] = useState(false);
  
  // Track previously shown achievements to detect new unlocks
  const previouslyShownRef = useRef<Set<string>>(new Set());
  const isInitialLoadRef = useRef(true);

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;
  const hasClaimableAchievements = totalClaimablePoints > 0;

  // Detect newly unlocked achievements and show popup
  useEffect(() => {
    if (loading || achievements.length === 0) return;

    // On initial load, just record what's already shown
    if (isInitialLoadRef.current) {
      isInitialLoadRef.current = false;
      achievements.forEach(a => {
        if (a.claimed) {
          previouslyShownRef.current.add(a.id);
        }
      });
      
      // Check for any unclaimed achievements to show popup on first visit
      const firstUnclaimed = achievements.find(a => a.unlocked && !a.claimed);
      if (firstUnclaimed && !previouslyShownRef.current.has(firstUnclaimed.id)) {
        previouslyShownRef.current.add(firstUnclaimed.id);
        setSelectedAchievement(firstUnclaimed);
        setModalOpen(true);
      }
      return;
    }

    // Find newly unlocked achievements that haven't been shown
    const newlyUnlocked = achievements.find(
      a => a.unlocked && !a.claimed && !previouslyShownRef.current.has(a.id)
    );

    if (newlyUnlocked) {
      previouslyShownRef.current.add(newlyUnlocked.id);
      setSelectedAchievement(newlyUnlocked);
      setModalOpen(true);
    }
  }, [achievements, loading]);

  const handleClaimAll = async () => {
    if (!hasClaimableAchievements || isClaiming) return;

    setIsClaiming(true);
    try {
      // Mark all claimable achievements as shown before claiming
      achievements.forEach(a => {
        if (a.unlocked && !a.claimed) {
          previouslyShownRef.current.add(a.id);
        }
      });
      
      const result = await claimAllAchievements();
      if (result.success) {
        triggerConfetti("achievement");
        toast.success(`🎉 +${result.totalPoints} pontos resgatados!`, {
          description: "Suas conquistas foram resgatadas com sucesso!",
        });

        // Local state is already updated inside claimAllAchievements — no need to refetch
        // Notify AppHeader to refresh its claimable badge
        window.dispatchEvent(new CustomEvent('achievement-claimed'));
      } else {
        toast.error("Erro ao resgatar conquistas");
      }
    } catch (error) {
      toast.error("Erro ao resgatar conquistas");
    } finally {
      setIsClaiming(false);
    }
  };

  const handleCardClaim = (achievement: Achievement) => {
    if (!achievement.unlocked || achievement.claimed) return;
    setSelectedAchievement(achievement);
    setModalOpen(true);
  };

  const handleModalClaim = async () => {
    if (!selectedAchievement || claimingInModal) return;

    setClaimingInModal(true);
    try {
      const result = await claimAchievement(selectedAchievement.id);
      if (result.success) {
        triggerConfetti("achievement");
        toast.success(`🎉 +${result.points} pontos resgatados!`, {
          description: `Conquista "${selectedAchievement.title}" resgatada!`,
        });
        
        // Mark as shown so it won't popup again
        previouslyShownRef.current.add(selectedAchievement.id);
        
        // Close modal and clear selection
        setModalOpen(false);
        setSelectedAchievement(null);

        // Local state already updated inside claimAchievement — skip heavy refetch
        // Notify AppHeader to refresh its claimable badge
        window.dispatchEvent(new CustomEvent('achievement-claimed'));
      } else {
        toast.error("Erro ao resgatar conquista");
      }
    } catch (error) {
      toast.error("Erro ao resgatar conquista");
    } finally {
      setClaimingInModal(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        {/* Stats Header */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Conquistas Desbloqueadas</p>
                <p className="text-2xl font-bold">
                  {unlockedCount} <span className="text-muted-foreground font-normal text-base">/ {totalCount}</span>
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Claimable Points Indicator */}
              {hasClaimableAchievements && (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex items-center gap-2"
                >
                  <Button
                    onClick={handleClaimAll}
                    disabled={isClaiming}
                    className="bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 text-accent-foreground shadow-lg"
                  >
                    {isClaiming ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : (
                      <Gift className="w-4 h-4 mr-2" />
                    )}
                    Resgatar {totalClaimablePoints} pts
                  </Button>
                </motion.div>
              )}
              
              <div className="text-right">
                <p className="text-3xl font-bold text-primary">
                  {totalCount > 0 ? Math.round((unlockedCount / totalCount) * 100) : 0}%
                </p>
                <p className="text-xs text-muted-foreground">completo</p>
              </div>
            </div>
          </div>
        </div>

        {/* Rarity Legend */}
        <div className="flex flex-wrap gap-3 justify-center">
          {[
            { label: "Comum (5 pts)", color: "bg-muted-foreground/60" },
            { label: "Raro (10 pts)", color: "bg-primary" },
            { label: "Épico (15 pts)", color: "bg-accent" },
            { label: "Lendário (20 pts)", color: "bg-destructive" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${item.color}`} />
              <span className="text-xs text-muted-foreground">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Achievements Grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
            >
              <AchievementCard 
                id={achievement.id}
                title={achievement.title}
                description={achievement.description}
                icon={achievement.icon}
                rarity={achievement.rarity}
                unlocked={achievement.unlocked}
                claimed={achievement.claimed}
                progress={achievement.progress}
                maxProgress={achievement.maxProgress}
                points={achievement.points}
                onClaim={() => handleCardClaim(achievement)}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Claim Modal */}
      <AchievementClaimModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedAchievement(null);
        }}
        onClaim={handleModalClaim}
        achievement={selectedAchievement}
        isClaiming={claimingInModal}
      />
    </>
  );
};

export default AchievementsGrid;
