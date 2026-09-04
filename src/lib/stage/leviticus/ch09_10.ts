// ============================================================================
// LEVÍTICO 9–10 — CENA VIVA. O fogo que desce do céu; o fogo estranho.
//
// Lev 9 — O DIA OITAVO: cumpridos os sete dias, Arão ministra pela primeira vez
// — expiação por si e pelo povo, holocausto, oferta de alimentos e pacífico.
// Depois ergue as mãos e abençoa o povo; entram Moisés e Arão na tenda, saem, e
// A GLÓRIA DO SENHOR aparece a todo o povo — e O FOGO SAI DE DIANTE DO SENHOR e
// consome o holocausto sobre o altar. O povo vê, JUBILA e cai sobre as faces.
//
// Lev 10 — O FOGO ESTRANHO: Nadabe e Abiú, filhos de Arão, oferecem "fogo
// estranho, o que não lhes ordenara" — e o mesmo fogo santo que consumira a
// oferta os consome a eles. "Serei santificado naqueles que se chegarem a mim."
// Arão CALA-SE. O luto é contido, o vinho proibido ao sacerdote em serviço, e a
// diferença entre o santo e o profano fica gravada em sangue.
//
// A VOZ DE DEUS: em 9 o fogo e a glória são PURA LUZ, sem figura; Moisés e Arão
// falam em cena (mediadores visíveis). Em 10, o fogo do juízo também é luz —
// nada de figura —, e Nadabe e Abiú simplesmente SAEM de cena (morrem).
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });

const ATRIO: StagePropSpec[] = [
  { ...P("tent", -30, 1.45, undefined, 0.08), tag: "tabernaculo" },
  { ...P("altar", 70, 1.25, 0.75, 0.44), tag: "altar-holocausto" },
  { ...P("bowl", 158, 0.85, undefined, 0.56), tag: "pia-cobre" },
  P("tower", -300, 1.15, undefined, 0.06),
  P("palm", -250, 1.0, undefined, 0.16),
  P("amphora", 210, 0.85, undefined, 0.64),
  P("crate", -140, 0.8, undefined, 0.62),
  P("rock", 306, 0.95, undefined, 0.5),
  P("grass", -60, 0.8, undefined, 0.82),
];
// O FOGO QUE DESCE (Lev 9:24): a glória e o fogo do Senhor consumindo a oferta
// sobre o altar — chamas altas, nuvem de glória, o altar ardendo em luz.
const ATRIO_FOGO_CEU: StagePropSpec[] = [
  { kind: "clouds", dx: 40, dy: 0.62, scale: 1.7, sky: true },
  { ...P("tent", -30, 1.45, undefined, 0.08), tag: "tabernaculo" },
  { ...P("altar", 70, 1.35, 1, 0.44), tag: "altar-holocausto" },
  P("campfire", 70, 2.0, 1, 0.42),
  P("campfire", 48, 1.5, 1, 0.5),
  P("campfire", 94, 1.5, 1, 0.5),
  { ...P("bowl", 158, 0.85, undefined, 0.56), tag: "pia-cobre" },
  P("tower", -300, 1.15, undefined, 0.06),
  P("palm", -250, 1.0, undefined, 0.16),
  P("grass", -60, 0.8, undefined, 0.82),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Lev 9
  // Arco de env: o dia oitavo em glória crescente (0.7 → 0.85) até o clímax:
  // a glória aparece (v.23, glory 0.95) e o FOGO desce (v.24, glory 1, fire 1).
  9: {
    start: { terrain: "desert", night: 0.08, glory: 0.72, storm: 0, fire: 0.6, verdure: 0.15 },
    beats: [
      b(1, { by: "moises", q: "ao dia oitavo", props: ATRIO, env: { terrain: "desert", glory: 0.74, fire: 0.6, night: 0.08 }, cast: [ // ao dia oitavo, Moisés chama Arão, seus filhos e os anciãos
        C("moises", -140, "point", { dy: 0.5, facing: 1 }),
        C("arao", -30, "stand", { glow: 0.4, dy: 0.52, facing: 1 }),
        C("anciao", 120, "stand", { dy: 0.44 }),
      ] }),
      b(2, { by: "moises", q: "E disse a Arão:", cast: [                                                 // "Toma um bezerro para expiação e um carneiro para holocausto"
        C("moises", -80, "point", { dy: 0.5, facing: 1 }),
        C("arao", -20, "stand", { glow: 0.4, dy: 0.52, facing: -1 }),
        C("rebanho", 150, "stand", { dy: 0.4, id: "bezerro" }),
      ] }),
      b(3, { by: "moises", cast: [                                                 // "Tomai um bode e um cordeiro sem defeito para holocausto"
        C("moises", -80, "point", { dy: 0.5, facing: 1 }),
        C("multidao", 130, "stand", { dy: 0.44 }),
        C("cordeiro", 190, "stand", { dy: 0.38, scale: 0.7, id: "bode" }),
      ] }),
      b(4, { by: "moises", q: "hoje o Senhor vos aparecerá", env: { glory: 0.8 }, cast: [ // "hoje o Senhor vos aparecerá"
        C("moises", -90, "raise", { dy: 0.5, facing: 1 }),
        C("multidao", 130, "stand", { dy: 0.44 }),
      ] }),
      b(5, { env: { glory: 0.82 }, cast: [                                         // trazem o ordenado; a congregação se põe perante o Senhor
        C("moises", -100, "stand", { dy: 0.5, facing: 1 }),
        C("arao", -30, "stand", { glow: 0.4, dy: 0.52, facing: 1 }),
        C("multidao", 120, "stand", { dy: 0.44 }),
        C("multidao", 210, "stand", { scale: 0.9, dy: 0.4, id: "povo2" }),
      ] }),
      b(6, { by: "moises", q: "a glória do Senhor vos aparecerá", env: { glory: 0.85 }, cast: [ // "a glória do Senhor vos aparecerá"
        C("moises", -100, "raise", { dy: 0.5, facing: 1 }),
        C("multidao", 130, "stand", { dy: 0.44 }),
      ] }),
      b(7, { by: "moises", q: "Chega-te ao altar", cast: [                         // "Chega-te ao altar; faze expiação por ti e pelo povo"
        C("moises", -60, "point", { dy: 0.5, facing: 1 }),
        C("arao", 10, "walk", { glow: 0.45, dy: 0.52, facing: -1 }),
      ] }),
      b(8, { cast: [                                                               // Arão se chega ao altar e degola o bezerro por si
        C("arao", 44, "kneel", { glow: 0.45, dy: 0.5, facing: -1 }),
        C("rebanho", 150, "stand", { dy: 0.4, id: "bezerro" }),
      ] }),
      b(9, { env: { fire: 0.65 }, cast: [                                          // os filhos trazem o sangue; posto nas pontas do altar
        C("arao", 46, "kneel", { glow: 0.45, dy: 0.5, facing: -1 }),
        C("servo", 110, "stand", { dy: 0.48, facing: -1, id: "filho1" }),
      ] }),
      b(10, { env: { fire: 0.75 }, cast: [ C("arao", 46, "raise", { glow: 0.45, dy: 0.5, facing: -1 }) ] }), // a gordura e os rins queimados sobre o altar
      b(11, { set: "fora", props: [P("campfire", 10, 1.6, 1, 0.5), P("rock", -260, 1, undefined, 0.44), P("palm", -180, 0.9, undefined, 0.16)], env: { terrain: "desert", night: 0.36, glory: 0.4, fire: 0.8 }, cast: [ // a carne e o couro queimados fora do arraial
        C("arao", -30, "stand", { glow: 0.4, dy: 0.5, facing: 1 }),
      ] }),
      b(12, { set: "atrio", props: ATRIO, env: { terrain: "desert", night: 0.08, glory: 0.82, fire: 0.7 }, cast: [ // degola o holocausto; o sangue aspergido sobre o altar
        C("arao", 46, "kneel", { glow: 0.45, dy: 0.5, facing: -1 }),
        C("servo", 110, "stand", { dy: 0.48, facing: -1, id: "filho1" }),
      ] }),
      b(13, { env: { fire: 0.78 }, cast: [ C("arao", 46, "raise", { glow: 0.45, dy: 0.5, facing: -1 }) ] }), // o holocausto em pedaços, com a cabeça, queimado
      b(14, { env: { fire: 0.82 } }),                                              // a fressura e as pernas lavadas e queimadas
      b(15, { cast: [                                                              // a oferta do povo: o bode da expiação, preparado
        C("arao", 44, "kneel", { glow: 0.45, dy: 0.5, facing: -1 }),
        C("cordeiro", 150, "stand", { dy: 0.4, scale: 0.7, id: "bode" }),
        C("multidao", 210, "stand", { scale: 0.9, dy: 0.4, id: "povo2" }),
      ] }),
      b(16, { env: { fire: 0.75 } }),                                              // o holocausto oferecido segundo o rito
      b(17, { props: [...ATRIO, { ...P("sheaf", -108, 0.95, undefined, 0.52), tag: "oferta-alimentos" }], env: { fire: 0.72 }, cast: [ // a oferta de alimentos queimada, além do holocausto da manhã
        C("arao", 46, "raise", { glow: 0.45, dy: 0.5, facing: -1 }),
      ] }),
      b(18, { props: ATRIO, cast: [                                               // o boi e o carneiro do pacífico pelo povo
        C("arao", 44, "kneel", { glow: 0.45, dy: 0.5, facing: -1 }),
        C("rebanho", 160, "stand", { dy: 0.4, id: "boi" }),
        C("servo", 110, "stand", { dy: 0.48, facing: -1, id: "filho1" }),
      ] }),
      b(19, { env: { fire: 0.7 } }),                                              // a gordura, a cauda, os rins e o redenho
      b(20, { env: { fire: 0.8 }, cast: [ C("arao", 46, "raise", { glow: 0.45, dy: 0.5, facing: -1 }) ] }), // a gordura sobre os peitos, queimada sobre o altar
      b(21, { q: "por oferta movida perante o Senhor", cast: [                     // os peitos e a espádua: oferta movida perante o Senhor
        C("arao", 40, "raise", { glow: 0.45, dy: 0.5, facing: -1 }),
      ] }),
      b(22, { q: "levantou as suas mãos ao povo e o abençoou", env: { glory: 0.88 }, cast: [ // Arão LEVANTA as mãos e ABENÇOA o povo, e desce
        C("arao", -20, "raise", { glow: 0.55, dy: 0.5, facing: 1 }),
        C("multidao", 130, "bow", { dy: 0.44 }),
        C("multidao", 220, "bow", { scale: 0.9, dy: 0.4, id: "povo2" }),
      ] }),
      b(23, { q: "a glória do Senhor apareceu a todo o povo", env: { glory: 0.95, fire: 0.8 }, cast: [ // Moisés e Arão saem da tenda; a GLÓRIA aparece a todo o povo
        C("moises", -60, "raise", { dy: 0.5, facing: 1 }),
        C("arao", 0, "raise", { glow: 0.6, dy: 0.5, facing: 1 }),
        C("multidao", 140, "bow", { dy: 0.44 }),
      ] }),
      b(24, { q: "o fogo saiu de diante do Senhor", set: "fogoCeu", props: ATRIO_FOGO_CEU, env: { terrain: "desert", glory: 1, fire: 1, night: 0.04 }, cast: [ // o FOGO sai de diante do Senhor e consome o holocausto; o povo cai
        C("arao", -40, "bow", { glow: 0.6, dy: 0.5, facing: 1 }),
        C("moises", -110, "bow", { dy: 0.5, facing: 1 }),
        C("multidao", 150, "bow", { dy: 0.46 }),
        C("multidao", 240, "bow", { scale: 0.9, dy: 0.42, id: "povo2" }),
      ] }),
    ],
  },

  // ------------------------------------------------------------------ Lev 10
  // O FOGO ESTRANHO e a santidade de Deus. Arco de env: o mesmo fogo santo,
  // mas agora de JUÍZO (storm sobe, night sobe no luto) → o silêncio de Arão →
  // e a sobriedade da instrução (glória serena).
  10: {
    start: { terrain: "desert", night: 0.1, glory: 0.7, storm: 0, fire: 0.7, verdure: 0.15 },
    beats: [
      b(1, { q: "ofereceram fogo estranho perante o", props: [...ATRIO, P("censer", 20, 0.9, 0.7, 0.56), P("censer", 64, 0.85, 0.7, 0.58)], env: { terrain: "desert", glory: 0.5, fire: 0.7, night: 0.12, storm: 0.15 }, cast: [ // Nadabe e Abiú oferecem FOGO ESTRANHO, o que não lhes fora ordenado
        C("servo", 20, "raise", { dy: 0.52, facing: -1, id: "nadabe" }),
        C("servo", 66, "raise", { dy: 0.5, facing: -1, id: "abiu" }),
        C("arao", -60, "stand", { glow: 0.45, dy: 0.52, facing: 1 }),
      ] }),
      b(2, { q: "saiu fogo de diante do Senhor e os consumiu", props: [...ATRIO, P("campfire", 22, 2.2, 1, 0.54), P("campfire", 64, 2.0, 1, 0.56), P("campfire", 44, 1.6, 1, 0.5)], env: { terrain: "desert", glory: 0.35, fire: 1, storm: 0.55, night: 0.45 }, cast: [ // SAIU FOGO de diante do Senhor e os consumiu; morreram
        C("arao", -70, "bow", { dy: 0.52, facing: 1 }),
        C("moises", -140, "stand", { dy: 0.5, facing: 1 }),
      ] }),
      b(3, { by: "moises", q: "Serei santificado", env: { glory: 0.8, storm: 0.2, fire: 0.6, night: 0.24 }, cast: [ // Moisés: "Serei santificado…"; Arão CALOU-SE
        C("moises", -60, "raise", { dy: 0.5, facing: 1 }),
        C("arao", 20, "bow", { dy: 0.52, facing: 1 }),
      ] }),
      b(4, { by: "moises", q: "para fora do arraial", env: { storm: 0.15 }, cast: [ // Moisés chama Misael e Elzafã: "Levai vossos irmãos para fora"
        C("moises", -60, "point", { dy: 0.5, facing: 1 }),
        C("homem", 30, "stand", { dy: 0.52, facing: -1, id: "misael" }),
        C("homem", 80, "stand", { dy: 0.5, facing: -1, id: "elzafa" }),
      ] }),
      b(5, { env: { night: 0.3, storm: 0.1, glory: 0.5 }, cast: [                  // levam-nos nas túnicas para fora do arraial
        C("homem", -40, "walk", { dy: 0.52, facing: 1, id: "misael" }),
        C("homem", 20, "walk", { dy: 0.5, facing: 1, id: "elzafa" }),
        C("arao", -110, "bow", { dy: 0.52, facing: 1 }),
      ] }),
      b(6, { by: "moises", q: "para que não morrais", env: { night: 0.26, glory: 0.55 }, cast: [ // "Não descobrireis as cabeças nem rasgareis as vestes"
        C("moises", -60, "point", { dy: 0.5, facing: 1 }),
        C("arao", 10, "stand", { glow: 0.4, dy: 0.52, facing: 1 }),
        C("servo", 60, "stand", { dy: 0.5, facing: 1, id: "eleazar" }),
        C("servo", 104, "stand", { dy: 0.48, facing: 1, id: "itamar" }),
      ] }),
      b(7, { by: "moises", q: "o azeite da unção do Senhor" }),                     // "não saireis da porta; está sobre vós o azeite da unção"
      b(8, { env: { glory: 0.7, storm: 0, night: 0.16 }, cast: [       // e falou o Senhor a ARÃO
        C("arao", 0, "kneel", { glow: 0.4, dy: 0.52, facing: 1 }),
      ] }),
      b(9, { by: "deus", q: "Não bebereis vinho nem bebida forte" }),              // "Não bebereis vinho nem bebida forte ao entrar na tenda"
      b(10, { by: "deus", q: "entre o santo e o profano", env: { glory: 0.78 } }), // "para fazer diferença entre o santo e o profano"
      b(11, { by: "deus", q: "por meio de Moisés" }),                              // "e para ensinar aos filhos de Israel os estatutos"
      b(12, { by: "moises", q: "coisa santíssima", set: "atrio", props: ATRIO, env: { terrain: "desert", glory: 0.65, fire: 0.6, night: 0.12 }, cast: [ // Moisés: "Tomai a oferta e comei-a junto ao altar; santíssima"
        C("moises", -60, "point", { dy: 0.5, facing: 1 }),
        C("arao", 10, "stand", { glow: 0.4, dy: 0.52, facing: 1 }),
        C("servo", 60, "stand", { dy: 0.5, facing: 1, id: "eleazar" }),
        C("servo", 104, "stand", { dy: 0.48, facing: 1, id: "itamar" }),
      ] }),
      b(13, { by: "moises" }),                                                     // "comê-la-eis no lugar santo; é a vossa porção"
      b(14, { by: "moises" }),                                                     // o peito movido e a espádua, comidos em lugar limpo
      b(15, { by: "moises", q: "por estatuto perpétuo" }),                         // trazidos por oferta movida, por estatuto perpétuo
      b(16, { q: "indignou-se grandemente", env: { storm: 0.12 }, cast: [          // Moisés busca o bode e, achando-o queimado, INDIGNA-SE
        C("moises", -50, "point", { dy: 0.5, facing: 1 }),
        C("servo", 20, "bow", { dy: 0.5, facing: 1, id: "eleazar" }),
        C("servo", 70, "bow", { dy: 0.48, facing: 1, id: "itamar" }),
      ] }),
      b(17, { by: "moises", q: "coisa santíssima" }),                              // "Por que não comestes a expiação no lugar santo?"
      b(18, { by: "moises" }),                                                     // "devíeis ter comido no santuário, como ordenei"
      b(19, { by: "arao", q: "aos olhos do Senhor", env: { glory: 0.6 }, cast: [   // Arão responde: "tais coisas me sucederam hoje…"
        C("arao", -20, "stand", { glow: 0.4, dy: 0.52, facing: 1 }),
        C("moises", -90, "stand", { dy: 0.5, facing: 1 }),
      ] }),
      b(20, { env: { glory: 0.72, night: 0.1 }, cast: [                            // Moisés, ouvindo, deu-se por satisfeito
        C("moises", -40, "stand", { dy: 0.5, facing: 1 }),
        C("arao", 20, "stand", { glow: 0.42, dy: 0.52, facing: 1 }),
      ] }),
    ],
  },
};
