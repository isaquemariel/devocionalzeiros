import { useEffect, useState, useCallback } from "react";
import { aulasAuth, getAulasToken, clearAulasSession } from "@/lib/aulasAuth";

export interface AulasSession {
  email: string;
  is_admin: boolean;
  allowed_curso_ids: string[];
}

export function useAulasSession() {
  const [session, setSession] = useState<AulasSession | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!getAulasToken()) {
      setSession(null);
      setLoading(false);
      return;
    }
    try {
      const data = await aulasAuth.me();
      setSession(data);
    } catch {
      clearAulasSession();
      setSession(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { session, loading, refresh, signOut: () => { clearAulasSession(); setSession(null); } };
}
