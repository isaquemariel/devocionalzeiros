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
// tudo trazido a Moisés — o santuário reunido
const OBRA_PRONTA: StagePropSpec[] = [
  { ...P("tent", 0, 1.55, undefined, 0.36), tag: "tabernaculo" },
  { ...P("ark", -110, 0.8, undefined, 0.5), tag: "arca-testemunho" },
  { ...P("menorah", 110, 1, undefined, 0.5), tag: "candelabro-ouro" },
  { ...P("altar", -220, 0.9, 0.4, 0.56), tag: "altar-holocausto" },
  P("tent", 220, 1, undefined, 0.44),
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
      b(8, { env: { glory: 0.8 } }), // fazem o peitoral de obra de artífice, como o éfode
      b(9, {}), // quadrado e duplo, de um palmo de comprimento e de largura
      b(10, {}), // a primeira ordem: um sárdio, um topázio e um carbúnculo
      b(11, {}), // a segunda ordem: uma esmeralda, uma safira e um diamante
      b(12, {}), // a terceira ordem: um jacinto, uma ágata e uma ametista
      b(13, {}), // a quarta ordem: um berilo, um ônix e um jaspe, em engastes de ouro
      b(14, { env: { glory: 0.82 } }), // as doze pedras, segundo os nomes das doze tribos, como selos
      b(15, {}), // fazem cadeiazinhas de ouro puro trançado para o peitoral
      b(16, {}), // dois engastes e duas argolas de ouro nas extremidades do peitoral
      b(17, {}), // põem as cadeiazinhas de ouro nas duas argolas do peitoral
      b(18, {}), // e as pontas nos engastes, sobre as ombreiras do éfode
      b(19, {}), // duas argolas de ouro na borda do peitoral, junto ao éfode por dentro
      b(20, {}), // duas argolas de ouro nas ombreiras do éfode, sobre o cinto
      b(21, {}), // ligam o peitoral ao éfode com um cordão de azul, e não se separa
      b(22, { env: { glory: 0.8 } }), // fazem o manto do éfode, de obra tecida, todo de azul
      b(23, {}), // a abertura no meio, com uma borda em volta, para não se romper
      b(24, {}), // nas bordas do manto, romãs de azul, púrpura e carmesim
      b(25, {}), // campainhas de ouro puro entre as romãs, nas bordas do manto
      b(26, {}), // uma campainha e uma romã, alternadas, para ministrar
      b(27, {}), // fazem as túnicas de linho fino para Arão e seus filhos
      b(28, {}), // a mitra, o ornato das tiaras e os calções de linho fino
      b(29, {}), // e o cinto de linho, azul, púrpura e carmesim, obra de bordador
      b(30, { env: { glory: 0.9 } }), // fazem a lâmina da coroa de santidade e nela escrevem: SANTIDADE AO SENHOR
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
      b(1, { set: "erguer", cast: [C("moises", -130, "kneel", { dy: 0.5, facing: 1 })], props: TABERNACULO_ERGUIDO, env: { terrain: "desert", glory: 0.75, night: 0.1 } }), // o Senhor fala a Moisés
      b(2, { by: "deus", env: { glory: 0.78 } }), // "no primeiro dia do mês, levantarás o tabernáculo da tenda da congregação"
      b(3, { by: "deus" }), // "porás nele a arca do testemunho, e a cobrirás com o véu"
      b(4, { by: "deus" }), // "colocarás a mesa em ordem, e o candelabro, e acenderás as lâmpadas"
      b(5, { by: "deus" }), // "porás o altar de ouro do incenso diante da arca, e a cortina da porta"
      b(6, { by: "deus" }), // "porás o altar do holocausto diante da porta do tabernáculo"
      b(7, { by: "deus" }), // "porás a pia entre a tenda e o altar, e nela porás água"
      b(8, { by: "deus" }), // "porás o pátio ao redor, e a cortina à porta do pátio"
      b(9, { by: "deus", env: { glory: 0.82 } }), // "tomarás o azeite da unção e ungirás o tabernáculo e tudo o que há nele"
      b(10, { by: "deus" }), // "ungirás o altar do holocausto e o santificarás: será santíssimo"
      b(11, { by: "deus" }), // "ungirás a pia e a sua base, e a santificarás"
      b(12, { by: "deus" }), // "farás chegar Arão e seus filhos à porta da tenda, e os lavarás com água"
      b(13, { by: "deus", env: { glory: 0.85 } }), // "vestirás Arão as vestes santas, e o ungirás, para me administrar o sacerdócio"
      b(14, { by: "deus" }), // "farás chegar seus filhos e lhes vestirás as túnicas"
      b(15, { by: "deus" }), // "os ungirás como a seu pai: a unção lhes será por sacerdócio perpétuo"
      b(16, { cast: [C("moises", -110, "stand", { dy: 0.5, facing: 1 })], env: { glory: 0.8 } }), // Moisés fez conforme a tudo o que o Senhor lhe ordenou
      b(17, { cast: [C("moises", -120, "raise", { dy: 0.5, facing: 1 }), C("multidao", 150, "stand", { scale: 0.9, dy: 0.46, id: "povo2" })], env: { glory: 0.82 } }), // no primeiro mês do segundo ano, é levantado o tabernáculo
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
