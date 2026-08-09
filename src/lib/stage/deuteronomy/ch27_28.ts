// ============================================================================
// DEUTERONÔMIO 27–28 — CENA VIVA. As GRANDES PEDRAS e o ALTAR do EBAL; os dois
// montes da BÊNÇÃO e da MALDIÇÃO; e o grande capítulo das BÊNÇÃOS x MALDIÇÕES.
//
// Dt 27 — NO MONTE EBAL: Moisés e os anciãos mandam, ao passar o Jordão, erguer
// GRANDES PEDRAS caiadas e ESCREVER nelas toda a Lei, e edificar um ALTAR de
// pedras brutas (sem ferro) para holocaustos e ofertas pacíficas. As doze tribos
// se dividem: seis sobre o GERIZIM para ABENÇOAR, seis sobre o EBAL para
// AMALDIÇOAR. Os LEVITAS proclamam em alta voz cada "Maldito o que…", e todo o
// povo responde: "AMÉM". Clima solene e sério.
//
// Dt 28 — BÊNÇÃO x MALDIÇÃO, o ápice do livro. Primeiro as BÊNÇÃOS da obediência
// (28:1-14): bendito na cidade e no campo, o fruto do ventre e da terra, a chuva
// do céu, vencer os inimigos, ser CABEÇA e não cauda — FARTURA, glória, colheita.
// Depois a longa e terrível MALDIÇÃO da desobediência (28:15-68): pestilência,
// SECA (céu de bronze, terra de ferro), derrota, LOUCURA, gafanhoto, o CERCO em
// que se comem os próprios filhos, e o EXÍLIO/dispersão entre as nações, servindo
// a outros deuses, sem repouso para a planta do pé, de volta ao Egito em navios.
// O CLIMA MUDA RADICALMENTE: da glória radiante da bênção para a treva do juízo.
//
// A VOZ (regra do projeto): quem prega é MOISÉS, o mediador visível — `by:"moises"`.
// Os LEVITAS que testificam as maldições em alta voz falam como `by:"servo"`.
// NÃO se usa `by:"deus"` aqui: não há voz do céu direta, é Moisés expondo a Lei.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });
const mv = (v: number, q?: string) => b(v, { by: "moises", ...(q ? { q } : {}) }); // Moisés prega
const sv = (v: number, q?: string) => b(v, { by: "servo", ...(q ? { q } : {}) });  // os levitas testificam

// ---------------------------------------------------------------- Dt 27 props
// AS GRANDES PEDRAS caiadas onde se escreve toda a Lei, no alto do Ebal.
const PEDRAS: StagePropSpec[] = [
  { ...P("rock", -150, 1.5, undefined, 0.32), tag: "pedras-caiadas" },
  P("rock", 40, 1.55, undefined, 0.3),
  P("scroll", -50, 0.85, undefined, 0.5), // a Lei escrita nas pedras
  P("rock", 300, 1.1, undefined, 0.28),
  P("grass", 140, 0.7, undefined, 0.72),
];
// O ALTAR de pedras brutas para holocaustos e ofertas pacíficas.
const ALTAR: StagePropSpec[] = [
  { ...P("altar", 0, 1.35, 0.7, 0.42), tag: "altar-ebal" },
  P("rock", -170, 1.3, undefined, 0.34),
  P("rock", 190, 1.25, undefined, 0.32),
  P("grass", 110, 0.7, undefined, 0.74),
];
// OS DOIS MONTES: Gerizim (bênção) à esquerda, Ebal (maldição) à direita.
const MONTES: StagePropSpec[] = [
  P("rock", -270, 1.6, undefined, 0.26), // monte Gerizim
  P("rock", 270, 1.6, undefined, 0.26),  // monte Ebal
  P("scroll", 0, 0.8, undefined, 0.56),
  P("grass", -20, 0.7, undefined, 0.8),
];

// ---------------------------------------------------------------- Dt 28 props
// FARTURA da bênção: colheita, uvas, verdura alta, sol radiante.
const FARTURA: StagePropSpec[] = [
  { ...P("sun", 210, 1.2, undefined, 0.18), sky: true },
  P("sheaf", -230, 1.1, undefined, 0.52),
  P("sheaf", 200, 1.05, undefined, 0.56),
  P("grapes", 110, 1.0, undefined, 0.42),
  P("tree", -330, 1.25, undefined, 0.18),
  P("grass", -70, 0.82, undefined, 0.82),
];
// DESOLAÇÃO da maldição: terra estéril, fogo de destruição, céu carregado.
const DESOLACAO: StagePropSpec[] = [
  { ...P("clouds", -40, 1.6, undefined, 0.82), sky: true },
  { ...P("clouds", 170, 1.4, undefined, 0.78), sky: true },
  P("tree", -300, 1.1, undefined, 0.24), // árvore seca
  { ...P("campfire", 190, 1.15, 0.85, 0.6), tag: "fogo-destruicao" },
  P("rock", 290, 1.1, undefined, 0.3),
  P("rock", -170, 0.9, undefined, 0.5),
];
// A SECA: céu de bronze, terra de ferro — nem chuva, só pó.
const SECA: StagePropSpec[] = [
  P("tree", -300, 1.0, undefined, 0.26),
  P("rock", -120, 1.0, undefined, 0.42),
  P("rock", 120, 1.1, undefined, 0.36),
  P("rock", 280, 1.0, undefined, 0.3),
  P("grass", 40, 0.55, undefined, 0.76), // relva ressequida
];
// O GAFANHOTO / a lagarta devorando a semente e o arvoredo.
const GAFANHOTOS: StagePropSpec[] = [
  { ...P("clouds", 30, 1.5, undefined, 0.8), sky: true },
  P("locusts", -110, 1.35, undefined, 0.38),
  P("locusts", 120, 1.2, undefined, 0.28),
  P("sheaf", 210, 0.85, undefined, 0.58), // colheita consumida
  P("tree", -310, 1.0, undefined, 0.24),
  P("grass", -200, 0.6, undefined, 0.72),
];
// O CERCO: muros e torres da cidade sitiada, fogo do assédio.
const CERCO: StagePropSpec[] = [
  { ...P("clouds", 0, 1.6, undefined, 0.82), sky: true },
  P("tower", -150, 1.3, undefined, 0.26),
  P("tower", 160, 1.25, undefined, 0.32),
  { ...P("campfire", 40, 1.05, 0.9, 0.62), tag: "fogo-cerco" },
  P("rock", 300, 1.05, undefined, 0.3),
];
// O EXÍLIO: os navios que levam o povo de volta ao Egito, vendido como escravo.
const EXILIO: StagePropSpec[] = [
  { ...P("clouds", -60, 1.5, undefined, 0.82), sky: true },
  P("river", 0, 1.5, undefined, 0.88),
  { ...P("boat", -10, 1.3, undefined, 0.66), tag: "navios-do-exilio" },
  P("rock", 300, 1.0, undefined, 0.3),
];
// Variantes com corpos do céu (sky:true) para os beats-ícone.
const SECA_AVES: StagePropSpec[] = [...SECA, { ...P("birds", 150, 1.1, undefined, 0.26), sky: true }]; // aves sobre o cadáver
const DESOLACAO_AVES: StagePropSpec[] = [...DESOLACAO, { ...P("birds", 130, 1.15, undefined, 0.24), sky: true }]; // a nação que voa como a águia
const DESOLACAO_ESTRELAS: StagePropSpec[] = [...DESOLACAO, { ...P("starfield", 40, 2.6, undefined, 0.22), sky: true }]; // "como as estrelas dos céus"

export const CHAPTERS: Record<number, StageScript> = {
  // ================================================================== Dt 27
  27: {
    start: { terrain: "mountain", night: 0.28, glory: 0.42, storm: 0, fire: 0, verdure: 0.28 },
    beats: [
      mv(1, "Guardai todos estes mandamentos"),                                     // Moisés e os anciãos ordenam ao povo
      // v.2 — AS GRANDES PEDRAS caiadas ao passar o Jordão.
      b(2, { by: "moises", q: "levantar-te-ás umas pedras grandes", set: "pedras", props: PEDRAS,
        env: { terrain: "mountain", glory: 0.46, night: 0.24, verdure: 0.26 }, cast: [
        C("moises", -150, "point", { dy: 0.5, facing: 1 }),
        C("homem", 60, "raise", { dy: 0.54, facing: -1, id: "obreiro" }),
      ] }),
      // v.3 — ESCREVER nelas todas as palavras da Lei; terra que mana leite e mel.
      b(3, { by: "moises", q: "escreverás nelas todas as palavras desta lei", cast: [
        C("moises", -120, "write", { dy: 0.5, facing: 1 }),
        C("servo", 70, "write", { dy: 0.54, facing: -1, id: "escriba" }),
      ] }),
      mv(4, "no monte Ebal"),                                                        // no monte Ebal se erguem as pedras
      // v.5 — o ALTAR de pedras, sem instrumento de ferro.
      b(5, { by: "moises", q: "edificarás um altar", set: "altar", props: ALTAR,
        env: { terrain: "mountain", glory: 0.48, night: 0.22, fire: 0.2, verdure: 0.24 }, cast: [
        C("moises", -140, "raise", { dy: 0.5, facing: 1 }),
        C("servo", 90, "kneel", { dy: 0.58, facing: -1, id: "levita" }),
      ] }),
      // v.6 — HOLOCAUSTOS sobre o altar do Senhor.
      b(6, { by: "moises", q: "oferecerás holocaustos", env: { fire: 0.4, glory: 0.5 }, cast: [
        C("moises", -130, "raise", { dy: 0.5, facing: 1, glow: 0.2 }),
        C("servo", 80, "bow", { dy: 0.56, facing: -1, id: "levita" }),
      ] }),
      b(7, { by: "moises", q: "te alegrarás", env: { glory: 0.56, fire: 0.28 }, cast: [ // ofertas pacíficas; comer e alegrar-se perante o Senhor
        C("moises", -110, "raise", { dy: 0.5, facing: 1 }),
        C("multidao", 130, "stand", { dy: 0.6 }),
      ] }),
      // v.8 — ESCREVER a Lei nas pedras, nitidamente.
      b(8, { by: "moises", q: "exprimindo-as nitidamente", set: "pedras", props: PEDRAS,
        env: { terrain: "mountain", glory: 0.5, night: 0.22, verdure: 0.26 }, cast: [
        C("servo", -60, "write", { dy: 0.52, facing: 1, id: "escriba" }),
        C("moises", -180, "point", { dy: 0.5, facing: 1 }),
      ] }),
      // v.9 — "Guarda silêncio e ouve, ó Israel": Moisés com os sacerdotes levitas.
      b(9, { by: "moises", q: "Guarda silêncio e ouve", env: { glory: 0.52, night: 0.2 }, cast: [
        C("moises", -120, "raise", { dy: 0.5, facing: 1, glow: 0.15 }),
        C("servo", -20, "stand", { dy: 0.52, facing: 1, id: "levita" }),
        C("multidao", 150, "stand", { dy: 0.6 }),
      ] }),
      mv(10, "obedecerás à voz do Senhor teu Deus"),                                 // obedecer à voz e cumprir os mandamentos
      b(11, { cast: [                                                                // Moisés dá ordem naquele dia ao povo
        C("moises", -110, "point", { dy: 0.5, facing: 1 }),
        C("multidao", 130, "stand", { dy: 0.58 }),
      ] }),
      // v.12 — SEIS TRIBOS sobre o GERIZIM, para ABENÇOAR.
      b(12, { by: "moises", q: "sobre o monte Gerizim, para abençoarem", set: "montes", props: MONTES,
        env: { terrain: "mountain", glory: 0.5, night: 0.2, verdure: 0.3 }, cast: [
        C("multidao", -230, "raise", { dy: 0.34, id: "gerizim" }), // grupo da bênção, ao alto à esquerda
        C("moises", -30, "point", { dy: 0.52, facing: 1 }),
      ] }),
      // v.13 — SEIS TRIBOS sobre o EBAL, para AMALDIÇOAR.
      b(13, { by: "moises", q: "sobre o monte Ebal para amaldiçoar", env: { glory: 0.42, night: 0.28 }, cast: [
        C("multidao", 230, "stand", { dy: 0.34, id: "ebal" }), // grupo da maldição, ao alto à direita
        C("moises", -30, "point", { dy: 0.52, facing: -1 }),
      ] }),
      // v.14 — os LEVITAS testificam em ALTA VOZ.
      b(14, { by: "servo", q: "em alta voz", env: { glory: 0.4, night: 0.3 }, cast: [
        C("servo", 0, "raise", { dy: 0.5, id: "levitas" }),
        C("anciao", -160, "stand", { dy: 0.52, facing: 1, id: "anciao1" }),
        C("anciao", 170, "stand", { dy: 0.52, facing: -1, id: "anciao2" }),
      ] }),
      // v.15-26 — as MALDIÇÕES: o levita proclama, e todo o povo responde "Amém".
      // Clima solene; figuras individuais respondendo (nunca multidão comemorando).
      sv(15, "fizer imagem de escultura"),
      b(16, { by: "servo", q: "desprezar a seu pai ou a sua mãe", cast: [
        C("servo", -30, "point", { dy: 0.5, facing: 1, id: "levitas" }),
        C("homem", 150, "bow", { dy: 0.56, facing: -1, id: "povo1" }),
      ] }),
      sv(17, "remover os limites do seu próximo"),
      b(18, { by: "servo", q: "fizer que o cego erre de caminho", cast: [
        C("servo", -30, "raise", { dy: 0.5, facing: 1, id: "levitas" }),
        C("mulherComum", 150, "bow", { dy: 0.56, facing: -1, id: "povo2" }),
      ] }),
      sv(19, "perverter o direito do estrangeiro"),
      b(20, { by: "servo", q: "se deitar com a mulher de seu pai", cast: [
        C("servo", -30, "point", { dy: 0.5, facing: 1, id: "levitas" }),
        C("homem", 150, "bow", { dy: 0.56, facing: -1, id: "povo3" }),
      ] }),
      sv(21, "se deitar com algum animal"),
      sv(22, "se deitar com sua irmã"),
      b(23, { by: "servo", q: "se deitar com sua sogra", cast: [
        C("servo", -30, "raise", { dy: 0.5, facing: 1, id: "levitas" }),
        C("anciao", 150, "bow", { dy: 0.56, facing: -1, id: "povo4" }),
      ] }),
      sv(24, "ferir ao seu próximo em oculto"),
      sv(25, "aceitar suborno para ferir uma pessoa inocente"),
      // v.26 — a maldição-síntese: quem não confirmar as palavras desta lei.
      b(26, { by: "servo", q: "não confirmar as palavras desta lei", env: { glory: 0.36, night: 0.32 }, cast: [
        C("servo", -30, "raise", { dy: 0.5, facing: 1, id: "levitas" }),
        C("homem", 130, "bow", { dy: 0.56, facing: -1, id: "povo5" }),
        C("mulherComum", 210, "bow", { dy: 0.6, facing: -1, id: "povo6" }),
      ] }),
    ],
  },

  // ================================================================== Dt 28
  28: {
    start: { terrain: "field", night: 0.04, glory: 0.82, storm: 0, fire: 0, verdure: 0.72 },
    beats: [
      // v.1-14 — AS BÊNÇÃOS DA OBEDIÊNCIA: fartura, glória, cabeça e não cauda.
      b(1, { by: "moises", q: "te exaltará sobre todas as nações", set: "fartura", props: FARTURA,
        env: { terrain: "field", glory: 0.84, night: 0.04, verdure: 0.74 }, cast: [
        C("moises", -160, "raise", { dy: 0.5, facing: 1, glow: 0.35 }),
        C("multidao", 130, "stand", { dy: 0.58 }),
      ] }),
      mv(2, "todas estas bênçãos virão sobre ti"),                                   // todas as bênçãos virão e te alcançarão
      b(3, { by: "moises", q: "Bendito serás na cidade", env: { glory: 0.86, verdure: 0.76 }, cast: [ // bendito na cidade e no campo
        C("moises", -140, "raise", { dy: 0.5, facing: 1, glow: 0.3 }),
        C("multidao", 140, "raise", { dy: 0.56 }),
      ] }),
      b(4, { by: "moises", q: "Bendito o fruto do teu ventre", env: { verdure: 0.8 }, cast: [ // fruto do ventre, da terra e dos animais
        C("moises", -150, "point", { dy: 0.5, facing: 1 }),
        C("mulherComum", 90, "stand", { dy: 0.56, facing: -1, id: "mae" }),
      ] }),
      mv(5, "Bendito o teu cesto"),                                                  // bendito o cesto e a amassadeira
      mv(6, "Bendito serás ao entrares"),                                            // bendito ao entrar e ao sair
      // v.7 — VITÓRIA: os inimigos fogem por sete caminhos.
      b(7, { by: "moises", q: "por sete caminhos fugirão", env: { glory: 0.8, night: 0.06 }, cast: [
        C("moises", -150, "raise", { dy: 0.5, facing: 1, glow: 0.3 }),
        C("rei", 150, "walk", { dy: 0.5, facing: 1, id: "inimigo" }),   // inimigo em fuga
        C("homem", 90, "walk", { dy: 0.52, facing: 1, id: "inimigo2" }),
      ] }),
      b(8, { by: "moises", q: "a bênção esteja contigo nos teus celeiros", env: { verdure: 0.8, glory: 0.84 }, cast: [ // bênção nos celeiros e em toda obra
        C("moises", -140, "raise", { dy: 0.5, facing: 1, glow: 0.3 }),
        C("multidao", 140, "stand", { dy: 0.58 }),
      ] }),
      mv(9, "povo santo"),                                                           // confirmado como povo santo
      mv(10, "invocado sobre ti o nome do Senhor"),                                  // os povos temerão o nome do Senhor sobre ti
      b(11, { by: "moises", q: "abundância de bens", env: { verdure: 0.82 }, cast: [ // abundância de bens no fruto do ventre e do solo
        C("moises", -150, "raise", { dy: 0.5, facing: 1, glow: 0.3 }),
        C("multidao", 130, "raise", { dy: 0.56 }),
      ] }),
      // v.12 — a CHUVA do bom tesouro do céu; emprestarás a muitas nações.
      b(12, { by: "moises", q: "para dar chuva à tua terra", env: { glory: 0.82, verdure: 0.84 }, cast: [
        C("moises", -150, "raise", { dy: 0.5, facing: 1, glow: 0.35 }),
        C("multidao", 130, "raise", { dy: 0.56 }),
      ] }),
      // v.13 — ÍCONE: por CABEÇA e não por cauda; só em cima, não debaixo.
      b(13, { by: "moises", q: "por cabeça, e não por cauda", env: { glory: 0.88, night: 0.03 }, cast: [
        C("moises", -140, "raise", { dy: 0.5, facing: 1, glow: 0.4 }),
        C("multidao", 140, "raise", { dy: 0.54 }),
      ] }),
      mv(14, "nem para a direita nem para a esquerda"),                              // não desviar após outros deuses
      // ==================================================================
      // v.15-68 — A MALDIÇÃO DA DESOBEDIÊNCIA. O CLIMA MUDA RADICALMENTE:
      // glória cai a quase zero, noite e tempestade sobem, e só figuras
      // individuais sofrem (jamais multidão festiva).
      // ==================================================================
      b(15, { by: "moises", q: "todas estas maldições, e te alcançarão", set: "desolacao", props: DESOLACAO,
        env: { terrain: "field", glory: 0.08, night: 0.62, storm: 0.2, fire: 0.15, verdure: 0.08 }, cast: [
        C("moises", -160, "point", { dy: 0.5, facing: 1 }),
        C("homem", 90, "lie", { dy: 0.58, id: "aflito1" }),
        C("mulherComum", 180, "bow", { dy: 0.6, facing: -1, id: "aflito2" }),
      ] }),
      mv(16, "Maldito serás tu na cidade"),                                          // maldito na cidade e no campo
      mv(17, "Maldito o teu cesto"),                                                 // maldito o cesto e a amassadeira
      mv(18, "Maldito o fruto do teu ventre"),                                       // maldito o fruto do ventre e da terra
      mv(19, "Maldito serás ao entrares"),                                           // maldito ao entrar e ao sair
      b(20, { by: "moises", q: "a confusão e a derrota", env: { glory: 0.07, night: 0.66, storm: 0.25 }, cast: [ // maldição, confusão e derrota
        C("moises", -160, "point", { dy: 0.5, facing: 1 }),
        C("homem", 100, "lie", { dy: 0.58, id: "aflito1" }),
      ] }),
      // v.21 — a PESTILÊNCIA que consome.
      b(21, { by: "moises", q: "pegar em ti a pestilência", env: { glory: 0.06, night: 0.68 }, cast: [
        C("moises", -160, "point", { dy: 0.5, facing: 1 }),
        C("mulherComum", 80, "lie", { dy: 0.6, id: "doente1" }),
        C("homem", 190, "bow", { dy: 0.58, facing: -1, id: "doente2" }),
      ] }),
      // v.22-24 — a SECA: céu de bronze, terra de ferro, chuva de pó.
      b(22, { by: "moises", q: "te ferirá com a tísica e com a febre", set: "seca", props: SECA,
        env: { terrain: "field", glory: 0.1, night: 0.55, storm: 0.1, fire: 0.06, verdure: 0.03 }, cast: [
        C("moises", -160, "point", { dy: 0.5, facing: 1 }),
        C("homem", 100, "bow", { dy: 0.58, facing: -1, id: "febril" }),
      ] }),
      // v.23 — ÍCONE da seca: os céus de BRONZE, a terra de FERRO.
      b(23, { by: "moises", q: "serão de bronze", env: { glory: 0.12, night: 0.5, verdure: 0.02, fire: 0.05 }, cast: [
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
        C("homem", 110, "kneel", { dy: 0.6, facing: -1, id: "sedento" }),
      ] }),
      b(24, { by: "moises", q: "pó e poeira", env: { glory: 0.08, night: 0.58, storm: 0.35 }, cast: [ // chuva de pó e poeira dos céus
        C("moises", -160, "point", { dy: 0.5, facing: 1 }),
        C("mulherComum", 100, "bow", { dy: 0.6, facing: -1, id: "sedenta" }),
      ] }),
      // v.25 — DERROTA e dispersão por todos os reinos.
      b(25, { by: "moises", q: "espalhado por todos os reinos da terra", env: { glory: 0.06, night: 0.66, storm: 0.2 }, cast: [
        C("moises", -160, "point", { dy: 0.5, facing: 1 }),
        C("homem", 90, "lie", { dy: 0.58, id: "caido1" }),
        C("homem", 190, "walk", { dy: 0.54, facing: 1, id: "fugitivo" }),
      ] }),
      // v.26 — o CADÁVER servindo de comida às aves e aos animais.
      b(26, { by: "moises", q: "cadáver servirá de comida", props: SECA_AVES, env: { glory: 0.05, night: 0.7 }, cast: [
        C("moises", -160, "point", { dy: 0.5, facing: 1 }),
        C("homem", 100, "lie", { dy: 0.64, id: "morto" }),
      ] }),
      b(27, { by: "moises", q: "as úlceras do Egito", props: SECA, cast: [           // úlceras, tumores, sarna e coceira
        C("moises", -160, "point", { dy: 0.5, facing: 1 }),
        C("homem", 100, "bow", { dy: 0.58, facing: -1, id: "ulcerado" }),
      ] }),
      // v.28 — ÍCONE: LOUCURA, cegueira e pasmo de coração.
      b(28, { by: "moises", q: "te ferirá com loucura", env: { glory: 0.06, night: 0.68, storm: 0.15 }, cast: [
        C("moises", -160, "point", { dy: 0.5, facing: 1 }),
        C("homem", 90, "kneel", { dy: 0.6, facing: -1, id: "louco" }),
        C("mulherComum", 190, "bow", { dy: 0.6, facing: -1, id: "cega" }),
      ] }),
      b(29, { by: "moises", q: "como o cego apalpa na escuridão", env: { glory: 0.05, night: 0.72 }, cast: [ // apalpa ao meio-dia como o cego
        C("moises", -160, "point", { dy: 0.5, facing: 1 }),
        C("homem", 100, "bow", { dy: 0.6, facing: -1, id: "cego" }),
      ] }),
      mv(30, "plantarás uma vinha, porém não aproveitarás"),                         // mulher, casa e vinha tomadas por outrem
      // v.31 — o boi morto, o jumento roubado, as ovelhas dadas.
      b(31, { by: "moises", q: "O teu boi será morto aos teus olhos", env: { glory: 0.07, night: 0.66 }, cast: [
        C("moises", -160, "point", { dy: 0.5, facing: 1 }),
        C("homem", 100, "bow", { dy: 0.58, facing: -1, id: "lavrador" }),
      ] }),
      // v.32 — os FILHOS e filhas dados a outro povo, à vista dos pais.
      b(32, { by: "moises", q: "Teus filhos e tuas filhas serão dados a outro povo", env: { glory: 0.06, night: 0.68 }, cast: [
        C("moises", -160, "point", { dy: 0.5, facing: 1 }),
        C("mulherComum", 90, "bow", { dy: 0.6, facing: -1, id: "mae" }),
        C("homem", 180, "kneel", { dy: 0.6, facing: -1, id: "pai" }),
      ] }),
      mv(33, "comerá um povo que nunca conheceste"),                                 // o fruto comido por povo estranho
      // v.34 — ÍCONE: enlouquecerás com o que vires.
      b(34, { by: "moises", q: "enlouquecerás com o que vires", env: { glory: 0.05, night: 0.72, storm: 0.15 }, cast: [
        C("moises", -160, "point", { dy: 0.5, facing: 1 }),
        C("homem", 100, "kneel", { dy: 0.6, facing: -1, id: "louco" }),
      ] }),
      mv(35, "úlceras malignas nos joelhos"),                                        // úlceras da planta do pé ao alto da cabeça
      // v.36 — o EXÍLIO começa: levado a ti e a teu rei a nação estranha; servir a outros deuses.
      b(36, { by: "moises", q: "servirás a outros deuses, ao pau e à pedra", env: { glory: 0.06, night: 0.7 }, cast: [
        C("moises", -160, "point", { dy: 0.5, facing: 1 }),
        C("rei", 100, "walk", { dy: 0.52, facing: -1, id: "rei-cativo" }),
        C("homem", 190, "bow", { dy: 0.6, facing: -1, id: "cativo" }),
      ] }),
      mv(37, "por pasmo, por ditado, e por fábula"),                                 // por pasmo, ditado e fábula entre os povos
      // v.38 — o GAFANHOTO consome a semente; a lagarta, o arvoredo.
      b(38, { by: "moises", q: "o gafanhoto a consumirá", set: "gafanhotos", props: GAFANHOTOS,
        env: { terrain: "field", glory: 0.1, night: 0.55, storm: 0.12, verdure: 0.05 }, cast: [
        C("moises", -160, "point", { dy: 0.5, facing: 1 }),
        C("homem", 110, "bow", { dy: 0.6, facing: -1, id: "lavrador" }),
      ] }),
      mv(39, "porque o bicho as colherá"),                                           // a vinha comida pelo bicho
      mv(40, "a azeitona cairá da tua oliveira"),                                    // as azeitonas caem, sem azeite
      mv(41, "porque irão em cativeiro"),                                            // os filhos gerados irão em cativeiro
      b(42, { by: "moises", q: "consumirá a lagarta", env: { glory: 0.08, night: 0.58, verdure: 0.04 }, cast: [ // a lagarta consome todo o arvoredo
        C("moises", -160, "point", { dy: 0.5, facing: 1 }),
        C("mulherComum", 110, "bow", { dy: 0.6, facing: -1, id: "aflita" }),
      ] }),
      mv(43, "e tu mais baixo descerás"),                                            // o estrangeiro se eleva; tu desces
      // v.44 — CONTRA-ÍCONE de 28:13: ele por cabeça, tu por cauda.
      b(44, { by: "moises", q: "ele será por cabeça, e tu serás por cauda", env: { glory: 0.06, night: 0.66 }, cast: [
        C("moises", -160, "point", { dy: 0.5, facing: 1 }),
        C("homem", 110, "bow", { dy: 0.6, facing: -1, id: "abatido" }),
      ] }),
      b(45, { by: "moises", q: "e te perseguirão, e te alcançarão", set: "desolacao", props: DESOLACAO,
        env: { terrain: "field", glory: 0.06, night: 0.68, storm: 0.2, fire: 0.15, verdure: 0.05 }, cast: [ // as maldições perseguem até a destruição
        C("moises", -160, "point", { dy: 0.5, facing: 1 }),
        C("homem", 100, "lie", { dy: 0.58, id: "destruido" }),
      ] }),
      mv(46, "por sinal e por maravilha"),                                           // por sinal e maravilha para sempre
      mv(47, "não serviste ao Senhor teu Deus com alegria"),                         // por não servir com alegria na abundância
      // v.48 — o JUGO DE FERRO: servir aos inimigos com fome, sede e nudez.
      b(48, { by: "moises", q: "um jugo de ferro", env: { glory: 0.05, night: 0.7 }, cast: [
        C("moises", -160, "point", { dy: 0.5, facing: 1 }),
        C("homem", 100, "bow", { dy: 0.6, facing: -1, id: "escravo" }),
        C("mulherComum", 190, "kneel", { dy: 0.62, facing: -1, id: "escrava" }),
      ] }),
      // v.49 — a NAÇÃO de longe que voa como a águia.
      b(49, { by: "moises", q: "que voa como a águia", props: DESOLACAO_AVES, env: { glory: 0.06, night: 0.66, storm: 0.2 }, cast: [
        C("moises", -160, "point", { dy: 0.5, facing: 1 }),
        C("homem", 170, "bow", { dy: 0.6, facing: -1, id: "temeroso" }),
      ] }),
      b(50, { by: "moises", q: "Nação feroz de rosto", props: DESOLACAO, cast: [     // nação feroz, sem respeito ao velho nem ao moço
        C("moises", -160, "point", { dy: 0.5, facing: 1 }),
        C("homem", 160, "bow", { dy: 0.6, facing: -1, id: "abatido" }),
      ] }),
      mv(51, "não te deixará grão, mosto, nem azeite"),                              // devora o fruto até a destruição
      // v.52 — o CERCO: sitia todas as portas até caírem os muros.
      b(52, { by: "moises", q: "sitiar-te-á em todas as tuas portas", set: "cerco", props: CERCO,
        env: { terrain: "field", glory: 0.05, night: 0.72, storm: 0.25, fire: 0.2, verdure: 0.02 }, cast: [
        C("moises", -170, "point", { dy: 0.5, facing: 1 }),
        C("homem", 100, "bow", { dy: 0.6, facing: -1, id: "sitiado" }),
      ] }),
      // v.53 — o horror do cerco: comer a carne dos próprios filhos.
      b(53, { by: "moises", q: "a carne de teus filhos e de tuas filhas", env: { glory: 0.04, night: 0.76 }, cast: [
        C("moises", -170, "point", { dy: 0.5, facing: 1 }),
        C("mulherComum", 100, "lie", { dy: 0.62, id: "faminta" }),
        C("homem", 190, "kneel", { dy: 0.62, facing: -1, id: "faminto" }),
      ] }),
      mv(54, "o seu olho será maligno para com o seu irmão"),                        // o homem mimoso, olho maligno no cerco
      b(55, { by: "moises", q: "não dará a nenhum deles da carne de seus filhos", env: { glory: 0.04, night: 0.76 }, cast: [ // nada resta no cerco e no aperto
        C("moises", -170, "point", { dy: 0.5, facing: 1 }),
        C("homem", 110, "lie", { dy: 0.62, id: "faminto" }),
      ] }),
      mv(56, "mulher mais mimosa e delicada"),                                       // a mulher mimosa, olho maligno no cerco
      b(57, { by: "moises", q: "porque os comerá às escondidas", env: { glory: 0.04, night: 0.78 }, cast: [ // comerá os filhos às escondidas pela falta de tudo
        C("moises", -170, "point", { dy: 0.5, facing: 1 }),
        C("mulherComum", 110, "lie", { dy: 0.62, id: "faminta" }),
      ] }),
      // v.58 — o LIVRO desta lei; o nome glorioso e temível.
      b(58, { by: "moises", q: "este nome glorioso e temível", env: { glory: 0.1, night: 0.66 }, cast: [
        C("moises", -150, "raise", { dy: 0.5, facing: 1 }),
        C("servo", 60, "stand", { dy: 0.54, facing: -1, id: "levita" }),
      ] }),
      mv(59, "grandes e permanentes pragas"),                                        // pragas espantosas e permanentes
      mv(60, "todos os males do Egito"),                                             // os males do Egito voltam sobre ti
      b(61, { by: "moises", q: "toda a praga, que não está escrita", env: { glory: 0.05, night: 0.72 }, cast: [ // toda enfermidade e praga até a destruição
        C("moises", -160, "point", { dy: 0.5, facing: 1 }),
        C("homem", 110, "lie", { dy: 0.6, id: "enfermo" }),
      ] }),
      // v.62 — de ESTRELAS do céu a POUCOS em número.
      b(62, { by: "moises", q: "como as estrelas dos céus em multidão", props: DESOLACAO_ESTRELAS, env: { glory: 0.06, night: 0.78 }, cast: [
        C("moises", -160, "point", { dy: 0.5, facing: 1 }),
        C("homem", 180, "bow", { dy: 0.6, facing: -1, id: "restante" }),
      ] }),
      b(63, { by: "moises", q: "assim o Senhor se deleitará em destruir-vos", props: DESOLACAO, env: { glory: 0.04, night: 0.78, storm: 0.2 }, cast: [ // desarraigados da terra
        C("moises", -160, "point", { dy: 0.5, facing: 1 }),
        C("homem", 110, "lie", { dy: 0.6, id: "desarraigado" }),
      ] }),
      // v.64 — a DISPERSÃO entre todos os povos; servir a outros deuses de pau e pedra.
      b(64, { by: "moises", q: "vos espalhará entre todos os povos", env: { glory: 0.05, night: 0.74 }, cast: [
        C("moises", -170, "point", { dy: 0.5, facing: 1 }),
        C("homem", 90, "walk", { dy: 0.54, facing: 1, id: "disperso1" }),
        C("mulherComum", 190, "walk", { dy: 0.56, facing: 1, id: "dispersa2" }),
      ] }),
      // v.65 — nem repouso para a planta do pé: coração agitado, desmaio da alma.
      b(65, { by: "moises", q: "nem a planta de teu pé terá repouso", env: { glory: 0.04, night: 0.8 }, cast: [
        C("moises", -170, "point", { dy: 0.5, facing: 1 }),
        C("homem", 100, "bow", { dy: 0.6, facing: -1, id: "errante" }),
      ] }),
      b(66, { by: "moises", q: "estremecerás de noite e de dia", env: { glory: 0.04, night: 0.82, storm: 0.15 }, cast: [ // a vida em suspenso, sem crer na própria vida
        C("moises", -170, "point", { dy: 0.5, facing: 1 }),
        C("mulherComum", 100, "kneel", { dy: 0.62, facing: -1, id: "tremula" }),
      ] }),
      // v.67 — "quem me dera ver a noite… quem me dera ver a manhã": o pasmo do coração.
      b(67, { by: "moises", q: "quem me dera ver a noite", env: { glory: 0.03, night: 0.85 }, cast: [
        C("moises", -170, "point", { dy: 0.5, facing: 1 }),
        C("homem", 110, "kneel", { dy: 0.62, facing: -1, id: "aflito" }),
      ] }),
      // v.68 — o EXÍLIO final: de volta ao Egito em NAVIOS, vendidos como escravos.
      b(68, { by: "moises", q: "te fará voltar ao Egito em navios", set: "exilio", props: EXILIO,
        env: { terrain: "field", glory: 0.04, night: 0.8, storm: 0.2, verdure: 0.03 }, cast: [
        C("moises", -180, "point", { dy: 0.5, facing: 1 }),
        C("homem", 120, "bow", { dy: 0.62, facing: -1, id: "escravo1" }),
        C("mulherComum", 210, "bow", { dy: 0.64, facing: -1, id: "escrava2" }),
      ] }),
    ],
  },
};
