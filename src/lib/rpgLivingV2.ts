// ============================================================================
// RPG Living Scene v2 — motor de cena data-driven pra dramatizar QUALQUER
// capítulo no padrão do capítulo 1 (Gênesis 1): cenário contextual, personagens
// bíblicos, animação e conversação, versículo a versículo.
//
// Ideia: cada capítulo é um ROTEIRO (dados) — uma lista de keyframes por
// versículo com o estado da cena (ambiente + personagens + props) e as falas.
// O motor interpola o ambiente e faz crossfade dos personagens conforme o
// jogador avança, exatamente como a cena da Criação. Assim dá pra "deixar tudo
// pronto" e ter um padrão único de estrutura em todos os capítulos.
// ============================================================================

import type { SceneDims } from "@/lib/rpgScene";
import { drawFigure, drawAnimal, drawProp, pixel, type FigureSpec } from "@/lib/rpgActors";

export type Terrain = "desert" | "mountain" | "hills" | "field" | "garden" | "river" | "sea" | "city" | "plain";
const TERRAINS: Terrain[] = ["desert", "mountain", "hills", "field", "garden", "river", "sea", "city", "plain"];

export interface V2Actor extends FigureSpec {
  x: number; // fração da largura 0..1
  kind?: "figure" | "animal";
  animal?: "sheep" | "camel" | "ox" | "goat" | "lion";
  color?: string;
}
export interface V2Prop { kind: string; x: number; scale?: number; fire?: number }
export interface SceneState {
  terrain: Terrain;
  night?: number; storm?: number; rain?: number; glory?: number; rainbow?: number; flood?: number; fire?: number;
  props?: V2Prop[];
  actors?: V2Actor[];
}
export interface V2Beat { upTo: number; god?: string; reaction?: string }
export interface ChapterScript { keyframes: { v: number; state: SceneState }[]; beats?: V2Beat[] }

const lerp = (a: number, b: number, f: number) => a + (b - a) * f;
const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

// ---- estado corrente (uma leitura por vez) ----
interface EnvState { night: number; storm: number; rain: number; glory: number; rainbow: number; flood: number; fire: number; tw: Record<Terrain, number> }
function blankEnv(): EnvState {
  return { night: 0, storm: 0, rain: 0, glory: 0, rainbow: 0, flood: 0, fire: 0, tw: Object.fromEntries(TERRAINS.map((t) => [t, 0])) as Record<Terrain, number> };
}
const S: { key: string | null; env: EnvState; activeIdx: number; fade: number; deco: ReturnType<typeof buildDeco> | null } = { key: null, env: blankEnv(), activeIdx: -1, fade: 1, deco: null };

function buildDeco(seedBase: number) {
  let s = seedBase; const rnd = () => (s = (s * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;
  return {
    stars: Array.from({ length: 46 }, () => ({ x: rnd(), y: rnd() * 0.5, p: rnd() * 6.28, s: rnd() < 0.2 ? 2 : 1 })),
    dunes: Array.from({ length: 3 }, (_, i) => ({ o: rnd() * 6.28, h: 0.5 + i * 0.18 })),
    rainDrops: Array.from({ length: 60 }, () => ({ x: rnd(), y: rnd(), sp: 0.5 + rnd() * 0.6 })),
  };
}

function stateTargets(st: SceneState) {
  const tw = Object.fromEntries(TERRAINS.map((t) => [t, t === st.terrain ? 1 : 0])) as Record<Terrain, number>;
  return { night: st.night ?? 0, storm: st.storm ?? 0, rain: st.rain ?? 0, glory: st.glory ?? 0, rainbow: st.rainbow ?? 0, flood: st.flood ?? 0, fire: st.fire ?? 0, tw };
}

function activeKeyframe(script: ChapterScript, verse: number): number {
  let idx = 0;
  for (let i = 0; i < script.keyframes.length; i++) if (script.keyframes[i].v <= verse) idx = i; else break;
  return idx;
}

interface DrawOpts { key: string; script: ChapterScript; verseNumber: number; dims: SceneDims; t: number; reduce: boolean }

export function drawLivingV2(g: CanvasRenderingContext2D, o: DrawOpts): void {
  const { key, script, verseNumber, dims, t, reduce } = o;
  const W = dims.W, H = dims.H, GROUND = dims.GROUND;
  const R = pixel(g);

  if (S.key !== key) {
    S.key = key; S.env = blankEnv(); S.activeIdx = -1; S.fade = 1;
    let seed = 0; for (let i = 0; i < key.length; i++) seed = (seed * 31 + key.charCodeAt(i)) & 0x7fffffff;
    S.deco = buildDeco(seed + 7);
    const tgt0 = stateTargets(script.keyframes[activeKeyframe(script, verseNumber)].state);
    S.env = { ...S.env, night: tgt0.night, storm: tgt0.storm, rain: tgt0.rain, glory: tgt0.glory, rainbow: tgt0.rainbow, flood: tgt0.flood, fire: tgt0.fire, tw: { ...tgt0.tw } };
  }
  const deco = S.deco!;

  const idx = activeKeyframe(script, verseNumber);
  if (idx !== S.activeIdx) { S.activeIdx = idx; S.fade = 0; }
  if (S.fade < 1) S.fade = Math.min(1, S.fade + (reduce ? 1 : 0.05));
  const kf = script.keyframes[idx];
  const prevKf = idx > 0 ? script.keyframes[idx - 1] : null;

  // interpolar ambiente
  const tgt = stateTargets(kf.state);
  const k = reduce ? 1 : 0.06;
  const e = S.env;
  e.night = lerp(e.night, tgt.night, k); e.storm = lerp(e.storm, tgt.storm, k); e.rain = lerp(e.rain, tgt.rain, k);
  e.glory = lerp(e.glory, tgt.glory, k); e.rainbow = lerp(e.rainbow, tgt.rainbow, k); e.flood = lerp(e.flood, tgt.flood, k); e.fire = lerp(e.fire, tgt.fire, k);
  for (const tr of TERRAINS) e.tw[tr] = lerp(e.tw[tr], tgt.tw[tr], k);

  // ---------------- CÉU ----------------
  const night = e.night, storm = e.storm;
  const dayTop = [110, 170, 220], dayBot = [180, 205, 175];
  const nightTop = [10, 14, 34], nightBot = [26, 30, 60];
  const top = dayTop.map((d, i) => Math.round(lerp(d, nightTop[i], Math.max(night, storm * 0.7))));
  const bot = dayBot.map((d, i) => Math.round(lerp(d, nightBot[i], Math.max(night, storm * 0.7))));
  const grd = g.createLinearGradient(0, 0, 0, GROUND + 8);
  grd.addColorStop(0, `rgb(${top.join(",")})`); grd.addColorStop(1, `rgb(${bot.join(",")})`);
  g.fillStyle = grd; g.fillRect(0, 0, W, GROUND + 12);

  // estrelas
  if (night > 0.15) { for (const st of deco.stars) { const tw = reduce ? 1 : 0.6 + 0.4 * Math.sin(t * 0.005 + st.p); g.globalAlpha = night * (1 - storm) * tw * 0.9; R(st.x * W, st.y * GROUND, st.s, st.s, "#eef4ff"); } g.globalAlpha = 1; }
  // lua ou sol
  if (night > 0.4) { const mx = W * 0.8, my = GROUND * 0.26; g.globalAlpha = night * (1 - storm * 0.6); g.fillStyle = "#f4eecb"; g.beginPath(); g.arc(mx, my, 12, 0, 6.29); g.fill(); g.fillStyle = `rgb(${top.join(",")})`; g.beginPath(); g.arc(mx + 4, my - 2, 10, 0, 6.29); g.fill(); g.globalAlpha = 1; }
  else if (night < 0.5 && storm < 0.4) { const sx = W * 0.8, sy = GROUND * 0.28; g.globalAlpha = (1 - night) * (1 - storm); for (let r = 11; r >= 6; r--) { g.fillStyle = r > 8 ? "#ffcf5a" : "#ffd980"; g.beginPath(); g.arc(sx, sy, r, 0, 6.29); g.fill(); } g.globalAlpha = 1; }

  // nuvens de tempestade + relâmpago
  if (storm > 0.05) {
    g.globalAlpha = storm * 0.8; for (const [fx, fy] of [[0.2, 0.12], [0.55, 0.09], [0.82, 0.15]] as const) { const x = fx * W, y = fy * GROUND; g.fillStyle = "#33384a"; for (const [dx, dy, w, h] of [[0, 4, 22, 6], [8, 0, 16, 7], [17, 3, 18, 6]] as const) R(x + dx, y + dy, w, h, "#2b3040"); } g.globalAlpha = 1;
    if (!reduce && Math.sin(t * 0.006) > 0.985) { g.globalAlpha = storm * 0.5; g.fillStyle = "#eaf0ff"; g.fillRect(0, 0, W, GROUND); g.globalAlpha = 1; R(W * 0.45, 0, 2, GROUND * 0.5, "#dfe7ff"); }
  }

  // glória (luz divina do alto)
  if (e.glory > 0.02) { const lx = W / 2, ly = -10; const gl = g.createRadialGradient(lx, ly, 6, lx, ly, GROUND * 1.15); gl.addColorStop(0, `rgba(255,244,200,${0.55 * e.glory})`); gl.addColorStop(0.5, `rgba(255,224,150,${0.22 * e.glory})`); gl.addColorStop(1, "rgba(255,224,150,0)"); g.fillStyle = gl; g.fillRect(0, 0, W, GROUND + 8);
    g.globalAlpha = e.glory * 0.12; g.fillStyle = "#fff2cc"; for (let i = 0; i < 8; i++) { const a = (i / 8) * Math.PI + (reduce ? 0 : t * 0.0004); g.beginPath(); g.moveTo(lx, ly); g.lineTo(lx + Math.cos(a) * W, ly + Math.sin(a) * W); g.lineTo(lx + Math.cos(a + 0.05) * W, ly + Math.sin(a + 0.05) * W); g.closePath(); g.fill(); } g.globalAlpha = 1; }

  // arco-íris
  if (e.rainbow > 0.02) { const cx = W / 2, cy = GROUND + 10, cols = ["#e0466b", "#e88a3a", "#e8d24b", "#57b45a", "#3b6ea8", "#7a4c86"]; g.globalAlpha = e.rainbow * 0.8; g.lineWidth = 3; cols.forEach((c, i) => { g.strokeStyle = c; g.beginPath(); g.arc(cx, cy, GROUND * 0.62 - i * 3, Math.PI, 0); g.stroke(); }); g.globalAlpha = 1; }

  // ---------------- TERRENO / HORIZONTE ----------------
  const tw = e.tw;
  // montanhas distantes
  if (tw.mountain > 0.02) { g.globalAlpha = tw.mountain; for (let layer = 0; layer < 2; layer++) { const base = GROUND - (layer ? 6 : 0); g.fillStyle = layer ? "#3a3550" : "#4a4560"; for (let x = 0; x <= W; x += 2) { const hh = 26 + Math.sin(x * 0.03 + layer * 2) * 12 + Math.sin(x * 0.011) * 10; R(x, base - hh, 2, hh + 20, layer ? "#33304a" : "#403c58"); } } g.globalAlpha = 1; }
  // dunas do deserto
  if (tw.desert > 0.02) { g.globalAlpha = tw.desert; for (const d of deco.dunes) { g.fillStyle = "#b9925a"; for (let x = 0; x <= W; x += 2) { const y = GROUND - (10 + Math.sin(x * 0.012 + d.o) * 8) * d.h; R(x, y, 2, GROUND - y + 20, "#c9a86a"); } } g.globalAlpha = 1; }
  // cidade no horizonte
  if (tw.city > 0.02) { g.globalAlpha = tw.city; const wy = GROUND - 34; R(0, wy, W, 8, "#8a7550"); for (let x = 6; x < W; x += 26) { R(x, wy - 10, 14, 10, "#9a8258"); R(x + 3, wy - 6, 3, 4, "#3a2f1c"); } for (let x = 0; x < W; x += 8) R(x, wy - 2, 4, 2, "#6a5836"); g.globalAlpha = 1; }

  // ---------------- ÁGUA ----------------
  if (tw.sea > 0.02) { g.globalAlpha = tw.sea; const wl = GROUND - 6; const wg = g.createLinearGradient(0, wl, 0, H); wg.addColorStop(0, night > 0.4 ? "#15406b" : "#2b6aa0"); wg.addColorStop(1, "#0a1f36"); g.fillStyle = wg; g.fillRect(0, wl, W, H - wl); for (let x = 0; x < W; x += 6) { const yy = wl + 1 + Math.round(Math.sin(x * 0.14 + t * 0.006) * 1.2); g.globalAlpha = tw.sea * 0.4; R(x, yy, 3, 1, "#bfe0ff"); } g.globalAlpha = 1; }
  if (tw.river > 0.02) { g.globalAlpha = tw.river; const ry = GROUND - 2; for (let x = 0; x < W; x++) { const y = ry + Math.sin(x * 0.05 + t * 0.004) * 3; R(x, y, 1, 6, night > 0.4 ? "#1c4a72" : "#357bb0"); } g.globalAlpha = 1; }

  // ---------------- CHÃO ----------------
  const earth = tw.desert > 0.4 ? "#b9925a" : tw.city > 0.4 ? "#6a5c40" : tw.mountain > 0.4 ? "#514a44" : "#5a4326";
  R(0, GROUND, W, H - GROUND, earth);
  R(0, GROUND, W, 2, tw.desert > 0.4 ? "#c9a86a" : "#6a5232");
  const green = Math.max(tw.field, tw.garden, tw.hills * 0.8);
  if (green > 0.05) { g.globalAlpha = green; for (let x = 0; x < W; x += 2) R(x, GROUND, 2, 2, "#3f8a3f"); for (let x = 0; x < W; x += 7) R(x, GROUND - 2, 1, 2, "#2f6f2f"); g.globalAlpha = 1; }

  // dilúvio: água subindo cobrindo o chão
  if (e.flood > 0.02) { const fl = GROUND - e.flood * (GROUND * 0.55); g.globalAlpha = 0.86; const wg = g.createLinearGradient(0, fl, 0, H); wg.addColorStop(0, "#3a5a78"); wg.addColorStop(1, "#0a1f36"); g.fillStyle = wg; g.fillRect(0, fl, W, H - fl); for (let x = 0; x < W; x += 6) { const yy = fl + Math.round(Math.sin(x * 0.1 + t * 0.006) * 1.5); g.globalAlpha = 0.5; R(x, yy, 3, 1, "#bfe0ff"); } g.globalAlpha = 1; }

  // fogo / juízo (Sodoma, fogo do céu) — brilho alaranjado + chamas subindo do horizonte
  if (e.fire > 0.02) {
    g.globalAlpha = e.fire * 0.18; g.fillStyle = "#3a1607"; g.fillRect(0, 0, W, GROUND); g.globalAlpha = 1;
    const fg = g.createLinearGradient(0, GROUND - 46, 0, GROUND); fg.addColorStop(0, "rgba(255,120,40,0)"); fg.addColorStop(1, `rgba(255,90,26,${e.fire * 0.6})`); g.fillStyle = fg; g.fillRect(0, GROUND - 46, W, 48);
    for (let x = 2; x < W; x += 13) { const fh = (reduce ? 9 : 9 + Math.sin(t * 0.02 + x) * 5) * (0.6 + e.fire * 0.4); g.globalAlpha = e.fire * 0.8; R(x, GROUND - fh, 4, fh, "#ff7a2a"); R(x + 1, GROUND - fh - 3, 2, 4, "#ffd070"); }
    if (!reduce) for (let i = 0; i < 5; i++) { const fx = ((t * 0.03 + i * 97) % W); g.globalAlpha = e.fire * 0.5; R(fx, GROUND - 30 - (i * 7), 2, 2, "#ffb04a"); }
    g.globalAlpha = 1;
  }

  // ---------------- PROPS + PERSONAGENS (com crossfade) ----------------
  const drawLayer = (st: SceneState | undefined, alpha: number) => {
    if (!st || alpha <= 0.01) return;
    const floodY = e.flood > 0.02 ? GROUND - e.flood * (GROUND * 0.55) : GROUND;
    (st.props || []).forEach((p) => drawProp(g, p.kind, p.x * W, GROUND, { scale: p.scale ?? 1, t, reduce, fire: p.fire, alpha }));
    (st.actors || []).forEach((a) => {
      const px = a.x * W;
      if (a.kind === "animal") drawAnimal(g, px, GROUND, a.animal || "sheep", a.scale ?? 1, a.color);
      else drawFigure(g, px, Math.min(GROUND, floodY + 0), { ...a, t, reduce, alpha });
    });
  };
  // keyframe anterior some, atual entra
  if (S.fade < 1 && prevKf) drawLayer(prevKf.state, (1 - S.fade) * 0.85);
  drawLayer(kf.state, S.fade);
}

// ---- conversação por versículo (voz de Deus + reação) ----
export function beatFromScript(script: ChapterScript | undefined, verse: number): { god?: string; reaction?: string } {
  if (!script?.beats?.length) return {};
  let chosen: V2Beat | null = null;
  for (const b of script.beats) { if (verse <= b.upTo) { chosen = b; break; } }
  if (!chosen) chosen = script.beats[script.beats.length - 1];
  return { god: chosen.god, reaction: chosen.reaction };
}
