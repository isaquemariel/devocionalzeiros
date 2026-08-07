// ============================================================================
// NÚMEROS 11–12 — CENA VIVA. O FOGO de Taberá, o MANÁ e as CODORNIZES; e a
// LEPRA de Miriã.
//
// Nm 11 — TABERÁ e QUIBROTE-ATAAVÁ: o povo se queixa e o FOGO do Senhor arde na
// extremidade do arraial; a saudade das comidas do Egito e o desprezo do MANÁ
// ("como semente de coentro"); Deus põe do ESPÍRITO de Moisés sobre 70 ANCIÃOS
// que PROFETIZAM ao redor da tenda; e as CODORNIZES trazidas do mar por um
// grande vento — seguidas de praga. O clima alterna: fogo/juízo (campfire,
// glória baixa, noite) e a descida do Espírito (glória, coluna de nuvem).
//
// Nm 12 — A LEPRA DE MIRIÃ: Miriã e Arão murmuram contra Moisés (o mais manso
// dos homens) por causa da mulher cusita; a COLUNA DE NUVEM se põe à porta da
// tenda; Miriã fica LEPROSA, branca como a NEVE; Moisés clama "ó Deus, rogo-te
// que a cures"; fica sete dias fora do arraial.
//
// A VOZ DE DEUS (regra do projeto): sem mediador, a voz vem do alto
// (`by: "deus"`) com glória; na teofania de Nm 12 o Senhor desce na COLUNA DE
// NUVEM (`pillar`), e o balão sai dela. Quando Moisés ou Arão falam, o `by` é o
// personagem (`moises`/`arao`).
// ============================================================================

import type { StageScript, StageBeat, CastPlacement, StagePropSpec } from "@/lib/rpgStage";

const C = (role: string, dx: number, pose?: string, extra: Partial<CastPlacement> = {}): CastPlacement =>
  ({ role, dx, pose, ...extra });
const P = (kind: string, dx: number, scale = 1, fire?: number, dy?: number): StagePropSpec =>
  ({ kind, dx, scale, ...(fire != null ? { fire } : {}), ...(dy != null ? { dy } : {}) });
const b = (v: number, extra: Partial<StageBeat> = {}): StageBeat => ({ v, ...extra });
const dv = (v: number) => b(v, { by: "deus" });

// Cenário base do arraial no deserto (tabernáculo ao centro).
const ARRAIAL: StagePropSpec[] = [
  { ...P("tent", -30, 1.45, undefined, 0.1), tag: "tabernaculo" },
  P("tent", -260, 1.0, undefined, 0.2),
  P("tent", 240, 1.0, undefined, 0.22),
  P("palm", -310, 1.05, undefined, 0.14),
  P("well", 320, 1.0, undefined, 0.5),
  P("grass", -60, 0.82, undefined, 0.82),
  P("grass", 60, 0.78, undefined, 0.74),
];

// TABERÁ — o fogo do Senhor arde na última parte do arraial (juízo: noite alta,
// glória baixa, fogo consumidor).
const FOGO: StagePropSpec[] = [
  { ...P("tent", -30, 1.45, undefined, 0.1), tag: "tabernaculo" },
  P("tent", -260, 1.0, undefined, 0.2),
  { ...P("campfire", 150, 2.2, 1, 0.34), tag: "fogo-do-senhor" }, // o fogo do SENHOR grande e central
  P("campfire", 250, 1.1, 0.9, 0.2),                              // uma 2ª chama menor, atrás
  P("palm", -310, 1.05, undefined, 0.14),
  P("grass", -60, 0.82, undefined, 0.82),
];

// O MANÁ desprezado à porta das tendas.
const MANA: StagePropSpec[] = [
  { ...P("tent", -30, 1.45, undefined, 0.1), tag: "tabernaculo" },
  P("tent", -260, 1.0, undefined, 0.2),
  P("tent", 240, 1.0, undefined, 0.22),
  { ...P("manna", 120, 1.4, undefined, 0.62), tag: "mana" }, // maná ampliado (~+0.3) p/ leitura
  P("manna", 30, 1.15, undefined, 0.72),
  P("palm", -310, 1.05, undefined, 0.14),
  P("grass", 60, 0.78, undefined, 0.74),
];

// A descida do ESPÍRITO — coluna de nuvem sobre a tenda, 70 anciãos ao redor.
const ESPIRITO: StagePropSpec[] = [
  { ...P("tent", 0, 1.5, undefined, 0.1), tag: "tabernaculo" },
  { ...P("pillar", 0, 1.4, undefined, 0.16), tag: "coluna-nuvem" },
  P("palm", -310, 1.05, undefined, 0.14),
  P("grass", -60, 0.82, undefined, 0.82),
  P("grass", 90, 0.78, undefined, 0.74),
];

// As CODORNIZES cobrindo o arraial (grande vento traz aves do mar), depois praga.
const CODORNIZES: StagePropSpec[] = [
  { ...P("tent", -30, 1.4, undefined, 0.1), tag: "tabernaculo" },
  { ...P("birds", -180, 0.7, undefined, 0.18), tag: "codornizes" },
  P("birds", -40, 0.6, undefined, 0.12),
  P("birds", 120, 0.65, undefined, 0.2),
  P("birds", 260, 0.55, undefined, 0.1),
  P("birds", 40, 0.5, undefined, 0.28),
  P("palm", -310, 1.05, undefined, 0.14),
  P("grass", 60, 0.78, undefined, 0.74),
];

// Os 70 anciãos ao redor da tenda — representação da multidão de profetas.
const anciaos = (pose: string, glow = 0): CastPlacement[] => [
  C("anciao", -220, pose, { dy: 0.5, facing: 1, glow, id: "anc1" }),
  C("anciao", -140, pose, { dy: 0.46, facing: 1, glow, id: "anc2" }),
  C("anciao", -70, pose, { dy: 0.54, facing: 1, glow, id: "anc3" }),
  C("anciao", 90, pose, { dy: 0.54, facing: -1, glow, id: "anc4" }),
  C("anciao", 160, pose, { dy: 0.46, facing: -1, glow, id: "anc5" }),
  C("anciao", 230, pose, { dy: 0.5, facing: -1, glow, id: "anc6" }),
];

export const CHAPTERS: Record<number, StageScript> = {
  // ------------------------------------------------------------------ Nm 11
  11: {
    start: { terrain: "desert", night: 0.1, glory: 0.5, storm: 0, fire: 0, verdure: 0.2 },
    beats: [
      // TABERÁ — o fogo do Senhor consome a última parte do arraial.
      b(1, { q: "o fogo do SENHOR ardeu entre eles", props: FOGO, env: { terrain: "desert", glory: 0.08, night: 0.62, fire: 0.9, verdure: 0.12 }, cast: [
        C("homem", -100, "bow", { dy: 0.5 }),       // figuras individuais recuando do fogo (não multidão comemorando)
        C("mulherComum", -40, "lie", { dy: 0.46 }),
      ] }),
      b(2, { q: "Moisés orou ao Senhor, e o fogo se apagou", env: { glory: 0.16, night: 0.5, fire: 0.4 }, cast: [ // NARRAÇÃO: sem `by` (o versículo não é fala de Moisés)
        C("moises", -140, "raise", { dy: 0.5, facing: 1 }),
        C("multidao", 40, "kneel", { dy: 0.48 }),
      ] }),
      b(3, { q: "chamou aquele lugar Taberá", env: { glory: 0.2, night: 0.4, fire: 0.12 }, cast: [
        C("moises", -140, "stand", { dy: 0.5, facing: 1 }),
      ] }),
      // A saudade das comidas do Egito; o desprezo do maná.
      b(4, { q: "Quem nos dará carne a comer?", props: MANA, env: { terrain: "desert", glory: 0.4, night: 0.2, fire: 0, verdure: 0.2 }, cast: [
        C("multidao", 120, "stand", { dy: 0.46 }),
        C("multidao", 210, "kneel", { dy: 0.42, id: "povo2" }),
      ] }),
      b(5, { q: "Lembramo-nos dos peixes que no Egito", cast: [
        C("multidao", 120, "stand", { dy: 0.46 }),
      ] }),
      b(6, { q: "senão este maná diante dos nossos olhos", cast: [
        C("multidao", 120, "point", { dy: 0.46, facing: -1 }),
      ] }),
      b(7, { q: "o maná como semente de coentro" }),
      b(8, { q: "e dele fazia bolos", cast: [
        C("mulherComum", 90, "kneel", { dy: 0.6, facing: -1 }),
      ] }),
      b(9, { q: "o maná descia sobre ele", env: { night: 0.35, glory: 0.32 } }),
      // A ira do Senhor e a queixa de Moisés (o cargo pesado do povo).
      b(10, { q: "pareceu mal aos olhos de Moisés", env: { glory: 0.22, night: 0.3 }, cast: [
        C("moises", -140, "stand", { dy: 0.5, facing: 1 }),
        C("multidao", 120, "kneel", { dy: 0.46 }),
      ] }),
      b(11, { by: "moises", q: "Por que fizeste mal a teu servo", cast: [
        C("moises", -60, "kneel", { dy: 0.5, facing: 1 }),
      ] }),
      b(12, { by: "moises", q: "leva-o ao teu colo" }),
      b(13, { by: "moises", q: "Dá-nos carne a comer" }),
      b(14, { by: "moises", q: "muito pesado é para mim", cast: [
        C("moises", -60, "bow", { dy: 0.5, facing: 1 }),
      ] }),
      b(15, { by: "moises", q: "mata-me, peço-te" }),
      // O Senhor: ajunta 70 anciãos; tirarei do teu espírito.
      b(16, { by: "deus", q: "setenta homens dos anciãos de Israel", env: { glory: 0.6, night: 0.12 } }),
      b(17, { by: "deus", q: "tirarei do espírito que está sobre ti", env: { glory: 0.68 } }),
      b(18, { by: "deus", q: "comereis carne" }),
      dv(19),
      b(20, { by: "deus", q: "até vos sair pelas narinas" }),
      // Moisés duvida do número; o Senhor responde.
      b(21, { by: "moises", q: "Seiscentos mil homens de pé", env: { glory: 0.5 }, cast: [
        C("moises", -60, "stand", { dy: 0.5, facing: 1 }),
      ] }),
      dv(22),
      b(23, { by: "deus", q: "Teria sido encurtada a mão do Senhor?", env: { glory: 0.66 } }),
      // A descida do ESPÍRITO sobre os 70 anciãos — profetizam.
      b(24, { q: "os pôs ao redor da tenda", props: ESPIRITO, env: { terrain: "desert", glory: 0.62, night: 0.1, verdure: 0.2 }, cast: [
        C("moises", 0, "stand", { dy: 0.62, facing: 1 }),
        ...anciaos("stand"),
      ] }),
      b(25, { by: "deus", q: "quando o espírito repousou sobre eles, profetizaram", env: { glory: 0.95, night: 0.08 }, cast: [
        C("moises", 0, "kneel", { dy: 0.64, facing: 1, glow: 0.3 }),
        ...anciaos("raise", 0.5),
      ] }),
      b(26, { q: "profetizavam no arraial", env: { glory: 0.7 }, cast: [
        C("homem", -120, "raise", { dy: 0.52, facing: 1, glow: 0.35, id: "eldade" }),
        C("homem", -40, "raise", { dy: 0.5, facing: 1, glow: 0.35, id: "medade" }),
      ] }),
      b(27, { cast: [
        C("servo", 150, "walk", { dy: 0.5, facing: -1, id: "moco" }),
        C("moises", -80, "stand", { dy: 0.52, facing: -1 }),
      ] }),
      b(28, { by: "servo", q: "Moisés, meu senhor, proíbe-lho", cast: [
        C("servo", 100, "stand", { dy: 0.5, facing: -1, id: "josue" }),
        C("moises", -80, "stand", { dy: 0.52, facing: 1 }),
      ] }),
      b(29, { by: "moises", q: "todo o povo do Senhor fosse profeta", cast: [
        C("moises", -80, "raise", { dy: 0.52, facing: 1 }),
        C("servo", 100, "stand", { dy: 0.5, facing: -1, id: "josue" }),
      ] }),
      b(30, { cast: [
        C("moises", -60, "walk", { dy: 0.52, facing: -1 }),
        ...anciaos("walk"),
      ] }),
      // As CODORNIZES trazidas do mar por um grande vento.
      b(31, { q: "trouxe codornizes do mar", props: CODORNIZES, env: { terrain: "desert", glory: 0.4, night: 0.18, storm: 0.4, verdure: 0.18 }, cast: [
        C("multidao", 120, "raise", { dy: 0.46 }),
        C("multidao", 210, "point", { dy: 0.42, facing: 1, id: "povo2" }),
      ] }),
      b(32, { q: "colheram as codornizes", cast: [
        C("multidao", 100, "kneel", { dy: 0.5 }),
        C("mulherComum", 200, "kneel", { dy: 0.44, facing: -1 }),
      ] }),
      // A praga em Quibrote-Ataavá (juízo: glória baixa, noite, nuvem escura).
      b(33, { q: "feriu o Senhor o povo com uma praga mui grande", props: [
        { ...P("tent", -30, 1.4, undefined, 0.1), tag: "tabernaculo" },
        { ...P("clouds", -20, 1.5, undefined, 0.8), sky: true }, // nuvem carregada NO CÉU (sky:true)
        P("campfire", 240, 1.3, 0.8, 0.34),
        P("palm", -310, 1.05, undefined, 0.14),
        P("grass", 60, 0.78, undefined, 0.74),
      ], env: { terrain: "desert", glory: 0.06, night: 0.6, storm: 0.5, fire: 0.5, verdure: 0.1 }, cast: [
        C("homem", 100, "lie", { dy: 0.52 }),                    // MORTE: figuras individuais caídas (não multidão comemorando)
        C("mulherComum", 180, "lie", { dy: 0.46 }),
        C("homem", 240, "bow", { dy: 0.42, id: "p3" }),
      ] }),
      b(34, { q: "chamou Quibrote-Ataavá", env: { glory: 0.12, night: 0.45 } }),
      b(35, { q: "para Hazerote", env: { glory: 0.4, night: 0.2, storm: 0, fire: 0 }, cast: [
        C("multidao", 0, "walk", { dy: 0.5, facing: -1 }),
        C("moises", -140, "walk", { dy: 0.52, facing: -1 }),
      ] }),
    ],
  },

  // ------------------------------------------------------------------ Nm 12
  12: {
    start: { terrain: "desert", night: 0.1, glory: 0.55, storm: 0, fire: 0, verdure: 0.2 },
    beats: [
      // Miriã e Arão murmuram contra Moisés por causa da mulher cusita.
      b(1, { q: "por causa da mulher cusita", props: ARRAIAL, env: { terrain: "desert", glory: 0.4, night: 0.14, verdure: 0.2 }, cast: [
        C("mulher", -150, "point", { dy: 0.52, facing: 1, id: "miria" }),
        C("arao", -80, "stand", { dy: 0.5, facing: 1, glow: 0.2 }),
        C("moises", 120, "stand", { dy: 0.5, facing: -1 }),
      ] }),
      b(2, { q: "falou o Senhor somente por Moisés", cast: [
        C("mulher", -150, "point", { dy: 0.52, facing: 1, id: "miria" }),
        C("arao", -80, "raise", { dy: 0.5, facing: 1, glow: 0.2 }),
      ] }),
      // Moisés, o mais manso dos homens.
      b(3, { q: "era o homem Moisés mui manso", cast: [
        C("moises", 120, "bow", { dy: 0.5, facing: -1 }),
      ] }),
      // O Senhor chama os três à tenda.
      b(4, { by: "deus", q: "Vós três saí à tenda da congregação", env: { glory: 0.66, night: 0.1 }, cast: [
        C("moises", 60, "walk", { dy: 0.54, facing: 1 }),
        C("arao", -40, "walk", { dy: 0.5, facing: 1, glow: 0.15 }),
        C("mulher", -140, "walk", { dy: 0.48, facing: 1, id: "miria" }),
      ] }),
      // TEOFANIA — o Senhor desce na COLUNA DE NUVEM, à porta da tenda.
      b(5, { q: "desceu na coluna de nuvem", props: [
        { ...P("tent", 0, 1.5, undefined, 0.1), tag: "tabernaculo" },
        { ...P("pillar", 0, 1.45, undefined, 0.14), tag: "coluna-nuvem" },
        P("palm", -310, 1.05, undefined, 0.14),
        P("grass", 90, 0.78, undefined, 0.74),
      ], env: { terrain: "desert", glory: 0.85, night: 0.08, verdure: 0.2 }, cast: [
        C("arao", -110, "bow", { dy: 0.52, facing: 1, glow: 0.2 }),
        C("mulher", -180, "bow", { dy: 0.48, facing: 1, id: "miria" }),
      ] }),
      // O Senhor fala da coluna: com o profeta em visão; com Moisés, boca a boca.
      b(6, { by: "deus", q: "em visão a ele me farei conhecer", env: { glory: 0.9 } }),
      b(7, { by: "deus", q: "meu servo Moisés que é fiel em toda a minha casa" }),
      b(8, { by: "deus", q: "Boca a boca falo com ele" }),
      b(9, { q: "a ira do Senhor contra eles se acendeu", env: { glory: 0.4, night: 0.2 } }),
      // A nuvem se retira; Miriã fica LEPROSA, branca como a neve.
      b(10, { q: "Miriã ficou leprosa como a neve", props: ARRAIAL, env: { terrain: "desert", glory: 0.06, night: 0.36, verdure: 0.18 }, cast: [
        C("mulherComum", -60, "lie", { dy: 0.56, facing: 1, id: "miria" }), // leprosa: mulherComum honra `lie`, SEM aura dourada
        C("arao", 60, "point", { dy: 0.5, facing: 1, glow: 0.15 }),
        C("moises", 160, "stand", { dy: 0.5, facing: -1 }),
      ] }),
      // Arão intercede junto a Moisés.
      b(11, { by: "arao", q: "não ponhas sobre nós este pecado", env: { glory: 0.06, night: 0.36 }, cast: [
        C("arao", 40, "bow", { dy: 0.52, facing: -1, glow: 0.15 }),
        C("moises", 160, "stand", { dy: 0.5, facing: -1 }),
        C("mulherComum", -60, "lie", { dy: 0.56, facing: 1, id: "miria" }), // leprosa: SEM aura dourada
      ] }),
      b(12, { by: "arao", q: "não seja ela como um morto" }),
      // Moisés clama pela cura de Miriã.
      b(13, { by: "moises", q: "Ó Deus, rogo-te que a cures", env: { glory: 0.06, night: 0.36 }, cast: [
        C("moises", -40, "raise", { dy: 0.52, facing: 1 }),
        C("mulherComum", 120, "lie", { dy: 0.56, facing: -1, id: "miria" }), // leprosa: SEM aura dourada
      ] }),
      // O Senhor: fique sete dias fora do arraial.
      b(14, { by: "deus", q: "Esteja fechada sete dias fora do arraial", env: { glory: 0.62 } }),
      b(15, { q: "esteve fechada fora do arraial sete dias", env: { glory: 0.06, night: 0.36 }, cast: [
        C("mulherComum", 250, "bow", { dy: 0.42, facing: -1, id: "miria" }), // fechada fora do arraial, em vergonha: SEM aura dourada
        C("multidao", -80, "stand", { dy: 0.5 }),
      ] }),
      b(16, { q: "no deserto de Parã", env: { glory: 0.5 }, cast: [
        C("multidao", 0, "walk", { dy: 0.5, facing: -1 }),
        C("moises", -160, "walk", { dy: 0.52, facing: -1 }),
      ] }),
    ],
  },
};
