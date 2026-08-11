// ============================================================================
// JOSUÉ 19–20 — CENA VIVA. As últimas HERANÇAS por sorte em Siló; a herança de
// JOSUÉ; e as cidades de REFÚGIO.
//
// Js 19 — AS HERANÇAS QUE FALTAVAM: em Siló, à porta da tenda da congregação,
// Eleazar, Josué e os cabeças dos pais lançam as SORTES sobre as tribos que
// restavam. SIMEÃO recebe cidades tiradas do quinhão vasto de JUDÁ (herança
// dentro de herança). ZEBULOM, ISSACAR, ASER e NAFTALI recebem seus termos —
// caminhadas de marco em marco, do nascente ao ocidente, montes, o Jordão e o
// MAR. DÃ recebe termo pequeno e, por isso, SOBE e toma LESÉM à espada, que
// passa a chamar-se DÃ. E, por FIM de tudo — o líder servido por último —,
// Israel dá a JOSUÉ a cidade que pediu: TIMNATE-SERA, na montanha de Efraim,
// que ele REEDIFICA e HABITA. Traço da liderança-servo.
//
// Js 20 — AS CIDADES DE REFÚGIO: o SENHOR fala a Josué (voz do céu, sem figura)
// para APARTAR as cidades onde o HOMICIDA involuntário se acolhe do vingador do
// sangue, até o juízo da congregação e a morte do SUMO SACERDOTE. Quedes,
// Siquém e Hebrom a ocidente; Bezer, Ramote e Golã a oriente do Jordão. Sombra
// de Cristo, o nosso refúgio (Hb 6:18).
//
// A VOZ DE DEUS (regra do projeto): em Js 20 o SENHOR fala a Josué SEM mediador
// visível — `by: "deus"`, voz do céu, glória alta, sem figura. Josué,
// protagonista, é `by: "servo"` com id "josue" (primeiro servo do cast) quando
// fala; aqui ele quase não fala — a repartição é sobretudo narrada.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });
const jv = (v: number, q?: string) => b(v, { by: "servo", ...(q ? { q } : {}) }); // Josué fala
const dv = (v: number, q?: string) => b(v, { by: "deus", ...(q ? { q } : {}) });   // voz do céu

// SILÓ — a repartição por sorte à porta da tenda da congregação: Eleazar, Josué
// e os cabeças dos pais. Cena-base da distribuição das heranças.
const SILO: StagePropSpec[] = [
  { ...P("tent", 0, 1.4, undefined, 0.28), tag: "tenda-da-congregacao" },
  P("tent", -240, 1.0, undefined, 0.2),
  P("tent", 230, 1.0, undefined, 0.24),
  P("palm", -330, 1.05, undefined, 0.14),
  P("rock", 310, 1.1, undefined, 0.32),
  P("grass", 90, 0.78, undefined, 0.68),
];
// AS CIDADES herdadas — torres e casas do quinhão de cada tribo.
const CIDADES: StagePropSpec[] = [
  P("tower", -140, 1.3, undefined, 0.24),
  P("church", 150, 1.2, undefined, 0.28),
  P("tower", 30, 1.0, undefined, 0.42),
  P("rock", 305, 1.1, undefined, 0.3),
  P("grass", -70, 0.76, undefined, 0.72),
];
// OS TERMOS — a caminhada do limite, marco a marco, do nascente ao ocidente.
const TERMOS: StagePropSpec[] = [
  P("rock", -260, 1.15, undefined, 0.42),
  P("rock", 250, 1.1, undefined, 0.5),
  P("rock", 60, 0.9, undefined, 0.66),
  P("palm", -330, 1.0, undefined, 0.14),
  P("grass", -60, 0.8, undefined, 0.8),
  P("grass", 120, 0.76, undefined, 0.7),
];
// O JORDÃO — o termo que desce e termina no rio.
const JORDAO: StagePropSpec[] = [
  P("river", 0, 1.45, undefined, 0.84),
  P("rock", 300, 1.1, undefined, 0.3),
  P("palm", -320, 1.05, undefined, 0.14),
  P("grass", 90, 0.78, undefined, 0.68),
];
// O MAR — a costa de Aser: o Carmelo, Sidom e a forte Tiro, o termo até ao mar.
const MAR: StagePropSpec[] = [
  P("river", 0, 1.6, undefined, 0.88),
  P("rock", -290, 1.25, undefined, 0.5),
  P("rock", 260, 1.15, undefined, 0.54),
  P("tower", 140, 1.1, undefined, 0.32),
  P("palm", -340, 1.0, undefined, 0.14),
];
// O MONTE — a montanha de Naftali, as cidades fortificadas nos altos sóbrios.
const MONTE: StagePropSpec[] = [
  P("rock", 0, 1.55, undefined, 0.42),
  P("rock", 215, 1.2, undefined, 0.54),
  P("tower", -150, 1.15, undefined, 0.3),
  P("church", 120, 1.05, undefined, 0.34),
];
// A GUERRA DE DÃ — Lesém tomada à espada e chamada Dã.
const LESEM: StagePropSpec[] = [
  P("tower", -120, 1.22, undefined, 0.28),
  P("church", 150, 1.15, undefined, 0.34),
  P("rock", 300, 1.1, undefined, 0.3),
  P("grass", -40, 0.76, undefined, 0.78),
];
// TIMNATE-SERA — a herança de Josué na montanha de Efraim: a cidade reedificada
// e habitada. Radiante (o líder servido por último) — mantida em `field` para
// não escurecer o céu de glória, com rochas evocando o monte.
const TIMNATE: StagePropSpec[] = [
  { ...P("church", 0, 1.4, undefined, 0.3), tag: "timnate-sera" },
  P("tower", 205, 1.15, undefined, 0.34),
  P("rock", -270, 1.35, undefined, 0.42),
  P("rock", 300, 1.1, undefined, 0.3),
  P("palm", -340, 1.0, undefined, 0.14),
  P("grass", 100, 0.78, undefined, 0.68),
];
// AS CIDADES DE REFÚGIO — a porta aberta ao homicida; o abrigo do sangue.
const REFUGIO: StagePropSpec[] = [
  { ...P("tower", -20, 1.35, undefined, 0.26), tag: "cidade-de-refugio" },
  P("door", 60, 1.0, undefined, 0.5),
  P("church", 200, 1.1, undefined, 0.3),
  P("rock", 305, 1.1, undefined, 0.3),
  P("grass", -80, 0.78, undefined, 0.72),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Js 19
  19: {
    start: { terrain: "field", night: 0.1, glory: 0.6, storm: 0, fire: 0, verdure: 0.4 },
    beats: [
      // v.1 — SIMEÃO: a segunda sorte; herança no MEIO da herança de Judá.
      b(1, { q: "no meio da herança dos filhos de Judá", props: SILO,
        env: { terrain: "field", glory: 0.6, night: 0.1, verdure: 0.4 }, cast: [
        C("servo", -150, "point", { dy: 0.5, facing: 1, id: "josue", glow: 0.2 }),
        C("servo", -60, "stand", { dy: 0.5, facing: 1, id: "eleazar", glow: 0.15 }),
        C("anciao", 150, "stand", { dy: 0.52, facing: -1, id: "simeao" }),
      ] }),
      // v.2 — as cidades: Berseba, Seba, Moladá.
      b(2, { q: "Berseba, e Seba e Moladá", set: "cidades", props: CIDADES,
        env: { terrain: "city", glory: 0.55, night: 0.12, verdure: 0.3 }, cast: [
        C("homem", 60, "stand", { dy: 0.54, facing: -1, id: "morador" }),
        C("mulherComum", 160, "stand", { dy: 0.5, id: "moradora" }),
      ] }),
      b(3), b(4), b(5),                                                              // Hazar-Sual, Balá, Azem; Eltolade, Betul, Hormá; Ziclague…
      b(6, { q: "treze cidades e as suas aldeias", cast: [                           // treze cidades e suas aldeias
        C("multidao", 40, "stand", { dy: 0.6 }),
      ] }),
      b(7, { q: "quatro cidades e as suas aldeias", cast: [                          // Aim, Rimom, Eter, Asã — quatro cidades
        C("homem", 80, "stand", { dy: 0.54, facing: -1, id: "morador" }),
      ] }),
      b(8, { q: "esta é a herança da tribo dos filhos de Simeão", cast: [            // esta é a herança de Simeão
        C("anciao", 60, "raise", { dy: 0.52, facing: -1, id: "simeao" }),
      ] }),
      // v.9 — a razão: o quinhão de Judá era demasiadamente grande.
      b(9, { q: "a herança dos filhos de Judá era demasiadamente grande", set: "silo", props: SILO,
        env: { terrain: "field", glory: 0.58, night: 0.1, verdure: 0.4 }, cast: [
        C("servo", -140, "point", { dy: 0.5, facing: 1, id: "josue", glow: 0.2 }),
        C("anciao", 70, "stand", { dy: 0.5, facing: -1, id: "judah" }),
        C("anciao", 160, "stand", { dy: 0.52, facing: -1, id: "simeao" }),
      ] }),
      // v.10 — ZEBULOM: a terceira sorte; o termo até Saride.
      b(10, { q: "a terceira sorte pelos filhos de Zebulom", set: "termos", props: TERMOS,
        env: { terrain: "field", glory: 0.54, night: 0.12, verdure: 0.32 }, cast: [
        C("servo", -160, "stand", { dy: 0.5, facing: 1, id: "josue", glow: 0.18 }),
        C("anciao", 130, "walk", { dy: 0.52, facing: -1, id: "zebulom" }),
      ] }),
      // v.11 — o termo SOBE pelo ocidente: marco a marco.
      b(11, { q: "sobe o seu termo pelo ocidente", env: { glory: 0.52 }, cast: [
        C("anciao", -20, "walk", { dy: 0.54, facing: -1, id: "zebulom" }),
        C("homem", 130, "point", { dy: 0.5, facing: -1, id: "medidor" }),
      ] }),
      // v.12 — volta ao oriente, para o NASCENTE DO SOL.
      b(12, { q: "para o nascente do sol", props: [
        ...TERMOS, { ...P("sun", 200, 2.4, undefined, 0.3), sky: true },
      ], env: { glory: 0.62, night: 0.08, verdure: 0.34 }, cast: [
        C("anciao", -40, "walk", { dy: 0.54, facing: -1, id: "zebulom" }),
      ] }),
      b(13, { q: "passa pelo oriente, para o nascente", cast: [                       // Gate-Hefer, Rimom-Metoar, Neá
        C("homem", 40, "walk", { dy: 0.54, facing: -1, id: "medidor" }),
      ] }),
      b(14, { q: "chegando ao vale de Iftá-El", env: { verdure: 0.4 }, cast: [        // rodeia ao norte, o vale de Iftá-El
        C("anciao", -20, "point", { dy: 0.54, facing: -1, id: "zebulom" }),
      ] }),
      b(15, { q: "doze cidades e as suas aldeias", set: "cidades", props: CIDADES,    // Catate, Belém… doze cidades
        env: { terrain: "city", glory: 0.55, night: 0.12, verdure: 0.3 }, cast: [
        C("homem", 60, "stand", { dy: 0.54, facing: -1, id: "morador" }),
        C("mulherComum", 160, "stand", { dy: 0.5, id: "moradora" }),
      ] }),
      b(16, { q: "Esta é a herança dos filhos de Zebulom", cast: [                    // esta é a herança de Zebulom
        C("anciao", 60, "raise", { dy: 0.52, facing: -1, id: "zebulom" }),
      ] }),
      // v.17 — ISSACAR: a quarta sorte.
      b(17, { q: "A quarta sorte saiu para Issacar", set: "silo", props: SILO,
        env: { terrain: "field", glory: 0.58, night: 0.1, verdure: 0.4 }, cast: [
        C("servo", -140, "point", { dy: 0.5, facing: 1, id: "josue", glow: 0.18 }),
        C("servo", -50, "stand", { dy: 0.5, facing: 1, id: "eleazar", glow: 0.12 }),
        C("anciao", 150, "stand", { dy: 0.52, facing: -1, id: "issacar" }),
      ] }),
      // v.18 — Jizreel, Quesulote, Suném — cidades da planície fértil.
      b(18, { q: "Jizreel, e Quesulote e Suném", set: "cidades", props: CIDADES,
        env: { terrain: "city", glory: 0.55, night: 0.12, verdure: 0.34 }, cast: [
        C("homem", 60, "stand", { dy: 0.54, facing: -1, id: "morador" }),
      ] }),
      b(19), b(20), b(21),                                                           // Hafaraim, Siom…; Rabite, Quisiom…; Remete, En-Ganim…
      // v.22 — o termo desce e VAI TERMINAR NO JORDÃO.
      b(22, { q: "vai terminar no Jordão", set: "jordao", props: JORDAO,
        env: { terrain: "field", glory: 0.55, night: 0.1, verdure: 0.34 }, cast: [
        C("anciao", -140, "point", { dy: 0.5, facing: 1, id: "issacar" }),
        C("homem", 120, "walk", { dy: 0.52, facing: -1, id: "medidor" }),
      ] }),
      b(23, { q: "Esta é a herança da tribo dos filhos de Issacar", cast: [          // esta é a herança de Issacar
        C("anciao", 40, "raise", { dy: 0.52, facing: -1, id: "issacar" }),
      ] }),
      // v.24 — ASER: a quinta sorte, no litoral.
      b(24, { q: "a quinta sorte para a tribo dos filhos de Aser", set: "silo", props: SILO,
        env: { terrain: "field", glory: 0.58, night: 0.1, verdure: 0.4 }, cast: [
        C("servo", -140, "point", { dy: 0.5, facing: 1, id: "josue", glow: 0.18 }),
        C("anciao", 150, "stand", { dy: 0.52, facing: -1, id: "aser" }),
      ] }),
      b(25),                                                                         // Helcate, Hali, Béten, Acsafe
      // v.26 — chega ao CARMELO, para o ocidente: a costa do mar.
      b(26, { q: "chega ao Carmelo para o ocidente", set: "mar", props: MAR,
        env: { terrain: "field", glory: 0.56, night: 0.1, verdure: 0.3 }, cast: [
        C("anciao", -150, "point", { dy: 0.5, facing: 1, id: "aser" }),
        C("homem", 130, "stand", { dy: 0.5, facing: -1, id: "pescador" }),
      ] }),
      b(27),                                                                         // volta ao nascente a Bete-Dagom, vale de Iftá-El
      // v.28 — até à GRANDE SIDOM.
      b(28, { q: "até à grande Sidom", env: { glory: 0.54 }, cast: [
        C("homem", 120, "stand", { dy: 0.5, facing: -1, id: "pescador" }),
      ] }),
      // v.29 — o termo torna e termina NO MAR, na forte cidade de Tiro.
      b(29, { q: "para terminar no mar", env: { glory: 0.52, verdure: 0.24 }, cast: [
        C("anciao", -140, "point", { dy: 0.5, facing: 1, id: "aser" }),
      ] }),
      b(30, { q: "vinte e duas cidades e as suas aldeias", set: "cidades", props: CIDADES, // vinte e duas cidades
        env: { terrain: "city", glory: 0.55, night: 0.12, verdure: 0.3 }, cast: [
        C("mulherComum", 60, "stand", { dy: 0.5, id: "moradora" }),
        C("homem", 160, "stand", { dy: 0.54, facing: -1, id: "morador" }),
      ] }),
      b(31, { q: "Esta é a herança da tribo dos filhos de Aser", cast: [             // esta é a herança de Aser
        C("anciao", 40, "raise", { dy: 0.52, facing: -1, id: "aser" }),
      ] }),
      // v.32 — NAFTALI: a sexta sorte, na montanha ao norte.
      b(32, { q: "a sexta sorte para os filhos de Naftali", set: "monte", props: MONTE,
        env: { terrain: "mountain", glory: 0.44, night: 0.18, verdure: 0.22 }, cast: [
        C("anciao", 140, "stand", { dy: 0.5, facing: -1, id: "naftali" }),
      ] }),
      // v.33 — o termo desce e TERMINA NO JORDÃO.
      b(33, { q: "terminando no Jordão", set: "jordao", props: JORDAO,
        env: { terrain: "field", glory: 0.52, night: 0.12, verdure: 0.32 }, cast: [
        C("anciao", -130, "point", { dy: 0.5, facing: 1, id: "naftali" }),
        C("homem", 120, "walk", { dy: 0.52, facing: -1, id: "medidor" }),
      ] }),
      // v.34 — volta pelo ocidente, e a Judá pelo Jordão, AO NASCENTE DO SOL.
      b(34, { q: "ao nascente do sol", props: [
        ...TERMOS, { ...P("sun", 200, 2.4, undefined, 0.32), sky: true },
      ], env: { terrain: "field", glory: 0.6, night: 0.08, verdure: 0.3 }, cast: [
        C("anciao", -20, "walk", { dy: 0.54, facing: -1, id: "naftali" }),
      ] }),
      // v.35 — as CIDADES FORTIFICADAS do monte de Naftali.
      b(35, { q: "as cidades fortificadas", set: "monte", props: MONTE,
        env: { terrain: "mountain", glory: 0.42, night: 0.2, verdure: 0.2 }, cast: [
        C("homem", 60, "stand", { dy: 0.5, facing: -1, id: "sentinela" }),
      ] }),
      b(36, { q: "e Ramá, e Hazor" }),                                               // Adama, Ramá, Hazor
      b(37, { q: "E Quedes, e Edrei, e En-Hazor" }),                                 // Quedes, Edrei, En-Hazor
      b(38, { q: "dezenove cidades e as suas aldeias", cast: [                       // dezenove cidades e suas aldeias
        C("anciao", 40, "stand", { dy: 0.5, facing: -1, id: "naftali" }),
      ] }),
      b(39, { q: "Esta é a herança da tribo dos filhos de Naftali", cast: [          // esta é a herança de Naftali
        C("anciao", 40, "raise", { dy: 0.52, facing: -1, id: "naftali" }),
      ] }),
      // v.40 — DÃ: a sétima sorte.
      b(40, { q: "A sétima sorte saiu para a tribo dos filhos de Dã", set: "silo", props: SILO,
        env: { terrain: "field", glory: 0.55, night: 0.12, verdure: 0.38 }, cast: [
        C("servo", -140, "point", { dy: 0.5, facing: 1, id: "josue", glow: 0.18 }),
        C("anciao", 150, "stand", { dy: 0.52, facing: -1, id: "da" }),
      ] }),
      // v.41 — Sora, Estaol, Ir-Semes.
      b(41, { q: "Sora, e Estaol, e Ir-Semes", set: "cidades", props: CIDADES,
        env: { terrain: "city", glory: 0.54, night: 0.12, verdure: 0.3 }, cast: [
        C("homem", 60, "stand", { dy: 0.54, facing: -1, id: "morador" }),
      ] }),
      b(42), b(43),                                                                  // Saalabim, Aijalom…; Elom, Timna, Ecrom
      b(44), b(45),                                                                  // Elteque, Gibetom, Baalate; Jeúde, Bene-Beraque…
      // v.46 — o termo defronte de Jafo (o litoral estreito de Dã).
      b(46, { q: "o termo defronte de Jafo", set: "mar", props: MAR,
        env: { terrain: "field", glory: 0.5, night: 0.14, verdure: 0.26 }, cast: [
        C("anciao", -140, "point", { dy: 0.5, facing: 1, id: "da" }),
      ] }),
      // v.47 — DÃ SOBE e toma LESÉM à espada, e a chama Dã. Cena de guerra.
      b(47, { q: "pelejaram contra Lesém, e a tomaram", set: "lesem", props: LESEM,
        env: { terrain: "city", glory: 0.4, night: 0.24, storm: 0.1, verdure: 0.2 }, cast: [
        C("homem", -110, "raise", { dy: 0.5, facing: 1, id: "guerreiro" }),
        C("homem", 60, "stand", { dy: 0.52, facing: 1, id: "guerreiro2" }),
        C("rei", 170, "lie", { dy: 0.6, id: "lesem" }),
      ] }),
      b(48, { q: "Esta é a herança da tribo dos filhos de Dã", env: { glory: 0.5, night: 0.16 }, cast: [ // esta é a herança de Dã
        C("anciao", 40, "raise", { dy: 0.52, facing: -1, id: "da" }),
      ] }),
      // v.49 — POR FIM, Israel dá herança a JOSUÉ, no meio deles. O líder por último.
      b(49, { q: "deram os filhos de Israel a Josué", set: "silo", props: SILO,
        env: { terrain: "field", glory: 0.64, night: 0.08, verdure: 0.42 }, cast: [
        C("servo", 0, "stand", { dy: 0.5, facing: 1, id: "josue", glow: 0.3 }),
        C("anciao", -150, "raise", { dy: 0.52, facing: 1, id: "cabecas" }),
        C("multidao", 160, "stand", { dy: 0.6 }),
      ] }),
      // v.50 — TIMNATE-SERA na montanha de Efraim: Josué a reedifica e habita. ÍCONE.
      b(50, { q: "a Timnate-Sera, na montanha de Efraim", set: "timnate", props: TIMNATE,
        env: { terrain: "field", glory: 0.72, night: 0.06, verdure: 0.46 }, cast: [
        C("servo", -60, "raise", { dy: 0.52, facing: 1, id: "josue", glow: 0.35 }),
        C("homem", 130, "stand", { dy: 0.54, facing: -1, id: "efraimita" }),
      ] }),
      // v.51 — encerra-se a repartição em Siló, à PORTA DA TENDA DA CONGREGAÇÃO.
      b(51, { q: "à porta da tenda da congregação", set: "silo", props: SILO,
        env: { terrain: "field", glory: 0.66, night: 0.08, verdure: 0.42 }, cast: [
        C("servo", -60, "stand", { dy: 0.5, facing: 1, id: "eleazar", glow: 0.2 }),
        C("servo", 40, "stand", { dy: 0.5, facing: -1, id: "josue", glow: 0.25 }),
        C("anciao", 170, "bow", { dy: 0.52, facing: -1, id: "cabecas" }),
      ] }),
    ],
  },

  // ------------------------------------------------------------------ Js 20
  20: {
    start: { terrain: "field", night: 0.1, glory: 0.62, storm: 0, fire: 0, verdure: 0.4 },
    beats: [
      // v.1 — o SENHOR fala a Josué: voz do céu, glória, sem figura.
      b(1, { by: "deus", q: "Falou mais o SENHOR a Josué", set: "silo", props: SILO,
        env: { terrain: "field", glory: 0.78, night: 0.06, verdure: 0.4 }, cast: [
        C("servo", 0, "kneel", { dy: 0.52, facing: 1, id: "josue", glow: 0.25 }),
      ] }),
      // v.2 — a ORDEM: APARTAR as cidades de refúgio, faladas por Moisés.
      dv(2, "Apartai para vós as cidades de refúgio"),
      // v.3 — o refúgio para o HOMICIDA que mata por engano, sem intenção.
      dv(3, "o homicida, que matar alguma pessoa por engano"),
      // v.4 — o fugitivo à PORTA da cidade expõe a causa aos anciãos. Ícone da porta.
      b(4, { by: "deus", q: "exporá a sua causa aos ouvidos dos anciãos", set: "refugio", props: REFUGIO,
        env: { terrain: "city", glory: 0.6, night: 0.1, verdure: 0.28 }, cast: [
        C("homem", 20, "kneel", { dy: 0.56, facing: -1, id: "homicida" }),
        C("anciao", 160, "stand", { dy: 0.52, facing: -1, id: "anciaos" }),
      ] }),
      // v.5 — o VINGADOR do sangue chega, mas não lhe entregam o homicida.
      b(5, { by: "deus", q: "não entregarão na sua mão o homicida", env: { glory: 0.56, night: 0.14 }, cast: [
        C("homem", 0, "bow", { dy: 0.56, facing: -1, id: "homicida" }),
        C("anciao", -120, "stand", { dy: 0.5, facing: 1, id: "anciaos" }),
        C("homem", 180, "point", { dy: 0.52, facing: -1, id: "vingador" }),
      ] }),
      // v.6 — habita ali ATÉ o juízo da congregação e a MORTE DO SUMO SACERDOTE.
      // Sombra de Cristo: o refúgio dura até a morte do sacerdote (Hb 6:18).
      b(6, { by: "deus", q: "até que morra o sumo sacerdote", env: { glory: 0.64, night: 0.1 }, cast: [
        C("homem", -20, "stand", { dy: 0.54, facing: 1, id: "homicida" }),
        C("servo", 150, "stand", { dy: 0.5, facing: -1, id: "sacerdote", glow: 0.18 }),
      ] }),
      // v.7 — a OCIDENTE: Quedes na montanha de Naftali, Siquém em Efraim, Hebrom em Judá.
      b(7, { q: "Quedes na Galiléia, na montanha de Naftali", set: "refugio", props: REFUGIO,
        env: { terrain: "mountain", glory: 0.5, night: 0.16, verdure: 0.24 }, cast: [
        C("servo", -150, "point", { dy: 0.5, facing: 1, id: "josue", glow: 0.2 }),
        C("homem", 130, "stand", { dy: 0.54, facing: -1, id: "morador" }),
      ] }),
      // v.8 — a ORIENTE do Jordão: Bezer, Ramote e Golã.
      b(8, { q: "designaram a Bezer, no deserto", set: "jordao", props: JORDAO,
        env: { terrain: "field", glory: 0.52, night: 0.14, verdure: 0.26 }, cast: [
        C("servo", -140, "point", { dy: 0.5, facing: 1, id: "josue", glow: 0.2 }),
        C("homem", 140, "stand", { dy: 0.52, facing: -1, id: "levita" }),
      ] }),
      // v.9 — as cidades PARA TODOS — filhos de Israel e o estrangeiro — refúgio
      // do vingador do sangue. Cristo, o refúgio para todos os que se acolhem.
      b(9, { q: "para que não morresse às mãos do vingador do sangue", set: "refugio", props: REFUGIO,
        env: { terrain: "city", glory: 0.66, night: 0.08, verdure: 0.3 }, cast: [
        C("servo", -150, "raise", { dy: 0.5, facing: 1, id: "josue", glow: 0.25 }),
        C("homem", 30, "kneel", { dy: 0.56, facing: -1, id: "homicida" }),
        C("homem", 150, "stand", { dy: 0.52, facing: -1, id: "estrangeiro" }),
      ] }),
    ],
  },
};
