import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  Loader2, 
  BookOpen, 
  FileText, 
  MessageSquare,
  Sparkles,
  Copy,
  Check,
  Trash2,
  Download,
  Save,
  FolderOpen,
  X,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { jsPDF } from "jspdf";
import logoWhite from "@/assets/logo-white.png";

type SermonType = "expositivo" | "textual" | "tematico";

interface SavedSermon {
  id: string;
  title: string;
  theme: string;
  sermon_type: string;
  content: string;
  created_at: string;
}

const sermonTypeInfo = {
  expositivo: {
    icon: BookOpen,
    title: "Expositivo",
    description: "Segue a estrutura do texto bíblico verso a verso"
  },
  textual: {
    icon: FileText,
    title: "Textual",
    description: "Pontos derivam de um texto curto (1-3 versículos)"
  },
  tematico: {
    icon: MessageSquare,
    title: "Temático",
    description: "Parte de um tema usando vários textos bíblicos"
  }
};

const SermonGenerator = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  
  const [theme, setTheme] = useState("");
  const [sermonType, setSermonType] = useState<SermonType>("expositivo");
  const [additionalContext, setAdditionalContext] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSermon, setGeneratedSermon] = useState("");
  const [copied, setCopied] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [savedSermons, setSavedSermons] = useState<SavedSermon[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  const loadSavedSermons = async () => {
    if (!user) return;
    
    setLoadingHistory(true);
    try {
      const { data, error } = await supabase
        .from('saved_sermons')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSavedSermons(data || []);
    } catch (error) {
      console.error("Error loading sermons:", error);
      toast({
        title: "Erro ao carregar sermões",
        variant: "destructive"
      });
    } finally {
      setLoadingHistory(false);
    }
  };

  const handleOpenHistory = () => {
    setShowHistory(true);
    loadSavedSermons();
  };

  const handleSelectSermon = (sermon: SavedSermon) => {
    setTheme(sermon.theme);
    setSermonType(sermon.sermon_type as SermonType);
    setGeneratedSermon(sermon.content);
    setShowForm(false);
    setShowHistory(false);
  };

  const handleDeleteSermon = async (id: string) => {
    try {
      const { error } = await supabase
        .from('saved_sermons')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setSavedSermons(prev => prev.filter(s => s.id !== id));
      toast({
        title: "Sermão excluído",
      });
    } catch (error) {
      console.error("Error deleting sermon:", error);
      toast({
        title: "Erro ao excluir sermão",
        variant: "destructive"
      });
    }
  };

  const handleGenerate = async () => {
    if (!theme.trim()) {
      toast({
        title: "Tema obrigatório",
        description: "Informe um tema ou texto bíblico para gerar o sermão.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    setGeneratedSermon("");
    setShowForm(false);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/sermao-generator`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            theme: theme.trim(),
            sermonType,
            additionalContext: additionalContext.trim() || undefined
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao gerar sermão");
      }

      if (!response.body) {
        throw new Error("Resposta vazia do servidor");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let sermonContent = "";

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
              sermonContent += content;
              setGeneratedSermon(sermonContent);
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      // Flush remaining buffer
      if (textBuffer.trim()) {
        for (let raw of textBuffer.split("\n")) {
          if (!raw) continue;
          if (raw.endsWith("\r")) raw = raw.slice(0, -1);
          if (raw.startsWith(":") || raw.trim() === "") continue;
          if (!raw.startsWith("data: ")) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === "[DONE]") continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              sermonContent += content;
              setGeneratedSermon(sermonContent);
            }
          } catch { /* ignore */ }
        }
      }

      toast({
        title: "Esboço gerado!",
        description: "Seu esboço de sermão foi gerado com sucesso.",
      });
    } catch (error) {
      console.error("Error generating sermon:", error);
      toast({
        title: "Erro ao gerar sermão",
        description: error instanceof Error ? error.message : "Tente novamente",
        variant: "destructive"
      });
      setShowForm(true);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedSermon);
      setCopied(true);
      toast({
        title: "Copiado!",
        description: "Sermão copiado para a área de transferência.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({
        title: "Erro ao copiar",
        description: "Não foi possível copiar o sermão.",
        variant: "destructive"
      });
    }
  };

  const handleSave = async () => {
    if (!user || !generatedSermon) return;

    setIsSaving(true);
    try {
      // Extract title from content (first line after TEMA:)
      const titleMatch = generatedSermon.match(/\*\*TEMA:\*\*\s*(.+)/);
      const title = titleMatch ? titleMatch[1].trim() : theme.slice(0, 100);

      const { error } = await supabase
        .from('saved_sermons')
        .insert({
          user_id: user.id,
          title,
          theme,
          sermon_type: sermonType,
          content: generatedSermon
        });

      if (error) throw error;

      toast({
        title: "Sermão salvo!",
        description: "Seu sermão foi salvo na sua pasta.",
      });
    } catch (error) {
      console.error("Error saving sermon:", error);
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar o sermão.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleExportPDF = () => {
    if (!generatedSermon) return;

    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 20;
      const maxWidth = pageWidth - margin * 2;
      
      // Clean markdown for PDF
      const cleanText = generatedSermon
        .replace(/\*\*/g, '')
        .replace(/\*/g, '')
        .replace(/👉/g, '→')
        .replace(/---/g, '────────────────────────────────');

      // Set font
      doc.setFont("helvetica");
      doc.setFontSize(11);

      // Split text into lines
      const lines = doc.splitTextToSize(cleanText, maxWidth);
      
      let y = margin;
      const lineHeight = 6;

      for (const line of lines) {
        if (y + lineHeight > pageHeight - margin) {
          doc.addPage();
          y = margin;
        }
        doc.text(line, margin, y);
        y += lineHeight;
      }

      // Generate filename
      const fileName = `sermao-${theme.slice(0, 30).replace(/[^a-zA-Z0-9]/g, '-')}-${new Date().toISOString().slice(0, 10)}.pdf`;
      doc.save(fileName);

      toast({
        title: "PDF exportado!",
        description: "O arquivo foi baixado.",
      });
    } catch (error) {
      console.error("Error exporting PDF:", error);
      toast({
        title: "Erro ao exportar PDF",
        variant: "destructive"
      });
    }
  };

  const handleNewSermon = () => {
    setGeneratedSermon("");
    setTheme("");
    setAdditionalContext("");
    setShowForm(true);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[800px] h-[800px] bg-amber-600/8 rounded-full blur-[150px] -translate-y-1/2" />
        <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-orange-500/6 rounded-full blur-[120px] -translate-x-1/2" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-yellow-500/5 rounded-full blur-[100px] translate-x-1/2" />
      </div>

      {/* History Sidebar */}
      <AnimatePresence>
        {showHistory && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40"
              onClick={() => setShowHistory(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#0d1220] border-l border-white/10 z-50 overflow-hidden flex flex-col"
            >
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FolderOpen className="w-5 h-5 text-amber-400" />
                  <h2 className="font-bold text-lg">Meus Sermões</h2>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowHistory(false)}
                  className="text-white/60 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                {loadingHistory ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-6 h-6 animate-spin text-amber-400" />
                  </div>
                ) : savedSermons.length === 0 ? (
                  <div className="text-center py-12 text-white/50">
                    <FolderOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Nenhum sermão salvo ainda</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {savedSermons.map((sermon) => (
                      <div
                        key={sermon.id}
                        className="group p-4 rounded-xl bg-white/5 border border-white/10 hover:border-amber-500/30 transition-all"
                      >
                        <div 
                          className="cursor-pointer"
                          onClick={() => handleSelectSermon(sermon)}
                        >
                          <h3 className="font-medium text-white/90 line-clamp-1 mb-1">
                            {sermon.title}
                          </h3>
                          <p className="text-xs text-white/50 mb-2">
                            {sermonTypeInfo[sermon.sermon_type as SermonType]?.title || sermon.sermon_type} • {new Date(sermon.created_at).toLocaleDateString('pt-BR')}
                          </p>
                          <p className="text-sm text-white/60 line-clamp-2">
                            {sermon.theme}
                          </p>
                        </div>
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleSelectSermon(sermon)}
                            className="text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 text-xs"
                          >
                            Abrir <ChevronRight className="w-3 h-3 ml-1" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteSermon(sermon.id)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <motion.header 
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/home")}
              className="text-white/70 hover:text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <img src={logoWhite} alt="CLUBE HD" className="h-8" />
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleOpenHistory}
              className="border-white/20 text-white hover:bg-white/10"
            >
              <FolderOpen className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Meus Sermões</span>
            </Button>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/30">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-medium text-amber-400 hidden sm:inline">Gerador de Sermões</span>
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <AnimatePresence mode="wait">
          {showForm ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Title */}
              <div className="text-center mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold mb-2">
                  Gerador de <span className="text-amber-400">Sermões</span>
                </h1>
                <p className="text-white/60 max-w-lg mx-auto">
                  Gere esboços de sermões bíblicos elaborados, inspirados nos grandes pregadores da história
                </p>
              </div>

              {/* Theme Input */}
              <div className="space-y-3">
                <Label className="text-white/90 text-base font-medium">
                  Tema ou Texto Bíblico *
                </Label>
                <Textarea
                  placeholder="Ex: João 3:16, Romanos 8:28, A fé que vence o medo, O propósito do sofrimento..."
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className="min-h-[100px] bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-amber-500/50 resize-none"
                />
              </div>

              {/* Sermon Type Selection */}
              <div className="space-y-4">
                <Label className="text-white/90 text-base font-medium">
                  Tipo de Sermão
                </Label>
                <RadioGroup
                  value={sermonType}
                  onValueChange={(v) => setSermonType(v as SermonType)}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                >
                  {(Object.keys(sermonTypeInfo) as SermonType[]).map((type) => {
                    const info = sermonTypeInfo[type];
                    const Icon = info.icon;
                    const isSelected = sermonType === type;
                    
                    return (
                      <Label
                        key={type}
                        htmlFor={type}
                        className={`
                          relative flex flex-col items-center gap-3 p-5 rounded-xl cursor-pointer
                          border-2 transition-all duration-200
                          ${isSelected 
                            ? 'border-amber-500 bg-amber-500/10' 
                            : 'border-white/10 bg-white/5 hover:border-white/20'
                          }
                        `}
                      >
                        <RadioGroupItem value={type} id={type} className="sr-only" />
                        <Icon className={`w-8 h-8 ${isSelected ? 'text-amber-400' : 'text-white/60'}`} />
                        <div className="text-center">
                          <p className={`font-semibold ${isSelected ? 'text-amber-400' : 'text-white'}`}>
                            {info.title}
                          </p>
                          <p className="text-xs text-white/50 mt-1">
                            {info.description}
                          </p>
                        </div>
                        {isSelected && (
                          <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-amber-500" />
                        )}
                      </Label>
                    );
                  })}
                </RadioGroup>
              </div>

              {/* Additional Context */}
              <div className="space-y-3">
                <Label className="text-white/90 text-base font-medium">
                  Contexto Adicional (opcional)
                </Label>
                <Textarea
                  placeholder="Algum direcionamento específico? Ex: Sermão para jovens, foco em aplicação prática, incluir ilustrações históricas..."
                  value={additionalContext}
                  onChange={(e) => setAdditionalContext(e.target.value)}
                  className="min-h-[80px] bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-amber-500/50 resize-none"
                />
              </div>

              {/* Generate Button */}
              <Button
                onClick={handleGenerate}
                disabled={isGenerating || !theme.trim()}
                className="w-full h-14 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-lg rounded-xl shadow-lg shadow-amber-500/25 transition-all disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Gerando esboço...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Gerar Esboço
                  </>
                )}
              </Button>

              {/* Inspiration Note */}
              <p className="text-center text-xs text-white/40">
                Inspirado nos sermões de Hernandes Dias Lopes, Augustus Nicodemus, Charles Spurgeon e outros grandes pregadores
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Result Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white">Esboço Gerado</h2>
                  <p className="text-sm text-white/50">
                    {sermonTypeInfo[sermonType].title} • {theme.slice(0, 50)}{theme.length > 50 ? "..." : ""}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopy}
                    disabled={!generatedSermon || isGenerating}
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span className="ml-1 hidden sm:inline">Copiar</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSave}
                    disabled={!generatedSermon || isGenerating || isSaving}
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    <span className="ml-1 hidden sm:inline">Salvar</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleExportPDF}
                    disabled={!generatedSermon || isGenerating}
                    className="border-amber-500/30 text-amber-400 hover:bg-amber-500/10"
                  >
                    <Download className="w-4 h-4" />
                    <span className="ml-1">PDF</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleNewSermon}
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    <Sparkles className="w-4 h-4 mr-1" />
                    Novo
                  </Button>
                </div>
              </div>

              {/* Generated Content */}
              <div 
                ref={contentRef}
                className="min-h-[400px] max-h-[70vh] overflow-y-auto p-6 rounded-xl bg-white/5 border border-white/10"
              >
                {isGenerating && !generatedSermon ? (
                  <div className="flex flex-col items-center justify-center h-64 gap-4">
                    <Loader2 className="w-10 h-10 animate-spin text-amber-400" />
                    <p className="text-white/60">Gerando seu esboço...</p>
                  </div>
                ) : (
                  <div className="prose prose-invert prose-amber max-w-none">
                    <div className="whitespace-pre-wrap text-white/90 leading-relaxed">
                      {generatedSermon}
                      {isGenerating && (
                        <span className="inline-block w-2 h-5 ml-1 bg-amber-400 animate-pulse" />
                      )}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SermonGenerator;
