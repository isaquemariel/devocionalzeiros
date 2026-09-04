// ============================================================================
// ÊXODO 27–28 — roteiro do modo CENA VIVA (força-tarefa AT, onda Êxodo).
//
// Êx 27 — O ALTAR E O PÁTIO: o altar de cobre com as suas pontas e utensílios, o
// pátio do tabernáculo cercado de cortinas e colunas, e o azeite puro para as
// lâmpadas arderem continuamente diante do Senhor.
//
// Êx 28 — AS VESTES SACERDOTAIS: para Arão e seus filhos, "para glória e
// ornamento" — o éfode, o peitoral do juízo com as doze pedras das tribos (Urim
// e Tumim), o manto azul com romãs e campainhas, e a lâmina de ouro na mitra:
// SANTIDADE AO SENHOR.
//
// A VOZ DE DEUS (regra do projeto): Moisés está no monte, na glória; a ordem vem
// do céu, SEM figura — `by: "deus"`. Em Êx 28, Arão entra em cena (`arao`) à
// medida que a voz descreve as suas vestes santas.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });

// ---------------------------------------------------------------------------
// Modelos revelados no cume (na glória).
const ALTAR_BRONZE: StagePropSpec[] = [
  { ...P("altar", 0, 1.25, 0.45, 0.42), tag: "altar-cobre" },
  P("rock", -300, 1.1, undefined, 0.5),
  P("rock", 300, 1.05, undefined, 0.52),
  P("grass", -60, 0.78, undefined, 0.82),
];
// ---------------------------------------------------------------------------
// O ALTAR DE COBRE, PEÇA POR PEÇA (Êx 27:1-8): a caixa quadrada de acácia
// medida a côvados, as quatro pontas e o revestimento de cobre, os cinzeiros,
// pás, bacias, garfos e braseiros, o crivo de rede com as suas quatro argolas,
// os varais de acácia — e o altar levado com eles, oco e de tábuas.
const ALTAR_ACACIA: StagePropSpec[] = [
  { ...P("altar", 0, 1.1, 0.3, 0.44), tag: "altar-cobre" },
  P("crate", -160, 0.9, undefined, 0.56),
  P("crate", 160, 0.85, undefined, 0.58),
  P("rock", -300, 1.1, undefined, 0.5),
  P("rock", 300, 1.05, undefined, 0.52),
  P("grass", -70, 0.78, undefined, 0.84),
];
const ALTAR_PONTAS: StagePropSpec[] = [
  { ...P("altar", 0, 1.45, 0.4, 0.44), tag: "altar-cobre" },
  P("amphora", -165, 0.85, undefined, 0.6),
  P("amphora", 165, 0.8, undefined, 0.62),
  P("rock", -305, 1.1, undefined, 0.5),
  P("rock", 305, 1.05, undefined, 0.52),
];
const ALTAR_UTENSILIOS: StagePropSpec[] = [
  { ...P("altar", -60, 1.15, 0.45, 0.42), tag: "altar-cobre" },
  P("bowl", 90, 0.75, 0, 0.6),
  P("bowl", 170, 0.65, 0, 0.7),
  P("amphora", 25, 0.75, undefined, 0.72),
  P("crate", 245, 0.8, undefined, 0.56),
  P("rock", -305, 1.1, undefined, 0.5),
  P("rock", 305, 1.05, undefined, 0.52),
];
const ALTAR_CRIVO: StagePropSpec[] = [
  { ...P("altar", 0, 1.3, 0.35, 0.46), tag: "altar-cobre" },
  P("amphora", -95, 0.6, undefined, 0.66),
  P("amphora", -35, 0.6, undefined, 0.71),
  P("amphora", 35, 0.6, undefined, 0.71),
  P("amphora", 95, 0.6, undefined, 0.66),
  P("rock", -305, 1.1, undefined, 0.5),
  P("rock", 305, 1.05, undefined, 0.52),
];
const ALTAR_VARAS: StagePropSpec[] = [
  { ...P("altar", 0, 1.2, 0.4, 0.44), tag: "altar-cobre" },
  P("crate", -180, 0.9, undefined, 0.58),
  P("crate", -110, 0.85, undefined, 0.64),
  P("crate", 180, 0.9, undefined, 0.58),
  P("rock", -310, 1.1, undefined, 0.5),
  P("rock", 310, 1.05, undefined, 0.52),
];
const ALTAR_LEVADO: StagePropSpec[] = [
  { ...P("altar", 100, 1.25, 0.45, 0.5), tag: "altar-cobre" },
  P("rock", -305, 1.1, undefined, 0.44),
  P("rock", 310, 1.05, undefined, 0.58),
  P("grass", -90, 0.8, undefined, 0.84),
];
const PATIO: StagePropSpec[] = [
  { ...P("altar", 0, 1.05, 0.4, 0.44), tag: "altar-cobre" },
  { ...P("tent", -180, 1.15, undefined, 0.4), tag: "patio-tabernaculo" },
  P("tent", 180, 1.15, undefined, 0.4),
  P("tower", -320, 1, undefined, 0.28),
  P("tower", 320, 0.95, undefined, 0.3),
];
// ---------------------------------------------------------------------------
// O PÁTIO, LADO A LADO (Êx 27:9-19). As colunas de cobre cingidas de prata
// (tower), as bases fundidas ao pé de cada uma (crate/amphora), as cortinas de
// linho estendidas (tent) e a cortina bordada da porta (door). Cada versículo
// muda o lado do pátio que se levanta no modelo — sul, norte, ocidente, e o
// oriente com a sua porta ao meio.
const PATIO_SUL: StagePropSpec[] = [
  { ...P("altar", 120, 1.0, 0.4, 0.46), tag: "altar-cobre" },
  P("tower", -300, 0.85, undefined, 0.34),
  P("tower", -210, 0.85, undefined, 0.34),
  P("tower", -120, 0.85, undefined, 0.34),
  P("tower", -30, 0.85, undefined, 0.34),
  P("crate", -255, 0.55, undefined, 0.66),
  P("crate", -165, 0.55, undefined, 0.66),
  P("crate", -75, 0.55, undefined, 0.66),
  P("grass", 220, 0.78, undefined, 0.82),
];
const PATIO_NORTE: StagePropSpec[] = [
  { ...P("altar", -120, 1.0, 0.4, 0.46), tag: "altar-cobre" },
  P("tower", 30, 0.85, undefined, 0.34),
  P("tower", 120, 0.85, undefined, 0.34),
  P("tower", 210, 0.85, undefined, 0.34),
  P("tower", 300, 0.85, undefined, 0.34),
  P("crate", 75, 0.55, undefined, 0.66),
  P("crate", 165, 0.55, undefined, 0.66),
  P("crate", 255, 0.55, undefined, 0.66),
  P("grass", -220, 0.78, undefined, 0.82),
];
const PATIO_OCIDENTE: StagePropSpec[] = [
  { ...P("tent", 0, 1.35, undefined, 0.26), tag: "patio-tabernaculo" },
  P("tower", -240, 0.8, undefined, 0.4),
  P("tower", -140, 0.8, undefined, 0.4),
  P("tower", 140, 0.8, undefined, 0.4),
  P("tower", 240, 0.8, undefined, 0.4),
  P("crate", -190, 0.55, undefined, 0.68),
  P("crate", 190, 0.55, undefined, 0.68),
  P("grass", -60, 0.78, undefined, 0.84),
];
const PATIO_PORTA: StagePropSpec[] = [
  { ...P("door", 0, 1.15, undefined, 0.44), tag: "porta-patio" },
  P("tower", -280, 0.8, undefined, 0.38),
  P("tower", -190, 0.8, undefined, 0.38),
  P("tower", -100, 0.8, undefined, 0.38),
  P("tower", 100, 0.8, undefined, 0.38),
  P("tower", 190, 0.8, undefined, 0.38),
  P("tower", 280, 0.8, undefined, 0.38),
  P("grass", 60, 0.78, undefined, 0.84),
];
const PATIO_PRATA: StagePropSpec[] = [
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
const PATIO_VASOS: StagePropSpec[] = [
  { ...P("altar", 0, 1.05, 0.45, 0.44), tag: "altar-cobre" },
  { ...P("bowl", 150, 0.9, undefined, 0.58), tag: "pia-cobre" },
  P("crate", -150, 0.8, undefined, 0.6),
  P("amphora", -80, 0.8, undefined, 0.64),
  P("amphora", 80, 0.75, undefined, 0.66),
  P("tower", -320, 0.9, undefined, 0.3),
  P("tower", 320, 0.85, undefined, 0.32),
];
const AZEITE: StagePropSpec[] = [
  { ...P("menorah", 0, 1.35, undefined, 0.42), tag: "candelabro-ouro" },
  { ...P("amphora", -90, 0.85, undefined, 0.56), tag: "azeite-puro" },
  P("rock", -300, 1.1, undefined, 0.5),
  P("rock", 300, 1.05, undefined, 0.52),
];
// as vestes: só o monte em glória, com Arão em cena
const VESTES: StagePropSpec[] = [
  P("rock", 0, 1.6, undefined, 0.24),
  P("rock", -300, 1.1, undefined, 0.5),
  P("rock", 300, 1.05, undefined, 0.52),
  P("grass", -60, 0.78, undefined, 0.82),
];
// ---------------------------------------------------------------------------
// O ÉFODE E AS DUAS PEDRAS DE ÔNIX (Êx 28:6-12): o ouro batido em fios e os
// tecidos tintos; depois as duas pedras onde o lapidário grava, como lavor de
// selos, os doze nomes — seis numa e seis na outra —, engastadas em ouro e
// postas nas ombreiras, para que Arão leve Israel sobre os ombros.
const EFODE_OBRA: StagePropSpec[] = [
  P("rock", -290, 1.5, undefined, 0.26),
  P("amphora", -200, 0.85, undefined, 0.62),
  P("crate", 210, 0.85, undefined, 0.58),
  P("rock", 320, 1.05, undefined, 0.5),
  P("grass", -70, 0.78, undefined, 0.86),
];
const PEDRAS_ONIX: StagePropSpec[] = [
  ...EFODE_OBRA,
  P("rock", 110, 0.46, undefined, 0.74),
  P("rock", 170, 0.44, undefined, 0.74),
];
const PEDRAS_SEIS_SEIS: StagePropSpec[] = [
  ...EFODE_OBRA,
  P("rock", 80, 0.5, undefined, 0.76),
  P("rock", 250, 0.5, undefined, 0.76),
];
const PEDRAS_ENGASTADAS: StagePropSpec[] = [
  ...EFODE_OBRA,
  P("rock", 110, 0.48, undefined, 0.74),
  P("rock", 175, 0.46, undefined, 0.74),
  P("amphora", 143, 0.5, undefined, 0.86),
];
const PEDRAS_OMBREIRAS: StagePropSpec[] = [
  ...EFODE_OBRA,
  P("rock", -10, 0.32, undefined, 0.3),
  P("rock", 55, 0.32, undefined, 0.3),
];
// ---------------------------------------------------------------------------
// O PEITORAL DO JUÍZO, ORDEM POR ORDEM (Êx 28:15-30). As quatro fileiras de
// três pedras nascem uma a uma diante de Arão — sárdio, topázio e carbúnculo;
// esmeralda, safira e diamante; jacinto, ágata e ametista; berilo, ônix e
// jaspe — até as doze, "segundo os nomes das doze tribos". Depois vêm as
// cadeiazinhas trançadas e os anéis que o prendem ao éfode para nunca se
// separar. As pedras não têm prop próprio no motor: são desenhadas pelo que
// são, pedras lapidadas, dispostas na grade de quatro ordens do peitoral.
const PEITORAL_BASE: StagePropSpec[] = [
  P("rock", -300, 1.5, undefined, 0.26),
  P("amphora", -225, 0.85, undefined, 0.62),
  P("crate", 320, 0.85, undefined, 0.56),
  P("grass", -60, 0.78, undefined, 0.9),
];
const G = (dx: number, dy: number, scale: number): StagePropSpec => ({ kind: "rock", dx, dy, scale });
const PEITORAL_ORDEM1: StagePropSpec[] = [...PEITORAL_BASE, G(120, 0.4, 0.3), G(185, 0.4, 0.33), G(250, 0.4, 0.29)];
const PEITORAL_ORDEM2: StagePropSpec[] = [...PEITORAL_ORDEM1, G(120, 0.52, 0.32), G(185, 0.52, 0.29), G(250, 0.52, 0.33)];
const PEITORAL_ORDEM3: StagePropSpec[] = [...PEITORAL_ORDEM2, G(120, 0.64, 0.29), G(185, 0.64, 0.33), G(250, 0.64, 0.3)];
const PEITORAL_ORDEM4: StagePropSpec[] = [...PEITORAL_ORDEM3, G(120, 0.76, 0.33), G(185, 0.76, 0.3), G(250, 0.76, 0.32)];
const PEITORAL_CADEIAS: StagePropSpec[] = [...PEITORAL_ORDEM4, P("amphora", 185, 0.5, undefined, 0.3)];
const PEITORAL_ANEIS_CIMA: StagePropSpec[] = [...PEITORAL_CADEIAS, P("amphora", 108, 0.42, undefined, 0.32), P("amphora", 262, 0.42, undefined, 0.32)];
const PEITORAL_ENGASTES: StagePropSpec[] = [...PEITORAL_ANEIS_CIMA, G(-15, 0.3, 0.32), G(55, 0.3, 0.32)];
const PEITORAL_ANEIS_BAIXO: StagePropSpec[] = [...PEITORAL_ENGASTES, P("amphora", 108, 0.42, undefined, 0.88), P("amphora", 262, 0.42, undefined, 0.88)];
const PEITORAL_LIGADO: StagePropSpec[] = [...PEITORAL_ANEIS_BAIXO, P("amphora", 55, 0.45, undefined, 0.58), P("amphora", 315, 0.45, undefined, 0.58)];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Êx 27
  // O altar de cobre e os seus utensílios → o pátio cercado de cortinas → e o
  // azeite puro para o candeeiro arder continuamente.
  27: {
    start: { terrain: "mountain", night: 0.22, glory: 0.8, storm: 0, fire: 0.5, verdure: 0.2 },
    beats: [
      b(1, { set: "monte", cast: [C("moises", -150, "kneel", { dy: 0.56, facing: 1 })], props: ALTAR_ACACIA, env: { terrain: "mountain", glory: 0.82, fire: 0.3, night: 0.2 } }), // "farás o altar de acácia, quadrado, de cinco côvados, e três de altura"
      b(2, { by: "deus", props: ALTAR_PONTAS, cast: [C("moises", -185, "point", { dy: 0.5, facing: 1 })], env: { glory: 0.84, fire: 0.45 } }), // "farás as suas pontas nos quatro cantos, e o cobrirás de cobre"
      b(3, { by: "deus", props: ALTAR_UTENSILIOS, cast: [C("moises", 215, "stand", { dy: 0.5, facing: -1 })], env: { glory: 0.8, fire: 0.5 } }), // "farás os seus recipientes, pás, bacias, garfos e braseiros, de cobre"
      b(4, { by: "deus", props: ALTAR_CRIVO, cast: [C("moises", -175, "kneel", { dy: 0.64, facing: 1 })], env: { glory: 0.78, fire: 0.35 } }), // "farás um crivo de cobre em forma de rede, com quatro argolas"
      b(5, { by: "deus", cast: [C("moises", -115, "kneel", { dy: 0.74, facing: 1 })], env: { glory: 0.8, fire: 0.3 } }), // "porás a rede da borda do altar para baixo, até ao meio dele"
      b(6, { by: "deus", props: ALTAR_VARAS, cast: [C("moises", 220, "stand", { dy: 0.5, facing: -1 })], env: { glory: 0.82, fire: 0.4 } }), // "farás varais de acácia para o altar, cobertos de cobre"
      b(7, { by: "deus", props: ALTAR_LEVADO, cast: [C("moises", -195, "walk", { dy: 0.54, facing: 1 })], env: { glory: 0.84, fire: 0.45 } }), // "os varais serão postos nas argolas, de ambos os lados, para o levar"
      b(8, { by: "deus", props: ALTAR_BRONZE, cast: [C("moises", -165, "raise", { dy: 0.5, facing: 1 })], env: { glory: 0.85, fire: 0.5 } }), // "oco e de tábuas o farás, como se te mostrou no monte"
      b(9, { by: "deus", props: PATIO, env: { glory: 0.8, fire: 0.3 } }), // "farás o pátio do tabernáculo, com cortinas de linho ao lado do sul"
      b(10, { by: "deus", props: PATIO_SUL, env: { glory: 0.78, fire: 0.3 }, cast: [C("moises", 210, "point", { dy: 0.5, facing: -1 })] }), // "vinte colunas e vinte bases de cobre; os colchetes e faixas de prata"
      b(11, { by: "deus", props: PATIO_NORTE, env: { glory: 0.8 }, cast: [C("moises", -210, "point", { dy: 0.5, facing: 1 })] }), // "assim também para o lado norte, cem côvados de cortinas"
      b(12, { by: "deus", props: PATIO_OCIDENTE, env: { glory: 0.82 }, cast: [C("moises", -300, "stand", { dy: 0.52, facing: 1 })] }), // "para o ocidente, cortinas de cinqüenta côvados, dez colunas e dez bases"
      b(13, { by: "deus", env: { glory: 0.78 }, cast: [C("moises", 300, "stand", { dy: 0.52, facing: -1 })] }), // "a largura do pátio ao oriente, para o levante, cinqüenta côvados"
      b(14, { by: "deus", props: PATIO_PORTA, env: { glory: 0.82 }, cast: [C("moises", -230, "point", { dy: 0.5, facing: 1 })] }), // "quinze côvados de cortinas de um lado, três colunas e três bases"
      b(15, { by: "deus", cast: [C("moises", 230, "point", { dy: 0.5, facing: -1 })] }), // "e quinze côvados de cortinas do outro lado, três colunas e três bases"
      b(16, { by: "deus", env: { glory: 0.86 }, cast: [C("moises", -110, "raise", { dy: 0.52, facing: 1 })] }), // "à porta do pátio, uma cortina de vinte côvados, de azul, púrpura e carmesim"
      b(17, { by: "deus", props: PATIO_PRATA, env: { glory: 0.8 }, cast: [C("moises", -300, "kneel", { dy: 0.52, facing: 1 })] }), // "todas as colunas do pátio cingidas de faixas de prata, bases de cobre"
      b(18, { by: "deus", env: { glory: 0.84 }, cast: [C("moises", 300, "stand", { dy: 0.52, facing: -1 })] }), // "o pátio de cem côvados de comprimento, cinqüenta de largura, cinco de altura"
      b(19, { by: "deus", props: PATIO_VASOS, env: { glory: 0.8, fire: 0.4 }, cast: [C("moises", -230, "stand", { dy: 0.5, facing: 1 })] }), // "todos os vasos e pregos do tabernáculo e do pátio serão de cobre"
      b(20, { by: "deus", props: AZEITE, env: { glory: 0.9, fire: 0.6 } }), // "ordenarás que te tragam azeite puro batido, para arder as lâmpadas continuamente"
      b(21, { by: "deus", env: { glory: 0.88 } }), // "Arão e seus filhos as porão em ordem, da tarde à manhã; estatuto perpétuo"
    ],
  },

  // ------------------------------------------------------------------ Êx 28
  // A vocação sacerdotal de Arão e seus filhos → o éfode e o peitoral do juízo com
  // as doze pedras (Urim e Tumim) → o manto das romãs e campainhas → e a lâmina
  // "Santidade ao Senhor" na mitra.
  28: {
    start: { terrain: "mountain", night: 0.2, glory: 0.85, storm: 0, fire: 0.45, verdure: 0.2 },
    beats: [
      b(1, { by: "deus", set: "vestes", cast: [C("moises", -120, "stand", { dy: 0.5, facing: 1 }), C("arao", 30, "stand", { dy: 0.5, facing: -1 })], props: VESTES, env: { terrain: "mountain", glory: 0.88, fire: 0.45, night: 0.18 } }), // "farás chegar a ti Arão e seus filhos, para me administrarem o sacerdócio"
      b(2, { by: "deus", env: { glory: 0.9 } }), // "farás vestes sagradas a Arão, para glória e ornamento"
      b(3, { by: "deus" }), // "falarás aos sábios de coração que façam as vestes para santificá-lo"
      b(4, { by: "deus", env: { glory: 0.88 } }), // "estas são as vestes: peitoral, éfode, manto, túnica bordada, mitra e cinto"
      b(5, { by: "deus" }), // "tomarão o ouro, o azul, a púrpura, o carmesim e o linho fino"
      b(6, { by: "deus", props: EFODE_OBRA, cast: [C("arao", 20, "stand", { dy: 0.5, facing: -1 }), C("moises", -120, "point", { dy: 0.5, facing: 1 })] }), // "farão o éfode de ouro, azul, púrpura, carmesim e linho, de obra esmerada"
      b(7, { by: "deus", cast: [C("arao", 20, "raise", { dy: 0.5, facing: -1 }), C("moises", -130, "point", { dy: 0.5, facing: 1 })], env: { glory: 0.9 } }), // "terá duas ombreiras que se unam às suas duas pontas"
      b(8, { by: "deus", cast: [C("arao", 20, "stand", { dy: 0.5, facing: -1 }), C("moises", -80, "kneel", { dy: 0.6, facing: 1 })], env: { glory: 0.88 } }), // "o cinto do éfode será da mesma obra, de ouro, azul, púrpura e linho"
      b(9, { by: "deus", props: PEDRAS_ONIX, cast: [C("arao", 20, "stand", { dy: 0.5, facing: -1 }), C("homem", 140, "kneel", { dy: 0.62, id: "lapidario", facing: -1 }), C("moises", -120, "stand", { dy: 0.5, facing: 1 })], env: { glory: 0.86 } }), // "tomarás duas pedras de ônix, e gravarás nelas os nomes dos filhos de Israel"
      b(10, { by: "deus", props: PEDRAS_SEIS_SEIS, cast: [C("arao", 20, "stand", { dy: 0.5, facing: -1 }), C("homem", 165, "point", { dy: 0.6, id: "lapidario", facing: -1 }), C("moises", -120, "stand", { dy: 0.5, facing: 1 })], env: { glory: 0.88 } }), // "seis nomes numa pedra e seis na outra, segundo as suas gerações"
      b(11, { by: "deus", props: PEDRAS_ENGASTADAS, cast: [C("arao", 20, "stand", { dy: 0.5, facing: -1 }), C("homem", 143, "write", { dy: 0.62, id: "lapidario", facing: -1 }), C("moises", -130, "stand", { dy: 0.5, facing: 1 })], env: { glory: 0.9 } }), // "como lavor de selos as gravarás, engastadas em ouro"
      b(12, { by: "deus", props: PEDRAS_OMBREIRAS, cast: [C("arao", 20, "raise", { dy: 0.5, facing: -1 }), C("moises", -120, "point", { dy: 0.5, facing: 1 })], env: { glory: 0.9 } }), // "porás as pedras nas ombreiras do éfode, por memória; Arão levará os nomes aos ombros"
      b(13, { by: "deus", props: PEITORAL_BASE, cast: [C("arao", 20, "stand", { dy: 0.5, facing: -1 }), C("moises", -130, "point", { dy: 0.5, facing: 1 })], env: { glory: 0.88 } }), // "farás também engastes de ouro"
      b(14, { by: "deus", cast: [C("arao", 20, "stand", { dy: 0.5, facing: -1 }), C("homem", 300, "write", { dy: 0.58, id: "lapidario", facing: -1 }), C("moises", -130, "stand", { dy: 0.5, facing: 1 })], env: { glory: 0.9 } }), // "e duas cadeiazinhas de ouro puro, de obra de fieira, nos engastes"
      b(15, { by: "deus", cast: [C("arao", 20, "stand", { dy: 0.5, facing: -1 }), C("moises", -110, "raise", { dy: 0.5, facing: 1 })], env: { glory: 0.92 } }), // "farás o peitoral do juízo, de obra esmerada, como o éfode"
      b(16, { by: "deus", cast: [C("arao", 20, "stand", { dy: 0.5, facing: -1 }), C("moises", -90, "kneel", { dy: 0.62, facing: 1 })], env: { glory: 0.9 } }), // "quadrado e duplo, de um palmo de comprimento e de largura"
      b(17, { by: "deus", props: PEITORAL_ORDEM1, env: { glory: 0.9 } }), // "a primeira ordem: um sárdio, um topázio e um carbúnculo"
      b(18, { by: "deus", props: PEITORAL_ORDEM2, env: { glory: 0.91 } }), // "a segunda ordem: uma esmeralda, uma safira e um diamante"
      b(19, { by: "deus", props: PEITORAL_ORDEM3, env: { glory: 0.92 } }), // "a terceira ordem: um jacinto, uma ágata e uma ametista"
      b(20, { by: "deus", props: PEITORAL_ORDEM4, env: { glory: 0.94 } }), // "a quarta ordem: um berilo, um ônix e um jaspe, engastados em ouro"
      b(21, { by: "deus", cast: [C("arao", 20, "stand", { dy: 0.5, facing: -1 }), C("moises", -110, "point", { dy: 0.5, facing: 1 })], env: { glory: 0.9 } }), // "as doze pedras, segundo os nomes das doze tribos, esculpidas como selos"
      b(22, { by: "deus", props: PEITORAL_CADEIAS, cast: [C("arao", 20, "stand", { dy: 0.5, facing: -1 }), C("homem", 300, "write", { dy: 0.58, id: "lapidario", facing: -1 }), C("moises", -120, "stand", { dy: 0.5, facing: 1 })], env: { glory: 0.88 } }), // "farás para o peitoral cadeiazinhas de obra trançada de ouro puro"
      b(23, { by: "deus", props: PEITORAL_ANEIS_CIMA, cast: [C("arao", 20, "stand", { dy: 0.5, facing: -1 }), C("moises", -130, "point", { dy: 0.5, facing: 1 })], env: { glory: 0.89 } }), // "farás dois anéis de ouro nas extremidades do peitoral"
      b(24, { by: "deus", cast: [C("arao", 20, "stand", { dy: 0.5, facing: -1 }), C("moises", -70, "kneel", { dy: 0.56, facing: 1 })], env: { glory: 0.9 } }), // "porás as duas cadeiazinhas de ouro nos dois anéis do peitoral"
      b(25, { by: "deus", props: PEITORAL_ENGASTES, cast: [C("arao", 20, "raise", { dy: 0.5, facing: -1 }), C("moises", -120, "point", { dy: 0.5, facing: 1 })], env: { glory: 0.91 } }), // "as pontas das cadeiazinhas nas ombreiras do éfode, na frente"
      b(26, { by: "deus", props: PEITORAL_ANEIS_BAIXO, cast: [C("arao", 20, "stand", { dy: 0.5, facing: -1 }), C("moises", -90, "kneel", { dy: 0.68, facing: 1 })], env: { glory: 0.89 } }), // "farás dois anéis de ouro na borda do peitoral junto ao éfode, por dentro"
      b(27, { by: "deus", props: PEITORAL_LIGADO, cast: [C("arao", 20, "stand", { dy: 0.5, facing: -1 }), C("moises", 200, "point", { dy: 0.54, facing: -1 })], env: { glory: 0.9 } }), // "farás dois anéis de ouro nas ombreiras do éfode, junto à sua juntura"
      b(28, { by: "deus", cast: [C("arao", 20, "stand", { dy: 0.5, facing: -1 }), C("moises", -110, "bow", { dy: 0.5, facing: 1 })], env: { glory: 0.92 } }), // "ligarão o peitoral aos anéis do éfode com um cordão de azul, e não se separará"
      b(29, { by: "deus", env: { glory: 0.93 } }), // "Arão levará os nomes dos filhos de Israel sobre o coração, por memória"
      b(30, { by: "deus", env: { glory: 0.95 } }), // "porás no peitoral Urim e Tumim, sobre o coração de Arão diante do Senhor"
      b(31, { by: "deus" }), // "farás o manto do éfode, todo de azul"
      b(32, { by: "deus" }), // "a abertura da cabeça no meio, com uma borda tecida, para não se romper"
      b(33, { by: "deus" }), // "nas bordas, romãs de azul, púrpura e carmesim, e campainhas de ouro"
      b(34, { by: "deus" }), // "uma campainha de ouro e uma romã, alternadas, nas bordas do manto"
      b(35, { by: "deus", env: { glory: 0.9 } }), // "estará sobre Arão quando ministrar, para se ouvir o sonido, e não morrer"
      b(36, { by: "deus", env: { glory: 0.96 } }), // "farás uma lâmina de ouro puro, e gravarás: SANTIDADE AO SENHOR"
      b(37, { by: "deus" }), // "atá-la-ás com um cordão de azul, na frente da mitra"
      b(38, { by: "deus", env: { glory: 0.92 } }), // "estará na testa de Arão, para levar a iniqüidade das coisas santas, e serem aceitas"
      b(39, { by: "deus" }), // "farás a túnica e a mitra de linho fino, e o cinto de obra de bordador"
      b(40, { by: "deus", cast: [C("arao", 20, "stand", { dy: 0.5, facing: -1 }), C("homem", 90, "stand", { dy: 0.5, id: "filho-arao", facing: -1 }), C("moises", -120, "stand", { dy: 0.5, facing: 1 })] }), // "farás túnicas, cintos e tiaras aos filhos de Arão, para glória e ornamento"
      b(41, { by: "deus", env: { glory: 0.94 } }), // "vestirás Arão e seus filhos, e os ungirás e consagrarás para o sacerdócio"
      b(42, { by: "deus" }), // "faze-lhes calções de linho, para cobrir a carne nua, dos lombos às coxas"
      b(43, { by: "deus", env: { glory: 0.9 } }), // "estarão sobre eles ao ministrar, para que não levem iniqüidade e morram: estatuto perpétuo"
    ],
  },
};
