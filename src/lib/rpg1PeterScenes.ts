// ============================================================================
// Roteiros de cena (Living Scene v2) — 1 PEDRO, capítulo por capítulo.
// Carta aos peregrinos sofredores: esperança viva pela ressurreição, o ouro
// provado no fogo, a pedra viva e o sacerdócio real, suportar o sofrimento
// como Cristo, lançar sobre Ele a ansiedade e o Pastor supremo da glória.
// Puramente visual/narrativo — não toca em progresso.
// ============================================================================

import type { ChapterScript, V2Actor, V2Prop, SceneState } from "@/lib/rpgLivingV2";

const F = (x: number, role: V2Actor["role"], action: V2Actor["action"], palette?: V2Actor["palette"], extra: Partial<V2Actor> = {}): V2Actor => ({ x, role, action, palette, ...extra });
const AN = (x: number, animal: NonNullable<V2Actor["animal"]>, scale = 1, color?: string): V2Actor => ({ x, kind: "animal", animal, scale, color });
const P = (kind: string, x: number, scale = 1, fire?: number): V2Prop => ({ kind, x, scale, ...(fire != null ? { fire } : {}) });
const kf = (v: number, state: SceneState) => ({ v, state });

export const PETER1_SCENES: Record<number, ChapterScript> = {
  1: {
    keyframes: [
      kf(1, { terrain: "hills", crowd: 0.4, actors: [F(0.3, "elder", "stand", "white"), F(0.55, "man", "walk", "brown"), F(0.72, "woman", "walk", "sand")] }),
      kf(3, { terrain: "garden", glory: 0.7, props: [P("tomb", 0.55, 1.2)], actors: [F(0.35, "man", "raise", "white")] }),
      kf(6, { terrain: "field", fire: 0.6, glory: 0.3, props: [P("altar", 0.6, 0.9, 0.9)], actors: [F(0.38, "man", "kneel", "brown")] }),
      kf(18, { terrain: "hills", glory: 0.5, props: [P("altar", 0.55, 1, 0.6)], actors: [F(0.4, "man", "bow", "white"), AN(0.66, "sheep")] }),
    ],
    beats: [
      { upTo: 2, reaction: "Pedro escreve aos eleitos, peregrinos da dispersão. ✉️" },
      { upTo: 5, god: undefined, reaction: "Bendito Deus: renascidos para uma esperança viva pela ressurreição! ✨" },
      { upTo: 12, reaction: "A fé provada no fogo, mais preciosa que o ouro. 🔥" },
      { upTo: 99, god: "Sede santos, porque eu sou santo.", reaction: "Resgatados pelo sangue do Cordeiro sem defeito. 🩸" },
    ],
  },
  2: {
    keyframes: [
      kf(1, { terrain: "city", actors: [F(0.4, "child", "stand", "white"), F(0.6, "woman", "carry", "sand")] }),
      kf(4, { terrain: "city", glory: 0.5, props: [P("tower", 0.5, 1.3)], actors: [F(0.34, "man", "raise", "brown"), F(0.62, "man", "stand", "white")] }),
      kf(9, { terrain: "city", glory: 0.55, props: [P("altar", 0.5, 1, 0.7), P("lampstand", 0.72, 1, 1)], actors: [F(0.34, "man", "bow", "purple"), F(0.6, "man", "bow", "white")] }),
      kf(21, { terrain: "hills", night: 0.3, props: [P("cross", 0.6, 1.1)], actors: [F(0.4, "man", "mourn", "white")] }),
    ],
    beats: [
      { upTo: 3, reaction: "Como recém-nascidos, desejai o leite espiritual. 🍼" },
      { upTo: 8, reaction: "Chegai-vos a Ele, a Pedra viva rejeitada pelos homens. 🪨" },
      { upTo: 12, god: undefined, reaction: "Vós sois sacerdócio real, nação santa, povo de propriedade de Deus. 👑" },
      { upTo: 99, reaction: "Cristo sofreu por vós, deixando-vos o exemplo. ✝️" },
    ],
  },
  3: {
    keyframes: [
      kf(1, { terrain: "city", actors: [F(0.38, "woman", "stand", "white"), F(0.58, "man", "stand", "brown")] }),
      kf(8, { terrain: "field", actors: [F(0.35, "man", "kneel", "brown"), F(0.55, "woman", "kneel", "sand"), F(0.72, "elder", "raise", "white")] }),
      kf(18, { terrain: "hills", night: 0.35, props: [P("cross", 0.55, 1.1)], actors: [F(0.4, "man", "mourn", "white")] }),
      kf(20, { terrain: "sea", flood: 0.6, props: [P("boat", 0.55, 1.1)], actors: [F(0.4, "elder", "stand", "brown")] }),
    ],
    beats: [
      { upTo: 7, reaction: "Esposas e maridos: adorno do coração e honra mútua. 🤍" },
      { upTo: 12, god: undefined, reaction: "Os olhos do Senhor estão sobre os justos. 👁️" },
      { upTo: 17, reaction: "Bem-aventurados os que sofrem por fazer o bem. 🙏" },
      { upTo: 99, reaction: "Cristo morreu uma vez pelos pecados — como Noé, salvos pela água. 🌊" },
    ],
  },
  4: {
    keyframes: [
      kf(1, { terrain: "hills", actors: [F(0.4, "man", "stand", "brown"), F(0.6, "man", "walk", "sand")] }),
      kf(8, { terrain: "city", glory: 0.35, props: [P("well", 0.62)], actors: [F(0.34, "woman", "carry", "purple"), F(0.58, "man", "carry", "brown"), F(0.76, "servant", "kneel", "sand")] }),
      kf(12, { terrain: "field", fire: 0.8, glory: 0.4, props: [P("altar", 0.55, 1, 1)], actors: [F(0.4, "man", "mourn", "brown")] }),
      kf(13, { terrain: "field", glory: 0.7, fire: 0.3, props: [P("altar", 0.55, 1, 0.4)], actors: [F(0.42, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 6, reaction: "Viver o resto da vida segundo a vontade de Deus. ⏳" },
      { upTo: 11, god: undefined, reaction: "O amor cobre multidão de pecados; servi com os dons recebidos. 🤝" },
      { upTo: 16, reaction: "Não estranheis o fogo ardente que vem provar-vos. 🔥" },
      { upTo: 99, reaction: "Alegrai-vos por participar dos sofrimentos de Cristo — a glória se revelará. ✨" },
    ],
  },
  5: {
    keyframes: [
      kf(1, { terrain: "hills", glory: 0.35, actors: [F(0.3, "elder", "stand", "white"), F(0.52, "shepherd", "raise", "brown"), AN(0.72, "sheep"), AN(0.85, "sheep")] }),
      kf(6, { terrain: "mountain", glory: 0.5, actors: [F(0.45, "man", "kneel", "brown")] }),
      kf(8, { terrain: "desert", night: 0.75, actors: [F(0.36, "man", "stand", "white"), AN(0.68, "lion", 1.1)] }),
      kf(10, { terrain: "hills", glory: 0.85, actors: [F(0.34, "shepherd", "stand", "white"), AN(0.58, "sheep"), AN(0.72, "sheep"), AN(0.86, "sheep")] }),
    ],
    beats: [
      { upTo: 4, god: undefined, reaction: "Pastoreai o rebanho de Deus; o Pastor supremo dará a coroa da glória. 👑" },
      { upTo: 7, god: "Lançai sobre Ele toda a vossa ansiedade, porque Ele tem cuidado de vós.", reaction: "Humilhai-vos sob a poderosa mão de Deus. 🤲" },
      { upTo: 9, reaction: "Sede sóbrios: o adversário anda como leão que ruge. 🦁" },
      { upTo: 99, reaction: "O Deus de toda graça vos aperfeiçoará. A paz a todos! 🕊️" },
    ],
  },
};
