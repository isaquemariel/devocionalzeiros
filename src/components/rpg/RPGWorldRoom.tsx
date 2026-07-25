import { useEffect, useRef } from "react";
import { drawScene, seedParticles, type Particle, type SceneDims } from "@/lib/rpgScene";
import { drawMascot, DEFAULT_LOOK, type MascotLook } from "@/lib/rpgMascot";
import type { RPGRegion } from "@/lib/rpgBibleData";
import { useWorldRoom, type RemotePlayer } from "@/hooks/useWorldRoom";

interface Props {
  roomId: string;         // id do canal (ex.: book:genesis | global)
  region: RPGRegion;      // cenário do livro (ou fixo da global)
  me: { userId: string; name: string; look: MascotLook } | null;
  onCount?: (n: number) => void;
  onConnected?: (b: boolean) => void;
}

// mapeia a profundidade (0=fundo, 1=frente) para a faixa "andável" do chão
const feetYAt = (ny: number, H: number) => Math.round(H * 0.60 + ny * (H * 0.93 - H * 0.60));
const feetXAt = (nx: number, W: number) => Math.round(W * 0.06 + nx * (W * 0.88));
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

export default function RPGWorldRoom({ roomId, region, me, onCount, onConnected }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { playersRef, sendPos, stepRemotes, connected, count } = useWorldRoom(roomId, me, !!me);
  useEffect(() => { onCount?.(count); }, [count, onCount]);
  useEffect(() => { onConnected?.(connected); }, [connected, onConnected]);

  // posição local (normalizada) + alvo + teclado — refs (não re-renderizam)
  const posRef = useRef({ x: 0.5, y: 0.5 });
  const targetRef = useRef<{ x: number; y: number } | null>(null);
  const dirRef = useRef<1 | -1>(1);
  const keysRef = useRef<Record<string, boolean>>({});
  const meRef = useRef(me); meRef.current = me;

  // spawn levemente aleatório pra não empilhar todo mundo no centro
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
        if (down) targetRef.current = null; // teclado cancela o "andar até o toque"
        e.preventDefault();
      }
    };
    const kd = onKey(true), ku = onKey(false);
    window.addEventListener("keydown", kd);
    window.addEventListener("keyup", ku);
    return () => { window.removeEventListener("keydown", kd); window.removeEventListener("keyup", ku); };
  }, []);

  // clique/toque → anda até ali
  const pointTo = (clientX: number, clientY: number) => {
    const cv = canvasRef.current; if (!cv) return;
    const r = cv.getBoundingClientRect();
    const px = (clientX - r.left) / r.width;   // 0..1 na largura
    const py = (clientY - r.top) / r.height;
    // converte y da tela p/ profundidade (faixa 0.60..0.93 do H)
    const ny = clamp01((py - 0.60) / (0.93 - 0.60));
    const nx = clamp01((px - 0.06) / 0.88);
    targetRef.current = { x: nx, y: ny };
  };

  useEffect(() => {
    const cv = canvasRef.current, wrap = wrapRef.current;
    if (!cv || !wrap) return;
    const g = cv.getContext("2d"); if (!g) return;
    g.imageSmoothingEnabled = false;

    let W = 0, H = 0, GROUND = 0;
    let particles: Particle[] = [];
    const setup = () => {
      const rect = wrap.getBoundingClientRect();
      const aspect = Math.max(0.4, rect.width / rect.height);
      // altura lógica confortável; largura pela proporção real (nítido em qualquer tela)
      H = 240; W = Math.round(H * aspect); GROUND = Math.round(H * 0.5);
      cv.width = W; cv.height = H;
      g.imageSmoothingEnabled = false;
      let seed = 7; const rand = () => (seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;
      const dims: SceneDims = { W, H, GROUND };
      particles = seedParticles(region, dims, rand);
    };
    setup();
    const ro = new ResizeObserver(setup); ro.observe(wrap);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let t = 0, last = 0, raf = 0, on = true;

    const frame = (now: number) => {
      if (!on) return;
      const dt = Math.min(48, now - last || 16); last = now; t += dt;
      const secs = dt / 1000;

      // ---- move o jogador local ----
      const pos = posRef.current;
      let moving = false;
      const SPx = 0.34, SPy = 0.26;
      const keys = keysRef.current;
      const kx = (keys["arrowright"] || keys["d"] ? 1 : 0) - (keys["arrowleft"] || keys["a"] ? 1 : 0);
      const ky = (keys["arrowdown"] || keys["s"] ? 1 : 0) - (keys["arrowup"] || keys["w"] ? 1 : 0);
      if (kx || ky) {
        pos.x = clamp01(pos.x + kx * SPx * secs);
        pos.y = clamp01(pos.y + ky * SPy * secs);
        if (kx) dirRef.current = kx > 0 ? 1 : -1;
        moving = true;
      } else if (targetRef.current) {
        const tg = targetRef.current;
        const dx = tg.x - pos.x, dy = tg.y - pos.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 0.008) { targetRef.current = null; }
        else {
          pos.x = clamp01(pos.x + Math.max(-SPx * secs, Math.min(SPx * secs, dx)));
          pos.y = clamp01(pos.y + Math.max(-SPy * secs, Math.min(SPy * secs, dy)));
          if (Math.abs(dx) > 0.001) dirRef.current = dx > 0 ? 1 : -1;
          moving = true;
        }
      }
      sendPos(pos.x, pos.y, dirRef.current, moving);
      stepRemotes();

      // ---- desenha ----
      g.clearRect(0, 0, W, H);
      drawScene(g, { region, dims: { W, H, GROUND }, particles, t, scroll: 0, reduce });

      // reúne todos (eu + remotos) e ordena por profundidade (fundo primeiro)
      type Draw = { nx: number; ny: number; look: MascotLook; name: string; dir: 1 | -1; moving: boolean; me: boolean };
      const list: Draw[] = [];
      const meNow = meRef.current;
      if (meNow) list.push({ nx: pos.x, ny: pos.y, look: meNow.look, name: meNow.name, dir: dirRef.current, moving, me: true });
      for (const p of playersRef.current.values() as IterableIterator<RemotePlayer>) {
        list.push({ nx: p.x, ny: p.y, look: p.look && Object.keys(p.look).length ? p.look : DEFAULT_LOOK, name: p.name, dir: p.dir, moving: p.moving, me: false });
      }
      list.sort((a, b) => a.ny - b.ny);

      for (const d of list) {
        const fx = feetXAt(d.nx, W), fy = feetYAt(d.ny, H);
        const scale = (H * 0.0028) * (0.82 + d.ny * 0.3);
        // sombra
        g.globalAlpha = 0.25; g.fillStyle = "#05060a";
        g.beginPath(); g.ellipse(fx, fy, 14 * scale, 5 * scale, 0, 0, 6.29); g.fill();
        g.globalAlpha = 1;
        // avatar (drawMascot ancorado nos pés, escalado por profundidade)
        g.save();
        g.translate(fx, fy);
        g.scale(d.dir * scale, scale);
        drawMascot(g, 0, 0, d.look, { t, reduce, walking: d.moving, mood: "idle" });
        g.restore();
        // nome sobre a cabeça (fonte acompanha a profundidade)
        drawNameTag(g, d.name, fx, fy - 64 * scale - 4, d.me, Math.max(8, Math.round(H * 0.04 * (0.8 + d.ny * 0.35))));
      }

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => { on = false; ro.disconnect(); if (raf) cancelAnimationFrame(raf); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [region, roomId]);

  return (
    <div
      ref={wrapRef}
      className="relative w-full h-full overflow-hidden select-none"
      style={{ touchAction: "none", cursor: "pointer" }}
      onPointerDown={(e) => pointTo(e.clientX, e.clientY)}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ imageRendering: "pixelated" }} aria-hidden="true" />
      {/* scanlines retrô sutis */}
      <div className="absolute inset-0 pointer-events-none mix-blend-multiply"
        style={{ background: "repeating-linear-gradient(180deg, rgba(0,0,0,0) 0 2px, rgba(0,0,0,.12) 2px 3px)" }} />
    </div>
  );
}

// name tag desenhado no canvas (escala junto com a cena, sem DOM extra)
function drawNameTag(g: CanvasRenderingContext2D, name: string, cx: number, topY: number, isMe: boolean, fs: number) {
  const label = name.length > 14 ? name.slice(0, 13) + "…" : name;
  g.font = `700 ${fs}px ui-sans-serif, system-ui, -apple-system, sans-serif`;
  g.textAlign = "center";
  g.textBaseline = "middle";
  const w = g.measureText(label).width + 12;
  const h = fs + 8;
  const x = Math.round(cx - w / 2), y = Math.round(topY - h);
  const r = 5;
  g.beginPath();
  g.moveTo(x + r, y);
  g.arcTo(x + w, y, x + w, y + h, r);
  g.arcTo(x + w, y + h, x, y + h, r);
  g.arcTo(x, y + h, x, y, r);
  g.arcTo(x, y, x + w, y, r);
  g.closePath();
  g.fillStyle = isMe ? "rgba(232,176,75,0.92)" : "rgba(10,12,20,0.74)";
  g.fill();
  g.lineWidth = 1;
  g.strokeStyle = isMe ? "#7a5410" : "rgba(255,255,255,0.22)";
  g.stroke();
  g.fillStyle = isMe ? "#1a1206" : "#eef3ff";
  g.fillText(label, Math.round(cx), Math.round(y + h / 2 + 0.5));
  g.textAlign = "left"; g.textBaseline = "alphabetic";
}
