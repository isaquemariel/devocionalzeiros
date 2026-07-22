// ============================================================================
// RPG Mascot — o Devocionalzeiro em pixel art (canvas procedural)
// ----------------------------------------------------------------------------
// Motor de desenho reutilizável do mascote (corpo em "D", chama do coração,
// rosto no meio, acessórios/trajes vestidos por cima do corpo). É usado por
// todas as cenas do RPG (home, leitura, desafio, mapa) desenhando direto no
// <canvas>, com image-rendering: pixelated para o visual retrô.
//
// Anatomia (D "alto" para separar bem as zonas):
//   topo da cabeça  -> headwear (fogo / boné / chapéu / coroa / capacete / auréola)
//   rosto (olhos, boca) no meio
//   peito abaixo da boca -> a chama do coração e o TRAJE (só aqui)
//
// Nada aqui toca o banco de dados — é puramente visual. Os acessórios/trajes
// são camadas empilháveis (grátis, ganhos por divisão da Bíblia, ou comprados).
// ============================================================================

// ---- paleta canônica (fiel ao mascote do app) ----
const B_P = "#1A2E50"; // corpo primário (azul)
const B_S = "#2b4677"; // corpo secundário / brilho
const B_D = "#0E1D35"; // corpo escuro / contorno
const RIM = "#3b82f6"; // luz de borda
const GOLD = "#D4A017"; // óculos dourados
const FL1 = "#F59E0B"; // chama base
const FL2 = "#FBBF24"; // chama média
const FL3 = "#FDE68A"; // chama topo
// aço (armadura) e ouro (detalhes)
const ST_D = "#333c4d";
const ST_M = "#5a6a80";
const ST_L = "#8a9bb2";
const ST_H = "#c7d4e4";
const GLD = "#e8b04b";
const GLD_H = "#ffd889";

export type MascotHead =
  | "none"
  | "fire" // 🔥 foguinho na cabeça (recompensa: Pentateuco/Lei)
  | "cap"
  | "hat"
  | "crown" // 👑 coroa (recompensa: Históricos)
  | "helmet" // capacete da salvação (armadura)
  | "halo"; // 😇 auréola (recompensa: Atos/Evangelhos)

export type MascotRobe =
  | "none"
  | "pilgrim" // manto de peregrino
  | "prophet" // 🧥 manto de profeta (recompensa: Profetas)
  | "royal" // traje real
  | "armor"; // couraça / armadura de Deus

export type MascotMood = "idle" | "happy" | "sad";

export interface MascotLook {
  head: MascotHead;
  glasses: boolean; // 👓 óculos da sabedoria (recompensa: Poéticos)
  robe: MascotRobe;
  shield: boolean; // 🛡️ escudo da fé
  sword: boolean; // ⚔️ espada do Espírito (recompensa: Cartas)
  wings: boolean; // 🕊️ asas (recompensa: Atos)
}

export const DEFAULT_LOOK: MascotLook = {
  head: "none",
  glasses: false,
  robe: "none",
  shield: false,
  sword: false,
  wings: false,
};

export interface DrawOpts {
  t: number; // tempo de animação (ms acumulados)
  reduce?: boolean; // prefers-reduced-motion
  walking?: boolean; // andando pelo caminho
  mood?: MascotMood; // reação (comemora / triste)
}

type G = CanvasRenderingContext2D;

// ---- helpers de baixo nível ----
const e = (g: G, x: number, y: number, rx: number, ry: number, c?: string) => {
  if (c) g.fillStyle = c;
  g.beginPath();
  g.ellipse(x, y, rx, ry, 0, 0, 6.29);
  g.fill();
};
const P = (g: G, x: number, y: number, w: number, h: number, c: string) => {
  g.fillStyle = c;
  g.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
};
const tri3 = (g: G, x1: number, y1: number, x2: number, y2: number, x3: number, y3: number) => {
  g.beginPath();
  g.moveTo(x1, y1);
  g.lineTo(x2, y2);
  g.lineTo(x3, y3);
  g.closePath();
  g.fill();
};
// contorno do corpo em "D" (esquerda reta, direita arredondada)
const dP = (g: G, cx: number, cy: number, hw: number, hh: number) => {
  g.beginPath();
  g.moveTo(cx - hw, cy - hh);
  g.lineTo(cx - hw, cy + hh);
  g.quadraticCurveTo(cx - hw, cy + hh + 1, cx - hw + 3, cy + hh);
  g.quadraticCurveTo(cx + hw + 3, cy + hh - 1, cx + hw, cy);
  g.quadraticCurveTo(cx + hw + 3, cy - hh + 1, cx - hw + 3, cy - hh);
  g.quadraticCurveTo(cx - hw, cy - hh - 1, cx - hw, cy - hh);
  g.closePath();
};

// ---- chamas ----
const heartFlame = (g: G, x: number, y: number, t: number, reduce: boolean) => {
  const w = reduce ? 0 : Math.sin(t * 0.04) * 0.6;
  const hh = reduce ? 0 : Math.abs(Math.sin(t * 0.06)) * 0.9;
  g.globalAlpha = 0.22;
  e(g, x, y, 2.6, 3.2, FL1);
  g.globalAlpha = 1;
  e(g, x, y + 0.5, 1.7, 2.4, FL1);
  e(g, x + w, y - 0.3, 1.1, 1.8, FL2);
  e(g, x + w, y - 1.4 - hh, 0.7, 1.3, FL3);
};
const headFire = (g: G, x: number, y: number, t: number, reduce: boolean) => {
  const w = reduce ? 0 : Math.sin(t * 0.03) * 1.2;
  const hh = reduce ? 0 : Math.sin(t * 0.05) * 1.2;
  g.globalAlpha = 0.2;
  e(g, x, y, 6.5, 7.5, FL1);
  g.globalAlpha = 1;
  e(g, x, y + 1, 3.2, 4.6, FL1);
  e(g, x + w, y - 1, 2.2, 3.8, FL2);
  e(g, x + w, y - 3.6 - hh, 1.2, 2.6, FL3);
};
const crown = (g: G, x: number, y: number) => {
  P(g, x - 7, y, 14, 3, "#f2c94c");
  g.fillStyle = "#f2c94c";
  tri3(g, x - 7, y, x - 3, y, x - 5, y - 5);
  tri3(g, x - 2, y, x + 2, y, x, y - 6);
  tri3(g, x + 3, y, x + 7, y, x + 5, y - 5);
  P(g, x - 1, y - 3, 2, 2, "#e0466b");
  P(g, x - 6, y - 1, 1, 1, GLD_H);
  P(g, x + 5, y - 1, 1, 1, GLD_H);
};

// ---- peças de traje/armadura ----
const wings = (g: G, bx: number, cy: number, t: number, reduce: boolean) => {
  const flap = reduce ? 0 : Math.sin(t * 0.006) * 2;
  for (const s of [-1, 1]) {
    const wx = bx + s * 8;
    g.fillStyle = "#b8b19a";
    tri3(g, wx, cy - 7, wx + s * 18, cy - 15 - flap, wx + s * 12, cy + 11);
    g.fillStyle = "#e6dfca";
    tri3(g, wx, cy - 5, wx + s * 15, cy - 12 - flap, wx + s * 10, cy + 8);
    g.fillStyle = "#fffdf6";
    tri3(g, wx, cy - 3, wx + s * 11, cy - 9 - flap, wx + s * 7, cy + 4);
    g.strokeStyle = "#cfc7ad";
    g.lineWidth = 0.6;
    for (let i = 1; i < 3; i++) {
      g.beginPath();
      g.moveTo(wx, cy - 4 + i * 4);
      g.lineTo(wx + s * (14 - i * 3), cy - 10 - flap + i * 4);
      g.stroke();
    }
  }
};
// sombreamento do traje: segue a forma do D (chamado dentro do clip)
const garmentShade = (g: G, bx: number, cy: number, hi: string, lo: string) => {
  g.globalAlpha = 0.4;
  g.fillStyle = hi;
  g.beginPath();
  g.ellipse(bx - 4, cy + 5, 6, 9, 0, 0, 6.29);
  g.fill();
  g.globalAlpha = 1;
  g.globalAlpha = 0.38;
  g.fillStyle = lo;
  g.beginPath();
  g.ellipse(bx + 6, cy + 13, 6, 10, 0, 0, 6.29);
  g.fill();
  g.globalAlpha = 1;
  P(g, bx - 10, cy - 1, 1.5, 22, hi);
};
const breastplate = (g: G, bx: number, cy: number) => {
  g.fillStyle = ST_M;
  g.fillRect(bx - 14, cy - 1, 28, 30);
  garmentShade(g, bx, cy, ST_L, ST_D);
  P(g, bx - 1, cy - 1, 2, 20, ST_H); // crista central
  P(g, bx - 1, cy + 3, 2, 7, GLD);
  P(g, bx - 3, cy + 5, 6, 2, GLD);
  P(g, bx - 1, cy + 8, 2, 2, "#e0466b"); // cruz de ouro + rubi
  g.strokeStyle = ST_D;
  g.lineWidth = 0.7;
  g.beginPath();
  g.moveTo(bx - 9, cy + 6);
  g.lineTo(bx + 9, cy + 6);
  g.moveTo(bx - 9, cy + 12);
  g.lineTo(bx + 9, cy + 12);
  g.stroke();
  for (const rx of [-6, 6]) for (const ry of [2, 9, 15]) P(g, bx + rx, cy + ry, 1, 1, ST_H);
  P(g, bx - 12, cy + 16, 24, 2, GLD);
  P(g, bx - 1, cy + 16, 2, 2, GLD_H); // cinto da verdade
};
const garmentPilgrim = (g: G, bx: number, cy: number) => {
  const base = "#d8c39a",
    mid = "#c2a875",
    sh = "#8a6f45",
    rope = "#7a5230";
  g.fillStyle = mid;
  g.fillRect(bx - 14, cy - 1, 28, 30);
  garmentShade(g, bx, cy, base, sh);
  P(g, bx - 8, cy - 1, 16, 1, sh);
  g.strokeStyle = sh;
  g.lineWidth = 0.7;
  for (const fx of [-6, -2, 3, 7]) {
    g.beginPath();
    g.moveTo(bx + fx, cy + 1);
    g.lineTo(bx + fx * 0.85, cy + 19);
    g.stroke();
  }
  P(g, bx - 12, cy + 9, 24, 2, rope);
  e(g, bx, cy + 10, 1.8, 1.8, "#5a3c22");
  P(g, bx - 2, cy + 11, 4, 3, rope);
};
const garmentProphet = (g: G, bx: number, cy: number, t: number, reduce: boolean) => {
  const base = "#3a2850",
    mid = "#4a3565",
    fold = "#281a3a",
    sash = "#9a6a3a",
    fur = "#5f4f70";
  g.fillStyle = base;
  g.fillRect(bx - 14, cy - 1, 28, 30);
  garmentShade(g, bx, cy, mid, fold);
  for (let i = -8; i <= 6; i += 2) P(g, bx + i, cy - 1, 2, 3, fur);
  g.save();
  g.translate(bx, cy + 8);
  g.rotate(-0.5);
  P(g, -14, -1.5, 28, 3, sash);
  P(g, -14, -1.5, 28, 1, "#c08a4a");
  g.restore();
  g.strokeStyle = fold;
  g.lineWidth = 0.8;
  for (const fx of [-6, 0, 6]) {
    g.beginPath();
    g.moveTo(bx + fx, cy + 1);
    g.lineTo(bx + fx, cy + 19);
    g.stroke();
  }
  heartFlame(g, bx, cy + 12, t, reduce);
};
const garmentRoyal = (g: G, bx: number, cy: number) => {
  const base = "#7a1f3a",
    mid = "#9c2a48",
    dark = "#5a1428",
    fur = "#f0ece0";
  g.fillStyle = base;
  g.fillRect(bx - 14, cy - 1, 28, 30);
  garmentShade(g, bx, cy, mid, dark);
  P(g, bx - 1, cy - 1, 2, 20, GLD);
  P(g, bx - 1, cy - 1, 1, 20, GLD_H);
  P(g, bx - 9, cy - 1, 18, 3, fur);
  for (const sx of [-6, -2, 2, 6]) P(g, bx + sx, cy, 1, 2, "#2a2a2a");
  e(g, bx, cy + 5, 2, 2, "#4a90e0");
  P(g, bx - 1, cy + 4, 1, 1, "#bcd8ff");
  P(g, bx - 12, cy + 17, 24, 2, GLD);
  g.strokeStyle = dark;
  g.lineWidth = 0.7;
  for (const fx of [-6, 5]) {
    g.beginPath();
    g.moveTo(bx + fx, cy + 1);
    g.lineTo(bx + fx, cy + 18);
    g.stroke();
  }
};
// ombreiras/pauldrons: desenhadas DEPOIS do clip, saltando por cima dos braços
const garmentShoulders = (g: G, bx: number, cy: number, robe: MascotRobe) => {
  if (robe === "armor") {
    e(g, bx - 10, cy + 2, 4.2, 3.4, ST_L);
    e(g, bx - 10, cy + 2, 2.6, 2.2, ST_M);
    e(g, bx + 10, cy + 2, 4.2, 3.4, ST_L);
    e(g, bx + 10, cy + 2, 2.6, 2.2, ST_M);
  } else if (robe === "royal") {
    e(g, bx - 10, cy + 2, 4, 3, "#9c2a48");
    e(g, bx + 10, cy + 2, 4, 3, "#9c2a48");
    P(g, bx - 12, cy + 1, 3, 1, GLD);
    P(g, bx + 9, cy + 1, 3, 1, GLD);
  } else if (robe === "pilgrim") {
    e(g, bx - 10, cy + 2, 3.8, 3, "#d8c39a");
    e(g, bx + 10, cy + 2, 3.8, 3, "#c2a875");
  } else if (robe === "prophet") {
    e(g, bx - 10, cy + 2, 3.8, 3, "#4a3565");
    e(g, bx + 10, cy + 2, 3.8, 3, "#3a2850");
  }
};
// capacete — só na coroa da cabeça, acima do rosto (nunca sobre os olhos)
const helmet = (g: G, bx: number, cy: number) => {
  e(g, bx, cy - 18, 8.5, 6, ST_M);
  g.globalAlpha = 0.7;
  e(g, bx - 2, cy - 20, 4.5, 3, ST_L);
  g.globalAlpha = 1;
  P(g, bx - 8, cy - 15, 16, 2, ST_D);
  P(g, bx - 8, cy - 16, 16, 1, GLD);
  P(g, bx - 1, cy - 26, 2, 5, GLD);
  P(g, bx - 2, cy - 26, 4, 1, GLD_H);
  P(g, bx - 9, cy - 15, 2, 4, ST_M);
  P(g, bx + 7, cy - 15, 2, 4, ST_M);
};
const shield = (g: G, bx: number, cy: number) => {
  const wx = bx - 13,
    wy = cy + 6;
  e(g, wx, wy, 6, 7.5, GLD);
  e(g, wx, wy, 5, 6.5, "#7a4a2a");
  g.globalAlpha = 0.5;
  e(g, wx - 1, wy - 2, 3, 4, "#9c6636");
  g.globalAlpha = 1;
  P(g, wx - 1, wy - 4.5, 2, 9, ST_H);
  P(g, wx - 3.5, wy - 1, 7, 2, ST_H);
  e(g, wx, wy, 1.5, 1.5, GLD_H);
};
const sword = (g: G, bx: number, cy: number) => {
  const hx = bx + 14;
  P(g, hx - 1, cy - 14, 2, 18, ST_H);
  P(g, hx, cy - 14, 1, 17, "#eef4ff");
  g.globalAlpha = 0.5;
  P(g, hx - 1.6, cy - 14, 1, 18, "#9fb8e0");
  g.globalAlpha = 1;
  g.globalAlpha = 0.22;
  e(g, hx, cy - 5, 3, 10, "#bcd0ff");
  g.globalAlpha = 1;
  P(g, hx - 3, cy + 4, 7, 2, GLD);
  P(g, hx - 4, cy + 4, 1, 2, GLD_H);
  P(g, hx + 3, cy + 4, 1, 2, GLD_H);
  P(g, hx - 1, cy + 6, 2, 4, "#6b4a24");
  P(g, hx - 1, cy + 10, 2, 2, GLD);
};

/**
 * Desenha o Devocionalzeiro. `bx` = centro X, `feetY` = base dos pés.
 * O corpo tem ~46px de altura; deixe folga acima de feetY para acessórios de
 * cabeça (fogo/coroa/auréola chegam a ~cy-28, i.e. ~feetY-50).
 */
export function drawMascot(
  g: G,
  bx: number,
  feetY: number,
  look: MascotLook,
  opts: DrawOpts,
): void {
  const t = opts.t;
  const reduce = !!opts.reduce;
  const walking = !!opts.walking;
  const mood: MascotMood = opts.mood || "idle";
  const cheer = mood === "happy";
  const sad = mood === "sad";

  // ---- paleta pixel-art (cores chapadas + contorno escuro) ----
  const OUT = "#0b1524"; // contorno
  const BODY = "#2b5088"; // azul base
  const BLT = "#5285c6"; // luz
  const BDK = "#19365f"; // sombra
  const EW = "#eef4ff"; // branco do olho
  const PUP = "#12203a"; // pupila
  const SH = "#ffffff"; // brilho
  const CK = "#e88a6a"; // bochecha
  const SM = "#bcd4ff"; // sorriso (claro, aparece no azul)
  const HRT = "#e5476b",
    HRTL = "#ff8aa5"; // coração
  const F_O = "#F59E0B",
    F_M = "#FBBF24",
    F_C = "#FDE68A"; // chama

  // ---- posição (passos inteiros = pixels nítidos, mas fluido a 60fps) ----
  const bobI = reduce ? 0 : Math.round(walking ? Math.abs(Math.sin(t * 0.02)) * 2 : Math.sin(t * 0.0035) + 1);
  const jumpI = cheer && !reduce ? Math.round(Math.abs(Math.sin(t * 0.013)) * 4) : 0;
  const swayI = reduce || walking || cheer ? 0 : Math.round(Math.sin(t * 0.0022));
  const stepI = walking && !reduce ? Math.round(Math.sin(t * 0.02) * 2) : 0;
  bx = Math.round(bx) + swayI;
  const fY = Math.round(feetY) - jumpI;
  const cy = fY - 22 - bobI; // centro do corpo
  const BW = 12,
    HH = 18; // meia-largura / meia-altura do corpo (D)
  const HW = BW;

  // pixel util (inteiro)
  const R = (x: number, y: number, w: number, h: number, c: string) => {
    g.fillStyle = c;
    g.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
  };
  // cantos: esquerda pouco arredondada, direita bem arredondada => formato de "D"
  const rL = 3,
    rC = BW;
  const inset = (ry: number, r: number, half: number) => {
    const d = Math.abs(ry) - (half - r);
    if (d <= 0) return 0;
    return Math.round(r - Math.sqrt(Math.max(0, r * r - d * d)));
  };
  const edges = (ry: number) => {
    const lX = bx - BW + inset(ry, rL, HH);
    const rX = bx + BW - inset(ry, rC, HH);
    return { lX, rX };
  };

  // sombra
  g.globalAlpha = 0.28;
  e(g, bx, fY + 3, 13, 3, "#000");
  g.globalAlpha = 1;

  if (look.head === "halo") {
    g.globalAlpha = 0.16;
    e(g, bx, cy - 2, 18, 24, "#fff3c8");
    g.globalAlpha = 1;
  }
  if (look.wings) wings(g, bx, cy, t, reduce);

  // ---- pés (blocos fofos com contorno) ----
  const drawFoot = (ox: number) => {
    R(ox - 1, fY - 1, 7, 5, OUT);
    R(ox, fY, 5, 3, BODY);
    R(ox, fY, 2, 1, BLT);
  };
  drawFoot(bx - 7 + stepI);
  drawFoot(bx + 2 - stepI);

  // ---- braços fofinhos (contorno + luz), posição pelo humor ----
  const armY = Math.round(cheer ? cy - 8 : sad ? cy + 8 : cy + 4);
  const armSw = walking || cheer ? (!reduce ? Math.round(Math.sin(t * 0.02) * 2) : 0) : 0;
  const drawArm = (ox: number, ay: number) => {
    R(ox - 1, ay - 1, 6, 9, OUT);
    R(ox, ay, 4, 7, BODY);
    R(ox, ay, 2, 2, BLT);
  };
  drawArm(bx - BW - 3, armY + armSw);
  drawArm(bx + BW - 1, armY - armSw);

  if (look.robe === "royal") {
    g.fillStyle = "#5a1428";
    tri3(g, bx - 11, cy - 2, bx + 11, cy - 2, bx, cy + 19);
  }

  // ---- CORPO em D (linha a linha, bordas nítidas) ----
  // passo 1: contorno (silhueta expandida 1px)
  for (let ry = -HH; ry <= HH; ry++) {
    const { lX, rX } = edges(ry);
    if (rX < lX) continue;
    R(lX - 1, cy + ry, rX - lX + 3, 1, OUT);
  }
  // passo 2: preenchimento (deixa 1px de contorno em volta)
  for (let ry = -HH + 1; ry <= HH - 1; ry++) {
    const { lX, rX } = edges(ry);
    if (rX < lX) continue;
    R(lX, cy + ry, rX - lX + 1, 1, BODY);
  }
  // sombreado sólido: luz em cima-esquerda, sombra embaixo-direita
  for (let ry = -HH + 3; ry <= -1; ry++) {
    const { lX } = edges(ry);
    R(lX + 1, cy + ry, 2, 1, BLT);
  }
  for (let ry = 3; ry <= HH - 2; ry++) {
    const { rX } = edges(ry);
    R(rX - 2, cy + ry, 2, 1, BDK);
  }

  // ---- ROSTO ----
  const ey = cy - 7;
  if (cheer) {
    // olhos felizes fechados (^ ^)
    for (const sx of [-5, 5]) {
      R(bx + sx - 2, ey + 1, 1, 1, EW);
      R(bx + sx - 1, ey, 1, 1, EW);
      R(bx + sx, ey - 1, 1, 1, EW);
      R(bx + sx + 1, ey, 1, 1, EW);
      R(bx + sx + 2, ey + 1, 1, 1, EW);
    }
  } else {
    const dy = sad ? 1 : 0;
    for (const sx of [-5, 5]) {
      R(bx + sx - 3, ey - 3, 6, 8, BDK); // órbita (sombra)
      R(bx + sx - 2, ey - 2, 4, 6, EW); // branco
      R(bx + sx - 1, ey + dy, 2, 3, PUP); // pupila (olhos limpos, sem brilho)
    }
  }
  // boca
  if (sad) {
    R(bx - 2, cy + 1, 1, 1, SM);
    R(bx - 1, cy, 3, 1, SM);
    R(bx + 2, cy + 1, 1, 1, SM);
    if (!reduce) {
      g.globalAlpha = 0.7;
      R(bx - 6, ey + 3 + (Math.floor((t * 0.03) % 6)), 1, 2, "#6fb0e0"); // lágrima
      g.globalAlpha = 1;
    }
  } else if (cheer) {
    // sorriso aberto
    R(bx - 3, cy - 1, 7, 1, SM);
    R(bx - 2, cy, 5, 1, SM);
    R(bx - 1, cy + 1, 3, 1, SM);
  } else {
    // sorriso fofo (u)
    R(bx - 2, cy - 1, 1, 1, SM);
    R(bx - 1, cy, 3, 1, SM);
    R(bx + 2, cy - 1, 1, 1, SM);
  }
  if (look.glasses) {
    // óculos redondos dourados (pixel)
    for (const sx of [-5, 5]) {
      R(bx + sx - 3, ey - 2, 6, 1, GOLD);
      R(bx + sx - 3, ey + 3, 6, 1, GOLD);
      R(bx + sx - 4, ey - 1, 1, 4, GOLD);
      R(bx + sx + 3, ey - 1, 1, 4, GOLD);
    }
    R(bx - 1, ey, 2, 1, GOLD); // ponte
  }

  // brasinha (foguinho aceso) no peito — desenhada onde não há traje
  const drawEmberAt = (yc: number) => {
    const fl = reduce ? 0 : Math.floor((t * 0.05) % 2);
    R(bx - 2, yc + 2, 4, 2, "#7a2a10"); // brasa
    R(bx - 1, yc + 2, 2, 1, "#c04a1a");
    R(bx - 1, yc - 2 - fl, 2, 4, F_O); // chama
    R(bx, yc - 4 - fl, 1, 2, F_M);
    R(bx, yc - 5 - fl, 1, 1, F_C);
  };

  // ---- TRAJE (pixel, integrado ao corpo — cobre só o peito, abaixo da boca) ----
  if (look.robe !== "none") {
    let rb = BODY,
      rl = BLT,
      rd = BDK;
    if (look.robe === "pilgrim") { rb = "#c9b48a"; rl = "#e2d1a6"; rd = "#9a805a"; }
    else if (look.robe === "prophet") { rb = "#412e5c"; rl = "#59407a"; rd = "#291c3d"; }
    else if (look.robe === "royal") { rb = "#7c2140"; rl = "#a63056"; rd = "#54142a"; }
    else if (look.robe === "armor") { rb = "#5f6f86"; rl = "#8fa0b8"; rd = "#333c4d"; }
    const top = 3; // começa abaixo da boca
    // preenche o torso seguindo a silhueta exata (opaco, integrado)
    for (let ry = top; ry <= HH - 1; ry++) {
      const { lX, rX } = edges(ry);
      if (rX < lX) continue;
      R(lX, cy + ry, rX - lX + 1, 1, rb);
    }
    {
      const { lX, rX } = edges(top);
      R(lX, cy + top, rX - lX + 1, 1, rd); // gola
    }
    for (let ry = top + 1; ry <= HH - 1; ry++) {
      const { lX, rX } = edges(ry);
      if (ry <= top + 5) R(lX + 1, cy + ry, 2, 1, rl);
      if (ry >= HH - 6) R(rX - 2, cy + ry, 2, 1, rd);
    }
    if (look.robe === "armor") {
      R(bx - 1, cy + top, 2, HH - top - 3, ST_H); // crista central
      R(bx - 1, cy + 5, 2, 6, GLD);
      R(bx - 3, cy + 6, 6, 2, GLD); // cruz
      R(bx - 1, cy + 8, 2, 1, "#e0466b"); // rubi
      for (const rx of [-6, 5]) for (const yy of [5, 9, 13]) R(bx + rx, cy + yy, 1, 1, ST_H);
      const { lX, rX } = edges(HH - 4);
      R(lX, cy + HH - 4, rX - lX + 1, 2, GLD); // cinto
    } else if (look.robe === "prophet") {
      for (let i = -6; i <= 5; i += 2) R(bx + i, cy + top, 2, 2, "#6a5a7e"); // gola de pele
      g.save();
      g.translate(bx, cy + 9);
      g.rotate(-0.5);
      R(-12, -1, 24, 3, "#a06a3a"); // faixa
      g.restore();
      drawEmberAt(cy + 11);
    } else if (look.robe === "royal") {
      R(bx - 1, cy + top, 2, HH - top - 3, GLD); // placket
      R(bx - 8, cy + top, 16, 2, "#f0ece0"); // gola arminho
      for (const sx of [-6, -2, 2, 5]) R(bx + sx, cy + top + 1, 1, 1, "#2a2a2a");
      R(bx - 1, cy + 6, 2, 2, "#4a90e0"); // safira
      const { lX, rX } = edges(HH - 4);
      R(lX, cy + HH - 4, rX - lX + 1, 2, GLD);
    } else if (look.robe === "pilgrim") {
      const { lX, rX } = edges(11);
      R(lX, cy + 11, rX - lX + 1, 2, "#7a5230"); // corda
      R(bx - 1, cy + 11, 3, 3, "#5a3c22"); // nó
      for (const fx of [-6, -1, 4]) R(bx + fx, cy + top + 2, 1, HH - top - 5, rd); // dobras
    }
    // ombreiras por cima dos braços (liga o traje aos braços)
    R(bx - BW - 3, armY + armSw - 1, 6, 3, rl);
    R(bx + BW - 1, armY - armSw - 1, 6, 3, rl);
    R(bx - BW - 3, armY + armSw - 1, 6, 1, rd);
    R(bx + BW - 1, armY - armSw - 1, 6, 1, rd);
  } else {
    drawEmberAt(cy + 9);
  }

  // ---- HEADWEAR (acima do rosto) ----
  if (look.head === "fire") headFire(g, bx, cy - 19, t, reduce);
  else if (look.head === "cap") {
    e(g, bx, cy - 17, 7.5, 4, "#c0392b");
    P(g, bx - 1, cy - 18, 9, 2, "#e05a4b");
    P(g, bx - 9, cy - 17, 8, 2, "#9c2a20");
  } else if (look.head === "hat") {
    e(g, bx, cy - 16, 11, 2.6, "#6b4f22");
    P(g, bx - 5, cy - 23, 10, 7, "#caa24a");
    P(g, bx - 5, cy - 18, 10, 1, "#8a6a2e");
  } else if (look.head === "crown") crown(g, bx, cy - 17);
  else if (look.head === "helmet") helmet(g, bx, cy);
  else if (look.head === "halo") {
    g.globalAlpha = 0.95;
    g.strokeStyle = "#ffe9a8";
    g.lineWidth = 1.6;
    g.beginPath();
    g.ellipse(bx, cy - 22, 7.5, 2.4, 0, 0, 6.29);
    g.stroke();
    g.globalAlpha = 1;
  }

  // ---- itens de mão (integrados às mãos, na frente) ----
  if (look.shield) {
    const sx = bx - BW - 5,
      sy = armY + armSw; // sobre o braço esquerdo
    R(sx - 1, sy - 3, 10, 14, OUT); // contorno
    R(sx, sy - 2, 8, 12, "#3a63a0"); // face azul
    R(sx + 1, sy - 1, 6, 10, "#5f86c8"); // luz
    R(sx + 3, sy - 1, 1, 10, GLD); // cruz (vertical)
    R(sx, sy + 3, 8, 1, GLD); // cruz (horizontal)
    R(sx + 3, sy + 3, 1, 1, GLD_H);
  }
  if (look.sword) {
    const hx = bx + BW + 3,
      hy = armY - armSw + 1; // mão direita
    R(hx, hy - 15, 2, 15, ST_H); // lâmina
    R(hx, hy - 15, 1, 15, "#eef4ff");
    R(hx, hy - 16, 2, 1, ST_L); // ponta
    R(hx - 2, hy - 1, 6, 1, GLD); // guarda
    R(hx, hy, 2, 4, "#6b4a24"); // punho na mão
    R(hx, hy + 4, 2, 1, GLD);
  }
}
