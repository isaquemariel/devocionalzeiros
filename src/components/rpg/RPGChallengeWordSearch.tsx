import { useMemo, useState } from "react";
import { motion } from "framer-motion";

// ============================================================================
// Desafio "Caça-palavras" — encontre os termos-chave do capítulo na grade.
// Reutilizável: WORDS[book:chapter] traz as palavras curadas do capítulo.
// ============================================================================

interface WSCfg { title: string; sub: string; words: string[] }

const norm = (s: string) => s.toUpperCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^A-Z]/g, "");

const WORDS: Record<string, WSCfg> = {
  "genesis:2": {
    title: "Caça-palavras — O Jardim do Éden",
    sub: "Ache os termos-chave do capítulo. Toque na primeira e na última letra de cada palavra.",
    words: ["ÉDEN", "JARDIM", "ÁRVORE", "RIO", "ADÃO", "COSTELA"],
  },
};

export function hasWordSearch(bookId: string, chapter: number): boolean {
  return !!WORDS[`${bookId}:${chapter}`];
}

interface Props { bookId: string; chapter: number; onWin: () => void }

type Cell = { r: number; c: number };

function buildGrid(words: string[], N: number, rnd: () => number) {
  const grid: (string | null)[][] = Array.from({ length: N }, () => Array(N).fill(null));
  const placed: { word: string; cells: Cell[] }[] = [];
  const dirs = [[0, 1], [1, 0]]; // horizontal, vertical
  for (const w of words) {
    let ok = false;
    for (let tries = 0; tries < 80 && !ok; tries++) {
      const [dr, dc] = dirs[Math.floor(rnd() * dirs.length)];
      const r0 = Math.floor(rnd() * (N - (dr ? w.length : 0)));
      const c0 = Math.floor(rnd() * (N - (dc ? w.length : 0)));
      const cells: Cell[] = [];
      let fits = true;
      for (let i = 0; i < w.length; i++) {
        const r = r0 + dr * i, c = c0 + dc * i, ex = grid[r][c];
        if (ex !== null && ex !== w[i]) { fits = false; break; }
        cells.push({ r, c });
      }
      if (!fits) continue;
      cells.forEach((cell, i) => (grid[cell.r][cell.c] = w[i]));
      placed.push({ word: w, cells });
      ok = true;
    }
  }
  const AB = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) if (grid[r][c] === null) grid[r][c] = AB[Math.floor(rnd() * 26)];
  return { grid: grid as string[][], placed };
}

export default function RPGChallengeWordSearch({ bookId, chapter, onWin }: Props) {
  const cfg = WORDS[`${bookId}:${chapter}`];
  const words = useMemo(() => (cfg ? cfg.words.map((w) => ({ label: w, n: norm(w) })) : []), [cfg]);
  const N = 9;
  const { grid, placed } = useMemo(() => {
    let s = 20 + (cfg?.words.length || 0);
    const rnd = () => (s = (s * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;
    return buildGrid(words.map((w) => w.n), N, rnd);
  }, [words, cfg]);

  const [sel, setSel] = useState<Cell | null>(null);
  const [found, setFound] = useState<Record<string, Cell[]>>({});
  const [wrong, setWrong] = useState(false);

  if (!cfg) return null;
  const foundKeys = Object.keys(found);
  const allFound = foundKeys.length >= words.length;

  const lineCells = (a: Cell, b: Cell): Cell[] | null => {
    const dr = Math.sign(b.r - a.r), dc = Math.sign(b.c - a.c);
    if (!((dr === 0) !== (dc === 0))) return null; // só horizontal OU vertical
    const len = Math.max(Math.abs(b.r - a.r), Math.abs(b.c - a.c)) + 1;
    const cells: Cell[] = [];
    for (let i = 0; i < len; i++) cells.push({ r: a.r + dr * i, c: a.c + dc * i });
    return cells;
  };

  const tap = (r: number, c: number) => {
    if (allFound) return;
    if (!sel) { setSel({ r, c }); return; }
    const cells = lineCells(sel, { r, c });
    setSel(null);
    if (!cells) return;
    const str = norm(cells.map((cc) => grid[cc.r][cc.c]).join(""));
    const rev = str.split("").reverse().join("");
    const hit = words.find((w) => !found[w.n] && (w.n === str || w.n === rev));
    if (hit) {
      const next = { ...found, [hit.n]: cells };
      setFound(next);
      if (Object.keys(next).length >= words.length) setTimeout(onWin, 1200);
    } else { setWrong(true); setTimeout(() => setWrong(false), 350); }
  };

  const inFound = (r: number, c: number) => foundKeys.some((k) => found[k].some((x) => x.r === r && x.c === c));

  return (
    <div className="relative flex-1 min-h-0 flex flex-col overflow-hidden bg-gradient-to-b from-[#0f1a12] via-[#0b1410] to-[#0b0805]">
      <div className="relative flex-1 min-h-0 overflow-y-auto p-3 flex flex-col gap-2.5">
        <div>
          <p className="text-[11px] font-black uppercase tracking-wider text-[#ffd889]">⚔️ Desafio do capítulo</p>
          <h3 className="rpg-title text-base mt-0.5">{cfg.title}</h3>
          <p className="text-[12px] text-blue-50/90 mt-1">{cfg.sub}</p>
        </div>

        <div className={`mx-auto w-full max-w-[380px] grid grid-cols-9 gap-1 ${wrong ? "animate-pulse" : ""}`}>
          {grid.map((row, r) =>
            row.map((ch, c) => {
              const isSel = sel && sel.r === r && sel.c === c;
              const done = inFound(r, c);
              return (
                <button
                  key={`${r}-${c}`}
                  onClick={() => tap(r, c)}
                  className={`aspect-square rounded-[5px] text-[clamp(10px,2.6vw,14px)] font-bold border transition-colors ${
                    done ? "bg-[#3f8a3f] border-[#57b45a] text-white" : isSel ? "bg-[#e8b04b] border-[#ffd889] text-[#1a1206]" : "bg-[#141c30] border-[#2a3550] text-blue-50"
                  }`}
                >
                  {ch}
                </button>
              );
            })
          )}
        </div>

        <div className="flex flex-wrap gap-x-3 gap-y-1 justify-center mt-1">
          {words.map((w) => (
            <span key={w.n} className={`text-[12px] font-bold ${found[w.n] ? "text-[#7fd07f] line-through" : "text-[#cdbfa0]"}`}>{w.label}</span>
          ))}
        </div>

        {allFound && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-[13px] font-black text-[#ffd889] mt-1">
            🎉 Todas encontradas!
          </motion.p>
        )}
      </div>
    </div>
  );
}
