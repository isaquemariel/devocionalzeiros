// ============================================================================
// NÚMEROS 9–10 — CENA VIVA. A segunda PÁSCOA no deserto; a NUVEM e o FOGO sobre
// o tabernáculo; as TROMBETAS de prata; e a PARTIDA do Sinai em ordem de marcha.
//
// Nm 9 — A SEGUNDA PÁSCOA: Israel celebra a páscoa no deserto de Sinai, no ano
// segundo. Os imundos por corpo morto pedem lugar, e o Senhor institui a páscoa
// do segundo mês. E o grande ícone: a NUVEM cobre o tabernáculo, e de noite tem
// APARÊNCIA DE FOGO. Quando a nuvem se alça, o povo PARTE; quando pousa, ACAMPA —
// a coluna (`pillar`) guia todo o caminho.
//
// Nm 10 — AS TROMBETAS E A PARTIDA: duas trombetas de prata (`trumpet`) para
// convocar e para partir. Então a nuvem se alça e Israel parte do Sinai em ordem
// de marcha, a ARCA à frente, buscando lugar de descanso. Ao partir a arca,
// Moisés clama: "LEVANTA-TE, SENHOR"; ao pousar: "VOLTA, ó SENHOR".
//
// A VOZ DE DEUS (regra do projeto): a ordem vem do alto (`by: "deus"`), sem
// figura; a presença guia como coluna de nuvem/fogo (`pillar`, teofania visível).
// Moisés, ao bradar sobre a arca (v35-36), fala como homem — `by: "moises"`.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });
const dv = (v: number) => b(v, { by: "deus" });

// Arraial base no deserto: o tabernáculo ao centro, o altar com fogo, palmeira,
// poço e capim.
const ARRAIAL: StagePropSpec[] = [
  { ...P("tent", -20, 1.5, undefined, 0.12), tag: "tabernaculo" },
  P("altar", 110, 0.88, 0.5, 0.5),
  P("palm", -320, 1.05, undefined, 0.14),
  P("well", 320, 1.0, undefined, 0.5),
  P("grass", -60, 0.82, undefined, 0.82),
  P("grass", 60, 0.78, undefined, 0.74),
];
// As TROMBETAS de prata ao lado do tabernáculo.
const TROMBETAS: StagePropSpec[] = [
  { ...P("tent", -30, 1.5, undefined, 0.14), tag: "tabernaculo" },
  P("altar", 130, 0.82, 0.4, 0.5),
  { ...P("trumpet", 40, 0.95, undefined, 0.5), tag: "trombetas-prata" },
  P("palm", -320, 1.0, undefined, 0.14),
  P("grass", 70, 0.8, undefined, 0.78),
];
// A NUVEM de dia sobre a tenda: a coluna pousada sobre o tabernáculo, a arca guardada.
const NUVEM_DIA: StagePropSpec[] = [
  { ...P("tent", -20, 1.5, undefined, 0.22), tag: "tabernaculo" },
  { ...P("pillar", -20, 1.35, undefined, 0.04), tag: "coluna-nuvem-fogo" },
  { ...P("ark", 120, 0.8, undefined, 0.5), tag: "arca-testemunho" },
  P("palm", -330, 1.0, undefined, 0.14),
  P("grass", 70, 0.8, undefined, 0.78),
];
// A NUVEM de noite com APARÊNCIA DE FOGO sobre a tenda.
const NUVEM_NOITE: StagePropSpec[] = [
  { ...P("tent", -20, 1.5, undefined, 0.22), tag: "tabernaculo" },
  { ...P("pillar", -20, 1.4, 0.85, 0.04), tag: "coluna-nuvem-fogo" },
  P("grass", 70, 0.8, undefined, 0.78),
];
// A MARCHA: a coluna guiando à frente, a arca da aliança adiante do povo.
const MARCHA: StagePropSpec[] = [
  { ...P("pillar", -270, 1.35, undefined, 0.06), tag: "coluna-nuvem-fogo" },
  { ...P("ark", -150, 0.82, undefined, 0.5), tag: "arca-testemunho" },
  P("palm", 330, 1.0, undefined, 0.16),
  P("grass", 130, 0.78, undefined, 0.8),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Nm 9
  9: {
    start: { terrain: "desert", night: 0.1, glory: 0.6, storm: 0, fire: 0, verdure: 0.2 },
    beats: [
      b(1, { by: "deus", props: ARRAIAL, env: { terrain: "desert", glory: 0.62, night: 0.1, verdure: 0.2 }, cast: [ // o Senhor fala a Moisés no deserto de Sinai, no ano segundo
        C("moises", -150, "kneel", { dy: 0.5, facing: 1 }),
      ] }),
      b(2, { by: "deus", q: "Celebrem os filhos de Israel a páscoa", cast: [       // "celebrem a PÁSCOA a seu tempo determinado"
        C("moises", -150, "stand", { dy: 0.5, facing: 1 }),
        C("multidao", 150, "stand", { dy: 0.46 }),
      ] }),
      b(3, { by: "deus", q: "a celebrareis; segundo todos os seus estatutos" }),  // no dia catorze, segundo todos os seus estatutos
      b(4, { by: "moises", q: "que celebrassem a páscoa", cast: [                 // Moisés manda que celebrassem a páscoa
        C("moises", -130, "point", { dy: 0.5, facing: 1 }),
        C("multidao", 150, "stand", { dy: 0.46 }),
      ] }),
      b(5, { q: "Então celebraram a páscoa", env: { glory: 0.6 }, cast: [         // o povo celebra a páscoa no deserto (o altar arde ao lado)
        C("arao", -50, "stand", { glow: 0.2, dy: 0.5, facing: -1 }),
        C("multidao", 120, "kneel", { dy: 0.46 }),
        C("multidao", 210, "kneel", { scale: 0.9, dy: 0.42, id: "povo2" }),
      ] }),
      b(6, { q: "não podiam celebrar a páscoa naquele dia", cast: [               // uns imundos por corpo morto não podiam celebrar
        C("homem", -30, "stand", { dy: 0.52, facing: 1, id: "imundo" }),
        C("moises", -170, "stand", { dy: 0.5, facing: 1 }),
        C("arao", -120, "stand", { glow: 0.2, dy: 0.5, facing: 1 }),
      ] }),
      b(7, { by: "homem", q: "por que seríamos privados de oferecer a oferta do Senhor", cast: [ // os homens perguntam: por que seríamos privados de oferecer?
        C("homem", 40, "stand", { dy: 0.52, facing: -1, id: "imundo" }),
        C("moises", -160, "stand", { dy: 0.5, facing: 1 }),
      ] }),
      b(8, { by: "moises", q: "Esperai, e eu ouvirei o que o Senhor vos ordenará", cast: [ // Moisés: "esperai, e ouvirei o que o Senhor ordenará"
        C("moises", -120, "raise", { dy: 0.5, facing: -1 }),
        C("homem", 40, "stand", { dy: 0.52, facing: -1, id: "imundo" }),
      ] }),
      b(9, { by: "deus", cast: [ C("moises", -150, "kneel", { dy: 0.5, facing: 1 }) ] }), // então fala o Senhor a Moisés
      b(10, { by: "deus", q: "contudo ainda celebrará a páscoa ao Senhor" }),     // o imundo ou o de jornada longa ainda celebrará
      b(11, { by: "deus", q: "com pães ázimos e ervas amargas a comerão" }),      // no mês segundo, com pães ázimos e ervas amargas
      b(12, { by: "deus", q: "não quebrarão osso algum" }),                       // nada deixarão até a manhã; osso algum não quebrarão
      dv(13),
      b(14, { by: "deus", q: "um mesmo estatuto haverá para vós" }),              // um mesmo estatuto para o estrangeiro e o natural
      // v15-23 — O ÍCONE: a NUVEM e o FOGO guiando o arraial.
      b(15, { props: NUVEM_DIA, q: "a nuvem cobriu o tabernáculo", env: { terrain: "desert", glory: 0.5, night: 0.15, verdure: 0.2 }, cast: [ // a nuvem cobriu o tabernáculo sobre a tenda do testemunho
        C("multidao", 190, "stand", { dy: 0.44 }),
      ] }),
      b(16, { props: NUVEM_NOITE, q: "de noite havia aparência de fogo", env: { terrain: "desert", night: 0.85, glory: 0.12, fire: 0.4, verdure: 0.2 }, cast: [ // de noite, sobre a tenda, aparência de FOGO
        C("multidao", 190, "stand", { dy: 0.44 }),
      ] }),
      b(17, { props: MARCHA, q: "os filhos de Israel partiam", env: { terrain: "desert", glory: 0.55, night: 0.1, verdure: 0.2 }, cast: [ // alçando-se a nuvem, os filhos de Israel partiam
        C("multidao", 120, "walk", { dy: 0.46 }),
        C("multidao", 210, "walk", { scale: 0.9, dy: 0.42, id: "povo2" }),
      ] }),
      b(18, { q: "Segundo a ordem do Senhor" }),                                  // partiam e acampavam segundo a ordem do Senhor
      dv(19),
      dv(20),
      dv(21),
      dv(22),
      b(23, { q: "cumpriam o seu dever para com o Senhor", env: { glory: 0.6 } }), // cumpriam o seu dever segundo a ordem do Senhor por Moisés
    ],
  },

  // ------------------------------------------------------------------ Nm 10
  10: {
    start: { terrain: "desert", night: 0.1, glory: 0.6, storm: 0, fire: 0, verdure: 0.2 },
    beats: [
      b(1, { by: "deus", props: ARRAIAL, env: { terrain: "desert", glory: 0.62, night: 0.1, verdure: 0.2 }, cast: [ // o Senhor fala a Moisés
        C("moises", -150, "kneel", { dy: 0.5, facing: 1 }),
      ] }),
      b(2, { by: "deus", props: TROMBETAS, q: "Faze-te duas trombetas de prata", env: { glory: 0.66 }, cast: [ // "faze-te duas TROMBETAS de prata" — convocar e partir
        C("arao", -30, "raise", { glow: 0.28, dy: 0.5, facing: 1 }),
        C("moises", -150, "stand", { dy: 0.5, facing: 1 }),
      ] }),
      b(3, { by: "deus", q: "toda a congregação se reunirá a ti", cast: [         // ao tocá-las, toda a congregação se reunirá à porta da tenda
        C("arao", -30, "raise", { glow: 0.28, dy: 0.5, facing: 1 }),
        C("multidao", 160, "walk", { dy: 0.46 }),
      ] }),
      b(4, { by: "deus", q: "os cabeças dos milhares de Israel" }),               // tocando uma só, congregam-se os príncipes
      b(5, { by: "deus", q: "partirão os arraiais que estão acampados do lado do oriente" }), // retinindo, partem os arraiais do oriente
      dv(6),
      dv(7),
      b(8, { by: "deus", q: "os filhos de Arão, sacerdotes, tocarão as trombetas", cast: [ // os sacerdotes, filhos de Arão, tocarão as trombetas
        C("arao", -30, "raise", { glow: 0.3, dy: 0.5, facing: 1 }),
        C("servo", 50, "raise", { dy: 0.5, facing: -1, id: "sacerdote" }),
      ] }),
      b(9, { by: "deus", q: "também tocareis as trombetas retinindo" }),          // na guerra, tocareis retinindo, e sereis lembrados
      b(10, { by: "deus", q: "Eu sou o Senhor vosso Deus" }),                     // nas solenidades, por memorial: "eu sou o Senhor vosso Deus"
      // v11-28 — A PARTIDA do Sinai em ordem de marcha.
      b(11, { props: NUVEM_DIA, q: "a nuvem se alçou de sobre o tabernáculo", env: { terrain: "desert", glory: 0.55, night: 0.1, verdure: 0.2 }, cast: [ // a nuvem se alçou de sobre o tabernáculo
        C("multidao", 190, "stand", { dy: 0.44 }),
      ] }),
      b(12, { props: MARCHA, q: "segundo a ordem de marcha, partiram do deserto de Sinai", env: { terrain: "desert", glory: 0.55, night: 0.1, verdure: 0.2 }, cast: [ // Israel parte do Sinai em ORDEM DE MARCHA, a arca à frente
        C("servo", -150, "walk", { dy: 0.5, facing: 1, id: "portador" }),
        C("moises", -50, "walk", { dy: 0.5, facing: 1 }),
        C("multidao", 120, "walk", { dy: 0.46 }),
        C("multidao", 210, "walk", { scale: 0.9, dy: 0.42, id: "povo2" }),
      ] }),
      b(13, { q: "por intermédio de Moisés" }),                                   // partiram pela primeira vez por intermédio de Moisés
      b(14, { q: "a bandeira do arraial dos filhos de Judá", cast: [              // primeiro parte a bandeira de Judá
        C("multidao", 100, "walk", { dy: 0.46 }),
        C("multidao", 190, "walk", { scale: 0.9, dy: 0.42, id: "juda" }),
      ] }),
      b(15),
      b(16),
      b(17, { q: "levando o tabernáculo", cast: [                                 // Gérson e Merari desarmam e levam o tabernáculo
        C("servo", 60, "walk", { dy: 0.5, facing: 1, id: "gerson" }),
        C("servo", 130, "walk", { dy: 0.46, facing: 1, id: "merari" }),
      ] }),
      b(18),
      b(19),
      b(20),
      b(21, { q: "partiram os coatitas, levando o santuário", cast: [             // os coatitas levam o SANTUÁRIO (as coisas santas / a arca)
        C("servo", -40, "walk", { dy: 0.5, facing: 1, id: "coate" }),
        C("servo", 30, "walk", { dy: 0.48, facing: 1, id: "coate2" }),
      ] }),
      b(22),
      b(23),
      b(24),
      b(25, { q: "fechando todos os arraiais", cast: [                            // a bandeira de Dã fecha a retaguarda de todos os arraiais
        C("multidao", 130, "walk", { dy: 0.46, id: "da" }),
      ] }),
      b(26),
      b(27),
      b(28, { q: "Esta era a ordem das partidas" }),                              // esta era a ordem das partidas dos filhos de Israel
      b(29, { by: "moises", q: "vai conosco e te faremos bem", cast: [            // Moisés convida Hobabe: "vai conosco e te faremos bem"
        C("moises", -60, "point", { dy: 0.5, facing: -1 }),
        C("homem", 60, "stand", { dy: 0.52, facing: -1, id: "hobabe" }),
      ] }),
      b(30, { by: "homem", q: "Não irei; antes irei à minha terra", cast: [       // Hobabe: "não irei; antes irei à minha terra"
        C("homem", 40, "stand", { dy: 0.52, facing: -1, id: "hobabe" }),
        C("moises", -100, "stand", { dy: 0.5, facing: 1 }),
      ] }),
      b(31, { by: "moises", q: "nos servirás de guia", cast: [                     // Moisés: "não nos deixes; nos servirás de guia"
        C("moises", -60, "point", { dy: 0.5, facing: -1 }),
        C("homem", 60, "stand", { dy: 0.52, facing: -1, id: "hobabe" }),
      ] }),
      b(32, { by: "moises", q: "também nós te faremos bem" }),                     // "sucedendo o bem, também te faremos bem"
      // v33-36 — A ARCA guiando; o brado de Moisés.
      b(33, { props: MARCHA, q: "a arca da aliança do Senhor caminhou diante deles", env: { terrain: "desert", glory: 0.6, night: 0.1, verdure: 0.2 }, cast: [ // a ARCA da aliança caminhou diante deles, buscando descanso
        C("servo", -150, "walk", { dy: 0.5, facing: 1, id: "portador" }),
        C("multidao", 120, "walk", { dy: 0.46 }),
      ] }),
      b(34, { q: "a nuvem do Senhor ia sobre eles de dia", env: { glory: 0.62 }, cast: [ // a nuvem do Senhor ia sobre eles de dia
        C("multidao", 120, "walk", { dy: 0.46 }),
      ] }),
      b(35, { by: "moises", q: "Levanta-te, Senhor", env: { terrain: "desert", glory: 0.85, night: 0.1, verdure: 0.2 }, cast: [ // partindo a arca, Moisés brada: "LEVANTA-TE, SENHOR"
        C("moises", -40, "raise", { glow: 0.3, dy: 0.5, facing: 1 }),
        C("servo", -150, "walk", { dy: 0.5, facing: 1, id: "portador" }),
      ] }),
      b(36, { by: "moises", q: "Volta, ó Senhor, para os muitos milhares de Israel", env: { glory: 0.8 }, cast: [ // pousando a arca: "VOLTA, ó SENHOR, para os milhares de Israel"
        C("moises", -40, "raise", { glow: 0.3, dy: 0.5, facing: -1 }),
        C("multidao", 150, "stand", { dy: 0.46 }),
      ] }),
    ],
  },
};
