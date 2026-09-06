// ============================================================================
// ÊXODO 7–8 — roteiro do modo CENA VIVA (força-tarefa AT, onda Êxodo).
//
// Êx 7 — A VARA E O SANGUE: Deus põe Moisés "por deus sobre Faraó" e Arão por
// profeta. A vara de Arão vira serpente e traga as varas dos magos; o coração de
// Faraó se endurece. À beira do Nilo, a vara fere as águas e TODO o rio se torna
// em sangue — a primeira praga (sete dias).
//
// Êx 8 — RÃS, PIOLHOS E MOSCAS: o rio verte rãs que cobrem a terra; Faraó pede
// oração e endurece de novo. O pó da terra vira piolhos e os magos confessam:
// "Isto é o dedo de Deus". Enxames de moscas enchem o Egito, mas Gósen fica
// separada — e Faraó, aliviado, torna a endurecer o coração.
//
// A VOZ DE DEUS (regra do projeto): sem mediador visível, Deus fala do céu a
// Moisés — `by: "deus"`, glória no ambiente, SEM figura. As pragas não têm prop
// próprio: entram pelo AMBIENTE (água/tempestade sobre o rio, o pó e os enxames)
// e pela reação do elenco. Faraó fala com `by: "farao"`; magos com `by: "homem"`.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });

// ---------------------------------------------------------------------------
// O PALÁCIO DE FARAÓ (a corte): o trono ao centro e as torres da cidade ao
// fundo. (corredor de extras dx -110..-200 LIVRE)
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
// O NILO (a beira do rio): o grande rio ao centro, os juncos da margem e as
// palmeiras. É onde a vara fere as águas (sangue) e onde sobem as rãs.
const RIO: StagePropSpec[] = [
  P("river", 0, 1.5, undefined, 0.22),
  P("palm", -256, 1.1, undefined, 0.12),
  P("palm", 244, 1.05, undefined, 0.12),
  P("grass", -120, 1.05, undefined, 0.68),
  P("grass", 120, 1, undefined, 0.72),
  P("bush", 200, 0.8, undefined, 0.4),
  P("rock", -300, 0.9, undefined, 0.5),
];

// ---------------------------------------------------------------------------
// O EGITO (cidade): as torres, as tendas e as palmeiras — onde caem as pragas
// do pó (piolhos) e dos enxames (moscas).
const EGITO: StagePropSpec[] = [
  P("tower", 300, 1.35, undefined, 0.05),
  P("tower", 232, 1, undefined, 0.24),
  P("tent", -206, 1.05, undefined, 0.14),
  P("tent", -288, 0.85, undefined, 0.32),
  P("palm", 250, 1.1, undefined, 0.1),
  P("palm", 190, 0.85, undefined, 0.28),
  P("well", -150, 1, undefined, 0.2),
  P("grass", -60, 0.9, undefined, 0.8),
  P("grass", 60, 0.85, undefined, 0.76),
  P("rock", 332, 0.8, undefined, 0.52),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Êx 7
  // O envio (Moisés "por deus sobre Faraó") → a vara-serpente que traga as dos
  // magos → o coração endurecido → e o Nilo ferido: TODO o rio em sangue, os
  // peixes mortos, os egípcios cavando poços (a primeira praga, sete dias).
  7: {
    start: { terrain: "city", night: 0.16, glory: 0.6, storm: 0, fire: 0, verdure: 0.4 },
    beats: [
      b(1, { by: "deus", q: "Então disse o SENHOR a Moisés: ", set: "envio", cast: [C("moises", -40, "stand", { dy: 0.5, facing: 1 }), C("arao", 20, "stand", { dy: 0.5, facing: -1 })], props: EGITO, env: { terrain: "city", glory: 0.7, night: 0.12 } }), // "te tenho posto por deus sobre Faraó, e Arão será o teu profeta"
      b(2, { by: "deus", env: { glory: 0.75 } }), // "tu falarás tudo o que eu te mandar; e Arão falará a Faraó"
      b(3, { by: "deus", env: { glory: 0.7, fire: 0.25, storm: 0.15 } }), // "endurecerei o coração de Faraó, e multiplicarei os meus sinais e maravilhas"
      b(4, { by: "deus", env: { glory: 0.72, storm: 0.2 } }), // "porei minha mão sobre o Egito, e tirarei meus exércitos... com grandes juízos"
      b(5, { by: "deus", env: { glory: 0.8, storm: 0.1, fire: 0.15 } }), // "os egípcios saberão que eu sou o Senhor, quando estender a minha mão"
      b(6, { cast: [C("moises", -40, "stand", { dy: 0.5, facing: 1 }), C("arao", 20, "raise", { dy: 0.5, facing: -1 })], env: { glory: 0.6, storm: 0, fire: 0 } }), // assim fizeram Moisés e Arão, como o Senhor lhes ordenara
      b(7, { cast: [C("moises", -40, "stand", { dy: 0.5, facing: 1 }), C("arao", 20, "stand", { dy: 0.5, facing: -1 })], env: { glory: 0.5, night: 0.14 } }), // Moisés de oitenta anos, Arão de oitenta e três
      b(8, { cast: [C("moises", -20, "kneel", { dy: 0.5, facing: 1 })], env: { glory: 0.65 } }), // o Senhor falou a Moisés e a Arão
      b(9, { by: "deus", env: { glory: 0.7 } }), // "dirás a Arão: Toma a tua vara, e lança-a diante de Faraó; e se tornará em serpente"
      b(10, { set: "palacio", props: [...PALACIO, { ...P("serpent", 12, 1.05, undefined, 0.56), tag: "vara-serpente" }], cast: [C("farao", 90, "stand", { dy: 0.44, facing: -1 }), C("arao", -20, "raise", { dy: 0.5, facing: 1 }), C("moises", -80, "stand", { dy: 0.5, facing: 1 })], env: { terrain: "city", glory: 0.4, night: 0.12, storm: 0.2 } }), // Arão lança a vara diante de Faraó: torna-se em serpente
      b(11, { props: [...PALACIO, { ...P("serpent", -30, 1.0, undefined, 0.56), tag: "vara-serpente" }, P("serpent", 60, 0.9, undefined, 0.6), P("serpent", 150, 0.9, undefined, 0.52)], cast: [C("farao", 90, "point", { dy: 0.44, facing: -1 }), C("homem", 40, "raise", { dy: 0.5, id: "mago", facing: 1 }), C("homem", 130, "stand", { dy: 0.52, id: "mago2", facing: 1 }), C("arao", -60, "stand", { dy: 0.5, facing: -1 })], env: { storm: 0.28, glory: 0.25 } }), // Faraó chama os sábios e magos, que fazem o mesmo com seus encantamentos
      b(12, { props: [...PALACIO, { ...P("serpent", 20, 1.35, undefined, 0.58), tag: "vara-serpente" }], cast: [C("arao", -50, "raise", { dy: 0.5, facing: -1 }), C("homem", 40, "bow", { dy: 0.5, id: "mago", facing: 1 }), C("homem", 130, "bow", { dy: 0.52, id: "mago2", facing: 1 }), C("farao", 90, "stand", { dy: 0.44, facing: -1 })], env: { storm: 0.35, glory: 0.5 } }), // as varas viram serpentes, mas a vara de Arão traga as deles
      b(13, { cast: [C("farao", 90, "point", { dy: 0.44, facing: -1 }), C("arao", -50, "stand", { dy: 0.5, facing: 1 }), C("moises", -110, "stand", { dy: 0.5, facing: 1 })], env: { storm: 0.15, night: 0.3, glory: 0.15 } }), // o coração de Faraó se endurece, e não os ouve
      b(14, { by: "deus", q: "Então disse o Senhor a Moisés: ", cast: [C("moises", -10, "kneel", { dy: 0.5, facing: 1 })], props: EGITO, env: { terrain: "city", storm: 0, night: 0.18, glory: 0.6 } }), // "O coração de Faraó está endurecido, recusa deixar ir o povo"
      b(15, { by: "deus", set: "rio", cast: [C("moises", -60, "walk", { dy: 0.5, facing: 1 }), C("arao", -110, "walk", { dy: 0.5, facing: 1 })], props: RIO, env: { terrain: "city", glory: 0.6, night: 0.1, water: 0.4 } }), // "Vai pela manhã a Faraó, que sairá às águas; toma a vara que se tornou em cobra"
      b(16, { by: "deus", cast: [C("moises", -60, "stand", { dy: 0.5, facing: 1 }), C("arao", -110, "stand", { dy: 0.5, facing: 1 }), C("farao", 120, "stand", { dy: 0.46, facing: -1 })], env: { glory: 0.62 } }), // "O Senhor Deus dos hebreus me enviou a ti: Deixa ir o meu povo... até agora não ouviste"
      b(17, { by: "deus", q: "Assim diz o Senhor: ", env: { glory: 0.7, water: 0.5 } }), // "com esta vara ferirei as águas do rio, e tornar-se-ão em sangue"
      b(18, { by: "deus", env: { glory: 0.68, water: 0.5, storm: 0.15 } }), // "os peixes morrerão, o rio cheirará mal, e os egípcios terão nojo de beber"
      b(19, { by: "deus", q: "Disse mais o Senhor a Moisés: Dize a Arão: ", env: { water: 0.5, glory: 0.72 } }), // "estende a tua mão sobre as águas do Egito... e haja sangue em toda a terra"
      b(20, { cast: [C("arao", -30, "raise", { dy: 0.72, facing: 1 }), C("moises", -90, "point", { dy: 0.72, facing: 1 }), C("farao", 120, "stand", { dy: 0.72, facing: -1 }), C("homem", 190, "stand", { dy: 0.72, id: "servo", facing: -1 })], env: { water: 0.7, blood: 0.92, storm: 0.4, fire: 0.35, glory: 0.4, night: 0.12 } }), // Arão fere as águas diante de Faraó, e todo o rio se torna em sangue
      b(21, { cast: [C("farao", 120, "stand", { dy: 0.74, facing: -1 }), C("homem", 190, "bow", { dy: 0.74, id: "servo", facing: -1 }), C("arao", -30, "stand", { dy: 0.74, facing: 1 }), C("moises", -90, "stand", { dy: 0.74, facing: 1 })], env: { water: 0.72, blood: 1, storm: 0.45, fire: 0.4, night: 0.2, glory: 0.25 } }), // os peixes morrem, o rio cheira mal, e há sangue por toda a terra do Egito
      b(22, { cast: [C("farao", 90, "point", { dy: 0.61, facing: -1 }), C("homem", 30, "raise", { dy: 0.61, id: "mago", facing: 1 }), C("homem", 140, "stand", { dy: 0.61, id: "mago2", facing: 1 })], env: { water: 0.6, blood: 1, storm: 0.3, fire: 0.3, glory: 0.15 } }), // os magos fazem o mesmo; o coração de Faraó se endurece
      b(23, { cast: [C("farao", 60, "walk", { dy: 0.46, facing: 1 })], env: { water: 0.5, blood: 0.95, storm: 0.2, night: 0.28, glory: 0.12 } }), // Faraó vira-se e vai para casa; nem ainda nisto põe o coração
      b(24, { cast: [C("multidao", -40, "kneel", { dy: 0.56 }), C("multidao", 60, "kneel", { scale: 0.9, dy: 0.6, id: "povo2" })], props: [...RIO, P("well", -180, 1, undefined, 0.34), P("well", 150, 0.9, undefined, 0.44)], env: { water: 0.55, blood: 1, storm: 0.15, fire: 0.25, night: 0.2, glory: 0.1 } }), // os egípcios cavam poços junto ao rio, pois não podem beber a água
      b(25, { env: { water: 0.45, blood: 0.85, storm: 0.1, fire: 0.2, night: 0.25 } }), // cumprem-se sete dias depois que o Senhor ferira o rio
    ],
  },

  // ------------------------------------------------------------------ Êx 8
  // As RÃS que sobem do rio e cobrem a terra → o alívio e o novo endurecimento →
  // o pó em PIOLHOS e a confissão dos magos ("o dedo de Deus") → os ENXAMES de
  // moscas sobre o Egito, com Gósen separada → e o coração de Faraó, de novo duro.
  8: {
    start: { terrain: "city", night: 0.14, glory: 0.55, storm: 0, fire: 0, water: 0.2, verdure: 0.4 },
    beats: [
      b(1, { by: "deus", q: "Depois disse o SENHOR a Moisés: Vai a Faraó e dize-lhe: Assim diz o SENHOR: ", set: "envio", cast: [C("moises", -20, "kneel", { dy: 0.5, facing: 1 })], props: EGITO, env: { water: 0, terrain: "city", glory: 0.65, night: 0.1 } }), // "Deixa ir o meu povo, para que me sirva"
      b(2, { by: "deus", env: { glory: 0.62, water: 0.3 } }), // "se recusares, ferirei com rãs todos os teus termos"
      b(3, { by: "deus", env: { glory: 0.6, water: 0.4, storm: 0.15 } }), // "o rio criará rãs que virão à tua casa, à tua cama, aos teus fornos"
      b(4, { by: "deus", env: { water: 0.42 } }), // "as rãs subirão sobre ti, sobre o teu povo e sobre todos os teus servos"
      b(5, { by: "deus", q: "Disse mais o Senhor a Moisés: Dize a Arão: ", env: { glory: 0.65 } }), // "Estende a tua mão com a vara sobre os rios, e faze subir rãs sobre o Egito"
      b(6, { set: "rio", cast: [C("arao", -30, "raise", { dy: 0.77, facing: 1 }), C("moises", -90, "stand", { dy: 0.77, facing: 1 })], props: [P("river", 0, 1.5, undefined, 0.22), P("palm", -256, 1.1, undefined, 0.12), P("palm", 244, 1.05, undefined, 0.12), P("grass", -120, 1.05, undefined, 0.68), P("grass", 120, 1, undefined, 0.72), P("bush", 200, 0.8, undefined, 0.4), { ...P("frogs", 40, 1.1, undefined, 0.74), tag: "praga-ras" }, P("frogs", 160, 0.95, undefined, 0.62), P("frogs", -150, 1.0, undefined, 0.82)], env: { terrain: "city", water: 0.75, storm: 0.35, glory: 0.3, night: 0.14 } }), // Arão estende a mão, e as rãs sobem e cobrem a terra do Egito
      b(7, { cast: [C("homem", 60, "raise", { dy: 0.74, id: "mago", facing: -1 }), C("homem", 140, "stand", { dy: 0.74, id: "mago2", facing: -1 }), C("arao", -60, "stand", { dy: 0.74, facing: 1 })], env: { water: 0.72, storm: 0.35 } }), // os magos fazem o mesmo, e também fazem subir rãs
      b(8, { by: "farao", q: "e disse: ", set: "palacio", cast: [C("farao", 90, "point", { dy: 0.5, facing: -1 }), C("moises", -60, "stand", { dy: 0.5, facing: 1 }), C("arao", -10, "stand", { dy: 0.5, facing: 1 })], props: [...PALACIO, { ...P("frogs", -40, 1.0, undefined, 0.74), tag: "praga-ras" }, P("frogs", 130, 0.9, undefined, 0.62)], env: { terrain: "city", water: 0.5, storm: 0.15, glory: 0.3, night: 0.12 } }), // Faraó chama Moisés e Arão: "Rogai ao Senhor que tire as rãs... deixarei ir o povo"
      b(9, { by: "moises", q: "E disse Moisés a Faraó: ", cast: [C("moises", -60, "point", { dy: 0.5, facing: 1 }), C("arao", -10, "stand", { dy: 0.5, facing: 1 }), C("farao", 90, "stand", { dy: 0.5, facing: -1 })], env: { glory: 0.4 } }), // "quando hei de rogar por ti, para que as rãs fiquem somente no rio?"
      b(10, { by: "moises", q: "E Moisés disse: ", env: { glory: 0.5 } }), // "Seja conforme à tua palavra, para que saibas que ninguém há como o Senhor nosso Deus"
      b(11, { by: "moises", env: { water: 0.35 } }), // "as rãs apartar-se-ão de ti e das tuas casas; somente ficarão no rio"
      b(12, { set: "clamor", cast: [C("moises", -20, "raise", { dy: 0.5, facing: 1 }), C("arao", 40, "stand", { dy: 0.5, facing: -1 })], props: EGITO, env: { terrain: "city", glory: 0.6, water: 0.25, storm: 0, night: 0.16 } }), // Moisés clama ao Senhor por causa das rãs
      b(13, { cast: [C("moises", -20, "stand", { dy: 0.5, facing: 1 }), C("arao", 40, "stand", { dy: 0.5, facing: -1 })], env: { glory: 0.55, water: 0.1 } }), // o Senhor faz conforme a palavra de Moisés: as rãs morrem
      b(14, { env: { storm: 0.2, glory: 0.35, night: 0.2 } }), // ajuntam-nas em montões, e a terra cheira mal
      b(15, { by: "farao", set: "palacio", cast: [C("farao", 60, "stand", { dy: 0.44, facing: -1 })], props: PALACIO, env: { terrain: "city", storm: 0.1, night: 0.28, glory: 0.12 } }), // vendo o descanso, Faraó endurece o coração e não os ouve
      b(16, { by: "deus", q: "Disse mais o Senhor a Moisés: Dize a Arão: ", set: "clamor", cast: [C("moises", -20, "kneel", { dy: 0.5, facing: 1 })], props: EGITO, env: { terrain: "city", glory: 0.6, night: 0.14 } }), // "Estende a tua vara e fere o pó da terra, para que se torne em piolhos"
      b(17, { cast: [C("arao", -20, "raise", { dy: 0.5, facing: 1 }), C("moises", -80, "stand", { dy: 0.5, facing: 1 }), C("multidao", 90, "kneel", { dy: 0.5 })], env: { storm: 0.5, glory: 0.25, verdure: 0.15, night: 0.18 } }), // Arão fere o pó, e há piolhos nos homens e no gado por toda a terra
      b(18, { cast: [C("homem", 60, "stand", { dy: 0.5, id: "mago", facing: -1 }), C("homem", 130, "bow", { dy: 0.52, id: "mago2", facing: -1 }), C("arao", -40, "stand", { dy: 0.5, facing: 1 })], env: { storm: 0.45, glory: 0.2 } }), // os magos tentam produzir piolhos com seus encantamentos, mas não podem
      b(19, { by: "homem", q: "Então disseram os magos a Faraó: ", set: "palacio", cast: [C("farao", 90, "point", { dy: 0.44, facing: -1 }), C("homem", 20, "raise", { dy: 0.5, id: "mago", facing: 1 }), C("homem", -50, "stand", { dy: 0.52, id: "mago2", facing: 1 })], props: PALACIO, env: { terrain: "city", storm: 0.3, glory: 0.3, night: 0.16 } }), // os magos: "Isto é o dedo de Deus"; mas o coração de Faraó se endurece
      b(20, { by: "deus", q: "Disse mais o Senhor a Moisés: ", set: "rio", cast: [C("moises", -60, "stand", { dy: 0.5, facing: 1 }), C("arao", -110, "stand", { dy: 0.5, facing: 1 }), C("farao", 130, "stand", { dy: 0.46, facing: -1 })], props: RIO, env: { terrain: "city", storm: 0, glory: 0.6, night: 0.1, water: 0.35 } }), // "Levanta-te cedo e põe-te diante de Faraó: Deixa ir o meu povo, para que me sirva"
      b(21, { by: "deus", env: { glory: 0.55, storm: 0.2 } }), // "se não deixares ir o meu povo, enviarei enxames de moscas sobre ti e o teu povo"
      b(22, { by: "deus", env: { glory: 0.7 } }), // "naquele dia separarei a terra de Gósen, onde meu povo habita, sem enxames"
      b(23, { by: "deus", env: { glory: 0.65 } }), // "porei separação entre o meu povo e o teu povo; amanhã se fará este sinal"
      b(24, { set: "palacio", cast: [C("farao", 90, "bow", { dy: 0.44, facing: -1 }), C("homem", 150, "kneel", { dy: 0.5, id: "servo", facing: -1 })], props: PALACIO, env: { water: 0, terrain: "city", storm: 0.55, night: 0.22, glory: 0.15, verdure: 0.3 } }), // vêm grandes enxames de moscas à casa de Faraó e a toda a terra
      b(25, { by: "farao", q: "e disse: ", cast: [C("farao", 90, "point", { dy: 0.44, facing: -1 }), C("moises", -60, "stand", { dy: 0.5, facing: 1 }), C("arao", -10, "stand", { dy: 0.5, facing: 1 })], env: { storm: 0.4, glory: 0.25 } }), // Faraó chama Moisés e Arão: "Ide, e sacrificai ao vosso Deus nesta terra"
      b(26, { by: "moises", q: "E Moisés disse: ", cast: [C("moises", -60, "point", { dy: 0.5, facing: 1 }), C("arao", -10, "stand", { dy: 0.5, facing: 1 }), C("farao", 90, "stand", { dy: 0.44, facing: -1 })], env: { glory: 0.4 } }), // "não convém... sacrificaríamos a abominação dos egípcios; não nos apedrejariam?"
      b(27, { by: "moises" }), // "deixa-nos ir caminho de três dias ao deserto, e sacrifiquemos ao Senhor nosso Deus"
      b(28, { by: "farao", q: "Então disse Faraó: ", cast: [C("farao", 90, "raise", { dy: 0.44, facing: -1 }), C("moises", -60, "stand", { dy: 0.5, facing: 1 }), C("arao", -10, "stand", { dy: 0.5, facing: 1 })], env: { storm: 0.3, glory: 0.3 } }), // "Deixar-vos-ei ir... somente não vades longe; orai também por mim"
      b(29, { by: "moises", q: "E Moisés disse: ", cast: [C("moises", -60, "point", { dy: 0.5, facing: 1 }), C("farao", 90, "stand", { dy: 0.44, facing: -1 }), C("arao", -10, "stand", { dy: 0.5, facing: 1 })], env: { glory: 0.4 } }), // "orarei ao Senhor que os enxames se retirem amanhã; somente que Faraó não me engane"
      b(30, { set: "clamor", cast: [C("moises", -20, "raise", { dy: 0.5, facing: 1 })], props: EGITO, env: { water: 0, terrain: "city", storm: 0.2, glory: 0.6, night: 0.16 } }), // Moisés sai da presença de Faraó e ora ao Senhor
      b(31, { env: { storm: 0.05, glory: 0.65, night: 0.12 } }), // o Senhor faz conforme a palavra de Moisés: os enxames se retiram, não fica um só
      b(32, { by: "farao", set: "palacio", cast: [C("farao", 60, "stand", { dy: 0.44, facing: -1 })], props: PALACIO, env: { water: 0, terrain: "city", storm: 0.1, night: 0.32, glory: 0.1 } }), // mas Faraó endurece ainda esta vez o coração, e não deixa ir o povo
    ],
  },
};
