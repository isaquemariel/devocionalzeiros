import { useEffect, useRef, useState } from "react";
import { Flag, Ban, Clock, X, ShieldAlert } from "lucide-react";
import { toast } from "sonner";
import { DEFAULT_LOOK, type MascotLook } from "@/lib/rpgMascot";
import { drawHeroHD, drawPetHD, heroMountLift } from "@/lib/rpgStageHD";
import { drawScenicHD } from "@/lib/rpgScenicHD";
import { getRoomDecor, drawRoomProp, roomPropFy, type RoomProp } from "@/lib/rpgRoomDecor";
import type { RPGRegion } from "@/lib/rpgBibleData";
import { useWorldRoom, type RemotePlayer, type KickReason } from "@/hooks/useWorldRoom";
import { RPGJoystick, JOY_RADIUS } from "@/components/rpg/RPGJoystick";
import { reportRoomUser, adminBanRoomUser, pingRoomBlockPush } from "@/lib/roomModeration";
import { getLevelTier } from "@/lib/rpgLevel";
import { RPGRoomChat } from "@/components/rpg/RPGRoomChat";
import { useKeyboardInset } from "@/hooks/useKeyboardInset";

// Cor de destaque do ADMIN/DEV (nome, tag e balão) — bem diferente do ouro
// do "eu" e do azul dos demais, pra deixar claro quem é da equipe.
const ADMIN_COLOR = "#c084fc"; // violeta

// Faixa "andável" (profundidade). Fundo mais alto = sala mais profunda → cabe
// mais gente (quem anda pra trás fica menor).
//
// A sala deixou de ser deitada: agora é um painel EM PÉ, mais alto do que
// largo. Com a faixa fixa em 0,54–0,94, metade da área virava céu e todo mundo
// se amontoava num filete embaixo. A faixa passa a acompanhar o formato — área
// alta abre o chão para cima, área larga mantém o enquadramento de antes.
const BAND_BOT = 0.94;
/** Linha do horizonte (fração da altura). Em pé sobe: metade da tela de céu
 *  numa área alta é desperdício — o chão é onde as pessoas estão. */
const groundPara = (aspecto: number) => {
  const t = Math.max(0, Math.min(1, (aspecto - 0.7) / 0.9));
  return 0.36 + t * 0.14; // em pé 0,36 · deitada 0,50 (como era)
};
/** O chão andável começa logo ABAIXO do horizonte — nunca acima, senão a
 *  pessoa caminha no céu. Os dois têm de mudar juntos. */
const bandTopPara = (fracaoChao: number) => fracaoChao + 0.05;
let BAND_TOP = 0.54;

/**
 * O MUNDO É MAIOR QUE A TELA.
 *
 * Antes o mapa inteiro cabia no quadro: dava três passos e acabava o mundo —
 * não havia para onde ir, e a sala parecia um palco, não um lugar. Agora o
 * mundo tem 2,6 janelas de largura e a CÂMERA SEGUE o personagem, como num
 * jogo de celular. Quem fica fora do quadro não se perde: vira uma seta na
 * borda com o nome, para a sala continuar sendo uma sala.
 */
const MUNDO_LARGURA = 2.6;
/** Suavidade da câmera. 1 = cola no personagem (sem inércia). */
const CAM_LERP = 0.11;
/** Margem em unidades lógicas antes de parar de desenhar o que saiu do quadro. */
const CULL = 140;
/** Velocidade do fundo em relação ao chão (0 = parado, 1 = junto). */
const PARALAXE = 0.35;

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
  const wrapRef = useRef<HTMLDivElement>(null);   // raiz (mundo + gaveta)
  const palcoRef = useRef<HTMLDivElement>(null);  // só o MUNDO — é ele que a cena mede
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const namesRef = useRef<HTMLCanvasElement>(null);
  const hitBoxesRef = useRef<HitBox[]>([]); // caixas clicáveis dos outros (menu de moderação)

  const { playersRef, bubblesRef, typingRef, sendPos, sendChat, sendTyping, sendModeration, stepRemotes, connected, count, messages } = useWorldRoom(roomId, me, !!me, onKicked);

  // Estado da câmera, exposto ao resto do componente: o clique precisa saber
  // que pedaço do mundo está em quadro para converter pixel → posição.
  const camRef = useRef({ camX: 0, VW: 1, W: 1, cssW: 1 });

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

  // O teclado não pode engolir a sala: ele encolhe o MUNDO por baixo (um
  // espaçador no fim da coluna), e a cena reenquadra sozinha. Antes o campo
  // abria uma gaveta e os personagens desapareciam atrás de uma parede preta —
  // que é o contrário do que a sala serve.
  const teclado = useKeyboardInset();

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

  // Coordenadas locais do canvas. A sala não gira mais: é retrato de verdade,
  // e a caixa do próprio canvas basta.
  const localPt = (clientX: number, clientY: number) => {
    const cv = canvasRef.current!;
    const r = cv.getBoundingClientRect();
    return { x: clientX - r.left, y: clientY - r.top, w: r.width, h: r.height };
  };

  const pointTo = (clientX: number, clientY: number) => {
    const cv = canvasRef.current; if (!cv) return;
    const pt = localPt(clientX, clientY);
    // o dedo toca a JANELA; o destino é no MUNDO — soma o quanto a câmera já
    // rolou, senão andar depois de caminhar um pouco leva para o lugar errado.
    const { camX, VW, W } = camRef.current;
    const fxMundo = camX + (pt.x / pt.w) * VW;
    const py = pt.y / pt.h;
    targetRef.current = {
      x: clamp01((fxMundo / W - 0.06) / 0.88),
      y: clamp01((py - BAND_TOP) / (BAND_BOT - BAND_TOP)),
    };
  };

  // Toque: se acertou um personagem → menu de moderação; senão → anda até lá.
  const tapAction = (clientX: number, clientY: number) => {
    const cv = canvasRef.current; if (!cv) return;
    const pt = localPt(clientX, clientY);
    const lx = pt.x, ly = pt.y;
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

  // ---------- joystick flutuante (segure e arraste em QUALQUER lugar) ----------
  // Tap curto continua com o comportamento clássico (menu do personagem ou
  // andar até o ponto). Arrastou além do limiar → vira joystick no ponto do
  // toque e o vetor do dedo move o personagem continuamente.
  const TAP_PX = 12;
  const [joy, setJoy] = useState<{ x: number; y: number; kx: number; ky: number } | null>(null);
  const joyRef = useRef<{ id: number; sx: number; sy: number; active: boolean; ax: number; ay: number } | null>(null);

  const onStagePointerDown = (e: React.PointerEvent) => {
    try { (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); } catch { /* ok */ }
    const pt = localPt(e.clientX, e.clientY);
    joyRef.current = { id: e.pointerId, sx: pt.x, sy: pt.y, active: false, ax: 0, ay: 0 };
  };
  const onStagePointerMove = (e: React.PointerEvent) => {
    const j = joyRef.current;
    if (!j || e.pointerId !== j.id) return;
    const pt = localPt(e.clientX, e.clientY);
    const dx = pt.x - j.sx, dy = pt.y - j.sy;
    const dist = Math.hypot(dx, dy);
    if (!j.active && dist > TAP_PX) { j.active = true; targetRef.current = null; }
    if (j.active) {
      const cl = Math.min(dist, JOY_RADIUS) / (dist || 1);
      const kx = dx * cl, ky = dy * cl;
      j.ax = kx / JOY_RADIUS; j.ay = ky / JOY_RADIUS;
      setJoy({ x: j.sx, y: j.sy, kx, ky });
    }
  };
  const onStagePointerUp = (e: React.PointerEvent) => {
    const j = joyRef.current;
    if (!j || e.pointerId !== j.id) return;
    if (!j.active) tapAction(e.clientX, e.clientY);
    joyRef.current = null;
    setJoy(null);
  };

  useEffect(() => {
    const cv = canvasRef.current, names = namesRef.current, wrap = palcoRef.current;
    if (!cv || !names || !wrap) return;
    const g = cv.getContext("2d"); if (!g) return;
    const ng = names.getContext("2d"); if (!ng) return;

    let W = 0, VW = 0, H = 0, GROUND = 0, cssW = 0, cssH = 0, dpr = 1, k = 1;
    let camX = 0;                       // canto esquerdo da janela, no mundo
    let decorAtual: RoomProp[] = [];    // cenografia já replicada p/ a largura do mundo
    const mood = moodFor(variantKey);
    const isHeaven = variantKey === "global";
    // cenografia do LIVRO: objetos bíblicos próprios desta sala
    const decor = getRoomDecor(variantKey, isHeaven ? "heaven" : region);

    const setup = () => {
      // offsetWidth/Height = dimensões LOCAIS (corretas mesmo sob rotação CSS)
      const rw = wrap.offsetWidth, rh = wrap.offsetHeight;
      // A gaveta de conversa redimensiona o mundo a cada quadro do arraste: sem
      // este atalho realocaríamos os dois buffers de canvas 60x por segundo.
      if (rw === cssW && rh === cssH) return;
      // caixa degenerada (gaveta cobrindo tudo, aba em segundo plano): sem isto
      // a razão de aspecto explodia e o buffer do canvas ia a dezenas de
      // milhares de pixels de largura.
      if (rw < 2 || rh < 2) return;
      const aspect = Math.min(3.6, Math.max(0.4, rw / rh));
      const fracaoChao = groundPara(aspect);
      BAND_TOP = bandTopPara(fracaoChao);
      // unidades lógicas fixas + SUPERSAMPLE por DPR = cena vetorial nítida.
      // VW = o que CABE na tela; W = o mundo inteiro, que é bem maior.
      H = 300; VW = Math.round(H * aspect); W = Math.round(VW * MUNDO_LARGURA);
      GROUND = Math.round(H * fracaoChao);
      dpr = Math.min(3, Math.max(1, window.devicePixelRatio || 1));
      cssW = rw; cssH = rh;
      k = Math.min(3, (cssH * dpr) / H || 1);
      cv.width = Math.round(VW * k); cv.height = Math.round(H * k);
      g.imageSmoothingEnabled = true;
      // A cenografia do livro é posicionada por FRAÇÃO da largura: num mundo
      // 2,6x mais largo os mesmos props ficariam 2,6x mais espalhados e o
      // cenário viraria um descampado. Repete-se o conjunto em fatias, com
      // jitter para não se ler como repetição.
      const copias = Math.max(1, Math.round((W / VW) * 1.7));
      decorAtual = [];
      for (let c = 0; c < copias; c++) {
        for (const pr of decor) {
          const h = hashStr(`${pr.kind}|${c}|${pr.fx}`);
          const jx = ((h % 1000) / 1000 - 0.5) * 0.06;
          const jd = (((h >> 10) % 1000) / 1000 - 0.5) * 0.10;
          decorAtual.push({
            ...pr,
            fx: (c + Math.min(0.97, Math.max(0.03, pr.fx + jx))) / copias,
            d: Math.max(0.01, pr.d + jd),
            scale: (pr.scale ?? 1) * (0.9 + ((h >> 20) % 100) / 500),
          });
        }
      }
      // camada de NOMES em alta resolução (DPR) → texto sempre nítido
      names.width = Math.round(cssW * dpr); names.height = Math.round(cssH * dpr);
      names.style.width = cssW + "px"; names.style.height = cssH + "px";
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
      // A velocidade é em unidades do MUNDO; como o mundo ficou 2,6x mais
      // largo, manter 0,34 faria o personagem atravessar a tela em pouco mais
      // de um segundo. Dividido pela largura do mundo, o passo na tela
      // continua o mesmo de antes.
      const SPx = 0.34 / MUNDO_LARGURA, SPy = 0.26;
      const keys = keysRef.current;
      const kx = (keys["arrowright"] || keys["d"] ? 1 : 0) - (keys["arrowleft"] || keys["a"] ? 1 : 0);
      const ky = (keys["arrowdown"] || keys["s"] ? 1 : 0) - (keys["arrowup"] || keys["w"] ? 1 : 0);
      const jj = joyRef.current;
      if (jj?.active && (jj.ax !== 0 || jj.ay !== 0)) {
        // joystick flutuante: vetor analógico do dedo → velocidade contínua
        pos.x = clamp01(pos.x + jj.ax * SPx * secs);
        pos.y = clamp01(pos.y + jj.ay * SPy * secs);
        if (Math.abs(jj.ax) > 0.04) dirRef.current = jj.ax > 0 ? 1 : -1;
        moving = Math.abs(jj.ax) > 0.04 || Math.abs(jj.ay) > 0.04;
      } else if (kx || ky) {
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

      // ---- CÂMERA: persegue o personagem e para nas bordas do mundo ----
      // Sem o clamp a câmera passaria do fim do mapa e mostraria vazio; com
      // ele, andar para a ponta simplesmente encosta e a pessoa continua
      // visível deslocada do centro, como em qualquer jogo de plataforma.
      const alvoCam = Math.max(0, Math.min(W - VW, feetXAt(pos.x, W) - VW / 2));
      camX += (alvoCam - camX) * (reduce ? 1 : CAM_LERP);
      if (Math.abs(alvoCam - camX) < 0.5) camX = alvoCam;
      camRef.current = { camX, VW, W, cssW };

      // ---- cena (paisagem vetorial HD; sala global = o Céu) ----
      g.setTransform(1, 0, 0, 1, 0, 0);
      g.clearRect(0, 0, cv.width, cv.height);
      // PARALAXE: a paisagem de fundo (céu, lua, serra) corre a 35% da
      // velocidade do chão. Sem isto a lua desliza no mesmo passo das árvores
      // e o mundo parece um pano de fundo puxado por uma corda.
      g.setTransform(k, 0, 0, k, -camX * PARALAXE * k, 0);
      g.save();
      // recorta na janela: o mundo é 2,6x mais largo e rasterizar o que está
      // fora do quadro seria pagar três telas por quadro.
      g.beginPath(); g.rect(camX * PARALAXE, 0, VW, H); g.clip();
      drawScenicHD(g, isHeaven ? "heaven" : region, { W, H, GROUND }, t, reduce);
      if (!isHeaven) {
        // grade de cor por livro (identidade da sala)
        const grad = g.createLinearGradient(0, 0, 0, H);
        grad.addColorStop(0, mood.top); grad.addColorStop(1, mood.bot);
        g.save(); g.globalAlpha = mood.a * 0.7; g.fillStyle = grad; g.fillRect(camX * PARALAXE, 0, VW, H); g.restore();
      }
      // fim da camada de fundo; daqui em diante é o CHÃO, que anda 1:1
      g.restore();
      g.setTransform(k, 0, 0, k, -camX * k, 0);
      g.save();
      g.beginPath(); g.rect(camX, 0, VW, H); g.clip();

      // ---- avatares + CENOGRAFIA no MESMO z-sort (profundidade real:
      //      a pessoa anda na frente E atrás dos objetos do livro) ----
      type Draw = { userId: string; nx: number; ny: number; look: MascotLook; name: string; dir: 1 | -1; moving: boolean; me: boolean; isAdmin: boolean; level: number };
      const list: Draw[] = [];
      const meNow = meRef.current;
      if (meNow) list.push({ userId: meNow.userId, nx: pos.x, ny: pos.y, look: meNow.look, name: meNow.name, dir: dirRef.current, moving, me: true, isAdmin: !!meNow.isAdmin, level: (meNow as { level?: number }).level ?? 0 });
      for (const p of playersRef.current.values() as IterableIterator<RemotePlayer>) {
        // Parado, o boneco virava estátua: uma sala com cinco estátuas parece
        // uma sala vazia. Quem não anda olha de um lado para o outro a cada
        // ~8s, com a fase presa ao id — todo mundo junto seria pior que nada.
        const dir = p.moving ? p.dir : (Math.sin((t + (hashStr(p.userId) % 16000)) / 2600) > 0 ? 1 : -1) as 1 | -1;
        list.push({ userId: p.userId, nx: p.x, ny: p.y, look: p.look && Object.keys(p.look).length ? p.look : DEFAULT_LOOK, name: p.name, dir, moving: p.moving, me: false, isAdmin: p.isAdmin, level: p.level ?? 0 });
      }

      type Item = { fy: number; player?: Draw; prop?: RoomProp };
      const items: Item[] = decorAtual.map((p) => ({ fy: roomPropFy(p, { H, GROUND }), prop: p }));
      for (const d of list) items.push({ fy: feetYAt(d.ny, H), player: d });
      items.sort((a, b) => a.fy - b.fy);

      // limpa camada de nomes (alta resolução)
      ng.setTransform(dpr, 0, 0, dpr, 0, 0);
      ng.clearRect(0, 0, cssW, cssH);

      const boxes: HitBox[] = [];
      const tagsDoQuadro: TagRect[] = []; // plaquinhas já colocadas neste quadro
      // Quem a câmera deixou para trás. A margem de 6% evita o pisca-pisca de
      // quem está exatamente na borda entrando e saindo da lista.
      const foraDoQuadro = list.filter((d) => {
        if (d.me) return false;
        const fx = feetXAt(d.nx, W);
        return fx < camX + VW * 0.06 || fx > camX + VW * 0.94;
      });
      for (const it of items) {
        if (it.prop) {
          const pfx = it.prop.fx * W;
          if (pfx < camX - CULL || pfx > camX + VW + CULL) continue;
          drawRoomProp(g, it.prop, { W, H, GROUND }, t, reduce);
          continue;
        }
        const d = it.player!;
        const fx = feetXAt(d.nx, W), fy = feetYAt(d.ny, H);
        if (fx < camX - CULL || fx > camX + VW + CULL) continue;
        // altura-alvo do boneco na cena (frente maior que fundo) → profundidade.
        // Padrão MENOR (pensando em salas cheias): montaria/mascote escalam junto.
        const lift = heroMountLift(d.look.mount);
        const HERO_VIS = 53;
        // Tamanho da figura pelo LADO MENOR do palco, não pela altura.
        // Deitado os dois davam no mesmo (a altura era o lado menor); em pé a
        // altura dobrou e a largura não, então a mesma fração transformava
        // cada personagem num gigante ocupando um terço da tela.
        const targetH = Math.min(VW, H) * (0.128 + d.ny * 0.178);
        const k2 = targetH / HERO_VIS;
        // herói HD desenhado DIRETO na cena, escalado pela profundidade
        g.save();
        g.translate(fx, fy); g.scale(k2, k2); g.translate(-fx, -fy);
        drawHeroHD(g, fx, fy, { ...DEFAULT_LOOK, ...d.look }, { t, reduce, walking: d.moving, face: d.dir });
        if (d.look.pet && d.look.pet !== "none") drawPetHD(g, fx - 32, fy, d.look.pet, t, reduce);
        g.restore();

        const dw = 58 * k2, dh = (HERO_VIS + lift + 8) * k2;
        const dx = fx - dw / 2, dy = fy - dh;

        // caixa clicável (só dos OUTROS) → menu de moderação. Em ordem de desenho
        // (trás→frente), então o clique prefere o da frente.
        if (!d.me) boxes.push({
          userId: d.userId, name: d.name, isAdmin: d.isAdmin,
          left: ((dx - camX) / VW) * cssW, top: (dy / H) * cssH, width: (dw / VW) * cssW, height: (dh / H) * cssH,
        });

        // nome (padrão do app) ancorado no TOPO DA CABEÇA do herói HD — com
        // montaria a cabeça sobe (lift), a tag acompanha colada.
        const sx = ((fx - camX) / VW) * cssW;
        // Fora da janela quem responde é a seta da borda. Sem isto a plaquinha
        // e o balão de quem saiu de quadro grudavam na lateral da tela (o
        // balão tem clamp para não vazar), e "Bom dia, gente!" ficava pendurado
        // na borda com ninguém embaixo.
        if (sx < -12 || sx > cssW + 12) continue;
        const headTopCss = ((fy - (HERO_VIS + 12 + lift) * k2) / H) * cssH; // +12 = acessório de cabeça
        const refPx = Math.min(cssW, cssH); // mesma régua das figuras
        const nameTop = drawName(ng, d.name, sx, headTopCss - 2, d.me, d.isAdmin, refPx, d.ny, d.level, tagsDoQuadro);
        // balão de fala (chat) acima do nome, se houver mensagem ativa
        const bub = bubblesRef.current.get(d.userId);
        if (bub && now < bub.until) drawBubble(ng, bub.text, sx, nameTop - 4, cssW, refPx, d.ny, bub.isAdmin, tagsDoQuadro);
        else if ((typingRef.current.get(d.userId) ?? 0) > now) drawTyping(ng, sx, nameTop - 4, refPx, d.ny, t);
      }
      hitBoxesRef.current = boxes;
      g.restore(); // solta o recorte da janela

      // ---- quem ficou fora do quadro vira uma seta na borda -------------
      // A câmera que segue é o que dá sensação de mundo, mas uma SALA em que
      // você não sabe quem está nela deixou de ser sala. As setas devolvem
      // isso: nome, nível e para que lado a pessoa está.
      let naEsquerda = 0, naDireita = 0;
      for (const d of foraDoQuadro) {
        const paraDireita = feetXAt(d.nx, W) > camX + VW / 2;
        const fila = paraDireita ? naDireita++ : naEsquerda++;
        drawSetaBorda(ng, d.name, paraDireita, cssW, cssH, fila, d.isAdmin);
      }

      raf = requestAnimationFrame(frame);
    };
    frame(performance.now()); // 1º quadro já desenhado (sem flash na 1ª montagem)
    return () => { on = false; ro.disconnect(); if (raf) cancelAnimationFrame(raf); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [region, roomId, variantKey]);

  return (
    <div ref={wrapRef} className="relative flex h-full w-full select-none flex-col overflow-hidden">
      {/* ---- O MUNDO ----------------------------------------------------
          Em pé o mundo é a parte de cima: é ele que encolhe quando a gaveta de
          conversa sobe, e é só ele que a cena mede para desenhar. Os gestos de
          andar ficam aqui dentro — no chat, o dedo rola a conversa. */}
      <div className="relative min-h-0 flex-1">
      <div
        ref={palcoRef}
        className="absolute inset-0"
        style={{ touchAction: "none", cursor: "pointer" }}
        onPointerDown={onStagePointerDown}
        onPointerMove={onStagePointerMove}
        onPointerUp={onStagePointerUp}
        onPointerCancel={onStagePointerUp}
      >
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
        <canvas ref={namesRef} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true" />
        {/* Âncora do joystick: o controle é flutuante (nasce onde o dedo
            encosta), mas sem nenhuma marca ninguém descobre que ele existe.
            Este círculo fraco no canto é só o lembrete — some enquanto se
            joga. */}
        {!joy && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-[86px] left-4 h-14 w-14 rounded-full border-2 border-white/15"
          >
            <span className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/15" />
          </span>
        )}
        {joy && <RPGJoystick x={joy.x} y={joy.y} kx={joy.kx} ky={joy.ky} />}
      </div>

      {/* ---- A CONVERSA ---------------------------------------------------
          Irmã do palco, não filha: o palco tem `touch-action: none` para o
          joystick, e isso impediria a rolagem do histórico se o chat vivesse
          dentro dele. A barra flutua sobre o mundo; o painel desliza da
          direita quando a pessoa pede. */}
      <RPGRoomChat messages={messages} onSend={sendChat} onTyping={sendTyping} />
      </div>

      {/* O teclado tira altura do MUNDO, e só. A cena reenquadra e continua
          inteira acima dele — nada de parede preta. */}
      {teclado > 0 && <div aria-hidden="true" style={{ height: teclado }} className="shrink-0" />}


      {/* ---- Menu de moderação (ao tocar num personagem) ---- */}
      {menu && (
        <div
          className="absolute inset-0 z-30 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm"
          onPointerDown={(e) => { e.stopPropagation(); if (e.target === e.currentTarget) { setMenu(null); setConfirmReport(false); } }}
        >
          <div className="w-full sm:max-w-xs bg-[#100e18] border border-white/10 rounded-t-2xl sm:rounded-2xl p-4 pb-[max(1rem,var(--safe-area-inset-bottom,env(safe-area-inset-bottom,0px)))] sm:pb-4">
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
// `refPx` = LADO MENOR do palco. A plaquinha precisa acompanhar o tamanho da
// figura, e a figura agora é medida pelo lado menor; keyed na altura, em pé a
// tag ficava maior que o personagem que ela nomeia.
interface TagRect { x: number; y: number; w: number; h: number }

function drawName(g: CanvasRenderingContext2D, name: string, cx: number, bottomY: number, isMe: boolean, isAdmin: boolean, refPx: number, ny: number, level = 0, ocupados?: TagRect[]): number {
  const fs = Math.max(9, Math.min(13, Math.round(refPx * 0.026 * (0.9 + ny * 0.18))));
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
  const bx = Math.round(cx - totalW / 2);
  let y = Math.round(bottomY - h);

  // EMPILHAMENTO: duas pessoas lado a lado escondiam o nome uma da outra —
  // numa sala em pé, onde o chão é mais estreito, isso passou a ser a regra e
  // não a exceção. Quem chega depois sobe até achar espaço livre.
  if (ocupados) {
    for (let tent = 0; tent < 4; tent++) {
      const bate = ocupados.some((o) => bx < o.x + o.w && bx + totalW > o.x && y < o.y + o.h && y + h > o.y);
      if (!bate) break;
      y -= h + 3;
    }
    ocupados.push({ x: bx, y, w: totalW, h });
  }
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
/**
 * "…" pulsante sobre a cabeça de quem está escrevendo.
 *
 * Numa sala em que a fala dura seis segundos e some, o silêncio entre duas
 * frases é ambíguo: a pessoa está respondendo ou já foi embora? O balão de
 * reticências responde isso sem ocupar o feed.
 */
function drawTyping(g: CanvasRenderingContext2D, cx: number, bottomY: number, refPx: number, ny: number, t: number) {
  const fs = Math.max(10, Math.min(14, Math.round(refPx * 0.026 * (0.92 + ny * 0.14))));
  const r = Math.round(fs * 0.22);
  const gap = Math.round(fs * 0.62);
  const w = gap * 2 + r * 2 + Math.round(fs * 1.1);
  const h = Math.round(fs * 1.5);
  const tail = Math.round(fs * 0.42);
  const x = Math.round(cx - w / 2);
  const y = Math.round(bottomY - tail - h);
  const rr = Math.round(h / 2);
  g.beginPath();
  g.moveTo(x + rr, y);
  g.arcTo(x + w, y, x + w, y + h, rr);
  g.arcTo(x + w, y + h, x, y + h, rr);
  g.arcTo(x, y + h, x, y, rr);
  g.arcTo(x, y, x + w, y, rr);
  g.closePath();
  g.moveTo(cx - tail, y + h);
  g.lineTo(cx, y + h + tail);
  g.lineTo(cx + tail, y + h);
  g.closePath();
  g.fillStyle = "rgba(250,250,252,0.92)";
  g.shadowColor = "rgba(0,0,0,0.35)"; g.shadowBlur = 5; g.shadowOffsetY = 1;
  g.fill();
  g.shadowColor = "transparent"; g.shadowBlur = 0; g.shadowOffsetY = 0;
  // três pontos subindo em onda — é o gesto que todo mensageiro já ensinou
  for (let i = 0; i < 3; i++) {
    const sobe = Math.sin(t / 220 + i * 0.7) * (fs * 0.13);
    g.beginPath();
    g.arc(x + w / 2 + (i - 1) * gap, y + h / 2 - sobe, r, 0, Math.PI * 2);
    g.fillStyle = `rgba(30,32,44,${0.45 + 0.35 * (0.5 + 0.5 * Math.sin(t / 220 + i * 0.7))})`;
    g.fill();
  }
}

/**
 * Seta na borda com o nome de quem a câmera deixou fora do quadro.
 *
 * É o preço de ter um mundo maior que a tela — e a resposta a ele: a sala
 * continua legível como sala, porque você vê quem está nela e para que lado
 * andar para encontrar a pessoa.
 */
function drawSetaBorda(
  g: CanvasRenderingContext2D, name: string, paraDireita: boolean,
  cssW: number, cssH: number, fila: number, isAdmin: boolean,
) {
  const fs = Math.max(9, Math.min(12, Math.round(Math.min(cssW, cssH) * 0.024)));
  const nome = (name || "Viajante").split(" ")[0].slice(0, 10);
  g.font = `800 ${fs}px ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif`;
  g.textBaseline = "middle";
  const seta = Math.round(fs * 0.62);
  const padX = Math.round(fs * 0.6);
  const w = Math.ceil(g.measureText(nome).width) + padX * 2 + seta + 4;
  const h = Math.round(fs * 1.9);
  // Alto, na faixa do céu: a 34% da altura as setas caíam em cima das
  // plaquinhas de quem está em cena, e com o teclado aberto (mundo curto)
  // sobrepunham os próprios personagens. Empilha para baixo quando há mais
  // de uma pessoa do mesmo lado.
  const y = Math.round(cssH * 0.15 + fila * (h + 5));
  if (y + h > cssH - 6) return; // sem espaço: não polui a borda
  const x = paraDireita ? Math.round(cssW - w - 4) : 4;
  const r = Math.round(h / 2);
  g.beginPath();
  g.moveTo(x + r, y);
  g.arcTo(x + w, y, x + w, y + h, r);
  g.arcTo(x + w, y + h, x, y + h, r);
  g.arcTo(x, y + h, x, y, r);
  g.arcTo(x, y, x + w, y, r);
  g.closePath();
  g.fillStyle = "rgba(10,9,16,0.72)";
  g.fill();
  g.lineWidth = 1.5;
  g.strokeStyle = isAdmin ? ADMIN_COLOR : "rgba(232,176,75,0.55)";
  g.stroke();
  const cy = y + h / 2;
  // ponta apontando para fora — é para lá que a pessoa está
  const sx = paraDireita ? x + w - padX - seta * 0.2 : x + padX + seta * 0.2;
  const sg = paraDireita ? 1 : -1;
  g.beginPath();
  g.moveTo(sx + sg * seta * 0.5, cy);
  g.lineTo(sx - sg * seta * 0.35, cy - seta * 0.52);
  g.lineTo(sx - sg * seta * 0.35, cy + seta * 0.52);
  g.closePath();
  g.fillStyle = isAdmin ? ADMIN_COLOR : "#e8b04b";
  g.fill();
  g.fillStyle = "rgba(255,255,255,0.92)";
  g.textAlign = paraDireita ? "left" : "right";
  g.fillText(nome, paraDireita ? x + padX : x + w - padX, cy + 0.5);
  g.textAlign = "left";
}

function drawBubble(g: CanvasRenderingContext2D, text: string, cx: number, bottomY: number, cssW: number, refPx: number, ny: number, isAdmin = false, ocupados?: TagRect[]) {
  // O balão É a conversa da sala, não um enfeite: fonte com piso maior e
  // caixa mais larga, para uma mensagem de 160 caracteres caber inteira em
  // vez de terminar em "…" no meio da frase.
  const fs = Math.max(12, Math.min(16, Math.round(refPx * 0.030 * (0.92 + ny * 0.14))));
  g.font = `500 ${fs}px ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif`;
  g.textAlign = "left"; g.textBaseline = "alphabetic";
  const maxW = Math.max(140, Math.min(cssW * 0.74, 320));
  const innerW = maxW - fs; // largura útil do texto
  const MAX_LINES = 4;
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
  let y = Math.round(bottomY - tail - h);
  // A conversa da sala acontece AQUI, nos balões: dois deles um por cima do
  // outro não é um detalhe estético, é a fala de alguém que se perdeu. Sobe
  // até achar lugar livre, como as plaquinhas.
  if (ocupados) {
    for (let tent = 0; tent < 4; tent++) {
      const bate = ocupados.some((o) => x < o.x + o.w && x + w > o.x && y < o.y + o.h && y + h > o.y);
      if (!bate) break;
      y -= h + 4;
    }
    ocupados.push({ x, y, w, h });
  }
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
