// ============================================================================
// RPG Stage — motor do modo CENA VIVA (v2).
//
// O palco é um SET (cenário fixo, ~1 tela e meia) com uma FAIXA DE CHÃO com
// profundidade: o jogador anda LIVREMENTE em 4 direções (x + profundidade),
// estilo Habbo/salas do app. O versículo avança por BOTÃO (espaço/enter no PC)
// — o movimento é vida na cena, não mecânica de leitura. Quando o beat muda,
// os atores ANDAM até suas novas marcas (tween) em vez de teleportar; troca de
// set (ex.: outra igreja de Ap 2–3) faz fade e remonta o palco.
//
// O texto exibido é SEMPRE o versículo bíblico carregado em runtime.
// ============================================================================

import { pixel } from "@/lib/rpgActors";

// ---- roteiro -----------------------------------------------------------------

// "abyss" = O VAZIO de Gn 1:2 — sem chão, sem morros, sem estrelas: só o
// abismo de águas escuras onde o Espírito de Deus se move. Só o que o texto
// já criou pode aparecer em cena.
export type StageTerrain = "patmos" | "glory" | "city" | "field" | "throne" | "garden" | "desert" | "mountain" | "abyss";

export interface StageEnv {
  terrain: StageTerrain;
  night: number;   // 0..1
  glory: number;   // 0..1 luz dourada
  storm: number;
  fire: number;
  /** ÁGUA na cena (0 = terra seca; 0.5 = mar ao fundo; 1 = tudo submerso).
   *  É o mar de Gn 1:9-10, o dilúvio subindo em Gn 7 e o baixar das águas. */
  water: number;
  /** VIDA VEGETAL do chão (0 = terra nua/estéril; 1 = relva plena).
   *  Gn 1:11 faz a terra reverdecer; o deserto e o pós-dilúvio ficam baixos. */
  verdure: number;
}

export interface CastPlacement {
  role: string;            // StageRole (rpgStageActors)
  dx: number;              // deslocamento horizontal em relação ao CENTRO do set
  dy?: number;             // profundidade 0(fundo)..1(frente) — default 0.45
  pose?: string;           // StagePose
  facing?: 1 | -1;
  scale?: number;
  palette?: string;
  glow?: number;
  id?: string;             // para balão/tween (default = role)
}

export interface StagePropSpec {
  kind: string; dx: number; dy?: number; scale?: number; fire?: number;
  /** OBJETO DO CÉU (sol, lua, estrelas, aves, nuvens): não fica no chão.
   *  Com sky:true, `dy` vira ALTURA no céu (0 = horizonte, 1 = zênite) e o
   *  objeto é desenhado ATRÁS de tudo, sem sombra e sem badge no chão. */
  sky?: boolean;
  /** ETIQUETA de OBJETO-MARCO: quando um prop de tipo comum (uma rocha, um poço)
   *  é, NAQUELA cena, um objeto específico e importante (a coluna de Betel, o
   *  poço de Rebeca), recebe uma `tag` que aponta para uma ficha própria
   *  (PROP_TAG_INFO). Sem tag, tipos ambientais (rocha, árvore, moita…) não
   *  mostram badge algum — só cenário. */
  tag?: string;
}

export interface StageBeat {
  v: number;                 // número do versículo
  by?: string;               // quem fala (balão). Ausente = narração pura
  q?: string;                // balão mostra o texto do versículo APÓS este marcador
  set?: string;              // novo set (fade + remonta palco). Ausente = mesmo set
  cast?: CastPlacement[];    // marcas do elenco neste beat (substitui as anteriores)
  props?: StagePropSpec[];   // props do set neste beat (substitui os anteriores)
  env?: Partial<StageEnv>;   // mudanças de ambiente (interpoladas)
}

export interface StageScript {
  start: Partial<StageEnv>;
  beats: StageBeat[];
}

// ---- geometria do palco ----
export const SET_W = 760;              // largura lógica do set (mundo maior)
export const SET_CENTER = SET_W / 2;
export const FRONT_MARGIN = 18;        // faixa frontal (na ilha vira água/beira)

export interface StageDims {
  W: number; H: number; GROUND: number;
  /** limite inferior da faixa ANDÁVEL (acima da UI do narrador). Default H-18. */
  BOT?: number;
}

/** y (px) dos pés para uma profundidade 0..1 dentro da faixa de chão. */
export function depthToFeetY(dy: number, dims: StageDims): number {
  const bandTop = dims.GROUND + 8;
  const bandBot = dims.BOT ?? (dims.H - FRONT_MARGIN);
  return Math.round(bandTop + Math.max(0, Math.min(1, dy)) * (bandBot - bandTop));
}

/** escala visual por profundidade (menor no fundo, maior na frente).
 *  Faixa ampla p/ caber vários usuários no mesmo estágio com leitura clara. */
export function depthScale(dy: number): number {
  return 0.6 + Math.max(0, Math.min(1, dy)) * 0.52;
}

// ---- resolução do roteiro ----

export interface StagedActor extends CastPlacement { x: number; feetDy: number }
export interface StagedProp extends StagePropSpec { x: number; feetDy: number }

/** Elenco/props/set vigentes no beat idx (marcas absolutas no set). */
export function stagedAt(script: StageScript, idx: number): { cast: StagedActor[]; props: StagedProp[]; setKey: string } {
  let cast: CastPlacement[] = [];
  let props: StagePropSpec[] = [];
  let setKey = "set0";
  for (let i = 0; i <= Math.min(idx, script.beats.length - 1); i++) {
    const b = script.beats[i];
    if (b.set) setKey = b.set;
    if (b.cast) cast = b.cast;
    if (b.props) props = b.props;
  }
  return {
    cast: cast.map((c) => ({ ...c, x: SET_CENTER + c.dx, feetDy: c.dy ?? 0.45 })),
    props: props.map((p) => ({ ...p, x: SET_CENTER + p.dx, feetDy: p.dy ?? 0.28 })),
    setKey,
  };
}

/** Ambiente-alvo no beat idx (start + patches acumulados). */
export function envAt(script: StageScript, idx: number): StageEnv {
  const env: StageEnv = {
    terrain: (script.start.terrain ?? "field") as StageTerrain,
    night: script.start.night ?? 0,
    glory: script.start.glory ?? 0,
    storm: script.start.storm ?? 0,
    fire: script.start.fire ?? 0,
    water: script.start.water ?? 0,
    verdure: script.start.verdure ?? 1,
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

// ---- desenho do cenário -----------------------------------------------------

export interface StageDrawState { env: StageEnv; envTarget: StageEnv }

export function makeDrawState(script: StageScript): StageDrawState {
  const e = envAt(script, 0);
  return { env: { ...e }, envTarget: { ...e } };
}

const lerp = (a: number, b: number, k: number) => a + (b - a) * k;

interface SkyBand { top: string[]; night: string[]; glory: string[] }
const SKIES: Record<StageTerrain, SkyBand> = {
  // — placeholders funcionais (a arte final por terreno vem do motor v2) —
  garden: {
    top: ["#3a7a5a", "#5f9a72", "#9cc48a", "#e0d8a0"],
    night: ["#0a1a14", "#14281e", "#20382a", "#324636"],
    glory: ["#4a8a6a", "#8ab890", "#e8d898", "#fff0c0"],
  },
  desert: {
    top: ["#4a6a9a", "#7a92b4", "#c0ac86", "#e8cc94"],
    night: ["#0c1224", "#1a2238", "#2c2c48", "#443c54"],
    glory: ["#5a6a9a", "#9a8ea8", "#e8c088", "#ffe8ac"],
  },
  mountain: {
    top: ["#3a4a6a", "#607498", "#94a4b8", "#d0c4a0"],
    night: ["#0a0f20", "#161e34", "#242c48", "#3a3c56"],
    glory: ["#48548a", "#8886ac", "#e0c290", "#ffedb4"],
  },
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
  // TREVAS SOBRE A FACE DO ABISMO (Gn 1:2): água escura, sem sol nem estrelas
  abyss: {
    top: ["#050a12", "#071019", "#0a1622", "#0e1c2a"],
    night: ["#010306", "#02060b", "#040a11", "#070e17"],
    glory: ["#101e38", "#1a2e50", "#2a4a76", "#456f9e"],
  },
};

const mixHex = (a: string, b: string, k: number): string => {
  const pa = parseInt(a.slice(1), 16), pb = parseInt(b.slice(1), 16);
  const r = Math.round(((pa >> 16) & 255) * (1 - k) + ((pb >> 16) & 255) * k);
  const gg = Math.round(((pa >> 8) & 255) * (1 - k) + ((pb >> 8) & 255) * k);
  const bl = Math.round((pa & 255) * (1 - k) + (pb & 255) * k);
  return `#${((r << 16) | (gg << 8) | bl).toString(16).padStart(6, "0")}`;
};

// hash simples p/ variação estável por posição (tufos, pedras, ladrilhos)
const h2 = (a: number, b: number) => {
  let h = (a * 374761393 + b * 668265263) | 0;
  h = (h ^ (h >> 13)) * 1274126177;
  return ((h ^ (h >> 16)) >>> 0) / 4294967295;
};

export interface StageDrawOpts {
  dims: StageDims;
  camX: number;
  t: number;
  reduce: boolean;
  state: StageDrawState;
}

/** Interpola o ambiente e desenha céu + fundo + CHÃO VIVO (estilo Zelda). */
export function drawStageBackdrop(g: CanvasRenderingContext2D, o: StageDrawOpts): void {
  const { dims, camX, t, reduce, state } = o;
  const { W, H, GROUND } = dims;
  const R = pixel(g);
  const k = reduce ? 1 : 0.05;
  state.env.night = lerp(state.env.night, state.envTarget.night, k);
  state.env.glory = lerp(state.env.glory, state.envTarget.glory, k);
  state.env.storm = lerp(state.env.storm, state.envTarget.storm, k);
  state.env.fire = lerp(state.env.fire, state.envTarget.fire, k);
  state.env.water = lerp(state.env.water, state.envTarget.water, k);
  state.env.verdure = lerp(state.env.verdure, state.envTarget.verdure, k);
  state.env.terrain = state.envTarget.terrain;

  const env = state.env;
  const sky = SKIES[env.terrain];

  // céu em 4 bandas com DITHERING entre elas (transição pixel-art de qualidade)
  const bandH = Math.ceil(GROUND / 4);
  const bandColors: string[] = [];
  for (let i = 0; i < 4; i++) {
    let c = sky.top[i];
    c = mixHex(c, sky.night[i], Math.min(1, env.night));
    c = mixHex(c, sky.glory[i], Math.min(1, env.glory) * 0.85);
    bandColors.push(c);
    R(0, i * bandH, W, bandH + 1, c);
  }
  // dither xadrez de 2px na divisa das bandas
  for (let i = 1; i < 4; i++) {
    const y = i * bandH;
    for (let x2 = 0; x2 < W; x2 += 4) {
      R(x2 + (i % 2 ? 0 : 2), y - 2, 2, 2, bandColors[i]);
      R(x2 + (i % 2 ? 2 : 0), y, 2, 2, bandColors[i - 1]);
    }
  }

  // estrelas (noite)
  if (env.night > 0.15) {
    g.save(); g.globalAlpha = Math.min(1, env.night) * 0.9;
    for (let i = 0; i < 40; i++) {
      const sx = ((i * 97 + 31) % 620) - ((camX * 0.04) % 620);
      const sy = (i * 53 + 17) % Math.round(GROUND * 0.68);
      const tw = reduce ? 1 : (Math.sin(t * 0.002 + i) * 0.5 + 0.5);
      R(((sx + 620) % 620), sy, 1, 1, tw > 0.4 ? "#e8ecff" : "#9aa4c8");
    }
    g.restore();
  }

  // clarão de glória
  if (env.glory > 0.05) {
    g.save(); g.globalAlpha = env.glory * 0.5;
    const grd = g.createRadialGradient(W * 0.5, -H * 0.2, 10, W * 0.5, -H * 0.2, H * 1.1);
    grd.addColorStop(0, "#fff6d8"); grd.addColorStop(1, "rgba(255,246,216,0)");
    g.fillStyle = grd; g.fillRect(0, 0, W, GROUND);
    g.restore();
  }

  // relâmpago
  if (env.storm > 0.25 && !reduce && Math.sin(t * 0.0021) > 0.985) {
    g.save(); g.globalAlpha = 0.35; R(0, 0, W, GROUND, "#e8ecff"); g.restore();
  }

  const far = -camX * 0.22;

  // ---- fundo por terreno ----
  if (env.terrain === "patmos") {
    // ===== MAR DO HORIZONTE: 3 profundidades + ondas animadas + reflexo =====
    const seaY = Math.round(GROUND * 0.66);
    const seaH = GROUND - seaY;
    const deep = mixHex("#1e3a5c", "#0a1424", env.night * 0.75);
    const midw = mixHex("#2c568a", "#12213a", env.night * 0.75);
    const near = mixHex("#3a6ea8", "#182b48", env.night * 0.72);
    R(0, seaY, W, Math.round(seaH * 0.35), deep);
    R(0, seaY + Math.round(seaH * 0.35), W, Math.round(seaH * 0.35), midw);
    R(0, seaY + Math.round(seaH * 0.7), W, Math.ceil(seaH * 0.3) + 1, near);
    // dither entre as faixas do mar
    for (let x2 = 0; x2 < W; x2 += 4) {
      R(x2, seaY + Math.round(seaH * 0.35) - 1, 2, 1, deep);
      R(x2 + 2, seaY + Math.round(seaH * 0.7) - 1, 2, 1, midw);
    }
    // ondas: cristas claras deslizando (3 velocidades)
    if (!reduce) {
      for (let i = 0; i < 22; i++) {
        const speed = 0.012 + (i % 3) * 0.008;
        const wx = ((i * 47 + t * speed) % (W + 60)) - 30;
        const wy = seaY + 2 + (i % 8) * (seaH / 8);
        const wlen = 6 + (i % 4) * 4;
        R(wx, wy, wlen, 1, mixHex("#9cc2e8", "#3a5578", env.night * 0.7));
        R(wx + 1, wy + 1, wlen - 2, 1, mixHex("#5d88b8", "#22344e", env.night * 0.7));
      }
      // cintilância do sol/lua na água (coluna de reflexo)
      const rx = W * 0.62;
      for (let i = 0; i < 12; i++) {
        const ry = seaY + 2 + i * (seaH / 12);
        const sway = Math.sin(t * 0.003 + i * 1.7) * (3 + i * 0.6);
        const rw = 2 + Math.sin(t * 0.005 + i) * 1.5;
        R(rx + sway - rw / 2, ry, Math.max(1, rw), 1, env.night > 0.4 ? "#c8d8f0" : "#ffe9b0");
      }
    }
    // ilhas/rochas distantes (2 planos)
    for (let i = 0; i < 5; i++) {
      const ix = ((i * 300 + far) % (W + 400)) - 200;
      R(ix, seaY - 10, 76, 10, mixHex("#3d4a5c", "#1a2230", env.night * 0.6));
      R(ix + 14, seaY - 17, 42, 8, mixHex("#4a5a70", "#222c3e", env.night * 0.6));
      R(ix + 20, seaY - 19, 12, 3, mixHex("#5d708a", "#2a3648", env.night * 0.6)); // pico
    }
    // gaivotas (dia) — "v" voando
    if (!reduce && env.night < 0.35) {
      for (let i = 0; i < 3; i++) {
        const gx = ((i * 240 + t * 0.02) % (W + 80)) - 40;
        const gy = Math.round(GROUND * 0.3) + i * 14 + Math.sin(t * 0.004 + i * 2) * 4;
        R(gx, gy, 3, 1, "#e8ecf0"); R(gx + 3, gy - 1, 2, 1, "#e8ecf0"); R(gx - 2, gy - 1, 2, 1, "#e8ecf0");
      }
    }
    // faixa de areia molhada antes do chão
    R(0, GROUND - 4, W, 4, mixHex("#a08a5e", "#3a3222", env.night * 0.6));
    R(0, GROUND - 5, W, 1, mixHex("#c4ae7a", "#4a4232", env.night * 0.6));
  } else if (env.terrain === "city") {
    const baseY = Math.round(GROUND * 0.8);
    for (let i = 0; i < 9; i++) {
      const bx = ((i * 150 + far * 1.2) % (W + 420)) - 210;
      const bh = 24 + (i % 4) * 12;
      const c = mixHex("#5a5a72", "#232338", env.night * 0.75);
      R(bx, baseY - bh, 36 + (i % 3) * 14, bh, c);
      R(bx + 8, baseY - bh - 8, 12, 8, c);
      if (env.night > 0.35) for (let wnd = 0; wnd < 3; wnd++) R(bx + 5 + wnd * 9, baseY - bh + 6, 2, 3, "#e8c06a");
    }
    for (let i = 0; i < 8; i++) {
      const mx = ((i * 190 - camX * 0.5) % (W + 420)) - 210;
      R(mx, Math.round(GROUND * 0.86), 120, Math.round(GROUND * 0.14), mixHex("#6a6046", "#2c2a20", env.night * 0.7));
      for (let mm = 0; mm < 5; mm++) R(mx + mm * 22, Math.round(GROUND * 0.855), 10, 4, mixHex("#7c7050", "#3a382a", env.night * 0.7));
    }
  } else if (env.terrain === "glory" || env.terrain === "throne") {
    for (let i = 0; i < 7; i++) {
      const cxx = ((i * 210 + far) % (W + 420)) - 210;
      const cy = Math.round(GROUND * (0.5 + (i % 3) * 0.12));
      g.save(); g.globalAlpha = 0.5;
      R(cxx, cy, 130, 10, mixHex("#c8b8dc", "#fff0c0", env.glory));
      R(cxx + 20, cy - 6, 80, 6, mixHex("#dcd0ec", "#fff8dc", env.glory));
      g.restore();
    }
  } else {
    for (let i = 0; i < 6; i++) {
      const hx = ((i * 240 + far) % (W + 480)) - 240;
      R(hx, Math.round(GROUND * 0.78), 190, Math.round(GROUND * 0.22), mixHex("#4a6a44", "#1e2c1c", env.night * 0.7));
    }
  }

  // ---- CHÃO VIVO: faixa andável com textura rica (estilo Zelda) ----
  const nightK = env.night * 0.55;
  const rows = 7;
  const bandTopY = GROUND;
  const bandHpx = H - GROUND;
  // base do piso por terreno (com leve gradiente de profundidade: fundo escuro → frente clara)
  const floorPal: Record<StageTerrain, [string, string, string]> = {
    patmos: ["#8a7448", "#9c8656", "#7c6840"],   // areia/rocha da praia
    city: ["#8c7c58", "#9a8a64", "#7a6c4c"],      // pedra/ladrilho
    glory: ["#c8ac6e", "#d9be80", "#b89a5c"],     // ouro suave
    throne: ["#c8ac6e", "#d9be80", "#b89a5c"],
    field: ["#5f8048", "#6d9054", "#527040"],     // grama
    garden: ["#4f7a44", "#5f8e50", "#44683a"],    // relva do Éden
    desert: ["#b09468", "#c2a878", "#9a8058"],    // areia do Neguebe
    mountain: ["#8a8272", "#9a9280", "#787060"],  // rocha/cascalho
    abyss: ["#071220", "#0b1c2c", "#050d16"],     // não há chão: só as águas
  };
  const [f0, f1, f2] = floorPal[env.terrain];
  for (let r = 0; r < rows; r++) {
    const ry = bandTopY + Math.round((r / rows) * bandHpx);
    const rh = Math.ceil(bandHpx / rows) + 1;
    const shade = r / (rows - 1);
    R(0, ry, W, rh, mixHex(mixHex(f2, f1, shade), "#15110c", nightK));
  }
  R(0, bandTopY, W, 2, mixHex("#2c2418", "#0c0a06", nightK)); // borda superior da faixa

  // detalhes do piso (tufos/pedras/ladrilhos) — presos ao mundo (parallax 1:1)
  const cell = 26;
  const c0 = Math.floor(camX / cell) - 1;
  const cols = Math.ceil(W / cell) + 3;
  for (let ci = c0; ci < c0 + cols; ci++) {
    for (let rj = 0; rj < 4; rj++) {
      const rnd = h2(ci, rj);
      if (rnd < 0.42) continue;
      const px = ci * cell - camX + Math.floor(rnd * 14);
      const py = bandTopY + 5 + rj * Math.max(6, Math.floor(bandHpx / 4.6)) + Math.floor(rnd * 5);
      const deep = rj / 3;
      if (env.terrain === "field") {
        // tufos de grama
        const gc = mixHex(mixHex("#3f6034", "#7fae62", deep * 0.6), "#101c10", nightK);
        R(px, py, 1, 3, gc); R(px + 2, py - 1, 1, 4, gc); R(px + 4, py, 1, 3, gc);
      } else if (env.terrain === "city") {
        // juntas de ladrilho + pedrinha
        const lc = mixHex("#6a5c40", "#191510", nightK);
        R(px, py, 8, 1, lc); R(px + 3, py - 3, 1, 4, lc);
        if (rnd > 0.8) R(px + 5, py + 2, 3, 2, mixHex("#a09070", "#242018", nightK));
      } else if (env.terrain === "glory" || env.terrain === "throne") {
        // brilho no piso dourado
        if (!reduce && (t * 0.001 + rnd * 6) % 6 < 0.5) R(px, py, 2, 1, "#fff2c4");
        else R(px, py, 2, 1, mixHex("#e6cc8c", "#302816", nightK));
      } else {
        // patmos: conchas/seixos/areia
        if (rnd > 0.85) { R(px, py, 3, 2, mixHex("#b8a26e", "#242018", nightK)); R(px + 1, py - 1, 1, 1, mixHex("#d0bc86", "#242018", nightK)); }
        else R(px, py, 2, 1, mixHex("#6d5c3a", "#191510", nightK));
      }
    }
  }

  // ---- ILHA: água em PRIMEIRO PLANO (a praia termina no mar, na frente) ----
  if (env.terrain === "patmos") {
    const shoreY = (o.dims.BOT ?? (H - 18)) + 2;
    // areia molhada com brilho
    R(0, shoreY - 4, W, 4, mixHex("#8a744e", "#262018", nightK));
    R(0, shoreY - 4, W, 1, mixHex("#b89e6a", "#3a3226", nightK));
    // ESPUMA VIVA: borda irregular que avança e recua (onda quebrando)
    const tide = reduce ? 0 : Math.sin(t * 0.0014) * 3;
    for (let x2 = -8; x2 < W + 8; x2 += 7) {
      const jag = Math.sin(x2 * 0.4 + t * 0.002) * 1.6 + (h2(Math.floor((x2 + camX) / 7), 9) - 0.5) * 2;
      const fy2 = shoreY - 1 + Math.round(tide * 0.5 + jag);
      R(x2, fy2, 8, 2, mixHex("#eef4f8", "#5a626e", nightK * 0.8));
      R(x2 + 2, fy2 + 2, 5, 1, mixHex("#c2d6e4", "#46506a", nightK * 0.8));
    }
    // mar da frente: 3 tons com dither + cristas + faíscas
    for (let i = 0; i < 5; i++) {
      const wy = shoreY + 1 + i * 3.5;
      R(0, wy, W, 4, mixHex(mixHex("#3a6494", "#1c3454", i / 5), "#0c1626", nightK));
    }
    for (let x2 = 0; x2 < W; x2 += 4) R(x2, shoreY + 7, 2, 1, mixHex("#2e5278", "#101c30", nightK));
    if (!reduce) {
      for (let i = 0; i < 12; i++) {
        const wx = ((i * 83 + t * (0.02 + (i % 3) * 0.012)) % (W + 40)) - 20;
        R(wx, shoreY + 3 + (i % 3) * 4.5, 9, 1, mixHex("#a8c8e4", "#2a3a52", nightK));
      }
      // faíscas de luz na água da frente
      for (let i = 0; i < 6; i++) {
        const sx = (i * 127 + Math.floor(t * 0.01)) % W;
        if (((t * 0.004 + i * 2.1) % 4) < 0.4) R(sx, shoreY + 4 + (i % 3) * 4, 1, 1, "#f2f8ff");
      }
    }
  }
}
