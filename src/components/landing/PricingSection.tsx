import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Sparkles, Crown, User } from "lucide-react";
import { PremiumButton } from "@/components/ui/premium-button";
import PlanOfferModal from "./PlanOfferModal";

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
    id: "start",
    name: "START",
    icon: User,
    description: "Para quem quer começar a jornada devocional",
    price: "GRATUITO",
    monthlyValue: 0,
    features: [
      "Planos de leitura (90, 184 ou 365 dias)",
      "Devocional diário exclusivo",
      "Sistema de pontuação e ranking",
      "Suporte 24/7",
    ],
    gradient: "from-gray-500 to-gray-700",
    iconColor: "text-gray-400",
    isFree: true,
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
      "Quiz bíblico para cada capítulo",
      "Comunidade exclusiva no WhatsApp",
    ],
    gradient: "from-amber-500 to-amber-700",
    iconColor: "text-amber-400",
    hasGlow: true, // Glow effect for GOLD
  },
  {
    id: "premium",
    name: "PREMIUM",
    icon: Crown,
    description: "Para quem quer acesso completo",
    price: "R$ 59,90",
    priceNote: "/mês",
    monthlyValue: 59.9,
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
];

const PricingSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

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

    // Free plan goes directly to auth
    if (plan.isFree) {
      navigate("/auth");
      return;
    }

    setSelectedPlan(plan);
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
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative rounded-2xl overflow-hidden ${
                plan.highlighted
                  ? "border-2 border-purple-500/50 bg-gradient-to-b from-purple-500/10 to-background shadow-[0_0_40px_rgba(168,85,247,0.3)]"
                  : plan.hasGlow
                  ? "border-2 border-amber-500/40 bg-gradient-to-b from-amber-500/5 to-background shadow-[0_0_30px_rgba(245,158,11,0.2)]"
                  : "border border-border/50 bg-card/50"
              }`}
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
                <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-500 to-purple-600 text-white text-xs font-bold px-4 py-1 rounded-bl-lg">
                  {plan.badge}
                </div>
              )}

              <div className="p-6 lg:p-8">
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center`}
                  >
                    <plan.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.priceNote && (
                      <span className="text-muted-foreground">{plan.priceNote}</span>
                    )}
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${plan.iconColor}`} />
                      <span className="text-sm text-foreground/80">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={() => handlePlanClick(plan)}
                  className="w-full"
                >
                  <PremiumButton
                    variant={plan.highlighted ? "primary" : "outline"}
                    className={`w-full ${plan.isPremium ? "animate-pulse" : ""}`}
                  >
                    {plan.isFree ? "Começar grátis" : "Começar agora"}
                  </PremiumButton>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Plan Offer Modal */}
        <PlanOfferModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          plan={selectedPlan ? {
            id: selectedPlan.id,
            name: selectedPlan.name,
            icon: selectedPlan.icon,
            price: selectedPlan.price,
            monthlyValue: selectedPlan.monthlyValue,
            gradient: selectedPlan.gradient,
            iconColor: selectedPlan.iconColor,
          } : null}
        />

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
    </section>
  );
};

export default PricingSection;