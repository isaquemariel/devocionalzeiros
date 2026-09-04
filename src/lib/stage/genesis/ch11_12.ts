// ============================================================================
// GÊNESIS — CENA VIVA, caps. 11 e 12.
//
// Gn 11 — BABEL: o vale de Sinar de "uma mesma língua"; os tijolos e o betume
// (caixotes e ânforas), a TORRE crescendo beat a beat (scale 1.0 → 1.3 → 1.6),
// o "desçamos e confundamos" (voz do SENHOR = narração + glory fria — Deus
// NUNCA é desenhado) e a CONFUSÃO (storm, a multidão se dispersando). Depois,
// o MEMORIAL das gerações de Sem até Taré (tendas, patriarcas trocando de
// marca, ciclo dia/noite = passagem do TEMPO) e Ur dos caldeus: a morte de
// Harã, Sarai estéril, e Taré levando Abrão até Harã — a viagem inacabada.
//
// Gn 12 — O CHAMADO: "SAI-TE DA TUA TERRA" (narração solene, glory 0.7 — a
// promessa tripla sobre Abrão e Sarai), a partida com Ló e o rebanho, o
// carvalho de Moré, o ALTAR de Siquém ("à tua descendência darei esta terra",
// glory 0.8), o monte entre Betel e Ai — e a FOME que desce ao EGITO: Sarai
// levada à casa de Faraó (night de tensão), as pragas (storm) e a repreensão
// de Faraó ("Que é isto que me fizeste?") até a saída com tudo o que tinha.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });

// O VALE DE SINAR (Gn 11:1-9): o canteiro de obras de Babel — tijolos
// (caixotes) e betume (ânforas) à esquerda, vida de vale à direita; a TORRE
// entra no v.4 e CRESCE (towerScale) até parar no v.8.
// Corredor de extras dx -100..-190 LIVRE.
const SINAR = (towerScale?: number): StagePropSpec[] => [
  // O ZIGURATE de Babel ao centro-fundo: entra no v.4 e CRESCE até tocar o
  // alto do palco (a soberba que quer "chegar aos céus"). fire acende as
  // tochas da obra quando já está imponente.
  ...(towerScale != null ? [P("ziggurat", 26, towerScale, towerScale >= 1.3 ? 0.5 : undefined, 0.05)] : []),
  P("crate", -246, 1, undefined, 0.5),        // os tijolos empilhados (canteiro)
  P("crate", -226, 0.8, undefined, 0.68),
  P("crate", 250, 0.92, undefined, 0.54),     // tijolos também do outro lado
  P("amphora", -288, 0.9, undefined, 0.58),   // o betume por cal
  P("amphora", 300, 0.82, undefined, 0.64),
  P("tent", -324, 0.95, undefined, 0.3),      // o acampamento dos construtores
  P("bush", 214, 0.9, undefined, 0.6),
  P("grass", -60, 1, undefined, 0.85),
  P("grass", 120, 0.95, undefined, 0.8),
];

// O MEMORIAL DAS GERAÇÕES (Gn 11:10-26): tendas ao fundo, fogueira do clã,
// patriarcas trocando a cada geração — o env faz o ciclo dia/noite (séculos
// passando). Corredor -100..-190 livre.
const MEMORIAL: StagePropSpec[] = [
  P("tent", -260, 1.05, undefined, 0.2),
  P("tent", 240, 0.95, undefined, 0.25),
  P("tent", 320, 0.85, undefined, 0.42),
  P("campfire", -40, 0.85, 1, 0.62),
  P("tree", 130, 0.9, undefined, 0.08),
  P("rock", -312, 0.7, undefined, 0.6),
  P("bush", 282, 0.9, undefined, 0.6),
  P("grass", -70, 1, undefined, 0.85),
  P("grass", 180, 0.95, undefined, 0.78),
];

// UR DOS CALDEUS (Gn 11:27-30): tendas do clã de Terá com o zigurate da
// cidade ao longe — a terra do nascimento, que eles vão deixar.
const UR: StagePropSpec[] = [
  P("ziggurat", 262, 0.9, undefined, 0.06),  // o zigurate de Ur ao longe
  P("tent", -256, 1.05, undefined, 0.24),
  P("tent", -320, 0.9, undefined, 0.42),
  P("crate", -226, 0.85, undefined, 0.6),
  P("well", 320, 0.95, undefined, 0.34),
  P("rock", 180, 0.65, undefined, 0.68),
  P("bush", 214, 0.85, undefined, 0.32),
  P("grass", -56, 0.95, undefined, 0.85),
  P("grass", 130, 0.9, undefined, 0.8),
];

// HARÃ (Gn 11:31-32 e 12:1-3): acampamento no deserto — a tenda armada no
// meio do caminho, a viagem para Canaã INACABADA. O mesmo set abre o cap. 12.
const HARA: StagePropSpec[] = [
  P("tent", -250, 1.1, undefined, 0.22),
  P("tent", 262, 0.95, undefined, 0.3),
  P("well", 322, 1, undefined, 0.12),
  P("campfire", -296, 0.8, 1, 0.5),
  P("rock", 190, 0.7, undefined, 0.68),
  P("bush", 226, 0.85, undefined, 0.5),
  P("grass", -60, 0.9, undefined, 0.85),
  P("grass", 140, 0.85, undefined, 0.8),
];

// O CAMINHO PARA CANAÃ (Gn 12:4-5): deserto aberto — só pedra, arbusto e a
// caravana atravessando.
const CAMINHO: StagePropSpec[] = [
  P("rock", -262, 1.0, undefined, 0.3),
  P("rock", -318, 0.75, undefined, 0.58),
  P("rock", 236, 0.85, undefined, 0.62),
  P("rock", 316, 1.0, undefined, 0.36),
  P("bush", 168, 0.85, undefined, 0.5),
  P("bush", -226, 0.8, undefined, 0.62),
  P("grass", -50, 0.85, undefined, 0.85),
  P("grass", 120, 0.8, undefined, 0.78),
];

// SIQUÉM (Gn 12:6-7): a terra de Canaã — o CARVALHO DE MORÉ dominando o
// palco; o altar do v.7 entra na vaga de extras (-140).
const SIQUEM = (altar = false): StagePropSpec[] => [
  P("tree", 70, 1.5, undefined, 0.06),       // o carvalho de Moré
  P("tree", 292, 1.0, undefined, 0.14),
  P("tree", -310, 0.9, undefined, 0.2),
  P("bush", 200, 0.9, undefined, 0.5),
  P("bush", -252, 0.85, undefined, 0.55),
  P("grass", -66, 1, undefined, 0.85),
  P("grass", 150, 0.95, undefined, 0.78),
  P("grass", 258, 0.9, undefined, 0.68),
  ...(altar ? [P("altar", -140, 1.05, 0.3, 0.22)] : []),
];

// A MONTANHA ENTRE BETEL E AI (Gn 12:8-9): a tenda armada, o segundo altar
// na vaga de extras — rocha de altura por toda parte.
const BETEL: StagePropSpec[] = [
  P("altar", -140, 1.05, 0.3, 0.22),
  P("tent", 220, 1.05, undefined, 0.25),
  P("rock", -270, 1.1, undefined, 0.3),
  P("rock", -320, 0.85, undefined, 0.58),
  P("rock", 300, 1.0, undefined, 0.4),
  P("rock", 100, 0.6, undefined, 0.72),
  P("bush", -232, 0.85, undefined, 0.62),
  P("grass", -54, 0.9, undefined, 0.85),
  P("grass", 152, 0.85, undefined, 0.8),
];

// O EGITO (Gn 12:10-20): cidade de Faraó — o palácio-torre, o Nilo ao fundo,
// palmeiras e mercado. Corredor -100..-190 livre.
const EGITO: StagePropSpec[] = [
  P("river", -20, 1.15, undefined, 0.04),    // o Nilo ao fundo
  P("tower", 226, 1.35, undefined, 0.08),    // o palácio de Faraó
  P("palm", -302, 1.1, undefined, 0.12),
  P("palm", 306, 0.9, undefined, 0.4),
  P("stall", -252, 1, undefined, 0.32),
  P("amphora", -224, 0.85, undefined, 0.6),
  P("crate", -288, 0.9, undefined, 0.55),
  P("well", 120, 0.95, undefined, 0.3),
  P("grass", -50, 0.9, undefined, 0.85),
  P("grass", 170, 0.85, undefined, 0.8),
];

// Uma geração do memorial: o pai (patriarca) e o filho recém-gerado. Ids
// distintos = atores novos a cada troca (as gerações passam, não "andam").
const GER = (pai: string, filho: string): CastPlacement[] => [
  C("patriarca", -40, "stand", { id: pai, dy: 0.48, glow: 0.2 }),
  C("homem", 46, "stand", { id: filho, dy: 0.55 }),
];
// "…e gerou filhos e filhas": a tenda se enche — filhos e filhas juntam-se.
const FILHOS = (pai: string, filho: string): CastPlacement[] => [
  ...GER(pai, filho),
  C("homem", 112, "stand", { id: "filhos", dy: 0.58, scale: 0.9 }),
  C("mulherComum", 158, "stand", { id: "filhas", dy: 0.58, scale: 0.9 }),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ----------------------------------------------------------------- Gn 11
  // Babel e as gerações: a torre sobe (1.0→1.3→1.6), o SENHOR desce (glory
  // fria — voz sem figura), a confusão espalha a multidão (storm 0.4); então
  // o memorial de Sem até Taré (ciclo dia/noite) e a viagem inacabada de Ur
  // até Harã, onde Terá morre (night final).
  11: {
    start: { terrain: "city", night: 0.1, glory: 0.15, storm: 0 },
    beats: [
      // UMA MESMA LÍNGUA (v.1-2) — a humanidade unida chega a Sinar
      b(1, { cast: [C("multidao", 0, "stand", { dy: 0.45 }), C("homem", -70, "stand", { dy: 0.55 }), C("mulherComum", 90, "stand", { dy: 0.55 })], props: SINAR() }), // toda a terra de uma mesma língua
      b(2, { cast: [C("multidao", -30, "walk", { dy: 0.45, facing: -1 }), C("homem", -90, "walk", { dy: 0.55, facing: -1 }), C("mulherComum", 60, "walk", { dy: 0.55, facing: -1 })] }), // partindo do oriente, o vale de Sinar
      // TIJOLOS E BETUME (v.3-4) — a torre entra e começa a subir
      b(3, { by: "homem", q: "disseram uns aos outros: ", cast: [C("homem", -66, "point", { dy: 0.55, facing: 1 }), C("multidao", 10, "stand", { dy: 0.45 }), C("mulherComum", 80, "stand", { dy: 0.55 })] }), // Eia, façamos tijolos e queimemo-los
      b(4, { by: "multidao", q: "disseram: ", props: SINAR(1.28), cast: [C("multidao", 0, "raise", { dy: 0.45 }), C("homem", -66, "raise", { dy: 0.55 }), C("mulherComum", 80, "raise", { dy: 0.55 }), C("homem", 120, "raise", { dy: 0.5, id: "obreiro2", facing: -1 }), C("multidao", -150, "stand", { dy: 0.5, scale: 0.9, id: "povo-b" })] }), // uma torre cujo cume toque nos céus
      // O SENHOR DESCE PARA VER (v.5-7) — narração do céu, glória fria
      b(5, { props: SINAR(1.5), env: { glory: 0.3, night: 0.18 } }),                                   // desceu o Senhor para ver a cidade
      b(6, { by: "deus", q: "E o Senhor disse: ", props: SINAR(1.78), env: { glory: 0.62, night: 0.3 } }),                                   // Deus: eis que o povo é um…
      b(7, { by: "deus", env: { glory: 0.62, night: 0.3, storm: 0.15 } }),                                        // Deus: desçamos e confundamos a língua
      // A CONFUSÃO (v.8-9) — a dispersão sobre a face de toda a terra
      b(8, { cast: [C("multidao", -220, "walk", { dy: 0.48, facing: -1, id: "povo-a" }), C("homem", 200, "walk", { dy: 0.55, facing: 1 }), C("mulherComum", 260, "walk", { dy: 0.5, facing: 1 })], env: { storm: 0.4, night: 0.3, glory: 0.15 } }), // o Senhor os espalhou dali
      b(9, { cast: [C("multidao", -300, "walk", { dy: 0.5, facing: -1, id: "povo-a" }), C("homem", 290, "walk", { dy: 0.58, facing: 1 })], env: { storm: 0.25, night: 0.35, glory: 0.1 } }), // chamou-se Babel: ali confundiu o Senhor
      // O MEMORIAL DAS GERAÇÕES (v.10-26) — de Sem até Taré; o env roda o
      // ciclo dia/noite: séculos passando entre as tendas
      b(10, { set: "memorial", props: MEMORIAL, cast: GER("sem", "arfaxade"), env: { terrain: "field", night: 0.05, glory: 0.3, storm: 0 } }), // gerações de Sem: gerou a Arfaxade
      b(11, { cast: FILHOS("sem", "arfaxade"), env: { night: 0.35 } }),                                // Sem viveu quinhentos anos: filhos e filhas
      b(12, { cast: GER("arfaxade", "sela"), env: { night: 0.6 } }),                                   // Arfaxade gerou a Selá
      b(13, { cast: FILHOS("arfaxade", "sela"), env: { night: 0.3 } }),                                // Arfaxade: quatrocentos e três anos
      b(14, { cast: GER("sela", "eber"), env: { night: 0.05 } }),                                      // Selá gerou a Éber
      b(15, { cast: FILHOS("sela", "eber"), env: { night: 0.4 } }),                                    // Selá: quatrocentos e três anos
      b(16, { cast: GER("eber", "pelegue"), env: { night: 0.65 } }),                                   // Éber gerou a Pelegue
      b(17, { cast: FILHOS("eber", "pelegue"), env: { night: 0.32 } }),                                // Éber: quatrocentos e trinta anos
      b(18, { cast: GER("pelegue", "reu"), env: { night: 0.06 } }),                                    // Pelegue gerou a Reú
      b(19, { cast: FILHOS("pelegue", "reu"), env: { night: 0.42 } }),                                 // Pelegue: duzentos e nove anos
      b(20, { cast: GER("reu", "serugue"), env: { night: 0.66 } }),                                    // Reú gerou a Serugue
      b(21, { cast: FILHOS("reu", "serugue"), env: { night: 0.34 } }),                                 // Reú: duzentos e sete anos
      b(22, { cast: GER("serugue", "naor"), env: { night: 0.06 } }),                                   // Serugue gerou a Naor
      b(23, { cast: FILHOS("serugue", "naor"), env: { night: 0.4 } }),                                 // Serugue: duzentos anos
      b(24, { cast: GER("naor", "tera"), env: { night: 0.64 } }),                                      // Naor gerou a Terá
      b(25, { cast: FILHOS("naor", "tera"), env: { night: 0.3 } }),                                    // Naor: cento e dezenove anos
      b(26, { cast: [C("patriarca", -60, "stand", { id: "tera-pai", dy: 0.48, glow: 0.25 }), C("abraao", 30, "stand", { dy: 0.52 }), C("homem", 86, "stand", { id: "naor-filho", dy: 0.56 }), C("homem", 134, "stand", { id: "hara-filho", dy: 0.58 })], env: { night: 0.05, glory: 0.4 } }), // Terá gerou a Abrão, a Naor e a Harã
      // UR DOS CALDEUS (v.27-30) — a casa de Terá; a morte de Harã
      b(27, { set: "ur", props: UR, cast: [C("patriarca", -60, "stand", { id: "tera-pai", dy: 0.48, glow: 0.25 }), C("abraao", 20, "stand", { dy: 0.52 }), C("homem", 80, "stand", { id: "naor-filho", dy: 0.56 }), C("homem", 132, "stand", { id: "hara-filho", dy: 0.58 })], env: { terrain: "desert", night: 0.15, glory: 0.3 } }), // gerações de Terá; Harã gerou a Ló
      b(28, { cast: [C("patriarca", -60, "bow", { id: "tera-pai", dy: 0.48, glow: 0.25 }), C("abraao", 8, "bow", { dy: 0.52 }), C("homem", 66, "bow", { id: "naor-filho", dy: 0.56 }), C("homem", 130, "lie", { id: "hara-filho", dy: 0.58 })], env: { night: 0.5, glory: 0.12 } }), // e morreu Harã, em Ur dos caldeus
      b(29, { cast: [C("patriarca", -80, "stand", { id: "tera-pai", dy: 0.48, glow: 0.25 }), C("abraao", -6, "stand", { dy: 0.52 }), C("sara", 42, "stand", { dy: 0.54 }), C("homem", 110, "stand", { id: "naor-filho", dy: 0.56 }), C("mulherComum", 156, "stand", { id: "milca", dy: 0.58 })], env: { night: 0.3, glory: 0.25 } }), // Abrão e Naor tomaram mulheres: Sarai e Milca
      b(30, { cast: [C("patriarca", -80, "stand", { id: "tera-pai", dy: 0.48, glow: 0.25 }), C("abraao", -6, "stand", { dy: 0.52, facing: 1 }), C("sara", 48, "stand", { dy: 0.5 })], env: { night: 0.42, glory: 0.15 } }), // e Sarai foi estéril, não tinha filhos
      // ATÉ HARÃ (v.31-32) — a viagem para Canaã que parou no meio
      b(31, { set: "hara", props: HARA, cast: [C("patriarca", -100, "walk", { id: "tera-pai", dy: 0.48, glow: 0.25, facing: 1 }), C("abraao", -34, "walk", { dy: 0.52, facing: 1 }), C("sara", 14, "walk", { dy: 0.54, facing: 1 }), C("homem", 66, "walk", { id: "lo", dy: 0.56, facing: 1 })], env: { terrain: "desert", night: 0.2, glory: 0.3 } }), // saiu de Ur para Canaã; vieram até Harã
      b(32, { cast: [C("patriarca", -60, "lie", { id: "tera-pai", dy: 0.5, glow: 0.15 }), C("abraao", 10, "kneel", { dy: 0.52 }), C("sara", 58, "bow", { dy: 0.54 }), C("homem", 106, "bow", { id: "lo", dy: 0.56 })], env: { night: 0.55, glory: 0.1 } }), // e morreu Terá em Harã
    ],
  },

  // ----------------------------------------------------------------- Gn 12
  // O chamado de Abrão: a promessa tripla em Harã (glory 0.7, voz do SENHOR
  // = narração solene, sem figura), a partida, o altar de Siquém (glory 0.8),
  // Betel e Ai — e a descida ao Egito: a fome, Sarai levada (night 0.4), as
  // pragas sobre Faraó (storm 0.3) e a saída com tudo o que tinha.
  12: {
    start: { terrain: "desert", night: 0.2, glory: 0.3, storm: 0 },
    beats: [
      // SAI-TE DA TUA TERRA (v.1-3) — a voz do SENHOR sobre o acampamento
      b(1, { by: "deus", q: "Ora, o SENHOR disse a Abrão: ", cast: [C("abraao", -10, "kneel", { dy: 0.5, glow: 0.3 }), C("sara", 46, "stand", { dy: 0.54 })], props: HARA, env: { glory: 0.55, night: 0.12 } }), // Deus: Sai-te da tua terra…
      b(2, { env: { glory: 0.65, night: 0.06 } }),                                                     // (voz) far-te-ei uma grande nação
      b(3, { cast: [C("abraao", -10, "raise", { dy: 0.5, glow: 0.35 }), C("sara", 46, "raise", { dy: 0.54 })], env: { glory: 0.72, night: 0 } }), // (voz) em ti serão benditas todas as famílias
      // A PARTIDA (v.4-6) — a caravana atravessa o deserto até Canaã
      b(4, { set: "caminho", props: CAMINHO, cast: [C("abraao", -60, "walk", { dy: 0.5, glow: 0.3, facing: 1 }), C("homem", -110, "walk", { id: "lo", dy: 0.55, facing: 1 }), C("rebanho", -180, "walk", { dy: 0.48, facing: 1 })], env: { glory: 0.5, night: 0.1 } }), // partiu Abrão como o Senhor lhe dissera; Ló com ele
      b(5, { cast: [C("abraao", 0, "walk", { dy: 0.5, glow: 0.3, facing: 1 }), C("sara", -48, "walk", { dy: 0.54, facing: 1 }), C("homem", -100, "walk", { id: "lo", dy: 0.56, facing: 1 }), C("servo", -150, "walk", { dy: 0.5, facing: 1 }), C("rebanho", -220, "walk", { dy: 0.46, facing: 1 })], env: { glory: 0.55 } }), // tomou Sarai, Ló e todos os bens; chegaram a Canaã
      b(6, { set: "siquem", props: SIQUEM(), cast: [C("abraao", -40, "walk", { dy: 0.5, glow: 0.3, facing: 1 }), C("sara", -90, "walk", { dy: 0.54, facing: 1 }), C("homem", -140, "walk", { id: "lo", dy: 0.56, facing: 1 }), C("rebanho", -220, "walk", { dy: 0.46, facing: 1 })], env: { terrain: "field", glory: 0.55, night: 0.05 } }), // Siquém, o carvalho de Moré; os cananeus na terra
      // O ALTAR DE SIQUÉM (v.7) — o SENHOR aparece: LUZ, nunca figura
      b(7, { by: "deus", q: "E apareceu o Senhor a Abrão, e disse: ", props: SIQUEM(true), cast: [C("abraao", -80, "kneel", { dy: 0.5, glow: 0.45 }), C("sara", -20, "bow", { dy: 0.54 }), C("homem", 30, "bow", { id: "lo", dy: 0.56 })], env: { glory: 0.8 } }), // Deus: À tua descendência darei esta terra
      // ENTRE BETEL E AI (v.8-9) — a montanha, a tenda e o segundo altar
      b(8, { set: "betel", props: BETEL, cast: [C("abraao", -78, "raise", { dy: 0.5, glow: 0.4 }), C("sara", -20, "stand", { dy: 0.54 }), C("homem", 34, "stand", { id: "lo", dy: 0.56 })], env: { terrain: "mountain", glory: 0.65, night: 0.1 } }), // armou a tenda; altar; invocou o nome do Senhor
      b(9, { cast: [C("abraao", 60, "walk", { dy: 0.52, glow: 0.35, facing: 1 }), C("sara", 8, "walk", { dy: 0.55, facing: 1 }), C("rebanho", -60, "walk", { dy: 0.48, facing: 1 })], env: { glory: 0.5, night: 0.15 } }), // caminhou, seguindo ainda para o sul
      // A FOME E O EGITO (v.10-13) — a descida e o medo de Abrão
      b(10, { set: "egito", props: EGITO, cast: [C("abraao", -60, "walk", { dy: 0.5, glow: 0.3, facing: 1 }), C("sara", -110, "walk", { dy: 0.54, facing: 1 }), C("rebanho", -180, "walk", { dy: 0.46, facing: 1 })], env: { terrain: "city", night: 0.3, glory: 0.2 } }), // havia fome; desceu Abrão ao Egito
      b(11, { by: "abraao", q: "disse a Sarai, sua mulher: ", cast: [C("abraao", -30, "stand", { dy: 0.5, glow: 0.3, facing: 1 }), C("sara", 30, "stand", { dy: 0.52, facing: -1 })], env: { night: 0.35 } }), // "és mulher formosa à vista"
      b(12, { by: "abraao", env: { night: 0.4 } }),                                                    // "dirão: Esta é sua mulher; e matar-me-ão"
      b(13, { by: "abraao", cast: [C("abraao", -30, "point", { dy: 0.5, glow: 0.3, facing: 1 }), C("sara", 30, "stand", { dy: 0.52, facing: -1 })] }), // "dize, peço-te, que és minha irmã"
      // SARAI LEVADA (v.14-16) — os egípcios, os príncipes, a casa de Faraó
      b(14, { cast: [C("abraao", -60, "stand", { dy: 0.52, glow: 0.3 }), C("sara", 0, "walk", { dy: 0.52, facing: 1 }), C("multidao", 120, "stand", { dy: 0.45 })], env: { night: 0.4 } }), // entrando no Egito, viram a mulher formosa
      b(15, { cast: [C("abraao", -80, "stand", { dy: 0.54, glow: 0.25, facing: 1 }), C("sara", 90, "walk", { dy: 0.52, facing: 1 }), C("servo", 140, "walk", { dy: 0.55, facing: 1 }), C("farao", 200, "stand", { dy: 0.44 })], env: { night: 0.42 } }), // gabaram-na; tomada para a casa de Faraó
      b(16, { cast: [C("abraao", -60, "stand", { dy: 0.52, glow: 0.3 }), C("rebanho", -150, "stand", { dy: 0.46 }), C("servo", -8, "stand", { dy: 0.56 }), C("farao", 200, "stand", { dy: 0.44 })], env: { night: 0.38 } }), // fez bem a Abrão: ovelhas, vacas, servos, camelos
      // AS PRAGAS E A REPREENSÃO (v.17-19) — o SENHOR fere a casa de Faraó
      b(17, { cast: [C("abraao", -60, "stand", { dy: 0.52, glow: 0.3 }), C("farao", 160, "bow", { dy: 0.44 })], env: { storm: 0.3, night: 0.45, glory: 0.15 } }), // feriu o Senhor a Faraó com grandes pragas
      b(18, { by: "farao", q: "disse: ", cast: [C("farao", 90, "point", { dy: 0.44, facing: -1 }), C("abraao", -40, "stand", { dy: 0.52, glow: 0.3, facing: 1 })], env: { storm: 0.3 } }), // "Que é isto que me fizeste?"
      b(19, { by: "farao", cast: [C("farao", 90, "point", { dy: 0.44, facing: -1 }), C("abraao", -40, "stand", { dy: 0.52, glow: 0.3, facing: 1 }), C("sara", 10, "walk", { dy: 0.54, facing: -1 })], env: { storm: 0.2, night: 0.4 } }), // "eis aqui tua mulher; toma-a e vai-te"
      // A SAÍDA (v.20) — acompanhado com tudo o que tinha
      b(20, { cast: [C("farao", 160, "point", { dy: 0.44, facing: -1 }), C("servo", 100, "walk", { dy: 0.56, facing: -1 }), C("abraao", -60, "walk", { dy: 0.52, glow: 0.35, facing: -1 }), C("sara", -110, "walk", { dy: 0.54, facing: -1 }), C("rebanho", -190, "walk", { dy: 0.46, facing: -1 })], env: { storm: 0.05, night: 0.25, glory: 0.4 } }), // acompanharam-no, a ele, sua mulher e tudo o que tinha
    ],
  },
};
