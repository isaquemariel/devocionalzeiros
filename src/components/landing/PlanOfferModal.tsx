import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Check, Crown, Zap, Gift } from "lucide-react";
import { PremiumButton } from "@/components/ui/premium-button";

interface Plan {
  id: string;
  name: string;
  icon: React.ElementType;
  price: string;
  monthlyValue: number;
  gradient: string;
  iconColor: string;
}

interface PlanOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: Plan | null;
}

// Checkout URLs for each plan
// START: R$ 12,90/mês ou R$ 97/ano | GOLD: R$ 29,90/mês | PREMIUM: R$ 59,90/mês
const CHECKOUT_URLS: Record<string, { monthly: string; annual: string }> = {
  start: {
    monthly: "https://pay.cakto.com.br/hhrx4r7",
    annual: "https://pay.cakto.com.br/6szcxh2",
  },
  gold: {
    monthly: "https://pay.cakto.com.br/evd3575_710682",
    annual: "https://pay.cakto.com.br/35xwf5x",
  },
  premium: {
    monthly: "https://pay.cakto.com.br/g5pbha9",
    annual: "https://pay.cakto.com.br/3ajb7to",
  },
};

const PlanOfferModal = ({ isOpen, onClose, plan }: PlanOfferModalProps) => {
  if (!plan) return null;

  const monthlyPrice = plan.monthlyValue;
  const yearlyTotal = monthlyPrice * 12;
  const yearlyWithDiscount = yearlyTotal * 0.8; // 20% off
  const monthlyEquivalent = yearlyWithDiscount / 12;
  const savings = yearlyTotal - yearlyWithDiscount;

  const formatPrice = (value: number) => {
    return value.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handleSelectPlan = (isAnnual: boolean) => {
    const value = isAnnual ? yearlyWithDiscount : monthlyPrice;
    
    // Track InitiateCheckout with full data for Cakto checkout
    if (typeof window !== "undefined") {
      (window as any).fbq?.("track", "InitiateCheckout", {
        content_name: `Plano ${plan.name} - ${isAnnual ? "Anual" : "Mensal"}`,
        content_category: "Subscription",
        content_ids: [plan.id],
        value: value,
        currency: "BRL",
        num_items: 1,
      });
    }
    
    // Get checkout URL based on plan and billing type
    const planUrls = CHECKOUT_URLS[plan.id.toLowerCase()];
    if (planUrls) {
      const checkoutUrl = isAnnual ? planUrls.annual : planUrls.monthly;
      window.location.href = checkoutUrl;
    } else {
      // Fallback to auth page if plan not found
      window.location.href = "/auth";
    }
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

          {/* Modal Container - Better mobile centering */}
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 sm:inset-0 sm:flex sm:items-center sm:justify-center sm:p-4 z-50"
          >
            <div className="w-full sm:max-w-sm bg-gradient-to-b from-secondary to-background rounded-t-2xl sm:rounded-xl border border-border/50 shadow-2xl">
              {/* Mobile drag handle */}
              <div className="flex justify-center pt-2 sm:hidden">
                <div className="w-10 h-1 bg-muted-foreground/40 rounded-full" />
              </div>
              
              {/* Close button row */}
              <div className="flex items-center justify-between px-4 pt-2 pb-1 sm:pt-4">
                <button
                  onClick={onClose}
                  className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors active:scale-95"
                >
                  <X className="w-5 h-5" />
                  <span className="text-xs font-medium">Fechar</span>
                </button>
                
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/30">
                  <Gift className="w-3 h-3 text-amber-400" />
                  <span className="text-[10px] font-semibold text-amber-400">
                    Oferta Especial
                  </span>
                </div>
              </div>

              {/* Content - fixed height, no scroll needed */}
              <div className="px-4 pb-6 sm:px-5">
                {/* Header */}
                <div className="text-center mb-4">
                  <h2 className="text-xl font-bold mb-1">
                    Plano{" "}
                    <span className={`bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent`}>
                      {plan.name}
                    </span>
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Escolha a forma de pagamento
                  </p>
                </div>

                {/* Options */}
                <div className="space-y-3">
                  {/* Annual Option */}
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelectPlan(true)}
                    className="relative w-full text-left"
                  >
                    <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 z-10">
                      <span className="px-3 py-0.5 bg-gradient-to-r from-amber-500 to-amber-600 text-black text-[10px] font-bold rounded-full whitespace-nowrap shadow-lg">
                        ECONOMIZE R$ {formatPrice(savings)}
                      </span>
                    </div>

                    <div className="relative p-4 rounded-xl border-2 border-amber-500/60 bg-gradient-to-br from-amber-500/15 via-background to-amber-500/5 overflow-hidden">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Crown className="w-4 h-4 text-amber-400" />
                            <span className="font-bold">Anual</span>
                            <span className="px-1.5 py-0.5 bg-red-500/20 text-red-400 text-[10px] font-bold rounded">
                              -20%
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            R$ {formatPrice(monthlyEquivalent)}/mês
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground line-through">
                            R$ {formatPrice(yearlyTotal)}
                          </p>
                          <p className="text-xl font-bold text-amber-400">
                            R$ {formatPrice(yearlyWithDiscount)}
                          </p>
                          <p className="text-[10px] text-muted-foreground">/ano</p>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-amber-500/20">
                        <PremiumButton className="w-full py-2.5 text-sm">
                          <Sparkles className="w-4 h-4 mr-2" />
                          Quero o desconto anual
                        </PremiumButton>
                      </div>
                    </div>
                  </motion.button>

                  {/* Monthly Option */}
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelectPlan(false)}
                    className="w-full text-left"
                  >
                    <div className="p-4 rounded-xl border border-border/60 bg-card/50 hover:bg-card/80 transition-colors">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Zap className="w-4 h-4 text-muted-foreground" />
                            <span className="font-medium">Mensal</span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Pagamento recorrente
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold">
                            R$ {formatPrice(monthlyPrice)}
                          </p>
                          <p className="text-[10px] text-muted-foreground">/mês</p>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-border/50">
                        <div className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium text-center">
                          Continuar com mensal
                        </div>
                      </div>
                    </div>
                  </motion.button>
                </div>

                {/* Guarantee */}
                <div className="mt-4 text-center">
                  <p className="text-[11px] text-muted-foreground flex items-center justify-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    7 dias para testar e comprovar a qualidade
                  </p>
                </div>

                {/* Safe area spacer for iOS */}
                <div className="h-safe-area-inset-bottom sm:hidden" />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PlanOfferModal;
