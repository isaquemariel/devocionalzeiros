import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Bell, Plus, Send, Trash2, Loader2, Clock, Repeat, Zap } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Announcement {
  id: string;
  title: string;
  message: string;
  url: string | null;
  is_active: boolean;
  schedule_type: "now" | "once" | "recurring";
  scheduled_at: string | null;
  recurrence_time_brt: string | null;
  recurrence_days: number[] | null;
  next_run_at: string | null;
  last_sent_at: string | null;
  send_count: number;
  created_at: string;
}

const DAY_LABELS = ["D", "S", "T", "Q", "Q", "S", "S"];

// Convert BRT "HH:MM" + days to next ISO UTC
function computeNextRun(timeBrt: string, days: number[] | null): string {
  const [hh, mm] = timeBrt.split(":").map(Number);
  const nowUtc = new Date();
  const brtNow = new Date(nowUtc.getTime() - 3 * 60 * 60 * 1000);
  for (let i = 0; i < 14; i++) {
    const c = new Date(brtNow);
    c.setUTCDate(brtNow.getUTCDate() + i);
    c.setUTCHours(hh, mm, 0, 0);
    const dow = c.getUTCDay();
    const dayOk = !days || days.length === 0 || days.includes(dow);
    const utc = new Date(c.getTime() + 3 * 60 * 60 * 1000);
    if (dayOk && utc.getTime() > nowUtc.getTime()) return utc.toISOString();
  }
  return new Date(nowUtc.getTime() + 86400000).toISOString();
}

export const AdminAnnouncementsCard = () => {
  const [items, setItems] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [sendingId, setSendingId] = useState<string | null>(null);
  const [testingPush, setTestingPush] = useState(false);

  // Diagnóstico: dispara um push de teste só para o próprio admin e mostra o
  // resultado exato do FCM (útil para descobrir por que os pushes não chegam).
  const handleTestPush = useCallback(async () => {
    setTestingPush(true);
    try {
      const { data, error } = await supabase.functions.invoke("test-native-push", { body: {} });
      if (error) {
        toast.error(`Falha ao chamar o teste: ${error.message}`);
        console.error("test-native-push error", error);
        return;
      }
      console.log("test-native-push result:", data);
      if (data?.ok) {
        toast.success(`✅ FCM aceitou (projeto Firebase: ${data.project_id}). A notificação deve chegar no seu aparelho em instantes.`);
      } else if (data?.stage === "fcm_error" || data?.resultados) {
        const oks = (data.resultados || []).filter((r: any) => r.ok).length;
        const total = (data.resultados || []).length;
        const firstErr = data?.resultados?.find((r: any) => !r.ok)?.response || "";
        toast.error(
          `❌ Projeto Firebase do backend: ${data.project_id} — ${oks}/${total} tokens OK. ` +
          `Erro: ${firstErr}`.slice(0, 300),
          { duration: 20000 }
        );
      } else {
        toast.error(`❌ Falhou em "${data?.stage}": ${data?.error || "erro desconhecido"}`, { duration: 15000 });
      }
    } catch (e: any) {
      toast.error(`Erro: ${e?.message ?? e}`);
    } finally {
      setTestingPush(false);
    }
  }, []);

  // Form
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [url, setUrl] = useState("");
  const [scheduleType, setScheduleType] = useState<"now" | "once" | "recurring">("now");
  const [scheduledDate, setScheduledDate] = useState(""); // yyyy-MM-ddTHH:mm
  const [recTime, setRecTime] = useState("09:00");
  const [recDays, setRecDays] = useState<number[]>([]);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("admin_push_announcements")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast.error("Erro ao carregar avisos");
    } else {
      setItems((data ?? []) as Announcement[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const reset = () => {
    setTitle("");
    setMessage("");
    setUrl("");
    setScheduleType("now");
    setScheduledDate("");
    setRecTime("09:00");
    setRecDays([]);
  };

  const handleSave = async () => {
    if (!title.trim() || !message.trim()) {
      toast.error("Preencha título e mensagem");
      return;
    }
    setSaving(true);
    try {
      const payload: any = {
        title: title.trim(),
        message: message.trim(),
        url: url.trim() || null,
        schedule_type: scheduleType,
        is_active: true,
      };

      if (scheduleType === "once") {
        if (!scheduledDate) {
          toast.error("Defina data e hora");
          setSaving(false);
          return;
        }
        // datetime-local is in user's local time; assume admin types BRT
        const [d, t] = scheduledDate.split("T");
        const [yy, mo, dd] = d.split("-").map(Number);
        const [hh, mm] = t.split(":").map(Number);
        const brtDate = new Date(Date.UTC(yy, mo - 1, dd, hh, mm));
        const utcDate = new Date(brtDate.getTime() + 3 * 3600 * 1000);
        payload.scheduled_at = utcDate.toISOString();
        payload.next_run_at = utcDate.toISOString();
      } else if (scheduleType === "recurring") {
        payload.recurrence_time_brt = recTime;
        payload.recurrence_days = recDays.length > 0 ? recDays : null;
        payload.next_run_at = computeNextRun(recTime, recDays.length ? recDays : null);
      }

      const { data: inserted, error } = await supabase
        .from("admin_push_announcements")
        .insert(payload)
        .select()
        .single();
      if (error) throw error;

      // If "now", trigger broadcast immediately
      if (scheduleType === "now" && inserted) {
        const { error: fnErr } = await supabase.functions.invoke("admin-broadcast-push", {
          body: { announcement_id: inserted.id },
        });
        if (fnErr) throw fnErr;
        // Also create in-app notifications for every user
        await supabase.rpc("broadcast_admin_notification" as any, {
          p_title: inserted.title,
          p_body: inserted.message,
          p_link: inserted.url || "/home",
        });
        // Deactivate one-shot
        await supabase
          .from("admin_push_announcements")
          .update({ is_active: false })
          .eq("id", inserted.id);
        toast.success("Aviso enviado para todos os usuários!");
      } else {
        toast.success("Aviso agendado!");
      }

      setOpen(false);
      reset();
      load();
    } catch (e: any) {
      console.error(e);
      toast.error("Erro ao salvar aviso");
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (id: string, value: boolean) => {
    const { error } = await supabase
      .from("admin_push_announcements")
      .update({ is_active: value })
      .eq("id", id);
    if (error) toast.error("Erro ao atualizar");
    else {
      toast.success(value ? "Ativado" : "Desativado");
      load();
    }
  };

  const sendNow = async (id: string) => {
    setSendingId(id);
    try {
      const { error } = await supabase.functions.invoke("admin-broadcast-push", {
        body: { announcement_id: id },
      });
      if (error) throw error;
      const item = items.find((i) => i.id === id);
      if (item) {
        await supabase.rpc("broadcast_admin_notification" as any, {
          p_title: item.title,
          p_body: item.message,
          p_link: item.url || "/home",
        });
      }
      toast.success("Aviso enviado!");
      load();
    } catch (e) {
      toast.error("Erro ao enviar");
    } finally {
      setSendingId(null);
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Apagar este aviso?")) return;
    const { error } = await supabase.from("admin_push_announcements").delete().eq("id", id);
    if (error) toast.error("Erro ao apagar");
    else {
      toast.success("Removido");
      load();
    }
  };

  const toggleDay = (d: number) => {
    setRecDays((prev) => (prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d].sort()));
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg flex items-center gap-2">
          <Bell className="w-5 h-5 text-amber-500" />
          Avisos & Notificações Push
        </CardTitle>
        <div className="flex items-center gap-2">
        <Button size="sm" variant="outline" className="gap-2" onClick={handleTestPush} disabled={testingPush}>
          {testingPush ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
          Testar no meu aparelho
        </Button>
        <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) reset(); }}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              Novo Aviso
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Criar Aviso Push</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Título</label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: Novo devocional disponível 🙏"
                  maxLength={80}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Mensagem</label>
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Texto que aparecerá na notificação"
                  maxLength={200}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Link interno (opcional)</label>
                <Input
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="/devocional"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Quando enviar?</label>
                <Select value={scheduleType} onValueChange={(v: any) => setScheduleType(v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="now">🚀 Agora (envio imediato)</SelectItem>
                    <SelectItem value="once">📅 Data/hora específica</SelectItem>
                    <SelectItem value="recurring">🔁 Recorrente (diário/semanal)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {scheduleType === "once" && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Data e hora (Brasília)</label>
                  <Input
                    type="datetime-local"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                  />
                </div>
              )}

              {scheduleType === "recurring" && (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Hora (Brasília)</label>
                    <Input
                      type="time"
                      value={recTime}
                      onChange={(e) => setRecTime(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Dias da semana <span className="text-muted-foreground text-xs">(vazio = todos)</span>
                    </label>
                    <div className="flex gap-1">
                      {DAY_LABELS.map((lbl, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => toggleDay(idx)}
                          className={`w-9 h-9 rounded-full text-xs font-bold border transition ${
                            recDays.includes(idx)
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-background border-border"
                          }`}
                        >
                          {lbl}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <Button onClick={handleSave} disabled={saving} className="w-full">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Salvar"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-6">
            <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
          </div>
        ) : items.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-6">
            Nenhum aviso criado. Crie um para enviar push para todos os usuários inscritos.
          </p>
        ) : (
          <div className="space-y-2">
            {items.map((it) => {
              const typeIcon =
                it.schedule_type === "recurring" ? <Repeat className="w-3 h-3" /> :
                it.schedule_type === "once" ? <Clock className="w-3 h-3" /> :
                <Zap className="w-3 h-3" />;
              return (
                <div
                  key={it.id}
                  className="flex items-start justify-between gap-3 p-3 rounded-lg border bg-card"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-medium text-sm truncate">{it.title}</p>
                      <Badge variant="outline" className="gap-1 text-[10px]">
                        {typeIcon}
                        {it.schedule_type === "recurring" ? "Recorrente" : it.schedule_type === "once" ? "Agendado" : "Imediato"}
                      </Badge>
                      {it.send_count > 0 && (
                        <Badge variant="secondary" className="text-[10px]">
                          {it.send_count}× enviado
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{it.message}</p>
                    <div className="flex flex-wrap gap-3 mt-1.5 text-[11px] text-muted-foreground">
                      {it.recurrence_time_brt && (
                        <span>⏰ {it.recurrence_time_brt} BRT{
                          it.recurrence_days?.length ? ` · ${it.recurrence_days.map(d => DAY_LABELS[d]).join(",")}` : " · todo dia"
                        }</span>
                      )}
                      {it.next_run_at && it.is_active && (
                        <span>Próximo: {format(new Date(it.next_run_at), "dd/MM HH:mm", { locale: ptBR })}</span>
                      )}
                      {it.last_sent_at && (
                        <span>Último: {format(new Date(it.last_sent_at), "dd/MM HH:mm", { locale: ptBR })}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Switch
                      checked={it.is_active}
                      onCheckedChange={(v) => toggleActive(it.id, v)}
                    />
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => sendNow(it.id)}
                      disabled={sendingId === it.id}
                      title="Enviar agora"
                    >
                      {sendingId === it.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4 text-blue-500" />
                      )}
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => remove(it.id)}
                      title="Apagar"
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
