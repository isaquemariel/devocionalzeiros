import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import RPGSceneBackdrop from "./RPGSceneBackdrop";
import type { MascotLook } from "@/lib/rpgMascot";

// ============================================================================
// Desafio "Ordene" — minijogo do capítulo, jogado SOBRE a cena viva.
// Genesis 1: ordenar os 6 dias da Criação. Novos capítulos entram em ORDER.
// ============================================================================

interface OrderItem { d: number; em: string; l: string }
interface OrderCfg { title: string; sub: string; verse: number; items: OrderItem[]; win?: string }

const ORDER: Record<string, OrderCfg> = {
  "genesis:1": {
    title: "Ordene os dias da Criação",
    sub: "Coloque os 6 dias na sequência certa — toque nas cartas para posicioná-las.",
    verse: 31,
    win: "🎉 Você ordenou a Criação!",
    items: [
      { d: 1, em: "☀️", l: "A luz" },
      { d: 2, em: "☁️", l: "O céu" },
      { d: 3, em: "🌱", l: "Terra e plantas" },
      { d: 4, em: "🌙", l: "Sol e estrelas" },
      { d: 5, em: "🐟", l: "Peixes e aves" },
      { d: 6, em: "🦁", l: "Animais e o homem" },
    ],
  },
  "genesis:7": {
    title: "Ordene o início do dilúvio", sub: "Toque nas cartas na sequência certa.", verse: 24,
    win: "🎉 O dilúvio na ordem certa!",
    items: [
      { d: 1, em: "🚪", l: "Noé entra na arca" },
      { d: 2, em: "🌧️", l: "Começa a chover" },
      { d: 3, em: "🌊", l: "As águas sobem" },
      { d: 4, em: "⛰️", l: "Cobrem os montes" },
    ],
  },
  "genesis:13": {
    title: "Ordene: Abraão e Ló", sub: "Toque nas cartas na sequência certa.", verse: 18,
    win: "🎉 A jornada em ordem!",
    items: [
      { d: 1, em: "🐑", l: "Os rebanhos crescem" },
      { d: 2, em: "😠", l: "Contenda entre pastores" },
      { d: 3, em: "👉", l: "Ló escolhe o Jordão" },
      { d: 4, em: "🙏", l: "Abraão fica em Canaã" },
    ],
  },
  "genesis:19": {
    title: "Ordene: a queda de Sodoma", sub: "Toque nas cartas na sequência certa.", verse: 26,
    win: "🎉 A queda de Sodoma em ordem!",
    items: [
      { d: 1, em: "👼", l: "Anjos chegam a Ló" },
      { d: 2, em: "🏃", l: "Ordem de fugir" },
      { d: 3, em: "🔥", l: "Fogo e enxofre" },
      { d: 4, em: "🧂", l: "A mulher vira sal" },
    ],
  },
  "genesis:25": {
    title: "Ordene: Esaú e Jacó", sub: "Toque nas cartas na sequência certa.", verse: 34,
    win: "🎉 A história dos gêmeos em ordem!",
    items: [
      { d: 1, em: "⚰️", l: "Abraão morre" },
      { d: 2, em: "🤰", l: "Rebeca engravida" },
      { d: 3, em: "👶", l: "Nascem os gêmeos" },
      { d: 4, em: "🍲", l: "Esaú vende a primogenitura" },
    ],
  },
  "genesis:31": {
    title: "Ordene: a fuga de Jacó", sub: "Toque nas cartas na sequência certa.", verse: 55,
    win: "🎉 A fuga de Jacó na sequência!",
    items: [
      { d: 1, em: "🗣️", l: "Deus manda voltar" },
      { d: 2, em: "🐫", l: "Jacó foge" },
      { d: 3, em: "🏃", l: "Labão persegue" },
      { d: 4, em: "🤝", l: "Fazem um pacto" },
    ],
  },
  "genesis:37": {
    title: "Ordene: os sonhos de José", sub: "Toque nas cartas na sequência certa.", verse: 36,
    win: "🎉 A saga de José em ordem!",
    items: [
      { d: 1, em: "💭", l: "Os sonhos de José" },
      { d: 2, em: "😤", l: "Inveja dos irmãos" },
      { d: 3, em: "🕳️", l: "Lançado no poço" },
      { d: 4, em: "🐫", l: "Vendido ao Egito" },
    ],
  },
  "genesis:43": {
    title: "Ordene: a volta ao Egito", sub: "Toque nas cartas na sequência certa.", verse: 34,
    win: "🎉 A volta ao Egito em ordem!",
    items: [
      { d: 1, em: "🌾", l: "Acaba o mantimento" },
      { d: 2, em: "👦", l: "Levam Benjamim" },
      { d: 3, em: "🍽️", l: "Banquete no Egito" },
      { d: 4, em: "😢", l: "José se comove" },
    ],
  },
  "genesis:49": {
    title: "Ordene: as bênçãos de Jacó", sub: "Toque nas cartas na sequência certa.", verse: 33,
    win: "🎉 As bênçãos na ordem certa!",
    items: [
      { d: 1, em: "👨‍👦‍👦", l: "Jacó reúne os filhos" },
      { d: 2, em: "🦁", l: "Bênção a Judá" },
      { d: 3, em: "🌟", l: "Bênção a José" },
      { d: 4, em: "🕊️", l: "Israel expira" },
    ],
  },
};

export function hasOrderChallenge(bookId: string, chapter: number): boolean {
  return !!ORDER[`${bookId}:${chapter}`];
}

interface Props { bookId: string; chapter: number; chapterText?: string; look?: Partial<MascotLook>; onWin: () => void }

export default function RPGChallengeOrder({ bookId, chapter, chapterText, look, onWin }: Props) {
  const key = `${bookId}:${chapter}`;
  const cfg = ORDER[key];
  const n = cfg?.items.length ?? 0;

  const [placed, setPlaced] = useState<(OrderItem | null)[]>(() => Array(n).fill(null));
  const [msg, setMsg] = useState("");
  const [won, setWon] = useState(false);
  const shuffled = useMemo(() => (cfg ? [...cfg.items].sort(() => Math.random() - 0.5) : []), [cfg]);

  if (!cfg) return null;

  const place = (it: OrderItem) => {
    if (won) return;
    setMsg("");
    setPlaced((p) => {
      if (p.some((x) => x?.d === it.d)) return p;
      const i = p.indexOf(null);
      if (i < 0) return p;
      const next = [...p]; next[i] = it; return next;
    });
  };
  const removeAt = (i: number) => { if (won) return; setMsg(""); setPlaced((p) => p.map((x, j) => (j === i ? null : x))); };
  const full = placed.every(Boolean);

  const check = () => {
    const ok = placed.every((x, i) => x && x.d === i + 1);
    if (ok) { setWon(true); setMsg(cfg.win || "🎉 Sequência correta!"); }
    else {
      setMsg("Quase! Corrija os dias em vermelho.");
      setTimeout(() => setPlaced((p) => p.map((x, i) => (x && x.d === i + 1 ? x : null))), 800);
    }
  };

  const Card = ({ it, onClick, ghost, full }: { it: OrderItem; onClick?: () => void; ghost?: boolean; full?: boolean }) => (
    <button
      onClick={onClick}
      disabled={ghost}
      className={`inline-flex items-center justify-center gap-1.5 rounded-lg border-2 px-2 py-2 text-[11px] sm:text-[12px] font-bold leading-tight whitespace-normal ${full ? "w-[94%]" : ""} ${
        ghost ? "opacity-30 border-dashed border-[#3a2c18] text-white/50" : "border-[#e8b04b] bg-[#141c30] text-blue-50 active:bg-[#1d2842] sm:hover:bg-[#1d2842]"
      }`}
    >
      <span className="text-[15px] shrink-0">{it.em}</span><span>{it.l}</span>
    </button>
  );

  return (
    <div className="relative flex-1 min-h-0 overflow-hidden">
      <RPGSceneBackdrop bookId={bookId} chapter={chapter} chapterText={chapterText} look={look} showHero dim={0.62} />

      {/* Pop-up do desafio sobre a cena */}
      <div className="relative h-full flex items-center justify-center p-3 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="w-full max-w-[420px] rounded-2xl border-2 border-[#e8b04b] bg-[#0b1120f2] p-4 flex flex-col gap-2.5 shadow-[0_0_0_2px_#0b0805,0_20px_50px_-20px_#000]"
        >
          <div>
            <p className="text-[11px] font-black uppercase tracking-wider text-[#ffd889]">⚔️ Desafio do capítulo</p>
            <h3 className="rpg-title text-base mt-0.5">{cfg.title}</h3>
            <p className="text-[12px] text-blue-50/90 mt-1">{cfg.sub}</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {placed.map((it, i) => {
              const state = won ? "ok" : msg.startsWith("Quase") && it && it.d !== i + 1 ? "bad" : "";
              return (
                <div
                  key={i}
                  className={`relative min-h-[54px] pt-3.5 rounded-lg border-2 flex items-center justify-center ${
                    state === "ok" ? "border-green-500 bg-green-600/20" : state === "bad" ? "border-red-500 bg-red-600/15" : "border-dashed border-[#6a5a34] bg-black/25"
                  }`}
                >
                  <span className="absolute top-1 left-1.5 text-[9px] text-white/50">{i + 1}º dia</span>
                  {it && <Card it={it} full onClick={() => removeAt(i)} />}
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {shuffled.map((it) => (
              <Card key={it.d} it={it} onClick={() => place(it)} ghost={placed.some((x) => x?.d === it.d)} />
            ))}
          </div>

          {msg && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-[13px] font-black text-[#ffd889]">
              {msg}
            </motion.p>
          )}

          <div className="mt-1">
            {won ? (
              <button onClick={onWin} className="rpg-btn w-full py-3">Continuar ▶</button>
            ) : (
              <button onClick={check} disabled={!full} className={`rpg-btn w-full py-3 ${!full ? "opacity-40" : ""}`}>
                Conferir
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
