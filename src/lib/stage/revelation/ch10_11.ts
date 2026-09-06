// ============================================================================
// APOCALIPSE 10–11 — roteiro do modo CENA VIVA v2.
//
// Ap 10: O ANJO FORTE E O LIVRINHO — João de volta à beira-mar de Patmos; um
// anjo colossal desce com o arco celeste, pés sobre o mar e a terra, os sete
// trovões rugem, o juramento ao céu — e João COME o livrinho (doce e amargo).
// Ap 11: AS DUAS TESTEMUNHAS — medir o templo, os dois profetas de fogo, a
// besta do abismo, a ressurreição, o terremoto — e a 7ª trombeta abre o céu
// até a ARCA DA ALIANÇA aparecer entre relâmpagos.
//
// Cada beat = 1 versículo (texto ARC em runtime). `by` = balão; `q` = recorte
// exato do versículo; `cast`/`props` SUBSTITUEM os anteriores.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });

// ---------------------------------------------------------------------------
// SETS FIXOS (corredor de extras dx -100..-190 sempre livre)
// ---------------------------------------------------------------------------

// Beira-mar de Patmos (Ap 10): praia aberta — o anjo pisa o mar (frente) e a
// terra; a vaga dos extras recebe a trombeta do sétimo anjo (v.7).
const SHORE: StagePropSpec[] = [
  P("palm", -270, 1.15, undefined, 0.12),
  P("palm", -228, 0.95, undefined, 0.55),
  P("palm", 236, 1.1, undefined, 0.1),
  P("palm", 300, 0.95, undefined, 0.4),
  P("rock", -320, 0.8, undefined, 0.5),
  P("rock", 150, 0.7, undefined, 0.8),
  P("rock", 320, 1.0, undefined, 0.65),
  P("bush", 270, 0.9, undefined, 0.55),
  P("bush", -60, 0.85, undefined, 0.3),
  P("grass", -288, 1, undefined, 0.72),
  P("grass", -30, 0.9, undefined, 0.7),
  P("grass", 66, 1.1, undefined, 0.7),
  P("grass", 204, 1, undefined, 0.85),
];

// o livrinho aberto na mão do anjo (junto dele, na beira da água)
const LITTLE_SCROLL = P("scroll", 118, 0.9, undefined, 0.7);
// a trombeta do sétimo anjo, anunciada no juramento (vaga dos extras)
const SEVENTH_TRUMPET = P("trumpet", -140, 0.9, undefined, 0.2);

// O templo de Deus e a cidade santa (Ap 11): altar ao centro, torre-templo à
// direita, vida de cidade do 1º século nas bordas.
const TEMPLE: StagePropSpec[] = [
  P("altar", 0, 1.1, undefined, 0.14),        // o altar que João deve medir
  P("tower", 170, 1.45, undefined, 0.06),     // o templo de Deus
  P("tower", -240, 1.1, undefined, 0.1),
  P("tree", -60, 0.85, undefined, 0.06),
  P("bush", 212, 1, undefined, 0.3),
  P("well", 320, 1, undefined, 0.12),
  P("stall", -300, 1, undefined, 0.2),
  P("amphora", 195, 1, undefined, 0.55),
  P("crate", -262, 1, undefined, 0.5),
  P("grass", -44, 1, undefined, 0.85),
  P("grass", 160, 1, undefined, 0.85),
  P("grass", 298, 0.9, undefined, 0.6),
];

// "as duas oliveiras e os dois castiçais" (Ap 11:4) — vaga dos extras
const OLIVES_AND_LAMPS: StagePropSpec[] = [
  P("lampstand", -105, 0.95, 1, 0.12),
  P("tree", -135, 0.9, undefined, 0.34),
  P("lampstand", -165, 0.95, 1, 0.12),
  P("tree", -195, 0.9, undefined, 0.34),
];

// O céu aberto na 7ª trombeta (Ap 11:15+): o trono, a trombeta que soou.
const HEAVEN: StagePropSpec[] = [
  P("throneOfGod", 0, 1.25, undefined, 0.08),
  P("trumpet", -130, 0.9, undefined, 0.2),
  P("star", 230, 0.6, undefined, 0.06),
  P("star", -270, 0.6, undefined, 0.1),
];

// v.19: o templo celestial se abre — a ARCA da aliança na vaga dos extras
const HEAVEN_ARK: StagePropSpec[] = [
  P("throneOfGod", 0, 1.25, undefined, 0.08),
  P("ark", -140, 1.1, undefined, 0.18),
  P("star", 230, 0.6, undefined, 0.06),
  P("star", -270, 0.6, undefined, 0.1),
];

// marcas do anjo forte (colossal, pé direito sobre o mar = frente da praia)
const STRONG_ANGEL = (pose: string): CastPlacement =>
  C("anjo", 60, pose, { glow: 1, scale: 1.5, dy: 0.85 });

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Ap 10
  10: {
    start: { terrain: "patmos", night: 0.3, glory: 0.2 },
    beats: [
      b(1, { env: { glory: 0.6 }, cast: [C("joao", -60, "stand", { dy: 0.55 }), C("anjo", 70, "flyIdle", { glow: 1, scale: 1.5, dy: 0.4 })], props: SHORE }), // anjo forte desce com arco celeste
      b(2, { cast: [C("joao", -60, "stand", { dy: 0.55 }), STRONG_ANGEL("stand")], props: [...SHORE, LITTLE_SCROLL] }),                                        // livrinho aberto; pés sobre mar e terra
      b(3, { env: { storm: 0.55 } }),                                                                                                                          // rugido de leão; sete trovões
      b(4, { by: "cristo", q: "que me dizia: ", env: { storm: 0.35 }, cast: [C("joao", -60, "write", { dy: 0.55 }), STRONG_ANGEL("stand")] }),                 // voz do céu: sela, não escrevas
      b(5, { env: { storm: 0.15 }, cast: [C("joao", -60, "stand", { dy: 0.55 }), STRONG_ANGEL("raise")] }),                                                    // anjo levanta a mão ao céu
      b(6, { env: { storm: 0, glory: 0.7 } }),                                                                                                                 // jura pelo Criador: não haverá demora
      b(7, { env: { glory: 0.78 }, props: [...SHORE, LITTLE_SCROLL, SEVENTH_TRUMPET] }),                                                                       // na sétima trombeta, o segredo cumprido
      b(8, { by: "cristo", q: "e disse: ", cast: [C("joao", 4, "walk", { dy: 0.68 }), STRONG_ANGEL("stand")] }),                                               // a voz manda: vai, toma o livrinho
      b(9, { by: "anjo", q: "E ele disse-me: ", cast: [C("joao", 92, "kneel", { dy: 0.72 }), STRONG_ANGEL("point")] }),                                        // toma-o e come-o: doce e amargo
      b(10, { env: { night: 0.25, glory: 0.5 }, cast: [C("joao", 92, "stand", { dy: 0.72 }), STRONG_ANGEL("stand")], props: [...SHORE, SEVENTH_TRUMPET] }),    // João come: mel na boca, ventre amargo
      b(11, { by: "anjo", q: "disse-me: ", env: { night: 0.1, glory: 0.8 }, cast: [C("joao", 20, "raise", { dy: 0.55 }), STRONG_ANGEL("point")] }),            // importa que profetizes outra vez
    ],
  },

  // ------------------------------------------------------------------ Ap 11
  11: {
    start: { terrain: "city", night: 0.15, glory: 0.3 },
    beats: [
      b(1, { by: "anjo", q: "e disse: ", cast: [C("joao", -46, "stand", { dy: 0.55 }), C("anjo", 30, "point", { glow: 0.5, dy: 0.5 })], props: TEMPLE }),      // a cana: mede o templo e o altar
      b(2, { env: { night: 0.25 }, cast: [C("joao", -10, "point", { dy: 0.45 }), C("anjo", 46, "stand", { glow: 0.5, dy: 0.5 })] }),                           // deixa o átrio: nações pisarão a cidade
      b(3, { by: "anjo", env: { fire: 0.3 }, cast: [C("joao", -70, "stand", { dy: 0.55 }), C("anjo", 90, "stand", { glow: 0.4, dy: 0.5 }), C("homem", -18, "stand", { glow: 0.6, dy: 0.45, id: "testemunha1" }), C("homem", 26, "stand", { glow: 0.6, dy: 0.45, id: "testemunha2" })] }), // as duas testemunhas, vestidas de saco
      b(4, { props: [...TEMPLE, ...OLIVES_AND_LAMPS] }),                                                                                                       // as duas oliveiras e os dois castiçais
      b(5, { env: { fire: 0.45 }, cast: [C("joao", -70, "stand", { dy: 0.55 }), C("anjo", 90, "stand", { glow: 0.4, dy: 0.5 }), C("homem", -18, "point", { glow: 0.6, dy: 0.45, id: "testemunha1" }), C("homem", 26, "point", { glow: 0.6, dy: 0.45, id: "testemunha2" })] }),           // fogo sai da boca deles
      b(6, { env: { fire: 0.3, storm: 0.25 }, cast: [C("joao", -70, "stand", { dy: 0.55 }), C("anjo", 90, "stand", { glow: 0.4, dy: 0.5 }), C("homem", -18, "raise", { glow: 0.6, dy: 0.45, id: "testemunha1" }), C("homem", 26, "raise", { glow: 0.6, dy: 0.45, id: "testemunha2" })] }), // poder de fechar o céu e ferir
      b(7, { env: { night: 0.5, fire: 0.5, storm: 0.15 }, cast: [C("joao", -80, "stand", { dy: 0.55 }), C("homem", -18, "stand", { glow: 0.4, dy: 0.45, id: "testemunha1" }), C("homem", 26, "stand", { glow: 0.4, dy: 0.45, id: "testemunha2" }), C("besta", 170, "walk", { dy: 0.5, scale: 1.2, facing: -1 })] }), // a besta do abismo faz guerra
      b(8, { env: { night: 0.7, fire: 0.2 }, cast: [C("joao", -80, "stand", { dy: 0.55 }), C("homem", -30, "lie", { dy: 0.55, id: "testemunha1" }), C("homem", 20, "lie", { dy: 0.55, id: "testemunha2" }), C("besta", 96, "stand", { dy: 0.45, scale: 1.2, facing: -1 })] }),           // corpos na praça da grande cidade
      b(9, { cast: [C("joao", -80, "stand", { dy: 0.55 }), C("homem", -30, "lie", { dy: 0.55, id: "testemunha1" }), C("homem", 20, "lie", { dy: 0.55, id: "testemunha2" }), C("besta", 96, "stand", { dy: 0.45, scale: 1.2, facing: -1 }), C("mulherComum", -220, "stand", { dy: 0.4 }), C("homem", 220, "stand", { dy: 0.35, id: "povo" })] }), // povos veem os corpos, três dias e meio
      b(10, { cast: [C("joao", -80, "stand", { dy: 0.55 }), C("homem", -30, "lie", { dy: 0.55, id: "testemunha1" }), C("homem", 20, "lie", { dy: 0.55, id: "testemunha2" }), C("besta", 96, "stand", { dy: 0.45, scale: 1.2, facing: -1 }), C("mulherComum", -200, "raise", { dy: 0.4 }), C("homem", 200, "raise", { dy: 0.35, id: "povo" })] }), // a terra festeja e manda presentes
      b(11, { env: { night: 0.2, fire: 0, storm: 0, glory: 0.9 }, cast: [C("joao", -80, "stand", { dy: 0.55 }), C("homem", -30, "raise", { glow: 0.9, dy: 0.5, id: "testemunha1" }), C("homem", 20, "raise", { glow: 0.9, dy: 0.5, id: "testemunha2" }), C("mulherComum", -220, "kneel", { dy: 0.4 }), C("homem", 220, "kneel", { dy: 0.35, id: "povo" })] }), // o espírito de vida entra neles
      b(12, { by: "cristo", q: "que lhes dizia: ", env: { glory: 1 }, cast: [C("joao", -80, "raise", { dy: 0.55 }), C("homem", -30, "raise", { glow: 1, dy: 0.06, id: "testemunha1" }), C("homem", 20, "raise", { glow: 1, dy: 0.06, id: "testemunha2" }), C("mulherComum", -220, "kneel", { dy: 0.4 }), C("homem", 220, "kneel", { dy: 0.35, id: "povo" })] }), // "Subi para aqui": sobem numa nuvem
      b(13, { env: { storm: 0.7, glory: 0.4 }, cast: [C("joao", -40, "stand", { dy: 0.55 }), C("mulherComum", -220, "kneel", { dy: 0.4 }), C("homem", 200, "lie", { dy: 0.35, id: "povo" })] }),                                                                                          // terremoto: cai a décima parte
      b(14, { env: { storm: 0.45 } }),                                                                                                                         // passou o segundo ai; vem o terceiro
      b(15, { by: "multidao", q: "que diziam: ", set: "ceuTrombeta", env: { terrain: "throne", night: 0, storm: 0, fire: 0, glory: 1 }, cast: [C("joao", -80, "stand", { dy: 0.55 }), C("anjo", 70, "raise", { glow: 0.8, dy: 0.42 }), C("multidao", 180, "stand", { dy: 0.2 })], props: HEAVEN }), // 7ª trombeta: os reinos do Senhor
      b(16, { cast: [C("joao", -80, "stand", { dy: 0.55 }), C("anjo", 70, "raise", { glow: 0.8, dy: 0.42 }), C("multidao", 180, "stand", { dy: 0.2 }), C("anciao", -30, "bow", { dy: 0.5, id: "anciao1" }), C("anciao", 28, "bow", { dy: 0.5, id: "anciao2" })] }),                       // os vinte e quatro anciãos prostram-se
      b(17, { by: "anciao", q: "Dizendo: " }),                                                                                                                 // graças te damos, Todo-Poderoso
      b(18, { by: "anciao", env: { storm: 0.15 } }),                                                                                                           // ira das nações; galardão dos servos
      b(19, { env: { storm: 0.5, glory: 1 }, cast: [C("joao", -60, "raise", { dy: 0.55 }), C("anjo", 70, "raise", { glow: 0.9, dy: 0.42 }), C("multidao", 180, "stand", { dy: 0.2 }), C("anciao", -30, "bow", { dy: 0.5, id: "anciao1" }), C("anciao", 28, "bow", { dy: 0.5, id: "anciao2" })], props: HEAVEN_ARK }), // templo aberto: a arca entre relâmpagos
    ],
  },
};
