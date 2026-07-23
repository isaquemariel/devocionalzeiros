// ============================================================================
// Roteiros de cena (Living Scene v2) — FILIPENSES, capítulo por capítulo.
// A carta da alegria: Paulo, preso, escreve aos filipenses. "Para mim o viver
// é Cristo", o esvaziamento de Cristo, "prossigo para o alvo" e "alegrai-vos
// sempre". Puramente visual/narrativo — não toca em progresso.
// Segue o padrão de Êxodo (rpgExodusScenes).
// ============================================================================

import type { ChapterScript, V2Actor, V2Prop, SceneState } from "@/lib/rpgLivingV2";

const F = (x: number, role: V2Actor["role"], action: V2Actor["action"], palette?: V2Actor["palette"], extra: Partial<V2Actor> = {}): V2Actor => ({ x, role, action, palette, ...extra });
const AN = (x: number, animal: NonNullable<V2Actor["animal"]>, scale = 1, color?: string): V2Actor => ({ x, kind: "animal", animal, scale, color });
const P = (kind: string, x: number, scale = 1, fire?: number): V2Prop => ({ kind, x, scale, ...(fire != null ? { fire } : {}) });
const kf = (v: number, state: SceneState) => ({ v, state });

export const PHILIPPIANS_SCENES: Record<number, ChapterScript> = {
  1: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.4, props: [P("tower", 0.8, 1.1)], actors: [F(0.4, "man", "kneel", "white")] }),
      kf(12, { terrain: "city", night: 0.5, glory: 0.3, props: [P("tower", 0.82, 1.1)], actors: [F(0.42, "man", "stand", "white")] }),
      kf(21, { terrain: "city", night: 0.4, glory: 0.6, actors: [F(0.44, "man", "raise", "white")] }),
      kf(27, { terrain: "city", crowd: 0.5, glory: 0.35, actors: [F(0.3, "elder", "stand", "sand"), F(0.55, "man", "stand", "blue")] }),
    ],
    beats: [
      { upTo: 11, reaction: "Paulo, preso, agradece a Deus pelos filipenses. 🙏" },
      { upTo: 20, reaction: "Suas correntes serviram para o avanço do evangelho. ⛓️" },
      { upTo: 26, reaction: "'Para mim o viver é Cristo, e o morrer é lucro.' ✨" },
      { upTo: 99, reaction: "Vivei de modo digno do evangelho, firmes num só espírito. 🤝" },
    ],
  },
  2: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.3, actors: [F(0.35, "man", "bow", "blue"), F(0.6, "man", "bow", "sand")] }),
      kf(6, { terrain: "city", glory: 0.8, actors: [F(0.5, "man", "raise", "white")] }),
      kf(8, { terrain: "hills", night: 0.3, glory: 0.4, props: [P("cross", 0.5, 1.2)], actors: [F(0.5, "man", "bow", "white")] }),
      kf(9, { terrain: "city", glory: 0.95, actors: [F(0.5, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 5, reaction: "Tende o mesmo sentimento que houve em Cristo. 🤍" },
      { upTo: 7, reaction: "Ele se esvaziou, tomando a forma de servo. 👣" },
      { upTo: 11, reaction: "Humilhou-se até a morte de cruz — e Deus o exaltou! ✝️✨" },
      { upTo: 99, reaction: "Brilhai como luzeiros no mundo, sem murmurar. 💡" },
    ],
  },
  3: {
    keyframes: [
      kf(1, { terrain: "city", actors: [F(0.4, "man", "stand", "white"), F(0.62, "man", "stand", "purple")] }),
      kf(7, { terrain: "city", glory: 0.4, actors: [F(0.45, "man", "kneel", "white")] }),
      kf(13, { terrain: "field", glory: 0.3, actors: [F(0.32, "man", "walk", "white", { facing: 1 })] }),
      kf(14, { terrain: "field", glory: 0.7, props: [P("tower", 0.82, 0.9)], actors: [F(0.42, "man", "walk", "white", { facing: 1 })] }),
    ],
    beats: [
      { upTo: 6, reaction: "Paulo relata seus antigos motivos de orgulho. 📜" },
      { upTo: 11, reaction: "Tudo considera perda por causa de Cristo. 🤍" },
      { upTo: 16, reaction: "'Prossigo para o alvo, para o prêmio da vocação!' 🏃" },
      { upTo: 99, reaction: "Nossa cidadania está nos céus. ✨" },
    ],
  },
  4: {
    keyframes: [
      kf(1, { terrain: "garden", glory: 0.3, actors: [F(0.35, "man", "raise", "white"), F(0.6, "woman", "stand", "green")] }),
      kf(4, { terrain: "garden", glory: 0.5, actors: [F(0.45, "man", "raise", "white")] }),
      kf(7, { terrain: "garden", glory: 0.7, props: [P("dove", 0.5, 1.1)], actors: [F(0.45, "man", "kneel", "white")] }),
      kf(10, { terrain: "city", night: 0.35, glory: 0.4, props: [P("basket", 0.7)], actors: [F(0.4, "man", "stand", "white"), F(0.62, "man", "carry", "sand")] }),
    ],
    beats: [
      { upTo: 3, reaction: "Paulo exorta à concórdia e à firmeza no Senhor. 🤝" },
      { upTo: 6, reaction: "'Alegrai-vos sempre no Senhor! Outra vez o digo.' 😊" },
      { upTo: 9, reaction: "A paz de Deus guardará vossos corações. 🕊️" },
      { upTo: 99, reaction: "Aprendi a viver contente — os filipenses socorrem Paulo. 🎁" },
    ],
  },
};
