// ============================================================================
// GÊNESIS — cena viva, caps. 43–44 (A SEGUNDA VIAGEM e A TAÇA DE PRATA).
//
// Cap. 43: a fome APERTA em Canaã e quebra a resistência de Israel. O capítulo
// é uma travessia física (deserto seco → casa do governador do Egito) e uma
// travessia moral: JUDÁ, o mesmo que vendeu José no cap. 37, se põe como
// FIADOR de Benjamim ("da minha mão o requererás") — por isso ele carrega um
// glow que nasce em 0.2 no v.8 e nunca mais se apaga. Do outro lado, José vê
// os onze irmãos inclinados até à terra (v.26, v.28): o sonho do feixe e das
// estrelas cumprido inteiro, e ninguém em cena sabe disso além dele. O v.30
// é o coração do capítulo: ele SAI do palco para chorar — a câmara fechada,
// José sozinho, glória 0.4. O banquete termina em festa desigual de propósito:
// a porção de Benjamim CINCO VEZES maior (cinco malgas no palco) e os irmãos
// assentados POR ORDEM DE IDADE, coisa que nenhum egípcio poderia saber.
//
// Cap. 44: a armadilha e O MAIOR DISCURSO DE GÊNESIS. O env é um funil: a noite
// do copo escondido → a manhã da partida (glória) → a tempestade da perseguição
// crescendo saco por saco (crate ×3 no corredor de extras) → o copo achado em
// Benjamim (storm 0.42) → as vestes rasgadas (night 0.42) → e então, dentro da
// casa, a luz VOLTA A SUBIR sobre Judá enquanto ele fala: glory 0.26 → 0.55,
// glow 0.28 → 0.55. Judá não argumenta juridicamente: ele conta a história do
// ponto de vista do PAI ("a sua alma está ligada com a alma dele") e oferece o
// próprio corpo no lugar do moço. É o arrependimento consumado — e é isso que
// quebra José no capítulo seguinte.
//
// DEUS NUNCA É DESENHADO: a bênção de Israel (43:14, "Deus Todo-Poderoso vos
// dê misericórdia") e a confissão de Judá (44:16, "Achou Deus a iniquidade de
// teus servos") são LUZ no ambiente — glory subindo —, nunca figura.
//
// Elenco: `jaco` = Israel, o pai; `homem` (sem id) = JUDÁ, a voz dos irmãos
// nestes dois capítulos; `multidao` = os demais irmãos; `pastor` (scale 0.9) =
// BENJAMIM, o moço trazido de Canaã, o único do grupo que nunca fala; `servo`
// = o mordomo, "o que estava sobre a sua casa"; `homem` com id "simeao" =
// SIMEÃO, solto do cárcere no v.23 (não fala, por isso leva id e não rouba o
// balão de Judá). José leva glow ~0.35 em todo o Egito: é o governador, e o
// SENHOR está com ele.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });

// ------------------------------------------------------------------ Gn 43: sets
// CANAÃ NA FOME: o acampamento de Israel no Neguebe ressecado — a tenda grande
// do pai, as tendas dos filhos, o poço fundo, tamareira sem sombra, capim
// queimado. O corredor dx -100..-190 fica LIVRE: é a vaga dos extras do
// versículo (o saco vazio, o presente, o dinheiro em dobro).
const CANAA: StagePropSpec[] = [
  P("tent", -286, 1.3, undefined, 0.14),       // a tenda de Israel, o pai
  P("tent", 246, 1.1, undefined, 0.2),         // as tendas dos filhos
  P("well", 316, 1.0, undefined, 0.62),        // o poço do acampamento
  P("rock", -320, 0.95, undefined, 0.42),
  P("rock", 44, 0.6, undefined, 0.74),
  P("rock", 196, 0.8, undefined, 0.5),
  P("palm", 22, 1.0, undefined, 0.06),         // tamareira sem fruto — a fome
  P("bush", -60, 0.8, undefined, 0.3),
  P("bush", 128, 0.75, undefined, 0.66),
  P("amphora", -246, 0.85, undefined, 0.56),
  P("crate", -212, 0.9, undefined, 0.44),
  P("grass", -236, 0.85, undefined, 0.84),
  P("grass", 276, 0.8, undefined, 0.76),
];

// v.2 — "acabaram de comer o mantimento que trouxeram do Egito": o saco vazio
// em destaque no corredor de extras. É ele que empurra a história adiante.
const CANAA_VAZIO: StagePropSpec[] = [
  ...CANAA,
  P("crate", -140, 1.05, undefined, 0.2),      // o saco do Egito, vazio
];

// v.11 — "tomai do mais precioso desta terra… levai ao homem um presente":
// bálsamo e mel na ânfora, especiarias e mirra na malga.
const CANAA_PRESENTE: StagePropSpec[] = [
  ...CANAA_VAZIO,
  P("amphora", -178, 1.0, undefined, 0.36),    // um pouco do bálsamo e um pouco de mel
  P("bowl", -108, 0.9, undefined, 0.1),        // especiarias, mirra, terebinto e amêndoas
];

// v.12 — "tomai em vossas mãos dinheiro em dobro": a segunda arca de prata,
// mais o dinheiro que voltou na boca dos sacos.
const CANAA_DINHEIRO: StagePropSpec[] = [
  ...CANAA_PRESENTE,
  P("crate", -166, 0.95, undefined, 0.58),     // o dinheiro em dobro
];

// A CASA DE JOSÉ NO EGITO: casa de governador — portão pesado, torres do
// palácio ao fundo, candeeiros acesos, banca da despensa, o poço do pátio
// (a água que lava os pés dos hóspedes no v.24). Corredor de extras livre.
const CASA_JOSE: StagePropSpec[] = [
  P("tower", 300, 1.3, undefined, 0.04),       // as torres do palácio, ao fundo
  P("tower", -300, 1.2, undefined, 0.06),
  P("door", 214, 1.2, undefined, 0.12),        // o portão da casa de José
  P("lampstand", -252, 1.0, 1, 0.32),
  P("lampstand", 252, 1.0, 1, 0.34),
  P("stall", -220, 1.0, undefined, 0.2),       // a banca da despensa
  P("well", 320, 1.0, undefined, 0.66),        // o poço do pátio
  P("palm", 150, 1.05, undefined, 0.2),
  P("palm", 40, 0.95, undefined, 0.05),
  P("bush", 116, 0.8, undefined, 0.58),
  P("amphora", -56, 0.85, undefined, 0.84),
  P("crate", 76, 0.85, undefined, 0.88),
  P("grass", -16, 1.0, undefined, 0.92),
  P("grass", 196, 0.95, undefined, 0.74),
  P("grass", 286, 0.9, undefined, 0.5),
];

// v.24 — "deu-lhes água, e lavaram os seus pés": a bacia do hóspede. Detalhe
// pequeno e enorme: eles esperavam correntes, receberam hospitalidade.
const CASA_AGUA: StagePropSpec[] = [
  ...CASA_JOSE,
  P("bowl", -120, 1.0, undefined, 0.18),       // a água para lavar os pés
];

// v.25–26 — "e prepararam o presente, para quando José viesse ao meio-dia":
// o presente de Canaã posto à vista, esperando o senhor do Egito.
const CASA_PRESENTE: StagePropSpec[] = [
  ...CASA_AGUA,
  P("crate", -160, 1.05, undefined, 0.34),     // o presente arrumado
  P("amphora", -190, 0.95, undefined, 0.5),    // o bálsamo e o mel de Canaã
];

// v.30 — A CÂMARA: José sai do banquete e fecha a porta. Cenografia mínima de
// propósito — a solidão é o palco. Ele chora onde ninguém vê.
const CAMARA: StagePropSpec[] = [
  P("door", -140, 1.3, undefined, 0.16),       // a porta da câmara, fechada
  P("lampstand", 60, 1.0, 1, 0.3),
  P("tower", 300, 1.2, undefined, 0.05),
  P("amphora", -40, 0.85, undefined, 0.72),
  P("crate", 120, 0.85, undefined, 0.6),
  P("grass", 220, 0.85, undefined, 0.8),
];

// v.31–33 — O BANQUETE: "Ponde pão". O fogo da cozinha e a primeira porção.
const BANQUETE: StagePropSpec[] = [
  ...CASA_JOSE,
  P("campfire", -170, 1.05, 0.9, 0.36),        // o fogo do banquete do meio-dia
  P("bowl", -120, 1.0, undefined, 0.16),       // as porções que estavam diante dele
];

// v.34 — "a porção de Benjamim era CINCO VEZES maior": cinco malgas no palco,
// a contagem visível do favor. É a provação secreta da inveja dos irmãos.
const BANQUETE_CINCO: StagePropSpec[] = [
  ...BANQUETE,
  P("bowl", -60, 0.95, undefined, 0.28),
  P("bowl", 0, 0.95, undefined, 0.2),
  P("bowl", 96, 0.95, undefined, 0.3),
  P("bowl", 176, 0.9, undefined, 0.5),
];

// ------------------------------------------------------------------ Gn 44: sets
// v.1 — os sacos enchidos de mantimento "quanto puderem levar", e o dinheiro
// de cada um de volta na boca do saco: a bondade que virá a ser acusação.
const SACOS_CHEIOS: StagePropSpec[] = [
  ...CASA_JOSE,
  P("crate", -150, 1.1, undefined, 0.24),      // sacos cheios de mantimento
  P("crate", -186, 1.0, undefined, 0.44),
];

// v.2 — O COPO DE PRATA, escondido na boca do saco do mais novo. A armadilha
// entra em cena pequena, brilhando de lado, e vai reger dois capítulos.
const COPO_PRATA: StagePropSpec[] = [
  ...SACOS_CHEIOS,
  { ...P("bowl", -112, 1.05, undefined, 0.12), tag: "taca-jose" },      // o copo de prata de José
];

// A ESTRADA fora da cidade: eles ainda não se distanciaram. O portão do Egito
// e as torres ficam ATRÁS deles, à direita — a perseguição vem de lá.
const ESTRADA: StagePropSpec[] = [
  P("tower", 300, 1.35, undefined, 0.04),      // o Egito que eles pensam ter deixado
  P("door", 252, 1.25, undefined, 0.12),       // a porta da cidade
  P("palm", 200, 1.05, undefined, 0.2),
  P("palm", -300, 1.1, undefined, 0.1),
  P("rock", -320, 0.95, undefined, 0.44),
  P("rock", -230, 0.85, undefined, 0.3),
  P("rock", 60, 0.65, undefined, 0.76),
  P("bush", -40, 0.8, undefined, 0.32),
  P("bush", 140, 0.8, undefined, 0.62),
  P("grass", -250, 0.85, undefined, 0.84),
  P("grass", 20, 0.95, undefined, 0.9),
  P("grass", 280, 0.9, undefined, 0.56),
];

// v.11 — "cada um pôs em terra o seu saco, e cada um abriu o seu saco": três
// sacos abertos em fila no corredor de extras. O suspense é geográfico — a
// busca vem descendo do maior para o menor, saco por saco.
const ESTRADA_SACOS: StagePropSpec[] = [
  ...ESTRADA,
  P("crate", -108, 1.0, undefined, 0.14),
  P("crate", -148, 1.05, undefined, 0.3),
  P("crate", -188, 1.0, undefined, 0.46),
];

// v.12 — "e achou-se o copo no saco de Benjamim": a prata aparece à luz.
const ESTRADA_COPO: StagePropSpec[] = [
  ...ESTRADA_SACOS,
  { ...P("bowl", -70, 1.1, undefined, 0.2), tag: "taca-jose" },         // O COPO, achado no saco do mais novo
];

// v.15–34 — de volta à casa, o copo fica SOBRE A MESA durante todo o discurso
// de Judá: a prova muda, silenciosa, enquanto o coração se abre.
const CASA_COPO: StagePropSpec[] = [
  ...CASA_JOSE,
  P("bowl", -130, 1.05, undefined, 0.18),      // o copo de prata, a acusação em cena
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Gn 43
  // Arco de env: fome seca em Canaã (storm 0.3 / glory 0.08) → o atrito entre
  // pai e filhos escurecendo (night 0.42) → a fiança de Judá acendendo luz
  // (glory 0.3) → a bênção do pai (0.5) → o Egito claro (city, night 0.15) →
  // O MEDO na casa (storm 0.3, glory 0.14) → "paz seja convosco" (storm 0,
  // glory 0.45) → a reverência dos onze (0.52) → Benjamim (0.58) → a câmara
  // do choro (0.4, recolhida) → e o banquete fechando em 0.62.
  43: {
    start: { terrain: "desert", night: 0.32, glory: 0.08, storm: 0.3, fire: 0 },
    beats: [
      b(1, { props: CANAA, cast: [                                                 // a fome era GRAVÍSSIMA na terra
        C("jaco", -20, "stand", { dy: 0.46 }),
        C("multidao", 185, "stand", { dy: 0.36 }),
      ] }),
      b(2, { by: "jaco", q: "disse-lhes seu pai: ", props: CANAA_VAZIO, cast: [    // acabou o mantimento: "Voltai, comprai-nos"
        C("jaco", -34, "point", { dy: 0.46, facing: 1 }),
        C("homem", 46, "stand", { dy: 0.5, facing: -1 }),
        C("multidao", 195, "stand", { dy: 0.36 }),
      ] }),
      b(3, { by: "homem", q: "respondeu-lhe, dizendo: ", env: { night: 0.38 }, cast: [  // "Fortemente nos protestou aquele homem"
        C("jaco", -50, "stand", { dy: 0.46, facing: 1 }),
        C("homem", 30, "point", { dy: 0.5, facing: -1 }),
        C("multidao", 190, "stand", { dy: 0.36 }),
      ] }),
      b(4, { by: "homem", cast: [                                                  // "Se enviares conosco o nosso irmão, desceremos"
        C("jaco", -54, "stand", { dy: 0.46, facing: 1 }),
        C("homem", 20, "stand", { dy: 0.5, facing: -1 }),
        C("multidao", 186, "stand", { dy: 0.36 }),
      ] }),
      b(5, { by: "homem", env: { night: 0.42 } }),                                 // "Não vereis a minha face" — o impasse
      b(6, { by: "jaco", q: "E disse Israel: ", env: { storm: 0.34 }, cast: [      // "Por que me fizeste tal mal?" — a dor do pai
        C("jaco", -46, "raise", { dy: 0.46, facing: 1 }),
        C("homem", 26, "stand", { dy: 0.5, facing: -1 }),
        C("multidao", 186, "stand", { dy: 0.36 }),
      ] }),
      b(7, { by: "multidao", q: "E eles disseram: ", cast: [                        // a defesa dos irmãos: ele nos perguntou tudo
        C("jaco", -60, "stand", { dy: 0.46, facing: 1 }),
        C("homem", 40, "stand", { dy: 0.52, facing: -1 }),
        C("multidao", 150, "stand", { dy: 0.38 }),
      ] }),
      b(8, { by: "homem", q: "Então disse Judá a Israel, seu pai: ", env: { storm: 0.2 }, cast: [  // "Envia o jovem comigo… para que vivamos"
        C("jaco", -62, "stand", { dy: 0.46, facing: 1 }),
        C("homem", 4, "stand", { glow: 0.2, dy: 0.5, facing: 1 }),
        C("multidao", 170, "stand", { dy: 0.38 }),
      ] }),
      b(9, { by: "homem", env: { glory: 0.3 }, cast: [                              // A FIANÇA: "Eu serei fiador por ele" — o caráter acende
        C("jaco", -58, "stand", { dy: 0.46, facing: 1 }),
        C("homem", -6, "raise", { glow: 0.4, dy: 0.5, facing: 1 }),
        C("multidao", 176, "stand", { dy: 0.38 }),
      ] }),
      b(10, { by: "homem", cast: [                                                  // "já estaríamos segunda vez de volta"
        C("jaco", -58, "stand", { dy: 0.46, facing: 1 }),
        C("homem", 6, "stand", { glow: 0.35, dy: 0.5, facing: 1 }),
        C("multidao", 176, "stand", { dy: 0.38 }),
      ] }),
      b(11, { by: "jaco", q: "Então disse-lhes Israel, seu pai: ", props: CANAA_PRESENTE, env: { storm: 0.15, glory: 0.3 }, cast: [  // Israel cede: bálsamo, mel, especiarias
        C("jaco", -40, "point", { dy: 0.46, facing: 1 }),
        C("homem", 34, "stand", { glow: 0.35, dy: 0.5, facing: -1 }),
        C("multidao", 176, "stand", { dy: 0.38 }),
      ] }),
      b(12, { by: "jaco", props: CANAA_DINHEIRO }),                                 // o dinheiro em dobro: "bem pode ser que fosse erro"
      b(13, { by: "jaco", cast: [                                                   // "Tomai também a vosso irmão" — BENJAMIM entra em cena
        C("jaco", -44, "point", { dy: 0.46, facing: 1 }),
        C("homem", 30, "stand", { glow: 0.35, dy: 0.5, facing: -1 }),
        C("pastor", 96, "stand", { dy: 0.58, scale: 0.9 }),
        C("multidao", 190, "stand", { dy: 0.38 }),
      ] }),
      b(14, { by: "jaco", env: { glory: 0.5, storm: 0.08 }, cast: [                 // "Deus vos dê misericórdia… desfilhado ficarei" (a bênção é LUZ)
        C("jaco", -30, "raise", { dy: 0.46 }),
        C("homem", 40, "bow", { glow: 0.35, dy: 0.5, facing: -1 }),
        C("pastor", 100, "bow", { dy: 0.58, scale: 0.9 }),
        C("multidao", 190, "bow", { dy: 0.38 }),
      ] }),
      b(15, { set: "egito", props: CASA_JOSE, env: { terrain: "city", night: 0.15, glory: 0.32, storm: 0 }, cast: [  // desceram ao Egito e apresentaram-se diante de José
        C("jose", 30, "stand", { glow: 0.35, dy: 0.4 }),
        C("homem", -70, "walk", { glow: 0.35, dy: 0.52, facing: 1 }),
        C("pastor", -20, "walk", { dy: 0.56, scale: 0.9, facing: 1 }),
        C("multidao", -210, "walk", { dy: 0.34, facing: 1 }),
      ] }),
      b(16, { by: "jose", q: "disse ao que estava sobre a sua casa: ", env: { glory: 0.36 }, cast: [  // VENDO BENJAMIM: "estes homens comerão comigo ao meio-dia"
        C("jose", 26, "point", { glow: 0.35, dy: 0.4 }),
        C("servo", 96, "bow", { id: "mordomo", dy: 0.46, facing: -1 }),
        C("homem", -60, "stand", { glow: 0.35, dy: 0.52, facing: 1 }),
        C("pastor", -14, "stand", { dy: 0.56, scale: 0.9, facing: 1 }),
        C("multidao", -200, "stand", { dy: 0.34, facing: 1 }),
      ] }),
      b(17, { env: { glory: 0.3 }, cast: [                                          // o mordomo faz como José disse e leva-os à casa
        C("servo", 40, "walk", { id: "mordomo", dy: 0.48, facing: -1 }),
        C("homem", -30, "walk", { glow: 0.35, dy: 0.52, facing: 1 }),
        C("pastor", 10, "walk", { dy: 0.56, scale: 0.9, facing: 1 }),
        C("multidao", 170, "walk", { dy: 0.36, facing: -1 }),
      ] }),
      b(18, { by: "pastor", q: "e diziam: ", env: { storm: 0.3, night: 0.32, glory: 0.14 }, cast: [  // O MEDO: "por causa do dinheiro… para nos incriminar"
        C("pastor", 20, "bow", { dy: 0.56, scale: 0.9, id: "irmao-de-jose1" }),
        C("homem", -40, "stand", { glow: 0.35, dy: 0.52, facing: 1 }),
        C("homem", 150, "bow", { dy: 0.44, id: "irmao-de-jose2" }),
        C("homem", 235, "stand", { dy: 0.38, scale: 0.92, id: "irmao-de-jose3" }),
      ] }),
      b(19, { env: { storm: 0.24 }, cast: [                                         // chegaram-se ao mordomo, à porta da casa
        C("servo", 70, "stand", { id: "mordomo", dy: 0.46, facing: -1 }),
        C("homem", -10, "walk", { glow: 0.35, dy: 0.52, facing: 1 }),
        C("pastor", 40, "stand", { dy: 0.56, scale: 0.9 }),
        C("multidao", 180, "stand", { dy: 0.38 }),
      ] }),
      b(20, { by: "multidao", q: "E disseram: ", cast: [                             // "Ai! senhor meu, certamente descemos dantes"
        C("servo", 62, "stand", { id: "mordomo", dy: 0.46, facing: -1 }),
        C("homem", -20, "bow", { glow: 0.35, dy: 0.52 }),
        C("pastor", 30, "bow", { dy: 0.56, scale: 0.9 }),
        C("multidao", 160, "bow", { dy: 0.38 }),
      ] }),
      b(21, { by: "multidao", env: { storm: 0.2 } }),                                // a estalagem: o dinheiro na boca de cada saco
      b(22, { by: "multidao" }),                                                     // "não sabemos quem tenha posto o nosso dinheiro"
      b(23, { by: "servo", q: "E ele disse: ", env: { storm: 0, glory: 0.45, night: 0.12 }, cast: [  // "PAZ… vosso Deus vos tem dado um tesouro"; e trouxe SIMEÃO
        C("servo", 60, "raise", { id: "mordomo", dy: 0.46, facing: -1 }),
        C("homem", -30, "stand", { glow: 0.35, dy: 0.52, facing: 1 }),
        C("pastor", 26, "stand", { dy: 0.56, scale: 0.9 }),
        C("homem", 130, "walk", { id: "simeao", dy: 0.6, facing: -1 }),
        C("multidao", 200, "stand", { dy: 0.38 }),
      ] }),
      b(24, { props: CASA_AGUA, env: { night: 0.1, glory: 0.38 }, cast: [             // água, lavaram os pés; pasto aos jumentos
        C("servo", 80, "point", { id: "mordomo", dy: 0.46, facing: -1 }),
        C("homem", -46, "kneel", { glow: 0.35, dy: 0.54 }),
        C("pastor", 16, "kneel", { dy: 0.56, scale: 0.9 }),
        C("homem", 120, "kneel", { id: "simeao", dy: 0.58 }),
        C("multidao", 200, "stand", { dy: 0.38 }),
      ] }),
      b(25, { props: CASA_PRESENTE, env: { glory: 0.42 }, cast: [                     // prepararam o presente: haviam de comer pão ali
        C("servo", 90, "walk", { id: "mordomo", dy: 0.46, facing: -1 }),
        C("homem", -50, "stand", { glow: 0.35, dy: 0.52 }),
        C("pastor", 6, "stand", { dy: 0.56, scale: 0.9 }),
        C("homem", 110, "stand", { id: "simeao", dy: 0.58 }),
        C("multidao", 195, "stand", { dy: 0.38 }),
      ] }),
      b(26, { env: { glory: 0.52 }, cast: [                                           // INCLINARAM-SE ATÉ À TERRA — os sonhos cumpridos
        C("jose", 20, "stand", { glow: 0.4, dy: 0.4 }),
        C("homem", -60, "bow", { glow: 0.35, dy: 0.52 }),
        C("pastor", -6, "bow", { dy: 0.56, scale: 0.9 }),
        C("homem", 96, "bow", { id: "simeao", dy: 0.58 }),
        C("multidao", 190, "bow", { dy: 0.38 }),
      ] }),
      b(27, { by: "jose", q: "e disse: ", cast: [                                     // "Vosso pai, o ancião… está bem? Ainda vive?"
        C("jose", 16, "point", { glow: 0.4, dy: 0.4 }),
        C("homem", -60, "stand", { glow: 0.35, dy: 0.52, facing: 1 }),
        C("pastor", -6, "stand", { dy: 0.56, scale: 0.9, facing: 1 }),
        C("homem", 96, "stand", { id: "simeao", dy: 0.58 }),
        C("multidao", 190, "stand", { dy: 0.38 }),
      ] }),
      b(28, { by: "multidao", q: "E eles disseram: ", env: { glory: 0.5 }, cast: [    // "Bem está o teu servo" — e inclinaram-se outra vez
        C("jose", 16, "stand", { glow: 0.4, dy: 0.4 }),
        C("homem", -60, "bow", { glow: 0.35, dy: 0.52 }),
        C("pastor", -6, "bow", { dy: 0.56, scale: 0.9 }),
        C("homem", 96, "bow", { id: "simeao", dy: 0.58 }),
        C("multidao", 190, "bow", { dy: 0.38 }),
      ] }),
      b(29, { by: "jose", q: "e disse: ", env: { glory: 0.58 }, cast: [               // "É ESTE VOSSO IRMÃO MAIS NOVO?… Deus te dê a sua graça"
        C("jose", -26, "stand", { glow: 0.45, dy: 0.42, facing: 1 }),
        C("pastor", 34, "stand", { glow: 0.25, dy: 0.5, scale: 0.9, facing: -1 }),
        C("homem", -84, "stand", { glow: 0.35, dy: 0.54, facing: 1 }),
        C("homem", 120, "stand", { id: "simeao", dy: 0.58 }),
        C("multidao", 200, "bow", { dy: 0.38 }),
      ] }),
      b(30, { set: "camara", props: CAMARA, env: { glory: 0.4, night: 0.22 }, cast: [ // as entranhas comoveram-se: entrou na câmara e CHOROU ALI
        C("jose", -10, "kneel", { glow: 0.4, dy: 0.5 }),
      ] }),
      b(31, { by: "jose", q: "e disse: ", set: "banquete", props: BANQUETE, env: { glory: 0.46, night: 0.12 }, cast: [  // lavou o rosto, conteve-se: "Ponde pão"
        C("jose", 20, "stand", { glow: 0.4, dy: 0.4 }),
        C("homem", -60, "stand", { glow: 0.35, dy: 0.52 }),
        C("pastor", -8, "stand", { dy: 0.56, scale: 0.9 }),
        C("homem", 96, "stand", { id: "simeao", dy: 0.58 }),
        C("multidao", 190, "stand", { dy: 0.38 }),
      ] }),
      b(32, { env: { glory: 0.42 }, cast: [                                            // MESAS SEPARADAS: José à parte, egípcios à parte, hebreus à parte
        C("jose", -100, "stand", { glow: 0.4, dy: 0.44, facing: 1 }),
        C("multidao", -240, "stand", { id: "egipcios", dy: 0.3 }),
        C("homem", 30, "stand", { glow: 0.35, dy: 0.52, facing: -1 }),
        C("pastor", 86, "stand", { dy: 0.56, scale: 0.9, facing: -1 }),
        C("multidao", 200, "stand", { dy: 0.38 }),
      ] }),
      b(33, { env: { glory: 0.52 }, cast: [                                            // assentados POR ORDEM DE IDADE (esq.→dir.) — eles se maravilham
        C("jose", -120, "kneel", { glow: 0.4, dy: 0.46, facing: 1 }),
        C("homem", -60, "kneel", { id: "simeao", dy: 0.52 }),
        C("homem", -14, "kneel", { glow: 0.35, dy: 0.54 }),
        C("pastor", 60, "kneel", { dy: 0.56, scale: 0.9 }),
        C("multidao", 210, "kneel", { dy: 0.38 }),
      ] }),
      b(34, { props: BANQUETE_CINCO, env: { glory: 0.62, night: 0.08 }, cast: [         // a porção de Benjamim CINCO VEZES maior: beberam e se regalaram
        C("jose", -120, "raise", { glow: 0.45, dy: 0.46, facing: 1 }),
        C("homem", -60, "kneel", { id: "simeao", dy: 0.52 }),
        C("homem", -14, "kneel", { glow: 0.35, dy: 0.54 }),
        C("pastor", 60, "kneel", { glow: 0.25, dy: 0.56, scale: 0.9 }),
        C("multidao", 210, "kneel", { dy: 0.38 }),
      ] }),
    ],
  },

  // ------------------------------------------------------------------ Gn 44
  // Arco de env: a noite da armadilha (night 0.55) → a manhã da partida
  // (night 0.1, glory 0.35) → a tempestade da perseguição subindo saco por
  // saco (storm 0.12 → 0.3) → O COPO EM BENJAMIM (storm 0.42, night 0.3) →
  // as vestes rasgadas (night 0.42, glory 0.05) → e, na casa, a luz sobe
  // SOBRE JUDÁ enquanto ele fala: glory 0.26 → 0.55 (com quedas nos versos do
  // pai: v.28 "foi despedaçado", v.29 "as minhas cãs à sepultura").
  44: {
    start: { terrain: "city", night: 0.5, glory: 0.2, storm: 0, fire: 0 },
    beats: [
      b(1, { by: "jose", q: "sobre a sua casa, dizendo: ", props: SACOS_CHEIOS, cast: [  // a ordem secreta: enche os sacos, devolve o dinheiro
        C("jose", -20, "point", { glow: 0.35, dy: 0.44 }),
        C("servo", 70, "kneel", { id: "mordomo", dy: 0.5, facing: -1 }),
      ] }),
      b(2, { by: "jose", props: COPO_PRATA, env: { night: 0.55, glory: 0.18 }, cast: [   // O COPO DE PRATA no saco do mais novo — a armadilha
        C("jose", -30, "point", { glow: 0.35, dy: 0.44 }),
        C("servo", 60, "kneel", { id: "mordomo", dy: 0.5, facing: -1 }),
      ] }),
      b(3, { set: "estrada", props: ESTRADA, env: { terrain: "desert", night: 0.1, glory: 0.35 }, cast: [  // vinda a luz da manhã, despediram-se com os jumentos
        C("homem", -40, "walk", { glow: 0.35, dy: 0.52, facing: -1 }),
        C("pastor", 10, "walk", { dy: 0.56, scale: 0.9, facing: -1 }),
        C("multidao", 150, "walk", { dy: 0.38, facing: -1 }),
      ] }),
      b(4, { by: "jose", q: "disse José ao que estava sobre a sua casa: ", env: { storm: 0.12 }, cast: [  // (VOZ, longe) "persegue-os: Por que pagastes mal por bem?"
        C("homem", -90, "walk", { glow: 0.35, dy: 0.52, facing: -1 }),
        C("pastor", -50, "walk", { dy: 0.56, scale: 0.9, facing: -1 }),
        C("multidao", 90, "walk", { dy: 0.38, facing: -1 }),
      ] }),
      b(5, { by: "jose", env: { storm: 0.18 } }),                                        // "Não é este o copo em que bebe meu senhor?"
      b(6, { env: { storm: 0.22 }, cast: [                                               // alcançou-os e falou-lhes as mesmas palavras
        C("servo", 130, "walk", { id: "mordomo", dy: 0.46, facing: -1 }),
        C("homem", -70, "stand", { glow: 0.35, dy: 0.52, facing: 1 }),
        C("pastor", -30, "stand", { dy: 0.56, scale: 0.9, facing: 1 }),
        C("multidao", 60, "stand", { dy: 0.38 }),
      ] }),
      b(7, { by: "multidao", q: "E eles disseram-lhe: ", cast: [                          // "Longe estejam teus servos de fazerem semelhante coisa"
        C("servo", 110, "stand", { id: "mordomo", dy: 0.46, facing: -1 }),
        C("homem", -66, "stand", { glow: 0.35, dy: 0.52, facing: 1 }),
        C("pastor", -26, "stand", { dy: 0.56, scale: 0.9, facing: 1 }),
        C("multidao", 70, "raise", { dy: 0.38 }),
      ] }),
      b(8, { by: "multidao", env: { storm: 0.24 } }),                                     // "como furtaríamos prata ou ouro?" — a inocência confiante
      b(9, { by: "multidao" }),                                                          // a sentença que eles mesmos propõem: "morra… seremos escravos"
      b(10, { by: "servo", q: "E ele disse: ", env: { storm: 0.26 }, cast: [              // "aquele com quem se achar será meu escravo"
        C("servo", 80, "point", { id: "mordomo", dy: 0.46, facing: -1 }),
        C("homem", -66, "stand", { glow: 0.35, dy: 0.52, facing: 1 }),
        C("pastor", -26, "stand", { dy: 0.56, scale: 0.9, facing: 1 }),
        C("multidao", 60, "stand", { dy: 0.38 }),
      ] }),
      b(11, { props: ESTRADA_SACOS, env: { storm: 0.3 }, cast: [                          // cada um pôs em terra o seu saco e o abriu — SUSPENSE
        C("servo", 110, "stand", { id: "mordomo", dy: 0.46, facing: -1 }),
        C("homem", -70, "kneel", { glow: 0.35, dy: 0.54 }),
        C("pastor", -24, "kneel", { dy: 0.56, scale: 0.9 }),
        C("multidao", 80, "kneel", { dy: 0.4 }),
      ] }),
      b(12, { props: ESTRADA_COPO, env: { storm: 0.42, night: 0.3, glory: 0.12 }, cast: [ // do maior ao mais novo: ACHOU-SE O COPO NO SACO DE BENJAMIM
        C("servo", -66, "point", { id: "mordomo", dy: 0.48, facing: 1 }),
        C("pastor", -14, "stand", { dy: 0.5, scale: 0.9, facing: -1 }),
        C("homem", 60, "stand", { glow: 0.35, dy: 0.54, facing: -1 }),
        C("multidao", 190, "stand", { dy: 0.38 }),
      ] }),
      b(13, { props: ESTRADA, env: { night: 0.42, storm: 0.36, glory: 0.05 }, cast: [     // RASGARAM AS SUAS VESTES e tornaram à cidade
        C("homem", -60, "kneel", { glow: 0.35, dy: 0.54 }),
        C("pastor", -10, "kneel", { dy: 0.56, scale: 0.9 }),
        C("multidao", 120, "bow", { dy: 0.4 }),
        C("servo", 190, "stand", { id: "mordomo", dy: 0.44, facing: -1 }),
      ] }),
      b(14, { set: "casaJose", props: CASA_JOSE, env: { terrain: "city", night: 0.34, storm: 0.2, glory: 0.18 }, cast: [  // Judá e os irmãos: PROSTRARAM-SE DIANTE DELE EM TERRA
        C("jose", 20, "stand", { glow: 0.35, dy: 0.4 }),
        C("homem", -66, "lie", { glow: 0.35, dy: 0.58 }),
        C("pastor", -10, "bow", { dy: 0.56, scale: 0.9 }),
        C("multidao", 180, "bow", { dy: 0.4 }),
      ] }),
      b(15, { by: "jose", q: "E disse-lhes José: ", props: CASA_COPO, env: { storm: 0.24 }, cast: [  // "Que é isto que fizestes?" — o copo sobre a mesa
        C("jose", 16, "point", { glow: 0.35, dy: 0.4 }),
        C("homem", -60, "kneel", { glow: 0.35, dy: 0.56 }),
        C("pastor", -8, "bow", { dy: 0.56, scale: 0.9 }),
        C("multidao", 180, "bow", { dy: 0.4 }),
      ] }),
      b(16, { by: "homem", q: "Então disse Judá: ", env: { glory: 0.28, storm: 0.12 }, cast: [  // "ACHOU DEUS A INIQUIDADE DE TEUS SERVOS" (Deus = luz)
        C("jose", 24, "stand", { glow: 0.35, dy: 0.4 }),
        C("homem", -40, "kneel", { glow: 0.2, dy: 0.56 }),
        C("pastor", 6, "bow", { dy: 0.56, scale: 0.9 }),
        C("multidao", 185, "bow", { dy: 0.4 }),
      ] }),
      b(17, { by: "jose", q: "Mas ele disse: ", env: { night: 0.36, glory: 0.22 }, cast: [   // a sentença: só o culpado fica — "vós, subi em paz"
        C("jose", 30, "point", { glow: 0.35, dy: 0.4 }),
        C("homem", -40, "kneel", { glow: 0.2, dy: 0.56 }),
        C("pastor", 6, "stand", { dy: 0.54, scale: 0.9 }),
        C("multidao", 185, "bow", { dy: 0.4 }),
      ] }),
      b(18, { by: "homem", q: "Então Judá se chegou a ele, e disse: ", env: { glory: 0.26, night: 0.3 }, cast: [  // JUDÁ SE CHEGA: "deixa o teu servo dizer uma palavra"
        C("homem", -8, "stand", { glow: 0.28, dy: 0.52, facing: 1 }),
        C("jose", 52, "stand", { glow: 0.35, dy: 0.42, facing: -1 }),
        C("pastor", -70, "stand", { dy: 0.56, scale: 0.9 }),
        C("multidao", 190, "bow", { dy: 0.4 }),
      ] }),
      b(19, { by: "homem", cast: [                                                        // recontando tudo: "Tendes vós pai, ou irmão?"
        C("homem", -4, "point", { glow: 0.3, dy: 0.52, facing: 1 }),
        C("jose", 52, "stand", { glow: 0.35, dy: 0.42, facing: -1 }),
        C("pastor", -70, "stand", { dy: 0.56, scale: 0.9 }),
        C("multidao", 190, "bow", { dy: 0.4 }),
      ] }),
      b(20, { by: "homem", env: { night: 0.34, glory: 0.24 } }),                           // "um velho pai, e um filho da sua velhice… seu pai o ama"
      b(21, { by: "homem", env: { glory: 0.28 } }),                                        // "Trazei-mo a mim, e porei os meus olhos sobre ele"
      b(22, { by: "homem", env: { night: 0.38, glory: 0.26 } }),                            // "se deixar a seu pai, este morrerá"
      b(23, { by: "homem" }),                                                              // "nunca mais vereis a minha face"
      b(24, { by: "homem", env: { night: 0.32, glory: 0.3 }, cast: [                        // a subida a Canaã, contando as palavras do senhor
        C("homem", -14, "stand", { glow: 0.32, dy: 0.52, facing: 1 }),
        C("jose", 50, "stand", { glow: 0.35, dy: 0.42, facing: -1 }),
        C("pastor", -74, "stand", { dy: 0.56, scale: 0.9 }),
        C("multidao", 195, "bow", { dy: 0.4 }),
      ] }),
      b(25, { q: "Disse nosso pai:", by: "homem" }),                                                              // a voz do pai: "Voltai, comprai-nos um pouco de mantimento"
      b(26, { by: "homem", env: { glory: 0.32 } }),                                        // "não poderemos ver a face do homem" sem o irmão menor
      b(27, { by: "homem", q: "Então disse-nos teu servo, meu pai:", cast: [                                                         // "minha mulher me deu dois filhos" — Raquel entra na fala
        C("homem", -10, "raise", { glow: 0.36, dy: 0.52, facing: 1 }),
        C("jose", 48, "stand", { glow: 0.35, dy: 0.42, facing: -1 }),
        C("pastor", -74, "stand", { dy: 0.56, scale: 0.9 }),
        C("multidao", 195, "bow", { dy: 0.4 }),
      ] }),
      b(28, { by: "homem", env: { storm: 0.2, night: 0.42, glory: 0.3 } }),                 // "Certamente foi despedaçado" — José ouve a sua própria morte
      b(29, { by: "homem", env: { night: 0.46, storm: 0.22 } }),                            // "fareis descer as minhas cãs com aflição à sepultura"
      b(30, { by: "homem", env: { storm: 0.12, night: 0.38, glory: 0.38 }, cast: [           // "A SUA ALMA ESTÁ LIGADA COM A ALMA DELE"
        C("homem", -18, "kneel", { glow: 0.4, dy: 0.54, facing: 1 }),
        C("jose", 46, "stand", { glow: 0.35, dy: 0.42, facing: -1 }),
        C("pastor", -74, "stand", { dy: 0.56, scale: 0.9 }),
        C("multidao", 195, "bow", { dy: 0.4 }),
      ] }),
      b(31, { by: "homem", env: { glory: 0.4, storm: 0.08 } }),                              // "vendo ele que o moço ali não está, morrerá"
      b(32, { by: "homem", env: { glory: 0.44 }, cast: [                                     // "teu servo se deu por FIADOR por este moço"
        C("homem", -20, "raise", { glow: 0.45, dy: 0.54, facing: 1 }),
        C("jose", 46, "stand", { glow: 0.35, dy: 0.42, facing: -1 }),
        C("pastor", -74, "stand", { dy: 0.56, scale: 0.9 }),
        C("multidao", 195, "bow", { dy: 0.4 }),
      ] }),
      b(33, { by: "homem", env: { glory: 0.5, night: 0.3, storm: 0 }, cast: [                 // O OFERECIMENTO DE SI: "fique teu servo em lugar deste moço por escravo"
        C("homem", -24, "kneel", { glow: 0.5, dy: 0.56, facing: 1 }),
        C("pastor", 30, "stand", { glow: 0.2, dy: 0.5, scale: 0.9, facing: -1 }),
        C("jose", 84, "stand", { glow: 0.4, dy: 0.42, facing: -1 }),
        C("multidao", 200, "bow", { dy: 0.4 }),
      ] }),
      b(34, { by: "homem", env: { glory: 0.55, night: 0.22 }, cast: [                          // CLÍMAX: "como subirei eu a meu pai, se o moço não for comigo?"
        C("homem", -28, "raise", { glow: 0.55, dy: 0.56, facing: 1 }),
        C("pastor", 26, "stand", { glow: 0.2, dy: 0.5, scale: 0.9, facing: -1 }),
        C("jose", 84, "stand", { glow: 0.4, dy: 0.42, facing: -1 }),
        C("multidao", 200, "bow", { dy: 0.4 }),
      ] }),
    ],
  },
};
