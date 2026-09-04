// ============================================================================
// ÊXODO 29–30 — roteiro do modo CENA VIVA (força-tarefa AT, onda Êxodo).
//
// Êx 29 — A CONSAGRAÇÃO DOS SACERDOTES: à porta da tenda, Arão e seus filhos são
// lavados, vestidos e ungidos; o novilho e os dois carneiros são oferecidos, o
// sangue posto sobre a orelha, o polegar e o pé — sete dias de consagração. Deus
// promete: "habitarei no meio dos filhos de Israel".
//
// Êx 30 — O INCENSO, A PIA, O AZEITE: o altar de ouro do incenso perpétuo; o
// resgate de meio siclo pelas almas; a pia de cobre para lavar; o azeite da santa
// unção e o incenso puro e santo.
//
// A VOZ DE DEUS (regra do projeto): Moisés está na glória do monte/tenda; a ordem
// vem do céu, SEM figura — `by: "deus"`. Arão e seus filhos entram em cena na
// consagração; cada peça (altar, censer, pia, azeite) surge como modelo santo.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });

// ---------------------------------------------------------------------------
// A PORTA DA TENDA e o ALTAR do holocausto, onde os sacerdotes são consagrados.
const TENDA_ALTAR: StagePropSpec[] = [
  { ...P("altar", 40, 1.15, 0.55, 0.42), tag: "altar-holocausto" },
  { ...P("tent", -160, 1.3, undefined, 0.34), tag: "tenda-congregacao" },
  P("crate", 130, 0.7, undefined, 0.6),
  P("rock", -320, 1, undefined, 0.5),
  P("rock", 320, 0.95, undefined, 0.52),
];
// modelos de Êx 30
const ALTAR_INCENSO: StagePropSpec[] = [
  { ...P("censer", 0, 1.15, 0.4, 0.42), tag: "altar-incenso" },
  { ...P("tent", -160, 1.25, undefined, 0.34), tag: "tenda-congregacao" },
  P("rock", -320, 1, undefined, 0.5),
  P("rock", 320, 0.95, undefined, 0.52),
];
const PIA: StagePropSpec[] = [
  { ...P("bowl", 0, 1.15, undefined, 0.46), tag: "pia-cobre" },
  { ...P("tent", -170, 1.2, undefined, 0.34), tag: "tenda-congregacao" },
  { ...P("altar", 150, 1, 0.35, 0.44), tag: "altar-holocausto" },
  P("rock", -320, 1, undefined, 0.5),
];
const AZEITE: StagePropSpec[] = [
  { ...P("amphora", 0, 1.15, undefined, 0.46), tag: "azeite-uncao" },
  { ...P("censer", 110, 1, 0.35, 0.5), tag: "incenso-santo" },
  P("rock", -300, 1.1, undefined, 0.5),
  P("rock", 300, 1.05, undefined, 0.52),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Êx 29
  // A lavagem e a vestidura → a unção → o novilho e os carneiros da consagração →
  // o sangue sobre a orelha, o polegar e o pé → e a promessa: habitarei no meio deles.
  29: {
    start: { terrain: "mountain", night: 0.18, glory: 0.78, storm: 0, fire: 0.55, verdure: 0.2 },
    beats: [
      b(1, { by: "deus", set: "consagracao", cast: [C("moises", -110, "stand", { dy: 0.5, facing: 1 }), C("arao", -30, "stand", { dy: 0.5, facing: -1 }), C("rebanho", 150, "stand", { dy: 0.44, id: "novilho" }), C("cordeiro", 210, "stand", { dy: 0.5 })], props: TENDA_ALTAR, env: { terrain: "mountain", glory: 0.8, fire: 0.5, night: 0.16 } }), // "toma um novilho e dois carneiros sem mácula, para os santificar"
      b(2, { by: "deus" }), // "e pães ázimos, bolos e coscorões, de flor de farinha, amassados com azeite"
      b(3, { by: "deus" }), // "e os porás num cesto, com o novilho e os dois carneiros"
      b(4, { by: "deus", cast: [C("moises", -90, "raise", { dy: 0.5, facing: 1 }), C("arao", -20, "bow", { dy: 0.5, facing: -1 }), C("homem", 40, "bow", { dy: 0.5, id: "filho-arao", facing: -1 })], env: { glory: 0.82 } }), // "farás chegar Arão e seus filhos à porta da tenda, e os lavarás com água"
      b(5, { by: "deus" }), // "vestirás a Arão da túnica, do manto, do éfode e do peitoral, e o cingirás"
      b(6, { by: "deus", env: { glory: 0.85 } }), // "porás a mitra na sua cabeça, e a coroa da santidade sobre a mitra"
      b(7, { by: "deus", cast: [C("moises", -70, "raise", { dy: 0.5, facing: 1 }), C("arao", 0, "kneel", { dy: 0.5, facing: -1 })], env: { glory: 0.9 } }), // "tomarás o azeite da unção e o derramarás sobre a sua cabeça"
      b(8, { by: "deus", cast: [C("moises", -90, "stand", { dy: 0.5, facing: 1 }), C("arao", -20, "stand", { dy: 0.5, facing: -1 }), C("homem", 40, "stand", { dy: 0.5, id: "filho-arao", facing: -1 })] }), // "farás chegar seus filhos e lhes farás vestir túnicas"
      b(9, { by: "deus", env: { glory: 0.85 } }), // "os cingirás com o cinto, e o sacerdócio lhes será por estatuto perpétuo"
      b(10, { by: "deus", cast: [C("arao", -30, "raise", { dy: 0.5, facing: -1 }), C("rebanho", 60, "stand", { dy: 0.46, id: "novilho" }), C("moises", -110, "stand", { dy: 0.5, facing: 1 })], env: { glory: 0.78 } }), // "farás chegar o novilho, e Arão e seus filhos porão as mãos sobre a sua cabeça"
      b(11, { by: "deus", env: { fire: 0.6 } }), // "imolarás o novilho perante o Senhor, à porta da tenda"
      b(12, { by: "deus" }), // "porás do sangue sobre as pontas do altar, e o restante à base do altar"
      b(13, { by: "deus", env: { fire: 0.7 } }), // "queimarás sobre o altar a gordura das entranhas, o fígado e os rins"
      b(14, { by: "deus", env: { fire: 0.65, night: 0.2 } }), // "a carne, a pele e o esterco queimarás fora do arraial; é sacrifício pelo pecado"
      b(15, { by: "deus", cast: [C("arao", -30, "raise", { dy: 0.5, facing: -1 }), C("cordeiro", 60, "stand", { dy: 0.5, id: "carneiro1" }), C("moises", -110, "stand", { dy: 0.5, facing: 1 })], env: { glory: 0.78, fire: 0.5 } }), // "tomarás um carneiro, e porão as mãos sobre a sua cabeça"
      b(16, { by: "deus", env: { fire: 0.6 } }), // "imolarás o carneiro e espalharás o seu sangue sobre o altar ao redor"
      b(17, { by: "deus" }), // "partirás o carneiro, lavarás as entranhas e as pernas, e as porás sobre as partes"
      b(18, { by: "deus", env: { fire: 0.75, glory: 0.82 } }), // "queimarás todo o carneiro: é holocausto ao Senhor, cheiro suave"
      b(19, { by: "deus", cast: [C("arao", -30, "raise", { dy: 0.5, facing: -1 }), C("cordeiro", 60, "stand", { dy: 0.5, id: "carneiro2" }), C("moises", -110, "stand", { dy: 0.5, facing: 1 })], env: { glory: 0.8 } }), // "tomarás o outro carneiro, e porão as mãos sobre a sua cabeça"
      b(20, { by: "deus", cast: [C("moises", -70, "point", { dy: 0.5, facing: 1 }), C("arao", 0, "stand", { dy: 0.5, facing: -1 })], env: { fire: 0.6, glory: 0.82 } }), // "porás do sangue sobre a orelha direita, o polegar da mão e do pé de Arão e seus filhos"
      b(21, { by: "deus", env: { glory: 0.88 } }), // "espargirás do sangue e do azeite sobre Arão e as vestes, para que sejam santificados"
      b(22, { by: "deus" }), // "tomarás a gordura, a cauda, o fígado, os rins e o ombro direito: carneiro das consagrações"
      b(23, { by: "deus", cast: [C("moises", -70, "raise", { dy: 0.5, facing: 1 }), C("arao", 0, "raise", { dy: 0.5, facing: -1 }), C("homem", 60, "raise", { dy: 0.5, id: "filho-arao", facing: -1 })] }), // "e um pão, um bolo e um coscorão do cesto dos ázimos diante do Senhor"
      b(24, { by: "deus" }), // "tudo porás nas mãos de Arão e de seus filhos, e oferecerás com movimento"
      b(25, { by: "deus", env: { fire: 0.7 } }), // "queimarás no altar sobre o holocausto, por cheiro suave: oferta queimada ao Senhor"
      b(26, { by: "deus" }), // "tomarás o peito do carneiro das consagrações, e será a tua porção"
      b(27, { by: "deus" }), // "santificarás o peito da oferta de movimento e o ombro da oferta alçada"
      b(28, { by: "deus" }), // "será para Arão e seus filhos por estatuto perpétuo dos filhos de Israel"
      b(29, { by: "deus", env: { glory: 0.85 } }), // "as vestes sagradas de Arão serão de seus filhos depois dele, para os ungir"
      b(30, { by: "deus" }), // "sete dias as vestirá o sacerdote que suceder, ao ministrar no santuário"
      b(31, { by: "deus" }), // "tomarás o carneiro das consagrações e cozerás a sua carne no lugar santo"
      b(32, { by: "deus" }), // "Arão e seus filhos comerão a carne e o pão à porta da tenda"
      b(33, { by: "deus" }), // "comerão as coisas da expiação; o estranho não comerá, porque são santas"
      b(34, { by: "deus", env: { fire: 0.6 } }), // "o que sobejar até pela manhã, queimarás com fogo; não se comerá, porque é santo"
      b(35, { by: "deus", env: { glory: 0.85 } }), // "por sete dias os consagrarás, conforme a tudo o que te ordenei"
      b(36, { by: "deus" }), // "cada dia prepararás um novilho pelo pecado, e purificarás o altar, ungindo-o"
      b(37, { by: "deus", env: { glory: 0.9 } }), // "sete dias farás expiação pelo altar: o altar será santíssimo"
      b(38, { by: "deus", cast: [C("moises", -110, "stand", { dy: 0.5, facing: 1 }), C("cordeiro", 30, "stand", { dy: 0.5, id: "cordeiro-manha" }), C("cordeiro", 120, "stand", { scale: 0.9, dy: 0.54, id: "cordeiro-tarde" })], env: { glory: 0.8, fire: 0.5 } }), // "oferecereis sobre o altar dois cordeiros de um ano, cada dia, continuamente"
      b(39, { by: "deus" }), // "um cordeiro pela manhã e o outro à tarde"
      b(40, { by: "deus" }), // "com flor de farinha, azeite batido, e vinho para libação"
      b(41, { by: "deus" }), // "o outro cordeiro à tarde, com a mesma oferta e libação, por cheiro suave"
      b(42, { by: "deus", env: { glory: 0.9 } }), // "holocausto contínuo por vossas gerações, onde vos encontrarei, para falar contigo"
      b(43, { by: "deus", env: { glory: 0.95 } }), // "ali virei aos filhos de Israel, e serão santificados pela minha glória"
      b(44, { by: "deus" }), // "santificarei a tenda e o altar, e Arão e seus filhos, para me administrarem"
      b(45, { by: "deus", env: { glory: 0.96 } }), // "e habitarei no meio dos filhos de Israel, e lhes serei o seu Deus"
      b(46, { by: "deus", env: { glory: 1 } }), // "saberão que eu sou o Senhor seu Deus, que os tirei do Egito. Eu sou o Senhor"
    ],
  },

  // ------------------------------------------------------------------ Êx 30
  // O altar de ouro do incenso perpétuo → o resgate de meio siclo → a pia de cobre
  // → o azeite da santa unção → e o incenso puro e santo.
  30: {
    start: { terrain: "mountain", night: 0.18, glory: 0.82, storm: 0, fire: 0.45, verdure: 0.2 },
    beats: [
      b(1, { by: "deus", set: "incenso", cast: [C("moises", -120, "kneel", { dy: 0.5, facing: 1 })], props: ALTAR_INCENSO, env: { terrain: "mountain", glory: 0.85, fire: 0.5, night: 0.16 } }), // "farás um altar de acácia para queimar o incenso"
      b(2, { by: "deus" }), // "de um côvado, quadrado, e dois de altura; as pontas do mesmo"
      b(3, { by: "deus", env: { glory: 0.85 } }), // "forrá-lo-ás de ouro puro, com uma coroa de ouro ao redor"
      b(4, { by: "deus" }), // "farás duas argolas de ouro sob a coroa, para os varais"
      b(5, { by: "deus" }), // "os varais de acácia, forrados de ouro"
      b(6, { by: "deus", env: { glory: 0.9 } }), // "pô-lo-ás diante do véu, junto ao propiciatório, onde me ajuntarei contigo"
      b(7, { by: "deus", env: { fire: 0.6 } }), // "Arão queimará o incenso das especiarias cada manhã, ao pôr as lâmpadas em ordem"
      b(8, { by: "deus" }), // "e à tarde, ao acender as lâmpadas: incenso contínuo perante o Senhor"
      b(9, { by: "deus" }), // "não oferecereis sobre ele incenso estranho, nem holocausto, nem libação"
      b(10, { by: "deus", env: { glory: 0.88 } }), // "uma vez no ano Arão fará expiação sobre as pontas: santíssimo é ao Senhor"
      b(11, { set: "resgate", cast: [C("moises", -60, "stand", { dy: 0.5, facing: 1 }), C("multidao", 60, "stand", { dy: 0.48 }), C("multidao", 160, "stand", { scale: 0.9, dy: 0.52, id: "povo2" })], props: ALTAR_INCENSO, env: { terrain: "mountain", glory: 0.82, fire: 0.35, night: 0.16 } }), // o Senhor fala a Moisés
      b(12, { by: "deus" }), // "quando contares os filhos de Israel, cada um dará o resgate da sua alma"
      b(13, { by: "deus" }), // "cada um dará meio siclo do santuário, como oferta ao Senhor"
      b(14, { by: "deus" }), // "todo o que passar pelo arrolamento, de vinte anos para cima, dará a oferta"
      b(15, { by: "deus" }), // "o rico não dará mais, nem o pobre menos, do meio siclo"
      b(16, { by: "deus", env: { glory: 0.85 } }), // "o dinheiro das expiações darás ao serviço da tenda, por memória diante do Senhor"
      b(17, { set: "pia", cast: [C("moises", -120, "kneel", { dy: 0.5, facing: 1 })], props: PIA, env: { terrain: "mountain", glory: 0.82, fire: 0.3, water: 0.3, night: 0.14 } }), // o Senhor fala a Moisés
      b(18, { by: "deus" }), // "farás uma pia de cobre com a sua base, para lavar, entre a tenda e o altar"
      b(19, { by: "deus" }), // "Arão e seus filhos nela lavarão as suas mãos e os seus pés"
      b(20, { by: "deus" }), // "ao entrar na tenda, lavar-se-ão com água, para que não morram"
      b(21, { by: "deus", env: { glory: 0.85 } }), // "lavarão as mãos e os pés, por estatuto perpétuo nas suas gerações"
      b(22, { set: "azeite", cast: [C("moises", -120, "kneel", { dy: 0.5, facing: 1 })], props: AZEITE, env: { terrain: "mountain", glory: 0.85, fire: 0.4, water: 0, night: 0.14 } }), // o Senhor fala a Moisés
      b(23, { by: "deus" }), // "toma das melhores especiarias: mirra, canela aromática e cálamo"
      b(24, { by: "deus" }), // "e cássia, segundo o siclo do santuário, e um him de azeite de oliveiras"
      b(25, { by: "deus", env: { glory: 0.88 } }), // "farás o azeite da santa unção, o perfume segundo a arte do perfumista"
      b(26, { by: "deus" }), // "com ele ungirás a tenda da congregação e a arca do testemunho"
      b(27, { by: "deus" }), // "a mesa, o candelabro e o altar do incenso, com todos os utensílios"
      b(28, { by: "deus" }), // "o altar do holocausto e a pia com a sua base"
      b(29, { by: "deus", env: { glory: 0.9 } }), // "santificarás estas coisas: tudo o que as tocar será santo"
      b(30, { by: "deus" }), // "ungirás Arão e seus filhos, e os santificarás para o sacerdócio"
      b(31, { by: "deus" }), // "este me será o azeite da santa unção nas vossas gerações"
      b(32, { by: "deus" }), // "não se ungirá com ele a carne do homem, nem fareis outro igual: santo é"
      b(33, { by: "deus", env: { fire: 0.5 } }), // "quem compuser um perfume como este será extirpado do seu povo"
      b(34, { by: "deus", q: "Disse mais o Senhor a Moisés: ", cast: [C("moises", -120, "kneel", { dy: 0.5, facing: 1 })], props: AZEITE, env: { glory: 0.86, fire: 0.45 } }), // "toma especiarias: estoraque, onicha, gálbano e incenso puro, em igual proporção"
      b(35, { by: "deus" }), // "farás incenso, um perfume segundo a arte do perfumista, temperado, puro e santo"
      b(36, { by: "deus", env: { glory: 0.9 } }), // "moerás uma parte e a porás diante do testemunho: coisa santíssima vos será"
      b(37, { by: "deus" }), // "o incenso desta composição não o fareis para vós: santo será para o Senhor"
      b(38, { by: "deus", env: { fire: 0.5 } }), // "quem fizer tal como este para cheirar será extirpado do seu povo"
    ],
  },
};
