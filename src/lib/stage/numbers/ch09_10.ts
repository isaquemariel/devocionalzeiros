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
  P("trumpet", 80, 0.9, undefined, 0.5), // a 2ª trombeta de prata ("faze-te DUAS trombetas")
  P("palm", -320, 1.0, undefined, 0.14),
  P("grass", 70, 0.8, undefined, 0.78),
];
// A NUVEM de dia sobre a tenda: a coluna pousada sobre o tabernáculo, a arca guardada.
const NUVEM_DIA: StagePropSpec[] = [
  { ...P("tent", -20, 1.5, undefined, 0.22), tag: "tabernaculo" },
  { ...P("pillar", -20, 1.35, undefined, 0.04), tag: "coluna-nuvem-fogo" },
  { ...P("ark", 30, 0.8, undefined, 0.5), tag: "arca-testemunho" }, // arca junto à tenda (não solta no deserto)
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
      b(9, { cast: [ C("moises", -150, "kneel", { dy: 0.5, facing: 1 }) ] }), // então fala o Senhor a Moisés
      b(10, { by: "deus", q: "for imundo por tocar corpo morto, ou achar-se em jornada longe de vós", env: { glory: 0.66 }, cast: [ // os dois casos: o IMUNDO e o que está em JORNADA longe
        C("moises", -190, "stand", { dy: 0.5, facing: -1 }),
        C("homem", -50, "bow", { dy: 0.58, facing: 1, id: "imundo" }),
        C("homem", 150, "walk", { scale: 0.94, dy: 0.48, facing: -1, id: "viajante-da-pascoa" }),
      ] }),
      b(11, { by: "deus", q: "com pães ázimos e ervas amargas a comerão", props: [ // a segunda páscoa, à tarde: os ázimos e as ervas amargas
        { ...P("tent", -230, 1.35, undefined, 0.16), tag: "tabernaculo" },
        { ...P("stall", -40, 1.05, undefined, 0.5), tag: "mesa-azimos" },
        { ...P("campfire", 110, 1.0, 0.9, 0.66), tag: "cordeiro-assado" },
        P("bowl", 215, 0.8, undefined, 0.54),
        P("grass", 290, 0.8, undefined, 0.8),
      ], env: { terrain: "desert", glory: 0.56, night: 0.45, fire: 0.5 }, cast: [
        C("homem", -140, "kneel", { dy: 0.62, facing: -1, id: "imundo" }),
      ] }),
      b(12, { by: "deus", q: "não quebrarão osso algum", env: { glory: 0.64, night: 0.16, fire: 0.25 }, cast: [ // nada até à manhã; e osso algum do cordeiro não se quebra
        C("homem", -150, "bow", { dy: 0.6, facing: -1, id: "imundo" }),
        C("homem", 250, "stand", { scale: 0.92, dy: 0.5, facing: 1, id: "viajante-da-pascoa" }),
      ] }),
      b(13, { by: "deus", q: "essa alma do seu povo será extirpada", props: [      // o LIMPO que deixa de celebrar: cortado do meio do seu povo
        { ...P("tent", -170, 1.3, undefined, 0.18), tag: "tabernaculo" },
        P("tent", -60, 0.95, undefined, 0.3),
        P("rock", 210, 0.85, undefined, 0.6),
        P("rock", 300, 0.7, undefined, 0.44),
      ], env: { terrain: "desert", glory: 0.4, night: 0.62, fire: 0 }, cast: [
        C("homem", 130, "walk", { dy: 0.66, facing: -1, id: "o-que-deixou-a-pascoa" }),
      ] }),
      b(14, { by: "deus", q: "um mesmo estatuto haverá para vós", props: ARRAIAL, env: { terrain: "desert", glory: 0.72, night: 0.1, fire: 0.3 }, cast: [ // o ESTRANGEIRO celebra a mesma páscoa, sob o mesmo estatuto
        C("homem", 30, "kneel", { dy: 0.6, facing: -1, id: "estrangeiro-da-pascoa" }),
        C("multidao", 180, "stand", { dy: 0.46 }),
        C("moises", -190, "stand", { dy: 0.5, facing: -1 }),
      ] }),
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
      b(18, { q: "todos os dias em que a nuvem parava sobre o tabernáculo, ficavam acampados", props: NUVEM_DIA, env: { terrain: "desert", glory: 0.6, night: 0.1, verdure: 0.2 }, cast: [ // e onde a nuvem parava, ali ficavam acampados
        C("multidao", 140, "stand", { dy: 0.48 }),
        C("multidao", 240, "stand", { scale: 0.88, dy: 0.42, id: "povo2" }),
      ] }),
      b(19, { q: "a nuvem se detinha muitos dias sobre o tabernáculo", props: [    // MUITOS DIAS: o arraial assentado, as fogueiras acesas, e ninguém parte
        { ...P("tent", -20, 1.5, undefined, 0.24), tag: "tabernaculo" },
        { ...P("pillar", -20, 1.32, undefined, 0.04), tag: "coluna-nuvem-fogo" },
        P("tent", -250, 1.0, undefined, 0.36),
        P("tent", 190, 1.0, undefined, 0.4),
        P("campfire", 90, 0.85, 0.7, 0.66),
        P("well", 320, 1.0, undefined, 0.52),
        P("palm", -330, 1.05, undefined, 0.16),
      ], env: { terrain: "desert", glory: 0.56, night: 0.14, verdure: 0.34, fire: 0.4 }, cast: [
        C("homem", -140, "kneel", { dy: 0.66, facing: -1, id: "israelita-acampado" }),
        C("multidao", 240, "stand", { scale: 0.86, dy: 0.46, id: "povo2" }),
      ] }),
      b(20, { q: "a nuvem ficava poucos dias sobre o tabernáculo", props: [        // POUCOS DIAS: as cargas já atadas, o povo de pé, à espera
        { ...P("tent", -30, 1.42, undefined, 0.22), tag: "tabernaculo" },
        { ...P("pillar", -30, 1.3, undefined, 0.04), tag: "coluna-nuvem-fogo" },
        P("crate", 120, 0.9, undefined, 0.62),
        P("crate", 205, 0.85, undefined, 0.54),
        P("crate", 285, 0.75, undefined, 0.46),
        P("grass", 60, 0.78, undefined, 0.82),
      ], env: { terrain: "desert", glory: 0.58, night: 0.12, verdure: 0.16, fire: 0 }, cast: [
        C("homem", -150, "stand", { dy: 0.6, facing: -1, id: "israelita-acampado" }),
        C("multidao", 230, "stand", { scale: 0.88, dy: 0.44 }),
      ] }),
      b(21, { q: "quer de dia quer de noite alçando-se a nuvem, partiam", props: NUVEM_NOITE, env: { terrain: "desert", night: 0.8, glory: 0.16, fire: 0.5, verdure: 0.14 }, cast: [ // da tarde à manhã, e de noite mesmo: alçando-se a nuvem, partiam
        C("homem", -130, "walk", { dy: 0.6, facing: -1, id: "israelita-acampado" }),
        C("multidao", 190, "walk", { scale: 0.9, dy: 0.44 }),
      ] }),
      b(22, { q: "dois dias, ou um mês, ou um ano", props: [                       // ou dois dias, ou um mês, ou UM ANO — e o arraial não se move
        { ...P("tent", -30, 1.5, undefined, 0.26), tag: "tabernaculo" },
        { ...P("pillar", -30, 1.34, undefined, 0.04), tag: "coluna-nuvem-fogo" },
        P("tent", -260, 1.05, undefined, 0.4),
        P("tent", -150, 0.95, undefined, 0.5),
        P("tent", 170, 1.0, undefined, 0.48),
        P("tent", 270, 0.9, undefined, 0.58),
        P("well", 330, 1.0, undefined, 0.34),
        P("palm", 80, 1.05, undefined, 0.72),
      ], env: { terrain: "desert", glory: 0.62, night: 0.1, verdure: 0.45, fire: 0 }, cast: [
        C("multidao", 60, "stand", { dy: 0.5 }),
        C("multidao", 220, "stand", { scale: 0.86, dy: 0.44, id: "povo2" }),
      ] }),
      b(23, { q: "cumpriam o seu dever para com o Senhor", env: { glory: 0.6 } }), // cumpriam o seu dever segundo a ordem do Senhor por Moisés
    ],
  },

  // ------------------------------------------------------------------ Nm 10
  10: {
    start: { terrain: "desert", night: 0.1, glory: 0.6, storm: 0, fire: 0, verdure: 0.2 },
    beats: [
      b(1, { props: ARRAIAL, env: { terrain: "desert", glory: 0.62, night: 0.1, verdure: 0.2 }, cast: [ // o Senhor fala a Moisés
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
        C("servo", 50, "raise", { dy: 0.5, facing: -1, id: "sacerdote-israel" }),
      ] }),
      b(9, { by: "deus", q: "também tocareis as trombetas retinindo" }),          // na guerra, tocareis retinindo, e sereis lembrados
      b(10, { by: "deus", q: "Eu sou o Senhor vosso Deus" }),                     // nas solenidades, por memorial: "eu sou o Senhor vosso Deus"
      // v11-28 — A PARTIDA do Sinai em ordem de marcha.
      // v11 — a nuvem se ALÇOU (gatilho da partida): frame distinto da nuvem pousada
      // de 9:15 — a coluna descolada da tenda e mais alta, lendo "levantando/partindo".
      b(11, { props: [
        { ...P("tent", -20, 1.5, undefined, 0.22), tag: "tabernaculo" },
        { ...P("pillar", 50, 1.65, undefined, 0.02), tag: "coluna-nuvem-fogo" },
        P("palm", -330, 1.0, undefined, 0.14),
        P("grass", 70, 0.8, undefined, 0.78),
      ], q: "a nuvem se alçou de sobre o tabernáculo", env: { terrain: "desert", glory: 0.55, night: 0.1, verdure: 0.2 }, cast: [ // a nuvem se alçou de sobre o tabernáculo
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
