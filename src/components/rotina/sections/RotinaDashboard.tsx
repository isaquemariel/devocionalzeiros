import { useEffect, useState } from "react";
import { Sun, ListChecks, HandHeart, Calendar, Pencil, Target, BookOpenCheck, Lock, ChevronRight, Hexagon } from "lucide-react";
import { useRotinaResource } from "@/hooks/useRotinaData";
import type { RotinaTask, RotinaPrayer, RotinaEvent } from "@/components/rotina/types";
import { format, isToday, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { RotinaSection } from "@/pages/Rotina";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

interface Props {
  userId: string;
  onSectionChange: (s: RotinaSection) => void;
  canAccessAll: boolean;
}

export const RotinaDashboard = ({ userId, onSectionChange, canAccessAll }: Props) => {
  const { user } = useAuth();
  const [firstName, setFirstName] = useState("");
  const { data: tasks } = useRotinaResource<RotinaTask>("rotina_tasks", userId);
  const { data: prayers } = useRotinaResource<RotinaPrayer>("rotina_prayers", userId);
  const { data: events } = useRotinaResource<RotinaEvent>("rotina_calendar_events", userId, {
    orderBy: "start_at",
    ascending: true,
  });

  useEffect(() => {
    (async () => {
      if (!user?.id) return;
      const { data } = await supabase.from("profiles").select("full_name").eq("user_id", user.id).maybeSingle();
      if (data?.full_name) setFirstName(data.full_name.split(" ")[0]);
    })();
  }, [user?.id]);

  const today = format(new Date(), "yyyy-MM-dd");
  const todayTasks = tasks.filter((t) => (t.due_date === today || !t.due_date) && t.status !== "done").slice(0, 5);
  const doneToday = tasks.filter((t) => t.status === "done" && t.completed_at && isToday(parseISO(t.completed_at))).length;
  const activePrayers = prayers.filter((p) => p.status === "praying").slice(0, 3);
  const upcomingEvents = events
    .filter((e) => new Date(e.start_at) >= new Date())
    .slice(0, 3);

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return "Bom dia";
    if (h < 18) return "Boa tarde";
    return "Boa noite";
  })();

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      <div>
        <p className="text-xs text-muted-foreground uppercase tracking-wider">
          {format(new Date(), "EEEE, dd 'de' MMMM", { locale: ptBR })}
        </p>
        <h1 className="text-3xl font-display font-bold text-foreground mt-1">
          {greeting}{firstName ? `, ${firstName}` : ""}.
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          "Tudo tem o seu tempo determinado." — Eclesiastes 3:1
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard icon={ListChecks} label="Hoje" value={`${doneToday}/${doneToday + todayTasks.length}`} hint="tarefas" onClick={() => onSectionChange("tasks")} />
        <StatCard icon={HandHeart} label="Orações" value={String(activePrayers.length)} hint="ativas" onClick={() => onSectionChange("prayers")} />
        <StatCard icon={Calendar} label="Próximos" value={String(upcomingEvents.length)} hint="eventos" onClick={() => onSectionChange("calendar")} locked={!canAccessAll} />
        <StatCard icon={Hexagon} label="Hábitos" value="—" hint="hoje" onClick={() => onSectionChange("habits")} locked={!canAccessAll} />
      </div>

      <Card title="Tarefas de hoje" icon={ListChecks} action="Ver todas" onAction={() => onSectionChange("tasks")}>
        {todayTasks.length === 0 ? (
          <EmptyHint text="Nenhuma tarefa pra hoje. Capricha! 🙌" />
        ) : (
          <div className="space-y-1.5">
            {todayTasks.map((t) => (
              <div key={t.id} className="flex items-center gap-2 text-sm py-1.5 px-2 rounded hover:bg-muted/20">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="flex-1 truncate">{t.title}</span>
                {t.priority === "alta" && <span className="text-red-400 text-xs font-bold">!</span>}
              </div>
            ))}
          </div>
        )}
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        <Card title="Em oração" icon={HandHeart} action="Lista" onAction={() => onSectionChange("prayers")}>
          {activePrayers.length === 0 ? (
            <EmptyHint text="Comece pela primeira oração." />
          ) : (
            <div className="space-y-1.5">
              {activePrayers.map((p) => (
                <div key={p.id} className="text-sm py-1 truncate">• {p.title}</div>
              ))}
            </div>
          )}
        </Card>

        <Card title="Próximos compromissos" icon={Calendar} action="Calendário" onAction={() => onSectionChange("calendar")} locked={!canAccessAll}>
          {!canAccessAll ? (
            <EmptyHint text="Disponível no Gold." />
          ) : upcomingEvents.length === 0 ? (
            <EmptyHint text="Sua agenda está livre." />
          ) : (
            <div className="space-y-1.5">
              {upcomingEvents.map((e) => (
                <div key={e.id} className="flex items-center gap-2 text-sm py-1">
                  <span className="w-2 h-2 rounded-full" style={{ background: e.color }} />
                  <span className="flex-1 truncate">{e.title}</span>
                  <span className="text-xs text-muted-foreground shrink-0">
                    {format(parseISO(e.start_at), "dd MMM HH:mm", { locale: ptBR })}
                  </span>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <QuickLink icon={Pencil} label="Notas" onClick={() => onSectionChange("notes")} locked={!canAccessAll} />
        <QuickLink icon={Target} label="Metas" onClick={() => onSectionChange("goals")} locked={!canAccessAll} />
        <QuickLink icon={Hexagon} label="Hábitos" onClick={() => onSectionChange("habits")} locked={!canAccessAll} />
        <QuickLink icon={BookOpenCheck} label="Reflexão" onClick={() => onSectionChange("review")} locked={!canAccessAll} />
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value, hint, onClick, locked }: any) => (
  <button onClick={onClick} className="p-3 rounded-lg bg-card border border-border text-left hover:border-primary/30 transition-colors relative">
    {locked && <Lock className="w-3 h-3 text-amber-400 absolute top-2 right-2" />}
    <Icon className="w-4 h-4 text-primary mb-1.5" />
    <div className="text-xl font-bold text-foreground">{value}</div>
    <div className="text-xs text-muted-foreground">{label} · <span className="text-muted-foreground/60">{hint}</span></div>
  </button>
);

const Card = ({ title, icon: Icon, action, onAction, locked, children }: any) => (
  <div className="p-4 rounded-lg bg-card border border-border">
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
        <Icon className="w-4 h-4 text-primary" />
        {title}
        {locked && <Lock className="w-3 h-3 text-amber-400" />}
      </div>
      {action && (
        <button onClick={onAction} className="text-xs text-primary hover:underline flex items-center gap-0.5">
          {action} <ChevronRight className="w-3 h-3" />
        </button>
      )}
    </div>
    {children}
  </div>
);

const EmptyHint = ({ text }: { text: string }) => (
  <p className="text-xs text-muted-foreground py-2">{text}</p>
);

const QuickLink = ({ icon: Icon, label, onClick, locked }: any) => (
  <button onClick={onClick} className="p-3 rounded-lg bg-card border border-border hover:border-primary/30 transition-colors flex flex-col items-center gap-1 relative">
    {locked && <Lock className="w-3 h-3 text-amber-400 absolute top-1.5 right-1.5" />}
    <Icon className="w-5 h-5 text-primary" />
    <span className="text-xs font-medium">{label}</span>
  </button>
);
