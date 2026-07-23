// ============================================================================
// Roteiros de cena (Living Scene v2) — 1 CORÍNTIOS, capítulo por capítulo.
// Carta de Paulo à igreja de Corinto: divisões e a cruz como sabedoria de
// Deus, o corpo como templo do Espírito, o amor (cap.13), a ceia do Senhor
// e a ressurreição dos mortos (cap.15). Puramente visual/narrativo — não
// toca em progresso. Segue o padrão de Êxodo (rpgExodusScenes).
// ============================================================================

import type { ChapterScript, V2Actor, V2Prop, SceneState } from "@/lib/rpgLivingV2";

const F = (x: number, role: V2Actor["role"], action: V2Actor["action"], palette?: V2Actor["palette"], extra: Partial<V2Actor> = {}): V2Actor => ({ x, role, action, palette, ...extra });
const AN = (x: number, animal: NonNullable<V2Actor["animal"]>, scale = 1, color?: string): V2Actor => ({ x, kind: "animal", animal, scale, color });
const P = (kind: string, x: number, scale = 1, fire?: number): V2Prop => ({ kind, x, scale, ...(fire != null ? { fire } : {}) });
const kf = (v: number, state: SceneState) => ({ v, state });

export const CORINTHIANS1_SCENES: Record<number, ChapterScript> = {
  1: {
    keyframes: [
      kf(1, { terrain: "city", props: [P("tablets", 0.62)], actors: [F(0.4, "man", "stand", "white")] }),
      kf(10, { terrain: "city", crowd: 0.7, actors: [F(0.3, "man", "raise", "brown"), F(0.55, "man", "stand", "sand"), F(0.72, "man", "stand", "gray")] }),
      kf(18, { terrain: "city", glory: 0.6, props: [P("cross", 0.5, 1.2)], actors: [F(0.4, "man", "kneel", "white")] }),
    ],
    beats: [
      { upTo: 9, reaction: "Paulo saúda a igreja de Deus em Corinto. ✍️" },
      { upTo: 17, reaction: "'Estais divididos?' — não há de ser assim! 🕊️" },
      { upTo: 99, reaction: "A cruz: loucura para os que perecem, poder de Deus para nós. ✝️" },
    ],
  },
  2: {
    keyframes: [
      kf(1, { terrain: "city", props: [P("cross", 0.55)], actors: [F(0.4, "man", "stand", "white")] }),
      kf(6, { terrain: "city", glory: 0.5, actors: [F(0.42, "man", "raise", "white")] }),
      kf(10, { terrain: "city", glory: 0.7, props: [P("dove", 0.5)], actors: [F(0.4, "man", "kneel", "white")] }),
    ],
    beats: [
      { upTo: 5, reaction: "Paulo prega Cristo, e este crucificado. ✝️" },
      { upTo: 9, reaction: "'Nem olhos viram o que Deus preparou aos que o amam.' ✨" },
      { upTo: 99, reaction: "O Espírito revela as coisas profundas de Deus. 🕊️" },
    ],
  },
  3: {
    keyframes: [
      kf(1, { terrain: "field", actors: [F(0.35, "man", "stand", "white"), F(0.6, "man", "kneel", "green")] }),
      kf(9, { terrain: "city", props: [P("tower", 0.6, 1.1)], actors: [F(0.35, "man", "carry", "brown")] }),
      kf(16, { terrain: "city", glory: 0.5, props: [P("altar", 0.55)], actors: [F(0.42, "man", "stand", "white")] }),
    ],
    beats: [
      { upTo: 8, reaction: "Um planta, outro rega, mas Deus dá o crescimento. 🌱" },
      { upTo: 15, reaction: "Cada um edifique com cuidado — o fundamento é Cristo. 🧱" },
      { upTo: 99, reaction: "'Sois templo de Deus, e o Espírito habita em vós.' 🏛️" },
    ],
  },
  4: {
    keyframes: [
      kf(1, { terrain: "city", actors: [F(0.4, "man", "stand", "white"), F(0.62, "servant", "stand", "sand")] }),
      kf(9, { terrain: "city", crowd: 0.6, actors: [F(0.4, "man", "mourn", "gray")] }),
      kf(14, { terrain: "city", actors: [F(0.38, "man", "raise", "white"), F(0.6, "man", "stand", "brown")] }),
    ],
    beats: [
      { upTo: 8, reaction: "Fiéis despenseiros dos mistérios de Deus. 🗝️" },
      { upTo: 13, reaction: "Os apóstolos, feitos espetáculo ao mundo. 😔" },
      { upTo: 99, reaction: "'Como filhos amados, eu vos admoesto.' 🤍" },
    ],
  },
  5: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.3, actors: [F(0.4, "man", "mourn", "white"), F(0.66, "man", "stand", "sand")] }),
      kf(6, { terrain: "city", props: [P("basket", 0.55)], actors: [F(0.42, "man", "stand", "brown")] }),
    ],
    beats: [
      { upTo: 5, reaction: "Há pecado grave tolerado na igreja. 😟" },
      { upTo: 99, reaction: "'Um pouco de fermento leveda toda a massa' — purificai-vos. 🍞" },
    ],
  },
  6: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.5, actors: [F(0.35, "man", "stand", "brown"), F(0.6, "elder", "stand", "gray")] }),
      kf(12, { terrain: "city", glory: 0.5, props: [P("altar", 0.55)], actors: [F(0.42, "man", "kneel", "white")] }),
    ],
    beats: [
      { upTo: 11, reaction: "Por que levar o irmão a tribunais? ⚖️" },
      { upTo: 99, reaction: "'O vosso corpo é templo do Espírito Santo.' 🏛️✨" },
    ],
  },
  7: {
    keyframes: [
      kf(1, { terrain: "city", actors: [F(0.38, "man", "stand", "brown"), F(0.58, "woman", "stand", "blue")] }),
      kf(25, { terrain: "city", actors: [F(0.4, "man", "stand", "white")] }),
    ],
    beats: [
      { upTo: 16, reaction: "Sobre o casamento: honra e fidelidade. 💍" },
      { upTo: 99, reaction: "Cada um permaneça como o Senhor o chamou. 🤍" },
    ],
  },
  8: {
    keyframes: [
      kf(1, { terrain: "city", props: [P("altar", 0.6)], actors: [F(0.4, "man", "stand", "white")] }),
      kf(9, { terrain: "city", actors: [F(0.35, "man", "stand", "brown"), F(0.6, "man", "kneel", "sand")] }),
    ],
    beats: [
      { upTo: 8, reaction: "O conhecimento incha, mas o amor edifica. 💡" },
      { upTo: 99, reaction: "Não sejas tropeço para o irmão mais fraco. 🤝" },
    ],
  },
  9: {
    keyframes: [
      kf(1, { terrain: "city", actors: [F(0.4, "man", "raise", "white")] }),
      kf(19, { terrain: "plain", actors: [F(0.35, "man", "walk", "brown"), F(0.6, "man", "stand", "sand")] }),
      kf(24, { terrain: "field", actors: [F(0.4, "man", "walk", "white", { facing: 1 })] }),
    ],
    beats: [
      { upTo: 18, reaction: "Paulo abre mão de direitos por causa do evangelho. ✍️" },
      { upTo: 23, reaction: "'Fiz-me tudo para todos, para salvar alguns.' 🤍" },
      { upTo: 99, reaction: "Correi de tal maneira que alcanceis o prêmio! 🏃🏆" },
    ],
  },
  10: {
    keyframes: [
      kf(1, { terrain: "desert", crowd: 0.5, props: [P("pillarCloud", 0.5, 1)], actors: [F(0.35, "man", "walk", "brown")] }),
      kf(14, { terrain: "city", actors: [F(0.4, "man", "raise", "white")] }),
      kf(23, { terrain: "city", props: [P("altar", 0.6)], actors: [F(0.42, "man", "stand", "white")] }),
    ],
    beats: [
      { upTo: 13, reaction: "O deserto de Israel é advertência para nós. ☁️" },
      { upTo: 22, reaction: "Fugi da idolatria; a mesa do Senhor é santa. 🍷" },
      { upTo: 99, reaction: "'Fazei tudo para a glória de Deus.' ✨" },
    ],
  },
  11: {
    keyframes: [
      kf(1, { terrain: "city", actors: [F(0.35, "man", "stand", "white"), F(0.6, "woman", "stand", "blue")] }),
      kf(23, { terrain: "city", night: 0.35, glory: 0.4, props: [P("altar", 0.5)], actors: [F(0.4, "man", "kneel", "white")] }),
    ],
    beats: [
      { upTo: 22, reaction: "Sobre a ordem e o respeito na assembleia. 🕊️" },
      { upTo: 99, reaction: "'Isto é o meu corpo... fazei isto em memória de mim.' 🍞🍷" },
    ],
  },
  12: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.4, props: [P("dove", 0.55)], actors: [F(0.4, "man", "stand", "white")] }),
      kf(12, { terrain: "city", crowd: 0.7, actors: [F(0.3, "man", "stand", "brown"), F(0.5, "woman", "stand", "green"), F(0.72, "elder", "stand", "gray")] }),
    ],
    beats: [
      { upTo: 11, reaction: "Há diversos dons, mas um só Espírito. 🕊️" },
      { upTo: 99, reaction: "Muitos membros, um só corpo em Cristo. 🤝" },
    ],
  },
  13: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.6, actors: [F(0.4, "man", "stand", "white")] }),
      kf(4, { terrain: "garden", glory: 0.7, props: [P("dove", 0.5)], actors: [F(0.4, "man", "raise", "white")] }),
      kf(13, { terrain: "garden", glory: 0.85, props: [P("dove", 0.5)], actors: [F(0.42, "man", "kneel", "white")] }),
    ],
    beats: [
      { upTo: 3, reaction: "Sem amor, nada sou. 🤍" },
      { upTo: 12, reaction: "'O amor é paciente, é benigno...' — nunca falha. 🕊️" },
      { upTo: 99, reaction: "O maior de todos é o amor. ✨" },
    ],
  },
  14: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.6, actors: [F(0.4, "man", "raise", "white")] }),
      kf(26, { terrain: "city", crowd: 0.6, props: [P("altar", 0.6)], actors: [F(0.35, "man", "stand", "brown"), F(0.6, "elder", "stand", "gray")] }),
    ],
    beats: [
      { upTo: 25, reaction: "Buscai a profecia, que edifica a igreja. 🗣️" },
      { upTo: 99, reaction: "'Tudo se faça com decência e ordem.' ✅" },
    ],
  },
  15: {
    keyframes: [
      kf(1, { terrain: "city", props: [P("cross", 0.55)], actors: [F(0.4, "man", "stand", "white")] }),
      kf(3, { terrain: "garden", glory: 0.6, props: [P("tomb", 0.55, 1.2)], actors: [F(0.4, "man", "stand", "white")] }),
      kf(20, { terrain: "garden", glory: 0.8, props: [P("tomb", 0.5, 1.1)], actors: [F(0.42, "man", "raise", "white")] }),
      kf(51, { terrain: "city", glory: 0.9, actors: [F(0.4, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 2, reaction: "O evangelho que Paulo recebeu e entregou. ✍️" },
      { upTo: 19, reaction: "Cristo ressuscitou dentre os mortos! ⚰️✨" },
      { upTo: 50, reaction: "Assim como em Adão todos morrem, em Cristo todos viverão. 🌱" },
      { upTo: 99, reaction: "'Onde está, ó morte, a tua vitória?' — venceremos! 🎺✨" },
    ],
  },
  16: {
    keyframes: [
      kf(1, { terrain: "city", props: [P("basket", 0.6)], actors: [F(0.4, "man", "stand", "brown"), F(0.62, "servant", "carry", "sand")] }),
      kf(19, { terrain: "city", crowd: 0.5, actors: [F(0.4, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 18, reaction: "Coleta para os santos; Paulo planeja a visita. 🎁" },
      { upTo: 99, reaction: "'Vigiai, permanecei firmes na fé.' A graça esteja convosco! 🤍" },
    ],
  },
};
