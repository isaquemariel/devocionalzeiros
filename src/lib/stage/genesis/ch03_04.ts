// ============================================================================
// GÊNESIS 3–4 — A QUEDA e o PRIMEIRO SANGUE.
//
// Gn 3 é o capítulo que quebra o mundo. A dramaturgia acompanha o texto: o
// jardim começa em luz plena e vai ESFRIANDO a cada passo da tentação; no
// v.6 (o fruto tomado) a glória despenca; no v.8 a VOZ que passeia no jardim
// volta como presença (glória súbita) enquanto os dois se escondem entre as
// árvores; nas maldições a terra perde o viço (verdure cai) e a noite sobe.
// Duas luzes atravessam a treva e PRECISAM brilhar em cena:
//   • v.15  o PROTOEVANGELHO ("esta te ferirá a cabeça") — a primeira
//           promessa do Redentor: a glória sobe no meio do juízo;
//   • v.21  as TÚNICAS DE PELES — Deus mesmo veste quem O traiu: misericórdia
//           que custou sangue (a primeira morte foi por eles).
// O capítulo fecha FORA do jardim, com o querubim e a espada inflamada
// guardando o caminho da árvore da vida.
//
// Gn 4 abre no mundo caído: duas ofertas, dois altares, um irmão morto no
// campo. A violência NÃO é encenada — a treva e a tempestade contam. Termina
// com um fio de luz: Sete, e "então se começou a invocar o nome do SENHOR".
//
// DEUS NUNCA É DESENHADO. Quando o SENHOR fala, é NARRAÇÃO (sem `by`) e a Sua
// presença é LUZ. `by` só para falas de criaturas.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
/** objeto do CÉU: `dy` é ALTURA (0 = horizonte, 1 = zênite). */
const SKY = (kind: string, dx: number, dy: number, scale = 1): StagePropSpec =>
  ({ kind, dx, dy, scale, sky: true });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });

// ---------------------------------------------------------------------------
// Gn 3 — O JARDIM. A árvore do conhecimento fica perto do CENTRO: é dela que
// trata o capítulo inteiro. A árvore da vida à esquerda, sempre visível — no
// v.22 o texto volta os olhos justamente para ela.
// ---------------------------------------------------------------------------
const JARDIM: StagePropSpec[] = [
  P("treeOfKnowledge", 40, 1.12, undefined, 0.24),   // a árvore do meio do jardim
  P("treeOfLife", -232, 1.05, undefined, 0.2),       // e a árvore da vida
  P("tree", -308, 1.15, undefined, 0.52),
  P("tree", 226, 1.1, undefined, 0.32),
  P("tree", 316, 0.95, undefined, 0.62),
  P("edenRiver", 148, 1.05, undefined, 0.74),        // o rio que rega o jardim
  P("bush", -262, 1, undefined, 0.64),
  P("bush", 196, 0.95, undefined, 0.7),
  P("grass", -196, 1, undefined, 0.88),
  P("grass", 104, 1.05, undefined, 0.82),
  P("grass", 290, 0.95, undefined, 0.78),
  SKY("birds", -150, 0.58, 0.8),
];

/** Fora do jardim: a terra que ele há de lavrar — espinhos e cardos. */
const FORA: StagePropSpec[] = [
  P("rock", -286, 1.1, undefined, 0.5),
  P("rock", 214, 0.85, undefined, 0.68),
  P("bush", -60, 0.85, undefined, 0.58),
  P("bush", 128, 0.8, undefined, 0.76),
  P("grass", 264, 0.8, undefined, 0.88),
];

// ---------------------------------------------------------------------------
// Gn 4 — o campo dos irmãos: DOIS ALTARES lado a lado (a oferta do fruto da
// terra e a dos primogênitos do rebanho) — o contraste é o coração do texto.
// ---------------------------------------------------------------------------
const CAMPO: StagePropSpec[] = [
  { ...P("altar", -66, 1, undefined, 0.34), tag: "altar-caim" },   // altar de Caim (fruto da terra)
  { ...P("altar", 96, 1, undefined, 0.34), tag: "altar-abel" },    // altar de Abel (primogênitos)
  P("sheaf", -112, 0.72, undefined, 0.52),  // a oferta de Caim: os frutos da terra
  P("tree", -300, 1.1, undefined, 0.3),
  P("tree", 262, 1.05, undefined, 0.34),
  P("bush", 186, 0.9, undefined, 0.68),
  P("grass", -220, 1, undefined, 0.86),
  P("grass", 30, 1.05, undefined, 0.8),
  P("grass", 300, 0.95, undefined, 0.76),
];
/** o mesmo campo, com FOGO no altar de Abel (a oferta aceita). */
const CAMPO_ACEITO: StagePropSpec[] = CAMPO.map((p) =>
  p.kind === "altar" && p.dx === 96 ? { ...p, fire: 1, scale: 1.05 } : p);

export const CHAPTERS: Record<number, StageScript> = {
  // ======================================================================= Gn 3
  3: {
    start: { terrain: "garden", night: 0.04, glory: 0.75, storm: 0, fire: 0, water: 0, verdure: 1 },
    beats: [
      // ---- A TENTAÇÃO: a serpente ereta, e a luz esfriando -----------------
      b(1, {
        by: "serpente", q: "E esta disse à mulher: ",
        props: JARDIM,
        cast: [
          C("eva", -22, "stand", { dy: 0.5 }),
          C("serpente", 34, "stand", { dy: 0.42, facing: -1, scale: 1.05 }),
          C("adao", -112, "stand", { dy: 0.64 }),
        ],
      }),                                                                              // "É assim que Deus disse…?"
      b(2, { by: "eva", q: "E disse a mulher à serpente: ", env: { glory: 0.68 } }),   // do fruto das árvores comeremos
      b(3, { by: "eva", env: { glory: 0.6 } }),                                        // mas do fruto da árvore do meio, não
      b(4, { by: "serpente", q: "Então a serpente disse à mulher: ", env: { glory: 0.5, night: 0.1 } }), // certamente não morrereis
      b(5, { by: "serpente", env: { glory: 0.42, night: 0.14 } }),                     // sereis como Deus, sabendo o bem e o mal
      // ---- O FRUTO TOMADO: a queda -----------------------------------------
      b(6, {
        env: { glory: 0.22, night: 0.3 },
        cast: [
          C("eva", 8, "raise", { dy: 0.44 }),                                          // estende a mão à árvore
          C("adao", -30, "stand", { dy: 0.5 }),
          C("serpente", 96, "stand", { dy: 0.36, facing: -1, scale: 1.05 }),
        ],
      }),                                                                              // tomou do fruto, comeu, e deu ao marido
      b(7, {
        env: { glory: 0.14, night: 0.4 },
        cast: [C("eva", 16, "bow", { dy: 0.52 }), C("adao", -34, "bow", { dy: 0.54 })],
      }),                                                                              // abertos os olhos: conheceram que estavam nus
      // ---- A VOZ NO JARDIM: eles se escondem entre as árvores ---------------
      b(8, {
        env: { glory: 0.55, night: 0.42 },
        cast: [C("eva", 212, "bow", { dy: 0.26 }), C("adao", 248, "bow", { dy: 0.3 })],
      }),                                                                              // a voz do SENHOR, que passeava pela viração do dia
      b(9, { by: "deus", q: "disse-lhe: ",  env: { glory: 0.62 } }),                                                  // "Onde estás?" — a voz de Deus (narração)
      b(10, { by: "adao", q: "E ele disse: ", cast: [C("adao", 150, "bow", { dy: 0.4 }), C("eva", 198, "bow", { dy: 0.32 })] }), // "ouvi a tua voz… e escondi-me"
      b(11, { by: "deus", q: "E Deus disse: ",  env: { glory: 0.6 } }),                                                  // "comeste tu da árvore de que te ordenei?"
      b(12, { by: "adao", q: "Então disse Adão: ", cast: [C("adao", 46, "stand", { dy: 0.5 }), C("eva", 120, "bow", { dy: 0.44 })] }), // "a mulher que me deste… ela me deu"
      b(13, {
        by: "eva", q: "E disse a mulher: ",
        cast: [C("adao", 46, "stand", { dy: 0.5 }), C("eva", 112, "stand", { dy: 0.46 }), C("serpente", 196, "stand", { dy: 0.34, facing: -1 })],
      }),                                                                              // "a serpente me enganou, e eu comi"
      // ---- AS MALDIÇÕES ------------------------------------------------------
      b(14, { by: "deus", q: "disse à serpente: ", 
        env: { night: 0.5, storm: 0.18, glory: 0.42 },
        cast: [
          C("serpente", 172, "lie", { dy: 0.62, scale: 1.1 }),                         // sobre o teu ventre andarás
          C("adao", 20, "stand", { dy: 0.5 }),
          C("eva", 84, "stand", { dy: 0.48 }),
        ],
      }),                                                                              // maldita serás… e pó comerás
      // O PROTOEVANGELHO: no meio do juízo, a primeira promessa do Redentor.
      b(15, { env: { glory: 0.8, night: 0.4, storm: 0 } }),                            // "esta te ferirá a cabeça"
      b(16, { by: "deus", q: "E à mulher disse: ",  env: { glory: 0.62, night: 0.46 } }),                                    // à mulher: com dor darás à luz filhos
      b(17, { by: "deus", q: "E a Adão disse: ",  env: { night: 0.52, verdure: 0.62, glory: 0.35 } }),                     // maldita é a terra por causa de ti
      b(18, { env: { verdure: 0.42 } }),                                               // espinhos e cardos te produzirá
      b(19, { env: { night: 0.58, verdure: 0.34, glory: 0.28 } }),                     // pó és, e em pó te tornarás
      b(20, { env: { glory: 0.42 } }),                                                 // chamou-lhe EVA — a mãe de todos os viventes
      // MISERICÓRDIA: Deus mesmo os veste.
      b(21, {
        env: { glory: 0.68, night: 0.5 },
        cast: [C("adao", 20, "stand", { dy: 0.5 }), C("eva", 84, "stand", { dy: 0.48, facing: -1 })],
      }),                                                                              // fez túnicas de peles e os vestiu
      b(22, { by: "deus", q: "Então disse o Senhor Deus: ",  env: { glory: 0.5 } }),                                                  // para que não tome também da árvore da vida
      // ---- A EXPULSÃO: fora do jardim ----------------------------------------
      b(23, {
        env: { terrain: "desert", night: 0.5, glory: 0.3, verdure: 0.22 },
        props: FORA,
        cast: [C("adao", -30, "walk", { dy: 0.58 }), C("eva", 28, "walk", { dy: 0.58 })],
      }),                                                                              // lançou-o fora do Éden, para lavrar a terra
      b(24, {
        env: { night: 0.55, glory: 0.4, fire: 0.45 },
        props: [
          ...FORA,
          P("treeOfLife", -212, 0.82, undefined, 0.12),                                // a árvore da vida — o que a espada guarda
          P("cherub", -152, 1.1, undefined, 0.22),                                     // querubins ao oriente do jardim
          P("flamingSword", -98, 1.05, 1, 0.34),                                       // e a espada inflamada que andava ao redor
        ],
        cast: [C("adao", 108, "stand", { dy: 0.62, facing: -1 }), C("eva", 162, "stand", { dy: 0.62, facing: -1 })],
      }),                                                                              // para guardar o caminho da árvore da vida
    ],
  },

  // ======================================================================= Gn 4
  4: {
    start: { terrain: "field", night: 0.18, glory: 0.4, storm: 0, fire: 0, water: 0, verdure: 0.7 },
    beats: [
      b(1, {                                                                            // nasceu CAIM: "alcancei do SENHOR um homem"
        props: CAMPO,
        cast: [C("adao", -78, "stand", { dy: 0.58 }), C("eva", -24, "stand", { dy: 0.58, facing: -1 })],
      }),
      b(2, {                                                                            // e Abel — pastor de ovelhas; Caim, lavrador
        cast: [
          C("homem", -66, "stand", { dy: 0.5, id: "caim" }),
          C("pastor", 96, "stand", { dy: 0.5, facing: -1, id: "abel" }),
          C("rebanho", 208, "stand", { dy: 0.4, scale: 0.85 }),
          C("rebanho", 276, "stand", { dy: 0.54, scale: 0.62 }),
        ],
      }),
      b(3, {                                                                            // Caim trouxe do fruto da terra uma oferta
        cast: [
          C("homem", -66, "bow", { dy: 0.46, id: "caim" }),
          C("pastor", 96, "stand", { dy: 0.5, facing: -1, id: "abel" }),
          C("rebanho", 208, "stand", { dy: 0.4, scale: 0.85 }),
          C("rebanho", 276, "stand", { dy: 0.54, scale: 0.62 }),
        ],
      }),
      // A OFERTA ACEITA: o fogo desce sobre o altar de Abel e a luz o envolve.
      b(4, {
        env: { glory: 0.74 },
        props: CAMPO_ACEITO,
        cast: [
          C("homem", -66, "stand", { dy: 0.46, id: "caim" }),
          C("pastor", 96, "kneel", { dy: 0.5, facing: -1, id: "abel" }),
          C("rebanho", 208, "stand", { dy: 0.4, scale: 0.85 }),
          C("rebanho", 276, "stand", { dy: 0.54, scale: 0.62 }),
        ],
      }),                                                                               // atentou o SENHOR para Abel e para a sua oferta
      b(5, { env: { glory: 0.28, night: 0.36 } }),                                      // para Caim não atentou — irou-se, e descaiu-lhe o semblante
      b(6, { by: "deus", q: "disse a Caim: ",  env: { night: 0.36, glory: 0.62 } }),                                                   // "por que te iraste?" (a voz do SENHOR)
      b(7, { env: { night: 0.42 } }),                                                   // o pecado jaz à porta — sobre ele deves dominar
      // O PRIMEIRO SANGUE — sem encenar a violência: a treva e a tempestade
      // contam o que aconteceu; Abel fica caído no campo.
      b(8, {
        env: { night: 0.64, storm: 0.42, glory: 0.1 },
        cast: [C("homem", -18, "stand", { dy: 0.52, id: "caim" }), C("pastor", 62, "lie", { dy: 0.58, id: "abel" })],
      }),                                                                               // levantou-se Caim contra Abel, e o matou
      b(9, { by: "homem", q: "E ele disse: " }),                                        // "sou eu guardador do meu irmão?"
      b(10, { by: "deus", q: "E disse Deus: ",  env: { storm: 0.52, glory: 0.2 } }),                                      // a voz do sangue do teu irmão clama desde a terra
      b(11, { env: { verdure: 0.4, storm: 0.32 } }),                                    // maldito és tu desde a terra
      b(12, { env: { verdure: 0.26, night: 0.68 } }),                                   // fugitivo e vagabundo serás na terra
      b(13, { by: "homem", q: "Então disse Caim ao Senhor: " }),                        // "é maior a minha maldade do que a que possa ser perdoada"
      b(14, { by: "homem", cast: [C("homem", 34, "bow", { dy: 0.54, id: "caim" }), C("pastor", 62, "lie", { dy: 0.58, id: "abel" })] }), // "todo aquele que me achar, me matará"
      // Mesmo no juízo, a marca é MISERICÓRDIA: proteção para o assassino.
      b(15, { by: "deus", q: "disse-lhe: ",  env: { glory: 0.48, storm: 0 } }),                                        // o SENHOR pôs um sinal em Caim
      b(16, {                                                                            // saiu Caim e habitou na terra de NODE
        env: { terrain: "desert", night: 0.5, glory: 0.2, verdure: 0.18 },
        props: [P("rock", -272, 1.05, undefined, 0.46), P("rock", 238, 0.9, undefined, 0.64), P("bush", 84, 0.8, undefined, 0.72)],
        cast: [C("homem", -40, "walk", { dy: 0.6, id: "caim" })],
      }),
      // A LINHAGEM DE CAIM: a primeira cidade e as primeiras artes — cultura
      // brotando de um coração longe de Deus.
      b(17, {
        env: { terrain: "city", night: 0.42, glory: 0.28, verdure: 0.5 },
        props: [P("tower", -158, 1.15, undefined, 0.16), P("church", 182, 1, undefined, 0.14), P("crate", 254, 1, undefined, 0.62), P("amphora", -256, 0.95, undefined, 0.68)],
        cast: [C("homem", -30, "stand", { dy: 0.56, id: "caim" }), C("mulherComum", 32, "stand", { dy: 0.56, facing: -1 })],
      }),                                                                               // nasceu Enoque; e edificou uma CIDADE
      b(18, {                                                                            // Irade, Meujael, Metusael e Lameque
        cast: [C("patriarca", -62, "stand", { dy: 0.5 }), C("homem", 22, "stand", { dy: 0.56 }), C("mulherComum", 88, "stand", { dy: 0.5, facing: -1 })],
      }),
      b(19, {                                                                            // Lameque tomou para si duas mulheres: Ada e Zilá
        cast: [
          C("homem", -20, "stand", { dy: 0.54, id: "lameque" }),
          C("mulherComum", 48, "stand", { dy: 0.54, facing: -1, id: "ada-lameque" }),
          C("mulherComum", 108, "stand", { dy: 0.5, facing: -1, id: "zila" }),
        ],
      }),
      b(20, {                                                                            // Jabal: o pai dos que habitam em tendas e têm gado
        props: [P("tent", -164, 1.15, undefined, 0.2), P("church", 182, 1, undefined, 0.14), P("crate", 254, 1, undefined, 0.62)],
        cast: [C("homem", -20, "stand", { dy: 0.54, id: "lameque" }), C("pastor", 100, "stand", { dy: 0.46, facing: -1 }), C("rebanho", 224, "stand", { dy: 0.36, scale: 0.8 })],
      }),
      b(21, { env: { glory: 0.4 } }),                                                   // Jubal: o pai dos que tocam harpa e órgão
      b(22, {                                                                            // Tubalcaim: mestre de toda obra de cobre e ferro
        env: { fire: 0.38 },
        props: [P("tent", -164, 1.15, undefined, 0.2), P("campfire", 152, 1.15, 1, 0.42), P("crate", 254, 1, undefined, 0.62)],
      }),
      b(23, { by: "homem", q: "E disse Lameque a suas mulheres Ada e Zilá: ", env: { night: 0.56, glory: 0.14, fire: 0.22 } }), // o canto sombrio da vingança
      b(24, { by: "homem", env: { night: 0.62 } }),                                     // "Caim sete vezes; mas Lameque setenta vezes sete"
      // O FIO DE ESPERANÇA: Sete — e a invocação do nome do SENHOR.
      b(25, {
        env: { terrain: "field", night: 0.3, glory: 0.52, verdure: 0.75, fire: 0 },
        props: [P("tent", -166, 1.1, undefined, 0.24), P("altar", 96, 1, undefined, 0.34), P("tree", 262, 1.05, undefined, 0.32), P("grass", -40, 1, undefined, 0.84)],
        cast: [C("adao", -60, "stand", { dy: 0.58 }), C("eva", -4, "stand", { dy: 0.58, facing: -1 })],
      }),                                                                               // nasceu SETE — "em lugar de Abel"
      b(26, {
        env: { night: 0.14, glory: 0.8 },
        props: [P("tent", -166, 1.1, undefined, 0.24), P("altar", 96, 1.05, 1, 0.34), P("tree", 262, 1.05, undefined, 0.32), P("grass", -40, 1, undefined, 0.84)],
        cast: [
          C("adao", -60, "stand", { dy: 0.58 }),
          C("eva", -4, "stand", { dy: 0.58, facing: -1 }),
          C("homem", 62, "kneel", { dy: 0.5, facing: -1, id: "enos" }),
        ],
      }),                                                                               // nasceu Enos — então se começou a INVOCAR O NOME DO SENHOR
    ],
  },
};
