// ============================================================================
// Roteiros de cena (Living Scene v2) — FILEMOM, capítulo único.
// Paulo, prisioneiro, intercede por Onésimo — escravo fugitivo agora convertido
// — pedindo a Filemom que o receba não mais como servo, mas como irmão amado.
// Tema: perdão e reconciliação. Puramente visual/narrativo — não toca em progresso.
// Segue o padrão de Êxodo (rpgExodusScenes).
// ============================================================================

import type { ChapterScript, V2Actor, V2Prop, SceneState } from "@/lib/rpgLivingV2";

const F = (x: number, role: V2Actor["role"], action: V2Actor["action"], palette?: V2Actor["palette"], extra: Partial<V2Actor> = {}): V2Actor => ({ x, role, action, palette, ...extra });
const AN = (x: number, animal: NonNullable<V2Actor["animal"]>, scale = 1, color?: string): V2Actor => ({ x, kind: "animal", animal, scale, color });
const P = (kind: string, x: number, scale = 1, fire?: number): V2Prop => ({ kind, x, scale, ...(fire != null ? { fire } : {}) });
const kf = (v: number, state: SceneState) => ({ v, state });

export const PHILEMON_SCENES: Record<number, ChapterScript> = {
  1: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.6, actors: [F(0.4, "man", "stand", "white"), F(0.62, "man", "kneel", "sand")] }),
      kf(4, { terrain: "city", night: 0.4, glory: 0.3, actors: [F(0.42, "man", "kneel", "white")] }),
      kf(10, { terrain: "city", night: 0.5, actors: [F(0.36, "man", "raise", "white"), F(0.64, "servant", "bow", "gray")] }),
      kf(15, { terrain: "city", night: 0.3, glory: 0.35, actors: [F(0.35, "man", "stand", "white"), F(0.6, "servant", "stand", "sand")] }),
      kf(17, { terrain: "city", glory: 0.6, crowd: 0.5, actors: [F(0.3, "servant", "walk", "sand"), F(0.55, "man", "raise", "brown"), F(0.72, "woman", "stand", "purple")] }),
    ],
    beats: [
      { upTo: 3, reaction: "Paulo, prisioneiro por Cristo, escreve a Filemom, amado colaborador. ✉️" },
      { upTo: 7, reaction: "Dá graças pela fé e pelo amor de Filemom, que reanima os santos. 🤍" },
      { upTo: 11, reaction: "Intercede por Onésimo: antes inútil, agora útil e convertido. 🙏" },
      { upTo: 16, reaction: "Recebe-o não mais como escravo, mas como irmão amado. 🤝" },
      { upTo: 99, reaction: "'Recebe-o como a mim mesmo.' Perdão e reconciliação. ✨" },
    ],
  },
};
