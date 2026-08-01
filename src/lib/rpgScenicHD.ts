// ============================================================================
// PAISAGEM VETORIAL HD por região — compartilhada entre o MAPA DE ESTÁGIOS e
// as SALAS (/mundo). Visual moderno pós pixel-art: céu em gradiente, sol/lua/
// estrelas, colinas em camadas com um MARCO temático por região, nuvens,
// chão texturizado e partículas de brilho. Leve: só gradientes e paths.
// ============================================================================

import type { RPGRegion } from "@/lib/rpgBibleData";

type G = CanvasRenderingContext2D;
const TAU = Math.PI * 2;

export type ScenicRegion = RPGRegion | "heaven";
export interface ScenicDims { W: number; H: number; GROUND: number }

type Celestial = "sun" | "moon" | "stars" | "rays";
type Landmark =
  | "tree" | "pyramid" | "tents" | "castle" | "ziggurat" | "bigtree"
  | "mountain" | "waves" | "olives" | "city" | "columns" | "lamps" | "gates";

interface ScenicPal {
  sky: [string, string, string];
  hillFar: string; hillNear: string;
  ground: [string, string];
  celestial: Celestial;
  glow: string;         // cor das partículas/brilhos
  landmark: Landmark;
  light?: boolean;      // paleta clara (céu) — vinheta mais suave
}

const PALS: Record<ScenicRegion, ScenicPal> = {
  creation:       { sky: ["#151038", "#2c2470", "#4a3d9c"], hillFar: "#241d54", hillNear: "#171040", ground: ["#2e2668", "#191344"], celestial: "moon", glow: "#cdd4ff", landmark: "tree" },
  desert:         { sky: ["#2a1608", "#7a3c14", "#e8823c"], hillFar: "#5a3416", hillNear: "#392007", ground: ["#a8712f", "#6d4518"], celestial: "sun", glow: "#ffd98a", landmark: "pyramid" },
  conquest:       { sky: ["#2c1016", "#6d2020", "#c05038"], hillFar: "#4a2418", hillNear: "#291107", ground: ["#7a4a28", "#4a2a12"], celestial: "sun", glow: "#ffb09a", landmark: "tents" },
  kingdom:        { sky: ["#1c1030", "#4a2a5c", "#8a4a6d"], hillFar: "#3a2148", hillNear: "#22112e", ground: ["#5c3a5a", "#33203c"], celestial: "stars", glow: "#ffe08a", landmark: "castle" },
  exile:          { sky: ["#12181f", "#2c3a4c", "#54687c"], hillFar: "#26303e", hillNear: "#151d26", ground: ["#3c4654", "#232b36"], celestial: "moon", glow: "#c8d4e0", landmark: "ziggurat" },
  wisdom:         { sky: ["#0c2014", "#1c4630", "#3a7a52"], hillFar: "#1a3826", hillNear: "#0d2214", ground: ["#2c5438", "#16321e"], celestial: "stars", glow: "#a0e8c0", landmark: "bigtree" },
  prophets:       { sky: ["#140d2a", "#33205c", "#5c3a8c"], hillFar: "#281a48", hillNear: "#150d2e", ground: ["#382558", "#201238"], celestial: "stars", glow: "#d0bcff", landmark: "mountain" },
  minor_prophets: { sky: ["#081826", "#14425c", "#2a7a94"], hillFar: "#123448", hillNear: "#091e2c", ground: ["#1c4a5e", "#0e2c3a"], celestial: "moon", glow: "#a0e0ff", landmark: "waves" },
  gospels:        { sky: ["#2a1a08", "#7a4a14", "#e8a044"], hillFar: "#54350f", hillNear: "#311c05", ground: ["#8a6228", "#54380f"], celestial: "sun", glow: "#ffe9b0", landmark: "olives" },
  acts:           { sky: ["#220e08", "#661f10", "#c2541e"], hillFar: "#4a1e0e", hillNear: "#280e05", ground: ["#733a16", "#44200a"], celestial: "sun", glow: "#ffb070", landmark: "city" },
  epistles:       { sky: ["#1a1222", "#463052", "#8a5a74"], hillFar: "#382441", hillNear: "#1f1225", ground: ["#54364a", "#30202e"], celestial: "stars", glow: "#f0d8ff", landmark: "columns" },
  revelation:     { sky: ["#080c20", "#1c2454", "#3a3f8c"], hillFar: "#141a44", hillNear: "#090d29", ground: ["#232a5c", "#12163a"], celestial: "stars", glow: "#ffd24a", landmark: "lamps" },
  heaven:         { sky: ["#cfe0ff", "#f2ecd8", "#ffe9b8"], hillFar: "#e8d9ae", hillNear: "#d9c28a", ground: ["#f4e4b4", "#dcc488"], celestial: "rays", glow: "#ffffff", landmark: "gates", light: true },
};

const glow = (g: G, x: number, y: number, r: number, color: string, a: number) => {
  const gr = g.createRadialGradient(x, y, 0.5, x, y, r);
  gr.addColorStop(0, color); gr.addColorStop(1, "transparent");
  g.save(); g.globalAlpha *= a; g.fillStyle = gr;
  g.beginPath(); g.arc(x, y, r, 0, TAU); g.fill(); g.restore();
};

// silhueta de colina ondulada (base na linha `by`, subindo até by-amp)
const hillPath = (g: G, W: number, by: number, amp: number, ph: number) => {
  g.beginPath();
  g.moveTo(-4, by + 4);
  for (let x = -4; x <= W + 4; x += 10) {
    g.lineTo(x, by - (Math.sin(x * 0.012 + ph) * 0.5 + 0.5) * amp - Math.sin(x * 0.05 + ph * 2) * amp * 0.12);
  }
  g.lineTo(W + 4, by + 4);
  g.closePath();
};

function drawLandmark(g: G, kind: Landmark, x: number, by: number, c: string, glowC: string, t: number, reduce: boolean): void {
  g.save();
  g.fillStyle = c; g.strokeStyle = c; g.lineCap = "round";
  switch (kind) {
    case "tree": {
      g.lineWidth = 3; g.beginPath(); g.moveTo(x, by); g.lineTo(x, by - 16); g.stroke();
      for (const [dx, dy, r] of [[-6, -20, 7], [6, -20, 7], [0, -27, 8]] as const) {
        g.beginPath(); g.arc(x + dx, by + dy, r, 0, TAU); g.fill();
      }
      break;
    }
    case "pyramid": {
      g.beginPath(); g.moveTo(x - 26, by); g.lineTo(x, by - 30); g.lineTo(x + 26, by); g.closePath(); g.fill();
      g.save(); g.globalAlpha = 0.25; g.fillStyle = "#ffffff";
      g.beginPath(); g.moveTo(x, by - 30); g.lineTo(x + 26, by); g.lineTo(x + 12, by); g.lineTo(x - 1, by - 26); g.closePath(); g.fill();
      g.restore();
      break;
    }
    case "tents": {
      for (const [dx, s] of [[-16, 0.8], [4, 1], [22, 0.7]] as const) {
        g.beginPath(); g.moveTo(x + dx - 11 * s, by); g.lineTo(x + dx, by - 15 * s); g.lineTo(x + dx + 11 * s, by); g.closePath(); g.fill();
      }
      break;
    }
    case "castle": {
      g.fillRect(x - 22, by - 18, 44, 18);
      for (let i = 0; i < 6; i++) g.fillRect(x - 22 + i * 8, by - 22, 4.5, 5);
      for (const s of [-1, 1]) {
        g.fillRect(x + s * 26 - 5, by - 32, 10, 32);
        g.beginPath(); g.moveTo(x + s * 26 - 6, by - 32); g.lineTo(x + s * 26, by - 42); g.lineTo(x + s * 26 + 6, by - 32); g.closePath(); g.fill();
      }
      g.fillStyle = glowC; g.globalAlpha = 0.8;
      g.fillRect(x - 8, by - 12, 3, 4); g.fillRect(x + 6, by - 14, 3, 4);
      break;
    }
    case "ziggurat": {
      g.fillRect(x - 26, by - 9, 52, 9);
      g.fillRect(x - 17, by - 18, 34, 9);
      g.fillRect(x - 9, by - 27, 18, 9);
      break;
    }
    case "bigtree": {
      g.lineWidth = 4.5; g.beginPath(); g.moveTo(x, by); g.quadraticCurveTo(x - 2, by - 14, x, by - 24); g.stroke();
      for (const [dx, dy, r] of [[-11, -27, 10], [10, -28, 9], [0, -37, 11], [-2, -25, 9]] as const) {
        g.beginPath(); g.arc(x + dx, by + dy, r, 0, TAU); g.fill();
      }
      break;
    }
    case "mountain": {
      g.beginPath(); g.moveTo(x - 30, by); g.lineTo(x - 4, by - 38); g.lineTo(x + 26, by); g.closePath(); g.fill();
      g.fillStyle = "rgba(255,255,255,0.55)";
      g.beginPath(); g.moveTo(x - 4, by - 38); g.lineTo(x + 4, by - 27); g.lineTo(x - 1, by - 27.5); g.lineTo(x - 8, by - 26); g.closePath(); g.fill();
      if (!reduce && Math.sin(t * 0.0017) > 0.976) {
        g.strokeStyle = "#e8ecff"; g.lineWidth = 1.4; g.globalAlpha = 0.9;
        g.beginPath(); g.moveTo(x - 4, by - 36); g.lineTo(x - 8, by - 26); g.lineTo(x - 3, by - 24); g.lineTo(x - 7, by - 14); g.stroke();
      }
      break;
    }
    case "waves": {
      g.lineWidth = 2; g.globalAlpha = 0.8;
      for (let r = 0; r < 3; r++) {
        const off = reduce ? 0 : (t * (0.008 + r * 0.003)) % 44;
        g.beginPath();
        for (let wx = -50 + off; wx < x + 90; wx += 22) {
          g.moveTo(wx, by - 6 - r * 7);
          g.quadraticCurveTo(wx + 6, by - 10 - r * 7, wx + 12, by - 6 - r * 7);
        }
        g.stroke();
      }
      break;
    }
    case "olives": {
      for (const [dx, s] of [[-18, 0.8], [0, 1], [18, 0.75]] as const) {
        g.lineWidth = 2.4 * s; g.beginPath(); g.moveTo(x + dx, by); g.lineTo(x + dx, by - 9 * s); g.stroke();
        g.beginPath(); g.arc(x + dx, by - 13 * s, 6.5 * s, 0, TAU); g.fill();
      }
      break;
    }
    case "city": {
      for (const [dx, w, h] of [[-28, 12, 22], [-14, 10, 30], [-2, 12, 18], [12, 10, 26], [24, 9, 20]] as const) {
        g.fillRect(x + dx, by - h, w, h);
      }
      g.fillStyle = glowC; g.globalAlpha = 0.85;
      for (let i = 0; i < 7; i++) g.fillRect(x - 26 + ((i * 37) % 56), by - 8 - ((i * 23) % 18), 2, 2.6);
      break;
    }
    case "columns": {
      g.fillRect(x - 24, by - 30, 48, 5);
      for (const dx of [-18, -6, 6, 18]) g.fillRect(x + dx - 2.5, by - 26, 5, 26);
      g.beginPath(); g.moveTo(x - 26, by - 30); g.lineTo(x, by - 40); g.lineTo(x + 26, by - 30); g.closePath(); g.fill();
      break;
    }
    case "lamps": {
      for (let i = 0; i < 7; i++) {
        const lx = x - 27 + i * 9;
        g.lineWidth = 1.8; g.beginPath(); g.moveTo(lx, by); g.lineTo(lx, by - 9); g.stroke();
        const tw = reduce ? 0.8 : Math.sin(t * 0.008 + i) * 0.3 + 0.7;
        glow(g, lx, by - 12, 6, glowC, 0.5 * tw);
        g.fillStyle = glowC;
        g.beginPath(); g.arc(lx, by - 11.5, 1.6, 0, TAU); g.fill();
        g.fillStyle = c;
      }
      break;
    }
    case "gates": {
      // portões de ouro do Céu
      g.fillStyle = "#e8c878";
      for (const s of [-1, 1]) g.fillRect(x + s * 20 - 4.5, by - 30, 9, 30);
      g.beginPath(); g.moveTo(x - 18, by - 26); g.quadraticCurveTo(x, by - 44, x + 18, by - 26); g.lineTo(x + 14, by - 24); g.quadraticCurveTo(x, by - 38, x - 14, by - 24); g.closePath(); g.fill();
      glow(g, x, by - 18, 24, "#fff6d8", 0.55);
      break;
    }
  }
  g.restore();
}

/** Desenha a paisagem HD completa da região no canvas (0,0 até W×H). */
export function drawScenicHD(g: G, region: ScenicRegion, dims: ScenicDims, t: number, reduce: boolean): void {
  const { W, H, GROUND } = dims;
  const pal = PALS[region] ?? PALS.creation;

  // ---- céu ----
  const sky = g.createLinearGradient(0, 0, 0, GROUND + 20);
  sky.addColorStop(0, pal.sky[0]); sky.addColorStop(0.6, pal.sky[1]); sky.addColorStop(1, pal.sky[2]);
  g.fillStyle = sky; g.fillRect(0, 0, W, GROUND + 20);

  // estrelas (noites) — cintilam
  if (pal.celestial === "stars" || pal.celestial === "moon") {
    g.save();
    for (let i = 0; i < 26; i++) {
      const sx = (i * 89 + 23) % W;
      const sy = (i * 47 + 11) % (GROUND * 0.62);
      const tw = reduce ? 0.7 : Math.sin(t * 0.0016 + i * 1.9) * 0.5 + 0.5;
      g.globalAlpha = 0.3 + tw * 0.55;
      g.fillStyle = "#eef2ff";
      g.beginPath(); g.arc(sx, sy, i % 6 === 0 ? 1.2 : 0.7, 0, TAU); g.fill();
      if (i % 8 === 0) glow(g, sx, sy, 4, pal.glow, tw * 0.4);
    }
    g.restore();
  }

  // astro
  const cx = W * 0.76, cy = GROUND * 0.3;
  if (pal.celestial === "sun") {
    glow(g, cx, cy, 46, pal.glow, 0.55);
    const sg = g.createRadialGradient(cx - 3, cy - 3, 1, cx, cy, 15);
    sg.addColorStop(0, "#fff3c8"); sg.addColorStop(1, "#ffb45a");
    g.fillStyle = sg; g.beginPath(); g.arc(cx, cy, 14, 0, TAU); g.fill();
  } else if (pal.celestial === "moon") {
    glow(g, cx, cy, 36, "#cdd9f2", 0.4);
    g.fillStyle = "#e8edf8"; g.beginPath(); g.arc(cx, cy, 11, 0, TAU); g.fill();
    g.fillStyle = pal.sky[1]; g.beginPath(); g.arc(cx + 4.5, cy - 3, 9, 0, TAU); g.fill();
  } else if (pal.celestial === "rays") {
    // raios suaves descendo (Céu / glória)
    g.save();
    const rot = reduce ? 0 : t * 0.00018;
    g.translate(W * 0.5, -H * 0.1); g.rotate(rot);
    for (let i = 0; i < 7; i++) {
      const a = (i / 7) * TAU;
      g.save(); g.rotate(a);
      const rg = g.createLinearGradient(0, 0, 0, H * 0.9);
      rg.addColorStop(0, "rgba(255,246,216,0.28)"); rg.addColorStop(1, "rgba(255,246,216,0)");
      g.fillStyle = rg;
      g.beginPath(); g.moveTo(-7, 0); g.lineTo(7, 0); g.lineTo(26, H * 0.9); g.lineTo(-26, H * 0.9); g.closePath(); g.fill();
      g.restore();
    }
    g.restore();
  }

  // nuvens suaves à deriva
  if (!pal.light || pal.celestial === "rays") {
    g.save();
    for (let i = 0; i < 4; i++) {
      const nx = ((i * 173 + (reduce ? 0 : t * 0.004)) % (W + 160)) - 80;
      const ny = GROUND * (0.18 + (i % 3) * 0.13);
      g.globalAlpha = pal.light ? 0.5 : 0.1;
      g.fillStyle = "#ffffff";
      for (const [dx, dy, rx] of [[-16, 2, 16], [4, -3, 20], [22, 2, 14]] as const) {
        g.beginPath(); g.ellipse(nx + dx, ny + dy, rx, rx * 0.42, 0, 0, TAU); g.fill();
      }
    }
    g.restore();
  }

  // ---- colinas em camadas + marco temático ----
  g.fillStyle = pal.hillFar;
  hillPath(g, W, GROUND + 2, 34, 1.2); g.fill();
  drawLandmark(g, pal.landmark, W * 0.3, GROUND - 16, pal.hillNear, pal.glow, t, reduce);
  g.fillStyle = pal.hillNear;
  hillPath(g, W, GROUND + 2, 16, 4.1); g.fill();

  // ---- chão ----
  const fl = g.createLinearGradient(0, GROUND, 0, H);
  fl.addColorStop(0, pal.ground[0]); fl.addColorStop(1, pal.ground[1]);
  g.fillStyle = fl; g.fillRect(0, GROUND, W, H - GROUND);
  g.fillStyle = "rgba(0,0,0,0.25)"; g.fillRect(0, GROUND, W, 1.2);
  // textura sutil (pedrinhas/manchas estáveis)
  g.save();
  for (let i = 0; i < 22; i++) {
    const px = (i * 131 + 17) % W;
    const py = GROUND + 8 + ((i * 67) % Math.max(8, H - GROUND - 14));
    const deep = (py - GROUND) / Math.max(1, H - GROUND);
    g.globalAlpha = 0.08 + deep * 0.1;
    g.fillStyle = i % 3 ? "#000000" : "#ffffff";
    g.beginPath(); g.ellipse(px, py, 3 + (i % 4) * 2 * (0.6 + deep), 1 + (i % 3) * 0.7, 0, 0, TAU); g.fill();
  }
  g.restore();
  // poça de luz no centro do chão (palco)
  glow(g, W * 0.5, GROUND + (H - GROUND) * 0.45, Math.max(W, H) * 0.32, pal.glow, pal.light ? 0.18 : 0.1);

  // ---- partículas flutuando (vaga-lumes / brasas / flocos de luz) ----
  if (!reduce) {
    g.save();
    for (let i = 0; i < 12; i++) {
      const ph = ((t * 0.0045 + i * 431) % 1000) / 1000;
      const px = ((i * 197 + 43) % W) + Math.sin(t * 0.001 + i * 2.1) * 14;
      const py = H - ph * (H * 0.85);
      const tw = Math.sin(t * 0.005 + i * 1.7) * 0.5 + 0.5;
      g.globalAlpha = (1 - ph) * 0.5 * (0.4 + tw * 0.6);
      g.fillStyle = pal.glow;
      g.beginPath(); g.arc(px, py, i % 4 === 0 ? 1.6 : 1, 0, TAU); g.fill();
      if (i % 5 === 0) glow(g, px, py, 5, pal.glow, (1 - ph) * 0.3);
    }
    g.restore();
  }

  // ---- vinheta ----
  const vg = g.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.42, W / 2, H / 2, Math.max(W, H) * 0.78);
  vg.addColorStop(0, "rgba(0,0,0,0)");
  vg.addColorStop(1, pal.light ? "rgba(60,40,10,0.22)" : "rgba(0,0,0,0.42)");
  g.fillStyle = vg; g.fillRect(0, 0, W, H);
}
