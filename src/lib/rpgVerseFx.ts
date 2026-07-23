// ============================================================================
// RPG Verse FX — "diretor universal" da Leitura Viva.
// Para capítulos SEM cena feita à mão, lê o texto do versículo atual e aciona
// efeitos contextuais (luz, noite/estrelas, água, fogo, chuva, tempestade,
// batalha, vento, luto…) por cima do cenário da região. Assim TODO capítulo
// ganha animação no contexto do que está sendo lido. Puramente visual.
// ============================================================================

import type { SceneDims } from "@/lib/rpgScene";

type Fx = "light" | "night" | "stars" | "water" | "fire" | "rain" | "storm" | "battle" | "somber" | "wind";

const PATTERNS: Record<Fx, RegExp> = {
  light: /\b(luz|luzes|clar[ao]|resplandec|brilh|amanhec|aurora|sol)\b/i,
  night: /\b(noite|trevas|escurid|tenebros|anoitec)\b/i,
  stars: /\b(estrela|estrelas|firmamento|c[ée]us)\b/i,
  water: /\b(água|águas|mar|mares|rio|rios|onda|ondas|dil[úu]vio|fonte|po[çc]o|inunda)\b/i,
  fire: /\b(fogo|chama|chamas|arde|ardente|queima|incend|labareda|brasa|holocausto)\b/i,
  rain: /\b(chuva|chove|choveu|chover|nuvem|nuvens|orvalho)\b/i,
  storm: /\b(tempestade|trov[ãa]o|rel[âa]mpago|raio|raios|vendaval|redemoinho)\b/i,
  battle: /\b(guerra|batalha|ex[ée]rcito|espada|lan[çc]a|peleja|combate|feriu|matou|ferir)\b/i,
  somber: /\b(morte|morreu|morrer|morto|sangue|luto|chorou|pranto|sepult|lament)\b/i,
  wind: /\b(vento|ventos|sopro|assopr|esp[íi]rito)\b/i,
};

const FX_LIST = Object.keys(PATTERNS) as Fx[];

// intensidade suave por efeito (persistente entre frames p/ transição)
const state: Record<Fx, number> = FX_LIST.reduce((o, k) => ((o[k] = 0), o), {} as Record<Fx, number>);
const lerp = (a: number, b: number, f: number) => a + (b - a) * f;

// estrelas/gotas/brasas fixas
let rnd = 3;
const rand = () => (rnd = (rnd * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;
const STARS = Array.from({ length: 40 }, () => ({ x: rand(), y: rand() * 0.55, p: rand() * 6.28 }));
const DROPS = Array.from({ length: 34 }, () => ({ x: rand(), y: rand(), sp: 0.5 + rand() * 0.6 }));
const EMBERS = Array.from({ length: 14 }, () => ({ x: rand(), ph: rand() * 6.28, sp: 0.2 + rand() * 0.3 }));
const MOTES = Array.from({ length: 12 }, () => ({ x: rand(), y: rand() * 0.7, ph: rand() * 6.28 }));

export function targetsForText(text: string): Record<Fx, number> {
  const out = FX_LIST.reduce((o, k) => ((o[k] = 0), o), {} as Record<Fx, number>);
  if (!text) return out;
  for (const fx of FX_LIST) if (PATTERNS[fx].test(text)) out[fx] = 1;
  if (out.storm) out.rain = Math.max(out.rain, 0.7); // tempestade implica chuva
  return out;
}

// ---- ambiente/lugar do capítulo (relevo condizente, p/ imersão) ----
export type Setting = "mountain" | "sea" | "desert" | "city" | "river" | "field";
const SET_PATTERNS: Record<Setting, RegExp> = {
  mountain: /\b(monte|montes|montanha|colina|sinai|horebe|mori[áa]|carmelo|serra|penhasco|rocha)\b/i,
  sea: /\b(mar|mares|oceano|lago|galil[ée]ia|tiber[íi]ades|praia|litoral)\b/i,
  desert: /\b(deserto|ermo|areia|arenoso|s[eu]r\b|par[ãa]|sequid[ãa]o)\b/i,
  city: /\b(cidade|cidades|templo|pal[áa]cio|jerusal[ée]m|muralha|muro|port[ãa]o|torre|casa do senhor|santu[áa]rio)\b/i,
  river: /\b(rio|rios|jord[ãa]o|eufrates|nilo|ribeiro|corrente|arroio)\b/i,
  field: /\b(campo|campos|seara|vinha|horta|pomar|prado|pastagem|erval)\b/i,
};
const SET_LIST = Object.keys(SET_PATTERNS) as Setting[];

/** Peso de cada ambiente no capítulo (0..1) a partir do texto inteiro. */
export function detectSetting(chapterText: string): Record<Setting, number> {
  const out = SET_LIST.reduce((o, k) => ((o[k] = 0), o), {} as Record<Setting, number>);
  if (!chapterText) return out;
  for (const s of SET_LIST) { const m = chapterText.match(new RegExp(SET_PATTERNS[s].source, "gi")); if (m) out[s] = Math.min(1, m.length / 3); }
  return out;
}

/** Desenha o relevo do ambiente (silhuetas distantes) por cima do cenário. */
export function drawSettingTerrain(g: CanvasRenderingContext2D, o: { setting: Record<Setting, number>; dims: SceneDims; t: number; reduce: boolean }): void {
  const { setting: s, dims, t, reduce } = o;
  const W = dims.W, H = dims.H, GROUND = dims.GROUND;
  const R = (x: number, y: number, w: number, h: number, c: string) => { g.fillStyle = c; g.fillRect(x | 0, y | 0, Math.max(1, w | 0), Math.max(1, h | 0)); };
  // mar distante: faixa no horizonte
  if (s.sea > 0.02) { g.globalAlpha = Math.min(0.6, s.sea * 0.7); const sg = g.createLinearGradient(0, GROUND - 18, 0, GROUND); sg.addColorStop(0, "rgba(40,90,140,0)"); sg.addColorStop(1, "rgba(30,80,130,.9)"); g.fillStyle = sg; g.fillRect(0, GROUND - 18, W, 18); for (let x = 0; x < W; x += 8) R(x, GROUND - 4 + Math.round(Math.sin(x * 0.1 + t * 0.005) * 1), 4, 1, "#7fb8e0"); g.globalAlpha = 1; }
  // montanhas: picos escuros no horizonte
  if (s.mountain > 0.02) { g.globalAlpha = Math.min(0.85, 0.4 + s.mountain * 0.5); g.fillStyle = "#20222e"; const peaks = [[0.12, 30], [0.3, 46], [0.52, 36], [0.72, 52], [0.9, 34]]; for (const [fx, hh] of peaks) { const cx = fx * W, base = GROUND; g.beginPath(); g.moveTo(cx - hh * 0.8, base); g.lineTo(cx, base - hh); g.lineTo(cx + hh * 0.8, base); g.closePath(); g.fill(); R(cx - 3, base - hh, 6, 4, "#3a3d4d"); } g.globalAlpha = 1; }
  // dunas do deserto: curvas baixas e claras
  if (s.desert > 0.02) { g.globalAlpha = Math.min(0.7, 0.35 + s.desert * 0.4); g.fillStyle = "#6b5327"; for (let x = 0; x < W; x++) { const h = 8 + Math.sin(x * 0.02) * 6 + Math.sin(x * 0.06) * 3; g.fillRect(x, GROUND - h, 1, h + 2); } g.globalAlpha = 1; }
  // cidade/templo: silhuetas de prédios + colunas
  if (s.city > 0.02) { g.globalAlpha = Math.min(0.85, 0.45 + s.city * 0.4); g.fillStyle = "#1c2030"; const bld = [[0.1, 18, 12], [0.22, 26, 14], [0.78, 22, 12], [0.9, 30, 16]]; for (const [fx, hh, ww] of bld) { R(fx * W - ww / 2, GROUND - hh, ww, hh, "#1c2030"); for (let wy = 3; wy < hh; wy += 5) R(fx * W - ww / 2 + 2, GROUND - hh + wy, 2, 2, "#e8b04b55"); } // templo central com colunas
      const tx = W * 0.5, th = 30, tw = 40; R(tx - tw / 2, GROUND - th, tw, th, "#242838"); R(tx - tw / 2 - 3, GROUND - th, tw + 6, 4, "#2e3346"); for (let i = 0; i < 5; i++) R(tx - tw / 2 + 4 + i * 8, GROUND - th + 6, 3, th - 8, "#31374d"); g.globalAlpha = 1; }
  // rio: faixa d'água diagonal ao chão
  if (s.river > 0.02) { g.globalAlpha = Math.min(0.6, s.river * 0.7); g.fillStyle = "#2b6aa0"; for (let x = 0; x < W; x++) { const yy = GROUND + 2 + Math.round(Math.sin(x * 0.05 + t * 0.004) * 2); R(x, yy, 1, 3, "#2b6aa0"); } g.globalAlpha = 1; }
}

interface Opts { text: string; dims: SceneDims; t: number; reduce: boolean }

/** Desenha os efeitos contextuais do versículo por cima do cenário da região. */
export function drawVerseAccents(g: CanvasRenderingContext2D, o: Opts): void {
  const { text, dims, t, reduce } = o;
  const W = dims.W, H = dims.H, GROUND = dims.GROUND;
  const tgt = targetsForText(text);
  const k = reduce ? 1 : 0.05;
  for (const fx of FX_LIST) state[fx] = lerp(state[fx], tgt[fx], k);
  const R = (x: number, y: number, w: number, h: number, c: string) => { g.fillStyle = c; g.fillRect(x | 0, y | 0, Math.max(1, w | 0), Math.max(1, h | 0)); };

  // noite / luto: escurece
  if (state.night > 0.01 || state.somber > 0.01) {
    g.globalAlpha = Math.max(state.night * 0.4, state.somber * 0.3); g.fillStyle = state.somber > state.night ? "#1a0e14" : "#060812";
    g.fillRect(0, 0, W, H); g.globalAlpha = 1;
  }
  // estrelas (noite/estrelas)
  const st = Math.max(state.stars, state.night * 0.8);
  if (st > 0.02) { for (const s of STARS) { const tw = reduce ? 1 : 0.6 + 0.4 * Math.sin(t * 0.005 + s.p); g.globalAlpha = st * tw * 0.85; R(s.x * W, s.y * GROUND, s.y < 0.15 ? 2 : 1, 1, "#eef4ff"); } g.globalAlpha = 1; }

  // luz: clarão quente no alto
  if (state.light > 0.02) {
    const gl = g.createRadialGradient(W / 2, GROUND * 0.32, 3, W / 2, GROUND * 0.32, GROUND * 0.9);
    gl.addColorStop(0, `rgba(255,240,180,${0.34 * state.light})`); gl.addColorStop(0.6, `rgba(255,220,130,${0.1 * state.light})`); gl.addColorStop(1, "rgba(255,220,130,0)");
    g.fillStyle = gl; g.fillRect(0, 0, W, GROUND);
  }

  // água: brilho azul na base
  if (state.water > 0.02) {
    g.globalAlpha = state.water * 0.5; const wg = g.createLinearGradient(0, GROUND - 8, 0, H);
    wg.addColorStop(0, "rgba(60,140,200,0)"); wg.addColorStop(1, "rgba(30,90,150,.8)"); g.fillStyle = wg; g.fillRect(0, GROUND - 8, W, H - GROUND + 8);
    for (let x = 0; x < W; x += 6) { const yy = GROUND + 1 + Math.round(Math.sin(x * 0.14 + t * 0.006) * 1.5); g.globalAlpha = state.water * 0.4; R(x, yy, 3, 1, "#bfe0ff"); }
    g.globalAlpha = 1;
  }

  // fogo: brilho laranja + brasas subindo
  if (state.fire > 0.02) {
    g.globalAlpha = state.fire * (0.3 + (reduce ? 0 : Math.abs(Math.sin(t * 0.02)) * 0.15));
    const fg = g.createLinearGradient(0, GROUND - 30, 0, H); fg.addColorStop(0, "rgba(255,140,40,0)"); fg.addColorStop(1, "rgba(255,110,30,.75)");
    g.fillStyle = fg; g.fillRect(0, GROUND - 30, W, H - GROUND + 30); g.globalAlpha = 1;
    if (!reduce) for (const e of EMBERS) { const y = GROUND - ((t * 0.03 * e.sp + e.ph * 20) % GROUND); g.globalAlpha = state.fire * 0.7; R(e.x * W + Math.sin(t * 0.004 + e.ph) * 3, y, 1, 2, e.ph > 3 ? "#ffd889" : "#ff7a3a"); } g.globalAlpha = 1;
  }

  // chuva
  if (state.rain > 0.02) {
    g.globalAlpha = state.rain * 0.5; g.strokeStyle = "#9fc0e0"; g.lineWidth = 1;
    for (const d of DROPS) { const yy = ((d.y + (reduce ? 0 : t * 0.0016 * d.sp)) % 1) * (GROUND + 20); const xx = d.x * W; g.beginPath(); g.moveTo(xx, yy); g.lineTo(xx - 2, yy + 6); g.stroke(); }
    g.globalAlpha = 1;
  }
  // tempestade: relâmpago
  if (state.storm > 0.3 && !reduce && Math.floor(t / 300) % 7 === 0) { g.globalAlpha = 0.5 * state.storm; g.fillStyle = "#eaf2ff"; g.fillRect(0, 0, W, GROUND); g.globalAlpha = 1; }

  // vento: partículas atravessando
  if (state.wind > 0.02 && !reduce) { for (const m of MOTES) { const x = ((m.x + t * 0.0004 + m.ph) % 1) * W; g.globalAlpha = state.wind * 0.4; R(x, m.y * GROUND + Math.sin(t * 0.003 + m.ph) * 6, 2, 1, "#dfe9ff"); } g.globalAlpha = 1; }

  // batalha: vinheta vermelha pulsante
  if (state.battle > 0.02) {
    const a = state.battle * (0.12 + (reduce ? 0 : Math.abs(Math.sin(t * 0.006)) * 0.1));
    const vg = g.createRadialGradient(W / 2, GROUND * 0.6, GROUND * 0.4, W / 2, GROUND * 0.6, W * 0.7);
    vg.addColorStop(0, "rgba(0,0,0,0)"); vg.addColorStop(1, `rgba(150,20,20,${a})`); g.fillStyle = vg; g.fillRect(0, 0, W, H);
  }
}
