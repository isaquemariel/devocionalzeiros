import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Lock, X, Sparkles, BookOpen, Brain, Trophy, Zap, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LockedFeatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureName: string;
  isFreePlan?: boolean;
  currentPlan?: string;
}

// Mapeamento de plano mínimo para cada funcionalidade
type PlanLevel = "start" | "gold" | "premium";

interface FeatureInfo {
  title: string;
  benefits: string[];
  icon: typeof Sparkles;
  requiredPlan: PlanLevel;
  planLabel: string;
  planColor: string;
}

// Benefícios por feature com plano correto
const FEATURE_BENEFITS: Record<string, FeatureInfo> = {
  // Features que requerem START (plano pago básico)
  "Leitura Bíblica": {
    title: "Plano de Leitura Bíblica",
    benefits: [
      "Planos de leitura organizados",
      "Acompanhamento de progresso",
      "Metas diárias de leitura",
      "Pontuação no ranking",
    ],
    icon: BookOpen,
    requiredPlan: "start",
    planLabel: "START",
    planColor: "text-emerald-400",
  },
  "Bíblia de Estudo": {
    title: "Bíblia de Estudo Completa",
    benefits: [
      "Pesquisa por palavra em toda a Bíblia",
      "Navegação por livros e capítulos",
      "Marcação de versículos favoritos",
      "Interface otimizada para estudo",
    ],
    icon: BookOpen,
    requiredPlan: "start",
    planLabel: "START",
    planColor: "text-emerald-400",
  },
  "Ranking": {
    title: "Ranking da Comunidade",
    benefits: [
      "Veja sua posição no ranking",
      "Compare-se com outros membros",
      "Ganhe pontos por atividades",
      "Celebrações ao entrar no Top 3",
    ],
    icon: Trophy,
    requiredPlan: "start",
    planLabel: "START",
    planColor: "text-emerald-400",
  },
  // Features que requerem GOLD
  "Explicação do Versículo": {
    title: "Estudo Bíblico Profundo",
    benefits: [
      "Comentários teológicos de fontes confiáveis",
      "Palavras-chave em Hebraico e Grego",
      "Referências cruzadas clicáveis",
      "Contexto histórico e cultural",
    ],
    icon: BookOpen,
    requiredPlan: "gold",
    planLabel: "GOLD",
    planColor: "text-amber-400",
  },
  "Devocional do Versículo": {
    title: "Devocionais Personalizados",
    benefits: [
      "Meditação guiada para cada versículo",
      "Oração pronta para seu momento",
      "Frase inspiradora do dia",
      "Aplicação prática na sua vida",
    ],
    icon: Sparkles,
    requiredPlan: "gold",
    planLabel: "GOLD",
    planColor: "text-amber-400",
  },
  "Quiz": {
    title: "Teste seu Conhecimento",
    benefits: [
      "Perguntas sobre os capítulos lidos",
      "Ganhe pontos e suba no ranking",
      "Reforce o aprendizado bíblico",
      "Compita com a comunidade",
    ],
    icon: Brain,
    requiredPlan: "gold",
    planLabel: "GOLD",
    planColor: "text-amber-400",
  },
  // Features que requerem PREMIUM
  "Devocionalzeiros RPG": {
    title: "O Jogo da Bíblia",
    benefits: [
      "Jornada gamificada pela Bíblia inteira",
      "Quiz interativo a cada capítulo",
      "Ganhe XP e suba de nível",
      "Mapa do mundo bíblico para explorar",
    ],
    icon: Zap,
    requiredPlan: "premium",
    planLabel: "PREMIUM",
    planColor: "text-purple-400",
  },
  "Chat IA": {
    title: "Assistente Bíblico com IA",
    benefits: [
      "Tire dúvidas teológicas 24h",
      "Explicações contextualizadas",
      "Sugestões de leitura personalizadas",
      "Apoio no seu crescimento espiritual",
    ],
    icon: Zap,
    requiredPlan: "premium",
    planLabel: "PREMIUM",
    planColor: "text-purple-400",
  },
  "Gerador de Sermão": {
    title: "Sermões com IA",
    benefits: [
      "Gere esboços de sermões em segundos",
      "Múltiplos estilos e formatos",
      "Referências bíblicas automáticas",
      "Ideal para líderes e pregadores",
    ],
    icon: Crown,
    requiredPlan: "premium",
    planLabel: "PREMIUM",
    planColor: "text-purple-400",
  },
  default: {
    title: "Recursos Premium",
    benefits: [
      "Acesso a todas as funcionalidades",
      "Estudo bíblico aprofundado",
      "Ferramentas exclusivas de IA",
      "Comunidade premium no WhatsApp",
    ],
    icon: Trophy,
    requiredPlan: "start",
    planLabel: "START",
    planColor: "text-emerald-400",
  },
};

export const LockedFeatureModal = ({
  isOpen,
  onClose,
  featureName,
  isFreePlan = false,
  currentPlan = "start",
}: LockedFeatureModalProps) => {
  const navigate = useNavigate();
  const featureInfo = FEATURE_BENEFITS[featureName] || FEATURE_BENEFITS.default;
  const FeatureIcon = featureInfo.icon;

  const handleUpgradeClick = () => {
    onClose();
    navigate("/planos");
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

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-amber-500/20 shadow-2xl shadow-amber-500/10">
              {/* Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-900 to-amber-950/30" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent" />
              
              <div className="relative p-6">
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4 text-white/60" />
                </button>

                {/* Header with animated icon */}
                <div className="flex justify-center mb-5">
                  <motion.div 
                    className="relative"
                    animate={{ 
                      scale: [1, 1.05, 1],
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${
                      featureInfo.requiredPlan === "premium" 
                        ? "from-purple-500/30 to-purple-600/20 border-purple-500/30" 
                        : featureInfo.requiredPlan === "gold"
                        ? "from-amber-500/30 to-amber-600/20 border-amber-500/30"
                        : "from-emerald-500/30 to-emerald-600/20 border-emerald-500/30"
                    } flex items-center justify-center border`}>
                      <FeatureIcon className={`w-8 h-8 ${featureInfo.planColor}`} />
                    </div>
                    <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full ${
                      featureInfo.requiredPlan === "premium" 
                        ? "bg-purple-500" 
                        : featureInfo.requiredPlan === "gold" 
                        ? "bg-amber-500"
                        : "bg-emerald-500"
                    } flex items-center justify-center`}>
                      <Lock className="w-3 h-3 text-black" />
                    </div>
                  </motion.div>
                </div>

                {/* Title */}
                <div className="text-center mb-5">
                  <h3 className="text-lg font-bold text-white mb-1">
                    Desbloqueie: {featureInfo.title}
                  </h3>
                  <p className="text-white/50 text-sm">
                    Disponível a partir do plano <span className={`${featureInfo.planColor} font-semibold`}>{featureInfo.planLabel}</span>
                  </p>
                </div>

                {/* Benefits List */}
                <div className="bg-white/5 rounded-xl p-4 mb-5 border border-white/5">
                  <p className={`text-xs font-semibold uppercase tracking-wider mb-3 ${
                    featureInfo.requiredPlan === "premium" 
                      ? "text-purple-400" 
                      : featureInfo.requiredPlan === "gold" 
                      ? "text-amber-400"
                      : "text-emerald-400"
                  }`}>
                    O que você terá acesso:
                  </p>
                  <ul className="space-y-2.5">
                    {featureInfo.benefits.map((benefit, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-2.5"
                      >
                        <div className={`w-5 h-5 rounded-full ${
                          featureInfo.requiredPlan === "premium" 
                            ? "bg-purple-500/20" 
                            : featureInfo.requiredPlan === "gold" 
                            ? "bg-amber-500/20"
                            : "bg-emerald-500/20"
                        } flex items-center justify-center flex-shrink-0 mt-0.5`}>
                          <Sparkles className={`w-3 h-3 ${featureInfo.planColor}`} />
                        </div>
                        <span className="text-white/80 text-sm">{benefit}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* CTA Section */}
                <div className="space-y-3">
                  <Button
                    onClick={handleUpgradeClick}
                    className={`w-full h-12 font-bold text-base rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all ${
                      featureInfo.requiredPlan === "premium"
                        ? "bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 text-white shadow-purple-500/25 hover:shadow-purple-500/40"
                        : featureInfo.requiredPlan === "gold"
                        ? "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black shadow-amber-500/25 hover:shadow-amber-500/40"
                        : "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white shadow-emerald-500/25 hover:shadow-emerald-500/40"
                    }`}
                  >
                    <Crown className="w-5 h-5" />
                    Ver Planos e Fazer Upgrade
                  </Button>

                  <button
                    onClick={onClose}
                    className="w-full py-2 text-white/40 hover:text-white/60 text-sm transition-colors"
                  >
                    Continuar com meu plano atual
                  </button>
                </div>

                {/* Bottom hint */}
                <p className="text-center text-white/30 text-xs mt-4">
                  ✨ Mais de 500 membros já desbloquearam
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};