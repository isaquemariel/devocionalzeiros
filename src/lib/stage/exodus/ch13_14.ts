// ============================================================================
// ÊXODO 13–14 — roteiro do modo CENA VIVA (força-tarefa AT, onda Êxodo).
//
// Êx 13 — A CONSAGRAÇÃO E A COLUNA: santifica-se todo primogênito e guarda-se a
// festa dos ázimos; Deus não leva o povo pelo caminho dos filisteus, mas rodeia
// pelo deserto do Mar Vermelho — e vai ADIANTE deles: coluna de nuvem de dia,
// coluna de fogo de noite, que nunca se aparta.
//
// Êx 14 — O MAR VERMELHO: Faraó persegue com seiscentos carros; encurralado
// entre Migdol e o mar, Israel clama. Moisés estende a vara, o mar se fende, e
// o povo passa "em seco" entre muros de água; as águas voltam e cobrem todo o
// exército do Egito. Israel vê a grande mão do Senhor e crê.
//
// A VOZ DE DEUS (regra do projeto): sem mediador visível, Deus fala do céu a
// Moisés — `by: "deus"`, glória no ambiente, SEM figura. A COLUNA de nuvem/fogo
// e o mar entram pelo AMBIENTE (glória/fogo/água/tempestade). O exército do
// Egito são `cavaleiro`; o povo que murmura, `multidao`; Faraó, `farao`.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });

// ---------------------------------------------------------------------------
// O PALÁCIO DE FARAÓ (a corte): o trono e as torres da cidade ao fundo.
const PALACIO: StagePropSpec[] = [
  { ...P("throne", 40, 1.1, undefined, 0.28), tag: "trono-farao" },
  P("tower", 300, 1.3, undefined, 0.06),
  P("tower", 232, 1, undefined, 0.22),
  P("tower", -300, 1.2, undefined, 0.1),
  P("palm", -240, 1.05, undefined, 0.12),
  P("amphora", -120, 0.85, undefined, 0.5),
  P("amphora", 150, 0.8, undefined, 0.55),
];

// ---------------------------------------------------------------------------
// A MARCHA (deserto): a coluna do povo a caminho, com tendas do acampamento e
// as palmeiras esparsas do deserto.
const MARCHA: StagePropSpec[] = [
  P("tent", -250, 1.05, undefined, 0.14),
  P("tent", 250, 1, undefined, 0.16),
  P("palm", 190, 0.9, undefined, 0.18),
  P("rock", -300, 1, undefined, 0.48),
  P("rock", 300, 0.95, undefined, 0.52),
  P("bush", -140, 0.8, undefined, 0.42),
  P("grass", -40, 0.82, undefined, 0.8),
  P("grass", 70, 0.78, undefined, 0.74),
];
// os ossos de José levados na marcha (Êx 13:19)
const MARCHA_OSSOS: StagePropSpec[] = [...MARCHA, { ...P("crate", 40, 0.7, undefined, 0.64), tag: "ossos-jose" }];
// A COLUNA que vai adiante do povo (Êx 13:21-22): de noite, coluna de FOGO
// (o prop 'pillar' com fire=1 arde; sem fire seria a coluna de nuvem do dia).
const MARCHA_COLUNA: StagePropSpec[] = [...MARCHA, { ...P("pillar", 250, 1.05, 1, 0.4), tag: "coluna-nuvem-fogo" }];

// ---------------------------------------------------------------------------
// O MAR VERMELHO (Êx 14): o grande mar ao centro, os rochedos de Pi-Hairote e as
// palmeiras da praia. A parede de água entra pelo AMBIENTE (water alto).
const MAR: StagePropSpec[] = [
  { ...P("river", 0, 1.7, undefined, 0.2), tag: "mar-vermelho" },
  P("palm", -270, 1.05, undefined, 0.12),
  P("palm", 260, 1, undefined, 0.14),
  P("rock", -320, 0.95, undefined, 0.5),
  P("rock", 320, 0.9, undefined, 0.52),
  P("grass", -80, 0.85, undefined, 0.78),
  P("bush", 150, 0.8, undefined, 0.42),
];
// A TRAVESSIA "em seco" (Êx 14:22,29): o chão fica SECO (água baixa no piso) e as
// águas ficam como MURO à direita e à esquerda — dois paredões de água nas bordas.
const MAR_SECO: StagePropSpec[] = [
  { ...P("river", -322, 1.5, undefined, 0.3), tag: "mar-vermelho" }, // muro de água à esquerda
  P("river", 322, 1.5, undefined, 0.3),                             // muro de água à direita
  P("rock", -300, 0.85, undefined, 0.66),
  P("rock", 300, 0.85, undefined, 0.68),
  P("palm", -268, 1, undefined, 0.12),
  P("palm", 268, 1, undefined, 0.14),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Êx 13
  // A santificação dos primogênitos e os ázimos → o rodeio pelo deserto → os
  // ossos de José → e a COLUNA de nuvem e de fogo que guia o povo (fogo+glória).
  13: {
    start: { terrain: "desert", night: 0.24, glory: 0.55, storm: 0, fire: 0, verdure: 0.35 },
    beats: [
      b(1, { set: "marcha", cast: [C("moises", -20, "kneel", { dy: 0.5, facing: 1 })], props: MARCHA, env: { terrain: "desert", glory: 0.7, night: 0.2 } }), // o Senhor fala a Moisés
      b(2, { by: "deus", env: { glory: 0.75 } }), // "santifica-me todo o primogênito entre os filhos de Israel; meu é"
      b(3, { by: "moises", q: "E Moisés disse ao povo: ", cast: [C("moises", -70, "point", { dy: 0.5, facing: 1 }), C("multidao", 40, "stand", { dy: 0.48 }), C("multidao", 140, "stand", { scale: 0.9, dy: 0.52, id: "povo2" })], env: { glory: 0.6 } }), // "Lembrai-vos deste dia em que saístes do Egito; com mão forte o Senhor vos tirou"
      b(4, { by: "moises" }), // "hoje, no mês de Abibe, vós saís"
      b(5, { by: "moises" }), // "quando o Senhor te introduzir na terra que mana leite e mel, guardarás este culto"
      b(6, { by: "moises" }), // "sete dias comerás pães ázimos, e ao sétimo dia haverá festa ao Senhor"
      b(7, { by: "moises" }), // "o levedado não se verá contigo em todos os teus termos"
      b(8, { by: "moises", q: "dizendo: " }), // "Isto é pelo que o Senhor me tem feito, quando saí do Egito"
      b(9, { by: "moises" }), // "te será por sinal sobre tua mão e lembrança entre teus olhos"
      b(10, { by: "moises" }), // "guardarás este estatuto a seu tempo, de ano em ano"
      b(11, { by: "moises" }), // "quando o Senhor te introduzir na terra dos cananeus, como jurou"
      b(12, { by: "moises" }), // "separarás para o Senhor tudo o que abrir a madre; os machos serão do Senhor"
      b(13, { by: "moises" }), // "o primogênito da jumenta resgatarás com um cordeiro; e o do homem resgatarás"
      b(14, { by: "moises", q: "Dir-lhe-ás: " }), // "O Senhor nos tirou com mão forte do Egito, da casa da servidão"
      b(15, { by: "moises" }), // "o Senhor matou os primogênitos do Egito; por isso sacrifico ao Senhor"
      b(16, { by: "moises" }), // "será por sinal sobre tua mão... porque o Senhor com mão forte nos tirou"
      b(17, { cast: [C("moises", -90, "walk", { dy: 0.5, facing: 1 }), C("multidao", 20, "walk", { dy: 0.48 }), C("multidao", 130, "walk", { scale: 0.9, dy: 0.52, id: "povo2" })], env: { glory: 0.5, night: 0.22 } }), // Deus não os leva pelo caminho dos filisteus, para não se arrependerem
      b(18, { env: { glory: 0.55 } }), // Deus faz o povo rodear pelo deserto do Mar Vermelho; armados subiram
      b(19, { cast: [C("moises", -70, "stand", { dy: 0.5, facing: 1 }), C("multidao", 60, "walk", { dy: 0.48 })], props: MARCHA_OSSOS, env: { glory: 0.6 } }), // Moisés leva os ossos de José, conforme o juramento
      b(20, { set: "etã", cast: [C("multidao", 20, "stand", { dy: 0.48 }), C("multidao", 130, "stand", { scale: 0.9, dy: 0.52, id: "povo2" }), C("moises", -90, "stand", { dy: 0.5, facing: 1 })], props: MARCHA, env: { terrain: "desert", glory: 0.5, night: 0.3 } }), // partem de Sucote e acampam em Etã, à entrada do deserto
      b(21, { set: "coluna", props: MARCHA_COLUNA, cast: [C("moises", -100, "stand", { dy: 0.5, facing: 1 }), C("multidao", 20, "walk", { dy: 0.48 }), C("multidao", 130, "walk", { scale: 0.9, dy: 0.52, id: "povo2" })], env: { glory: 0.7, fire: 0.7, night: 0.5 } }), // o Senhor vai adiante: coluna de nuvem de dia, coluna de fogo de noite
      b(22, { props: MARCHA_COLUNA, env: { glory: 0.72, fire: 0.72, night: 0.45 } }), // nunca se aparta do povo a coluna de nuvem, nem a coluna de fogo
    ],
  },

  // ------------------------------------------------------------------ Êx 14
  // O cerco junto ao mar → o clamor e a promessa ("o Senhor pelejará por vós") →
  // a coluna entre os campos → o mar que se fende → a travessia em seco → e as
  // águas que voltam sobre o Egito: Israel salvo, e crê no Senhor.
  14: {
    start: { terrain: "desert", night: 0.35, glory: 0.55, storm: 0, fire: 0.4, water: 0.3, verdure: 0.2 },
    beats: [
      b(1, { set: "mar", cast: [C("moises", -20, "kneel", { dy: 0.5, facing: 1 })], props: MAR, env: { terrain: "desert", glory: 0.65, night: 0.3, water: 0.45 } }), // o Senhor fala a Moisés
      b(2, { by: "deus", env: { glory: 0.68 } }), // "acampem-se diante de Pi-Hairote, entre Migdol e o mar"
      b(3, { by: "deus" }), // "Faraó dirá: Estão embaraçados na terra, o deserto os encerrou"
      b(4, { by: "deus", env: { glory: 0.7, fire: 0.4 } }), // "endurecerei o coração de Faraó... e serei glorificado nele"
      b(5, { by: "farao", q: "e disseram: ", set: "palacio", cast: [C("farao", 90, "point", { dy: 0.44, facing: -1 }), C("homem", 20, "stand", { dy: 0.5, id: "servo", facing: 1 })], props: PALACIO, env: { terrain: "city", glory: 0.2, night: 0.24, water: 0, fire: 0 } }), // "Por que fizemos isso, havendo deixado ir a Israel?"
      b(6, { cast: [C("farao", -40, "stand", { dy: 0.46, facing: 1 }), C("cavaleiro", 60, "stand", { dy: 0.5, facing: -1 })], env: { storm: 0.2 } }), // Faraó apronta o carro e toma consigo o seu povo
      b(7, { cast: [C("cavaleiro", 30, "stand", { dy: 0.5 }), C("cavaleiro", 110, "stand", { scale: 0.9, dy: 0.46, id: "carro2", facing: 1 }), C("farao", -50, "stand", { dy: 0.46, facing: 1 })], env: { storm: 0.35, night: 0.28 } }), // seiscentos carros escolhidos, e capitães sobre todos
      b(8, { env: { storm: 0.3 } }), // o Senhor endurece Faraó; Israel, porém, saiu com alta mão
      b(9, { set: "mar", cast: [C("multidao", -120, "stand", { dy: 0.5 }), C("multidao", -40, "stand", { scale: 0.9, dy: 0.54, id: "povo2" }), C("cavaleiro", 150, "walk", { dy: 0.46, facing: -1 }), C("cavaleiro", 240, "walk", { scale: 0.85, dy: 0.42, id: "carro2", facing: -1 })], props: MAR, env: { terrain: "desert", storm: 0.4, night: 0.4, water: 0.5, glory: 0.35 } }), // os egípcios os perseguem e os alcançam acampados junto ao mar
      b(10, { cast: [C("multidao", -120, "bow", { dy: 0.52 }), C("multidao", -40, "kneel", { scale: 0.9, dy: 0.56, id: "povo2" }), C("cavaleiro", 170, "stand", { dy: 0.46, facing: -1 }), C("moises", -200, "stand", { dy: 0.5, facing: 1 })], env: { storm: 0.5, night: 0.5, glory: 0.3 } }), // Israel vê os egípcios atrás, teme muito e clama ao Senhor
      b(11, { by: "multidao", q: "E disseram a Moisés: ", cast: [C("multidao", -60, "point", { dy: 0.52 }), C("moises", -170, "stand", { dy: 0.5, facing: 1 }), C("cavaleiro", 180, "stand", { dy: 0.46, facing: -1 })], env: { storm: 0.45 } }), // "Não havia sepulcros no Egito? Por que nos fizeste sair para morrer no deserto?"
      b(12, { by: "multidao" }), // "melhor nos fora servir aos egípcios do que morrer no deserto"
      b(13, { by: "moises", q: "Moisés, porém, disse ao povo: ", cast: [C("moises", -150, "raise", { dy: 0.5, facing: 1 }), C("multidao", -40, "stand", { dy: 0.5 }), C("multidao", 40, "stand", { scale: 0.9, dy: 0.54, id: "povo2" })], env: { glory: 0.45 } }), // "Não temais; estai quietos, e vede o livramento do Senhor"
      b(14, { by: "moises", env: { glory: 0.55 } }), // "O Senhor pelejará por vós, e vós vos calareis"
      b(15, { by: "deus", q: "Então disse o Senhor a Moisés: ", env: { glory: 0.6 } }), // "Por que clamas a mim? Dize aos filhos de Israel que marchem"
      b(16, { by: "deus", cast: [C("moises", -150, "point", { dy: 0.5, facing: -1 }), C("multidao", -40, "stand", { dy: 0.5 })], env: { glory: 0.62 } }), // "levanta a tua vara e estende a mão sobre o mar, e fende-o"
      b(17, { by: "deus", env: { glory: 0.6, fire: 0.4 } }), // "endurecerei o coração dos egípcios... e serei glorificado em Faraó"
      b(18, { by: "deus" }), // "os egípcios saberão que eu sou o Senhor, quando for glorificado"
      b(19, { props: [...MAR, { ...P("pillar", 120, 1.05, 1, 0.42), tag: "coluna-nuvem-fogo" }], cast: [C("multidao", -60, "stand", { dy: 0.5 }), C("multidao", 30, "stand", { scale: 0.9, dy: 0.54, id: "povo2" }), C("cavaleiro", 220, "stand", { dy: 0.44, facing: -1 })], env: { glory: 0.55, fire: 0.5, night: 0.45 } }), // o anjo de Deus e a coluna de nuvem se retiram e vão atrás de Israel
      b(20, { props: [...MAR, { ...P("pillar", 120, 1.05, 1, 0.42), tag: "coluna-nuvem-fogo" }], env: { glory: 0.5, fire: 0.55, night: 0.6, storm: 0.2 } }), // a nuvem é trevas aos egípcios e luz a Israel; não se aproximam a noite toda
      b(21, { set: "mar-seco", cast: [C("moises", -170, "raise", { dy: 0.5, facing: -1 }), C("multidao", -50, "stand", { dy: 0.62 })], props: MAR_SECO, env: { terrain: "desert", water: 0.28, storm: 0.85, night: 0.5, glory: 0.4, fire: 0.4 } }), // Moisés estende a mão; o vento oriental parte o mar, e ele se torna em seco
      b(22, { cast: [C("moises", -40, "walk", { dy: 0.62, facing: 1 }), C("multidao", 60, "walk", { dy: 0.6 }), C("multidao", 160, "walk", { scale: 0.9, dy: 0.66, id: "povo2" })], env: { water: 0.14, storm: 0.35, glory: 0.55, night: 0.4 } }), // Israel entra pelo meio do mar em seco; as águas, muro à direita e à esquerda
      b(23, { cast: [C("cavaleiro", -120, "walk", { dy: 0.6, facing: 1 }), C("cavaleiro", -30, "walk", { scale: 0.9, dy: 0.64, id: "carro2", facing: 1 }), C("multidao", 170, "walk", { scale: 0.9, dy: 0.66, id: "povo2" })], env: { water: 0.16, storm: 0.55, night: 0.55, glory: 0.35 } }), // os egípcios entram atrás deles, todos os carros de Faraó, até ao meio do mar
      b(24, { props: [...MAR_SECO, { ...P("pillar", -140, 1.1, 1, 0.4), tag: "coluna-nuvem-fogo" }], cast: [C("cavaleiro", -60, "stand", { dy: 0.6 }), C("cavaleiro", 30, "bow", { scale: 0.9, dy: 0.64, id: "carro2" })], env: { fire: 0.8, glory: 0.6, storm: 0.7, night: 0.5, water: 0.18 } }), // na vigília da manhã, o Senhor na coluna de fogo alvoroça o campo dos egípcios
      b(25, { by: "cavaleiro", q: "Então disseram os egípcios: ", cast: [C("cavaleiro", -60, "bow", { dy: 0.6 }), C("cavaleiro", 40, "kneel", { scale: 0.9, dy: 0.66, id: "carro2" })], env: { storm: 0.8, water: 0.22, glory: 0.55, fire: 0.6 } }), // tira as rodas dos carros: "Fujamos de Israel, porque o Senhor peleja por eles"
      b(26, { by: "deus", q: "E disse o Senhor a Moisés: ", cast: [C("moises", -170, "raise", { dy: 0.5, facing: -1 })], env: { glory: 0.6, water: 0.45, storm: 0.6 } }), // "Estende a tua mão sobre o mar, para que as águas tornem sobre os egípcios"
      b(27, { set: "mar", cast: [C("moises", -170, "point", { dy: 0.5, facing: -1 }), C("cavaleiro", 20, "lie", { dy: 0.5 }), C("cavaleiro", 110, "lie", { scale: 0.9, dy: 0.46, id: "carro2" })], props: MAR, env: { terrain: "desert", water: 1, storm: 0.9, night: 0.4, glory: 0.5 } }), // Moisés estende a mão; o mar retorna e o Senhor derruba os egípcios
      b(28, { cast: [C("cavaleiro", 20, "lie", { dy: 0.52 }), C("cavaleiro", 120, "lie", { scale: 0.9, dy: 0.48, id: "carro2" })], env: { water: 1, storm: 0.6, night: 0.35 } }), // as águas cobrem os carros e cavaleiros; nenhum deles fica
      b(29, { set: "mar-seco", cast: [C("multidao", -60, "stand", { dy: 0.62 }), C("multidao", 40, "stand", { scale: 0.9, dy: 0.66, id: "povo2" }), C("moises", -160, "stand", { dy: 0.6, facing: 1 })], props: MAR_SECO, env: { terrain: "desert", water: 0.16, storm: 0.2, glory: 0.7, night: 0.2 } }), // mas Israel foi pelo meio do mar em seco, muro à direita e à esquerda
      b(30, { set: "praia", cast: [C("multidao", -40, "stand", { dy: 0.5 }), C("cavaleiro", 130, "lie", { dy: 0.56 }), C("moises", -140, "stand", { dy: 0.5, facing: 1 })], props: MAR, env: { terrain: "desert", water: 0.4, storm: 0.1, glory: 0.75 } }), // o Senhor salva Israel; e Israel vê os egípcios mortos na praia
      b(31, { cast: [C("moises", -140, "stand", { dy: 0.5, facing: 1 }), C("multidao", -20, "bow", { dy: 0.5 }), C("multidao", 80, "bow", { scale: 0.9, dy: 0.54, id: "povo2" })], env: { glory: 0.9, night: 0.12, water: 0.35 } }), // Israel teme ao Senhor e crê no Senhor e em Moisés, seu servo
    ],
  },
};
