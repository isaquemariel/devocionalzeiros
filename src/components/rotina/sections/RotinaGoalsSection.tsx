import { useState } from "react";
import { Plus, Trash2, Target as TargetIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useRotinaResource } from "@/hooks/useRotinaData";
import { GOAL_AREAS, getGoalAreaConfig } from "@/components/rotina/constants";
import type { RotinaGoal } from "@/components/rotina/types";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { toast } from "sonner";

export const RotinaGoalsSection = ({ userId }: { userId: string }) => {
  const { data: goals, create, update, remove } = useRotinaResource<RotinaGoal>("rotina_goals", userId);
  const [editing, setEditing] = useState<RotinaGoal | null>(null);
  const [creating, setCreating] = useState(false);

  const radarData = GOAL_AREAS.map((a) => {
    const areaGoals = goals.filter((g) => g.area === a.value);
    const avg = areaGoals.length ? areaGoals.reduce((s, g) => s + g.current_score, 0) / areaGoals.length : 0;
    return { area: a.label, score: Math.round(avg * 10) / 10 };
  });

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Metas</h1>
          <p className="text-sm text-muted-foreground">Roda da Vida Cristã.</p>
        </div>
        <Button onClick={() => setCreating(true)} size="sm">
          <Plus className="w-4 h-4 mr-1" /> Meta
        </Button>
      </div>

      {goals.length > 0 && (
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="text-sm font-semibold mb-2 text-center">Sua Roda da Vida</div>
          <div className="h-72">
            <ResponsiveContainer>
              <RadarChart data={radarData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="area" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                <PolarRadiusAxis angle={90} domain={[0, 10]} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} />
                <Radar name="Score" dataKey="score" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {goals.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground text-sm">
            <TargetIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
            Defina sua primeira meta com clareza.
          </div>
        ) : (
          goals.map((g) => {
            const area = getGoalAreaConfig(g.area);
            return (
              <div key={g.id} className="p-4 rounded-lg bg-card border border-border">
                <div className="flex items-start justify-between mb-2">
                  <button onClick={() => setEditing(g)} className="flex-1 text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2 h-2 rounded-full" style={{ background: area.color }} />
                      <span className="text-xs text-muted-foreground">{area.label}</span>
                      {g.target_date && <span className="text-xs text-muted-foreground">· até {format(parseISO(g.target_date), "dd MMM yyyy", { locale: ptBR })}</span>}
                    </div>
                    <div className="font-semibold text-sm">{g.title}</div>
                    {g.description && <p className="text-xs text-muted-foreground mt-1">{g.description}</p>}
                  </button>
                  <button onClick={() => remove(g.id)} className="p-1 hover:bg-destructive/20 rounded">
                    <Trash2 className="w-3.5 h-3.5 text-muted-foreground hover:text-destructive" />
                  </button>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Progresso</span>
                    <span className="font-semibold">{g.progress_percent}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={g.progress_percent}
                    onChange={(e) => update(g.id, { progress_percent: Number(e.target.value) } as any)}
                    className="w-full"
                  />
                  <div className="flex items-center justify-between text-xs mt-2">
                    <span className="text-muted-foreground">Score (0-10)</span>
                    <span className="font-semibold">{g.current_score}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={g.current_score}
                    onChange={(e) => update(g.id, { current_score: Number(e.target.value) } as any)}
                    className="w-full"
                  />
                </div>
              </div>
            );
          })
        )}
      </div>

      <GoalDialog
        open={creating || !!editing}
        onClose={() => { setCreating(false); setEditing(null); }}
        goal={editing}
        onSave={async (payload) => {
          if (editing) await update(editing.id, payload);
          else await create(payload);
          toast.success("Salvo");
          setCreating(false);
          setEditing(null);
        }}
      />
    </div>
  );
};

const GoalDialog = ({ open, onClose, goal, onSave }: any) => {
  const [title, setTitle] = useState(goal?.title || "");
  const [description, setDescription] = useState(goal?.description || "");
  const [area, setArea] = useState(goal?.area || "espiritual");
  const [targetDate, setTargetDate] = useState(goal?.target_date || "");

  useState(() => {
    setTitle(goal?.title || "");
    setDescription(goal?.description || "");
    setArea(goal?.area || "espiritual");
    setTargetDate(goal?.target_date || "");
  });

  const handleSave = async () => {
    if (!title.trim()) { toast.error("Título obrigatório"); return; }
    await onSave({
      title: title.trim().slice(0, 200),
      description: description.trim() || null,
      area,
      target_date: targetDate || null,
    });
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader><DialogTitle>{goal ? "Editar meta" : "Nova meta"}</DialogTitle></DialogHeader>
        <div className="space-y-3">
          <Input placeholder="O que você quer alcançar? *" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={200} autoFocus />
          <Textarea placeholder="Descreva (opcional)" value={description} onChange={(e) => setDescription(e.target.value)} rows={2} />
          <select value={area} onChange={(e) => setArea(e.target.value)} className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm">
            {GOAL_AREAS.map((a) => (<option key={a.value} value={a.value}>{a.label}</option>))}
          </select>
          <Input type="date" value={targetDate} onChange={(e) => setTargetDate(e.target.value)} />
          <div className="flex gap-2 justify-end pt-2">
            <Button variant="ghost" onClick={onClose}>Cancelar</Button>
            <Button onClick={handleSave}>Salvar</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
