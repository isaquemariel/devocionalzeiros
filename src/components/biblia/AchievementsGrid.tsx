import { motion } from "framer-motion";
import { Sparkles, Gift, Loader2 } from "lucide-react";
import { useState } from "react";
import AchievementCard from "./AchievementCard";
import { useAchievements } from "@/hooks/useAchievements";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { triggerConfetti } from "@/utils/confetti";

interface AchievementsGridProps {
  userId?: string;
}

const AchievementsGrid = ({ userId }: AchievementsGridProps) => {
  const { achievements, loading, totalClaimablePoints, claimAllAchievements, refetch } = useAchievements(userId);
  const [isClaiming, setIsClaiming] = useState(false);

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;
  const hasClaimableAchievements = totalClaimablePoints > 0;

  const handleClaimAll = async () => {
    if (!hasClaimableAchievements || isClaiming) return;

    setIsClaiming(true);
    try {
      const result = await claimAllAchievements();
      if (result.success) {
        triggerConfetti("achievement");
        toast.success(`🎉 +${result.totalPoints} pontos resgatados!`, {
          description: "Suas conquistas foram resgatadas com sucesso!",
        });
        refetch();
      } else {
        toast.error("Erro ao resgatar conquistas");
      }
    } catch (error) {
      toast.error("Erro ao resgatar conquistas");
    } finally {
      setIsClaiming(false);
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
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default AchievementsGrid;
