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
      b(10, { by: "deus", props: POSPRAGA, env: { terrain: "field", glory: 0.35, night: 0.35, storm: 0, verdure: 0.3 }, cast: [ // o Senhor fala a Moisés
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
      b(4, { q: "Conta o povo da idade de vinte anos para cima" }),                    // conta o povo, como o Senhor ordenara
      b(5, { q: "o primogênito de Israel" }),                                          // Rúben, o primogênito
      b(6),
      b(7),
      b(8),
      b(9, { q: "contenderam contra Moisés e contra Arão no grupo de Coré" }),         // Datã e Abirão, do grupo de Coré
      b(10, { q: "a terra abriu a sua boca" }),                                        // a terra os tragou; o fogo consumiu os 250
      b(11),
      b(12),
      b(13),
      b(14),
      b(15),
      b(16),
      b(17),
      b(18),
      b(19),
      b(20),
      b(21),
      b(22),
      b(23),
      b(24),
      b(25),
      b(26),
      b(27),
      b(28),
      b(29),
      b(30),
      b(31),
      b(32),
      b(33, { q: "os nomes das filhas de Zelofeade", cast: [                           // as filhas de Zelofeade, que não teve filhos
        C("mulherComum", 20, "stand", { dy: 0.5, facing: -1, id: "filhas-zelofeade" }),
        C("mulherComum", 80, "stand", { dy: 0.48, facing: -1, scale: 0.95, id: "filhas-zelofeade2" }),
      ] }),
      b(34),
      b(35),
      b(36),
      b(37),
      b(38),
      b(39),
      b(40),
      b(41),
      b(42),
      b(43),
      b(44),
      b(45),
      b(46),
      b(47),
      b(48),
      b(49),
      b(50),
      b(51, { q: "seiscentos e um mil e setecentos e trinta", cast: recenseadores() }), // o total: 601.730
      dv(52),                                                                          // o Senhor fala a Moisés
      b(53, { by: "deus", q: "repartirá a terra em herança" }),                        // "a estes se repartirá a terra em herança"
      dv(54),                                                                          // aos muitos mais, aos poucos menos
      b(55, { by: "deus", q: "a terra se repartirá por sortes" }),                     // "todavia a terra se repartirá por SORTES"
      dv(56),                                                                          // segundo sair a sorte
      b(57),
      b(58),
      b(59, { q: "Arão, e Moisés, e Miriã, irmã deles" }),                             // Anrão e Joquebede: Arão, Moisés e Miriã
      b(60),
      b(61, { q: "trouxeram fogo estranho perante o Senhor" }),                        // Nadabe e Abiú, do fogo estranho
      b(62),
      b(63, { q: "nas campinas de Moabe, junto ao Jordão", cast: recenseadores() }),   // contados por Moisés e Eleazar nas campinas de Moabe
      b(64, { q: "nenhum houve dos que foram contados por Moisés e Arão" }),           // da geração do Sinai, nenhum restou
      b(65, { q: "nenhum deles ficou senão Calebe", env: { glory: 0.62, night: 0.1 }, cast: [ // salvo CALEBE e JOSUÉ
        C("servo", -40, "stand", { dy: 0.5, facing: 1, glow: 0.25, id: "caleb" }),
        C("servo", 40, "stand", { dy: 0.5, facing: -1, glow: 0.25, id: "josue" }),
      ] }),
    ],
  },
};
