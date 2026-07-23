// ============================================================================
// Roteiros de cena (Living Scene v2) — 2 JOÃO, capítulo único.
// Carta curta do ancião "à senhora eleita e a seus filhos": andar na verdade
// e no amor, e guardar-se dos enganadores que negam que Jesus veio em carne.
// Puramente visual/narrativo — não toca em progresso.
// Segue o padrão de Êxodo (rpgExodusScenes).
// ============================================================================

import type { ChapterScript, V2Actor, V2Prop, SceneState } from "@/lib/rpgLivingV2";

const F = (x: number, role: V2Actor["role"], action: V2Actor["action"], palette?: V2Actor["palette"], extra: Partial<V2Actor> = {}): V2Actor => ({ x, role, action, palette, ...extra });
const AN = (x: number, animal: NonNullable<V2Actor["animal"]>, scale = 1, color?: string): V2Actor => ({ x, kind: "animal", animal, scale, color });
const P = (kind: string, x: number, scale = 1, fire?: number): V2Prop => ({ kind, x, scale, ...(fire != null ? { fire } : {}) });
const kf = (v: number, state: SceneState) => ({ v, state });

export const JOHN2_SCENES: Record<number, ChapterScript> = {
  1: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.3, props: [P("tower", 0.82, 0.9)], actors: [F(0.32, "elder", "stand", "white"), F(0.6, "woman", "stand", "purple"), F(0.76, "child", "stand", "sand")] }),
      kf(4, { terrain: "city", glory: 0.4, actors: [F(0.4, "woman", "stand", "purple"), F(0.58, "child", "walk", "green"), F(0.72, "child", "walk", "sand")] }),
      kf(5, { terrain: "garden", glory: 0.35, props: [P("tree", 0.8)], actors: [F(0.36, "woman", "raise", "purple"), F(0.56, "child", "stand", "green")] }),
      kf(7, { terrain: "city", night: 0.5, props: [P("tower", 0.8, 0.9)], actors: [F(0.34, "elder", "raise", "white"), F(0.66, "man", "walk", "gray", { facing: -1 })] }),
      kf(12, { terrain: "city", glory: 0.3, props: [P("dove", 0.7)], actors: [F(0.4, "elder", "raise", "white"), F(0.62, "woman", "stand", "purple")] }),
    ],
    beats: [
      { upTo: 3, reaction: "O ancião saúda a senhora eleita e seus filhos, na verdade e no amor. 💌" },
      { upTo: 4, reaction: "Alegria: seus filhos andam na verdade! 🤍" },
      { upTo: 6, reaction: "O mandamento antigo: que nos amemos uns aos outros. ❤️" },
      { upTo: 11, reaction: "Guardai-vos dos enganadores que negam que Jesus veio em carne. ⚠️" },
      { upTo: 99, reaction: "'Espero ir e falar face a face, para que a alegria seja plena.' ✨" },
    ],
  },
};
