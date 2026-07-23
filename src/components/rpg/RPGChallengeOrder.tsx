import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { drawLivingScene } from "@/lib/rpgLivingScene";

// ============================================================================
// Desafio "Ordene" — minijogo do capítulo, jogado SOBRE a cena viva.
// Genesis 1: ordenar os 6 dias da Criação. Novos capítulos entram em ORDER.
// ============================================================================

interface OrderItem { d: number; em: string; l: string }
interface OrderCfg { title: string; sub: string; verse: number; items: OrderItem[] }

const ORDER: Record<string, OrderCfg> = {
  "genesis:1": {
    title: "Ordene os dias da Criação",
    sub: "Coloque os 6 dias na sequência certa — toque nas cartas para posicioná-las.",
    verse: 31,
    items: [
      { d: 1, em: "☀️", l: "A luz" },
      { d: 2, em: "☁️", l: "O céu" },
      { d: 3, em: "🌱", l: "Terra e plantas" },
      { d: 4, em: "🌙", l: "Sol e estrelas" },
      { d: 5, em: "🐟", l: "Peixes e aves" },
      { d: 6, em: "🦁", l: "Animais e o homem" },
    ],
  },
};

export function hasOrderChallenge(bookId: string, chapter: number): boolean {
  return !!ORDER[`${bookId}:${chapter}`];
}

interface Props { bookId: string; chapter: number; onWin: () => void }

export default function RPGChallengeOrder({ bookId, chapter, onWin }: Props) {
  const key = `${bookId}:${chapter}`;
  const cfg = ORDER[key];
  const n = cfg?.items.length ?? 0;

  const [placed, setPlaced] = useState<(OrderItem | null)[]>(() => Array(n).fill(null));
  const [msg, setMsg] = useState("");
  const [won, setWon] = useState(false);
  const shuffled = useMemo(() => (cfg ? [...cfg.items].sort(() => Math.random() - 0.5) : []), [cfg]);

  // fundo: a cena viva no seu estado pleno
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv || !cfg) return;
    const W = 360, H = 190, GROUND = Math.round(H * 0.7);
    cv.width = W; cv.height = H;
    const g = cv.getContext("2d");
    if (!g) return;
    g.imageSmoothingEnabled = false;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let t = 0, raf = 0, mounted = true;
    const frame = () => {
      if (!mounted) return;
      t += 16;
      g.clearRect(0, 0, W, H);
      drawLivingScene(g, { key: `${key}:challenge`, verseNumber: cfg.verse, dims: { W, H, GROUND }, t, reduce });
      if (reduce) return;
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => { mounted = false; if (raf) cancelAnimationFrame(raf); };
  }, [key, cfg]);

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
    if (ok) { setWon(true); setMsg("🎉 Você ordenou a Criação!"); }
    else {
      setMsg("Quase! Corrija os dias em vermelho.");
      setTimeout(() => setPlaced((p) => p.map((x, i) => (x && x.d === i + 1 ? x : null))), 800);
    }
  };

  const Card = ({ it, onClick, ghost }: { it: OrderItem; onClick?: () => void; ghost?: boolean }) => (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-lg border-2 px-2.5 py-1.5 text-[12px] font-bold ${
        ghost ? "opacity-30 border-dashed border-[#3a2c18] text-white/50" : "border-[#e8b04b] bg-[#141c30] text-blue-50 hover:bg-[#1d2842]"
      }`}
      disabled={ghost}
    >
      <span className="text-[15px]">{it.em}</span>{it.l}
    </button>
  );

  return (
    <div className="relative flex-1 min-h-0 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ imageRendering: "pixelated" }} aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 to-black/85" />
      <div className="relative h-full overflow-y-auto p-3 flex flex-col gap-2.5">
        <div>
          <p className="text-[11px] font-black uppercase tracking-wider text-[#ffd889]">⚔️ Desafio do capítulo</p>
          <h3 className="rpg-title text-base mt-0.5">{cfg.title}</h3>
          <p className="text-[12px] text-blue-50/90 mt-1">{cfg.sub}</p>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {placed.map((it, i) => {
            const state = won ? "ok" : msg.startsWith("Quase") && it && it.d !== i + 1 ? "bad" : "";
            return (
              <div
                key={i}
                className={`relative min-h-[46px] rounded-lg border-2 flex items-center justify-center ${
                  state === "ok" ? "border-green-500 bg-green-600/20" : state === "bad" ? "border-red-500 bg-red-600/15" : "border-dashed border-[#6a5a34] bg-black/25"
                }`}
              >
                <span className="absolute top-1 left-1.5 text-[9px] text-white/50">{i + 1}º dia</span>
                {it && <Card it={it} onClick={() => removeAt(i)} />}
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

        <div className="mt-auto">
          {won ? (
            <button onClick={onWin} className="rpg-btn w-full py-3">Continuar ▶</button>
          ) : (
            <button onClick={check} disabled={!full} className={`rpg-btn w-full py-3 ${!full ? "opacity-40" : ""}`}>
              Conferir
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
