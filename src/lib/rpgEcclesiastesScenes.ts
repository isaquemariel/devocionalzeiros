// ============================================================================
// Roteiros de cena (Living Scene v2) — ECLESIASTES, capítulo por capítulo.
// A reflexão do Pregador sobre a vaidade de tudo "debaixo do sol": prazeres,
// riqueza, trabalho, o tempo para cada coisa, a vida e a morte — até a
// conclusão: teme a Deus e lembra-te do teu Criador. Puramente visual/
// narrativo — não toca em progresso. Segue o padrão de Êxodo/Gênesis.
// ============================================================================

import type { ChapterScript, V2Actor, V2Prop, SceneState } from "@/lib/rpgLivingV2";

const F = (x: number, role: V2Actor["role"], action: V2Actor["action"], palette?: V2Actor["palette"], extra: Partial<V2Actor> = {}): V2Actor => ({ x, role, action, palette, ...extra });
const AN = (x: number, animal: NonNullable<V2Actor["animal"]>, scale = 1, color?: string): V2Actor => ({ x, kind: "animal", animal, scale, color });
const P = (kind: string, x: number, scale = 1, fire?: number): V2Prop => ({ kind, x, scale, ...(fire != null ? { fire } : {}) });
const kf = (v: number, state: SceneState) => ({ v, state });

export const ECCLESIASTES_SCENES: Record<number, ChapterScript> = {
  1: {
    keyframes: [
      kf(1, { terrain: "field", props: [P("tree", 0.2), P("tree", 0.82, 0.9)], actors: [F(0.5, "king", "stand", "gold")] }),
      kf(5, { terrain: "plain", glory: 0.4, props: [P("well", 0.7)], actors: [F(0.45, "elder", "stand", "purple")] }),
      kf(7, { terrain: "river", props: [P("reeds", 0.18), P("reeds", 0.85)], actors: [F(0.5, "elder", "stand", "purple")] }),
      kf(12, { terrain: "city", night: 0.2, actors: [F(0.5, "king", "mourn", "gold")] }),
    ],
    beats: [
      { upTo: 3, reaction: "Palavras do Pregador: 'Vaidade de vaidades, tudo é vaidade.' 🍃" },
      { upTo: 6, reaction: "O sol nasce e se põe; o vento gira sem cessar. ☀️" },
      { upTo: 11, reaction: "Os rios correm ao mar, e nada há de novo debaixo do sol. 🌊" },
      { upTo: 99, reaction: "Em muita sabedoria há muito enfado. 😔" },
    ],
  },
  2: {
    keyframes: [
      kf(1, { terrain: "garden", props: [P("palm", 0.16), P("tree", 0.34), P("well", 0.6), P("palm", 0.86)], actors: [F(0.48, "king", "raise", "purple")] }),
      kf(4, { terrain: "garden", crowd: 0.5, props: [P("tree", 0.2), P("tent", 0.5, 1.3), P("palm", 0.82)], actors: [F(0.4, "king", "stand", "gold"), F(0.66, "servant", "carry", "sand")] }),
      kf(11, { terrain: "garden", night: 0.35, props: [P("tree", 0.7)], actors: [F(0.48, "king", "mourn", "purple")] }),
      kf(24, { terrain: "field", glory: 0.35, props: [P("tree", 0.75)], actors: [F(0.5, "elder", "stand", "brown")] }),
    ],
    beats: [
      { upTo: 3, reaction: "'Experimentarei o prazer' — mas eis que também era vaidade. 🍷" },
      { upTo: 10, reaction: "O Pregador constrói casas, vinhas e jardins; ajunta riquezas. 🏛️" },
      { upTo: 23, reaction: "Tudo era vaidade e correr atrás do vento. 🍃" },
      { upTo: 99, god: undefined, reaction: "Comer, beber e alegrar-se no trabalho vem da mão de Deus. 🤍" },
    ],
  },
  3: {
    keyframes: [
      kf(1, { terrain: "field", props: [P("tree", 0.25), P("tree", 0.8, 0.8)], actors: [F(0.5, "man", "stand", "green")] }),
      kf(2, { terrain: "field", glory: 0.3, props: [P("tree", 0.7)], actors: [F(0.4, "man", "kneel", "brown"), F(0.62, "woman", "carry", "sand")] }),
      kf(4, { terrain: "field", night: 0.4, props: [P("tree", 0.75)], actors: [F(0.45, "man", "mourn", "gray")] }),
      kf(11, { terrain: "plain", glory: 0.6, actors: [F(0.5, "elder", "raise", "purple")] }),
    ],
    beats: [
      { upTo: 1, reaction: "Para tudo há um tempo debaixo do céu. ⏳" },
      { upTo: 3, reaction: "Tempo de nascer e tempo de morrer; de plantar e de colher. 🌱" },
      { upTo: 8, reaction: "Tempo de chorar e tempo de rir; de guerra e de paz. ⚖️" },
      { upTo: 99, god: undefined, reaction: "Deus fez tudo formoso a seu tempo, e pôs a eternidade no coração. ✨" },
    ],
  },
  4: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.6, night: 0.25, actors: [F(0.4, "man", "mourn", "gray"), F(0.66, "man", "stand", "brown")] }),
      kf(9, { terrain: "plain", props: [P("tree", 0.7)], actors: [F(0.4, "man", "walk", "brown"), F(0.56, "man", "walk", "sand")] }),
      kf(13, { terrain: "city", actors: [F(0.35, "elder", "stand", "purple"), F(0.68, "man", "stand", "green")] }),
    ],
    beats: [
      { upTo: 3, reaction: "O Pregador vê as lágrimas dos oprimidos, sem consolador. 😢" },
      { upTo: 8, reaction: "O trabalho sem fim e a solidão também são vaidade. 🍃" },
      { upTo: 12, reaction: "Melhor serem dois do que um; o cordão triplo não se rompe. 🤝" },
      { upTo: 99, reaction: "Melhor o jovem pobre e sábio que o rei velho e insensato. 👑" },
    ],
  },
  5: {
    keyframes: [
      kf(1, { terrain: "city", props: [P("altar", 0.5, 1.1, 0.5)], actors: [F(0.42, "man", "bow", "white")] }),
      kf(4, { terrain: "city", glory: 0.3, props: [P("altar", 0.5, 1.1, 0.5)], actors: [F(0.45, "man", "kneel", "white")] }),
      kf(10, { terrain: "city", night: 0.3, actors: [F(0.4, "king", "mourn", "gold"), F(0.66, "servant", "stand", "sand")] }),
      kf(18, { terrain: "field", glory: 0.35, actors: [F(0.5, "man", "stand", "brown")] }),
    ],
    beats: [
      { upTo: 3, reaction: "Guarda o teu pé ao entrares na casa de Deus. 🙏" },
      { upTo: 7, god: undefined, reaction: "Cumpre o que prometeres; teme a Deus, não fales ao vento. 🕯️" },
      { upTo: 17, reaction: "Quem ama o dinheiro nunca se farta dele. 💰" },
      { upTo: 99, god: undefined, reaction: "É bom fruir o trabalho — isto é dom de Deus. 🌾" },
    ],
  },
  6: {
    keyframes: [
      kf(1, { terrain: "plain", night: 0.2, props: [P("tent", 0.66, 1.2)], actors: [F(0.4, "king", "mourn", "gold"), F(0.7, "servant", "stand", "sand")] }),
      kf(7, { terrain: "field", actors: [F(0.5, "man", "carry", "brown")] }),
      kf(9, { terrain: "plain", night: 0.4, actors: [F(0.5, "elder", "mourn", "gray")] }),
    ],
    beats: [
      { upTo: 6, reaction: "Riqueza sem poder desfrutá-la — dura vaidade. 😔" },
      { upTo: 9, reaction: "Melhor a vista dos olhos que o vaguear do desejo. 👁️" },
      { upTo: 99, reaction: "Quem sabe o que é bom para o homem nesta vida fugaz? 🍃" },
    ],
  },
  7: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.5, props: [P("tent", 0.7)], actors: [F(0.4, "man", "mourn", "gray"), F(0.66, "man", "mourn", "sand")] }),
      kf(4, { terrain: "city", night: 0.55, actors: [F(0.5, "elder", "stand", "purple")] }),
      kf(11, { terrain: "hills", glory: 0.35, props: [P("tree", 0.75)], actors: [F(0.48, "elder", "stand", "white")] }),
      kf(23, { terrain: "hills", actors: [F(0.5, "elder", "kneel", "purple")] }),
    ],
    beats: [
      { upTo: 4, reaction: "Melhor a casa do luto que a casa do banquete. 🕯️" },
      { upTo: 10, reaction: "A tristeza do rosto pode fazer melhor o coração. 🤍" },
      { upTo: 18, reaction: "A sabedoria dá vida a quem a possui. 📖" },
      { upTo: 99, reaction: "Deus fez o homem reto, mas ele buscou muitas astúcias. ⚖️" },
    ],
  },
  8: {
    keyframes: [
      kf(1, { terrain: "city", props: [P("tower", 0.8, 1.1)], actors: [F(0.35, "elder", "bow", "white"), F(0.68, "king", "stand", "gold")] }),
      kf(8, { terrain: "city", night: 0.4, actors: [F(0.5, "man", "mourn", "gray")] }),
      kf(15, { terrain: "field", glory: 0.3, actors: [F(0.45, "man", "stand", "brown"), F(0.66, "man", "raise", "sand")] }),
    ],
    beats: [
      { upTo: 7, reaction: "Guarda o mandamento do rei; há tempo e juízo para tudo. 👑" },
      { upTo: 13, reaction: "Ninguém tem poder sobre o dia da morte. 🌑" },
      { upTo: 99, god: undefined, reaction: "Louvei a alegria: comer, beber e alegrar-se sob o sol. ☀️" },
    ],
  },
  9: {
    keyframes: [
      kf(1, { terrain: "plain", night: 0.35, actors: [F(0.4, "elder", "stand", "gray"), F(0.66, "man", "stand", "brown")] }),
      kf(7, { terrain: "garden", glory: 0.35, props: [P("tree", 0.2), P("palm", 0.8)], actors: [F(0.5, "man", "raise", "green")] }),
      kf(11, { terrain: "field", actors: [F(0.35, "man", "walk", "brown"), F(0.7, "warrior", "stand", "red")] }),
    ],
    beats: [
      { upTo: 6, reaction: "Um mesmo destino alcança a todos — vivos e mortos. 🌑" },
      { upTo: 10, god: undefined, reaction: "Come com alegria o teu pão; faze com todo vigor o que puderes. 🍞" },
      { upTo: 99, reaction: "O tempo e o acaso alcançam a todos; a sabedoria vale mais que a força. 📖" },
    ],
  },
  10: {
    keyframes: [
      kf(1, { terrain: "hills", props: [P("tree", 0.78)], actors: [F(0.4, "elder", "stand", "purple"), F(0.66, "man", "mourn", "sand")] }),
      kf(8, { terrain: "field", props: [P("well", 0.6)], actors: [F(0.45, "man", "carry", "brown")] }),
      kf(16, { terrain: "city", crowd: 0.4, actors: [F(0.5, "king", "stand", "gold")] }),
    ],
    beats: [
      { upTo: 3, reaction: "Um pouco de loucura corrompe a sabedoria e a honra. 🪰" },
      { upTo: 15, reaction: "Quem cava uma cova nela poderá cair. ⛏️" },
      { upTo: 99, reaction: "Ai da terra cujo rei é criança e cujos príncipes comem cedo. 👑" },
    ],
  },
  11: {
    keyframes: [
      kf(1, { terrain: "sea", props: [P("reeds", 0.18), P("reeds", 0.85)], actors: [F(0.45, "man", "raise", "brown")] }),
      kf(6, { terrain: "field", glory: 0.3, actors: [F(0.4, "man", "kneel", "brown"), F(0.66, "man", "carry", "sand")] }),
      kf(9, { terrain: "hills", glory: 0.4, props: [P("tree", 0.75)], actors: [F(0.5, "child", "raise", "green")] }),
    ],
    beats: [
      { upTo: 5, reaction: "Lança o teu pão sobre as águas; depois de muitos dias o acharás. 🌊" },
      { upTo: 8, reaction: "De manhã semeia a tua semente; não retenhas a tua mão. 🌱" },
      { upTo: 99, god: undefined, reaction: "Alegra-te, jovem, mas sabe que Deus te trará a juízo. ☀️" },
    ],
  },
  12: {
    keyframes: [
      kf(1, { terrain: "hills", glory: 0.4, props: [P("tree", 0.78)], actors: [F(0.42, "child", "raise", "green"), F(0.68, "elder", "stand", "gray")] }),
      kf(3, { terrain: "city", night: 0.55, props: [P("tower", 0.78)], actors: [F(0.5, "elder", "mourn", "gray")] }),
      kf(7, { terrain: "field", night: 0.4, props: [P("altar", 0.7)], actors: [F(0.5, "elder", "lie", "gray")] }),
      kf(13, { terrain: "mountain", glory: 0.9, props: [P("altar", 0.5, 1.1, 0.7)], actors: [F(0.5, "man", "bow", "white")] }),
    ],
    beats: [
      { upTo: 2, god: undefined, reaction: "Lembra-te do teu Criador nos dias da tua mocidade. ☀️" },
      { upTo: 7, reaction: "Chegam os dias maus: o pó volta à terra e o espírito a Deus. 🌑" },
      { upTo: 12, reaction: "'Vaidade de vaidades', diz o Pregador. 🍃" },
      { upTo: 99, god: undefined, reaction: "Teme a Deus e guarda os seus mandamentos: isto é o dever de todo homem. ✨" },
    ],
  },
};
