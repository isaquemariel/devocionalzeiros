// ============================================================================
// RPG Boss — chefes de cada livro (pixel art procedural)
// ----------------------------------------------------------------------------
// O "chefe" é o desafio final do livro: enfrentar o capítulo final. Cada região
// tem um chefe temático (o Dragão em Apocalipse, as Pragas no Êxodo, o Gigante
// no Reino, etc.). Aqui ficam os dados e o desenho pixel do monstro.
// Puramente visual.
// ============================================================================

import type { RPGRegion } from "@/lib/rpgBibleData";

export interface BossInfo {
  name: string;
  emoji: string;
  color: string; // cor de destaque (olhos/aura)
  taunt: string; // fala de abertura
}

export const BOSS_INFO: Record<RPGRegion, BossInfo> = {
  creation: { name: "A Antiga Serpente", emoji: "🐍", color: "#63b84a", taunt: "Será que Deus disse mesmo...?" },
  desert: { name: "As Dez Pragas", emoji: "🦗", color: "#e0b24a", taunt: "O coração de Faraó se endureceu." },
  conquest: { name: "Os Muros de Jericó", emoji: "🏰", color: "#c58a4a", taunt: "Nenhum exército passará por aqui!" },
  kingdom: { name: "O Gigante Golias", emoji: "🗡️", color: "#e0c24a", taunt: "Envia-me um homem, para lutarmos!" },
  exile: { name: "A Cova dos Leões", emoji: "🦁", color: "#e0a24a", taunt: "Ninguém sai daqui com vida." },
  wisdom: { name: "O Turbilhão", emoji: "🌀", color: "#3fd0a0", taunt: "Onde estavas tu quando eu fundei a terra?" },
  prophets: { name: "O Fogo do Juízo", emoji: "🔥", color: "#ff6a8a", taunt: "Quem poderá permanecer?" },
  minor_prophets: { name: "O Grande Peixe", emoji: "🐋", color: "#4a9ae0", taunt: "As profundezas te engolirão." },
  gospels: { name: "A Grande Tempestade", emoji: "⛈️", color: "#e0d24a", taunt: "As ondas cobrirão o barco!" },
  acts: { name: "As Correntes", emoji: "⛓️", color: "#e0824a", taunt: "Nenhuma palavra sairá desta prisão." },
  epistles: { name: "O Lobo Devorador", emoji: "🐺", color: "#b0b0c8", taunt: "Virei destruir o rebanho." },
  revelation: { name: "O Dragão", emoji: "🐉", color: "#ff4a6a", taunt: "Farei guerra contra os santos!" },
};

type G = CanvasRenderingContext2D;

/**
 * Desenha um chefe pixel (silhueta escura ameaçadora com olhos brilhantes,
 * chifres e asas), tingido pela cor da região. `bx` centro, `feetY` base.
 */
export function drawBoss(
  g: G,
  region: RPGRegion,
  bx: number,
  feetY: number,
  t: number,
  reduce: boolean,
): void {
  const info = BOSS_INFO[region];
  const OUT = "#08060a";
  const BODY = "#241826";
  const BODY_L = "#3a2a3e";
  const EYE = info.color;
  const R = (x: number, y: number, w: number, h: number, c: string) => {
    g.fillStyle = c;
    g.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
  };

  const bob = reduce ? 0 : Math.round(Math.sin(t * 0.004) * 1.5);
  const cx = Math.round(bx);
  const cy = Math.round(feetY) - 20 - bob;
  const BW = 18,
    HH = 16;

  // sombra
  g.globalAlpha = 0.3;
  g.fillStyle = "#000";
  g.beginPath();
  g.ellipse(cx, feetY + 3, 20, 4, 0, 0, 6.29);
  g.fill();
  g.globalAlpha = 1;

  // aura pulsante
  if (!reduce) {
    const a = 0.1 + Math.abs(Math.sin(t * 0.005)) * 0.12;
    g.globalAlpha = a;
    g.fillStyle = EYE;
    g.beginPath();
    g.ellipse(cx, cy, BW + 10, HH + 12, 0, 0, 6.29);
    g.fill();
    g.globalAlpha = 1;
  }

  // asas (atrás)
  const flap = reduce ? 0 : Math.round(Math.sin(t * 0.006) * 2);
  for (const s of [-1, 1]) {
    g.fillStyle = OUT;
    g.beginPath();
    g.moveTo(cx + s * 8, cy - 4);
    g.lineTo(cx + s * (BW + 14), cy - 12 - flap);
    g.lineTo(cx + s * (BW + 10), cy + 8);
    g.closePath();
    g.fill();
    g.fillStyle = BODY_L;
    g.beginPath();
    g.moveTo(cx + s * 9, cy - 2);
    g.lineTo(cx + s * (BW + 9), cy - 8 - flap);
    g.lineTo(cx + s * (BW + 6), cy + 5);
    g.closePath();
    g.fill();
  }

  // corpo (blocão arredondado com contorno)
  for (let ry = -HH; ry <= HH; ry++) {
    const f = Math.pow(Math.max(0, 1 - Math.pow(Math.abs(ry) / HH, 2.2)), 1 / 2.2);
    const w = Math.round(f * BW);
    if (w <= 0) continue;
    R(cx - w - 1, cy + ry, w * 2 + 3, 1, OUT);
  }
  for (let ry = -HH + 1; ry <= HH - 1; ry++) {
    const f = Math.pow(Math.max(0, 1 - Math.pow(Math.abs(ry) / HH, 2.2)), 1 / 2.2);
    const w = Math.round(f * BW);
    if (w <= 0) continue;
    R(cx - w, cy + ry, w * 2 + 1, 1, BODY);
  }
  // barriga mais clara
  R(cx - 5, cy + 2, 10, 8, BODY_L);

  // chifres
  R(cx - 10, cy - HH - 3, 3, 5, OUT);
  R(cx + 7, cy - HH - 3, 3, 5, OUT);
  R(cx - 10, cy - HH - 4, 2, 2, BODY_L);
  R(cx + 8, cy - HH - 4, 2, 2, BODY_L);

  // olhos brilhantes
  const blink = !reduce && Math.floor(t / 90) % 20 === 0;
  if (!blink) {
    for (const sx of [-6, 4]) {
      R(cx + sx, cy - 6, 3, 2, EYE);
      R(cx + sx + 1, cy - 6, 1, 1, "#fff");
    }
  } else {
    R(cx - 6, cy - 5, 3, 1, OUT);
    R(cx + 4, cy - 5, 3, 1, OUT);
  }
  // boca com dentes
  R(cx - 5, cy - 1, 10, 2, OUT);
  for (let i = 0; i < 4; i++) R(cx - 4 + i * 3, cy - 1, 1, 2, "#e8e0d0");
}
