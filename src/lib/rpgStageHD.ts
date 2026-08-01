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
  if (env.terrain === "patmos") {
    // ===== AREIA DETALHISTA =====
    const bandBot = dims.BOT ?? (H - 18);
    g.save();
    // ondulações de duna (linhas curvas suaves, mais separadas na frente)
    g.strokeStyle = "rgba(60,45,22,0.16)";
    g.lineCap = "round";
    for (let r = 0; r < 6; r++) {
      const ry = GROUND + 8 + r * ((bandBot - GROUND - 8) / 6) + (r % 2) * 3;
      const amp = 1.5 + r * 0.5;
      g.lineWidth = 0.9 + r * 0.14;
      g.beginPath();
      for (let x2 = -20; x2 <= W + 20; x2 += 26) {
        const yy = ry + Math.sin(x2 * 0.05 + r * 2.2) * amp;
        if (x2 === -20) g.moveTo(x2, yy);
        else g.quadraticCurveTo(x2 - 13, yy - amp * 0.8, x2, yy);
      }
      g.stroke();
      // luz na crista da duna
      g.save(); g.strokeStyle = "rgba(255,240,200,0.10)"; g.lineWidth = 0.8;
      g.beginPath();
      for (let x2 = -20; x2 <= W + 20; x2 += 26) {
        const yy = ry - 1 + Math.sin(x2 * 0.05 + r * 2.2) * amp;
        if (x2 === -20) g.moveTo(x2, yy);
        else g.quadraticCurveTo(x2 - 13, yy - amp * 0.8, x2, yy);
      }
      g.stroke(); g.restore();
    }
    // conchas, seixos e estrela-do-mar espalhados (posições estáveis)
    for (let i = 0; i < 14; i++) {
      const px = (i * 173 + 41) % W;
      const py = GROUND + 10 + ((i * 97) % Math.max(8, bandBot - GROUND - 14));
      const deep = (py - GROUND) / Math.max(1, bandBot - GROUND);
      const sc = 0.75 + deep * 0.55;
      const kind = i % 5;
      if (kind === 0) {
        // concha (leque com sulcos)
        g.save(); g.translate(px, py); g.scale(sc, sc);
        const sh = g.createLinearGradient(0, -4, 0, 1);
        sh.addColorStop(0, "#e8d4b0"); sh.addColorStop(1, "#b39670");
        g.fillStyle = sh;
        g.beginPath(); g.moveTo(0, 1);
        g.quadraticCurveTo(-4.4, -2.4, -2.6, -4.4);
        g.quadraticCurveTo(0, -6, 2.6, -4.4);
        g.quadraticCurveTo(4.4, -2.4, 0, 1);
        g.closePath(); g.fill();
        g.strokeStyle = "rgba(120,95,60,0.5)"; g.lineWidth = 0.5;
        for (const a of [-0.5, 0, 0.5]) { g.beginPath(); g.moveTo(0, 0.6); g.lineTo(a * 4, -4.4); g.stroke(); }
        g.restore();
      } else if (kind === 1) {
        // estrela-do-mar
        g.save(); g.translate(px, py); g.scale(sc * 0.9, sc * 0.9); g.rotate(i);
        g.fillStyle = "#d98a5e";
        g.beginPath();
        for (let p = 0; p < 10; p++) {
          const ang = (p / 10) * TAU;
          const r2 = p % 2 === 0 ? 4.4 : 1.8;
          const vx = Math.cos(ang) * r2, vy = Math.sin(ang) * r2;
          if (p === 0) g.moveTo(vx, vy); else g.lineTo(vx, vy);
        }
        g.closePath(); g.fill();
        g.fillStyle = "rgba(255,220,180,0.5)";
        g.beginPath(); g.arc(0, 0, 1.2, 0, TAU); g.fill();
        g.restore();
      } else if (kind === 2) {
        // seixo com brilho
        g.fillStyle = "#8d8474";
        g.beginPath(); g.ellipse(px, py, 3 * sc, 1.9 * sc, 0.3, 0, TAU); g.fill();
        g.fillStyle = "rgba(255,255,255,0.22)";
        g.beginPath(); g.ellipse(px - 0.8 * sc, py - 0.7 * sc, 1.3 * sc, 0.6 * sc, 0.3, 0, TAU); g.fill();
      } else {
        // graveto/mancha de areia úmida
        g.fillStyle = kind === 3 ? "rgba(90,66,38,0.35)" : "rgba(255,236,200,0.12)";
        g.beginPath(); g.ellipse(px, py, (kind === 3 ? 3.4 : 5.5) * sc, 1 * sc, (i % 3) * 0.5, 0, TAU); g.fill();
      }
    }
    // brilho úmido perto da água da frente
    const wetGlow = g.createLinearGradient(0, bandBot - 14, 0, bandBot);
    wetGlow.addColorStop(0, "rgba(255,244,214,0)");
    wetGlow.addColorStop(1, "rgba(210,230,255,0.12)");
    g.fillStyle = wetGlow;
    g.fillRect(0, bandBot - 14, W, 14);
    g.restore();
  } else {
    // manchas orgânicas de textura (demais terrenos)
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
  }

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
      softShadow(g, x, fy, 12 * S, 0.4);
      g.save();
      // contorno de assentamento (contraste na areia)
      g.strokeStyle = "rgba(40,32,20,0.55)"; g.lineWidth = 1.2 * S;
      const grd = g.createLinearGradient(x, fy - 10 * S, x, fy);
      grd.addColorStop(0, "#988f7e"); grd.addColorStop(1, "#524b3e");
      g.fillStyle = grd;
      g.beginPath();
      g.moveTo(x - 8 * S, fy);
      g.quadraticCurveTo(x - 9 * S, fy - 6 * S, x - 4 * S, fy - 8.6 * S);
      g.quadraticCurveTo(x + 1 * S, fy - 11 * S, x + 5 * S, fy - 7.6 * S);
      g.quadraticCurveTo(x + 9 * S, fy - 5 * S, x + 8 * S, fy);
      g.closePath(); g.fill(); g.stroke();
      g.fillStyle = "rgba(255,255,255,0.2)";
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
      // feixe de luz até o chão (ancora a estrela na cena)
      g.save();
      const beam = g.createLinearGradient(x, y, x, fy);
      beam.addColorStop(0, `rgba(255,233,176,${0.4 * tw})`);
      beam.addColorStop(1, "rgba(255,233,176,0)");
      g.fillStyle = beam;
      g.beginPath();
      g.moveTo(x - 2.4 * S, y);
      g.lineTo(x + 2.4 * S, y);
      g.lineTo(x + 6 * S, fy);
      g.lineTo(x - 6 * S, fy);
      g.closePath(); g.fill();
      g.restore();
      glowCircle(g, x, y, 15 * S, "#ffe9b0", 0.8 * tw);
      g.save();
      // corpo da estrela maior, com contorno dourado escuro (legível na areia)
      g.fillStyle = "#fff6d8";
      g.strokeStyle = "#b07c2b"; g.lineWidth = 1 * S;
      g.beginPath();
      for (let i = 0; i < 8; i++) {
        const ang = (i / 8) * TAU - Math.PI / 2;
        const r = i % 2 === 0 ? 7 * S : 2.6 * S;
        const px = x + Math.cos(ang) * r, py = y + Math.sin(ang) * r;
        if (i === 0) g.moveTo(px, py); else g.lineTo(px, py);
      }
      g.closePath(); g.fill(); g.stroke();
      g.fillStyle = "#ffd24a";
      g.beginPath(); g.arc(x, y, 1.6 * S, 0, TAU); g.fill();
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
  const step = pose === "walk" && !reduce ? Math.sin(t * 0.012) : 0;

  // glória ao redor
  if ((spec.glow ?? 0) > 0.03) glowCircle(g, x, fy - 26 * S, 36 * S, "#fff2c8", 0.4 * (spec.glow ?? 0));

  softShadow(g, x, fy, 12 * S);

  if (pose === "lie") {
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

  // PROPORÇÕES HUMANIZADAS: cabeça menor, corpo mais alto, pescoço visível
  const kneel = pose === "kneel" ? 8 * S : 0;
  const hemY = fy - 4.5 * S + kneel * 0.4;
  const bodyH = 25 * S;
  const bodyTop = hemY - bodyH + bob + kneel * 0.4;
  const headR = 7.6 * S;
  const headCy = bodyTop - headR - 1.2 * S + (pose === "bow" ? 4 * S : 0);

  // ---- asas emplumadas (anjo) — atrás, detalhadas
  if (cfg.wings) {
    const flap = reduce ? 0 : Math.sin(t * 0.0035) * 3 * S;
    drawFeatherWing(g, x - 6 * S, bodyTop + 5 * S, -1, 22 * S, flap, "#eef3ff");
    drawFeatherWing(g, x + 6 * S, bodyTop + 5 * S, 1, 22 * S, flap, "#eef3ff");
  }

  // ---- pernas + sandálias com tiras
  if (pose !== "kneel") {
    const lOff = pose === "walk" ? step * 2.6 * S : 0;
    const feetC = cfg.feetBronze ? "#e0a34c" : SKIN1;
    g.fillStyle = feetC;
    rr(g, x - 4.6 * S + lOff, hemY, 3.2 * S, 4.5 * S, 1.4 * S); g.fill();
    rr(g, x + 1.4 * S - lOff, hemY, 3.2 * S, 4.5 * S, 1.4 * S); g.fill();
    // sandálias
    g.strokeStyle = "#7a5a34"; g.lineWidth = 0.8 * S;
    g.beginPath(); g.moveTo(x - 4.6 * S + lOff, hemY + 3 * S); g.lineTo(x - 1.4 * S + lOff, hemY + 2.2 * S); g.stroke();
    g.beginPath(); g.moveTo(x + 1.4 * S - lOff, hemY + 3 * S); g.lineTo(x + 4.6 * S - lOff, hemY + 2.2 * S); g.stroke();
    if (cfg.feetBronze && !reduce) glowCircle(g, x, hemY + 3 * S, 8 * S, "#ffd27a", 0.4 + Math.sin(t * 0.01) * 0.15);
  } else {
    g.fillStyle = cfg.robe1;
    rr(g, x - 9 * S, fy - 4 * S, 18 * S, 4 * S, 2 * S); g.fill();
  }

  // ---- túnica: ombros definidos → barra fluida, com gradiente e caimento
  const robe = g.createLinearGradient(x - 4 * S, bodyTop, x + 3 * S, hemY);
  robe.addColorStop(0, cfg.robe0); robe.addColorStop(1, cfg.robe1);
  g.fillStyle = robe;
  const sway = reduce ? 0 : Math.sin(t * 0.002 + x) * 0.8 * S;
  g.beginPath();
  g.moveTo(x - 7 * S, bodyTop + 3 * S);                                    // ombro esq
  g.quadraticCurveTo(x, bodyTop - 1.8 * S, x + 7 * S, bodyTop + 3 * S);    // gola/ombros
  g.quadraticCurveTo(x + 8.6 * S, bodyTop + bodyH * 0.55, x + 9.6 * S + sway, hemY); // caimento dir
  g.quadraticCurveTo(x, hemY + 2 * S, x - 9.6 * S + sway, hemY);           // barra fluida
  g.quadraticCurveTo(x - 8.6 * S, bodyTop + bodyH * 0.55, x - 7 * S, bodyTop + 3 * S);
  g.closePath(); g.fill();
  // gola em V
  g.strokeStyle = "rgba(0,0,0,0.22)"; g.lineWidth = 1 * S; g.lineCap = "round";
  g.beginPath();
  g.moveTo(x - 3 * S, bodyTop + 2.2 * S);
  g.lineTo(x, bodyTop + 5.4 * S);
  g.lineTo(x + 3 * S, bodyTop + 2.2 * S);
  g.stroke();
  // dobras suaves curvas
  g.save();
  g.strokeStyle = "rgba(0,0,0,0.13)"; g.lineWidth = 1 * S; g.lineCap = "round";
  for (const dx of [-4, 0, 4.2]) {
    g.beginPath();
    g.moveTo(x + dx * S, bodyTop + bodyH * 0.4);
    g.quadraticCurveTo(x + dx * S - 1.2 * S, bodyTop + bodyH * 0.75, x + dx * S + 0.8 * S + sway * 0.6, hemY - 1 * S);
    g.stroke();
  }
  g.restore();
  // luz lateral do tecido
  g.save();
  g.globalAlpha *= 0.3;
  g.fillStyle = "#ffffff";
  g.beginPath();
  g.moveTo(x + 5 * S, bodyTop + 3.5 * S);
  g.quadraticCurveTo(x + 8 * S, bodyTop + bodyH * 0.55, x + 8.6 * S, hemY - 1.4 * S);
  g.quadraticCurveTo(x + 6.8 * S, bodyTop + bodyH * 0.55, x + 5.6 * S, bodyTop + 4 * S);
  g.closePath(); g.fill();
  g.restore();
  // faixa/cinto com nó
  if (cfg.sash) {
    g.fillStyle = cfg.sash;
    if (cfg.eyesFlame) { rr(g, x - 7.4 * S, bodyTop + 5.6 * S, 14.8 * S, 3 * S, 1.4 * S); g.fill(); }
    else {
      rr(g, x - 8 * S, bodyTop + 13 * S, 16 * S, 2.4 * S, 1.2 * S); g.fill();
      g.beginPath(); g.arc(x + 2 * S, bodyTop + 14.2 * S, 1.5 * S, 0, TAU); g.fill();
      rr(g, x + 1.4 * S, bodyTop + 15 * S, 1.2 * S, 4 * S, 0.6 * S); g.fill(); // ponta do cinto
    }
  }
  if (cfg.trim) {
    g.fillStyle = cfg.trim;
    rr(g, x - 9.4 * S + sway, hemY - 2 * S, 18.8 * S, 1.7 * S, 0.9 * S); g.fill();
  }

  // ---- braços com MANGA + PUNHO + MÃO (mais humanos)
  const shY = bodyTop + 3.6 * S;
  const arm = (sx: number, sy: number, ex: number, ey: number) => {
    const w = 3.6 * S;
    g.save();
    // manga (gradiente do tecido)
    const mg = g.createLinearGradient(sx, sy, ex, ey);
    mg.addColorStop(0, cfg.robe0); mg.addColorStop(1, cfg.robe1);
    g.strokeStyle = mg as unknown as string; g.lineWidth = w; g.lineCap = "round";
    g.beginPath(); g.moveTo(sx, sy); g.quadraticCurveTo((sx + ex) / 2 + 0.6 * S, (sy + ey) / 2, ex, ey); g.stroke();
    // punho
    g.strokeStyle = "rgba(0,0,0,0.18)"; g.lineWidth = w * 0.9;
    g.beginPath(); g.moveTo(ex - (ex - sx) * 0.12, ey - (ey - sy) * 0.12); g.lineTo(ex, ey); g.stroke();
    // mão (pele com sombra)
    const hand = g.createRadialGradient(ex - 0.5 * S, ey - 0.5 * S, 0.2, ex, ey, w * 0.52);
    hand.addColorStop(0, SKIN0); hand.addColorStop(1, SKIN1);
    g.fillStyle = hand;
    g.beginPath(); g.arc(ex, ey, w * 0.5, 0, TAU); g.fill();
    g.restore();
  };
  const swing = pose === "walk" ? step * 3 * S : 0;
  if (pose === "raise") { arm(x - 6 * S, shY, x - 9.5 * S, shY - 11 * S); arm(x + 6 * S, shY, x + 9.5 * S, shY - 11 * S); }
  else if (pose === "point") { arm(x + face * 6 * S, shY, x + face * 14 * S, shY + 1 * S); arm(x - face * 6 * S, shY, x - face * 7 * S, shY + 10 * S); }
  else if (pose === "write") {
    arm(x - 6 * S, shY, x - 7 * S, shY + 10 * S);
    arm(x + 6 * S, shY, x + 8.5 * S, shY + 8 * S);
    g.fillStyle = "#efe3c2";
    rr(g, x + 3 * S, shY + 7 * S, 9.5 * S, 5.5 * S, 1.6 * S); g.fill();
    g.strokeStyle = "#cbb98d"; g.lineWidth = 0.7 * S;
    for (let ln = 1; ln <= 2; ln++) { g.beginPath(); g.moveTo(x + 4.4 * S, shY + 7 * S + ln * 1.7 * S); g.lineTo(x + 11 * S, shY + 7 * S + ln * 1.7 * S); g.stroke(); }
  }
  else if (pose === "bow" || pose === "kneel") { arm(x - 6 * S, shY, x - 6.5 * S, shY + 11 * S); arm(x + 6 * S, shY, x + 6.5 * S, shY + 11 * S); }
  else if (pose === "walk") { arm(x - 6.4 * S, shY, x - 7.8 * S, shY + 10 * S + swing); arm(x + 6.4 * S, shY, x + 7.8 * S, shY + 10 * S - swing); }
  else { arm(x - 6.4 * S, shY, x - 7.2 * S, shY + 10.5 * S); arm(x + 6.4 * S, shY, x + 7.2 * S, shY + 10.5 * S); }

  // ---- pescoço + cabeça
  g.fillStyle = SKIN1;
  rr(g, x - 1.8 * S, headCy + headR - 1 * S, 3.6 * S, 3.4 * S, 1.4 * S); g.fill();
  const skin = g.createRadialGradient(x - 2.5 * S, headCy - 3 * S, 1, x, headCy, headR * 1.15);
  skin.addColorStop(0, "#f6d3a8"); skin.addColorStop(0.75, SKIN0); skin.addColorStop(1, SKIN1);
  g.fillStyle = skin;
  g.beginPath();
  // rosto levemente oval (queixo mais fino = mais humano)
  g.ellipse(x, headCy, headR * 0.94, headR, 0, 0, TAU);
  g.fill();

  // orelhas
  g.fillStyle = SKIN0;
  g.beginPath(); g.ellipse(x - headR * 0.92, headCy + 0.6 * S, 1.3 * S, 2 * S, 0, 0, TAU); g.fill();
  g.beginPath(); g.ellipse(x + headR * 0.92, headCy + 0.6 * S, 1.3 * S, 2 * S, 0, 0, TAU); g.fill();

  // bochechas
  g.save(); g.globalAlpha *= 0.3; g.fillStyle = "#e86a4a";
  g.beginPath(); g.ellipse(x - 4.2 * S, headCy + 2.8 * S, 1.7 * S, 1 * S, 0, 0, TAU); g.fill();
  g.beginPath(); g.ellipse(x + 4.2 * S, headCy + 2.8 * S, 1.7 * S, 1 * S, 0, 0, TAU); g.fill();
  g.restore();

  // ---- olhos expressivos (branco + íris gradiente + pálpebra + cílio)
  const eyeY = headCy + 0.4 * S;
  const off = face * 0.6 * S;
  for (const s of [-1, 1] as const) {
    const ex = x + s * 3.2 * S + off;
    if (cfg.eyesFlame && !reduce) {
      glowCircle(g, ex, eyeY, 4.5 * S, "#ffb14a", 0.55);
      const fl = g.createRadialGradient(ex, eyeY, 0.4 * S, ex, eyeY, 2.2 * S);
      fl.addColorStop(0, "#fff3c0"); fl.addColorStop(1, "#ff8c2e");
      g.fillStyle = fl;
      g.beginPath(); g.ellipse(ex, eyeY, 1.9 * S, 2.3 * S, 0, 0, TAU); g.fill();
    } else {
      // branco do olho (amendoado)
      g.fillStyle = "#ffffff";
      g.beginPath(); g.ellipse(ex, eyeY, 2.2 * S, 2.5 * S, 0, 0, TAU); g.fill();
      // íris com gradiente + pupila + brilho
      const iris = g.createRadialGradient(ex + off * 0.5 - 0.4 * S, eyeY - 0.4 * S, 0.2 * S, ex + off * 0.5, eyeY + 0.2 * S, 1.7 * S);
      iris.addColorStop(0, mixHex(cfg.iris ?? "#4a3624", "#ffffff", 0.35));
      iris.addColorStop(0.6, cfg.iris ?? "#4a3624");
      iris.addColorStop(1, mixHex(cfg.iris ?? "#4a3624", "#000000", 0.6));
      g.fillStyle = iris;
      g.beginPath(); g.arc(ex + off * 0.5, eyeY + 0.3 * S, 1.55 * S, 0, TAU); g.fill();
      g.fillStyle = "rgba(10,8,6,0.9)";
      g.beginPath(); g.arc(ex + off * 0.5, eyeY + 0.4 * S, 0.7 * S, 0, TAU); g.fill();
      g.fillStyle = "#ffffff";
      g.beginPath(); g.arc(ex + off * 0.5 - 0.6 * S, eyeY - 0.5 * S, 0.55 * S, 0, TAU); g.fill();
      // pálpebra superior (linha do cílio) — expressividade
      g.strokeStyle = "rgba(60,38,22,0.75)"; g.lineWidth = 0.9 * S; g.lineCap = "round";
      g.beginPath(); g.ellipse(ex, eyeY - 0.2 * S, 2.2 * S, 2.5 * S, 0, Math.PI * 1.15, Math.PI * 1.85); g.stroke();
      // sobrancelha com arco natural
      g.strokeStyle = mixDarkHD(cfg.hair); g.lineWidth = 1.1 * S;
      g.beginPath(); g.moveTo(ex - 2 * S, eyeY - 3.6 * S); g.quadraticCurveTo(ex + 0.2 * S, eyeY - 4.6 * S, ex + 2 * S, eyeY - 3.5 * S); g.stroke();
    }
  }
  // nariz definido + narina sutil
  g.strokeStyle = "rgba(140,84,48,0.65)"; g.lineWidth = 0.9 * S; g.lineCap = "round";
  g.beginPath();
  g.moveTo(x + off, eyeY + 1.6 * S);
  g.quadraticCurveTo(x + off + 1 * S, eyeY + 3.2 * S, x + off + 0.2 * S, eyeY + 3.8 * S);
  g.stroke();
  // boca com lábio (sorriso suave)
  g.strokeStyle = "#9a4a32"; g.lineWidth = 1.1 * S;
  g.beginPath(); g.moveTo(x - 1.9 * S, headCy + 4.6 * S); g.quadraticCurveTo(x, headCy + 5.8 * S, x + 1.9 * S, headCy + 4.6 * S); g.stroke();
  g.save(); g.globalAlpha *= 0.4; g.strokeStyle = "#ffffff"; g.lineWidth = 0.7 * S;
  g.beginPath(); g.moveTo(x - 1.2 * S, headCy + 5.9 * S); g.quadraticCurveTo(x, headCy + 6.4 * S, x + 1.2 * S, headCy + 5.9 * S); g.stroke();
  g.restore();

  // ---- cabelo em MECHAS (não capacete)
  g.fillStyle = cfg.hair;
  g.beginPath();
  g.moveTo(x - headR * 0.98, headCy + 0.5 * S);
  g.quadraticCurveTo(x - headR * 1.05, headCy - headR * 0.9, x - headR * 0.3, headCy - headR * 1.06);
  g.quadraticCurveTo(x + headR * 0.45, headCy - headR * 1.18, x + headR * 0.98, headCy - headR * 0.35);
  g.lineTo(x + headR * 0.94, headCy + 0.2 * S);
  // franja com 3 mechas
  g.quadraticCurveTo(x + headR * 0.5, headCy - headR * 0.5, x + headR * 0.25, headCy - headR * 0.42);
  g.quadraticCurveTo(x + headR * 0.05, headCy - headR * 0.72, x - headR * 0.25, headCy - headR * 0.5);
  g.quadraticCurveTo(x - headR * 0.5, headCy - headR * 0.78, x - headR * 0.7, headCy - headR * 0.3);
  g.closePath(); g.fill();
  // brilho do cabelo
  g.save(); g.globalAlpha *= 0.3; g.fillStyle = "#ffffff";
  g.beginPath(); g.ellipse(x - 2.4 * S, headCy - headR * 0.78, 3 * S, 1 * S, -0.3, 0, TAU); g.fill();
  g.restore();
  // barba cheia com bigode
  if (cfg.beard) {
    g.fillStyle = cfg.beard;
    g.beginPath();
    g.moveTo(x - headR * 0.85, headCy + 1.6 * S);
    g.quadraticCurveTo(x - headR * 0.9, headCy + headR * 1.1, x, headCy + headR * 1.45);
    g.quadraticCurveTo(x + headR * 0.9, headCy + headR * 1.1, x + headR * 0.85, headCy + 1.6 * S);
    g.quadraticCurveTo(x + headR * 0.55, headCy + 3.4 * S, x + 2.2 * S, headCy + 3.8 * S);
    g.quadraticCurveTo(x, headCy + 4.4 * S, x - 2.2 * S, headCy + 3.8 * S);
    g.quadraticCurveTo(x - headR * 0.55, headCy + 3.4 * S, x - headR * 0.85, headCy + 1.6 * S);
    g.closePath(); g.fill();
    // bigode
    g.strokeStyle = cfg.beard; g.lineWidth = 1.3 * S; g.lineCap = "round";
    g.beginPath(); g.moveTo(x - 2.4 * S, headCy + 4.4 * S); g.quadraticCurveTo(x, headCy + 3.9 * S, x + 2.4 * S, headCy + 4.4 * S); g.stroke();
    // boca sobre a barba
    g.strokeStyle = "#8a4a30"; g.lineWidth = 1 * S;
    g.beginPath(); g.moveTo(x - 1.4 * S, headCy + 5.4 * S); g.quadraticCurveTo(x, headCy + 6.2 * S, x + 1.4 * S, headCy + 5.4 * S); g.stroke();
    // sombreado interno da barba
    g.save(); g.globalAlpha *= 0.25; g.strokeStyle = "#000000"; g.lineWidth = 0.7 * S;
    g.beginPath(); g.moveTo(x - 3 * S, headCy + 7 * S); g.quadraticCurveTo(x, headCy + 8.4 * S, x + 3 * S, headCy + 7 * S); g.stroke();
    g.restore();
  }

  // coroa (ancião)
  if (spec.role === "anciao") {
    const gold = g.createLinearGradient(x, headCy - headR - 5 * S, x, headCy - headR);
    gold.addColorStop(0, "#ffd989"); gold.addColorStop(1, "#c8922e");
    g.fillStyle = gold;
    rr(g, x - headR * 0.72, headCy - headR - 2.6 * S, headR * 1.44, 2.8 * S, 1 * S); g.fill();
    for (const dx of [-0.45, 0, 0.45]) {
      g.beginPath();
      g.moveTo(x + dx * headR - 1.2 * S, headCy - headR - 2.2 * S);
      g.lineTo(x + dx * headR, headCy - headR - 5.4 * S);
      g.lineTo(x + dx * headR + 1.2 * S, headCy - headR - 2.2 * S);
      g.closePath(); g.fill();
    }
  }

  // auréola / resplendor
  if ((cfg.halo ?? 0) > 0.05 && !reduce) glowCircle(g, x, headCy, headR * 2.3, "#fff6d8", 0.45 * (cfg.halo ?? 0) * (0.8 + Math.sin(t * 0.005) * 0.2));

  // sete estrelas na destra (Cristo)
  if (cfg.stars7 && !reduce) {
    const hx = x + 7.4 * S, hy = shY + 10.5 * S;
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

// tom de sombra p/ sobrancelha (escurece a cor do cabelo)
const mixDarkHD = (hex: string): string => {
  try { return mixHex(hex, "#000000", 0.25); } catch { return hex; }
};

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

// altura que cada montaria levanta o herói (px) — nos animais ele SENTA na
// sela (corpo assentado, sem pés); na carruagem ele fica DE PÉ dentro do cesto
const MOUNT_LIFT: Record<string, number> = { chariot: 6, horse: 22, camel: 25, donkey: 20 };
export function heroMountLift(mount?: string): number {
  if (!mount || mount === "none") return 0;
  return MOUNT_LIFT[mount] ?? 14;
}

/** Montaria HD em CAMADAS: "back" (atrás do herói) e "front" (na frente — a
 *  parede do cesto da carruagem cobre as pernas: ele fica DENTRO). */
function drawMountHD(g: G, x: number, fy: number, kind: string, t: number, walking: boolean, reduce: boolean, layer: "back" | "front" = "back"): void {
  const gallop = walking && !reduce ? Math.sin(t * 0.014) : 0;
  const legSwing = (ph: number) => (walking && !reduce ? Math.sin(t * 0.014 + ph) * 3 : 0);

  if (kind === "chariot") {
    // CARRUAGEM com 4 RODAS (proporção real): par DISTANTE atrás do cesto,
    // par PRÓXIMO desenhado por cima da parede frontal — herói dentro.
    const spin = walking && !reduce ? t * 0.012 : t * 0.0012;
    const wheel = (cx2: number, wheelR: number, farSide: boolean) => {
      const cy2 = fy - wheelR - (farSide ? 1.5 : 0);
      const wg = g.createRadialGradient(cx2 - 2, cy2 - 2, 1, cx2, cy2, wheelR);
      if (farSide) { wg.addColorStop(0, "#6d5330"); wg.addColorStop(1, "#3e2f16"); }
      else { wg.addColorStop(0, "#8a6a3a"); wg.addColorStop(1, "#54401e"); }
      g.fillStyle = wg;
      g.beginPath(); g.arc(cx2, cy2, wheelR, 0, TAU); g.fill();
      g.strokeStyle = farSide ? "#b08a3a" : "#e8b04b"; g.lineWidth = farSide ? 1.4 : 1.9;
      g.beginPath(); g.arc(cx2, cy2, wheelR - 1, 0, TAU); g.stroke();
      g.strokeStyle = farSide ? "#a8843a" : "#d9a83e"; g.lineWidth = farSide ? 1 : 1.3;
      for (let i = 0; i < 8; i++) {
        const a = spin + (i / 8) * TAU;
        g.beginPath(); g.moveTo(cx2, cy2); g.lineTo(cx2 + Math.cos(a) * (wheelR - 2), cy2 + Math.sin(a) * (wheelR - 2)); g.stroke();
      }
      g.fillStyle = farSide ? "#d9a83e" : "#ffd889";
      g.beginPath(); g.arc(cx2, cy2, 1.9, 0, TAU); g.fill();
    };
    if (layer === "back") {
      // par de rodas DISTANTE (lado de lá, um pouco menor e mais escuro)
      wheel(x - 12, 8.4, true);
      wheel(x + 13, 8.4, true);
      // parede de TRÁS do cesto (mais escura)
      g.fillStyle = "#8a6416";
      g.beginPath();
      g.moveTo(x - 18, fy - 8);
      g.lineTo(x - 17, fy - 27);
      g.quadraticCurveTo(x, fy - 30, x + 16, fy - 28);
      g.lineTo(x + 17, fy - 8);
      g.closePath(); g.fill();
      return;
    }
    // FRONT: parede da frente do cesto (cobre as pernas) com voluta e brasão
    const bg2 = g.createLinearGradient(x, fy - 28, x, fy - 6);
    bg2.addColorStop(0, "#ffd889"); bg2.addColorStop(0.45, "#e8b04b"); bg2.addColorStop(1, "#a8751f");
    g.fillStyle = bg2;
    g.beginPath();
    g.moveTo(x - 19, fy - 6);
    g.lineTo(x - 18, fy - 26);
    g.quadraticCurveTo(x - 8, fy - 29, x + 4, fy - 28);
    g.quadraticCurveTo(x + 15, fy - 30, x + 19.5, fy - 24);      // sobe pra voluta
    g.quadraticCurveTo(x + 22.5, fy - 19, x + 18.5, fy - 16.5);  // voluta enrolando
    g.quadraticCurveTo(x + 16, fy - 15, x + 17, fy - 10);
    g.quadraticCurveTo(x + 17.5, fy - 7, x + 18, fy - 6);
    g.closePath(); g.fill();
    // friso superior + brasão de chama
    g.strokeStyle = "#8a6416"; g.lineWidth = 1.1;
    g.beginPath(); g.moveTo(x - 16.5, fy - 24); g.quadraticCurveTo(x - 4, fy - 27, x + 8, fy - 26); g.stroke();
    g.fillStyle = "#b0483c";
    g.beginPath(); g.ellipse(x - 2, fy - 16, 4.4, 5.2, 0, 0, TAU); g.fill();
    g.fillStyle = "#ffd889";
    g.beginPath();
    g.moveTo(x - 2, fy - 19.4);
    g.quadraticCurveTo(x + 0.4, fy - 16, x - 2, fy - 13);
    g.quadraticCurveTo(x - 4.4, fy - 16, x - 2, fy - 19.4);
    g.fill();
    // brilho do metal
    g.fillStyle = "rgba(255,255,255,0.35)";
    g.beginPath(); g.ellipse(x - 10, fy - 25, 4.5, 1.2, -0.1, 0, TAU); g.fill();
    // eixo + par de rodas PRÓXIMO (na frente da parede — 4 rodas no total)
    g.strokeStyle = "#54401e"; g.lineWidth = 2.6;
    g.beginPath(); g.moveTo(x - 12, fy - 9.5); g.lineTo(x + 13, fy - 9.5); g.stroke();
    wheel(x - 12, 9.5, false);
    wheel(x + 13, 9.5, false);
    return;
  }
  if (layer === "front") return; // quadrúpedes não têm camada frontal

  // ---- quadrúpedes ----
  const cfg = kind === "camel"
    ? { c0: "#d4b478", c1: "#a5854b", bodyW: 26, bodyH: 11, neckH: 13, headL: 7, ear: 1.6, hump: true, tailTuft: false }
    : kind === "donkey"
      ? { c0: "#9a9088", c1: "#6d645c", bodyW: 22, bodyH: 10, neckH: 9, headL: 6.4, ear: 3.6, hump: false, tailTuft: true }
      : { c0: "#a5713e", c1: "#6d4522", bodyW: 25, bodyH: 11, neckH: 11, headL: 7.4, ear: 2, hump: false, tailTuft: true }; // horse
  const bodyY = fy - 12 - cfg.bodyH + gallop * 0.8;

  // pernas (4, animadas em pares)
  g.strokeStyle = cfg.c1; g.lineWidth = 2.6; g.lineCap = "round";
  for (const [lx, ph] of [[-9, 0], [-4, Math.PI], [4, Math.PI], [9, 0]] as const) {
    g.beginPath();
    g.moveTo(x + lx, bodyY + cfg.bodyH - 2);
    g.lineTo(x + lx + legSwing(ph) * 0.6, fy - 1);
    g.stroke();
    // casco
    g.fillStyle = "#3a2c1c";
    g.beginPath(); g.ellipse(x + lx + legSwing(ph) * 0.6, fy - 0.8, 1.8, 1.1, 0, 0, TAU); g.fill();
  }
  // corpo
  const bgrd = g.createLinearGradient(x, bodyY, x, bodyY + cfg.bodyH + 2);
  bgrd.addColorStop(0, cfg.c0); bgrd.addColorStop(1, cfg.c1);
  g.fillStyle = bgrd;
  g.beginPath(); g.ellipse(x, bodyY + cfg.bodyH / 2, cfg.bodyW / 2, cfg.bodyH / 2 + 1, 0, 0, TAU); g.fill();
  if (cfg.hump) { // corcova do camelo (o herói senta nela)
    g.beginPath(); g.ellipse(x - 2, bodyY - 1.5, 7, 4, 0, Math.PI, TAU); g.fill();
  }
  // manta de sela
  g.fillStyle = kind === "camel" ? "#b0483c" : "#4a78c8";
  rr(g, x - 6.5, bodyY - 2.5, 13, 4.5, 2); g.fill();
  g.strokeStyle = "#ffd889"; g.lineWidth = 0.8;
  g.beginPath(); g.moveTo(x - 6, bodyY + 1.4); g.lineTo(x + 6, bodyY + 1.4); g.stroke();
  // pescoço + cabeça
  const nx = x + cfg.bodyW / 2 - 2;
  g.strokeStyle = cfg.c0; g.lineWidth = 4.4; g.lineCap = "round";
  g.beginPath(); g.moveTo(nx, bodyY + 2); g.quadraticCurveTo(nx + 3, bodyY - cfg.neckH * 0.6, nx + 4.5, bodyY - cfg.neckH); g.stroke();
  const hx2 = nx + 4.5, hy2 = bodyY - cfg.neckH;
  g.fillStyle = cfg.c0;
  g.beginPath(); g.ellipse(hx2 + cfg.headL / 2, hy2, cfg.headL / 2 + 1, 3, 0.12, 0, TAU); g.fill();
  // focinho + olho + orelha
  g.fillStyle = cfg.c1;
  g.beginPath(); g.ellipse(hx2 + cfg.headL, hy2 + 0.6, 1.8, 1.4, 0, 0, TAU); g.fill();
  g.fillStyle = "#14161e";
  g.beginPath(); g.arc(hx2 + 1.6, hy2 - 0.8, 0.9, 0, TAU); g.fill();
  g.fillStyle = "#ffffff";
  g.beginPath(); g.arc(hx2 + 1.3, hy2 - 1.1, 0.35, 0, TAU); g.fill();
  g.strokeStyle = cfg.c1; g.lineWidth = 1.6; g.lineCap = "round";
  g.beginPath(); g.moveTo(hx2, hy2 - 2.6); g.lineTo(hx2 - 1, hy2 - 2.6 - cfg.ear); g.stroke();
  if (kind === "donkey") { g.beginPath(); g.moveTo(hx2 + 2.4, hy2 - 2.6); g.lineTo(hx2 + 2, hy2 - 2.6 - cfg.ear); g.stroke(); }
  // crina (cavalo) / tufos
  if (kind === "horse") {
    g.strokeStyle = "#4a2f16"; g.lineWidth = 2;
    g.beginPath(); g.moveTo(nx + 0.5, bodyY + 1); g.quadraticCurveTo(nx + 3, bodyY - cfg.neckH * 0.55, nx + 3.4, hy2 + 1); g.stroke();
  }
  // cauda
  g.strokeStyle = cfg.c1; g.lineWidth = 1.8; g.lineCap = "round";
  const tailSway = reduce ? 0 : Math.sin(t * 0.005) * 2;
  g.beginPath();
  g.moveTo(x - cfg.bodyW / 2 + 1, bodyY + 2);
  g.quadraticCurveTo(x - cfg.bodyW / 2 - 4, bodyY + 6 + tailSway, x - cfg.bodyW / 2 - 3, bodyY + 10 + tailSway);
  g.stroke();
  if (cfg.tailTuft) {
    g.fillStyle = "#4a2f16";
    g.beginPath(); g.ellipse(x - cfg.bodyW / 2 - 3, bodyY + 11 + tailSway, 1.6, 2.4, 0.3, 0, TAU); g.fill();
  }
}

/** Asa emplumada HD (compartilhada: herói e anjos). s = lado (-1 esq, +1 dir).
 *  Penas primárias individuais em leque, com separações e gradiente. */
export function drawFeatherWing(g: G, x: number, y: number, s: -1 | 1, size: number, flap: number, tint: string): void {
  g.save();
  const base = mixHex(tint, "#ffffff", 0.15);
  const shade = mixHex(tint, "#5a688c", 0.45);
  // 5 penas primárias em leque (de trás pra frente)
  for (let i = 4; i >= 0; i--) {
    const fr = i / 4;                                  // 0 = pena de cima, 1 = de baixo
    const ang = (-0.55 + fr * 0.85) + flap * 0.03;     // abre o leque
    const len = size * (1 - fr * 0.32);
    const wdt = size * 0.24 * (1 - fr * 0.18);
    const tipX = x + s * Math.cos(ang) * len;
    const tipY = y + Math.sin(ang) * len - flap * (1 - fr * 0.5);
    const grd = g.createLinearGradient(x, y, tipX, tipY);
    grd.addColorStop(0, shade);
    grd.addColorStop(0.4, base);
    grd.addColorStop(1, "#ffffff");
    g.fillStyle = grd;
    g.beginPath();
    g.moveTo(x, y - wdt * 0.4);
    g.quadraticCurveTo(x + s * len * 0.5, tipY - wdt, tipX, tipY);       // borda de cima
    g.quadraticCurveTo(x + s * len * 0.55, tipY + wdt * 0.9, x, y + wdt * 0.8); // borda de baixo (ponta arredondada)
    g.closePath(); g.fill();
    // separação entre penas
    g.strokeStyle = "rgba(90,104,140,0.35)";
    g.lineWidth = 0.7;
    g.beginPath();
    g.moveTo(x + s * 2, y + wdt * 0.3);
    g.quadraticCurveTo(x + s * len * 0.55, tipY + wdt * 0.5, tipX, tipY);
    g.stroke();
  }
  // coberteiras (base da asa, penugem)
  const cov = g.createRadialGradient(x, y, 1, x, y, size * 0.42);
  cov.addColorStop(0, "#ffffff");
  cov.addColorStop(1, base);
  g.fillStyle = cov;
  g.beginPath(); g.ellipse(x + s * size * 0.14, y, size * 0.3, size * 0.2, s * 0.4, 0, TAU); g.fill();
  g.restore();
}

/** O Devocionalzeiro HD — fiel à REFERÊNCIA: corpo "D" alto e vítreo, olhos
 *  azuis enormes com specular, crescente luminoso na barriga, sorriso sutil.
 *  Fofo, feliz e DINÂMICO: pisca, balança e dá quicadas ao andar. */
export function drawHeroHD(g: G, x: number, fy: number, look: Partial<MascotLook>, o: HDHeroOpts): void {
  const t = o.t;
  const reduce = !!o.reduce;
  const face = o.face ?? 1;
  const pal = HERO_PAL[(look.color as MascotColor) ?? "blue"] ?? HERO_PAL.blue;

  const bob = reduce ? 0 : Math.sin(t * 0.004) * 1.1;
  const step = o.walking && !reduce ? Math.sin(t * 0.014) : 0;
  const squash = o.walking && !reduce ? 1 - Math.abs(Math.sin(t * 0.014)) * 0.035 : 1;
  // vida: balancinho de corpo (idle) e piscada periódica
  const sway = reduce ? 0 : Math.sin(t * 0.0016) * 0.02 + (o.walking ? step * 0.03 : 0);
  const blink = !reduce && ((t + 830) % 3400) < 130;

  // montaria: levanta o herói (carruagem/cavalo/camelo/jumento)
  const lift = heroMountLift(look.mount);
  const fyB = fy - lift;

  // proporções da referência: alto e estreito (D)
  const W = 30, H = 48 * squash;
  const top = fyB - H - 5 + bob;
  const L = x - W / 2;            // borda esquerda (reta)
  const Rmax = x + W / 2 + 4;     // pico da barriga curva (no MEIO da altura)

  softShadow(g, x, fy, lift > 0 ? 22 : 16, 0.34);

  g.save();
  if (face === -1) { g.translate(x, 0); g.scale(-1, 1); g.translate(-x, 0); }
  // balancinho charmoso em torno dos pés
  g.translate(x, fy); g.rotate(sway); g.translate(-x, -fy);

  // ---- montaria (camada de trás, embaixo do herói) ----
  if (lift > 0 && look.mount) drawMountHD(g, x, fy, look.mount, t, !!o.walking, reduce, "back");

  // ---- aura (loja) ----
  if (look.aura && look.aura !== "none") glowCircle(g, x, fy - 24, 44, pal.glow, 0.35);

  // ---- asas emplumadas (atrás) — GRANDES, presença de verdade ----
  if (look.wings && look.wings !== "none") {
    const flap = reduce ? 0 : Math.sin(t * 0.006) * 4;
    const wc = look.wings === "gold" ? "#ffd98a" : look.wings === "crystal" ? "#bfe6ff" : "#eef3ff";
    drawFeatherWing(g, x - W / 2 + 3, top + 17, -1, 34, flap, wc);
    drawFeatherWing(g, x + W / 2 - 3, top + 17, 1, 34, flap, wc);
  }

  // ---- pés: só no chão ou DE PÉ na carruagem; nos animais ele SENTA na sela
  //      (corpo assentado, perninhas recolhidas — como um cavaleiro) ----
  const rides = lift > 0 && look.mount !== "chariot";
  if (!rides) {
    const feetGrd = g.createLinearGradient(x, fyB - 6, x, fyB);
    feetGrd.addColorStop(0, mixHex(pal.top, "#000000", 0.15));
    feetGrd.addColorStop(1, pal.bot);
    g.fillStyle = feetGrd;
    const lOff = o.walking && lift === 0 ? step * 2.6 : 0;
    rr(g, x - 10.5 + lOff, fyB - 5.5, 8.5, 5.5, 2.8); g.fill();
    rr(g, x + 2 - lOff, fyB - 5.5, 8.5, 5.5, 2.8); g.fill();
    // brilho no peito do pé
    g.fillStyle = "rgba(255,255,255,0.08)";
    rr(g, x - 9.5 + lOff, fyB - 5, 6, 1.6, 1); g.fill();
    rr(g, x + 3 - lOff, fyB - 5, 6, 1.6, 1); g.fill();
  } else {
    // perninha visível do lado de cá, caída na lateral da sela (montado)
    const legGrd = g.createLinearGradient(x, fyB - 3, x, fyB + 7);
    legGrd.addColorStop(0, mixHex(pal.top, "#000000", 0.15));
    legGrd.addColorStop(1, pal.bot);
    g.fillStyle = legGrd;
    rr(g, x - 3, fyB - 3, 6.5, 9.5, 3); g.fill();
    g.fillStyle = "rgba(255,255,255,0.08)";
    rr(g, x - 2, fyB - 2, 4.5, 1.6, 1); g.fill();
  }

  // ---- capa atrás — só nos mantos que fluem (real/profeta/bodas); os demais
  //      são trajes justos sem capa ----
  if (look.robe && ["royal", "prophet", "wedding"].includes(look.robe)) {
    const ROBE_COLORS: Record<string, { c0: string; c1: string; trim?: string }> = {
      pilgrim: { c0: "#9a7a4e", c1: "#6d5334" },
      prophet: { c0: "#7a5ac0", c1: "#4c3684" },
      royal: { c0: "#c04a5a", c1: "#84202e", trim: "#ffd989" },
      purple: { c0: "#9a4ab8", c1: "#5c2a74" },
      sackcloth: { c0: "#8d8274", c1: "#5c554a" },
      wedding: { c0: "#ffffff", c1: "#cfd8ea", trim: "#ffd989" },
    };
    const rc = ROBE_COLORS[look.robe] ?? ROBE_COLORS.pilgrim;
    const capeSway = reduce ? 0 : Math.sin(t * 0.003) * 1.6;
    const cg = g.createLinearGradient(x, top + 6, x, top + H + 2);
    cg.addColorStop(0, rc.c0); cg.addColorStop(1, rc.c1);
    g.fillStyle = cg;
    g.beginPath();
    g.moveTo(L + 4, top + 8);
    g.quadraticCurveTo(x, top + 4.5, Rmax - 6, top + 8);
    g.quadraticCurveTo(Rmax + 3 + capeSway, top + H * 0.6, Rmax + 0.5 + capeSway, top + H - 2);
    // barra ondulada (estreita — não engorda a silhueta)
    g.quadraticCurveTo(x + 3, top + H + 2, x - 3, top + H - 0.5);
    g.quadraticCurveTo(L - 3 - capeSway, top + H + 1.6, L - 2.5 - capeSway, top + H - 3);
    g.quadraticCurveTo(L - 4 - capeSway, top + H * 0.55, L + 4, top + 8);
    g.closePath(); g.fill();
    if (rc.trim) {
      g.strokeStyle = rc.trim; g.lineWidth = 1.1;
      g.beginPath();
      g.moveTo(Rmax + 0.5 + capeSway, top + H - 2.5);
      g.quadraticCurveTo(x + 3, top + H + 1.6, x - 3, top + H - 1);
      g.quadraticCurveTo(L - 3 - capeSway, top + H + 1, L - 2.5 - capeSway, top + H - 3.5);
      g.stroke();
    }
  }

  // ---- corpo "D": esquerda RETA, direita numa única curva contínua com o
  //      PICO NO MEIO da altura (silhueta da referência) ----
  const body = g.createLinearGradient(x - 8, top, x + 6, top + H);
  body.addColorStop(0, pal.top);
  body.addColorStop(0.55, mixHex(pal.top, pal.bot, 0.55));
  body.addColorStop(1, pal.bot);
  g.fillStyle = body;
  g.beginPath();
  g.moveTo(L + 7, top);                                          // topo (levemente mais estreito)
  g.bezierCurveTo(x + 6, top, Rmax - 5, top + H * 0.14, Rmax, top + H * 0.5);   // desce até o pico no MEIO
  g.bezierCurveTo(Rmax - 0.5, top + H * 0.8, x + 10, top + H, x + 1, top + H);  // barriga → base
  g.lineTo(L + 8, top + H);
  g.quadraticCurveTo(L, top + H, L, top + H - 8);                 // canto inf-esq arredondado
  g.lineTo(L, top + 7);
  g.quadraticCurveTo(L, top, L + 7, top);                         // canto sup-esq arredondado
  g.closePath();
  g.fill();

  // sheen vítreo (luz de cima-esquerda)
  g.save();
  const sheen = g.createRadialGradient(x - 7, top + 8, 2, x - 3, top + 14, 26);
  sheen.addColorStop(0, "rgba(190,215,255,0.16)");
  sheen.addColorStop(1, "rgba(190,215,255,0)");
  g.fillStyle = sheen;
  g.beginPath(); g.ellipse(x - 3, top + 13, 13, 15, 0, 0, TAU); g.fill();
  g.restore();

  // rim light da COR seguindo a curva direita (como na referência)
  g.save();
  g.strokeStyle = pal.glow;
  g.lineCap = "round";
  g.shadowColor = pal.glow; g.shadowBlur = 6;
  g.lineWidth = 1.3; g.globalAlpha *= 0.5;
  g.beginPath();
  g.moveTo(x + 6, top + H - 1.6);
  g.bezierCurveTo(x + 11, top + H - 2, Rmax - 1.2, top + H * 0.76, Rmax - 1.2, top + H * 0.5);
  g.stroke();
  g.restore();

  if (look.robe && look.robe !== "none") {
    // ---- TRAJE VESTINDO o corpo: recortado na própria silhueta do D ----
    const ROBE_COLORS2: Record<string, { c0: string; c1: string; trim?: string }> = {
      pilgrim: { c0: "#9a7a4e", c1: "#6d5334" },
      prophet: { c0: "#7a5ac0", c1: "#4c3684", trim: "#c9b8f0" },
      royal: { c0: "#c04a5a", c1: "#84202e", trim: "#ffd989" },
      purple: { c0: "#9a4ab8", c1: "#5c2a74", trim: "#e0b8f0" },
      sackcloth: { c0: "#8d8274", c1: "#5c554a" },
      wedding: { c0: "#ffffff", c1: "#cfd8ea", trim: "#ffd989" },
    };
    const rc2 = ROBE_COLORS2[look.robe] ?? ROBE_COLORS2.pilgrim;
    g.save();
    // clip = silhueta exata do corpo → a roupa fica JUSTA nele
    g.beginPath();
    g.moveTo(L + 7, top);
    g.bezierCurveTo(x + 6, top, Rmax - 5, top + H * 0.14, Rmax, top + H * 0.5);
    g.bezierCurveTo(Rmax - 0.5, top + H * 0.8, x + 10, top + H, x + 1, top + H);
    g.lineTo(L + 8, top + H);
    g.quadraticCurveTo(L, top + H, L, top + H - 8);
    g.lineTo(L, top + 7);
    g.quadraticCurveTo(L, top, L + 7, top);
    g.closePath();
    g.clip();
    const vTop = top + 30;                                          // ABAIXO da boca (smileY = top+26)
    // pano do corpo para baixo, GOLA RASA arredondada (justa)
    const vg = g.createLinearGradient(x, vTop, x, top + H);
    vg.addColorStop(0, rc2.c0); vg.addColorStop(1, rc2.c1);
    g.fillStyle = vg;
    g.beginPath();
    g.moveTo(L - 2, vTop + 1.5);
    g.quadraticCurveTo(x + 1, vTop - 2, Rmax + 3, vTop + 1.5);      // gola rasa
    g.lineTo(Rmax + 3, top + H + 2);
    g.lineTo(L - 2, top + H + 2);
    g.closePath(); g.fill();
    // sombra sob a gola (a roupa "assenta" no corpo)
    g.strokeStyle = "rgba(0,0,0,0.3)"; g.lineWidth = 1.2; g.lineCap = "round";
    g.beginPath();
    g.moveTo(L - 1, vTop + 1.8);
    g.quadraticCurveTo(x + 1, vTop - 1.7, Rmax + 2, vTop + 1.8);
    g.stroke();
    // dobras do pano
    g.strokeStyle = "rgba(0,0,0,0.15)"; g.lineWidth = 1; g.lineCap = "round";
    for (const dx of [-6.5, 6.5]) {
      g.beginPath();
      g.moveTo(x + dx, vTop + 5);
      g.quadraticCurveTo(x + dx - 1.2, top + H * 0.8, x + dx + 0.8, top + H - 2);
      g.stroke();
    }
    // luz do tecido no lado curvo
    g.save(); g.globalAlpha *= 0.25; g.fillStyle = "#ffffff";
    g.beginPath();
    g.moveTo(x + 6.5, vTop + 3);
    g.quadraticCurveTo(Rmax - 1.5, top + H * 0.74, x + 7.5, top + H - 2);
    g.quadraticCurveTo(x + 5.8, top + H * 0.74, x + 5.5, vTop + 4);
    g.closePath(); g.fill();
    g.restore();
    // ---- DETALHES por traje (a identidade de cada um) ----
    const beltY = top + H * 0.82;
    if (look.robe === "royal" || look.robe === "purple") {
      // realeza: debrum dourado na gola + fechos + faixa com fivela
      g.strokeStyle = rc2.trim ?? "#ffd989"; g.lineWidth = 1.4; g.lineCap = "round";
      g.beginPath(); g.moveTo(L - 1, vTop + 1.6); g.quadraticCurveTo(x + 1, vTop - 1.9, Rmax + 2, vTop + 1.6); g.stroke();
      // carreira de fechos centrais
      g.fillStyle = rc2.trim ?? "#ffd989";
      for (let b2 = 0; b2 < 3; b2++) { g.beginPath(); g.arc(x + 1, vTop + 3 + b2 * 2.8, 1.1, 0, TAU); g.fill(); }
      // faixa da cintura + fivela
      g.fillStyle = "rgba(0,0,0,0.25)";
      rr(g, L - 2, beltY, W + 10, 3.4, 1.6); g.fill();
      g.fillStyle = rc2.trim ?? "#ffd989";
      rr(g, x - 1.5, beltY - 0.6, 5, 4.6, 1.4); g.fill();
      g.fillStyle = rc2.c1;
      rr(g, x - 0.2, beltY + 0.6, 2.4, 2.2, 0.8); g.fill();
      if (look.robe === "royal") {
        // gola de arminho (bolinhas brancas)
        g.fillStyle = "#f4f0e8";
        for (let e2 = -3; e2 <= 3; e2++) { g.beginPath(); g.arc(x + 1 + e2 * 4, vTop + 0.8 + Math.abs(e2) * 0.5, 2, 0, TAU); g.fill(); }
        g.fillStyle = "#3a3a44";
        for (const e2 of [-2, 0, 2]) { g.beginPath(); g.arc(x + 1 + e2 * 4, vTop + 1.4 + Math.abs(e2) * 0.4, 0.5, 0, TAU); g.fill(); }
      }
    } else if (look.robe === "prophet") {
      // manto de profeta: listras verticais + cinto de couro
      g.strokeStyle = "rgba(255,255,255,0.22)"; g.lineWidth = 2.4;
      for (const dx of [-8, -2.5, 3, 8.5]) {
        g.beginPath();
        g.moveTo(x + dx, vTop + 2);
        g.quadraticCurveTo(x + dx - 0.8, top + H * 0.8, x + dx + 0.6, top + H);
        g.stroke();
      }
      g.fillStyle = "#5d4a30";
      rr(g, L - 2, beltY, W + 10, 3, 1.4); g.fill();
      g.fillStyle = "#caa050";
      rr(g, x - 1, beltY + 0.4, 3.4, 2.2, 0.8); g.fill();
    } else if (look.robe === "pilgrim") {
      // peregrino: corda amarrada + remendo costurado
      g.strokeStyle = "#d9c8a0"; g.lineWidth = 2; g.lineCap = "round";
      g.beginPath(); g.moveTo(L - 2, beltY + 1); g.quadraticCurveTo(x, beltY + 2.6, Rmax + 2, beltY + 1); g.stroke();
      g.beginPath(); g.arc(x + 2.5, beltY + 2.6, 1.6, 0, TAU); g.stroke();
      g.beginPath(); g.moveTo(x + 2.5, beltY + 4); g.lineTo(x + 1.8, beltY + 8); g.stroke();
      g.beginPath(); g.moveTo(x + 3.2, beltY + 4); g.lineTo(x + 4.2, beltY + 7.4); g.stroke();
      // remendo
      g.fillStyle = "rgba(0,0,0,0.18)";
      rr(g, x - 8, top + H * 0.88, 6, 4.4, 1); g.fill();
      g.strokeStyle = "rgba(240,230,200,0.5)"; g.lineWidth = 0.6;
      g.setLineDash([1.4, 1.4]);
      rr(g, x - 8, top + H * 0.88, 6, 4.4, 1); g.stroke();
      g.setLineDash([]);
    } else if (look.robe === "sackcloth") {
      // saco: textura de juta + costuras rústicas
      g.strokeStyle = "rgba(0,0,0,0.14)"; g.lineWidth = 0.7;
      for (let yy = vTop + 3; yy < top + H - 2; yy += 3.4) {
        g.beginPath(); g.moveTo(L - 1, yy); g.quadraticCurveTo(x, yy + 1.2, Rmax + 2, yy); g.stroke();
      }
      g.strokeStyle = "rgba(240,230,200,0.4)"; g.lineWidth = 0.8;
      g.setLineDash([2, 2]);
      g.beginPath(); g.moveTo(x + 1, vTop + 1); g.lineTo(x + 1, top + H); g.stroke();
      g.setLineDash([]);
    } else if (look.robe === "wedding") {
      // bodas: faixa dourada transversal + brilhos no tecido
      g.strokeStyle = "#ffd989"; g.lineWidth = 3.2; g.lineCap = "round";
      g.beginPath(); g.moveTo(L - 1, vTop + 3); g.lineTo(Rmax + 1, top + H * 0.78); g.stroke();
      g.strokeStyle = "rgba(255,255,255,0.6)"; g.lineWidth = 1;
      g.beginPath(); g.moveTo(L - 1, vTop + 2.2); g.lineTo(Rmax + 1, top + H * 0.77); g.stroke();
      if (!reduce) {
        for (let sp = 0; sp < 5; sp++) {
          const spx = x - 8 + ((sp * 47 + Math.floor(t * 0.02)) % 20);
          const spy = vTop + 4 + ((sp * 31) % 12);
          if (((t * 0.003 + sp) % 3) < 0.5) {
            g.fillStyle = "#fff6d8";
            g.beginPath(); g.arc(spx, spy, 0.8, 0, TAU); g.fill();
          }
        }
      }
      glowCircle(g, x, top + H * 0.75, 24, "#fff6d8", 0.3);
    }
    g.restore();
  } else {
    // ---- crescente "D" luminoso na barriga (marca da referência) ----
    g.save();
    g.strokeStyle = pal.glow;
    g.lineWidth = 1.9; g.lineCap = "round";
    g.shadowColor = pal.glow; g.shadowBlur = 7;
    g.globalAlpha *= 0.8;
    g.beginPath();
    g.moveTo(x + 0.5, top + H * 0.52);
    g.bezierCurveTo(x + 8.5, top + H * 0.56, x + 8.5, top + H * 0.8, x + 0.5, top + H * 0.85);
    g.stroke();
    g.restore();
    // chama pequena dentro do crescente
    const fl = reduce ? 0 : Math.sin(t * 0.01) * 0.8;
    const emY = top + H * 0.685;
    glowCircle(g, x + 1.5, emY, 6, pal.glow, 0.5);
    g.fillStyle = pal.glow;
    g.beginPath();
    g.moveTo(x + 1.5, emY - 4 - fl);
    g.quadraticCurveTo(x + 4, emY - 0.5, x + 1.5, emY + 3.2);
    g.quadraticCurveTo(x - 1, emY - 0.5, x + 1.5, emY - 4 - fl);
    g.fill();
    g.fillStyle = "rgba(255,255,255,0.75)";
    g.beginPath();
    g.moveTo(x + 1.5, emY - 1.6 - fl * 0.5);
    g.quadraticCurveTo(x + 2.7, emY + 0.4, x + 1.5, emY + 2);
    g.quadraticCurveTo(x + 0.3, emY + 0.4, x + 1.5, emY - 1.6 - fl * 0.5);
    g.fill();
  }

  // ---- braços: tocos baixos e discretos (como na referência) ----
  const armY = top + H * 0.56;
  const armSwing = o.walking ? step * 2.6 : 0;
  const armGrd = g.createLinearGradient(x, armY, x, armY + 10);
  armGrd.addColorStop(0, mixHex(pal.top, pal.bot, 0.4));
  armGrd.addColorStop(1, pal.bot);
  g.fillStyle = armGrd;
  rr(g, L - 4.5, armY + armSwing, 6, 9.5, 3); g.fill();
  rr(g, Rmax - 2.5, armY - armSwing, 6, 9.5, 3); g.fill();
  g.fillStyle = "rgba(190,215,255,0.1)";
  rr(g, L - 3.8, armY + armSwing + 0.8, 4.5, 2, 1.4); g.fill();

  // ---- OLHOS naturais: fundo BRANCO + pupila PRETA (sem cílio/anel) ----
  const eyeY = top + 14;
  const eyeRx = 4.6, eyeRy = 5.6;
  const lookOff = face * 0.8; // olhar acompanha a direção
  for (const s of [-1, 1] as const) {
    const ex = x + s * 5.4;
    if (blink) {
      // olho fechado feliz (arquinho)
      g.strokeStyle = "rgba(20,22,30,0.85)"; g.lineWidth = 1.4; g.lineCap = "round";
      g.beginPath(); g.moveTo(ex - 3, eyeY); g.quadraticCurveTo(ex, eyeY + 2.2, ex + 3, eyeY); g.stroke();
    } else {
      // esclera branca com contorno bem suave
      g.fillStyle = "#ffffff";
      g.beginPath(); g.ellipse(ex, eyeY, eyeRx, eyeRy, 0, 0, TAU); g.fill();
      g.strokeStyle = "rgba(20,22,30,0.3)"; g.lineWidth = 0.9;
      g.beginPath(); g.ellipse(ex, eyeY, eyeRx, eyeRy, 0, 0, TAU); g.stroke();
      // pupila preta grande (segue o olhar)
      g.fillStyle = "#14161e";
      g.beginPath(); g.ellipse(ex + lookOff, eyeY + 0.6, 2.5, 3.1, 0, 0, TAU); g.fill();
      // brilhos
      g.fillStyle = "#ffffff";
      g.beginPath(); g.arc(ex + lookOff - 0.9, eyeY - 0.6, 0.95, 0, TAU); g.fill();
      g.save(); g.globalAlpha *= 0.6;
      g.beginPath(); g.arc(ex + lookOff + 0.9, eyeY + 1.8, 0.5, 0, TAU); g.fill();
      g.restore();
    }
  }

  // ---- sorriso feliz (aberto quando anda — dinâmico) ----
  g.save();
  const smileY = top + 26;
  if (o.walking && !reduce) {
    // sorrisinho aberto (meia-lua) — alegria em movimento
    g.fillStyle = "rgba(10,14,26,0.85)";
    g.beginPath();
    g.moveTo(x - 2.6, smileY - 0.6);
    g.quadraticCurveTo(x + 0.4, smileY + 2.8, x + 3.4, smileY - 0.6);
    g.quadraticCurveTo(x + 0.4, smileY + 0.8, x - 2.6, smileY - 0.6);
    g.closePath(); g.fill();
    g.strokeStyle = "rgba(150,190,255,0.5)"; g.lineWidth = 1;
    g.beginPath(); g.moveTo(x - 2.6, smileY - 0.4); g.quadraticCurveTo(x + 0.4, smileY + 3, x + 3.4, smileY - 0.4); g.stroke();
  } else {
    g.strokeStyle = "rgba(150,190,255,0.55)";
    g.lineWidth = 1.5; g.lineCap = "round";
    g.beginPath();
    g.moveTo(x - 2.4, smileY - 1);
    g.quadraticCurveTo(x + 0.4, smileY + 1, x + 3.2, smileY - 1);
    g.stroke();
    g.strokeStyle = "rgba(4,6,12,0.7)";
    g.lineWidth = 1;
    g.beginPath();
    g.moveTo(x - 2.2, smileY - 1.3);
    g.quadraticCurveTo(x + 0.4, smileY + 0.6, x + 3, smileY - 1.3);
    g.stroke();
  }
  g.restore();

  // ---- barba de ancião (loja) — queixinho fofo ----
  if (look.beard) {
    const bg2 = g.createLinearGradient(x, top + 27, x, top + 36);
    bg2.addColorStop(0, "#b9c2d4"); bg2.addColorStop(1, "#8a93a8");
    g.fillStyle = bg2;
    g.beginPath();
    g.moveTo(x - 5.5, top + 27.5);
    g.quadraticCurveTo(x - 6, top + 35, x + 0.5, top + 36.5);
    g.quadraticCurveTo(x + 7, top + 35, x + 6.5, top + 27.5);
    g.quadraticCurveTo(x + 0.5, top + 30.5, x - 5.5, top + 27.5);
    g.closePath(); g.fill();
    g.strokeStyle = "rgba(90,100,120,0.5)"; g.lineWidth = 0.7;
    for (const dx of [-3, 0, 3]) {
      g.beginPath(); g.moveTo(x + dx + 0.5, top + 30); g.quadraticCurveTo(x + dx, top + 33, x + dx + 0.7, top + 35); g.stroke();
    }
  }

  // ============================================================
  // ACESSÓRIOS DE CABEÇA — proporcionais e assentados NO topo do D
  // (o topo vai de L+7 a ~x+7; centro visual da "cabeça" = x)
  // ============================================================
  const headCx = x + 0.5;
  if (look.head === "fire") {
    // chama AZUL em camadas, menor e sentada na borda
    const fh = reduce ? 0 : Math.sin(t * 0.012) * 1.8;
    const fw = reduce ? 0 : Math.sin(t * 0.021 + 1) * 1.1;
    const fx0 = headCx, fy0 = top + 0.6;
    glowCircle(g, fx0, fy0 - 6, 13, "#3f8cff", 0.5);
    const flame = g.createLinearGradient(fx0, fy0 - 15 - fh, fx0, fy0 + 1.5);
    flame.addColorStop(0, "#7cc0ff"); flame.addColorStop(0.55, "#2f7ae8"); flame.addColorStop(1, "#1c46a8");
    g.fillStyle = flame;
    g.beginPath();
    g.moveTo(fx0, fy0 - 14.5 - fh);
    g.bezierCurveTo(fx0 + 4 + fw, fy0 - 9, fx0 + 5.4, fy0 - 4.5, fx0 + 3.4, fy0 - 1);
    g.quadraticCurveTo(fx0 + 1.5, fy0 + 1.2, fx0, fy0 + 1.2);
    g.quadraticCurveTo(fx0 - 1.5, fy0 + 1.2, fx0 - 3.4, fy0 - 1);
    g.bezierCurveTo(fx0 - 5.4, fy0 - 4.5, fx0 - 4 + fw, fy0 - 9, fx0, fy0 - 14.5 - fh);
    g.fill();
    const inner = g.createLinearGradient(fx0, fy0 - 9 - fh * 0.6, fx0, fy0 + 0.8);
    inner.addColorStop(0, "#bfe0ff"); inner.addColorStop(1, "#4a9aff");
    g.fillStyle = inner;
    g.beginPath();
    g.moveTo(fx0, fy0 - 8.6 - fh * 0.6);
    g.quadraticCurveTo(fx0 + 2.6 - fw * 0.5, fy0 - 3.4, fx0, fy0 + 0.5);
    g.quadraticCurveTo(fx0 - 2.6 - fw * 0.5, fy0 - 3.4, fx0, fy0 - 8.6 - fh * 0.6);
    g.fill();
    g.fillStyle = "#eaf6ff";
    g.beginPath();
    g.moveTo(fx0, fy0 - 4.4 - fh * 0.35);
    g.quadraticCurveTo(fx0 + 1.3, fy0 - 1.8, fx0, fy0);
    g.quadraticCurveTo(fx0 - 1.3, fy0 - 1.8, fx0, fy0 - 4.4 - fh * 0.35);
    g.fill();
  } else if (look.head === "crown") {
    // coroa VESTIDA: o aro envolve a cabeça de lado a lado (desce até logo
    // acima dos olhos) + pontas com pérolas subindo do aro
    const bandBot = top + 6.5, bandTop = top + 1.6;
    const gold = g.createLinearGradient(headCx, top - 6, headCx, bandBot);
    gold.addColorStop(0, "#ffe4a0"); gold.addColorStop(0.5, "#e8b04b"); gold.addColorStop(1, "#b07c2b");
    // pontas (atrás do aro)
    g.fillStyle = gold;
    for (const dx of [-11, -5.5, 0, 5.5, 10.5]) {
      const px2 = headCx + dx;
      g.beginPath();
      g.moveTo(px2 - 2, bandTop + 1.6);
      g.lineTo(px2, bandTop - 4.8);
      g.lineTo(px2 + 2, bandTop + 1.6);
      g.closePath(); g.fill();
      // pérola na ponta
      g.fillStyle = "#fff6e0";
      g.beginPath(); g.arc(px2, bandTop - 5, 0.9, 0, TAU); g.fill();
      g.fillStyle = gold;
    }
    // aro cobrindo o topo da cabeça (largura total do D)
    g.beginPath();
    g.moveTo(L - 1, bandBot + 0.6);
    g.quadraticCurveTo(headCx, bandBot - 2.2, x + 12, bandBot + 0.6);
    g.lineTo(x + 11.6, bandTop + 0.4);
    g.quadraticCurveTo(headCx, bandTop - 2.2, L - 0.6, bandTop + 0.4);
    g.closePath(); g.fill();
    // sombra de assentamento sob o aro (a coroa "pesa" na cabeça)
    g.strokeStyle = "rgba(0,0,0,0.28)"; g.lineWidth = 1.3; g.lineCap = "round";
    g.beginPath();
    g.moveTo(L - 0.2, bandBot + 1.4);
    g.quadraticCurveTo(headCx, bandBot - 1.2, x + 11.4, bandBot + 1.4);
    g.stroke();
    // joias do aro
    g.fillStyle = "#e8455a";
    g.beginPath(); g.arc(headCx, top + 3.2, 1.2, 0, TAU); g.fill();
    g.fillStyle = "#3f8cff";
    g.beginPath(); g.arc(headCx - 6, top + 3.6, 0.85, 0, TAU); g.fill();
    g.beginPath(); g.arc(headCx + 6, top + 3.6, 0.85, 0, TAU); g.fill();
    // brilho do ouro
    g.fillStyle = "rgba(255,255,255,0.5)";
    rr(g, L + 1.5, bandTop + 1, 4.6, 0.9, 0.5); g.fill();
  } else if (look.head === "helmet") {
    // capacete da salvação VESTIDO: cobre o topo até logo acima dos olhos,
    // faixa de testa com rebites + crista (nada de panela)
    const helBot = top + 7;
    const met = g.createLinearGradient(headCx, top - 7, headCx, helBot);
    met.addColorStop(0, "#e6ecf6"); met.addColorStop(0.55, "#a8b4c6"); met.addColorStop(1, "#77839a");
    g.fillStyle = met;
    g.beginPath();
    g.moveTo(L - 1.5, helBot + 0.8);
    g.quadraticCurveTo(headCx, helBot - 2, x + 12.2, helBot + 0.8);   // borda logo acima dos olhos
    g.quadraticCurveTo(x + 12.6, top - 3.4, x + 6.5, top - 6);        // lateral direita → domo
    g.quadraticCurveTo(headCx, top - 7.6, L + 3.5, top - 5);
    g.quadraticCurveTo(L - 2, top - 2.4, L - 1.5, helBot + 0.8);      // lateral esquerda
    g.closePath(); g.fill();
    // faixa da testa (acompanha a borda) com rebites
    g.fillStyle = "#68748a";
    g.beginPath();
    g.moveTo(L - 1.5, helBot + 0.8);
    g.quadraticCurveTo(headCx, helBot - 2, x + 12.2, helBot + 0.8);
    g.lineTo(x + 11.8, helBot - 1.8);
    g.quadraticCurveTo(headCx, helBot - 4.6, L - 1.1, helBot - 1.8);
    g.closePath(); g.fill();
    g.fillStyle = "#dfe6f0";
    for (const dx of [-12, -6, 0, 6, 10.5]) {
      g.beginPath(); g.arc(headCx + dx, helBot - 1.9 + Math.abs(dx) * 0.09, 0.55, 0, TAU); g.fill();
    }
    // sombra de assentamento sob a borda
    g.strokeStyle = "rgba(0,0,0,0.28)"; g.lineWidth = 1.3; g.lineCap = "round";
    g.beginPath();
    g.moveTo(L - 0.6, helBot + 1.6);
    g.quadraticCurveTo(headCx, helBot - 0.9, x + 11.6, helBot + 1.6);
    g.stroke();
    // crista (pluma) dourada-rubra
    const crest = g.createLinearGradient(headCx, top - 13.5, headCx, top - 5);
    crest.addColorStop(0, "#e8455a"); crest.addColorStop(1, "#a8202e");
    g.fillStyle = crest;
    g.beginPath();
    g.moveTo(headCx - 5.4, top - 5.8);
    g.quadraticCurveTo(headCx, top - 13.4, headCx + 5.4, top - 5.8);
    g.quadraticCurveTo(headCx, top - 8.8, headCx - 5.4, top - 5.8);
    g.closePath(); g.fill();
    g.strokeStyle = "rgba(255,220,220,0.4)"; g.lineWidth = 0.6;
    for (const dx of [-3, 0, 3]) { g.beginPath(); g.moveTo(headCx + dx, top - 6.2); g.quadraticCurveTo(headCx + dx * 0.6, top - 9.7, headCx + dx * 0.4, top - 11); g.stroke(); }
    // brilho do metal
    g.fillStyle = "rgba(255,255,255,0.4)";
    g.beginPath(); g.ellipse(headCx - 6, top - 2.2, 3.6, 1.3, -0.45, 0, TAU); g.fill();
  } else if (look.head === "cap") {
    // boné VESTIDO na cabeça: cobre o topo do D até logo acima dos olhos,
    // de lado a lado — nunca parece "atrás" da cabeça
    const capBot = top + 7.2;
    const capC = g.createLinearGradient(headCx, top - 7, headCx, capBot);
    capC.addColorStop(0, "#5586d6"); capC.addColorStop(0.6, "#3a62b0"); capC.addColorStop(1, "#274a8c");
    g.fillStyle = capC;
    g.beginPath();
    g.moveTo(L - 1.5, capBot + 1);                                     // lateral esquerda
    g.quadraticCurveTo(headCx - 6, capBot - 1.6, headCx + 5, capBot - 1.2); // borda frontal (leve arco)
    g.quadraticCurveTo(x + 10.5, capBot - 1, x + 12.2, capBot + 0.6);  // lateral direita
    g.quadraticCurveTo(x + 12.8, top - 2.6, x + 7.5, top - 5.6);       // sobe pro domo
    g.quadraticCurveTo(headCx + 1.5, top - 7.6, L + 3, top - 4.8);
    g.quadraticCurveTo(L - 2.2, top - 1.8, L - 1.5, capBot + 1);
    g.closePath(); g.fill();
    // costuras (gomos) do domo até a borda
    g.strokeStyle = "rgba(255,255,255,0.28)"; g.lineWidth = 0.8;
    g.beginPath(); g.moveTo(headCx + 1, top - 7.2); g.quadraticCurveTo(headCx - 0.2, top, headCx - 0.8, capBot - 1.6); g.stroke();
    g.beginPath(); g.moveTo(L + 4, top - 4.4); g.quadraticCurveTo(L + 4.6, top, L + 4.2, capBot - 0.6); g.stroke();
    g.beginPath(); g.moveTo(x + 6.6, top - 4.8); g.quadraticCurveTo(x + 7.6, top, x + 8.6, capBot - 0.8); g.stroke();
    // sombra da borda sobre a "testa" (o boné assenta de verdade)
    g.strokeStyle = "rgba(0,0,0,0.3)"; g.lineWidth = 1.5; g.lineCap = "round";
    g.beginPath();
    g.moveTo(L - 0.2, capBot + 1.2);
    g.quadraticCurveTo(headCx - 6, capBot - 0.2, headCx + 5, capBot + 0.2);
    g.quadraticCurveTo(x + 10.5, capBot + 0.4, x + 11.8, capBot + 1.4);
    g.stroke();
    // aba saindo de BAIXO da borda, na direção do olhar
    const visor = g.createLinearGradient(x + 10, capBot - 2, x + 20, capBot);
    visor.addColorStop(0, "#223a6a"); visor.addColorStop(1, "#31509a");
    g.fillStyle = visor;
    g.beginPath();
    g.moveTo(x + 9.4, capBot - 3.4);
    g.quadraticCurveTo(x + 18.5, capBot - 3.6, x + 20, capBot - 0.4);
    g.quadraticCurveTo(x + 15, capBot + 1.8, x + 10, capBot - 0.4);
    g.closePath(); g.fill();
    g.strokeStyle = "rgba(255,255,255,0.2)"; g.lineWidth = 0.7;
    g.beginPath(); g.moveTo(x + 10.4, capBot - 2.4); g.quadraticCurveTo(x + 15.6, capBot - 2.6, x + 18.6, capBot - 0.8); g.stroke();
    // botão
    g.fillStyle = "#ffd889";
    g.beginPath(); g.arc(headCx + 1, top - 6.6, 1.1, 0, TAU); g.fill();
  } else if (look.head === "hat") {
    // chapéu de peregrino VESTIDO: aba larga na altura da testa
    // (logo acima dos olhos) + copa cobrindo o topo da cabeça
    const brimY = top + 5.2;
    const hatC = g.createLinearGradient(headCx, top - 11, headCx, brimY + 3.5);
    hatC.addColorStop(0, "#8a6a44"); hatC.addColorStop(1, "#5d4a30");
    g.fillStyle = hatC;
    g.beginPath(); g.ellipse(headCx - 1, brimY, 15.5, 3.4, 0, 0, TAU); g.fill();   // aba larga
    // copa
    g.beginPath();
    g.moveTo(headCx - 8.5, brimY);
    g.quadraticCurveTo(headCx - 8, top - 8.6, headCx, top - 9);
    g.quadraticCurveTo(headCx + 8, top - 8.6, headCx + 8.5, brimY);
    g.closePath(); g.fill();
    // fita
    g.fillStyle = "#caa050";
    rr(g, headCx - 8.2, brimY - 4.4, 16.4, 2.2, 1); g.fill();
    // sombra da aba sobre o rosto (assentado)
    g.strokeStyle = "rgba(0,0,0,0.25)"; g.lineWidth = 1.3;
    g.beginPath(); g.ellipse(headCx - 1, brimY + 0.7, 14.6, 3, 0, 0.15, Math.PI - 0.15); g.stroke();
    // brilho
    g.fillStyle = "rgba(255,255,255,0.2)";
    g.beginPath(); g.ellipse(headCx - 3.4, top - 6.4, 2.8, 1.1, -0.4, 0, TAU); g.fill();
  }

  // ---- óculos (armação fina apoiada nos dois olhões) ----
  if (look.glasses) {
    g.save();
    g.strokeStyle = "rgba(24,28,40,0.95)"; g.lineWidth = 1.2;
    for (const s of [-1, 1] as const) {
      g.beginPath(); g.ellipse(x + s * 5.5, eyeY, eyeRx + 1.5, eyeRy + 1.2, 0, 0, TAU); g.stroke();
    }
    g.beginPath(); g.moveTo(x - 0.3, eyeY - 1.4); g.quadraticCurveTo(x, eyeY - 2.4, x + 0.3, eyeY - 1.4); g.stroke();
    // reflexo das lentes
    g.strokeStyle = "rgba(255,255,255,0.35)"; g.lineWidth = 0.8;
    g.beginPath(); g.moveTo(x - 8.4, eyeY - 3); g.lineTo(x - 5.4, eyeY + 2.4); g.stroke();
    g.restore();
  }

  // ============================================================
  // EQUIPAMENTO DE MÃO — escudo (esq), espada/arma (dir), proporcionais
  // ============================================================
  const armYq = top + H * 0.56;
  if (look.shield) {
    // escudo da fé: redondo, aro dourado, emblema de chama
    const scx = L - 5, scy = armYq + 4;
    const sg = g.createRadialGradient(scx - 1.5, scy - 1.5, 1, scx, scy, 7);
    sg.addColorStop(0, "#8a5a34"); sg.addColorStop(1, "#5d3a20");
    g.fillStyle = sg;
    g.beginPath(); g.arc(scx, scy, 6.5, 0, TAU); g.fill();
    g.strokeStyle = "#e8b04b"; g.lineWidth = 1.4;
    g.beginPath(); g.arc(scx, scy, 6.5, 0, TAU); g.stroke();
    g.fillStyle = "#ffd889";
    g.beginPath();
    g.moveTo(scx, scy - 3.4);
    g.quadraticCurveTo(scx + 2.2, scy, scx, scy + 3);
    g.quadraticCurveTo(scx - 2.2, scy, scx, scy - 3.4);
    g.fill();
    g.fillStyle = "rgba(255,255,255,0.25)";
    g.beginPath(); g.ellipse(scx - 2, scy - 2.6, 2.2, 1, -0.5, 0, TAU); g.fill();
  }
  if (look.sword) {
    // espada do Espírito na mão direita: lâmina com fio de luz + guarda dourada
    const swx = Rmax + 1.5, swy = armYq + 3;
    g.save();
    g.translate(swx, swy); g.rotate(-0.32 + (o.walking && !reduce ? step * 0.08 : 0));
    const blade = g.createLinearGradient(-1.4, 0, 1.4, 0);
    blade.addColorStop(0, "#9aa6b8"); blade.addColorStop(0.5, "#eef3fa"); blade.addColorStop(1, "#9aa6b8");
    g.fillStyle = blade;
    g.beginPath();
    g.moveTo(-1.4, 0); g.lineTo(-1, -14.5); g.lineTo(0, -17); g.lineTo(1, -14.5); g.lineTo(1.4, 0);
    g.closePath(); g.fill();
    g.strokeStyle = "rgba(255,255,255,0.7)"; g.lineWidth = 0.5;
    g.beginPath(); g.moveTo(0, -1); g.lineTo(0, -15.4); g.stroke();
    // guarda + punho + pomo
    g.fillStyle = "#e8b04b"; rr(g, -3.4, -0.6, 6.8, 1.7, 0.8); g.fill();
    g.fillStyle = "#5d3a20"; rr(g, -1, 1, 2, 4.4, 1); g.fill();
    g.fillStyle = "#ffd889"; g.beginPath(); g.arc(0, 6, 1.2, 0, TAU); g.fill();
    g.restore();
  }
  if (look.weapon && look.weapon !== "none" && !look.sword) {
    // arma da loja na mão direita, proporcional
    const wx = Rmax + 1.5, wy = armYq + 4;
    g.save();
    g.translate(wx, wy);
    if (look.weapon === "staff") {
      g.strokeStyle = "#8a6a44"; g.lineWidth = 2; g.lineCap = "round";
      g.beginPath(); g.moveTo(0, 7); g.lineTo(0, -13); g.quadraticCurveTo(0.4, -17.4, 4, -16.6); g.stroke();
    } else if (look.weapon === "torch") {
      g.strokeStyle = "#6d5334"; g.lineWidth = 2; g.lineCap = "round";
      g.beginPath(); g.moveTo(0, 6); g.lineTo(0, -8); g.stroke();
      glowCircle(g, 0, -11, 8, "#ffb14a", 0.6);
      const tf = g.createLinearGradient(0, -16, 0, -7);
      tf.addColorStop(0, "#ffe9b0"); tf.addColorStop(1, "#e8622e");
      g.fillStyle = tf;
      g.beginPath();
      g.moveTo(0, -15.5 - (reduce ? 0 : Math.sin(t * 0.012) * 1.4));
      g.quadraticCurveTo(3, -10, 0, -7);
      g.quadraticCurveTo(-3, -10, 0, -15.5 - (reduce ? 0 : Math.sin(t * 0.012) * 1.4));
      g.fill();
    } else if (look.weapon === "shofar") {
      const sh = g.createLinearGradient(-2, 0, 8, -12);
      sh.addColorStop(0, "#d9c8a0"); sh.addColorStop(1, "#8a744e");
      g.strokeStyle = sh as unknown as string; g.lineWidth = 3; g.lineCap = "round";
      g.beginPath(); g.moveTo(-1, 2); g.quadraticCurveTo(6, -2, 7.5, -10); g.stroke();
      g.strokeStyle = "#6d5c3a"; g.lineWidth = 1;
      g.beginPath(); g.moveTo(0.4, 0.6); g.quadraticCurveTo(5.5, -3, 6.6, -9); g.stroke();
    } else if (look.weapon === "spear") {
      g.strokeStyle = "#8a6a44"; g.lineWidth = 1.7; g.lineCap = "round";
      g.beginPath(); g.moveTo(0, 8); g.lineTo(0, -14); g.stroke();
      g.fillStyle = "#c7d0dc";
      g.beginPath(); g.moveTo(0, -19); g.lineTo(2.2, -13.6); g.lineTo(-2.2, -13.6); g.closePath(); g.fill();
    } else if (look.weapon === "sling") {
      g.strokeStyle = "#8a6a44"; g.lineWidth = 1.2; g.lineCap = "round";
      g.beginPath(); g.moveTo(0, 4); g.quadraticCurveTo(-3, -2, -1, -7); g.stroke();
      g.beginPath(); g.moveTo(0, 4); g.quadraticCurveTo(3.4, -1, 2.4, -6.4); g.stroke();
      g.fillStyle = "#8d8474";
      g.beginPath(); g.ellipse(0.6, -7.4, 2.4, 1.7, 0.3, 0, TAU); g.fill();
    } else if (look.weapon === "harp") {
      g.strokeStyle = "#caa050"; g.lineWidth = 1.8; g.lineCap = "round";
      g.beginPath(); g.moveTo(-2, 4); g.quadraticCurveTo(-5, -4, -1, -9); g.stroke();
      g.beginPath(); g.moveTo(2.6, 3); g.quadraticCurveTo(5.4, -3.4, 2, -8.4); g.stroke();
      g.strokeStyle = "rgba(255,240,200,0.8)"; g.lineWidth = 0.5;
      for (let i2 = 0; i2 < 4; i2++) {
        g.beginPath(); g.moveTo(-2.4 + i2 * 1.5, 2.6 - i2 * 0.4); g.lineTo(-1 + i2 * 1.1, -8.2 + i2 * 0.4); g.stroke();
      }
    }
    g.restore();
  }

  // ---- montaria (camada da FRENTE — parede da carruagem cobre as pernas) ----
  if (lift > 0 && look.mount) drawMountHD(g, x, fy, look.mount, t, !!o.walking, reduce, "front");

  g.restore();
}
