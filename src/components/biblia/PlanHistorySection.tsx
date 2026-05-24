import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { History, Trophy, RotateCcw, ChevronDown, ChevronUp, BookOpen, Calendar, CheckCircle2, Lock, Award } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { readingPlans, ReadingPlan } from "@/lib/bibleData";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface PlanCompletion {
  id: string;
  plan_type: string;
  completed_at: string;
  bonus_points: number;
  custom_plan_id: string | null;
}

interface CustomPlanCache {
  id: string;
  plan_name: string;
  plan_description: string | null;
  selected_books: string[];
  total_days: number;
  total_chapters: number;
  chapters_per_day: number;
  created_at: string;
  is_active: boolean | null;
}

interface PlanHistorySectionProps {
  userId: string | undefined;
  onRestartPlan: (plan: ReadingPlan, customPlanData?: CustomPlanCache) => void;
  isPremium: boolean;
}

export const PlanHistorySection = ({ userId, onRestartPlan, isPremium }: PlanHistorySectionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [completions, setCompletions] = useState<PlanCompletion[]>([]);
  const [customPlans, setCustomPlans] = useState<CustomPlanCache[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId || !isExpanded) return;

    const fetchHistory = async () => {
      setLoading(true);
      try {
        // Fetch completed plans
        const { data: completionsData } = await supabase
          .from("plan_completions")
          .select("*")
          .eq("user_id", userId)
          .order("completed_at", { ascending: false });

        // Fetch cached custom plans
        const { data: customPlansData } = await supabase
          .from("custom_reading_plans")
          .select("*")
          .eq("user_id", userId)
          .order("created_at", { ascending: false });

        setCompletions(completionsData || []);
        setCustomPlans(customPlansData || []);
      } catch (error) {
        console.error("Error fetching plan history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [userId, isExpanded]);

  const getPlanName = (planType: string, customPlanId: string | null): string => {
    if (planType === "custom" && customPlanId) {
      const customPlan = customPlans.find((p) => p.id === customPlanId);
      return customPlan?.plan_name || "Plano Personalizado";
    }
    
    const plan = readingPlans[planType as keyof typeof readingPlans];
    return plan?.name || planType;
  };

  const getPlanIcon = (planType: string) => {
    switch (planType) {
      case "nt60":
      case "at90":
      case "custom":
        return <Award className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  const isAdvancedPlan = (planType: string) => {
    return ["nt60", "at90", "custom"].includes(planType);
  };

  const handleRestartPlan = (planType: string, customPlanId: string | null) => {
    if (isAdvancedPlan(planType) && !isPremium) {
      return; // Blocked
    }

    if (planType === "custom" && customPlanId) {
      const customPlan = customPlans.find((p) => p.id === customPlanId);
      if (customPlan) {
        onRestartPlan("custom", customPlan);
      }
    } else {
      onRestartPlan(planType as ReadingPlan);
    }
  };

  return (
    <div className="p-4 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50">
      {/* Header - Collapsible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center">
            <History className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-left">
            <h3 className="text-sm font-bold">Histórico de Planos</h3>
            <p className="text-xs text-muted-foreground">
              {completions.length} plano{completions.length !== 1 ? "s" : ""} concluído{completions.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        </motion.div>
      </button>

      {/* Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pt-4 space-y-3">
              {loading ? (
                <div className="text-center py-4">
                  <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                </div>
              ) : completions.length === 0 ? (
                <div className="text-center py-4 text-muted-foreground text-sm">
                  <Trophy className="w-8 h-8 mx-auto mb-2 opacity-30" />
                  <p>Nenhum plano concluído ainda.</p>
                  <p className="text-xs">Complete seu primeiro plano para aparecer aqui!</p>
                </div>
              ) : (
                <>
                  {/* Completed Plans */}
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground font-medium">Planos Concluídos</p>
                    {completions.map((completion) => {
                      const isAdvanced = isAdvancedPlan(completion.plan_type);
                      const isLocked = isAdvanced && !isPremium;

                      return (
                        <motion.div
                          key={completion.id}
                          className={`flex items-center justify-between p-3 rounded-xl border ${
                            isLocked 
                              ? "bg-muted/5 border-border/30 opacity-60" 
                              : "bg-muted/5 border-border/50"
                          }`}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              isAdvanced 
                                ? "bg-gradient-to-br from-violet-500/20 to-purple-600/20" 
                                : "bg-gradient-to-br from-amber-500/20 to-orange-500/20"
                            }`}>
                              {isLocked ? (
                                <Lock className="w-4 h-4 text-muted-foreground" />
                              ) : (
                                getPlanIcon(completion.plan_type)
                              )}
                            </div>
                            <div>
                              <p className="text-sm font-medium">
                                {getPlanName(completion.plan_type, completion.custom_plan_id)}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {format(new Date(completion.completed_at), "dd MMM yyyy", { locale: ptBR })}
                                {" • "}
                                <span className="text-amber-500">+{completion.bonus_points} pts</span>
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleRestartPlan(completion.plan_type, completion.custom_plan_id)}
                            disabled={isLocked}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                              isLocked
                                ? "bg-muted/10 text-muted-foreground cursor-not-allowed"
                                : "bg-primary/10 text-primary hover:bg-primary/20"
                            }`}
                          >
                            {isLocked ? (
                              <>
                                <Lock className="w-3 h-3" />
                                <span>Premium</span>
                              </>
                            ) : (
                              <>
                                <RotateCcw className="w-3 h-3" />
                                <span>Refazer</span>
                              </>
                            )}
                          </button>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Saved Custom Plans */}
                  {customPlans.length > 0 && (
                    <div className="space-y-2 pt-2 border-t border-border/30">
                      <p className="text-xs text-muted-foreground font-medium flex items-center gap-1.5">
                        <Award className="w-3 h-3 text-violet-500" />
                        Planos Personalizados Salvos
                      </p>
                      {customPlans.map((plan) => {
                        const isLocked = !isPremium;

                        return (
                          <motion.div
                            key={plan.id}
                            className={`flex items-center justify-between p-3 rounded-xl border ${
                              isLocked 
                                ? "bg-muted/5 border-border/30 opacity-60" 
                                : "bg-violet-500/5 border-violet-500/20"
                            }`}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500/20 to-purple-600/20 flex items-center justify-center">
                                {isLocked ? (
                                  <Lock className="w-4 h-4 text-muted-foreground" />
                                ) : (
                                  <Award className="w-4 h-4 text-violet-500" />
                                )}
                              </div>
                              <div>
                                <p className="text-sm font-medium">{plan.plan_name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {plan.selected_books.length} livros • {plan.total_days} dias
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={() => !isLocked && onRestartPlan("custom", plan)}
                              disabled={isLocked}
                              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                                isLocked
                                  ? "bg-muted/10 text-muted-foreground cursor-not-allowed"
                                  : "bg-violet-500/10 text-violet-500 hover:bg-violet-500/20"
                              }`}
                            >
                              {isLocked ? (
                                <>
                                  <Lock className="w-3 h-3" />
                                  <span>Premium</span>
                                </>
                              ) : (
                                <>
                                  <RotateCcw className="w-3 h-3" />
                                  <span>Usar</span>
                                </>
                              )}
                            </button>
                          </motion.div>
                        );
                      })}
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
