// ============================================================================
// Roteiros de cena (Living Scene v2) — RUTE, capítulo por capítulo.
// Fome e luto em Moabe, a lealdade de Rute a Noemi, a respiga nos campos de
// Boaz, a eira de noite, o resgate e o casamento, e o nascimento de Obede,
// avô de Davi. Puramente visual/narrativo — não toca em progresso.
// Segue o padrão de Êxodo (rpgExodusScenes).
// ============================================================================

import type { ChapterScript, V2Actor, V2Prop, SceneState } from "@/lib/rpgLivingV2";

const F = (x: number, role: V2Actor["role"], action: V2Actor["action"], palette?: V2Actor["palette"], extra: Partial<V2Actor> = {}): V2Actor => ({ x, role, action, palette, ...extra });
const AN = (x: number, animal: NonNullable<V2Actor["animal"]>, scale = 1, color?: string): V2Actor => ({ x, kind: "animal", animal, scale, color });
const P = (kind: string, x: number, scale = 1, fire?: number): V2Prop => ({ kind, x, scale, ...(fire != null ? { fire } : {}) });
const kf = (v: number, state: SceneState) => ({ v, state });

export const RUTH_SCENES: Record<number, ChapterScript> = {
  1: {
    keyframes: [
      kf(1, { terrain: "desert", props: [P("tent", 0.68)], actors: [F(0.3, "man", "walk", "brown"), F(0.46, "woman", "walk", "blue"), F(0.62, "child", "walk", "sand"), F(0.74, "child", "walk", "green")] }),
      kf(3, { terrain: "desert", night: 0.3, props: [P("tent", 0.66)], actors: [F(0.5, "woman", "mourn", "blue")] }),
      kf(6, { terrain: "hills", actors: [F(0.35, "woman", "stand", "blue"), F(0.55, "woman", "kneel", "purple"), F(0.72, "woman", "walk", "sand", { facing: -1 })] }),
      kf(16, { terrain: "hills", glory: 0.25, actors: [F(0.42, "woman", "stand", "blue"), F(0.6, "woman", "kneel", "purple")] }),
      kf(19, { terrain: "city", crowd: 0.5, actors: [F(0.4, "woman", "mourn", "blue"), F(0.58, "woman", "stand", "purple")] }),
    ],
    beats: [
      { upTo: 5, reaction: "A fome leva Noemi e sua família a Moabe. 🌾" },
      { upTo: 14, reaction: "Morrem o marido e os dois filhos; Noemi fica só com as noras. 😢" },
      { upTo: 18, reaction: "Rute se apega a Noemi: 'Aonde fores, irei.' 🤍" },
      { upTo: 99, reaction: "As duas chegam a Belém no tempo da ceifa. 🌾" },
    ],
  },
  2: {
    keyframes: [
      kf(1, { terrain: "field", actors: [F(0.35, "woman", "walk", "purple"), F(0.55, "woman", "stand", "blue")] }),
      kf(3, { terrain: "field", crowd: 0.5, actors: [F(0.4, "woman", "carry", "purple"), F(0.62, "servant", "stand", "sand"), F(0.78, "servant", "carry", "brown")] }),
      kf(8, { terrain: "field", crowd: 0.5, actors: [F(0.34, "elder", "stand", "green"), F(0.56, "woman", "bow", "purple")] }),
      kf(14, { terrain: "field", crowd: 0.4, actors: [F(0.36, "elder", "stand", "green"), F(0.55, "woman", "kneel", "purple"), F(0.72, "servant", "carry", "sand")] }),
      kf(17, { terrain: "field", actors: [F(0.5, "woman", "carry", "purple")] }),
    ],
    beats: [
      { upTo: 3, reaction: "Rute vai respigar nos campos para sustentar Noemi. 🌾" },
      { upTo: 7, reaction: "Sem saber, ela chega à terra de Boaz, parente de Noemi." },
      { upTo: 13, reaction: "Boaz a abençoa e a acolhe entre suas servas. 🤍" },
      { upTo: 99, reaction: "Rute volta para casa com os braços cheios de grãos. 🌾" },
    ],
  },
  3: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.2, actors: [F(0.42, "woman", "stand", "blue"), F(0.6, "woman", "stand", "purple")] }),
      kf(6, { terrain: "field", night: 0.7, actors: [F(0.4, "woman", "walk", "purple")] }),
      kf(8, { terrain: "field", night: 0.8, actors: [F(0.38, "man", "lie", "brown"), F(0.56, "woman", "kneel", "purple")] }),
      kf(14, { terrain: "field", night: 0.5, actors: [F(0.4, "man", "stand", "brown"), F(0.6, "woman", "carry", "purple")] }),
    ],
    beats: [
      { upTo: 5, reaction: "Noemi orienta Rute a procurar Boaz na eira. 🌙" },
      { upTo: 9, reaction: "À noite, Rute pede: 'Estende sobre mim a tua proteção.' 🤍" },
      { upTo: 13, god: undefined, reaction: "Boaz promete ser o seu resgatador. 🌾" },
      { upTo: 99, reaction: "De madrugada, ela volta com medidas de cevada. 🌾" },
    ],
  },
  4: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.5, props: [P("tower", 0.82, 0.9)], actors: [F(0.34, "man", "stand", "brown"), F(0.52, "man", "stand", "sand"), F(0.7, "elder", "stand", "gray")] }),
      kf(9, { terrain: "city", crowd: 0.6, actors: [F(0.36, "man", "raise", "brown"), F(0.6, "elder", "stand", "white")] }),
      kf(13, { terrain: "city", glory: 0.3, actors: [F(0.4, "man", "stand", "brown"), F(0.58, "woman", "stand", "purple")] }),
      kf(16, { terrain: "city", glory: 0.5, crowd: 0.4, actors: [F(0.36, "woman", "stand", "blue"), F(0.54, "woman", "carry", "purple"), F(0.72, "child", "stand", "white")] }),
    ],
    beats: [
      { upTo: 8, reaction: "À porta da cidade, Boaz trata do direito de resgate. 🏛️" },
      { upTo: 12, reaction: "Diante das testemunhas, Boaz toma Rute por esposa. 💍" },
      { upTo: 15, reaction: "Nasce Obede; Noemi acolhe o menino no colo. 👶" },
      { upTo: 99, reaction: "Obede seria avô de Davi — a linhagem da promessa. ✨" },
    ],
  },
};
