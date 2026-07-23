import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import RPGSceneBackdrop from "./RPGSceneBackdrop";
import type { MascotLook } from "@/lib/rpgMascot";

// ============================================================================
// Desafio "Jogo da Memória" — o 7º minijogo. Vire duas cartas: um emoji e o
// termo que combina. Casou o par, fica aberto; errou, viram de novo. Pop-up
// sobre a cena do capítulo. Data-driven por MEMORY[book:chapter].
//
// Cada par vira DUAS cartas (emoji ↔ palavra), embaralhadas por semente fixa do
// capítulo (Fisher-Yates) — sempre resolvível e nunca "óbvio".
// ============================================================================

interface MemPair { em: string; l: string }
interface MemoryCfg { title: string; sub: string; pairs: MemPair[] }

const MEMORY: Record<string, MemoryCfg> = {
  // ---- Êxodo (mecânica nova; entra em capítulos escolhidos) ----
  "exodus:12": {
    title: "Memória — A Páscoa",
    sub: "Vire as cartas e case cada símbolo ao seu nome.",
    pairs: [
      { em: "🐑", l: "Cordeiro" },
      { em: "🩸", l: "Sangue na porta" },
      { em: "🍞", l: "Pães ázimos" },
      { em: "🌿", l: "Ervas amargas" },
    ],
  },
  "exodus:24": {
    title: "Memória — A Aliança confirmada",
    sub: "Vire as cartas e case cada símbolo ao seu nome.",
    pairs: [
      { em: "📜", l: "Livro da aliança" },
      { em: "🩸", l: "Sangue aspergido" },
      { em: "⛰️", l: "O monte" },
      { em: "🔥", l: "Glória como fogo" },
    ],
  },
};

export function hasMemory(bookId: string, chapter: number): boolean {
  return !!MEMORY[`${bookId}:${chapter}`];
}

interface Props { bookId: string; chapter: number; chapterText?: string; look?: Partial<MascotLook>; onWin: () => void }

interface Card { pair: number; kind: "em" | "l"; v: string }

export default function RPGChallengeMemory({ bookId, chapter, chapterText, look, onWin }: Props) {
  const cfg = MEMORY[`${bookId}:${chapter}`];

  const cards = useMemo<Card[]>(() => {
    if (!cfg) return [];
    const deck: Card[] = [];
    cfg.pairs.forEach((p, i) => { deck.push({ pair: i, kind: "em", v: p.em }); deck.push({ pair: i, kind: "l", v: p.l }); });
    let s = 91 + chapter * 13;
    const rnd = () => (s = (s * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;
    for (let i = deck.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [deck[i], deck[j]] = [deck[j], deck[i]]; }
    return deck;
  }, [cfg, chapter]);

  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<Record<number, boolean>>({});
  const [locked, setLocked] = useState(false);

  if (!cfg) return null;
  const totalPairs = cfg.pairs.length;
  const donePairs = Object.keys(matched).length;
  const allDone = donePairs >= totalPairs;

  const tap = (idx: number) => {
    if (locked || flipped.includes(idx) || matched[cards[idx].pair]) return;
    const next = [...flipped, idx];
    setFlipped(next);
    if (next.length === 2) {
      const [a, b] = next;
      if (cards[a].pair === cards[b].pair) {
        const nm = { ...matched, [cards[a].pair]: true };
        setMatched(nm); setFlipped([]);
        if (Object.keys(nm).length >= totalPairs) setTimeout(onWin, 1300);
      } else {
        setLocked(true);
        setTimeout(() => { setFlipped([]); setLocked(false); }, 750);
      }
    }
  };

  const cols = cards.length <= 8 ? 4 : cards.length <= 12 ? 4 : 5;

  return (
    <div className="relative flex-1 min-h-0 overflow-hidden">
      <RPGSceneBackdrop bookId={bookId} chapter={chapter} chapterText={chapterText} look={look} showHero dim={0.62} />
      <div className="relative h-full flex items-center justify-center p-3 overflow-y-auto">
        <motion.div initial={{ opacity: 0, y: 16, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }}
          className="w-full max-w-[440px] rounded-2xl border-2 border-[#e8b04b] bg-[#0b1120f2] p-4 shadow-[0_0_0_2px_#0b0805,0_20px_50px_-20px_#000]">
          <p className="text-[11px] font-black uppercase tracking-wider text-[#ffd889]">⚔️ Desafio do capítulo</p>
          <h3 className="rpg-title text-base mt-0.5">{cfg.title}</h3>
          <p className="text-[12px] text-blue-50/90 mt-1">{cfg.sub}</p>

          <div className="grid gap-2 mt-3" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
            {cards.map((c, idx) => {
              const isOpen = flipped.includes(idx) || matched[c.pair];
              const isMatched = matched[c.pair];
              return (
                <button key={idx} onClick={() => tap(idx)} disabled={isOpen || locked}
                  className="relative aspect-square rounded-xl border-2 overflow-hidden"
                  style={{ perspective: 600 }}>
                  <motion.div className="absolute inset-0 flex items-center justify-center rounded-[10px] text-center"
                    animate={{ rotateY: isOpen ? 0 : 180 }} transition={{ duration: 0.28 }}
                    style={{ transformStyle: "preserve-3d" }}>
                    {/* frente (aberta) */}
                    <div className="absolute inset-0 flex items-center justify-center p-1"
                      style={{ backfaceVisibility: "hidden" }}>
                      <div className={`absolute inset-0 rounded-[10px] border-2 ${isMatched ? "border-green-500 bg-green-600/25" : "border-[#e8b04b] bg-[#141c30]"}`} />
                      <span className={`relative ${c.kind === "em" ? "text-[26px]" : "text-[11px] font-bold leading-tight text-blue-50 px-1"}`}>{c.v}</span>
                    </div>
                    {/* verso (fechada) */}
                    <div className="absolute inset-0 flex items-center justify-center rounded-[10px] border-2 border-[#3a2c18] bg-gradient-to-br from-[#1a2440] to-[#0b1120]"
                      style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                      <span className="text-[#e8b04b]/70 text-lg font-black">✦</span>
                    </div>
                  </motion.div>
                </button>
              );
            })}
          </div>
          <p className="text-center text-[12px] text-[#cdbfa0] mt-3">{donePairs}/{totalPairs} pares{allDone ? " — 🎉 Perfeito!" : ""}</p>
        </motion.div>
      </div>
    </div>
  );
}
