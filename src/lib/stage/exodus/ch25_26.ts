// ============================================================================
// ÊXODO 25–26 — roteiro do modo CENA VIVA (força-tarefa AT, onda Êxodo).
//
// Êx 25–26 — O MODELO DO SANTUÁRIO: no alto do monte, na glória, Deus mostra a
// Moisés o "modelo" do tabernáculo e dita cada peça — a oferta voluntária, a
// ARCA do testemunho com os querubins e o propiciatório (de onde Ele falará), a
// MESA dos pães, o CANDELABRO de ouro de sete lâmpadas; e depois as cortinas, as
// tábuas, o VÉU que separa o santo do santíssimo, e a porta da tenda.
//
// A VOZ DE DEUS (regra do projeto): Moisés está no monte, na nuvem e no fogo; a
// ordem vem do céu, SEM figura — `by: "deus"`, com glória alta. Cada peça aparece
// como um "modelo" revelado no cume (ark, lampstand, tenda, querubins), à medida
// que a voz a descreve.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });

// ---------------------------------------------------------------------------
// Modelos revelados no cume (na glória). Cada seção troca o objeto central.
const OFERTAS: StagePropSpec[] = [
  { ...P("crate", -40, 0.9, undefined, 0.55), tag: "oferta-alcada" },
  P("amphora", 40, 0.85, undefined, 0.58),
  P("crate", 120, 0.8, undefined, 0.5),
  P("rock", -300, 1.1, undefined, 0.5),
  P("rock", 300, 1.05, undefined, 0.52),
  P("grass", -120, 0.78, undefined, 0.82),
];
// ---------------------------------------------------------------------------
// O CUME NU (Êx 25:1): antes de qualquer peça, só o monte e a voz.
const CUME: StagePropSpec[] = [
  { ...P("rock", 0, 1.7, undefined, 0.24), tag: "monte-sinai" },
  P("rock", -300, 1.1, undefined, 0.5),
  P("rock", 300, 1.05, undefined, 0.52),
  P("bush", -150, 0.75, undefined, 0.44),
];
// ---------------------------------------------------------------------------
// A OFERTA ALÇADA, MATÉRIA POR MATÉRIA (Êx 25:3-7). Cada versículo nomeia uma
// classe diferente de coisa, e o modelo no cume mostra a que está sendo pedida:
// os metais, os tecidos tintos, as peles e a madeira, o azeite e as
// especiarias, e por fim as pedras de engaste do éfode e do peitoral.
const METAIS: StagePropSpec[] = [
  { ...P("bowl", -60, 0.95, 0, 0.56), tag: "oferta-alcada" },   // o ouro
  P("amphora", 20, 0.85, undefined, 0.62),                       // a prata
  P("crate", 110, 0.85, undefined, 0.54),                        // o cobre
  P("rock", -300, 1.1, undefined, 0.5),
  P("rock", 300, 1.05, undefined, 0.52),
];
const TECIDOS: StagePropSpec[] = [
  P("stall", 10, 1.15, undefined, 0.46),                         // azul, púrpura, carmesim, linho
  P("crate", -140, 0.82, undefined, 0.58),
  P("crate", 150, 0.8, undefined, 0.56),
  P("rock", -300, 1.1, undefined, 0.5),
  P("rock", 300, 1.05, undefined, 0.52),
];
const PELES_MADEIRA: StagePropSpec[] = [
  P("tree", 100, 1.05, undefined, 0.36),                         // a acácia de que se lavra tudo
  P("crate", -120, 0.95, undefined, 0.56),
  P("crate", -50, 0.9, undefined, 0.62),
  P("crate", 20, 0.85, undefined, 0.58),
  P("rock", -300, 1.1, undefined, 0.5),
  P("rock", 300, 1.05, undefined, 0.52),
];
const AZEITE_ESPECIARIAS: StagePropSpec[] = [
  P("lampstand", -80, 1.1, undefined, 0.44),                     // azeite para a luz
  { ...P("amphora", 10, 0.9, undefined, 0.6), tag: "azeite-puro" },
  { ...P("censer", 120, 1.05, 0.35, 0.44), tag: "incenso-santo" },
  P("rock", -300, 1.1, undefined, 0.5),
  P("rock", 300, 1.05, undefined, 0.52),
];
const PEDRAS_ENGASTE: StagePropSpec[] = [
  P("rock", -90, 0.42, undefined, 0.72),                         // as pedras de ônix e de engaste
  P("rock", -30, 0.36, undefined, 0.77),
  P("rock", 30, 0.44, undefined, 0.74),
  P("rock", 90, 0.38, undefined, 0.7),
  P("crate", 200, 0.8, undefined, 0.56),
  P("rock", -300, 1.1, undefined, 0.5),
  P("rock", 300, 1.05, undefined, 0.52),
];
const SANTUARIO: StagePropSpec[] = [
  { ...P("tent", 0, 1.55, undefined, 0.36), tag: "tabernaculo" },
  P("rock", -320, 1, undefined, 0.5),
  P("rock", 320, 0.95, undefined, 0.52),
  P("grass", -70, 0.78, undefined, 0.84),
];
// ---------------------------------------------------------------------------
// A ARCA, PEÇA POR PEÇA (Êx 25:10-22): a caixa de acácia medida a côvados, o
// ouro que a cobre por dentro e por fora, as quatro argolas fundidas nos
// cantos, as varas de acácia que entram nelas e nunca mais se tiram, o
// testemunho posto dentro, e enfim os dois querubins sobre o propiciatório.
const ARCA_ACACIA: StagePropSpec[] = [
  { ...P("ark", 0, 1.05, undefined, 0.44), tag: "arca-testemunho" },
  P("crate", -150, 0.9, undefined, 0.56),
  P("crate", 150, 0.85, undefined, 0.58),
  P("rock", -300, 1.1, undefined, 0.5),
  P("rock", 300, 1.05, undefined, 0.52),
];
const ARCA_OURO: StagePropSpec[] = [
  { ...P("ark", 0, 1.3, undefined, 0.42), tag: "arca-testemunho" },
  P("amphora", -160, 0.85, undefined, 0.6),
  P("amphora", 160, 0.8, undefined, 0.62),
  P("rock", -305, 1.1, undefined, 0.5),
  P("rock", 305, 1.05, undefined, 0.52),
];
const ARCA_ARGOLAS: StagePropSpec[] = [
  { ...P("ark", 0, 1.15, undefined, 0.4), tag: "arca-testemunho" },
  P("amphora", -95, 0.6, undefined, 0.64),
  P("amphora", -35, 0.6, undefined, 0.69),
  P("amphora", 35, 0.6, undefined, 0.69),
  P("amphora", 95, 0.6, undefined, 0.64),
  P("rock", -300, 1.1, undefined, 0.5),
  P("rock", 300, 1.05, undefined, 0.52),
];
const ARCA_VARAS: StagePropSpec[] = [
  { ...P("ark", 70, 1.15, undefined, 0.44), tag: "arca-testemunho" },
  P("crate", -170, 0.9, undefined, 0.58),
  P("crate", -100, 0.85, undefined, 0.63),
  P("amphora", -35, 0.75, undefined, 0.67),
  P("rock", -305, 1.1, undefined, 0.5),
  P("rock", 305, 1.05, undefined, 0.52),
];
const ARCA_LEVADA: StagePropSpec[] = [
  { ...P("ark", 100, 1.2, undefined, 0.5), tag: "arca-testemunho" },
  P("rock", -300, 1.1, undefined, 0.46),
  P("rock", 310, 1.05, undefined, 0.56),
  P("grass", -80, 0.8, undefined, 0.84),
];
const ARCA_TESTEMUNHO: StagePropSpec[] = [
  { ...P("ark", 0, 1.25, undefined, 0.44), tag: "arca-testemunho" },
  { ...P("scroll", -130, 0.85, undefined, 0.56), tag: "tabuas-testemunho" },
  P("rock", -305, 1.1, undefined, 0.5),
  P("rock", 305, 1.05, undefined, 0.52),
];
const ARCA_QUERUBINS: StagePropSpec[] = [
  { ...P("ark", 0, 1.2, undefined, 0.44), tag: "arca-testemunho" },
  { ...P("cherub", -70, 0.85, undefined, 0.3) },
  { ...P("cherub", 70, 0.85, undefined, 0.3) },
  P("rock", -305, 1.1, undefined, 0.5),
  P("rock", 305, 1.05, undefined, 0.52),
];
const MESA: StagePropSpec[] = [
  { ...P("stall", 0, 1.1, undefined, 0.44), tag: "mesa-proposicao" },
  P("rock", -300, 1.1, undefined, 0.5),
  P("rock", 300, 1.05, undefined, 0.52),
  P("grass", -40, 0.78, undefined, 0.82),
];
// A MESA, PEÇA POR PEÇA (Êx 25:24-30): o ouro que a cobre, a moldura de quatro
// dedos, as quatro argolas fundidas nos pés, os varais de acácia, e os pratos,
// colheres, cobertas e tigelas de ouro puro que hão de estar sobre ela.
const MESA_OURO: StagePropSpec[] = [
  { ...P("stall", 0, 1.2, undefined, 0.44), tag: "mesa-proposicao" },
  P("amphora", -150, 0.85, undefined, 0.6),
  P("amphora", 155, 0.8, undefined, 0.62),
  P("rock", -300, 1.1, undefined, 0.5),
  P("rock", 300, 1.05, undefined, 0.52),
];
const MESA_MOLDURA: StagePropSpec[] = [
  { ...P("stall", 0, 1.45, undefined, 0.5), tag: "mesa-proposicao" },
  P("rock", -305, 1.1, undefined, 0.46),
  P("rock", 305, 1.05, undefined, 0.5),
  P("grass", -100, 0.8, undefined, 0.86),
];
const MESA_ARGOLAS: StagePropSpec[] = [
  { ...P("stall", 0, 1.25, undefined, 0.46), tag: "mesa-proposicao" },
  P("amphora", -85, 0.6, undefined, 0.68),
  P("amphora", -30, 0.6, undefined, 0.73),
  P("amphora", 30, 0.6, undefined, 0.73),
  P("amphora", 85, 0.6, undefined, 0.68),
  P("rock", -300, 1.1, undefined, 0.5),
  P("rock", 300, 1.05, undefined, 0.52),
];
const MESA_VARAS: StagePropSpec[] = [
  { ...P("stall", 80, 1.2, undefined, 0.46), tag: "mesa-proposicao" },
  P("crate", -170, 0.9, undefined, 0.58),
  P("crate", -100, 0.85, undefined, 0.63),
  P("rock", -305, 1.1, undefined, 0.5),
  P("rock", 305, 1.05, undefined, 0.52),
];
const MESA_VASOS: StagePropSpec[] = [
  { ...P("stall", -50, 1.15, undefined, 0.42), tag: "mesa-proposicao" },
  P("bowl", 70, 0.7, 0, 0.62),
  P("bowl", 145, 0.62, 0, 0.7),
  P("bowl", 210, 0.66, 0, 0.56),
  P("amphora", 15, 0.7, undefined, 0.72),
  P("rock", -305, 1.1, undefined, 0.5),
  P("rock", 305, 1.05, undefined, 0.52),
];
const CANDELABRO: StagePropSpec[] = [
  { ...P("menorah", 0, 1.35, undefined, 0.42), tag: "candelabro-ouro" },
  P("rock", -300, 1.1, undefined, 0.5),
  P("rock", 300, 1.05, undefined, 0.52),
];
// O CANDELABRO, HASTE POR HASTE (Êx 25:32-37). Aqui a peça é UMA SÓ — "tudo de
// uma só peça, obra batida" — e o que muda de versículo para versículo é o que
// a voz manda OLHAR: as seis hastes abertas dos lados, os copos de amêndoa da
// haste, os quatro copos do próprio tronco, os botões debaixo de cada par, e
// enfim o ouro batido inteiro, com o talento de onde saiu.
const CANDELABRO_HASTES: StagePropSpec[] = [
  { ...P("menorah", 0, 1.6, undefined, 0.38), tag: "candelabro-ouro" },
  P("rock", -305, 1.1, undefined, 0.5),
  P("rock", 305, 1.05, undefined, 0.52),
  P("grass", -130, 0.78, undefined, 0.84),
];
const CANDELABRO_AMENDOAS: StagePropSpec[] = [
  { ...P("menorah", 30, 1.85, undefined, 0.52), tag: "candelabro-ouro" },
  P("rock", -310, 1.1, undefined, 0.44),
  P("rock", 310, 1.05, undefined, 0.48),
];
const CANDELABRO_COPOS: StagePropSpec[] = [
  { ...P("menorah", -80, 1.55, undefined, 0.44), tag: "candelabro-ouro" },
  P("amphora", 140, 0.8, undefined, 0.6),
  P("rock", -310, 1.1, undefined, 0.5),
  P("rock", 310, 1.05, undefined, 0.52),
];
const CANDELABRO_BOTOES: StagePropSpec[] = [
  { ...P("menorah", 0, 1.7, undefined, 0.6), tag: "candelabro-ouro" },
  P("rock", -310, 1.1, undefined, 0.42),
  P("rock", 310, 1.05, undefined, 0.46),
  P("grass", 130, 0.8, undefined, 0.86),
];
const CANDELABRO_BATIDO: StagePropSpec[] = [
  { ...P("menorah", 0, 1.45, undefined, 0.42), tag: "candelabro-ouro" },
  P("amphora", -155, 0.85, undefined, 0.6),
  P("amphora", 155, 0.8, undefined, 0.62),
  P("rock", -305, 1.1, undefined, 0.5),
  P("rock", 305, 1.05, undefined, 0.52),
];
const TABERNACULO: StagePropSpec[] = [
  { ...P("tent", 0, 1.55, undefined, 0.36), tag: "tabernaculo" },
  P("tent", -150, 1.05, undefined, 0.5),
  P("tent", 150, 1.05, undefined, 0.5),
  P("rock", -320, 1, undefined, 0.5),
  P("rock", 320, 0.95, undefined, 0.52),
];
// ---------------------------------------------------------------------------
// AS TÁBUAS, AS BASES E AS BARRAS (Êx 26:15-30). O esqueleto da morada, medida
// por medida: a madeira de acácia posta em pé (crate), as bases de prata
// fundidas debaixo de cada tábua (amphora), e as travessas que atravessam de
// uma extremidade à outra (rod). Cada lado do tabernáculo — sul, norte,
// ocidente, os cantos — muda o lugar da peça no palco, para que a construção
// avance diante dos olhos enquanto a voz a dita.
const TABUAS: StagePropSpec[] = [
  { ...P("tent", 0, 1.45, undefined, 0.36), tag: "tabernaculo" },
  P("crate", -130, 0.95, undefined, 0.5),
  P("crate", -70, 0.9, undefined, 0.56),
  P("crate", 90, 0.9, undefined, 0.54),
  P("rock", -320, 1, undefined, 0.5),
  P("rock", 320, 0.95, undefined, 0.52),
];
const TABUAS_SUL: StagePropSpec[] = [
  { ...P("tent", 70, 1.45, undefined, 0.36), tag: "tabernaculo" },
  P("crate", -240, 0.85, undefined, 0.46),
  P("crate", -180, 0.9, undefined, 0.5),
  P("crate", -120, 0.95, undefined, 0.54),
  P("crate", -60, 1, undefined, 0.58),
  P("rock", 320, 0.95, undefined, 0.52),
];
const BASES_PRATA: StagePropSpec[] = [
  { ...P("tent", 80, 1.4, undefined, 0.34), tag: "tabernaculo" },
  P("crate", -200, 0.9, undefined, 0.48),
  P("crate", -110, 0.95, undefined, 0.52),
  P("amphora", -240, 0.7, undefined, 0.68),
  P("amphora", -165, 0.7, undefined, 0.72),
  P("amphora", -85, 0.7, undefined, 0.7),
  P("rock", 320, 0.95, undefined, 0.52),
];
const TABUAS_NORTE: StagePropSpec[] = [
  { ...P("tent", -80, 1.45, undefined, 0.36), tag: "tabernaculo" },
  P("crate", 60, 1, undefined, 0.58),
  P("crate", 120, 0.95, undefined, 0.54),
  P("crate", 180, 0.9, undefined, 0.5),
  P("crate", 240, 0.85, undefined, 0.46),
  P("rock", -330, 1, undefined, 0.5),
];
const BASES_NORTE: StagePropSpec[] = [
  { ...P("tent", -90, 1.4, undefined, 0.34), tag: "tabernaculo" },
  P("crate", 110, 0.95, undefined, 0.52),
  P("crate", 200, 0.9, undefined, 0.48),
  P("amphora", 85, 0.7, undefined, 0.7),
  P("amphora", 165, 0.7, undefined, 0.72),
  P("amphora", 240, 0.7, undefined, 0.68),
  P("rock", -330, 1, undefined, 0.5),
];
const TABUAS_OCIDENTE: StagePropSpec[] = [
  { ...P("tent", 0, 1.5, undefined, 0.3), tag: "tabernaculo" },
  P("crate", -140, 0.9, undefined, 0.6),
  P("crate", -84, 0.9, undefined, 0.6),
  P("crate", -28, 0.9, undefined, 0.62),
  P("crate", 28, 0.9, undefined, 0.62),
  P("crate", 84, 0.9, undefined, 0.6),
  P("crate", 140, 0.9, undefined, 0.6),
  P("rock", -330, 1, undefined, 0.5),
  P("rock", 330, 0.95, undefined, 0.52),
];
const CANTOS: StagePropSpec[] = [
  { ...P("tent", 0, 1.5, undefined, 0.3), tag: "tabernaculo" },
  P("crate", -160, 1, undefined, 0.56),
  P("crate", 160, 1, undefined, 0.56),
  P("amphora", -195, 0.7, undefined, 0.7),
  P("amphora", 195, 0.7, undefined, 0.7),
  P("rock", -330, 1, undefined, 0.5),
  P("grass", -60, 0.78, undefined, 0.84),
];
const TRAVESSAS: StagePropSpec[] = [
  { ...P("tent", 0, 1.5, undefined, 0.3), tag: "tabernaculo" },
  P("rod", -150, 1.2, undefined, 0.52),
  P("rod", -85, 1.2, undefined, 0.58),
  P("rod", 85, 1.2, undefined, 0.58),
  P("rod", 150, 1.2, undefined, 0.52),
  P("crate", -240, 0.85, undefined, 0.62),
  P("crate", 240, 0.85, undefined, 0.62),
  P("rock", 330, 0.95, undefined, 0.52),
];
const VEU: StagePropSpec[] = [
  { ...P("tent", 0, 1.55, undefined, 0.36), tag: "tabernaculo" },
  { ...P("door", 60, 1, undefined, 0.44), tag: "veu-santissimo" },
  { ...P("ark", -70, 0.7, undefined, 0.5), tag: "arca-testemunho" },
  P("rock", -320, 1, undefined, 0.5),
  P("rock", 320, 0.95, undefined, 0.52),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Êx 25
  // A oferta voluntária → a arca do testemunho e os querubins → a mesa dos pães →
  // e o candelabro de ouro de sete lâmpadas. Tudo conforme o modelo do monte.
  25: {
    start: { terrain: "mountain", night: 0.22, glory: 0.8, storm: 0, fire: 0.5, verdure: 0.2 },
    beats: [
      b(1, { set: "monte", cast: [C("moises", -140, "kneel", { dy: 0.5, facing: 1 })], props: OFERTAS, env: { terrain: "mountain", glory: 0.82, fire: 0.5, night: 0.2 } }), // o Senhor fala a Moisés
      b(2, { by: "deus", env: { glory: 0.8 } }), // "que me tragam uma oferta alçada, de todo o que tiver coração voluntário"
      b(3, { by: "deus" }), // "ouro, e prata, e cobre"
      b(4, { by: "deus" }), // "azul, púrpura, carmesim, linho fino e pêlos de cabras"
      b(5, { by: "deus" }), // "peles de carneiros e de texugos, e madeira de acácia"
      b(6, { by: "deus" }), // "azeite para a luz, especiarias para a unção e para o incenso"
      b(7, { by: "deus" }), // "pedras de ônix para o éfode e para o peitoral"
      b(8, { by: "deus", env: { glory: 0.9 } }), // "e me farão um santuário, e habitarei no meio deles"
      b(9, { by: "deus", env: { glory: 0.85 } }), // "conforme ao modelo do tabernáculo que eu te mostrar, assim o fareis"
      b(10, { by: "deus", props: ARCA, env: { glory: 0.9, fire: 0.4 } }), // "farão uma arca de madeira de acácia"
      b(11, { by: "deus" }), // "cobri-la-ás de ouro puro, com uma coroa de ouro ao redor"
      b(12, { by: "deus" }), // "fundirás quatro argolas de ouro para os seus quatro cantos"
      b(13, { by: "deus" }), // "farás varas de acácia cobertas de ouro"
      b(14, { by: "deus" }), // "porás as varas nas argolas, para se levar a arca"
      b(15, { by: "deus" }), // "as varas ficarão nas argolas, não se tirarão dela"
      b(16, { by: "deus", env: { glory: 0.92 } }), // "porás na arca o testemunho que eu te darei"
      b(17, { by: "deus" }), // "farás um propiciatório de ouro puro"
      b(18, { by: "deus", env: { glory: 0.95 } }), // "farás dois querubins de ouro batido nas extremidades do propiciatório"
      b(19, { by: "deus" }), // "um querubim numa extremidade e o outro na outra, de uma só peça"
      b(20, { by: "deus", env: { glory: 0.96 } }), // "os querubins cobrirão com as asas o propiciatório, face a face"
      b(21, { by: "deus" }), // "porás o propiciatório sobre a arca, com o testemunho dentro"
      b(22, { by: "deus", env: { glory: 1 } }), // "ali virei a ti e falarei contigo de cima do propiciatório, entre os querubins"
      b(23, { by: "deus", props: MESA, env: { glory: 0.85, fire: 0.4 } }), // "farás uma mesa de madeira de acácia"
      b(24, { by: "deus" }), // "cobri-la-ás de ouro puro, com uma coroa de ouro ao redor"
      b(25, { by: "deus" }), // "farás uma moldura ao redor, com uma coroa de ouro"
      b(26, { by: "deus" }), // "farás quatro argolas de ouro nos seus quatro pés"
      b(27, { by: "deus" }), // "as argolas serão lugares para os varais, para se levar a mesa"
      b(28, { by: "deus" }), // "farás os varais de acácia cobertos de ouro"
      b(29, { by: "deus" }), // "farás os seus pratos, colheres, cobertas e tigelas de ouro puro"
      b(30, { by: "deus", env: { glory: 0.9 } }), // "sobre a mesa porás o pão da proposição perante a minha face perpetuamente"
      b(31, { by: "deus", props: CANDELABRO, env: { glory: 0.9, fire: 0.55 } }), // "farás um candelabro de ouro puro batido"
      b(32, { by: "deus" }), // "dos seus lados sairão seis hastes, três de cada lado"
      b(33, { by: "deus" }), // "em cada haste, três copos a modo de amêndoas, um botão e uma flor"
      b(34, { by: "deus" }), // "no candelabro haverá quatro copos a modo de amêndoas, com botões e flores"
      b(35, { by: "deus" }), // "um botão debaixo de cada par de hastes que dele saem"
      b(36, { by: "deus" }), // "tudo de uma só peça, obra batida de ouro puro"
      b(37, { by: "deus", env: { glory: 0.95, fire: 0.7 } }), // "farás sete lâmpadas, para iluminar defronte dele"
      b(38, { by: "deus" }), // "os espevitadores e apagadores serão de ouro puro"
      b(39, { by: "deus" }), // "de um talento de ouro puro os farás, com todos estes vasos"
      b(40, { by: "deus", env: { glory: 0.92 } }), // "atenta que o faças conforme ao modelo que te foi mostrado no monte"
    ],
  },

  // ------------------------------------------------------------------ Êx 26
  // As dez cortinas e a tenda → as tábuas e as bases → o véu que separa o santo do
  // santíssimo (a arca dentro) → e a cortina da porta da tenda.
  26: {
    start: { terrain: "mountain", night: 0.22, glory: 0.82, storm: 0, fire: 0.45, verdure: 0.2 },
    beats: [
      b(1, { set: "monte", cast: [C("moises", -140, "kneel", { dy: 0.5, facing: 1 })], props: TABERNACULO, env: { terrain: "mountain", glory: 0.85, fire: 0.45, night: 0.2 } }), // "o tabernáculo farás de dez cortinas de linho fino, azul, púrpura e carmesim, com querubins"
      b(2, { by: "deus" }), // "cada cortina de vinte e oito côvados de comprimento e quatro de largura"
      b(3, { by: "deus" }), // "cinco cortinas se enlaçarão umas às outras, e as outras cinco também"
      b(4, { by: "deus" }), // "farás laçadas de azul na orla de cada cortina, na juntura"
      b(5, { by: "deus" }), // "cinqüenta laçadas em cada cortina, presas uma à outra"
      b(6, { by: "deus", env: { glory: 0.8 } }), // "farás cinqüenta colchetes de ouro, e será um só tabernáculo"
      b(7, { by: "deus" }), // "farás cortinas de pêlos de cabras para tenda sobre o tabernáculo: onze"
      b(8, { by: "deus" }), // "cada cortina de trinta côvados de comprimento e quatro de largura"
      b(9, { by: "deus" }), // "juntarás cinco à parte e seis à parte, dobrando a sexta à frente"
      b(10, { by: "deus" }), // "farás cinqüenta laçadas na borda de cada cortina, na juntura"
      b(11, { by: "deus" }), // "farás cinqüenta colchetes de cobre, e ajuntarás a tenda para que seja uma"
      b(12, { by: "deus" }), // "o que sobejar das cortinas penderá às costas do tabernáculo"
      b(13, { by: "deus" }), // "um côvado de cada lado penderá aos lados, para cobri-lo"
      b(14, { by: "deus" }), // "farás uma coberta de peles de carneiro tintas de vermelho, e outra de texugo"
      b(15, { by: "deus", env: { glory: 0.8 } }), // "farás as tábuas para o tabernáculo, de acácia, postas verticalmente"
      b(16, { by: "deus", props: TABUAS, env: { glory: 0.82 }, cast: [C("moises", -170, "point", { dy: 0.5, facing: 1 })] }), // "cada tábua de dez côvados de comprimento e um e meio de largura"
      b(17, { by: "deus", env: { glory: 0.78 }, cast: [C("moises", -200, "kneel", { dy: 0.5, facing: 1 })] }), // "cada tábua terá dois encaixes travados um com o outro"
      b(18, { by: "deus", props: TABUAS_SUL, env: { glory: 0.84 }, cast: [C("moises", 200, "stand", { dy: 0.5, facing: -1 })] }), // "vinte tábuas para o lado meridional, para o sul"
      b(19, { by: "deus", props: BASES_PRATA, env: { glory: 0.8 }, cast: [C("moises", 210, "point", { dy: 0.5, facing: -1 })] }), // "quarenta bases de prata debaixo das vinte tábuas"
      b(20, { by: "deus", props: TABUAS_NORTE, env: { glory: 0.84 }, cast: [C("moises", -210, "stand", { dy: 0.5, facing: 1 })] }), // "vinte tábuas ao outro lado, para o norte"
      b(21, { by: "deus", props: BASES_NORTE, env: { glory: 0.8 }, cast: [C("moises", -220, "kneel", { dy: 0.5, facing: 1 })] }), // "com as suas quarenta bases de prata"
      b(22, { by: "deus", props: TABUAS_OCIDENTE, env: { glory: 0.86 }, cast: [C("moises", -230, "stand", { dy: 0.5, facing: 1 })] }), // "ao lado do ocidente farás seis tábuas"
      b(23, { by: "deus", props: CANTOS, env: { glory: 0.82 }, cast: [C("moises", -220, "point", { dy: 0.5, facing: 1 })] }), // "duas tábuas para os cantos do tabernáculo, de ambos os lados"
      b(24, { by: "deus", env: { glory: 0.86 }, cast: [C("moises", 230, "point", { dy: 0.5, facing: -1 })] }), // "por baixo e por cima se ajuntarão numa argola"
      b(25, { by: "deus", env: { glory: 0.8 }, cast: [C("moises", -160, "kneel", { dy: 0.5, facing: 1 })] }), // "serão oito tábuas com dezesseis bases de prata"
      b(26, { by: "deus", props: TRAVESSAS, env: { glory: 0.84 }, cast: [C("moises", -230, "stand", { dy: 0.5, facing: 1 })] }), // "farás cinco travessas de acácia para as tábuas de um lado"
      b(27, { by: "deus", env: { glory: 0.82 }, cast: [C("moises", 220, "point", { dy: 0.5, facing: -1 })] }), // "e cinco travessas para cada um dos outros lados, para o ocidente"
      b(28, { by: "deus", env: { glory: 0.88 }, cast: [C("moises", -140, "raise", { dy: 0.5, facing: 1 })] }), // "a travessa central passará de uma extremidade à outra"
      b(29, { by: "deus", env: { glory: 0.85 } }), // "cobrirás de ouro as tábuas, as argolas e as travessas"
      b(30, { by: "deus", env: { glory: 0.88 } }), // "levantarás o tabernáculo conforme ao modelo que te foi mostrado no monte"
      b(31, { by: "deus", props: VEU, env: { glory: 0.92, fire: 0.4 } }), // "farás um véu de azul, púrpura, carmesim e linho, com querubins"
      b(32, { by: "deus" }), // "colocá-lo-ás sobre quatro colunas de acácia cobertas de ouro"
      b(33, { by: "deus", env: { glory: 0.95 } }), // "o véu vos fará separação entre o santuário e o lugar santíssimo"
      b(34, { by: "deus" }), // "porás o propiciatório sobre a arca no lugar santíssimo"
      b(35, { by: "deus" }), // "a mesa fora do véu, e o candelabro defronte dela, ao sul"
      b(36, { by: "deus", env: { glory: 0.85 } }), // "farás para a porta da tenda uma cortina de azul, púrpura e carmesim"
      b(37, { by: "deus" }), // "farás cinco colunas de acácia cobertas de ouro, com cinco bases de cobre"
    ],
  },
};
