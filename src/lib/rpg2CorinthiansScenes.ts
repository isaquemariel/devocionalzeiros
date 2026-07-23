// ============================================================================
// Roteiros de cena (Living Scene v2) — 2 CORÍNTIOS, capítulo por capítulo.
// Carta de Paulo aos coríntios: o Deus de toda consolação na tribulação, o
// tesouro em vasos de barro, o ministério da reconciliação, a generosidade
// da coleta, o espinho na carne e "a minha graça te basta".
// Puramente visual/narrativo — não toca em progresso. Segue o padrão de Êxodo.
// ============================================================================

import type { ChapterScript, V2Actor, V2Prop, SceneState } from "@/lib/rpgLivingV2";

const F = (x: number, role: V2Actor["role"], action: V2Actor["action"], palette?: V2Actor["palette"], extra: Partial<V2Actor> = {}): V2Actor => ({ x, role, action, palette, ...extra });
const AN = (x: number, animal: NonNullable<V2Actor["animal"]>, scale = 1, color?: string): V2Actor => ({ x, kind: "animal", animal, scale, color });
const P = (kind: string, x: number, scale = 1, fire?: number): V2Prop => ({ kind, x, scale, ...(fire != null ? { fire } : {}) });
const kf = (v: number, state: SceneState) => ({ v, state });

export const CORINTHIANS2_SCENES: Record<number, ChapterScript> = {
  1: {
    keyframes: [
      kf(1, { terrain: "city", props: [P("tower", 0.82, 0.9)], actors: [F(0.4, "man", "stand", "white"), F(0.62, "man", "stand", "sand")] }),
      kf(3, { terrain: "sea", storm: 0.6, night: 0.3, actors: [F(0.45, "man", "mourn", "white")] }),
      kf(8, { terrain: "sea", storm: 0.4, rain: 0.3, actors: [F(0.42, "man", "kneel", "white")] }),
      kf(20, { terrain: "city", glory: 0.5, actors: [F(0.44, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 2, reaction: "Paulo saúda a igreja de Corinto e os santos da Acaia. ✉️" },
      { upTo: 7, reaction: "Bendito o Deus de toda consolação, que nos conforta na tribulação. 🤍" },
      { upTo: 11, reaction: "Na Ásia foram oprimidos além das forças — mas Deus os livrou. 🌊" },
      { upTo: 99, reaction: "Todas as promessas de Deus são 'sim' e 'amém' nele. ✨" },
    ],
  },
  2: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.3, actors: [F(0.45, "man", "mourn", "white")] }),
      kf(6, { terrain: "city", actors: [F(0.4, "man", "raise", "white"), F(0.64, "man", "stand", "sand")] }),
      kf(14, { terrain: "plain", glory: 0.5, props: [P("smoke", 0.6, 1.4)], actors: [F(0.42, "man", "walk", "white")] }),
    ],
    beats: [
      { upTo: 5, reaction: "Escrevi entre lágrimas — não para entristecer, mas por amor. 😢" },
      { upTo: 11, reaction: "Perdoai e consolai o que caiu, para que Satanás não vença. 🤝" },
      { upTo: 99, reaction: "Graças a Deus, que nos leva em triunfo com o aroma de Cristo. 🌫️" },
    ],
  },
  3: {
    keyframes: [
      kf(1, { terrain: "city", props: [P("tablets", 0.6, 1)], actors: [F(0.4, "man", "stand", "white")] }),
      kf(3, { terrain: "city", glory: 0.4, actors: [F(0.42, "man", "raise", "white"), F(0.66, "man", "stand", "sand")] }),
      kf(7, { terrain: "mountain", glory: 0.7, props: [P("tablets", 0.55, 1.1)], actors: [F(0.44, "man", "bow", "white")] }),
      kf(18, { terrain: "mountain", glory: 0.9, actors: [F(0.45, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 3, reaction: "Sois carta de Cristo, escrita não com tinta, mas com o Espírito. 📜" },
      { upTo: 6, reaction: "Ministros de uma nova aliança: a letra mata, o Espírito vivifica. ✨" },
      { upTo: 11, reaction: "Se o que perece teve glória, muito mais a que permanece. 🌟" },
      { upTo: 99, reaction: "De face descoberta, somos transformados de glória em glória. 😇" },
    ],
  },
  4: {
    keyframes: [
      kf(1, { terrain: "plain", glory: 0.4, actors: [F(0.42, "man", "stand", "white")] }),
      kf(7, { terrain: "plain", props: [P("basket", 0.58, 0.9)], actors: [F(0.4, "man", "kneel", "white")] }),
      kf(8, { terrain: "desert", storm: 0.4, night: 0.3, actors: [F(0.44, "man", "mourn", "white")] }),
      kf(16, { terrain: "plain", glory: 0.8, actors: [F(0.44, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 6, reaction: "Deus fez brilhar a luz de Cristo em nossos corações. 💡" },
      { upTo: 7, reaction: "Temos este tesouro em vasos de barro — a força é de Deus. 🏺" },
      { upTo: 12, reaction: "Atribulados, mas não angustiados; abatidos, mas não destruídos. 🤍" },
      { upTo: 99, reaction: "O que se vê é passageiro; o que não se vê é eterno. ✨" },
    ],
  },
  5: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.6, props: [P("tower", 0.8, 1)], actors: [F(0.42, "man", "raise", "white")] }),
      kf(10, { terrain: "plain", glory: 0.5, actors: [F(0.44, "man", "stand", "white")] }),
      kf(17, { terrain: "garden", glory: 0.6, actors: [F(0.4, "man", "raise", "white"), F(0.64, "man", "stand", "sand")] }),
      kf(20, { terrain: "city", glory: 0.5, actors: [F(0.42, "man", "raise", "white"), F(0.66, "man", "kneel", "brown")] }),
    ],
    beats: [
      { upTo: 5, reaction: "Temos de Deus um edifício eterno, casa não feita por mãos. 🏛️" },
      { upTo: 10, reaction: "Andamos por fé, e não por vista. 👣" },
      { upTo: 17, reaction: "Se alguém está em Cristo, é nova criatura! 🌱" },
      { upTo: 99, reaction: "Deus nos deu o ministério da reconciliação. 🤝" },
    ],
  },
  6: {
    keyframes: [
      kf(1, { terrain: "plain", glory: 0.4, actors: [F(0.42, "man", "raise", "white")] }),
      kf(4, { terrain: "desert", storm: 0.4, actors: [F(0.44, "man", "stand", "white")] }),
      kf(14, { terrain: "field", glory: 0.5, actors: [F(0.4, "man", "stand", "white"), F(0.66, "man", "stand", "sand")] }),
    ],
    beats: [
      { upTo: 2, reaction: "Eis agora o tempo aceitável, o dia da salvação! ⏳" },
      { upTo: 10, reaction: "Como pobres, mas enriquecendo a muitos; tristes, mas sempre alegres. 🤍" },
      { upTo: 99, reaction: "Vós sois o templo do Deus vivo — saí do meio deles. ⛪" },
    ],
  },
  7: {
    keyframes: [
      kf(1, { terrain: "city", actors: [F(0.42, "man", "stand", "white")] }),
      kf(5, { terrain: "sea", storm: 0.4, night: 0.2, actors: [F(0.44, "man", "mourn", "white")] }),
      kf(6, { terrain: "city", glory: 0.5, actors: [F(0.38, "man", "raise", "white"), F(0.62, "man", "walk", "sand")] }),
      kf(9, { terrain: "city", glory: 0.6, actors: [F(0.44, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 4, reaction: "Grande é a minha confiança em vós; transbordo de alegria. 🤍" },
      { upTo: 7, reaction: "Deus nos consolou com a chegada de Tito. 🤝" },
      { upTo: 11, reaction: "A tristeza segundo Deus produz arrependimento para a salvação. 💧" },
      { upTo: 99, reaction: "Alegro-me por confiar em vós em tudo. ✨" },
    ],
  },
  8: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.5, actors: [F(0.4, "man", "carry", "sand"), F(0.62, "man", "carry", "brown")] }),
      kf(9, { terrain: "plain", glory: 0.5, actors: [F(0.44, "man", "raise", "white")] }),
      kf(16, { terrain: "city", crowd: 0.4, props: [P("basket", 0.5, 1)], actors: [F(0.4, "man", "carry", "sand"), F(0.66, "man", "stand", "white")] }),
    ],
    beats: [
      { upTo: 5, reaction: "As igrejas da Macedônia deram além das forças, com alegria. 🎁" },
      { upTo: 9, reaction: "Cristo, sendo rico, se fez pobre para vos enriquecer. 🤍" },
      { upTo: 99, reaction: "Que a boa vontade se complete na coleta para os santos. 🧺" },
    ],
  },
  9: {
    keyframes: [
      kf(1, { terrain: "field", actors: [F(0.42, "man", "stand", "white")] }),
      kf(6, { terrain: "field", glory: 0.4, actors: [F(0.4, "man", "carry", "sand"), AN(0.7, "ox", 0.9)] }),
      kf(10, { terrain: "field", glory: 0.6, actors: [F(0.44, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 5, reaction: "Preparai a vossa bênção com antecedência, não por avareza. 🌾" },
      { upTo: 8, reaction: "Deus ama a quem dá com alegria; quem semeia farto, colhe farto. 🌻" },
      { upTo: 99, reaction: "Graças a Deus pelo seu dom inefável! ✨" },
    ],
  },
  10: {
    keyframes: [
      kf(1, { terrain: "city", props: [P("tower", 0.8, 1.1)], actors: [F(0.42, "man", "stand", "white")] }),
      kf(3, { terrain: "hills", storm: 0.3, actors: [F(0.4, "warrior", "fight", "white", { facing: 1 }), F(0.72, "warrior", "fight", "red", { facing: -1 })] }),
      kf(17, { terrain: "city", glory: 0.5, actors: [F(0.44, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 6, reaction: "Nossas armas não são carnais, mas poderosas em Deus. ⚔️" },
      { upTo: 11, reaction: "Derrubamos raciocínios e toda altivez contra o conhecimento de Deus. 🛡️" },
      { upTo: 99, reaction: "Quem se gloria, glorie-se no Senhor. 🌟" },
    ],
  },
  11: {
    keyframes: [
      kf(1, { terrain: "city", actors: [F(0.42, "man", "stand", "white")] }),
      kf(23, { terrain: "sea", storm: 0.7, night: 0.4, props: [P("boat", 0.6, 0.9)], actors: [F(0.42, "man", "mourn", "white")] }),
      kf(25, { terrain: "sea", storm: 0.5, rain: 0.4, actors: [F(0.44, "man", "kneel", "white")] }),
      kf(32, { terrain: "city", night: 0.3, props: [P("tower", 0.75, 1.1)], actors: [F(0.4, "man", "walk", "white")] }),
    ],
    beats: [
      { upTo: 6, reaction: "Tenho zelo por vós, como uma virgem pura para Cristo. 🤍" },
      { upTo: 22, reaction: "Falsos apóstolos se disfarçam — Satanás em anjo de luz. ⚠️" },
      { upTo: 28, reaction: "Naufrágios, açoites, perigos — o fardo de todas as igrejas. 🌊" },
      { upTo: 99, reaction: "Escapei de Damasco descido por um cesto pela muralha. 🧺" },
    ],
  },
  12: {
    keyframes: [
      kf(1, { terrain: "mountain", glory: 0.9, actors: [F(0.44, "man", "kneel", "white")] }),
      kf(7, { terrain: "mountain", glory: 0.4, props: [P("bush", 0.6, 0.9)], actors: [F(0.44, "man", "mourn", "white")] }),
      kf(9, { terrain: "mountain", glory: 0.8, actors: [F(0.44, "man", "raise", "white")] }),
      kf(14, { terrain: "city", glory: 0.5, actors: [F(0.42, "man", "stand", "white"), F(0.66, "man", "stand", "sand")] }),
    ],
    beats: [
      { upTo: 6, reaction: "Arrebatado ao terceiro céu, ouviu palavras inefáveis. 🌟" },
      { upTo: 7, reaction: "Foi-lhe dado um espinho na carne, para que não se ensoberbecesse. 🌵" },
      { upTo: 10, god: "A minha graça te basta, pois a força se aperfeiçoa na fraqueza.", reaction: "Quando sou fraco, então sou forte. ✨" },
      { upTo: 99, reaction: "De boa vontade me gastarei pelas vossas almas. 🤍" },
    ],
  },
  13: {
    keyframes: [
      kf(1, { terrain: "city", actors: [F(0.42, "man", "stand", "white"), F(0.66, "man", "stand", "sand")] }),
      kf(5, { terrain: "city", glory: 0.4, props: [P("tablets", 0.62, 0.9)], actors: [F(0.44, "man", "kneel", "white")] }),
      kf(11, { terrain: "city", glory: 0.7, actors: [F(0.44, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 4, reaction: "Por dois ou três testemunhos se firmará toda palavra. 📖" },
      { upTo: 9, reaction: "Examinai-vos: será que Cristo está em vós? 🔍" },
      { upTo: 99, reaction: "A graça, o amor e a comunhão do Espírito com todos vós. Amém! 🤍" },
    ],
  },
};
