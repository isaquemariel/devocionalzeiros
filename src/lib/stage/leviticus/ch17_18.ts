// ============================================================================
// LEVÍTICO 17–18 — CENA VIVA. O sangue é a vida; a santidade da família.
//
// Lev 17 — O SANGUE E A VIDA: todo sacrifício se traz à porta da tenda (não ao
// campo, não aos demônios); e o sangue não se come — "porque a vida da carne
// está no sangue; pelo que vo-lo tenho dado sobre o altar, para fazer expiação
// pelas vossas almas" (v.11): o coração do evangelho no coração de Levítico.
//
// Lev 18 — A SANTIDADE DA FAMÍLIA: contra as abominações do Egito e de Canaã.
// Capítulo encenado com DECORO ABSOLUTO — o palco NÃO representa nada do que a
// lei proíbe; a dramaturgia é só a voz do alto e o refrão que estrutura tudo:
// "EU SOU O SENHOR". A terra "vomita" quem a contamina; o povo é chamado a
// viver diferente das nações.
//
// A VOZ DE DEUS (regra do projeto): tudo é instrução do alto (`by: "deus"`),
// sem figura. Em 17, Arão ministra ao altar; em 18, só o povo ouve, sóbrio.
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
const ARRAIAL: StagePropSpec[] = [
  { ...P("tent", -40, 1.35, undefined, 0.1), tag: "tabernaculo" },
  P("tent", -260, 1.0, undefined, 0.2),
  P("tent", 250, 1.05, undefined, 0.18),
  P("palm", -300, 1.05, undefined, 0.14),
  P("well", 300, 1.0, undefined, 0.5),
  P("grass", -60, 0.82, undefined, 0.82),
  P("grass", 60, 0.78, undefined, 0.74),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Lev 17
  17: {
    start: { terrain: "desert", night: 0.1, glory: 0.65, storm: 0, fire: 0.55, verdure: 0.15 },
    beats: [
      b(1, { by: "deus", props: ATRIO, env: { terrain: "desert", glory: 0.68, fire: 0.55, night: 0.1 }, cast: [ // falou mais o Senhor a Moisés
        C("moises", -150, "kneel", { dy: 0.5, facing: 1 }),
        C("arao", 40, "stand", { dy: 0.52, facing: -1 }),
      ] }),
      b(2, { by: "deus", cast: [                                                  // "Fala a Arão, aos filhos e a todo o Israel"
        C("moises", -150, "point", { dy: 0.5, facing: 1 }),
        C("multidao", 130, "stand", { dy: 0.46 }),
      ] }),
      b(3, { by: "deus", cast: [                                                  // quem degolar boi, cordeiro ou cabra no arraial ou fora
        C("homem", -40, "stand", { dy: 0.54, facing: 1, id: "ofertante" }),
        C("rebanho", 160, "stand", { dy: 0.4, id: "gado" }),
        C("arao", 40, "stand", { dy: 0.52, facing: -1 }),
      ] }),
      dv(4),
      b(5, { by: "deus", q: "à porta da tenda da congregação", cast: [            // que tragam à porta da tenda, por sacrifícios pacíficos
        C("homem", -40, "walk", { dy: 0.54, facing: 1, id: "ofertante" }),
        C("arao", 46, "stand", { dy: 0.5, facing: -1 }),
      ] }),
      b(6, { by: "deus", q: "por cheiro suave ao Senhor", env: { fire: 0.7 }, cast: [ // o sangue no altar; a gordura queimada, cheiro suave
        C("arao", 46, "raise", { dy: 0.5, facing: -1 }),
      ] }),
      b(7, { by: "deus" }),                                                       // nunca mais aos demônios; estatuto perpétuo
      dv(8), dv(9),
      b(10, { by: "deus", env: { glory: 0.6 } }),                                 // quem comer sangue: porei a minha face contra ele
      b(11, { by: "deus", q: "a vida da carne está no sangue", env: { glory: 0.85 }, cast: [ // "A VIDA DA CARNE ESTÁ NO SANGUE… para fazer expiação"
        C("arao", 46, "raise", { dy: 0.5, facing: -1 }),
        C("moises", -150, "stand", { dy: 0.5, facing: 1 }),
      ] }),
      b(12, { by: "deus", q: "Nenhum dentre vós comerá sangue" }),                // ninguém comerá sangue
      b(13, { by: "deus" }),                                                      // o caçador derramará o sangue e o cobrirá com pó
      b(14, { by: "deus", q: "a vida de toda a carne é o seu sangue", env: { glory: 0.8 } }), // a vida de toda a carne é o seu sangue
      dv(15), dv(16),
    ],
  },

  // ------------------------------------------------------------------ Lev 18
  // A santidade da família. Palco SÓBRIO, sem representar nada do proibido; só
  // a voz do alto e o refrão "Eu sou o Senhor". Env: glória serena; a terra
  // que "vomita" os contaminadores (storm leve nos versos do juízo).
  18: {
    start: { terrain: "field", night: 0.12, glory: 0.62, storm: 0, fire: 0, verdure: 0.4 },
    beats: [
      b(1, { by: "deus", props: ARRAIAL, env: { terrain: "field", glory: 0.65, night: 0.12, verdure: 0.4 }, cast: [ // falou mais o Senhor a Moisés
        C("moises", -150, "kneel", { dy: 0.5, facing: 1 }),
        C("multidao", 120, "stand", { dy: 0.46 }),
      ] }),
      b(2, { by: "deus", q: "Eu sou o Senhor vosso Deus", env: { glory: 0.72 } }), // "Eu sou o Senhor vosso Deus"
      b(3, { by: "deus" }),                                                       // não fareis como o Egito nem como Canaã
      b(4, { by: "deus", q: "Eu sou o Senhor vosso Deus" }),                      // fareis os meus juízos; Eu sou o Senhor vosso Deus
      b(5, { by: "deus", q: "viverá por eles", env: { glory: 0.8 } }),            // observando-os o homem, VIVERÁ por eles
      dv(6), dv(7), dv(8), dv(9), dv(10), dv(11), dv(12), dv(13),                 // as parentelas cuja nudez não se descobre
      dv(14), dv(15), dv(16), dv(17), dv(18), dv(19), dv(20),                     // a santidade do matrimônio e do próximo
      b(21, { by: "deus", q: "perante Moloque", env: { storm: 0.12 } }),         // não farás passar teu filho pelo fogo a Moloque
      dv(22), dv(23),
      b(24, { by: "deus", env: { storm: 0.1 } }),                                // não vos contamineis: assim se contaminaram as nações
      b(25, { by: "deus", q: "a terra vomita os seus moradores", env: { storm: 0.18 } }), // a terra contaminada VOMITA os seus moradores
      dv(26), dv(27), dv(28),
      b(29, { by: "deus" }),                                                     // quem fizer estas abominações será extirpado
      b(30, { by: "deus", q: "Eu sou o Senhor vosso Deus", env: { storm: 0, glory: 0.78 }, cast: [ // guardai o meu mandamento; Eu sou o Senhor vosso Deus
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
        C("multidao", 120, "bow", { dy: 0.46 }),
      ] }),
    ],
  },
};
