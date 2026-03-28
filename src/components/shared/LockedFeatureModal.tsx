import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Lock, X, Sparkles, Crown, MessageCircle, Mic, Users, Gamepad2, BookOpen, Dices } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LockedFeatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureName: string;
  featureId?: string;
  isFreePlan?: boolean;
  currentPlan?: string;
}

// Per-feature upgrade messaging
const FEATURE_COPY: Record<string, { title: string; desc: string; benefits: string[]; icon: React.ComponentType<{ className?: string }> }> = {
  chat: {
    icon: MessageCircle,
    title: "Chat IA desbloqueado no Gold",
    desc: "Tire dúvidas bíblicas, peça reflexões e converse com IA especializada em Palavra a qualquer hora.",
    benefits: [
      "Até 20 perguntas por dia ao Devocionalzeiro",
      "Respostas com base bíblica e comentários teológicos",
      "Histórico de conversas salvo na nuvem",
    ],
  },
  sermao: {
    icon: Mic,
    title: "Gere sermões em segundos com Gold",
    desc: "Crie esboços completos de sermões para pregar com autoridade — em segundos, com apoio da IA.",
    benefits: [
      "Até 5 sermões por dia com estrutura profissional",
      "Textos bíblicos, aplicações e ilustrações inclusas",
      "Perfeito para pastores, líderes e pequenos grupos",
    ],
  },
  embaixador: {
    icon: Users,
    title: "Programa Embaixador — exclusivo Premium",
    desc: "Ganhe comissões indicando o Clube HD e construa renda recorrente sendo um embaixador da Palavra.",
    benefits: [
      "Comissões em toda venda que você indicar",
      "Painel exclusivo com links e relatórios de vendas",
      "Suporte prioritário e materiais de divulgação",
    ],
  },
  rpg: {
    icon: Gamepad2,
    title: "Jogue sem limites com Gold",
    desc: "Explore todos os livros da Bíblia em modo RPG sem restrições diárias de estágios.",
    benefits: [
      "Até 10 estágios por dia (vs 2 no gratuito)",
      "Desbloqueie mundos, conquistas e XP",
      "Progresso salvo automaticamente",
    ],
  },
  quiz_random: {
    icon: Dices,
    title: "Modo Aleatório — exclusivo Premium",
    desc: "Teste seus conhecimentos com capítulos surpresa de toda a Bíblia. Perguntas inesperadas, mais desafio e diversão!",
    benefits: [
      "Capítulos sortidos de todo o Antigo e Novo Testamento",
      "5 perguntas por rodada sem limitação de temas",
      "Ideal para desafiar amigos e medir seu progresso geral",
    ],
  },
  financas: {
    icon: BookOpen,
    title: "Finanças — exclusivo Premium",
    desc: "Gerencie suas finanças pessoais com controle total de entradas, saídas, parcelas, assinaturas e orçamentos.",
    benefits: [
      "Controle completo de receitas e despesas",
      "Gerenciamento de parcelas, custos fixos e assinaturas",
      "Relatórios e orçamentos por categoria",
    ],
  },
  default: {
    icon: BookOpen,
    title: "Recurso disponível com upgrade",
    desc: "Acesse recursos exclusivos e leve sua jornada bíblica ao próximo nível.",
    benefits: [
      "Mais usos diários em todas as ferramentas",
      "Recursos avançados de estudo e meditação",
      "Suporte prioritário",
    ],
  },
};

export const LockedFeatureModal = ({
  isOpen,
  onClose,
  featureName,
  featureId = "",
  currentPlan = "free",
}: LockedFeatureModalProps) => {
  const navigate = useNavigate();

  // embaixador and quiz_random are premium-only; chat/sermao need gold
  const needsPremium = featureId === "embaixador" || featureId === "quiz_random" || featureId === "financas";
  const upgradeTarget = needsPremium ? "PREMIUM" : "GOLD";
  const upgradeColor = needsPremium ? "purple" : "amber";

  const copy = FEATURE_COPY[featureId] || FEATURE_COPY.default;
  const FeatureIcon = copy.icon;

  const handleUpgradeClick = () => {
    onClose();
    navigate("/planos");
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          <motion.div
            key="locked-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          <motion.div
            key="locked-modal"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className={`relative w-full max-w-md overflow-hidden rounded-2xl border shadow-2xl ${
              upgradeColor === "purple"
                ? "border-purple-500/20 shadow-purple-500/10"
                : "border-amber-500/20 shadow-amber-500/10"
            }`}>
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950" />

              <div className="relative p-6">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4 text-white/60" />
                </button>

                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border ${
                    upgradeColor === "purple"
                      ? "bg-purple-500/20 border-purple-500/30"
                      : "bg-amber-500/20 border-amber-500/30"
                  }`}>
                    <FeatureIcon className={`w-8 h-8 ${
                      upgradeColor === "purple" ? "text-purple-400" : "text-amber-400"
                    }`} />
                  </div>
                </div>

                {/* Title & description */}
                <div className="text-center mb-4">
                  <h3 className="text-lg font-bold text-white mb-1.5">
                    {copy.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {copy.desc}
                  </p>
                </div>

                {/* Benefits */}
                <div className="bg-white/5 rounded-xl p-4 mb-5 border border-white/5">
                  <p className={`text-xs font-semibold uppercase tracking-wider mb-3 ${
                    upgradeColor === "purple" ? "text-purple-400" : "text-amber-400"
                  }`}>
                    O que você ganha com {upgradeTarget}:
                  </p>
                  <ul className="space-y-2">
                    {copy.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center gap-2 text-white/80 text-sm">
                        <Sparkles className={`w-4 h-4 shrink-0 ${upgradeColor === "purple" ? "text-purple-400" : "text-amber-400"}`} />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="space-y-3">
                  <Button
                    onClick={handleUpgradeClick}
                    className={`w-full h-12 font-bold text-base rounded-xl flex items-center justify-center gap-2 shadow-lg ${
                      upgradeColor === "purple"
                        ? "bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 text-white shadow-purple-500/25"
                        : "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black shadow-amber-500/25"
                    }`}
                  >
                    <Crown className="w-5 h-5" />
                    Fazer Upgrade para {upgradeTarget}
                  </Button>

                  <button
                    onClick={onClose}
                    className="w-full py-2 text-white/40 hover:text-white/60 text-sm transition-colors"
                  >
                    Agora não
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
