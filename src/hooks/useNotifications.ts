import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface UserNotification {
  id: string;
  type: string;
  title: string;
  body: string | null;
  link: string | null;
  is_read: boolean;
  created_at: string;
}

/** Quantas notificações ficam guardadas. O que passar disso é apagado — as
 *  mais ANTIGAS primeiro — para a caixa nunca virar um depósito de milhares. */
export const MAX_NOTIFICACOES = 10;

export function useNotifications(userId?: string) {
  const [items, setItems] = useState<UserNotification[]>([]);
  const [loading, setLoading] = useState(false);
  const podando = useRef(false);

  const load = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    // busca bem mais do que cabe: o excedente é a faxina desta rodada.
    const { data } = await supabase
      .from("user_notifications" as any)
      .select("id, type, title, body, link, is_read, created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(200);
    const linhas = ((data as any) ?? []) as UserNotification[];
    setItems(linhas.slice(0, MAX_NOTIFICACOES));
    setLoading(false);
    // limpeza automática: some com as velhas de vez, no banco.
    const velhas = linhas.slice(MAX_NOTIFICACOES).map((n) => n.id);
    if (velhas.length && !podando.current) {
      podando.current = true;
      try {
        await supabase.from("user_notifications" as any).delete().in("id", velhas);
      } finally {
        podando.current = false;
      }
    }
  }, [userId]);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    if (!userId) return;
    // um respiro entre o aviso e a releitura: a faxina apaga muitas linhas de
    // uma vez, e cada uma volta como um evento — sem isto seriam dezenas de
    // consultas seguidas para chegar ao mesmo resultado.
    let aviso: number | undefined;
    const ch = supabase
      .channel(`notifications-${userId}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "user_notifications", filter: `user_id=eq.${userId}` },
        () => {
          if (aviso !== undefined) window.clearTimeout(aviso);
          aviso = window.setTimeout(() => { aviso = undefined; load(); }, 400);
        }
      )
      .subscribe();
    return () => {
      if (aviso !== undefined) window.clearTimeout(aviso);
      supabase.removeChannel(ch);
    };
  }, [userId, load]);

  const unreadCount = items.filter((i) => !i.is_read).length;

  const markAsRead = useCallback(async (id: string) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, is_read: true } : i)));
    await supabase.from("user_notifications" as any).update({ is_read: true }).eq("id", id);
  }, []);

  const markAllAsRead = useCallback(async () => {
    if (!userId) return;
    setItems((prev) => prev.map((i) => ({ ...i, is_read: true })));
    await supabase
      .from("user_notifications" as any)
      .update({ is_read: true })
      .eq("user_id", userId)
      .eq("is_read", false);
  }, [userId]);

  const remove = useCallback(async (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
    await supabase.from("user_notifications" as any).delete().eq("id", id);
  }, []);

  return { items, loading, unreadCount, markAsRead, markAllAsRead, remove, refetch: load };
}
