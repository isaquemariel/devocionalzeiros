// ============================================================================
// NÚMEROS 19–20 — CENA VIVA. A ÁGUA DA PURIFICAÇÃO; MERIBÁ; a morte de ARÃO.
//
// Nm 19 — A VACA VERMELHA: uma novilha ruiva, sem defeito, é levada para FORA
// do arraial e ali queimada inteira. Suas CINZAS, ajuntadas por um homem limpo
// e misturadas com água corrente, tornam-se a "ÁGUA DA SEPARAÇÃO" — com que se
// purifica quem tocou em MORTO. Deus nunca é figura: a lei desce do alto
// (`by: "deus"`); em cena, a queima fora do arraial (`campfire`/`altar`) e o
// vaso da purificação (`amphora`/`bowl`), com Eleazar (servo id "eleazar")
// aspergindo o sangue e o povo limpo ajuntando a cinza.
//
// Nm 20 — MERIBÁ e o MONTE HOR: (a) sem água, o povo contende; Deus manda
// FALAR à ROCHA, mas Moisés a FERE DUAS VEZES ("Ouvi agora, rebeldes"); sai
// muita água, porém, por não O terem SANTIFICADO, ele e Arão não entrarão na
// terra. (b) Edom NEGA passagem. (c) no monte Hor, Moisés DESPE as vestes de
// Arão e as veste em ELEAZAR; Arão MORRE no cume, e o povo o chora trinta dias.
//
// A VOZ DE DEUS (regra do projeto): sempre do alto, sem figura (`by: "deus"`),
// com glória no ar quando "a glória do Senhor apareceu" e quando Deus sentencia.
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });
const dv = (v: number) => b(v, { by: "deus" });

// O arraial visto ao começar Nm 19: o tabernáculo entre as tendas.
const ARRAIAL: StagePropSpec[] = [
  { ...P("tent", -30, 1.45, undefined, 0.1), tag: "tabernaculo" },
  P("tent", -260, 1.0, undefined, 0.2),
  P("tent", 240, 1.0, undefined, 0.22),
  P("palm", -310, 1.05, undefined, 0.14),
  P("well", 320, 1.0, undefined, 0.5),
  P("grass", -60, 0.82, undefined, 0.82),
  P("grass", 60, 0.78, undefined, 0.74),
];
// FORA DO ARRAIAL — a queima da novilha: o fogo consumidor longe das tendas,
// o altar ao lado, o arraial recuado ao fundo.
const FORA_QUEIMA: StagePropSpec[] = [
  P("tent", -300, 0.85, undefined, 0.12),
  P("tent", 300, 0.8, undefined, 0.14),
  { ...P("campfire", 0, 1.35, 1, 0.5), tag: "queima-novilha" },
  P("altar", 150, 0.95, undefined, 0.46),
  P("grass", -120, 0.78, undefined, 0.8),
  P("grass", 120, 0.72, undefined, 0.72),
];
// A ÁGUA DA SEPARAÇÃO — a cinza guardada, misturada à água corrente no vaso.
const AGUA_SEP: StagePropSpec[] = [
  P("tent", -300, 0.85, undefined, 0.12),
  P("campfire", -160, 0.9, 0.35, 0.4),
  { ...P("amphora", 30, 1.05, undefined, 0.5), tag: "agua-separacao" },
  P("bowl", 120, 0.95, undefined, 0.52),
  P("grass", -110, 0.78, undefined, 0.8),
  P("grass", 130, 0.72, undefined, 0.72),
];

// MERIBÁ — a rocha diante do povo sedento; depois, a água jorrando.
const MERIBA: StagePropSpec[] = [
  { ...P("rock", 0, 1.4, undefined, 0.44), tag: "rocha-meriba" },
  P("tent", -300, 0.85, undefined, 0.12),
  P("tent", 300, 0.82, undefined, 0.14),
  P("palm", -330, 1.0, undefined, 0.16),
  P("grass", -140, 0.72, undefined, 0.8),
  P("grass", 150, 0.7, undefined, 0.72),
];
const MERIBA_AGUA: StagePropSpec[] = [
  { ...P("rock", 0, 1.4, undefined, 0.44), tag: "rocha-meriba" },
  { ...P("river", 40, 1.2, undefined, 0.62), tag: "aguas-meriba" },
  P("tent", -300, 0.85, undefined, 0.12),
  P("palm", -330, 1.0, undefined, 0.16),
  P("grass", -140, 0.72, undefined, 0.8),
];
// MONTE HOR — o cume solene onde Arão morre.
const MONTE_HOR: StagePropSpec[] = [
  { ...P("rock", 30, 1.6, undefined, 0.3), tag: "monte-hor" },
  P("rock", -220, 1.1, undefined, 0.2),
  P("rock", 240, 1.0, undefined, 0.24),
  P("grass", -120, 0.6, undefined, 0.78),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Nm 19
  19: {
    start: { terrain: "desert", night: 0.22, glory: 0.4, storm: 0, fire: 0, verdure: 0.18 },
    beats: [
      b(1, { props: ARRAIAL, env: { terrain: "desert", glory: 0.5, night: 0.18, verdure: 0.18 }, cast: [ // o Senhor fala a Moisés e a Arão
        C("moises", -150, "kneel", { dy: 0.5, facing: 1 }),
        C("arao", -100, "kneel", { glow: 0.2, dy: 0.5, facing: 1 }),
      ] }),
      b(2, { by: "deus", q: "uma novilha ruiva" }),                               // uma NOVILHA RUIVA, sem defeito, sobre que não veio jugo
      b(3, { by: "deus", q: "para fora do arraial", set: "fora", props: FORA_QUEIMA, // Eleazar a tira para FORA do arraial e ali é degolada
        env: { terrain: "desert", glory: 0.62, night: 0.32, fire: 0.4, verdure: 0.12 }, cast: [
        C("servo", -30, "stand", { glow: 0.15, dy: 0.5, facing: -1, id: "eleazar" }),
      ] }),
      b(4, { by: "deus", q: "espargirá para a frente da tenda", cast: [           // Eleazar asperge do sangue sete vezes para a tenda
        C("servo", -30, "point", { glow: 0.2, dy: 0.5, facing: 1, id: "eleazar" }),
      ] }),
      b(5, { by: "deus", q: "queimará a novilha", env: { fire: 0.85, glory: 0.62, night: 0.34 }, cast: [ // a novilha inteira QUEIMADA perante os olhos
        C("servo", -60, "stand", { glow: 0.2, dy: 0.5, facing: 1, id: "eleazar" }),
        C("servo", 90, "stand", { dy: 0.52, facing: -1, id: "queimador" }),
      ] }),
      b(6, { by: "deus", q: "os lançará no meio do fogo" }),                       // cedro, hissopo e carmesim lançados no fogo
      dv(7), dv(8),                                                                // o sacerdote e o que queimou ficam imundos até à tarde
      b(9, { by: "deus", q: "para a água da separação", set: "agua", props: AGUA_SEP, // um homem LIMPO ajunta a cinza: a ÁGUA DA SEPARAÇÃO
        env: { terrain: "desert", glory: 0.62, night: 0.3, fire: 0.15 }, cast: [
        C("servo", -20, "kneel", { dy: 0.52, facing: 1, id: "limpo" }),
      ] }),
      b(10, { by: "deus", q: "lavará as suas vestes, e será imundo até à tarde", env: { glory: 0.56, night: 0.5, fire: 0.1 }, cast: [ // o que apanhou a cinza lava as vestes e fica imundo até à TARDE
        C("servo", -110, "kneel", { dy: 0.6, facing: -1, id: "limpo" }),
        C("homem", 90, "stand", { dy: 0.54, facing: 1, id: "estrangeiro-peregrino" }),
      ] }),
      b(11, { by: "deus", q: "Aquele que tocar em algum morto", set: "morto-no-arraial", props: [ // quem TOCA num morto: imundo sete dias
        P("tent", -270, 1.0, undefined, 0.2),
        { ...P("tent", 40, 1.35, undefined, 0.3), tag: "tenda" },
        P("rock", 245, 0.85, undefined, 0.58),
        P("grass", -120, 0.78, undefined, 0.84),
      ], env: { terrain: "desert", glory: 0.4, night: 0.62, fire: 0, verdure: 0.12 }, cast: [
        C("homem", 130, "lie", { scale: 1.35, dy: 0.72, facing: 1, id: "cadaver" }),
        C("homem", -30, "bow", { dy: 0.62, facing: -1, id: "imundo" }),
      ] }),
      b(12, { by: "deus", q: "Ao terceiro dia se purificará com aquela água", set: "agua", props: AGUA_SEP, env: { terrain: "desert", glory: 0.64, night: 0.28, fire: 0.15 }, cast: [ // ao terceiro dia e ao sétimo, a água da separação sobre ele
        C("servo", -60, "point", { dy: 0.56, facing: -1, id: "limpo" }),
        C("homem", 100, "kneel", { dy: 0.66, facing: 1, id: "imundo" }),
      ] }),
      b(13, { by: "deus", q: "contamina o tabernáculo do Senhor", set: "morto-no-arraial", props: [ // quem não se purifica CONTAMINA o tabernáculo e é cortado
        { ...P("tent", -160, 1.4, undefined, 0.16), tag: "tabernaculo" },
        P("tent", -280, 0.9, undefined, 0.26),
        P("rock", 200, 0.9, undefined, 0.64),
        P("rock", 300, 0.7, undefined, 0.48),
      ], env: { terrain: "desert", glory: 0.34, night: 0.72, storm: 0.2, verdure: 0.08 }, cast: [
        C("homem", 110, "walk", { dy: 0.68, facing: -1, id: "imundo" }),
      ] }),
      b(14, { by: "deus", q: "quando morrer algum homem em alguma tenda", set: "tenda-do-morto", props: [ // a lei da TENDA em que alguém morre
        { ...P("tent", -20, 1.75, undefined, 0.34), tag: "tenda" },
        { ...P("door", 130, 0.95, undefined, 0.56), tag: "porta" },
        P("crate", 245, 0.85, undefined, 0.5),
        P("grass", -250, 0.78, undefined, 0.86),
      ], env: { terrain: "desert", glory: 0.38, night: 0.66, storm: 0, verdure: 0.1 }, cast: [
        C("homem", -60, "lie", { scale: 1.35, dy: 0.74, facing: 1, id: "cadaver" }),
        C("homem", 190, "walk", { scale: 0.94, dy: 0.6, facing: -1, id: "imundo" }),
      ] }),
      b(15, { by: "deus", q: "todo o vaso aberto, sobre o qual não houver pano atado", set: "vaso-aberto", props: [ // e até o VASO ABERTO, sem pano atado por cima
        P("tent", -290, 1.1, undefined, 0.24),
        P("amphora", -110, 1.25, undefined, 0.6),
        P("bowl", 20, 1.15, undefined, 0.72),
        P("amphora", 140, 1.05, undefined, 0.54),
        P("crate", 255, 0.95, undefined, 0.66),
        P("grass", 320, 0.78, undefined, 0.84),
      ], env: { terrain: "desert", glory: 0.44, night: 0.58, storm: 0, verdure: 0.1 } }),
      b(16, { by: "deus", q: "ou nos ossos de algum homem, ou numa sepultura", set: "campo-aberto", props: [ // e no CAMPO ABERTO: o morto à espada, os ossos, a sepultura
        { ...P("rock", 60, 1.1, undefined, 0.44), tag: "sepultura" },
        P("sword", -80, 0.95, undefined, 0.66),
        P("rock", -260, 0.85, undefined, 0.34),
        P("tree", 265, 1.05, undefined, 0.24),
        P("grass", 170, 0.8, undefined, 0.8),
      ], env: { terrain: "field", glory: 0.42, night: 0.56, storm: 0.15, verdure: 0.28 }, cast: [
        C("homem", -170, "lie", { scale: 1.35, dy: 0.72, facing: 1, id: "morto-a-espada" }),
        C("homem", 195, "stand", { scale: 0.94, dy: 0.58, facing: -1, id: "imundo" }),
      ] }),
      b(17, { by: "deus", q: "colocarão água corrente num vaso", cast: [          // a cinza com ÁGUA CORRENTE no vaso, para o imundo
        C("servo", -20, "kneel", { dy: 0.52, facing: 1, id: "limpo" }),
      ] }),
      b(18, { by: "deus", q: "tomará hissopo", cast: [                            // o homem limpo asperge com HISSOPO sobre o imundo
        C("servo", -20, "point", { dy: 0.52, facing: 1, id: "limpo" }),
        C("homem", 90, "stand", { dy: 0.5, facing: -1, id: "imundo" }),
      ] }),
      dv(19), dv(20), dv(21), dv(22),                                             // estatuto perpétuo da purificação
    ],
  },

  // ------------------------------------------------------------------ Nm 20
  20: {
    start: { terrain: "desert", night: 0.2, glory: 0.42, storm: 0, fire: 0, verdure: 0.15 },
    beats: [
      b(1, { q: "Miriã morreu ali", props: MERIBA, env: { terrain: "desert", glory: 0.36, night: 0.28, verdure: 0.12 }, cast: [ // Cades: MIRIÃ morre e é sepultada
        C("moises", -150, "stand", { dy: 0.5, facing: 1 }),
        C("mulherComum", -220, "lie", { dy: 0.6, id: "miria" }),
      ] }),
      b(2, { q: "não havia água para a congregação", cast: [                      // sem ÁGUA, o povo se reúne contra Moisés e Arão
        C("moises", -140, "stand", { dy: 0.5, facing: 1 }),
        C("arao", -90, "stand", { glow: 0.2, dy: 0.5, facing: 1 }),
        C("multidao", 150, "walk", { dy: 0.46 }),
        C("rebanho", 230, "stand", { dy: 0.42, id: "gado" }),
      ] }),
      b(3, { by: "multidao", q: "o povo contendeu com Moisés", cast: [            // o povo CONTENDE: "quem dera tivéssemos perecido"
        C("moises", -150, "stand", { dy: 0.5, facing: 1 }),
        C("arao", -100, "stand", { glow: 0.2, dy: 0.5, facing: 1 }),
        C("multidao", 130, "point", { dy: 0.46, facing: -1 }),
        C("multidao", 210, "stand", { dy: 0.4, id: "povo2", facing: -1 }),
      ] }),
      b(4, { by: "multidao" }),                                                   // "por que trouxestes a congregação a este deserto?"
      b(5, { by: "multidao" }),                                                   // "por que nos fizestes subir do Egito a este lugar mau?"
      b(6, { q: "a glória do Senhor lhes apareceu", env: { glory: 0.82, night: 0.16 }, cast: [ // Moisés e Arão se lançam sobre os rostos; a GLÓRIA aparece
        C("moises", -60, "bow", { dy: 0.52, facing: 1 }),
        C("arao", 0, "bow", { glow: 0.35, dy: 0.52, facing: 1 }),
      ] }),
      b(7, { by: "deus", env: { glory: 0.8 } }),                                  // o Senhor fala a Moisés
      b(8, { by: "deus", q: "falai à rocha", env: { glory: 0.8 }, cast: [         // "toma a vara e FALAI À ROCHA, e ela dará água"
        C("moises", -70, "stand", { dy: 0.5, facing: 1 }),
        C("arao", -20, "stand", { glow: 0.25, dy: 0.5, facing: 1 }),
      ] }),
      b(9, { cast: [                                         // Moisés toma a vara de diante do Senhor
        C("moises", -60, "raise", { dy: 0.5, facing: 1 }),
        C("arao", -10, "stand", { glow: 0.2, dy: 0.5, facing: 1 }),
      ] }),
      b(10, { by: "moises", q: "Ouvi agora, rebeldes", env: { glory: 0.4, night: 0.24 }, cast: [ // "OUVI AGORA, REBELDES: tiraremos água desta rocha?"
        C("moises", -50, "point", { dy: 0.5, facing: -1 }),
        C("arao", -110, "stand", { glow: 0.2, dy: 0.5, facing: 1 }),
        C("multidao", 150, "stand", { dy: 0.46, facing: -1 }),
      ] }),
      b(11, { q: "feriu a rocha duas vezes com a sua vara", set: "meribagua", props: MERIBA_AGUA, // FERE a rocha DUAS VEZES; sai muita água
        env: { water: 0.55, verdure: 0.3, glory: 0.46 }, cast: [
        C("moises", -70, "raise", { dy: 0.5, facing: 1 }),
        C("arao", -140, "stand", { glow: 0.2, dy: 0.5, facing: 1 }),
        C("multidao", 160, "kneel", { dy: 0.5, facing: -1 }),
        C("rebanho", 240, "stand", { dy: 0.56, id: "gado" }),
      ] }),
      b(12, { by: "deus", q: "não crestes em mim", env: { glory: 0.78, night: 0.14 }, cast: [ // "não crestes em mim... não introduzireis esta congregação na terra"
        C("moises", -60, "bow", { dy: 0.52, facing: 1 }),
        C("arao", 0, "bow", { glow: 0.3, dy: 0.52, facing: 1 }),
      ] }),
      b(13, { q: "as águas de Meribá", env: { glory: 0.5, water: 0.4 } }),        // são as ÁGUAS DE MERIBÁ, onde contenderam com o Senhor
      // v.14-21 — EDOM nega passagem.
      b(14, { by: "moises", set: "edom", props: MERIBA, env: { terrain: "desert", water: 0, glory: 0.4, night: 0.22, verdure: 0.12 }, cast: [ // Moisés manda mensageiros ao rei de Edom
        C("moises", -160, "stand", { dy: 0.5, facing: 1 }),
        C("servo", -60, "walk", { dy: 0.5, facing: -1, id: "mensageiro" }),
        C("rei", 180, "stand", { dy: 0.48, facing: -1, id: "edom" }),
      ] }),
      b(15, { by: "moises" }),                                                    // "nossos pais desceram ao Egito..."
      b(16, { by: "moises" }),                                                    // "clamamos ao Senhor, e ele mandou um anjo e nos tirou"
      b(17, { by: "moises" }),                                                    // "deixa-nos passar pela tua terra, pela estrada real"
      b(18, { by: "rei", q: "Não passarás por mim", cast: [                       // EDOM: "não passarás, para que eu não saia com a espada"
        C("rei", 120, "point", { dy: 0.48, facing: -1, id: "edom" }),
        C("servo", -40, "stand", { dy: 0.5, facing: 1, id: "mensageiro" }),
        C("moises", -180, "stand", { dy: 0.5, facing: 1 }),
      ] }),
      b(19, { by: "multidao" }),                                                  // Israel: "subiremos pelo aplanado, pagaremos a água"
      b(20, { by: "rei", cast: [                                                  // Edom sai ao encontro com muita gente e mão forte
        C("rei", 130, "stand", { dy: 0.48, facing: -1, id: "edom" }),
        C("multidao", 210, "stand", { dy: 0.42, facing: -1, id: "edomitas" }),
        C("moises", -170, "stand", { dy: 0.5, facing: 1 }),
      ] }),
      b(21, { q: "recusou Edom deixar passar a Israel" }),                        // Edom recusa; Israel se desvia dele
      // v.22-29 — o MONTE HOR: a morte de ARÃO.
      b(22, { q: "chegaram ao monte Hor", set: "hor", props: MONTE_HOR, env: { terrain: "mountain", glory: 0.45, night: 0.3, verdure: 0.1 }, cast: [ // partem de Cades e chegam ao MONTE HOR
        C("moises", -120, "walk", { dy: 0.55, facing: 1 }),
        C("arao", -60, "walk", { glow: 0.2, dy: 0.55, facing: 1 }),
        C("multidao", 160, "walk", { dy: 0.5, facing: 1 }),
      ] }),
      b(23, { env: { glory: 0.7, night: 0.22 }, cast: [               // o Senhor fala a Moisés e Arão no monte Hor
        C("moises", -80, "kneel", { dy: 0.5, facing: 1 }),
        C("arao", -20, "kneel", { glow: 0.25, dy: 0.5, facing: 1 }),
      ] }),
      dv(24),                                                                     // "Arão será recolhido; rebeldes fostes nas águas de Meribá"
      dv(25),                                                                     // "toma a Arão e a Eleazar, e faze-os subir ao monte"
      b(26, { by: "deus", q: "veste-as em Eleazar", env: { glory: 0.6 }, cast: [  // "DESPE as vestes de Arão e VESTE-AS EM ELEAZAR"
        C("moises", -90, "stand", { dy: 0.5, facing: 1 }),
        C("arao", -20, "stand", { glow: 0.25, dy: 0.5, facing: -1 }),
        C("servo", 60, "stand", { dy: 0.5, facing: -1, id: "eleazar" }),
      ] }),
      b(27, { cast: [                          // Moisés faz como o Senhor ordenou; sobem à vista do povo
        C("moises", -90, "walk", { dy: 0.4, facing: 1 }),
        C("arao", -30, "walk", { glow: 0.25, dy: 0.4, facing: 1 }),
        C("servo", 30, "walk", { dy: 0.4, facing: 1, id: "eleazar" }),
      ] }),
      b(28, { q: "morreu Arão ali sobre o cume do monte", env: { glory: 0.65, night: 0.3 }, cast: [ // Moisés despe Arão e veste Eleazar; ARÃO MORRE no cume
        C("moises", -80, "stand", { dy: 0.42, facing: 1 }),
        C("arao", 20, "lie", { glow: 0.3, dy: 0.4, facing: 1 }),
        C("servo", -20, "stand", { glow: 0.3, dy: 0.42, facing: -1, id: "eleazar" }),
      ] }),
      b(29, { q: "choraram a Arão trinta dias", set: "hor", props: MONTE_HOR, env: { glory: 0.4, night: 0.34 }, cast: [ // toda a casa de Israel o CHORA trinta dias
        C("servo", -60, "stand", { glow: 0.25, dy: 0.5, facing: -1, id: "eleazar" }),
        C("multidao", 120, "bow", { dy: 0.48 }),
        C("multidao", 200, "bow", { dy: 0.42, id: "povo2" }),
      ] }),
    ],
  },
};
