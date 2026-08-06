// ============================================================================
// ÊXODO 11–12 — roteiro do modo CENA VIVA (força-tarefa AT, onda Êxodo).
//
// Êx 11 — O ANÚNCIO DA DÉCIMA PRAGA: "à meia-noite eu sairei pelo meio do Egito"
// e todo primogênito morrerá — mas entre Israel "nem um cão moverá a língua".
// Moisés sai da presença de Faraó ardendo em ira.
//
// Êx 12 — A PÁSCOA E A SAÍDA: o cordeiro sem mácula, o sangue nas ombreiras e na
// verga da porta, os pães ázimos e as ervas amargosas; o SENHOR passa à
// meia-noite e o destruidor não entra onde há sangue. Feridos os primogênitos,
// Faraó os lança fora — e Israel parte de Ramessés, "todos os exércitos do
// Senhor", depois de 430 anos.
//
// A VOZ DE DEUS (regra do projeto): sem mediador visível, Deus fala do céu a
// Moisés/Arão — `by: "deus"`, glória no ambiente, SEM figura. O CORDEIRO da
// páscoa é ator em cena (`cordeiro`), com a PORTA marcada pelo sangue e o fogo
// do assado. Faraó fala com `by: "farao"`; Moisés aos anciãos com `by: "moises"`.
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
// O EGITO (cidade): torres, tendas e palmeiras — a terra de onde Israel sai.
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

// ---------------------------------------------------------------------------
// A CASA DA PÁSCOA (Êx 12): a PORTA com o sangue nas ombreiras e na verga, o
// fogo do cordeiro assado, e as tendas dos hebreus na noite.
const CASA_PASCOA: StagePropSpec[] = [
  { ...P("door", 0, 1.15, undefined, 0.32), tag: "porta-sangue" },
  { ...P("campfire", -110, 1, 1, 0.52), tag: "cordeiro-assado" },
  P("tent", 180, 1.05, undefined, 0.16),
  P("tent", 268, 0.85, undefined, 0.3),
  P("amphora", 100, 0.8, undefined, 0.6),
  P("palm", -250, 1.05, undefined, 0.12),
  P("grass", -60, 0.85, undefined, 0.8),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Êx 11
  // O aviso da meia-noite (a última praga) → a diferença entre o Egito e Israel →
  // e Moisés que sai ardendo em ira, enquanto o Senhor endurece o coração de Faraó.
  11: {
    start: { terrain: "city", night: 0.4, glory: 0.5, storm: 0, fire: 0, verdure: 0.35 },
    beats: [
      b(1, { by: "deus", q: "E o Senhor disse a Moisés: ", set: "aviso", cast: [C("moises", -20, "kneel", { dy: 0.5, facing: 1 })], props: EGITO, env: { terrain: "city", glory: 0.6, night: 0.36 } }), // "Ainda uma praga trarei sobre Faraó... depois vos lançará daqui"
      b(2, { by: "deus" }), // "cada homem peça ao seu vizinho jóias de prata e de ouro"
      b(3, { cast: [C("moises", -20, "stand", { dy: 0.5, facing: 1 }), C("multidao", 120, "stand", { scale: 0.9, dy: 0.48 })], env: { glory: 0.55 } }), // o Senhor dá graça ao povo; Moisés é grande na terra do Egito
      b(4, { by: "moises", q: "Disse mais Moisés: Assim o Senhor tem dito: ", set: "palacio", cast: [C("farao", 90, "stand", { dy: 0.44, facing: -1 }), C("moises", -60, "point", { dy: 0.5, facing: 1 })], props: PALACIO, env: { terrain: "city", glory: 0.35, night: 0.4 } }), // "À meia-noite eu sairei pelo meio do Egito"
      b(5, { by: "moises", env: { storm: 0.25, night: 0.5, glory: 0.2 } }), // "todo o primogênito morrerá, desde o de Faraó até o da serva"
      b(6, { by: "moises", env: { storm: 0.3 } }), // "haverá grande clamor em toda a terra do Egito, como nunca houve"
      b(7, { by: "moises", env: { glory: 0.4, storm: 0.1 } }), // "entre Israel nem um cão moverá a língua: o Senhor fez diferença"
      b(8, { by: "moises", cast: [C("moises", -60, "walk", { dy: 0.5, facing: 1 }), C("farao", 90, "stand", { dy: 0.44, facing: -1 })], env: { storm: 0.2, night: 0.44, glory: 0.2 } }), // "teus servos se inclinarão: Sai tu". E saiu de Faraó ardendo em ira
      b(9, { by: "deus", q: "O Senhor dissera a Moisés: ", set: "aviso", cast: [C("moises", -20, "stand", { dy: 0.5, facing: 1 })], props: EGITO, env: { terrain: "city", glory: 0.55, night: 0.36 } }), // "Faraó não vos ouvirá, para que as minhas maravilhas se multipliquem"
      b(10, { cast: [C("moises", -40, "stand", { dy: 0.5, facing: 1 }), C("arao", 20, "stand", { dy: 0.5, facing: -1 })], env: { glory: 0.4, night: 0.44 } }), // Moisés e Arão fizeram todas as maravilhas; o Senhor endureceu Faraó
    ],
  },

  // ------------------------------------------------------------------ Êx 12
  // A ordenança da páscoa (o cordeiro, o sangue, os ázimos) → a instrução aos
  // anciãos → a meia-noite dos primogênitos → o clamor do Egito e a expulsão →
  // e a SAÍDA de Ramessés: todos os exércitos do Senhor deixam o Egito (glória).
  12: {
    start: { terrain: "city", night: 0.42, glory: 0.55, storm: 0, fire: 0, verdure: 0.3 },
    beats: [
      b(1, { set: "instrucao", cast: [C("moises", -50, "kneel", { dy: 0.5, facing: 1 }), C("arao", 10, "kneel", { dy: 0.5, facing: 1 })], props: EGITO, env: { terrain: "city", glory: 0.7, night: 0.34 } }), // o Senhor fala a Moisés e a Arão na terra do Egito
      b(2, { by: "deus", env: { glory: 0.72 } }), // "este mês vos será o princípio dos meses, o primeiro do ano"
      b(3, { by: "deus", q: "Falai a toda a congregação de Israel, dizendo: ", cast: [C("moises", -50, "stand", { dy: 0.5, facing: 1 }), C("arao", 10, "stand", { dy: 0.5, facing: 1 }), C("cordeiro", 90, "stand", { dy: 0.56 })], env: { glory: 0.7 } }), // "tome cada um para si um cordeiro, segundo as casas dos pais"
      b(4, { by: "deus" }), // "se a família for pequena para um cordeiro, tome-o com o vizinho"
      b(5, { by: "deus", env: { glory: 0.75 } }), // "o cordeiro será sem mácula, um macho de um ano"
      b(6, { by: "deus" }), // "o guardareis até ao décimo quarto dia, e o sacrificará à tarde"
      b(7, { by: "deus", q: "E tomarão do sangue, ", set: "casa-pascoa", cast: [C("moises", -70, "stand", { dy: 0.5, facing: 1 }), C("cordeiro", 60, "stand", { dy: 0.56 })], props: CASA_PASCOA, env: { terrain: "city", glory: 0.6, night: 0.42, fire: 0.5 } }), // "pô-lo-ão nas ombreiras e na verga da porta, nas casas em que o comerem"
      b(8, { by: "deus", env: { fire: 0.65 } }), // "comerão a carne assada no fogo, com pães ázimos e ervas amargosas"
      b(9, { by: "deus" }), // "não comereis dele cru, nem cozido, senão assado no fogo"
      b(10, { by: "deus" }), // "nada dele deixareis até amanhã; o que ficar, queimareis no fogo"
      b(11, { by: "deus", env: { glory: 0.65 } }), // "os lombos cingidos, o cajado na mão... esta é a páscoa do Senhor"
      b(12, { by: "deus", env: { storm: 0.3, night: 0.55, glory: 0.5 } }), // "passarei pela terra esta noite e ferirei todo primogênito. Eu sou o Senhor"
      b(13, { by: "deus", env: { glory: 0.7, storm: 0.15 } }), // "aquele sangue vos será por sinal; vendo eu o sangue, passarei por cima de vós"
      b(14, { by: "deus", env: { glory: 0.72 } }), // "este dia vos será por memória, festa ao Senhor por estatuto perpétuo"
      b(15, { by: "deus" }), // "sete dias comereis pães ázimos; tirareis o fermento das vossas casas"
      b(16, { by: "deus" }), // "ao primeiro e ao sétimo dia, santa convocação"
      b(17, { by: "deus", env: { glory: 0.75 } }), // "guardai a festa dos ázimos, porque nesse dia tirei vossos exércitos do Egito"
      b(18, { by: "deus" }), // "aos catorze dias do mês, à tarde, comereis pães ázimos"
      b(19, { by: "deus" }), // "por sete dias não se ache fermento nas vossas casas"
      b(20, { by: "deus" }), // "nenhuma coisa levedada comereis; em todas as habitações, pães ázimos"
      b(21, { by: "moises", q: "Chamou pois Moisés a todos os anciãos de Israel, e disse-lhes: ", set: "anciaos", cast: [C("moises", -60, "point", { dy: 0.5, facing: 1 }), C("anciao", 30, "stand", { dy: 0.5, facing: -1 }), C("anciao", 100, "stand", { dy: 0.52, id: "anciao2", facing: -1 }), C("cordeiro", -130, "stand", { dy: 0.58 })], props: CASA_PASCOA, env: { terrain: "city", glory: 0.55, night: 0.44, fire: 0.5 } }), // "Escolhei cordeiros para vossas famílias, e sacrificai a páscoa"
      b(22, { by: "moises", env: { fire: 0.55 } }), // "molhai o hissopo no sangue e passai-o na verga e nas ombreiras; nenhum saia até à manhã"
      b(23, { by: "moises", env: { glory: 0.6, storm: 0.15 } }), // "vendo o sangue, o Senhor passará a porta, e não deixará o destruidor entrar"
      b(24, { by: "moises" }), // "guardai isto por estatuto para vós e para vossos filhos para sempre"
      b(25, { by: "moises" }), // "quando entrardes na terra que o Senhor vos dará, guardareis este culto"
      b(26, { by: "moises" }), // "quando vossos filhos disserem: Que culto é este?"
      b(27, { by: "moises", q: "Então direis: ", cast: [C("moises", -60, "stand", { dy: 0.5, facing: 1 }), C("multidao", 60, "bow", { dy: 0.5 }), C("anciao", 130, "bow", { dy: 0.52 })], env: { glory: 0.75, night: 0.36 } }), // "Este é o sacrifício da páscoa ao Senhor". E o povo inclinou-se e adorou
      b(28, { cast: [C("multidao", 20, "stand", { dy: 0.48 }), C("multidao", 120, "stand", { scale: 0.9, dy: 0.52, id: "povo2" }), C("moises", -80, "stand", { dy: 0.5, facing: 1 })], env: { glory: 0.7 } }), // os filhos de Israel fazem como o Senhor ordenara a Moisés e a Arão
      b(29, { set: "meia-noite", cast: [C("homem", 60, "lie", { dy: 0.5, id: "primogenito" }), C("farao", -60, "stand", { dy: 0.44, facing: 1 })], props: PALACIO, env: { terrain: "city", night: 0.92, storm: 0.4, glory: 0.35, fire: 0.15 } }), // à meia-noite o Senhor fere todos os primogênitos, desde o de Faraó
      b(30, { cast: [C("farao", 40, "stand", { dy: 0.44, facing: -1 }), C("homem", 120, "kneel", { dy: 0.52, id: "servo", facing: -1 }), C("homem", 60, "lie", { dy: 0.5, id: "primogenito" })], env: { night: 0.88, storm: 0.35, glory: 0.2 } }), // Faraó levanta-se de noite; grande clamor: não há casa sem morto
      b(31, { by: "farao", q: "e disse: ", cast: [C("farao", 90, "point", { dy: 0.44, facing: -1 }), C("moises", -60, "stand", { dy: 0.5, facing: 1 }), C("arao", -10, "stand", { dy: 0.5, facing: 1 })], env: { night: 0.8, storm: 0.2, glory: 0.25 } }), // "Levantai-vos, saí do meio do meu povo... ide, servi ao Senhor"
      b(32, { by: "farao" }), // "levai também vossas ovelhas e vacas... e abençoai-me também a mim"
      b(33, { set: "egito-pressa", cast: [C("homem", 90, "point", { dy: 0.5, id: "egipcio", facing: -1 }), C("multidao", -40, "walk", { dy: 0.5 }), C("multidao", 40, "walk", { scale: 0.9, dy: 0.54, id: "povo2" })], props: EGITO, env: { terrain: "city", night: 0.6, storm: 0.2, glory: 0.3 } }), // os egípcios apertam o povo para lançá-los da terra: "Todos seremos mortos"
      b(34, { cast: [C("multidao", -20, "walk", { dy: 0.5 }), C("mulherComum", 60, "walk", { dy: 0.54, id: "mulher1", facing: -1 }), C("multidao", 130, "walk", { scale: 0.9, dy: 0.5, id: "povo2", facing: -1 })], env: { night: 0.5, glory: 0.35 } }), // o povo toma a massa antes de levedar, as amassadeiras sobre os ombros
      b(35, { cast: [C("multidao", -30, "stand", { dy: 0.5 }), C("homem", 60, "stand", { dy: 0.5, id: "egipcio", facing: -1 }), C("mulherComum", 130, "stand", { dy: 0.52, id: "mulher1", facing: -1 })], env: { glory: 0.4 } }), // pedem aos egípcios jóias de prata, de ouro, e roupas
      b(36, { env: { glory: 0.55, night: 0.4 } }), // o Senhor dá graça ao povo; e despojam os egípcios
      b(37, { set: "saida", cast: [C("moises", -120, "walk", { dy: 0.5, facing: 1 }), C("arao", -70, "walk", { dy: 0.5, facing: 1 }), C("multidao", 30, "walk", { dy: 0.48 }), C("multidao", 140, "walk", { scale: 0.9, dy: 0.52, id: "povo2" })], props: EGITO, env: { terrain: "city", night: 0.28, glory: 0.6, verdure: 0.45 } }), // partem de Ramessés para Sucote: cerca de seiscentos mil homens a pé
      b(38, { cast: [C("multidao", 20, "walk", { dy: 0.48 }), C("multidao", 120, "walk", { scale: 0.9, dy: 0.52, id: "povo2" }), C("rebanho", 210, "walk", { dy: 0.42 })], env: { glory: 0.62 } }), // sobe com eles muita mistura de gente, ovelhas e bois
      b(39, { cast: [C("mulherComum", -40, "walk", { dy: 0.52, id: "mulher1", facing: 1 }), C("multidao", 60, "walk", { dy: 0.48 })], env: { glory: 0.6 } }), // cozem bolos ázimos da massa, porque foram lançados sem se deter
      b(40, { cast: [C("multidao", 0, "stand", { dy: 0.48 }), C("multidao", 110, "stand", { scale: 0.9, dy: 0.52, id: "povo2" })], env: { glory: 0.65 } }), // o tempo que habitaram no Egito foi de quatrocentos e trinta anos
      b(41, { cast: [C("moises", -110, "walk", { dy: 0.5, facing: 1 }), C("multidao", 30, "walk", { dy: 0.48 }), C("multidao", 140, "walk", { scale: 0.9, dy: 0.52, id: "povo2" })], env: { glory: 0.8, night: 0.2 } }), // passados os 430 anos, todos os exércitos do Senhor saíram do Egito
      b(42, { env: { glory: 0.75, night: 0.3 } }), // esta noite se guardará ao Senhor, a noite em que os tirou do Egito
      b(43, { by: "deus", q: "Disse mais o Senhor a Moisés e a Arão: Esta é a ordenança da páscoa: ", set: "instrucao", cast: [C("moises", -50, "stand", { dy: 0.5, facing: 1 }), C("arao", 10, "stand", { dy: 0.5, facing: 1 })], props: EGITO, env: { terrain: "city", glory: 0.7, night: 0.28 } }), // "nenhum filho do estrangeiro comerá dela"
      b(44, { by: "deus" }), // "o servo comprado, depois de circuncidado, comerá dela"
      b(45, { by: "deus" }), // "o estrangeiro e o assalariado não comerão dela"
      b(46, { by: "deus" }), // "numa casa se comerá; não quebrareis osso dela"
      b(47, { by: "deus", env: { glory: 0.72 } }), // "toda a congregação de Israel o fará"
      b(48, { by: "deus" }), // "o estrangeiro que quiser celebrar a páscoa, seja-lhe circuncidado"
      b(49, { by: "deus" }), // "uma mesma lei haja para o natural e para o estrangeiro"
      b(50, { cast: [C("multidao", 20, "stand", { dy: 0.48 }), C("anciao", -60, "stand", { dy: 0.5 }), C("multidao", 120, "stand", { scale: 0.9, dy: 0.52, id: "povo2" })], env: { glory: 0.75 } }), // todos os filhos de Israel fazem como o Senhor ordenara
      b(51, { set: "saida", cast: [C("moises", -120, "walk", { dy: 0.5, facing: 1 }), C("arao", -70, "walk", { dy: 0.5, facing: 1 }), C("multidao", 30, "walk", { dy: 0.48 }), C("multidao", 150, "walk", { scale: 0.9, dy: 0.52, id: "povo2" })], props: EGITO, env: { terrain: "city", glory: 0.9, night: 0.15, verdure: 0.5 } }), // naquele mesmo dia o Senhor tirou os filhos de Israel do Egito, segundo os seus exércitos
    ],
  },
};
