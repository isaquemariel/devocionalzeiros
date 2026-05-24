import { useState } from "react";
import { Plus, Pin, Trash2, Heart, BadgeCheck } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useRotinaResource } from "@/hooks/useRotinaData";
import { PRAYER_CATEGORIES } from "@/components/rotina/constants";
import type { RotinaPrayer } from "@/components/rotina/types";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type Tab = "praying" | "answered" | "all";

export const RotinaPrayersSection = ({ userId }: { userId: string }) => {
  const { data: prayers, create, update, remove } = useRotinaResource<RotinaPrayer>("rotina_prayers", userId);
  const [tab, setTab] = useState<Tab>("praying");
  const [editing, setEditing] = useState<RotinaPrayer | null>(null);
  const [creating, setCreating] = useState(false);
  const [answering, setAnswering] = useState<RotinaPrayer | null>(null);
  const [testimony, setTestimony] = useState("");

  const filtered = prayers
    .filter((p) => (tab === "all" ? true : p.status === tab))
    .sort((a, b) => Number(b.is_pinned) - Number(a.is_pinned));

  const handleAnswer = async () => {
    if (!answering) return;
    await update(answering.id, {
      status: "answered",
      testimony: testimony.trim() || null,
      answered_at: new Date().toISOString(),
    } as any);
    toast.success("Glória a Deus! 🙌");
    setAnswering(null);
    setTestimony("");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Lista de Oração</h1>
          <p className="text-sm text-muted-foreground">Pedidos persistentes, testemunhos eternos.</p>
        </div>
        <Button onClick={() => setCreating(true)} size="sm">
          <Plus className="w-4 h-4 mr-1" /> Pedido
        </Button>
      </div>

      <div className="flex gap-2">
        {([
          ["praying", "Em oração"],
          ["answered", "Respondidos"],
          ["all", "Todos"],
        ] as [Tab, string][]).map(([v, label]) => (
          <button
            key={v}
            onClick={() => setTab(v)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
              tab === v ? "bg-primary text-primary-foreground" : "bg-muted/30 text-muted-foreground hover:bg-muted/50"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground text-sm">
          {tab === "answered" ? "Os testemunhos vão aparecer aqui." : "Comece registrando o primeiro pedido."}
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((p) => (
            <div key={p.id} className={cn(
              "p-4 rounded-lg bg-card border border-border space-y-2",
              p.status === "answered" && "border-emerald-500/30 bg-emerald-500/5"
            )}>
              <div className="flex items-start gap-2">
                <button onClick={() => setEditing(p)} className="flex-1 text-left">
                  <div className="flex items-center gap-2 flex-wrap">
                    {p.is_pinned && <Pin className="w-3.5 h-3.5 text-amber-400" />}
                    {p.status === "answered" && <BadgeCheck className="w-3.5 h-3.5 text-emerald-400" />}
                    <span className="font-semibold text-sm text-foreground">{p.title}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-muted/30 text-muted-foreground">
                      {PRAYER_CATEGORIES.find((c) => c.value === p.category)?.label || p.category}
                    </span>
                  </div>
                  {p.description && <p className="text-sm text-muted-foreground mt-1">{p.description}</p>}
                  {p.testimony && (
                    <div className="mt-2 p-2 rounded bg-emerald-500/10 border-l-2 border-emerald-400">
                      <div className="text-xs text-emerald-400 font-semibold mb-1 flex items-center gap-1">
                        <Heart className="w-3 h-3" /> Testemunho
                      </div>
                      <p className="text-sm text-foreground">{p.testimony}</p>
                      {p.answered_at && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {format(parseISO(p.answered_at), "dd MMM yyyy", { locale: ptBR })}
                        </p>
                      )}
                    </div>
                  )}
                </button>
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => update(p.id, { is_pinned: !p.is_pinned } as any)}
                    className="p-1.5 hover:bg-muted/30 rounded"
                    aria-label="Fixar"
                  >
                    <Pin className={cn("w-3.5 h-3.5", p.is_pinned ? "text-amber-400" : "text-muted-foreground")} />
                  </button>
                  <button onClick={() => remove(p.id)} className="p-1.5 hover:bg-destructive/20 rounded" aria-label="Remover">
                    <Trash2 className="w-3.5 h-3.5 text-muted-foreground hover:text-destructive" />
                  </button>
                </div>
              </div>
              {p.status === "praying" && (
                <button
                  onClick={() => {
                    setAnswering(p);
                    setTestimony("");
                  }}
                  className="w-full text-xs py-1.5 rounded bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors font-medium"
                >
                  ✨ Marcar como respondido
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      <PrayerDialog
        open={creating || !!editing}
        onClose={() => {
          setCreating(false);
          setEditing(null);
        }}
        prayer={editing}
        onSave={async (payload) => {
          if (editing) await update(editing.id, payload);
          else await create(payload);
          toast.success(editing ? "Atualizado" : "Pedido registrado");
          setCreating(false);
          setEditing(null);
        }}
      />

      <Dialog open={!!answering} onOpenChange={(o) => !o && setAnswering(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Conte o testemunho</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Como Deus respondeu a essa oração? (opcional)
            </p>
            <Textarea
              placeholder="O Senhor fez..."
              value={testimony}
              onChange={(e) => setTestimony(e.target.value)}
              rows={4}
              maxLength={1000}
            />
            <div className="flex gap-2 justify-end">
              <Button variant="ghost" onClick={() => setAnswering(null)}>Cancelar</Button>
              <Button onClick={handleAnswer} className="bg-emerald-600 hover:bg-emerald-700">
                Confirmar resposta
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const PrayerDialog = ({
  open,
  onClose,
  prayer,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  prayer: RotinaPrayer | null;
  onSave: (payload: Partial<RotinaPrayer>) => Promise<void>;
}) => {
  const [title, setTitle] = useState(prayer?.title || "");
  const [description, setDescription] = useState(prayer?.description || "");
  const [category, setCategory] = useState(prayer?.category || "pessoal");

  useState(() => {
    setTitle(prayer?.title || "");
    setDescription(prayer?.description || "");
    setCategory(prayer?.category || "pessoal");
  });

  const handleSave = async () => {
    if (!title.trim()) {
      toast.error("Título obrigatório");
      return;
    }
    await onSave({
      title: title.trim().slice(0, 200),
      description: description.trim() || null,
      category,
    });
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{prayer ? "Editar pedido" : "Novo pedido de oração"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <Input placeholder="Pedido *" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={200} autoFocus />
          <Textarea placeholder="Detalhes (opcional)" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm">
            {PRAYER_CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
          <div className="flex gap-2 justify-end pt-2">
            <Button variant="ghost" onClick={onClose}>Cancelar</Button>
            <Button onClick={handleSave}>Salvar</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
