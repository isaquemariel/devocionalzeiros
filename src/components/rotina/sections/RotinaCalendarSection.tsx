import { useState, useMemo } from "react";
import { Plus, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useRotinaResource } from "@/hooks/useRotinaData";
import { EVENT_CATEGORIES, getEventCategoryConfig } from "@/components/rotina/constants";
import type { RotinaEvent } from "@/components/rotina/types";
import { format, parseISO, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isSameMonth, addMonths, subMonths, startOfWeek, endOfWeek } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const RotinaCalendarSection = ({ userId }: { userId: string }) => {
  const { data: events, create, update, remove } = useRotinaResource<RotinaEvent>("rotina_calendar_events", userId, {
    orderBy: "start_at",
    ascending: true,
  });
  const [cursor, setCursor] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<Date | null>(new Date());
  const [editing, setEditing] = useState<RotinaEvent | null>(null);
  const [creating, setCreating] = useState(false);

  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(cursor), { weekStartsOn: 0 });
    const end = endOfWeek(endOfMonth(cursor), { weekStartsOn: 0 });
    return eachDayOfInterval({ start, end });
  }, [cursor]);

  const eventsByDay = useMemo(() => {
    const m: Record<string, RotinaEvent[]> = {};
    events.forEach((e) => {
      const k = format(parseISO(e.start_at), "yyyy-MM-dd");
      m[k] = m[k] || [];
      m[k].push(e);
    });
    return m;
  }, [events]);

  const dayEvents = selectedDay ? eventsByDay[format(selectedDay, "yyyy-MM-dd")] || [] : [];

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Calendário</h1>
          <p className="text-sm text-muted-foreground">Sua agenda com propósito.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => setCreating(true)} size="sm">
            <Plus className="w-4 h-4 mr-1" /> Evento
          </Button>
        </div>
      </div>

      <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-400">
        🚧 Sincronização com Google Calendar: <strong>em breve</strong>.
      </div>

      <div className="bg-card border border-border rounded-lg p-3">
        <div className="flex items-center justify-between mb-3">
          <button onClick={() => setCursor(subMonths(cursor, 1))} className="p-1.5 hover:bg-muted/30 rounded">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="font-semibold capitalize">
            {format(cursor, "MMMM yyyy", { locale: ptBR })}
          </div>
          <button onClick={() => setCursor(addMonths(cursor, 1))} className="p-1.5 hover:bg-muted/30 rounded">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-xs text-muted-foreground mb-1">
          {["D", "S", "T", "Q", "Q", "S", "S"].map((d, i) => (<div key={i}>{d}</div>))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days.map((d) => {
            const k = format(d, "yyyy-MM-dd");
            const dayEvts = eventsByDay[k] || [];
            const isSelected = selectedDay && isSameDay(d, selectedDay);
            const inMonth = isSameMonth(d, cursor);
            return (
              <button
                key={k}
                onClick={() => setSelectedDay(d)}
                className={cn(
                  "aspect-square p-1 rounded text-xs flex flex-col items-center justify-start",
                  inMonth ? "text-foreground" : "text-muted-foreground/40",
                  isSelected ? "bg-primary text-primary-foreground" : "hover:bg-muted/30"
                )}
              >
                <span className="font-medium">{format(d, "d")}</span>
                <div className="flex gap-0.5 mt-0.5 flex-wrap justify-center">
                  {dayEvts.slice(0, 3).map((e) => (
                    <span key={e.id} className="w-1 h-1 rounded-full" style={{ background: e.color }} />
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {selectedDay && (
        <div>
          <h2 className="text-sm font-semibold text-foreground mb-2">
            {format(selectedDay, "EEEE, dd 'de' MMMM", { locale: ptBR })}
          </h2>
          {dayEvents.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4">Nenhum evento.</p>
          ) : (
            <div className="space-y-2">
              {dayEvents.map((e) => (
                <div key={e.id} className="p-3 rounded-lg bg-card border border-border flex items-start gap-3">
                  <span className="w-2.5 h-2.5 rounded-full mt-1.5 shrink-0" style={{ background: e.color }} />
                  <button onClick={() => setEditing(e)} className="flex-1 text-left">
                    <div className="font-semibold text-sm">{e.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {e.all_day ? "Dia inteiro" : `${format(parseISO(e.start_at), "HH:mm")} – ${format(parseISO(e.end_at), "HH:mm")}`}
                      {" · "}{getEventCategoryConfig(e.category).label}
                    </div>
                    {e.description && <p className="text-xs text-muted-foreground mt-1">{e.description}</p>}
                  </button>
                  <button onClick={() => remove(e.id)} className="p-1 hover:bg-destructive/20 rounded">
                    <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <EventDialog
        open={creating || !!editing}
        onClose={() => { setCreating(false); setEditing(null); }}
        event={editing}
        defaultDate={selectedDay || new Date()}
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

const EventDialog = ({ open, onClose, event, defaultDate, onSave }: any) => {
  const [title, setTitle] = useState(event?.title || "");
  const [description, setDescription] = useState(event?.description || "");
  const [category, setCategory] = useState(event?.category || "pessoal");
  const [date, setDate] = useState(event ? format(parseISO(event.start_at), "yyyy-MM-dd") : format(defaultDate, "yyyy-MM-dd"));
  const [startTime, setStartTime] = useState(event && !event.all_day ? format(parseISO(event.start_at), "HH:mm") : "09:00");
  const [endTime, setEndTime] = useState(event && !event.all_day ? format(parseISO(event.end_at), "HH:mm") : "10:00");
  const [allDay, setAllDay] = useState(event?.all_day || false);

  useState(() => {
    setTitle(event?.title || "");
    setDescription(event?.description || "");
    setCategory(event?.category || "pessoal");
    setDate(event ? format(parseISO(event.start_at), "yyyy-MM-dd") : format(defaultDate, "yyyy-MM-dd"));
    setStartTime(event && !event.all_day ? format(parseISO(event.start_at), "HH:mm") : "09:00");
    setEndTime(event && !event.all_day ? format(parseISO(event.end_at), "HH:mm") : "10:00");
    setAllDay(event?.all_day || false);
  });

  const handleSave = async () => {
    if (!title.trim()) {
      toast.error("Título obrigatório");
      return;
    }
    const cat = getEventCategoryConfig(category);
    const start = allDay ? `${date}T00:00:00` : `${date}T${startTime}:00`;
    const end = allDay ? `${date}T23:59:00` : `${date}T${endTime}:00`;
    await onSave({
      title: title.trim().slice(0, 200),
      description: description.trim() || null,
      category,
      color: cat.color,
      start_at: new Date(start).toISOString(),
      end_at: new Date(end).toISOString(),
      all_day: allDay,
    });
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{event ? "Editar evento" : "Novo evento"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <Input placeholder="Título *" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={200} autoFocus />
          <Textarea placeholder="Descrição (opcional)" value={description} onChange={(e) => setDescription(e.target.value)} rows={2} />
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm">
            {EVENT_CATEGORIES.map((c) => (<option key={c.value} value={c.value}>{c.label}</option>))}
          </select>
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={allDay} onChange={(e) => setAllDay(e.target.checked)} />
            Dia inteiro
          </label>
          {!allDay && (
            <div className="grid grid-cols-2 gap-2">
              <Input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
              <Input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
            </div>
          )}
          <div className="flex gap-2 justify-end pt-2">
            <Button variant="ghost" onClick={onClose}>Cancelar</Button>
            <Button onClick={handleSave}>Salvar</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
