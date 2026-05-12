import { useState, useMemo } from "react";
import { Plus, Trash2, Flame } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRotinaResource } from "@/hooks/useRotinaData";
import { SUGGESTED_HABITS, HABIT_ICONS } from "@/components/rotina/constants";
import type { RotinaHabit, RotinaHabitLog } from "@/components/rotina/types";
import { format, subDays, parseISO, differenceInDays } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const RotinaHabitsSection = ({ userId }: { userId: string }) => {
  const { data: habits, create, remove } = useRotinaResource<RotinaHabit>("rotina_habits", userId);
  const { data: logs, create: createLog, remove: removeLog } = useRotinaResource<RotinaHabitLog>("rotina_habit_logs", userId, {
    orderBy: "log_date", ascending: false,
  });
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState("");

  const today = format(new Date(), "yyyy-MM-dd");
  const last30 = useMemo(() => Array.from({ length: 30 }, (_, i) => format(subDays(new Date(), 29 - i), "yyyy-MM-dd")), []);

  const isLogged = (habitId: string, date: string) => logs.find((l) => l.habit_id === habitId && l.log_date === date);

  const toggleToday = async (h: RotinaHabit) => {
    const existing = isLogged(h.id, today);
    if (existing) {
      await removeLog(existing.id);
    } else {
      await createLog({ habit_id: h.id, log_date: today } as any);
    }
  };

  const getStreak = (habitId: string) => {
    const habitLogs = logs.filter((l) => l.habit_id === habitId).sort((a, b) => b.log_date.localeCompare(a.log_date));
    if (habitLogs.length === 0) return 0;
    let streak = 0;
    let cursor = new Date();
    for (const log of habitLogs) {
      const diff = differenceInDays(cursor, parseISO(log.log_date));
      if (diff === 0 || diff === 1) {
        streak++;
        cursor = parseISO(log.log_date);
      } else break;
    }
    return streak;
  };

  const addSuggested = async (s: typeof SUGGESTED_HABITS[number]) => {
    await create({ name: s.name, icon: s.icon, color: s.color, frequency_type: "daily" } as any);
    toast.success("Hábito criado");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Hábitos</h1>
          <p className="text-sm text-muted-foreground">Pequenos rituais, grande transformação.</p>
        </div>
        <Button onClick={() => setCreating(true)} size="sm">
          <Plus className="w-4 h-4 mr-1" /> Hábito
        </Button>
      </div>

      {habits.length === 0 && (
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">Comece com um destes:</p>
          <div className="flex gap-2 flex-wrap">
            {SUGGESTED_HABITS.map((s) => (
              <button key={s.name} onClick={() => addSuggested(s)} className="px-3 py-1.5 rounded-full bg-muted/30 hover:bg-muted/50 text-xs">
                + {s.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-3">
        {habits.map((h) => {
          const Icon = HABIT_ICONS[h.icon] || HABIT_ICONS.Sparkles;
          const streak = getStreak(h.id);
          const doneToday = !!isLogged(h.id, today);
          return (
            <div key={h.id} className="p-4 rounded-lg bg-card border border-border">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${h.color}20`, color: h.color }}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm">{h.name}</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Flame className="w-3 h-3 text-orange-400" />
                    {streak} {streak === 1 ? "dia" : "dias"} seguidos
                  </div>
                </div>
                <button
                  onClick={() => toggleToday(h)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                    doneToday ? "bg-emerald-600 text-white" : "bg-muted/30 text-muted-foreground hover:bg-muted/50"
                  )}
                >
                  {doneToday ? "✓ Feito hoje" : "Marcar"}
                </button>
                <button onClick={() => remove(h.id)} className="p-1.5 hover:bg-destructive/20 rounded">
                  <Trash2 className="w-3.5 h-3.5 text-muted-foreground hover:text-destructive" />
                </button>
              </div>
              <div className="flex gap-1">
                {last30.map((d) => {
                  const done = isLogged(h.id, d);
                  return (
                    <div key={d} className="flex-1 h-3 rounded-sm" style={{ background: done ? h.color : "hsl(var(--muted) / 0.3)" }} title={d} />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <Dialog open={creating} onOpenChange={(o) => !o && setCreating(false)}>
        <DialogContent className="max-w-sm">
          <DialogHeader><DialogTitle>Novo hábito</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <Input placeholder="Nome (ex: Ler 1 capítulo)" value={name} onChange={(e) => setName(e.target.value)} maxLength={100} autoFocus />
            <div className="flex gap-2 justify-end">
              <Button variant="ghost" onClick={() => setCreating(false)}>Cancelar</Button>
              <Button onClick={async () => {
                if (!name.trim()) { toast.error("Nome obrigatório"); return; }
                await create({ name: name.trim(), icon: "Sparkles", color: "#8b5cf6", frequency_type: "daily" } as any);
                setName("");
                setCreating(false);
                toast.success("Hábito criado");
              }}>Criar</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
