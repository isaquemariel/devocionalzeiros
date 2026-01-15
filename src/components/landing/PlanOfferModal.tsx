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

          {/* Modal Container - Centered with better mobile handling */}
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="w-full sm:max-w-md max-h-[90vh] sm:max-h-[85vh] overflow-hidden pointer-events-auto"
            >
              <div className="relative bg-gradient-to-b from-secondary to-background rounded-t-2xl sm:rounded-xl border border-border/50 overflow-hidden">
                {/* Glow effect */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-20 bg-primary/20 blur-[60px]" />

                {/* Header with close button - sticky on mobile */}
                <div className="sticky top-0 z-20 bg-gradient-to-b from-secondary via-secondary to-transparent pb-2">
                  {/* Mobile drag handle indicator */}
                  <div className="flex justify-center pt-2 pb-1 sm:hidden">
                    <div className="w-10 h-1 bg-muted-foreground/30 rounded-full" />
                  </div>
                  
                  {/* Close button row */}
                  <div className="flex items-center justify-between px-4 pt-2 sm:pt-4">
                    <button
                      onClick={onClose}
                      className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <X className="w-4 h-4" />
                      <span className="text-xs font-medium">Fechar</span>
                    </button>
                    
                    {/* Plan badge */}
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/30">
                      <Gift className="w-3 h-3 text-amber-400" />
                      <span className="text-[10px] font-semibold text-amber-400">
                        Oferta Especial
                      </span>
                    </div>
                  </div>
                </div>

                {/* Scrollable content area */}
                <div className="relative px-4 pb-6 sm:px-6 overflow-y-auto max-h-[calc(90vh-60px)] sm:max-h-none">
                  {/* Header */}
                  <div className="text-center mb-4">
                    <h2 className="text-xl sm:text-2xl font-bold mb-1">
                      Plano{" "}
                      <span className={`bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent`}>
                        {plan.name}
                      </span>
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Escolha a melhor forma de pagamento
                    </p>
                  </div>

                  {/* Options */}
                  <div className="space-y-3">
                    {/* Annual Option - Highlighted */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSelectPlan(true)}
                      className="relative cursor-pointer"
                    >
                      {/* Best value badge */}
                      <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 z-10">
                        <span className="px-3 py-0.5 bg-gradient-to-r from-amber-500 to-amber-600 text-black text-[10px] font-bold rounded-full whitespace-nowrap">
                          ECONOMIZE R$ {formatPrice(savings)}
                        </span>
                      </div>

                      <div className="relative p-4 rounded-lg border-2 border-amber-500/50 bg-gradient-to-br from-amber-500/10 via-background to-amber-500/5 overflow-hidden">
                        {/* Shimmer effect */}
                        <div 
                          className="absolute inset-0 opacity-30"
                          style={{
                            background: 'linear-gradient(90deg, transparent, rgba(245, 158, 11, 0.3), transparent)',
                            backgroundSize: '200% 100%',
                            animation: 'shimmer 2s linear infinite',
                          }}
                        />

                        <div className="relative flex items-center justify-between gap-3">
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5 mb-0.5">
                              <Crown className="w-4 h-4 text-amber-400 flex-shrink-0" />
                              <span className="font-bold">Anual</span>
                              <span className="px-1.5 py-0.5 bg-destructive/20 text-destructive text-[10px] font-bold rounded flex-shrink-0">
                                -20%
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Equivale a{" "}
                              <span className="text-foreground font-medium">
                                R$ {formatPrice(monthlyEquivalent)}/mês
                              </span>
                            </p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="text-[10px] text-muted-foreground line-through">
                              R$ {formatPrice(yearlyTotal)}
                            </p>
                            <p className="text-lg sm:text-xl font-bold text-amber-400">
                              R$ {formatPrice(yearlyWithDiscount)}
                            </p>
                            <p className="text-[10px] text-muted-foreground">/ano</p>
                          </div>
                        </div>

                        <div className="mt-3 pt-3 border-t border-amber-500/20">
                          <PremiumButton className="w-full py-2.5 sm:py-2 text-sm">
                            <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                            Quero o desconto anual
                          </PremiumButton>
                        </div>
                      </div>
                    </motion.div>

                    {/* Monthly Option */}
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleSelectPlan(false)}
                      className="cursor-pointer"
                    >
                      <div className="p-3 rounded-lg border border-border/50 bg-card/50 hover:bg-card/80 transition-colors">
                        <div className="flex items-center justify-between gap-3">
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5 mb-0.5">
                              <Zap className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                              <span className="font-medium text-sm">Mensal</span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Pagamento recorrente
                            </p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="text-lg font-bold">
                              R$ {formatPrice(monthlyPrice)}
                            </p>
                            <p className="text-[10px] text-muted-foreground">/mês</p>
                          </div>
                        </div>

                        <div className="mt-3 pt-3 border-t border-border/50">
                          <button className="w-full py-2.5 sm:py-2 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors">
                            Continuar com mensal
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Guarantee */}
                  <div className="mt-4 text-center">
                    <p className="text-[10px] text-muted-foreground flex items-center justify-center gap-1">
                      <Check className="w-3 h-3 text-emerald-400" />
                      7 dias para testar e comprovar a qualidade
                    </p>
                  </div>

                  {/* Extra spacing for mobile safe area */}
                  <div className="h-4 sm:h-0" />
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PlanOfferModal;
