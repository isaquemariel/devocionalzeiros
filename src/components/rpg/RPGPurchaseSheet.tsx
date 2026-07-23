import { useState } from "react";
import { motion } from "framer-motion";
import { X, ShieldCheck, CreditCard, Loader2, Check, Plus } from "lucide-react";
import type { Cosmetic } from "@/lib/rpgRewards";
import { PURCHASE_MODE, getSavedCard, saveMockCard, purchaseCosmetic, type SavedCard } from "@/lib/rpgPurchase";

// ============================================================================
// Compra do guarda-roupa DENTRO da tela (sem sair). Pop-up estilo nativo:
// item + preço, forma de pagamento salva (1-clique) e confirmação, com estados
// de processando / sucesso. Pagamento em modo teste até plugar o Stripe.
// ============================================================================

interface Props { userId: string; cosmetic: Cosmetic; onClose: () => void; onPurchased: (id: string) => void; onProve?: (id: string) => void }

export default function RPGPurchaseSheet({ userId, cosmetic, onClose, onPurchased, onProve }: Props) {
  const [card, setCard] = useState<SavedCard | null>(() => getSavedCard(userId));
  const [phase, setPhase] = useState<"idle" | "paying" | "done">("idle");

  const addCard = () => { saveMockCard(userId); setCard(getSavedCard(userId)); };
  const buy = async () => {
    if (!card || phase !== "idle") return;
    setPhase("paying");
    const r = await purchaseCosmetic(userId, cosmetic.id, cosmetic.price);
    if (r.ok) { setPhase("done"); setTimeout(() => onPurchased(cosmetic.id), 1000); }
    else setPhase("idle");
  };

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
        className="w-full sm:max-w-sm rounded-t-3xl sm:rounded-3xl border-2 border-[#e8b04b] bg-gradient-to-b from-[#141c30] to-[#0b1120] p-5 shadow-[0_-10px_50px_-10px_#000]"
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

        {/* Forma de pagamento (1-clique) */}
        <p className="text-[11px] font-bold text-[#b8a67f] mt-4 mb-1.5">Forma de pagamento</p>
        {card ? (
          <button onClick={addCard} className="w-full flex items-center gap-3 rounded-xl bg-[#0b0f1a] border-2 border-[#2a3550] p-3 text-left">
            <CreditCard className="w-5 h-5 text-[#7fb0ff]" />
            <span className="flex-1 text-sm font-bold text-blue-50">{card.brand} •••• {card.last4}</span>
            <span className="text-[11px] text-[#7fb0ff] font-bold">trocar</span>
          </button>
        ) : (
          <button onClick={addCard} className="w-full flex items-center gap-3 rounded-xl bg-[#0b0f1a] border-2 border-dashed border-[#3a4a68] p-3 text-left">
            <Plus className="w-5 h-5 text-[#7fb0ff]" />
            <span className="flex-1 text-sm font-bold text-blue-50">Adicionar forma de pagamento</span>
          </button>
        )}

        {/* Comprar */}
        <button
          onClick={buy}
          disabled={!card || phase !== "idle"}
          className={`rpg-btn w-full py-3.5 mt-4 inline-flex items-center justify-center gap-2 ${!card || phase !== "idle" ? "opacity-60" : ""}`}
        >
          {phase === "done" ? (<><Check className="w-5 h-5" /> Comprado!</>)
            : phase === "paying" ? (<><Loader2 className="w-5 h-5 animate-spin" /> Processando…</>)
            : (<>Comprar por {cosmetic.price}</>)}
        </button>

        {onProve && phase === "idle" && (
          <button onClick={() => { onProve(cosmetic.id); onClose(); }} className="rpg-btn-ghost w-full py-2.5 mt-2 text-xs">
            Só provar primeiro
          </button>
        )}

        <div className="flex items-center justify-center gap-1.5 mt-3 text-[10px] text-[#8a7a58]">
          <ShieldCheck className="w-3.5 h-3.5" />
          {PURCHASE_MODE === "mock"
            ? <span>Ambiente de teste — pagamento simulado (Stripe entra depois)</span>
            : <span>Pagamento seguro via Stripe</span>}
        </div>
      </motion.div>
    </motion.div>
  );
}
