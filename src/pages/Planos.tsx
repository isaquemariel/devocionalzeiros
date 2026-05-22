import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Check, X, Crown, Sparkles, ChevronDown, ExternalLink, Heart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useUserPlan } from "@/hooks/useUserPlan";
import { motion, AnimatePresence } from "framer-motion";

// Checkout links
const CHECKOUT_LINKS = {
  gold: {
    monthly: "https://pay.kiwify.com.br/VIxn8D3",
    annual: "https://pay.kiwify.com.br/hdqNhIH",
  },
  premium: {
    monthly: "https://pay.kiwify.com.br/rkZYQDA",
    annual: "https://pay.kiwify.com.br/kb0Gv2E",
  },
};

interface FeatureItem {
  name: string;
  free: string;
  gold: string;
  premium: string;
}

const FEATURES: FeatureItem[] = [
  {
    name: "Devocional Diário",
    free: "✅ Completo",
    gold: "✅ Completo",
    premium: "✅ Completo",
  },
  {
    name: "Leitura Bíblica",
    free: "Bíblia completa",
    gold: "✅ Todos os planos",
    premium: "✅ Todos os planos",
  },
  {
    name: "Ranking",
    free: "✅ Completo",
    gold: "✅ Completo",
    premium: "✅ Completo",
  },
  {
    name: "Devocionalzeiros RPG",
    free: "2 estágios/dia",
    gold: "10 estágios/dia",
    premium: "Ilimitado",
  },
  {
    name: "Quiz Bíblico (Plano + Livre)",
    free: "1x/dia",
    gold: "5x/dia",
    premium: "Ilimitado",
  },
  {
    name: "Quiz Modo Aleatório",
    free: "❌ Bloqueado",
    gold: "❌ Bloqueado",
    premium: "✅ Ilimitado",
  },
  {
    name: "Gerador de Sermão",
    free: "❌ Bloqueado",
    gold: "5/dia",
    premium: "Ilimitado",
  },
  {
    name: "Devocionalzeiro.CHAT",
    free: "❌ Bloqueado",
    gold: "5 perguntas/dia",
    premium: "Ilimitado",
  },
  {
    name: "Explicação de Versículo",
    free: "2/dia",
    gold: "10/dia",
    premium: "Ilimitado",
  },
  {
    name: "Plano Personalizado (IA)",
    free: "❌ Bloqueado",
    gold: "✅ Ilimitado",
    premium: "✅ Ilimitado",
  },
  {
    name: "Devocionalzeiros Finanças",
    free: "❌ Bloqueado",
    gold: "❌ Bloqueado",
    premium: "✅ Completo",
  },
  {
    name: "Programa Embaixador",
    free: "❌ Bloqueado",
    gold: "❌ Bloqueado",
    premium: "✅ Disponível",
  },
];

const PLAN_DISPLAY_NAMES: Record<string, string> = {
  free: "GRATUITO",
  gold: "GOLD",
  premium: "PREMIUM",
  embaixador: "EMBAIXADOR",
  admin: "ADMIN",
};

const PLAN_INFO = {
  gold: {
    name: "GOLD",
    icon: Crown,
    color: "text-amber-400",
    bgColor: "from-amber-500/20 to-amber-600/10",
    borderColor: "border-amber-500/30",
    monthlyPrice: "R$ 14,90",
    monthlyValue: 14.9,
    annualPrice: "R$ 149,90",
    annualValue: 149.9,
    highlight: "Mais popular",
  },
  premium: {
    name: "PREMIUM",
    icon: Sparkles,
    color: "text-purple-400",
    bgColor: "from-purple-500/20 to-purple-600/10",
    borderColor: "border-purple-500/30",
    monthlyPrice: "R$ 29,90",
    monthlyValue: 29.9,
    annualPrice: "R$ 249,90",
    annualValue: 249.9,
    highlight: "Uso ilimitado",
  },
};

const formatBRL = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export default function Planos() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { planType, loading } = useUserPlan(user?.email);
  const [isPlanExpanded, setIsPlanExpanded] = useState(false);
  const [searchParams] = useSearchParams();
  const isWelcome = searchParams.get("welcome") === "1";

  const currentPlan = planType || "free";

  const getPlanOrder = (plan: string) => {
    const order: Record<string, number> = { free: 0, gold: 2, premium: 3, embaixador: 4, admin: 5 };
    return order[plan] || 0;
  };

  const canUpgradeTo = (targetPlan: string) => {
    if (!planType || planType === "free") return true;
    return getPlanOrder(targetPlan) > getPlanOrder(planType);
  };

  const handleCheckout = (plan: "gold" | "premium", period: "monthly" | "annual") => {
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
        {/* Current Plan Badge — colapsável */}
        {!loading && planType && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-3"
          >
            <button
              onClick={() => setIsPlanExpanded((v) => !v)}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-muted/20 hover:bg-muted/40 transition-colors text-sm font-medium"
            >
              <Heart className="w-4 h-4 text-pink-400" />
              Seu plano atual:{" "}
              <span className="font-bold uppercase">{PLAN_DISPLAY_NAMES[planType] || planType}</span>
              <ChevronDown
                className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${isPlanExpanded ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {isPlanExpanded && (
                <motion.div
                  key="plan-features"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="w-full max-w-sm overflow-hidden"
                >
                  <div className="bg-muted/30 rounded-xl border border-border/50 p-4">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-3 text-center">
                      O que seu plano oferece
                    </p>
                    <div className="space-y-2">
                      {FEATURES.map((feature) => {
                        const value = feature[currentPlan as keyof FeatureItem] || feature.free;
                        if (typeof value !== "string") return null;
                        const isBlocked = value.includes("❌");
                        return (
                          <div key={feature.name} className={`flex items-center justify-between gap-2 text-xs ${isBlocked ? "opacity-40" : ""}`}>
                            <div className="flex items-center gap-2">
                              {!isBlocked ? (
                                <Check className="w-3.5 h-3.5 text-green-500 shrink-0" />
                              ) : (
                                <X className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                              )}
                              <span className="text-foreground">{feature.name}</span>
                            </div>
                            <span className="text-muted-foreground shrink-0">{value}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Donation Card — PRIORIDADE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-3xl mx-auto"
        >
          <Card className="overflow-hidden border-pink-500/40">
            <div className="bg-gradient-to-br from-pink-500/15 to-purple-500/10 p-6 flex flex-col sm:flex-row items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500/30 to-rose-500/20 border border-pink-400/30 flex items-center justify-center shrink-0">
                <Heart className="w-7 h-7 text-pink-400" fill="currentColor" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="font-bold text-base mb-1">Prefere apoiar com uma doação?</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Manter a plataforma tem custos mensais em dólar. Se os Devocionalzeiros têm abençoado sua vida, qualquer valor ajuda a manter o projeto de pé. 🙏
                </p>
              </div>
              <button
                onClick={() => window.open("https://link.mercadopago.com.br/apoieisaquemariel", "_blank")}
                className="shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 text-white font-bold text-sm shadow-lg shadow-pink-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Heart className="w-4 h-4" fill="currentColor" />
                Fazer uma Doação
              </button>
            </div>
          </Card>
        </motion.div>

        {/* Separator */}
        <div className="flex flex-col items-center gap-3 max-w-3xl mx-auto">
          <div className="w-full h-px bg-border/50" />
          <p className="text-base font-semibold text-foreground text-center">
            Ou assine um dos planos e acesse o APP de forma completa:
          </p>
          <div className="w-full h-px bg-border/50" />
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {(["premium", "gold"] as const).map((planKey, index) => {
            const plan = PLAN_INFO[planKey];
            const Icon = plan.icon;
            const isCurrentPlan = currentPlan === planKey;
            const canUpgrade = canUpgradeTo(planKey);

            return (
              <motion.div
                key={planKey}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
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
                      <div>
                        <span className={plan.color}>{plan.name}</span>
                        <p className="text-xs text-muted-foreground font-normal mt-0.5">{plan.highlight}</p>
                      </div>
                    </CardTitle>

                    <div className="mt-4 space-y-2">
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold">{plan.monthlyPrice}</span>
                        <span className="text-muted-foreground">/mês</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        ou {plan.annualPrice}/ano
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-6 space-y-4">
                    {/* Feature List */}
                    <div className="space-y-3">
                      {FEATURES.map((feature) => {
                        const value = feature[planKey];
                        const isBlocked = value.includes("❌");
                        return (
                          <div
                            key={feature.name}
                            className={`flex items-start gap-3 ${isBlocked ? "opacity-40" : ""}`}
                          >
                            {!isBlocked ? (
                              <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                            ) : (
                              <X className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                            )}
                            <div>
                              <p className="text-sm font-medium">{feature.name}</p>
                              <p className="text-xs text-muted-foreground">{value}</p>
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
                        <span className="text-muted-foreground">GRATUITO</span>
                      </th>
                      <th className="text-center py-4 px-4">
                        <span className="text-amber-400">GOLD</span>
                      </th>
                      <th className="text-center py-4 px-4">
                        <span className="text-purple-400">PREMIUM</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {FEATURES.map((feature, index) => (
                      <tr
                        key={feature.name}
                        className={index % 2 === 0 ? "bg-muted/30" : ""}
                      >
                        <td className="py-3 px-4 font-medium">{feature.name}</td>
                        <td className="text-center py-3 px-4 text-sm text-muted-foreground">{feature.free}</td>
                        <td className="text-center py-3 px-4 text-sm text-muted-foreground">{feature.gold}</td>
                        <td className="text-center py-3 px-4 text-sm text-muted-foreground">{feature.premium}</td>
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
              <h4 className="font-medium mb-1">Posso usar sem pagar?</h4>
              <p className="text-sm text-muted-foreground">
                Sim! O plano Gratuito dá acesso a funcionalidades essenciais como devocional, leitura da Bíblia completa, ranking e quiz.
                Faça upgrade para desbloquear o Chat IA, Gerador de Sermão, Programa Embaixador e ter limites maiores.
              </p>
            </div>
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
                desconto significativo em relação ao mensal.
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
