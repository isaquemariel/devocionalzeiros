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
  { ...P("stall", 0, 1.1, undefined, 0.44), tag: "mesa-proposicao" },
  P("tent", -240, 1.05, undefined, 0.2),
  P("tent", 240, 1, undefined, 0.22),
  P("crate", 150, 0.7, undefined, 0.6),
];
const OFICINA_CANDELABRO: StagePropSpec[] = [
  { ...P("lampstand", 0, 1.3, undefined, 0.4), tag: "candelabro-ouro" },
  P("tent", -240, 1.05, undefined, 0.2),
  P("tent", 240, 1, undefined, 0.22),
];
const OFICINA_INCENSO: StagePropSpec[] = [
  { ...P("censer", 0, 1.15, 0.4, 0.42), tag: "altar-incenso" },
  { ...P("amphora", 120, 0.85, undefined, 0.54), tag: "azeite-unção" },
  P("tent", -240, 1.05, undefined, 0.2),
  P("tent", 240, 1, undefined, 0.22),
];
const OFICINA_ALTAR: StagePropSpec[] = [
  { ...P("altar", 0, 1.25, 0.5, 0.42), tag: "altar-cobre" },
  P("tent", -240, 1.05, undefined, 0.2),
  P("tent", 240, 1, undefined, 0.22),
  P("crate", 150, 0.7, undefined, 0.6),
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
      b(11, {}), // cobre-a de ouro puro, com uma coroa de ouro ao redor
      b(12, {}), // faz uma moldura ao redor, com uma coroa de ouro
      b(13, {}), // funde quatro argolas de ouro nos seus quatro pés
      b(14, {}), // as argolas defronte da moldura, para os varais, para levar a mesa
      b(15, {}), // faz os varais de acácia cobertos de ouro
      b(16, { env: { glory: 0.82 } }), // faz de ouro puro os pratos, colheres, tigelas e taças da mesa
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
      b(2, {}), // faz-lhe as pontas nos quatro cantos, e cobre-o de cobre
      b(3, {}), // faz os utensílios do altar: cinzeiros, pás, bacias, garfos e braseiros, de cobre
      b(4, {}), // faz um crivo de cobre em forma de rede, até ao meio do altar
      b(5, {}), // funde quatro argolas para as extremidades do crivo, para os varais
      b(6, {}), // faz os varais de acácia cobertos de cobre
      b(7, {}), // põe os varais nas argolas aos lados do altar; fá-lo oco e de tábuas
      b(8, { cast: [C("homem", -120, "stand", { dy: 0.5, id: "bezalel", facing: 1 }), C("mulherComum", 60, "stand", { dy: 0.52, id: "mulher-espelho", facing: -1 })], props: OFICINA_PIA, env: { glory: 0.72, fire: 0.2, water: 0.3 } }), // faz a pia de cobre e a sua base, dos espelhos das mulheres que serviam à porta
      b(9, { cast: [C("homem", -120, "raise", { dy: 0.5, id: "bezalel", facing: 1 })], props: OFICINA_PATIO, env: { glory: 0.68, fire: 0.15, water: 0 } }), // faz o pátio ao lado do sul, com cortinas de linho de cem côvados
      b(10, {}), // vinte colunas e vinte bases de cobre, com colchetes e molduras de prata
      b(11, {}), // do lado norte, cortinas de cem côvados, com colunas e bases de cobre
      b(12, {}), // do lado do ocidente, cortinas de cinqüenta côvados, dez colunas e bases
      b(13, {}), // do lado leste, ao oriente, cortinas de cinqüenta côvados
      b(14, {}), // quinze côvados de cortinas de um lado da porta, três colunas e bases
      b(15, {}), // e quinze côvados do outro lado da porta, três colunas e bases
      b(16, {}), // todas as cortinas do pátio ao redor eram de linho fino torcido
      b(17, {}), // as bases de cobre, os colchetes e molduras de prata, as colunas cingidas de prata
      b(18, {}), // a cobertura da porta do pátio, de azul, púrpura e carmesim, de vinte côvados
      b(19, {}), // suas quatro colunas e bases de cobre, colchetes e capitéis de prata
      b(20, {}), // todas as estacas do tabernáculo e do pátio ao redor eram de cobre
      b(21, { cast: [C("homem", -60, "write", { dy: 0.5, id: "itamar", facing: 1 }), C("homem", 40, "stand", { dy: 0.5, id: "bezalel", facing: -1 })], env: { glory: 0.66 } }), // esta é a conta do tabernáculo, feita por Itamar, filho de Arão
      b(22, { env: { glory: 0.7 } }), // Bezalel, da tribo de Judá, fez tudo quanto o Senhor ordenara a Moisés
      b(23, { cast: [C("homem", -60, "stand", { dy: 0.5, id: "bezalel", facing: 1 }), C("homem", 30, "stand", { dy: 0.5, id: "aoliabe", facing: -1 })] }), // e com ele Aoliabe, da tribo de Dã, mestre e bordador
      b(24, { env: { glory: 0.75 } }), // o ouro da obra foi vinte e nove talentos e setecentos e trinta siclos
      b(25, {}), // a prata dos arrolados foi cem talentos e mil setecentos e setenta e cinco siclos
      b(26, {}), // meio siclo por cabeça, de seiscentos e três mil e quinhentos e cinqüenta homens
      b(27, {}), // cem talentos de prata para fundir as cem bases do santuário e do véu
      b(28, {}), // dos mil setecentos e setenta e cinco siclos fez os colchetes e as molduras
      b(29, {}), // o cobre da oferta foi setenta talentos e dois mil e quatrocentos siclos
      b(30, {}), // dele fez as bases da porta, o altar de cobre, o crivo e os utensílios
      b(31, { env: { glory: 0.72 } }), // e as bases do pátio e da porta, e todas as estacas ao redor
    ],
  },
};
