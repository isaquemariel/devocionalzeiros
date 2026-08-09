// ============================================================================
// DEUTERONÔMIO 10–11 — CENA VIVA. AS NOVAS TÁBUAS NA ARCA; O CORAÇÃO
// CIRCUNCIDADO; A TERRA QUE BEBE A CHUVA; A BÊNÇÃO E A MALDIÇÃO.
//
// Dt 10 — AS NOVAS TÁBUAS: Moisés relembra Horebe. Deus o mandou alisar DUAS
// TÁBUAS de pedra "como as primeiras" e fazer uma ARCA de madeira de acácia;
// nelas escreveu os mesmos DEZ MANDAMENTOS, e Moisés as pôs na arca. A tribo
// de LEVI é separada para levar a arca e servir. Depois, o coração da pregação:
// "circuncidai o prepúcio do vosso CORAÇÃO" (16); "o Deus dos deuses e o Senhor
// dos senhores" (17); ele faz justiça ao órfão e à viúva e AMA O ESTRANGEIRO,
// dando-lhe pão e roupa (18-19); e vos multiplicou como as ESTRELAS (22).
//
// Dt 11 — AMOR E OBEDIÊNCIA: os que VIRAM as maravilhas (o Egito, o Mar
// Vermelho, e o juízo de DATÃ e ABIRÃO que a TERRA ENGOLIU — flashback de fenda
// escura, figuras individuais afundando). A boa terra NÃO é como o Egito regado
// a pé: é terra que BEBE A CHUVA do céu, a temporã e a serôdia. E o apelo final:
// "eis que ponho hoje diante de vós a BÊNÇÃO e a MALDIÇÃO" — a bênção no monte
// GERIZIM, a maldição no monte EBAL.
//
// A VOZ (regra do projeto): o falante é MOISÉS, mediador visível pregando nas
// campinas de Moabe — `by: "moises"` com `q` na frase-chave. Os eventos que ele
// relembra entram como FLASHBACK vivo (o monte das tábuas, o Mar, a fenda de
// Datã, os dois montes).
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });
const mv = (v: number, q?: string) => b(v, { by: "moises", ...(q ? { q } : {}) }); // Moisés prega

// Cenário base: as campinas de Moabe, o Jordão ao fundo, tendas do arraial.
const CAMPINAS: StagePropSpec[] = [
  P("river", 0, 1.35, undefined, 0.18),
  P("tent", -270, 1.0, undefined, 0.2),
  P("tent", 255, 1.0, undefined, 0.22),
  P("palm", -325, 1.05, undefined, 0.14),
  P("grass", -60, 0.82, undefined, 0.82),
  P("grass", 72, 0.78, undefined, 0.74),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Dt 10
  10: {
    start: { terrain: "field", night: 0.1, glory: 0.6, storm: 0, fire: 0, verdure: 0.4 },
    beats: [
      // v.1-5 — FLASHBACK de Horebe: as NOVAS TÁBUAS e a ARCA no monte.
      b(1, { by: "moises", q: "Alisa duas tábuas de pedra", env: { terrain: "mountain", glory: 0.3, night: 0.2, fire: 0.15, verdure: 0.1 }, props: [
        { ...P("tablets", -40, 1.3, undefined, 0.42), tag: "tabuas-da-lei" },
        { ...P("ark", 120, 1.1, undefined, 0.55), tag: "arca-testemunho" },
        P("rock", 260, 1.15, undefined, 0.34),
      ], cast: [
        C("moises", -150, "raise", { dy: 0.5, facing: 1, glow: 0.3 }),
      ] }),
      b(2, { by: "moises", q: "as porás na arca", env: { terrain: "mountain", glory: 0.3, night: 0.2, fire: 0.12 }, props: [
        { ...P("tablets", -40, 1.3, undefined, 0.42), tag: "tabuas-da-lei" },
        { ...P("ark", 120, 1.15, undefined, 0.55), tag: "arca-testemunho" },
      ], cast: [
        C("moises", -170, "point", { dy: 0.5, facing: 1 }),
      ] }),
      b(3, { by: "moises", q: "subi ao monte com as duas tábuas", env: { terrain: "mountain", glory: 0.28, night: 0.22, fire: 0.12 }, props: [
        { ...P("tablets", 20, 1.35, undefined, 0.45), tag: "tabuas-da-lei" },
        { ...P("ark", -180, 1.05, undefined, 0.6), tag: "arca-testemunho" },
        P("rock", 250, 1.1, undefined, 0.34),
      ], cast: [
        C("moises", -30, "raise", { dy: 0.48, facing: 1, glow: 0.35 }),
      ] }),
      b(4, { by: "moises", q: "os dez mandamentos", env: { terrain: "mountain", glory: 0.32, night: 0.2, fire: 0.2 }, props: [
        { ...P("tablets", 0, 1.5, undefined, 0.4), tag: "tabuas-da-lei" },
        P("campfire", 200, 1.0, 0.7, 0.42),
      ], cast: [
        C("moises", -160, "kneel", { dy: 0.52, facing: 1, glow: 0.3 }),
      ] }),
      b(5, { by: "moises", q: "pus as tábuas na arca", env: { terrain: "mountain", glory: 0.34, night: 0.18 }, props: [
        { ...P("ark", -30, 1.35, undefined, 0.5), tag: "arca-testemunho" },
        { ...P("tablets", -30, 0.7, undefined, 0.4), tag: "tabuas-da-lei" },
      ], cast: [
        C("moises", -170, "bow", { dy: 0.52, facing: 1 }),
      ] }),
      // v.6-7 — a jornada; a morte de ARÃO em Moserá; Eleazar assume.
      b(6, { by: "moises", q: "ali faleceu Arão", env: { terrain: "desert", glory: 0.4, night: 0.15, verdure: 0.12 }, props: [
        P("altar", 120, 1.0, undefined, 0.5),
        P("rock", -260, 1.1, undefined, 0.32),
        P("palm", 300, 1.0, undefined, 0.16),
      ], cast: [
        C("arao", 40, "lie", { dy: 0.62, facing: 1 }),
        C("servo", -110, "bow", { dy: 0.54, facing: 1, id: "eleazar" }),
        C("moises", -220, "stand", { dy: 0.5, facing: 1 }),
      ] }),
      b(7, { by: "moises", q: "terra de ribeiros de águas", env: { terrain: "desert", glory: 0.5, verdure: 0.35 }, props: [
        P("river", 0, 1.2, undefined, 0.3),
        P("palm", -300, 1.05, undefined, 0.16),
        P("grass", 80, 0.8, undefined, 0.76),
      ] }),
      // v.8-9 — LEVI separado para levar a arca e servir.
      b(8, { by: "moises", q: "separou a tribo de Levi", env: { terrain: "field", glory: 0.62, verdure: 0.4 }, props: [
        { ...P("ark", 30, 1.25, undefined, 0.52), tag: "arca-testemunho" },
        ...CAMPINAS,
      ], cast: [
        C("servo", -60, "raise", { dy: 0.54, facing: 1, id: "levi1" }),
        C("servo", 130, "stand", { dy: 0.5, facing: -1, id: "levi2" }),
        C("moises", -190, "point", { dy: 0.5, facing: 1 }),
      ] }),
      mv(9, "o Senhor é a sua herança"),
      // v.10-11 — Moisés esteve 40 dias no monte; o Senhor o ouviu.
      b(10, { by: "moises", q: "quarenta dias e quarenta noites", env: { terrain: "mountain", glory: 0.3, night: 0.25, fire: 0.12 }, props: [
        P("campfire", 60, 1.0, 0.7, 0.42),
        P("rock", -230, 1.1, undefined, 0.34),
      ], cast: [
        C("moises", -120, "kneel", { dy: 0.54, facing: 1, glow: 0.3 }),
      ] }),
      mv(11, "possuam a terra que jurei dar a seus pais"),
      // v.12-16 — o apelo central: temer, amar, servir de todo o CORAÇÃO.
      b(12, { by: "moises", q: "com todo o teu coração", env: { terrain: "field", glory: 0.66, verdure: 0.42 }, props: CAMPINAS, cast: [
        C("moises", -140, "raise", { dy: 0.5, facing: 1 }),
        C("multidao", 150, "stand", { dy: 0.46 }),
      ] }),
      mv(13, "guardes os mandamentos"),
      b(14, { by: "moises", q: "os céus e os céus dos céus", env: { terrain: "field", glory: 0.72, verdure: 0.4 }, props: [
        P("starfield", 0, 1.0, undefined, 0.2),
        ...CAMPINAS,
      ], cast: [
        C("moises", -140, "raise", { dy: 0.5, facing: 1 }),
      ] }),
      mv(15, "escolheu, depois deles"),
      b(16, { by: "moises", q: "o prepúcio do vosso coração", env: { terrain: "field", glory: 0.68, verdure: 0.4 }, props: CAMPINAS, cast: [
        C("moises", -140, "point", { dy: 0.5, facing: 1 }),
        C("multidao", 150, "bow", { dy: 0.46 }),
      ] }),
      // v.17-19 — Deus dos deuses; faz justiça e AMA O ESTRANGEIRO (pão e roupa).
      b(17, { by: "moises", q: "o Deus dos deuses, e o Senhor dos senhores", env: { terrain: "field", glory: 0.8, verdure: 0.4 }, props: CAMPINAS, cast: [
        C("moises", -140, "raise", { dy: 0.5, facing: 1, glow: 0.25 }),
      ] }),
      b(18, { by: "moises", q: "ama o estrangeiro, dando-lhe pão e roupa", env: { terrain: "field", glory: 0.66, verdure: 0.42 }, props: CAMPINAS, cast: [
        C("moises", -170, "point", { dy: 0.5, facing: 1 }),
        C("mulherComum", 60, "bow", { dy: 0.56, facing: 1, id: "viuva" }),
        C("homem", 150, "bow", { dy: 0.54, facing: -1, id: "estrangeiro" }),
      ] }),
      b(19, { by: "moises", q: "amareis o estrangeiro", env: { terrain: "field", glory: 0.64, verdure: 0.42 }, props: CAMPINAS, cast: [
        C("moises", -140, "raise", { dy: 0.5, facing: 1 }),
        C("homem", 120, "stand", { dy: 0.54, facing: -1, id: "estrangeiro" }),
      ] }),
      mv(20, "a ele servirás"),
      mv(21, "Ele é o teu louvor"),
      // v.22 — de 70 almas a multidão como as ESTRELAS.
      b(22, { by: "moises", q: "as estrelas dos céus em multidão", env: { terrain: "field", glory: 0.55, night: 0.3, verdure: 0.35 }, props: [
        P("starfield", 0, 1.0, undefined, 0.2),
        P("star", -120, 2.6, undefined, 0.3),
        P("star", 140, 2.4, undefined, 0.26),
        ...CAMPINAS,
      ], cast: [
        C("moises", -160, "raise", { dy: 0.5, facing: 1 }),
        C("multidao", 140, "stand", { dy: 0.46 }),
      ] }),
    ],
  },

  // ------------------------------------------------------------------ Dt 11
  11: {
    start: { terrain: "field", night: 0.1, glory: 0.62, storm: 0, fire: 0, verdure: 0.45 },
    beats: [
      b(1, { by: "moises", q: "Amarás, pois, ao SENHOR teu Deus", props: CAMPINAS, cast: [
        C("moises", -140, "raise", { dy: 0.5, facing: 1 }),
        C("multidao", 150, "stand", { dy: 0.46 }),
      ] }),
      b(2, { by: "moises", q: "a sua mão forte, e o seu braço estendido", cast: [
        C("moises", -140, "point", { dy: 0.5, facing: 1 }),
      ] }),
      // v.3-4 — FLASHBACK do Egito e do MAR VERMELHO.
      b(3, { by: "moises", q: "no meio do Egito a Faraó", env: { terrain: "field", glory: 0.5, verdure: 0.2 }, props: [
        P("tower", 200, 1.1, undefined, 0.34),
        P("river", 0, 1.2, undefined, 0.3),
      ], cast: [
        C("rei", 150, "stand", { dy: 0.52, facing: -1, id: "farao" }),
        C("moises", -160, "raise", { dy: 0.5, facing: 1 }),
      ] }),
      b(4, { by: "moises", q: "as águas do Mar Vermelho", env: { terrain: "field", glory: 0.4, night: 0.2, storm: 0.3, verdure: 0.15 }, props: [
        P("river", 0, 1.6, undefined, 0.34),
        P("rock", -280, 1.1, undefined, 0.3),
      ], cast: [
        C("rei", 60, "lie", { dy: 0.6, facing: 1, id: "farao" }),
        C("homem", 150, "lie", { dy: 0.62, facing: -1, id: "egipcio" }),
        C("moises", -190, "stand", { dy: 0.5, facing: 1 }),
      ] }),
      mv(5, "vos fez no deserto"),
      // v.6 — DATÃ e ABIRÃO: a TERRA ABRE A BOCA e os traga (fenda escura).
      b(6, { by: "moises", q: "a terra abriu a sua boca e os tragou", env: { terrain: "abyss", glory: 0.08, night: 0.55, storm: 0.35, verdure: 0 }, props: [
        P("rock", -250, 1.15, undefined, 0.3),
        P("rock", 250, 1.1, undefined, 0.32),
      ], cast: [
        C("homem", -50, "kneel", { dy: 0.72, facing: 1, id: "data" }),
        C("homem", 70, "lie", { dy: 0.78, facing: -1, id: "abirao" }),
        C("moises", -210, "stand", { dy: 0.48, facing: 1 }),
      ] }),
      b(7, { by: "moises", q: "viram toda a grande obra", env: { terrain: "field", glory: 0.6, verdure: 0.4 }, props: CAMPINAS, cast: [
        C("moises", -140, "raise", { dy: 0.5, facing: 1 }),
        C("multidao", 150, "stand", { dy: 0.46 }),
      ] }),
      mv(8, "Guardai, pois, todos os mandamentos"),
      b(9, { by: "moises", q: "terra que mana leite e mel", env: { terrain: "field", glory: 0.68, verdure: 0.6 }, props: CAMPINAS, cast: [
        C("moises", -140, "point", { dy: 0.5, facing: 1 }),
      ] }),
      // v.10-12 — a boa terra NÃO é como o Egito: BEBE A CHUVA do céu.
      b(10, { by: "moises", q: "a regavas com o teu pé", env: { terrain: "desert", glory: 0.5, verdure: 0.2 }, props: [
        P("well", 180, 1.0, undefined, 0.5),
        P("palm", -300, 1.0, undefined, 0.16),
      ], cast: [
        C("moises", -150, "stand", { dy: 0.5, facing: 1 }),
      ] }),
      b(11, { by: "moises", q: "da chuva dos céus beberá as águas", env: { terrain: "field", glory: 0.6, storm: 0.25, verdure: 0.7 }, props: [
        P("rock", -270, 1.15, undefined, 0.28),
        P("grass", -50, 0.9, undefined, 0.82),
        P("grass", 90, 0.86, undefined, 0.74),
        P("river", 40, 1.0, undefined, 0.4),
      ], cast: [
        C("moises", -160, "raise", { dy: 0.5, facing: 1 }),
      ] }),
      mv(12, "os olhos do Senhor teu Deus estão sobre ela"),
      mv(13, "de todo o vosso coração"),
      // v.14-15 — a CHUVA temporã e serôdia; erva no campo.
      b(14, { by: "moises", q: "a temporã e a serôdia", env: { terrain: "field", glory: 0.6, storm: 0.25, verdure: 0.72 }, props: [
        P("grass", -50, 0.92, undefined, 0.82),
        P("grass", 90, 0.88, undefined, 0.74),
        P("sheaf", 160, 1.0, undefined, 0.6),
        P("river", -30, 1.0, undefined, 0.4),
      ], cast: [
        C("moises", -160, "raise", { dy: 0.5, facing: 1 }),
      ] }),
      b(15, { by: "moises", q: "darei erva no teu campo", env: { terrain: "field", glory: 0.66, verdure: 0.75 }, props: [
        P("grass", -60, 0.95, undefined, 0.82),
        P("grass", 60, 0.9, undefined, 0.74),
        P("stall", 180, 1.0, undefined, 0.52),
      ] }),
      // v.16-17 — advertência: não sirvam a outros deuses, ou o céu se fecha.
      b(16, { by: "moises", q: "sirvais a outros deuses", env: { terrain: "field", glory: 0.45, night: 0.25, verdure: 0.3 }, props: CAMPINAS, cast: [
        C("moises", -140, "point", { dy: 0.5, facing: 1 }),
      ] }),
      b(17, { by: "moises", q: "feche ele os céus, e não haja água", env: { terrain: "desert", glory: 0.25, night: 0.4, storm: 0.15, verdure: 0.05 }, props: [
        P("rock", -240, 1.1, undefined, 0.32),
        P("rock", 230, 1.05, undefined, 0.34),
      ], cast: [
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
      ] }),
      // v.18-21 — ponham as palavras no coração, na mão, nos umbrais; ensinem.
      b(18, { by: "moises", q: "atai-as por sinal na vossa mão", env: { terrain: "field", glory: 0.62, verdure: 0.42 }, props: [
        { ...P("scroll", 60, 1.0, undefined, 0.5) },
        ...CAMPINAS,
      ], cast: [
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
      ] }),
      b(19, { by: "moises", q: "ensinai-as a vossos filhos", env: { terrain: "field", glory: 0.62, verdure: 0.42 }, props: CAMPINAS, cast: [
        C("moises", -150, "point", { dy: 0.5, facing: 1 }),
        C("homem", 60, "stand", { dy: 0.54, facing: -1, id: "pai" }),
        C("homem", 150, "kneel", { dy: 0.58, facing: -1, id: "filho", scale: 0.8 }),
      ] }),
      b(20, { by: "moises", q: "escreve-as nos umbrais", env: { terrain: "field", glory: 0.6, verdure: 0.4 }, props: [
        P("door", 90, 1.1, undefined, 0.46),
        ...CAMPINAS,
      ], cast: [
        C("moises", -150, "point", { dy: 0.5, facing: 1 }),
      ] }),
      mv(21, "os dias dos céus sobre a terra"),
      // v.22-25 — se guardarem, o Senhor lança fora nações maiores.
      mv(22, "amando ao Senhor vosso Deus"),
      b(23, { by: "moises", q: "lançará fora todas estas nações", env: { terrain: "field", glory: 0.6, verdure: 0.38 }, props: [
        P("tower", 210, 1.15, undefined, 0.32),
        ...CAMPINAS,
      ], cast: [
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
      ] }),
      b(24, { by: "moises", q: "o rio Eufrates", env: { terrain: "field", glory: 0.6, verdure: 0.4 }, props: [
        P("river", 0, 1.4, undefined, 0.24),
        ...CAMPINAS,
      ], cast: [
        C("moises", -150, "point", { dy: 0.5, facing: 1 }),
      ] }),
      mv(25, "Ninguém resistirá diante de vós"),
      // v.26-28 — a BÊNÇÃO e a MALDIÇÃO postas diante do povo.
      b(26, { by: "moises", q: "a bênção e a maldição", env: { terrain: "field", glory: 0.6, verdure: 0.4 }, props: CAMPINAS, cast: [
        C("moises", -140, "raise", { dy: 0.5, facing: 1 }),
        C("multidao", 150, "stand", { dy: 0.46 }),
      ] }),
      b(27, { by: "moises", q: "A bênção, quando cumprirdes", env: { terrain: "field", glory: 0.82, verdure: 0.55 }, props: CAMPINAS, cast: [
        C("moises", -140, "raise", { dy: 0.5, facing: 1, glow: 0.3 }),
      ] }),
      b(28, { by: "moises", q: "Porém a maldição", env: { terrain: "field", glory: 0.28, night: 0.35, storm: 0.15, verdure: 0.15 }, props: CAMPINAS, cast: [
        C("moises", -140, "point", { dy: 0.5, facing: 1 }),
      ] }),
      // v.29-30 — os DOIS MONTES: GERIZIM (bênção) e EBAL (maldição).
      b(29, { by: "moises", q: "o monte Gerizim", env: { terrain: "field", glory: 0.6, verdure: 0.45 }, props: [
        P("rock", -180, 1.6, undefined, 0.28),
        P("rock", 190, 1.55, undefined, 0.3),
        P("river", 0, 1.0, undefined, 0.5),
        P("grass", -60, 0.85, undefined, 0.82),
      ], cast: [
        C("moises", -30, "raise", { dy: 0.56, facing: 1 }),
      ] }),
      b(30, { by: "moises", q: "junto aos carvalhais de Moré", env: { terrain: "field", glory: 0.58, verdure: 0.45 }, props: [
        P("tree", -200, 1.2, undefined, 0.34),
        P("tree", 200, 1.15, undefined, 0.36),
        P("river", 0, 1.1, undefined, 0.3),
      ], cast: [
        C("moises", -150, "point", { dy: 0.5, facing: 1 }),
      ] }),
      b(31, { by: "moises", q: "passareis o Jordão", env: { terrain: "field", glory: 0.62, verdure: 0.45 }, props: [
        P("river", 0, 1.5, undefined, 0.22),
        ...CAMPINAS,
      ], cast: [
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
        C("multidao", 150, "walk", { dy: 0.46 }),
      ] }),
      mv(32, "cuidado em cumprir todos os estatutos"),
    ],
  },
};
