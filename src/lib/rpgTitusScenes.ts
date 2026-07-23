// ============================================================================
// Roteiros de cena (Living Scene v2) — TITO, capítulo por capítulo.
// Carta pastoral de Paulo a Tito, deixado em Creta para pôr em ordem as
// igrejas: nomear presbíteros em cada cidade, ensinar a sã doutrina conforme
// cada grupo, "a graça de Deus se manifestou trazendo salvação", boas obras,
// a esperança bem-aventurada e evitar contendas inúteis.
// Puramente visual/narrativo — não toca em progresso.
// Segue o padrão de Êxodo (rpgExodusScenes).
// ============================================================================

import type { ChapterScript, V2Actor, V2Prop, SceneState } from "@/lib/rpgLivingV2";

const F = (x: number, role: V2Actor["role"], action: V2Actor["action"], palette?: V2Actor["palette"], extra: Partial<V2Actor> = {}): V2Actor => ({ x, role, action, palette, ...extra });
const AN = (x: number, animal: NonNullable<V2Actor["animal"]>, scale = 1, color?: string): V2Actor => ({ x, kind: "animal", animal, scale, color });
const P = (kind: string, x: number, scale = 1, fire?: number): V2Prop => ({ kind, x, scale, ...(fire != null ? { fire } : {}) });
const kf = (v: number, state: SceneState) => ({ v, state });

export const TITUS_SCENES: Record<number, ChapterScript> = {
  1: {
    keyframes: [
      kf(1, { terrain: "sea", glory: 0.3, props: [P("boat", 0.72, 0.9), P("reeds", 0.9)], actors: [F(0.4, "man", "raise", "white")] }),
      kf(5, { terrain: "city", props: [P("tower", 0.16, 1.1), P("tower", 0.84, 0.9)], actors: [F(0.34, "man", "stand", "white"), F(0.56, "elder", "stand", "gray"), F(0.72, "elder", "stand", "sand")] }),
      kf(7, { terrain: "city", crowd: 0.4, props: [P("tower", 0.82, 0.9)], actors: [F(0.4, "elder", "raise", "white"), F(0.6, "man", "stand", "blue")] }),
      kf(10, { terrain: "city", night: 0.2, crowd: 0.5, actors: [F(0.36, "man", "stand", "brown"), F(0.6, "man", "mourn", "sand")] }),
    ],
    beats: [
      { upTo: 4, reaction: "Paulo, servo de Deus, escreve a Tito, seu filho na fé. ✍️" },
      { upTo: 6, god: undefined, reaction: "'Deixei-te em Creta para nomeares presbíteros em cada cidade.' 🏛️" },
      { upTo: 9, reaction: "O presbítero: irrepreensível, apegado à fiel palavra. 🤍" },
      { upTo: 99, reaction: "Reprova os que enganam, para que sejam sãos na fé. 🛡️" },
    ],
  },
  2: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.5, actors: [F(0.4, "man", "raise", "white"), F(0.66, "elder", "stand", "gray")] }),
      kf(3, { terrain: "city", crowd: 0.5, actors: [F(0.3, "woman", "stand", "purple"), F(0.5, "woman", "stand", "green"), F(0.72, "man", "stand", "brown")] }),
      kf(11, { terrain: "glory", glory: 0.85, actors: [F(0.5, "man", "raise", "white")] }),
      kf(13, { terrain: "glory", glory: 0.95, props: [P("star", 0.5, 1.2)], actors: [F(0.45, "man", "kneel", "white")] }),
    ],
    beats: [
      { upTo: 2, reaction: "Fala o que convém à sã doutrina: aos idosos, temperança. 🍇" },
      { upTo: 10, reaction: "A cada grupo o seu ensino — jovens, servos, mulheres. 📖" },
      { upTo: 12, god: undefined, reaction: "'A graça de Deus se manifestou trazendo salvação a todos!' ✨" },
      { upTo: 99, reaction: "Aguardamos a bem-aventurada esperança: a glória do Salvador. 🌟" },
    ],
  },
  3: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.4, actors: [F(0.36, "man", "stand", "white"), F(0.6, "man", "stand", "sand")] }),
      kf(4, { terrain: "river", glory: 0.7, props: [P("dove", 0.5, 0.9)], actors: [F(0.42, "man", "kneel", "white")] }),
      kf(9, { terrain: "city", night: 0.25, actors: [F(0.3, "man", "fight", "brown", { facing: 1 }), F(0.5, "man", "fight", "sand", { facing: -1 })] }),
      kf(12, { terrain: "sea", glory: 0.3, props: [P("boat", 0.7, 0.9)], actors: [F(0.4, "man", "walk", "white")] }),
    ],
    beats: [
      { upTo: 3, reaction: "Lembra-os de sujeitar-se e estar prontos para toda boa obra. 🤝" },
      { upTo: 7, god: undefined, reaction: "Ele nos salvou pela lavagem da regeneração no Espírito. 💧🕊️" },
      { upTo: 11, reaction: "Evita contendas e questões inúteis; são sem proveito. 🚫" },
      { upTo: 99, reaction: "Que os nossos aprendam a aplicar-se às boas obras. 🌿" },
    ],
  },
};
