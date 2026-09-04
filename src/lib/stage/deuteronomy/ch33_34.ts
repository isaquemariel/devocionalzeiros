// ============================================================================
// DEUTERONÔMIO 33–34 — CENA VIVA. O FECHO DO PENTATEUCO.
//
// Dt 33 — A BÊNÇÃO DE MOISÉS, homem de Deus, sobre as TRIBOS antes de morrer.
// Abre com a teofania luminosa de Sinai: "O Senhor veio de Sinai… à sua direita
// havia para eles o fogo da lei" (33:2). Moisés, de braços erguidos e glória
// sobre si, abençoa tribo a tribo — Rúben, Judá, Levi, Benjamim que "habitará
// seguro", José cuja terra é "bendita do Senhor", até o ÁPICE amado de todos:
// "Não há outro… semelhante a Deus, que cavalga sobre os céus para a tua ajuda"
// (33:26); "O Deus eterno é a tua habitação, e por baixo estão os braços
// eternos" (33:27); "Bem-aventurado tu, ó Israel! Quem é como tu?" (33:29).
//
// Dt 34 — MOISÉS SOBE O NEBO, ao cume do PISGA, e o Senhor lhe MOSTRA toda a
// terra: Gileade, Dã, Naftali, Efraim, Manassés, Judá até ao mar, o sul, a
// campina de Jericó "a cidade das palmeiras", até Zoar (panorama verdejante,
// rio, palmeiras, torres ao longe). "Eu te faço vê-la com os teus olhos, porém
// lá não passarás" (34:4, voz do céu). MOISÉS MORRE ali, aos 120 anos, o vigor
// intacto; Deus mesmo o sepulta num vale e "ninguém soube até hoje o lugar da
// sua sepultura" (34:6). O povo o pranteia 30 dias. JOSUÉ, cheio do espírito de
// sabedoria, assume. E o epitáfio: "nunca mais se levantou em Israel profeta
// algum como Moisés, a quem o Senhor conhecera face a face" (34:10).
//
// A VOZ (regra do projeto): MOISÉS é o mediador visível que abençoa
// (`by: "moises"`, glória sobre si). Só em 34:4 a VOZ DO CÉU fala diretamente
// (`by: "deus"`), mostrando a terra e vedando a entrada.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });
const mv = (v: number, q?: string) => b(v, { by: "moises", ...(q ? { q } : {}) }); // Moisés abençoa
const dv = (v: number, q?: string) => b(v, { by: "deus", ...(q ? { q } : {}) });   // voz do céu

// Campinas de Moabe: as tribos reunidas diante de Moisés, o Jordão e o alto ao fundo.
const CONGREGACAO: StagePropSpec[] = [
  P("tent", -280, 1.0, undefined, 0.2),
  P("tent", 250, 1.0, undefined, 0.22),
  P("palm", -320, 1.05, undefined, 0.14),
  P("rock", 300, 1.2, undefined, 0.28),
  P("grass", -70, 0.82, undefined, 0.82),
  P("grass", 70, 0.78, undefined, 0.74),
];

// Panorama da terra prometida, vista do cume do Pisga: verdura, rio, palmeiras, torres ao longe.
const PANORAMA: StagePropSpec[] = [
  { ...P("rock", -270, 1.9, undefined, 0.5), tag: "cume-do-pisga" }, // o cume do Pisga onde Moisés está, no alto e à frente
  P("river", 0, 1.0, undefined, 0.4),       // o vale e o Jordão lá embaixo, empurrados ao fundo
  P("palm", -210, 0.8, undefined, 0.4),
  P("palm", 220, 0.85, undefined, 0.38),
  P("tower", -110, 0.6, undefined, 0.38),   // as cidades da terra, ao longe
  P("tower", 150, 0.6, undefined, 0.36),
  P("grass", -60, 0.8, undefined, 0.82),
  P("grass", 90, 0.78, undefined, 0.78),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Dt 33
  33: {
    start: { terrain: "field", night: 0.06, glory: 0.72, storm: 0, fire: 0, verdure: 0.5 },
    beats: [
      // v.1 — Moisés, homem de Deus, abençoa Israel antes da morte (moldura).
      b(1, { props: CONGREGACAO, env: { terrain: "field", glory: 0.74, night: 0.06, verdure: 0.5 }, cast: [
        C("moises", -140, "raise", { glow: 0.35, dy: 0.5, facing: 1 }),
        C("multidao", 150, "stand", { dy: 0.46 }),
      ] }),
      // v.2 — TEOFANIA (flashback): o Senhor veio de Sinai; à sua direita o FOGO DA LEI.
      b(2, { by: "moises", q: "o fogo da lei", env: { terrain: "mountain", glory: 0.85, night: 0.12, fire: 0.5 }, props: [
        { ...P("campfire", 20, 1.4, 0.9, 0.34), tag: "fogo-da-lei" },
        P("pillar", 20, 1.6, 0.8, 0.2),
        P("rock", -220, 1.3, undefined, 0.36),
        P("rock", 240, 1.2, undefined, 0.34),
      ], cast: [
        C("moises", -150, "raise", { glow: 0.4, dy: 0.5, facing: 1 }),
      ] }),
      // v.3 — na verdade ama os povos; todos os seus santos na sua mão.
      b(3, { by: "moises", env: { terrain: "field", glory: 0.74, night: 0.06, verdure: 0.5 }, props: CONGREGACAO, cast: [
        C("moises", -140, "raise", { glow: 0.35, dy: 0.5, facing: 1 }),
        C("multidao", 150, "stand", { dy: 0.46 }),
      ] }),
      // v.4 — Moisés nos deu a LEI, herança de Jacó.
      mv(4, "Moisés nos deu a lei"),
      mv(5),
      // v.6 — RÚBEN: viva, e não morra.
      mv(6, "Viva Rúben, e não morra"),
      // v.7 — JUDÁ: ouve, ó Senhor, a voz de Judá.
      mv(7, "a voz de Judá"),
      // v.8 — LEVI: Tumim e Urim.
      b(8, { by: "moises", q: "Teu Tumim e teu Urim", props: [ ...CONGREGACAO, P("altar", 20, 1.0, undefined, 0.5) ], cast: [
        C("moises", -140, "raise", { glow: 0.35, dy: 0.5, facing: 1 }),
        C("multidao", 160, "stand", { dy: 0.46 }),
      ] }),
      mv(9),
      // v.10 — Levi põe incenso e holocausto no altar.
      mv(10, "puseram incenso no teu nariz"),
      mv(11),
      // v.12 — BENJAMIM: o amado do Senhor habitará seguro.
      mv(12, "habitará seguro com ele"),
      // v.13 — JOSÉ: bendita do Senhor seja a sua terra.
      b(13, { by: "moises", q: "Bendita do Senhor seja a sua terra", props: CONGREGACAO, env: { glory: 0.78, verdure: 0.62 }, cast: [ // cenário limpo, sem herdar o altar do v8
        C("moises", -140, "raise", { glow: 0.4, dy: 0.5, facing: 1 }),
        C("multidao", 150, "stand", { dy: 0.46 }),
      ] }),
      mv(14),
      mv(15),
      // v.16 — a benevolência daquele que habitava na SARÇA sobre a cabeça de José.
      b(16, { by: "moises", q: "daquele que habitava na sarça", props: [ ...CONGREGACAO, { ...P("bush", 30, 1.0, 0.7, 0.5), tag: "sarca" } ], cast: [
        C("moises", -140, "raise", { glow: 0.4, dy: 0.5, facing: 1 }),
        C("multidao", 160, "stand", { dy: 0.46 }),
      ] }),
      // v.17-25 — TRIBO A TRIBO. Cada bênção tem a sua paisagem e o seu objeto:
      // o gado de José, os navios de Zebulom e as tendas de Issacar, o monte das
      // ofertas, a terra larga de Gade, a porção do legislador, os penhascos de
      // Basã, as águas de Naftali, o azeite de Aser e os ferrolhos de ferro.
      b(17, { by: "moises", q: "os seus chifres são chifres de boi selvagem", set: "jose", props: [
        { ...P("stall", -20, 1.2, undefined, 0.5), tag: "curral-primogenitos" },
        P("tower", -260, 1.0, undefined, 0.2),
        P("tower", 265, 0.95, undefined, 0.24),
        P("sheaf", 130, 1.0, undefined, 0.62),
        P("grass", 60, 0.85, undefined, 0.82),
      ], env: { terrain: "field", glory: 0.82, night: 0.06, verdure: 0.66 }, cast: [
        C("moises", -160, "raise", { glow: 0.42, dy: 0.5, facing: 1 }),
        C("multidao", 190, "stand", { dy: 0.5 }),
      ] }),
      b(18, { by: "moises", q: "Zebulom, alegra-te nas tuas saídas; e tu, Issacar, nas tuas tendas", set: "zebulom-e-issacar", props: [
        P("river", 130, 1.45, undefined, 0.6),
        P("boat", 60, 1.1, undefined, 0.44),
        P("tent", -190, 1.25, undefined, 0.34),
        P("tent", -290, 1.05, undefined, 0.46),
        P("grass", -40, 0.82, undefined, 0.84),
      ], env: { terrain: "field", glory: 0.74, night: 0.08, verdure: 0.5, water: 0.6 }, cast: [
        C("moises", -320, "raise", { glow: 0.36, dy: 0.48, facing: -1 }),
        C("multidao", 230, "raise", { scale: 0.9, dy: 0.5 }),
      ] }),
      b(19, { by: "moises", q: "Eles chamarão os povos ao monte", set: "monte-das-ofertas", props: [
        P("rock", -40, 1.75, undefined, 0.24),
        { ...P("altar", 105, 1.05, 0.65, 0.5), tag: "altar-ofertas" },
        P("river", 245, 1.2, undefined, 0.74),
        P("crate", -190, 0.95, undefined, 0.6),
        P("grass", 300, 0.78, undefined, 0.8),
      ], env: { terrain: "field", glory: 0.78, night: 0.08, fire: 0.45, verdure: 0.42, water: 0.4 }, cast: [
        C("moises", -290, "raise", { glow: 0.4, dy: 0.5, facing: 1 }),
      ] }),
      b(20, { by: "moises", q: "habita como a leoa", set: "gade", props: [
        P("rock", -230, 1.5, undefined, 0.24),
        P("rock", 70, 1.3, undefined, 0.38),
        P("rock", 290, 1.1, undefined, 0.5),
        P("bush", -60, 1.0, undefined, 0.62),
        P("grass", 170, 0.8, undefined, 0.82),
      ], env: { terrain: "field", glory: 0.62, night: 0.14, fire: 0, verdure: 0.36, water: 0 }, cast: [
        C("moises", -300, "raise", { glow: 0.36, dy: 0.48, facing: -1 }),
        C("multidao", -140, "stand", { dy: 0.6 }),
      ] }),
      b(21, { by: "moises", q: "ali estava escondida a porção do legislador", set: "porcao-do-legislador", props: [
        { ...P("scroll", -40, 1.25, undefined, 0.54), tag: "livro-da-lei" },
        P("tent", 150, 1.15, undefined, 0.36),
        P("tent", 275, 1.0, undefined, 0.46),
        P("rock", -270, 1.15, undefined, 0.28),
        P("grass", 60, 0.82, undefined, 0.84),
      ], env: { terrain: "field", glory: 0.76, night: 0.08, verdure: 0.44 }, cast: [
        C("moises", -180, "point", { glow: 0.38, dy: 0.5, facing: -1 }),
      ] }),
      b(22, { by: "moises", q: "Dã é cria de leão; que salta de Basã", set: "basa", props: [
        P("rock", -20, 1.95, undefined, 0.14),
        P("rock", 215, 1.35, undefined, 0.3),
        P("rock", -265, 1.25, undefined, 0.34),
        P("tree", 105, 1.0, undefined, 0.5),
        P("grass", 300, 0.75, undefined, 0.8),
      ], env: { terrain: "mountain", glory: 0.58, night: 0.12, verdure: 0.28 } }),
      b(23, { by: "moises", q: "possui o ocidente e o sul", set: "naftali", props: [
        { ...P("sun", -235, 1.15, undefined, 0.2), sky: true },
        { ...P("river", 60, 1.5, undefined, 0.56), tag: "mar-de-quinerete" },
        P("tree", 240, 1.2, undefined, 0.24),
        P("palm", -310, 1.1, undefined, 0.16),
        P("grass", -110, 0.9, undefined, 0.84),
      ], env: { terrain: "field", glory: 0.8, night: 0.08, verdure: 0.78, water: 0.55 }, cast: [
        C("moises", -300, "raise", { glow: 0.36, dy: 0.48, facing: -1 }),
        C("multidao", 170, "raise", { dy: 0.56 }),
      ] }),
      b(24, { by: "moises", q: "banhe em azeite o seu pé", set: "aser", props: [
        P("tree", -215, 1.35, undefined, 0.22),
        P("tree", 205, 1.25, undefined, 0.28),
        P("amphora", -30, 1.15, undefined, 0.6),
        P("bowl", 80, 1.0, undefined, 0.7),
        P("grass", 300, 0.85, undefined, 0.82),
      ], env: { terrain: "field", glory: 0.78, night: 0.08, verdure: 0.7, water: 0 }, cast: [
        C("moises", -310, "raise", { glow: 0.36, dy: 0.48, facing: -1 }),
        C("multidao", -130, "stand", { dy: 0.62 }),
      ] }),
      b(25, { by: "moises", q: "Seja de ferro e de metal o teu calçado", set: "ferrolhos", props: [
        { ...P("door", 30, 1.3, undefined, 0.44), tag: "portas" },
        P("tower", -180, 1.25, undefined, 0.24),
        P("tower", 200, 1.15, undefined, 0.3),
        P("rock", 305, 1.05, undefined, 0.46),
        P("grass", -70, 0.8, undefined, 0.84),
      ], env: { terrain: "city", glory: 0.72, night: 0.1, verdure: 0.3 }, cast: [
        C("moises", -280, "raise", { glow: 0.4, dy: 0.5, facing: 1 }),
        C("multidao", 130, "stand", { dy: 0.6 }),
      ] }),
      // v.26 — ÁPICE: não há outro semelhante a Deus, que CAVALGA sobre os céus.
      // props LIMPOS declarados: a apoteose não herda a sarça (bush fire) do v16 nem o altar do v8.
      b(26, { by: "moises", q: "que cavalga sobre os céus para a tua ajuda", props: CONGREGACAO, env: { terrain: "field", glory: 0.92, verdure: 0.5 }, cast: [
        C("moises", -120, "raise", { glow: 0.55, dy: 0.5, facing: 1 }),
        C("multidao", 150, "raise", { dy: 0.46 }),
      ] }),
      // v.27 — O Deus ETERNO é a tua HABITAÇÃO; por baixo, os braços eternos.
      b(27, { by: "moises", q: "O Deus eterno é a tua habitação", props: CONGREGACAO, env: { terrain: "field", glory: 0.98, verdure: 0.5 }, cast: [
        C("moises", -120, "raise", { glow: 0.6, dy: 0.5, facing: 1 }),
        C("multidao", 150, "bow", { dy: 0.46 }),
      ] }),
      // v.28 — Israel habitará só, seguro, na terra de grão e de mosto.
      b(28, { by: "moises", q: "habitará só, seguro", props: CONGREGACAO, env: { glory: 0.9, verdure: 0.62 }, cast: [
        C("moises", -130, "raise", { glow: 0.5, dy: 0.5, facing: 1 }),
        C("multidao", 150, "stand", { dy: 0.46 }),
      ] }),
      // v.29 — BEM-AVENTURADO tu, ó Israel! Quem é como tu? O sol da glória ao alto.
      b(29, { by: "moises", q: "Bem-aventurado tu, ó Israel", props: [ ...CONGREGACAO, { ...P("sun", -240, 1.2, undefined, 0.16), sky: true } ], env: { terrain: "field", glory: 0.99, verdure: 0.55 }, cast: [
        C("moises", -120, "raise", { glow: 0.62, dy: 0.5, facing: 1 }),
        C("multidao", 150, "raise", { dy: 0.46 }),
      ] }),
    ],
  },

  // ------------------------------------------------------------------ Dt 34
  34: {
    start: { terrain: "field", night: 0.08, glory: 0.7, storm: 0, fire: 0, verdure: 0.6 },
    beats: [
      // v.1 — Moisés sobe ao Nebo, ao cume do Pisga; o Senhor mostra-lhe TODA A TERRA.
      b(1, { props: PANORAMA, env: { terrain: "field", glory: 0.78, night: 0.06, verdure: 0.7 }, cast: [
        C("moises", -140, "point", { glow: 0.35, dy: 0.36, facing: 1 }),
      ] }),
      // v.2 — Naftali, Efraim, Manassés, Judá, até ao mar ocidental.
      b(2, { props: PANORAMA, env: { verdure: 0.72 }, cast: [
        C("moises", -140, "point", { glow: 0.35, dy: 0.36, facing: 1 }),
      ] }),
      // v.3 — o sul, a campina de Jericó, a CIDADE DAS PALMEIRAS, até Zoar.
      b(3, { props: [ ...PANORAMA, P("palm", -30, 1.2, undefined, 0.5), P("tower", 40, 0.95, undefined, 0.46) ], cast: [
        C("moises", -140, "point", { glow: 0.35, dy: 0.36, facing: 1 }),
      ] }),
      // v.4 — VOZ DO CÉU: esta é a terra que jurei; eu ta fiz ver, porém lá não passarás.
      dv(4, "porém lá não passarás"),
      // v.5 — Assim MORREU ali Moisés, servo do Senhor, na terra de Moabe.
      b(5, { env: { terrain: "mountain", glory: 0.4, night: 0.28, verdure: 0.3 }, props: [
        P("rock", 220, 1.5, undefined, 0.3),   // o monte ao fundo
        P("rock", 110, 0.9, undefined, 0.6),   // marco de pedra junto ao sepulcro
        P("palm", -300, 1.0, undefined, 0.2),
      ], cast: [
        C("moises", 0, "lie", { dy: 0.66, scale: 1.15, facing: 1 }), // deitado, maior e à frente; ZERO glow (morto)
      ] }),
      // v.6 — Deus o sepultou num vale; ninguém soube até hoje a sua sepultura (NARRAÇÃO).
      b(6, { q: "ninguém soube até hoje o lugar da sua sepultura", env: { terrain: "mountain", glory: 0.5, night: 0.24, verdure: 0.3 }, cast: [
        C("moises", 0, "lie", { dy: 0.66, scale: 1.15, facing: 1 }),
      ] }),
      // v.7 — 120 anos; os olhos nunca se escureceram, nem perdeu o vigor.
      b(7, { q: "nem perdeu o seu vigor", env: { terrain: "mountain", glory: 0.52, night: 0.22 }, cast: [
        C("moises", -20, "lie", { dy: 0.62, facing: 1 }),
      ] }),
      // v.8 — os filhos de Israel prantearam a Moisés TRINTA DIAS nas campinas de Moabe.
      b(8, { q: "prantearam a Moisés trinta dias", env: { terrain: "field", glory: 0.4, night: 0.2, verdure: 0.4 }, props: CONGREGACAO, cast: [
        C("homem", -120, "bow", { dy: 0.52, facing: 1 }),
        C("mulherComum", -40, "kneel", { dy: 0.54, facing: 1 }),
        C("servo", 60, "bow", { dy: 0.5, facing: -1 }),
        C("homem", 160, "kneel", { dy: 0.48, facing: -1, id: "luto2" }),
      ] }),
      // v.9 — JOSUÉ, cheio do espírito de sabedoria (Moisés lhe impôs as mãos), assume.
      b(9, { q: "cheio do espírito de sabedoria", env: { terrain: "field", glory: 0.78, night: 0.08, verdure: 0.5 }, props: CONGREGACAO, cast: [
        C("servo", -120, "raise", { glow: 0.45, dy: 0.5, facing: 1, id: "josue" }),
        C("multidao", 150, "stand", { dy: 0.46 }),
      ] }),
      // v.10 — EPITÁFIO: nunca mais se levantou profeta como Moisés, a quem o Senhor conhecera FACE A FACE.
      b(10, { q: "conhecera face a face", env: { terrain: "field", glory: 0.95, night: 0.06, verdure: 0.5 }, props: CONGREGACAO, cast: [
        C("multidao", 0, "raise", { dy: 0.46 }),
      ] }),
      // v.11 — nem semelhante nos sinais e maravilhas que fez no Egito, a Faraó.
      b(11, { env: { glory: 0.9 }, props: CONGREGACAO, cast: [
        C("multidao", 0, "stand", { dy: 0.46 }),
      ] }),
      // v.12 — e em toda a mão forte e grande espanto, aos olhos de todo o Israel.
      b(12, { q: "aos olhos de todo o Israel", env: { terrain: "field", glory: 0.98, night: 0.05, verdure: 0.55 }, props: CONGREGACAO, cast: [
        C("multidao", 0, "raise", { dy: 0.46 }),
      ] }),
    ],
  },
};
