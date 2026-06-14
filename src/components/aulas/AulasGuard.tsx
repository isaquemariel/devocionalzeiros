import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAulasSession } from "@/hooks/useAulasSession";
import { useAulasForceDarkTheme } from "@/hooks/useAulasForceDarkTheme";
import { Loader2 } from "lucide-react";
import { aulasAuth, clearAulasSession } from "@/lib/aulasAuth";

export function AulasGuard({ children, requireAdmin = false }: { children: React.ReactNode; requireAdmin?: boolean }) {
  useAulasForceDarkTheme();
  const { session, loading } = useAulasSession();
  const loc = useLocation();

  // For admin-guarded routes, never trust the localStorage is_admin flag.
  // Always re-verify with the server before rendering admin content.
  const [adminCheck, setAdminCheck] = useState<"pending" | "allowed" | "denied">(
    requireAdmin ? "pending" : "allowed"
  );

  useEffect(() => {
    if (!requireAdmin) return;
    if (loading) return;
    if (!session) return;
    let cancelled = false;
    (async () => {
      try {
        const me = await aulasAuth.me();
        if (cancelled) return;
        setAdminCheck(me?.is_admin ? "allowed" : "denied");
      } catch (err: any) {
        if (cancelled) return;
        if (err?.status === 401 || err?.status === 403) {
          clearAulasSession();
        }
        setAdminCheck("denied");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [requireAdmin, loading, session?.email]);

  if (loading || (requireAdmin && adminCheck === "pending")) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white/60">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }
  if (!session) return <Navigate to="/aulas/login" replace state={{ from: loc.pathname }} />;
  if (requireAdmin && adminCheck !== "allowed") return <Navigate to="/aulas" replace />;
  return <>{children}</>;
}
