import { supabase } from "@/integrations/supabase/client";

// ============================================================================
// Compra de cosméticos do guarda-roupa — pagamento real via Stripe.
// Backend (edge functions, criadas no Lovable):
//   • rpg-create-payment  → cria PaymentIntent + Customer (cartão salvo) e
//     devolve { clientSecret, customerSessionClientSecret, publishableKey, ... }
//   • rpg-confirm-purchase → valida o pagamento no servidor e concede o item.
// O Payment Element (nativo, dentro da tela) cuida do cartão e do 1-clique.
// ============================================================================

export type PurchaseMode = "mock" | "stripe";
export const PURCHASE_MODE: PurchaseMode = "stripe";

export interface CreatePaymentResult {
  clientSecret: string;
  customerSessionClientSecret: string | null;
  publishableKey: string;
  amount: number;
  currency: string;
}

/** Inicia o pagamento no backend (PaymentIntent + Customer). */
export async function createPayment(cosmeticId: string): Promise<CreatePaymentResult> {
  const { data, error } = await supabase.functions.invoke("rpg-create-payment", { body: { cosmeticId } });
  if (error) throw new Error(error.message || "Falha ao iniciar o pagamento.");
  if ((data as { error?: string })?.error) throw new Error((data as { error: string }).error);
  return data as CreatePaymentResult;
}

/** Valida o pagamento no servidor e concede o item à conta. */
export async function confirmPurchase(paymentIntentId: string): Promise<{ ok: boolean; cosmeticId?: string; error?: string }> {
  const { data, error } = await supabase.functions.invoke("rpg-confirm-purchase", { body: { paymentIntentId } });
  if (error) return { ok: false, error: error.message };
  return (data as { ok: boolean; cosmeticId?: string; error?: string }) ?? { ok: false };
}
