import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DEFAULT_LOOK, type MascotLook } from "@/lib/rpgMascot";
import { drawBoss, getBoss } from "@/lib/rpgBoss";
import { drawHeroHD } from "@/lib/rpgStageHD";
import { drawScenicHD } from "@/lib/rpgScenicHD";
import { RPG_BIBLE_BOOKS } from "@/lib/rpgBibleData";
import { EXT_BOSS_QUESTIONS, EXT_BOSS_STORY } from "@/lib/rpgChallengeContent";
import { initAudio, setAmbience, setSoundscape, stopAudio, type Soundscape } from "@/lib/rpgAudio";
import { speakBeat, setVoiceEnabled, cancelVoice, isVoiceSupported } from "@/lib/rpgVoice";

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
  // A batalha já vive dentro do LandscapeShell do modal (tela cheia paisagem
  // automática) — aqui só preenchemos o espaço.
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
  // números de dano flutuando + confete da vitória
  const floatsRef = useRef<{ txt: string; color: string; born: number; atBoss: boolean }[]>([]);
  const confettiRef = useRef<{ x: number; y: number; vx: number; vy: number; c: string; born: number }[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvasRef.current; if (!cv) return;
    // supersample: batalha nítida (vetorial) em qualquer tela
    const K = Math.min(4, Math.max(2, (window.devicePixelRatio || 1) * 2));
    cv.width = Math.round(CAM_W * K); cv.height = Math.round(CAM_H * K);
    const g = cv.getContext("2d"); if (!g) return;
    g.imageSmoothingEnabled = true;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dims = { W: CAM_W, H: CAM_H, GROUND };
    const homeX = CAM_W * 0.26, bossX = CAM_W * 0.74;
    const HERO_K = 0.9; // herói HD em escala de batalha
    const ease = (p: number) => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2);
    const trail: { x: number; t: number }[] = [];
    let t = 0, last = 0, raf = 0, mounted = true;

    const drawHeroAt = (hx: number, alpha: number, walking: boolean) => {
      g.save();
      g.globalAlpha *= alpha;
      g.translate(hx, GROUND); g.scale(HERO_K, HERO_K); g.translate(-hx, -GROUND);
      drawHeroHD(g, hx, GROUND, lookRef.current, { t, reduce, walking, face: 1 });
      g.restore();
    };

    const frame = (now: number) => {
      if (!mounted) return;
      const dt = Math.min(48, now - last || 16); last = now; t += dt; tRef.current = t;
      if (flash.current > 0) flash.current *= 0.86;
      const ph = phaseRef.current;
      if (ph === "won" && defeat.current < 1.4) defeat.current = Math.min(1.4, defeat.current + 0.02);
      const el = t - t0.current; // ms desde o início da fase atual

      // ---- tremor de tela (impacto/revide) ----
      let shakeX = 0, shakeY = 0;
      if (!reduce) {
        if (ph === "attacking" && flash.current > 0.25) { shakeX = Math.sin(t * 0.7) * 2.4; shakeY = Math.cos(t * 0.9) * 1.6; }
        else if (ph === "bosshit" && el < 480) { shakeX = Math.sin(t * 0.8) * 3; shakeY = Math.sin(t * 0.63) * 2; }
      }
      g.setTransform(K, 0, 0, K, 0, 0);
      g.translate(shakeX, shakeY);
      g.clearRect(-6, -6, CAM_W + 12, CAM_H + 12);

      // ---- arena: paisagem vetorial da região + clima de batalha ----
      drawScenicHD(g, region, dims, t, reduce);
      g.globalAlpha = 0.26; g.fillStyle = "#05070c"; g.fillRect(-6, -6, CAM_W + 12, CAM_H + 12); g.globalAlpha = 1;
      // relâmpago tenso ocasional
      if (!reduce && ph !== "won" && Math.sin(t * 0.0019) > 0.988) {
        g.globalAlpha = 0.2; g.fillStyle = "#e8ecff"; g.fillRect(-6, -6, CAM_W + 12, CAM_H + 12); g.globalAlpha = 1;
      }
      // círculo de arena no chão (marca o duelo)
      g.save();
      const pulse = reduce ? 0.14 : 0.1 + Math.abs(Math.sin(t * 0.002)) * 0.08;
      g.strokeStyle = `rgba(255,216,137,${pulse})`; g.lineWidth = 2;
      g.beginPath(); g.ellipse(CAM_W / 2, GROUND + 14, CAM_W * 0.37, 14, 0, 0, 6.29); g.stroke();
      g.strokeStyle = `rgba(255,216,137,${pulse * 0.55})`; g.lineWidth = 1;
      g.beginPath(); g.ellipse(CAM_W / 2, GROUND + 14, CAM_W * 0.31, 10.5, 0, 0, 6.29); g.stroke();
      // riscos de batalha no chão
      g.strokeStyle = "rgba(0,0,0,0.2)"; g.lineWidth = 1;
      for (const [sx2, sy2, ln] of [[-46, 22, 14], [10, 30, 10], [52, 24, 16], [-14, 34, 9]] as const) {
        g.beginPath(); g.moveTo(CAM_W / 2 + sx2, GROUND + sy2); g.lineTo(CAM_W / 2 + sx2 + ln, GROUND + sy2 + 2); g.stroke();
      }
      g.restore();
      // brasas de guerra subindo (ambiente vivo)
      if (!reduce && ph !== "won") {
        for (let i = 0; i < 7; i++) {
          const phE = ((t * 0.0009 + i * 137) % 1000) / 1000;
          const ex = ((i * 173 + 31) % CAM_W) + Math.sin(t * 0.0016 + i * 2.2) * 9;
          const ey = CAM_H - phE * (CAM_H * 0.7);
          g.globalAlpha = (1 - phE) * 0.55;
          g.fillStyle = i % 2 ? "#ff9a5a" : "#ffd889";
          g.beginPath(); g.arc(ex, ey, 1 + (i % 3) * 0.4, 0, 6.29); g.fill();
        }
        g.globalAlpha = 1;
      }

      // ----- chefe -----
      const shake = ph === "attacking" && flash.current > 0.3 && !reduce ? Math.round(Math.sin(t * 0.6) * 2) : 0;
      if (ph !== "won") {
        const a = 0.1 + Math.abs(Math.sin(t * 0.005)) * 0.12; g.globalAlpha = a; g.fillStyle = boss.color;
        g.beginPath(); g.ellipse(bossX + shake, GROUND - 24, 28, 32, 0, 0, 6.29); g.fill(); g.globalAlpha = 1;
        drawBoss(g, bookId, Math.round(bossX) + shake, GROUND, t, reduce);
        if (flash.current > 0.02) { g.globalAlpha = flash.current * 0.55; g.fillStyle = "#ff5a4a"; g.beginPath(); g.ellipse(bossX + shake, GROUND - 24, 24, 30, 0, 0, 6.29); g.fill(); g.globalAlpha = 1; }
      } else if (defeat.current < 1) {
        // derrota: o chefe tomba, se desfaz em fagulhas e some
        const d = defeat.current; g.save(); g.globalAlpha = 1 - d;
        g.translate(bossX, GROUND); g.rotate(d * 0.7); g.translate(-bossX, d * 18);
        drawBoss(g, bookId, Math.round(bossX), GROUND, t, reduce); g.restore(); g.globalAlpha = 1;
        for (let i = 0; i < 10; i++) {
          const a2 = (i / 10) * 6.28;
          g.globalAlpha = (1 - d) * 0.75;
          g.fillStyle = i % 2 ? boss.color : "#ffd889";
          g.beginPath(); g.arc(bossX + Math.cos(a2) * (10 + d * 38), GROUND - 24 + Math.sin(a2) * (10 + d * 34), 1.6, 0, 6.29); g.fill();
        }
        g.globalAlpha = 1;
      }

      // ----- herói HD -----
      let heroX = homeX;
      if (ph === "attacking") { const p = Math.min(1, el / 780); const adv = p < 0.5 ? ease(p / 0.5) : ease(1 - (p - 0.5) / 0.5); heroX = homeX + adv * (bossX - 46 - homeX); }
      else if (ph === "bosshit") { const p = Math.min(1, el / 620); heroX = homeX - Math.sin(p * Math.PI) * 10; }
      else if (ph === "won" && !reduce) heroX = homeX; // comemora no lugar (pulinho)
      const walking = ph === "attacking";
      // rastro de investida (afterimages) + poeira nos pés
      if (ph === "attacking" && !reduce) {
        trail.push({ x: heroX, t });
        while (trail.length && t - trail[0].t > 200) trail.shift();
        for (const tr2 of trail) {
          const a3 = 1 - (t - tr2.t) / 200;
          if (a3 > 0.12 && Math.abs(tr2.x - heroX) > 6) drawHeroAt(tr2.x, a3 * 0.22, true);
        }
        // poeira levantando atrás da corrida
        for (let i = 0; i < 4; i++) {
          const dph = ((t * 0.004 + i * 0.7) % 1);
          g.globalAlpha = (1 - dph) * 0.3;
          g.fillStyle = "#cbb98d";
          g.beginPath(); g.arc(heroX - 14 - i * 7 - dph * 6, GROUND - 2 - dph * 7, 1.6 + dph * 2, 0, 6.29); g.fill();
        }
        g.globalAlpha = 1;
      } else if (trail.length) trail.length = 0;
      // pulinho de vitória
      if (ph === "won" && !reduce) {
        const hop = Math.abs(Math.sin(t * 0.008)) * 7;
        g.save(); g.translate(0, -hop); drawHeroAt(heroX, 1, false); g.restore();
      } else {
        drawHeroAt(heroX, 1, walking);
      }

      // ----- golpe: corte com GLOW + explosão de impacto -----
      if (ph === "attacking") {
        const p = Math.min(1, el / 780);
        if (p > 0.4 && p < 0.66) {
          const ip = (p - 0.4) / 0.26; // 0..1 dentro do impacto
          g.save();
          // arco de corte (espada equipada = lâmina; senão energia dourada)
          g.strokeStyle = lookRef.current.sword ? "rgba(220,235,255,0.95)" : "rgba(255,216,137,0.9)";
          g.lineWidth = 2.6; g.lineCap = "round";
          g.shadowColor = lookRef.current.sword ? "#cfe0ff" : "#ffd889"; g.shadowBlur = 10;
          g.beginPath(); g.arc(heroX + 20, GROUND - 18, 17, -1.3 + ip * 0.5, 0.7 + ip * 0.4); g.stroke();
          g.shadowBlur = 0;
          // explosão radial no chefe
          const burst = Math.sin(ip * Math.PI);
          for (let i = 0; i < 10; i++) {
            const an = (i / 10) * 6.28 + ip * 0.6;
            const r0 = 6 + burst * 6, r1 = 12 + burst * (14 + (i % 3) * 6);
            g.strokeStyle = i % 2 ? "#ffd889" : "#ffffff"; g.lineWidth = 1.4;
            g.globalAlpha = 0.9 * burst;
            g.beginPath();
            g.moveTo(bossX + Math.cos(an) * r0, GROUND - 24 + Math.sin(an) * r0);
            g.lineTo(bossX + Math.cos(an) * r1, GROUND - 24 + Math.sin(an) * r1);
            g.stroke();
          }
          g.globalAlpha = 1;
          // anel de choque
          g.strokeStyle = "rgba(255,240,200,0.7)"; g.lineWidth = 2 * (1 - ip);
          g.beginPath(); g.arc(bossX, GROUND - 24, 8 + ip * 26, 0, 6.29); g.stroke();
          g.restore();
        }
      }
      // ----- chefe revida: projétil com brilho + vinheta vermelha -----
      if (ph === "bosshit") {
        const p = Math.min(1, el / 620);
        const bx = bossX - p * (bossX - homeX - 18);
        const by = GROUND - 20 - Math.sin(p * Math.PI) * 16;
        g.save();
        g.globalAlpha = 0.85 * (1 - p * 0.4);
        g.shadowColor = boss.color; g.shadowBlur = 12;
        g.fillStyle = boss.color;
        g.beginPath(); g.ellipse(bx, by, 7, 8, 0, 0, 6.29); g.fill();
        g.shadowBlur = 0;
        // rastro do projétil
        for (let i = 1; i <= 3; i++) {
          g.globalAlpha = 0.25 * (1 - p) * (1 - i * 0.25);
          g.beginPath(); g.ellipse(bx + i * 9, by + i * 1.6, 5.5 - i, 6.5 - i, 0, 0, 6.29); g.fill();
        }
        g.restore();
        // vinheta vermelha (dano recebido)
        const vg2 = g.createRadialGradient(CAM_W / 2, CAM_H / 2, CAM_H * 0.3, CAM_W / 2, CAM_H / 2, CAM_H * 0.85);
        vg2.addColorStop(0, "rgba(180,30,30,0)");
        vg2.addColorStop(1, `rgba(180,30,30,${0.36 * (1 - p)})`);
        g.fillStyle = vg2; g.fillRect(-6, -6, CAM_W + 12, CAM_H + 12);
      }
      // ----- números de dano flutuando -----
      floatsRef.current = floatsRef.current.filter((f) => now - f.born < 1000);
      for (const f of floatsRef.current) {
        const fp = (now - f.born) / 1000;
        const fx2 = f.atBoss ? bossX : heroX;
        const fy2 = (f.atBoss ? GROUND - 58 : GROUND - 60) - fp * 26;
        g.save();
        g.globalAlpha = 1 - fp;
        g.font = "900 15px ui-monospace, monospace";
        g.textAlign = "center";
        g.lineWidth = 3; g.strokeStyle = "rgba(0,0,0,0.7)";
        g.strokeText(f.txt, fx2, fy2);
        g.fillStyle = f.color;
        g.fillText(f.txt, fx2, fy2);
        g.restore();
      }
      // ----- vitória: raios de glória + CONFETE -----
      if (ph === "won" && defeat.current > 0.4) {
        g.globalAlpha = Math.min(0.16, (defeat.current - 0.4) * 0.32); g.fillStyle = "#fff2cc";
        for (let i = 0; i < 9; i++) {
          const a = (i / 9) * Math.PI + t * 0.0004;
          g.beginPath(); g.moveTo(CAM_W / 2, -18);
          g.lineTo(CAM_W / 2 + Math.cos(a) * CAM_W, -18 + Math.sin(a) * CAM_W);
          g.lineTo(CAM_W / 2 + Math.cos(a + 0.05) * CAM_W, -18 + Math.sin(a + 0.05) * CAM_W);
          g.closePath(); g.fill();
        }
        g.globalAlpha = 1;
        // confete caindo
        if (!reduce) {
          if (confettiRef.current.length === 0) {
            for (let i = 0; i < 26; i++) {
              confettiRef.current.push({
                x: CAM_W * (0.2 + ((i * 37) % 60) / 100), y: -8 - ((i * 23) % 40),
                vx: (((i * 13) % 10) - 5) * 0.08, vy: 0.35 + ((i * 7) % 5) * 0.08,
                c: ["#ffd24a", "#5b9bff", "#ff7a8a", "#7dedaa", "#f0d8ff"][i % 5], born: now,
              });
            }
          }
          for (const cf of confettiRef.current) {
            cf.x += cf.vx * dt * 0.06; cf.y += cf.vy * dt * 0.06;
            if (cf.y > CAM_H + 6) { cf.y = -6; cf.x = CAM_W * Math.abs(Math.sin(cf.x)); }
            g.save();
            g.translate(cf.x, cf.y); g.rotate((t * 0.004 + cf.x) % 6.28);
            g.fillStyle = cf.c; g.fillRect(-2, -1.2, 4, 2.4);
            g.restore();
          }
        }
      }

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
    if (ok) {
      setCorrect((c) => c + 1); setHp((h) => Math.max(0, h - dmg)); flash.current = 1;
      floatsRef.current.push({ txt: `-${dmg}`, color: "#ffd889", born: performance.now() + 420, atBoss: true });
      beginPhase("attacking");
    } else {
      floatsRef.current.push({ txt: "✗", color: "#ff8a7a", born: performance.now() + 380, atBoss: false });
      beginPhase("bosshit");
    }
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

  // ---- áudio + voz: MESMA configuração da Leitura Viva (som de fundo + narração) ----
  useEffect(() => {
    let mode: Soundscape = "scene";
    try { mode = (localStorage.getItem("rpg_soundmode") as Soundscape) || "scene"; } catch { /* noop */ }
    if (mode !== "off") { initAudio(); setSoundscape(mode); }
    // ambiente tenso de batalha (aplica quando o modo é "cena")
    setAmbience({ wind: 0.5, storm: 0.5, fire: 0.28, night: 0.35 });
    let von = false;
    try { von = isVoiceSupported() && localStorage.getItem("rpg_voice") !== "off"; } catch { /* noop */ }
    setVoiceEnabled(von);
    // NÃO para o áudio ao sair — o modal do capítulo é o dono e mantém o som.
    return () => { cancelVoice(); };
  }, []);

  // fala a "conversação" da fase apenas quando o texto muda (não repete)
  const spokenRef = useRef("");
  useEffect(() => {
    const key = `${godLine || ""}|${heroLine || ""}`;
    if (key === "|") return;
    if (key !== spokenRef.current) { spokenRef.current = key; speakBeat(godLine || undefined, heroLine || undefined); }
  }, [godLine, heroLine]);

  return (
    <div
      className="relative flex-1 min-h-0 overflow-hidden bg-[#0b0805] select-none"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />

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

      {/* Intro cinematográfica: o chefe se apresenta */}
      {phase === "intro" && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-2.5 bg-gradient-to-t from-black/80 via-black/25 to-black/55">
          <motion.p
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] font-black tracking-[0.3em] text-[#ff9aae]"
          >
            ⚔️ BATALHA FINAL ⚔️
          </motion.p>
          <motion.p
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 220, damping: 13 }}
            className="rpg-title text-2xl text-center px-6 drop-shadow-[0_0_18px_rgba(224,70,107,0.5)]"
          >
            {boss.emoji} {boss.name}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="text-[12px] text-[#cdbfa0] text-center px-10 max-w-md italic"
          >
            "{boss.taunt}"
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            onClick={() => beginPhase("question")}
            className="rpg-btn px-7 py-3 mt-1.5"
          >
            Enfrentar ⚔️
          </motion.button>
        </div>
      )}

      {/* Pergunta CENTRALIZADA: aparece no centro, some ao responder, e a
          animação da guerra acontece no palco — depois vem a próxima */}
      <AnimatePresence>
        {phase === "question" && q && (
          <motion.div
            key={`qwrap-${qi}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 flex items-center justify-center p-4 bg-black/35"
          >
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.92 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              className="w-full max-w-md rounded-2xl border-2 border-[#e8b04b] bg-[#0b1120f5] p-4 shadow-[0_0_44px_-10px_rgba(232,176,75,0.6)]"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black text-[#ffd889] bg-black/50 border border-[#e8b04b55] rounded px-1.5 py-0.5">
                  PERGUNTA {Math.min(qi + 1, total)}/{total}
                </span>
                <span className="text-[10px] text-[#cdbfa0]">acerte para golpear {boss.emoji}</span>
              </div>
              <p className="text-sm sm:text-base font-bold text-blue-50 leading-snug mb-3 text-center">{q.question}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {q.options.map((opt, i) => (
                  <button key={i} onClick={() => answer(opt)} className="rpg-opt text-left p-2.5 flex items-center gap-2">
                    <span className="k px-1.5 py-0.5 text-xs">{["A", "B", "C", "D"][i]}</span>
                    <span className="text-[13px] flex-1">{opt}</span>
                  </button>
                ))}
              </div>
            </motion.div>
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

      {/* Vitória — cerimônia de CONQUISTA */}
      <AnimatePresence>
        {phase === "won" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 pointer-events-none">
            <motion.span
              className="text-6xl drop-shadow-[0_0_24px_rgba(255,210,74,0.8)]"
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 1, type: "spring", stiffness: 220, damping: 12 }}
            >
              🏆
            </motion.span>
            <motion.p
              className="rpg-title text-xl text-center px-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              {book?.name} conquistado!
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="flex items-center gap-2"
            >
              <span className="px-2 py-0.5 rounded-lg bg-black/60 border border-[#e8b04b88] text-[11px] font-black text-[#ffd889]">
                ⚔️ {correct}/{total} acertos
              </span>
              <span className="px-2 py-0.5 rounded-lg bg-black/60 border border-[#e0466b88] text-[11px] font-black text-[#ff9aae]">
                {boss.emoji} {boss.name} vencido
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
