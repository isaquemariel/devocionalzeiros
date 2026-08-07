// ============================================================================
// NÚMEROS 5–6 — CENA VIVA. A pureza do arraial; o nazireu; A BÊNÇÃO SACERDOTAL.
//
// Nm 5 — A PUREZA DO ARRAIAL: os imundos postos fora do acampamento (porque o
// Senhor habita no meio); a restituição do dano com o quinto; e a prova das
// águas amargas para a mulher suspeita — encenada com DECORO ABSOLUTO (o palco
// não representa nada do caso; só a voz do alto e a sobriedade).
//
// Nm 6 — O NAZIREU e A BÊNÇÃO DE ARÃO: o voto de separação (sem vinho, sem
// navalha, sem tocar morto — cabelo consagrado ao Senhor). E o ápice: a bênção
// que os sacerdotes põem sobre o povo — "O SENHOR TE ABENÇOE E TE GUARDE; o
// SENHOR faça resplandecer o seu rosto sobre ti… e te dê a paz" (6:24-26):
// o Nome de Deus posto sobre Israel.
//
// A VOZ DE DEUS (regra do projeto): a instrução vem do alto (`by: "deus"`); na
// bênção, Arão é o mediador VISÍVEL, com as mãos levantadas e glória sobre o
// povo — o Nome descendo, sem figura.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });
const dv = (v: number) => b(v, { by: "deus" });

const ARRAIAL: StagePropSpec[] = [
  { ...P("tent", -30, 1.45, undefined, 0.1), tag: "tabernaculo" },
  P("tent", -260, 1.0, undefined, 0.2),
  P("tent", 240, 1.0, undefined, 0.22),
  P("palm", -310, 1.05, undefined, 0.14),
  P("well", 320, 1.0, undefined, 0.5),
  P("grass", -60, 0.82, undefined, 0.82),
  P("grass", 60, 0.78, undefined, 0.74),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Nm 5
  5: {
    start: { terrain: "desert", night: 0.1, glory: 0.6, storm: 0, fire: 0, verdure: 0.2 },
    beats: [
      b(1, { by: "deus", props: ARRAIAL, env: { terrain: "desert", glory: 0.62, night: 0.1, verdure: 0.2 }, cast: [ // o Senhor fala a Moisés
        C("moises", -150, "kneel", { dy: 0.5, facing: 1 }),
      ] }),
      b(2, { by: "deus", q: "lancem fora do arraial" }),                 // lancem para fora todo imundo, para não contaminar o arraial
      b(3, { by: "deus", q: "no meio dos quais eu habito", cast: [                 // "porque eu habito no meio deles"
        C("moises", -150, "point", { dy: 0.5, facing: 1 }),
        C("multidao", 150, "walk", { dy: 0.44 }),
      ] }),
      dv(4), dv(5), dv(6),
      b(7, { by: "deus", q: "fará plena restituição" }),                         // confessará e restituirá o dano, com o quinto
      dv(8), dv(9), dv(10), dv(11), dv(12), dv(13), dv(14),                       // a lei da mulher suspeita (decoro: nada se encena)
      dv(15), dv(16), dv(17), dv(18), dv(19), dv(20), dv(21), dv(22), dv(23),
      dv(24), dv(25), dv(26), dv(27), dv(28), dv(29), dv(30), dv(31),
    ],
  },

  // ------------------------------------------------------------------ Nm 6
  6: {
    start: { terrain: "desert", night: 0.1, glory: 0.64, storm: 0, fire: 0, verdure: 0.2 },
    beats: [
      b(1, { by: "deus", props: ARRAIAL, env: { terrain: "desert", glory: 0.66, night: 0.1, verdure: 0.2 }, cast: [ // o Senhor fala a Moisés
        C("moises", -150, "kneel", { dy: 0.5, facing: 1 }),
      ] }),
      b(2, { by: "deus", q: "voto de nazireu", cast: [                           // o voto de NAZIREU: separar-se para o Senhor
        C("homem", -40, "stand", { dy: 0.54, facing: 1, id: "nazireu" }),
        C("moises", -150, "stand", { dy: 0.5, facing: 1 }),
      ] }),
      b(3, { by: "deus", q: "De vinho e de bebida forte se apartará" }),         // apartar-se-á do vinho e da bebida forte
      dv(4),
      b(5, { by: "deus", q: "não passará navalha", cast: [                       // navalha não passará pela cabeça: santo ao Senhor
        C("homem", -40, "stand", { dy: 0.54, facing: 1, id: "nazireu" }),
      ] }),
      dv(6), dv(7), dv(8), dv(9), dv(10), dv(11), dv(12), dv(13), dv(14), dv(15),
      dv(16), dv(17), dv(18), dv(19), dv(20), dv(21),
      // v.22-27 — A BÊNÇÃO SACERDOTAL.
      b(22, { by: "deus", cast: [                                                // o Senhor fala a Moisés
        C("moises", -150, "kneel", { dy: 0.5, facing: 1 }),
        C("arao", 40, "stand", { glow: 0.3, dy: 0.52, facing: -1 }),
      ] }),
      b(23, { by: "deus", q: "Assim abençoareis os filhos de Israel", env: { glory: 0.75 }, cast: [ // "Assim abençoareis os filhos de Israel"
        C("arao", -20, "raise", { glow: 0.4, dy: 0.52, facing: 1 }),
        C("multidao", 130, "stand", { dy: 0.46 }),
      ] }),
      b(24, { by: "arao", q: "O Senhor te abençoe e te guarde", env: { glory: 0.85 }, cast: [ // "O SENHOR TE ABENÇOE E TE GUARDE"
        C("arao", -30, "raise", { glow: 0.5, dy: 0.5, facing: 1 }),
        C("multidao", 120, "bow", { dy: 0.46 }),
      ] }),
      b(25, { by: "arao", q: "faça resplandecer o seu rosto sobre ti", env: { glory: 0.92 }, cast: [ // "faça RESPLANDECER o seu rosto sobre ti"
        C("arao", -30, "raise", { glow: 0.55, dy: 0.5, facing: 1 }),
        C("multidao", 120, "bow", { dy: 0.46 }),
      ] }),
      b(26, { by: "arao", q: "te dê a paz", env: { glory: 0.98 }, cast: [         // "levante sobre ti o seu rosto, e te dê a PAZ"
        C("arao", -30, "raise", { glow: 0.6, dy: 0.5, facing: 1 }),
        C("multidao", 120, "bow", { dy: 0.46 }),
        C("multidao", 210, "bow", { scale: 0.9, dy: 0.42, id: "povo2" }),
      ] }),
      b(27, { by: "deus", q: "porão o meu nome sobre os filhos de Israel", env: { glory: 0.9 }, cast: [ // "porão o meu NOME sobre eles, e eu os abençoarei"
        C("arao", -30, "stand", { glow: 0.5, dy: 0.5, facing: 1 }),
        C("multidao", 120, "stand", { dy: 0.46 }),
      ] }),
    ],
  },
};
