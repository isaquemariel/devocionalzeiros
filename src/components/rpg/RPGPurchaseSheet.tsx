import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { X, ShieldCheck, Loader2, Check } from "lucide-react";
import { loadStripe, type Stripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import type { Cosmetic } from "@/lib/rpgRewards";
import { createPayment, confirmPurchase, type CreatePaymentResult } from "@/lib/rpgPurchase";

// ============================================================================
// Compra do guarda-roupa DENTRO da tela (Stripe Payment Element). Pop-up estilo
// nativo: item + preço, formas de pagamento (com cartão salvo em 1-clique) e
// confirmação, com estados de processando / sucesso. Pagamento real via Stripe.
// ============================================================================

interface Props { userId: string; cosmetic: Cosmetic; onClose: () => void; onPurchased: (id: string) => void; onProve?: (id: string) => void }

// cache de instâncias do Stripe por publishable key
const stripeCache = new Map<string, Promise<Stripe | null>>();
const getStripe = (pk: string) => {
  if (!stripeCache.has(pk)) stripeCache.set(pk, loadStripe(pk));
  return stripeCache.get(pk)!;
};

function PayForm({ cosmetic, onPurchased }: { cosmetic: Cosmetic; onPurchased: (id: string) => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [phase, setPhase] = useState<"idle" | "paying" | "done">("idle");
  const [err, setErr] = useState("");

  const pay = async () => {
    if (!stripe || !elements || phase !== "idle") return;
    setPhase("paying");
    setErr("");
    const { error, paymentIntent } = await stripe.confirmPayment({ elements, redirect: "if_required" });
    if (error) { setErr(error.message || "Não foi possível concluir o pagamento."); setPhase("idle"); return; }
    if (paymentIntent?.status === "succeeded") {
      const r = await confirmPurchase(paymentIntent.id);
      if (r.ok) { setPhase("done"); setTimeout(() => onPurchased(cosmetic.id), 900); }
      else { setErr(r.error || "Pagamento feito, mas houve erro ao liberar o item."); setPhase("idle"); }
    } else {
      setErr("Pagamento pendente. Tente novamente.");
      setPhase("idle");
    }
  };

  return (
    <div className="mt-4">
      <PaymentElement options={{ layout: "tabs" }} />
      {err && <p className="text-[12px] text-[#e8846b] mt-2">{err}</p>}
      <button
        onClick={pay}
        disabled={!stripe || phase !== "idle"}
        className={`rpg-btn w-full py-3.5 mt-4 inline-flex items-center justify-center gap-2 ${!stripe || phase !== "idle" ? "opacity-60" : ""}`}
      >
        {phase === "done" ? (<><Check className="w-5 h-5" /> Comprado!</>)
          : phase === "paying" ? (<><Loader2 className="w-5 h-5 animate-spin" /> Processando…</>)
          : (<>Comprar por {cosmetic.price}</>)}
      </button>
    </div>
  );
}

export default function RPGPurchaseSheet({ cosmetic, onClose, onPurchased, onProve }: Props) {
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [intent, setIntent] = useState<CreatePaymentResult | null>(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    let alive = true;
    setStatus("loading");
    createPayment(cosmetic.id)
      .then((res) => { if (alive) { setIntent(res); setStatus("ready"); } })
      .catch((e) => { if (alive) { setErr(e?.message || "Erro ao iniciar o pagamento."); setStatus("error"); } });
    return () => { alive = false; };
  }, [cosmetic.id]);

  const stripePromise = useMemo(() => (intent ? getStripe(intent.publishableKey) : null), [intent]);
  const elementsOptions = useMemo(
    () => intent ? {
      clientSecret: intent.clientSecret,
      ...(intent.customerSessionClientSecret ? { customerSessionClientSecret: intent.customerSessionClientSecret } : {}),
      appearance: { theme: "night" as const, variables: { colorPrimary: "#e8b04b", colorBackground: "#0b1120", borderRadius: "10px" } },
    } : undefined,
    [intent],
  );

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center bg-[#05070cee] backdrop-blur-sm p-0 sm:p-5"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 40, opacity: 0, scale: 0.98 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 40, opacity: 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:max-w-sm max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl border-2 border-[#e8b04b] bg-gradient-to-b from-[#141c30] to-[#0b1120] p-5 shadow-[0_-10px_50px_-10px_#000]"
      >
        <div className="flex items-center justify-between mb-3">
          <p className="text-[11px] font-black uppercase tracking-wider text-[#ffd889]">🛍️ Loja do Devocionalzeiro</p>
          <button onClick={onClose} className="w-7 h-7 rounded-full bg-black/40 border border-white/15 flex items-center justify-center"><X className="w-4 h-4 text-white/70" /></button>
        </div>

        {/* Item */}
        <div className="flex items-center gap-3 rounded-2xl bg-black/30 border border-white/10 p-3">
          <div className="w-14 h-14 rounded-xl bg-[#20180d] border border-[#3a2c18] flex items-center justify-center text-3xl">{cosmetic.emoji}</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-black text-blue-50 leading-tight">{cosmetic.name}</p>
            <p className="text-[11px] text-[#9c8b68]">Item cosmético · seu para sempre</p>
          </div>
          <span className="text-base font-black text-[#7fd0a0]">{cosmetic.price}</span>
        </div>

        {status === "loading" && (
          <div className="flex flex-col items-center justify-center gap-2 py-8 text-[#9c8b68]">
            <Loader2 className="w-6 h-6 animate-spin" />
            <p className="text-xs">Preparando pagamento seguro…</p>
          </div>
        )}

        {status === "error" && (
          <div className="py-6 text-center">
            <p className="text-[13px] text-[#e8846b] font-bold">{err}</p>
            <button onClick={onClose} className="rpg-btn-ghost w-full py-2.5 mt-4 text-xs">Fechar</button>
          </div>
        )}

        {status === "ready" && stripePromise && elementsOptions && (
          <Elements stripe={stripePromise} options={elementsOptions}>
            <PayForm cosmetic={cosmetic} onPurchased={onPurchased} />
          </Elements>
        )}

        {onProve && status !== "loading" && (
          <button onClick={() => { onProve(cosmetic.id); onClose(); }} className="rpg-btn-ghost w-full py-2.5 mt-2 text-xs">
            Só provar primeiro
          </button>
        )}

        <div className="flex items-center justify-center gap-1.5 mt-3 text-[10px] text-[#8a7a58]">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Pagamento seguro via Stripe</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
