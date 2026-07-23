import { useMemo, useState } from "react";
import { loadStripe, type Stripe } from "@stripe/stripe-js";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { motion } from "framer-motion";
import { X, Loader2, CheckCircle2 } from "lucide-react";
import { getCheckoutStatus, type CheckoutInit } from "@/lib/stripeCheckout";

// Checkout nativo (Embedded) da Stripe dentro do app — sem sair da tela.
const stripeCache = new Map<string, Promise<Stripe | null>>();
function stripeFor(pk: string) {
  if (!stripeCache.has(pk)) stripeCache.set(pk, loadStripe(pk));
  return stripeCache.get(pk)!;
}

interface Props {
  init: CheckoutInit;
  title?: string;
  onClose: () => void;
  onSuccess: () => void;
}

export default function StripeCheckoutModal({ init, title = "Pagamento", onClose, onSuccess }: Props) {
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
      className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:max-w-lg max-h-[92vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl bg-white shadow-2xl"
      >
        <div className="sticky top-0 flex items-center justify-between px-4 py-3 border-b bg-white z-10">
          <p className="font-bold text-sm text-gray-800">{title}</p>
          <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center" aria-label="Fechar">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        {done ? (
          <div className="flex flex-col items-center justify-center gap-3 py-16 text-center px-6">
            <CheckCircle2 className="w-14 h-14 text-green-500" />
            <p className="font-bold text-gray-800">Pagamento concluído!</p>
            <p className="text-sm text-gray-500">Liberando seu acesso…</p>
            <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
          </div>
        ) : (
          <div className="p-1">
            <EmbeddedCheckoutProvider stripe={stripePromise} options={{ clientSecret: init.clientSecret, onComplete: handleComplete }}>
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
