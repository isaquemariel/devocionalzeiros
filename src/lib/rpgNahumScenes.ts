// ============================================================================
// Roteiros de cena (Living Scene v2) — NAUM, capítulo por capítulo.
// A sentença contra Nínive: o SENHOR é tardio em irar-se mas grande em poder;
// a queda da cidade violenta, os carros e a batalha. Puramente visual/narrativo
// — não toca em progresso. Segue o padrão de Êxodo (rpgExodusScenes).
// ============================================================================

import type { ChapterScript, V2Actor, V2Prop, SceneState } from "@/lib/rpgLivingV2";

const F = (x: number, role: V2Actor["role"], action: V2Actor["action"], palette?: V2Actor["palette"], extra: Partial<V2Actor> = {}): V2Actor => ({ x, role, action, palette, ...extra });
const AN = (x: number, animal: NonNullable<V2Actor["animal"]>, scale = 1, color?: string): V2Actor => ({ x, kind: "animal", animal, scale, color });
const P = (kind: string, x: number, scale = 1, fire?: number): V2Prop => ({ kind, x, scale, ...(fire != null ? { fire } : {}) });
const kf = (v: number, state: SceneState) => ({ v, state });

export const NAHUM_SCENES: Record<number, ChapterScript> = {
  1: {
    keyframes: [
      kf(1, { terrain: "mountain", storm: 0.6, glory: 0.4, actors: [F(0.4, "man", "raise", "brown")] }),
      kf(3, { terrain: "mountain", storm: 0.85, glory: 0.5, props: [P("smoke", 0.5, 2)], actors: [F(0.4, "man", "stand", "brown")] }),
      kf(6, { terrain: "mountain", fire: 0.7, storm: 0.6, glory: 0.6, props: [P("smoke", 0.55, 2.2)], actors: [F(0.42, "man", "bow", "brown")] }),
      kf(15, { terrain: "hills", glory: 0.7, actors: [F(0.4, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 2, god: "O SENHOR é Deus zeloso e vingador contra os seus adversários.", reaction: "A sentença contra Nínive. ⚡" },
      { upTo: 5, god: "Tardio em irar-se, mas grande em poder.", reaction: "Os montes tremem e as colinas se derretem diante dele. 🏔️" },
      { upTo: 8, god: "Bom é o SENHOR, um refúgio no dia da angústia.", reaction: "Como o fogo, a sua ira consome os adversários. 🔥" },
      { upTo: 99, reaction: "Eis nos montes os pés do que anuncia boas-novas! 🕊️" },
    ],
  },
  2: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.3, actors: [F(0.35, "warrior", "stand", "red"), F(0.6, "warrior", "raise", "gray")] }),
      kf(3, { terrain: "city", storm: 0.4, night: 0.35, props: [P("tower", 0.2, 1.1), P("tower", 0.82, 0.9)], actors: [F(0.4, "warrior", "fight", "red", { facing: 1 }), F(0.62, "warrior", "fight", "gray", { facing: -1 })] }),
      kf(6, { terrain: "river", flood: 0.7, night: 0.3, props: [P("tower", 0.78)], actors: [F(0.4, "warrior", "mourn", "gray")] }),
      kf(8, { terrain: "city", fire: 0.75, night: 0.4, props: [P("smoke", 0.5, 2)], actors: [F(0.5, "man", "mourn", "sand")] }),
    ],
    beats: [
      { upTo: 2, reaction: "Sobe o destruidor contra ti, Nínive: guarda a fortaleza! 🛡️" },
      { upTo: 5, reaction: "Os escudos vermelhos, os carros como tochas na batalha. 🔥🐎" },
      { upTo: 7, reaction: "As portas dos rios se abrem; o palácio se dissolve. 🌊" },
      { upTo: 99, god: "Eis que estou contra ti, diz o SENHOR dos Exércitos.", reaction: "Nínive é saqueada e devastada. 💥" },
    ],
  },
  3: {
    keyframes: [
      kf(1, { terrain: "city", blood: 0.5, night: 0.4, actors: [F(0.4, "warrior", "fight", "red", { facing: 1 }), F(0.6, "man", "lie", "sand")] }),
      kf(2, { terrain: "city", storm: 0.5, night: 0.35, props: [P("tower", 0.2, 1.1)], actors: [F(0.35, "warrior", "fight", "gray", { facing: 1 }), F(0.58, "warrior", "fight", "red", { facing: -1 })] }),
      kf(13, { terrain: "city", fire: 0.85, night: 0.45, props: [P("tower", 0.8, 0.8), P("smoke", 0.5, 2.2)], actors: [F(0.5, "man", "mourn", "sand")] }),
      kf(18, { terrain: "hills", night: 0.6, actors: [F(0.4, "king", "mourn", "gold"), F(0.66, "man", "lie", "gray")] }),
    ],
    beats: [
      { upTo: 3, reaction: "Ai da cidade sanguinária! Carros, cavalos e mortos sem fim. ⚔️" },
      { upTo: 7, god: "Eis que estou contra ti, e descobrirei as tuas vergonhas.", reaction: "Nínive cai — e quem a lamentará? 🏚️" },
      { upTo: 17, reaction: "Nem as fortalezas nem os teus príncipes te salvam. 🔥" },
      { upTo: 99, reaction: "Teus pastores dormem, ó rei da Assíria; o teu povo se dispersa. 🌑" },
    ],
  },
};
