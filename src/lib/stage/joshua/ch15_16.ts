// ============================================================================
// JOSUÉ 15–16 — CENA VIVA. A herança de JUDÁ e a herança de EFRAIM.
//
// Js 15 — A HERANÇA DE JUDÁ: a maior tribo, aquela de onde viria o Messias — a
// primeira e a mais ampla das sortes. Percorrem-se os LIMITES do sul (o Mar
// Salgado, o ribeiro do Egito), do oriente e do norte (o Jordão, o vale de
// Hinom junto a Jerusalém, a fonte de Neftoa) até o Mar Grande. No meio de
// Judá, CALEBE, filho de Jefoné, recebe HEBROM (a cidade de Arba, pai de
// Anaque) e EXPULSA os três filhos de Anaque — Sesai, Aimã e Talmai. Promete a
// filha ACSA a quem tomar Quiriate-Sefer; OTNIEL a toma, e Acsa, descendo do
// jumento, pede ao pai a bênção das FONTES DE ÁGUAS — e recebe as fontes
// superiores e as inferiores. Segue a longa lista das cidades de Judá, do
// extremo sul às planícies, às montanhas e ao deserto (a Cidade do Sal,
// En-Gedi). E os JEBUSEUS permanecem em Jerusalém "até ao dia de hoje".
//
// Js 16 — A HERANÇA DE EFRAIM: a sorte dos filhos de José, a tribo de Josué.
// Os limites correm desde o Jordão, junto a Jericó, subindo por Betel, Luz,
// Bete-Horom e Gezer até ao mar. Mas os CANANEUS de Gezer NÃO foram expulsos:
// permaneceram no meio de Efraim, tornados tributários.
//
// A VOZ DE DEUS (regra do projeto): nestes capítulos Deus não fala em cena
// (repartição por sortes). As falas são de CALEBE (`by:"servo"`, Calebe como o
// primeiro servo do beat) e de ACSA (`by:"mulherComum"`, Acsa como a primeira
// mulherComum do beat) — os mediadores visíveis daquela cena.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });
const jv = (v: number, q?: string) => b(v, { by: "servo", ...(q ? { q } : {}) }); // Josué/Calebe fala (servo)
const dv = (v: number) => b(v, { by: "deus" });                                    // voz do céu

// OS MARCOS DO LIMITE — a caminhada por outeiros e pedras, seguindo o termo.
const MARCOS: StagePropSpec[] = [
  P("palm", -320, 1.05, undefined, 0.14),
  P("rock", 300, 1.12, undefined, 0.3),
  P("rock", -180, 0.9, undefined, 0.52),
  P("grass", -60, 0.8, undefined, 0.82),
  P("grass", 80, 0.76, undefined, 0.74),
];
// O MAR SALGADO / A FOZ DO JORDÃO — o termo das águas, ao sul e ao oriente.
const AGUAS: StagePropSpec[] = [
  P("river", 0, 1.42, undefined, 0.86),
  P("rock", 300, 1.1, undefined, 0.3),
  P("palm", -320, 1.05, undefined, 0.14),
  P("grass", 90, 0.78, undefined, 0.7),
];
// OS ALTOS — os montes de Seir, o cume diante do vale, o termo que sobe.
const MONTE: StagePropSpec[] = [
  P("rock", 0, 1.5, undefined, 0.42),
  P("rock", 210, 1.18, undefined, 0.52),
  P("rock", -230, 1.0, undefined, 0.56),
  P("grass", -70, 0.76, undefined, 0.8),
];
// O VALE — o vale de Acor, o vale de Hinom; verde entre as encostas.
const VALE: StagePropSpec[] = [
  P("tree", -280, 1.12, undefined, 0.24),
  P("river", 60, 1.2, undefined, 0.8),
  P("rock", 300, 1.05, undefined, 0.32),
  P("grass", -60, 0.85, undefined, 0.8),
  P("grass", 130, 0.8, undefined, 0.72),
];
// HEBROM — a cidade de Arba, pai de Anaque; onde Calebe expulsa os gigantes.
const HEBROM: StagePropSpec[] = [
  P("tower", -130, 1.28, undefined, 0.26),
  P("tower", 150, 1.2, undefined, 0.32),
  P("rock", 300, 1.1, undefined, 0.3),
  P("grass", -40, 0.76, undefined, 0.78),
];
// AS FONTES — a bênção de Acsa: as fontes superiores e as inferiores.
const FONTES: StagePropSpec[] = [
  { ...P("well", 0, 1.32, undefined, 0.42), tag: "fontes-de-acsa" },
  P("river", 250, 1.1, undefined, 0.8),
  P("palm", -300, 1.05, undefined, 0.14),
  P("grass", -80, 0.82, undefined, 0.82),
  P("grass", 120, 0.78, undefined, 0.72),
];
// AS CIDADES DE JUDÁ — torres e muros das cidades e suas aldeias.
const CIDADES: StagePropSpec[] = [
  P("tower", -120, 1.2, undefined, 0.28),
  P("tower", 140, 1.15, undefined, 0.34),
  P("rock", 300, 1.1, undefined, 0.3),
  P("grass", -40, 0.76, undefined, 0.78),
];
// AS PLANÍCIES (a Sefelá) — as cidades baixas entre os campos.
const PLANICIE: StagePropSpec[] = [
  P("tower", 150, 1.02, undefined, 0.36),
  P("tree", -280, 1.08, undefined, 0.26),
  P("rock", 300, 1.05, undefined, 0.32),
  P("grass", -80, 0.84, undefined, 0.78),
  P("grass", 90, 0.8, undefined, 0.7),
];
// AS MONTANHAS — as cidades do alto de Judá, Hebrom entre elas.
const MONTANHAS: StagePropSpec[] = [
  P("tower", -110, 1.1, undefined, 0.34),
  P("rock", 0, 1.5, undefined, 0.44),
  P("rock", 220, 1.15, undefined, 0.54),
  P("grass", -70, 0.76, undefined, 0.8),
];
// O DESERTO DE JUDÁ — a Cidade do Sal e En-Gedi, junto ao Mar Salgado.
const DESERTO_SAL: StagePropSpec[] = [
  P("palm", -320, 1.0, undefined, 0.14),
  P("rock", 280, 1.18, undefined, 0.3),
  P("well", 120, 1.0, undefined, 0.5),
  P("river", -240, 1.15, undefined, 0.84),
  P("grass", -50, 0.68, undefined, 0.5),
];
// JERUSALÉM — a fortaleza dos jebuseus, que permanecem no meio de Judá.
const JERUSALEM: StagePropSpec[] = [
  P("tower", 0, 1.32, undefined, 0.3),
  P("tower", -170, 1.12, undefined, 0.36),
  P("tower", 175, 1.06, undefined, 0.34),
  P("rock", 300, 1.1, undefined, 0.3),
];
// EFRAIM — a herança dos filhos de José, o Jordão junto a Jericó, campos verdes.
const EFRAIM: StagePropSpec[] = [
  P("river", -260, 1.2, undefined, 0.82),
  P("palm", -320, 1.05, undefined, 0.14),
  P("tree", 250, 1.15, undefined, 0.24),
  P("grass", -60, 0.85, undefined, 0.8),
  P("grass", 90, 0.82, undefined, 0.72),
];
// GEZER — a cidade dos cananeus não expulsos, tornados tributários.
const GEZER: StagePropSpec[] = [
  P("tower", 130, 1.2, undefined, 0.32),
  P("tower", -140, 1.12, undefined, 0.36),
  P("rock", 300, 1.05, undefined, 0.3),
  P("grass", -40, 0.78, undefined, 0.76),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Js 15
  15: {
    start: { terrain: "field", night: 0.1, glory: 0.62, storm: 0, fire: 0, verdure: 0.38 },
    beats: [
      // v.1 — A SORTE de Judá: a primeira e a mais ampla das heranças.
      b(1, { q: "A sorte que coube à tribo dos filhos de Judá", props: MARCOS,
        env: { terrain: "field", glory: 0.64, night: 0.1, verdure: 0.36 }, cast: [
        C("servo", -160, "raise", { dy: 0.5, facing: 1, id: "josue", glow: 0.2 }),
        C("servo", -70, "stand", { dy: 0.5, facing: 1, id: "eleazar" }),
        C("multidao", 150, "stand", { dy: 0.6 }),
      ] }),
      // v.2 — o termo do sul: desde a extremidade do Mar Salgado.
      b(2, { q: "desde a extremidade do Mar Salgado", set: "aguas", props: AGUAS,
        env: { terrain: "field", glory: 0.58, night: 0.12, verdure: 0.3 }, cast: [
        C("multidao", -120, "walk", { dy: 0.5, facing: 1 }),
      ] }),
      // v.3 — a subida de Acrabim, Cades-Barnéia: a caminhada pelos marcos do sul.
      b(3, { q: "à subida de Acrabim", set: "marcos", props: MARCOS,
        env: { terrain: "desert", glory: 0.52, night: 0.14, verdure: 0.16 }, cast: [
        C("multidao", 0, "walk", { dy: 0.5 }),
        C("servo", -170, "walk", { dy: 0.5, facing: 1, id: "medidor" }),
      ] }),
      // v.4 — o ribeiro do Egito, e as saídas até ao mar: o limite meridional.
      b(4, { q: "o ribeiro do Egito", set: "aguas", props: AGUAS,
        env: { terrain: "desert", glory: 0.54, night: 0.12, verdure: 0.2 }, cast: [
        C("multidao", -100, "point", { dy: 0.5, facing: -1 }),
      ] }),
      // v.5 — o termo do oriente: o Mar Salgado, até à foz do Jordão.
      b(5, { q: "o Mar Salgado, até à foz do Jordão", env: { glory: 0.56, verdure: 0.24 }, cast: [
        C("multidao", 120, "stand", { dy: 0.5 }),
      ] }),
      // v.6 — sobe a Bete-Hogla, até à pedra de Boã, filho de Rúben.
      b(6, { q: "até à pedra de Boã", set: "marcos", props: [
        ...MARCOS, { ...P("rock", 20, 1.35, undefined, 0.46), tag: "pedra-de-boa" },
      ], env: { terrain: "field", glory: 0.55, night: 0.12, verdure: 0.26 }, cast: [
        C("servo", -150, "point", { dy: 0.5, facing: 1, id: "medidor" }),
        C("multidao", 140, "stand", { dy: 0.6 }),
      ] }),
      // v.7 — desde o vale de Acor rumo a Gilgal, às águas de En-Semes.
      b(7, { q: "desde o vale de Acor", set: "vale", props: VALE,
        env: { terrain: "field", glory: 0.58, night: 0.1, verdure: 0.5 }, cast: [
        C("multidao", -40, "walk", { dy: 0.5 }),
      ] }),
      // v.8 — o vale do filho de Hinom, os jebuseus (esta é Jerusalém), o cume.
      b(8, { q: "esta é Jerusalém", set: "jerusalem", props: JERUSALEM,
        env: { terrain: "field", glory: 0.5, night: 0.18, verdure: 0.28 }, cast: [
        C("servo", -160, "point", { dy: 0.5, facing: 1, id: "medidor" }),
        C("multidao", 150, "stand", { dy: 0.62 }),
      ] }),
      // v.9 — a fonte das águas de Neftoa; as cidades do monte de Efrom.
      b(9, { q: "à fonte das águas de Neftoa", set: "fontes", props: FONTES,
        env: { terrain: "field", glory: 0.6, night: 0.1, verdure: 0.5 }, cast: [
        C("multidao", 140, "stand", { dy: 0.6 }),
      ] }),
      // v.10 — as montanhas de Seir, desce a Bete-Semes, passa por Timna.
      b(10, { q: "até às montanhas de Seir", set: "monte", props: MONTE,
        env: { terrain: "mountain", glory: 0.42, night: 0.22, verdure: 0.2 }, cast: [
        C("multidao", 30, "walk", { dy: 0.56 }),
      ] }),
      // v.11 — ao lado de Ecrom, e o termo finda no mar.
      b(11, { q: "e assim este termo finda no mar", set: "aguas", props: AGUAS,
        env: { terrain: "field", glory: 0.56, night: 0.12, verdure: 0.28 }, cast: [
        C("multidao", -110, "walk", { dy: 0.5, facing: 1 }),
      ] }),
      // v.12 — o Mar Grande ao ocidente: o termo de Judá ao redor.
      b(12, { q: "este é o termo dos filhos de Judá ao redor", env: { glory: 0.62, verdure: 0.34 }, cast: [
        C("multidao", 120, "stand", { dy: 0.6 }),
        C("servo", -160, "raise", { dy: 0.5, facing: 1, id: "josue", glow: 0.2 }),
      ] }),
      // v.13 — CALEBE recebe HEBROM (Arba, pai de Anaque), conforme a ordem do Senhor.
      b(13, { q: "conforme a ordem do Senhor a Josué", set: "hebrom", props: HEBROM,
        env: { terrain: "field", glory: 0.6, night: 0.12, verdure: 0.3 }, cast: [
        C("servo", -150, "point", { dy: 0.5, facing: 1, id: "josue", glow: 0.2 }),
        C("servo", 120, "stand", { dy: 0.5, facing: -1, id: "calebe", glow: 0.18 }),
      ] }),
      // v.14 — CALEBE EXPULSA os três filhos de Anaque: Sesai, Aimã e Talmai.
      b(14, { q: "expulsou dali os três filhos de Anaque", env: { terrain: "field", glory: 0.46, night: 0.2, storm: 0.1, verdure: 0.24 }, cast: [
        C("servo", -120, "raise", { dy: 0.5, facing: 1, id: "calebe", glow: 0.2 }),
        C("homem", 120, "walk", { dy: 0.54, facing: 1, id: "anaque1", scale: 2.1 }),
        C("homem", 210, "stand", { dy: 0.6, facing: 1, id: "anaque2", scale: 2.0 }),
      ] }),
      // v.15 — dali subiu aos habitantes de Debir (antes Quiriate-Sefer).
      b(15, { q: "aos habitantes de Debir", set: "cidades", props: CIDADES,
        env: { terrain: "field", glory: 0.5, night: 0.16, verdure: 0.24 }, cast: [
        C("servo", -140, "walk", { dy: 0.5, facing: 1, id: "calebe" }),
        C("multidao", 130, "stand", { dy: 0.6 }),
      ] }),
      // v.16 — CALEBE FALA: a promessa da filha a quem tomar Quiriate-Sefer.
      b(16, { by: "servo", q: "lhe darei a minha filha Acsa por mulher", cast: [
        C("servo", -120, "raise", { dy: 0.5, facing: 1, id: "calebe", glow: 0.18 }),
        C("multidao", 130, "stand", { dy: 0.6 }),
      ] }),
      // v.17 — OTNIEL toma a cidade; Calebe lhe dá Acsa por mulher.
      b(17, { q: "Tomou-a, pois, Otniel", env: { glory: 0.55, verdure: 0.28 }, cast: [
        C("servo", -140, "raise", { dy: 0.5, facing: 1, id: "otniel" }),
        C("servo", 60, "stand", { dy: 0.5, facing: -1, id: "calebe" }),
        C("mulherComum", 160, "stand", { dy: 0.52, facing: -1, id: "acsa" }),
      ] }),
      // v.18 — Acsa desce do jumento; CALEBE FALA: "Que é que tens?"
      b(18, { by: "servo", q: "Que é que tens", cast: [
        C("servo", -120, "point", { dy: 0.5, facing: 1, id: "calebe", glow: 0.16 }),
        C("mulherComum", 80, "stand", { dy: 0.52, facing: -1, id: "acsa" }),
        C("rebanho", 180, "stand", { dy: 0.6, facing: -1, id: "jumento" }),
      ] }),
      // v.19 — ACSA FALA: "dá-me também fontes de águas" — a bênção das fontes.
      b(19, { by: "mulherComum", q: "dá-me também fontes de águas", set: "fontes", props: FONTES,
        env: { terrain: "field", glory: 0.66, night: 0.08, verdure: 0.6 }, cast: [
        C("mulherComum", -60, "raise", { dy: 0.52, facing: 1, id: "acsa" }),
        C("servo", 120, "stand", { dy: 0.5, facing: -1, id: "calebe", glow: 0.18 }),
      ] }),
      // v.20 — esta é a herança da tribo dos filhos de Judá.
      b(20, { q: "Esta é a herança da tribo dos filhos de Judá", set: "cidades", props: CIDADES,
        env: { terrain: "field", glory: 0.6, night: 0.12, verdure: 0.34 }, cast: [
        C("multidao", 0, "stand", { dy: 0.6 }),
      ] }),
      // v.21-32 — AS CIDADES DO EXTREMO SUL (o Neguebe): Cabzeel, Berseba, Ziclague...
      b(21, { q: "no extremo sul: Cabzeel", set: "marcos", props: MARCOS,
        env: { terrain: "desert", glory: 0.52, night: 0.14, verdure: 0.16 }, cast: [
        C("multidao", 20, "walk", { dy: 0.5 }),
        C("servo", -170, "walk", { dy: 0.5, facing: 1, id: "medidor" }),
      ] }),
      b(22), b(23),
      b(24, { q: "Zife, e Telem, e Bealote", cast: [
        C("multidao", 60, "walk", { dy: 0.5 }),
      ] }),
      b(25), b(26), b(27),
      b(28, { q: "e Berseba", set: "cidades", props: CIDADES,
        env: { terrain: "desert", glory: 0.5, night: 0.14, verdure: 0.18 }, cast: [
        C("multidao", 130, "stand", { dy: 0.6 }),
      ] }),
      b(29), b(30),
      b(31, { q: "E Ziclague", cast: [
        C("multidao", 40, "stand", { dy: 0.58 }),
      ] }),
      b(32, { q: "vinte e nove" }),
      // v.33-36 — AS PLANÍCIES (a Sefelá): Estaol, Zorá, Adulão, Azeca...
      b(33, { q: "Nas planícies: Estaol", set: "planicie", props: PLANICIE,
        env: { terrain: "field", glory: 0.58, night: 0.1, verdure: 0.48 }, cast: [
        C("multidao", 30, "walk", { dy: 0.52 }),
        C("servo", -170, "walk", { dy: 0.5, facing: 1, id: "medidor" }),
      ] }),
      b(34), b(35),
      b(36, { q: "catorze cidades e as suas aldeias" }),
      // v.37-41 — mais cidades da Sefelá: Laquis, Eglom, Maquedá...
      b(37, { set: "cidades", props: CIDADES, env: { terrain: "field", glory: 0.54, night: 0.12, verdure: 0.32 }, cast: [
        C("multidao", 0, "stand", { dy: 0.6 }),
      ] }),
      b(38),
      b(39, { q: "Laquis, e Bozcate, e Eglom", cast: [
        C("multidao", 60, "stand", { dy: 0.58 }),
      ] }),
      b(40),
      b(41, { q: "dezesseis cidades e as suas aldeias" }),
      // v.42-44 — Libna, Queila, Maressa: nove cidades e suas aldeias.
      b(42, { set: "planicie", props: PLANICIE, env: { terrain: "field", glory: 0.56, night: 0.1, verdure: 0.44 }, cast: [
        C("multidao", 20, "walk", { dy: 0.52 }),
      ] }),
      b(43),
      b(44, { q: "nove cidades e as suas aldeias" }),
      // v.45-47 — Ecrom, Asdode, Gaza: até ao rio do Egito e ao Mar Grande.
      b(45, { q: "Ecrom, com suas vilas", set: "cidades", props: CIDADES,
        env: { terrain: "field", glory: 0.52, night: 0.12, verdure: 0.3 }, cast: [
        C("multidao", 120, "stand", { dy: 0.6 }),
      ] }),
      b(46),
      b(47, { q: "o Mar Grande e o seu termo", set: "aguas", props: AGUAS,
        env: { terrain: "field", glory: 0.56, night: 0.1, verdure: 0.28 }, cast: [
        C("multidao", -110, "point", { dy: 0.5, facing: -1 }),
      ] }),
      // v.48-51 — AS MONTANHAS de Judá: Samir, Socó, Debir, Giló...
      b(48, { q: "E nas montanhas: Samir", set: "montanhas", props: MONTANHAS,
        env: { terrain: "mountain", glory: 0.44, night: 0.2, verdure: 0.24 }, cast: [
        C("multidao", 20, "walk", { dy: 0.56 }),
        C("servo", -170, "walk", { dy: 0.5, facing: 1, id: "medidor" }),
      ] }),
      b(49), b(50),
      b(51, { q: "onze cidades e as suas aldeias" }),
      // v.52-54 — a região de HEBROM (Quiriate-Arba): nove cidades e suas aldeias.
      b(52, { set: "montanhas", props: MONTANHAS, env: { terrain: "mountain", glory: 0.44, night: 0.2, verdure: 0.22 }, cast: [
        C("multidao", 40, "stand", { dy: 0.6 }),
      ] }),
      b(53),
      b(54, { q: "Quiriate-Arba (que é Hebrom)", set: "hebrom", props: HEBROM,
        env: { terrain: "field", glory: 0.5, night: 0.14, verdure: 0.28 }, cast: [
        C("servo", 120, "stand", { dy: 0.5, facing: -1, id: "calebe", glow: 0.16 }),
        C("multidao", -120, "stand", { dy: 0.6 }),
      ] }),
      // v.55-57 — Maom, Carmelo, Zife, Timna: dez cidades e suas aldeias.
      b(55, { set: "montanhas", props: MONTANHAS, env: { terrain: "mountain", glory: 0.46, night: 0.18, verdure: 0.26 }, cast: [
        C("multidao", 0, "walk", { dy: 0.58 }),
      ] }),
      b(56),
      b(57, { q: "dez cidades e as suas aldeias" }),
      // v.58-60 — Halul, Bete-Zur, Gedor, Quiriate-Jearim: no alto de Judá.
      b(58, { q: "Halul, Bete-Zur, e Gedor", set: "cidades", props: CIDADES,
        env: { terrain: "field", glory: 0.5, night: 0.14, verdure: 0.3 }, cast: [
        C("multidao", 30, "stand", { dy: 0.6 }),
      ] }),
      b(59),
      b(60, { q: "duas cidades e as suas aldeias" }),
      // v.61-62 — NO DESERTO: Bete-Arabá, a Cidade do Sal, En-Gedi.
      b(61, { q: "No deserto: Bete-Arabá", set: "deserto_sal", props: DESERTO_SAL,
        env: { terrain: "desert", glory: 0.44, night: 0.18, verdure: 0.1 }, cast: [
        C("multidao", 20, "walk", { dy: 0.52 }),
        C("servo", -170, "walk", { dy: 0.5, facing: 1, id: "medidor" }),
      ] }),
      b(62, { q: "a Cidade do Sal, e En-Gedi" }),
      // v.63 — OS JEBUSEUS permanecem em Jerusalém "até ao dia de hoje".
      b(63, { q: "habitaram os jebuseus com os filhos de Judá em Jerusalém", set: "jerusalem", props: JERUSALEM,
        env: { terrain: "field", glory: 0.4, night: 0.24, verdure: 0.22 }, cast: [
        C("homem", 120, "stand", { dy: 0.54, facing: -1, id: "jebuseu" }),
        C("multidao", -120, "stand", { dy: 0.62 }),
      ] }),
    ],
  },

  // ------------------------------------------------------------------ Js 16
  16: {
    start: { terrain: "field", night: 0.1, glory: 0.6, storm: 0, fire: 0, verdure: 0.5 },
    beats: [
      // v.1 — A SORTE dos filhos de JOSÉ: desde o Jordão, junto a Jericó.
      b(1, { q: "Saiu depois a sorte dos filhos de José", props: EFRAIM,
        env: { terrain: "field", glory: 0.62, night: 0.1, verdure: 0.52 }, cast: [
        C("servo", -160, "raise", { dy: 0.5, facing: 1, id: "josue", glow: 0.2 }),
        C("multidao", 140, "stand", { dy: 0.6 }),
      ] }),
      // v.2 — de Betel vai para Luz, ao termo dos arquitas, até Atarote.
      b(2, { q: "E de Betel vai para Luz", set: "monte", props: MONTE,
        env: { terrain: "mountain", glory: 0.46, night: 0.18, verdure: 0.3 }, cast: [
        C("multidao", 20, "walk", { dy: 0.56 }),
        C("servo", -170, "walk", { dy: 0.5, facing: 1, id: "medidor" }),
      ] }),
      // v.3 — desce a Bete-Horom de baixo, e até Gezer, terminando no mar.
      b(3, { q: "até ao termo de Bete-Horom de baixo", set: "efraim", props: EFRAIM,
        env: { terrain: "field", glory: 0.56, night: 0.12, verdure: 0.46 }, cast: [
        C("multidao", -100, "walk", { dy: 0.5, facing: 1 }),
      ] }),
      // v.4 — assim alcançaram a herança os filhos de José, Manassés e Efraim.
      b(4, { q: "Assim alcançaram a sua herança os filhos de José", env: { glory: 0.62, verdure: 0.5 }, cast: [
        C("multidao", 120, "stand", { dy: 0.6 }),
        C("servo", -160, "raise", { dy: 0.5, facing: 1, id: "josue", glow: 0.2 }),
      ] }),
      // v.5 — o termo de EFRAIM: de Atarote-Adar até Bete-Horom de cima.
      b(5, { q: "E foi o termo dos filhos de Efraim", set: "marcos", props: MARCOS,
        env: { terrain: "field", glory: 0.58, night: 0.1, verdure: 0.44 }, cast: [
        C("multidao", 0, "walk", { dy: 0.52 }),
        C("servo", -170, "point", { dy: 0.5, facing: 1, id: "medidor" }),
      ] }),
      // v.6 — sai a Micmetá, torna para o oriente a Taanate-Siló, a Janoa.
      b(6, { q: "até Taanate-Siló", set: "vale", props: VALE,
        env: { terrain: "field", glory: 0.56, night: 0.1, verdure: 0.52 }, cast: [
        C("multidao", 40, "walk", { dy: 0.5 }),
      ] }),
      // v.7 — desce de Janoa a Atarote e Naarate, toca em Jericó, findando no Jordão.
      b(7, { q: "terminando no Jordão", set: "efraim", props: EFRAIM,
        env: { terrain: "field", glory: 0.58, night: 0.1, verdure: 0.5 }, cast: [
        C("multidao", -100, "point", { dy: 0.5, facing: -1 }),
      ] }),
      // v.8 — de Tapua ao ribeiro de Caná, findando no mar: a herança de Efraim.
      b(8, { q: "esta é a herança da tribo dos filhos de Efraim", env: { glory: 0.6, verdure: 0.5 }, cast: [
        C("multidao", 120, "stand", { dy: 0.6 }),
      ] }),
      // v.9 — as cidades separadas para Efraim no meio da herança de Manassés.
      b(9, { q: "as cidades que se separaram para os filhos de Efraim", set: "cidades", props: CIDADES,
        env: { terrain: "field", glory: 0.56, night: 0.12, verdure: 0.42 }, cast: [
        C("multidao", 0, "stand", { dy: 0.6 }),
      ] }),
      // v.10 — os CANANEUS de Gezer NÃO expulsos: permanecem, tornados tributários.
      b(10, { q: "não expulsaram aos cananeus que habitavam em Gezer", set: "gezer", props: GEZER,
        env: { terrain: "field", glory: 0.4, night: 0.24, verdure: 0.3 }, cast: [
        C("homem", 120, "stand", { dy: 0.54, facing: -1, id: "cananeu" }),
        C("homem", 200, "bow", { dy: 0.6, facing: -1, id: "cananeu2" }),
        C("multidao", -120, "stand", { dy: 0.62 }),
      ] }),
    ],
  },
};
