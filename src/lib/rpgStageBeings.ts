// ============================================================================
// RPG Stage Beings — SERES simbólicos bíblicos (Apocalipse e AT) em arte
// VETORIAL HD.
//
// Mesmo padrão de qualidade de rpgStageHD.drawHumanHD: gradientes, luz e
// sombra em cada forma, contornos suaves, animação discreta por t (asas,
// palmas, chamas), glow de glória. Anatomias baseadas nas versões pixel de
// rpgStageActors.ts, redesenhadas do zero em paths/curvas.
//
// Contrato:
// - drawBeingHD(g, x, fy, spec): ancorado nos PÉS (x, fy); facing espelha via
//   save/translate/scale(-1,1); reduce desliga animação; alpha multiplica
//   globalAlpha; glow desenha aura dourada suave.
// - beingHeight(role, scale): altura visual em unidades (humanos do jogo: 46).
//
// Zero alocação por frame dentro dos loops de draw: todas as tabelas de
// offsets/paletas são constantes de módulo; gradientes só fora de loops.
// ============================================================================

type G = CanvasRenderingContext2D;

// ---------- helpers locais (sem dependências externas) ----------
const TAU = Math.PI * 2;

const rr = (g: G, x: number, y: number, w: number, h: number, r: number) => {
  const rad = Math.min(r, w / 2, h / 2);
  g.beginPath();
  g.moveTo(x + rad, y);
  g.arcTo(x + w, y, x + w, y + h, rad);
  g.arcTo(x + w, y + h, x, y + h, rad);
  g.arcTo(x, y + h, x, y, rad);
  g.arcTo(x, y, x + w, y, rad);
  g.closePath();
};

const softShadow = (g: G, x: number, fy: number, w: number, alpha = 0.28) => {
  g.save();
  const grd = g.createRadialGradient(x, fy, 1, x, fy, w);
  grd.addColorStop(0, `rgba(0,0,0,${alpha})`);
  grd.addColorStop(1, "rgba(0,0,0,0)");
  g.fillStyle = grd;
  g.beginPath(); g.ellipse(x, fy, w, w * 0.26, 0, 0, TAU); g.fill();
  g.restore();
};

const glowCircle = (g: G, x: number, y: number, r: number, color: string, alpha: number) => {
  g.save();
  const grd = g.createRadialGradient(x, y, 0, x, y, r);
  grd.addColorStop(0, color);
  grd.addColorStop(1, "rgba(0,0,0,0)");
  g.globalAlpha *= alpha;
  g.fillStyle = grd;
  g.fillRect(x - r, y - r, r * 2, r * 2);
  g.restore();
};

// chifre curvado (dragão/besta): base (bx,by) → ponta (bx+dx, by+dy), meia-largura w
const horn = (g: G, bx: number, by: number, dx: number, dy: number, w: number) => {
  g.beginPath();
  g.moveTo(bx - w, by);
  g.quadraticCurveTo(bx + dx * 0.42, by + dy * 0.55 - w, bx + dx, by + dy);
  g.quadraticCurveTo(bx + dx * 0.42, by + dy * 0.45 + w, bx + w, by + w * 0.5);
  g.closePath();
  g.fill();
};

// ============================================================================
// CONTRATO PÚBLICO
// ============================================================================

export const BEING_ROLES: Set<string> = new Set([
  "dragao", "besta", "cordeiro", "servivente", "cavaleiro", "multidao", "mulher",
  "serpente", "rebanho",
]);

export interface HDBeingSpec {
  role: string;
  pose?: string;
  facing?: 1 | -1;
  scale?: number;
  palette?: string;
  glow?: number;
  alpha?: number;
  t?: number;
  reduce?: boolean;
}

/** Altura visual (unidades) de um ser — humanos do jogo têm 46. */
export function beingHeight(role: string, scale = 1): number {
  switch (role) {
    case "dragao": return 95 * scale;
    case "besta": return 80 * scale;
    case "cordeiro": return 30 * scale;
    case "servivente": return 52 * scale;
    case "cavaleiro": return 58 * scale;
    case "multidao": return 55 * scale;
    case "mulher": return 50 * scale;
    case "serpente": return 26 * scale;
    case "rebanho": return 34 * scale;
    default: return 46 * scale;
  }
}

// ============================================================================
// DRAGÃO — o grande dragão vermelho (Ap 12), 7 cabeças / 10 chifres
// ============================================================================

const RED_HI = "#e06050", RED_MID = "#b0342c", RED_DK = "#5e1210";
const MEMB_0 = "#8a2a24", MEMB_1 = "#40100e";
const HORN_C = "#ecdcb4";
const FLAME_0 = "#ffe9a0", FLAME_1 = "#ff8c2e";

interface DragHead { hx: number; hy: number; r: number; main: boolean }
// cabeça principal primeiro (desenhada por ÚLTIMO — loop decrescente)
const DRAG_HEADS: readonly DragHead[] = [
  { hx: 30, hy: -76, r: 8.6, main: true },
  { hx: 11, hy: -82, r: 4.6, main: false },
  { hx: 21, hy: -87, r: 4.8, main: false },
  { hx: 40, hy: -83, r: 4.6, main: false },
  { hx: 4,  hy: -70, r: 4.3, main: false },
  { hx: 47, hy: -70, r: 4.4, main: false },
  { hx: 15, hy: -63, r: 4.1, main: false },
];
// acorrentado (Ap 20): cabeças baixas, rente ao chão
const DRAG_HEADS_LIE: readonly DragHead[] = [
  { hx: 38, hy: -9,  r: 8.6, main: true },
  { hx: 22, hy: -6,  r: 4.6, main: false },
  { hx: 30, hy: -14, r: 4.8, main: false },
  { hx: 48, hy: -7,  r: 4.6, main: false },
  { hx: 14, hy: -13, r: 4.3, main: false },
  { hx: 54, hy: -13, r: 4.4, main: false },
  { hx: 9,  hy: -5,  r: 4.1, main: false },
];

function drawDragonHead(g: G, hx: number, hy: number, r: number, main: boolean): void {
  // crânio
  g.fillStyle = RED_MID;
  g.beginPath(); g.ellipse(hx, hy, r * 1.02, r * 0.88, 0, 0, TAU); g.fill();
  // sombreado inferior
  g.fillStyle = RED_DK;
  g.beginPath(); g.ellipse(hx + r * 0.14, hy + r * 0.34, r * 0.8, r * 0.42, 0, 0, TAU); g.fill();
  // focinho + mandíbula
  g.fillStyle = RED_MID;
  rr(g, hx + r * 0.5, hy - r * 0.36, r * 1.25, r * 0.78, r * 0.3); g.fill();
  g.fillStyle = RED_DK;
  rr(g, hx + r * 0.55, hy + r * 0.3, r * 1.05, r * 0.34, r * 0.16); g.fill();
  // narina
  g.fillStyle = "#380c0a";
  g.beginPath(); g.arc(hx + r * 1.55, hy - r * 0.08, r * 0.1 + 0.25, 0, TAU); g.fill();
  // luz no topo do crânio
  g.fillStyle = RED_HI;
  g.beginPath(); g.ellipse(hx - r * 0.15, hy - r * 0.5, r * 0.6, r * 0.26, -0.2, 0, TAU); g.fill();
  // olho com chama
  g.fillStyle = FLAME_1;
  g.beginPath(); g.ellipse(hx + r * 0.34, hy - r * 0.26, r * 0.26, r * 0.34, 0, 0, TAU); g.fill();
  g.fillStyle = FLAME_0;
  g.beginPath(); g.arc(hx + r * 0.34, hy - r * 0.32, r * 0.12, 0, TAU); g.fill();
  // chifres: principal leva 4, cada menor leva 1 (total 10)
  g.fillStyle = HORN_C;
  if (main) {
    horn(g, hx - r * 0.42, hy - r * 0.68, -r * 0.55, -r * 0.95, r * 0.15);
    horn(g, hx + r * 0.1, hy - r * 0.78, -r * 0.22, -r * 1.1, r * 0.15);
    horn(g, hx - r * 0.78, hy - r * 0.36, -r * 0.7, -r * 0.5, r * 0.12);
    horn(g, hx + r * 0.5, hy - r * 0.68, r * 0.18, -r * 0.95, r * 0.13);
  } else {
    horn(g, hx - r * 0.18, hy - r * 0.58, -r * 0.45, -r * 1.05, r * 0.18);
  }
}

function drawDragonHD(g: G, t: number, reduce: boolean, lie: boolean): void {
  const sway = reduce ? 0 : Math.sin(t * 0.0021);
  const flap = reduce || lie ? 0 : Math.sin(t * 0.0052);
  const bodyCy = lie ? -15 : -34;
  const bodyRy = lie ? 12 : 19;

  softShadow(g, 4, 0, lie ? 52 : 44, 0.32);

  // ---- cauda longa que varre (atrás de tudo)
  const tipX = -76 - sway * 5;
  const tipY = (lie ? -4 : -8) - sway * 7;
  const tg = g.createLinearGradient(-72, bodyCy, -10, bodyCy);
  tg.addColorStop(0, RED_DK); tg.addColorStop(1, RED_MID);
  g.fillStyle = tg;
  g.beginPath();
  g.moveTo(-14, bodyCy - 6);
  g.quadraticCurveTo(-48, bodyCy - 12 + sway * 5, tipX, tipY);
  g.quadraticCurveTo(-44, bodyCy + 10, -12, bodyCy + 10);
  g.closePath(); g.fill();
  // espinhos ao longo da cauda + ponta de seta
  g.fillStyle = "#7a1e1a";
  for (let i = 1; i <= 4; i++) {
    const p = i / 5;
    const q = 1 - p;
    const sx = q * q * -14 + 2 * q * p * -48 + p * p * tipX;
    const sy = q * q * (bodyCy - 6) + 2 * q * p * (bodyCy - 12 + sway * 5) + p * p * tipY;
    g.beginPath();
    g.moveTo(sx - 2.4, sy + 1);
    g.lineTo(sx, sy - 3.6);
    g.lineTo(sx + 2.4, sy + 1);
    g.closePath(); g.fill();
  }
  g.fillStyle = RED_DK;
  g.beginPath();
  g.moveTo(tipX + 3, tipY + 2.6);
  g.lineTo(tipX - 5.5, tipY - 1);
  g.lineTo(tipX + 1.5, tipY - 4.5);
  g.closePath(); g.fill();

  // ---- asas de morcego batendo (atrás do corpo)
  if (!lie) {
    const wing = (wx: number, wy: number, k: number, far: boolean) => {
      const lift = flap * 7 * k;
      const c0 = far ? "#5e1a16" : MEMB_0;
      const c1 = far ? "#2c0a08" : MEMB_1;
      g.beginPath();
      g.moveTo(wx, wy);
      g.quadraticCurveTo(wx - 6 * k, wy - 26 * k - lift, wx - 16 * k, wy - 36 * k - lift);
      g.lineTo(wx - 32 * k, wy - 22 * k - lift * 0.8);
      g.quadraticCurveTo(wx - 25 * k, wy - 14 * k - lift * 0.4, wx - 34 * k, wy - 4 * k);
      g.quadraticCurveTo(wx - 24 * k, wy - 2 * k, wx - 20 * k, wy + 6 * k);
      g.quadraticCurveTo(wx - 10 * k, wy + 3 * k, wx, wy + 6 * k);
      g.closePath();
      const wg = g.createLinearGradient(wx - 30 * k, wy - 30 * k, wx, wy + 4 * k);
      wg.addColorStop(0, c0); wg.addColorStop(1, c1);
      g.fillStyle = wg; g.fill();
      // ossos da asa
      g.strokeStyle = "rgba(28,6,5,0.6)"; g.lineWidth = 1.5; g.lineCap = "round";
      g.beginPath(); g.moveTo(wx, wy); g.quadraticCurveTo(wx - 6 * k, wy - 26 * k - lift, wx - 16 * k, wy - 36 * k - lift); g.stroke();
      g.beginPath(); g.moveTo(wx - 9 * k, wy - 19 * k - lift * 0.6); g.lineTo(wx - 34 * k, wy - 4 * k); g.stroke();
      g.beginPath(); g.moveTo(wx - 9 * k, wy - 19 * k - lift * 0.6); g.lineTo(wx - 20 * k, wy + 6 * k); g.stroke();
    };
    wing(8, -48, 0.76, true);
    wing(2, -46, 1, false);
  } else {
    // asa dobrada rente ao dorso
    g.fillStyle = MEMB_1;
    g.beginPath();
    g.moveTo(-20, bodyCy - 8);
    g.quadraticCurveTo(2, bodyCy - 22, 20, bodyCy - 10);
    g.quadraticCurveTo(0, bodyCy - 12, -20, bodyCy - 8);
    g.closePath(); g.fill();
  }

  // ---- patas com garras
  if (!lie) {
    g.fillStyle = RED_DK;
    rr(g, -15, -17, 9, 17, 4); g.fill();
    rr(g, 9, -19, 9.5, 19, 4); g.fill();
    g.fillStyle = HORN_C;
    for (let i = 0; i < 3; i++) {
      const cx = -14 + i * 3.4;
      g.beginPath(); g.moveTo(cx, -1); g.lineTo(cx + 1.4, -3.4); g.lineTo(cx + 2.8, -1); g.closePath(); g.fill();
      const cx2 = 10 + i * 3.6;
      g.beginPath(); g.moveTo(cx2, -1); g.lineTo(cx2 + 1.5, -3.6); g.lineTo(cx2 + 3, -1); g.closePath(); g.fill();
    }
  } else {
    g.fillStyle = RED_DK;
    rr(g, -16, -7, 12, 7, 3); g.fill();
    rr(g, 8, -7, 12, 7, 3); g.fill();
  }

  // ---- corpo serpentino com gradiente
  const bg = g.createLinearGradient(0, bodyCy - bodyRy, 0, bodyCy + bodyRy);
  bg.addColorStop(0, RED_HI); bg.addColorStop(0.55, RED_MID); bg.addColorStop(1, RED_DK);
  g.fillStyle = bg;
  g.beginPath(); g.ellipse(-2, bodyCy, 27, bodyRy, lie ? 0 : -0.08, 0, TAU); g.fill();

  // espinhos dorsais
  g.fillStyle = "#7a1e1a";
  for (let i = 0; i < 5; i++) {
    const sx = -18 + i * 8;
    const rel = (sx + 2) / 27;
    const top = bodyCy - bodyRy * Math.sqrt(Math.max(0.05, 1 - rel * rel)) + 1;
    g.beginPath();
    g.moveTo(sx - 2.6, top + 2);
    g.lineTo(sx, top - 4);
    g.lineTo(sx + 2.6, top + 2);
    g.closePath(); g.fill();
  }

  // ---- barriga segmentada (placas mais claras)
  const bel = g.createLinearGradient(0, bodyCy - 4, 0, bodyCy + bodyRy);
  bel.addColorStop(0, "#e8b878"); bel.addColorStop(1, "#a8702e");
  g.fillStyle = bel;
  g.beginPath(); g.ellipse(5, bodyCy + bodyRy * 0.34, 17, bodyRy * 0.58, 0, 0, TAU); g.fill();
  g.strokeStyle = "rgba(90,40,10,0.4)"; g.lineWidth = 1; g.lineCap = "round";
  for (let i = 0; i < 4; i++) {
    const yy = bodyCy + bodyRy * 0.05 + i * bodyRy * 0.22;
    g.beginPath();
    g.moveTo(5 - 13, yy);
    g.quadraticCurveTo(5, yy + 2.6, 5 + 13, yy);
    g.stroke();
  }

  // ---- 7 pescoços + cabeças (principal por último, por cima)
  const heads = lie ? DRAG_HEADS_LIE : DRAG_HEADS;
  const nbx = 10, nby = bodyCy - bodyRy * 0.45;
  g.lineCap = "round";
  for (let i = heads.length - 1; i >= 0; i--) {
    const h = heads[i];
    const nod = reduce || lie ? 0 : Math.sin(t * 0.0034 + i * 1.7) * 1.8;
    const hy = h.hy + nod;
    g.strokeStyle = i % 2 === 0 ? RED_MID : RED_DK;
    g.lineWidth = h.r * (h.main ? 0.95 : 0.85);
    g.beginPath();
    g.moveTo(nbx, nby);
    g.quadraticCurveTo((nbx + h.hx) / 2 - 3, (nby + hy) / 2 - 6, h.hx - h.r * 0.25, hy + h.r * 0.35);
    g.stroke();
    drawDragonHead(g, h.hx, hy, h.r, h.main);
  }
  // chama pulsando no olho da cabeça principal
  if (!reduce) {
    const m = heads[0];
    const fl = 0.5 + Math.sin(t * 0.013) * 0.3;
    glowCircle(g, m.hx + m.r * 0.34, m.hy - m.r * 0.26, m.r * 0.95, "#ff9c3e", 0.5 * fl);
  }

  // ---- corrente cinza (milênio, Ap 20)
  if (lie) {
    g.strokeStyle = "#a8adb8"; g.lineWidth = 1.4;
    for (let i = 0; i <= 9; i++) {
      const p = i / 9;
      const q = 1 - p;
      const ix = q * q * -30 + 2 * q * p * 4 + p * p * 34;
      const iy = q * q * -1 + 2 * q * p * -32 + p * p * -2;
      g.beginPath(); g.ellipse(ix, iy, 2.1, 1.3, p * 2.4, 0, TAU); g.stroke();
    }
    // estacas cravadas no chão
    g.fillStyle = "#5a5f6a";
    rr(g, -33, -3.5, 4, 4, 1); g.fill();
    rr(g, 33, -3.5, 4, 4, 1); g.fill();
    // brilho frio do metal
    g.strokeStyle = "rgba(255,255,255,0.35)"; g.lineWidth = 0.6;
    g.beginPath(); g.moveTo(-6, -27); g.quadraticCurveTo(4, -32, 14, -25); g.stroke();
  }
}

// ============================================================================
// BESTA — do mar (leopardo/urso/leão, 7 cabeças, 10 chifres c/ diademas),
// da terra (2 chifres de cordeiro) e escarlate (Ap 17, com sela)
// ============================================================================

// manchas de leopardo (rosetas) relativas ao centro do corpo
const BEAST_SPOTS: readonly (readonly [number, number])[] = [
  [-20, -6], [-12, -12], [-3, -4], [-14, 3], [3, -11],
  [10, -3], [-23, 4], [1, 7], [12, 6], [-6, 11],
];
interface BeastHead { hx: number; hy: number; r: number; main: boolean }
const BEAST_HEADS: readonly BeastHead[] = [
  { hx: 30, hy: -60, r: 8,   main: true },
  { hx: 13, hy: -66, r: 4.4, main: false },
  { hx: 22, hy: -71, r: 4.6, main: false },
  { hx: 39, hy: -67, r: 4.4, main: false },
  { hx: 7,  hy: -55, r: 4.2, main: false },
  { hx: 45, hy: -55, r: 4.2, main: false },
  { hx: 17, hy: -50, r: 4,   main: false },
];

// chifre + diadema (aro de ouro na base — Ap 13:1)
function crownedHorn(g: G, bx: number, by: number, dx: number, dy: number, w: number): void {
  g.fillStyle = HORN_C;
  horn(g, bx, by, dx, dy, w);
  g.strokeStyle = "#e8b04b"; g.lineWidth = w * 0.9;
  g.beginPath(); g.arc(bx + dx * 0.18, by + dy * 0.18, w * 1.5, 0, TAU); g.stroke();
  g.fillStyle = "#ffd989";
  g.beginPath(); g.arc(bx + dx * 0.18 - w, by + dy * 0.18 - w * 0.6, w * 0.45, 0, TAU); g.fill();
}

// cabeça leonina (boca de leão) — usada pelas 7 cabeças da besta
function drawBeastHead(g: G, hx: number, hy: number, r: number, main: boolean, c0: string, c1: string, c2: string): void {
  // juba atrás
  g.fillStyle = c2;
  g.beginPath(); g.ellipse(hx - r * 0.18, hy, r * 1.2, r * 1.08, 0, 0, TAU); g.fill();
  // crânio + luz
  g.fillStyle = c1;
  g.beginPath(); g.ellipse(hx + r * 0.1, hy, r * 0.92, r * 0.8, 0, 0, TAU); g.fill();
  g.fillStyle = c0;
  g.beginPath(); g.ellipse(hx, hy - r * 0.34, r * 0.6, r * 0.28, 0, 0, TAU); g.fill();
  // focinho de leão
  g.fillStyle = c0;
  rr(g, hx + r * 0.42, hy - r * 0.24, r * 1.05, r * 0.6, r * 0.26); g.fill();
  // boca ABERTA (goela escura + dentes)
  g.fillStyle = "#33100a";
  g.beginPath();
  g.moveTo(hx + r * 0.58, hy + r * 0.26);
  g.lineTo(hx + r * 1.48, hy + r * 0.16);
  g.lineTo(hx + r * 1.32, hy + r * 0.62);
  g.closePath(); g.fill();
  g.fillStyle = "#f2ead8";
  g.beginPath(); g.moveTo(hx + r * 0.78, hy + r * 0.26); g.lineTo(hx + r * 0.9, hy + r * 0.46); g.lineTo(hx + r * 1.02, hy + r * 0.24); g.closePath(); g.fill();
  g.beginPath(); g.moveTo(hx + r * 1.12, hy + r * 0.22); g.lineTo(hx + r * 1.24, hy + r * 0.42); g.lineTo(hx + r * 1.34, hy + r * 0.2); g.closePath(); g.fill();
  // mandíbula inferior
  g.fillStyle = c1;
  rr(g, hx + r * 0.5, hy + r * 0.52, r * 0.9, r * 0.3, r * 0.15); g.fill();
  // nariz
  g.fillStyle = "#33100a";
  g.beginPath(); g.arc(hx + r * 1.4, hy - r * 0.06, r * 0.12, 0, TAU); g.fill();
  // olho âmbar com pupila
  g.fillStyle = "#ffd24a";
  g.beginPath(); g.ellipse(hx + r * 0.3, hy - r * 0.2, r * 0.2, r * 0.24, 0, 0, TAU); g.fill();
  g.fillStyle = "#1c0e06";
  g.beginPath(); g.arc(hx + r * 0.32, hy - r * 0.18, r * 0.09, 0, TAU); g.fill();
  // chifres com diademas: principal 4, menores 1 (total 10)
  if (main) {
    crownedHorn(g, hx - r * 0.42, hy - r * 0.66, -r * 0.5, -r * 0.9, r * 0.14);
    crownedHorn(g, hx + r * 0.08, hy - r * 0.76, -r * 0.2, -r * 1.05, r * 0.14);
    crownedHorn(g, hx - r * 0.76, hy - r * 0.34, -r * 0.65, -r * 0.48, r * 0.11);
    crownedHorn(g, hx + r * 0.46, hy - r * 0.66, r * 0.18, -r * 0.9, r * 0.12);
  } else {
    crownedHorn(g, hx - r * 0.16, hy - r * 0.56, -r * 0.42, -r * 1, r * 0.17);
  }
}

// besta da terra (Ap 13:11): menor, 2 chifres como cordeiro, falsa-mansa
function drawEarthBeast(g: G, t: number, reduce: boolean): void {
  const breathe = reduce ? 0 : Math.sin(t * 0.0028) * 0.8;
  const bodyCy = -28 + breathe;
  softShadow(g, 2, 0, 28, 0.28);
  // cauda abaixada (mansidão aparente)
  g.strokeStyle = "#7a5c30"; g.lineWidth = 2.6; g.lineCap = "round";
  g.beginPath(); g.moveTo(-19, bodyCy + 4); g.quadraticCurveTo(-25, bodyCy + 12, -23, -3); g.stroke();
  // patas
  g.fillStyle = "#5e4620";
  rr(g, -16, -18, 5.5, 18, 2.4); g.fill();
  rr(g, -7, -19, 5.5, 19, 2.4); g.fill();
  rr(g, 5, -19, 5.5, 19, 2.4); g.fill();
  rr(g, 13, -18, 5.5, 18, 2.4); g.fill();
  g.fillStyle = "#3e2c10";
  rr(g, -17, -4, 7.5, 4, 1.8); g.fill();
  rr(g, 4, -4, 7.5, 4, 1.8); g.fill();
  // corpo terroso
  const eg = g.createLinearGradient(0, bodyCy - 12, 0, bodyCy + 12);
  eg.addColorStop(0, "#c8a468"); eg.addColorStop(0.6, "#9a7840"); eg.addColorStop(1, "#5e4620");
  g.fillStyle = eg;
  g.beginPath(); g.ellipse(-2, bodyCy, 20, 12, 0, 0, TAU); g.fill();
  // lombo com luz suave
  g.fillStyle = "rgba(255,240,200,0.25)";
  g.beginPath(); g.ellipse(-4, bodyCy - 7, 11, 3, -0.1, 0, TAU); g.fill();
  // pescoço + cabeça levemente inclinada (postura mansa)
  g.strokeStyle = "#9a7840"; g.lineWidth = 7; g.lineCap = "round";
  g.beginPath(); g.moveTo(12, bodyCy - 5); g.quadraticCurveTo(17, -42, 20, -48); g.stroke();
  const hx = 21, hy = -50 - breathe * 0.4;
  g.fillStyle = "#b08c50";
  g.beginPath(); g.ellipse(hx, hy, 6.8, 6, 0.1, 0, TAU); g.fill();
  g.fillStyle = "#c8a468";
  g.beginPath(); g.ellipse(hx - 1, hy - 2.2, 4.2, 2.2, 0, 0, TAU); g.fill();
  // focinho gentil, boca fechada em meio-sorriso
  g.fillStyle = "#d4b47c";
  rr(g, hx + 2.4, hy - 0.6, 6.4, 4.4, 2); g.fill();
  g.strokeStyle = "#6e5024"; g.lineWidth = 0.9; g.lineCap = "round";
  g.beginPath(); g.moveTo(hx + 4.4, hy + 2.6); g.quadraticCurveTo(hx + 6.4, hy + 3.6, hx + 8.2, hy + 2.6); g.stroke();
  g.fillStyle = "#3e2c10";
  g.beginPath(); g.arc(hx + 8, hy + 0.8, 0.6, 0, TAU); g.fill();
  // orelha
  g.fillStyle = "#9a7840";
  g.beginPath(); g.ellipse(hx - 4.6, hy - 3.6, 2, 1.2, -0.6, 0, TAU); g.fill();
  // olho dócil… com pupila em brasa (a mentira sutil)
  g.fillStyle = "#ffffff";
  g.beginPath(); g.ellipse(hx + 1.6, hy - 1.2, 1.7, 1.9, 0, 0, TAU); g.fill();
  g.fillStyle = "#c04a1e";
  g.beginPath(); g.arc(hx + 1.9, hy - 1, 0.85, 0, TAU); g.fill();
  g.fillStyle = "#2a0c04";
  g.beginPath(); g.arc(hx + 2, hy - 1, 0.4, 0, TAU); g.fill();
  // pálpebra caída (mansidão)
  g.strokeStyle = "rgba(60,36,12,0.7)"; g.lineWidth = 0.9;
  g.beginPath(); g.ellipse(hx + 1.6, hy - 1.5, 1.7, 1.9, 0, Math.PI * 1.1, Math.PI * 1.9); g.stroke();
  // DOIS chifres pequenos como de cordeiro (nós curvados)
  g.fillStyle = HORN_C;
  horn(g, hx - 2.2, hy - 5.2, -2.2, -3, 0.8);
  horn(g, hx + 1.2, hy - 5.6, -1.4, -3.6, 0.8);
}

function drawBeastHD(g: G, t: number, reduce: boolean, pal: string): void {
  if (pal === "terra") { drawEarthBeast(g, t, reduce); return; }
  const scarlet = pal === "escarlate";
  const C0 = scarlet ? "#e05648" : "#e6b957";
  const C1 = scarlet ? "#a82c26" : "#bd8a2e";
  const C2 = scarlet ? "#5c1210" : "#6e4c14";
  const SPOT = scarlet ? "#480e0c" : "#4a3208";
  const breathe = reduce ? 0 : Math.sin(t * 0.0028) * 1;
  const bodyCy = -36 + breathe;

  softShadow(g, 2, 0, 38, 0.3);

  // cauda de leopardo erguida
  g.strokeStyle = C1; g.lineWidth = 3; g.lineCap = "round";
  g.beginPath();
  g.moveTo(-26, bodyCy + 2);
  g.quadraticCurveTo(-36, bodyCy - 2, -37, bodyCy - 16 - breathe);
  g.stroke();
  g.fillStyle = SPOT;
  g.beginPath(); g.arc(-37, bodyCy - 17 - breathe, 2, 0, TAU); g.fill();

  // pés de URSO: patas grossas com garras
  const paw = (dx: number, far: boolean) => {
    g.fillStyle = far ? "#3a2612" : "#4a3018";
    rr(g, dx - 3.2, -20, 6.5, 20, 3); g.fill();
    g.fillStyle = far ? "#2a1a0a" : "#33200c";
    rr(g, dx - 4.6, -4.6, 10, 5, 2.2); g.fill();
    g.fillStyle = HORN_C;
    for (let i = 0; i < 3; i++) {
      const cx = dx + 1 + i * 1.9;
      g.beginPath(); g.moveTo(cx, -1); g.lineTo(cx + 0.9, -3); g.lineTo(cx + 1.8, -1); g.closePath(); g.fill();
    }
  };
  paw(-16, true); paw(10, true);
  paw(-21, false); paw(15, false);

  // corpo de LEOPARDO com gradiente
  const bg = g.createLinearGradient(0, bodyCy - 16, 0, bodyCy + 16);
  bg.addColorStop(0, C0); bg.addColorStop(0.6, C1); bg.addColorStop(1, C2);
  g.fillStyle = bg;
  g.beginPath(); g.ellipse(-3, bodyCy, 27, 15.5, 0, 0, TAU); g.fill();
  // peito iluminado
  g.fillStyle = "rgba(255,240,200,0.22)";
  g.beginPath(); g.ellipse(12, bodyCy + 4, 8, 9, 0.3, 0, TAU); g.fill();
  // MANCHAS (rosetas)
  g.lineWidth = 1.2;
  for (let i = 0; i < BEAST_SPOTS.length; i++) {
    const sp = BEAST_SPOTS[i];
    g.strokeStyle = SPOT;
    g.beginPath(); g.arc(-3 + sp[0], bodyCy + sp[1], 2.2, 0, TAU); g.stroke();
    g.fillStyle = SPOT;
    g.beginPath(); g.arc(-3 + sp[0], bodyCy + sp[1], 0.8, 0, TAU); g.fill();
  }

  // sela (escarlate — a mulher de Ap 17 monta nela)
  if (scarlet) {
    const sg = g.createLinearGradient(0, bodyCy - 21, 0, bodyCy - 9);
    sg.addColorStop(0, "#8a2040"); sg.addColorStop(1, "#400c1a");
    g.fillStyle = sg;
    rr(g, -15, bodyCy - 21, 21, 10, 4); g.fill();
    g.strokeStyle = "#e8b04b"; g.lineWidth = 1.2;
    rr(g, -15, bodyCy - 21, 21, 10, 4); g.stroke();
    // arção (apoio) + cinta descendo o flanco
    g.fillStyle = "#ffd989";
    g.beginPath(); g.arc(4.5, bodyCy - 21.5, 1.6, 0, TAU); g.fill();
    g.strokeStyle = "#5a3c14"; g.lineWidth = 2;
    g.beginPath(); g.moveTo(-5, bodyCy - 11); g.quadraticCurveTo(-6, bodyCy + 2, -5, bodyCy + 14); g.stroke();
  }

  // 7 pescoços + cabeças leoninas (principal por último)
  const nbx = 13, nby = bodyCy - 7;
  g.lineCap = "round";
  for (let i = BEAST_HEADS.length - 1; i >= 0; i--) {
    const h = BEAST_HEADS[i];
    const nod = reduce ? 0 : Math.sin(t * 0.0031 + i * 1.9) * 1.5;
    const hy = h.hy + nod;
    g.strokeStyle = i % 2 === 0 ? C1 : C2;
    g.lineWidth = h.r * (h.main ? 0.95 : 0.85);
    g.beginPath();
    g.moveTo(nbx, nby);
    g.quadraticCurveTo((nbx + h.hx) / 2 - 3, (nby + hy) / 2 - 5, h.hx - h.r * 0.2, hy + h.r * 0.35);
    g.stroke();
    drawBeastHead(g, h.hx, hy, h.r, h.main, C0, C1, C2);
  }
}

// ============================================================================
// CORDEIRO — "como que imolado", digno e luminoso (Ap 5)
// ============================================================================

const LAMB_LEGS: readonly number[] = [-7, -3.4, 2.4, 6.2];
// flocos de lã: [dx, dy, r] relativos ao centro do corpo
const LAMB_WOOL: readonly (readonly [number, number, number])[] = [
  [-9, -4.5, 3], [-5.5, -6.2, 3.2], [-1.5, -6.8, 3.3], [2.8, -6.4, 3.1],
  [6.4, -5, 2.8], [-10.5, -0.5, 2.7], [8.2, -1.5, 2.6], [-7, 5, 2.6], [3, 5.6, 2.7],
];

function drawLambHD(g: G, t: number, reduce: boolean): void {
  // auréola de glória PULSANTE — sempre presente (dignidade)
  const pulse = reduce ? 0.75 : 0.68 + Math.sin(t * 0.0042) * 0.22;
  glowCircle(g, 0, -15, 26, "#fff3cc", 0.55 * pulse);
  softShadow(g, 0, 0, 13, 0.22);
  const bob = reduce ? 0 : Math.sin(t * 0.003) * 0.5;

  // pernas finas + cascos
  for (let i = 0; i < LAMB_LEGS.length; i++) {
    const dx = LAMB_LEGS[i];
    g.fillStyle = "#c2b494";
    rr(g, dx - 0.95, -7.5, 1.9, 7.5, 0.9); g.fill();
    g.fillStyle = "#8a7a58";
    rr(g, dx - 1.15, -1.7, 2.3, 1.7, 0.6); g.fill();
  }

  // corpo de lã branca-dourada
  const wg = g.createLinearGradient(0, -21 + bob, 0, -6);
  wg.addColorStop(0, "#fefaf0"); wg.addColorStop(0.6, "#efe5cc"); wg.addColorStop(1, "#c9ba98");
  g.fillStyle = wg;
  g.beginPath(); g.ellipse(-1, -13.5 + bob, 10.8, 7, 0, 0, TAU); g.fill();
  // flocos de lã (volume)
  for (let i = 0; i < LAMB_WOOL.length; i++) {
    const wl = LAMB_WOOL[i];
    g.fillStyle = wl[1] > 2 ? "#d6c8a6" : "#faf4e2";
    g.beginPath(); g.arc(-1 + wl[0], -13.5 + bob + wl[1], wl[2], 0, TAU); g.fill();
  }
  // cauda pequenina
  g.fillStyle = "#efe5cc";
  g.beginPath(); g.arc(-11.5, -15 + bob, 1.9, 0, TAU); g.fill();

  // peito/pescoço de lã subindo até a cabeça
  g.fillStyle = "#f6efdc";
  g.beginPath(); g.arc(6.4, -17.5 + bob, 3.5, 0, TAU); g.fill();

  // marca/ferida sutil no peito ("como que imolado")
  g.strokeStyle = "rgba(150,42,40,0.7)"; g.lineWidth = 1; g.lineCap = "round";
  g.beginPath(); g.moveTo(7.2, -15); g.lineTo(7.9, -12.8); g.stroke();
  g.fillStyle = "rgba(150,42,40,0.45)";
  g.beginPath(); g.arc(7.9, -12.4, 0.55, 0, TAU); g.fill();

  // cabeça ERGUIDA (dignidade)
  const hx = 9.5, hy = -21 + bob;
  g.fillStyle = "#f0e6d0";
  g.beginPath(); g.ellipse(hx, hy, 3.4, 3.9, 0.12, 0, TAU); g.fill();
  g.fillStyle = "#d6c8a8";
  g.beginPath(); g.ellipse(hx + 0.4, hy + 1.8, 2.4, 1.6, 0.12, 0, TAU); g.fill();
  // orelhas
  g.fillStyle = "#e2d6bc";
  g.beginPath(); g.ellipse(hx - 2.6, hy - 1.8, 2, 0.95, -0.7, 0, TAU); g.fill();
  g.beginPath(); g.ellipse(hx + 2.2, hy - 2.2, 1.7, 0.85, 0.5, 0, TAU); g.fill();
  // topete de lã
  g.fillStyle = "#faf4e2";
  g.beginPath(); g.arc(hx - 1.2, hy - 3.2, 1.5, 0, TAU); g.fill();
  g.beginPath(); g.arc(hx + 0.6, hy - 3.5, 1.3, 0, TAU); g.fill();
  // olho sereno com brilho
  g.fillStyle = "#241608";
  g.beginPath(); g.ellipse(hx + 1.1, hy - 0.5, 0.75, 0.85, 0, 0, TAU); g.fill();
  g.fillStyle = "#ffffff";
  g.beginPath(); g.arc(hx + 0.85, hy - 0.8, 0.28, 0, TAU); g.fill();
  // focinho: narina + boca calma
  g.strokeStyle = "#8a7458"; g.lineWidth = 0.7; g.lineCap = "round";
  g.beginPath(); g.moveTo(hx + 2.9, hy + 1); g.quadraticCurveTo(hx + 3.4, hy + 1.8, hx + 2.7, hy + 2.3); g.stroke();

  // SETE pontinhos de chifres estilizados (discretos, dourados) no alto
  for (let i = 0; i < 7; i++) {
    const ang = Math.PI + ((i + 0.5) / 7) * Math.PI;
    const cx = hx + Math.cos(ang) * 4.1;
    const cy = hy + Math.sin(ang) * 4.4;
    const tw = reduce ? 0.7 : Math.sin(t * 0.006 + i * 1.4) * 0.5 + 0.5;
    g.fillStyle = tw > 0.55 ? "#ffd989" : "#e8b04b";
    g.beginPath(); g.arc(cx, cy, 0.7, 0, TAU); g.fill();
  }
}

// ============================================================================
// SERVIVENTE — ser vivente celestial: 6 asas cheias de olhos (Ap 4)
// ============================================================================

interface WingLayer { dy: number; len: number; rise: number; c: string; e: string }
const WING_LAYERS: readonly WingLayer[] = [
  { dy: -38, len: 27, rise: 16, c: "#f2d88e", e: "#b08a30" },
  { dy: -30, len: 23, rise: 11, c: "#e2c070", e: "#9a7628" },
  { dy: -22, len: 19, rise: 6,  c: "#cca452", e: "#84621e" },
];
const WING_EYE_F: readonly number[] = [0.38, 0.62, 0.86];
const BODY_EYES: readonly (readonly [number, number])[] = [[-3, -36], [3.4, -31], [-2.6, -24], [3, -18]];

// rosto sugerido: 0 leão, 1 novilho, 2 homem, 3 águia
function livingFace(g: G, cy: number, kind: number): void {
  if (kind === 0) {
    // LEÃO: juba + focinho
    g.fillStyle = "#a06a1e";
    g.beginPath(); g.ellipse(0, cy, 6.4, 6, 0, 0, TAU); g.fill();
    g.fillStyle = "#d8a04c";
    g.beginPath(); g.arc(0, cy, 4.6, 0, TAU); g.fill();
    g.fillStyle = "#e8c894";
    g.beginPath(); g.ellipse(0, cy + 1.8, 2.5, 1.9, 0, 0, TAU); g.fill();
    g.fillStyle = "#5a3210";
    g.beginPath(); g.moveTo(-0.9, cy + 1); g.lineTo(0.9, cy + 1); g.lineTo(0, cy + 2); g.closePath(); g.fill();
    g.fillStyle = "#2a1a08";
    g.beginPath(); g.arc(-1.8, cy - 1, 0.65, 0, TAU); g.fill();
    g.beginPath(); g.arc(1.8, cy - 1, 0.65, 0, TAU); g.fill();
  } else if (kind === 1) {
    // NOVILHO: cabeça larga, chifres pequenos, focinho com narinas
    g.fillStyle = "#a87848";
    g.beginPath(); g.ellipse(0, cy, 5.6, 4.9, 0, 0, TAU); g.fill();
    g.strokeStyle = HORN_C; g.lineWidth = 1.4; g.lineCap = "round";
    g.beginPath(); g.moveTo(-3.6, cy - 3.4); g.quadraticCurveTo(-5.6, cy - 5.4, -4.6, cy - 6.8); g.stroke();
    g.beginPath(); g.moveTo(3.6, cy - 3.4); g.quadraticCurveTo(5.6, cy - 5.4, 4.6, cy - 6.8); g.stroke();
    g.fillStyle = "#d8b48c";
    rr(g, -2.9, cy + 0.6, 5.8, 3.4, 1.7); g.fill();
    g.fillStyle = "#5a3a1c";
    g.beginPath(); g.arc(-1.3, cy + 2.3, 0.5, 0, TAU); g.fill();
    g.beginPath(); g.arc(1.3, cy + 2.3, 0.5, 0, TAU); g.fill();
    g.fillStyle = "#241407";
    g.beginPath(); g.arc(-2.2, cy - 1.2, 0.7, 0, TAU); g.fill();
    g.beginPath(); g.arc(2.2, cy - 1.2, 0.7, 0, TAU); g.fill();
  } else if (kind === 2) {
    // HOMEM: rosto sereno
    g.fillStyle = "#e7b98a";
    g.beginPath(); g.arc(0, cy, 4.6, 0, TAU); g.fill();
    g.fillStyle = "#4a3018";
    g.beginPath(); g.arc(0, cy - 1.2, 4.6, Math.PI, TAU); g.fill();
    g.fillStyle = "#2a1a10";
    g.beginPath(); g.arc(-1.7, cy + 0.2, 0.6, 0, TAU); g.fill();
    g.beginPath(); g.arc(1.7, cy + 0.2, 0.6, 0, TAU); g.fill();
    g.strokeStyle = "#9a4a32"; g.lineWidth = 0.8; g.lineCap = "round";
    g.beginPath(); g.moveTo(-1.1, cy + 2.4); g.quadraticCurveTo(0, cy + 3.1, 1.1, cy + 2.4); g.stroke();
  } else {
    // ÁGUIA: penas claras + bico dourado
    g.fillStyle = "#e8dcc0";
    g.beginPath(); g.arc(0, cy, 4.6, 0, TAU); g.fill();
    g.strokeStyle = "#c8b890"; g.lineWidth = 0.8; g.lineCap = "round";
    g.beginPath(); g.moveTo(-2.4, cy - 4); g.lineTo(-3.2, cy - 5.6); g.stroke();
    g.beginPath(); g.moveTo(0, cy - 4.4); g.lineTo(0, cy - 6.2); g.stroke();
    g.beginPath(); g.moveTo(2.4, cy - 4); g.lineTo(3.2, cy - 5.6); g.stroke();
    g.fillStyle = "#e0a02e";
    g.beginPath(); g.moveTo(0.6, cy + 0.2); g.lineTo(5, cy + 1.6); g.lineTo(0.9, cy + 2.8); g.closePath(); g.fill();
    g.fillStyle = "#241407";
    g.beginPath(); g.arc(-1.4, cy - 0.6, 0.85, 0, TAU); g.fill();
    g.fillStyle = "#ffffff";
    g.beginPath(); g.arc(-1.7, cy - 0.9, 0.3, 0, TAU); g.fill();
  }
}

function drawLivingHD(g: G, t: number, reduce: boolean, seed: number): void {
  const bob = reduce ? 0 : Math.sin(t * 0.0035 + seed * 1.3) * 2.6; // flutua (flyIdle)
  // luz sob o ser (não toca o chão) + glória ao redor
  glowCircle(g, 0, -2, 14, "#ffe9b0", 0.28);
  glowCircle(g, 0, -28 + bob, 30, "#ffe9b0", 0.35 + (reduce ? 0 : Math.sin(t * 0.004) * 0.08));

  // ---- SEIS asas em camadas, CHEIAS DE OLHOS
  for (let si = 0; si < 2; si++) {
    const s = si * 2 - 1; // -1, 1
    for (let li = 0; li < 3; li++) {
      const L = WING_LAYERS[li];
      const flapW = reduce ? 0 : Math.sin(t * 0.006 + li * 0.9) * 3;
      const sy = L.dy + bob;
      const tipX = s * (5 + L.len);
      const tipY = sy - L.rise - flapW;
      g.beginPath();
      g.moveTo(s * 4, sy);
      g.quadraticCurveTo(s * (5 + L.len * 0.55), sy - L.rise * 1.15 - flapW, tipX, tipY);
      g.quadraticCurveTo(s * (5 + L.len * 0.8), sy + 4 - flapW * 0.4, s * (5 + L.len * 0.45), sy + 5);
      g.quadraticCurveTo(s * (5 + L.len * 0.2), sy + 6, s * 4, sy + 4);
      g.closePath();
      g.fillStyle = L.c; g.fill();
      g.strokeStyle = L.e; g.lineWidth = 0.9; g.stroke();
      // olhinhos nas penas (piscam fora de fase)
      for (let e = 0; e < 3; e++) {
        const f = WING_EYE_F[e];
        const exx = s * 4 * (1 - f) + tipX * f;
        const eyy = sy * (1 - f) + (tipY + 4.5) * f;
        const blink = !reduce && ((t * 0.001 + e * 1.7 + li * 2.3 + si * 3.1) % 4) < 0.18;
        g.fillStyle = "#fffbe8";
        g.beginPath(); g.ellipse(exx, eyy, 1.35, blink ? 0.3 : 1, 0, 0, TAU); g.fill();
        if (!blink) {
          g.fillStyle = "#3a2606";
          g.beginPath(); g.arc(exx, eyy, 0.55, 0, TAU); g.fill();
        }
      }
    }
  }

  // ---- corpo dourado luminoso
  const bgr = g.createLinearGradient(0, -42 + bob, 0, -8 + bob);
  bgr.addColorStop(0, "#f6dc96"); bgr.addColorStop(0.55, "#d9ae54"); bgr.addColorStop(1, "#8a6420");
  g.fillStyle = bgr;
  rr(g, -6.5, -42 + bob, 13, 32, 6.5); g.fill();
  // núcleo de luz
  g.fillStyle = "rgba(255,244,200,0.5)";
  g.beginPath(); g.ellipse(0, -30 + bob, 3.4, 9.5, 0, 0, TAU); g.fill();
  // olhos também no corpo
  for (let i = 0; i < BODY_EYES.length; i++) {
    const be = BODY_EYES[i];
    const blink = !reduce && ((t * 0.001 + i * 2.1) % 5) < 0.16;
    g.fillStyle = "#fffbe8";
    g.beginPath(); g.ellipse(be[0], be[1] + bob, 1.3, blink ? 0.28 : 1, 0, 0, TAU); g.fill();
    if (!blink) {
      g.fillStyle = "#3a2606";
      g.beginPath(); g.arc(be[0], be[1] + bob, 0.5, 0, TAU); g.fill();
    }
  }

  // ---- rosto sugerido (leão/novilho/homem/águia por instância — seed = x)
  const kind = ((Math.round(Math.abs(seed) * 0.13) % 4) + 4) % 4;
  livingFace(g, -46 + bob, kind);
  // auréola
  glowCircle(g, 0, -46 + bob, 9.5, "#fff6d8", 0.5);
}

// ============================================================================
// CAVALEIRO — os quatro cavaleiros (Ap 6): cavalo + cavaleiro por paleta
// ============================================================================

interface RiderPal { h0: string; h1: string; hd: string; mane: string; r0: string; r1: string }
const RIDER_PAL: Record<string, RiderPal> = {
  branco:   { h0: "#f2f3ec", h1: "#b8b4a2", hd: "#8e8a7a", mane: "#d8d4c4", r0: "#f8f9f4", r1: "#b9c0cc" },
  vermelho: { h0: "#c04038", h1: "#661614", hd: "#4a100e", mane: "#380e0c", r0: "#8a2c26", r1: "#440e0c" },
  preto:    { h0: "#3c3c46", h1: "#14141a", hd: "#0a0a0e", mane: "#08080a", r0: "#2e2e38", r1: "#0e0e14" },
  amarelo:  { h0: "#c2c294", h1: "#70704c", hd: "#54543a", mane: "#8a8a62", r0: "#3c3c44", r1: "#16161c" },
};

function drawHorsemanHD(g: G, t: number, reduce: boolean, pal: string): void {
  const P = RIDER_PAL[pal] ?? RIDER_PAL.branco;
  const pale = pal === "amarelo";
  const ph = t * 0.011;
  const bounce = reduce ? 0 : Math.abs(Math.sin(ph)) * 1.2;
  const bodyCy = -26 - bounce * 0.5;

  softShadow(g, 0, 0, 26, 0.3);

  // ---- cauda esvoaçante (atrás)
  const tailSway = reduce ? 0 : Math.sin(t * 0.004) * 1.6;
  g.strokeStyle = P.mane; g.lineWidth = 1.8; g.lineCap = "round";
  for (let i = 0; i < 3; i++) {
    g.beginPath();
    g.moveTo(-20, bodyCy - 3 + i * 1.6);
    g.quadraticCurveTo(-27 - i, bodyCy + 2 + i * 2 + tailSway, -29 - i * 1.4, bodyCy + 12 + i * 2.2 + tailSway);
    g.stroke();
  }

  // ---- pernas em trote animado (par distante mais escuro)
  const leg = (dx: number, phase: number, far: boolean) => {
    const swing = reduce ? 0 : Math.sin(ph + phase) * 4;
    const lift = reduce ? 0 : Math.max(0, Math.sin(ph + phase)) * 2.2;
    g.strokeStyle = far ? P.hd : P.h1;
    g.lineWidth = 3.2; g.lineCap = "round";
    g.beginPath();
    g.moveTo(dx, bodyCy + 6);
    g.quadraticCurveTo(dx + swing * 0.4, -12, dx + swing, -2 - lift);
    g.stroke();
    g.fillStyle = "#26201a";
    g.beginPath(); g.ellipse(dx + swing, -1.3 - lift, 2, 1.3, 0, 0, TAU); g.fill();
  };
  leg(-12, Math.PI, true); leg(12, 0, true);
  leg(-15, 0, false); leg(15, Math.PI, false);

  // ---- corpo do cavalo
  const hg = g.createLinearGradient(0, bodyCy - 10, 0, bodyCy + 10);
  hg.addColorStop(0, P.h0); hg.addColorStop(0.6, P.h1); hg.addColorStop(1, P.hd);
  g.fillStyle = hg;
  g.beginPath(); g.ellipse(-2, bodyCy, 19.5, 10, -0.04, 0, TAU); g.fill();
  // brilho no lombo
  g.fillStyle = "rgba(255,255,255,0.22)";
  g.beginPath(); g.ellipse(-6, bodyCy - 6, 9, 2.4, -0.08, 0, TAU); g.fill();
  // cavalo amarelo-pálido: costelas insinuadas (magreza)
  if (pale) {
    g.strokeStyle = "rgba(30,30,22,0.3)"; g.lineWidth = 1;
    g.beginPath(); g.moveTo(-9, bodyCy - 5); g.quadraticCurveTo(-7.5, bodyCy, -9, bodyCy + 5); g.stroke();
    g.beginPath(); g.moveTo(-4, bodyCy - 6); g.quadraticCurveTo(-2.5, bodyCy, -4, bodyCy + 6); g.stroke();
  }

  // ---- pescoço + cabeça
  g.fillStyle = P.h0;
  g.beginPath();
  g.moveTo(8, bodyCy - 4);
  g.quadraticCurveTo(14, bodyCy - 8, 17, -44 - bounce * 0.4);
  g.lineTo(23, -44 - bounce * 0.4);
  g.quadraticCurveTo(19, bodyCy - 7, 15, bodyCy + 1);
  g.closePath(); g.fill();
  // sombra do pescoço
  g.strokeStyle = P.h1; g.lineWidth = 1.2;
  g.beginPath(); g.moveTo(17.5, -42); g.quadraticCurveTo(15.5, bodyCy - 8, 13, bodyCy - 1); g.stroke();
  const hdy = -45.5 - bounce * 0.4;
  g.fillStyle = P.h0;
  g.beginPath(); g.ellipse(21.5, hdy, 4.8, 3.5, 0.5, 0, TAU); g.fill();
  rr(g, 23.5, hdy - 1.4, 6, 3.6, 1.7); g.fill();
  // focinho sombreado + narina
  g.fillStyle = P.h1;
  rr(g, 27.5, hdy - 0.8, 2.2, 2.8, 1.1); g.fill();
  g.fillStyle = "#26201a";
  g.beginPath(); g.arc(28.4, hdy + 0.6, 0.55, 0, TAU); g.fill();
  // olho + orelhas
  g.fillStyle = "#1a120c";
  g.beginPath(); g.ellipse(21.8, hdy - 1.2, 0.9, 1.05, 0, 0, TAU); g.fill();
  g.fillStyle = "#ffffff";
  g.beginPath(); g.arc(21.5, hdy - 1.6, 0.3, 0, TAU); g.fill();
  g.fillStyle = P.h1;
  g.beginPath(); g.moveTo(18, hdy - 3); g.lineTo(19.2, hdy - 6.2); g.lineTo(20.6, hdy - 3.2); g.closePath(); g.fill();
  g.beginPath(); g.moveTo(21, hdy - 3.4); g.lineTo(22.4, hdy - 6); g.lineTo(23.4, hdy - 3); g.closePath(); g.fill();
  // rédea
  g.strokeStyle = "#6a5238"; g.lineWidth = 0.8;
  g.beginPath(); g.moveTo(27, hdy + 1.6); g.quadraticCurveTo(16, -42, 6, -44); g.stroke();

  // ---- crina ao vento
  const maneSway = reduce ? 0 : Math.sin(t * 0.0045) * 1.2;
  g.strokeStyle = P.mane; g.lineWidth = 2; g.lineCap = "round";
  for (let i = 0; i < 4; i++) {
    g.beginPath();
    g.moveTo(17 - i * 0.4, -46 + i * 4.2);
    g.quadraticCurveTo(12 - i, -44 + i * 4.4 + maneSway, 10.5 - i * 1.1, -40 + i * 4.6 + maneSway);
    g.stroke();
  }
  // topete
  g.beginPath(); g.moveTo(19.5, hdy - 3.4); g.quadraticCurveTo(16.5, hdy - 5, 15.5, hdy - 2.4); g.stroke();

  // ---- cavaleiro montado
  const ry = -37 - bounce * 0.4; // quadril
  // perna visível sobre o flanco
  g.strokeStyle = P.r1; g.lineWidth = 3; g.lineCap = "round";
  g.beginPath(); g.moveTo(0, ry + 1); g.quadraticCurveTo(5, ry + 8, 4, ry + 15); g.stroke();
  g.fillStyle = "#1c1610";
  g.beginPath(); g.ellipse(4.4, ry + 15.6, 2, 1.2, 0.2, 0, TAU); g.fill();
  // torso com gradiente
  const rg = g.createLinearGradient(0, ry - 16, 0, ry + 2);
  rg.addColorStop(0, P.r0); rg.addColorStop(1, P.r1);
  g.fillStyle = rg;
  rr(g, -6.2, ry - 15.5, 10.8, 16.5, 4.4); g.fill();
  // cinto
  g.fillStyle = "rgba(0,0,0,0.28)";
  rr(g, -6, ry - 3.2, 10.4, 2, 1); g.fill();
  // braço traseiro segurando a rédea
  g.strokeStyle = P.r1; g.lineWidth = 2.8;
  g.beginPath(); g.moveTo(-3.5, ry - 12); g.quadraticCurveTo(2, ry - 9, 6.5, ry - 7.5); g.stroke();
  g.fillStyle = "#e7b98a";
  g.beginPath(); g.arc(6.8, ry - 7.4, 1.4, 0, TAU); g.fill();

  const heady = ry - 18.5;
  if (pale) {
    // ---- MORTE: figura esquelética encapuzada com FOICE
    // foice (atrás do corpo)
    g.strokeStyle = "#6e5e40"; g.lineWidth = 1.6; g.lineCap = "round";
    g.beginPath(); g.moveTo(-3, ry + 8); g.lineTo(9.5, heady - 11); g.stroke();
    const bl = g.createLinearGradient(9, heady - 13, 24, heady - 3);
    bl.addColorStop(0, "#d8dde4"); bl.addColorStop(1, "#8a9098");
    g.fillStyle = bl;
    g.beginPath();
    g.moveTo(9.5, heady - 11);
    g.quadraticCurveTo(20, heady - 10.5, 24.5, heady - 2);
    g.quadraticCurveTo(18.5, heady - 7, 9.8, heady - 8.6);
    g.closePath(); g.fill();
    // braço na haste
    g.strokeStyle = P.r1; g.lineWidth = 2.8;
    g.beginPath(); g.moveTo(-3.5, ry - 12); g.quadraticCurveTo(1, ry - 12, 4.2, ry - 14.5); g.stroke();
    g.fillStyle = "#cfd2c8";
    g.beginPath(); g.arc(4.6, ry - 14.8, 1.3, 0, TAU); g.fill();
    // capuz sombrio
    g.fillStyle = "#2e2e36";
    g.beginPath();
    g.moveTo(-5.6, heady + 3.5);
    g.quadraticCurveTo(-6.4, heady - 5.5, 0, heady - 6.2);
    g.quadraticCurveTo(6, heady - 5.2, 4.8, heady + 3.2);
    g.quadraticCurveTo(0, heady + 5.4, -5.6, heady + 3.5);
    g.closePath(); g.fill();
    // rosto cadavérico na sombra
    g.fillStyle = "#cfd2c8";
    g.beginPath(); g.ellipse(0.4, heady + 0.2, 2.6, 3, 0, 0, TAU); g.fill();
    g.fillStyle = "#16161c";
    g.beginPath(); g.arc(-0.4, heady - 0.4, 0.8, 0, TAU); g.fill();
    g.beginPath(); g.arc(1.6, heady - 0.4, 0.8, 0, TAU); g.fill();
    g.strokeStyle = "#16161c"; g.lineWidth = 0.6;
    g.beginPath(); g.moveTo(-0.6, heady + 1.8); g.lineTo(1.8, heady + 1.8); g.stroke();
  } else {
    // ---- cabeça humana
    const sk = g.createRadialGradient(-1, heady - 1.4, 0.5, 0, heady, 4.4);
    sk.addColorStop(0, "#f6d3a8"); sk.addColorStop(1, "#c8925c");
    g.fillStyle = sk;
    g.beginPath(); g.arc(0, heady, 4.1, 0, TAU); g.fill();
    g.fillStyle = pal === "vermelho" ? "#2a1208" : "#3a2616";
    g.beginPath(); g.arc(0, heady - 1, 4.1, Math.PI * 0.95, Math.PI * 2.05); g.fill();
    g.fillStyle = "#2a1a10";
    g.beginPath(); g.arc(1.6, heady + 0.4, 0.6, 0, TAU); g.fill();

    if (pal === "branco") {
      // COROA + ARCO
      g.fillStyle = "#e8b04b";
      rr(g, -3.4, heady - 6.4, 6.8, 2, 0.9); g.fill();
      g.fillStyle = "#ffd989";
      g.beginPath(); g.moveTo(-3, heady - 6.2); g.lineTo(-2.2, heady - 8.4); g.lineTo(-1.4, heady - 6.2); g.closePath(); g.fill();
      g.beginPath(); g.moveTo(-0.8, heady - 6.2); g.lineTo(0, heady - 8.8); g.lineTo(0.8, heady - 6.2); g.closePath(); g.fill();
      g.beginPath(); g.moveTo(1.4, heady - 6.2); g.lineTo(2.2, heady - 8.4); g.lineTo(3, heady - 6.2); g.closePath(); g.fill();
      // braço frontal + arco
      g.strokeStyle = P.r1; g.lineWidth = 2.8;
      g.beginPath(); g.moveTo(-2, ry - 12.5); g.quadraticCurveTo(3, ry - 13, 7, ry - 13.5); g.stroke();
      g.fillStyle = "#e7b98a";
      g.beginPath(); g.arc(7.4, ry - 13.6, 1.4, 0, TAU); g.fill();
      g.strokeStyle = "#8a6a3a"; g.lineWidth = 1.6;
      g.beginPath(); g.moveTo(10, ry - 22); g.quadraticCurveTo(16, ry - 13.5, 10, ry - 5); g.stroke();
      g.strokeStyle = "#e8e2d0"; g.lineWidth = 0.7;
      g.beginPath(); g.moveTo(10, ry - 22); g.lineTo(10, ry - 5); g.stroke();
      // flecha
      g.strokeStyle = "#6e5028"; g.lineWidth = 0.9;
      g.beginPath(); g.moveTo(2, ry - 13.5); g.lineTo(14.5, ry - 13.5); g.stroke();
      g.fillStyle = "#c7d0dc";
      g.beginPath(); g.moveTo(14.2, ry - 15); g.lineTo(17.5, ry - 13.5); g.lineTo(14.2, ry - 12); g.closePath(); g.fill();
    } else if (pal === "vermelho") {
      // ESPADA erguida
      g.strokeStyle = P.r1; g.lineWidth = 2.8;
      g.beginPath(); g.moveTo(-2, ry - 12.5); g.quadraticCurveTo(2, ry - 15, 5, ry - 19); g.stroke();
      g.fillStyle = "#e7b98a";
      g.beginPath(); g.arc(5.3, ry - 19.3, 1.4, 0, TAU); g.fill();
      const sw = g.createLinearGradient(5, ry - 20, 10, ry - 36);
      sw.addColorStop(0, "#aeb6c2"); sw.addColorStop(0.5, "#eef2f8"); sw.addColorStop(1, "#c7d0dc");
      g.strokeStyle = sw as unknown as string; g.lineWidth = 2.2; g.lineCap = "round";
      g.beginPath(); g.moveTo(5.8, ry - 21); g.lineTo(9.6, ry - 36); g.stroke();
      g.strokeStyle = "#ffffff"; g.lineWidth = 0.7;
      g.beginPath(); g.moveTo(6.6, ry - 22.5); g.lineTo(9.2, ry - 34); g.stroke();
      // guarda + punho
      g.strokeStyle = "#caa050"; g.lineWidth = 1.6;
      g.beginPath(); g.moveTo(3.8, ry - 20.6); g.lineTo(7.6, ry - 21.6); g.stroke();
      if (!reduce) glowCircle(g, 9.6, ry - 36, 4, "#fff3c0", 0.4 + Math.sin(t * 0.009) * 0.2);
    } else {
      // BALANÇA na mão (preto)
      g.strokeStyle = P.r1; g.lineWidth = 2.8;
      g.beginPath(); g.moveTo(-2, ry - 12.5); g.quadraticCurveTo(4, ry - 12, 8.5, ry - 11.5); g.stroke();
      g.fillStyle = "#e7b98a";
      g.beginPath(); g.arc(8.8, ry - 11.4, 1.4, 0, TAU); g.fill();
      const tilt = reduce ? 0 : Math.sin(t * 0.003) * 1;
      g.strokeStyle = "#d9a83e"; g.lineWidth = 1.1; g.lineCap = "round";
      // haste vertical + travessão
      g.beginPath(); g.moveTo(8.8, ry - 12.6); g.lineTo(8.8, ry - 16.5); g.stroke();
      g.beginPath(); g.moveTo(3.2, ry - 16.5 - tilt); g.lineTo(14.4, ry - 16.5 + tilt); g.stroke();
      // fios + pratos
      g.lineWidth = 0.6;
      g.beginPath(); g.moveTo(3.2, ry - 16.5 - tilt); g.lineTo(3.2, ry - 12.2 - tilt); g.stroke();
      g.beginPath(); g.moveTo(14.4, ry - 16.5 + tilt); g.lineTo(14.4, ry - 12.2 + tilt); g.stroke();
      g.fillStyle = "#b8862e";
      g.beginPath(); g.ellipse(3.2, ry - 11.8 - tilt, 2.5, 1.1, 0, 0, Math.PI); g.fill();
      g.beginPath(); g.ellipse(14.4, ry - 11.8 + tilt, 2.5, 1.1, 0, 0, Math.PI); g.fill();
      g.fillStyle = "#ffd989";
      g.beginPath(); g.arc(8.8, ry - 16.8, 0.7, 0, TAU); g.fill();
    }
  }
}

// ============================================================================
// MULTIDÃO — grande multidão com palmas, 3 camadas de profundidade (Ap 7)
// ============================================================================

const CROWD_B_X: readonly number[] = [-70, -58, -46, -34, -21, -9, 4, 17, 29, 42, 55, 67];
const CROWD_M_X: readonly number[] = [-63, -47, -32, -16, 0, 15, 31, 47, 62];
const CROWD_F_X: readonly number[] = [-54, -28, -3, 23, 49];
const CROWD_F_HAIR: readonly string[] = ["#2a1c10", "#4a3018", "#1a120a", "#5a3c1c", "#33241a"];

function drawCrowdHD(g: G, t: number, reduce: boolean): void {
  softShadow(g, 0, 0, 70, 0.18);

  // ---- camada de FUNDO: silhuetas (milhares insinuados)
  for (let i = 0; i < CROWD_B_X.length; i++) {
    const bx = CROWD_B_X[i];
    const vj = ((i * 13) % 5) - 2;
    const by = -13 + (i % 2) * 1.5;
    g.fillStyle = "#4a5878";
    rr(g, bx - 3.2, by - 14 + vj * 0.4, 6.4, 14, 3); g.fill();
    g.beginPath(); g.arc(bx, by - 16.4 + vj * 0.4, 2.6, 0, TAU); g.fill();
    // palma em silhueta
    g.strokeStyle = "#3f4c68"; g.lineWidth = 0.8; g.lineCap = "round";
    g.beginPath(); g.moveTo(bx + 2, by - 17); g.lineTo(bx + 3, by - 23 + vj * 0.3); g.stroke();
    g.fillStyle = "#3f4c68";
    g.beginPath(); g.ellipse(bx + 3, by - 24 + vj * 0.3, 2.2, 1.3, 0.3, 0, TAU); g.fill();
  }

  // ---- camada do MEIO: semi-detalhe
  for (let i = 0; i < CROWD_M_X.length; i++) {
    const mx = CROWD_M_X[i] + ((i * 7) % 3) - 1;
    const my = -6.5;
    const sway = reduce ? 0 : Math.sin(t * 0.0038 + i * 1.1) * 0.9;
    g.fillStyle = "#96a2be";
    g.beginPath();
    g.moveTo(mx - 4, my - 18);
    g.quadraticCurveTo(mx, my - 20, mx + 4, my - 18);
    g.lineTo(mx + 5.4, my);
    g.quadraticCurveTo(mx, my + 1, mx - 5.4, my);
    g.closePath(); g.fill();
    g.fillStyle = "#c2a480";
    g.beginPath(); g.arc(mx, my - 21, 3, 0, TAU); g.fill();
    g.fillStyle = "#3c2c1c";
    g.beginPath(); g.arc(mx, my - 22, 3, Math.PI, TAU); g.fill();
    // palma semi-detalhe
    g.strokeStyle = "#41703c"; g.lineWidth = 1; g.lineCap = "round";
    g.beginPath(); g.moveTo(mx + 3.4, my - 22); g.lineTo(mx + 4.6 + sway, my - 30); g.stroke();
    g.strokeStyle = "#578a4c"; g.lineWidth = 1;
    g.beginPath(); g.moveTo(mx + 4.6 + sway, my - 30); g.lineTo(mx + 2 + sway, my - 33); g.stroke();
    g.beginPath(); g.moveTo(mx + 4.6 + sway, my - 30); g.lineTo(mx + 7.2 + sway, my - 33); g.stroke();
    g.beginPath(); g.moveTo(mx + 4.6 + sway, my - 30); g.lineTo(mx + 4.6 + sway, my - 34); g.stroke();
  }

  // ---- camada da FRENTE: 5 figuras detalhadas, vestes brancas + palmas
  const fg = g.createLinearGradient(0, -32, 0, 0);
  fg.addColorStop(0, "#ffffff"); fg.addColorStop(1, "#c2c9da");
  for (let i = 0; i < CROWD_F_X.length; i++) {
    const fx = CROWD_F_X[i] + ((i * 17) % 3) - 1;
    const sway = reduce ? 0 : Math.sin(t * 0.0042 + i * 1.4) * 1.5;
    // túnica branca com caimento
    g.fillStyle = fg;
    g.beginPath();
    g.moveTo(fx - 5, -23);
    g.quadraticCurveTo(fx, -25.5, fx + 5, -23);
    g.quadraticCurveTo(fx + 6.8, -12, fx + 7.6, 0);
    g.quadraticCurveTo(fx, 1.4, fx - 7.6, 0);
    g.quadraticCurveTo(fx - 6.8, -12, fx - 5, -23);
    g.closePath(); g.fill();
    // dobras suaves
    g.strokeStyle = "rgba(40,50,80,0.16)"; g.lineWidth = 0.9; g.lineCap = "round";
    g.beginPath(); g.moveTo(fx - 2, -16); g.quadraticCurveTo(fx - 2.8, -8, fx - 2, -1.5); g.stroke();
    g.beginPath(); g.moveTo(fx + 2.4, -15); g.quadraticCurveTo(fx + 3, -7, fx + 2.6, -1.5); g.stroke();
    // braços ERGUIDOS
    g.strokeStyle = "#e8ecf4"; g.lineWidth = 2.6;
    g.beginPath(); g.moveTo(fx - 4, -21); g.quadraticCurveTo(fx - 6, -26, fx - 6.6, -30 + sway * 0.4); g.stroke();
    g.beginPath(); g.moveTo(fx + 4, -21); g.quadraticCurveTo(fx + 6, -27, fx + 6.6, -31 - sway * 0.4); g.stroke();
    g.fillStyle = "#e7b98a";
    g.beginPath(); g.arc(fx - 6.7, -30.4 + sway * 0.4, 1.3, 0, TAU); g.fill();
    g.beginPath(); g.arc(fx + 6.7, -31.4 - sway * 0.4, 1.3, 0, TAU); g.fill();
    // cabeça + cabelo + rosto
    g.fillStyle = "#e7b98a";
    g.beginPath(); g.arc(fx, -27.5, 4, 0, TAU); g.fill();
    g.fillStyle = "#c8925c";
    g.beginPath(); g.arc(fx, -26.2, 4, 0.25, Math.PI - 0.25); g.fill();
    g.fillStyle = "#e7b98a";
    g.beginPath(); g.arc(fx, -27.7, 3.4, 0, TAU); g.fill();
    g.fillStyle = CROWD_F_HAIR[i];
    g.beginPath(); g.arc(fx, -28.4, 4, Math.PI * 0.92, Math.PI * 2.08); g.fill();
    g.fillStyle = "#2a1a10";
    g.beginPath(); g.arc(fx - 1.4, -27.2, 0.55, 0, TAU); g.fill();
    g.beginPath(); g.arc(fx + 1.4, -27.2, 0.55, 0, TAU); g.fill();
    g.strokeStyle = "#9a4a32"; g.lineWidth = 0.7; g.lineCap = "round";
    g.beginPath(); g.moveTo(fx - 1, -25); g.quadraticCurveTo(fx, -24.3, fx + 1, -25); g.stroke();
    // PALMA na mão erguida, balançando
    const px2 = fx + 7 + sway, py2 = -33 - sway * 0.4;
    g.strokeStyle = "#4c7a3c"; g.lineWidth = 1.1;
    g.beginPath(); g.moveTo(fx + 6.7, -31.4 - sway * 0.4); g.lineTo(px2, py2 - 8); g.stroke();
    for (let f = 0; f < 5; f++) {
      const fa = -1.15 + f * 0.55;
      g.strokeStyle = f % 2 === 0 ? "#5f9a54" : "#71b062";
      g.lineWidth = 1.15;
      g.beginPath();
      g.moveTo(px2, py2 - 7);
      g.quadraticCurveTo(px2 + Math.sin(fa) * 3.4, py2 - 9.5 - Math.cos(fa) * 2.4, px2 + Math.sin(fa) * 6, py2 - 8.5 - Math.cos(fa) * 5);
      g.stroke();
    }
  }
}

// ============================================================================
// MULHER — vestida de sol, lua sob os pés, coroa de 12 estrelas (Ap 12)
// ============================================================================

function drawWomanHD(g: G, t: number, reduce: boolean): void {
  const pulse = reduce ? 0.5 : 0.5 + Math.sin(t * 0.0038) * 0.12;
  // ---- raios de sol irradiando do vestido
  const rot = reduce ? 0 : t * 0.0003;
  g.save();
  g.globalAlpha *= 0.32;
  g.strokeStyle = "#ffd98a"; g.lineWidth = 1.5; g.lineCap = "round";
  for (let i = 0; i < 14; i++) {
    const ang = rot + (i / 14) * TAU;
    const len = i % 2 === 0 ? 27 : 20;
    g.beginPath();
    g.moveTo(Math.cos(ang) * 10, -24 + Math.sin(ang) * 9);
    g.lineTo(Math.cos(ang) * len, -24 + Math.sin(ang) * len * 0.9);
    g.stroke();
  }
  g.restore();
  glowCircle(g, 0, -24, 33, "#ffe9b0", pulse);

  // ---- vestido irradiando dourado
  const dg = g.createLinearGradient(0, -36, 0, 0);
  dg.addColorStop(0, "#fff4c8"); dg.addColorStop(0.55, "#e8b957"); dg.addColorStop(1, "#a8751f");
  g.fillStyle = dg;
  g.beginPath();
  g.moveTo(-5.5, -33);
  g.quadraticCurveTo(0, -36.5, 5.5, -33);
  g.quadraticCurveTo(8.5, -20, 11.5, -1);
  g.quadraticCurveTo(0, 2, -11.5, -1);
  g.quadraticCurveTo(-8.5, -20, -5.5, -33);
  g.closePath(); g.fill();
  // faixas de luz descendo o tecido
  g.save();
  g.globalAlpha *= 0.3;
  g.strokeStyle = "#ffffff"; g.lineWidth = 1.3; g.lineCap = "round";
  g.beginPath(); g.moveTo(-3.4, -28); g.quadraticCurveTo(-5.4, -14, -6.4, -2.5); g.stroke();
  g.beginPath(); g.moveTo(4, -27); g.quadraticCurveTo(6.2, -14, 7.4, -2.5); g.stroke();
  g.restore();
  // cinta alta dourada
  g.fillStyle = "#e8b04b";
  rr(g, -5.6, -27.2, 11.2, 2.2, 1); g.fill();
  g.fillStyle = "#ffd989";
  rr(g, -5.6, -27.2, 11.2, 0.9, 0.45); g.fill();
  // GRÁVIDA sutil (Ap 12:2): ventre arredondado com luz
  g.fillStyle = "rgba(255,255,255,0.3)";
  g.beginPath(); g.ellipse(1.6, -19.5, 3.7, 4.7, 0.06, 0, TAU); g.fill();
  g.strokeStyle = "rgba(120,80,20,0.35)"; g.lineWidth = 0.9; g.lineCap = "round";
  g.beginPath(); g.moveTo(-2.4, -15.5); g.quadraticCurveTo(1.8, -13.6, 5.2, -16); g.stroke();

  // ---- braços: mão pousada no ventre (maternal) + mão aberta
  g.strokeStyle = "#e0b45a"; g.lineWidth = 3; g.lineCap = "round";
  g.beginPath(); g.moveTo(5, -31); g.quadraticCurveTo(7.4, -26, 2.6, -20.5); g.stroke();
  g.beginPath(); g.moveTo(-5, -31); g.quadraticCurveTo(-8, -26.5, -8.6, -22.5); g.stroke();
  g.fillStyle = "#e7b98a";
  g.beginPath(); g.arc(2.2, -20.2, 1.4, 0, TAU); g.fill();
  g.beginPath(); g.arc(-8.8, -22.2, 1.4, 0, TAU); g.fill();

  // ---- cabelo escuro (massa de trás, antes do rosto)
  g.fillStyle = "#2c1a10";
  g.beginPath();
  g.moveTo(-5.4, -41);
  g.quadraticCurveTo(-7, -33, -5.6, -27);
  g.quadraticCurveTo(-3.4, -29, -3.8, -35);
  g.closePath(); g.fill();
  g.beginPath();
  g.moveTo(5.4, -41);
  g.quadraticCurveTo(7, -33, 5.8, -26.5);
  g.quadraticCurveTo(3.6, -29, 3.8, -35);
  g.closePath(); g.fill();

  // ---- pescoço + cabeça serena
  g.fillStyle = "#c8925c";
  rr(g, -1.5, -37.5, 3, 3.4, 1.2); g.fill();
  const sk = g.createRadialGradient(-1.6, -42, 0.6, 0, -40.5, 5.8);
  sk.addColorStop(0, "#f6d3a8"); sk.addColorStop(0.75, "#e7b98a"); sk.addColorStop(1, "#c8925c");
  g.fillStyle = sk;
  g.beginPath(); g.ellipse(0, -40.5, 4.9, 5.2, 0, 0, TAU); g.fill();
  // coque/franja
  g.fillStyle = "#2c1a10";
  g.beginPath();
  g.moveTo(-4.9, -40);
  g.quadraticCurveTo(-5.4, -45.6, 0, -46);
  g.quadraticCurveTo(5.4, -45.6, 4.9, -40);
  g.quadraticCurveTo(3.2, -43.4, 0.6, -43.6);
  g.quadraticCurveTo(-2.8, -43.6, -4.9, -40);
  g.closePath(); g.fill();
  g.save();
  g.globalAlpha *= 0.3;
  g.fillStyle = "#ffffff";
  g.beginPath(); g.ellipse(-1.8, -44.6, 1.9, 0.65, -0.3, 0, TAU); g.fill();
  g.restore();
  // expressão SERENA: olhos fechados suaves + sorriso leve + blush
  g.strokeStyle = "#5a3820"; g.lineWidth = 0.85; g.lineCap = "round";
  g.beginPath(); g.moveTo(-2.9, -40.4); g.quadraticCurveTo(-1.9, -39.5, -0.9, -40.4); g.stroke();
  g.beginPath(); g.moveTo(0.9, -40.4); g.quadraticCurveTo(1.9, -39.5, 2.9, -40.4); g.stroke();
  // sobrancelhas calmas
  g.strokeStyle = "#3a2412"; g.lineWidth = 0.7;
  g.beginPath(); g.moveTo(-2.9, -42.2); g.quadraticCurveTo(-1.9, -42.8, -0.9, -42.2); g.stroke();
  g.beginPath(); g.moveTo(0.9, -42.2); g.quadraticCurveTo(1.9, -42.8, 2.9, -42.2); g.stroke();
  g.save();
  g.globalAlpha *= 0.3;
  g.fillStyle = "#e86a4a";
  g.beginPath(); g.ellipse(-2.9, -38.6, 1.1, 0.65, 0, 0, TAU); g.fill();
  g.beginPath(); g.ellipse(2.9, -38.6, 1.1, 0.65, 0, 0, TAU); g.fill();
  g.restore();
  g.strokeStyle = "#9a4a32"; g.lineWidth = 0.8;
  g.beginPath(); g.moveTo(-1, -37.2); g.quadraticCurveTo(0, -36.5, 1, -37.2); g.stroke();

  // ---- coroa de 12 ESTRELAS ao redor da cabeça
  for (let i = 0; i < 12; i++) {
    const ang = -Math.PI / 2 + (i / 12) * TAU;
    const sx = Math.cos(ang) * 8.6;
    const sy = -40.5 + Math.sin(ang) * 8;
    const tw = reduce ? 0.8 : Math.sin(t * 0.008 + i * 1.9) * 0.5 + 0.5;
    g.fillStyle = tw > 0.5 ? "#fff3c0" : "#ffd24a";
    g.beginPath(); g.arc(sx, sy, 0.85, 0, TAU); g.fill();
    if (tw > 0.82) {
      g.strokeStyle = "rgba(255,243,192,0.7)"; g.lineWidth = 0.5;
      g.beginPath(); g.moveTo(sx - 1.8, sy); g.lineTo(sx + 1.8, sy); g.stroke();
      g.beginPath(); g.moveTo(sx, sy - 1.8); g.lineTo(sx, sy + 1.8); g.stroke();
    }
  }

  // ---- LUA crescente sob os pés (por cima da barra do vestido)
  const mg = g.createLinearGradient(0, -6, 0, 10);
  mg.addColorStop(0, "#f2f5fc"); mg.addColorStop(1, "#9aa4bc");
  g.fillStyle = mg;
  g.beginPath();
  g.arc(0, -2, 13, 0, Math.PI);
  g.arc(0, -6, 11, Math.PI, 0, true);
  g.closePath(); g.fill();
  g.strokeStyle = "rgba(255,255,255,0.55)"; g.lineWidth = 0.8;
  g.beginPath(); g.arc(0, -6, 11, Math.PI * 0.15, Math.PI * 0.85); g.stroke();
  glowCircle(g, 0, 2, 15, "#dfe8ff", 0.22);
}

// ============================================================================
// DESPACHO PÚBLICO
// ============================================================================

/** Desenha um ser simbólico HD. Ancorado nos PÉS: (x, fy). */
export function drawBeingHD(g: G, x: number, fy: number, spec: HDBeingSpec): void {
  const S = spec.scale ?? 1;
  const t = spec.t ?? 0;
  const reduce = !!spec.reduce;

  g.save();
  if (spec.alpha != null) g.globalAlpha *= spec.alpha;
  // origem nos pés; facing espelha; escala uniforme — daqui pra baixo tudo
  // é desenhado em unidades locais com o chão em y=0
  g.translate(x, fy);
  g.scale(S * (spec.facing ?? 1), S);

  // aura dourada suave de glória
  const glow = spec.glow ?? 0;
  if (glow > 0.03) {
    const h = beingHeight(spec.role);
    glowCircle(g, 0, -h * 0.45, h * 0.62, "#ffe9b0", 0.42 * glow);
  }

  switch (spec.role) {
    case "dragao": drawDragonHD(g, t, reduce, spec.pose === "lie"); break;
    case "besta": drawBeastHD(g, t, reduce, spec.palette ?? "mar"); break;
    case "cordeiro": drawLambHD(g, t, reduce); break;
    case "servivente": drawLivingHD(g, t, reduce, x); break;
    case "cavaleiro": drawHorsemanHD(g, t, reduce, spec.palette ?? "branco"); break;
    case "multidao": drawCrowdHD(g, t, reduce); break;
    case "mulher": drawWomanHD(g, t, reduce); break;
    default: break;
  }

  g.restore();
}
