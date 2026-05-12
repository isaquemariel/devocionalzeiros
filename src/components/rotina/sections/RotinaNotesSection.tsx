import { useState } from "react";
import { Plus, Trash2, Star } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useRotinaResource } from "@/hooks/useRotinaData";
import { NOTE_CATEGORIES, NOTE_TEMPLATES } from "@/components/rotina/constants";
import type { RotinaNote } from "@/components/rotina/types";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const RotinaNotesSection = ({ userId }: { userId: string }) => {
  const { data: notes, create, update, remove } = useRotinaResource<RotinaNote>("rotina_notes", userId, {
    orderBy: "updated_at", ascending: false,
  });
  const [editing, setEditing] = useState<RotinaNote | null>(null);
  const [creating, setCreating] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = notes.filter((n) =>
    !search || n.title.toLowerCase().includes(search.toLowerCase()) || n.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Notas & Estudos</h1>
          <p className="text-sm text-muted-foreground">Capture o que Deus está falando.</p>
        </div>
        <Button onClick={() => setCreating(true)} size="sm">
          <Plus className="w-4 h-4 mr-1" /> Nota
        </Button>
      </div>

      <Input placeholder="Buscar..." value={search} onChange={(e) => setSearch(e.target.value)} />

      {filtered.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground text-sm">
          {notes.length === 0 ? "Sua primeira nota está esperando." : "Nada encontrado."}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-3">
          {filtered.map((n) => (
            <div key={n.id} className="p-4 rounded-lg bg-card border border-border hover:border-primary/30 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <button onClick={() => setEditing(n)} className="flex-1 text-left">
                  <div className="flex items-center gap-2">
                    {n.is_favorite && <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />}
                    <span className="font-semibold text-sm">{n.title}</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {NOTE_CATEGORIES.find((c) => c.value === n.category)?.label} ·{" "}
                    {format(parseISO(n.updated_at), "dd MMM", { locale: ptBR })}
                  </div>
                </button>
                <div className="flex gap-1">
                  <button onClick={() => update(n.id, { is_favorite: !n.is_favorite } as any)} className="p-1 hover:bg-muted/30 rounded">
                    <Star className={cn("w-3.5 h-3.5", n.is_favorite ? "text-amber-400 fill-amber-400" : "text-muted-foreground")} />
                  </button>
                  <button onClick={() => remove(n.id)} className="p-1 hover:bg-destructive/20 rounded">
                    <Trash2 className="w-3.5 h-3.5 text-muted-foreground hover:text-destructive" />
                  </button>
                </div>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-3 whitespace-pre-line">{n.content}</p>
            </div>
          ))}
        </div>
      )}

      <NoteDialog
        open={creating || !!editing}
        onClose={() => { setCreating(false); setEditing(null); }}
        note={editing}
        onSave={async (payload) => {
          if (editing) await update(editing.id, payload);
          else await create(payload);
          toast.success("Salva");
          setCreating(false);
          setEditing(null);
        }}
      />
    </div>
  );
};

const NoteDialog = ({ open, onClose, note, onSave }: any) => {
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  const [category, setCategory] = useState(note?.category || "reflexao");
  const [template, setTemplate] = useState<string>("");

  useState(() => {
    setTitle(note?.title || "");
    setContent(note?.content || "");
    setCategory(note?.category || "reflexao");
    setTemplate("");
  });

  const applyTemplate = (key: string) => {
    if (!key) return;
    const tpl = (NOTE_TEMPLATES as any)[key];
    if (tpl) {
      setContent(tpl.content);
      setTemplate(key);
    }
  };

  const handleSave = async () => {
    if (!title.trim()) { toast.error("Título obrigatório"); return; }
    await onSave({
      title: title.trim().slice(0, 200),
      content: content.slice(0, 50000),
      category,
      template_type: template || null,
    });
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle>{note ? "Editar nota" : "Nova nota"}</DialogTitle></DialogHeader>
        <div className="space-y-3">
          <Input placeholder="Título *" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={200} autoFocus />
          <div className="grid grid-cols-2 gap-2">
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="bg-background border border-border rounded-md px-3 py-2 text-sm">
              {NOTE_CATEGORIES.map((c) => (<option key={c.value} value={c.value}>{c.label}</option>))}
            </select>
            {!note && (
              <select value={template} onChange={(e) => applyTemplate(e.target.value)} className="bg-background border border-border rounded-md px-3 py-2 text-sm">
                <option value="">Sem template</option>
                {Object.entries(NOTE_TEMPLATES).map(([k, t]) => (<option key={k} value={k}>{t.label}</option>))}
              </select>
            )}
          </div>
          <Textarea
            placeholder="Escreva aqui... (suporta markdown básico)"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={14}
            className="font-mono text-sm"
          />
          <div className="flex gap-2 justify-end pt-2">
            <Button variant="ghost" onClick={onClose}>Cancelar</Button>
            <Button onClick={handleSave}>Salvar</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
