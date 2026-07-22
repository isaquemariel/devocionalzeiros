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

  const jump = cheer && !reduce ? Math.abs(Math.sin(t * 0.012)) * 4 : 0;
  const bob = reduce
    ? 0
    : walking
      ? Math.round(Math.abs(Math.sin(t * 0.016)) * 2)
      : Math.round(Math.sin(t * 0.004) + 1);
  const cy = feetY - 22 - bob - jump;
  const HW = 11,
    HH = 19;

  // sombra
  g.globalAlpha = 0.26;
  e(g, bx, feetY + 3, 14, 3, "#000");
  g.globalAlpha = 1;

  if (look.head === "halo") {
    g.globalAlpha = 0.16;
    e(g, bx, cy - 2, 18, 24, "#fff3c8");
    g.globalAlpha = 1;
  }
  if (look.wings) wings(g, bx, cy, t, reduce);

  // pés
  const step = walking && !reduce ? Math.sin(t * 0.02) * 3 : 0;
  e(g, bx - 6 + step, feetY - 1 - jump, 4, 2.6, B_D);
  e(g, bx + 6 - step, feetY - 1 - jump, 4, 2.6, B_D);

  // braços: pra cima comemorando, pra baixo triste, senão embalando
  const armBase = cheer ? cy - 7 : sad ? cy + 9 : cy + 6;
  const armSw = walking && !reduce ? Math.sin(t * 0.02) * 2 : cheer && !reduce ? Math.sin(t * 0.02) * 2 : reduce ? 0 : Math.sin(t * 0.004);
  e(g, bx - 12, armBase + armSw, 3.6, 6, B_D);
  e(g, bx - 12, armBase + armSw, 2.4, 4.6, B_P);
  e(g, bx - 12, armBase + 4 + armSw, 2, 2, B_S);
  e(g, bx + 12, armBase - armSw, 3.6, 6, B_D);
  e(g, bx + 12, armBase - armSw, 2.4, 4.6, B_P);
  e(g, bx + 12, armBase + 4 - armSw, 2, 2, B_S);

  if (look.robe === "royal") {
    g.fillStyle = "#5a1428";
    tri3(g, bx - 11, cy - 2, bx + 11, cy - 2, bx, cy + 19);
  }

  // corpo em D
  dP(g, bx, cy, HW, HH);
  g.fillStyle = B_D;
  g.fill();
  dP(g, bx, cy, HW - 1, HH - 1);
  g.fillStyle = B_P;
  g.fill();
  g.globalAlpha = 0.5;
  e(g, bx - 3, cy - 8, 5, 7, B_S);
  g.globalAlpha = 1;
  g.globalAlpha = 0.3;
  e(g, bx + 4, cy + 9, 5, 8, B_D);
  g.globalAlpha = 1;
  g.globalAlpha = 0.5;
  g.strokeStyle = RIM;
  g.lineWidth = 1;
  dP(g, bx, cy, HW - 0.5, HH - 0.5);
  g.stroke();
  g.globalAlpha = 1;
  P(g, bx - (HW - 2), cy - 11, 2, 20, B_S);

  // ROSTO (meio) — desenhado antes da roupa para ficar sempre nítido
  const ey = cy - 8;
  if (cheer) {
    // olhos fechados felizes (arcos)
    g.strokeStyle = "#fff";
    g.lineWidth = 1.3;
    g.beginPath();
    g.arc(bx - 5, ey + 1, 2.6, 3.5, 6.1);
    g.stroke();
    g.beginPath();
    g.arc(bx + 5, ey + 1, 2.6, 3.5, 6.1);
    g.stroke();
  } else {
    e(g, bx - 5, ey, 3.4, 3.9, "#fff");
    e(g, bx + 5, ey, 3.4, 3.9, "#fff");
    const look2 = sad ? 1 : 0;
    e(g, bx - 5, ey + 0.5 + look2, 2, 2.5, B_D);
    e(g, bx + 5, ey + 0.5 + look2, 2, 2.5, B_D);
    P(g, bx - 6, ey - 1.4, 1.5, 1.5, "#fff");
    P(g, bx + 4, ey - 1.4, 1.5, 1.5, "#fff");
    P(g, bx - 4, ey + 1.8, 1, 1, "#9fc0ff");
    P(g, bx + 6, ey + 1.8, 1, 1, "#9fc0ff");
  }
  // boca
  if (sad) {
    P(g, bx - 3, cy - 1, 1, 1, "#9fb0d6");
    P(g, bx - 1, cy - 2, 3, 1, "#9fb0d6");
    P(g, bx + 3, cy - 1, 1, 1, "#9fb0d6");
    if (!reduce) {
      g.globalAlpha = 0.7;
      P(g, bx - 6, ey + 3 + ((t * 0.02) % 6), 1, 2, "#6fb0e0");
      g.globalAlpha = 1;
    }
  } else {
    // sorriso largo (curva pra cima)
    P(g, bx - 3, cy - 4, 1, 1, "#cfe0ff");
    P(g, bx - 2, cy - 3, 1, 1, "#cfe0ff");
    P(g, bx - 1, cy - 2, 1, 1, "#cfe0ff");
    P(g, bx, cy - 2, 1, 1, "#cfe0ff");
    P(g, bx + 1, cy - 2, 1, 1, "#cfe0ff");
    P(g, bx + 2, cy - 3, 1, 1, "#cfe0ff");
    P(g, bx + 3, cy - 4, 1, 1, "#cfe0ff");
  }
  if (look.glasses) {
    g.strokeStyle = GOLD;
    g.lineWidth = 1.4;
    g.beginPath();
    g.ellipse(bx - 5, ey, 4.5, 4.5, 0, 0, 6.29);
    g.stroke();
    g.beginPath();
    g.ellipse(bx + 5, ey, 4.5, 4.5, 0, 0, 6.29);
    g.stroke();
    P(g, bx - 1.4, ey - 0.6, 2.8, 1.3, GOLD);
    P(g, bx - 10, ey - 1, 3, 1, GOLD);
    P(g, bx + 7, ey - 1, 3, 1, GOLD);
  }

  // TRAJE — vestido no corpo: clip ao D para o traje abraçar a silhueta exata.
  // Mãos/pés ficam de fora. Sem traje, mostra a chama do coração.
  if (look.robe !== "none") {
    g.save();
    dP(g, bx, cy, HW - 0.5, HH - 0.5);
    g.clip();
    if (look.robe === "pilgrim") garmentPilgrim(g, bx, cy);
    else if (look.robe === "prophet") garmentProphet(g, bx, cy, t, reduce);
    else if (look.robe === "royal") garmentRoyal(g, bx, cy);
    else if (look.robe === "armor") breastplate(g, bx, cy);
    g.restore();
    garmentShoulders(g, bx, cy, look.robe);
  } else {
    heartFlame(g, bx, cy + 9, t, reduce);
  }

  // HEADWEAR — em cima da cabeça, acima do rosto
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

  // itens na mão (frente)
  if (look.shield) shield(g, bx, cy);
  if (look.sword) sword(g, bx, cy);
}
