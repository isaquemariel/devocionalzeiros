import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Check, RotateCcw, ShoppingCart, Gift, Sparkles, Loader2, Plus } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import RPGMascotCanvas from "@/components/rpg/RPGMascotCanvas";
import RPGPurchaseSheet from "@/components/rpg/RPGPurchaseSheet";
import RPGBuyTalentsModal from "@/components/rpg/RPGBuyTalentsModal";
import { useRPGTalents } from "@/hooks/useRPGTalents";
import type { MascotLook } from "@/lib/rpgMascot";
import { drawScene, seedParticles, type Particle, type SceneDims } from "@/lib/rpgScene";
import {
  COSMETICS,
  COSMETIC_BY_ID,
  computeEarned,
  rewardProgress,
  addOwned,
  getOwned,
  getEquip,
  setEquip,
  equipToLook,
  ownedFilter,
  pushCosmeticsToDB,
  shopCurrency,
  talentPrice,
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
  { id: "cores", name: "Cores", icon: "🎨", slots: ["color"] },
  { id: "acessorios", name: "Acessórios", icon: "💎", slots: ["head", "glasses", "beard", "wings", "aura"] },
  { id: "armas", name: "Armas", icon: "⚔️", slots: ["shield", "sword", "weapon"] },
  { id: "trajes", name: "Trajes", icon: "🧥", slots: ["robe"] },
  { id: "montarias", name: "Montarias", icon: "🐎", slots: ["mount"] },
  { id: "mascotes", name: "Mascotes", icon: "🕊️", slots: ["pet"] },
];

// fundo bíblico (Criação — estrelado escuro), com destaque no boneco
const BG_W = 200;
const BG_H = 300;
const DIMS: SceneDims = { W: BG_W, H: BG_H, GROUND: 250 };

// Conjunto do que a pessoa REALMENTE possui p/ equipar/persistir: compras +
// recompensas RESGATADAS (getOwned) + a cor azul original (grátis). Admin = tudo.
// (getAllOwned do gameplay continua intacto; aqui o boneco só fixa o que é dela.)
function buildAvailable(userId: string, isAdmin: boolean): Set<string> {
  if (isAdmin) return new Set(COSMETICS.map((c) => c.id));
  const s = getOwned(userId);
  s.add("color:blue");
  return s;
}

const RPGWardrobe = ({ userId, getBookProgress, isAdmin = false }: RPGWardrobeProps) => {
  // ownedVersion: recomputa "disponível" após comprar/resgatar (some o preço/lock na hora)
  const [ownedVersion, setOwnedVersion] = useState(0);
  const available = useMemo(() => buildAvailable(userId, isAdmin), [userId, isAdmin, ownedVersion]);
  // recompensas cuja META está 100% concluída (elegíveis a resgate)
  const earnedSet = useMemo(() => new Set(computeEarned(getBookProgress)), [getBookProgress]);

  // Prévia do que está no boneco (pode conter peça só PROVADA, temporária). Abre
  // só com o que a pessoa possui de fato — nunca fixa item não adquirido.
  const [preview, setPreview] = useState<Partial<Record<Slot, string>>>(() =>
    ownedFilter(getEquip(userId), buildAvailable(userId, isAdmin)),
  );
  const [cat, setCat] = useState("acessorios");
  const [sel, setSel] = useState<Cosmetic | null>(null); // peça em foco → painel de ação
  const [buying, setBuying] = useState<Cosmetic | null>(null);

  // Carteira de Talentos (compra por moeda + comprar talentos)
  const { balance: talents, refetch: refetchTalents, setBalance: setTalents } = useRPGTalents(userId);
  const [talentBuyingId, setTalentBuyingId] = useState<string | null>(null);
  const [buyTalentsOpen, setBuyTalentsOpen] = useState(false);
  const [pulse, setPulse] = useState(0);
  const [reacting, setReacting] = useState(false);
  const reactTimer = useRef<ReturnType<typeof setTimeout>>();

  const look: MascotLook = equipToLook(preview);
  const mood = reacting ? "happy" : "idle";

  const react = () => {
    setReacting(true);
    setPulse((p) => p + 1);
    clearTimeout(reactTimer.current);
    reactTimer.current = setTimeout(() => setReacting(false), 1000);
  };

  // Clicar numa peça = PROVAR (prévia). Só persiste o que a pessoa possui.
  const onSelect = (c: Cosmetic) => {
    const wasOn = preview[c.slot] === c.id;
    const next = { ...preview };
    if (wasOn) delete next[c.slot]; else next[c.slot] = c.id;
    setPreview(next);
    setEquip(userId, ownedFilter(next, available)); // nunca fixa item não adquirido
    pushCosmeticsToDB(userId);
    setSel(wasOn ? null : c); // provou → mostra ação; tirou → esconde
    react();
  };

  // Concede um item (compra ou resgate), veste e guarda na conta.
  const grant = (id: string) => {
    addOwned(userId, [id]);
    setOwnedVersion((v) => v + 1);
    const availNow = new Set([...available, id]);
    const c = COSMETIC_BY_ID[id];
    const next = { ...preview, [c.slot]: id };
    setPreview(next);
    setEquip(userId, ownedFilter(next, availNow));
    pushCosmeticsToDB(userId);
    setSel(c);
    react();
  };

  const onPurchased = (id: string) => { setBuying(null); grant(id); };

  // Compra um item com TALENTOS (validado no servidor). Admin não precisa.
  const buyWithTalents = async (c: Cosmetic) => {
    const price = talentPrice(c.id);
    if (price == null || talentBuyingId) return;
    if (talents < price) { toast.error(`Faltam ${price - talents} talentos`); return; }
    setTalentBuyingId(c.id);
    try {
      const { data, error } = await supabase.rpc("rpg_buy_cosmetic_with_talents" as never, { p_cosmetic_id: c.id } as never);
      const res = data as { ok?: boolean; balance?: number } | null;
      if (error || !res?.ok) throw new Error((error as { message?: string } | null)?.message || "Não foi possível comprar");
      setTalents(res.balance ?? talents - price);
      grant(c.id);
      toast.success(`${c.name} adquirido com talentos! 🪙`);
    } catch (e) {
      toast.error((e as Error).message || "Erro na compra");
    } finally {
      setTalentBuyingId(null);
    }
  };

  const clearAll = () => {
    setPreview({});
    setEquip(userId, {});
    pushCosmeticsToDB(userId);
    setSel(null);
    react();
  };

  // Estado do painel de ação da peça em foco
  const selState = useMemo(() => {
    if (!sel) return null;
    if (available.has(sel.id)) return { kind: "owned" as const };
    if (sel.source === "shop") return { kind: "buy" as const };
    const prog = rewardProgress(sel.id, getBookProgress);
    if (prog?.complete) return { kind: "claim" as const, prog };
    return { kind: "progress" as const, prog };
  }, [sel, available, getBookProgress]);

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
    const rand = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
    const particles: Particle[] = seedParticles("creation", DIMS, rand);
    let t = 0, last = 0, raf = 0, mounted = true;
    const frame = (now: number) => {
      if (!mounted) return;
      const dt = Math.min(48, now - last || 16);
      last = now; t += dt;
      g.clearRect(0, 0, BG_W, BG_H);
      drawScene(g, { region: "creation", dims: DIMS, particles, t, scroll: 0, reduce });
      if (reduce) return;
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => { mounted = false; if (raf) cancelAnimationFrame(raf); };
  }, []);

  const activeCat = CATS.find((c) => c.id === cat)!;
  const items = COSMETICS.filter((c) => activeCat.slots.includes(c.slot));

  return (
    <motion.div key="wardrobe" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} className="h-full flex flex-col gap-2">
      {/* Carteira de Talentos: saldo + comprar mais */}
      <div className="shrink-0 flex items-center justify-between px-1">
        <div className="flex items-center gap-1.5 bg-[#20180d] border border-[#e8b04b55] rounded-lg px-2.5 py-1">
          <span className="text-sm leading-none" aria-hidden="true">🪙</span>
          <span className="text-sm font-black text-[#ffd889]">{talents}</span>
          <span className="text-[10px] text-[#b8a67f]">talentos</span>
        </div>
        <button
          onClick={() => setBuyTalentsOpen(true)}
          className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1.5 rounded-lg bg-[#e8b04b] text-[#1a1206] hover:bg-[#f0bd5e] active:scale-95 transition"
        >
          <Plus className="w-3.5 h-3.5" /> Comprar talentos
        </button>
      </div>

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

        {/* Palco do personagem */}
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

          {/* Painel de ação da peça em foco (provar → adquirir/resgatar) */}
          <AnimatePresence>
            {sel && selState && selState.kind !== "owned" && (
              <motion.div
                key={sel.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                className="absolute left-2 right-2 bottom-2"
              >
                <div className="rounded-xl bg-[#0b1120]/92 border border-[#e8b04b55] backdrop-blur-sm p-2.5">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-lg leading-none">{sel.emoji}</span>
                    <span className="text-[12px] font-black text-white truncate flex-1">{sel.name}</span>
                    <span className="text-[9px] text-white/45">provando</span>
                  </div>

                  {selState.kind === "buy" && (() => {
                    const cur = shopCurrency(sel.id);
                    const tp = talentPrice(sel.id);
                    const insufficient = tp != null && talents < tp;
                    return (
                      <div className="flex flex-col gap-1.5">
                        {(cur === "money" || cur === "both") && (
                          <button
                            onClick={() => setBuying(sel)}
                            className="w-full py-2.5 rounded-lg font-black text-[13px] text-[#1a1206] bg-[#e8b04b] hover:bg-[#f0bd5e] active:scale-[0.98] transition inline-flex items-center justify-center gap-2"
                          >
                            <ShoppingCart className="w-4 h-4" /> Comprar · {sel.price}
                          </button>
                        )}
                        {(cur === "talents" || cur === "both") && tp != null && (
                          <button
                            onClick={() => buyWithTalents(sel)}
                            disabled={insufficient || talentBuyingId === sel.id}
                            className={`w-full py-2.5 rounded-lg font-black text-[13px] active:scale-[0.98] transition inline-flex items-center justify-center gap-2 ${
                              insufficient
                                ? "bg-[#2a2113] text-[#8a7a58] cursor-not-allowed"
                                : "bg-[#ffd54a] text-[#2a1c05] hover:bg-[#ffe08a]"
                            }`}
                          >
                            {talentBuyingId === sel.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <>🪙 {insufficient ? `Faltam ${tp - talents}` : `Comprar · ${tp}`}</>
                            )}
                          </button>
                        )}
                      </div>
                    );
                  })()}

                  {selState.kind === "claim" && (
                    <button
                      onClick={() => grant(sel.id)}
                      className="w-full py-2.5 rounded-lg font-black text-[13px] text-[#06231a] bg-emerald-400 hover:bg-emerald-300 active:scale-[0.98] transition inline-flex items-center justify-center gap-2"
                    >
                      <Gift className="w-4 h-4" /> Resgatar recompensa
                    </button>
                  )}

                  {selState.kind === "progress" && selState.prog && (
                    <div>
                      <div className="flex items-center justify-between text-[10px] mb-1">
                        <span className="text-[#cdbfa0] font-semibold truncate">{selState.prog.label}</span>
                        <span className="text-[#ffd889] font-black shrink-0 ml-2">{selState.prog.done}/{selState.prog.total} cap.</span>
                      </div>
                      <div className="h-2 rounded-full bg-black/50 overflow-hidden border border-white/10">
                        <div className="h-full bg-gradient-to-r from-[#e8b04b] to-[#ffd889] transition-all" style={{ width: `${selState.prog.percent}%` }} />
                      </div>
                      <p className="text-[9.5px] text-white/55 mt-1 inline-flex items-center gap-1">
                        <Lock className="w-2.5 h-2.5" /> Conclua a leitura desses livros para resgatar
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bandeja de peças da categoria ativa */}
      <div className="shrink-0 min-w-0">
        <div className="flex items-center justify-between mb-1.5 px-0.5">
          <p className="text-[11px] font-bold text-[#e8b04b]">{activeCat.icon} {activeCat.name}</p>
          <span className="text-[9px] text-[#8a7a58]">toque p/ provar {items.length > 4 ? "· arraste ›" : ""}</span>
        </div>
        <div
          className="flex flex-nowrap gap-2 overflow-x-auto pb-2 -mx-1 px-1"
          style={{ touchAction: "pan-x", WebkitOverflowScrolling: "touch", scrollbarWidth: "thin" }}
        >
          {items.map((c) => {
            const has = available.has(c.id);
            const equipped = preview[c.slot] === c.id;
            const claimable = !has && c.source !== "shop" && earnedSet.has(c.id);
            return (
              <button
                key={c.id}
                onClick={() => onSelect(c)}
                className={`relative shrink-0 w-[68px] flex flex-col items-center gap-0.5 rounded-xl p-2 border-2 transition-all ${
                  equipped ? "border-[#ffd889] bg-[#e8b04b]/20" : claimable ? "border-emerald-500/60 bg-emerald-500/10" : "border-[#3a2c18] bg-[#20180d]"
                }`}
              >
                <span className="text-2xl leading-none">{c.emoji}</span>
                <span className="text-[8.5px] font-bold text-[#cdbfa0] leading-tight text-center line-clamp-2 min-h-[2.1em]">{c.name}</span>
                {has ? (
                  <Check className="w-3 h-3 text-[#7fd0a0]" />
                ) : c.source === "shop" ? (
                  shopCurrency(c.id) === "money" ? (
                    <span className="text-[8px] text-[#7fd0a0] font-bold">{c.price}</span>
                  ) : (
                    <span className="text-[8px] text-[#ffd889] font-bold">🪙 {talentPrice(c.id)}</span>
                  )
                ) : claimable ? (
                  <span className="text-[7.5px] text-emerald-300 font-black inline-flex items-center gap-0.5"><Gift className="w-2.5 h-2.5" />Resgatar</span>
                ) : (
                  <Lock className="w-3 h-3 text-[#8a7a58]" />
                )}
                {equipped && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#ffd889] text-[#1a1206] text-[7px] font-black rounded-full px-1 py-0.5 border border-[#0b0805]">✓</span>
                )}
                {claimable && !equipped && (
                  <motion.span
                    animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1.6, repeat: Infinity }}
                    className="absolute -top-1.5 -right-1.5"
                  ><Sparkles className="w-3.5 h-3.5 text-emerald-300" /></motion.span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Checkout nativo (só ao clicar em Adquirir) */}
      <AnimatePresence>
        {buying && (
          <RPGPurchaseSheet
            userId={userId}
            cosmetic={buying}
            onClose={() => setBuying(null)}
            onPurchased={onPurchased}
          />
        )}
      </AnimatePresence>

      {/* Comprar talentos (doação → moeda, via Stripe) */}
      <AnimatePresence>
        {buyTalentsOpen && (
          <RPGBuyTalentsModal
            onClose={() => setBuyTalentsOpen(false)}
            onPurchased={() => { setBuyTalentsOpen(false); refetchTalents(); }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default RPGWardrobe;
