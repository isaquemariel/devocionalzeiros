import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock, Check, ShoppingBag, Sparkles } from "lucide-react";
import RPGMascotCanvas from "@/components/rpg/RPGMascotCanvas";
import type { MascotLook } from "@/lib/rpgMascot";
import {
  COSMETICS,
  DIVISIONS,
  computeEarned,
  addOwned,
  getOwned,
  getEquip,
  toggleEquip,
  equipToLook,
  isDivisionComplete,
  type Cosmetic,
  type Slot,
} from "@/lib/rpgRewards";

interface RPGWardrobeProps {
  userId: string;
  getBookProgress: (bookIndex: number) => { completed: number; total: number; percent: number };
}

const RPGWardrobe = ({ userId, getBookProgress }: RPGWardrobeProps) => {
  // recompensas ganhas → viram "owned"
  const earned = useMemo(() => computeEarned(getBookProgress), [getBookProgress]);
  useEffect(() => {
    if (earned.length) addOwned(userId, earned);
  }, [earned, userId]);

  const [owned] = useState<Set<string>>(() => {
    const o = getOwned(userId);
    earned.forEach((id) => o.add(id));
    return o;
  });
  const [equip, setEquipState] = useState<Partial<Record<Slot, string>>>(() => getEquip(userId));
  const look: MascotLook = equipToLook(equip);

  const onToggle = (id: string) => setEquipState({ ...toggleEquip(userId, id) });
  const clearAll = () => {
    (Object.keys(equip) as Slot[]).forEach((s) => toggleEquip(userId, equip[s]!));
    setEquipState({});
  };

  const rewards = COSMETICS.filter((c) => c.source === "reward");
  const shop = COSMETICS.filter((c) => c.source === "shop");
  const isEquipped = (c: Cosmetic) => equip[c.slot] === c.id;

  // divisão de origem de cada recompensa (pra mostrar progresso)
  const divisionOf = (id: string) => DIVISIONS.find((d) => d.rewardIds.includes(id));

  const Item = ({ c }: { c: Cosmetic }) => {
    const unlocked = owned.has(c.id);
    const equipped = isEquipped(c);
    return (
      <button
        onClick={() => onToggle(c.id)}
        className={`relative flex flex-col items-center gap-1 rounded-xl p-2.5 border-2 transition-all text-center ${
          equipped
            ? "border-[#ffd889] bg-[#e8b04b]/15"
            : "border-[#3a2c18] bg-[#20180d] hover:border-[#e8b04b]/50"
        }`}
      >
        <span className="text-2xl leading-none">{c.emoji}</span>
        <span className="text-[10px] font-bold text-[#e8dcc4] leading-tight">{c.name}</span>
        {c.source === "shop" ? (
          <span className="text-[9px] text-[#7fd0a0] font-bold">{c.price}</span>
        ) : unlocked ? (
          <span className="inline-flex items-center gap-0.5 text-[9px] text-[#7fd0a0] font-bold">
            <Check className="w-2.5 h-2.5" /> Conquistado
          </span>
        ) : (
          <span className="inline-flex items-center gap-0.5 text-[9px] text-[#b8a67f]">
            <Lock className="w-2.5 h-2.5" /> Bloqueado
          </span>
        )}
        {equipped && (
          <span className="absolute -top-1.5 -right-1.5 bg-[#ffd889] text-[#1a1206] text-[8px] font-black rounded-full px-1.5 py-0.5 border border-[#0b0805]">
            no corpo
          </span>
        )}
      </button>
    );
  };

  return (
    <motion.div key="wardrobe" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="h-full flex flex-col gap-3">
      {/* Preview */}
      <div className="rpg-panel p-4 relative overflow-hidden shrink-0">
        <div className="absolute inset-0 opacity-70" style={{ background: "radial-gradient(90% 70% at 50% 30%, #26375a, #0e1526 70%)" }} />
        <div className="relative z-10 flex flex-col items-center">
          <span className="rpg-eyebrow mb-1">Seu Devocionalzeiro</span>
          <RPGMascotCanvas look={look} mood="happy" size={150} />
          <div className="mt-2 flex gap-2">
            <button onClick={clearAll} className="rpg-btn-ghost px-3 py-1.5 text-[11px]">
              Tirar tudo
            </button>
          </div>
        </div>
      </div>

      {/* Áreas roláveis internamente (recompensas + loja) */}
      <div className="flex-1 min-h-0 overflow-y-auto space-y-4 pr-1">
      {/* Recompensas por divisão */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-[#e8b04b]" />
          <h3 className="rpg-title text-sm">Recompensas da <span className="hl">Jornada</span></h3>
        </div>
        <p className="text-[11px] text-[#b8a67f] mb-3">
          Conclua cada divisão da Bíblia para desbloquear visuais — e a Bíblia inteira te torna o <b className="text-[#ffd889]">Fiel</b>, com a Armadura de Deus.
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {rewards.map((c) => {
            const d = divisionOf(c.id);
            const complete = d ? isDivisionComplete(d, getBookProgress) : owned.has(c.id);
            return (
              <div key={c.id}>
                <Item c={c} />
                {!complete && c.unlockText && (
                  <p className="text-[8.5px] text-[#8a7a58] mt-1 leading-tight text-center">{c.unlockText}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Loja */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <ShoppingBag className="w-4 h-4 text-[#7fd0a0]" />
          <h3 className="rpg-title text-sm">Loja de <span className="hl">Acessórios</span></h3>
        </div>
        <p className="text-[11px] text-[#b8a67f] mb-3">
          Deixe {`o herói`} com a sua cara. Acessórios a partir de R$ 1,90, trajes a partir de R$ 4,90.
          <span className="block text-[#8a7a58] mt-0.5">Compra chega em breve — por enquanto você pode provar os visuais.</span>
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {shop.map((c) => (
            <Item key={c.id} c={c} />
          ))}
        </div>
      </div>
      </div>
    </motion.div>
  );
};

export default RPGWardrobe;
