// ============================================================================
// GÊNESIS 27–28 — roteiro do modo CENA VIVA (força-tarefa AT, onda 2).
//
// Gn 27 — A BÊNÇÃO ROUBADA: tragédia doméstica em 5 atos, com a tensão subindo
// no env. (1) Isaque cego pede a caça; (2) Rebeca ESCUTA e trama na penumbra —
// os cabritos, as peles nas mãos, os vestidos de gala de Esaú; (3) O ENGANO —
// o toque, o beijo, o cheiro do campo, e a BÊNÇÃO explodindo em glória;
// (4) ESAÚ CHEGA — "Quem és tu?", o ESTREMECIMENTO (storm), o brado amargo;
// (5) O ÓDIO E A FUGA — noite fechada, Esaú planejando matar, Rebeca mandando
// Jacó embora. A glória sobe onde a bênção é dita e desaba quando o irmão
// chora: a luz aqui é BÊNÇÃO, não aprovação do engano.
//
// Gn 28 — BETEL, A ESCADA: a ordem de Isaque, Esaú tomando outra mulher, e a
// JORNADA SOLITÁRIA — noite 0.8, uma pedra por travesseiro, o chão duro. Então
// o sonho: a ESCADA (prop `ladder`) plantada na terra e tocando os céus, anjos
// subindo e descendo, a promessa. DEUS NUNCA É DESENHADO: o SENHOR "em cima
// dela" é GLÓRIA crescente (0.7 → 0.95) e narração pura, sem `by`. Ao acordar,
// o temor; de madrugada, a pedra vira COLUNA ungida — Betel, a Casa de Deus.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });

// ---------------------------------------------------------------------------
// BERSEBA — o acampamento de Isaque: a tenda do velho patriarca, o poço, as
// talhas e os fardos da casa. Serve Gn 27 inteiro e a despedida de Gn 28:1-9.
// (corredor de extras dx -100..-190 LIVRE, como manda o padrão de palco)
const BERSEBA: StagePropSpec[] = [
  P("tent", 190, 1.25, undefined, 0.12),   // a tenda de Isaque
  P("tent", 270, 0.95, undefined, 0.34),   // tenda da casa
  P("well", 320, 1, undefined, 0.14),      // o poço de Berseba
  P("amphora", 220, 0.85, undefined, 0.56),
  P("campfire", 120, 1, 1, 0.58),          // o fogo do guisado
  P("crate", -290, 0.9, undefined, 0.5),
  P("rock", -240, 0.85, undefined, 0.62),
  P("rock", 40, 0.55, undefined, 0.24),
  P("rock", 310, 0.8, undefined, 0.74),
  P("bush", -310, 0.9, undefined, 0.34),
  P("bush", 150, 0.85, undefined, 0.68),
  P("tree", -60, 1.1, undefined, 0.06),
  P("tree", 90, 0.95, undefined, 0.04),
  P("grass", -256, 1, undefined, 0.82),
  P("grass", 20, 1, undefined, 0.84),
  P("grass", 200, 0.95, undefined, 0.8),
  P("grass", 264, 0.9, undefined, 0.64),
];

// o guisado saboroso pronto (entra no corredor de extras, bem visível)
const CAMP_GUISADO: StagePropSpec[] = [...BERSEBA, P("bowl", -130, 1, undefined, 0.5)];
// os VESTIDOS DE GALA de Esaú tirados da arca da casa
const CAMP_VESTES: StagePropSpec[] = [...CAMP_GUISADO, P("crate", -178, 0.95, undefined, 0.26)];
// a mesa do engano: o guisado e o vinho que Isaque bebeu
const CAMP_MESA: StagePropSpec[] = [...CAMP_GUISADO, P("amphora", -104, 0.8, undefined, 0.7)];

// ---------------------------------------------------------------------------
// A NOITE DO ÓDIO (Gn 27:41-46) — o acampamento fechado no escuro: só o fogo,
// as tendas grandes e as estrelas frias. Palco apertado, conspiração sussurrada.
const TENDA_NOITE: StagePropSpec[] = [
  P("tent", 60, 1.3, undefined, 0.1),      // a tenda de Isaque, agora sombria
  P("tent", -260, 1.0, undefined, 0.2),
  P("campfire", -40, 1, 1, 0.62),          // o fogo baixo da noite
  P("amphora", 120, 0.85, undefined, 0.5),
  P("crate", 180, 0.9, undefined, 0.4),
  P("rock", 250, 0.85, undefined, 0.6),
  P("bush", -300, 0.9, undefined, 0.4),
  P("grass", -220, 1, undefined, 0.78),
  P("grass", 200, 1, undefined, 0.82),
  { kind: "starfield", dx: 20, dy: 0.78, scale: 1.15, sky: true },
];

// ---------------------------------------------------------------------------
// O CAMINHO DE HARÃ / BETEL (Gn 28:10-22) — monte pelado, pedras grandes, mato
// ralo. Nenhuma tenda: a solidão é o cenário. Corredor -100..-190 LIVRE para a
// ESCADA e, de madrugada, para a COLUNA e o altar.
const BETEL_ROAD: StagePropSpec[] = [
  P("rock", -250, 1.0, undefined, 0.22),
  P("rock", 210, 0.9, undefined, 0.3),
  P("rock", 300, 1.1, undefined, 0.55),
  P("bush", -300, 0.9, undefined, 0.45),
  P("bush", 120, 0.85, undefined, 0.62),
  P("tree", 60, 0.95, undefined, 0.05),    // a árvore solitária do lugar
  P("grass", -220, 1, undefined, 0.8),
  P("grass", 20, 0.95, undefined, 0.85),
  P("grass", 250, 1, undefined, 0.75),
];
// a noite em que o sol se pôs: o céu ESTRELADO (campo estelar no firmamento) e
// A PEDRA do travesseiro
const BETEL_NOITE: StagePropSpec[] = [
  ...BETEL_ROAD,
  P("rock", -12, 0.45, undefined, 0.58),   // "tomou uma das pedras daquele lugar"
  { kind: "starfield", dx: -30, dy: 0.82, scale: 1.3, sky: true },
  { kind: "starfield", dx: 190, dy: 0.66, scale: 1.05, sky: true },
];
// O SONHO: a escada posta na terra, cujo topo tocava nos céus
const BETEL_SONHO: StagePropSpec[] = [...BETEL_NOITE, P("ladder", -140, 1.6, undefined, 0.16)];
// A MADRUGADA: a pedra do travesseiro levantada por COLUNA e ungida com azeite
const BETEL_COLUNA: StagePropSpec[] = [
  ...BETEL_ROAD,
  { ...P("rock", -140, 1.15, undefined, 0.28), tag: "coluna-betel" },  // a coluna de Betel
  P("altar", -186, 1, undefined, 0.2),     // o azeite derramado, casa de Deus
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Gn 27
  // A BÊNÇÃO ROUBADA. Arco de env: entardecer morno (night 0.1) → penumbra da
  // conspiração (0.25-0.3) → glória da bênção (0.75) → tempestade do
  // estremecimento e do brado (storm 0.35) → noite do ódio (night 0.55).
  27: {
    start: { terrain: "desert", night: 0.1, glory: 0.1, storm: 0 },
    beats: [
      // ---- ATO 1: o pai cego pede a caça
      b(1, { by: "isaque", q: "e disse-lhe: ", props: BERSEBA, cast: [
        C("isaque", -34, "stand", { dy: 0.5, facing: 1 }),
        C("esau", 34, "stand", { dy: 0.52, facing: -1 }),
      ] }),                                                                        // Isaque cego chama Esaú: Meu filho
      b(2, { by: "isaque", q: "E ele disse: ", cast: [                             // estou velho, não sei o dia da morte
        C("isaque", -34, "stand", { dy: 0.5, facing: 1 }),
        C("esau", 30, "kneel", { dy: 0.54, facing: -1 }),
      ] }),
      b(3, { by: "isaque", cast: [                                                 // toma a aljava e o arco, apanha caça
        C("isaque", -34, "point", { dy: 0.5, facing: 1 }),
        C("esau", 40, "stand", { dy: 0.52, facing: -1 }),
      ] }),
      b(4, { by: "isaque", env: { glory: 0.18 } }),                                // guisado saboroso: minha alma te abençoe
      // ---- ATO 2: Rebeca escuta e trama
      b(5, { env: { night: 0.16 }, cast: [                                         // REBECA ESCUTOU; Esaú vai ao campo
        C("isaque", -58, "stand", { dy: 0.5 }),
        C("rebeca", -110, "stand", { dy: 0.66, facing: 1 }),
        C("esau", 150, "walk", { dy: 0.5, facing: 1 }),
      ] }),
      b(6, { by: "rebeca", q: "seu filho, dizendo: ", env: { night: 0.25, glory: 0.08 }, cast: [
        C("rebeca", -36, "point", { dy: 0.55, facing: 1 }),
        C("jaco", 30, "stand", { dy: 0.55, facing: -1 }),
      ] }),                                                                        // a conspiração: ouvi teu pai falar
      b(7, { by: "rebeca" }),                                                      // (ela repete as palavras de Isaque)
      b(8, { by: "rebeca", cast: [                                                 // ouve a minha voz naquilo que te mando
        C("rebeca", -30, "raise", { dy: 0.55, facing: 1 }),
        C("jaco", 26, "stand", { dy: 0.55, facing: -1 }),
      ] }),
      b(9, { by: "rebeca", cast: [                                                 // vai ao rebanho: dois bons cabritos
        C("rebeca", -40, "point", { dy: 0.55, facing: 1 }),
        C("jaco", 24, "stand", { dy: 0.55, facing: -1 }),
        C("rebanho", 180, "stand", { dy: 0.34 }),
      ] }),
      b(10, { by: "rebeca" }),                                                     // leva a teu pai, para que te abençoe
      b(11, { by: "jaco", q: "sua mãe: ", cast: [                                  // Esaú é cabeludo e eu sou liso
        C("rebeca", -40, "stand", { dy: 0.55, facing: 1 }),
        C("jaco", 20, "raise", { dy: 0.55, facing: -1 }),
        C("rebanho", 180, "stand", { dy: 0.34 }),
      ] }),
      b(12, { by: "jaco", env: { night: 0.32 } }),                                 // o MEDO: trarei maldição, não bênção
      b(13, { by: "rebeca", q: "E disse-lhe sua mãe: ", env: { night: 0.26 }, cast: [
        C("rebeca", -26, "point", { dy: 0.55, facing: 1 }),
        C("jaco", 22, "bow", { dy: 0.55, facing: -1 }),
        C("rebanho", 180, "stand", { dy: 0.34 }),
      ] }),                                                                        // sobre mim seja a tua maldição
      b(14, { props: CAMP_GUISADO, cast: [                                         // trouxe os cabritos; o guisado pronto
        C("rebeca", -30, "stand", { dy: 0.55, facing: 1 }),
        C("jaco", 34, "walk", { dy: 0.55, facing: -1 }),
        C("rebanho", 210, "stand", { dy: 0.3 }),
      ] }),
      b(15, { props: CAMP_VESTES, cast: [                                          // os VESTIDOS DE GALA de Esaú em Jacó
        C("rebeca", -20, "stand", { dy: 0.55, facing: 1 }),
        C("jaco", 26, "stand", { dy: 0.55, facing: -1 }),
      ] }),
      b(16, { cast: [                                                              // as PELES dos cabritos nas mãos
        C("rebeca", -18, "stand", { dy: 0.55, facing: 1 }),
        C("jaco", 20, "raise", { dy: 0.55, facing: -1 }),
      ] }),
      b(17, { cast: [                                                              // o guisado e o pão na mão de Jacó
        C("rebeca", -24, "point", { dy: 0.55, facing: 1 }),
        C("jaco", 30, "stand", { dy: 0.55, facing: -1 }),
      ] }),
      // ---- ATO 3: o engano diante do pai cego
      b(18, { by: "jaco", q: "a seu pai, e disse: ", set: "engano", props: CAMP_GUISADO, env: { night: 0.3, glory: 0.12 }, cast: [
        C("isaque", -40, "stand", { dy: 0.5, facing: 1 }),
        C("jaco", 26, "stand", { dy: 0.55, facing: -1 }),
      ] }),                                                                        // Meu pai! — quem és tu, meu filho?
      b(19, { by: "jaco", q: "a seu pai: ", cast: [                                // "Eu sou Esaú, teu primogênito"
        C("isaque", -40, "stand", { dy: 0.5, facing: 1 }),
        C("jaco", 20, "bow", { dy: 0.55, facing: -1 }),
      ] }),
      b(20, { by: "isaque", q: "a seu filho: " }),                                 // como a achaste tão cedo?
      b(21, { by: "isaque", q: "E disse Isaque a Jacó: ", cast: [                  // chega-te para que eu te apalpe
        C("isaque", -40, "point", { dy: 0.5, facing: 1 }),
        C("jaco", 10, "walk", { dy: 0.55, facing: -1 }),
      ] }),
      b(22, { by: "isaque", q: "e disse: ", env: { storm: 0.08 }, cast: [          // O TOQUE: a voz é de Jacó, as mãos de Esaú
        C("isaque", -34, "stand", { dy: 0.5, facing: 1 }),
        C("jaco", -4, "kneel", { dy: 0.52, facing: -1 }),
      ] }),
      b(23, { env: { storm: 0, glory: 0.22 } }),                                   // não o conheceu — e abençoou-o
      b(24, { by: "isaque", q: "E disse: ", cast: [                                // És tu meu filho Esaú mesmo? Eu sou.
        C("isaque", -30, "stand", { dy: 0.5, facing: 1 }),
        C("jaco", -2, "stand", { dy: 0.54, facing: -1 }),
      ] }),
      b(25, { by: "isaque", q: "Então disse: ", props: CAMP_MESA, cast: [          // comeu da caça e bebeu do vinho
        C("isaque", -36, "stand", { dy: 0.5, facing: 1 }),
        C("jaco", 14, "stand", { dy: 0.55, facing: -1 }),
      ] }),
      b(26, { by: "isaque", q: "Isaque seu pai: ", cast: [                         // Ora chega-te, e beija-me, filho meu
        C("isaque", -30, "raise", { dy: 0.5, facing: 1 }),
        C("jaco", 6, "walk", { dy: 0.54, facing: -1 }),
      ] }),
      b(27, { by: "isaque", q: "e disse: ", env: { glory: 0.6, night: 0.2 }, cast: [
        C("isaque", -26, "stand", { dy: 0.5, facing: 1 }),
        C("jaco", -2, "bow", { dy: 0.52, facing: -1 }),
      ] }),                                                                        // o beijo e o CHEIRO DO CAMPO — a bênção
      b(28, { by: "isaque", env: { glory: 0.68 } }),                               // orvalho dos céus, gordura da terra
      b(29, { by: "isaque", env: { glory: 0.75 }, cast: [                          // sirvam-te povos; sê senhor de teus irmãos
        C("isaque", -26, "raise", { dy: 0.5, facing: 1 }),
        C("jaco", -2, "kneel", { dy: 0.52, facing: -1 }),
      ] }),
      // ---- ATO 4: Esaú chega — o estremecimento e o brado
      b(30, { env: { glory: 0.3, night: 0.35 }, props: CAMP_GUISADO, cast: [       // Jacó mal sai — e Esaú volta da caça
        C("isaque", -30, "stand", { dy: 0.5 }),
        C("jaco", -170, "walk", { dy: 0.6, facing: -1 }),
        C("esau", 190, "walk", { dy: 0.5, facing: -1 }),
      ] }),
      b(31, { by: "esau", q: "e disse a seu pai: ", props: CAMP_MESA, cast: [      // Levanta-te e come da caça de teu filho
        C("isaque", -34, "stand", { dy: 0.5, facing: 1 }),
        C("esau", 30, "kneel", { dy: 0.55, facing: -1 }),
      ] }),
      b(32, { by: "isaque", q: "Isaque seu pai: ", env: { night: 0.38, glory: 0.2 } }), // "Quem és tu?" — Eu sou Esaú
      b(33, { by: "isaque", q: "e disse: ", env: { storm: 0.2, glory: 0.15 }, cast: [
        C("isaque", -40, "raise", { dy: 0.5, facing: 1 }),
        C("esau", 20, "stand", { dy: 0.55, facing: -1 }),
      ] }),                                                                        // o ESTREMECIMENTO muito grande
      b(34, { by: "esau", q: "e disse a seu pai: ", env: { night: 0.4, storm: 0.3 }, cast: [
        C("isaque", -40, "stand", { dy: 0.5, facing: 1 }),
        C("esau", 26, "raise", { dy: 0.58, facing: -1 }),
      ] }),                                                                        // o GRANDE E MUI AMARGO BRADO
      b(35, { by: "isaque", q: "E ele disse: " }),                                 // veio teu irmão com sutileza
      b(36, { by: "esau", q: "Então disse ele: ", env: { storm: 0.35 }, cast: [    // já duas vezes me enganou — tomou a bênção
        C("isaque", -44, "stand", { dy: 0.5, facing: 1 }),
        C("esau", 22, "point", { dy: 0.58, facing: -1 }),
      ] }),
      b(37, { by: "isaque", q: "a Esaú dizendo: ", cast: [                         // o tenho posto por senhor sobre ti
        C("isaque", -40, "point", { dy: 0.5, facing: 1 }),
        C("esau", 28, "stand", { dy: 0.56, facing: -1 }),
      ] }),
      b(38, { by: "esau", q: "a seu pai: ", env: { storm: 0.25, night: 0.45 }, cast: [
        C("isaque", -40, "stand", { dy: 0.5, facing: 1 }),
        C("esau", 24, "bow", { dy: 0.58, facing: -1 }),
      ] }),                                                                        // levantou a voz e CHOROU
      b(39, { by: "isaque", q: "e disse-lhe: ", env: { glory: 0.25, storm: 0.15 }, cast: [
        C("isaque", -34, "raise", { dy: 0.5, facing: 1 }),
        C("esau", 20, "kneel", { dy: 0.56, facing: -1 }),
      ] }),                                                                        // a bênção MENOR: gorduras da terra
      b(40, { by: "isaque", env: { storm: 0.2, glory: 0.2 } }),                    // pela espada viverás; servirás
      // ---- ATO 5: o ódio e a fuga
      b(41, { by: "esau", q: "no seu coração: ", set: "noiteDoOdio", props: TENDA_NOITE,
        env: { night: 0.5, storm: 0.25, glory: 0 }, cast: [
          C("esau", 10, "stand", { dy: 0.55 }),
        ] }),                                                                      // matarei a Jacó meu irmão
      b(42, { by: "rebeca", q: "e disse-lhe: ", env: { storm: 0.15 }, cast: [      // Rebeca avisa: ele propõe matar-te
        C("rebeca", -34, "point", { dy: 0.55, facing: 1 }),
        C("jaco", 28, "stand", { dy: 0.55, facing: -1 }),
      ] }),
      b(43, { by: "rebeca", cast: [                                                // levanta-te, acolhe-te a Labão, em Harã
        C("rebeca", -30, "point", { dy: 0.55, facing: 1 }),
        C("jaco", 30, "stand", { dy: 0.55, facing: -1 }),
      ] }),
      b(44, { by: "rebeca", env: { night: 0.52 } }),                               // mora com ele até passar o furor
      b(45, { by: "rebeca", env: { storm: 0 }, cast: [                             // por que seria desfilhada de vós ambos?
        C("rebeca", -22, "stand", { dy: 0.55, facing: 1 }),
        C("jaco", 18, "bow", { dy: 0.55, facing: -1 }),
      ] }),
      b(46, { by: "rebeca", q: "E disse Rebeca a Isaque: ", env: { night: 0.55, glory: 0.1 }, cast: [
        C("rebeca", -30, "stand", { dy: 0.55, facing: 1 }),
        C("isaque", 30, "stand", { dy: 0.5, facing: -1 }),
      ] }),                                                                        // enfadada por causa das filhas de Hete
    ],
  },

  // ------------------------------------------------------------------ Gn 28
  // BETEL, A ESCADA. Arco de env: manhã da bênção (glory 0.62) → tarde de Esaú
  // (night 0.38) → a estrada e a NOITE TOTAL do fugitivo (night 0.8, glory 0)
  // → a escada e a promessa (glory 0.7 → 0.95) → o temor (0.8) → a madrugada
  // da coluna (night 0.2) → o voto (glory 0.75).
  28: {
    start: { terrain: "desert", night: 0.2, glory: 0.25, storm: 0 },
    beats: [
      // ---- a ordem de Isaque: não tomes mulher de Canaã
      b(1, { by: "isaque", q: "e disse-lhe: ", set: "berseba", props: BERSEBA, env: { glory: 0.32 }, cast: [
        C("isaque", -34, "stand", { dy: 0.5, facing: 1 }),
        C("jaco", 30, "kneel", { dy: 0.55, facing: -1 }),
      ] }),                                                                        // Isaque abençoa e ordena a Jacó
      b(2, { by: "isaque", cast: [                                                 // vai a Padã-Arã, à casa de Betuel
        C("isaque", -34, "point", { dy: 0.5, facing: 1 }),
        C("jaco", 34, "stand", { dy: 0.55, facing: -1 }),
      ] }),
      b(3, { by: "isaque", env: { glory: 0.5 }, cast: [                            // Deus Todo-Poderoso te abençoe
        C("isaque", -30, "raise", { dy: 0.5, facing: 1 }),
        C("jaco", 30, "kneel", { dy: 0.55, facing: -1 }),
      ] }),
      b(4, { by: "isaque", env: { glory: 0.62 } }),                                // a bênção de ABRAÃO, a herança da terra
      b(5, { env: { glory: 0.5, night: 0.22 }, cast: [                             // despediu Isaque a Jacó — ele parte
        C("isaque", -40, "raise", { dy: 0.5, facing: 1 }),
        C("rebeca", -96, "stand", { dy: 0.62, facing: 1 }),
        C("jaco", 170, "walk", { dy: 0.5, facing: 1 }),
      ] }),
      // ---- Esaú vê, entende tarde demais, e toma outra mulher
      b(6, { env: { glory: 0.3, night: 0.3 }, cast: [                              // Esaú VÊ que Isaque enviara Jacó
        C("esau", -20, "stand", { dy: 0.55, facing: 1 }),
        C("isaque", 90, "stand", { dy: 0.48, facing: -1 }),
      ] }),
      b(7, { env: { night: 0.32, glory: 0.22 }, cast: [                            // Jacó obedecera e fora a Padã-Arã
        C("esau", -10, "stand", { dy: 0.55 }),
      ] }),
      b(8, { env: { night: 0.35, glory: 0.15 }, cast: [                            // as filhas de Canaã eram más ao pai
        C("esau", -14, "point", { dy: 0.55, facing: 1 }),
      ] }),
      b(9, { env: { night: 0.38, glory: 0.1 }, cast: [                             // toma Maalate, filha de Ismael
        C("esau", -30, "stand", { dy: 0.55, facing: 1 }),
        C("mulherComum", 24, "stand", { dy: 0.55, facing: -1 }),
      ] }),
      // ---- a jornada solitária
      b(10, { set: "estrada", props: BETEL_ROAD, env: { terrain: "mountain", night: 0.5, glory: 0, storm: 0 }, cast: [
        C("jaco", -10, "walk", { dy: 0.55, facing: 1 }),
      ] }),                                                                        // partiu de Berseba e foi a Harã
      b(11, { props: BETEL_NOITE, env: { night: 0.8 }, cast: [                     // o sol posto: a PEDRA por travesseiro
        C("jaco", 16, "lie", { dy: 0.55 }),
      ] }),
      // ---- O SONHO DA ESCADA (o SENHOR nunca é desenhado: é glória)
      b(12, { props: BETEL_SONHO, env: { glory: 0.72, night: 0.6 }, cast: [        // a ESCADA na terra tocando os céus: anjos subindo e descendo
        C("jaco", 16, "lie", { dy: 0.55 }),
        C("anjo", -108, "flyIdle", { dy: 0.46, glow: 0.55 }),   // descendo à terra
        C("anjo", -132, "flyIdle", { dy: 0.3, glow: 0.6 }),
        C("anjo", -156, "flyIdle", { dy: 0.14, glow: 0.6 }),
        C("anjo", -172, "flyIdle", { dy: 0.02, glow: 0.8 }),    // no alto, junto aos céus
      ] }),
      b(13, { by: "deus", q: "E eis que o Senhor estava em cima dela, e disse: ", env: { glory: 0.85, night: 0.5 } }),                                 // Deus em cima dela: Eu sou o Deus…
      b(14, { by: "deus", env: { glory: 0.9 }, cast: [                                         // Deus: descendência como o pó da terra
        C("jaco", 16, "lie", { dy: 0.55 }),
        C("anjo", -110, "flyIdle", { dy: 0.34, glow: 0.7 }),
        C("anjo", -150, "flyIdle", { dy: 0.18, glow: 0.6 }),
        C("anjo", -186, "flyIdle", { dy: 0.06, glow: 0.5 }),
      ] }),
      b(15, { by: "deus", env: { glory: 0.95, night: 0.4 } }),                                 // Deus: estou contigo e te guardarei
      // ---- o despertar
      b(16, { by: "jaco", q: "disse: ", props: BETEL_NOITE, env: { glory: 0.5, night: 0.6 }, cast: [
        C("jaco", 6, "kneel", { dy: 0.55 }),
      ] }),                                                                        // o SENHOR está neste lugar e eu não sabia
      b(17, { by: "jaco", q: "e disse: ", env: { glory: 0.8 }, cast: [             // quão terrível! a porta dos céus
        C("jaco", 0, "bow", { dy: 0.55 }),
      ] }),
      // ---- a coluna ungida e o voto
      b(18, { props: BETEL_COLUNA, env: { night: 0.2, glory: 0.55 }, cast: [       // de madrugada: a pedra por COLUNA, o azeite
        C("jaco", -70, "raise", { dy: 0.5, facing: -1 }),
      ] }),
      b(19, { env: { night: 0.15, glory: 0.5 }, cast: [                            // chamou o lugar BETEL (antes, Luz)
        C("jaco", -60, "point", { dy: 0.5, facing: -1 }),
      ] }),
      b(20, { by: "jaco", q: "dizendo: ", env: { glory: 0.6 }, cast: [             // o VOTO: se Deus for comigo e me guardar
        C("jaco", -50, "raise", { dy: 0.5, facing: -1 }),
      ] }),
      b(21, { by: "jaco", env: { glory: 0.65 } }),                                 // se eu tornar em paz, o SENHOR me será Deus
      b(22, { by: "jaco", env: { glory: 0.75, night: 0.1 }, cast: [                // esta pedra será casa de Deus — o dízimo
        C("jaco", -80, "kneel", { dy: 0.5, facing: -1 }),
      ] }),
    ],
  },
};
