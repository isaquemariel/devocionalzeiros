// ============================================================================
// Compra de cosméticos do guarda-roupa.
// HOJE em MODO TESTE (pagamento simulado) — a interface já é a definitiva.
// Quando o Stripe estiver configurado (conta + chaves + edge function), basta
// trocar PURCHASE_MODE para "stripe" e implementar o bloco marcado com TODO:
//   1. edge function cria um PaymentIntent (ou cobra o cartão salvo do Customer)
//   2. o cliente confirma com o Stripe Payment Element (pop-up nativo)
//   3. ao dar "succeeded", esta função retorna { ok: true } e o item é concedido
// O cartão fica salvo no Stripe (Customer + payment method) para 1-clique depois.
// ============================================================================

export type PurchaseMode = "mock" | "stripe";
export const PURCHASE_MODE: PurchaseMode = "mock";

export interface SavedCard { brand: string; last4: string }
const CARD_KEY = (u: string) => `rpg_pay_card_${u}`;

/** Forma de pagamento salva (mock hoje; virá do Stripe Customer depois). */
export function getSavedCard(userId: string): SavedCard | null {
  try { const r = localStorage.getItem(CARD_KEY(userId)); return r ? (JSON.parse(r) as SavedCard) : null; } catch { return null; }
}
export function saveMockCard(userId: string, card: SavedCard = { brand: "Visa", last4: "4242" }): void {
  try { localStorage.setItem(CARD_KEY(userId), JSON.stringify(card)); } catch { /* ignore */ }
}
export function forgetCard(userId: string): void {
  try { localStorage.removeItem(CARD_KEY(userId)); } catch { /* ignore */ }
}

/** Efetua a compra. Retorna ok só após pagamento aprovado. */
export async function purchaseCosmetic(userId: string, cosmeticId: string, priceLabel?: string): Promise<{ ok: boolean; error?: string }> {
  if (PURCHASE_MODE === "mock") {
    await new Promise((r) => setTimeout(r, 1200)); // simula o processamento
    return { ok: true };
  }
  // TODO(stripe): chamar edge function 'rpg-purchase' com { cosmeticId } → PaymentIntent,
  // confirmar com o Payment Element e retornar { ok: paymentIntent.status === 'succeeded' }.
  return { ok: false, error: "Pagamento indisponível no momento." };
}
