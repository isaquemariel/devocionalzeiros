// ============================================================================
// APOCALIPSE 18–19 — roteiro do modo CENA VIVA v2.
//
// Ap 18 — A QUEDA DA BABILÔNIA: a grande cidade mercante em três atos de
// lamento (reis, mercadores, navegantes) e o silêncio final da pedra de moinho.
// O arco de env é um APAGÃO GRADUAL: a glória do anjo ilumina a terra (v.1),
// o fogo do juízo sobe (v.6-8), a noite cresce ato a ato até o encerramento
// fúnebre (night 0.85) — "e luz de candeia não mais luzirá em ti".
//
// Ap 19 — ALELUIA E O CAVALEIRO FIEL: o contracampo do céu. Quatro aleluias
// erguem a glória até 1, as bodas do Cordeiro, e então o CÉU ABERTO: o
// Cavaleiro Fiel e Verdadeiro (Cristo guerreiro — id "verbo") desce para a
// batalha final contra a besta (storm 0.8, fire 1 no lago de fogo).
//
// Cada beat = 1 versículo (texto ARC em runtime). `by` = quem fala; `q` =
// marcador do início da citação (substring exata do versículo).
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });

// ----------------------------------------------------------------------------
// SETS
// ----------------------------------------------------------------------------

// BABILÔNIA, a cidade mercante: torres, bancas de comércio, ânforas e caixas
// de mercadoria — a opulência que vai arder. Corredor -100..-190 livre
// (vaga dos extras do versículo).
const BABYLON: StagePropSpec[] = [
  P("tower", -300, 1.35, undefined, 0.05),
  P("tower", 260, 1.15, undefined, 0.08),
  P("stall", 140, 1.05, undefined, 0.2),
  P("stall", -280, 1.0, undefined, 0.28),
  P("crate", 200, 0.85, undefined, 0.55),
  P("crate", -240, 0.8, undefined, 0.5),
  P("amphora", 105, 0.9, undefined, 0.52),
  P("amphora", -205, 0.8, undefined, 0.65),
  P("well", 315, 1.0, undefined, 0.3),
  P("tree", -55, 0.9, undefined, 0.06),
  P("bush", 190, 0.95, undefined, 0.3),
  P("grass", 55, 1.0, undefined, 0.8),
  P("grass", -30, 0.95, undefined, 0.72),
  P("grass", 240, 0.9, undefined, 0.75),
];

// v.12-13: as mercadorias que ninguém mais compra, empilhadas na vaga dos
// extras — ouro, linho, marfim, vinho, trigo… (caixas e ânforas em destaque)
const BABYLON_WARES: StagePropSpec[] = [
  ...BABYLON,
  P("crate", -130, 1.0, undefined, 0.18),
  P("amphora", -168, 0.9, undefined, 0.32),
];

// O PORTO (v.17-19): pilotos e marinheiros de longe, no mar; ao fundo, a
// torre de Babilônia — a fumaça do incêndio é o env.fire alto no horizonte.
const PORTO: StagePropSpec[] = [
  P("boat", 90, 1.15, undefined, 0.28),
  P("boat", 220, 0.9, undefined, 0.5),
  P("crate", 150, 0.85, undefined, 0.62),
  P("amphora", -230, 0.85, undefined, 0.55),
  P("rock", -280, 0.9, undefined, 0.42),
  P("palm", 280, 1.0, undefined, 0.12),
  P("tower", -320, 1.1, undefined, 0.06), // a cidade ardendo, ao longe
];

// v.21: o forte anjo levanta a pedra "como uma grande mó" — entra na vaga
// dos extras e SAI no beat seguinte (lançada no mar).
const PORTO_MILLSTONE: StagePropSpec[] = [
  ...PORTO,
  P("rock", -140, 1.2, undefined, 0.22), // a grande mó erguida
];

// O CÉU (Ap 19): sala do trono em festa — trono ao centro, castiçais acesos,
// altar e incensário, estrelas. Corredor -100..-190 livre.
const CEU: StagePropSpec[] = [
  P("throneOfGod", 0, 1.3, undefined, 0.05),
  P("lampstand", -230, 0.95, 1, 0.25),
  P("lampstand", 230, 0.95, 1, 0.25),
  P("altar", 120, 1.0, undefined, 0.12),
  P("censer", 290, 0.8, undefined, 0.45),
  P("star", -300, 0.6, undefined, 0.06),
  P("star", 300, 0.55, undefined, 0.1),
];

// O CÉU ABERTO (19:11): nuvens de glória, a porta escancarada do céu na vaga
// dos extras, o sol (estrela alta ao centro) onde o anjo se põe no v.17.
const CEU_ABERTO: StagePropSpec[] = [
  P("door", -140, 1.2, undefined, 0.15), // o céu aberto
  P("star", 0, 0.8, undefined, 0.04),    // o sol (o anjo estará nele, v.17)
  P("star", -260, 0.6, undefined, 0.1),
  P("star", 260, 0.6, undefined, 0.1),
];

// O CAMPO DA BATALHA FINAL (19:19-21): terra crestada sob tempestade.
const BATALHA: StagePropSpec[] = [
  P("rock", -240, 0.9, undefined, 0.4),
  P("rock", 230, 0.8, undefined, 0.62),
  P("tree", 300, 1.0, undefined, 0.08),
  P("campfire", -300, 1.0, 1, 0.5),
  P("grass", 60, 0.95, undefined, 0.78),
  P("grass", -40, 0.9, undefined, 0.7),
];

// v.20: a besta e o falso profeta lançados VIVOS no lago de fogo — o lago
// entra em cena (campfire grande, fire 1) onde a besta estava.
const BATALHA_LAGO: StagePropSpec[] = [
  ...BATALHA,
  P("campfire", -140, 1.5, 1, 0.35), // o lago de fogo que arde com enxofre
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Ap 18
  // A QUEDA DA BABILÔNIA — cidade rica ao anoitecer; a luz do anjo, o fogo
  // do juízo, três coros de lamento e o apagão final.
  18: {
    start: { terrain: "city", night: 0.3, glory: 0 },
    beats: [
      b(1, { cast: [C("joao", -70, "stand", { dy: 0.55 }), C("anjo", 20, "flyIdle", { glow: 1, dy: 0.3 })], props: BABYLON, env: { glory: 0.5 } }), // outro anjo desce; a terra iluminada com sua glória
      b(2, { by: "anjo", q: "dizendo: ", env: { glory: 0.28, night: 0.35 } }),           // "Caiu, caiu a grande Babilônia" — morada de demônios
      b(3, { by: "anjo" }),                                                              // nações beberam do vinho; reis e mercadores
      b(4, { env: { glory: 0.35 } }),                                                    // outra voz do céu: Sai dela, povo meu
      b(5, { env: { night: 0.4 } }),                                                     // pecados acumulados até ao céu
      b(6, { env: { fire: 0.15 } }),                                                     // tornai-lhe a dar; em dobro no cálice
      b(7, { env: { fire: 0.25, glory: 0.2 } }),                                         // "estou assentada como rainha" — tormento e pranto
      b(8, { env: { fire: 0.4, storm: 0.25 } }),                                         // num dia as pragas; queimada no fogo
      // ATO 1 — OS REIS lamentam de longe (o anjo já subiu)
      b(9, { cast: [C("joao", -90, "stand", { dy: 0.58 }), C("homem", 60, "bow", { dy: 0.5, id: "rei1" }), C("homem", 115, "bow", { dy: 0.56, id: "rei2" })], env: { night: 0.5, fire: 0.5, glory: 0.1 } }), // os reis choram vendo a fumaça do incêndio
      b(10, { by: "homem", q: "dizendo: " }),                                            // "Ai! ai daquela grande cidade de Babilônia"
      // ATO 2 — OS MERCADORES choram junto às bancas vazias
      b(11, { cast: [C("joao", -90, "stand", { dy: 0.58 }), C("homem", 40, "bow", { dy: 0.5, id: "mercador" }), C("mulherComum", 95, "stand", { dy: 0.56 })], env: { night: 0.55 } }), // mercadores lamentam: ninguém mais compra
      b(12, { props: BABYLON_WARES }),                                                   // ouro, prata, pérolas, linho fino, marfim…
      b(13, { env: { night: 0.6 } }),                                                    // canela, vinho, trigo… corpos e almas de homens
      b(14, { env: { night: 0.65 } }),                                                   // o fruto do desejo foi-se de ti
      b(15, { cast: [C("joao", -90, "stand", { dy: 0.58 }), C("homem", 170, "bow", { dy: 0.5, id: "mercador" }), C("mulherComum", 215, "bow", { dy: 0.56 })] }), // mercadores de longe, chorando e lamentando
      b(16, { by: "homem", q: "dizendo: " }),                                            // "Ai, ai daquela grande cidade!" — numa hora
      // ATO 3 — OS NAVEGANTES: o porto; fumaça do incêndio no horizonte
      b(17, { set: "porto", env: { terrain: "patmos", fire: 0.6, night: 0.6, storm: 0.1 }, cast: [C("joao", -80, "stand", { dy: 0.58 }), C("homem", 30, "stand", { dy: 0.5, id: "piloto" }), C("homem", 90, "stand", { dy: 0.56, id: "marinheiro" })], props: PORTO }), // pilotos e marinheiros se puseram de longe
      b(18, { by: "homem", q: "dizendo: ", env: { fire: 0.7 } }),                        // "Que cidade é semelhante a esta grande cidade?"
      b(19, { by: "homem", q: "dizendo: ", cast: [C("joao", -80, "stand", { dy: 0.58 }), C("homem", 30, "kneel", { dy: 0.5, id: "piloto" }), C("homem", 90, "bow", { dy: 0.56, id: "marinheiro" })] }), // pó sobre as cabeças: "Ai, ai…"
      b(20, { env: { glory: 0.4, storm: 0 } }),                                          // alegra-te sobre ela, ó céu!
      // FINAL — a pedra de moinho e o silêncio
      b(21, { by: "anjo", q: "dizendo: ", cast: [C("joao", -80, "stand", { dy: 0.58 }), C("anjo", -40, "raise", { glow: 0.8, dy: 0.42 }), C("homem", 90, "stand", { dy: 0.56, id: "marinheiro" })], props: PORTO_MILLSTONE, env: { storm: 0.5, glory: 0.15 } }), // o forte anjo levanta a grande mó e lança ao mar
      b(22, { props: PORTO, env: { night: 0.7, storm: 0.35, fire: 0.5 } }),              // a mó afundou: nunca mais harpistas nem músicos
      b(23, { env: { night: 0.8, glory: 0, fire: 0.35 } }),                              // luz de candeia não mais; voz de esposo e esposa não mais
      b(24, { cast: [C("joao", -20, "kneel", { dy: 0.55 }), C("anjo", 40, "stand", { glow: 0.4, dy: 0.48 })], env: { night: 0.85, storm: 0.2, fire: 0.25 } }), // nela o sangue dos profetas e dos santos (fúnebre)
    ],
  },

  // ------------------------------------------------------------------ Ap 19
  // ALELUIA E O CAVALEIRO FIEL — o céu inteiro em louvor; as bodas do
  // Cordeiro; o céu aberto e a batalha final.
  19: {
    start: { terrain: "throne", night: 0, glory: 0.8 },
    beats: [
      // OS QUATRO ALELUIAS — a glória sobe a 1
      b(1, { by: "multidao", q: "que dizia: ", cast: [C("joao", -90, "stand", { dy: 0.58 }), C("multidao", 70, "raise", { dy: 0.42 })], props: CEU }), // grande voz de grande multidão: "Aleluia!"
      b(2, { by: "multidao", env: { glory: 0.85 } }),                                    // verdadeiros e justos são os seus juízos
      b(3, { by: "multidao", q: "disseram: ", env: { fire: 0.12 } }),                    // 2º Aleluia — a fumaça dela sobe para sempre
      b(4, { by: "anciao", q: "dizendo: ", cast: [C("joao", -90, "stand", { dy: 0.58 }), C("anciao", -50, "bow", { dy: 0.5, id: "anciao1" }), C("anciao", 0, "bow", { dy: 0.56, id: "anciao2" }), C("multidao", 90, "raise", { dy: 0.42 }), C("servivente", 160, "flyIdle", { glow: 0.6, dy: 0.28 })], env: { glory: 0.9 } }), // anciãos e animais prostrados: "Amém. Aleluia!"
      b(5, { env: { glory: 0.95, fire: 0 } }),                                           // voz do trono: louvai o nosso Deus
      b(6, { by: "multidao", q: "que dizia: ", env: { glory: 1 } }),                     // voz de muitas águas: "Aleluia! o Senhor reina"
      // AS BODAS DO CORDEIRO
      b(7, { by: "multidao", cast: [C("joao", -90, "stand", { dy: 0.58 }), C("cordeiro", 35, "stand", { glow: 0.9, dy: 0.35 }), C("anciao", -45, "raise", { dy: 0.52, id: "anciao1" }), C("multidao", 120, "raise", { dy: 0.45 })] }), // vindas são as bodas do Cordeiro
      b(8, { env: { glory: 1, night: 0 } }),                                             // linho fino, puro e resplandecente: as justiças dos santos
      b(9, { by: "anjo", q: "disse-me: ", cast: [C("anjo", -95, "stand", { glow: 0.7, dy: 0.5 }), C("joao", -40, "write", { dy: 0.56 }), C("cordeiro", 35, "stand", { glow: 0.9, dy: 0.35 }), C("multidao", 130, "raise", { dy: 0.45 })] }), // "Escreve: Bemaventurados os chamados à ceia"
      b(10, { by: "anjo", q: "disse-me: ", cast: [C("anjo", -95, "stand", { glow: 0.7, dy: 0.5 }), C("joao", -60, "kneel", { dy: 0.56 }), C("cordeiro", 35, "stand", { glow: 0.9, dy: 0.35 }), C("multidao", 130, "stand", { dy: 0.45 })] }), // João se lança aos pés — "Olha não faças tal"
      // O CÉU ABERTO — o Cavaleiro Fiel e Verdadeiro (Cristo guerreiro)
      b(11, { set: "ceuAberto", env: { terrain: "glory", glory: 1, night: 0, fire: 0 }, cast: [C("joao", -100, "stand", { dy: 0.58 }), C("cavaleiro", 30, "stand", { palette: "branco", glow: 1, dy: 0.4, id: "verbo" })], props: CEU_ABERTO }), // eis um cavalo branco: Fiel e Verdadeiro
      b(12, { env: { fire: 0.2 } }),                                                     // olhos como chama de fogo; muitos diademas
      b(13, { env: { fire: 0.15 } }),                                                    // veste tingida em sangue: A Palavra de Deus
      b(14, { cast: [C("joao", -100, "stand", { dy: 0.58 }), C("cavaleiro", 30, "stand", { palette: "branco", glow: 1, dy: 0.4, id: "verbo" }), C("cavaleiro", 140, "stand", { palette: "branco", glow: 0.5, dy: 0.5, id: "exercito" }), C("multidao", 215, "stand", { dy: 0.55 })] }), // os exércitos do céu o seguem em cavalos brancos
      b(15, { env: { storm: 0.2 } }),                                                    // da boca sai aguda espada; vara de ferro; o lagar
      b(16, { env: { glory: 1 } }),                                                      // Rei dos reis, e Senhor dos senhores
      // O ANJO NO SOL convoca as aves
      b(17, { by: "anjo", q: "meio do céu: ", cast: [C("joao", -100, "stand", { dy: 0.58 }), C("anjo", -5, "flyIdle", { glow: 1, dy: 0.15 }), C("cavaleiro", 30, "stand", { palette: "branco", glow: 1, dy: 0.42, id: "verbo" }), C("cavaleiro", 140, "stand", { palette: "branco", glow: 0.5, dy: 0.5, id: "exercito" })], env: { night: 0.4 } }), // o anjo no sol: "Vinde à ceia do grande Deus"
      b(18, { by: "anjo", env: { night: 0.45 } }),                                       // a carne dos reis, dos fortes, dos cavalos…
      // A BATALHA FINAL
      b(19, { set: "batalha", env: { terrain: "field", storm: 0.8, fire: 0.5, night: 0.5, glory: 0.4 }, cast: [C("besta", -140, "stand", { dy: 0.5 }), C("multidao", -70, "stand", { dy: 0.56 }), C("cavaleiro", 90, "stand", { palette: "branco", glow: 1, dy: 0.45, id: "verbo" }), C("cavaleiro", 160, "stand", { palette: "branco", glow: 0.5, dy: 0.52, id: "exercito" }), C("joao", 260, "stand", { dy: 0.62 })], props: BATALHA }), // a besta e os reis reunidos para a guerra
      b(20, { env: { fire: 1, storm: 0.6 }, cast: [C("multidao", -70, "stand", { dy: 0.56 }), C("cavaleiro", 90, "point", { palette: "branco", glow: 1, dy: 0.45, id: "verbo", facing: -1 }), C("cavaleiro", 160, "stand", { palette: "branco", glow: 0.5, dy: 0.52, id: "exercito" }), C("joao", 260, "stand", { dy: 0.62 })], props: BATALHA_LAGO }), // a besta e o falso profeta lançados no lago de fogo
      b(21, { env: { fire: 0.6, storm: 0.5, night: 0.55 }, cast: [C("homem", -80, "lie", { dy: 0.56 }), C("cavaleiro", 90, "stand", { palette: "branco", glow: 1, dy: 0.45, id: "verbo" }), C("cavaleiro", 160, "stand", { palette: "branco", glow: 0.5, dy: 0.52, id: "exercito" }), C("joao", 260, "stand", { dy: 0.62 })] }), // os demais mortos pela espada; as aves fartas
    ],
  },
};
