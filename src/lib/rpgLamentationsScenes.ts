// ============================================================================
// Roteiros de cena (Living Scene v2) — LAMENTAÇÕES, capítulo por capítulo.
// O pranto sobre a destruição de Jerusalém: a cidade solitária e arruinada, a
// ira e as ruínas fumegantes, e, no meio do luto, a esperança que amanhece —
// "as misericórdias do SENHOR se renovam a cada manhã". Fome, cativeiro e a
// súplica final. Puramente visual/narrativo — não toca em progresso.
// Segue o padrão de Êxodo (rpgExodusScenes).
// ============================================================================

import type { ChapterScript, V2Actor, V2Prop, SceneState } from "@/lib/rpgLivingV2";

const F = (x: number, role: V2Actor["role"], action: V2Actor["action"], palette?: V2Actor["palette"], extra: Partial<V2Actor> = {}): V2Actor => ({ x, role, action, palette, ...extra });
const AN = (x: number, animal: NonNullable<V2Actor["animal"]>, scale = 1, color?: string): V2Actor => ({ x, kind: "animal", animal, scale, color });
const P = (kind: string, x: number, scale = 1, fire?: number): V2Prop => ({ kind, x, scale, ...(fire != null ? { fire } : {}) });
const kf = (v: number, state: SceneState) => ({ v, state });

export const LAMENTATIONS_SCENES: Record<number, ChapterScript> = {
  1: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.5, props: [P("tower", 0.2, 0.8), P("tower", 0.82, 0.7)], actors: [F(0.5, "woman", "mourn", "gray")] }),
      kf(4, { terrain: "city", night: 0.6, props: [P("tower", 0.18, 0.7)], actors: [F(0.45, "woman", "lie", "gray")] }),
      kf(11, { terrain: "city", night: 0.6, crowd: 0.6, actors: [F(0.32, "man", "mourn", "sand"), F(0.55, "woman", "carry", "brown"), F(0.72, "child", "stand", "sand")] }),
      kf(18, { terrain: "city", night: 0.7, crowd: 0.5, actors: [F(0.5, "woman", "kneel", "gray")] }),
    ],
    beats: [
      { upTo: 3, reaction: "Como está solitária a cidade antes tão povoada! 😢" },
      { upTo: 10, reaction: "Os caminhos de Sião choram; seus portões estão desertos. 🌑" },
      { upTo: 17, reaction: "Não há quem console Jerusalém em sua dor. 💔" },
      { upTo: 99, reaction: "'Vede, ó SENHOR, a minha angústia' — clama a cidade. 🙏" },
    ],
  },
  2: {
    keyframes: [
      kf(1, { terrain: "city", storm: 0.6, fire: 0.6, night: 0.4, props: [P("smoke", 0.35, 2.2), P("tower", 0.78, 0.6)], actors: [F(0.5, "man", "mourn", "gray")] }),
      kf(6, { terrain: "city", fire: 0.7, storm: 0.4, props: [P("altar", 0.5, 1, 0.9), P("smoke", 0.62, 2)], actors: [F(0.35, "elder", "mourn", "gray")] }),
      kf(11, { terrain: "city", fire: 0.4, night: 0.5, crowd: 0.6, props: [P("smoke", 0.28, 1.8)], actors: [F(0.4, "woman", "lie", "gray"), F(0.62, "child", "lie", "sand")] }),
      kf(18, { terrain: "city", night: 0.7, props: [P("tower", 0.2, 0.6)], actors: [F(0.5, "woman", "raise", "gray")] }),
    ],
    beats: [
      { upTo: 5, reaction: "O SENHOR, em sua ira, cobriu Sião de nuvem. ⚡" },
      { upTo: 10, reaction: "Ele derrubou os muros; o santuário jaz em ruínas fumegantes. 🔥" },
      { upTo: 17, reaction: "Crianças e velhos desfalecem pelas ruas da cidade. 😢" },
      { upTo: 99, reaction: "'Levanta as mãos ao Senhor pela vida do teu povo!' 🙏" },
    ],
  },
  3: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.8, props: [P("tower", 0.8, 0.6)], actors: [F(0.5, "man", "mourn", "gray")] }),
      kf(16, { terrain: "plain", night: 0.6, actors: [F(0.5, "man", "kneel", "gray")] }),
      kf(22, { terrain: "hills", glory: 0.5, night: 0.2, actors: [F(0.45, "man", "stand", "brown")] }),
      kf(25, { terrain: "hills", glory: 0.8, actors: [F(0.45, "man", "raise", "white")] }),
      kf(55, { terrain: "hills", glory: 0.6, actors: [F(0.5, "man", "kneel", "brown")] }),
    ],
    beats: [
      { upTo: 15, reaction: "'Eu sou o homem que viu a aflição.' 🌑" },
      { upTo: 21, reaction: "No fundo do luto, ele torna a esperar. 🕯️" },
      { upTo: 33, reaction: "As misericórdias do SENHOR se renovam a cada manhã! 🌅" },
      { upTo: 99, reaction: "'Tu ouviste a minha voz' — do abismo ele clama e é ouvido. 🙏✨" },
    ],
  },
  4: {
    keyframes: [
      kf(1, { terrain: "city", fire: 0.4, night: 0.4, props: [P("smoke", 0.3, 1.8), P("tower", 0.82, 0.6)], actors: [F(0.5, "child", "lie", "sand")] }),
      kf(4, { terrain: "city", night: 0.5, crowd: 0.6, actors: [F(0.35, "woman", "mourn", "gray"), F(0.58, "child", "kneel", "sand")] }),
      kf(9, { terrain: "city", night: 0.6, crowd: 0.5, actors: [F(0.4, "man", "lie", "sand"), F(0.6, "elder", "mourn", "gray")] }),
      kf(18, { terrain: "city", fire: 0.5, crowd: 0.5, props: [P("smoke", 0.7, 1.6)], actors: [F(0.35, "man", "walk", "gray"), F(0.6, "warrior", "stand", "red")] }),
    ],
    beats: [
      { upTo: 3, reaction: "O ouro se escureceu; as crianças pedem pão. 😢" },
      { upTo: 10, reaction: "A fome consome a cidade; melhor fora morrer à espada. 💔" },
      { upTo: 16, reaction: "Foi por causa dos pecados dos seus próprios líderes. 🌑" },
      { upTo: 99, reaction: "Os inimigos levam o povo ao cativeiro. ⛓️" },
    ],
  },
  5: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.5, crowd: 0.6, props: [P("tower", 0.2, 0.6)], actors: [F(0.4, "man", "carry", "sand"), F(0.62, "woman", "mourn", "gray")] }),
      kf(11, { terrain: "city", crowd: 0.5, actors: [F(0.35, "elder", "mourn", "gray"), F(0.6, "child", "stand", "sand")] }),
      kf(19, { terrain: "hills", glory: 0.4, actors: [F(0.5, "man", "kneel", "brown")] }),
      kf(21, { terrain: "hills", glory: 0.7, actors: [F(0.5, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 10, reaction: "'Lembra-te, SENHOR, do que nos tem acontecido.' 😢" },
      { upTo: 18, reaction: "Cessou o júbilo; sobre o monte deserto rondam chacais. 🌑" },
      { upTo: 20, reaction: "Mas Tu, ó SENHOR, permaneces para sempre. ✨" },
      { upTo: 99, reaction: "'Converte-nos a ti, e seremos convertidos; renova os nossos dias.' 🙏🌅" },
    ],
  },
};
