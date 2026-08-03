// ============================================================================
// GÊNESIS — cena viva, caps. 1–2 (A CRIAÇÃO e o ÉDEN).
//
// Cap. 1: o mundo ACENDE dia a dia — do caos escuro ("sem forma e vazia")
// à glória plena do "muito bom". Sem elenco até o v.27: a criação é o
// espetáculo; cada dia acrescenta props/luz. O ritmo "e foi a tarde e a
// manhã" pulsa o ciclo dia/noite no env.
// Cap. 2: o sétimo dia, o homem formado do pó, o jardim plantado, as duas
// árvores, os quatro rios, o sono e Eva.
//
// DEUS NUNCA É DESENHADO: a voz de Deus é narração pura (sem `by`); a sua
// presença é GLÓRIA no ambiente (glory sobe quando Ele fala/abençoa).
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });

// ---------------------------------------------------------------- Gn 1: sets
// Dia 3a — a porção seca aparece: rochas emergem e as águas ajuntadas viram
// um rio cortando o palco (mares). Corredor -100..-190 LIVRE para extras.
const TERRA_MARES: StagePropSpec[] = [
  P("river", 0, 1.2, undefined, 0.15),     // o ajuntamento das águas (Mares)
  P("rock", -260, 1.0, undefined, 0.3),
  P("rock", -60, 0.6, undefined, 0.55),
  P("rock", 210, 0.85, undefined, 0.6),
  P("rock", 310, 1.0, undefined, 0.25),
];

// Dia 3b — a terra produz: árvores frutíferas, arbustos e erva verde.
const VEGETACAO: StagePropSpec[] = [
  ...TERRA_MARES,
  P("tree", -300, 1.2, undefined, 0.08),
  P("tree", -230, 0.95, undefined, 0.45),
  P("tree", 150, 1.15, undefined, 0.1),
  P("tree", 260, 0.9, undefined, 0.45),
  P("bush", -80, 0.9, undefined, 0.3),
  P("bush", 90, 0.85, undefined, 0.65),
  P("grass", -240, 1, undefined, 0.8),
  P("grass", 60, 1.05, undefined, 0.75),
  P("grass", 200, 1, undefined, 0.85),
  P("grass", 320, 0.95, undefined, 0.7),
];

// Dia 4 — os luminares: o maior entra destacado no corredor de extras.
const LUMINAR_MAIOR = P("star", -130, 1.2, undefined, 0.08);
const ASTROS: StagePropSpec[] = [
  ...VEGETACAO,
  LUMINAR_MAIOR,                            // o luminar maior (governa o dia)
  P("star", -170, 0.75, undefined, 0.24),   // o luminar menor (governa a noite)
  P("star", -30, 0.45, undefined, 0.02),    // e fez as estrelas…
  P("star", 100, 0.4, undefined, 0.05),
  P("star", 230, 0.45, undefined, 0.03),
];

// ---------------------------------------------------------------- Gn 2: sets
// A terra do sétimo dia: quieta, regada, ainda sem jardim plantado.
const TERRA_QUIETA: StagePropSpec[] = [
  P("river", 40, 1.1, undefined, 0.18),
  P("rock", -250, 0.9, undefined, 0.35),
  P("rock", 280, 0.85, undefined, 0.5),
  P("bush", -290, 0.85, undefined, 0.6),
  P("grass", -60, 1, undefined, 0.75),
  P("grass", 180, 0.95, undefined, 0.8),
];

// O ÉDEN pleno: jardim exuberante, o rio que sai para regar o jardim.
const EDEN: StagePropSpec[] = [
  P("river", 40, 1.15, undefined, 0.18),
  P("tree", -300, 1.2, undefined, 0.08),
  P("tree", -230, 1.0, undefined, 0.42),
  P("tree", 150, 1.15, undefined, 0.1),
  P("tree", 230, 0.95, undefined, 0.5),
  P("tree", 310, 1.05, undefined, 0.22),
  P("bush", -70, 0.9, undefined, 0.35),
  P("bush", 200, 0.9, undefined, 0.78),
  P("grass", -260, 1, undefined, 0.8),
  P("grass", -20, 1.05, undefined, 0.7),
  P("grass", 120, 1, undefined, 0.85),
  P("grass", 290, 0.95, undefined, 0.62),
];

// As DUAS ÁRVORES no meio do jardim, destacadas no corredor de extras:
// a árvore da VIDA luminosa (fire = brilho suave) e a do CONHECIMENTO,
// mais funda e sombria (sem brilho, meia-luz da profundidade).
const EDEN_ARVORES: StagePropSpec[] = [
  ...EDEN,
  P("tree", -120, 1.35, 0.4, 0.12),         // árvore da vida — brilha
  P("tree", -165, 1.05, undefined, 0.32),   // árvore do conhecimento — sombria
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Gn 1
  // A CRIAÇÃO: do caos escuro à luz plena. Arco de env: night 0.95 → glory 1,
  // com o pulso "tarde e manhã" fechando cada dia.
  1: {
    start: { terrain: "field", night: 0.95, storm: 0.2, glory: 0 },
    beats: [
      b(1, { cast: [] }),                                                          // no princípio — palco vazio, trevas
      b(2, { env: { storm: 0.35, glory: 0.08 } }),                                 // sem forma e vazia; o Espírito se movia
      b(3, { env: { night: 0.3, glory: 0.5, storm: 0.1 } }),                       // HAJA LUZ — a luz irrompe
      b(4, { env: { night: 0.22, glory: 0.45 } }),                                 // separação entre luz e trevas
      b(5, { env: { night: 0.5 } }),                                               // Dia e Noite — tarde e manhã, dia 1
      b(6, { env: { night: 0.18, storm: 0 } }),                                    // haja expansão — o céu limpa
      b(7, { env: { glory: 0.4 } }),                                               // águas de baixo e águas de cima
      b(8, { env: { night: 0.48 } }),                                              // chamou Céus — dia segundo
      b(9, { env: { night: 0.12 }, props: TERRA_MARES }),                          // apareça a porção seca
      b(10, { env: { glory: 0.5 } }),                                              // Terra e Mares — era bom
      b(11, { props: VEGETACAO }),                                                 // produza a terra erva e árvore
      b(12, { env: { glory: 0.55 } }),                                             // a terra produziu — era bom
      b(13, { env: { night: 0.48 } }),                                             // tarde e manhã, dia terceiro
      b(14, { env: { night: 0.25 }, props: [...VEGETACAO, LUMINAR_MAIOR] }),       // haja luminares para sinais e tempos
      b(15, { env: { glory: 0.5 } }),                                              // para iluminar a terra
      b(16, { env: { night: 0.4 }, props: ASTROS }),                               // sol, lua e as estrelas
      b(17, { env: { night: 0.3, glory: 0.55 } }),                                 // postos na expansão dos céus
      b(18, { env: { night: 0.15 } }),                                             // governar dia e noite — era bom
      b(19, { env: { night: 0.48 } }),                                             // tarde e manhã, dia quarto
      b(20, { env: { night: 0.08, glory: 0.5 } }),                                 // fervilhem as águas; voem as aves
      b(21, { env: { glory: 0.6 } }),                                              // grandes baleias e aves — era bom
      b(22, { env: { glory: 0.7 } }),                                              // bênção: frutificai (voz de Deus)
      b(23, { env: { night: 0.48, glory: 0.45 } }),                                // tarde e manhã, dia quinto
      b(24, { env: { night: 0.1 }, cast: [C("rebanho", 90, "stand", { dy: 0.45 })] }), // gado, répteis e feras surgem
      b(25, { env: { glory: 0.6 }, cast: [C("rebanho", 130, "stand", { dy: 0.5 })] }), // fez as feras — era bom
      b(26, { env: { glory: 0.72 } }),                                             // Façamos o homem à nossa imagem
      b(27, { env: { glory: 0.8 }, cast: [                                         // ÁPICE: homem e mulher os criou
        C("rebanho", 160, "stand", { dy: 0.45 }),
        C("adao", -30, "stand", { glow: 0.6, dy: 0.5 }),
        C("eva", 30, "stand", { glow: 0.6, dy: 0.5 }),
      ] }),
      b(28, { env: { glory: 0.85 }, cast: [                                        // bênção: frutificai e dominai
        C("rebanho", 160, "stand", { dy: 0.45 }),
        C("adao", -30, "raise", { dy: 0.5 }),
        C("eva", 30, "raise", { dy: 0.5 }),
      ] }),
      b(29),                                                                       // erva e fruto para mantimento
      b(30, { env: { glory: 0.9 } }),                                              // a todo animal — e assim foi
      b(31, { env: { glory: 1, night: 0.25 } }),                                   // eis que era MUITO BOM — dia sexto
    ],
  },

  // ------------------------------------------------------------------ Gn 2
  // O ÉDEN: o descanso do sétimo dia, o homem do pó, o jardim, as duas
  // árvores, os quatro rios, a ordem, os nomes, o sono — e EVA.
  2: {
    start: { terrain: "garden", night: 0.15, glory: 0.45 },
    beats: [
      b(1, { cast: [], props: TERRA_QUIETA, env: { glory: 0.55 } }),               // céus e terra acabados
      b(2, { env: { glory: 0.62, night: 0.08 } }),                                 // descansou no sétimo dia — paz
      b(3, { env: { glory: 0.7 } }),                                               // abençoou e santificou o dia
      b(4, { env: { glory: 0.45 } }),                                              // estas são as origens — muda o tom
      b(5, { env: { night: 0.25, glory: 0.3 } }),                                  // nenhuma planta; ainda não chovia
      b(6, { env: { storm: 0.3 } }),                                               // um vapor subia e regava — névoa
      b(7, { env: { glory: 0.65, storm: 0.12 }, cast: [                            // o homem do pó — fôlego da vida
        C("adao", 0, "kneel", { glow: 0.9, dy: 0.5 }),
      ] }),
      b(8, { set: "eden", props: EDEN, env: { glory: 0.55, storm: 0, night: 0.05 }, cast: [
        C("adao", -20, "stand", { dy: 0.55 }),
      ] }),                                                                        // o jardim plantado no Éden
      b(9, { props: EDEN_ARVORES }),                                               // a árvore da vida e a do conhecimento
      b(10, { env: { glory: 0.6 } }),                                              // um rio saía e virava quatro braços
      b(11),                                                                       // o primeiro: Pisom, terra de Havilá
      b(12, { env: { glory: 0.65 } }),                                             // o ouro é bom; bdélio e sardônica
      b(13),                                                                       // o segundo rio: Giom, terra de Cuxe
      b(14),                                                                       // Tigre e Eufrates
      b(15, { cast: [C("adao", -50, "stand", { dy: 0.55 })] }),                    // posto no jardim para lavrar e guardar
      b(16, { env: { glory: 0.6 } }),                                              // a ordem: comerás livremente (voz de Deus)
      b(17, { env: { night: 0.15, glory: 0.35 }, cast: [                           // a PROIBIÇÃO — sombra momentânea
        C("adao", -85, "stand", { dy: 0.55, facing: -1 }),
      ] }),
      b(18, { env: { night: 0.05, glory: 0.5 } }),                                 // não é bom que esteja só
      b(19, { cast: [                                                              // os animais trazidos a Adão
        C("adao", -20, "point", { dy: 0.5 }),
        C("rebanho", 80, "stand", { dy: 0.45 }),
        C("serpente", 210, "stand", { dy: 0.3 }),
      ] }),
      b(20, { env: { night: 0.12 }, cast: [                                        // pôs os nomes; falta ajudadora
        C("adao", -20, "stand", { dy: 0.5 }),
        C("rebanho", 120, "stand", { dy: 0.45 }),
        C("serpente", 250, "stand", { dy: 0.3 }),
      ] }),
      b(21, { env: { night: 0.35, glory: 0.4 }, cast: [                            // sono pesado; a costela
        C("adao", 0, "lie", { dy: 0.5 }),
      ] }),
      b(22, { env: { night: 0.05, glory: 0.7 }, cast: [                            // EVA formada e trazida a Adão
        C("adao", -35, "kneel", { dy: 0.5 }),
        C("eva", 40, "stand", { glow: 0.7, dy: 0.5 }),
      ] }),
      b(23, { by: "adao", q: "disse Adão: ", cast: [                               // "osso dos meus ossos"
        C("adao", -25, "stand", { dy: 0.5, facing: 1 }),
        C("eva", 30, "stand", { glow: 0.4, dy: 0.5 }),
      ] }),
      b(24, { env: { glory: 0.8 }, cast: [                                        // deixará pai e mãe — uma só carne
        C("adao", -14, "stand", { dy: 0.5, facing: 1 }),
        C("eva", 14, "stand", { dy: 0.5, facing: -1 }),
      ] }),
      b(25, { env: { glory: 0.8, night: 0 } }),                                    // nus e sem vergonha — inocência
    ],
  },
};
