// ============================================================================
// NÚMEROS 35–36 — CENA VIVA. As cidades dos levitas e o refúgio; a herança das
// filhas de Zelofeade. FECHO DO LIVRO nas campinas de Moabe.
//
// Nm 35 — AS 48 CIDADES DOS LEVITAS (com seus arrabaldes de pasto) e, entre
// elas, as 6 CIDADES DE REFÚGIO: para lá FOGE o homicida involuntário, longe do
// vingador do sangue, e ali fica seguro até à morte do sumo sacerdote. A
// distinção entre o assassino (que morre) e o que matou por engano (que se
// acolhe). Não se contamine a terra com sangue inocente, pois nela habita o
// Senhor. Ícone: a CORRIDA para a cidade de refúgio.
//
// Nm 36 — AS FILHAS DE ZELOFEADE devem CASAR dentro da tribo de seu pai, para
// que a herança não passe de tribo em tribo. E o FECHO: "estes são os
// mandamentos… nas campinas de Moabe, junto ao Jordão".
//
// A VOZ DE DEUS (regra do projeto): as leis vêm do alto (`by: "deus"`), sem
// figura; quando os chefes de Gileade falam, o `by` é `homem`; quando Moisés
// promulga a ordem do Senhor, o `by` é `moises`.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });
const dv = (v: number) => b(v, { by: "deus" });

// As campinas de Moabe: o povo acampado junto ao Jordão, onde a lei é dada.
const MOABE: StagePropSpec[] = [
  { ...P("tent", -30, 1.4, undefined, 0.12), tag: "tabernaculo" },
  P("tent", -260, 1.0, undefined, 0.2),
  P("palm", -320, 1.05, undefined, 0.14),
  P("well", 320, 1.0, undefined, 0.5),
  P("grass", -60, 0.82, undefined, 0.82),
  P("grass", 60, 0.78, undefined, 0.74),
];
// As cidades muradas dos levitas, com seus arrabaldes de pasto ao redor.
const CIDADES: StagePropSpec[] = [
  { ...P("tower", -220, 1.2, undefined, 0.2), tag: "cidade-levita" },
  P("church", 60, 1.1, undefined, 0.26),
  P("tower", 270, 1.0, undefined, 0.18),
  P("palm", -320, 1.0, undefined, 0.14),
  P("grass", -40, 0.82, undefined, 0.82),
  P("grass", 120, 0.78, undefined, 0.72),
];
// A CIDADE DE REFÚGIO: a muralha à direita, para onde corre o homicida.
const REFUGIO: StagePropSpec[] = [
  { ...P("church", 220, 1.35, undefined, 0.24), tag: "cidade-refugio" },
  P("tower", 310, 1.0, undefined, 0.16),
  P("palm", -300, 1.0, undefined, 0.14),
  P("grass", -80, 0.82, undefined, 0.82),
  P("grass", 20, 0.78, undefined, 0.74),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Nm 35
  35: {
    start: { terrain: "field", night: 0.1, glory: 0.6, storm: 0, fire: 0, verdure: 0.3 },
    beats: [
      b(1, { by: "deus", props: MOABE, env: { terrain: "field", glory: 0.62, night: 0.1, verdure: 0.3 }, cast: [ // o Senhor fala a Moisés nas campinas de Moabe
        C("moises", -150, "kneel", { dy: 0.5, facing: 1 }),
      ] }),
      b(2, { by: "deus", q: "dêem cidades aos levitas", props: CIDADES, env: { terrain: "city", glory: 0.64, night: 0.1, verdure: 0.3 }, cast: [ // deem cidades aos levitas, com seus arrabaldes
        C("servo", -40, "stand", { dy: 0.5, facing: -1, id: "levita" }),
      ] }),
      dv(3), dv(4), dv(5),
      b(6, { by: "deus", q: "seis cidades de refúgio", cast: [                    // entre elas, SEIS cidades de refúgio para o homicida
        C("servo", -40, "point", { dy: 0.5, facing: 1, id: "levita" }),
      ] }),
      b(7, { by: "deus", q: "quarenta e oito cidades" }),                         // ao todo, QUARENTA E OITO cidades aos levitas
      dv(8),
      b(9, { by: "deus" }),                                                       // falou mais o Senhor a Moisés
      dv(10),
      b(11, { by: "deus", q: "para que ali se acolha o homicida", props: REFUGIO, env: { terrain: "field", glory: 0.4, night: 0.16, verdure: 0.3 }, cast: [ // A CORRIDA: o homicida por engano foge para a cidade de refúgio
        C("homem", -60, "walk", { dy: 0.52, facing: 1, id: "homicida" }),
        C("servo", -230, "walk", { dy: 0.54, facing: 1, id: "vingador" }),
      ] }),
      b(12, { by: "deus", q: "por refúgio do vingador do sangue", cast: [         // refúgio contra o VINGADOR do sangue, até o julgamento
        C("homem", -60, "walk", { dy: 0.52, facing: 1, id: "homicida" }),
        C("servo", -230, "walk", { dy: 0.54, facing: 1, id: "vingador" }),
      ] }),
      dv(13), dv(14), dv(15),
      dv(16), dv(17), dv(18),                                                     // ferir com ferro, pedra ou pau: homicida é, e morrerá
      b(19, { by: "deus", q: "O vingador do sangue matará o homicida", env: { terrain: "field", glory: 0.14, night: 0.4, verdure: 0.24 }, props: [ // o ASSASSINO voluntário: o vingador o mata
        { ...P("clouds", -120, 1.2, undefined, 0.72), sky: true },
        P("tower", 270, 1.0, undefined, 0.18),
        P("palm", -300, 1.0, undefined, 0.14),
      ], cast: [
        C("servo", -40, "raise", { dy: 0.52, facing: 1, id: "vingador" }),
        C("homem", 80, "lie", { dy: 0.5, facing: -1, id: "homicida" }),
      ] }),
      dv(20), dv(21),
      dv(22), dv(23),                                                            // porém o que empurrou sem inimizade, sem intenção
      b(24, { by: "deus", q: "a congregação julgará", env: { terrain: "city", glory: 0.5, night: 0.12, verdure: 0.28 }, props: CIDADES, cast: [ // a CONGREGAÇÃO julga entre o que feriu e o vingador
        C("multidao", 150, "stand", { dy: 0.44 }),
        C("homem", -60, "stand", { dy: 0.5, facing: -1, id: "homicida" }),
        C("servo", -180, "stand", { dy: 0.52, facing: 1, id: "vingador" }),
      ] }),
      b(25, { by: "deus", q: "até à morte do sumo sacerdote", props: REFUGIO, env: { terrain: "field", glory: 0.6, night: 0.1, verdure: 0.32 }, cast: [ // seguro na cidade até à morte do SUMO SACERDOTE
        C("homem", 60, "stand", { dy: 0.5, facing: 1, id: "homicida" }),
        C("servo", -60, "stand", { glow: 0.25, dy: 0.5, facing: 1, id: "eleazar" }),
      ] }),
      dv(26), dv(27), dv(28), dv(29),
      b(30, { by: "deus", q: "conforme depoimento de testemunhas" }),            // condena-se por TESTEMUNHAS, nunca por uma só
      dv(31), dv(32),
      b(33, { by: "deus", q: "o sangue faz profanar a terra", env: { terrain: "field", glory: 0.16, night: 0.36, verdure: 0.2 }, props: [ // o sangue inocente PROFANA a terra
        { ...P("clouds", -100, 1.25, undefined, 0.7), sky: true },
        { ...P("clouds", 160, 1.1, undefined, 0.6), sky: true },
        P("palm", -300, 1.0, undefined, 0.14),
      ] }),
      b(34, { by: "deus", q: "no meio dos filhos de Israel", env: { terrain: "field", glory: 0.7, night: 0.08, verdure: 0.34 }, props: MOABE, cast: [ // não contamineis a terra, pois EU habito no meio dela
        C("moises", -150, "bow", { dy: 0.5, facing: 1 }),
      ] }),
    ],
  },

  // ------------------------------------------------------------------ Nm 36
  36: {
    start: { terrain: "field", night: 0.1, glory: 0.6, storm: 0, fire: 0, verdure: 0.32 },
    beats: [
      b(1, { q: "falaram diante de Moisés", props: MOABE, env: { terrain: "field", glory: 0.62, night: 0.1, verdure: 0.32 }, cast: [ // os chefes de Gileade vêm falar diante de Moisés e dos príncipes
        C("homem", -60, "stand", { dy: 0.5, facing: 1, id: "gileade" }),
        C("moises", -190, "stand", { dy: 0.5, facing: 1 }),
        C("servo", -260, "stand", { glow: 0.2, dy: 0.5, facing: 1, id: "eleazar" }),
      ] }),
      b(2, { by: "homem", q: "a herança do nosso irmão Zelofeade se desse às suas filhas", cast: [ // a herança de Zelofeade foi dada às suas FILHAS
        C("homem", -60, "point", { dy: 0.5, facing: 1, id: "gileade" }),
        C("moises", -190, "stand", { dy: 0.5, facing: 1 }),
        C("mulherComum", 160, "stand", { dy: 0.46, id: "filhas" }),
      ] }),
      b(3, { by: "homem" }),                                                      // se casarem fora, a herança passa para outra tribo
      b(4, { by: "homem" }),                                                      // e no jubileu ficaria de vez com a outra tribo
      b(5, { by: "moises", cast: [                                               // Moisés dá ordem segundo o mandado do Senhor
        C("moises", -60, "point", { dy: 0.5, facing: 1 }),
        C("homem", 90, "stand", { dy: 0.5, facing: -1, id: "gileade" }),
      ] }),
      b(6, { by: "moises", q: "contanto que se casem na família da tribo de seu pai", cast: [ // casem-se dentro da TRIBO DE SEU PAI
        C("moises", -80, "point", { dy: 0.5, facing: 1 }),
        C("mulherComum", 140, "stand", { dy: 0.46, id: "filhas" }),
      ] }),
      b(7, { by: "moises", q: "não passará de tribo em tribo" }),                 // a herança NÃO passará de tribo em tribo
      b(8, { by: "moises" }),
      b(9, { by: "moises" }),
      b(10, { cast: [                                                            // e assim fizeram as filhas de Zelofeade
        C("mulherComum", 60, "stand", { dy: 0.48, id: "filhas" }),
        C("moises", -160, "stand", { dy: 0.5, facing: 1 }),
      ] }),
      b(11, { q: "filhas de Zelofeade, se casaram", cast: [                       // Maalá, Tirza, Hogla, Milca e Noa se CASARAM
        C("mulherComum", 20, "stand", { dy: 0.5, id: "filhas" }),
        C("mulherComum", 120, "stand", { scale: 0.9, dy: 0.44, id: "filhas2" }),
        C("homem", -80, "stand", { dy: 0.5, facing: 1, id: "primos" }),
      ] }),
      b(12, { q: "a sua herança ficou na tribo da família de seu pai", props: CIDADES, env: { terrain: "city", glory: 0.64, night: 0.1, verdure: 0.3 }, cast: [ // a herança FICOU na tribo da família de seu pai
        C("mulherComum", 40, "stand", { dy: 0.5, id: "filhas" }),
      ] }),
      b(13, { q: "nas campinas de Moabe, junto ao Jordão", props: MOABE, env: { terrain: "field", glory: 0.72, night: 0.08, verdure: 0.34 }, cast: [ // FECHO: os mandamentos dados nas campinas de Moabe
        C("moises", -120, "raise", { dy: 0.5, facing: 1 }),
        C("multidao", 150, "stand", { dy: 0.44 }),
      ] }),
    ],
  },
};
