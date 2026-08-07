// ============================================================================
// GÊNESIS 35–36 — roteiro do modo CENA VIVA (força-tarefa AT, onda 2).
//
// Gn 35 — DE VOLTA A BETEL: o capítulo em que Jacó fecha o círculo de vinte
// anos — e paga o preço. (1) "Levanta-te, sobe a Betel": a ordem cai do céu
// sobre o acampamento de Siquém (glória 0.5, Deus nunca desenhado). (2) A
// PURIFICAÇÃO: os deuses estranhos e as arrecadas das orelhas saem das mãos da
// casa e são ENTERRADOS debaixo do carvalho de Siquém — o funeral dos ídolos.
// (3) A partida sob o TERROR DE DEUS: as cidades ao redor não perseguem
// (night 0.3 ao fundo, storm baixo — o medo está lá fora, não no palco).
// (4) EL-BETEL: o altar erguido onde Deus se lhe manifestara na fuga. (5) O
// primeiro luto: morre Débora, a ama de Rebeca, e o carvalho ganha nome —
// Alom-Bacute, "carvalho do choro". (6) DEUS APARECE OUTRA VEZ (glory 0.75 →
// 0.9): ISRAEL é confirmado, a promessa de Abraão passa adiante — e "Deus
// subiu dele" (a luz recolhe-se, ninguém foi desenhado). (7) A coluna de pedra
// com libação e azeite. (8) O CENTRO TRÁGICO: o caminho de Efrata, o parto de
// Raquel, "Não temas" da parteira — e ela morre dando o nome BENONI, que o pai
// troca por BENJAMIM (night 0.6, glória quase apagada: é o beat mais escuro do
// capítulo). A coluna do sepulcro fica até hoje. (9) Migdal Eder, e o pecado
// de Rúben dito em voz baixa, sem espetáculo (narração sóbria, night 0.35).
// (10) O MEMORIAL DOS DOZE: os filhos entram em fileira por mãe, glória 0.4 —
// a família virou nação. (11) HEBROM: Isaque expira velho e farto de dias, e
// os dois irmãos rivais — Esaú e Jacó — sepultam o pai lado a lado.
//
// Gn 36 — AS GERAÇÕES DE ESAÚ (o memorial de Edom): não é lista, é a passagem
// do TEMPO em cena. As três mulheres e os primeiros filhos em Canaã; a PARTIDA
// porque "os bens deles eram muitos para habitarem juntos" (o rebanho enorme
// atravessando o deserto); a montanha de SEIR como pátria; os filhos e os
// PRÍNCIPES trocando de marca geração após geração, com o ciclo dia/noite
// batendo no env; os filhos de Seir horeu e Aná achando as fontes termais no
// deserto enquanto apascentava os jumentos; e então o coração do capítulo — OS
// REIS DE EDOM, "antes que reinasse rei algum sobre os filhos de Israel": o
// trono aparece VAZIO no v.31 e oito reis o ocupam um após o outro, cada
// versículo derrubando o anterior ("E morreu…, e reinou em seu lugar") — a
// dramaturgia pura da sucessão. Fecho na montanha, com os príncipes nas suas
// habitações: "Este é Esaú, pai de Edom."
//
// DEUS NUNCA É DESENHADO: a ordem do v.1 e a teofania dos v.9-13 são NARRAÇÃO
// PURA (sem `by`) + glória no ambiente. A "aparição" é luz que cresce e depois
// se recolhe ("Deus subiu dele"), nunca figura.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });

// ---------------------------------------------------------------------------
// SIQUÉM (35:1-5) — o acampamento onde a casa de Jacó parou depois de Diná:
// tendas, barraca de feira, poço, fardos. O corredor de extras (-100..-190)
// fica LIVRE: é por ali que o CARVALHO e os ídolos enterrados vão entrar.
const SIQUEM: StagePropSpec[] = [
  P("tent", 200, 1.3, undefined, 0.12),      // a tenda de Jacó
  P("tent", 276, 1.05, undefined, 0.34),     // as tendas da casa
  P("stall", -300, 0.95, undefined, 0.24),   // a feira de Siquém
  P("well", 320, 1, undefined, 0.16),
  P("campfire", 170, 1, 1, 0.6),
  P("amphora", 232, 0.85, undefined, 0.58),
  P("crate", -262, 0.9, undefined, 0.52),
  P("rock", 40, 0.55, undefined, 0.26),
  P("rock", 300, 0.85, undefined, 0.74),
  P("bush", -318, 0.9, undefined, 0.44),
  P("bush", 140, 0.85, undefined, 0.66),
  P("tree", -60, 1.1, undefined, 0.06),
  P("tree", 92, 0.95, undefined, 0.04),
  P("grass", -246, 1, undefined, 0.82),
  P("grass", 20, 1, undefined, 0.86),
  P("grass", 208, 0.95, undefined, 0.78),
];
// O CARVALHO junto a Siquém (35:4) e o funeral dos ídolos: o fardo dos deuses
// estranhos e a talha das arrecadas descem para debaixo das raízes.
const SIQUEM_CARVALHO: StagePropSpec[] = [
  ...SIQUEM,
  P("tree", -142, 1.7, undefined, 0.1),      // "o carvalho que está junto a Siquém"
];
const SIQUEM_ENTERRO: StagePropSpec[] = [
  ...SIQUEM_CARVALHO,
  P("crate", -134, 0.85, undefined, 0.5),    // os deuses estranhos, escondidos
  P("amphora", -176, 0.8, undefined, 0.62),  // as arrecadas das orelhas
];

// ---------------------------------------------------------------------------
// BETEL / LUZ (35:6-15) — a montanha da casa de Deus: pedra nua, mato ralo,
// as tendas do povo ao lado. Aqui o palco recebe, por camadas, o ALTAR, o
// CARVALHO do choro e a COLUNA de pedra.
const BETEL: StagePropSpec[] = [
  P("rock", -250, 1.05, undefined, 0.22),
  P("rock", -30, 0.6, undefined, 0.5),
  P("rock", 210, 0.95, undefined, 0.3),
  P("rock", 310, 1.15, undefined, 0.62),
  P("tent", 246, 1.2, undefined, 0.12),
  P("tent", 300, 1.0, undefined, 0.38),
  P("campfire", 160, 1, 1, 0.58),
  P("bush", -310, 0.9, undefined, 0.46),
  P("bush", 120, 0.85, undefined, 0.68),
  P("tree", -64, 1.15, undefined, 0.06),
  P("tree", 70, 1.0, undefined, 0.04),
  P("grass", -226, 1, undefined, 0.82),
  P("grass", 26, 0.95, undefined, 0.88),
  P("grass", 240, 1, undefined, 0.76),
];
// EL-BETEL (35:7): "edificou ali um altar"
const BETEL_ALTAR: StagePropSpec[] = [...BETEL, P("altar", -56, 1.1, 1, 0.26)];
// ALOM-BACUTE (35:8): o carvalho sob o qual Débora foi sepultada
const BETEL_CARVALHO: StagePropSpec[] = [...BETEL_ALTAR, P("tree", -142, 1.6, undefined, 0.12)];
// A COLUNA (35:14): "uma coluna de pedra", com libação e azeite derramados
const BETEL_COLUNA: StagePropSpec[] = [...BETEL_CARVALHO, { ...P("rock", -186, 1.3, undefined, 0.26), tag: "coluna-betel" }];

// ---------------------------------------------------------------------------
// O CAMINHO DE EFRATA (35:16-20) — estrada de deserto ao cair da noite, "um
// pequeno espaço de terra para chegar a Efrata". Nenhuma tenda, nenhum abrigo:
// o parto acontece na estrada.
const EFRATA: StagePropSpec[] = [
  P("rock", -256, 1.0, undefined, 0.26),
  P("rock", 44, 0.55, undefined, 0.24),
  P("rock", 214, 0.9, undefined, 0.34),
  P("rock", 306, 1.15, undefined, 0.64),
  P("bush", -304, 0.9, undefined, 0.5),
  P("bush", 118, 0.85, undefined, 0.7),
  P("tree", -66, 1.1, undefined, 0.06),
  P("tree", 84, 0.95, undefined, 0.04),
  P("palm", 262, 1.05, undefined, 0.14),
  P("grass", -222, 1, undefined, 0.82),
  P("grass", 24, 0.95, undefined, 0.88),
  P("grass", 246, 1, undefined, 0.76),
];
// a noite que se fecha sobre a morte de Raquel — só as estrelas assistem
const EFRATA_NOITE: StagePropSpec[] = [
  ...EFRATA,
  { kind: "starfield", dx: -20, dy: 0.8, scale: 1.25, sky: true },
  { kind: "starfield", dx: 180, dy: 0.66, scale: 1.0, sky: true },
];
// A COLUNA DA SEPULTURA (35:20): "esta é a coluna da sepultura de Raquel até
// o dia de hoje" — pedra em pé e a árvore que a guarda.
const EFRATA_SEPULCRO: StagePropSpec[] = [
  ...EFRATA_NOITE,
  { ...P("rock", -140, 1.3, undefined, 0.22), tag: "sepulcro-raquel" },
  P("tree", -182, 1.2, undefined, 0.12),
];

// ---------------------------------------------------------------------------
// MIGDAL EDER (35:21-26) — "estendeu a sua tenda além de Migdal Eder": a
// TORRE DO REBANHO no horizonte e a tenda de Israel armada de novo. É aqui
// que a família se revela NAÇÃO: o memorial dos doze filhos.
const MIGDAL: StagePropSpec[] = [
  P("tower", 214, 1.25, undefined, 0.1),     // Migdal Eder, a torre do rebanho
  P("tent", -56, 1.3, undefined, 0.12),      // a tenda de Israel
  P("tent", 276, 1.0, undefined, 0.36),
  P("campfire", 40, 1, 1, 0.6),
  P("well", 320, 1, undefined, 0.18),
  P("amphora", 240, 0.85, undefined, 0.56),
  P("rock", -240, 0.9, undefined, 0.3),
  P("rock", 300, 0.9, undefined, 0.72),
  P("bush", -310, 0.9, undefined, 0.5),
  P("bush", 130, 0.85, undefined, 0.66),
  P("tree", 80, 1.05, undefined, 0.04),
  P("grass", -256, 1, undefined, 0.84),
  P("grass", 10, 1, undefined, 0.88),
  P("grass", 196, 0.95, undefined, 0.78),
];

// ---------------------------------------------------------------------------
// HEBROM / MANRE (35:27-29) — Quiriate-Arba, onde peregrinaram Abraão e
// Isaque: o carvalhal, as tendas antigas, o poço da casa do pai.
const HEBROM: StagePropSpec[] = [
  P("tent", 216, 1.3, undefined, 0.12),      // a tenda de Isaque
  P("tent", 288, 1.05, undefined, 0.36),
  P("tree", -62, 1.25, undefined, 0.06),     // o carvalhal de Manre
  P("tree", 76, 1.15, undefined, 0.04),
  P("well", 322, 1, undefined, 0.18),
  P("rock", -244, 1.0, undefined, 0.28),
  P("rock", 36, 0.55, undefined, 0.26),
  P("rock", 306, 0.9, undefined, 0.7),
  P("bush", -312, 0.9, undefined, 0.5),
  P("bush", 132, 0.85, undefined, 0.68),
  P("amphora", 250, 0.85, undefined, 0.58),
  P("crate", -280, 0.9, undefined, 0.64),
  P("grass", -216, 1, undefined, 0.84),
  P("grass", 8, 1, undefined, 0.88),
  P("grass", 190, 0.95, undefined, 0.78),
];
// A SEPULTURA DOS PAIS (35:29): a pedra da cova onde os dois irmãos, juntos,
// recolhem Isaque ao seu povo.
const HEBROM_SEPULTURA: StagePropSpec[] = [
  ...HEBROM,
  { ...P("rock", -146, 1.45, undefined, 0.2), tag: "cova-macpela" },
  { kind: "starfield", dx: -20, dy: 0.8, scale: 1.25, sky: true },
  { kind: "starfield", dx: 180, dy: 0.66, scale: 1.0, sky: true },
];

// ---------------------------------------------------------------------------
// GN 36 — CANAÃ (36:1-5): a casa de Esaú antes da partida, ainda na terra do
// pai: tendas grandes, feira, poço, o gado que vai crescer até não caber.
const CANAA: StagePropSpec[] = [
  P("tent", 208, 1.3, undefined, 0.12),
  P("tent", 282, 1.05, undefined, 0.34),
  P("stall", -298, 0.95, undefined, 0.22),
  P("well", 322, 1, undefined, 0.16),
  P("campfire", 150, 1, 1, 0.6),
  P("amphora", 240, 0.85, undefined, 0.56),
  P("crate", -258, 0.9, undefined, 0.5),
  P("rock", 40, 0.55, undefined, 0.26),
  P("rock", 302, 0.85, undefined, 0.74),
  P("bush", -318, 0.9, undefined, 0.44),
  P("bush", 124, 0.85, undefined, 0.7),
  P("tree", -60, 1.15, undefined, 0.06),
  P("tree", 88, 0.95, undefined, 0.04),
  P("grass", -228, 1, undefined, 0.82),
  P("grass", 16, 1, undefined, 0.86),
  P("grass", 200, 0.95, undefined, 0.78),
];

// A PARTIDA (36:6-7) — "os bens deles eram muitos para habitarem juntos":
// estrada de deserto, os fardos de toda a casa, e nenhuma tenda armada.
const PARTIDA: StagePropSpec[] = [
  P("rock", -252, 1.0, undefined, 0.24),
  P("rock", 48, 0.55, undefined, 0.22),
  P("rock", 208, 0.9, undefined, 0.32),
  P("rock", 308, 1.15, undefined, 0.62),
  P("crate", -58, 0.8, undefined, 0.54),     // todos os seus bens adquiridos
  P("crate", -90, 0.7, undefined, 0.7),
  P("bush", -300, 0.9, undefined, 0.48),
  P("bush", 122, 0.85, undefined, 0.7),
  P("tree", 72, 1.0, undefined, 0.04),
  P("palm", 260, 1.05, undefined, 0.14),
  P("grass", -220, 1, undefined, 0.82),
  P("grass", 20, 0.95, undefined, 0.88),
  P("grass", 240, 1, undefined, 0.76),
];

// A MONTANHA DE SEIR (36:8-19) — a pátria de Edom: rocha, tendas de clã,
// fogueira do arraial. Palco do memorial dos filhos e dos príncipes.
const SEIR: StagePropSpec[] = [
  P("rock", -248, 1.1, undefined, 0.2),
  P("rock", -36, 0.6, undefined, 0.5),
  P("rock", 206, 1.0, undefined, 0.3),
  P("rock", 312, 1.2, undefined, 0.6),
  P("tent", 240, 1.25, undefined, 0.1),
  P("tent", 296, 1.0, undefined, 0.36),
  P("stall", -330, 0.9, undefined, 0.2),
  P("campfire", 156, 1, 1, 0.58),
  P("bush", -308, 0.9, undefined, 0.46),
  P("bush", 116, 0.85, undefined, 0.68),
  P("tree", -66, 1.15, undefined, 0.06),
  P("tree", 66, 1.0, undefined, 0.04),
  P("grass", -224, 1, undefined, 0.82),
  P("grass", 24, 0.95, undefined, 0.88),
  P("grass", 236, 1, undefined, 0.76),
];
// as noites do memorial: o céu de Seir marcando as gerações que passam
const SEIR_NOITE: StagePropSpec[] = [
  ...SEIR,
  { kind: "starfield", dx: -20, dy: 0.8, scale: 1.25, sky: true },
  { kind: "starfield", dx: 180, dy: 0.66, scale: 1.0, sky: true },
];
// O FECHO (36:40-43): "segundo as suas habitações, na terra da sua possessão"
// — as tendas dos príncipes ocupam até o corredor da frente.
const SEIR_HABITACOES: StagePropSpec[] = [
  ...SEIR,
  P("tent", -150, 1.15, undefined, 0.16),
  P("tent", -192, 0.95, undefined, 0.36),
];

// A TERRA DOS HOREUS (36:20-30) — os moradores antigos daquela terra: pasto
// magro, poço, jumentos. Mundo de pastores, anterior aos reis.
const HOREUS: StagePropSpec[] = [
  P("rock", -256, 1.05, undefined, 0.22),
  P("rock", -40, 0.6, undefined, 0.52),
  P("rock", 200, 0.95, undefined, 0.3),
  P("rock", 316, 1.15, undefined, 0.62),
  P("tent", 248, 1.2, undefined, 0.1),
  P("tent", 300, 1.0, undefined, 0.36),
  P("well", 322, 1, undefined, 0.16),
  P("campfire", 150, 1, 1, 0.6),
  P("bush", -312, 0.9, undefined, 0.48),
  P("bush", 110, 0.85, undefined, 0.7),
  P("tree", -70, 1.15, undefined, 0.06),
  P("tree", 60, 1.0, undefined, 0.04),
  P("grass", -230, 1, undefined, 0.84),
  P("grass", 18, 0.95, undefined, 0.88),
  P("grass", 226, 1, undefined, 0.78),
];
const HOREUS_NOITE: StagePropSpec[] = [
  ...HOREUS,
  { kind: "starfield", dx: -20, dy: 0.8, scale: 1.25, sky: true },
  { kind: "starfield", dx: 180, dy: 0.66, scale: 1.0, sky: true },
];
// AS FONTES TERMAIS (36:24): o achado de Aná no deserto, apascentando os
// jumentos de seu pai — a única cena de ação de toda a genealogia.
const HOREUS_FONTES: StagePropSpec[] = [...HOREUS, P("well", -142, 1.35, undefined, 0.22)];

// OS REIS DE EDOM (36:31-39) — a cidade real: a torre, o mercado, e no centro
// O TRONO, que no v.31 aparece VAZIO ("antes que reinasse rei algum sobre os
// filhos de Israel"). Oito reis o ocupam, um derrubando o outro.
const EDOM_REIS: StagePropSpec[] = [
  P("throne", -20, 1.15, undefined, 0.2),    // o trono de Edom
  P("tower", 200, 1.3, undefined, 0.08),
  P("tent", 268, 1.1, undefined, 0.34),
  P("stall", -296, 0.95, undefined, 0.22),
  P("well", 320, 1, undefined, 0.16),
  P("amphora", 236, 0.85, undefined, 0.58),
  P("crate", -256, 0.9, undefined, 0.5),
  P("crate", -290, 0.8, undefined, 0.68),
  P("rock", 60, 0.55, undefined, 0.28),
  P("rock", 304, 0.9, undefined, 0.72),
  P("bush", -330, 0.85, undefined, 0.42),
  P("bush", 132, 0.85, undefined, 0.68),
  P("tree", -70, 1.1, undefined, 0.05),
  P("grass", -220, 1, undefined, 0.84),
  P("grass", 20, 1, undefined, 0.9),
  P("grass", 180, 0.95, undefined, 0.78),
];
// REOBOTE, "junto ao rio" (36:37) — a cidade de Saul, o sétimo rei
const EDOM_REIS_RIO: StagePropSpec[] = [...EDOM_REIS, P("river", -150, 1.15, undefined, 0.14)];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Gn 35
  // DE VOLTA A BETEL. Arco de env: a manhã de Siquém com a ORDEM do céu
  // (glory 0.5) → a purificação e o enterro dos ídolos (glória baixa, night
  // sobe) → a partida sob o TERROR DE DEUS (night 0.3, storm 0.15) → EL-BETEL
  // (glory 0.5) → o luto de Débora (night 0.3) → A TEOFANIA (glory 0.9) e o
  // recolher da luz (0.5) → a coluna (0.6) → o MERGULHO de Efrata (night 0.6,
  // glory 0.1: a morte de Raquel) → Migdal Eder e o pecado de Rúben (night
  // 0.35, storm 0.12) → o MEMORIAL DOS DOZE (glory 0.4→0.5) → HEBROM e a
  // morte de Isaque (night 0.35, glory 0.3 — dignidade, não escuridão).
  35: {
    start: { terrain: "field", night: 0.2, glory: 0.15, storm: 0 },
    beats: [
      // ---- ATO 1: a ordem, a purificação, o funeral dos ídolos
      b(1, { by: "deus", q: "Depois disse Deus a Jacó: ", props: SIQUEM, env: { glory: 0.5, night: 0.12 }, cast: [           // A VOZ DE DEUS (voz do céu): sobe a Betel e faze um altar
        C("jaco", -24, "stand", { dy: 0.55 }),
      ] }),
      b(2, { by: "jaco", q: "Então disse Jacó à sua família, e a todos os que com ele estavam: ", env: { glory: 0.3 }, cast: [
        C("jaco", -46, "point", { dy: 0.56, facing: 1 }),
        C("mulherComum", 24, "stand", { dy: 0.55, facing: -1, id: "lia" }),
        C("homem", 78, "stand", { dy: 0.48, facing: -1, id: "filhoA" }),
        C("homem", 126, "stand", { dy: 0.6, facing: -1, id: "filhoB" }),
        C("rebanho", 236, "stand", { dy: 0.32 }),
      ] }),                                                                     // Tirai os deuses estranhos, purificai-vos, mudai as vestes
      b(3, { by: "jaco", env: { glory: 0.38 }, cast: [                          // subamos a Betel — ao Deus que me respondeu na angústia
        C("jaco", -42, "raise", { dy: 0.56, facing: 1 }),
        C("mulherComum", 24, "stand", { dy: 0.55, facing: -1, id: "lia" }),
        C("homem", 78, "bow", { dy: 0.48, facing: -1, id: "filhoA" }),
        C("homem", 126, "stand", { dy: 0.6, facing: -1, id: "filhoB" }),
        C("rebanho", 236, "stand", { dy: 0.32 }),
      ] }),
      b(4, { props: SIQUEM_ENTERRO, env: { glory: 0.2, night: 0.22 }, cast: [   // deuses e arrecadas ESCONDIDOS debaixo do carvalho
        C("jaco", -112, "kneel", { dy: 0.58, facing: -1 }),
        C("mulherComum", -34, "bow", { dy: 0.6, facing: -1, id: "lia" }),
        C("homem", 30, "stand", { dy: 0.5, facing: -1, id: "filhoA" }),
        C("homem", 84, "stand", { dy: 0.62, facing: -1, id: "filhoB" }),
      ] }),
      b(5, { props: SIQUEM_CARVALHO, env: { night: 0.3, storm: 0.15, glory: 0.18 }, cast: [
        C("jaco", -20, "walk", { dy: 0.52, facing: 1 }),
        C("mulherComum", -88, "walk", { dy: 0.6, facing: 1, id: "lia" }),
        C("homem", -146, "walk", { dy: 0.46, facing: 1, id: "filhoA" }),
        C("rebanho", 150, "walk", { dy: 0.36 }),
      ] }),                                                                     // partiram: o TERROR DE DEUS sobre as cidades ao redor
      // ---- ATO 2: EL-BETEL, o altar e o primeiro luto
      b(6, { set: "betel", props: BETEL, env: { terrain: "mountain", night: 0.14, storm: 0, glory: 0.32 }, cast: [
        C("jaco", -44, "walk", { dy: 0.54, facing: 1 }),
        C("mulherComum", 26, "walk", { dy: 0.56, facing: 1, id: "lia" }),
        C("homem", 84, "walk", { dy: 0.46, facing: 1, id: "filhoA" }),
        C("rebanho", 200, "stand", { dy: 0.32 }),
      ] }),                                                                     // chegou a Luz, na terra de Canaã — esta é BETEL
      b(7, { props: BETEL_ALTAR, env: { glory: 0.5 }, cast: [                   // edificou o altar e chamou o lugar EL-BETEL
        C("jaco", -58, "kneel", { dy: 0.56, facing: -1 }),
        C("mulherComum", 20, "bow", { dy: 0.56, facing: -1, id: "lia" }),
        C("homem", 76, "bow", { dy: 0.46, facing: -1, id: "filhoA" }),
      ] }),
      b(8, { props: BETEL_CARVALHO, env: { night: 0.3, glory: 0.2 }, cast: [    // morreu DÉBORA, ama de Rebeca — o carvalho ALOM-BACUTE
        C("mulherComum", -126, "lie", { dy: 0.6, id: "debora" }),
        C("jaco", -40, "bow", { dy: 0.55, facing: -1 }),
        C("mulherComum", 34, "bow", { dy: 0.56, facing: -1, id: "lia" }),
      ] }),
      // ---- ATO 3: A TEOFANIA — a luz cresce, ninguém é desenhado
      b(9, { env: { night: 0.12, glory: 0.75 }, cast: [                         // E APARECEU DEUS OUTRA VEZ a Jacó — e abençoou-o
        C("jaco", -8, "kneel", { dy: 0.54 }),
      ] }),
      b(10, { by: "deus", q: "E disse-lhe Deus: ", env: { glory: 0.85 } }),                                          // Deus: não mais Jacó: ISRAEL será o teu nome
      b(11, { by: "deus", q: "Disse-lhe mais Deus: ", env: { glory: 0.9 }, cast: [                                      // Deus: Eu sou o Deus Todo-Poderoso — reis sairão de ti
        C("jaco", -8, "raise", { dy: 0.54 }),
      ] }),
      b(12, { by: "deus", env: { glory: 0.9 }, cast: [                                      // Deus: a TERRA de Abraão e de Isaque, à tua descendência
        C("jaco", -8, "bow", { dy: 0.54 }),
      ] }),
      b(13, { env: { glory: 0.5, night: 0.08 }, cast: [                         // e Deus SUBIU dele — a luz recolhe-se
        C("jaco", -8, "kneel", { dy: 0.54 }),
      ] }),
      b(14, { props: BETEL_COLUNA, env: { glory: 0.56 }, cast: [                // a COLUNA DE PEDRA: libação e azeite derramados
        C("jaco", -156, "raise", { dy: 0.5, facing: -1 }),
      ] }),
      b(15, { env: { glory: 0.6 }, cast: [                                      // chamou aquele lugar BETEL
        C("jaco", -132, "stand", { dy: 0.52, facing: -1 }),
      ] }),
      // ---- ATO 4: O CAMINHO DE EFRATA — o beat mais triste do capítulo
      b(16, { set: "efrata", props: EFRATA_NOITE, env: { terrain: "desert", night: 0.5, glory: 0.14 }, cast: [
        C("jaco", -96, "stand", { dy: 0.5, facing: 1 }),
        C("mulherComum", -18, "kneel", { dy: 0.6, id: "raquel" }),
        C("mulherComum", 44, "kneel", { dy: 0.56, facing: -1, id: "parteira" }),
      ] }),                                                                     // partiram de Betel: Raquel deu à luz com TRABALHO
      b(17, { by: "mulherComum", q: "lhe disse a parteira: ", env: { night: 0.55 }, cast: [
        C("jaco", -96, "stand", { dy: 0.5, facing: 1 }),
        C("mulherComum", -14, "lie", { dy: 0.6, id: "raquel" }),
        C("mulherComum", 36, "point", { dy: 0.56, facing: -1, id: "parteira" }),
      ] }),                                                                     // NÃO TEMAS: também este filho terás
      b(18, { env: { night: 0.6, glory: 0.08 }, cast: [                         // saindo-se-lhe a alma: BENONI — o pai: BENJAMIM
        C("mulherComum", -14, "lie", { dy: 0.6, id: "raquel" }),
        C("jaco", -62, "kneel", { dy: 0.56, facing: 1 }),
        C("mulherComum", 40, "bow", { dy: 0.54, facing: -1, id: "parteira" }),
      ] }),
      b(19, { env: { night: 0.6, glory: 0.1 }, cast: [                          // assim MORREU RAQUEL, sepultada no caminho de Efrata
        C("jaco", -24, "bow", { dy: 0.56, facing: -1 }),
        C("mulherComum", 44, "bow", { dy: 0.54, facing: -1, id: "parteira" }),
        C("homem", 114, "stand", { dy: 0.46, facing: -1, id: "filhoA" }),
      ] }),
      b(20, { props: EFRATA_SEPULCRO, env: { night: 0.5, glory: 0.22 }, cast: [ // a COLUNA da sepultura de Raquel, até o dia de hoje
        C("jaco", -100, "kneel", { dy: 0.52, facing: -1 }),
        C("homem", -16, "stand", { dy: 0.58, facing: -1, id: "filhoA" }),
      ] }),
      // ---- ATO 5: Migdal Eder — a queda de Rúben, dita em voz baixa
      b(21, { set: "migdal", props: MIGDAL, env: { terrain: "field", night: 0.3, glory: 0.2 }, cast: [
        C("jaco", -18, "stand", { dy: 0.55, facing: 1 }),
        C("homem", 60, "stand", { dy: 0.48, facing: -1, id: "filhoA" }),
        C("rebanho", 176, "stand", { dy: 0.34 }),
      ] }),                                                                     // Israel estendeu a sua tenda além de MIGDAL EDER
      b(22, { env: { night: 0.35, storm: 0.12, glory: 0.05 }, cast: [           // o pecado de RÚBEN — e Israel o soube. Eram DOZE
        C("homem", -66, "stand", { dy: 0.6, facing: 1, id: "ruben" }),
        C("mulherComum", 4, "stand", { dy: 0.62, facing: -1, id: "bila" }),
        C("jaco", 118, "stand", { dy: 0.46, facing: -1 }),
      ] }),
      // ---- ATO 6: O MEMORIAL DOS DOZE (a família virou nação)
      b(23, { env: { night: 0.2, storm: 0, glory: 0.4 }, cast: [                // os filhos de LIA, seis em fileira
        C("jaco", -178, "stand", { dy: 0.42, facing: 1 }),
        C("homem", -112, "stand", { dy: 0.5, id: "ruben" }),
        C("homem", -58, "stand", { dy: 0.58, id: "simeao" }),
        C("homem", -4, "stand", { dy: 0.5, id: "levi" }),
        C("homem", 50, "stand", { dy: 0.58, id: "juda" }),
        C("homem", 104, "stand", { dy: 0.5, id: "issacar" }),
        C("homem", 158, "stand", { dy: 0.58, id: "zebulom" }),
      ] }),
      b(24, { env: { glory: 0.45 }, cast: [                                     // os filhos de RAQUEL: JOSÉ (a túnica) e Benjamim
        C("jaco", -164, "stand", { dy: 0.42, facing: 1 }),
        C("jose", -34, "stand", { dy: 0.52, glow: 0.35, id: "jose" }),
        C("homem", 28, "stand", { dy: 0.58, id: "benjamim" }),
      ] }),
      b(25, { env: { night: 0.16, glory: 0.45 }, cast: [                        // os filhos de BILA, serva de Raquel: Dã e Naftali
        C("jaco", -164, "stand", { dy: 0.42, facing: 1 }),
        C("homem", -34, "stand", { dy: 0.52, id: "da" }),
        C("homem", 28, "stand", { dy: 0.58, id: "naftali" }),
      ] }),
      b(26, { env: { glory: 0.52 }, cast: [                                     // os filhos de ZILPA: Gade e Aser — nascidos em Padã-Arã
        C("jaco", -160, "raise", { dy: 0.42, facing: 1 }),
        C("homem", -34, "stand", { dy: 0.52, id: "gade" }),
        C("homem", 28, "stand", { dy: 0.58, id: "aser" }),
        C("jose", 92, "stand", { dy: 0.5, glow: 0.3, id: "jose" }),
      ] }),
      // ---- ATO 7: HEBROM — a morte de Isaque, sepultado pelos dois irmãos
      b(27, { set: "hebrom", props: HEBROM, env: { night: 0.2, glory: 0.35 }, cast: [
        C("jaco", -54, "walk", { dy: 0.55, facing: 1 }),
        C("isaque", 40, "stand", { dy: 0.5, facing: -1 }),
      ] }),                                                                     // Jacó veio a seu pai Isaque, a Manre — HEBROM
      b(28, { env: { night: 0.3, glory: 0.3 }, cast: [                          // foram os dias de Isaque CENTO E OITENTA ANOS
        C("jaco", -68, "stand", { dy: 0.56, facing: 1 }),
        C("isaque", 6, "stand", { dy: 0.5, facing: -1 }),
      ] }),
      b(29, { props: HEBROM_SEPULTURA, env: { night: 0.35, glory: 0.3 }, cast: [ // expirou velho e farto de dias — ESAÚ E JACÓ o sepultaram
        C("isaque", 0, "lie", { dy: 0.56 }),
        C("jaco", -62, "kneel", { dy: 0.54, facing: 1 }),
        C("esau", 62, "kneel", { dy: 0.54, facing: -1 }),
      ] }),
    ],
  },

  // ------------------------------------------------------------------ Gn 36
  // AS GERAÇÕES DE ESAÚ — memorial de EDOM. Arco de env: manhã em Canaã
  // (glory 0.35) → a partida pelo deserto (night 0.35) → Seir (glory 0.3) →
  // o CICLO DIA/NOITE das gerações (night 0.15 ↔ 0.55, geração após geração)
  // → os horeus e as fontes termais (glory 0.32) → a CIDADE DOS REIS, com o
  // trono vazio no v.31 e oito reinados alternando luz e treva (storm 0.25 na
  // batalha de Hadade contra Midiã) → o fecho na montanha (glory 0.3).
  36: {
    start: { terrain: "field", night: 0.22, glory: 0.2, storm: 0 },
    beats: [
      // ---- a casa de Esaú em Canaã
      b(1, { props: CANAA, env: { glory: 0.35, night: 0.18 }, cast: [           // estas são as gerações de ESAÚ (que é Edom)
        C("esau", -14, "stand", { dy: 0.52 }),
      ] }),
      b(2, { env: { night: 0.28, glory: 0.28 }, cast: [                         // as mulheres das filhas de Canaã: Ada e Aolibama
        C("esau", -44, "stand", { dy: 0.54, facing: 1 }),
        C("mulherComum", 22, "stand", { dy: 0.54, facing: -1, id: "ada" }),
        C("mulherComum", 76, "stand", { dy: 0.46, facing: -1, id: "aolibama" }),
      ] }),
      b(3, { env: { night: 0.2 }, cast: [                                       // e BASEMATE, filha de Ismael, irmã de Nebaiote
        C("esau", -52, "stand", { dy: 0.54, facing: 1 }),
        C("mulherComum", 16, "stand", { dy: 0.54, facing: -1, id: "ada" }),
        C("mulherComum", 70, "stand", { dy: 0.46, facing: -1, id: "aolibama" }),
        C("mulherComum", 124, "stand", { dy: 0.58, facing: -1, id: "basemate" }),
      ] }),
      b(4, { env: { night: 0.14, glory: 0.32 }, cast: [                         // Ada teve ELIFAZ; Basemate teve REUEL
        C("esau", -70, "stand", { dy: 0.52, facing: 1 }),
        C("mulherComum", -10, "stand", { dy: 0.56, facing: -1, id: "ada" }),
        C("homem", 44, "stand", { dy: 0.48, id: "elifaz" }),
        C("mulherComum", 100, "stand", { dy: 0.58, facing: -1, id: "basemate" }),
        C("homem", 154, "stand", { dy: 0.46, id: "reuel" }),
      ] }),
      b(5, { env: { night: 0.26, glory: 0.28 }, cast: [                         // Aolibama: Jeús, Jalão e Coré — nascidos em Canaã
        C("esau", -72, "stand", { dy: 0.52, facing: 1 }),
        C("mulherComum", -12, "stand", { dy: 0.58, facing: -1, id: "aolibama" }),
        C("homem", 40, "stand", { dy: 0.48, id: "jeus" }),
        C("homem", 90, "stand", { dy: 0.58, id: "jalao" }),
        C("homem", 140, "stand", { dy: 0.48, id: "core" }),
        C("rebanho", 246, "stand", { dy: 0.32 }),
      ] }),
      // ---- A PARTIDA: os bens eram muitos para habitarem juntos
      b(6, { set: "partida", props: PARTIDA, env: { terrain: "desert", night: 0.3, glory: 0.2 }, cast: [
        C("esau", -18, "walk", { dy: 0.52, facing: 1 }),
        C("mulherComum", -84, "walk", { dy: 0.6, facing: 1, id: "ada" }),
        C("homem", -142, "walk", { dy: 0.46, facing: 1, id: "elifaz" }),
        C("rebanho", 140, "walk", { dy: 0.34, id: "gadoA" }),
        C("rebanho", 252, "walk", { dy: 0.46, id: "gadoB" }),
      ] }),                                                                     // tomou casa, gado e bens e apartou-se de Jacó
      b(7, { env: { night: 0.36, glory: 0.14 }, cast: [                         // os bens eram MUITOS: a terra não os podia sustentar
        C("esau", -22, "stand", { dy: 0.52, facing: 1 }),
        C("rebanho", -178, "stand", { dy: 0.4, id: "gadoA" }),
        C("rebanho", 66, "stand", { dy: 0.3, id: "gadoB" }),
        C("rebanho", 250, "stand", { dy: 0.5, id: "gadoC" }),
      ] }),
      b(8, { set: "seir", props: SEIR, env: { terrain: "mountain", night: 0.15, glory: 0.3 }, cast: [
        C("esau", -24, "stand", { dy: 0.52, facing: 1 }),
        C("rebanho", 198, "stand", { dy: 0.32, id: "gadoA" }),
      ] }),                                                                     // habitou na MONTANHA DE SEIR — Esaú é Edom
      // ---- os filhos: as gerações trocando de marca, dia após noite
      b(9, { env: { glory: 0.36, night: 0.12 }, cast: [                         // as gerações de Esaú, PAI DOS EDOMEUS, em Seir
        C("esau", -36, "stand", { dy: 0.52, facing: 1 }),
        C("homem", 46, "stand", { dy: 0.5, id: "filhoA" }),
        C("homem", 106, "stand", { dy: 0.58, id: "filhoB" }),
      ] }),
      b(10, { env: { night: 0.2, glory: 0.3 }, cast: [                          // os nomes dos filhos: ELIFAZ e REUEL
        C("esau", -62, "stand", { dy: 0.52, facing: 1 }),
        C("homem", 8, "stand", { dy: 0.5, id: "elifaz" }),
        C("homem", 70, "stand", { dy: 0.58, id: "reuel" }),
      ] }),
      b(11, { env: { night: 0.3, glory: 0.24 }, cast: [                         // os filhos de Elifaz: Temã, Omar, Zefô, Gaetã, Quenaz
        C("homem", -112, "stand", { dy: 0.5, id: "tema" }),
        C("homem", -58, "stand", { dy: 0.58, id: "omar" }),
        C("homem", -4, "stand", { dy: 0.5, id: "zefo" }),
        C("homem", 50, "stand", { dy: 0.58, id: "gaeta" }),
        C("homem", 104, "stand", { dy: 0.5, id: "quenaz" }),
        C("patriarca", 172, "stand", { dy: 0.42, id: "elifaz" }),
      ] }),
      b(12, { props: SEIR_NOITE, env: { night: 0.46, glory: 0.14 }, cast: [     // Timna, concubina de Elifaz, teve AMALEQUE
        C("mulherComum", -44, "stand", { dy: 0.58, facing: 1, id: "timna" }),
        C("homem", 18, "stand", { dy: 0.5, id: "amaleque" }),
        C("mulherComum", 92, "stand", { dy: 0.6, facing: -1, id: "ada" }),
        C("patriarca", 168, "stand", { dy: 0.42, id: "elifaz" }),
      ] }),
      b(13, { env: { night: 0.56, glory: 0.1 }, cast: [                         // os filhos de Reuel: Naate, Zerá, Samá e Mizá
        C("homem", -104, "stand", { dy: 0.5, id: "naate" }),
        C("homem", -48, "stand", { dy: 0.58, id: "zera" }),
        C("homem", 8, "stand", { dy: 0.5, id: "sama" }),
        C("homem", 64, "stand", { dy: 0.58, id: "miza" }),
        C("patriarca", 158, "stand", { dy: 0.42, id: "reuel" }),
      ] }),
      b(14, { props: SEIR, env: { night: 0.3, glory: 0.26 }, cast: [            // os filhos de Aolibama: Jeús, Jalão e Coré
        C("mulherComum", -102, "stand", { dy: 0.56, facing: 1, id: "aolibama" }),
        C("homem", -30, "stand", { dy: 0.5, id: "jeus" }),
        C("homem", 26, "stand", { dy: 0.58, id: "jalao" }),
        C("homem", 82, "stand", { dy: 0.5, id: "core" }),
      ] }),
      // ---- OS PRÍNCIPES: a geração dos chefes (patriarcas com brilho leve)
      b(15, { env: { night: 0.14, glory: 0.42 }, cast: [                        // os PRÍNCIPES: Temã, Omar, Zefô, Quenaz
        C("patriarca", -106, "stand", { dy: 0.5, glow: 0.2, id: "prTema" }),
        C("patriarca", -46, "stand", { dy: 0.58, glow: 0.2, id: "prOmar" }),
        C("patriarca", 14, "stand", { dy: 0.5, glow: 0.2, id: "prZefo" }),
        C("patriarca", 74, "stand", { dy: 0.58, glow: 0.2, id: "prQuenaz" }),
      ] }),
      b(16, { env: { glory: 0.44 }, cast: [                                     // o príncipe Coré, Gaetã, Amaleque — filhos de Ada
        C("patriarca", -96, "stand", { dy: 0.5, glow: 0.2, id: "prCore" }),
        C("patriarca", -36, "stand", { dy: 0.58, glow: 0.2, id: "prGaeta" }),
        C("patriarca", 24, "stand", { dy: 0.5, glow: 0.2, id: "prAmaleque" }),
        C("mulherComum", 116, "stand", { dy: 0.6, facing: -1, id: "ada" }),
      ] }),
      b(17, { env: { night: 0.32, glory: 0.3 }, cast: [                         // os príncipes de Reuel: Naate, Zerá, Samá, Mizá
        C("patriarca", -104, "stand", { dy: 0.5, glow: 0.2, id: "prNaate" }),
        C("patriarca", -44, "stand", { dy: 0.58, glow: 0.2, id: "prZera" }),
        C("patriarca", 16, "stand", { dy: 0.5, glow: 0.2, id: "prSama" }),
        C("patriarca", 76, "stand", { dy: 0.58, glow: 0.2, id: "prMiza" }),
      ] }),
      b(18, { props: SEIR_NOITE, env: { night: 0.44, glory: 0.22 }, cast: [     // os príncipes de Aolibama: Jeús, Jalão, Coré
        C("patriarca", -96, "stand", { dy: 0.5, glow: 0.2, id: "prJeus" }),
        C("patriarca", -36, "stand", { dy: 0.58, glow: 0.2, id: "prJalao" }),
        C("patriarca", 24, "stand", { dy: 0.5, glow: 0.2, id: "prCore" }),
        C("mulherComum", 116, "stand", { dy: 0.6, facing: -1, id: "aolibama" }),
      ] }),
      b(19, { props: SEIR, env: { night: 0.18, glory: 0.5 }, cast: [            // estes são os filhos de Esaú e seus príncipes: ELE É EDOM
        C("esau", -10, "raise", { dy: 0.52 }),
        C("patriarca", 92, "stand", { dy: 0.48, glow: 0.2, id: "prTema" }),
        C("patriarca", 152, "stand", { dy: 0.58, glow: 0.2, id: "prQuenaz" }),
      ] }),
      // ---- OS FILHOS DE SEIR, O HOREU: os moradores antigos da terra
      b(20, { set: "horeus", props: HOREUS, env: { night: 0.25, glory: 0.3 }, cast: [
        C("patriarca", -110, "stand", { dy: 0.44, id: "seir" }),
        C("homem", -34, "stand", { dy: 0.5, id: "lota" }),
        C("homem", 22, "stand", { dy: 0.58, id: "sobal" }),
        C("homem", 78, "stand", { dy: 0.5, id: "zibeao" }),
        C("homem", 134, "stand", { dy: 0.58, id: "ana" }),
      ] }),                                                                     // os filhos de Seir, horeu: Lotã, Sobal, Zibeão e Aná
      b(21, { env: { night: 0.36, glory: 0.24 }, cast: [                        // Disom, Eser e Disã — príncipes dos horeus
        C("patriarca", -108, "stand", { dy: 0.44, id: "seir" }),
        C("homem", -30, "stand", { dy: 0.5, id: "disom" }),
        C("homem", 30, "stand", { dy: 0.58, id: "eser" }),
        C("homem", 90, "stand", { dy: 0.5, id: "disa" }),
      ] }),
      b(22, { props: HOREUS_NOITE, env: { night: 0.5, glory: 0.14 }, cast: [    // os filhos de Lotã: Hori e Homã; a irmã, Timna
        C("homem", -52, "stand", { dy: 0.5, id: "hori" }),
        C("homem", 4, "stand", { dy: 0.58, id: "homa" }),
        C("mulherComum", 66, "stand", { dy: 0.54, facing: -1, id: "timna" }),
        C("patriarca", 150, "stand", { dy: 0.44, id: "lota" }),
      ] }),
      b(23, { env: { night: 0.56, glory: 0.1 }, cast: [                         // os filhos de Sobal: Alvã, Manaate, Ebal, Sefô, Onã
        C("homem", -114, "stand", { dy: 0.5, id: "alva" }),
        C("homem", -58, "stand", { dy: 0.58, id: "manaate" }),
        C("homem", -2, "stand", { dy: 0.5, id: "ebal" }),
        C("homem", 54, "stand", { dy: 0.58, id: "sefo" }),
        C("homem", 110, "stand", { dy: 0.5, id: "ona-horeu" }),
        C("patriarca", 176, "stand", { dy: 0.42, id: "sobal" }),
      ] }),
      b(24, { props: HOREUS_FONTES, env: { night: 0.2, glory: 0.34 }, cast: [   // ANÁ ACHOU AS FONTES TERMAIS, apascentando os jumentos
        C("pastor", -104, "kneel", { dy: 0.56, facing: -1, id: "ana" }),
        C("homem", -22, "stand", { dy: 0.5, id: "aia" }),
        C("rebanho", 76, "stand", { dy: 0.34, id: "jumentos" }),
        C("patriarca", 170, "stand", { dy: 0.44, id: "zibeao" }),
      ] }),
      b(25, { props: HOREUS, env: { night: 0.32, glory: 0.26 }, cast: [         // os filhos de Aná: Disom e AOLIBAMA, a filha de Aná
        C("homem", -40, "stand", { dy: 0.5, id: "disom" }),
        C("mulherComum", 22, "stand", { dy: 0.56, facing: -1, id: "aolibama" }),
        C("patriarca", 108, "stand", { dy: 0.44, id: "ana" }),
      ] }),
      b(26, { props: HOREUS_NOITE, env: { night: 0.46, glory: 0.14 }, cast: [   // os filhos de Disã: Hendã, Esbã, Itrã e Querã
        C("homem", -104, "stand", { dy: 0.5, id: "henda" }),
        C("homem", -48, "stand", { dy: 0.58, id: "esba" }),
        C("homem", 8, "stand", { dy: 0.5, id: "itra" }),
        C("homem", 64, "stand", { dy: 0.58, id: "quera" }),
      ] }),
      b(27, { env: { night: 0.58, glory: 0.08 }, cast: [                        // os filhos de Eser: Bilã, Zaavã e Acã
        C("homem", -60, "stand", { dy: 0.5, id: "bila-horeu" }),
        C("homem", -4, "stand", { dy: 0.58, id: "zaava" }),
        C("homem", 52, "stand", { dy: 0.5, id: "aca" }),
      ] }),
      b(28, { props: HOREUS, env: { night: 0.34, glory: 0.22 }, cast: [         // os filhos de Disã: Uz e Arã
        C("homem", -34, "stand", { dy: 0.5, id: "uz" }),
        C("homem", 26, "stand", { dy: 0.58, id: "ara" }),
      ] }),
      b(29, { env: { night: 0.14, glory: 0.42 }, cast: [                        // os PRÍNCIPES dos horeus: Lotã, Sobal, Zibeão, Aná
        C("patriarca", -106, "stand", { dy: 0.5, glow: 0.2, id: "prLota" }),
        C("patriarca", -46, "stand", { dy: 0.58, glow: 0.2, id: "prSobal" }),
        C("patriarca", 14, "stand", { dy: 0.5, glow: 0.2, id: "prZibeao" }),
        C("patriarca", 74, "stand", { dy: 0.58, glow: 0.2, id: "prAna" }),
      ] }),
      b(30, { env: { glory: 0.46 }, cast: [                                     // Disom, Eser, Disã: os principados na terra de Seir
        C("patriarca", -96, "stand", { dy: 0.5, glow: 0.2, id: "prDisom" }),
        C("patriarca", -36, "stand", { dy: 0.58, glow: 0.2, id: "prEser" }),
        C("patriarca", 24, "stand", { dy: 0.5, glow: 0.2, id: "prDisa" }),
      ] }),
      // ---- OS REIS DE EDOM: o trono vazio, e oito reinados um sobre o outro
      b(31, { set: "reisEdom", props: EDOM_REIS, env: { terrain: "city", night: 0.22, glory: 0.3 }, cast: [] }),
                                                                                // O TRONO VAZIO: antes que houvesse rei em Israel
      b(32, { env: { night: 0.16, glory: 0.42 }, cast: [                        // reinou BELA, filho de Beor; sua cidade, Dinabá
        C("rei", -18, "stand", { dy: 0.44, glow: 0.35, id: "reiVivo" }),
      ] }),
      b(33, { env: { night: 0.32, glory: 0.3 }, cast: [                         // morreu Bela; JOBABE, de Bozra, reinou em seu lugar
        C("rei", -86, "lie", { dy: 0.62, id: "reiMorto" }),
        C("rei", -14, "stand", { dy: 0.44, glow: 0.35, id: "reiVivo" }),
      ] }),
      b(34, { env: { night: 0.44, glory: 0.24 }, cast: [                        // morreu Jobabe; HUSÃO, dos temanitas, reinou
        C("rei", -92, "lie", { dy: 0.62, id: "reiMorto" }),
        C("rei", -16, "stand", { dy: 0.44, glow: 0.35, id: "reiVivo" }),
      ] }),
      b(35, { env: { night: 0.3, storm: 0.25, glory: 0.2 }, cast: [             // HADADE, o que FERIU A MIDIÃ no campo de Moabe
        C("rei", -96, "lie", { dy: 0.62, id: "reiMorto" }),
        C("rei", -14, "raise", { dy: 0.44, glow: 0.4, id: "reiVivo" }),
        C("homem", 92, "bow", { dy: 0.56, facing: -1, id: "midianita" }),
      ] }),
      b(36, { env: { night: 0.46, storm: 0, glory: 0.22 }, cast: [              // morreu Hadade; SAMLÁ, de Masreca, reinou
        C("rei", -92, "lie", { dy: 0.62, id: "reiMorto" }),
        C("rei", -16, "stand", { dy: 0.44, glow: 0.35, id: "reiVivo" }),
      ] }),
      b(37, { props: EDOM_REIS_RIO, env: { night: 0.5, glory: 0.2 }, cast: [    // morreu Samlá; SAUL, de Reobote JUNTO AO RIO, reinou
        C("rei", -92, "lie", { dy: 0.62, id: "reiMorto" }),
        C("rei", -16, "stand", { dy: 0.44, glow: 0.35, id: "reiVivo" }),
      ] }),
      b(38, { props: EDOM_REIS, env: { night: 0.34, glory: 0.3 }, cast: [       // morreu Saul; BAAL-HANÃ, filho de Acbor, reinou
        C("rei", -92, "lie", { dy: 0.62, id: "reiMorto" }),
        C("rei", -16, "stand", { dy: 0.44, glow: 0.35, id: "reiVivo" }),
      ] }),
      b(39, { env: { night: 0.18, glory: 0.44 }, cast: [                        // HADAR, o último: cidade Pau, mulher Meetabel
        C("rei", -96, "lie", { dy: 0.62, id: "reiMorto" }),
        C("rei", -18, "stand", { dy: 0.44, glow: 0.4, id: "reiVivo" }),
        C("mulherComum", 62, "stand", { dy: 0.56, facing: -1, id: "meetabel" }),
      ] }),
      // ---- FECHO: os príncipes de Edom nas suas habitações
      b(40, { set: "seirFinal", props: SEIR_HABITACOES, env: { terrain: "mountain", night: 0.26, glory: 0.3 }, cast: [
        C("patriarca", -66, "stand", { dy: 0.5, glow: 0.2, id: "prTimna" }),
        C("patriarca", -6, "stand", { dy: 0.58, glow: 0.2, id: "prAlva" }),
        C("patriarca", 54, "stand", { dy: 0.5, glow: 0.2, id: "prJetete" }),
      ] }),                                                                     // os príncipes de Esaú: Timna, Alva, Jetete
      b(41, { env: { night: 0.36, glory: 0.26 }, cast: [                        // o príncipe Aolibama, Ela, Pinom
        C("patriarca", -66, "stand", { dy: 0.5, glow: 0.2, id: "prAolibama" }),
        C("patriarca", -6, "stand", { dy: 0.58, glow: 0.2, id: "prEla" }),
        C("patriarca", 54, "stand", { dy: 0.5, glow: 0.2, id: "prPinom" }),
      ] }),
      b(42, { env: { night: 0.2, glory: 0.3 }, cast: [                          // o príncipe Quenaz, Temã, Mibzar
        C("patriarca", -66, "stand", { dy: 0.5, glow: 0.2, id: "prQuenaz" }),
        C("patriarca", -6, "stand", { dy: 0.58, glow: 0.2, id: "prTema" }),
        C("patriarca", 54, "stand", { dy: 0.5, glow: 0.2, id: "prMibzar" }),
      ] }),
      b(43, { env: { night: 0.24, glory: 0.32 }, cast: [                        // Magdiel e Irã — ESTE É ESAÚ, PAI DE EDOM
        C("patriarca", -132, "stand", { dy: 0.5, glow: 0.2, id: "prMagdiel" }),
        C("patriarca", -74, "stand", { dy: 0.58, glow: 0.2, id: "prIra" }),
        C("esau", 10, "raise", { dy: 0.52 }),
        C("rebanho", 216, "stand", { dy: 0.34, id: "gadoA" }),
      ] }),
    ],
  },
};
