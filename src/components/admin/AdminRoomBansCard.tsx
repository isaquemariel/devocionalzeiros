import { useCallback, useEffect, useState } from "react";
import { Ban, Loader2, ShieldCheck, RefreshCw, Clock } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { adminListRoomBans, adminUnblockRoomUser, type RoomBan } from "@/lib/roomModeration";

interface UserRow { user_id: string; email: string; full_name: string | null }

// Card do painel admin: usuários bloqueados nas SALAS de bate-papo, com
// desbloqueio. Só o admin vê/opera (RPCs validam has_role no banco).
export default function AdminRoomBansCard() {
  const [bans, setBans] = useState<RoomBan[]>([]);
  const [users, setUsers] = useState<Record<string, UserRow>>({});
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const [b, u] = await Promise.all([
      adminListRoomBans(),
      supabase.rpc("admin_get_all_users"),
    ]);
    setBans(b);
    const map: Record<string, UserRow> = {};
    const rows = (u.data as UserRow[] | null) || [];
    for (const r of rows) if (r.user_id) map[r.user_id] = r;
    setUsers(map);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const unblock = async (userId: string) => {
    setBusy(userId);
    const ok = await adminUnblockRoomUser(userId);
    setBusy(null);
    if (!ok) { toast.error("Não foi possível desbloquear."); return; }
    toast.success("Usuário desbloqueado das salas.");
    setBans((prev) => prev.filter((x) => x.user_id !== userId));
  };

  return (
    <div className="rounded-2xl border border-border bg-card/60 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold flex items-center gap-2">
          <Ban className="w-4 h-4 text-rose-400" /> Salas — usuários bloqueados
          <span className="text-xs font-normal text-muted-foreground">({bans.length})</span>
        </h3>
        <button onClick={load} disabled={loading} className="p-2 rounded-lg hover:bg-muted/50 transition" aria-label="Atualizar">
          <RefreshCw className={`w-4 h-4 text-muted-foreground ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-sm text-muted-foreground py-4"><Loader2 className="w-4 h-4 animate-spin" /> Carregando…</div>
      ) : bans.length === 0 ? (
        <div className="flex items-center gap-2 text-sm text-muted-foreground py-4">
          <ShieldCheck className="w-4 h-4 text-emerald-400" /> Nenhum usuário bloqueado nas salas.
        </div>
      ) : (
        <div className="space-y-2">
          {bans.map((b) => {
            const u = users[b.user_id];
            const temp = !b.permanent && b.banned_until;
            return (
              <div key={b.user_id} className="flex items-center justify-between gap-3 rounded-xl border border-border/60 bg-background/40 p-3">
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate">{u?.full_name || u?.email || b.user_id}</p>
                  {u?.email && <p className="text-xs text-muted-foreground truncate">{u.email}</p>}
                  <p className="text-[11px] text-muted-foreground mt-0.5 flex items-center gap-1 flex-wrap">
                    <span className={`px-1.5 py-0.5 rounded font-bold ${b.auto ? "bg-rose-500/15 text-rose-300" : "bg-purple-500/15 text-purple-300"}`}>
                      {b.auto ? "Automático (denúncias)" : "Manual"}
                    </span>
                    {temp ? (
                      <span className="inline-flex items-center gap-1 text-amber-400"><Clock className="w-3 h-3" /> até {new Date(b.banned_until as string).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })}</span>
                    ) : (
                      <span className="text-rose-300">Permanente</span>
                    )}
                    {b.reason && <span className="text-muted-foreground">· {b.reason}</span>}
                  </p>
                </div>
                <button
                  onClick={() => unblock(b.user_id)}
                  disabled={busy === b.user_id}
                  className="shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-600/30 transition disabled:opacity-50 inline-flex items-center gap-1.5"
                >
                  {busy === b.user_id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <ShieldCheck className="w-3.5 h-3.5" />} Desbloquear
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
