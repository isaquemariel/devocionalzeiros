import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import { drawScene, seedParticles, type Particle, type SceneDims } from "@/lib/rpgScene";
import { drawMascot, DEFAULT_LOOK, mountLift, type MascotLook } from "@/lib/rpgMascot";
import { drawHeavenScene } from "@/lib/rpgHeavenScene";
import type { RPGRegion } from "@/lib/rpgBibleData";
import { useWorldRoom, type RemotePlayer } from "@/hooks/useWorldRoom";

// faixa "andável" (profundidade). Fundo mais alto = sala mais profunda → cabe
// mais gente (quem anda pra trás fica menor).
const BAND_TOP = 0.54, BAND_BOT = 0.94;

interface Props {
  roomId: string;         // id do canal (ex.: book:genesis | global)
  region: RPGRegion;      // cenário base (região do livro / fixo da global)
  variantKey: string;     // diferencia livros que compartilham a mesma região
  me: { userId: string; name: string; look: MascotLook } | null;
  onCount?: (n: number) => void;
  onConnected?: (b: boolean) => void;
}

// profundidade (0=fundo, 1=frente) → linha do chão
const feetYAt = (ny: number, H: number) => Math.round(H * BAND_TOP + ny * (H * BAND_BOT - H * BAND_TOP));
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

  const { playersRef, bubblesRef, sendPos, sendChat, stepRemotes, connected, count, messages } = useWorldRoom(roomId, me, !!me);
  useEffect(() => { onCount?.(count); }, [count, onCount]);
  useEffect(() => { onConnected?.(connected); }, [connected, onConnected]);

  const [draft, setDraft] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const feedRef = useRef<HTMLDivElement>(null);
  // auto-rola o feed para a última mensagem
  useEffect(() => { const f = feedRef.current; if (f) f.scrollTop = f.scrollHeight; }, [messages]);

  const submitChat = () => {
    const text = draft.trim();
    if (!text) return;
    sendChat(text);
    setDraft("");
    inputRef.current?.focus();
  };

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
      // digitando no chat? não controla o personagem
      const el = document.activeElement;
      if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA")) return;
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
    targetRef.current = { x: clamp01((px - 0.06) / 0.88), y: clamp01((py - BAND_TOP) / (BAND_BOT - BAND_TOP)) };
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
    const isHeaven = variantKey === "global";

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
      if (isHeaven) {
        drawHeavenScene(g, { W, H, GROUND }, t, reduce); // sala global = o Céu
      } else {
        drawScene(g, { region, dims: { W, H, GROUND }, particles, t, scroll: 0, reduce });
        // grade de cor por livro (identidade)
        const grad = g.createLinearGradient(0, 0, 0, H);
        grad.addColorStop(0, mood.top); grad.addColorStop(1, mood.bot);
        g.save(); g.globalAlpha = mood.a; g.fillStyle = grad; g.fillRect(0, 0, W, H); g.restore();
      }

      // ---- avatares (nítidos: 1:1 no buffer → nearest-neighbor) ----
      type Draw = { userId: string; nx: number; ny: number; look: MascotLook; name: string; dir: 1 | -1; moving: boolean; me: boolean };
      const list: Draw[] = [];
      const meNow = meRef.current;
      if (meNow) list.push({ userId: meNow.userId, nx: pos.x, ny: pos.y, look: meNow.look, name: meNow.name, dir: dirRef.current, moving, me: true });
      for (const p of playersRef.current.values() as IterableIterator<RemotePlayer>) {
        list.push({ userId: p.userId, nx: p.x, ny: p.y, look: p.look && Object.keys(p.look).length ? p.look : DEFAULT_LOOK, name: p.name, dir: p.dir, moving: p.moving, me: false });
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
        const targetH = H * (0.15 + d.ny * 0.21);       // ~0.15 (fundo) .. 0.36 (frente) → mais profundidade
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
        const nameTop = drawName(ng, d.name, sx, topCss - 4, d.me, cssH, d.ny);
        // balão de fala (chat) acima do nome, se houver mensagem ativa
        const bub = bubblesRef.current.get(d.userId);
        if (bub && now < bub.until) drawBubble(ng, bub.text, sx, nameTop - 4, cssW, cssH, d.ny);
      }

      raf = requestAnimationFrame(frame);
    };
    frame(performance.now()); // 1º quadro já desenhado (sem flash na 1ª montagem)
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

      {/* ---- Chat (bate-papo) ---- */}
      <div
        className="absolute left-0 right-0 bottom-0 z-10 flex flex-col"
        onPointerDown={(e) => e.stopPropagation()}
      >
        {/* feed das últimas mensagens */}
        {messages.length > 0 && (
          <div
            ref={feedRef}
            className="mx-2 mb-1 max-h-[26vh] overflow-y-auto space-y-1 px-2.5 py-2 rounded-xl bg-black/45 backdrop-blur-sm border border-white/10"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {messages.map((m) => (
              <div key={m.id} className="text-[12.5px] leading-snug break-words">
                <span className={m.me ? "font-black text-[#ffd889]" : "font-black text-[#8fd3ff]"}>{m.name}</span>
                <span className="text-white/85">: {m.text}</span>
              </div>
            ))}
          </div>
        )}

        {/* barra de digitação */}
        <form
          onSubmit={(e) => { e.preventDefault(); submitChat(); }}
          className="flex items-center gap-2 px-2.5 py-2 bg-gradient-to-t from-black/70 to-black/20"
          style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
        >
          <input
            ref={inputRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            maxLength={160}
            enterKeyHint="send"
            placeholder="Conversar na sala…"
            className="flex-1 min-w-0 text-[14px] bg-[#141020]/90 border border-[#e8b04b55] rounded-full px-4 py-2.5 text-white placeholder-white/40 outline-none focus:border-[#e8b04b]"
          />
          <button
            type="submit"
            disabled={!draft.trim()}
            aria-label="Enviar"
            className="shrink-0 w-11 h-11 flex items-center justify-center rounded-full bg-[#e8b04b] text-[#1a1206] disabled:opacity-40 active:scale-95 transition"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}

// Nome desenhado na camada de alta resolução (CSS px) → nítido em qualquer tela.
// Retorna o Y do topo da plaquinha (para empilhar o balão de fala acima).
function drawName(g: CanvasRenderingContext2D, name: string, cx: number, bottomY: number, isMe: boolean, cssH: number, ny: number): number {
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
  return y;
}

// Balão de fala (chat) desenhado na camada de alta resolução, acima do nome.
// Quebra o texto em até 3 linhas; centralizado no personagem, com "rabinho".
function drawBubble(g: CanvasRenderingContext2D, text: string, cx: number, bottomY: number, cssW: number, cssH: number, ny: number) {
  const fs = Math.max(11, Math.min(15, Math.round(cssH * 0.028 * (0.92 + ny * 0.14))));
  g.font = `500 ${fs}px ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif`;
  g.textAlign = "left"; g.textBaseline = "alphabetic";
  const maxW = Math.max(120, Math.min(cssW * 0.6, 260));
  const innerW = maxW - fs; // largura útil do texto
  const MAX_LINES = 3;
  // quebra por palavras (até MAX_LINES; sobra vira "…")
  const words = text.split(" ");
  const lines: string[] = [];
  let cur = "";
  let overflow = false;
  for (let i = 0; i < words.length; i++) {
    const test = cur ? cur + " " + words[i] : words[i];
    if (g.measureText(test).width > innerW && cur) {
      if (lines.length === MAX_LINES - 1) { overflow = true; break; } // encheu a última linha
      lines.push(cur); cur = words[i];
    } else {
      cur = test;
    }
  }
  if (cur) lines.push(cur);
  if (overflow && lines.length) {
    let last = lines[lines.length - 1];
    while (last.length > 1 && g.measureText(last + "…").width > innerW) last = last.slice(0, -1);
    lines[lines.length - 1] = last + "…";
  }
  const lineH = Math.round(fs * 1.28);
  const padX = Math.round(fs * 0.7), padY = Math.round(fs * 0.5);
  const textW = Math.min(maxW, Math.max(...lines.map((l) => Math.ceil(g.measureText(l).width))));
  const w = textW + padX * 2;
  const h = lines.length * lineH + padY * 2;
  const tail = Math.round(fs * 0.5);
  let x = Math.round(cx - w / 2);
  x = Math.max(4, Math.min(cssW - w - 4, x)); // não vaza da tela
  const y = Math.round(bottomY - tail - h);
  const r = Math.round(fs * 0.55);
  // corpo
  g.beginPath();
  g.moveTo(x + r, y);
  g.arcTo(x + w, y, x + w, y + h, r);
  g.arcTo(x + w, y + h, x, y + h, r);
  g.arcTo(x, y + h, x, y, r);
  g.arcTo(x, y, x + w, y, r);
  g.closePath();
  // rabinho apontando para o personagem
  const tx = Math.max(x + r + tail, Math.min(x + w - r - tail, Math.round(cx)));
  g.moveTo(tx - tail, y + h);
  g.lineTo(tx, y + h + tail);
  g.lineTo(tx + tail, y + h);
  g.closePath();
  g.fillStyle = "rgba(250,250,252,0.96)";
  g.shadowColor = "rgba(0,0,0,0.4)"; g.shadowBlur = 6; g.shadowOffsetY = 1.5;
  g.fill();
  g.shadowColor = "transparent"; g.shadowBlur = 0; g.shadowOffsetY = 0;
  // texto
  g.fillStyle = "#15161d";
  for (let i = 0; i < lines.length; i++) {
    g.fillText(lines[i], x + padX, y + padY + (i + 1) * lineH - Math.round(fs * 0.32));
  }
}
