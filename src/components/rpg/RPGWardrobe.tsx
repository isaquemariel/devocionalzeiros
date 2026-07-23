import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Check, RotateCcw } from "lucide-react";
import RPGMascotCanvas from "@/components/rpg/RPGMascotCanvas";
import RPGPurchaseSheet from "@/components/rpg/RPGPurchaseSheet";
import type { MascotLook } from "@/lib/rpgMascot";
import { drawScene, seedParticles, type Particle, type SceneDims } from "@/lib/rpgScene";
import {
  COSMETICS,
  COSMETIC_BY_ID,
  computeEarned,
  addOwned,
  getAllOwned,
  getEquip,
  setEquip,
  equipToLook,
  ownedFilter,
  pushCosmeticsToDB,
  type Cosmetic,
  type Slot,
} from "@/lib/rpgRewards";

interface RPGWardrobeProps {
  userId: string;
  getBookProgress: (bookIndex: number) => { completed: number; total: number; percent: number };
  isAdmin?: boolean;
}

// Categorias na lateral
const CATS: { id: string; name: string; icon: string; slots: Slot[] }[] = [
  { id: "acessorios", name: "Acessórios", icon: "💎", slots: ["head", "glasses", "wings"] },
  { id: "armas", name: "Armas", icon: "⚔️", slots: ["shield", "sword"] },
  { id: "trajes", name: "Trajes", icon: "🧥", slots: ["robe"] },
];

// fundo bíblico (Criação — estrelado escuro), com destaque no boneco
const BG_W = 200;
const BG_H = 300;
const DIMS: SceneDims = { W: BG_W, H: BG_H, GROUND: 250 };

const RPGWardrobe = ({ userId, getBookProgress, isAdmin = false }: RPGWardrobeProps) => {
  // recompensas ganhas viram "owned"
  const earned = useMemo(() => computeEarned(getBookProgress), [getBookProgress]);
  useEffect(() => {
    if (earned.length) { addOwned(userId, earned); pushCosmeticsToDB(userId); }
  }, [earned, userId]);
  // ownedVersion força recomputar o "owned" logo após comprar (preço some na hora)
  const [ownedVersion, setOwnedVersion] = useState(0);
  const owned = useMemo(() => getAllOwned(userId, getBookProgress), [userId, getBookProgress, ownedVersion]);
  // admin pode vestir qualquer peça (tudo conta como possuído)
  const effectiveOwned = useMemo(() => (isAdmin ? new Set(COSMETICS.map((c) => c.id)) : owned), [isAdmin, owned]);

  // Prévia do que está no boneco no guarda-roupa (pode incluir peças provadas,
  // temporárias). Abre só com o que a pessoa POSSUI (limpa qualquer peça que
  // tenha sido só provada antes). Só o possuído é persistido (ver applyToggle).
  const [preview, setPreview] = useState<Partial<Record<Slot, string>>>(() =>
    isAdmin ? getEquip(userId) : ownedFilter(getEquip(userId), getAllOwned(userId, getBookProgress)),
  );
  const [cat, setCat] = useState("acessorios");
  const [popup, setPopup] = useState<Cosmetic | null>(null);
  const [buying, setBuying] = useState<Cosmetic | null>(null);
  const [pulse, setPulse] = useState(0);
  const [reacting, setReacting] = useState(false);
  const reactTimer = useRef<ReturnType<typeof setTimeout>>();

  const look: MascotLook = equipToLook(preview);
  const mood = reacting ? "happy" : "idle"; // comemora a cada troca (percepção de mudança)

  const react = () => {
    setReacting(true);
    setPulse((p) => p + 1);
    clearTimeout(reactTimer.current);
    reactTimer.current = setTimeout(() => setReacting(false), 1000);
  };

  const applyToggle = (id: string) => {
    setPreview((prev) => {
      const c = COSMETIC_BY_ID[id];
      const next = { ...prev };
      if (next[c.slot] === id) delete next[c.slot];
      else next[c.slot] = id;
      // PROVAR é só prévia (fica no `preview`, temporário). Só PERSISTE o que a
      // pessoa realmente possui (ganho ou comprado) — nunca item apenas provado.
      setEquip(userId, ownedFilter(next, effectiveOwned));
      pushCosmeticsToDB(userId);
      return next;
    });
    react();
  };

  const onSelect = (c: Cosmetic) => {
    // já vestido → tira (não precisa provar de novo)
    if (preview[c.slot] === c.id) { applyToggle(c.id); return; }
    // possuído (ou admin) → veste direto
    if (effectiveOwned.has(c.id)) { applyToggle(c.id); return; }
    // item da loja → compra dentro da tela; recompensa bloqueada → como obter
    if (c.source === "shop") setBuying(c);
    else setPopup(c);
  };

  // compra concluída → concede o item (agora é possuído), veste e guarda na conta
  const onPurchased = (id: string) => {
    addOwned(userId, [id]);
    setOwnedVersion((v) => v + 1); // recomputa "owned": preço some e fica liberado
    setBuying(null);
    const ownedNow = new Set([...effectiveOwned, id]);
    setPreview((prev) => {
      const c = COSMETIC_BY_ID[id];
      const next = { ...prev, [c.slot]: id };
      setEquip(userId, ownedFilter(next, ownedNow));
      return next;
    });
    pushCosmeticsToDB(userId);
    react();
  };

  const clearAll = () => {
    setPreview({});
    setEquip(userId, {});
    pushCosmeticsToDB(userId);
    react();
  };

  // fundo (cena Criação escura)
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = BG_W;
    canvas.height = BG_H;
    const g = canvas.getContext("2d");
    if (!g) return;
    g.imageSmoothingEnabled = false;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seed = 11;
    const rand = () => {
      seed = (seed * 1103515245 + 12345) & 0x7fffffff;
      return seed / 0x7fffffff;
    };
    const particles: Particle[] = seedParticles("creation", DIMS, rand);
    let t = 0;
    let last = 0;
    let raf = 0;
    let mounted = true;
    const frame = (now: number) => {
      if (!mounted) return;
      const dt = Math.min(48, now - last || 16);
      last = now;
      t += dt;
      g.clearRect(0, 0, BG_W, BG_H);
      drawScene(g, { region: "creation", dims: DIMS, particles, t, scroll: 0, reduce });
      if (reduce) return;
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      mounted = false;
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const activeCat = CATS.find((c) => c.id === cat)!;
  const items = COSMETICS.filter((c) => activeCat.slots.includes(c.slot));

  return (
    <motion.div key="wardrobe" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} className="h-full flex flex-col gap-2">
      <div className="flex-1 min-h-0 flex flex-row-reverse gap-2">
        {/* Categorias (lateral direita) */}
        <div className="w-16 shrink-0 flex flex-col gap-2">
          {CATS.map((c) => (
            <button
              key={c.id}
              onClick={() => setCat(c.id)}
              className={`flex flex-col items-center gap-0.5 py-2.5 rounded-xl border-2 transition-all ${
                cat === c.id ? "border-[#ffd889] bg-[#e8b04b]/20" : "border-[#3a2c18] bg-[#20180d]"
              }`}
            >
              <span className="text-xl leading-none">{c.icon}</span>
              <span className="text-[8.5px] font-bold text-[#cdbfa0] leading-tight text-center">{c.name}</span>
            </button>
          ))}
          <button onClick={clearAll} className="mt-auto flex flex-col items-center gap-0.5 py-2 rounded-xl border-2 border-[#3a2c18] bg-[#20180d] text-[#b8a67f]">
            <RotateCcw className="w-4 h-4" />
            <span className="text-[8px] font-bold leading-tight">Tirar</span>
          </button>
        </div>

        {/* Palco do personagem (fundo bíblico escuro, destaque no boneco) */}
        <div className="flex-1 relative rounded-2xl overflow-hidden border-2 border-[#3a2c18]">
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover" style={{ imageRendering: "pixelated" }} aria-hidden="true" />
          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-0" style={{ background: "radial-gradient(52% 40% at 50% 54%, rgba(255,224,150,0.22), rgba(255,224,150,0.06) 45%, transparent 72%)" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(120% 80% at 50% 120%, transparent 55%, rgba(0,0,0,.6) 100%)" }} />
          <div className="absolute inset-0 pointer-events-none mix-blend-multiply" style={{ background: "repeating-linear-gradient(180deg, rgba(0,0,0,0) 0 2px, rgba(0,0,0,.14) 2px 3px)" }} />

          <span className="absolute top-2 left-0 right-0 text-center rpg-eyebrow">Seu Devocionalzeiro</span>

          <motion.div
            key={pulse}
            initial={{ scale: 0.94 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            className="absolute inset-0 flex items-center justify-center pb-2"
          >
            <RPGMascotCanvas look={look} mood={mood} size={232} />
          </motion.div>
        </div>
      </div>

      {/* Bandeja de peças da categoria ativa — rola na horizontal p/ ver todos */}
      <div className="shrink-0 min-w-0">
        <div className="flex items-center justify-between mb-1.5 px-0.5">
          <p className="text-[11px] font-bold text-[#e8b04b]">{activeCat.icon} {activeCat.name}</p>
          {items.length > 4 && <span className="text-[9px] text-[#8a7a58]">arraste ›</span>}
        </div>
        <div
          className="flex flex-nowrap gap-2 overflow-x-auto pb-2 -mx-1 px-1"
          style={{ touchAction: "pan-x", WebkitOverflowScrolling: "touch", scrollbarWidth: "thin" }}
        >
          {items.map((c) => {
            const isOwned = owned.has(c.id);
            const equipped = preview[c.slot] === c.id;
            return (
              <button
                key={c.id}
                onClick={() => onSelect(c)}
                className={`relative shrink-0 w-[68px] flex flex-col items-center gap-0.5 rounded-xl p-2 border-2 transition-all ${
                  equipped ? "border-[#ffd889] bg-[#e8b04b]/20" : "border-[#3a2c18] bg-[#20180d]"
                }`}
              >
                <span className="text-2xl leading-none">{c.emoji}</span>
                <span className="text-[8.5px] font-bold text-[#cdbfa0] leading-tight text-center line-clamp-2 min-h-[2.1em]">{c.name}</span>
                {isOwned ? (
                  <Check className="w-3 h-3 text-[#7fd0a0]" />
                ) : c.source === "shop" ? (
                  <span className="text-[8px] text-[#7fd0a0] font-bold">{c.price}</span>
                ) : (
                  <Lock className="w-3 h-3 text-[#8a7a58]" />
                )}
                {equipped && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#ffd889] text-[#1a1206] text-[7px] font-black rounded-full px-1 py-0.5 border border-[#0b0805]">✓</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Pop-up: como obter uma peça bloqueada / item da loja */}
      <AnimatePresence>
        {popup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[62] flex items-center justify-center p-5 bg-[#05070cf2] backdrop-blur-sm"
            onClick={() => setPopup(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xs rounded-2xl border-2 border-[#e8b04b] bg-gradient-to-br from-[#141c30] to-[#0b1120] p-5 text-center shadow-[0_0_0_2px_#0b0805]"
            >
              <div className="text-4xl mb-2">{popup.emoji}</div>
              <h3 className="rpg-title text-base">{popup.name}</h3>
              {popup.source === "shop" ? (
                <>
                  <p className="text-[12px] text-[#b8a67f] mt-2">
                    Item da loja — <b className="text-[#7fd0a0]">{popup.price}</b>.
                  </p>
                  <p className="text-[11px] text-[#8a7a58] mt-1">A compra chega em breve. Você pode provar agora pra ver como fica.</p>
                </>
              ) : (
                <>
                  <p className="inline-flex items-center gap-1 text-[11px] text-[#e8846b] font-bold mt-2">
                    <Lock className="w-3 h-3" /> Bloqueado
                  </p>
                  <p className="text-[12px] text-[#cdbfa0] mt-1">{popup.unlockText}</p>
                </>
              )}
              <div className="flex gap-2 mt-4">
                <button onClick={() => setPopup(null)} className="rpg-btn-ghost flex-1 py-2.5 text-xs">
                  Fechar
                </button>
                <button
                  onClick={() => { applyToggle(popup.id); setPopup(null); }}
                  className="rpg-btn flex-1 py-2.5 text-xs"
                >
                  Provar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Compra dentro da tela (pop-up nativo) */}
      <AnimatePresence>
        {buying && (
          <RPGPurchaseSheet
            userId={userId}
            cosmetic={buying}
            onClose={() => setBuying(null)}
            onPurchased={onPurchased}
            onProve={(id) => applyToggle(id)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default RPGWardrobe;
