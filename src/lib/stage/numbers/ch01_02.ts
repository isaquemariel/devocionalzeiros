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
// AS QUATRO ALAS do arraial (Nm 2). A tenda da congregação fica sempre no
// centro; o que muda é o lado em que se apinham as tendas da bandeira daquele
// vento — oriente à direita, sul à frente, ocidente à esquerda, norte ao fundo.
const ALA_ORIENTE: StagePropSpec[] = [
  { ...P("tent", 0, 1.5, undefined, 0.14), tag: "tabernaculo" },
  P("tent", 155, 1.02, undefined, 0.34),
  P("tent", 240, 0.92, undefined, 0.46),
  P("tent", 315, 0.84, undefined, 0.58),
  P("palm", -300, 1.0, undefined, 0.16),
  P("grass", -120, 0.8, undefined, 0.8),
  P("grass", 45, 0.76, undefined, 0.72),
];
const ALA_SUL: StagePropSpec[] = [
  { ...P("tent", 0, 1.32, undefined, 0.1), tag: "tabernaculo" },
  P("tent", -235, 1.14, undefined, 0.66),
  P("tent", -55, 1.2, undefined, 0.76),
  P("tent", 180, 1.14, undefined, 0.68),
  P("palm", 305, 1.0, undefined, 0.2),
  P("grass", 95, 0.8, undefined, 0.88),
  P("rock", -320, 0.6, undefined, 0.5),
];
const ALA_OCIDENTE: StagePropSpec[] = [
  { ...P("tent", 0, 1.5, undefined, 0.14), tag: "tabernaculo" },
  P("tent", -155, 1.02, undefined, 0.34),
  P("tent", -240, 0.92, undefined, 0.46),
  P("tent", -315, 0.84, undefined, 0.58),
  P("palm", 300, 1.0, undefined, 0.16),
  P("grass", 125, 0.8, undefined, 0.8),
  P("grass", -45, 0.76, undefined, 0.72),
];
const ALA_NORTE: StagePropSpec[] = [
  { ...P("tent", 0, 1.28, undefined, 0.44), tag: "tabernaculo" },
  P("tent", -285, 0.8, undefined, 0.07),
  P("tent", -100, 0.84, undefined, 0.05),
  P("tent", 110, 0.84, undefined, 0.06),
  P("tent", 292, 0.8, undefined, 0.08),
  P("rock", -175, 0.6, undefined, 0.76),
  P("grass", 155, 0.8, undefined, 0.82),
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
      // v.6-15 — os PRÍNCIPES das doze tribos, um a um, apresentam-se diante de Moisés
      b(6, { by: "deus", cast: [                                                  // de SIMEÃO: Selumiel, filho de Zurisadai
        C("moises", -160, "stand", { dy: 0.5, facing: 1 }),
        C("anciao", -10, "stand", { dy: 0.54, facing: -1, id: "selumiel" }),
      ] }),
      b(7, { by: "deus", cast: [                                                  // de JUDÁ: Naasson, filho de Aminadabe
        C("moises", -160, "stand", { dy: 0.5, facing: 1 }),
        C("rei", 40, "stand", { dy: 0.52, facing: -1, id: "naassom" }),
        C("multidao", 200, "stand", { scale: 0.85, dy: 0.4 }),
      ] }),
      b(8, { by: "deus", cast: [                                                  // de ISSACAR: Natanael, filho de Zuar
        C("moises", -150, "point", { dy: 0.5, facing: 1 }),
        C("patriarca", -50, "stand", { dy: 0.56, facing: -1, id: "natanael" }),
      ] }),
      b(9, { by: "deus", cast: [                                                  // de ZEBULOM: Eliabe, filho de Helom
        C("moises", -160, "stand", { dy: 0.5, facing: 1 }),
        C("anciao", 80, "stand", { dy: 0.48, facing: -1, id: "eliabe" }),
      ] }),
      b(10, { by: "deus", cast: [                                                 // dos filhos de JOSÉ: Elisama (Efraim) e Gamaliel (Manassés)
        C("moises", -160, "stand", { dy: 0.5, facing: 1 }),
        C("patriarca", 0, "stand", { dy: 0.54, facing: -1, id: "elisama" }),
        C("anciao", 95, "stand", { scale: 0.94, dy: 0.48, facing: -1, id: "gamaliel" }),
      ] }),
      b(11, { by: "deus", cast: [                                                 // de BENJAMIM: Abidã, filho de Gideoni
        C("moises", -150, "point", { dy: 0.5, facing: 1 }),
        C("anciao", -40, "stand", { dy: 0.56, facing: -1, id: "abida" }),
      ] }),
      b(12, { by: "deus", cast: [                                                 // de DÃ: Aieser, filho de Amisadai
        C("moises", -160, "stand", { dy: 0.5, facing: 1 }),
        C("patriarca", 60, "stand", { dy: 0.5, facing: -1, id: "aieser" }),
      ] }),
      b(13, { by: "deus", cast: [                                                 // de ASER: Pagiel, filho de Ocrã
        C("moises", -160, "stand", { dy: 0.5, facing: 1 }),
        C("anciao", 20, "stand", { dy: 0.54, facing: -1, id: "pagiel" }),
        C("multidao", 195, "stand", { scale: 0.85, dy: 0.4 }),
      ] }),
      b(14, { by: "deus", cast: [                                                 // de GADE: Eliasafe, filho de Deuel
        C("moises", -150, "point", { dy: 0.5, facing: 1 }),
        C("patriarca", -30, "stand", { dy: 0.55, facing: -1, id: "eliasafe" }),
      ] }),
      b(15, { by: "deus", cast: [                                                 // de NAFTALI: Aira, filho de Enã — a lista se fecha
        C("moises", -160, "stand", { dy: 0.5, facing: 1 }),
        C("anciao", 70, "stand", { dy: 0.5, facing: -1, id: "aira" }),
      ] }),
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
      // v.20-43 — o CENSO tribo a tribo: o príncipe daquela casa à frente dos
      // seus, e o número escrito no rol — cada bloco de dois versículos é uma tribo.
      b(20, { by: "deus", cast: [                                                 // RÚBEN, o primogênito de Israel: as gerações contadas
        C("anciao", 30, "stand", { dy: 0.54, facing: -1, id: "elizur" }),
        C("homem", 125, "stand", { dy: 0.5, facing: -1, id: "contado-de-ruben" }),
        C("multidao", 225, "stand", { scale: 0.85, dy: 0.4 }),
      ] }),
      b(21, { by: "deus", cast: [                                                 // de Rúben: quarenta e seis mil e quinhentos
        C("moises", -120, "write", { dy: 0.52, facing: 1 }),
        C("anciao", 60, "stand", { dy: 0.5, facing: -1, id: "elizur" }),
      ] }),
      b(22, { by: "deus", cast: [                                                 // SIMEÃO: os homens de guerra apresentados
        C("anciao", -60, "stand", { dy: 0.54, facing: -1, id: "selumiel" }),
        C("homem", 60, "stand", { dy: 0.5, facing: -1, id: "contado-de-simeao" }),
        C("homem", 140, "stand", { scale: 0.92, dy: 0.46, facing: -1, id: "contado-de-simeao2" }),
      ] }),
      b(23, { by: "deus", cast: [                                                 // de Simeão: cinquenta e nove mil e trezentos
        C("arao", -90, "point", { glow: 0.2, dy: 0.52, facing: 1 }),
        C("moises", -160, "write", { dy: 0.5, facing: 1 }),
        C("anciao", 80, "stand", { dy: 0.5, facing: -1, id: "selumiel" }),
      ] }),
      b(24, { by: "deus", cast: [                                                 // GADE: as famílias pelo número dos nomes
        C("patriarca", 100, "stand", { dy: 0.52, facing: -1, id: "eliasafe" }),
        C("multidao", 220, "stand", { scale: 0.88, dy: 0.42 }),
      ] }),
      b(25, { by: "deus", cast: [                                                 // de Gade: quarenta e cinco mil seiscentos e cinquenta
        C("moises", -110, "write", { dy: 0.52, facing: 1 }),
        C("patriarca", 40, "stand", { dy: 0.52, facing: -1, id: "eliasafe" }),
        C("homem", 130, "stand", { scale: 0.92, dy: 0.46, facing: -1, id: "contado-de-gade" }),
      ] }),
      b(26, { by: "deus", env: { glory: 0.66 }, cast: [                           // JUDÁ, a maior das tribos, apresenta os seus exércitos
        C("rei", 0, "stand", { dy: 0.54, facing: -1, id: "naassom" }),
        C("multidao", 130, "stand", { dy: 0.46 }),
        C("multidao", 230, "stand", { scale: 0.88, dy: 0.4, id: "povo2" }),
      ] }),
      b(27, { by: "deus", cast: [                                                 // de Judá: setenta e quatro mil e seiscentos
        C("moises", -130, "write", { dy: 0.52, facing: 1 }),
        C("rei", 50, "stand", { dy: 0.52, facing: -1, id: "naassom" }),
      ] }),
      b(28, { by: "deus", env: { glory: 0.62 }, cast: [                           // ISSACAR: as gerações pelas casas dos pais
        C("patriarca", -40, "stand", { dy: 0.55, facing: -1, id: "natanael" }),
        C("homem", 70, "stand", { dy: 0.5, facing: -1, id: "contado-de-issacar" }),
      ] }),
      b(29, { by: "deus", cast: [                                                 // de Issacar: cinquenta e quatro mil e quatrocentos
        C("arao", -100, "point", { glow: 0.2, dy: 0.52, facing: 1 }),
        C("moises", -170, "write", { dy: 0.5, facing: 1 }),
        C("patriarca", 60, "stand", { dy: 0.52, facing: -1, id: "natanael" }),
      ] }),
      b(30, { by: "deus", cast: [                                                 // ZEBULOM: os que podem sair à guerra
        C("anciao", 90, "stand", { dy: 0.52, facing: -1, id: "eliabe" }),
        C("multidao", 210, "stand", { scale: 0.86, dy: 0.42 }),
      ] }),
      b(31, { by: "deus", cast: [                                                 // de Zebulom: cinquenta e sete mil e quatrocentos
        C("moises", -120, "write", { dy: 0.52, facing: 1 }),
        C("anciao", 30, "stand", { dy: 0.54, facing: -1, id: "eliabe" }),
      ] }),
      b(32, { by: "deus", cast: [                                                 // dos filhos de JOSÉ: EFRAIM, contado à parte
        C("patriarca", -20, "stand", { dy: 0.54, facing: -1, id: "elisama" }),
        C("homem", 90, "stand", { dy: 0.5, facing: -1, id: "contado-de-efraim" }),
        C("homem", 170, "stand", { scale: 0.9, dy: 0.44, facing: -1, id: "contado-de-efraim2" }),
      ] }),
      b(33, { by: "deus", cast: [                                                 // de Efraim: quarenta mil e quinhentos
        C("moises", -140, "write", { dy: 0.52, facing: 1 }),
        C("patriarca", 70, "stand", { dy: 0.5, facing: -1, id: "elisama" }),
      ] }),
      b(34, { by: "deus", cast: [                                                 // MANASSÉS: o outro filho de José apresenta os seus
        C("anciao", 50, "stand", { dy: 0.54, facing: -1, id: "gamaliel" }),
        C("multidao", 190, "stand", { scale: 0.85, dy: 0.4 }),
      ] }),
      b(35, { by: "deus", cast: [                                                 // de Manassés: trinta e dois mil e duzentos
        C("arao", -80, "point", { glow: 0.2, dy: 0.52, facing: 1 }),
        C("moises", -150, "write", { dy: 0.5, facing: 1 }),
        C("anciao", 90, "stand", { dy: 0.48, facing: -1, id: "gamaliel" }),
      ] }),
      b(36, { by: "deus", cast: [                                                 // BENJAMIM, o caçula, com os seus homens de guerra
        C("anciao", -50, "stand", { dy: 0.55, facing: -1, id: "abida" }),
        C("homem", 60, "stand", { dy: 0.5, facing: -1, id: "contado-de-benjamim" }),
      ] }),
      b(37, { by: "deus", cast: [                                                 // de Benjamim: trinta e cinco mil e quatrocentos
        C("moises", -110, "write", { dy: 0.52, facing: 1 }),
        C("anciao", 45, "stand", { dy: 0.52, facing: -1, id: "abida" }),
      ] }),
      b(38, { by: "deus", env: { glory: 0.64 }, cast: [                           // DÃ, a segunda tribo em número, cobre o campo
        C("patriarca", 20, "stand", { dy: 0.54, facing: -1, id: "aieser" }),
        C("multidao", 140, "stand", { dy: 0.46 }),
        C("multidao", 240, "stand", { scale: 0.88, dy: 0.4, id: "povo2" }),
      ] }),
      b(39, { by: "deus", cast: [                                                 // de Dã: sessenta e dois mil e setecentos
        C("moises", -130, "write", { dy: 0.52, facing: 1 }),
        C("patriarca", 60, "stand", { dy: 0.52, facing: -1, id: "aieser" }),
      ] }),
      b(40, { by: "deus", cast: [                                                 // ASER: as gerações pelas suas famílias
        C("anciao", -30, "stand", { dy: 0.55, facing: -1, id: "pagiel" }),
        C("homem", 80, "stand", { dy: 0.5, facing: -1, id: "contado-de-aser" }),
      ] }),
      b(41, { by: "deus", cast: [                                                 // de Aser: quarenta e um mil e quinhentos
        C("arao", -90, "point", { glow: 0.2, dy: 0.52, facing: 1 }),
        C("moises", -160, "write", { dy: 0.5, facing: 1 }),
        C("anciao", 70, "stand", { dy: 0.5, facing: -1, id: "pagiel" }),
      ] }),
      b(42, { by: "deus", cast: [                                                 // NAFTALI, a última tribo do rol
        C("anciao", 60, "stand", { dy: 0.53, facing: -1, id: "aira" }),
        C("multidao", 200, "stand", { scale: 0.86, dy: 0.42 }),
      ] }),
      b(43, { by: "deus", env: { glory: 0.68 }, cast: [                           // de Naftali: cinquenta e três mil e quatrocentos — o censo se fecha
        C("moises", -120, "write", { dy: 0.52, facing: 1 }),
        C("anciao", 40, "stand", { dy: 0.54, facing: -1, id: "aira" }),
      ] }),
      b(44, { cast: [                                                             // estes são os contados por Moisés, Arão e os doze príncipes
        C("moises", -120, "stand", { dy: 0.5, facing: 1 }),
        C("arao", -60, "stand", { dy: 0.5, facing: 1 }),
        C("multidao", 140, "stand", { dy: 0.46 }),
      ] }),
      b(45, { cast: [                                                             // TODOS os contados, de vinte anos para cima, os que podiam sair à guerra
        C("moises", -140, "point", { dy: 0.5, facing: 1 }),
        C("multidao", 60, "stand", { dy: 0.5 }),
        C("multidao", 170, "stand", { scale: 0.92, dy: 0.44, id: "povo2" }),
        C("multidao", 265, "stand", { scale: 0.82, dy: 0.38, id: "povo3" }),
      ] }),
      b(46, { env: { glory: 0.72 }, props: [                                      // a SOMA lançada no rol: seiscentos e três mil e quinhentos e cinquenta
        ...ARRAIAL,
        { ...P("scroll", -215, 1.0, undefined, 0.52), tag: "rol-do-censo" },
      ], cast: [
        C("moises", -150, "write", { dy: 0.52, facing: 1 }),
        C("arao", -95, "stand", { glow: 0.2, dy: 0.5, facing: 1 }),
      ] }),
      b(47, { env: { glory: 0.6 }, cast: [                                        // mas os LEVITAS não foram contados entre eles — postos à parte
        C("moises", -150, "stand", { dy: 0.52, facing: 1 }),
        C("multidao", 190, "stand", { scale: 0.86, dy: 0.42 }),
        C("servo", 20, "stand", { dy: 0.54, facing: -1, id: "levita" }),
        C("servo", 90, "stand", { scale: 0.94, dy: 0.5, facing: -1, id: "levita2" }),
      ] }),
      b(48, { by: "deus", env: { glory: 0.85 }, props: ARRAIAL, cast: [            // o Senhor tinha falado a Moisés, dizendo
        C("moises", -110, "kneel", { dy: 0.5, facing: 1 }),
      ] }),
      b(49, { by: "deus", q: "não contarás a tribo de Levi", cast: [               // "não contarás a tribo de LEVI entre os filhos de Israel"
        C("moises", -140, "point", { dy: 0.5, facing: -1 }),
        C("servo", 110, "stand", { dy: 0.52, facing: -1, id: "levita" }),
      ] }),
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
      b(1, { props: BANDEIRAS, env: { terrain: "desert", glory: 0.64, night: 0.1, verdure: 0.2 }, cast: [ // o Senhor fala a Moisés e a Arão
        C("moises", -150, "kneel", { dy: 0.5, facing: 1 }),
        C("arao", -100, "kneel", { dy: 0.5, facing: 1 }),
      ] }),
      b(2, { by: "deus", q: "cada um debaixo da sua bandeira", cast: [            // cada um sob a SUA BANDEIRA, ao redor da tenda
        C("moises", -150, "point", { dy: 0.5, facing: 1 }),
        C("multidao", 150, "stand", { dy: 0.44 }),
      ] }),
      // ---- ORIENTE: Judá, Issacar e Zebulom, e as tendas à direita da tenda
      b(3, { by: "deus", q: "do lado do oriente, para o nascente", props: ALA_ORIENTE, env: { glory: 0.66 }, cast: [
        C("rei", 150, "stand", { dy: 0.5, facing: -1, id: "naassom" }),
        C("multidao", 250, "stand", { scale: 0.9, dy: 0.42 }),
      ] }),
      b(4, { by: "deus", q: "setenta e quatro mil e seiscentos", cast: [          // o maior dos exércitos: Judá enche o palco
        C("moises", -180, "write", { dy: 0.52, facing: 1 }),
        C("rei", 60, "stand", { dy: 0.56, facing: -1, id: "naassom" }),
        C("multidao", 170, "stand", { dy: 0.48 }),
        C("multidao", 275, "stand", { scale: 0.86, dy: 0.4, id: "povo2" }),
      ] }),
      b(5, { by: "deus", q: "junto a ele armará as suas tendas a tribo de Issacar", cast: [
        C("rei", 40, "stand", { dy: 0.54, facing: -1, id: "naassom" }),
        C("anciao", 145, "stand", { dy: 0.5, facing: -1, id: "natanael" }),
      ] }),
      b(6, { by: "deus", q: "cinqüenta e quatro mil e quatrocentos", cast: [
        C("moises", -170, "write", { dy: 0.52, facing: 1 }),
        C("anciao", 55, "stand", { dy: 0.54, facing: -1, id: "natanael" }),
        C("multidao", 200, "stand", { scale: 0.9, dy: 0.44 }),
      ] }),
      b(7, { by: "deus", q: "Depois a tribo de Zebulom", cast: [
        C("anciao", 30, "stand", { dy: 0.5, facing: -1, id: "natanael" }),
        C("anciao", 140, "stand", { dy: 0.56, facing: -1, id: "eliabe" }),
      ] }),
      b(8, { by: "deus", q: "cinqüenta e sete mil e quatrocentos", cast: [
        C("moises", -175, "write", { dy: 0.5, facing: 1 }),
        C("anciao", 70, "stand", { dy: 0.52, facing: -1, id: "eliabe" }),
        C("multidao", 210, "stand", { dy: 0.46 }),
      ] }),
      b(9, { by: "deus", q: "estes marcharão primeiro", env: { glory: 0.74 }, cast: [ // a bandeira do oriente rompe a marcha
        C("rei", -60, "walk", { dy: 0.54, facing: 1, id: "naassom" }),
        C("anciao", 20, "walk", { dy: 0.5, facing: 1, id: "natanael" }),
        C("anciao", 90, "walk", { scale: 0.94, dy: 0.46, facing: 1, id: "eliabe" }),
        C("multidao", 215, "stand", { scale: 0.88, dy: 0.42 }),
      ] }),
      // ---- SUL: Rúben, Simeão e Gade, e as tendas na frente do palco
      b(10, { by: "deus", q: "estará para o lado do sul", props: ALA_SUL, env: { glory: 0.64 }, cast: [
        C("rei", -120, "stand", { dy: 0.58, facing: 1, id: "elizur" }),
        C("multidao", 130, "stand", { scale: 0.92, dy: 0.5 }),
      ] }),
      b(11, { by: "deus", q: "quarenta e seis mil e quinhentos", cast: [
        C("moises", -195, "write", { dy: 0.5, facing: 1 }),
        C("rei", -70, "stand", { dy: 0.6, facing: 1, id: "elizur" }),
      ] }),
      b(12, { by: "deus", q: "a tribo de Simeão", cast: [
        C("rei", -130, "stand", { dy: 0.56, facing: 1, id: "elizur" }),
        C("anciao", 20, "stand", { dy: 0.62, facing: -1, id: "selumiel" }),
      ] }),
      b(13, { by: "deus", q: "cinqüenta e nove mil e trezentos", cast: [
        C("moises", -190, "write", { dy: 0.5, facing: 1 }),
        C("anciao", -20, "stand", { dy: 0.6, facing: -1, id: "selumiel" }),
        C("multidao", 165, "stand", { dy: 0.52 }),
      ] }),
      b(14, { by: "deus", q: "Depois a tribo de Gade", cast: [
        C("anciao", -40, "stand", { dy: 0.56, facing: 1, id: "selumiel" }),
        C("anciao", 105, "stand", { dy: 0.64, facing: -1, id: "eliasafe" }),
      ] }),
      b(15, { by: "deus", q: "quarenta e cinco mil e seiscentos e cinqüenta", cast: [
        C("moises", -195, "write", { dy: 0.5, facing: 1 }),
        C("anciao", 40, "stand", { dy: 0.62, facing: -1, id: "eliasafe" }),
        C("multidao", 190, "stand", { scale: 0.9, dy: 0.5 }),
      ] }),
      b(16, { by: "deus", q: "estes marcharão em segundo lugar", env: { glory: 0.7 }, cast: [
        C("rei", -140, "walk", { dy: 0.6, facing: 1, id: "elizur" }),
        C("anciao", -50, "walk", { dy: 0.56, facing: 1, id: "selumiel" }),
        C("anciao", 30, "walk", { scale: 0.94, dy: 0.52, facing: 1, id: "eliasafe" }),
        C("multidao", 200, "stand", { scale: 0.88, dy: 0.48 }),
      ] }),
      // ---- O CENTRO: a tenda e os levitas no meio dos exércitos
      b(17, { by: "deus", q: "a tenda da congregação", props: BANDEIRAS, env: { glory: 0.78 }, cast: [
        C("moises", -150, "stand", { dy: 0.5, facing: 1 }),
        C("servo", 20, "walk", { dy: 0.52, facing: -1, id: "levita" }),
        C("servo", 95, "walk", { scale: 0.94, dy: 0.48, facing: -1, id: "levita2" }),
      ] }),
      // ---- OCIDENTE: Efraim, Manassés e Benjamim, e as tendas à esquerda
      b(18, { by: "deus", q: "estará para o lado do ocidente", props: ALA_OCIDENTE, env: { glory: 0.64 }, cast: [
        C("rei", -150, "stand", { dy: 0.5, facing: 1, id: "elisama" }),
        C("multidao", 120, "stand", { scale: 0.9, dy: 0.44 }),
      ] }),
      b(19, { by: "deus", q: "quarenta mil e quinhentos", cast: [
        C("moises", 185, "write", { dy: 0.5, facing: -1 }),
        C("rei", -70, "stand", { dy: 0.54, facing: 1, id: "elisama" }),
      ] }),
      b(20, { by: "deus", q: "a tribo de Manassés", cast: [
        C("rei", -160, "stand", { dy: 0.5, facing: 1, id: "elisama" }),
        C("anciao", -55, "stand", { dy: 0.56, facing: 1, id: "gamaliel" }),
      ] }),
      b(21, { by: "deus", q: "trinta e dois mil e duzentos", cast: [              // a MENOR tribo do censo: poucos em cena
        C("moises", 180, "write", { dy: 0.5, facing: -1 }),
        C("anciao", -60, "stand", { scale: 0.94, dy: 0.5, facing: 1, id: "gamaliel" }),
      ] }),
      b(22, { by: "deus", q: "Depois a tribo de Benjamim", cast: [
        C("anciao", -140, "stand", { dy: 0.52, facing: 1, id: "gamaliel" }),
        C("anciao", -20, "stand", { dy: 0.58, facing: 1, id: "abida" }),
      ] }),
      b(23, { by: "deus", q: "trinta e cinco mil e quatrocentos", cast: [
        C("moises", 190, "write", { dy: 0.5, facing: -1 }),
        C("anciao", -30, "stand", { dy: 0.54, facing: 1, id: "abida" }),
        C("multidao", 110, "stand", { scale: 0.9, dy: 0.46 }),
      ] }),
      b(24, { by: "deus", q: "estes marcharão em terceiro lugar", env: { glory: 0.7 }, cast: [
        C("rei", -170, "walk", { dy: 0.54, facing: 1, id: "elisama" }),
        C("anciao", -90, "walk", { dy: 0.5, facing: 1, id: "gamaliel" }),
        C("anciao", -20, "walk", { scale: 0.94, dy: 0.46, facing: 1, id: "abida" }),
        C("multidao", 150, "stand", { scale: 0.88, dy: 0.42 }),
      ] }),
      // ---- NORTE: Dã, Aser e Naftali, e as tendas ao fundo
      b(25, { by: "deus", q: "estará para o norte", props: ALA_NORTE, env: { glory: 0.62 }, cast: [
        C("rei", -60, "stand", { dy: 0.62, facing: 1, id: "aieser" }),
        C("multidao", 175, "stand", { scale: 0.94, dy: 0.56 }),
      ] }),
      b(26, { by: "deus", q: "sessenta e dois mil e setecentos", cast: [          // Dã, a segunda em número, cobre o fundo do arraial
        C("moises", -210, "write", { dy: 0.56, facing: 1 }),
        C("rei", -40, "stand", { dy: 0.66, facing: 1, id: "aieser" }),
        C("multidao", 120, "stand", { dy: 0.6 }),
        C("multidao", 240, "stand", { scale: 0.88, dy: 0.52, id: "povo2" }),
      ] }),
      b(27, { by: "deus", q: "a tribo de Aser", cast: [
        C("rei", -80, "stand", { dy: 0.6, facing: 1, id: "aieser" }),
        C("anciao", 45, "stand", { dy: 0.66, facing: -1, id: "pagiel" }),
      ] }),
      b(28, { by: "deus", q: "quarenta e um mil e quinhentos", cast: [
        C("moises", -205, "write", { dy: 0.56, facing: 1 }),
        C("anciao", 10, "stand", { dy: 0.64, facing: -1, id: "pagiel" }),
        C("multidao", 185, "stand", { scale: 0.9, dy: 0.56 }),
      ] }),
      b(29, { by: "deus", q: "Depois a tribo de Naftali", cast: [
        C("anciao", -30, "stand", { dy: 0.6, facing: 1, id: "pagiel" }),
        C("anciao", 105, "stand", { dy: 0.68, facing: -1, id: "aira" }),
      ] }),
      b(30, { by: "deus", q: "cinqüenta e três mil e quatrocentos", cast: [
        C("moises", -210, "write", { dy: 0.56, facing: 1 }),
        C("anciao", 55, "stand", { dy: 0.66, facing: -1, id: "aira" }),
      ] }),
      b(31, { by: "deus", q: "estes marcharão em último lugar", env: { glory: 0.68 }, cast: [ // Dã fecha a marcha, a retaguarda de todos
        C("multidao", -190, "stand", { scale: 0.86, dy: 0.44 }),
        C("rei", 30, "walk", { dy: 0.66, facing: 1, id: "aieser" }),
        C("anciao", 120, "walk", { dy: 0.62, facing: 1, id: "pagiel" }),
        C("anciao", 200, "walk", { scale: 0.94, dy: 0.58, facing: 1, id: "aira" }),
      ] }),
      // ---- A SOMA e a tribo que fica de fora do exército
      b(32, { by: "deus", q: "seiscentos e três mil e quinhentos e cinqüenta", props: [
        ...BANDEIRAS,
        { ...P("scroll", -235, 1.0, undefined, 0.6), tag: "rol-do-censo" },
      ], env: { glory: 0.76 }, cast: [
        C("moises", -160, "write", { dy: 0.54, facing: 1 }),
        C("arao", -95, "stand", { glow: 0.2, dy: 0.5, facing: 1 }),
        C("multidao", 130, "stand", { dy: 0.48 }),
        C("multidao", 245, "stand", { scale: 0.86, dy: 0.42, id: "povo2" }),
      ] }),
      b(33, { by: "deus", q: "os levitas não foram contados entre os filhos de Israel", props: [
        ...BANDEIRAS,
        { ...P("scroll", -235, 1.0, undefined, 0.6), tag: "rol-dos-levitas" },
      ], env: { glory: 0.66 }, cast: [
        C("moises", -160, "stand", { dy: 0.52, facing: 1 }),
        C("servo", 30, "stand", { dy: 0.54, facing: -1, id: "levita" }),
        C("servo", 105, "stand", { scale: 0.94, dy: 0.5, facing: -1, id: "levita2" }),
      ] }),
      b(34, { q: "assim armaram o arraial", env: { glory: 0.72 }, cast: [         // e Israel armou o arraial segundo as suas bandeiras
        C("moises", -140, "stand", { dy: 0.5, facing: 1 }),
        C("multidao", 60, "stand", { dy: 0.48 }),
        C("multidao", 180, "stand", { scale: 0.9, dy: 0.42, id: "povo2" }),
      ] }),
    ],
  },
};
