import { useState } from "react";
import { motion } from "framer-motion";
import { X, Loader2, Heart } from "lucide-react";
import { createDonationCheckout, type CheckoutInit } from "@/lib/stripeCheckout";
import StripeCheckoutModal from "@/components/checkout/StripeCheckoutModal";

const MIN = 5;
const MAX = 10000;
const SUGESTOES = [10, 20, 50, 100];
const brl = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

/**
 * A doação de valor livre, com a cara da loja do RPG (o mesmo desenho da
 * compra de Talentos). Morava na página antiga de planos; veio para as portas
 * da cidade, que viraram a página oficial de planos.
 */
export default function Doacao({ onClose, onDoou }: { onClose: () => void; onDoou: () => void }) {
  const [valor, setValor] = useState(20);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [init, setInit] = useState<CheckoutInit | null>(null);

  const doar = async () => {
    if (!Number.isFinite(valor) || valor < MIN) { setErro(`O mínimo é ${brl(MIN)}.`); return; }
    if (valor > MAX) { setErro(`O máximo é ${brl(MAX)}.`); return; }
    setErro(null);
    setCarregando(true);
    try {
      setInit(await createDonationCheckout(Math.round(valor * 100)));
    } catch {
      setErro("Não consegui abrir o pagamento agora. Tenta de novo?");
    } finally {
      setCarregando(false);
    }
  };

  if (init) {
    return (
      <StripeCheckoutModal
        init={init}
        title="Doação — Devocionalzeiros"
        item={{ nome: "Doação", detalhe: "Mantém a Palavra no ar pra muita gente", preco: brl(valor), icone: <Heart className="w-6 h-6" fill="currentColor" /> }}
        onClose={onClose}
        onSuccess={onDoou}
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
        className="rpg-root w-full sm:max-w-sm rounded-t-2xl sm:rounded-2xl border-2 border-[#e8b04b] p-5"
        style={{ background: "linear-gradient(180deg,#1c1710,#0c0a06)" }}
        role="dialog"
        aria-label="Fazer uma doação"
      >
        <div className="flex items-center justify-between mb-3">
          <p className="font-black text-[#ffd889]">Apoiar o Devocionalzeiros</p>
          <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center" aria-label="Fechar">
            <X className="w-5 h-5 text-white/60" />
          </button>
        </div>

        <div className="text-center mb-4">
          <Heart className="mx-auto mb-1 h-10 w-10 text-[#e8846b]" fill="currentColor" />
          <p className="text-3xl font-black text-[#ffd54a] leading-none">{brl(valor || 0)}</p>
          <p className="text-[11px] text-white/50 mt-1.5">Cada doação mantém a Bíblia, o devocional e o RPG no ar.</p>
        </div>

        <div className="grid grid-cols-4 gap-1.5 mb-3">
          {SUGESTOES.map((v) => (
            <button
              key={v}
              onClick={() => { setValor(v); setErro(null); }}
              className={`py-2 rounded-lg text-[13px] font-black border-2 transition ${
                valor === v ? "border-[#ffd889] bg-[#e8b04b]/25 text-[#ffd889]" : "border-[#3a2c18] bg-[#20180d] text-[#cdbfa0]"
              }`}
            >
              R$ {v}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 mb-2 bg-[#20180d] border border-[#3a2c18] rounded-lg px-3 py-2">
          <span className="text-sm text-[#b8a67f] font-bold">R$</span>
          <input
            type="number"
            inputMode="numeric"
            min={MIN}
            max={MAX}
            step={1}
            value={valor || ""}
            onChange={(e) => { setValor(Math.max(0, Math.min(MAX, Math.floor(Number(e.target.value) || 0)))); setErro(null); }}
            // "jz-campo": a regra da jornada que vence o fundo branco que o CSS
            // global do tema claro força em todo input
            className="jz-campo flex-1 bg-transparent outline-none text-white font-black text-lg"
            placeholder="Outro valor"
            aria-label="Valor da doação em reais"
          />
        </div>
        {erro && <p className="mb-2 text-[12px] font-bold text-[#e8846b]" role="alert">{erro}</p>}

        <button
          onClick={doar}
          disabled={carregando || valor < MIN}
          className="rpg-btn mt-2 w-full py-3 inline-flex items-center justify-center gap-2"
        >
          {carregando ? <Loader2 className="w-4 h-4 animate-spin" /> : `Doar ${brl(valor || 0)}`}
        </button>
        <p className="text-[10px] text-white/40 text-center mt-2">Pagamento seguro via Stripe. Doação única, sem assinatura.</p>
      </motion.div>
    </motion.div>
  );
}
