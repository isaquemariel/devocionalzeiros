import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import RPGSceneBackdrop from "./RPGSceneBackdrop";
import type { MascotLook } from "@/lib/rpgMascot";

// ============================================================================
// Desafio "Caça-palavras" — jogado em POP-UP sobre a cena do capítulo (a
// conclusão daquele lugar). Seleção letra por letra: arraste (ou toque e
// deslize) sobre as letras da palavra. Reutilizável por WORDS[book:chapter].
// ============================================================================

interface WSCfg { title: string; sub: string; words: string[] }

const norm = (s: string) => s.toUpperCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^A-Z]/g, "");

const WORDS: Record<string, WSCfg> = {
  "genesis:2": {
    title: "Caça-palavras — O Jardim do Éden",
    sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
    words: ["ÉDEN", "JARDIM", "ÁRVORE", "RIO", "ADÃO", "COSTELA"],
  },
  "genesis:8": {
    title: "Caça-palavras — As águas baixam",
    sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
    words: ["POMBA", "MONTE", "CORVO", "ALTAR", "TERRA", "OLIVEIRA"],
  },
  "genesis:14": {
    title: "Caça-palavras — Reis e Melquisedeque",
    sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
    words: ["GUERRA", "RESGATE", "PÃO", "VINHO", "DÍZIMO", "ABRÃO"],
  },
  "genesis:20": {
    title: "Caça-palavras — Abraão e Abimeleque",
    sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
    words: ["SONHO", "REI", "SARA", "PROFETA", "CURA", "VERDADE"],
  },
  "genesis:26": {
    title: "Caça-palavras — Os poços de Isaque",
    sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
    words: ["POÇO", "ISAQUE", "ÁGUA", "PACTO", "PAZ", "BÊNÇÃO"],
  },
  "genesis:32": {
    title: "Caça-palavras — Luta no Jaboque",
    sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
    words: ["LUTA", "ANJO", "PENIEL", "ISRAEL", "RIO", "BÊNÇÃO"],
  },
  "genesis:38": {
    title: "Caça-palavras — Judá e Tamar",
    sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
    words: ["JUDÁ", "TAMAR", "SELO", "CABRITO", "JUSTA", "GÊMEOS"],
  },
  "genesis:44": {
    title: "Caça-palavras — A taça de José",
    sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
    words: ["TAÇA", "SACO", "JUDÁ", "BENJAMIM", "PRATA", "CULPA"],
  },
  // ---- Êxodo (slot "caça-palavras": caps 2, 8, 14) ----
  "exodus:2": {
    title: "Caça-palavras — O nascimento de Moisés",
    sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
    words: ["MOISÉS", "CESTO", "NILO", "JUNCOS", "IRMÃ", "POÇO"],
  },
  "exodus:8": {
    title: "Caça-palavras — As pragas do Egito",
    sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
    words: ["RÃS", "PIOLHOS", "MOSCAS", "VARA", "PRAGA", "EGITO"],
  },
  "exodus:14": {
    title: "Caça-palavras — O Mar Vermelho",
    sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
    words: ["MAR", "MOISÉS", "VARA", "SECO", "MURALHA", "FARAÓ"],
  },
};

export function hasWordSearch(bookId: string, chapter: number): boolean {
  return !!WORDS[`${bookId}:${chapter}`];
}

interface Props { bookId: string; chapter: number; chapterText?: string; look?: Partial<MascotLook>; onWin: () => void }

type Cell = { r: number; c: number };

function buildGrid(words: string[], N: number, rnd: () => number) {
  const grid: (string | null)[][] = Array.from({ length: N }, () => Array(N).fill(null));
  const placed: { word: string; cells: Cell[] }[] = [];
  const dirs = [[0, 1], [1, 0]]; // horizontal, vertical
  const tryPlace = (w: string, dr: number, dc: number, r0: number, c0: number): Cell[] | null => {
    if (r0 < 0 || c0 < 0 || r0 + dr * (w.length - 1) >= N || c0 + dc * (w.length - 1) >= N) return null;
    const cells: Cell[] = [];
    for (let i = 0; i < w.length; i++) {
      const r = r0 + dr * i, c = c0 + dc * i, ex = grid[r][c];
      if (ex !== null && ex !== w[i]) return null;
      cells.push({ r, c });
    }
    return cells;
  };
  const commit = (w: string, cells: Cell[]) => { cells.forEach((cell, i) => (grid[cell.r][cell.c] = w[i])); placed.push({ word: w, cells }); };
  for (const w of words) {
    let done: Cell[] | null = null;
    for (let tries = 0; tries < 120 && !done; tries++) {
      const [dr, dc] = dirs[Math.floor(rnd() * dirs.length)];
      done = tryPlace(w, dr, dc, Math.floor(rnd() * N), Math.floor(rnd() * N));
    }
    // fallback determinístico: garante posicionamento se houver QUALQUER encaixe
    if (!done) for (const [dr, dc] of dirs) { for (let r = 0; r < N && !done; r++) for (let c = 0; c < N && !done; c++) done = tryPlace(w, dr, dc, r, c); if (done) break; }
    if (done) commit(w, done);
  }
  const AB = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) if (grid[r][c] === null) grid[r][c] = AB[Math.floor(rnd() * 26)];
  return { grid: grid as string[][], placed };
}

export default function RPGChallengeWordSearch({ bookId, chapter, chapterText, look, onWin }: Props) {
  const cfg = WORDS[`${bookId}:${chapter}`];
  const words = useMemo(() => (cfg ? cfg.words.map((w) => ({ label: w, n: norm(w) })) : []), [cfg]);
  const N = 9;
  const { grid, targetWords } = useMemo(() => {
    let s = 20 + (cfg?.words.length || 0);
    const rnd = () => (s = (s * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;
    const built = buildGrid(words.map((w) => w.n), N, rnd);
    const placedSet = new Set(built.placed.map((p) => p.word));
    // só cobra palavras realmente posicionadas na grade (nunca fica impossível)
    return { grid: built.grid, targetWords: words.filter((w) => placedSet.has(w.n)) };
  }, [words, cfg]);

  const gridRef = useRef<HTMLDivElement>(null);
  const [path, setPath] = useState<Cell[]>([]);
  const dragging = useRef(false);
  const [found, setFound] = useState<Record<string, Cell[]>>({});
  const [wrong, setWrong] = useState(false);

  if (!cfg) return null;
  const foundKeys = Object.keys(found);
  const allFound = foundKeys.length >= targetWords.length;

  // célula sob o ponteiro (grade uniforme N×N)
  const cellAt = (clientX: number, clientY: number): Cell | null => {
    const el = gridRef.current; if (!el) return null;
    const rect = el.getBoundingClientRect();
    const c = Math.floor(((clientX - rect.left) / rect.width) * N);
    const r = Math.floor(((clientY - rect.top) / rect.height) * N);
    if (r < 0 || c < 0 || r >= N || c >= N) return null;
    return { r, c };
  };

  // linha reta (H/V) do início até a célula atual — destaca letra por letra
  const lineFrom = (a: Cell, b: Cell): Cell[] => {
    const ddr = b.r - a.r, ddc = b.c - a.c;
    let dr = 0, dc = 0;
    if (Math.abs(ddr) >= Math.abs(ddc)) dr = Math.sign(ddr); else dc = Math.sign(ddc); // eixo dominante
    const len = (dr ? Math.abs(ddr) : Math.abs(ddc)) + 1;
    const cells: Cell[] = [];
    for (let i = 0; i < len; i++) cells.push({ r: a.r + dr * i, c: a.c + dc * i });
    return cells;
  };

  const start = (clientX: number, clientY: number) => {
    if (allFound) return;
    const cell = cellAt(clientX, clientY);
    if (cell) { dragging.current = true; setPath([cell]); }
  };
  const move = (clientX: number, clientY: number) => {
    if (!dragging.current || !path.length) return;
    const cell = cellAt(clientX, clientY);
    if (cell) setPath(lineFrom(path[0], cell));
  };
  const end = () => {
    if (!dragging.current) return;
    dragging.current = false;
    if (path.length >= 2) {
      const str = norm(path.map((cc) => grid[cc.r][cc.c]).join(""));
      const rev = str.split("").reverse().join("");
      const hit = targetWords.find((w) => !found[w.n] && (w.n === str || w.n === rev));
      if (hit) {
        const next = { ...found, [hit.n]: path };
        setFound(next);
        setPath([]);
        if (Object.keys(next).length >= targetWords.length) setTimeout(onWin, 1300);
        return;
      }
      setWrong(true); setTimeout(() => setWrong(false), 350);
    }
    setPath([]);
  };

  const inFound = (r: number, c: number) => foundKeys.some((k) => found[k].some((x) => x.r === r && x.c === c));
  const inPath = (r: number, c: number) => path.some((x) => x.r === r && x.c === c);

  return (
    <div className="relative flex-1 min-h-0 overflow-hidden">
      <RPGSceneBackdrop bookId={bookId} chapter={chapter} chapterText={chapterText} look={look} showHero dim={0.62} />

      {/* Pop-up do desafio sobre a cena */}
      <div className="relative h-full flex items-center justify-center p-3 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="w-full max-w-[400px] rounded-2xl border-2 border-[#e8b04b] bg-[#0b1120f2] p-4 shadow-[0_0_0_2px_#0b0805,0_20px_50px_-20px_#000]"
        >
          <p className="text-[11px] font-black uppercase tracking-wider text-[#ffd889]">⚔️ Desafio do capítulo</p>
          <h3 className="rpg-title text-base mt-0.5">{cfg.title}</h3>
          <p className="text-[12px] text-blue-50/90 mt-1">{cfg.sub}</p>

          <div
            ref={gridRef}
            className={`mx-auto w-full max-w-[340px] grid grid-cols-9 gap-1 mt-3 select-none ${wrong ? "animate-pulse" : ""}`}
            style={{ touchAction: "none" }}
            onPointerDown={(e) => { e.currentTarget.setPointerCapture?.(e.pointerId); start(e.clientX, e.clientY); }}
            onPointerMove={(e) => move(e.clientX, e.clientY)}
            onPointerUp={end}
            onPointerCancel={end}
          >
            {grid.map((row, r) =>
              row.map((ch, c) => {
                const done = inFound(r, c);
                const sel = inPath(r, c);
                return (
                  <div
                    key={`${r}-${c}`}
                    className={`aspect-square rounded-[5px] flex items-center justify-center text-[clamp(10px,2.6vw,14px)] font-bold border transition-colors ${
                      done ? "bg-[#3f8a3f] border-[#57b45a] text-white" : sel ? "bg-[#e8b04b] border-[#ffd889] text-[#1a1206]" : "bg-[#141c30] border-[#2a3550] text-blue-50"
                    }`}
                  >
                    {ch}
                  </div>
                );
              })
            )}
          </div>

          <div className="flex flex-wrap gap-x-3 gap-y-1 justify-center mt-3">
            {targetWords.map((w) => (
              <span key={w.n} className={`text-[12px] font-bold ${found[w.n] ? "text-[#7fd07f] line-through" : "text-[#cdbfa0]"}`}>{w.label}</span>
            ))}
          </div>

          {allFound && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-[13px] font-black text-[#ffd889] mt-3">
              🎉 Todas encontradas!
            </motion.p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
