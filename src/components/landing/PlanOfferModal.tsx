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
    // Track conversion
    if (typeof window !== "undefined") {
      (window as any).fbq?.("track", "InitiateCheckout", {
        plan: plan.name,
        billing: isAnnual ? "annual" : "monthly",
      });
    }
    // Navigate to auth
    window.location.href = "/auth";
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

          {/* Modal Container - Centered */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-md max-h-[85vh] overflow-y-auto pointer-events-auto"
            >
              <div className="relative bg-gradient-to-b from-secondary to-background rounded-xl border border-border/50 overflow-hidden">
                {/* Glow effect */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-20 bg-primary/20 blur-[60px]" />

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-secondary/50 hover:bg-secondary transition-colors z-10"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="relative p-4 sm:p-6">
                {/* Header */}
                <div className="text-center mb-4">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 mb-3">
                    <Gift className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-xs font-semibold text-amber-400">
                      Oferta Especial
                    </span>
                  </div>
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
                        <div>
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <Crown className="w-4 h-4 text-amber-400" />
                            <span className="font-bold">Anual</span>
                            <span className="px-1.5 py-0.5 bg-destructive/20 text-destructive text-[10px] font-bold rounded">
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
                        <div className="text-right">
                          <p className="text-[10px] text-muted-foreground line-through">
                            R$ {formatPrice(yearlyTotal)}
                          </p>
                          <p className="text-xl font-bold text-amber-400">
                            R$ {formatPrice(yearlyWithDiscount)}
                          </p>
                          <p className="text-[10px] text-muted-foreground">/ano</p>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-amber-500/20">
                        <PremiumButton className="w-full py-2 text-sm">
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
                        <div>
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <Zap className="w-4 h-4 text-muted-foreground" />
                            <span className="font-medium text-sm">Mensal</span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Pagamento recorrente
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold">
                            R$ {formatPrice(monthlyPrice)}
                          </p>
                          <p className="text-[10px] text-muted-foreground">/mês</p>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-border/50">
                        <button className="w-full py-2 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors">
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
