import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { drawMascot, DEFAULT_LOOK, type MascotLook } from "@/lib/rpgMascot";
import { drawBoss, getBoss } from "@/lib/rpgBoss";
import { drawScene, seedParticles, type Particle, type SceneDims } from "@/lib/rpgScene";
import { RPG_BIBLE_BOOKS } from "@/lib/rpgBibleData";
import { EXT_BOSS_QUESTIONS, EXT_BOSS_STORY } from "@/lib/rpgChallengeContent";

// ============================================================================
// Batalha de chefe (último capítulo) = desafio geral de 5 perguntas, DENTRO da
// cena. As perguntas surgem em pop-up e se revezam com os ataques: acertou, o
// herói se aproxima e golpeia (espada só se equipada) e a vida do chefe cai;
// errou, o chefe revida. Ao zerar a vida, o chefe é derrotado e o livro vencido.
// ============================================================================

interface Q { question: string; options: string[]; correct: string }
const BOSS_QUESTIONS: Record<string, Q[]> = {
  genesis: [
    { question: "Quem foi enganado pela serpente no Éden?", options: ["Eva", "Sara", "Rebeca", "Agar"], correct: "Eva" },
    { question: "Quantos dias a chuva do dilúvio caiu sobre a terra?", options: ["7", "12", "40", "100"], correct: "40" },
    { question: "Qual sinal Deus deu da aliança após o dilúvio?", options: ["O arco-íris", "Uma estrela", "O trovão", "Uma pomba"], correct: "O arco-íris" },
    { question: "Quem quase foi sacrificado por Abraão em obediência a Deus?", options: ["Isaque", "Ismael", "Jacó", "Esaú"], correct: "Isaque" },
    { question: "Quem foi vendido pelos irmãos e virou governador do Egito?", options: ["José", "Judá", "Benjamim", "Rúben"], correct: "José" },
  ],
  exodus: [
    { question: "Onde a mãe de Moisés o escondeu quando bebê?", options: ["Num cesto no Nilo", "Numa gruta", "No palácio", "No deserto"], correct: "Num cesto no Nilo" },
    { question: "O que ardia sem se consumir quando Deus chamou Moisés?", options: ["A sarça", "Uma tocha", "O altar", "Uma estrela"], correct: "A sarça" },
    { question: "Qual foi a última das dez pragas do Egito?", options: ["A morte dos primogênitos", "Os gafanhotos", "As trevas", "O granizo"], correct: "A morte dos primogênitos" },
    { question: "O que Deus fez ao Mar Vermelho quando Moisés estendeu a vara?", options: ["Abriu-o em seco", "Congelou-o", "Virou-o em sangue", "Secou-o de vez"], correct: "Abriu-o em seco" },
    { question: "Em que monte Deus entregou os Dez Mandamentos?", options: ["Sinai", "Ararate", "Moriá", "Nebo"], correct: "Sinai" },
  ],
};

// ---- Conversação da batalha: voz de Deus (do alto) + fala do herói (balão) ----
// Teve a mesma alma da Leitura Viva do capítulo 1: o texto "acontece" enquanto
// se luta. `open`/`win` emolduram; cada turno traz a fala de Deus na pergunta e a
// reação do herói ao acertar (hit) / errar (miss).
interface BossTurn { ask: string; hit: string; miss: string }
interface BossStory { open: string; turns: BossTurn[]; win: string; winHero: string }
const BOSS_STORY: Record<string, BossStory> = {
  genesis: {
    open: "Porei inimizade entre ti e a serpente. Não temas, guerreiro.",
    turns: [
      { ask: "Lembra do princípio, no jardim…", hit: "É a Palavra que ela teme! ⚔️", miss: "A serpente sibila mentiras…" },
      { ask: "As águas já julgaram o mal uma vez.", hit: "Recua, serpente! 💥", miss: "Firme-te — ergue a cabeça!" },
      { ask: "Pus meu arco de luz no céu como aliança.", hit: "A luz da promessa a fere! ✨", miss: "Não desanimes, olha pro alto!" },
      { ask: "Confia em mim, como Abraão confiou.", hit: "A fé é a minha espada! 🔥", miss: "Coragem — eu estou contigo." },
      { ask: "O que era pra o mal, tornarei em bem.", hit: "Golpe final! Está terminado! 🌟", miss: "Ainda há força em ti — levanta!" },
    ],
    win: "A semente da mulher esmagou a cabeça da serpente.",
    winHero: "Vencemos! Glória a Deus! 🙌",
  },
  exodus: {
    open: "Não temas, guerreiro. Vê a salvação do SENHOR — até o mar me obedece.",
    turns: [
      { ask: "Lembra de onde te tirei — das águas do Nilo.", hit: "As águas me obedecem! 🌊", miss: "Firma os pés, guerreiro." },
      { ask: "Do meio do fogo eu te chamei pelo nome.", hit: "A chama da fé o queima! 🔥", miss: "Não recues diante do Faraó." },
      { ask: "Dez sinais fizeram tremer todo o Egito.", hit: "O juízo o alcança! ⚡", miss: "Confia — eu pelejo por ti." },
      { ask: "Estende a mão: diante de ti o mar se abrirá.", hit: "O mar se fecha sobre o inimigo! 🌊", miss: "Ergue as mãos, não desanimes." },
      { ask: "Eu sou o SENHOR que te sara e te guia.", hit: "Golpe final — livres para sempre! 🌟", miss: "Levanta — a vitória vem de mim." },
    ],
    win: "O cavaleiro e o cavalo, lançou-os no mar. O meu povo está livre.",
    winHero: "Estamos livres! Glória a Deus! 🙌",
  },
};
// Fallback genérico para livros que ainda não têm roteiro curado.
const GENERIC_STORY = (bossName: string): BossStory => ({
  open: "Levanta-te, guerreiro. A vitória vem de mim.",
  turns: Array.from({ length: 5 }, () => ({ ask: "Firme-te na verdade que aprendeste.", hit: `${bossName} recua! 💥`, miss: "Coragem — tenta outra vez!" })),
  win: "Bem feito, servo bom e fiel!",
  winHero: "Conseguimos! 🙌",
});

// perguntas/roteiro curados = embutidos (Gênesis/Êxodo) + registro (demais livros)
const ALL_BOSS_QUESTIONS: Record<string, Q[]> = { ...BOSS_QUESTIONS, ...(EXT_BOSS_QUESTIONS as Record<string, Q[]>) };
const ALL_BOSS_STORY: Record<string, BossStory> = { ...BOSS_STORY, ...EXT_BOSS_STORY };

export function hasBossBattle(bookId: string, chapter: number): boolean {
  const book = RPG_BIBLE_BOOKS.find((b) => b.id === bookId);
  return !!book && chapter === book.chapters && !!ALL_BOSS_QUESTIONS[bookId]?.length;
}

interface Props { bookId: string; chapter: number; look?: Partial<MascotLook>; onFinish: (correct: number) => void }

type Phase = "intro" | "question" | "attacking" | "bosshit" | "won";
const CAM_W = 360, CAM_H = 200, GROUND = 150;

export default function RPGBossBattle({ bookId, look, onFinish }: Props) {
  const boss = getBoss(bookId);
  const book = RPG_BIBLE_BOOKS.find((b) => b.id === bookId);
  const region = book?.region || "creation";
  const questions = useMemo(() => {
    // embaralha as opções por pergunta ordenando por hash(pergunta|opção) — correta
    // cai em qualquer letra (bem distribuído, não fica preso no A).
    const h32 = (str: string): number => {
      let s = 2166136261 >>> 0;
      for (let i = 0; i < str.length; i++) { s ^= str.charCodeAt(i); s = Math.imul(s, 16777619) >>> 0; }
      s ^= s >>> 15; s = Math.imul(s, 2246822507) >>> 0; s ^= s >>> 13; return s >>> 0;
    };
    const shuf = (arr: string[], seed: string) => arr.map((o) => ({ o, k: h32(seed + "|" + o) })).sort((a, b) => a.k - b.k).map((x) => x.o);
    return (ALL_BOSS_QUESTIONS[bookId] || []).map((q) => ({ ...q, options: shuf(q.options, q.question) }));
  }, [bookId]);
  const story = useMemo(() => ALL_BOSS_STORY[bookId] || GENERIC_STORY(boss.name), [bookId, boss.name]);
  const total = questions.length || 5;
  const dmg = Math.ceil(100 / total);

  const [phase, setPhase] = useState<Phase>("intro");
  const [qi, setQi] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [hp, setHp] = useState(100);
  const [correct, setCorrect] = useState(0);
  const q = questions[qi];

  // refs lidos pelo loop de animação
  const lookRef = useRef<MascotLook>(DEFAULT_LOOK); lookRef.current = { ...DEFAULT_LOOK, ...(look || {}) };
  const phaseRef = useRef<Phase>("intro"); phaseRef.current = phase;
  const hpRef = useRef(100); hpRef.current = hp;
  const t0 = useRef(0);          // início da animação da fase
  const flash = useRef(0);
  const defeat = useRef(0);      // 0..1 queda do chefe na vitória
  const tRef = useRef(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvasRef.current; if (!cv) return;
    cv.width = CAM_W; cv.height = CAM_H;
    const g = cv.getContext("2d"); if (!g) return;
    g.imageSmoothingEnabled = false;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dims: SceneDims = { W: CAM_W, H: CAM_H, GROUND };
    let s = 5; const rand = () => (s = (s * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;
    const particles: Particle[] = seedParticles(region, dims, rand);
    const homeX = CAM_W * 0.28, bossX = CAM_W * 0.72;
    const ease = (p: number) => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2);
    let t = 0, last = 0, raf = 0, mounted = true;
    const frame = (now: number) => {
      if (!mounted) return;
      const dt = Math.min(48, now - last || 16); last = now; t += dt; tRef.current = t;
      if (flash.current > 0) flash.current *= 0.86;
      const ph = phaseRef.current;
      if (ph === "won" && defeat.current < 1.4) defeat.current = Math.min(1.4, defeat.current + 0.02);
      const el = t - t0.current; // ms desde o início da fase atual

      g.clearRect(0, 0, CAM_W, CAM_H);
      drawScene(g, { region, dims, particles, t, scroll: 0, reduce });
      g.globalAlpha = 0.4; g.fillStyle = "#05070c"; g.fillRect(0, 0, CAM_W, CAM_H); g.globalAlpha = 1;

      // ----- chefe -----
      const shake = ph === "attacking" && flash.current > 0.3 && !reduce ? Math.round(Math.sin(t * 0.6) * 2) : 0;
      if (ph !== "won") {
        const a = 0.1 + Math.abs(Math.sin(t * 0.005)) * 0.12; g.globalAlpha = a; g.fillStyle = boss.color;
        g.beginPath(); g.ellipse(bossX + shake, GROUND - 24, 28, 32, 0, 0, 6.29); g.fill(); g.globalAlpha = 1;
        drawBoss(g, bookId, Math.round(bossX) + shake, GROUND, t, reduce);
        if (flash.current > 0.02) { g.globalAlpha = flash.current * 0.55; g.fillStyle = "#ff5a4a"; g.beginPath(); g.ellipse(bossX + shake, GROUND - 24, 24, 30, 0, 0, 6.29); g.fill(); g.globalAlpha = 1; }
      } else if (defeat.current < 1) {
        // derrota: o chefe tomba e some
        const d = defeat.current; g.save(); g.globalAlpha = 1 - d;
        g.translate(bossX, GROUND); g.rotate(d * 0.7); g.translate(-bossX, GROUND * 0 - 0 + d * 18);
        drawBoss(g, bookId, Math.round(bossX), GROUND, t, reduce); g.restore(); g.globalAlpha = 1;
        for (let i = 0; i < 6; i++) { const a2 = (i / 6) * 6.28; g.globalAlpha = (1 - d) * 0.7; g.fillStyle = boss.color; g.fillRect(Math.round(bossX + Math.cos(a2) * (10 + d * 30)), Math.round(GROUND - 24 + Math.sin(a2) * (10 + d * 30)), 2, 2); } g.globalAlpha = 1;
      }

      // ----- herói -----
      let heroX = homeX; let mood: "idle" | "happy" | "sad" = "idle";
      if (ph === "attacking") { const p = Math.min(1, el / 780); const adv = p < 0.5 ? ease(p / 0.5) : ease(1 - (p - 0.5) / 0.5); heroX = homeX + adv * (bossX - 42 - homeX); mood = "happy"; }
      else if (ph === "bosshit") { const p = Math.min(1, el / 620); heroX = homeX - Math.sin(p * Math.PI) * 10; mood = "sad"; }
      else if (ph === "won") mood = "happy";
      const walking = ph === "attacking";
      drawMascot(g, Math.round(heroX), GROUND, lookRef.current, { t, reduce, walking, mood });

      // golpe (lâmina só se tiver espada; senão faíscas de impacto)
      if (ph === "attacking") { const p = Math.min(1, el / 780); if (p > 0.4 && p < 0.64) {
        if (lookRef.current.sword) { g.strokeStyle = "rgba(220,235,255,0.9)"; g.lineWidth = 2; g.beginPath(); g.arc(heroX + 18, GROUND - 16, 16, -1.2, 0.6); g.stroke(); }
        for (let i = 0; i < 8; i++) { const an = (i / 8) * 6.28, r = 10 + (i % 3) * 5; g.fillStyle = i % 2 ? "#ffd889" : "#fff"; g.fillRect(Math.round(bossX + Math.cos(an) * r), Math.round(GROUND - 22 + Math.sin(an) * r), 2, 2); } } }
      // chefe revida
      if (ph === "bosshit") { const p = Math.min(1, el / 620); g.globalAlpha = 0.5 * (1 - p); g.fillStyle = boss.color; const bx = bossX - p * (bossX - homeX - 20); g.beginPath(); g.ellipse(bx, GROUND - 18, 9, 11, 0, 0, 6.29); g.fill(); g.globalAlpha = 1; }
      // raios de glória na vitória
      if (ph === "won" && defeat.current > 0.5) { g.globalAlpha = Math.min(0.16, (defeat.current - 0.5) * 0.32); g.fillStyle = "#fff2cc"; for (let i = 0; i < 9; i++) { const a = (i / 9) * Math.PI + t * 0.0004; g.beginPath(); g.moveTo(CAM_W / 2, -18); g.lineTo(CAM_W / 2 + Math.cos(a) * CAM_W, -18 + Math.sin(a) * CAM_W); g.lineTo(CAM_W / 2 + Math.cos(a + 0.05) * CAM_W, -18 + Math.sin(a + 0.05) * CAM_W); g.closePath(); g.fill(); } g.globalAlpha = 1; }

      if (reduce) return;
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => { mounted = false; if (raf) cancelAnimationFrame(raf); };
  }, [bookId, region, boss.color]);

  const beginPhase = (p: Phase) => { t0.current = tRef.current; setPhase(p); };
  const answer = (opt: string) => {
    if (phase !== "question" || picked) return;
    setPicked(opt);
    const ok = opt === q.correct;
    if (ok) { setCorrect((c) => c + 1); setHp((h) => Math.max(0, h - dmg)); flash.current = 1; beginPhase("attacking"); }
    else beginPhase("bosshit");
    setTimeout(() => {
      const last = qi + 1 >= total;
      if (last) { beginPhase("won"); setTimeout(() => onFinish(correct + (ok ? 1 : 0)), 2600); }
      else { setQi((i) => i + 1); setPicked(null); beginPhase("question"); }
    }, ok ? 1200 : 1100);
  };

  // voz de Deus (do alto) e fala do herói (balão), por fase — a "conversação"
  const turn = story.turns[Math.min(qi, story.turns.length - 1)];
  const godLine = phase === "intro" ? story.open : phase === "question" ? turn?.ask : phase === "won" ? story.win : null;
  const heroLine = phase === "attacking" ? turn?.hit : phase === "bosshit" ? turn?.miss : phase === "won" ? story.winHero : null;

  return (
    <div className="relative flex-1 min-h-0 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ imageRendering: "pixelated" }} aria-hidden="true" />

      {/* Voz de Deus (do alto) — mesma linguagem da Leitura Viva */}
      <AnimatePresence mode="wait">
        {godLine && (
          <motion.div
            key={`god-${godLine}`}
            initial={{ opacity: 0, y: -8, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            className="absolute top-[11%] left-0 right-0 flex justify-center px-4 pointer-events-none z-20"
          >
            <span className="max-w-[86%] text-center text-[12px] sm:text-[14px] font-black text-[#1b1206] bg-gradient-to-b from-[#ffd889] to-[#e8b04b] border-2 border-[#7a5410] rounded-xl px-3 py-1.5 shadow-[0_6px_18px_-8px_#e8b04b]">
              {godLine}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fala do herói — balão saindo do mascote (~28% da largura em qualquer tela) */}
      <AnimatePresence>
        {heroLine && (
          <div className="absolute z-20 pointer-events-none" style={{ left: "max(8px, calc(28% - 18px))", bottom: "48%" }}>
            <motion.div
              key={`hero-${heroLine}`}
              initial={{ opacity: 0, y: 6, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 320, damping: 20 }}
              className="relative"
              style={{ maxWidth: "min(70vw, 300px)" }}
            >
              <span className="block text-center text-[11px] sm:text-[13px] font-bold text-[#dfe9ff] bg-[#141c30f2] border-2 border-[#3b6ea8] rounded-xl px-2.5 py-1.5 leading-snug shadow-[0_6px_16px_-8px_#000]">
                {heroLine}
              </span>
              <span className="absolute -bottom-[6px] w-2.5 h-2.5 rotate-45 bg-[#141c30f2] border-b-2 border-r-2 border-[#3b6ea8]" style={{ left: "18px" }} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* HUD */}
      <div className="absolute top-2 left-2 text-[11px] font-bold text-[#ffd889] bg-black/55 border border-[#e8b04b66] rounded-lg px-2 py-0.5 pointer-events-none">
        ⚔️ Batalha final · {Math.min(qi + 1, total)}/{total}
      </div>
      <div className="absolute top-2 right-2 text-right pointer-events-none">
        <span className="text-[11px] font-bold" style={{ color: boss.color, textShadow: "0 1px 2px #000" }}>{boss.emoji} {boss.name}</span>
        <div className="w-[130px] max-w-[40vw] h-2 mt-1 ml-auto rounded border-2 border-[#0b0805] bg-[#2a0f12] overflow-hidden">
          <div className="h-full transition-[width] duration-500" style={{ width: `${hp}%`, background: "linear-gradient(90deg,#e0466b,#ff7a4a)" }} />
        </div>
      </div>

      {/* Intro */}
      {phase === "intro" && (
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-6 gap-3 bg-gradient-to-t from-black/70 to-transparent">
          <p className="rpg-title text-base text-center px-6">{boss.emoji} {boss.name}</p>
          <p className="text-[12px] text-[#cdbfa0] text-center px-8">"{boss.taunt}"</p>
          <button onClick={() => beginPhase("question")} className="rpg-btn px-6 py-3">Enfrentar ⚔️</button>
        </div>
      )}

      {/* Pergunta em pop-up dentro do cenário */}
      <AnimatePresence>
        {phase === "question" && q && (
          <motion.div
            key={qi}
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.96 }}
            className="absolute left-2 right-2 bottom-2 rounded-xl border-2 border-[#e8b04b] bg-[#0b1120ee] p-3 shadow-[0_0_0_2px_#0b0805]"
          >
            <p className="text-[13px] sm:text-sm font-bold text-blue-50 leading-snug mb-2">{q.question}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {q.options.map((opt, i) => (
                <button key={i} onClick={() => answer(opt)} className="rpg-opt text-left p-2.5 flex items-center gap-2">
                  <span className="k px-1.5 py-0.5 text-xs">{["A", "B", "C", "D"][i]}</span>
                  <span className="text-[13px] flex-1">{opt}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Feedback do golpe/erro */}
      <AnimatePresence>
        {(phase === "attacking" || phase === "bosshit") && (
          <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            className="absolute left-0 right-0 top-[22%] flex justify-center pointer-events-none">
            <span className={`text-sm font-black px-3 py-1 rounded-lg border-2 ${phase === "attacking" ? "text-[#1b1206] bg-[#ffd889] border-[#7a5410]" : "text-white bg-[#7a1f1f] border-[#e0466b]"}`}>
              {phase === "attacking" ? "Acertou! Golpe! 💥" : `Errou! ${boss.name} revida`}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Vitória */}
      <AnimatePresence>
        {phase === "won" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-1 pointer-events-none">
            <span className="text-5xl">🏆</span>
            <p className="rpg-title text-lg text-center px-4">{book?.name} conquistado!</p>
            <p className="text-[12px] text-[#cdbfa0]">{boss.name} foi vencido — {correct}/{total} acertos</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
