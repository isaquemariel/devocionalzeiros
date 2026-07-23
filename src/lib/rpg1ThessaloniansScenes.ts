// ============================================================================
// Roteiros de cena (Living Scene v2) — 1 TESSALONICENSES, capítulo por capítulo.
// Carta de Paulo à igreja jovem: exemplo de fé, o ministério terno, a esperança
// da vinda do Senhor — os mortos ressuscitam e somos arrebatados nas nuvens —
// e o Dia do Senhor que vem como ladrão de noite. Puramente visual/narrativo.
// Segue o padrão de Êxodo (rpgExodusScenes).
// ============================================================================

import type { ChapterScript, V2Actor, V2Prop, SceneState } from "@/lib/rpgLivingV2";

const F = (x: number, role: V2Actor["role"], action: V2Actor["action"], palette?: V2Actor["palette"], extra: Partial<V2Actor> = {}): V2Actor => ({ x, role, action, palette, ...extra });
const AN = (x: number, animal: NonNullable<V2Actor["animal"]>, scale = 1, color?: string): V2Actor => ({ x, kind: "animal", animal, scale, color });
const P = (kind: string, x: number, scale = 1, fire?: number): V2Prop => ({ kind, x, scale, ...(fire != null ? { fire } : {}) });
const kf = (v: number, state: SceneState) => ({ v, state });

export const THESS1_SCENES: Record<number, ChapterScript> = {
  1: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.6, props: [P("tower", 0.82, 1.1)], actors: [F(0.4, "man", "stand", "white"), F(0.58, "man", "stand", "brown")] }),
      kf(4, { terrain: "city", glory: 0.4, crowd: 0.7, actors: [F(0.35, "man", "raise", "white"), F(0.6, "woman", "kneel", "blue")] }),
      kf(8, { terrain: "hills", glory: 0.35, crowd: 0.5, actors: [F(0.4, "man", "walk", "brown"), F(0.62, "man", "walk", "sand")] }),
    ],
    beats: [
      { upTo: 3, reaction: "Paulo saúda a igreja dos tessalonicenses e agradece por sua fé. 🤍" },
      { upTo: 7, reaction: "Recebendo o evangelho com alegria, tornam-se exemplo a todos os crentes. ✨" },
      { upTo: 99, reaction: "De vós a Palavra do Senhor ressoou por toda parte. 📣" },
    ],
  },
  2: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.5, actors: [F(0.4, "man", "raise", "white"), F(0.6, "man", "stand", "brown")] }),
      kf(7, { terrain: "city", crowd: 0.4, props: [P("tent", 0.78)], actors: [F(0.38, "man", "kneel", "white"), F(0.58, "child", "stand", "sand"), F(0.72, "woman", "stand", "green")] }),
      kf(13, { terrain: "hills", glory: 0.4, actors: [F(0.4, "man", "raise", "white"), F(0.62, "man", "kneel", "brown")] }),
    ],
    beats: [
      { upTo: 6, reaction: "Paulo prega o evangelho com coragem, sem buscar a glória dos homens. 🕊️" },
      { upTo: 12, reaction: "Foi terno como uma mãe que acalenta os filhos; exortava como pai. 🤍" },
      { upTo: 99, reaction: "Recebestes a Palavra não como de homens, mas como de Deus. 📖" },
    ],
  },
  3: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.3, actors: [F(0.36, "man", "stand", "white"), F(0.58, "man", "walk", "sand", { facing: 1 })] }),
      kf(6, { terrain: "hills", glory: 0.3, actors: [F(0.4, "man", "raise", "white"), F(0.6, "man", "walk", "brown", { facing: -1 })] }),
      kf(11, { terrain: "city", glory: 0.45, actors: [F(0.45, "man", "kneel", "white")] }),
    ],
    beats: [
      { upTo: 5, reaction: "Paulo envia Timóteo para firmar a fé dos irmãos na tribulação. 🤝" },
      { upTo: 10, reaction: "Timóteo volta com boas novas: eles estão firmes na fé e no amor! 🎉" },
      { upTo: 99, god: undefined, reaction: "Que o Senhor vos faça crescer em amor uns para com os outros. ❤️" },
    ],
  },
  4: {
    keyframes: [
      kf(1, { terrain: "city", actors: [F(0.4, "man", "stand", "white"), F(0.62, "man", "stand", "brown")] }),
      kf(13, { terrain: "garden", night: 0.4, props: [P("tomb", 0.5, 1.1)], actors: [F(0.36, "woman", "mourn", "blue"), F(0.66, "man", "mourn", "sand")] }),
      kf(16, { terrain: "garden", glory: 0.8, props: [P("tomb", 0.5, 1.1)], actors: [F(0.4, "man", "raise", "white"), F(0.66, "man", "raise", "sand")] }),
      kf(17, { terrain: "plain", glory: 0.95, crowd: 0.7, actors: [F(0.3, "man", "raise", "white"), F(0.5, "woman", "raise", "green"), F(0.7, "man", "raise", "brown")] }),
    ],
    beats: [
      { upTo: 12, reaction: "Paulo exorta à santidade e ao amor fraternal. 🤍" },
      { upTo: 15, reaction: "Não vos entristeçais como os que não têm esperança. Cristo ressuscitou! ✨" },
      { upTo: 16, god: "O próprio Senhor descerá do céu com brado e trombeta.", reaction: "Os mortos em Cristo ressuscitarão primeiro! ⚰️➡️🌟" },
      { upTo: 99, reaction: "Seremos arrebatados nas nuvens para o encontro com o Senhor! ☁️🙌" },
    ],
  },
  5: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.8, props: [P("star", 0.2), P("star", 0.72, 0.8)], actors: [F(0.45, "man", "stand", "white")] }),
      kf(4, { terrain: "field", night: 0.5, glory: 0.3, actors: [F(0.4, "man", "raise", "white"), F(0.62, "man", "stand", "brown")] }),
      kf(12, { terrain: "field", glory: 0.6, crowd: 0.4, actors: [F(0.35, "man", "raise", "white"), F(0.6, "woman", "kneel", "blue")] }),
      kf(23, { terrain: "city", glory: 0.7, actors: [F(0.45, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 3, reaction: "O Dia do Senhor vem como ladrão de noite, quando menos se espera. 🌑" },
      { upTo: 11, reaction: "Mas vós sois filhos da luz e do dia — vigiai e sede sóbrios! 🌅" },
      { upTo: 22, reaction: "Regozijai-vos sempre, orai sem cessar, em tudo dai graças. 🙏" },
      { upTo: 99, god: undefined, reaction: "Que o Deus da paz vos santifique por completo. A graça convosco! ✨" },
    ],
  },
};
