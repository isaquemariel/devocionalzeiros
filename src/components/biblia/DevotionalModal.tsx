import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, BookOpen, Heart, MessageCircle } from "lucide-react";

interface DevotionalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DevotionalModal = ({ isOpen, onClose }: DevotionalModalProps) => {
  // Sample devotional content - in the future this could come from an API or database
  const devotional = {
    date: new Date().toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    title: "A Paz que Excede o Entendimento",
    verse: {
      text: "Não andem ansiosos por coisa alguma, mas em tudo, pela oração e súplicas, e com ação de graças, apresentem seus pedidos a Deus. E a paz de Deus, que excede todo o entendimento, guardará os seus corações e as suas mentes em Cristo Jesus.",
      reference: "Filipenses 4:6-7",
    },
    reflection: `Em meio às turbulências da vida, Paulo nos convida a uma postura transformadora: ao invés de nos entregarmos à ansiedade, devemos levar todas as nossas preocupações a Deus em oração.

A promessa é extraordinária: uma paz que ultrapassa nossa capacidade de compreensão. Não é uma paz que vem da ausência de problemas, mas uma paz sobrenatural que guarda nossos corações mesmo em meio às tempestades.

Hoje, que possamos praticar essa entrega confiante, depositando cada preocupação nas mãos do Pai e permitindo que Sua paz inunde nossa alma.`,
    prayer: "Senhor, ajuda-me a não me entregar à ansiedade, mas a confiar todas as minhas preocupações a Ti. Que a Tua paz, que excede todo entendimento, guarde meu coração e minha mente em Cristo Jesus. Amém.",
    application: [
      "Liste três preocupações que você pode entregar a Deus hoje",
      "Reserve um momento para uma oração de gratidão",
      "Memorize o versículo de hoje",
    ],
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
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-4 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:max-w-2xl sm:w-full sm:max-h-[85vh] bg-card border border-border rounded-2xl shadow-xl z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold">Devocional do Dia</h2>
                  <p className="text-sm text-muted-foreground capitalize">{devotional.date}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-muted/10 transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-bold text-center">
                {devotional.title}
              </h3>

              {/* Verse */}
              <div className="p-4 sm:p-6 rounded-xl bg-gradient-to-br from-primary/10 to-accent/5 border border-primary/20">
                <div className="flex items-start gap-3 mb-3">
                  <BookOpen className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-sm font-medium text-primary">Versículo Base</p>
                </div>
                <blockquote className="text-base sm:text-lg leading-relaxed mb-3 italic">
                  "{devotional.verse.text}"
                </blockquote>
                <cite className="text-sm text-accent font-medium">— {devotional.verse.reference}</cite>
              </div>

              {/* Reflection */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Heart className="w-5 h-5 text-pink-500" />
                  <h4 className="font-semibold">Reflexão</h4>
                </div>
                <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {devotional.reflection}
                </div>
              </div>

              {/* Prayer */}
              <div className="p-4 rounded-xl bg-muted/10 border border-border/50">
                <div className="flex items-center gap-2 mb-3">
                  <MessageCircle className="w-5 h-5 text-accent" />
                  <h4 className="font-semibold">Oração</h4>
                </div>
                <p className="text-muted-foreground italic leading-relaxed">
                  {devotional.prayer}
                </p>
              </div>

              {/* Application */}
              <div>
                <h4 className="font-semibold mb-3">Aplicação Prática</h4>
                <ul className="space-y-2">
                  {devotional.application.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-medium flex-shrink-0">
                        {index + 1}
                      </span>
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 sm:p-6 border-t border-border/50">
              <motion.button
                onClick={onClose}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                Fechar Devocional
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DevotionalModal;
