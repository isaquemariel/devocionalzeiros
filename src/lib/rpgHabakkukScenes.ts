// ============================================================================
// Roteiros de cena (Living Scene v2) — HABACUQUE, capítulo por capítulo.
// O profeta questiona Deus sobre a violência e a injustiça; Deus anuncia os
// caldeus; a resposta na torre de vigia — "o justo viverá pela fé"; e a oração
// triunfante: "ainda que a figueira não floresça, eu me alegrarei no SENHOR".
// Puramente visual/narrativo — não toca em progresso.
// Segue o padrão de Êxodo (rpgExodusScenes).
// ============================================================================

import type { ChapterScript, V2Actor, V2Prop, SceneState } from "@/lib/rpgLivingV2";

const F = (x: number, role: V2Actor["role"], action: V2Actor["action"], palette?: V2Actor["palette"], extra: Partial<V2Actor> = {}): V2Actor => ({ x, role, action, palette, ...extra });
const AN = (x: number, animal: NonNullable<V2Actor["animal"]>, scale = 1, color?: string): V2Actor => ({ x, kind: "animal", animal, scale, color });
const P = (kind: string, x: number, scale = 1, fire?: number): V2Prop => ({ kind, x, scale, ...(fire != null ? { fire } : {}) });
const kf = (v: number, state: SceneState) => ({ v, state });

export const HABAKKUK_SCENES: Record<number, ChapterScript> = {
  1: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.3, actors: [F(0.4, "elder", "raise", "brown")] }),
      kf(2, { terrain: "city", night: 0.4, crowd: 0.4, actors: [F(0.36, "elder", "mourn", "brown"), F(0.66, "man", "fight", "red", { facing: -1 })] }),
      kf(5, { terrain: "plain", glory: 0.4, actors: [F(0.42, "elder", "stand", "brown")] }),
      kf(6, { terrain: "city", storm: 0.4, crowd: 0.5, actors: [F(0.28, "warrior", "fight", "gray", { facing: 1 }), F(0.72, "warrior", "fight", "red", { facing: -1 })] }),
      kf(13, { terrain: "city", night: 0.5, actors: [F(0.4, "elder", "mourn", "brown")] }),
    ],
    beats: [
      { upTo: 4, reaction: "Habacuque clama: 'Até quando, SENHOR, e não me ouves?' 😢" },
      { upTo: 5, god: "Olhai entre as nações; farei em vossos dias obra incrível.", reaction: "Deus responde ao profeta. ✨" },
      { upTo: 11, god: "Eis que suscito os caldeus, nação feroz e impetuosa.", reaction: "Um povo terrível vem de longe. ⚔️" },
      { upTo: 99, reaction: "O profeta se espanta: por que tolerar o mais ímpio? 😔" },
    ],
  },
  2: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.3, props: [P("tower", 0.6, 1.2)], actors: [F(0.58, "elder", "stand", "brown")] }),
      kf(2, { terrain: "city", glory: 0.5, props: [P("tower", 0.6, 1.2)], actors: [F(0.58, "elder", "raise", "brown")] }),
      kf(4, { terrain: "city", glory: 0.6, props: [P("tower", 0.58, 1.2)], actors: [F(0.36, "man", "stand", "white")] }),
      kf(14, { terrain: "sea", glory: 0.8, actors: [F(0.45, "elder", "bow", "brown")] }),
      kf(20, { terrain: "city", glory: 0.9, props: [P("altar", 0.5, 1, 0.5)], actors: [F(0.5, "elder", "kneel", "brown")] }),
    ],
    beats: [
      { upTo: 1, reaction: "O profeta sobe à torre de vigia para esperar a resposta. 🗼" },
      { upTo: 3, god: "Escreve a visão; ainda que tarde, ela virá.", reaction: "Deus manda gravar a promessa. 📜" },
      { upTo: 4, god: "O justo, porém, viverá pela sua fé.", reaction: "A grande palavra da confiança. 🤍" },
      { upTo: 19, reaction: "Ai daquele que se enche de violência e cobiça! ⚠️" },
      { upTo: 99, god: "Cale-se diante dele toda a terra.", reaction: "O SENHOR está no seu santo templo. 🙏" },
    ],
  },
  3: {
    keyframes: [
      kf(1, { terrain: "mountain", glory: 0.5, actors: [F(0.45, "elder", "kneel", "brown")] }),
      kf(3, { terrain: "mountain", glory: 0.9, fire: 0.4, actors: [F(0.42, "elder", "bow", "brown")] }),
      kf(6, { terrain: "mountain", storm: 0.7, fire: 0.5, actors: [F(0.4, "elder", "raise", "brown")] }),
      kf(11, { terrain: "sea", storm: 0.8, fire: 0.6, actors: [F(0.4, "elder", "stand", "brown")] }),
      kf(17, { terrain: "hills", glory: 0.7, props: [P("tree", 0.66), P("palm", 0.84)], actors: [F(0.4, "elder", "raise", "brown")] }),
    ],
    beats: [
      { upTo: 2, god: undefined, reaction: "Oração de Habacuque: 'Aviva a tua obra, ó SENHOR!' 🙏" },
      { upTo: 5, reaction: "Deus vem de Temã; sua glória cobre os céus. ✨" },
      { upTo: 15, reaction: "Os montes tremem, o sol e a lua param — o Guerreiro divino marcha! ⚡🔥" },
      { upTo: 16, reaction: "O profeta treme por dentro, mas espera em silêncio. 😌" },
      { upTo: 99, reaction: "'Ainda que a figueira não floresça, eu me alegrarei no SENHOR!' 🌿🎶" },
    ],
  },
};
