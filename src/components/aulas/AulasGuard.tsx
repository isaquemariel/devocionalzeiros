import { Navigate, useLocation } from "react-router-dom";
import { useAulasSession } from "@/hooks/useAulasSession";
import { useAulasForceDarkTheme } from "@/hooks/useAulasForceDarkTheme";
import { Loader2 } from "lucide-react";

export function AulasGuard({ children, requireAdmin = false }: { children: React.ReactNode; requireAdmin?: boolean }) {
  useForceAulasDarkTheme();
  const { session, loading } = useAulasSession();
  const loc = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white/60">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }
  if (!session) return <Navigate to="/aulas/login" replace state={{ from: loc.pathname }} />;
  if (requireAdmin && !session.is_admin) return <Navigate to="/aulas" replace />;
  return <>{children}</>;
}
