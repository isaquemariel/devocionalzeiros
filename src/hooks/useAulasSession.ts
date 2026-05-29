import { useEffect, useState, useCallback } from "react";
import {
  aulasAuth,
  getAulasToken,
  clearAulasSession,
  getStoredAulasSession,
  setAulasSession,
} from "@/lib/aulasAuth";

export interface AulasSession {
  email: string;
  is_admin: boolean;
  allowed_curso_ids: string[];
}

export function useAulasSession() {
  // Initialize optimistically from localStorage so a transient /me failure
  // doesn't kick the user back to the login screen right after verifying.
  const [session, setSession] = useState<AulasSession | null>(() => {
    if (!getAulasToken()) return null;
    return getStoredAulasSession();
  });
  const [loading, setLoading] = useState(() => {
    // If we already have a stored session, render immediately and refresh in background.
    return !(getAulasToken() && getStoredAulasSession());
  });

  const refresh = useCallback(async () => {
    const token = getAulasToken();
    if (!token) {
      setSession(null);
      setLoading(false);
      return;
    }
    try {
      const data = await aulasAuth.me();
      setSession(data);
      setAulasSession(token, data.email, {
        is_admin: !!data.is_admin,
        allowed_curso_ids: data.allowed_curso_ids ?? [],
      });
    } catch (err: any) {
      // Only sign the user out if the server explicitly says the session is invalid.
      // Network/CORS/transient errors must not clear a valid local session.
      if (err?.status === 401 || err?.status === 403) {
        clearAulasSession();
        setSession(null);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    session,
    loading,
    refresh,
    signOut: () => {
      clearAulasSession();
      setSession(null);
    },
  };
}
