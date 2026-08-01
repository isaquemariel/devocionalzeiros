// ============================================================================
// RPG Stage HD — arte VETORIAL moderna da CENA VIVA (pós pixel-art).
//
// Tudo desenhado com paths/gradientes/brilhos em canvas de alta resolução:
// - drawBackdropHD: céus com gradiente contínuo, mar com ondas suaves e
//   reflexo, cidades com janelas acesas, chão com luz de profundidade.
// - drawPropHD: palmeira, rocha, castiçal (chama animada), igreja, torre,
//   árvore da vida, estrela, porta luminosa.
// - drawHumanHD: humanos chibi modernos (olhos grandes com brilho, túnicas com
//   gradiente e dobras) — João, Cristo glorificado, anjo, ancião…
// - drawHeroHD: o Devocionalzeiro no visual da referência aprovada — corpo "D"
//   com gradiente e rim-light, olhos grandes vítreos, emblema no peito.
//
// Leve: só canvas 2D nativo (sem imagens externas), formas + gradientes.
// ============================================================================

import type { MascotLook, MascotColor } from "@/lib/rpgMascot";
import type { StageDims, StageEnv, StageDrawState, StageTerrain } from "@/lib/rpgStage";

type G = CanvasRenderingContext2D;

// ---------- helpers ----------
const TAU = Math.PI * 2;
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const lerp = (a: number, b: number, k: number) => a + (b - a) * k;

const mixHex = (a: string, b: string, k: number): string => {
  const pa = parseInt(a.slice(1), 16), pb = parseInt(b.slice(1), 16);
  const r = Math.round(((pa >> 16) & 255) * (1 - k) + ((pb >> 16) & 255) * k);
  const gg = Math.round(((pa >> 8) & 255) * (1 - k) + ((pb >> 8) & 255) * k);
  const bl = Math.round((pa & 255) * (1 - k) + (pb & 255) * k);
  return `#${((r << 16) | (gg << 8) | bl).toString(16).padStart(6, "0")}`;
};

const rr = (g: G, x: number, y: number, w: number, h: number, r: number) => {
  const rad = Math.min(r, w / 2, h / 2);
  g.beginPath();
  g.moveTo(x + rad, y);
  g.arcTo(x + w, y, x + w, y + h, rad);
  g.arcTo(x + w, y + h, x, y + h, rad);
  g.arcTo(x, y + h, x, y, rad);
  g.arcTo(x, y, x + w, y, rad);
  g.closePath();
};

const softShadow = (g: G, x: number, fy: number, w: number, alpha = 0.28) => {
  g.save();
  const grd = g.createRadialGradient(x, fy, 1, x, fy, w);
  grd.addColorStop(0, `rgba(0,0,0,${alpha})`);
  grd.addColorStop(1, "rgba(0,0,0,0)");
  g.fillStyle = grd;
  g.beginPath(); g.ellipse(x, fy, w, w * 0.28, 0, 0, TAU); g.fill();
  g.restore();
};

const glowCircle = (g: G, x: number, y: number, r: number, color: string, alpha: number) => {
  g.save();
  const grd = g.createRadialGradient(x, y, 0, x, y, r);
  grd.addColorStop(0, color);
  grd.addColorStop(1, "rgba(0,0,0,0)");
  g.globalAlpha *= alpha;
  g.fillStyle = grd;
  g.fillRect(x - r, y - r, r * 2, r * 2);
  g.restore();
};

// ============================================================================
// FUNDO HD
// ============================================================================

interface SkyPal { day: [string, string, string]; night: [string, string, string]; glory: [string, string, string] }
const SKY: Record<StageTerrain, SkyPal> = {
  patmos: { day: ["#3f5d95", "#7d95bd", "#d9c193"], night: ["#0a1126", "#1a2547", "#333a63"], glory: ["#463c86", "#a084b8", "#ffe6a8"] },
  city: { day: ["#40507e", "#7c88ab", "#d9c8a0"], night: ["#0b0f26", "#1c2242", "#3b3a60"], glory: ["#4a4488", "#9484b4", "#ffe9b0"] },
  glory: { day: ["#4a3a80", "#a583b8", "#ffedb8"], night: ["#170e30", "#302050", "#5c4478"], glory: ["#6a4a9e", "#c495c4", "#fff3cc"] },
  field: { day: ["#3a5c92", "#7d9cbd", "#d9d0a4"], night: ["#091023", "#16203c", "#333a58"], glory: ["#44508e", "#9291bc", "#fff0b8"] },
  throne: { day: ["#2c1c50", "#6a4488", "#eab77e"], night: ["#100a26", "#241648", "#4c3068"], glory: ["#3c2a70", "#8a58a0", "#ffe0a0"] },
};

const skyStops = (t: StageTerrain, night: number, glory: number): [string, string, string] => {
  const p = SKY[t];
  return [0, 1, 2].map((i) => {
    let c = p.day[i];
    c = mixHex(c, p.night[i], clamp01(night));
    c = mixHex(c, p.glory[i], clamp01(glory) * 0.85);
    return c;
  }) as [string, string, string];
};

export interface HDBackdropOpts { dims: StageDims; t: number; reduce: boolean; state: StageDrawState }

export function drawBackdropHD(g: G, o: HDBackdropOpts): void {
  const { dims, t, reduce, state } = o;
  const { W, H, GROUND } = dims;
  const k = reduce ? 1 : 0.05;
  state.env.night = lerp(state.env.night, state.envTarget.night, k);
  state.env.glory = lerp(state.env.glory, state.envTarget.glory, k);
  state.env.storm = lerp(state.env.storm, state.envTarget.storm, k);
  state.env.fire = lerp(state.env.fire, state.envTarget.fire, k);
  state.env.terrain = state.envTarget.terrain;
  const env = state.env;
  const night = clamp01(env.night);

  // ---- céu: gradiente contínuo ----
  const [s0, s1, s2] = skyStops(env.terrain, env.night, env.glory);
  const sky = g.createLinearGradient(0, 0, 0, GROUND);
  sky.addColorStop(0, s0); sky.addColorStop(0.55, s1); sky.addColorStop(1, s2);
  g.fillStyle = sky;
  g.fillRect(0, 0, W, GROUND + 2);

  // estrelas com brilho suave
  if (night > 0.15) {
    g.save();
    for (let i = 0; i < 34; i++) {
      const sx = (i * 97 + 31) % W;
      const sy = (i * 53 + 17) % (GROUND * 0.6);
      const tw = reduce ? 0.8 : Math.sin(t * 0.0018 + i * 1.7) * 0.5 + 0.5;
      g.globalAlpha = night * (0.35 + tw * 0.55);
      g.fillStyle = "#eef2ff";
      g.beginPath(); g.arc(sx, sy, i % 5 === 0 ? 1.1 : 0.7, 0, TAU); g.fill();
      if (i % 7 === 0) glowCircle(g, sx, sy, 4, "#c8d4ff", night * tw * 0.4);
    }
    g.restore();
  }

  // glória descendo
  if (env.glory > 0.05) {
    g.save();
    const grd = g.createRadialGradient(W * 0.5, -H * 0.25, 10, W * 0.5, -H * 0.25, H * 1.2);
    grd.addColorStop(0, `rgba(255,244,208,${0.55 * env.glory})`);
    grd.addColorStop(1, "rgba(255,244,208,0)");
    g.fillStyle = grd; g.fillRect(0, 0, W, GROUND + 30);
    g.restore();
  }

  // relâmpago
  if (env.storm > 0.25 && !reduce && Math.sin(t * 0.0021) > 0.985) {
    g.save(); g.globalAlpha = 0.3; g.fillStyle = "#e8ecff"; g.fillRect(0, 0, W, GROUND); g.restore();
  }

  // ---- meio-plano por terreno ----
  if (env.terrain === "patmos") {
    // mar do horizonte
    const seaY = GROUND * 0.6;
    const sea = g.createLinearGradient(0, seaY, 0, GROUND);
    sea.addColorStop(0, mixHex("#1c3a60", "#0a1526", night * 0.7));
    sea.addColorStop(1, mixHex("#3c6ea6", "#16283f", night * 0.7));
    g.fillStyle = sea; g.fillRect(0, seaY, W, GROUND - seaY);
    // ilhas distantes (silhuetas suaves)
    g.save();
    g.fillStyle = mixHex("#42506a", "#1c2436", night * 0.6);
    for (let i = 0; i < 4; i++) {
      const ix = (i * W) / 3.2 + 30;
      g.beginPath();
      g.moveTo(ix - 55, seaY + 1);
      g.quadraticCurveTo(ix - 20, seaY - 16, ix + 8, seaY - 8);
      g.quadraticCurveTo(ix + 30, seaY - 14, ix + 55, seaY + 1);
      g.closePath(); g.fill();
    }
    g.restore();
    // reflexo do sol/lua
    if (!reduce) {
      g.save();
      const rx = W * 0.64;
      for (let i = 0; i < 10; i++) {
        const ry = seaY + 4 + i * ((GROUND - seaY - 6) / 10);
        const sway = Math.sin(t * 0.0025 + i * 1.6) * (2.5 + i * 0.7);
        g.globalAlpha = (night > 0.4 ? 0.24 : 0.3) * (1 - i / 12);
        g.fillStyle = night > 0.4 ? "#cdd9f2" : "#ffe9b0";
        rr(g, rx + sway - 6 + i * 0.4, ry, 12 - i * 0.5, 1.6, 1); g.fill();
      }
      g.restore();
      // ondas do horizonte
      g.save();
      g.strokeStyle = mixHex("#9cc2e8", "#3a5578", night * 0.7);
      g.lineWidth = 0.8; g.globalAlpha = 0.5;
      for (let i = 0; i < 10; i++) {
        const wy = seaY + 4 + (i * (GROUND - seaY - 8)) / 10;
        const off = (t * (0.008 + (i % 3) * 0.004)) % 60;
        g.beginPath();
        for (let x2 = -60 + off; x2 < W + 30; x2 += 46) {
          g.moveTo(x2, wy);
          g.quadraticCurveTo(x2 + 8, wy - 1.4, x2 + 16, wy);
        }
        g.stroke();
      }
      g.restore();
      // gaivotas
      if (night < 0.35) {
        g.save(); g.strokeStyle = "#e8ecf0"; g.lineWidth = 1; g.globalAlpha = 0.8;
        for (let i = 0; i < 3; i++) {
          const gx = ((i * 240 + t * 0.018) % (W + 80)) - 40;
          const gy = GROUND * 0.26 + i * 12 + Math.sin(t * 0.004 + i * 2) * 4;
          g.beginPath();
          g.moveTo(gx - 4, gy); g.quadraticCurveTo(gx - 1, gy - 2.6, gx, gy);
          g.quadraticCurveTo(gx + 1, gy - 2.6, gx + 4, gy);
          g.stroke();
        }
        g.restore();
      }
    }
  } else if (env.terrain === "city") {
    // camadas de cidade (silhuetas com topos variados + janelas acesas)
    const layers = [
      { y: GROUND * 0.66, c0: "#565a78", n: 7, hMax: 42, win: night > 0.3 },
      { y: GROUND * 0.82, c0: "#3f435c", n: 9, hMax: 30, win: night > 0.25 },
    ];
    for (const L of layers) {
      g.save();
      g.fillStyle = mixHex(L.c0, "#181a2c", night * 0.7);
      for (let i = 0; i < L.n; i++) {
        const bw = W / L.n + 8;
        const bx = i * (W / L.n) - 4;
        const bh = 14 + ((i * 37) % L.hMax);
        rr(g, bx, L.y - bh, bw - 6, bh + 4, 2); g.fill();
        if (i % 3 === 0) { rr(g, bx + bw * 0.3, L.y - bh - 7, bw * 0.24, 8, 2); g.fill(); }
      }
      if (L.win) {
        g.fillStyle = "#ffd98a";
        for (let i = 0; i < L.n * 3; i++) {
          const wx = (i * 53 + 17) % W;
          const wy = L.y - 8 - ((i * 29) % (L.hMax - 8));
          g.globalAlpha = 0.5 + ((i * 7) % 4) * 0.12;
          g.fillRect(wx, wy, 1.6, 2.2);
        }
      }
      g.restore();
    }
  } else if (env.terrain === "glory" || env.terrain === "throne") {
    // nuvens luminosas
    g.save();
    for (let i = 0; i < 6; i++) {
      const cx2 = ((i * 210 + t * 0.006) % (W + 300)) - 150;
      const cy = GROUND * (0.45 + (i % 3) * 0.14);
      const grd = g.createRadialGradient(cx2, cy, 4, cx2, cy, 60);
      grd.addColorStop(0, `rgba(255,240,200,${0.35 + env.glory * 0.25})`);
      grd.addColorStop(1, "rgba(255,240,200,0)");
      g.fillStyle = grd;
      g.beginPath(); g.ellipse(cx2, cy, 62, 16, 0, 0, TAU); g.fill();
    }
    g.restore();
  } else {
    // colinas suaves
    g.save();
    g.fillStyle = mixHex("#47663f", "#1c2a1a", night * 0.7);
    g.beginPath();
    g.moveTo(0, GROUND);
    for (let x2 = 0; x2 <= W; x2 += 8) {
      g.lineTo(x2, GROUND - 10 - Math.sin(x2 * 0.015) * 9 - Math.sin(x2 * 0.05) * 3);
    }
    g.lineTo(W, GROUND); g.closePath(); g.fill();
    g.restore();
  }

  // ---- CHÃO: gradiente de profundidade + textura suave ----
  const floorPal: Record<StageTerrain, [string, string]> = {
    patmos: ["#7c6844", "#a89058"],
    city: ["#6d604a", "#968a68"],
    glory: ["#a8905c", "#d9be80"],
    throne: ["#a8905c", "#d9be80"],
    field: ["#4b6a3c", "#729256"],
  };
  const [fFar, fNear] = floorPal[env.terrain];
  const floor = g.createLinearGradient(0, GROUND, 0, H);
  floor.addColorStop(0, mixHex(fFar, "#141008", night * 0.6));
  floor.addColorStop(1, mixHex(fNear, "#221c10", night * 0.6));
  g.fillStyle = floor;
  g.fillRect(0, GROUND, W, H - GROUND);
  // linha do horizonte do chão
  g.fillStyle = `rgba(0,0,0,${0.28 + night * 0.15})`;
  g.fillRect(0, GROUND, W, 1.4);
  // manchas orgânicas de textura
  g.save();
  for (let i = 0; i < 26; i++) {
    const px = (i * 137 + 23) % W;
    const py = GROUND + 6 + ((i * 61) % (H - GROUND - 12));
    const deep = (py - GROUND) / (H - GROUND);
    g.globalAlpha = 0.1 + deep * 0.08;
    g.fillStyle = i % 3 ? "#00000055" : "#ffffff2e";
    g.beginPath(); g.ellipse(px, py, 4 + (i % 4) * 2.5, 1.4 + (i % 3), 0, 0, TAU); g.fill();
  }
  g.restore();

  // ---- ilha: água na FRENTE (praia termina no mar) ----
  if (env.terrain === "patmos") {
    const shoreY = (dims.BOT ?? H - 18) + 3;
    // areia molhada
    const wet = g.createLinearGradient(0, shoreY - 6, 0, shoreY);
    wet.addColorStop(0, "rgba(0,0,0,0)");
    wet.addColorStop(1, `rgba(60,48,28,${0.5 - night * 0.15})`);
    g.fillStyle = wet; g.fillRect(0, shoreY - 6, W, 6);
    // mar frontal
    const fsea = g.createLinearGradient(0, shoreY, 0, H);
    fsea.addColorStop(0, mixHex("#4a7ab0", "#1c3050", night * 0.7));
    fsea.addColorStop(1, mixHex("#274a74", "#0e1c30", night * 0.7));
    g.fillStyle = fsea; g.fillRect(0, shoreY, W, H - shoreY);
    // espuma viva (borda ondulada)
    const tide = reduce ? 0 : Math.sin(t * 0.0014) * 2.4;
    g.save();
    g.strokeStyle = `rgba(238,246,250,${0.85 - night * 0.3})`;
    g.lineWidth = 1.8; g.lineCap = "round";
    g.beginPath();
    for (let x2 = -10; x2 <= W + 10; x2 += 14) {
      const jag = Math.sin(x2 * 0.12 + t * 0.002) * 1.8;
      const yy = shoreY + tide + jag;
      if (x2 === -10) g.moveTo(x2, yy);
      else g.quadraticCurveTo(x2 - 7, yy - 2.2, x2, yy);
    }
    g.stroke();
    g.globalAlpha = 0.35;
    g.lineWidth = 1;
    g.beginPath();
    for (let x2 = -10; x2 <= W + 10; x2 += 18) {
      const yy = shoreY + 4 + tide * 0.6 + Math.sin(x2 * 0.09 + t * 0.0016 + 2) * 1.6;
      if (x2 === -10) g.moveTo(x2, yy);
      else g.quadraticCurveTo(x2 - 9, yy - 1.8, x2, yy);
    }
    g.stroke();
    g.restore();
    // cintilância
    if (!reduce) {
      g.save();
      for (let i = 0; i < 6; i++) {
        const sx = (i * 127 + Math.floor(t * 0.012)) % W;
        if (((t * 0.004 + i * 2.1) % 4) < 0.4) {
          g.globalAlpha = 0.8; g.fillStyle = "#f2f8ff";
          g.fillRect(sx, shoreY + 5 + (i % 3) * 4, 1.6, 1.6);
        }
      }
      g.restore();
    }
  }
}

// ============================================================================
// PROPS HD
// ============================================================================

export interface HDPropOpts { scale?: number; t?: number; reduce?: boolean; fire?: number }

export function drawPropHD(g: G, kind: string, x: number, fy: number, o: HDPropOpts = {}): void {
  const S = o.scale ?? 1;
  const t = o.t ?? 0;
  const reduce = !!o.reduce;

  switch (kind) {
    case "palm": {
      softShadow(g, x, fy, 14 * S);
      // tronco curvo
      g.save();
      g.strokeStyle = "#6d5334"; g.lineCap = "round";
      g.lineWidth = 3.4 * S;
      g.beginPath(); g.moveTo(x, fy); g.quadraticCurveTo(x + 4 * S, fy - 18 * S, x + 9 * S, fy - 32 * S); g.stroke();
      g.strokeStyle = "#8a6a42"; g.lineWidth = 1.6 * S;
      g.beginPath(); g.moveTo(x + 1 * S, fy - 2 * S); g.quadraticCurveTo(x + 5 * S, fy - 18 * S, x + 9.5 * S, fy - 31 * S); g.stroke();
      // folhas (arcos com gradiente)
      const topX = x + 9 * S, topY = fy - 33 * S;
      const sway = reduce ? 0 : Math.sin(t * 0.0016 + x) * 1.6 * S;
      for (let i = 0; i < 6; i++) {
        const ang = (i / 6) * Math.PI * 1.9 - Math.PI * 0.95;
        const lx = Math.cos(ang) * 15 * S, ly = Math.sin(ang) * 7 * S - 4 * S;
        const grd = g.createLinearGradient(topX, topY, topX + lx, topY + ly);
        grd.addColorStop(0, "#3f7a42"); grd.addColorStop(1, "#6faf62");
        g.strokeStyle = grd as unknown as string;
        g.lineWidth = 2.6 * S;
        g.beginPath();
        g.moveTo(topX, topY);
        g.quadraticCurveTo(topX + lx * 0.5, topY + ly - 5 * S, topX + lx + sway, topY + ly + 3 * S);
        g.stroke();
      }
      // cocos
      g.fillStyle = "#7a5a34";
      g.beginPath(); g.arc(topX - 2 * S, topY + 2 * S, 1.8 * S, 0, TAU); g.fill();
      g.beginPath(); g.arc(topX + 2 * S, topY + 2.6 * S, 1.8 * S, 0, TAU); g.fill();
      g.restore();
      return;
    }
    case "rock": {
      softShadow(g, x, fy, 12 * S);
      g.save();
      const grd = g.createLinearGradient(x, fy - 10 * S, x, fy);
      grd.addColorStop(0, "#8d8474"); grd.addColorStop(1, "#5c5548");
      g.fillStyle = grd;
      g.beginPath();
      g.moveTo(x - 8 * S, fy);
      g.quadraticCurveTo(x - 9 * S, fy - 6 * S, x - 4 * S, fy - 8.6 * S);
      g.quadraticCurveTo(x + 1 * S, fy - 11 * S, x + 5 * S, fy - 7.6 * S);
      g.quadraticCurveTo(x + 9 * S, fy - 5 * S, x + 8 * S, fy);
      g.closePath(); g.fill();
      g.fillStyle = "rgba(255,255,255,0.14)";
      g.beginPath(); g.ellipse(x - 2 * S, fy - 7.4 * S, 3.4 * S, 1.5 * S, -0.3, 0, TAU); g.fill();
      g.restore();
      return;
    }
    case "lampstand": {
      softShadow(g, x, fy, 8 * S, 0.22);
      g.save();
      // haste e base dourada
      const gold = g.createLinearGradient(x - 2 * S, fy - 24 * S, x + 2 * S, fy);
      gold.addColorStop(0, "#ffd98a"); gold.addColorStop(0.5, "#d9a83e"); gold.addColorStop(1, "#a87c22");
      g.fillStyle = gold;
      rr(g, x - 1.4 * S, fy - 22 * S, 2.8 * S, 22 * S, 1.4 * S); g.fill();
      g.beginPath(); g.ellipse(x, fy - 1.2 * S, 5.5 * S, 1.8 * S, 0, 0, TAU); g.fill();
      // taça
      g.beginPath();
      g.moveTo(x - 4 * S, fy - 22 * S);
      g.quadraticCurveTo(x, fy - 19 * S, x + 4 * S, fy - 22 * S);
      g.lineTo(x + 3 * S, fy - 24.4 * S);
      g.lineTo(x - 3 * S, fy - 24.4 * S);
      g.closePath(); g.fill();
      // chama
      if ((o.fire ?? 1) > 0.05) {
        const fl = reduce ? 0 : Math.sin(t * 0.012 + x) * 1.2 * S;
        glowCircle(g, x, fy - 27 * S, 10 * S, "#ffca70", 0.55);
        const flame = g.createLinearGradient(x, fy - 31 * S, x, fy - 24 * S);
        flame.addColorStop(0, "#ffe9b0"); flame.addColorStop(0.5, "#ffb14a"); flame.addColorStop(1, "#e86a2e");
        g.fillStyle = flame;
        g.beginPath();
        g.moveTo(x, fy - 31 * S - fl);
        g.quadraticCurveTo(x + 2.6 * S, fy - 27 * S, x, fy - 24.4 * S);
        g.quadraticCurveTo(x - 2.6 * S, fy - 27 * S, x, fy - 31 * S - fl);
        g.fill();
      }
      g.restore();
      return;
    }
    case "church": {
      softShadow(g, x, fy, 34 * S, 0.3);
      g.save();
      // corpo de pedra
      const stone = g.createLinearGradient(x, fy - 36 * S, x, fy);
      stone.addColorStop(0, "#c7b896"); stone.addColorStop(1, "#8f8266");
      g.fillStyle = stone;
      rr(g, x - 30 * S, fy - 34 * S, 60 * S, 34 * S, 2 * S); g.fill();
      // juntas sutis
      g.strokeStyle = "rgba(70,60,40,0.25)"; g.lineWidth = 0.8;
      for (let r = 1; r < 5; r++) { g.beginPath(); g.moveTo(x - 29 * S, fy - 34 * S + r * 7 * S); g.lineTo(x + 29 * S, fy - 34 * S + r * 7 * S); g.stroke(); }
      // telhado
      const roof = g.createLinearGradient(x, fy - 48 * S, x, fy - 32 * S);
      roof.addColorStop(0, "#a8613f"); roof.addColorStop(1, "#6e3a24");
      g.fillStyle = roof;
      g.beginPath();
      g.moveTo(x - 34 * S, fy - 33 * S);
      g.lineTo(x, fy - 48 * S);
      g.lineTo(x + 34 * S, fy - 33 * S);
      g.closePath(); g.fill();
      g.strokeStyle = "rgba(255,235,200,0.35)"; g.lineWidth = 1;
      g.beginPath(); g.moveTo(x - 32 * S, fy - 33.4 * S); g.lineTo(x, fy - 47 * S); g.stroke();
      // porta em arco com luz
      g.fillStyle = "#33261a";
      rr(g, x - 7 * S, fy - 19 * S, 14 * S, 19 * S, 6 * S); g.fill();
      const gl = reduce ? 0.65 : Math.sin(t * 0.003) * 0.15 + 0.66;
      const doorGlow = g.createLinearGradient(x, fy - 17 * S, x, fy);
      doorGlow.addColorStop(0, `rgba(255,214,130,${gl})`);
      doorGlow.addColorStop(1, `rgba(255,178,80,${gl * 0.7})`);
      g.fillStyle = doorGlow;
      rr(g, x - 5 * S, fy - 16.4 * S, 10 * S, 16.4 * S, 4.6 * S); g.fill();
      glowCircle(g, x, fy - 7 * S, 16 * S, "#ffca70", 0.28 * gl);
      // colunas
      for (const s of [-1, 1]) {
        const cx2 = x + s * 15 * S;
        const col = g.createLinearGradient(cx2 - 2.4 * S, 0, cx2 + 2.4 * S, 0);
        col.addColorStop(0, "#d9cba6"); col.addColorStop(0.5, "#efe4c4"); col.addColorStop(1, "#b3a582");
        g.fillStyle = col;
        rr(g, cx2 - 2.2 * S, fy - 22 * S, 4.4 * S, 22 * S, 1.6 * S); g.fill();
        g.fillStyle = "#cbbd99";
        rr(g, cx2 - 3.2 * S, fy - 24 * S, 6.4 * S, 2.4 * S, 1 * S); g.fill();
      }
      // janelas em arco
      g.fillStyle = "#2c2418";
      for (const s of [-1, 1]) { rr(g, x + s * 23 * S - 2 * S, fy - 29 * S, 4 * S, 7 * S, 2 * S); g.fill(); }
      g.restore();
      return;
    }
    case "tower": {
      softShadow(g, x, fy, 12 * S, 0.24);
      g.save();
      const grd = g.createLinearGradient(x - 6 * S, 0, x + 6 * S, 0);
      grd.addColorStop(0, "#8f8266"); grd.addColorStop(0.5, "#b3a582"); grd.addColorStop(1, "#6d6350");
      g.fillStyle = grd;
      rr(g, x - 6 * S, fy - 34 * S, 12 * S, 34 * S, 2 * S); g.fill();
      // ameias
      g.fillStyle = "#8f8266";
      for (const dx of [-6, -1.5, 3]) rr(g, x + dx * S, fy - 38 * S, 3 * S, 4.4 * S, 1 * S), g.fill();
      // janela acesa
      g.fillStyle = "#2c2418";
      rr(g, x - 1.8 * S, fy - 28 * S, 3.6 * S, 5.4 * S, 1.8 * S); g.fill();
      g.fillStyle = "rgba(255,214,130,0.75)";
      rr(g, x - 1.1 * S, fy - 27.2 * S, 2.2 * S, 3.8 * S, 1.1 * S); g.fill();
      g.restore();
      return;
    }
    case "tree": {
      softShadow(g, x, fy, 14 * S);
      g.save();
      g.strokeStyle = "#6d5334"; g.lineWidth = 3 * S; g.lineCap = "round";
      g.beginPath(); g.moveTo(x, fy); g.quadraticCurveTo(x - 1 * S, fy - 12 * S, x, fy - 20 * S); g.stroke();
      // copa (árvore da vida: verde + frutos dourados)
      for (const [dx, dy, r] of [[-7, -24, 8], [7, -24, 8], [0, -30, 9]] as const) {
        const grd = g.createRadialGradient(x + dx * S - 2, fy + dy * S - 2, 1, x + dx * S, fy + dy * S, r * S);
        grd.addColorStop(0, "#79b565"); grd.addColorStop(1, "#3f7a42");
        g.fillStyle = grd;
        g.beginPath(); g.arc(x + dx * S, fy + dy * S, r * S, 0, TAU); g.fill();
      }
      for (let i = 0; i < 6; i++) {
        const fx = x + Math.cos(i * 1.1) * 8 * S;
        const fyy = fy - 25 * S + Math.sin(i * 2.1) * 5 * S;
        glowCircle(g, fx, fyy, 3 * S, "#ffd98a", 0.5);
        g.fillStyle = "#ffca5a";
        g.beginPath(); g.arc(fx, fyy, 1.3 * S, 0, TAU); g.fill();
      }
      g.restore();
      return;
    }
    case "star": {
      const tw = reduce ? 0.8 : Math.sin(t * 0.006 + x) * 0.3 + 0.7;
      const y = fy - 34 * S;
      glowCircle(g, x, y, 12 * S, "#ffe9b0", 0.7 * tw);
      g.save();
      g.fillStyle = "#fff6d8";
      g.beginPath();
      for (let i = 0; i < 8; i++) {
        const ang = (i / 8) * TAU;
        const r = i % 2 === 0 ? 5 * S : 1.8 * S;
        const px = x + Math.cos(ang) * r, py = y + Math.sin(ang) * r;
        if (i === 0) g.moveTo(px, py); else g.lineTo(px, py);
      }
      g.closePath(); g.fill();
      g.restore();
      return;
    }
    case "door": {
      softShadow(g, x, fy, 14 * S, 0.3);
      g.save();
      // batente
      const frame = g.createLinearGradient(x - 10 * S, 0, x + 10 * S, 0);
      frame.addColorStop(0, "#5d4a30"); frame.addColorStop(0.5, "#7a6340"); frame.addColorStop(1, "#4a3a26");
      g.fillStyle = frame;
      rr(g, x - 10 * S, fy - 31 * S, 20 * S, 31 * S, 9 * S); g.fill();
      // interior luminoso
      const gl = reduce ? 0.75 : Math.sin(t * 0.004) * 0.12 + 0.78;
      const inner = g.createLinearGradient(x, fy - 28 * S, x, fy);
      inner.addColorStop(0, `rgba(255,240,200,${gl})`);
      inner.addColorStop(1, `rgba(255,196,110,${gl * 0.85})`);
      g.fillStyle = inner;
      rr(g, x - 7 * S, fy - 27.4 * S, 14 * S, 27.4 * S, 7 * S); g.fill();
      glowCircle(g, x, fy - 12 * S, 24 * S, "#ffe0a0", 0.5 * gl);
      // raios de luz saindo
      if (!reduce) {
        g.save(); g.globalAlpha = 0.25 * gl;
        g.fillStyle = "#fff3cc";
        g.beginPath();
        g.moveTo(x - 6 * S, fy);
        g.lineTo(x - 16 * S, fy + 8 * S);
        g.lineTo(x + 16 * S, fy + 8 * S);
        g.lineTo(x + 6 * S, fy);
        g.closePath(); g.fill();
        g.restore();
      }
      g.restore();
      return;
    }
    default:
      return; // prop desconhecido: nada (sem quebrar)
  }
}

// ============================================================================
// HUMANOS HD
// ============================================================================

export interface HDHumanSpec {
  role: string;
  pose?: string;
  facing?: 1 | -1;
  scale?: number;
  t?: number;
  reduce?: boolean;
  alpha?: number;
  glow?: number;
}

interface HDCfg {
  robe0: string; robe1: string; sash?: string; trim?: string;
  hair: string; beard?: string; skin?: string;
  halo?: number; wings?: boolean; eyesFlame?: boolean; feetBronze?: boolean;
  scroll?: boolean; iris?: string; stars7?: boolean;
}

const SKIN0 = "#e7b98a", SKIN1 = "#c8925c";

function humanCfg(role: string, pose?: string): HDCfg {
  switch (role) {
    case "joao": return { robe0: "#9aa0ad", robe1: "#5f6572", sash: "#5d4a30", trim: "#46506a", hair: "#2a1c10", beard: "#3a2a18", scroll: pose === "write", iris: "#5b4630" };
    case "cristo": return { robe0: "#ffffff", robe1: "#c9d2e4", sash: "#e8b04b", hair: "#f4f4f2", beard: "#eeeeec", halo: 1, eyesFlame: true, feetBronze: true, stars7: true, iris: "#ffb14a" };
    case "anjo": return { robe0: "#f4f7ff", robe1: "#bfcbe4", sash: "#caa050", trim: "#caa050", hair: "#ffe9a8", wings: true, halo: 0.5, iris: "#4a78c0" };
    case "anciao": return { robe0: "#f0f2f8", robe1: "#c2c9da", trim: "#caa050", hair: "#d8d8d8", beard: "#cfcfcf", halo: 0.2, iris: "#5b6470" };
    case "mulherComum": return { robe0: "#5b86c0", robe1: "#33507e", hair: "#3a2a18", iris: "#4a3624" };
    default: return { robe0: "#8a6a44", robe1: "#5c4225", hair: "#2a1c10", beard: "#3a2a18", iris: "#4a3624" };
  }
}

export function drawHumanHD(g: G, x: number, fy: number, spec: HDHumanSpec): void {
  const S = spec.scale ?? 1;
  const t = spec.t ?? 0;
  const reduce = !!spec.reduce;
  const pose = spec.pose ?? "stand";
  const face = spec.facing ?? 1;
  const cfg = humanCfg(spec.role, pose);
  const prevA = g.globalAlpha;
  if (spec.alpha != null) g.globalAlpha = prevA * spec.alpha;

  const bob = reduce ? 0 : Math.sin(t * 0.003 + x * 0.5) * 0.8 * S;
  const phase = t * 0.012;
  const step = pose === "walk" && !reduce ? Math.sin(phase) : 0;

  // glória ao redor
  if ((spec.glow ?? 0) > 0.03) glowCircle(g, x, fy - 24 * S, 34 * S, "#fff2c8", 0.4 * (spec.glow ?? 0));

  softShadow(g, x, fy, 12 * S);

  if (pose === "lie") {
    // deitado
    const grd = g.createLinearGradient(x, fy - 8 * S, x, fy);
    grd.addColorStop(0, cfg.robe0); grd.addColorStop(1, cfg.robe1);
    g.fillStyle = grd;
    rr(g, x - 16 * S, fy - 6 * S, 30 * S, 6 * S, 3 * S); g.fill();
    g.fillStyle = SKIN0;
    g.beginPath(); g.arc(x - 20 * S, fy - 5 * S, 5 * S, 0, TAU); g.fill();
    g.fillStyle = cfg.hair;
    g.beginPath(); g.arc(x - 20 * S, fy - 6.6 * S, 4.6 * S, Math.PI, TAU); g.fill();
    if (spec.alpha != null) g.globalAlpha = prevA;
    return;
  }

  const kneel = pose === "kneel" ? 8 * S : 0;
  const hemY = fy - 5 * S + kneel * 0.4;
  const bodyTop = hemY - 20 * S + bob + kneel * 0.4;
  const headR = 9.5 * S;
  const headCy = bodyTop - headR + 2.5 * S + (pose === "bow" ? 3.5 * S : 0);

  // ---- asas (atrás)
  if (cfg.wings) {
    const flap = reduce ? 0 : Math.sin(t * 0.0035) * 3 * S;
    g.save();
    for (const s of [-1, 1] as const) {
      const grd = g.createLinearGradient(x, bodyTop, x + s * 26 * S, bodyTop - 10 * S);
      grd.addColorStop(0, "#ffffff"); grd.addColorStop(1, "#b9c8e6");
      g.fillStyle = grd;
      g.globalAlpha *= 0.92;
      g.beginPath();
      g.moveTo(x + s * 6 * S, bodyTop + 2 * S);
      g.quadraticCurveTo(x + s * 24 * S, bodyTop - 12 * S - flap, x + s * 26 * S, bodyTop + 2 * S - flap);
      g.quadraticCurveTo(x + s * 20 * S, bodyTop + 10 * S, x + s * 6 * S, bodyTop + 10 * S);
      g.closePath(); g.fill();
      // penas
      g.strokeStyle = "rgba(150,170,210,0.5)"; g.lineWidth = 0.8;
      for (let i = 1; i <= 3; i++) {
        g.beginPath();
        g.moveTo(x + s * (6 + i * 4) * S, bodyTop + 8 * S);
        g.quadraticCurveTo(x + s * (10 + i * 5) * S, bodyTop - i * S - flap * 0.5, x + s * (12 + i * 5) * S, bodyTop + 2 * S);
        g.stroke();
      }
    }
    g.restore();
  }

  // ---- pernas + sandálias
  if (pose !== "kneel") {
    const lOff = pose === "walk" ? step * 2.6 * S : 0;
    const feetC = cfg.feetBronze ? "#e0a34c" : SKIN1;
    g.fillStyle = feetC;
    rr(g, x - 4.6 * S + lOff, hemY, 3.4 * S, 5 * S, 1.6 * S); g.fill();
    rr(g, x + 1.2 * S - lOff, hemY, 3.4 * S, 5 * S, 1.6 * S); g.fill();
    if (cfg.feetBronze && !reduce) glowCircle(g, x, hemY + 3 * S, 8 * S, "#ffd27a", 0.4 + Math.sin(t * 0.01) * 0.15);
  } else {
    g.fillStyle = cfg.robe1;
    rr(g, x - 9 * S, fy - 4 * S, 18 * S, 4 * S, 2 * S); g.fill();
  }

  // ---- túnica (trapézio arredondado com gradiente + dobras)
  const robe = g.createLinearGradient(x, bodyTop, x, hemY);
  robe.addColorStop(0, cfg.robe0); robe.addColorStop(1, cfg.robe1);
  g.fillStyle = robe;
  g.beginPath();
  g.moveTo(x - 6.4 * S, bodyTop + 2 * S);
  g.quadraticCurveTo(x, bodyTop - 1.4 * S, x + 6.4 * S, bodyTop + 2 * S);
  g.lineTo(x + 9.4 * S, hemY);
  g.quadraticCurveTo(x, hemY + 1.6 * S, x - 9.4 * S, hemY);
  g.closePath(); g.fill();
  // dobras suaves
  g.save();
  g.strokeStyle = "rgba(0,0,0,0.14)"; g.lineWidth = 1 * S; g.lineCap = "round";
  for (const dx of [-3.5, 0.5, 4]) {
    g.beginPath();
    g.moveTo(x + dx * S, bodyTop + 8 * S);
    g.quadraticCurveTo(x + dx * S - 1 * S, hemY - 6 * S, x + dx * S + 0.6 * S, hemY - 1 * S);
    g.stroke();
  }
  g.restore();
  // luz lateral
  g.save();
  g.globalAlpha *= 0.35;
  g.fillStyle = "#ffffff";
  g.beginPath();
  g.moveTo(x + 4.5 * S, bodyTop + 2 * S);
  g.quadraticCurveTo(x + 7.5 * S, hemY * 0.5 + bodyTop * 0.5, x + 8.4 * S, hemY - 1 * S);
  g.quadraticCurveTo(x + 6.4 * S, hemY * 0.5 + bodyTop * 0.5, x + 5 * S, bodyTop + 2.5 * S);
  g.closePath(); g.fill();
  g.restore();
  // faixa/cinto
  if (cfg.sash) {
    g.fillStyle = cfg.sash;
    if (cfg.eyesFlame) { rr(g, x - 7 * S, bodyTop + 4.6 * S, 14 * S, 3 * S, 1.4 * S); g.fill(); }
    else { rr(g, x - 7.6 * S, bodyTop + 11 * S, 15.2 * S, 2.4 * S, 1.2 * S); g.fill(); }
  }
  if (cfg.trim) {
    g.fillStyle = cfg.trim;
    rr(g, x - 9.2 * S, hemY - 2 * S, 18.4 * S, 1.6 * S, 0.8 * S); g.fill();
  }

  // ---- braços por pose
  const shY = bodyTop + 3 * S;
  g.fillStyle = cfg.robe1;
  const arm = (sx: number, sy: number, ex: number, ey: number, w: number) => {
    g.save();
    g.strokeStyle = cfg.robe1; g.lineWidth = w; g.lineCap = "round";
    g.beginPath(); g.moveTo(sx, sy); g.lineTo(ex, ey); g.stroke();
    g.fillStyle = SKIN0;
    g.beginPath(); g.arc(ex, ey, w * 0.42, 0, TAU); g.fill();
    g.restore();
  };
  const swing = pose === "walk" ? step * 3 * S : 0;
  if (pose === "raise") { arm(x - 6 * S, shY, x - 9.5 * S, shY - 11 * S, 3.4 * S); arm(x + 6 * S, shY, x + 9.5 * S, shY - 11 * S, 3.4 * S); }
  else if (pose === "point") { arm(x + face * 6 * S, shY, x + face * 14 * S, shY + 1 * S, 3.4 * S); arm(x - face * 6 * S, shY, x - face * 7 * S, shY + 9 * S, 3.4 * S); }
  else if (pose === "write") {
    arm(x - 6 * S, shY, x - 7 * S, shY + 9 * S, 3.4 * S);
    arm(x + 6 * S, shY, x + 8.5 * S, shY + 7 * S, 3.4 * S);
    // rolo
    g.fillStyle = "#efe3c2";
    rr(g, x + 3 * S, shY + 6 * S, 9 * S, 5 * S, 1.4 * S); g.fill();
    g.fillStyle = "#cbb98d";
    g.fillRect(x + 3 * S, shY + 6.6 * S, 9 * S, 0.8 * S);
  }
  else if (pose === "bow" || pose === "kneel") { arm(x - 6 * S, shY, x - 6.5 * S, shY + 10 * S, 3.4 * S); arm(x + 6 * S, shY, x + 6.5 * S, shY + 10 * S, 3.4 * S); }
  else if (pose === "walk") { arm(x - 6.4 * S, shY, x - 7.5 * S, shY + 9 * S + swing, 3.4 * S); arm(x + 6.4 * S, shY, x + 7.5 * S, shY + 9 * S - swing, 3.4 * S); }
  else { arm(x - 6.4 * S, shY, x - 7 * S, shY + 9.5 * S, 3.4 * S); arm(x + 6.4 * S, shY, x + 7 * S, shY + 9.5 * S, 3.4 * S); }

  // ---- cabeça
  const skin = g.createRadialGradient(x - 2.5 * S, headCy - 2.5 * S, 1, x, headCy, headR);
  skin.addColorStop(0, "#f2cba0"); skin.addColorStop(1, SKIN1);
  g.fillStyle = skin;
  g.beginPath(); g.arc(x, headCy, headR, 0, TAU); g.fill();

  // bochechas
  g.save(); g.globalAlpha *= 0.35; g.fillStyle = "#e86a4a";
  g.beginPath(); g.ellipse(x - 5 * S, headCy + 3 * S, 1.8 * S, 1.1 * S, 0, 0, TAU); g.fill();
  g.beginPath(); g.ellipse(x + 5 * S, headCy + 3 * S, 1.8 * S, 1.1 * S, 0, 0, TAU); g.fill();
  g.restore();

  // olhos grandes vítreos
  const eyeY = headCy + 0.6 * S;
  const off = face * 0.7 * S;
  for (const s of [-1, 1] as const) {
    const ex = x + s * 3.6 * S + off;
    if (cfg.eyesFlame && !reduce) {
      glowCircle(g, ex, eyeY, 4.5 * S, "#ffb14a", 0.55);
      const fl = g.createRadialGradient(ex, eyeY, 0.4 * S, ex, eyeY, 2.2 * S);
      fl.addColorStop(0, "#fff3c0"); fl.addColorStop(1, "#ff8c2e");
      g.fillStyle = fl;
      g.beginPath(); g.ellipse(ex, eyeY, 1.9 * S, 2.3 * S, 0, 0, TAU); g.fill();
    } else {
      g.fillStyle = "#ffffff";
      g.beginPath(); g.ellipse(ex, eyeY, 2.2 * S, 2.7 * S, 0, 0, TAU); g.fill();
      const iris = g.createRadialGradient(ex + off * 0.5, eyeY, 0.2 * S, ex + off * 0.5, eyeY, 1.6 * S);
      iris.addColorStop(0, cfg.iris ?? "#4a3624");
      iris.addColorStop(1, mixHex(cfg.iris ?? "#4a3624", "#000000", 0.5));
      g.fillStyle = iris;
      g.beginPath(); g.arc(ex + off * 0.5, eyeY + 0.3 * S, 1.5 * S, 0, TAU); g.fill();
      g.fillStyle = "#ffffff";
      g.beginPath(); g.arc(ex + off * 0.5 - 0.5 * S, eyeY - 0.4 * S, 0.6 * S, 0, TAU); g.fill();
      // sobrancelha
      g.strokeStyle = cfg.hair; g.lineWidth = 0.9 * S; g.lineCap = "round";
      g.beginPath(); g.moveTo(ex - 1.8 * S, eyeY - 3.4 * S); g.quadraticCurveTo(ex, eyeY - 4.2 * S, ex + 1.8 * S, eyeY - 3.4 * S); g.stroke();
    }
  }
  // nariz + boca
  g.strokeStyle = "rgba(120,70,40,0.6)"; g.lineWidth = 0.8 * S; g.lineCap = "round";
  g.beginPath(); g.moveTo(x + off, eyeY + 2 * S); g.quadraticCurveTo(x + off + 0.8 * S, eyeY + 2.8 * S, x + off, eyeY + 3.4 * S); g.stroke();
  g.strokeStyle = "#8a4a30"; g.lineWidth = 1 * S;
  g.beginPath(); g.moveTo(x - 1.6 * S, headCy + 5.4 * S); g.quadraticCurveTo(x, headCy + 6.4 * S, x + 1.6 * S, headCy + 5.4 * S); g.stroke();

  // cabelo (calota + laterais) com brilho
  g.fillStyle = cfg.hair;
  g.beginPath(); g.arc(x, headCy - 1.2 * S, headR * 0.98, Math.PI * 1.02, Math.PI * 1.98); g.fill();
  g.beginPath(); g.ellipse(x - headR * 0.82, headCy + 0.5 * S, 1.8 * S, 3.4 * S, 0.2, 0, TAU); g.fill();
  g.beginPath(); g.ellipse(x + headR * 0.82, headCy + 0.5 * S, 1.8 * S, 3.4 * S, -0.2, 0, TAU); g.fill();
  g.save(); g.globalAlpha *= 0.3; g.fillStyle = "#ffffff";
  g.beginPath(); g.ellipse(x - 3 * S, headCy - headR * 0.72, 3 * S, 1.1 * S, -0.35, 0, TAU); g.fill();
  g.restore();
  // barba
  if (cfg.beard) {
    g.fillStyle = cfg.beard;
    g.beginPath();
    g.moveTo(x - headR * 0.8, headCy + 2.4 * S);
    g.quadraticCurveTo(x, headCy + headR * 1.5, x + headR * 0.8, headCy + 2.4 * S);
    g.quadraticCurveTo(x, headCy + headR * 0.85, x - headR * 0.8, headCy + 2.4 * S);
    g.closePath(); g.fill();
    // boca reaparece
    g.strokeStyle = "#8a4a30"; g.lineWidth = 1 * S;
    g.beginPath(); g.moveTo(x - 1.4 * S, headCy + 5.6 * S); g.quadraticCurveTo(x, headCy + 6.4 * S, x + 1.4 * S, headCy + 5.6 * S); g.stroke();
  }

  // coroa (ancião)
  if (spec.role === "anciao") {
    g.fillStyle = "#e8b04b";
    rr(g, x - headR * 0.7, headCy - headR - 2.4 * S, headR * 1.4, 2.6 * S, 1 * S); g.fill();
    g.fillStyle = "#ffd989";
    for (const dx of [-0.45, 0, 0.45]) {
      g.beginPath();
      g.moveTo(x + dx * headR - 1.2 * S, headCy - headR - 2 * S);
      g.lineTo(x + dx * headR, headCy - headR - 5 * S);
      g.lineTo(x + dx * headR + 1.2 * S, headCy - headR - 2 * S);
      g.closePath(); g.fill();
    }
  }

  // auréola / resplendor
  if ((cfg.halo ?? 0) > 0.05 && !reduce) glowCircle(g, x, headCy, headR * 2.2, "#fff6d8", 0.45 * (cfg.halo ?? 0) * (0.8 + Math.sin(t * 0.005) * 0.2));

  // sete estrelas na destra (Cristo)
  if (cfg.stars7 && !reduce) {
    const hx = x + 7 * S, hy = shY + 9.5 * S;
    for (let i = 0; i < 7; i++) {
      const ang = t * 0.0012 + (i / 7) * TAU;
      const sx = hx + Math.cos(ang) * 6 * S;
      const sy = hy - 2 * S + Math.sin(ang) * 4.4 * S;
      const tw = Math.sin(t * 0.008 + i * 1.3) * 0.5 + 0.5;
      glowCircle(g, sx, sy, 2.6 * S, "#ffe9b0", 0.5 * tw);
      g.fillStyle = tw > 0.5 ? "#fff3c0" : "#ffd24a";
      g.beginPath(); g.arc(sx, sy, 0.9 * S, 0, TAU); g.fill();
    }
  }

  if (spec.alpha != null) g.globalAlpha = prevA;
}

// ============================================================================
// HERÓI HD — o Devocionalzeiro da referência (corpo "D", olhos vítreos)
// ============================================================================

const HERO_PAL: Record<MascotColor, { top: string; bot: string; glow: string; iris: string }> = {
  blue: { top: "#232a42", bot: "#0b0e18", glow: "#3f8cff", iris: "#3f8cff" },
  yellow: { top: "#4a3a10", bot: "#171004", glow: "#ffd24a", iris: "#ffb62e" },
  red: { top: "#46171c", bot: "#160608", glow: "#ff5a4a", iris: "#ff6a4a" },
  pink: { top: "#46203a", bot: "#170912", glow: "#ff7ac8", iris: "#ff8ad0" },
  skyblue: { top: "#1c3a4a", bot: "#081218", glow: "#5ac8ff", iris: "#5ac8ff" },
  black: { top: "#26262e", bot: "#0a0a0e", glow: "#8a93b8", iris: "#aab4d8" },
  white: { top: "#d8dce8", bot: "#8a90a4", glow: "#ffffff", iris: "#5a78c8" },
  orange: { top: "#4a2c10", bot: "#170d04", glow: "#ff9430", iris: "#ff9430" },
  green: { top: "#1c3a24", bot: "#08120b", glow: "#4ade80", iris: "#4ade80" },
};

export interface HDHeroOpts { t: number; reduce?: boolean; walking?: boolean; face?: 1 | -1 }

export function drawHeroHD(g: G, x: number, fy: number, look: Partial<MascotLook>, o: HDHeroOpts): void {
  const t = o.t;
  const reduce = !!o.reduce;
  const face = o.face ?? 1;
  const pal = HERO_PAL[(look.color as MascotColor) ?? "blue"] ?? HERO_PAL.blue;

  const bob = reduce ? 0 : Math.sin(t * 0.004) * 1.2;
  const step = o.walking && !reduce ? Math.sin(t * 0.014) : 0;
  const squash = o.walking && !reduce ? 1 - Math.abs(Math.sin(t * 0.014)) * 0.04 : 1;

  const W = 34, H = 42;
  const top = fy - H * squash - 6 + bob;
  const bodyH = H * squash;

  softShadow(g, x, fy, 17, 0.32);

  g.save();
  if (face === -1) { g.translate(x, 0); g.scale(-1, 1); g.translate(-x, 0); }

  // ---- aura (loja) ----
  if (look.aura && look.aura !== "none") glowCircle(g, x, fy - 22, 42, pal.glow, 0.35);

  // ---- asas (loja/recompensa) — suaves, atrás ----
  if (look.wings && look.wings !== "none") {
    const flap = reduce ? 0 : Math.sin(t * 0.006) * 3;
    const wc = look.wings === "gold" ? "#ffd98a" : look.wings === "crystal" ? "#bfe6ff" : "#f2f6ff";
    g.save(); g.globalAlpha *= 0.95;
    for (const s of [-1, 1] as const) {
      const grd = g.createLinearGradient(x, top + 10, x + s * 30, top - 4);
      grd.addColorStop(0, wc); grd.addColorStop(1, mixHex(wc, "#7a8ab0", 0.5));
      g.fillStyle = grd;
      g.beginPath();
      g.moveTo(x + s * 12, top + 14);
      g.quadraticCurveTo(x + s * 30, top - flap, x + s * 32, top + 12 - flap);
      g.quadraticCurveTo(x + s * 24, top + 22, x + s * 12, top + 22);
      g.closePath(); g.fill();
    }
    g.restore();
  }

  // ---- pés (tocos arredondados) ----
  const feet = g.createLinearGradient(x, fy - 7, x, fy);
  feet.addColorStop(0, pal.top); feet.addColorStop(1, pal.bot);
  g.fillStyle = feet;
  const lOff = o.walking ? step * 3 : 0;
  rr(g, x - 11 + lOff, fy - 6, 9, 6, 3); g.fill();
  rr(g, x + 2 - lOff, fy - 6, 9, 6, 3); g.fill();

  // ---- corpo "D" (lado esquerdo reto, direito curvo) ----
  const body = g.createLinearGradient(x, top, x, top + bodyH);
  body.addColorStop(0, pal.top);
  body.addColorStop(1, pal.bot);
  g.fillStyle = body;
  g.beginPath();
  g.moveTo(x - W / 2 + 4, top + 4);
  g.quadraticCurveTo(x - W / 2, top + 4, x - W / 2, top + 9);          // canto sup. esq. (pouco arredondado)
  g.lineTo(x - W / 2, top + bodyH - 8);
  g.quadraticCurveTo(x - W / 2, top + bodyH - 2, x - W / 2 + 6, top + bodyH - 2); // canto inf. esq.
  g.lineTo(x + 2, top + bodyH - 2);
  g.quadraticCurveTo(x + W / 2 + 3, top + bodyH - 6, x + W / 2 + 3, top + bodyH / 2); // barrigão curvo
  g.quadraticCurveTo(x + W / 2 + 3, top + 6, x + 2, top + 4);
  g.closePath();
  g.fill();

  // sheen interno sutil
  g.save();
  const sheen = g.createRadialGradient(x - 6, top + 10, 2, x - 2, top + 16, 30);
  sheen.addColorStop(0, "rgba(255,255,255,0.10)");
  sheen.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = sheen;
  g.beginPath(); g.ellipse(x - 2, top + 16, 16, 18, 0, 0, TAU); g.fill();
  g.restore();

  // rim light no lado curvo (glow da cor)
  g.save();
  g.strokeStyle = pal.glow; g.lineWidth = 1.6; g.globalAlpha *= 0.65;
  g.beginPath();
  g.moveTo(x + 3, top + bodyH - 3.4);
  g.quadraticCurveTo(x + W / 2 + 1.6, top + bodyH - 7, x + W / 2 + 1.6, top + bodyH / 2);
  g.stroke();
  g.restore();
  glowCircle(g, x + W / 2 - 2, top + bodyH * 0.62, 14, pal.glow, 0.18);

  // ---- emblema no peito: crescente "D" + chama da cor ----
  g.save();
  g.strokeStyle = pal.glow; g.lineWidth = 2; g.lineCap = "round"; g.globalAlpha *= 0.85;
  g.beginPath();
  g.arc(x + 1, top + bodyH * 0.62, 8.5, -Math.PI * 0.42, Math.PI * 0.42);
  g.stroke();
  g.restore();
  // chama pequena
  const fl = reduce ? 0 : Math.sin(t * 0.01) * 0.8;
  glowCircle(g, x + 1, top + bodyH * 0.62, 6, pal.glow, 0.5);
  g.fillStyle = pal.glow;
  g.beginPath();
  g.moveTo(x + 1, top + bodyH * 0.62 - 4 - fl);
  g.quadraticCurveTo(x + 3.4, top + bodyH * 0.62, x + 1, top + bodyH * 0.62 + 3.4);
  g.quadraticCurveTo(x - 1.4, top + bodyH * 0.62, x + 1, top + bodyH * 0.62 - 4 - fl);
  g.fill();

  // ---- braços (tocos) ----
  g.fillStyle = body;
  const armSwing = o.walking ? step * 3.4 : 0;
  rr(g, x - W / 2 - 5, top + 16 + armSwing, 6.5, 10, 3.2); g.fill();
  rr(g, x + W / 2 - 1, top + 16 - armSwing, 6.5, 10, 3.2); g.fill();

  // ---- olhos grandes vítreos (referência) ----
  const eyeY = top + 13;
  for (const s of [-1, 1] as const) {
    const ex = x + s * 6.4 + 1;
    // órbita escura
    g.fillStyle = "rgba(0,0,0,0.5)";
    g.beginPath(); g.ellipse(ex, eyeY, 5, 5.8, 0, 0, TAU); g.fill();
    // íris com gradiente da cor
    const iris = g.createRadialGradient(ex - 1, eyeY - 1.4, 0.6, ex, eyeY, 4.6);
    iris.addColorStop(0, mixHex(pal.iris, "#ffffff", 0.35));
    iris.addColorStop(0.55, pal.iris);
    iris.addColorStop(1, mixHex(pal.iris, "#000000", 0.55));
    g.fillStyle = iris;
    g.beginPath(); g.ellipse(ex, eyeY, 4.3, 5.1, 0, 0, TAU); g.fill();
    // pupila suave
    g.fillStyle = "rgba(8,10,18,0.85)";
    g.beginPath(); g.ellipse(ex, eyeY + 0.8, 2, 2.5, 0, 0, TAU); g.fill();
    // speculares (2)
    g.fillStyle = "#ffffff";
    g.beginPath(); g.arc(ex - 1.5, eyeY - 1.8, 1.5, 0, TAU); g.fill();
    g.save(); g.globalAlpha *= 0.7;
    g.beginPath(); g.arc(ex + 1.6, eyeY + 1.8, 0.8, 0, TAU); g.fill();
    g.restore();
    glowCircle(g, ex, eyeY, 7, pal.glow, 0.22);
  }
  // pálpebras/sobrancelhas sutis
  g.strokeStyle = "rgba(0,0,0,0.55)"; g.lineWidth = 1.3; g.lineCap = "round";
  for (const s of [-1, 1] as const) {
    const ex = x + s * 6.4 + 1;
    g.beginPath(); g.moveTo(ex - 3.4, eyeY - 5.6); g.quadraticCurveTo(ex, eyeY - 6.8, ex + 3.4, eyeY - 5.6); g.stroke();
  }
  // sorriso
  g.strokeStyle = "rgba(230,238,255,0.9)"; g.lineWidth = 1.4;
  g.beginPath(); g.moveTo(x - 2.6, top + 22.4); g.quadraticCurveTo(x + 1, top + 24.6, x + 4.6, top + 22.4); g.stroke();

  // ---- acessórios de cabeça ----
  if (look.head === "fire") {
    // foguinho (acessório) — chama azul suave da referência
    const fh = reduce ? 0 : Math.sin(t * 0.012) * 2;
    glowCircle(g, x + 1, top - 6, 14, "#4aa8ff", 0.55);
    const flame = g.createLinearGradient(x, top - 16 - fh, x, top + 2);
    flame.addColorStop(0, "#bfe4ff"); flame.addColorStop(0.5, "#4aa8ff"); flame.addColorStop(1, "#1c58c8");
    g.fillStyle = flame;
    g.beginPath();
    g.moveTo(x + 1, top - 15 - fh);
    g.quadraticCurveTo(x + 7, top - 6, x + 1, top + 1.4);
    g.quadraticCurveTo(x - 5, top - 6, x + 1, top - 15 - fh);
    g.fill();
  } else if (look.head === "crown") {
    g.fillStyle = "#e8b04b";
    rr(g, x - 8, top - 4.6, 18, 4, 1.6); g.fill();
    g.fillStyle = "#ffd989";
    for (const dx of [-6, 0, 6]) {
      g.beginPath(); g.moveTo(x + dx - 2, top - 4); g.lineTo(x + dx + 1, top - 9); g.lineTo(x + dx + 4, top - 4); g.closePath(); g.fill();
    }
  } else if (look.head === "helmet") {
    const met = g.createLinearGradient(x, top - 8, x, top + 6);
    met.addColorStop(0, "#c7d0dc"); met.addColorStop(1, "#7a8494");
    g.fillStyle = met;
    g.beginPath(); g.arc(x + 1, top + 4, 17, Math.PI, TAU); g.fill();
  }

  // óculos
  if (look.glasses) {
    g.strokeStyle = "#1a1a22"; g.lineWidth = 1.6;
    for (const s of [-1, 1] as const) {
      g.beginPath(); g.arc(x + s * 6.4 + 1, eyeY, 5.6, 0, TAU); g.stroke();
    }
    g.beginPath(); g.moveTo(x - 0.2, eyeY - 1); g.lineTo(x + 2.2, eyeY - 1); g.stroke();
  }

  g.restore();
}
