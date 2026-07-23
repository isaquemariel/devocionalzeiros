import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Check, X, Crown, ChevronDown, ExternalLink, Heart, User, Gem } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useUserPlan } from "@/hooks/useUserPlan";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import StripeCheckoutModal from "@/components/checkout/StripeCheckoutModal";
import { createSubscriptionCheckout, createDonationCheckout, openCustomerPortal, type CheckoutInit } from "@/lib/stripeCheckout";

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
    icon: Gem,
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

  // Checkout nativo (embedded) da Stripe
  const [checkout, setCheckout] = useState<CheckoutInit | null>(null);
  const [checkoutTitle, setCheckoutTitle] = useState("");
  const [busy, setBusy] = useState<string | null>(null); // chave do botão em carregamento
  const [donationOpen, setDonationOpen] = useState(false);
  const [donationAmount, setDonationAmount] = useState("20");

  const hasPaid = planType === "gold" || planType === "premium";

  const handleCheckout = async (plan: "gold" | "premium", period: "monthly" | "annual") => {
    const key = `${plan}-${period}`;
    setBusy(key);
    try {
      const init = await createSubscriptionCheckout(plan, period);
      setCheckoutTitle(`Assinar ${plan === "premium" ? "Premium" : "Gold"} — ${period === "monthly" ? "Mensal" : "Anual"}`);
      setCheckout(init);
    } catch (e) {
      toast.error("Não foi possível iniciar o pagamento. Tente novamente.");
    } finally {
      setBusy(null);
    }
  };

  const startDonation = async () => {
    const reais = parseFloat(donationAmount.replace(",", "."));
    if (!reais || reais < 5) { toast.error("Valor mínimo de R$ 5,00."); return; }
    if (reais > 10000) { toast.error("Valor máximo de R$ 10.000,00."); return; }
    setBusy("donation");
    try {
      const init = await createDonationCheckout(Math.round(reais * 100));
      setCheckoutTitle("Doação — Devocionalzeiros 💛");
      setDonationOpen(false);
      setCheckout(init);
    } catch (e) {
      toast.error("Não foi possível iniciar a doação. Tente novamente.");
    } finally {
      setBusy(null);
    }
  };

  const handleManageSubscription = async () => {
    setBusy("portal");
    try {
      await openCustomerPortal(window.location.href);
    } catch (e) {
      const msg = (e as Error)?.message || "";
      toast.error(msg.includes("no_customer")
        ? "Sua assinatura foi feita por outro meio de pagamento. Para cancelar, fale com o suporte."
        : "Não foi possível abrir o gerenciamento da assinatura.");
      setBusy(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(isWelcome ? "/home" : -1 as any)}
            className="rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">
              {isWelcome ? "Escolha seu nível de acesso à Plataforma" : "Comparar Planos"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {isWelcome
                ? "Comece grátis ou desbloqueie tudo com Gold ou Premium"
                : "Escolha o plano ideal para sua jornada"}
            </p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Current Plan Badge — colapsável */}
        {!loading && planType && !isWelcome && (
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
                onClick={() => setDonationOpen(true)}
                className="shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 text-white font-bold text-sm shadow-lg shadow-pink-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Heart className="w-4 h-4" fill="currentColor" />
                Fazer uma Doação
              </button>
            </div>
          </Card>
        </motion.div>

        {/* Separator */}
        <div className="flex flex-col items-center gap-3 max-w-5xl mx-auto">
          <div className="w-full h-px bg-border/50" />
          <p className="text-base font-semibold text-foreground text-center">
            {isWelcome
              ? "Veja o que cada plano oferece e escolha o melhor para você:"
              : "Ou assine um dos planos e acesse o APP de forma completa:"}
          </p>
          <div className="w-full h-px bg-border/50" />
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* FREE Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <Card className={`relative overflow-hidden h-full border-emerald-500/30 ${currentPlan === "free" ? "ring-2 ring-primary" : ""}`}>
              {currentPlan === "free" && (
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-bl-lg font-medium">
                  Plano Atual
                </div>
              )}
              <CardHeader className="bg-gradient-to-br from-emerald-500/15 to-emerald-600/5">
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-background/50 text-emerald-400">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-emerald-400">GRATUITO</span>
                    <p className="text-xs text-muted-foreground font-normal mt-0.5">Comece agora sem pagar</p>
                  </div>
                </CardTitle>
                <div className="mt-4 space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold">R$ 0</span>
                    <span className="text-muted-foreground">/ para sempre</span>
                  </div>
                  <div className="text-sm text-muted-foreground">Sem cartão de crédito</div>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-3">
                  {FEATURES.map((feature) => {
                    const value = feature.free;
                    const isBlocked = value.includes("❌");
                    return (
                      <div key={feature.name} className={`flex items-start gap-3 ${isBlocked ? "opacity-40" : ""}`}>
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
                <div className="pt-4 border-t border-border">
                  <Button
                    onClick={() => navigate("/home")}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white"
                  >
                    {isWelcome ? "Continuar grátis" : "Acessar plano grátis"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {(["gold", "premium"] as const).map((planKey, index) => {
            const plan = PLAN_INFO[planKey];
            const Icon = plan.icon;
            const isCurrentPlan = currentPlan === planKey;
            const canUpgrade = canUpgradeTo(planKey);
            const monthlyYearly = plan.monthlyValue * 12;
            const savings = monthlyYearly - plan.annualValue;
            const savingsPct = Math.round((savings / monthlyYearly) * 100);

            return (
              <motion.div
                key={planKey}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.25 }}
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
                        ou {plan.annualPrice}/ano{" "}
                        <span className="text-green-500 font-semibold">
                          (economize {formatBRL(savings)})
                        </span>
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

                    {/* CTA Buttons — Mensal em cima (discreto), Anual embaixo em destaque */}
                    {canUpgrade && !isCurrentPlan && (
                      <div className="space-y-2 pt-4 border-t border-border">
                        <Button
                          onClick={() => handleCheckout(planKey, "monthly")}
                          variant="outline"
                          className="w-full text-sm"
                          disabled={busy === `${planKey}-monthly`}
                        >
                          {busy === `${planKey}-monthly`
                            ? <Loader2 className="w-4 h-4 animate-spin" />
                            : `Assinar Mensal — ${plan.monthlyPrice}/mês`}
                        </Button>
                        <div className="relative">
                          <Badge className="absolute -top-2 right-3 z-10 bg-green-500 text-white border-0 shadow-md">
                            Economize {savingsPct}%
                          </Badge>
                          <Button
                            onClick={() => handleCheckout(planKey, "annual")}
                            disabled={busy === `${planKey}-annual`}
                            className={`w-full gap-2 h-12 font-bold shadow-lg ${
                              planKey === "premium"
                                ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-purple-500/30"
                                : "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white shadow-amber-500/30"
                            }`}
                          >
                            {busy === `${planKey}-annual`
                              ? <Loader2 className="w-4 h-4 animate-spin" />
                              : <>Assinar Anual — {plan.annualPrice}</>}
                          </Button>
                          <p className="text-center text-[11px] text-muted-foreground mt-1.5">
                            Equivale a {formatBRL(plan.annualValue / 12)}/mês
                          </p>
                        </div>
                      </div>
                    )}

                    {isCurrentPlan && (
                      <div className="pt-4 border-t border-border space-y-2">
                        <p className="text-center text-sm text-muted-foreground">
                          Você já está neste plano
                        </p>
                        {hasPaid && (
                          <Button variant="outline" className="w-full text-sm" onClick={handleManageSubscription} disabled={busy === "portal"}>
                            {busy === "portal" ? <Loader2 className="w-4 h-4 animate-spin" /> : "Gerenciar assinatura"}
                          </Button>
                        )}
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

      {/* Checkout nativo (embedded) da Stripe */}
      <AnimatePresence>
        {checkout && (
          <StripeCheckoutModal
            init={checkout}
            title={checkoutTitle}
            onClose={() => setCheckout(null)}
            onSuccess={() => { setCheckout(null); window.location.reload(); }}
          />
        )}
      </AnimatePresence>

      {/* Doação — valor livre */}
      <AnimatePresence>
        {donationOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setDonationOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-2xl bg-card border border-border p-6 text-center shadow-2xl"
            >
              <Heart className="w-10 h-10 text-pink-400 mx-auto mb-2" fill="currentColor" />
              <h3 className="font-bold text-lg">Fazer uma doação</h3>
              <p className="text-sm text-muted-foreground mt-1">Escolha o valor. Qualquer quantia ajuda a manter o projeto. 🙏</p>
              <div className="flex gap-2 justify-center mt-4">
                {[10, 20, 50].map((v) => (
                  <button key={v} onClick={() => setDonationAmount(String(v))}
                    className={`px-4 py-2 rounded-xl border-2 font-bold text-sm ${donationAmount === String(v) ? "border-pink-400 bg-pink-500/15 text-pink-400" : "border-border text-muted-foreground"}`}>
                    R$ {v}
                  </button>
                ))}
              </div>
              <div className="mt-3 flex items-center gap-2 rounded-xl border border-border px-3 py-2">
                <span className="text-muted-foreground font-bold">R$</span>
                <input
                  type="number" inputMode="decimal" min={5} value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-lg font-bold"
                  placeholder="Outro valor"
                />
              </div>
              <Button onClick={startDonation} disabled={busy === "donation"} className="w-full mt-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold">
                {busy === "donation" ? <Loader2 className="w-4 h-4 animate-spin" /> : "Doar com Stripe"}
              </Button>
              <button onClick={() => setDonationOpen(false)} className="text-xs text-muted-foreground mt-3">Cancelar</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
