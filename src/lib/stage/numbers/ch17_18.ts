// ============================================================================
// NÚMEROS 17–18 — CENA VIVA. A VARA DE ARÃO QUE FLORESCE; as porções dos
// sacerdotes e levitas ("eu sou a tua parte").
//
// Nm 17 — AS DOZE VARAS diante do testemunho: uma por tribo, com o nome de cada
// príncipe; sobre a de Levi, o nome de ARÃO. Postas na tenda perante a arca, no
// dia seguinte a VARA DE ARÃO FLORESCE — brota renovos, dá FLORES e produz
// AMÊNDOAS maduras. Sinal de que Deus escolheu Levi, para cessar as murmurações.
// Depois o povo teme: "todo o que se aproximar do tabernáculo, morrerá".
//
// Nm 18 — DEVERES E PORÇÕES: Arão e os levitas guardam o santuário; as ofertas,
// as primícias e o DÍZIMO são a herança dos levitas, que não têm herança na
// terra — porque o Senhor mesmo é a sua parte: "eu sou a tua parte e a tua
// herança no meio dos filhos de Israel".
//
// A VOZ DE DEUS (regra do projeto): a ordem vem do alto (`by: "deus"`), sem
// figura, com glória sobre a tenda; no sinal da vara, a glória é ALTA (é sinal
// divino de eleição, não juízo). Arão/moisés/levitas (`arao`/`moises`/`servo`)
// e o povo (`multidao`) em cena.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });
const dv = (v: number) => b(v, { by: "deus" });

// Arraial no deserto: o tabernáculo ao centro, o altar com fogo, a arca, palmas.
const ARRAIAL: StagePropSpec[] = [
  { ...P("tent", -20, 1.5, undefined, 0.1), tag: "tabernaculo" },
  P("altar", 150, 0.95, 0.5, 0.4),
  { ...P("ark", 60, 0.7, undefined, 0.34), tag: "arca-testemunho" },
  P("palm", -310, 1.05, undefined, 0.14),
  P("grass", -60, 0.82, undefined, 0.82),
  P("grass", 70, 0.78, undefined, 0.74),
];

// AS DOZE VARAS diante do testemunho: a tenda, a arca (o testemunho) e a VARA DE
// ARÃO florida (rod, tag "vara-arao") em destaque central, diante da arca.
const VARAS: StagePropSpec[] = [
  { ...P("tent", -30, 1.5, undefined, 0.1), tag: "tabernaculo" },
  { ...P("ark", 130, 0.78, undefined, 0.3), tag: "arca-testemunho" },
  { ...P("rod", 0, 1.25, undefined, 0.5), tag: "vara-arao" },
  P("palm", -320, 1.05, undefined, 0.14),
  P("grass", -80, 0.8, undefined, 0.82),
  P("grass", 90, 0.76, undefined, 0.74),
];

// As PORÇÕES dos sacerdotes (Nm 18): o altar das ofertas e a arca no santuário.
const OFERTAS: StagePropSpec[] = [
  { ...P("tent", -40, 1.45, undefined, 0.1), tag: "tabernaculo" },
  { ...P("altar", 120, 1.0, 0.55, 0.42), tag: "altar-ofertas" },
  { ...P("ark", 40, 0.7, undefined, 0.32), tag: "arca-testemunho" },
  P("sheaf", 220, 0.85, undefined, 0.56),
  P("palm", -320, 1.05, undefined, 0.14),
  P("grass", -70, 0.8, undefined, 0.82),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Nm 17
  17: {
    start: { terrain: "desert", night: 0.1, glory: 0.66, storm: 0, fire: 0, verdure: 0.2 },
    beats: [
      b(1, { props: ARRAIAL, env: { terrain: "desert", glory: 0.68, night: 0.1, verdure: 0.2 }, cast: [ // o Senhor fala a Moisés
        C("moises", -160, "kneel", { dy: 0.5, facing: 1 }),
      ] }),
      b(2, { by: "deus", q: "doze varas; e escreverás o nome de cada um sobre a sua vara", props: VARAS, env: { terrain: "desert", glory: 0.72, night: 0.1 }, cast: [ // toma DOZE VARAS, uma por casa paterna, com o nome de cada príncipe
        C("moises", -150, "point", { dy: 0.5, facing: 1 }),
      ] }),
      b(3, { by: "deus", q: "o nome de Arão escreverás sobre a vara de Levi", cast: [ // sobre a vara de Levi, o nome de ARÃO
        C("moises", -150, "write", { dy: 0.5, facing: 1 }),
        C("arao", -60, "stand", { glow: 0.3, dy: 0.5, facing: 1 }),
      ] }),
      b(4, { by: "deus", q: "perante o testemunho, onde eu virei a vós", env: { glory: 0.76 } }), // porás as varas na tenda, perante o testemunho
      b(5, { by: "deus", q: "a vara do homem que eu tiver escolhido florescerá", env: { glory: 0.8 }, cast: [ // "a vara do homem que eu escolher FLORESCERÁ" — cessarão as murmurações
        C("moises", -160, "kneel", { dy: 0.5, facing: 1 }),
      ] }),
      b(6, { q: "a vara de Arão estava entre as deles", env: { glory: 0.72 }, cast: [ // os príncipes dão as varas; a de Arão entre elas
        C("moises", -160, "raise", { dy: 0.5, facing: 1 }),
        C("arao", -70, "stand", { glow: 0.3, dy: 0.5, facing: 1 }),
        C("multidao", 200, "stand", { dy: 0.44 }),
      ] }),
      b(7, { q: "perante o Senhor na tenda do testemunho", cast: [ // Moisés põe as varas perante o Senhor na tenda do testemunho
        C("moises", -60, "raise", { dy: 0.5, facing: -1 }),
      ] }),
      // v.8 — O ÍCONE: a VARA DE ARÃO FLORESCE diante do testemunho.
      b(8, { q: "produzira flores e brotara renovos e dera amêndoas", props: VARAS, env: { terrain: "desert", glory: 0.95, night: 0.08, verdure: 0.3 }, cast: [ // brotou renovos, deu FLORES e produziu AMÊNDOAS maduras
        C("moises", -170, "raise", { dy: 0.5, facing: 1 }),
        C("arao", -90, "stand", { glow: 0.5, dy: 0.5, facing: 1 }),
        C("multidao", 210, "bow", { dy: 0.44 }),
      ] }),
      b(9, { q: "tomaram cada um a sua vara", env: { glory: 0.78 }, cast: [ // Moisés tira as varas; cada um toma a sua
        C("moises", -60, "point", { dy: 0.5, facing: -1 }),
        C("multidao", 190, "stand", { dy: 0.44 }),
      ] }),
      b(10, { by: "deus", q: "Torna a pôr a vara de Arão perante o testemunho", env: { glory: 0.82 }, cast: [ // "torna a pôr a vara de Arão por sinal para os rebeldes"
        C("arao", -60, "stand", { glow: 0.4, dy: 0.5, facing: 1 }),
      ] }),
      b(11, { q: "como lhe ordenara o Senhor, assim fez", cast: [ // Moisés faz assim, como o Senhor ordenara
        C("moises", -60, "stand", { dy: 0.5, facing: -1 }),
      ] }),
      b(12, { by: "multidao", q: "nós expiramos, perecemos", props: ARRAIAL, env: { terrain: "desert", glory: 0.4, night: 0.2 }, cast: [ // o povo teme: "eis que perecemos, todos perecemos"
        C("multidao", 40, "bow", { dy: 0.5 }),
        C("multidao", 150, "kneel", { dy: 0.44, id: "povo2" }),
      ] }),
      b(13, { by: "homem", q: "Todo aquele que se aproximar do tabernáculo do Senhor, morrerá", env: { glory: 0.38, night: 0.22 }, cast: [ // "todo o que se aproximar do tabernáculo morrerá; seremos consumidos?"
        C("homem", 40, "bow", { dy: 0.5, id: "israelita-que-teme1" }),
        C("mulherComum", 150, "kneel", { dy: 0.44, id: "israelita-que-teme2" }),
        C("homem", 240, "bow", { dy: 0.38, scale: 0.92, id: "israelita-que-teme3" }),
      ] }),
    ],
  },

  // ------------------------------------------------------------------ Nm 18
  18: {
    start: { terrain: "desert", night: 0.1, glory: 0.64, storm: 0, fire: 0, verdure: 0.2 },
    beats: [
      b(1, { by: "deus", q: "levareis sobre vós a iniqüidade do santuário", props: OFERTAS, env: { terrain: "desert", glory: 0.66, night: 0.1, verdure: 0.2 }, cast: [ // o Senhor fala a Arão: levarás a iniquidade do santuário
        C("arao", -60, "kneel", { glow: 0.3, dy: 0.5, facing: 1 }),
      ] }),
      dv(2), dv(3), dv(4), dv(5),
      b(6, { by: "deus", q: "tenho tomado vossos irmãos, os levitas", env: { glory: 0.7 }, cast: [ // "tomei os LEVITAS, dados a vós em dádiva, para o ministério da tenda"
        C("arao", -70, "stand", { glow: 0.35, dy: 0.5, facing: 1 }),
        C("servo", 40, "stand", { dy: 0.5, facing: -1, id: "levita" }),
        C("servo", 100, "stand", { dy: 0.46, facing: -1, id: "levita2" }),
      ] }),
      dv(7),
      b(8, { by: "deus", q: "Disse mais o Senhor a Arão:", cast: [ // "dei-te a guarda das minhas ofertas alçadas"
        C("arao", -60, "stand", { glow: 0.35, dy: 0.5, facing: 1 }),
      ] }),
      dv(9), dv(10),
      b(11, { by: "deus", q: "a oferta alçada dos seus dons", cast: [ // as ofertas movidas: a porção dos sacerdotes e sua casa
        C("arao", -60, "stand", { glow: 0.3, dy: 0.5, facing: 1 }),
        C("servo", 60, "stand", { dy: 0.5, facing: -1, id: "levita" }),
      ] }),
      dv(12), dv(13), dv(14), dv(15), dv(16), dv(17), dv(18), dv(19),
      // v.20 — O CORAÇÃO DO CAPÍTULO: "eu sou a tua parte e a tua herança".
      b(20, { by: "deus", q: "eu sou a tua parte e a tua herança", env: { glory: 0.85 }, cast: [ // os levitas não têm herança na terra: o SENHOR é a sua parte
        C("arao", -50, "kneel", { glow: 0.45, dy: 0.5, facing: 1 }),
      ] }),
      b(21, { by: "deus", q: "tenho dado todos os dízimos em Israel por herança", env: { glory: 0.76 }, cast: [ // aos filhos de Levi, o DÍZIMO por herança, pelo ministério
        C("arao", -60, "stand", { glow: 0.35, dy: 0.5, facing: 1 }),
        C("servo", 50, "stand", { dy: 0.5, facing: -1, id: "levita" }),
      ] }),
      dv(22), dv(23),
      b(24, { by: "deus", q: "tenho dado por herança aos levitas", cast: [ // os dízimos, oferta alçada, dados por herança aos levitas
        C("servo", 40, "stand", { dy: 0.5, facing: -1, id: "levita" }),
        C("servo", 100, "stand", { dy: 0.46, facing: -1, id: "levita2" }),
      ] }),
      b(25, { cast: [ // o Senhor fala a Moisés
        C("moises", -160, "kneel", { dy: 0.5, facing: 1 }),
      ] }),
      dv(26), dv(27), dv(28), dv(29), dv(30), dv(31), dv(32),
    ],
  },
};
