// ============================================================================
// NÚMEROS 23–24 — CENA VIVA. Os ORÁCULOS de BALAÃO: a maldição vira BÊNÇÃO.
//
// Nm 23–24 — Baláque, rei de Moabe, leva o adivinho Balaão a três altos
// (Bamote-Baal, o campo de Zofim no cume de Pisga, e o cume de Peor). Em cada
// lugar edificam SETE ALTARES e oferecem novilhos e carneiros, para que Balaão
// amaldiçoe Israel. Mas o SENHOR põe a sua palavra na boca de Balaão, e quatro
// vezes ele ABENÇOA o povo em vez de amaldiçoá-lo: "Como amaldiçoarei o que
// Deus não amaldiçoa?" (23:8); "Deus não é homem, para que minta" (23:19);
// "Quão formosas são as tuas tendas, ó Jacó" (24:5). E o grande ícone
// messiânico: "uma ESTRELA procederá de Jacó, e um cetro subirá de Israel"
// (24:17). Baláque, irado, bate as suas palmas.
//
// A VOZ DE DEUS (regra do projeto): quando Balaão profere o oráculo que Deus
// pôs na sua boca, o falante em cena é o PRÓPRIO Balaão (`by: "homem"`, o
// personagem id:"balaao") — não `deus`. Quando o SENHOR fala DIRETAMENTE a
// Balaão, sem mediador (encontrando-se com ele e pondo-lhe a palavra), aí sim
// é a voz do céu (`by: "deus"`) com glória no ambiente. Baláque = rei
// id:"balaque".
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });
const dv = (v: number) => b(v, { by: "deus" });

// OS SETE ALTARES no alto de Moabe: fileira de altares acesos e a fogueira do
// holocausto ao centro. Re-emitido em cada um dos três lugares.
const SETE_ALTARES: StagePropSpec[] = [
  P("altar", -320, 0.62, 0.5, 0.28),
  P("altar", -220, 0.68, undefined, 0.32),
  P("altar", -120, 0.74, 0.55, 0.36),
  P("altar", -10, 0.8, undefined, 0.4),
  P("altar", 100, 0.74, 0.55, 0.36),
  P("altar", 210, 0.68, undefined, 0.32),
  P("altar", 310, 0.62, 0.5, 0.28),
  { ...P("campfire", 40, 0.95, 0.85, 0.62), tag: "holocausto" },
  P("rock", -300, 1.0, undefined, 0.7),
];
// O ALTO com vista para o arraial de Israel (Nm 24): Balaão levanta os olhos e
// vê as TENDAS de Israel acampadas por tribos — as "formosas tendas de Jacó".
const VISTA_ISRAEL: StagePropSpec[] = [
  P("altar", -300, 0.62, 0.5, 0.24),
  P("altar", -190, 0.66, undefined, 0.26),
  P("altar", -90, 0.7, 0.55, 0.28),
  { ...P("campfire", 20, 0.85, 0.7, 0.4), tag: "holocausto" },
  P("tent", 200, 0.85, undefined, 0.66),
  P("tent", 300, 0.78, undefined, 0.6),
  P("tent", 120, 0.7, undefined, 0.56),
  P("grass", 250, 0.7, undefined, 0.82),
];

// Balaão profeta (falando o oráculo do SENHOR) e Baláque junto ao holocausto.
const balaao = (dx: number, pose = "raise", extra: Partial<CastPlacement> = {}): CastPlacement =>
  C("homem", dx, pose, { id: "balaao", dy: 0.5, facing: 1, ...extra });
const balaque = (dx: number, pose = "stand", extra: Partial<CastPlacement> = {}): CastPlacement =>
  C("rei", dx, pose, { id: "balaque", dy: 0.5, facing: -1, ...extra });

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Nm 23
  23: {
    start: { terrain: "mountain", night: 0.15, glory: 0.5, storm: 0, fire: 0.2, verdure: 0.15 },
    beats: [
      // --- PRIMEIRO ALTO (Bamote-Baal): os sete altares.
      b(1, { by: "homem", q: "Edifica-me aqui sete altares", props: SETE_ALTARES,
        env: { terrain: "mountain", glory: 0.5, night: 0.15, fire: 0.2, verdure: 0.15 }, cast: [
        balaao(-70, "point"), balaque(120, "stand"),
      ] }),
      b(2, { q: "sobre cada altar", cast: [                                        // Baláque oferece novilho e carneiro sobre cada altar
        balaque(80, "bow"), balaao(-90, "stand"),
      ] }),
      b(3, { by: "homem", q: "Fica-te junto do teu holocausto", cast: [            // "fica junto ao holocausto; eu irei ao alto"
        balaao(-40, "walk", { facing: 1 }), balaque(150, "stand"),
      ] }),
      b(4, { by: "homem", q: "Preparei sete altares", env: { glory: 0.7 }, cast: [ // encontrando-se Deus com ele: "preparei sete altares"
        balaao(-30, "raise", { glow: 0.25 }),
      ] }),
      b(5, { by: "deus", q: "pôs a palavra na boca de Balaão", env: { glory: 0.85 }, cast: [ // o SENHOR põe a palavra na boca de Balaão
        balaao(-30, "stand", { glow: 0.35 }),
      ] }),
      b(6, { q: "todos os príncipes dos moabitas", cast: [                          // volta ao holocausto, com Baláque e os príncipes
        balaao(-70, "walk"), balaque(120, "stand"), C("multidao", 250, "stand", { dy: 0.44 }),
      ] }),
      // --- PRIMEIRO ORÁCULO.
      b(7, { by: "homem", q: "amaldiçoa-me a Jacó", cast: [                          // "Baláque me mandou: vem, amaldiçoa a Jacó"
        balaao(-40, "point"), balaque(160, "stand"),
      ] }),
      b(8, { by: "homem", q: "Como amaldiçoarei o que Deus não amaldiçoa?", env: { glory: 0.78 }, cast: [ // ÍCONE: "Como amaldiçoarei o que Deus não amaldiçoa?"
        balaao(-30, "raise", { glow: 0.3 }), balaque(180, "stand"),
      ] }),
      b(9, { by: "homem", q: "este povo habitará só" }),                            // "este povo habitará só, e não será contado entre as nações"
      b(10, { by: "homem", q: "Quem contará o pó de Jacó" }),                       // "quem contará o pó de Jacó?"
      b(11, { by: "rei", q: "inteiramente os abençoaste", env: { glory: 0.42 }, cast: [ // Baláque indignado: "chamei-te para amaldiçoar, e os abençoaste!"
        balaque(60, "point", { facing: 1 }), balaao(-100, "stand"),
      ] }),
      b(12, { by: "homem", q: "o que o Senhor pôs na minha boca", cast: [           // "não hei de falar o que o SENHOR pôs na minha boca?"
        balaao(-60, "raise"), balaque(120, "stand"),
      ] }),
      b(13, { by: "rei", q: "a outro lugar", cast: [                                // Baláque: "vem a outro lugar, e amaldiçoa-o dali"
        balaque(60, "point", { facing: 1 }), balaao(-100, "stand"),
      ] }),
      // --- SEGUNDO ALTO: campo de Zofim, cume de Pisga.
      b(14, { q: "ao cume de Pisga", props: SETE_ALTARES,
        env: { terrain: "mountain", glory: 0.5, night: 0.15, fire: 0.2 }, cast: [   // ao cume de Pisga: outros sete altares
        balaao(-70, "walk"), balaque(120, "walk", { facing: 1 }),
      ] }),
      b(15, { by: "homem", q: "Fica aqui junto do teu holocausto", cast: [          // "fica junto ao holocausto; eu irei ao encontro do SENHOR"
        balaao(-40, "walk", { facing: 1 }), balaque(150, "stand"),
      ] }),
      b(16, { by: "deus", q: "pôs uma palavra na sua boca", env: { glory: 0.85 }, cast: [ // o SENHOR de novo põe a palavra na sua boca
        balaao(-30, "stand", { glow: 0.35 }),
      ] }),
      b(17, { by: "rei", q: "Que coisa falou o Senhor?", cast: [                     // Baláque, ansioso: "que coisa falou o SENHOR?"
        balaque(90, "point", { facing: 1 }), balaao(-70, "walk"),
      ] }),
      // --- SEGUNDO ORÁCULO.
      b(18, { by: "homem", q: "Levanta-te, Balaque, e ouve", cast: [                // "levanta-te, Baláque, e ouve, filho de Zipor"
        balaao(-40, "point"), balaque(160, "stand"),
      ] }),
      b(19, { by: "homem", q: "Deus não é homem, para que minta", env: { glory: 0.8 }, cast: [ // ÍCONE: "Deus não é homem, para que minta"
        balaao(-30, "raise", { glow: 0.32 }), balaque(180, "stand"),
      ] }),
      b(20, { by: "homem", q: "recebi mandado de abençoar" }),                       // "recebi mandado de abençoar; ele abençoou, e não posso revogar"
      b(21, { by: "homem", q: "aclamação de um rei" }),                              // "no meio dele se ouve a aclamação de um rei"
      b(22, { by: "homem", q: "Deus os tirou do Egito" }),                           // "Deus os tirou do Egito; suas forças são como as do boi selvagem"
      b(23, { by: "homem", q: "Que coisas Deus tem realizado!", env: { glory: 0.72 } }), // "que coisas Deus tem realizado!"
      b(24, { by: "homem", q: "se erguerá como leão", cast: [                        // "o povo se erguerá como leão"
        balaao(-40, "raise"),
      ] }),
      b(25, { by: "rei", q: "Nem o amaldiçoarás, nem o abençoarás", env: { glory: 0.4 }, cast: [ // Baláque: "nem o amaldiçoes nem o abençoes!"
        balaque(60, "point", { facing: 1 }), balaao(-100, "stand"),
      ] }),
      b(26, { by: "homem", q: "Tudo o que o Senhor falar isso farei", cast: [        // "tudo o que o SENHOR falar, isso farei"
        balaao(-60, "raise"), balaque(120, "stand"),
      ] }),
      b(27, { by: "rei", q: "a outro lugar", cast: [                                 // Baláque: "vem a outro lugar; talvez apraza a Deus"
        balaque(60, "point", { facing: 1 }), balaao(-100, "stand"),
      ] }),
      // --- TERCEIRO ALTO: cume de Peor, sobre o deserto.
      b(28, { q: "ao cume de Peor", props: SETE_ALTARES,
        env: { terrain: "mountain", glory: 0.5, night: 0.15, fire: 0.2 }, cast: [    // ao cume de Peor, que dá para o deserto
        balaao(-70, "walk"), balaque(120, "walk", { facing: 1 }),
      ] }),
      b(29, { by: "homem", q: "Edifica-me aqui sete altares", cast: [                // "edifica aqui sete altares" (terceira vez)
        balaao(-70, "point"), balaque(120, "stand"),
      ] }),
      b(30, { q: "sobre cada altar", cast: [                                         // Baláque oferece de novo sobre cada altar
        balaque(80, "bow"), balaao(-90, "stand"),
      ] }),
    ],
  },

  // ------------------------------------------------------------------ Nm 24
  24: {
    start: { terrain: "mountain", night: 0.15, glory: 0.6, storm: 0, fire: 0.15, verdure: 0.2 },
    beats: [
      b(1, { q: "voltou o seu rosto para o deserto", props: VISTA_ISRAEL,
        env: { terrain: "mountain", glory: 0.6, night: 0.15, fire: 0.15, verdure: 0.2 }, cast: [ // Balaão volta o rosto para o deserto, já sem encantamentos
        balaao(-60, "stand", { facing: 1 }),
      ] }),
      b(2, { q: "veio sobre ele o Espírito de Deus", env: { glory: 0.8 }, cast: [    // vendo Israel por tribos, veio sobre ele o Espírito de Deus
        balaao(-60, "raise", { glow: 0.35, facing: 1 }),
      ] }),
      // --- TERCEIRO ORÁCULO.
      b(3, { by: "homem", q: "o homem de olhos abertos", cast: [                     // "fala o homem de olhos abertos"
        balaao(-50, "raise", { facing: 1 }),
      ] }),
      b(4, { by: "homem", q: "a visão do Todo-Poderoso", env: { glory: 0.78 } }),    // "o que vê a visão do Todo-Poderoso, e se lhe abrem os olhos"
      b(5, { by: "homem", q: "Quão formosas são as tuas tendas, ó Jacó", env: { glory: 0.85, verdure: 0.4 }, cast: [ // ÍCONE: "Quão formosas são as tuas tendas, ó Jacó!"
        balaao(-140, "point", { glow: 0.3, facing: 1 }),
      ] }),
      b(6, { by: "homem", q: "como cedros junto às águas" }),                         // "como jardins à beira dos rios, como cedros junto às águas"
      b(7, { by: "homem", q: "o seu reino será exaltado" }),                          // "o seu rei se erguerá, e o seu reino será exaltado"
      b(8, { by: "homem", q: "Deus o tirou do Egito" }),                              // "Deus o tirou do Egito; consumirá as nações inimigas"
      b(9, { by: "homem", q: "benditos os que te abençoarem", env: { glory: 0.8 }, cast: [ // "benditos os que te abençoarem, malditos os que te amaldiçoarem"
        balaao(-120, "raise", { glow: 0.3, facing: 1 }),
      ] }),
      b(10, { by: "rei", q: "bateu ele as suas palmas", env: { glory: 0.35 }, cast: [ // Baláque enfurecido bate as palmas: "três vezes os abençoaste!"
        balaque(70, "point", { facing: 1 }), balaao(-110, "stand", { facing: -1 }),
      ] }),
      b(11, { by: "rei", q: "o Senhor te privou desta honra", env: { glory: 0.35 }, cast: [ // "foge para o teu lugar; o SENHOR te privou da honra"
        balaque(70, "point", { facing: 1 }), balaao(-110, "stand"),
      ] }),
      b(12, { by: "homem", q: "aos teus mensageiros", cast: [                         // Balaão: "não falei eu aos teus mensageiros?"
        balaao(-90, "raise"), balaque(90, "stand"),
      ] }),
      b(13, { by: "homem", q: "não poderia ir além da ordem do Senhor" }),           // "não poderia ir além da ordem do SENHOR"
      b(14, { by: "homem", q: "nos últimos dias", cast: [                             // "avisar-te-ei do que este povo fará ao teu nos últimos dias"
        balaao(-80, "point"),
      ] }),
      // --- QUARTO ORÁCULO — a ESTRELA de Jacó.
      b(15, { by: "homem", q: "o homem de olhos abertos", cast: [                     // "fala o homem de olhos abertos"
        balaao(-50, "raise"),
      ] }),
      b(16, { by: "homem", q: "a visão do Todo-Poderoso" }),                          // "o que viu a visão do Todo-Poderoso"
      b(17, { by: "homem", q: "uma estrela procederá de Jacó",                        // ÍCONE MESSIÂNICO: "uma ESTRELA procederá de Jacó, e um cetro subirá de Israel"
        props: [
          { ...P("star", 0, 2.8, undefined, 0.3), sky: true, tag: "estrela-de-jaco" },
          { ...P("star", 80, 1.4, undefined, 0.36), sky: true },
          { ...P("star", -100, 1.1, undefined, 0.32), sky: true },
          P("tent", 210, 0.82, undefined, 0.64),
          P("tent", 300, 0.75, undefined, 0.58),
          P("altar", -260, 0.62, 0.5, 0.26),
          P("rock", -320, 1.0, undefined, 0.72),
        ],
        env: { terrain: "mountain", glory: 0.9, night: 0.5, fire: 0.15 }, cast: [
        balaao(-140, "point", { glow: 0.45, facing: 1 }),
      ] }),
      b(18, { by: "homem", q: "Israel fará proezas" }),                               // "Edom será possessão; Israel fará proezas"
      b(19, { by: "homem", q: "dominará um de Jacó" }),                               // "dominará um de Jacó"
      b(20, { by: "homem", q: "Amaleque é a primeira das nações", env: { glory: 0.6 }, cast: [ // vendo Amaleque: "Amaleque é a primeira das nações; seu fim, destruição"
        balaao(-80, "point"),
      ] }),
      b(21, { by: "homem", q: "puseste o teu ninho na penha", cast: [                 // vendo os queneus: "puseste o teu ninho na penha"
        balaao(-80, "point"),
      ] }),
      b(22, { by: "homem", q: "Assur te leve por prisioneiro" }),                     // "até que Assur te leve prisioneiro"
      b(23, { by: "homem", q: "quando Deus fizer isto?", env: { glory: 0.6 } }),      // "ai! quem viverá quando Deus fizer isto?"
      b(24, { by: "homem", q: "das costas de Quitim" }),                              // "naus virão das costas de Quitim e afligirão a Assur"
      b(25, { q: "voltou ao seu lugar", env: { glory: 0.55 }, cast: [                 // Balaão se levanta e volta ao seu lugar; Baláque segue o seu caminho
        balaao(-120, "walk", { facing: -1 }), balaque(120, "walk", { facing: 1 }),
      ] }),
    ],
  },
};
