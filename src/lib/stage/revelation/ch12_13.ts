// ============================================================================
// APOCALIPSE 12–13 — roteiro do modo CENA VIVA (sets fixos).
//
// Ap 12 — A MULHER E O DRAGÃO: o grande sinal no céu (a mulher vestida do
// sol, com a coroa de doze estrelas), o dragão vermelho cuja cauda arrasta a
// terça parte das estrelas, o filho arrebatado para o trono, a fuga da mulher
// ao deserto, a GUERRA NO CÉU (Miguel contra o dragão), a grande voz de
// vitória, a perseguição na terra (asas de águia, o rio da boca da serpente)
// e a ira final contra o remanescente da sua semente.
// Ap 13 — AS DUAS BESTAS: João na areia do mar vê subir a BESTA DO MAR
// (leopardo/urso/leão) a quem o dragão dá o seu poder; a terra inteira se
// maravilha e ADORA (inversão trágica da adoração), blasfêmias e guerra aos
// santos; depois a BESTA DA TERRA (dois chifres de cordeiro, voz de dragão)
// faz fogo descer do céu, ergue a IMAGEM da primeira besta, impõe a MARCA
// na mão e na testa — e o capítulo se fecha, grave, no número 666.
//
// Cada beat = 1 versículo (texto ARC em runtime). `by` = quem fala;
// `q` = onde começa a citação; `cast`/`props` SUBSTITUEM os anteriores.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });

// ---------------------------------------------------------------- decoração
// O FIRMAMENTO do grande sinal (Ap 12): estrelas fixas nas bordas do céu.
// (corredor de extras dx -100..-190 fica LIVRE na decoração fixa)
const FIRMAMENT: StagePropSpec[] = [
  P("star", -285, 0.7, undefined, 0.06),
  P("star", -225, 0.5, undefined, 0.3),
  P("star", 240, 0.7, undefined, 0.08),
  P("star", 300, 0.5, undefined, 0.3),
  P("star", -60, 0.45, undefined, 0.04),
  P("star", 120, 0.5, undefined, 0.05),
];

// a coroa de doze estrelas sobre a cabeça da mulher (Ap 12:1) — dx 20 = a marca dela
const CROWN_STAR = P("star", 20, 0.4, undefined, 0.02);

// a terça parte das estrelas arrastadas pela cauda, lançadas sobre a terra (12:4)
const TAIL_STARS: StagePropSpec[] = [
  P("star", -140, 0.6, undefined, 0.5),      // uma cai no corredor de extras
  P("star", 180, 0.5, undefined, 0.62),
  P("star", -260, 0.5, undefined, 0.66),
];

// o trono de Deus, para onde o filho é arrebatado (12:5) — vaga dos extras
const GOD_THRONE = P("throne", -140, 1.05, undefined, 0.08);

// O DESERTO da mulher (12:6, 13-17): lugar árido com a TENDA preparada por
// Deus ("onde já tinha lugar preparado") no corredor de extras.
const DESERT: StagePropSpec[] = [
  P("tent", -140, 1.1, undefined, 0.22),     // o lugar preparado por Deus
  P("palm", -300, 0.95, undefined, 0.14),
  P("rock", -240, 1.05, undefined, 0.5),
  P("rock", 250, 0.9, undefined, 0.55),
  P("rock", 315, 0.8, undefined, 0.3),
  P("bush", 170, 0.9, undefined, 0.35),
  P("bush", -70, 0.85, undefined, 0.1),
  P("grass", -40, 1, undefined, 0.8),
  P("grass", 130, 1, undefined, 0.78),
  P("grass", -280, 0.9, undefined, 0.72),
  P("grass", 210, 0.9, undefined, 0.68),
];

// o rio que a serpente lança da boca atrás da mulher (12:15)
const SERPENT_RIVER = P("river", 60, 1.2, undefined, 0.6);

// A BEIRA DO MAR (Ap 13:1-10): areia, palmeiras e rochas — a besta sobe do mar.
const SEASHORE: StagePropSpec[] = [
  P("palm", -270, 1.1, undefined, 0.12),
  P("palm", 255, 1.0, undefined, 0.1),
  P("palm", 310, 0.85, undefined, 0.42),
  P("rock", -230, 0.85, undefined, 0.55),
  P("rock", 150, 0.7, undefined, 0.75),
  P("rock", -320, 0.9, undefined, 0.35),
  P("bush", -210, 0.9, undefined, 0.25),
  P("grass", -50, 1, undefined, 0.82),
  P("grass", 200, 1, undefined, 0.8),
  P("grass", -290, 0.9, undefined, 0.7),
];

// A TERRA (Ap 13:11-18): campo de onde sobe a segunda besta.
const EARTH_FIELD: StagePropSpec[] = [
  P("tree", -280, 1.15, undefined, 0.1),
  P("tree", 265, 1.05, undefined, 0.12),
  P("tree", 90, 0.9, undefined, 0.05),
  P("rock", -235, 0.8, undefined, 0.6),
  P("bush", 165, 0.9, undefined, 0.4),
  P("bush", -310, 0.9, undefined, 0.5),
  P("grass", -45, 1, undefined, 0.82),
  P("grass", 210, 1, undefined, 0.85),
  P("grass", -270, 0.9, undefined, 0.72),
];

// o fogo que a segunda besta faz descer do céu à terra (13:13) — corredor de extras
const SKY_FIRE = P("campfire", -140, 1.1, 1, 0.25);

// o mercado onde ninguém compra nem vende sem o sinal (13:17)
const MARKET: StagePropSpec[] = [
  P("stall", 300, 1, undefined, 0.14),
  P("crate", 235, 0.9, undefined, 0.55),
  P("amphora", 130, 0.9, undefined, 0.6),
];

// ------------------------------------------------------------------- elenco
// João, testemunha lateral da visão (dy 0.6), presente em todo o díptico.
const JOAO = (pose = "stand", dx = -80, dy = 0.6): CastPlacement =>
  C("joao", dx, pose, { dy });

// A mulher vestida do sol — glow 0.8 (o sol que a veste). Aqui o papel `mulher`
// é PROPOSITAL: o motor a desenha sempre dourada e em pé, que é exatamente a
// figura de glória de Ap 12. Por isso ele IGNORA a pose — não a declaramos, para
// o código não prometer um gesto que nunca aparece.
const WOMAN = (dx: number, _pose = "stand", extra: Partial<CastPlacement> = {}): CastPlacement =>
  C("mulher", dx, undefined, { dy: 0.42, glow: 0.8, ...extra });

// O grande dragão vermelho.
const DRAGON = (dx: number, pose: string, dy: number, extra: Partial<CastPlacement> = {}): CastPlacement =>
  C("dragao", dx, pose, { dy, ...extra });

// Miguel e os seus anjos (12:7-12) — Miguel é o porta-voz da vitória.
const MICHAEL = (dx: number, pose = "flyIdle", glow = 0.9): CastPlacement =>
  C("anjo", dx, pose, { dy: 0.28, glow, facing: 1 });
const MICHAEL_HOST = C("anjo", -115, "flyIdle", { dy: 0.18, glow: 0.6, id: "anjo2" });

// A besta do mar (leopardo, urso, leão) e a besta da terra (dois chifres).
const SEA_BEAST = (dx: number, dy: number, pose = "stand", extra: Partial<CastPlacement> = {}): CastPlacement =>
  C("besta", dx, pose, { dy, palette: "mar", ...extra });
const EARTH_BEAST = (dx: number, dy: number, pose = "stand"): CastPlacement =>
  C("besta", dx, pose, { dy, palette: "terra", id: "bestaTerra" });
// a IMAGEM da primeira besta (13:14-15) — estátua na vaga dos extras
const BEAST_IMAGE = (glow = 0): CastPlacement =>
  C("besta", -140, "stand", { dy: 0.28, palette: "mar", scale: 0.85, glow, id: "imagem" });

// A terra que se maravilha e adora (13:3s) — multidão em duas camadas.
const CROWD = (pose: string, glow = 0.2): CastPlacement[] => [
  C("multidao", -210, pose, { dy: 0.52, glow }),               // porta-voz do "Quem é semelhante?"
  C("multidao", 250, pose, { dy: 0.5, glow, id: "multidao2" }),
];

// Os santos perseguidos (13:7, 10) — pequenos, fiéis, vencidos mas firmes.
const SAINTS = (pose: string, glow = 0.35): CastPlacement[] => [
  C("homem", -145, pose, { dy: 0.6, glow }),
  C("mulherComum", -100, pose, { dy: 0.55, glow }),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Ap 12
  // A MULHER E O DRAGÃO — arco de env: glória do sinal → tempestade do dragão
  // → glória plena da vitória de Miguel → noite da perseguição no deserto.
  12: {
    start: { terrain: "glory", night: 0.15, glory: 0.55 },
    beats: [
      // o grande sinal no céu: a mulher vestida do sol, coroa de doze estrelas
      b(1, {
        cast: [JOAO(), WOMAN(20)],
        props: [...FIRMAMENT, CROWN_STAR],
        env: { glory: 0.65 },
      }),                                                                       // a mulher vestida do sol
      // grávida, com dores de parto, gritando com ânsias
      b(2, { cast: [JOAO(), WOMAN(20, "kneel")], env: { night: 0.2 } }),        // dores de parto; gritava com ânsias
      // outro sinal: o grande dragão vermelho, sete cabeças e dez chifres
      b(3, {
        cast: [JOAO(), WOMAN(20, "kneel"), DRAGON(200, "flyIdle", 0.22)],
        env: { storm: 0.4, glory: 0.5 },
      }),                                                                       // o grande dragão vermelho
      // a cauda arrasta a terça parte das estrelas; o dragão para diante dela
      b(4, {
        cast: [JOAO(), WOMAN(20, "kneel"), DRAGON(105, "stand", 0.4, { facing: -1 })],
        props: [...FIRMAMENT, CROWN_STAR, ...TAIL_STARS],
        env: { storm: 0.5, night: 0.3 },
      }),                                                                       // a cauda arrasta as estrelas
      // nasce o filho homem — e é arrebatado para Deus e para o seu trono
      b(5, {
        cast: [JOAO("raise"), WOMAN(20, "raise"), DRAGON(105, "stand", 0.4, { facing: -1 }),
               C("homem", -100, "raise", { dy: 0.15, glow: 1, scale: 0.55, id: "filho" })],
        props: [...FIRMAMENT, CROWN_STAR, ...TAIL_STARS, GOD_THRONE],
        env: { glory: 1, storm: 0.3 },
      }),                                                                       // o filho arrebatado ao trono
      // a mulher foge para o deserto, ao lugar preparado por Deus
      b(6, {
        set: "deserto",
        env: { terrain: "field", night: 0.3, glory: 0.2, storm: 0.1 },
        cast: [JOAO("stand", 120, 0.62), WOMAN(-90, "walk", { facing: -1, glow: 0.6 })],
        props: DESERT,
      }),                                                                       // fuga ao deserto; 1260 dias
      // GUERRA NO CÉU: Miguel e os seus anjos contra o dragão
      b(7, {
        set: "guerraNoCeu",
        env: { terrain: "glory", storm: 0.7, glory: 0.45, night: 0.2 },
        cast: [JOAO("stand", -260, 0.62), MICHAEL(-55), MICHAEL_HOST, DRAGON(80, "flyIdle", 0.28, { facing: -1 })],
        props: FIRMAMENT,
      }),                                                                       // batalha no céu: Miguel vs dragão
      // mas não prevaleceram; o seu lugar não se achou mais nos céus
      b(8, {
        cast: [JOAO("stand", -260, 0.62), MICHAEL(-30, "raise"), MICHAEL_HOST, DRAGON(220, "flyIdle", 0.35, { facing: -1 })],
        env: { storm: 0.75, glory: 0.55 },
      }),                                                                       // o dragão não prevaleceu
      // o grande dragão precipitado — a antiga serpente, o Diabo e Satanás
      b(9, {
        cast: [JOAO("stand", -260, 0.62), MICHAEL(-30, "raise"), MICHAEL_HOST, DRAGON(250, "walk", 0.75, { facing: 1 })],
        env: { storm: 0.6, night: 0.3, glory: 0.6 },
      }),                                                                       // precipitado na terra com seus anjos
      // a grande voz no céu: "Agora é chegada a salvação…"
      b(10, {
        by: "anjo", q: "que dizia: ",
        cast: [JOAO("raise", -260, 0.62), MICHAEL(0, "raise", 1), MICHAEL_HOST],
        env: { glory: 0.85, storm: 0.25, night: 0.1 },
      }),                                                                       // "Agora é chegada a salvação"
      // e eles o venceram pelo sangue do Cordeiro
      b(11, { by: "anjo", env: { glory: 0.92, storm: 0.1 } }),                  // venceram pelo sangue do Cordeiro
      // alegrai-vos, ó céus — mas ai da terra e do mar: o diabo desceu
      b(12, { by: "anjo", env: { glory: 0.8, storm: 0.35, night: 0.25 } }),     // ai da terra: o diabo desceu
      // na terra: o dragão lançado persegue a mulher que dera à luz
      b(13, {
        set: "perseguicao",
        env: { terrain: "field", night: 0.35, storm: 0.45, glory: 0.15 },
        cast: [JOAO("stand", 300, 0.65), WOMAN(-180, "walk", { facing: -1, glow: 0.6, dy: 0.5 }), DRAGON(140, "walk", 0.45, { facing: -1 })],
        props: DESERT,
      }),                                                                       // o dragão persegue a mulher
      // as duas asas de grande águia — para o seu lugar, fora da vista da serpente
      b(14, {
        cast: [JOAO("stand", 300, 0.65), WOMAN(-260, "raise", { glow: 0.7, dy: 0.42 }), DRAGON(180, "stand", 0.45, { facing: -1 })],
        env: { glory: 0.35, storm: 0.3 },
      }),                                                                       // asas de águia; um tempo e tempos
      // a serpente lança da boca água como um rio atrás da mulher
      b(15, {
        cast: [JOAO("stand", 300, 0.65), WOMAN(-260, "stand", { glow: 0.7, dy: 0.42 }), DRAGON(130, "stand", 0.5, { facing: -1 })],
        props: [...DESERT, SERPENT_RIVER],
        env: { storm: 0.55, night: 0.4 },
      }),                                                                       // o rio da boca da serpente
      // a terra ajudou a mulher: abriu a boca e tragou o rio
      b(16, { props: DESERT, env: { storm: 0.3, glory: 0.3 } }),                // a terra tragou o rio
      // o dragão irado vai guerrear contra o remanescente da semente dela
      b(17, {
        cast: [JOAO("stand", 300, 0.65), WOMAN(-260, "stand", { glow: 0.7, dy: 0.42 }), DRAGON(40, "walk", 0.5, { facing: 1 }),
               C("multidao", 200, "stand", { dy: 0.55, glow: 0.35 })],
        env: { night: 0.5, storm: 0.5, glory: 0.2 },
      }),                                                                       // guerra ao remanescente fiel
    ],
  },

  // ------------------------------------------------------------------ Ap 13
  // AS DUAS BESTAS — arco de env: penumbra na beira do mar → trevas e
  // tempestade da blasfêmia → fogo dos falsos sinais → noite fechada da marca.
  13: {
    start: { terrain: "patmos", night: 0.35, glory: 0.1, storm: 0.2 },
    beats: [
      // "E eu pus-me sobre a areia do mar" — a besta sobe do mar
      b(1, {
        by: "joao",
        cast: [JOAO(), SEA_BEAST(80, 0.15, "walk")],
        props: SEASHORE,
        env: { storm: 0.4 },
      }),                                                                       // a besta do mar: sete cabeças
      // leopardo, pés de urso, boca de leão; o dragão lhe dá o seu poder
      b(2, {
        cast: [JOAO(), SEA_BEAST(40, 0.42), DRAGON(210, "flyIdle", 0.18)],
        env: { night: 0.4 },
      }),                                                                       // o dragão dá poder à besta
      // a chaga mortal curada — e toda a terra se maravilha após a besta
      b(3, {
        cast: [JOAO(), SEA_BEAST(40, 0.42), DRAGON(210, "flyIdle", 0.18), ...CROWD("stand")],
        env: { glory: 0.15 },
      }),                                                                       // chaga curada; a terra maravilhada
      // adoram o dragão e a besta: "Quem é semelhante à besta?"
      b(4, {
        by: "multidao", q: "dizendo: ",
        cast: [JOAO(), SEA_BEAST(40, 0.42), DRAGON(210, "flyIdle", 0.18), ...CROWD("bow", 0.15)],
        env: { night: 0.42 },
      }),                                                                       // a multidão adora a besta
      // a boca de grandes coisas e blasfêmias; quarenta e dois meses
      b(5, { env: { night: 0.45, storm: 0.45 } }),                              // boca de blasfêmias; 42 meses
      // blasfêmias contra Deus, o seu tabernáculo e os que habitam no céu
      b(6, { env: { storm: 0.55 } }),                                           // blasfema do nome de Deus
      // guerra aos santos — e poder sobre toda tribo, língua e nação
      b(7, {
        cast: [JOAO(), SEA_BEAST(40, 0.42), DRAGON(210, "flyIdle", 0.18), ...CROWD("bow", 0.15), ...SAINTS("kneel")],
        env: { night: 0.5, storm: 0.5 },
      }),                                                                       // guerra aos santos; vencê-los
      // adoram-na todos cujos nomes não estão no livro da vida do Cordeiro
      b(8, { env: { night: 0.55 } }),                                           // adoração de toda a terra
      // pausa solene: se alguém tem ouvidos, ouça
      b(9, { env: { storm: 0.3, glory: 0.2 } }),                                // "Se alguém tem ouvidos, ouça"
      // cativeiro e espada — aqui está a paciência e a fé dos santos
      b(10, {
        cast: [JOAO(), SEA_BEAST(40, 0.42), DRAGON(210, "flyIdle", 0.18), ...CROWD("bow", 0.15), ...SAINTS("stand", 0.5)],
        env: { glory: 0.25, night: 0.5 },
      }),                                                                       // a paciência e a fé dos santos
      // A BESTA DA TERRA: dois chifres de cordeiro, fala como o dragão
      b(11, {
        set: "terra",
        env: { terrain: "field", night: 0.35, storm: 0.2, glory: 0.1, fire: 0 },
        cast: [JOAO(), EARTH_BEAST(120, 0.45, "walk")],
        props: EARTH_FIELD,
      }),                                                                       // a besta da terra sobe
      // exerce o poder da primeira e faz a terra adorá-la
      b(12, {
        cast: [JOAO(), SEA_BEAST(-50, 0.35), EARTH_BEAST(100, 0.48), ...CROWD("bow", 0.15)],
        env: { night: 0.4 },
      }),                                                                       // faz adorar a primeira besta
      // grandes sinais: até fogo faz descer do céu à vista dos homens
      b(13, {
        props: [...EARTH_FIELD, SKY_FIRE],
        env: { fire: 0.4 },
      }),                                                                       // fogo desce do céu à terra
      // engana os habitantes: que façam uma IMAGEM à besta ferida que vivia
      b(14, {
        cast: [JOAO(), SEA_BEAST(-50, 0.35), EARTH_BEAST(60, 0.48, "point"), ...CROWD("stand", 0.15), BEAST_IMAGE()],
        env: { night: 0.45 },
      }),                                                                       // a imagem da primeira besta
      // dá espírito à imagem: ela fala — e mata quem não a adora
      b(15, {
        cast: [JOAO(), SEA_BEAST(-50, 0.35), EARTH_BEAST(60, 0.48), ...CROWD("bow", 0.15), BEAST_IMAGE(0.35),
               C("homem", 200, "lie", { dy: 0.62 })],
        env: { fire: 0.45, night: 0.5 },
      }),                                                                       // a imagem fala; mortos os fiéis
      // A MARCA: a todos, pequenos e grandes, na mão direita ou na testa
      b(16, {
        cast: [JOAO(), SEA_BEAST(-50, 0.35), EARTH_BEAST(60, 0.48), ...CROWD("raise", 0.15), BEAST_IMAGE(0.35),
               C("mulherComum", 170, "raise", { dy: 0.6 }), C("homem", -280, "raise", { dy: 0.55 })],
        env: { night: 0.6, fire: 0.2 },
      }),                                                                       // o sinal na mão e na testa
      // ninguém compra ou vende sem o sinal, o nome ou o número
      b(17, {
        props: [...EARTH_FIELD, ...MARKET],
        env: { night: 0.65 },
      }),                                                                       // sem o sinal: nem comprar nem vender
      // encerramento grave: aqui há sabedoria — o número é 666
      b(18, { env: { night: 0.7, storm: 0.5, fire: 0.15, glory: 0.05 } }),      // o número da besta: 666
    ],
  },
};
