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
  | "halo" // 😇 auréola (recompensa: Atos/Evangelhos)
  // --- loja (acessórios simples) ---
  | "turban" // turbante sacerdotal
  | "thorns" // coroa de espinhos
  | "kefiah" // lenço do deserto
  | "olive" // grinalda de oliveira
  | "fisher"; // chapéu de pescador

export type MascotRobe =
  | "none"
  | "pilgrim" // manto de peregrino
  | "prophet" // 🧥 manto de profeta (recompensa: Profetas)
  | "royal" // traje real
  | "armor" // couraça / armadura de Deus
  // --- loja (trajes) ---
  | "priest" // vestes sacerdotais (linho branco)
  | "ephod" // éfode com peitoral de 12 pedras
  | "shepherd" // manto do pastor (lã)
  | "purple" // púrpura real
  | "sackcloth" // saco e cinza (arrependimento)
  | "wedding"; // vestes das bodas (branco radiante)

// asas com variações (recompensa "dove" + variações da loja)
export type MascotWings = "none" | "dove" | "gold" | "crystal" | "seraph";

// armas de mão (loja) — mão direita
export type MascotWeapon = "none" | "staff" | "sling" | "shofar" | "torch" | "spear" | "harp";

// efeitos "robustos" ao fundo/redor (loja premium)
export type MascotAura = "none" | "pillar" | "shekinah" | "glory" | "chariot" | "ark";

export type MascotMood = "idle" | "happy" | "sad";

export interface MascotLook {
  head: MascotHead;
  glasses: boolean; // 👓 óculos da sabedoria (recompensa: Poéticos)
  beard: boolean; // 🧔 barba de ancião (loja)
  robe: MascotRobe;
  shield: boolean; // 🛡️ escudo da fé
  sword: boolean; // ⚔️ espada do Espírito (recompensa: Cartas)
  weapon: MascotWeapon; // arma de mão (loja)
  wings: MascotWings; // 🕊️ asas (recompensa "dove" + variações)
  aura: MascotAura; // efeito ao fundo (loja premium)
}

export const DEFAULT_LOOK: MascotLook = {
  head: "none",
  glasses: false,
  beard: false,
  robe: "none",
  shield: false,
  sword: false,
  weapon: "none",
  wings: "none",
  aura: "none",
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
// paletas das asas por estilo (3 camadas: base, média, topo + nervura)
const WING_PAL: Record<Exclude<MascotWings, "none" | "seraph">, [string, string, string, string]> = {
  dove: ["#b8b19a", "#e6dfca", "#fffdf6", "#cfc7ad"],
  gold: ["#b8862f", "#e8b04b", "#ffe6a0", "#a06f22"],
  crystal: ["#5f9fd0", "#9fd0f0", "#eaf7ff", "#7fb8e0"],
};
const oneWing = (g: G, wx: number, cy: number, s: number, flap: number, pal: [string, string, string, string], scale = 1) => {
  g.fillStyle = pal[0];
  tri3(g, wx, cy - 7 * scale, wx + s * 18 * scale, cy - 15 * scale - flap, wx + s * 12 * scale, cy + 11 * scale);
  g.fillStyle = pal[1];
  tri3(g, wx, cy - 5 * scale, wx + s * 15 * scale, cy - 12 * scale - flap, wx + s * 10 * scale, cy + 8 * scale);
  g.fillStyle = pal[2];
  tri3(g, wx, cy - 3 * scale, wx + s * 11 * scale, cy - 9 * scale - flap, wx + s * 7 * scale, cy + 4 * scale);
  g.strokeStyle = pal[3];
  g.lineWidth = 0.6;
  for (let i = 1; i < 3; i++) {
    g.beginPath();
    g.moveTo(wx, cy - 4 * scale + i * 4);
    g.lineTo(wx + s * (14 - i * 3) * scale, cy - 10 * scale - flap + i * 4);
    g.stroke();
  }
};
const wings = (g: G, bx: number, cy: number, t: number, reduce: boolean, style: MascotWings = "dove") => {
  if (style === "none") return;
  const flap = reduce ? 0 : Math.sin(t * 0.006) * 2;
  if (style === "seraph") {
    // 6 asas flamejantes (3 pares), animadas — a versão "robusta"
    const pal: [string, string, string, string] = ["#c0392b", "#F59E0B", "#FDE68A", "#e0651b"];
    for (const s of [-1, 1]) {
      const wx = bx + s * 7;
      const f2 = reduce ? 0 : Math.sin(t * 0.006 + 1) * 2;
      const f3 = reduce ? 0 : Math.sin(t * 0.006 + 2) * 2;
      oneWing(g, wx, cy - 8, s, flap, pal, 0.8); // par superior
      oneWing(g, wx, cy + 1, s, f2, pal, 1.05); // par central (maior)
      oneWing(g, wx, cy + 10, s, f3, pal, 0.8); // par inferior
    }
    // brilho quente por trás
    g.globalAlpha = 0.14;
    e(g, bx, cy, 26, 30, "#F59E0B");
    g.globalAlpha = 1;
    return;
  }
  const pal = WING_PAL[style] ?? WING_PAL.dove;
  for (const s of [-1, 1]) oneWing(g, bx + s * 8, cy, s, flap, pal);
};

// ---- AURAS (efeitos robustos ao fundo, desenhados antes do corpo) ----
const auraPillar = (g: G, bx: number, feetY: number, cy: number, t: number, reduce: boolean) => {
  const top = cy - 40;
  const flick = reduce ? 0 : Math.sin(t * 0.02);
  g.globalAlpha = 0.16;
  e(g, bx, cy, 20, 40, "#F59E0B");
  g.globalAlpha = 1;
  for (let y = feetY + 2; y > top; y -= 4) {
    const k = (feetY - y) / (feetY - top); // 0 embaixo → 1 topo
    const w = (12 - k * 8) + (reduce ? 0 : Math.sin(t * 0.03 + y) * 1.5);
    const col = k > 0.66 ? "#FDE68A" : k > 0.33 ? "#FBBF24" : "#F59E0B";
    g.globalAlpha = 0.85 - k * 0.35;
    e(g, bx + flick * (1 - k) * 2, y, Math.max(2, w), 4, col);
  }
  g.globalAlpha = 1;
};
const auraShekinah = (g: G, bx: number, cy: number, t: number, reduce: boolean) => {
  const pulse = reduce ? 1 : 0.85 + Math.sin(t * 0.004) * 0.15;
  g.globalAlpha = 0.2 * pulse;
  e(g, bx, cy, 30 * pulse, 34 * pulse, "#ffe9a8");
  g.globalAlpha = 0.16 * pulse;
  e(g, bx, cy, 22 * pulse, 26 * pulse, "#fff6d8");
  g.globalAlpha = 1;
  // nuvenzinhas ao redor
  g.globalAlpha = 0.5;
  for (const [dx, dy, r] of [[-16, -14, 5], [15, -12, 6], [-18, 8, 5], [17, 10, 5]] as const) {
    e(g, bx + dx, cy + dy, r, r * 0.7, "#eef1f6");
  }
  g.globalAlpha = 1;
};
const auraGlory = (g: G, bx: number, cy: number, t: number, reduce: boolean) => {
  const rot = reduce ? 0 : t * 0.0006;
  g.save();
  g.translate(bx, cy);
  g.rotate(rot);
  g.globalAlpha = 0.22;
  g.fillStyle = "#ffe9a8";
  for (let i = 0; i < 12; i++) {
    g.rotate(Math.PI / 6);
    tri3(g, 0, -8, -3, -40, 3, -40);
  }
  g.restore();
  g.globalAlpha = 0.18;
  e(g, bx, cy, 16, 18, "#fff6d8");
  g.globalAlpha = 1;
};
const auraChariot = (g: G, bx: number, cy: number, t: number, reduce: boolean) => {
  const spin = reduce ? 0 : t * 0.004;
  g.globalAlpha = 0.16;
  e(g, bx, cy + 4, 28, 26, "#F59E0B");
  g.globalAlpha = 1;
  // duas rodas de fogo atrás, girando
  for (const s of [-1, 1]) {
    const wx = bx + s * 15;
    const wy = cy + 10;
    g.save();
    g.translate(wx, wy);
    g.rotate(spin * s);
    g.strokeStyle = "#F59E0B";
    g.lineWidth = 2;
    g.beginPath();
    g.arc(0, 0, 7, 0, 6.29);
    g.stroke();
    g.strokeStyle = "#FDE68A";
    g.lineWidth = 1;
    for (let i = 0; i < 6; i++) {
      g.rotate(Math.PI / 3);
      g.beginPath();
      g.moveTo(0, 0);
      g.lineTo(0, -7);
      g.stroke();
    }
    g.restore();
    // labaredas subindo das rodas
    g.globalAlpha = 0.7;
    e(g, wx, wy - 9, 3, 5 + (reduce ? 0 : Math.abs(Math.sin(t * 0.02 + s)) * 3), "#FBBF24");
    g.globalAlpha = 1;
  }
};
const auraArk = (g: G, bx: number, cy: number, t: number, reduce: boolean) => {
  // a Arca flutuando ao lado direito, com querubins e brilho dourado
  const bob = reduce ? 0 : Math.round(Math.sin(t * 0.003) * 2);
  const ax = bx + 24;
  const ay = cy + 6 + bob;
  g.globalAlpha = 0.18;
  e(g, ax, ay, 12, 14, "#ffe9a8");
  g.globalAlpha = 1;
  P(g, ax - 8, ay, 16, 10, GLD); // corpo
  P(g, ax - 8, ay, 16, 2, GLD_H);
  P(g, ax - 9, ay - 2, 18, 2, GLD); // tampa (propiciatório)
  // varas de transporte
  P(g, ax - 11, ay + 3, 22, 1, "#6b4a24");
  // dois querubins (asas douradas) sobre a tampa
  for (const s of [-1, 1]) {
    g.fillStyle = GLD_H;
    tri3(g, ax + s * 3, ay - 2, ax + s * 7, ay - 8, ax + s * 2, ay - 7);
  }
  P(g, ax - 1, ay - 6, 2, 4, GLD_H);
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

// ---- acessórios de cabeça (loja) — desenhados acima do rosto ----
const turban = (g: G, bx: number, cy: number) => {
  const base = "#e7dfc8", sh = "#c7bd9f", band = "#b23a48";
  e(g, bx, cy - 18, 9, 6.5, base); // domo do turbante
  g.globalAlpha = 0.6; e(g, bx - 2, cy - 20, 4, 3, "#fff8e6"); g.globalAlpha = 1;
  for (let i = -2; i <= 2; i++) { // dobras enroladas
    g.strokeStyle = sh; g.lineWidth = 0.7; g.beginPath();
    g.ellipse(bx, cy - 18 + i * 2, 9 - Math.abs(i), 6 - Math.abs(i) * 1.5, 0, 3.4, 6.1); g.stroke();
  }
  P(g, bx - 2, cy - 24, 4, 4, band); // pedra/nó frontal
  P(g, bx - 1, cy - 23, 1, 1, GLD_H);
};
const thornsCrown = (g: G, bx: number, cy: number) => {
  g.strokeStyle = "#5a4326"; g.lineWidth = 2.2;
  g.beginPath(); g.ellipse(bx, cy - 16, 9, 4, 0, 0, 6.29); g.stroke();
  g.strokeStyle = "#3f2e18"; g.lineWidth = 1;
  g.beginPath(); g.ellipse(bx, cy - 16, 9, 4, 0, 0, 6.29); g.stroke();
  g.fillStyle = "#2f2213"; // espinhos
  for (let a = 0; a < 6.28; a += 0.8) {
    const ex = bx + Math.cos(a) * 9, ey = cy - 16 + Math.sin(a) * 4;
    tri3(g, ex, ey, ex + Math.cos(a) * 3, ey + Math.sin(a) * 3 - 2, ex + 1.4, ey);
  }
};
const kefiah = (g: G, bx: number, cy: number) => {
  const cloth = "#eae4d6", sh = "#c9c2b0", cord = "#2b2b2b";
  // pano por cima e caindo pelos lados do rosto
  e(g, bx, cy - 17, 9.5, 6, cloth);
  P(g, bx - 10, cy - 17, 3, 12, cloth); P(g, bx + 7, cy - 17, 3, 12, cloth);
  P(g, bx - 10, cy - 17, 1, 12, sh); P(g, bx + 9, cy - 17, 1, 12, sh);
  P(g, bx - 8, cy - 20, 16, 2, cord); // agal (aro preto)
  P(g, bx - 8, cy - 20, 16, 1, "#4a4a4a");
};
const oliveWreath = (g: G, bx: number, cy: number) => {
  g.strokeStyle = "#3f6b2c"; g.lineWidth = 1.4;
  g.beginPath(); g.ellipse(bx, cy - 16, 9, 3.6, 0, 0, 6.29); g.stroke();
  for (let a = 0; a < 6.28; a += 0.5) { // folhinhas
    const ex = bx + Math.cos(a) * 9, ey = cy - 16 + Math.sin(a) * 3.6;
    g.fillStyle = (a % 1) < 0.5 ? "#4e7a3a" : "#6fa04e";
    e(g, ex, ey - 1, 1.5, 0.9, undefined);
  }
  P(g, bx - 1, cy - 20, 2, 2, "#3f6b2c"); // laço
};
const fisherHat = (g: G, bx: number, cy: number) => {
  const base = "#c9a86a", sh = "#9c7f45", hi = "#e2c890";
  e(g, bx, cy - 15, 11, 2.8, base); // aba
  P(g, bx - 11, cy - 15, 22, 1, sh);
  e(g, bx, cy - 18, 7, 4.5, base); // copa
  g.globalAlpha = 0.6; e(g, bx - 2, cy - 19, 3, 2, hi); g.globalAlpha = 1;
  P(g, bx - 7, cy - 16, 14, 1.5, sh); // faixa
};
const elderBeard = (g: G, bx: number, cy: number) => {
  const b = "#d9d6cc", bd = "#b7b3a6", bl = "#f2f0e8";
  // costeletas + queixo, contornando a boca (mantém o sorriso visível)
  for (const s of [-1, 1]) P(g, bx + s * 5 - 1, cy - 6, 2, 8, b);
  P(g, bx - 6, cy + 1, 12, 3, b); // base do bigode/laterais
  P(g, bx - 4, cy + 3, 8, 4, b); // queixo
  P(g, bx - 2, cy + 6, 4, 2, b); // ponta
  P(g, bx - 6, cy + 1, 12, 1, bl); // brilho
  P(g, bx - 3, cy + 6, 6, 1, bd); // sombra
};

// ---- armas de mão (loja) — desenhadas na mão direita ----
const wStaff = (g: G, hx: number, hy: number, t: number, reduce: boolean) => {
  P(g, hx, hy - 20, 2, 24, "#6b4a24"); // haste
  P(g, hx, hy - 20, 1, 24, "#8a6234");
  e(g, hx + 1, hy - 21, 3, 3, "#7a5230"); // castão
  if (!reduce) { g.globalAlpha = 0.25 + Math.abs(Math.sin(t * 0.02)) * 0.2; e(g, hx + 1, hy - 21, 4, 4, "#ffe9a8"); g.globalAlpha = 1; }
};
const wSling = (g: G, hx: number, hy: number) => {
  g.strokeStyle = "#7a5230"; g.lineWidth = 1;
  g.beginPath(); g.moveTo(hx, hy); g.lineTo(hx - 3, hy - 12); g.moveTo(hx + 2, hy); g.lineTo(hx + 5, hy - 12); g.stroke();
  P(g, hx - 3, hy, 6, 3, "#5a3c22"); // bolsa de couro
  e(g, hx, hy + 1, 1.6, 1.6, "#8a8f98"); // pedra
};
const wShofar = (g: G, hx: number, hy: number) => {
  const h = "#d8c9a0", hd = "#b39f72";
  g.fillStyle = h; g.beginPath();
  g.moveTo(hx, hy + 2); g.quadraticCurveTo(hx + 10, hy - 2, hx + 14, hy - 12);
  g.quadraticCurveTo(hx + 12, hy - 4, hx + 3, hy + 1); g.closePath(); g.fill();
  g.fillStyle = hd; P(g, hx, hy - 1, 3, 3, hd);
  e(g, hx + 13, hy - 12, 2.2, 2.2, "#efe6cf"); // boca do chifre
};
const wTorch = (g: G, hx: number, hy: number, t: number, reduce: boolean) => {
  P(g, hx, hy - 12, 2, 16, "#6b4a24"); // cabo
  const fl = reduce ? 0 : Math.sin(t * 0.03);
  g.globalAlpha = 0.25; e(g, hx + 1, hy - 15, 5, 7, FL1); g.globalAlpha = 1;
  e(g, hx + 1, hy - 14, 2.6, 3.6, FL1);
  e(g, hx + 1 + fl, hy - 16, 1.7, 2.6, FL2);
  e(g, hx + 1 + fl, hy - 18, 1, 1.6, FL3);
};
const wSpear = (g: G, hx: number, hy: number) => {
  P(g, hx, hy - 22, 2, 28, "#6b4a24"); // haste longa
  g.fillStyle = ST_H; tri3(g, hx + 1, hy - 30, hx - 2, hy - 22, hx + 4, hy - 22); // ponta
  P(g, hx - 1, hy - 23, 4, 2, GLD); // colar
};
const wHarp = (g: G, hx: number, hy: number) => {
  g.strokeStyle = GLD; g.lineWidth = 2;
  g.beginPath(); g.moveTo(hx - 1, hy + 3); g.lineTo(hx - 1, hy - 12);
  g.quadraticCurveTo(hx + 9, hy - 12, hx + 7, hy + 3); g.stroke();
  g.strokeStyle = GLD_H; g.lineWidth = 0.5;
  for (let i = 0; i < 4; i++) { g.beginPath(); g.moveTo(hx + i * 1.6, hy - 9 + i); g.lineTo(hx + i * 1.6, hy + 2); g.stroke(); }
  P(g, hx - 2, hy + 2, 10, 2, "#b8862f"); // base
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

  // ---- AURA (efeito robusto, bem atrás de tudo) ----
  if (look.aura === "pillar") auraPillar(g, bx, fY, cy, t, reduce);
  else if (look.aura === "shekinah") auraShekinah(g, bx, cy, t, reduce);
  else if (look.aura === "glory") auraGlory(g, bx, cy, t, reduce);
  else if (look.aura === "chariot") auraChariot(g, bx, cy, t, reduce);
  else if (look.aura === "ark") auraArk(g, bx, cy, t, reduce);

  // sombra
  g.globalAlpha = 0.28;
  e(g, bx, fY + 3, 13, 3, "#000");
  g.globalAlpha = 1;

  if (look.head === "halo") {
    g.globalAlpha = 0.16;
    e(g, bx, cy - 2, 18, 24, "#fff3c8");
    g.globalAlpha = 1;
  }
  if (look.wings !== "none") wings(g, bx, cy, t, reduce, look.wings);

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

  // coraçãozinho no peito — azul mais escuro que o corpo
  const drawEmberAt = (yc: number) => {
    const HC = "#173257",
      HCd = "#0d1f3a",
      HCl = "#274a80";
    R(bx - 2, yc, 2, 1, HC); // dois topos
    R(bx + 1, yc, 2, 1, HC);
    R(bx - 2, yc + 1, 5, 1, HC); // corpo
    R(bx - 2, yc + 2, 5, 1, HC);
    R(bx - 1, yc + 3, 3, 1, HC);
    R(bx, yc + 4, 1, 1, HC); // ponta
    R(bx + 1, yc + 1, 1, 2, HCd); // sombra
    R(bx - 1, yc + 1, 1, 1, HCl); // brilho sutil
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
    else if (look.robe === "priest") { rb = "#e6e3d6"; rl = "#ffffff"; rd = "#bcb9a6"; }
    else if (look.robe === "ephod") { rb = "#d8cdb4"; rl = "#efe7d2"; rd = "#ada086"; }
    else if (look.robe === "shepherd") { rb = "#8f7047"; rl = "#b0925f"; rd = "#5f4a2c"; }
    else if (look.robe === "purple") { rb = "#5b2a86"; rl = "#7d44ad"; rd = "#3a1a5c"; }
    else if (look.robe === "sackcloth") { rb = "#6b6258"; rl = "#847a6d"; rd = "#4a443c"; }
    else if (look.robe === "wedding") { rb = "#f1eee4"; rl = "#ffffff"; rd = "#d6d0c0"; }
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
    } else if (look.robe === "priest") {
      const gg = edges(top);
      R(gg.lX, cy + top, gg.rX - gg.lX + 1, 1, GLD); // gola dourada
      g.save(); g.translate(bx, cy + 9); g.rotate(-0.5); // faixa azul
      R(-12, -1.5, 24, 3, "#2f5aa8"); R(-12, -1.5, 24, 1, "#5b86d6"); g.restore();
      const h = edges(HH - 3); // barra azul/púrpura/escarlate (Êx 28)
      R(h.lX, cy + HH - 3, h.rX - h.lX + 1, 1, "#2f5aa8");
      R(h.lX, cy + HH - 2, h.rX - h.lX + 1, 1, "#7c3aa0");
      R(h.lX, cy + HH - 1, h.rX - h.lX + 1, 1, "#b23a48");
      drawEmberAt(cy + 11);
    } else if (look.robe === "ephod") {
      R(bx - 6, cy + 5, 12, 12, GLD); // peitoral dourado
      R(bx - 6, cy + 5, 12, 1, GLD_H); R(bx - 6, cy + 5, 1, 12, GLD_H);
      const gem = ["#b23a48", "#e0a020", "#3aa06a", "#2f5aa8", "#7c3aa0", "#d05a2a", "#2f9ca8", "#c0d040", "#a02f6a", "#4a6ad0", "#d0a040", "#40b070"];
      let gi = 0;
      for (let row = 0; row < 4; row++) for (let col = 0; col < 3; col++) R(bx - 5 + col * 4, cy + 6 + row * 3, 2, 2, gem[gi++]); // 12 pedras
      const b = edges(HH - 4);
      R(b.lX, cy + HH - 4, b.rX - b.lX + 1, 2, "#2f5aa8"); // cinto tecido
    } else if (look.robe === "shepherd") {
      for (const fx of [-7, -3, 1, 5]) R(bx + fx, cy + top + 1, 1, HH - top - 3, rd); // lã (listras)
      for (let i = -7; i <= 5; i += 3) R(bx + i, cy + top, 2, 2, rl); // gola de lã
      const c = edges(11);
      R(c.lX, cy + 11, c.rX - c.lX + 1, 1, "#4a3620"); // corda
      drawEmberAt(cy + 12);
    } else if (look.robe === "purple") {
      R(bx - 1, cy + top, 2, HH - top - 3, GLD); // placket dourado
      R(bx - 1, cy + top, 1, HH - top - 3, GLD_H);
      R(bx - 8, cy + top, 16, 1, GLD); // gola dourada
      e(g, bx, cy + 6, 2, 2, "#e0c040"); // broche
      const b = edges(HH - 4);
      R(b.lX, cy + HH - 4, b.rX - b.lX + 1, 2, GLD); // cinto dourado
    } else if (look.robe === "sackcloth") {
      for (const [dx, dy] of [[-6, 4], [3, 6], [-2, 10], [6, 12], [-8, 13], [1, 3]] as const) R(bx + dx, cy + dy, 1, 1, rd); // textura
      R(bx + 2, cy + 9, 4, 4, "#544c42"); R(bx + 2, cy + 9, 4, 1, rd); R(bx + 2, cy + 9, 1, 4, rd); // remendo
      const b = edges(HH - 2);
      for (let x = b.lX; x <= b.rX; x += 2) R(x, cy + HH - 1, 1, 2, rd); // barra desfiada
      g.globalAlpha = 0.4; e(g, bx - 4, cy + top + 1, 4, 2, "#9a938a"); g.globalAlpha = 1; // cinza
    } else if (look.robe === "wedding") {
      const gg = edges(top);
      R(gg.lX, cy + top, gg.rX - gg.lX + 1, 1, GLD_H); // gola clara
      R(bx - 1, cy + top, 2, HH - top - 3, "#f7f4ea"); // faixa luminosa
      const b = edges(HH - 3);
      R(b.lX, cy + HH - 3, b.rX - b.lX + 1, 2, GLD_H); // barra dourada
      if (!reduce) g.globalAlpha = 0.5 + Math.sin(t * 0.02) * 0.3;
      for (const [dx, dy] of [[-5, 7], [4, 10], [0, 13]] as const) R(bx + dx, cy + dy, 1, 1, "#fffdf2"); // brilhos
      g.globalAlpha = 1;
      drawEmberAt(cy + 11);
    }
    // ombreiras por cima dos braços (liga o traje aos braços)
    R(bx - BW - 3, armY + armSw - 1, 6, 3, rl);
    R(bx + BW - 1, armY - armSw - 1, 6, 3, rl);
    R(bx - BW - 3, armY + armSw - 1, 6, 1, rd);
    R(bx + BW - 1, armY - armSw - 1, 6, 1, rd);
  } else {
    drawEmberAt(cy + 9);
  }

  // ---- BARBA (sobre a gola do traje, contornando o rosto) ----
  if (look.beard) elderBeard(g, bx, cy);

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
  else if (look.head === "turban") turban(g, bx, cy);
  else if (look.head === "thorns") thornsCrown(g, bx, cy);
  else if (look.head === "kefiah") kefiah(g, bx, cy);
  else if (look.head === "olive") oliveWreath(g, bx, cy);
  else if (look.head === "fisher") fisherHat(g, bx, cy);
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
  const handX = bx + BW + 3,
    handY = armY - armSw + 1; // mão direita
  // arma da loja tem prioridade (ocupa a mão); senão, a espada-recompensa
  if (look.weapon === "staff") wStaff(g, handX, handY, t, reduce);
  else if (look.weapon === "sling") wSling(g, handX, handY);
  else if (look.weapon === "shofar") wShofar(g, handX, handY);
  else if (look.weapon === "torch") wTorch(g, handX, handY, t, reduce);
  else if (look.weapon === "spear") wSpear(g, handX, handY);
  else if (look.weapon === "harp") wHarp(g, handX, handY);
  else if (look.sword) {
    const hx = handX, hy = handY;
    R(hx, hy - 15, 2, 15, ST_H); // lâmina
    R(hx, hy - 15, 1, 15, "#eef4ff");
    R(hx, hy - 16, 2, 1, ST_L); // ponta
    R(hx - 2, hy - 1, 6, 1, GLD); // guarda
    R(hx, hy, 2, 4, "#6b4a24"); // punho na mão
    R(hx, hy + 4, 2, 1, GLD);
  }
}
