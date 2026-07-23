// ============================================================================
// Roteiros de cena (Living Scene v2) — 3 JOÃO, capítulo único.
// Carta do ancião a Gaio: elogio pela hospitalidade aos irmãos e missionários,
// repreensão a Diótrefes que ama a preeminência, e recomendação de Demétrio.
// Puramente visual/narrativo — não toca em progresso.
// Segue o padrão de Êxodo (rpgExodusScenes).
// ============================================================================

import type { ChapterScript, V2Actor, V2Prop, SceneState } from "@/lib/rpgLivingV2";

const F = (x: number, role: V2Actor["role"], action: V2Actor["action"], palette?: V2Actor["palette"], extra: Partial<V2Actor> = {}): V2Actor => ({ x, role, action, palette, ...extra });
const AN = (x: number, animal: NonNullable<V2Actor["animal"]>, scale = 1, color?: string): V2Actor => ({ x, kind: "animal", animal, scale, color });
const P = (kind: string, x: number, scale = 1, fire?: number): V2Prop => ({ kind, x, scale, ...(fire != null ? { fire } : {}) });
const kf = (v: number, state: SceneState) => ({ v, state });

export const JOHN3_SCENES: Record<number, ChapterScript> = {
  1: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.2, glory: 0.3, props: [P("tent", 0.72)], actors: [F(0.4, "elder", "stand", "white"), F(0.6, "man", "kneel", "blue")] }),
      kf(5, { terrain: "city", crowd: 0.5, props: [P("well", 0.72)], actors: [F(0.3, "man", "stand", "blue"), F(0.5, "man", "carry", "brown"), F(0.7, "man", "walk", "sand")] }),
      kf(9, { terrain: "city", night: 0.35, props: [P("tower", 0.7, 1.1)], actors: [F(0.42, "man", "raise", "purple"), F(0.68, "man", "bow", "sand")] }),
      kf(11, { terrain: "city", glory: 0.35, actors: [F(0.4, "man", "stand", "white"), F(0.62, "elder", "raise", "blue")] }),
      kf(13, { terrain: "city", night: 0.4, glory: 0.25, props: [P("tent", 0.68)], actors: [F(0.45, "elder", "stand", "white")] }),
    ],
    beats: [
      { upTo: 4, reaction: "O ancião saúda o amado Gaio e ora por sua saúde e alma. 🤍" },
      { upTo: 8, reaction: "Elogia Gaio pela hospitalidade aos irmãos e missionários peregrinos. 🤝" },
      { upTo: 10, reaction: "Repreende Diótrefes, que ama a preeminência e rejeita os irmãos. 😠" },
      { upTo: 12, reaction: "Recomenda Demétrio, de quem todos dão bom testemunho. ✨" },
      { upTo: 99, reaction: "Espera vê-lo em breve; 'a paz seja contigo'. 🕊️" },
    ],
  },
};
