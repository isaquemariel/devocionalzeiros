// ============================================================================
// APOCALIPSE 8–9 — roteiro do modo CENA VIVA v2.
//
// Ap 8 — O SÉTIMO SELO: silêncio no céu (dramaturgia do vazio), o anjo do
// incensário no altar de ouro, e as quatro primeiras trombetas ferindo a
// terra, o mar, os rios e os astros (o palco muda do trono para o campo).
// Ap 9 — O ABISMO E O EUFRATES: a 5ª trombeta abre o poço do abismo (os
// gafanhotos-escorpião são ATMOSFERA — fumaça, fogo e tormento, sem role
// inventado), e a 6ª solta os quatro anjos do Eufrates com o exército de
// duzentos milhões. Cada beat = 1 versículo; o texto ARC vem em runtime.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });

// ---------------------------------------------------------------- Ap 8: sets
// Sala do trono celestial: o trono ao fundo, o ALTAR DE OURO diante dele
// (Ap 8:3), castiçais nas laterais e estrelas altas. Corredor -100..-190 livre.
const THRONE_HALL: StagePropSpec[] = [
  P("throneOfGod", 0, 1.35, undefined, 0.05),
  P("altar", 90, 1.05, 0.4, 0.3),
  P("lampstand", -230, 0.95, 1, 0.25),
  P("lampstand", 230, 0.95, 1, 0.25),
  P("star", -60, 0.5, undefined, 0.04),
  P("star", 60, 0.55, undefined, 0.07),
  P("star", 150, 0.45, undefined, 0.03),
];

// as sete trombetas entregues aos sete anjos (uma vaga por trombeta, na frente)
const SEVEN_TRUMPETS: StagePropSpec[] = [-120, -80, -40, 0, 40, 80, 120].map((dx) =>
  P("trumpet", dx, 0.75, undefined, 0.62));

// fileira dos sete anjos "que estavam diante de Deus" (ids p/ tween estável)
const SEVEN_ANGELS = (pose: string, dy: number): CastPlacement[] =>
  [-120, -80, -40, 0, 40, 80, 120].map((dx, i) =>
    C("anjo", dx, pose, { dy, glow: 0.35, id: `tr${i + 1}` }));

// A TERRA FERIDA pelas trombetas: campo com árvores queimando (terça parte),
// erva verde consumida, fogo no chão. Corredor -100..-190 livre p/ extras.
const TERRA_FERIDA: StagePropSpec[] = [
  P("tree", -280, 1.1, 0.5, 0.1),
  P("tree", 230, 1.0, 0.4, 0.14),
  P("bush", -215, 0.9, 0.3, 0.5),
  P("rock", -320, 0.8, undefined, 0.55),
  P("rock", 300, 0.9, undefined, 0.6),
  P("campfire", 80, 0.9, 1, 0.55),
  P("grass", -50, 1, undefined, 0.82),
  P("grass", 140, 1, undefined, 0.75),
  P("grass", 290, 0.9, undefined, 0.68),
];

// o anjo trombeteiro voando no alto + a trombeta que soa (extra do versículo)
const TRUMPETER = (id?: string): CastPlacement =>
  C("anjo", -40, "flyIdle", { dy: 0.12, glow: 0.5, ...(id ? { id } : {}) });
const TRUMPET_HIGH = P("trumpet", -80, 0.7, undefined, 0.08);

// ---------------------------------------------------------------- Ap 9: sets
// O CAMPO DO ABISMO: terra crestada, árvores em brasa e o POÇO (well) que se
// abre no meio da cena; a estrela caída entra no corredor de extras.
const ABYSS_FIELD = (pitFire: number): StagePropSpec[] => [
  P("rock", -300, 0.95, undefined, 0.5),
  P("tree", -250, 1.05, 0.35, 0.12),
  P("bush", -220, 0.9, 0.25, 0.55),
  P("tree", 240, 1.0, 0.3, 0.15),
  P("rock", 300, 0.85, undefined, 0.6),
  P("well", 40, 1.15, pitFire, 0.38),
  P("rock", 90, 0.6, undefined, 0.3),
  P("grass", -60, 1, undefined, 0.8),
  P("grass", 150, 1, undefined, 0.75),
];

// O GRANDE RIO EUFRATES: o rio atravessa o palco; o altar de ouro (de onde a
// voz fala, Ap 9:13) ocupa o corredor de extras; palmeiras da Mesopotâmia.
const EUPHRATES: StagePropSpec[] = [
  P("river", 0, 1.2, undefined, 0.2),
  P("altar", -150, 1.0, 0.5, 0.15),
  P("palm", -260, 1.0, undefined, 0.15),
  P("palm", 250, 0.95, undefined, 0.12),
  P("rock", -310, 0.85, undefined, 0.5),
  P("rock", 310, 0.8, undefined, 0.55),
  P("bush", 215, 0.9, undefined, 0.45),
  P("grass", -70, 1, undefined, 0.8),
  P("grass", 170, 1, undefined, 0.78),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Ap 8
  // Arco: SILÊNCIO estático → glória do incenso subindo → o incensário cai
  // (tempestade) → as trombetas incendeiam o mundo → noite de "ai, ai, ai".
  8: {
    start: { terrain: "throne", night: 0.12, glory: 0.3, storm: 0, fire: 0 },
    beats: [
      // v.1 — o sétimo selo: SILÊNCIO no céu. João sozinho, nada se move,
      // nenhum env muda — a dramaturgia é o vazio de meia hora.
      b(1, { cast: [C("joao", -30, "stand", { dy: 0.55 })], props: THRONE_HALL }),   // silêncio no céu, meia hora
      b(2, { env: { glory: 0.4 }, cast: [C("joao", -180, "stand", { dy: 0.6 }), ...SEVEN_ANGELS("stand", 0.48)], props: [...THRONE_HALL, ...SEVEN_TRUMPETS] }), // sete anjos recebem sete trombetas
      b(3, { env: { glory: 0.5 }, cast: [C("joao", -180, "stand", { dy: 0.6 }), ...SEVEN_ANGELS("stand", 0.36), C("anjo", 130, "stand", { dy: 0.52, glow: 0.7, facing: -1, id: "incenso" })], props: [...THRONE_HALL, P("censer", 55, 0.85, 0.5, 0.5)] }), // outro anjo, incensário junto ao altar
      b(4, { env: { glory: 0.62 }, cast: [C("joao", -180, "stand", { dy: 0.6 }), ...SEVEN_ANGELS("stand", 0.36), C("anjo", 130, "raise", { dy: 0.52, glow: 0.85, facing: -1, id: "incenso" })] }), // a fumaça do incenso sobe
      b(5, { env: { glory: 0.35, storm: 0.5, fire: 0.2 }, cast: [C("joao", -180, "stand", { dy: 0.6 }), ...SEVEN_ANGELS("stand", 0.36), C("anjo", 130, "point", { dy: 0.52, glow: 0.85, facing: -1, id: "incenso" })], props: [...THRONE_HALL, P("censer", -150, 0.85, 1, 0.55)] }), // incensário lançado à terra: trovões
      b(6, { env: { storm: 0.3 }, cast: [C("joao", -180, "stand", { dy: 0.6 }), ...SEVEN_ANGELS("raise", 0.5)], props: [...THRONE_HALL, ...SEVEN_TRUMPETS] }), // os sete preparam-se para tocar
      // as quatro primeiras trombetas: o palco desce do trono para a TERRA.
      b(7, { set: "terra", env: { terrain: "field", night: 0.2, glory: 0.1, storm: 0.35, fire: 0.4 }, cast: [C("joao", -170, "stand", { dy: 0.6 }), TRUMPETER()], props: [...TERRA_FERIDA, TRUMPET_HIGH] }), // 1ª trombeta: saraiva, fogo, sangue
      b(8, { env: { fire: 0.5 }, props: [...TERRA_FERIDA, TRUMPET_HIGH, P("river", 0, 1.25, undefined, 0.12), P("rock", -150, 1.3, 1, 0.22), P("boat", 70, 0.85, undefined, 0.16)] }), // 2ª: monte ardendo cai no mar
      b(9, { env: { fire: 0.55, night: 0.3 }, props: [...TERRA_FERIDA, TRUMPET_HIGH, P("river", 0, 1.25, undefined, 0.12), P("boat", 70, 0.85, 0.9, 0.16)] }), // morrem criaturas; perdem-se as naus
      b(10, { env: { fire: 0.6, storm: 0.3 }, props: [...TERRA_FERIDA, TRUMPET_HIGH, P("river", 0, 1.25, undefined, 0.12), P("star", -150, 0.9, 1, 0.2)] }), // 3ª: estrela-tocha cai nos rios
      b(11, { env: { night: 0.45, fire: 0.5 } }),                                    // Absinto: águas amargas matam homens
      b(12, { env: { night: 0.6, glory: 0, fire: 0.45 }, props: [...TERRA_FERIDA, TRUMPET_HIGH, P("river", 0, 1.25, undefined, 0.12), P("star", -34, 0.5, undefined, 0.04), P("star", 100, 0.45, undefined, 0.06), P("star", 178, 0.4, undefined, 0.03)] }), // 4ª: sol, lua, estrelas feridos
      b(13, { by: "anjo", q: "dizendo com grande voz: ", env: { night: 0.6, storm: 0.4 }, cast: [C("joao", -170, "raise", { dy: 0.6 }), C("anjo", 0, "flyIdle", { dy: 0.08, glow: 0.6 })] }), // anjo voa no céu: três ais
    ],
  },

  // ------------------------------------------------------------------ Ap 9
  // Arco: 5ª trombeta abre o abismo (fumaça sobe, trevas máximas, tormento) →
  // leve alívio no 1º ai → 6ª trombeta no Eufrates → exército de duzentos
  // milhões (fogo no auge) → a humanidade impenitente, noite grave.
  9: {
    start: { terrain: "field", night: 0.55, glory: 0, storm: 0.2, fire: 0.3 },
    beats: [
      b(1, { env: { night: 0.6, fire: 0.5 }, cast: [C("joao", -170, "stand", { dy: 0.6 }), TRUMPETER()], props: [...ABYSS_FIELD(0.3), TRUMPET_HIGH, P("star", -150, 0.8, 0.9, 0.25)] }), // 5ª trombeta: estrela cai; chave do poço
      b(2, { env: { night: 0.8, fire: 0.7, storm: 0.4 }, cast: [C("joao", -170, "stand", { dy: 0.6 })], props: [...ABYSS_FIELD(1), P("star", -150, 0.8, 0.9, 0.25)] }), // o poço abre: fumaça de fornalha
      b(3, { env: { storm: 0.6 } }),                                                 // da fumaça saem os gafanhotos
      b(4),                                                                          // poupam a erva; ferem os sem selo
      b(5, { env: { storm: 0.7, fire: 0.72 } }),                                     // cinco meses de tormento de escorpião
      b(6, { env: { night: 0.85 }, cast: [C("joao", -180, "stand", { dy: 0.6 }), C("homem", -10, "kneel", { dy: 0.55 }), C("mulherComum", 50, "bow", { dy: 0.5 })] }), // homens buscam a morte; ela foge
      b(7, { env: { fire: 0.75 } }),                                                 // como cavalos de guerra, coroas
      b(8),                                                                          // cabelos de mulher, dentes de leão
      b(9, { env: { storm: 0.75 } }),                                                // couraças de ferro; asas como carros
      b(10, { env: { fire: 0.8 } }),                                                 // caudas de escorpião com aguilhões
      b(11, { env: { night: 0.9, fire: 0.85 } }),                                    // seu rei: Abadom, o Apoliom
      b(12, { env: { night: 0.7, storm: 0.35, fire: 0.5, glory: 0.08 }, cast: [C("joao", -60, "stand", { dy: 0.55 })] }), // passou um ai; vêm ainda dois
      // 6ª trombeta: o palco muda para o GRANDE RIO EUFRATES.
      b(13, { set: "eufrates", env: { glory: 0.15, fire: 0.45, night: 0.65, storm: 0.3 }, cast: [C("joao", -190, "stand", { dy: 0.6 }), C("anjo", 60, "stand", { dy: 0.5, glow: 0.5 })], props: [...EUPHRATES, P("trumpet", 95, 0.7, undefined, 0.4)] }), // 6ª trombeta; voz do altar de ouro
      // a voz sai das quatro pontas do altar: o anjo sai de cena para o
      // balão virar VOZ OFF (a ordem não é fala do sexto anjo).
      b(14, { by: "anjo", q: "que tinha a trombeta: ", env: { storm: 0.45 }, cast: [C("joao", -60, "kneel", { dy: 0.55 })] }), // (voz) solta os quatro anjos
      b(15, { env: { storm: 0.6, night: 0.75 }, cast: [C("joao", -190, "stand", { dy: 0.6 }), C("anjo", -70, "stand", { dy: 0.48, glow: 0.4, id: "q1" }), C("anjo", -25, "stand", { dy: 0.5, glow: 0.4, id: "q2" }), C("anjo", 20, "stand", { dy: 0.5, glow: 0.4, id: "q3" }), C("anjo", 65, "stand", { dy: 0.48, glow: 0.4, id: "q4" })] }), // soltos os quatro anjos do Eufrates
      b(16, { env: { fire: 0.8 }, cast: [C("joao", -190, "stand", { dy: 0.6 }), C("cavaleiro", -20, "stand", { dy: 0.45, palette: "vermelho", id: "cav1" }), C("cavaleiro", 50, "stand", { dy: 0.52, palette: "amarelo", id: "cav2" }), C("multidao", 150, "stand", { dy: 0.22 })] }), // exército de duzentos milhões
      b(17, { env: { fire: 0.85, storm: 0.65 } }),                                   // couraças de fogo; bocas de leão
      b(18, { env: { night: 0.8 } }),                                                // fogo, fumaça e enxofre matam
      b(19, { env: { fire: 0.8 } }),                                                 // poder na boca e nas caudas
      b(20, { env: { night: 0.85, fire: 0.55, glory: 0 }, cast: [C("joao", -160, "stand", { dy: 0.6 }), C("homem", 0, "stand", { dy: 0.55 }), C("mulherComum", 55, "stand", { dy: 0.5 }), C("multidao", 170, "stand", { dy: 0.22 })] }), // os restantes não se arrependem
      b(21, { env: { night: 0.9, storm: 0.5 } }),                                    // homicídios, feitiçarias, fornicação, furtos
    ],
  },
};
