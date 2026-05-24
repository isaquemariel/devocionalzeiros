import { motion } from "framer-motion";
import { Brain, ChevronRight, Loader2, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface QuizCardProps {
  chaptersReadToday: number;
  questionsAnsweredToday: number;
  loading?: boolean;
}

export const QuizCard = ({
  chaptersReadToday,
  questionsAnsweredToday,
  loading = false,
}: QuizCardProps) => {
  const navigate = useNavigate();
  const maxQuestions = chaptersReadToday * 2;
  const hasQuestionsAvailable = questionsAnsweredToday < maxQuestions;
  const questionsRemaining = Math.max(0, maxQuestions - questionsAnsweredToday);

  const handleClick = () => {
    if (!loading) {
      navigate('/quiz');
    }
  };

  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-600/20 via-yellow-600/15 to-orange-600/20 border border-amber-500/30 p-5 cursor-pointer hover:border-amber-500/50 transition-all group"
      onClick={handleClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Glow Effect */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/20 rounded-full blur-[50px] group-hover:bg-amber-500/30 transition-colors" />
      
      {/* Zap Animation */}
      <motion.div
        className="absolute top-3 right-3"
        animate={{ rotate: [0, 15, -15, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Zap className="w-5 h-5 text-amber-400" />
      </motion.div>

      <div className="relative z-10">
        {/* Icon */}
        <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center mb-4">
          <Brain className="w-6 h-6 text-amber-400" />
        </div>

        {/* Title */}
        <h3 className="font-bold text-lg mb-1">Quiz Bíblico</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Teste seu conhecimento
        </p>

        {/* Stats */}
        {chaptersReadToday > 0 ? (
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Capítulos lidos hoje</span>
              <span className="font-semibold text-amber-400">{chaptersReadToday}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Perguntas disponíveis</span>
              <span className="font-semibold text-amber-400">{questionsRemaining}</span>
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground/70 mb-4">
            Leia capítulos para desbloquear perguntas
          </p>
        )}

        {/* Action Button */}
        {loading ? (
          <div className="flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-amber-500/20 text-amber-300">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm">Carregando...</span>
          </div>
        ) : hasQuestionsAvailable && chaptersReadToday > 0 ? (
          <div className="flex items-center justify-between py-2 px-4 rounded-lg bg-amber-500/20 text-amber-300 group-hover:bg-amber-500/30 transition-colors">
            <span className="text-sm font-medium">Iniciar Quiz</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        ) : questionsAnsweredToday > 0 ? (
          <div className="py-2 px-4 rounded-lg bg-green-500/20 text-green-400 text-center">
            <span className="text-sm font-medium">Quiz completo! ✓</span>
          </div>
        ) : (
          <div className="py-2 px-4 rounded-lg bg-muted/30 text-muted-foreground text-center">
            <span className="text-sm">Leia para desbloquear</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};