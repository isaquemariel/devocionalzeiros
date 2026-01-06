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
              className="w-full max-w-lg max-h-[90vh] overflow-y-auto pointer-events-auto"
            >
              <div className="relative bg-gradient-to-b from-secondary to-background rounded-2xl border border-border/50 overflow-hidden">
                {/* Glow effect */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-primary/20 blur-[80px]" />

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-secondary/50 hover:bg-secondary transition-colors z-10"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="relative p-6 sm:p-8">
                {/* Header */}
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/30 mb-4">
                    <Gift className="w-4 h-4 text-amber-400" />
                    <span className="text-sm font-semibold text-amber-400">
                      Oferta Especial
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                    Plano{" "}
                    <span className={`bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent`}>
                      {plan.name}
                    </span>
                  </h2>
                  <p className="text-muted-foreground">
                    Escolha a melhor forma de pagamento para você
                  </p>
                </div>

                {/* Options */}
                <div className="space-y-4">
                  {/* Annual Option - Highlighted */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelectPlan(true)}
                    className="relative cursor-pointer"
                  >
                    {/* Best value badge */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                      <span className="px-4 py-1 bg-gradient-to-r from-amber-500 to-amber-600 text-black text-xs font-bold rounded-full whitespace-nowrap">
                        ECONOMIZE R$ {formatPrice(savings)}
                      </span>
                    </div>

                    <div className="relative p-5 rounded-xl border-2 border-amber-500/50 bg-gradient-to-br from-amber-500/10 via-background to-amber-500/5 overflow-hidden">
                      {/* Shimmer effect */}
                      <div 
                        className="absolute inset-0 opacity-30"
                        style={{
                          background: 'linear-gradient(90deg, transparent, rgba(245, 158, 11, 0.3), transparent)',
                          backgroundSize: '200% 100%',
                          animation: 'shimmer 2s linear infinite',
                        }}
                      />

                      <div className="relative flex items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Crown className="w-5 h-5 text-amber-400" />
                            <span className="font-bold text-lg">Anual</span>
                            <span className="px-2 py-0.5 bg-destructive/20 text-destructive text-xs font-bold rounded">
                              -20%
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Equivale a{" "}
                            <span className="text-foreground font-medium">
                              R$ {formatPrice(monthlyEquivalent)}/mês
                            </span>
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground line-through">
                            R$ {formatPrice(yearlyTotal)}
                          </p>
                          <p className="text-2xl font-bold text-amber-400">
                            R$ {formatPrice(yearlyWithDiscount)}
                          </p>
                          <p className="text-xs text-muted-foreground">/ano</p>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-amber-500/20">
                        <PremiumButton className="w-full">
                          <Sparkles className="w-4 h-4 mr-2" />
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
                    <div className="p-5 rounded-xl border border-border/50 bg-card/50 hover:bg-card/80 transition-colors">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Zap className="w-5 h-5 text-muted-foreground" />
                            <span className="font-medium">Mensal</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Pagamento recorrente
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold">
                            R$ {formatPrice(monthlyPrice)}
                          </p>
                          <p className="text-xs text-muted-foreground">/mês</p>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-border/50">
                        <button className="w-full py-2.5 rounded-lg border border-border/50 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-border transition-colors">
                          Continuar com mensal
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Guarantee */}
                <div className="mt-6 text-center">
                  <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
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
