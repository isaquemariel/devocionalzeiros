// ============================================================================
// ÊXODO 9–10 — roteiro do modo CENA VIVA (força-tarefa AT, onda Êxodo).
//
// Êx 9 — GADO, ÚLCERAS E SARAIVA: a peste que fere só o gado dos egípcios (Gósen
// intacta); a cinza do forno que vira sarna nos homens e magos; e a saraiva
// grave "com fogo misturado" que quebra as árvores do campo — o clímax das
// pragas da natureza.
//
// Êx 10 — GAFANHOTOS E TREVAS: o vento oriental que traz os gafanhotos até não
// ficar "verde algum"; depois as TREVAS "que se apalpem" por três dias — mas
// Israel tinha luz nas suas habitações. Faraó bane Moisés de sua face.
//
// A VOZ DE DEUS (regra do projeto): sem mediador visível, Deus fala do céu a
// Moisés — `by: "deus"`, glória no ambiente, SEM figura. As pragas entram pelo
// AMBIENTE (peste/tempestade/fogo/trevas) e pela reação do elenco. Faraó fala
// com `by: "farao"`; servos e magos com `by: "homem"`.
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
// O EGITO (cidade) e O CAMPO (a lavoura e o gado): onde caem a peste, a saraiva
// e os gafanhotos.
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
const CAMPO: StagePropSpec[] = [
  P("tree", -250, 1.1, undefined, 0.1),
  P("tree", 240, 0.95, undefined, 0.14),
  P("bush", 150, 0.85, undefined, 0.4),
  P("bush", -140, 0.8, undefined, 0.42),
  P("grass", -40, 0.9, undefined, 0.8),
  P("grass", 60, 0.85, undefined, 0.76),
  P("rock", 300, 0.9, undefined, 0.5),
  P("well", -300, 0.9, undefined, 0.3),
];
// a seara ferida pela saraiva (Êx 9:31-32): o linho e a cevada em feixes
const CAMPO_SEARA: StagePropSpec[] = [...CAMPO, P("sheaf", 100, 0.85, undefined, 0.6), P("sheaf", -90, 0.8, undefined, 0.62)];
// A SARAIVA E O FOGO (Êx 9:23-25): "havia saraiva, e fogo misturado com a
// saraiva, mui grave" — o fogo desce e CORRE pela terra, sob uma tempestade
// negra que quebra as árvores do campo.
const CAMPO_SARAIVA: StagePropSpec[] = [
  { kind: "clouds", dx: 0, dy: 0.52, scale: 2.1, sky: true },      // a nuvem de tempestade
  { kind: "clouds", dx: -190, dy: 0.68, scale: 1.4, sky: true },
  { kind: "clouds", dx: 200, dy: 0.62, scale: 1.35, sky: true },
  P("tree", -250, 1.1, undefined, 0.1),
  P("tree", 240, 0.95, undefined, 0.14),
  P("campfire", 44, 1.5, 1, 0.6),                                  // o fogo correndo pela terra
  P("campfire", -120, 1.3, 1, 0.68),
  P("campfire", 176, 1.35, 1, 0.56),
  P("campfire", -34, 1.15, 1, 0.8),
  P("hail", -70, 1.1, undefined, 0.74),                            // a saraiva caindo e amontoada
  P("hail", 110, 1.0, undefined, 0.62),
  P("hail", 20, 1.0, undefined, 0.86),
  P("rock", 300, 0.9, undefined, 0.5),
  P("well", -300, 0.9, undefined, 0.3),
];
// OS GAFANHOTOS (Êx 10:13-15): o vento oriental os traz e cobrem a face de
// toda a terra, escurecendo-a e devorando toda a erva — nada verde sobra.
const GAFANHOTOS: StagePropSpec[] = [
  P("tree", -250, 1.1, undefined, 0.1),
  P("tree", 240, 0.95, undefined, 0.14),
  P("well", -300, 0.9, undefined, 0.3),
  P("rock", 300, 0.9, undefined, 0.5),
  { ...P("locusts", 30, 1.25, undefined, 0.5), tag: "praga-gafanhotos" },
  P("locusts", -170, 1.0, undefined, 0.66),
  P("locusts", 200, 1.0, undefined, 0.6),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Êx 9
  // A peste sobre o gado (Gósen intacta) → a cinza do forno em úlceras → e a
  // saraiva com fogo que arrasa o campo, até Faraó confessar "pequei" — e, cessada
  // a chuva, endurecer de novo.
  9: {
    start: { terrain: "city", night: 0.16, glory: 0.55, storm: 0, fire: 0, verdure: 0.5 },
    beats: [
      b(1, { by: "deus", q: "Depois o SENHOR disse a Moisés: Vai a Faraó, e dize-lhe: Assim diz o SENHOR Deus dos hebreus: ", set: "envio", cast: [C("moises", -20, "kneel", { dy: 0.5, facing: 1 })], props: EGITO, env: { terrain: "city", glory: 0.65, night: 0.12 } }), // "Deixa ir o meu povo, para que me sirva"
      b(2, { by: "deus" }), // "se recusares deixá-los ir, e ainda por força os detiveres"
      b(3, { by: "deus", env: { glory: 0.6, storm: 0.2 } }), // "a mão do Senhor será sobre teu gado... com pestilência gravíssima"
      b(4, { by: "deus", env: { glory: 0.7 } }), // "o Senhor fará separação entre o gado dos israelitas e o dos egípcios"
      b(5, { by: "deus", q: "E o Senhor assinalou certo tempo, dizendo: ", env: { glory: 0.65 } }), // "Amanhã fará o Senhor esta coisa na terra"
      b(6, { set: "campo", cast: [C("rebanho", 60, "lie", { dy: 0.5 }), C("rebanho", 160, "lie", { scale: 0.8, dy: 0.56, id: "gado2" }), C("moises", -110, "stand", { dy: 0.5, facing: 1 })], props: CAMPO, env: { terrain: "field", storm: 0.3, night: 0.3, glory: 0.2, verdure: 0.4 } }), // todo o gado dos egípcios morre; do de Israel, nenhum
      b(7, { set: "palacio", cast: [C("farao", 90, "point", { dy: 0.44, facing: -1 }), C("homem", 20, "stand", { dy: 0.5, id: "servo", facing: 1 })], props: PALACIO, env: { terrain: "city", storm: 0.1, night: 0.24, glory: 0.15 } }), // Faraó envia a ver; o coração se agrava, e não deixa ir o povo
      b(8, { by: "deus", q: "Então disse o Senhor a Moisés e a Arão: ", cast: [C("moises", -60, "stand", { dy: 0.5, facing: 1 }), C("arao", -10, "stand", { dy: 0.5, facing: 1 }), C("farao", 90, "stand", { dy: 0.44, facing: -1 })], env: { glory: 0.6 } }), // "Tomai cinza do forno, e Moisés a espalhe para o céu diante de Faraó"
      b(9, { by: "deus", env: { glory: 0.55, storm: 0.15 } }), // "tornar-se-á em pó miúdo... em sarna, que arrebente em úlceras"
      b(10, { cast: [C("moises", -30, "raise", { dy: 0.5, facing: -1 }), C("farao", 90, "stand", { dy: 0.44, facing: -1 }), C("homem", 20, "bow", { dy: 0.5, id: "servo", facing: 1 })], env: { storm: 0.3, night: 0.22, glory: 0.2 } }), // Moisés espalha a cinza; sarna com úlceras nos homens e no gado
      b(11, { cast: [C("homem", 40, "kneel", { dy: 0.52, id: "mago", facing: 1 }), C("homem", 120, "bow", { dy: 0.54, id: "mago2", facing: 1 }), C("moises", -60, "stand", { dy: 0.5, facing: -1 })], env: { storm: 0.3, glory: 0.25 } }), // os magos não podem parar diante de Moisés, por causa da sarna
      b(12, { cast: [C("farao", 60, "stand", { dy: 0.44, facing: -1 })], env: { night: 0.32, glory: 0.12, storm: 0.1 } }), // o Senhor endurece o coração de Faraó, e não os ouve
      b(13, { by: "deus", q: "Então disse o Senhor a Moisés: Levanta-te pela manhã cedo, e põe-te diante de Faraó, e dize-lhe: Assim diz o Senhor Deus dos hebreus: ", set: "envio", cast: [C("moises", -20, "stand", { dy: 0.5, facing: 1 })], props: EGITO, env: { terrain: "city", storm: 0, night: 0.14, glory: 0.6 } }), // "Deixa ir o meu povo, para que me sirva"
      b(14, { by: "deus", env: { glory: 0.65, storm: 0.15 } }), // "esta vez enviarei todas as minhas pragas... para que saibas que não há outro como eu"
      b(15, { by: "deus" }), // "tenho estendido minha mão, para te ferir a ti e ao teu povo com pestilência"
      b(16, { by: "deus", env: { glory: 0.7 } }), // "para isto te mantive, para mostrar meu poder... e o meu nome ser anunciado"
      b(17, { by: "deus" }), // "Tu ainda te exaltas contra o meu povo, para não o deixar ir?"
      b(18, { by: "deus", env: { storm: 0.3, fire: 0.2, glory: 0.55 } }), // "amanhã farei chover saraiva mui grave, qual nunca houve no Egito"
      b(19, { by: "deus", env: { storm: 0.35 } }), // "recolhe o teu gado... o que ficar no campo, a saraiva cairá sobre eles"
      b(20, { set: "campo", cast: [C("homem", -20, "walk", { dy: 0.5, id: "servo", facing: -1 }), C("rebanho", -120, "walk", { dy: 0.5, id: "gado3" })], props: CAMPO, env: { terrain: "field", storm: 0.2, night: 0.24, glory: 0.2, verdure: 0.4 } }), // quem temia a palavra do Senhor recolhe às casas os servos e o gado
      b(21, { cast: [C("rebanho", 80, "stand", { dy: 0.5 }), C("rebanho", 170, "stand", { scale: 0.8, dy: 0.56, id: "gado2" }), C("homem", -140, "stand", { dy: 0.5, id: "servo2", facing: -1 })], env: { storm: 0.25, night: 0.28 } }), // quem não considerou deixa os servos e o gado no campo
      b(22, { by: "deus", q: "Então disse o Senhor a Moisés: ", cast: [C("moises", -30, "stand", { dy: 0.5, facing: 1 })], env: { glory: 0.55, storm: 0.35 } }), // "Estende a tua mão para o céu, e haverá saraiva em toda a terra do Egito"
      b(23, { set: "saraiva", props: CAMPO_SARAIVA, cast: [C("moises", -30, "raise", { dy: 0.5, facing: -1 })], env: { terrain: "field", storm: 0.7, fire: 0.5, night: 0.5, glory: 0.3, verdure: 0.25 } }), // Moisés estende a vara: trovões, saraiva e fogo correndo pela terra
      b(24, { env: { storm: 0.85, fire: 0.65, night: 0.45, glory: 0.25 } }), // saraiva e fogo misturado, tão grave qual nunca houve no Egito
      b(25, { cast: [C("moises", -30, "stand", { dy: 0.5, facing: -1 })], env: { storm: 0.8, fire: 0.55, verdure: 0.08 } }), // a saraiva fere tudo no campo e quebra as árvores
      b(26, { set: "gosen", cast: [C("multidao", 0, "stand", { dy: 0.46 }), C("multidao", 120, "stand", { scale: 0.9, dy: 0.5, id: "povo2" })], props: CAMPO, env: { terrain: "field", storm: 0, fire: 0, night: 0.12, glory: 0.55, verdure: 0.65 } }), // somente em Gósen, onde estão os filhos de Israel, não há saraiva
      b(27, { by: "farao", q: "e disse-lhes: ", set: "palacio", cast: [C("farao", 90, "bow", { dy: 0.44, facing: -1 }), C("moises", -60, "stand", { dy: 0.5, facing: 1 }), C("arao", -10, "stand", { dy: 0.5, facing: 1 })], props: PALACIO, env: { terrain: "city", storm: 0.4, fire: 0.25, night: 0.3, glory: 0.2 } }), // "Esta vez pequei; o Senhor é justo, mas eu e o meu povo ímpios"
      b(28, { by: "farao", q: "Orai ao Senhor " }), // "(pois que basta) para que não haja mais trovões... e eu vos deixarei ir"
      b(29, { by: "moises", q: "Então lhe disse Moisés: ", cast: [C("farao", 90, "stand", { dy: 0.44, facing: -1 }), C("moises", -60, "point", { dy: 0.5, facing: 1 }), C("arao", -10, "stand", { dy: 0.5, facing: 1 })], env: { glory: 0.4 } }), // "Em saindo da cidade estenderei minhas mãos ao Senhor; os trovões cessarão"
      b(30, { by: "moises" }), // "quanto a ti e aos teus servos, eu sei que ainda não temereis diante do Senhor Deus"
      b(31, { set: "campo", cast: [C("moises", -80, "stand", { dy: 0.5, facing: 1 })], props: CAMPO_SEARA, env: { terrain: "field", storm: 0.5, fire: 0.3, night: 0.3, verdure: 0.2 } }), // o linho e a cevada são feridos, porque já estavam na espiga
      b(32, { env: { storm: 0.4, verdure: 0.3 } }), // mas o trigo e o centeio não foram feridos, porque estavam cobertos
      b(33, { cast: [C("moises", -20, "raise", { dy: 0.5, facing: 1 })], env: { storm: 0, fire: 0, night: 0.16, glory: 0.5 } }), // Moisés sai da cidade e estende as mãos; cessam os trovões e a saraiva
      b(34, { set: "palacio", cast: [C("farao", 60, "stand", { dy: 0.44, facing: -1 })], props: PALACIO, env: { terrain: "city", night: 0.3, glory: 0.12, storm: 0.1 } }), // vendo cessar a chuva, Faraó peca ainda mais e endurece o coração
      b(35, { env: { night: 0.34, glory: 0.1 } }), // o coração de Faraó se endurece, e não deixa ir os filhos de Israel
    ],
  },

  // ------------------------------------------------------------------ Êx 10
  // O vento oriental que traz os gafanhotos (nada verde sobra) → as trevas que se
  // apalpem, com Israel na luz → e Faraó que bane Moisés de sua face para sempre.
  10: {
    start: { terrain: "city", night: 0.18, glory: 0.5, storm: 0, fire: 0, verdure: 0.4 },
    beats: [
      b(1, { by: "deus", q: "Depois disse o SENHOR a Moisés: ", set: "envio", cast: [C("moises", -20, "kneel", { dy: 0.5, facing: 1 })], props: EGITO, env: { terrain: "city", glory: 0.6, night: 0.14 } }), // "Vai a Faraó, porque tenho endurecido o seu coração, para fazer estes meus sinais"
      b(2, { by: "deus", env: { glory: 0.7 } }), // "para que contes aos teus filhos... para que saibais que eu sou o Senhor"
      b(3, { by: "moises", q: "Assim diz o Senhor Deus dos hebreus: ", set: "palacio", cast: [C("farao", 90, "stand", { dy: 0.44, facing: -1 }), C("moises", -60, "point", { dy: 0.5, facing: 1 }), C("arao", -10, "stand", { dy: 0.5, facing: 1 })], props: PALACIO, env: { terrain: "city", glory: 0.4, night: 0.16 } }), // "Até quando recusarás humilhar-te diante de mim? Deixa ir o meu povo"
      b(4, { by: "moises", env: { storm: 0.15 } }), // "se recusares deixar ir o meu povo, trarei amanhã gafanhotos aos teus termos"
      b(5, { by: "moises" }), // "cobrirão a face da terra... comerão o restante que escapou da saraiva"
      b(6, { by: "moises", cast: [C("moises", -60, "walk", { dy: 0.5, facing: 1 }), C("arao", -110, "walk", { dy: 0.5, facing: 1 }), C("farao", 90, "stand", { dy: 0.44, facing: -1 })], env: { night: 0.2 } }), // "encherão as tuas casas... quais nunca viram teus pais". E saiu de Faraó
      b(7, { by: "homem", q: "E os servos de Faraó disseram-lhe: ", cast: [C("farao", 90, "stand", { dy: 0.44, facing: -1 }), C("homem", 20, "point", { dy: 0.5, id: "servo", facing: 1 }), C("homem", -40, "stand", { dy: 0.52, id: "servo2", facing: 1 })], env: { glory: 0.3 } }), // "Até quando este homem nos há de ser por laço?... o Egito está destruído?"
      b(8, { by: "farao", q: "e ele disse-lhes: ", cast: [C("farao", 90, "point", { dy: 0.44, facing: -1 }), C("moises", -60, "stand", { dy: 0.5, facing: 1 }), C("arao", -10, "stand", { dy: 0.5, facing: 1 })] }), // "Ide, servi ao Senhor vosso Deus. Quais são os que hão de ir?"
      b(9, { by: "moises", q: "E Moisés disse: ", cast: [C("moises", -60, "point", { dy: 0.5, facing: 1 }), C("arao", -10, "stand", { dy: 0.5, facing: 1 }), C("farao", 90, "stand", { dy: 0.44, facing: -1 })] }), // "Havemos de ir com jovens e velhos, filhos e filhas, ovelhas e bois"
      b(10, { by: "farao", q: "Então ele lhes disse: ", cast: [C("farao", 90, "point", { dy: 0.44, facing: -1 }), C("moises", -60, "stand", { dy: 0.5, facing: 1 }), C("arao", -10, "stand", { dy: 0.5, facing: 1 })], env: { storm: 0.15, glory: 0.2 } }), // "Seja o Senhor convosco... olhai que há mal diante da vossa face"
      b(11, { by: "farao", env: { storm: 0.25, night: 0.24, glory: 0.12 } }), // "ide vós, homens, e servi ao Senhor". E os expulsaram da presença de Faraó
      b(12, { by: "deus", q: "Então disse o Senhor a Moisés: ", cast: [C("moises", -30, "stand", { dy: 0.5, facing: 1 })], env: { storm: 0.1, glory: 0.55 } }), // "Estende a tua mão sobre a terra do Egito para que os gafanhotos venham"
      b(13, { set: "gafanhotos", props: GAFANHOTOS, cast: [C("moises", -30, "raise", { dy: 0.5, facing: -1 })], env: { terrain: "field", storm: 0.55, night: 0.4, glory: 0.25, verdure: 0.3 } }), // Moisés estende a vara: o vento oriental traz os gafanhotos
      b(14, { props: GAFANHOTOS, env: { storm: 0.6, verdure: 0.18, night: 0.42 } }), // vêm os gafanhotos sobre toda a terra, tão numerosos como nunca houve
      b(15, { props: GAFANHOTOS, env: { storm: 0.55, verdure: 0.05, night: 0.5 } }), // cobrem a face da terra, e comem toda a erva e o fruto: nada verde sobra
      b(16, { by: "farao", q: "e disse: ", set: "palacio", cast: [C("farao", 90, "bow", { dy: 0.44, facing: -1 }), C("moises", -60, "stand", { dy: 0.5, facing: 1 }), C("arao", -10, "stand", { dy: 0.5, facing: 1 })], props: PALACIO, env: { terrain: "city", storm: 0.35, night: 0.38, glory: 0.18, verdure: 0.1 } }), // "Pequei contra o Senhor vosso Deus, e contra vós"
      b(17, { by: "farao" }), // "perdoai o meu pecado somente desta vez, e orai ao Senhor que tire esta morte"
      b(18, { cast: [C("moises", -20, "raise", { dy: 0.5, facing: 1 })], env: { storm: 0.2, glory: 0.45 } }), // Moisés sai da presença de Faraó e ora ao Senhor
      b(19, { env: { storm: 0.5, verdure: 0.2, night: 0.3, glory: 0.3 } }), // um vento ocidental leva os gafanhotos ao Mar Vermelho; não fica um só
      b(20, { set: "palacio", cast: [C("farao", 60, "stand", { dy: 0.44, facing: -1 })], props: PALACIO, env: { terrain: "city", storm: 0, night: 0.34, glory: 0.12 } }), // o Senhor endurece o coração de Faraó, e não deixa ir os filhos de Israel
      b(21, { by: "deus", q: "Então disse o Senhor a Moisés: ", set: "envio", cast: [C("moises", -30, "stand", { dy: 0.5, facing: 1 })], props: EGITO, env: { terrain: "city", glory: 0.5, night: 0.4 } }), // "Estende a tua mão para o céu, e virão trevas que se apalpem"
      b(22, { cast: [C("moises", -30, "raise", { dy: 0.5, facing: -1 })], env: { night: 0.92, glory: 0.1, verdure: 0.1 } }), // Moisés estende a mão: trevas espessas por três dias
      b(23, { set: "gosen-luz", cast: [C("multidao", 0, "stand", { dy: 0.46 }), C("multidao", 110, "stand", { scale: 0.9, dy: 0.5, id: "povo2" })], props: [P("lampstand", -20, 1, undefined, 0.4), P("tent", 200, 1, undefined, 0.16), P("tent", -230, 0.9, undefined, 0.28), P("palm", 260, 1, undefined, 0.12)], env: { terrain: "city", night: 0.82, glory: 0.4, verdure: 0.3 } }), // ninguém se levantou por três dias; mas Israel tinha luz nas habitações
      b(24, { by: "farao", q: "e disse: ", set: "palacio", cast: [C("farao", 90, "stand", { dy: 0.44, facing: -1 }), C("moises", -60, "stand", { dy: 0.5, facing: 1 })], props: PALACIO, env: { terrain: "city", night: 0.5, glory: 0.15 } }), // "Ide, servi ao Senhor; somente fiquem vossas ovelhas e vacas"
      b(25, { by: "moises", q: "Moisés, porém, disse: ", cast: [C("farao", 90, "stand", { dy: 0.44, facing: -1 }), C("moises", -60, "point", { dy: 0.5, facing: 1 })], env: { glory: 0.3 } }), // "Tu também darás sacrifícios e holocaustos, que ofereçamos ao Senhor"
      b(26, { by: "moises" }), // "o nosso gado há de ir conosco, nem uma unha ficará"
      b(27, { cast: [C("farao", 60, "point", { dy: 0.44, facing: 1 })], env: { night: 0.5, glory: 0.1, storm: 0.15 } }), // o Senhor endurece o coração de Faraó, e este não os quer deixar ir
      b(28, { by: "farao", q: "E disse-lhe Faraó: ", cast: [C("farao", 90, "point", { dy: 0.44, facing: -1 }), C("moises", -60, "stand", { dy: 0.5, facing: 1 })], env: { storm: 0.25, night: 0.45 } }), // "Vai-te de mim... no dia em que vires o meu rosto, morrerás"
      b(29, { by: "moises", q: "E disse Moisés: ", cast: [C("moises", -40, "raise", { dy: 0.5, facing: 1 }), C("farao", 90, "stand", { dy: 0.44, facing: -1 })], env: { glory: 0.35 } }), // "Bem disseste; eu nunca mais verei o teu rosto"
    ],
  },
};
