import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAulasSession } from "@/hooks/useAulasSession";
import { Loader2 } from "lucide-react";

/**
 * Força tema escuro na área de membros (/aulas) independentemente da
 * preferência global do usuário, e restaura ao sair.
 */
function useForceAulasDarkTheme() {
  useEffect(() => {
    const html = document.documentElement;
    const hadDark = html.classList.contains("dark");
    const hadLight = html.classList.contains("light");
    html.classList.remove("light");
    html.classList.add("dark");
    html.style.colorScheme = "dark";
    return () => {
      if (!hadDark) html.classList.remove("dark");
      if (hadLight) html.classList.add("light");
      html.style.colorScheme = "";
    };
  }, []);
}

export function AulasGuard({ children, requireAdmin = false }: { children: React.ReactNode; requireAdmin?: boolean }) {
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
