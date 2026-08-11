// ============================================================================
// JOSUÉ 17–18 — CENA VIVA. A REPARTIÇÃO DA TERRA continua.
//
// Js 17 — A HERANÇA DE MANASSÉS (a outra meia tribo, a oeste do Jordão): a
// sorte cabe a Manassés, o primogênito de José, e a Maquir, homem de guerra. E,
// no coração do capítulo, AS FILHAS DE ZELOFEADE — Maalá, Noa, Hogla, Milca e
// Tirza —, que não tinham irmãos, CHEGAM diante de Eleazar, o sacerdote, e de
// Josué, e dos príncipes, e REIVINDICAM a sua herança "conforme a ordem do
// Senhor a Moisés" (Nm 27): a justiça de Deus para as mulheres sem irmãos, e
// lhes é dada herança no meio dos irmãos de seu pai. Depois, os FILHOS DE JOSÉ
// reclamam por serem povo numeroso, e Josué manda desbravar o BOSQUE e possuir
// as montanhas — ainda que os cananeus do vale tenham CARROS DE FERRO.
//
// Js 18 — SILÓ E A HERANÇA DE BENJAMIM: sujeita a terra, toda a congregação se
// reúne em SILÓ e ali ARMA A TENDA DA CONGREGAÇÃO. Restam SETE TRIBOS sem
// herança, e Josué os repreende pela negligência: manda TRÊS HOMENS de cada
// tribo percorrerem e DEMARCAREM a terra num LIVRO, para que ele lance as
// SORTES perante o Senhor em Siló. Sai a primeira sorte — a de BENJAMIM, cujo
// termo fica entre Judá e a casa de José — e listam-se as suas cidades.
//
// A VOZ DE DEUS (regra do projeto): não há oráculo divino direto em 17–18 (a
// vontade do Senhor já foi dada a Moisés e é invocada pelos homens). Josué é o
// mediador visível: quando fala, `by:"servo"` com Josué (id:"josue") como
// PRIMEIRO servo do beat. As filhas de Zelofeade que falam: `by:"mulherComum"`,
// com a falante (Maalá) como PRIMEIRA. Eleazar, o sacerdote: `servo` id:"eleazar".
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });
const jv = (v: number, q?: string) => b(v, { by: "servo", ...(q ? { q } : {}) }); // Josué fala

// CANAÃ — a cena-base da repartição: o Jordão ao fundo, o arraial, os montes de
// Efraim, as palmeiras da boa terra.
const CANAA: StagePropSpec[] = [
  P("river", 0, 1.4, undefined, 0.86),
  P("tent", -230, 1.05, undefined, 0.2),
  P("tent", 220, 1.0, undefined, 0.24),
  P("palm", -320, 1.05, undefined, 0.14),
  P("grass", 80, 0.78, undefined, 0.68),
  P("rock", 305, 1.1, undefined, 0.3),
];
// DIANTE DA TENDA — Eleazar e Josué e os príncipes recebem as filhas de Zelofeade.
const TRIBUNAL: StagePropSpec[] = [
  { ...P("tent", 0, 1.35, undefined, 0.22), tag: "tenda-da-congregacao" },
  P("palm", -320, 1.05, undefined, 0.14),
  P("grass", -70, 0.8, undefined, 0.8),
  P("grass", 90, 0.78, undefined, 0.72),
  P("rock", 305, 1.1, undefined, 0.3),
];
// O BOSQUE dos perizeus e refains — a floresta que os filhos de José hão de
// cortar para alargar a herança.
const BOSQUE: StagePropSpec[] = [
  P("tree", -140, 1.5, undefined, 0.28),
  P("tree", 60, 1.4, undefined, 0.34),
  P("tree", 210, 1.3, undefined, 0.24),
  P("grass", -60, 0.85, undefined, 0.8),
  P("grass", 120, 0.82, undefined, 0.7),
];
// O VALE DOS CANANEUS — as cidades muradas e os CARROS DE FERRO no vale de
// Jizreel e de Bete-Seã (o ferro sugerido pelas torres tomadas ao longe).
const VALE: StagePropSpec[] = [
  P("tower", -130, 1.28, undefined, 0.26),
  P("tower", 150, 1.22, undefined, 0.32),
  P("rock", 300, 1.1, undefined, 0.3),
  P("grass", -40, 0.76, undefined, 0.78),
];
// SILÓ — a TENDA DA CONGREGAÇÃO armada; o coração do arraial, a terra sujeita.
const SILO: StagePropSpec[] = [
  { ...P("tent", 0, 1.5, undefined, 0.24), tag: "tenda-da-congregacao" },
  P("tent", -240, 1.05, undefined, 0.2),
  P("tent", 230, 1.0, undefined, 0.22),
  P("palm", -320, 1.05, undefined, 0.14),
  P("grass", 90, 0.78, undefined, 0.68),
];
// A DEMARCAÇÃO — os homens percorrem a terra e a descrevem NUM LIVRO.
const DEMARCAR: StagePropSpec[] = [
  { ...P("scroll", 0, 1.15, undefined, 0.5), tag: "livro-da-demarcacao" },
  P("tent", 0, 1.5, undefined, 0.24),
  P("palm", -320, 1.05, undefined, 0.14),
  P("grass", -80, 0.8, undefined, 0.8),
  P("grass", 110, 0.78, undefined, 0.7),
];
// O TERMO DE BENJAMIM — o Jordão ao oriente, os montes e o deserto de Bete-Áven.
const TERMO: StagePropSpec[] = [
  P("river", 210, 1.35, undefined, 0.84),
  P("rock", 0, 1.4, undefined, 0.42),
  P("rock", -220, 1.15, undefined, 0.52),
  P("grass", 100, 0.78, undefined, 0.7),
];
// AS CIDADES DE BENJAMIM — Jericó, Betel, Gibeá, e a que é Jerusalém.
const CIDADES: StagePropSpec[] = [
  P("tower", -150, 1.3, undefined, 0.24),
  P("tower", 40, 1.35, undefined, 0.3),
  P("tower", 200, 1.24, undefined, 0.22),
  P("grass", -60, 0.76, undefined, 0.78),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Js 17
  17: {
    start: { terrain: "field", night: 0.1, glory: 0.6, storm: 0, fire: 0, verdure: 0.4 },
    beats: [
      // v.1 — a sorte cabe a MANASSÉS, primogênito de José; Maquir, homem de guerra.
      b(1, { q: "coube sorte à tribo de Manassés", props: CANAA,
        env: { terrain: "field", glory: 0.6, night: 0.1, verdure: 0.42 }, cast: [
        C("homem", 140, "stand", { dy: 0.5, facing: -1, id: "maquir", scale: 1.1 }),
        C("multidao", -120, "stand", { dy: 0.5 }),
      ] }),
      // v.2 — os demais filhos de Manassés, segundo as suas famílias.
      b(2, { q: "esses são os filhos de Manassés", cast: [
        C("anciao", -110, "stand", { dy: 0.5, facing: 1, id: "familias1" }),
        C("anciao", 20, "stand", { dy: 0.5, id: "familias2" }),
        C("homem", 150, "stand", { dy: 0.52, facing: -1, id: "familias3" }),
      ] }),
      // v.3 — ZELOFEADE não teve filhos, só filhas: Maalá, Noa, Hogla, Milca e Tirza.
      b(3, { q: "não teve filhos, mas só filhas", cast: [
        C("mulherComum", -150, "stand", { dy: 0.5, facing: 1, id: "maala" }),
        C("mulherComum", -60, "stand", { dy: 0.5, id: "noa" }),
        C("mulherComum", 30, "stand", { dy: 0.52, id: "hogla" }),
        C("mulherComum", 120, "stand", { dy: 0.5, facing: -1, id: "milcaz" }),
        C("mulherComum", 200, "stand", { dy: 0.54, facing: -1, id: "tirza" }),
      ] }),
      // v.4 — AS FILHAS chegam diante de Eleazar, Josué e os príncipes e FALAM:
      // "O Senhor ordenou a Moisés que se nos desse herança". Falante = Maalá.
      b(4, { by: "mulherComum", q: "O Senhor ordenou a Moisés que se nos desse herança",
        set: "tribunal", props: TRIBUNAL,
        env: { terrain: "field", glory: 0.62, night: 0.1, verdure: 0.4 }, cast: [
        C("mulherComum", -60, "raise", { dy: 0.52, facing: 1, id: "maala" }),
        C("mulherComum", -140, "stand", { dy: 0.5, facing: 1, id: "irmas" }),
        C("servo", 120, "stand", { dy: 0.5, facing: -1, id: "eleazar", glow: 0.2 }),
        C("servo", 200, "stand", { dy: 0.52, facing: -1, id: "josue" }),
        C("anciao", 60, "stand", { dy: 0.5, facing: -1, id: "principes" }),
      ] }),
      // v.5 — couberam a Manassés DEZ QUINHÕES, afora Gileade e Basã além do Jordão.
      b(5, { q: "couberam a Manassés dez quinhões", set: "canaa", props: CANAA,
        env: { terrain: "field", glory: 0.6, night: 0.1, verdure: 0.42 }, cast: [
        C("multidao", 120, "stand", { dy: 0.58 }),
      ] }),
      // v.6 — porque AS FILHAS de Manassés receberam herança entre os filhos dele.
      b(6, { q: "as filhas de Manassés receberam herança", cast: [
        C("mulherComum", -110, "raise", { dy: 0.5, facing: 1, id: "maala" }),
        C("mulherComum", -20, "stand", { dy: 0.52, id: "irmas" }),
        C("homem", 140, "stand", { dy: 0.5, facing: -1, id: "irmaos" }),
      ] }),
      // v.7 — o termo de Manassés desde Aser até Micmetá, defronte de Siquém.
      b(7, { q: "o termo de Manassés foi desde Aser", cast: [
        C("multidao", 0, "stand", { dy: 0.56 }),
      ] }),
      // v.8 — Tinha Manassés a terra de Tapua; Tapua pertencia a Efraim.
      b(8, { q: "Manassés a terra de Tapua" }),
      // v.9 — descia o termo ao ribeiro de Caná, indo terminar no mar.
      b(9, { q: "descia este termo ao ribeiro de Caná", props: [
        ...CANAA, P("river", -60, 1.2, undefined, 0.78),
      ], env: { verdure: 0.46 }, cast: [
        C("multidao", 130, "stand", { dy: 0.58 }),
      ] }),
      // v.10 — Efraim ao sul, Manassés ao norte; o mar é o seu termo.
      b(10, { q: "Efraim ao sul, e Manassés ao norte" }),
      // v.11 — em Issacar e Aser: Bete-Seã, Ibleã, Dor, En-Dor, Taanaque, Megido; três outeiros.
      b(11, { q: "três outeiros", set: "vale", props: VALE,
        env: { terrain: "city", glory: 0.5, night: 0.14, verdure: 0.24 }, cast: [
        C("multidao", -120, "stand", { dy: 0.5 }),
      ] }),
      // v.12 — os filhos de Manassés NÃO puderam expulsar os cananeus daquelas cidades.
      b(12, { q: "não puderam expulsar os habitantes", env: { glory: 0.42, night: 0.2 }, cast: [
        C("rei", 150, "stand", { dy: 0.48, facing: -1, id: "cananeu" }),
        C("homem", -110, "stand", { dy: 0.5, facing: 1, id: "manassita" }),
      ] }),
      // v.13 — engrossando em forças, fizeram TRIBUTÁRIOS aos cananeus, mas não os expulsaram de todo.
      b(13, { q: "fizeram tributários aos cananeus", env: { glory: 0.48, night: 0.16 }, cast: [
        C("rei", 150, "bow", { dy: 0.5, facing: -1, id: "cananeu" }),
        C("homem", -100, "stand", { dy: 0.5, facing: 1, id: "manassita" }),
      ] }),
      // v.14 — os FILHOS DE JOSÉ reclamam a Josué: "sendo eu um tão grande povo".
      b(14, { by: "homem", q: "sendo eu um tão grande povo", set: "canaa", props: CANAA,
        env: { terrain: "field", glory: 0.55, night: 0.12, verdure: 0.4 }, cast: [
        C("homem", 40, "point", { dy: 0.5, facing: -1, id: "filhosJose" }),
        C("servo", -150, "stand", { dy: 0.5, facing: 1, id: "josue" }),
        C("multidao", 160, "stand", { dy: 0.62 }),
      ] }),
      // v.15 — Josué responde: "sobe ao bosque, e ali corta" — desbrava a floresta!
      jv(15, "sobe ao bosque, e ali corta"),
      // v.16 — os filhos de José: as montanhas não bastam; há CARROS DE FERRO no vale.
      b(16, { by: "homem", q: "também carros de ferro há entre todos os cananeus",
        set: "vale", props: VALE, env: { terrain: "city", glory: 0.44, night: 0.18, verdure: 0.2 }, cast: [
        C("homem", -110, "point", { dy: 0.5, facing: 1, id: "filhosJose" }),
        C("rei", 150, "stand", { dy: 0.48, facing: -1, id: "cananeu" }),
        C("homem", 60, "stand", { dy: 0.52, facing: -1, id: "cananeu2" }),
      ] }),
      // v.17 — Josué à casa de José: "Grande povo és, e grande força tens".
      b(17, { by: "servo", q: "Grande povo és, e grande força tens", set: "bosque", props: BOSQUE,
        env: { terrain: "field", glory: 0.58, night: 0.1, verdure: 0.6 }, cast: [
        C("servo", -150, "raise", { dy: 0.5, facing: 1, id: "josue", glow: 0.15 }),
        C("homem", 130, "stand", { dy: 0.5, facing: -1, id: "filhosJose" }),
      ] }),
      // v.18 — "as montanhas serão tuas": cortarás o bosque, expulsarás os cananeus.
      jv(18, "as montanhas serão tuas"),
    ],
  },

  // ------------------------------------------------------------------ Js 18
  18: {
    start: { terrain: "field", night: 0.1, glory: 0.6, storm: 0, fire: 0, verdure: 0.4 },
    beats: [
      // v.1 — toda a congregação se reúne em SILÓ e ARMA A TENDA DA CONGREGAÇÃO.
      b(1, { q: "se reuniu em Siló, e ali armaram a tenda", set: "silo", props: SILO,
        env: { terrain: "field", glory: 0.64, night: 0.08, verdure: 0.44 }, cast: [
        C("multidao", 140, "stand", { dy: 0.62 }),
        C("servo", -170, "stand", { dy: 0.5, facing: 1, id: "josue" }),
      ] }),
      // v.2 — restam SETE TRIBOS que ainda não repartiram a sua herança.
      b(2, { q: "sete tribos que ainda não tinham repartido", cast: [
        C("multidao", 0, "stand", { dy: 0.6 }),
      ] }),
      // v.3 — Josué repreende: "Até quando sereis negligentes" em possuir a terra?
      b(3, { by: "servo", q: "Até quando sereis negligentes", cast: [
        C("servo", -150, "point", { dy: 0.5, facing: 1, id: "josue" }),
        C("multidao", 140, "stand", { dy: 0.62 }),
      ] }),
      // v.4 — "De cada tribo escolhei vós três homens" para percorrer e demarcar.
      b(4, { by: "servo", q: "De cada tribo escolhei vós três homens", cast: [
        C("servo", -160, "point", { dy: 0.5, facing: 1, id: "josue" }),
        C("homem", 30, "stand", { dy: 0.5, id: "demarcador1" }),
        C("homem", 110, "stand", { dy: 0.52, facing: -1, id: "demarcador2" }),
        C("homem", 190, "stand", { dy: 0.48, id: "demarcador3" }),
      ] }),
      // v.5 — dividi-la-ão em SETE PARTES: Judá ao sul, casa de José ao norte.
      jv(5, "E dividi-la-ão em sete partes"),
      // v.6 — trazei a terra descrita, "para que eu aqui lance as sortes perante o Senhor".
      b(6, { by: "servo", q: "para que eu aqui lance as sortes perante o Senhor",
        set: "demarcar", props: DEMARCAR, env: { glory: 0.66, verdure: 0.42 }, cast: [
        C("servo", -150, "raise", { dy: 0.5, facing: 1, id: "josue", glow: 0.15 }),
        C("multidao", 150, "stand", { dy: 0.62 }),
      ] }),
      // v.7 — os LEVITAS não têm parte: "o sacerdócio do Senhor é a sua parte".
      b(7, { by: "servo", q: "o sacerdócio do Senhor é a sua parte", cast: [
        C("servo", -160, "point", { dy: 0.5, facing: 1, id: "josue" }),
        C("servo", 120, "stand", { dy: 0.5, facing: -1, id: "eleazar", glow: 0.22 }),
      ] }),
      // v.8 — Josué dá ordem aos que iam: "Ide, e percorrei a terra, e demarcai-a".
      b(8, { by: "servo", q: "Ide, e percorrei a terra, e demarcai-a", cast: [
        C("servo", -160, "raise", { dy: 0.5, facing: 1, id: "josue" }),
        C("homem", 40, "walk", { dy: 0.5, facing: -1, id: "demarcador1" }),
        C("homem", 130, "walk", { dy: 0.52, facing: -1, id: "demarcador2" }),
      ] }),
      // v.9 — percorrem a terra e a repartem em sete partes, "descrevendo-a num livro".
      b(9, { q: "descrevendo-a num livro", cast: [
        C("homem", -120, "walk", { dy: 0.5, facing: 1, id: "demarcador1" }),
        C("homem", -20, "write", { dy: 0.52, id: "demarcador2" }),
        C("homem", 150, "walk", { dy: 0.48, facing: -1, id: "demarcador3" }),
      ] }),
      // v.10 — Josué lhes LANÇA AS SORTES em Siló, perante o Senhor, e reparte a terra.
      b(10, { q: "lançou as sortes em Siló", set: "silo", props: SILO,
        env: { terrain: "field", glory: 0.7, night: 0.08, verdure: 0.44 }, cast: [
        C("servo", -150, "raise", { dy: 0.5, facing: 1, id: "josue", glow: 0.2 }),
        C("multidao", 150, "stand", { dy: 0.62 }),
      ] }),
      // v.11 — sai a primeira sorte, a de BENJAMIM, entre Judá e a casa de José.
      b(11, { q: "a sorte da tribo dos filhos de Benjamim", cast: [
        C("multidao", 0, "raise", { dy: 0.6, id: "benjamim" }),
        C("servo", -170, "point", { dy: 0.5, facing: 1, id: "josue" }),
      ] }),
      // v.12 — o termo ao norte, desde o Jordão, sobe ao lado de Jericó.
      b(12, { q: "ao lado de Jericó para o norte", set: "termo", props: [
        ...TERMO, P("tower", -110, 1.15, undefined, 0.3),
      ], env: { terrain: "field", glory: 0.55, night: 0.12, verdure: 0.34 } }),
      // v.13 — passa a Luz (que é Betel), para o sul, e desce a Atarote-Adar.
      b(13, { q: "ao lado de Luz (que é Betel)", set: "cidades", props: CIDADES,
        env: { terrain: "city", glory: 0.5, night: 0.14, verdure: 0.24 } }),
      // v.14 — volta ao ocidente e termina em Quiriate-Baal (Quiriate-Jearim), de Judá.
      b(14, { q: "Quiriate-Baal (que é Quiriate-Jearim)" }),
      // v.15 — a extensão ao sul segue "à fonte das águas de Neftoa".
      b(15, { q: "à fonte das águas de Neftoa", set: "termo", props: [
        ...TERMO, P("well", -80, 1.1, undefined, 0.52),
      ], env: { terrain: "field", glory: 0.52, night: 0.12, verdure: 0.34 } }),
      // v.16 — desce ao vale de Hinom, "do lado dos jebuseus para o sul", até En-Rogel.
      b(16, { q: "do lado dos jebuseus para o sul", env: { terrain: "mountain", glory: 0.42, night: 0.2 } }),
      // v.17 — vai a En-Semes e Gelilote, e "desce à pedra de Boã, filho de Rúben".
      b(17, { q: "desce à pedra de Boã, filho de Rúben", props: [
        ...TERMO, { ...P("rock", 60, 1.25, undefined, 0.5), tag: "pedra-de-boa" },
      ], env: { terrain: "field", glory: 0.5, night: 0.14, verdure: 0.3 } }),
      // v.18 — passa defronte de Arabá para o norte, "e desce a Arabá".
      b(18, { q: "e desce a Arabá" }),
      // v.19 — passa a Bete-Hogla e sai "na baía do Mar Salgado", na extremidade do Jordão.
      b(19, { q: "na baía do Mar Salgado", props: [
        P("river", 0, 1.55, undefined, 0.86),
        P("rock", -240, 1.1, undefined, 0.42),
        P("grass", 120, 0.78, undefined, 0.68),
      ], env: { terrain: "field", glory: 0.5, night: 0.14, verdure: 0.3 } }),
      // v.20 — o Jordão é seu termo ao oriente: "esta é a herança dos filhos de Benjamim".
      b(20, { q: "esta é a herança dos filhos de Benjamim", set: "termo", props: TERMO,
        env: { terrain: "field", glory: 0.6, night: 0.1, verdure: 0.38 }, cast: [
        C("multidao", -120, "stand", { dy: 0.58, id: "benjamim" }),
      ] }),
      // v.21 — as cidades de Benjamim: "Jericó, e Bete-Hogla, e Emeque-Queziz".
      b(21, { q: "Jericó, e Bete-Hogla, e Emeque-Queziz", set: "cidades", props: CIDADES,
        env: { terrain: "city", glory: 0.52, night: 0.12, verdure: 0.24 }, cast: [
        C("multidao", -130, "stand", { dy: 0.56, id: "benjamim" }),
      ] }),
      // v.22 — "E Bete-Arabá, e Zemaraim, e Betel".
      b(22, { q: "Bete-Arabá, e Zemaraim, e Betel" }),
      // v.23 — "E Avim, e Pará, e Ofra".
      b(23, { q: "Avim, e Pará, e Ofra" }),
      // v.24 — Quefar-Amonai, Ofni e Gaba: "doze cidades e as suas aldeias".
      b(24, { q: "doze cidades e as suas aldeias" }),
      // v.25 — "Gibeão, e Ramá e Beerote".
      b(25, { q: "Gibeão, e Ramá e Beerote" }),
      // v.26 — "E Mizpá, e Cefira e Moza".
      b(26, { q: "Mizpá, e Cefira e Moza" }),
      // v.27 — "E Requém e Irpeel, e Tarala".
      b(27, { q: "Requém e Irpeel, e Tarala" }),
      // v.28 — Zela, Elefe, Jebus (Jerusalém), Gibeá e Quiriate: "catorze cidades com as suas aldeias".
      b(28, { q: "catorze cidades com as suas aldeias", props: [
        ...CIDADES, { ...P("tower", 100, 1.4, undefined, 0.28), tag: "jerusalem" },
      ], env: { terrain: "city", glory: 0.54, night: 0.12, verdure: 0.24 }, cast: [
        C("multidao", -140, "stand", { dy: 0.56, id: "benjamim" }),
      ] }),
    ],
  },
};
