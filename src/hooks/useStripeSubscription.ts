import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

/**
 * Diz se o usuário logado tem uma ASSINATURA STRIPE recorrente — a única que é
 * gerenciável pelo portal ("Gerenciar assinatura"). Compras avulsas (PIX/Kiwify)
 * e planos concedidos manualmente NÃO contam. Fonte: RPC
 * `current_user_manages_stripe` (marcador payment_method='stripe' gravado só
 * pelo webhook do Stripe).
 *
 * Passe `enabled=false` para pular a consulta (ex.: usuário gratuito/deslogado).
 */
export function useStripeSubscription(enabled: boolean = true) {
  const [managesStripe, setManagesStripe] = useState(false);
  const [loading, setLoading] = useState(enabled);

  useEffect(() => {
    if (!enabled) {
      setManagesStripe(false);
      setLoading(false);
      return;
    }
    let alive = true;
    setLoading(true);
    supabase
      .rpc("current_user_manages_stripe")
      .then(({ data, error }) => {
        if (!alive) return;
        setManagesStripe(!error && data === true);
        setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [enabled]);

  return { managesStripe, loading };
}
