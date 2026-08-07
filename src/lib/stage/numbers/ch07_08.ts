// ============================================================================
// NÚMEROS 7–8 — CENA VIVA. A DEDICAÇÃO do altar e a PURIFICAÇÃO dos levitas.
//
// Nm 7 — A DEDICAÇÃO: no dia em que Moisés acaba de levantar o tabernáculo e o
// unge, os príncipes das doze tribos trazem SEIS CARROS COBERTOS e DOZE BOIS
// para o serviço de carga; e, por doze dias, cada príncipe apresenta a sua
// oferta idêntica para a consagração do ALTAR. CLÍMAX (v.89): Moisés entra na
// tenda e OUVE A VOZ que lhe falava de cima do PROPICIATÓRIO, sobre a arca do
// testemunho, entre os dois querubins — a arca em cena, a voz do céu, sem figura.
//
// Nm 8 — AS LÂMPADAS e OS LEVITAS: Arão acende as sete lâmpadas do candelabro
// de ouro batido, defronte; e os levitas são purificados (aspersão da água da
// expiação, navalha, vestes lavadas) e apresentados por OFERTA MOVIDA diante do
// Senhor, dados em lugar dos primogênitos, para que não haja praga em Israel.
//
// A VOZ DE DEUS (regra do projeto): a ordem e a voz vêm do alto (`by: "deus"`),
// sem figura; no propiciatório, glória alta sobre a arca; Arão e os levitas
// (`arao`/`servo`) diante da tenda.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });
const dv = (v: number) => b(v, { by: "deus" });

// Arraial no deserto: o tabernáculo levantado e o altar do holocausto aceso.
const ARRAIAL: StagePropSpec[] = [
  { ...P("tent", -40, 1.5, undefined, 0.1), tag: "tabernaculo" },
  { ...P("altar", 120, 0.9, 0.5, 0.5), tag: "altar-holocausto" },
  P("palm", -320, 1.05, undefined, 0.14),
  P("well", 320, 1.0, undefined, 0.5),
  P("grass", -60, 0.82, undefined, 0.82),
  P("grass", 60, 0.78, undefined, 0.74),
];
// As ofertas dos príncipes: os seis carros cobertos e os doze bois diante da tenda.
const OFERTAS: StagePropSpec[] = [
  { ...P("tent", -70, 1.45, undefined, 0.1), tag: "tabernaculo" },
  { ...P("altar", 70, 0.95, 0.6, 0.5), tag: "altar-holocausto" },
  P("crate", 190, 0.85, undefined, 0.56),
  P("crate", 260, 0.8, undefined, 0.5),
  P("crate", -250, 0.9, undefined, 0.3),
  P("palm", -330, 1.05, undefined, 0.14),
  P("grass", -40, 0.82, undefined, 0.82),
];
// O PROPICIATÓRIO: a arca do testemunho velada na tenda, entre os dois querubins.
const PROPICIATORIO: StagePropSpec[] = [
  { ...P("tent", -20, 1.6, undefined, 0.08), tag: "tabernaculo" },
  // arca centralizada e ampliada (prop não aceita glow → scale ~1.25 dá o vulto quente)
  { ...P("ark", 40, 1.25, undefined, 0.5), tag: "arca-testemunho" },
  // querubins aproximados da arca e ampliados (~+0.05), ladeando o propiciatório
  P("cherub", -10, 0.6, undefined, 0.42),
  P("cherub", 90, 0.6, undefined, 0.42),
];
// O CANDELABRO de ouro batido, aceso defronte, e o altar ao lado.
const CANDELABRO: StagePropSpec[] = [
  { ...P("tent", -50, 1.5, undefined, 0.1), tag: "tabernaculo" },
  { ...P("menorah", 60, 1.0, 0.6, 0.42), tag: "candelabro-ouro" },
  { ...P("altar", 190, 0.85, 0.4, 0.5), tag: "altar-holocausto" },
  P("palm", -330, 1.05, undefined, 0.14),
  P("grass", -60, 0.82, undefined, 0.82),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Nm 7
  7: {
    start: { terrain: "desert", night: 0.1, glory: 0.66, storm: 0, fire: 0.3, verdure: 0.2 },
    beats: [
      b(1, { q: "Moisés acabou de levantar o tabernáculo", props: ARRAIAL, env: { terrain: "desert", glory: 0.72, night: 0.08, verdure: 0.2 }, cast: [ // o tabernáculo levantado, ungido e santificado
        C("moises", -160, "raise", { dy: 0.5, facing: 1 }),
        C("arao", -100, "stand", { glow: 0.25, dy: 0.5, facing: 1 }),
      ] }),
      b(2, { cast: [                                                              // os príncipes de Israel, cabeças das tribos, ofereceram
        C("moises", -160, "stand", { dy: 0.5, facing: 1 }),
        C("homem", 60, "stand", { dy: 0.5, facing: -1, id: "principe1" }),
        C("homem", 140, "stand", { dy: 0.46, facing: -1, id: "principe2" }),
      ] }),
      b(3, { q: "seis carros cobertos, e doze bois", set: "ofertas", props: OFERTAS, env: { terrain: "desert", glory: 0.68, night: 0.1 }, cast: [ // seis carros cobertos e doze bois diante do tabernáculo
        C("homem", -30, "stand", { dy: 0.52, facing: -1, id: "principe1" }),
        C("rebanho", 150, "stand", { dy: 0.4, id: "bois" }),
        C("rebanho", 220, "stand", { scale: 0.9, dy: 0.36, id: "bois2" }),
      ] }),
      dv(4),                                                                      // e falou o Senhor a Moisés
      b(5, { by: "deus", q: "os darás aos levitas" }),                            // "recebe os carros e os bois e dá-os aos levitas"
      b(6, { q: "recebeu os carros e os bois", cast: [                            // Moisés recebeu os carros e os bois e os deu aos levitas
        C("moises", -140, "point", { dy: 0.5, facing: 1 }),
        C("servo", 60, "stand", { dy: 0.5, facing: -1, id: "gerson" }),
        C("servo", 130, "stand", { dy: 0.46, facing: -1, id: "merari" }),
      ] }),
      b(7, { cast: [ C("servo", 40, "stand", { dy: 0.5, facing: -1, id: "gerson" }) ] }), // dois carros e quatro bois aos gersonitas
      b(8, { cast: [ C("servo", 40, "stand", { dy: 0.5, facing: -1, id: "merari" }) ] }), // quatro carros e oito bois aos meraritas
      b(9, { q: "o levavam aos ombros", cast: [                                   // aos coatitas nada deu: o santuário levavam aos ombros
        C("servo", 40, "stand", { dy: 0.52, facing: -1, id: "coate" }),
        C("servo", 110, "stand", { dy: 0.48, facing: -1, id: "coate2" }),
      ] }),
      b(10, { q: "para a consagração do altar", env: { glory: 0.72, fire: 0.5 }, cast: [ // os príncipes ofereceram para a consagração do altar
        C("homem", 30, "kneel", { dy: 0.5, facing: -1, id: "principe1" }),
        C("arao", -40, "stand", { glow: 0.3, dy: 0.5, facing: -1 }),
      ] }),
      b(11, { by: "deus", q: "Cada príncipe oferecerá a sua oferta" }),           // "cada príncipe, no seu dia, oferecerá a sua oferta"
      b(12, { q: "no primeiro dia apresentou a sua oferta", env: { glory: 0.7, fire: 0.5 }, cast: [ // 1º dia: Naassom, da tribo de Judá, apresenta a oferta
        C("homem", 20, "kneel", { dy: 0.5, facing: -1, id: "naassom" }),
        C("arao", -50, "stand", { glow: 0.3, dy: 0.5, facing: -1 }),
      ] }),
      // v.13-83 — os DOZE DIAS: a oferta idêntica de cada príncipe, o altar sempre em cena.
      b(13), b(14), b(15), b(16), b(17),
      b(18), b(19), b(20), b(21), b(22), b(23),
      b(24), b(25), b(26), b(27), b(28), b(29),
      b(30), b(31), b(32), b(33), b(34), b(35),
      b(36), b(37), b(38), b(39), b(40), b(41),
      b(42), b(43), b(44), b(45), b(46), b(47),
      b(48), b(49), b(50), b(51), b(52), b(53),
      b(54), b(55), b(56), b(57), b(58), b(59),
      b(60), b(61), b(62), b(63), b(64), b(65),
      b(66), b(67), b(68), b(69), b(70), b(71),
      b(72), b(73), b(74), b(75), b(76), b(77),
      b(78), b(79), b(80), b(81), b(82), b(83),
      b(84, { q: "Esta foi a consagração do altar", env: { glory: 0.74, fire: 0.55 }, cast: [ // o total: esta foi a consagração do altar
        C("arao", -40, "raise", { glow: 0.35, dy: 0.5, facing: 1 }),
        C("moises", -130, "stand", { dy: 0.5, facing: 1 }),
      ] }),
      b(85), b(86), b(87),                                                        // o cômputo da prata, do ouro e dos animais
      b(88, { q: "esta foi a consagração do altar, depois que foi ungido" }),     // o total dos sacrifícios: consagrado o altar
      // v.89 — O PROPICIATÓRIO: Moisés entra e OUVE A VOZ de cima da arca.
      b(89, { by: "deus", q: "ouvia a voz que lhe falava de cima do propiciatório", props: PROPICIATORIO, env: { terrain: "desert", glory: 0.66, night: 0.06, fire: 0.25 }, cast: [ // Moisés ouve a voz de cima do propiciatório, entre os dois querubins
        C("moises", -70, "kneel", { dy: 0.54, facing: 1, glow: 0.2 }),
      ] }),
    ],
  },

  // ------------------------------------------------------------------ Nm 8
  8: {
    start: { terrain: "desert", night: 0.1, glory: 0.66, storm: 0, fire: 0.3, verdure: 0.2 },
    beats: [
      b(1, { by: "deus", props: CANDELABRO, env: { terrain: "desert", glory: 0.7, night: 0.1, verdure: 0.2, fire: 0.4 }, cast: [ // o Senhor fala a Moisés
        C("moises", -160, "kneel", { dy: 0.5, facing: 1 }),
      ] }),
      b(2, { by: "deus", q: "Quando acenderes as lâmpadas", env: { glory: 0.72, fire: 0.5 }, cast: [ // "quando acenderes as lâmpadas, iluminarão defronte do candelabro"
        C("arao", -30, "stand", { glow: 0.3, dy: 0.52, facing: -1 }),
      ] }),
      b(3, { q: "Acendeu as lâmpadas do candelabro", env: { glory: 0.75, fire: 0.6 }, cast: [ // Arão acende as sete lâmpadas defronte do candelabro
        C("arao", -20, "raise", { glow: 0.4, dy: 0.5, facing: -1 }),
      ] }),
      b(4, { q: "obra de ouro batido", cast: [                                    // o candelabro, obra de ouro batido, conforme o modelo
        C("arao", -20, "point", { glow: 0.35, dy: 0.5, facing: -1 }),
      ] }),
      b(5, { by: "deus", cast: [ C("moises", -160, "kneel", { dy: 0.5, facing: 1 }) ] }), // e falou o Senhor a Moisés
      b(6, { by: "deus", q: "Toma os levitas", props: ARRAIAL, env: { terrain: "desert", glory: 0.68, night: 0.1, fire: 0.3 }, cast: [ // "toma os levitas e purifica-os"
        C("moises", -160, "kneel", { dy: 0.5, facing: 1 }),
        C("servo", 60, "stand", { dy: 0.5, facing: -1, id: "levita" }),
        C("servo", 130, "stand", { dy: 0.46, facing: -1, id: "levita2" }),
      ] }),
      b(7, { by: "deus", q: "Esparge sobre eles a água da expiação", cast: [      // aspersão da água da expiação; navalha; vestes lavadas
        C("arao", -40, "raise", { glow: 0.3, dy: 0.5, facing: -1 }),
        C("servo", 60, "bow", { dy: 0.5, facing: -1, id: "levita" }),
        C("servo", 130, "bow", { dy: 0.46, facing: -1, id: "levita2" }),
      ] }),
      dv(8),                                                                      // tomarão um novilho para holocausto e outro para expiação
      b(9, { by: "deus", cast: [                                                  // "farás chegar os levitas perante a tenda"
        C("servo", 40, "stand", { dy: 0.5, facing: -1, id: "levita" }),
        C("multidao", 150, "stand", { dy: 0.44 }),
      ] }),
      b(10, { by: "deus", q: "porão as suas mãos sobre os levitas", cast: [       // os filhos de Israel porão as mãos sobre os levitas
        C("multidao", 140, "raise", { dy: 0.46 }),
        C("servo", 30, "kneel", { dy: 0.5, facing: -1, id: "levita" }),
      ] }),
      b(11, { by: "deus", q: "oferecerá os levitas por oferta movida", env: { glory: 0.72 }, cast: [ // Arão oferece os levitas por OFERTA MOVIDA perante o Senhor
        C("arao", -30, "raise", { glow: 0.4, dy: 0.5, facing: -1 }),
        C("servo", 60, "stand", { dy: 0.5, facing: -1, id: "levita" }),
      ] }),
      dv(12), dv(13),                                                             // as mãos sobre os novilhos; postos perante Arão
      b(14, { by: "deus", q: "para que os levitas sejam meus" }),                 // "separa os levitas: serão meus"
      dv(15), dv(16), dv(17), dv(18),
      b(19, { by: "deus", q: "para que não haja praga entre eles", env: { glory: 0.7 } }), // dados a Arão, para que não haja praga em Israel
      b(20, { q: "assim fizeram Moisés e Arão", cast: [                           // assim fizeram Moisés, Arão e toda a congregação
        C("moises", -150, "stand", { dy: 0.5, facing: 1 }),
        C("arao", -80, "stand", { glow: 0.3, dy: 0.5, facing: 1 }),
        C("servo", 60, "stand", { dy: 0.5, facing: -1, id: "levita" }),
      ] }),
      b(21, { q: "Arão os ofereceu por oferta movida", env: { glory: 0.72 }, cast: [ // os levitas purificados; Arão os oferece e faz expiação
        C("arao", -30, "raise", { glow: 0.4, dy: 0.5, facing: -1 }),
        C("servo", 60, "stand", { dy: 0.5, facing: -1, id: "levita" }),
        C("servo", 130, "stand", { dy: 0.46, facing: -1, id: "levita2" }),
      ] }),
      b(22, { cast: [                                                             // os levitas entram para o seu ministério na tenda
        C("servo", 40, "walk", { dy: 0.5, facing: 1, id: "levita" }),
        C("arao", -60, "stand", { glow: 0.25, dy: 0.5, facing: -1 }),
      ] }),
      b(23, { by: "deus", cast: [ C("moises", -160, "kneel", { dy: 0.5, facing: 1 }) ] }), // e falou o Senhor a Moisés
      b(24, { by: "deus", q: "Este é o ofício dos levitas" }),                    // "este é o ofício dos levitas: dos vinte e cinco anos para cima"
      dv(25), dv(26),                                                            // aos cinquenta saem do serviço; guardam com os irmãos
    ],
  },
};
