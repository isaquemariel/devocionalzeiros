import { useState } from "react";
import { motion } from "framer-motion";
import { X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { createTalentCheckout, type CheckoutInit } from "@/lib/stripeCheckout";
import StripeCheckoutModal from "@/components/checkout/StripeCheckoutModal";

const RATE = 20;              // R$ 1 = 20 talentos
const MIN_REAIS = 5;
const PRESETS = [5, 10, 25, 50];

export default function RPGBuyTalentsModal({ onClose, onPurchased }: { onClose: () => void; onPurchased: () => void }) {
  const [reais, setReais] = useState(10);
  const [loading, setLoading] = useState(false);
  const [init, setInit] = useState<CheckoutInit | null>(null);

  const talents = Math.max(0, Math.floor(reais * RATE));

  const start = async () => {
    if (!Number.isFinite(reais) || reais < MIN_REAIS) { toast.error(`Valor mínimo: R$ ${MIN_REAIS}`); return; }
    setLoading(true);
    try {
      const res = await createTalentCheckout(Math.round(reais * 100));
      setInit(res);
    } catch (e) {
      toast.error((e as Error).message || "Falha ao iniciar o pagamento");
    } finally {
      setLoading(false);
    }
  };

  if (init) {
    return (
      <StripeCheckoutModal
        init={init}
        title={`Comprar ${talents} talentos`}
        onClose={onClose}
        onSuccess={() => { toast.success(`+${talents} talentos creditados! 🪙`); onPurchased(); }}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:max-w-sm rounded-t-2xl sm:rounded-2xl border-2 border-[#e8b04b] p-5"
        style={{ background: "linear-gradient(180deg,#1c1710,#0c0a06)" }}
      >
        <div className="flex items-center justify-between mb-3">
          <p className="font-black text-[#ffd889]">Comprar Talentos</p>
          <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center" aria-label="Fechar">
            <X className="w-5 h-5 text-white/60" />
          </button>
        </div>

        <div className="text-center mb-4">
          <div className="text-5xl mb-1">🪙</div>
          <p className="text-3xl font-black text-[#ffd54a] leading-none">{talents}</p>
          <p className="text-[11px] text-white/50 mt-1">talentos por R$ {reais.toFixed(2).replace(".", ",")}</p>
        </div>

        <div className="grid grid-cols-4 gap-1.5 mb-3">
          {PRESETS.map((v) => (
            <button
              key={v}
              onClick={() => setReais(v)}
              className={`py-2 rounded-lg text-[13px] font-black border-2 transition ${
                reais === v ? "border-[#ffd889] bg-[#e8b04b]/25 text-[#ffd889]" : "border-[#3a2c18] bg-[#20180d] text-[#cdbfa0]"
              }`}
            >
              R$ {v}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 mb-4 bg-[#20180d] border border-[#3a2c18] rounded-lg px-3 py-2">
          <span className="text-sm text-[#b8a67f] font-bold">R$</span>
          <input
            type="number"
            min={MIN_REAIS}
            step={1}
            value={reais}
            onChange={(e) => setReais(Math.max(0, Math.floor(Number(e.target.value) || 0)))}
            className="flex-1 bg-transparent outline-none text-white font-black text-lg"
            placeholder="Outro valor"
          />
        </div>

        <button
          onClick={start}
          disabled={loading || reais < MIN_REAIS}
          className="w-full py-3 rounded-xl font-black text-[#2a1c05] bg-gradient-to-b from-[#ffe08a] to-[#e8b04b] active:scale-95 transition disabled:opacity-60 inline-flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : `Comprar por R$ ${reais.toFixed(2).replace(".", ",")}`}
        </button>
        <p className="text-[10px] text-white/40 text-center mt-2">Pagamento seguro via Stripe. Os talentos entram no seu saldo após a compra.</p>
      </motion.div>
    </motion.div>
  );
}
