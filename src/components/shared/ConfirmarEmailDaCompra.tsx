import { useEffect, useRef } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/lib/avisos";
import { invalidatePlanCache } from "@/hooks/useUserPlan";

/**
 * A COMPRA NO SEU E-MAIL ESPERANDO A PROVA DE QUE ELE É SEU.
 *
 * O cadastro entra na hora, sem confirmar e-mail. Mas uma compra achada só
 * pelo e-mail (Kiwify, compra feita antes de ter conta) só vale para quem
 * PROVA que o e-mail é dele — senão bastava se cadastrar com o e-mail de um
 * comprador para herdar o plano. A prova é um link enviado ao e-mail: quem o
 * abre volta logado por ele, e o banco registra (`confirmar_email`, que lê o
 * próprio token da sessão).
 *
 * Aqui: ao entrar, (1) registra a prova se a sessão veio do link; (2) se ainda
 * houver compra esperando, o Devocionalzeiro avisa, com o botão que manda o link.
 */
export function ConfirmarEmailDaCompra() {
  const { user } = useAuth();
  const visto = useRef<string | null>(null);

  useEffect(() => {
    if (!user?.id || !user.email || visto.current === user.id) return;
    visto.current = user.id;
    const email = user.email;
    let vivo = true;
    (async () => {
      // voltou pelo link do e-mail? o banco confere no token e libera
      const { data: provou } = await supabase.rpc("confirmar_email" as never);
      if (provou === true) {
        invalidatePlanCache(email);
        window.dispatchEvent(new CustomEvent("dz:plano-mudou"));
      }
      const { data: esperando, error } = await supabase.rpc("compra_aguardando_confirmacao" as never);
      if (!vivo || error || esperando !== true) return;
      toast.info("Achei uma compra no seu e-mail!", {
        description: "Para liberar o seu plano, confirme que o e-mail é seu: eu mando um link, você abre e pronto.",
        duration: 12000,
        action: {
          label: "Mandar o link",
          onClick: async () => {
            const { error: e } = await supabase.auth.signInWithOtp({
              email,
              options: { shouldCreateUser: false, emailRedirectTo: `${window.location.origin}/` },
            });
            if (e) toast.error("Não consegui mandar o link agora. Tenta de novo em instantes?");
            else toast.success(`Link enviado para ${email}. Abra neste aparelho para liberar o plano.`, { duration: 10000 });
          },
        },
      });
    })().catch(() => undefined);
    return () => { vivo = false; };
  }, [user?.id, user?.email]);

  return null;
}
