// ============================================================================
// RPG Stage — motor do modo "CENA VIVA" (palco lateral andável).
//
// Diferente do rpgLivingV2 (cenário rola atrás de um herói fixo), aqui o PALCO
// tem coordenadas próprias: o herói ANDA de verdade (px reais), a câmera o
// segue, e cada versículo tem uma âncora no palco onde o elenco e os props
// daquele momento são posicionados. Narração avança andando até o marcador;
// diálogo avança por toque (balões de fala dos personagens).
//
// O texto exibido é SEMPRE o versículo bíblico carregado em runtime — o roteiro
// só diz QUEM fala, ONDE cada um está e COMO o ambiente muda.
// ============================================================================

import { pixel } from "@/lib/rpgActors";
import { drawStageActor, stageActorHeight, type StageRole, type StagePose } from "@/lib/rpgStageActors";

// ---- roteiro -----------------------------------------------------------------

export type StageTerrain = "patmos" | "glory" | "city" | "field" | "throne";

export interface StageEnv {
  terrain: StageTerrain;
  night: number;   // 0..1
  glory: number;   // 0..1 luz dourada
  storm: number;
  fire: number;
}

export interface CastPlacement {
  role: StageRole;
  dx: number;              // deslocamento (px lógicos) em relação à âncora do beat
  pose?: StagePose;
  facing?: 1 | -1;
  scale?: number;
  palette?: string;
  glow?: number;
  id?: string;             // p/ balão apontar num ator específico (default = role)
}

export interface StagePropSpec { kind: string; dx: number; scale?: number; fire?: number }

export interface StageBeat {
  v: number;                 // número do versículo
  by?: StageRole | "hero";   // quem fala (balão). Ausente = narração pura
  q?: string;                // o balão mostra o texto do versículo APÓS este marcador
                             // (ex.: "dizendo: "). Sem q => versículo inteiro no balão.
  step?: number;             // distância a andar até este beat (default 84 narração / 0 fala)
  cast?: CastPlacement[];    // elenco ancorado neste beat (substitui o elenco anterior)
  props?: StagePropSpec[];   // props ancorados neste beat (adicionados ao palco)
  env?: Partial<StageEnv>;   // mudanças de ambiente (interpoladas suavemente)
}

export interface StageScript {
  start: Partial<StageEnv>;
  beats: StageBeat[];
}

// posição resolvida no palco
export interface StagedActor extends CastPlacement { x: number }
export interface StagedProp extends StagePropSpec { x: number }

const DEFAULT_STEP_NARRATE = 84;
export const STAGE_START_X = 110;

/** Âncora (x do palco) de cada beat, acumulando os steps. */
export function beatAnchors(script: StageScript): number[] {
  const xs: number[] = [];
  let x = STAGE_START_X;
  script.beats.forEach((b, i) => {
    const def = b.by ? 0 : DEFAULT_STEP_NARRATE;
    if (i > 0) x += b.step ?? def;
    xs.push(x);
  });
  return xs;
}

/** Comprimento total do palco. */
export function stageLength(script: StageScript): number {
  const xs = beatAnchors(script);
  return (xs[xs.length - 1] ?? STAGE_START_X) + 240;
}

/** Elenco/props em cena até o beat idx (posições absolutas no palco). */
export function stagedAt(script: StageScript, idx: number): { cast: StagedActor[]; props: StagedProp[] } {
  const xs = beatAnchors(script);
  let cast: StagedActor[] = [];
  const props: StagedProp[] = [];
  for (let i = 0; i <= Math.min(idx, script.beats.length - 1); i++) {
    const b = script.beats[i];
    if (b.cast) cast = b.cast.map((c) => ({ ...c, x: xs[i] + c.dx }));
    if (b.props) for (const p of b.props) props.push({ ...p, x: xs[i] + p.dx });
  }
  return { cast, props };
}

/** Ambiente-alvo no beat idx (start + patches acumulados). */
export function envAt(script: StageScript, idx: number): StageEnv {
  const env: StageEnv = {
    terrain: (script.start.terrain ?? "field") as StageTerrain,
    night: script.start.night ?? 0,
    glory: script.start.glory ?? 0,
    storm: script.start.storm ?? 0,
    fire: script.start.fire ?? 0,
  };
  for (let i = 0; i <= Math.min(idx, script.beats.length - 1); i++) {
    const p = script.beats[i].env;
    if (p) Object.assign(env, p);
  }
  return env;
}

/** Texto do balão: parte do versículo após o marcador `q` (fiel à tradução). */
export function balloonText(verseText: string, q?: string): string {
  if (!q) return verseText;
  const i = verseText.indexOf(q);
  if (i < 0) return verseText;
  return verseText.slice(i + q.length).trim();
}

// ---- fundo / palco --------------------------------------------------------

export interface StageDims { W: number; H: number; GROUND: number }

export interface StageDrawState {
  env: StageEnv;      // valores interpolados correntes
  envTarget: StageEnv;
}

export function makeDrawState(script: StageScript): StageDrawState {
  const e = envAt(script, 0);
  return { env: { ...e }, envTarget: { ...e } };
}

const lerp = (a: number, b: number, k: number) => a + (b - a) * k;

interface SkyBand { top: string[]; night: string[]; glory: string[] }
const SKIES: Record<StageTerrain, SkyBand> = {
  patmos: {
    top: ["#33518a", "#5a74a8", "#8aa0c4", "#c8b58a"],
    night: ["#0b1226", "#16203c", "#232f52", "#3a3a5c"],
    glory: ["#3a3a72", "#7a6aa0", "#d8b878", "#ffe6a8"],
  },
  glory: {
    top: ["#4a3a78", "#8a6aa8", "#e0b878", "#ffedb8"],
    night: ["#180f30", "#2a1c48", "#443064", "#6a4a80"],
    glory: ["#6a4a9a", "#b88ab8", "#ffd894", "#fff3cc"],
  },
  city: {
    top: ["#3a4a74", "#6a7aa0", "#a8a8b8", "#d8c49a"],
    night: ["#0c1024", "#181e38", "#2a2c4c", "#42405e"],
    glory: ["#4a4480", "#8878a8", "#e0c088", "#ffe9b0"],
  },
  field: {
    top: ["#3a5a8a", "#6a8ab0", "#a0b8c8", "#d8cca0"],
    night: ["#0a1020", "#141c34", "#22294a", "#383a58"],
    glory: ["#44508a", "#8888b0", "#e8c890", "#fff0b8"],
  },
  throne: {
    top: ["#2a1c48", "#4a3070", "#8a5a90", "#e8b878"],
    night: ["#120a24", "#201440", "#342054", "#4c3068"],
    glory: ["#3c2a68", "#7a4e94", "#d89a80", "#ffe0a0"],
  },
};

const mixHex = (a: string, b: string, k: number): string => {
  const pa = parseInt(a.slice(1), 16), pb = parseInt(b.slice(1), 16);
  const r = Math.round(((pa >> 16) & 255) * (1 - k) + ((pb >> 16) & 255) * k);
  const gg = Math.round(((pa >> 8) & 255) * (1 - k) + ((pb >> 8) & 255) * k);
  const bl = Math.round((pa & 255) * (1 - k) + (pb & 255) * k);
  return `#${((r << 16) | (gg << 8) | bl).toString(16).padStart(6, "0")}`;
};

export interface StageDrawOpts {
  dims: StageDims;
  camX: number;
  t: number;
  reduce: boolean;
  state: StageDrawState;
}

/** Interpola o ambiente e desenha céu + fundo + chão do palco. */
export function drawStageBackdrop(g: CanvasRenderingContext2D, o: StageDrawOpts): void {
  const { dims, camX, t, reduce, state } = o;
  const { W, H, GROUND } = dims;
  const R = pixel(g);
  const k = reduce ? 1 : 0.05;
  state.env.night = lerp(state.env.night, state.envTarget.night, k);
  state.env.glory = lerp(state.env.glory, state.envTarget.glory, k);
  state.env.storm = lerp(state.env.storm, state.envTarget.storm, k);
  state.env.fire = lerp(state.env.fire, state.envTarget.fire, k);
  state.env.terrain = state.envTarget.terrain;

  const env = state.env;
  const sky = SKIES[env.terrain];

  // céu em 4 bandas (dia → noite → glória)
  const bandH = Math.ceil(GROUND / 4);
  for (let i = 0; i < 4; i++) {
    let c = sky.top[i];
    c = mixHex(c, sky.night[i], Math.min(1, env.night));
    c = mixHex(c, sky.glory[i], Math.min(1, env.glory) * 0.85);
    R(0, i * bandH, W, bandH + 1, c);
  }

  // estrelas (noite) — fixas no céu (parallax quase nulo)
  if (env.night > 0.15) {
    g.save(); g.globalAlpha = Math.min(1, env.night) * 0.9;
    for (let i = 0; i < 40; i++) {
      const sx = ((i * 97 + 31) % 620) - ((camX * 0.04) % 620);
      const sy = (i * 53 + 17) % Math.round(GROUND * 0.7);
      const tw = reduce ? 1 : (Math.sin(t * 0.002 + i) * 0.5 + 0.5);
      if (sx >= -2 && sx <= W + 2) R((sx + 620) % 620, sy, 1, 1, tw > 0.4 ? "#e8ecff" : "#9aa4c8");
    }
    g.restore();
  }

  // clarão de glória descendo do alto
  if (env.glory > 0.05) {
    g.save(); g.globalAlpha = env.glory * 0.5;
    const grd = g.createRadialGradient(W * 0.5, -H * 0.2, 10, W * 0.5, -H * 0.2, H * 1.1);
    grd.addColorStop(0, "#fff6d8"); grd.addColorStop(1, "rgba(255,246,216,0)");
    g.fillStyle = grd; g.fillRect(0, 0, W, GROUND);
    g.restore();
  }

  // relâmpago da tempestade
  if (env.storm > 0.25 && !reduce && Math.sin(t * 0.0021) > 0.985) {
    g.save(); g.globalAlpha = 0.35; R(0, 0, W, GROUND, "#e8ecff"); g.restore();
  }

  // ---- camadas de fundo por terreno (parallax) ----
  const far = -camX * 0.22, mid = -camX * 0.5;

  if (env.terrain === "patmos") {
    // mar ao fundo com faixa de ondas
    const seaY = Math.round(GROUND * 0.72);
    R(0, seaY, W, GROUND - seaY, mixHex("#27476e", "#101c30", env.night * 0.7));
    if (!reduce) for (let i = 0; i < 14; i++) {
      const wx = ((i * 61 + ((t * 0.02 + i * 8) % 60)) % (W + 40)) - 20;
      R(wx, seaY + 3 + (i % 4) * 5, 9, 1, "#7ea4cc");
    }
    // ilhas/rochas distantes
    for (let i = 0; i < 5; i++) {
      const ix = ((i * 260 + far) % (W + 360)) - 180;
      R(ix, seaY - 12, 70, 12, mixHex("#3d4a5c", "#1a2230", env.night * 0.6));
      R(ix + 12, seaY - 20, 40, 9, mixHex("#4a5a70", "#222c3e", env.night * 0.6));
    }
  } else if (env.terrain === "city") {
    // silhueta de cidade da Ásia (torres, muros, portões)
    const baseY = Math.round(GROUND * 0.8);
    for (let i = 0; i < 9; i++) {
      const bx = ((i * 150 + far * 1.2) % (W + 420)) - 210;
      const bh = 24 + (i % 4) * 12;
      const c = mixHex("#5a5a72", "#232338", env.night * 0.75);
      R(bx, baseY - bh, 36 + (i % 3) * 14, bh, c);
      R(bx + 8, baseY - bh - 8, 12, 8, c);
      if (env.night > 0.35) for (let wnd = 0; wnd < 3; wnd++) R(bx + 5 + wnd * 9, baseY - bh + 6, 2, 3, "#e8c06a");
    }
    // muro médio
    for (let i = 0; i < 8; i++) {
      const mx = ((i * 190 + mid) % (W + 420)) - 210;
      R(mx, Math.round(GROUND * 0.86), 120, Math.round(GROUND * 0.14), mixHex("#6a6046", "#2c2a20", env.night * 0.7));
      for (let mm = 0; mm < 5; mm++) R(mx + mm * 22, Math.round(GROUND * 0.855), 10, 4, mixHex("#7c7050", "#3a382a", env.night * 0.7));
    }
  } else if (env.terrain === "glory" || env.terrain === "throne") {
    // nuvens luminosas em camadas
    for (let i = 0; i < 7; i++) {
      const cxx = ((i * 210 + far) % (W + 420)) - 210;
      const cy = Math.round(GROUND * (0.5 + (i % 3) * 0.12));
      g.save(); g.globalAlpha = 0.5;
      R(cxx, cy, 130, 10, mixHex("#c8b8dc", "#fff0c0", env.glory));
      R(cxx + 20, cy - 6, 80, 6, mixHex("#dcd0ec", "#fff8dc", env.glory));
      g.restore();
    }
  } else {
    // campo: colinas
    for (let i = 0; i < 6; i++) {
      const hx = ((i * 240 + far) % (W + 480)) - 240;
      R(hx, Math.round(GROUND * 0.78), 190, Math.round(GROUND * 0.22), mixHex("#4a6a44", "#1e2c1c", env.night * 0.7));
    }
  }

  // ---- chão (faixa firme onde todos pisam) ----
  const groundC = env.terrain === "patmos" ? "#6a5b46" : env.terrain === "city" ? "#77694c" : env.terrain === "glory" || env.terrain === "throne" ? "#b9a06a" : "#5d7046";
  const groundD = env.terrain === "glory" || env.terrain === "throne" ? "#8a7444" : "#3c3426";
  R(0, GROUND, W, H - GROUND, mixHex(groundC, "#191510", env.night * 0.6));
  R(0, GROUND, W, 2, mixHex(groundD, "#0e0c08", env.night * 0.6));
  // pedrisco/texture que acompanha a câmera (mostra movimento REAL)
  for (let i = 0; i < 26; i++) {
    const px = ((i * 53 - camX) % (W + 30) + (W + 30)) % (W + 30) - 15;
    const py = GROUND + 4 + ((i * 29) % Math.max(6, H - GROUND - 8));
    R(px, py, 2, 1, mixHex(groundD, "#0e0c08", env.night * 0.5));
  }
}

/** Marcador de avanço: coluna de luz pulsante + seta no chão. */
export function drawStageMarker(g: CanvasRenderingContext2D, x: number, dims: StageDims, t: number, reduce: boolean): void {
  const R = pixel(g);
  const { GROUND } = dims;
  const pulse = reduce ? 0.7 : Math.sin(t * 0.005) * 0.3 + 0.7;
  g.save();
  g.globalAlpha = 0.35 * pulse;
  const grd = g.createLinearGradient(0, GROUND - 60, 0, GROUND);
  grd.addColorStop(0, "rgba(255,225,138,0)");
  grd.addColorStop(1, "#ffe18a");
  g.fillStyle = grd;
  g.fillRect(Math.round(x - 7), GROUND - 60, 14, 60);
  g.restore();
  g.save();
  g.globalAlpha = 0.9 * pulse;
  R(x - 5, GROUND - 3, 10, 2, "#ffe18a");
  R(x - 3, GROUND - 6, 6, 2, "#ffd24a");
  R(x - 1, GROUND - 9, 2, 2, "#fff3c0");
  g.restore();
}

/** Desenha elenco + props do palco (ordenado por x p/ sobreposição correta). */
export function drawStagedElements(
  g: CanvasRenderingContext2D,
  cast: StagedActor[],
  props: StagedProp[],
  camX: number,
  dims: StageDims,
  t: number,
  reduce: boolean,
  drawProp: (g: CanvasRenderingContext2D, kind: string, x: number, fy: number, o: { scale?: number; t?: number; reduce?: boolean; fire?: number }) => void,
): void {
  const { W, GROUND } = dims;
  for (const p of props) {
    const sx = p.x - camX;
    if (sx < -80 || sx > W + 80) continue;
    drawProp(g, p.kind, sx, GROUND, { scale: p.scale, t, reduce, fire: p.fire });
  }
  const sorted = [...cast].sort((a, b) => a.x - b.x);
  for (const c of sorted) {
    const sx = c.x - camX;
    if (sx < -90 || sx > W + 90) continue;
    drawStageActor(g, sx, GROUND, {
      role: c.role, pose: c.pose ?? "stand", facing: c.facing ?? (sx > W * 0.5 ? -1 : 1),
      scale: c.scale, t, reduce, palette: c.palette, glow: c.glow,
    });
  }
}

export { stageActorHeight };
