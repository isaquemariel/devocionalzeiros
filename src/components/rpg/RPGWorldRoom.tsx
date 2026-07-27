import { useEffect, useRef, useState } from "react";
import { Send, MessageCircle, ChevronDown, Flag, Ban, Clock, X, ShieldAlert } from "lucide-react";
import { toast } from "sonner";
import { drawScene, seedParticles, type Particle, type SceneDims } from "@/lib/rpgScene";
import { drawMascot, DEFAULT_LOOK, mountLift, type MascotLook } from "@/lib/rpgMascot";
import { drawHeavenScene } from "@/lib/rpgHeavenScene";
import type { RPGRegion } from "@/lib/rpgBibleData";
import { useWorldRoom, type RemotePlayer, type KickReason } from "@/hooks/useWorldRoom";
import { reportRoomUser, adminBanRoomUser, pingRoomBlockPush } from "@/lib/roomModeration";
import { getLevelTier } from "@/lib/rpgLevel";

// Cor de destaque do ADMIN/DEV (nome, tag e balão) — bem diferente do ouro
// do "eu" e do azul dos demais, pra deixar claro quem é da equipe.
const ADMIN_COLOR = "#c084fc"; // violeta

// faixa "andável" (profundidade). Fundo mais alto = sala mais profunda → cabe
// mais gente (quem anda pra trás fica menor).
const BAND_TOP = 0.54, BAND_BOT = 0.94;

interface Props {
  roomId: string;         // id do canal (ex.: book:genesis | global)
  region: RPGRegion;      // cenário base (região do livro / fixo da global)
  variantKey: string;     // diferencia livros que compartilham a mesma região
  me: { userId: string; name: string; look: MascotLook; isAdmin?: boolean } | null;
  onCount?: (n: number) => void;
  onConnected?: (b: boolean) => void;
  onKicked?: (reason: KickReason) => void; // bloqueado/expulso ou sessão duplicada → sair da sala
}

// caixa clicável de um jogador (p/ abrir menu de denúncia/moderação)
interface HitBox { userId: string; name: string; isAdmin: boolean; left: number; top: number; width: number; height: number }

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

export default function RPGWorldRoom({ roomId, region, variantKey, me, onCount, onConnected, onKicked }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const namesRef = useRef<HTMLCanvasElement>(null);
  const bufRef = useRef<HTMLCanvasElement | null>(null); // buffer 1:1 do boneco (nítido)
  const hitBoxesRef = useRef<HitBox[]>([]); // caixas clicáveis dos outros (menu de moderação)

  const { playersRef, bubblesRef, sendPos, sendChat, sendModeration, stepRemotes, connected, count, messages } = useWorldRoom(roomId, me, !!me, onKicked);

  // menu de ação sobre um jogador (denunciar / admin bloquear)
  const [menu, setMenu] = useState<{ userId: string; name: string; isAdmin: boolean } | null>(null);
  const [menuBusy, setMenuBusy] = useState(false);
  const [confirmReport, setConfirmReport] = useState(false);
  const meIsAdmin = !!me?.isAdmin;

  const doReport = async () => {
    if (!menu) return;
    setMenuBusy(true);
    const r = await reportRoomUser(menu.userId);
    setMenuBusy(false);
    setMenu(null); setConfirmReport(false);
    if (!r.ok) {
      toast.error(r.reason === "admin" ? "Não é possível denunciar um membro da equipe." : "Não foi possível registrar a denúncia.");
      return;
    }
    if (r.blocked) { sendModeration(menu.userId); pingRoomBlockPush(menu.userId); toast.success("Denúncia registrada. O usuário foi bloqueado da sala."); }
    else toast.success("Denúncia registrada. Obrigado por ajudar a manter a sala saudável.");
  };

  const doAdminBan = async (permanent: boolean, minutes: number) => {
    if (!menu) return;
    setMenuBusy(true);
    const ok = await adminBanRoomUser(menu.userId, { permanent, minutes });
    setMenuBusy(false);
    const target = menu;
    setMenu(null); setConfirmReport(false);
    if (!ok) { toast.error("Não foi possível aplicar o bloqueio."); return; }
    sendModeration(target.userId);
    pingRoomBlockPush(target.userId);
    toast.success(permanent ? `${target.name} foi bloqueado.` : `${target.name} recebeu bloqueio temporário.`);
  };
  useEffect(() => { onCount?.(count); }, [count, onCount]);
  useEffect(() => { onConnected?.(connected); }, [connected, onConnected]);

  const [draft, setDraft] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const feedRef = useRef<HTMLDivElement>(null);
  // Chat começa MINIMIZADO (só os balões de fala aparecem). Abrir = ver o feed
  // + digitar. Fechado = só um botão no canto.
  const [chatOpen, setChatOpen] = useState(false);
  const [unseen, setUnseen] = useState(0); // mensagens novas enquanto minimizado
  const lastCountRef = useRef(messages.length);
  useEffect(() => {
    const delta = messages.length - lastCountRef.current;
    lastCountRef.current = messages.length;
    if (delta > 0 && !chatOpen) setUnseen((n) => Math.min(99, n + delta));
  }, [messages.length, chatOpen]);
  useEffect(() => { if (chatOpen) setUnseen(0); }, [chatOpen]);
  // auto-rola o feed para a última mensagem
  useEffect(() => { const f = feedRef.current; if (chatOpen && f) f.scrollTop = f.scrollHeight; }, [messages, chatOpen]);

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

  // Toque: se acertou um personagem → menu de moderação; senão → anda até lá.
  const handlePointerDown = (clientX: number, clientY: number) => {
    const cv = canvasRef.current; if (!cv) return;
    const r = cv.getBoundingClientRect();
    const lx = clientX - r.left, ly = clientY - r.top;
    const boxes = hitBoxesRef.current;
    for (let i = boxes.length - 1; i >= 0; i--) { // frontmost primeiro
      const b = boxes[i];
      if (lx >= b.left && lx <= b.left + b.width && ly >= b.top && ly <= b.top + b.height) {
        setConfirmReport(false);
        setMenu({ userId: b.userId, name: b.name, isAdmin: b.isAdmin });
        return;
      }
    }
    pointTo(clientX, clientY);
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
      type Draw = { userId: string; nx: number; ny: number; look: MascotLook; name: string; dir: 1 | -1; moving: boolean; me: boolean; isAdmin: boolean; level: number };
      const list: Draw[] = [];
      const meNow = meRef.current;
      if (meNow) list.push({ userId: meNow.userId, nx: pos.x, ny: pos.y, look: meNow.look, name: meNow.name, dir: dirRef.current, moving, me: true, isAdmin: !!meNow.isAdmin, level: meNow.level ?? 0 });
      for (const p of playersRef.current.values() as IterableIterator<RemotePlayer>) {
        list.push({ userId: p.userId, nx: p.x, ny: p.y, look: p.look && Object.keys(p.look).length ? p.look : DEFAULT_LOOK, name: p.name, dir: p.dir, moving: p.moving, me: false, isAdmin: p.isAdmin, level: p.level ?? 0 });
      }
      list.sort((a, b) => a.ny - b.ny);

      // limpa camada de nomes (alta resolução)
      ng.setTransform(dpr, 0, 0, dpr, 0, 0);
      ng.clearRect(0, 0, cssW, cssH);

      const boxes: HitBox[] = [];
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

        // caixa clicável (só dos OUTROS) → menu de moderação. Em ordem de desenho
        // (trás→frente), então o clique prefere o da frente.
        if (!d.me) boxes.push({
          userId: d.userId, name: d.name, isAdmin: d.isAdmin,
          left: (dx / W) * cssW, top: (dy / H) * cssH, width: (dw / W) * cssW, height: (dh / H) * cssH,
        });

        // nome na camada de alta resolução (nítido, pequeno, legível)
        const sx = (fx / W) * cssW;
        const topCss = (dy / H) * cssH;
        const nameTop = drawName(ng, d.name, sx, topCss - 4, d.me, d.isAdmin, cssH, d.ny, d.level);
        // balão de fala (chat) acima do nome, se houver mensagem ativa
        const bub = bubblesRef.current.get(d.userId);
        if (bub && now < bub.until) drawBubble(ng, bub.text, sx, nameTop - 4, cssW, cssH, d.ny, bub.isAdmin);
      }
      hitBoxesRef.current = boxes;

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
      onPointerDown={(e) => handlePointerDown(e.clientX, e.clientY)}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ imageRendering: "pixelated" }} aria-hidden="true" />
      <canvas ref={namesRef} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 pointer-events-none mix-blend-multiply"
        style={{ background: "repeating-linear-gradient(180deg, rgba(0,0,0,0) 0 2px, rgba(0,0,0,.10) 2px 3px)" }} />

      {/* ---- Chat (bate-papo) ---- */}
      {chatOpen ? (
        // No PC ocupa ~metade da largura (alinhado à esquerda); no celular, tudo.
        <div
          className="absolute left-0 right-0 bottom-0 z-10 flex flex-col sm:right-auto sm:w-1/2 sm:max-w-lg"
          onPointerDown={(e) => e.stopPropagation()}
        >
          {/* barra do topo do chat: minimizar */}
          <div className="flex justify-end px-2 pb-1">
            <button
              onClick={() => setChatOpen(false)}
              className="flex items-center gap-1 text-[11px] font-semibold text-white/75 bg-black/55 border border-white/15 rounded-full px-2.5 py-1 hover:bg-black/75 transition"
            >
              <ChevronDown className="w-3.5 h-3.5" /> Minimizar
            </button>
          </div>

          {/* feed das últimas mensagens */}
          {messages.length > 0 && (
            <div
              ref={feedRef}
              className="mx-2 mb-1 max-h-[26vh] sm:max-h-[34vh] overflow-y-auto space-y-1 px-2.5 py-2 rounded-xl bg-black/45 backdrop-blur-sm border border-white/10"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {messages.map((m) => (
                m.system ? (
                  <div key={m.id} className="text-[11px] italic text-white/45 text-center">{m.text}</div>
                ) : (
                  <div key={m.id} className="flex items-start gap-1.5 text-[12.5px] leading-snug">
                    {/* distintivo de patente (emblema + nível) à esquerda do nome */}
                    {(() => {
                      const tier = getLevelTier(m.level ?? 0);
                      return (
                        <span
                          className="shrink-0 inline-flex items-center justify-center gap-0.5 rounded px-1 py-[2px] min-w-[32px] text-[10px] font-black leading-none border"
                          style={{ color: tier.color, borderColor: `${tier.color}88`, background: "rgba(255,255,255,0.04)" }}
                          title={`Nível ${m.level ?? 0} — ${tier.title}`}
                        >
                          <span aria-hidden="true">{tier.emoji}</span>
                          <span>{m.level ?? 0}</span>
                        </span>
                      );
                    })()}
                    <span className="min-w-0 break-words">
                      <span
                        className="font-black"
                        style={{ color: m.isAdmin ? ADMIN_COLOR : m.me ? "#ffd889" : "#8fd3ff" }}
                      >
                        {m.name}
                      </span>
                      {m.isAdmin && (
                        <span
                          className="ml-1 align-middle text-[9px] font-black px-1 py-[1px] rounded"
                          style={{ background: ADMIN_COLOR, color: "#2a0a4a" }}
                        >
                          DEV
                        </span>
                      )}
                      <span className="text-white/85">: {m.text}</span>
                    </span>
                  </div>
                )
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
      ) : (
        // Minimizado: só um botão no canto. Os balões de fala continuam visíveis.
        <button
          onClick={() => setChatOpen(true)}
          onPointerDown={(e) => e.stopPropagation()}
          className="absolute z-10 left-3 flex items-center gap-1.5 rounded-full bg-black/60 border border-white/20 text-white px-3 py-2 backdrop-blur-sm hover:bg-black/75 transition"
          style={{ bottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
        >
          <MessageCircle className="w-4 h-4" />
          <span className="text-[12px] font-bold">Chat</span>
          {unseen > 0 && (
            <span className="ml-0.5 min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full bg-[#e8b04b] text-[#1a1206] text-[10px] font-black">
              {unseen}
            </span>
          )}
        </button>
      )}

      {/* ---- Menu de moderação (ao tocar num personagem) ---- */}
      {menu && (
        <div
          className="absolute inset-0 z-20 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm"
          onPointerDown={(e) => { e.stopPropagation(); if (e.target === e.currentTarget) { setMenu(null); setConfirmReport(false); } }}
        >
          <div className="w-full sm:max-w-xs bg-[#100e18] border border-white/10 rounded-t-2xl sm:rounded-2xl p-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:pb-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 min-w-0">
                <span className="font-black text-white truncate">{menu.name || "Viajante"}</span>
                {menu.isAdmin && <span className="text-[9px] font-black px-1 py-[1px] rounded" style={{ background: ADMIN_COLOR, color: "#2a0a4a" }}>DEV</span>}
              </div>
              <button onClick={() => { setMenu(null); setConfirmReport(false); }} className="p-1 rounded-lg hover:bg-white/10" aria-label="Fechar">
                <X className="w-4 h-4 text-white/70" />
              </button>
            </div>

            {menu.isAdmin ? (
              <p className="text-[13px] text-white/60 flex items-center gap-2"><ShieldAlert className="w-4 h-4 text-[#c084fc]" /> Membro da equipe — sem ações de moderação.</p>
            ) : (
              <div className="space-y-2">
                {/* Denunciar (todos) */}
                {!confirmReport ? (
                  <button onClick={() => setConfirmReport(true)} disabled={menuBusy}
                    className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-200 hover:bg-rose-500/25 transition disabled:opacity-50">
                    <Flag className="w-4 h-4" /> Denunciar
                  </button>
                ) : (
                  <div className="rounded-xl bg-rose-500/10 border border-rose-500/40 p-2.5">
                    <p className="text-[12px] text-white/75 mb-2">Denunciar <b>{menu.name}</b> por comportamento inadequado? Com 5 denúncias a pessoa é bloqueada automaticamente.</p>
                    <div className="flex gap-2">
                      <button onClick={doReport} disabled={menuBusy} className="flex-1 py-2 rounded-lg bg-rose-500 text-white font-bold text-[13px] disabled:opacity-50">Confirmar</button>
                      <button onClick={() => setConfirmReport(false)} disabled={menuBusy} className="px-3 py-2 rounded-lg bg-white/10 text-white/80 text-[13px]">Cancelar</button>
                    </div>
                  </div>
                )}

                {/* Ações de admin */}
                {meIsAdmin && (
                  <div className="pt-2 mt-1 border-t border-white/10 space-y-2">
                    <p className="text-[11px] uppercase tracking-wide text-[#c084fc] font-black flex items-center gap-1"><ShieldAlert className="w-3.5 h-3.5" /> Moderação (admin)</p>
                    <button onClick={() => doAdminBan(true, 0)} disabled={menuBusy}
                      className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl bg-red-600/20 border border-red-500/50 text-red-200 hover:bg-red-600/30 transition disabled:opacity-50">
                      <Ban className="w-4 h-4" /> Expulsar e bloquear (permanente)
                    </button>
                    <div>
                      <p className="text-[11px] text-white/50 mb-1 flex items-center gap-1"><Clock className="w-3 h-3" /> Bloqueio temporário</p>
                      <div className="grid grid-cols-3 gap-2">
                        <button onClick={() => doAdminBan(false, 10)} disabled={menuBusy} className="py-2 rounded-lg bg-amber-500/15 border border-amber-500/40 text-amber-200 text-[12px] font-bold disabled:opacity-50">10 min</button>
                        <button onClick={() => doAdminBan(false, 60)} disabled={menuBusy} className="py-2 rounded-lg bg-amber-500/15 border border-amber-500/40 text-amber-200 text-[12px] font-bold disabled:opacity-50">1 hora</button>
                        <button onClick={() => doAdminBan(false, 1440)} disabled={menuBusy} className="py-2 rounded-lg bg-amber-500/15 border border-amber-500/40 text-amber-200 text-[12px] font-bold disabled:opacity-50">24 h</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Retângulo arredondado (helper de canvas)
function roundRect(g: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  g.beginPath();
  g.moveTo(x + r, y);
  g.arcTo(x + w, y, x + w, y + h, r);
  g.arcTo(x + w, y + h, x, y + h, r);
  g.arcTo(x, y + h, x, y, r);
  g.arcTo(x, y, x + w, y, r);
  g.closePath();
}

// Nome desenhado na camada de alta resolução (CSS px) → nítido em qualquer tela.
// Admin ganha cor própria (violeta) + tag "DEV" ao lado. Retorna o Y do topo da
// plaquinha (para empilhar o balão de fala acima).
function drawName(g: CanvasRenderingContext2D, name: string, cx: number, bottomY: number, isMe: boolean, isAdmin: boolean, cssH: number, ny: number, level = 0): number {
  const fs = Math.max(10, Math.min(14, Math.round(cssH * 0.026 * (0.9 + ny * 0.18))));
  const label = name.length > 14 ? name.slice(0, 13) + "…" : name;
  const h = Math.round(fs * 1.5), padX = Math.round(fs * 0.5), r = Math.round(fs * 0.4);
  g.font = `600 ${fs}px ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif`;
  g.textBaseline = "alphabetic";
  const nameW = Math.ceil(g.measureText(label).width) + padX * 2;

  // distintivo de patente (emblema + nível), à ESQUERDA do nome — mesma altura
  const tier = getLevelTier(level);
  const badgeText = `${tier.emoji} ${level}`;
  g.font = `800 ${fs}px ui-sans-serif, system-ui, -apple-system, "Segoe UI", "Apple Color Emoji", "Segoe UI Emoji", sans-serif`;
  const badgeW = Math.ceil(g.measureText(badgeText).width) + padX * 2;
  const gapB = Math.round(fs * 0.28);

  // largura da tag DEV (só admin)
  const tagFs = Math.round(fs * 0.82), tag = "DEV";
  let tagW = 0, gap = 0;
  if (isAdmin) {
    g.font = `800 ${tagFs}px ui-sans-serif, system-ui, sans-serif`;
    tagW = Math.ceil(g.measureText(tag).width) + Math.round(tagFs * 1.0);
    gap = Math.round(fs * 0.3);
  }
  const totalW = badgeW + gapB + nameW + (isAdmin ? gap + tagW : 0);
  const bx = Math.round(cx - totalW / 2), y = Math.round(bottomY - h);
  const x = bx + badgeW + gapB; // x = início da plaquinha do nome

  // distintivo: fundo escuro + borda na cor da patente + emblema/level
  roundRect(g, bx, y, badgeW, h, r);
  g.fillStyle = "rgba(10,12,18,0.82)"; g.fill();
  g.lineWidth = 1.5; g.strokeStyle = tier.color; g.stroke();
  g.font = `800 ${fs}px ui-sans-serif, system-ui, -apple-system, "Segoe UI", "Apple Color Emoji", "Segoe UI Emoji", sans-serif`;
  g.fillStyle = tier.color; g.textAlign = "center";
  g.fillText(badgeText, Math.round(bx + badgeW / 2), Math.round(y + h - fs * 0.42));

  // plaquinha do nome
  roundRect(g, x, y, nameW, h, r);
  g.fillStyle = isAdmin ? "rgba(124,58,237,0.95)" : isMe ? "rgba(232,176,75,0.95)" : "rgba(12,14,22,0.7)";
  g.fill();
  if (isAdmin) { g.lineWidth = 1; g.strokeStyle = "rgba(216,180,254,0.95)"; g.stroke(); }
  else if (isMe) { g.lineWidth = 1; g.strokeStyle = "rgba(122,84,16,0.9)"; g.stroke(); }

  // texto do nome
  g.font = `600 ${fs}px ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif`;
  g.textAlign = "center";
  g.fillStyle = isAdmin ? "#ffffff" : isMe ? "#1a1206" : "#f2f6ff";
  if (!isMe && !isAdmin) { g.shadowColor = "rgba(0,0,0,0.55)"; g.shadowBlur = 2; g.shadowOffsetY = 0.5; }
  g.fillText(label, Math.round(x + nameW / 2), Math.round(y + h - fs * 0.42));
  g.shadowColor = "transparent"; g.shadowBlur = 0; g.shadowOffsetY = 0;

  // tag DEV (violeta claro com texto violeta escuro)
  if (isAdmin) {
    const tx = x + nameW + gap;
    roundRect(g, tx, y, tagW, h, r);
    g.fillStyle = "#e9d5ff"; g.fill();
    g.font = `800 ${tagFs}px ui-sans-serif, system-ui, sans-serif`;
    g.fillStyle = "#5b21b6"; g.textAlign = "center";
    g.fillText(tag, Math.round(tx + tagW / 2), Math.round(y + h - fs * 0.46));
  }
  return y;
}

// Balão de fala (chat) desenhado na camada de alta resolução, acima do nome.
// Quebra o texto em até 3 linhas; centralizado no personagem, com "rabinho".
function drawBubble(g: CanvasRenderingContext2D, text: string, cx: number, bottomY: number, cssW: number, cssH: number, ny: number, isAdmin = false) {
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
  // admin/DEV → balão em destaque (violeta claro + borda), demais → branco
  g.fillStyle = isAdmin ? "rgba(245,240,255,0.98)" : "rgba(250,250,252,0.96)";
  g.shadowColor = isAdmin ? "rgba(124,58,237,0.5)" : "rgba(0,0,0,0.4)";
  g.shadowBlur = isAdmin ? 8 : 6; g.shadowOffsetY = 1.5;
  g.fill();
  g.shadowColor = "transparent"; g.shadowBlur = 0; g.shadowOffsetY = 0;
  if (isAdmin) { g.lineWidth = 2; g.strokeStyle = "#8b5cf6"; g.stroke(); }
  // texto
  g.fillStyle = isAdmin ? "#4c1d95" : "#15161d";
  for (let i = 0; i < lines.length; i++) {
    g.fillText(lines[i], x + padX, y + padY + (i + 1) * lineH - Math.round(fs * 0.32));
  }
}
