import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import RPGSceneBackdrop from "./RPGSceneBackdrop";
import type { MascotLook } from "@/lib/rpgMascot";

// ============================================================================
// Desafio "Palavra cruzada" — preencha a grade com as letras do banco (toque
// numa célula e depois numa letra). Data-driven: CROSS[cap] traz a grade e as
// dicas. Pop-up sobre a cena do capítulo.  '.' = bloco; letra = solução.
// ============================================================================

interface CrossCfg { title: string; grid: string[]; across: string[]; down: string[] }

const CROSS: Record<string, CrossCfg> = {
  "genesis:3": {
    title: "Palavra cruzada — A Queda",
    grid: ["PECADO", ".D....", ".E....", ".N...."],
    across: ["→ Entrou no mundo pela desobediência (6)"],
    down: ["↓ O jardim onde viviam (4)"],
  },
  "genesis:9": {
    title: "Palavra cruzada — A Aliança",
    grid: ["ARCA", "R...", "C...", "O..."],
    across: ["→ Onde Noé e os bichos se salvaram (4)"],
    down: ["↓ Sinal de Deus nas nuvens (4)"],
  },
};

export function hasCrossword(bookId: string, chapter: number): boolean {
  return !!CROSS[`${bookId}:${chapter}`];
}

interface Props { bookId: string; chapter: number; chapterText?: string; look?: Partial<MascotLook>; onWin: () => void }
const key = (r: number, c: number) => `${r},${c}`;

export default function RPGChallengeCrossword({ bookId, chapter, chapterText, look, onWin }: Props) {
  const cfg = CROSS[`${bookId}:${chapter}`];
  const rows = cfg?.grid.length ?? 0;
  const cols = cfg ? Math.max(...cfg.grid.map((r) => r.length)) : 0;

  const { fillable, bank } = useMemo(() => {
    const fillable: { r: number; c: number; sol: string }[] = [];
    if (cfg) cfg.grid.forEach((row, r) => { for (let c = 0; c < cols; c++) { const ch = row[c] || "."; if (ch !== "." && ch !== " ") fillable.push({ r, c, sol: ch }); } });
    let s = 5 + chapter;
    const rnd = () => (s = (s * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;
    const bank = fillable.map((f) => f.sol).sort(() => rnd() - 0.5);
    return { fillable, bank };
  }, [cfg, cols, chapter]);

  const [filled, setFilled] = useState<Record<string, string>>({});
  const [sel, setSel] = useState<string | null>(null);
  const [bad, setBad] = useState(false);
  if (!cfg) return null;

  const solOf = (r: number, c: number) => fillable.find((f) => f.r === r && f.c === c)?.sol;
  const isFillable = (r: number, c: number) => !!solOf(r, c);
  const complete = fillable.every((f) => filled[key(f.r, f.c)]);
  const correct = complete && fillable.every((f) => filled[key(f.r, f.c)] === f.sol);

  const nextEmpty = (): string | null => { const f = fillable.find((f) => !filled[key(f.r, f.c)]); return f ? key(f.r, f.c) : null; };

  const tapCell = (r: number, c: number) => { if (!isFillable(r, c) || correct) return; const k = key(r, c); if (filled[k]) { const n = { ...filled }; delete n[k]; setFilled(n); setSel(k); } else setSel(k); };
  const tapLetter = (ltr: string) => {
    if (correct) return;
    const target = sel && isFillable(+sel.split(",")[0], +sel.split(",")[1]) ? sel : nextEmpty();
    if (!target) return;
    const n = { ...filled, [target]: ltr }; setFilled(n); setSel(nextEmptyFrom(n));
    if (fillable.every((f) => n[key(f.r, f.c)])) {
      if (fillable.every((f) => n[key(f.r, f.c)] === f.sol)) setTimeout(onWin, 1300);
      else { setBad(true); setTimeout(() => setBad(false), 500); }
    }
  };
  const nextEmptyFrom = (n: Record<string, string>): string | null => { const f = fillable.find((f) => !n[key(f.r, f.c)]); return f ? key(f.r, f.c) : null; };

  return (
    <div className="relative flex-1 min-h-0 overflow-hidden">
      <RPGSceneBackdrop bookId={bookId} chapter={chapter} chapterText={chapterText} look={look} showHero dim={0.62} />
      <div className="relative h-full flex items-center justify-center p-3 overflow-y-auto">
        <motion.div initial={{ opacity: 0, y: 16, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }}
          className={`w-full max-w-[420px] rounded-2xl border-2 border-[#e8b04b] bg-[#0b1120f2] p-4 shadow-[0_0_0_2px_#0b0805,0_20px_50px_-20px_#000] ${bad ? "animate-pulse" : ""}`}>
          <p className="text-[11px] font-black uppercase tracking-wider text-[#ffd889]">⚔️ Desafio do capítulo</p>
          <h3 className="rpg-title text-base mt-0.5">{cfg.title}</h3>

          <div className="mt-3 flex flex-col items-center gap-0.5">
            {Array.from({ length: rows }).map((_, r) => (
              <div key={r} className="flex gap-0.5">
                {Array.from({ length: cols }).map((_, c) => {
                  if (!isFillable(r, c)) return <div key={c} className="w-9 h-9" />;
                  const k = key(r, c); const v = filled[k]; const done = correct;
                  return (
                    <button key={c} onClick={() => tapCell(r, c)}
                      className={`w-9 h-9 rounded-[5px] text-sm font-black border-2 flex items-center justify-center ${done ? "bg-[#3f8a3f] border-[#57b45a] text-white" : sel === k ? "bg-[#e8b04b] border-[#ffd889] text-[#1a1206]" : "bg-[#141c30] border-[#2a3550] text-blue-50"}`}>
                      {v || ""}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          <div className="mt-3 text-[11px] text-[#cdbfa0] space-y-0.5">
            {cfg.across.map((cl, i) => <p key={`a${i}`}>{cl}</p>)}
            {cfg.down.map((cl, i) => <p key={`d${i}`}>{cl}</p>)}
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5 justify-center">
            {bank.map((ltr, i) => (
              <button key={i} onClick={() => tapLetter(ltr)} disabled={correct}
                className="w-8 h-8 rounded-md border-2 border-[#3a2c18] bg-[#20180d] text-[#ffd889] font-black text-sm active:bg-[#2a2012]">
                {ltr}
              </button>
            ))}
          </div>
          {correct && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-[13px] font-black text-[#ffd889] mt-3">🎉 Cruzada completa!</motion.p>}
        </motion.div>
      </div>
    </div>
  );
}
