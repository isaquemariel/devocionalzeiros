// ============================================================================
// DEUTERONÔMIO 4–5 — CENA VIVA. O grande capítulo do MONOTEÍSMO e o
// DECÁLOGO relembrado, ambos ancorados no FLASHBACK DE HOREBE.
//
// Dt 4 — GUARDAI A LEI / NÃO FAÇAIS IMAGEM: nas campinas de Moabe, Moisés
// exorta Israel a guardar os estatutos. Ele RELEMBRA HOREBE: o povo ao pé do
// monte que ARDIA EM FOGO "até ao meio dos céus", com trevas, nuvens e
// escuridão — e a VOZ saindo DO MEIO DO FOGO sem que se visse figura alguma
// (por isso: NÃO façais imagem esculpida, nem de homem, nem de animal, nem
// adoreis o sol, a lua e as estrelas). O martelo do livro: "o Senhor é Deus;
// nenhum outro há senão ele" (v.35,39). Ao fim, Moisés separa TRÊS CIDADES DE
// REFÚGIO além do Jordão, do lado do nascimento do sol.
//
// Dt 5 — OS DEZ MANDAMENTOS: Moisés recita a aliança de Horebe. O monte em
// fogo, a nuvem, a escuridão, e a VOZ proclamando o Decálogo, escrito em DUAS
// TÁBUAS DE PEDRA. O povo, com MEDO do grande fogo, pede que Moisés seja o
// MEDIADOR ("fala-nos tu... e não fale Deus conosco, para que não morramos").
//
// A VOZ DE DEUS (regra do projeto): Deus NUNCA é figura. Em Horebe o mediador
// é o FOGO no cume do monte — a VOZ sai do fogo: `by: "deus"` com `pillar`/
// `campfire` ardendo em cena e as TÁBUAS. Quando é Moisés quem PREGA/RELEMBRA
// nas campinas, ele é o mediador visível: `by: "moises"`.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });
const mv = (v: number, q?: string) => b(v, { by: "moises", ...(q ? { q } : {}) }); // Moisés prega/relembra
const dv = (v: number, q?: string) => b(v, { by: "deus", ...(q ? { q } : {}) });   // a VOZ do meio do fogo

// CAMPINAS DE MOABE, além do Jordão — o púlpito de Moisés diante de todo Israel.
const MOABE: StagePropSpec[] = [
  P("river", 0, 1.4, undefined, 0.86),
  P("tent", -230, 1.1, undefined, 0.2),
  P("tent", 205, 1.05, undefined, 0.24),
  P("palm", -320, 1.05, undefined, 0.14),
  P("grass", 95, 0.78, undefined, 0.68),
  P("grass", -70, 0.8, undefined, 0.78),
];
// CAMPINAS com o LIVRO DA LEI proposto — o colofão de Dt 4 (v.44-45).
const MOABE_LEI: StagePropSpec[] = [
  { ...P("scroll", 150, 1.15, undefined, 0.44), tag: "livro-da-lei" },
  P("river", -20, 1.35, undefined, 0.86),
  P("tent", -240, 1.05, undefined, 0.2),
  P("palm", -320, 1.05, undefined, 0.14),
  P("grass", 80, 0.78, undefined, 0.7),
];
// HOREBE — o monte que ARDE EM FOGO até ao meio dos céus, com trevas e nuvens.
// terrain:"mountain" ESCURECE o céu (as "trevas, nuvens e escuridão"); o fogo
// da coluna e da fogueira dá a única luz. SEM figura de Deus: a VOZ vem do fogo.
const HOREBE: StagePropSpec[] = [
  { ...P("clouds", -40, 1.7, undefined, 0.82), sky: true },
  { ...P("clouds", 175, 1.35, undefined, 0.78), sky: true },
  { ...P("pillar", 0, 1.7, 1, 0.26), tag: "fogo-de-horebe" }, // o monte ardia em fogo
  P("campfire", -25, 1.1, 1, 0.6),
  P("rock", 305, 1.1, undefined, 0.3),
  P("rock", -305, 1.05, undefined, 0.34),
];
// HOREBE com as DUAS TÁBUAS DA LEI — os dez mandamentos escritos em pedra.
const HOREBE_TABUAS: StagePropSpec[] = [
  { ...P("clouds", -40, 1.7, undefined, 0.82), sky: true },
  { ...P("pillar", 0, 1.7, 1, 0.26), tag: "fogo-de-horebe" },
  P("campfire", -30, 1.1, 1, 0.6),
  { ...P("tablets", 160, 1.2, undefined, 0.44), tag: "tabuas-da-lei" },
  P("rock", -305, 1.05, undefined, 0.34),
];
// A ADVERTÊNCIA CONTRA OS ÍDOLOS — o bezerro-ídolo esculpido e o exército dos
// céus (sol, lua, estrelas) que NÃO se deve adorar.
const IDOLOS: StagePropSpec[] = [
  { ...P("sun", -175, 1.15, undefined, 0.28), sky: true },
  { ...P("moon", 45, 0.9, undefined, 0.22), sky: true },
  { ...P("starfield", 185, 1.0, undefined, 0.18), sky: true },
  { ...P("calf", 0, 1.15, undefined, 0.5), tag: "idolo" },
  P("rock", 305, 1.1, undefined, 0.3),
  P("grass", -80, 0.78, undefined, 0.78),
];
// AS TRÊS CIDADES DE REFÚGIO além do Jordão, do lado do NASCIMENTO DO SOL.
const REFUGIO: StagePropSpec[] = [
  P("tower", -155, 1.15, undefined, 0.3),
  P("tower", 20, 1.2, undefined, 0.36),
  P("tower", 190, 1.1, undefined, 0.32),
  { ...P("sun", 285, 1.05, undefined, 0.22), sky: true }, // do lado do nascimento do sol
  P("grass", -70, 0.78, undefined, 0.8),
];
// A CONQUISTA A LESTE — as terras de Siom e de Ogue, torres tomadas, o Jordão.
const CONQUISTA: StagePropSpec[] = [
  P("tower", -145, 1.15, undefined, 0.3),
  P("tower", 165, 1.1, undefined, 0.36),
  P("river", 0, 1.3, undefined, 0.86),
  P("rock", 305, 1.05, undefined, 0.3),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Dt 4
  4: {
    start: { terrain: "field", night: 0.1, glory: 0.55, storm: 0, fire: 0, verdure: 0.4 },
    beats: [
      b(1, { q: "ouve os estatutos e os juízos", props: MOABE, env: { terrain: "field", glory: 0.58, night: 0.1, verdure: 0.4 }, by: "moises", cast: [ // "ouve os estatutos e os juízos que eu vos ensino"
        C("moises", -150, "raise", { dy: 0.5, facing: 1, glow: 0.12 }),
        C("multidao", 120, "stand", { dy: 0.56, facing: -1 }),
      ] }),
      mv(2, "Não acrescentareis à palavra"),                                 // nada acrescentar nem diminuir da palavra
      mv(3, "por causa de Baal-Peor"),                                       // os olhos viram o juízo de Baal-Peor
      b(4, { by: "moises", q: "hoje todos estais vivos", cast: [             // os que se achegaram ao Senhor, hoje vivem
        C("moises", -150, "point", { dy: 0.5, facing: 1 }),
        C("multidao", 120, "raise", { dy: 0.56, facing: -1 }),
      ] }),
      mv(5, "vos tenho ensinado estatutos e juízos"),                        // ensinei-vos estatutos como me mandou o Senhor
      b(6, { by: "moises", q: "nação sábia e entendida", cast: [             // guardá-los será a vossa sabedoria diante dos povos
        C("moises", -140, "raise", { dy: 0.5, facing: 1 }),
        C("multidao", 130, "stand", { dy: 0.54, facing: -1 }),
      ] }),
      mv(7, "tão chegados como o Senhor"),                                   // que nação tem deuses tão chegados?
      mv(8, "estatutos e juízos tão justos"),                               // que nação tem lei tão justa?
      b(9, { by: "moises", q: "não te esqueças daquelas coisas", cast: [     // guarda tua alma: não te esqueças do que viste
        C("moises", -140, "point", { dy: 0.5, facing: 1 }),
        C("homem", 90, "stand", { dy: 0.6, facing: -1, id: "filho" }),
        C("multidao", 180, "stand", { dy: 0.5 }),
      ] }),
      // v.10-15 — FLASHBACK DE HOREBE: o povo ao pé do monte em fogo.
      b(10, { q: "em Horebe", set: "horebe", props: HOREBE,                  // o dia em que estiveste perante o Senhor em Horebe
        env: { terrain: "mountain", glory: 0.24, night: 0.5, fire: 0.5, verdure: 0.05 }, by: "moises", cast: [
        C("multidao", 40, "stand", { dy: 0.72, facing: 1 }),
        C("moises", -170, "raise", { dy: 0.58, facing: 1, glow: 0.2 }),
      ] }),
      // v.11 — ÍCONE: "o monte ardia em fogo até ao meio dos céus".
      b(11, { q: "o monte ardia em fogo até ao meio dos céus",
        env: { terrain: "mountain", glory: 0.22, night: 0.58, fire: 0.68 }, by: "moises", cast: [
        C("multidao", 60, "bow", { dy: 0.76, facing: 1 }),
        C("multidao", -60, "stand", { dy: 0.72 }),
      ] }),
      // v.12 — A VOZ DO MEIO DO FOGO, sem figura alguma. O mediador é o FOGO.
      b(12, { by: "deus", q: "não vistes figura alguma",
        env: { terrain: "mountain", glory: 0.3, night: 0.55, fire: 0.7 }, cast: [
        C("multidao", 50, "bow", { dy: 0.76, facing: 1 }),
        C("multidao", -70, "kneel", { dy: 0.72, facing: 1 }),
      ] }),
      // v.13 — os DEZ MANDAMENTOS escritos em DUAS TÁBUAS DE PEDRA.
      b(13, { q: "os dez mandamentos", set: "horebe-tabuas", props: HOREBE_TABUAS,
        env: { terrain: "mountain", glory: 0.32, night: 0.5, fire: 0.6 }, by: "moises", cast: [
        C("moises", -150, "raise", { dy: 0.58, facing: 1, glow: 0.28 }),
        C("multidao", 40, "stand", { dy: 0.74 }),
      ] }),
      mv(14, "que vos ensinasse estatutos e juízos"),                        // o Senhor me ordenou ensinar-vos
      b(15, { by: "moises", q: "nenhuma figura vistes",                      // guardai-vos: nenhuma forma vistes
        env: { glory: 0.3, fire: 0.55 }, cast: [
        C("moises", -150, "point", { dy: 0.58, facing: 1, glow: 0.2 }),
        C("multidao", 40, "stand", { dy: 0.74 }),
      ] }),
      // v.16-19 — CONTRA OS ÍDOLOS: nenhuma imagem; nem sol, lua ou estrelas.
      b(16, { q: "semelhança de homem ou mulher", set: "idolos", props: IDOLOS,
        env: { terrain: "field", glory: 0.3, night: 0.3, fire: 0, verdure: 0.3 }, by: "moises", cast: [
        C("moises", -160, "point", { dy: 0.5, facing: 1 }),
        C("homem", 90, "stand", { dy: 0.64, facing: -1, id: "homem-idolo" }),
      ] }),
      mv(17, "figura de alguma ave alada"),                                  // nem figura de animal ou ave
      mv(18, "peixe que esteja nas águas"),                                  // nem de réptil ou peixe
      b(19, { by: "moises", q: "o sol, e a lua, e as estrelas",             // não te inclines ao exército dos céus
        env: { night: 0.22, glory: 0.34 }, cast: [
        C("moises", -160, "raise", { dy: 0.5, facing: 1 }),
        C("multidao", 120, "stand", { dy: 0.56 }),
      ] }),
      b(20, { q: "fornalha de ferro do Egito", set: "moabe", props: MOABE,   // o Senhor vos tirou da fornalha do Egito
        env: { terrain: "field", glory: 0.5, night: 0.12, verdure: 0.4 }, by: "moises", cast: [
        C("moises", -150, "point", { dy: 0.5, facing: 1 }),
        C("multidao", 120, "stand", { dy: 0.54, facing: -1 }),
      ] }),
      b(21, { by: "moises", q: "eu não passaria o Jordão",                   // Moisés não passará o Jordão
        env: { glory: 0.42, night: 0.2 }, cast: [
        C("moises", -120, "stand", { dy: 0.5, facing: 1 }),
      ] }),
      mv(22, "eu nesta terra morrerei"),                                     // Moisés morrerá aquém do Jordão
      b(23, { by: "moises", q: "não vos esqueçais da aliança", cast: [       // não vos esqueçais da aliança; nada de escultura
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
        C("multidao", 120, "stand", { dy: 0.54, facing: -1 }),
      ] }),
      // v.24 — ÍCONE: "o Senhor teu Deus é um fogo que consome". Fogo real em cena
      // (campfire) — `env.fire` sozinho não desenha chama.
      b(24, { by: "moises", q: "um fogo que consome", props: [
        ...MOABE, { ...P("campfire", 40, 1.3, 1, 0.5) },
      ], env: { glory: 0.5, fire: 0.6 }, cast: [
        C("moises", -140, "raise", { dy: 0.5, facing: 1, glow: 0.2 }),
        C("multidao", 130, "stand", { dy: 0.56, facing: -1 }),
      ] }),
      mv(25, "fizerdes alguma escultura"),                                   // se vos corromperdes fazendo escultura
      b(26, { by: "moises", q: "por testemunhas contra vós o céu e a terra", // o céu e a terra por testemunhas
        env: { glory: 0.4, night: 0.24 }, cast: [
        C("moises", -140, "raise", { dy: 0.5, facing: 1 }),
        C("multidao", 120, "stand", { dy: 0.54, facing: -1 }),
      ] }),
      b(27, { by: "moises", q: "vos espalhará entre os povos",               // sereis espalhados, poucos em número
        env: { glory: 0.28, night: 0.36 }, cast: [
        C("moises", -140, "point", { dy: 0.5, facing: 1 }),
        C("homem", 80, "bow", { dy: 0.6, facing: -1, id: "exilado1" }),
        C("mulherComum", 160, "bow", { dy: 0.54, facing: -1, id: "exilada2" }),
      ] }),
      b(28, { q: "obra de mãos de homens", set: "idolos", props: IDOLOS,     // servireis a deuses de madeira e pedra
        env: { terrain: "field", glory: 0.24, night: 0.34, verdure: 0.2 }, by: "moises", cast: [
        C("moises", -160, "point", { dy: 0.5, facing: 1 }),
        C("homem", 90, "bow", { dy: 0.64, facing: -1, id: "servo-idolo" }),
      ] }),
      b(29, { q: "o acharás, quando o buscares", set: "moabe", props: MOABE, // buscarás ao Senhor e o acharás
        env: { terrain: "field", glory: 0.5, night: 0.15, verdure: 0.4 }, by: "moises", cast: [
        C("moises", -140, "raise", { dy: 0.5, facing: 1, glow: 0.15 }),
        C("multidao", 120, "raise", { dy: 0.54, facing: -1 }),
      ] }),
      b(30, { by: "moises", q: "ouvirás a sua voz", env: { glory: 0.56 }, cast: [ // voltarás ao Senhor e ouvirás a sua voz
        C("moises", -140, "raise", { dy: 0.5, facing: 1, glow: 0.15 }),
        C("multidao", 120, "stand", { dy: 0.54, facing: -1 }),
      ] }),
      b(31, { by: "moises", q: "Deus misericordioso", env: { glory: 0.62 }, cast: [ // o Senhor é Deus misericordioso; não te desamparará
        C("moises", -130, "raise", { dy: 0.5, facing: 1, glow: 0.2 }),
        C("multidao", 120, "raise", { dy: 0.54, facing: -1 }),
      ] }),
      mv(32, "Deus criou o homem sobre a terra"),                           // pergunta aos tempos passados desde a criação
      // v.33 — HOREBE de novo: a voz de Deus do meio do fogo, e o povo vivo.
      b(33, { q: "a voz de Deus falando do meio do fogo", set: "horebe", props: HOREBE,
        env: { terrain: "mountain", glory: 0.26, night: 0.52, fire: 0.62, verdure: 0.05 }, by: "moises", cast: [
        C("multidao", 40, "stand", { dy: 0.74, facing: 1 }),
        C("moises", -170, "point", { dy: 0.58, facing: 1, glow: 0.2 }),
      ] }),
      mv(34, "com sinais, e com milagres"),                                 // Deus tomou um povo do meio de outro, com sinais
      // v.35 — MARTELO DO MONOTEÍSMO: "o Senhor é Deus; nenhum outro há".
      b(35, { by: "moises", q: "o Senhor é Deus; nenhum outro há senão ele",
        env: { terrain: "mountain", glory: 0.4, night: 0.4, fire: 0.6 }, cast: [
        C("moises", -150, "raise", { dy: 0.58, facing: 1, glow: 0.32 }),
        C("multidao", 40, "stand", { dy: 0.74 }),
      ] }),
      b(36, { by: "moises", q: "te mostrou o seu grande fogo",             // desde os céus te fez ouvir a voz; na terra o grande fogo
        env: { glory: 0.34, fire: 0.66 }, cast: [
        C("moises", -150, "point", { dy: 0.58, facing: 1, glow: 0.24 }),
        C("multidao", 40, "bow", { dy: 0.74 }),
      ] }),
      b(37, { q: "te tirou do Egito diante de si", set: "moabe", props: MOABE, // porque amou teus pais, te tirou do Egito
        env: { terrain: "field", glory: 0.52, night: 0.12, fire: 0, verdure: 0.4 }, by: "moises", cast: [
        C("moises", -140, "raise", { dy: 0.5, facing: 1 }),
        C("multidao", 120, "stand", { dy: 0.54, facing: -1 }),
      ] }),
      mv(38, "nações maiores e mais poderosas do que tu"),                 // para lançar fora nações maiores que tu
      // v.39 — MONOTEÍSMO outra vez: "só o Senhor é Deus, no céu e na terra".
      b(39, { by: "moises", q: "só o Senhor é Deus", env: { glory: 0.64 }, cast: [
        C("moises", -140, "raise", { dy: 0.5, facing: 1, glow: 0.28 }),
        C("multidao", 120, "raise", { dy: 0.54, facing: -1 }),
      ] }),
      b(40, { by: "moises", q: "guardarás os seus estatutos e os seus mandamentos", cast: [ // guarda os estatutos para que te vá bem
        C("moises", -140, "point", { dy: 0.5, facing: 1 }),
        C("multidao", 120, "stand", { dy: 0.54, facing: -1 }),
      ] }),
      // v.41-43 — AS TRÊS CIDADES DE REFÚGIO a leste do Jordão.
      b(41, { set: "refugio", props: REFUGIO,                              // Moisés separou três cidades além do Jordão
        env: { terrain: "field", glory: 0.56, night: 0.1, verdure: 0.4 }, cast: [
        C("moises", -180, "raise", { dy: 0.5, facing: 1 }),
      ] }),
      b(42, { cast: [                                                      // para o homicida involuntário se acolher e viver
        C("moises", -180, "point", { dy: 0.5, facing: 1 }),
        C("homem", 60, "walk", { dy: 0.6, facing: 1, id: "homicida" }),
      ] }),
      b(43, { cast: [                                                      // Bezer, Ramote e Golã — as três cidades nomeadas
        C("moises", -180, "point", { dy: 0.5, facing: 1 }),
        C("homem", 30, "stand", { dy: 0.62, facing: -1, id: "refugiado" }),
      ] }),
      // v.44-45 — COLOFÃO: esta é a lei que Moisés propôs aos filhos de Israel.
      b(44, { set: "moabe-lei", props: MOABE_LEI,                          // esta é a lei que Moisés propôs
        env: { terrain: "field", glory: 0.55, night: 0.1, verdure: 0.42 }, cast: [
        C("moises", -150, "raise", { dy: 0.5, facing: 1, glow: 0.12 }),
        C("multidao", 100, "stand", { dy: 0.56, facing: -1 }),
      ] }),
      b(45, { cast: [                                                      // os testemunhos, estatutos e juízos, saído do Egito
        C("moises", -150, "point", { dy: 0.5, facing: 1 }),
        C("multidao", 110, "stand", { dy: 0.54, facing: -1 }),
      ] }),
      // v.46-49 — a GEOGRAFIA da conquista a leste: Siom e Ogue já caídos.
      b(46, { q: "na terra de Siom, rei dos amorreus", set: "conquista", props: CONQUISTA,
        env: { terrain: "field", glory: 0.48, night: 0.16, verdure: 0.3 }, cast: [
        C("rei", 150, "lie", { dy: 0.62, id: "siom" }),
        C("multidao", -120, "stand", { dy: 0.5, facing: 1 }),
      ] }),
      b(47, { q: "a terra de Ogue, rei de Basã", cast: [                    // e a terra de Ogue, rei de Basã
        C("rei", 150, "lie", { dy: 0.6, id: "ogue", scale: 1.1 }),
        C("multidao", -120, "stand", { dy: 0.5, facing: 1 }),
      ] }),
      b(48, { cast: [                                                      // desde Aroer até ao monte Sião, que é Hermom
        C("multidao", 0, "stand", { dy: 0.52 }),
      ] }),
      b(49),                                                               // toda a campina além do Jordão, ao oriente
    ],
  },

  // ------------------------------------------------------------------ Dt 5
  5: {
    start: { terrain: "field", night: 0.1, glory: 0.55, storm: 0, fire: 0, verdure: 0.4 },
    beats: [
      b(1, { q: "Ouve, ó Israel", props: MOABE, env: { terrain: "field", glory: 0.58, night: 0.1, verdure: 0.4 }, by: "moises", cast: [ // Moisés chama todo o Israel: "Ouve, ó Israel"
        C("moises", -150, "raise", { dy: 0.5, facing: 1, glow: 0.12 }),
        C("multidao", 120, "stand", { dy: 0.56, facing: -1 }),
      ] }),
      // v.2-5 — FLASHBACK DE HOREBE: a aliança feita face a face, do meio do fogo.
      b(2, { q: "aliança em Horebe", set: "horebe", props: HOREBE,          // o Senhor fez conosco aliança em Horebe
        env: { terrain: "mountain", glory: 0.26, night: 0.5, fire: 0.55, verdure: 0.05 }, by: "moises", cast: [
        C("moises", -160, "raise", { dy: 0.58, facing: 1, glow: 0.22 }),
        C("multidao", 50, "stand", { dy: 0.74 }),
      ] }),
      b(3, { by: "moises", q: "todos os que hoje aqui estamos vivos", cast: [ // não com os pais, mas conosco, hoje vivos
        C("moises", -160, "point", { dy: 0.58, facing: 1, glow: 0.2 }),
        C("multidao", 50, "stand", { dy: 0.74 }),
      ] }),
      // v.4 — ÍCONE: face a face, do meio do fogo.
      b(4, { by: "moises", q: "do meio do fogo",
        env: { terrain: "mountain", glory: 0.24, night: 0.56, fire: 0.68 }, cast: [
        C("moises", -160, "raise", { dy: 0.58, facing: 1, glow: 0.24 }),
        C("multidao", 50, "bow", { dy: 0.76 }),
      ] }),
      // v.5 — Moisés O MEDIADOR: em pé entre o Senhor e o povo, que temeu o fogo.
      b(5, { by: "moises", q: "entre o Senhor e vós",
        env: { glory: 0.3, fire: 0.62 }, cast: [
        C("moises", -30, "stand", { dy: 0.6, facing: 1, glow: 0.3 }),
        C("multidao", 150, "bow", { dy: 0.7, facing: -1 }),
      ] }),
      // v.6-21 — O DECÁLOGO: a VOZ do meio do fogo, escrita em duas tábuas.
      b(6, { by: "deus", q: "Eu sou o Senhor teu Deus", set: "horebe-tabuas", props: HOREBE_TABUAS,
        env: { terrain: "mountain", glory: 0.34, night: 0.48, fire: 0.62 }, cast: [
        C("moises", -160, "stand", { dy: 0.6, facing: 1, glow: 0.28 }),
        C("multidao", 60, "bow", { dy: 0.74 }),
      ] }),
      dv(7, "Não terás outros deuses"),                                     // 1º: não terás outros deuses diante de mim
      dv(8, "imagem de escultura"),                                        // 2º: não farás imagem de escultura
      b(9, { by: "deus", q: "Não te encurvarás a elas", env: { fire: 0.66 } }), // não te encurvarás; Deus zeloso
      b(10, { by: "deus", q: "milhares dos que me amam", env: { glory: 0.4, fire: 0.58 } }), // misericórdia aos que me amam
      dv(11, "o nome do Senhor teu Deus em vão"),                          // 3º: não tomarás o nome em vão
      // v.12 — 4º mandamento: o sábado, com as tábuas em cena.
      b(12, { by: "deus", q: "Guarda o dia de sábado", env: { fire: 0.62 }, cast: [
        C("multidao", 60, "stand", { dy: 0.74 }),
        C("moises", -160, "stand", { dy: 0.6, facing: 1, glow: 0.26 }),
      ] }),
      dv(13, "Seis dias trabalharás"),                                     // seis dias trabalharás
      dv(14, "o sétimo dia é o sábado"),                                  // o sétimo é o sábado do Senhor
      dv(15, "foste servo na terra do Egito"),                            // lembra que foste servo no Egito
      // v.16 — 5º mandamento: honra a teu pai e a tua mãe.
      b(16, { by: "deus", q: "Honra a teu pai e a tua mãe", env: { glory: 0.42, fire: 0.6 }, cast: [
        C("multidao", 60, "stand", { dy: 0.74 }),
        C("moises", -160, "stand", { dy: 0.6, facing: 1, glow: 0.26 }),
      ] }),
      dv(17, "Não matarás"),                                              // 6º
      dv(18, "Não adulterarás"),                                          // 7º
      dv(19, "Não furtarás"),                                             // 8º
      dv(20, "Não dirás falso testemunho"),                              // 9º
      dv(21, "Não cobiçarás a mulher do teu próximo"),                   // 10º
      // v.22 — as DUAS TÁBUAS DE PEDRA entregues a Moisés; nada acrescentou.
      b(22, { by: "moises", q: "em duas tábuas de pedra", env: { glory: 0.38, fire: 0.56 }, cast: [
        C("moises", -150, "raise", { dy: 0.58, facing: 1, glow: 0.32 }),
        C("multidao", 60, "stand", { dy: 0.74 }),
      ] }),
      // v.23 — o povo vê o monte ardendo e se achega a Moisés com MEDO.
      b(23, { by: "moises", q: "o monte ardendo em fogo",
        env: { terrain: "mountain", glory: 0.26, night: 0.54, fire: 0.66 }, cast: [
        C("moises", -150, "stand", { dy: 0.58, facing: 1, glow: 0.24 }),
        C("anciao", 40, "bow", { dy: 0.7, facing: 1, id: "cabeca-tribo" }),
        C("homem", 150, "bow", { dy: 0.58, facing: -1, id: "povo1" }),
        C("mulherComum", 90, "kneel", { dy: 0.6, facing: -1, id: "povo2" }),
        C("multidao", 260, "stand", { scale: 0.68, dy: 0.42, id: "povoFundo" }),
      ] }),
      // v.24-27 — a fala do POVO amedrontado (os cabeças e anciãos das tribos).
      b(24, { by: "anciao", q: "Deus fala com o homem", cast: [            // vimos a glória; Deus fala com o homem e este vive
        C("anciao", 30, "raise", { dy: 0.68, facing: 1, id: "cabeca-tribo" }),
        C("moises", -160, "stand", { dy: 0.58, facing: 1, glow: 0.22 }),
        C("multidao", 150, "stand", { dy: 0.72, facing: -1 }),
      ] }),
      b(25, { by: "anciao", q: "este grande fogo nos consumiria",          // por que morreríamos? o fogo nos consumiria
        env: { fire: 0.7, night: 0.5 }, cast: [
        C("anciao", 30, "bow", { dy: 0.68, facing: 1, id: "cabeca-tribo" }),
        C("homem", 150, "bow", { dy: 0.58, facing: -1, id: "povo1" }),
        C("mulherComum", 90, "kneel", { dy: 0.6, facing: -1, id: "povo2" }),
        C("multidao", 260, "stand", { scale: 0.68, dy: 0.42, id: "povoFundo" }),
      ] }),
      b(26, { by: "anciao", q: "a voz do Deus vivente", cast: [            // quem ouviu a voz do Deus vivente e ficou vivo?
        C("anciao", 30, "bow", { dy: 0.68, facing: 1, id: "cabeca-tribo" }),
        C("multidao", 150, "bow", { dy: 0.72, facing: -1 }),
      ] }),
      // v.27 — o pedido pelo MEDIADOR: "Chega-te tu, e ouve".
      b(27, { by: "anciao", q: "Chega-te tu, e ouve", cast: [
        C("anciao", 30, "raise", { dy: 0.68, facing: 1, id: "cabeca-tribo" }),
        C("moises", -160, "stand", { dy: 0.58, facing: 1, glow: 0.26 }),
        C("multidao", 150, "stand", { dy: 0.72, facing: -1 }),
      ] }),
      // v.28-31 — a VOZ do meio do fogo responde a Moisés, aprovando o povo.
      b(28, { by: "deus", q: "Eu ouvi as palavras deste povo",
        env: { glory: 0.36, fire: 0.6 }, cast: [
        C("moises", -30, "stand", { dy: 0.6, facing: 1, glow: 0.3 }),
        C("multidao", 150, "stand", { dy: 0.72, facing: -1 }),
      ] }),
      b(29, { by: "deus", q: "que me temessem", env: { glory: 0.42, fire: 0.58 } }), // quem dera tivessem tal coração que me temessem
      b(30, { by: "deus", q: "Tornai-vos às vossas tendas" }),             // vai, dize-lhes: tornai-vos às tendas
      b(31, { by: "deus", q: "fica-te aqui comigo", cast: [                // tu, porém, fica comigo, para receber os mandamentos
        C("moises", -30, "stand", { dy: 0.6, facing: 1, glow: 0.34 }),
      ] }),
      // v.32-33 — Moisés volta à exortação nas campinas: andai no caminho.
      b(32, { q: "não vos desviareis, nem para a direita nem para a esquerda", set: "moabe", props: MOABE,
        env: { terrain: "field", glory: 0.54, night: 0.12, fire: 0, verdure: 0.4 }, by: "moises", cast: [
        C("moises", -150, "raise", { dy: 0.5, facing: 1, glow: 0.14 }),
        C("multidao", 120, "stand", { dy: 0.56, facing: -1 }),
      ] }),
      b(33, { by: "moises", q: "para que vivais e bem vos suceda", env: { glory: 0.6 }, cast: [ // andai em todo o caminho, para que vivais
        C("moises", -140, "raise", { dy: 0.5, facing: 1, glow: 0.18 }),
        C("multidao", 120, "raise", { dy: 0.54, facing: -1 }),
      ] }),
    ],
  },
};
