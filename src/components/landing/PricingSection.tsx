import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Sparkles, Crown, User } from "lucide-react";
import { PremiumButton } from "@/components/ui/premium-button";
import { PlanOfferModal } from "./PlanOfferModal";

// Checkout links
const CHECKOUT_LINKS = {
  start: {
    monthly: "https://pay.kiwify.com.br/l9y7u96",
    annual: "https://pay.kiwify.com.br/Z3kz3M0",
  },
  gold: {
    monthly: "https://pay.kiwify.com.br/3GnzSq7",
    annual: "https://pay.kiwify.com.br/pB36jRz",
  },
  premium: {
    monthly: "https://pay.kiwify.com.br/ie0zdSP",
    annual: "https://pay.kiwify.com.br/IvoBgb3",
  },
};

// Plan pricing info for modal
const PLAN_PRICING = {
  start: {
    monthlyPrice: "R$ 9,90",
    monthlyValue: 9.9,
    annualPrice: "R$ 67,00",
    annualSavings: "R$ 51,80",
    isFree: false,
  },
  gold: {
    monthlyPrice: "R$ 29,90",
    monthlyValue: 29.9,
    annualPrice: "R$ 249,90",
    annualSavings: "R$ 108,90",
    isFree: false,
  },
  premium: {
    monthlyPrice: "R$ 49,90",
    monthlyValue: 49.9,
    annualPrice: "R$ 497,00",
    annualSavings: "R$ 101,80",
    isFree: false,
  },
};

interface Plan {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
  price: string;
  priceNote?: string;
  monthlyValue: number;
  features: string[];
  highlighted?: boolean;
  isPremium?: boolean;
  badge?: string;
  gradient: string;
  iconColor: string;
  isFree?: boolean;
  hasGlow?: boolean;
}

const plans: Plan[] = [
  {
    id: "premium",
    name: "PREMIUM",
    icon: Crown,
    description: "Para quem quer acesso completo",
    price: "R$ 49,90",
    priceNote: "/mês",
    monthlyValue: 49.9,
    features: [
      "Tudo do plano GOLD +",
      "Devocionalzeiro.CHAT (IA Bíblica)",
      "Gerador de Sermão com IA",
      "Cursos e mentorias ao vivo mensais",
      "Suporte individualizado",
    ],
    isPremium: true,
    highlighted: true,
    badge: "Mais completo",
    gradient: "from-purple-500 to-purple-700",
    iconColor: "text-purple-400",
  },
  {
    id: "gold",
    name: "GOLD",
    icon: Sparkles,
    description: "Para quem quer ir além e aprofundar",
    price: "R$ 29,90",
    priceNote: "/mês",
    monthlyValue: 29.9,
    features: [
      "Tudo do plano START +",
      "Estudo de Versículos (comentários teológicos)",
      "Devocional do Versículo (IA)",
      "Quiz bíblico para cada capítulo",
      "Comunidade exclusiva no WhatsApp",
    ],
    gradient: "from-amber-500 to-amber-700",
    iconColor: "text-amber-400",
    hasGlow: true,
  },
  {
    id: "start",
    name: "START",
    icon: User,
    description: "Para quem quer começar a jornada devocional",
    price: "R$ 9,90",
    priceNote: "/mês",
    monthlyValue: 9.9,
    features: [
      "Planos de Leitura Básicos",
      "Bíblia Devocionalzeiro com pesquisa",
      "Devocional Diário exclusivo",
      "Pontuação no Ranking (limitada)",
    ],
    gradient: "from-emerald-500 to-emerald-700",
    iconColor: "text-emerald-400",
    isFree: false,
  },
];

const PricingSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<{
    id: string;
    name: string;
    monthlyPrice: string;
    monthlyValue: number;
    annualPrice: string;
    annualSavings: string;
    checkoutLinks: {
      monthly: string;
      annual: string;
    };
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePlanClick = (plan: Plan) => {
    // Track Lead event when user clicks on a plan
    if (typeof window !== "undefined") {
      (window as any).fbq?.("track", "Lead", {
        content_name: plan.name,
        content_category: "Pricing",
        value: plan.monthlyValue,
        currency: "BRL",
      });
    }

    const planKey = plan.id as keyof typeof PLAN_PRICING;
    const pricing = PLAN_PRICING[planKey];
    const links = CHECKOUT_LINKS[planKey];

    setSelectedPlan({
      id: plan.id,
      name: plan.name,
      monthlyPrice: pricing.monthlyPrice,
      monthlyValue: pricing.monthlyValue,
      annualPrice: pricing.annualPrice,
      annualSavings: pricing.annualSavings,
      checkoutLinks: links,
    });
    setIsModalOpen(true);
  };

  return (
    <section id="planos" ref={ref} className="relative py-16 md:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 left-0 w-[300px] h-[300px] bg-amber-500/5 rounded-full blur-[120px]" />

      <div className="container relative z-10 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="text-primary font-semibold text-sm tracking-widest uppercase mb-4 block">
            Escolha seu plano
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Comece sua transformação{" "}
            <span className="text-gradient">hoje</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Invista na sua constância espiritual. Escolha o plano que mais combina com seu momento.
          </p>
        </motion.div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 50, scale: 0.9, rotateX: -10 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1, rotateX: 0 } : {}}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.15,
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              whileHover={{ 
                y: -8, 
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              className={`relative rounded-2xl overflow-hidden ${
                plan.highlighted
                  ? "border-2 border-purple-500/50 bg-gradient-to-b from-purple-500/10 to-background shadow-[0_0_40px_rgba(168,85,247,0.3)]"
                  : plan.hasGlow
                  ? "border-2 border-amber-500/40 bg-gradient-to-b from-amber-500/5 to-background shadow-[0_0_30px_rgba(245,158,11,0.2)]"
                  : "border border-border/50 bg-card/50"
              }`}
              style={{ perspective: "1000px" }}
            >
              {/* Premium Shiny Border Animation */}
              {plan.isPremium && (
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 rounded-2xl border-2 border-purple-500/30" />
                  <div 
                    className="absolute inset-[-2px] rounded-2xl"
                    style={{
                      background: 'linear-gradient(90deg, transparent, transparent, rgba(168,85,247,0.8), transparent, transparent)',
                      backgroundSize: '200% 100%',
                      animation: 'shimmer 2s linear infinite',
                      mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      maskComposite: 'xor',
                      WebkitMaskComposite: 'xor',
                      padding: '2px',
                    }}
                  />
                </div>
              )}
              {/* Gold Glow Animation */}
              {plan.hasGlow && (
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 rounded-2xl border-2 border-amber-500/30" />
                  <div 
                    className="absolute inset-[-2px] rounded-2xl"
                    style={{
                      background: 'linear-gradient(90deg, transparent, transparent, rgba(245,158,11,0.6), transparent, transparent)',
                      backgroundSize: '200% 100%',
                      animation: 'shimmer 3s linear infinite',
                      mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      maskComposite: 'xor',
                      WebkitMaskComposite: 'xor',
                      padding: '2px',
                    }}
                  />
                </div>
              )}
              {/* Badge */}
              {plan.badge && (
                <motion.div 
                  className="absolute top-0 right-0 bg-gradient-to-r from-purple-500 to-purple-600 text-white text-xs font-bold px-4 py-1 rounded-bl-lg"
                  initial={{ x: 50, opacity: 0 }}
                  animate={isInView ? { x: 0, opacity: 1 } : {}}
                  transition={{ delay: 0.5 + index * 0.15, duration: 0.4 }}
                >
                  {plan.badge}
                </motion.div>
              )}

              <div className="p-6 lg:p-8">
                {/* Header */}
                <motion.div 
                  className="flex items-center gap-3 mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + index * 0.15, duration: 0.5 }}
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center`}
                  >
                    <plan.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                  </div>
                </motion.div>

                {/* Price */}
                <motion.div 
                  className="mb-6"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.3 + index * 0.15, duration: 0.5 }}
                >
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.priceNote && (
                      <span className="text-muted-foreground">{plan.priceNote}</span>
                    )}
                  </div>
                </motion.div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <motion.li 
                      key={i} 
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.4 + index * 0.1 + i * 0.05, duration: 0.3 }}
                    >
                      <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${plan.iconColor}`} />
                      <span className="text-sm text-foreground/80">{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* CTA */}
                <motion.div
                  onClick={() => handlePlanClick(plan)}
                  className="w-full cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + index * 0.15, duration: 0.4 }}
                >
                  {plan.isPremium ? (
                    <div className="relative">
                      {/* 3D Pulse Glow Background */}
                      <div 
                        className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-600 to-purple-500 blur-lg opacity-60"
                        style={{
                          animation: 'pulse3d 2.5s ease-in-out infinite',
                        }}
                      />
                      <PremiumButton
                        variant="primary"
                        className="relative w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 shadow-lg shadow-purple-500/30"
                        style={{
                          animation: 'button3dPulse 2.5s ease-in-out infinite',
                          transformStyle: 'preserve-3d',
                        }}
                      >
                        Começar agora
                      </PremiumButton>
                    </div>
                  ) : (
                    <PremiumButton
                      variant="outline"
                      className="w-full"
                    >
                      Começar agora
                    </PremiumButton>
                  )}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Guarantee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50">
            <span className="text-sm text-muted-foreground">
              🔒 Pagamento seguro • 7 dias para testar e comprovar a qualidade
            </span>
          </div>
        </motion.div>
      </div>

      {/* Plan Offer Modal */}
      <PlanOfferModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedPlan={selectedPlan}
      />
    </section>
  );
};

export default PricingSection;