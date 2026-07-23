// ============================================================================
// RPG Actors — biblioteca pixel-art de PERSONAGENS e PROPS bíblicos.
// Reutilizável por qualquer cena/capítulo. Tudo em fillRect inteiro (pixel
// puro), com paleta retrô coerente com o mascote. As cenas (rpgLivingV2)
// compõem estes elementos por versículo pra dramatizar o texto.
// ============================================================================

export type Rect = (x: number, y: number, w: number, h: number, c: string) => void;

// helper de pixel arredondado/inteiro a partir de um contexto
export function pixel(g: CanvasRenderingContext2D): Rect {
  return (x, y, w, h, c) => {
    g.fillStyle = c;
    g.fillRect(Math.round(x), Math.round(y), Math.max(1, Math.round(w)), Math.max(1, Math.round(h)));
  };
}

// ---- paletas de vestes ----
export type Palette = "brown" | "blue" | "red" | "purple" | "white" | "green" | "sand" | "gray" | "gold";
const ROBES: Record<Palette, { robe: string; robeD: string }> = {
  brown: { robe: "#7a5a34", robeD: "#5c4225" },
  blue: { robe: "#3b6ea8", robeD: "#274c78" },
  red: { robe: "#a8443c", robeD: "#7c2f2a" },
  purple: { robe: "#7a4c86", robeD: "#573463" },
  white: { robe: "#dfe4ee", robeD: "#b3bccb" },
  green: { robe: "#3f7a44", robeD: "#2c5730" },
  sand: { robe: "#c9a86a", robeD: "#a5854b" },
  gray: { robe: "#8a8f99", robeD: "#666b74" },
  gold: { robe: "#e8b04b", robeD: "#b07f2b" },
};

export type FigureAction = "stand" | "walk" | "kneel" | "raise" | "mourn" | "carry" | "bow" | "lie" | "fight";
export interface FigureSpec {
  role?: "man" | "woman" | "elder" | "shepherd" | "king" | "child" | "servant" | "angel" | "warrior";
  action?: FigureAction;
  palette?: Palette;
  skin?: string;
  scale?: number; // 1 ~ 24px de altura
  facing?: 1 | -1;
  t?: number; // tempo p/ animação (ms)
  reduce?: boolean;
  alpha?: number;
}

/** Desenha uma figura humana bíblica. (x = centro, fy = chão sob os pés) */
export function drawFigure(g: CanvasRenderingContext2D, x: number, fy: number, spec: FigureSpec = {}): void {
  const { role = "man", action = "stand", palette = "brown", scale = 1, facing = 1, t = 0, reduce = false } = spec;
  const R = pixel(g);
  const S = scale;
  const sk = spec.skin || (role === "angel" ? "#f3ead2" : "#d9a06b");
  const skd = "#b07a44";
  const pal = role === "angel" ? ROBES.white : ROBES[palette];
  const robe = pal.robe, robeD = pal.robeD;
  const hair = role === "elder" ? "#d8d8d8" : role === "angel" ? "#ffe9a8" : "#2a1c10";
  const prevA = g.globalAlpha;
  if (spec.alpha != null) g.globalAlpha = prevA * spec.alpha;

  const bob = reduce ? 0 : Math.round(Math.sin(t * 0.004 + x) * 0.6);
  const step = !reduce && action === "walk" ? Math.sin(t * 0.012) : 0;
  const cx = x;

  // asas do anjo (atrás)
  if (role === "angel") {
    for (let i = 0; i < 7; i++) { R(cx - 6 * S - i, fy - 20 * S + i, 3, 2, i % 2 ? "#eef4ff" : "#cdd9ef"); R(cx + 4 * S + i, fy - 20 * S + i, 3, 2, i % 2 ? "#eef4ff" : "#cdd9ef"); }
  }

  const headY = fy - 22 * S + bob;
  const bodyTop = fy - 16 * S + bob;

  if (action === "lie") {
    // deitado (morte/descanso)
    R(cx - 11 * S, fy - 4, 22 * S, 4, robe);
    R(cx - 12 * S, fy - 4, 5, 4, sk); // cabeça
    R(cx + 8 * S, fy - 5, 4, 2, sk); // pés
    if (spec.alpha != null) g.globalAlpha = prevA;
    return;
  }

  // pernas / túnica base (com passo se andando)
  const legSpread = action === "walk" ? Math.round(step * 3) : 0;
  for (let i = 0; i < 10; i++) { const w = 4 * S + Math.round(i * 0.5 * S); R(cx - w, fy - 2 - i + bob, w * 2, 1, i < 5 ? robeD : robe); }
  if (action === "walk") { R(cx - 3 * S + legSpread, fy - 3, 2, 3, robeD); R(cx + 1 * S - legSpread, fy - 3, 2, 3, robeD); }

  // tronco
  R(cx - 4 * S, bodyTop, 8 * S, 7 * S, robe);
  R(cx - 4 * S, bodyTop + 5 * S, 8 * S, 1, robeD);

  // braços conforme ação
  const armY = bodyTop + 1;
  if (action === "raise") { R(cx - 6 * S, headY - 2, 2, 8 * S, sk); R(cx + 4 * S, headY - 2, 2, 8 * S, sk); }
  else if (action === "mourn") { R(cx - 5 * S, headY + 3, 2, 4 * S, sk); R(cx + 3 * S, headY + 3, 2, 4 * S, sk); }
  else if (action === "carry") { R(cx + 4 * S * facing, armY, 4 * S, 2, sk); }
  else if (action === "kneel" || action === "bow") { R(cx - 6 * S, armY + 2, 2, 4 * S, sk); R(cx + 4 * S, armY + 2, 2, 4 * S, sk); }
  else if (action === "fight") { R(cx + 4 * S * facing, armY - 2, 2, 6 * S, sk); }
  else { R(cx - 6 * S, armY, 2, 6 * S, sk); R(cx + 4 * S, armY, 2, 6 * S, sk); }

  // pescoço + cabeça
  R(cx - 2 * S, headY + 4 * S, 4 * S, 2, sk);
  R(cx - 3 * S, headY, 6 * S, 5 * S, sk);
  R(cx - 3 * S, headY + 4 * S, 6 * S, 1, skd);
  // olhos
  const eo = action === "mourn" ? 0 : 1;
  if (eo) { R(cx - 2 * S, headY + 2 * S, 1, 1, "#2a1a10"); R(cx + 1 * S, headY + 2 * S, 1, 1, "#2a1a10"); }

  // cabelo / cobertura por papel
  if (role === "woman") { R(cx - 4 * S, headY - 1, 8 * S, 3, hair); R(cx - 4 * S, headY + 1, 1, 7 * S, hair); R(cx + 3 * S, headY + 1, 1, 7 * S, hair); }
  else if (role === "elder") { R(cx - 3 * S, headY - 1, 6 * S, 2, hair); R(cx - 2 * S, headY + 6 * S, 4 * S, 3, hair); /* barba */ }
  else if (role === "king") { R(cx - 3 * S, headY - 3, 6 * S, 3, "#e8b04b"); R(cx - 3 * S, headY - 3, 1, 3, "#fff2cc"); R(cx + 2 * S, headY - 3, 1, 3, "#fff2cc"); }
  else { R(cx - 3 * S, headY - 1, 6 * S, 2, hair); R(cx - 3 * S, headY, 1, 2, hair); R(cx + 2 * S, headY, 1, 2, hair); }

  // auréola do anjo
  if (role === "angel") { g.globalAlpha = (spec.alpha ?? 1) * prevA * 0.9; R(cx - 3 * S, headY - 4, 6 * S, 1, "#ffe9a8"); g.globalAlpha = spec.alpha != null ? prevA * spec.alpha : prevA; }

  // adereços
  if (role === "shepherd") { R(cx + 6 * S, fy - 20 * S, 1, 18 * S, "#6a4a24"); R(cx + 6 * S, fy - 20 * S, 3, 2, "#6a4a24"); } // cajado
  if (role === "warrior") { R(cx - 8 * S, bodyTop, 3, 8 * S, "#9aa3b0"); R(cx - 8 * S, bodyTop - 1, 3, 1, "#c7d0dc"); } // escudo

  if (spec.alpha != null) g.globalAlpha = prevA;
}

// ---- animais ----
export function drawAnimal(g: CanvasRenderingContext2D, x: number, fy: number, kind: "sheep" | "camel" | "ox" | "goat" | "lion", scale = 1, color?: string): void {
  const R = pixel(g); const S = scale; const cx = x;
  if (kind === "camel") {
    const c = color || "#b98a4e"; R(cx - 8 * S, fy - 9 * S, 16 * S, 5 * S, c); R(cx - 6 * S, fy - 12 * S, 4 * S, 3 * S, c); R(cx + 2 * S, fy - 12 * S, 4 * S, 3 * S, c);
    R(cx + 7 * S, fy - 13 * S, 2 * S, 7 * S, c); R(cx + 8 * S, fy - 14 * S, 3 * S, 2 * S, c); // pescoço+cabeça
    for (const lx of [-6, -2, 3, 6]) R(cx + lx * S, fy - 4 * S, 1 * S, 4 * S, "#8a6636");
    return;
  }
  if (kind === "ox") { const c = color || "#6a4a2c"; R(cx - 8 * S, fy - 8 * S, 16 * S, 6 * S, c); R(cx + 6 * S, fy - 11 * S, 4 * S, 4 * S, c); R(cx + 9 * S, fy - 12 * S, 2, 2, "#e8e0cf"); for (const lx of [-6, -2, 3, 6]) R(cx + lx * S, fy - 2 * S, 1 * S, 2 * S, "#3a2a1a"); return; }
  if (kind === "lion") { const c = color || "#c79a4a"; R(cx - 8 * S, fy - 7 * S, 15 * S, 5 * S, c); R(cx - 9 * S, fy - 10 * S, 6 * S, 6 * S, "#a97d34"); R(cx - 7 * S, fy - 8 * S, 3 * S, 3 * S, c); for (const lx of [-6, -1, 3, 6]) R(cx + lx * S, fy - 3 * S, 1 * S, 3 * S, "#8a6636"); return; }
  if (kind === "goat") { const c = color || "#8a8078"; R(cx - 6 * S, fy - 7 * S, 12 * S, 4 * S, c); R(cx + 5 * S, fy - 9 * S, 3 * S, 3 * S, c); R(cx + 5 * S, fy - 11 * S, 1, 2 * S, "#efe7d6"); for (const lx of [-4, 0, 3]) R(cx + lx * S, fy - 3 * S, 1 * S, 3 * S, "#5a5049"); return; }
  // sheep
  const c = color || "#e6e2d6"; R(cx - 6 * S, fy - 7 * S, 12 * S, 5 * S, c); R(cx + 5 * S, fy - 8 * S, 3 * S, 3 * S, "#c9b79a"); for (const lx of [-4, 0, 3]) R(cx + lx * S, fy - 2 * S, 1 * S, 2 * S, "#7a6a52");
}

// ---- props / cenário pontual ----
export interface PropOpts { scale?: number; t?: number; reduce?: boolean; fire?: number; alpha?: number }
export function drawProp(g: CanvasRenderingContext2D, kind: string, x: number, fy: number, o: PropOpts = {}): void {
  const R = pixel(g); const S = o.scale ?? 1; const t = o.t ?? 0; const reduce = o.reduce; const cx = x;
  const prevA = g.globalAlpha; if (o.alpha != null) g.globalAlpha = prevA * o.alpha;
  switch (kind) {
    case "altar": {
      R(cx - 8 * S, fy - 10 * S, 16 * S, 10 * S, "#8a7a5a"); R(cx - 8 * S, fy - 10 * S, 16 * S, 2, "#a59570"); R(cx - 8 * S, fy - 4 * S, 16 * S, 1, "#6a5c40");
      if (o.fire && o.fire > 0.01) { const f = o.fire; const fl = reduce ? 6 : 6 + Math.sin(t * 0.02) * 2; g.globalAlpha = (o.alpha ?? 1) * prevA * f; R(cx - 3 * S, fy - 12 * S - fl, 6 * S, fl, "#ff8a3a"); R(cx - 2 * S, fy - 12 * S - fl - 2, 4 * S, 3, "#ffd070"); g.globalAlpha = o.alpha != null ? prevA * o.alpha : prevA; }
      break;
    }
    case "tent": { R(cx - 12 * S, fy - 2, 24 * S, 2, "#5c4225"); for (let i = 0; i < 12 * S; i++) { R(cx - i, fy - 2 - i, 1, 1, "#9a6a3a"); R(cx + i, fy - 2 - i, 1, 1, "#7a5028"); } R(cx - 1, fy - 8 * S, 2, 6 * S, "#3a2a18"); break; }
    case "well": { R(cx - 6 * S, fy - 8 * S, 12 * S, 8 * S, "#7a7268"); R(cx - 6 * S, fy - 8 * S, 12 * S, 2, "#9a9288"); R(cx - 5 * S, fy - 6 * S, 10 * S, 4 * S, "#243244"); R(cx - 1, fy - 14 * S, 2, 6 * S, "#5a4630"); R(cx - 6 * S, fy - 14 * S, 12 * S, 2, "#5a4630"); break; }
    case "tree": { const th = 12 * S; R(cx - 1, fy - th, 3, th, "#5a3a1e"); g.fillStyle = "#2f7a34"; g.beginPath(); g.arc(cx + 1, fy - th, 7 * S, 0, 6.29); g.fill(); g.fillStyle = "#3f9a44"; g.beginPath(); g.arc(cx - 2, fy - th - 2, 4 * S, 0, 6.29); g.fill(); break; }
    case "palm": { const th = 16 * S; R(cx - 1, fy - th, 2, th, "#6a4a24"); for (let a = 0; a < 6; a++) { const an = Math.PI + (a / 5) * Math.PI; R(cx + Math.cos(an) * 8 * S, fy - th + Math.sin(an) * 6 * S - 2, 6 * S, 1, "#3f8a3f"); } break; }
    case "ark": { // arca de Noé (barco grande)
      R(cx - 22 * S, fy - 12 * S, 44 * S, 12 * S, "#6a4a2c"); R(cx - 22 * S, fy - 12 * S, 44 * S, 2, "#8a6a44"); R(cx - 26 * S, fy - 6 * S, 6 * S, 6 * S, "#5c3f24"); R(cx + 20 * S, fy - 6 * S, 6 * S, 6 * S, "#5c3f24");
      R(cx - 16 * S, fy - 22 * S, 32 * S, 10 * S, "#7a5636"); R(cx - 14 * S, fy - 20 * S, 4 * S, 4 * S, "#3a2a18"); R(cx + 10 * S, fy - 20 * S, 4 * S, 4 * S, "#3a2a18"); break; }
    case "ladder": { // escada de Jacó
      for (let i = 0; i < 12; i++) { const yy = fy - i * 6 * S; R(cx - 6 * S + i * 1.2 * S, yy, 2, 2, "#e8d9a8"); R(cx + 4 * S + i * 1.2 * S, yy, 2, 2, "#e8d9a8"); R(cx - 5 * S + i * 1.2 * S, yy, 9 * S, 1, "#cdbf8a"); }
      break; }
    case "tower": { // torre de Babel (zigurate)
      for (let i = 0; i < 5; i++) { const w = (18 - i * 3) * S; R(cx - w, fy - (i + 1) * 6 * S, w * 2, 6 * S, i % 2 ? "#9a7a4a" : "#b08a54"); } break; }
    case "ram": { R(cx - 4 * S, fy - 6 * S, 8 * S, 4 * S, "#e6e2d6"); R(cx + 3 * S, fy - 8 * S, 3 * S, 3 * S, "#c9b79a"); R(cx + 5 * S, fy - 9 * S, 2, 2, "#8a6a3a"); g.fillStyle = "#2f6f2f"; g.beginPath(); g.arc(cx, fy - 3 * S, 6 * S, Math.PI, 0); g.fill(); break; } // preso no arbusto
    case "dove": { const up = reduce ? 0 : Math.sin(t * 0.02) > 0 ? 1 : 0; R(cx - 2, fy - up, 4, 2, "#eef4ff"); R(cx - 3, fy - 1 - up, 2, 1, "#dfe7f0"); R(cx + 2, fy - 1 - up, 2, 1, "#dfe7f0"); break; }
    case "star": { R(cx, fy, 1, 1, "#fff"); R(cx - 1, fy, 3, 1, "#eef4ff"); R(cx, fy - 1, 1, 3, "#eef4ff"); break; }
    default: break;
  }
  if (o.alpha != null) g.globalAlpha = prevA;
}
