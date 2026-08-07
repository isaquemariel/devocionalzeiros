// ============================================================================
// NÚMEROS 3–4 — CENA VIVA. A tribo de LEVI: dada a Deus, guarda do santuário.
//
// Nm 3 — LEVI NO LUGAR DOS PRIMOGÊNITOS: em vez dos primogênitos de Israel (que
// eram do Senhor desde a Páscoa), Deus toma a tribo de Levi para o serviço da
// tenda. Contados os levitas: Gérson (a oeste), Coate (ao sul), Merari (ao
// norte), e Moisés/Arão à frente, ao oriente — cercando o tabernáculo.
//
// Nm 4 — O SERVIÇO DE CARGA: os coatitas levam as COISAS SANTÍSSIMAS (a arca, a
// mesa, o candelabro, os altares), cobertas por Arão, sem lhes tocar, para que
// não morram; os gersonitas levam as cortinas; os meraritas, as tábuas e bases.
//
// A VOZ DE DEUS (regra do projeto): a ordem vem do alto (`by: "deus"`), sem
// figura; Arão e os levitas (`arao`/`servo`) ao redor do tabernáculo.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });
const dv = (v: number) => b(v, { by: "deus" });

const ARRAIAL: StagePropSpec[] = [
  { ...P("tent", 0, 1.5, undefined, 0.1), tag: "tabernaculo" },
  P("tent", -260, 1.0, undefined, 0.2),
  P("tent", 200, 1.0, undefined, 0.22),
  P("palm", -310, 1.05, undefined, 0.14),
  P("well", 320, 1.0, undefined, 0.5),
  P("grass", -40, 0.82, undefined, 0.82),
  P("grass", 80, 0.78, undefined, 0.74),
];
// O SERVIÇO DE CARGA (Nm 4): as coisas santas cobertas — a arca velada, levada
// aos ombros pelos coatitas.
const CARGA: StagePropSpec[] = [
  { ...P("tent", -30, 1.4, undefined, 0.1), tag: "tabernaculo" },
  { ...P("ark", 90, 0.85, undefined, 0.5), tag: "arca-testemunho" },
  P("crate", 180, 0.85, undefined, 0.56),
  P("palm", -300, 1.05, undefined, 0.14),
  P("grass", -40, 0.82, undefined, 0.82),
];
const levitas = (): CastPlacement[] => [
  C("arao", -30, "stand", { glow: 0.2, dy: 0.52, facing: 1 }),
  C("servo", 40, "stand", { dy: 0.5, facing: -1, id: "levita" }),
  C("servo", 100, "stand", { dy: 0.46, facing: -1, id: "levita2" }),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Nm 3
  3: {
    start: { terrain: "desert", night: 0.1, glory: 0.62, storm: 0, fire: 0, verdure: 0.2 },
    beats: [
      b(1, { by: "deus", props: ARRAIAL, env: { terrain: "desert", glory: 0.64, night: 0.1, verdure: 0.2 }, cast: [ // as gerações de Arão e Moisés no dia em que o Senhor falou
        C("moises", -150, "kneel", { dy: 0.5, facing: 1 }), C("arao", -100, "kneel", { glow: 0.2, dy: 0.5, facing: 1 }),
      ] }),
      dv(2), dv(3), dv(4), dv(5), dv(6),
      b(7, { by: "deus", cast: levitas() }),                                     // os levitas servirão a Arão e à congregação diante da tenda
      dv(8), dv(9), dv(10), dv(11),
      b(12, { by: "deus", q: "tenho tomado os levitas", cast: levitas() }),      // "tomei os LEVITAS em lugar dos primogênitos"
      b(13, { by: "deus", q: "santifiquei para mim todo o primogênito" }),       // todo primogênito é meu, desde o ferir do Egito
      dv(14), dv(15), dv(16), dv(17), dv(18), dv(19), dv(20), dv(21), dv(22),
      b(23, { by: "deus", cast: [ C("servo", 40, "stand", { dy: 0.5, facing: -1, id: "gerson" }) ] }), // os gersonitas acampam atrás do tabernáculo, ao ocidente
      dv(24), dv(25), dv(26), dv(27),
      b(28, { by: "deus", cast: [ C("servo", 40, "stand", { dy: 0.5, facing: -1, id: "coate" }) ] }), // os coatitas ao sul, guardas do santuário
      dv(29), dv(30), dv(31), dv(32), dv(33),
      b(34, { by: "deus", cast: [ C("servo", 40, "stand", { dy: 0.5, facing: -1, id: "merari" }) ] }), // os meraritas ao norte
      dv(35), dv(36), dv(37),
      b(38, { by: "deus", q: "diante da tenda da congregação", cast: [           // Moisés e Arão acampam ao oriente, diante da tenda
        C("moises", -60, "stand", { dy: 0.5, facing: -1 }), C("arao", 0, "stand", { glow: 0.2, dy: 0.5, facing: -1 }),
      ] }),
      dv(39), dv(40), dv(41), dv(42), dv(43), dv(44),
      b(45, { by: "deus", q: "os levitas serão meus" }),                         // "os levitas serão meus; eu sou o Senhor"
      dv(46), dv(47), dv(48), dv(49), dv(50), dv(51),
    ],
  },

  // ------------------------------------------------------------------ Nm 4
  4: {
    start: { terrain: "desert", night: 0.1, glory: 0.62, storm: 0, fire: 0, verdure: 0.2 },
    beats: [
      b(1, { by: "deus", props: ARRAIAL, env: { terrain: "desert", glory: 0.64, night: 0.1, verdure: 0.2 }, cast: [ // o Senhor fala a Moisés e a Arão
        C("moises", -150, "kneel", { dy: 0.5, facing: 1 }), C("arao", -100, "kneel", { glow: 0.2, dy: 0.5, facing: 1 }),
      ] }),
      dv(2), dv(3), dv(4),
      b(5, { by: "deus", set: "carga", props: CARGA, env: { terrain: "desert", glory: 0.7, night: 0.12 }, cast: [ // ao partir o arraial, Arão cobre a arca do testemunho com o véu
        C("arao", 40, "stand", { glow: 0.3, dy: 0.5, facing: -1 }),
      ] }),
      dv(6), dv(7), dv(8), dv(9), dv(10), dv(11), dv(12), dv(13), dv(14),         // as coisas santas cobertas para o transporte
      b(15, { by: "deus", q: "não tocarão para que não morram", cast: [                  // os coatitas as LEVAM, mas não TOCAM, para que não morram
        C("servo", 40, "stand", { dy: 0.52, facing: -1, id: "coate" }),
        C("servo", 100, "stand", { dy: 0.48, facing: -1, id: "coate2" }),
      ] }),
      dv(16), dv(17), dv(18), dv(19), dv(20), dv(21), dv(22), dv(23), dv(24), dv(25),
      dv(26), dv(27), dv(28), dv(29), dv(30), dv(31), dv(32), dv(33), dv(34), dv(35),
      dv(36), dv(37), dv(38), dv(39), dv(40), dv(41), dv(42), dv(43), dv(44), dv(45),
      dv(46), dv(47), dv(48),
      b(49, { q: "como o Senhor ordenara a Moisés", env: { glory: 0.68 }, cast: [ // contados conforme o Senhor ordenara pela mão de Moisés
        C("moises", -140, "stand", { dy: 0.5, facing: 1 }),
        C("servo", 60, "stand", { dy: 0.5, facing: -1, id: "levita" }),
      ] }),
    ],
  },
};
