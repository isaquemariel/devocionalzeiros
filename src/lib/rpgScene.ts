// ============================================================================
// RPG Scene — cenário pixel-art procedural (céu, montanhas, chão, props)
// ----------------------------------------------------------------------------
// Motor de fundo reutilizável das cenas do RPG (leitura viva e mapa). Pinta um
// cenário retrô parametrizado por região da Bíblia, com paralaxe (scroll),
// partículas (estrelas / brasas / poeira) e adereços temáticos (palmeiras,
// muros, templo, fogueiras, cidade, água).
//
// Puramente visual — não toca dados. O mascote é desenhado por cima via
// rpgMascot.ts. As dimensões (W/H/GROUND) são passadas pelo chamador, então o
// mesmo motor serve telas de proporções diferentes.
// ============================================================================

import type { RPGRegion } from "@/lib/rpgBibleData";

type G = CanvasRenderingContext2D;
type ParticleKind = "stars" | "embers" | "dust";
type PropKind = "water" | "palms" | "walls" | "temple" | "fire" | "city" | "none";

export interface ScenePalette {
  sky: string[]; // faixas do céu (topo → horizonte)
  sun: string;
  sunY: number;
  ridge: string; // montanha do fundo
  ridge2: string; // montanha do meio
  ridge3: string; // colina da frente
  ground: string;
  ground2: string;
  accent: string;
  particle: ParticleKind;
  props: PropKind;
}

// Paletas por região — alinhadas ao clima de RPG_REGION_THEMES.
export const RPG_SCENE: Record<RPGRegion, ScenePalette> = {
  creation: {
    sky: ["#0b1030", "#151a45", "#282d63", "#4a3f79"], sun: "#f6e9b0", sunY: 32,
    ridge: "#201636", ridge2: "#33254e", ridge3: "#463663", ground: "#2a1f3c", ground2: "#1a1330",
    accent: "#9fb0ff", particle: "stars", props: "water",
  },
  desert: {
    sky: ["#f6bd66", "#eb9a44", "#d97636", "#b8562a"], sun: "#fff3cf", sunY: 40,
    ridge: "#93552a", ridge2: "#b06d31", ridge3: "#c9843c", ground: "#d98f45", ground2: "#a9662c",
    accent: "#ffe0a3", particle: "dust", props: "palms",
  },
  conquest: {
    sky: ["#5a2733", "#7c2f2f", "#a5432f", "#cf7038"], sun: "#ffd39a", sunY: 44,
    ridge: "#341c20", ridge2: "#552a26", ridge3: "#74392c", ground: "#6b3a2b", ground2: "#46251d",
    accent: "#ff9a6a", particle: "dust", props: "walls",
  },
  kingdom: {
    sky: ["#f3cf62", "#e4ac42", "#c9852f", "#8f5a24"], sun: "#fff6d0", sunY: 36,
    ridge: "#7a5a1e", ridge2: "#9c7628", ridge3: "#bd9236", ground: "#8a6a26", ground2: "#5a4318",
    accent: "#ffe08a", particle: "dust", props: "temple",
  },
  exile: {
    sky: ["#0a0a18", "#141426", "#26263c", "#3a3a54"], sun: "#c7d0e0", sunY: 34,
    ridge: "#14141f", ridge2: "#232335", ridge3: "#33334a", ground: "#20202c", ground2: "#12121a",
    accent: "#9fb0c8", particle: "dust", props: "walls",
  },
  wisdom: {
    sky: ["#08201c", "#0d3128", "#14503c", "#1f7a56"], sun: "#d8f5d0", sunY: 36,
    ridge: "#0a2620", ridge2: "#124234", ridge3: "#1c6048", ground: "#123028", ground2: "#0a1c16",
    accent: "#7fe6b0", particle: "stars", props: "temple",
  },
  prophets: {
    sky: ["#2a123a", "#4a1d52", "#70295a", "#a03a52"], sun: "#ff8a5a", sunY: 38,
    ridge: "#1c0e2a", ridge2: "#341843", ridge3: "#4e2557", ground: "#2c1830", ground2: "#1a0f20",
    accent: "#ff9ad0", particle: "embers", props: "fire",
  },
  minor_prophets: {
    sky: ["#0a1030", "#122052", "#1c3a7a", "#2f5aa8"], sun: "#cfe4ff", sunY: 36,
    ridge: "#0c1636", ridge2: "#17285a", ridge3: "#22407e", ground: "#152246", ground2: "#0b1430",
    accent: "#7fb0ff", particle: "stars", props: "water",
  },
  gospels: {
    sky: ["#7a5a1a", "#b8912e", "#e0be4c", "#fbe9a0"], sun: "#fffbe8", sunY: 30,
    ridge: "#6a5018", ridge2: "#96762a", ridge3: "#c2a03e", ground: "#8a6e26", ground2: "#5a4718",
    accent: "#fff0b0", particle: "stars", props: "temple",
  },
  acts: {
    sky: ["#3a1206", "#7a2a10", "#c2481a", "#f5852c"], sun: "#fff0c8", sunY: 34,
    ridge: "#2a0e08", ridge2: "#4e1c10", ridge3: "#7a3018", ground: "#5a2818", ground2: "#38160c",
    accent: "#ffb060", particle: "embers", props: "fire",
  },
  epistles: {
    sky: ["#04201f", "#0a3634", "#125650", "#1f8478"], sun: "#d8fbf2", sunY: 36,
    ridge: "#062622", ridge2: "#0e4640", ridge3: "#186860", ground: "#0e302c", ground2: "#061c1a",
    accent: "#6fe6d0", particle: "dust", props: "city",
  },
  revelation: {
    sky: ["#1a0f2e", "#3a1a48", "#7a2a54", "#e6a64c"], sun: "#fff0c0", sunY: 28,
    ridge: "#281534", ridge2: "#45224e", ridge3: "#642f5c", ground: "#241633", ground2: "#150d20",
    accent: "#ffd27a", particle: "stars", props: "city",
  },
};

export interface Particle {
  x: number;
  y: number;
  s: number;
  tw: number;
  v: number;
}

export interface SceneDims {
  W: number;
  H: number;
  GROUND: number;
}

/** Semente das partículas (chame ao trocar de região / montar a cena). */
export function seedParticles(region: RPGRegion, dims: SceneDims, rand: () => number): Particle[] {
  const pal = RPG_SCENE[region];
  const n = pal.particle === "stars" ? 52 : pal.particle === "embers" ? 28 : 24;
  const out: Particle[] = [];
  for (let i = 0; i < n; i++) {
    out.push({
      x: rand() * dims.W,
      y: rand() * (dims.GROUND - 12),
      s: rand() * 1.6 + 0.4,
      tw: rand() * 6.28,
      v: rand() * 0.4 + 0.1,
    });
  }
  return out;
}

export interface DrawSceneOpts {
  region: RPGRegion;
  dims: SceneDims;
  particles: Particle[];
  t: number;
  scroll: number;
  reduce?: boolean;
}

// ---- helpers ----
const mkPx =
  (g: G) =>
  (x: number, y: number, w: number, h: number, c: string) => {
    g.fillStyle = c;
    g.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
  };
const mkEll =
  (g: G) =>
  (x: number, y: number, rx: number, ry: number, c: string) => {
    g.fillStyle = c;
    g.beginPath();
    g.ellipse(x, y, rx, ry, 0, 0, 6.29);
    g.fill();
  };

/**
 * Pinta o cenário completo (céu → montanhas → partículas → chão → props).
 * O mascote e a UI são desenhados por cima pelo chamador.
 */
export function drawScene(g: G, opts: DrawSceneOpts): void {
  const { region, dims, particles, t, scroll } = opts;
  const reduce = !!opts.reduce;
  const { W, H, GROUND } = dims;
  const pal = RPG_SCENE[region];
  const px = mkPx(g);
  const ell = mkEll(g);

  const dither = (x: number, y: number, w: number, h: number, cA: string, cB: string) => {
    for (let yy = 0; yy < h; yy++)
      for (let xx = 0; xx < w; xx++) {
        g.fillStyle = (Math.round(x) + xx + Math.round(y) + yy) & 1 ? cA : cB;
        g.fillRect(Math.round(x) + xx, Math.round(y) + yy, 1, 1);
      }
  };
  const ridgeLine = (baseY: number, amp: number, step: number, seed: number, color: string) => {
    g.fillStyle = color;
    g.beginPath();
    g.moveTo(0, H);
    for (let x = 0; x <= W; x += step) {
      const y = baseY + Math.sin(x * 0.018 + seed) * amp + Math.sin(x * 0.05 + seed * 2) * amp * 0.4;
      g.lineTo(x, Math.round(y));
    }
    g.lineTo(W, H);
    g.closePath();
    g.fill();
  };

  // --- céu ---
  const c = pal.sky,
    bands = c.length,
    bh = Math.ceil(GROUND / bands);
  for (let i = 0; i < bands; i++) {
    px(0, i * bh, W, bh + 1, c[i]);
    if (i < bands - 1) dither(0, (i + 1) * bh - 1, W, 2, c[i], c[i + 1]);
  }
  const sx = (((200 - scroll * 0.04) % (W + 40)) + (W + 40)) % (W + 40) - 20;
  ell(sx, pal.sunY, 13, 13, pal.sun);
  g.globalAlpha = 0.14;
  ell(sx, pal.sunY, 21, 21, pal.sun);
  g.globalAlpha = 1;

  // --- montanhas (paralaxe) ---
  ridgeLine(GROUND - 46, 10, 10, 1.0, pal.ridge3);
  ridgeLine(GROUND - 32, 13, 8, 2.1, pal.ridge);

  // --- partículas ---
  for (const p of particles) {
    if (pal.particle === "stars") {
      const a = 0.3 + Math.abs(Math.sin(t * 0.004 * p.v * 4 + p.tw)) * 0.7;
      g.globalAlpha = a;
      px(p.x, p.y, 1, 1, "#fff");
      if (p.s > 1.3) px(p.x, p.y, 1.6, 1.6, pal.accent);
      g.globalAlpha = 1;
    } else if (pal.particle === "embers") {
      if (!reduce) {
        p.y -= p.v * 0.6;
        p.x += Math.sin(t * 0.01 + p.tw) * 0.2;
        if (p.y < 18) {
          p.y = GROUND - 6;
          p.x = ((p.x * 1.3 + 47) % W + W) % W;
        }
      }
      g.globalAlpha = 0.7;
      px(p.x, p.y, 1.4, 1.4, p.tw > 3 ? "#ff8a3a" : pal.accent);
      g.globalAlpha = 1;
    } else {
      if (!reduce) {
        p.x -= p.v * 0.5;
        if (p.x < 0) p.x = W;
      }
      g.globalAlpha = 0.22;
      px(p.x, GROUND - 6 - p.y * 0.04, 1.2, 1.2, pal.accent);
      g.globalAlpha = 1;
    }
  }

  ridgeLine(GROUND - 12, 8, 6, 3.4, pal.ridge2);

  // --- chão ---
  px(0, GROUND, W, H - GROUND, pal.ground);
  px(0, GROUND, W, 3, pal.ground2);
  g.globalAlpha = 0.5;
  for (let i = 0; i < 60; i++) {
    const gx = (((i * 37 - scroll) % W) + W) % W;
    px(gx, GROUND + 6 + ((i * 13) % (H - GROUND - 8)), 1, 1, pal.ground2);
  }
  g.globalAlpha = 1;
  g.globalAlpha = 0.18;
  for (let x = (((-scroll) % 18) + 18) % 18; x < W; x += 18) px(x, GROUND, 1, H - GROUND, "#000");
  g.globalAlpha = 1;

  // --- props ---
  drawProps(g, pal, scroll, t, dims, px, ell);
}

// ---- adereços temáticos ----
function drawProps(
  g: G,
  pal: ScenePalette,
  scroll: number,
  t: number,
  dims: SceneDims,
  px: (x: number, y: number, w: number, h: number, c: string) => void,
  ell: (x: number, y: number, rx: number, ry: number, c: string) => void,
): void {
  const { W, GROUND } = dims;
  const s = scroll;
  const wrap = (x: number, span: number) => (((x % span) + span) % span);

  const palm = (x: number, gy: number) => {
    px(x, gy - 30, 3, 30, "#6b4a24");
    px(x + 1, gy - 30, 1, 30, "#8a6330");
    for (const a of [-1, -0.4, 0.2, 0.8]) {
      g.save();
      g.translate(x + 1, gy - 30);
      g.rotate(a);
      px(0, -2, 16, 4, "#3f7a3a");
      px(0, -1, 13, 1, "#54994a");
      g.restore();
    }
  };
  const wall = (x: number, y: number) => {
    px(x, y, 52, 30, "#5a3a2a");
    for (let bx = 0; bx < 52; bx += 13) for (let by = 0; by < 30; by += 8) px(x + bx + 1, y + by + 1, 11, 6, "#6f4838");
    px(x + 18, y - 8, 16, 10, "#472d20");
    px(x, y, 52, 2, "#7a5240");
  };
  const temple = (x: number, y: number) => {
    px(x - 2, y + 34, 60, 8, "#c19a4c");
    px(x - 2, y + 34, 60, 2, "#e0bd66");
    for (let i = 0; i < 5; i++) {
      px(x + i * 12, y + 6, 7, 30, "#d9b055");
      px(x + i * 12, y + 6, 2, 30, "#efc86e");
    }
    px(x - 6, y - 4, 64, 12, "#e8c86a");
    px(x + 2, y - 16, 50, 14, "#c99a3e");
    px(x + 2, y - 16, 50, 2, "#ecc470");
  };
  const fireProp = (x: number, gy: number) => {
    const f = Math.sin(t * 0.02 + x) * 1.5;
    px(x - 3, gy - 8, 7, 8, "#6b2510");
    ell(x, gy - 13 + f, 3, 5, "#ff6a1a");
    ell(x, gy - 15 + f, 1.6, 3.4, "#ffd23a");
  };
  const city = (x: number, y: number) => {
    px(x, y, 74, 30, "#3a2450");
    for (let i = 0; i < 6; i++) px(x + 6 + i * 11, y - 6 - (i % 3) * 5, 8, 10 + (i % 3) * 5, "#6a3a72");
    g.globalAlpha = 0.55;
    px(x - 6, y - 18, 86, 4, pal.accent);
    g.globalAlpha = 1;
  };

  if (pal.props === "palms") {
    for (let i = 0; i < 4; i++) palm(wrap(i * 90 - s * 0.6, W + 60) - 30, GROUND);
  } else if (pal.props === "water") {
    g.globalAlpha = 0.5;
    for (let x = (((-s * 0.4) % 10) + 10) % 10; x < W; x += 10) px(x, GROUND + 7, 6, 1, pal.accent);
    g.globalAlpha = 1;
  } else if (pal.props === "walls") {
    for (let i = 0; i < 3; i++) wall(wrap(i * 110 - s * 0.5, W + 80) - 40, GROUND - 26);
  } else if (pal.props === "temple") {
    temple(wrap(-s * 0.4, W + 120) - 40 + 40, GROUND - 40);
  } else if (pal.props === "fire") {
    for (let i = 0; i < 3; i++) fireProp(wrap(i * 100 - s * 0.6, W + 60) - 20, GROUND - 2);
  } else if (pal.props === "city") {
    city(wrap(-s * 0.35, W + 160) - 50 + 40, GROUND - 30);
  }
}
