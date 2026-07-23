// ============================================================================
// Roteiros de cena (Living Scene v2) — GÁLATAS, capítulo por capítulo.
// Carta de Paulo às igrejas da Galácia: o evangelho da graça contra a lei,
// "o justo viverá pela fé", o crucificado com Cristo, a liberdade cristã e
// o fruto do Espírito. Puramente visual/narrativo — não toca em progresso.
// Segue o padrão de Êxodo (rpgExodusScenes).
// ============================================================================

import type { ChapterScript, V2Actor, V2Prop, SceneState } from "@/lib/rpgLivingV2";

const F = (x: number, role: V2Actor["role"], action: V2Actor["action"], palette?: V2Actor["palette"], extra: Partial<V2Actor> = {}): V2Actor => ({ x, role, action, palette, ...extra });
const AN = (x: number, animal: NonNullable<V2Actor["animal"]>, scale = 1, color?: string): V2Actor => ({ x, kind: "animal", animal, scale, color });
const P = (kind: string, x: number, scale = 1, fire?: number): V2Prop => ({ kind, x, scale, ...(fire != null ? { fire } : {}) });
const kf = (v: number, state: SceneState) => ({ v, state });

export const GALATIANS_SCENES: Record<number, ChapterScript> = {
  1: {
    keyframes: [
      kf(1, { terrain: "city", props: [P("tablets", 0.62), P("tower", 0.85, 0.9)], actors: [F(0.4, "man", "stand", "white")] }),
      kf(11, { terrain: "city", glory: 0.4, props: [P("tablets", 0.6)], actors: [F(0.42, "man", "raise", "white")] }),
      kf(13, { terrain: "plain", night: 0.2, actors: [F(0.4, "warrior", "walk", "red", { facing: 1 })] }),
      kf(15, { terrain: "desert", glory: 0.6, actors: [F(0.45, "man", "kneel", "white")] }),
    ],
    beats: [
      { upTo: 5, reaction: "Paulo, apóstolo enviado por Jesus Cristo, saúda as igrejas da Galácia. ✍️" },
      { upTo: 12, reaction: "'Não há outro evangelho!' A graça de Cristo não se troca. 📜" },
      { upTo: 14, reaction: "Antes, Paulo perseguia a igreja com furor. ⚔️" },
      { upTo: 99, god: "Apraz-me revelar o meu Filho em ti.", reaction: "Deus o separou desde o ventre e o chamou pela graça. ✨" },
    ],
  },
  2: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.4, props: [P("tower", 0.82, 0.9)], actors: [F(0.34, "man", "stand", "white"), F(0.5, "elder", "stand", "gray"), F(0.66, "man", "stand", "brown")] }),
      kf(11, { terrain: "city", actors: [F(0.38, "man", "raise", "white", { facing: 1 }), F(0.62, "man", "stand", "brown")] }),
      kf(19, { terrain: "hills", glory: 0.6, props: [P("cross", 0.55, 1.1)], actors: [F(0.4, "man", "kneel", "white")] }),
    ],
    beats: [
      { upTo: 10, reaction: "Em Jerusalém, reconhecem a graça dada a Paulo. 🤝" },
      { upTo: 18, reaction: "Em Antioquia, Paulo repreende Pedro face a face pela verdade do evangelho." },
      { upTo: 99, reaction: "'Já estou crucificado com Cristo; vivo, não eu, mas Cristo vive em mim.' ✝️" },
    ],
  },
  3: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.4, actors: [F(0.4, "man", "raise", "white", { facing: 1 }), F(0.62, "man", "stand", "sand")] }),
      kf(6, { terrain: "field", glory: 0.4, props: [P("star", 0.7, 0.8)], actors: [F(0.42, "elder", "raise", "white")] }),
      kf(11, { terrain: "hills", glory: 0.5, props: [P("cross", 0.55)], actors: [F(0.44, "man", "stand", "white")] }),
      kf(23, { terrain: "plain", glory: 0.5, props: [P("tablets", 0.58)], actors: [F(0.4, "man", "raise", "white"), F(0.62, "man", "stand", "brown")] }),
    ],
    beats: [
      { upTo: 5, reaction: "'Ó insensatos gálatas! Recebestes o Espírito pela fé, não pela lei.' 🤔" },
      { upTo: 10, reaction: "Abraão creu em Deus, e isso lhe foi imputado como justiça. 🌟" },
      { upTo: 22, god: "O justo viverá pela fé.", reaction: "Cristo nos resgatou da maldição da lei. ✝️" },
      { upTo: 99, reaction: "Revestidos de Cristo: todos um só, herdeiros da promessa. 🤍" },
    ],
  },
  4: {
    keyframes: [
      kf(1, { terrain: "city", actors: [F(0.4, "child", "stand", "sand"), F(0.6, "servant", "stand", "gray")] }),
      kf(4, { terrain: "hills", glory: 0.6, props: [P("manger", 0.55)], actors: [F(0.42, "woman", "kneel", "blue")] }),
      kf(21, { terrain: "desert", night: 0.2, props: [P("tent", 0.7)], actors: [F(0.4, "woman", "mourn", "gray"), F(0.62, "child", "stand", "sand")] }),
      kf(28, { terrain: "field", glory: 0.5, actors: [F(0.42, "woman", "raise", "white"), F(0.62, "child", "stand", "white")] }),
    ],
    beats: [
      { upTo: 7, god: "Enviei o meu Filho, nascido de mulher, sob a lei.", reaction: "Não mais servos, mas filhos e herdeiros de Deus. 👶" },
      { upTo: 20, reaction: "Paulo teme por eles: 'Torno a sofrer as dores de parto até Cristo ser formado em vós.' 💗" },
      { upTo: 27, reaction: "Alegoria: Agar, a escrava, e Sara, a livre. ⛺" },
      { upTo: 99, reaction: "Somos filhos da promessa, filhos da mulher livre. ✨" },
    ],
  },
  5: {
    keyframes: [
      kf(1, { terrain: "field", glory: 0.4, actors: [F(0.44, "man", "raise", "white")] }),
      kf(13, { terrain: "field", actors: [F(0.36, "man", "stand", "white"), F(0.58, "man", "carry", "brown")] }),
      kf(19, { terrain: "plain", night: 0.25, fire: 0.2, actors: [F(0.4, "warrior", "fight", "red", { facing: 1 }), F(0.62, "man", "mourn", "gray")] }),
      kf(22, { terrain: "garden", glory: 0.5, props: [P("tree", 0.3, 1.2), P("tree", 0.72), P("dove", 0.52, 0.9)], actors: [F(0.5, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 12, reaction: "'Para a liberdade Cristo nos libertou; permanecei firmes!' 🕊️" },
      { upTo: 18, god: "Andai em Espírito, e não satisfareis a carne.", reaction: "Servi uns aos outros pelo amor. 🤍" },
      { upTo: 21, reaction: "As obras da carne conduzem à ruína. ⚔️" },
      { upTo: 99, reaction: "O fruto do Espírito: amor, alegria, paz, longanimidade, bondade... 🌳🕊️" },
    ],
  },
  6: {
    keyframes: [
      kf(1, { terrain: "field", actors: [F(0.36, "man", "carry", "white"), F(0.6, "man", "kneel", "brown")] }),
      kf(7, { terrain: "field", glory: 0.35, props: [P("tree", 0.72)], actors: [F(0.42, "man", "stand", "sand")] }),
      kf(14, { terrain: "hills", glory: 0.6, props: [P("cross", 0.55, 1.2)], actors: [F(0.42, "man", "kneel", "white")] }),
    ],
    beats: [
      { upTo: 6, god: undefined, reaction: "'Levai as cargas uns dos outros e cumprireis a lei de Cristo.' 🤝" },
      { upTo: 13, reaction: "Aquilo que o homem semear, isso também ceifará. 🌾" },
      { upTo: 99, reaction: "'Longe de mim gloriar-me, senão na cruz de nosso Senhor Jesus Cristo.' ✝️ A graça seja convosco!" },
    ],
  },
};
