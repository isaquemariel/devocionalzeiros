import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Loader2, BookOpen, Calendar, CheckCircle2, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface CustomPlanData {
  name: string;
  description: string;
  books: string[];
  totalDays: number;
  totalChapters: number;
  chaptersPerDay: number;
}

interface CustomPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (planData: CustomPlanData) => Promise<void>;
}

const SUGGESTIONS = [
  "Evangelhos",
  "Cartas de Paulo",
  "Salmos e Provérbios",
  "Pentateuco",
  "Profetas Menores",
  "Novo Testamento",
  "Antigo Testamento",
];

const DAY_OPTIONS = [7, 14, 21, 30, 60, 90, 184, 365];

export const CustomPlanModal = ({ isOpen, onClose, onConfirm }: CustomPlanModalProps) => {
  const [userRequest, setUserRequest] = useState("");
  const [totalDays, setTotalDays] = useState(30);
  const [loading, setLoading] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<CustomPlanData | null>(null);
  const [confirming, setConfirming] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!userRequest.trim()) {
      toast.error("Descreva o que você quer ler");
      return;
    }

    setLoading(true);
    setGeneratedPlan(null);
    setValidationError(null);

    try {
      const { data, error } = await supabase.functions.invoke("custom-plan-generator", {
        body: { userRequest, totalDays },
      });

      if (error) throw error;

      if (data.error) {
        // Check if it's a Bible book validation error
        if (data.error.includes("livros") || data.error.includes("bíblia") || data.error.includes("Bíblia")) {
          setValidationError(data.error);
        } else {
          toast.error(data.error);
        }
        return;
      }

      // Validate that books were found
      if (!data.plan?.books || data.plan.books.length === 0) {
        setValidationError("Não encontramos livros da Bíblia no seu pedido. Por favor, mencione livros bíblicos específicos como 'Gênesis', 'Salmos', 'Evangelhos', etc.");
        return;
      }

      setGeneratedPlan(data.plan);
    } catch (error) {
      console.error("Error generating plan:", error);
      toast.error("Erro ao gerar plano. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async () => {
    if (!generatedPlan) return;

    setConfirming(true);
    try {
      await onConfirm(generatedPlan);
      handleClose();
    } catch (error) {
      toast.error("Erro ao confirmar plano");
    } finally {
      setConfirming(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setUserRequest(suggestion);
    setValidationError(null);
  };

  const handleClose = () => {
    onClose();
    setGeneratedPlan(null);
    setUserRequest("");
    setTotalDays(30);
    setValidationError(null);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
        onClick={handleClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-card border border-border rounded-2xl shadow-2xl my-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold">Plano Personalizado</h2>
                <p className="text-xs text-muted-foreground">Criado com IA</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-2 rounded-lg hover:bg-muted/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto">
            {!generatedPlan ? (
              <>
                {/* Input Section */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">O que você quer ler?</label>
                  <textarea
                    value={userRequest}
                    onChange={(e) => {
                      setUserRequest(e.target.value);
                      setValidationError(null);
                    }}
                    placeholder="Ex: Quero ler os evangelhos, ou cartas de Paulo, ou Salmos e Provérbios..."
                    className="w-full p-3 rounded-xl bg-muted/10 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-none h-24"
                  />
                </div>

                {/* Validation Error */}
                {validationError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 rounded-xl bg-destructive/10 border border-destructive/30 flex items-start gap-3"
                  >
                    <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                    <p className="text-sm text-destructive">{validationError}</p>
                  </motion.div>
                )}

                {/* Suggestions */}
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground">Sugestões:</p>
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTIONS.map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="px-3 py-1.5 text-xs rounded-full bg-muted/20 hover:bg-primary/20 hover:text-primary transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Days Selection */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Em quantos dias?</label>
                  <div className="grid grid-cols-4 gap-2">
                    {DAY_OPTIONS.map((days) => (
                      <button
                        key={days}
                        onClick={() => setTotalDays(days)}
                        className={`py-2 px-3 rounded-xl text-sm font-medium transition-all ${
                          totalDays === days
                            ? "bg-primary text-primary-foreground shadow-lg"
                            : "bg-muted/10 border border-border hover:bg-muted/20"
                        }`}
                      >
                        {days}d
                      </button>
                    ))}
                  </div>
                </div>

                {/* Generate Button */}
                <motion.button
                  onClick={handleGenerate}
                  disabled={loading || !userRequest.trim()}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Gerando plano...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      <span>Gerar Plano com IA</span>
                    </>
                  )}
                </motion.button>
              </>
            ) : (
              <>
                {/* Generated Plan Preview */}
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-gradient-to-br from-violet-500/10 to-purple-600/10 border border-violet-500/30">
                    <h3 className="text-lg font-bold mb-1">{generatedPlan.name}</h3>
                    <p className="text-sm text-muted-foreground">{generatedPlan.description}</p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 rounded-xl bg-muted/10 text-center">
                      <BookOpen className="w-5 h-5 mx-auto mb-1 text-primary" />
                      <p className="text-lg font-bold">{generatedPlan.books.length}</p>
                      <p className="text-xs text-muted-foreground">Livros</p>
                    </div>
                    <div className="p-3 rounded-xl bg-muted/10 text-center">
                      <Calendar className="w-5 h-5 mx-auto mb-1 text-accent" />
                      <p className="text-lg font-bold">{generatedPlan.totalDays}</p>
                      <p className="text-xs text-muted-foreground">Dias</p>
                    </div>
                    <div className="p-3 rounded-xl bg-muted/10 text-center">
                      <CheckCircle2 className="w-5 h-5 mx-auto mb-1 text-green-500" />
                      <p className="text-lg font-bold">~{generatedPlan.chaptersPerDay}</p>
                      <p className="text-xs text-muted-foreground">Cap/dia</p>
                    </div>
                  </div>

                  {/* Books List */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Livros incluídos:</p>
                    <div className="flex flex-wrap gap-2">
                      {generatedPlan.books.map((book) => (
                        <span
                          key={book}
                          className="px-2.5 py-1 text-xs rounded-full bg-primary/10 text-primary"
                        >
                          {book}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setGeneratedPlan(null);
                        setValidationError(null);
                      }}
                      className="flex-1 py-3 rounded-xl border border-border font-medium hover:bg-muted/10 transition-colors"
                    >
                      Refazer
                    </button>
                    <motion.button
                      onClick={handleConfirm}
                      disabled={confirming}
                      className="flex-1 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      {confirming ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <>
                          <CheckCircle2 className="w-5 h-5" />
                          <span>Confirmar</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
