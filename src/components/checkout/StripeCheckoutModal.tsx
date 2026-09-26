import { useMemo, useState, type ReactNode } from "react";
import { loadStripe, type Stripe } from "@stripe/stripe-js";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { motion } from "framer-motion";
import { X, Loader2, Check, ShieldCheck } from "lucide-react";
import { getCheckoutStatus, type CheckoutInit } from "@/lib/stripeCheckout";

// Checkout nativo (Embedded) da Stripe dentro do app — sem sair da tela.
const stripeCache = new Map<string, Promise<Stripe | null>>();
function stripeFor(pk: string) {
  if (!stripeCache.has(pk)) stripeCache.set(pk, loadStripe(pk));
  return stripeCache.get(pk)!;
}

/** o que está sendo comprado — a linha do item, como na loja do RPG */
export interface ItemCheckout {
  nome: string;
  detalhe?: string;
  preco?: string;
  icone?: ReactNode;
}

interface Props {
  init: CheckoutInit;
  title?: string;
  item?: ItemCheckout;
  onClose: () => void;
  onSuccess: () => void;
}

/**
 * O PAGAMENTO DO APP INTEIRO — planos, Talentos e doação —, com a cara da loja
 * do RPG (`RPGPurchaseSheet`): folha azul-noite de borda de ouro, o rótulo da
 * Loja do Devocionalzeiro, a linha do item com o preço e o selo de pagamento
 * seguro. Antes era um modal branco genérico, que não parecia do app.
 *
 * O formulário por dentro é o Checkout embutido da Stripe (assinatura
 * recorrente, cupom, carteiras). As cores dele vêm da identidade visual
 * configurada no painel da Stripe (Configurações → Marca), não daqui.
 */
export default function StripeCheckoutModal({ init, title = "Pagamento", item, onClose, onSuccess }: Props) {
  const stripePromise = useMemo(() => stripeFor(init.publishableKey), [init.publishableKey]);
  const [done, setDone] = useState(false);

  const handleComplete = async () => {
    setDone(true);
    try {
      await getCheckoutStatus(init.sessionId); // confirma; o webhook é a fonte da verdade
    } catch { /* segue mesmo assim — o webhook concede */ }
    setTimeout(onSuccess, 1400);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center bg-[#05070cee] backdrop-blur-sm p-0 sm:p-5"
      onClick={done ? undefined : onClose}
    >
      <motion.div
        initial={{ y: 40, opacity: 0, scale: 0.98 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 40, opacity: 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="rpg-root w-full sm:max-w-md lg:max-w-lg max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl border-2 border-[#e8b04b] p-4 shadow-[0_-10px_50px_-10px_#000]"
        style={{ background: "linear-gradient(180deg, #141c30, #0b1120)" }}
        role="dialog"
        aria-label={title}
      >
        <div className="flex items-center justify-between mb-3">
          <p className="text-[11px] font-black uppercase tracking-wider text-[#ffd889]">🛍️ Loja do Devocionalzeiro</p>
          {!done && (
            <button onClick={onClose} className="w-7 h-7 rounded-full bg-black/40 border border-white/15 flex items-center justify-center" aria-label="Fechar">
              <X className="w-4 h-4 text-white/70" />
            </button>
          )}
        </div>

        {/* o item */}
        <div className="flex items-center gap-3 rounded-2xl bg-black/30 border border-white/10 p-3">
          <div className="w-12 h-12 shrink-0 rounded-xl bg-[#20180d] border border-[#3a2c18] flex items-center justify-center text-2xl text-[#ffd889]">
            {item?.icone ?? "✦"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-black text-blue-50 leading-tight">{item?.nome ?? title}</p>
            {item?.detalhe && <p className="text-[11px] text-[#9c8b68]">{item.detalhe}</p>}
          </div>
          {item?.preco && <span className="shrink-0 text-base font-black text-[#7fd0a0]">{item.preco}</span>}
        </div>

        {done ? (
          <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
            <div className="w-14 h-14 rounded-full bg-gradient-to-b from-[#ffe08a] to-[#e8b04b] border-2 border-[#0b0805] flex items-center justify-center shadow-[0_4px_0_#6e4e18]">
              <Check className="w-7 h-7 text-[#1a1206]" strokeWidth={3.5} />
            </div>
            <p className="mt-2 font-black text-[#ece0c6]">Pagamento concluído!</p>
            <p className="text-xs text-[#9c8b68]">Liberando seu acesso…</p>
            <Loader2 className="w-5 h-5 animate-spin text-[#9c8b68]" />
          </div>
        ) : (
          // o Checkout da Stripe numa moldura de "tela", como a do RPG
          <div className="mt-3 overflow-hidden rounded-2xl border-2 border-[#0b0805] bg-white shadow-[inset_0_0_0_1px_rgba(255,255,255,.08)]">
            <EmbeddedCheckoutProvider stripe={stripePromise} options={{ clientSecret: init.clientSecret, onComplete: handleComplete }}>
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          </div>
        )}

        <div className="flex items-center justify-center gap-1.5 mt-3 text-[10px] text-[#8a7a58]">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Pagamento seguro via Stripe</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
