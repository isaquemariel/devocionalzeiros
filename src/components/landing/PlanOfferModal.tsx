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

          {/* Modal Container - Centered with compact mobile handling */}
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="w-full sm:max-w-sm max-h-[75vh] sm:max-h-[80vh] overflow-hidden pointer-events-auto"
            >
              <div className="relative bg-gradient-to-b from-secondary to-background rounded-t-2xl sm:rounded-xl border border-border/50 overflow-hidden">
                {/* Glow effect - smaller */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-12 bg-primary/20 blur-[40px]" />

                {/* Header with close button - compact */}
                <div className="sticky top-0 z-20 bg-gradient-to-b from-secondary via-secondary to-transparent pb-1">
                  {/* Mobile drag handle indicator */}
                  <div className="flex justify-center pt-1.5 pb-0.5 sm:hidden">
                    <div className="w-8 h-1 bg-muted-foreground/30 rounded-full" />
                  </div>
                  
                  {/* Close button row - more compact */}
                  <div className="flex items-center justify-between px-3 pt-1.5 sm:pt-3">
                    <button
                      onClick={onClose}
                      className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <X className="w-4 h-4" />
                      <span className="text-[10px] font-medium">Fechar</span>
                    </button>
                    
                    {/* Plan badge - smaller */}
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/30">
                      <Gift className="w-3 h-3 text-amber-400" />
                      <span className="text-[9px] font-semibold text-amber-400">
                        Oferta Especial
                      </span>
                    </div>
                  </div>
                </div>

                {/* Scrollable content area - more compact padding */}
                <div className="relative px-3 pb-4 sm:px-5 overflow-y-auto max-h-[calc(75vh-50px)] sm:max-h-none">
                  {/* Header - more compact */}
                  <div className="text-center mb-3">
                    <h2 className="text-lg sm:text-xl font-bold mb-0.5">
                      Plano{" "}
                      <span className={`bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent`}>
                        {plan.name}
                      </span>
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      Escolha a melhor forma de pagamento
                    </p>
                  </div>

                  {/* Options - more compact spacing */}
                  <div className="space-y-2.5">
                    {/* Annual Option - Highlighted */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSelectPlan(true)}
                      className="relative cursor-pointer"
                    >
                      {/* Best value badge */}
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-10">
                        <span className="px-2.5 py-0.5 bg-gradient-to-r from-amber-500 to-amber-600 text-black text-[9px] font-bold rounded-full whitespace-nowrap">
                          ECONOMIZE R$ {formatPrice(savings)}
                        </span>
                      </div>

                      <div className="relative p-3 rounded-lg border-2 border-amber-500/50 bg-gradient-to-br from-amber-500/10 via-background to-amber-500/5 overflow-hidden">
                        {/* Shimmer effect */}
                        <div 
                          className="absolute inset-0 opacity-30"
                          style={{
                            background: 'linear-gradient(90deg, transparent, rgba(245, 158, 11, 0.3), transparent)',
                            backgroundSize: '200% 100%',
                            animation: 'shimmer 2s linear infinite',
                          }}
                        />

                        <div className="relative flex items-center justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1 mb-0.5">
                              <Crown className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                              <span className="font-bold text-sm">Anual</span>
                              <span className="px-1 py-0.5 bg-destructive/20 text-destructive text-[9px] font-bold rounded flex-shrink-0">
                                -20%
                              </span>
                            </div>
                            <p className="text-[10px] text-muted-foreground">
                              Equivale a{" "}
                              <span className="text-foreground font-medium">
                                R$ {formatPrice(monthlyEquivalent)}/mês
                              </span>
                            </p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="text-[9px] text-muted-foreground line-through">
                              R$ {formatPrice(yearlyTotal)}
                            </p>
                            <p className="text-base sm:text-lg font-bold text-amber-400">
                              R$ {formatPrice(yearlyWithDiscount)}
                            </p>
                            <p className="text-[9px] text-muted-foreground">/ano</p>
                          </div>
                        </div>

                        <div className="mt-2.5 pt-2.5 border-t border-amber-500/20">
                          <PremiumButton className="w-full py-2 text-xs">
                            <Sparkles className="w-3 h-3 mr-1" />
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
                      <div className="p-2.5 rounded-lg border border-border/50 bg-card/50 hover:bg-card/80 transition-colors">
                        <div className="flex items-center justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1 mb-0.5">
                              <Zap className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                              <span className="font-medium text-sm">Mensal</span>
                            </div>
                            <p className="text-[10px] text-muted-foreground">
                              Pagamento recorrente
                            </p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="text-base font-bold">
                              R$ {formatPrice(monthlyPrice)}
                            </p>
                            <p className="text-[9px] text-muted-foreground">/mês</p>
                          </div>
                        </div>

                        <div className="mt-2 pt-2 border-t border-border/50">
                          <button className="w-full py-2 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors">
                            Continuar com mensal
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Guarantee - compact */}
                  <div className="mt-3 text-center">
                    <p className="text-[9px] text-muted-foreground flex items-center justify-center gap-1">
                      <Check className="w-3 h-3 text-emerald-400" />
                      7 dias para testar e comprovar a qualidade
                    </p>
                  </div>

                  {/* Extra spacing for mobile safe area */}
                  <div className="h-2 sm:h-0" />
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
