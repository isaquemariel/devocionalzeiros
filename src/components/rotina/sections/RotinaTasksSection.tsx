import { useState } from "react";
import { Plus, Calendar as CalIcon, Trash2, CheckCircle2, Circle, BookOpen } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useRotinaResource } from "@/hooks/useRotinaData";
import { AREAS, TASK_PRIORITIES, getAreaConfig } from "@/components/rotina/constants";
import type { RotinaTask } from "@/components/rotina/types";
import { cn } from "@/lib/utils";
import { format, isToday, isPast, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";

type View = "today" | "next7" | "overdue" | "byArea" | "done";

export const RotinaTasksSection = ({ userId }: { userId: string }) => {
  const { data: tasks, create, update, remove } = useRotinaResource<RotinaTask>(
    "rotina_tasks",
    userId,
    { orderBy: "due_date", ascending: true }
  );
  const [view, setView] = useState<View>("today");
  const [quickTitle, setQuickTitle] = useState("");
  const [editing, setEditing] = useState<RotinaTask | null>(null);
  const [creatingNew, setCreatingNew] = useState(false);

  const today = format(new Date(), "yyyy-MM-dd");

  const filtered = tasks.filter((t) => {
    if (view === "done") return t.status === "done";
    if (t.status === "done") return false;
    if (view === "today") return t.due_date === today || (!t.due_date && t.status !== "done");
    if (view === "next7") {
      if (!t.due_date) return false;
      const d = parseISO(t.due_date);
      const diff = (d.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24);
      return diff >= 0 && diff <= 7;
    }
    if (view === "overdue") return t.due_date && isPast(parseISO(t.due_date)) && !isToday(parseISO(t.due_date));
    return true;
  });

  const grouped = view === "byArea"
    ? AREAS.reduce<Record<string, RotinaTask[]>>((acc, a) => {
        acc[a.value] = filtered.filter((t) => t.area === a.value);
        return acc;
      }, {})
    : null;

  const handleQuickAdd = async () => {
    if (!quickTitle.trim()) return;
    await create({ title: quickTitle.trim(), due_date: today, area: "pessoal", priority: "media", status: "todo" });
    setQuickTitle("");
    toast.success("Tarefa criada");
  };

  const toggleStatus = async (t: RotinaTask) => {
    const next = t.status === "done" ? "todo" : "done";
    await update(t.id, { status: next, completed_at: next === "done" ? new Date().toISOString() : null } as any);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Tarefas</h1>
        <p className="text-sm text-muted-foreground">Organize suas prioridades com propósito.</p>
      </div>

      <div className="flex gap-2">
        <Input
          value={quickTitle}
          onChange={(e) => setQuickTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleQuickAdd()}
          placeholder="Adicionar tarefa rápida pra hoje..."
          className="flex-1"
        />
        <Button onClick={() => setCreatingNew(true)} variant="outline" size="icon">
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {([
          ["today", "Hoje"],
          ["next7", "7 dias"],
          ["overdue", "Atrasadas"],
          ["byArea", "Por área"],
          ["done", "Concluídas"],
        ] as [View, string][]).map(([v, label]) => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors",
              view === v ? "bg-primary text-primary-foreground" : "bg-muted/30 text-muted-foreground hover:bg-muted/50"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {grouped ? (
        <div className="space-y-4">
          {AREAS.map((a) => {
            const items = grouped[a.value] || [];
            if (items.length === 0) return null;
            return (
              <div key={a.value}>
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: a.color }} />
                  {a.label} <span className="text-muted-foreground/60">({items.length})</span>
                </div>
                <div className="space-y-1.5">
                  {items.map((t) => (
                    <TaskRow key={t.id} task={t} onToggle={() => toggleStatus(t)} onEdit={() => setEditing(t)} onDelete={() => remove(t.id)} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-1.5">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground text-sm">
              Nenhuma tarefa por aqui. Que tal começar agora?
            </div>
          ) : (
            filtered.map((t) => (
              <TaskRow key={t.id} task={t} onToggle={() => toggleStatus(t)} onEdit={() => setEditing(t)} onDelete={() => remove(t.id)} />
            ))
          )}
        </div>
      )}

      <TaskDialog
        open={creatingNew || !!editing}
        onClose={() => {
          setCreatingNew(false);
          setEditing(null);
        }}
        task={editing}
        onSave={async (payload) => {
          if (editing) await update(editing.id, payload);
          else await create(payload);
          toast.success(editing ? "Atualizada" : "Criada");
          setCreatingNew(false);
          setEditing(null);
        }}
      />
    </div>
  );
};

const TaskRow = ({
  task,
  onToggle,
  onEdit,
  onDelete,
}: {
  task: RotinaTask;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) => {
  const area = getAreaConfig(task.area);
  const isOverdue = task.due_date && isPast(parseISO(task.due_date)) && !isToday(parseISO(task.due_date)) && task.status !== "done";
  return (
    <div className="group flex items-center gap-3 p-3 rounded-lg bg-card border border-border hover:border-primary/30 transition-colors">
      <button onClick={onToggle} className="shrink-0">
        {task.status === "done" ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
        ) : (
          <Circle className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
        )}
      </button>
      <button onClick={onEdit} className="flex-1 text-left min-w-0">
        <div className={cn("text-sm font-medium truncate", task.status === "done" && "line-through text-muted-foreground")}>
          {task.title}
        </div>
        <div className="flex items-center gap-2 mt-0.5 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: area.color }} />
            {area.label}
          </span>
          {task.due_date && (
            <span className={cn("inline-flex items-center gap-1", isOverdue && "text-red-400")}>
              <CalIcon className="w-3 h-3" />
              {format(parseISO(task.due_date), "dd MMM", { locale: ptBR })}
            </span>
          )}
          {task.priority === "alta" && <span className="text-red-400 font-semibold">!</span>}
          {task.anchor_verse && (
            <span className="inline-flex items-center gap-1 text-primary/80">
              <BookOpen className="w-3 h-3" />
              {task.anchor_verse}
            </span>
          )}
        </div>
      </button>
      <button onClick={onDelete} className="opacity-0 group-hover:opacity-100 p-1 hover:bg-destructive/20 rounded transition-all">
        <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive" />
      </button>
    </div>
  );
};

const TaskDialog = ({
  open,
  onClose,
  task,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  task: RotinaTask | null;
  onSave: (payload: Partial<RotinaTask>) => Promise<void>;
}) => {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [area, setArea] = useState(task?.area || "pessoal");
  const [priority, setPriority] = useState(task?.priority || "media");
  const [dueDate, setDueDate] = useState(task?.due_date || format(new Date(), "yyyy-MM-dd"));
  const [anchorVerse, setAnchorVerse] = useState(task?.anchor_verse || "");

  // Reset form when opening fresh / switching task
  useState(() => {
    setTitle(task?.title || "");
    setDescription(task?.description || "");
    setArea(task?.area || "pessoal");
    setPriority(task?.priority || "media");
    setDueDate(task?.due_date || format(new Date(), "yyyy-MM-dd"));
    setAnchorVerse(task?.anchor_verse || "");
  });

  const handleSave = async () => {
    if (!title.trim()) {
      toast.error("Título obrigatório");
      return;
    }
    await onSave({
      title: title.trim().slice(0, 200),
      description: description.trim() || null,
      area,
      priority: priority as any,
      due_date: dueDate || null,
      anchor_verse: anchorVerse.trim() || null,
    });
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{task ? "Editar tarefa" : "Nova tarefa"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <Input placeholder="Título *" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={200} autoFocus />
          <Textarea placeholder="Detalhes (opcional)" value={description} onChange={(e) => setDescription(e.target.value)} rows={2} />
          <div className="grid grid-cols-2 gap-2">
            <select value={area} onChange={(e) => setArea(e.target.value)} className="bg-background border border-border rounded-md px-3 py-2 text-sm">
              {AREAS.map((a) => (
                <option key={a.value} value={a.value}>{a.label}</option>
              ))}
            </select>
            <select value={priority} onChange={(e) => setPriority(e.target.value as any)} className="bg-background border border-border rounded-md px-3 py-2 text-sm">
              {TASK_PRIORITIES.map((p) => (
                <option key={p.value} value={p.value}>{p.label}</option>
              ))}
            </select>
          </div>
          <Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
          <Input
            placeholder="Versículo âncora (ex: Sl 1:1-3)"
            value={anchorVerse}
            onChange={(e) => setAnchorVerse(e.target.value)}
            maxLength={50}
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
