import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, X, Heart } from "lucide-react";
import { drawMascot, DEFAULT_LOOK, mountLift, type MascotLook } from "@/lib/rpgMascot";
import { drawProp as drawBaseProp, pixel } from "@/lib/rpgActors";
import {
  stagedAt, envAt, balloonText, makeDrawState, drawStageBackdrop,
  depthToFeetY, depthScale, SET_W, SET_CENTER,
  type StageScript, type StageDims,
} from "@/lib/rpgStage";
import { drawStageActor, stageActorHeight, type StageRole, type StagePose } from "@/lib/rpgStageActors";
import { setAmbience } from "@/lib/rpgAudio";
import { speakBeat, cancelVoice } from "@/lib/rpgVoice";
import { actorInfo, propInfo, type StageInfo } from "@/lib/rpgStageInfo";

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
  // identificação sobre o herói (igual às salas) — preparação p/ multiplayer
  characterName?: string | null;
  level?: number;
  isAdmin?: boolean;
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
  if (kind === "church") {
    // igreja do séc. I: pedra clara, telhado de telhas, porta em arco com luz,
    // duas colunas e janelinhas — detalhada como pedido
    const R = pixel(g); const S = o.scale ?? 1; const t = o.t ?? 0;
    const stone = "#b8a988", stoneD = "#8f8266", stoneHL = "#d4c6a4";
    const roof = "#9a5638", roofD = "#6e3a24";
    // corpo
    R(x - 30 * S, fy - 34 * S, 60 * S, 34 * S, stone);
    R(x - 30 * S, fy - 34 * S, 60 * S, 2 * S, stoneHL);
    R(x - 30 * S, fy - 2 * S, 60 * S, 2 * S, stoneD);
    // juntas de pedra
    for (let r = 0; r < 5; r++) for (let cx2 = 0; cx2 < 5; cx2++)
      R(x - 28 * S + cx2 * 12 * S + (r % 2) * 6 * S, fy - 30 * S + r * 6 * S, 10 * S, 1, stoneD);
    // telhado com telhas
    for (let i = 0; i < 8; i++) {
      R(x - (34 - i * 4) * S, fy - (34 + i * 2.6) * S, (68 - i * 8) * S, 3 * S, i % 2 ? roof : roofD);
    }
    // porta em arco com luz interna (lâmpada acesa)
    R(x - 7 * S, fy - 18 * S, 14 * S, 18 * S, "#3a2c1c");
    R(x - 5 * S, fy - 20 * S, 10 * S, 3 * S, "#3a2c1c");
    const gl = o.reduce ? 0.6 : Math.sin(t * 0.003) * 0.15 + 0.65;
    g.save(); g.globalAlpha *= gl;
    R(x - 4 * S, fy - 16 * S, 8 * S, 16 * S, "#ffca70");
    R(x - 2 * S, fy - 14 * S, 4 * S, 14 * S, "#ffe6a8");
    g.restore();
    // colunas
    for (const s of [-1, 1]) {
      R(x + s * 14 * S - 2 * S, fy - 22 * S, 4 * S, 22 * S, stoneHL);
      R(x + s * 14 * S - 3 * S, fy - 24 * S, 6 * S, 2 * S, stone);
      R(x + s * 14 * S - 3 * S, fy - 2 * S, 6 * S, 2 * S, stone);
      R(x + s * 14 * S + 1 * S, fy - 22 * S, 1 * S, 20 * S, stoneD);
    }
    // janelas em arco
    for (const s of [-1, 1]) {
      R(x + s * 23 * S - 2 * S, fy - 28 * S, 4 * S, 6 * S, "#2c2418");
      R(x + s * 23 * S - 1 * S, fy - 29 * S, 2 * S, 1 * S, "#2c2418");
    }
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

export const RPGStageScene = ({ bookName, chapter, verses, script, isLoading, error, onRetry, look, onFinish, onClose, onToggleFavorite, favorites, characterName, level, isAdmin }: Props) => {
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
  const [compact, setCompact] = useState(false);

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

    // MULTIPLAYER-READY: a troca de cena NUNCA move o jogador — ele é dono da
    // própria posição (como nas salas). O que muda ao redor são paisagens,
    // objetos e personagens. (Exceção única: ao FIM do capítulo, o herói é
    // conduzido à porta do desafio — ver efeito próprio.)
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
  // Quando o versículo é FALA, o texto é digitado DENTRO do balão (a barra de
  // baixo mostra só a referência — sem duplicar, como pedido).
  const quote = useMemo(() => (beat?.by && verse ? balloonText(verse.text, beat.q) : null), [beat, verse]);
  const [shown, setShown] = useState("");
  const fullText = quote ?? verse?.text ?? "";
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

  // Fim do capítulo: conduz o herói automaticamente até a porta do desafio
  // (única situação em que o jogo guia a posição do jogador).
  useEffect(() => {
    if (done && typeDone && !finishedRef.current) {
      const p = playerRef.current;
      p.tx = SET_W - DOOR_X_OFF;
      p.tdy = DOOR_DY;
    }
  }, [done, typeDone]);

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

  // ---------- toque: inspecionar NPC/objeto OU andar até o ponto ----------
  const [info, setInfo] = useState<StageInfo | null>(null);
  const localPoint = (e: React.PointerEvent) => {
    const el = wrapRef.current!;
    if (cssRotateRef.current) return { x: e.clientY, y: window.innerWidth - e.clientX };
    const r = el.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };
  const toWorld = (e: React.PointerEvent) => {
    const pt = localPoint(e);
    const dims = dimsRef.current;
    const cs = cssSizeRef.current;
    const scaleX = cs.w / dims.W || 1;
    const scaleY = cs.h / dims.H || 1;
    const wx = pt.x / scaleX + camRef.current;
    const py = pt.y / scaleY;
    const bandTop = dims.GROUND + 8, bandBot = dims.BOT ?? (dims.H - 18);
    const wdy = (py - bandTop) / Math.max(1, bandBot - bandTop);
    return { wx, wdy, py };
  };
  // toque no "?" (badge sobre personagem/objeto) abre a ficha
  const hitQSpot = (wx: number, py: number): StageInfo | null => {
    for (const q of qSpotsRef.current) {
      if (Math.abs(q.x - wx) < 11 && Math.abs(q.y - py) < 11) return q.info;
    }
    return null;
  };
  const walkToWorld = (wx: number, wdy: number) => {
    const p = playerRef.current;
    p.tx = Math.max(24, Math.min(SET_W - 24, wx));
    p.tdy = Math.max(0, Math.min(1, wdy));
  };
  const draggingRef = useRef(false);
  const onPointerDown = (e: React.PointerEvent) => {
    const { wx, wdy, py } = toWorld(e);
    const inf = hitQSpot(wx, py);
    if (inf) { setInfo(inf); return; }
    draggingRef.current = true;
    walkToWorld(wx, wdy);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    const { wx, wdy } = toWorld(e);
    walkToWorld(wx, wdy);
  };
  const onPointerUp = () => { draggingRef.current = false; };

  // ---------- medidas ----------
  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.offsetWidth, h = el.offsetHeight;
      if (!w || !h) return;
      setCssSize({ w, h });
      // MODO COMPACTO (celular): a barra do narrador cobre o rodapé; reservamos
      // esse espaço no palco (BOT) p/ a faixa andável terminar ACIMA da UI e a
      // cena inteira ficar visível.
      const isCompact = h < 470;
      setCompact(isCompact);
      const aspect = w / h;
      const camW = Math.max(320, Math.min(760, Math.round(CAM_H * aspect)));
      dimsRef.current = {
        W: camW, H: CAM_H,
        GROUND: Math.round(CAM_H * (isCompact ? 0.44 : 0.52)),
        BOT: CAM_H - (isCompact ? 62 : 26),
      };
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
  const heroTagRef = useRef<HTMLDivElement>(null);
  const doorOpenRef = useRef(false);
  const finishedRef = useRef(false);
  const dustRef = useRef<{ x: number; fy: number; born: number }[]>([]);
  const lastDustRef = useRef(0);
  // pontos clicáveis "?" (fichas) calculados por frame no loop
  const qSpotsRef = useRef<{ x: number; y: number; info: StageInfo }[]>([]);
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
      // jogador — VIRA para o lado que anda (espelho) + poeira nos pés
      if (p.moving && !reduce && now - lastDustRef.current > 130) {
        lastDustRef.current = now;
        dustRef.current.push({ x: p.x - p.face * 8, fy: depthToFeetY(p.dy, dims), born: now });
        if (dustRef.current.length > 10) dustRef.current.shift();
      }
      for (const d of dustRef.current) {
        const age = (now - d.born) / 520;
        if (age >= 1) continue;
        g.save(); g.globalAlpha = (1 - age) * 0.5;
        const R2 = pixel(g);
        R2(d.x - camX - 1, d.fy - 2 - age * 5, 2, 2, "#cbb98d");
        R2(d.x - camX + 2, d.fy - 1 - age * 3, 2, 1, "#a89a74");
        g.restore();
      }
      dustRef.current = dustRef.current.filter((d) => now - d.born < 520);
      {
        const fy = depthToFeetY(p.dy, dims);
        const k = depthScale(p.dy) * HERO_SCALE;
        const px = Math.round(p.x - camX);
        items.push({
          fy, draw: () => {
            g.save();
            g.translate(px, fy);
            g.scale(p.face === -1 ? -k : k, k);
            g.translate(-px, -fy);
            drawMascot(g, px, fy, { ...DEFAULT_LOOK, ...(look || {}) }, { t: now, reduce, walking: p.moving, mood: "idle" });
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

      // ---- badges "?" clicáveis sobre personagens/objetos com ficha ----
      const spots: { x: number; y: number; info: StageInfo }[] = [];
      const qBadge = (sx: number, sy: number) => {
        const R2 = pixel(g);
        const pulse = reduce ? 0 : Math.sin(now * 0.004) * 1;
        const yy = sy + pulse;
        R2(sx - 4, yy - 4, 8, 8, "#241a08");
        R2(sx - 4, yy - 5, 8, 1, "#e8b04b"); R2(sx - 4, yy + 4, 8, 1, "#e8b04b");
        R2(sx - 5, yy - 4, 1, 8, "#e8b04b"); R2(sx + 4, yy - 4, 1, 8, "#e8b04b");
        // "?" desenhado em pixels
        R2(sx - 1.5, yy - 2.5, 3, 1, "#ffd889");
        R2(sx + 0.5, yy - 1.5, 1, 1, "#ffd889");
        R2(sx - 0.5, yy - 0.5, 1, 1.6, "#ffd889");
        R2(sx - 0.5, yy + 2, 1, 1, "#ffd889");
      };
      // um "?" por TIPO (sem poluir a tela): se há 7 castiçais, só o mais
      // próximo do centro da tela ganha o badge
      const best = new Map<string, { x: number; y: number; info: StageInfo; d: number }>();
      const consider = (key: string, x: number, y: number, inf: StageInfo) => {
        const sx = x - camX;
        if (sx < -12 || sx > dims.W + 12) return;
        const d = Math.abs(sx - dims.W / 2);
        const cur = best.get(key);
        if (!cur || d < cur.d) best.set(key, { x, y, info: inf, d });
      };
      for (const [, a] of live) {
        if (a.alpha < 0.6) continue;
        const inf = actorInfo(a.role);
        if (!inf) continue;
        const fy = depthToFeetY(a.dy, dims);
        const h = stageActorHeight(a.role as StageRole, (a.scale ?? 1) * depthScale(a.dy));
        consider(`a:${a.role}`, a.x, fy - h - 9, inf);
      }
      for (const pr of stagedRef.current.props) {
        const inf = propInfo(pr.kind);
        if (!inf) continue;
        const fy = depthToFeetY(pr.feetDy, dims);
        consider(`p:${pr.kind}`, pr.x, fy - 32 * (pr.scale ?? 1) * depthScale(pr.feetDy) - 8, inf);
      }
      for (const [, b2] of best) {
        spots.push({ x: b2.x, y: b2.y, info: b2.info });
        qBadge(b2.x - camX, b2.y);
      }
      qSpotsRef.current = spots;

      // ---- fade de troca de set
      if (fadeRef.current > 0.01) {
        fadeRef.current *= reduce ? 0 : 0.92;
        g.save(); g.globalAlpha = Math.min(1, fadeRef.current); g.fillStyle = "#060403"; g.fillRect(0, 0, dims.W, dims.H); g.restore();
      }

      // ---- tag de identificação segue o herói: sempre ACIMA da cabeça, na
      // distância certa — com ou sem montaria (usa o lift real da montaria)
      if (heroTagRef.current) {
        const cs = cssSizeRef.current;
        const scaleX = cs.w / dims.W || 1;
        const scaleY = cs.h / dims.H || 1;
        const k2 = depthScale(p.dy) * HERO_SCALE;
        const fy = depthToFeetY(p.dy, dims);
        const lift = mountLift((look?.mount ?? DEFAULT_LOOK.mount));
        // topo da cabeça ≈ 50px acima dos pés (+ altura da montaria), + folga de 4
        const tagY = fy - (50 + lift + 4) * k2;
        heroTagRef.current.style.left = `${(p.x - camX) * scaleX}px`;
        heroTagRef.current.style.bottom = `${cs.h - tagY * scaleY}px`;
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

      {/* tag de identificação do herói (padrão das salas: 👑 nível + nome + DEV) */}
      {characterName && (
        <div
          ref={heroTagRef}
          className="absolute pointer-events-none z-10 flex items-center gap-1"
          style={{ transform: "translateX(-50%)", left: "50%", bottom: "45%" }}
        >
          <span className="inline-flex items-center gap-0.5 px-1 py-[1px] rounded bg-black/65 border border-[#ffd88966] text-[9px] font-black text-[#ffd889] leading-none whitespace-nowrap">
            👑{level ?? 0}
          </span>
          <span className={`px-1.5 py-[1px] rounded text-[10px] font-black leading-none whitespace-nowrap ${isAdmin ? "bg-[#c084fc22] border border-[#c084fc] text-[#e2c6ff]" : "bg-[#e8b04b26] border border-[#ffd889aa] text-[#ffe9b0]"}`}>
            {characterName}
          </span>
          {isAdmin && (
            <span className="px-1 py-[1px] rounded bg-[#c084fc] text-[8px] font-black text-[#2a1245] leading-none">DEV</span>
          )}
        </div>
      )}

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
              ? { left: "50%", bottom: "58%", width: "min(70vw, 360px)" }
              : { left: cssSize.w / 2, bottom: cssSize.h * 0.5, width: "min(64vw, 320px)" }}
          >
            {/* largura FIXA — o balão não muda de tamanho com o movimento */}
            <div className={`relative px-3 py-2 rounded-xl border-2 text-[12px] leading-snug shadow-[0_4px_18px_rgba(0,0,0,0.5)] ${balloon.voice ? "bg-[#241a08f2] border-[#e8b04b] text-[#ffedbd]" : "bg-[#101a2ef2] border-[#5b9bff] text-blue-50"}`}>
              <span className={`block text-[9px] font-black tracking-wider uppercase mb-0.5 ${balloon.voice ? "text-[#ffd889]" : "text-[#8ab8ff]"}`}>{balloon.name}</span>
              {/* a fala é DIGITADA aqui (a barra de baixo mostra só a referência) */}
              {shown}
              {!typeDone && <span className="animate-pulse text-[#ffd889]">▌</span>}
              {!balloon.voice && (
                <span className="absolute left-1/2 -bottom-[7px] -translate-x-1/2 w-3 h-3 rotate-45 bg-[#101a2ef2] border-r-2 border-b-2 border-[#5b9bff]" />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ficha do personagem/objeto tocado */}
      <AnimatePresence>
        {info && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 z-30 flex items-center justify-center p-4 bg-black/55"
            onPointerDown={(e) => { e.stopPropagation(); }}
            onPointerUp={(e) => { e.stopPropagation(); }}
            onClick={(e) => { e.stopPropagation(); setInfo(null); }}
          >
            <motion.div
              initial={{ scale: 0.85, y: 12 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 20 }}
              className="relative w-full max-w-sm rounded-2xl border-2 border-[#e8b04b] p-4 text-left"
              style={{ background: "linear-gradient(180deg,#1c1710,#0c0a06)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setInfo(null)}
                className="absolute top-2 right-2 p-1 rounded-md bg-black/40 border border-[#3a2c18] text-[#cdbfa0]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
              <h3 className="text-base font-black text-[#ffd889] pr-6">{info.title}</h3>
              <p className="text-[10px] font-bold tracking-wide text-[#9c8b68] uppercase mb-2">{info.subtitle}</p>
              <p className="text-[12px] leading-relaxed text-[#e8dfc8]">{info.text}</p>
              <p className="mt-2 text-[9px] text-[#6d5f43]">toque fora para fechar</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* narrador + botão AVANÇAR (compacto no celular) */}
      <div className={`absolute left-0 right-0 bottom-0 px-3 ${compact ? "pt-3 pb-1" : "pt-8 pb-2"}`} style={{ background: "linear-gradient(180deg, transparent, rgba(5,4,2,0.9) 30%)", paddingBottom: "max(0.35rem, env(safe-area-inset-bottom))" }}>
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-0.5">
            <span className={`${compact ? "text-[9px]" : "text-[10px]"} font-black tracking-widest text-[#9c8b68] uppercase`}>✒️ {bookName} {chapter}:{beat?.v}</span>
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
            {/* narração vem aqui; FALA vai no balão (sem duplicar) */}
            <p className={`flex-1 ${compact ? "text-[11px] min-h-[1.8em]" : "text-[13px] sm:text-sm min-h-[2.4em]"} leading-snug text-[#f2e8d0]`}>
              {quote ? (
                <span className="text-[#8ab8ff] text-[11px] italic">💬 {SPEAKER_NAME[beat?.by ?? ""] ?? beat?.by} está falando…</span>
              ) : (
                <>
                  {shown}
                  {!typeDone && <span className="animate-pulse text-[#ffd889]">▌</span>}
                </>
              )}
            </p>
            {/* voltar um versículo */}
            {idx > 0 && !(done && typeDone) && (
              <button
                onPointerDown={(e) => e.stopPropagation()}
                onPointerUp={(e) => e.stopPropagation()}
                onClick={(e) => { e.stopPropagation(); setIdx((i) => Math.max(0, i - 1)); }}
                aria-label="Voltar versículo"
                className="shrink-0 px-2.5 py-2 rounded-xl text-[12px] font-black text-[#cdbfa0] bg-black/50 border border-[#3a2c18] active:scale-95 transition"
              >
                ←
              </button>
            )}
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
          {(!compact || (done && typeDone)) && (
            <span className="block text-[9px] mt-0.5" style={{ color: done && typeDone ? "#ffd889" : "#6d5f43" }}>
              {done && typeDone
                ? "✨ Uma porta se abriu à direita — entre nela para o desafio!"
                : `toque no chão para andar${typeof window !== "undefined" && window.innerWidth >= 768 ? " • setas/WASD • espaço avança" : ""}`}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default RPGStageScene;
