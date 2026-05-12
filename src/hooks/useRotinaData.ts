import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type Table =
  | "rotina_tasks"
  | "rotina_calendar_events"
  | "rotina_habits"
  | "rotina_habit_logs"
  | "rotina_prayers"
  | "rotina_notes"
  | "rotina_goals"
  | "rotina_weekly_reviews"
  | "rotina_settings";

export function useRotinaResource<T extends { id: string }>(
  table: Table,
  userId: string | undefined,
  options: { orderBy?: string; ascending?: boolean } = {}
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    if (!userId) return;
    const orderBy = options.orderBy ?? "created_at";
    const ascending = options.ascending ?? false;
    const { data: rows, error } = await (supabase as any)
      .from(table)
      .select("*")
      .eq("user_id", userId)
      .order(orderBy, { ascending });
    if (error) {
      console.error(`Erro ${table}:`, error);
      toast.error("Erro ao carregar");
    } else {
      setData((rows as T[]) || []);
    }
    setLoading(false);
  }, [table, userId, options.orderBy, options.ascending]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const create = async (payload: Partial<T>): Promise<T | null> => {
    if (!userId) return null;
    const { data: row, error } = await (supabase as any)
      .from(table)
      .insert({ ...payload, user_id: userId })
      .select()
      .single();
    if (error) {
      toast.error("Erro ao criar");
      return null;
    }
    setData((prev) => [row as T, ...prev]);
    return row as T;
  };

  const update = async (id: string, payload: Partial<T>): Promise<boolean> => {
    const { error } = await (supabase as any).from(table).update(payload).eq("id", id);
    if (error) {
      toast.error("Erro ao atualizar");
      return false;
    }
    setData((prev) => prev.map((r) => (r.id === id ? { ...r, ...payload } : r)));
    return true;
  };

  const remove = async (id: string): Promise<boolean> => {
    const { error } = await (supabase as any).from(table).delete().eq("id", id);
    if (error) {
      toast.error("Erro ao remover");
      return false;
    }
    setData((prev) => prev.filter((r) => r.id !== id));
    return true;
  };

  return { data, loading, refetch: fetchData, create, update, remove, setData };
}
