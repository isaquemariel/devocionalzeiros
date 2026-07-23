import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import RPGSceneBackdrop from "./RPGSceneBackdrop";
import type { MascotLook } from "@/lib/rpgMascot";

// ============================================================================
// Desafio "Ligue" — conecte cada termo ao seu par (personagem ↔ fato). Toque num
// item da esquerda e depois no par certo à direita. Pop-up sobre a cena.
// ============================================================================

interface ConnectCfg { title: string; sub: string; pairs: { a: string; b: string }[] }

const CONNECT: Record<string, ConnectCfg> = {
  "genesis:5": {
    title: "Ligue — a linhagem de Adão a Noé", sub: "Conecte cada nome ao seu marco.",
    pairs: [
      { a: "Adão", b: "o primeiro homem" },
      { a: "Enoque", b: "andou com Deus" },
      { a: "Matusalém", b: "viveu 969 anos" },
      { a: "Noé", b: "achou graça" },
    ],
  },
  "genesis:11": {
    title: "Ligue — Babel e os patriarcas", sub: "Conecte cada nome ao seu marco.",
    pairs: [
      { a: "Babel", b: "as línguas se confundiram" },
      { a: "Sinar", b: "a planície da torre" },
      { a: "Terá", b: "pai de Abrão" },
      { a: "Harã", b: "onde a família parou" },
    ],
  },
  "genesis:17": {
    title: "Ligue — a aliança da circuncisão", sub: "Conecte cada nome ao seu significado.",
    pairs: [
      { a: "Abrão → Abraão", b: "pai de muitas nações" },
      { a: "Sarai → Sara", b: "mãe de reis" },
      { a: "Isaque", b: "o filho da promessa" },
      { a: "Circuncisão", b: "sinal da aliança" },
    ],
  },
  "genesis:23": {
    title: "Ligue — o luto de Sara", sub: "Conecte cada nome ao seu marco.",
    pairs: [
      { a: "Sara", b: "morreu em Hebrom" },
      { a: "Macpela", b: "a caverna comprada" },
      { a: "Efrom", b: "vendeu o campo" },
      { a: "Abraão", b: "sepultou sua esposa" },
    ],
  },
  "genesis:29": {
    title: "Ligue — Jacó em Harã", sub: "Conecte cada nome ao seu papel.",
    pairs: [
      { a: "Raquel", b: "a quem Jacó amou" },
      { a: "Lia", b: "a filha mais velha" },
      { a: "Labão", b: "o sogro de Jacó" },
      { a: "7 anos", b: "o preço do dote" },
    ],
  },
  "genesis:35": {
    title: "Ligue — o retorno a Betel", sub: "Conecte cada nome ao seu marco.",
    pairs: [
      { a: "Betel", b: "casa de Deus" },
      { a: "Israel", b: "novo nome de Jacó" },
      { a: "Benjamim", b: "o último filho" },
      { a: "Raquel", b: "morreu no parto" },
    ],
  },
  "genesis:41": {
    title: "Ligue — os sonhos de Faraó", sub: "Conecte cada símbolo ao seu sentido.",
    pairs: [
      { a: "7 vacas gordas", b: "anos de fartura" },
      { a: "7 vacas magras", b: "anos de fome" },
      { a: "José", b: "governador do Egito" },
      { a: "O anel", b: "autoridade de Faraó" },
    ],
  },
  "genesis:47": {
    title: "Ligue — a família no Egito", sub: "Conecte cada nome ao seu marco.",
    pairs: [
      { a: "Gósen", b: "onde a família morou" },
      { a: "José", b: "administrou o Egito" },
      { a: "Jacó", b: "abençoou Faraó" },
      { a: "A fome", b: "durou pela terra" },
    ],
  },
};

export function hasConnect(bookId: string, chapter: number): boolean {
  return !!CONNECT[`${bookId}:${chapter}`];
}

interface Props { bookId: string; chapter: number; chapterText?: string; look?: Partial<MascotLook>; onWin: () => void }

export default function RPGChallengeConnect({ bookId, chapter, chapterText, look, onWin }: Props) {
  const cfg = CONNECT[`${bookId}:${chapter}`];
  const rightOrder = useMemo(() => {
    if (!cfg) return [];
    let s = 13 + chapter;
    const rnd = () => (s = (s * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;
    return cfg.pairs.map((_, i) => i).sort(() => rnd() - 0.5);
  }, [cfg, chapter]);
  const [selL, setSelL] = useState<number | null>(null);
  const [matched, setMatched] = useState<Record<number, boolean>>({});
  const [wrong, setWrong] = useState<number | null>(null);
  if (!cfg) return null;
  const total = cfg.pairs.length;
  const doneCount = Object.keys(matched).length;
  const allDone = doneCount >= total;

  const tapRight = (ri: number) => {
    if (selL == null || matched[selL]) return;
    if (ri === selL) { const nx = { ...matched, [selL]: true }; setMatched(nx); setSelL(null); if (Object.keys(nx).length >= total) setTimeout(onWin, 1300); }
    else { setWrong(ri); setTimeout(() => setWrong(null), 350); }
  };

  const chip = "w-full text-left rounded-xl border-2 px-3 py-2.5 text-[13px] font-bold leading-snug transition-colors";

  return (
    <div className="relative flex-1 min-h-0 overflow-hidden">
      <RPGSceneBackdrop bookId={bookId} chapter={chapter} chapterText={chapterText} look={look} showHero dim={0.62} />
      <div className="relative h-full flex items-center justify-center p-3 overflow-y-auto">
        <motion.div initial={{ opacity: 0, y: 16, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }}
          className="w-full max-w-[460px] rounded-2xl border-2 border-[#e8b04b] bg-[#0b1120f2] p-4 shadow-[0_0_0_2px_#0b0805,0_20px_50px_-20px_#000]">
          <p className="text-[11px] font-black uppercase tracking-wider text-[#ffd889]">⚔️ Desafio do capítulo</p>
          <h3 className="rpg-title text-base mt-0.5">{cfg.title}</h3>
          <p className="text-[12px] text-blue-50/90 mt-1">{cfg.sub}</p>

          <div className="grid grid-cols-2 gap-2.5 mt-3">
            <div className="flex flex-col gap-2">
              {cfg.pairs.map((p, i) => (
                <button key={i} onClick={() => !matched[i] && setSelL(i)} disabled={matched[i]}
                  className={`${chip} ${matched[i] ? "border-green-500 bg-green-600/20 text-white" : selL === i ? "border-[#ffd889] bg-[#e8b04b]/25 text-[#ffd889]" : "border-[#3a2c18] bg-[#141c30] text-blue-50"}`}>
                  {p.a}
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              {rightOrder.map((ri) => (
                <button key={ri} onClick={() => tapRight(ri)} disabled={matched[ri]}
                  className={`${chip} ${matched[ri] ? "border-green-500 bg-green-600/20 text-white" : wrong === ri ? "border-red-500 bg-red-600/20 text-white" : "border-[#3a2c18] bg-[#141c30] text-blue-50"}`}>
                  {cfg.pairs[ri].b}
                </button>
              ))}
            </div>
          </div>
          <p className="text-center text-[12px] text-[#cdbfa0] mt-3">{doneCount}/{total} ligados{allDone ? " — 🎉 Perfeito!" : ""}</p>
        </motion.div>
      </div>
    </div>
  );
}
