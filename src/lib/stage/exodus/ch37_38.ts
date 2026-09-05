// ============================================================================
// ÊXODO 37–38 — roteiro do modo CENA VIVA (força-tarefa AT, onda Êxodo).
//
// Êx 37 — O MOBILIÁRIO DE OURO: Bezalel faz a arca do testemunho com os
// querubins e o propiciatório, a mesa dos pães, o candelabro de ouro batido de
// sete lâmpadas, o altar do incenso, e o azeite santo e o incenso puro.
//
// Êx 38 — O ALTAR, A PIA E O PÁTIO: o altar de cobre do holocausto e seus
// utensílios, a pia de cobre feita dos espelhos das mulheres, o pátio cercado de
// cortinas e colunas, e a conta do ouro, da prata e do cobre da oferta.
//
// A VOZ DE DEUS (regra do projeto): aqui a obra é feita pelas mãos dos artífices
// — não há fala de Deus em cena; é narração pura, com a glória repousando sobre
// cada peça santa que nasce. Bezalel e Aoliabe conduzem a obra (`homem`).
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });

// ---------------------------------------------------------------------------
// A OFICINA do santuário (o arraial em obra) e os modelos que ali nascem.
const OFICINA_ARCA: StagePropSpec[] = [
  { ...P("ark", 0, 1.15, undefined, 0.42), tag: "arca-testemunho" },
  { ...P("cherub", -66, 0.8, undefined, 0.34) },
  { ...P("cherub", 66, 0.8, undefined, 0.34) },
  P("tent", -240, 1.05, undefined, 0.2),
  P("tent", 240, 1, undefined, 0.22),
];
const OFICINA_MESA: StagePropSpec[] = [
  { ...P("table", 0, 1.1, undefined, 0.44), tag: "mesa-proposicao" },
  P("tent", -240, 1.05, undefined, 0.2),
  P("tent", 240, 1, undefined, 0.22),
  P("crate", 150, 0.7, undefined, 0.6),
];
// A MESA NASCENDO SOB AS MÃOS (Êx 37:11-16): o ouro que a cobre com a coroa
// ao redor, a moldura da largura da mão, as quatro argolas fundidas nos pés,
// os varais de acácia, e os pratos, colheres, tigelas e taças de ouro puro.
const OFICINA_MESA_OURO: StagePropSpec[] = [
  { ...P("table", 0, 1.2, undefined, 0.44), tag: "mesa-proposicao" },
  P("amphora", -150, 0.85, undefined, 0.6),
  P("amphora", 150, 0.8, undefined, 0.62),
  P("tent", -245, 1.05, undefined, 0.2),
  P("tent", 245, 1, undefined, 0.22),
];
const OFICINA_MESA_MOLDURA: StagePropSpec[] = [
  { ...P("table", 0, 1.45, undefined, 0.5), tag: "mesa-proposicao" },
  P("tent", -250, 1.05, undefined, 0.18),
  P("tent", 250, 1, undefined, 0.2),
  P("grass", -110, 0.8, undefined, 0.88),
];
const OFICINA_MESA_ARGOLAS: StagePropSpec[] = [
  { ...P("table", 0, 1.25, undefined, 0.46), tag: "mesa-proposicao" },
  P("amphora", -85, 0.6, undefined, 0.68),
  P("amphora", -30, 0.6, undefined, 0.74),
  P("amphora", 30, 0.6, undefined, 0.74),
  P("amphora", 85, 0.6, undefined, 0.68),
  P("tent", -250, 1.05, undefined, 0.2),
  P("tent", 250, 1, undefined, 0.22),
];
const OFICINA_MESA_VARAS: StagePropSpec[] = [
  { ...P("table", 80, 1.2, undefined, 0.46), tag: "mesa-proposicao" },
  P("crate", -170, 0.9, undefined, 0.58),
  P("crate", -100, 0.85, undefined, 0.66),
  P("tent", -255, 1.05, undefined, 0.2),
  P("tent", 255, 1, undefined, 0.22),
];
const OFICINA_MESA_VASOS: StagePropSpec[] = [
  { ...P("table", -50, 1.15, undefined, 0.42), tag: "mesa-proposicao" },
  P("bowl", 70, 0.7, 0, 0.62),
  P("bowl", 145, 0.62, 0, 0.74),
  P("bowl", 210, 0.66, 0, 0.54),
  P("amphora", 10, 0.7, undefined, 0.76),
  P("tent", -255, 1.05, undefined, 0.2),
];
const OFICINA_CANDELABRO: StagePropSpec[] = [
  { ...P("menorah", 0, 1.35, undefined, 0.42), tag: "candelabro-ouro" },
  P("tent", -240, 1.05, undefined, 0.2),
  P("tent", 240, 1, undefined, 0.22),
];
const OFICINA_INCENSO: StagePropSpec[] = [
  { ...P("censer", 0, 1.15, 0.4, 0.42), tag: "altar-incenso" },
  { ...P("amphora", 120, 0.85, undefined, 0.54), tag: "azeite-uncao" },
  P("tent", -240, 1.05, undefined, 0.2),
  P("tent", 240, 1, undefined, 0.22),
];
const OFICINA_ALTAR: StagePropSpec[] = [
  { ...P("altar", 0, 1.25, 0.5, 0.42), tag: "altar-cobre" },
  P("tent", -240, 1.05, undefined, 0.2),
  P("tent", 240, 1, undefined, 0.22),
  P("crate", 150, 0.7, undefined, 0.6),
];
// O ALTAR DE COBRE NASCENDO SOB AS MÃOS (Êx 38:2-7): as quatro pontas e o
// revestimento de cobre, os cinzeiros, pás, bacias, garfos e braseiros, o
// crivo de rede com as suas quatro argolas fundidas, os varais de acácia, e o
// altar oco e de tábuas, pronto para ser levado.
const OFICINA_ALTAR_PONTAS: StagePropSpec[] = [
  { ...P("altar", 0, 1.45, 0.45, 0.42), tag: "altar-cobre" },
  P("amphora", -165, 0.85, undefined, 0.6),
  P("amphora", 165, 0.8, undefined, 0.62),
  P("tent", -250, 1.05, undefined, 0.2),
  P("tent", 250, 1, undefined, 0.22),
];
const OFICINA_ALTAR_UTENSILIOS: StagePropSpec[] = [
  { ...P("altar", -60, 1.15, 0.5, 0.42), tag: "altar-cobre" },
  P("bowl", 90, 0.75, 0, 0.6),
  P("bowl", 170, 0.65, 0, 0.74),
  P("amphora", 20, 0.75, undefined, 0.76),
  P("crate", 245, 0.8, undefined, 0.56),
  P("tent", -255, 1.05, undefined, 0.2),
];
const OFICINA_ALTAR_CRIVO: StagePropSpec[] = [
  { ...P("altar", 0, 1.3, 0.4, 0.46), tag: "altar-cobre" },
  P("amphora", -95, 0.6, undefined, 0.66),
  P("amphora", -35, 0.6, undefined, 0.72),
  P("amphora", 35, 0.6, undefined, 0.72),
  P("amphora", 95, 0.6, undefined, 0.66),
  P("tent", -250, 1.05, undefined, 0.2),
  P("tent", 250, 1, undefined, 0.22),
];
const OFICINA_ALTAR_VARAS: StagePropSpec[] = [
  { ...P("altar", 0, 1.2, 0.45, 0.44), tag: "altar-cobre" },
  P("crate", -180, 0.9, undefined, 0.58),
  P("crate", -110, 0.85, undefined, 0.66),
  P("crate", 180, 0.9, undefined, 0.58),
  P("tent", -255, 1.05, undefined, 0.2),
  P("tent", 255, 1, undefined, 0.22),
];
const OFICINA_ALTAR_LEVADO: StagePropSpec[] = [
  { ...P("altar", 100, 1.25, 0.5, 0.5), tag: "altar-cobre" },
  P("tent", -250, 1.05, undefined, 0.2),
  P("tent", 265, 1, undefined, 0.24),
  P("grass", -90, 0.8, undefined, 0.86),
];
// ---------------------------------------------------------------------------
// A CONTA DA OFERTA (Êx 38:24-31): o ouro do santuário, a prata dos arrolados
// — meio siclo por cabeça de seiscentos e três mil e quinhentos e cinqüenta —,
// os cem talentos fundidos em cem bases, os colchetes e capitéis das colunas,
// e o cobre de que se fizeram as bases, o altar, o crivo e os utensílios.
const CONTA_OURO: StagePropSpec[] = [
  P("amphora", -60, 0.95, undefined, 0.58),
  P("amphora", 10, 0.9, undefined, 0.66),
  P("bowl", 90, 0.8, 0, 0.6),
  P("crate", 180, 0.8, undefined, 0.56),
  P("tent", -250, 1.05, undefined, 0.2),
  P("tent", 250, 1, undefined, 0.22),
];
const CONTA_PRATA: StagePropSpec[] = [
  P("amphora", -140, 0.9, undefined, 0.6),
  P("amphora", -70, 0.85, undefined, 0.68),
  P("amphora", 0, 0.85, undefined, 0.6),
  P("amphora", 70, 0.85, undefined, 0.68),
  P("amphora", 140, 0.9, undefined, 0.6),
  P("crate", 210, 0.8, undefined, 0.56),
  P("tent", -255, 1.05, undefined, 0.2),
];
const CONTA_ARROLADOS: StagePropSpec[] = [
  P("crate", -30, 0.8, undefined, 0.72),
  P("amphora", 40, 0.7, undefined, 0.76),
  P("tent", -250, 1.05, undefined, 0.2),
  P("tent", 250, 1, undefined, 0.22),
  P("grass", -120, 0.8, undefined, 0.9),
];
const CONTA_BASES: StagePropSpec[] = [
  { ...P("tent", 0, 1.4, undefined, 0.34), tag: "tabernaculo" },
  P("amphora", -220, 0.7, undefined, 0.66),
  P("amphora", -150, 0.7, undefined, 0.7),
  P("amphora", -80, 0.7, undefined, 0.74),
  P("amphora", 80, 0.7, undefined, 0.74),
  P("amphora", 150, 0.7, undefined, 0.7),
  P("amphora", 220, 0.7, undefined, 0.66),
];
const CONTA_COLUNAS: StagePropSpec[] = [
  P("tower", -260, 0.85, undefined, 0.32),
  P("tower", -160, 0.85, undefined, 0.32),
  P("tower", 160, 0.85, undefined, 0.32),
  P("tower", 260, 0.85, undefined, 0.32),
  P("amphora", -60, 0.8, undefined, 0.68),
  P("amphora", 60, 0.8, undefined, 0.68),
  P("grass", 0, 0.8, undefined, 0.9),
];
const CONTA_COBRE: StagePropSpec[] = [
  P("crate", -120, 0.9, undefined, 0.6),
  P("crate", -50, 0.85, undefined, 0.7),
  P("amphora", 30, 0.85, undefined, 0.64),
  P("amphora", 110, 0.8, undefined, 0.72),
  P("tent", -255, 1.05, undefined, 0.2),
  P("tent", 255, 1, undefined, 0.22),
];
const CONTA_OBRAS_COBRE: StagePropSpec[] = [
  { ...P("altar", -60, 1.2, 0.5, 0.44), tag: "altar-cobre" },
  { ...P("door", 120, 1.05, undefined, 0.46), tag: "porta-patio" },
  { ...P("bowl", 230, 0.85, 0, 0.6), tag: "pia-cobre" },
  P("tent", -265, 1.05, undefined, 0.2),
];
const OFICINA_PIA: StagePropSpec[] = [
  { ...P("bowl", 0, 1.15, undefined, 0.46), tag: "pia-cobre" },
  P("tent", -240, 1.05, undefined, 0.2),
  P("tent", 240, 1, undefined, 0.22),
];
const OFICINA_PATIO: StagePropSpec[] = [
  { ...P("altar", 0, 1.05, 0.4, 0.44), tag: "altar-cobre" },
  { ...P("tent", -180, 1.15, undefined, 0.4), tag: "patio-tabernaculo" },
  P("tent", 180, 1.15, undefined, 0.4),
  P("tower", -330, 1, undefined, 0.28),
  P("tower", 330, 0.95, undefined, 0.3),
];

// ---------------------------------------------------------------------------
// O PÁTIO SENDO ARMADO (Êx 38:9-20), lado a lado: as colunas de cobre cingidas
// de prata (tower), as bases fundidas ao pé de cada uma (crate/amphora), as
// cortinas de linho estendidas (tent) e a cobertura bordada da porta (door).
const PATIO_COLUNAS_SUL: StagePropSpec[] = [
  { ...P("altar", 130, 1.0, 0.4, 0.46), tag: "altar-cobre" },
  P("tower", -300, 0.85, undefined, 0.34),
  P("tower", -210, 0.85, undefined, 0.34),
  P("tower", -120, 0.85, undefined, 0.34),
  P("tower", -30, 0.85, undefined, 0.34),
  P("crate", -255, 0.55, undefined, 0.66),
  P("crate", -165, 0.55, undefined, 0.66),
  P("crate", -75, 0.55, undefined, 0.66),
];
const PATIO_COLUNAS_NORTE: StagePropSpec[] = [
  { ...P("altar", -130, 1.0, 0.4, 0.46), tag: "altar-cobre" },
  P("tower", 30, 0.85, undefined, 0.34),
  P("tower", 120, 0.85, undefined, 0.34),
  P("tower", 210, 0.85, undefined, 0.34),
  P("tower", 300, 0.85, undefined, 0.34),
  P("crate", 75, 0.55, undefined, 0.66),
  P("crate", 165, 0.55, undefined, 0.66),
  P("crate", 255, 0.55, undefined, 0.66),
];
const PATIO_COLUNAS_OESTE: StagePropSpec[] = [
  { ...P("tent", 0, 1.35, undefined, 0.26), tag: "patio-tabernaculo" },
  P("tower", -240, 0.8, undefined, 0.4),
  P("tower", -140, 0.8, undefined, 0.4),
  P("tower", 140, 0.8, undefined, 0.4),
  P("tower", 240, 0.8, undefined, 0.4),
  P("crate", -190, 0.55, undefined, 0.68),
  P("crate", 190, 0.55, undefined, 0.68),
  P("grass", -70, 0.78, undefined, 0.84),
];
const PATIO_PORTA_LESTE: StagePropSpec[] = [
  { ...P("door", 0, 1.15, undefined, 0.44), tag: "porta-patio" },
  P("tower", -280, 0.8, undefined, 0.38),
  P("tower", -190, 0.8, undefined, 0.38),
  P("tower", -100, 0.8, undefined, 0.38),
  P("tower", 100, 0.8, undefined, 0.38),
  P("tower", 190, 0.8, undefined, 0.38),
  P("tower", 280, 0.8, undefined, 0.38),
  P("grass", 60, 0.78, undefined, 0.84),
];
const PATIO_CINGIDO: StagePropSpec[] = [
  { ...P("door", 0, 1.15, undefined, 0.44), tag: "porta-patio" },
  P("tower", -250, 0.85, undefined, 0.36),
  P("tower", -125, 0.85, undefined, 0.36),
  P("tower", 125, 0.85, undefined, 0.36),
  P("tower", 250, 0.85, undefined, 0.36),
  P("amphora", -190, 0.7, undefined, 0.66),
  P("amphora", -62, 0.7, undefined, 0.68),
  P("amphora", 62, 0.7, undefined, 0.68),
  P("amphora", 190, 0.7, undefined, 0.66),
];
const PATIO_ESTACAS: StagePropSpec[] = [
  { ...P("tent", 0, 1.45, undefined, 0.28), tag: "patio-tabernaculo" },
  P("rod", -230, 1.0, undefined, 0.62),
  P("rod", -160, 1.0, undefined, 0.66),
  P("rod", 160, 1.0, undefined, 0.66),
  P("rod", 230, 1.0, undefined, 0.62),
  P("crate", -300, 0.7, undefined, 0.6),
  P("crate", 300, 0.7, undefined, 0.6),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Êx 37
  // A arca e os querubins → a mesa → o candelabro de sete lâmpadas → o altar do
  // incenso → e o azeite santo e o incenso puro. Ouro nascendo das mãos de Bezalel.
  37: {
    start: { terrain: "desert", night: 0.14, glory: 0.7, storm: 0, fire: 0.3, verdure: 0.35 },
    beats: [
      b(1, { set: "oficina", cast: [C("homem", -120, "raise", { dy: 0.5, id: "bezalel", facing: 1 })], props: OFICINA_ARCA, env: { terrain: "desert", glory: 0.78, fire: 0.25, night: 0.12 } }), // Bezalel faz a arca de madeira de acácia
      b(2, { env: { glory: 0.8 } }), // cobre-a de ouro puro por dentro e por fora, com uma coroa de ouro
      b(3, {}), // funde quatro argolas de ouro nos seus quatro cantos
      b(4, {}), // faz varais de acácia cobertos de ouro
      b(5, {}), // põe os varais nas argolas, aos lados da arca, para a levar
      b(6, { env: { glory: 0.85 } }), // faz o propiciatório de ouro puro
      b(7, { env: { glory: 0.9 } }), // faz dois querubins de ouro batido nas extremidades do propiciatório
      b(8, {}), // um querubim numa extremidade e o outro na outra, de uma só peça
      b(9, { env: { glory: 0.92 } }), // os querubins estendem as asas por cima, cobrindo o propiciatório, face a face
      b(10, { cast: [C("homem", -120, "raise", { dy: 0.5, id: "bezalel", facing: 1 })], props: OFICINA_MESA, env: { glory: 0.8 } }), // faz a mesa de madeira de acácia
      b(11, { props: OFICINA_MESA_OURO, cast: [C("homem", -190, "point", { dy: 0.5, id: "bezalel", facing: 1 })], env: { glory: 0.84 } }), // cobre-a de ouro puro, com uma coroa de ouro ao redor
      b(12, { props: OFICINA_MESA_MOLDURA, cast: [C("homem", -140, "kneel", { dy: 0.6, id: "bezalel", facing: 1 })], env: { glory: 0.82 } }), // faz uma moldura ao redor, com uma coroa de ouro
      b(13, { props: OFICINA_MESA_ARGOLAS, cast: [C("homem", -130, "kneel", { dy: 0.72, id: "bezalel", facing: 1 })], env: { glory: 0.8 } }), // funde quatro argolas de ouro nos seus quatro pés
      b(14, { cast: [C("homem", 190, "point", { dy: 0.56, id: "bezalel", facing: -1 })], env: { glory: 0.78 } }), // as argolas defronte da moldura, para os varais, para levar a mesa
      b(15, { props: OFICINA_MESA_VARAS, cast: [C("homem", -215, "stand", { dy: 0.52, id: "bezalel", facing: 1 })], env: { glory: 0.82 } }), // faz os varais de acácia cobertos de ouro
      b(16, { props: OFICINA_MESA_VASOS, cast: [C("homem", -195, "raise", { dy: 0.5, id: "bezalel", facing: 1 })], env: { glory: 0.85 } }), // faz de ouro puro os pratos, colheres, tigelas e taças da mesa
      b(17, { cast: [C("homem", -120, "raise", { dy: 0.5, id: "bezalel", facing: 1 })], props: OFICINA_CANDELABRO, env: { glory: 0.85, fire: 0.4 } }), // faz o candelabro de ouro batido, de uma só peça
      b(18, {}), // seis hastes saem dos seus lados, três de cada lado
      b(19, {}), // em cada haste, três copos a modo de amêndoas, um botão e uma flor
      b(20, {}), // no candelabro, quatro copos a modo de amêndoas, com botões e flores
      b(21, {}), // um botão debaixo de cada par de hastes que dele saem
      b(22, { env: { glory: 0.88 } }), // tudo de uma só peça, obra batida de ouro puro
      b(23, { env: { fire: 0.55, glory: 0.9 } }), // faz-lhe sete lâmpadas, com espevitadores e apagadores de ouro
      b(24, {}), // de um talento de ouro puro faz o candelabro e todos os utensílios
      b(25, { cast: [C("homem", -120, "raise", { dy: 0.5, id: "bezalel", facing: 1 })], props: OFICINA_INCENSO, env: { glory: 0.85, fire: 0.3 } }), // faz o altar do incenso de acácia, quadrado, com as pontas
      b(26, {}), // cobre-o de ouro puro, com uma coroa de ouro ao redor
      b(27, {}), // faz duas argolas de ouro sob a coroa, para os varais
      b(28, {}), // faz os varais de acácia cobertos de ouro
      b(29, { env: { glory: 0.9 } }), // faz também o azeite santo da unção e o incenso puro, obra do perfumista
    ],
  },

  // ------------------------------------------------------------------ Êx 38
  // O altar de cobre e seus utensílios → a pia dos espelhos das mulheres → o pátio
  // cercado → e a conta do ouro, da prata e do cobre da oferta.
  38: {
    start: { terrain: "desert", night: 0.14, glory: 0.68, storm: 0, fire: 0.3, verdure: 0.35 },
    beats: [
      b(1, { set: "oficina", cast: [C("homem", -120, "raise", { dy: 0.5, id: "bezalel", facing: 1 })], props: OFICINA_ALTAR, env: { terrain: "desert", glory: 0.7, fire: 0.4, night: 0.12 } }), // faz o altar do holocausto de acácia, quadrado, de cinco côvados
      b(2, { props: OFICINA_ALTAR_PONTAS, cast: [C("homem", -190, "point", { dy: 0.5, id: "bezalel", facing: 1 })], env: { glory: 0.72, fire: 0.45 } }), // faz-lhe as pontas nos quatro cantos, e cobre-o de cobre
      b(3, { props: OFICINA_ALTAR_UTENSILIOS, cast: [C("homem", 215, "stand", { dy: 0.52, id: "bezalel", facing: -1 })], env: { glory: 0.7, fire: 0.5 } }), // faz os utensílios do altar: cinzeiros, pás, bacias, garfos e braseiros, de cobre
      b(4, { props: OFICINA_ALTAR_CRIVO, cast: [C("homem", -180, "kneel", { dy: 0.66, id: "bezalel", facing: 1 })], env: { glory: 0.68, fire: 0.35 } }), // faz um crivo de cobre em forma de rede, até ao meio do altar
      b(5, { cast: [C("homem", -120, "kneel", { dy: 0.76, id: "bezalel", facing: 1 })], env: { glory: 0.7, fire: 0.3 } }), // funde quatro argolas para as extremidades do crivo, para os varais
      b(6, { props: OFICINA_ALTAR_VARAS, cast: [C("homem", 220, "stand", { dy: 0.52, id: "bezalel", facing: -1 })], env: { glory: 0.72, fire: 0.4 } }), // faz os varais de acácia cobertos de cobre
      b(7, { props: OFICINA_ALTAR_LEVADO, cast: [C("homem", -200, "walk", { dy: 0.54, id: "bezalel", facing: 1 })], env: { glory: 0.74, fire: 0.45 } }), // põe os varais nas argolas aos lados do altar; fá-lo oco e de tábuas
      b(8, { cast: [C("homem", -120, "stand", { dy: 0.5, id: "bezalel", facing: 1 }), C("mulherComum", 60, "stand", { dy: 0.52, id: "mulher-espelho", facing: -1 })], props: OFICINA_PIA, env: { glory: 0.72, fire: 0.2, water: 0.3 } }), // faz a pia de cobre e a sua base, dos espelhos das mulheres que serviam à porta
      b(9, { cast: [C("homem", -120, "raise", { dy: 0.5, id: "bezalel", facing: 1 })], props: OFICINA_PATIO, env: { glory: 0.68, fire: 0.15, water: 0 } }), // faz o pátio ao lado do sul, com cortinas de linho de cem côvados
      b(10, { props: PATIO_COLUNAS_SUL, cast: [C("homem", -250, "raise", { dy: 0.5, id: "bezalel", facing: 1 }), C("multidao", 250, "stand", { scale: 0.85, dy: 0.48, id: "sabios" })], env: { glory: 0.7 } }), // vinte colunas e vinte bases de cobre, com colchetes e molduras de prata
      b(11, { props: PATIO_COLUNAS_NORTE, cast: [C("homem", 250, "raise", { dy: 0.5, id: "bezalel", facing: -1 }), C("multidao", -250, "stand", { scale: 0.85, dy: 0.48, id: "sabios" })], env: { glory: 0.68 } }), // do lado norte, cortinas de cem côvados, com colunas e bases de cobre
      b(12, { props: PATIO_COLUNAS_OESTE, cast: [C("homem", -300, "stand", { dy: 0.52, id: "bezalel", facing: 1 }), C("homem", 300, "stand", { dy: 0.52, id: "aoliabe", facing: -1 })], env: { glory: 0.7 } }), // do lado do ocidente, cortinas de cinqüenta côvados, dez colunas e bases
      b(13, { cast: [C("homem", -300, "point", { dy: 0.52, id: "bezalel", facing: 1 }), C("multidao", 300, "stand", { scale: 0.85, dy: 0.48, id: "sabios" })], env: { glory: 0.66 } }), // do lado leste, ao oriente, cortinas de cinqüenta côvados
      b(14, { props: PATIO_PORTA_LESTE, cast: [C("homem", -230, "kneel", { dy: 0.54, id: "bezalel", facing: 1 })], env: { glory: 0.7 } }), // quinze côvados de cortinas de um lado da porta, três colunas e bases
      b(15, { cast: [C("homem", 230, "kneel", { dy: 0.54, id: "aoliabe", facing: -1 }), C("homem", 300, "stand", { dy: 0.5, id: "bezalel", facing: -1 })] }), // e quinze côvados do outro lado da porta, três colunas e bases
      b(16, { cast: [C("multidao", -240, "stand", { dy: 0.48, id: "sabios" }), C("multidao", 240, "stand", { scale: 0.9, dy: 0.5, id: "sabios2" })], env: { glory: 0.72 } }), // todas as cortinas do pátio ao redor eram de linho fino torcido
      b(17, { props: PATIO_CINGIDO, cast: [C("homem", -300, "kneel", { dy: 0.54, id: "bezalel", facing: 1 }), C("homem", 300, "kneel", { dy: 0.54, id: "aoliabe", facing: -1 })], env: { glory: 0.68 } }), // as bases de cobre, os colchetes e molduras de prata, as colunas cingidas de prata
      b(18, { cast: [C("homem", -90, "raise", { dy: 0.52, id: "bezalel", facing: 1 }), C("multidao", 250, "stand", { scale: 0.85, dy: 0.48, id: "sabios" })], env: { glory: 0.74 } }), // a cobertura da porta do pátio, de azul, púrpura e carmesim, de vinte côvados
      b(19, { cast: [C("homem", -170, "point", { dy: 0.52, id: "bezalel", facing: 1 }), C("homem", 170, "point", { dy: 0.52, id: "aoliabe", facing: -1 })], env: { glory: 0.7 } }), // suas quatro colunas e bases de cobre, colchetes e capitéis de prata
      b(20, { props: PATIO_ESTACAS, cast: [C("homem", -280, "kneel", { dy: 0.56, id: "bezalel", facing: 1 }), C("multidao", 280, "stand", { scale: 0.85, dy: 0.48, id: "sabios" })], env: { glory: 0.68 } }), // todas as estacas do tabernáculo e do pátio ao redor eram de cobre
      b(21, { cast: [C("homem", -60, "write", { dy: 0.5, id: "itamar", facing: 1 }), C("homem", 40, "stand", { dy: 0.5, id: "bezalel", facing: -1 })], env: { glory: 0.66 } }), // esta é a conta do tabernáculo, feita por Itamar, filho de Arão
      b(22, { env: { glory: 0.7 } }), // Bezalel, da tribo de Judá, fez tudo quanto o Senhor ordenara a Moisés
      b(23, { cast: [C("homem", -60, "stand", { dy: 0.5, id: "bezalel", facing: 1 }), C("homem", 30, "stand", { dy: 0.5, id: "aoliabe", facing: -1 })] }), // e com ele Aoliabe, da tribo de Dã, mestre e bordador
      b(24, { props: CONTA_OURO, cast: [C("homem", -210, "write", { dy: 0.5, id: "itamar", facing: 1 })], env: { glory: 0.75 } }), // o ouro da obra foi vinte e nove talentos e setecentos e trinta siclos
      b(25, { props: CONTA_PRATA, cast: [C("homem", -230, "write", { dy: 0.5, id: "itamar", facing: 1 }), C("homem", 290, "stand", { dy: 0.5, id: "bezalel", facing: -1 })], env: { glory: 0.72 } }), // a prata dos arrolados foi cem talentos e mil setecentos e setenta e cinco siclos
      // os arrolados de vinte anos para cima, passando um a um a dar o seu beca
      b(26, { props: CONTA_ARROLADOS, cast: [
        C("homem", -230, "write", { dy: 0.5, id: "itamar", facing: 1 }),
        C("homem", 120, "walk", { dy: 0.48, id: "arrolado-de-vinte-anos", facing: -1 }),
        C("homem", 195, "walk", { scale: 0.92, dy: 0.54, id: "arrolado2", facing: -1 }),
        C("homem", 265, "walk", { scale: 0.84, dy: 0.6, id: "arrolado3", facing: -1 }),
      ], env: { glory: 0.7 } }), // meio siclo por cabeça, de seiscentos e três mil e quinhentos e cinqüenta homens
      b(27, { props: CONTA_BASES, cast: [C("homem", -300, "kneel", { dy: 0.62, id: "bezalel", facing: 1 }), C("homem", 300, "write", { dy: 0.5, id: "itamar", facing: -1 })], env: { glory: 0.74 } }), // cem talentos de prata para fundir as cem bases do santuário e do véu
      b(28, { props: CONTA_COLUNAS, cast: [C("homem", -105, "raise", { dy: 0.54, id: "bezalel", facing: 1 })], env: { glory: 0.72 } }), // dos mil setecentos e setenta e cinco siclos fez os colchetes e as molduras
      b(29, { props: CONTA_COBRE, cast: [C("homem", -210, "write", { dy: 0.5, id: "itamar", facing: 1 }), C("homem", 200, "stand", { dy: 0.52, id: "bezalel", facing: -1 })], env: { glory: 0.7, fire: 0.35 } }), // o cobre da oferta foi setenta talentos e dois mil e quatrocentos siclos
      b(30, { props: CONTA_OBRAS_COBRE, cast: [C("homem", -200, "point", { dy: 0.5, id: "bezalel", facing: 1 })], env: { glory: 0.72, fire: 0.45 } }), // dele fez as bases da porta, o altar de cobre, o crivo e os utensílios
      b(31, { props: PATIO_ESTACAS, cast: [C("homem", -290, "kneel", { dy: 0.6, id: "bezalel", facing: 1 }), C("homem", 290, "write", { dy: 0.5, id: "itamar", facing: -1 })], env: { glory: 0.72, fire: 0.2 } }), // e as bases do pátio e da porta, e todas as estacas ao redor
    ],
  },
};
