// ============================================================================
// RPG Living Scene — "Leitura Viva": a cena encena o texto em tempo real
// ----------------------------------------------------------------------------
// Enquanto o jogador avança versículo a versículo, o cenário se transforma para
// dramatizar o que está sendo lido. Capítulos-ícone (ex.: Gênesis 1 — a Criação)
// têm um "roteiro" próprio; os demais usam a cena de região padrão (rpgScene).
//
// Este módulo desenha SÓ o pano de fundo (céu, água, terra, criaturas, luz…).
// O herói/mascote, a caixa de diálogo e o chefe continuam sendo desenhados pela
// RPGReadingScene por cima. Puramente visual.
// ============================================================================

import type { SceneDims } from "@/lib/rpgScene";

export type LivingSceneKey = string; // `${bookId}:${chapter}`

const SCRIPTED = new Set<LivingSceneKey>(["genesis:1"]);

export function hasLivingScene(bookId: string, chapter: number): boolean {
  return SCRIPTED.has(`${bookId}:${chapter}`);
}

// ---- estado da cena (uma leitura por vez) ----
type Scene = Record<string, number>;
const KEYS = ["day","water","spirit","light","firm","land","veg","sun","stars","fish","birds","animals","man","good"] as const;
const blank = (): Scene => Object.fromEntries(KEYS.map((k) => [k, 0])) as Scene;

// Roteiro do Gênesis 1: número do versículo -> estado-alvo (acumulativo).
function targetGenesis1(n: number): Scene {
  const T = blank();
  if (n >= 1)  { T.day = 0.06; T.water = 1; T.spirit = 1; }
  if (n >= 3)  { T.day = 0.34; T.light = 1; T.spirit = 0.3; }
  if (n >= 6)  { T.day = 0.50; T.firm = 1; T.light = 0.2; }
  if (n >= 9)  { T.day = 0.52; T.land = 1; T.light = 0.15; }
  if (n >= 11) { T.day = 0.56; T.veg = 1; T.light = 0.12; }
  if (n >= 14) { T.day = 1; T.sun = 1; T.stars = 0.5; T.light = 0.1; }
  if (n >= 20) { T.fish = 1; T.birds = 1; }
  if (n >= 24) { T.animals = 1; }
  if (n >= 26) { T.man = 1; }
  if (n >= 31) { T.good = 1; }
  return T;
}

function targetFor(key: LivingSceneKey, verseNumber: number): Scene {
  // Só Gênesis 1 por enquanto; novos capítulos-ícone entram aqui.
  return targetGenesis1(verseNumber);
}

// posições decorativas em fração de W (robusto a qualquer largura de câmera)
let deco: { key: string; trees: { x: number; s: number }[]; grass: number[]; fish: { x: number; y: number; sp: number; ph: number }[]; birds: { x: number; y: number; sp: number; ph: number }[]; anims: { x: number; k: number }[]; stars: { x: number; y: number; p: number; s: number }[]; motes: { x: number; y: number; ph: number; sp: number }[] } | null = null;
function ensureDeco(key: string, dims: SceneDims) {
  if (deco && deco.key === key) return deco;
  let s = 101;
  const rnd = () => (s = (s * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;
  deco = {
    key,
    trees: [0.19, 0.27, 0.69, 0.79, 0.86].map((f, i) => ({ x: f, s: 0.8 + (i % 3) * 0.15 })),
    grass: Array.from({ length: 22 }, (_, i) => (i + 0.5) / 22),
    fish: Array.from({ length: 6 }, () => ({ x: rnd(), y: 0.55 + rnd() * 0.35, sp: 0.02 + rnd() * 0.03, ph: rnd() * 6.28 })),
    birds: Array.from({ length: 7 }, () => ({ x: rnd(), y: 0.12 + rnd() * 0.34, sp: 0.03 + rnd() * 0.03, ph: rnd() * 6.28 })),
    anims: [{ x: 0.58, k: 0 }, { x: 0.37, k: 1 }, { x: 0.7, k: 0 }],
    stars: Array.from({ length: 40 }, () => ({ x: rnd(), y: rnd() * 0.5, p: rnd() * 6.28, s: rnd() < 0.2 ? 2 : 1 })),
    motes: Array.from({ length: 12 }, () => ({ x: rnd(), y: 0.35 + rnd() * 0.35, ph: rnd() * 6.28, sp: 0.0006 + rnd() * 0.0008 })),
  };
  return deco;
}

const state: { key: LivingSceneKey | null; s: Scene } = { key: null, s: blank() };
const lerp = (a: number, b: number, f: number) => a + (b - a) * f;
const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

interface DrawLivingOpts {
  key: LivingSceneKey;
  verseNumber: number;
  dims: SceneDims;
  t: number;
  reduce: boolean;
}

/** Desenha o pano de fundo dramatizado para o versículo atual. */
export function drawLivingScene(g: CanvasRenderingContext2D, o: DrawLivingOpts): void {
  const { key, verseNumber, dims, t, reduce } = o;
  const W = dims.W, H = dims.H, GROUND = dims.GROUND;
  const d = ensureDeco(key, dims);
  const tgt = targetFor(key, verseNumber);
  if (state.key !== key) { state.key = key; state.s = { ...tgt }; } // snap ao abrir
  const k = reduce ? 1 : 0.06;
  for (const key2 of KEYS) state.s[key2] = lerp(state.s[key2], tgt[key2], k);
  const s = state.s;

  const R = (x: number, y: number, w: number, h: number, c: string) => { g.fillStyle = c; g.fillRect(Math.round(x), Math.round(y), Math.max(1, Math.round(w)), Math.max(1, Math.round(h))); };
  const { day, water, spirit, light, firm, land, veg, sun, stars, fish, birds, animals, man, good } = s;

  // céu
  const top = [lerp(8, 90, day), lerp(12, 150, day), lerp(26, 205, day)].map(Math.round);
  const bot = [lerp(10, 150, day), lerp(24, 190, day), lerp(52, 150, day)].map(Math.round);
  const grd = g.createLinearGradient(0, 0, 0, GROUND + 8);
  grd.addColorStop(0, `rgb(${top.join(",")})`); grd.addColorStop(1, `rgb(${bot.join(",")})`);
  g.fillStyle = grd; g.fillRect(0, 0, W, GROUND + 8);
  if (good > 0.01) { g.globalAlpha = good * 0.2; g.fillStyle = "#ffcf6a"; g.fillRect(0, 0, W, H); g.globalAlpha = 1; }

  // estrelas
  if (stars > 0.01) { for (const st of d.stars) { const tw = reduce ? 1 : 0.6 + 0.4 * Math.sin(t * 0.005 + st.p); g.globalAlpha = stars * tw * 0.9; R(st.x * W, st.y * GROUND, st.s, st.s, "#eef4ff"); } g.globalAlpha = 1; }

  // sol + lua
  if (sun > 0.01) {
    const sx = W * 0.82, sy = lerp(GROUND * 0.5, GROUND * 0.22, sun); g.globalAlpha = sun;
    for (let r = 10; r >= 6; r--) { g.fillStyle = r > 8 ? "#ffcf5a" : "#ffd980"; g.beginPath(); g.arc(sx, sy, r, 0, 6.29); g.fill(); }
    g.globalAlpha = sun * 0.25; g.fillStyle = "#ffe9a8"; g.beginPath(); g.arc(sx, sy, 16, 0, 6.29); g.fill();
    const mx = W * 0.16, my = GROUND * 0.28; g.globalAlpha = sun * 0.85; g.fillStyle = "#dfe7f0"; g.beginPath(); g.arc(mx, my, 6, 0, 6.29); g.fill();
    g.fillStyle = `rgb(${top.join(",")})`; g.beginPath(); g.arc(mx + 2.5, my - 1.5, 5, 0, 6.29); g.fill(); g.globalAlpha = 1;
  }

  // "Haja luz" — clarão radial
  if (light > 0.01) {
    const lx = W / 2, ly = GROUND * 0.35, rad = GROUND * 0.9;
    const gl = g.createRadialGradient(lx, ly, 4, lx, ly, rad);
    gl.addColorStop(0, `rgba(255,240,180,${0.9 * light})`); gl.addColorStop(0.5, `rgba(255,215,120,${0.32 * light})`); gl.addColorStop(1, "rgba(255,215,120,0)");
    g.fillStyle = gl; g.fillRect(0, 0, W, GROUND);
  }

  // firmamento
  if (firm > 0.01) { g.globalAlpha = firm * 0.5; const fh = Math.min(52, GROUND * 0.4); const fg = g.createLinearGradient(0, GROUND - fh, 0, GROUND); fg.addColorStop(0, "rgba(120,180,220,0)"); fg.addColorStop(1, "rgba(150,200,230,.5)"); g.fillStyle = fg; g.fillRect(0, GROUND - fh, W, fh); g.globalAlpha = 1; }

  // nuvens
  if (day > 0.4) { g.globalAlpha = Math.min(1, (day - 0.4) / 0.5) * 0.85; const cl = [[0.22, 0.18], [0.6, 0.11], [0.83, 0.24]]; for (const [fx, fy] of cl) { const x = ((t * 0.004 + fx * W) % (W + 40)) - 20, y = fy * GROUND; g.fillStyle = "#eaf3fb"; for (const [dx, dy, w, h] of [[0, 4, 18, 5], [6, 0, 12, 6], [13, 3, 14, 5]] as const) g.fillRect((x + dx) | 0, (y + dy) | 0, w, h); } g.globalAlpha = 1; }

  // água
  if (water > 0.01) {
    const wl = GROUND - (land > 0.02 ? Math.round(land * 4) : 0);
    g.globalAlpha = water;
    const wg = g.createLinearGradient(0, wl, 0, H); wg.addColorStop(0, day > 0.5 ? "#2b6aa0" : "#15406b"); wg.addColorStop(1, "#0a1f36");
    g.fillStyle = wg; g.fillRect(0, wl, W, H - wl);
    for (let x = 0; x < W; x += 6) { const yy = wl + 1 + Math.round(Math.sin(x * 0.14 + t * 0.006) * 1.2); g.globalAlpha = water * 0.4; R(x, yy, 3, 1, "#bfe0ff"); }
    g.globalAlpha = 1;
  }

  // peixes
  if (fish > 0.01) { g.globalAlpha = fish; for (const f of d.fish) { if (!reduce) f.x = (f.x + f.sp / 10) % 1.05; const x = f.x * W, y = (GROUND + (H - GROUND) * (f.y - 0.5)); const yy = y + Math.sin(t * 0.01 + f.ph) * 2; R(x, yy, 4, 2, "#4aa3c8"); R(x - 2, yy, 2, 2, "#3b8bb0"); R(x + 4, yy - 1, 1, 1, "#bfeaff"); } g.globalAlpha = 1; }

  // terra
  const amp = lerp(0, 22, ease(land));
  const hillY = (x: number) => GROUND - amp * (0.6 + 0.4 * Math.sin(x * 0.03) + 0.2 * Math.sin(x * 0.11));
  if (land > 0.01) {
    g.fillStyle = "#5a4326";
    for (let x = 0; x < W; x++) { const y = hillY(x); g.fillRect(x, y, 1, H - y); }
    if (veg > 0.01) { g.globalAlpha = veg; for (let x = 0; x < W; x++) R(x, hillY(x), 1, 2, "#3f8a3f"); g.globalAlpha = 1; }
  }

  // vegetação + vaga-lumes
  if (veg > 0.01) {
    g.globalAlpha = veg;
    for (const f of d.grass) { const gx = f * W, y = hillY(gx) - 3; R(gx, y, 1, 3, "#2f6f2f"); R(gx + 1, y + 1, 1, 2, "#3f8a3f"); }
    for (const tr of d.trees) { const tx = tr.x * W, gy = hillY(tx), th = Math.round(10 * tr.s * ease(veg)); R(tx, gy - th, 2, th, "#5a3a1e"); g.fillStyle = "#2f7a34"; g.beginPath(); g.arc(tx + 1, gy - th, 6 * tr.s, 0, 6.29); g.fill(); g.fillStyle = "#3f9a44"; g.beginPath(); g.arc(tx - 1, gy - th - 1, 3.5 * tr.s, 0, 6.29); g.fill(); }
    g.globalAlpha = 1;
    for (const m of d.motes) { if (!reduce) { m.x = (m.x + m.sp) % 1; } const mx = m.x * W, my = m.y * GROUND + Math.sin(t * 0.003 + m.ph) * 4, a = veg * (0.35 + 0.4 * Math.sin(t * 0.006 + m.ph)); if (a > 0) { g.globalAlpha = a; R(mx, my, 1, 1, "#ffe9a8"); } }
    g.globalAlpha = 1;
  }

  // aves
  if (birds > 0.01) { g.globalAlpha = birds; for (const b of d.birds) { if (!reduce) b.x = (b.x + b.sp / 10) % 1.05; const x = b.x * W, y = (b.y * GROUND) | 0, up = (reduce ? 0 : Math.sin(t * 0.02 + b.ph)) > 0 ? 1 : 0, c = "#243b57"; R(x - 3, y + 1 - up, 2, 1, c); R(x - 1, y - up, 1, 1, c); R(x, y - 1, 1, 1, c); R(x + 1, y - up, 1, 1, c); R(x + 2, y + 1 - up, 2, 1, c); } g.globalAlpha = 1; }

  // animais
  if (animals > 0.01) { g.globalAlpha = animals; for (const a of d.anims) { const x = a.x * W, y = hillY(x) - 6; R(x, y, 10, 5, "#3a2a1a"); R(x + (a.k ? -1 : 9), y - 3, 3, 4, "#3a2a1a"); R(x + 1, y + 5, 2, 3, "#2a1e12"); R(x + 7, y + 5, 2, 3, "#2a1e12"); } g.globalAlpha = 1; }

  // Espírito sobre as águas
  if (spirit > 0.01) { const sx = W / 2 + Math.sin(t * 0.002) * (W * 0.12), sy = GROUND - 24 + Math.sin(t * 0.004) * 4; const gl = g.createRadialGradient(sx, sy, 1, sx, sy, 16); gl.addColorStop(0, `rgba(230,240,255,${0.8 * spirit})`); gl.addColorStop(1, "rgba(200,220,255,0)"); g.fillStyle = gl; g.fillRect(sx - 18, sy - 18, 36, 36); R(sx - 1, sy - 2, 2, 4, `rgba(255,255,255,${spirit})`); }

  // Adão e Eva
  if (man > 0.01) {
    g.globalAlpha = Math.min(1, man * 1.25);
    const cxm = W * 0.62, fy = hillY(W * 0.62) - 1, rise = Math.round((1 - ease(man)) * 10);
    const gl = g.createRadialGradient(cxm, fy - 12, 2, cxm, fy - 12, 28); gl.addColorStop(0, `rgba(255,231,158,${0.6 * man})`); gl.addColorStop(1, "rgba(255,231,158,0)"); g.fillStyle = gl; g.fillRect(cxm - 30, fy - 36, 60, 42);
    drawPerson(R, cxm - 9, fy + rise, { robe: "#7a5a34", robeD: "#5c4225", hair: "#241a10" });
    drawPerson(R, cxm + 9, fy + rise, { female: true, robe: "#9a6a86", robeD: "#744c66", hair: "#3a241a", skin: "#e6b280" });
    g.globalAlpha = 1;
  }

  // raios de glória no "muito bom"
  if (good > 0.02) { g.globalAlpha = good * 0.12; g.fillStyle = "#fff2cc"; const cxr = W / 2, cyr = -18; for (let i = 0; i < 9; i++) { const a = (i / 9) * Math.PI + (reduce ? 0 : t * 0.0004); g.beginPath(); g.moveTo(cxr, cyr); g.lineTo(cxr + Math.cos(a) * (W), cyr + Math.sin(a) * (W)); g.lineTo(cxr + Math.cos(a + 0.05) * W, cyr + Math.sin(a + 0.05) * W); g.closePath(); g.fill(); } g.globalAlpha = 1; }
}

type Rect = (x: number, y: number, w: number, h: number, c: string) => void;
function drawPerson(R: Rect, cx: number, fy: number, o: { skin?: string; hair?: string; robe?: string; robeD?: string; female?: boolean }) {
  const sk = o.skin || "#d9a06b", skd = "#b07a44", hair = o.hair || "#3a2a18", robe = o.robe || "#b9483f", robeD = o.robeD || "#8f342c";
  for (let i = 0; i < 10; i++) { const w = 4 + Math.round(i * 0.5); R(cx - w, fy - 2 - i, w * 2, 1, i < 5 ? robeD : robe); }
  R(cx - 4, fy - 16, 8, 6, robe);
  R(cx - 6, fy - 15, 2, 6, sk); R(cx + 4, fy - 15, 2, 6, sk);
  R(cx - 2, fy - 18, 4, 2, sk);
  R(cx - 3, fy - 23, 6, 5, sk); R(cx - 3, fy - 19, 6, 1, skd);
  if (o.female) { R(cx - 4, fy - 24, 8, 3, hair); R(cx - 4, fy - 22, 1, 6, hair); R(cx + 3, fy - 22, 1, 6, hair); }
  else { R(cx - 3, fy - 24, 6, 2, hair); R(cx - 3, fy - 23, 1, 2, hair); R(cx + 2, fy - 23, 1, 2, hair); }
  R(cx - 2, fy - 22, 1, 1, "#2a1a10"); R(cx + 1, fy - 22, 1, 1, "#2a1a10");
}
