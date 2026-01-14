import { motion, AnimatePresence } from "framer-motion";
import { Lock, MessageCircle, ExternalLink, X, Sparkles, BookOpen, Brain, Trophy, Zap, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LockedFeatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureName: string;
  isFreePlan?: boolean;
}

// Benefícios por feature para mostrar contexto relevante
const FEATURE_BENEFITS: Record<string, { title: string; benefits: string[]; icon: typeof Sparkles }> = {
  "Explicação do Versículo": {
    title: "Estudo Bíblico Profundo",
    benefits: [
      "Comentários teológicos de fontes confiáveis",
      "Palavras-chave em Hebraico e Grego",
      "Referências cruzadas clicáveis",
      "Devocional personalizado por versículo",
    ],
    icon: BookOpen,
  },
  "Devocional do Versículo": {
    title: "Devocionais Personalizados",
    benefits: [
      "Meditação guiada para cada versículo",
      "Oração pronta para seu momento",
      "Frase inspiradora do dia",
      "Ganhe pontos a cada devocional",
    ],
    icon: Sparkles,
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
  },
};

export const LockedFeatureModal = ({
  isOpen,
  onClose,
  featureName,
  isFreePlan = false,
}: LockedFeatureModalProps) => {
  const featureInfo = FEATURE_BENEFITS[featureName] || FEATURE_BENEFITS.default;
  const FeatureIcon = featureInfo.icon;

  const handleUpgradeClick = () => {
    if (isFreePlan) {
      window.location.href = "/#planos";
    } else {
      const message = encodeURIComponent("Oii, quero fazer um upgrade de plano.");
      const whatsappNumber = "5584999488698";
      window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
    }
    onClose();
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
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/30 to-amber-600/20 flex items-center justify-center border border-amber-500/30">
                      <FeatureIcon className="w-8 h-8 text-amber-400" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center">
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
                    Disponível no plano <span className="text-amber-400 font-semibold">GOLD</span> ou superior
                  </p>
                </div>

                {/* Benefits List */}
                <div className="bg-white/5 rounded-xl p-4 mb-5 border border-white/5">
                  <p className="text-xs text-amber-400 font-semibold uppercase tracking-wider mb-3">
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
                        <div className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Sparkles className="w-3 h-3 text-amber-400" />
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
                    className="w-full h-12 font-bold text-base rounded-xl flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black shadow-lg shadow-amber-500/25 transition-all hover:shadow-amber-500/40"
                  >
                    {isFreePlan ? (
                      <>
                        <Crown className="w-5 h-5" />
                        Ver Planos e Preços
                      </>
                    ) : (
                      <>
                        <MessageCircle className="w-5 h-5" />
                        Fazer Upgrade Agora
                      </>
                    )}
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