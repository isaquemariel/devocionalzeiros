// ============================================================================
// Roteiros de cena (Living Scene v2) — TIAGO, capítulo por capítulo.
// A carta prática da fé: a provação que produz perseverança, o pedir sabedoria,
// ouvir e praticar a Palavra, a fé sem obras que é morta, o domínio da língua,
// a humildade diante de Deus e a oração da fé que cura o enfermo.
// Puramente visual/narrativo — não toca em progresso.
// Segue o padrão de Êxodo (rpgExodusScenes).
// ============================================================================

import type { ChapterScript, V2Actor, V2Prop, SceneState } from "@/lib/rpgLivingV2";

const F = (x: number, role: V2Actor["role"], action: V2Actor["action"], palette?: V2Actor["palette"], extra: Partial<V2Actor> = {}): V2Actor => ({ x, role, action, palette, ...extra });
const AN = (x: number, animal: NonNullable<V2Actor["animal"]>, scale = 1, color?: string): V2Actor => ({ x, kind: "animal", animal, scale, color });
const P = (kind: string, x: number, scale = 1, fire?: number): V2Prop => ({ kind, x, scale, ...(fire != null ? { fire } : {}) });
const kf = (v: number, state: SceneState) => ({ v, state });

export const JAMES_SCENES: Record<number, ChapterScript> = {
  1: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.6, actors: [F(0.4, "elder", "raise", "white"), F(0.66, "man", "stand", "brown")] }),
      kf(2, { terrain: "hills", storm: 0.7, rain: 0.4, actors: [F(0.45, "man", "stand", "brown")] }),
      kf(5, { terrain: "hills", glory: 0.8, actors: [F(0.44, "man", "kneel", "brown")] }),
      kf(22, { terrain: "city", glory: 0.35, props: [P("tablets", 0.6, 1.1)], actors: [F(0.4, "man", "raise", "brown"), F(0.64, "man", "walk", "sand")] }),
    ],
    beats: [
      { upTo: 4, reaction: "Tende por motivo de gozo as provações — elas produzem perseverança. 🌱" },
      { upTo: 8, god: "Se alguém tem falta de sabedoria, peça-a a Deus, que a todos dá liberalmente.", reaction: "Da tempestade à luz: peça com fé, sem duvidar. 🙏" },
      { upTo: 21, reaction: "Toda boa dádiva vem do alto, do Pai das luzes. ✨" },
      { upTo: 99, god: "Sede praticantes da palavra, e não somente ouvintes.", reaction: "Quem ouve e faz não se esquece — é feliz no que realiza. 📜" },
    ],
  },
  2: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.7, actors: [F(0.34, "king", "stand", "gold"), F(0.72, "man", "kneel", "sand")] }),
      kf(8, { terrain: "city", crowd: 0.5, actors: [F(0.4, "man", "raise", "white"), F(0.6, "man", "stand", "brown")] }),
      kf(14, { terrain: "field", actors: [F(0.36, "man", "stand", "brown"), F(0.6, "man", "mourn", "gray")] }),
      kf(21, { terrain: "field", glory: 0.4, props: [P("altar", 0.5, 1, 0.6)], actors: [F(0.4, "elder", "raise", "white")] }),
    ],
    beats: [
      { upTo: 7, reaction: "Não façais acepção de pessoas: o pobre é rico na fé. 🤍" },
      { upTo: 13, god: "Amarás o teu próximo como a ti mesmo — esta é a lei real.", reaction: "A misericórdia triunfa sobre o juízo. ⚖️" },
      { upTo: 20, reaction: "Que aproveita dizer que tem fé, se não há obras? 🍞" },
      { upTo: 99, reaction: "A fé sem obras é morta — como Abraão, crê e age. 🕯️" },
    ],
  },
  3: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.5, actors: [F(0.4, "elder", "raise", "white"), F(0.64, "man", "stand", "brown")] }),
      kf(5, { terrain: "hills", fire: 0.3, actors: [F(0.45, "man", "stand", "brown")] }),
      kf(6, { terrain: "hills", fire: 0.9, storm: 0.3, actors: [F(0.42, "man", "mourn", "brown")] }),
      kf(13, { terrain: "field", glory: 0.4, props: [P("tree", 0.7)], actors: [F(0.4, "elder", "stand", "white")] }),
    ],
    beats: [
      { upTo: 4, reaction: "A língua é um pequeno membro, mas se gaba de grandes coisas. 👅" },
      { upTo: 8, reaction: "Uma faísca incendeia toda a floresta — ninguém a doma. 🔥" },
      { upTo: 12, god: undefined, reaction: "Da mesma boca não saem bênção e maldição. 💧" },
      { upTo: 99, reaction: "A sabedoria do alto é pacífica e cheia de bons frutos. 🌿" },
    ],
  },
  4: {
    keyframes: [
      kf(1, { terrain: "city", storm: 0.5, crowd: 0.4, actors: [F(0.36, "warrior", "fight", "red", { facing: 1 }), F(0.6, "man", "fight", "brown", { facing: -1 })] }),
      kf(7, { terrain: "hills", glory: 0.8, actors: [F(0.45, "man", "kneel", "brown")] }),
      kf(10, { terrain: "hills", glory: 0.6, actors: [F(0.44, "man", "bow", "brown")] }),
      kf(13, { terrain: "field", actors: [F(0.35, "man", "walk", "sand"), AN(0.66, "camel", 0.9)] }),
    ],
    beats: [
      { upTo: 6, reaction: "De onde vêm as guerras? Das paixões que lutam em vós. ⚔️" },
      { upTo: 10, god: "Chegai-vos a Deus, e ele se chegará a vós.", reaction: "Submetei-vos a Deus; resisti ao diabo, e ele fugirá. 🙇" },
      { upTo: 12, reaction: "Um só é o Legislador e Juiz — quem és tu para julgar? 🤍" },
      { upTo: 99, reaction: "Vossa vida é um vapor: 'Se o Senhor quiser, faremos isto.' 🌫️" },
    ],
  },
  5: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.3, actors: [F(0.36, "king", "mourn", "gold"), F(0.66, "man", "carry", "sand")] }),
      kf(7, { terrain: "field", rain: 0.5, actors: [F(0.4, "man", "stand", "brown"), AN(0.7, "ox", 0.9)] }),
      kf(13, { terrain: "field", crowd: 0.4, glory: 0.5, props: [P("altar", 0.5, 0.9, 0.4)], actors: [F(0.36, "elder", "raise", "white"), F(0.6, "man", "lie", "gray")] }),
      kf(17, { terrain: "hills", glory: 0.7, storm: 0.4, actors: [F(0.45, "elder", "raise", "brown")] }),
    ],
    beats: [
      { upTo: 6, reaction: "Chorai, ó ricos, pelas misérias que vêm sobre vós. 😔" },
      { upTo: 11, god: undefined, reaction: "Sede pacientes como o lavrador que espera a chuva e o fruto. 🌾" },
      { upTo: 15, god: "A oração da fé salvará o enfermo, e o Senhor o levantará.", reaction: "Os anciãos oram e ungem o doente. 🙏✨" },
      { upTo: 99, reaction: "A oração do justo, como a de Elias, muito pode. ⚡" },
    ],
  },
};
