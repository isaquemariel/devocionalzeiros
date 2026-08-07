// ============================================================================
// NÚMEROS 1–2 — CENA VIVA (força-tarefa AT, onda Números).
//
// O livro do DESERTO. No deserto de Sinai, um ano depois do Egito, o Senhor
// manda CONTAR o povo — não como rebanho, mas como exército de Deus a caminho
// da Terra. E ordena o ARRAIAL: cada tribo sob a sua bandeira, os quatro
// exércitos ao redor da tenda da congregação, e os levitas no meio, guardando
// o tabernáculo do testemunho — o Deus santo habitando no centro do seu povo.
//
// Nm 1 — O RECENSEAMENTO: Moisés e Arão, com um príncipe de cada tribo, contam
// os homens de vinte anos para cima que podem sair à guerra; só a tribo de LEVI
// é posta à parte, para o serviço do tabernáculo.
//
// Nm 2 — O ACAMPAMENTO POR BANDEIRAS: Judá ao oriente, Rúben ao sul, Efraim ao
// ocidente, Dã ao norte — e a tenda no meio, marchando no centro.
//
// A VOZ DE DEUS (regra do projeto): a ordem vem do alto (`by: "deus"`), da
// tenda, sem figura. Moisés e Arão contam; os príncipes das tribos são `anciao`
// e `rei`; o exército é `multidao`.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });
const dv = (v: number) => b(v, { by: "deus" });

// O ARRAIAL no deserto de Sinai: a tenda da congregação ao centro, as tribos
// em tendas ao redor, o poço e as palmeiras do oásis.
const ARRAIAL: StagePropSpec[] = [
  { ...P("tent", 0, 1.5, undefined, 0.1), tag: "tabernaculo" },
  P("tent", -260, 1.05, undefined, 0.2),
  P("tent", -170, 0.9, undefined, 0.3),
  P("tent", 190, 1.05, undefined, 0.22),
  P("tent", 280, 0.9, undefined, 0.34),
  P("palm", -310, 1.05, undefined, 0.14),
  P("well", 320, 1.0, undefined, 0.5),
  P("rock", -80, 0.6, undefined, 0.72),
  P("grass", -40, 0.82, undefined, 0.82),
  P("grass", 60, 0.78, undefined, 0.74),
];
// O ACAMPAMENTO POR BANDEIRAS (Nm 2): as quatro alas de tendas ao redor da
// tenda central — o exército do Senhor em ordem.
const BANDEIRAS: StagePropSpec[] = [
  { ...P("tent", 0, 1.55, undefined, 0.12), tag: "tabernaculo" },
  P("tent", -300, 1.0, undefined, 0.18),
  P("tent", -220, 0.9, undefined, 0.26),
  P("tent", -140, 0.8, undefined, 0.36),
  P("tent", 150, 0.85, undefined, 0.36),
  P("tent", 230, 0.95, undefined, 0.26),
  P("tent", 310, 1.0, undefined, 0.18),
  P("trumpet", -60, 0.9, undefined, 0.5),
  P("grass", -40, 0.8, undefined, 0.82),
  P("grass", 80, 0.78, undefined, 0.74),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Nm 1
  1: {
    start: { terrain: "desert", night: 0.1, glory: 0.6, storm: 0, fire: 0, verdure: 0.2 },
    beats: [
      b(1, { by: "deus", props: ARRAIAL, env: { terrain: "desert", glory: 0.62, night: 0.1, verdure: 0.2 }, cast: [ // o Senhor fala a Moisés no deserto de Sinai
        C("moises", -150, "kneel", { dy: 0.5, facing: 1 }),
        C("arao", -100, "kneel", { dy: 0.5, facing: 1 }),
      ] }),
      b(2, { by: "deus", q: "Tomai a soma de toda a congregação" }),              // "Tomai a soma de toda a congregação de Israel"
      b(3, { by: "deus", q: "podem sair à guerra", cast: [                        // os de vinte anos para cima que podem sair à GUERRA
        C("moises", -150, "point", { dy: 0.5, facing: 1 }),
        C("multidao", 130, "stand", { dy: 0.46 }),
        C("multidao", 220, "stand", { scale: 0.9, dy: 0.4, id: "povo2" }),
      ] }),
      dv(4),
      b(5, { by: "deus", cast: [                                                  // os PRÍNCIPES de cada tribo que estarão convosco
        C("moises", -150, "stand", { dy: 0.5, facing: 1 }),
        C("rei", -40, "stand", { dy: 0.52, facing: -1, id: "principe1" }),
        C("anciao", 40, "stand", { dy: 0.5, facing: -1, id: "principe2" }),
        C("anciao", 110, "stand", { dy: 0.46, facing: -1, id: "principe3" }),
      ] }),
      dv(6), dv(7), dv(8), dv(9), dv(10), dv(11), dv(12), dv(13), dv(14), dv(15),  // os nomes dos príncipes das doze tribos
      b(16, { by: "deus", cast: [                                                 // estes são os chamados da congregação, príncipes das tribos
        C("rei", -40, "stand", { dy: 0.52, facing: -1, id: "principe1" }),
        C("anciao", 40, "stand", { dy: 0.5, facing: -1, id: "principe2" }),
        C("anciao", 110, "stand", { dy: 0.46, facing: -1, id: "principe3" }),
      ] }),
      b(17, { cast: [                                                             // Moisés e Arão tomam estes homens declarados pelos nomes
        C("moises", -120, "point", { dy: 0.5, facing: 1 }),
        C("arao", -60, "stand", { dy: 0.5, facing: 1 }),
        C("multidao", 140, "stand", { dy: 0.46 }),
      ] }),
      b(18, { cast: [                                                             // ajuntam toda a congregação e se contam por famílias
        C("moises", -120, "stand", { dy: 0.5, facing: 1 }),
        C("multidao", 60, "stand", { dy: 0.48 }),
        C("multidao", 180, "stand", { scale: 0.9, dy: 0.42, id: "povo2" }),
      ] }),
      b(19, { q: "no deserto de Sinai", cast: [                                   // como o Senhor ordenara, assim os contou no deserto de Sinai
        C("moises", -120, "point", { dy: 0.5, facing: 1 }),
        C("multidao", 80, "stand", { dy: 0.48 }),
      ] }),
      dv(20), dv(21), dv(22), dv(23), dv(24), dv(25), dv(26), dv(27), dv(28), dv(29), dv(30),
      dv(31), dv(32), dv(33), dv(34), dv(35), dv(36), dv(37), dv(38), dv(39), dv(40), dv(41), dv(42), dv(43),
      b(44, { cast: [                                                             // estes são os contados por Moisés, Arão e os doze príncipes
        C("moises", -120, "stand", { dy: 0.5, facing: 1 }),
        C("arao", -60, "stand", { dy: 0.5, facing: 1 }),
        C("multidao", 140, "stand", { dy: 0.46 }),
      ] }),
      b(45, {}), b(46, {}),                                                       // seiscentos e três mil e quinhentos e cinquenta homens
      b(47, {}),                                                                  // mas os levitas não foram contados entre eles
      b(48, { by: "deus" }),                                                      // o Senhor falara a Moisés
      b(49, { by: "deus", q: "não contarás a tribo de Levi" }),                   // "não contarás a tribo de LEVI entre os filhos de Israel"
      b(50, { by: "deus", cast: [                                                 // porás os levitas sobre o tabernáculo do testemunho
        C("moises", -150, "stand", { dy: 0.5, facing: 1 }),
        C("servo", 60, "stand", { dy: 0.5, facing: -1, id: "levita" }),
      ] }),
      dv(51), dv(52),
      b(53, { by: "deus", q: "ao redor do tabernáculo do testemunho", cast: [      // os levitas acampam AO REDOR do tabernáculo, por guarda
        C("servo", -40, "stand", { dy: 0.5, facing: 1, id: "levita" }),
        C("servo", 60, "stand", { dy: 0.5, facing: -1, id: "levita2" }),
      ] }),
      b(54, { q: "assim o fizeram", env: { glory: 0.7 }, cast: [                   // e os filhos de Israel fizeram conforme tudo o que o Senhor ordenou
        C("moises", -120, "stand", { dy: 0.5, facing: 1 }),
        C("multidao", 120, "stand", { dy: 0.46 }),
      ] }),
    ],
  },

  // ------------------------------------------------------------------ Nm 2
  2: {
    start: { terrain: "desert", night: 0.1, glory: 0.62, storm: 0, fire: 0, verdure: 0.2 },
    beats: [
      b(1, { by: "deus", props: BANDEIRAS, env: { terrain: "desert", glory: 0.64, night: 0.1, verdure: 0.2 }, cast: [ // o Senhor fala a Moisés e a Arão
        C("moises", -150, "kneel", { dy: 0.5, facing: 1 }),
        C("arao", -100, "kneel", { dy: 0.5, facing: 1 }),
      ] }),
      b(2, { by: "deus", q: "cada um debaixo da sua bandeira", cast: [            // cada um sob a SUA BANDEIRA, ao redor da tenda
        C("moises", -150, "point", { dy: 0.5, facing: 1 }),
        C("multidao", 150, "stand", { dy: 0.44 }),
      ] }),
      b(3, { by: "deus", cast: [                                                 // ao oriente: a bandeira de JUDÁ e os seus exércitos
        C("multidao", 130, "stand", { dy: 0.46 }),
        C("rei", 40, "stand", { dy: 0.5, facing: -1, id: "juda" }),
      ] }),
      dv(4), dv(5), dv(6), dv(7), dv(8), dv(9),                                   // os exércitos do lado oriental (Judá, Issacar, Zebulom)
      b(10, { by: "deus", cast: [ C("rei", -40, "stand", { dy: 0.5, facing: 1, id: "ruben" }), C("multidao", 150, "stand", { dy: 0.44 }) ] }), // ao sul: a bandeira de RÚBEN
      dv(11), dv(12), dv(13), dv(14), dv(15), dv(16),                             // os exércitos do sul (Rúben, Simeão, Gade)
      b(17, { by: "deus", q: "a tenda da congregação", env: { glory: 0.72 }, cast: [ // a tenda no MEIO dos exércitos, com os levitas
        C("moises", -150, "stand", { dy: 0.5, facing: 1 }),
        C("servo", 40, "stand", { dy: 0.5, facing: -1, id: "levita" }),
      ] }),
      b(18, { by: "deus", cast: [ C("rei", 40, "stand", { dy: 0.5, facing: -1, id: "efraim" }), C("multidao", 150, "stand", { dy: 0.44 }) ] }), // ao ocidente: a bandeira de EFRAIM
      dv(19), dv(20), dv(21), dv(22), dv(23), dv(24),                             // os exércitos do ocidente (Efraim, Manassés, Benjamim)
      b(25, { by: "deus", cast: [ C("rei", -40, "stand", { dy: 0.5, facing: 1, id: "da" }), C("multidao", 150, "stand", { dy: 0.44 }) ] }), // ao norte: a bandeira de DÃ
      dv(26), dv(27), dv(28), dv(29), dv(30), dv(31),                             // os exércitos do norte (Dã, Aser, Naftali)
      dv(32), dv(33),
      b(34, { q: "assim armaram o arraial", env: { glory: 0.72 }, cast: [         // e Israel armou o arraial segundo as suas bandeiras
        C("moises", -140, "stand", { dy: 0.5, facing: 1 }),
        C("multidao", 60, "stand", { dy: 0.48 }),
        C("multidao", 180, "stand", { scale: 0.9, dy: 0.42, id: "povo2" }),
      ] }),
    ],
  },
};
