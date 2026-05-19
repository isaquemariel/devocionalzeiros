import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
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
  ChevronRight,
  Wand2,
  PenLine,
  ShieldCheck,
  Upload,
  SplitSquareHorizontal,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useUserPlan } from "@/hooks/useUserPlan";
import { useUsageLimits } from "@/hooks/useUsageLimits";
import { UsageLimitModal } from "@/components/shared/UsageLimitModal";
import { supabase } from "@/integrations/supabase/client";
import { jsPDF } from "jspdf";
import { AppHeader } from "@/components/shared/AppHeader";
import { BottomNavBar } from "@/components/shared/BottomNavBar";
import { extractTextFromFile, ACCEPTED_TYPES } from "@/lib/sermonFileExtract";

type SermonType = "expositivo" | "textual" | "tematico";
type Mode = "generate" | "refine";

interface SavedSermon {
  id: string;
  title: string;
  theme: string;
  sermon_type: string;
  content: string;
  created_at: string;
}

const sermonTypeInfo = {
  expositivo: { icon: BookOpen, title: "Expositivo", description: "Verso a verso, na ordem do texto" },
  textual: { icon: FileText, title: "Textual", description: "Pontos de 1–3 versículos" },
  tematico: { icon: MessageSquare, title: "Temático", description: "Um tema com vários textos" },
};

const SermonGenerator = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { planType } = useUserPlan(user?.email || undefined);
  const { checkLimit, incrementUsage } = useUsageLimits(user?.id, planType);
  const { toast } = useToast();

  const [mode, setMode] = useState<Mode>("generate");

  // Generate mode
  const [theme, setTheme] = useState("");
  const [sermonType, setSermonType] = useState<SermonType>("expositivo");
  const [additionalContext, setAdditionalContext] = useState("");

  // Refine mode
  const [userSermon, setUserSermon] = useState("");
  const [refineNotes, setRefineNotes] = useState("");

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSermon, setGeneratedSermon] = useState("");
  const [copied, setCopied] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [savedSermons, setSavedSermons] = useState<SavedSermon[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [usageLimitModal, setUsageLimitModal] = useState<{
    isOpen: boolean; featureName: string; currentUsage: number; limit: number; isBlocked: boolean;
  } | null>(null);

  // Snapshot of the original (for compare view) + UI flags for refine
  const [originalSermon, setOriginalSermon] = useState("");
  const [showCompare, setShowCompare] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  const contentRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFilePick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow re-uploading same file
    if (!file) return;
    setIsExtracting(true);
    try {
      const text = await extractTextFromFile(file);
      if (!text || text.length < 50) {
        toast({
          title: "Pouco texto extraído",
          description: "O arquivo parece vazio ou é uma imagem escaneada sem texto.",
          variant: "destructive",
        });
        return;
      }
      const trimmed = text.slice(0, 12000);
      setUserSermon(trimmed);
      setUploadedFileName(file.name);
      toast({
        title: "Arquivo carregado",
        description: `${file.name} — ${trimmed.length.toLocaleString("pt-BR")} caracteres prontos para aprimorar.`,
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Erro ao ler arquivo",
        description: err instanceof Error ? err.message : "Tente outro arquivo.",
        variant: "destructive",
      });
    } finally {
      setIsExtracting(false);
    }
  };

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth");
  }, [user, authLoading, navigate]);

  const loadSavedSermons = async () => {
    if (!user) return;
    setLoadingHistory(true);
    try {
      const { data, error } = await supabase
        .from("saved_sermons").select("*").eq("user_id", user.id).order("created_at", { ascending: false });
      if (error) throw error;
      setSavedSermons(data || []);
    } catch (e) {
      console.error(e);
      toast({ title: "Erro ao carregar sermões", variant: "destructive" });
    } finally {
      setLoadingHistory(false);
    }
  };

  const handleOpenHistory = () => { setShowHistory(true); loadSavedSermons(); };

  const handleSelectSermon = (sermon: SavedSermon) => {
    setTheme(sermon.theme);
    setSermonType(sermon.sermon_type as SermonType);
    setGeneratedSermon(sermon.content);
    setShowForm(false);
    setShowHistory(false);
  };

  const handleDeleteSermon = async (id: string) => {
    try {
      const { error } = await supabase.from("saved_sermons").delete().eq("id", id);
      if (error) throw error;
      setSavedSermons((prev) => prev.filter((s) => s.id !== id));
      toast({ title: "Sermão excluído" });
    } catch (e) {
      console.error(e);
      toast({ title: "Erro ao excluir sermão", variant: "destructive" });
    }
  };

  const runStream = async (payload: Record<string, unknown>) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.access_token) {
      toast({ title: "Sessão expirada", description: "Faça login novamente.", variant: "destructive" });
      navigate("/auth");
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
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${session.access_token}` },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Erro ao processar sermão");
      }
      if (!response.body) throw new Error("Resposta vazia do servidor");

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

      toast({
        title: payload.mode === "refine" ? "Sermão aprimorado!" : "Esboço gerado!",
        description: payload.mode === "refine"
          ? "Revisão teológica e de português concluída."
          : "Seu esboço de sermão foi gerado.",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro ao processar",
        description: error instanceof Error ? error.message : "Tente novamente",
        variant: "destructive",
      });
      setShowForm(true);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerate = async () => {
    if (!theme.trim()) {
      toast({ title: "Tema obrigatório", description: "Informe um tema ou texto bíblico.", variant: "destructive" });
      return;
    }
    const limit = checkLimit("sermon");
    if (!limit.canUse) {
      setUsageLimitModal({ isOpen: true, featureName: "Gerador de Sermão",
        currentUsage: limit.currentUsage, limit: limit.limit, isBlocked: limit.isBlocked });
      return;
    }
    await incrementUsage("sermon");
    await runStream({
      mode: "generate",
      theme: theme.trim(),
      sermonType,
      additionalContext: additionalContext.trim() || undefined,
    });
  };

  const handleRefine = async () => {
    if (userSermon.trim().length < 50) {
      toast({
        title: "Sermão muito curto",
        description: "Cole pelo menos 50 caracteres do seu sermão para a IA aprimorar.",
        variant: "destructive",
      });
      return;
    }
    const limit = checkLimit("sermon");
    if (!limit.canUse) {
      setUsageLimitModal({ isOpen: true, featureName: "Aprimorar Sermão",
        currentUsage: limit.currentUsage, limit: limit.limit, isBlocked: limit.isBlocked });
      return;
    }
    await incrementUsage("sermon");
    setOriginalSermon(userSermon.trim());
    setShowCompare(false);
    await runStream({
      mode: "refine",
      userSermon: userSermon.trim(),
      additionalContext: refineNotes.trim() || undefined,
    });
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedSermon);
      setCopied(true);
      toast({ title: "Copiado!" });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({ title: "Erro ao copiar", variant: "destructive" });
    }
  };

  const handleSave = async () => {
    if (!user || !generatedSermon) return;
    setIsSaving(true);
    try {
      const titleMatch = generatedSermon.match(/\*\*TEMA:\*\*\s*(.+)/);
      const title = titleMatch
        ? titleMatch[1].trim()
        : (mode === "refine" ? `Sermão aprimorado — ${new Date().toLocaleDateString("pt-BR")}` : theme.slice(0, 100));
      const { error } = await supabase.from("saved_sermons").insert({
        user_id: user.id,
        title,
        theme: mode === "refine" ? "Sermão aprimorado pelo autor" : theme,
        sermon_type: mode === "refine" ? "tematico" : sermonType,
        content: generatedSermon,
      });
      if (error) throw error;
      toast({ title: "Sermão salvo!" });
    } catch (e) {
      console.error(e);
      toast({ title: "Erro ao salvar", variant: "destructive" });
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
      const cleanText = generatedSermon
        .replace(/\*\*/g, "").replace(/\*/g, "").replace(/👉/g, "→").replace(/---/g, "─".repeat(40));
      doc.setFont("helvetica");
      doc.setFontSize(11);
      const lines = doc.splitTextToSize(cleanText, maxWidth);
      let y = margin;
      const lineHeight = 6;
      for (const line of lines) {
        if (y + lineHeight > pageHeight - margin) { doc.addPage(); y = margin; }
        doc.text(line, margin, y);
        y += lineHeight;
      }
      const baseName = mode === "refine" ? "sermao-aprimorado" : `sermao-${theme.slice(0, 30).replace(/[^a-zA-Z0-9]/g, "-")}`;
      doc.save(`${baseName}-${new Date().toISOString().slice(0, 10)}.pdf`);
      toast({ title: "PDF exportado!" });
    } catch (e) {
      console.error(e);
      toast({ title: "Erro ao exportar PDF", variant: "destructive" });
    }
  };

  const handleNew = () => {
    setGeneratedSermon("");
    setTheme("");
    setAdditionalContext("");
    setUserSermon("");
    setRefineNotes("");
    setOriginalSermon("");
    setShowCompare(false);
    setUploadedFileName(null);
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
    <>
      <div className="min-h-screen bg-[#0a0e1a] text-white">
        {/* Background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-1/4 w-[800px] h-[800px] bg-amber-600/8 rounded-full blur-[150px] -translate-y-1/2" />
          <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-orange-500/6 rounded-full blur-[120px] -translate-x-1/2" />
        </div>

        {/* History */}
        <AnimatePresence>
          {showHistory && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 z-40" onClick={() => setShowHistory(false)} />
              <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25 }}
                className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#0d1220] border-l border-white/10 z-50 overflow-hidden flex flex-col">
                <div className="p-4 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FolderOpen className="w-5 h-5 text-amber-400" />
                    <h2 className="font-bold text-lg">Meus Sermões</h2>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setShowHistory(false)} className="text-white/60 hover:text-white">
                    <X className="w-5 h-5" />
                  </Button>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                  {loadingHistory ? (
                    <div className="flex items-center justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-amber-400" /></div>
                  ) : savedSermons.length === 0 ? (
                    <div className="text-center py-12 text-white/50">
                      <FolderOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>Nenhum sermão salvo ainda</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {savedSermons.map((sermon) => (
                        <div key={sermon.id} className="group p-4 rounded-xl bg-white/5 border border-white/10 hover:border-amber-500/30 transition-all">
                          <div className="cursor-pointer" onClick={() => handleSelectSermon(sermon)}>
                            <h3 className="font-medium text-white/90 line-clamp-1 mb-1">{sermon.title}</h3>
                            <p className="text-xs text-white/50 mb-2">
                              {sermonTypeInfo[sermon.sermon_type as SermonType]?.title || sermon.sermon_type} • {new Date(sermon.created_at).toLocaleDateString("pt-BR")}
                            </p>
                            <p className="text-sm text-white/60 line-clamp-2">{sermon.theme}</p>
                          </div>
                          <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
                            <Button variant="ghost" size="sm" onClick={() => handleSelectSermon(sermon)}
                              className="text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 text-xs">
                              Abrir <ChevronRight className="w-3 h-3 ml-1" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDeleteSermon(sermon.id)}
                              className="text-red-400 hover:text-red-300 hover:bg-red-500/10 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
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

        <div className="relative z-10 max-w-4xl mx-auto px-4 py-6 pb-32">
          <div className="mb-6">
            <AppHeader
              userId={user?.id}
              userEmail={user?.email || undefined}
              rightContent={
                <Button variant="outline" size="sm" onClick={handleOpenHistory}
                  className="border-white/20 text-white hover:bg-white/10">
                  <FolderOpen className="w-4 h-4 mr-1" />
                  <span className="hidden sm:inline">Meus Sermões</span>
                </Button>
              }
            />
          </div>

          <AnimatePresence mode="wait">
            {showForm ? (
              <motion.div key="form" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
                className="space-y-7">
                {/* Hero */}
                <div className="text-center space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-xs font-medium text-amber-300 uppercase tracking-wider">Sermões com IA</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-bold">
                    Estúdio de <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">Pregação</span>
                  </h1>
                  <p className="text-white/60 max-w-xl mx-auto text-sm sm:text-base">
                    Crie esboços do zero ou cole seu próprio sermão para revisão teológica e de português.
                  </p>
                </div>

                {/* Mode Tabs */}
                <div className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-white/5 border border-white/10">
                  <button
                    onClick={() => setMode("generate")}
                    className={`flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all ${
                      mode === "generate"
                        ? "bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg shadow-amber-500/20"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Wand2 className="w-4 h-4" />
                    Gerar com IA
                  </button>
                  <button
                    onClick={() => setMode("refine")}
                    className={`flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all ${
                      mode === "refine"
                        ? "bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg shadow-amber-500/20"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <PenLine className="w-4 h-4" />
                    Aprimorar o meu
                  </button>
                </div>

                <AnimatePresence mode="wait">
                  {mode === "generate" ? (
                    <motion.div key="g" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                      className="space-y-6">
                      <div className="space-y-2">
                        <Label className="text-white/90 text-sm font-semibold">Tema ou Texto Bíblico *</Label>
                        <Textarea
                          placeholder="Ex: João 3:16 • Romanos 8:28 • A fé que vence o medo…"
                          value={theme}
                          onChange={(e) => setTheme(e.target.value)}
                          className="min-h-[90px] bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-amber-500/50 resize-none rounded-xl"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label className="text-white/90 text-sm font-semibold">Tipo de Sermão</Label>
                        <RadioGroup
                          value={sermonType}
                          onValueChange={(v) => setSermonType(v as SermonType)}
                          className="grid grid-cols-1 sm:grid-cols-3 gap-3"
                        >
                          {(Object.keys(sermonTypeInfo) as SermonType[]).map((type) => {
                            const info = sermonTypeInfo[type];
                            const Icon = info.icon;
                            const isSelected = sermonType === type;
                            return (
                              <Label key={type} htmlFor={type}
                                className={`relative flex flex-col items-center gap-2 p-4 rounded-xl cursor-pointer border-2 transition-all ${
                                  isSelected ? "border-amber-500 bg-amber-500/10" : "border-white/10 bg-white/5 hover:border-white/20"
                                }`}>
                                <RadioGroupItem value={type} id={type} className="sr-only" />
                                <Icon className={`w-6 h-6 ${isSelected ? "text-amber-400" : "text-white/60"}`} />
                                <div className="text-center">
                                  <p className={`font-semibold text-sm ${isSelected ? "text-amber-400" : "text-white"}`}>{info.title}</p>
                                  <p className="text-[11px] text-white/50 mt-0.5 leading-tight">{info.description}</p>
                                </div>
                                {isSelected && <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-500" />}
                              </Label>
                            );
                          })}
                        </RadioGroup>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-white/90 text-sm font-semibold">Contexto adicional (opcional)</Label>
                        <Textarea
                          placeholder="Ex: para jovens, foco em aplicação prática, incluir ilustrações…"
                          value={additionalContext}
                          onChange={(e) => setAdditionalContext(e.target.value)}
                          className="min-h-[70px] bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-amber-500/50 resize-none rounded-xl"
                        />
                      </div>

                      <Button onClick={handleGenerate} disabled={isGenerating || !theme.trim()}
                        className="w-full h-14 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-base rounded-xl shadow-lg shadow-amber-500/25 transition-all disabled:opacity-50">
                        {isGenerating ? (
                          <><Loader2 className="w-5 h-5 mr-2 animate-spin" />Gerando esboço…</>
                        ) : (
                          <><Sparkles className="w-5 h-5 mr-2" />Gerar Esboço</>
                        )}
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div key="r" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                      className="space-y-6">
                      <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 flex gap-3">
                        <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                        <div className="text-sm text-white/70 leading-relaxed">
                          <p className="font-semibold text-amber-300 mb-1">Como funciona o aprimoramento</p>
                          <p>Cole seu sermão completo abaixo. A IA fará apenas <strong>revisão teológica</strong>, <strong>português PT-BR</strong> e <strong>ajustes de estrutura</strong> — mantendo sua voz e mensagem.</p>
                        </div>
                      </div>

                      {/* File upload */}
                      <div className="flex flex-col sm:flex-row gap-2 items-stretch">
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept={ACCEPTED_TYPES}
                          className="hidden"
                          onChange={handleFilePick}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={isExtracting}
                          className="flex-1 h-12 border-amber-500/30 bg-amber-500/5 text-amber-300 hover:bg-amber-500/10 hover:text-amber-200 rounded-xl"
                        >
                          {isExtracting ? (
                            <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Lendo arquivo…</>
                          ) : (
                            <><Upload className="w-4 h-4 mr-2" />Subir arquivo (PDF, DOCX, TXT)</>
                          )}
                        </Button>
                        {uploadedFileName && (
                          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white/70 max-w-full sm:max-w-[260px]">
                            <FileText className="w-4 h-4 text-amber-400 shrink-0" />
                            <span className="truncate">{uploadedFileName}</span>
                            <button
                              type="button"
                              onClick={() => { setUploadedFileName(null); setUserSermon(""); }}
                              className="text-white/50 hover:text-white shrink-0"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label className="text-white/90 text-sm font-semibold">
                            Seu sermão * <span className="text-white/40 font-normal">(cole ou suba um arquivo acima)</span>
                          </Label>
                          <span className={`text-xs ${userSermon.length < 50 ? "text-white/40" : "text-amber-400"}`}>
                            {userSermon.length} / 12000
                          </span>
                        </div>
                        <Textarea
                          placeholder="Cole aqui o seu sermão completo, do título ao encerramento…"
                          value={userSermon}
                          onChange={(e) => setUserSermon(e.target.value.slice(0, 12000))}
                          className="min-h-[260px] bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-amber-500/50 resize-y rounded-xl font-mono text-sm leading-relaxed"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-white/90 text-sm font-semibold">Observações para a IA (opcional)</Label>
                        <Textarea
                          placeholder="Ex: preserve este parágrafo, atenção à doutrina da graça, evite linguagem rebuscada…"
                          value={refineNotes}
                          onChange={(e) => setRefineNotes(e.target.value)}
                          className="min-h-[70px] bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-amber-500/50 resize-none rounded-xl"
                        />
                      </div>

                      <Button onClick={handleRefine} disabled={isGenerating || userSermon.trim().length < 50}
                        className="w-full h-14 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-base rounded-xl shadow-lg shadow-amber-500/25 transition-all disabled:opacity-50">
                        {isGenerating ? (
                          <><Loader2 className="w-5 h-5 mr-2 animate-spin" />Aprimorando…</>
                        ) : (
                          <><Wand2 className="w-5 h-5 mr-2" />Aprimorar meu sermão</>
                        )}
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>

                <p className="text-center text-xs text-white/40 pt-2">
                  Inspirado em Hernandes Dias Lopes, Augustus Nicodemus, Charles Spurgeon e John MacArthur
                </p>
              </motion.div>
            ) : (
              <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      {mode === "refine" ? "Sermão Aprimorado" : "Esboço Gerado"}
                    </h2>
                    <p className="text-sm text-white/50">
                      {mode === "refine"
                        ? "Revisão teológica + PT-BR + estrutura"
                        : `${sermonTypeInfo[sermonType].title} • ${theme.slice(0, 50)}${theme.length > 50 ? "…" : ""}`}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" onClick={handleCopy} disabled={!generatedSermon || isGenerating}
                      className="border-white/20 text-white hover:bg-white/10">
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      <span className="ml-1 hidden sm:inline">Copiar</span>
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleSave} disabled={!generatedSermon || isGenerating || isSaving}
                      className="border-white/20 text-white hover:bg-white/10">
                      {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                      <span className="ml-1 hidden sm:inline">Salvar</span>
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleExportPDF} disabled={!generatedSermon || isGenerating}
                      className="border-amber-500/30 text-amber-400 hover:bg-amber-500/10">
                      <Download className="w-4 h-4" /><span className="ml-1">PDF</span>
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleNew}
                      className="border-white/20 text-white hover:bg-white/10">
                      <Sparkles className="w-4 h-4 mr-1" />Novo
                    </Button>
                  </div>
                </div>

                <div ref={contentRef}
                  className="min-h-[400px] max-h-[70vh] overflow-y-auto p-6 rounded-2xl bg-white/[0.03] border border-white/10 shadow-inner">
                  {isGenerating && !generatedSermon ? (
                    <div className="flex flex-col items-center justify-center h-64 gap-4">
                      <Loader2 className="w-10 h-10 animate-spin text-amber-400" />
                      <p className="text-white/60">{mode === "refine" ? "Revisando seu sermão…" : "Gerando seu esboço…"}</p>
                    </div>
                  ) : (
                    <div className="prose prose-invert prose-amber max-w-none">
                      <div className="whitespace-pre-wrap text-white/90 leading-relaxed">
                        {generatedSermon}
                        {isGenerating && <span className="inline-block w-2 h-5 ml-1 bg-amber-400 animate-pulse" />}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {usageLimitModal && (
        <UsageLimitModal
          isOpen={usageLimitModal.isOpen}
          onClose={() => setUsageLimitModal(null)}
          featureName={usageLimitModal.featureName}
          currentUsage={usageLimitModal.currentUsage}
          limit={usageLimitModal.limit}
          isBlocked={usageLimitModal.isBlocked}
          planType={planType || "free"}
        />
      )}
      <BottomNavBar />
    </>
  );
};

export default SermonGenerator;
