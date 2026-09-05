// ============================================================================
// ÊXODO 3–4 — roteiro do modo CENA VIVA (força-tarefa AT, onda Êxodo).
//
// Êx 3 — A SARÇA ARDENTE: no monte de Deus, Horebe, o Anjo do SENHOR aparece
// "em uma chama de fogo do meio duma sarça" — e a sarça arde sem se consumir.
// Dali vem o Nome: EU SOU O QUE SOU. É o chamado de Moisés para tirar o povo
// do Egito, "a uma terra que mana leite e mel".
//
// Êx 4 — OS SINAIS E A VOLTA: a vara que vira cobra, a mão leprosa e sã, a
// água que vira sangue; a resistência de Moisés e o dom de Arão por boca;
// a estrada de volta ao Egito e o encontro dos dois irmãos no monte de Deus.
//
// A VOZ DE DEUS (regra do projeto): NA SARÇA o mediador é o PRÓPRIO OBJETO — a
// sarça que arde no fogo sem se consumir. Deus não é desenhado como figura: a
// chama verde-e-ouro domina o ambiente e o balão (`by: "anjo"`) sai dela, "do
// meio da sarça" (Êx 3–4:1-17). Fora do monte, sem mediador (a estrada de
// Midiã, Êx 4:19-27), volta a VOZ DO CÉU: `by: "deus"` com glória, sem figura.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });

// ---------------------------------------------------------------------------
// HOREBE — o monte de Deus (Êx 3): rochas grandes, uma árvore retorcida contra
// o céu, mato ralo. (corredor de extras dx -110..-200 LIVRE)
const HOREBE: StagePropSpec[] = [
  P("rock", -284, 1.15, undefined, 0.45),
  P("rock", 300, 1.1, undefined, 0.5),
  P("rock", 66, 0.6, undefined, 0.74),
  P("tree", 250, 0.85, undefined, 0.1),
  P("grass", -44, 0.8, undefined, 0.82),
  P("grass", 128, 0.75, undefined, 0.7),
  P("bush", -318, 0.8, undefined, 0.6),
];
// A SARÇA ARDENTE (Êx 3:2): a moita que arde no fogo sem se consumir — objeto
// central da cena, com o traço do fogo dominando o ambiente.
// A SARÇA É O MEDIADOR DA VOZ — o balão é `by:"deus"` (sem figura) e quem
// carrega a fala no quadro é o fogo. No tamanho natural ela lia-se como um
// arbusto qualquer ao lado de Moisés; tem de dominar.
const HOREBE_SARCA: StagePropSpec[] = [...HOREBE, { ...P("bush", -40, 3.1, 1, 0.62), tag: "sarca-ardente" }];

// ---------------------------------------------------------------------------
// MIDIÃ / A ESTRADA (Êx 4): o deserto de volta ao Egito e a estalagem no
// caminho.
const MIDIA: StagePropSpec[] = [
  P("tent", 190, 1.05, undefined, 0.14),      // a casa de Jetro
  P("palm", -258, 1.1, undefined, 0.12),
  P("palm", 250, 1, undefined, 0.14),
  P("rock", 300, 0.9, undefined, 0.55),
  P("rock", -300, 0.9, undefined, 0.5),
  P("bush", 150, 0.8, undefined, 0.42),
  P("grass", 60, 0.85, undefined, 0.8),
];
const ESTRADA: StagePropSpec[] = [
  P("rock", -280, 1.1, undefined, 0.45),
  P("rock", 296, 1, undefined, 0.52),
  P("palm", 210, 0.9, undefined, 0.16),
  P("bush", -150, 0.8, undefined, 0.4),
  P("grass", -30, 0.8, undefined, 0.82),
  P("grass", 120, 0.75, undefined, 0.72),
];
// a estalagem no caminho (Êx 4:24)
const ESTALAGEM: StagePropSpec[] = [...ESTRADA, P("tent", 40, 1.1, undefined, 0.36), P("campfire", -70, 1, 1, 0.5)];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Êx 3
  // O rebanho leva Moisés ao monte → a sarça arde (fogo + glória súbitos, o
  // Anjo na chama) → o Nome se revela (glória MÁXIMA em EU SOU) → o chamado.
  3: {
    start: { terrain: "desert", night: 0.2, glory: 0.15, storm: 0, fire: 0, verdure: 0.2 },
    beats: [
      b(1, { cast: [C("moises", -30, "walk", { dy: 0.5, facing: 1 }), C("rebanho", 180, "stand", { dy: 0.42 }), C("rebanho", 250, "stand", { scale: 0.7, dy: 0.5, id: "rebanho2" })], props: HOREBE, env: { glory: 0.2 } }), // apascenta o rebanho de Jetro; chega a Horebe
      b(2, { cast: [C("moises", 90, "stand", { dy: 0.5, facing: -1 }), C("rebanho", 210, "stand", { dy: 0.42 })], props: HOREBE_SARCA, env: { fire: 0.7, glory: 0.7, night: 0.28 } }), // o Anjo do SENHOR na chama: a sarça arde sem se consumir
      b(3, { by: "moises", q: "E Moisés disse: ", cast: [C("moises", 40, "point", { dy: 0.5, facing: -1 })], env: { fire: 0.75, glory: 0.75 } }), // "verei esta grande visão, porque a sarça não se queima"
      b(4, { cast: [C("moises", 30, "stand", { dy: 0.5, facing: -1 })], env: { fire: 0.85, glory: 0.9 } }), // Deus o chama do meio da sarça: "Moisés, Moisés"
      b(5, { by: "deus", q: "E disse: ", cast: [C("moises", 30, "bow", { dy: 0.5, facing: -1 })], env: { glory: 0.9 } }), // "tira os sapatos de teus pés; é terra santa"
      b(6, { by: "deus", q: "Disse mais: ", cast: [C("moises", 30, "kneel", { dy: 0.5, facing: -1 })], env: { glory: 0.95, fire: 0.8 } }), // "Eu sou o Deus de teu pai" — Moisés encobre o rosto
      b(7, { by: "deus", q: "E disse o Senhor: ", cast: [C("moises", 30, "kneel", { dy: 0.5, facing: -1 })] , env: { glory: 0.9 } }), // "Tenho visto a aflição do meu povo no Egito"
      b(8, { by: "deus", env: { glory: 1.0 } }), // "desci para livrá-lo... terra que mana leite e mel"
      b(9, { by: "deus" , env: { glory: 0.9 } }), // "o clamor dos filhos de Israel é vindo a mim"
      b(10, { by: "deus", cast: [C("moises", 30, "kneel", { dy: 0.5, facing: -1 })], env: { glory: 0.95 } }), // "eu te enviarei a Faraó para que tires o meu povo"
      b(11, { by: "moises", q: "Então Moisés disse a Deus: ", cast: [C("moises", 40, "stand", { dy: 0.5, facing: -1 })] }), // "Quem sou eu, que vá a Faraó?"
      b(12, { by: "deus", q: "E disse: ", env: { glory: 1.0 } }), // "Certamente eu serei contigo; e isto te será por sinal"
      b(13, { by: "moises", q: "Então disse Moisés a Deus: ", cast: [C("moises", 40, "stand", { dy: 0.5, facing: -1 })] }), // "Qual é o seu nome? Que lhes direi?"
      b(14, { by: "deus", q: "E disse Deus a Moisés: ", env: { glory: 1.0, fire: 0.9 } }), // "EU SOU O QUE SOU"
      b(15, { by: "deus", q: "E Deus disse mais a Moisés: Assim dirás aos filhos de Israel: ", env: { glory: 1.0 } }), // "O Senhor Deus de vossos pais... este é meu nome eternamente"
      b(16, { by: "deus", cast: [C("moises", 40, "stand", { dy: 0.5, facing: -1 })] , env: { glory: 0.9 } }), // "ajunta os anciãos de Israel e dize-lhes"
      b(17, { by: "deus" , env: { glory: 0.9 } }), // "Far-vos-ei subir da aflição do Egito"
      b(18, { by: "deus" , env: { glory: 0.9 } }), // "irás ao rei do Egito: deixa-nos ir caminho de três dias"
      b(19, { by: "deus", env: { glory: 0.9 } }), // "o rei do Egito não vos deixará ir, nem por mão forte"
      b(20, { by: "deus", env: { glory: 0.9, fire: 0.85 } }), // "ferirei ao Egito com todas as minhas maravilhas"
      b(21, { by: "deus", env: { glory: 0.95 } }), // "darei graça a este povo aos olhos dos egípcios"
      b(22, { by: "deus", env: { glory: 1.0 } }), // "despojareis os egípcios" — a promessa da saída
    ],
  },

  // ------------------------------------------------------------------ Êx 4
  // Os SINAIS no monte (a vara-cobra, a mão leprosa) → a relutância e o dom de
  // Arão → a estrada de volta (VOZ DO CÉU, sem a sarça) → o encontro dos irmãos
  // e o povo que crê e adora (glória).
  4: {
    start: { terrain: "desert", night: 0.22, glory: 0.7, storm: 0, fire: 0.6, verdure: 0.2 },
    beats: [
      b(1, { by: "moises", q: "e disse: ", cast: [C("moises", 40, "stand", { dy: 0.5, facing: -1 })], props: HOREBE_SARCA, env: { glory: 0.7, fire: 0.6 } }), // "eis que não me crerão... O SENHOR não te apareceu"
      b(2, { cast: [C("moises", 40, "point", { dy: 0.5, facing: -1 })], env: { glory: 0.8 } }), // "Que é isso na tua mão? Uma vara"
      b(3, { cast: [C("moises", 80, "walk", { dy: 0.5, facing: 1 })], env: { glory: 0.7, storm: 0.15 } }), // lançou a vara: virou cobra, e Moisés fugia dela
      b(4, { cast: [C("moises", 30, "raise", { dy: 0.5, facing: -1 })], env: { glory: 0.85, storm: 0 } }), // pegou-lhe pela cauda: tornou-se em vara na sua mão
      b(5, { by: "deus", env: { glory: 0.95 } }), // "para que creiam que te apareceu o Senhor Deus de seus pais"
      b(6, { cast: [C("moises", 30, "raise", { dy: 0.5, facing: -1 })], env: { glory: 0.8, fire: 0.5 } }), // a mão no seio: sai leprosa, branca como a neve
      b(7, { cast: [C("moises", 30, "stand", { dy: 0.5, facing: -1 })], env: { glory: 0.9 } }), // torna a pôr: a mão volta sã como a sua carne
      b(8, { by: "deus" , env: { glory: 0.9 } }), // "crerão à voz do derradeiro sinal"
      b(9, { by: "deus", env: { glory: 0.9, fire: 0.6, storm: 0.1 } }), // "as águas do rio se tornarão em sangue sobre a terra seca"
      b(10, { by: "moises", q: "Então disse Moisés ao Senhor: ", cast: [C("moises", 40, "bow", { dy: 0.5, facing: -1 })], env: { storm: 0, glory: 0.8 } }), // "não sou homem eloqüente... pesado de boca e de língua"
      b(11, { by: "deus", q: "E disse-lhe o Senhor: ", env: { glory: 0.9 } }), // "Quem fez a boca do homem? Não sou eu, o Senhor?"
      b(12, { by: "deus" , env: { glory: 0.9 } }), // "eu serei com a tua boca e te ensinarei o que hás de falar"
      b(13, { by: "moises", q: "Ele, porém, disse: ", cast: [C("moises", 40, "bow", { dy: 0.5, facing: -1 })] }), // "Envia pela mão daquele a quem tu hás de enviar"
      b(14, { by: "deus", q: "contra Moisés, e disse: ", env: { fire: 0.95, glory: 0.9 } }), // a ira do Senhor: "Não é Arão, o levita, teu irmão?"
      b(15, { by: "deus", env: { glory: 0.9, fire: 0.7 } }), // "porás as palavras na sua boca; eu serei com a tua boca e a dele"
      b(16, { by: "deus" , env: { glory: 0.9 } }), // "ele te será por boca, e tu lhe serás por Deus"
      b(17, { by: "deus", cast: [C("moises", 40, "raise", { dy: 0.5, facing: -1 })], env: { glory: 0.9 } }), // "Toma esta vara na tua mão, com que farás os sinais"
      b(18, { by: "homem", q: "Disse, pois, Jetro a Moisés: ", set: "midia", cast: [C("moises", -40, "stand", { dy: 0.5, facing: 1 }), C("homem", 40, "stand", { dy: 0.5, id: "jetro", facing: -1 })], props: MIDIA, env: { terrain: "desert", fire: 0, glory: 0.4, night: 0.15 } }), // Moisés volta a Jetro: "Vai em paz"
      b(19, { by: "deus", q: "a Moisés em Midiã: ", cast: [C("moises", -20, "stand", { dy: 0.5 })], env: { glory: 0.9, night: 0.1 } }), // VOZ DO CÉU: "Vai, volta para o Egito; morreram os que buscavam a tua alma"
      b(20, { set: "estrada", cast: [C("moises", -40, "walk", { dy: 0.5, facing: 1 }), C("mulherComum", 24, "walk", { dy: 0.54, id: "zipora" }), C("homem", 70, "walk", { scale: 0.55, dy: 0.6, id: "gerson" })], props: ESTRADA, env: { terrain: "desert", glory: 0.4, night: 0.12 } }), // a mulher e os filhos sobre um jumento; a vara de Deus na mão
      b(21, { by: "deus", q: "E disse o Senhor a Moisés: ", env: { glory: 0.9 } }), // "faças diante de Faraó todas as maravilhas... endurecerei o coração"
      b(22, { by: "deus", q: "Assim diz o Senhor: ", env: { glory: 0.9 } }), // "Israel é meu filho, meu primogênito"
      b(23, { by: "deus", q: "E eu te tenho dito: ", env: { glory: 0.9 } }), // "Deixa ir o meu filho... matarei a teu filho, o primogênito"
      b(24, { set: "estalagem", cast: [C("moises", -20, "lie", { dy: 0.5 }), C("mulherComum", 30, "kneel", { dy: 0.54, id: "zipora", facing: -1 })], props: ESTALAGEM, env: { night: 0.55, storm: 0.35, glory: 0.15, fire: 0.4 } }), // na estalagem, o Senhor o encontrou e o quis matar
      b(25, { by: "mulherComum", q: "e disse: ", cast: [C("mulherComum", 10, "kneel", { dy: 0.52, id: "zipora", facing: 1 }), C("moises", -40, "lie", { dy: 0.5 }), C("homem", 46, "lie", { scale: 0.55, dy: 0.6, id: "gerson" })], env: { storm: 0.15, glory: 0.35 } }), // Zípora circuncida o filho: "esposo sanguinário"
      b(26, { by: "mulherComum", q: "Então ela disse: ", cast: [C("mulherComum", 10, "stand", { dy: 0.52, id: "zipora" }), C("moises", -40, "stand", { dy: 0.5 })], env: { storm: 0, night: 0.3, glory: 0.5 } }), // "Esposo sanguinário, por causa da circuncisão"
      b(27, { by: "deus", q: "Disse o Senhor a Arão: ", set: "monte-encontro", cast: [C("moises", -50, "stand", { dy: 0.5, facing: 1 }), C("arao", 20, "walk", { dy: 0.5, facing: -1 })], props: HOREBE, env: { terrain: "desert", night: 0.2, glory: 0.9 } }), // "Vai ao encontro de Moisés" — os irmãos se encontram no monte
      b(28, { cast: [C("moises", -40, "point", { dy: 0.5, facing: 1 }), C("arao", 24, "stand", { dy: 0.5, facing: -1 })], env: { glory: 0.65 } }), // Moisés relata a Arão as palavras e os sinais do Senhor
      b(29, { set: "diante-do-povo", cast: [C("moises", -70, "stand", { dy: 0.5 }), C("arao", -24, "stand", { dy: 0.5 }), C("multidao", 100, "stand", { dy: 0.44 })], props: [P("tent", 220, 1.05, undefined, 0.14), P("tent", -220, 0.9, undefined, 0.3), P("palm", 280, 1, undefined, 0.12), P("grass", 40, 0.85, undefined, 0.8), P("rock", -300, 0.85, undefined, 0.5)], env: { terrain: "city", night: 0.15, glory: 0.5, verdure: 0.45 } }), // Moisés e Arão ajuntam os anciãos de Israel
      b(30, { cast: [C("arao", -30, "raise", { dy: 0.5, facing: 1 }), C("moises", -90, "stand", { dy: 0.5 }), C("multidao", 100, "stand", { dy: 0.44 })], env: { glory: 0.65 } }), // Arão fala e faz os sinais diante do povo
      b(31, { cast: [C("arao", -30, "stand", { dy: 0.5 }), C("moises", -90, "stand", { dy: 0.5 }), C("multidao", 100, "bow", { dy: 0.44 })], env: { glory: 0.9, night: 0.08 } }), // o povo creu; inclinaram-se e adoraram
    ],
  },
};
