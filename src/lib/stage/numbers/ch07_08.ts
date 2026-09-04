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
// ---------------------------------------------------------------------------
// OS DOZE DIAS DA DEDICAÇÃO (Nm 7:12-83). O texto repete DOZE VEZES a mesma
// oferta de propósito: Deus não resume o que os seus dão. Então a cena não
// repete — TROCA DE ROSTO. A cada bloco de seis versículos é outro DIA e outro
// PRÍNCIPE, com a tribo dele atrás e, versículo a versículo, o objeto que o
// texto nomeia: o prato e a bacia de PRATA cheios de flor de farinha, a COLHER
// DE OURO cheia de incenso, o novilho/carneiro/cordeiro do holocausto, o BODE
// da expiação e, por fim, o sacrifício PACÍFICO da tribo inteira.
// ---------------------------------------------------------------------------
const A_TENDA = (dx: number, scale = 1.45): StagePropSpec =>
  ({ ...P("tent", dx, scale, undefined, 0.1), tag: "tabernaculo" });
const A_ALTAR = (dx: number, fire: number): StagePropSpec =>
  ({ ...P("altar", dx, 0.95, fire, 0.5), tag: "altar-holocausto" });

// os SEIS quadros de um dia de oferta; `s` desloca o palco de dia para dia.
const PROPS_DIA = (s: number): StagePropSpec[][] => [
  // chegada do príncipe: a tenda, o altar aceso e os fardos da sua tribo
  [A_TENDA(-70 + s), A_ALTAR(70 + s, 0.5), P("crate", 240 + s, 0.85, undefined, 0.5),
   P("palm", -330, 1.05, undefined, 0.14), P("grass", -40, 0.82, undefined, 0.82)],
  // o prato e a bacia de PRATA, cheios de flor de farinha amassada com azeite
  [A_TENDA(-80 + s, 1.4), A_ALTAR(60 + s, 0.5),
   { ...P("bowl", 185 + s, 0.85, undefined, 0.56), tag: "oferta-alimentos" },
   P("amphora", 255 + s, 0.75, undefined, 0.5), P("palm", -320, 1.0, undefined, 0.14),
   P("grass", -50, 0.8, undefined, 0.8)],
  // a COLHER DE OURO de dez siclos, cheia de incenso
  [A_TENDA(-80 + s, 1.4), A_ALTAR(60 + s, 0.6),
   { ...P("censer", 200 + s, 0.9, undefined, 0.58), tag: "incenso-santo" },
   P("amphora", -250, 0.7, undefined, 0.3), P("grass", 40, 0.8, undefined, 0.82)],
  // o novilho, o carneiro e o cordeiro do HOLOCAUSTO — o fogo sobe
  [A_TENDA(-95 + s, 1.4), A_ALTAR(45 + s, 0.8), P("crate", 235 + s, 0.8, undefined, 0.52),
   P("palm", -320, 1.0, undefined, 0.14), P("grass", -20, 0.8, undefined, 0.84)],
  // o BODE da expiação do pecado, sobre o altar
  [A_TENDA(-95 + s, 1.4), A_ALTAR(45 + s, 0.9),
   { ...P("bowl", 215 + s, 0.75, undefined, 0.6), tag: "oferta-alimentos" },
   P("grass", -30, 0.82, undefined, 0.84), P("grass", 120, 0.75, undefined, 0.76)],
  // o sacrifício PACÍFICO: a oferta inteira do príncipe diante do altar
  [A_TENDA(-60 + s), A_ALTAR(85 + s, 0.65),
   { ...P("crate", 235 + s, 0.85, undefined, 0.5), tag: "ofertas-santuario" },
   P("amphora", 175 + s, 0.7, undefined, 0.56), P("well", 320, 1.0, undefined, 0.5),
   P("grass", -60, 0.82, undefined, 0.82)],
];
// o elenco dos mesmos seis quadros: o príncipe daquele dia sempre à frente.
const CAST_DIA = (id: string, dx: number): CastPlacement[][] => [
  [C("homem", dx, "walk", { dy: 0.54, facing: -1, id }),
   C("multidao", 215, "stand", { scale: 0.9, dy: 0.42 }),
   C("arao", -60, "stand", { glow: 0.28, dy: 0.5, facing: -1 })],
  [C("homem", dx, "bow", { dy: 0.54, facing: -1, id }),
   C("servo", -25, "stand", { dy: 0.5, facing: -1, id: "levita" })],
  [C("homem", dx + 30, "raise", { dy: 0.52, facing: -1, id }),
   C("arao", -55, "stand", { glow: 0.35, dy: 0.5, facing: -1 })],
  [C("rebanho", 150, "stand", { dy: 0.42, id: `gado-${id}` }),
   C("homem", dx, "point", { dy: 0.54, facing: -1, id }),
   C("arao", -55, "stand", { glow: 0.3, dy: 0.5, facing: -1 })],
  [C("homem", dx, "kneel", { dy: 0.54, facing: -1, id }),
   C("rebanho", 180, "stand", { scale: 0.85, dy: 0.4, id: `bode-${id}` }),
   C("arao", -55, "kneel", { glow: 0.3, dy: 0.5, facing: -1 })],
  [C("homem", dx, "raise", { dy: 0.54, facing: -1, id }),
   C("multidao", 205, "stand", { dy: 0.44 }),
   C("rebanho", 125, "stand", { scale: 0.8, dy: 0.38, id: `gado-${id}` })],
];
// os doze, na ordem exata em que ofereceram (Nm 7:12,18,24…78).
const PRINCIPES: Array<{ id: string; dx: number }> = [
  { id: "naassom", dx: 20 },   // 1º dia — Judá
  { id: "natanael", dx: 55 },  // 2º dia — Issacar
  { id: "eliabe", dx: -10 },   // 3º dia — Zebulom
  { id: "elizur", dx: 35 },    // 4º dia — Rúben
  { id: "selumiel", dx: 5 },   // 5º dia — Simeão
  { id: "eliasafe", dx: 60 },  // 6º dia — Gade
  { id: "elisama", dx: -20 },  // 7º dia — Efraim
  { id: "gamaliel", dx: 45 },  // 8º dia — Manassés
  { id: "abida", dx: 10 },     // 9º dia — Benjamim
  { id: "aieser", dx: 30 },    // 10º dia — Dã
  { id: "pagiel", dx: -5 },    // 11º dia — Aser
  { id: "aira", dx: 50 },      // 12º dia — Naftali
];
/** Os seis beats de um dia de oferta. `from` pula os quadros já escritos à mão. */
const diaDeOferta = (v0: number, i: number, from = 0): StageBeat[] => {
  const p = PRINCIPES[i];
  const props = PROPS_DIA((i % 3) * 18 - 18);
  const cast = CAST_DIA(p.id, p.dx);
  const g0 = 0.66 + (i % 4) * 0.02;
  const envs: StageBeat["env"][] = [
    { terrain: "desert", glory: g0, night: 0.08, fire: 0.45, verdure: 0.2 },
    { glory: g0 + 0.02, fire: 0.5 },
    { glory: g0 + 0.04, fire: 0.55 },
    { glory: g0 + 0.02, fire: 0.7 },
    { glory: g0, fire: 0.8, night: 0.1 },
    { glory: g0 + 0.06, fire: 0.55, night: 0.06 },
  ];
  const out: StageBeat[] = [];
  for (let k = from; k < 6; k++) {
    out.push(b(v0 + k, {
      ...(k === from ? { set: `dia${i + 1}` } : {}),
      props: props[k], cast: cast[k], env: envs[k],
    }));
  }
  return out;
};

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
      b(4, {}),                                                                      // e falou o Senhor a Moisés
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
      // v.13-83 — OS DOZE DIAS: cada príncipe, no seu dia, com a sua tribo e a
      // sua oferta. A cena troca de rosto e de objeto a cada versículo.
      ...diaDeOferta(12, 0, 1),   // 1º dia — Naassom, de Judá (v.13-17)
      ...diaDeOferta(18, 1),      // 2º dia — Natanael, de Issacar
      ...diaDeOferta(24, 2),      // 3º dia — Eliabe, de Zebulom
      ...diaDeOferta(30, 3),      // 4º dia — Elizur, de Rúben
      ...diaDeOferta(36, 4),      // 5º dia — Selumiel, de Simeão
      ...diaDeOferta(42, 5),      // 6º dia — Eliasafe, de Gade
      ...diaDeOferta(48, 6),      // 7º dia — Elisama, de Efraim
      ...diaDeOferta(54, 7),      // 8º dia — Gamaliel, de Manassés
      ...diaDeOferta(60, 8),      // 9º dia — Abidã, de Benjamim
      ...diaDeOferta(66, 9),      // 10º dia — Aieser, de Dã
      ...diaDeOferta(72, 10),     // 11º dia — Pagiel, de Aser
      ...diaDeOferta(78, 11),     // 12º dia — Aira, de Naftali
      b(84, { q: "Esta foi a consagração do altar", set: "totais", props: [       // o total: doze pratos, doze bacias, doze colheres
        A_TENDA(-80, 1.45), A_ALTAR(60, 0.6),
        { ...P("bowl", 150, 0.8, undefined, 0.58), tag: "oferta-alimentos" },
        { ...P("bowl", 215, 0.8, undefined, 0.56), tag: "oferta-alimentos" },
        { ...P("censer", 280, 0.8, undefined, 0.54), tag: "incenso-santo" },
        P("grass", -40, 0.82, undefined, 0.82),
      ], env: { glory: 0.74, fire: 0.55 }, cast: [
        C("arao", -40, "raise", { glow: 0.35, dy: 0.5, facing: 1 }),
        C("moises", -130, "stand", { dy: 0.5, facing: 1 }),
      ] }),
      b(85, { props: [                                                            // toda a prata dos vasos: dois mil e quatrocentos siclos
        A_TENDA(-90, 1.4), A_ALTAR(50, 0.5),
        { ...P("bowl", 160, 0.9, undefined, 0.6), tag: "oferta-alimentos" },
        P("amphora", 235, 0.8, undefined, 0.52), P("amphora", 290, 0.72, undefined, 0.46),
        P("grass", -30, 0.8, undefined, 0.84),
      ], cast: [
        C("servo", -20, "stand", { dy: 0.52, facing: -1, id: "levita" }),
        C("moises", -140, "point", { dy: 0.5, facing: 1 }),
      ] }),
      b(86, { props: [                                                            // doze colheres de OURO cheias de incenso: cento e vinte siclos
        A_TENDA(-90, 1.4), A_ALTAR(50, 0.7),
        { ...P("censer", 170, 0.95, undefined, 0.6), tag: "incenso-santo" },
        { ...P("censer", 240, 0.85, undefined, 0.52), tag: "incenso-santo" },
        P("grass", -40, 0.8, undefined, 0.82),
      ], env: { glory: 0.76, fire: 0.6 }, cast: [
        C("arao", -30, "raise", { glow: 0.4, dy: 0.5, facing: -1 }),
      ] }),
      b(87, { props: [                                                            // doze novilhos, doze carneiros, doze cordeiros e doze bodes
        A_TENDA(-100, 1.4), A_ALTAR(40, 0.85),
        P("crate", 250, 0.85, undefined, 0.5), P("palm", -330, 1.05, undefined, 0.14),
        P("grass", -20, 0.8, undefined, 0.84),
      ], env: { fire: 0.85 }, cast: [
        C("rebanho", 140, "stand", { dy: 0.42, id: "gado-holocausto" }),
        C("rebanho", 215, "stand", { scale: 0.85, dy: 0.38, id: "bodes-expiacao" }),
        C("arao", -40, "stand", { glow: 0.35, dy: 0.5, facing: -1 }),
      ] }),
      b(88, { q: "esta foi a consagração do altar, depois que foi ungido", props: [ // o total dos pacíficos: consagrado o altar
        A_TENDA(-70, 1.45), A_ALTAR(70, 0.7),
        { ...P("crate", 245, 0.85, undefined, 0.5), tag: "ofertas-santuario" },
        P("well", 320, 1.0, undefined, 0.5), P("grass", -50, 0.82, undefined, 0.82),
      ], env: { glory: 0.8, fire: 0.6 }, cast: [
        C("moises", -150, "stand", { dy: 0.5, facing: 1 }),
        C("arao", -60, "raise", { glow: 0.42, dy: 0.5, facing: 1 }),
        C("multidao", 180, "stand", { dy: 0.44 }),
      ] }),
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
      b(1, { props: CANDELABRO, env: { terrain: "desert", glory: 0.7, night: 0.1, verdure: 0.2, fire: 0.4 }, cast: [ // o Senhor fala a Moisés
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
      b(5, { cast: [ C("moises", -160, "kneel", { dy: 0.5, facing: 1 }) ] }), // e falou o Senhor a Moisés
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
      b(12, { by: "deus", q: "um para expiação do pecado, e o outro para holocausto", props: [ // os DOIS novilhos: um para a expiação, outro para o holocausto
        { ...P("tent", -230, 1.4, undefined, 0.12), tag: "tabernaculo" },
        { ...P("altar", -30, 1.0, 0.7, 0.46), tag: "altar-holocausto" },
        { ...P("altar", 130, 0.95, undefined, 0.62), tag: "altar-alianca" },
        { ...P("bowl", 250, 0.85, undefined, 0.54), tag: "ofertas-santuario" },
        P("grass", -300, 0.78, undefined, 0.88),
      ], env: { terrain: "desert", glory: 0.7, night: 0.1, fire: 0.6 }, cast: [
        C("moises", -160, "raise", { dy: 0.52, facing: -1 }),
        C("servo", 40, "kneel", { dy: 0.7, facing: 1, id: "levita" }),
        C("servo", 200, "kneel", { scale: 0.94, dy: 0.66, facing: -1, id: "levita2" }),
      ] }),
      b(13, { by: "deus", q: "porás os levitas perante Arão, e perante os seus filhos", props: ARRAIAL, env: { terrain: "desert", glory: 0.74, night: 0.1, fire: 0.3 }, cast: [ // os levitas postos DIANTE de Arão e de seus filhos
        C("arao", -190, "raise", { glow: 0.38, dy: 0.5, facing: -1 }),
        C("servo", -110, "stand", { dy: 0.54, facing: -1, id: "eleazar" }),
        C("servo", -45, "stand", { scale: 0.96, dy: 0.5, facing: -1, id: "itamar" }),
        C("servo", 90, "bow", { dy: 0.6, facing: 1, id: "levita" }),
        C("servo", 175, "bow", { scale: 0.94, dy: 0.55, facing: 1, id: "levita2" }),
      ] }),
      b(14, { by: "deus", q: "para que os levitas sejam meus", env: { glory: 0.8 }, cast: [ // SEPARADOS do meio dos filhos de Israel: "serão meus"
        C("moises", -200, "point", { dy: 0.5, facing: -1 }),
        C("servo", -60, "stand", { dy: 0.56, facing: -1, id: "levita" }),
        C("servo", 10, "stand", { scale: 0.94, dy: 0.52, facing: -1, id: "levita2" }),
        C("multidao", 230, "stand", { scale: 0.86, dy: 0.42 }),
      ] }),
      b(15, { by: "deus", q: "os levitas entrarão para fazerem o serviço da tenda da congregação", env: { glory: 0.72 }, cast: [ // entram, enfim, para o serviço da tenda
        C("servo", -100, "walk", { dy: 0.54, facing: 1, id: "levita" }),
        C("servo", -20, "walk", { scale: 0.94, dy: 0.5, facing: 1, id: "levita2" }),
        C("arao", 120, "stand", { glow: 0.3, dy: 0.5, facing: -1 }),
      ] }),
      b(16, { by: "deus", q: "em lugar de todo aquele que abre a madre", props: [  // dados em lugar de todo o que ABRE A MADRE em Israel
        { ...P("tent", -60, 1.45, undefined, 0.1), tag: "tabernaculo" },
        { ...P("stall", 130, 0.95, undefined, 0.5), tag: "curral-primogenitos" },
        P("crate", 245, 0.8, undefined, 0.58),
        P("well", 320, 1.0, undefined, 0.44),
        P("palm", -320, 1.05, undefined, 0.14),
        P("grass", -40, 0.8, undefined, 0.86),
      ], env: { terrain: "desert", glory: 0.66, night: 0.12, fire: 0 }, cast: [
        C("servo", 30, "stand", { dy: 0.62, facing: -1, id: "levita" }),
        C("multidao", 230, "stand", { scale: 0.88, dy: 0.44 }),
      ] }),
      b(17, { by: "deus", q: "no dia em que, na terra do Egito, feri a todo o primogênito", props: [ // a NOITE do Egito, quando o SENHOR feriu todo primogênito
        { ...P("tower", -180, 1.2, undefined, 0.2), tag: "egito" },
        { ...P("door", 60, 1.05, undefined, 0.46), tag: "porta-sangue" },
        P("column", 200, 0.95, undefined, 0.36),
        P("column", 290, 0.9, undefined, 0.3),
        P("grass", -300, 0.7, undefined, 0.9),
      ], env: { terrain: "city", glory: 0.24, night: 0.85, storm: 0.3, fire: 0 }, cast: [
        C("servo", 130, "lie", { scale: 1.35, dy: 0.72, facing: 1, id: "primogenito-do-egito" }),
      ] }),
      b(18, { by: "deus", q: "tomei os levitas em lugar de todo o primogênito", props: ARRAIAL, env: { terrain: "desert", glory: 0.78, night: 0.1, storm: 0, fire: 0.3 }, cast: [ // e, no lugar deles, o SENHOR tomou os levitas
        C("servo", -30, "stand", { dy: 0.54, facing: -1, id: "levita" }),
        C("servo", 45, "stand", { scale: 0.94, dy: 0.5, facing: -1, id: "levita2" }),
        C("arao", -170, "stand", { glow: 0.3, dy: 0.5, facing: -1 }),
      ] }),
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
      b(23, { cast: [ C("moises", -160, "kneel", { dy: 0.5, facing: 1 }) ] }), // e falou o Senhor a Moisés
      b(24, { by: "deus", q: "Este é o ofício dos levitas" }),                    // "este é o ofício dos levitas: dos vinte e cinco anos para cima"
      dv(25), dv(26),                                                            // aos cinquenta saem do serviço; guardam com os irmãos
    ],
  },
};
