// ============================================================================
// ÊXODO 23–24 — roteiro do modo CENA VIVA (força-tarefa AT, onda Êxodo).
//
// Êx 23 — O LIVRO DA ALIANÇA (parte II): a justiça nos tribunais, o descanso da
// terra e do sábado, as três festas anuais — e a grande promessa: "eis que eu
// envio um anjo diante de ti" para guardar o povo e introduzi-lo na terra.
//
// Êx 24 — A ALIANÇA SELADA: Moisés lê o livro da aliança e asperge o SANGUE
// sobre o altar e sobre o povo ("eis o sangue da aliança"); Moisés, Arão, Nadabe,
// Abiú e os setenta anciãos VEEM o Deus de Israel (safira sob os pés) e comem;
// depois Moisés sobe à nuvem e à glória-fogo do cume por quarenta dias.
//
// A VOZ DE DEUS (regra do projeto): a lei vem do céu, SEM figura — `by: "deus"`,
// glória e fogo no monte. Em Êx 24, a VISÃO de Deus (v.10-11) é pura glória (sem
// desenhar Deus). Nadabe/Abiú/Hur/Josué entram como `homem` com id próprio.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });

// ---------------------------------------------------------------------------
// O MONTE DA LEI (Sinai fumegante): o cume à frente e as tendas do arraial ao pé.
const MONTE: StagePropSpec[] = [
  { ...P("rock", 0, 1.75, undefined, 0.24), tag: "monte-sinai" },
  P("rock", -300, 1.1, undefined, 0.5),
  P("rock", 300, 1.05, undefined, 0.52),
  P("bush", -150, 0.75, undefined, 0.44),
  P("grass", -40, 0.78, undefined, 0.82),
  P("tent", -260, 0.95, undefined, 0.18),
  P("tent", 250, 0.9, undefined, 0.2),
];

// ---------------------------------------------------------------------------
// O ALTAR AO PÉ DO MONTE (Êx 24:4-8): o altar e os doze monumentos das tribos,
// onde se asperge o sangue da aliança.
const ALTAR_ALIANCA: StagePropSpec[] = [
  { ...P("altar", 0, 1.15, 0.5, 0.4), tag: "altar-alianca" },
  { ...P("rock", -110, 0.6, undefined, 0.56), tag: "doze-monumentos" },
  P("rock", -70, 0.55, undefined, 0.6),
  P("rock", 80, 0.55, undefined, 0.58),
  P("rock", 120, 0.6, undefined, 0.54),
  P("rock", -300, 1.15, undefined, 0.34),
  P("tent", -250, 0.9, undefined, 0.2),
  P("tent", 250, 0.9, undefined, 0.22),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Êx 23
  // A justiça e o cuidado com o inimigo → o descanso da terra e o sábado → as três
  // festas → e a promessa do anjo que vai adiante para introduzir na terra.
  23: {
    start: { terrain: "mountain", night: 0.3, glory: 0.72, storm: 0.25, fire: 0.66, verdure: 0.2 },
    beats: [
      b(1, { set: "monte", cast: [C("moises", -20, "kneel", { dy: 0.44, facing: 1 })], props: MONTE, env: { terrain: "mountain", glory: 0.78, fire: 0.66, night: 0.26 } }), // "não admitirás falso boato, nem serás testemunha falsa com o ímpio"
      b(2, { by: "deus" }), // "não seguirás a multidão para fazer o mal, nem torcerás o direito"
      b(3, { by: "deus" }), // "nem ao pobre favorecerás na sua demanda"
      b(4, { by: "deus", env: { glory: 0.8 } }), // "se encontrares o boi do teu inimigo desgarrado, sem falta lho reconduzirás"
      b(5, { by: "deus", env: { glory: 0.82 } }), // "se vires o jumento do que te odeia caído, certamente o ajudarás a levantá-lo"
      b(6, { by: "deus" }), // "não perverterás o direito do teu pobre na sua demanda"
      b(7, { by: "deus", env: { fire: 0.72 } }), // "de palavras de falsidade te afastarás; não matarás o inocente e o justo"
      b(8, { by: "deus" }), // "suborno não tomarás, porque o suborno cega os que têm vista"
      b(9, { by: "deus", env: { glory: 0.8 } }), // "não oprimirás o estrangeiro; pois fostes estrangeiros no Egito"
      b(10, { by: "deus", env: { glory: 0.76, fire: 0.6, verdure: 0.35 } }), // "seis anos semearás a tua terra e recolherás os frutos"
      b(11, { by: "deus", env: { verdure: 0.4 } }), // "ao sétimo a deixarás descansar, para que comam os pobres do teu povo"
      b(12, { by: "deus", env: { glory: 0.8 } }), // "seis dias trabalharás, mas ao sétimo descansarás; para que descanse o teu boi"
      b(13, { by: "deus", env: { fire: 0.7 } }), // "guardai-vos em tudo; do nome de outros deuses nem vos lembreis"
      b(14, { by: "deus", env: { glory: 0.82 } }), // "três vezes no ano me celebrareis festa"
      b(15, { by: "deus" }), // "a festa dos ázimos guardarás... ninguém apareça vazio perante mim"
      b(16, { by: "deus", env: { verdure: 0.45 } }), // "a festa da sega dos primeiros frutos e a festa da colheita à saída do ano"
      b(17, { by: "deus", env: { glory: 0.84 } }), // "três vezes no ano todos os teus homens aparecerão diante do Senhor DEUS"
      b(18, { by: "deus" }), // "não oferecerás o sangue do meu sacrifício com pão levedado"
      b(19, { by: "deus" }), // "as primícias trarás à casa do Senhor; não cozerás o cabrito no leite da mãe"
      b(20, { by: "deus", env: { glory: 0.88, fire: 0.6 } }), // "eis que eu envio um anjo diante de ti, para te guardar pelo caminho"
      b(21, { by: "deus", env: { glory: 0.85 } }), // "ouve a sua voz, não o provoques; porque o meu nome está nele"
      b(22, { by: "deus" }), // "se ouvires a sua voz, serei inimigo dos teus inimigos"
      b(23, { by: "deus", env: { fire: 0.7 } }), // "o meu anjo irá adiante de ti e te levará aos amorreus, heteus e cananeus"
      b(24, { by: "deus", env: { storm: 0.3 } }), // "não te inclinarás diante dos seus deuses; antes quebrarás as suas estátuas"
      b(25, { by: "deus", env: { glory: 0.86, verdure: 0.4, storm: 0 } }), // "servireis ao Senhor, e ele abençoará o teu pão e a tua água"
      b(26, { by: "deus", env: { glory: 0.85 } }), // "não haverá mulher que aborte, nem estéril; o número dos teus dias cumprirei"
      b(27, { by: "deus", env: { storm: 0.3, fire: 0.68 } }), // "enviarei o meu terror adiante de ti, e os teus inimigos te voltarão as costas"
      b(28, { by: "deus" }), // "enviarei vespões que lancem fora os heveus, cananeus e heteus"
      b(29, { by: "deus", env: { verdure: 0.4 } }), // "não os lançarei fora num só ano, para que a terra não se torne deserto"
      b(30, { by: "deus" }), // "pouco a pouco os lançarei, até que sejas multiplicado e possuas a terra"
      b(31, { by: "deus", env: { glory: 0.84 } }), // "porei os teus termos desde o Mar Vermelho até ao rio"
      b(32, { by: "deus", env: { fire: 0.72 } }), // "não farás aliança alguma com eles, nem com os seus deuses"
      b(33, { by: "deus" }), // "na tua terra não habitarão, para que não te façam pecar contra mim"
    ],
  },

  // ------------------------------------------------------------------ Êx 24
  // O "sim" do povo → o altar e os doze monumentos → o sangue da aliança sobre o
  // povo → a visão do Deus de Israel (safira e glória) → e a subida de Moisés à
  // nuvem e ao fogo do cume por quarenta dias.
  24: {
    start: { terrain: "mountain", night: 0.24, glory: 0.75, storm: 0.2, fire: 0.6, verdure: 0.25 },
    beats: [
      b(1, { by: "deus", q: "Depois disse a Moisés: ", set: "monte", cast: [C("moises", -20, "stand", { dy: 0.44, facing: 1 })], props: MONTE, env: { terrain: "mountain", glory: 0.8, fire: 0.6, night: 0.22 } }), // "sobe ao SENHOR, tu e Arão, Nadabe e Abiú, e setenta anciãos; e adorai de longe"
      b(2, { by: "deus" }), // "só Moisés se chegará ao Senhor; o povo não suba com ele"
      b(3, { by: "multidao", q: "e disse: ", set: "altar", cast: [C("moises", -90, "point", { dy: 0.5, facing: 1 }), C("multidao", 30, "raise", { dy: 0.48 }), C("multidao", 140, "stand", { scale: 0.9, dy: 0.52, id: "povo2" })], props: ALTAR_ALIANCA, env: { terrain: "mountain", glory: 0.7, fire: 0.4, night: 0.16 } }), // Moisés conta ao povo, que responde: "Todas as palavras do Senhor faremos"
      b(4, { cast: [C("moises", -20, "write", { dy: 0.5, facing: 1 }), C("multidao", 120, "stand", { scale: 0.9, dy: 0.5, id: "povo2" })], env: { glory: 0.68 } }), // Moisés escreve as palavras, edifica um altar e doze monumentos das tribos
      b(5, { cast: [C("homem", -70, "raise", { dy: 0.5, id: "jovem", facing: 1 }), C("homem", 60, "stand", { dy: 0.5, id: "jovem2", facing: -1 }), C("moises", -140, "stand", { dy: 0.5, facing: 1 })], env: { fire: 0.55, glory: 0.65 } }), // jovens oferecem holocaustos e sacrifícios pacíficos de bezerros
      b(6, { cast: [C("moises", -30, "raise", { dy: 0.5, facing: 1 })], env: { fire: 0.5, glory: 0.7 } }), // Moisés toma metade do sangue em bacias e espargue a outra sobre o altar
      b(7, { by: "multidao", q: "e eles disseram: ", cast: [C("moises", -80, "write", { dy: 0.5, facing: 1 }), C("multidao", 30, "raise", { dy: 0.48 }), C("multidao", 130, "stand", { scale: 0.9, dy: 0.52, id: "povo2" })], env: { glory: 0.72 } }), // Moisés lê o livro da aliança: "Tudo o que o Senhor falou faremos, e obedeceremos"
      b(8, { by: "moises", q: "e disse: ", cast: [C("moises", -60, "raise", { dy: 0.5, facing: 1 }), C("multidao", 40, "bow", { dy: 0.5 })], env: { glory: 0.8, fire: 0.4 } }), // Moisés espargue o sangue sobre o povo: "Eis o sangue da aliança que o Senhor fez convosco"
      b(9, { cast: [C("moises", -110, "walk", { dy: 0.44, facing: 1 }), C("arao", -60, "walk", { dy: 0.46, facing: 1 }), C("homem", -10, "walk", { dy: 0.46, id: "nadabe", facing: 1 }), C("homem", 40, "walk", { dy: 0.48, id: "abiu", facing: 1 }), C("anciao", 110, "walk", { scale: 0.9, dy: 0.5, id: "anciaos", facing: 1 })], env: { glory: 0.82, fire: 0.5, night: 0.18 } }), // sobem Moisés, Arão, Nadabe, Abiú e setenta dos anciãos de Israel
      b(10, { cast: [C("moises", -90, "raise", { dy: 0.42, facing: 1 }), C("arao", -40, "bow", { dy: 0.44, facing: 1 }), C("anciao", 60, "bow", { scale: 0.9, dy: 0.48, id: "anciaos" })], env: { glory: 1, fire: 0.3, night: 0.08, water: 0.3 } }), // veem o Deus de Israel; sob os pés, como safira, clara como o céu
      b(11, { cast: [C("moises", -90, "stand", { dy: 0.42, facing: 1 }), C("arao", -40, "stand", { dy: 0.44, facing: 1 }), C("homem", 10, "stand", { dy: 0.46, id: "nadabe", facing: 1 }), C("anciao", 80, "stand", { scale: 0.9, dy: 0.48, id: "anciaos" })], env: { glory: 0.95, night: 0.06 } }), // não estende a mão sobre os escolhidos; e eles veem a Deus, e comem e bebem
      b(12, { by: "deus", q: "Então disse o Senhor a Moisés: ", cast: [C("moises", -40, "stand", { dy: 0.44, facing: 1 })], env: { glory: 0.9, fire: 0.5 } }), // "sobe a mim ao monte e fica lá; dar-te-ei as tábuas de pedra e a lei"
      b(13, { cast: [C("moises", -60, "walk", { dy: 0.42, facing: 1 }), C("homem", -110, "walk", { dy: 0.46, id: "josue", facing: 1 })], env: { glory: 0.85, fire: 0.55, night: 0.14 } }), // Moisés se levanta com Josué, seu servidor, e sobe ao monte de Deus
      b(14, { by: "moises", q: "E disse aos anciãos: ", set: "altar", cast: [C("moises", -70, "point", { dy: 0.5, facing: 1 }), C("anciao", 20, "stand", { dy: 0.5, facing: -1 }), C("arao", 90, "stand", { dy: 0.5, id: "arao", facing: -1 }), C("homem", 150, "stand", { dy: 0.52, id: "hur", facing: -1 })], props: ALTAR_ALIANCA, env: { water: 0, terrain: "mountain", glory: 0.7, fire: 0.4, night: 0.16 } }), // "esperai-nos aqui; Arão e Hur ficam convosco para os negócios"
      b(15, { set: "monte", cast: [C("moises", -40, "walk", { dy: 0.4, facing: 1 })], props: MONTE, env: { water: 0, terrain: "mountain", glory: 0.82, fire: 0.5, night: 0.2 } }), // subindo Moisés ao monte, a nuvem cobre o monte
      b(16, { cast: [C("moises", -30, "stand", { dy: 0.4, facing: 1 })], env: { glory: 0.92, fire: 0.55, night: 0.16 } }), // a glória do Senhor repousa sobre o Sinai; a nuvem o cobre seis dias
      b(17, { env: { glory: 0.9, fire: 0.85, storm: 0.3, night: 0.24 } }), // a glória do Senhor era como fogo consumidor no cume, aos olhos de Israel
      b(18, { cast: [C("moises", -10, "walk", { dy: 0.38, facing: 1 })], env: { glory: 0.95, fire: 0.75, night: 0.3 } }), // Moisés entra na nuvem e permanece no monte quarenta dias e quarenta noites
    ],
  },
};
