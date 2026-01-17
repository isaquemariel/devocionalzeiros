import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Crown, User, Gift, Check, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface PlanOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: {
    id: string;
    name: string;
    monthlyPrice: string;
    monthlyValue: number;
    annualPrice: string;
    annualMonthly: string;
    annualSavings: string;
    checkoutLinks: {
      monthly: string;
      annual: string;
    };
  } | null;
}

const PLAN_ICONS = {
  start: User,
  gold: Sparkles,
  premium: Crown,
};

const PLAN_COLORS = {
  start: {
    gradient: "from-emerald-500 to-emerald-700",
    text: "text-emerald-400",
    border: "border-emerald-500/30",
    glow: "shadow-emerald-500/20",
  },
  gold: {
    gradient: "from-amber-500 to-amber-700",
    text: "text-amber-400",
    border: "border-amber-500/30",
    glow: "shadow-amber-500/20",
  },
  premium: {
    gradient: "from-purple-500 to-purple-700",
    text: "text-purple-400",
    border: "border-purple-500/30",
    glow: "shadow-purple-500/20",
  },
};

export const PlanOfferModal = ({ isOpen, onClose, selectedPlan }: PlanOfferModalProps) => {
  const [showAnnualPromo, setShowAnnualPromo] = useState(true);

  if (!selectedPlan) return null;

  const planKey = selectedPlan.id as keyof typeof PLAN_COLORS;
  const Icon = PLAN_ICONS[planKey] || User;
  const colors = PLAN_COLORS[planKey] || PLAN_COLORS.start;

  const handleCheckout = (period: "monthly" | "annual") => {
    // Track InitiateCheckout event
    if (typeof window !== "undefined") {
      (window as any).fbq?.("track", "InitiateCheckout", {
        content_name: selectedPlan.name,
        content_category: "Subscription",
        content_ids: [selectedPlan.id],
        value: period === "annual" ? parseFloat(selectedPlan.annualPrice.replace(/[^\d,]/g, "").replace(",", ".")) : selectedPlan.monthlyValue,
        currency: "BRL",
        num_items: 1,
      });
    }

    window.open(selectedPlan.checkoutLinks[period], "_blank");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal - Bottom Sheet Style */}
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 max-h-[90vh] overflow-y-auto md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-md"
          >
            <div className={`relative bg-card rounded-t-3xl md:rounded-2xl border ${colors.border} shadow-2xl ${colors.glow}`}>
              {/* Drag Handle (mobile) */}
              <div className="flex justify-center pt-3 pb-2 md:hidden">
                <div className="w-12 h-1.5 rounded-full bg-muted-foreground/30" />
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-6 pt-2 md:pt-6">
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center shadow-lg ${colors.glow}`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className={`text-2xl font-bold ${colors.text}`}>{selectedPlan.name}</h3>
                    <p className="text-sm text-muted-foreground">Escolha como prefere assinar</p>
                  </div>
                </div>

                {/* Annual Promo Card */}
                {showAnnualPromo && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`relative p-4 rounded-xl border-2 ${colors.border} bg-gradient-to-br from-primary/5 to-primary/10 mb-4`}
                  >
                    <div className="absolute -top-3 left-4">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold">
                        <Gift className="w-3 h-3" />
                        ECONOMIA DE {selectedPlan.annualSavings}
                      </span>
                    </div>

                    <div className="mt-2">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="text-sm text-muted-foreground">Plano Anual</p>
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold">{selectedPlan.annualPrice}</span>
                            <span className="text-sm text-muted-foreground">/ano</span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            equivale a {selectedPlan.annualMonthly}/mês
                          </p>
                        </div>
                        <div className="text-right">
                          <Check className="w-6 h-6 text-green-500" />
                        </div>
                      </div>

                      <Button
                        onClick={() => handleCheckout("annual")}
                        className={`w-full bg-gradient-to-r ${colors.gradient} hover:opacity-90 text-white font-semibold shadow-lg ${colors.glow}`}
                      >
                        Assinar Anual e Economizar
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* Monthly Option */}
                <div className="p-4 rounded-xl border border-border/50 bg-muted/30">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Plano Mensal</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold">{selectedPlan.monthlyPrice}</span>
                        <span className="text-sm text-muted-foreground">/mês</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    onClick={() => handleCheckout("monthly")}
                    className="w-full"
                  >
                    Continuar com Mensal
                  </Button>
                </div>

                {/* Toggle Annual Promo */}
                {!showAnnualPromo && (
                  <button
                    onClick={() => setShowAnnualPromo(true)}
                    className="w-full mt-4 flex items-center justify-center gap-2 text-sm text-primary hover:underline"
                  >
                    <ChevronUp className="w-4 h-4" />
                    Ver oferta anual
                  </button>
                )}

                {/* Guarantee */}
                <p className="text-center text-xs text-muted-foreground mt-4">
                  🔒 Pagamento 100% seguro • 7 dias de garantia
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
