// ============================================================================
// NÚMEROS 25–26 — CENA VIVA. BAAL-PEOR e o zelo de FINÉIAS; o SEGUNDO CENSO.
//
// Nm 25 — BAAL-PEOR: em Sitim, Israel se prostitui com as filhas de Moabe e
// se inclina a Baal-Peor; a IRA do Senhor se acende e vem a PRAGA. Um homem
// traz descaradamente uma midianita ao arraial, enquanto o povo chora diante
// da tenda. FINÉIAS, filho de Eleazar, com zelo santo, toma uma LANÇA e
// traspassa o casal ímpio — e a praga CESSA (morreram vinte e quatro mil).
// Deus dá a Finéias a aliança de PAZ e o sacerdócio perpétuo.
//
// Nm 26 — O SEGUNDO CENSO nas campinas de Moabe, junto ao Jordão: a NOVA
// geração é contada tribo a tribo (a antiga caiu no deserto). A terra será
// repartida por sorte; e dos contados no Sinai nenhum restou, salvo Calebe e
// Josué.
//
// A VOZ DE DEUS (regra do projeto): a ordem vem do alto (`by: "deus"`), sem
// figura. No juízo, glória baixa + noite + nuvem + fogo; na aliança de paz a
// glória sobe sobre Finéias.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });
const dv = (v: number) => b(v, { by: "deus" });

// BAAL-PEOR: o ídolo entronizado, fogo de sacrifício profano, nuvem escura de
// juízo sobre o arraial.
const BAALPEOR: StagePropSpec[] = [
  { ...P("calf", 40, 1.15, undefined, 0.22), tag: "baal-peor" },
  P("campfire", -110, 0.9, 0.8, 0.6),
  P("stall", 210, 0.95, undefined, 0.5),
  P("tent", -290, 1.0, undefined, 0.2),
  { ...P("clouds", -170, 1.25, undefined, 0.86), sky: true }, // céu carregado do juízo (dy alto = alto no céu)
  { ...P("clouds", 170, 1.15, undefined, 0.92), sky: true },
  P("grass", -50, 0.8, undefined, 0.82),
];
// PÓS-PRAGA: o ídolo já não está; a tenda e o altar do sacerdócio, sob a
// glória da aliança de paz dada a Finéias.
const POSPRAGA: StagePropSpec[] = [
  { ...P("tent", -40, 1.4, undefined, 0.12), tag: "tenda" },
  { ...P("altar", 70, 1.0, undefined, 0.42), tag: "altar" },
  P("tent", -290, 1.0, undefined, 0.2),
  P("palm", 300, 1.05, undefined, 0.16),
  P("grass", -60, 0.8, undefined, 0.82),
];

// CAMPINAS DE MOABE (Nm 26): o arraial da nova geração junto ao Jordão.
const CAMPINAS: StagePropSpec[] = [
  { ...P("tent", -40, 1.4, undefined, 0.12), tag: "tabernaculo" },
  P("tent", -290, 1.0, undefined, 0.2),
  P("tent", 220, 1.0, undefined, 0.22),
  P("tent", 300, 0.85, undefined, 0.16),
  P("river", 330, 1.0, undefined, 0.6),
  P("palm", -320, 1.05, undefined, 0.14),
  P("grass", -60, 0.82, undefined, 0.82),
  P("grass", 80, 0.78, undefined, 0.74),
];
const recenseadores = (): CastPlacement[] => [
  C("moises", -150, "stand", { dy: 0.5, facing: 1 }),
  C("servo", -80, "write", { dy: 0.5, facing: 1, id: "eleazar", glow: 0.15 }),
  C("multidao", 150, "stand", { dy: 0.44 }),
];

// ---------------------------------------------------- O CENSO TRIBO A TRIBO (v4-62)
// Cada tribo é um BLOCO: o cabeça daquela casa paterna à frente e o seu povo
// atrás. Cenário e posições mudam de bloco em bloco para a cena não congelar.

// A MESA DO CENSO: a tenda da congregação, o rol onde os nomes são escritos e as
// caixas dos registros por casas paternas.
const CENSO: StagePropSpec[] = [
  { ...P("tent", -30, 1.4, undefined, 0.12), tag: "tabernaculo" },
  { ...P("scroll", -185, 0.9, undefined, 0.58), tag: "rol-do-censo" },
  P("crate", -110, 0.85, undefined, 0.72),
  P("tent", 250, 0.95, undefined, 0.22),
  P("palm", -320, 1.05, undefined, 0.14),
  P("grass", 90, 0.8, undefined, 0.8),
];
// O ACAMPAMENTO DA TRIBO: as tendas da casa paterna, o curral do gado e o poço.
const TRIBO_ACAMPA: StagePropSpec[] = [
  P("tent", -205, 1.1, undefined, 0.2),
  P("tent", 40, 1.0, undefined, 0.26),
  P("stall", 235, 1.0, undefined, 0.5),
  P("well", -305, 0.95, undefined, 0.58),
  P("grass", -80, 0.85, undefined, 0.82),
  P("grass", 120, 0.8, undefined, 0.74),
];
// A LEMBRANÇA DO JUÍZO (v9-11): a terra que abriu a boca sobre Datã e Abirão e o
// fogo que consumiu os duzentos e cinquenta.
const JUIZO: StagePropSpec[] = [
  { ...P("clouds", -170, 1.4, undefined, 0.72), sky: true },
  { ...P("clouds", 150, 1.3, undefined, 0.64), sky: true },
  P("rock", -60, 1.3, undefined, 0.5),
  P("rock", 165, 1.1, undefined, 0.62),
  P("campfire", 260, 1.1, 0.9, 0.46),
];
// O PORTO DE ZEBULOM: a tribo que "habitará no porto dos mares" (Gn 49:13).
const ZEBULOM: StagePropSpec[] = [
  P("river", 60, 1.5, undefined, 0.58),
  P("boat", -115, 1.0, undefined, 0.38),
  P("palm", -310, 1.05, undefined, 0.14),
  P("grass", 220, 0.8, undefined, 0.8),
];
// A SORTE DA HERANÇA (v52-56): a terra repartida — o rio, as searas e a torre da
// cidade que cabe a cada tribo.
const HERANCA: StagePropSpec[] = [
  { ...P("river", 255, 1.2, undefined, 0.5), tag: "jordao" },
  P("tower", -225, 1.1, undefined, 0.26),
  P("sheaf", -60, 0.9, undefined, 0.66),
  P("sheaf", 25, 0.85, undefined, 0.74),
  P("tree", 130, 1.0, undefined, 0.28),
  P("grass", -145, 0.85, undefined, 0.82),
];
// OS LEVITAS À PARTE (v57-62): a tenda, o altar e o incensário — a herança deles
// é o SENHOR, e não a terra (Nm 18:20).
const LEVITAS: StagePropSpec[] = [
  { ...P("tent", -60, 1.45, undefined, 0.12), tag: "tabernaculo" },
  { ...P("altar", 115, 1.0, undefined, 0.44), tag: "altar" },
  P("censer", -195, 0.85, 0.5, 0.6),
  P("lampstand", 235, 0.9, undefined, 0.52),
  P("grass", 20, 0.8, undefined, 0.82),
];

// UM BLOCO DE TRIBO: o cabeça da casa paterna e o seu povo. `dx` e a pose mudam a
// cada tribo, e Eleazar continua escrevendo os nomes à margem.
const tribo = (role: string, id: string, dx: number, pose = "stand", povoDx = 175): CastPlacement[] => [
  C("servo", -285, "write", { glow: 0.15, dy: 0.5, facing: 1, id: "eleazar" }),
  C(role, dx, pose, { dy: 0.5, facing: dx > -70 ? -1 : 1, id }),
  C("multidao", povoDx, "stand", { dy: 0.44 }),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Nm 25
  25: {
    start: { terrain: "field", night: 0.5, glory: 0.1, storm: 0.2, fire: 0.2, verdure: 0.25 },
    beats: [
      b(1, { props: BAALPEOR, env: { terrain: "field", glory: 0.1, night: 0.5, storm: 0.2, verdure: 0.25 }, q: "prostituir-se com as filhas dos moabitas", cast: [ // Israel se prostitui com as filhas de Moabe
        C("multidao", 120, "walk", { dy: 0.44 }),
        C("mulherComum", -20, "stand", { dy: 0.52, facing: -1, id: "moabita" }),
      ] }),
      b(2, { q: "inclinou-se aos seus deuses", cast: [                                // o povo comeu e se inclinou aos seus deuses
        C("multidao", 130, "bow", { dy: 0.46 }),
        C("mulherComum", -20, "stand", { dy: 0.52, facing: -1, id: "moabita" }),
      ] }),
      b(3, { q: "a ira do Senhor se acendeu", env: { glory: 0.06, night: 0.6, storm: 0.35 } }), // juntando-se a Baal-Peor, a IRA do Senhor se acendeu
      b(4, { by: "deus", q: "enforca-os ao Senhor diante do sol", env: { glory: 0.15, night: 0.55 } }), // "toma os cabeças do povo e enforca-os"
      b(5, { by: "moises", q: "Cada um mate os seus homens", cast: [                   // Moisés aos juízes: cada um mate os que se juntaram a Baal-Peor
        C("moises", -140, "point", { dy: 0.5, facing: 1 }),
      ] }),
      b(6, { q: "chorando eles diante da tenda da congregação", env: { glory: 0.06, night: 0.62, storm: 0.3 }, cast: [ // um homem traz descaradamente a midianita; o povo chora
        C("homem", -30, "walk", { dy: 0.52, facing: -1, id: "zimri" }),
        C("mulherComum", 20, "walk", { dy: 0.52, facing: -1, id: "cosbi" }),
        C("multidao", 150, "kneel", { dy: 0.44 }),
        C("moises", -180, "stand", { dy: 0.5, facing: 1 }),
      ] }),
      b(7, { q: "tomou uma lança na sua mão", props: [...BAALPEOR, P("flamingSword", -95, 0.85, undefined, 0.42)], cast: [ // FINÉIAS se levanta e toma uma LANÇA
        C("servo", -60, "raise", { dy: 0.52, facing: -1, glow: 0.3, id: "fineias" }),
        C("homem", 40, "stand", { dy: 0.52, facing: -1, id: "zimri" }),
        C("mulherComum", 90, "stand", { dy: 0.52, facing: -1, id: "cosbi" }),
      ] }),
      b(8, { q: "então a praga cessou de sobre os filhos de Israel", cast: [           // traspassa o casal — e a PRAGA CESSA
        C("servo", -30, "point", { dy: 0.52, facing: -1, glow: 0.35, id: "fineias" }),
        C("homem", 60, "lie", { dy: 0.6, id: "zimri" }),
        C("mulherComum", 110, "lie", { dy: 0.6, id: "cosbi" }),
      ] }),
      b(9, { q: "foram vinte e quatro mil", env: { glory: 0.05, night: 0.65, storm: 0.15 }, cast: [ // vinte e quatro mil morreram da praga
        C("pastor", 130, "lie", { dy: 0.5, id: "mortoPragaA" }),
        C("patriarca", 190, "lie", { scale: 0.92, dy: 0.48, id: "mortoPragaB" }),
        C("pastor", 246, "lie", { scale: 0.85, dy: 0.46, id: "mortoPragaC" }),
      ] }),
      b(10, { by: "deus", props: POSPRAGA, env: { terrain: "field", glory: 0.62, night: 0.35, storm: 0, verdure: 0.3 }, cast: [ // o Senhor fala a Moisés
        C("moises", -150, "kneel", { dy: 0.5, facing: 1 }),
        C("servo", 40, "kneel", { dy: 0.52, facing: -1, glow: 0.3, id: "fineias" }),
      ] }),
      b(11, { by: "deus", q: "foi zeloso com o meu zelo", env: { glory: 0.55, night: 0.2 } }), // Finéias foi ZELOSO com o meu zelo; não consumi Israel
      b(12, { by: "deus", q: "dou a minha aliança de paz", env: { glory: 0.7, night: 0.15 }, cast: [ // "eis que lhe dou a minha aliança de PAZ"
        C("servo", 0, "kneel", { dy: 0.52, facing: 1, glow: 0.5, id: "fineias" }),
      ] }),
      b(13, { by: "deus", q: "a aliança do sacerdócio perpétuo", env: { glory: 0.78 }, cast: [ // a aliança do SACERDÓCIO PERPÉTUO à sua descendência
        C("servo", 0, "stand", { dy: 0.52, facing: 1, glow: 0.55, id: "fineias" }),
      ] }),
      b(14, { q: "era Zimri, filho de Salu" }),                                        // o israelita morto: Zimri, príncipe simeonita
      b(15, { q: "era Cosbi, filha de Zur" }),                                         // a midianita morta: Cosbi, filha de Zur
      dv(16),                                                                          // o Senhor fala a Moisés
      b(17, { by: "deus", q: "Afligireis os midianitas e os ferireis" }),             // "afligireis os midianitas e os ferireis"
      dv(18),                                                                          // porque vos enganaram no caso de Peor
    ],
  },

  // ------------------------------------------------------------------ Nm 26
  26: {
    start: { terrain: "field", night: 0.12, glory: 0.5, storm: 0, fire: 0, verdure: 0.3 },
    beats: [
      b(1, { props: CAMPINAS, env: { terrain: "field", glory: 0.52, night: 0.12, verdure: 0.3 }, q: "falou o SENHOR a Moisés, e a Eleazar", cast: [ // depois da praga, o Senhor fala a Moisés e a Eleazar
        C("moises", -150, "kneel", { dy: 0.5, facing: 1 }),
        C("servo", -80, "kneel", { dy: 0.5, facing: 1, glow: 0.15, id: "eleazar" }),
      ] }),
      b(2, { by: "deus", q: "Tomai a soma de toda a congregação" }),                   // "tomai a soma de toda a congregação, de vinte anos para cima"
      b(3, { q: "nas campinas de Moabe, junto ao Jordão", cast: recenseadores() }),    // Moisés e Eleazar recenseiam nas campinas de Moabe
      b(4, { q: "Conta o povo da idade de vinte anos para cima", set: "censo", props: CENSO, env: { terrain: "field", glory: 0.55, night: 0.12, verdure: 0.3 }, cast: [ // conta o povo, como o Senhor ordenara
        C("moises", -240, "point", { dy: 0.5, facing: 1 }),
        C("servo", -150, "write", { glow: 0.15, dy: 0.5, facing: 1, id: "eleazar" }),
        C("multidao", 160, "stand", { dy: 0.44 }),
      ] }),
      // RÚBEN, o primogênito (v5-11)
      b(5, { q: "o primogênito de Israel", set: "ruben", props: TRIBO_ACAMPA, env: { glory: 0.58, verdure: 0.34 }, cast: tribo("patriarca", "cabeca-de-ruben", -40, "stand", 190) }), // Rúben, o primogênito: Enoque e Palu
      b(6, { cast: tribo("anciao", "cabeca-de-hezrom", 60, "stand", 220) }),           // Hezrom e Carmi
      b(7, { env: { glory: 0.62 }, cast: [                                             // 43.730 rubenitas
        C("servo", -285, "write", { glow: 0.15, dy: 0.5, facing: 1, id: "eleazar" }),
        C("multidao", 40, "stand", { dy: 0.5 }),
        C("multidao", 200, "stand", { scale: 0.9, dy: 0.4, id: "povo-de-ruben" }),
      ] }),
      b(8, { cast: tribo("homem", "eliabe-filho-de-palu", -20, "stand", 200) }),       // Palu, e Eliabe seu filho
      b(9, { q: "contenderam contra Moisés e contra Arão no grupo de Coré", set: "core", props: JUIZO, env: { terrain: "field", glory: 0.12, night: 0.52, storm: 0.3, verdure: 0.12 }, cast: [ // Datã e Abirão, do grupo de Coré
        C("homem", -60, "point", { dy: 0.52, facing: -1, id: "data-o-contendor" }),
        C("homem", 30, "raise", { dy: 0.5, facing: -1, id: "abirao-o-contendor" }),
        C("moises", -240, "stand", { dy: 0.5, facing: 1 }),
      ] }),
      b(10, { q: "a terra abriu a sua boca", env: { glory: 0.08, night: 0.62, storm: 0.35, fire: 0.7 }, cast: [ // a terra os tragou; o fogo consumiu os 250
        C("homem", -50, "lie", { dy: 0.62, facing: -1, id: "data-o-contendor" }),
        C("homem", 60, "lie", { dy: 0.58, facing: -1, id: "abirao-o-contendor" }),
        C("anciao", 165, "lie", { scale: 0.92, dy: 0.52, id: "principe-do-incensario" }),
      ] }),
      b(11, { set: "filhos-de-core", props: TRIBO_ACAMPA, env: { terrain: "field", glory: 0.6, night: 0.12, storm: 0, fire: 0, verdure: 0.32 }, cast: [ // "mas os filhos de Coré NÃO morreram"
        C("homem", -30, "kneel", { dy: 0.52, facing: -1, glow: 0.2, id: "filho-de-core" }),
        C("mulherComum", 50, "kneel", { dy: 0.5, facing: -1, id: "casa-de-core" }),
        C("servo", -285, "write", { glow: 0.15, dy: 0.5, facing: 1, id: "eleazar" }),
      ] }),
      // SIMEÃO (v12-14)
      b(12, { set: "simeao", props: CENSO, env: { glory: 0.56, verdure: 0.28 }, cast: tribo("anciao", "cabeca-de-simeao", 30, "stand", 200) }), // Nemuel, Jamim, Jaquim
      b(13, { cast: tribo("homem", "cabeca-de-zera-simeonita", -60, "stand", 150) }), // Zerá e Saul
      b(14, { env: { glory: 0.6 }, cast: [                                            // 22.200 simeonitas — a tribo que mais minguou
        C("servo", -285, "write", { glow: 0.15, dy: 0.5, facing: 1, id: "eleazar" }),
        C("multidao", 90, "stand", { scale: 0.92, dy: 0.44 }),
      ] }),
      // GADE (v15-18)
      b(15, { set: "gade", props: TRIBO_ACAMPA, env: { glory: 0.58, verdure: 0.42 }, cast: [ // Zefom, Hagi, Suni — a tribo de muito gado
        C("pastor", -50, "stand", { dy: 0.5, facing: -1, id: "cabeca-de-gade" }),
        C("rebanho", 120, "stand", { dy: 0.58, id: "gado-de-gade" }),
        C("servo", -285, "write", { glow: 0.15, dy: 0.5, facing: 1, id: "eleazar" }),
      ] }),
      b(16, { cast: tribo("homem", "cabeca-de-ozni", 70, "stand", 220) }),            // Ozni e Eri
      b(17, { cast: tribo("anciao", "cabeca-de-arode", -30, "point", 160) }),         // Arode e Areli
      b(18, { env: { glory: 0.62 }, cast: [                                           // 40.500 gaditas
        C("servo", -285, "write", { glow: 0.15, dy: 0.5, facing: 1, id: "eleazar" }),
        C("multidao", 60, "stand", { dy: 0.48 }),
        C("rebanho", 220, "stand", { scale: 0.9, dy: 0.44, id: "gado-de-gade" }),
      ] }),
      // JUDÁ (v19-22) — a tribo do cetro, a maior do censo
      b(19, { set: "juda-luto", props: JUIZO, env: { terrain: "field", glory: 0.15, night: 0.48, storm: 0.2, fire: 0.3, verdure: 0.14 }, cast: [ // Er e Onã morreram na terra de Canaã
        C("homem", -20, "lie", { dy: 0.6, facing: -1, id: "er-filho-de-juda" }),
        C("homem", 80, "lie", { scale: 0.95, dy: 0.54, facing: -1, id: "ona-filho-de-juda" }),
      ] }),
      b(20, { set: "juda", props: TRIBO_ACAMPA, env: { terrain: "field", glory: 0.66, night: 0.1, storm: 0, fire: 0, verdure: 0.4 }, cast: [ // Selá, Perez e Zerá — de Judá vem o cetro (Gn 49:10)
        C("rei", -40, "stand", { dy: 0.5, facing: -1, glow: 0.25, id: "cabeca-de-juda" }),
        C("multidao", 170, "stand", { dy: 0.44 }),
        C("servo", -285, "write", { glow: 0.15, dy: 0.5, facing: 1, id: "eleazar" }),
      ] }),
      b(21, { cast: tribo("patriarca", "cabeca-de-perez", 60, "stand", 210) }),       // Hezrom e Hamul, de Perez
      b(22, { env: { glory: 0.72 }, cast: [                                           // 76.500 — a maior de todas as tribos
        C("rei", -60, "raise", { dy: 0.5, facing: -1, glow: 0.3, id: "cabeca-de-juda" }),
        C("multidao", 60, "stand", { dy: 0.5 }),
        C("multidao", 220, "stand", { scale: 0.92, dy: 0.4, id: "povo-de-juda" }),
      ] }),
      // ISSACAR (v23-25)
      b(23, { set: "issacar", props: CENSO, env: { glory: 0.58, verdure: 0.32 }, cast: tribo("patriarca", "cabeca-de-issacar", -50, "stand", 150) }), // Tola e Puva
      b(24, { cast: tribo("homem", "cabeca-de-jasube", 80, "stand", 230) }),          // Jasube e Sinrom
      b(25, { env: { glory: 0.62 }, cast: [                                           // 64.300 de Issacar
        C("servo", -285, "write", { glow: 0.15, dy: 0.5, facing: 1, id: "eleazar" }),
        C("multidao", 30, "stand", { dy: 0.48 }),
        C("multidao", 190, "stand", { scale: 0.9, dy: 0.4, id: "povo-de-issacar" }),
      ] }),
      // ZEBULOM (v26-27) — o porto dos mares
      b(26, { set: "zebulom", props: ZEBULOM, env: { terrain: "field", glory: 0.6, night: 0.1, verdure: 0.36, water: 0.4 }, cast: tribo("homem", "cabeca-de-zebulom", -50, "stand", 200) }), // Serede, Elom, Jaleel
      b(27, { env: { glory: 0.64 }, cast: [                                           // 60.500 zebulonitas
        C("multidao", -10, "stand", { dy: 0.48 }),
        C("servo", -285, "write", { glow: 0.15, dy: 0.5, facing: 1, id: "eleazar" }),
      ] }),
      // JOSÉ: MANASSÉS e EFRAIM (v28-37)
      b(28, { set: "jose", props: CENSO, env: { terrain: "field", glory: 0.64, night: 0.1, verdure: 0.34, water: 0 }, cast: [ // os filhos de José: Manassés e Efraim
        C("patriarca", -40, "stand", { dy: 0.5, facing: -1, id: "cabeca-de-manasses" }),
        C("patriarca", 50, "stand", { scale: 0.96, dy: 0.48, facing: -1, id: "cabeca-de-efraim" }),
        C("servo", -285, "write", { glow: 0.15, dy: 0.5, facing: 1, id: "eleazar" }),
      ] }),
      b(29, { set: "manasses", props: TRIBO_ACAMPA, env: { glory: 0.58, verdure: 0.4 }, cast: tribo("patriarca", "cabeca-de-maquir", -60, "stand", 180) }), // Maquir, e Gileade seu filho
      b(30, { cast: tribo("homem", "cabeca-de-jezer", 50, "stand", 220) }),           // Jezer e Heleque
      b(31, { cast: tribo("anciao", "cabeca-de-asriel", -20, "point", 150) }),        // Asriel e Siquém
      b(32, { cast: tribo("homem", "cabeca-de-hefer", 90, "stand", 240) }),           // Semida e Hefer
      b(33, { q: "os nomes das filhas de Zelofeade", cast: [                           // as filhas de Zelofeade, que não teve filhos
        C("mulherComum", 20, "stand", { dy: 0.5, facing: -1, id: "filhas-zelofeade" }),
        C("mulherComum", 80, "stand", { dy: 0.48, facing: -1, scale: 0.95, id: "filhas-zelofeade2" }),
      ] }),
      b(34, { env: { glory: 0.62 }, cast: [                                           // 52.700 de Manassés
        C("servo", -285, "write", { glow: 0.15, dy: 0.5, facing: 1, id: "eleazar" }),
        C("multidao", 50, "stand", { dy: 0.48 }),
        C("multidao", 210, "stand", { scale: 0.9, dy: 0.4, id: "povo-de-manasses" }),
      ] }),
      // EFRAIM (v35-37)
      b(35, { set: "efraim", props: CENSO, env: { glory: 0.58, verdure: 0.3 }, cast: tribo("patriarca", "cabeca-de-efraim", -50, "stand", 160) }), // Sutela, Bequer, Taã
      b(36, { cast: tribo("homem", "cabeca-de-era", 70, "stand", 230) }),             // Erã, filho de Sutela
      b(37, { env: { glory: 0.64 }, cast: [                                           // 32.500 de Efraim — os filhos de José, por famílias
        C("patriarca", -60, "stand", { dy: 0.5, facing: -1, id: "cabeca-de-efraim" }),
        C("multidao", 110, "stand", { dy: 0.46 }),
        C("servo", -285, "write", { glow: 0.15, dy: 0.5, facing: 1, id: "eleazar" }),
      ] }),
      // BENJAMIM (v38-41)
      b(38, { set: "benjamim", props: TRIBO_ACAMPA, env: { glory: 0.58, verdure: 0.38 }, cast: tribo("anciao", "cabeca-de-benjamim", -40, "stand", 190) }), // Belá, Asbel, Airã
      b(39, { cast: tribo("homem", "cabeca-de-sufa", 60, "stand", 220) }),            // Sufã e Hufã
      b(40, { cast: tribo("homem", "cabeca-de-bela", -70, "point", 140) }),           // Arde e Naamã, de Belá
      b(41, { env: { glory: 0.62 }, cast: [                                           // 45.600 benjamitas
        C("servo", -285, "write", { glow: 0.15, dy: 0.5, facing: 1, id: "eleazar" }),
        C("multidao", 40, "stand", { dy: 0.48 }),
        C("multidao", 200, "stand", { scale: 0.9, dy: 0.4, id: "povo-de-benjamim" }),
      ] }),
      // DÃ (v42-43)
      b(42, { set: "da", props: CENSO, env: { glory: 0.56, verdure: 0.28 }, cast: tribo("patriarca", "cabeca-de-da", 40, "stand", 210) }), // Suã: uma só família, e enorme
      b(43, { env: { glory: 0.62 }, cast: [                                           // 64.400 suamitas
        C("multidao", 20, "stand", { dy: 0.5 }),
        C("multidao", 190, "stand", { scale: 0.92, dy: 0.4, id: "povo-de-da" }),
        C("servo", -285, "write", { glow: 0.15, dy: 0.5, facing: 1, id: "eleazar" }),
      ] }),
      // ASER (v44-47)
      b(44, { set: "aser", props: TRIBO_ACAMPA, env: { glory: 0.58, verdure: 0.44 }, cast: tribo("anciao", "cabeca-de-aser", -50, "stand", 170) }), // Imna, Isvi, Berias
      b(45, { cast: tribo("homem", "cabeca-de-heber", 70, "stand", 230) }),           // Héber e Malquiel, de Berias
      b(46, { cast: [                                                                 // Sera, a filha de Aser — nome guardado no meio dos milhares
        C("mulherComum", 10, "stand", { dy: 0.52, facing: -1, id: "sera-filha-de-aser" }),
        C("servo", -285, "write", { glow: 0.15, dy: 0.5, facing: 1, id: "eleazar" }),
        C("multidao", 200, "stand", { scale: 0.9, dy: 0.42, id: "povo-de-aser" }),
      ] }),
      b(47, { env: { glory: 0.62 }, cast: [                                           // 53.400 de Aser
        C("servo", -285, "write", { glow: 0.15, dy: 0.5, facing: 1, id: "eleazar" }),
        C("multidao", 70, "stand", { dy: 0.48 }),
      ] }),
      // NAFTALI (v48-50)
      b(48, { set: "naftali", props: CENSO, env: { glory: 0.58, verdure: 0.3 }, cast: tribo("patriarca", "cabeca-de-naftali", -60, "stand", 150) }), // Jazeel e Guni
      b(49, { cast: tribo("homem", "cabeca-de-silem", 80, "stand", 240) }),           // Jezer e Silém
      b(50, { env: { glory: 0.64 }, cast: [                                           // 45.400 de Naftali
        C("servo", -285, "write", { glow: 0.15, dy: 0.5, facing: 1, id: "eleazar" }),
        C("multidao", 30, "stand", { dy: 0.5 }),
        C("multidao", 200, "stand", { scale: 0.9, dy: 0.4, id: "povo-de-naftali" }),
      ] }),
      b(51, { q: "seiscentos e um mil e setecentos e trinta", cast: recenseadores() }), // o total: 601.730
      b(52, { by: "deus", set: "heranca", props: HERANCA, env: { terrain: "field", glory: 0.6, night: 0.1, verdure: 0.5 }, cast: [ // o Senhor fala a Moisés
        C("moises", -290, "kneel", { dy: 0.5, facing: 1 }),
      ] }),
      b(53, { by: "deus", q: "repartirá a terra em herança", env: { glory: 0.68 }, cast: [ // "a estes se repartirá a terra em herança"
        C("moises", -290, "stand", { dy: 0.5, facing: 1 }),
        C("multidao", 60, "stand", { dy: 0.46 }),
      ] }),
      b(54, { by: "deus", cast: [                                                      // aos muitos mais, aos poucos menos
        C("multidao", -60, "stand", { dy: 0.5 }),
        C("anciao", 130, "stand", { scale: 0.92, dy: 0.44, facing: -1, id: "casa-de-poucos" }),
        C("anciao", 205, "stand", { scale: 0.88, dy: 0.4, facing: -1, id: "casa-de-poucos2" }),
      ] }),
      b(55, { by: "deus", q: "a terra se repartirá por sortes", env: { glory: 0.74 }, cast: [ // "todavia a terra se repartirá por SORTES"
        C("moises", -290, "raise", { dy: 0.5, facing: 1 }),
        C("servo", -200, "stand", { glow: 0.2, dy: 0.5, facing: 1, id: "eleazar" }),
        C("multidao", 120, "stand", { dy: 0.46 }),
      ] }),
      b(56, { by: "deus", env: { glory: 0.7 }, cast: [                                 // segundo sair a sorte, entre as de muitos e as de poucos
        C("servo", -80, "point", { glow: 0.2, dy: 0.5, facing: -1, id: "eleazar" }),
        C("patriarca", 90, "stand", { dy: 0.5, facing: -1, id: "cabeca-que-recebe-a-sorte" }),
        C("patriarca", 190, "stand", { scale: 0.92, dy: 0.44, facing: -1, id: "cabeca-que-recebe-a-sorte2" }),
      ] }),
      // OS LEVITAS, contados à parte (v57-62)
      b(57, { set: "levitas", props: LEVITAS, env: { terrain: "field", glory: 0.6, night: 0.12, verdure: 0.28 }, cast: [ // Gérson, Coate e Merari
        C("servo", -140, "stand", { glow: 0.2, dy: 0.5, facing: -1, id: "gersom-levita" }),
        C("servo", -60, "stand", { scale: 0.96, dy: 0.48, facing: -1, id: "coate-levita" }),
        C("servo", 20, "stand", { scale: 0.92, dy: 0.46, facing: -1, id: "merari-levita" }),
      ] }),
      b(58, { env: { glory: 0.62 }, cast: [                                            // as famílias de Levi; e Coate gerou a Anrão
        C("servo", -150, "stand", { glow: 0.2, dy: 0.5, facing: -1, id: "coate-levita" }),
        C("homem", 40, "stand", { dy: 0.5, facing: -1, id: "anrao-filho-de-coate" }),
        C("multidao", 210, "stand", { scale: 0.9, dy: 0.42, id: "povo-de-levi" }),
      ] }),
      b(59, { q: "Arão, e Moisés, e Miriã, irmã deles", env: { glory: 0.7 }, cast: [   // Anrão e Joquebede: Arão, Moisés e Miriã
        C("mulherComum", -160, "stand", { dy: 0.52, facing: -1, id: "joquebede" }),
        C("arao", -50, "stand", { glow: 0.2, dy: 0.5, facing: -1 }),
        C("moises", 40, "stand", { dy: 0.5, facing: -1 }),
        C("mulherComum", 130, "stand", { scale: 0.95, dy: 0.46, facing: -1, id: "miria-irma-deles" }),
      ] }),
      b(60, { env: { glory: 0.66 }, cast: [                                            // a Arão nasceram Nadabe, Abiú, Eleazar e Itamar
        C("arao", -220, "stand", { glow: 0.2, dy: 0.5, facing: 1 }),
        C("servo", -80, "stand", { dy: 0.5, facing: -1, id: "nadabe-filho-de-arao" }),
        C("servo", 0, "stand", { scale: 0.96, dy: 0.48, facing: -1, id: "abiu-filho-de-arao" }),
        C("servo", 80, "stand", { scale: 0.94, dy: 0.46, facing: -1, glow: 0.15, id: "eleazar" }),
        C("servo", 160, "stand", { scale: 0.92, dy: 0.44, facing: -1, id: "itamar-filho-de-arao" }),
      ] }),
      b(61, { q: "trouxeram fogo estranho perante o Senhor", props: [...LEVITAS, P("campfire", 210, 1.2, 1, 0.56)], env: { glory: 0.12, night: 0.5, storm: 0.25, fire: 0.85, verdure: 0.16 }, cast: [ // Nadabe e Abiú, do fogo estranho (Lv 10:1-2)
        C("servo", -70, "lie", { dy: 0.6, facing: -1, id: "nadabe-filho-de-arao" }),
        C("servo", 30, "lie", { scale: 0.96, dy: 0.56, facing: -1, id: "abiu-filho-de-arao" }),
      ] }),
      b(62, { props: LEVITAS, env: { terrain: "field", glory: 0.66, night: 0.1, storm: 0, fire: 0.2, verdure: 0.28 }, cast: [ // 23.000 levitas — sem herança entre os filhos de Israel
        C("servo", -140, "stand", { glow: 0.25, dy: 0.5, facing: -1, id: "levita-sem-heranca" }),
        C("servo", -60, "bow", { scale: 0.96, dy: 0.48, facing: -1, id: "levita-sem-heranca2" }),
        C("multidao", 200, "stand", { scale: 0.9, dy: 0.42, id: "povo-de-levi" }),
      ] }),
      b(63, { q: "nas campinas de Moabe, junto ao Jordão", set: "campinas", props: CAMPINAS, env: { terrain: "field", glory: 0.6, night: 0.12, fire: 0, verdure: 0.3 }, cast: recenseadores() }),   // contados por Moisés e Eleazar nas campinas de Moabe
      b(64, { q: "nenhum houve dos que foram contados por Moisés e Arão" }),           // da geração do Sinai, nenhum restou
      b(65, { q: "nenhum deles ficou senão Calebe", env: { glory: 0.62, night: 0.1 }, cast: [ // salvo CALEBE e JOSUÉ
        C("servo", -40, "stand", { dy: 0.5, facing: 1, glow: 0.25, id: "caleb" }),
        C("servo", 40, "stand", { dy: 0.5, facing: -1, glow: 0.25, id: "josue" }),
      ] }),
    ],
  },
};
