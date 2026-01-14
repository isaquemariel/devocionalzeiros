import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Sparkles, Crown, Zap, Brain, MessageSquare, BookOpen, Users, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UpgradeComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPlan?: string;
}

// Checkout URLs for each plan
const CHECKOUT_URLS = {
  gold: {
    monthly: "https://pay.cakto.com.br/evd3575_710682",
    annual: "https://pay.cakto.com.br/35xwf5x",
  },
  premium: {
    monthly: "https://pay.cakto.com.br/g5pbha9",
    annual: "https://pay.cakto.com.br/3ajb7to",
  },
};

interface PlanFeature {
  name: string;
  price: string;
  priceNote: string;
  annualPrice: string;
  annualNote: string;
  gradient: string;
  borderColor: string;
  bgGlow: string;
  iconBg: string;
  icon: typeof Sparkles;
  features: { icon: typeof Sparkles; text: string }[];
  notIncluded: { icon: typeof Sparkles; text: string }[];
  badge?: string;
}

const PLAN_FEATURES: Record<string, PlanFeature> = {
  gold: {
    name: "GOLD",
    price: "R$ 29,90",
    priceNote: "/mês",
    annualPrice: "R$ 287,00",
    annualNote: "/ano (20% off)",
    gradient: "from-amber-500 to-amber-600",
    borderColor: "border-amber-500/40",
    bgGlow: "from-amber-500/10",
    iconBg: "bg-gradient-to-br from-amber-500 to-amber-600",
    icon: Sparkles,
    features: [
      { icon: BookOpen, text: "Estudo de Versículos (exegese)" },
      { icon: Sparkles, text: "Devocional do Versículo (IA)" },
      { icon: Brain, text: "Quiz bíblico por capítulo" },
      { icon: Users, text: "Comunidade WhatsApp exclusiva" },
    ],
    notIncluded: [
      { icon: MessageSquare, text: "Devocionalzeiro.CHAT (IA)" },
      { icon: Crown, text: "Gerador de Sermão com IA" },
    ],
  },
  premium: {
    name: "PREMIUM",
    price: "R$ 59,90",
    priceNote: "/mês",
    annualPrice: "R$ 575,00",
    annualNote: "/ano (20% off)",
    gradient: "from-purple-500 to-purple-600",
    borderColor: "border-purple-500/50",
    bgGlow: "from-purple-500/10",
    iconBg: "bg-gradient-to-br from-purple-500 to-purple-600",
    icon: Crown,
    badge: "Mais completo",
    features: [
      { icon: BookOpen, text: "Tudo do plano GOLD +" },
      { icon: MessageSquare, text: "Devocionalzeiro.CHAT (IA Bíblica)" },
      { icon: Crown, text: "Gerador de Sermão com IA" },
      { icon: Zap, text: "Cursos e mentorias ao vivo" },
      { icon: Users, text: "Suporte individualizado" },
    ],
    notIncluded: [],
  },
};

export const UpgradeComparisonModal = ({
  isOpen,
  onClose,
  currentPlan = "start",
}: UpgradeComparisonModalProps) => {
  const handleUpgrade = (plan: "gold" | "premium", isAnnual: boolean = false) => {
    // Track InitiateCheckout
    if (typeof window !== "undefined") {
      (window as any).fbq?.("track", "InitiateCheckout", {
        content_name: `Upgrade para ${plan.toUpperCase()} - ${isAnnual ? "Anual" : "Mensal"}`,
        content_category: "Upgrade",
        content_ids: [plan],
        currency: "BRL",
      });
    }

    const checkoutUrl = isAnnual 
      ? CHECKOUT_URLS[plan].annual 
      : CHECKOUT_URLS[plan].monthly;
    window.location.href = checkoutUrl;
  };

  const showGold = currentPlan === "start";
  const plans = showGold ? ["gold", "premium"] : ["premium"];

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
            className="fixed inset-0 bg-black/85 backdrop-blur-md z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-3xl my-4"
            >
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-zinc-900 to-black shadow-2xl">
                {/* Glow effects */}
                <div className="absolute top-0 left-1/4 w-1/2 h-32 bg-purple-500/20 blur-[80px]" />
                <div className="absolute top-0 right-1/4 w-1/3 h-24 bg-amber-500/15 blur-[60px]" />

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors z-10"
                >
                  <X className="w-5 h-5 text-white/60" />
                </button>

                <div className="relative p-5 sm:p-6">
                  {/* Header */}
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-purple-500/20 border border-white/10 mb-3">
                      <Gift className="w-4 h-4 text-amber-400" />
                      <span className="text-xs font-semibold text-white/80">Escolha seu upgrade</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">
                      Compare e escolha o melhor para você
                    </h2>
                    <p className="text-sm text-white/50">
                      Desbloqueie recursos exclusivos e acelere seu crescimento espiritual
                    </p>
                  </div>

                  {/* Plans Grid */}
                  <div className={`grid gap-4 ${showGold ? "sm:grid-cols-2" : "max-w-md mx-auto"}`}>
                    {plans.map((planKey) => {
                      const plan = PLAN_FEATURES[planKey as keyof typeof PLAN_FEATURES];
                      const PlanIcon = plan.icon;
                      const isPremium = planKey === "premium";

                      return (
                        <motion.div
                          key={planKey}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: isPremium ? 0.1 : 0 }}
                          className={`relative rounded-xl overflow-hidden ${plan.borderColor} border-2 ${
                            isPremium ? "bg-gradient-to-b from-purple-500/10 to-transparent" : "bg-gradient-to-b from-amber-500/5 to-transparent"
                          }`}
                        >
                          {/* Badge */}
                          {plan.badge && (
                            <div className="absolute top-0 right-0 px-3 py-1 bg-gradient-to-r from-purple-500 to-purple-600 text-white text-xs font-bold rounded-bl-lg">
                              {plan.badge}
                            </div>
                          )}

                          <div className="p-4 sm:p-5">
                            {/* Plan Header */}
                            <div className="flex items-center gap-3 mb-4">
                              <div className={`w-10 h-10 rounded-xl ${plan.iconBg} flex items-center justify-center`}>
                                <PlanIcon className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                                <div className="flex items-baseline gap-1">
                                  <span className="text-xl font-bold text-white">{plan.price}</span>
                                  <span className="text-xs text-white/50">{plan.priceNote}</span>
                                </div>
                              </div>
                            </div>

                            {/* Features */}
                            <div className="space-y-2 mb-4">
                              {plan.features.map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-2.5">
                                  <div className={`w-5 h-5 rounded-full ${isPremium ? "bg-purple-500/20" : "bg-amber-500/20"} flex items-center justify-center`}>
                                    <Check className={`w-3 h-3 ${isPremium ? "text-purple-400" : "text-amber-400"}`} />
                                  </div>
                                  <span className="text-sm text-white/80">{feature.text}</span>
                                </div>
                              ))}
                              {plan.notIncluded?.map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-2.5 opacity-40">
                                  <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center">
                                    <X className="w-3 h-3 text-white/30" />
                                  </div>
                                  <span className="text-sm text-white/50 line-through">{feature.text}</span>
                                </div>
                              ))}
                            </div>

                            {/* CTA Buttons */}
                            <div className="space-y-2">
                              <Button
                                onClick={() => handleUpgrade(planKey as "gold" | "premium", false)}
                                className={`w-full h-11 font-bold text-sm rounded-xl ${
                                  isPremium
                                    ? "bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 text-white shadow-lg shadow-purple-500/25"
                                    : "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black shadow-lg shadow-amber-500/25"
                                }`}
                              >
                                <Zap className="w-4 h-4 mr-1.5" />
                                Upgrade Mensal
                              </Button>
                              <button
                                onClick={() => handleUpgrade(planKey as "gold" | "premium", true)}
                                className="w-full py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white/80 text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
                              >
                                <Gift className="w-3.5 h-3.5 text-amber-400" />
                                Anual: {plan.annualPrice} 
                                <span className="text-amber-400 font-semibold">(20% OFF)</span>
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Footer */}
                  <div className="text-center mt-5">
                    <p className="text-xs text-white/40 flex items-center justify-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      7 dias para testar • Pagamento seguro • Cancele quando quiser
                    </p>
                    <button
                      onClick={onClose}
                      className="mt-3 text-sm text-white/40 hover:text-white/60 transition-colors"
                    >
                      Continuar com meu plano atual
                    </button>
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
