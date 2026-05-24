import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Check, X, Crown, ExternalLink, User, LogOut, Flame, Heart, BookOpen, Trophy, Gem } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useForcedDarkTheme } from "@/hooks/useForcedDarkTheme";

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

export default function EscolherPlano() {
  useForcedDarkTheme();
  const navigate = useNavigate();


  // Garante que o scroll do body esteja liberado (algum modal/lock pode ter travado)
  useEffect(() => {
    const prevHtml = document.documentElement.style.overflow;
    const prevBody = document.body.style.overflow;
    const prevPe = document.body.style.pointerEvents;
    document.documentElement.style.overflow = "auto";
    document.body.style.overflow = "auto";
    document.body.style.pointerEvents = "";
    document.body.removeAttribute("data-scroll-locked");
    return () => {
      document.documentElement.style.overflow = prevHtml;
      document.body.style.overflow = prevBody;
      document.body.style.pointerEvents = prevPe;
    };
  }, []);


  const handleCheckout = (plan: "gold" | "premium", period: "monthly" | "annual") => {
    window.open(CHECKOUT_LINKS[plan][period], "_blank");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth", { replace: true });
  };

  return (
    <div className="min-h-[100svh] bg-background">
      {/* Header minimal — só logout */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/70 border-b border-border/50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/30">
              <Flame className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-bold tracking-tight">Devocionalzeiros</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="shrink-0 text-muted-foreground gap-1.5"
            title="Sair"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline text-xs">Sair</span>
          </Button>
        </div>
      </header>

      {/* HERO SECTION — cinematográfico, persuasivo */}
      <section className="relative overflow-hidden border-b border-border/30">
        {/* Background ambient */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-background to-background" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-amber-500/10 rounded-full blur-[100px] opacity-60 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[80px] opacity-50 pointer-events-none" />

        <div className="relative container mx-auto px-4 sm:px-6 py-10 sm:py-16 text-center max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[0.65rem] sm:text-xs uppercase tracking-[0.22em] text-amber-300/80 font-semibold mb-3"
          >
            Bem-vindo(a) à comunidade
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl font-black uppercase leading-[1.05] tracking-tight mb-4"
            style={{
              background: "linear-gradient(180deg, hsl(var(--foreground)) 0%, #fbbf24 55%, #d97706 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 2px 16px rgba(245,158,11,0.25))",
            }}
          >
            Escolha como<br className="sm:hidden" /> caminhar conosco
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl mx-auto mb-6"
          >
            Você pode começar <span className="text-foreground font-semibold">100% grátis</span> e crescer na fé com a gente.
            Assinar Gold ou Premium <span className="text-foreground font-semibold">desbloqueia tudo</span> e ainda
            ajuda a manter o projeto vivo para milhares de irmãos que precisam.
          </motion.p>

          {/* Pílulas de benefícios sociais */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8"
          >
            {[
              { icon: BookOpen, text: "Constância na leitura" },
              { icon: Trophy, text: "Comunidade que cresce junta" },
              { icon: Heart, text: "Projeto sustentável" },
            ].map((item) => (
              <div
                key={item.text}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card/60 border border-border/60 text-xs text-muted-foreground"
              >
                <item.icon className="w-3.5 h-3.5 text-amber-400" />
                <span>{item.text}</span>
              </div>
            ))}
          </motion.div>

          {/* Card "por que assinar" — sutil, persuasivo */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="relative rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-500/10 via-background/50 to-purple-500/5 p-5 sm:p-6 text-left max-w-2xl mx-auto"
          >
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-amber-500/30 to-orange-600/20 border border-amber-400/30 flex items-center justify-center">
                <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-amber-300" fill="currentColor" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm sm:text-base font-bold text-foreground mb-1.5">
                  Por que assinar faz diferença
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Cada assinatura mantém a Bíblia, os devocionais, o RPG e o quiz no ar e gratuitos para quem ainda não pode pagar.
                  Você cresce na constância da Palavra <span className="text-foreground font-medium">e</span> ajuda outros irmãos a permanecerem firmes na fé.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 sm:py-10 space-y-6 pb-24">
        <div className="flex flex-col items-center gap-2 max-w-5xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground font-semibold">
            Compare os planos
          </p>
          <p className="text-base sm:text-lg font-semibold text-foreground">
            Veja o que cada um oferece e escolha o seu:
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
