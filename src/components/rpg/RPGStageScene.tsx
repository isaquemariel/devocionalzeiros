import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, X, Heart } from "lucide-react";
import { drawMascot, DEFAULT_LOOK, type MascotLook } from "@/lib/rpgMascot";
import { drawProp as drawBaseProp, pixel } from "@/lib/rpgActors";
import {
  beatAnchors, stageLength, stagedAt, envAt, balloonText, makeDrawState,
  drawStageBackdrop, drawStageMarker, drawStagedElements, stageActorHeight,
  STAGE_START_X, type StageScript, type StageDims,
} from "@/lib/rpgStage";
import { setAmbience } from "@/lib/rpgAudio";
import { speakBeat, cancelVoice } from "@/lib/rpgVoice";

// ============================================================================
// RPGStageScene — modo CENA VIVA: o herói ANDA pelo palco da história.
// Narração avança andando até o marcador de luz; diálogos avançam por toque,
// com balões de fala saindo dos personagens. Texto = versículo bíblico puro.
// No mobile, entra em tela cheia paisagem (lock nativo ou rotação CSS).
// ============================================================================

interface Props {
  bookName: string;
  chapter: number;
  verses: { number: number; text: string }[];
  script: StageScript;
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  look?: Partial<MascotLook>;
  onFinish: () => void;
  onClose?: () => void;
  onToggleFavorite?: (verse: number) => void;
  favorites?: Set<number>;
}

const CAM_H = 200;
const WALK_SPEED = 0.085; // px lógicos por ms
const ARRIVE_DIST = 14;

// nomes de exibição dos que falam
const SPEAKER_NAME: Record<string, string> = {
  cristo: "Jesus", anjo: "Anjo", joao: "João", anciao: "Ancião", hero: "Você",
};

// props extras do palco (porta etc.) — cai no drawProp base p/ os demais
function drawStageProp(g: CanvasRenderingContext2D, kind: string, x: number, fy: number, o: { scale?: number; t?: number; reduce?: boolean; fire?: number } = {}) {
  if (kind === "door") {
    const R = pixel(g); const S = o.scale ?? 1; const t = o.t ?? 0;
    // porta aberta com luz saindo (Ap 3:8 / 3:20)
    R(x - 9 * S, fy - 30 * S, 18 * S, 30 * S, "#4a3a28");
    R(x - 7 * S, fy - 28 * S, 14 * S, 28 * S, "#2c2118");
    // folha aberta
    R(x + 5 * S, fy - 28 * S, 4 * S, 28 * S, "#5d4a30");
    // luz dourada vazando
    const gl = o.reduce ? 0.6 : Math.sin(t * 0.004) * 0.15 + 0.7;
    g.save(); g.globalAlpha *= gl * 0.75;
    R(x - 6 * S, fy - 27 * S, 11 * S, 27 * S, "#ffe6a0");
    R(x - 3 * S, fy - 27 * S, 5 * S, 27 * S, "#fff5cc");
    g.restore();
    return;
  }
  drawBaseProp(g, kind, x, fy, o);
}

export const RPGStageScene = ({ bookName, chapter, verses, script, isLoading, error, onRetry, look, onFinish, onClose, onToggleFavorite, favorites }: Props) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // ---------- orientação: tela cheia paisagem no mobile ----------
  const [cssRotate, setCssRotate] = useState(false);
  useEffect(() => {
    const isMobile = Math.min(window.innerWidth, window.innerHeight) < 560;
    if (!isMobile) return;
    let cancelled = false;
    const tryLock = async () => {
      try { await document.documentElement.requestFullscreen?.(); } catch { /* segue */ }
      try {
        const so = screen.orientation as ScreenOrientation & { lock?: (o: string) => Promise<void> };
        await so.lock?.("landscape");
        if (!cancelled) setCssRotate(false);
        return;
      } catch { /* iOS: sem lock → rotação CSS */ }
      if (!cancelled) setCssRotate(window.matchMedia("(orientation: portrait)").matches);
    };
    tryLock();
    const mq = window.matchMedia("(orientation: portrait)");
    const onCh = () => {
      // se o lock nativo não pegou, acompanha a orientação física
      const so = screen.orientation as ScreenOrientation & { lock?: unknown };
      if (!so.lock || cssRotateRef.current) setCssRotate(mq.matches);
      else if (mq.matches) setCssRotate(true);
      else setCssRotate(false);
    };
    mq.addEventListener?.("change", onCh);
    return () => {
      cancelled = true;
      mq.removeEventListener?.("change", onCh);
      try { (screen.orientation as ScreenOrientation & { unlock?: () => void }).unlock?.(); } catch { /* ok */ }
      if (document.fullscreenElement) document.exitFullscreen?.().catch(() => undefined);
    };
  }, []);
  const cssRotateRef = useRef(cssRotate); cssRotateRef.current = cssRotate;

  // ---------- estado do jogo ----------
  const anchors = useMemo(() => beatAnchors(script), [script]);
  const stageLen = useMemo(() => stageLength(script), [script]);
  const [idx, setIdx] = useState(0);
  const idxRef = useRef(0); idxRef.current = idx;
  const beat = script.beats[idx];
  const nextBeat = script.beats[idx + 1];
  const nextNeedsWalk = !!nextBeat && (nextBeat.step ?? (nextBeat.by ? 0 : 84)) > 0;
  const done = !nextBeat;

  const playerRef = useRef({ x: STAGE_START_X - 40, dir: 0 as -1 | 0 | 1, moving: false, face: 1 as 1 | -1 });
  const camRef = useRef(0);
  const dimsRef = useRef<StageDims>({ W: 360, H: CAM_H, GROUND: Math.round(CAM_H * 0.78) });
  const drawStateRef = useRef(makeDrawState(script));
  const [cssSize, setCssSize] = useState({ w: 0, h: 0 });

  // versículo do beat atual (pelo número; fallback pela ordem)
  const verse = useMemo(() => {
    if (!verses.length || !beat) return null;
    return verses.find((v) => v.number === beat.v) ?? verses[Math.min(idx, verses.length - 1)];
  }, [verses, beat, idx]);

  // elenco/props/ambiente do beat atual
  const staged = useMemo(() => stagedAt(script, idx), [script, idx]);
  useEffect(() => { drawStateRef.current.envTarget = envAt(script, idx); }, [script, idx]);

  // ---------- typewriter do narrador ----------
  const [shown, setShown] = useState("");
  const fullText = verse?.text ?? "";
  const typeDone = shown.length >= fullText.length;
  useEffect(() => {
    setShown("");
    if (!fullText) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setShown(fullText); return; }
    let i = 0;
    const id = window.setInterval(() => {
      i += 2;
      setShown(fullText.slice(0, i));
      if (i >= fullText.length) window.clearInterval(id);
    }, 24);
    return () => window.clearInterval(id);
  }, [fullText]);

  // ---------- voz + ambiente sonoro ----------
  useEffect(() => {
    if (!beat || !verse) return;
    if (beat.by) {
      const quote = balloonText(verse.text, beat.q);
      if (beat.by === "cristo") speakBeat(quote, undefined);
      else speakBeat(undefined, quote);
    }
  }, [idx, beat, verse]);
  useEffect(() => {
    const e = envAt(script, idx);
    setAmbience({
      sea: e.terrain === "patmos" ? 0.55 : 0,
      wind: e.terrain === "patmos" ? 0.35 : 0.2,
      storm: e.storm, fire: e.fire, rain: 0,
      night: e.night, glory: e.glory,
    });
  }, [script, idx]);
  useEffect(() => () => cancelVoice(), []);

  // ---------- avanço ----------
  const advanceTap = useCallback(() => {
    if (!typeDone) { setShown(fullText); return; }
    if (done) return;
    if (!nextNeedsWalk) setIdx((i) => Math.min(i + 1, script.beats.length - 1));
  }, [typeDone, fullText, done, nextNeedsWalk, script.beats.length]);

  // ---------- input: segurar = andar, toque = avançar ----------
  const holdRef = useRef<{ timer: number | null; walking: boolean; startT: number }>({ timer: null, walking: false, startT: 0 });
  const localX = (e: React.PointerEvent) => {
    const el = wrapRef.current!;
    if (cssRotateRef.current) return e.clientY;
    const r = el.getBoundingClientRect();
    return e.clientX - r.left;
  };
  const localW = () => {
    const el = wrapRef.current;
    if (!el) return window.innerWidth;
    return cssRotateRef.current ? el.offsetWidth : el.getBoundingClientRect().width;
  };
  const onPointerDown = (e: React.PointerEvent) => {
    const x = localX(e); const w = localW();
    const dir: -1 | 1 = x < w * 0.5 ? -1 : 1;
    holdRef.current.startT = performance.now();
    holdRef.current.walking = false;
    holdRef.current.timer = window.setTimeout(() => {
      holdRef.current.walking = true;
      playerRef.current.dir = dir;
      playerRef.current.face = dir;
    }, 150);
  };
  const stopHold = () => {
    if (holdRef.current.timer) { window.clearTimeout(holdRef.current.timer); holdRef.current.timer = null; }
    playerRef.current.dir = 0;
  };
  const onPointerUp = () => {
    const wasWalking = holdRef.current.walking;
    const quick = performance.now() - holdRef.current.startT < 240;
    stopHold();
    holdRef.current.walking = false;
    if (!wasWalking && quick) advanceTap();
  };
  useEffect(() => {
    const kd = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (k === "arrowright" || k === "d") { playerRef.current.dir = 1; playerRef.current.face = 1; e.preventDefault(); }
      else if (k === "arrowleft" || k === "a") { playerRef.current.dir = -1; playerRef.current.face = -1; e.preventDefault(); }
      else if (k === " " || k === "enter") { advanceTap(); e.preventDefault(); }
    };
    const ku = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (["arrowright", "arrowleft", "a", "d"].includes(k)) playerRef.current.dir = 0;
    };
    window.addEventListener("keydown", kd);
    window.addEventListener("keyup", ku);
    return () => { window.removeEventListener("keydown", kd); window.removeEventListener("keyup", ku); };
  }, [advanceTap]);

  // ---------- medidas / canvas ----------
  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.offsetWidth, h = el.offsetHeight;
      if (!w || !h) return;
      setCssSize({ w, h });
      const aspect = w / h;
      const camW = Math.max(280, Math.min(680, Math.round(CAM_H * aspect)));
      dimsRef.current = { W: camW, H: CAM_H, GROUND: Math.round(CAM_H * 0.78) };
      const c = canvasRef.current;
      if (c) { c.width = camW; c.height = CAM_H; c.getContext("2d")!.imageSmoothingEnabled = false; }
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [cssRotate]);

  // ---------- game loop ----------
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0; let last = 0; let mounted = true;
    const frame = (now: number) => {
      if (!mounted) return;
      const dt = Math.min(48, now - last || 16); last = now;
      const c = canvasRef.current; const g = c?.getContext("2d");
      if (!c || !g) { raf = requestAnimationFrame(frame); return; }
      const dims = dimsRef.current;
      const p = playerRef.current;

      // física do andar
      if (p.dir !== 0) {
        p.x = Math.max(40, Math.min(stageLen - 40, p.x + p.dir * WALK_SPEED * dt));
        p.moving = true;
      } else p.moving = false;

      // chegou no marcador do próximo beat?
      const i = idxRef.current;
      const nb = script.beats[i + 1];
      if (nb) {
        const need = (nb.step ?? (nb.by ? 0 : 84)) > 0;
        if (need && Math.abs(p.x - anchors[i + 1]) < ARRIVE_DIST) setIdx(i + 1);
      }

      // câmera segue o herói (com folga p/ frente)
      const targetCam = Math.max(0, Math.min(stageLen - dims.W, p.x - dims.W * 0.38));
      camRef.current += (targetCam - camRef.current) * (reduce ? 1 : 0.12);
      const camX = camRef.current;

      g.clearRect(0, 0, dims.W, dims.H);
      drawStageBackdrop(g, { dims, camX, t: now, reduce, state: drawStateRef.current });

      // marcador de avanço (quando precisa andar)
      if (nb && (nb.step ?? (nb.by ? 0 : 84)) > 0) {
        const mx = anchors[idxRef.current + 1] - camX;
        if (mx > -20 && mx < dims.W + 20) drawStageMarker(g, mx, dims, now, reduce);
      }

      // elenco + props
      drawStagedElements(g, stagedRef.current.cast, stagedRef.current.props, camX, dims, now, reduce, drawStageProp);

      // herói (jogador) — anda de verdade
      drawMascot(g, Math.round(p.x - camX), dims.GROUND, { ...DEFAULT_LOOK, ...(look || {}) }, {
        t: now, reduce, walking: p.moving, mood: "idle",
      });

      // balão segue o ator quando a câmera se move
      if (balloonElRef.current && balloonActorXRef.current != null) {
        const scaleX = cssSizeRef.current.w / dims.W || 1;
        const bx = Math.max(70, Math.min(cssSizeRef.current.w - 70, (balloonActorXRef.current - camX) * scaleX));
        balloonElRef.current.style.left = `${bx}px`;
      }

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => { mounted = false; cancelAnimationFrame(raf); };
  }, [script, anchors, stageLen, look]);
  const stagedRef = useRef(staged); stagedRef.current = staged;

  // ---------- balão de fala (DOM, nítido) ----------
  const balloonElRef = useRef<HTMLDivElement>(null);
  const balloonActorXRef = useRef<number | null>(null);
  const balloon = useMemo(() => {
    if (!beat?.by || !verse) return null;
    const text = balloonText(verse.text, beat.q);
    const dims = dimsRef.current;
    const scaleX = cssSize.w / dims.W || 1;
    const scaleY = cssSize.h / dims.H || 1;
    // acha o ator que fala em cena
    const actor = staged.cast.find((cst) => (cst.id ?? cst.role) === beat.by);
    if (!actor) {
      balloonActorXRef.current = null;
      // voz sem corpo em cena (ex.: Ap 1:8) — pílula dourada central
      return { text, name: SPEAKER_NAME[beat.by] ?? beat.by, cx: cssSize.w / 2, bottomPx: cssSize.h * 0.55, voice: true };
    }
    balloonActorXRef.current = actor.x;
    const h = stageActorHeight(actor.role, actor.scale ?? 1);
    const cx = (actor.x - camRef.current) * scaleX;
    // bottom CSS = distância a partir da base até logo ACIMA da cabeça do ator
    const bottomPx = cssSize.h - (dims.GROUND - h - 6) * scaleY;
    return { text, name: SPEAKER_NAME[beat.by] ?? beat.by, cx: Math.max(70, Math.min(cssSize.w - 70, cx)), bottomPx, voice: false };
  }, [beat, verse, staged, cssSize, idx]);
  const cssSizeRef = useRef(cssSize); cssSizeRef.current = cssSize;

  // ---------- estados de carregamento ----------
  if (isLoading) {
    return <div className="h-full flex items-center justify-center text-[#cdbfa0] text-sm animate-pulse">Preparando a cena…</div>;
  }
  if (error) {
    return (
      <div className="h-full flex flex-col items-center justify-center gap-3 p-6 text-center">
        <p className="text-sm text-red-300">{error}</p>
        {onRetry && <button onClick={onRetry} className="rpg-btn px-4 py-2 text-sm">Tentar de novo</button>}
      </div>
    );
  }

  const rotateStyle: React.CSSProperties = cssRotate
    ? { position: "fixed", top: 0, left: "100vw", width: "100dvh", height: "100dvw", transform: "rotate(90deg)", transformOrigin: "0 0", zIndex: 70 }
    : { position: "absolute", inset: 0 };

  const isFav = verse ? favorites?.has(verse.number) : false;

  return (
    <div
      ref={wrapRef}
      style={rotateStyle}
      className="bg-[#0b0805] overflow-hidden select-none touch-none"
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={stopHold}
      onPointerLeave={stopHold}
    >
      {/* cena */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ imageRendering: "pixelated" }} />
      {/* scanlines + vinheta */}
      <div className="absolute inset-0 pointer-events-none mix-blend-multiply" style={{ background: "repeating-linear-gradient(180deg, rgba(0,0,0,0) 0 2px, rgba(0,0,0,.12) 2px 3px)" }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(120% 90% at 50% 40%, transparent 60%, rgba(5,7,12,.5) 100%)" }} />

      {/* topo: referência + progresso + fechar */}
      <div className="absolute top-2 left-3 right-3 flex items-center justify-between pointer-events-none">
        <div className="px-2.5 py-1 rounded-lg bg-black/55 border border-[#e8b04b55]">
          <span className="text-[11px] font-black text-[#ffd889]">{bookName} {chapter}</span>
          <span className="text-[10px] text-[#cdbfa0]"> • v. {beat?.v ?? 1}/{script.beats[script.beats.length - 1]?.v ?? verses.length}</span>
        </div>
        {onClose && (
          <button onClick={onClose} className="pointer-events-auto p-1.5 rounded-lg bg-black/55 border border-[#3a2c18] text-[#cdbfa0]">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* dica de movimento */}
      {nextNeedsWalk && typeDone && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-0.5 text-[#ffd889]/80 pointer-events-none"
        >
          <span className="text-[10px] font-bold">segure p/ andar</span>
          <ChevronRight className="w-4 h-4 animate-pulse" />
        </motion.div>
      )}

      {/* balão de fala do personagem */}
      <AnimatePresence mode="wait">
        {balloon && (
          <motion.div
            key={`${idx}`}
            ref={balloonElRef}
            initial={{ opacity: 0, scale: 0.85, y: 6, x: "-50%" }}
            animate={{ opacity: 1, scale: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, scale: 0.9, x: "-50%" }}
            className="absolute pointer-events-none"
            style={{ left: balloon.cx, bottom: balloon.bottomPx, maxWidth: "min(72vw, 380px)" }}
          >
            <div className={`relative px-3 py-2 rounded-xl border-2 text-[12px] leading-snug shadow-[0_4px_18px_rgba(0,0,0,0.5)] ${balloon.voice ? "bg-[#241a08f2] border-[#e8b04b] text-[#ffedbd]" : "bg-[#101a2ef2] border-[#5b9bff] text-blue-50"}`}>
              <span className={`block text-[9px] font-black tracking-wider uppercase mb-0.5 ${balloon.voice ? "text-[#ffd889]" : "text-[#8ab8ff]"}`}>{balloon.name}</span>
              {balloon.text}
              {!balloon.voice && (
                <span className="absolute left-1/2 -bottom-[7px] -translate-x-1/2 w-3 h-3 rotate-45 bg-[#101a2ef2] border-r-2 border-b-2 border-[#5b9bff]" />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* narrador (escritor/versículo) — rodapé */}
      <div className="absolute left-0 right-0 bottom-0 px-3 pt-8 pb-2" style={{ background: "linear-gradient(180deg, transparent, rgba(5,4,2,0.88) 34%)", paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}>
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[10px] font-black tracking-widest text-[#9c8b68] uppercase">✒️ {bookName} {chapter}:{beat?.v}</span>
            <div className="flex items-center gap-1.5">
              {onToggleFavorite && verse && (
                <button
                  onPointerDown={(e) => e.stopPropagation()}
                  onPointerUp={(e) => e.stopPropagation()}
                  onClick={(e) => { e.stopPropagation(); onToggleFavorite(verse.number); }}
                  className={`p-1 rounded-md border ${isFav ? "bg-[#e8846b33] border-[#e8846b] text-[#ff9a84]" : "bg-black/40 border-[#3a2c18] text-[#9c8b68]"}`}
                >
                  <Heart className="w-3.5 h-3.5" fill={isFav ? "currentColor" : "none"} />
                </button>
              )}
            </div>
          </div>
          <p className="text-[13px] sm:text-sm leading-snug text-[#f2e8d0] min-h-[2.4em]">
            {shown}
            {!typeDone && <span className="animate-pulse text-[#ffd889]">▌</span>}
          </p>
          <div className="flex items-center justify-between mt-1">
            <span className="text-[9px] text-[#6d5f43]">
              {done && typeDone ? "" : nextNeedsWalk ? "ande até a luz para continuar →" : "toque para continuar"}
            </span>
            {done && typeDone && (
              <motion.button
                initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                onPointerDown={(e) => e.stopPropagation()}
                onPointerUp={(e) => e.stopPropagation()}
                onClick={(e) => { e.stopPropagation(); onFinish(); }}
                className="rpg-btn px-4 py-1.5 text-xs font-black inline-flex items-center gap-1"
              >
                Concluir leitura <ChevronRight className="w-3.5 h-3.5" />
              </motion.button>
            )}
          </div>
        </div>
      </div>

      {/* setas de andar (desktop hint discreto) */}
      <div className="absolute bottom-16 left-3 hidden md:flex items-center gap-1 text-[#6d5f43] text-[10px] pointer-events-none">
        <ChevronLeft className="w-3 h-3" /> A/D ou setas para andar <ChevronRight className="w-3 h-3" />
      </div>
    </div>
  );
};

export default RPGStageScene;
