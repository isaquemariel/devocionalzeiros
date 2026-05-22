import { useNavigate } from "react-router-dom";
import { Check, X, Crown, Sparkles, ExternalLink, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

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
  { name: "Devocional Diário", free: "✅ Completo", gold: "✅ Completo", premium: "✅ Completo" },
  { name: "Leitura Bíblica", free: "Bíblia completa", gold: "✅ Todos os planos", premium: "✅ Todos os planos" },
  { name: "Ranking", free: "✅ Completo", gold: "✅ Completo", premium: "✅ Completo" },
  { name: "Devocionalzeiros RPG", free: "2 estágios/dia", gold: "10 estágios/dia", premium: "Ilimitado" },
  { name: "Quiz Bíblico (Plano + Livre)", free: "1x/dia", gold: "5x/dia", premium: "Ilimitado" },
  { name: "Quiz Modo Aleatório", free: "❌ Bloqueado", gold: "❌ Bloqueado", premium: "✅ Ilimitado" },
  { name: "Gerador de Sermão", free: "❌ Bloqueado", gold: "5/dia", premium: "Ilimitado" },
  { name: "Devocionalzeiro.CHAT", free: "❌ Bloqueado", gold: "5 perguntas/dia", premium: "Ilimitado" },
  { name: "Explicação de Versículo", free: "2/dia", gold: "10/dia", premium: "Ilimitado" },
  { name: "Plano Personalizado (IA)", free: "❌ Bloqueado", gold: "✅ Ilimitado", premium: "✅ Ilimitado" },
  { name: "Devocionalzeiros Finanças", free: "❌ Bloqueado", gold: "❌ Bloqueado", premium: "✅ Completo" },
  { name: "Programa Embaixador", free: "❌ Bloqueado", gold: "❌ Bloqueado", premium: "✅ Disponível" },
];

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

export default function EscolherPlano() {
  const navigate = useNavigate();

  const handleCheckout = (plan: "gold" | "premium", period: "monthly" | "annual") => {
    window.open(CHECKOUT_LINKS[plan][period], "_blank");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth", { replace: true });
  };

  return (
    <div className="min-h-[100svh] bg-background">
      {/* Header — sem botão de voltar */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/80 border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h1 className="text-lg sm:text-xl font-bold leading-tight">
              Escolha seu nível de acesso à Plataforma
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              Comece grátis ou desbloqueie tudo com Gold ou Premium
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="shrink-0 text-muted-foreground"
            title="Sair"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 sm:py-8 space-y-6 pb-24">
        {/* Separator */}
        <div className="flex flex-col items-center gap-3 max-w-5xl mx-auto">
          <p className="text-base font-semibold text-foreground text-center">
            Veja o que cada plano oferece e escolha o melhor para você:
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* FREE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="relative overflow-hidden h-full border-emerald-500/30">
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
                    onClick={() => navigate("/home", { replace: true })}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white"
                  >
                    Continuar grátis
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {(["gold", "premium"] as const).map((planKey, index) => {
            const plan = PLAN_INFO[planKey];
            const Icon = plan.icon;
            const monthlyYearly = plan.monthlyValue * 12;
            const savings = monthlyYearly - plan.annualValue;
            const savingsPct = Math.round((savings / monthlyYearly) * 100);

            return (
              <motion.div
                key={planKey}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
              >
                <Card className={`relative overflow-hidden h-full ${plan.borderColor}`}>
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
                    <div className="space-y-3">
                      {FEATURES.map((feature) => {
                        const value = feature[planKey];
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

                    <div className="space-y-2 pt-4 border-t border-border">
                      <Button
                        onClick={() => handleCheckout(planKey, "monthly")}
                        variant="outline"
                        className="w-full text-sm"
                      >
                        Assinar Mensal — {plan.monthlyPrice}/mês
                      </Button>
                      <div className="relative">
                        <Badge className="absolute -top-2 right-3 z-10 bg-green-500 text-white border-0 shadow-md">
                          Economize {savingsPct}%
                        </Badge>
                        <Button
                          onClick={() => handleCheckout(planKey, "annual")}
                          className={`w-full gap-2 h-12 font-bold shadow-lg ${
                            planKey === "premium"
                              ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-purple-500/30"
                              : "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white shadow-amber-500/30"
                          }`}
                        >
                          <ExternalLink className="w-4 h-4" />
                          Assinar Anual — {plan.annualPrice}
                        </Button>
                        <p className="text-center text-[11px] text-muted-foreground mt-1.5">
                          Equivale a {formatBRL(plan.annualValue / 12)}/mês
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <p className="text-center text-xs text-muted-foreground max-w-md mx-auto">
          Após a compra, seu acesso é liberado automaticamente. Você pode começar grátis agora e fazer upgrade quando quiser.
        </p>
      </div>
    </div>
  );
}
