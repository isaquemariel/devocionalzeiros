import { supabase } from "@/integrations/supabase/client";

// ============================================================================
// Checkout nativo (Embedded) da Stripe — assinaturas de planos e doação.
// Backend (edge functions no Lovable):
//   • create-subscription-checkout → { clientSecret, sessionId, publishableKey }
//   • create-donation-checkout     → { clientSecret, sessionId, publishableKey }
//   • get-checkout-status          → { status, payment_status, plan, tipo }
//   • create-customer-portal       → { url }
// O plano é concedido pelo webhook (fonte da verdade); o app só confirma o status.
// ============================================================================

export type PlanKey = "gold" | "premium";
export type PlanPeriod = "monthly" | "annual";

export interface CheckoutInit {
  clientSecret: string;
  sessionId: string;
  publishableKey: string;
}
export interface CheckoutStatus {
  status: string; // 'complete' quando finalizado
  payment_status: string; // 'paid' | 'no_payment_required' | ...
  plan: string | null;
  tipo: string | null;
}

async function invoke<T>(fn: string, body: Record<string, unknown>): Promise<T> {
  const { data, error } = await supabase.functions.invoke(fn, { body });
  if (error) throw new Error(error.message || "Falha na comunicação com o pagamento.");
  if ((data as { error?: string })?.error) throw new Error((data as { error: string }).error);
  return data as T;
}

export const createSubscriptionCheckout = (plan: PlanKey, period: PlanPeriod) =>
  invoke<CheckoutInit>("create-subscription-checkout", { plan, period });

export const createDonationCheckout = (amount: number) =>
  invoke<CheckoutInit>("create-donation-checkout", { amount });

export const getCheckoutStatus = (sessionId: string) =>
  invoke<CheckoutStatus>("get-checkout-status", { sessionId });

export const openCustomerPortal = async (returnUrl: string) => {
  const { url } = await invoke<{ url: string }>("create-customer-portal", { returnUrl });
  window.location.href = url;
};
