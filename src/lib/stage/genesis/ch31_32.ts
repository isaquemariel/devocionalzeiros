// ============================================================================
// GÊNESIS 31–32 — roteiro do modo CENA VIVA (força-tarefa AT, onda 2).
//
// Gn 31 — A FUGA DE PADÃ-ARÃ: um THRILLER em cinco movimentos. (1) O clima
// vira: os filhos de Labão murmuram, o rosto do sogro esfria e o SENHOR manda
// voltar (glória súbita, 0.5 — Deus nunca é desenhado). (2) O CONCÍLIO NO
// CAMPO: Jacó chama Raquel e Lia para longe das tendas, junto ao rebanho, e
// despeja vinte anos de salário mudado dez vezes; elas respondem cortando o
// laço com a casa do pai. (3) A FUGA: a caravana atravessa o rio rumo a
// Gileade — e Raquel FURTA os ídolos (a bomba-relógio do capítulo). (4) A
// CAÇADA: sete dias de perseguição, o aviso de Deus em sonho na noite mais
// fechada (night 0.7), a confrontação e a BUSCA NAS TENDAS — Raquel sentada
// sobre os ídolos, a tensão máxima com a cena quase parada. (5) A EXPLOSÃO
// de Jacó (storm 0.4: "de dia o calor, de noite a geada") e o MONTE DE PEDRAS
// de Mispá — coluna, montão, sacrifício e a despedida com beijos ao amanhecer.
//
// Gn 32 — JABOQUE: os anjos de Deus o encontram (Maanaim, "arraial de Deus"),
// os mensageiros voltam com a notícia terrível — Esaú vem, e quatrocentos
// homens com ele. O medo divide o campo em dois bandos, a oração ajoelha o
// patriarca ("menor sou eu que todas as beneficências"), o presente atravessa
// em ONDAS, e então a noite se fecha (night 0.9) sobre o vau de Jaboque:
// Jacó FICOU SÓ. A luta até o romper do dia, a coxa deslocada, o nome novo —
// ISRAEL — e Peniel ao amanhecer, com o herói MANQUEJANDO.
//
// DEUS NUNCA É DESENHADO: o SENHOR que fala (31:3), que vem a Labão em sonhos
// (31:24) e que responde a oração é GLÓRIA no ambiente + narração pura, sem
// `by`. O "Varão" de Jaboque é o único vulto permitido — um `anjo` de brilho
// crescente, que ao fim some deixando só a luz.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });

// ---------------------------------------------------------------------------
// HARÃ — a casa de Labão em Padã-Arã: tendas grandes, o poço, a barraca da
// tosquia e os fardos da fazenda. É a prisão dourada de vinte anos.
// (corredor de extras dx -100..-190 LIVRE, como manda o padrão de palco)
const HARA: StagePropSpec[] = [
  P("tent", 200, 1.3, undefined, 0.12),      // a tenda de Labão
  P("tent", 280, 1.0, undefined, 0.34),      // as tendas da casa
  P("well", 320, 1, undefined, 0.16),        // o poço de Harã
  P("stall", -300, 0.95, undefined, 0.22),   // a barraca da tosquia
  P("amphora", 230, 0.85, undefined, 0.58),
  P("crate", -258, 0.9, undefined, 0.5),
  P("crate", -292, 0.8, undefined, 0.66),
  P("rock", 40, 0.55, undefined, 0.26),
  P("rock", 300, 0.8, undefined, 0.74),
  P("bush", -324, 0.9, undefined, 0.38),
  P("bush", 140, 0.85, undefined, 0.66),
  P("tree", -60, 1.1, undefined, 0.06),
  P("tree", 90, 0.95, undefined, 0.04),
  P("grass", -250, 1, undefined, 0.82),
  P("grass", 20, 1, undefined, 0.84),
  P("grass", 210, 0.95, undefined, 0.78),
];

// ---------------------------------------------------------------------------
// O CAMPO, junto ao rebanho (31:4) — Jacó leva as mulheres para LONGE das
// tendas para poder falar. Pasto aberto, sem paredes, sem ouvidos de Labão.
const CAMPO: StagePropSpec[] = [
  P("tree", -300, 1.2, undefined, 0.08),
  P("tree", 160, 1.1, undefined, 0.1),
  P("tree", 250, 0.95, undefined, 0.42),
  P("bush", -70, 0.9, undefined, 0.34),
  P("bush", 210, 0.85, undefined, 0.7),
  P("rock", -240, 0.9, undefined, 0.55),
  P("rock", 60, 0.55, undefined, 0.24),
  P("rock", 312, 0.95, undefined, 0.3),
  P("well", 296, 1, undefined, 0.68),        // o bebedouro do rebanho
  P("amphora", 190, 0.8, undefined, 0.54),
  P("grass", -262, 1, undefined, 0.8),
  P("grass", -20, 1.05, undefined, 0.86),
  P("grass", 120, 1, undefined, 0.74),
];

// ---------------------------------------------------------------------------
// A FUGA (31:17-21) — estrada aberta, o RIO atravessado e a serra de Gileade
// no horizonte. Os fardos da casa inteira viajam no lombo dos camelos.
const FUGA: StagePropSpec[] = [
  P("river", 0, 1.2, undefined, 0.16),       // "passou o rio"
  P("rock", -250, 1.0, undefined, 0.28),
  P("rock", 200, 0.9, undefined, 0.34),
  P("rock", 300, 1.15, undefined, 0.6),
  P("bush", -300, 0.9, undefined, 0.48),
  P("bush", 120, 0.85, undefined, 0.66),
  P("tree", 70, 1.0, undefined, 0.05),
  P("crate", -56, 0.75, undefined, 0.52),    // os bens adquiridos em Padã-Arã
  P("grass", -220, 1, undefined, 0.8),
  P("grass", 30, 0.95, undefined, 0.86),
  P("grass", 250, 1, undefined, 0.74),
];
// os ÍDOLOS furtados, escondidos no fardo (entra no corredor de extras)
const FUGA_IDOLOS: StagePropSpec[] = [...FUGA, P("crate", -140, 0.9, undefined, 0.24)];

// ---------------------------------------------------------------------------
// A SERRA DE GILEADE (31:22-24) — a caçada: pedra nua, mato ralo, nenhum
// abrigo. Sete dias de estrada comprimidos em três versículos.
const SERRA: StagePropSpec[] = [
  P("rock", -270, 1.05, undefined, 0.2),
  P("rock", -30, 0.6, undefined, 0.5),
  P("rock", 180, 0.95, undefined, 0.3),
  P("rock", 300, 1.2, undefined, 0.62),
  P("bush", -310, 0.9, undefined, 0.44),
  P("bush", 90, 0.85, undefined, 0.7),
  P("tree", 60, 1.0, undefined, 0.04),
  P("grass", -230, 1, undefined, 0.82),
  P("grass", 20, 0.95, undefined, 0.88),
  P("grass", 240, 1, undefined, 0.76),
];
// a NOITE do sonho de Labão: o céu frio sobre o perseguidor
const SERRA_NOITE: StagePropSpec[] = [
  ...SERRA,
  { kind: "starfield", dx: -20, dy: 0.8, scale: 1.25, sky: true },
  { kind: "starfield", dx: 180, dy: 0.66, scale: 1.0, sky: true },
];

// ---------------------------------------------------------------------------
// OS DOIS ARRAIAIS EM GILEADE (31:25) — as tendas de Jacó de um lado, as de
// Labão e seus irmãos do outro, o fogo no meio. Palco de julgamento.
const GILEADE: StagePropSpec[] = [
  P("tent", -240, 1.25, undefined, 0.16),    // a tenda de Jacó
  P("tent", -300, 1.0, undefined, 0.4),      // a tenda de Lia e das servas
  P("tent", 200, 1.2, undefined, 0.14),      // a tenda de Labão
  P("tent", 280, 0.95, undefined, 0.38),     // as tendas dos seus irmãos
  P("campfire", 60, 1, 1, 0.6),
  P("rock", -20, 0.6, undefined, 0.28),
  P("rock", 300, 0.9, undefined, 0.72),
  P("bush", 130, 0.85, undefined, 0.66),
  P("bush", -326, 0.85, undefined, 0.68),
  P("tree", 90, 1.05, undefined, 0.04),
  P("amphora", 240, 0.8, undefined, 0.56),
  P("crate", -280, 0.9, undefined, 0.58),
  P("grass", -258, 1, undefined, 0.84),
  P("grass", 24, 1, undefined, 0.86),
  P("grass", 240, 0.95, undefined, 0.8),
];
// A BUSCA (31:34): a albarda do camelo em que Raquel escondeu os ídolos —
// destacada no corredor de extras, o objeto que decide a cena.
const GILEADE_BUSCA: StagePropSpec[] = [...GILEADE, P("crate", -140, 0.95, undefined, 0.28)];
// A COLUNA (31:45): "tomou Jacó uma pedra, e erigiu-a por coluna"
const GALEEDE_COLUNA: StagePropSpec[] = [...GILEADE, { ...P("rock", -140, 1.2, undefined, 0.26), tag: "mizpa" }];
// O MONTÃO (31:46): "Ajuntai pedras… e fizeram um montão"
const GALEEDE_MONTAO: StagePropSpec[] = [
  ...GALEEDE_COLUNA,
  P("rock", -104, 0.8, undefined, 0.44),
  P("rock", -172, 0.85, undefined, 0.38),
  P("rock", -196, 0.7, undefined, 0.14),
];
// O SACRIFÍCIO na montanha (31:54) — o altar aceso junto ao montão
const GALEEDE_ALTAR: StagePropSpec[] = [
  ...GALEEDE_MONTAO,
  P("altar", -62, 1.05, 1, 0.2),
  { kind: "starfield", dx: -20, dy: 0.8, scale: 1.25, sky: true },
  { kind: "starfield", dx: 180, dy: 0.66, scale: 1.0, sky: true },
];

// ---------------------------------------------------------------------------
// MAANAIM (32:1-2) — a subida onde "os anjos de Deus" o encontram. O corredor
// de extras fica VAZIO de propriedade: é por ali que o exército celeste entra.
const MAANAIM: StagePropSpec[] = [
  P("rock", -250, 1.0, undefined, 0.24),
  P("rock", 210, 0.9, undefined, 0.32),
  P("rock", 310, 1.1, undefined, 0.6),
  P("bush", -300, 0.9, undefined, 0.46),
  P("bush", 110, 0.85, undefined, 0.68),
  P("tree", -60, 1.1, undefined, 0.08),
  P("tree", 66, 1.0, undefined, 0.04),
  P("grass", -230, 1, undefined, 0.82),
  P("grass", 20, 0.95, undefined, 0.88),
  P("grass", 250, 1, undefined, 0.76),
];

// ---------------------------------------------------------------------------
// O ARRAIAL antes de Jaboque (32:3-21) — o acampamento da caravana: tendas,
// fogo, talhas e os fardos do presente sendo separados leva a leva.
const ARRAIAL: StagePropSpec[] = [
  P("tent", 200, 1.25, undefined, 0.14),
  P("tent", 280, 1.0, undefined, 0.36),
  P("campfire", 56, 1, 1, 0.6),
  P("amphora", 230, 0.85, undefined, 0.56),
  P("crate", -280, 0.9, undefined, 0.5),
  P("rock", -240, 0.85, undefined, 0.68),
  P("rock", 30, 0.55, undefined, 0.26),
  P("rock", 310, 0.9, undefined, 0.74),
  P("bush", -312, 0.9, undefined, 0.34),
  P("bush", 140, 0.85, undefined, 0.68),
  P("tree", -60, 1.1, undefined, 0.06),
  P("tree", 92, 0.95, undefined, 0.04),
  P("grass", -256, 1, undefined, 0.82),
  P("grass", 20, 1, undefined, 0.86),
  P("grass", 200, 0.95, undefined, 0.78),
];
// a noite no arraial (32:13, 32:21) — o céu sobre o homem que não dorme
const ARRAIAL_NOITE: StagePropSpec[] = [
  ...ARRAIAL,
  { kind: "starfield", dx: -20, dy: 0.8, scale: 1.25, sky: true },
  { kind: "starfield", dx: 180, dy: 0.66, scale: 1.0, sky: true },
];

// ---------------------------------------------------------------------------
// O VAU DE JABOQUE (32:22-32) — o ribeiro cortando o palco, barranco de pedra,
// noite fechada. Depois que todos passam, o cenário fica com UM homem só.
const JABOQUE: StagePropSpec[] = [
  P("river", 0, 1.25, undefined, 0.18),      // o vau de Jaboque
  P("rock", -250, 1.0, undefined, 0.3),
  P("rock", 220, 0.95, undefined, 0.36),
  P("rock", 300, 1.15, undefined, 0.64),
  P("bush", -300, 0.9, undefined, 0.5),
  P("bush", 130, 0.85, undefined, 0.7),
  P("tree", -58, 1.15, undefined, 0.06),
  P("tree", 80, 1.0, undefined, 0.04),
  P("grass", -220, 1, undefined, 0.82),
  P("grass", 40, 0.95, undefined, 0.88),
  P("grass", 250, 1, undefined, 0.76),
];
// a noite da luta: só as estrelas assistem
const JABOQUE_NOITE: StagePropSpec[] = [
  ...JABOQUE,
  { kind: "starfield", dx: -20, dy: 0.8, scale: 1.25, sky: true },
  { kind: "starfield", dx: 180, dy: 0.66, scale: 1.0, sky: true },
];
// PENIEL (32:31): "E saiu-lhe o sol, quando passou a Peniel"
const PENIEL_ALVA: StagePropSpec[] = [...JABOQUE, P("star", -140, 1.25, undefined, 0.1)];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Gn 31
  // A FUGA DE PADÃ-ARÃ. Arco de env: manhã fria da suspeita (night 0.25) →
  // a ORDEM do SENHOR (glory 0.5) → o concílio no campo (glory 0.3) → a fuga
  // ao cair da tarde (night 0.3, storm 0.1) → a caçada (storm 0.3) e a NOITE
  // do sonho de Labão (night 0.7) → o interrogatório (storm 0.25) → a
  // EXPLOSÃO de Jacó (storm 0.4) → o pacto de Mispá (storm 0, glory 0.6) →
  // o sacrifício na noite da montanha (night 0.6) → a despedida na madrugada.
  31: {
    start: { terrain: "field", night: 0.18, glory: 0.1, storm: 0 },
    beats: [
      // ---- ATO 1: o clima vira em Harã
      b(1, { by: "homem", q: "que diziam: ", props: HARA, cast: [
        C("jaco", -46, "stand", { dy: 0.56, facing: 1 }),
        C("homem", 40, "point", { dy: 0.5, facing: -1, id: "filhoA" }),
        C("homem", 96, "stand", { dy: 0.46, facing: -1, id: "filhoB" }),
        C("rebanho", 215, "stand", { dy: 0.32 }),
      ] }),                                                                        // os filhos de Labão murmuram: Jacó tomou tudo
      b(2, { env: { night: 0.26, glory: 0.05 }, cast: [                            // o ROSTO de Labão já não é como antes
        C("jaco", -40, "stand", { dy: 0.56, facing: 1 }),
        C("patriarca", 34, "stand", { dy: 0.5, facing: -1 }),
        C("rebanho", 215, "stand", { dy: 0.32 }),
      ] }),
      b(3, { by: "deus", q: "E disse o Senhor a Jacó: ", env: { night: 0.1, glory: 0.5 }, cast: [                              // A ORDEM DE DEUS (voz do céu): torna-te
        C("jaco", -12, "raise", { dy: 0.52 }),
        C("rebanho", 215, "stand", { dy: 0.32 }),
      ] }),
      // ---- ATO 2: o concílio no campo, longe das tendas
      b(4, { set: "campo", props: CAMPO, env: { glory: 0.3, night: 0.12 }, cast: [
        C("jaco", -30, "walk", { dy: 0.55, facing: 1 }),
        C("mulherComum", 34, "stand", { dy: 0.55, facing: -1, id: "raquel" }),
        C("mulherComum", 82, "stand", { dy: 0.5, facing: -1, id: "lia" }),
        C("rebanho", 200, "stand", { dy: 0.34 }),
      ] }),                                                                        // manda chamar Raquel e Lia ao campo
      b(5, { by: "jaco", q: "E disse-lhes: ", cast: [                              // o rosto de vosso pai mudou; Deus esteve comigo
        C("jaco", -34, "point", { dy: 0.55, facing: 1 }),
        C("mulherComum", 30, "stand", { dy: 0.55, facing: -1, id: "raquel" }),
        C("mulherComum", 78, "stand", { dy: 0.5, facing: -1, id: "lia" }),
        C("rebanho", 200, "stand", { dy: 0.34 }),
      ] }),
      b(6, { by: "jaco" }),                                                        // com todo o meu esforço servi a vosso pai
      b(7, { by: "jaco", env: { storm: 0.12 }, cast: [                             // enganou-me e mudou o salário DEZ VEZES
        C("jaco", -38, "raise", { dy: 0.55, facing: 1 }),
        C("mulherComum", 30, "stand", { dy: 0.55, facing: -1, id: "raquel" }),
        C("mulherComum", 78, "stand", { dy: 0.5, facing: -1, id: "lia" }),
        C("rebanho", 200, "stand", { dy: 0.34 }),
      ] }),
      b(8, { by: "jaco", cast: [                                                   // salpicados… listrados: o rebanho obedecia
        C("jaco", -34, "point", { dy: 0.55, facing: 1 }),
        C("mulherComum", 30, "stand", { dy: 0.55, facing: -1, id: "raquel" }),
        C("mulherComum", 78, "stand", { dy: 0.5, facing: -1, id: "lia" }),
        C("rebanho", 150, "stand", { dy: 0.36 }),
      ] }),
      b(9, { by: "jaco", env: { storm: 0, glory: 0.38 } }),                        // Deus tirou o gado de vosso pai e deu-o a mim
      b(10, { by: "jaco", env: { glory: 0.45 }, cast: [                            // o SONHO do rebanho: listrados e malhados
        C("jaco", -30, "raise", { dy: 0.55, facing: 1 }),
        C("mulherComum", 34, "stand", { dy: 0.55, facing: -1, id: "raquel" }),
        C("mulherComum", 82, "stand", { dy: 0.5, facing: -1, id: "lia" }),
        C("rebanho", 160, "stand", { dy: 0.36 }),
      ] }),
      b(11, { by: "jaco", env: { glory: 0.55 } }),                                 // o anjo de Deus em sonhos: Jacó! Eis-me aqui
      b(12, { by: "jaco" }),                                                       // tenho visto tudo o que Labão te fez
      b(13, { by: "jaco", env: { glory: 0.62 }, cast: [                            // Eu sou o Deus de BETEL — sai-te desta terra
        C("jaco", -26, "point", { dy: 0.55, facing: 1 }),
        C("mulherComum", 34, "stand", { dy: 0.55, facing: -1, id: "raquel" }),
        C("mulherComum", 82, "stand", { dy: 0.5, facing: -1, id: "lia" }),
        C("rebanho", 160, "stand", { dy: 0.36 }),
      ] }),
      b(14, { by: "mulherComum", q: "e disseram-lhe: ", env: { glory: 0.4 }, cast: [
        C("jaco", -46, "stand", { dy: 0.55, facing: 1 }),
        C("mulherComum", 20, "raise", { dy: 0.55, facing: -1, id: "raquel" }),
        C("mulherComum", 70, "stand", { dy: 0.5, facing: -1, id: "lia" }),
        C("rebanho", 160, "stand", { dy: 0.36 }),
      ] }),                                                                        // há ainda para nós herança na casa de nosso pai?
      b(15, { by: "mulherComum", env: { night: 0.2, glory: 0.3 }, cast: [          // ele nos vendeu e comeu o nosso dinheiro
        C("jaco", -46, "stand", { dy: 0.55, facing: 1 }),
        C("mulherComum", 22, "point", { dy: 0.55, facing: -1, id: "raquel" }),
        C("mulherComum", 74, "raise", { dy: 0.5, facing: -1, id: "lia" }),
        C("rebanho", 160, "stand", { dy: 0.36 }),
      ] }),
      b(16, { by: "mulherComum", env: { night: 0.12, glory: 0.5 }, cast: [         // faze tudo o que Deus te mandou — a decisão
        C("jaco", -40, "stand", { dy: 0.55, facing: 1 }),
        C("mulherComum", 16, "raise", { dy: 0.55, facing: -1, id: "raquel" }),
        C("mulherComum", 66, "raise", { dy: 0.5, facing: -1, id: "lia" }),
        C("rebanho", 160, "stand", { dy: 0.36 }),
      ] }),
      // ---- ATO 3: A FUGA
      b(17, { set: "fuga", props: FUGA, env: { terrain: "desert", night: 0.15, glory: 0.25, storm: 0.05 }, cast: [
        C("jaco", -90, "walk", { dy: 0.52, facing: 1 }),
        C("mulherComum", -152, "walk", { dy: 0.58, facing: 1, id: "raquel" }),
        C("mulherComum", -196, "walk", { dy: 0.5, facing: 1, id: "lia" }),
      ] }),                                                                        // filhos e mulheres sobre os camelos
      b(18, { cast: [                                                              // todo o gado e os bens rumo a Canaã
        C("jaco", -40, "walk", { dy: 0.52, facing: 1 }),
        C("mulherComum", -110, "walk", { dy: 0.58, facing: 1, id: "raquel" }),
        C("mulherComum", -160, "walk", { dy: 0.5, facing: 1, id: "lia" }),
        C("rebanho", 120, "walk", { dy: 0.36 }),
      ] }),
      b(19, { props: FUGA_IDOLOS, env: { night: 0.25, storm: 0.1 }, cast: [        // Labão foi à tosquia — RAQUEL FURTA OS ÍDOLOS
        C("mulherComum", -112, "kneel", { dy: 0.6, facing: -1, id: "raquel" }),
        C("jaco", 30, "walk", { dy: 0.5, facing: 1 }),
        C("rebanho", 150, "walk", { dy: 0.36 }),
      ] }),
      b(20, { env: { night: 0.3 }, cast: [                                         // logrou a Labão: não lhe fez saber que fugia
        C("jaco", -20, "walk", { dy: 0.52, facing: 1 }),
        C("mulherComum", -80, "walk", { dy: 0.58, facing: 1, id: "raquel" }),
        C("mulherComum", -130, "walk", { dy: 0.5, facing: 1, id: "lia" }),
        C("rebanho", 150, "walk", { dy: 0.36 }),
      ] }),
      b(21, { env: { night: 0.3, storm: 0.15, terrain: "mountain" }, cast: [       // passou o rio; dirigiu-se à montanha de Gileade
        C("rebanho", -60, "walk", { dy: 0.4 }),
        C("mulherComum", 40, "walk", { dy: 0.6, facing: 1, id: "raquel" }),
        C("mulherComum", 86, "walk", { dy: 0.5, facing: 1, id: "lia" }),
        C("jaco", 150, "walk", { dy: 0.54, facing: 1 }),
      ] }),
      // ---- ATO 4: a caçada de sete dias
      b(22, { set: "cacada", props: SERRA, env: { night: 0.2, storm: 0.3, glory: 0 }, cast: [
        C("patriarca", 30, "raise", { dy: 0.52, facing: -1 }),
        C("servo", 96, "stand", { dy: 0.46, facing: -1, id: "irmaoA" }),
        C("servo", -40, "stand", { dy: 0.58, facing: 1, id: "irmaoB" }),
      ] }),                                                                        // ao terceiro dia: anunciam a Labão a fuga
      b(23, { env: { storm: 0.34, night: 0.32 }, cast: [                           // SETE DIAS de perseguição — alcança-o em Gileade
        C("patriarca", -20, "walk", { dy: 0.52, facing: 1 }),
        C("servo", -76, "walk", { dy: 0.6, facing: 1, id: "irmaoA" }),
        C("servo", -124, "walk", { dy: 0.44, facing: 1, id: "irmaoB" }),
      ] }),
      b(24, { by: "deus", q: "Veio, porém, Deus a Labão, o arameu, em sonhos, de noite, e disse-lhe: ", props: SERRA_NOITE, env: { night: 0.7, storm: 0.1, glory: 0.4 }, cast: [
        C("patriarca", 0, "lie", { dy: 0.55 }),
      ] }),                                                                        // Deus vem a Labão em SONHOS: nem bem nem mal
      // ---- a confrontação nos dois arraiais
      b(25, { set: "gileade", props: GILEADE, env: { night: 0.2, storm: 0.2, glory: 0.1 }, cast: [
        C("jaco", -70, "stand", { dy: 0.54, facing: 1 }),
        C("patriarca", 60, "walk", { dy: 0.5, facing: -1 }),
        C("servo", 130, "stand", { dy: 0.44, facing: -1, id: "irmaoA" }),
        C("servo", 168, "stand", { dy: 0.56, facing: -1, id: "irmaoB" }),
      ] }),                                                                        // as tendas armadas frente a frente na montanha
      b(26, { by: "patriarca", q: "Então disse Labão a Jacó: ", env: { storm: 0.25 }, cast: [
        C("jaco", -56, "stand", { dy: 0.54, facing: 1 }),
        C("patriarca", 26, "point", { dy: 0.5, facing: -1 }),
        C("servo", 130, "stand", { dy: 0.44, facing: -1, id: "irmaoA" }),
        C("servo", 168, "stand", { dy: 0.56, facing: -1, id: "irmaoB" }),
      ] }),                                                                        // Que fizeste? levaste minhas filhas como cativas
      b(27, { by: "patriarca" }),                                                  // por que fugiste OCULTAMENTE? sem tamboril e harpa
      b(28, { by: "patriarca", env: { storm: 0.3 }, cast: [                        // nem me deixaste beijar filhos e filhas
        C("jaco", -56, "stand", { dy: 0.54, facing: 1 }),
        C("patriarca", 22, "raise", { dy: 0.5, facing: -1 }),
        C("servo", 130, "stand", { dy: 0.44, facing: -1, id: "irmaoA" }),
        C("servo", 168, "stand", { dy: 0.56, facing: -1, id: "irmaoB" }),
      ] }),
      b(29, { by: "patriarca", env: { storm: 0.18, glory: 0.28 } }),               // poder havia em minha mão — mas Deus me falou
      b(30, { by: "patriarca", env: { storm: 0.32, glory: 0.05 }, cast: [          // A ACUSAÇÃO: por que furtaste os meus deuses?
        C("jaco", -50, "stand", { dy: 0.54, facing: 1 }),
        C("patriarca", 16, "point", { dy: 0.5, facing: -1 }),
        C("servo", 130, "stand", { dy: 0.44, facing: -1, id: "irmaoA" }),
        C("servo", 168, "stand", { dy: 0.56, facing: -1, id: "irmaoB" }),
      ] }),
      b(31, { by: "jaco", q: "e disse a Labão: ", cast: [                          // Porque TEMIA que me arrebatasses tuas filhas
        C("jaco", -44, "stand", { dy: 0.54, facing: 1 }),
        C("patriarca", 24, "stand", { dy: 0.5, facing: -1 }),
        C("servo", 130, "stand", { dy: 0.44, facing: -1, id: "irmaoA" }),
        C("servo", 168, "stand", { dy: 0.56, facing: -1, id: "irmaoB" }),
      ] }),
      b(32, { by: "jaco", env: { storm: 0.36 }, cast: [                            // a SENTENÇA cega: com quem os achares, não viva
        C("jaco", -40, "raise", { dy: 0.54, facing: 1 }),
        C("patriarca", 26, "stand", { dy: 0.5, facing: -1 }),
        C("servo", 130, "stand", { dy: 0.44, facing: -1, id: "irmaoA" }),
        C("servo", 168, "stand", { dy: 0.56, facing: -1, id: "irmaoB" }),
      ] }),
      // ---- A BUSCA NAS TENDAS: a cena quase para, o suspense é o movimento
      b(33, { env: { storm: 0.2, night: 0.28 }, cast: [                            // Labão entra em tenda após tenda — e não acha
        C("patriarca", -180, "walk", { dy: 0.42, facing: -1 }),
        C("jaco", 40, "stand", { dy: 0.56, facing: -1 }),
        C("mulherComum", -60, "stand", { dy: 0.6, facing: -1, id: "lia" }),
      ] }),
      b(34, { props: GILEADE_BUSCA, env: { storm: 0.24 }, cast: [                  // RAQUEL SENTADA sobre os ídolos na albarda
        C("mulherComum", -112, "kneel", { dy: 0.58, facing: 1, id: "raquel" }),
        C("patriarca", -46, "stand", { dy: 0.5, facing: -1 }),
      ] }),
      b(35, { by: "mulherComum", q: "E ela disse a seu pai: ", env: { storm: 0.12 }, cast: [
        C("mulherComum", -108, "kneel", { dy: 0.58, facing: 1, id: "raquel" }),
        C("patriarca", -34, "stand", { dy: 0.5, facing: -1 }),
      ] }),                                                                        // não posso levantar-me — e ele não achou
      // ---- ATO 5: A EXPLOSÃO DE JACÓ (vinte anos numa só respiração)
      b(36, { by: "jaco", q: "e disse a Labão: ", props: GILEADE, env: { storm: 0.34, night: 0.24 }, cast: [
        C("jaco", -30, "point", { dy: 0.54, facing: 1 }),
        C("patriarca", 46, "stand", { dy: 0.5, facing: -1 }),
        C("servo", 120, "stand", { dy: 0.44, facing: -1, id: "irmaoA" }),
        C("servo", 162, "stand", { dy: 0.58, facing: -1, id: "irmaoB" }),
      ] }),                                                                        // Qual é a minha transgressão? o meu pecado?
      b(37, { by: "jaco", env: { storm: 0.38 }, cast: [                            // apalpaste tudo — põe aqui diante dos irmãos!
        C("jaco", -26, "raise", { dy: 0.54, facing: 1 }),
        C("patriarca", 48, "stand", { dy: 0.5, facing: -1 }),
        C("servo", 120, "stand", { dy: 0.44, facing: -1, id: "irmaoA" }),
        C("servo", 162, "stand", { dy: 0.58, facing: -1, id: "irmaoB" }),
      ] }),
      b(38, { by: "jaco" }),                                                       // estes VINTE ANOS: nunca abortaram, nada comi
      b(39, { by: "jaco", env: { storm: 0.4 } }),                                  // o despedaçado eu pagava; o furtado, requerias
      b(40, { by: "jaco", env: { storm: 0.4, night: 0.4 }, cast: [                 // de dia o CALOR, de noite a GEADA — o sono fugiu
        C("jaco", -22, "raise", { dy: 0.54, facing: 1 }),
        C("patriarca", 50, "stand", { dy: 0.5, facing: -1 }),
        C("servo", 120, "stand", { dy: 0.44, facing: -1, id: "irmaoA" }),
        C("servo", 162, "stand", { dy: 0.58, facing: -1, id: "irmaoB" }),
      ] }),
      b(41, { by: "jaco", env: { night: 0.3 } }),                                  // catorze anos pelas filhas, seis pelo rebanho
      b(42, { by: "jaco", env: { storm: 0.18, glory: 0.5, night: 0.2 }, cast: [    // o TEMOR DE ISAQUE me livrou — Deus repreendeu-te
        C("jaco", -26, "point", { dy: 0.54, facing: 1 }),
        C("patriarca", 52, "bow", { dy: 0.5, facing: -1 }),
        C("servo", 120, "stand", { dy: 0.44, facing: -1, id: "irmaoA" }),
        C("servo", 162, "stand", { dy: 0.58, facing: -1, id: "irmaoB" }),
      ] }),
      // ---- O MONTE DE PEDRAS: o pacto de Mispá
      b(43, { by: "patriarca", q: "e disse a Jacó: ", env: { storm: 0.1, glory: 0.4 }, cast: [
        C("jaco", -46, "stand", { dy: 0.54, facing: 1 }),
        C("patriarca", 30, "raise", { dy: 0.5, facing: -1 }),
        C("mulherComum", 96, "stand", { dy: 0.6, facing: -1, id: "raquel" }),
        C("mulherComum", 140, "stand", { dy: 0.48, facing: -1, id: "lia" }),
      ] }),                                                                        // estas filhas são minhas filhas… tudo é meu
      b(44, { by: "patriarca", env: { storm: 0, glory: 0.45 } }),                  // façamos ALIANÇA, por testemunho entre mim e ti
      b(45, { props: GALEEDE_COLUNA, env: { glory: 0.5 }, cast: [                  // Jacó ergue a PEDRA por coluna
        C("jaco", -96, "raise", { dy: 0.52, facing: -1 }),
        C("patriarca", 40, "stand", { dy: 0.5, facing: -1 }),
      ] }),
      b(46, { by: "jaco", q: "E disse Jacó a seus irmãos: ", props: GALEEDE_MONTAO, cast: [
        C("jaco", -80, "point", { dy: 0.52, facing: -1 }),
        C("servo", -30, "kneel", { dy: 0.6, facing: -1, id: "irmaoA" }),
        C("servo", 24, "stand", { dy: 0.46, facing: -1, id: "irmaoB" }),
        C("patriarca", 90, "stand", { dy: 0.5, facing: -1 }),
      ] }),                                                                        // Ajuntai pedras — o montão, e comeram ali
      b(47, { env: { glory: 0.52 } }),                                             // Jegar-Saaduta / GALEEDE: dois nomes, um marco
      b(48, { by: "patriarca", q: "Então disse Labão: ", cast: [                   // este montão seja hoje por TESTEMUNHA
        C("jaco", -74, "stand", { dy: 0.52, facing: 1 }),
        C("patriarca", 20, "point", { dy: 0.5, facing: -1 }),
        C("servo", 110, "stand", { dy: 0.46, facing: -1, id: "irmaoA" }),
        C("servo", 156, "stand", { dy: 0.6, facing: -1, id: "irmaoB" }),
      ] }),
      b(49, { by: "patriarca", q: "porquanto disse: ", env: { glory: 0.6, night: 0.12 }, cast: [
        C("jaco", -70, "stand", { dy: 0.52, facing: 1 }),
        C("patriarca", 16, "raise", { dy: 0.5, facing: -1 }),
        C("servo", 110, "stand", { dy: 0.46, facing: -1, id: "irmaoA" }),
        C("servo", 156, "stand", { dy: 0.6, facing: -1, id: "irmaoB" }),
      ] }),                                                                        // MISPÁ: Atente o Senhor entre mim e ti
      b(50, { by: "patriarca", cast: [                                             // se afligires minhas filhas — Deus é testemunha
        C("jaco", -70, "stand", { dy: 0.52, facing: 1 }),
        C("patriarca", 18, "point", { dy: 0.5, facing: -1 }),
        C("mulherComum", 108, "stand", { dy: 0.6, facing: -1, id: "raquel" }),
        C("mulherComum", 152, "stand", { dy: 0.48, facing: -1, id: "lia" }),
      ] }),
      b(51, { by: "patriarca", q: "Disse mais Labão a Jacó: ", cast: [             // eis o montão e a coluna que levantei
        C("jaco", -78, "stand", { dy: 0.52, facing: 1 }),
        C("patriarca", 26, "point", { dy: 0.5, facing: -1 }),
      ] }),
      b(52, { by: "patriarca", env: { glory: 0.56 } }),                            // não passarei este montão a ti, nem tu a mim
      b(53, { by: "patriarca", env: { glory: 0.65 }, cast: [                       // o Deus de Abraão julgue — e Jacó JUROU
        C("jaco", -66, "raise", { dy: 0.52, facing: 1 }),
        C("patriarca", 24, "raise", { dy: 0.5, facing: -1 }),
      ] }),
      b(54, { props: GALEEDE_ALTAR, env: { night: 0.6, glory: 0.5, storm: 0 }, cast: [
        C("jaco", -40, "kneel", { dy: 0.55, facing: -1 }),
        C("patriarca", 44, "stand", { dy: 0.5, facing: -1 }),
        C("servo", 120, "stand", { dy: 0.46, facing: -1, id: "irmaoA" }),
        C("servo", 164, "kneel", { dy: 0.6, facing: -1, id: "irmaoB" }),
      ] }),                                                                        // o SACRIFÍCIO: comeram pão e dormiram no monte
      b(55, { props: GALEEDE_MONTAO, env: { night: 0.15, glory: 0.55 }, cast: [    // de madrugada: beijos, bênção — e Labão volta
        C("jaco", -60, "stand", { dy: 0.54, facing: 1 }),
        C("mulherComum", -6, "bow", { dy: 0.6, facing: 1, id: "raquel" }),
        C("mulherComum", 40, "bow", { dy: 0.48, facing: 1, id: "lia" }),
        C("patriarca", 150, "walk", { dy: 0.5, facing: 1 }),
      ] }),
    ],
  },

  // ------------------------------------------------------------------ Gn 32
  // JABOQUE. Arco de env: a manhã de MAANAIM (glory 0.6) → a estrada e os
  // mensageiros (glory 0.3) → o TERROR das 400 lanças (night 0.5, storm 0.2)
  // → a oração que ajoelha (glory 0.4) → o presente atravessando na tarde
  // (night 0.45) → a NOITE ABSOLUTA do vau (night 0.9) → a luta (storm 0.3,
  // glory 0.35 → 0.9) → PENIEL ao nascer do sol (night 0.1, glory 0.7).
  32: {
    start: { terrain: "mountain", night: 0.18, glory: 0.3, storm: 0 },
    beats: [
      // ---- MAANAIM: o arraial de Deus
      b(1, { props: MAANAIM, env: { glory: 0.5, night: 0.12 }, cast: [             // e ENCONTRARAM-NO OS ANJOS DE DEUS
        C("jaco", -30, "walk", { dy: 0.55, facing: 1 }),
        C("anjo", -118, "flyIdle", { dy: 0.3, glow: 0.7, id: "anjoA" }),
        C("anjo", -168, "flyIdle", { dy: 0.12, glow: 0.55, id: "anjoB" }),
      ] }),
      b(2, { by: "jaco", q: "quando os viu: ", env: { glory: 0.6, night: 0.08 }, cast: [
        C("jaco", -50, "raise", { dy: 0.55, facing: -1 }),
        C("anjo", -122, "flyIdle", { dy: 0.26, glow: 0.85, id: "anjoA" }),
        C("anjo", -172, "flyIdle", { dy: 0.1, glow: 0.7, id: "anjoB" }),
      ] }),                                                                        // Este é o exército de Deus — MAANAIM
      // ---- os mensageiros a Esaú
      b(3, { set: "arraial", props: ARRAIAL, env: { terrain: "desert", glory: 0.3, night: 0.2 }, cast: [
        C("jaco", -40, "point", { dy: 0.55, facing: 1 }),
        C("servo", 40, "stand", { dy: 0.5, facing: -1, id: "mensA" }),
        C("servo", 92, "stand", { dy: 0.6, facing: -1, id: "mensB" }),
      ] }),                                                                        // envia mensageiros a Esaú, à terra de Seir
      b(4, { by: "jaco", q: "E ordenou-lhes, dizendo: ", cast: [                   // Assim direis a MEU SENHOR Esaú: teu servo Jacó
        C("jaco", -34, "point", { dy: 0.55, facing: 1 }),
        C("servo", 36, "bow", { dy: 0.5, facing: -1, id: "mensA" }),
        C("servo", 88, "stand", { dy: 0.6, facing: -1, id: "mensB" }),
      ] }),
      b(5, { by: "jaco", env: { glory: 0.32 }, cast: [                             // tenho bois, ovelhas e servos — ache eu graça
        C("jaco", -34, "stand", { dy: 0.55, facing: 1 }),
        C("servo", 140, "walk", { dy: 0.48, facing: 1, id: "mensA" }),
        C("servo", 192, "walk", { dy: 0.58, facing: 1, id: "mensB" }),
        C("rebanho", 250, "stand", { dy: 0.34, id: "gadoA" }),
      ] }),
      // ---- O MEDO: quatrocentos homens
      b(6, { by: "servo", q: "dizendo: ", env: { night: 0.5, storm: 0.2, glory: 0.05 }, cast: [
        C("jaco", -30, "stand", { dy: 0.55, facing: 1 }),
        C("servo", 34, "raise", { dy: 0.52, facing: -1, id: "mensA" }),
        C("servo", 86, "stand", { dy: 0.62, facing: -1, id: "mensB" }),
      ] }),                                                                        // ele vem — e QUATROCENTOS HOMENS com ele
      b(7, { env: { night: 0.55, storm: 0.3 }, cast: [                             // temeu muito: reparte o povo em DOIS BANDOS
        C("jaco", -20, "stand", { dy: 0.55 }),
        C("rebanho", -180, "walk", { dy: 0.36, id: "bandoA" }),
        C("rebanho", 180, "walk", { dy: 0.42, id: "bandoB" }),
      ] }),
      b(8, { by: "jaco", q: "Porque dizia: ", env: { night: 0.58, storm: 0.32 }, cast: [
        C("jaco", -10, "point", { dy: 0.55, facing: 1 }),
        C("rebanho", -210, "stand", { dy: 0.34, id: "bandoA" }),
        C("rebanho", 210, "stand", { dy: 0.44, id: "bandoB" }),
      ] }),                                                                        // se ferir um bando, o outro escapará
      // ---- A ORAÇÃO
      b(9, { by: "jaco", q: "Disse mais Jacó: ", env: { night: 0.45, storm: 0.12, glory: 0.35 }, cast: [
        C("jaco", -14, "kneel", { dy: 0.55 }),
        C("rebanho", -210, "stand", { dy: 0.34, id: "bandoA" }),
        C("rebanho", 210, "stand", { dy: 0.44, id: "bandoB" }),
      ] }),                                                                        // Deus de Abraão e de Isaque — Tu me disseste
      b(10, { by: "jaco", env: { glory: 0.4, storm: 0.05 }, cast: [                // com meu CAJADO passei este Jordão — menor sou eu
        C("jaco", -14, "bow", { dy: 0.55 }),
        C("rebanho", -210, "stand", { dy: 0.34, id: "bandoA" }),
        C("rebanho", 210, "stand", { dy: 0.44, id: "bandoB" }),
      ] }),
      b(11, { by: "jaco", env: { storm: 0.18, glory: 0.34 }, cast: [               // LIVRA-ME da mão de meu irmão, da mão de Esaú
        C("jaco", -14, "raise", { dy: 0.55 }),
        C("rebanho", -210, "stand", { dy: 0.34, id: "bandoA" }),
        C("rebanho", 210, "stand", { dy: 0.44, id: "bandoB" }),
      ] }),
      b(12, { by: "jaco", env: { storm: 0, glory: 0.5, night: 0.4 }, cast: [       // Tu o disseste: como a AREIA DO MAR
        C("jaco", -14, "kneel", { dy: 0.55 }),
        C("rebanho", -210, "stand", { dy: 0.34, id: "bandoA" }),
        C("rebanho", 210, "stand", { dy: 0.44, id: "bandoB" }),
      ] }),
      // ---- O PRESENTE, em ondas
      b(13, { props: ARRAIAL_NOITE, env: { night: 0.6, glory: 0.2 }, cast: [       // passou ali a noite; separa o PRESENTE para Esaú
        C("jaco", -30, "stand", { dy: 0.55, facing: 1 }),
        C("rebanho", 120, "stand", { dy: 0.36, id: "levaA" }),
      ] }),
      b(14, { cast: [                                                              // duzentas cabras e vinte bodes; ovelhas e carneiros
        C("jaco", -30, "point", { dy: 0.55, facing: 1 }),
        C("rebanho", 90, "stand", { dy: 0.34, id: "levaA" }),
        C("rebanho", 200, "stand", { dy: 0.44, id: "levaB" }),
      ] }),
      b(15, { env: { night: 0.55 }, cast: [                                        // camelas de leite, vacas, jumentas e jumentinhos
        C("jaco", -30, "stand", { dy: 0.55, facing: 1 }),
        C("rebanho", 70, "stand", { dy: 0.3, id: "levaA" }),
        C("rebanho", 170, "stand", { dy: 0.42, id: "levaB" }),
        C("rebanho", 268, "stand", { dy: 0.54, id: "levaC" }),
      ] }),
      b(16, { by: "jaco", q: "e disse a seus servos: ", props: ARRAIAL, env: { night: 0.42, glory: 0.22 }, cast: [
        C("jaco", -46, "point", { dy: 0.55, facing: 1 }),
        C("servo", 20, "stand", { dy: 0.52, facing: -1, id: "mensA" }),
        C("servo", 72, "stand", { dy: 0.62, facing: -1, id: "mensB" }),
        C("rebanho", 190, "stand", { dy: 0.36, id: "levaA" }),
      ] }),                                                                        // ponde ESPAÇO entre rebanho e rebanho
      b(17, { by: "jaco", q: "E ordenou ao primeiro, dizendo: ", cast: [           // quando Esaú te encontrar e te perguntar…
        C("jaco", -40, "point", { dy: 0.55, facing: 1 }),
        C("servo", 16, "bow", { dy: 0.52, facing: -1, id: "mensA" }),
        C("servo", 70, "stand", { dy: 0.62, facing: -1, id: "mensB" }),
        C("rebanho", 190, "stand", { dy: 0.36, id: "levaA" }),
      ] }),
      b(18, { by: "jaco", q: "Então dirás: " }),                                   // São de teu servo Jacó — presente a meu senhor
      b(19, { by: "jaco", q: "dizendo: ", cast: [                                  // ao segundo, ao terceiro, e a todos os que vinham
        C("jaco", -40, "raise", { dy: 0.55, facing: 1 }),
        C("servo", 24, "stand", { dy: 0.52, facing: -1, id: "mensA" }),
        C("servo", 76, "bow", { dy: 0.62, facing: -1, id: "mensB" }),
        C("rebanho", 150, "walk", { dy: 0.34, id: "levaA" }),
        C("rebanho", 250, "walk", { dy: 0.46, id: "levaB" }),
      ] }),
      b(20, { by: "jaco", env: { glory: 0.28 } }),                                 // APLACAREI a sua face com o presente
      b(21, { props: ARRAIAL_NOITE, env: { night: 0.7, glory: 0.12 }, cast: [      // o presente passou adiante; ele ficou no arraial
        C("jaco", -18, "stand", { dy: 0.56, facing: 1 }),
        C("rebanho", 210, "walk", { dy: 0.36, id: "levaA" }),
        C("rebanho", 300, "walk", { dy: 0.48, id: "levaB" }),
      ] }),
      // ---- A NOITE SOZINHO no vau de Jaboque
      b(22, { set: "jaboque", props: JABOQUE_NOITE, env: { night: 0.85, glory: 0.08, storm: 0 }, cast: [
        C("jaco", -50, "walk", { dy: 0.55, facing: 1 }),
        C("mulherComum", -116, "walk", { dy: 0.62, facing: 1, id: "raquel" }),
        C("mulherComum", -164, "walk", { dy: 0.48, facing: 1, id: "lia" }),
      ] }),                                                                        // de noite tomou as mulheres e passou o VAU
      b(23, { env: { night: 0.88 }, cast: [                                        // fez passar TUDO o que tinha
        C("jaco", -70, "stand", { dy: 0.56, facing: 1 }),
        C("mulherComum", 90, "walk", { dy: 0.6, facing: 1, id: "raquel" }),
        C("mulherComum", 150, "walk", { dy: 0.44, facing: 1, id: "lia" }),
        C("rebanho", 240, "walk", { dy: 0.36, id: "levaA" }),
      ] }),
      b(24, { env: { night: 0.9, storm: 0.15, glory: 0.2 }, cast: [                // JACÓ FICOU SÓ — e lutou com ele um homem
        C("jaco", -22, "stand", { dy: 0.55, facing: 1 }),
        C("anjo", 24, "stand", { dy: 0.5, glow: 0.35, facing: -1 }),
      ] }),
      // ---- A LUTA ATÉ O ROMPER DO DIA
      b(25, { env: { night: 0.86, storm: 0.3, glory: 0.35 }, cast: [               // tocou-lhe a coxa — E A JUNTURA SE DESLOCOU
        C("jaco", -16, "kneel", { dy: 0.56, facing: 1 }),
        C("anjo", 18, "raise", { dy: 0.5, glow: 0.5, facing: -1 }),
      ] }),
      b(26, { by: "jaco", q: "Porém ele disse: ", env: { night: 0.72, storm: 0.28, glory: 0.5 }, cast: [
        C("jaco", -12, "raise", { dy: 0.56, facing: 1 }),
        C("anjo", 16, "stand", { dy: 0.5, glow: 0.62, facing: -1 }),
      ] }),                                                                        // NÃO TE DEIXAREI IR, SE NÃO ME ABENÇOARES
      b(27, { by: "anjo", q: "E disse-lhe: ", env: { night: 0.6, glory: 0.62 }, cast: [
        C("jaco", -14, "stand", { dy: 0.56, facing: 1 }),
        C("anjo", 18, "point", { dy: 0.5, glow: 0.75, facing: -1 }),
      ] }),                                                                        // Qual é o teu nome? — E ele disse: Jacó
      b(28, { by: "anjo", q: "Então disse: ", env: { night: 0.4, storm: 0.1, glory: 0.9 }, cast: [
        C("jaco", -16, "kneel", { dy: 0.56, facing: 1 }),
        C("anjo", 20, "raise", { dy: 0.48, glow: 1, facing: -1 }),
      ] }),                                                                        // NÃO MAIS JACÓ, MAS ISRAEL — e prevaleceste
      b(29, { by: "jaco", q: "perguntou, e disse: ", env: { night: 0.3, storm: 0, glory: 0.95 }, cast: [
        C("jaco", -18, "bow", { dy: 0.56, facing: 1 }),
        C("anjo", 22, "raise", { dy: 0.46, glow: 1, facing: -1 }),
      ] }),                                                                        // Dá-me a saber o teu nome — e ABENÇOOU-O ali
      // ---- PENIEL: o rosto de Deus e o coxear
      b(30, { by: "jaco", q: "porque dizia: ", env: { night: 0.22, glory: 0.8 }, cast: [
        C("jaco", -10, "kneel", { dy: 0.55 }),
      ] }),                                                                        // PENIEL: vi a Deus face a face, e vivi
      b(31, { props: PENIEL_ALVA, env: { night: 0.1, glory: 0.7 }, cast: [         // saiu-lhe o SOL — e ele MANQUEJAVA da coxa
        C("jaco", 30, "walk", { dy: 0.55, facing: 1 }),
      ] }),
      b(32, { env: { night: 0.06, glory: 0.62 }, cast: [                           // por isso Israel não come o NERVO ENCOLHIDO
        C("jaco", 96, "stand", { dy: 0.52, facing: 1 }),
      ] }),
    ],
  },
};
