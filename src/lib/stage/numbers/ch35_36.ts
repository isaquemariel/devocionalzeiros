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
      b(9, {}),                                                       // falou mais o Senhor a Moisés
      dv(10),
      b(11, { by: "deus", q: "para que ali se acolha o homicida", props: REFUGIO, env: { terrain: "field", glory: 0.62, night: 0.3, verdure: 0.3 }, cast: [ // A CORRIDA: o homicida por engano foge para a cidade de refúgio
        C("homem", -60, "walk", { dy: 0.52, facing: 1, id: "homicida" }),
        C("servo", -230, "walk", { dy: 0.54, facing: 1, id: "vingador" }),
      ] }),
      b(12, { env: { glory: 0.62, night: 0.3 }, by: "deus", q: "por refúgio do vingador do sangue", cast: [         // refúgio contra o VINGADOR do sangue, até o julgamento
        C("homem", -60, "walk", { dy: 0.52, facing: 1, id: "homicida" }),
        C("servo", -230, "walk", { dy: 0.54, facing: 1, id: "vingador" }),
      ] }),
      b(13, { by: "deus", q: "haverá seis cidades de refúgio para vós", set: "seis-cidades", props: [ // as SEIS cidades, contadas uma a uma no horizonte
        { ...P("church", -250, 1.05, undefined, 0.2), tag: "cidade-refugio" },
        P("tower", -150, 0.95, undefined, 0.26),
        P("church", -50, 1.0, undefined, 0.22),
        P("tower", 55, 0.95, undefined, 0.28),
        P("church", 160, 1.0, undefined, 0.22),
        P("tower", 265, 0.95, undefined, 0.26),
        P("grass", 0, 0.8, undefined, 0.84),
      ], env: { terrain: "city", glory: 0.66, night: 0.1, verdure: 0.32 } }),
      b(14, { by: "deus", q: "Três destas cidades dareis além do Jordão", set: "tres-e-tres", props: [ // TRÊS além do Jordão e TRÊS na terra de Canaã
        { ...P("river", 0, 1.5, undefined, 0.62), tag: "jordao" },
        P("church", -235, 1.05, undefined, 0.2),
        P("tower", -120, 0.95, undefined, 0.28),
        P("church", 130, 1.05, undefined, 0.2),
        P("tower", 255, 0.95, undefined, 0.28),
        P("palm", -320, 1.0, undefined, 0.14),
      ], env: { terrain: "field", glory: 0.62, night: 0.1, verdure: 0.4, water: 0.4 } }),
      b(15, { by: "deus", q: "e para o estrangeiro, e para o que se hospedar no meio deles", set: "porta-do-refugio", props: [ // a porta aberta: para o israelita, o estrangeiro e o hóspede
        { ...P("church", 90, 1.5, undefined, 0.3), tag: "cidade-refugio" },
        { ...P("door", -50, 1.05, undefined, 0.52), tag: "porta" },
        P("tower", 285, 1.05, undefined, 0.2),
        P("grass", -230, 0.82, undefined, 0.84),
      ], env: { terrain: "city", glory: 0.7, night: 0.12, verdure: 0.28, water: 0 }, cast: [
        C("homem", -190, "walk", { dy: 0.6, facing: -1, id: "homicida" }),
        C("homem", -280, "walk", { scale: 0.94, dy: 0.54, facing: -1, id: "estrangeiro-acolhido" }),
      ] }),
      b(16, { by: "deus", q: "se o ferir com instrumento de ferro e morrer, homicida é", set: "homicidio-ferro", props: [ // com instrumento de FERRO — e isso não é engano, é homicídio
        P("sword", 40, 1.1, undefined, 0.5),
        P("rock", -230, 1.15, undefined, 0.3),
        P("tower", 285, 0.95, undefined, 0.18),
        P("grass", 150, 0.75, undefined, 0.86),
      ], env: { terrain: "field", glory: 0.3, night: 0.62, storm: 0.2, verdure: 0.2 }, cast: [
        C("homem", -80, "lie", { scale: 1.35, dy: 0.72, facing: 1, id: "ferido-de-morte" }),
        C("homem", 150, "stand", { dy: 0.6, facing: -1, id: "homicida-voluntario" }),
      ] }),
      b(17, { by: "deus", q: "se lhe ferir com uma pedrada, de que possa morrer", set: "homicidio-pedra", props: [ // com uma PEDRADA
        P("rock", 60, 1.0, undefined, 0.6),
        P("rock", -180, 1.35, undefined, 0.26),
        P("rock", 265, 1.1, undefined, 0.36),
        P("grass", -60, 0.75, undefined, 0.86),
      ], env: { terrain: "desert", glory: 0.28, night: 0.66, storm: 0.15, verdure: 0.08 }, cast: [
        C("homem", 175, "lie", { scale: 1.35, dy: 0.74, facing: -1, id: "ferido-de-morte" }),
        C("homem", -70, "raise", { dy: 0.62, facing: -1, id: "homicida-voluntario" }),
      ] }),
      b(18, { by: "deus", q: "com instrumento de pau que tiver na mão", set: "homicidio-pau", props: [ // ou com instrumento de PAU que tiver na mão
        P("tree", -240, 1.2, undefined, 0.24),
        P("tree", 250, 1.1, undefined, 0.3),
        P("bush", 110, 0.95, undefined, 0.52),
        P("grass", -30, 0.78, undefined, 0.88),
      ], env: { terrain: "field", glory: 0.26, night: 0.7, storm: 0.2, verdure: 0.3 }, cast: [
        C("homem", -110, "raise", { dy: 0.6, facing: -1, id: "homicida-voluntario" }),
        C("homem", 30, "lie", { scale: 1.35, dy: 0.76, facing: 1, id: "ferido-de-morte" }),
      ] }),
      b(19, { by: "deus", q: "O vingador do sangue matará o homicida", env: { terrain: "field", glory: 0.62, night: 0.4, verdure: 0.24 }, props: [ // o ASSASSINO voluntário: o vingador o mata
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
      b(26, { by: "deus", q: "sair dos limites da cidade de refúgio", set: "limite-do-refugio", props: [ // se ele SAIR dos limites da cidade onde se acolheu
        { ...P("church", -200, 1.35, undefined, 0.24), tag: "cidade-refugio" },
        P("rock", 40, 0.9, undefined, 0.58),
        P("rock", 130, 0.8, undefined, 0.5),
        P("grass", 265, 0.8, undefined, 0.82),
      ], env: { terrain: "field", glory: 0.54, night: 0.34, verdure: 0.26 }, cast: [
        C("homem", 195, "walk", { dy: 0.64, facing: -1, id: "homicida" }),
      ] }),
      b(27, { by: "deus", q: "e o matar, não será culpado do sangue", env: { glory: 0.24, night: 0.7, storm: 0.2 }, props: [ // e o vingador do sangue o acha FORA — e não é culpado
        { ...P("church", -290, 1.05, undefined, 0.2), tag: "cidade-refugio" },
        P("rock", 100, 1.1, undefined, 0.42),
        P("grass", -60, 0.75, undefined, 0.88),
      ], cast: [
        C("homem", 210, "lie", { scale: 1.35, dy: 0.74, facing: -1, id: "homicida" }),
        C("servo", 20, "raise", { dy: 0.62, facing: -1, id: "vingador" }),
      ] }),
      b(28, { by: "deus", q: "depois da morte do sumo sacerdote, o homicida voltará à terra da sua possessão", set: "volta-a-possessao", props: [ // morto o sumo sacerdote, ele VOLTA à terra da sua possessão
        { ...P("church", -280, 1.0, undefined, 0.18), tag: "cidade-refugio" },
        P("tent", 150, 1.15, undefined, 0.38),
        P("tree", 275, 1.15, undefined, 0.22),
        P("well", 40, 0.95, undefined, 0.56),
        P("grass", -80, 0.85, undefined, 0.84),
      ], env: { terrain: "field", glory: 0.7, night: 0.08, storm: 0, verdure: 0.58 }, cast: [
        C("homem", -140, "walk", { dy: 0.62, facing: -1, id: "homicida" }),
      ] }),
      b(29, { by: "deus", q: "por estatuto de direito às vossas gerações", set: "estatuto", props: [ // estatuto de direito às gerações, em todas as habitações
        { ...P("scroll", -180, 1.15, undefined, 0.56), tag: "lei-na-boca" },
        { ...P("tower", 90, 1.15, undefined, 0.24), tag: "cidade-levita" },
        P("tent", 250, 1.05, undefined, 0.36),
        P("grass", 20, 0.8, undefined, 0.84),
      ], env: { terrain: "city", glory: 0.68, night: 0.1, verdure: 0.34 } }),
      b(30, { by: "deus", q: "conforme depoimento de testemunhas", set: "testemunhas", props: CIDADES, env: { terrain: "city", glory: 0.56, night: 0.14, verdure: 0.3 }, cast: [ // só por DUAS testemunhas — nunca por uma só
        C("homem", -110, "stand", { dy: 0.6, facing: -1, id: "testemunha" }),
        C("homem", -20, "stand", { scale: 0.96, dy: 0.56, facing: -1, id: "testemunha2" }),
        C("multidao", 200, "stand", { scale: 0.88, dy: 0.44 }),
      ] }),
      b(31, { by: "deus", q: "não recebereis resgate pela vida do homicida", set: "resgate-recusado", props: [ // não há RESGATE que compre a vida do homicida culpado
        { ...P("bowl", -20, 1.2, undefined, 0.62), tag: "oferta-alcada" },
        P("crate", 120, 0.9, undefined, 0.7),
        P("tower", -250, 1.1, undefined, 0.22),
        P("rock", 270, 1.0, undefined, 0.4),
      ], env: { terrain: "city", glory: 0.32, night: 0.6, storm: 0.15, verdure: 0.16 }, cast: [
        C("servo", 210, "point", { dy: 0.6, facing: -1, id: "vingador" }),
      ] }),
      b(32, { by: "deus", q: "não tomareis resgate por aquele que se acolher à sua cidade de refúgio", props: [ // nem resgate pelo que se acolheu, antes da morte do sacerdote
        { ...P("church", 170, 1.4, undefined, 0.26), tag: "cidade-refugio" },
        P("bowl", -160, 1.0, undefined, 0.64),
        P("palm", -310, 1.0, undefined, 0.14),
        P("grass", 20, 0.8, undefined, 0.84),
      ], env: { terrain: "field", glory: 0.56, night: 0.26, storm: 0, verdure: 0.3 }, cast: [
        C("homem", 60, "stand", { dy: 0.6, facing: -1, id: "homicida" }),
      ] }),
      b(33, { by: "deus", q: "o sangue faz profanar a terra", env: { terrain: "field", glory: 0.62, night: 0.36, verdure: 0.2 }, props: [ // o sangue inocente PROFANA a terra
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
