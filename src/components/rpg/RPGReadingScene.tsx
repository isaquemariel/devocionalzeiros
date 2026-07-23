import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, AlertTriangle, Heart, Wand2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { getBookById } from "@/lib/studyBibleData";
import { RPG_BIBLE_BOOKS, type RPGRegion } from "@/lib/rpgBibleData";
import { useUsageLimits } from "@/hooks/useUsageLimits";
import { useUserPlan } from "@/hooks/useUserPlan";
import { useAuth } from "@/hooks/useAuth";
import { useVerseFavorites } from "@/hooks/useVerseFavorites";
import { UsageLimitModal } from "@/components/shared/UsageLimitModal";
import { BibleTranslation } from "@/lib/bibleService";
import { drawScene, seedParticles, type Particle, type SceneDims } from "@/lib/rpgScene";
import { drawMascot, DEFAULT_LOOK, type MascotLook } from "@/lib/rpgMascot";
import { drawBoss, getBoss } from "@/lib/rpgBoss";
import { hasLivingScene, drawLivingScene, livingBeat } from "@/lib/rpgLivingScene";
import { drawVerseAccents, detectSetting, drawSettingTerrain } from "@/lib/rpgVerseFx";
import { drawLivingV2, beatFromScript } from "@/lib/rpgLivingV2";
import { hasV2Scene, getV2Script } from "@/lib/rpgSceneRegistry";

interface Verse {
  number: number;
  text: string;
}

interface VerseStudyData {
  commentary: string;
  keyWords: { word: string; original?: string; meaning?: string }[];
  crossReferences: string[];
  source: string;
}

interface RPGReadingSceneProps {
  bookName: string;
  bookId: string;
  chapter: number;
  verses: Verse[];
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
  userId: string;
  isAdmin?: boolean;
  translation?: BibleTranslation;
  look?: Partial<MascotLook>;
  isBoss?: boolean; // último capítulo do livro → batalha de chefe na leitura
  onFinish?: () => void; // leu tudo → ir pro desafio
  onClose?: () => void; // X sair
}

const DEFAULT_HIGHLIGHT = "yellow";

// Câmera do jogo: altura lógica fixa (mantém o herói num bom tamanho) e a
// largura é derivada da proporção real da tela → a cena preenche tudo, no
// celular vertical e no PC, sem distorcer.
const CAM_H = 176;

const regionForBook = (bookId: string): RPGRegion =>
  RPG_BIBLE_BOOKS.find((b) => b.id === bookId)?.region || "creation";

/**
 * Leitura Viva — a leitura do capítulo como cena pixel-art: o herói fica no
 * cenário da região e os versículos surgem um a um numa caixa de diálogo (toque
 * ou teclado para avançar). Preserva 100% das ações da Bíblia de Estudo por
 * versículo (estudar com IA, favoritar, grifar) e a tradução unificada.
 */
const RPGReadingScene = ({
  bookName,
  bookId,
  chapter,
  verses,
  isLoading,
  error,
  onRetry,
  userId,
  isAdmin = false,
  translation,
  look,
  isBoss = false,
  onFinish,
  onClose,
}: RPGReadingSceneProps) => {
  const { user } = useAuth();
  const { planType } = useUserPlan(user?.email || undefined);
  const { checkLimit, incrementUsage } = useUsageLimits(userId, planType);
  const { isFavorite, toggleFavorite } = useVerseFavorites(userId);

  const [idx, setIdx] = useState(0); // verso atual
  const [typedLen, setTypedLen] = useState(0);
  const [typing, setTyping] = useState(true);
  const [studyOpen, setStudyOpen] = useState(false);
  const [verseStudy, setVerseStudy] = useState<VerseStudyData | null>(null);
  const [studyLoading, setStudyLoading] = useState(false);
  const [usageLimitModal, setUsageLimitModal] = useState<
    { isOpen: boolean; featureName: string; currentUsage: number; limit: number; isBlocked: boolean } | null
  >(null);
  // force re-render of favorite/highlight badges after toggle
  const [, forceTick] = useState(0);
  // batalha de chefe (só no último capítulo)
  const [battle, setBattle] = useState<"none" | "fighting" | "won">("none");

  const region = regionForBook(bookId);
  const boss = getBoss(bookId);
  const current = verses[idx];
  const total = verses.length;
  const allRead = idx >= total - 1 && !typing;
  const bossNear = isBoss && idx >= total - 2; // penúltimo/último verso → chefe aparece

  // reset when the chapter/verses change
  useEffect(() => {
    setIdx(0);
    setTypedLen(0);
    setTyping(true);
    setStudyOpen(false);
    setVerseStudy(null);
    setBattle("none");
  }, [bookId, chapter, verses.length]);

  // ----- passo a cada troca de versículo (anda um pouco, depois para) -----
  const walkRef = useRef(false);
  useEffect(() => {
    if (idx === 0) return; // primeiro verso: sem passo
    walkRef.current = true;
    const tm = setTimeout(() => {
      walkRef.current = false;
    }, 750);
    return () => clearTimeout(tm);
  }, [idx]);

  const startBattle = useCallback(() => {
    setBattle("fighting");
    setTimeout(() => setBattle("won"), 2300);
  }, []);

  // ----- typewriter -----
  const fullText = current?.text || "";
  useEffect(() => {
    setTypedLen(0);
    setTyping(!!fullText);
  }, [idx, fullText]);

  useEffect(() => {
    if (!typing) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setTypedLen(fullText.length);
      setTyping(false);
      return;
    }
    const iv = setInterval(() => {
      setTypedLen((n) => {
        if (n >= fullText.length) {
          clearInterval(iv);
          setTyping(false);
          return n;
        }
        return n + 1;
      });
    }, 22);
    return () => clearInterval(iv);
  }, [typing, fullText]);

  const advance = useCallback(() => {
    if (battle !== "none") return; // durante batalha/vitória, o toque na cena não avança
    if (typing) {
      setTypedLen(fullText.length);
      setTyping(false);
      return;
    }
    if (idx < total - 1) {
      setStudyOpen(false);
      setVerseStudy(null);
      setIdx((i) => i + 1);
    } else {
      onFinish?.(); // leu o capítulo → vai pro desafio (no último capítulo, a batalha de chefe)
    }
  }, [battle, typing, fullText.length, idx, total, onFinish]);

  // keyboard: → / Enter / Space advance
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (studyOpen) {
        if (e.key === "Escape") setStudyOpen(false);
        return;
      }
      if (["ArrowRight", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        advance();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [advance, studyOpen]);

  // look equipado do herói (para andar vestido pela cena)
  const lookRef = useRef<MascotLook>(DEFAULT_LOOK);
  lookRef.current = { ...DEFAULT_LOOK, ...(look || {}) };
  // refs lidos pelo loop de animação
  const idxRef = useRef(0);
  idxRef.current = idx;
  const totalRef = useRef(0);
  totalRef.current = total;
  const bossRef = useRef(false);
  bossRef.current = isBoss;
  const battleRef = useRef<"none" | "fighting" | "won">("none");
  battleRef.current = battle;
  const versesRef = useRef(verses);
  versesRef.current = verses;
  const verseTextRef = useRef("");
  verseTextRef.current = current?.text || "";
  // ambiente/lugar do capítulo (relevo condizente) — calculado do texto inteiro
  const chapterSetting = useMemo(() => detectSetting(verses.map((v) => v.text).join(" ")), [verses]);
  const settingRef = useRef(chapterSetting);
  settingRef.current = chapterSetting;
  const chapterRef = useRef(chapter);
  chapterRef.current = chapter;
  // roteiro de cena v2 (motor data-driven) — cada capítulo de Gênesis tem o seu
  const v2Script = useMemo(() => getV2Script(bookId, chapter), [bookId, chapter]);
  const v2Ref = useRef(v2Script);
  v2Ref.current = v2Script;

  // ----- câmera responsiva (preenche a tela) -----
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [box, setBox] = useState({ w: 320, h: 480 });
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const cr = entries[0]?.contentRect;
      if (cr) setBox({ w: Math.max(1, cr.width), h: Math.max(1, cr.height) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // dims lógicas da câmera derivadas da proporção real
  const camW = Math.max(130, Math.min(620, Math.round(CAM_H * (box.w / box.h))));
  const ground = Math.round(CAM_H * 0.7);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = camW;
    canvas.height = CAM_H;
    const g = canvas.getContext("2d");
    if (!g) return;
    g.imageSmoothingEnabled = false;
    const dims: SceneDims = { W: camW, H: CAM_H, GROUND: ground };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seed = 1;
    const rand = () => {
      seed = (seed * 1103515245 + 12345) & 0x7fffffff;
      return seed / 0x7fffffff;
    };
    const particles: Particle[] = seedParticles(region, dims, rand);
    let t = 0;
    let last = 0;
    let raf = 0;
    let scroll = 0;
    let mounted = true;
    const frame = (now: number) => {
      if (!mounted) return;
      const dt = Math.min(48, now - last || 16);
      last = now;
      t += dt;
      const bt = battleRef.current;
      // só anda (e rola o cenário) durante o passo de cada versículo
      if (walkRef.current && bt === "none" && !reduce) scroll += dt * 0.09;
      g.clearRect(0, 0, camW, CAM_H);
      const vn = versesRef.current[idxRef.current]?.number ?? 1;
      if (hasLivingScene(bookId, chapterRef.current)) {
        drawLivingScene(g, { key: `${bookId}:${chapterRef.current}`, verseNumber: vn, dims, t, reduce });
      } else if (v2Ref.current) {
        drawLivingV2(g, { key: `${bookId}:${chapterRef.current}`, script: v2Ref.current, verseNumber: vn, dims, t, reduce });
      } else {
        drawScene(g, { region, dims, particles, t, scroll, reduce });
        drawSettingTerrain(g, { setting: settingRef.current, dims, t, reduce });
        drawVerseAccents(g, { text: verseTextRef.current, dims, t, reduce });
      }

      const bossOn = bossRef.current && (idxRef.current >= totalRef.current - 2 || bt !== "none");
      if (bossOn && bt !== "won") {
        const shake = bt === "fighting" && !reduce ? Math.round(Math.sin(t * 0.07) * 2) : 0;
        drawBoss(g, bookId, Math.round(camW * 0.76) + shake, ground, t, reduce);
      }

      const bossX = Math.round(camW * 0.76);
      // herói fica mais à ESQUERDA (início da estrada) pra não tapar as cenas
      let heroX = camW * 0.2;
      let lunge = 0;
      if (bt === "fighting") { lunge = Math.abs(Math.sin(t * 0.02)); heroX = camW * 0.2 + lunge * camW * 0.18; } // investe golpeando
      const heroMood = bt === "won" ? "happy" : "idle";
      const heroWalking = walkRef.current && bt === "none";
      drawMascot(g, Math.round(heroX), ground, lookRef.current, { t, reduce, walking: heroWalking, mood: heroMood });

      if (bt === "fighting" && !reduce) {
        const hit = lunge > 0.82; // instante do impacto
        // arco de golpe (lâmina de luz) diante do herói
        g.strokeStyle = "rgba(220,235,255,0.9)";
        g.lineWidth = 2;
        g.beginPath();
        g.arc(heroX + 16, ground - 16, 12 + lunge * 6, -1.1, 0.6);
        g.stroke();
        if (hit) {
          g.globalAlpha = 0.5; // clarão vermelho no chefe
          g.fillStyle = "#ff5a4a";
          g.beginPath();
          g.ellipse(bossX, ground - 20, 22, 24, 0, 0, 6.29);
          g.fill();
          g.globalAlpha = 1;
          for (let i = 0; i < 8; i++) { // faíscas do impacto
            const a = (i / 8) * 6.28, r = 10 + (i % 3) * 5;
            g.fillStyle = i % 2 ? "#ffd889" : "#ffffff";
            g.fillRect(Math.round(bossX + Math.cos(a) * r), Math.round(ground - 20 + Math.sin(a) * r), 2, 2);
          }
          g.font = "16px serif";
          g.textAlign = "center";
          g.fillText("💥", bossX, ground - 30);
          g.textAlign = "left";
        }
      }
      if (reduce) return;
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      mounted = false;
      if (raf) cancelAnimationFrame(raf);
    };
  }, [region, bookId, camW, ground]);

  // ----- per-verse actions (Study Bible integration) -----
  const openStudy = useCallback(async () => {
    if (!current) return;
    if (verseStudy && studyOpen) {
      setStudyOpen(false);
      return;
    }
    if (!isAdmin) {
      const limit = checkLimit("rpg_verse_explanation");
      if (!limit.canUse) {
        setUsageLimitModal({
          isOpen: true,
          featureName: "Explicação de Versículo (RPG)",
          currentUsage: limit.currentUsage,
          limit: limit.limit,
          isBlocked: limit.isBlocked,
        });
        return;
      }
      await incrementUsage("rpg_verse_explanation");
    }
    setStudyOpen(true);
    setVerseStudy(null);
    setStudyLoading(true);
    try {
      const book = getBookById(bookId);
      const { data, error: fnError } = await supabase.functions.invoke("verse-study", {
        body: {
          bookId,
          bookName: book?.name || bookName,
          chapter,
          verseNumber: current.number,
          verseText: current.text,
          testament: book?.testament || "old",
        },
      });
      if (fnError) throw fnError;
      if (data?.commentary) setVerseStudy(data as VerseStudyData);
    } catch (err) {
      console.error("Error fetching verse study:", err);
      setVerseStudy({
        commentary: "Não foi possível carregar a explicação. Tente novamente.",
        keyWords: [],
        crossReferences: [],
        source: "Erro",
      });
    } finally {
      setStudyLoading(false);
    }
  }, [current, verseStudy, studyOpen, isAdmin, checkLimit, incrementUsage, bookId, bookName, chapter]);

  const onFavorite = useCallback(async () => {
    if (!current) return;
    await toggleFavorite(bookId, chapter, current.number, current.text);
    forceTick((n) => n + 1);
  }, [current, toggleFavorite, bookId, chapter]);

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-12 gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-amber-400" />
        <p className="text-white/50 text-sm">Carregando capítulo...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-12 gap-4">
        <AlertTriangle className="w-8 h-8 text-red-400" />
        <p className="text-red-400 text-sm">{error}</p>
        <Button onClick={onRetry} variant="outline" size="sm" className="border-white/20 text-white">
          Tentar novamente
        </Button>
      </div>
    );
  }

  const fav = current ? isFavorite(bookId, chapter, current.number) : false;
  // Conversação da Leitura Viva (voz de Deus + reação do mascote), por versículo.
  // Cap. 1 usa o roteiro clássico; os demais de Gênesis usam o roteiro v2.
  const beat = current
    ? hasLivingScene(bookId, chapter)
      ? livingBeat(`${bookId}:${chapter}`, current.number)
      : v2Script
        ? beatFromScript(v2Script, current.number)
        : null
    : null;

  return (
    <>
      {/* Cena ocupa TODA a tela (experiência de jogo) */}
      <div
        ref={containerRef}
        className="relative flex-1 min-h-0 overflow-hidden select-none"
        style={{ cursor: "pointer", touchAction: "manipulation" }}
        onClick={advance}
        role="button"
        aria-label="Avançar versículo"
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ imageRendering: "pixelated" }}
          aria-hidden="true"
        />
        {/* scanlines + vignette retrô */}
        <div
          className="absolute inset-0 pointer-events-none mix-blend-multiply"
          style={{ background: "repeating-linear-gradient(180deg, rgba(0,0,0,0) 0 2px, rgba(0,0,0,.16) 2px 3px)" }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(130% 90% at 50% 42%, transparent 58%, rgba(0,0,0,.55) 100%)" }}
        />

        {/* topo: livro + contador (esq) e X sair (dir) */}
        <div className="absolute top-2 left-2 flex items-center gap-1.5 pointer-events-none">
          <span className="text-[11px] font-bold text-[#ffd889] bg-black/55 border border-[#e8b04b66] rounded-lg px-2 py-0.5">
            {bookName} {chapter}
          </span>
          <span className="text-[11px] font-bold text-white/85 bg-black/55 border border-white/20 rounded-lg px-2 py-0.5">
            {total > 0 ? `${idx + 1}/${total}` : ""}
          </span>
        </div>
        {onClose && (
          <button
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black flex items-center justify-center border border-white/25"
            aria-label="Sair"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        )}

        {/* aviso: o chefe apareceu */}
        {bossNear && battle === "none" && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-11 left-0 right-0 flex justify-center pointer-events-none"
          >
            <span className="text-[11px] font-black text-[#ff9a9a] bg-black/60 border-2 border-[#e8846b] rounded-lg px-2.5 py-1">
              {boss.emoji} {boss.name} apareceu!
            </span>
          </motion.div>
        )}

        {/* Voz de Deus (do alto) — Leitura Viva */}
        {beat?.god && (
          <motion.div
            key={`god-${beat.god}`}
            initial={{ opacity: 0, y: -8, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            className="absolute top-[13%] left-0 right-0 flex justify-center px-4 pointer-events-none z-10"
          >
            <span className="max-w-[86%] text-center text-[13px] sm:text-[15px] font-black text-[#1b1206] bg-gradient-to-b from-[#ffd889] to-[#e8b04b] border-2 border-[#7a5410] rounded-xl px-3 py-1.5 shadow-[0_6px_18px_-8px_#e8b04b]">
              {beat.god}
            </span>
          </motion.div>
        )}
        {/* Reação do mascote — balão saindo do herói (à esquerda), sempre dentro da tela */}
        {beat?.reaction && (
          <div className="absolute z-10 left-2 right-2 flex justify-start pointer-events-none" style={{ bottom: "56%" }}>
            <motion.div
              key={`react-${beat.reaction}`}
              initial={{ opacity: 0, y: 6, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 320, damping: 20 }}
              className="relative max-w-[80%] sm:max-w-[280px]"
            >
              <span className="block text-center text-[11px] sm:text-[12px] font-bold text-[#dfe9ff] bg-[#141c30f2] border-2 border-[#3b6ea8] rounded-xl px-2.5 py-1.5 leading-snug shadow-[0_6px_16px_-8px_#000]">
                {beat.reaction}
              </span>
              <span className="absolute left-6 -bottom-[6px] -translate-x-1/2 w-2.5 h-2.5 rotate-45 bg-[#141c30f2] border-b-2 border-r-2 border-[#3b6ea8]" />
            </motion.div>
          </div>
        )}

        {/* Caixa de fala do versículo (embaixo) */}
        <div className="absolute left-0 right-0 bottom-0 p-2">
          <div className="rpg-dialogue px-3 py-2.5">
            <p className="text-[14px] leading-snug text-blue-50 min-h-[3em]">
              {fullText.slice(0, typedLen)}
              {typing && <span className="text-[#ffd889] animate-pulse">▌</span>}
            </p>
            <div className="mt-1.5 flex items-center justify-between gap-2">
              <span className="text-[10px] text-white/60">
                {typing
                  ? "toque p/ completar"
                  : allRead && isBoss
                    ? `toque p/ enfrentar ${boss.name} ⚔️`
                    : allRead
                      ? "toque p/ ir ao desafio ▶"
                      : "toque p/ avançar ▶"}
              </span>
              <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={(e) => { e.stopPropagation(); onFavorite(); }}
                  title={fav ? "Remover dos favoritos" : "Favoritar"}
                  className={`p-1.5 rounded-lg border-2 ${fav ? "text-red-300 bg-red-500/25 border-red-500/60" : "text-white/70 bg-black/40 border-white/20"}`}
                >
                  <Heart className={`w-4 h-4 ${fav ? "fill-current" : ""}`} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); openStudy(); }}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#e8b04b] text-[#1a1206] text-[11px] font-black border-2 border-[#0b0805]"
                >
                  <Wand2 className="w-3.5 h-3.5" /> Estudar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vitória sobre o chefe */}
      <AnimatePresence>
        {battle === "won" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[61] flex items-center justify-center p-5 bg-[#05070cf2] backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="w-full max-w-xs rounded-2xl border-2 border-[#e8b04b] bg-gradient-to-br from-[#141c30] to-[#0b1120] p-6 text-center shadow-[0_0_0_2px_#0b0805]"
            >
              <motion.div className="text-5xl mb-2" animate={{ rotate: [0, -8, 8, 0], scale: [1, 1.15, 1] }} transition={{ duration: 1.2, repeat: Infinity }}>
                🏆
              </motion.div>
              <h2 className="rpg-title text-lg">
                Você venceu <span className="hl">{boss.name}</span>!
              </h2>
              <p className="text-[12px] text-[#cdbfa0] mt-2">Mais uma vitória na jornada! Encare o desafio para concluir o livro.</p>
              <button onClick={() => onFinish?.()} className="rpg-btn w-full mt-4 py-3 text-sm uppercase tracking-wide">
                Continuar ▶
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Centered study overlay */}
      <AnimatePresence>
        {studyOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-[#05070cf2] backdrop-blur-sm"
            onClick={() => setStudyOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md max-h-[80vh] overflow-y-auto rounded-2xl border border-amber-500/30 bg-gradient-to-br from-[#141c30] to-[#0b1120] p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-black text-amber-400">
                  📖 {bookName} {chapter}:{current?.number}
                </h3>
                <button onClick={() => setStudyOpen(false)} className="text-white/40 hover:text-white text-lg leading-none">
                  ✕
                </button>
              </div>
              {studyLoading ? (
                <div className="flex items-center gap-2 py-6 justify-center">
                  <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                  <span className="text-xs text-white/50">Carregando explicação...</span>
                </div>
              ) : verseStudy ? (
                <div className="space-y-3">
                  <div>
                    <p className="text-[10px] font-bold text-amber-400 uppercase mb-1">Comentário</p>
                    <p className="text-xs text-white/70 leading-relaxed">{verseStudy.commentary}</p>
                  </div>
                  {verseStudy.keyWords?.length > 0 && (
                    <div>
                      <p className="text-[10px] font-bold text-blue-400 uppercase mb-1">🔤 Palavras-chave</p>
                      <div className="flex flex-wrap gap-1.5">
                        {verseStudy.keyWords.map((kw, i) => (
                          <span key={i} className="text-[10px] bg-blue-500/15 text-blue-300 px-2 py-0.5 rounded-full border border-blue-500/20">
                            {typeof kw === "string" ? kw : kw.word}
                            {typeof kw !== "string" && kw.original && <span className="text-blue-400/60 ml-1">({kw.original})</span>}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {verseStudy.crossReferences?.length > 0 && (
                    <div>
                      <p className="text-[10px] font-bold text-green-400 uppercase mb-1">🔗 Referências Cruzadas</p>
                      <div className="flex flex-wrap gap-1.5">
                        {verseStudy.crossReferences.map((ref, i) => (
                          <span key={i} className="text-[10px] bg-green-500/15 text-green-300 px-2 py-0.5 rounded-full border border-green-500/20">
                            {ref}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {verseStudy.source && <p className="text-[9px] text-white/30 italic">Fonte: {verseStudy.source}</p>}
                </div>
              ) : null}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Usage Limit Modal */}
      {usageLimitModal && (
        <UsageLimitModal
          isOpen={usageLimitModal.isOpen}
          onClose={() => setUsageLimitModal(null)}
          featureName={usageLimitModal.featureName}
          currentUsage={usageLimitModal.currentUsage}
          limit={usageLimitModal.limit}
          isBlocked={usageLimitModal.isBlocked}
          planType={planType || "free"}
        />
      )}

    </>
  );
};

export default RPGReadingScene;
