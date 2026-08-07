// ============================================================================
// LEVÍTICO 21–22 — CENA VIVA. A santidade dos sacerdotes e das coisas santas.
//
// Lev 21 — OS SACERDOTES: quem serve ao altar guarda santidade maior — não se
// contamina com mortos senão dos parentes chegados, não se casa profanamente, e
// o que tem defeito corporal não se aproxima do véu, mas come do pão santo.
// "O santificarás, porquanto oferece o pão do teu Deus" (v.8).
//
// Lev 22 — AS COISAS SANTAS: os sacerdotes imundos não comem das ofertas; só
// come da porção santa quem é da casa sacerdotal; os animais oferecidos são
// sem defeito. O selo do livro: "não profanareis o meu santo nome, para que eu
// seja santificado no meio dos filhos de Israel" (v.32).
//
// A VOZ DE DEUS (regra do projeto): tudo é instrução do alto (`by: "deus"`),
// da tenda, sem figura; Arão e seus filhos (`arao`/`servo`) diante do altar.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });
const dv = (v: number) => b(v, { by: "deus" });

const ATRIO: StagePropSpec[] = [
  { ...P("tent", -30, 1.45, undefined, 0.08), tag: "tabernaculo" },
  { ...P("altar", 70, 1.25, 0.7, 0.44), tag: "altar-holocausto" },
  { ...P("bowl", 158, 0.85, undefined, 0.56), tag: "pia-cobre" },
  P("tower", -300, 1.15, undefined, 0.06),
  P("palm", -250, 1.0, undefined, 0.16),
  P("crate", -140, 0.8, undefined, 0.62),
  P("grass", -60, 0.8, undefined, 0.82),
];
const priests = (): CastPlacement[] => [
  C("arao", 30, "stand", { glow: 0.2, dy: 0.52, facing: -1 }),
  C("servo", 100, "stand", { dy: 0.48, facing: -1, id: "sacerdote2" }),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Lev 21
  21: {
    start: { terrain: "desert", night: 0.1, glory: 0.66, storm: 0, fire: 0.5, verdure: 0.15 },
    beats: [
      b(1, { by: "deus", props: ATRIO, env: { terrain: "desert", glory: 0.68, fire: 0.5, night: 0.1 }, cast: [ // "Fala aos sacerdotes, filhos de Arão"
        C("moises", -150, "kneel", { dy: 0.5, facing: 1 }), ...priests(),
      ] }),
      dv(2), dv(3), dv(4), dv(5), dv(6), dv(7),
      b(8, { by: "deus", q: "santo será para ti", env: { glory: 0.82 }, cast: [    // "o santificarás, porque oferece o pão do teu Deus; santo será"
        C("arao", 20, "stand", { glow: 0.35, dy: 0.52, facing: 1 }), C("moises", -150, "stand", { dy: 0.5, facing: 1 }),
      ] }),
      dv(9), dv(10), dv(11), dv(12), dv(13), dv(14), dv(15),
      b(16, { by: "deus", cast: [ C("moises", -150, "kneel", { dy: 0.5, facing: 1 }), ...priests() ] }), // falou mais o Senhor a Moisés
      dv(17), dv(18), dv(19), dv(20), dv(21),
      b(22, { by: "deus", q: "o pão do seu Deus" }),                              // o que tem defeito come do pão do seu Deus (santíssimo)
      dv(23),
      b(24, { env: { glory: 0.78 }, cast: [                                       // e Moisés falou isto a Arão, aos seus filhos e a todo o Israel
        C("moises", -60, "point", { dy: 0.5, facing: 1 }),
        C("arao", 20, "stand", { glow: 0.3, dy: 0.52, facing: 1 }),
        C("servo", 70, "stand", { dy: 0.5, facing: 1, id: "sacerdote2" }),
      ] }),
    ],
  },

  // ------------------------------------------------------------------ Lev 22
  22: {
    start: { terrain: "desert", night: 0.1, glory: 0.66, storm: 0, fire: 0.5, verdure: 0.15 },
    beats: [
      b(1, { by: "deus", props: ATRIO, env: { terrain: "desert", glory: 0.68, fire: 0.5, night: 0.1 }, cast: [ // falou mais o Senhor a Moisés
        C("moises", -150, "kneel", { dy: 0.5, facing: 1 }), ...priests(),
      ] }),
      dv(2), dv(3), dv(4), dv(5), dv(6), dv(7), dv(8), dv(9), dv(10),
      dv(11), dv(12), dv(13), dv(14), dv(15), dv(16),
      b(17, { by: "deus", cast: [ C("moises", -150, "kneel", { dy: 0.5, facing: 1 }), ...priests() ] }), // falou mais o Senhor a Moisés
      dv(18),
      b(19, { by: "deus", q: "macho sem defeito", cast: [                          // a oferta será macho SEM DEFEITO, para ser aceita
        C("arao", 40, "stand", { glow: 0.2, dy: 0.52, facing: -1 }),
        C("rebanho", 150, "stand", { dy: 0.4, id: "oferta" }),
      ] }),
      dv(20), dv(21), dv(22), dv(23), dv(24), dv(25), dv(26), dv(27), dv(28), dv(29), dv(30),
      b(31, { by: "deus", q: "Eu sou o Senhor" }),                                // guardareis os meus mandamentos; Eu sou o Senhor
      b(32, { by: "deus", q: "para que eu seja santificado no meio dos filhos de Israel", env: { glory: 0.85 }, cast: [ // não profanareis o meu santo nome; serei santificado
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }), ...priests(),
      ] }),
      b(33, { by: "deus", q: "para ser o vosso Deus", env: { glory: 0.82 } }),     // que vos tirei do Egito, para ser o vosso Deus
    ],
  },
};
