// ============================================================================
// Roteiros de cena (Living Scene v2) — HEBREUS, capítulo por capítulo.
// Cristo superior aos anjos e a Moisés, o grande Sumo Sacerdote, a nova
// aliança que substitui a antiga, o tabernáculo celestial, o sangue que
// remove pecados, a galeria da fé e a carreira que nos é proposta.
// Puramente visual/narrativo — não toca em progresso.
// Segue o padrão de Êxodo (rpgExodusScenes).
// ============================================================================

import type { ChapterScript, V2Actor, V2Prop, SceneState } from "@/lib/rpgLivingV2";

const F = (x: number, role: V2Actor["role"], action: V2Actor["action"], palette?: V2Actor["palette"], extra: Partial<V2Actor> = {}): V2Actor => ({ x, role, action, palette, ...extra });
const AN = (x: number, animal: NonNullable<V2Actor["animal"]>, scale = 1, color?: string): V2Actor => ({ x, kind: "animal", animal, scale, color });
const P = (kind: string, x: number, scale = 1, fire?: number): V2Prop => ({ kind, x, scale, ...(fire != null ? { fire } : {}) });
const kf = (v: number, state: SceneState) => ({ v, state });

export const HEBREWS_SCENES: Record<number, ChapterScript> = {
  1: {
    keyframes: [
      kf(1, { terrain: "mountain", glory: 0.5, actors: [F(0.4, "elder", "raise", "white")] }),
      kf(3, { terrain: "mountain", glory: 0.9, actors: [F(0.5, "man", "raise", "white")] }),
      kf(5, { terrain: "mountain", glory: 0.7, actors: [F(0.5, "man", "stand", "white"), F(0.28, "angel", "bow", "white"), F(0.72, "angel", "bow", "gold")] }),
    ],
    beats: [
      { upTo: 2, god: "Nestes últimos dias falou-nos pelo Filho.", reaction: "Deus, que falou pelos profetas, fala pelo Filho. ✨" },
      { upTo: 4, reaction: "O Filho é o resplendor da glória de Deus. 🌟" },
      { upTo: 99, god: "Adorem-no todos os anjos de Deus.", reaction: "O Filho é superior aos anjos. 👼" },
    ],
  },
  2: {
    keyframes: [
      kf(1, { terrain: "plain", glory: 0.4, actors: [F(0.42, "man", "stand", "white")] }),
      kf(9, { terrain: "mountain", glory: 0.6, actors: [F(0.5, "man", "kneel", "white"), F(0.26, "angel", "stand", "white")] }),
      kf(14, { terrain: "city", glory: 0.4, crowd: 0.4, actors: [F(0.4, "man", "raise", "white"), F(0.64, "man", "stand", "brown")] }),
    ],
    beats: [
      { upTo: 4, reaction: "Não descuidemos de tão grande salvação. 🙏" },
      { upTo: 13, god: "Coroaste-o de glória e de honra.", reaction: "Feito um pouco menor que os anjos, por nós. ✨" },
      { upTo: 99, reaction: "Ele se fez irmão nosso, para nos socorrer. 🤝" },
    ],
  },
  3: {
    keyframes: [
      kf(1, { terrain: "desert", glory: 0.5, props: [P("tent", 0.7)], actors: [F(0.4, "man", "stand", "white"), F(0.62, "man", "stand", "brown")] }),
      kf(5, { terrain: "desert", glory: 0.7, props: [P("tent", 0.72, 1.2)], actors: [F(0.45, "man", "raise", "white")] }),
      kf(16, { terrain: "desert", night: 0.3, crowd: 0.5, actors: [F(0.4, "man", "mourn", "sand")] }),
    ],
    beats: [
      { upTo: 6, reaction: "Cristo é digno de maior glória que Moisés. ✨" },
      { upTo: 11, god: "Não entrarão no meu descanso.", reaction: "Moisés foi servo fiel; Cristo, o Filho sobre a casa. 🏠" },
      { upTo: 99, reaction: "Não endureçais o coração, como no deserto. 😔" },
    ],
  },
  4: {
    keyframes: [
      kf(1, { terrain: "field", glory: 0.4, actors: [F(0.42, "man", "stand", "brown")] }),
      kf(9, { terrain: "hills", glory: 0.5, actors: [F(0.4, "man", "kneel", "white")] }),
      kf(14, { terrain: "mountain", glory: 0.8, props: [P("altar", 0.5, 1, 0.5)], actors: [F(0.45, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 8, reaction: "Resta um repouso para o povo de Deus. 🕊️" },
      { upTo: 13, god: "A palavra de Deus é viva e eficaz.", reaction: "Nada lhe é oculto; tudo está descoberto. 📖" },
      { upTo: 99, god: "Cheguemos com confiança ao trono da graça.", reaction: "Temos um grande Sumo Sacerdote nos céus. 👑" },
    ],
  },
  5: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.4, props: [P("altar", 0.4, 1.1, 0.7)], actors: [F(0.3, "man", "stand", "gold"), AN(0.66, "goat", 0.9)] }),
      kf(6, { terrain: "mountain", glory: 0.7, props: [P("altar", 0.5, 1, 0.6)], actors: [F(0.45, "man", "raise", "white")] }),
      kf(11, { terrain: "field", actors: [F(0.4, "child", "stand", "sand"), F(0.6, "elder", "stand", "brown")] }),
    ],
    beats: [
      { upTo: 4, reaction: "Todo sumo sacerdote é tomado dentre os homens. 🕯️" },
      { upTo: 10, god: "Tu és sacerdote para sempre, segundo Melquisedeque.", reaction: "Cristo, chamado por Deus, aprendeu a obediência. ✨" },
      { upTo: 99, reaction: "Já devíeis ser mestres; ainda precisais de leite. 🍼" },
    ],
  },
  6: {
    keyframes: [
      kf(1, { terrain: "field", glory: 0.4, actors: [F(0.42, "man", "stand", "brown")] }),
      kf(7, { terrain: "hills", rain: 0.4, props: [P("tree", 0.66)], actors: [F(0.4, "man", "raise", "brown")] }),
      kf(13, { terrain: "sea", glory: 0.6, props: [P("altar", 0.55, 0.9, 0.4)], actors: [F(0.4, "elder", "raise", "white")] }),
    ],
    beats: [
      { upTo: 6, reaction: "Avancemos rumo à perfeição na fé. 🌱" },
      { upTo: 12, reaction: "A terra que bebe a chuva produz fruto. 🌾" },
      { upTo: 99, god: "Certamente te abençoarei e te multiplicarei.", reaction: "Esperança firme e segura, âncora da alma. ⚓" },
    ],
  },
  7: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.5, props: [P("altar", 0.45, 1.1, 0.7)], actors: [F(0.3, "king", "raise", "white"), F(0.66, "man", "bow", "brown")] }),
      kf(11, { terrain: "mountain", glory: 0.6, props: [P("altar", 0.5, 1, 0.6)], actors: [F(0.45, "man", "stand", "gold")] }),
      kf(24, { terrain: "mountain", glory: 0.9, actors: [F(0.5, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 10, reaction: "Melquisedeque, rei de paz e sacerdote do Altíssimo. 👑" },
      { upTo: 22, god: "Tu és sacerdote para sempre.", reaction: "Sacerdócio eterno, superior ao de Levi. ✨" },
      { upTo: 99, reaction: "Cristo vive sempre para interceder por nós. 🙏" },
    ],
  },
  8: {
    keyframes: [
      kf(1, { terrain: "mountain", glory: 0.8, props: [P("tent", 0.5, 1.3)], actors: [F(0.45, "man", "stand", "white")] }),
      kf(6, { terrain: "mountain", glory: 0.6, props: [P("tablets", 0.5, 1.1)], actors: [F(0.4, "man", "raise", "white")] }),
      kf(8, { terrain: "mountain", glory: 0.7, props: [P("tablets", 0.4), P("altar", 0.66, 0.9, 0.5)], actors: [F(0.5, "elder", "raise", "white")] }),
    ],
    beats: [
      { upTo: 5, reaction: "Cristo serve no santuário verdadeiro dos céus. ⛺" },
      { upTo: 7, god: "Estabelecerei uma nova aliança com Israel.", reaction: "Uma aliança melhor, com melhores promessas. 📜" },
      { upTo: 99, god: "Porei minhas leis na mente e no coração deles.", reaction: "A antiga envelhece; surge a nova. ✨" },
    ],
  },
  9: {
    keyframes: [
      kf(1, { terrain: "desert", props: [P("tent", 0.5, 1.4), P("arkCovenant", 0.5, 0.7), P("lampstand", 0.72, 0.9, 1)], actors: [F(0.3, "man", "stand", "gold")] }),
      kf(11, { terrain: "mountain", glory: 0.8, props: [P("tent", 0.5, 1.3)], actors: [F(0.45, "man", "raise", "white")] }),
      kf(19, { terrain: "desert", blood: 0.4, props: [P("altar", 0.45, 1.1, 0.6), P("ram", 0.7, 0.9)], actors: [F(0.32, "man", "stand", "gold")] }),
      kf(24, { terrain: "mountain", glory: 0.95, props: [P("arkCovenant", 0.5, 1)], actors: [F(0.5, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 10, reaction: "O tabernáculo terreno: arca, candelabro e altar. 📦🕎" },
      { upTo: 18, god: undefined, reaction: "Cristo entrou no santuário celestial com seu sangue. ✨" },
      { upTo: 22, god: "Sem derramamento de sangue não há remissão.", reaction: "Tudo se purifica pelo sangue. 🩸" },
      { upTo: 99, reaction: "Cristo se ofereceu uma vez, por todos. 🕊️" },
    ],
  },
  10: {
    keyframes: [
      kf(1, { terrain: "desert", props: [P("altar", 0.45, 1.1, 0.8), P("ram", 0.7, 0.9)], actors: [F(0.3, "man", "stand", "gold"), AN(0.62, "goat", 0.9)] }),
      kf(10, { terrain: "mountain", glory: 0.8, actors: [F(0.45, "man", "raise", "white")] }),
      kf(19, { terrain: "mountain", glory: 0.7, props: [P("altar", 0.5, 1, 0.5)], actors: [F(0.4, "man", "kneel", "brown")] }),
      kf(32, { terrain: "city", night: 0.3, crowd: 0.4, actors: [F(0.4, "man", "stand", "brown"), F(0.6, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 9, reaction: "O sangue de touros não tira pecados. 🐂" },
      { upTo: 18, god: "Eis que venho para fazer a tua vontade.", reaction: "Um só sacrifício, para sempre. ✨" },
      { upTo: 25, god: undefined, reaction: "Cheguemos com coração sincero; não deixemos de nos reunir. 🤝" },
      { upTo: 99, god: "O justo viverá pela fé.", reaction: "Perseverai; não retrocedei. 🔥" },
    ],
  },
  11: {
    keyframes: [
      kf(1, { terrain: "field", glory: 0.5, props: [P("altar", 0.5, 0.9, 0.5)], actors: [F(0.4, "man", "kneel", "brown")] }),
      kf(7, { terrain: "sea", storm: 0.4, rain: 0.4, props: [P("ark", 0.5, 1.3)], actors: [F(0.32, "elder", "stand", "brown")] }),
      kf(8, { terrain: "desert", glory: 0.4, props: [P("tent", 0.7)], actors: [F(0.35, "elder", "walk", "sand"), AN(0.7, "camel", 0.9)] }),
      kf(30, { terrain: "city", glory: 0.6, crowd: 0.5, props: [P("tower", 0.72, 1.2)], actors: [F(0.3, "warrior", "raise", "brown"), F(0.5, "warrior", "fight", "sand", { facing: 1 })] }),
    ],
    beats: [
      { upTo: 6, reaction: "A fé é a certeza do que se espera. 🌟" },
      { upTo: 7, god: undefined, reaction: "Pela fé Noé preparou a arca. 🚢" },
      { upTo: 22, reaction: "Pela fé Abraão partiu para a terra prometida. 🐪" },
      { upTo: 99, reaction: "Pela fé caíram os muros de Jericó — heróis da fé! 🏰" },
    ],
  },
  12: {
    keyframes: [
      kf(1, { terrain: "plain", crowd: 0.7, glory: 0.4, actors: [F(0.35, "man", "walk", "white", { facing: 1 }), F(0.55, "man", "walk", "brown", { facing: 1 })] }),
      kf(2, { terrain: "hills", glory: 0.7, props: [P("cross", 0.6, 1.1)], actors: [F(0.35, "man", "walk", "white", { facing: 1 })] }),
      kf(18, { terrain: "mountain", storm: 0.5, fire: 0.4, glory: 0.5, props: [P("smoke", 0.5, 2)], actors: [F(0.4, "man", "bow", "brown")] }),
      kf(22, { terrain: "mountain", glory: 0.95, crowd: 0.6, actors: [F(0.45, "man", "raise", "white"), F(0.24, "angel", "raise", "white"), F(0.74, "angel", "raise", "gold")] }),
    ],
    beats: [
      { upTo: 3, god: undefined, reaction: "Corramos com paciência a carreira proposta. 🏃" },
      { upTo: 11, reaction: "Olhemos para Jesus, autor e consumador da fé. ✨" },
      { upTo: 21, reaction: "Não viestes ao monte que ardia em fogo. 🔥" },
      { upTo: 99, reaction: "Chegastes ao monte Sião, cidade do Deus vivo. 🌟" },
    ],
  },
  13: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.4, actors: [F(0.35, "man", "stand", "brown"), F(0.55, "man", "carry", "sand"), F(0.72, "elder", "stand", "white")] }),
      kf(10, { terrain: "hills", glory: 0.5, props: [P("altar", 0.5, 1, 0.5), P("cross", 0.72, 1)], actors: [F(0.35, "man", "raise", "white")] }),
      kf(20, { terrain: "field", glory: 0.7, actors: [F(0.42, "shepherd", "raise", "white"), AN(0.66, "sheep"), AN(0.8, "sheep")] }),
    ],
    beats: [
      { upTo: 6, reaction: "Permaneça o amor fraternal; hospedai estranhos. 🤝" },
      { upTo: 16, god: "Não te deixarei, nem te desampararei.", reaction: "Jesus Cristo é o mesmo, ontem, hoje e sempre. ✨" },
      { upTo: 99, god: "O Deus de paz vos aperfeiçoe em todo o bem.", reaction: "O grande Pastor das ovelhas conduz seu povo. 🐑" },
    ],
  },
};
