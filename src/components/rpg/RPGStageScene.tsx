import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, X, Heart } from "lucide-react";
import { drawMascot, DEFAULT_LOOK, type MascotLook } from "@/lib/rpgMascot";
import { drawProp as drawBaseProp, pixel } from "@/lib/rpgActors";
import {
  stagedAt, envAt, balloonText, makeDrawState, drawStageBackdrop,
  depthToFeetY, depthScale, SET_W, SET_CENTER,
  type StageScript, type StageDims,
} from "@/lib/rpgStage";
import { drawStageActor, stageActorHeight, type StageRole, type StagePose } from "@/lib/rpgStageActors";
import { setAmbience } from "@/lib/rpgAudio";
import { speakBeat, cancelVoice } from "@/lib/rpgVoice";

// ============================================================================
// RPGStageScene v2 — CENA VIVA com movimento LIVRE (4 direções + profundidade,
// estilo Habbo/Zelda): toque no chão para andar (ou setas/WASD no PC). O
// versículo avança pelo botão AVANÇAR (espaço/enter). Quando o beat muda, os
// atores ANDAM até as novas marcas. Diálogos = balões sobre quem fala.
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

const CAM_H = 256;        // mundo maior → personagens proporcionalmente menores
const HERO_SCALE = 0.85;  // encolhe o mascote em relação ao cenário
const WALK_X = 0.095;     // px lógicos / ms
const WALK_DY = 0.0024;   // profundidade / ms
const NPC_WALK = 0.055;   // atores andam um pouco mais devagar
const DOOR_X_OFF = 90;    // porta do desafio: SET_W - DOOR_X_OFF
const DOOR_DY = 0.34;

const SPEAKER_NAME: Record<string, string> = {
  cristo: "Jesus", anjo: "Anjo", joao: "João", anciao: "Ancião", hero: "Você",
};

// props extras do palco (porta etc.)
function drawStageProp(g: CanvasRenderingContext2D, kind: string, x: number, fy: number, o: { scale?: number; t?: number; reduce?: boolean; fire?: number } = {}) {
  if (kind === "rock") {
    const R = pixel(g); const S = o.scale ?? 1;
    R(x - 7 * S, fy - 6 * S, 14 * S, 6 * S, "#6d6456");
    R(x - 5 * S, fy - 9 * S, 9 * S, 4 * S, "#7d7466");
    R(x - 4 * S, fy - 8 * S, 3 * S, 2 * S, "#948a7a");
    R(x - 7 * S, fy - 1.5 * S, 14 * S, 1.5 * S, "#4a4238");
    return;
  }
  if (kind === "door") {
    const R = pixel(g); const S = o.scale ?? 1; const t = o.t ?? 0;
    R(x - 9 * S, fy - 30 * S, 18 * S, 30 * S, "#4a3a28");
    R(x - 7 * S, fy - 28 * S, 14 * S, 28 * S, "#2c2118");
    R(x + 5 * S, fy - 28 * S, 4 * S, 28 * S, "#5d4a30");
    const gl = o.reduce ? 0.6 : Math.sin(t * 0.004) * 0.15 + 0.7;
    g.save(); g.globalAlpha *= gl * 0.75;
    R(x - 6 * S, fy - 27 * S, 11 * S, 27 * S, "#ffe6a0");
    R(x - 3 * S, fy - 27 * S, 5 * S, 27 * S, "#fff5cc");
    g.restore();
    return;
  }
  drawBaseProp(g, kind, x, fy, o);
}

// estado vivo de um ator no palco (para tween/caminhada)
interface LiveActor {
  x: number; dy: number; alpha: number;
  tx: number; tdy: number;              // alvo (marca do beat)
  role: string; pose?: string; facing?: 1 | -1; scale?: number; palette?: string; glow?: number;
  leaving?: boolean;
}

export const RPGStageScene = ({ bookName, chapter, verses, script, isLoading, error, onRetry, look, onFinish, onClose, onToggleFavorite, favorites }: Props) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // ---------- orientação: tela cheia paisagem no mobile ----------
  const [cssRotate, setCssRotate] = useState(false);
  const cssRotateRef = useRef(false);
  useEffect(() => {
    const isMobile = Math.min(window.innerWidth, window.innerHeight) < 560;
    if (!isMobile) return;
    let cancelled = false;
    const tryLock = async () => {
      try { await document.documentElement.requestFullscreen?.(); } catch { /* segue */ }
      try {
        const so = screen.orientation as ScreenOrientation & { lock?: (o: string) => Promise<void> };
        await so.lock?.("landscape");
        if (!cancelled) { setCssRotate(false); cssRotateRef.current = false; }
        return;
      } catch { /* iOS: sem lock → rotação CSS */ }
      const p = window.matchMedia("(orientation: portrait)").matches;
      if (!cancelled) { setCssRotate(p); cssRotateRef.current = p; }
    };
    tryLock();
    const mq = window.matchMedia("(orientation: portrait)");
    const onCh = () => {
      const so = screen.orientation as ScreenOrientation & { lock?: unknown };
      const v = (!so.lock || cssRotateRef.current) ? mq.matches : mq.matches;
      setCssRotate(v); cssRotateRef.current = v;
    };
    mq.addEventListener?.("change", onCh);
    return () => {
      cancelled = true;
      mq.removeEventListener?.("change", onCh);
      try { (screen.orientation as ScreenOrientation & { unlock?: () => void }).unlock?.(); } catch { /* ok */ }
      if (document.fullscreenElement) document.exitFullscreen?.().catch(() => undefined);
    };
  }, []);

  // ---------- estado do jogo ----------
  const [idx, setIdx] = useState(0);
  const idxRef = useRef(0); idxRef.current = idx;
  const beat = script.beats[idx];
  const done = idx >= script.beats.length - 1;

  const playerRef = useRef({ x: SET_CENTER - 120, dy: 0.6, tx: null as number | null, tdy: null as number | null, keys: { l: false, r: false, u: false, d: false }, face: 1 as 1 | -1, moving: false });
  const camRef = useRef(0);
  const dimsRef = useRef<StageDims>({ W: 360, H: CAM_H, GROUND: Math.round(CAM_H * 0.6) });
  const drawStateRef = useRef(makeDrawState(script));
  const [cssSize, setCssSize] = useState({ w: 0, h: 0 });
  const cssSizeRef = useRef(cssSize); cssSizeRef.current = cssSize;

  // elenco vivo (tween) + fade de troca de set
  const liveRef = useRef<Map<string, LiveActor>>(new Map());
  const setKeyRef = useRef<string>("");
  const fadeRef = useRef(0);

  const staged = useMemo(() => stagedAt(script, idx), [script, idx]);
  useEffect(() => {
    drawStateRef.current.envTarget = envAt(script, idx);
    const live = liveRef.current;
    const changedSet = setKeyRef.current !== "" && staged.setKey !== setKeyRef.current;
    if (changedSet) { fadeRef.current = 1; live.clear(); }
    setKeyRef.current = staged.setKey;

    // AUTO-CAMINHADA: ao avançar, o herói se aproxima de onde a cena acontece
    // (não fica para trás). Em troca de set, ele "chega" junto com o fade.
    if (staged.cast.length) {
      const centerX = staged.cast.reduce((s, c2) => s + c2.x, 0) / staged.cast.length;
      const p = playerRef.current;
      if (changedSet) {
        p.x = Math.max(24, Math.min(SET_W - 24, centerX - 120));
        p.dy = 0.62; p.tx = null; p.tdy = null;
      } else if (Math.abs(p.x - centerX) > 135) {
        p.tx = Math.max(24, Math.min(SET_W - 24, centerX + (p.x < centerX ? -95 : 95)));
        p.tdy = 0.6;
      }
    }
    const seen = new Set<string>();
    for (const c of staged.cast) {
      const key = c.id ?? c.role;
      seen.add(key);
      const cur = live.get(key);
      if (!cur) {
        live.set(key, { x: c.x, dy: c.feetDy, alpha: changedSet ? 0 : 0.01, tx: c.x, tdy: c.feetDy, role: c.role, pose: c.pose, facing: c.facing, scale: c.scale, palette: c.palette, glow: c.glow });
      } else {
        cur.tx = c.x; cur.tdy = c.feetDy; cur.pose = c.pose; cur.facing = c.facing;
        cur.scale = c.scale; cur.palette = c.palette; cur.glow = c.glow; cur.leaving = false;
      }
    }
    for (const [key, a] of live) if (!seen.has(key)) a.leaving = true;
  }, [script, idx, staged]);

  // versículo do beat atual
  const verse = useMemo(() => {
    if (!verses.length || !beat) return null;
    return verses.find((v) => v.number === beat.v) ?? verses[Math.min(idx, verses.length - 1)];
  }, [verses, beat, idx]);

  // ---------- typewriter ----------
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
    }, 22);
    return () => window.clearInterval(id);
  }, [fullText]);

  // ---------- voz + ambiente ----------
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

  // ---------- avanço por botão / teclado ----------
  const advance = useCallback(() => {
    if (!typeDone) { setShown(fullText); return; }
    if (done) return;
    setIdx((i) => Math.min(i + 1, script.beats.length - 1));
  }, [typeDone, fullText, done, script.beats.length]);

  useEffect(() => {
    const kd = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      const p = playerRef.current;
      if (k === "arrowright" || k === "d") { p.keys.r = true; p.tx = null; p.tdy = null; e.preventDefault(); }
      else if (k === "arrowleft" || k === "a") { p.keys.l = true; p.tx = null; p.tdy = null; e.preventDefault(); }
      else if (k === "arrowup" || k === "w") { p.keys.u = true; p.tx = null; p.tdy = null; e.preventDefault(); }
      else if (k === "arrowdown" || k === "s") { p.keys.d = true; p.tx = null; p.tdy = null; e.preventDefault(); }
      else if (k === " " || k === "enter") { advance(); e.preventDefault(); }
    };
    const ku = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      const p = playerRef.current;
      if (k === "arrowright" || k === "d") p.keys.r = false;
      else if (k === "arrowleft" || k === "a") p.keys.l = false;
      else if (k === "arrowup" || k === "w") p.keys.u = false;
      else if (k === "arrowdown" || k === "s") p.keys.d = false;
    };
    window.addEventListener("keydown", kd);
    window.addEventListener("keyup", ku);
    return () => { window.removeEventListener("keydown", kd); window.removeEventListener("keyup", ku); };
  }, [advance]);

  // ---------- toque no chão = andar até lá ----------
  const localPoint = (e: React.PointerEvent) => {
    const el = wrapRef.current!;
    if (cssRotateRef.current) return { x: e.clientY, y: window.innerWidth - e.clientX };
    const r = el.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };
  const walkTo = (e: React.PointerEvent) => {
    const pt = localPoint(e);
    const dims = dimsRef.current;
    const cs = cssSizeRef.current;
    const scaleX = cs.w / dims.W || 1;
    const scaleY = cs.h / dims.H || 1;
    const worldX = pt.x / scaleX + camRef.current;
    const py = pt.y / scaleY;
    const bandTop = dims.GROUND + 6, bandBot = dims.H - 6;
    const p = playerRef.current;
    p.tx = Math.max(24, Math.min(SET_W - 24, worldX));
    p.tdy = Math.max(0, Math.min(1, (py - bandTop) / Math.max(1, bandBot - bandTop)));
  };
  const draggingRef = useRef(false);
  const onPointerDown = (e: React.PointerEvent) => { draggingRef.current = true; walkTo(e); };
  const onPointerMove = (e: React.PointerEvent) => { if (draggingRef.current) walkTo(e); };
  const onPointerUp = () => { draggingRef.current = false; };

  // ---------- medidas ----------
  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.offsetWidth, h = el.offsetHeight;
      if (!w || !h) return;
      setCssSize({ w, h });
      const aspect = w / h;
      const camW = Math.max(320, Math.min(760, Math.round(CAM_H * aspect)));
      dimsRef.current = { W: camW, H: CAM_H, GROUND: Math.round(CAM_H * 0.52) };
      const c = canvasRef.current;
      if (c) { c.width = camW; c.height = CAM_H; c.getContext("2d")!.imageSmoothingEnabled = false; }
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [cssRotate]);

  // ---------- game loop ----------
  const balloonElRef = useRef<HTMLDivElement>(null);
  const balloonKeyRef = useRef<string | null>(null);
  const doorOpenRef = useRef(false);
  const finishedRef = useRef(false);
  const onFinishRef = useRef(onFinish); onFinishRef.current = onFinish;
  const typeDoneRef = useRef(false); typeDoneRef.current = typeDone;
  const doneRef = useRef(false); doneRef.current = done;
  doorOpenRef.current = done && typeDone;
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

      // ---- movimento do jogador (teclas ou alvo de toque)
      let vx = 0, vdy = 0;
      if (p.keys.l) vx -= 1; if (p.keys.r) vx += 1;
      if (p.keys.u) vdy -= 1; if (p.keys.d) vdy += 1;
      if (vx === 0 && vdy === 0 && p.tx != null && p.tdy != null) {
        const dx = p.tx - p.x, ddy = p.tdy - p.dy;
        const distX = Math.abs(dx), distY = Math.abs(ddy);
        if (distX > 3 || distY > 0.04) {
          vx = distX > 3 ? Math.sign(dx) : 0;
          vdy = distY > 0.04 ? Math.sign(ddy) : 0;
        } else { p.tx = null; p.tdy = null; }
      }
      p.moving = vx !== 0 || vdy !== 0;
      if (vx !== 0) { p.face = vx > 0 ? 1 : -1; p.x = Math.max(24, Math.min(SET_W - 24, p.x + vx * WALK_X * dt)); }
      if (vdy !== 0) p.dy = Math.max(0, Math.min(1, p.dy + vdy * WALK_DY * dt));

      // ---- câmera segue o jogador
      const targetCam = SET_W <= dims.W ? (SET_W - dims.W) / 2 : Math.max(0, Math.min(SET_W - dims.W, p.x - dims.W / 2));
      camRef.current += (targetCam - camRef.current) * (reduce ? 1 : 0.12);
      const camX = camRef.current;

      // ---- fundo
      g.clearRect(0, 0, dims.W, dims.H);
      drawStageBackdrop(g, { dims, camX, t: now, reduce, state: drawStateRef.current });

      // ---- atores vivos: caminham até as marcas
      const live = liveRef.current;
      for (const [key, a] of live) {
        if (a.leaving) {
          a.alpha -= dt * 0.002;
          if (a.alpha <= 0) { live.delete(key); continue; }
        } else if (a.alpha < 1) a.alpha = Math.min(1, a.alpha + dt * 0.002);
        const dx = a.tx - a.x, ddy = a.tdy - a.dy;
        const moving = Math.abs(dx) > 2 || Math.abs(ddy) > 0.03;
        if (moving) {
          if (Math.abs(dx) > 2) a.x += Math.sign(dx) * Math.min(Math.abs(dx), NPC_WALK * dt);
          if (Math.abs(ddy) > 0.03) a.dy += Math.sign(ddy) * Math.min(Math.abs(ddy), 0.0016 * dt);
        }
        (a as LiveActor & { _walking?: boolean; _dir?: number })._walking = moving;
        (a as LiveActor & { _walking?: boolean; _dir?: number })._dir = dx !== 0 ? Math.sign(dx) : undefined;
      }

      // ---- desenhar tudo ordenado por profundidade (props → longe p/ perto)
      type DrawItem = { fy: number; draw: () => void };
      const items: DrawItem[] = [];
      for (const pr of stagedRef.current.props) {
        const fy = depthToFeetY(pr.feetDy, dims);
        const sx = pr.x - camX;
        if (sx < -90 || sx > dims.W + 90) continue;
        items.push({ fy, draw: () => drawStageProp(g, pr.kind, sx, fy, { scale: (pr.scale ?? 1) * depthScale(pr.feetDy), t: now, reduce, fire: pr.fire }) });
      }
      for (const [, a] of live) {
        const fy = depthToFeetY(a.dy, dims);
        const sx = a.x - camX;
        if (sx < -90 || sx > dims.W + 90) continue;
        const walking = (a as LiveActor & { _walking?: boolean })._walking;
        const dir = (a as LiveActor & { _dir?: number })._dir;
        items.push({
          fy, draw: () => drawStageActor(g, sx, fy, {
            role: a.role as StageRole,
            pose: (walking ? "walk" : (a.pose ?? "stand")) as StagePose,
            facing: (dir ?? a.facing ?? (sx > dims.W * 0.5 ? -1 : 1)) as 1 | -1,
            scale: (a.scale ?? 1) * depthScale(a.dy),
            t: now, reduce, palette: a.palette, glow: a.glow, alpha: a.alpha,
          }),
        });
      }
      // jogador
      {
        const fy = depthToFeetY(p.dy, dims);
        const k = depthScale(p.dy) * HERO_SCALE;
        items.push({
          fy, draw: () => {
            g.save();
            g.translate(Math.round(p.x - camX), fy);
            g.scale(k, k);
            g.translate(-Math.round(p.x - camX), -fy);
            drawMascot(g, Math.round(p.x - camX), fy, { ...DEFAULT_LOOK, ...(look || {}) }, { t: now, reduce, walking: p.moving, mood: "idle" });
            g.restore();
          },
        });
      }
      // PORTA DO DESAFIO: aparece quando o capítulo termina; entrar nela avança
      if (doorOpenRef.current) {
        const doorX = SET_W - DOOR_X_OFF;
        const doorFy = depthToFeetY(DOOR_DY, dims);
        const sx = doorX - camX;
        items.push({
          fy: doorFy, draw: () => {
            drawStageProp(g, "door", sx, doorFy, { scale: 1.5, t: now, reduce });
            // seta/brilho chamando o jogador
            const R2 = pixel(g);
            const bobArrow = reduce ? 0 : Math.sin(now * 0.005) * 3;
            R2(sx - 2, doorFy - 56 + bobArrow, 4, 4, "#ffd24a");
            R2(sx - 5, doorFy - 52 + bobArrow, 10, 3, "#ffe18a");
            R2(sx - 2, doorFy - 49 + bobArrow, 4, 3, "#ffd24a");
          },
        });
        // chegou na porta → desafio
        if (!finishedRef.current && Math.abs(p.x - doorX) < 26 && Math.abs(p.dy - DOOR_DY) < 0.24) {
          finishedRef.current = true;
          onFinishRef.current();
        }
      }

      items.sort((a2, b2) => a2.fy - b2.fy);
      for (const it of items) it.draw();

      // ---- fade de troca de set
      if (fadeRef.current > 0.01) {
        fadeRef.current *= reduce ? 0 : 0.92;
        g.save(); g.globalAlpha = Math.min(1, fadeRef.current); g.fillStyle = "#060403"; g.fillRect(0, 0, dims.W, dims.H); g.restore();
      }

      // ---- balão segue o ator que fala
      if (balloonElRef.current && balloonKeyRef.current) {
        const a = live.get(balloonKeyRef.current);
        if (a) {
          const cs = cssSizeRef.current;
          const scaleX = cs.w / dims.W || 1;
          const scaleY = cs.h / dims.H || 1;
          const bx = Math.max(80, Math.min(cs.w - 80, (a.x - camX) * scaleX));
          const h = stageActorHeight(a.role as StageRole, (a.scale ?? 1) * depthScale(a.dy));
          const by = cs.h - (depthToFeetY(a.dy, dims) - h - 6) * scaleY;
          balloonElRef.current.style.left = `${bx}px`;
          balloonElRef.current.style.bottom = `${by}px`;
        }
      }

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => { mounted = false; cancelAnimationFrame(raf); };
  }, [script, look]);
  const stagedRef = useRef(staged); stagedRef.current = staged;

  // ---------- balão (conteúdo) ----------
  const balloon = useMemo(() => {
    if (!beat?.by || !verse) return null;
    const text = balloonText(verse.text, beat.q);
    const onStage = staged.cast.some((cst) => (cst.id ?? cst.role) === beat.by);
    balloonKeyRef.current = onStage ? (beat.by as string) : null;
    return { text, name: SPEAKER_NAME[beat.by] ?? beat.by, voice: !onStage };
  }, [beat, verse, staged]);

  // ---------- loading / error ----------
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
  const lastV = script.beats[script.beats.length - 1]?.v ?? verses.length;

  return (
    <div
      ref={wrapRef}
      style={rotateStyle}
      className="bg-[#0b0805] overflow-hidden select-none touch-none"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ imageRendering: "pixelated" }} />
      <div className="absolute inset-0 pointer-events-none mix-blend-multiply" style={{ background: "repeating-linear-gradient(180deg, rgba(0,0,0,0) 0 2px, rgba(0,0,0,.12) 2px 3px)" }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(120% 90% at 50% 40%, transparent 60%, rgba(5,7,12,.5) 100%)" }} />

      {/* topo: referência + progresso + fechar */}
      <div className="absolute top-2 left-3 right-3 flex items-center justify-between pointer-events-none">
        <div className="px-2.5 py-1 rounded-lg bg-black/55 border border-[#e8b04b55]">
          <span className="text-[11px] font-black text-[#ffd889]">{bookName} {chapter}</span>
          <span className="text-[10px] text-[#cdbfa0]"> • v. {beat?.v ?? 1}/{lastV}</span>
        </div>
        {onClose && (
          <button
            onPointerDown={(e) => e.stopPropagation()}
            onPointerUp={(e) => e.stopPropagation()}
            onClick={onClose}
            className="pointer-events-auto p-1.5 rounded-lg bg-black/55 border border-[#3a2c18] text-[#cdbfa0]"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* balão de fala */}
      <AnimatePresence mode="wait">
        {balloon && (
          <motion.div
            key={`${idx}`}
            ref={balloonElRef}
            initial={{ opacity: 0, scale: 0.85, y: 6, x: "-50%" }}
            animate={{ opacity: 1, scale: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, scale: 0.9, x: "-50%" }}
            className="absolute pointer-events-none"
            style={balloon.voice
              ? { left: "50%", bottom: "58%", maxWidth: "min(72vw, 380px)" }
              : { left: cssSize.w / 2, bottom: cssSize.h * 0.5, maxWidth: "min(64vw, 340px)" }}
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

      {/* narrador + botão AVANÇAR */}
      <div className="absolute left-0 right-0 bottom-0 px-3 pt-8 pb-2" style={{ background: "linear-gradient(180deg, transparent, rgba(5,4,2,0.9) 32%)", paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}>
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[10px] font-black tracking-widest text-[#9c8b68] uppercase">✒️ {bookName} {chapter}:{beat?.v}</span>
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
          <div className="flex items-end gap-2">
            <p className="flex-1 text-[13px] sm:text-sm leading-snug text-[#f2e8d0] min-h-[2.4em]">
              {shown}
              {!typeDone && <span className="animate-pulse text-[#ffd889]">▌</span>}
            </p>
            {/* botão de avanço — comando do próximo versículo (some no fim: a PORTA assume) */}
            {!(done && typeDone) && (
              <motion.button
                initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                onPointerDown={(e) => e.stopPropagation()}
                onPointerUp={(e) => e.stopPropagation()}
                onClick={(e) => { e.stopPropagation(); advance(); }}
                className={`shrink-0 px-3.5 py-2 rounded-xl font-black text-[12px] inline-flex items-center gap-1 active:scale-95 transition ${typeDone
                  ? "text-[#2a1c05] bg-gradient-to-b from-[#ffe08a] to-[#e8b04b]"
                  : "text-[#cdbfa0] bg-black/50 border border-[#3a2c18]"}`}
              >
                {beat?.by ? "Continuar" : "Avançar"} <ChevronRight className="w-3.5 h-3.5" />
              </motion.button>
            )}
          </div>
          <span className="block text-[9px] mt-0.5" style={{ color: done && typeDone ? "#ffd889" : "#6d5f43" }}>
            {done && typeDone
              ? "✨ Uma porta se abriu à direita — entre nela para o desafio!"
              : `toque no chão para andar${typeof window !== "undefined" && window.innerWidth >= 768 ? " • setas/WASD • espaço avança" : ""}`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RPGStageScene;
