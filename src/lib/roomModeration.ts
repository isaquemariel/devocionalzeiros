import { supabase } from "@/integrations/supabase/client";

// Suporte oficial (mesmo número usado no app) — para o usuário bloqueado falar
// com a equipe e pedir revisão.
export const SUPPORT_WHATSAPP =
  "https://wa.me/+5584999488698?text=Ol%C3%A1%2C%20equipe.%20Meu%20acesso%20%C3%A0s%20salas%20foi%20bloqueado%20e%20gostaria%20de%20revisar.";

export interface BlockStatus {
  blocked: boolean;
  permanent?: boolean;
  until?: string | null;
  reason?: string | null;
}

// Status de bloqueio do usuário logado (gate de entrada).
export async function fetchMyBlockStatus(): Promise<BlockStatus> {
  try {
    const { data, error } = await supabase.rpc("is_room_blocked");
    if (error) { console.warn("is_room_blocked failed:", error.message); return { blocked: false }; }
    return (data as BlockStatus) || { blocked: false };
  } catch (e) {
    console.warn("is_room_blocked error:", e);
    return { blocked: false };
  }
}

// Denuncia um usuário. Retorna se, com esta denúncia, ele foi bloqueado.
export async function reportRoomUser(targetId: string): Promise<{ ok: boolean; blocked: boolean; reason?: string }> {
  try {
    const { data, error } = await supabase.rpc("report_room_user", { target_id: targetId });
    if (error) return { ok: false, blocked: false, reason: error.message };
    const d = (data as { reported?: boolean; blocked?: boolean; reason?: string }) || {};
    return { ok: !!d.reported, blocked: !!d.blocked, reason: d.reason };
  } catch (e) {
    return { ok: false, blocked: false, reason: (e as Error).message };
  }
}

// Admin: bloqueia (permanente ou temporário em minutos).
export async function adminBanRoomUser(targetId: string, opts: { permanent: boolean; minutes?: number; reason?: string }): Promise<boolean> {
  const { error } = await supabase.rpc("admin_set_room_ban", {
    target_id: targetId,
    p_permanent: opts.permanent,
    p_minutes: opts.minutes ?? 0,
    p_reason: opts.reason ?? null,
  });
  if (error) { console.warn("admin_set_room_ban failed:", error.message); return false; }
  return true;
}

// Admin: desbloqueia.
export async function adminUnblockRoomUser(targetId: string): Promise<boolean> {
  const { error } = await supabase.rpc("admin_unblock_room_user", { target_id: targetId });
  if (error) { console.warn("admin_unblock_room_user failed:", error.message); return false; }
  return true;
}

// Dispara o push de bloqueio para o usuário (app fechado). Best-effort: se a
// edge function ainda não estiver deployada, falha em silêncio — o aviso in-app
// (sino) já foi criado pela RPC.
export function pingRoomBlockPush(targetId: string): void {
  supabase.functions.invoke("notify-room-block", { body: { user_id: targetId } }).catch(() => { /* noop */ });
}

export interface RoomBan {
  user_id: string;
  permanent: boolean;
  banned_until: string | null;
  reason: string | null;
  auto: boolean;
  created_at: string;
}

// Admin: lista bloqueios ativos (painel).
export async function adminListRoomBans(): Promise<RoomBan[]> {
  const { data, error } = await supabase.rpc("admin_list_room_bans");
  if (error) { console.warn("admin_list_room_bans failed:", error.message); return []; }
  return (data as RoomBan[]) || [];
}
