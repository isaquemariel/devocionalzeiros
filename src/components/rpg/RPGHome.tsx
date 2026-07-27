import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Flame, Shield, Map as MapIcon, Shirt, Play, MessageCircle, Lock } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { getLevelTier, LEVEL_HELP } from "@/lib/rpgLevel";
import { RPGLevelUpModal } from "@/components/rpg/RPGLevelUpModal";
import { RPGTalentsHud } from "@/components/rpg/RPGTalentsHud";
import { RPGDailyReward } from "@/components/rpg/RPGDailyReward";
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
  currentBookIndex?: number; // livro ATUAL (primeiro não concluído) — define o cenário
  onPlay: () => void; // mapa da Bíblia (escolher livro)
  onContinue?: () => void; // continuar de onde parou (livro atual)
  onWardrobe?: () => void;
  onRooms?: () => void;      // salas sociais (chat) — GOLD+
  roomsLocked?: boolean;     // grátis vê cadeado; clicar pede upgrade
  look?: Partial<MascotLook>;
  characterName?: string | null;
  celebratedLevel?: number;  // último nível já comemorado (do banco)
  onLevelCelebrated?: (level: number) => void; // persiste que já comemorou
  userId?: string;           // para a carteira de Talentos
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

const RPGHome = ({ stats, overallPercent, currentBookIndex, onPlay, onContinue, onWardrobe, onRooms, roomsLocked, look, characterName, celebratedLevel, onLevelCelebrated, userId }: RPGHomeProps) => {
  // Comemoração de subida de nível: dispara quando o nível atual (banco) supera
  // o último já comemorado. Some após o usuário fechar (persistido no banco).
  const [levelUp, setLevelUp] = useState<{ level: number; prev: number } | null>(null);
  useEffect(() => {
    if (!stats || celebratedLevel == null) return;
    if (stats.currentLevel > celebratedLevel) {
      setLevelUp({ level: stats.currentLevel, prev: celebratedLevel });
    }
  }, [stats?.currentLevel, celebratedLevel]);
  // O cenário segue o LIVRO onde a pessoa está (primeiro não concluído), não o
  // nível de XP. Fallback pro início se o índice não vier.
  const currentBook = getBookByIndex(currentBookIndex ?? 0) || RPG_BIBLE_BOOKS[0];
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

  const levelNum = stats?.currentLevel ?? 0;
  const levelTier = getLevelTier(levelNum);
  const hud = [
    {
      icon: Shield, label: "Nível", value: `${levelNum}`, color: levelTier.color, emoji: levelTier.emoji,
      desc: `${LEVEL_HELP} Patente atual: ${levelTier.emoji} ${levelTier.title}.`,
    },
    {
      icon: Zap, label: "XP", value: stats?.totalXp || 0, color: "#ffd889", emoji: null,
      desc: "Pontos de experiência. Você ganha XP completando capítulos, quizzes e batalhas do RPG. É a sua pontuação total no RPG (não define o nível).",
    },
    {
      icon: Flame, label: "Streak", value: stats?.streakDays || 0, color: "#e8846b", emoji: null,
      desc: "Sua constância: dias seguidos jogando. Jogue todo dia para aumentar a sequência — se faltar um dia, ela zera.",
    },
  ];

  return (
    <motion.div key="home" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} className="h-full flex flex-col gap-2.5">
      {/* Comemoração de subida de nível (novo livro concluído) */}
      <RPGLevelUpModal
        isOpen={!!levelUp}
        level={levelUp?.level ?? 0}
        previousLevel={levelUp?.prev}
        onClose={() => {
          if (levelUp) onLevelCelebrated?.(levelUp.level);
          setLevelUp(null);
        }}
      />

      {/* ===== SALA DO PERSONAGEM ===== */}
      <div className="relative rounded-2xl overflow-hidden border-2 border-[#3a2c18] shadow-[0_0_40px_rgba(0,0,0,0.5)] flex-1 min-h-0">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover" style={{ imageRendering: "pixelated" }} aria-hidden="true" />
        <div className="absolute inset-0 pointer-events-none mix-blend-multiply" style={{ background: "repeating-linear-gradient(180deg, rgba(0,0,0,0) 0 2px, rgba(0,0,0,.14) 2px 3px)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(120% 80% at 50% 40%, transparent 55%, rgba(5,7,12,.55) 100%)" }} />

        {/* HUD de pontuação (topo) — toque/clique em cada um mostra o significado */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex flex-wrap items-center gap-1.5 sm:gap-2 z-20">
          {hud.map((h) => (
            <Popover key={h.label}>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  aria-label={`${h.label}: ${h.value}. Toque para saber mais.`}
                  className="flex items-center gap-1 bg-black/55 border rounded-lg px-2 py-1 hover:bg-black/70 active:scale-95 transition cursor-pointer"
                  style={{ borderColor: `${h.color}55` }}
                >
                  {h.emoji ? (
                    <span className="text-[11px] leading-none" aria-hidden="true">{h.emoji}</span>
                  ) : (
                    <h.icon className="w-3.5 h-3.5" style={{ color: h.color }} />
                  )}
                  <span className="text-[11px] font-black" style={{ color: h.color }}>{h.value}</span>
                </button>
              </PopoverTrigger>
              <PopoverContent side="bottom" align="start" className="w-60 p-3">
                <div className="flex items-center gap-2 mb-1">
                  {h.emoji ? (
                    <span className="text-base leading-none" aria-hidden="true">{h.emoji}</span>
                  ) : (
                    <h.icon className="w-4 h-4" style={{ color: h.color }} />
                  )}
                  <span className="font-bold text-sm">{h.label}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-snug">{h.desc}</p>
              </PopoverContent>
            </Popover>
          ))}
          {/* Carteira de Talentos (moeda do jogo) */}
          <RPGTalentsHud userId={userId} />
          <div className="ml-auto bg-black/55 border border-[#e8b04b66] rounded-lg px-2 py-1">
            <span className="text-[10px] font-bold text-[#ffd889]">{theme.emoji} {theme.name}</span>
          </div>
        </div>

        {/* Guarda-roupa: logo abaixo das pontuações, maior e alinhado à faixa */}
        {onWardrobe && (
          <button
            onClick={onWardrobe}
            className="absolute top-12 left-2.5 right-2.5 inline-flex items-center justify-center gap-2 bg-black/55 border border-[#e8b04b66] rounded-xl px-3 py-2 hover:bg-black/70 active:scale-[0.99] transition"
          >
            <Shirt className="w-4 h-4 text-[#e8b04b]" />
            <span className="text-[13px] font-black text-[#ffd889] tracking-wide">Guarda-roupa</span>
          </button>
        )}

        {/* Constância: barra de progresso logo abaixo do guarda-roupa + resgate diário */}
        <RPGDailyReward
          userId={userId}
          className={`absolute ${onWardrobe ? "top-[5.6rem]" : "top-12"} left-2.5 right-2.5 z-20`}
        />

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
          {characterName && (
            <span
              className="relative z-10 block text-center text-[12px] font-black text-[#ffd889] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
              style={{ marginBottom: -30 }} // aproxima do topo do boneco (sobre o espaço vazio do canvas, acima do fogo)
            >
              {characterName}
            </span>
          )}
          <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}>
            <RPGMascotCanvas look={look} mood="happy" size={148} />
          </motion.div>
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
        {onRooms && (
          <button
            onClick={onRooms}
            className="relative py-3 inline-flex items-center justify-center gap-2 text-sm font-bold rounded-xl text-white border border-[#5b9bff] bg-gradient-to-r from-[#2f6df6] to-[#4f9bff] shadow-[0_0_16px_rgba(79,155,255,0.45)] hover:from-[#3b7bff] hover:to-[#63a8ff] active:scale-[0.98] transition"
          >
            <MessageCircle className="w-4 h-4" /> Salas
            {roomsLocked && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 flex items-center justify-center rounded-full bg-[#1a1206] border border-[#e8b04b99]">
                <Lock className="w-3 h-3 text-[#ffd889]" />
              </span>
            )}
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
