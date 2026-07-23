// ============================================================================
// Roteiros de cena (Living Scene v2) — JUDAS, capítulo único.
// A exortação a batalhar pela fé, a advertência contra os falsos mestres
// (nuvens sem água, estrelas errantes), os exemplos do juízo divino, Miguel
// disputando o corpo de Moisés e a doxologia final ao Deus que nos guarda.
// Puramente visual/narrativo — não toca em progresso.
// Segue o padrão de Êxodo (rpgExodusScenes).
// ============================================================================

import type { ChapterScript, V2Actor, V2Prop, SceneState } from "@/lib/rpgLivingV2";

const F = (x: number, role: V2Actor["role"], action: V2Actor["action"], palette?: V2Actor["palette"], extra: Partial<V2Actor> = {}): V2Actor => ({ x, role, action, palette, ...extra });
const AN = (x: number, animal: NonNullable<V2Actor["animal"]>, scale = 1, color?: string): V2Actor => ({ x, kind: "animal", animal, scale, color });
const P = (kind: string, x: number, scale = 1, fire?: number): V2Prop => ({ kind, x, scale, ...(fire != null ? { fire } : {}) });
const kf = (v: number, state: SceneState) => ({ v, state });

export const JUDE_SCENES: Record<number, ChapterScript> = {
  1: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.5, props: [P("tower", 0.82, 0.9)], actors: [F(0.4, "man", "raise", "white"), F(0.62, "elder", "stand", "brown")] }),
      kf(4, { terrain: "city", night: 0.4, crowd: 0.4, actors: [F(0.35, "man", "stand", "white"), F(0.6, "man", "stand", "gray"), F(0.74, "man", "stand", "red")] }),
      kf(9, { terrain: "mountain", glory: 0.6, night: 0.3, actors: [F(0.34, "angel", "fight", "white", { facing: 1 }), F(0.66, "man", "stand", "red", { facing: -1 })] }),
      kf(12, { terrain: "sea", storm: 0.8, night: 0.5, rain: 0.4, props: [P("boat", 0.72, 0.9)], actors: [F(0.35, "man", "mourn", "gray")] }),
      kf(13, { terrain: "hills", night: 0.85, props: [P("star", 0.24), P("star", 0.5, 0.8), P("star", 0.78, 0.9)], actors: [F(0.45, "man", "stand", "gray")] }),
      kf(24, { terrain: "mountain", glory: 0.95, actors: [F(0.45, "man", "kneel", "white")] }),
    ],
    beats: [
      { upTo: 3, reaction: "Judas exorta: batalhai pela fé entregue aos santos. 🛡️" },
      { upTo: 8, reaction: "Homens ímpios se infiltraram, negando o Senhor. 😠" },
      { upTo: 11, god: undefined, reaction: "Miguel disputa com o diabo o corpo de Moisés. 👼⚔️" },
      { upTo: 16, reaction: "Nuvens sem água, levadas pelos ventos da tempestade. ☁️⚡" },
      { upTo: 23, reaction: "Estrelas errantes, guardadas para a escuridão eterna. 🌌" },
      { upTo: 99, god: undefined, reaction: "Àquele que é poderoso para vos guardar — glória e majestade! 🌟" },
    ],
  },
};
