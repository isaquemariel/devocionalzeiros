// ============================================================================
// Roteiros de cena (Living Scene v2) — 2 TESSALONICENSES, capítulo por capítulo.
// Carta de Paulo: firmeza na perseguição e o juízo do Senhor que virá em chamas
// de fogo com os seus anjos; o homem da iniquidade que se manifesta antes do fim;
// e a exortação ao trabalho e à firmeza na fé. Puramente visual/narrativo.
// Segue o padrão de Êxodo (rpgExodusScenes).
// ============================================================================

import type { ChapterScript, V2Actor, V2Prop, SceneState } from "@/lib/rpgLivingV2";

const F = (x: number, role: V2Actor["role"], action: V2Actor["action"], palette?: V2Actor["palette"], extra: Partial<V2Actor> = {}): V2Actor => ({ x, role, action, palette, ...extra });
const AN = (x: number, animal: NonNullable<V2Actor["animal"]>, scale = 1, color?: string): V2Actor => ({ x, kind: "animal", animal, scale, color });
const P = (kind: string, x: number, scale = 1, fire?: number): V2Prop => ({ kind, x, scale, ...(fire != null ? { fire } : {}) });
const kf = (v: number, state: SceneState) => ({ v, state });

export const THESS2_SCENES: Record<number, ChapterScript> = {
  1: {
    keyframes: [
      kf(1, { terrain: "city", props: [P("tower", 0.82, 0.9)], actors: [F(0.5, "man", "stand", "white")] }),
      kf(4, { terrain: "city", crowd: 0.6, actors: [F(0.4, "man", "stand", "white"), F(0.62, "man", "mourn", "brown")] }),
      kf(7, { terrain: "mountain", storm: 0.6, fire: 0.8, glory: 0.6, actors: [F(0.4, "angel", "raise", "white"), F(0.6, "angel", "stand", "gold")] }),
      kf(10, { terrain: "mountain", glory: 0.9, fire: 0.5, actors: [F(0.5, "man", "kneel", "white")] }),
    ],
    beats: [
      { upTo: 4, reaction: "Paulo agradece pela fé que cresce na perseguição. 🤍" },
      { upTo: 9, god: "O Senhor Jesus se manifestará do céu com os anjos do seu poder.", reaction: "Virá em chamas de fogo, fazendo justiça. 🔥" },
      { upTo: 99, reaction: "Glorificado nos seus santos naquele Dia. ✨" },
    ],
  },
  2: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.3, props: [P("tower", 0.8)], actors: [F(0.5, "man", "raise", "white")] }),
      kf(3, { terrain: "city", night: 0.6, darkness: 0.4, actors: [F(0.4, "man", "stand", "purple"), F(0.66, "man", "mourn", "brown")] }),
      kf(8, { terrain: "city", night: 0.5, glory: 0.6, fire: 0.5, actors: [F(0.5, "man", "raise", "white")] }),
      kf(13, { terrain: "city", glory: 0.4, actors: [F(0.5, "man", "stand", "white"), F(0.68, "man", "kneel", "brown")] }),
    ],
    beats: [
      { upTo: 2, reaction: "Não vos abaleis quanto ao Dia do Senhor. 🕯️" },
      { upTo: 7, reaction: "Antes virá a apostasia e o homem da iniquidade. 🌑" },
      { upTo: 12, god: "O Senhor o consumirá com o sopro da sua boca.", reaction: "O maligno será destruído em sua vinda. 🔥" },
      { upTo: 99, reaction: "Mas fostes escolhidos: firmes, guardai as tradições. 🤍" },
    ],
  },
  3: {
    keyframes: [
      kf(1, { terrain: "city", props: [P("tower", 0.84, 0.9)], actors: [F(0.4, "man", "raise", "white"), F(0.62, "man", "kneel", "brown")] }),
      kf(6, { terrain: "city", crowd: 0.6, actors: [F(0.45, "man", "stand", "white"), F(0.66, "man", "walk", "brown")] }),
      kf(10, { terrain: "field", actors: [F(0.35, "man", "carry", "brown"), F(0.6, "man", "carry", "sand")] }),
      kf(16, { terrain: "city", glory: 0.4, actors: [F(0.5, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 5, reaction: "Orai para que a Palavra corra e seja glorificada. 🙏" },
      { upTo: 9, god: "Se alguém não quer trabalhar, também não coma.", reaction: "Paulo adverte contra a ociosidade. 🌾" },
      { upTo: 15, reaction: "Não vos canseis de fazer o bem. 🤝" },
      { upTo: 99, god: "O Senhor da paz vos dê continuamente a paz.", reaction: "A graça de nosso Senhor com todos vós. ✨" },
    ],
  },
};
