// ============================================================================
// GÊNESIS — cena viva, caps. 3–4 (A QUEDA e CAIM E ABEL).
//
// Cap. 3: a serpente ERETA fala no jardim; a queda; os olhos abertos; a voz
// do Senhor na viração; as maldições em cadeia (serpente → mulher → homem);
// as túnicas de peles; a EXPULSÃO — querubins e a espada inflamada guardando
// o caminho, a porta do Éden ficando para trás.
// Cap. 4: os nascimentos, as duas ofertas (uma aceita, outra não), o pecado
// à porta, o assassinato no campo, a marca de Caim, a terra de Node, a
// cidade e a linhagem de Caim (a canção sombria de Lameque) — e SETE/Enos:
// "então se começou a invocar o nome do Senhor".
//
// DEUS NUNCA É DESENHADO: a voz de Deus é narração pura (sem `by`); a sua
// presença é GLÓRIA no ambiente (uma glória FRIA quando julga). Arco de env:
// cap. 3 — luz do Éden → trevas da queda → brasa da espada no leste;
// cap. 4 — manhã de ofertas → tempestade do sangue → entardecer da cidade
// de Caim → aurora de esperança com Sete.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });

// ---------------------------------------------------------------- Gn 3: sets
// O mesmo Éden do cap. 2 (continuidade visual): jardim exuberante e o rio.
// Corredor -100..-190 LIVRE na decoração — é a vaga das duas árvores.
const JARDIM: StagePropSpec[] = [
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

// As duas árvores do meio do jardim (mesmas marcas do cap. 2): a árvore da
// VIDA luminosa e a do CONHECIMENTO, mais funda e sombria — o palco do drama.
const JARDIM_ARVORES: StagePropSpec[] = [
  ...JARDIM,
  P("tree", -120, 1.35, 0.4, 0.12),          // árvore da vida — brilha
  P("tree", -165, 1.05, undefined, 0.32),    // árvore do conhecimento — sombria
];

// v.7: um arbusto a mais na frente — o esconderijo do casal envergonhado.
const JARDIM_ESCONDERIJO: StagePropSpec[] = [
  ...JARDIM_ARVORES,
  P("bush", 60, 1.05, undefined, 0.48),      // onde eles se escondem
];

// O LESTE do Éden: campo aberto e seco; ao fundo, a PORTA do jardim que
// ficou para trás — brilhando com o fogo da espada que a guarda.
const LESTE: StagePropSpec[] = [
  P("door", -140, 1.3, 0.5, 0.1),            // a porta do Éden, incandescente
  P("rock", -280, 0.9, undefined, 0.4),
  P("rock", 220, 0.85, undefined, 0.6),
  P("tree", 300, 0.9, undefined, 0.2),
  P("bush", -240, 0.85, undefined, 0.6),
  P("grass", -40, 1, undefined, 0.8),
  P("grass", 160, 0.95, undefined, 0.75),
  P("grass", 260, 0.9, undefined, 0.58),
];

// ---------------------------------------------------------------- Gn 4: sets
// O campo da família de Adão: a tenda, árvores e capim — vida fora do Éden.
const CAMPO: StagePropSpec[] = [
  P("tent", -260, 1.15, undefined, 0.15),    // a tenda da família
  P("tree", -320, 0.95, undefined, 0.4),
  P("tree", 280, 1.1, undefined, 0.1),
  P("rock", 180, 0.8, undefined, 0.7),
  P("bush", 220, 0.9, undefined, 0.4),
  P("grass", -220, 1, undefined, 0.75),
  P("grass", -60, 1, undefined, 0.8),
  P("grass", 120, 1, undefined, 0.85),
  P("grass", 320, 0.95, undefined, 0.6),
];

// As DUAS ofertas, separadas: o altar de Caim (fruto da terra, com o feixe
// de trigo ao lado) e a fogueira de Abel (os primogênitos do rebanho).
const OFERTAS: StagePropSpec[] = [
  ...CAMPO,
  P("altar", -60, 1.05, undefined, 0.3),     // o altar de Caim — frio
  P("sheaf", -95, 0.9, undefined, 0.45),     // o feixe do fruto da terra
  P("campfire", 100, 0.95, 0.7, 0.3),        // a oferta de Abel — arde aceita
];

// v.7: "o pecado jaz à porta" — uma porta escura entra no corredor de extras.
const OFERTAS_PORTA: StagePropSpec[] = [
  ...OFERTAS,
  P("door", -145, 1.1, undefined, 0.12),     // a porta onde o pecado jaz
];

// O campo aberto e ermo do assassinato — sem tenda, sem altar, sem abrigo.
const CAMPO_ABERTO: StagePropSpec[] = [
  P("tree", -280, 1.1, undefined, 0.1),
  P("rock", 240, 0.9, undefined, 0.5),
  P("rock", -230, 0.8, undefined, 0.65),
  P("bush", 300, 0.85, undefined, 0.35),
  P("grass", -60, 1, undefined, 0.8),
  P("grass", 140, 1, undefined, 0.85),
  P("grass", -320, 0.95, undefined, 0.7),
];

// A terra de NODE, do lado oriental do Éden: deserto de pedras.
const NODE: StagePropSpec[] = [
  P("rock", -260, 1.0, undefined, 0.3),
  P("rock", 180, 0.85, undefined, 0.6),
  P("rock", 320, 0.9, undefined, 0.25),
  P("bush", -230, 0.8, undefined, 0.55),
  P("grass", -40, 0.9, undefined, 0.8),
];

// A CIDADE de Enoque, edificada por Caim — torres, poço, comércio.
const CIDADE: StagePropSpec[] = [
  P("tower", 170, 1.25, undefined, 0.08),
  P("tower", -280, 1.0, undefined, 0.14),
  P("well", 310, 1, undefined, 0.14),
  P("stall", -230, 1, undefined, 0.25),
  P("amphora", 190, 1, undefined, 0.55),
  P("crate", -256, 1, undefined, 0.5),
  P("crate", -240, 0.8, undefined, 0.64),
  P("tree", 250, 0.85, undefined, 0.35),
  P("grass", -40, 1, undefined, 0.85),
  P("grass", 130, 1, undefined, 0.8),
];

// v.20: Jabal, pai dos que habitam em TENDAS e têm gado.
const CIDADE_TENDAS: StagePropSpec[] = [
  ...CIDADE,
  P("tent", -140, 1.1, undefined, 0.15),     // as tendas de Jabal
];

// v.22: Tubalcaim, mestre do cobre e do ferro — a FORJA acesa.
const CIDADE_FORJA: StagePropSpec[] = [
  ...CIDADE_TENDAS,
  P("campfire", 40, 0.9, 0.85, 0.28),        // a forja de Tubalcaim
];

// v.26: volta ao campo; o altar da invocação do nome do Senhor.
const CAMPO_INVOCACAO: StagePropSpec[] = [
  ...CAMPO,
  P("altar", -140, 1.05, 0.5, 0.2),          // então se começou a invocar
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Gn 3
  // A QUEDA: a luz do Éden escurece verso a verso; a voz do Senhor é glória
  // fria; as maldições descem em cadeia; o capítulo termina no leste, à luz
  // de brasa da espada inflamada, com a porta do jardim para trás.
  3: {
    start: { terrain: "garden", night: 0.1, glory: 0.45 },
    beats: [
      b(1, { by: "serpente", q: "disse à mulher: ", props: JARDIM_ARVORES, cast: [   // a serpente ereta aborda a mulher
        C("serpente", -95, "stand", { dy: 0.42 }),
        C("eva", -20, "stand", { dy: 0.5, facing: -1 }),
      ] }),
      b(2, { by: "eva", q: "disse a mulher à serpente: " }),                         // "do fruto das árvores comeremos"
      b(3, { by: "eva", cast: [                                                      // "mas do fruto do meio do jardim…"
        C("serpente", -95, "stand", { dy: 0.42 }),
        C("eva", -20, "point", { dy: 0.5, facing: -1 }),
      ] }),
      b(4, { by: "serpente", q: "disse à mulher: ", env: { night: 0.2 } }),          // "certamente não morrereis" — a mentira
      b(5, { by: "serpente", env: { night: 0.25, glory: 0.3 } }),                    // "sereis como Deus" — a sedução
      b(6, { env: { night: 0.28, glory: 0.22 }, cast: [                              // ela toma, come e dá a Adão
        C("serpente", -215, "stand", { dy: 0.4 }),
        C("eva", -105, "raise", { dy: 0.45 }),
        C("adao", -40, "stand", { dy: 0.5, facing: -1 }),
      ] }),
      b(7, { env: { night: 0.3, glory: 0.15 }, props: JARDIM_ESCONDERIJO, cast: [    // olhos abertos; vergonha; escondem-se
        C("adao", 45, "kneel", { dy: 0.4, facing: -1 }),
        C("eva", 80, "kneel", { dy: 0.42, facing: -1 }),
      ] }),
      b(8, { env: { night: 0.35, glory: 0.45 } }),                                   // a VOZ do Senhor na viração do dia
      b(9, { env: { glory: 0.5 } }),                                                 // (voz de Deus) "Onde estás?"
      b(10, { by: "adao", q: "E ele disse: ", cast: [                                // "ouvi a tua voz… e escondi-me"
        C("adao", -20, "bow", { dy: 0.5 }),
        C("eva", 60, "bow", { dy: 0.52 }),
      ] }),
      b(11, { env: { storm: 0.1 } }),                                                // (voz) "quem te mostrou que estavas nu?"
      b(12, { by: "adao", q: "disse Adão: ", cast: [                                 // Adão acusa a mulher
        C("adao", -20, "point", { dy: 0.5, facing: 1 }),
        C("eva", 60, "bow", { dy: 0.52 }),
      ] }),
      b(13, { by: "eva", q: "E disse a mulher: ", cast: [                            // a mulher acusa a serpente
        C("serpente", -110, "stand", { dy: 0.45 }),
        C("adao", -20, "bow", { dy: 0.5 }),
        C("eva", 60, "point", { dy: 0.52, facing: -1 }),
      ] }),
      b(14, { env: { night: 0.4, storm: 0.25, glory: 0.5 }, cast: [                  // MALDIÇÃO da serpente — rastejará
        C("serpente", -110, "lie", { dy: 0.45 }),
        C("adao", -20, "bow", { dy: 0.5 }),
        C("eva", 60, "bow", { dy: 0.52 }),
      ] }),
      b(15, { env: { glory: 0.55 } }),                                               // inimizade; a semente ferirá a cabeça
      b(16, { env: { night: 0.45, glory: 0.4 }, cast: [                              // à mulher: dor e conceição
        C("serpente", -110, "lie", { dy: 0.45 }),
        C("adao", -20, "bow", { dy: 0.5 }),
        C("eva", 60, "kneel", { dy: 0.52 }),
      ] }),
      b(17, { env: { night: 0.5, storm: 0.3 }, cast: [                               // a Adão: maldita é a terra
        C("serpente", -110, "lie", { dy: 0.45 }),
        C("adao", -20, "kneel", { dy: 0.5 }),
        C("eva", 60, "kneel", { dy: 0.52 }),
      ] }),
      b(18, { env: { storm: 0.35 } }),                                               // espinhos e cardos te produzirá
      b(19, { env: { night: 0.55, storm: 0.3 } }),                                   // no suor do rosto; pó és
      b(20, { env: { night: 0.4, storm: 0.1, glory: 0.35 }, cast: [                  // Adão nomeia EVA — mãe dos viventes
        C("adao", -25, "stand", { dy: 0.5, facing: 1 }),
        C("eva", 35, "stand", { dy: 0.5, facing: -1 }),
      ] }),
      b(21, { env: { night: 0.3, glory: 0.5 }, cast: [                               // túnicas de peles — misericórdia
        C("adao", -25, "stand", { dy: 0.5, glow: 0.2 }),
        C("eva", 35, "stand", { dy: 0.5, glow: 0.2 }),
      ] }),
      b(22, { env: { night: 0.35, glory: 0.6 } }),                                   // (voz) "eis que o homem é como um de nós"
      b(23, { set: "leste", env: { terrain: "field", night: 0.3, glory: 0.15, storm: 0, fire: 0.15 }, props: LESTE, cast: [
        C("adao", 60, "walk", { dy: 0.5, facing: 1 }),
        C("eva", 110, "walk", { dy: 0.52, facing: 1 }),
      ] }),                                                                          // EXPULSÃO — lançado fora do jardim
      b(24, { env: { night: 0.4, fire: 0.4 }, cast: [                                // querubins e a espada inflamada
        C("anjo", -180, "flyIdle", { glow: 0.8, dy: 0.3, id: "querubim2" }),
        C("anjo", -105, "flyIdle", { glow: 1, dy: 0.35 }),
        C("adao", 170, "walk", { dy: 0.52, facing: 1 }),
        C("eva", 220, "walk", { dy: 0.55, facing: 1 }),
      ] }),
    ],
  },

  // ------------------------------------------------------------------ Gn 4
  // CAIM E ABEL: Caim é "homem", Abel é "pastor" (com rebanho). O sangue
  // escurece o campo em tempestade; a cidade de Caim entardece até a canção
  // sombria de Lameque; Sete e Enos reacendem a esperança — glória 0.5.
  4: {
    start: { terrain: "field", night: 0.15, glory: 0.35 },
    beats: [
      b(1, { by: "eva", q: "e disse: ", props: CAMPO, cast: [                        // nasce Caim — "alcancei do SENHOR"
        C("adao", -40, "stand", { dy: 0.5 }),
        C("eva", 20, "stand", { dy: 0.5, glow: 0.3 }),
      ] }),
      b(2, { cast: [                                                                 // Abel pastor; Caim lavrador
        C("homem", -60, "stand", { dy: 0.5 }),
        C("pastor", 60, "stand", { dy: 0.5 }),
        C("rebanho", 150, "stand", { dy: 0.45 }),
      ] }),
      b(3, { set: "ofertas", props: OFERTAS, env: { glory: 0.3 }, cast: [            // ao cabo de dias, a oferta de Caim
        C("homem", -75, "raise", { dy: 0.5 }),
        C("pastor", 85, "stand", { dy: 0.5 }),
        C("rebanho", 170, "stand", { dy: 0.45 }),
      ] }),
      b(4, { env: { glory: 0.6 }, cast: [                                            // o Senhor atenta para Abel — aceita
        C("homem", -75, "stand", { dy: 0.5 }),
        C("pastor", 85, "kneel", { dy: 0.5, glow: 0.4 }),
        C("rebanho", 170, "stand", { dy: 0.45 }),
      ] }),
      b(5, { env: { glory: 0.2, night: 0.25 }, cast: [                               // para Caim não; descai-lhe o semblante
        C("homem", -70, "bow", { dy: 0.5, facing: -1 }),
        C("pastor", 85, "stand", { dy: 0.5 }),
        C("rebanho", 170, "stand", { dy: 0.45 }),
      ] }),
      b(6, { env: { glory: 0.35 } }),                                                // (voz de Deus) "por que te iraste?"
      b(7, { env: { storm: 0.15 }, props: OFERTAS_PORTA }),                          // "o pecado jaz à porta" — solene
      b(8, { set: "campoAberto", props: CAMPO_ABERTO, env: { storm: 0.5, night: 0.5, glory: 0 }, cast: [
        C("homem", -20, "stand", { dy: 0.5, facing: 1 }),
        C("pastor", 50, "lie", { dy: 0.52 }),
      ] }),                                                                          // o ASSASSINATO no campo
      b(9, { by: "homem", q: "disse: " }),                                           // "sou eu guardador do meu irmão?"
      b(10, { env: { storm: 0.45, night: 0.55 } }),                                  // (voz) o sangue clama desde a terra
      b(11, { env: { night: 0.6 } }),                                                // maldito és tu desde a terra
      b(12, { env: { storm: 0.35 } }),                                               // fugitivo e vagabundo serás
      b(13, { by: "homem", q: "disse Caim ao Senhor: ", cast: [                      // "é maior a minha maldade…"
        C("homem", -20, "kneel", { dy: 0.5 }),
        C("pastor", 50, "lie", { dy: 0.52 }),
      ] }),
      b(14, { by: "homem" }),                                                        // "todo aquele que me achar me matará"
      b(15, { env: { glory: 0.3, storm: 0.15 }, cast: [                              // o SINAL posto em Caim — a marca
        C("homem", -20, "stand", { dy: 0.5, glow: 0.3 }),
        C("pastor", 50, "lie", { dy: 0.52 }),
      ] }),
      b(16, { set: "node", props: NODE, env: { terrain: "desert", night: 0.35, glory: 0.1, storm: 0 }, cast: [
        C("homem", 120, "walk", { dy: 0.5, facing: 1, glow: 0.25 }),
      ] }),                                                                          // Caim sai e habita em Node
      b(17, { set: "cidade", props: CIDADE, env: { terrain: "city", night: 0.3, glory: 0.2 }, cast: [
        C("homem", -40, "point", { dy: 0.5, facing: 1 }),
        C("mulherComum", 30, "stand", { dy: 0.52 }),
      ] }),                                                                          // nasce Enoque; Caim edifica a CIDADE
      b(18, { env: { night: 0.35 }, cast: [                                          // gerações: Irade… até Lameque
        C("patriarca", -60, "stand", { dy: 0.5 }),
        C("homem", 40, "stand", { dy: 0.5 }),
        C("mulherComum", 110, "stand", { dy: 0.55 }),
      ] }),
      b(19, { env: { night: 0.4 }, cast: [                                           // Lameque toma duas mulheres
        C("mulherComum", -55, "stand", { dy: 0.52, id: "ada" }),
        C("homem", 0, "stand", { dy: 0.5 }),
        C("mulherComum", 55, "stand", { dy: 0.52, id: "zila" }),
      ] }),
      b(20, { props: CIDADE_TENDAS, cast: [                                          // Jabal — tendas e gado
        C("mulherComum", -55, "stand", { dy: 0.52, id: "ada" }),
        C("homem", 0, "stand", { dy: 0.5 }),
        C("mulherComum", 55, "stand", { dy: 0.52, id: "zila" }),
        C("rebanho", 180, "stand", { dy: 0.45 }),
      ] }),
      b(21, { env: { glory: 0.28 } }),                                               // Jubal — harpa e órgão
      b(22, { props: CIDADE_FORJA, env: { fire: 0.2 } }),                            // Tubalcaim — cobre e ferro na forja
      b(23, { by: "homem", q: "disse Lameque a suas mulheres Ada e Zilá: ", env: { night: 0.55, storm: 0.2, glory: 0.1 }, cast: [
        C("mulherComum", -55, "bow", { dy: 0.52, id: "ada" }),
        C("homem", 0, "raise", { dy: 0.5 }),
        C("mulherComum", 55, "bow", { dy: 0.52, id: "zila" }),
        C("rebanho", 180, "stand", { dy: 0.45 }),
      ] }),                                                                          // a canção sombria: "matei um homem"
      b(24, { by: "homem", env: { night: 0.6 } }),                                   // "setenta vezes sete" — soberba
      b(25, { by: "eva", q: "disse ela, ", set: "sete", props: CAMPO, env: { terrain: "field", night: 0.15, glory: 0.35, storm: 0, fire: 0 }, cast: [
        C("adao", -50, "stand", { dy: 0.5 }),
        C("eva", 10, "stand", { dy: 0.5, glow: 0.3 }),
      ] }),                                                                          // nasce SETE, em lugar de Abel
      b(26, { props: CAMPO_INVOCACAO, env: { glory: 0.5, night: 0.05 }, cast: [      // Enos — invoca-se o nome do Senhor
        C("adao", -50, "raise", { dy: 0.5 }),
        C("eva", 10, "raise", { dy: 0.5 }),
        C("homem", 90, "raise", { dy: 0.52, id: "sete" }),
      ] }),
    ],
  },
};
