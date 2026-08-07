// ============================================================================
// GÊNESIS — cena viva, caps. 45–46 ("EU SOU JOSÉ" e A DESCIDA AO EGITO).
//
// Cap. 45: o capítulo do RECONHECIMENTO — o pico emocional do livro. Ele começa
// com uma SUBTRAÇÃO de elenco: José manda sair todo o homem (v.1) e o `servo`
// egípcio atravessa o palco para fora; a partir do v.2 a sala do governador do
// Egito só tem doze filhos de Israel dentro dela. O env é um crescendo de LUZ
// que nunca recua: glory 0.3 → 0.5 no choro alto (v.2) → 0.7 com storm 0.15 no
// choque do v.3 (a única tempestade do capítulo: o susto, não o juízo) → 0.9 no
// v.8, onde está a teologia inteira do ciclo de José ("não fostes vós que me
// enviastes para cá, senão Deus"). O palco também RESPIRA o texto: no v.3 os
// irmãos RECUAM (pasmados, andam para trás, dx -130/-164/-250) e no v.4, ao
// "chegai-vos a mim", eles ANDAM DE VOLTA para perto dele — o motor faz o
// caminho a pé, e é o abraço que os traz. Depois a história se abre em três
// sets: o palácio de Faraó (v.16–20, "o melhor da terra do Egito será vosso"),
// o pátio da despedida com os carros carregando-se beat a beat (v.21–24) e
// CANAÃ (v.25–28), onde o coração do velho desmaia (v.26, night 0.35) e revive
// quando VÊ OS CARROS entrando no corredor de extras (v.27, glory 0.8).
//
// Cap. 46: A DESCIDA. Berseba, o poço do juramento, com o altar aceso e os
// sacrifícios ao Deus de Isaque (v.1); a VISÃO NOTURNA (v.2–4: night 0.75 e
// glory 0.7 juntas — a noite mais luminosa de Gênesis); a CARAVANA em marcha
// pelo deserto com os carros de Faraó (v.5–7); o MEMORIAL DOS SETENTA
// (v.8–27), tratado como passagem de TEMPO: tendas ao fundo, figurantes
// trocados a cada bloco de tribo, o rolo do registro crescendo no corredor de
// extras e o ciclo dia/noite girando por cima dos nomes; e GÓSEN (v.28–34),
// onde Judá vai adiante, José apronta o carro e SOBE ao encontro do pai — o
// choro sobre o pescoço "longo tempo" (v.29) e a frase que fecha uma vida
// inteira de luto: "Morra eu agora, pois já tenho visto o teu rosto" (v.30).
//
// DEUS NUNCA É DESENHADO. Em 46:2–4 quem fala em balão é JACÓ ("Eis-me aqui");
// as palavras do SENHOR ("não temas descer ao Egito… eu descerei contigo") são
// narração pura e LUZ — glory subindo sobre o velho ajoelhado, com glow nele.
//
// Elenco (continuidade com os caps. 43–44): `jose` = o regente, glow ~0.4 no
// Egito; `jaco` = Israel, o pai; `homem` (sem id) = JUDÁ, a voz dos irmãos,
// com o glow de fiador que nasceu em 44:32 e não se apaga; `pastor` (scale
// 0.9) = BENJAMIM; `multidao` = os demais irmãos e, no memorial, as gerações;
// `servo` = os egípcios da casa; `mulherComum` = as MATRIARCAS (Lia, Zilpa,
// Raquel, Bila — com glow leve para distingui-las) e as filhas (Diná, Sera,
// Azenate); `rebanho` = as ovelhas e as vacas, que no fim do cap. 46 viram o
// assunto político da família. (A figura radiante `mulher` — a mulher vestida
// do sol — é de Apocalipse 12, jamais das mães de Israel.)
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });

// ------------------------------------------------------------------ Gn 45: sets
// A CASA DE JOSÉ NO EGITO: a sala do governador — torres do palácio ao fundo,
// o portão pesado por onde os egípcios saem no v.1, candeeiros acesos, a banca
// da despensa, o poço do pátio. O corredor dx -100..-190 fica LIVRE: é a vaga
// dos extras do versículo (o feixe da sega, o recado ao pai, a tenda de Gósen).
const CASA_JOSE: StagePropSpec[] = [
  P("tower", -308, 1.25, undefined, 0.04),     // as torres do palácio, ao fundo
  P("tower", 296, 1.35, undefined, 0.06),
  P("door", 226, 1.2, undefined, 0.14),        // o portão: "Fazei sair daqui a todo o homem"
  P("lampstand", -244, 1.05, 1, 0.3),
  P("lampstand", 244, 1.0, 1, 0.36),
  P("stall", -272, 1.0, undefined, 0.18),      // a banca da despensa do regente
  P("well", 320, 1.0, undefined, 0.64),
  P("palm", 158, 1.1, undefined, 0.2),
  P("palm", 30, 1.0, undefined, 0.04),
  P("bush", 120, 0.8, undefined, 0.6),
  P("amphora", -66, 0.85, undefined, 0.86),
  P("crate", 96, 0.85, undefined, 0.9),
  P("grass", -20, 1.0, undefined, 0.92),
  P("grass", 200, 0.95, undefined, 0.76),
  P("grass", 286, 0.9, undefined, 0.5),
];

// v.6 — "ainda restam cinco anos em que não haverá lavoura nem sega": o FEIXE
// entra em destaque. É o mesmo feixe do sonho de 37:7 — agora ele explica a
// fome, e não só o domínio.
const CASA_SEGA: StagePropSpec[] = [
  ...CASA_JOSE,
  P("sheaf", -150, 1.05, undefined, 0.2),      // o feixe da sega que não virá
];

// v.9 — "subi a meu pai, e dizei-lhe: Assim tem dito o teu filho José": o
// recado que atravessa o deserto.
const CASA_RECADO: StagePropSpec[] = [
  ...CASA_SEGA,
  P("scroll", -186, 0.95, undefined, 0.28),    // "Assim tem dito o teu filho José"
];

// v.10 — "E habitarás na terra de Gósen, e estarás perto de mim": a tenda da
// família plantada dentro do Egito, ao lado do trono.
const CASA_GOSEN: StagePropSpec[] = [
  ...CASA_RECADO,
  P("tent", -146, 1.15, undefined, 0.12),      // a tenda de Gósen, perto de mim
];

// v.13 — "fazei saber a meu pai toda a minha glória no Egito".
const CASA_GLORIA: StagePropSpec[] = [
  ...CASA_GOSEN,
  P("crate", -108, 1.0, undefined, 0.22),      // os bens da glória de José no Egito
];

// O PALÁCIO DE FARAÓ (v.16–20): o trono, as torres, os candeeiros, a malga da
// fartura da terra. Corredor de extras livre para os CARROS do v.19.
const PALACIO: StagePropSpec[] = [
  P("throne", 44, 1.15, undefined, 0.1),       // o trono de Faraó
  P("tower", -310, 1.3, undefined, 0.02),
  P("tower", 300, 1.2, undefined, 0.08),
  P("door", -260, 1.15, undefined, 0.2),
  P("lampstand", -60, 1.0, 1, 0.28),
  P("lampstand", 148, 1.05, 1, 0.3),
  P("stall", 240, 1.0, undefined, 0.3),
  P("palm", 200, 1.1, undefined, 0.12),
  P("amphora", -226, 0.85, undefined, 0.6),
  P("bowl", -34, 0.8, undefined, 0.92),        // "comereis da fartura da terra"
  P("crate", 96, 0.85, undefined, 0.9),
  P("grass", 280, 0.9, undefined, 0.62),
];

// v.19 — "tomai vós da terra do Egito carros para vossos meninos, para vossas
// mulheres, e para vosso pai": três carros reais entram no corredor. São eles
// que, vistos em Canaã no v.27, ressuscitam o espírito de Jacó.
const PALACIO_CARROS: StagePropSpec[] = [
  ...PALACIO,
  P("crate", -186, 1.05, undefined, 0.2),      // carros para os meninos
  P("crate", -146, 0.95, undefined, 0.34),     // carros para as mulheres
  P("crate", -106, 1.0, undefined, 0.14),      // e para vosso pai
];

// O PÁTIO DA DESPEDIDA (v.21–24): o portão de saída, os carros de Faraó já
// engatados, o poço. A carga do versículo entra beat a beat no corredor.
const PARTIDA: StagePropSpec[] = [
  P("door", 214, 1.25, undefined, 0.1),        // o portão da saída para Canaã
  P("tower", -300, 1.2, undefined, 0.04),
  P("tower", 306, 1.15, undefined, 0.12),
  P("crate", -260, 1.05, undefined, 0.24),     // os carros, conforme o mandado de Faraó
  P("crate", -218, 0.95, undefined, 0.4),
  P("crate", 250, 1.0, undefined, 0.34),
  P("well", 320, 1.0, undefined, 0.68),
  P("palm", 150, 1.1, undefined, 0.18),
  P("palm", 40, 0.95, undefined, 0.02),
  P("bush", 110, 0.8, undefined, 0.6),
  P("amphora", -66, 0.85, undefined, 0.86),
  P("grass", -20, 1.0, undefined, 0.94),
  P("grass", 190, 0.95, undefined, 0.78),
];

// v.21 — "também lhes deu comida para o caminho".
const PARTIDA_COMIDA: StagePropSpec[] = [
  ...PARTIDA,
  P("crate", -186, 1.0, undefined, 0.18),      // comida para o caminho
];

// v.22 — "a cada um, mudas de roupas; mas a Benjamim… trezentas peças de prata".
const PARTIDA_PRATA: StagePropSpec[] = [
  ...PARTIDA_COMIDA,
  P("crate", -146, 1.05, undefined, 0.32),     // as mudas de roupas e a prata de Benjamim
];

// v.23 — "dez jumentos carregados de trigo e pão, e comida para seu pai".
const PARTIDA_TRIGO: StagePropSpec[] = [
  ...PARTIDA_PRATA,
  P("sheaf", -106, 1.05, undefined, 0.2),      // trigo e pão para o pai
];

// CANAÃ (v.25–28): o acampamento de Israel na fome — a tenda grande do pai, o
// poço, a tamareira sem sombra, a terra seca. Corredor LIVRE: é ali que entram
// os carros do Egito no v.27.
const CANAA: StagePropSpec[] = [
  P("tent", -286, 1.3, undefined, 0.14),       // a tenda de Israel, o pai
  P("tent", 244, 1.15, undefined, 0.22),
  P("well", 316, 1.0, undefined, 0.62),
  P("rock", -320, 0.95, undefined, 0.44),
  P("rock", 60, 0.6, undefined, 0.78),
  P("palm", 24, 1.05, undefined, 0.06),
  P("tree", 196, 1.0, undefined, 0.1),
  P("bush", -56, 0.8, undefined, 0.32),
  P("bush", 130, 0.75, undefined, 0.66),
  P("amphora", -246, 0.85, undefined, 0.56),
  P("grass", -230, 0.85, undefined, 0.84),
  P("grass", 276, 0.85, undefined, 0.76),
];

// v.27 — "vendo ele os carros que José enviara para levá-lo, reviveu o espírito
// de Jacó": os carros do Egito ENTRAM em Canaã. É o beat-dobradiça do capítulo.
const CANAA_CARROS: StagePropSpec[] = [
  ...CANAA,
  P("crate", -180, 1.1, undefined, 0.16),
  P("crate", -138, 1.0, undefined, 0.3),
  P("crate", -104, 1.05, undefined, 0.18),
];

// ------------------------------------------------------------------ Gn 46: sets
// BERSEBA — o poço do juramento, a última fronteira da Terra Prometida. Israel
// não desce ao Egito sem antes levantar o ALTAR do Deus de seu pai Isaque.
const BERSEBA: StagePropSpec[] = [
  P("altar", 0, 1.2, undefined, 0.2),          // o altar dos sacrifícios ao Deus de Isaque
  P("campfire", 64, 0.95, 1, 0.36),            // o fogo do sacrifício
  { ...P("well", 318, 1.05, undefined, 0.6), tag: "poco-berseba" },        // Berseba: o poço do juramento
  P("tent", -292, 1.3, undefined, 0.12),
  P("tent", 246, 1.15, undefined, 0.2),
  P("rock", -320, 1.0, undefined, 0.46),
  P("rock", 140, 0.7, undefined, 0.76),
  P("palm", -40, 1.0, undefined, 0.04),
  P("bush", -60, 0.8, undefined, 0.66),
  P("amphora", -250, 0.85, undefined, 0.58),
  P("grass", -220, 0.9, undefined, 0.86),
  P("grass", 210, 0.95, undefined, 0.8),
  P("grass", 286, 0.9, undefined, 0.54),
];

// v.2 — "em visões de noite": uma estrela solitária no corredor de extras. A
// voz que fala não tem figura; o céu, sim.
const BERSEBA_NOITE: StagePropSpec[] = [
  ...BERSEBA,
  P("star", -150, 0.9, undefined, 0.08),       // as visões da noite
];

// A CARAVANA no deserto: os carros de Faraó, as tendas dobradas, a estrada
// seca entre Canaã e o Egito. Um dos beats mais visuais do livro.
const CARAVANA: StagePropSpec[] = [
  P("crate", -280, 1.1, undefined, 0.2),       // os carros que Faraó enviara
  P("crate", -236, 1.0, undefined, 0.36),
  P("crate", 258, 1.05, undefined, 0.26),
  P("crate", 300, 0.95, undefined, 0.44),
  P("tent", 230, 1.1, undefined, 0.08),        // as tendas do acampamento levantado
  P("rock", -320, 0.95, undefined, 0.5),
  P("rock", 70, 0.65, undefined, 0.8),
  P("palm", 30, 1.05, undefined, 0.04),
  P("bush", -50, 0.8, undefined, 0.3),
  P("amphora", -66, 0.85, undefined, 0.9),
  P("well", 326, 1.0, undefined, 0.7),
  P("grass", -206, 0.9, undefined, 0.88),
  P("grass", 160, 0.95, undefined, 0.86),
  P("grass", 204, 0.9, undefined, 0.58),
];

// v.5 — "nos carros que Faraó enviara para o levar": o carro DO VELHO PAI, em
// destaque. Jacó tem 130 anos e não desce a pé.
const CARAVANA_CARRO: StagePropSpec[] = [
  ...CARAVANA,
  P("crate", -146, 1.15, undefined, 0.16),     // o carro do velho pai
];

// v.6 — "tomaram o seu gado e os seus bens que tinham adquirido na terra de
// Canaã": vinte anos de Padã-Arã cabendo em jarros e caixas.
const CARAVANA_BENS: StagePropSpec[] = [
  ...CARAVANA_CARRO,
  P("amphora", -186, 0.95, undefined, 0.3),    // os bens adquiridos em Canaã
  P("crate", -108, 1.0, undefined, 0.24),
];

// O MEMORIAL DOS SETENTA (v.8–27): não é lista, é acampamento de gerações.
// Tendas ao fundo, a fogueira da casa, o poço, as árvores — e o corredor de
// extras reservado para o ROLO DO REGISTRO, que cresce a cada total.
const MEMORIAL: StagePropSpec[] = [
  P("tent", -300, 1.35, undefined, 0.1),       // a tenda do pai
  P("tent", -246, 1.1, undefined, 0.26),
  P("tent", 236, 1.2, undefined, 0.16),
  P("tent", 300, 1.0, undefined, 0.34),
  P("campfire", 150, 0.9, 1, 0.42),
  P("well", 320, 1.0, undefined, 0.66),
  P("tree", 40, 1.15, undefined, 0.04),
  P("tree", -50, 0.95, undefined, 0.3),
  P("bush", 96, 0.8, undefined, 0.72),
  P("amphora", -30, 0.8, undefined, 0.88),
  P("grass", -200, 0.95, undefined, 0.86),
  P("grass", 200, 1.0, undefined, 0.8),
  P("grass", 270, 0.9, undefined, 0.56),
];

// Os cinco totais do memorial, um rolo cada: 33 de Lia (v.15), 16 de Zilpa
// (v.18), 14 de Raquel (v.22), 7 de Bila (v.25) e as SETENTA almas (v.27).
const MEM_33: StagePropSpec[] = [...MEMORIAL, P("scroll", -186, 1.0, undefined, 0.16)];
const MEM_16: StagePropSpec[] = [...MEM_33, P("scroll", -146, 0.95, undefined, 0.3)];
const MEM_14: StagePropSpec[] = [...MEM_16, P("scroll", -108, 1.0, undefined, 0.14)];
const MEM_7: StagePropSpec[] = [...MEM_14, P("scroll", -178, 0.95, undefined, 0.48)];
const MEM_70: StagePropSpec[] = [...MEM_7, P("scroll", -120, 1.1, undefined, 0.6)];

// GÓSEN — "o melhor da terra do Egito": água, pasto, árvores, currais. Depois
// de Canaã ressecada, o palco fica verde. Corredor livre para o carro de José.
const GOSEN: StagePropSpec[] = [
  P("river", 0, 1.15, undefined, 0.18),        // as águas de Gósen
  P("tree", -46, 1.05, undefined, 0.06),
  P("tree", 66, 1.15, undefined, 0.04),
  P("tree", 200, 1.0, undefined, 0.14),
  P("tent", -288, 1.3, undefined, 0.12),       // as tendas da casa de Jacó
  P("tent", 250, 1.15, undefined, 0.22),
  P("campfire", 214, 0.85, 1, 0.44),
  P("well", 320, 1.05, undefined, 0.64),
  P("stall", -246, 1.0, undefined, 0.3),
  P("amphora", -222, 0.85, undefined, 0.62),
  P("bush", -66, 0.85, undefined, 0.68),
  P("bush", 120, 0.8, undefined, 0.5),
  P("grass", -206, 0.95, undefined, 0.88),
  P("grass", 160, 1.0, undefined, 0.82),
  P("grass", 286, 0.9, undefined, 0.5),
];

// v.29 — "então José aprontou o seu carro, e subiu ao encontro de Israel".
const GOSEN_CARRO: StagePropSpec[] = [
  ...GOSEN,
  P("crate", -150, 1.1, undefined, 0.16),      // o carro do regente, subindo a Gósen
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Gn 45
  // "EU SOU JOSÉ": o reconhecimento. Arco de env em crescendo de luz —
  // glory 0.3 → 0.9 (a providência) → e, depois da queda em Canaã (night 0.35
  // no coração que desmaia), glory 0.95 na decisão do velho: "eu irei".
  45: {
    start: { terrain: "city", night: 0.12, glory: 0.3, storm: 0, fire: 0 },
    beats: [
      b(1, { by: "jose", q: "e clamou: ", props: CASA_JOSE, cast: [                  // "Fazei sair daqui a todo o homem" — a sala se esvazia
        C("jose", 10, "raise", { glow: 0.4, dy: 0.42, facing: -1 }),
        C("homem", -60, "stand", { glow: 0.55, dy: 0.54, facing: 1 }),               // Judá, o fiador do cap. 44
        C("pastor", -96, "stand", { dy: 0.58, scale: 0.9 }),                         // Benjamim
        C("multidao", -216, "stand", { dy: 0.46 }),                                  // os demais irmãos
        C("servo", 252, "walk", { dy: 0.28, facing: 1 }),                            // os egípcios saindo pelo portão
      ] }),
      b(2, { env: { glory: 0.5 }, cast: [                                            // O CHORO ALTO: os egípcios ouvem; a casa de Faraó ouve
        C("jose", 4, "kneel", { glow: 0.45, dy: 0.44, facing: -1 }),
        C("homem", -60, "stand", { glow: 0.55, dy: 0.54, facing: 1 }),
        C("pastor", -96, "stand", { dy: 0.58, scale: 0.9 }),
        C("multidao", -216, "stand", { dy: 0.46 }),
      ] }),
      b(3, { by: "jose", q: "E disse José a seus irmãos: ", env: { glory: 0.7, storm: 0.15 }, cast: [  // "EU SOU JOSÉ; VIVE AINDA MEU PAI?" — pasmados, RECUAM
        C("jose", 0, "raise", { glow: 0.7, dy: 0.4, facing: -1 }),
        C("homem", -130, "stand", { glow: 0.55, dy: 0.56, facing: 1 }),
        C("pastor", -164, "stand", { dy: 0.6, scale: 0.9 }),
        C("multidao", -256, "stand", { dy: 0.46 }),
      ] }),
      b(4, { by: "jose", q: "então disse ele: ", env: { glory: 0.75, storm: 0.06 }, cast: [ // "chegai-vos a mim" — e eles andam de volta
        C("jose", 0, "point", { glow: 0.65, dy: 0.42, facing: -1 }),
        C("homem", -44, "stand", { glow: 0.55, dy: 0.54, facing: 1 }),
        C("pastor", -78, "stand", { dy: 0.58, scale: 0.9 }),
        C("multidao", -180, "stand", { dy: 0.46 }),
      ] }),
      b(5, { by: "jose", env: { glory: 0.8, storm: 0 } }),                            // "não vos entristeçais… Deus me enviou adiante de vós"
      b(6, { by: "jose", props: CASA_SEGA }),                                        // dois anos de fome; cinco sem lavoura nem sega
      b(7, { by: "jose", env: { glory: 0.85 }, cast: [                               // "para guardar-vos em vida por um grande livramento"
        C("jose", -6, "stand", { glow: 0.7, dy: 0.42, facing: -1 }),
        C("homem", -50, "stand", { glow: 0.55, dy: 0.54, facing: 1 }),
        C("pastor", -84, "stand", { dy: 0.58, scale: 0.9 }),
        C("multidao", -184, "stand", { dy: 0.46 }),
      ] }),
      b(8, { by: "jose", env: { glory: 0.9 }, cast: [                                // A PROVIDÊNCIA: "não fostes vós… senão Deus"
        C("jose", -4, "raise", { glow: 0.8, dy: 0.4, facing: -1 }),
        C("homem", -50, "kneel", { glow: 0.55, dy: 0.54, facing: 1 }),
        C("pastor", -84, "stand", { dy: 0.58, scale: 0.9 }),
        C("multidao", -184, "bow", { dy: 0.46 }),
      ] }),
      b(9, { by: "jose", env: { glory: 0.82 }, props: CASA_RECADO, cast: [           // "subi a meu pai… desce a mim, e não te demores"
        C("jose", -10, "point", { glow: 0.6, dy: 0.42, facing: -1 }),
        C("homem", -56, "stand", { glow: 0.55, dy: 0.54, facing: 1 }),
        C("pastor", -90, "stand", { dy: 0.58, scale: 0.9 }),
        C("multidao", -190, "stand", { dy: 0.46 }),
      ] }),
      b(10, { by: "jose", props: CASA_GOSEN }),                                      // "habitarás na terra de Gósen, e estarás perto de mim"
      b(11, { by: "jose" }),                                                         // "ali te sustentarei… cinco anos de fome"
      b(12, { by: "jose", cast: [                                                    // "os olhos de meu irmão Benjamim vêem que é minha boca"
        C("jose", -14, "point", { glow: 0.6, dy: 0.42, facing: -1 }),
        C("pastor", -60, "stand", { glow: 0.2, dy: 0.54, scale: 0.9, facing: 1 }),
        C("homem", -104, "stand", { glow: 0.55, dy: 0.56, facing: 1 }),
        C("multidao", -196, "stand", { dy: 0.46 }),
      ] }),
      b(13, { by: "jose", env: { glory: 0.86 }, props: CASA_GLORIA }),               // "fazei saber a meu pai toda a minha glória no Egito"
      b(14, { env: { glory: 0.8 }, cast: [                                           // O ABRAÇO: lançou-se ao pescoço de Benjamim, e chorou
        C("jose", -2, "kneel", { glow: 0.6, dy: 0.46, facing: 1 }),
        C("pastor", 28, "kneel", { glow: 0.3, dy: 0.46, scale: 0.9, facing: -1 }),
        C("homem", -78, "stand", { glow: 0.55, dy: 0.56, facing: 1 }),
        C("multidao", -190, "stand", { dy: 0.46 }),
      ] }),
      b(15, { env: { glory: 0.85 }, cast: [                                          // RECONCILIAÇÃO TOTAL: beijou a todos, e falaram com ele
        C("jose", -12, "raise", { glow: 0.6, dy: 0.46, facing: 1 }),
        C("pastor", 22, "stand", { glow: 0.3, dy: 0.5, scale: 0.9, facing: -1 }),
        C("homem", 62, "stand", { glow: 0.55, dy: 0.52, facing: -1 }),
        C("multidao", 150, "stand", { dy: 0.44 }),
      ] }),
      b(16, { set: "palacio", props: PALACIO, env: { glory: 0.6, night: 0.08 }, cast: [ // a notícia na casa de Faraó: pareceu bem aos seus olhos
        C("farao", 44, "stand", { glow: 0.3, dy: 0.32, facing: -1 }),
        C("servo", -20, "bow", { dy: 0.5 }),
        C("multidao", -200, "stand", { dy: 0.44 }),
      ] }),
      b(17, { by: "farao", q: "E disse Faraó a José: ", env: { glory: 0.64 }, cast: [ // "carregai os vossos animais e tornai à terra de Canaã"
        C("farao", 44, "point", { glow: 0.3, dy: 0.32, facing: -1 }),
        C("jose", -30, "bow", { glow: 0.4, dy: 0.46, facing: 1 }),
        C("servo", -78, "stand", { dy: 0.54 }),
        C("multidao", -204, "stand", { dy: 0.44 }),
      ] }),
      b(18, { by: "farao", env: { glory: 0.68 } }),                                  // "eu vos darei o melhor da terra do Egito"
      b(19, { by: "farao", props: PALACIO_CARROS }),                                 // OS CARROS: para os meninos, as mulheres e o pai
      b(20, { by: "farao", env: { glory: 0.72 } }),                                  // "o melhor de toda a terra do Egito será vosso"
      b(21, { set: "partida", props: PARTIDA_COMIDA, env: { glory: 0.62, night: 0.14 }, cast: [ // José deu-lhes carros e comida para o caminho
        C("jose", 20, "point", { glow: 0.4, dy: 0.42, facing: -1 }),
        C("homem", -40, "stand", { glow: 0.55, dy: 0.54, facing: 1 }),
        C("pastor", -76, "stand", { dy: 0.58, scale: 0.9 }),
        C("multidao", -196, "stand", { dy: 0.46 }),
        C("rebanho", 170, "stand", { dy: 0.36 }),                                    // os animais carregados
      ] }),
      b(22, { props: PARTIDA_PRATA, cast: [                                          // mudas de roupas a todos; a Benjamim, prata e cinco mudas
        C("jose", 16, "stand", { glow: 0.4, dy: 0.42, facing: -1 }),
        C("pastor", -34, "stand", { glow: 0.35, dy: 0.52, scale: 0.9, facing: 1 }),
        C("homem", -86, "stand", { glow: 0.55, dy: 0.56, facing: 1 }),
        C("multidao", -200, "stand", { dy: 0.46 }),
        C("rebanho", 170, "stand", { dy: 0.36 }),
      ] }),
      b(23, { props: PARTIDA_TRIGO, env: { glory: 0.66 }, cast: [                    // dez jumentos com o melhor do Egito, trigo e pão ao pai
        C("jose", 24, "point", { glow: 0.4, dy: 0.42, facing: -1 }),
        C("homem", -46, "stand", { glow: 0.55, dy: 0.54, facing: 1 }),
        C("pastor", -80, "stand", { dy: 0.58, scale: 0.9 }),
        C("multidao", -200, "stand", { dy: 0.46 }),
        C("rebanho", 190, "walk", { dy: 0.36, facing: -1 }),
      ] }),
      b(24, { by: "jose", q: "e disse-lhes: ", env: { glory: 0.6 }, cast: [          // "Não contendais pelo caminho" — a última palavra do irmão
        C("jose", 44, "raise", { glow: 0.4, dy: 0.42, facing: -1 }),
        C("homem", -20, "walk", { glow: 0.55, dy: 0.54, facing: -1 }),
        C("pastor", -60, "walk", { dy: 0.58, scale: 0.9, facing: -1 }),
        C("multidao", -220, "walk", { dy: 0.46 }),
        C("rebanho", -280, "walk", { dy: 0.36 }),
      ] }),
      b(25, { set: "canaa", props: CANAA, env: { terrain: "field", glory: 0.35, night: 0.2 }, cast: [ // subiram do Egito e vieram a Jacó seu pai
        C("jaco", 10, "stand", { dy: 0.48 }),
        C("homem", -54, "walk", { glow: 0.55, dy: 0.54, facing: 1 }),
        C("pastor", -92, "walk", { dy: 0.58, scale: 0.9, facing: 1 }),
        C("multidao", -206, "walk", { dy: 0.46 }),
        C("mulherComum", 90, "stand", { dy: 0.56 }),
      ] }),
      b(26, { by: "homem", q: "dizendo: ", env: { night: 0.35, glory: 0.2 }, cast: [ // "José ainda vive" — e o coração do velho DESMAIOU
        C("jaco", 16, "kneel", { dy: 0.5 }),
        C("homem", -34, "raise", { glow: 0.55, dy: 0.54, facing: 1 }),
        C("pastor", -74, "stand", { dy: 0.58, scale: 0.9 }),
        C("multidao", -200, "stand", { dy: 0.46 }),
        C("mulherComum", 94, "stand", { dy: 0.56 }),
      ] }),
      b(27, { props: CANAA_CARROS, env: { night: 0.1, glory: 0.8 }, cast: [          // VÊ OS CARROS — e reviveu o espírito de Jacó
        C("jaco", -12, "raise", { glow: 0.4, dy: 0.5, facing: -1 }),
        C("homem", 44, "stand", { glow: 0.55, dy: 0.54, facing: -1 }),
        C("pastor", 84, "stand", { dy: 0.56, scale: 0.9, facing: -1 }),
        C("multidao", -216, "stand", { dy: 0.46 }),
        C("mulherComum", 150, "stand", { dy: 0.58 }),
      ] }),
      b(28, { by: "jaco", q: "E disse Israel: ", env: { glory: 0.95, night: 0.04 }, cast: [ // "Basta; ainda vive meu filho José; eu irei e o verei"
        C("jaco", 0, "raise", { glow: 0.55, dy: 0.48 }),
        C("homem", 56, "stand", { glow: 0.55, dy: 0.54, facing: -1 }),
        C("pastor", 96, "stand", { dy: 0.56, scale: 0.9, facing: -1 }),
        C("multidao", -200, "raise", { dy: 0.46 }),
        C("mulherComum", 152, "stand", { dy: 0.58 }),
      ] }),
    ],
  },

  // ------------------------------------------------------------------ Gn 46
  // A DESCIDA AO EGITO: o altar de Berseba, a visão da noite, a caravana, o
  // memorial dos setenta e o reencontro em Gósen. Arco de env: crepúsculo do
  // sacrifício (night 0.4 + fire) → a NOITE LUMINOSA da visão (night 0.75 +
  // glory 0.7) → manhã da partida → ciclo dia/noite girando sobre as gerações
  // → e a luz cheia do abraço em Gósen (glory 0.9).
  46: {
    start: { terrain: "desert", night: 0.4, glory: 0.3, storm: 0, fire: 0 },
    beats: [
      b(1, { props: BERSEBA, env: { fire: 0.35, glory: 0.5 }, cast: [                // BERSEBA: sacrifícios ao Deus de seu pai Isaque
        C("jaco", -14, "kneel", { glow: 0.3, dy: 0.5 }),
        C("homem", 96, "stand", { glow: 0.55, dy: 0.56, facing: -1 }),
        C("multidao", -210, "stand", { dy: 0.46 }),
        C("rebanho", 190, "stand", { dy: 0.34 }),                                    // as ovelhas do sacrifício
      ] }),
      b(2, { by: "jaco", q: "E ele disse: ", props: BERSEBA_NOITE, env: { night: 0.75, glory: 0.7, fire: 0.2 }, cast: [ // "Jacó, Jacó!" (voz, sem figura) — "Eis-me aqui"
        C("jaco", -8, "kneel", { glow: 0.45, dy: 0.5 }),
        C("rebanho", 230, "lie", { dy: 0.32 }),                                      // o acampamento dorme; a visão é só dele
      ] }),
      b(3, { by: "deus", q: "E disse: ", env: { glory: 0.85 }, cast: [                                           // Deus: "não temas descer ao Egito" (voz do céu)
        C("jaco", -8, "bow", { glow: 0.6, dy: 0.5 }),
        C("rebanho", 230, "lie", { dy: 0.32 }),
      ] }),
      b(4, { by: "deus", env: { glory: 0.95, night: 0.68 }, cast: [                              // Deus: "eu descerei contigo… e te farei tornar a subir"
        C("jaco", -8, "raise", { glow: 0.75, dy: 0.5 }),
        C("rebanho", 230, "lie", { dy: 0.32 }),
      ] }),
      b(5, { set: "caravana", props: CARAVANA_CARRO, env: { night: 0.1, glory: 0.55, fire: 0 }, cast: [ // A PARTIDA: levaram o pai nos carros de Faraó
        C("jaco", -30, "stand", { glow: 0.35, dy: 0.5 }),
        C("homem", 30, "walk", { glow: 0.55, dy: 0.54, facing: 1 }),
        C("mulherComum", 84, "walk", { dy: 0.58, facing: 1 }),
        C("multidao", -212, "walk", { dy: 0.46 }),
        C("rebanho", 200, "walk", { dy: 0.34, facing: 1 }),
      ] }),
      b(6, { props: CARAVANA_BENS, env: { glory: 0.58 }, cast: [                     // o gado e os bens adquiridos em Canaã descem ao Egito
        C("jaco", -24, "stand", { glow: 0.35, dy: 0.5 }),
        C("homem", 40, "walk", { glow: 0.55, dy: 0.54, facing: 1 }),
        C("pastor", 80, "walk", { dy: 0.58, scale: 0.9, facing: 1 }),
        C("multidao", -206, "walk", { dy: 0.46 }),
        C("rebanho", 214, "walk", { dy: 0.34, facing: 1 }),
      ] }),
      b(7, { env: { glory: 0.62 }, cast: [                                           // A CARAVANA INTEIRA: filhos, filhas e netos ao Egito
        C("jaco", -18, "walk", { glow: 0.35, dy: 0.5, facing: 1 }),
        C("mulherComum", 44, "walk", { dy: 0.56, facing: 1 }),
        C("mulherComum", 78, "walk", { dy: 0.6, facing: 1 }),
        C("multidao", -200, "walk", { dy: 0.44 }),
        C("multidao", 196, "walk", { dy: 0.3 }),
        C("rebanho", 250, "walk", { dy: 0.36, facing: 1 }),
      ] }),
      b(8, { set: "memorial", props: MEMORIAL, env: { terrain: "field", night: 0.1, glory: 0.5 }, cast: [ // O MEMORIAL começa: RÚBEN, o primogênito de Jacó
        C("jaco", 20, "stand", { glow: 0.3, dy: 0.44 }),
        C("homem", -50, "stand", { dy: 0.54, facing: 1 }),
        C("multidao", -206, "stand", { dy: 0.42 }),
      ] }),
      b(9, { cast: [                                                                 // os filhos de Rúben: Enoque, Palu, Hezrom e Carmi
        C("jaco", 20, "stand", { glow: 0.3, dy: 0.44 }),
        C("homem", -56, "point", { dy: 0.54, facing: 1 }),
        C("multidao", -190, "stand", { dy: 0.46 }),
      ] }),
      b(10, { env: { glory: 0.46 }, cast: [                                          // SIMEÃO — e Saul, filho de uma mulher cananéia
        C("jaco", 16, "stand", { glow: 0.3, dy: 0.44 }),
        C("homem", -58, "stand", { dy: 0.54, facing: 1 }),
        C("mulherComum", 92, "stand", { dy: 0.58 }),
        C("multidao", -196, "stand", { dy: 0.44 }),
      ] }),
      b(11, { env: { night: 0.16 }, cast: [                                          // LEVI: Gérson, Coate e Merari
        C("jaco", 14, "stand", { glow: 0.3, dy: 0.44 }),
        C("homem", -40, "stand", { dy: 0.54, facing: 1 }),
        C("multidao", -172, "stand", { dy: 0.46 }),
      ] }),
      b(12, { env: { night: 0.3, glory: 0.42 }, cast: [                              // JUDÁ — e as duas mortes: Er e Onã, na terra de Canaã
        C("jaco", 18, "stand", { glow: 0.3, dy: 0.44 }),
        C("homem", -30, "stand", { glow: 0.4, dy: 0.54, facing: 1 }),
        C("multidao", -162, "bow", { dy: 0.46 }),
      ] }),
      b(13, { env: { night: 0.2, glory: 0.48 }, cast: [                              // ISSACAR: Tola, Puva, Jó e Sinrom
        C("jaco", 14, "stand", { glow: 0.3, dy: 0.44 }),
        C("homem", -60, "stand", { dy: 0.54, facing: 1 }),
        C("multidao", -200, "stand", { dy: 0.44 }),
      ] }),
      b(14, { cast: [                                                                // ZEBULOM: Serede, Elom e Jaleel
        C("jaco", 12, "stand", { glow: 0.3, dy: 0.44 }),
        C("homem", -70, "stand", { dy: 0.56, facing: 1 }),
        C("multidao", -212, "stand", { dy: 0.44 }),
      ] }),
      b(15, { props: MEM_33, env: { night: 0.45, glory: 0.44 }, cast: [              // LIA e Diná: trinta e três almas — o primeiro total
        C("jaco", -20, "stand", { glow: 0.3, dy: 0.46 }),
        C("mulherComum", 40, "stand", { glow: 0.25, dy: 0.54, facing: -1 }),
        C("mulherComum", 86, "stand", { dy: 0.58 }),
        C("multidao", -200, "stand", { dy: 0.44 }),
      ] }),
      b(16, { env: { night: 0.55, glory: 0.4 }, cast: [                              // GADE: Zifiom, Hagi, Suni, Esbom, Eri, Arodi e Areli
        C("jaco", -10, "stand", { glow: 0.3, dy: 0.46 }),
        C("homem", -60, "stand", { dy: 0.54, facing: 1 }),
        C("multidao", -190, "stand", { dy: 0.44 }),
      ] }),
      b(17, { cast: [                                                                // ASER — e Sera, a irmã deles; Héber e Malquiel
        C("jaco", -10, "stand", { glow: 0.3, dy: 0.46 }),
        C("homem", -50, "stand", { dy: 0.54, facing: 1 }),
        C("mulherComum", 60, "stand", { dy: 0.58 }),
        C("multidao", -200, "stand", { dy: 0.44 }),
      ] }),
      b(18, { props: MEM_16, env: { night: 0.7, glory: 0.35 }, cast: [               // ZILPA, a serva de Lia: dezesseis almas
        C("jaco", -14, "stand", { glow: 0.3, dy: 0.46 }),
        C("mulherComum", 46, "stand", { dy: 0.56, facing: -1 }),
        C("multidao", -200, "stand", { dy: 0.44 }),
      ] }),
      b(19, { props: MEM_16, env: { night: 0.3, glory: 0.6 }, cast: [                // RAQUEL, a amada: JOSÉ e BENJAMIM — a luz volta
        C("jaco", 14, "stand", { glow: 0.3, dy: 0.46 }),
        C("mulherComum", 44, "stand", { glow: 0.5, dy: 0.52, facing: -1 }),
        C("jose", -30, "stand", { glow: 0.45, dy: 0.5 }),
        C("pastor", -74, "stand", { dy: 0.56, scale: 0.9 }),
      ] }),
      b(20, { env: { night: 0.22, glory: 0.62 }, cast: [                             // Manassés e Efraim, nascidos no Egito de Azenate
        C("jose", -24, "stand", { glow: 0.45, dy: 0.5 }),
        C("mulherComum", 30, "stand", { id: "azenate", dy: 0.56, facing: -1 }),
        C("homem", 74, "stand", { dy: 0.6, scale: 0.85, id: "manasses" }),
        C("homem", 100, "stand", { dy: 0.42, scale: 0.85, id: "efraim" }),
        C("multidao", -206, "stand", { dy: 0.44 }),
      ] }),
      b(21, { cast: [                                                                // os dez filhos de Benjamim
        C("jaco", 16, "stand", { glow: 0.3, dy: 0.44 }),
        C("pastor", -60, "stand", { dy: 0.54, scale: 0.9, facing: 1 }),
        C("multidao", -190, "stand", { dy: 0.46 }),
      ] }),
      b(22, { props: MEM_14, env: { glory: 0.65 }, cast: [                           // os filhos de Raquel: catorze almas
        C("jaco", -16, "stand", { glow: 0.3, dy: 0.46 }),
        C("mulherComum", 40, "stand", { glow: 0.4, dy: 0.52, facing: -1 }),
        C("pastor", -66, "stand", { dy: 0.56, scale: 0.9 }),
        C("multidao", -206, "stand", { dy: 0.44 }),
      ] }),
      b(23, { env: { night: 0.5, glory: 0.44 }, cast: [                              // DÃ — e o seu único filho: Husim
        C("jaco", 16, "stand", { glow: 0.3, dy: 0.44 }),
        C("homem", -56, "stand", { dy: 0.54, facing: 1 }),
        C("pastor", -96, "stand", { dy: 0.58, scale: 0.9 }),
      ] }),
      b(24, { cast: [                                                                // NAFTALI: Jazeel, Guni, Jezer e Silém
        C("jaco", 14, "stand", { glow: 0.3, dy: 0.44 }),
        C("homem", -50, "stand", { dy: 0.54, facing: 1 }),
        C("multidao", -184, "stand", { dy: 0.46 }),
      ] }),
      b(25, { props: MEM_7, env: { night: 0.62, glory: 0.4 }, cast: [                // BILA, a serva de Raquel: sete almas
        C("jaco", -12, "stand", { glow: 0.3, dy: 0.46 }),
        C("mulherComum", 44, "stand", { dy: 0.56, facing: -1 }),
        C("multidao", -200, "stand", { dy: 0.44 }),
      ] }),
      b(26, { env: { night: 0.2, glory: 0.6 }, cast: [                               // sessenta e seis almas saídas dos lombos de Jacó
        C("jaco", 0, "stand", { glow: 0.4, dy: 0.46 }),
        C("homem", -58, "stand", { glow: 0.4, dy: 0.54, facing: 1 }),
        C("mulherComum", 60, "stand", { dy: 0.56, facing: -1 }),
        C("multidao", -216, "stand", { dy: 0.42 }),
        C("multidao", 210, "stand", { dy: 0.32 }),
      ] }),
      b(27, { props: MEM_70, env: { night: 0.05, glory: 0.8 }, cast: [               // AS SETENTA ALMAS da casa de Jacó — a nação em semente
        C("jaco", 0, "raise", { glow: 0.55, dy: 0.46 }),
        C("jose", 54, "stand", { glow: 0.45, dy: 0.5, facing: -1 }),
        C("pastor", 92, "stand", { dy: 0.56, scale: 0.9, facing: -1 }),
        C("homem", -62, "stand", { glow: 0.4, dy: 0.54, facing: 1 }),
        C("multidao", -220, "raise", { dy: 0.42 }),
        C("multidao", 220, "stand", { dy: 0.3 }),
      ] }),
      b(28, { set: "gosen", props: GOSEN, env: { terrain: "field", night: 0.12, glory: 0.5 }, cast: [ // JUDÁ enviado adiante para encaminhar a Gósen
        C("homem", 92, "walk", { glow: 0.55, dy: 0.5, facing: 1 }),
        C("jaco", -30, "stand", { glow: 0.35, dy: 0.52 }),
        C("multidao", -212, "stand", { dy: 0.44 }),
        C("rebanho", 200, "stand", { dy: 0.32 }),
      ] }),
      b(29, { props: GOSEN_CARRO, env: { glory: 0.8 }, cast: [                       // José SOBE ao encontro do pai: chorou sobre o seu pescoço longo tempo
        C("jaco", -18, "kneel", { glow: 0.4, dy: 0.5, facing: 1 }),
        C("jose", 14, "kneel", { glow: 0.5, dy: 0.5, facing: -1 }),
        C("homem", 78, "stand", { glow: 0.55, dy: 0.54, facing: -1 }),
        C("multidao", -206, "stand", { dy: 0.44 }),
        C("rebanho", 210, "stand", { dy: 0.32 }),
      ] }),
      b(30, { by: "jaco", q: "E Israel disse a José: ", env: { glory: 0.9, night: 0.04 }, cast: [ // "Morra eu agora, pois já tenho visto o teu rosto"
        C("jaco", -22, "raise", { glow: 0.55, dy: 0.5, facing: 1 }),
        C("jose", 20, "stand", { glow: 0.5, dy: 0.48, facing: -1 }),
        C("homem", 80, "stand", { glow: 0.55, dy: 0.54, facing: -1 }),
        C("multidao", -206, "stand", { dy: 0.44 }),
        C("rebanho", 210, "stand", { dy: 0.32 }),
      ] }),
      b(31, { by: "jose", q: "e à casa de seu pai: ", env: { glory: 0.68 }, cast: [  // "Eu subirei e anunciarei a Faraó: vieram a mim!"
        C("jose", 10, "point", { glow: 0.5, dy: 0.44, facing: -1 }),
        C("jaco", 62, "stand", { glow: 0.4, dy: 0.5, facing: -1 }),
        C("homem", -44, "stand", { glow: 0.55, dy: 0.54, facing: 1 }),
        C("multidao", -196, "stand", { dy: 0.44 }),
        C("rebanho", 200, "stand", { dy: 0.32 }),
      ] }),
      b(32, { by: "jose", cast: [                                                    // "os homens são pastores de ovelhas… homens de gado"
        C("jose", 6, "stand", { glow: 0.5, dy: 0.44, facing: -1 }),
        C("jaco", 60, "stand", { glow: 0.4, dy: 0.5, facing: -1 }),
        C("homem", -48, "stand", { glow: 0.55, dy: 0.54, facing: 1 }),
        C("multidao", -200, "stand", { dy: 0.44 }),
        C("rebanho", 150, "stand", { dy: 0.34 }),                                    // as ovelhas e as vacas que trouxeram consigo
      ] }),
      b(33, { by: "jose", env: { glory: 0.62 } }),                                   // "Quando Faraó vos chamar: Qual é o vosso negócio?"
      b(34, { by: "jose", env: { glory: 0.7 }, cast: [                               // "todo o pastor de ovelhas é abominação aos egípcios" — por isso, GÓSEN
        C("jose", 0, "raise", { glow: 0.5, dy: 0.44, facing: -1 }),
        C("jaco", 56, "stand", { glow: 0.4, dy: 0.5, facing: -1 }),
        C("homem", -52, "stand", { glow: 0.55, dy: 0.54, facing: 1 }),
        C("multidao", -204, "stand", { dy: 0.44 }),
        C("rebanho", 120, "stand", { dy: 0.36 }),
      ] }),
    ],
  },
};
