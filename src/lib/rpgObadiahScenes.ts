// ============================================================================
// Roteiros de cena (Living Scene v2) — OBADIAS, capítulo único.
// O juízo do SENHOR contra Edom pelo seu orgulho e pela violência contra
// Jacó, seu irmão; o Dia do SENHOR sobre as nações; e o monte Sião
// libertador, onde o reino pertence ao SENHOR. Puramente visual/narrativo —
// não toca em progresso. Segue o padrão de Êxodo (rpgExodusScenes).
// ============================================================================

import type { ChapterScript, V2Actor, V2Prop, SceneState } from "@/lib/rpgLivingV2";

const F = (x: number, role: V2Actor["role"], action: V2Actor["action"], palette?: V2Actor["palette"], extra: Partial<V2Actor> = {}): V2Actor => ({ x, role, action, palette, ...extra });
const AN = (x: number, animal: NonNullable<V2Actor["animal"]>, scale = 1, color?: string): V2Actor => ({ x, kind: "animal", animal, scale, color });
const P = (kind: string, x: number, scale = 1, fire?: number): V2Prop => ({ kind, x, scale, ...(fire != null ? { fire } : {}) });
const kf = (v: number, state: SceneState) => ({ v, state });

export const OBADIAH_SCENES: Record<number, ChapterScript> = {
  1: {
    keyframes: [
      kf(1, { terrain: "mountain", glory: 0.4, props: [P("tower", 0.72, 1.1), P("tower", 0.2, 0.9)], actors: [F(0.4, "angel", "raise", "white"), F(0.66, "king", "stand", "purple")] }),
      kf(3, { terrain: "mountain", night: 0.3, props: [P("tower", 0.68, 1.3), P("star", 0.3, 0.8)], actors: [F(0.62, "king", "stand", "purple", { facing: -1 }), F(0.8, "warrior", "stand", "gray")] }),
      kf(8, { terrain: "mountain", fire: 0.7, night: 0.4, storm: 0.4, props: [P("tower", 0.7, 1.1), P("smoke", 0.7, 1.8)], actors: [F(0.3, "warrior", "fight", "red", { facing: 1 }), F(0.66, "man", "mourn", "gray")] }),
      kf(15, { terrain: "city", fire: 0.6, night: 0.5, storm: 0.3, props: [P("tower", 0.5, 1.2), P("smoke", 0.4, 1.6)], actors: [F(0.4, "warrior", "fight", "red"), F(0.7, "man", "mourn", "sand")] }),
      kf(21, { terrain: "mountain", glory: 0.85, props: [P("altar", 0.5, 0.9, 0.5)], actors: [F(0.36, "man", "raise", "white"), F(0.6, "man", "raise", "blue")] }),
    ],
    beats: [
      { upTo: 2, god: "Eis que te fiz pequeno entre as nações; és muito desprezado.", reaction: "Visão de Obadias: o juízo contra Edom. 👁️" },
      { upTo: 7, god: "Ainda que subas como a águia e ponhas o teu ninho entre as estrelas, dali te derrubarei.", reaction: "O orgulho de Edom será abatido. 🦅" },
      { upTo: 14, god: "Pela violência feita a teu irmão Jacó, cobrir-te-á a vergonha.", reaction: "Edom traiu o irmão no dia da desgraça. ⚔️" },
      { upTo: 20, god: "Perto está o Dia do SENHOR sobre todas as nações.", reaction: "Como fizeste, assim se fará contigo. 🔥" },
      { upTo: 99, god: "No monte Sião haverá livramento, e o reino será do SENHOR.", reaction: "Os libertadores sobem a Sião — e a vitória é de Deus! ✨" },
    ],
  },
};
