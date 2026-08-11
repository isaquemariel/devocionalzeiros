// ============================================================================
// JOSUÉ 13–14 — CENA VIVA. A TERRA QUE RESTA; a HERANÇA a leste; CALEBE e HEBROM.
//
// Js 13 — JOSUÉ JÁ VELHO: o Senhor fala a Josué, entrado em dias, e "ainda
// muitíssima terra ficou para possuir" — os filisteus, a Gesur, os cananeus, o
// Líbano. Deus promete lançá-los fora e manda REPARTIR a terra por herança. Segue
// a lembrança da herança das DUAS TRIBOS E MEIA a leste do Jordão (Rúben, Gade e a
// meia tribo de Manassés), dada por Moisés, servo do Senhor. Traço teológico forte:
// à tribo de LEVI não se deu herança de terra — "o Senhor Deus de Israel é a sua
// herança". Entre os mortos, BALAÃO, o adivinho, morto à espada.
//
// Js 14 — A REPARTIÇÃO A OESTE começa por SORTES: ELEAZAR, o sacerdote, JOSUÉ e os
// cabeças dos pais das tribos repartem a terra de Canaã. E CALEBE, aos 85 anos, o
// que perseverou em seguir plenamente ao Senhor 45 anos antes, chega a Josué em
// Gilgal e reivindica HEBROM: "dá-me este monte". Josué o abençoa e lhe dá Hebrom
// em herança. E a terra repousou da guerra.
//
// A VOZ DE DEUS (regra do projeto): o Senhor fala DIRETO a Josué, sem mediador
// visível — `by: "deus"` (voz do céu, glória alta, sem figura). JOSUÉ e CALEBE são
// `servo` (id "josue" / "calebe"); quando falam, o `servo` que fala é o PRIMEIRO do
// cast. Eleazar é `servo` id "eleazar".
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });
const jv = (v: number, q?: string) => b(v, { by: "servo", ...(q ? { q } : {}) }); // Josué/Calebe fala (servo que fala = 1º do cast)
const dv = (v: number) => b(v, { by: "deus" });                                    // voz do céu

// GILGAL, em Canaã — a cena-base: o arraial junto ao Jordão, as tendas, os montes.
const GILGAL: StagePropSpec[] = [
  P("river", 0, 1.4, undefined, 0.86),
  P("tent", -230, 1.05, undefined, 0.2),
  P("tent", 220, 1.0, undefined, 0.24),
  P("palm", -320, 1.05, undefined, 0.14),
  P("rock", 310, 1.1, undefined, 0.32),
  P("grass", 80, 0.78, undefined, 0.68),
];
// A TERRA QUE AINDA RESTA — as cidades dos filisteus e da Gesur, ainda por possuir.
const RESTANTE: StagePropSpec[] = [
  P("tower", -140, 1.28, undefined, 0.24),
  P("tower", 155, 1.22, undefined, 0.3),
  P("river", 320, 1.2, undefined, 0.84),
  P("rock", 260, 1.05, undefined, 0.3),
  P("grass", -40, 0.76, undefined, 0.78),
];
// O LÍBANO e os montes até Baal-Gade, ao pé do Hermom — os altos que restam.
const MONTES: StagePropSpec[] = [
  P("rock", 0, 1.5, undefined, 0.42),
  P("rock", 215, 1.2, undefined, 0.54),
  P("tree", -255, 1.1, undefined, 0.26),
  P("grass", -80, 0.78, undefined, 0.8),
];
// A HERANÇA A LESTE do Jordão — o território de Rúben, Gade e meia Manassés.
const LESTE: StagePropSpec[] = [
  P("river", -270, 1.32, undefined, 0.84),
  P("tower", -110, 1.16, undefined, 0.3),
  P("tent", 210, 1.05, undefined, 0.24),
  P("rock", 300, 1.1, undefined, 0.3),
  P("grass", 60, 0.78, undefined, 0.7),
];
// A HERANÇA DE LEVI — não terra, mas o SENHOR: o altar dos sacrifícios queimados.
const LEVITAS: StagePropSpec[] = [
  { ...P("altar", 0, 1.32, 0.7, 0.44), tag: "altar-do-senhor" },
  P("tent", -240, 1.0, undefined, 0.2),
  P("palm", 300, 1.05, undefined, 0.16),
  P("grass", -80, 0.8, undefined, 0.8),
];
// HEBROM, o monte de Calebe — as grandes e fortes cidades dos anaquins a possuir.
const HEBROM: StagePropSpec[] = [
  P("rock", 0, 1.55, undefined, 0.42),
  P("tower", 205, 1.2, undefined, 0.3),
  P("tower", -215, 1.15, undefined, 0.32),
  P("tree", 285, 1.0, undefined, 0.26),
  P("grass", -80, 0.78, undefined, 0.8),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Js 13
  13: {
    start: { terrain: "field", night: 0.12, glory: 0.6, storm: 0, fire: 0, verdure: 0.38 },
    beats: [
      // v.1 — o Senhor fala a Josué, já velho: ainda muitíssima terra resta.
      b(1, { by: "deus", q: "ainda muitíssima terra ficou para possuir", props: GILGAL,
        env: { terrain: "field", glory: 0.7, night: 0.12, verdure: 0.36 }, cast: [
        C("servo", -20, "stand", { dy: 0.52, facing: 1, id: "josue", glow: 0.2 }),
      ] }),
      // v.2 — a terra que ainda fica: os termos dos filisteus e toda a Gesur.
      b(2, { q: "Todos os termos dos filisteus e toda a Gesur", set: "restante", props: RESTANTE,
        env: { terrain: "field", glory: 0.5, night: 0.16, verdure: 0.24 }, cast: [
        C("servo", -160, "point", { dy: 0.5, facing: 1, id: "josue" }),
      ] }),
      // v.3 — os cinco príncipes dos filisteus, de Sior a Ecrom.
      b(3, { q: "cinco príncipes dos filisteus", env: { glory: 0.46, night: 0.18 }, cast: [
        C("rei", 150, "stand", { dy: 0.5, facing: -1, id: "filisteu1" }),
        C("rei", 60, "stand", { dy: 0.52, facing: -1, id: "filisteu2" }),
        C("servo", -170, "stand", { dy: 0.5, facing: 1, id: "josue" }),
      ] }),
      // v.4 — toda a terra dos cananeus, até o termo dos amorreus.
      b(4, { q: "toda a terra dos cananeus", cast: [
        C("multidao", 140, "stand", { dy: 0.6 }),
        C("servo", -160, "point", { dy: 0.5, facing: 1, id: "josue" }),
      ] }),
      // v.5 — a terra dos gebalitas e todo o Líbano, ao pé do Hermom.
      b(5, { q: "todo o Líbano", set: "montes", props: MONTES,
        env: { terrain: "mountain", glory: 0.42, night: 0.2, verdure: 0.2 }, cast: [
        C("servo", -150, "stand", { dy: 0.5, facing: 1, id: "josue" }),
      ] }),
      // v.6 — a PROMESSA: "eu os lançarei"; e a ordem de repartir a terra.
      b(6, { by: "deus", q: "eu os lançarei de diante dos filhos de Israel", set: "gilgal", props: GILGAL,
        env: { terrain: "field", glory: 0.72, night: 0.1, verdure: 0.4 }, cast: [
        C("servo", 0, "raise", { dy: 0.5, facing: 1, id: "josue", glow: 0.22 }),
      ] }),
      // v.7 — REPARTE agora esta terra às nove tribos e à meia de Manassés.
      b(7, { by: "deus", q: "Reparte, pois, agora esta terra por herança", env: { glory: 0.7, night: 0.1 }, cast: [
        C("servo", 0, "point", { dy: 0.5, facing: 1, id: "josue", glow: 0.2 }),
      ] }),
      // v.8 — os rubenitas e gaditas já receberam além do Jordão, por Moisés.
      b(8, { q: "além do Jordão para o oriente", set: "leste", props: LESTE,
        env: { terrain: "field", glory: 0.55, night: 0.14, verdure: 0.34 }, cast: [
        C("multidao", 120, "stand", { dy: 0.58 }),
      ] }),
      // v.9 — desde Aroer e o vale, a campina de Medeba até Dibom.
      b(9, { q: "toda a campina de Medeba até Dibom", cast: [
        C("multidao", 60, "stand", { dy: 0.6 }),
      ] }),
      // v.10 — todas as cidades de Siom, que reinou em Hesbom.
      b(10, { q: "todas as cidades de Siom, rei dos amorreus", env: { glory: 0.48, night: 0.18 }, cast: [
        C("multidao", 60, "stand", { dy: 0.6 }),
      ] }),
      // v.11 — Gileade, os gesureus e maacateus, e todo o monte Hermom.
      b(11, { q: "todo o monte Hermom", set: "montes", props: MONTES,
        env: { terrain: "mountain", glory: 0.44, night: 0.2, verdure: 0.2 } }),
      // v.12 — o reino de Ogue, o resto dos gigantes que Moisés feriu.
      b(12, { q: "Todo o reino de Ogue em Basã", set: "leste", props: LESTE,
        env: { terrain: "field", glory: 0.4, night: 0.24, verdure: 0.24 }, cast: [
        C("rei", 120, "lie", { dy: 0.62, id: "ogue", scale: 1.9 }),
        C("multidao", -120, "stand", { dy: 0.56 }),
      ] }),
      // v.13 — os gesureus e maacateus ficaram no meio de Israel até hoje.
      b(13, { q: "não expulsaram os gesureus", env: { glory: 0.42, night: 0.22 }, cast: [
        C("homem", 140, "stand", { dy: 0.52, facing: -1, id: "gesureu" }),
        C("homem", -110, "stand", { dy: 0.5, facing: 1, id: "maacateu" }),
      ] }),
      // v.14 — a LEVI não se deu herança de terra: os sacrifícios do Senhor.
      b(14, { q: "são a sua herança", set: "levitas", props: LEVITAS,
        env: { terrain: "field", glory: 0.74, night: 0.1, fire: 0.14, verdure: 0.3 }, cast: [
        C("servo", -140, "raise", { dy: 0.5, facing: 1, id: "levita", glow: 0.28 }),
      ] }),
      // v.15 — Moisés deu à tribo de Rúben, segundo as suas famílias.
      b(15, { q: "à tribo dos filhos de Rúben", set: "leste", props: LESTE,
        env: { terrain: "field", glory: 0.55, night: 0.14, verdure: 0.34 }, cast: [
        C("multidao", 60, "stand", { dy: 0.6, id: "ruben" }),
      ] }),
      // v.16 — o limite de Rúben desde Aroer, à beira do Arnom.
      b(16, { q: "desde Aroer", cast: [ C("multidao", 40, "stand", { dy: 0.6 }) ] }),
      // v.17 — Hesbom e suas cidades na campina; Dibom, Bamote-Baal.
      b(17, { q: "Hesbom e todas as suas cidades", env: { glory: 0.5 }, cast: [
        C("multidao", 60, "stand", { dy: 0.6 }),
      ] }),
      // v.18 — Jasa, Quedemote e Mefaate.
      b(18, { q: "E Jasa e Quedemote" }),
      // v.19 — Quiriataim, Sibma e Zerete-Saar, no monte do vale.
      b(19, { q: "no monte do vale" }),
      // v.20 — Bete-Peor, Asdote-Pisga, Bete-Jesimote.
      b(20, { q: "Bete-Peor" }),
      // v.21 — o reino de Siom e os príncipes de Midiã, feridos por Moisés.
      b(21, { q: "como também aos príncipes de Midiã", env: { glory: 0.4, night: 0.24 }, cast: [
        C("rei", 150, "lie", { dy: 0.6, id: "siom" }),
        C("homem", 50, "lie", { dy: 0.62, id: "principe-midia" }),
      ] }),
      // v.22 — BALAÃO, o adivinho, morto à espada entre os mortos. Juízo.
      b(22, { q: "mataram à espada a Balaão", env: { terrain: "field", glory: 0.18, night: 0.55, storm: 0.12, verdure: 0.14 }, cast: [
        C("homem", 0, "lie", { dy: 0.6, id: "balaao" }),
        C("homem", 150, "stand", { dy: 0.5, facing: -1, id: "guerreiro" }),
      ] }),
      // v.23 — o termo de Rúben ficou sendo o Jordão: esta é a sua herança.
      b(23, { q: "esta foi a herança dos filhos de Rúben", set: "leste", props: LESTE,
        env: { terrain: "field", glory: 0.55, night: 0.14, verdure: 0.34 }, cast: [
        C("multidao", 60, "stand", { dy: 0.6, id: "ruben" }),
      ] }),
      // v.24 — Moisés deu à tribo de Gade, segundo as suas famílias.
      b(24, { q: "à tribo de Gade", cast: [ C("multidao", 40, "stand", { dy: 0.6, id: "gade" }) ] }),
      // v.25 — o termo de Gade: Jazer e todas as cidades de Gileade.
      b(25, { q: "todas as cidades de Gileade", env: { glory: 0.5 }, cast: [
        C("multidao", 60, "stand", { dy: 0.6 }),
      ] }),
      // v.26 — desde Hesbom e Maanaim até ao termo de Debir.
      b(26, { q: "desde Maanaim até ao termo de Debir" }),
      // v.27 — no vale, até o mar de Quinerete, o Jordão e o seu termo.
      b(27, { q: "o Jordão e o seu termo", cast: [ C("multidao", 40, "stand", { dy: 0.6 }) ] }),
      // v.28 — esta é a herança dos filhos de Gade.
      b(28, { q: "herança dos filhos de Gade", cast: [ C("multidao", 40, "stand", { dy: 0.6, id: "gade" }) ] }),
      // v.29 — Moisés deu herança à meia tribo de Manassés.
      b(29, { q: "à meia tribo de Manassés", cast: [ C("multidao", 40, "stand", { dy: 0.6, id: "manasses" }) ] }),
      // v.30 — o seu termo: todo o Basã, o reino de Ogue, as aldeias de Jair.
      b(30, { q: "todo o Basã, todo o reino de Ogue", env: { glory: 0.48 }, cast: [
        C("multidao", 60, "stand", { dy: 0.6 }),
      ] }),
      // v.31 — metade de Gileade e Astarote, dadas aos filhos de Maquir.
      b(31, { q: "deu aos filhos de Maquir", cast: [ C("multidao", 40, "stand", { dy: 0.6 }) ] }),
      // v.32 — o que Moisés repartiu nas campinas de Moabe, além do Jordão.
      b(32, { q: "nas campinas de Moabe, além do Jordão", env: { glory: 0.55, verdure: 0.36 }, cast: [
        C("multidao", 60, "stand", { dy: 0.6 }),
      ] }),
      // v.33 — mas a LEVI não deu herança: o SENHOR é a sua herança. Clímax teológico.
      b(33, { q: "o Senhor Deus de Israel é a sua herança", set: "levitas", props: LEVITAS,
        env: { terrain: "field", glory: 0.8, night: 0.08, fire: 0.14, verdure: 0.3 }, cast: [
        C("servo", -140, "raise", { dy: 0.5, facing: 1, id: "levita", glow: 0.32 }),
        C("multidao", 150, "stand", { dy: 0.6 }),
      ] }),
    ],
  },

  // ------------------------------------------------------------------ Js 14
  14: {
    start: { terrain: "field", night: 0.1, glory: 0.62, storm: 0, fire: 0, verdure: 0.4 },
    beats: [
      // v.1 — a herança em Canaã: Eleazar, Josué e os cabeças dos pais repartem.
      b(1, { q: "o que Eleazar, o sacerdote", props: GILGAL,
        env: { terrain: "field", glory: 0.62, night: 0.1, verdure: 0.4 }, cast: [
        C("servo", -140, "raise", { dy: 0.5, facing: 1, id: "eleazar", glow: 0.2 }),
        C("servo", -40, "stand", { dy: 0.5, facing: 1, id: "josue" }),
        C("anciao", 120, "stand", { dy: 0.52, facing: -1, id: "cabecas" }),
      ] }),
      // v.2 — por SORTE da herança, como o Senhor ordenara por Moisés.
      b(2, { q: "Por sorte da sua herança", env: { glory: 0.6 }, cast: [
        C("servo", -120, "point", { dy: 0.5, facing: 1, id: "eleazar" }),
        C("servo", -20, "stand", { dy: 0.5, facing: 1, id: "josue" }),
        C("anciao", 130, "kneel", { dy: 0.56, facing: -1, id: "cabecas" }),
      ] }),
      // v.3 — às 2½ tribos Moisés já dera além do Jordão; aos levitas, não.
      b(3, { q: "aos levitas não tinha dado herança entre eles", cast: [
        C("servo", -40, "stand", { dy: 0.5, facing: 1, id: "josue" }),
        C("multidao", 140, "stand", { dy: 0.6 }),
      ] }),
      // v.4 — José são duas tribos; aos levitas, só cidades para habitarem.
      b(4, { q: "senão cidades em que habitassem", set: "gilgal", props: GILGAL,
        env: { terrain: "field", glory: 0.6, night: 0.1, verdure: 0.38 }, cast: [
        C("servo", -140, "point", { dy: 0.5, facing: 1, id: "levita" }),
        C("multidao", 130, "stand", { dy: 0.6 }),
      ] }),
      // v.5 — como o Senhor ordenara, assim fizeram e repartiram a terra.
      b(5, { q: "e repartiram a terra", env: { glory: 0.62 }, cast: [
        C("servo", -40, "raise", { dy: 0.5, facing: 1, id: "josue", glow: 0.18 }),
        C("multidao", 130, "stand", { dy: 0.6 }),
      ] }),
      // v.6 — os de Judá chegam; CALEBE fala a Josué em Gilgal. Cena forte.
      jv(6, "Tu sabes o que o Senhor falou a Moisés"),
      // v.7 — Calebe: 40 anos quando Moisés o enviou a espiar a terra.
      jv(7, "me enviou de Cades-Barnéia a espiar a terra"),
      // v.8 — enquanto os irmãos amoleceram o povo, ele PERSEVEROU no Senhor.
      jv(8, "perseverei em seguir ao Senhor meu Deus"),
      // v.9 — o JURAMENTO de Moisés: a terra que teu pé pisou será tua.
      jv(9, "a terra que pisou o teu pé será tua"),
      // v.10 — 45 anos depois, o Senhor o conservou vivo: já tem 85 anos.
      jv(10, "tenho já oitenta e cinco anos"),
      // v.11 — e está tão forte hoje como no dia em que Moisés o enviou.
      jv(11, "ainda hoje estou tão forte como no dia"),
      // v.12 — "DÁ-ME ESTE MONTE": Calebe reivindica Hebrom, dos anaquins. ÍCONE.
      b(12, { by: "servo", q: "dá-me este monte", set: "hebrom", props: HEBROM,
        env: { terrain: "field", glory: 0.6, night: 0.12, verdure: 0.28 }, cast: [
        C("servo", -140, "raise", { dy: 0.5, facing: 1, id: "calebe", glow: 0.22 }),
        C("servo", 120, "stand", { dy: 0.5, facing: -1, id: "josue" }),
        C("homem", 210, "stand", { dy: 0.56, facing: -1, id: "anaquim", scale: 2.1 }),
      ] }),
      // v.13 — Josué o abençoa e dá Hebrom a Calebe em herança.
      b(13, { by: "servo", q: "deu a Calebe, filho de Jefoné, a Hebrom em herança",
        env: { terrain: "field", glory: 0.7, night: 0.1, verdure: 0.32 }, cast: [
        C("servo", -120, "raise", { dy: 0.5, facing: 1, id: "josue", glow: 0.25 }),
        C("servo", 90, "bow", { dy: 0.54, facing: 1, id: "calebe", glow: 0.18 }),
      ] }),
      // v.14 — Hebrom ficou herança de Calebe, porque perseverou no Senhor.
      b(14, { q: "perseverara em seguir ao Senhor Deus de Israel", env: { glory: 0.72 }, cast: [
        C("servo", 0, "raise", { dy: 0.5, facing: 1, id: "calebe", glow: 0.22 }),
      ] }),
      // v.15 — Hebrom era Quiriate-Arba; e a terra repousou da guerra.
      b(15, { q: "E a terra repousou da guerra", set: "gilgal", props: GILGAL,
        env: { terrain: "field", glory: 0.68, night: 0.1, verdure: 0.44 }, cast: [
        C("multidao", 60, "stand", { dy: 0.6 }),
      ] }),
    ],
  },
};
