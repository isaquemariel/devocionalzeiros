// ============================================================================
// LEVÍTICO 27 — CENA VIVA. Votos, avaliações e o dízimo. O FIM de Levítico.
//
// O livro que começou no altar termina na consagração voluntária: o que se
// dedica ao Senhor por voto — pessoas, animais, casas, campos — e o resgate de
// cada um segundo a avaliação do santuário. E o DÍZIMO da terra e do gado, que
// "é do Senhor; santo é ao Senhor" (v.30,32). Fecha com o selo de todo o livro:
// "Estes são os mandamentos que o Senhor ordenou a Moisés no monte Sinai".
//
// A VOZ DE DEUS (regra do projeto): tudo é instrução do alto (`by: "deus"`),
// da tenda, sem figura; o sacerdote avalia; o povo consagra os seus votos.
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
  { ...P("altar", 70, 1.2, 0.6, 0.44), tag: "altar-holocausto" },
  P("tower", -300, 1.15, undefined, 0.06),
  P("palm", -250, 1.0, undefined, 0.16),
  P("crate", -140, 0.8, undefined, 0.62),
  P("stall", 200, 0.9, undefined, 0.5),
  P("grass", -60, 0.8, undefined, 0.82),
];

export const CHAPTERS: Record<number, StageScript> = {
  27: {
    start: { terrain: "desert", night: 0.1, glory: 0.68, storm: 0, fire: 0.5, verdure: 0.2 },
    beats: [
      b(1, { by: "deus", props: ATRIO, env: { terrain: "desert", glory: 0.7, fire: 0.5, night: 0.1 }, cast: [ // falou mais o Senhor a Moisés
        C("moises", -150, "kneel", { dy: 0.5, facing: 1 }),
        C("arao", 30, "stand", { dy: 0.52, facing: -1 }),
      ] }),
      b(2, { by: "deus", q: "fizer particular voto", cast: [                      // quem fizer VOTO: segundo a avaliação, as pessoas ao Senhor
        C("homem", -50, "stand", { dy: 0.54, facing: 1, id: "votante" }),
        C("arao", 40, "stand", { dy: 0.52, facing: -1 }),
      ] }),
      dv(3), dv(4), dv(5), dv(6), dv(7), dv(8),                                   // as avaliações de homem, mulher, jovem, idoso, pobre
      dv(9), dv(10), dv(11), dv(12), dv(13),                                      // os animais votados e o seu resgate
      dv(14), dv(15),                                                            // a casa consagrada e o seu resgate
      dv(16), dv(17), dv(18), dv(19), dv(20), dv(21),                            // o campo consagrado e o ano do jubileu
      dv(22), dv(23), dv(24), dv(25),
      dv(26), dv(27), dv(28), dv(29),
      b(30, { by: "deus", q: "santas são ao Senhor", env: { glory: 0.82 }, cast: [ // o DÍZIMO da terra e do fruto: é do Senhor, santo ao Senhor
        C("arao", 40, "raise", { dy: 0.52, facing: -1 }),
        C("moises", -150, "stand", { dy: 0.5, facing: 1 }),
      ] }),
      dv(31),
      b(32, { by: "deus", q: "o dízimo será santo ao Senhor", cast: [             // o dízimo do gado, o que passa debaixo da vara: santo
        C("arao", 40, "stand", { dy: 0.52, facing: -1 }),
        C("rebanho", 180, "walk", { dy: 0.4, facing: -1, id: "dizimo" }),
      ] }),
      dv(33),
      b(34, { by: "deus", q: "no monte Sinai", env: { glory: 0.85 }, cast: [       // o selo do livro: os mandamentos dados no monte Sinai
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
        C("arao", 30, "stand", { dy: 0.52, facing: -1 }),
      ] }),
    ],
  },
};
