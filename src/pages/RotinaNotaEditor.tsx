import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save, Star, Trash2, Download, Share2, MapPin, Calendar as CalIcon, Loader2, Eye } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { NOTE_CATEGORIES, NOTE_TEMPLATES } from "@/components/rotina/constants";
import { toast } from "sonner";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";

const todayBrasilia = () => {
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo",
    year: "numeric", month: "2-digit", day: "2-digit",
  });
  return fmt.format(new Date()); // YYYY-MM-DD
};

const RotinaNotaEditor = () => {
  const { id } = useParams<{ id: string }>();
  const isNew = !id || id === "nova";
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewBlob, setPreviewBlob] = useState<Blob | null>(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("reflexao");
  const [template, setTemplate] = useState("");
  const [noteDate, setNoteDate] = useState(todayBrasilia());
  const [location, setLocation] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

  const dirtyRef = useRef(false);

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth");
  }, [authLoading, user, navigate]);

  useEffect(() => {
    if (isNew || !user) return;
    (async () => {
      const { data, error } = await (supabase as any)
        .from("rotina_notes")
        .select("*")
        .eq("id", id)
        .eq("user_id", user.id)
        .maybeSingle();
      if (error || !data) {
        toast.error("Nota não encontrada");
        navigate("/rotina?s=notes");
        return;
      }
      setTitle(data.title);
      setContent(data.content || "");
      setCategory(data.category || "reflexao");
      setTemplate(data.template_type || "");
      setNoteDate(data.note_date || todayBrasilia());
      setLocation(data.location || "");
      setIsFavorite(!!data.is_favorite);
      setLoading(false);
    })();
  }, [id, isNew, user, navigate]);

  const applyTemplate = (key: string) => {
    if (!key) { setTemplate(""); return; }
    const tpl = (NOTE_TEMPLATES as any)[key];
    if (tpl) {
      if (!content.trim() || confirm("Substituir o conteúdo atual pelo template?")) {
        setContent(tpl.content);
      }
      setTemplate(key);
    }
  };

  const handleSave = async (silent = false): Promise<string | null> => {
    if (!title.trim()) { toast.error("Título obrigatório"); return null; }
    if (!user) return null;
    setSaving(true);
    const payload = {
      title: title.trim().slice(0, 200),
      content: content.slice(0, 50000),
      category,
      template_type: template || null,
      note_date: noteDate,
      location: location.trim() ? location.trim().slice(0, 200) : null,
      is_favorite: isFavorite,
    };
    try {
      if (isNew) {
        const { data, error } = await (supabase as any)
          .from("rotina_notes")
          .insert({ ...payload, user_id: user.id })
          .select()
          .single();
        if (error) throw error;
        dirtyRef.current = false;
        if (!silent) toast.success("Nota criada");
        navigate(`/rotina/notas/${data.id}`, { replace: true });
        return data.id;
      } else {
        const { error } = await (supabase as any)
          .from("rotina_notes")
          .update(payload)
          .eq("id", id);
        if (error) throw error;
        dirtyRef.current = false;
        if (!silent) toast.success("Salva");
        return id!;
      }
    } catch (e) {
      toast.error("Erro ao salvar");
      return null;
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (isNew || !confirm("Excluir esta nota?")) return;
    const { error } = await (supabase as any).from("rotina_notes").delete().eq("id", id);
    if (error) { toast.error("Erro ao remover"); return; }
    toast.success("Removida");
    navigate("/rotina?s=notes");
  };

  const buildPdf = async () => {
    const { default: jsPDF } = await import("jspdf");
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const pageW = doc.internal.pageSize.getWidth();
    const pageH = doc.internal.pageSize.getHeight();
    const margin = 48;
    let y = margin;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    const titleLines = doc.splitTextToSize(title || "Sem título", pageW - margin * 2);
    doc.text(titleLines, margin, y);
    y += titleLines.length * 22 + 6;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(110);
    const catLabel = NOTE_CATEGORIES.find((c) => c.value === category)?.label || category;
    const dateLabel = format(parseISO(noteDate), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
    const metaParts = [catLabel, dateLabel];
    if (location.trim()) metaParts.push(location.trim());
    doc.text(metaParts.join("  ·  "), margin, y);
    y += 16;

    doc.setDrawColor(220);
    doc.line(margin, y, pageW - margin, y);
    y += 18;

    doc.setTextColor(20);
    doc.setFontSize(12);
    const bodyLines = doc.splitTextToSize(content || "", pageW - margin * 2);
    const lineH = 16;
    for (const line of bodyLines) {
      if (y > pageH - margin) { doc.addPage(); y = margin; }
      doc.text(line, margin, y);
      y += lineH;
    }

    doc.setFontSize(9);
    doc.setTextColor(150);
    doc.text("Devocionalzeiros · Rotina · Notas", margin, pageH - 24);

    return doc;
  };

  const safeFilename = () =>
    (title.replace(/[^\p{L}\p{N}\s_-]/gu, "").trim().slice(0, 80) || "nota") + ".pdf";

  const closePreview = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setPreviewBlob(null);
  };

  const handleOpenPreview = async () => {
    if (!title.trim()) { toast.error("Adicione um título antes de exportar"); return; }
    setExporting(true);
    try {
      if (isNew || dirtyRef.current) await handleSave(true);
      const doc = await buildPdf();
      const blob = doc.output("blob");
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewBlob(blob);
      setPreviewUrl(URL.createObjectURL(blob));
    } catch (e) {
      console.error(e);
      toast.error("Falha ao gerar pré-visualização");
    } finally {
      setExporting(false);
    }
  };

  const handleDownloadPdf = () => {
    if (!previewBlob) return;
    const url = URL.createObjectURL(previewBlob);
    const a = document.createElement("a");
    a.href = url; a.download = safeFilename(); a.click();
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    if (!previewBlob) return;
    try {
      const file = new File([previewBlob], safeFilename(), { type: "application/pdf" });
      const nav: any = navigator;
      if (nav.canShare && nav.canShare({ files: [file] })) {
        await nav.share({
          files: [file],
          title,
          text: `${title}\n\nMinha nota do Devocionalzeiros Rotina.`,
        });
      } else {
        handleDownloadPdf();
        toast.info("Compartilhamento não suportado — PDF baixado");
      }
    } catch (e: any) {
      if (e?.name !== "AbortError") {
        console.error(e);
        toast.error("Falha ao compartilhar");
      }
    }
  };

  const markDirty = <T,>(setter: (v: T) => void) => (v: T) => { dirtyRef.current = true; setter(v); };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      <header className="sticky top-0 z-30 bg-background/90 backdrop-blur border-b border-border">
        <div className="max-w-3xl mx-auto px-3 py-2 flex items-center gap-2">
          <button
            onClick={() => navigate("/rotina?s=notes")}
            className="p-2 rounded-lg hover:bg-muted/30 transition-colors"
            title="Voltar"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div className="flex-1 text-sm font-medium text-foreground truncate">
            {isNew ? "Nova nota" : "Editar nota"}
          </div>
          <button
            onClick={() => setIsFavorite((v) => { dirtyRef.current = true; return !v; })}
            className="p-2 rounded-lg hover:bg-muted/30 transition-colors"
            title="Favoritar"
          >
            <Star className={cn("w-5 h-5", isFavorite ? "text-amber-400 fill-amber-400" : "text-muted-foreground")} />
          </button>
          <Button onClick={() => handleSave()} disabled={saving} size="sm">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Save className="w-4 h-4 mr-1" /> Salvar</>}
          </Button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-5 space-y-4">
        <Input
          placeholder="Título *"
          value={title}
          onChange={(e) => markDirty(setTitle)(e.target.value)}
          maxLength={200}
          autoFocus={isNew}
          className="text-lg font-semibold"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground flex items-center gap-1.5">
              <CalIcon className="w-3.5 h-3.5" /> Data da nota
            </Label>
            <Input
              type="date"
              value={noteDate}
              onChange={(e) => markDirty(setNoteDate)(e.target.value || todayBrasilia())}
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" /> Local <span className="opacity-60">(opcional)</span>
            </Label>
            <Input
              placeholder="Ex: Igreja Central, Casa, Retiro..."
              value={location}
              onChange={(e) => markDirty(setLocation)(e.target.value)}
              maxLength={200}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Categoria</Label>
            <select
              value={category}
              onChange={(e) => markDirty(setCategory)(e.target.value)}
              className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm h-10"
            >
              {NOTE_CATEGORIES.map((c) => (<option key={c.value} value={c.value}>{c.label}</option>))}
            </select>
          </div>
          {isNew && (
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Template</Label>
              <select
                value={template}
                onChange={(e) => applyTemplate(e.target.value)}
                className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm h-10"
              >
                <option value="">Sem template</option>
                {Object.entries(NOTE_TEMPLATES).map(([k, t]: any) => (
                  <option key={k} value={k}>{t.label}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        <Textarea
          placeholder="Escreva aqui... (suporta markdown básico)"
          value={content}
          onChange={(e) => markDirty(setContent)(e.target.value)}
          rows={20}
          className="font-mono text-sm min-h-[50vh]"
        />

        <div className="flex flex-wrap items-center gap-2 pt-2">
          <Button variant="outline" size="sm" onClick={handleOpenPreview} disabled={exporting}>
            {exporting ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : <Eye className="w-4 h-4 mr-1" />}
            Pré-visualizar PDF
          </Button>
          {!isNew && (
            <Button variant="ghost" size="sm" onClick={handleDelete} className="ml-auto text-destructive hover:text-destructive">
              <Trash2 className="w-4 h-4 mr-1" /> Excluir
            </Button>
          )}
        </div>
      </main>

      <Dialog open={!!previewUrl} onOpenChange={(o) => !o && closePreview()}>
        <DialogContent className="max-w-4xl w-[95vw] h-[90vh] p-0 flex flex-col gap-0">
          <DialogHeader className="px-4 py-3 border-b border-border shrink-0">
            <DialogTitle className="text-sm font-medium">Pré-visualização do PDF</DialogTitle>
          </DialogHeader>
          <div className="flex-1 min-h-0 bg-muted/20">
            {previewUrl && (
              <iframe
                src={previewUrl}
                title="Pré-visualização do PDF"
                className="w-full h-full border-0"
              />
            )}
          </div>
          <div className="flex flex-wrap items-center justify-end gap-2 px-4 py-3 border-t border-border shrink-0">
            <Button variant="ghost" size="sm" onClick={closePreview}>Fechar</Button>
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="w-4 h-4 mr-1" /> Compartilhar
            </Button>
            <Button size="sm" onClick={handleDownloadPdf}>
              <Download className="w-4 h-4 mr-1" /> Baixar PDF
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RotinaNotaEditor;
