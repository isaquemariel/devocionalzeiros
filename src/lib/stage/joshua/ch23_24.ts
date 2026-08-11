// ============================================================================
// JOSUÉ 23–24 — CENA VIVA. O CLÍMAX DO LIVRO: as DESPEDIDAS de Josué.
//
// Js 23 — A PRIMEIRA DESPEDIDA: já velho e entrado em dias, tendo o Senhor dado
// repouso a Israel, Josué reúne TODO o Israel — os anciãos, os cabeças, os
// juízes e os oficiais — e os exorta: "ao Senhor vosso Deus vos APEGAREIS"; não
// vos misturareis com as nações que restam nem invocareis os nomes dos seus
// deuses; "um só homem dentre vós perseguirá a mil, pois é o Senhor vosso Deus
// que peleja por vós". E adverte: se transgredirdes a aliança, perecereis da
// boa terra que o Senhor vos deu.
//
// Js 24 — A ALIANÇA EM SIQUÉM: diante de Deus, Josué recita toda a história da
// redenção — Terá além do rio, o chamado de ABRAÃO, Isaque, Jacó e Esaú, a
// descida ao Egito, Moisés e Arão, o Mar Vermelho, o deserto, Balaão e Balaque,
// a travessia do Jordão e Jericó, o dom da terra. Então lança o desafio:
// "ESCOLHEI hoje a quem sirvais… porém EU E A MINHA CASA serviremos ao Senhor"
// (24:15). O povo responde, e Josué faz a aliança, escreve as palavras e ergue
// uma GRANDE PEDRA por testemunha, debaixo do carvalho. Enfim, a morte de Josué
// aos 110 anos (sepultado em Timnate-Sera), os OSSOS DE JOSÉ sepultados em
// Siquém, e a morte de Eleazar. Encerramento reverente do livro.
//
// A VOZ DE DEUS (regra do projeto): Josué é o mediador visível em quase tudo —
// quando FALA, e mesmo quando RECITA a voz do Senhor ("Assim diz o Senhor",
// 24:2-13), use `by: "servo"` com Josué (id "josue") como PRIMEIRO servo do
// cast. Quando o POVO responde (24:16-18,21,24), o balão sai da `multidao`.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });
const jv = (v: number, q?: string) => b(v, { by: "servo", ...(q ? { q } : {}) }); // Josué fala
const dv = (v: number) => b(v, { by: "deus" });                                    // voz do céu

// A ASSEMBLEIA em Canaã — Josué velho, todo o Israel diante dele; o Jordão ao
// fundo, as tendas do arraial, os montes da terra dada em herança.
const ASSEMBLEIA: StagePropSpec[] = [
  P("river", 0, 1.3, undefined, 0.86),
  P("tent", -240, 1.05, undefined, 0.2),
  P("tent", 225, 1.0, undefined, 0.24),
  P("palm", -320, 1.05, undefined, 0.14),
  P("rock", 305, 1.1, undefined, 0.32),
  P("grass", 80, 0.78, undefined, 0.68),
];
// SIQUÉM — o lugar da aliança, sob o GRANDE CARVALHO junto ao santuário.
const SIQUEM: StagePropSpec[] = [
  { ...P("tree", 150, 1.55, undefined, 0.22), tag: "carvalho-de-siquem" },
  P("tent", -245, 1.0, undefined, 0.2),
  P("palm", -325, 1.05, undefined, 0.14),
  P("rock", 305, 1.05, undefined, 0.34),
  P("grass", 55, 0.78, undefined, 0.68),
];
// ALÉM DO RIO — a antiga terra dos pais (Terá), que serviam a outros deuses.
const RIO: StagePropSpec[] = [
  P("river", 0, 1.5, undefined, 0.84),
  { ...P("ziggurat", 155, 1.2, undefined, 0.26), tag: "alem-do-rio" },
  P("palm", -305, 1.0, undefined, 0.16),
  P("grass", -70, 0.78, undefined, 0.74),
];
// CANAÃ — Abraão andando por toda a terra; a descendência como as estrelas.
const CANAA: StagePropSpec[] = [
  P("palm", -305, 1.05, undefined, 0.16),
  P("tree", 285, 1.2, undefined, 0.24),
  P("rock", 300, 1.1, undefined, 0.3),
  { ...P("starfield", 0, 2.2, undefined, 0.22), sky: true },
  P("grass", -60, 0.8, undefined, 0.78),
];
// O EGITO — as torres e o zigurate; a servidão de onde o Senhor os tirou.
const EGITO: StagePropSpec[] = [
  { ...P("ziggurat", 140, 1.3, undefined, 0.24), tag: "egito" },
  P("tower", -155, 1.15, undefined, 0.3),
  P("rock", 300, 1.05, undefined, 0.32),
];
// O MAR VERMELHO — as águas trazidas sobre os egípcios; a escuridão do juízo.
const MAR: StagePropSpec[] = [
  P("river", 0, 1.65, undefined, 0.78),
  P("rock", 305, 1.05, undefined, 0.3),
];
// O DESERTO — os muitos dias da peregrinação relembrada.
const DESERTO: StagePropSpec[] = [
  P("palm", -320, 1.05, undefined, 0.14),
  P("rock", 300, 1.1, undefined, 0.3),
  P("grass", -60, 0.8, undefined, 0.82),
  P("grass", 90, 0.76, undefined, 0.74),
];
// JERICÓ — a travessia do Jordão e a cidade das torres, entregue nas mãos.
const JERICO: StagePropSpec[] = [
  P("tower", -125, 1.32, undefined, 0.26),
  P("tower", 155, 1.22, undefined, 0.32),
  P("river", -270, 1.1, undefined, 0.82),
  P("rock", 300, 1.05, undefined, 0.3),
];
// AS VINHAS E OS OLIVAIS — a terra dada de graça, que não plantaram.
const VINHAS: StagePropSpec[] = [
  P("grapes", -285, 1.18, undefined, 0.3),
  P("grapes", 285, 1.12, undefined, 0.34),
  P("tree", 150, 1.2, undefined, 0.24),
  P("tent", -335, 1.0, undefined, 0.2),
  P("grass", -80, 0.85, undefined, 0.78),
];
// A GRANDE PEDRA por testemunho — erguida debaixo do carvalho de Siquém.
const PEDRA: StagePropSpec[] = [
  { ...P("rock", 40, 1.5, undefined, 0.4), tag: "pedra-testemunho" },
  { ...P("tree", 175, 1.55, undefined, 0.22), tag: "carvalho-de-siquem" },
  P("tent", -250, 1.0, undefined, 0.2),
  P("grass", -80, 0.8, undefined, 0.74),
];
// A SEPULTURA — o repouso solene: Josué, os ossos de José, Eleazar.
const SEPULTURA: StagePropSpec[] = [
  { ...P("rock", 0, 1.4, undefined, 0.4), tag: "sepultura" },
  P("tree", 265, 1.2, undefined, 0.24),
  P("rock", 305, 1.1, undefined, 0.3),
  P("grass", -80, 0.78, undefined, 0.76),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Js 23
  23: {
    start: { terrain: "field", night: 0.12, glory: 0.6, storm: 0, fire: 0, verdure: 0.4 },
    beats: [
      // v.1 — o Senhor deu REPOUSO a Israel; Josué já velho e entrado em dias.
      b(1, { q: "dera repouso a Israel de todos os seus inimigos", props: ASSEMBLEIA,
        env: { terrain: "field", glory: 0.62, night: 0.1, verdure: 0.42 }, cast: [
        C("servo", -150, "stand", { dy: 0.5, facing: 1, id: "josue", glow: 0.2 }),
        C("multidao", 140, "stand", { dy: 0.6 }),
      ] }),
      // v.2 — CHAMA todo o Israel: anciãos, cabeças, juízes, oficiais. "Eu já sou velho".
      b(2, { by: "servo", q: "Eu já sou velho e entrado em dias", cast: [
        C("servo", -150, "raise", { dy: 0.5, facing: 1, id: "josue", glow: 0.22 }),
        C("anciao", 40, "stand", { dy: 0.5, id: "anciaos" }),
        C("anciao", 130, "stand", { dy: 0.52, facing: -1, id: "cabecas" }),
        C("multidao", 220, "stand", { dy: 0.66 }),
      ] }),
      // v.3 — "o Senhor vosso Deus é que TEM PELEJADO por vós".
      jv(3, "tem pelejado por vós"),
      // v.4 — "vos REPARTI POR SORTE" a terra em herança.
      b(4, { by: "servo", q: "vos reparti por sorte", cast: [
        C("servo", -150, "point", { dy: 0.5, facing: 1, id: "josue", glow: 0.2 }),
        C("multidao", 140, "stand", { dy: 0.62 }),
      ] }),
      // v.5 — o Senhor as IMPELIRÁ e EXPELIRÁ de diante de vós.
      jv(5, "as impelirá, e as expelirá de diante de vós"),
      // v.6 — ESFORÇAI-VOS para guardar tudo o que está escrito na lei de Moisés.
      b(6, { by: "servo", q: "está escrito no livro da lei de Moisés", props: [
        ...ASSEMBLEIA, P("scroll", -60, 0.95, undefined, 0.56),
      ], env: { terrain: "field", glory: 0.6, night: 0.1, verdure: 0.4 }, cast: [
        C("servo", -150, "raise", { dy: 0.5, facing: 1, id: "josue", glow: 0.2 }),
        C("multidao", 140, "stand", { dy: 0.62 }),
      ] }),
      // v.7 — NÃO invoqueis os nomes dos deuses das nações, nem os sirvais.
      jv(7, "dos nomes de seus deuses não façais menção"),
      // v.8 — "ao Senhor vosso Deus vos APEGAREIS" — o coração do discurso.
      b(8, { by: "servo", q: "ao Senhor vosso Deus vos apegareis", env: { glory: 0.72, night: 0.08 }, cast: [
        C("servo", -150, "raise", { dy: 0.5, facing: 1, id: "josue", glow: 0.32 }),
        C("multidao", 140, "stand", { dy: 0.6 }),
      ] }),
      // v.9 — o Senhor expulsou grandes nações; ninguém pôde resistir a vós.
      jv(9, "ninguém vos tem podido resistir"),
      // v.10 — "UM SÓ HOMEM dentre vós perseguirá a MIL, pois o Senhor peleja".
      b(10, { by: "servo", q: "Um só homem dentre vós perseguirá a mil", env: { terrain: "field", glory: 0.68, night: 0.12 }, cast: [
        C("servo", -160, "point", { dy: 0.5, facing: 1, id: "josue", glow: 0.28 }),
        C("homem", -10, "raise", { dy: 0.5, facing: -1, id: "guerreiro" }),
        C("multidao", 200, "walk", { dy: 0.6, facing: -1 }),
      ] }),
      // v.11 — GUARDAI diligentemente as vossas almas, para AMARDES ao Senhor.
      b(11, { by: "servo", q: "para amardes ao Senhor vosso Deus", props: ASSEMBLEIA,
        env: { terrain: "field", glory: 0.66, night: 0.1, verdure: 0.4 }, cast: [
        C("servo", -150, "raise", { dy: 0.5, facing: 1, id: "josue", glow: 0.26 }),
        C("multidao", 140, "stand", { dy: 0.6 }),
      ] }),
      // v.12 — porém, se vos DESVIARDES e vos aparentardes com o restante das nações.
      b(12, { by: "servo", q: "vos apegardes ao restante destas nações", env: { glory: 0.42, night: 0.24 }, cast: [
        C("servo", -150, "point", { dy: 0.5, facing: 1, id: "josue" }),
        C("rei", 150, "stand", { dy: 0.5, facing: -1, id: "nacoes" }),
        C("multidao", 220, "stand", { dy: 0.66 }),
      ] }),
      // v.13 — elas vos serão por LAÇO E REDE, açoite e espinhos; perecereis da boa terra.
      b(13, { by: "servo", q: "elas vos serão por laço e rede", env: { terrain: "field", glory: 0.32, night: 0.32, storm: 0.12, verdure: 0.2 }, cast: [
        C("servo", -150, "raise", { dy: 0.5, facing: 1, id: "josue" }),
        C("rei", 150, "stand", { dy: 0.5, facing: -1, id: "nacoes" }),
      ] }),
      // v.14 — "vou HOJE pelo caminho de toda a terra"; nenhuma palavra falhou.
      b(14, { by: "servo", q: "vou hoje pelo caminho de toda a terra", set: "assembleia", props: ASSEMBLEIA,
        env: { terrain: "field", glory: 0.6, night: 0.12, verdure: 0.4 }, cast: [
        C("servo", -150, "raise", { dy: 0.5, facing: 1, id: "josue", glow: 0.24 }),
        C("multidao", 140, "stand", { dy: 0.6 }),
      ] }),
      // v.15 — assim como vieram as boas coisas, virão as MÁS, até vos destruir da terra.
      b(15, { by: "servo", q: "trará o Senhor sobre vós todas aquelas más coisas", env: { glory: 0.36, night: 0.28, storm: 0.1 }, cast: [
        C("servo", -150, "point", { dy: 0.5, facing: 1, id: "josue" }),
        C("multidao", 150, "bow", { dy: 0.64 }),
      ] }),
      // v.16 — quando TRANSGREDIRDES a aliança, a ira do Senhor se acenderá.
      b(16, { by: "servo", q: "Quando transgredirdes a aliança do Senhor", env: { glory: 0.3, night: 0.34, storm: 0.14 }, cast: [
        C("servo", -150, "raise", { dy: 0.5, facing: 1, id: "josue" }),
        C("multidao", 150, "bow", { dy: 0.64 }),
      ] }),
    ],
  },

  // ------------------------------------------------------------------ Js 24
  24: {
    start: { terrain: "field", night: 0.1, glory: 0.66, storm: 0, fire: 0, verdure: 0.4 },
    beats: [
      // v.1 — REÚNE todas as tribos em SIQUÉM; apresentam-se DIANTE DE DEUS.
      b(1, { q: "reuniu Josué todas as tribos de Israel em Siquém", props: SIQUEM,
        env: { terrain: "field", glory: 0.72, night: 0.08, verdure: 0.42 }, cast: [
        C("servo", -150, "raise", { dy: 0.5, facing: 1, id: "josue", glow: 0.24 }),
        C("anciao", 30, "stand", { dy: 0.5, id: "anciaos" }),
        C("anciao", 115, "bow", { dy: 0.52, facing: -1, id: "cabecas" }),
        C("multidao", 210, "stand", { dy: 0.66 }),
      ] }),
      // v.2 — "Assim diz o Senhor": ALÉM DO RIO habitaram vossos pais, Terá.
      b(2, { by: "servo", q: "Além do rio habitaram antigamente vossos pais", set: "rio", props: RIO,
        env: { terrain: "field", glory: 0.4, night: 0.28, verdure: 0.2 }, cast: [
        C("servo", -160, "point", { dy: 0.5, facing: 1, id: "josue" }),
        C("homem", 120, "stand", { dy: 0.52, facing: -1, id: "tera" }),
      ] }),
      // v.3 — TOMEI a vosso pai ABRAÃO; multipliquei sua descendência; dei-lhe Isaque.
      b(3, { by: "servo", q: "tomei a vosso pai Abraão dalém do rio", set: "canaa", props: CANAA,
        env: { terrain: "field", glory: 0.58, night: 0.22, verdure: 0.36 }, cast: [
        C("servo", -165, "point", { dy: 0.5, facing: 1, id: "josue" }),
        C("abraao", 40, "walk", { dy: 0.5, facing: -1, id: "abraao", glow: 0.2 }),
        C("isaque", 150, "stand", { dy: 0.54, facing: -1, id: "isaque" }),
      ] }),
      // v.4 — a Isaque dei JACÓ e ESAÚ; a Esaú, o monte Seir; Jacó desceu ao Egito.
      b(4, { by: "servo", q: "a Isaque dei Jacó e Esaú", env: { terrain: "mountain", glory: 0.44, night: 0.24, verdure: 0.2 }, cast: [
        C("servo", -165, "point", { dy: 0.5, facing: 1, id: "josue" }),
        C("jaco", 30, "walk", { dy: 0.5, facing: -1, id: "jaco" }),
        C("esau", 150, "stand", { dy: 0.52, facing: -1, id: "esau" }),
      ] }),
      // v.5 — enviei MOISÉS e ARÃO e feri o Egito; e vos tirei de lá.
      b(5, { by: "servo", q: "enviei Moisés e Arão e feri ao Egito", set: "egito", props: EGITO,
        env: { terrain: "city", glory: 0.42, night: 0.28, storm: 0.1, verdure: 0.1 }, cast: [
        C("servo", -170, "point", { dy: 0.5, facing: 1, id: "josue" }),
        C("moises", -30, "raise", { dy: 0.5, facing: -1, id: "moises", glow: 0.22 }),
        C("arao", 60, "stand", { dy: 0.52, facing: -1, id: "arao" }),
        C("farao", 165, "stand", { dy: 0.5, facing: -1, id: "farao" }),
      ] }),
      // v.6 — os EGÍPCIOS perseguiram vossos pais com CARROS e CAVALEIROS ao Mar Vermelho.
      b(6, { by: "servo", q: "os egípcios perseguiram a vossos pais com carros e com cavaleiros", set: "mar", props: MAR,
        env: { terrain: "field", glory: 0.34, night: 0.34, storm: 0.16, verdure: 0.1 }, cast: [
        C("servo", -170, "point", { dy: 0.5, facing: 1, id: "josue" }),
        C("multidao", -30, "walk", { dy: 0.5, facing: 1 }),
        C("cavaleiro", 150, "stand", { dy: 0.48, facing: -1, id: "egipcio" }),
      ] }),
      // v.7 — clamaram; o mar veio SOBRE os egípcios e os COBRIU. A escuridão do juízo.
      b(7, { by: "servo", q: "trouxe o mar sobre eles, e os cobriu", env: { terrain: "field", glory: 0.28, night: 0.42, storm: 0.2, verdure: 0.08 }, cast: [
        C("servo", -170, "raise", { dy: 0.5, facing: 1, id: "josue" }),
        C("cavaleiro", 120, "lie", { dy: 0.64, id: "egipcio" }),
        C("multidao", -60, "raise", { dy: 0.56, facing: 1 }),
      ] }),
      // v.8 — vos trouxe à terra dos AMORREUS além do Jordão; os entreguei nas mãos.
      b(8, { by: "servo", q: "os quais pelejaram contra vós", set: "deserto", props: DESERTO,
        env: { terrain: "desert", glory: 0.42, night: 0.22, verdure: 0.14 }, cast: [
        C("servo", -165, "point", { dy: 0.5, facing: 1, id: "josue" }),
        C("rei", 140, "lie", { dy: 0.6, id: "amorreu" }),
        C("homem", -30, "raise", { dy: 0.5, facing: -1, id: "guerreiro" }),
      ] }),
      // v.9 — BALAQUE, rei de Moabe, mandou chamar BALAÃO para vos amaldiçoar.
      b(9, { by: "servo", q: "mandou chamar a Balaão, filho de Beor", env: { terrain: "field", glory: 0.4, night: 0.24, verdure: 0.18 }, cast: [
        C("servo", -165, "point", { dy: 0.5, facing: 1, id: "josue" }),
        C("rei", 60, "stand", { dy: 0.5, facing: -1, id: "balaque" }),
        C("homem", 160, "stand", { dy: 0.52, facing: -1, id: "balaao" }),
      ] }),
      // v.10 — não quis ouvir Balaão; ele vos ABENÇOOU, e vos livrei da sua mão.
      b(10, { by: "servo", q: "ele vos abençoou grandemente", env: { glory: 0.56, night: 0.16, verdure: 0.24 }, cast: [
        C("servo", -165, "point", { dy: 0.5, facing: 1, id: "josue" }),
        C("homem", 120, "raise", { dy: 0.52, facing: -1, id: "balaao" }),
      ] }),
      // v.11 — passando o JORDÃO, viestes a JERICÓ; os entreguei nas vossas mãos.
      b(11, { by: "servo", q: "os habitantes de Jericó pelejaram contra vós", set: "jerico", props: JERICO,
        env: { terrain: "field", glory: 0.46, night: 0.2, verdure: 0.22 }, cast: [
        C("servo", -165, "point", { dy: 0.5, facing: 1, id: "josue" }),
        C("multidao", -30, "walk", { dy: 0.5, facing: -1 }),
        C("rei", 165, "bow", { dy: 0.56, facing: -1, id: "jerico" }),
      ] }),
      // v.12 — enviei VESPÕES adiante; não com a tua espada nem com o teu arco.
      b(12, { by: "servo", q: "não com a tua espada nem com o teu arco", env: { glory: 0.5, night: 0.18 }, cast: [
        C("servo", -165, "raise", { dy: 0.5, facing: 1, id: "josue", glow: 0.2 }),
        C("rei", 150, "walk", { dy: 0.5, facing: -1, id: "amorreu" }),
      ] }),
      // v.13 — vos dei a TERRA em que não trabalhastes, cidades que não edificastes.
      b(13, { by: "servo", q: "cidades que não edificastes", set: "vinhas", props: VINHAS,
        env: { terrain: "field", glory: 0.64, night: 0.1, verdure: 0.74 }, cast: [
        C("servo", -155, "raise", { dy: 0.5, facing: 1, id: "josue", glow: 0.24 }),
        C("multidao", 150, "stand", { dy: 0.62 }),
      ] }),
      // v.14 — AGORA, pois, TEMEI ao Senhor e SERVI-O com sinceridade e verdade.
      b(14, { by: "servo", q: "temei ao Senhor, e servi-o com sinceridade e com verdade", set: "siquem", props: SIQUEM,
        env: { terrain: "field", glory: 0.68, night: 0.08, verdure: 0.42 }, cast: [
        C("servo", -155, "raise", { dy: 0.5, facing: 1, id: "josue", glow: 0.28 }),
        C("multidao", 150, "stand", { dy: 0.62 }),
        C("anciao", 40, "stand", { dy: 0.5, id: "anciaos" }),
      ] }),
      // v.15 — ⭐ O DESAFIO: "ESCOLHEI hoje… porém EU E A MINHA CASA serviremos ao Senhor".
      b(15, { by: "servo", q: "eu e a minha casa serviremos ao Senhor", env: { terrain: "field", glory: 0.9, night: 0.05, verdure: 0.45 }, cast: [
        C("servo", -150, "raise", { dy: 0.5, facing: 1, id: "josue", glow: 0.4 }),
        C("multidao", 150, "stand", { dy: 0.6 }),
      ] }),
      // v.16 — o POVO responde: NUNCA nos aconteça que deixemos ao Senhor. (balão da multidão)
      b(16, { by: "multidao", q: "Nunca nos aconteça que deixemos ao Senhor", env: { glory: 0.78, night: 0.08 }, cast: [
        C("multidao", 60, "raise", { dy: 0.56 }),
        C("servo", -160, "stand", { dy: 0.5, facing: 1, id: "josue", glow: 0.28 }),
      ] }),
      // v.17 — porque o SENHOR é o nosso Deus; ele nos fez subir da casa da servidão.
      b(17, { by: "multidao", q: "Porque o Senhor é o nosso Deus", env: { glory: 0.76 }, cast: [
        C("multidao", 40, "raise", { dy: 0.56 }),
        C("servo", -160, "stand", { dy: 0.5, facing: 1, id: "josue", glow: 0.26 }),
      ] }),
      // v.18 — também NÓS serviremos ao Senhor, porquanto é nosso Deus.
      b(18, { by: "multidao", q: "também nós serviremos ao Senhor", env: { glory: 0.82, night: 0.06 }, cast: [
        C("multidao", 40, "raise", { dy: 0.54 }),
        C("servo", -160, "raise", { dy: 0.5, facing: 1, id: "josue", glow: 0.3 }),
      ] }),
      // v.19 — Josué adverte: NÃO PODEREIS servir ao Senhor; é Deus SANTO, Deus ZELOSO.
      b(19, { by: "servo", q: "porquanto é Deus santo, é Deus zeloso", env: { glory: 0.5, night: 0.18 }, cast: [
        C("servo", -150, "raise", { dy: 0.5, facing: 1, id: "josue", glow: 0.24 }),
        C("multidao", 150, "stand", { dy: 0.62 }),
      ] }),
      // v.20 — se DEIXARDES o Senhor, ele vos fará mal e vos consumirá.
      b(20, { by: "servo", q: "vos fará mal, e vos consumirá", env: { glory: 0.38, night: 0.28, storm: 0.1 }, cast: [
        C("servo", -150, "point", { dy: 0.5, facing: 1, id: "josue" }),
        C("multidao", 150, "bow", { dy: 0.64 }),
      ] }),
      // v.21 — o povo insiste: NÃO, antes ao Senhor serviremos.
      b(21, { by: "multidao", q: "Não, antes ao Senhor serviremos", env: { glory: 0.72, night: 0.1 }, cast: [
        C("multidao", 50, "raise", { dy: 0.56 }),
        C("servo", -160, "stand", { dy: 0.5, facing: 1, id: "josue", glow: 0.26 }),
      ] }),
      // v.22 — SOIS TESTEMUNHAS contra vós mesmos de que escolhestes ao Senhor.
      b(22, { by: "servo", q: "Sois testemunhas contra vós mesmos", env: { glory: 0.66, night: 0.1 }, cast: [
        C("servo", -150, "point", { dy: 0.5, facing: 1, id: "josue", glow: 0.24 }),
        C("multidao", 150, "raise", { dy: 0.58 }),
      ] }),
      // v.23 — DEITAI FORA os deuses estranhos e INCLINAI o coração ao Senhor.
      b(23, { by: "servo", q: "inclinai o vosso coração ao Senhor Deus de Israel", env: { glory: 0.72, night: 0.08 }, cast: [
        C("servo", -150, "raise", { dy: 0.5, facing: 1, id: "josue", glow: 0.3 }),
        C("multidao", 150, "stand", { dy: 0.62 }),
      ] }),
      // v.24 — o povo: SERVIREMOS ao Senhor nosso Deus e OBEDECEREMOS à sua voz.
      b(24, { by: "multidao", q: "Serviremos ao Senhor nosso Deus, e obedeceremos à sua voz", env: { glory: 0.84, night: 0.06 }, cast: [
        C("multidao", 50, "raise", { dy: 0.54 }),
        C("servo", -160, "raise", { dy: 0.5, facing: 1, id: "josue", glow: 0.3 }),
      ] }),
      // v.25 — naquele dia FEZ Josué ALIANÇA com o povo, e lhe pôs estatuto em Siquém.
      b(25, { by: "servo", q: "fez Josué aliança com o povo", set: "siquem2", props: SIQUEM,
        env: { terrain: "field", glory: 0.7, night: 0.08, verdure: 0.42 }, cast: [
        C("servo", -150, "raise", { dy: 0.5, facing: 1, id: "josue", glow: 0.28 }),
        C("multidao", 150, "stand", { dy: 0.62 }),
      ] }),
      // v.26 — Josué ESCREVE as palavras e ERGUE a GRANDE PEDRA debaixo do carvalho.
      b(26, { q: "tomou uma grande pedra", set: "pedra", props: PEDRA,
        env: { terrain: "field", glory: 0.66, night: 0.1, verdure: 0.4 }, cast: [
        C("servo", -140, "write", { dy: 0.5, facing: 1, id: "josue", glow: 0.24 }),
        C("multidao", 200, "stand", { dy: 0.64 }),
      ] }),
      // v.27 — "esta PEDRA nos será por TESTEMUNHO, pois ouviu todas as palavras".
      b(27, { by: "servo", q: "esta pedra nos será por testemunho", env: { glory: 0.68, night: 0.09 }, cast: [
        C("servo", -140, "point", { dy: 0.5, facing: 1, id: "josue", glow: 0.26 }),
        C("multidao", 200, "stand", { dy: 0.64 }),
      ] }),
      // v.28 — então Josué ENVIOU o povo, cada um para a sua herança.
      b(28, { q: "cada um para a sua herança", set: "siquem3", props: SIQUEM,
        env: { terrain: "field", glory: 0.6, night: 0.12, verdure: 0.42 }, cast: [
        C("servo", -160, "raise", { dy: 0.5, facing: 1, id: "josue", glow: 0.22 }),
        C("multidao", 120, "walk", { dy: 0.6, facing: -1 }),
      ] }),
      // v.29 — a MORTE de Josué, servo do Senhor, com 110 anos. Repouso reverente.
      b(29, { q: "com idade de cento e dez anos", set: "sepultura", props: SEPULTURA,
        env: { terrain: "field", glory: 0.42, night: 0.4, storm: 0, verdure: 0.28 }, cast: [
        C("servo", -20, "lie", { dy: 0.62, id: "josue" }),
        C("anciao", 130, "bow", { dy: 0.56, facing: 1, id: "anciaos" }),
        C("multidao", 220, "bow", { dy: 0.68 }),
      ] }),
      // v.30 — SEPULTARAM-NO em TIMNATE-SERA, no monte de Efraim.
      b(30, { q: "em Timnate-Sera", env: { terrain: "field", glory: 0.4, night: 0.42, verdure: 0.26 }, cast: [
        C("anciao", -60, "bow", { dy: 0.56, facing: 1, id: "anciaos" }),
        C("homem", 60, "kneel", { dy: 0.58, facing: -1, id: "enlutado" }),
        C("mulherComum", 150, "bow", { dy: 0.54, id: "enlutada" }),
      ] }),
      // v.31 — Israel SERVIU ao Senhor todos os dias de Josué e dos anciãos.
      b(31, { q: "todos os dias de Josué", set: "siquem4", props: SIQUEM,
        env: { terrain: "field", glory: 0.6, night: 0.14, verdure: 0.4 }, cast: [
        C("anciao", -60, "stand", { dy: 0.5, facing: 1, id: "anciaos" }),
        C("multidao", 120, "stand", { dy: 0.62 }),
      ] }),
      // v.32 — os OSSOS DE JOSÉ, trazidos do Egito, sepultados em Siquém.
      b(32, { q: "os ossos de José", set: "sepultura2", props: SEPULTURA,
        env: { terrain: "field", glory: 0.44, night: 0.36, verdure: 0.28 }, cast: [
        C("anciao", -70, "bow", { dy: 0.56, facing: 1, id: "anciaos" }),
        C("multidao", 130, "bow", { dy: 0.66 }),
      ] }),
      // v.33 — a MORTE de ELEAZAR, filho de Arão; sepultado no outeiro de Finéias.
      b(33, { q: "Faleceu também Eleazar", env: { terrain: "field", glory: 0.42, night: 0.4, verdure: 0.26 }, cast: [
        C("servo", -20, "lie", { dy: 0.62, id: "eleazar" }),
        C("servo", 120, "bow", { dy: 0.56, facing: 1, id: "fineias" }),
        C("multidao", 210, "bow", { dy: 0.68 }),
      ] }),
    ],
  },
};
