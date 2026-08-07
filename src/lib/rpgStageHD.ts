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

// hash determinístico (0..1) — variação estável por índice SEM alocar nada
// por quadro (nada de arrays/objetos dentro dos laços de desenho).
const hsh = (a: number, b: number): number => {
  let h = (a * 374761393 + b * 668265263) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
};

/** aglomerado de bolhas de nuvem em UM único path (fill/união sem costura). */
const cloudPuffPath = (g: G, cx: number, cy: number, w: number, h: number) => {
  g.beginPath();
  g.ellipse(cx - w * 0.34, cy + h * 0.14, w * 0.30, h * 0.50, 0, 0, TAU);
  g.ellipse(cx - w * 0.02, cy - h * 0.20, w * 0.36, h * 0.78, 0, 0, TAU);
  g.ellipse(cx + w * 0.30, cy + h * 0.04, w * 0.29, h * 0.56, 0, 0, TAU);
  g.ellipse(cx + w * 0.58, cy + h * 0.22, w * 0.20, h * 0.36, 0, 0, TAU);
  g.ellipse(cx, cy + h * 0.36, w * 0.62, h * 0.34, 0, 0, TAU);
};

/** Quanto um detalhe vegetal já "cresceu" (0 = ausente, 1 = pleno).
 *  Cada índice tem seu próprio limiar, então a relva NASCE aos poucos
 *  conforme `env.verdure` sobe — nunca aparece tudo de uma vez. */
const growK = (verd: number, i: number, thr: number): number =>
  clamp01((verd - thr - hsh(i, 7) * 0.26) / 0.2);

/** Névoa/sopro luminoso: elipse com queda radial suave (sem figura alguma). */
const mistBand = (g: G, x: number, y: number, rx: number, ry: number, color: string, alpha: number) => {
  if (alpha <= 0.004 || rx <= 0.5) return;
  g.save();
  g.globalAlpha = Math.min(1, alpha);
  g.translate(x, y);
  g.scale(1, Math.max(0.02, ry / rx));
  const grd = g.createRadialGradient(0, 0, rx * 0.05, 0, 0, rx);
  grd.addColorStop(0, color);
  grd.addColorStop(0.55, color);
  grd.addColorStop(1, "rgba(0,0,0,0)");
  g.fillStyle = grd;
  g.beginPath(); g.arc(0, 0, rx, 0, TAU); g.fill();
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
  // — céus dos terrenos do AT (Gênesis em diante) —
  garden: { day: ["#2f6a8a", "#6aa38a", "#d9e0a0"], night: ["#08141a", "#12281f", "#28402e"], glory: ["#3a7a70", "#8ec49a", "#fff0c0"] },
  desert: { day: ["#3f5c92", "#8f9cae", "#e8cf98"], night: ["#0b0f24", "#1e2340", "#3c3654"], glory: ["#4c548e", "#a89ab0", "#ffe8ac"] },
  mountain: { day: ["#37496e", "#7284a0", "#cfc4a2"], night: ["#080d1e", "#141c34", "#2e3448"], glory: ["#404e86", "#8e8cb0", "#ffedb4"] },
  patmos: { day: ["#3f5d95", "#7d95bd", "#d9c193"], night: ["#0a1126", "#1a2547", "#333a63"], glory: ["#463c86", "#a084b8", "#ffe6a8"] },
  city: { day: ["#40507e", "#7c88ab", "#d9c8a0"], night: ["#0b0f26", "#1c2242", "#3b3a60"], glory: ["#4a4488", "#9484b4", "#ffe9b0"] },
  glory: { day: ["#4a3a80", "#a583b8", "#ffedb8"], night: ["#170e30", "#302050", "#5c4478"], glory: ["#6a4a9e", "#c495c4", "#fff3cc"] },
  field: { day: ["#3a5c92", "#7d9cbd", "#d9d0a4"], night: ["#091023", "#16203c", "#333a58"], glory: ["#44508e", "#9291bc", "#fff0b8"] },
  throne: { day: ["#2c1c50", "#6a4488", "#eab77e"], night: ["#100a26", "#241648", "#4c3068"], glory: ["#3c2a70", "#8a58a0", "#ffe0a0"] },
  // TREVAS SOBRE A FACE DO ABISMO (Gn 1:2): sem sol, sem estrelas — só água
  // escura. A "glória" aqui é a luz sendo criada em Gn 1:3.
  abyss: { day: ["#050a12", "#08111d", "#0c1826"], night: ["#010306", "#03080e", "#060d16"], glory: ["#122340", "#1e3558", "#456f9e"] },
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

// ============================================================================
// O ABISMO (Gn 1:2) — "a terra era sem forma e vazia; e havia trevas sobre a
// face do abismo; e o Espírito de Deus se movia sobre a face das águas."
//
// NADA que ainda não foi criado aparece aqui: sem chão, sem morros, sem
// estrelas, sem sol, sem vegetação, sem criaturas. Só treva, a FACE DAS ÁGUAS
// e o sopro luminoso de Deus movendo-se sobre ela.
//
// Este é o PRIMEIRO palco do jogo e nele caminham VÁRIOS jogadores ao mesmo
// tempo, então a cena precisa dizer o tempo todo onde é longe e onde é perto:
//   • as ondas não são linhas retas: são ARCOS CONCÊNTRICOS em torno de quem
//     olha — largos, curvos e muito espaçados na frente; apertados, quase
//     retos e sem contraste ao se aproximarem do horizonte;
//   • o horizonte é uma ZONA de névoa (não uma linha dura) que acende quando
//     `glory` sobe ("haja luz") e revela a imensidão da água;
//   • camadas de névoa deslizam em velocidades diferentes (parallax) entre o
//     horizonte e a frente, apagando o que está longe;
//   • a faixa andável (GROUND..BOT) recebe ondulações concêntricas finas e
//     brilho especular, para os pés POUSAREM sobre a água em vez de flutuar.
// Tudo sai dos mesmos parâmetros: `night` sufoca, `glory` acende.
// ============================================================================

/** Curvatura da face das águas (quanto o mundo "abre" para os lados). */
const ABYSS_KX = 1.32;

/** Fator de perspectiva no eixo horizontal: 1 no eixo do olhar, menor nas
 *  bordas. Uma linha de onda é, na verdade, um CÍRCULO em volta do observador:
 *  nas bordas da tela esse círculo está mais LONGE, então sobe em direção ao
 *  horizonte. É isto que transforma listras horizontais em profundidade. */
const abyssPersp = (u: number): number => 1 / Math.sqrt(1 + ABYSS_KX * ABYSS_KX * u * u);

function drawAbyssHD(g: G, dims: StageDims, t: number, reduce: boolean, env: StageEnv): void {
  const { W, H, GROUND } = dims;
  const BOT = dims.BOT ?? (H - 18);
  const night = clamp01(env.night);
  const glory = clamp01(env.glory);
  const lum = clamp01(glory * (1 - night * 0.3));   // luz efetiva sobre as águas
  const gloom = 0.2 + night * 0.5;                  // treva sobre tudo
  const cx = W * 0.5;
  const halfW = W * 0.5 + 1;
  const horY = Math.round(GROUND * 0.42);           // face do abismo ao longe
  const span = Math.max(40, H - horY);
  const bandH = Math.max(20, BOT - GROUND);
  // eixo do SOPRO (Espírito sobre as águas): atravessa a cena em diagonal e
  // é calculado antes porque a superfície ACENDE por onde Ele passa.
  const pres = Math.pow(glory, 0.42);            // presente já no menor sopro
  const cyc = W * 2.2;
  const drift = reduce ? 0.46 : ((t * 0.019 + cyc * 0.42) % cyc) / cyc;
  const vNear = -W * 0.28 + drift * (W * 1.56);  // a frente do sopro
  const vFar = vNear + W * 0.4;                  // ele cruza em diagonal
  const vHalf = W * 0.04;                        // meia-largura ao longe
  const vGrow = W * 0.33;                        // …e na frente

  // ---- paleta: azuis de petróleo, NUNCA preto puro (calculada uma vez) ----
  const cVoidTop = mixHex(mixHex("#070e1b", "#000000", gloom + 0.22), "#17253f", lum * 0.34);
  const cVoidMid = mixHex(mixHex("#0b1526", "#000205", gloom + 0.06), "#243a60", lum * 0.4);
  const cVoidLow = mixHex(mixHex("#16304a", "#02070f", gloom), "#ffdcaa", lum * 0.46);
  const cSeaHor = mixHex(mixHex("#1d3e5b", "#04090f", gloom + 0.02), "#ffdfae", lum * 0.5);
  const cSeaFar = mixHex(mixHex("#0e2c43", "#01060a", gloom + 0.1), "#2c7ea0", lum * 0.4);
  const cSeaMid = mixHex(mixHex("#08202f", "#00040a", gloom + 0.14), "#14607f", lum * 0.36);
  const cSeaNear = mixHex(mixHex("#0b3040", "#010810", gloom + 0.02), "#186a86", lum * 0.44);
  const cTrough = mixHex(mixHex("#03101d", "#000000", gloom + 0.05), "#0f3a52", lum * 0.45);
  const cCrest = mixHex(mixHex("#4a93b2", "#0b2634", gloom), "#ffeec8", lum * 0.5);
  const cSpec = mixHex(mixHex("#bfe6fb", "#26576f", gloom * 0.8), "#fff4dc", lum);
  const cHaze = mixHex(mixHex("#6f9dbe", "#122a44", gloom * 0.9), "#ffe4bc", lum * 0.85);
  const cMurk = mixHex("#05121e", "#0a2438", lum * 0.5);   // sombra na água

  // ---- 1. A TREVA sobre o abismo (não há céu ainda: é o vazio) ----
  const voidG = g.createLinearGradient(0, 0, 0, horY + 3);
  voidG.addColorStop(0, cVoidTop);
  voidG.addColorStop(0.58, cVoidMid);
  voidG.addColorStop(1, cVoidLow);
  g.fillStyle = voidG;
  g.fillRect(0, 0, W, horY + 3);

  // ---- 2. A FACE DAS ÁGUAS: corpo de água profunda até a borda de baixo ----
  const seaG = g.createLinearGradient(0, horY, 0, H);
  seaG.addColorStop(0, cSeaHor);
  seaG.addColorStop(0.1, cSeaFar);
  seaG.addColorStop(0.42, cSeaMid);
  seaG.addColorStop(1, cSeaNear);
  g.fillStyle = seaG;
  g.fillRect(0, horY, W, H - horY + 2);

  // nuvens de treva no vazio (só variação de tom — nada figurativo)
  if (!reduce || true) {
    g.save();
    for (let c = 0; c < 3; c++) {
      const jc = hsh(c, 907);
      const cyv = horY * (0.16 + c * 0.3);
      const cwv = W * (0.5 + jc * 0.6);
      const cyc2 = W + cwv * 2;
      const cxv = reduce ? cx + (jc - 0.5) * W : ((t * (0.006 + c * 0.005) + jc * cyc2) % cyc2) - cwv;
      mistBand(g, cxv, cyv, cwv * 0.5, horY * 0.2, mixHex("#0d1c30", "#2c3d5e", lum * 0.7), (0.1 + jc * 0.12) * (0.4 + lum * 0.8));
      mistBand(g, cxv - cyc2, cyv, cwv * 0.5, horY * 0.2, mixHex("#0d1c30", "#2c3d5e", lum * 0.7), (0.1 + jc * 0.12) * (0.4 + lum * 0.8));
    }
    g.restore();
  }

  // ---- 3. HORIZONTE: zona de névoa/brilho difuso, jamais uma linha dura ----
  const fogTop = horY - span * 0.2;
  const fogG = g.createLinearGradient(0, fogTop, 0, horY + span * 0.14);
  fogG.addColorStop(0, "rgba(0,0,0,0)");
  fogG.addColorStop(0.55, `rgba(${lum > 0.2 ? "255,236,200" : "150,182,206"},${0.05 + lum * 0.5})`);
  fogG.addColorStop(0.72, `rgba(${lum > 0.2 ? "255,226,178" : "126,160,188"},${0.035 + lum * 0.34})`);
  fogG.addColorStop(1, "rgba(0,0,0,0)");
  g.save();
  g.globalCompositeOperation = "lighter";
  g.fillStyle = fogG;
  g.fillRect(0, fogTop, W, span * 0.34 + 2);
  // "haja luz": o clarão nasce no horizonte e abre a imensidão da água
  if (lum > 0.01) {
    const fl = g.createRadialGradient(cx, horY, 2, cx, horY, Math.max(W * 0.68, span * 1.3));
    fl.addColorStop(0, `rgba(255,242,210,${0.44 * lum})`);
    fl.addColorStop(0.3, `rgba(255,212,150,${0.14 * lum})`);
    fl.addColorStop(1, "rgba(255,200,132,0)");
    g.fillStyle = fl;
    g.fillRect(0, 0, W, H);
  }
  g.restore();

  // ---- 4. ONDAS EM PERSPECTIVA: arcos concêntricos em volta de quem olha ----
  // (todas as cores acima; aqui dentro só números — zero alocação por quadro)
  const rows = reduce ? 16 : 32;
  g.save();
  g.lineCap = "round";
  g.lineJoin = "round";
  for (let r = 0; r < rows; r++) {
    const jt = hsh(r, 29);                       // jitter estável por linha
    const q = (r + 0.4 + jt * 0.45) / rows;
    const p = q * q * q;                         // perspectiva: juntas no fundo
    const dep = p * span;                        // altura da linha sobre o horizonte
    if (horY + dep > H + 12) continue;
    const amp = (0.2 + p * p * 4.1) * (0.72 + jt * 0.6);
    const wf = (0.076 - p * 0.064) * (0.8 + jt * 0.45);
    const sp = reduce ? 0 : t * (0.00035 + p * 0.0017) * (0.7 + jt * 0.7);
    const ph = r * 1.37 + jt * 6.2;
    const stp = Math.max(5, 11 - p * 5);
    // vale (sombra) primeiro; a crista vem por cima, como reflexo do alto
    for (let pass = 0; pass < 2; pass++) {
      if (pass === 0) {
        g.strokeStyle = cTrough;
        g.globalAlpha = (0.1 + p * 0.34) * (0.55 + jt * 0.8);
        g.lineWidth = 0.9 + p * 3.8;
      } else {
        g.strokeStyle = cCrest;
        g.globalAlpha = (0.075 + p * 0.2) * (0.5 + lum * 0.8) * (0.5 + jt * 0.9);
        g.lineWidth = 0.5 + p * 1.2;
      }
      const off = pass === 0 ? 1.1 + p * 3.6 : 0;
      g.beginPath();
      for (let x = -stp; x <= W + stp; x += stp) {
        const u = (x - cx) / halfW;
        const pr = abyssPersp(u);                // borda = mais longe = mais alto
        const wx = (x - cx) / pr;                // x "no mundo": comprime nas bordas
        const yy = horY + (dep + off) * pr
          + (Math.sin(wx * wf + sp + ph)
            + Math.sin(wx * wf * 2.6 - sp * 1.5 + ph * 0.7) * 0.32
            + Math.sin(wx * wf * 0.44 + sp * 0.5) * 0.6) * amp * pr;
        if (x <= -stp) g.moveTo(x, yy); else g.lineTo(x, yy);
      }
      g.stroke();
    }
    // franja de luz na borda de cima das ondas próximas: dá volume e escala
    if (p > 0.42) {
      g.strokeStyle = cSpec;
      g.globalAlpha = (p - 0.42) * 0.42 * (0.4 + lum * 0.9) * (0.4 + jt * 1.1);
      g.lineWidth = 0.45 + p * 0.7;
      g.beginPath();
      for (let x = -stp; x <= W + stp; x += stp) {
        const u = (x - cx) / halfW;
        const pr = abyssPersp(u);
        const wx = (x - cx) / pr;
        const yy = horY + (dep - 0.7 - p * 1.4) * pr
          + (Math.sin(wx * wf + sp + ph)
            + Math.sin(wx * wf * 2.6 - sp * 1.5 + ph * 0.7) * 0.32
            + Math.sin(wx * wf * 0.44 + sp * 0.5) * 0.6) * amp * pr;
        if (x <= -stp) g.moveTo(x, yy); else g.lineTo(x, yy);
      }
      g.stroke();
    }
  }
  g.restore();

  // ---- 5. CAMADAS DE ATMOSFERA: névoa em parallax entre horizonte e frente --
  // as mais distantes são mais claras e mais lentas — é o que apaga o fundo.
  g.save();
  // sombras de treva arrastando sobre a água (riqueza no escuro)
  for (let b = 0; b < 2; b++) {
    const jb = hsh(b, 311);
    const bp = 0.22 + b * 0.42;
    const bw = W * (0.7 + bp * 0.8);
    const cycB = W + bw * 2;
    const bx = reduce ? cx + (jb - 0.5) * W * 0.6 : ((t * (0.012 + bp * 0.02) + jb * cycB) % cycB) - bw;
    const ba = (0.2 + bp * 0.12) * (1 - lum * 0.55);
    mistBand(g, bx, horY + bp * span, bw * 0.5, span * (0.05 + bp * 0.1), cMurk, ba);
    mistBand(g, bx - cycB, horY + bp * span, bw * 0.5, span * (0.05 + bp * 0.1), cMurk, ba);
  }
  // névoa clara: quanto mais longe, mais apaga o que está atrás
  g.globalCompositeOperation = "lighter";
  for (let b = 0; b < 4; b++) {
    const jb = hsh(b, 71);
    const bp = 0.012 + b * b * 0.05 + b * 0.04;          // profundidade da faixa
    const by = horY + bp * span;
    const bw = W * (0.42 + bp * 1.1);
    const bh = span * (0.014 + bp * 0.07);
    const ba = (0.16 - bp * 0.125) * (0.34 + lum * 0.7) * (0.6 + jb * 0.7);
    const cycB = W + bw * 2;
    const spd = 0.004 + bp * 0.032;
    const bx = reduce ? cx + (jb - 0.5) * W * 0.5 : ((t * spd + jb * cycB) % cycB) - bw;
    mistBand(g, bx, by, bw * 0.5, bh, cHaze, ba);
    mistBand(g, bx - cycB, by, bw * 0.5, bh, cHaze, ba);   // faixa contínua
  }
  g.restore();

  // ---- 6. A FAIXA ANDÁVEL (GROUND..BOT): onde os pés pousam sobre a água ----
  // brilho especular do plano próximo — dá "tensão superficial" e ancora quem
  // caminha; quem estiver no fundo da faixa fica em ondas apertadas (longe),
  // quem estiver na frente, em ondas largas (perto).
  const shG = g.createLinearGradient(0, GROUND - bandH * 0.3, 0, H);
  shG.addColorStop(0, "rgba(0,0,0,0)");
  shG.addColorStop(0.42, `rgba(158,204,230,${0.05 + lum * 0.1})`);
  shG.addColorStop(1, `rgba(96,150,182,${0.022 + lum * 0.055})`);
  g.save();
  g.globalCompositeOperation = "lighter";
  g.fillStyle = shG;
  g.fillRect(0, GROUND - bandH * 0.3, W, H - GROUND + bandH * 0.3);
  // ondulações concêntricas FINAS (a pele da água sob os personagens)
  g.lineCap = "round";
  g.strokeStyle = cSpec;
  const ripples = reduce ? 5 : 10;
  for (let i = 0; i < ripples; i++) {
    const ji = hsh(i, 53);
    const rp = (i + 0.35 + ji * 0.5) / ripples;
    const dep = (GROUND - horY) + rp * rp * (H - GROUND + 6);
    const amp = (0.5 + rp * 3.2) * (0.7 + ji * 0.6);
    const wf = (0.062 - rp * 0.044) * (0.85 + ji * 0.4);
    const sp = reduce ? 0 : t * (0.0011 + rp * 0.0016) * (0.7 + ji * 0.6);
    const ph = i * 2.11 + ji * 5.7;
    g.globalAlpha = (0.06 + rp * 0.17) * (0.42 + lum * 1.0) * (0.6 + ji * 0.6);
    g.lineWidth = 0.45 + rp * 0.8;
    g.beginPath();
    for (let x = -10; x <= W + 10; x += 10) {
      const u = (x - cx) / halfW;
      const pr = abyssPersp(u);
      const wx = (x - cx) / pr;
      const yy = horY + dep * pr
        + (Math.sin(wx * wf + sp + ph) + Math.sin(wx * wf * 1.9 - sp * 1.3) * 0.4) * amp * pr;
      if (x <= -10) g.moveTo(x, yy); else g.lineTo(x, yy);
    }
    g.stroke();
  }
  // cintilância especular: fina ao longe, larga e rara na frente. Concentra-se
  // no eixo da luz quando `glory` sobe — o caminho de luz sobre o mar.
  if (!reduce || lum > 0.2) {
    g.fillStyle = cSpec;
    const gl = reduce ? 20 : 46;
    for (let i = 0; i < gl; i++) {
      const hi = hsh(i, 13), hj = hsh(i, 97), hk = hsh(i, 181);
      const p = 0.03 + hi * hi * 0.97;
      const u = hj * 2 - 1;
      const pr = abyssPersp(u);
      const x = cx + u * halfW;
      const y = horY + p * span * pr + Math.sin(t * 0.0013 + hk * 9) * (0.4 + p * 2.2) * (reduce ? 0 : 1);
      if (y > H + 4) continue;
      const road = Math.exp(-u * u * (4.2 - lum * 3));    // caminho de luz
      // …e o rastro do Espírito: as cristas se acendem sob Ele
      const vd = (x - (vFar + (vNear - vFar) * p)) / (vHalf + vGrow * p * p);
      const breath = Math.exp(-vd * vd * 1.5) * pres;
      const blink = reduce ? 0.6 : Math.sin(((t * 0.00022 + hk) % 1) * Math.PI);
      const rx = (0.7 + p * 5.4) * (0.5 + hk * 0.9) * (1 + breath * 0.5);
      g.globalAlpha = (0.1 + p * 0.3) * (0.2 + road * (0.4 + lum * 1.3) + breath * 1.1) * blink * blink;
      g.beginPath();
      g.ellipse(x, y, rx, Math.max(0.35, rx * 0.2), 0, 0, TAU);
      g.fill();
    }
  }
  g.restore();

  // ---- 7. vinheta: a treva fecha as bordas do mundo ----
  const vg = g.createRadialGradient(cx, horY + span * 0.34, Math.min(W, H) * 0.2, cx, horY + span * 0.34, Math.max(W, H) * 0.82);
  vg.addColorStop(0, "rgba(0,0,0,0)");
  vg.addColorStop(0.62, `rgba(0,0,0,${0.1 + night * 0.16})`);
  vg.addColorStop(1, `rgba(0,0,0,${0.42 + night * 0.34})`);
  g.fillStyle = vg;
  g.fillRect(0, 0, W, H);

  // ---- 8. O ESPÍRITO DE DEUS SE MOVIA SOBRE A FACE DAS ÁGUAS ----
  // um SOPRO em perspectiva (estreito ao longe, largo e difuso na frente) que
  // atravessa lentamente a face das águas. Nunca uma figura, nunca um rosto.
  // Ele não tem contorno: o véu é uma PILHA de manchas suaves ao longo do
  // eixo, larga e difusa na frente, estreita ao longe. Nunca uma silhueta.
  const cVeil = mixHex("#a9d7f0", "#fff2d8", lum * 0.75);
  g.save();
  g.globalCompositeOperation = "lighter";
  const cVeilCore = mixHex("#d8effc", "#fff8e8", lum * 0.8);
  for (let s = 0; s < 12; s++) {
    const p = 0.03 + (s / 11) * 1.0;
    const hw = vHalf + vGrow * p * p;
    const xcp = vFar + (vNear - vFar) * p;
    const yy = horY + p * span + (reduce ? 0 : Math.sin(t * 0.00045 + p * 2.4) * span * 0.02);
    const fade = Math.sin(Math.min(1, p) * Math.PI * 0.9);    // some no horizonte e na borda
    mistBand(g, xcp, yy, hw, span * (0.07 + p * 0.1), cVeil, pres * 0.15 * fade);
    mistBand(g, xcp, yy, hw * 0.42, span * (0.045 + p * 0.06), cVeilCore, pres * 0.1 * fade);
  }
  // partículas finíssimas de luz acompanhando o sopro
  if (!reduce) {
    g.fillStyle = "#eaf6ff";
    for (let i = 0; i < 26; i++) {
      const ji = hsh(i, 23), jk = hsh(i, 149);
      const p = 0.05 + ji * 0.9;
      const xcp = vFar + (vNear - vFar) * p + (jk - 0.5) * 1.15 * (vHalf + vGrow * p * p);
      const yy = horY + p * span - (2 + p * 16) * jk + Math.sin(t * 0.0009 + i * 2.1) * (2 + p * 7);
      const pulse = Math.sin(((t * 0.00024 + ji * 1.37) % 1) * Math.PI);
      g.globalAlpha = pres * 0.62 * pulse * pulse;
      g.beginPath();
      g.arc(xcp, yy, 0.4 + p * 1.1, 0, TAU);
      g.fill();
    }
  }
  g.restore();

  // ---- 9. varredura da luz sobre a superfície (só com a glória forte) ----
  if (lum > 0.1) {
    const sw = g.createLinearGradient(vFar - W * 0.7, 0, vFar + W * 0.7, 0);
    sw.addColorStop(0, "rgba(255,226,168,0)");
    sw.addColorStop(0.5, `rgba(255,240,202,${0.11 * lum})`);
    sw.addColorStop(1, "rgba(255,226,168,0)");
    g.save();
    g.globalCompositeOperation = "lighter";
    g.fillStyle = sw;
    g.fillRect(0, horY, W, H - horY);
    g.restore();
  }

  // relâmpago (tempestade sobre o abismo)
  if (env.storm > 0.25 && !reduce && Math.sin(t * 0.0021) > 0.985) {
    g.save(); g.globalAlpha = 0.22; g.fillStyle = "#cfe0ff"; g.fillRect(0, 0, W, H); g.restore();
  }
}

/** Recorte irregular da linha de praia (3 senoides somadas, estável em x). */
const shoreWave = (x: number, amp: number, ph: number): number =>
  Math.sin(x * 0.021 + 1.3) * amp
  + Math.sin(x * 0.047 + 3.7) * amp * 0.5
  + Math.sin(x * 0.106 + ph) * amp * 0.24;

// ============================================================================
// MAR sobre a faixa de chão (env.water) — o "ajuntamento das águas" (Gn 1:9),
// o dilúvio subindo (Gn 7) e as águas baixando. `water` é a FRAÇÃO da faixa
// andável coberta a partir do fundo: 0.45 → mar cobre ~45% do topo da faixa;
// ≥0.95 → cobre tudo. Interpolado no env, então entra e sai sem pop.
// ============================================================================
function drawGroundWaterHD(g: G, dims: StageDims, t: number, reduce: boolean, night: number, w: number, glory: number): void {
  const { W, H, GROUND } = dims;
  const bandBot = dims.BOT ?? (H - 18);
  const bandH = Math.max(14, bandBot - GROUND);
  const dl = clamp01((w - 0.9) / 0.1);
  const flood = dl * dl * (3 - 2 * dl);            // dilúvio: cobre até a borda
  const cover = lerp(w * bandH, H - GROUND + 10, flood);
  const shoreY = GROUND + cover;
  const fade = clamp01((w - 0.05) / 0.1);          // entrada suave da água
  const amp = Math.min(7, bandH * 0.062) * (1 - flood);
  const tide = reduce ? 0 : Math.sin(t * 0.0011) * 1.6 * (1 - flood);
  const ph = 0.7;

  const cFar = mixHex(mixHex("#4c7fb4", "#16294a", night * 0.72), "#ffe0a8", glory * 0.22);
  const cDeep = mixHex(mixHex("#235a8e", "#0b1a32", night * 0.75), "#e8c088", glory * 0.16);
  const cShallow = mixHex(mixHex("#67a9c6", "#1c3c56", night * 0.7), "#ffeec0", glory * 0.24);
  const crestC = mixHex("#bfe0f4", "#3a5c7c", night * 0.65);
  const foamC = mixHex("#eef7fc", "#5a6a7c", night * 0.55);

  g.save();
  g.globalAlpha = fade;

  // ---- corpo d'água (topo na linha do horizonte, base na praia irregular) ----
  g.beginPath();
  g.moveTo(-2, GROUND - 1);
  g.lineTo(W + 2, GROUND - 1);
  for (let x = W + 2; x >= -2; x -= 12) g.lineTo(x, shoreY + tide + shoreWave(x, amp, ph));
  g.lineTo(-2, shoreY + tide + shoreWave(-2, amp, ph));   // fecha a borda esquerda
  g.closePath();
  const sg = g.createLinearGradient(0, GROUND, 0, Math.max(GROUND + 8, shoreY));
  sg.addColorStop(0, cFar);
  sg.addColorStop(0.45, cDeep);
  sg.addColorStop(1, cShallow);
  g.fillStyle = sg;
  g.fill();

  // ---- ondas + brilho, recortados dentro da água ----
  g.save();
  g.clip();
  // reflexo do céu na linha mais distante
  g.globalAlpha = fade * (0.3 + glory * 0.4);
  g.fillStyle = mixHex("#dcefff", "#ffeec4", glory);
  g.fillRect(0, GROUND, W, 1.6);
  const rows = reduce ? 6 : 13;
  const step = 18;
  g.lineCap = "round";
  g.lineJoin = "round";
  for (let r = 0; r < rows; r++) {
    const jt = hsh(r, 17);                          // jitter estável por linha
    const q = (r + 0.25 + jt * 0.6) / rows;
    const p = q * q;                                // ondas maiores na frente
    const y = GROUND + p * cover;
    const wa = (0.5 + p * 2.6) * (0.7 + jt * 0.7);
    const wf = (0.05 - p * 0.032) * (0.8 + jt * 0.5);
    const sp = reduce ? 0 : t * (0.0008 + p * 0.0022) * (0.7 + jt * 0.7);
    const pr = r * 1.29 + jt * 5;
    g.strokeStyle = crestC;
    g.globalAlpha = fade * (0.16 + p * 0.34) * (0.6 + jt * 0.7);
    g.lineWidth = 0.7 + p * 1.2;
    g.beginPath();
    for (let x = -step; x <= W + step; x += step) {
      const yy = y + Math.sin(x * wf + sp + pr) * wa + Math.sin(x * wf * 2.4 - sp * 1.4 + pr * 0.6) * wa * 0.4;
      if (x <= -step) g.moveTo(x, yy); else g.lineTo(x, yy);
    }
    g.stroke();
  }
  // cintilância do sol/glória na superfície
  if (!reduce) {
    g.fillStyle = mixHex("#f2f8ff", "#fff2cc", glory);
    for (let i = 0; i < 14; i++) {
      const sx = (i * 127 + 29) % W;
      const sy = GROUND + 3 + ((i * 53) % Math.max(4, cover - 4));
      const blink = (t * 0.0035 + i * 1.7) % 4;
      if (blink < 0.5) {
        g.globalAlpha = fade * (0.5 + glory * 0.45) * (1 - blink * 2);
        g.beginPath(); g.ellipse(sx, sy, 1.8, 0.7, 0, 0, TAU); g.fill();
      }
    }
  }
  g.restore();

  // ---- beira: terra molhada + espuma quebrando na praia ----
  if (flood < 0.995) {
    g.globalAlpha = fade * (0.3 - night * 0.1) * (1 - flood);
    g.strokeStyle = "#3a2c18";
    g.lineWidth = 7; g.lineCap = "round"; g.lineJoin = "round";
    g.beginPath();
    for (let x = -6; x <= W + 6; x += 14) {
      const yy = shoreY + tide + shoreWave(x, amp, ph) + 3.4;
      if (x <= -6) g.moveTo(x, yy); else g.lineTo(x, yy);
    }
    g.stroke();
    // espuma principal
    g.globalAlpha = fade * (0.85 - night * 0.3) * (1 - flood);
    g.strokeStyle = foamC;
    g.lineWidth = 1.9;
    g.beginPath();
    for (let x = -6; x <= W + 6; x += 12) {
      const yy = shoreY + tide + shoreWave(x, amp, ph) + (reduce ? 0 : Math.sin(x * 0.19 + t * 0.0024) * 0.8);
      if (x <= -6) g.moveTo(x, yy); else g.lineTo(x, yy);
    }
    g.stroke();
    // renda de espuma (segunda linha, mais fina, avançando na areia)
    g.globalAlpha = fade * (0.4 - night * 0.15) * (1 - flood);
    g.lineWidth = 1;
    g.beginPath();
    for (let x = -6; x <= W + 6; x += 16) {
      const yy = shoreY + tide * 0.6 + shoreWave(x, amp, ph) + 2.6 + (reduce ? 0 : Math.sin(x * 0.13 + t * 0.0017 + 2) * 1.1);
      if (x <= -6) g.moveTo(x, yy); else g.lineTo(x, yy);
    }
    g.stroke();
    // bolhas de espuma
    if (!reduce) {
      g.fillStyle = foamC;
      for (let i = 0; i < 16; i++) {
        const bx = (i * 149 + 37) % W;
        const bph = (t * 0.0013 + hsh(i, 21)) % 1;
        g.globalAlpha = fade * (0.55 - night * 0.2) * Math.sin(bph * Math.PI) * (1 - flood);
        const by = shoreY + tide + shoreWave(bx, amp, ph) + 1.2 + bph * 3.2;
        g.beginPath(); g.ellipse(bx, by, 2.2 + hsh(i, 22) * 2.4, 0.9, 0, 0, TAU); g.fill();
      }
    }
  }
  g.restore();
}

export interface HDBackdropOpts { dims: StageDims; t: number; reduce: boolean; state: StageDrawState }

export function drawBackdropHD(g: G, o: HDBackdropOpts): void {
  const { dims, t, reduce, state } = o;
  const { W, H, GROUND } = dims;
  const k = reduce ? 1 : 0.05;
  state.env.night = lerp(state.env.night, state.envTarget.night, k);
  state.env.glory = lerp(state.env.glory, state.envTarget.glory, k);
  state.env.storm = lerp(state.env.storm, state.envTarget.storm, k);
  state.env.fire = lerp(state.env.fire, state.envTarget.fire, k);
  state.env.water = lerp(state.env.water, state.envTarget.water, k);
  state.env.verdure = lerp(state.env.verdure, state.envTarget.verdure, k);
  state.env.terrain = state.envTarget.terrain;
  const env = state.env;
  const night = clamp01(env.night);
  const water = clamp01(env.water);
  const verd = clamp01(env.verdure);

  // ---- ABISMO (Gn 1:2): cena inteira de água e treva, sem chão nenhum ----
  if (env.terrain === "abyss") { drawAbyssHD(g, dims, t, reduce, env); return; }

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
    // ===== CASARIO PRÓXIMO em ESCALA HUMANA: casas estreitas e detalhadas
    // (casas largas demais liam como "imagem ampliada" — pareciam zoom) =====
    g.save();
    const hw = 38;                                    // largura de cada casa
    const nHouse = Math.ceil(W / hw) + 1;
    for (let i = 0; i < nHouse; i++) {
      const hx = i * hw - 6;
      const hwv = hw - 4 - ((i * 29) % 6);            // larguras levemente variadas
      const hh = 26 + ((i * 53) % 16);                // 26..42 de altura
      const tone = ["#9c8a68", "#8a7a62", "#a89272", "#93826a"][i % 4];
      g.fillStyle = mixHex(tone, "#241e14", night * 0.65);
      rr(g, hx, GROUND - hh, hwv, hh + 2, 1.6); g.fill();
      // telhado/parapeito (alguns com telha, outros terraço)
      g.fillStyle = mixHex(i % 2 ? "#a8613f" : "#7c6248", "#1c140c", night * 0.6);
      rr(g, hx - 1.5, GROUND - hh - 4, hwv + 3, 5, 1.6); g.fill();
      if (i % 4 === 2) { // ameia de terraço
        g.fillStyle = mixHex(tone, "#241e14", night * 0.65);
        for (let a2 = 0; a2 < 3; a2++) { rr(g, hx + 3 + a2 * (hwv / 3), GROUND - hh - 7, 4, 4, 1); g.fill(); }
      }
      // porta em escala humana
      g.fillStyle = mixHex("#3a2c1c", "#120c06", night * 0.4);
      rr(g, hx + hwv * 0.5 - 3, GROUND - 11, 6, 11, 2.6); g.fill();
      g.strokeStyle = "rgba(0,0,0,0.3)"; g.lineWidth = 0.6;
      rr(g, hx + hwv * 0.5 - 3, GROUND - 11, 6, 11, 2.6); g.stroke();
      // janela (algumas acesas à noite) com moldura
      const wx = hx + hwv * (i % 2 ? 0.16 : 0.62);
      const wy = GROUND - hh + 6 + ((i * 31) % 6);
      const lit = night > 0.25 && i % 3 !== 0;
      g.fillStyle = mixHex("#5c503c", "#181208", night * 0.5);
      rr(g, wx - 0.8, wy - 0.8, 5.2, 6, 1.4); g.fill();
      g.fillStyle = lit ? "rgba(255,214,130,0.85)" : mixHex("#4a4034", "#16120c", night * 0.5);
      rr(g, wx, wy, 3.6, 4.4, 1); g.fill();
      if (lit) glowCircle(g, wx + 1.8, wy + 2.2, 5, "#ffd98a", 0.2);
      // toldo pequeno em algumas fachadas
      if (i % 3 === 1) {
        g.fillStyle = mixHex(i % 2 ? "#c0483c" : "#4a78a8", "#141018", night * 0.55);
        g.beginPath();
        g.moveTo(hx + hwv * 0.3, GROUND - 16);
        g.lineTo(hx + hwv * 0.78, GROUND - 16);
        g.lineTo(hx + hwv * 0.84, GROUND - 11.5);
        g.lineTo(hx + hwv * 0.24, GROUND - 11.5);
        g.closePath(); g.fill();
      }
      // varal com panos entre casas (a cada 5)
      if (i % 5 === 3) {
        g.strokeStyle = "rgba(220,210,190,0.4)"; g.lineWidth = 0.7;
        g.beginPath(); g.moveTo(hx + hwv * 0.9, GROUND - hh + 3); g.quadraticCurveTo(hx + hw * 1.4, GROUND - hh + 9, hx + hw * 1.9, GROUND - hh + 1.5); g.stroke();
        for (const [fx2, fc] of [[1.05, "#c0483c"], [1.35, "#e8dcc0"], [1.62, "#4a78a8"]] as const) {
          g.fillStyle = mixHex(fc, "#181420", night * 0.5);
          rr(g, hx + hw * fx2, GROUND - hh + 5, 4.5, 6, 0.8); g.fill();
        }
      }
    }
    g.restore();
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
  } else if (env.terrain === "garden") {
    // ===== ÉDEN: folhagem exuberante em camadas, rio serpenteando ao longe,
    // flores no meio-fundo e vagalumes — tom paradisíaco =====
    const canopy = (y: number, c0: string, c1: string, r: number, gap: number, seed: number) => {
      g.save();
      // faixa-base da camada (fecha os vãos entre copas)
      g.fillStyle = mixHex(c0, "#081008", night * 0.62);
      g.fillRect(0, y - 2, W, GROUND - y + 3);
      for (let i = -1; i * gap < W + gap * 2; i++) {
        const cx2 = i * gap + ((seed * 37 + i * 13) % gap);
        const rr2 = r * (0.78 + ((i * 29 + seed) % 5) * 0.11);
        const cy2 = y - rr2 * 0.42 - (((i * 17 + seed) % 7));
        const grd = g.createRadialGradient(cx2 - rr2 * 0.35, cy2 - rr2 * 0.5, 1, cx2, cy2, rr2);
        grd.addColorStop(0, mixHex(mixHex(c1, "#ffe9b0", 0.3), "#0c180e", night * 0.6));
        grd.addColorStop(1, mixHex(c0, "#081008", night * 0.62));
        g.fillStyle = grd;
        g.beginPath(); g.arc(cx2, cy2, rr2, 0, TAU); g.fill();
      }
      g.restore();
    };
    // camada distante
    canopy(GROUND * 0.68, "#274e33", "#3f7048", 13, 24, 3);
    // brilho de RIO serpenteando entre as camadas
    g.save();
    const ry = GROUND * 0.75;
    g.strokeStyle = mixHex("#9ad4e8", "#28445a", night * 0.6);
    g.lineWidth = 3; g.lineCap = "round"; g.globalAlpha = 0.7;
    g.beginPath();
    g.moveTo(-12, ry + 5);
    g.bezierCurveTo(W * 0.24, ry - 6, W * 0.46, ry + 9, W * 0.68, ry + 1);
    g.quadraticCurveTo(W * 0.86, ry - 5, W + 12, ry + 3);
    g.stroke();
    g.strokeStyle = mixHex("#e8f8ff", "#4a6a80", night * 0.55);
    g.lineWidth = 1; g.globalAlpha = 0.55;
    g.beginPath();
    g.moveTo(-12, ry + 4);
    g.bezierCurveTo(W * 0.24, ry - 7, W * 0.46, ry + 8, W * 0.68, ry);
    g.stroke();
    if (!reduce) {
      g.fillStyle = "#eafaff";
      for (let i = 0; i < 4; i++) {
        if (((t * 0.003 + i * 1.7) % 3.4) < 0.4) {
          g.globalAlpha = 0.85;
          g.fillRect((i * 173 + 60) % W, ry - 2 + (i % 3) * 2.4, 1.4, 1.4);
        }
      }
    }
    g.restore();
    // camadas média e próxima (mais claras, com luz nas copas)
    canopy(GROUND * 0.84, "#31603a", "#4e8a52", 17, 30, 7);
    canopy(GROUND * 1.0, "#3c7040", "#5e9a58", 21, 37, 11);
    // flores pontuais no meio-fundo
    g.save();
    for (let i = 0; i < 12; i++) {
      const fx2 = (i * 89 + 23) % W;
      const fy2 = GROUND * 0.87 + ((i * 37) % Math.max(4, GROUND * 0.1));
      g.globalAlpha = Math.max(0.15, 0.85 - night * 0.5);
      g.fillStyle = ["#e8b0c0", "#f2ead0", "#ffca5a", "#c9a0e0"][i % 4];
      g.beginPath(); g.arc(fx2, fy2, 1 + (i % 2) * 0.5, 0, TAU); g.fill();
    }
    g.restore();
    // vagalumes / partículas de vida
    if (!reduce) {
      g.save();
      for (let i = 0; i < 7; i++) {
        const ph = (t * 0.00035 + i * 0.61) % 1;
        const fx2 = ((i * 151 + 40) % W) + Math.sin(t * 0.0011 + i * 2.1) * 14;
        const fy2 = GROUND * (0.52 + (i % 3) * 0.14) + Math.sin(t * 0.0009 + i * 1.7) * 8;
        const pulse = Math.sin(ph * Math.PI);
        glowCircle(g, fx2, fy2, 4.5, "#d8ffa0", (0.22 + night * 0.4) * pulse);
        g.globalAlpha = (0.45 + night * 0.5) * pulse;
        g.fillStyle = "#eaffc0";
        g.beginPath(); g.arc(fx2, fy2, 0.9, 0, TAU); g.fill();
      }
      g.restore();
    }
  } else if (env.terrain === "desert") {
    // ===== NEGUEBE / PADÃ-ARÃ: sol/lua grande, dunas com cristas iluminadas,
    // calor tremulando e pedras esparsas ao longe =====
    // astro grande no céu
    const ax2 = W * 0.7, ay2 = GROUND * 0.28;
    if (night > 0.45) {
      glowCircle(g, ax2, ay2, 36, "#cdd9f2", 0.5 * night);
      const mg2 = g.createRadialGradient(ax2 - 4, ay2 - 4, 1, ax2, ay2, 13);
      mg2.addColorStop(0, "#f4f7ff"); mg2.addColorStop(1, "#c2cce0");
      g.fillStyle = mg2;
      g.beginPath(); g.arc(ax2, ay2, 13, 0, TAU); g.fill();
      g.fillStyle = "rgba(150,164,196,0.45)";
      for (const [dx, dy2, r2] of [[-4, -2, 2.4], [3, 3, 1.8], [4, -4, 1.3]] as const) {
        g.beginPath(); g.arc(ax2 + dx, ay2 + dy2, r2, 0, TAU); g.fill();
      }
    } else {
      glowCircle(g, ax2, ay2, 46, "#ffe0a0", 0.7 * (1 - night));
      const sg2 = g.createRadialGradient(ax2 - 3, ay2 - 3, 1, ax2, ay2, 14);
      sg2.addColorStop(0, "#fff6dd"); sg2.addColorStop(1, "#ffca5a");
      g.fillStyle = sg2;
      g.beginPath(); g.arc(ax2, ay2, 14, 0, TAU); g.fill();
    }
    // dunas em 3 camadas com cristas iluminadas
    const dunes = [
      { y: GROUND * 0.66, c: "#b89868", amp: 8, ph: 0.9 },
      { y: GROUND * 0.8, c: "#a8865a", amp: 11, ph: 2.1 },
      { y: GROUND * 0.94, c: "#96744c", amp: 13, ph: 4.4 },
    ];
    for (const d of dunes) {
      const duneY = (x2: number) =>
        d.y - Math.sin(x2 * 0.009 + d.ph) * d.amp - Math.sin(x2 * 0.028 + d.ph * 2.3) * d.amp * 0.32;
      g.save();
      g.fillStyle = mixHex(d.c, "#181008", night * 0.62);
      g.beginPath();
      g.moveTo(0, GROUND + 2);
      for (let x2 = 0; x2 <= W; x2 += 8) g.lineTo(x2, duneY(x2));
      g.lineTo(W, GROUND + 2); g.closePath(); g.fill();
      // luz na crista (lado do sol)
      g.strokeStyle = `rgba(255,232,180,${Math.max(0.08, 0.34 - night * 0.2)})`;
      g.lineWidth = 1.1; g.lineCap = "round";
      g.beginPath();
      for (let x2 = 0; x2 <= W; x2 += 8) {
        const yy = duneY(x2) - 0.8;
        if (x2 === 0) g.moveTo(x2, yy); else g.lineTo(x2, yy);
      }
      g.stroke();
      g.restore();
    }
    // pedras esparsas ao longe
    g.save();
    for (let i = 0; i < 6; i++) {
      const px = (i * 167 + 60) % W;
      const py = GROUND * (0.72 + (i % 3) * 0.08);
      g.fillStyle = mixHex("#7a6448", "#141008", night * 0.55);
      g.beginPath(); g.ellipse(px, py, 4 + (i % 3), 2.2 + (i % 2), 0.2, 0, TAU); g.fill();
      g.fillStyle = "rgba(255,236,190,0.18)";
      g.beginPath(); g.ellipse(px - 1.2, py - 0.9, 1.6, 0.7, 0.2, 0, TAU); g.fill();
    }
    g.restore();
    // calor tremulando (linhas sutis animadas, só de dia)
    if (!reduce && night < 0.4) {
      g.save();
      g.globalAlpha = 0.1 * Math.max(0.1, 1 - night * 2.2);
      g.strokeStyle = "#fff2cc"; g.lineWidth = 1;
      for (let i = 0; i < 5; i++) {
        const hy = GROUND * (0.56 + i * 0.08);
        g.beginPath();
        for (let x2 = 0; x2 <= W; x2 += 12) {
          const yy = hy + Math.sin(x2 * 0.05 + t * 0.006 + i * 1.7) * 1.6;
          if (x2 === 0) g.moveTo(x2, yy); else g.lineTo(x2, yy);
        }
        g.stroke();
      }
      g.restore();
    }
  } else if (env.terrain === "mountain") {
    // ===== CORDILHEIRA em 3 planos: picos angulosos com neve/rocha clara,
    // neblina animada entre os planos e aves de rapina =====
    const ranges = [
      { y: GROUND * 0.6, c: "#5a6482", amp: 26, ph: 1.2, sp: 0.011, snow: 0.85 },
      { y: GROUND * 0.76, c: "#4c5670", amp: 20, ph: 3.7, sp: 0.014, snow: 0.6 },
      { y: GROUND * 0.92, c: "#3c465c", amp: 14, ph: 5.9, sp: 0.018, snow: 0.35 },
    ];
    const ridgeY = (r: (typeof ranges)[number], x2: number) =>
      r.y - Math.abs(Math.sin(x2 * r.sp + r.ph)) * r.amp - Math.abs(Math.sin(x2 * r.sp * 2.7 + r.ph * 2)) * r.amp * 0.35;
    for (let ri = 0; ri < ranges.length; ri++) {
      const r = ranges[ri];
      g.save();
      // silhueta angulosa (segmentos retos = rocha)
      g.fillStyle = mixHex(r.c, "#0c1018", night * 0.62);
      g.beginPath();
      g.moveTo(0, GROUND + 2);
      for (let x2 = 0; x2 <= W + 26; x2 += 26) g.lineTo(x2, ridgeY(r, x2));
      g.lineTo(W + 26, GROUND + 2); g.closePath(); g.fill();
      // neve/rocha clara nos topos mais altos
      g.fillStyle = mixHex("#eef2fa", "#5a6480", night * 0.5);
      for (let x2 = 0; x2 <= W + 26; x2 += 26) {
        const yy = ridgeY(r, x2);
        if (r.y - yy > r.amp * 0.72) {
          const cw = 4.5 + r.amp * 0.14;
          g.globalAlpha = r.snow;
          g.beginPath();
          g.moveTo(x2 - cw, yy + cw * 0.9);
          g.lineTo(x2, yy);
          g.lineTo(x2 + cw, yy + cw * 0.9);
          g.quadraticCurveTo(x2 + cw * 0.3, yy + cw * 1.3, x2 - cw * 0.2, yy + cw * 0.95);
          g.closePath(); g.fill();
        }
      }
      g.restore();
      // neblina translúcida animada entre os planos
      if (ri < ranges.length - 1) {
        g.save();
        for (let mi = 0; mi < 2; mi++) {
          const drift = reduce ? mi * 140 : ((mi * 260 + ri * 90 + t * (0.006 + ri * 0.003)) % (W + 260)) - 130;
          const my = r.y + (ranges[ri + 1].y - r.y) * 0.45 + mi * 6;
          const mg3 = g.createRadialGradient(drift, my, 2, drift, my, 78);
          mg3.addColorStop(0, `rgba(222,230,246,${Math.max(0.05, 0.16 - night * 0.06)})`);
          mg3.addColorStop(1, "rgba(222,230,246,0)");
          g.fillStyle = mg3;
          g.beginPath(); g.ellipse(drift, my, 80, 11, 0, 0, TAU); g.fill();
        }
        g.restore();
      }
    }
    // aves de rapina planando (asas em "v", padrão das gaivotas de patmos)
    if (!reduce && night < 0.5) {
      g.save(); g.strokeStyle = "#2c3244"; g.lineWidth = 1.3; g.globalAlpha = 0.8; g.lineCap = "round";
      for (let i = 0; i < 2; i++) {
        const bx = ((i * 320 + t * 0.012) % (W + 120)) - 60;
        const by = GROUND * 0.3 + i * 26 + Math.sin(t * 0.003 + i * 2.4) * 6;
        const fl = Math.sin(t * 0.006 + i * 1.4) * 1.4;
        g.beginPath();
        g.moveTo(bx - 6, by - fl); g.quadraticCurveTo(bx - 2, by - 3.4 + fl, bx, by);
        g.quadraticCurveTo(bx + 2, by - 3.4 + fl, bx + 6, by - fl);
        g.stroke();
      }
      g.restore();
    }
  } else {
    // colinas suaves — reverdecem junto com o chão (Gn 1:9-12)
    g.save();
    g.fillStyle = mixHex(mixHex("#47663f", "#6b5a38", (1 - verd) * 0.9), "#1c2a1a", night * 0.7);
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
    garden: ["#3f6a36", "#6a9a52"],
    desert: ["#9a8058", "#cbb280"],
    mountain: ["#6e6858", "#948c78"],
    patmos: ["#7c6844", "#a89058"],
    city: ["#6d604a", "#968a68"],
    glory: ["#a8905c", "#d9be80"],
    throne: ["#a8905c", "#d9be80"],
    field: ["#4b6a3c", "#729256"],
    abyss: ["#040a12", "#0a1826"],   // não há chão: só a face das águas
  };
  let [fFar, fNear] = floorPal[env.terrain];
  // VERDURA: em verdure baixo o solo verde vira TERRA NUA (barro/pó) — a terra
  // do 3º dia antes de "produza a terra erva verde", e o solo pós-maldição.
  if (env.terrain === "field" || env.terrain === "garden") {
    const dry = 1 - verd;
    fFar = mixHex(fFar, env.terrain === "field" ? "#6a5636" : "#5e5030", dry);
    fNear = mixHex(fNear, env.terrain === "field" ? "#9c8656" : "#8e7a4c", dry);
  }
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
    // conchas, seixos, estrela-do-mar e capim de praia (posições estáveis)
    for (let i = 0; i < 18; i++) {
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
      } else if (kind === 3) {
        // graveto/mancha de areia úmida
        g.fillStyle = "rgba(90,66,38,0.35)";
        g.beginPath(); g.ellipse(px, py, 3.4 * sc, 1 * sc, (i % 3) * 0.5, 0, TAU); g.fill();
      } else {
        // capim de praia seco
        g.strokeStyle = "rgba(150,128,72,0.7)"; g.lineWidth = 0.9 * sc; g.lineCap = "round";
        for (const dxb of [-2, -0.6, 0.8, 2.2]) {
          g.beginPath(); g.moveTo(px + dxb * sc, py);
          g.quadraticCurveTo(px + dxb * 1.3 * sc, py - 3.4 * sc, px + dxb * 2 * sc, py - 5.4 * sc);
          g.stroke();
        }
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
    // ===== CHÃO DETALHISTA (cidade, campo, glória) =====
    const bandBot2 = dims.BOT ?? (H - 18);
    const bandH2 = Math.max(10, bandBot2 - GROUND - 10);
    g.save();
    if (env.terrain === "city") {
      // lajotas de calçamento (pedras chatas com brilho e sombra)
      for (let i = 0; i < 18; i++) {
        const px = (i * 149 + 37) % W;
        const py = GROUND + 8 + ((i * 83) % bandH2);
        const deep = (py - GROUND) / bandH2;
        const sc = 0.8 + deep * 0.7;
        g.fillStyle = `rgba(0,0,0,${0.12 + deep * 0.06})`;
        g.beginPath(); g.ellipse(px, py + 1.2, 7.5 * sc, 2.6 * sc, 0, 0, TAU); g.fill();
        g.fillStyle = mixHex(i % 2 ? "#8d8168" : "#7c745e", "#1c160c", night * 0.5);
        g.beginPath(); g.ellipse(px, py, 7 * sc, 2.4 * sc, 0, 0, TAU); g.fill();
        g.fillStyle = "rgba(255,240,200,0.10)";
        g.beginPath(); g.ellipse(px - 1.5 * sc, py - 0.8 * sc, 3 * sc, 0.9 * sc, 0, 0, TAU); g.fill();
      }
      // capim nascendo entre as pedras + seixos miúdos
      for (let i = 0; i < 12; i++) {
        const px = (i * 211 + 71) % W;
        const py = GROUND + 10 + ((i * 67) % bandH2);
        const sc = 0.7 + ((py - GROUND) / bandH2) * 0.6;
        if (i % 2 === 0) {
          // capim entre as pedras só onde a terra é fértil (env.verdure)
          const gk = growK(verd, i, 0.08);
          if (gk > 0.02) {
            const gh = 0.45 + gk * 0.55;
            g.globalAlpha = gk;
            g.strokeStyle = mixHex("#5e8a48", "#1c2a14", night * 0.5); g.lineWidth = 0.9 * sc; g.lineCap = "round";
            for (const dxb of [-1.6, 0, 1.6]) {
              g.beginPath(); g.moveTo(px + dxb * sc, py);
              g.quadraticCurveTo(px + dxb * sc * 1.4, py - 2.6 * sc * gh, px + dxb * 2.2 * sc, py - 4.4 * sc * gh);
              g.stroke();
            }
            g.globalAlpha = 1;
          }
        } else {
          g.fillStyle = mixHex("#6d6350", "#181408", night * 0.5);
          g.beginPath(); g.ellipse(px, py, 1.8 * sc, 1.1 * sc, 0.4, 0, TAU); g.fill();
        }
      }
    } else if (env.terrain === "field") {
      // campo vivo: tufos de capim, florzinhas e seixos
      for (let i = 0; i < 24; i++) {
        const px = (i * 137 + 23) % W;
        const py = GROUND + 8 + ((i * 61) % bandH2);
        const sc = 0.7 + ((py - GROUND) / bandH2) * 0.7;
        const kind = i % 4;
        if (kind <= 1) {
          // tufo de capim: só existe se a terra já produziu erva verde
          const gk = growK(verd, i, 0.05);
          if (gk > 0.02) {
            const gh = 0.4 + gk * 0.6;
            g.globalAlpha = gk;
            g.strokeStyle = mixHex(mixHex(kind ? "#6fae57" : "#4e8a42", "#9a8a4a", (1 - verd) * 0.55), "#16240f", night * 0.55);
            g.lineWidth = 1 * sc; g.lineCap = "round";
            for (const dxb of [-2, -0.5, 1, 2.4]) {
              g.beginPath(); g.moveTo(px + dxb * sc, py);
              g.quadraticCurveTo(px + dxb * sc * 1.3, py - 3.4 * sc * gh, px + dxb * 1.9 * sc, py - 5.6 * sc * gh);
              g.stroke();
            }
            g.globalAlpha = 1;
          }
        } else if (kind === 2) {
          // florzinha — só quando o campo está PLENO (verdure alto)
          const fk = clamp01((verd - 0.7 - hsh(i, 11) * 0.16) / 0.12);
          if (fk > 0.02) {
            g.globalAlpha = fk;
            g.fillStyle = i % 8 < 4 ? "#f2ead0" : "#e8b0c0";
            for (let p2 = 0; p2 < 5; p2++) {
              const ang2 = (p2 / 5) * TAU;
              g.beginPath(); g.arc(px + Math.cos(ang2) * 1.5 * sc, py - 3 * sc + Math.sin(ang2) * 1.5 * sc, 0.9 * sc * fk, 0, TAU); g.fill();
            }
            g.fillStyle = "#ffca5a";
            g.beginPath(); g.arc(px, py - 3 * sc, 0.8 * sc * fk, 0, TAU); g.fill();
            g.strokeStyle = mixHex("#4e8a42", "#16240f", night * 0.5); g.lineWidth = 0.7 * sc;
            g.beginPath(); g.moveTo(px, py); g.lineTo(px, py - 2 * sc); g.stroke();
            g.globalAlpha = 1;
          }
        } else {
          g.fillStyle = mixHex("#77705c", "#181408", night * 0.5);
          g.beginPath(); g.ellipse(px, py, 2.2 * sc, 1.3 * sc, 0.3, 0, TAU); g.fill();
        }
      }
    } else if (env.terrain === "garden") {
      // ÉDEN: tufos exuberantes, flores variadas e folhas largas
      for (let i = 0; i < 26; i++) {
        const px = (i * 131 + 19) % W;
        const py = GROUND + 8 + ((i * 59) % bandH2);
        const sc = 0.7 + ((py - GROUND) / bandH2) * 0.7;
        const kind = i % 5;
        if (kind <= 1) {
          // tufo viçoso (dois verdes vivos) — depende da verdura do solo
          const gk = growK(verd, i, 0.05);
          if (gk > 0.02) {
            const gh = 0.4 + gk * 0.6;
            g.globalAlpha = gk;
            g.strokeStyle = mixHex(mixHex(kind ? "#7cbe5f" : "#54964a", "#8f8046", (1 - verd) * 0.55), "#122410", night * 0.55);
            g.lineWidth = 1.05 * sc; g.lineCap = "round";
            for (const dxb of [-2.2, -0.7, 0.9, 2.4]) {
              g.beginPath(); g.moveTo(px + dxb * sc, py);
              g.quadraticCurveTo(px + dxb * sc * 1.3, py - 3.8 * sc * gh, px + dxb * 1.9 * sc, py - 6 * sc * gh);
              g.stroke();
            }
            g.globalAlpha = 1;
          }
        } else if (kind === 2) {
          // flor do jardim — só em terra plenamente reverdecida
          const fk = clamp01((verd - 0.7 - hsh(i, 13) * 0.16) / 0.12);
          if (fk > 0.02) {
            g.globalAlpha = fk;
            g.fillStyle = ["#e8b0c0", "#f2ead0", "#c9a0e0"][i % 3];
            for (let p2 = 0; p2 < 5; p2++) {
              const ang2 = (p2 / 5) * TAU;
              g.beginPath(); g.arc(px + Math.cos(ang2) * 1.6 * sc, py - 3.4 * sc + Math.sin(ang2) * 1.6 * sc, 1 * sc * fk, 0, TAU); g.fill();
            }
            g.fillStyle = "#ffca5a";
            g.beginPath(); g.arc(px, py - 3.4 * sc, 0.85 * sc * fk, 0, TAU); g.fill();
            g.strokeStyle = mixHex("#54964a", "#122410", night * 0.5); g.lineWidth = 0.7 * sc;
            g.beginPath(); g.moveTo(px, py); g.lineTo(px, py - 2.2 * sc); g.stroke();
            g.globalAlpha = 1;
          }
        } else if (kind === 3 && growK(verd, i, 0.3) > 0.02) {
          // folha larga (par de folhas com nervura)
          g.globalAlpha = growK(verd, i, 0.3);
          for (const s2 of [-1, 1] as const) {
            const lg3 = g.createLinearGradient(px, py, px + s2 * 4 * sc, py - 5 * sc);
            lg3.addColorStop(0, mixHex("#3f7a42", "#0e1c10", night * 0.55));
            lg3.addColorStop(1, mixHex("#79b565", "#16260f", night * 0.55));
            g.fillStyle = lg3;
            g.beginPath(); g.ellipse(px + s2 * 2.6 * sc, py - 3 * sc, 1.5 * sc, 3.2 * sc, s2 * 0.55, 0, TAU); g.fill();
            g.strokeStyle = "rgba(240,255,220,0.25)"; g.lineWidth = 0.5 * sc;
            g.beginPath(); g.moveTo(px, py); g.lineTo(px + s2 * 3.6 * sc, py - 5.2 * sc); g.stroke();
          }
          g.globalAlpha = 1;
        } else if (kind !== 3) {
          // pedrinha (sempre) com musgo (só onde há vida)
          g.fillStyle = mixHex("#77705c", "#181408", night * 0.5);
          g.beginPath(); g.ellipse(px, py, 2 * sc, 1.2 * sc, 0.3, 0, TAU); g.fill();
          const mk = growK(verd, i, 0.25);
          if (mk > 0.02) {
            g.globalAlpha = mk;
            g.fillStyle = mixHex("#5e8a48", "#16240f", night * 0.5);
            g.beginPath(); g.ellipse(px - 0.6 * sc, py - 0.9 * sc, 1.1 * sc, 0.5 * sc, 0.3, 0, TAU); g.fill();
            g.globalAlpha = 1;
          }
        }
      }
    } else if (env.terrain === "desert") {
      // NEGUEBE: ondulações de areia com luz na crista + seixos e gravetos
      g.save();
      g.lineCap = "round";
      for (let r = 0; r < 5; r++) {
        const ry = GROUND + 9 + r * (bandH2 / 5) + (r % 2) * 3;
        const amp = 1.6 + r * 0.55;
        g.strokeStyle = "rgba(84,58,26,0.2)";
        g.lineWidth = 0.9 + r * 0.15;
        g.beginPath();
        for (let x2 = -20; x2 <= W + 20; x2 += 28) {
          const yy = ry + Math.sin(x2 * 0.045 + r * 2.1) * amp;
          if (x2 === -20) g.moveTo(x2, yy);
          else g.quadraticCurveTo(x2 - 14, yy - amp * 0.8, x2, yy);
        }
        g.stroke();
        g.strokeStyle = `rgba(255,240,200,${Math.max(0.04, 0.12 - night * 0.06)})`; g.lineWidth = 0.8;
        g.beginPath();
        for (let x2 = -20; x2 <= W + 20; x2 += 28) {
          const yy = ry - 1 + Math.sin(x2 * 0.045 + r * 2.1) * amp;
          if (x2 === -20) g.moveTo(x2, yy);
          else g.quadraticCurveTo(x2 - 14, yy - amp * 0.8, x2, yy);
        }
        g.stroke();
      }
      g.restore();
      for (let i = 0; i < 12; i++) {
        const px = (i * 157 + 43) % W;
        const py = GROUND + 10 + ((i * 73) % bandH2);
        const sc = 0.7 + ((py - GROUND) / bandH2) * 0.7;
        if (i % 3 === 0) {
          // graveto seco
          g.strokeStyle = "rgba(122,90,52,0.6)"; g.lineWidth = 0.9 * sc; g.lineCap = "round";
          g.beginPath(); g.moveTo(px - 3 * sc, py + 0.6 * sc);
          g.quadraticCurveTo(px, py - 1.6 * sc, px + 3.4 * sc, py - 0.4 * sc); g.stroke();
          g.beginPath(); g.moveTo(px + 0.6 * sc, py - 1 * sc); g.lineTo(px + 1.8 * sc, py - 2.6 * sc); g.stroke();
        } else {
          // seixo queimado de sol
          g.fillStyle = mixHex(i % 2 ? "#8d7c64" : "#7a6a52", "#181008", night * 0.5);
          g.beginPath(); g.ellipse(px, py, 2.4 * sc, 1.4 * sc, 0.3, 0, TAU); g.fill();
          g.fillStyle = "rgba(255,236,190,0.16)";
          g.beginPath(); g.ellipse(px - 0.7 * sc, py - 0.6 * sc, 1 * sc, 0.5 * sc, 0.3, 0, TAU); g.fill();
        }
      }
    } else if (env.terrain === "mountain") {
      // CORDILHEIRA: cascalho — lascas angulosas, pedrisco e capim ralo
      for (let i = 0; i < 24; i++) {
        const px = (i * 143 + 31) % W;
        const py = GROUND + 8 + ((i * 71) % bandH2);
        const sc = 0.7 + ((py - GROUND) / bandH2) * 0.7;
        if (i % 3 === 0) {
          // lasca de pedra angulosa com face iluminada
          g.fillStyle = `rgba(0,0,0,${0.1 + ((py - GROUND) / bandH2) * 0.06})`;
          g.beginPath(); g.ellipse(px, py + 1 * sc, 4 * sc, 1.4 * sc, 0, 0, TAU); g.fill();
          g.fillStyle = mixHex(i % 2 ? "#8a8274" : "#736c5e", "#14100a", night * 0.55);
          g.beginPath();
          g.moveTo(px - 3.4 * sc, py + 1 * sc);
          g.lineTo(px - 0.6 * sc, py - 2.4 * sc);
          g.lineTo(px + 3 * sc, py - 0.8 * sc);
          g.lineTo(px + 2.2 * sc, py + 1.2 * sc);
          g.closePath(); g.fill();
          g.fillStyle = "rgba(255,244,214,0.14)";
          g.beginPath();
          g.moveTo(px - 0.6 * sc, py - 2.4 * sc);
          g.lineTo(px + 3 * sc, py - 0.8 * sc);
          g.lineTo(px + 1 * sc, py - 0.4 * sc);
          g.closePath(); g.fill();
        } else if (i % 3 === 1) {
          // pedrisco
          g.fillStyle = mixHex("#7c7466", "#14100a", night * 0.5);
          g.beginPath(); g.ellipse(px, py, 1.6 * sc, 1 * sc, (i % 4) * 0.4, 0, TAU); g.fill();
        } else {
          // capim ralo de altitude (some quando a terra é estéril)
          const gk = growK(verd, i, 0.05);
          if (gk > 0.02) {
            const gh = 0.45 + gk * 0.55;
            g.globalAlpha = gk;
            g.strokeStyle = mixHex("#8a9060", "#1c2014", night * 0.55); g.lineWidth = 0.8 * sc; g.lineCap = "round";
            for (const dxb of [-1.4, 0.2, 1.6]) {
              g.beginPath(); g.moveTo(px + dxb * sc, py);
              g.quadraticCurveTo(px + dxb * sc * 1.3, py - 2.4 * sc * gh, px + dxb * 1.8 * sc, py - 3.8 * sc * gh);
              g.stroke();
            }
            g.globalAlpha = 1;
          }
        }
      }
    } else {
      // glória/trono: chão dourado com poças de luz e cintilância
      for (let i = 0; i < 14; i++) {
        const px = (i * 173 + 41) % W;
        const py = GROUND + 8 + ((i * 89) % bandH2);
        const sc = 0.7 + ((py - GROUND) / bandH2) * 0.7;
        if (i % 3 === 0) {
          glowCircle(g, px, py, 12 * sc, "#fff2c8", 0.14);
        } else {
          g.fillStyle = "rgba(255,236,180,0.35)";
          g.beginPath(); g.arc(px, py, 0.9 * sc, 0, TAU); g.fill();
        }
        if (!reduce && ((t * 0.003 + i * 1.9) % 4) < 0.4) {
          g.fillStyle = "#fff6d8";
          g.fillRect(px + 4, py - 3, 1.4, 1.4);
        }
      }
    }
    // ---- TERRA NUA: barro/pó rachado quando a terra ainda não reverdeceu ----
    if ((env.terrain === "field" || env.terrain === "garden") && verd < 0.92) {
      const bare = clamp01((0.92 - verd) / 0.4);
      const clodC = mixHex("#7a6440", "#1a140a", night * 0.55);
      const clodLit = mixHex("#a58c5e", "#241c10", night * 0.5);
      const crackC = mixHex("#4a3a22", "#0e0a04", night * 0.5);
      // manchas largas de barro (mosqueado do solo revirado)
      g.globalAlpha = bare * 0.16;
      for (let i = 0; i < 10; i++) {
        const bx = (i * 197 + 41) % W;
        const by = GROUND + 6 + ((i * 101) % bandH2);
        const v0 = hsh(i, 31);
        g.fillStyle = v0 > 0.5 ? clodC : clodLit;
        g.beginPath(); g.ellipse(bx, by, 16 + v0 * 26, 3.5 + v0 * 4, v0 * 0.5, 0, TAU); g.fill();
      }
      g.globalAlpha = bare * 0.9;
      for (let i = 0; i < 28; i++) {
        const px = (i * 167 + 53) % W;
        const py = GROUND + 7 + ((i * 79) % bandH2);
        const sc = 0.7 + ((py - GROUND) / bandH2) * 0.75;
        const v = hsh(i, 5);
        if (v < 0.4) {
          // torrão de barro com face iluminada
          g.fillStyle = clodC;
          g.beginPath(); g.ellipse(px, py, (1.8 + v * 3) * sc, (1 + v * 1.2) * sc, v * 2, 0, TAU); g.fill();
          g.fillStyle = clodLit;
          g.beginPath(); g.ellipse(px - 0.6 * sc, py - 0.6 * sc, (0.9 + v * 1.4) * sc, (0.4 + v * 0.5) * sc, v * 2, 0, TAU); g.fill();
        } else if (v < 0.72) {
          // fenda do solo seco
          g.strokeStyle = crackC; g.lineWidth = 0.7 * sc; g.lineCap = "round";
          g.beginPath();
          g.moveTo(px - 4 * sc, py);
          g.quadraticCurveTo(px, py - 1.6 * sc, px + 4.5 * sc, py + 0.6 * sc);
          g.stroke();
          g.beginPath();
          g.moveTo(px + 0.8 * sc, py - 0.5 * sc); g.lineTo(px + 2.4 * sc, py - 2.6 * sc);
          g.stroke();
        } else {
          // pó/areia solta
          g.fillStyle = clodLit;
          g.beginPath(); g.ellipse(px, py, 2.6 * sc, 0.7 * sc, 0.2, 0, TAU); g.fill();
        }
      }
      g.globalAlpha = 1;
    }
    g.restore();
  }

  // ---- MAR / GRANDE MASSA DE ÁGUA sobre a faixa de chão (env.water) ----
  if (water > 0.05 && env.terrain !== "patmos" && env.terrain !== "glory" && env.terrain !== "throne") {
    drawGroundWaterHD(g, dims, t, reduce, night, water, clamp01(env.glory));
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

// escala natural de cada objeto — construções e árvores MAIORES que o
// personagem, mas sem "estourar" quando o roteiro já usa scale alto
const PROP_MULT: Record<string, number> = {
  palm: 1.5, rock: 1.7, church: 1.7, tower: 1.9, tree: 1.5, star: 1.5, door: 1.6,
  arkship: 1.6, ladder: 1.4, rainbow: 2.0, ziggurat: 1.9,
  // as duas árvores do MEIO do jardim precisam DOMINAR as árvores comuns
  // (que já têm mult 1.5): elas são o centro da cena, não cenário.
  treeOfLife: 1.35, treeOfKnowledge: 1.2,
};

export function drawPropHD(g: G, kind: string, x: number, fy: number, o: HDPropOpts = {}): void {
  const S = (o.scale ?? 1) * (PROP_MULT[kind] ?? 1);
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
      // CASTIÇAL DE OURO de verdade (Ap 1:12): base em degraus, haste com
      // nós ornamentais (como os do templo), taça larga com azeite e chama
      softShadow(g, x, fy, 14 * S, 0.28);
      g.save();
      const gold = g.createLinearGradient(x - 8 * S, fy - 50 * S, x + 8 * S, fy);
      gold.addColorStop(0, "#ffe4a0"); gold.addColorStop(0.45, "#e0b054"); gold.addColorStop(1, "#9a7020");
      const goldDark = "#8a6218";
      // base em 3 degraus
      g.fillStyle = gold;
      g.beginPath(); g.ellipse(x, fy - 1.6 * S, 12 * S, 3.2 * S, 0, 0, TAU); g.fill();
      g.beginPath(); g.ellipse(x, fy - 4.6 * S, 8.6 * S, 2.6 * S, 0, 0, TAU); g.fill();
      g.beginPath(); g.ellipse(x, fy - 7.2 * S, 5.6 * S, 2 * S, 0, 0, TAU); g.fill();
      g.strokeStyle = "rgba(120,84,20,0.5)"; g.lineWidth = 0.8 * S;
      g.beginPath(); g.ellipse(x, fy - 1.6 * S, 12 * S, 3.2 * S, 0, 0, Math.PI); g.stroke();
      g.beginPath(); g.ellipse(x, fy - 4.6 * S, 8.6 * S, 2.6 * S, 0, 0, Math.PI); g.stroke();
      // haste afunilada
      g.fillStyle = gold;
      g.beginPath();
      g.moveTo(x - 2.6 * S, fy - 7 * S);
      g.quadraticCurveTo(x - 1.6 * S, fy - 26 * S, x - 1.8 * S, fy - 43 * S);
      g.lineTo(x + 1.8 * S, fy - 43 * S);
      g.quadraticCurveTo(x + 1.6 * S, fy - 26 * S, x + 2.6 * S, fy - 7 * S);
      g.closePath(); g.fill();
      // brilho da haste
      g.strokeStyle = "rgba(255,244,208,0.55)"; g.lineWidth = 0.9 * S;
      g.beginPath(); g.moveTo(x - 0.9 * S, fy - 9 * S); g.lineTo(x - 0.7 * S, fy - 41 * S); g.stroke();
      // nós ornamentais (cálices e botões)
      for (const [ky, kr] of [[-14, 4.2], [-24, 3.6], [-33, 3.1]] as const) {
        const kg = g.createRadialGradient(x - kr * 0.4 * S, fy + ky * S - kr * 0.4 * S, 0.5, x, fy + ky * S, kr * S);
        kg.addColorStop(0, "#ffe9b8"); kg.addColorStop(1, "#b8842e");
        g.fillStyle = kg;
        g.beginPath(); g.ellipse(x, fy + ky * S, kr * S, kr * 0.82 * S, 0, 0, TAU); g.fill();
        g.strokeStyle = "rgba(120,84,20,0.4)"; g.lineWidth = 0.6 * S;
        g.beginPath(); g.ellipse(x, fy + ky * S + kr * 0.28 * S, kr * 0.8 * S, kr * 0.3 * S, 0, 0.3, Math.PI - 0.3); g.stroke();
      }
      // taça larga (cálice) no topo
      g.fillStyle = gold;
      g.beginPath();
      g.moveTo(x - 9.5 * S, fy - 50 * S);
      g.quadraticCurveTo(x - 8.5 * S, fy - 43.5 * S, x, fy - 42.5 * S);
      g.quadraticCurveTo(x + 8.5 * S, fy - 43.5 * S, x + 9.5 * S, fy - 50 * S);
      g.closePath(); g.fill();
      g.beginPath(); g.ellipse(x, fy - 50 * S, 9.5 * S, 2.6 * S, 0, 0, TAU); g.fill();
      g.strokeStyle = goldDark; g.lineWidth = 0.9 * S;
      g.beginPath(); g.ellipse(x, fy - 50 * S, 9.5 * S, 2.6 * S, 0, 0, TAU); g.stroke();
      // azeite dentro da taça (com reflexo)
      g.fillStyle = "#7a4e14";
      g.beginPath(); g.ellipse(x, fy - 50 * S, 7.6 * S, 1.9 * S, 0, 0, TAU); g.fill();
      g.fillStyle = "rgba(255,220,140,0.45)";
      g.beginPath(); g.ellipse(x - 2 * S, fy - 50.4 * S, 3 * S, 0.8 * S, 0, 0, TAU); g.fill();
      // chama grande e viva
      if ((o.fire ?? 1) > 0.05) {
        const fl = reduce ? 0 : Math.sin(t * 0.012 + x) * 1.6 * S;
        const fw2 = reduce ? 0 : Math.sin(t * 0.02 + x * 2) * 0.8 * S;
        glowCircle(g, x, fy - 55 * S, 16 * S, "#ffca70", 0.6);
        const flame = g.createLinearGradient(x, fy - 62 * S, x, fy - 49 * S);
        flame.addColorStop(0, "#ffe9b0"); flame.addColorStop(0.5, "#ffb14a"); flame.addColorStop(1, "#e86a2e");
        g.fillStyle = flame;
        g.beginPath();
        g.moveTo(x + fw2 * 0.4, fy - 61.5 * S - fl);
        g.bezierCurveTo(x + 3.6 * S + fw2, fy - 56 * S, x + 3.2 * S, fy - 52 * S, x, fy - 49.6 * S);
        g.bezierCurveTo(x - 3.2 * S, fy - 52 * S, x - 3.6 * S + fw2, fy - 56 * S, x + fw2 * 0.4, fy - 61.5 * S - fl);
        g.fill();
        // núcleo claro
        g.fillStyle = "#fff6dd";
        g.beginPath();
        g.moveTo(x, fy - 56.5 * S - fl * 0.5);
        g.quadraticCurveTo(x + 1.7 * S, fy - 52.5 * S, x, fy - 50.4 * S);
        g.quadraticCurveTo(x - 1.7 * S, fy - 52.5 * S, x, fy - 56.5 * S - fl * 0.5);
        g.fill();
      }
      g.restore();
      return;
    }
    case "menorah": {
      // O CANDELABRO DE OURO DE SETE BRAÇOS (Êx 25:31-40; 37:17-24): uma haste
      // central e SEIS canas — três de cada lado — saindo dela, cada braço
      // com seus cálices "à feição de amêndoas", suas maçãs (nós) e flores, e
      // as SETE lâmpadas alumiando "defronte dele". Tudo de ouro puro batido.
      softShadow(g, x, fy, 22 * S, 0.3);
      g.save();
      const gold = g.createLinearGradient(x - 22 * S, fy - 56 * S, x + 22 * S, fy);
      gold.addColorStop(0, "#ffe9b4"); gold.addColorStop(0.45, "#e3b658"); gold.addColorStop(1, "#9a7020");
      const goldDark = "rgba(120,84,20,0.55)";
      const yTop = fy - 54 * S;                        // a linha das sete lâmpadas
      // base em degraus + pé
      g.fillStyle = gold;
      g.beginPath(); g.ellipse(x, fy - 1.6 * S, 15 * S, 4 * S, 0, 0, TAU); g.fill();
      g.beginPath(); g.ellipse(x, fy - 5 * S, 10 * S, 3 * S, 0, 0, TAU); g.fill();
      g.beginPath(); g.ellipse(x, fy - 8 * S, 6 * S, 2.2 * S, 0, 0, TAU); g.fill();
      g.strokeStyle = goldDark; g.lineWidth = 0.8 * S;
      g.beginPath(); g.ellipse(x, fy - 1.6 * S, 15 * S, 4 * S, 0, 0, Math.PI); g.stroke();
      // os SEIS braços curvos + a haste central, todos subindo à mesma linha
      const arms: Array<[number, number]> = [
        [-22, fy - 20 * S], [22, fy - 20 * S],         // par externo
        [-14.5, fy - 26 * S], [14.5, fy - 26 * S],      // par médio
        [-7.5, fy - 32 * S], [7.5, fy - 32 * S],        // par interno
      ];
      g.lineCap = "round";
      g.strokeStyle = gold; g.lineWidth = 3.2 * S;
      for (const [dxTop, yEmerge] of arms) {
        g.beginPath();
        g.moveTo(x, yEmerge);
        g.quadraticCurveTo(x + dxTop * S, yEmerge, x + dxTop * S, yTop + 3 * S);
        g.stroke();
      }
      // haste central
      g.beginPath(); g.moveTo(x, fy - 8 * S); g.lineTo(x, yTop + 3 * S); g.stroke();
      // brilho fino nos braços
      g.strokeStyle = "rgba(255,246,214,0.5)"; g.lineWidth = 1 * S;
      g.beginPath(); g.moveTo(x - 0.6 * S, fy - 10 * S); g.lineTo(x - 0.6 * S, yTop + 3 * S); g.stroke();
      // maçãs (nós ornamentais) ao longo da haste central
      for (const ky of [-14, -24, -34] as const) {
        const kr = 3.4;
        const kg = g.createRadialGradient(x - kr * 0.4 * S, fy + ky * S - kr * 0.4 * S, 0.5, x, fy + ky * S, kr * S);
        kg.addColorStop(0, "#ffedc0"); kg.addColorStop(1, "#b8842e");
        g.fillStyle = kg;
        g.beginPath(); g.ellipse(x, fy + ky * S, kr * S, kr * 0.82 * S, 0, 0, TAU); g.fill();
      }
      // as SETE lâmpadas: cálice de amêndoa + azeite + chama
      const tops = [-22, -14.5, -7.5, 0, 7.5, 14.5, 22];
      for (const dxc of tops) {
        const cx = x + dxc * S;
        // cálice
        g.fillStyle = gold;
        g.beginPath();
        g.moveTo(cx - 3.6 * S, yTop);
        g.quadraticCurveTo(cx - 3.2 * S, yTop + 3 * S, cx, yTop + 3.4 * S);
        g.quadraticCurveTo(cx + 3.2 * S, yTop + 3 * S, cx + 3.6 * S, yTop);
        g.closePath(); g.fill();
        g.beginPath(); g.ellipse(cx, yTop, 3.6 * S, 1.2 * S, 0, 0, TAU); g.fill();
        g.strokeStyle = goldDark; g.lineWidth = 0.6 * S;
        g.beginPath(); g.ellipse(cx, yTop, 3.6 * S, 1.2 * S, 0, 0, TAU); g.stroke();
        // azeite
        g.fillStyle = "#7a4e14";
        g.beginPath(); g.ellipse(cx, yTop, 2.6 * S, 0.8 * S, 0, 0, TAU); g.fill();
        // chama
        if ((o.fire ?? 1) > 0.05) {
          const fl = reduce ? 0 : Math.sin(t * 0.013 + cx * 0.7) * 1.1 * S;
          glowCircle(g, cx, yTop - 4 * S, 8 * S, "#ffca70", 0.5);
          const flame = g.createLinearGradient(cx, yTop - 8 * S, cx, yTop);
          flame.addColorStop(0, "#ffe9b0"); flame.addColorStop(0.5, "#ffb14a"); flame.addColorStop(1, "#e86a2e");
          g.fillStyle = flame;
          g.beginPath();
          g.moveTo(cx, yTop - 7.5 * S - fl);
          g.bezierCurveTo(cx + 2.2 * S, yTop - 4 * S, cx + 1.9 * S, yTop - 1.5 * S, cx, yTop - 0.4 * S);
          g.bezierCurveTo(cx - 1.9 * S, yTop - 1.5 * S, cx - 2.2 * S, yTop - 4 * S, cx, yTop - 7.5 * S - fl);
          g.fill();
          g.fillStyle = "#fff6dd";
          g.beginPath();
          g.moveTo(cx, yTop - 4.6 * S - fl * 0.5);
          g.quadraticCurveTo(cx + 1 * S, yTop - 2 * S, cx, yTop - 0.6 * S);
          g.quadraticCurveTo(cx - 1 * S, yTop - 2 * S, cx, yTop - 4.6 * S - fl * 0.5);
          g.fill();
        }
      }
      g.restore();
      return;
    }
    case "calf": {
      // O BEZERRO DE OURO (Êx 32:4): ídolo de fundição sobre um pedestal — um
      // novilho de ouro, de cabeça erguida entre dois chifres. Obra morta de
      // mãos humanas, a que o povo chamou "o teu deus, ó Israel".
      softShadow(g, x, fy, 16 * S, 0.32);
      g.save();
      const gold = g.createLinearGradient(x - 16 * S, fy - 34 * S, x + 14 * S, fy);
      gold.addColorStop(0, "#ffe9b4"); gold.addColorStop(0.5, "#e2b450"); gold.addColorStop(1, "#9a7020");
      const dark = "#7c5716";
      // pedestal
      g.fillStyle = gold;
      g.beginPath(); g.ellipse(x, fy - 2 * S, 15 * S, 4 * S, 0, 0, TAU); g.fill();
      rr(g, x - 13 * S, fy - 6.5 * S, 26 * S, 5 * S, 1.5 * S); g.fill();
      g.strokeStyle = "rgba(120,84,20,0.4)"; g.lineWidth = 0.7 * S;
      g.beginPath(); g.ellipse(x, fy - 2 * S, 15 * S, 4 * S, 0, 0, Math.PI); g.stroke();
      // pernas (visíveis sobre o pedestal)
      g.fillStyle = gold;
      for (const lx of [-8, -3, 4, 9]) { rr(g, x + lx * S - 1.5 * S, fy - 17 * S, 3 * S, 11 * S, 1 * S); g.fill(); }
      g.strokeStyle = "rgba(120,84,20,0.35)"; g.lineWidth = 0.6 * S;
      for (const lx of [-3, 9]) { g.beginPath(); g.moveTo(x + lx * S + 1.5 * S, fy - 16 * S); g.lineTo(x + lx * S + 1.5 * S, fy - 7 * S); g.stroke(); }
      // cauda
      g.strokeStyle = gold; g.lineWidth = 1.8 * S; g.lineCap = "round";
      g.beginPath(); g.moveTo(x + 12 * S, fy - 22 * S); g.quadraticCurveTo(x + 17 * S, fy - 15 * S, x + 14.5 * S, fy - 9 * S); g.stroke();
      // corpo (mais horizontal, assente sobre as pernas)
      g.fillStyle = gold;
      g.beginPath(); g.ellipse(x + 1 * S, fy - 22 * S, 12.5 * S, 6.6 * S, 0, 0, TAU); g.fill();
      // pescoço + cabeça erguida (à esquerda)
      g.beginPath();
      g.moveTo(x - 8 * S, fy - 22.5 * S);
      g.quadraticCurveTo(x - 16 * S, fy - 26 * S, x - 15.5 * S, fy - 31.5 * S);
      g.lineTo(x - 10 * S, fy - 33 * S);
      g.quadraticCurveTo(x - 5 * S, fy - 29 * S, x - 5 * S, fy - 23.5 * S);
      g.closePath(); g.fill();
      // focinho
      g.beginPath(); g.ellipse(x - 16 * S, fy - 30 * S, 3.4 * S, 2.7 * S, 0, 0, TAU); g.fill();
      // brilho no corpo
      g.strokeStyle = "rgba(255,247,216,0.5)"; g.lineWidth = 1.1 * S;
      g.beginPath(); g.ellipse(x - 1 * S, fy - 21 * S, 7.5 * S, 3.2 * S, -0.28, Math.PI * 1.08, Math.PI * 1.92); g.stroke();
      // chifres
      g.strokeStyle = "#fff3cc"; g.lineWidth = 1.6 * S;
      g.beginPath(); g.moveTo(x - 12.6 * S, fy - 33 * S); g.quadraticCurveTo(x - 16 * S, fy - 37 * S, x - 12.6 * S, fy - 38.6 * S); g.stroke();
      g.beginPath(); g.moveTo(x - 9.6 * S, fy - 33 * S); g.quadraticCurveTo(x - 7.4 * S, fy - 37.4 * S, x - 10.8 * S, fy - 39 * S); g.stroke();
      // orelha
      g.fillStyle = gold; g.beginPath(); g.ellipse(x - 8.4 * S, fy - 31.6 * S, 2.1 * S, 1.3 * S, 0.5, 0, TAU); g.fill();
      // olho
      g.fillStyle = dark; g.beginPath(); g.arc(x - 12.6 * S, fy - 30.6 * S, 0.9 * S, 0, TAU); g.fill();
      // narina
      g.beginPath(); g.arc(x - 16.6 * S, fy - 29.6 * S, 0.6 * S, 0, TAU); g.fill();
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
    case "ziggurat": {
      // A TORRE DE BABEL (Gn 11:4): um zigurate mesopotâmico — terraços de
      // tijolo cru que recuam ao subir, escadaria central monumental e o CUME
      // INACABADO (rampa e tijolos empilhados) "cujo cume toque nos céus".
      // Imponente de propósito: é o monumento à soberba do homem.
      softShadow(g, x, fy, 40 * S, 0.26);
      g.save();
      // 4 terraços (base larga → topo estreito). Cada um: face frontal com
      // gradiente de tijolo + fiadas horizontais; e o "terraço" (topo ao sol)
      // aparece como uma faixa clara na borda de cima.
      const tiers = [
        { hw: 34, y0: 0, y1: 15 },
        { hw: 26, y0: 15, y1: 29 },
        { hw: 18.5, y0: 29, y1: 42 },
      ];
      const brickFace = (cx: number, hw: number, yTop: number, yBot: number, lit: number) => {
        const grd = g.createLinearGradient(cx - hw * S, 0, cx + hw * S, 0);
        grd.addColorStop(0, `rgba(150,116,74,${lit})`);
        grd.addColorStop(0.5, `rgba(190,156,108,${lit})`);
        grd.addColorStop(1, `rgba(120,92,58,${lit})`);
        g.fillStyle = grd;
        rr(g, cx - hw * S, fy - yBot * S, hw * 2 * S, (yBot - yTop) * S, 1.2 * S); g.fill();
        // fiadas de tijolo (linhas horizontais) + juntas verticais alternadas
        g.strokeStyle = "rgba(74,54,32,0.4)"; g.lineWidth = 0.5 * S;
        for (let yy = yTop + 2.4; yy < yBot; yy += 2.4) {
          g.beginPath(); g.moveTo(cx - hw * S, fy - yy * S); g.lineTo(cx + hw * S, fy - yy * S); g.stroke();
        }
      };
      // desenha de baixo (base) para cima; a faixa clara no topo de cada
      // terraço é a superfície ao sol, sobre a qual assenta o terraço seguinte.
      for (const tr of tiers) {
        brickFace(x, tr.hw, tr.y0, tr.y1, 1);
        // terraço iluminado (topo) — recuado nas laterais
        g.fillStyle = "rgba(225,198,150,0.92)";
        rr(g, x - tr.hw * S, fy - tr.y1 * S - 2.2 * S, tr.hw * 2 * S, 2.6 * S, 1 * S); g.fill();
        // sombra fina do terraço de cima projetada neste
        g.fillStyle = "rgba(60,42,24,0.18)";
        g.fillRect(x - (tr.hw - 2) * S, fy - tr.y1 * S, (tr.hw - 2) * 2 * S, 1.4 * S);
      }
      // ---- CUME INACABADO: tijolos empilhados irregulares + rampa de obra
      const topY = 42;
      g.fillStyle = "rgba(120,92,58,1)";
      for (let i = 0; i < 7; i++) {
        const bx = x + (i - 3) * 3.1 * S;
        const bh = (3 + hsh(i, 12) * 3.4) * S;
        rr(g, bx - 1.6 * S, fy - (topY + 1) * S - bh, 3.2 * S, bh, 0.5 * S); g.fill();
      }
      // rampa de terra encostada (a obra que subia)
      g.fillStyle = "rgba(122,96,60,0.9)";
      g.beginPath();
      g.moveTo(x + 8 * S, fy - topY * S);
      g.lineTo(x + 26 * S, fy - 15 * S);
      g.lineTo(x + 30 * S, fy - 15 * S);
      g.lineTo(x + 11 * S, fy - topY * S);
      g.closePath(); g.fill();
      // ---- ESCADARIA central monumental (da base ao terraço mais alto)
      g.fillStyle = "rgba(96,72,44,0.95)";
      rr(g, x - 6 * S, fy - 42 * S, 12 * S, 42 * S, 1 * S); g.fill();
      g.strokeStyle = "rgba(210,186,142,0.55)"; g.lineWidth = 0.8 * S;
      for (let yy = 2; yy < 42; yy += 2.2) {
        g.beginPath(); g.moveTo(x - 6 * S, fy - yy * S); g.lineTo(x + 6 * S, fy - yy * S); g.stroke();
      }
      // luz quente no cume (tochas da obra) — acesa via `fire` no roteiro
      const fire = o.fire ?? 0;
      if (fire > 0.05) glowCircle(g, x, fy - (topY + 3) * S, 16 * S, "#ffcf7a", 0.4 * fire);
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
    case "amphora": {
      // ânfora de barro (vaso grande de água/azeite)
      softShadow(g, x, fy, 9 * S, 0.3);
      g.save();
      const clay = g.createLinearGradient(x - 6 * S, fy - 18 * S, x + 6 * S, fy);
      clay.addColorStop(0, "#c8845a"); clay.addColorStop(0.5, "#a45f36"); clay.addColorStop(1, "#6e3c1e");
      g.fillStyle = clay;
      g.beginPath();
      g.moveTo(x - 2.4 * S, fy - 18 * S);
      g.bezierCurveTo(x - 7.5 * S, fy - 15 * S, x - 6.5 * S, fy - 5 * S, x - 2.2 * S, fy - 1 * S);
      g.lineTo(x + 2.2 * S, fy - 1 * S);
      g.bezierCurveTo(x + 6.5 * S, fy - 5 * S, x + 7.5 * S, fy - 15 * S, x + 2.4 * S, fy - 18 * S);
      g.closePath(); g.fill();
      // gargalo + boca
      rr(g, x - 1.9 * S, fy - 21 * S, 3.8 * S, 3.6 * S, 1 * S); g.fill();
      g.beginPath(); g.ellipse(x, fy - 21 * S, 3 * S, 1.2 * S, 0, 0, TAU); g.fill();
      // alças
      g.strokeStyle = "#8a4f2a"; g.lineWidth = 1.6 * S; g.lineCap = "round";
      g.beginPath(); g.moveTo(x - 3.4 * S, fy - 17.5 * S); g.quadraticCurveTo(x - 7 * S, fy - 19 * S, x - 5.6 * S, fy - 13.5 * S); g.stroke();
      g.beginPath(); g.moveTo(x + 3.4 * S, fy - 17.5 * S); g.quadraticCurveTo(x + 7 * S, fy - 19 * S, x + 5.6 * S, fy - 13.5 * S); g.stroke();
      // faixas decorativas
      g.strokeStyle = "rgba(60,30,12,0.45)"; g.lineWidth = 0.9 * S;
      g.beginPath(); g.ellipse(x, fy - 12.5 * S, 6.2 * S, 1.6 * S, 0, 0.2, Math.PI - 0.2); g.stroke();
      g.beginPath(); g.ellipse(x, fy - 9 * S, 6.4 * S, 1.7 * S, 0, 0.2, Math.PI - 0.2); g.stroke();
      // brilho lateral
      g.fillStyle = "rgba(255,230,190,0.28)";
      g.beginPath(); g.ellipse(x - 3 * S, fy - 13 * S, 1.6 * S, 4 * S, 0.2, 0, TAU); g.fill();
      g.restore();
      return;
    }
    case "crate": {
      // caixote de madeira
      softShadow(g, x, fy, 10 * S, 0.3);
      g.save();
      const wood = g.createLinearGradient(x, fy - 15 * S, x, fy);
      wood.addColorStop(0, "#a87c4e"); wood.addColorStop(1, "#6d4c2a");
      g.fillStyle = wood;
      rr(g, x - 8.5 * S, fy - 15 * S, 17 * S, 15 * S, 1.2 * S); g.fill();
      g.strokeStyle = "rgba(50,32,14,0.5)"; g.lineWidth = 0.9 * S;
      for (const yy of [-10, -5]) { g.beginPath(); g.moveTo(x - 8 * S, fy + yy * S); g.lineTo(x + 8 * S, fy + yy * S); g.stroke(); }
      g.strokeStyle = "#54371c"; g.lineWidth = 1.3 * S;
      rr(g, x - 8.5 * S, fy - 15 * S, 17 * S, 15 * S, 1.2 * S); g.stroke();
      g.beginPath(); g.moveTo(x - 7.5 * S, fy - 1.5 * S); g.lineTo(x + 7.5 * S, fy - 13.5 * S); g.stroke();
      g.fillStyle = "rgba(255,235,200,0.2)";
      rr(g, x - 7.5 * S, fy - 14.4 * S, 15 * S, 1.6 * S, 0.8 * S); g.fill();
      g.restore();
      return;
    }
    case "well": {
      // poço de pedra com sarilho, corda e balde
      softShadow(g, x, fy, 20 * S, 0.32);
      g.save();
      // postes de madeira + telhadinho
      g.fillStyle = "#6d4c2a";
      for (const s of [-1, 1]) { rr(g, x + s * 11 * S - 1.4 * S, fy - 34 * S, 2.8 * S, 26 * S, 1.2 * S); g.fill(); }
      const roof2 = g.createLinearGradient(x, fy - 43 * S, x, fy - 32 * S);
      roof2.addColorStop(0, "#a8613f"); roof2.addColorStop(1, "#6e3a24");
      g.fillStyle = roof2;
      g.beginPath();
      g.moveTo(x - 16 * S, fy - 33 * S);
      g.lineTo(x, fy - 42 * S);
      g.lineTo(x + 16 * S, fy - 33 * S);
      g.closePath(); g.fill();
      // sarilho (rolo) + corda + balde
      g.fillStyle = "#8a643a";
      rr(g, x - 10 * S, fy - 32.4 * S, 20 * S, 2.6 * S, 1.2 * S); g.fill();
      g.strokeStyle = "#d9c8a0"; g.lineWidth = 0.9 * S;
      g.beginPath(); g.moveTo(x, fy - 31 * S); g.lineTo(x, fy - 20 * S); g.stroke();
      g.fillStyle = "#77522c";
      g.beginPath();
      g.moveTo(x - 3 * S, fy - 20 * S); g.lineTo(x + 3 * S, fy - 20 * S);
      g.lineTo(x + 2.4 * S, fy - 15.6 * S); g.lineTo(x - 2.4 * S, fy - 15.6 * S);
      g.closePath(); g.fill();
      // anel de pedra
      const stone2 = g.createLinearGradient(x, fy - 13 * S, x, fy);
      stone2.addColorStop(0, "#b3a582"); stone2.addColorStop(1, "#7c7058");
      g.fillStyle = stone2;
      g.beginPath();
      g.moveTo(x - 14 * S, fy - 11 * S);
      g.lineTo(x - 14 * S, fy - 3.6 * S);
      g.ellipse(x, fy - 3.6 * S, 14 * S, 4.4 * S, 0, Math.PI, 0, true);
      g.lineTo(x + 14 * S, fy - 11 * S);
      g.closePath(); g.fill();
      g.beginPath(); g.ellipse(x, fy - 11 * S, 14 * S, 4.4 * S, 0, 0, TAU); g.fill();
      // boca escura do poço
      g.fillStyle = "#241c10";
      g.beginPath(); g.ellipse(x, fy - 11 * S, 10.4 * S, 3.1 * S, 0, 0, TAU); g.fill();
      // juntas das pedras
      g.strokeStyle = "rgba(60,50,32,0.45)"; g.lineWidth = 0.8 * S;
      for (const dx of [-9, -3, 3, 9]) { g.beginPath(); g.moveTo(x + dx * S, fy - 9 * S); g.lineTo(x + dx * S + 0.6 * S, fy - 2 * S); g.stroke(); }
      g.beginPath(); g.moveTo(x - 13.4 * S, fy - 6.6 * S); g.quadraticCurveTo(x, fy - 3.4 * S, x + 13.4 * S, fy - 6.6 * S); g.stroke();
      g.restore();
      return;
    }
    case "stall": {
      // banca de mercado com toldo listrado e mercadorias
      softShadow(g, x, fy, 24 * S, 0.3);
      g.save();
      // postes
      g.fillStyle = "#6d4c2a";
      for (const s of [-1, 1]) { rr(g, x + s * 17 * S - 1.4 * S, fy - 36 * S, 2.8 * S, 36 * S, 1.2 * S); g.fill(); }
      // bancada
      const wood2 = g.createLinearGradient(x, fy - 16 * S, x, fy - 2 * S);
      wood2.addColorStop(0, "#a87c4e"); wood2.addColorStop(1, "#77522c");
      g.fillStyle = wood2;
      rr(g, x - 16 * S, fy - 11 * S, 32 * S, 11 * S, 1.4 * S); g.fill();
      g.strokeStyle = "rgba(50,32,14,0.4)"; g.lineWidth = 0.8 * S;
      for (const dx of [-8, 0, 8]) { g.beginPath(); g.moveTo(x + dx * S, fy - 10.4 * S); g.lineTo(x + dx * S, fy - 1.4 * S); g.stroke(); }
      g.fillStyle = "#8a643a";
      rr(g, x - 18 * S, fy - 15 * S, 36 * S, 4.2 * S, 1.4 * S); g.fill();   // tampo
      // mercadorias: romãs, uvas e um vasinho
      g.fillStyle = "#c8452e";
      for (const dx of [-12, -8.5]) { g.beginPath(); g.arc(x + dx * S, fy - 16.6 * S, 1.7 * S, 0, TAU); g.fill(); }
      g.fillStyle = "#7a4ab0";
      for (const [dx, dy2] of [[-2, -16.6], [0.5, -17.4], [-0.8, -18]] as const) { g.beginPath(); g.arc(x + dx * S, fy + dy2 * S, 1.2 * S, 0, TAU); g.fill(); }
      g.fillStyle = "#a45f36";
      rr(g, x + 6 * S, fy - 20.6 * S, 5 * S, 5.6 * S, 1.6 * S); g.fill();
      g.fillStyle = "#7a4626";
      g.beginPath(); g.ellipse(x + 8.5 * S, fy - 20.6 * S, 2.1 * S, 0.8 * S, 0, 0, TAU); g.fill();
      // toldo listrado com barrado
      g.beginPath();
      g.moveTo(x - 20 * S, fy - 42 * S);
      g.lineTo(x + 20 * S, fy - 42 * S);
      g.lineTo(x + 22 * S, fy - 33 * S);
      g.lineTo(x - 22 * S, fy - 33 * S);
      g.closePath();
      g.save(); g.clip();
      for (let i2 = 0; i2 < 8; i2++) {
        g.fillStyle = i2 % 2 ? "#e8dcc0" : "#c0483c";
        g.fillRect(x - 22 * S + i2 * 5.5 * S, fy - 43 * S, 5.5 * S, 11 * S);
      }
      g.restore();
      // sombra sob o toldo + ondinha da borda
      g.strokeStyle = "rgba(0,0,0,0.3)"; g.lineWidth = 1 * S;
      g.beginPath();
      for (let sx2 = -22; sx2 <= 22; sx2 += 5.5) {
        g.moveTo(x + sx2 * S, fy - 33 * S);
        g.quadraticCurveTo(x + (sx2 + 2.75) * S, fy - 30.8 * S, x + (sx2 + 5.5) * S, fy - 33 * S);
      }
      g.stroke();
      g.restore();
      return;
    }
    case "bush": {
      // arbusto com bagas — e, com o.fire, A SARÇA ARDENTE (Êx 3:2): arde no
      // fogo mas NÃO se consome (a folhagem verde permanece dentro da chama).
      const burning = (o.fire ?? 0) > 0.05;
      softShadow(g, x, fy, 12 * S, 0.3);
      g.save();
      if (burning) glowCircle(g, x, fy - 8 * S, 26 * S, "#ffb24a", 0.5 * Math.min(1, o.fire ?? 0));
      const sway2 = reduce ? 0 : Math.sin(t * 0.002 + x) * 0.8 * S;
      for (const [dx, dy2, r] of [[-5, -6, 6.4], [5.5, -6.5, 6], [0, -10, 7]] as const) {
        const bg3 = g.createRadialGradient(x + dx * S - 2, fy + dy2 * S - 2, 1, x + dx * S, fy + dy2 * S, r * S);
        bg3.addColorStop(0, "#79b565"); bg3.addColorStop(1, "#37663a");
        g.fillStyle = bg3;
        g.beginPath(); g.arc(x + dx * S + (dy2 < -8 ? sway2 : 0), fy + dy2 * S, r * S, 0, TAU); g.fill();
      }
      if (burning) {
        // línguas de fogo envolvendo a folhagem, sem consumi-la
        const tongues: Array<[number, number, number]> = [[-6, -7, 1], [0, -13, 1.35], [6, -8, 1.05], [-2, -10, 0.8], [3, -6, 0.7]];
        for (let i = 0; i < tongues.length; i++) {
          const [fx, fyo, fs] = tongues[i];
          const cx = x + fx * S, base = fy + fyo * S;
          const fl = reduce ? 0 : Math.sin(t * 0.016 + i * 1.7 + x) * 2 * S;
          const h = (11 + fs * 4) * S;
          const flame = g.createLinearGradient(cx, base - h - fl, cx, base);
          flame.addColorStop(0, "#fff2c4"); flame.addColorStop(0.45, "#ffb44a"); flame.addColorStop(1, "rgba(232,90,40,0.35)");
          g.fillStyle = flame;
          g.beginPath();
          g.moveTo(cx, base - h - fl);
          g.bezierCurveTo(cx + 4 * fs * S, base - h * 0.5, cx + 3 * fs * S, base - h * 0.2, cx, base);
          g.bezierCurveTo(cx - 3 * fs * S, base - h * 0.2, cx - 4 * fs * S, base - h * 0.5, cx, base - h - fl);
          g.fill();
        }
        // brasas cintilando
        if (!reduce) {
          g.fillStyle = "rgba(255,226,150,0.9)";
          for (let i = 0; i < 4; i++) {
            const ex = x + Math.sin(t * 0.003 + i * 2) * 8 * S;
            const ey = fy - 12 * S - ((t * 0.02 + i * 40) % 20) * S;
            g.beginPath(); g.arc(ex, ey, 0.8 * S, 0, TAU); g.fill();
          }
        }
      } else {
        g.fillStyle = "#d9536a";
        for (const [bx2, by2] of [[-6, -5], [2, -9], [6, -4.5]] as const) {
          g.beginPath(); g.arc(x + bx2 * S, fy + by2 * S, 1 * S, 0, TAU); g.fill();
        }
      }
      g.restore();
      return;
    }
    case "grass": {
      // tufo de capim balançando
      g.save();
      g.lineCap = "round";
      const sw = reduce ? 0 : Math.sin(t * 0.003 + x * 0.7) * 1.4 * S;
      for (let i2 = 0; i2 < 6; i2++) {
        const bx2 = x + (i2 - 2.5) * 1.7 * S;
        const hh2 = (6 + ((i2 * 29) % 4)) * S;
        g.strokeStyle = i2 % 2 ? "#6fae57" : "#4e8a42";
        g.lineWidth = 1.1 * S;
        g.beginPath();
        g.moveTo(bx2, fy);
        g.quadraticCurveTo(bx2 + sw * 0.4, fy - hh2 * 0.6, bx2 + sw + (i2 - 2.5) * 0.8 * S, fy - hh2);
        g.stroke();
      }
      g.restore();
      return;
    }
    case "river": {
      // RIO DA ÁGUA DA VIDA (Ap 22:1): faixa de água cristalina serpenteando,
      // "brilhante como cristal" — reflexos, cintilância e margens claras
      g.save();
      const RW = 130 * S, RH = 16 * S;
      const flow = reduce ? 0 : t * 0.0016;
      // leito
      const wg2 = g.createLinearGradient(x, fy - RH, x, fy);
      wg2.addColorStop(0, "#8ad4f0"); wg2.addColorStop(0.5, "#4aa8dc"); wg2.addColorStop(1, "#2a7ab8");
      g.fillStyle = wg2;
      g.beginPath();
      g.moveTo(x - RW / 2, fy - RH * 0.4);
      g.quadraticCurveTo(x - RW * 0.25, fy - RH, x, fy - RH * 0.62);
      g.quadraticCurveTo(x + RW * 0.25, fy - RH * 0.24, x + RW / 2, fy - RH * 0.72);
      g.lineTo(x + RW / 2, fy + RH * 0.3);
      g.quadraticCurveTo(x + RW * 0.2, fy + RH * 0.62, x, fy + RH * 0.36);
      g.quadraticCurveTo(x - RW * 0.25, fy + RH * 0.1, x - RW / 2, fy + RH * 0.44);
      g.closePath(); g.fill();
      // margens de areia clara
      g.strokeStyle = "rgba(255,246,216,0.5)"; g.lineWidth = 1.4 * S; g.lineCap = "round";
      g.beginPath();
      g.moveTo(x - RW / 2, fy - RH * 0.4);
      g.quadraticCurveTo(x - RW * 0.25, fy - RH, x, fy - RH * 0.62);
      g.quadraticCurveTo(x + RW * 0.25, fy - RH * 0.24, x + RW / 2, fy - RH * 0.72);
      g.stroke();
      // ondinhas correndo (fluxo)
      g.strokeStyle = "rgba(235,250,255,0.65)"; g.lineWidth = 0.9 * S;
      for (let r2 = 0; r2 < 3; r2++) {
        const off = ((flow * 30 + r2 * 17) % 34) - 17;
        g.beginPath();
        for (let wx2 = -RW / 2 + 8; wx2 < RW / 2 - 6; wx2 += 34) {
          g.moveTo(x + wx2 + off, fy - RH * 0.3 + r2 * RH * 0.28);
          g.quadraticCurveTo(x + wx2 + off + 5 * S, fy - RH * 0.42 + r2 * RH * 0.28, x + wx2 + off + 10 * S, fy - RH * 0.3 + r2 * RH * 0.28);
        }
        g.stroke();
      }
      // cintilância de cristal
      if (!reduce) {
        g.fillStyle = "#ffffff";
        for (let i2 = 0; i2 < 5; i2++) {
          if (((t * 0.004 + i2 * 1.6) % 3.2) < 0.35) {
            g.globalAlpha = 0.9;
            g.fillRect(x - RW / 2 + 14 + ((i2 * 97) % (RW - 24)), fy - RH * 0.35 + ((i2 * 41) % (RH * 0.8)), 1.6, 1.6);
          }
        }
        g.globalAlpha = 1;
      }
      glowCircle(g, x, fy - RH * 0.2, RW * 0.32, "#a0e0ff", 0.18);
      g.restore();
      return;
    }
    case "altar": {
      // altar de pedras rústicas com fogo (adoração/sacrifício)
      softShadow(g, x, fy, 16 * S, 0.3);
      g.save();
      const st = (sx: number, sy: number, rw: number, rh: number, tone: number) => {
        const sg2 = g.createLinearGradient(0, sy - rh, 0, sy);
        sg2.addColorStop(0, mixHex("#b3a582", "#000000", tone));
        sg2.addColorStop(1, mixHex("#7c7058", "#000000", tone));
        g.fillStyle = sg2;
        rr(g, sx - rw / 2, sy - rh, rw, rh, rh * 0.35); g.fill();
        g.strokeStyle = "rgba(50,42,26,0.5)"; g.lineWidth = 0.7 * S;
        rr(g, sx - rw / 2, sy - rh, rw, rh, rh * 0.35); g.stroke();
      };
      st(x - 8 * S, fy, 9 * S, 6.5 * S, 0.1); st(x + 1 * S, fy, 10 * S, 7 * S, 0.05); st(x + 9.5 * S, fy, 8 * S, 6 * S, 0.14);
      st(x - 4.5 * S, fy - 6 * S, 9 * S, 6 * S, 0.02); st(x + 5 * S, fy - 6 * S, 9.5 * S, 6.5 * S, 0.08);
      st(x, fy - 12 * S, 11 * S, 6 * S, 0);
      // lenha cruzada
      g.strokeStyle = "#54371c"; g.lineWidth = 2 * S; g.lineCap = "round";
      g.beginPath(); g.moveTo(x - 5 * S, fy - 17 * S); g.lineTo(x + 5 * S, fy - 19 * S); g.stroke();
      g.beginPath(); g.moveTo(x - 4.5 * S, fy - 19 * S); g.lineTo(x + 4.5 * S, fy - 17 * S); g.stroke();
      if ((o.fire ?? 1) > 0.05) {
        const fl = reduce ? 0 : Math.sin(t * 0.013 + x) * 2 * S;
        glowCircle(g, x, fy - 24 * S, 14 * S, "#ffb14a", 0.55);
        const fg3 = g.createLinearGradient(x, fy - 30 * S, x, fy - 17 * S);
        fg3.addColorStop(0, "#ffe9b0"); fg3.addColorStop(0.5, "#ffab3c"); fg3.addColorStop(1, "#e8622e");
        g.fillStyle = fg3;
        g.beginPath();
        g.moveTo(x, fy - 29.5 * S - fl);
        g.bezierCurveTo(x + 4.5 * S, fy - 24 * S, x + 4 * S, fy - 20 * S, x, fy - 17.5 * S);
        g.bezierCurveTo(x - 4 * S, fy - 20 * S, x - 4.5 * S, fy - 24 * S, x, fy - 29.5 * S - fl);
        g.fill();
        g.fillStyle = "#fff6dd";
        g.beginPath();
        g.moveTo(x, fy - 24 * S - fl * 0.5);
        g.quadraticCurveTo(x + 2 * S, fy - 20 * S, x, fy - 18 * S);
        g.quadraticCurveTo(x - 2 * S, fy - 20 * S, x, fy - 24 * S - fl * 0.5);
        g.fill();
        // fumaça subindo
        if (!reduce) {
          for (let i2 = 0; i2 < 3; i2++) {
            const ph = (t * 0.0008 + i2 * 0.33) % 1;
            g.globalAlpha = (1 - ph) * 0.3;
            g.fillStyle = "#c8c8d2";
            g.beginPath(); g.arc(x + Math.sin(ph * 6 + i2) * 4 * S, fy - 30 * S - ph * 22 * S, (2 + ph * 4) * S, 0, TAU); g.fill();
          }
          g.globalAlpha = 1;
        }
      }
      g.restore();
      return;
    }
    case "tent": {
      // tenda nômade de lona com abertura, cordas e estacas
      softShadow(g, x, fy, 24 * S, 0.3);
      g.save();
      const tg2 = g.createLinearGradient(x, fy - 30 * S, x, fy);
      tg2.addColorStop(0, "#c8a878"); tg2.addColorStop(1, "#8a6a44");
      g.fillStyle = tg2;
      g.beginPath();
      g.moveTo(x - 24 * S, fy);
      g.lineTo(x - 2 * S, fy - 30 * S);
      g.quadraticCurveTo(x, fy - 31 * S, x + 2 * S, fy - 30 * S);
      g.lineTo(x + 24 * S, fy);
      g.closePath(); g.fill();
      // abertura escura
      g.fillStyle = "#4a3520";
      g.beginPath();
      g.moveTo(x - 1 * S, fy);
      g.lineTo(x + 0.5 * S, fy - 22 * S);
      g.lineTo(x + 10 * S, fy);
      g.closePath(); g.fill();
      // luz na face esquerda
      g.fillStyle = "rgba(255,240,210,0.25)";
      g.beginPath(); g.moveTo(x - 2 * S, fy - 30 * S); g.lineTo(x - 22 * S, fy); g.lineTo(x - 16 * S, fy); g.lineTo(x - 1 * S, fy - 27 * S); g.closePath(); g.fill();
      // costuras
      g.strokeStyle = "rgba(70,50,26,0.5)"; g.lineWidth = 0.9 * S;
      g.beginPath(); g.moveTo(x - 9 * S, fy - 18 * S); g.lineTo(x - 13.5 * S, fy); g.stroke();
      g.beginPath(); g.moveTo(x + 9 * S, fy - 18 * S); g.lineTo(x + 15 * S, fy); g.stroke();
      // cordas + estacas
      g.strokeStyle = "#d9c8a0"; g.lineWidth = 0.8 * S;
      g.beginPath(); g.moveTo(x - 20 * S, fy - 6 * S); g.lineTo(x - 27 * S, fy); g.stroke();
      g.beginPath(); g.moveTo(x + 20 * S, fy - 6 * S); g.lineTo(x + 27 * S, fy); g.stroke();
      g.strokeStyle = "#54371c"; g.lineWidth = 1.4 * S;
      g.beginPath(); g.moveTo(x - 27 * S, fy); g.lineTo(x - 27 * S, fy - 2.6 * S); g.stroke();
      g.beginPath(); g.moveTo(x + 27 * S, fy); g.lineTo(x + 27 * S, fy - 2.6 * S); g.stroke();
      g.restore();
      return;
    }
    case "boat": {
      // barco de pesca de madeira, mastro com vela recolhida e remo
      softShadow(g, x, fy, 26 * S, 0.3);
      g.save();
      // mastro + vela recolhida (atrás do casco)
      g.strokeStyle = "#54371c"; g.lineWidth = 1.8 * S;
      g.beginPath(); g.moveTo(x + 2 * S, fy - 9 * S); g.lineTo(x + 2 * S, fy - 34 * S); g.stroke();
      g.fillStyle = "#e8dcc0";
      rr(g, x - 8 * S, fy - 34 * S, 20 * S, 4 * S, 2 * S); g.fill();
      g.strokeStyle = "rgba(120,100,60,0.6)"; g.lineWidth = 0.7 * S;
      for (const dx of [-4, 1, 6]) { g.beginPath(); g.moveTo(x + dx * S, fy - 34 * S); g.lineTo(x + dx * S, fy - 30 * S); g.stroke(); }
      // remo apoiado
      g.strokeStyle = "#8a6a44"; g.lineWidth = 1.2 * S;
      g.beginPath(); g.moveTo(x - 18 * S, fy - 12 * S); g.lineTo(x - 26 * S, fy + 1 * S); g.stroke();
      g.fillStyle = "#8a6a44";
      g.beginPath(); g.ellipse(x - 26.5 * S, fy + 1.5 * S, 2 * S, 3.4 * S, 0.5, 0, TAU); g.fill();
      // casco
      const bg4 = g.createLinearGradient(x, fy - 14 * S, x, fy);
      bg4.addColorStop(0, "#a87c4e"); bg4.addColorStop(1, "#6d4c2a");
      g.fillStyle = bg4;
      g.beginPath();
      g.moveTo(x - 26 * S, fy - 14 * S);
      g.quadraticCurveTo(x - 20 * S, fy - 1 * S, x - 6 * S, fy);
      g.lineTo(x + 10 * S, fy);
      g.quadraticCurveTo(x + 24 * S, fy - 2 * S, x + 27 * S, fy - 15 * S);
      g.quadraticCurveTo(x + 16 * S, fy - 9 * S, x, fy - 9 * S);
      g.quadraticCurveTo(x - 16 * S, fy - 9 * S, x - 26 * S, fy - 14 * S);
      g.closePath(); g.fill();
      // tábuas
      g.strokeStyle = "rgba(50,32,14,0.5)"; g.lineWidth = 0.8 * S;
      g.beginPath(); g.moveTo(x - 21 * S, fy - 9 * S); g.quadraticCurveTo(x, fy - 4.5 * S, x + 22 * S, fy - 10 * S); g.stroke();
      g.beginPath(); g.moveTo(x - 16 * S, fy - 4.5 * S); g.quadraticCurveTo(x, fy - 1.5 * S, x + 17 * S, fy - 5 * S); g.stroke();
      // borda superior clara
      g.strokeStyle = "#caa050"; g.lineWidth = 1.3 * S;
      g.beginPath(); g.moveTo(x - 25 * S, fy - 13.5 * S); g.quadraticCurveTo(x, fy - 8 * S, x + 26 * S, fy - 14.5 * S); g.stroke();
      g.restore();
      return;
    }
    case "campfire": {
      // fogueira com roda de pedras, chamas e fagulhas
      softShadow(g, x, fy, 12 * S, 0.25);
      g.save();
      g.fillStyle = "#77705c";
      for (let i2 = 0; i2 < 7; i2++) {
        const a = (i2 / 7) * TAU;
        g.beginPath(); g.ellipse(x + Math.cos(a) * 8.5 * S, fy - 1 * S + Math.sin(a) * 3 * S, 2.2 * S, 1.5 * S, a, 0, TAU); g.fill();
      }
      g.strokeStyle = "#54371c"; g.lineWidth = 2 * S; g.lineCap = "round";
      g.beginPath(); g.moveTo(x - 5 * S, fy - 2 * S); g.lineTo(x + 5 * S, fy - 5 * S); g.stroke();
      g.beginPath(); g.moveTo(x - 5 * S, fy - 5 * S); g.lineTo(x + 5 * S, fy - 2 * S); g.stroke();
      if ((o.fire ?? 1) > 0.05) {
        const fl = reduce ? 0 : Math.sin(t * 0.014 + x) * 1.8 * S;
        glowCircle(g, x, fy - 9 * S, 13 * S, "#ffb14a", 0.55);
        const fg3 = g.createLinearGradient(x, fy - 16 * S, x, fy - 4 * S);
        fg3.addColorStop(0, "#ffe9b0"); fg3.addColorStop(0.5, "#ffab3c"); fg3.addColorStop(1, "#e8622e");
        g.fillStyle = fg3;
        g.beginPath();
        g.moveTo(x, fy - 15.5 * S - fl);
        g.bezierCurveTo(x + 3.8 * S, fy - 10 * S, x + 3.4 * S, fy - 7 * S, x, fy - 4.5 * S);
        g.bezierCurveTo(x - 3.4 * S, fy - 7 * S, x - 3.8 * S, fy - 10 * S, x, fy - 15.5 * S - fl);
        g.fill();
        g.fillStyle = "#fff6dd";
        g.beginPath();
        g.moveTo(x, fy - 10.5 * S - fl * 0.5);
        g.quadraticCurveTo(x + 1.6 * S, fy - 7 * S, x, fy - 5 * S);
        g.quadraticCurveTo(x - 1.6 * S, fy - 7 * S, x, fy - 10.5 * S - fl * 0.5);
        g.fill();
        if (!reduce) {
          g.fillStyle = "#ffd98a";
          for (let i2 = 0; i2 < 3; i2++) {
            const ph = (t * 0.0012 + i2 * 0.37) % 1;
            g.globalAlpha = (1 - ph) * 0.85;
            g.beginPath(); g.arc(x + Math.sin(t * 0.004 + i2 * 2.1) * 4 * S, fy - 8 * S - ph * 20 * S, (1.1 - ph * 0.6) * S, 0, TAU); g.fill();
          }
          g.globalAlpha = 1;
        }
      }
      g.restore();
      return;
    }
    case "scroll": {
      // mesa com rolo das Escrituras aberto + vela acesa
      softShadow(g, x, fy, 16 * S, 0.28);
      g.save();
      g.fillStyle = "#54371c";
      rr(g, x - 10 * S, fy - 10 * S, 2.6 * S, 10 * S, 1 * S); g.fill();
      rr(g, x + 7.4 * S, fy - 10 * S, 2.6 * S, 10 * S, 1 * S); g.fill();
      const wood3 = g.createLinearGradient(x, fy - 13 * S, x, fy - 9 * S);
      wood3.addColorStop(0, "#a87c4e"); wood3.addColorStop(1, "#77522c");
      g.fillStyle = wood3;
      rr(g, x - 13 * S, fy - 13 * S, 26 * S, 3.6 * S, 1.4 * S); g.fill();
      // rolo aberto
      const pg = g.createLinearGradient(x, fy - 18 * S, x, fy - 12 * S);
      pg.addColorStop(0, "#f7f0da"); pg.addColorStop(1, "#dccfa8");
      g.fillStyle = pg;
      rr(g, x - 9 * S, fy - 17.5 * S, 18 * S, 5.5 * S, 1 * S); g.fill();
      // cabos enrolados nas pontas
      g.fillStyle = "#c8b48a";
      rr(g, x - 12.5 * S, fy - 18.5 * S, 3.6 * S, 7 * S, 1.6 * S); g.fill();
      rr(g, x + 8.9 * S, fy - 18.5 * S, 3.6 * S, 7 * S, 1.6 * S); g.fill();
      g.fillStyle = "#8a6a44";
      g.beginPath(); g.arc(x - 10.7 * S, fy - 19 * S, 1 * S, 0, TAU); g.fill();
      g.beginPath(); g.arc(x + 10.7 * S, fy - 19 * S, 1 * S, 0, TAU); g.fill();
      // linhas do texto
      g.strokeStyle = "rgba(90,70,40,0.55)"; g.lineWidth = 0.5 * S;
      for (let i2 = 0; i2 < 3; i2++) {
        g.beginPath(); g.moveTo(x - 7 * S, fy - (16 - i2 * 1.6) * S); g.lineTo(x + 7 * S, fy - (16 - i2 * 1.6) * S); g.stroke();
      }
      // vela acesa ao lado
      g.fillStyle = "#f2ead0"; rr(g, x + 14 * S, fy - 15 * S, 2 * S, 4.4 * S, 0.8 * S); g.fill();
      glowCircle(g, x + 15 * S, fy - 16.5 * S, 5 * S, "#ffca70", 0.5);
      g.fillStyle = "#ffb14a";
      g.beginPath(); g.ellipse(x + 15 * S, fy - 16.5 * S, 1 * S, 1.8 * S, 0, 0, TAU); g.fill();
      g.restore();
      return;
    }
    case "throne": {
      // TRONO CELESTIAL (Ap 4:2-3): "eis que um trono estava posto no céu".
      // Estrado de degraus dourados, assento alto com encosto radiante e o
      // arco-íris "semelhante à esmeralda" ao redor. Ninguém é desenhado
      // assentado — reverência: do trono irradia apenas luz.
      softShadow(g, x, fy, 36 * S, 0.34);
      g.save();
      const pulse = reduce ? 0.8 : Math.sin(t * 0.0022) * 0.2 + 0.8;
      const gloryY = fy - 40 * S; // centro da glória (altura do encosto)
      // arco-íris esmeralda em arco atrás do trono (3 faixas concêntricas)
      g.lineCap = "round";
      for (const [rad, col, aa, lw] of [
        [42, "#2f9e74", 0.55, 4.2],
        [37.2, "#4fd6a0", 0.45, 3.6],
        [32.8, "#9defc8", 0.34, 3.0],
      ] as const) {
        g.strokeStyle = col;
        g.globalAlpha = aa * (0.65 + pulse * 0.35);
        g.lineWidth = lw * S;
        g.beginPath(); g.arc(x, fy - 18 * S, rad * S, Math.PI * 1.02, Math.PI * 1.98); g.stroke();
      }
      g.globalAlpha = 1;
      // raios de luz pulsantes (leque atrás do encosto)
      if (!reduce) {
        g.save();
        g.globalAlpha = 0.09 + 0.16 * pulse;
        g.fillStyle = "#fff3c8";
        for (let i2 = 0; i2 < 7; i2++) {
          const ang = -Math.PI / 2 + (i2 - 3) * 0.27 + Math.sin(t * 0.0009 + i2 * 1.3) * 0.045;
          const len = (24 + (i2 % 2) * 6) * S * (0.85 + pulse * 0.3);
          g.beginPath();
          g.moveTo(x, gloryY);
          g.lineTo(x + Math.cos(ang - 0.05) * len, gloryY + Math.sin(ang - 0.05) * len);
          g.lineTo(x + Math.cos(ang + 0.05) * len, gloryY + Math.sin(ang + 0.05) * len);
          g.closePath(); g.fill();
        }
        g.restore();
      }
      glowCircle(g, x, gloryY, 34 * S, "#ffedb0", 0.5 * pulse);
      // estrado de degraus dourados
      const stepG = (w: number, h: number, y0: number) => {
        const sg4 = g.createLinearGradient(x, y0 - h, x, y0);
        sg4.addColorStop(0, "#ffe4a0"); sg4.addColorStop(0.5, "#dfae52"); sg4.addColorStop(1, "#9a7020");
        g.fillStyle = sg4;
        rr(g, x - w / 2, y0 - h, w, h, 1.6 * S); g.fill();
        g.strokeStyle = "rgba(120,84,20,0.5)"; g.lineWidth = 0.8 * S;
        rr(g, x - w / 2, y0 - h, w, h, 1.6 * S); g.stroke();
        g.fillStyle = "rgba(255,246,216,0.4)";
        rr(g, x - w / 2 + 1.4 * S, y0 - h, w - 2.8 * S, 1.3 * S, 0.65 * S); g.fill();
      };
      stepG(56 * S, 5 * S, fy);
      stepG(46 * S, 5 * S, fy - 5 * S);
      stepG(36 * S, 5 * S, fy - 10 * S);
      // encosto alto radiante
      const back = g.createLinearGradient(x, fy - 62 * S, x, fy - 18 * S);
      back.addColorStop(0, "#fff2cc"); back.addColorStop(0.4, "#f2cf7e"); back.addColorStop(1, "#b8842e");
      g.fillStyle = back;
      rr(g, x - 12 * S, fy - 60 * S, 24 * S, 40 * S, 10 * S); g.fill();
      g.strokeStyle = "#8a6218"; g.lineWidth = 1 * S;
      rr(g, x - 12 * S, fy - 60 * S, 24 * S, 40 * S, 10 * S); g.stroke();
      // remate luminoso no alto do encosto
      glowCircle(g, x, fy - 60 * S, 12 * S, "#fff6dd", 0.55 * pulse);
      g.fillStyle = "#fff6dd";
      g.beginPath(); g.arc(x, fy - 60 * S, 2.6 * S, 0, TAU); g.fill();
      // assento
      const seat = g.createLinearGradient(x, fy - 25 * S, x, fy - 18 * S);
      seat.addColorStop(0, "#ffe9b8"); seat.addColorStop(1, "#c89238");
      g.fillStyle = seat;
      rr(g, x - 16 * S, fy - 25 * S, 32 * S, 7 * S, 2.4 * S); g.fill();
      g.strokeStyle = "#8a6218"; g.lineWidth = 1 * S;
      rr(g, x - 16 * S, fy - 25 * S, 32 * S, 7 * S, 2.4 * S); g.stroke();
      // braços/colunas laterais com esferas
      for (const s of [-1, 1]) {
        const ax = x + s * 15.4 * S;
        const col = g.createLinearGradient(ax - 2.4 * S, 0, ax + 2.4 * S, 0);
        col.addColorStop(0, "#f2cf7e"); col.addColorStop(0.5, "#ffe9b8"); col.addColorStop(1, "#b8842e");
        g.fillStyle = col;
        rr(g, ax - 2.4 * S, fy - 34 * S, 4.8 * S, 16 * S, 2 * S); g.fill();
        const kg = g.createRadialGradient(ax - 1 * S, fy - 35.4 * S, 0.4, ax, fy - 34.6 * S, 2.8 * S);
        kg.addColorStop(0, "#fff2cc"); kg.addColorStop(1, "#b8842e");
        g.fillStyle = kg;
        g.beginPath(); g.arc(ax, fy - 34.6 * S, 2.6 * S, 0, TAU); g.fill();
      }
      // a presença: luz pura sobre o assento (sem forma — Ap 4:3)
      const seatGlow = g.createRadialGradient(x, fy - 34 * S, 1, x, fy - 34 * S, 15 * S);
      seatGlow.addColorStop(0, `rgba(255,248,224,${0.85 * pulse})`);
      seatGlow.addColorStop(1, "rgba(255,248,224,0)");
      g.fillStyle = seatGlow;
      g.fillRect(x - 15 * S, fy - 49 * S, 30 * S, 30 * S);
      g.restore();
      return;
    }
    case "trumpet": {
      // TROMBETA DE OURO (Ap 8:2): em pé sobre suporte de madeira, boca para
      // cima — pronta para o anjo tocar; brilho especular percorre o corpo.
      softShadow(g, x, fy, 10 * S, 0.26);
      g.save();
      // suporte (tripé de madeira com anel)
      g.strokeStyle = "#54371c"; g.lineWidth = 1.5 * S; g.lineCap = "round";
      g.beginPath(); g.moveTo(x - 5.5 * S, fy); g.lineTo(x - 0.8 * S, fy - 8.6 * S); g.stroke();
      g.beginPath(); g.moveTo(x + 5.5 * S, fy); g.lineTo(x + 0.8 * S, fy - 8.6 * S); g.stroke();
      g.beginPath(); g.moveTo(x - 2.5 * S, fy); g.lineTo(x + 0.4 * S, fy - 7 * S); g.stroke();
      g.strokeStyle = "#6d4c2a"; g.lineWidth = 1.1 * S;
      g.beginPath(); g.ellipse(x, fy - 9 * S, 2.4 * S, 1.1 * S, 0, 0, TAU); g.stroke();
      // corpo (afunila do bocal, embaixo, à campânula, em cima)
      const tubePath = () => {
        g.beginPath();
        g.moveTo(x - 1 * S, fy - 3.6 * S);
        g.quadraticCurveTo(x - 1.3 * S, fy - 14 * S, x - 5.4 * S, fy - 22.4 * S);
        g.lineTo(x + 5.4 * S, fy - 22.4 * S);
        g.quadraticCurveTo(x + 1.3 * S, fy - 14 * S, x + 1 * S, fy - 3.6 * S);
        g.closePath();
      };
      const tGold = g.createLinearGradient(x - 5 * S, fy - 22 * S, x + 5 * S, fy - 4 * S);
      tGold.addColorStop(0, "#ffe4a0"); tGold.addColorStop(0.5, "#e0b054"); tGold.addColorStop(1, "#9a7020");
      tubePath(); g.fillStyle = tGold; g.fill();
      // brilho especular percorrendo o corpo (loop com o.t)
      if (!reduce) {
        g.save();
        tubePath(); g.clip();
        const ph = (t * 0.0011 + x * 0.01) % 1;
        const gy = fy - 4 * S - ph * 18.5 * S;
        const spec = g.createLinearGradient(0, gy + 4 * S, 0, gy - 4 * S);
        spec.addColorStop(0, "rgba(255,250,228,0)");
        spec.addColorStop(0.5, "rgba(255,250,228,0.8)");
        spec.addColorStop(1, "rgba(255,250,228,0)");
        g.fillStyle = spec;
        g.fillRect(x - 6 * S, gy - 4 * S, 12 * S, 8 * S);
        g.restore();
      } else {
        g.fillStyle = "rgba(255,250,228,0.4)";
        g.beginPath(); g.ellipse(x - 1.4 * S, fy - 13 * S, 0.9 * S, 5 * S, 0.12, 0, TAU); g.fill();
      }
      // anéis decorativos
      g.strokeStyle = "rgba(120,84,20,0.55)"; g.lineWidth = 0.8 * S;
      g.beginPath(); g.ellipse(x, fy - 11.5 * S, 1.6 * S, 0.65 * S, 0, 0, TAU); g.stroke();
      g.beginPath(); g.ellipse(x, fy - 17 * S, 3 * S, 1 * S, 0, 0, TAU); g.stroke();
      // campânula (boca larga voltada para o céu) com interior escuro
      g.fillStyle = tGold;
      g.beginPath(); g.ellipse(x, fy - 22.4 * S, 5.6 * S, 2 * S, 0, 0, TAU); g.fill();
      g.strokeStyle = "#8a6218"; g.lineWidth = 0.9 * S;
      g.beginPath(); g.ellipse(x, fy - 22.4 * S, 5.6 * S, 2 * S, 0, 0, TAU); g.stroke();
      g.fillStyle = "#7a4e14";
      g.beginPath(); g.ellipse(x, fy - 22.4 * S, 4.1 * S, 1.25 * S, 0, 0, TAU); g.fill();
      g.fillStyle = "rgba(255,246,216,0.5)";
      g.beginPath(); g.ellipse(x - 2 * S, fy - 23 * S, 1.6 * S, 0.5 * S, -0.2, 0, TAU); g.fill();
      // bocal
      g.fillStyle = "#ffe9b8";
      g.beginPath(); g.ellipse(x, fy - 3.4 * S, 1.7 * S, 1 * S, 0, 0, TAU); g.fill();
      g.strokeStyle = "#8a6218"; g.lineWidth = 0.7 * S;
      g.beginPath(); g.ellipse(x, fy - 3.4 * S, 1.7 * S, 1 * S, 0, 0, TAU); g.stroke();
      g.restore();
      return;
    }
    case "bowl": {
      // TAÇA DE OURO (Ap 15:7): salva larga "cheia da ira de Deus" — o
      // conteúdo incandesce e pulsa (o.fire intensifica).
      softShadow(g, x, fy, 12 * S, 0.28);
      g.save();
      const heat = clamp01(o.fire ?? 1);
      const bPulse = reduce ? 0.7 : Math.sin(t * 0.006 + x) * 0.25 + 0.75;
      const bGold = g.createLinearGradient(x - 10 * S, fy - 13 * S, x + 10 * S, fy);
      bGold.addColorStop(0, "#ffe4a0"); bGold.addColorStop(0.5, "#e0b054"); bGold.addColorStop(1, "#9a7020");
      g.fillStyle = bGold;
      // pé e haste
      g.beginPath(); g.ellipse(x, fy - 1.2 * S, 6 * S, 1.8 * S, 0, 0, TAU); g.fill();
      rr(g, x - 1.6 * S, fy - 7 * S, 3.2 * S, 5.6 * S, 1.2 * S); g.fill();
      // corpo largo da taça
      g.beginPath();
      g.moveTo(x - 10.5 * S, fy - 12.5 * S);
      g.quadraticCurveTo(x - 9 * S, fy - 6.6 * S, x, fy - 5.6 * S);
      g.quadraticCurveTo(x + 9 * S, fy - 6.6 * S, x + 10.5 * S, fy - 12.5 * S);
      g.closePath(); g.fill();
      // borda
      g.beginPath(); g.ellipse(x, fy - 12.5 * S, 10.5 * S, 2.8 * S, 0, 0, TAU); g.fill();
      g.strokeStyle = "#8a6218"; g.lineWidth = 0.9 * S;
      g.beginPath(); g.ellipse(x, fy - 12.5 * S, 10.5 * S, 2.8 * S, 0, 0, TAU); g.stroke();
      // brilho lateral do metal
      g.fillStyle = "rgba(255,246,216,0.4)";
      g.beginPath(); g.ellipse(x - 5.4 * S, fy - 10 * S, 2 * S, 1 * S, -0.5, 0, TAU); g.fill();
      // conteúdo incandescente (a ira)
      if (heat > 0.05) {
        glowCircle(g, x, fy - 13.5 * S, 14 * S * (0.7 + heat * 0.5), "#ff8a3c", (0.3 + 0.35 * bPulse) * heat);
        const lava = g.createRadialGradient(x, fy - 13 * S, 0.5, x, fy - 13 * S, 8.6 * S);
        lava.addColorStop(0, "#fff1c0");
        lava.addColorStop(0.45, "#ffab3c");
        lava.addColorStop(1, "#d8401e");
        g.fillStyle = lava;
        g.beginPath(); g.ellipse(x, fy - 12.8 * S, 8.6 * S, 2.1 * S, 0, 0, TAU); g.fill();
        // línguas de calor subindo
        if (!reduce) {
          g.fillStyle = "#ffd98a";
          for (let i2 = 0; i2 < 3; i2++) {
            const ph = (t * 0.0014 + i2 * 0.41) % 1;
            g.globalAlpha = (1 - ph) * 0.7 * heat;
            g.beginPath();
            g.arc(x + Math.sin(i2 * 2.7 + t * 0.002) * 5 * S, fy - 13.5 * S - ph * 8 * S, (1.3 - ph * 0.7) * S, 0, TAU);
            g.fill();
          }
          g.globalAlpha = 1;
        }
      } else {
        g.fillStyle = "#7a4e14";
        g.beginPath(); g.ellipse(x, fy - 12.8 * S, 8.4 * S, 2 * S, 0, 0, TAU); g.fill();
      }
      g.restore();
      return;
    }
    case "censer": {
      // INCENSÁRIO DE OURO (Ap 8:3-5): pendurado por corrente num suporte;
      // do incenso sobe fumaça — "as orações dos santos" diante de Deus.
      softShadow(g, x, fy, 14 * S, 0.26);
      g.save();
      const sway = reduce ? 0 : Math.sin(t * 0.0014 + x) * 1.4 * S;
      const hookX = x + 7 * S, hookY = fy - 27 * S;
      const cX = hookX + sway, cY = fy - 14.5 * S;
      // suporte de madeira em "Γ"
      g.strokeStyle = "#4a3520"; g.lineWidth = 2.2 * S; g.lineCap = "round";
      g.beginPath(); g.moveTo(x - 8 * S, fy); g.lineTo(x - 8 * S, fy - 26.5 * S); g.stroke();
      g.beginPath(); g.moveTo(x - 8 * S, fy - 26.5 * S); g.quadraticCurveTo(x, fy - 29 * S, hookX, hookY); g.stroke();
      g.fillStyle = "#54371c";
      g.beginPath(); g.ellipse(x - 8 * S, fy - 0.8 * S, 4.6 * S, 1.6 * S, 0, 0, TAU); g.fill();
      // gancho + corrente de elos
      g.strokeStyle = "#caa050"; g.lineWidth = 1 * S;
      g.beginPath(); g.arc(hookX, hookY + 1 * S, 1.1 * S, -Math.PI * 0.2, Math.PI * 1.1); g.stroke();
      for (let i2 = 0; i2 < 4; i2++) {
        const k = (i2 + 0.5) / 4;
        g.beginPath();
        g.ellipse(hookX + sway * k, hookY + 2 * S + (cY - 8 * S - hookY) * k, 0.8 * S, 1.2 * S, sway * 0.04, 0, TAU);
        g.stroke();
      }
      // corpo (taça) do incensário
      const cGold = g.createLinearGradient(cX - 5 * S, cY - 4 * S, cX + 5 * S, cY + 5 * S);
      cGold.addColorStop(0, "#ffe4a0"); cGold.addColorStop(0.5, "#e0b054"); cGold.addColorStop(1, "#9a7020");
      g.fillStyle = cGold;
      g.beginPath();
      g.moveTo(cX - 5 * S, cY - 1 * S);
      g.quadraticCurveTo(cX - 4.4 * S, cY + 4 * S, cX, cY + 4.8 * S);
      g.quadraticCurveTo(cX + 4.4 * S, cY + 4 * S, cX + 5 * S, cY - 1 * S);
      g.closePath(); g.fill();
      // pé pequeno
      g.fillStyle = "#b8842e";
      g.beginPath(); g.ellipse(cX, cY + 5.2 * S, 2 * S, 0.8 * S, 0, 0, TAU); g.fill();
      // tampa em cúpula perfurada
      const dome = g.createRadialGradient(cX - 1.6 * S, cY - 4 * S, 0.5, cX, cY - 2 * S, 6 * S);
      dome.addColorStop(0, "#ffe9b8"); dome.addColorStop(1, "#b8842e");
      g.fillStyle = dome;
      g.beginPath(); g.arc(cX, cY - 1 * S, 5 * S, Math.PI, TAU); g.fill();
      g.strokeStyle = "#8a6218"; g.lineWidth = 0.8 * S;
      g.beginPath(); g.ellipse(cX, cY - 1 * S, 5 * S, 1.4 * S, 0, 0, TAU); g.stroke();
      // botão no topo da tampa
      g.fillStyle = "#ffe9b8";
      g.beginPath(); g.arc(cX, cY - 6.2 * S, 1 * S, 0, TAU); g.fill();
      // brasas vivas pelas perfurações
      const ember = reduce ? 0.7 : Math.sin(t * 0.008 + x) * 0.25 + 0.72;
      glowCircle(g, cX, cY - 1.6 * S, 6.5 * S, "#ffab3c", 0.3 * ember);
      g.fillStyle = `rgba(255,160,60,${(0.8 * ember).toFixed(3)})`;
      for (const [dx, dy] of [[-2.4, -2.2], [0, -3.4], [2.4, -2.2], [-1.2, -1.2], [1.2, -1.2]] as const) {
        g.beginPath(); g.arc(cX + dx * S, cY + dy * S, 0.55 * S, 0, TAU); g.fill();
      }
      // FUMAÇA subindo em espirais translúcidas (as orações sobem)
      g.fillStyle = "#d9dbe6";
      if (!reduce) {
        for (let i2 = 0; i2 < 4; i2++) {
          const ph = (t * 0.0006 + i2 * 0.27) % 1;
          const sy = cY - 6 * S - ph * 26 * S;
          const sx2 = cX + Math.sin(ph * 7 + i2 * 1.9) * (2.5 + ph * 4) * S;
          g.globalAlpha = Math.sin(ph * Math.PI) * 0.28;
          g.beginPath(); g.arc(sx2, sy, (1.6 + ph * 3.4) * S, 0, TAU); g.fill();
        }
        g.globalAlpha = 1;
      } else {
        g.globalAlpha = 0.2;
        for (let i2 = 0; i2 < 3; i2++) {
          g.beginPath(); g.arc(cX + (i2 % 2 === 0 ? 2 : -2) * S, cY - 9 * S - i2 * 7 * S, (2 + i2) * S, 0, TAU); g.fill();
        }
        g.globalAlpha = 1;
      }
      g.restore();
      return;
    }
    case "ark": {
      // ARCA DA ALIANÇA (Êx 25:10-22; Ap 11:19): caixa de ouro com friso,
      // dois querubins de asas voltadas uma à outra sobre o propiciatório,
      // varas laterais e o brilho da glória entre as asas.
      softShadow(g, x, fy, 22 * S, 0.32);
      g.save();
      const aGlow = reduce ? 0.75 : Math.sin(t * 0.003 + x) * 0.18 + 0.78;
      const aGold = g.createLinearGradient(x, fy - 16 * S, x, fy);
      aGold.addColorStop(0, "#ffe4a0"); aGold.addColorStop(0.5, "#e0b054"); aGold.addColorStop(1, "#9a7020");
      // varas laterais (nas argolas — Êx 25:14)
      g.strokeStyle = "#b8842e"; g.lineWidth = 1.8 * S; g.lineCap = "round";
      g.beginPath(); g.moveTo(x - 22 * S, fy - 5.5 * S); g.lineTo(x + 22 * S, fy - 5.5 * S); g.stroke();
      g.strokeStyle = "rgba(255,244,208,0.5)"; g.lineWidth = 0.6 * S;
      g.beginPath(); g.moveTo(x - 21 * S, fy - 6 * S); g.lineTo(x + 21 * S, fy - 6 * S); g.stroke();
      // pés
      g.fillStyle = "#8a6218";
      for (const s of [-1, 1]) { rr(g, x + s * 12 * S - 1.6 * S, fy - 2.4 * S, 3.2 * S, 2.4 * S, 0.8 * S); g.fill(); }
      // caixa
      g.fillStyle = aGold;
      rr(g, x - 14 * S, fy - 14 * S, 28 * S, 12 * S, 1.4 * S); g.fill();
      g.strokeStyle = "#8a6218"; g.lineWidth = 0.9 * S;
      rr(g, x - 14 * S, fy - 14 * S, 28 * S, 12 * S, 1.4 * S); g.stroke();
      // argolas das varas
      g.strokeStyle = "#7a5a14"; g.lineWidth = 1 * S;
      for (const s of [-1, 1]) { g.beginPath(); g.arc(x + s * 13 * S, fy - 5.5 * S, 1.8 * S, 0, TAU); g.stroke(); }
      // brilho lateral da caixa
      g.fillStyle = "rgba(255,246,216,0.35)";
      rr(g, x - 12.6 * S, fy - 13 * S, 3 * S, 10 * S, 1.2 * S); g.fill();
      // friso de "coroa de ouro" ao redor do topo (Êx 25:11)
      g.fillStyle = "#f2cf7e";
      rr(g, x - 15 * S, fy - 15.6 * S, 30 * S, 2.6 * S, 1.2 * S); g.fill();
      g.strokeStyle = "rgba(120,84,20,0.55)"; g.lineWidth = 0.6 * S;
      for (let i2 = -4; i2 <= 4; i2++) {
        g.beginPath(); g.moveTo(x + i2 * 3.2 * S, fy - 15.4 * S); g.lineTo(x + i2 * 3.2 * S, fy - 13.2 * S); g.stroke();
      }
      // propiciatório (tampa de ouro maciço)
      const lid = g.createLinearGradient(x, fy - 18 * S, x, fy - 15.4 * S);
      lid.addColorStop(0, "#fff0c4"); lid.addColorStop(1, "#c89238");
      g.fillStyle = lid;
      rr(g, x - 13 * S, fy - 17.8 * S, 26 * S, 2.6 * S, 1 * S); g.fill();
      // querubins ajoelhados, asas estendidas uma voltada à outra
      for (const s of [-1, 1] as const) {
        const qx = x + s * 8.5 * S, qy = fy - 17.8 * S;
        const qGold = g.createLinearGradient(qx, qy - 10 * S, qx, qy);
        qGold.addColorStop(0, "#fff0c4"); qGold.addColorStop(1, "#c89238");
        g.fillStyle = qGold;
        // asa arqueada sobre o propiciatório (ponta perto do centro)
        g.beginPath();
        g.moveTo(qx - s * 1 * S, qy - 5.5 * S);
        g.quadraticCurveTo(qx - s * 5.5 * S, qy - 13 * S, x - s * 0.8 * S, qy - 10.5 * S);
        g.quadraticCurveTo(qx - s * 4 * S, qy - 8 * S, qx - s * 1.4 * S, qy - 3.5 * S);
        g.closePath(); g.fill();
        // corpinho ajoelhado
        g.beginPath();
        g.moveTo(qx + s * 2.6 * S, qy);
        g.quadraticCurveTo(qx + s * 3 * S, qy - 4.5 * S, qx, qy - 5.5 * S);
        g.quadraticCurveTo(qx - s * 2.6 * S, qy - 4.5 * S, qx - s * 2 * S, qy);
        g.closePath(); g.fill();
        // cabeça inclinada (reverência, olhando o propiciatório)
        g.beginPath(); g.arc(qx - s * 0.6 * S, qy - 7 * S, 1.9 * S, 0, TAU); g.fill();
        g.strokeStyle = "rgba(120,84,20,0.45)"; g.lineWidth = 0.6 * S;
        g.beginPath(); g.arc(qx - s * 0.6 * S, qy - 7 * S, 1.9 * S, 0, TAU); g.stroke();
      }
      // glória entre as asas (Êx 25:22: "ali virei a ti")
      glowCircle(g, x, fy - 26 * S, 12 * S, "#fff2c8", 0.55 * aGlow);
      const shek = g.createRadialGradient(x, fy - 26 * S, 0.5, x, fy - 26 * S, 4.5 * S);
      shek.addColorStop(0, "#fffdf2"); shek.addColorStop(1, "rgba(255,240,190,0)");
      g.fillStyle = shek;
      g.fillRect(x - 5 * S, fy - 31 * S, 10 * S, 10 * S);
      g.restore();
      return;
    }
    case "arkship": {
      // ARCA DE NOÉ (Gn 6:14-16): casco monumental de madeira betumada com
      // tábuas horizontais e juntas, porta lateral e teto com abertura de
      // janela — escala de construção, não de barco
      softShadow(g, x, fy, 46 * S, 0.34);
      g.save();
      // casco betumado (afunila para a quilha)
      const hullPath = () => {
        g.beginPath();
        g.moveTo(x - 34 * S, fy - 33 * S);
        g.quadraticCurveTo(x - 30 * S, fy - 9 * S, x - 20 * S, fy - 2 * S);
        g.lineTo(x + 20 * S, fy - 2 * S);
        g.quadraticCurveTo(x + 30 * S, fy - 9 * S, x + 34 * S, fy - 33 * S);
        g.closePath();
      };
      const hull = g.createLinearGradient(x, fy - 33 * S, x, fy);
      hull.addColorStop(0, "#6d4c2a"); hull.addColorStop(0.55, "#54371c"); hull.addColorStop(1, "#38240f");
      hullPath(); g.fillStyle = hull; g.fill();
      // tábuas horizontais com juntas de betume (escuras) e fio de luz
      g.save();
      hullPath(); g.clip();
      for (let r = 1; r <= 4; r++) {
        const yy = fy - 33 * S + r * 6.6 * S;
        g.strokeStyle = "rgba(16,10,4,0.6)"; g.lineWidth = 1.1 * S;
        g.beginPath(); g.moveTo(x - 36 * S, yy); g.lineTo(x + 36 * S, yy); g.stroke();
        g.strokeStyle = "rgba(255,220,160,0.1)"; g.lineWidth = 0.7 * S;
        g.beginPath(); g.moveTo(x - 36 * S, yy - 1 * S); g.lineTo(x + 36 * S, yy - 1 * S); g.stroke();
        // juntas verticais desencontradas entre as fiadas
        g.strokeStyle = "rgba(16,10,4,0.45)"; g.lineWidth = 0.8 * S;
        for (let c = -3; c <= 3; c++) {
          const jx = x + c * 10 * S + (r % 2) * 5 * S;
          g.beginPath(); g.moveTo(jx, yy - 6.6 * S); g.lineTo(jx, yy); g.stroke();
        }
      }
      g.restore();
      // PORTA lateral (Gn 6:16) com moldura reforçada
      g.fillStyle = "#241608";
      rr(g, x - 6.5 * S, fy - 22 * S, 13 * S, 19 * S, 2.4 * S); g.fill();
      g.strokeStyle = "#8a6a44"; g.lineWidth = 1.2 * S;
      rr(g, x - 6.5 * S, fy - 22 * S, 13 * S, 19 * S, 2.4 * S); g.stroke();
      g.strokeStyle = "rgba(138,106,68,0.7)"; g.lineWidth = 0.8 * S;
      g.beginPath(); g.moveTo(x, fy - 21 * S); g.lineTo(x, fy - 4 * S); g.stroke();
      g.beginPath(); g.moveTo(x - 5.5 * S, fy - 13 * S); g.lineTo(x + 5.5 * S, fy - 13 * S); g.stroke();
      // borda superior do casco (verga clara)
      g.strokeStyle = "#a8814e"; g.lineWidth = 1.6 * S; g.lineCap = "round";
      g.beginPath(); g.moveTo(x - 34 * S, fy - 33 * S); g.lineTo(x + 34 * S, fy - 33 * S); g.stroke();
      // convés + casa do teto
      const deck = g.createLinearGradient(x, fy - 38 * S, x, fy - 33 * S);
      deck.addColorStop(0, "#8a6a44"); deck.addColorStop(1, "#6d4c2a");
      g.fillStyle = deck;
      rr(g, x - 30 * S, fy - 37 * S, 60 * S, 4.6 * S, 1.4 * S); g.fill();
      const cabin = g.createLinearGradient(x, fy - 50 * S, x, fy - 37 * S);
      cabin.addColorStop(0, "#8a6440"); cabin.addColorStop(1, "#5e4224");
      g.fillStyle = cabin;
      rr(g, x - 21 * S, fy - 50 * S, 42 * S, 13.6 * S, 1.6 * S); g.fill();
      g.strokeStyle = "rgba(20,12,4,0.5)"; g.lineWidth = 0.8 * S;
      for (const yy of [-46, -41.5]) { g.beginPath(); g.moveTo(x - 20 * S, fy + yy * S); g.lineTo(x + 20 * S, fy + yy * S); g.stroke(); }
      // teto de duas águas com ABERTURA de janela no alto (Gn 8:6)
      const roof = g.createLinearGradient(x, fy - 58 * S, x, fy - 48 * S);
      roof.addColorStop(0, "#a8814e"); roof.addColorStop(1, "#6d4c2a");
      g.fillStyle = roof;
      g.beginPath();
      g.moveTo(x - 25 * S, fy - 49 * S);
      g.lineTo(x, fy - 58 * S);
      g.lineTo(x + 25 * S, fy - 49 * S);
      g.closePath(); g.fill();
      g.strokeStyle = "rgba(255,235,200,0.3)"; g.lineWidth = 0.9 * S;
      g.beginPath(); g.moveTo(x - 23 * S, fy - 49.4 * S); g.lineTo(x, fy - 57 * S); g.stroke();
      // janela aberta no teto (de onde sai a pomba)
      g.fillStyle = "#2a1a0c";
      rr(g, x - 4.5 * S, fy - 55 * S, 9 * S, 5.4 * S, 1.2 * S); g.fill();
      g.strokeStyle = "#c8a060"; g.lineWidth = 0.9 * S;
      rr(g, x - 4.5 * S, fy - 55 * S, 9 * S, 5.4 * S, 1.2 * S); g.stroke();
      // portinhola levantada
      g.fillStyle = "#8a6a44";
      g.beginPath();
      g.moveTo(x - 4.5 * S, fy - 55 * S);
      g.lineTo(x - 1 * S, fy - 59.5 * S);
      g.lineTo(x + 6 * S, fy - 58 * S);
      g.lineTo(x + 4.5 * S, fy - 55 * S);
      g.closePath(); g.fill();
      // brilho lateral do betume
      g.fillStyle = "rgba(255,244,214,0.08)";
      g.beginPath();
      g.moveTo(x - 31 * S, fy - 32 * S);
      g.quadraticCurveTo(x - 28 * S, fy - 12 * S, x - 20 * S, fy - 4 * S);
      g.lineTo(x - 16 * S, fy - 4 * S);
      g.quadraticCurveTo(x - 24 * S, fy - 12 * S, x - 27 * S, fy - 32 * S);
      g.closePath(); g.fill();
      g.restore();
      return;
    }
    case "ladder": {
      // ESCADA DE JACÓ (Gn 28:12): rampa de luz subindo em diagonal até fora
      // do topo, degraus luminosos pulsando e anjos subindo/descendo
      const pulse = reduce ? 0.8 : Math.sin(t * 0.002) * 0.18 + 0.82;
      const topX = x + 34 * S, topY = fy - 60 * S;
      g.save();
      // facho da rampa
      const beam = g.createLinearGradient(x, fy, topX, topY);
      beam.addColorStop(0, `rgba(255,240,190,${(0.5 * pulse).toFixed(3)})`);
      beam.addColorStop(1, "rgba(255,240,190,0.06)");
      g.fillStyle = beam;
      g.beginPath();
      g.moveTo(x - 9 * S, fy);
      g.lineTo(topX - 7 * S, topY);
      g.lineTo(topX + 9 * S, topY);
      g.lineTo(x + 11 * S, fy);
      g.closePath(); g.fill();
      // brilho no pé (onde toca a terra)
      glowCircle(g, x + 1 * S, fy - 2 * S, 16 * S, "#ffe9b0", 0.5 * pulse);
      // degraus de luz
      g.lineCap = "round";
      for (let i = 0; i < 9; i++) {
        const k = (i + 0.5) / 9;
        const cx2 = lerp(x + 1 * S, topX + 1 * S, k);
        const cy2 = lerp(fy - 1.5 * S, topY + 1 * S, k);
        const hw2 = lerp(9 * S, 6.5 * S, k);
        const tw = reduce ? 0.7 : Math.sin(t * 0.004 + i * 1.1) * 0.25 + 0.72;
        g.strokeStyle = `rgba(255,246,214,${(0.85 * tw * pulse).toFixed(3)})`;
        g.lineWidth = 1.6 * S;
        g.beginPath(); g.moveTo(cx2 - hw2, cy2); g.lineTo(cx2 + hw2, cy2); g.stroke();
      }
      // bordas da rampa (fios de luz)
      g.strokeStyle = `rgba(255,240,190,${(0.4 * pulse).toFixed(3)})`; g.lineWidth = 1 * S;
      g.beginPath(); g.moveTo(x - 8 * S, fy - 1 * S); g.lineTo(topX - 6.5 * S, topY); g.stroke();
      g.beginPath(); g.moveTo(x + 10 * S, fy - 1 * S); g.lineTo(topX + 8.5 * S, topY); g.stroke();
      // anjos (pontinhos luminosos com asinhas) subindo E descendo
      const angel = (ax: number, ay: number) => {
        glowCircle(g, ax, ay, 5 * S, "#fff6d8", 0.7);
        g.fillStyle = "#fffdf2";
        g.beginPath(); g.arc(ax, ay, 1.5 * S, 0, TAU); g.fill();
        g.strokeStyle = "rgba(255,250,230,0.85)"; g.lineWidth = 0.9 * S; g.lineCap = "round";
        g.beginPath(); g.moveTo(ax - 3 * S, ay - 1.6 * S); g.quadraticCurveTo(ax - 1.4 * S, ay - 2.8 * S, ax - 0.6 * S, ay - 1 * S); g.stroke();
        g.beginPath(); g.moveTo(ax + 3 * S, ay - 1.6 * S); g.quadraticCurveTo(ax + 1.4 * S, ay - 2.8 * S, ax + 0.6 * S, ay - 1 * S); g.stroke();
      };
      if (!reduce) {
        for (const [ph0, dir, off] of [[0, 1, -3.6], [0.5, -1, 3.8]] as const) {
          const ph = (t * 0.00022 + ph0) % 1;
          const k = dir === 1 ? ph : 1 - ph;
          angel(lerp(x + 1 * S, topX + 1 * S, k) + off * S, lerp(fy - 4 * S, topY + 2 * S, k));
        }
      } else {
        angel(lerp(x, topX, 0.3) - 3.6 * S, lerp(fy - 4 * S, topY + 2 * S, 0.3));
        angel(lerp(x, topX, 0.7) + 3.8 * S, lerp(fy - 4 * S, topY + 2 * S, 0.7));
      }
      g.restore();
      return;
    }
    case "rainbow": {
      // ARCO-ÍRIS DA ALIANÇA (Gn 9:13): semicírculo de faixas translúcidas
      // vivas com o pé tocando o chão e cintilância suave
      const R0 = 35 * S;
      const shimmer = reduce ? 0.82 : Math.sin(t * 0.0016) * 0.14 + 0.84;
      g.save();
      g.lineCap = "round";
      const bands = ["#e8455a", "#f2903c", "#f4d44c", "#4e9a52", "#3f6ea6", "#7a4ab0"];
      for (let i = 0; i < bands.length; i++) {
        g.strokeStyle = bands[i];
        g.globalAlpha = 0.34 * shimmer * (1 - i * 0.035);
        g.lineWidth = 2.7 * S;
        g.beginPath(); g.arc(x, fy, R0 - i * 2.7 * S, Math.PI, TAU); g.stroke();
      }
      g.globalAlpha = 1;
      // brilho suave onde os pés do arco tocam o chão
      glowCircle(g, x - R0 + 6.5 * S, fy - 2 * S, 11 * S, "#fff2c8", 0.3 * shimmer);
      glowCircle(g, x + R0 - 6.5 * S, fy - 2 * S, 11 * S, "#fff2c8", 0.3 * shimmer);
      // cintilância percorrendo o arco
      if (!reduce) {
        g.fillStyle = "#fffdf2";
        for (let i = 0; i < 5; i++) {
          const ph = (t * 0.00035 + i * 0.21) % 1;
          const ang = Math.PI + ph * Math.PI;
          const rr2 = R0 - ((i * 2) % 5) * 2.7 * S;
          g.globalAlpha = Math.sin(ph * Math.PI) * 0.8;
          g.beginPath(); g.arc(x + Math.cos(ang) * rr2, fy + Math.sin(ang) * rr2, 1 * S, 0, TAU); g.fill();
        }
        g.globalAlpha = 1;
      }
      g.restore();
      return;
    }
    case "sheaf": {
      // FEIXE DE TRIGO (Gn 37:7): molho amarrado ao meio, espigas douradas
      softShadow(g, x, fy, 8 * S, 0.26);
      g.save();
      g.lineCap = "round";
      // hastes em leque (abrem a partir da amarra)
      const stalk = g.createLinearGradient(x, fy, x, fy - 13 * S);
      stalk.addColorStop(0, "#a8823c"); stalk.addColorStop(1, "#e0b054");
      for (let i = 0; i < 7; i++) {
        const dx = (i - 3) * 1.5 * S;
        g.strokeStyle = stalk as unknown as string;
        g.lineWidth = 1.1 * S;
        g.beginPath();
        g.moveTo(x + dx * 0.4, fy);
        g.quadraticCurveTo(x + dx * 0.6, fy - 6.5 * S, x + dx, fy - 11.5 * S);
        g.stroke();
      }
      // espigas no alto (grãos aos pares) + praganas finas
      for (let i = 0; i < 7; i++) {
        const dx = (i - 3) * 1.5 * S;
        g.fillStyle = i % 2 ? "#ffd370" : "#f2c05a";
        for (let k2 = 0; k2 < 4; k2++) {
          const gy = fy - 11.5 * S - k2 * 1.15 * S;
          g.beginPath(); g.ellipse(x + dx - 0.7 * S, gy, 0.72 * S, 0.45 * S, -0.5, 0, TAU); g.fill();
          g.beginPath(); g.ellipse(x + dx + 0.7 * S, gy, 0.72 * S, 0.45 * S, 0.5, 0, TAU); g.fill();
        }
        g.strokeStyle = "rgba(255,226,150,0.55)"; g.lineWidth = 0.45 * S;
        g.beginPath(); g.moveTo(x + dx, fy - 15.4 * S); g.lineTo(x + dx + 0.9 * S, fy - 17.4 * S); g.stroke();
      }
      // amarra de corda com nó
      g.strokeStyle = "#8a6434"; g.lineWidth = 1.7 * S;
      g.beginPath(); g.moveTo(x - 3.6 * S, fy - 5.6 * S); g.quadraticCurveTo(x, fy - 4.4 * S, x + 3.6 * S, fy - 5.6 * S); g.stroke();
      g.strokeStyle = "#a8824a"; g.lineWidth = 0.7 * S;
      g.beginPath(); g.moveTo(x - 3.4 * S, fy - 6.2 * S); g.quadraticCurveTo(x, fy - 5 * S, x + 3.4 * S, fy - 6.2 * S); g.stroke();
      g.beginPath(); g.arc(x + 1.2 * S, fy - 4.8 * S, 0.8 * S, 0, TAU); g.stroke();
      // luz dourada suave nas espigas
      glowCircle(g, x, fy - 13 * S, 8 * S, "#ffe9b0", 0.22);
      g.restore();
      return;
    }
    // ========================================================================
    // O ÉDEN (Gn 2–3): o jardim que Deus plantou, o rio que dele saía e os
    // guardas do caminho da árvore da vida.
    // ========================================================================
    case "treeOfLife": {
      // A ÁRVORE DA VIDA (Gn 2:9; 3:22): a MAIS BELA da cena — bem maior que
      // as árvores comuns, tronco largo de casca sulcada com contrafortes e
      // raízes à mostra, copa densa em massas de folhas sobrepostas, frutos de
      // ouro que brilham por si, faíscas de vida subindo devagar e uma aura
      // dourada suave, com a sombra bem assentada no chão.
      const cy = fy - 51 * S;                       // centro da copa
      const cW = 31 * S, cH = 16 * S;               // ~82 unidades de altura total
      const brth = reduce ? 0.5 : Math.sin(t * 0.0009 + x * 0.01) * 0.5 + 0.5;
      const sway = reduce ? 0 : Math.sin(t * 0.0011 + x * 0.02) * 1.5 * S;
      // ---- sombra elíptica bem assentada (larga difusa + contato denso)
      softShadow(g, x, fy + 1 * S, 36 * S, 0.2);
      softShadow(g, x, fy, 24 * S, 0.24);
      g.save();
      g.fillStyle = "rgba(22,40,24,0.3)";
      g.beginPath(); g.ellipse(x, fy - 0.2 * S, 19 * S, 5 * S, 0, 0, TAU); g.fill();
      // ---- aura: halo dourado FORTE colado na copa + luz derramada no chão
      //      (a árvore da vida brilha por si; não é uma árvore verde qualquer)
      glowCircle(g, x, cy - 1 * S, cW * 2.2, "#ffdf96", 0.24 + brth * 0.1);
      glowCircle(g, x, cy + 2 * S, cW * 1.5, "#ffeec2", 0.2 + brth * 0.08);
      glowCircle(g, x, fy - 3 * S, 34 * S, "#ffe7b4", 0.16 + brth * 0.05);
      // ---- montículo de terra de onde a árvore brota
      const mound = g.createLinearGradient(0, fy - 8 * S, 0, fy + 3 * S);
      mound.addColorStop(0, "#63552f"); mound.addColorStop(1, "#43391d");
      g.fillStyle = mound;
      g.beginPath(); g.ellipse(x, fy - 0.2 * S, 21 * S, 4.2 * S, 0, 0, TAU); g.fill();

      // ---- tronco: base alargada em contrafortes, afinando até a copa
      const bark = g.createLinearGradient(x - 27 * S, 0, x + 27 * S, 0);
      bark.addColorStop(0, "#3a250f");
      bark.addColorStop(0.2, "#6d4a27");
      bark.addColorStop(0.46, "#a97d47");
      bark.addColorStop(0.62, "#8c6437");
      bark.addColorStop(0.84, "#5a3c1e");
      bark.addColorStop(1, "#2e1d0c");
      g.fillStyle = bark;
      g.beginPath();
      g.moveTo(x - 17.5 * S, fy + 1.6 * S);
      g.quadraticCurveTo(x - 13 * S, fy - 9 * S, x - 9.6 * S, fy - 21 * S);
      g.quadraticCurveTo(x - 7.6 * S, fy - 33 * S, x - 8.6 * S, fy - 45 * S);
      g.lineTo(x + 8.6 * S, fy - 45 * S);
      g.quadraticCurveTo(x + 7.6 * S, fy - 33 * S, x + 9.6 * S, fy - 21 * S);
      g.quadraticCurveTo(x + 13 * S, fy - 9 * S, x + 17.5 * S, fy + 1.6 * S);
      // base ondulada: a madeira desce em lóbulos, não num corte reto
      g.quadraticCurveTo(x + 13 * S, fy - 3.4 * S, x + 8.6 * S, fy + 0.9 * S);
      g.quadraticCurveTo(x + 4.4 * S, fy - 3.2 * S, x, fy + 1.2 * S);
      g.quadraticCurveTo(x - 4.4 * S, fy - 3.2 * S, x - 8.6 * S, fy + 0.9 * S);
      g.quadraticCurveTo(x - 13 * S, fy - 3.4 * S, x - 17.5 * S, fy + 1.6 * S);
      g.closePath(); g.fill();
      // ---- raízes: cunhas de madeira que saem do contraforte e afinam até
      //      sumir na terra (parte do tronco, não gravetos soltos)
      for (let i = 0; i < 6; i++) {
        const s = i < 3 ? -1 : 1;
        const k = i % 3;
        const x0 = x + s * (9 - k * 1.6) * S, y0 = fy - (7 - k * 2.4) * S;
        const x1 = x + s * (15 + k * 3.4) * S, y1 = fy + (1.4 + k * 0.5) * S;
        const w0 = (4.4 - k * 0.9) * S;
        g.fillStyle = bark;
        g.beginPath();
        g.moveTo(x0, y0 - w0 * 0.8);
        g.quadraticCurveTo(lerp(x0, x1, 0.55), y0 + w0 * 0.1, x1, y1);
        g.quadraticCurveTo(lerp(x0, x1, 0.5), y0 + w0 * 1.5, x0, y0 + w0);
        g.closePath(); g.fill();
        g.strokeStyle = "rgba(26,15,6,0.34)"; g.lineWidth = 0.9 * S; g.lineCap = "round";
        g.beginPath();
        g.moveTo(x0, y0 + w0 * 0.9);
        g.quadraticCurveTo(lerp(x0, x1, 0.5), y0 + w0 * 1.6, x1, y1);
        g.stroke();
        g.strokeStyle = "rgba(212,172,114,0.26)"; g.lineWidth = 0.8 * S;
        g.beginPath();
        g.moveTo(x0, y0 - w0 * 0.55);
        g.quadraticCurveTo(lerp(x0, x1, 0.55), y0 + w0 * 0.25, x1 - s * 1.4 * S, y1 - 0.5 * S);
        g.stroke();
      }
      // relva rente às raízes (assenta a árvore no jardim)
      for (let i = 0; i < 14; i++) {
        const gx = x + (hsh(i, 91) - 0.5) * 54 * S;
        const sc = (0.7 + hsh(i, 17) * 0.55) * S;
        g.strokeStyle = hsh(i, 33) > 0.5 ? "#5c9c4a" : "#417c3c";
        g.lineWidth = 0.9 * sc;
        for (let b = 0; b < 3; b++) {
          const off = (b - 1) * 1.5 * sc;
          g.beginPath();
          g.moveTo(gx + off, fy + 1 * S);
          g.quadraticCurveTo(gx + off, fy - 2.4 * sc, gx + off + (b - 1) * 1.6 * sc, fy - 4.6 * sc);
          g.stroke();
        }
      }
      // ---- casca: fissuras profundas emparelhadas com fios de luz
      for (let i = 0; i < 5; i++) {
        const k = i - 2;
        g.strokeStyle = "rgba(38,23,9,0.45)"; g.lineWidth = (1.4 - Math.abs(k) * 0.2) * S;
        g.beginPath();
        g.moveTo(x + k * 4.4 * S, fy - 2 * S);
        g.quadraticCurveTo(x + k * 3.6 * S, fy - 22 * S, x + k * 2.4 * S, fy - 42 * S);
        g.stroke();
        g.strokeStyle = "rgba(214,172,112,0.18)"; g.lineWidth = 0.7 * S;
        g.beginPath();
        g.moveTo(x + k * 4.4 * S + 1.2 * S, fy - 3 * S);
        g.quadraticCurveTo(x + k * 3.6 * S + 1.2 * S, fy - 22 * S, x + k * 2.4 * S + 1 * S, fy - 41 * S);
        g.stroke();
      }
      // gretas curtas atravessadas (a casca é velha)
      g.strokeStyle = "rgba(40,24,10,0.3)"; g.lineWidth = 0.6 * S;
      for (let i = 0; i < 13; i++) {
        const ky = 4 + hsh(i, 5) * 38;
        const kw = (1 - ky / 62) * 10;
        const px2 = x + (hsh(i, 23) - 0.5) * kw * 2 * S;
        g.beginPath();
        g.moveTo(px2 - 1.4 * S, fy - ky * S);
        g.lineTo(px2 + 1.4 * S, fy - (ky + 0.5) * S);
        g.stroke();
      }
      // nó da casca
      g.fillStyle = "rgba(48,28,10,0.5)";
      g.beginPath(); g.ellipse(x + 3.6 * S, fy - 24 * S, 2.5 * S, 3.4 * S, 0.2, 0, TAU); g.fill();
      g.fillStyle = "rgba(200,156,98,0.22)";
      g.beginPath(); g.ellipse(x + 3.6 * S, fy - 25.2 * S, 1.6 * S, 2.2 * S, 0.2, 0, TAU); g.fill();
      // rim-light no lado esquerdo do tronco
      g.strokeStyle = "rgba(255,232,178,0.3)"; g.lineWidth = 2.2 * S;
      g.beginPath();
      g.moveTo(x - 12.4 * S, fy - 6 * S);
      g.quadraticCurveTo(x - 8.2 * S, fy - 26 * S, x - 7 * S, fy - 43 * S);
      g.stroke();

      // ---- galhos que sustentam a copa (aparecem sob a folhagem)
      for (let i = 0; i < 6; i++) {
        const s = i < 3 ? -1 : 1;
        const k = i % 3;
        const ex = x + s * (17 + k * 6) * S + sway * 0.4;
        const ey = fy - (34 + k * 8) * S;
        g.strokeStyle = "#6b4824";
        g.lineWidth = (3.8 - k * 0.8) * S;
        g.lineCap = "round";
        g.beginPath();
        g.moveTo(x + s * 4 * S, fy - (28 + k * 4) * S);
        g.quadraticCurveTo(x + s * (10 + k * 4) * S, fy - (31 + k * 6) * S, ex, ey);
        g.stroke();
        g.strokeStyle = "#8d6636";
        g.lineWidth = (1.4 - k * 0.2) * S;
        g.beginPath();
        g.moveTo(ex, ey);
        g.lineTo(ex + s * 4.8 * S, ey - 3 * S);
        g.stroke();
      }

      // ---- COPA: quatro massas de folhas sobrepostas. Os gradientes são
      //      criados UMA vez e cobrem a copa inteira, então a luz cai igual
      //      em todas as massas (sol no alto, à esquerda).
      const blob = (mx: number, my: number, r: number, seed: number, kk: number) => {
        g.beginPath();
        for (let i = 0; i < 9; i++) {
          const a = (i / 9) * TAU + seed;
          const rd = 0.54 + hsh(i, seed) * 0.42;
          g.ellipse(
            mx + Math.cos(a) * r * rd * kk,
            my + Math.sin(a) * r * rd * 0.7 * kk,
            r * (0.4 + hsh(i, seed + 3) * 0.2) * kk,
            r * (0.32 + hsh(i, seed + 9) * 0.18) * kk,
            a * 0.4, 0, TAU,
          );
        }
        g.ellipse(mx, my, r * 0.82 * kk, r * 0.64 * kk, 0, 0, TAU);
        g.fill();
      };
      const mX = (i: number) => x + sway * 0.5 + cW * (i === 0 ? -0.68 : i === 1 ? 0.64 : i === 2 ? -0.06 : i === 3 ? -0.2 : 0.4);
      const mY = (i: number) => cy + cH * (i === 0 ? 0.2 : i === 1 ? 0.08 : i === 2 ? 0.46 : i === 3 ? -0.66 : -0.5);
      const mR = (i: number) => cW * (i === 0 ? 0.46 : i === 1 ? 0.44 : i === 2 ? 0.46 : i === 3 ? 0.48 : 0.38);
      // Copa ouro-esmeralda luminosa: verde vivo por baixo, banhado de ouro por
      // cima — a folhagem parece iluminada de dentro (distingue-a das árvores comuns).
      const deepG = g.createRadialGradient(x - cW * 0.34, cy - cH * 0.7, cW * 0.1, x, cy + cH * 0.2, cW * 1.5);
      deepG.addColorStop(0, "#5aa84f"); deepG.addColorStop(0.5, "#347036"); deepG.addColorStop(1, "#173f1f");
      const midG = g.createRadialGradient(x - cW * 0.36, cy - cH * 0.9, cW * 0.08, x, cy, cW * 1.3);
      midG.addColorStop(0, "#e8f2a0"); midG.addColorStop(0.42, "#a8d566"); midG.addColorStop(1, "#4f9a45");
      const litG = g.createRadialGradient(x - cW * 0.34, cy - cH * 1.1, cW * 0.05, x - cW * 0.15, cy - cH * 0.5, cW * 0.95);
      litG.addColorStop(0, "rgba(255,250,206,0.9)");
      litG.addColorStop(0.45, "rgba(238,224,140,0.5)");
      litG.addColorStop(1, "rgba(206,220,120,0)");
      for (let i = 0; i < 5; i++) { g.fillStyle = deepG; blob(mX(i), mY(i) + 2.2 * S, mR(i), i * 3 + 1, 1); }
      for (let i = 0; i < 5; i++) { g.fillStyle = midG; blob(mX(i), mY(i) - 0.4 * S, mR(i), i * 3 + 2, 0.93); }
      const warmG = g.createRadialGradient(x + cW * 0.5, cy + cH * 0.5, cW * 0.05, x + cW * 0.2, cy + cH * 0.3, cW * 0.95);
      warmG.addColorStop(0, "rgba(255,224,132,0.5)");
      warmG.addColorStop(1, "rgba(214,196,104,0)");
      for (let i = 0; i < 5; i++) { g.fillStyle = warmG; blob(mX(i) + mR(i) * 0.18, mY(i) + mR(i) * 0.24, mR(i), i * 3 + 8, 0.52); }
      for (let i = 0; i < 5; i++) { g.fillStyle = litG; blob(mX(i) - mR(i) * 0.22, mY(i) - mR(i) * 0.36, mR(i), i * 3 + 5, 0.58); }
      // folhinhas soltas no contorno de cima (a copa respira, não é um recorte)
      g.fillStyle = midG;
      for (let i = 0; i < 15; i++) {
        const m = i % 5;
        const a = hsh(i, 67) * TAU;
        const r = mR(m) * (0.86 + hsh(i, 83) * 0.2);
        const lx = mX(m) + Math.cos(a) * r;
        const ly = mY(m) + Math.sin(a) * r * 0.72;
        g.beginPath();
        g.ellipse(lx, ly, (2.2 + hsh(i, 71) * 1.6) * S, (1.5 + hsh(i, 79) * 1.1) * S, a, 0, TAU);
        g.fill();
      }

      // ---- frutos de ouro (gradientes criados UMA vez; posicionados por translate)
      const fruitGlow = g.createRadialGradient(0, 0, 0.4, 0, 0, 7.5 * S);
      fruitGlow.addColorStop(0, "rgba(255,240,178,0.95)");
      fruitGlow.addColorStop(0.38, "rgba(255,206,96,0.38)");
      fruitGlow.addColorStop(1, "rgba(255,190,70,0)");
      const fruitBody = g.createRadialGradient(-1 * S, -1.2 * S, 0.2, 0, 0, 3 * S);
      fruitBody.addColorStop(0, "#fff7d2"); fruitBody.addColorStop(0.45, "#ffc94e"); fruitBody.addColorStop(1, "#c47713");
      for (let i = 0; i < 15; i++) {
        const a = i * 2.3999632;
        const rd = 0.3 + hsh(i, 23) * 0.68;
        const fx2 = x + sway * 0.5 + Math.cos(a) * cW * 0.88 * rd;
        const fy2 = cy + Math.sin(a) * cH * 1.5 * rd - cH * 0.16;
        const pulse = reduce ? 0.72 : 0.56 + Math.sin(t * 0.0026 + i * 1.7) * 0.34;
        g.save();
        g.translate(fx2, fy2);
        g.globalAlpha = pulse;
        g.fillStyle = fruitGlow;
        g.beginPath(); g.arc(0, 0, 7.5 * S, 0, TAU); g.fill();
        g.globalAlpha = 1;
        g.fillStyle = fruitBody;
        g.beginPath(); g.arc(0, 0, 2.6 * S, 0, TAU); g.fill();
        g.fillStyle = "rgba(255,253,232,0.9)";
        g.beginPath(); g.arc(-0.95 * S, -1 * S, 0.85 * S, 0, TAU); g.fill();
        g.restore();
      }
      // frutos pendurados sob a copa (dão peso e profundidade à folhagem)
      g.strokeStyle = "#6b4824"; g.lineWidth = 0.7 * S; g.lineCap = "round";
      for (let i = 0; i < 4; i++) {
        const hx = x + sway * 0.5 + (i - 1.5) * cW * 0.5;
        const hy = cy + cH * (0.98 + hsh(i, 87) * 0.22);
        const dropk = reduce ? 0 : Math.sin(t * 0.0014 + i * 1.9) * 0.6 * S;
        g.beginPath(); g.moveTo(hx, hy); g.lineTo(hx + dropk, hy + 4 * S); g.stroke();
        g.save();
        g.translate(hx + dropk, hy + 6.2 * S);
        g.globalAlpha = reduce ? 0.72 : 0.6 + Math.sin(t * 0.0026 + i) * 0.3;
        g.fillStyle = fruitGlow;
        g.beginPath(); g.arc(0, 0, 7.5 * S, 0, TAU); g.fill();
        g.globalAlpha = 1;
        g.fillStyle = fruitBody;
        g.beginPath(); g.arc(0, 0, 2.4 * S, 0, TAU); g.fill();
        g.fillStyle = "rgba(255,253,232,0.9)";
        g.beginPath(); g.arc(-0.85 * S, -0.9 * S, 0.75 * S, 0, TAU); g.fill();
        g.restore();
      }

      // ---- faíscas de vida subindo devagar por dentro da aura
      if (!reduce) {
        g.fillStyle = "#fff8d4";
        for (let i = 0; i < 18; i++) {
          const ph = (t * 0.00024 + hsh(i, 5)) % 1;
          const px2 = x + (hsh(i, 31) - 0.5) * cW * 2.1 + Math.sin(ph * 6.5 + i) * 3 * S;
          const py2 = fy - 6 * S - ph * 88 * S;
          g.globalAlpha = Math.sin(ph * Math.PI) * 0.85;
          g.beginPath(); g.arc(px2, py2, (0.7 + hsh(i, 47) * 1) * S, 0, TAU); g.fill();
        }
        g.globalAlpha = 1;
      }
      g.restore();
      return;
    }
    case "treeOfKnowledge": {
      // A ÁRVORE DO CONHECIMENTO DO BEM E DO MAL (Gn 2:17): imponente e
      // "agradável aos olhos" — mas de folhagem escura e azulada, galhos
      // retorcidos, frutos vermelho-escuros e um brilho frio; a sombra que
      // lança no chão é mais densa que a de qualquer outra árvore.
      const cy = fy - 44 * S;
      const brth = reduce ? 0.5 : Math.sin(t * 0.0008 + x * 0.013) * 0.5 + 0.5;
      const sway = reduce ? 0 : Math.sin(t * 0.0009 + x * 0.02) * 1.2 * S;
      softShadow(g, x, fy, 34 * S, 0.34);
      softShadow(g, x, fy, 17 * S, 0.34);
      g.save();
      // brilho frio ao redor da copa (atração, não maldição)
      glowCircle(g, x, cy, 40 * S, "#9ec6e0", 0.1 + brth * 0.05);
      // ---- base retorcida
      g.lineCap = "round";
      for (let i = 0; i < 5; i++) {
        const s = i - 2;
        const dir = s < 0 ? -1 : 1;
        g.strokeStyle = "#402d1c";
        g.lineWidth = (3 - Math.abs(s) * 0.4) * S;
        g.beginPath();
        g.moveTo(x + s * 1.6 * S, fy - 7 * S);
        g.quadraticCurveTo(x + s * 3.8 * S, fy - 2.4 * S, x + s * 2.6 * S + dir * (7 + Math.abs(s) * 2.6) * S, fy + 0.6 * S);
        g.stroke();
      }
      // ---- tronco torcido (dois cotovelos)
      const bark2 = g.createLinearGradient(x - 11 * S, 0, x + 11 * S, 0);
      bark2.addColorStop(0, "#2a1f16");
      bark2.addColorStop(0.3, "#54402c");
      bark2.addColorStop(0.55, "#7a614a");
      bark2.addColorStop(0.8, "#453324");
      bark2.addColorStop(1, "#241a12");
      g.fillStyle = bark2;
      g.beginPath();
      g.moveTo(x - 10 * S, fy + 0.5 * S);
      g.quadraticCurveTo(x - 9.4 * S, fy - 13 * S, x - 2.6 * S, fy - 21 * S);
      g.quadraticCurveTo(x + 3.6 * S, fy - 28 * S, x - 1.6 * S, fy - 38 * S);
      g.lineTo(x + 5.6 * S, fy - 39.6 * S);
      g.quadraticCurveTo(x + 9.4 * S, fy - 28 * S, x + 3.6 * S, fy - 20 * S);
      g.quadraticCurveTo(x - 1.4 * S, fy - 13 * S, x + 1.6 * S, fy + 0.5 * S);
      g.closePath(); g.fill();
      // nós e fissuras
      g.strokeStyle = "rgba(20,14,8,0.5)"; g.lineWidth = 0.85 * S;
      for (let i = 0; i < 4; i++) {
        const k = i * 0.25;
        g.beginPath();
        g.moveTo(x - 7 * S + i * 3 * S, fy - 3 * S);
        g.quadraticCurveTo(x - 2 * S + k * 8 * S, fy - 20 * S, x + 0.6 * S + i * 1.2 * S, fy - 37 * S);
        g.stroke();
      }
      g.strokeStyle = "rgba(190,168,140,0.2)"; g.lineWidth = 1.3 * S;
      g.beginPath();
      g.moveTo(x - 7.4 * S, fy - 6 * S);
      g.quadraticCurveTo(x - 1.4 * S, fy - 22 * S, x - 0.6 * S, fy - 36 * S);
      g.stroke();
      // ---- galhos retorcidos (dois cotovelos por galho)
      g.strokeStyle = "#54402c";
      for (let i = 0; i < 6; i++) {
        const s = i < 3 ? -1 : 1;
        const k = i % 3;
        const mx = x + s * (7 + k * 3) * S;
        const my = fy - (34 + k * 3.5) * S;
        g.lineWidth = (2.8 - k * 0.55) * S;
        g.beginPath();
        g.moveTo(x + s * 2.4 * S, fy - (30 + k * 3) * S);
        g.quadraticCurveTo(mx + s * 4 * S, my + 3 * S, mx, my - 3 * S);
        g.quadraticCurveTo(mx - s * 1.5 * S, my - 8 * S, mx + s * (5 + k * 4) * S + sway * 0.3, my - (7 + k * 3) * S);
        g.stroke();
      }
      // ---- copa escura e azulada, em tufos separados
      const cW = 24 * S, cH = 18 * S;
      const puff2 = (oy: number, rx: number, ry: number, seed: number) => {
        g.beginPath();
        for (let i = 0; i < 9; i++) {
          const a = (i / 9) * TAU + seed * 0.9;
          const rd = 0.54 + hsh(i, seed) * 0.46;
          g.ellipse(
            x + Math.cos(a) * rx * rd + sway * 0.5,
            cy + oy + Math.sin(a) * ry * rd * 0.88,
            rx * (0.34 + hsh(i, seed + 5) * 0.2),
            ry * (0.36 + hsh(i, seed + 17) * 0.22),
            a * 0.5, 0, TAU,
          );
        }
        g.ellipse(x + sway * 0.5, cy + oy, rx * 0.66, ry * 0.74, 0, 0, TAU);
        g.fill();
      };
      const deepK = g.createRadialGradient(x - cW * 0.25, cy - cH * 0.5, cW * 0.1, x, cy, cW * 1.2);
      deepK.addColorStop(0, "#27554c"); deepK.addColorStop(0.6, "#173a37"); deepK.addColorStop(1, "#0e2426");
      g.fillStyle = deepK; puff2(4.5 * S, cW, cH, 7);
      const midK = g.createRadialGradient(x - cW * 0.32, cy - cH * 0.72, cW * 0.08, x, cy - cH * 0.1, cW);
      midK.addColorStop(0, "#4c8f77"); midK.addColorStop(0.55, "#2f6a5c"); midK.addColorStop(1, "#1a4340");
      g.fillStyle = midK; puff2(-2 * S, cW * 0.86, cH * 0.9, 19);
      const litK = g.createRadialGradient(x - cW * 0.28, cy - cH * 0.95, cW * 0.06, x - cW * 0.1, cy - cH * 0.4, cW * 0.75);
      litK.addColorStop(0, "rgba(176,222,214,0.5)");
      litK.addColorStop(0.6, "rgba(122,178,178,0.2)");
      litK.addColorStop(1, "rgba(110,164,168,0)");
      g.fillStyle = litK; puff2(-8 * S, cW * 0.58, cH * 0.54, 29);
      // ---- frutos vermelho-escuros, lustrosos e atraentes
      const fGlowK = g.createRadialGradient(0, 0, 0.4, 0, 0, 5 * S);
      fGlowK.addColorStop(0, "rgba(220,96,96,0.44)");
      fGlowK.addColorStop(0.5, "rgba(150,40,54,0.2)");
      fGlowK.addColorStop(1, "rgba(120,30,44,0)");
      const fBodyK = g.createRadialGradient(-0.8 * S, -1 * S, 0.2, 0, 0, 2.5 * S);
      fBodyK.addColorStop(0, "#d4544e"); fBodyK.addColorStop(0.5, "#9c1f2c"); fBodyK.addColorStop(1, "#4e0d16");
      for (let i = 0; i < 9; i++) {
        const a = i * 2.3999632 + 0.7;
        const rd = 0.4 + hsh(i, 37) * 0.56;
        const fx2 = x + Math.cos(a) * cW * rd + sway * 0.5;
        const fy2 = cy + Math.sin(a) * cH * rd * 0.92 + 2.4 * S;
        const shine = reduce ? 0.7 : 0.55 + Math.sin(t * 0.0021 + i * 2.1) * 0.35;
        g.save();
        g.translate(fx2, fy2);
        g.globalAlpha = shine;
        g.fillStyle = fGlowK;
        g.beginPath(); g.arc(0, 0, 5 * S, 0, TAU); g.fill();
        g.globalAlpha = 1;
        g.fillStyle = fBodyK;
        g.beginPath(); g.ellipse(0, 0, 2.3 * S, 2.5 * S, 0, 0, TAU); g.fill();
        g.fillStyle = `rgba(255,228,226,${0.5 + shine * 0.4})`;
        g.beginPath(); g.ellipse(-0.8 * S, -1 * S, 0.7 * S, 0.5 * S, -0.5, 0, TAU); g.fill();
        g.strokeStyle = "#3a2416"; g.lineWidth = 0.5 * S;
        g.beginPath(); g.moveTo(0, -2.4 * S); g.lineTo(0.5 * S, -3.6 * S); g.stroke();
        g.restore();
      }
      g.restore();
      return;
    }
    case "edenRiver": {
      // O RIO QUE SAÍA DO ÉDEN PARA REGAR O JARDIM (Gn 2:10): um CURSO D'ÁGUA
      // de verdade atravessando o palco em perspectiva — bem largo na frente,
      // estreitando até sumir no fundo do jardim — com margens irregulares,
      // barrancos de terra úmida com relva pendendo, pedras no leito,
      // correnteza cristalina em várias camadas e névoa leve nas bordas.
      const yFar = fy - 45 * S;               // some no arvoredo, lá no fundo
      const yNear = fy + 12 * S;
      const nearHW = 100 * S;                 // ~200 unidades de largura na base
      const farHW = 9 * S;
      const flow = reduce ? 0.2 : t * 0.00016;
      const N = 22;
      // k: 0 = fundo, 1 = frente — linhas mais espaçadas e largas à frente
      const yAt = (k: number) => yFar + (yNear - yFar) * (k * 0.3 + k * k * 0.7);
      const hwAt = (k: number) => lerp(farHW, nearHW, k * 0.42 + k * k * 0.58);
      // o leito SERPENTEIA de leve — rio nenhum é um triângulo simétrico
      const cAt = (k: number) => x + Math.sin(k * 2.3 + 0.6) * 11 * S - 6.2 * S;
      // margens IRREGULARES: duas ondas de frequências diferentes, que crescem
      // conforme o rio se aproxima (o fundo é liso, a frente é recortada)
      const edge = (s: number, k: number) =>
        cAt(k) + s * hwAt(k) +
        (Math.sin(k * 8.4 + (s > 0 ? 1.9 : 4.8)) * 0.62 +
         Math.sin(k * 20.7 + (s > 0 ? 3.3 : 0.7)) * 0.3) * (1 + k * 10) * S;
      // contorno do leito; `grow` alarga as MARGENS (nunca a frente: o rio
      // segue correndo para fora do quadro, não é um tanque fechado)
      const outline = (grow: number) => {
        g.beginPath();
        for (let i = 0; i <= N; i++) {
          const k = i / N;
          const px = edge(-1, k) - grow * (0.5 + k * 0.9);
          if (i === 0) g.moveTo(px, yAt(k)); else g.lineTo(px, yAt(k));
        }
        const lx = edge(-1, 1) - grow * 1.2, rx = edge(1, 1) + grow * 1.2;
        for (let j = 1; j < 7; j++) {
          const u = j / 7;
          g.lineTo(lerp(lx, rx, u), yNear + Math.sin(u * Math.PI) * 6 * S + Math.sin(u * 17) * 1.4 * S);
        }
        for (let i = N; i >= 0; i--) {
          const k = i / N;
          g.lineTo(edge(1, k) + grow * (0.5 + k * 0.9), yAt(k));
        }
        g.closePath();
      };

      g.save();
      // ---- 1. barranco: terra úmida margeando o leito dos dois lados
      const soil = g.createLinearGradient(0, yFar, 0, yNear + 6 * S);
      soil.addColorStop(0, "#37452a");
      soil.addColorStop(0.4, "#544d2d");
      soil.addColorStop(0.76, "#726038");
      soil.addColorStop(1, "#836e42");
      g.fillStyle = soil;
      outline(13 * S); g.fill();
      const soilWet = g.createLinearGradient(0, yFar, 0, yNear + 4 * S);
      soilWet.addColorStop(0, "#26331e");
      soilWet.addColorStop(0.5, "#413a24");
      soilWet.addColorStop(1, "#524528");
      g.fillStyle = soilWet;
      outline(5 * S); g.fill();
      // pedrinhas e torrões espalhados pelo barranco
      for (let i = 0; i < 18; i++) {
        const s = i % 2 === 0 ? -1 : 1;
        const k = 0.1 + hsh(i, 87) * 0.88;
        const px = edge(s, k) + s * (1.6 + hsh(i, 13) * 7) * S;
        const py = yAt(k);
        const rs = (0.5 + hsh(i, 29) * 1.2) * (0.5 + k) * S;
        g.fillStyle = hsh(i, 47) > 0.5 ? "rgba(118,106,74,0.7)" : "rgba(78,70,48,0.7)";
        g.beginPath(); g.ellipse(px, py, rs * 1.3, rs * 0.7, hsh(i, 3), 0, TAU); g.fill();
      }

      // ---- 2. lâmina d'água (fundo escuro e profundo → frente clara e rasa)
      const wat = g.createLinearGradient(0, yFar, 0, yNear + 4 * S);
      wat.addColorStop(0, "#0c3a5c");
      wat.addColorStop(0.22, "#186a99");
      wat.addColorStop(0.52, "#2f9dc4");
      wat.addColorStop(0.8, "#5cc6de");
      wat.addColorStop(1, "#93dfee");
      g.fillStyle = wat;
      outline(0); g.fill();

      // ---- 3. tudo o que vive DENTRO do leito
      g.save();
      outline(0); g.clip();
      // sombra fria junto às margens (o barranco se projeta na água)
      const bankSh = g.createLinearGradient(x - nearHW * 1.1, 0, x + nearHW * 1.1, 0);
      bankSh.addColorStop(0, "rgba(8,40,66,0.55)");
      bankSh.addColorStop(0.24, "rgba(8,40,66,0)");
      bankSh.addColorStop(0.76, "rgba(8,40,66,0)");
      bankSh.addColorStop(1, "rgba(8,40,66,0.55)");
      g.fillStyle = bankSh;
      g.fillRect(x - nearHW * 1.2, yFar - 2 * S, nearHW * 2.4, (yNear - yFar) + 12 * S);
      // canal fundo (talvegue): a água é mais funda no meio do leito
      const deepCh = g.createLinearGradient(0, yFar, 0, yAt(0.86));
      deepCh.addColorStop(0, "rgba(6,34,56,0.5)");
      deepCh.addColorStop(1, "rgba(6,34,56,0)");
      g.fillStyle = deepCh;
      g.beginPath();
      for (let i = 0; i <= N; i++) {
        const k = i / N;
        if (i === 0) g.moveTo(cAt(k) - hwAt(k) * 0.4, yAt(k)); else g.lineTo(cAt(k) - hwAt(k) * 0.4, yAt(k));
      }
      for (let i = N; i >= 0; i--) {
        const k = i / N;
        g.lineTo(cAt(k) + hwAt(k) * 0.4, yAt(k));
      }
      g.closePath(); g.fill();
      // pedras no leito (menores e mais pálidas ao fundo)
      for (let i = 0; i < 11; i++) {
        const k = 0.24 + hsh(i, 61) * 0.72;
        const px = cAt(k) + (hsh(i, 13) - 0.5) * hwAt(k) * 1.7;
        const py = yAt(k);
        const rs = (1.2 + hsh(i, 29) * 2) * (0.34 + k * 0.9) * S;
        g.fillStyle = "rgba(20,46,58,0.4)";
        g.beginPath(); g.ellipse(px, py + rs * 0.42, rs * 1.35, rs * 0.6, 0, 0, TAU); g.fill();
        g.fillStyle = hsh(i, 71) > 0.5 ? "#6d8390" : "#4f6776";
        g.beginPath(); g.ellipse(px, py, rs, rs * 0.62, hsh(i, 5) * 1.2, 0, TAU); g.fill();
        g.fillStyle = "rgba(190,226,238,0.32)";
        g.beginPath(); g.ellipse(px - rs * 0.3, py - rs * 0.24, rs * 0.44, rs * 0.22, -0.4, 0, TAU); g.fill();
        // esteira de espuma logo à frente da pedra (a água corre para cá)
        g.strokeStyle = "rgba(255,255,255,0.42)"; g.lineWidth = 0.7 * S;
        g.beginPath();
        g.moveTo(px - rs * 0.95, py + rs * 0.55);
        g.quadraticCurveTo(px, py + rs * 2.4, px + rs * 0.95, py + rs * 0.55);
        g.stroke();
      }
      // ---- CORRENTEZA: fios de água NO SENTIDO DO CURSO (fundo → frente),
      //      abrindo em perspectiva. É isto que faz o rio "correr".
      const streak = (u: number, k0: number, k1: number, thick: number) => {
        g.beginPath();
        for (let side = 0; side < 2; side++) {
          const sg = side === 0 ? -1 : 1;
          for (let j = 0; j <= 8; j++) {
            const q = side === 0 ? j / 8 : 1 - j / 8;
            const k = lerp(k0, k1, q);
            const px = cAt(k) + u * hwAt(k) * 0.88 + Math.sin(k * 10 + u * 5) * 2.2 * S;
            const th = Math.sin(q * Math.PI) * thick * (0.3 + k) * sg;
            if (side === 0 && j === 0) g.moveTo(px + th, yAt(k)); else g.lineTo(px + th, yAt(k));
          }
        }
        g.closePath(); g.fill();
      };
      for (let i = 0; i < 13; i++) {
        const u = (hsh(i, 3) - 0.5) * 1.82;
        const p = (flow * 22 + i / 13) % 1;
        const k1 = Math.min(1, p + 0.26 + hsh(i, 19) * 0.22);
        g.fillStyle = hsh(i, 37) > 0.32 ? "rgba(232,251,255,0.9)" : "rgba(22,84,124,0.5)";
        g.globalAlpha = Math.sin(Math.min(1, p + 0.14) * Math.PI) * (0.28 + hsh(i, 29) * 0.34);
        streak(u, p, k1, (1 + hsh(i, 41) * 1.7) * S);
      }
      g.globalAlpha = 1;
      // riffles: cristas curtas em "V" na parte rasa da frente
      g.lineCap = "round";
      g.strokeStyle = "rgba(244,254,255,0.95)";
      for (let i = 0; i < 8; i++) {
        const k = 0.42 + ((flow * 30 + i / 8) % 1) * 0.58;
        const yy = yAt(k);
        const w = hwAt(k);
        const cx2 = cAt(k) + (hsh(i, 53) - 0.5) * w * 1.1;
        const hw = (6 + hsh(i, 23) * 14) * (0.4 + k) * S;
        g.globalAlpha = (k - 0.42) * 0.7;
        g.lineWidth = (0.5 + k * 0.9) * S;
        g.beginPath();
        g.moveTo(cx2 - hw, yy);
        g.quadraticCurveTo(cx2, yy + (1.4 + k * 3.4) * S, cx2 + hw, yy);
        g.stroke();
      }
      g.globalAlpha = 1;
      // reflexo do sol cintilando na superfície
      if (!reduce) {
        g.fillStyle = "#ffffff";
        for (let i = 0; i < 22; i++) {
          const k = hsh(i, 3) * 0.9 + 0.08;
          const ph = t * 0.0013 + hsh(i, 23) * 6.28;
          const w = hwAt(k);
          const centered = hsh(i, 59) > 0.45;
          g.globalAlpha = Math.max(0, Math.sin(ph)) * (0.2 + k * 0.55);
          const lw = (2.4 + hsh(i, 41) * 6) * (0.3 + k) * S;
          const px = cAt(k) + (centered ? (hsh(i, 17) - 0.5) * w * 0.55 - 4 * S : (hsh(i, 17) - 0.5) * w * 1.7);
          g.fillRect(px - lw * 0.5, yAt(k), lw, (0.5 + k * 0.8) * S);
        }
        g.globalAlpha = 1;
      }
      // três clarões fortes: o sol batendo em cheio na lâmina d'água
      if (!reduce) {
        for (let i = 0; i < 3; i++) {
          const k = 0.5 + i * 0.17;
          const ph = Math.max(0, Math.sin(t * 0.0011 + i * 2.1));
          glowCircle(g, cAt(k) + (i - 1.2) * 16 * S, yAt(k), (7 + i * 2) * S, "#ffffff", 0.16 + ph * 0.22);
        }
      }
      // véu claro na boca do rio, na frente (água rasa sobre o cascalho)
      const shallow = g.createLinearGradient(0, yAt(0.84), 0, yNear + 4 * S);
      shallow.addColorStop(0, "rgba(224,250,252,0)");
      shallow.addColorStop(1, "rgba(226,250,254,0.26)");
      g.fillStyle = shallow;
      g.fillRect(x - nearHW * 1.3, yAt(0.84), nearHW * 2.6, (yNear - yAt(0.84)) + 6 * S);
      // e o fundo se apaga no arvoredo (o rio VEM de longe)
      const farFade = g.createLinearGradient(0, yFar - 1 * S, 0, yAt(0.3));
      farFade.addColorStop(0, "rgba(30,58,48,0.62)");
      farFade.addColorStop(1, "rgba(30,58,48,0)");
      g.fillStyle = farFade;
      g.fillRect(x - nearHW * 1.3, yFar - 2 * S, nearHW * 2.6, (yAt(0.3) - yFar) + 2 * S);
      g.restore();

      // ---- 4. linha de espuma nas duas margens
      g.lineCap = "round";
      for (let si = 0; si < 2; si++) {
        const s = si === 0 ? -1 : 1;
        g.strokeStyle = "rgba(246,253,255,0.55)";
        g.lineWidth = 1.1 * S;
        g.beginPath();
        for (let i = 2; i <= N; i++) {
          const k = i / N;
          if (i === 2) g.moveTo(edge(s, k), yAt(k)); else g.lineTo(edge(s, k), yAt(k));
        }
        g.stroke();
        // bolhas de espuma acumuladas na beira
        g.fillStyle = "rgba(255,255,255,0.5)";
        for (let i = 0; i < 9; i++) {
          const k = 0.22 + hsh(i, 21 + si) * 0.76;
          const bb = reduce ? 0 : Math.sin(t * 0.0018 + i * 2.3 + si) * 0.8 * S;
          g.beginPath();
          g.ellipse(edge(s, k) - s * (1 + hsh(i, 7) * 2) * S, yAt(k) + bb,
            (0.9 + hsh(i, 35) * 1.6) * (0.4 + k) * S, (0.5 + hsh(i, 51) * 0.7) * (0.4 + k) * S, 0, 0, TAU);
          g.fill();
        }
      }

      // ---- 5. relva pendendo do barranco sobre a água
      for (let si = 0; si < 2; si++) {
        const s = si === 0 ? -1 : 1;
        for (let i = 0; i < 17; i++) {
          const k = 0.03 + (i / 17) * 0.97;
          const gx = edge(s, k) + s * (4.4 + k * 7) * S;
          const gy = yAt(k);
          const sc = (0.4 + k * 1.2) * S;
          const bend = reduce ? 0 : Math.sin(t * 0.0015 + i * 1.4 + si * 2) * 0.7 * sc;
          g.strokeStyle = hsh(i, 9 + si) > 0.5 ? "#5f9c4c" : "#3f7c3c";
          g.lineWidth = 0.95 * sc;
          for (let b = 0; b < 4; b++) {
            const off = (b - 1.5) * 1.7 * sc;
            g.beginPath();
            g.moveTo(gx + off, gy);
            g.quadraticCurveTo(gx + off + bend, gy - 3.4 * sc, gx + off - s * 1.7 * sc + bend * 1.7, gy - 6 * sc);
            g.stroke();
          }
        }
      }
      // juncos altos nos dois cantos da frente — quebram a borda de baixo e
      // dão a impressão de que a água segue para fora do quadro
      for (let si = 0; si < 2; si++) {
        const s = si === 0 ? -1 : 1;
        for (let i = 0; i < 5; i++) {
          const rx = edge(s, 1) - s * (i * 5 + hsh(i, 77) * 4) * S;
          const ry = yNear + (1.4 - i * 0.5) * S;
          const sc = (1.5 - i * 0.16) * S;
          const bend = reduce ? 0 : Math.sin(t * 0.0013 + i * 1.7 + si * 3) * 1.1 * sc;
          g.strokeStyle = hsh(i, 63 + si) > 0.5 ? "#568f45" : "#3c7238";
          g.lineWidth = 1 * sc;
          for (let b = 0; b < 3; b++) {
            const off = (b - 1) * 2.2 * sc;
            g.beginPath();
            g.moveTo(rx + off, ry);
            g.quadraticCurveTo(rx + off + bend * 0.6, ry - 5 * sc, rx + off + bend * 1.8 - s * 1.2 * sc, ry - 9.5 * sc);
            g.stroke();
          }
        }
      }

      // ---- 5b. a BOCA do rio, na frente: cascalho molhado e espuma, para a
      //          água não terminar num corte reto contra a relva
      const mouthY = (u: number) => yNear + Math.sin(u * Math.PI) * 6 * S + Math.sin(u * 17) * 1.4 * S;
      const mouthX = (u: number) => lerp(edge(-1, 1), edge(1, 1), u);
      g.strokeStyle = "rgba(250,255,255,0.7)"; g.lineWidth = 1.4 * S;
      g.beginPath();
      for (let i = 0; i <= 16; i++) {
        const u = i / 16;
        if (i === 0) g.moveTo(mouthX(u), mouthY(u) - 0.6 * S); else g.lineTo(mouthX(u), mouthY(u) - 0.6 * S);
      }
      g.stroke();
      for (let i = 0; i < 13; i++) {
        const u = 0.05 + hsh(i, 95) * 0.9;
        const px = mouthX(u);
        const py = mouthY(u) + (hsh(i, 5) - 0.2) * 2.2 * S;
        const rs = (0.7 + hsh(i, 39) * 1.3) * S;
        g.fillStyle = "rgba(28,44,42,0.3)";
        g.beginPath(); g.ellipse(px, py + rs * 0.4, rs * 1.3, rs * 0.6, 0, 0, TAU); g.fill();
        g.fillStyle = hsh(i, 73) > 0.5 ? "#7d8a8c" : "#5f6d72";
        g.beginPath(); g.ellipse(px, py, rs, rs * 0.62, hsh(i, 17) * 1.3, 0, TAU); g.fill();
        g.fillStyle = "rgba(232,248,252,0.4)";
        g.beginPath(); g.ellipse(px - rs * 0.3, py - rs * 0.24, rs * 0.42, rs * 0.2, -0.4, 0, TAU); g.fill();
      }
      // ---- 6. névoa leve subindo das bordas e da boca do rio, lá no fundo
      mistBand(g, x, yFar + 4 * S, 20 * S, 3.4 * S, "rgba(214,238,246,0.26)", 0.5);
      mistBand(g, x - nearHW * 0.7, yAt(0.74), 30 * S, 5.5 * S, "rgba(222,244,250,0.22)", 0.5);
      mistBand(g, x + nearHW * 0.7, yAt(0.68), 28 * S, 5 * S, "rgba(222,244,250,0.22)", 0.5);
      g.restore();
      return;
    }
    case "riverFork": {
      // "DALI SE DIVIDIA E SE TORNAVA EM QUATRO BRAÇOS" (Gn 2:10-14): o rio do
      // Éden chega LARGO pela frente e, ao fundo, se reparte em QUATRO leitos
      // distintos que abrem em leque — Pisom, Giom, Tigre e Eufrates. Cada
      // braço leva suas margens e sua correnteza, estreitando ao se afastar.
      const yBase = fy + 12 * S;
      const yJoin = fy - 13 * S;              // altura em que o rio se reparte
      const stemHW0 = 64 * S;                 // ~128 unidades no tronco, na frente
      const stemHW1 = 38 * S;
      const flow = reduce ? 0.2 : t * 0.00019;
      const RN = 16;
      // --- geometria dos quatro braços (leque em perspectiva) -------------
      const out = (i: number) => (i === 0 || i === 3 ? 1 : 0);           // braços de fora
      const sgn = (i: number) => (i < 2 ? -1 : 1);
      const aSX = (i: number) => x + (i - 1.5) * 23 * S;
      const aSY = (i: number) => yJoin + (out(i) ? 3 : 0) * S;
      const aEX = (i: number) => x + sgn(i) * (out(i) ? 114 : 62) * S + (i === 0 ? -4 : i === 3 ? 3 : 0) * S;
      const aEY = (i: number) => fy - (out(i) ? 41 : 45) * S + (i === 1 ? 2 : i === 3 ? 1.5 : 0) * S;
      // controle no meio do caminho: o braço sai subindo e ARQUEIA ao abrir
      const aCX = (i: number) => lerp(aSX(i), aEX(i), out(i) ? 0.46 : 0.38);
      const aCY = (i: number) => lerp(aSY(i), aEY(i), out(i) ? 0.82 : 0.74);
      // eixo do braço = quadrática + um serpentear leve (rio não é régua)
      const aX = (i: number, k: number) => {
        const u = 1 - k;
        return u * u * aSX(i) + 2 * u * k * aCX(i) + k * k * aEX(i) +
          Math.sin(k * 5.2 + i * 2.1) * (1 - k * 0.5) * 3.4 * S;
      };
      const aY = (i: number, k: number) => {
        const u = 1 - k;
        return u * u * aSY(i) + 2 * u * k * aCY(i) + k * k * aEY(i) +
          Math.sin(k * 4.4 + i * 1.3) * (1 - k * 0.6) * 1.3 * S;
      };
      const aHW = (i: number, k: number) => lerp(13.5 * S, (out(i) ? 6 : 4.4) * S, k * 0.4 + k * k * 0.6);
      // fita do braço: seção achatada (plano do chão), margem levemente irregular
      const armPath = (i: number, grow: number) => {
        g.beginPath();
        for (let side = 0; side < 2; side++) {
          const s = side === 0 ? -1 : 1;
          for (let j = 0; j <= RN; j++) {
            const k = side === 0 ? j / RN : 1 - j / RN;
            const px = aX(i, k), py = aY(i, k);
            const dx = aX(i, Math.min(1, k + 0.03)) - aX(i, Math.max(0, k - 0.03));
            const dy = aY(i, Math.min(1, k + 0.03)) - aY(i, Math.max(0, k - 0.03));
            const ln = Math.hypot(dx, dy) || 1;
            const hw = aHW(i, k) + grow + Math.sin(k * 15.3 + s * 2.1 + i * 1.7) * (0.7 + grow * 0.3) * S;
            const ox = (-dy / ln) * hw * s;
            const oy = (dx / ln) * hw * s * 0.55;
            if (side === 0 && j === 0) g.moveTo(px + ox, py + oy); else g.lineTo(px + ox, py + oy);
          }
        }
        g.closePath();
      };
      // tronco do rio: largo na frente, estreitando até a bifurcação
      const stemHWAt = (k: number) => lerp(stemHW0, stemHW1, k * 0.5 + k * k * 0.5);
      const stemY = (k: number) => yBase + (yJoin - yBase) * (k * 0.66 + k * k * 0.34);
      const stemEdge = (s: number, k: number) =>
        x + s * stemHWAt(k) +
        (Math.sin(k * 9.1 + (s > 0 ? 2.2 : 5.1)) * 0.6 + Math.sin(k * 22.4 + (s > 0 ? 3.7 : 1.1)) * 0.3) *
        (1 + (1 - k) * 9) * S;
      const stemPath = (grow: number) => {
        g.beginPath();
        for (let i = 0; i <= RN; i++) {
          const k = i / RN;
          const px = stemEdge(-1, k) - grow * (1.2 - k * 0.85);
          if (i === 0) g.moveTo(px, stemY(k)); else g.lineTo(px, stemY(k));
        }
        for (let i = RN; i >= 0; i--) {
          const k = i / RN;
          g.lineTo(stemEdge(1, k) + grow * (1.2 - k * 0.85), stemY(k));
        }
        // frente recortada: a água segue vindo para fora do quadro
        const lx = stemEdge(-1, 0) - grow * 1.2, rx = stemEdge(1, 0) + grow * 1.2;
        for (let j = 6; j >= 1; j--) {
          const u = j / 7;
          g.lineTo(lerp(lx, rx, u), yBase + Math.sin(u * Math.PI) * 6 * S + Math.sin(u * 17) * 1.4 * S);
        }
        g.closePath();
      };

      g.save();
      // ---- 1. barranco de terra úmida sob TODOS os leitos (duas camadas)
      const soil2 = g.createLinearGradient(0, fy - 46 * S, 0, yBase + 6 * S);
      soil2.addColorStop(0, "#566036");
      soil2.addColorStop(0.44, "#544d2d");
      soil2.addColorStop(1, "#836e42");
      g.fillStyle = soil2;
      for (let i = 0; i < 4; i++) { armPath(i, 3.4 * S); g.fill(); }
      stemPath(13 * S); g.fill();
      const soilWet2 = g.createLinearGradient(0, fy - 46 * S, 0, yBase + 4 * S);
      soilWet2.addColorStop(0, "#26331e");
      soilWet2.addColorStop(0.5, "#413a24");
      soilWet2.addColorStop(1, "#524528");
      g.fillStyle = soilWet2;
      for (let i = 0; i < 4; i++) { armPath(i, 1.2 * S); g.fill(); }
      stemPath(5 * S); g.fill();

      // ---- 2. lâmina d'água — MESMO gradiente vertical em todos os leitos,
      //         então tronco e braços se fundem sem costura na bifurcação
      const wat2 = g.createLinearGradient(0, fy - 46 * S, 0, yBase + 4 * S);
      wat2.addColorStop(0, "#0c3a5c");
      wat2.addColorStop(0.26, "#186a99");
      wat2.addColorStop(0.56, "#2f9dc4");
      wat2.addColorStop(0.82, "#5cc6de");
      wat2.addColorStop(1, "#93dfee");
      g.fillStyle = wat2;
      for (let i = 0; i < 4; i++) { armPath(i, 0); g.fill(); }
      stemPath(0); g.fill();

      // ---- 3. dentro do TRONCO: pedras, correnteza e reflexos
      g.save();
      stemPath(0); g.clip();
      const bankSh2 = g.createLinearGradient(x - stemHW0 * 1.1, 0, x + stemHW0 * 1.1, 0);
      bankSh2.addColorStop(0, "rgba(8,40,66,0.5)");
      bankSh2.addColorStop(0.26, "rgba(8,40,66,0)");
      bankSh2.addColorStop(0.74, "rgba(8,40,66,0)");
      bankSh2.addColorStop(1, "rgba(8,40,66,0.5)");
      g.fillStyle = bankSh2;
      g.fillRect(x - stemHW0 * 1.2, yJoin - 4 * S, stemHW0 * 2.4, (yBase - yJoin) + 14 * S);
      for (let i = 0; i < 8; i++) {
        const k = 0.05 + hsh(i, 61) * 0.8;
        const px = x + (hsh(i, 13) - 0.5) * stemHWAt(k) * 1.55;
        const py = stemY(k);
        const rs = (1.3 + hsh(i, 29) * 1.9) * (1.05 - k * 0.45) * S;
        g.fillStyle = "rgba(20,46,58,0.4)";
        g.beginPath(); g.ellipse(px, py + rs * 0.42, rs * 1.35, rs * 0.6, 0, 0, TAU); g.fill();
        g.fillStyle = hsh(i, 71) > 0.5 ? "#6d8390" : "#4f6776";
        g.beginPath(); g.ellipse(px, py, rs, rs * 0.62, hsh(i, 5) * 1.2, 0, TAU); g.fill();
        g.fillStyle = "rgba(190,226,238,0.32)";
        g.beginPath(); g.ellipse(px - rs * 0.3, py - rs * 0.24, rs * 0.44, rs * 0.22, -0.4, 0, TAU); g.fill();
        g.strokeStyle = "rgba(255,255,255,0.42)"; g.lineWidth = 0.7 * S;
        g.beginPath();
        g.moveTo(px - rs * 0.95, py + rs * 0.55);
        g.quadraticCurveTo(px, py + rs * 2.2, px + rs * 0.95, py + rs * 0.55);
        g.stroke();
      }
      // fios de água descendo com a correnteza (do fork para a frente)
      const streak2 = (u: number, k0: number, k1: number, thick: number) => {
        g.beginPath();
        for (let side = 0; side < 2; side++) {
          const sg = side === 0 ? -1 : 1;
          for (let j = 0; j <= 8; j++) {
            const q = side === 0 ? j / 8 : 1 - j / 8;
            const k = lerp(k0, k1, q);
            const px = x + u * stemHWAt(k) * 0.88 + Math.sin(k * 10 + u * 5) * 2.2 * S;
            const th = Math.sin(q * Math.PI) * thick * (1.2 - k * 0.7) * sg;
            if (side === 0 && j === 0) g.moveTo(px + th, stemY(k)); else g.lineTo(px + th, stemY(k));
          }
        }
        g.closePath(); g.fill();
      };
      for (let i = 0; i < 11; i++) {
        const u = (hsh(i, 3) - 0.5) * 1.8;
        const p = 1 - ((flow * 22 + i / 11) % 1);
        const k0 = Math.max(0, p - 0.3 - hsh(i, 19) * 0.2);
        g.fillStyle = hsh(i, 37) > 0.32 ? "rgba(232,251,255,0.9)" : "rgba(22,84,124,0.5)";
        g.globalAlpha = Math.sin(Math.min(1, 1 - p + 0.14) * Math.PI) * (0.2 + hsh(i, 29) * 0.3);
        streak2(u, k0, p, (0.9 + hsh(i, 41) * 1.4) * S);
      }
      g.globalAlpha = 1;
      // cristas curtas em "V" vindo para o observador
      g.lineCap = "round";
      g.strokeStyle = "rgba(244,254,255,0.95)";
      for (let i = 0; i < 7; i++) {
        const k = 1 - ((flow * 30 + i / 7) % 1) * 0.62;
        const yy = stemY(k);
        const w = stemHWAt(k);
        const cx2 = x + (hsh(i, 53) - 0.5) * w * 1.05;
        const hw = (6 + hsh(i, 23) * 13) * (1.1 - k * 0.5) * S;
        g.globalAlpha = (1 - k) * 0.9;
        g.lineWidth = (0.5 + (1 - k) * 0.9) * S;
        g.beginPath();
        g.moveTo(cx2 - hw, yy);
        g.quadraticCurveTo(cx2, yy + (1.4 + (1 - k) * 3.2) * S, cx2 + hw, yy);
        g.stroke();
      }
      g.globalAlpha = 1;
      if (!reduce) {
        g.fillStyle = "#ffffff";
        for (let i = 0; i < 16; i++) {
          const k = hsh(i, 3) * 0.92;
          const ph = t * 0.0013 + hsh(i, 23) * 6.28;
          const w = stemHWAt(k);
          g.globalAlpha = Math.max(0, Math.sin(ph)) * (0.6 - k * 0.3);
          const lw = (2.4 + hsh(i, 41) * 6) * (1 - k * 0.5) * S;
          g.fillRect(x + (hsh(i, 17) - 0.5) * w * 1.6 - lw * 0.5, stemY(k), lw, 0.7 * S);
        }
        g.globalAlpha = 1;
      }
      // água rasa e clara na boca do rio
      const shallow2 = g.createLinearGradient(0, stemY(0.3), 0, yBase + 4 * S);
      shallow2.addColorStop(0, "rgba(224,250,252,0)");
      shallow2.addColorStop(1, "rgba(226,250,254,0.26)");
      g.fillStyle = shallow2;
      g.fillRect(x - stemHW0 * 1.3, stemY(0.3), stemHW0 * 2.6, (yBase - stemY(0.3)) + 6 * S);
      g.restore();

      // ---- 4. dentro de CADA BRAÇO: veio claro no meio e correnteza subindo.
      //         Um véu de distância (criado UMA vez) apaga as pontas ao longe.
      const farVeil = g.createLinearGradient(0, fy - 47 * S, 0, yJoin + 2 * S);
      farVeil.addColorStop(0, "rgba(122,154,138,0.44)");
      farVeil.addColorStop(1, "rgba(126,158,140,0)");
      for (let i = 0; i < 4; i++) {
        g.save();
        armPath(i, 0); g.clip();
        // veio central mais claro (dá volume ao leito estreito)
        g.strokeStyle = "rgba(150,222,240,0.24)";
        g.lineWidth = 5.5 * S;
        g.lineCap = "round";
        g.beginPath();
        for (let j = 0; j <= RN; j++) {
          const k = j / RN;
          if (j === 0) g.moveTo(aX(i, k), aY(i, k)); else g.lineTo(aX(i, k), aY(i, k));
        }
        g.stroke();
        // sombra do barranco nas duas beiras do braço
        g.strokeStyle = "rgba(8,40,66,0.26)";
        g.lineWidth = 1.6 * S;
        for (let side = 0; side < 2; side++) {
          const s = side === 0 ? -1 : 1;
          g.beginPath();
          for (let j = 0; j <= RN; j++) {
            const k = j / RN;
            if (j === 0) g.moveTo(aX(i, k) + s * aHW(i, k), aY(i, k));
            else g.lineTo(aX(i, k) + s * aHW(i, k), aY(i, k));
          }
          g.stroke();
        }
        // correnteza NO SENTIDO do braço (fios que se afastam)
        g.strokeStyle = "rgba(240,253,255,0.9)";
        for (let r = 0; r < 6; r++) {
          const u = (hsh(r, 5 + i) - 0.5) * 1.5;
          const p = (flow * 26 + r / 6 + i * 0.13) % 1;
          const k1 = Math.min(1, p + 0.3);
          g.globalAlpha = Math.sin(Math.min(1, p + 0.16) * Math.PI) * 0.5;
          g.lineWidth = (0.9 - p * 0.5) * S;
          g.beginPath();
          for (let j = 0; j <= 5; j++) {
            const k = lerp(p, k1, j / 5);
            const px = aX(i, k) + u * aHW(i, k);
            const py = aY(i, k) + u * aHW(i, k) * 0.2;
            if (j === 0) g.moveTo(px, py); else g.lineTo(px, py);
          }
          g.stroke();
        }
        g.globalAlpha = 1;
        // cintilância no braço
        if (!reduce) {
          g.fillStyle = "#ffffff";
          for (let r = 0; r < 5; r++) {
            const k = hsh(r, 7 + i) * 0.9 + 0.05;
            const ph = t * 0.0015 + hsh(r, 29 + i) * 6.28;
            g.globalAlpha = Math.max(0, Math.sin(ph)) * 0.55 * (1 - k * 0.5);
            const lw = (1.6 + hsh(r, 43) * 3) * (1 - k * 0.5) * S;
            g.fillRect(aX(i, k) - lw * 0.5, aY(i, k) - 0.3 * S, lw, 0.65 * S);
          }
          g.globalAlpha = 1;
        }
        g.fillStyle = farVeil;
        armPath(i, 1 * S); g.fill();
        g.restore();
      }

      // ---- 5. o DELTA: entre um braço e outro sobram esporões de terra com
      //         relva — é ao redor deles que a água se reparte em quatro
      for (let i = 0; i < 3; i++) {
        const wx = x + (i - 1) * 23 * S;
        const wy = yJoin - 1.6 * S;
        const wHW = (i === 1 ? 9.2 : 8.2) * S;
        g.fillStyle = "rgba(8,40,66,0.32)";
        g.beginPath(); g.ellipse(wx, wy + 3 * S, wHW * 1.06, 3.4 * S, 0, 0, TAU); g.fill();
        const barG = g.createLinearGradient(0, wy - 3 * S, 0, wy + 4 * S);
        barG.addColorStop(0, "#7d6b3e"); barG.addColorStop(1, "#4c4126");
        g.fillStyle = barG;
        g.beginPath(); g.ellipse(wx, wy + 1 * S, wHW, 3.6 * S, 0, 0, TAU); g.fill();
        const capG = g.createLinearGradient(0, wy - 4 * S, 0, wy + 1 * S);
        capG.addColorStop(0, "#8cc067"); capG.addColorStop(1, "#4f8442");
        g.fillStyle = capG;
        g.beginPath(); g.ellipse(wx, wy - 1.2 * S, wHW * 0.9, 3 * S, 0, 0, TAU); g.fill();
        g.strokeStyle = "#4f8b43"; g.lineWidth = 0.6 * S; g.lineCap = "round";
        for (let b = 0; b < 5; b++) {
          const gx = wx + (b - 2) * wHW * 0.34;
          const bend = reduce ? 0 : Math.sin(t * 0.0016 + b * 1.7 + i) * 0.7 * S;
          g.beginPath();
          g.moveTo(gx, wy - 1.6 * S);
          g.quadraticCurveTo(gx + bend, wy - 4 * S, gx + bend * 1.6 + (b - 2) * 0.6 * S, wy - 6.2 * S);
          g.stroke();
        }
      }
      glowCircle(g, x, yJoin, 26 * S, "#cbf1ff", 0.18);

      // ---- 6. espuma e relva nas margens de todos os leitos
      g.lineCap = "round";
      for (let side = 0; side < 2; side++) {
        const s = side === 0 ? -1 : 1;
        g.strokeStyle = "rgba(246,253,255,0.55)";
        g.lineWidth = 1 * S;
        g.beginPath();
        for (let i = 0; i <= RN; i++) {
          const k = i / RN;
          if (i === 0) g.moveTo(stemEdge(s, k), stemY(k)); else g.lineTo(stemEdge(s, k), stemY(k));
        }
        g.stroke();
      }
      for (let i = 0; i < 4; i++) {
        for (let side = 0; side < 2; side++) {
          const s = side === 0 ? -1 : 1;
          g.strokeStyle = "rgba(246,253,255,0.5)";
          g.lineWidth = 0.75 * S;
          g.beginPath();
          for (let j = 3; j <= RN; j++) {
            const k = j / RN;
            const px = aX(i, k) + s * aHW(i, k) * 1.02;
            const py = aY(i, k) + s * 0.2 * S;
            if (j === 3) g.moveTo(px, py); else g.lineTo(px, py);
          }
          g.stroke();
        }
      }
      // relva do barranco do tronco (mais alta na frente)
      for (let side = 0; side < 2; side++) {
        const s = side === 0 ? -1 : 1;
        for (let i = 0; i < 12; i++) {
          const k = (i / 12) * 0.98;
          const gx = stemEdge(s, k) + s * (1.8 + (1 - k) * 4.4) * S;
          const gy = stemY(k);
          const sc = (0.45 + (1 - k) * 1.15) * S;
          const bend = reduce ? 0 : Math.sin(t * 0.0015 + i * 1.4 + side * 2) * 0.7 * sc;
          g.strokeStyle = hsh(i, 9 + side) > 0.5 ? "#5f9c4c" : "#3f7c3c";
          g.lineWidth = 0.95 * sc;
          for (let b = 0; b < 4; b++) {
            const off = (b - 1.5) * 1.7 * sc;
            g.beginPath();
            g.moveTo(gx + off, gy);
            g.quadraticCurveTo(gx + off + bend, gy - 3.4 * sc, gx + off - s * 1.7 * sc + bend * 1.7, gy - 6 * sc);
            g.stroke();
          }
        }
      }
      // relva esparsa nas margens dos quatro braços
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 6; j++) {
          const s = j % 2 === 0 ? -1 : 1;
          const k = 0.18 + (j / 6) * 0.76;
          const gx = aX(i, k) + s * (aHW(i, k) + 2 * S);
          const gy = aY(i, k) + 0.5 * S;
          const sc = (0.38 + (1 - k) * 0.5) * S;
          const bend = reduce ? 0 : Math.sin(t * 0.0015 + j * 1.6 + i) * 0.6 * sc;
          g.strokeStyle = hsh(j, 11 + i) > 0.5 ? "#5b9848" : "#3f7a3c";
          g.lineWidth = 0.85 * sc;
          for (let b = 0; b < 3; b++) {
            const off = (b - 1) * 1.5 * sc;
            g.beginPath();
            g.moveTo(gx + off, gy);
            g.quadraticCurveTo(gx + off + bend, gy - 2.6 * sc, gx + off - s * 1.3 * sc + bend * 1.4, gy - 4.6 * sc);
            g.stroke();
          }
        }
      }
      // juncos nos cantos da frente do tronco
      for (let side = 0; side < 2; side++) {
        const s = side === 0 ? -1 : 1;
        for (let i = 0; i < 4; i++) {
          const rx = stemEdge(s, 0) - s * (i * 5 + hsh(i, 77) * 4) * S;
          const ry = yBase + (1.2 - i * 0.5) * S;
          const sc = (1.4 - i * 0.16) * S;
          const bend = reduce ? 0 : Math.sin(t * 0.0013 + i * 1.7 + side * 3) * 1.1 * sc;
          g.strokeStyle = hsh(i, 63 + side) > 0.5 ? "#568f45" : "#3c7238";
          g.lineWidth = 1 * sc;
          for (let b = 0; b < 3; b++) {
            const off = (b - 1) * 2.2 * sc;
            g.beginPath();
            g.moveTo(rx + off, ry);
            g.quadraticCurveTo(rx + off + bend * 0.6, ry - 5 * sc, rx + off + bend * 1.8 - s * 1.2 * sc, ry - 9.5 * sc);
            g.stroke();
          }
        }
      }
      // ---- 6b. a boca do tronco: cascalho molhado e espuma na beira da frente
      const mouthY2 = (u: number) => yBase + Math.sin(u * Math.PI) * 6 * S + Math.sin(u * 17) * 1.4 * S;
      const mouthX2 = (u: number) => lerp(stemEdge(-1, 0), stemEdge(1, 0), u);
      g.strokeStyle = "rgba(250,255,255,0.7)"; g.lineWidth = 1.3 * S;
      g.beginPath();
      for (let i = 0; i <= 16; i++) {
        const u = i / 16;
        if (i === 0) g.moveTo(mouthX2(u), mouthY2(u) - 0.6 * S); else g.lineTo(mouthX2(u), mouthY2(u) - 0.6 * S);
      }
      g.stroke();
      for (let i = 0; i < 18; i++) {
        const u = 0.03 + hsh(i, 95) * 0.94;
        const px = mouthX2(u);
        const py = mouthY2(u) + (hsh(i, 5) - 0.35) * 3.2 * S;
        const rs = (0.8 + hsh(i, 39) * 1.6) * S;
        g.fillStyle = "rgba(28,44,42,0.3)";
        g.beginPath(); g.ellipse(px, py + rs * 0.4, rs * 1.3, rs * 0.6, 0, 0, TAU); g.fill();
        g.fillStyle = hsh(i, 73) > 0.5 ? "#7d8a8c" : "#5f6d72";
        g.beginPath(); g.ellipse(px, py, rs, rs * 0.62, hsh(i, 17) * 1.3, 0, TAU); g.fill();
      }
      // ---- 6c. cada braço se perde numa moita do jardim (nada de ponta seca)
      for (let i = 0; i < 4; i++) {
        const bxp = aX(i, 1) + sgn(i) * 2 * S, byp = aY(i, 1) + 1 * S;
        const bw = (out(i) ? 11 : 9) * S;
        softShadow(g, bxp, byp + 1 * S, bw * 0.9, 0.22);
        const leafG = g.createRadialGradient(bxp - bw * 0.3, byp - bw * 0.5, bw * 0.1, bxp, byp, bw * 1.1);
        leafG.addColorStop(0, "#79b862"); leafG.addColorStop(0.6, "#4d8c48"); leafG.addColorStop(1, "#2f6236");
        g.fillStyle = leafG;
        g.beginPath();
        for (let b = 0; b < 5; b++) {
          const a = (b / 5) * TAU + i;
          g.ellipse(bxp + Math.cos(a) * bw * 0.44, byp + Math.sin(a) * bw * 0.24 - bw * 0.16,
            bw * (0.36 + hsh(b, 13 + i) * 0.2), bw * (0.24 + hsh(b, 29 + i) * 0.14), a * 0.4, 0, TAU);
        }
        g.ellipse(bxp, byp - bw * 0.12, bw * 0.62, bw * 0.34, 0, 0, TAU);
        g.fill();
        g.fillStyle = "rgba(198,232,150,0.34)";
        g.beginPath(); g.ellipse(bxp - bw * 0.24, byp - bw * 0.42, bw * 0.3, bw * 0.16, -0.3, 0, TAU); g.fill();
      }
      // ---- 7. névoa leve: as pontas dos quatro braços se perdem ao longe
      for (let i = 0; i < 4; i++) {
        mistBand(g, aX(i, 0.95), aY(i, 0.95), (out(i) ? 19 : 14) * S, 4 * S, "rgba(216,238,246,0.4)", 0.75);
      }
      mistBand(g, x, yJoin - 3 * S, 34 * S, 5 * S, "rgba(226,246,252,0.2)", 0.5);
      g.restore();
      return;
    }
    case "flamingSword": {
      // A ESPADA INFLAMADA QUE SE REVOLVIA (Gn 3:24): lâmina de puro fogo que
      // gira sozinha guardando o caminho da árvore da vida — ninguém a segura.
      const F = clamp01(o.fire ?? 1);
      const cy = fy - 24 * S;
      const spin = reduce ? -0.62 : t * 0.0016;
      const bob = reduce ? 0 : Math.sin(t * 0.0019) * 2 * S;
      const wav = reduce ? 0 : Math.sin(t * 0.011) * 0.9 * S;
      const wav2 = reduce ? 0 : Math.sin(t * 0.017 + 1.6) * 0.7 * S;
      // clarão no chão e halo (é fogo: não projeta sombra opaca)
      glowCircle(g, x, fy - 1.5 * S, 24 * S, "#ff9a3c", 0.22 * F);
      glowCircle(g, x, cy + bob, 30 * S, "#ffb14a", 0.3 * F);
      g.save();
      g.translate(x, cy + bob);
      g.rotate(spin);
      g.lineCap = "round";
      // ---- lâmina: 3 camadas de fogo (rubro → âmbar → núcleo branco)
      const blade = (halfW: number, len: number, alpha: number, c0: string, c1: string, c2: string) => {
        const grd = g.createLinearGradient(0, -len, 0, 9 * S);
        grd.addColorStop(0, c0); grd.addColorStop(0.42, c1); grd.addColorStop(1, c2);
        g.globalAlpha = alpha * F;
        g.fillStyle = grd;
        g.beginPath();
        g.moveTo(0, -len);
        g.bezierCurveTo(halfW * 1.5 + wav, -len * 0.62, halfW * 1.1 + wav2, -len * 0.24, halfW, 8 * S);
        g.lineTo(-halfW, 8 * S);
        g.bezierCurveTo(-halfW * 1.1 + wav2, -len * 0.24, -halfW * 1.5 + wav, -len * 0.62, 0, -len);
        g.closePath(); g.fill();
      };
      blade(4.6 * S, 22 * S, 0.5, "rgba(255,146,44,0)", "rgba(240,96,26,0.75)", "rgba(198,52,16,0.55)");
      blade(3.1 * S, 20.4 * S, 0.95, "#ffe6a8", "#ffab3c", "#e8622e");
      blade(1.35 * S, 18 * S, 0.95, "#ffffff", "#fff2c0", "#ffc860");
      g.globalAlpha = 1;
      // línguas de fogo lambendo a lâmina
      g.strokeStyle = `rgba(255,214,132,${0.5 * F})`;
      for (let i = 0; i < 5; i++) {
        const k = 0.16 + i * 0.17;
        const s = i % 2 === 0 ? 1 : -1;
        const ly = -20 * S * k;
        const lick = reduce ? 0.6 : Math.sin(t * 0.009 + i * 1.9) * 0.5 + 0.7;
        g.lineWidth = 1 * S;
        g.beginPath();
        g.moveTo(s * 2.2 * S, ly + 2 * S);
        g.quadraticCurveTo(s * (5 + lick * 2.6) * S, ly - 1 * S, s * 2.4 * S, ly - (4 + lick * 3) * S);
        g.stroke();
      }
      // ---- guarda em brasa e punho enegrecido (sem mão que a segure)
      const guard = g.createLinearGradient(-9 * S, 0, 9 * S, 0);
      guard.addColorStop(0, "#6e3a18"); guard.addColorStop(0.5, "#ffcf7a"); guard.addColorStop(1, "#6e3a18");
      g.fillStyle = guard;
      g.beginPath();
      g.moveTo(-8.6 * S, 10.4 * S);
      g.quadraticCurveTo(-3 * S, 6.4 * S, 0, 7.4 * S);
      g.quadraticCurveTo(3 * S, 6.4 * S, 8.6 * S, 10.4 * S);
      g.quadraticCurveTo(3 * S, 10.2 * S, 0, 11 * S);
      g.quadraticCurveTo(-3 * S, 10.2 * S, -8.6 * S, 10.4 * S);
      g.closePath(); g.fill();
      const grip = g.createLinearGradient(-2.4 * S, 0, 2.4 * S, 0);
      grip.addColorStop(0, "#241612"); grip.addColorStop(0.45, "#5a3a28"); grip.addColorStop(1, "#1c110e");
      g.fillStyle = grip;
      rr(g, -2.2 * S, 10.6 * S, 4.4 * S, 8 * S, 1.6 * S); g.fill();
      g.strokeStyle = `rgba(255,150,60,${0.6 * F})`; g.lineWidth = 0.7 * S;
      for (let i = 0; i < 3; i++) {
        const gy2 = 12.4 * S + i * 2.2 * S;
        g.beginPath(); g.moveTo(-2 * S, gy2); g.lineTo(2 * S, gy2 - 0.6 * S); g.stroke();
      }
      const pom = g.createRadialGradient(-0.7 * S, 18.4 * S, 0.3, 0, 19.4 * S, 3 * S);
      pom.addColorStop(0, "#ffd98a"); pom.addColorStop(0.55, "#d06a20"); pom.addColorStop(1, "#5e2a10");
      g.fillStyle = pom;
      g.beginPath(); g.arc(0, 19.4 * S, 2.7 * S, 0, TAU); g.fill();
      g.restore();
      // ---- brasas soltas girando com a espada
      if (!reduce) {
        g.save();
        for (let i = 0; i < 14; i++) {
          const ph = (t * 0.00042 + hsh(i, 9)) % 1;
          const a = hsh(i, 21) * TAU + spin * 0.6;
          const rd = (7 + hsh(i, 33) * 15) * S;
          const ex = x + Math.cos(a) * rd;
          const ey = cy + bob + Math.sin(a) * rd * 0.72 + (ph - 0.5) * 18 * S;
          g.globalAlpha = Math.sin(ph * Math.PI) * (0.35 + hsh(i, 5) * 0.5) * F;
          g.fillStyle = hsh(i, 13) > 0.6 ? "#ffe6a0" : "#ff8a34";
          g.beginPath(); g.arc(ex, ey, (0.6 + hsh(i, 7) * 1.1) * S, 0, TAU); g.fill();
        }
        g.restore();
      }
      return;
    }
    case "cherub": {
      // QUERUBIM GUARDIÃO DO ÉDEN (Gn 3:24; Êx 25:18-22): sentinela alada,
      // solene e dourada — asas superiores erguidas, asas inferiores cobrindo,
      // o rosto velado pela própria glória. Não é anjo comum nem menino alado.
      const brth = reduce ? 0.5 : Math.sin(t * 0.0013 + x * 0.01) * 0.5 + 0.5;
      const lift = reduce ? 0 : Math.sin(t * 0.0011) * 1.4 * S;
      softShadow(g, x, fy, 20 * S, 0.3);
      g.save();
      glowCircle(g, x, fy - 30 * S, 38 * S, "#ffe9b0", 0.18 + brth * 0.09);
      // ---- asas (gradiente único, em coordenadas absolutas)
      const wing = g.createLinearGradient(0, fy - 58 * S, 0, fy - 6 * S);
      wing.addColorStop(0, "#fff6da");
      wing.addColorStop(0.42, "#f0d08a");
      wing.addColorStop(0.78, "#c99a3c");
      wing.addColorStop(1, "#8e6418");
      for (let si = 0; si < 2; si++) {
        const s = si === 0 ? -1 : 1;
        // asa superior erguida (Êx 25:20 — "estendendo as asas para cima")
        g.fillStyle = wing;
        g.beginPath();
        g.moveTo(x + s * 4 * S, fy - 31 * S);
        g.quadraticCurveTo(x + s * 21 * S, fy - 44 * S - lift, x + s * 13.5 * S, fy - 56 * S - lift);
        g.quadraticCurveTo(x + s * 9.5 * S, fy - 46 * S, x + s * 2.6 * S, fy - 29 * S);
        g.closePath(); g.fill();
        g.strokeStyle = "rgba(126,88,20,0.4)"; g.lineWidth = 0.7 * S;
        g.stroke();
        // fileiras de penas da asa superior
        for (let i = 0; i < 7; i++) {
          const k = 0.16 + i * 0.12;
          const bx = lerp(x + s * 4 * S, x + s * 13.5 * S, k) + s * 5 * S * Math.sin(k * Math.PI);
          const by = lerp(fy - 31 * S, fy - 56 * S - lift, k);
          const fl = (4.2 + Math.sin(k * Math.PI) * 3.4) * S;
          g.strokeStyle = i % 2 ? "rgba(255,246,214,0.6)" : "rgba(168,120,32,0.42)";
          g.lineWidth = (1.1 - i * 0.06) * S;
          g.beginPath();
          g.moveTo(bx, by);
          g.quadraticCurveTo(bx + s * fl * 0.7, by + fl * 0.2, bx + s * fl, by + fl * 0.72);
          g.stroke();
        }
        // asa inferior, cobrindo (reverência)
        g.fillStyle = wing;
        g.beginPath();
        g.moveTo(x + s * 3.6 * S, fy - 29 * S);
        g.quadraticCurveTo(x + s * 17 * S, fy - 25 * S, x + s * 10.5 * S, fy - 4 * S);
        g.quadraticCurveTo(x + s * 6.4 * S, fy - 15 * S, x + s * 2.6 * S, fy - 25 * S);
        g.closePath(); g.fill();
        for (let i = 0; i < 5; i++) {
          const k = 0.2 + i * 0.16;
          const bx = lerp(x + s * 3.6 * S, x + s * 10.5 * S, k) + s * 4 * S * Math.sin(k * Math.PI);
          const by = lerp(fy - 29 * S, fy - 4 * S, k);
          g.strokeStyle = i % 2 ? "rgba(255,246,214,0.5)" : "rgba(150,106,28,0.4)";
          g.lineWidth = 0.9 * S;
          g.beginPath();
          g.moveTo(bx, by);
          g.quadraticCurveTo(bx + s * 3.4 * S, by + 2.4 * S, bx + s * 3.8 * S, by + 5 * S);
          g.stroke();
        }
      }
      // ---- corpo: coluna de veste dourada
      const robe = g.createLinearGradient(x - 10 * S, 0, x + 10 * S, 0);
      robe.addColorStop(0, "#a8741e");
      robe.addColorStop(0.3, "#e6bf68");
      robe.addColorStop(0.52, "#fff3d0");
      robe.addColorStop(0.78, "#dcb056");
      robe.addColorStop(1, "#8e6418");
      g.fillStyle = robe;
      g.beginPath();
      g.moveTo(x - 10 * S, fy);
      g.quadraticCurveTo(x - 8.4 * S, fy - 18 * S, x - 5.6 * S, fy - 31 * S);
      g.quadraticCurveTo(x, fy - 35.4 * S, x + 5.6 * S, fy - 31 * S);
      g.quadraticCurveTo(x + 8.4 * S, fy - 18 * S, x + 10 * S, fy);
      g.closePath(); g.fill();
      // dobras da veste
      g.strokeStyle = "rgba(120,82,18,0.35)"; g.lineWidth = 0.8 * S;
      for (let i = 0; i < 4; i++) {
        const dx2 = (i - 1.5) * 3.4 * S;
        g.beginPath();
        g.moveTo(x + dx2 * 0.6, fy - 29 * S);
        g.quadraticCurveTo(x + dx2, fy - 15 * S, x + dx2 * 1.5, fy - 0.5 * S);
        g.stroke();
      }
      // barra inferior lavrada
      g.fillStyle = "#f2cf7e";
      rr(g, x - 10.2 * S, fy - 3.2 * S, 20.4 * S, 3.2 * S, 1.2 * S); g.fill();
      // cinto/faixa
      g.fillStyle = "#c89238";
      rr(g, x - 7.4 * S, fy - 24 * S, 14.8 * S, 3 * S, 1.2 * S); g.fill();
      g.fillStyle = "rgba(255,246,216,0.5)";
      rr(g, x - 7 * S, fy - 23.6 * S, 14 * S, 1 * S, 0.5 * S); g.fill();
      // braços cruzados sobre o peito (guarda solene)
      g.strokeStyle = "#e6bf68"; g.lineWidth = 2.6 * S; g.lineCap = "round";
      g.beginPath(); g.moveTo(x - 5.6 * S, fy - 29 * S); g.lineTo(x + 4.4 * S, fy - 25.4 * S); g.stroke();
      g.beginPath(); g.moveTo(x + 5.6 * S, fy - 29 * S); g.lineTo(x - 4.4 * S, fy - 25.4 * S); g.stroke();
      g.strokeStyle = "rgba(255,250,226,0.45)"; g.lineWidth = 0.9 * S;
      g.beginPath(); g.moveTo(x - 5 * S, fy - 29.8 * S); g.lineTo(x + 4 * S, fy - 26.2 * S); g.stroke();
      // ---- cabeça velada em luz + diadema
      const head = g.createRadialGradient(x - 1.4 * S, fy - 39.6 * S, 0.4, x, fy - 38.4 * S, 5.6 * S);
      head.addColorStop(0, "#fffdf2"); head.addColorStop(0.5, "#ffeec2"); head.addColorStop(1, "#dcae52");
      g.fillStyle = head;
      g.beginPath(); g.ellipse(x, fy - 38.4 * S, 4.6 * S, 5.2 * S, 0, 0, TAU); g.fill();
      glowCircle(g, x, fy - 38.4 * S, 13 * S, "#fff4cc", 0.34 + brth * 0.16);
      g.fillStyle = "#e0b054";
      rr(g, x - 4.4 * S, fy - 41.4 * S, 8.8 * S, 1.8 * S, 0.8 * S); g.fill();
      g.fillStyle = "#fff3cc";
      g.beginPath(); g.arc(x, fy - 42.6 * S, 1.2 * S, 0, TAU); g.fill();
      g.restore();
      return;
    }
    // ========================================================================
    // CORPOS DO CÉU (StagePropSpec.sky = true) — `fy` é o CENTRO do objeto no
    // céu, não os pés no chão. Nenhum deles projeta sombra de chão; se algum
    // roteiro usar sem `sky`, apenas desenha centrado ali (não quebra).
    // ========================================================================
    case "sun": {
      // LUMINAR MAIOR (Gn 1:16): núcleo branco-quente, coroa dourada→âmbar,
      // raios longos/curtos girando MUITO devagar, halo atmosférico e pulsação.
      const pul = reduce ? 1 : 1 + Math.sin(t * 0.0011) * 0.035;
      const R0 = 13 * S * pul;
      const rot = reduce ? 0 : t * 0.000045;   // giro quase imperceptível
      g.save();
      // halo atmosférico
      const halo = g.createRadialGradient(x, fy, R0 * 0.55, x, fy, 30 * S);
      halo.addColorStop(0, "rgba(255,230,158,0.42)");
      halo.addColorStop(0.45, "rgba(255,192,92,0.17)");
      halo.addColorStop(1, "rgba(255,170,60,0)");
      g.fillStyle = halo;
      g.beginPath(); g.arc(x, fy, 30 * S, 0, TAU); g.fill();
      // raios alternados (longo/curto) girando
      g.lineCap = "round";
      for (let i = 0; i < 18; i++) {
        const a = rot + (i / 18) * TAU;
        const lng = (i & 1) === 0;
        const breathe = reduce ? 0 : Math.sin(t * 0.0017 + i * 1.3) * 1.2 * S;
        const r1 = R0 + 2.6 * S;
        const r2 = R0 + (lng ? 13.5 : 7.4) * S + breathe;
        g.strokeStyle = lng ? "rgba(255,226,152,0.55)" : "rgba(255,186,92,0.4)";
        g.lineWidth = (lng ? 2.1 : 1.35) * S;
        g.beginPath();
        g.moveTo(x + Math.cos(a) * r1, fy + Math.sin(a) * r1);
        g.lineTo(x + Math.cos(a) * r2, fy + Math.sin(a) * r2);
        g.stroke();
      }
      // coroa: borda macia do disco
      const cor = g.createRadialGradient(x, fy, R0 * 0.3, x, fy, R0 * 1.42);
      cor.addColorStop(0, "rgba(255,246,216,0.95)");
      cor.addColorStop(0.55, "rgba(255,208,102,0.7)");
      cor.addColorStop(0.84, "rgba(242,162,51,0.34)");
      cor.addColorStop(1, "rgba(226,132,36,0)");
      g.fillStyle = cor;
      g.beginPath(); g.arc(x, fy, R0 * 1.42, 0, TAU); g.fill();
      // disco com núcleo branco-quente deslocado (volume)
      const disc = g.createRadialGradient(x - R0 * 0.26, fy - R0 * 0.3, R0 * 0.08, x, fy, R0);
      disc.addColorStop(0, "#ffffff");
      disc.addColorStop(0.34, "#fff4c8");
      disc.addColorStop(0.74, "#ffcc5e");
      disc.addColorStop(1, "#f0a02c");
      g.fillStyle = disc;
      g.beginPath(); g.arc(x, fy, R0, 0, TAU); g.fill();
      // aro quente
      g.strokeStyle = "rgba(255,240,196,0.7)"; g.lineWidth = 0.9 * S;
      g.beginPath(); g.arc(x, fy, R0 * 0.97, 0, TAU); g.stroke();
      g.restore();
      return;
    }
    case "moon": {
      // LUMINAR MENOR (Gn 1:16): disco perolado com crateras sutis, levemente
      // giboso (terminador macio) e brilho FRIO ao redor.
      const R0 = 11 * S;
      g.save();
      // brilho frio
      const halo = g.createRadialGradient(x, fy, R0 * 0.7, x, fy, 19 * S);
      halo.addColorStop(0, "rgba(208,224,255,0.34)");
      halo.addColorStop(0.5, "rgba(170,196,248,0.14)");
      halo.addColorStop(1, "rgba(150,180,240,0)");
      g.fillStyle = halo;
      g.beginPath(); g.arc(x, fy, 19 * S, 0, TAU); g.fill();
      // disco perolado
      const disc = g.createRadialGradient(x - R0 * 0.34, fy - R0 * 0.38, R0 * 0.12, x, fy, R0);
      disc.addColorStop(0, "#fdfdf6");
      disc.addColorStop(0.5, "#eaecee");
      disc.addColorStop(1, "#bcc3cf");
      g.fillStyle = disc;
      g.beginPath(); g.arc(x, fy, R0, 0, TAU); g.fill();
      // crateras + terminador, recortados no disco
      g.save();
      g.beginPath(); g.arc(x, fy, R0, 0, TAU); g.clip();
      for (let i = 0; i < 8; i++) {
        const a = i * 2.3999632;                       // ângulo áureo: espalha bem
        const rd = (0.16 + hsh(i, 71) * 0.66) * R0;
        const cr = (0.09 + hsh(i, 97) * 0.16) * R0;
        const cx2 = x + Math.cos(a) * rd, cy2 = fy + Math.sin(a) * rd;
        g.globalAlpha = 0.2;
        g.fillStyle = "#98a2b4";
        g.beginPath(); g.arc(cx2, cy2, cr, 0, TAU); g.fill();
        g.globalAlpha = 0.3;
        g.fillStyle = "#ffffff";
        g.beginPath(); g.arc(cx2 - cr * 0.26, cy2 - cr * 0.3, cr * 0.6, 0, TAU); g.fill();
      }
      g.globalAlpha = 1;
      // fase gibosa: sombra fria crescendo para a borda oposta à luz
      const term = g.createRadialGradient(x + R0 * 0.85, fy - R0 * 0.2, R0 * 0.35, x + R0 * 0.85, fy - R0 * 0.2, R0 * 2.15);
      term.addColorStop(0, "rgba(28,38,64,0)");
      term.addColorStop(0.62, "rgba(28,38,64,0.16)");
      term.addColorStop(1, "rgba(22,30,54,0.6)");
      g.fillStyle = term;
      g.fillRect(x - R0, fy - R0, R0 * 2, R0 * 2);
      g.restore();
      // aro de luz fria
      g.strokeStyle = "rgba(226,236,255,0.6)"; g.lineWidth = 0.8 * S;
      g.beginPath(); g.arc(x, fy, R0 * 0.98, -2.5, 0.5); g.stroke();
      g.restore();
      return;
    }
    case "starfield": {
      // "E FEZ TAMBÉM AS ESTRELAS" (Gn 1:16): dezenas de pontos de tamanhos e
      // brilhos variados numa faixa larga do céu, cintilando FORA DE FASE.
      const Wd = 500 * S, Hd = 40 * S;
      g.save();
      // véu de poeira estelar (bem discreto)
      const dust = g.createRadialGradient(x, fy, 2, x, fy, Wd * 0.5);
      dust.addColorStop(0, "rgba(150,172,224,0.1)");
      dust.addColorStop(1, "rgba(120,140,200,0)");
      g.fillStyle = dust;
      g.fillRect(x - Wd * 0.5, fy - Hd * 0.7, Wd, Hd * 1.4);
      for (let i = 0; i < 88; i++) {
        const r1 = hsh(i, 3), r2 = hsh(i, 17), r3 = hsh(i, 41);
        const sx2 = x + (r1 - 0.5) * Wd;
        const sy2 = fy + (r2 - 0.5) * Hd;
        const tw = reduce ? 0.8 : 0.56 + Math.sin(t * (0.0011 + r3 * 0.0024) + r1 * 41.7) * 0.44;
        const rad = (0.34 + r3 * 0.95) * S * (0.7 + tw * 0.5);
        g.globalAlpha = (0.22 + r3 * 0.62) * tw;
        g.fillStyle = r2 > 0.8 ? "#ffe6bc" : (r1 > 0.62 ? "#dbe6ff" : "#ffffff");
        g.beginPath(); g.arc(sx2, sy2, rad, 0, TAU); g.fill();
        // cruz de brilho só nas maiores
        if (r3 > 0.87) {
          g.globalAlpha *= 0.45;
          const cr = rad * 3.4;
          g.fillRect(sx2 - cr, sy2 - 0.3 * S, cr * 2, 0.6 * S);
          g.fillRect(sx2 - 0.3 * S, sy2 - cr, 0.6 * S, cr * 2);
        }
      }
      g.restore();
      return;
    }
    case "birds": {
      // AVES DO 5º DIA (Gn 1:20-21): bando em "V" batendo asas, em três
      // profundidades, atravessando o céu devagar.
      const Wd = 380 * S;
      g.save();
      g.lineCap = "round";
      g.strokeStyle = "#33302b";
      for (let i = 0; i < 9; i++) {
        const lane = i % 3;                              // 0 = mais longe
        const k = 0.5 + lane * 0.32;
        const r1 = hsh(i, 5), r2 = hsh(i, 29);
        const drift = reduce ? 0 : t * (0.0055 + lane * 0.0045);
        const px = x - Wd * 0.5 + ((r1 * Wd + drift) % Wd);
        const bob = reduce ? 0 : Math.sin(t * 0.0019 + i * 1.9) * 2 * S;
        const py = fy + (r2 - 0.5) * 20 * S + (lane - 1) * 4 * S + bob;
        const flap = reduce ? 0.45 : Math.sin(t * (0.0085 + lane * 0.0022) + i * 1.7) * 0.5 + 0.5;
        const wsp = 5 * k * S;                           // meia envergadura
        const up = (0.4 + flap * 1.6) * k * S;
        g.globalAlpha = 0.3 + lane * 0.24;
        g.lineWidth = (0.7 + lane * 0.4) * S;
        g.beginPath();
        g.moveTo(px - wsp, py - up);
        g.quadraticCurveTo(px - wsp * 0.42, py + up * 0.42, px, py);
        g.quadraticCurveTo(px + wsp * 0.42, py + up * 0.42, px + wsp, py - up);
        g.stroke();
      }
      g.restore();
      return;
    }
    case "clouds": {
      // NUVENS volumosas em 2 camadas, iluminadas por cima, derivando devagar.
      const Wd = 430 * S;
      g.save();
      for (let layer = 0; layer < 2; layer++) {
        const k = layer === 0 ? 0.7 : 1;
        const ly = fy + (layer === 0 ? -8 * S : 5 * S);
        const drift = reduce ? 0 : t * (layer === 0 ? 0.0032 : 0.0062);
        // UM gradiente por camada (coordenadas absolutas): topo iluminado,
        // ventre em sombra fria — vale para todas as bolhas da camada.
        const vol = g.createLinearGradient(0, ly - 16 * S * k, 0, ly + 12 * S * k);
        vol.addColorStop(0, "#ffffff");
        vol.addColorStop(0.42, "#eef3fb");
        vol.addColorStop(1, "#b9c6da");
        g.fillStyle = vol;
        g.globalAlpha = layer === 0 ? 0.5 : 0.85;
        for (let i = 0; i < 4; i++) {
          const r1 = hsh(i, 11 + layer), r2 = hsh(i, 59 + layer);
          const cx2 = x - Wd * 0.5 + ((r1 * Wd + drift) % Wd);
          const cy2 = ly + (r2 - 0.5) * 10 * S;
          const cw = (25 + r2 * 18) * k * S;
          cloudPuffPath(g, cx2, cy2, cw, cw * 0.42);
          g.fill();
        }
        // crista iluminada por cima
        g.globalAlpha = (layer === 0 ? 0.3 : 0.5);
        g.fillStyle = "#fffdf6";
        for (let i = 0; i < 4; i++) {
          const r1 = hsh(i, 11 + layer), r2 = hsh(i, 59 + layer);
          const cx2 = x - Wd * 0.5 + ((r1 * Wd + drift) % Wd);
          const cy2 = ly + (r2 - 0.5) * 10 * S;
          const cw = (25 + r2 * 18) * k * S;
          g.beginPath();
          g.ellipse(cx2 - cw * 0.04, cy2 - cw * 0.26, cw * 0.3, cw * 0.13, -0.12, 0, TAU);
          g.fill();
        }
      }
      g.restore();
      return;
    }
    case "firmament": {
      // A EXPANSÃO DO 2º DIA (Gn 1:6-8): as ÁGUAS DE CIMA (véu translúcido,
      // luminoso, ondulando) separadas das ÁGUAS DE BAIXO por um vão de ar.
      const Wd = 470 * S, half = Wd * 0.5;
      const step = Math.max(6, 14 * S);
      const wob = reduce ? 0 : t * 0.0011;
      g.save();
      // ---- águas de cima
      const up = g.createLinearGradient(0, fy - 30 * S, 0, fy - 6 * S);
      up.addColorStop(0, "rgba(236,248,255,0.82)");
      up.addColorStop(0.45, "rgba(168,214,244,0.62)");
      up.addColorStop(1, "rgba(146,202,238,0.06)");
      g.fillStyle = up;
      g.beginPath();
      g.moveTo(x - half, fy - 30 * S);
      g.lineTo(x + half, fy - 30 * S);
      for (let px = x + half; px > x - half; px -= step) {
        g.lineTo(px, fy - 11 * S + Math.sin(px * 0.05 + wob) * 2.2 * S + Math.sin(px * 0.021 - wob * 0.6) * 1.5 * S);
      }
      g.lineTo(x - half, fy - 11 * S + Math.sin((x - half) * 0.05 + wob) * 2.2 * S);
      g.closePath();
      g.fill();
      // cristas luminosas dentro das águas de cima
      g.strokeStyle = "rgba(255,255,255,0.4)"; g.lineWidth = 0.9 * S;
      for (let r = 0; r < 3; r++) {
        const ry = fy - (25 - r * 5) * S;
        g.beginPath();
        for (let px = x - half; px <= x + half; px += step) {
          const yy = ry + Math.sin(px * 0.042 + wob * (1 + r * 0.4) + r) * 1.5 * S;
          if (px === x - half) g.moveTo(px, yy); else g.lineTo(px, yy);
        }
        g.stroke();
      }
      // borda inferior brilhante (a "face" das águas superiores)
      g.strokeStyle = "rgba(226,246,255,0.7)"; g.lineWidth = 1.1 * S;
      g.beginPath();
      for (let px = x - half; px <= x + half; px += step) {
        const yy = fy - 11 * S + Math.sin(px * 0.05 + wob) * 2.2 * S + Math.sin(px * 0.021 - wob * 0.6) * 1.5 * S;
        if (px === x - half) g.moveTo(px, yy); else g.lineTo(px, yy);
      }
      g.stroke();
      // ---- vão de AR entre as águas (a expansão propriamente dita)
      const air = g.createLinearGradient(0, fy - 9 * S, 0, fy + 11 * S);
      air.addColorStop(0, "rgba(255,255,255,0.14)");
      air.addColorStop(0.5, "rgba(255,255,255,0.03)");
      air.addColorStop(1, "rgba(255,255,255,0.12)");
      g.fillStyle = air;
      g.fillRect(x - half, fy - 9 * S, Wd, 20 * S);
      // ---- águas de baixo
      const dn = g.createLinearGradient(0, fy + 11 * S, 0, fy + 30 * S);
      dn.addColorStop(0, "rgba(128,186,226,0.2)");
      dn.addColorStop(0.4, "rgba(84,148,200,0.66)");
      dn.addColorStop(1, "rgba(38,88,140,0.86)");
      g.fillStyle = dn;
      g.beginPath();
      g.moveTo(x - half, fy + 30 * S);
      g.lineTo(x + half, fy + 30 * S);
      for (let px = x + half; px > x - half; px -= step) {
        g.lineTo(px, fy + 12 * S + Math.sin(px * 0.046 - wob * 0.8) * 2 * S + Math.sin(px * 0.019 + wob * 0.4) * 1.2 * S);
      }
      g.lineTo(x - half, fy + 12 * S + Math.sin((x - half) * 0.046 - wob * 0.8) * 2 * S);
      g.closePath();
      g.fill();
      // cristas das águas de baixo
      g.strokeStyle = "rgba(214,238,255,0.42)"; g.lineWidth = 0.8 * S;
      for (let r = 0; r < 2; r++) {
        const ry = fy + (17 + r * 6) * S;
        g.beginPath();
        for (let px = x - half; px <= x + half; px += step) {
          const yy = ry + Math.sin(px * 0.04 - wob * (1.2 + r * 0.3) + r * 2) * 1.3 * S;
          if (px === x - half) g.moveTo(px, yy); else g.lineTo(px, yy);
        }
        g.stroke();
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
  /** semente de VARIAÇÃO visual (normalmente o `id` do personagem): garante que
   *  duas figuras de mesmo papel genérico (dois "homem") não fiquem idênticas. */
  seed?: string;
}

interface HDCfg {
  robe0: string; robe1: string; sash?: string; trim?: string;
  hair: string; beard?: string; skin?: string;
  halo?: number; wings?: boolean; eyesFlame?: boolean; feetBronze?: boolean;
  scroll?: boolean; iris?: string; stars7?: boolean;
  // — elenco patriarcal (Gênesis) —
  veil?: string;         // véu/capuz de pano cobrindo o cabelo (cor do tecido)
  hairLong?: boolean;    // cabelo longo caindo pelos ombros (Eva)
  hairy?: boolean;       // braços peludos (Esaú)
  coatStripes?: boolean; // túnica de várias cores (José)
  nemes?: boolean;       // toucado egípcio listrado + colar usekh (faraó)
  crown?: boolean;       // coroa dourada reutilizável (rei)
  staff?: boolean;       // cajado na mão (pastor/patriarca)
  mantle?: string;       // manto sobre os ombros (cor — Abraão)
}

const SKIN0 = "#e7b98a", SKIN1 = "#c8925c";

function humanCfg(role: string, pose?: string): HDCfg {
  switch (role) {
    case "joao": return { robe0: "#9aa0ad", robe1: "#5f6572", sash: "#5d4a30", trim: "#46506a", hair: "#2a1c10", beard: "#3a2a18", scroll: pose === "write", iris: "#5b4630" };
    case "cristo": return { robe0: "#ffffff", robe1: "#c9d2e4", sash: "#e8b04b", hair: "#f4f4f2", beard: "#eeeeec", halo: 1, eyesFlame: true, feetBronze: true, stars7: true, iris: "#ffb14a" };
    case "anjo": return { robe0: "#f4f7ff", robe1: "#bfcbe4", sash: "#caa050", trim: "#caa050", hair: "#ffe9a8", wings: true, halo: 0.5, iris: "#4a78c0" };
    case "anciao": return { robe0: "#f0f2f8", robe1: "#c2c9da", trim: "#caa050", hair: "#d8d8d8", beard: "#cfcfcf", halo: 0.2, iris: "#5b6470" };
    case "mulherComum": return { robe0: "#5b86c0", robe1: "#33507e", hair: "#3a2a18", iris: "#4a3624" };
    // — ELENCO PATRIARCAL (Gênesis) — decoro sempre: toda figura vestida —
    case "adao": return { robe0: "#9a7048", robe1: "#5f3f22", sash: "#6d4c2a", hair: "#2a1c10", beard: "#3a2a18", iris: "#4a3624" };
    case "eva": return { robe0: "#b08a58", robe1: "#7a5a32", sash: "#8a6a44", hair: "#241408", hairLong: true, iris: "#4a3624" };
    case "noe": return { robe0: "#8d8478", robe1: "#5c554a", sash: "#5d4a30", hair: "#d8d8d8", beard: "#cfcfcf", iris: "#5b6470" };
    case "abraao": return { robe0: "#f2ead8", robe1: "#cabfa0", mantle: "#2c3e6e", sash: "#5d4a30", hair: "#e0e0dc", beard: "#e8e8e4", iris: "#5b4630" };
    case "sara": return { robe0: "#efe4c8", robe1: "#c2b490", veil: "#e2d4b4", sash: "#a8906a", hair: "#3a2a18", iris: "#5b4630" };
    case "isaque": return { robe0: "#d9c49a", robe1: "#a8916a", sash: "#77613e", hair: "#2a1c10", beard: "#3a2a18", iris: "#4a3624" };
    case "rebeca": return { robe0: "#9a4a58", robe1: "#6b2f3a", veil: "#d9c8b0", sash: "#caa050", hair: "#241408", iris: "#4a3624" };
    case "jaco": return { robe0: "#7a8a4a", robe1: "#4c5a2a", sash: "#5d4a30", hair: "#2a1c10", iris: "#4a3624" }; // "homem liso" — sem barba
    case "esau": return { robe0: "#7a5230", robe1: "#4c3018", sash: "#54371c", hair: "#a8482a", beard: "#983e22", hairy: true, skin: "#d8956a", iris: "#5a3018" }; // ruivo e peludo
    case "jose": return { robe0: "#e2d3b2", robe1: "#b09a72", coatStripes: true, hair: "#2a1c10", iris: "#4a3624" }; // túnica de várias cores
    case "farao": return { robe0: "#f2efe4", robe1: "#cfc8b0", nemes: true, hair: "#1c1410", iris: "#2a2018" }; // nemes + usekh + saiote branco
    // — ÊXODO — o libertador e o sumo sacerdote —
    case "moises": return { robe0: "#b7a074", robe1: "#877049", mantle: "#8a3a2a", sash: "#6d4c2a", staff: true, hair: "#dcdcd6", beard: "#cfcfc9", iris: "#4a3624" }; // pastor-profeta grisalho, manto e cajado (a vara de Deus)
    case "arao": return { robe0: "#efe9d6", robe1: "#c8bf9c", sash: "#caa050", trim: "#caa050", veil: "#e6d7a2", hair: "#2a1c10", beard: "#3a2a18", iris: "#4a3624" }; // vestes sacerdotais: linho, ouro e mitra
    case "rei": return { robe0: "#8a4aa8", robe1: "#54286c", trim: "#ffd989", sash: "#caa050", crown: true, hair: "#2a1c10", beard: "#3a2a18", iris: "#4a3624" };
    case "melquisedeque": return { robe0: "#f6efd8", robe1: "#d8c48a", mantle: "#7a1e2a", trim: "#ffd989", sash: "#caa050", crown: true, hair: "#e6e2d8", beard: "#efece2", iris: "#5b4630" }; // rei-sacerdote de Salém: alvo e ouro, manto carmesim
    case "pastor": return { robe0: "#a89066", robe1: "#77613e", sash: "#8a6a44", veil: "#cab694", staff: true, hair: "#2a1c10", beard: "#3a2a18", iris: "#4a3624" }; // capuz de lã + cajado
    case "servo": return { robe0: "#8d8d94", robe1: "#5c5c64", sash: "#5d4a30", hair: "#2a1c10", iris: "#4a3624" };
    case "patriarca": return { robe0: "#9a7a50", robe1: "#6d5334", sash: "#5d4a30", staff: true, hair: "#b8b0a4", beard: "#a8a098", iris: "#5b6470" };
    default: return { robe0: "#8a6a44", robe1: "#5c4225", hair: "#2a1c10", beard: "#3a2a18", iris: "#4a3624" };
  }
}

// ---------------------------------------------------------------------------
// VARIAÇÃO POR PERSONAGEM — dá a cada figura de papel genérico uma aparência
// própria e ESTÁVEL (derivada do `seed`, normalmente o id), para que cinco
// "homem" numa cena não sejam clones. Papéis com identidade definida (Abraão,
// José, Faraó, Melquisedeque…) NÃO variam. Trocas de roupa, cabelo, pele e
// barba vêm de bancos coerentes com o mundo dos patriarcas.
const VARY_MEN = new Set(["homem", "servo"]);
const MEN_ROBES: [string, string][] = [
  ["#8a6a44", "#5c4225"], ["#7a8a4a", "#4c5a2a"], ["#6f7f8c", "#455059"],
  ["#9a6a52", "#5f3f30"], ["#7a7060", "#4c463a"], ["#87694e", "#57402c"],
  ["#5f7a6a", "#3c4c42"], ["#a2814e", "#6a5230"],
];
const WOMEN_ROBES: [string, string][] = [
  ["#5b86c0", "#33507e"], ["#9a4a58", "#6b2f3a"], ["#7a5a8a", "#4c3860"],
  ["#b07a4a", "#7a5230"], ["#4a8a7a", "#2e5a4e"], ["#a86a7a", "#6e3f4c"],
];
const WOMEN_VEILS = ["#d9c8b0", "#c8b48e", "#b9c6dc", "#d8b0b8", "#cbb892"];
const HAIRS = ["#241408", "#2a1c10", "#3a2a18", "#5a4028", "#6b4a2a", "#7a5836", "#a8482a"];
const ELDER_HAIRS = ["#b8b0a4", "#a8a098", "#c8c2b6", "#8a8278", "#9a8f7e"];
const SKINS: (string | undefined)[] = [undefined, "#d8a878", "#caa06e", "#b8895a", "#e2b184"];
const ROYAL_ROBES: [string, string][] = [
  ["#8a4aa8", "#54286c"], ["#a84a6a", "#6c2840"], ["#4a6aa8", "#28406c"],
  ["#a8804a", "#6c5028"], ["#4a8a6a", "#285040"],
];
function hseed(s: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; }
  h ^= h >>> 15; h = Math.imul(h, 2246822507) >>> 0; h ^= h >>> 13;
  return h >>> 0;
}
function varyCfg(cfg: HDCfg, role: string, seed?: string): HDCfg {
  if (!seed) return cfg;
  const h = hseed(seed);
  const pick = <T,>(arr: T[], shift: number): T => arr[(h >>> shift) % arr.length];
  if (role === "mulherComum") {
    const [r0, r1] = pick(WOMEN_ROBES, 0);
    const out: HDCfg = { ...cfg, robe0: r0, robe1: r1, hair: pick(HAIRS.slice(0, 6), 8), hairLong: true };
    if ((h >>> 16) % 3 === 0) out.veil = pick(WOMEN_VEILS, 20);
    return out;
  }
  if (VARY_MEN.has(role)) {
    const [r0, r1] = pick(MEN_ROBES, 0);
    const out: HDCfg = { ...cfg, robe0: r0, robe1: r1, hair: pick(HAIRS, 8) };
    const sk = pick(SKINS, 12); if (sk) out.skin = sk;
    out.beard = (h >>> 4) % 20 < 11 ? mixHex(out.hair, "#000000", 0.12) : undefined;
    return out;
  }
  if (role === "patriarca") {
    // anciãos/chefes: mesma dignidade grisalha, mas roupa e tom variam
    const [r0, r1] = pick(MEN_ROBES, 0);
    const hair = pick(ELDER_HAIRS, 8);
    return { ...cfg, robe0: r0, robe1: r1, hair, beard: mixHex(hair, "#000000", 0.08) };
  }
  if (role === "rei") {
    const [r0, r1] = pick(ROYAL_ROBES, 0);
    const hair = pick(HAIRS, 8);
    const out: HDCfg = { ...cfg, robe0: r0, robe1: r1, hair, beard: mixHex(hair, "#000000", 0.1) };
    const sk = pick(SKINS, 12); if (sk) out.skin = sk;
    return out;
  }
  return cfg;
}

export function drawHumanHD(g: G, x: number, fy: number, spec: HDHumanSpec): void {
  const S = spec.scale ?? 1;
  const t = spec.t ?? 0;
  const reduce = !!spec.reduce;
  const pose = spec.pose ?? "stand";
  const face = spec.facing ?? 1;
  const cfg = varyCfg(humanCfg(spec.role, pose), spec.role, spec.seed);
  // pele: tom customizado por papel (ex.: Esaú avermelhado) sem quebrar o padrão
  const skin0 = cfg.skin ? mixHex(cfg.skin, "#ffffff", 0.1) : SKIN0;
  const skin1 = cfg.skin ? mixHex(cfg.skin, "#000000", 0.24) : SKIN1;
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
    g.fillStyle = skin0;
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
    const feetC = cfg.feetBronze ? "#e0a34c" : skin1;
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
  // ---- TÚNICA DE VÁRIAS CORES (José): listras verticais vivas recortadas
  //      na própria silhueta da túnica, acompanhando o caimento
  if (cfg.coatStripes) {
    g.save();
    g.beginPath();
    g.moveTo(x - 7 * S, bodyTop + 3 * S);
    g.quadraticCurveTo(x, bodyTop - 1.8 * S, x + 7 * S, bodyTop + 3 * S);
    g.quadraticCurveTo(x + 8.6 * S, bodyTop + bodyH * 0.55, x + 9.6 * S + sway, hemY);
    g.quadraticCurveTo(x, hemY + 2 * S, x - 9.6 * S + sway, hemY);
    g.quadraticCurveTo(x - 8.6 * S, bodyTop + bodyH * 0.55, x - 7 * S, bodyTop + 3 * S);
    g.closePath();
    g.clip();
    const stripes = ["#c0483c", "#e8a03c", "#4e8a42", "#3f6ea6", "#7a4ab0", "#d9536a", "#2f9e74", "#f2d44c"];
    for (let i = 0; i < 8; i++) {
      const sx0 = x - 9.6 * S + i * 2.4 * S;
      g.fillStyle = stripes[i];
      g.beginPath();
      g.moveTo(sx0, bodyTop - 2 * S);
      g.quadraticCurveTo(sx0 - 0.6 * S, bodyTop + bodyH * 0.6, sx0 + 0.4 * S + sway * 0.6, hemY + 2.4 * S);
      g.lineTo(sx0 + 2.4 * S + sway * 0.6, hemY + 2.4 * S);
      g.quadraticCurveTo(sx0 + 1.8 * S, bodyTop + bodyH * 0.6, sx0 + 2.4 * S, bodyTop - 2 * S);
      g.closePath(); g.fill();
    }
    // sombreado do tecido sobre as listras (volume de pano de verdade)
    const shade = g.createLinearGradient(x - 9 * S, bodyTop, x + 9 * S, hemY);
    shade.addColorStop(0, "rgba(0,0,0,0.16)");
    shade.addColorStop(0.45, "rgba(0,0,0,0)");
    shade.addColorStop(1, "rgba(255,246,216,0.14)");
    g.fillStyle = shade;
    g.fillRect(x - 11 * S, bodyTop - 3 * S, 22 * S, bodyH + 8 * S);
    g.restore();
  }
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
  // ---- MANTO sobre os ombros (Abraão): panos caindo pelos dois lados ----
  if (cfg.mantle) {
    g.save();
    const mg2 = g.createLinearGradient(x, bodyTop, x, hemY);
    mg2.addColorStop(0, mixHex(cfg.mantle, "#ffffff", 0.18));
    mg2.addColorStop(1, mixHex(cfg.mantle, "#000000", 0.28));
    g.fillStyle = mg2;
    for (const s of [-1, 1] as const) {
      g.beginPath();
      g.moveTo(x + s * 2.4 * S, bodyTop + 1.2 * S);
      g.quadraticCurveTo(x + s * 8.2 * S, bodyTop + 3.6 * S, x + s * 9.2 * S, bodyTop + bodyH * 0.5);
      g.quadraticCurveTo(x + s * (10.2 * S) + sway * 0.5, hemY - 2 * S, x + s * 7.8 * S + sway * 0.5, hemY - 0.4 * S);
      g.lineTo(x + s * 5.2 * S + sway * 0.5, hemY - 1 * S);
      g.quadraticCurveTo(x + s * 6.4 * S, bodyTop + bodyH * 0.5, x + s * 4.2 * S, bodyTop + 3 * S);
      g.closePath(); g.fill();
      // fio de luz na borda externa do manto
      g.strokeStyle = "rgba(255,246,216,0.28)"; g.lineWidth = 0.8 * S; g.lineCap = "round";
      g.beginPath();
      g.moveTo(x + s * 3 * S, bodyTop + 1.6 * S);
      g.quadraticCurveTo(x + s * 8.6 * S, bodyTop + 4 * S, x + s * 9.4 * S, bodyTop + bodyH * 0.52);
      g.stroke();
    }
    // fecho no peito
    g.fillStyle = "#caa050";
    g.beginPath(); g.arc(x, bodyTop + 2.6 * S, 1.2 * S, 0, TAU); g.fill();
    g.restore();
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
    hand.addColorStop(0, skin0); hand.addColorStop(1, skin1);
    g.fillStyle = hand;
    g.beginPath(); g.arc(ex, ey, w * 0.5, 0, TAU); g.fill();
    // braços peludos (Esaú): pelinhos no antebraço, perto do punho
    if (cfg.hairy) {
      g.strokeStyle = mixHex(cfg.hair, "#000000", 0.15); g.lineWidth = 0.55 * S; g.lineCap = "round";
      for (const k of [0.62, 0.76, 0.9]) {
        const hx = sx + (ex - sx) * k, hy = sy + (ey - sy) * k;
        g.beginPath(); g.moveTo(hx - 0.9 * S, hy + 0.3 * S); g.lineTo(hx + 0.5 * S, hy - 1.1 * S); g.stroke();
        g.beginPath(); g.moveTo(hx + 0.2 * S, hy + 0.9 * S); g.lineTo(hx + 1.4 * S, hy - 0.4 * S); g.stroke();
      }
    }
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
  g.fillStyle = skin1;
  rr(g, x - 1.8 * S, headCy + headR - 1 * S, 3.6 * S, 3.4 * S, 1.4 * S); g.fill();
  const skin = g.createRadialGradient(x - 2.5 * S, headCy - 3 * S, 1, x, headCy, headR * 1.15);
  skin.addColorStop(0, mixHex(skin0, "#ffffff", 0.28)); skin.addColorStop(0.75, skin0); skin.addColorStop(1, skin1);
  g.fillStyle = skin;
  g.beginPath();
  // rosto levemente oval (queixo mais fino = mais humano)
  g.ellipse(x, headCy, headR * 0.94, headR, 0, 0, TAU);
  g.fill();

  // orelhas
  g.fillStyle = skin0;
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
  // ---- cabelo LONGO caindo pelos ombros (Eva) ----
  if (cfg.hairLong) {
    g.fillStyle = cfg.hair;
    for (const s of [-1, 1] as const) {
      g.beginPath();
      g.moveTo(x + s * headR * 0.88, headCy - headR * 0.32);
      g.quadraticCurveTo(x + s * headR * 1.3, headCy + headR * 1.1, x + s * headR * 1.0, bodyTop + 10 * S);
      g.quadraticCurveTo(x + s * headR * 0.82, bodyTop + 11.4 * S, x + s * headR * 0.55, bodyTop + 9.6 * S);
      g.quadraticCurveTo(x + s * headR * 0.8, headCy + headR * 0.8, x + s * headR * 0.62, headCy + 0.5 * S);
      g.closePath(); g.fill();
      // brilho da mecha
      g.save(); g.globalAlpha *= 0.25; g.strokeStyle = "#ffffff"; g.lineWidth = 0.8 * S; g.lineCap = "round";
      g.beginPath();
      g.moveTo(x + s * headR * 0.92, headCy + 1 * S);
      g.quadraticCurveTo(x + s * headR * 1.12, headCy + headR * 1.1, x + s * headR * 0.9, bodyTop + 8.4 * S);
      g.stroke();
      g.restore();
    }
  }
  // ---- VÉU/CAPUZ de pano cobrindo o cabelo (Sara, Rebeca, pastor) ----
  if (cfg.veil) {
    g.save();
    const vg2 = g.createLinearGradient(x, headCy - headR * 1.24, x, bodyTop + 9 * S);
    vg2.addColorStop(0, mixHex(cfg.veil, "#ffffff", 0.22));
    vg2.addColorStop(1, mixHex(cfg.veil, "#000000", 0.2));
    g.fillStyle = vg2;
    // pano sobre o topo (deixa o rosto livre)
    g.beginPath();
    g.moveTo(x - headR * 1.04, headCy + 1.2 * S);
    g.quadraticCurveTo(x - headR * 1.14, headCy - headR * 1.1, x, headCy - headR * 1.24);
    g.quadraticCurveTo(x + headR * 1.14, headCy - headR * 1.1, x + headR * 1.04, headCy + 1.2 * S);
    g.quadraticCurveTo(x + headR * 0.7, headCy - headR * 0.5, x, headCy - headR * 0.58);
    g.quadraticCurveTo(x - headR * 0.7, headCy - headR * 0.5, x - headR * 1.04, headCy + 1.2 * S);
    g.closePath(); g.fill();
    // caimentos laterais até os ombros
    for (const s of [-1, 1] as const) {
      g.beginPath();
      g.moveTo(x + s * headR * 1.0, headCy + 0.4 * S);
      g.quadraticCurveTo(x + s * headR * 1.26, headCy + headR * 1.3, x + s * headR * 0.95, bodyTop + 8.6 * S);
      g.lineTo(x + s * headR * 0.55, bodyTop + 7 * S);
      g.quadraticCurveTo(x + s * headR * 0.8, headCy + headR * 0.7, x + s * headR * 0.76, headCy + 0.1 * S);
      g.closePath(); g.fill();
    }
    // dobra e sombra de assentamento na testa
    g.strokeStyle = "rgba(0,0,0,0.22)"; g.lineWidth = 1 * S; g.lineCap = "round";
    g.beginPath();
    g.moveTo(x - headR * 0.66, headCy - headR * 0.44);
    g.quadraticCurveTo(x, headCy - headR * 0.52, x + headR * 0.66, headCy - headR * 0.44);
    g.stroke();
    g.strokeStyle = "rgba(255,250,235,0.3)"; g.lineWidth = 0.7 * S;
    g.beginPath();
    g.moveTo(x - headR * 0.9, headCy - headR * 0.7);
    g.quadraticCurveTo(x, headCy - headR * 1.06, x + headR * 0.9, headCy - headR * 0.7);
    g.stroke();
    g.restore();
  }
  // ---- NEMES egípcio (faraó): toucado listrado azul/ouro + colar usekh ----
  if (cfg.nemes) {
    g.save();
    const nTop = headCy - headR * 1.32;
    const nemesPath = () => {
      g.beginPath();
      g.moveTo(x - headR * 1.1, headCy + 0.8 * S);
      g.quadraticCurveTo(x - headR * 1.22, nTop + 2 * S, x, nTop);
      g.quadraticCurveTo(x + headR * 1.22, nTop + 2 * S, x + headR * 1.1, headCy + 0.8 * S);
      // aba direita descendo diante do ombro
      g.quadraticCurveTo(x + headR * 1.3, headCy + headR * 1.1, x + headR * 0.94, bodyTop + 7 * S);
      g.lineTo(x + headR * 0.52, bodyTop + 5.6 * S);
      g.quadraticCurveTo(x + headR * 0.74, headCy + headR * 0.5, x + headR * 0.62, headCy + 0.4 * S);
      g.quadraticCurveTo(x, headCy - headR * 0.7, x - headR * 0.62, headCy + 0.4 * S); // faixa da testa
      g.quadraticCurveTo(x - headR * 0.74, headCy + headR * 0.5, x - headR * 0.52, bodyTop + 5.6 * S);
      g.lineTo(x - headR * 0.94, bodyTop + 7 * S);
      g.quadraticCurveTo(x - headR * 1.3, headCy + headR * 1.1, x - headR * 1.1, headCy + 0.8 * S);
      g.closePath();
    };
    const ng = g.createLinearGradient(x, nTop, x, bodyTop + 7 * S);
    ng.addColorStop(0, "#ffe4a0"); ng.addColorStop(1, "#d9a83e");
    g.fillStyle = ng;
    nemesPath(); g.fill();
    // listras azuis acompanhando o toucado
    g.save();
    nemesPath(); g.clip();
    g.strokeStyle = "#2c50a8"; g.lineWidth = 1.5 * S; g.lineCap = "round";
    for (let i = 0; i < 8; i++) {
      const yy = nTop + 2 * S + i * 2.7 * S;
      g.beginPath();
      g.moveTo(x - headR * 1.4, yy + headR * 0.4);
      g.quadraticCurveTo(x, yy - headR * 0.3, x + headR * 1.4, yy + headR * 0.4);
      g.stroke();
    }
    g.restore();
    // contorno + faixa da testa dourada
    g.strokeStyle = "rgba(120,84,20,0.55)"; g.lineWidth = 0.8 * S;
    nemesPath(); g.stroke();
    g.strokeStyle = "#ffd889"; g.lineWidth = 1.4 * S; g.lineCap = "round";
    g.beginPath();
    g.moveTo(x - headR * 0.64, headCy + 0.3 * S);
    g.quadraticCurveTo(x, headCy - headR * 0.72, x + headR * 0.64, headCy + 0.3 * S);
    g.stroke();
    // uraeus (naja real) no centro da testa
    g.fillStyle = "#ffd24a";
    g.beginPath(); g.ellipse(x, headCy - headR * 0.6, 1 * S, 1.5 * S, 0, 0, TAU); g.fill();
    g.fillStyle = "#2c50a8";
    g.beginPath(); g.arc(x, headCy - headR * 0.84, 0.55 * S, 0, TAU); g.fill();
    // colar USEKH (arcos concêntricos dourado/azul no peito)
    for (const [rw, col] of [[7, "#ffd889"], [5.8, "#2c50a8"], [4.6, "#ffe9b8"]] as const) {
      g.strokeStyle = col; g.lineWidth = 1.6 * S; g.lineCap = "round";
      g.beginPath(); g.ellipse(x, bodyTop + 2.2 * S, rw * S, rw * 0.6 * S, 0, 0.15, Math.PI - 0.15); g.stroke();
    }
    g.restore();
  }
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

  // coroa dourada (ancião e flag reutilizável — rei)
  if (spec.role === "anciao" || cfg.crown) {
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

  // ---- CAJADO na mão (pastor/patriarca): vara com curva no alto ----
  if (cfg.staff) {
    const sxs = x + face * 8.4 * S;
    g.save();
    g.strokeStyle = "#7a5a34"; g.lineWidth = 1.8 * S; g.lineCap = "round";
    g.beginPath();
    g.moveTo(sxs, fy - 0.5 * S);
    g.lineTo(sxs, bodyTop - 5 * S);
    g.quadraticCurveTo(sxs + face * 0.4 * S, bodyTop - 9.4 * S, sxs + face * 3.8 * S, bodyTop - 8.6 * S);
    g.stroke();
    // fio de luz da madeira
    g.strokeStyle = "rgba(255,235,200,0.3)"; g.lineWidth = 0.7 * S;
    g.beginPath(); g.moveTo(sxs - 0.4 * S, fy - 2 * S); g.lineTo(sxs - 0.4 * S, bodyTop - 4 * S); g.stroke();
    // mão segurando o cajado
    const grip = g.createRadialGradient(sxs - 0.5 * S, shY + 8.5 * S, 0.2, sxs, shY + 9 * S, 2 * S);
    grip.addColorStop(0, skin0); grip.addColorStop(1, skin1);
    g.fillStyle = grip;
    g.beginPath(); g.arc(sxs, shY + 9 * S, 1.9 * S, 0, TAU); g.fill();
    g.restore();
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

// A COR é do CORPO (externa, bem visível); o foguinho/crescente da barriga é
// SEMPRE azul (marca do personagem). "blue" original = navy escuro vítreo.
const HERO_PAL: Record<MascotColor, { top: string; bot: string; glow: string; iris: string }> = {
  blue: { top: "#35509c", bot: "#131f4a", glow: "#5a8cff", iris: "#3f8cff" },
  yellow: { top: "#f0c040", bot: "#8a5e10", glow: "#ffe08a", iris: "#b07c2b" },
  red: { top: "#cc4a48", bot: "#5e1414", glow: "#ff8a7a", iris: "#c03828" },
  pink: { top: "#e878be", bot: "#7c2a5e", glow: "#ffb0dc", iris: "#c04a92" },
  skyblue: { top: "#54b0dc", bot: "#175a80", glow: "#a0e0ff", iris: "#2a7ab0" },
  black: { top: "#26262e", bot: "#0a0a0e", glow: "#8a93b8", iris: "#aab4d8" },
  white: { top: "#d8dce8", bot: "#8a90a4", glow: "#ffffff", iris: "#5a78c8" },
  orange: { top: "#e88434", bot: "#7c3c0c", glow: "#ffb070", iris: "#b05a18" },
  green: { top: "#42a058", bot: "#14522a", glow: "#8ae0a0", iris: "#1c7a3c" },
};
// azul da marca: foguinho na cabeça, crescente e chama da barriga
const BRAND_BLUE = "#3f8cff";

export interface HDHeroOpts { t: number; reduce?: boolean; walking?: boolean; face?: 1 | -1 }

// altura que cada montaria levanta o herói (px) — nos animais ele SENTA na
// sela (corpo assentado, sem pés); na carruagem ele fica DE PÉ dentro do cesto
// (valores acompanham a escala 1.45 dos quadrúpedes)
const MOUNT_LIFT: Record<string, number> = { chariot: 6, horse: 32, camel: 36, donkey: 29 };
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

  // ---- quadrúpedes — em escala PROPORCIONAL ao herói (animal de montar
  //      de verdade, não um pônei) ----
  const Q = 1.45;
  g.save();
  g.translate(x, fy); g.scale(Q, Q); g.translate(-x, -fy);
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
  g.restore();
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

/** Asa DOURADA: penas de ouro polido com pontas claras e nervura escura. */
function drawGoldWing(g: G, x: number, y: number, s: -1 | 1, size: number, flap: number): void {
  g.save();
  for (let i = 4; i >= 0; i--) {
    const fr = i / 4;
    const ang = (-0.58 + fr * 0.9) + flap * 0.03;
    const len = size * (1 - fr * 0.3);
    const wdt = size * 0.25 * (1 - fr * 0.18);
    const tipX = x + s * Math.cos(ang) * len;
    const tipY = y + Math.sin(ang) * len - flap * (1 - fr * 0.5);
    const grd = g.createLinearGradient(x, y, tipX, tipY);
    grd.addColorStop(0, "#a8751f");
    grd.addColorStop(0.45, "#e8b04b");
    grd.addColorStop(0.85, "#ffd889");
    grd.addColorStop(1, "#fff3c0");
    g.fillStyle = grd;
    g.beginPath();
    g.moveTo(x, y - wdt * 0.4);
    g.quadraticCurveTo(x + s * len * 0.5, tipY - wdt, tipX, tipY);
    g.quadraticCurveTo(x + s * len * 0.55, tipY + wdt * 0.9, x, y + wdt * 0.8);
    g.closePath(); g.fill();
    // nervura da pena (ouro escuro)
    g.strokeStyle = "rgba(138,98,24,0.55)"; g.lineWidth = 0.8;
    g.beginPath();
    g.moveTo(x + s * 2, y + wdt * 0.3);
    g.quadraticCurveTo(x + s * len * 0.55, tipY + wdt * 0.5, tipX, tipY);
    g.stroke();
    // fio de brilho na borda de cima
    g.strokeStyle = "rgba(255,246,216,0.7)"; g.lineWidth = 0.6;
    g.beginPath();
    g.moveTo(x + s * 3, y - wdt * 0.3);
    g.quadraticCurveTo(x + s * len * 0.5, tipY - wdt * 0.9, tipX, tipY - 0.6);
    g.stroke();
  }
  // coberteiras de ouro
  const cov = g.createRadialGradient(x, y, 1, x, y, size * 0.42);
  cov.addColorStop(0, "#fff3c0"); cov.addColorStop(1, "#d9a83e");
  g.fillStyle = cov;
  g.beginPath(); g.ellipse(x + s * size * 0.14, y, size * 0.3, size * 0.2, s * 0.4, 0, TAU); g.fill();
  g.restore();
}

/** Asa de CRISTAL: lascas facetadas translúcidas, bordas brancas e cintilância. */
function drawCrystalWing(g: G, x: number, y: number, s: -1 | 1, size: number, flap: number, t: number, reduce: boolean): void {
  g.save();
  glowCircle(g, x + s * size * 0.4, y, size * 0.5, "#8ad0ff", 0.3);
  for (let i = 4; i >= 0; i--) {
    const fr = i / 4;
    const ang = (-0.58 + fr * 0.9) + flap * 0.028;
    const len = size * (1 - fr * 0.3);
    const wdt = size * 0.2 * (1 - fr * 0.15);
    const tipX = x + s * Math.cos(ang) * len;
    const tipY = y + Math.sin(ang) * len - flap * (1 - fr * 0.5);
    const midX = x + s * Math.cos(ang) * len * 0.55;
    const midY = y + Math.sin(ang) * len * 0.55;
    // lasca = losango facetado (não pena): translúcido com gradiente de gelo
    const grd = g.createLinearGradient(x, y, tipX, tipY);
    grd.addColorStop(0, "rgba(120,180,232,0.55)");
    grd.addColorStop(0.55, "rgba(170,220,255,0.7)");
    grd.addColorStop(1, "rgba(235,250,255,0.95)");
    g.fillStyle = grd;
    g.beginPath();
    g.moveTo(x, y - wdt * 0.3);
    g.lineTo(midX + s * 1, midY - wdt);      // faceta de cima (reta = cristal)
    g.lineTo(tipX, tipY);                    // ponta afiada
    g.lineTo(midX - s * 0.5, midY + wdt * 0.9);
    g.closePath(); g.fill();
    // aresta branca (lapidação)
    g.strokeStyle = "rgba(255,255,255,0.85)"; g.lineWidth = 0.7;
    g.stroke();
    // reflexo interno da faceta
    g.strokeStyle = "rgba(255,255,255,0.5)"; g.lineWidth = 0.5;
    g.beginPath(); g.moveTo(x + s * 3, y); g.lineTo(midX, midY - wdt * 0.3); g.stroke();
  }
  // base de gelo
  const cov = g.createRadialGradient(x, y, 1, x, y, size * 0.36);
  cov.addColorStop(0, "rgba(240,250,255,0.95)"); cov.addColorStop(1, "rgba(150,205,245,0.5)");
  g.fillStyle = cov;
  g.beginPath(); g.ellipse(x + s * size * 0.12, y, size * 0.26, size * 0.18, s * 0.4, 0, TAU); g.fill();
  // cintilância (estrelinhas de 4 pontas)
  if (!reduce) {
    g.strokeStyle = "#ffffff"; g.lineWidth = 0.8; g.lineCap = "round";
    for (let sp = 0; sp < 3; sp++) {
      if (((t * 0.004 + sp * 1.4 + (s + 1)) % 2.8) < 0.4) {
        const sx2 = x + s * (size * (0.35 + sp * 0.22));
        const sy2 = y - 6 + sp * 7;
        g.beginPath(); g.moveTo(sx2 - 2, sy2); g.lineTo(sx2 + 2, sy2); g.stroke();
        g.beginPath(); g.moveTo(sx2, sy2 - 2); g.lineTo(sx2, sy2 + 2); g.stroke();
      }
    }
  }
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

  // ---- aura (loja premium) — cada uma com identidade própria ----
  if (look.aura === "pillar") {
    // COLUNA DE FOGO (Êx 13:21): pilar flamejante atrás do herói
    const flick = reduce ? 0 : Math.sin(t * 0.013) * 3;
    const flick2 = reduce ? 0 : Math.sin(t * 0.021 + 2) * 2.4;
    glowCircle(g, x, fy - 40, 52, "#ff9430", 0.4);
    const pcol = g.createLinearGradient(x, fy - 88 - flick, x, fy);
    pcol.addColorStop(0, "rgba(255,214,110,0.0)");
    pcol.addColorStop(0.12, "rgba(255,196,80,0.75)");
    pcol.addColorStop(0.6, "rgba(232,106,46,0.85)");
    pcol.addColorStop(1, "rgba(150,50,18,0.9)");
    g.fillStyle = pcol;
    g.beginPath();
    g.moveTo(x, fy - 90 - flick);
    g.bezierCurveTo(x + 13 + flick2, fy - 66, x + 17, fy - 34, x + 14, fy - 2);
    g.quadraticCurveTo(x, fy + 2, x - 14, fy - 2);
    g.bezierCurveTo(x - 17, fy - 34, x - 13 - flick2, fy - 66, x, fy - 90 - flick);
    g.closePath(); g.fill();
    // línguas de fogo internas
    g.fillStyle = "rgba(255,233,176,0.8)";
    g.beginPath();
    g.moveTo(x, fy - 66 - flick * 0.7);
    g.quadraticCurveTo(x + 7 + flick2 * 0.5, fy - 36, x, fy - 6);
    g.quadraticCurveTo(x - 7 - flick2 * 0.5, fy - 36, x, fy - 66 - flick * 0.7);
    g.fill();
    // fagulhas subindo
    if (!reduce) {
      g.fillStyle = "#ffd98a";
      for (let sp = 0; sp < 5; sp++) {
        const ph = (t * 0.0011 + sp * 0.23) % 1;
        const sy2 = fy - 8 - ph * 78;
        const sx2 = x + Math.sin(t * 0.004 + sp * 2.1) * (10 - ph * 5);
        g.globalAlpha = (1 - ph) * 0.85;
        g.beginPath(); g.arc(sx2, sy2, 1.2 - ph * 0.6, 0, TAU); g.fill();
      }
      g.globalAlpha = 1;
    }
  } else if (look.aura === "shekinah") {
    // NUVEM DE GLÓRIA (1Rs 8:10): nuvem luminosa envolvendo os pés + luz do alto
    const drift = reduce ? 0 : Math.sin(t * 0.0022) * 3;
    glowCircle(g, x, fy - 30, 50, "#fff2c8", 0.3);
    // facho de luz descendo
    const beam2 = g.createLinearGradient(x, fy - 96, x, fy - 8);
    beam2.addColorStop(0, "rgba(255,244,208,0.5)");
    beam2.addColorStop(1, "rgba(255,244,208,0.04)");
    g.fillStyle = beam2;
    g.beginPath();
    g.moveTo(x - 7, fy - 96); g.lineTo(x + 7, fy - 96);
    g.lineTo(x + 24, fy - 8); g.lineTo(x - 24, fy - 8);
    g.closePath(); g.fill();
    // rolos de nuvem na base (na frente e atrás dos pés)
    for (const [dx, dy2, r, a] of [
      [-16, -4, 9, 0.5], [16, -4, 9, 0.5], [-6, -2, 11, 0.6], [8, -2, 10.5, 0.6], [0, -6, 12, 0.4],
    ] as const) {
      const cg2 = g.createRadialGradient(x + dx + drift * 0.4, fy + dy2 - 3, 1, x + dx + drift * 0.4, fy + dy2, r);
      cg2.addColorStop(0, `rgba(255,248,224,${a + 0.25})`);
      cg2.addColorStop(1, `rgba(232,214,166,${a * 0.25})`);
      g.fillStyle = cg2;
      g.beginPath(); g.arc(x + dx + drift * 0.4, fy + dy2, r, 0, TAU); g.fill();
    }
    if (!reduce) {
      g.fillStyle = "#fff6d8";
      for (let sp = 0; sp < 4; sp++) {
        if (((t * 0.003 + sp * 1.7) % 3.4) < 0.4) {
          g.beginPath(); g.arc(x - 20 + sp * 13, fy - 14 - (sp % 2) * 16, 1, 0, TAU); g.fill();
        }
      }
    }
  } else if (look.aura === "glory") {
    // RAIOS DE GLÓRIA: sol de raios dourados girando devagar atrás do herói
    const rot = reduce ? 0 : t * 0.00045;
    const cy2 = fy - 30;
    glowCircle(g, x, cy2, 46, "#ffd98a", 0.4);
    g.save();
    g.translate(x, cy2); g.rotate(rot);
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * TAU;
      const long = i % 2 === 0;
      const r0 = 16, r1 = long ? 46 : 34;
      const halfW = long ? 0.16 : 0.11;
      const rg = g.createLinearGradient(Math.cos(a) * r0, Math.sin(a) * r0, Math.cos(a) * r1, Math.sin(a) * r1);
      rg.addColorStop(0, "rgba(255,216,120,0.5)");
      rg.addColorStop(1, "rgba(255,216,120,0)");
      g.fillStyle = rg;
      g.beginPath();
      g.moveTo(Math.cos(a - halfW) * r0, Math.sin(a - halfW) * r0);
      g.lineTo(Math.cos(a) * r1, Math.sin(a) * r1);
      g.lineTo(Math.cos(a + halfW) * r0, Math.sin(a + halfW) * r0);
      g.closePath(); g.fill();
    }
    g.restore();
    // anel interno suave
    g.strokeStyle = "rgba(255,228,150,0.4)"; g.lineWidth = 1.6;
    g.beginPath(); g.arc(x, cy2, 17, 0, TAU); g.stroke();
  } else if (look.aura && look.aura !== "none") {
    glowCircle(g, x, fy - 24, 44, pal.glow, 0.35);
  }

  // ---- asas (atrás) — GRANDES, cada tipo com identidade própria ----
  if (look.wings && look.wings !== "none") {
    const flap = reduce ? 0 : Math.sin(t * 0.006) * 4;
    const wingY = top + 17;
    if (look.wings === "gold") {
      // ASAS DOURADAS: ouro de verdade, maiores e com brilho
      glowCircle(g, x, wingY, 40, "#ffd24a", 0.3);
      drawGoldWing(g, x - W / 2 + 3, wingY, -1, 38, flap);
      drawGoldWing(g, x + W / 2 - 3, wingY, 1, 38, flap);
    } else if (look.wings === "crystal") {
      // ASAS DE CRISTAL: lascas cristalinas translúcidas com cintilância
      drawCrystalWing(g, x - W / 2 + 3, wingY, -1, 36, flap, t, reduce);
      drawCrystalWing(g, x + W / 2 - 3, wingY, 1, 36, flap, t, reduce);
    } else if (look.wings === "seraph") {
      // ASAS DE SERAFIM (Is 6:2): SEIS asas deslumbrantes, branco-ouro com glow
      glowCircle(g, x, wingY, 52, "#fff2c8", 0.45);
      const f2 = reduce ? 0 : Math.sin(t * 0.006 + 1.2) * 3;
      const f3 = reduce ? 0 : Math.sin(t * 0.006 + 2.4) * 2.4;
      for (const s of [-1, 1] as const) {
        const bx2 = x + s * (W / 2 - 3);
        g.save();
        // asa de CIMA (apontando pro alto)
        g.translate(bx2, wingY - 6); g.rotate(s * -0.62);
        drawFeatherWing(g, 0, 0, s, 30, f2, "#fff6e0");
        g.restore();
        // asa do MEIO (a grande)
        drawFeatherWing(g, bx2, wingY + 2, s, 38, flap, "#fff0d0");
        g.save();
        // asa de BAIXO (cobrindo, apontando pro chão)
        g.translate(bx2, wingY + 12); g.rotate(s * 0.66);
        drawFeatherWing(g, 0, 0, s, 26, f3, "#ffe9c0");
        g.restore();
      }
      // cintilância ao redor
      if (!reduce) {
        g.fillStyle = "#fff6d8";
        for (let sp = 0; sp < 6; sp++) {
          if (((t * 0.004 + sp * 1.3) % 3) < 0.35) {
            const ang3 = sp * 1.9;
            g.beginPath();
            g.arc(x + Math.cos(ang3) * (26 + (sp % 3) * 9), wingY + Math.sin(ang3) * 18, 1.1, 0, TAU);
            g.fill();
          }
        }
      }
    } else {
      // ASAS DE POMBA: brancas emplumadas
      drawFeatherWing(g, x - W / 2 + 3, wingY, -1, 34, flap, "#eef3ff");
      drawFeatherWing(g, x + W / 2 - 3, wingY, 1, 34, flap, "#eef3ff");
    }
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

  // (sem capa atrás: o traje vestido no corpo já é o suficiente)

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
      armor: { c0: "#c2ccdc", c1: "#6d7890", trim: "#e8b04b" },
      priest: { c0: "#ffffff", c1: "#dde2ee", trim: "#ffd989" },
      ephod: { c0: "#4a68c0", c1: "#28387c", trim: "#ffd989" },
      shepherd: { c0: "#cab694", c1: "#8a7452" },
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
    } else if (look.robe === "armor") {
      // couraça: placas metálicas horizontais + rebites + brilho de aço
      g.strokeStyle = "rgba(40,48,64,0.55)"; g.lineWidth = 1.1;
      for (let yy = vTop + 4.5; yy < top + H - 2; yy += 4.5) {
        g.beginPath(); g.moveTo(L - 1, yy); g.quadraticCurveTo(x + 1, yy + 1.6, Rmax + 2, yy); g.stroke();
      }
      g.fillStyle = "#e6ecf6";
      for (const [dx, dy2] of [[-8, 3], [8, 3], [-8, 12], [8, 12]] as const) {
        g.beginPath(); g.arc(x + dx, vTop + dy2, 0.8, 0, TAU); g.fill();
      }
      // gola de metal + reflexo diagonal
      g.strokeStyle = rc2.trim ?? "#e8b04b"; g.lineWidth = 1.3; g.lineCap = "round";
      g.beginPath(); g.moveTo(L - 1, vTop + 1.6); g.quadraticCurveTo(x + 1, vTop - 1.9, Rmax + 2, vTop + 1.6); g.stroke();
      g.save(); g.globalAlpha *= 0.35; g.fillStyle = "#ffffff";
      g.beginPath();
      g.moveTo(L + 2, vTop + 2); g.lineTo(L + 7, vTop + 2); g.lineTo(x + 4, top + H); g.lineTo(x - 1, top + H);
      g.closePath(); g.fill();
      g.restore();
    } else if (look.robe === "priest") {
      // vestes sacerdotais: linho branco + faixa dourada no peito + franjas
      g.strokeStyle = rc2.trim ?? "#ffd989"; g.lineWidth = 1.3; g.lineCap = "round";
      g.beginPath(); g.moveTo(L - 1, vTop + 1.6); g.quadraticCurveTo(x + 1, vTop - 1.9, Rmax + 2, vTop + 1.6); g.stroke();
      g.fillStyle = "#e8b04b";
      rr(g, L - 2, beltY - 1, W + 10, 3.6, 1.6); g.fill();
      g.strokeStyle = "rgba(255,246,216,0.8)"; g.lineWidth = 0.6;
      g.beginPath(); g.moveTo(L - 1, beltY + 0.4); g.lineTo(Rmax + 1, beltY + 0.4); g.stroke();
      // listras finas de linho
      g.strokeStyle = "rgba(120,130,160,0.2)"; g.lineWidth = 1.6;
      for (const dx of [-7, 0, 7]) {
        g.beginPath(); g.moveTo(x + dx, vTop + 3); g.quadraticCurveTo(x + dx - 0.6, top + H * 0.85, x + dx + 0.5, top + H); g.stroke();
      }
      // franjas na barra
      g.strokeStyle = "#d4c8a8"; g.lineWidth = 0.9;
      for (let dx = -12; dx <= 14; dx += 3.2) {
        g.beginPath(); g.moveTo(x + dx, top + H - 2.4); g.lineTo(x + dx + 0.4, top + H + 0.6); g.stroke();
      }
    } else if (look.robe === "ephod") {
      // éfode: azul real + PEITORAL com as 12 pedras (4×3) engastadas em ouro
      g.strokeStyle = rc2.trim ?? "#ffd989"; g.lineWidth = 1.4; g.lineCap = "round";
      g.beginPath(); g.moveTo(L - 1, vTop + 1.6); g.quadraticCurveTo(x + 1, vTop - 1.9, Rmax + 2, vTop + 1.6); g.stroke();
      // placa do peitoral
      g.fillStyle = "#e8b04b";
      rr(g, x - 6.5, vTop + 2.6, 15, 12.5, 2); g.fill();
      g.strokeStyle = "#8a6218"; g.lineWidth = 0.8;
      rr(g, x - 6.5, vTop + 2.6, 15, 12.5, 2); g.stroke();
      // correntinhas até a gola
      g.strokeStyle = "#ffd889"; g.lineWidth = 0.8;
      g.beginPath(); g.moveTo(x - 4.5, vTop + 3); g.lineTo(x - 6.5, vTop + 0.4); g.stroke();
      g.beginPath(); g.moveTo(x + 6.5, vTop + 3); g.lineTo(x + 8.5, vTop + 0.4); g.stroke();
      // 12 pedras (cores das tribos)
      const gems = ["#c0392b", "#2ecc71", "#3498db", "#f1c40f", "#9b59b6", "#e67e22", "#1abc9c", "#e84393", "#f5f0e0", "#34495e", "#d35400", "#8e44ad"];
      for (let gi = 0; gi < 12; gi++) {
        const gx2 = x - 3.6 + (gi % 3) * 4.6;
        const gy2 = vTop + 5 + Math.floor(gi / 3) * 2.7;
        g.fillStyle = gems[gi];
        g.beginPath(); g.arc(gx2, gy2, 1.05, 0, TAU); g.fill();
        g.fillStyle = "rgba(255,255,255,0.6)";
        g.beginPath(); g.arc(gx2 - 0.3, gy2 - 0.3, 0.35, 0, TAU); g.fill();
      }
      // cinto dourado
      g.fillStyle = "rgba(232,176,75,0.9)";
      rr(g, L - 2, beltY + 1, W + 10, 2.8, 1.2); g.fill();
    } else if (look.robe === "shepherd") {
      // manto do pastor: lã encaracolada + cinto de corda
      g.strokeStyle = "rgba(255,250,235,0.4)"; g.lineWidth = 1;
      for (let ri = 0; ri < 10; ri++) {
        const cx3 = x - 10 + ((ri * 47) % 22);
        const cy3 = vTop + 3 + ((ri * 29) % (H * 0.3));
        g.beginPath(); g.arc(cx3, cy3, 1.7, 0.3, Math.PI * 1.6); g.stroke();
      }
      g.strokeStyle = "rgba(90,70,40,0.3)"; g.lineWidth = 1;
      for (let ri = 0; ri < 8; ri++) {
        const cx3 = x - 8 + ((ri * 53) % 20);
        const cy3 = vTop + 5 + ((ri * 37) % (H * 0.28));
        g.beginPath(); g.arc(cx3, cy3, 1.4, Math.PI * 0.8, Math.PI * 2.1); g.stroke();
      }
      // cinto de corda com nó
      g.strokeStyle = "#a8906a"; g.lineWidth = 1.8; g.lineCap = "round";
      g.beginPath(); g.moveTo(L - 2, beltY + 1); g.quadraticCurveTo(x, beltY + 2.4, Rmax + 2, beltY + 1); g.stroke();
      g.beginPath(); g.arc(x - 3, beltY + 2.4, 1.4, 0, TAU); g.stroke();
    }
    g.restore();
  } else {
    // ---- crescente "D" luminoso na barriga (marca: SEMPRE azul) ----
    g.save();
    g.strokeStyle = BRAND_BLUE;
    g.lineWidth = 1.9; g.lineCap = "round";
    g.shadowColor = BRAND_BLUE; g.shadowBlur = 7;
    g.globalAlpha *= 0.8;
    g.beginPath();
    g.moveTo(x + 0.5, top + H * 0.52);
    g.bezierCurveTo(x + 8.5, top + H * 0.56, x + 8.5, top + H * 0.8, x + 0.5, top + H * 0.85);
    g.stroke();
    g.restore();
    // chama pequena dentro do crescente
    const fl = reduce ? 0 : Math.sin(t * 0.01) * 0.8;
    const emY = top + H * 0.685;
    glowCircle(g, x + 1.5, emY, 6, BRAND_BLUE, 0.5);
    g.fillStyle = BRAND_BLUE;
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
    // CHAPÉU DE AVENTUREIRO vestido: copa cobrindo a cabeça INTEIRA
    // (mesma pegada do boné) + aba larga cruzando na altura da testa
    const brimY = top + 6;
    const hatC = g.createLinearGradient(headCx, top - 11, headCx, brimY + 4);
    hatC.addColorStop(0, "#8a6a44"); hatC.addColorStop(1, "#5d4a30");
    g.fillStyle = hatC;
    // copa larga de lado a lado do D
    g.beginPath();
    g.moveTo(L - 1.5, brimY + 0.5);
    g.quadraticCurveTo(L - 2.2, top - 3.4, L + 4, top - 7);
    g.quadraticCurveTo(headCx + 1, top - 9.6, x + 7.5, top - 7);
    g.quadraticCurveTo(x + 13, top - 3.8, x + 12.2, brimY + 0.5);
    g.closePath(); g.fill();
    // aba larga (cruza a cabeça logo acima dos olhos)
    g.beginPath(); g.ellipse(headCx - 0.5, brimY + 0.5, 17, 3.8, 0, 0, TAU); g.fill();
    // fita assentada na base da copa (sobre a aba)
    g.fillStyle = "#caa050";
    g.beginPath();
    g.moveTo(L - 1.2, brimY - 3);
    g.quadraticCurveTo(headCx, brimY - 5.6, x + 11.9, brimY - 3);
    g.lineTo(x + 11.5, brimY - 0.4);
    g.quadraticCurveTo(headCx, brimY - 3, L - 0.8, brimY - 0.4);
    g.closePath(); g.fill();
    // vinco da copa
    g.strokeStyle = "rgba(50,38,20,0.5)"; g.lineWidth = 0.9;
    g.beginPath(); g.moveTo(headCx - 0.5, top - 9.2); g.quadraticCurveTo(headCx - 1.2, top - 4, headCx - 0.8, brimY - 5.8); g.stroke();
    // sombra da aba sobre o rosto (assentado)
    g.strokeStyle = "rgba(0,0,0,0.28)"; g.lineWidth = 1.4;
    g.beginPath(); g.ellipse(headCx - 0.5, brimY + 1.2, 15.8, 3.4, 0, 0.2, Math.PI - 0.2); g.stroke();
    // brilho
    g.fillStyle = "rgba(255,255,255,0.2)";
    g.beginPath(); g.ellipse(headCx - 4, top - 6, 3, 1.1, -0.4, 0, TAU); g.fill();
  } else if (look.head === "halo") {
    // AURÉOLA: anel dourado luminoso flutuando sobre a cabeça
    const hbob = reduce ? 0 : Math.sin(t * 0.003) * 1;
    g.save();
    glowCircle(g, headCx, top - 7 + hbob, 13, "#ffe9b0", 0.5);
    g.strokeStyle = "#ffd889"; g.lineWidth = 2.2; g.lineCap = "round";
    g.shadowColor = "#ffd24a"; g.shadowBlur = 8;
    g.beginPath(); g.ellipse(headCx, top - 7 + hbob, 9.5, 3, 0, 0, TAU); g.stroke();
    g.shadowBlur = 0;
    g.strokeStyle = "rgba(255,246,216,0.9)"; g.lineWidth = 0.9;
    g.beginPath(); g.ellipse(headCx, top - 7.8 + hbob, 9, 2.6, 0, Math.PI * 1.1, Math.PI * 1.9); g.stroke();
    g.restore();
  } else if (look.head === "turban") {
    // TURBANTE sacerdotal: faixas de pano enroladas cobrindo a cabeça
    const tb = top + 7;
    const tg = g.createLinearGradient(headCx, top - 8, headCx, tb);
    tg.addColorStop(0, "#f7f2e4"); tg.addColorStop(0.6, "#e4dbc4"); tg.addColorStop(1, "#c4b896");
    g.fillStyle = tg;
    g.beginPath();
    g.moveTo(L - 1.5, tb + 0.8);
    g.quadraticCurveTo(headCx, tb - 2, x + 12.2, tb + 0.8);
    g.quadraticCurveTo(x + 13, top - 3, x + 7, top - 6.6);
    g.quadraticCurveTo(headCx, top - 8.8, L + 3, top - 5.6);
    g.quadraticCurveTo(L - 2.4, top - 2.4, L - 1.5, tb + 0.8);
    g.closePath(); g.fill();
    // dobras do enrolado (faixas diagonais cruzadas)
    g.strokeStyle = "rgba(120,104,70,0.4)"; g.lineWidth = 1.1;
    g.beginPath(); g.moveTo(L - 0.5, tb - 1); g.quadraticCurveTo(headCx - 2, top - 3.4, x + 8.5, top - 5.4); g.stroke();
    g.beginPath(); g.moveTo(x + 11.5, tb - 1); g.quadraticCurveTo(headCx + 2, top - 3, L + 3.6, top - 4.6); g.stroke();
    g.beginPath(); g.moveTo(L + 0.5, top + 2.4); g.quadraticCurveTo(headCx, top - 0.6, x + 11, top + 2.2); g.stroke();
    // nó central com joia
    g.fillStyle = "#e4dbc4";
    g.beginPath(); g.ellipse(headCx, top - 6.2, 4, 2.6, 0, 0, TAU); g.fill();
    g.fillStyle = "#4a78c8";
    g.beginPath(); g.arc(headCx, top - 6.2, 1.4, 0, TAU); g.fill();
    g.fillStyle = "rgba(255,255,255,0.7)";
    g.beginPath(); g.arc(headCx - 0.5, top - 6.7, 0.5, 0, TAU); g.fill();
    // sombra de assentamento
    g.strokeStyle = "rgba(0,0,0,0.28)"; g.lineWidth = 1.4; g.lineCap = "round";
    g.beginPath(); g.moveTo(L - 0.4, tb + 1.4); g.quadraticCurveTo(headCx, tb - 0.9, x + 11.6, tb + 1.4); g.stroke();
  } else if (look.head === "thorns") {
    // COROA DE ESPINHOS: anel JUSTO rodeando a cabeça (não passa das bordas)
    const tccx = x - 1.5;                     // centro da cabeça nessa altura
    const tcy = top + 3.5;
    const trx = 11, trY = 3.6;
    g.save();
    g.lineCap = "round";
    // metade de TRÁS do anel (mais escura/fina — dá a volta)
    g.strokeStyle = "#4a3016"; g.lineWidth = 2.2;
    g.beginPath(); g.ellipse(tccx, tcy, trx - 0.6, trY, -0.06, Math.PI, TAU); g.stroke();
    // ramos trançados na FRENTE (cruzam a testa)
    for (const [c, w2, ph] of [["#77522c", 2.4, 0], ["#54371c", 1.7, 1.1], ["#8a6a3a", 1.1, 2.2]] as const) {
      g.strokeStyle = c; g.lineWidth = w2;
      g.beginPath();
      for (let i2 = 0; i2 <= 10; i2++) {
        const a = Math.PI * (i2 / 10);
        const px2 = tccx + Math.cos(a) * trx;
        const py2 = tcy + Math.sin(a) * trY + Math.sin(i2 * 2.3 + ph) * 0.9;
        if (i2 === 0) g.moveTo(px2, py2); else g.lineTo(px2, py2);
      }
      g.stroke();
    }
    // espinhos apontando pra fora, na volta toda
    g.strokeStyle = "#54371c"; g.lineWidth = 1;
    for (let i2 = 0; i2 < 12; i2++) {
      const a = (i2 / 12) * TAU + 0.26;
      const px2 = tccx + Math.cos(a) * trx;
      const py2 = tcy + Math.sin(a) * trY;
      g.beginPath(); g.moveTo(px2, py2); g.lineTo(px2 + Math.cos(a) * 2.2, py2 + Math.sin(a) * 1.6 - 1.3); g.stroke();
    }
    // sombra de assentamento na testa
    g.strokeStyle = "rgba(0,0,0,0.25)"; g.lineWidth = 1.2;
    g.beginPath(); g.ellipse(tccx, tcy + 1.4, trx - 1.6, trY - 0.9, 0, 0.3, Math.PI - 0.3); g.stroke();
    g.restore();
  } else if (look.head === "kefiah") {
    // KEFIÁ do deserto: pano branco quadriculado + agal (cordão preto duplo)
    const kb = top + 7;
    const kg2 = g.createLinearGradient(headCx, top - 7, headCx, kb + 14);
    kg2.addColorStop(0, "#fbf8f0"); kg2.addColorStop(1, "#d4ccb8");
    g.fillStyle = kg2;
    // capuz cobrindo a cabeça
    g.beginPath();
    g.moveTo(L - 1.5, kb + 0.8);
    g.quadraticCurveTo(headCx, kb - 2, x + 12.2, kb + 0.8);
    g.quadraticCurveTo(x + 13, top - 3.4, x + 6.5, top - 6.4);
    g.quadraticCurveTo(headCx, top - 8.2, L + 3, top - 5.4);
    g.quadraticCurveTo(L - 2.4, top - 2.4, L - 1.5, kb + 0.8);
    g.closePath(); g.fill();
    // caimento do pano no lado esquerdo (até o ombro)
    g.beginPath();
    g.moveTo(L - 1.5, kb - 3);
    g.quadraticCurveTo(L - 5.5, kb + 6, L - 4, kb + 16);
    g.quadraticCurveTo(L - 1, kb + 18, L + 1.5, kb + 15);
    g.quadraticCurveTo(L + 0.5, kb + 6, L - 0.2, kb + 0.5);
    g.closePath(); g.fill();
    // padrão quadriculado (borda do pano)
    g.strokeStyle = "rgba(176,72,60,0.55)"; g.lineWidth = 0.8;
    g.beginPath(); g.moveTo(L - 0.6, kb - 0.6); g.quadraticCurveTo(headCx, kb - 3.2, x + 11.6, kb - 0.6); g.stroke();
    g.beginPath(); g.moveTo(L - 4.2, kb + 14.4); g.quadraticCurveTo(L - 1.5, kb + 16.4, L + 1.2, kb + 13.6); g.stroke();
    g.strokeStyle = "rgba(60,56,68,0.4)"; g.lineWidth = 0.6;
    for (const dx of [-9, -3, 3, 9]) {
      g.beginPath(); g.moveTo(headCx + dx, top - 4 + Math.abs(dx) * 0.22); g.lineTo(headCx + dx + 1, kb - 1.4); g.stroke();
    }
    // agal: cordão preto duplo FINO, assentado sobre o pano (só o detalhe
    // da frente — não cobre o acessório)
    g.strokeStyle = "#26222c"; g.lineWidth = 1.5; g.lineCap = "round";
    g.beginPath(); g.moveTo(L - 0.6, top + 3.6); g.quadraticCurveTo(headCx, top + 0.4, x + 11.4, top + 3.6); g.stroke();
    g.beginPath(); g.moveTo(L - 0.4, top + 5.4); g.quadraticCurveTo(headCx, top + 2.2, x + 11.2, top + 5.4); g.stroke();
    g.strokeStyle = "rgba(90,86,100,0.55)"; g.lineWidth = 0.5;
    g.beginPath(); g.moveTo(L - 0.5, top + 4.5); g.quadraticCurveTo(headCx, top + 1.3, x + 11.3, top + 4.5); g.stroke();
    // sombra de assentamento
    g.strokeStyle = "rgba(0,0,0,0.28)"; g.lineWidth = 1.4; g.lineCap = "round";
    g.beginPath(); g.moveTo(L - 0.4, kb + 1.4); g.quadraticCurveTo(headCx, kb - 0.9, x + 11.6, kb + 1.4); g.stroke();
  } else if (look.head === "olive") {
    // GRINALDA de oliveira RODEANDO a cabeça: anel de folhas (as de trás
    // sobem por trás do topo, as da frente cruzam a testa) + azeitonas
    const ocy = top + 3.5;
    const orx = 14.4, ory = 4.4;
    g.save();
    g.lineCap = "round";
    // ramo (anel completo: metade de trás + metade da frente)
    g.strokeStyle = "#5c3f22"; g.lineWidth = 1.4;
    g.beginPath(); g.ellipse(headCx, ocy, orx - 0.5, ory, 0, Math.PI, TAU); g.stroke();
    g.strokeStyle = "#77522c"; g.lineWidth = 1.6;
    g.beginPath(); g.ellipse(headCx, ocy, orx, ory, 0, 0, Math.PI); g.stroke();
    // folhas ao longo de TODO o anel (as de trás menores e mais escuras)
    for (let i2 = 0; i2 < 14; i2++) {
      const a = (i2 / 14) * TAU + 0.2;
      const back = Math.sin(a) < 0;
      const px2 = headCx + Math.cos(a) * orx;
      const py2 = ocy + Math.sin(a) * ory;
      const lg2 = g.createLinearGradient(px2, py2 + 2, px2, py2 - 3);
      lg2.addColorStop(0, back ? "#3c6a34" : "#4e8a42");
      lg2.addColorStop(1, back ? "#5a8a4c" : "#79b565");
      g.fillStyle = lg2;
      g.save();
      g.translate(px2, py2);
      g.rotate(a + Math.PI / 2 + (i2 % 2 ? 0.5 : -0.5));
      g.beginPath(); g.ellipse(0, -2.2, back ? 1 : 1.3, back ? 2.2 : 3, 0, 0, TAU); g.fill();
      g.restore();
    }
    // azeitonas na frente
    g.fillStyle = "#3c4a2c";
    for (const [dx, dy2] of [[-9, 2.4], [0.5, 4.4], [9.5, 2.2]] as const) {
      g.beginPath(); g.arc(headCx + dx, ocy + dy2, 1.4, 0, TAU); g.fill();
      g.fillStyle = "rgba(255,255,255,0.35)";
      g.beginPath(); g.arc(headCx + dx - 0.4, ocy + dy2 - 0.4, 0.4, 0, TAU); g.fill();
      g.fillStyle = "#3c4a2c";
    }
    // sombra de assentamento
    g.strokeStyle = "rgba(0,0,0,0.22)"; g.lineWidth = 1.1;
    g.beginPath(); g.ellipse(headCx, ocy + 1.4, orx - 2, ory - 1, 0, 0.3, Math.PI - 0.3); g.stroke();
    g.restore();
  } else if (look.head === "fisher") {
    // CHAPÉU DE PESCADOR (bucket): copa macia + aba caída ao redor
    const fb = top + 6.5;
    const fg2 = g.createLinearGradient(headCx, top - 8, headCx, fb + 4);
    fg2.addColorStop(0, "#c8b48a"); fg2.addColorStop(1, "#8a7852");
    g.fillStyle = fg2;
    // copa cobrindo a cabeça
    g.beginPath();
    g.moveTo(L - 0.5, fb - 2);
    g.quadraticCurveTo(L - 1, top - 4.6, L + 5, top - 6.6);
    g.quadraticCurveTo(headCx + 2, top - 8.2, x + 8, top - 6);
    g.quadraticCurveTo(x + 12.5, top - 3.6, x + 11.5, fb - 2);
    g.closePath(); g.fill();
    // aba caída (desce ao redor, cobrindo até acima dos olhos)
    g.beginPath();
    g.moveTo(L - 4.5, fb - 2.6);
    g.quadraticCurveTo(headCx, fb - 5.4, x + 15.5, fb - 2.6);
    g.quadraticCurveTo(x + 15, fb + 2.6, x + 12, fb + 3.2);
    g.quadraticCurveTo(headCx, fb + 5.6, L - 1, fb + 3.2);
    g.quadraticCurveTo(L - 4.2, fb + 2.4, L - 4.5, fb - 2.6);
    g.closePath(); g.fill();
    // costuras da aba e da copa
    g.strokeStyle = "rgba(70,58,32,0.45)"; g.lineWidth = 0.7;
    g.beginPath(); g.moveTo(L - 3, fb + 0.6); g.quadraticCurveTo(headCx, fb + 3, x + 13.5, fb + 0.6); g.stroke();
    g.beginPath(); g.moveTo(L - 1, fb - 3.4); g.quadraticCurveTo(headCx, fb - 6, x + 12.5, fb - 3.4); g.stroke();
    g.beginPath(); g.moveTo(headCx - 0.5, top - 7.8); g.quadraticCurveTo(headCx - 1, top - 2, headCx - 0.8, fb - 4.4); g.stroke();
    // anzol enfeitando a lateral
    g.strokeStyle = "#d9d4c4"; g.lineWidth = 0.9; g.lineCap = "round";
    g.beginPath(); g.arc(x + 8.5, fb - 4.6, 2, Math.PI * 0.2, Math.PI * 1.25); g.stroke();
    // sombra da aba sobre o rosto
    g.strokeStyle = "rgba(0,0,0,0.28)"; g.lineWidth = 1.4;
    g.beginPath(); g.moveTo(L - 0.5, fb + 4.2); g.quadraticCurveTo(headCx, fb + 6.4, x + 11.5, fb + 4.2); g.stroke();
  }

  // ---- óculos: armação firme + PERNINHAS (hastes) até as laterais da cabeça ----
  if (look.glasses) {
    g.save();
    const frameC = "#1c2130";
    // vidro sutil das lentes
    g.fillStyle = "rgba(180,215,255,0.10)";
    for (const s of [-1, 1] as const) {
      g.beginPath(); g.ellipse(x + s * 5.5, eyeY, eyeRx + 1.6, eyeRy + 1.3, 0, 0, TAU); g.fill();
    }
    // hastes (perninhas) indo das lentes até as "orelhas" (bordas da cabeça)
    g.strokeStyle = frameC; g.lineWidth = 1.5; g.lineCap = "round";
    g.beginPath();
    g.moveTo(x - 11.3, eyeY - 1.2);
    g.quadraticCurveTo(L + 1, eyeY - 2.6, L - 0.8, eyeY - 2.2);
    g.quadraticCurveTo(L - 1.6, eyeY - 1.8, L - 1.2, eyeY + 1);   // ganchinho da orelha
    g.stroke();
    g.beginPath();
    g.moveTo(x + 12.3, eyeY - 1.2);
    g.quadraticCurveTo(x + 14.5, eyeY - 2.6, x + 15.6, eyeY - 2);
    g.quadraticCurveTo(x + 16.4, eyeY - 1.6, x + 15.8, eyeY + 1.2); // ganchinho
    g.stroke();
    // aros das lentes (mais grossos, com peso de armação)
    g.lineWidth = 1.7;
    for (const s of [-1, 1] as const) {
      g.beginPath(); g.ellipse(x + s * 5.5, eyeY, eyeRx + 1.6, eyeRy + 1.3, 0, 0, TAU); g.stroke();
    }
    // ponte no nariz
    g.lineWidth = 1.5;
    g.beginPath(); g.moveTo(x - 0.4, eyeY - 1.6); g.quadraticCurveTo(x + 0.5, eyeY - 3, x + 1.4, eyeY - 1.6); g.stroke();
    // brilho da armação + reflexo das lentes
    g.strokeStyle = "rgba(255,255,255,0.45)"; g.lineWidth = 0.7;
    g.beginPath(); g.ellipse(x - 5.5, eyeY - 0.4, eyeRx + 0.9, eyeRy + 0.6, 0, Math.PI * 1.15, Math.PI * 1.6); g.stroke();
    g.strokeStyle = "rgba(255,255,255,0.4)"; g.lineWidth = 0.9;
    g.beginPath(); g.moveTo(x - 8.6, eyeY - 3.2); g.lineTo(x - 5.6, eyeY + 2.6); g.stroke();
    g.beginPath(); g.moveTo(x + 2.6, eyeY - 3.2); g.lineTo(x + 5.6, eyeY + 2.6); g.stroke();
    g.restore();
  }

  // ============================================================
  // EQUIPAMENTO DE MÃO — escudo (esq), espada/arma (dir), proporcionais
  // ============================================================
  const armYq = top + H * 0.56;
  // "mãozinha" do herói que segura o equipamento (braço curto na cor do corpo)
  const drawGripHand = (hx3: number, hy3: number, r3 = 3) => {
    g.fillStyle = mixHex(pal.top, "#000000", 0.12);
    g.beginPath(); g.ellipse(hx3, hy3, r3 + 0.6, r3, 0, 0, TAU); g.fill();
    g.fillStyle = "rgba(255,255,255,0.12)";
    g.beginPath(); g.ellipse(hx3 - 0.8, hy3 - 0.8, r3 * 0.45, r3 * 0.3, -0.4, 0, TAU); g.fill();
  };
  if (look.shield) {
    // ESCUDO DA FÉ: GRANDE, redondo com aro duplo, rebites, umbo e chama
    const scx = L - 4, scy = armYq + 3;
    const R2 = 10.5;
    g.save();
    // bracinho segurando por trás da borda
    drawGripHand(scx + 8.5, scy - 1, 3.4);
    const sg = g.createRadialGradient(scx - 3, scy - 3, 1, scx, scy, R2);
    sg.addColorStop(0, "#9a6a3e"); sg.addColorStop(0.75, "#6d4526"); sg.addColorStop(1, "#54331a");
    g.fillStyle = sg;
    g.beginPath(); g.arc(scx, scy, R2, 0, TAU); g.fill();
    // aro externo + filete interno dourados
    g.strokeStyle = "#e8b04b"; g.lineWidth = 2;
    g.beginPath(); g.arc(scx, scy, R2 - 0.7, 0, TAU); g.stroke();
    g.strokeStyle = "rgba(255,216,137,0.5)"; g.lineWidth = 0.9;
    g.beginPath(); g.arc(scx, scy, R2 - 3.2, 0, TAU); g.stroke();
    // rebites do aro
    g.fillStyle = "#ffd889";
    for (let i2 = 0; i2 < 8; i2++) {
      const a = (i2 / 8) * TAU + 0.4;
      g.beginPath(); g.arc(scx + Math.cos(a) * (R2 - 1.9), scy + Math.sin(a) * (R2 - 1.9), 0.7, 0, TAU); g.fill();
    }
    // umbo central com emblema de chama
    g.fillStyle = "#e8b04b";
    g.beginPath(); g.arc(scx, scy, 4.8, 0, TAU); g.fill();
    g.fillStyle = "#8a5a1c";
    g.beginPath(); g.arc(scx, scy, 3.9, 0, TAU); g.fill();
    g.fillStyle = "#ffd889";
    g.beginPath();
    g.moveTo(scx, scy - 3);
    g.quadraticCurveTo(scx + 2.4, scy - 0.2, scx, scy + 2.6);
    g.quadraticCurveTo(scx - 2.4, scy - 0.2, scx, scy - 3);
    g.fill();
    // brilho superior
    g.fillStyle = "rgba(255,255,255,0.22)";
    g.beginPath(); g.ellipse(scx - 3.4, scy - 4.6, 3.8, 1.5, -0.55, 0, TAU); g.fill();
    g.restore();
  }
  if (look.sword) {
    // ESPADA DO ESPÍRITO: maior, RETA, apontando pra FORA (longe do boneco),
    // com a mãozinha segurando o punho
    const swx = Rmax + 2.5, swy = armYq + 2;
    g.save();
    g.translate(swx, swy); g.rotate(0.3 + (o.walking && !reduce ? step * 0.06 : 0));
    const blade = g.createLinearGradient(-1.7, 0, 1.7, 0);
    blade.addColorStop(0, "#9aa6b8"); blade.addColorStop(0.5, "#eef3fa"); blade.addColorStop(1, "#9aa6b8");
    g.fillStyle = blade;
    g.beginPath();
    g.moveTo(-1.7, -0.5); g.lineTo(-1.2, -17.5); g.lineTo(0, -20.5); g.lineTo(1.2, -17.5); g.lineTo(1.7, -0.5);
    g.closePath(); g.fill();
    // fio de luz + sulco central
    g.strokeStyle = "rgba(255,255,255,0.75)"; g.lineWidth = 0.6;
    g.beginPath(); g.moveTo(0, -1.5); g.lineTo(0, -18.6); g.stroke();
    glowCircle(g, 0, -19, 5, "#cfe0ff", 0.35);
    // guarda + punho + pomo
    g.fillStyle = "#e8b04b"; rr(g, -4.2, -0.8, 8.4, 2, 1); g.fill();
    g.fillStyle = "#5d3a20"; rr(g, -1.1, 1.2, 2.2, 5, 1.1); g.fill();
    g.fillStyle = "#ffd889"; g.beginPath(); g.arc(0, 7.2, 1.4, 0, TAU); g.fill();
    // mãozinha segurando o punho
    drawGripHand(-0.5, 3.4, 3);
    g.restore();
  }
  if (look.weapon && look.weapon !== "none" && !look.sword) {
    // arma da loja na mão direita: MAIOR e SEGURADA de verdade
    const wx = Rmax + 2, wy = armYq + 3;
    g.save();
    g.translate(wx, wy);
    g.scale(1.35, 1.35);
    if (look.weapon === "staff") {
      g.strokeStyle = "#8a6a44"; g.lineWidth = 2.2; g.lineCap = "round";
      g.beginPath(); g.moveTo(0, 8); g.lineTo(0, -14); g.quadraticCurveTo(0.4, -18.4, 4.2, -17.6); g.stroke();
      g.strokeStyle = "rgba(255,235,200,0.35)"; g.lineWidth = 0.7;
      g.beginPath(); g.moveTo(-0.5, 6); g.lineTo(-0.5, -13); g.stroke();
    } else if (look.weapon === "torch") {
      g.strokeStyle = "#6d5334"; g.lineWidth = 2.2; g.lineCap = "round";
      g.beginPath(); g.moveTo(0, 7); g.lineTo(0, -9); g.stroke();
      // braçadeira de metal
      g.fillStyle = "#caa050"; rr(g, -1.7, -9.5, 3.4, 2.2, 0.8); g.fill();
      glowCircle(g, 0, -13, 9, "#ffb14a", 0.6);
      const tf = g.createLinearGradient(0, -18, 0, -8);
      tf.addColorStop(0, "#ffe9b0"); tf.addColorStop(1, "#e8622e");
      g.fillStyle = tf;
      g.beginPath();
      g.moveTo(0, -17.5 - (reduce ? 0 : Math.sin(t * 0.012) * 1.6));
      g.quadraticCurveTo(3.4, -11, 0, -7.8);
      g.quadraticCurveTo(-3.4, -11, 0, -17.5 - (reduce ? 0 : Math.sin(t * 0.012) * 1.6));
      g.fill();
    } else if (look.weapon === "shofar") {
      // SHOFAR grande: chifre de carneiro curvo com BOCA LARGA de trombeta
      const shg = g.createLinearGradient(-2, 2, 13, -14);
      shg.addColorStop(0, "#e8d9b0"); shg.addColorStop(0.5, "#bfa06a"); shg.addColorStop(1, "#7c6440");
      g.fillStyle = shg;
      g.beginPath();
      g.moveTo(-1.2, 1.8);                                    // bocal (na mão)
      g.quadraticCurveTo(6, 1.6, 9.5, -4);                    // curva externa
      g.quadraticCurveTo(12.4, -9, 13.2, -13.8);              // sobe pra boca
      g.lineTo(8.8, -12.6);                                   // boca larga (flare)
      g.quadraticCurveTo(8, -8, 5.6, -4.6);
      g.quadraticCurveTo(3, -1, -1.2, -0.6);                  // curva interna
      g.closePath(); g.fill();
      // abertura da boca
      g.fillStyle = "#5c4a2c";
      g.beginPath(); g.ellipse(11, -13.4, 2.5, 1.1, -0.5, 0, TAU); g.fill();
      g.fillStyle = "#3a2e1a";
      g.beginPath(); g.ellipse(11.1, -13.5, 1.6, 0.65, -0.5, 0, TAU); g.fill();
      // anéis de textura do chifre
      g.strokeStyle = "rgba(90,72,40,0.5)"; g.lineWidth = 0.7;
      for (const [tx, ty2, ta] of [[2.5, 0.4, -0.3], [5.8, -2.6, -0.6], [8.4, -6.8, -0.9]] as const) {
        g.beginPath(); g.ellipse(tx, ty2, 1.6, 2.4, ta, Math.PI * 0.9, Math.PI * 1.9); g.stroke();
      }
      // brilho ao longo do chifre
      g.strokeStyle = "rgba(255,244,214,0.5)"; g.lineWidth = 0.8; g.lineCap = "round";
      g.beginPath(); g.moveTo(0.5, 0.2); g.quadraticCurveTo(6, -1.6, 10, -8.5); g.stroke();
    } else if (look.weapon === "spear") {
      g.strokeStyle = "#8a6a44"; g.lineWidth = 1.9; g.lineCap = "round";
      g.beginPath(); g.moveTo(0, 9); g.lineTo(0, -16); g.stroke();
      g.fillStyle = "#c7d0dc";
      g.beginPath(); g.moveTo(0, -21.5); g.lineTo(2.5, -15.4); g.lineTo(-2.5, -15.4); g.closePath(); g.fill();
      g.strokeStyle = "rgba(255,255,255,0.6)"; g.lineWidth = 0.5;
      g.beginPath(); g.moveTo(0, -20.4); g.lineTo(0, -15.8); g.stroke();
      // amarração da ponta
      g.strokeStyle = "#54371c"; g.lineWidth = 0.8;
      g.beginPath(); g.moveTo(-1.2, -14.8); g.lineTo(1.2, -13.8); g.stroke();
      g.beginPath(); g.moveTo(-1.2, -13.6); g.lineTo(1.2, -12.6); g.stroke();
    } else if (look.weapon === "sling") {
      g.strokeStyle = "#8a6a44"; g.lineWidth = 1.4; g.lineCap = "round";
      g.beginPath(); g.moveTo(0, 4); g.quadraticCurveTo(-3.6, -2.4, -1.2, -8.4); g.stroke();
      g.beginPath(); g.moveTo(0, 4); g.quadraticCurveTo(4, -1.2, 2.8, -7.6); g.stroke();
      // bolsa com a pedra
      g.fillStyle = "#8d8474";
      g.beginPath(); g.ellipse(0.8, -8.8, 2.8, 2, 0.3, 0, TAU); g.fill();
      g.fillStyle = "rgba(255,255,255,0.25)";
      g.beginPath(); g.ellipse(0.2, -9.4, 1, 0.6, 0.3, 0, TAU); g.fill();
    } else if (look.weapon === "harp") {
      g.strokeStyle = "#caa050"; g.lineWidth = 2; g.lineCap = "round";
      g.beginPath(); g.moveTo(-2.4, 5); g.quadraticCurveTo(-6, -4.6, -1.2, -10.4); g.stroke();
      g.beginPath(); g.moveTo(3, 3.6); g.quadraticCurveTo(6.2, -4, 2.4, -9.6); g.stroke();
      g.beginPath(); g.moveTo(-2.4, 5); g.quadraticCurveTo(0.4, 6.4, 3, 3.6); g.stroke();
      g.strokeStyle = "rgba(255,240,200,0.85)"; g.lineWidth = 0.5;
      for (let i2 = 0; i2 < 5; i2++) {
        g.beginPath(); g.moveTo(-2.6 + i2 * 1.4, 3.2 - i2 * 0.5); g.lineTo(-1.2 + i2 * 1, -9.4 + i2 * 0.4); g.stroke();
      }
    }
    // mãozinha do herói segurando o cabo
    drawGripHand(0, 2.2, 2.4);
    g.restore();
  }

  // ---- montaria (camada da FRENTE — parede da carruagem cobre as pernas) ----
  if (lift > 0 && look.mount) drawMountHD(g, x, fy, look.mount, t, !!o.walking, reduce, "front");

  g.restore();
}

// ============================================================================
// MASCOTES COMPANHEIROS HD (loja) — ficam ao lado do herói
// ============================================================================

export function drawPetHD(g: G, x: number, fy: number, pet: string, t: number, reduce = false): void {
  if (!pet || pet === "none") return;
  const bob = reduce ? 0 : Math.sin(t * 0.004) * 1.6;
  if (pet === "dove") {
    // pomba branca pairando com raminho de oliveira
    const y = fy - 26 + bob;
    softShadow(g, x, fy, 7, 0.18);
    const flap = reduce ? 0 : Math.sin(t * 0.02) * 3;
    g.fillStyle = "#d4ddef";
    g.beginPath(); g.ellipse(x - 1, y - 3 - flap * 0.5, 6.5, 2.6, -0.7, 0, TAU); g.fill();
    const bd = g.createLinearGradient(x, y - 5, x, y + 4);
    bd.addColorStop(0, "#ffffff"); bd.addColorStop(1, "#cfd8ea");
    g.fillStyle = bd;
    g.beginPath(); g.ellipse(x, y, 5.6, 3.8, 0.15, 0, TAU); g.fill();
    g.beginPath(); g.moveTo(x - 5, y + 0.5); g.lineTo(x - 9.5, y - 1.5); g.lineTo(x - 8.5, y + 2.4); g.closePath(); g.fill();
    g.beginPath(); g.arc(x + 4.6, y - 2.6, 2.6, 0, TAU); g.fill();
    g.fillStyle = "#e8a53c";
    g.beginPath(); g.moveTo(x + 7, y - 3); g.lineTo(x + 9, y - 2.4); g.lineTo(x + 7, y - 1.8); g.closePath(); g.fill();
    g.fillStyle = "#14161e";
    g.beginPath(); g.arc(x + 5.2, y - 3, 0.6, 0, TAU); g.fill();
    g.fillStyle = "#f2f6ff";
    g.beginPath(); g.ellipse(x - 0.5, y - 2 - flap, 5.8, 2.4, -0.5 - flap * 0.06, 0, TAU); g.fill();
    // raminho de oliveira no bico
    g.strokeStyle = "#4e8a42"; g.lineWidth = 0.8;
    g.beginPath(); g.moveTo(x + 8, y - 1.6); g.quadraticCurveTo(x + 10, y + 0.5, x + 12, y + 0.2); g.stroke();
    g.fillStyle = "#6fae57";
    g.beginPath(); g.ellipse(x + 10.4, y - 0.4, 1.3, 0.6, 0.5, 0, TAU); g.fill();
    g.beginPath(); g.ellipse(x + 11.8, y + 0.6, 1.3, 0.6, 0.2, 0, TAU); g.fill();
  } else if (pet === "angel") {
    // anjinho companheiro
    const y = fy - 14 + bob;
    softShadow(g, x, fy, 8, 0.2);
    const flap2 = reduce ? 0 : Math.sin(t * 0.008) * 2;
    drawFeatherWing(g, x - 4, y - 2, -1, 10, flap2, "#eef3ff");
    drawFeatherWing(g, x + 4, y - 2, 1, 10, flap2, "#eef3ff");
    const rb = g.createLinearGradient(x, y - 6, x, y + 8);
    rb.addColorStop(0, "#ffffff"); rb.addColorStop(1, "#c2cce4");
    g.fillStyle = rb;
    g.beginPath();
    g.moveTo(x - 2.6, y - 5);
    g.quadraticCurveTo(x - 6, y + 6, x - 4.6, y + 7.5);
    g.lineTo(x + 4.6, y + 7.5);
    g.quadraticCurveTo(x + 6, y + 6, x + 2.6, y - 5);
    g.closePath(); g.fill();
    g.fillStyle = "#e7b98a";
    g.beginPath(); g.arc(x, y - 8, 4.4, 0, TAU); g.fill();
    g.fillStyle = "#ffe9a8";
    g.beginPath(); g.arc(x, y - 9.4, 4.2, Math.PI * 0.95, Math.PI * 2.05); g.fill();
    g.fillStyle = "#14161e";
    g.beginPath(); g.arc(x - 1.6, y - 8, 0.6, 0, TAU); g.fill();
    g.beginPath(); g.arc(x + 1.6, y - 8, 0.6, 0, TAU); g.fill();
    g.strokeStyle = "#a86a4a"; g.lineWidth = 0.7;
    g.beginPath(); g.arc(x, y - 6.8, 1.4, 0.3, Math.PI - 0.3); g.stroke();
    // auréola
    g.save();
    g.strokeStyle = "#ffd889"; g.lineWidth = 1.1;
    g.shadowColor = "#ffd889"; g.shadowBlur = 4;
    g.beginPath(); g.ellipse(x, y - 13.6, 3.6, 1.2, 0, 0, TAU); g.stroke();
    g.restore();
  } else if (pet === "flame") {
    // chama azul companheira (irmãzinha do fogo do herói)
    const y = fy - 8 + bob;
    softShadow(g, x, fy, 7, 0.18);
    const fh = reduce ? 0 : Math.sin(t * 0.012) * 1.6;
    glowCircle(g, x, y - 3, 10, "#3f8cff", 0.5);
    const fl = g.createLinearGradient(x, y - 12 - fh, x, y + 4);
    fl.addColorStop(0, "#7cc0ff"); fl.addColorStop(0.55, "#2f7ae8"); fl.addColorStop(1, "#1c46a8");
    g.fillStyle = fl;
    g.beginPath();
    g.moveTo(x, y - 11.5 - fh);
    g.bezierCurveTo(x + 5.4, y - 5.5, x + 5.6, y + 0.5, x, y + 3.6);
    g.bezierCurveTo(x - 5.6, y + 0.5, x - 5.4, y - 5.5, x, y - 11.5 - fh);
    g.fill();
    g.fillStyle = "#bfe0ff";
    g.beginPath();
    g.moveTo(x, y - 6.4 - fh * 0.5);
    g.quadraticCurveTo(x + 2.6, y - 1, x, y + 2);
    g.quadraticCurveTo(x - 2.6, y - 1, x, y - 6.4 - fh * 0.5);
    g.fill();
    // olhinhos felizes
    g.fillStyle = "#14161e";
    g.beginPath(); g.arc(x - 1.7, y - 2.4, 0.8, 0, TAU); g.fill();
    g.beginPath(); g.arc(x + 1.7, y - 2.4, 0.8, 0, TAU); g.fill();
  } else if (pet === "lamb") {
    // cordeirinho fofo
    softShadow(g, x, fy, 9, 0.22);
    const y = fy;
    g.fillStyle = "#8a8296";
    for (const dx of [-4.5, -1.5, 2, 5]) { rr(g, x + dx, y - 4, 1.8, 4, 0.9); g.fill(); }
    const wl = g.createRadialGradient(x - 2, y - 9, 1, x, y - 8, 9);
    wl.addColorStop(0, "#ffffff"); wl.addColorStop(1, "#d8dce8");
    g.fillStyle = wl;
    for (const [dx, dy2, r] of [[-4, -7, 4], [0, -9, 4.6], [4.5, -7, 4], [0, -6, 4.4]] as const) {
      g.beginPath(); g.arc(x + dx, y + dy2, r, 0, TAU); g.fill();
    }
    g.fillStyle = "#3c3844";
    g.beginPath(); g.ellipse(x + 7.5, y - 10, 3.4, 3, 0.2, 0, TAU); g.fill();
    g.fillStyle = "#ffffff";
    g.beginPath(); g.arc(x + 6.6, y - 12.6, 2, 0, TAU); g.fill();
    g.fillStyle = "#3c3844";
    g.beginPath(); g.ellipse(x + 4.8, y - 11.4, 1.8, 0.9, -0.5, 0, TAU); g.fill();
    g.fillStyle = "#ffffff";
    g.beginPath(); g.arc(x + 8.2, y - 10.4, 1.1, 0, TAU); g.fill();
    g.fillStyle = "#14161e";
    g.beginPath(); g.arc(x + 8.4, y - 10.3, 0.6, 0, TAU); g.fill();
  } else if (pet === "lion") {
    // leãozinho de Judá
    softShadow(g, x, fy, 9, 0.22);
    const y = fy;
    g.strokeStyle = "#c8913c"; g.lineWidth = 1.4; g.lineCap = "round";
    g.beginPath(); g.moveTo(x - 7, y - 6); g.quadraticCurveTo(x - 11, y - 9, x - 10, y - 12); g.stroke();
    g.fillStyle = "#8a5a20";
    g.beginPath(); g.arc(x - 10, y - 12.6, 1.3, 0, TAU); g.fill();
    g.fillStyle = "#c8913c";
    for (const dx of [-5, -2, 2.4, 5.2]) { rr(g, x + dx, y - 4.4, 2, 4.4, 1); g.fill(); }
    const lb = g.createLinearGradient(x, y - 11, x, y - 3);
    lb.addColorStop(0, "#e0aa4e"); lb.addColorStop(1, "#b07c2b");
    g.fillStyle = lb;
    g.beginPath(); g.ellipse(x - 0.5, y - 7.5, 7, 4.4, 0, 0, TAU); g.fill();
    g.fillStyle = "#8a5a20";
    g.beginPath(); g.arc(x + 6, y - 10.5, 4.6, 0, TAU); g.fill();
    g.fillStyle = "#e0aa4e";
    g.beginPath(); g.arc(x + 6, y - 10.5, 3.2, 0, TAU); g.fill();
    g.fillStyle = "#c8913c";
    g.beginPath(); g.arc(x + 4.2, y - 13.2, 1.1, 0, TAU); g.fill();
    g.beginPath(); g.arc(x + 7.8, y - 13.2, 1.1, 0, TAU); g.fill();
    g.fillStyle = "#14161e";
    g.beginPath(); g.arc(x + 5, y - 11, 0.6, 0, TAU); g.fill();
    g.beginPath(); g.arc(x + 7.4, y - 11, 0.6, 0, TAU); g.fill();
    g.fillStyle = "#7a4626";
    g.beginPath(); g.ellipse(x + 6.2, y - 9.4, 1.2, 0.9, 0, 0, TAU); g.fill();
  }
}
