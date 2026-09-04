// ============================================================================
// NÚMEROS 27–28 — CENA VIVA. A herança das filhas de Zelofeade; a comissão de
// Josué; as ofertas contínuas.
//
// Nm 27 — AS FILHAS DE ZELOFEADE: cinco irmãs (Maalá, Noa, Hogla, Milca, Tirza)
// se chegam diante de Moisés, de Eleazar e de toda a congregação, à porta da
// tenda, pedindo HERANÇA — o pai morreu sem filhos. Moisés leva a causa ao
// Senhor, que dá sentença: a herança passa às filhas. Depois Deus manda Moisés
// SUBIR o monte de Abarim para ver a terra (não entrará, por causa de Meribá) e
// COMISSIONAR JOSUÉ: Moisés IMPÕE AS MÃOS sobre ele diante de Eleazar e da
// congregação, pondo sobre ele da sua glória.
//
// Nm 28 — AS OFERTAS CONTÍNUAS: o holocausto de cada dia (manhã e tarde), o do
// sábado, o das luas novas (princípio dos meses) e o da páscoa/primícias — tudo
// junto ao altar, sob a mão de Arão, com os cordeiros do rebanho.
//
// A VOZ DE DEUS (regra do projeto): a sentença e as leis vêm do alto
// (`by: "deus"`), sem figura; as filhas, Moisés, Josué e Arão em cena como
// mediadores visíveis. Quando as filhas ou Moisés falam, o `by` é o personagem.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });
const dv = (v: number) => b(v, { by: "deus" });

// A porta da tenda, com a congregação ao redor (Nm 27:1-11).
const ARRAIAL: StagePropSpec[] = [
  { ...P("tent", 0, 1.5, undefined, 0.1), tag: "tabernaculo" },
  P("tent", -270, 1.0, undefined, 0.2),
  P("tent", 240, 1.0, undefined, 0.22),
  P("palm", -320, 1.05, undefined, 0.14),
  P("well", 330, 1.0, undefined, 0.5),
  P("grass", -60, 0.82, undefined, 0.82),
  P("grass", 70, 0.78, undefined, 0.74),
];
// O monte de Abarim: Moisés sobe para ver a terra e comissionar Josué (27:12-23).
const MONTE: StagePropSpec[] = [
  P("rock", -220, 1.3, undefined, 0.2),
  P("rock", 230, 1.15, undefined, 0.26),
  P("grass", -40, 0.8, undefined, 0.82),
  P("grass", 90, 0.76, undefined, 0.7),
  P("palm", 300, 1.0, undefined, 0.16),
];
// As cinco filhas de Zelofeade, chegando-se juntas.
const filhas = (pose: string): CastPlacement[] => [
  C("mulherComum", 40, pose, { dy: 0.54, facing: -1, id: "mahla" }),
  C("mulherComum", 100, pose, { dy: 0.5, facing: -1, id: "noa" }),
  C("mulherComum", 150, pose, { scale: 0.95, dy: 0.46, facing: -1, id: "hogla" }),
  C("mulherComum", 200, pose, { scale: 0.92, dy: 0.44, facing: -1, id: "milca-zelofeade" }),
  C("mulherComum", 250, pose, { scale: 0.9, dy: 0.42, facing: -1, id: "tirza" }),
];
// O altar do holocausto contínuo, com Arão servindo e os cordeiros (Nm 28).
const ALTAR: StagePropSpec[] = [
  { ...P("altar", 0, 1.4, 0.7, 0.32), tag: "altar-holocausto" },
  { ...P("tent", -240, 1.3, undefined, 0.12), tag: "tabernaculo" },
  P("palm", 300, 1.05, undefined, 0.14),
  P("grass", -70, 0.82, undefined, 0.82),
  P("grass", 80, 0.78, undefined, 0.74),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Nm 27
  27: {
    start: { terrain: "field", night: 0.1, glory: 0.62, storm: 0, fire: 0, verdure: 0.24 },
    beats: [
      b(1, { q: "E chegaram as filhas de Zelofeade", props: ARRAIAL, env: { terrain: "field", glory: 0.62, night: 0.1, verdure: 0.24 }, cast: filhas("walk") }), // as cinco filhas de Zelofeade se chegam
      b(2, { q: "à porta da tenda da congregação", cast: [                          // apresentam-se diante de Moisés, Eleazar e a congregação
        C("moises", -170, "stand", { dy: 0.5, facing: 1 }),
        C("servo", -110, "stand", { glow: 0.2, dy: 0.5, facing: 1, id: "eleazar" }),
        C("multidao", -260, "stand", { dy: 0.44 }),
        ...filhas("stand"),
      ] }),
      b(3, { by: "mulherComum", q: "e não teve filhos", cast: filhas("stand") }),        // "nosso pai morreu... e não teve filhos"
      b(4, { by: "mulherComum", q: "Dá-nos possessão entre os irmãos de nosso pai", cast: [ // "dá-nos possessão entre os irmãos de nosso pai"
        C("moises", -170, "stand", { dy: 0.5, facing: 1 }),
        C("servo", -110, "stand", { glow: 0.2, dy: 0.5, facing: 1, id: "eleazar" }),
        ...filhas("raise"),
      ] }),
      b(5, { q: "E Moisés levou a causa delas perante o Senhor", env: { glory: 0.66 }, cast: [ // Moisés leva a causa perante o Senhor
        C("moises", -60, "kneel", { dy: 0.5, facing: 1 }),
      ] }),
      b(6, {}),                                                                        // e falou o Senhor a Moisés
      b(7, { by: "deus", q: "a herança de seu pai farás passar a elas", env: { glory: 0.82 }, cast: [ // sentença: a herança passa às filhas
        C("moises", -170, "stand", { dy: 0.5, facing: 1 }),
        ...filhas("stand"),
      ] }),
      dv(8), dv(9), dv(10), dv(11),                                                 // o estatuto de direito da herança
      b(12, { by: "deus", q: "Sobe a este monte de Abarim", props: MONTE, env: { terrain: "mountain", glory: 0.7, night: 0.1, verdure: 0.16 }, cast: [ // "sobe ao monte e vê a terra"
        C("moises", -60, "stand", { dy: 0.5, facing: 1 }),
      ] }),
      b(13, { by: "deus", q: "assim como foi recolhido teu irmão Arão" }),          // serás recolhido ao teu povo, como Arão
      b(14, { by: "deus", q: "estas são as águas de Meribá de Cades" }),            // por causa da contenda das águas de Meribá
      b(15, { by: "moises", q: "Então falou Moisés ao Senhor", cast: [              // Moisés fala ao Senhor
        C("moises", -60, "kneel", { dy: 0.5, facing: 1 }),
      ] }),
      b(16, { by: "moises", q: "ponha um homem sobre esta congregação" }),          // "ponha um homem sobre esta congregação"
      b(17, { by: "moises", q: "como ovelhas que não têm pastor", cast: [           // "não seja como ovelhas que não têm pastor"
        C("moises", -120, "point", { dy: 0.5, facing: 1 }),
        C("rebanho", 120, "stand", { dy: 0.5 }),
      ] }),
      b(18, { by: "deus", q: "impõe a tua mão sobre ele", cast: [                    // "toma a Josué... e impõe a tua mão sobre ele"
        C("moises", -120, "stand", { dy: 0.5, facing: 1 }),
        C("servo", 20, "stand", { glow: 0.2, dy: 0.5, facing: -1, id: "josue" }),
      ] }),
      b(19, { by: "deus", q: "perante Eleazar, o sacerdote", cast: [                 // apresenta-o perante Eleazar e a congregação
        C("moises", -150, "stand", { dy: 0.5, facing: 1 }),
        C("servo", -60, "stand", { glow: 0.2, dy: 0.5, facing: -1, id: "eleazar" }),
        C("servo", 40, "stand", { dy: 0.5, facing: -1, id: "josue" }),
        C("multidao", 170, "stand", { dy: 0.44 }),
      ] }),
      b(20, { by: "deus", q: "põe sobre ele da tua glória", env: { glory: 0.85 } }), // "põe sobre ele da tua glória"
      dv(21),                                                                       // consultará segundo o juízo de Urim
      b(22, { q: "porque tomou a Josué", env: { terrain: "field", glory: 0.9 }, cast: [              // Moisés faz como o Senhor ordenara
        C("moises", -140, "stand", { dy: 0.5, facing: 1 }),
        C("servo", -40, "stand", { dy: 0.5, facing: -1, id: "josue" }),
        C("servo", -90, "stand", { glow: 0.2, dy: 0.5, facing: -1, id: "eleazar" }),
        C("multidao", 180, "stand", { dy: 0.44 }),
      ] }),
      b(23, { q: "E sobre ele impôs as suas mãos", env: { terrain: "field", glory: 0.92 }, cast: [     // ÍCONE: a imposição das mãos sobre Josué
        C("moises", -70, "raise", { dy: 0.5, facing: 1 }),
        C("servo", 20, "kneel", { glow: 0.4, dy: 0.52, facing: -1, id: "josue" }),
        C("servo", -140, "stand", { glow: 0.2, dy: 0.5, facing: 1, id: "eleazar" }),
        C("multidao", 190, "bow", { dy: 0.44 }),
      ] }),
    ],
  },

  // ------------------------------------------------------------------ Nm 28
  28: {
    start: { terrain: "desert", night: 0.1, glory: 0.62, storm: 0, fire: 0.4, verdure: 0.2 },
    beats: [
      b(1, { props: ALTAR, env: { terrain: "desert", glory: 0.64, night: 0.1, fire: 0.4, verdure: 0.2 }, cast: [ // o Senhor fala a Moisés
        C("moises", -170, "kneel", { dy: 0.5, facing: 1 }),
        C("arao", -40, "stand", { glow: 0.3, dy: 0.5, facing: -1 }),
      ] }),
      b(2, { by: "deus", q: "para me oferecê-las ao seu tempo determinado" }),       // as ofertas oferecidas ao seu tempo
      b(3, { by: "deus", q: "em contínuo holocausto", cast: [                        // dois cordeiros por dia, em contínuo holocausto
        C("arao", -40, "raise", { glow: 0.35, dy: 0.5, facing: -1 }),
        C("rebanho", 130, "stand", { dy: 0.52 }),
      ] }),
      b(4, { by: "deus", q: "sacrificarás pela manhã", cast: [                        // um cordeiro pela manhã, outro à tarde
        C("arao", -40, "stand", { glow: 0.3, dy: 0.5, facing: -1 }),
        C("rebanho", 130, "stand", { dy: 0.52 }),
      ] }),
      dv(5),                                                                         // a oferta de flor de farinha com azeite
      b(6, { by: "deus", q: "o holocausto contínuo, instituído no monte Sinai" }),   // o holocausto contínuo instituído no Sinai
      dv(7),                                                                         // a libação de bebida forte no santuário
      b(8, { by: "deus", q: "sacrificarás à tarde" }),                               // o outro cordeiro à tarde
      b(9, { by: "deus", q: "no dia de sábado", cast: [                              // no sábado, dois cordeiros e dobro de oferta
        C("arao", -40, "stand", { glow: 0.3, dy: 0.5, facing: -1 }),
        C("rebanho", 130, "stand", { dy: 0.52 }),
      ] }),
      b(10, { by: "deus", q: "Holocausto é de cada sábado" }),                        // holocausto de cada sábado, além do contínuo
      b(11, { by: "deus", q: "nos princípios dos vossos meses", cast: [              // nas luas novas: novilhos, carneiro, cordeiros
        C("arao", -40, "raise", { glow: 0.35, dy: 0.5, facing: -1 }),
        C("rebanho", 130, "stand", { dy: 0.52 }),
        C("rebanho", 210, "stand", { scale: 0.9, dy: 0.46, id: "rebanho2" }),
      ] }),
      dv(12), dv(13),                                                                // as ofertas de alimentos das luas novas
      b(14, { by: "deus", q: "o holocausto da lua nova de cada mês" }),              // o holocausto da lua nova de cada mês
      dv(15),                                                                        // um bode para expiação do pecado
      b(16, { by: "deus", q: "é a páscoa do Senhor", env: { glory: 0.7 }, cast: [    // aos catorze do mês primeiro: a páscoa
        C("arao", -40, "stand", { glow: 0.35, dy: 0.5, facing: -1 }),
        C("rebanho", 130, "stand", { dy: 0.52 }),
      ] }),
      b(17, { by: "deus", q: "sete dias se comerão pães ázimos" }),                  // festa dos ázimos, sete dias
      dv(18), dv(19), dv(20), dv(21), dv(22), dv(23), dv(24), dv(25),                // as ofertas dos sete dias da festa
      b(26, { by: "deus", q: "no dia das primícias", props: [                        // no dia das primícias, oferta nova de alimentos
        { ...P("altar", 0, 1.4, 0.7, 0.32), tag: "altar-holocausto" },
        { ...P("tent", -240, 1.3, undefined, 0.12), tag: "tabernaculo" },
        P("sheaf", 210, 1.0, undefined, 0.5),
        P("palm", 300, 1.05, undefined, 0.14),
        P("grass", -70, 0.82, undefined, 0.82),
      ], env: { terrain: "desert", glory: 0.72, night: 0.1, fire: 0.4, verdure: 0.24 }, cast: [
        C("arao", -40, "raise", { glow: 0.35, dy: 0.5, facing: -1 }),
        C("rebanho", 130, "stand", { dy: 0.52 }),
      ] }),
      dv(27), dv(28), dv(29), dv(30), dv(31),                                        // as ofertas das primícias com suas libações
    ],
  },
};
