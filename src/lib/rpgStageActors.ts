// ============================================================================
// RPG Stage Actors — elenco pixel-art DETALHADO para o modo "cena viva".
// Diferente do rpgActors.ts (figuras ~22px), aqui os personagens têm ~44px de
// altura no scale 1: rosto com olhos/sobrancelha/boca, cabelo/barba, túnica com
// dobras e cinto, braços articulados, ciclo de caminhada com 4 fases e sandálias.
// Tudo fillRect inteiro (pixel puro), paleta coerente com o resto do jogo.
// ============================================================================

import { pixel, type Rect } from "@/lib/rpgActors";

export type StageRole =
  | "hero"        // desenhado fora (mascote do jogador) — aqui só para tipos
  | "joao"        // João de Patmos: túnica cinza, barba escura, rolo
  | "cristo"      // Filho do Homem glorificado (Ap 1): veste branca aos pés,
                  // cinto de ouro, cabelos brancos, olhos como chama, brilho
  | "anjo"        // anjo mensageiro: asas em camadas, túnica clara
  | "anciao"      // ancião: veste branca, coroa de ouro
  | "servivente"  // ser vivente: criatura alada dourada cheia de olhos
  | "cordeiro"    // o Cordeiro (como que imolado), com glória
  | "dragao"      // o grande dragão vermelho (Ap 12) — grande, 7 cabeças
  | "besta"       // a besta do mar — corpo de leopardo, 7 cabeças
  | "cavaleiro"   // cavaleiro (Ap 6) — cavalo por paleta: branco/vermelho/preto/amarelo
  | "multidao"    // grande multidão com palmas (silhuetas em camadas)
  | "mulher"      // a mulher vestida de sol (Ap 12)
  | "homem" | "mulherComum"; // figurantes detalhados

export type StagePose = "stand" | "walk" | "kneel" | "bow" | "raise" | "write" | "point" | "lie" | "flyIdle";

export interface StageActorSpec {
  role: StageRole;
  pose?: StagePose;
  facing?: 1 | -1;
  scale?: number;      // 1 = ~44px de altura
  t?: number;          // relógio (ms) p/ animação
  reduce?: boolean;
  alpha?: number;
  palette?: string;    // cor base p/ variações (cavaleiro: white|red|black|pale)
  glow?: number;       // 0..1 brilho de glória ao redor
  walkPhase?: number;  // fase externa do passo (rad) p/ sincronizar c/ movimento real
}

// -- paleta base --
const SKIN = "#d9a06b", SKIN_D = "#b07a44", SKIN_HL = "#eec191";
const HAIR_DARK = "#2a1c10", HAIR_GRAY = "#d8d8d8";

// utilitário: retângulo com sombra 1px inferior (volume)
const box = (R: Rect, x: number, y: number, w: number, h: number, c: string, cd: string) => {
  R(x, y, w, h, c);
  R(x, y + h - 1, w, 1, cd);
};

// ---------------------------------------------------------------------------
// Humano detalhado (base p/ joao, anciao, homem, mulherComum, anjo, cristo)
// Altura ~44px no scale 1. fy = chão sob os pés; x = centro.
// ---------------------------------------------------------------------------
interface HumanCfg {
  robe: string; robeD: string; robeHL?: string;
  sash?: string;            // cinto/faixa
  hair: string; beard?: string;
  skin?: string;
  crown?: boolean;          // coroa de ouro (ancião)
  halo?: number;            // 0..1 brilho atrás da cabeça
  eyesFlame?: boolean;      // olhos como chama de fogo (cristo)
  feetBronze?: boolean;     // pés como latão reluzente (cristo)
  wings?: boolean;          // asas (anjo)
  scroll?: boolean;         // segura um rolo (joao "write")
  hood?: boolean;           // véu (mulher comum)
}

function drawHumanBase(g: CanvasRenderingContext2D, x: number, fy: number, spec: StageActorSpec, cfg: HumanCfg) {
  const R = pixel(g);
  const S = spec.scale ?? 1;
  const t = spec.t ?? 0;
  const face = spec.facing ?? 1;
  const reduce = !!spec.reduce;
  const pose = spec.pose ?? "stand";
  const sk = cfg.skin ?? SKIN;

  const prevA = g.globalAlpha;
  if (spec.alpha != null) g.globalAlpha = prevA * spec.alpha;

  // glória/aura ao redor (desenhada primeiro, atrás)
  if ((spec.glow ?? 0) > 0.02) {
    const gl = spec.glow!;
    g.save();
    g.globalAlpha = (spec.alpha ?? 1) * prevA * 0.35 * gl;
    const grd = g.createRadialGradient(x, fy - 22 * S, 4 * S, x, fy - 22 * S, 30 * S);
    grd.addColorStop(0, "#fff6d8");
    grd.addColorStop(1, "rgba(255,246,216,0)");
    g.fillStyle = grd;
    g.fillRect(x - 30 * S, fy - 52 * S, 60 * S, 60 * S);
    g.restore();
  }

  const bob = reduce ? 0 : Math.sin(t * 0.003 + x * 0.7) * 0.8 * S;
  const phase = spec.walkPhase ?? t * 0.011;
  const step = pose === "walk" && !reduce ? Math.sin(phase) : 0;
  const step2 = pose === "walk" && !reduce ? Math.sin(phase + Math.PI) : 0;

  // âncoras (kneel/bow abaixam o corpo)
  const kneel = pose === "kneel" ? 8 * S : 0;
  const bow = pose === "bow" ? 4 * S : 0;
  const headTop = fy - 44 * S + bob + kneel + bow;      // topo da cabeça
  const bodyTop = fy - 32 * S + bob + kneel + bow * 0.6; // ombros

  if (pose === "lie") {
    // deitado (Ap 1:17 — "caí a seus pés como morto")
    box(R, x - 16 * S, fy - 5 * S, 30 * S, 5 * S, cfg.robe, cfg.robeD);
    R(x - 21 * S, fy - 6 * S, 6 * S, 5 * S, sk);              // cabeça
    R(x - 21 * S, fy - 7 * S, 6 * S, 2 * S, cfg.hair);        // cabelo
    if (cfg.beard) R(x - 20 * S, fy - 3 * S, 4 * S, 2 * S, cfg.beard);
    R(x + 13 * S, fy - 6 * S, 4 * S, 2 * S, sk);              // pés
    if (spec.alpha != null) g.globalAlpha = prevA;
    return;
  }

  // ---- asas (anjo) — atrás do corpo, 3 camadas de penas, batendo devagar
  if (cfg.wings) {
    const flap = reduce ? 0 : Math.sin(t * 0.004) * 2 * S;
    for (const s of [-1, 1] as const) {
      const wx = x + s * 5 * S;
      for (let layer = 0; layer < 3; layer++) {
        const ly = bodyTop - 2 * S + layer * 4 * S;
        const len = (14 - layer * 3) * S;
        const col = layer === 0 ? "#f4f8ff" : layer === 1 ? "#dbe6f7" : "#c2d2ea";
        for (let i = 0; i < len; i++) {
          const yy = ly + Math.round(i * 0.45) - flap * (i / len);
          R(wx + s * (2 * S + i), yy, 2, 2, col);
        }
      }
    }
  }

  // ---- pernas / barra da túnica (a túnica desce até perto dos pés)
  const hemY = fy - 8 * S + bob * 0.5 + kneel;
  // saia da túnica com dobras (3 tons)
  for (let i = 0; i < 10; i++) {
    const w = (6 + i * 0.9) * S;
    const shade = i % 3 === 0 ? cfg.robeD : i % 3 === 1 ? cfg.robe : (cfg.robeHL ?? cfg.robe);
    R(x - w, hemY - 14 * S + i * 1.4 * S + kneel * 0.2, w * 2, 2 * S, shade);
  }
  // dobra vertical central
  R(x - 1 * S, hemY - 12 * S, 1 * S, 11 * S, cfg.robeD);

  if (pose === "kneel") {
    // ajoelhado: dobra da túnica no chão
    R(x - 9 * S, fy - 4 * S, 18 * S, 4 * S, cfg.robeD);
  } else {
    // pernas visíveis sob a barra + sandálias
    const legL = x - 3.5 * S + (pose === "walk" ? step * 3.5 * S : 0);
    const legR = x + 1.5 * S + (pose === "walk" ? step2 * 3.5 * S : 0);
    const feetC = cfg.feetBronze ? "#e0a34c" : sk;
    const feetD = cfg.feetBronze ? "#9c6b22" : SKIN_D;
    R(legL, fy - 6 * S, 2 * S, 6 * S, feetC);
    R(legR, fy - 6 * S, 2 * S, 6 * S, feetC);
    // sandálias (tira)
    R(legL - 0.5 * S, fy - 1.5 * S, 3 * S, 1.5 * S, feetD);
    R(legR - 0.5 * S, fy - 1.5 * S, 3 * S, 1.5 * S, feetD);
    if (cfg.feetBronze && !reduce) {
      // reflexo de fornalha nos pés
      const fl = Math.sin(t * 0.01) * 0.5 + 0.5;
      g.save(); g.globalAlpha = (spec.alpha ?? 1) * prevA * (0.35 + fl * 0.3);
      R(legL, fy - 5 * S, 2 * S, 2 * S, "#ffd27a"); R(legR, fy - 5 * S, 2 * S, 2 * S, "#ffd27a");
      g.restore();
    }
  }

  // ---- tronco com dobras e ombros
  box(R, x - 6 * S, bodyTop, 12 * S, 12 * S, cfg.robe, cfg.robeD);
  R(x - 6 * S, bodyTop, 2 * S, 12 * S, cfg.robeD);                       // sombra lateral
  R(x + 4 * S, bodyTop, 2 * S, 12 * S, cfg.robeHL ?? cfg.robe);          // luz lateral
  R(x - 6 * S, bodyTop, 12 * S, 1 * S, cfg.robeHL ?? cfg.robe);          // ombro iluminado
  // cinto / faixa dourada no peito (cristo) ou cinto na cintura
  if (cfg.sash) {
    if (cfg.eyesFlame) {
      // cinto de ouro à altura do peito (Ap 1:13)
      R(x - 6 * S, bodyTop + 3 * S, 12 * S, 2.5 * S, cfg.sash);
      R(x - 6 * S, bodyTop + 5 * S, 12 * S, 0.8 * S, "#8a6416");
    } else {
      R(x - 6 * S, bodyTop + 9 * S, 12 * S, 2 * S, cfg.sash);
    }
  }

  // ---- braços (manga + mão) por pose
  const shoulderY = bodyTop + 1.5 * S;
  const arm = (side: -1 | 1, drop: number, outX: number, hand = true) => {
    // manga
    R(x + side * 6 * S, shoulderY, 2.5 * S, drop, cfg.robeD);
    // antebraço/mão
    if (hand) R(x + side * 6 * S + side * outX, shoulderY + drop, 2 * S, 3 * S, sk);
  };
  const swing = pose === "walk" ? step * 2.5 * S : 0;
  if (pose === "raise") { arm(-1, -6 * S, 0); arm(1, -6 * S, 0); R(x - 7 * S, shoulderY - 9 * S, 2 * S, 4 * S, sk); R(x + 5 * S, shoulderY - 9 * S, 2 * S, 4 * S, sk); }
  else if (pose === "point") { arm(-face as -1 | 1, 6 * S, 0); R(x + face * 6 * S, shoulderY + 1 * S, 6 * S * face, 2 * S, sk); }
  else if (pose === "write") { arm(-1, 7 * S, 0); R(x + 5 * S, shoulderY + 4 * S, 4 * S, 2 * S, sk); }
  else if (pose === "bow" || pose === "kneel") { arm(-1, 8 * S, 1 * S); arm(1, 8 * S, 1 * S); }
  else if (pose === "walk") { R(x - 7.5 * S, shoulderY + swing, 2.5 * S, 8 * S, cfg.robeD); R(x + 5 * S, shoulderY - swing, 2.5 * S, 8 * S, cfg.robeD); R(x - 7 * S, shoulderY + 8 * S + swing, 2 * S, 2.5 * S, sk); R(x + 5.5 * S, shoulderY + 8 * S - swing, 2 * S, 2.5 * S, sk); }
  else { arm(-1, 8 * S, 0.5 * S); arm(1, 8 * S, 0.5 * S); }

  // rolo/livro na mão (João escrevendo)
  if (cfg.scroll) {
    R(x + 4 * S, shoulderY + 5.5 * S, 7 * S, 4 * S, "#efe3c2");
    R(x + 4 * S, shoulderY + 5.5 * S, 7 * S, 1, "#cbb98d");
    R(x + 4 * S, shoulderY + 9 * S, 7 * S, 0.8 * S, "#cbb98d");
  }

  // ---- pescoço + cabeça com rosto
  const headH = 8 * S, headW = 8 * S;
  const hy = headTop, hx = x - headW / 2;
  R(x - 1.5 * S, hy + headH, 3 * S, 2 * S, sk);            // pescoço
  box(R, hx, hy, headW, headH, sk, SKIN_D);                 // cabeça
  R(hx, hy + 1 * S, 1 * S, headH - 2 * S, SKIN_D);          // sombra face
  R(hx + headW - 1 * S, hy + 1 * S, 1 * S, headH - 3 * S, SKIN_HL); // luz face

  // rosto (virado por facing): olhos, sobrancelha, nariz, boca
  const eyeY = hy + 3 * S;
  const ex1 = x + (face === 1 ? -1.5 : -2.5) * S, ex2 = x + (face === 1 ? 2 : 1) * S;
  if (cfg.eyesFlame && !reduce) {
    const fl = Math.sin(t * 0.02) * 0.5 + 0.5;
    R(ex1, eyeY - 1, 1.6 * S, 2 * S, fl > 0.5 ? "#ffd24a" : "#ff9430");
    R(ex2, eyeY - 1, 1.6 * S, 2 * S, fl > 0.5 ? "#ff9430" : "#ffd24a");
    g.save(); g.globalAlpha = (spec.alpha ?? 1) * prevA * 0.4;
    R(ex1 - 1, eyeY - 2, 3 * S, 4 * S, "#ffdf8a"); R(ex2 - 1, eyeY - 2, 3 * S, 4 * S, "#ffdf8a");
    g.restore();
  } else {
    R(ex1, eyeY, 1.2 * S, 1.2 * S, "#20140c");
    R(ex2, eyeY, 1.2 * S, 1.2 * S, "#20140c");
    R(ex1 - 0.4 * S, eyeY - 1.2 * S, 2 * S, 0.7 * S, SKIN_D); // sobrancelhas
    R(ex2 - 0.4 * S, eyeY - 1.2 * S, 2 * S, 0.7 * S, SKIN_D);
  }
  R(x + face * 0.6 * S, eyeY + 1.6 * S, 1 * S, 1.6 * S, SKIN_D);     // nariz
  R(x - 1 * S, hy + 6.4 * S, 2.4 * S, 0.8 * S, "#8a5a34");           // boca

  // cabelo (coroa da cabeça + laterais) e barba
  R(hx - 0.5 * S, hy - 1 * S, headW + 1 * S, 2.5 * S, cfg.hair);
  R(hx - 0.5 * S, hy, 1.5 * S, 4 * S, cfg.hair);
  R(hx + headW - 1 * S, hy, 1.5 * S, 4 * S, cfg.hair);
  if (cfg.hood) { R(hx - 1 * S, hy - 1.5 * S, headW + 2 * S, 3 * S, cfg.robe); R(hx - 1 * S, hy, 1.5 * S, headH + 3 * S, cfg.robe); R(hx + headW - 0.5 * S, hy, 1.5 * S, headH + 3 * S, cfg.robe); }
  if (cfg.beard) {
    R(hx + 0.5 * S, hy + 6 * S, headW - 1 * S, 2.6 * S, cfg.beard);
    R(hx + 1.5 * S, hy + 8.4 * S, headW - 3 * S, 1.6 * S, cfg.beard);
  }

  // coroa de ouro (ancião)
  if (cfg.crown) {
    R(hx, hy - 3 * S, headW, 2 * S, "#e8b04b");
    for (const px of [0, 3, 6]) R(hx + px * S, hy - 4.4 * S, 1.4 * S, 1.6 * S, "#ffd989");
  }

  // auréola/rosto resplandecente
  if ((cfg.halo ?? 0) > 0.02 && !reduce) {
    g.save();
    g.globalAlpha = (spec.alpha ?? 1) * prevA * 0.5 * (cfg.halo ?? 0) * (0.8 + Math.sin(t * 0.005) * 0.2);
    const grd = g.createRadialGradient(x, hy + 3 * S, 1 * S, x, hy + 3 * S, 12 * S);
    grd.addColorStop(0, "#fff9e0"); grd.addColorStop(1, "rgba(255,249,224,0)");
    g.fillStyle = grd; g.fillRect(x - 12 * S, hy - 9 * S, 24 * S, 24 * S);
    g.restore();
  }

  if (spec.alpha != null) g.globalAlpha = prevA;
}

// ---------------------------------------------------------------------------
// Criaturas / grandes figuras
// ---------------------------------------------------------------------------

/** Cordeiro em pé (com glória) — Ap 5. */
function drawLamb(g: CanvasRenderingContext2D, x: number, fy: number, spec: StageActorSpec) {
  const R = pixel(g); const S = (spec.scale ?? 1) * 1.2; const t = spec.t ?? 0;
  if ((spec.glow ?? 0.8) > 0) {
    g.save(); g.globalAlpha *= 0.4;
    const grd = g.createRadialGradient(x, fy - 8 * S, 2 * S, x, fy - 8 * S, 26 * S);
    grd.addColorStop(0, "#fff6d8"); grd.addColorStop(1, "rgba(255,246,216,0)");
    g.fillStyle = grd; g.fillRect(x - 26 * S, fy - 34 * S, 52 * S, 44 * S); g.restore();
  }
  const bob = spec.reduce ? 0 : Math.sin(t * 0.003) * 0.6 * S;
  // corpo de lã (3 tons)
  box(R, x - 9 * S, fy - 12 * S + bob, 18 * S, 8 * S, "#f2efe6", "#cfc7b4");
  R(x - 9 * S, fy - 12 * S + bob, 18 * S, 1.5 * S, "#ffffff");
  // cabeça
  R(x + 7 * S, fy - 15 * S + bob, 5 * S, 5 * S, "#e8e2d2");
  R(x + 9 * S, fy - 13.6 * S + bob, 1 * S, 1 * S, "#20140c"); // olho
  // pernas
  for (const lx of [-6, -2, 2, 6]) R(x + lx * S, fy - 4 * S, 1.5 * S, 4 * S, "#b8ae98");
  // sinal de "imolado": marca vermelha discreta no flanco
  R(x - 2 * S, fy - 9 * S + bob, 2 * S, 1 * S, "#b0483c");
}

/** Grande dragão vermelho, 7 cabeças (Ap 12). Ocupa ~90px de largura no scale 1. */
function drawDragon(g: CanvasRenderingContext2D, x: number, fy: number, spec: StageActorSpec) {
  const R = pixel(g); const S = (spec.scale ?? 1) * 1.6; const t = spec.t ?? 0; const face = spec.facing ?? -1;
  const red = "#a8302e", redD = "#701d1c", redHL = "#d24a42";
  const sway = spec.reduce ? 0 : Math.sin(t * 0.002) * 2 * S;
  // cauda serpenteando (varre 1/3 das estrelas — insinuada por comprimento)
  for (let i = 0; i < 16; i++) {
    const tx = x - face * (10 + i * 3.2) * S;
    const ty = fy - 6 * S - Math.sin(i * 0.6 + t * 0.003) * 3 * S;
    R(tx, ty, 3.4 * S, 3 * S, i % 3 ? red : redD);
  }
  // corpo
  box(R, x - 12 * S, fy - 16 * S, 26 * S, 12 * S, red, redD);
  R(x - 12 * S, fy - 16 * S, 26 * S, 2 * S, redHL);
  // patas com garras
  for (const lx of [-8, 0, 8]) { R(x + lx * S, fy - 5 * S, 3 * S, 5 * S, redD); R(x + lx * S - 1, fy - 1.5 * S, 5 * S, 1.5 * S, "#3a1210"); }
  // asas de morcego
  for (const s of [-1, 1] as const) {
    for (let i = 0; i < 12; i++) {
      R(x + s * (2 + i * 1.6) * S, fy - 24 * S + i * 0.9 * S + sway * 0.4, 2 * S, 1.6 * S, i % 2 ? "#7c2320" : "#5a1715");
    }
  }
  // 7 pescoços + cabeças com coroa (diadema)
  for (let h = 0; h < 7; h++) {
    const off = (h - 3) * 4.6 * S;
    const nx = x + face * 12 * S + off * 0.55;
    const ny = fy - 22 * S - Math.abs(off) * 0.28 - (spec.reduce ? 0 : Math.sin(t * 0.004 + h) * 1.4 * S);
    // pescoço
    R(nx - 1.4 * S, ny + 2 * S, 2.8 * S, 8 * S + Math.abs(off) * 0.25, h % 2 ? red : redD);
    // cabeça
    box(R, nx - 2.6 * S, ny - 2.4 * S, 5.4 * S, 4.4 * S, red, redD);
    R(nx + face * 1.4 * S, ny - 1.4 * S, 1.2 * S, 1.2 * S, "#ffd24a"); // olho
    R(nx + face * 2.6 * S, ny, 2 * S, 1 * S, redD);                    // focinho
    // diadema
    R(nx - 2 * S, ny - 3.6 * S, 4 * S, 1.2 * S, "#e8b04b");
  }
}

/** Ser vivente — criatura alada dourada cheia de olhos (Ap 4). */
function drawLivingBeing(g: CanvasRenderingContext2D, x: number, fy: number, spec: StageActorSpec) {
  const R = pixel(g); const S = spec.scale ?? 1; const t = spec.t ?? 0;
  const gold = "#d9ae54", goldD = "#a57c2e", goldHL = "#f2d189";
  const hover = spec.reduce ? 0 : Math.sin(t * 0.0035 + x) * 2.5 * S;
  const baseY = fy - 16 * S + hover;
  // 3 pares de asas (serafim)
  for (const s of [-1, 1] as const) {
    for (let p = 0; p < 3; p++) {
      const wy = baseY - 6 * S + p * 5 * S;
      const flap = spec.reduce ? 0 : Math.sin(t * 0.006 + p) * 2 * S;
      for (let i = 0; i < 9 - p * 2; i++) R(x + s * (4 + i * 1.8) * S, wy + i * 0.7 * S - flap, 2 * S, 1.6 * S, i % 2 ? goldHL : gold);
    }
  }
  // corpo
  box(R, x - 5 * S, baseY - 4 * S, 10 * S, 14 * S, gold, goldD);
  R(x - 5 * S, baseY - 4 * S, 10 * S, 1.4 * S, goldHL);
  // olhos por toda parte (piscando)
  for (let i = 0; i < 8; i++) {
    const ox = x - 4 * S + (i % 4) * 2.6 * S;
    const oy = baseY - 2 * S + Math.floor(i / 4) * 5 * S;
    const blink = !spec.reduce && ((t * 0.002 + i) % 5) < 0.2;
    R(ox, oy, 1.2 * S, blink ? 0.4 * S : 1.2 * S, "#2a1a0c");
  }
  // rosto principal
  R(x - 2.4 * S, baseY - 8 * S, 4.8 * S, 4 * S, "#e8caa0");
  R(x - 1.6 * S, baseY - 6.8 * S, 1 * S, 1 * S, "#20140c");
  R(x + 0.8 * S, baseY - 6.8 * S, 1 * S, 1 * S, "#20140c");
}

/** Cavaleiro do Apocalipse — cavalo por paleta + cavaleiro com item. */
function drawHorseman(g: CanvasRenderingContext2D, x: number, fy: number, spec: StageActorSpec) {
  const R = pixel(g); const S = (spec.scale ?? 1) * 1.15; const t = spec.t ?? 0; const face = spec.facing ?? 1;
  const kind = spec.palette ?? "white";
  const horse = kind === "white" ? "#e9e6dc" : kind === "red" ? "#a8302e" : kind === "black" ? "#26262e" : "#b7c2a0";
  const horseD = kind === "white" ? "#bdb8a8" : kind === "red" ? "#701d1c" : kind === "black" ? "#101014" : "#8a9678";
  const gallop = spec.reduce ? 0 : Math.sin(t * 0.012) * 1.6 * S;
  // corpo do cavalo
  box(R, x - 12 * S, fy - 16 * S + gallop * 0.3, 22 * S, 8 * S, horse, horseD);
  // pescoço + cabeça
  R(x + face * 8 * S, fy - 22 * S + gallop * 0.4, 4 * S, 8 * S, horse);
  R(x + face * 10 * S, fy - 24 * S + gallop * 0.4, 5 * S, 3.4 * S, horse);
  R(x + face * 13 * S, fy - 23 * S + gallop * 0.4, 1 * S, 1 * S, "#20140c");
  // crina
  R(x + face * 7 * S, fy - 24 * S, 2 * S, 8 * S, horseD);
  // pernas galopando
  for (let i = 0; i < 4; i++) {
    const lx = x + (-9 + i * 6) * S;
    const kick = spec.reduce ? 0 : Math.sin(t * 0.012 + i * 1.5) * 2.4 * S;
    R(lx, fy - 8 * S, 2 * S, 8 * S + kick * 0.4, horseD);
  }
  // cavaleiro (busto sobre o cavalo)
  const ry = fy - 26 * S + gallop * 0.3;
  const robe = kind === "white" ? "#dfe4ee" : kind === "red" ? "#7c2f2a" : kind === "black" ? "#3a3a44" : "#77836a";
  box(R, x - 3 * S, ry, 6 * S, 9 * S, robe, horseD);
  R(x - 2 * S, ry - 5 * S, 4.6 * S, 5 * S, SKIN);
  R(x - 2 * S, ry - 6 * S, 4.6 * S, 1.6 * S, HAIR_DARK);
  // item por cavaleiro: arco / espada / balança / foice
  if (kind === "white") { R(x + face * 5 * S, ry - 2 * S, 1 * S, 9 * S, "#caa050"); R(x + face * 5 * S, ry - 2 * S, face * 3 * S, 1 * S, "#caa050"); }
  else if (kind === "red") { R(x + face * 5 * S, ry - 3 * S, 1.4 * S, 8 * S, "#c7d0dc"); }
  else if (kind === "black") { R(x + face * 5 * S, ry + 1 * S, 5 * S, 1 * S, "#caa050"); R(x + face * 5 * S, ry + 2 * S, 1.4 * S, 2 * S, "#e8b04b"); R(x + face * 8 * S, ry + 2 * S, 1.4 * S, 2 * S, "#e8b04b"); }
  else { R(x + face * 5 * S, ry - 4 * S, 1 * S, 9 * S, "#8a8f99"); R(x + face * 5 * S, ry - 5 * S, face * 4 * S, 1.6 * S, "#c7d0dc"); }
}

/** Multidão com palmas — camadas de silhuetas (Ap 7). */
function drawCrowd(g: CanvasRenderingContext2D, x: number, fy: number, spec: StageActorSpec) {
  const R = pixel(g); const S = spec.scale ?? 1; const t = spec.t ?? 0;
  const rows = [
    { y: -10 * S, c: "#5d6b86", n: 9, sp: 6.6 },
    { y: -5 * S, c: "#7a88a4", n: 8, sp: 7.4 },
    { y: 0, c: "#98a6c2", n: 7, sp: 8.4 },
  ];
  rows.forEach((row, ri) => {
    for (let i = 0; i < row.n; i++) {
      const px = x + (i - row.n / 2) * row.sp * S;
      const py = fy + row.y;
      const sway = spec.reduce ? 0 : Math.sin(t * 0.004 + i + ri) * 0.8 * S;
      R(px, py - 12 * S, 4 * S, 8 * S, row.c);                       // corpo
      R(px + 0.8 * S, py - 15 * S, 2.6 * S, 3 * S, "#c9a274");        // cabeça
      // palma erguida balançando
      R(px + 3 * S, py - 19 * S + sway, 0.8 * S, 6 * S, "#4c7a44");
      for (let f = 0; f < 3; f++) R(px + 1.6 * S + f * 1.4 * S, py - 20 * S + sway - f * 0.6 * S, 1.2 * S, 1.6 * S, "#5f9a54");
    }
  });
}

// ---------------------------------------------------------------------------
// API pública
// ---------------------------------------------------------------------------

/** Desenha um ator do palco. x = centro; fy = linha do chão sob os pés. */
export function drawStageActor(g: CanvasRenderingContext2D, x: number, fy: number, spec: StageActorSpec): void {
  switch (spec.role) {
    case "joao":
      return drawHumanBase(g, x, fy, spec, {
        robe: "#8a8f99", robeD: "#666b74", robeHL: "#aab0bc", sash: "#5d4a30",
        hair: HAIR_DARK, beard: "#3a2a18", scroll: spec.pose === "write",
      });
    case "cristo":
      return drawHumanBase(g, x, fy, { ...spec, glow: Math.max(spec.glow ?? 0, 0.85) }, {
        robe: "#f2f5fb", robeD: "#c5cddd", robeHL: "#ffffff", sash: "#e8b04b",
        hair: "#f4f4f2", beard: "#eeeeec", eyesFlame: true, feetBronze: true, halo: 1,
      });
    case "anjo":
      return drawHumanBase(g, x, fy, spec, {
        robe: "#e9eef8", robeD: "#bcc7dc", robeHL: "#ffffff", sash: "#caa050",
        hair: "#ffe9a8", wings: true, halo: 0.5,
      });
    case "anciao":
      return drawHumanBase(g, x, fy, spec, {
        robe: "#e6e9f1", robeD: "#b9c1d2", robeHL: "#ffffff",
        hair: HAIR_GRAY, beard: "#cfcfcf", crown: true,
      });
    case "mulher":
      // a mulher vestida de sol (Ap 12): veste radiante + glória
      return drawHumanBase(g, x, fy, { ...spec, glow: Math.max(spec.glow ?? 0, 0.7) }, {
        robe: "#f5d98a", robeD: "#caa050", robeHL: "#ffedb8", hair: "#4a3018", hood: true, halo: 0.6,
      });
    case "homem":
      return drawHumanBase(g, x, fy, spec, {
        robe: spec.palette ?? "#7a5a34", robeD: "#5c4225", hair: HAIR_DARK, beard: "#3a2a18",
      });
    case "mulherComum":
      return drawHumanBase(g, x, fy, spec, {
        robe: spec.palette ?? "#3b6ea8", robeD: "#274c78", hair: "#3a2a18", hood: true,
      });
    case "cordeiro": return drawLamb(g, x, fy, spec);
    case "dragao": return drawDragon(g, x, fy, spec);
    case "servivente": return drawLivingBeing(g, x, fy, spec);
    case "cavaleiro": return drawHorseman(g, x, fy, spec);
    case "multidao": return drawCrowd(g, x, fy, spec);
    default:
      return drawHumanBase(g, x, fy, spec, { robe: "#7a5a34", robeD: "#5c4225", hair: HAIR_DARK });
  }
}

/** Altura aproximada (px) de um ator — p/ posicionar balões de fala. */
export function stageActorHeight(role: StageRole, scale = 1): number {
  switch (role) {
    case "dragao": return 46 * scale * 1.6;
    case "cavaleiro": return 30 * scale * 1.15;
    case "cordeiro": return 18 * scale * 1.2;
    case "servivente": return 30 * scale;
    case "multidao": return 22 * scale;
    default: return 46 * scale;
  }
}
