import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen, Loader2, CheckCircle2, Award } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface ChapterReadingModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: string;
  chapter: number;
  isCompleted: boolean;
  onMarkComplete: () => void;
}

const ChapterReadingModal = ({
  isOpen,
  onClose,
  book,
  chapter,
  isCompleted,
  onMarkComplete,
}: ChapterReadingModalProps) => {
  const [explanation, setExplanation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && book && chapter) {
      fetchExplanation();
    }
    
    return () => {
      setExplanation("");
      setError(null);
    };
  }, [isOpen, book, chapter]);

  const fetchExplanation = async () => {
    setIsLoading(true);
    setExplanation("");
    setError(null);

    try {
      // Get current session for auth token
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) {
        throw new Error("Você precisa estar logado para acessar esta funcionalidade");
      }

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chapter-explanation`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({ book, chapter }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao carregar explicação");
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("Erro ao iniciar leitura");

      const decoder = new TextDecoder();
      let textBuffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              setExplanation((prev) => prev + content);
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }
    } catch (err) {
      console.error("Error fetching explanation:", err);
      setError(err instanceof Error ? err.message : "Erro ao carregar explicação");
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkComplete = () => {
    onMarkComplete();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl h-[90dvh] flex flex-col p-0 gap-0 bg-background border-border/50 [&>button]:hidden overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-lg font-bold">
                {book} {chapter}
              </DialogTitle>
              <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" />
                Explicação com base na Bíblia de Estudos
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-muted/20 transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <AnimatePresence mode="wait">
            {isLoading && !explanation ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-12 gap-4"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
                <p className="text-muted-foreground">Gerando explicação teológica...</p>
                <p className="text-xs text-muted-foreground/60">Isso pode levar alguns segundos</p>
              </motion.div>
            ) : error ? (
              <motion.div
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-12 gap-4"
              >
                <div className="w-16 h-16 rounded-full bg-destructive/20 flex items-center justify-center">
                  <X className="w-8 h-8 text-destructive" />
                </div>
                <p className="text-destructive">{error}</p>
                <Button onClick={fetchExplanation} variant="outline">
                  Tentar novamente
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="prose prose-sm sm:prose-base dark:prose-invert max-w-none"
              >
                <div className="whitespace-pre-wrap text-foreground leading-relaxed">
                  {explanation.split("\n").map((line, index) => {
                    // Handle markdown headers
                    if (line.startsWith("# ")) {
                      return (
                        <h1 key={index} className="text-2xl font-bold text-foreground mt-6 mb-3 first:mt-0">
                          {line.slice(2)}
                        </h1>
                      );
                    }
                    if (line.startsWith("## ")) {
                      return (
                        <h2 key={index} className="text-xl font-bold text-foreground mt-5 mb-2">
                          {line.slice(3)}
                        </h2>
                      );
                    }
                    if (line.startsWith("### ")) {
                      return (
                        <h3 key={index} className="text-lg font-semibold text-foreground mt-4 mb-2">
                          {line.slice(4)}
                        </h3>
                      );
                    }
                    if (line.startsWith("- ") || line.startsWith("* ")) {
                      return (
                        <li key={index} className="ml-4 text-muted-foreground">
                          {line.slice(2)}
                        </li>
                      );
                    }
                    if (line.startsWith("> ")) {
                      return (
                        <blockquote key={index} className="border-l-4 border-primary/50 pl-4 italic text-muted-foreground my-3">
                          {line.slice(2)}
                        </blockquote>
                      );
                    }
                    if (line.startsWith("**") && line.endsWith("**")) {
                      return (
                        <p key={index} className="font-bold text-foreground my-2">
                          {line.slice(2, -2)}
                        </p>
                      );
                    }
                    if (line.trim() === "") {
                      return <br key={index} />;
                    }
                    // Process inline formatting safely using React elements (no dangerouslySetInnerHTML)
                    const processInlineFormatting = (text: string): React.ReactNode[] => {
                      const parts: React.ReactNode[] = [];
                      let remaining = text;
                      let partKey = 0;
                      
                      while (remaining.length > 0) {
                        // Match bold (**text**)
                        const boldMatch = remaining.match(/^(.*?)\*\*(.+?)\*\*(.*)/s);
                        if (boldMatch) {
                          if (boldMatch[1]) parts.push(<span key={partKey++}>{boldMatch[1]}</span>);
                          parts.push(<strong key={partKey++} className="text-foreground">{boldMatch[2]}</strong>);
                          remaining = boldMatch[3];
                          continue;
                        }
                        
                        // Match italic (*text*)
                        const italicMatch = remaining.match(/^(.*?)\*(.+?)\*(.*)/s);
                        if (italicMatch) {
                          if (italicMatch[1]) parts.push(<span key={partKey++}>{italicMatch[1]}</span>);
                          parts.push(<em key={partKey++}>{italicMatch[2]}</em>);
                          remaining = italicMatch[3];
                          continue;
                        }
                        
                        // Match code (`text`)
                        const codeMatch = remaining.match(/^(.*?)`(.+?)`(.*)/s);
                        if (codeMatch) {
                          if (codeMatch[1]) parts.push(<span key={partKey++}>{codeMatch[1]}</span>);
                          parts.push(<code key={partKey++} className="bg-muted/30 px-1 py-0.5 rounded text-sm">{codeMatch[2]}</code>);
                          remaining = codeMatch[3];
                          continue;
                        }
                        
                        // No more formatting, add remaining text
                        parts.push(<span key={partKey++}>{remaining}</span>);
                        break;
                      }
                      
                      return parts;
                    };
                    
                    return (
                      <p key={index} className="text-muted-foreground my-2">
                        {processInlineFormatting(line)}
                      </p>
                    );
                  })}
                  {isLoading && (
                    <span className="inline-block w-2 h-4 bg-primary/50 animate-pulse ml-1" />
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 border-t border-border/50">
          <Button
            onClick={handleMarkComplete}
            disabled={isCompleted}
            className={`w-full py-3 rounded-xl font-semibold transition-all ${
              isCompleted
                ? "bg-accent/20 text-accent"
                : "bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90"
            }`}
          >
            {isCompleted ? (
              <>
                <CheckCircle2 className="w-5 h-5 mr-2" />
                Capítulo Concluído
              </>
            ) : (
              <>
                <CheckCircle2 className="w-5 h-5 mr-2" />
                Marcar como Lido
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChapterReadingModal;
