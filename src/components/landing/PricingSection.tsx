import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Check, Sparkles, Crown, Zap } from "lucide-react";
import { PremiumButton } from "@/components/ui/premium-button";

interface Plan {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
  price: string;
  priceNote?: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
  gradient: string;
  iconColor: string;
}

const plans: Plan[] = [
  {
    id: "start",
    name: "START",
    icon: Zap,
    description: "Para quem quer começar a jornada devocional",
    price: "R$ 19,90",
    priceNote: "/mês",
    features: [
      "Planos de leitura (90, 184 ou 365 dias)",
      "Devocional diário exclusivo",
      "Sistema de pontuação e ranking",
      "Suporte 24/7",
    ],
    gradient: "from-emerald-500 to-emerald-700",
    iconColor: "text-emerald-400",
  },
  {
    id: "gold",
    name: "GOLD",
    icon: Sparkles,
    description: "Para quem quer ir além e aprofundar",
    price: "R$ 39,90",
    priceNote: "/mês",
    features: [
      "Tudo do plano START +",
      "Devocionalzeiro.CHAT (IA Bíblica)",
      "Quiz bíblico para cada capítulo",
      "Comunidade exclusiva no WhatsApp",
    ],
    highlighted: true,
    badge: "Mais popular",
    gradient: "from-amber-500 to-amber-700",
    iconColor: "text-amber-400",
  },
  {
    id: "premium",
    name: "PREMIUM",
    icon: Crown,
    description: "Para quem quer acesso completo",
    price: "R$ 79,90",
    priceNote: "/mês",
    features: [
      "Tudo do plano START e GOLD +",
      "Gerador de Sermão com IA",
      "Cursos e mentorias ao vivo mensais",
      "Livro Manual dos Devocionalzeiros",
      "Suporte individualizado",
    ],
    gradient: "from-purple-500 to-purple-700",
    iconColor: "text-purple-400",
  },
];

const PricingSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
                  ? "border-2 border-amber-500/50 bg-gradient-to-b from-amber-500/10 to-background"
                  : "border border-border/50 bg-card/50"
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-amber-500 to-amber-600 text-black text-xs font-bold px-4 py-1 rounded-bl-lg">
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
                <a
                  href="/auth"
                  onClick={() =>
                    typeof window !== "undefined" && (window as any).fbq?.("track", "InitiateCheckout")
                  }
                >
                  <PremiumButton
                    variant={plan.highlighted ? "primary" : "outline"}
                    className="w-full"
                  >
                    Começar agora
                  </PremiumButton>
                </a>
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
              🔒 Pagamento seguro • Cancele quando quiser
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
