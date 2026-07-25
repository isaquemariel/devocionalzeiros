import { useEffect, useRef } from "react";
import { drawScene, seedParticles, type Particle, type SceneDims } from "@/lib/rpgScene";
import { drawMascot, DEFAULT_LOOK, mountLift, type MascotLook } from "@/lib/rpgMascot";
import type { RPGRegion } from "@/lib/rpgBibleData";
import { useWorldRoom, type RemotePlayer } from "@/hooks/useWorldRoom";

interface Props {
  roomId: string;         // id do canal (ex.: book:genesis | global)
  region: RPGRegion;      // cenário base (região do livro / fixo da global)
  variantKey: string;     // diferencia livros que compartilham a mesma região
  me: { userId: string; name: string; look: MascotLook } | null;
  onCount?: (n: number) => void;
  onConnected?: (b: boolean) => void;
}

// faixa "andável" do chão em profundidade (0=fundo, 1=frente)
const feetYAt = (ny: number, H: number) => Math.round(H * 0.60 + ny * (H * 0.93 - H * 0.60));
const feetXAt = (nx: number, W: number) => Math.round(W * 0.06 + nx * (W * 0.88));
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

// hash estável do id do livro → varia mood e partículas por livro
const hashStr = (s: string) => { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; };

// Identidade por livro: uma "tonalidade/hora do dia" sobreposta ao cenário base,
// pra que livros da mesma região (ex.: vários desertos) não fiquem idênticos.
const MOODS: { top: string; bot: string; a: number }[] = [
  { top: "#ffd9a0", bot: "#ff9e7a", a: 0.22 }, // amanhecer
  { top: "#bfe3ff", bot: "#fff3c8", a: 0.16 }, // manhã clara
  { top: "#ff9a6b", bot: "#7a4a8f", a: 0.26 }, // entardecer
  { top: "#2a3350", bot: "#101725", a: 0.30 }, // noite
  { top: "#8aa0b5", bot: "#414a58", a: 0.24 }, // nublado
  { top: "#ffe08a", bot: "#d98a3a", a: 0.24 }, // dourado
];
const GLOBAL_MOOD = { top: "#cfe3ff", bot: "#f2e6ff", a: 0.20 }; // celestial (praça)
const moodFor = (variantKey: string) => variantKey === "global" ? GLOBAL_MOOD : MOODS[hashStr(variantKey) % MOODS.length];

export default function RPGWorldRoom({ roomId, region, variantKey, me, onCount, onConnected }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const namesRef = useRef<HTMLCanvasElement>(null);
  const bufRef = useRef<HTMLCanvasElement | null>(null); // buffer 1:1 do boneco (nítido)

  const { playersRef, sendPos, stepRemotes, connected, count } = useWorldRoom(roomId, me, !!me);
  useEffect(() => { onCount?.(count); }, [count, onCount]);
  useEffect(() => { onConnected?.(connected); }, [connected, onConnected]);

  const posRef = useRef({ x: 0.5, y: 0.5 });
  const targetRef = useRef<{ x: number; y: number } | null>(null);
  const dirRef = useRef<1 | -1>(1);
  const keysRef = useRef<Record<string, boolean>>({});
  const meRef = useRef(me); meRef.current = me;

  useEffect(() => {
    let s = 0; for (const c of (me?.userId || "x")) s = (s * 31 + c.charCodeAt(0)) & 0xffff;
    posRef.current = { x: 0.35 + (s % 100) / 330, y: 0.45 + ((s >> 3) % 100) / 260 };
    targetRef.current = null;
  }, [roomId, me?.userId]);

  useEffect(() => {
    const onKey = (down: boolean) => (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (["arrowup", "arrowdown", "arrowleft", "arrowright", "w", "a", "s", "d"].includes(k)) {
        keysRef.current[k] = down;
        if (down) targetRef.current = null;
        e.preventDefault();
      }
    };
    const kd = onKey(true), ku = onKey(false);
    window.addEventListener("keydown", kd);
    window.addEventListener("keyup", ku);
    return () => { window.removeEventListener("keydown", kd); window.removeEventListener("keyup", ku); };
  }, []);

  const pointTo = (clientX: number, clientY: number) => {
    const cv = canvasRef.current; if (!cv) return;
    const r = cv.getBoundingClientRect();
    const px = (clientX - r.left) / r.width;
    const py = (clientY - r.top) / r.height;
    targetRef.current = { x: clamp01((px - 0.06) / 0.88), y: clamp01((py - 0.60) / (0.93 - 0.60)) };
  };

  useEffect(() => {
    const cv = canvasRef.current, names = namesRef.current, wrap = wrapRef.current;
    if (!cv || !names || !wrap) return;
    const g = cv.getContext("2d"); if (!g) return;
    const ng = names.getContext("2d"); if (!ng) return;
    if (!bufRef.current) bufRef.current = document.createElement("canvas");
    const buf = bufRef.current;
    const bg = buf.getContext("2d")!;

    let W = 0, H = 0, GROUND = 0, cssW = 0, cssH = 0, dpr = 1;
    let particles: Particle[] = [];
    const mood = moodFor(variantKey);

    const setup = () => {
      const rect = wrap.getBoundingClientRect();
      const aspect = Math.max(0.4, rect.width / rect.height);
      // resolução lógica maior = cena mais nítida; largura pela proporção real
      H = 300; W = Math.round(H * aspect); GROUND = Math.round(H * 0.5);
      cv.width = W; cv.height = H;
      g.imageSmoothingEnabled = false;
      // camada de NOMES em alta resolução (DPR) → texto sempre nítido
      dpr = Math.min(3, Math.max(1, window.devicePixelRatio || 1));
      cssW = rect.width; cssH = rect.height;
      names.width = Math.round(cssW * dpr); names.height = Math.round(cssH * dpr);
      names.style.width = cssW + "px"; names.style.height = cssH + "px";
      // partículas variam por livro (layout distinto)
      let seed = (hashStr(variantKey) % 100000) + 1;
      const rand = () => (seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;
      particles = seedParticles(region, { W, H, GROUND }, rand);
    };
    setup();
    const ro = new ResizeObserver(setup); ro.observe(wrap);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let t = 0, last = 0, raf = 0, on = true;

    const frame = (now: number) => {
      if (!on) return;
      const dt = Math.min(48, now - last || 16); last = now; t += dt;
      const secs = dt / 1000;

      // ---- move jogador local ----
      const pos = posRef.current;
      let moving = false;
      const SPx = 0.34, SPy = 0.26;
      const keys = keysRef.current;
      const kx = (keys["arrowright"] || keys["d"] ? 1 : 0) - (keys["arrowleft"] || keys["a"] ? 1 : 0);
      const ky = (keys["arrowdown"] || keys["s"] ? 1 : 0) - (keys["arrowup"] || keys["w"] ? 1 : 0);
      if (kx || ky) {
        pos.x = clamp01(pos.x + kx * SPx * secs); pos.y = clamp01(pos.y + ky * SPy * secs);
        if (kx) dirRef.current = kx > 0 ? 1 : -1; moving = true;
      } else if (targetRef.current) {
        const tg = targetRef.current, dx = tg.x - pos.x, dy = tg.y - pos.y;
        if (Math.hypot(dx, dy) < 0.008) targetRef.current = null;
        else {
          pos.x = clamp01(pos.x + Math.max(-SPx * secs, Math.min(SPx * secs, dx)));
          pos.y = clamp01(pos.y + Math.max(-SPy * secs, Math.min(SPy * secs, dy)));
          if (Math.abs(dx) > 0.001) dirRef.current = dx > 0 ? 1 : -1;
          moving = true;
        }
      }
      sendPos(pos.x, pos.y, dirRef.current, moving);
      stepRemotes();

      // ---- cena ----
      g.clearRect(0, 0, W, H);
      drawScene(g, { region, dims: { W, H, GROUND }, particles, t, scroll: 0, reduce });
      // grade de cor por livro (identidade)
      const grad = g.createLinearGradient(0, 0, 0, H);
      grad.addColorStop(0, mood.top); grad.addColorStop(1, mood.bot);
      g.save(); g.globalAlpha = mood.a; g.fillStyle = grad; g.fillRect(0, 0, W, H); g.restore();

      // ---- avatares (nítidos: 1:1 no buffer → nearest-neighbor) ----
      type Draw = { nx: number; ny: number; look: MascotLook; name: string; dir: 1 | -1; moving: boolean; me: boolean };
      const list: Draw[] = [];
      const meNow = meRef.current;
      if (meNow) list.push({ nx: pos.x, ny: pos.y, look: meNow.look, name: meNow.name, dir: dirRef.current, moving, me: true });
      for (const p of playersRef.current.values() as IterableIterator<RemotePlayer>) {
        list.push({ nx: p.x, ny: p.y, look: p.look && Object.keys(p.look).length ? p.look : DEFAULT_LOOK, name: p.name, dir: p.dir, moving: p.moving, me: false });
      }
      list.sort((a, b) => a.ny - b.ny);

      // limpa camada de nomes (alta resolução)
      ng.setTransform(dpr, 0, 0, dpr, 0, 0);
      ng.clearRect(0, 0, cssW, cssH);

      for (const d of list) {
        const fx = feetXAt(d.nx, W), fy = feetYAt(d.ny, H);
        // altura-alvo do boneco na cena (frente maior que fundo) → escala nearest-neighbor
        const lift = mountLift(d.look.mount);
        const MW = 64, MH = 72 + lift, FEET = 64 + lift;
        const targetH = H * (0.24 + d.ny * 0.12);       // ~0.24..0.36 do H
        const k = targetH / 72;
        const dw = Math.round(MW * k), dh = Math.round(MH * k);
        const dx = Math.round(fx - dw / 2), dy = Math.round(fy - Math.round(FEET * k));
        // sombra
        g.globalAlpha = 0.26; g.fillStyle = "#05060a";
        g.beginPath(); g.ellipse(fx, fy, dw * 0.32, dw * 0.11, 0, 0, 6.29); g.fill();
        g.globalAlpha = 1;
        // desenha boneco 1:1 no buffer
        buf.width = MW; buf.height = MH;
        bg.imageSmoothingEnabled = false; bg.clearRect(0, 0, MW, MH);
        drawMascot(bg, 32, FEET, d.look, { t, reduce, walking: d.moving, mood: "idle" });
        // blita ampliado, nearest-neighbor (crisp), com flip por direção
        g.save();
        g.imageSmoothingEnabled = false;
        g.translate(dx, dy);
        if (d.dir < 0) { g.translate(dw, 0); g.scale(-1, 1); }
        g.drawImage(buf, 0, 0, dw, dh);
        g.restore();

        // nome na camada de alta resolução (nítido, pequeno, legível)
        const sx = (fx / W) * cssW;
        const topCss = (dy / H) * cssH;
        drawName(ng, d.name, sx, topCss - 4, d.me, cssH, d.ny);
      }

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => { on = false; ro.disconnect(); if (raf) cancelAnimationFrame(raf); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [region, roomId, variantKey]);

  return (
    <div
      ref={wrapRef}
      className="relative w-full h-full overflow-hidden select-none"
      style={{ touchAction: "none", cursor: "pointer" }}
      onPointerDown={(e) => pointTo(e.clientX, e.clientY)}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ imageRendering: "pixelated" }} aria-hidden="true" />
      <canvas ref={namesRef} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 pointer-events-none mix-blend-multiply"
        style={{ background: "repeating-linear-gradient(180deg, rgba(0,0,0,0) 0 2px, rgba(0,0,0,.10) 2px 3px)" }} />
    </div>
  );
}

// Nome desenhado na camada de alta resolução (CSS px) → nítido em qualquer tela.
function drawName(g: CanvasRenderingContext2D, name: string, cx: number, bottomY: number, isMe: boolean, cssH: number, ny: number) {
  const fs = Math.max(10, Math.min(14, Math.round(cssH * 0.026 * (0.9 + ny * 0.18))));
  const label = name.length > 14 ? name.slice(0, 13) + "…" : name;
  g.font = `600 ${fs}px ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif`;
  g.textAlign = "center"; g.textBaseline = "alphabetic";
  const padX = Math.round(fs * 0.5), h = Math.round(fs * 1.5);
  const w = Math.ceil(g.measureText(label).width) + padX * 2;
  const x = Math.round(cx - w / 2), y = Math.round(bottomY - h);
  const r = Math.round(fs * 0.4);
  g.beginPath();
  g.moveTo(x + r, y);
  g.arcTo(x + w, y, x + w, y + h, r);
  g.arcTo(x + w, y + h, x, y + h, r);
  g.arcTo(x, y + h, x, y, r);
  g.arcTo(x, y, x + w, y, r);
  g.closePath();
  g.fillStyle = isMe ? "rgba(232,176,75,0.95)" : "rgba(12,14,22,0.7)";
  g.fill();
  if (isMe) { g.lineWidth = 1; g.strokeStyle = "rgba(122,84,16,0.9)"; g.stroke(); }
  // texto com leve sombra pra legibilidade sobre qualquer cenário
  g.fillStyle = isMe ? "#1a1206" : "#f2f6ff";
  if (!isMe) { g.shadowColor = "rgba(0,0,0,0.55)"; g.shadowBlur = 2; g.shadowOffsetY = 0.5; }
  g.fillText(label, Math.round(cx), Math.round(y + h - fs * 0.42));
  g.shadowColor = "transparent"; g.shadowBlur = 0; g.shadowOffsetY = 0;
}
