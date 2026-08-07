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
const PATIO: StagePropSpec[] = [
  { ...P("altar", 0, 1.05, 0.4, 0.44), tag: "altar-cobre" },
  { ...P("tent", -180, 1.15, undefined, 0.4), tag: "patio-tabernaculo" },
  P("tent", 180, 1.15, undefined, 0.4),
  P("tower", -320, 1, undefined, 0.28),
  P("tower", 320, 0.95, undefined, 0.3),
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

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Êx 27
  // O altar de cobre e os seus utensílios → o pátio cercado de cortinas → e o
  // azeite puro para o candeeiro arder continuamente.
  27: {
    start: { terrain: "mountain", night: 0.22, glory: 0.8, storm: 0, fire: 0.5, verdure: 0.2 },
    beats: [
      b(1, { set: "monte", cast: [C("moises", -140, "kneel", { dy: 0.5, facing: 1 })], props: ALTAR_BRONZE, env: { terrain: "mountain", glory: 0.82, fire: 0.5, night: 0.2 } }), // "farás o altar de acácia, quadrado, de cinco côvados, e três de altura"
      b(2, { by: "deus" }), // "farás as suas pontas nos quatro cantos, e o cobrirás de cobre"
      b(3, { by: "deus" }), // "farás os seus recipientes, pás, bacias, garfos e braseiros, de cobre"
      b(4, { by: "deus" }), // "farás um crivo de cobre em forma de rede, com quatro argolas"
      b(5, { by: "deus" }), // "porás a rede da borda do altar para baixo, até ao meio dele"
      b(6, { by: "deus" }), // "farás varais de acácia para o altar, cobertos de cobre"
      b(7, { by: "deus" }), // "os varais serão postos nas argolas, de ambos os lados, para o levar"
      b(8, { by: "deus", env: { glory: 0.85 } }), // "oco e de tábuas o farás, como se te mostrou no monte"
      b(9, { by: "deus", props: PATIO, env: { glory: 0.8, fire: 0.3 } }), // "farás o pátio do tabernáculo, com cortinas de linho ao lado do sul"
      b(10, { by: "deus" }), // "vinte colunas e vinte bases de cobre; os colchetes e faixas de prata"
      b(11, { by: "deus" }), // "assim também para o lado norte, cem côvados de cortinas"
      b(12, { by: "deus" }), // "para o ocidente, cortinas de cinqüenta côvados, dez colunas e dez bases"
      b(13, { by: "deus" }), // "a largura do pátio ao oriente, para o levante, cinqüenta côvados"
      b(14, { by: "deus" }), // "quinze côvados de cortinas de um lado, três colunas e três bases"
      b(15, { by: "deus" }), // "e quinze côvados de cortinas do outro lado, três colunas e três bases"
      b(16, { by: "deus" }), // "à porta do pátio, uma cortina de vinte côvados, de azul, púrpura e carmesim"
      b(17, { by: "deus" }), // "todas as colunas do pátio cingidas de faixas de prata, bases de cobre"
      b(18, { by: "deus" }), // "o pátio de cem côvados de comprimento, cinqüenta de largura, cinco de altura"
      b(19, { by: "deus" }), // "todos os vasos e pregos do tabernáculo e do pátio serão de cobre"
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
      b(6, { by: "deus", cast: [C("arao", 20, "stand", { dy: 0.5, facing: -1 }), C("moises", -120, "point", { dy: 0.5, facing: 1 })] }), // "farão o éfode de ouro, azul, púrpura, carmesim e linho, de obra esmerada"
      b(7, { by: "deus" }), // "terá duas ombreiras que se unam às suas duas pontas"
      b(8, { by: "deus" }), // "o cinto do éfode será da mesma obra, de ouro, azul, púrpura e linho"
      b(9, { by: "deus" }), // "tomarás duas pedras de ônix, e gravarás nelas os nomes dos filhos de Israel"
      b(10, { by: "deus" }), // "seis nomes numa pedra e seis na outra, segundo as suas gerações"
      b(11, { by: "deus" }), // "como lavor de selos as gravarás, engastadas em ouro"
      b(12, { by: "deus", env: { glory: 0.9 } }), // "porás as pedras nas ombreiras do éfode, por memória; Arão levará os nomes aos ombros"
      b(13, { by: "deus" }), // "farás também engastes de ouro"
      b(14, { by: "deus" }), // "e duas cadeiazinhas de ouro puro, de obra de fieira, nos engastes"
      b(15, { by: "deus", env: { glory: 0.92 } }), // "farás o peitoral do juízo, de obra esmerada, como o éfode"
      b(16, { by: "deus" }), // "quadrado e duplo, de um palmo de comprimento e de largura"
      b(17, { by: "deus" }), // "a primeira ordem: um sárdio, um topázio e um carbúnculo"
      b(18, { by: "deus" }), // "a segunda ordem: uma esmeralda, uma safira e um diamante"
      b(19, { by: "deus" }), // "a terceira ordem: um jacinto, uma ágata e uma ametista"
      b(20, { by: "deus" }), // "a quarta ordem: um berilo, um ônix e um jaspe, engastados em ouro"
      b(21, { by: "deus", env: { glory: 0.9 } }), // "as doze pedras, segundo os nomes das doze tribos, esculpidas como selos"
      b(22, { by: "deus" }), // "farás para o peitoral cadeiazinhas de obra trançada de ouro puro"
      b(23, { by: "deus" }), // "farás dois anéis de ouro nas extremidades do peitoral"
      b(24, { by: "deus" }), // "porás as duas cadeiazinhas de ouro nos dois anéis do peitoral"
      b(25, { by: "deus" }), // "as pontas das cadeiazinhas nas ombreiras do éfode, na frente"
      b(26, { by: "deus" }), // "farás dois anéis de ouro na borda do peitoral junto ao éfode, por dentro"
      b(27, { by: "deus" }), // "farás dois anéis de ouro nas ombreiras do éfode, junto à sua juntura"
      b(28, { by: "deus" }), // "ligarão o peitoral aos anéis do éfode com um cordão de azul, e não se separará"
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
