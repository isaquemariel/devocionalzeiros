import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

/** Resposta já conhecida nesta sessão do app, guardada por usuário.
 *  Sem isto, TODA entrada no painel esperava uma ida ao servidor só para
 *  descobrir de novo o que já se sabia — e é essa espera que o usuário vê como
 *  "demora a entrar". A permissão de verdade continua no banco (RLS): isto só
 *  evita repetir a pergunta. */
let lembrado: { uid: string; admin: boolean } | null = null;

export const useAdminCheck = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let vivo = true;

    const checkAdmin = async () => {
      try {
        // getSession lê da memória/armazenamento local: não é ida à rede.
        const { data: sessao } = await supabase.auth.getSession();
        const uid = sessao?.session?.user?.id ?? "";

        if (lembrado && lembrado.uid === uid) {
          if (vivo) { setIsAdmin(lembrado.admin); setLoading(false); }
          return;
        }

        const { data, error } = await supabase.rpc("is_current_user_admin");
        if (error) {
          console.error("Error checking admin status:", error);
          if (vivo) setIsAdmin(false);
          return;                       // erro não vira resposta lembrada
        }
        lembrado = { uid, admin: !!data };
        if (vivo) setIsAdmin(!!data);
      } catch (err) {
        console.error("Error in admin check:", err);
        if (vivo) setIsAdmin(false);
      } finally {
        if (vivo) setLoading(false);
      }
    };

    checkAdmin();
    return () => { vivo = false; };
  }, []);

  return { isAdmin, loading };
};

/** Esquece a resposta guardada (trocou de conta, mudou permissão). */
export const invalidateAdminCache = () => { lembrado = null; };
