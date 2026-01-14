import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, X, Crown, Sparkles, Star, Zap, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useUserPlan } from "@/hooks/useUserPlan";
import { motion } from "framer-motion";

// Checkout links
const CHECKOUT_LINKS = {
  start: {
    monthly: "https://pay.kiwify.com.br/WCDqM5g",
    annual: "https://pay.kiwify.com.br/L5RLzqo",
  },
  gold: {
    monthly: "https://pay.kiwify.com.br/IhsIKg4",
    annual: "https://pay.kiwify.com.br/cqHJN5w",
  },
  premium: {
    monthly: "https://pay.kiwify.com.br/ASe8qEN",
    annual: "https://pay.kiwify.com.br/HeMIsMV",
  },
};

interface FeatureItem {
  name: string;
  start: boolean;
  gold: boolean;
  premium: boolean;
  description?: string;
}

const FEATURES: FeatureItem[] = [
  {
    name: "Leitura Bíblica Diária",
    start: true,
    gold: true,
    premium: true,
    description: "Planos de leitura de 90, 184 e 365 dias",
  },
  {
    name: "Devocional Diário",
    start: true,
    gold: true,
    premium: true,
    description: "365 devocionais exclusivos com reflexões",
  },
  {
    name: "Ranking da Comunidade",
    start: true,
    gold: true,
    premium: true,
    description: "Acompanhe seu progresso junto com outros membros",
  },
  {
    name: "Bíblia de Estudo",
    start: true,
    gold: true,
    premium: true,
    description: "Leitura completa + pesquisa por palavra",
  },
  {
    name: "Quiz Bíblico",
    start: false,
    gold: true,
    premium: true,
    description: "Teste seus conhecimentos e ganhe pontos",
  },
  {
    name: "Estudo de Versículo",
    start: false,
    gold: true,
    premium: true,
    description: "Comentário teológico profundo + referências cruzadas",
  },
  {
    name: "Devocional do Versículo",
    start: false,
    gold: true,
    premium: true,
    description: "Gere um devocional personalizado a partir de qualquer versículo",
  },
  {
    name: "Comunidade WhatsApp",
    start: false,
    gold: true,
    premium: true,
    description: "Grupo exclusivo de membros GOLD+",
  },
  {
    name: "Chat com IA Bíblica",
    start: false,
    gold: false,
    premium: true,
    description: "Tire dúvidas teológicas com inteligência artificial",
  },
  {
    name: "Gerador de Sermões",
    start: false,
    gold: false,
    premium: true,
    description: "Crie esboços de sermões completos com IA",
  },
  {
    name: "Planos Avançados",
    start: false,
    gold: false,
    premium: true,
    description: "NT em 60 dias, AT em 90 dias + Planos Personalizados por IA",
  },
];

const PLAN_INFO = {
  start: {
    name: "START",
    icon: Star,
    color: "text-emerald-400",
    bgColor: "from-emerald-500/20 to-emerald-600/10",
    borderColor: "border-emerald-500/30",
    monthlyPrice: "R$ 12,90",
    annualPrice: "R$ 97,00",
    annualMonthly: "R$ 8,08",
  },
  gold: {
    name: "GOLD",
    icon: Crown,
    color: "text-amber-400",
    bgColor: "from-amber-500/20 to-amber-600/10",
    borderColor: "border-amber-500/30",
    monthlyPrice: "R$ 29,90",
    annualPrice: "R$ 287,00",
    annualMonthly: "R$ 23,92",
  },
  premium: {
    name: "PREMIUM",
    icon: Sparkles,
    color: "text-purple-400",
    bgColor: "from-purple-500/20 to-purple-600/10",
    borderColor: "border-purple-500/30",
    monthlyPrice: "R$ 59,90",
    annualPrice: "R$ 575,00",
    annualMonthly: "R$ 47,92",
  },
};

export default function Planos() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { planType, loading } = useUserPlan(user?.email);

  const currentPlan = planType || "start";

  const getPlanOrder = (plan: string) => {
    const order = { start: 1, gold: 2, premium: 3, embaixador: 4, admin: 5 };
    return order[plan as keyof typeof order] || 0;
  };

  const canUpgradeTo = (targetPlan: string) => {
    if (!planType) return true;
    return getPlanOrder(targetPlan) > getPlanOrder(planType);
  };

  const handleCheckout = (plan: "start" | "gold" | "premium", period: "monthly" | "annual") => {
    window.open(CHECKOUT_LINKS[plan][period], "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">Comparar Planos</h1>
            <p className="text-sm text-muted-foreground">
              Escolha o plano ideal para sua jornada
            </p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Current Plan Badge */}
        {!loading && planType && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center"
          >
            <Badge variant="outline" className="px-4 py-2 text-sm gap-2">
              <Zap className="w-4 h-4" />
              Seu plano atual: <span className="font-bold uppercase">{planType}</span>
            </Badge>
          </motion.div>
        )}

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {(["start", "gold", "premium"] as const).map((planKey, index) => {
            const plan = PLAN_INFO[planKey];
            const Icon = plan.icon;
            const isCurrentPlan = currentPlan === planKey;
            const canUpgrade = canUpgradeTo(planKey);

            return (
              <motion.div
                key={planKey}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className={`relative overflow-hidden h-full ${plan.borderColor} ${
                    isCurrentPlan ? "ring-2 ring-primary" : ""
                  }`}
                >
                  {isCurrentPlan && (
                    <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-bl-lg font-medium">
                      Plano Atual
                    </div>
                  )}

                  <CardHeader className={`bg-gradient-to-br ${plan.bgColor}`}>
                    <CardTitle className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-background/50 ${plan.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className={plan.color}>{plan.name}</span>
                    </CardTitle>

                    <div className="mt-4 space-y-2">
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold">{plan.monthlyPrice}</span>
                        <span className="text-muted-foreground">/mês</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        ou {plan.annualPrice}/ano ({plan.annualMonthly}/mês)
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-6 space-y-4">
                    {/* Feature List */}
                    <div className="space-y-3">
                      {FEATURES.map((feature) => {
                        const hasFeature = feature[planKey];
                        return (
                          <div
                            key={feature.name}
                            className={`flex items-start gap-3 ${
                              hasFeature ? "" : "opacity-40"
                            }`}
                          >
                            {hasFeature ? (
                              <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                            ) : (
                              <X className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                            )}
                            <div>
                              <p className="text-sm font-medium">{feature.name}</p>
                              {feature.description && hasFeature && (
                                <p className="text-xs text-muted-foreground">
                                  {feature.description}
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* CTA Buttons */}
                    {canUpgrade && !isCurrentPlan && (
                      <div className="space-y-2 pt-4 border-t border-border">
                        <Button
                          onClick={() => handleCheckout(planKey, "annual")}
                          className="w-full gap-2"
                          variant={planKey === "premium" ? "default" : "outline"}
                        >
                          <ExternalLink className="w-4 h-4" />
                          Assinar Anual
                        </Button>
                        <Button
                          onClick={() => handleCheckout(planKey, "monthly")}
                          variant="ghost"
                          className="w-full text-sm"
                        >
                          Assinar Mensal
                        </Button>
                      </div>
                    )}

                    {isCurrentPlan && (
                      <div className="pt-4 border-t border-border">
                        <p className="text-center text-sm text-muted-foreground">
                          Você já está neste plano
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Feature Comparison Table - Desktop */}
        <div className="hidden lg:block">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Comparação Detalhada</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-4 px-4 font-medium">Funcionalidade</th>
                      <th className="text-center py-4 px-4">
                        <span className={PLAN_INFO.start.color}>START</span>
                      </th>
                      <th className="text-center py-4 px-4">
                        <span className={PLAN_INFO.gold.color}>GOLD</span>
                      </th>
                      <th className="text-center py-4 px-4">
                        <span className={PLAN_INFO.premium.color}>PREMIUM</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {FEATURES.map((feature, index) => (
                      <tr
                        key={feature.name}
                        className={index % 2 === 0 ? "bg-muted/30" : ""}
                      >
                        <td className="py-3 px-4">
                          <p className="font-medium">{feature.name}</p>
                          {feature.description && (
                            <p className="text-xs text-muted-foreground">
                              {feature.description}
                            </p>
                          )}
                        </td>
                        <td className="text-center py-3 px-4">
                          {feature.start ? (
                            <Check className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-muted-foreground mx-auto" />
                          )}
                        </td>
                        <td className="text-center py-3 px-4">
                          {feature.gold ? (
                            <Check className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-muted-foreground mx-auto" />
                          )}
                        </td>
                        <td className="text-center py-3 px-4">
                          {feature.premium ? (
                            <Check className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-muted-foreground mx-auto" />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ */}
        <Card>
          <CardHeader>
            <CardTitle>Perguntas Frequentes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-1">Posso mudar de plano depois?</h4>
              <p className="text-sm text-muted-foreground">
                Sim! Você pode fazer upgrade a qualquer momento. Ao comprar um plano
                superior, seu acesso é atualizado automaticamente.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-1">Como funciona o pagamento?</h4>
              <p className="text-sm text-muted-foreground">
                Aceitamos PIX, cartão de crédito e boleto. O pagamento anual oferece
                desconto de aproximadamente 20% em relação ao mensal.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-1">Perco meus pontos ao mudar de plano?</h4>
              <p className="text-sm text-muted-foreground">
                Não! Seus pontos, progresso de leitura e histórico são mantidos ao
                fazer upgrade.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
