import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Flame, Shield, Map as MapIcon, Shirt, Play } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { TOTAL_CHAPTERS, getBookByIndex, RPG_BIBLE_BOOKS, RPG_REGION_THEMES, type RPGRegion } from "@/lib/rpgBibleData";
import RPGMascotCanvas from "@/components/rpg/RPGMascotCanvas";
import type { MascotLook } from "@/lib/rpgMascot";
import { drawScene, seedParticles, type Particle, type SceneDims } from "@/lib/rpgScene";

interface RPGHomeProps {
  stats: {
    totalXp: number;
    currentLevel: number;
    currentStage: number;
    streakDays: number;
    completedChapters: number;
  } | null;
  overallPercent: number;
  onPlay: () => void; // mapa da Bíblia (escolher livro)
  onContinue?: () => void; // continuar de onde parou (livro atual)
  onWardrobe?: () => void;
  look?: Partial<MascotLook>;
  characterName?: string | null;
}

// versículos de incentivo (bolha ao tocar no personagem)
const VERSES = [
  "Lâmpada para os meus pés é a tua palavra. — Sl 119:105",
  "Tudo posso naquele que me fortalece. — Fp 4:13",
  "Esforça-te e tem bom ânimo! — Js 1:9",
  "O Senhor é o meu pastor, nada me faltará. — Sl 23:1",
  "A tua palavra é a verdade. — Jo 17:17",
];

const ROOM_W = 220;
const ROOM_H = 320;
const ROOM_GROUND = 232;
const DIMS: SceneDims = { W: ROOM_W, H: ROOM_H, GROUND: ROOM_GROUND };

const RPGHome = ({ stats, overallPercent, onPlay, onContinue, onWardrobe, look, characterName }: RPGHomeProps) => {
  const currentBook = stats ? getBookByIndex(stats.currentLevel - 1) : RPG_BIBLE_BOOKS[0];
  const region: RPGRegion = currentBook?.region || "creation";
  const theme = RPG_REGION_THEMES[region];

  const [bubble, setBubble] = useState<string | null>(null);
  const bubbleTimer = useRef<ReturnType<typeof setTimeout>>();
  const tapCharacter = () => {
    const v = VERSES[Math.floor((Date.now() / 4000) % VERSES.length)];
    setBubble(v);
    clearTimeout(bubbleTimer.current);
    bubbleTimer.current = setTimeout(() => setBubble(null), 5000);
  };

  // cenário bíblico de fundo (região do livro atual)
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = ROOM_W;
    canvas.height = ROOM_H;
    const g = canvas.getContext("2d");
    if (!g) return;
    g.imageSmoothingEnabled = false;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seed = 9;
    const rand = () => {
      seed = (seed * 1103515245 + 12345) & 0x7fffffff;
      return seed / 0x7fffffff;
    };
    const particles: Particle[] = seedParticles(region, DIMS, rand);
    let t = 0;
    let last = 0;
    let raf = 0;
    let mounted = true;
    const frame = (now: number) => {
      if (!mounted) return;
      const dt = Math.min(48, now - last || 16);
      last = now;
      t += dt;
      g.clearRect(0, 0, ROOM_W, ROOM_H);
      drawScene(g, { region, dims: DIMS, particles, t, scroll: 0, reduce });
      if (reduce) return;
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      mounted = false;
      if (raf) cancelAnimationFrame(raf);
    };
  }, [region]);

  const hud = [
    { icon: Shield, label: "Nível", value: `${stats?.currentLevel || 1}`, color: "#7fb0ff" },
    { icon: Zap, label: "XP", value: stats?.totalXp || 0, color: "#ffd889" },
    { icon: Flame, label: "Streak", value: stats?.streakDays || 0, color: "#e8846b" },
  ];

  return (
    <motion.div key="home" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} className="space-y-3">
      {/* ===== SALA DO PERSONAGEM ===== */}
      <div className="relative rounded-2xl overflow-hidden border-2 border-[#3a2c18] shadow-[0_0_40px_rgba(0,0,0,0.5)] h-[52vh] min-h-[340px] max-h-[560px]">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover" style={{ imageRendering: "pixelated" }} aria-hidden="true" />
        <div className="absolute inset-0 pointer-events-none mix-blend-multiply" style={{ background: "repeating-linear-gradient(180deg, rgba(0,0,0,0) 0 2px, rgba(0,0,0,.14) 2px 3px)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(120% 80% at 50% 40%, transparent 55%, rgba(5,7,12,.55) 100%)" }} />

        {/* HUD de pontuação (topo) */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center gap-2">
          {hud.map((h) => (
            <div key={h.label} className="flex items-center gap-1 bg-black/55 border border-white/15 rounded-lg px-2 py-1">
              <h.icon className="w-3.5 h-3.5" style={{ color: h.color }} />
              <span className="text-[11px] font-black" style={{ color: h.color }}>{h.value}</span>
            </div>
          ))}
          <div className="ml-auto bg-black/55 border border-[#e8b04b66] rounded-lg px-2 py-1">
            <span className="text-[10px] font-bold text-[#ffd889]">{theme.emoji} {theme.name}</span>
          </div>
        </div>

        {/* bolha de versículo */}
        <AnimatePresence>
          {bubble && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute left-1/2 -translate-x-1/2 bottom-[46%] w-[80%] max-w-xs z-10"
            >
              <div className="rpg-dialogue px-3 py-2 text-center">
                <p className="text-[11px] text-blue-50 leading-snug">{bubble}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Personagem (vestido com o equipado), animado e tocável */}
        <button
          onClick={tapCharacter}
          className="absolute left-1/2 -translate-x-1/2 bottom-4 focus:outline-none"
          aria-label="Falar com o personagem"
        >
          <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}>
            <RPGMascotCanvas look={look} mood="happy" size={148} />
          </motion.div>
          {characterName && (
            <span className="block text-center mt-1 text-[11px] font-black text-[#ffd889] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
              {characterName}
            </span>
          )}
        </button>
      </div>

      {/* Ação principal — continuar de onde parou */}
      <button onClick={onContinue || onPlay} className="rpg-btn w-full py-4 text-lg uppercase tracking-wider inline-flex items-center justify-center gap-2">
        <Play className="w-5 h-5" /> Continuar Jornada
      </button>

      {/* Navegação secundária */}
      <div className="grid grid-cols-2 gap-2">
        <button onClick={onPlay} className="rpg-btn-ghost py-3 inline-flex items-center justify-center gap-2 text-sm">
          <MapIcon className="w-4 h-4 text-[#e8b04b]" /> Mapa da Bíblia
        </button>
        {onWardrobe && (
          <button onClick={onWardrobe} className="rpg-btn-ghost py-3 inline-flex items-center justify-center gap-2 text-sm">
            <Shirt className="w-4 h-4 text-[#e8b04b]" /> Guarda-roupa
          </button>
        )}
      </div>

      {/* Progresso */}
      <div className="rpg-panel p-3">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-bold text-[#b8a67f]">Progresso da Bíblia</span>
          <span className="text-[11px] text-[#ffd889] font-bold">{stats?.completedChapters || 0}/{TOTAL_CHAPTERS}</span>
        </div>
        <Progress value={overallPercent} className="h-2.5 bg-black/40 [&>div]:bg-gradient-to-r [&>div]:from-[#e8b04b] [&>div]:to-[#ffd889]" />
        <p className="text-[11px] text-[#9c8b68] mt-1.5">Você está em {currentBook?.name || "Gênesis"}</p>
      </div>
    </motion.div>
  );
};

export default RPGHome;
