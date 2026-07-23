// ============================================================================
// Roteiros de cena (Living Scene v2) — CANTARES, capítulo por capítulo.
// Poesia de amor entre o amado e a amada: jardins e vinhas, a primavera que
// desperta, pombas e lírios, a busca pelo amado na cidade à noite e os montes
// perfumados. Tom terno e casto. Puramente visual/narrativo — não toca em
// progresso. Segue o padrão de Êxodo (rpgExodusScenes).
// ============================================================================

import type { ChapterScript, V2Actor, V2Prop, SceneState } from "@/lib/rpgLivingV2";

const F = (x: number, role: V2Actor["role"], action: V2Actor["action"], palette?: V2Actor["palette"], extra: Partial<V2Actor> = {}): V2Actor => ({ x, role, action, palette, ...extra });
const AN = (x: number, animal: NonNullable<V2Actor["animal"]>, scale = 1, color?: string): V2Actor => ({ x, kind: "animal", animal, scale, color });
const P = (kind: string, x: number, scale = 1, fire?: number): V2Prop => ({ kind, x, scale, ...(fire != null ? { fire } : {}) });
const kf = (v: number, state: SceneState) => ({ v, state });

export const SONG_SCENES: Record<number, ChapterScript> = {
  1: {
    keyframes: [
      kf(1, { terrain: "garden", glory: 0.2, props: [P("tree", 0.2), P("dove", 0.8, 0.8)], actors: [F(0.42, "woman", "stand", "purple"), F(0.6, "man", "stand", "gold")] }),
      kf(5, { terrain: "field", props: [P("tent", 0.24), P("tent", 0.8, 0.9)], actors: [F(0.44, "woman", "stand", "brown")] }),
      kf(7, { terrain: "hills", props: [P("tree", 0.82)], actors: [F(0.38, "man", "stand", "gold"), AN(0.62, "sheep"), AN(0.76, "sheep"), AN(0.9, "goat", 0.8)] }),
      kf(15, { terrain: "garden", glory: 0.3, props: [P("tree", 0.28, 1.2), P("dove", 0.7, 0.7)], actors: [F(0.44, "woman", "stand", "green"), F(0.6, "man", "stand", "gold")] }),
    ],
    beats: [
      { upTo: 4, reaction: "'Leva-me contigo!' — o teu amor é melhor que o vinho. 🍇" },
      { upTo: 6, reaction: "'Morena sou, mas formosa', guardei as vinhas. 🍇" },
      { upTo: 8, reaction: "'Onde apascentas o teu rebanho ao meio-dia?' 🐑" },
      { upTo: 99, reaction: "'Como és formosa!' As traves são de cedro. 🌿" },
    ],
  },
  2: {
    keyframes: [
      kf(1, { terrain: "garden", glory: 0.3, props: [P("tree", 0.24, 1.2), P("tree", 0.78)], actors: [F(0.5, "woman", "stand", "white")] }),
      kf(8, { terrain: "hills", props: [P("tree", 0.8)], actors: [F(0.34, "man", "walk", "gold"), AN(0.66, "goat", 0.8)] }),
      kf(10, { terrain: "field", glory: 0.35, props: [P("tree", 0.2, 1.2), P("dove", 0.72, 0.8), P("dove", 0.86, 0.6)], actors: [F(0.44, "woman", "raise", "green"), F(0.6, "man", "stand", "gold")] }),
      kf(15, { terrain: "garden", glory: 0.3, props: [P("tree", 0.3, 1.3), P("dove", 0.78, 0.7)], actors: [F(0.5, "woman", "stand", "purple")] }),
    ],
    beats: [
      { upTo: 7, reaction: "'Sou a rosa de Sarom, o lírio dos vales.' 🌸" },
      { upTo: 9, reaction: "O amado vem saltando pelos montes, como uma gazela. 🦌" },
      { upTo: 13, reaction: "'Levanta-te! O inverno passou, a primavera chegou.' 🌷" },
      { upTo: 99, reaction: "A voz da rola já se ouve na terra. 🕊️ 'O meu amado é meu.'" },
    ],
  },
  3: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.7, actors: [F(0.5, "woman", "lie", "blue")] }),
      kf(2, { terrain: "city", night: 0.6, actors: [F(0.4, "woman", "walk", "blue"), F(0.7, "warrior", "stand", "gray")] }),
      kf(4, { terrain: "garden", night: 0.4, glory: 0.25, props: [P("tree", 0.24), P("dove", 0.8, 0.7)], actors: [F(0.44, "woman", "stand", "purple"), F(0.6, "man", "stand", "gold")] }),
      kf(6, { terrain: "field", crowd: 0.4, props: [P("palm", 0.2), P("palm", 0.82)], actors: [F(0.5, "king", "stand", "gold")] }),
    ],
    beats: [
      { upTo: 1, reaction: "De noite, no leito, buscava a quem a alma amava. 🌙" },
      { upTo: 3, reaction: "Percorre a cidade; os guardas a encontram. 🏙️" },
      { upTo: 5, reaction: "'Achei o amado da minha alma!' — e não o deixei ir. 💗" },
      { upTo: 99, reaction: "Do deserto sobe o cortejo de Salomão. 👑" },
    ],
  },
  4: {
    keyframes: [
      kf(1, { terrain: "hills", glory: 0.3, props: [P("dove", 0.7, 0.8)], actors: [F(0.42, "man", "stand", "gold"), F(0.6, "woman", "stand", "white")] }),
      kf(2, { terrain: "hills", props: [P("tree", 0.84)], actors: [AN(0.3, "goat", 0.8), AN(0.46, "goat", 0.8), AN(0.66, "sheep"), AN(0.82, "sheep")] }),
      kf(8, { terrain: "mountain", glory: 0.4, actors: [F(0.4, "man", "raise", "gold"), F(0.58, "woman", "stand", "purple")] }),
      kf(12, { terrain: "garden", glory: 0.4, props: [P("tree", 0.22, 1.3), P("well", 0.5), P("tree", 0.8), P("dove", 0.7, 0.6)], actors: [F(0.4, "woman", "stand", "green")] }),
    ],
    beats: [
      { upTo: 1, reaction: "'Como és formosa! Teus olhos são como pombas.' 🕊️" },
      { upTo: 7, reaction: "'És toda formosa, amada minha, sem defeito algum.' ✨" },
      { upTo: 11, reaction: "'Vem comigo do Líbano, do alto dos montes.' ⛰️" },
      { upTo: 99, reaction: "'És jardim fechado, fonte selada.' 💧🌿" },
    ],
  },
  5: {
    keyframes: [
      kf(1, { terrain: "garden", glory: 0.35, props: [P("tree", 0.24, 1.2), P("palm", 0.8)], actors: [F(0.4, "man", "stand", "gold"), F(0.58, "woman", "stand", "purple")] }),
      kf(2, { terrain: "city", night: 0.75, actors: [F(0.5, "woman", "lie", "blue")] }),
      kf(6, { terrain: "city", night: 0.6, actors: [F(0.4, "woman", "mourn", "blue"), F(0.72, "warrior", "stand", "gray")] }),
      kf(10, { terrain: "field", night: 0.35, glory: 0.2, actors: [F(0.4, "woman", "stand", "purple"), F(0.6, "woman", "stand", "white")] }),
    ],
    beats: [
      { upTo: 1, reaction: "'Entrei no meu jardim, minha irmã, minha esposa.' 🌿" },
      { upTo: 5, reaction: "Ela dorme, mas o coração vela; o amado bate à porta. 🚪" },
      { upTo: 8, reaction: "Ela abre — e ele já se fora. Os guardas a ferem. 😢" },
      { upTo: 99, reaction: "'O meu amado é alvo e corado, entre dez mil.' 💗" },
    ],
  },
  6: {
    keyframes: [
      kf(1, { terrain: "field", glory: 0.25, actors: [F(0.4, "woman", "stand", "white"), F(0.58, "woman", "stand", "sand")] }),
      kf(2, { terrain: "garden", glory: 0.4, props: [P("tree", 0.22, 1.2), P("well", 0.52), P("dove", 0.78, 0.7)], actors: [F(0.4, "man", "stand", "gold"), F(0.58, "woman", "stand", "green")] }),
      kf(5, { terrain: "hills", props: [P("tree", 0.82)], actors: [AN(0.3, "goat", 0.8), AN(0.5, "sheep"), AN(0.7, "sheep")] }),
      kf(10, { terrain: "garden", glory: 0.35, props: [P("dove", 0.7, 0.8), P("tree", 0.24)], actors: [F(0.5, "woman", "stand", "purple")] }),
    ],
    beats: [
      { upTo: 1, reaction: "'Para onde foi o teu amado, ó mais formosa?' 🌸" },
      { upTo: 3, reaction: "'Eu sou do meu amado, e o meu amado é meu.' 💗" },
      { upTo: 9, reaction: "'Formosa como a lua, brilhante como o sol.' 🌙☀️" },
      { upTo: 99, reaction: "Entre as vinhas e as flores, o amor floresce. 🍇" },
    ],
  },
  7: {
    keyframes: [
      kf(1, { terrain: "garden", glory: 0.3, props: [P("palm", 0.22, 1.3), P("dove", 0.78, 0.7)], actors: [F(0.42, "man", "stand", "gold"), F(0.6, "woman", "stand", "purple")] }),
      kf(8, { terrain: "field", props: [P("palm", 0.24, 1.2), P("tree", 0.82)], actors: [F(0.5, "woman", "raise", "green")] }),
      kf(11, { terrain: "field", glory: 0.35, props: [P("tree", 0.2, 1.2), P("tree", 0.72)], actors: [F(0.4, "man", "walk", "gold"), F(0.58, "woman", "walk", "green")] }),
    ],
    beats: [
      { upTo: 7, reaction: "'Que formosa és, amor, em delícias!' — talhe de palmeira. 🌴" },
      { upTo: 10, reaction: "'Eu sou do meu amado, e ele deseja o meu amor.' 💗" },
      { upTo: 99, reaction: "'Vem, saiamos ao campo, vejamos se florescem as vides.' 🍇" },
    ],
  },
  8: {
    keyframes: [
      kf(1, { terrain: "field", glory: 0.3, props: [P("tree", 0.22)], actors: [F(0.42, "woman", "stand", "purple"), F(0.6, "man", "stand", "gold")] }),
      kf(6, { terrain: "garden", glory: 0.5, props: [P("tree", 0.24, 1.2), P("dove", 0.76, 0.7)], actors: [F(0.44, "woman", "raise", "white"), F(0.6, "man", "stand", "gold")] }),
      kf(11, { terrain: "hills", props: [P("tree", 0.2), P("tree", 0.5), P("tree", 0.8)], actors: [F(0.4, "man", "stand", "gold")] }),
      kf(14, { terrain: "mountain", glory: 0.45, actors: [F(0.4, "man", "walk", "gold"), F(0.58, "woman", "raise", "purple")] }),
    ],
    beats: [
      { upTo: 5, reaction: "Do deserto ela sobe, apoiada no seu amado. 🌿" },
      { upTo: 7, reaction: "'O amor é forte como a morte; muitas águas não o apagam.' 💗🔥" },
      { upTo: 12, reaction: "'Minha vinha está diante de mim.' 🍇" },
      { upTo: 99, reaction: "'Foge, amado meu, aos montes dos aromas!' ⛰️✨" },
    ],
  },
};
