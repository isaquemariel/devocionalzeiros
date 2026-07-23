// ============================================================================
// Roteiros de cena (Living Scene v2) — AGEU, capítulo por capítulo.
// O profeta exorta o povo a considerar os seus caminhos e reconstruir o templo
// abandonado em vez de cuidar só das próprias casas; a glória futura desta casa
// será maior que a primeira; e a promessa ao servo Zorobabel. Puramente
// visual/narrativo — não toca em progresso. Segue o padrão de Êxodo.
// ============================================================================

import type { ChapterScript, V2Actor, V2Prop, SceneState } from "@/lib/rpgLivingV2";

const F = (x: number, role: V2Actor["role"], action: V2Actor["action"], palette?: V2Actor["palette"], extra: Partial<V2Actor> = {}): V2Actor => ({ x, role, action, palette, ...extra });
const AN = (x: number, animal: NonNullable<V2Actor["animal"]>, scale = 1, color?: string): V2Actor => ({ x, kind: "animal", animal, scale, color });
const P = (kind: string, x: number, scale = 1, fire?: number): V2Prop => ({ kind, x, scale, ...(fire != null ? { fire } : {}) });
const kf = (v: number, state: SceneState) => ({ v, state });

export const HAGGAI_SCENES: Record<number, ChapterScript> = {
  1: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.6, props: [P("tower", 0.2, 1.1)], actors: [F(0.5, "elder", "raise", "white"), F(0.72, "king", "stand", "purple")] }),
      kf(4, { terrain: "city", props: [P("tent", 0.34, 1.4), P("tent", 0.7, 1.2)], actors: [F(0.32, "man", "carry", "brown"), F(0.6, "man", "stand", "sand")] }),
      kf(7, { terrain: "hills", crowd: 0.4, props: [P("tree", 0.24), P("tree", 0.82)], actors: [F(0.4, "elder", "raise", "white"), F(0.66, "man", "carry", "brown")] }),
      kf(12, { terrain: "city", glory: 0.4, crowd: 0.6, props: [P("altar", 0.5)], actors: [F(0.3, "man", "kneel", "brown"), F(0.55, "servant", "bow", "purple"), F(0.78, "man", "bow", "sand")] }),
    ],
    beats: [
      { upTo: 3, god: "Este povo diz: Não veio ainda o tempo de reedificar a casa do SENHOR.", reaction: "Passados os anos, o templo jaz em ruínas. 🧱" },
      { upTo: 6, god: "Considerai os vossos caminhos!", reaction: "Semeais muito e colheis pouco; o salário some do bolso furado. 🌾" },
      { upTo: 11, god: "Subi ao monte, trazei madeira e edificai a casa.", reaction: "Cuidais das vossas casas enquanto a minha jaz deserta. 🏚️" },
      { upTo: 99, reaction: "Zorobabel, Josué e o povo obedecem e temem ao SENHOR. 🙏" },
    ],
  },
  2: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.5, props: [P("altar", 0.55)], actors: [F(0.4, "elder", "raise", "white"), F(0.68, "elder", "mourn", "gray")] }),
      kf(4, { terrain: "city", glory: 0.5, props: [P("altar", 0.5, 1.1), P("tower", 0.8, 1.1)], actors: [F(0.3, "man", "carry", "brown"), F(0.56, "servant", "raise", "purple")] }),
      kf(6, { terrain: "city", glory: 0.85, props: [P("altar", 0.5, 1.2, 0.4)], actors: [F(0.42, "elder", "raise", "gold")] }),
      kf(20, { terrain: "city", glory: 0.6, props: [P("tower", 0.22, 1.1)], actors: [F(0.5, "servant", "kneel", "purple"), F(0.74, "king", "stand", "gold")] }),
    ],
    beats: [
      { upTo: 3, god: "Quem restou que viu esta casa na sua primeira glória?", reaction: "Aos olhos dos anciãos, ela parece como nada. 😢" },
      { upTo: 5, god: "Esforça-te, e trabalhai; porque eu sou convosco.", reaction: "O Espírito do SENHOR permanece no meio do povo. ✨" },
      { upTo: 9, god: "A glória desta última casa será maior que a da primeira, e darei a paz.", reaction: "O desejado das nações virá, e esta casa se encherá de glória. 🌟" },
      { upTo: 99, god: "Naquele dia te tomarei, Zorobabel, meu servo, e te porei como um selo.", reaction: "A promessa ao escolhido do SENHOR. 👑" },
    ],
  },
};
