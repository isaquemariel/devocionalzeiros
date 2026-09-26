// ============================================================================
// O HERÓI DO RPG — o Devocionalzeiro com o guarda-roupa, em canvas.
// Separado do palco (`rpgStageHD`) para que as telas que só mostram o herói
// (a landing, o início do RPG, o guarda-roupa) não carreguem o palco inteiro.
// ============================================================================

import type { MascotLook, MascotColor, MascotMood } from "@/lib/rpgMascot";
import {
  PALETAS, calcularQuadro, desenharBraco, desenharChama, desenharCorpo, desenharEmblema, desenharPes, desenharRosto,
  mao, noChao, noCorpo, silhueta, type Quadro,
} from "@/lib/devocionalzeiro/canvas";
import { BASE_CHAMA as BASE_CHAMA_RIG, CHAO as CHAO_RIG } from "@/lib/devocionalzeiro/geometria";
import { TAU, glowCircle, mixHex, rr, softShadow } from "@/lib/rpgDesenho";

type G = CanvasRenderingContext2D;

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
export function drawMountHD(g: G, x: number, fy: number, kind: string, t: number, walking: boolean, reduce: boolean, layer: "back" | "front" = "back"): void {
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
    ? { c0: "#d4b478", c1: "#a5854b", bodyW: 26, bodyH: 11, neckH: 13, headL: 7, ear: 1.6, hump: true, tailTuft: false, neckW: 4.4, neckFwd: 4.5, headR: 3 }
    : kind === "donkey"
      ? { c0: "#9a9088", c1: "#6d645c", bodyW: 22, bodyH: 10, neckH: 8.5, headL: 6.4, ear: 3.6, hump: false, tailTuft: true, neckW: 4.8, neckFwd: 5.4, headR: 3.1 }
      // CAVALO: pescoco grosso e inclinado para a frente, cabeca maior e mais
      // baixa. Sem isso ele sai com o pescoco vertical e fino do camelideo.
      : { c0: "#a5713e", c1: "#6d4522", bodyW: 25, bodyH: 11, neckH: 9.5, headL: 8, ear: 2, hump: false, tailTuft: true, neckW: 6, neckFwd: 7.5, headR: 3.4 }; // horse
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
  g.strokeStyle = cfg.c0; g.lineWidth = cfg.neckW; g.lineCap = "round";
  g.beginPath(); g.moveTo(nx, bodyY + 2);
  g.quadraticCurveTo(nx + cfg.neckFwd * 0.55, bodyY - cfg.neckH * 0.62, nx + cfg.neckFwd, bodyY - cfg.neckH); g.stroke();
  const hx2 = nx + cfg.neckFwd, hy2 = bodyY - cfg.neckH;
  g.fillStyle = cfg.c0;
  g.beginPath(); g.ellipse(hx2 + cfg.headL / 2, hy2 + 0.4, cfg.headL / 2 + 1, cfg.headR, 0.2, 0, TAU); g.fill();
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
    g.strokeStyle = "#4a2f16"; g.lineWidth = 2.4;
    g.beginPath(); g.moveTo(nx - 0.5, bodyY + 1);
    g.quadraticCurveTo(nx + cfg.neckFwd * 0.35, bodyY - cfg.neckH * 0.7, nx + cfg.neckFwd - 0.6, hy2 - 1.2); g.stroke();
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
export interface HDHeroOpts {
  t: number; reduce?: boolean; walking?: boolean; face?: 1 | -1;
  /** o humor da tela (a vitória, o erro no quiz) — vira a cara e o gesto dele */
  mood?: MascotMood;
  /** a vitória: ele pula com os braços para o alto e a chama sobe */
  comemorando?: boolean;
  /**
   * Um quadro já calculado (a pose do simulador do rig): o boneco vestido do
   * app passa o seu, e o herói se mexe exatamente como o rig em SVG.
   */
  quadro?: Quadro;
  /** 0..1 — a chama apagando (quando algo pousa na cabeça dele no app) */
  chamaAcesa?: number;
}

/** a chama da cabeça só aparece sem acessório de cabeça (ou com o próprio "foguinho") */
export const temChama = (head?: string) => !head || head === "none" || head === "fire";

/** altura do herói na cena, do chão ao topo da cabeça (sem a chama) */
export const HERO_ALTURA = 53;
/** escala dos itens: 1 unidade do desenho antigo do herói = 2,8 unidades do rig */
const K_ITEM = 2.8;

/**
 * O HERÓI DO RPG — o Devocionalzeiro, o MESMO boneco do resto do app.
 *
 * O corpo, o rosto, os braços, os pés e a chama da cabeça são o rig do app
 * (`lib/devocionalzeiro`), desenhado em canvas a partir da mesma geometria do
 * SVG. Antes o RPG tinha um herói próprio, mais alto e estreito, sem a chama
 * na cabeça — e o app mostrava dois personagens.
 *
 * O GUARDA-ROUPA foi reencaixado nesse corpo, peça por peça. A arte de cada
 * item foi preservada; o que mudou foi ONDE ela assenta:
 * - na cabeça, cada chapéu é escalado e posto sobre a curva da cabeça nova —
 *   e a chama SOME: é regra do personagem, o acessório de cabeça toma o lugar
 *   dela (só o "foguinho", que é a própria chama maior, a mantém);
 * - o traje é recortado pela silhueta do corpo novo, da boca para baixo;
 * - escudo, espada e armas ficam NA MÃO, na ponta do braço — o braço se ajeita
 *   para segurar, e a mão é redesenhada por cima do cabo;
 * - asas e aura ficam atrás, na escala da cena; asas acompanham o pulo dele.
 */
export function drawHeroHD(g: G, x: number, fy: number, look: Partial<MascotLook>, o: HDHeroOpts): void {
  const t = o.t;
  const reduce = !!o.reduce;
  const face = o.face ?? 1;
  const pal = HERO_PAL[(look.color as MascotColor) ?? "blue"] ?? HERO_PAL.blue;
  const step = o.walking && !reduce ? Math.sin(t * 0.014) : 0;

  // montaria: levanta o herói (carruagem/cavalo/camelo/jumento)
  const lift = heroMountLift(look.mount);
  const fyB = fy - lift;
  const rides = lift > 0 && look.mount !== "chariot";
  // montado, ele SENTA na sela: o corpo desce até ela, sem os pés
  const chao = rides ? fyB + 7 : fyB;

  // âncoras na escala da cena (para aura e asas)
  const W = 34;
  const top = chao - HERO_ALTURA;

  softShadow(g, x, fy, lift > 0 ? 22 : 16, 0.34);

  g.save();
  if (face === -1) { g.translate(x, 0); g.scale(-1, 1); g.translate(-x, 0); }

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


  // ---- o boneco ----
  const segura = !!look.sword || (!!look.weapon && look.weapon !== "none");
  const feliz = o.mood === "happy", triste = o.mood === "sad";
  // parado e feliz, de vez em quando ele acena (se a mão estiver livre)
  const acena = feliz && !o.walking && !segura && !reduce && t % 7000 < 1300;
  const paleta = PALETAS[(look.color as string) ?? "blue"] ?? PALETAS.blue;
  // Um quadro pronto (o boneco vestido do app, que tem as molas e a fala do
  // rig) ou o quadro simples do RPG, calculado aqui.
  const q: Quadro = o.quadro ? { ...o.quadro, paleta, chama: Math.min(1, o.quadro.chama + (look.head === "fire" ? 0.35 : 0)) } : calcularQuadro({
    t, reduce, andando: !!o.walking && !rides,
    expressao: o.comemorando ? "radiante" : triste ? "triste" : feliz ? "feliz" : o.walking ? "feliz" : "neutro",
    gesto: o.comemorando && !segura ? "comemorar" : o.comemorando ? "vitoria" : acena ? "acenar" : "parado",
    // o "foguinho" do guarda-roupa agora é a PRÓPRIA chama crescendo
    chama: (look.head === "fire" ? 0.78 : 0.34) + (o.comemorando ? 0.3 : 0),
    olharX: 0.25,
    paleta,
  });
  // os braços se ajeitam para segurar o que ele carrega — menos quando as
  // mãos estão ocupadas com outra coisa (tapar os olhos, acenar)
  const balanco = step * 6;
  const festa = !!o.comemorando || q.gesto === "comemorar" || q.gesto === "pirueta" || q.gesto === "vitoria";
  const maosOcupadas = q.gesto === "tampar" || q.gesto === "espiar";
  if (segura && !maosOcupadas && q.gesto !== "acenar") {
    // na festa, ele ergue o que carrega
    q.bracoD = festa && !reduce ? { ang: -150 + Math.sin(t * 0.006) * 14, len: 32 } : { ang: -40 + balanco, len: 31 };
  }
  if (look.shield && !maosOcupadas && !festa) q.bracoE = { ang: 30 - balanco, len: 28 };

  g.save();
  // montado num animal ele fica um pouco menor, para caber na sela
  const k = noChao(g, x, chao, HERO_ALTURA * (rides ? 0.86 : 1));
  // cena → rig → corpo → cena: as asas acompanham o pulo e a inclinação dele
  const naCenaComOCorpo = () => { noCorpo(g, q); g.translate(CHAO_RIG.x, CHAO_RIG.y); g.scale(1 / k, 1 / k); g.translate(-x, -chao); };
  /** do desenho antigo do herói (centro 0, topo 0) para o rig */
  const itens = (ax: number, ay: number, bx = 0, by = 0, kx = K_ITEM, ky = K_ITEM) => { g.translate(ax, ay); g.scale(kx, ky); g.translate(-bx, -by); };

  if (look.wings && look.wings !== "none") {
    g.save(); naCenaComOCorpo();
  // ---- asas (atrás) — GRANDES, cada tipo com identidade própria ----
  {
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

    g.restore();
  }

  if (!rides) desenharPes(g, q);
  else {
    // a perninha do lado de cá, caída na lateral da sela
    g.fillStyle = q.paleta.pe;
    g.beginPath(); g.ellipse(118, 180, 9, 12, 0.15, 0, TAU); g.fill();
  }

  g.save();
  noCorpo(g, q);
  // REGRA: com qualquer acessório na cabeça, a chama SOME — o chapéu, a coroa,
  // o capacete ou a auréola tomam o lugar dela. Só o "foguinho" (que é a
  // própria chama, maior) a mantém.
  const acesa = o.chamaAcesa ?? 1;
  if (temChama(look.head) && acesa > 0.01) {
    g.save();
    g.globalAlpha *= acesa;
    if (acesa < 1) { g.translate(BASE_CHAMA_RIG.x, BASE_CHAMA_RIG.y); g.scale(0.4 + 0.6 * acesa, 0.4 + 0.6 * acesa); g.translate(-BASE_CHAMA_RIG.x, -BASE_CHAMA_RIG.y); }
    if (look.head === "fire") glowCircle(g, BASE_CHAMA_RIG.x, 40, 46, "#3f8cff", 0.35);
    desenharChama(g, q);
    g.restore();
  }
  desenharCorpo(g, q);

  // ---- as variáveis do desenho antigo do herói (centro 0, topo 0), que é
  //      onde a arte de cada item foi desenhada ----
  {
    const x = 0, top = 0, H = 48, W = 30, L = -15, Rmax = 19;
    void W;
    if (look.robe && look.robe !== "none") {
      g.save();
      g.clip(silhueta());
      // da boca (y 124 no rig) até a base; largura da lombada (56) ao bojo (160)
      itens(56, 124, L - 2, top + 30, 104 / 39, 53 / 18);
  {
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
  }
      g.restore();
    } else desenharEmblema(g, q);

    desenharRosto(g, q);

    if (look.beard) {
      g.save();
      itens(112, 116, 0.5, 27.5, 3);
  // ---- barba de ancião (loja) — queixinho fofo ----
  {
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

      g.restore();
    }

    if (look.glasses) desenharOculos(g);

    g.save();
    // o chapéu assenta na curva da cabeça nova: centro 99, topo 63
    // o chapéu de aventureiro tem aba larga: sobe um pouco para não cobrir os olhos
    itens(99 + 1.9 * K_ITEM, 63 - (look.head === "hat" ? 6 : 0));
  // ============================================================
  // ACESSÓRIOS DE CABEÇA — proporcionais e assentados NO topo do D
  // (o topo vai de L+7 a ~x+7; centro visual da "cabeça" = x)
  // ============================================================
  const headCx = x + 0.5;
  if (look.head === "crown") {
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
    glowCircle(g, headCx, top - 14 + hbob, 13, "#ffe9b0", 0.5);
    g.strokeStyle = "#ffd889"; g.lineWidth = 2.2; g.lineCap = "round";
    g.shadowColor = "#ffd24a"; g.shadowBlur = 8;
    g.beginPath(); g.ellipse(headCx, top - 14 + hbob, 9.5, 3, 0, 0, TAU); g.stroke();
    g.shadowBlur = 0;
    g.strokeStyle = "rgba(255,246,216,0.9)"; g.lineWidth = 0.9;
    g.beginPath(); g.ellipse(headCx, top - 14.8 + hbob, 9, 2.6, 0, Math.PI * 1.1, Math.PI * 1.9); g.stroke();
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

    g.restore();

    // ---- as mãos: cada item é desenhado com a mão na origem ----
    const drawGripHand = (hx3: number, hy3: number, _r?: number) => {
      g.fillStyle = q.paleta.braco; g.strokeStyle = q.paleta.contorno; g.lineWidth = 1.6 / K_ITEM;
      g.beginPath(); g.arc(hx3, hy3, 10.5 / K_ITEM, 0, TAU); g.fill(); g.stroke();
    };
    desenharBraco(g, q, "e");
    if (look.shield) {
      const m = mao(q, "e");
      g.save(); itens(m.x, m.y);
  if (look.shield) {
    // ESCUDO DA FÉ: GRANDE, redondo com aro duplo, rebites, umbo e chama
    const scx = -8.5, scy = 1; // a mão (0, 0) segura a borda
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
      g.restore();
    }
    desenharBraco(g, q, "d");
    if (segura) {
      const m = mao(q, "d");
      g.save(); itens(m.x, m.y);
  if (look.sword) {
    // ESPADA DO ESPÍRITO: maior, RETA, apontando pra FORA (longe do boneco),
    // com a mãozinha segurando o punho
    const swx = 1.5, swy = -3.1; // o punho cai no centro da mão (0, 0)
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
    const wx = 0, wy = -3; // o cabo cai no centro da mão (0, 0)
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

      g.restore();
    }
  }
  g.restore(); // corpo
  g.restore(); // rig

  // ---- montaria (camada da FRENTE — parede da carruagem cobre as pernas) ----
  if (lift > 0 && look.mount) drawMountHD(g, x, fy, look.mount, t, !!o.walking, reduce, "front");

  g.restore();
}

/** óculos: aros sobre os olhos grandes do rig, hastes até a lombada e o bojo */
function desenharOculos(g: G): void {
  g.save();
  const cor = "#1c2130";
  const lentes = [{ x: 94, y: 97 }, { x: 129, y: 97 }];
  g.fillStyle = "rgba(180,215,255,0.12)";
  for (const l of lentes) { g.beginPath(); g.ellipse(l.x, l.y, 15.4, 16.2, 0, 0, TAU); g.fill(); }
  g.strokeStyle = cor; g.lineCap = "round"; g.lineWidth = 3.4;
  g.beginPath(); g.moveTo(78.8, 93); g.quadraticCurveTo(66, 89, 59, 91); g.stroke();
  g.beginPath(); g.moveTo(144.3, 93); g.quadraticCurveTo(149, 90, 152.5, 92); g.stroke();
  g.lineWidth = 3.8;
  for (const l of lentes) { g.beginPath(); g.ellipse(l.x, l.y, 15.4, 16.2, 0, 0, TAU); g.stroke(); }
  g.lineWidth = 3.2;
  g.beginPath(); g.moveTo(109.2, 93.5); g.quadraticCurveTo(111.6, 89.5, 114, 93.5); g.stroke();
  g.strokeStyle = "rgba(255,255,255,0.45)"; g.lineWidth = 1.5;
  g.beginPath(); g.ellipse(94, 96, 13.2, 14, 0, Math.PI * 1.15, Math.PI * 1.6); g.stroke();
  g.beginPath(); g.ellipse(129, 96, 13.2, 14, 0, Math.PI * 1.15, Math.PI * 1.6); g.stroke();
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
