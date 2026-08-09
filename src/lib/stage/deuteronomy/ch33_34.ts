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
  P("river", 0, 1.3, undefined, 0.6),
  P("palm", -230, 1.0, undefined, 0.44),
  P("palm", 220, 1.05, undefined, 0.42),
  P("tower", -120, 0.85, undefined, 0.4),
  P("tower", 150, 0.8, undefined, 0.38),
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
      b(13, { by: "moises", q: "Bendita do Senhor seja a sua terra", env: { glory: 0.78, verdure: 0.62 }, cast: [
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
      mv(17),
      mv(18),
      mv(19),
      // v.20 — GADE: habita como a leoa.
      mv(20, "habita como a leoa"),
      mv(21),
      // v.22 — DÃ: cria de leão que salta de Basã.
      mv(22, "Dã é cria de leão"),
      // v.23 — NAFTALI: enche-te da bênção do Senhor.
      mv(23, "enche-te da bênção do Senhor"),
      // v.24 — ASER: banhe em azeite o seu pé.
      mv(24, "banhe em azeite o seu pé"),
      // v.25 — a tua força seja como os teus dias.
      mv(25, "a tua força seja como os teus dias"),
      // v.26 — ÁPICE: não há outro semelhante a Deus, que CAVALGA sobre os céus.
      b(26, { by: "moises", q: "que cavalga sobre os céus para a tua ajuda", env: { terrain: "field", glory: 0.92, verdure: 0.5 }, cast: [
        C("moises", -120, "raise", { glow: 0.55, dy: 0.5, facing: 1 }),
        C("multidao", 150, "raise", { dy: 0.46 }),
      ] }),
      // v.27 — O Deus ETERNO é a tua HABITAÇÃO; por baixo, os braços eternos.
      b(27, { by: "moises", q: "O Deus eterno é a tua habitação", env: { terrain: "field", glory: 0.98, verdure: 0.5 }, cast: [
        C("moises", -120, "raise", { glow: 0.6, dy: 0.5, facing: 1 }),
        C("multidao", 150, "bow", { dy: 0.46 }),
      ] }),
      // v.28 — Israel habitará só, seguro, na terra de grão e de mosto.
      b(28, { by: "moises", q: "habitará só, seguro", env: { glory: 0.9, verdure: 0.62 }, cast: [
        C("moises", -130, "raise", { glow: 0.5, dy: 0.5, facing: 1 }),
        C("multidao", 150, "stand", { dy: 0.46 }),
      ] }),
      // v.29 — BEM-AVENTURADO tu, ó Israel! Quem é como tu?
      b(29, { by: "moises", q: "Bem-aventurado tu, ó Israel", env: { terrain: "field", glory: 0.99, verdure: 0.55 }, cast: [
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
        C("moises", -170, "point", { glow: 0.35, dy: 0.4, facing: 1 }),
      ] }),
      // v.2 — Naftali, Efraim, Manassés, Judá, até ao mar ocidental.
      b(2, { props: PANORAMA, env: { verdure: 0.72 }, cast: [
        C("moises", -170, "point", { glow: 0.35, dy: 0.4, facing: 1 }),
      ] }),
      // v.3 — o sul, a campina de Jericó, a CIDADE DAS PALMEIRAS, até Zoar.
      b(3, { props: [ ...PANORAMA, P("palm", -30, 1.2, undefined, 0.5), P("tower", 40, 0.95, undefined, 0.46) ], cast: [
        C("moises", -170, "point", { glow: 0.35, dy: 0.4, facing: 1 }),
      ] }),
      // v.4 — VOZ DO CÉU: esta é a terra que jurei; eu ta fiz ver, porém lá não passarás.
      dv(4, "porém lá não passarás"),
      // v.5 — Assim MORREU ali Moisés, servo do Senhor, na terra de Moabe.
      b(5, { env: { terrain: "mountain", glory: 0.4, night: 0.28, verdure: 0.3 }, props: [
        P("rock", 200, 1.3, undefined, 0.34), P("palm", -300, 1.0, undefined, 0.2),
      ], cast: [
        C("moises", -20, "lie", { dy: 0.62, facing: 1 }),
      ] }),
      // v.6 — Deus o sepultou num vale; ninguém soube até hoje a sua sepultura.
      b(6, { by: "deus", q: "ninguém soube até hoje o lugar da sua sepultura", env: { terrain: "mountain", glory: 0.5, night: 0.24, verdure: 0.3 }, cast: [
        C("moises", -20, "lie", { dy: 0.62, facing: 1 }),
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
