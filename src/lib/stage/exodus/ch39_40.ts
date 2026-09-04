// ============================================================================
// ÊXODO 39–40 — roteiro do modo CENA VIVA (força-tarefa AT, onda Êxodo). FINAL.
//
// Êx 39 — AS VESTES E A OBRA CONCLUÍDA: fazem-se o éfode, o peitoral das doze
// pedras, o manto das romãs e campainhas e a lâmina "SANTIDADE AO SENHOR". Toda a
// obra do tabernáculo se acaba "como o Senhor ordenara"; trazem tudo a Moisés,
// que vê a obra e ABENÇOA o povo.
//
// Êx 40 — A GLÓRIA ENCHE O TABERNÁCULO: no primeiro dia do ano, Moisés levanta o
// tabernáculo, põe a arca, a mesa, o candelabro, os altares e a pia, unge tudo e
// consagra Arão. Então A NUVEM cobre a tenda e A GLÓRIA DO SENHOR enche o
// tabernáculo — a nuvem de dia, o fogo de noite, guiando Israel em suas jornadas.
//
// A VOZ DE DEUS (regra do projeto): em Êx 40 a ordem final vem do céu (`by:
// "deus"`) e a GLÓRIA que enche a tenda é pura luz e nuvem, SEM figura. É o clímax
// do livro: Deus habita no meio do seu povo.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });

// ---------------------------------------------------------------------------
// A OFICINA das vestes (Êx 39) e o TABERNÁCULO completo, levantado (Êx 40).
const VESTES: StagePropSpec[] = [
  P("tent", -240, 1.05, undefined, 0.2),
  P("tent", 240, 1, undefined, 0.22),
  P("crate", 150, 0.7, undefined, 0.6),
  P("rock", -330, 1, undefined, 0.5),
  P("grass", -60, 0.8, undefined, 0.82),
];
// ---------------------------------------------------------------------------
// O PEITORAL FEITO, ORDEM POR ORDEM (Êx 39:8-21). As quatro fileiras de três
// pedras vão sendo engastadas diante de Arão — sárdio, topázio e carbúnculo;
// esmeralda, safira e diamante; jacinto, ágata e ametista; berilo, ônix e
// jaspe —, e depois as cadeiazinhas trançadas e as argolas de ouro que o
// prendem ao éfode com um cordão de azul, para que nunca se separe. As pedras
// não têm prop próprio no motor: são desenhadas pelo que são, pedras
// lapidadas, na grade de quatro ordens do peitoral.
const OFICINA_PEITORAL: StagePropSpec[] = [
  P("tent", -300, 1.05, undefined, 0.2),
  P("tent", 320, 1, undefined, 0.22),
  P("amphora", -235, 0.85, undefined, 0.62),
  P("crate", -180, 0.8, undefined, 0.72),
  P("grass", -60, 0.8, undefined, 0.9),
];
const g = (dx: number, dy: number, scale: number): StagePropSpec => ({ kind: "rock", dx, dy, scale });
const OFICINA_ORDEM1: StagePropSpec[] = [...OFICINA_PEITORAL, g(120, 0.4, 0.3), g(185, 0.4, 0.33), g(250, 0.4, 0.29)];
const OFICINA_ORDEM2: StagePropSpec[] = [...OFICINA_ORDEM1, g(120, 0.52, 0.32), g(185, 0.52, 0.29), g(250, 0.52, 0.33)];
const OFICINA_ORDEM3: StagePropSpec[] = [...OFICINA_ORDEM2, g(120, 0.64, 0.29), g(185, 0.64, 0.33), g(250, 0.64, 0.3)];
const OFICINA_ORDEM4: StagePropSpec[] = [...OFICINA_ORDEM3, g(120, 0.76, 0.33), g(185, 0.76, 0.3), g(250, 0.76, 0.32)];
const OFICINA_CADEIAS: StagePropSpec[] = [...OFICINA_ORDEM4, P("amphora", 185, 0.5, undefined, 0.3)];
const OFICINA_ANEIS_CIMA: StagePropSpec[] = [...OFICINA_CADEIAS, P("amphora", 108, 0.42, undefined, 0.32), P("amphora", 262, 0.42, undefined, 0.32)];
const OFICINA_ENGASTES: StagePropSpec[] = [...OFICINA_ANEIS_CIMA, g(5, 0.3, 0.32), g(75, 0.3, 0.32)];
const OFICINA_ANEIS_BAIXO: StagePropSpec[] = [...OFICINA_ENGASTES, P("amphora", 108, 0.42, undefined, 0.88), P("amphora", 262, 0.42, undefined, 0.88)];
const OFICINA_LIGADO: StagePropSpec[] = [...OFICINA_ANEIS_BAIXO, P("amphora", 75, 0.45, undefined, 0.58), P("amphora", 300, 0.45, undefined, 0.58)];
// ---------------------------------------------------------------------------
// O MANTO, AS TÚNICAS, A MITRA E O CINTO (Êx 39:22-30), até a lâmina de ouro
// puro em que se escreveu, como gravura de selo, SANTIDADE AO SENHOR — que o
// texto chama "a lâmina da coroa de santidade".
const VESTES_MANTO: StagePropSpec[] = [
  P("tent", -250, 1.05, undefined, 0.2),
  P("tent", 250, 1, undefined, 0.22),
  P("crate", 175, 0.8, undefined, 0.64),
  P("rock", -330, 1, undefined, 0.5),
  P("grass", -70, 0.8, undefined, 0.9),
];
const VESTES_LINHO: StagePropSpec[] = [
  P("tent", -250, 1.05, undefined, 0.2),
  P("tent", 260, 1, undefined, 0.22),
  P("crate", -170, 0.85, undefined, 0.62),
  P("crate", -100, 0.8, undefined, 0.72),
  P("crate", 165, 0.85, undefined, 0.62),
  P("rock", -330, 1, undefined, 0.5),
];
const VESTES_MITRA: StagePropSpec[] = [
  P("tent", -255, 1.05, undefined, 0.2),
  P("tent", 265, 1, undefined, 0.22),
  P("crate", 130, 0.8, undefined, 0.68),
  P("amphora", 205, 0.8, undefined, 0.62),
  P("grass", -80, 0.8, undefined, 0.9),
  P("rock", -330, 1, undefined, 0.5),
];
const VESTES_CINTO: StagePropSpec[] = [
  P("stall", 150, 1.1, undefined, 0.52),      // a banca do bordador
  P("tent", -255, 1.05, undefined, 0.2),
  P("crate", -175, 0.85, undefined, 0.66),
  P("rock", -330, 1, undefined, 0.5),
  P("grass", -60, 0.8, undefined, 0.9),
];
const LAMINA_SANTIDADE: StagePropSpec[] = [
  P("crown", 150, 1.0, undefined, 0.5),       // a lâmina da coroa de santidade
  P("tent", -255, 1.05, undefined, 0.2),
  P("tent", 310, 1, undefined, 0.24),
  P("amphora", -175, 0.85, undefined, 0.66),
  P("rock", -330, 1, undefined, 0.5),
];
// tudo trazido a Moisés — o santuário reunido
const OBRA_PRONTA: StagePropSpec[] = [
  { ...P("tent", 0, 1.55, undefined, 0.36), tag: "tabernaculo" },
  { ...P("ark", -110, 0.8, undefined, 0.5), tag: "arca-testemunho" },
  { ...P("menorah", 110, 1, undefined, 0.5), tag: "candelabro-ouro" },
  { ...P("altar", -220, 0.9, 0.4, 0.56), tag: "altar-holocausto" },
  P("tent", 220, 1, undefined, 0.44),
];
// ---------------------------------------------------------------------------
// A ORDEM DE LEVANTAR (Êx 40:1-8): antes de tudo, as peças ainda no chão do
// arraial; depois, peça a peça, o santuário vai ao seu lugar enquanto a voz o
// manda — a tenda levantada, a arca coberta pelo véu, a mesa em ordem e o
// candelabro aceso, o altar de ouro do incenso e a cortina da porta, o altar
// do holocausto diante dela, a pia com água entre a tenda e o altar, e enfim o
// pátio ao redor com o seu reposteiro.
const ANTES_DE_ERGUER: StagePropSpec[] = [
  P("crate", -180, 0.9, undefined, 0.6),
  P("crate", -100, 0.85, undefined, 0.7),
  P("crate", 120, 0.9, undefined, 0.62),
  P("tent", -280, 1, undefined, 0.18),
  P("tent", 290, 0.95, undefined, 0.2),
  P("grass", 30, 0.8, undefined, 0.9),
  P("rock", -340, 0.9, undefined, 0.5),
];
const ERGUER_TENDA: StagePropSpec[] = [
  { ...P("tent", 0, 1.6, undefined, 0.36), tag: "tabernaculo" },
  P("crate", -235, 0.8, undefined, 0.6),
  P("crate", 235, 0.8, undefined, 0.6),
  P("grass", -90, 0.8, undefined, 0.9),
];
const ERGUER_ARCA: StagePropSpec[] = [
  { ...P("tent", 0, 1.6, undefined, 0.36), tag: "tabernaculo" },
  { ...P("ark", -230, 0.85, undefined, 0.54), tag: "arca-testemunho" },
  { ...P("door", -140, 0.9, undefined, 0.62), tag: "veu-santissimo" },
  P("crate", 240, 0.8, undefined, 0.6),
  P("grass", 90, 0.8, undefined, 0.9),
];
const ERGUER_MESA: StagePropSpec[] = [
  { ...P("tent", 0, 1.6, undefined, 0.36), tag: "tabernaculo" },
  { ...P("ark", -230, 0.85, undefined, 0.54), tag: "arca-testemunho" },
  { ...P("door", -140, 0.9, undefined, 0.62), tag: "veu-santissimo" },
  { ...P("stall", 110, 0.9, undefined, 0.58), tag: "mesa-proposicao" },
  { ...P("menorah", 225, 1.0, undefined, 0.62), tag: "candelabro-ouro" },
];
const ERGUER_INCENSO: StagePropSpec[] = [
  ...ERGUER_MESA,
  { ...P("censer", -60, 0.95, 0.4, 0.64), tag: "altar-incenso" },
  P("door", 45, 0.85, undefined, 0.78),
];
const ERGUER_HOLOCAUSTO: StagePropSpec[] = [
  ...ERGUER_INCENSO,
  { ...P("altar", -320, 1.0, 0.5, 0.68), tag: "altar-holocausto" },
];
const ERGUER_PIA: StagePropSpec[] = [
  ...ERGUER_HOLOCAUSTO,
  { ...P("bowl", 305, 0.85, 0, 0.74), tag: "pia-cobre" },
];
const ERGUER_PATIO: StagePropSpec[] = [
  ...ERGUER_PIA,
  P("tower", -340, 0.85, undefined, 0.2),
  P("tower", 340, 0.85, undefined, 0.22),
];
// o tabernáculo levantado, com o pátio e o altar (Êx 40)
const TABERNACULO_ERGUIDO: StagePropSpec[] = [
  { ...P("tent", 0, 1.6, undefined, 0.36), tag: "tabernaculo" },
  { ...P("altar", -150, 1, 0.45, 0.5), tag: "altar-holocausto" },
  { ...P("bowl", -230, 0.8, undefined, 0.58), tag: "pia-cobre" },
  P("tower", -340, 1, undefined, 0.28),
  P("tower", 340, 0.95, undefined, 0.3),
  P("tent", 210, 1.05, undefined, 0.44),
];
// O CLÍMAX (Êx 40:34-38): A NUVEM cobre a tenda e a GLÓRIA enche o tabernáculo.
// A nuvem da glória (props de céu) pousa densa e baixa SOBRE a tenda — não é
// dia de sol, é a Presença descendo. Fogo no altar, glória no máximo.
const TABERNACULO_GLORIA: StagePropSpec[] = [
  { kind: "clouds", dx: 0, dy: 0.34, scale: 2.4, sky: true },     // a nuvem cobre a tenda
  { kind: "clouds", dx: -40, dy: 0.5, scale: 1.9, sky: true },
  { kind: "clouds", dx: -220, dy: 0.66, scale: 1.35, sky: true },
  { kind: "clouds", dx: 220, dy: 0.7, scale: 1.25, sky: true },
  { kind: "clouds", dx: 80, dy: 0.82, scale: 1.5, sky: true },
  { ...P("tent", 0, 1.62, undefined, 0.36), tag: "tabernaculo" },
  { ...P("altar", -150, 1, 0.6, 0.5), tag: "altar-holocausto" },
  { ...P("bowl", -230, 0.8, undefined, 0.58), tag: "pia-cobre" },
  P("tower", -340, 1, undefined, 0.28),
  P("tower", 340, 0.95, undefined, 0.3),
  P("tent", 210, 1.05, undefined, 0.44),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Êx 39
  // As vestes santas (éfode, peitoral, manto, a lâmina "Santidade ao Senhor") →
  // a obra toda acabada → tudo trazido a Moisés → e a bênção de Moisés sobre o povo.
  39: {
    start: { terrain: "desert", night: 0.14, glory: 0.68, storm: 0, fire: 0, verdure: 0.4 },
    beats: [
      b(1, { set: "vestes", cast: [C("homem", -110, "stand", { dy: 0.5, id: "bezalel", facing: 1 }), C("arao", 40, "stand", { dy: 0.5, facing: -1 })], props: VESTES, env: { terrain: "desert", glory: 0.72, night: 0.1 } }), // fazem as vestes do ministério e as vestes santas de Arão
      b(2, { env: { glory: 0.75 } }), // fazem o éfode de ouro, azul, púrpura, carmesim e linho fino torcido
      b(3, {}), // estendem lâminas de ouro, cortadas em fios, para tecê-las entre os tecidos
      b(4, {}), // fazem-lhe ombreiras que se ajuntam nas duas pontas
      b(5, {}), // o cinto do éfode, de uma só peça, como o Senhor ordenara a Moisés
      b(6, { env: { glory: 0.78 } }), // preparam as pedras de ônix engastadas em ouro, com os nomes de Israel
      b(7, {}), // põem-nas sobre as ombreiras do éfode, por pedras de memória
      b(8, { props: OFICINA_PEITORAL, cast: [C("homem", -140, "stand", { dy: 0.5, id: "bezalel", facing: 1 }), C("arao", 40, "stand", { dy: 0.5, facing: -1 })], env: { glory: 0.8 } }), // fazem o peitoral de obra de artífice, como o éfode
      b(9, { cast: [C("homem", -100, "kneel", { dy: 0.62, id: "bezalel", facing: 1 }), C("arao", 40, "stand", { dy: 0.5, facing: -1 })], env: { glory: 0.79 } }), // quadrado e duplo, de um palmo de comprimento e de largura
      b(10, { props: OFICINA_ORDEM1, env: { glory: 0.8 } }), // a primeira ordem: um sárdio, um topázio e um carbúnculo
      b(11, { props: OFICINA_ORDEM2, env: { glory: 0.81 } }), // a segunda ordem: uma esmeralda, uma safira e um diamante
      b(12, { props: OFICINA_ORDEM3, env: { glory: 0.82 } }), // a terceira ordem: um jacinto, uma ágata e uma ametista
      b(13, { props: OFICINA_ORDEM4, env: { glory: 0.84 } }), // a quarta ordem: um berilo, um ônix e um jaspe, em engastes de ouro
      b(14, { cast: [C("homem", -140, "point", { dy: 0.5, id: "bezalel", facing: 1 }), C("arao", 40, "stand", { dy: 0.5, facing: -1 })], env: { glory: 0.82 } }), // as doze pedras, segundo os nomes das doze tribos, como selos
      b(15, { props: OFICINA_CADEIAS, cast: [C("homem", -110, "write", { dy: 0.58, id: "bezalel", facing: 1 }), C("arao", 40, "stand", { dy: 0.5, facing: -1 })], env: { glory: 0.82 } }), // fazem cadeiazinhas de ouro puro trançado para o peitoral
      b(16, { props: OFICINA_ANEIS_CIMA, cast: [C("homem", -140, "point", { dy: 0.5, id: "bezalel", facing: 1 }), C("arao", 40, "stand", { dy: 0.5, facing: -1 })], env: { glory: 0.83 } }), // dois engastes e duas argolas de ouro nas extremidades do peitoral
      b(17, { cast: [C("homem", -80, "kneel", { dy: 0.56, id: "bezalel", facing: 1 }), C("arao", 40, "stand", { dy: 0.5, facing: -1 })], env: { glory: 0.84 } }), // põem as cadeiazinhas de ouro nas duas argolas do peitoral
      b(18, { props: OFICINA_ENGASTES, cast: [C("arao", 40, "raise", { dy: 0.5, facing: -1 }), C("homem", -140, "point", { dy: 0.5, id: "bezalel", facing: 1 })], env: { glory: 0.85 } }), // e as pontas nos engastes, sobre as ombreiras do éfode
      b(19, { props: OFICINA_ANEIS_BAIXO, cast: [C("homem", -100, "kneel", { dy: 0.72, id: "bezalel", facing: 1 }), C("arao", 40, "stand", { dy: 0.5, facing: -1 })], env: { glory: 0.83 } }), // duas argolas de ouro na borda do peitoral, junto ao éfode por dentro
      b(20, { props: OFICINA_LIGADO, cast: [C("homem", -160, "stand", { dy: 0.52, id: "bezalel", facing: 1 }), C("arao", 40, "stand", { dy: 0.5, facing: -1 })], env: { glory: 0.84 } }), // duas argolas de ouro nas ombreiras do éfode, sobre o cinto
      b(21, { cast: [C("arao", 40, "stand", { dy: 0.5, facing: -1 }), C("homem", -130, "bow", { dy: 0.5, id: "bezalel", facing: 1 })], env: { glory: 0.86 } }), // ligam o peitoral ao éfode com um cordão de azul, e não se separa
      b(22, { props: VESTES_MANTO, cast: [C("arao", 40, "stand", { dy: 0.5, facing: -1 }), C("homem", -145, "raise", { dy: 0.5, id: "bezalel", facing: 1 })], env: { glory: 0.8 } }), // fazem o manto do éfode, de obra tecida, todo de azul
      b(23, { cast: [C("arao", 40, "stand", { dy: 0.5, facing: -1 }), C("homem", -85, "point", { dy: 0.5, id: "bezalel", facing: 1 })], env: { glory: 0.79 } }), // a abertura no meio, com uma borda em volta, para não se romper
      b(24, { cast: [C("arao", 40, "stand", { dy: 0.5, facing: -1 }), C("homem", -75, "kneel", { dy: 0.66, id: "bezalel", facing: 1 }), C("homem", 130, "kneel", { dy: 0.64, id: "bordador", facing: -1 })], env: { glory: 0.82 } }), // nas bordas do manto, romãs de azul, púrpura e carmesim
      b(25, { cast: [C("arao", 40, "stand", { dy: 0.5, facing: -1 }), C("homem", 130, "write", { dy: 0.62, id: "bordador", facing: -1 }), C("homem", -130, "stand", { dy: 0.5, id: "bezalel", facing: 1 })], env: { glory: 0.85 } }), // campainhas de ouro puro entre as romãs, nas bordas do manto
      b(26, { cast: [C("arao", 40, "raise", { dy: 0.5, facing: -1 }), C("homem", -140, "stand", { dy: 0.5, id: "bezalel", facing: 1 })], env: { glory: 0.87 } }), // uma campainha e uma romã, alternadas, para ministrar
      b(27, { props: VESTES_LINHO, cast: [C("arao", 30, "stand", { dy: 0.5, facing: -1 }), C("homem", 105, "stand", { dy: 0.5, id: "filho-arao", facing: -1 }), C("homem", 185, "stand", { scale: 0.92, dy: 0.54, id: "filho-arao2", facing: -1 }), C("homem", -215, "stand", { dy: 0.5, id: "bezalel", facing: 1 })], env: { glory: 0.82 } }), // fazem as túnicas de linho fino para Arão e seus filhos
      b(28, { props: VESTES_MITRA, cast: [C("arao", 30, "stand", { dy: 0.5, facing: -1 }), C("homem", -205, "point", { dy: 0.5, id: "bezalel", facing: 1 })], env: { glory: 0.84 } }), // a mitra, o ornato das tiaras e os calções de linho fino
      b(29, { props: VESTES_CINTO, cast: [C("arao", 30, "stand", { dy: 0.5, facing: -1 }), C("homem", 215, "write", { dy: 0.58, id: "bordador", facing: -1 }), C("homem", -215, "stand", { dy: 0.5, id: "bezalel", facing: 1 })], env: { glory: 0.83 } }), // e o cinto de linho, azul, púrpura e carmesim, obra de bordador
      b(30, { props: LAMINA_SANTIDADE, cast: [C("arao", 30, "stand", { dy: 0.5, facing: -1 }), C("homem", -205, "raise", { dy: 0.5, id: "bezalel", facing: 1 })], env: { glory: 0.9 } }), // fazem a lâmina da coroa de santidade e nela escrevem: SANTIDADE AO SENHOR
      b(31, { cast: [C("arao", 20, "stand", { dy: 0.5, facing: -1 }), C("homem", -110, "stand", { dy: 0.5, id: "bezalel", facing: 1 })], env: { glory: 0.88 } }), // atam-na à mitra com um cordão de azul, como o Senhor ordenara
      b(32, { set: "obra-pronta", cast: [C("moises", -140, "stand", { dy: 0.5, facing: 1 }), C("multidao", 140, "stand", { scale: 0.9, dy: 0.48, id: "sabios" })], props: OBRA_PRONTA, env: { terrain: "desert", glory: 0.85, night: 0.08 } }), // acaba-se toda a obra do tabernáculo; fazem conforme a tudo o que o Senhor ordenara
      b(33, { cast: [C("multidao", 60, "walk", { dy: 0.5, id: "sabios", facing: 1 }), C("moises", -130, "stand", { dy: 0.5, facing: 1 })] }), // trazem a Moisés o tabernáculo, a tenda e todos os seus pertences
      b(34, {}), // as coberturas de peles e o véu de cobertura
      b(35, { env: { glory: 0.88 } }), // a arca do testemunho, os seus varais e o propiciatório
      b(36, {}), // a mesa com todos os pertences e os pães da proposição
      b(37, { env: { glory: 0.9, fire: 0.3 } }), // o candelabro com as lâmpadas em ordem e o azeite para a luz
      b(38, {}), // o altar de ouro, o azeite da unção, o incenso e a cortina da porta
      b(39, {}), // o altar de cobre, o crivo, a pia e a sua base
      b(40, {}), // as cortinas do pátio, as colunas, as cordas e todos os utensílios
      b(41, {}), // as vestes do ministério e as vestes santas de Arão e seus filhos
      b(42, { env: { glory: 0.9 } }), // conforme a tudo o que o Senhor ordenara, assim fizeram toda a obra
      b(43, { cast: [C("moises", -70, "raise", { dy: 0.5, facing: 1 }), C("multidao", 40, "bow", { dy: 0.5 }), C("multidao", 140, "bow", { scale: 0.9, dy: 0.52, id: "povo2" })], env: { glory: 0.95, night: 0.06 } }), // Moisés vê toda a obra, feita como o Senhor ordenara, e abençoa o povo
    ],
  },

  // ------------------------------------------------------------------ Êx 40
  // A ordem final para levantar e ungir → Moisés ergue o tabernáculo peça a peça →
  // e A GLÓRIA DO SENHOR enche a tenda: a nuvem de dia, o fogo de noite. FIM.
  40: {
    start: { terrain: "desert", night: 0.12, glory: 0.7, storm: 0, fire: 0.2, verdure: 0.4 },
    beats: [
      b(1, { set: "erguer", cast: [C("moises", -240, "kneel", { dy: 0.52, facing: 1 })], props: ANTES_DE_ERGUER, env: { terrain: "desert", glory: 0.75, night: 0.1 } }), // o Senhor fala a Moisés
      b(2, { by: "deus", props: ERGUER_TENDA, cast: [C("moises", -150, "raise", { dy: 0.5, facing: 1 })], env: { glory: 0.78 } }), // "no primeiro dia do mês, levantarás o tabernáculo da tenda da congregação"
      b(3, { by: "deus", props: ERGUER_ARCA, cast: [C("moises", -95, "bow", { dy: 0.7, facing: 1 })], env: { glory: 0.85 } }), // "porás nele a arca do testemunho, e a cobrirás com o véu"
      b(4, { by: "deus", props: ERGUER_MESA, cast: [C("moises", 165, "point", { dy: 0.7, facing: -1 })], env: { glory: 0.83, fire: 0.4 } }), // "colocarás a mesa em ordem, e o candelabro, e acenderás as lâmpadas"
      b(5, { by: "deus", props: ERGUER_INCENSO, cast: [C("moises", -5, "stand", { dy: 0.86, facing: 1 })], env: { glory: 0.84, fire: 0.45 } }), // "porás o altar de ouro do incenso diante da arca, e a cortina da porta"
      b(6, { by: "deus", props: ERGUER_HOLOCAUSTO, cast: [C("moises", -265, "kneel", { dy: 0.78, facing: 1 })], env: { glory: 0.82, fire: 0.55 } }), // "porás o altar do holocausto diante da porta do tabernáculo"
      b(7, { by: "deus", props: ERGUER_PIA, cast: [C("moises", 250, "stand", { dy: 0.84, facing: -1 })], env: { glory: 0.8, fire: 0.4 } }), // "porás a pia entre a tenda e o altar, e nela porás água"
      b(8, { by: "deus", props: ERGUER_PATIO, cast: [C("moises", -195, "raise", { dy: 0.5, facing: 1 })], env: { glory: 0.82 } }), // "porás o pátio ao redor, e a cortina à porta do pátio"
      b(9, { by: "deus", cast: [C("moises", -160, "raise", { dy: 0.5, facing: 1 })], env: { glory: 0.86, fire: 0.35 } }), // "tomarás o azeite da unção e ungirás o tabernáculo e tudo o que há nele"
      b(10, { by: "deus" }), // "ungirás o altar do holocausto e o santificarás: será santíssimo"
      b(11, { by: "deus" }), // "ungirás a pia e a sua base, e a santificarás"
      b(12, { by: "deus" }), // "farás chegar Arão e seus filhos à porta da tenda, e os lavarás com água"
      b(13, { by: "deus", env: { glory: 0.85 } }), // "vestirás Arão as vestes santas, e o ungirás, para me administrar o sacerdócio"
      b(14, { by: "deus" }), // "farás chegar seus filhos e lhes vestirás as túnicas"
      b(15, { by: "deus" }), // "os ungirás como a seu pai: a unção lhes será por sacerdócio perpétuo"
      b(16, { cast: [C("moises", -110, "stand", { dy: 0.5, facing: 1 })], env: { glory: 0.8 } }), // Moisés fez conforme a tudo o que o Senhor lhe ordenou
      b(17, { props: TABERNACULO_ERGUIDO, cast: [C("moises", -120, "raise", { dy: 0.5, facing: 1 }), C("multidao", 150, "stand", { scale: 0.9, dy: 0.46, id: "povo2" })], env: { glory: 0.82 } }), // no primeiro mês do segundo ano, é levantado o tabernáculo
      b(18, { cast: [C("moises", -100, "raise", { dy: 0.5, facing: 1 })], env: { glory: 0.8 } }), // Moisés levanta o tabernáculo, põe as bases, arma as tábuas e as colunas
      b(19, {}), // estende a tenda sobre o tabernáculo e a sua cobertura, como o Senhor ordenara
      b(20, { env: { glory: 0.88 } }), // põe o testemunho na arca, e o propiciatório sobre ela
      b(21, {}), // introduz a arca no tabernáculo e pendura o véu, cobrindo o testemunho
      b(22, { cast: [C("moises", -90, "stand", { dy: 0.5, facing: 1 })], env: { glory: 0.82 } }), // põe a mesa na tenda, ao lado norte, fora do véu
      b(23, {}), // e sobre ela põe em ordem o pão perante o Senhor
      b(24, { env: { glory: 0.85, fire: 0.35 } }), // põe o candelabro na frente da mesa, ao lado sul
      b(25, { env: { fire: 0.5, glory: 0.88 } }), // e acende as lâmpadas perante o Senhor
      b(26, {}), // põe o altar de ouro na tenda, diante do véu
      b(27, { env: { fire: 0.45 } }), // e acende sobre ele o incenso de especiarias aromáticas
      b(28, {}), // pendura a cortina da porta do tabernáculo
      b(29, { cast: [C("moises", -90, "raise", { dy: 0.5, facing: 1 }), C("arao", 20, "stand", { dy: 0.5, facing: -1 })], env: { fire: 0.6, glory: 0.85 } }), // põe o altar do holocausto à porta, e sobre ele oferece holocausto
      b(30, { env: { water: 0.3, fire: 0.3 } }), // põe a pia entre a tenda e o altar, e nela água para lavar
      b(31, { cast: [C("moises", -90, "stand", { dy: 0.5, facing: 1 }), C("arao", 20, "bow", { dy: 0.5, facing: -1 }), C("homem", 80, "bow", { dy: 0.5, id: "filho-arao", facing: -1 })] }), // Moisés, Arão e seus filhos lavam ali as mãos e os pés
      b(32, { env: { glory: 0.86 } }), // ao entrar na tenda e ao chegar ao altar, lavam-se, como o Senhor ordenara
      b(33, { cast: [C("moises", -120, "raise", { dy: 0.5, facing: 1 }), C("multidao", 150, "stand", { scale: 0.9, dy: 0.46, id: "povo2" })], env: { glory: 0.9, water: 0, night: 0.06 } }), // levanta o pátio ao redor e pendura a cortina da porta: assim Moisés acaba a obra
      b(34, { set: "gloria", props: TABERNACULO_GLORIA, cast: [C("moises", -140, "bow", { dy: 0.5, facing: 1 }), C("multidao", 150, "bow", { scale: 0.9, dy: 0.48, id: "povo2" })], env: { glory: 1, fire: 0.45, night: 0.18 } }), // então a nuvem cobre a tenda, e a glória do Senhor enche o tabernáculo
      b(35, { props: TABERNACULO_GLORIA, cast: [C("moises", -140, "stand", { dy: 0.5, facing: 1 })], env: { glory: 1, fire: 0.45, night: 0.2 } }), // Moisés não pode entrar, porque a nuvem permanece e a glória enche o tabernáculo
      b(36, { props: TABERNACULO_GLORIA, cast: [C("moises", -120, "stand", { dy: 0.5, facing: 1 }), C("multidao", 60, "stand", { dy: 0.48 }), C("multidao", 160, "stand", { scale: 0.9, dy: 0.52, id: "povo2" })], env: { glory: 0.92, night: 0.16 } }), // quando a nuvem se levantava, os filhos de Israel caminhavam em suas jornadas
      b(37, { props: TABERNACULO_GLORIA, env: { glory: 0.88 } }), // se a nuvem não se levantava, não caminhavam, até ao dia em que ela subisse
      b(38, { props: TABERNACULO_GLORIA, env: { glory: 0.95, fire: 0.75, night: 0.42 } }), // a nuvem de dia e o fogo de noite sobre o tabernáculo, à vista de toda a casa de Israel
    ],
  },
};
