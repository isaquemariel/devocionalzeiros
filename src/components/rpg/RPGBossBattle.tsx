import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { drawMascot, DEFAULT_LOOK, type MascotLook } from "@/lib/rpgMascot";
import { drawBoss, getBoss } from "@/lib/rpgBoss";
import { drawScene, seedParticles, type Particle, type SceneDims } from "@/lib/rpgScene";
import { RPG_BIBLE_BOOKS } from "@/lib/rpgBibleData";

// ============================================================================
// Batalha de chefe (último capítulo do livro) = desafio geral de 5 perguntas.
// Cada acerto é um GOLPE: o herói se aproxima e ataca (com espada só se tiver),
// e a vida do chefe cai. Erro → o chefe revida. Ao vencer, o livro é conquistado.
// ============================================================================

interface Q { question: string; options: string[]; correct: string }

// Banco curado por livro (id). Genesis pronto; demais entram aqui (fallback: quiz do capítulo).
const BOSS_QUESTIONS: Record<string, Q[]> = {
  genesis: [
    { question: "Quem foi enganado pela serpente no Éden?", options: ["Eva", "Sara", "Rebeca", "Agar"], correct: "Eva" },
    { question: "Quantos dias durou o dilúvio caindo sobre a terra?", options: ["7", "12", "40", "100"], correct: "40" },
    { question: "Qual sinal Deus deu da aliança após o dilúvio?", options: ["O arco-íris", "Uma estrela", "O trovão", "Uma pomba"], correct: "O arco-íris" },
    { question: "Quem quase foi sacrificado por Abraão em obediência a Deus?", options: ["Isaque", "Ismael", "Jacó", "Esaú"], correct: "Isaque" },
    { question: "Quem foi vendido pelos irmãos e virou governador do Egito?", options: ["José", "Judá", "Benjamim", "Rúben"], correct: "José" },
  ],
};

interface Props {
  bookId: string;
  chapter: number;
  look?: Partial<MascotLook>;
  onFinish: (correct: number) => void;
}

const CAM_W = 360, CAM_H = 200, GROUND = 150;

export default function RPGBossBattle({ bookId, look, onFinish }: Props) {
  const boss = getBoss(bookId);
  const region = RPG_BIBLE_BOOKS.find((b) => b.id === bookId)?.region || "creation";
  const questions = useMemo(() => BOSS_QUESTIONS[bookId] || [], [bookId]);
  const total = questions.length || 5;
  const dmg = Math.ceil(100 / Math.max(3, Math.ceil(total * 0.6))); // ~60% de acertos derrota

  const [qi, setQi] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [hp, setHp] = useState(100);
  const [correct, setCorrect] = useState(0);
  const [done, setDone] = useState(false);
  const q = questions[qi];

  // ---- refs p/ o loop de animação ----
  const heroLook = useRef<MascotLook>(DEFAULT_LOOK);
  heroLook.current = { ...DEFAULT_LOOK, ...(look || {}) };
  const anim = useRef<{ type: "idle" | "attack" | "bosshit"; t0: number }>({ type: "idle", t0: 0 });
  const hpRef = useRef(100); hpRef.current = hp;
  const flash = useRef(0);
  const tRef = useRef(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvasRef.current; if (!cv) return;
    cv.width = CAM_W; cv.height = CAM_H;
    const g = cv.getContext("2d"); if (!g) return;
    g.imageSmoothingEnabled = false;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dims: SceneDims = { W: CAM_W, H: CAM_H, GROUND };
    let seed = 5; const rand = () => (seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;
    const particles: Particle[] = seedParticles(region, dims, rand);
    const homeX = CAM_W * 0.28, bossX = CAM_W * 0.72;
    const ease = (p: number) => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2);
    let t = 0, last = 0, raf = 0, mounted = true;
    const frame = (now: number) => {
      if (!mounted) return;
      const dt = Math.min(48, now - last || 16); last = now; t += dt; tRef.current = t;
      if (flash.current > 0) flash.current *= 0.86;
      g.clearRect(0, 0, CAM_W, CAM_H);
      drawScene(g, { region, dims, particles, t, scroll: 0, reduce });
      g.globalAlpha = 0.42; g.fillStyle = "#05070c"; g.fillRect(0, 0, CAM_W, CAM_H); g.globalAlpha = 1;

      const A = anim.current;
      let heroX = homeX, shake = 0;
      const bossAlive = hpRef.current > 0;

      // chefe (aura + sprite), com tremor/flash ao ser atingido
      if (bossAlive) {
        if (A.type === "attack") { const p = Math.min(1, (t - A.t0) / 720); shake = flash.current > 0.3 ? Math.round(Math.sin(t * 0.6) * 2) : 0; }
        const a = 0.1 + Math.abs(Math.sin(t * 0.005)) * 0.12;
        g.globalAlpha = a; g.fillStyle = boss.color; g.beginPath(); g.ellipse(bossX + shake, GROUND - 24, 28, 32, 0, 0, 6.29); g.fill(); g.globalAlpha = 1;
        drawBoss(g, bookId, Math.round(bossX) + shake, GROUND, t, reduce);
        if (flash.current > 0.02) { g.globalAlpha = flash.current * 0.55; g.fillStyle = "#ff5a4a"; g.beginPath(); g.ellipse(bossX + shake, GROUND - 24, 24, 30, 0, 0, 6.29); g.fill(); g.globalAlpha = 1; }
      }

      // herói: se aproxima pra golpear (attack) ou recua um pouco quando o chefe revida
      let mood: "idle" | "happy" | "sad" = "idle";
      if (A.type === "attack") {
        const p = Math.min(1, (t - A.t0) / 720);
        const adv = p < 0.5 ? ease(p / 0.5) : ease(1 - (p - 0.5) / 0.5);
        heroX = homeX + adv * (bossX - 42 - homeX);
        mood = "happy";
        if (p >= 1) A.type = "idle";
      } else if (A.type === "bosshit") {
        const p = Math.min(1, (t - A.t0) / 600);
        heroX = homeX - Math.sin(p * Math.PI) * 10; mood = "sad";
        if (p >= 1) A.type = "idle";
      }
      const walking = A.type === "attack";
      drawMascot(g, Math.round(heroX), GROUND, heroLook.current, { t, reduce, walking, mood });

      // efeito do golpe perto do chefe (lâmina de luz só se tiver espada; senão impacto)
      if (A.type === "attack") {
        const p = Math.min(1, (t - A.t0) / 720);
        if (p > 0.4 && p < 0.62) {
          if (heroLook.current.sword) { g.strokeStyle = "rgba(220,235,255,0.9)"; g.lineWidth = 2; g.beginPath(); g.arc(heroX + 18, GROUND - 16, 16, -1.2, 0.6); g.stroke(); }
          for (let i = 0; i < 8; i++) { const an = (i / 8) * 6.28, r = 10 + (i % 3) * 5; g.fillStyle = i % 2 ? "#ffd889" : "#fff"; g.fillRect(Math.round(bossX + Math.cos(an) * r), Math.round(GROUND - 22 + Math.sin(an) * r), 2, 2); }
        }
      }
      // chefe revida: um vulto avança sobre o herói
      if (A.type === "bosshit" && bossAlive) {
        const p = Math.min(1, (t - A.t0) / 600); g.globalAlpha = 0.5 * (1 - p); g.fillStyle = boss.color;
        const bx = bossX - p * (bossX - homeX - 20); g.beginPath(); g.ellipse(bx, GROUND - 18, 8, 10, 0, 0, 6.29); g.fill(); g.globalAlpha = 1;
      }
      if (reduce) return;
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => { mounted = false; if (raf) cancelAnimationFrame(raf); };
  }, [bookId, region, boss.color]);

  const answer = (opt: string) => {
    if (picked || done) return;
    setPicked(opt);
    const ok = opt === q.correct;
    const t = tRef.current;
    if (ok) { setCorrect((c) => c + 1); setHp((h) => Math.max(0, h - dmg)); flash.current = 1; anim.current = { type: "attack", t0: t }; }
    else { anim.current = { type: "bosshit", t0: t }; }
    setTimeout(() => {
      const nextCorrect = correct + (ok ? 1 : 0);
      if (qi + 1 >= total) { setDone(true); setTimeout(() => onFinish(nextCorrect), 1400); }
      else { setQi((i) => i + 1); setPicked(null); }
    }, 1250);
  };

  const defeated = hp <= 0;

  return (
    <div className="relative flex-1 min-h-0 flex flex-col">
      {/* Cena da batalha */}
      <div className="relative flex-1 min-h-0">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ imageRendering: "pixelated" }} aria-hidden="true" />
        {/* HUD do chefe */}
        <div className="absolute top-2 right-2 text-right pointer-events-none">
          <span className="text-[11px] font-bold" style={{ color: boss.color, textShadow: "0 1px 2px #000" }}>{boss.emoji} {boss.name}</span>
          <div className="w-[130px] max-w-[40vw] h-2 mt-1 ml-auto rounded border-2 border-[#0b0805] bg-[#2a0f12] overflow-hidden">
            <div className="h-full transition-[width] duration-300" style={{ width: `${hp}%`, background: "linear-gradient(90deg,#e0466b,#ff7a4a)" }} />
          </div>
        </div>
        <div className="absolute top-2 left-2 text-[11px] font-bold text-[#ffd889] bg-black/55 border border-[#e8b04b66] rounded-lg px-2 py-0.5 pointer-events-none">
          ⚔️ Batalha final · {Math.min(qi + 1, total)}/{total}
        </div>
        {done && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-[#05070ccc]">
            <span className="text-4xl">{defeated ? "🏆" : "🛡️"}</span>
            <p className="rpg-title text-base">{defeated ? "Chefe derrotado!" : "O chefe resistiu"}</p>
            <p className="text-[12px] text-[#cdbfa0]">{defeated ? `${boss.name} foi vencido — livro conquistado!` : `Você acertou ${correct}/${total}.`}</p>
          </motion.div>
        )}
      </div>

      {/* Pergunta + opções */}
      {!done && q && (
        <div className="shrink-0 p-3 pt-2">
          <div className="rpg-dialogue p-3 mb-2">
            <p className="text-[13px] sm:text-sm font-bold text-blue-50 leading-snug">{q.question}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {q.options.map((opt, i) => {
              const isRight = opt === q.correct, isSel = opt === picked;
              const state = picked ? (isRight ? "correct" : isSel ? "wrong" : "") : "";
              return (
                <button key={i} onClick={() => answer(opt)} disabled={!!picked}
                  className={`rpg-opt text-left p-2.5 flex items-center gap-2 ${state}`}>
                  <span className="k px-1.5 py-0.5 text-xs">{["A", "B", "C", "D"][i]}</span>
                  <span className="text-[13px] flex-1">{opt}</span>
                  {picked && isRight && <span className="text-[#93d453]">✓</span>}
                  {picked && isSel && !isRight && <span className="text-[#e8846b]">✗</span>}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export function hasBossBattle(bookId: string, chapter: number): boolean {
  const book = RPG_BIBLE_BOOKS.find((b) => b.id === bookId);
  return !!book && chapter === book.chapters && !!BOSS_QUESTIONS[bookId];
}
