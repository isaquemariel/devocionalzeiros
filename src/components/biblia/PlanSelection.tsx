import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { BookOpen, Flame, Zap, Loader2, CheckCircle2, Sparkles, Cross, ScrollText, Lock, Crown } from "lucide-react";
import { readingPlans, ReadingPlan } from "@/lib/bibleData";
import logoWhite from "@/assets/logo-white.png";
import logoBlack from "@/assets/logo-black.png";

interface CustomPlanData {
  name: string;
  description: string;
  books: string[];
  totalDays: number;
  totalChapters: number;
  chaptersPerDay: number;
}

interface PlanSelectionProps {
  onSelectPlan: (plan: ReadingPlan, customPlanData?: CustomPlanData) => Promise<void>;
  currentPlan?: ReadingPlan;
  isChangingPlan?: boolean;
  onOpenCustomPlan?: () => void;
  isPremium?: boolean;
}

// Plans available for all users
const freePlans = ["90", "184", "365"] as const;
// Plans only for premium users
const premiumPlans = ["nt60", "at90"] as const;
// All standard plans in display order
const allPlans = [...premiumPlans, ...freePlans] as const;
type StandardPlan = typeof allPlans[number];

const PlanSelection = ({ onSelectPlan, currentPlan, isChangingPlan = false, onOpenCustomPlan, isPremium = false }: PlanSelectionProps) => {
  const { theme } = useTheme();
  const [selectedPlan, setSelectedPlan] = useState<StandardPlan | null>(
    currentPlan && currentPlan !== "custom" ? currentPlan as StandardPlan : null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isPremiumPlan = (plan: string) => {
    return (premiumPlans as readonly string[]).includes(plan);
  };

  const handleSelectPlan = (plan: StandardPlan) => {
    if (isPremiumPlan(plan) && !isPremium) {
      return; // Cannot select premium plans without premium access
    }
    setSelectedPlan(plan);
  };

  const handleConfirm = async () => {
    if (!selectedPlan) return;
    if (isPremiumPlan(selectedPlan) && !isPremium) return;
    
    setIsSubmitting(true);
    try {
      await onSelectPlan(selectedPlan);
    } finally {
      setIsSubmitting(false);
    }
  };

  const planIcons: Record<StandardPlan, React.ReactNode> = {
    "nt60": <Cross className="w-6 h-6" />,
    "at90": <ScrollText className="w-6 h-6" />,
    "90": <Flame className="w-6 h-6" />,
    "184": <Zap className="w-6 h-6" />,
    "365": <BookOpen className="w-6 h-6" />,
  };

  const planColors: Record<StandardPlan, string> = {
    "nt60": "from-blue-500 to-indigo-600",
    "at90": "from-amber-600 to-yellow-500",
    "90": "from-orange-500 to-red-500",
    "184": "from-amber-500 to-orange-500",
    "365": "from-primary to-accent",
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-4 py-8">
      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <img 
            src={theme === "dark" ? logoWhite : logoBlack} 
            alt="CLUBE HD" 
            className="h-14 w-auto mx-auto mb-4"
          />
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
            {isChangingPlan ? "Alterar Plano de Leitura" : "Escolha seu Plano de Leitura"}
          </h1>
          <p className="text-muted-foreground">
            {isChangingPlan 
              ? "Selecione um novo plano. Seu progresso será mantido."
              : "Selecione o ritmo que melhor se adapta à sua rotina"
            }
          </p>
        </div>

        {/* Plans Grid */}
        <div className="space-y-4 mb-4">
          {allPlans.map((key) => {
            const plan = readingPlans[key];
            const isLocked = isPremiumPlan(key) && !isPremium;
            
            return (
              <motion.button
                key={key}
                onClick={() => handleSelectPlan(key)}
                disabled={isLocked}
                className={`w-full p-5 sm:p-6 rounded-2xl border text-left transition-all relative ${
                  isLocked
                    ? "bg-muted/5 border-border/30 opacity-70 cursor-not-allowed"
                    : selectedPlan === key
                      ? "bg-primary/10 border-primary/50"
                      : "bg-card/50 border-border/50 hover:bg-muted/10"
                }`}
                whileHover={!isLocked ? { scale: 1.01 } : {}}
                whileTap={!isLocked ? { scale: 0.99 } : {}}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${planColors[key]} flex items-center justify-center text-white flex-shrink-0 ${isLocked ? "opacity-50" : ""}`}>
                    {isLocked ? <Lock className="w-6 h-6" /> : planIcons[key]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className={`text-lg font-bold ${isLocked ? "text-muted-foreground" : ""}`}>{plan.name}</h3>
                      {isPremiumPlan(key) && (
                        <span className={`px-2 py-0.5 text-xs rounded-full font-medium flex items-center gap-1 ${
                          isLocked 
                            ? "bg-amber-500/10 text-amber-500/70" 
                            : "bg-amber-500/20 text-amber-500"
                        }`}>
                          <Crown className="w-3 h-3" />
                          Premium
                        </span>
                      )}
                      {currentPlan === key && (
                        <span className="px-2 py-0.5 text-xs rounded-full bg-accent/20 text-accent font-medium">
                          Atual
                        </span>
                      )}
                      {selectedPlan === key && !isLocked && (
                        <CheckCircle2 className="w-5 h-5 text-primary ml-auto flex-shrink-0" />
                      )}
                    </div>
                    <p className={`text-sm mb-2 ${isLocked ? "text-muted-foreground/60" : "text-muted-foreground"}`}>{plan.description}</p>
                    <div className="flex flex-wrap gap-3 text-xs">
                      <span className={`px-2.5 py-1 rounded-full ${isLocked ? "bg-muted/10 text-muted-foreground/60" : "bg-muted/20 text-muted-foreground"}`}>
                        ~{plan.chaptersPerDay} capítulos/dia
                      </span>
                      <span className={`px-2.5 py-1 rounded-full ${isLocked ? "bg-muted/10 text-muted-foreground/60" : "bg-muted/20 text-muted-foreground"}`}>
                        {plan.totalDays} dias no total
                      </span>
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Custom Plan Button */}
        {onOpenCustomPlan && (
          <motion.button
            onClick={() => isPremium && onOpenCustomPlan()}
            disabled={!isPremium}
            className={`w-full p-5 sm:p-6 rounded-2xl border border-dashed transition-all mb-6 ${
              isPremium
                ? "border-violet-500/50 bg-violet-500/5 hover:bg-violet-500/10"
                : "border-border/30 bg-muted/5 opacity-70 cursor-not-allowed"
            }`}
            whileHover={isPremium ? { scale: 1.01 } : {}}
            whileTap={isPremium ? { scale: 0.99 } : {}}
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white flex-shrink-0 ${!isPremium ? "opacity-50" : ""}`}>
                {isPremium ? <Sparkles className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
              </div>
              <div className="flex-1 text-left">
                <h3 className={`text-lg font-bold flex items-center gap-2 flex-wrap ${!isPremium ? "text-muted-foreground" : ""}`}>
                  Personalizado com IA
                  <span className={`px-2 py-0.5 text-xs rounded-full font-medium flex items-center gap-1 ${
                    isPremium 
                      ? "bg-amber-500/20 text-amber-500" 
                      : "bg-amber-500/10 text-amber-500/70"
                  }`}>
                    <Crown className="w-3 h-3" />
                    Premium
                  </span>
                </h3>
                <p className={`text-sm ${!isPremium ? "text-muted-foreground/60" : "text-muted-foreground"}`}>
                  Crie um plano sob medida escolhendo livros específicos
                </p>
              </div>
            </div>
          </motion.button>
        )}

        {/* Confirm Button */}
        <motion.button
          onClick={handleConfirm}
          disabled={!selectedPlan || isSubmitting || (isChangingPlan && selectedPlan === currentPlan)}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: selectedPlan ? 1.01 : 1 }}
          whileTap={{ scale: selectedPlan ? 0.99 : 1 }}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Configurando...</span>
            </>
          ) : (
            <span>{isChangingPlan ? "Confirmar Alteração" : "Começar Jornada"}</span>
          )}
        </motion.button>

        {isChangingPlan && (
          <p className="text-center text-sm text-muted-foreground mt-4">
            Ao alterar o plano, sua programação será recalculada a partir de hoje.
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default PlanSelection;
