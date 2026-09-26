import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

/**
 * TROCA DE SENHA OBRIGATÓRIA vale no app inteiro. Quando o admin redefine a
 * senha (`admin-reset-password`), a conta fica marcada com
 * `must_change_password`. O login já leva à troca, mas quem tinha uma sessão
 * ou digitava /home direto passava reto. Aqui, em qualquer tela de dentro, a
 * marca manda de volta para a tela de nova senha (que o Auth abre sozinho).
 */
export function ExigeTrocaDeSenha() {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const conferido = useRef<string | null>(null);

  useEffect(() => {
    if (!user || pathname === "/auth" || pathname === "/" || pathname.startsWith("/jornada")) return;
    // uma consulta por conta e por visita (e de novo se ela sair e voltar)
    if (conferido.current === user.id) return;
    let vivo = true;
    (async () => {
      const { data } = await supabase.from("profiles").select("must_change_password").eq("user_id", user.id).maybeSingle();
      if (!vivo) return;
      if (data?.must_change_password) navigate("/auth", { replace: true });
      else conferido.current = user.id;
    })();
    return () => { vivo = false; };
  }, [user, pathname, navigate]);

  return null;
}
