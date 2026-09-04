// ============================================================================
// ÊXODO 35–36 — roteiro do modo CENA VIVA (força-tarefa AT, onda Êxodo).
//
// Êx 35 — AS OFERTAS VOLUNTÁRIAS: Moisés reúne a congregação, reafirma o sábado e
// convoca as ofertas para o santuário; homens e mulheres de coração disposto
// trazem ouro, tecidos e pedras, e as mulheres sábias fiam com as mãos. Bezalel e
// Aoliabe são apresentados, cheios do Espírito para a obra.
//
// Êx 36 — A OBRA COMEÇA: os sábios de coração trabalham; o povo traz tanto que
// Moisés manda cessar as ofertas ("é mais do que basta"). Fazem-se as dez
// cortinas com querubins, as tábuas e bases, o véu e a cortina da porta.
//
// A VOZ DE DEUS (regra do projeto): aqui Moisés é quem fala à congregação
// (`by: "moises"`); o povo e os artífices respondem (`by: "multidao"`, `homem`).
// Deus não fala em cena — a Sua ordem já foi dada; a glória repousa sobre a obra.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });

// ---------------------------------------------------------------------------
// O ARRAIAL (a congregação reunida) e a OFICINA da obra do santuário.
const ARRAIAL: StagePropSpec[] = [
  P("tent", -240, 1.1, undefined, 0.14),
  P("tent", -160, 0.95, undefined, 0.24),
  P("tent", 200, 1.05, undefined, 0.16),
  P("tent", 280, 0.9, undefined, 0.3),
  P("palm", 60, 0.9, undefined, 0.12),
  P("rock", -320, 0.9, undefined, 0.5),
  P("grass", -40, 0.85, undefined, 0.8),
];
// as ofertas empilhadas (ouro, tecidos, madeira)
const OFERTAS: StagePropSpec[] = [
  ...ARRAIAL,
  { ...P("crate", -30, 0.85, undefined, 0.58), tag: "ofertas-santuario" },
  P("amphora", 30, 0.8, undefined, 0.62),
  P("crate", 110, 0.75, undefined, 0.54),
];
// ---------------------------------------------------------------------------
// A OFERTA CONVOCADA NO ARRAIAL (Êx 35:5-9): a mesma lista de Êx 25, agora
// diante do povo — os metais, os tecidos tintos e os pêlos de cabras, as peles
// e a acácia, o azeite e as especiarias, e as pedras de engaste.
const OFERTA_METAIS: StagePropSpec[] = [
  ...ARRAIAL,
  { ...P("bowl", -30, 0.9, 0, 0.6), tag: "ofertas-santuario" },
  P("amphora", 40, 0.85, undefined, 0.64),
  P("crate", 120, 0.85, undefined, 0.56),
];
const OFERTA_TECIDOS: StagePropSpec[] = [
  ...ARRAIAL,
  P("stall", 20, 1.1, undefined, 0.5),
  P("crate", -110, 0.8, undefined, 0.62),
  P("crate", 130, 0.8, undefined, 0.6),
];
const OFERTA_PELES: StagePropSpec[] = [
  ...ARRAIAL,
  P("tree", 130, 1.0, undefined, 0.42),
  P("crate", -100, 0.9, undefined, 0.6),
  P("crate", -30, 0.85, undefined, 0.68),
  P("crate", 40, 0.8, undefined, 0.62),
];
const OFERTA_AZEITE: StagePropSpec[] = [
  ...ARRAIAL,
  P("lampstand", -60, 1.05, undefined, 0.48),
  { ...P("amphora", 20, 0.9, undefined, 0.62), tag: "azeite-puro" },
  { ...P("censer", 120, 1.0, 0.35, 0.46), tag: "incenso-santo" },
];
const OFERTA_PEDRAS: StagePropSpec[] = [
  ...ARRAIAL,
  P("rock", -70, 0.42, undefined, 0.74),
  P("rock", -10, 0.38, undefined, 0.79),
  P("rock", 50, 0.44, undefined, 0.76),
  P("rock", 110, 0.4, undefined, 0.72),
  P("crate", 180, 0.8, undefined, 0.6),
];
// ---------------------------------------------------------------------------
// O ROL DA OBRA (Êx 35:11-19): Moisés enumera, peça por peça, tudo o que os
// sábios de coração hão de fazer — e cada versículo põe no arraial a peça que
// nomeia: o tabernáculo com as suas tábuas, a arca e o véu, a mesa e os seus
// vasos, o candelabro e o azeite, o altar do incenso e a cortina da porta, o
// altar do holocausto e a pia, as cortinas do pátio e o reposteiro, as estacas
// e as cordas, e enfim as vestes santas.
const LISTA_TABERNACULO: StagePropSpec[] = [
  { ...P("tent", 0, 1.5, undefined, 0.4), tag: "tabernaculo" },
  P("crate", -170, 0.85, undefined, 0.6),
  P("crate", 170, 0.85, undefined, 0.6),
  P("tent", -260, 1, undefined, 0.16),
  P("tent", 270, 0.95, undefined, 0.18),
  P("rock", -330, 0.9, undefined, 0.5),
];
const LISTA_ARCA: StagePropSpec[] = [
  { ...P("ark", -30, 1.15, undefined, 0.46), tag: "arca-testemunho" },
  { ...P("door", 130, 1.0, undefined, 0.44), tag: "veu-santissimo" },
  P("tent", -260, 1, undefined, 0.16),
  P("tent", 270, 0.95, undefined, 0.18),
  P("grass", 40, 0.8, undefined, 0.88),
];
const LISTA_MESA: StagePropSpec[] = [
  { ...P("stall", -20, 1.15, undefined, 0.46), tag: "mesa-proposicao" },
  P("bowl", 110, 0.7, 0, 0.62),
  P("bowl", 180, 0.65, 0, 0.72),
  P("tent", -260, 1, undefined, 0.16),
  P("tent", 275, 0.95, undefined, 0.18),
];
const LISTA_CANDELABRO: StagePropSpec[] = [
  { ...P("menorah", -20, 1.3, undefined, 0.46), tag: "candelabro-ouro" },
  { ...P("amphora", 110, 0.85, undefined, 0.6), tag: "azeite-puro" },
  P("tent", -260, 1, undefined, 0.16),
  P("tent", 275, 0.95, undefined, 0.18),
];
const LISTA_INCENSO: StagePropSpec[] = [
  { ...P("censer", -30, 1.15, 0.4, 0.46), tag: "altar-incenso" },
  { ...P("amphora", 70, 0.85, undefined, 0.64), tag: "azeite-puro" },
  { ...P("door", 190, 1.0, undefined, 0.44), tag: "porta-patio" },
  P("tent", -265, 1, undefined, 0.16),
];
const LISTA_HOLOCAUSTO: StagePropSpec[] = [
  { ...P("altar", -40, 1.2, 0.5, 0.46), tag: "altar-holocausto" },
  { ...P("bowl", 130, 0.9, 0, 0.6), tag: "pia-cobre" },
  P("tent", -265, 1, undefined, 0.16),
  P("tent", 275, 0.95, undefined, 0.18),
];
const LISTA_PATIO: StagePropSpec[] = [
  { ...P("tent", -60, 1.2, undefined, 0.42), tag: "patio-tabernaculo" },
  { ...P("door", 90, 1.05, undefined, 0.46), tag: "porta-patio" },
  P("tower", -280, 0.85, undefined, 0.32),
  P("tower", -180, 0.85, undefined, 0.32),
  P("tower", 200, 0.85, undefined, 0.32),
  P("tower", 300, 0.85, undefined, 0.32),
];
const LISTA_ESTACAS: StagePropSpec[] = [
  { ...P("tent", 0, 1.35, undefined, 0.36), tag: "patio-tabernaculo" },
  P("crate", -230, 0.7, undefined, 0.66),
  P("crate", -160, 0.7, undefined, 0.72),
  P("crate", 160, 0.7, undefined, 0.72),
  P("crate", 230, 0.7, undefined, 0.66),
  P("grass", -70, 0.8, undefined, 0.9),
  P("rock", 330, 0.9, undefined, 0.5),
];
const LISTA_VESTES: StagePropSpec[] = [
  P("crate", -60, 0.9, undefined, 0.62),
  P("amphora", 20, 0.85, undefined, 0.68),
  P("tent", -260, 1, undefined, 0.16),
  P("tent", 270, 0.95, undefined, 0.18),
  P("rock", -330, 0.9, undefined, 0.5),
  P("grass", 130, 0.8, undefined, 0.88),
];
// a obra: o tabernáculo a erguer-se
const OBRA: StagePropSpec[] = [
  { ...P("tent", 0, 1.55, undefined, 0.36), tag: "tabernaculo" },
  P("tent", -150, 1.05, undefined, 0.5),
  P("tent", 150, 1.05, undefined, 0.5),
  P("crate", -250, 0.7, undefined, 0.6),
  P("crate", 250, 0.7, undefined, 0.6),
  P("rock", -330, 1, undefined, 0.5),
];

// ---------------------------------------------------------------------------
// A OBRA DAS TÁBUAS (Êx 36:20-34): as tábuas de acácia lavradas e postas em pé
// (crate), as bases de prata fundidas debaixo de cada uma (amphora) e as
// travessas que atravessam as paredes (rod). Cada lado — sul, norte, ocidente,
// os cantos — vai nascendo sob as mãos dos artífices.
const OBRA_TABUAS: StagePropSpec[] = [
  { ...P("tent", 0, 1.5, undefined, 0.32), tag: "tabernaculo" },
  P("crate", -140, 0.95, undefined, 0.52),
  P("crate", -70, 0.9, undefined, 0.58),
  P("crate", 110, 0.9, undefined, 0.56),
  P("crate", 250, 0.7, undefined, 0.62),
  P("rock", -330, 1, undefined, 0.5),
];
const OBRA_SUL: StagePropSpec[] = [
  { ...P("tent", 90, 1.45, undefined, 0.34), tag: "tabernaculo" },
  P("crate", -250, 0.85, undefined, 0.46),
  P("crate", -190, 0.9, undefined, 0.5),
  P("crate", -130, 0.95, undefined, 0.54),
  P("crate", -70, 1, undefined, 0.58),
  P("rock", 320, 0.95, undefined, 0.52),
];
const OBRA_BASES_SUL: StagePropSpec[] = [
  { ...P("tent", 90, 1.4, undefined, 0.32), tag: "tabernaculo" },
  P("crate", -200, 0.9, undefined, 0.48),
  P("crate", -110, 0.95, undefined, 0.52),
  P("amphora", -245, 0.7, undefined, 0.68),
  P("amphora", -170, 0.7, undefined, 0.72),
  P("amphora", -90, 0.7, undefined, 0.7),
  P("rock", 320, 0.95, undefined, 0.52),
];
const OBRA_NORTE: StagePropSpec[] = [
  { ...P("tent", -90, 1.45, undefined, 0.34), tag: "tabernaculo" },
  P("crate", 70, 1, undefined, 0.58),
  P("crate", 130, 0.95, undefined, 0.54),
  P("crate", 190, 0.9, undefined, 0.5),
  P("crate", 250, 0.85, undefined, 0.46),
  P("rock", -330, 1, undefined, 0.5),
];
const OBRA_BASES_NORTE: StagePropSpec[] = [
  { ...P("tent", -100, 1.4, undefined, 0.32), tag: "tabernaculo" },
  P("crate", 110, 0.95, undefined, 0.52),
  P("crate", 200, 0.9, undefined, 0.48),
  P("amphora", 90, 0.7, undefined, 0.7),
  P("amphora", 170, 0.7, undefined, 0.72),
  P("amphora", 245, 0.7, undefined, 0.68),
  P("rock", -330, 1, undefined, 0.5),
];
const OBRA_OCIDENTE: StagePropSpec[] = [
  { ...P("tent", 0, 1.5, undefined, 0.28), tag: "tabernaculo" },
  P("crate", -140, 0.9, undefined, 0.6),
  P("crate", -84, 0.9, undefined, 0.6),
  P("crate", -28, 0.9, undefined, 0.62),
  P("crate", 28, 0.9, undefined, 0.62),
  P("crate", 84, 0.9, undefined, 0.6),
  P("crate", 140, 0.9, undefined, 0.6),
  P("rock", -330, 1, undefined, 0.5),
];
const OBRA_CANTOS: StagePropSpec[] = [
  { ...P("tent", 0, 1.5, undefined, 0.28), tag: "tabernaculo" },
  P("crate", -170, 1, undefined, 0.56),
  P("crate", 170, 1, undefined, 0.56),
  P("amphora", -205, 0.7, undefined, 0.7),
  P("amphora", 205, 0.7, undefined, 0.7),
  P("rock", -330, 1, undefined, 0.5),
  P("grass", -60, 0.8, undefined, 0.84),
];
const OBRA_TRAVESSAS: StagePropSpec[] = [
  { ...P("tent", 0, 1.5, undefined, 0.28), tag: "tabernaculo" },
  P("rod", -150, 1.2, undefined, 0.52),
  P("rod", -85, 1.2, undefined, 0.58),
  P("rod", 85, 1.2, undefined, 0.58),
  P("rod", 150, 1.2, undefined, 0.52),
  P("crate", -245, 0.85, undefined, 0.62),
  P("crate", 245, 0.85, undefined, 0.62),
  P("rock", 330, 0.95, undefined, 0.52),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Êx 35
  // O sábado reafirmado → a convocação das ofertas → o povo generoso (ouro,
  // tecidos, fiação) → e a apresentação de Bezalel e Aoliabe para a obra.
  35: {
    start: { terrain: "desert", night: 0.14, glory: 0.55, storm: 0, fire: 0, verdure: 0.4 },
    beats: [
      b(1, { by: "moises", q: "e disse-lhes: ", set: "arraial", cast: [C("moises", -90, "raise", { dy: 0.5, facing: 1 }), C("multidao", 30, "stand", { dy: 0.48 }), C("multidao", 140, "stand", { scale: 0.9, dy: 0.52, id: "povo2" })], props: ARRAIAL, env: { terrain: "desert", glory: 0.55, night: 0.12 } }), // Moisés convoca a congregação: "estas são as palavras que o Senhor ordenou"
      b(2, { by: "moises" }), // "seis dias se trabalhará, mas o sétimo vos será santo, o sábado do repouso"
      b(3, { by: "moises" }), // "não acendereis fogo em nenhuma das vossas moradas no dia do sábado"
      b(4, { by: "moises", q: "dizendo: ", cast: [C("moises", -90, "point", { dy: 0.5, facing: 1 }), C("multidao", 30, "stand", { dy: 0.48 })] }), // "esta é a palavra que o Senhor ordenou"
      b(5, { by: "moises" }), // "tomai do que tendes uma oferta ao Senhor: ouro, prata e cobre"
      b(6, { by: "moises" }), // "azul, púrpura, carmesim, linho fino e pêlos de cabras"
      b(7, { by: "moises" }), // "peles de carneiros e de texugos, e madeira de acácia"
      b(8, { by: "moises" }), // "azeite para a luminária, e especiarias para a unção e o incenso"
      b(9, { by: "moises" }), // "pedras de ônix e de engaste, para o éfode e o peitoral"
      b(10, { by: "moises", env: { glory: 0.6 } }), // "venham todos os sábios de coração e façam tudo o que o Senhor mandou"
      b(11, { by: "moises" }), // "o tabernáculo, a tenda, os colchetes, as tábuas, as barras, as colunas e bases"
      b(12, { by: "moises" }), // "a arca e os seus varais, o propiciatório e o véu de cobertura"
      b(13, { by: "moises" }), // "a mesa, os seus varais e pertences, e os pães da proposição"
      b(14, { by: "moises" }), // "o candelabro da luminária, as lâmpadas e o azeite para a luz"
      b(15, { by: "moises" }), // "o altar do incenso, o azeite da unção, o incenso e a cortina da porta"
      b(16, { by: "moises" }), // "o altar do holocausto, o crivo de cobre, a pia e a sua base"
      b(17, { by: "moises" }), // "as cortinas do pátio, as colunas e bases, e o reposteiro da porta"
      b(18, { by: "moises" }), // "as estacas do tabernáculo e do pátio, e as suas cordas"
      b(19, { by: "moises", env: { glory: 0.62 } }), // "as vestes do ministério e as vestes santas de Arão e seus filhos"
      b(20, { cast: [C("multidao", -20, "walk", { dy: 0.5, facing: -1 }), C("multidao", 90, "walk", { scale: 0.9, dy: 0.54, id: "povo2", facing: -1 }), C("moises", -120, "stand", { dy: 0.5, facing: 1 })], env: { glory: 0.55 } }), // toda a congregação sai da presença de Moisés
      b(21, { set: "ofertas", cast: [C("multidao", -20, "raise", { dy: 0.5 }), C("multidao", 70, "kneel", { scale: 0.9, dy: 0.56, id: "povo2" }), C("moises", -130, "stand", { dy: 0.5, facing: 1 })], props: OFERTAS, env: { terrain: "desert", glory: 0.6, night: 0.1 } }), // vem todo o que o coração moveu, e traz a oferta para a obra da tenda
      b(22, { cast: [C("homem", -30, "raise", { dy: 0.5, id: "doador", facing: 1 }), C("mulherComum", 40, "raise", { dy: 0.52, id: "doadora", facing: -1 }), C("multidao", 130, "stand", { scale: 0.9, dy: 0.5, id: "povo2" })], env: { glory: 0.65 } }), // homens e mulheres trazem fivelas, pendentes, anéis e todo objeto de ouro
      b(23, { cast: [C("homem", -30, "stand", { dy: 0.5, id: "doador", facing: 1 }), C("multidao", 60, "kneel", { dy: 0.52 })] }), // trazem azul, púrpura, carmesim, linho e peles
      b(24, { cast: [C("homem", -40, "kneel", { dy: 0.52, id: "doador", facing: 1 }), C("multidao", 60, "stand", { dy: 0.5 })] }), // trazem prata, metal e madeira de acácia para a obra
      b(25, { cast: [C("mulherComum", -30, "stand", { dy: 0.5, id: "fiadeira", facing: 1 }), C("mulherComum", 50, "stand", { dy: 0.52, id: "fiadeira2", facing: -1 }), C("multidao", 140, "stand", { scale: 0.9, dy: 0.5, id: "povo2" })], env: { glory: 0.6 } }), // as mulheres sábias de coração fiam com as mãos o azul, a púrpura e o linho
      b(26, { cast: [C("mulherComum", -30, "stand", { dy: 0.5, id: "fiadeira", facing: 1 }), C("mulherComum", 50, "stand", { dy: 0.52, id: "fiadeira2", facing: -1 })] }), // as mulheres, movidas em habilidade, fiam os pêlos das cabras
      b(27, { cast: [C("anciao", -30, "raise", { dy: 0.5, facing: 1 }), C("anciao", 50, "stand", { dy: 0.52, id: "principe2", facing: -1 }), C("moises", -120, "stand", { dy: 0.5, facing: 1 })] }), // os príncipes trazem pedras de ônix e de engaste para o éfode e o peitoral
      b(28, { cast: [C("anciao", -30, "stand", { dy: 0.5 }), C("multidao", 60, "kneel", { dy: 0.52 })] }), // e especiarias e azeite para a luz, a unção e o incenso
      b(29, { cast: [C("multidao", 20, "stand", { dy: 0.48 }), C("multidao", 120, "stand", { scale: 0.9, dy: 0.52, id: "povo2" }), C("mulherComum", -60, "stand", { dy: 0.5, id: "doadora", facing: 1 })], env: { glory: 0.72 } }), // todo homem e mulher trazem por oferta voluntária ao Senhor
      b(30, { by: "moises", q: "Depois disse Moisés aos filhos de Israel: ", cast: [C("moises", -80, "point", { dy: 0.5, facing: 1 }), C("homem", 20, "stand", { dy: 0.5, id: "bezalel", facing: -1 }), C("multidao", 130, "stand", { scale: 0.9, dy: 0.5, id: "povo2" })], env: { glory: 0.65 } }), // "o Senhor tem chamado por nome a Bezalel, da tribo de Judá"
      b(31, { by: "moises", env: { glory: 0.7 } }), // "o Espírito de Deus o encheu de sabedoria, entendimento e ciência, em todo o lavor"
      b(32, { by: "moises" }), // "para criar invenções, e trabalhar em ouro, prata e cobre"
      b(33, { by: "moises" }), // "em lapidar pedras, e entalhar madeira, em toda a obra esmerada"
      b(34, { by: "moises", cast: [C("moises", -80, "point", { dy: 0.5, facing: 1 }), C("homem", 20, "stand", { dy: 0.5, id: "bezalel", facing: -1 }), C("homem", 90, "stand", { dy: 0.5, id: "aoliabe", facing: -1 })] }), // "dispôs o coração para ensinar, a ele e a Aoliabe, da tribo de Dã"
      b(35, { by: "moises", env: { glory: 0.72 } }), // "encheu-os de sabedoria para toda a obra de mestre, gravador, bordador e tecelão"
    ],
  },

  // ------------------------------------------------------------------ Êx 36
  // Os sábios põem mãos à obra → o povo traz mais do que basta e Moisés manda
  // cessar → e fazem-se as cortinas com querubins, as tábuas, o véu e a porta.
  36: {
    start: { terrain: "desert", night: 0.14, glory: 0.6, storm: 0, fire: 0, verdure: 0.4 },
    beats: [
      b(1, { set: "obra", cast: [C("homem", -40, "raise", { dy: 0.5, id: "bezalel", facing: 1 }), C("homem", 40, "stand", { dy: 0.5, id: "aoliabe", facing: -1 }), C("multidao", 150, "stand", { scale: 0.9, dy: 0.48, id: "sabios" })], props: OBRA, env: { terrain: "desert", glory: 0.62, night: 0.1 } }), // Bezalel, Aoliabe e os sábios trabalham na obra do santuário
      b(2, { cast: [C("moises", -110, "point", { dy: 0.5, facing: 1 }), C("homem", -30, "stand", { dy: 0.5, id: "bezalel", facing: 1 }), C("homem", 40, "stand", { dy: 0.5, id: "aoliabe", facing: -1 })], env: { glory: 0.6 } }), // Moisés chama Bezalel, Aoliabe e todo sábio de coração à obra
      b(3, { cast: [C("multidao", -30, "kneel", { dy: 0.52 }), C("homem", 60, "stand", { dy: 0.5, id: "bezalel", facing: -1 }), C("moises", -120, "stand", { dy: 0.5, facing: 1 })], env: { glory: 0.62 } }), // recebem as ofertas, que o povo ainda traz cada manhã
      b(4, { cast: [C("homem", -40, "stand", { dy: 0.5, id: "bezalel", facing: 1 }), C("homem", 30, "stand", { dy: 0.5, id: "aoliabe", facing: -1 }), C("multidao", 130, "stand", { scale: 0.9, dy: 0.48, id: "sabios" })] }), // vêm todos os sábios, cada um da obra que fazia
      b(5, { by: "homem", q: "dizendo: ", cast: [C("homem", -30, "point", { dy: 0.5, id: "bezalel", facing: 1 }), C("moises", -110, "stand", { dy: 0.5, facing: 1 })] }), // dizem a Moisés: "o povo traz muito mais do que basta para a obra"
      b(6, { by: "moises", q: "dizendo: ", cast: [C("moises", -80, "raise", { dy: 0.5, facing: 1 }), C("multidao", 60, "stand", { dy: 0.5 }), C("multidao", 150, "stand", { scale: 0.9, dy: 0.52, id: "povo2" })], env: { glory: 0.6 } }), // Moisés faz proclamar: "nenhum homem nem mulher faça mais oferta para o santuário"
      b(7, { cast: [C("homem", -30, "stand", { dy: 0.5, id: "bezalel", facing: 1 }), C("multidao", 60, "stand", { dy: 0.5 })], env: { glory: 0.65 } }), // havia material bastante para toda a obra, e ainda sobejava
      b(8, { cast: [C("homem", -40, "raise", { dy: 0.5, id: "bezalel", facing: 1 }), C("homem", 60, "stand", { dy: 0.5, id: "sabio2", facing: -1 })], props: OBRA, env: { glory: 0.68 } }), // fazem o tabernáculo de dez cortinas de linho, com querubins, da obra mais esmerada
      b(9, {}), // cada cortina de vinte e oito côvados de comprimento e quatro de largura
      b(10, {}), // ligam cinco cortinas umas às outras, e outras cinco também
      b(11, {}), // fazem laçadas de azul na borda de cada cortina, na juntura
      b(12, {}), // cinqüenta laçadas contrapostas uma à outra
      b(13, { env: { glory: 0.7 } }), // cinqüenta colchetes de ouro unem as cortinas: um só tabernáculo
      b(14, { cast: [C("homem", -40, "stand", { dy: 0.5, id: "bezalel", facing: 1 }), C("multidao", 60, "stand", { dy: 0.48, id: "sabios" })] }), // fazem onze cortinas de pêlos de cabras para a tenda sobre o tabernáculo
      b(15, {}), // cada cortina de trinta côvados de comprimento e quatro de largura
      b(16, {}), // unem cinco cortinas à parte e outras seis à parte
      b(17, {}), // fazem cinqüenta laçadas na borda de cada juntura
      b(18, {}), // cinqüenta colchetes de metal ajuntam a tenda num todo
      b(19, {}), // uma coberta de peles de carneiro tintas de vermelho, e outra de texugos
      b(20, { cast: [C("homem", -40, "raise", { dy: 0.5, id: "bezalel", facing: 1 }), C("multidao", 70, "stand", { dy: 0.48, id: "sabios" })] }), // fazem as tábuas de acácia, postas verticalmente para o tabernáculo
      b(21, { props: OBRA_TABUAS, cast: [C("homem", -230, "point", { dy: 0.52, id: "bezalel", facing: 1 }), C("homem", 200, "stand", { dy: 0.5, id: "aoliabe", facing: -1 })], env: { glory: 0.68 } }), // cada tábua de dez côvados de comprimento e um e meio de largura
      b(22, { cast: [C("homem", -200, "kneel", { dy: 0.56, id: "bezalel", facing: 1 }), C("multidao", 190, "stand", { scale: 0.9, dy: 0.5, id: "sabios" })] }), // cada tábua com duas cavilhas travadas uma à outra
      b(23, { props: OBRA_SUL, cast: [C("homem", 210, "raise", { dy: 0.5, id: "bezalel", facing: -1 }), C("multidao", 300, "stand", { scale: 0.85, dy: 0.48, id: "sabios" })], env: { glory: 0.7 } }), // vinte tábuas para o lado do sul
      b(24, { props: OBRA_BASES_SUL, cast: [C("homem", 200, "kneel", { dy: 0.54, id: "bezalel", facing: -1 }), C("homem", 280, "stand", { dy: 0.5, id: "aoliabe", facing: -1 })], env: { glory: 0.66 } }), // quarenta bases de prata debaixo das vinte tábuas
      b(25, { props: OBRA_NORTE, cast: [C("homem", -210, "raise", { dy: 0.5, id: "bezalel", facing: 1 }), C("multidao", -300, "stand", { scale: 0.85, dy: 0.48, id: "sabios" })], env: { glory: 0.7 } }), // vinte tábuas ao outro lado, para o norte
      b(26, { props: OBRA_BASES_NORTE, cast: [C("homem", -200, "kneel", { dy: 0.54, id: "bezalel", facing: 1 }), C("homem", -280, "stand", { dy: 0.5, id: "aoliabe", facing: 1 })], env: { glory: 0.66 } }), // com as suas quarenta bases de prata
      b(27, { props: OBRA_OCIDENTE, cast: [C("homem", -240, "stand", { dy: 0.52, id: "bezalel", facing: 1 }), C("homem", 240, "stand", { dy: 0.52, id: "aoliabe", facing: -1 })], env: { glory: 0.72 } }), // seis tábuas ao lado do ocidente
      b(28, { props: OBRA_CANTOS, cast: [C("homem", -250, "point", { dy: 0.52, id: "bezalel", facing: 1 }), C("multidao", 260, "stand", { scale: 0.85, dy: 0.5, id: "sabios" })] }), // duas tábuas para os cantos do tabernáculo
      b(29, { cast: [C("homem", -250, "kneel", { dy: 0.56, id: "bezalel", facing: 1 }), C("homem", 250, "kneel", { dy: 0.56, id: "aoliabe", facing: -1 })], env: { glory: 0.7 } }), // juntas por baixo e por cima com uma argola, nos dois cantos
      b(30, { cast: [C("homem", -230, "stand", { dy: 0.52, id: "bezalel", facing: 1 }), C("multidao", 240, "stand", { scale: 0.9, dy: 0.5, id: "sabios" })], env: { glory: 0.66 } }), // oito tábuas com dezesseis bases de prata
      b(31, { props: OBRA_TRAVESSAS, cast: [C("homem", -250, "raise", { dy: 0.5, id: "bezalel", facing: 1 }), C("homem", -180, "stand", { dy: 0.52, id: "sabio2", facing: 1 })], env: { glory: 0.7 } }), // travessas de acácia: cinco para as tábuas de um lado
      b(32, { cast: [C("homem", 250, "raise", { dy: 0.5, id: "aoliabe", facing: -1 }), C("homem", 180, "stand", { dy: 0.52, id: "sabio2", facing: -1 })] }), // cinco para o outro lado, e cinco para o lado ocidental
      b(33, { cast: [C("homem", -200, "point", { dy: 0.52, id: "bezalel", facing: 1 }), C("homem", 200, "point", { dy: 0.52, id: "aoliabe", facing: -1 }), C("multidao", 300, "stand", { scale: 0.85, dy: 0.48, id: "sabios" })], env: { glory: 0.74 } }), // a travessa do meio passa de uma extremidade à outra
      b(34, { env: { glory: 0.72 } }), // cobrem as tábuas e as travessas de ouro, com argolas de ouro
      b(35, { props: [{ ...P("tent", 0, 1.55, undefined, 0.36), tag: "tabernaculo" }, { ...P("door", 70, 1, undefined, 0.44), tag: "veu-santissimo" }, P("tent", -150, 1.05, undefined, 0.5), P("rock", -330, 1, undefined, 0.5), P("rock", 330, 0.95, undefined, 0.52)], env: { glory: 0.78 } }), // fazem o véu de azul, púrpura e carmesim, com querubins de obra esmerada
      b(36, {}), // quatro colunas de acácia cobertas de ouro, com quatro bases de prata
      b(37, { cast: [C("homem", -40, "raise", { dy: 0.5, id: "bezalel", facing: 1 }), C("multidao", 70, "stand", { dy: 0.48, id: "sabios" })] }), // fazem o véu da porta da tenda, de azul, púrpura e carmesim, obra de bordador
      b(38, { env: { glory: 0.8 } }), // com cinco colunas, colchetes e cabeças de ouro, e cinco bases de cobre
    ],
  },
};
