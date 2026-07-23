// ============================================================================
// Roteiros de cena (Living Scene v2) — ESDRAS, capítulo por capítulo.
// O decreto de Ciro liberta os exilados, a volta a Jerusalém, a reconstrução
// do altar e dos alicerces do templo, a oposição que paralisa a obra, o
// recomeço, a conclusão e dedicação da Casa do SENHOR, e Esdras que chega,
// ensina a Lei e conduz o povo ao arrependimento. Puramente visual/narrativo.
// Segue o padrão de Êxodo (rpgExodusScenes).
// ============================================================================

import type { ChapterScript, V2Actor, V2Prop, SceneState } from "@/lib/rpgLivingV2";

const F = (x: number, role: V2Actor["role"], action: V2Actor["action"], palette?: V2Actor["palette"], extra: Partial<V2Actor> = {}): V2Actor => ({ x, role, action, palette, ...extra });
const AN = (x: number, animal: NonNullable<V2Actor["animal"]>, scale = 1, color?: string): V2Actor => ({ x, kind: "animal", animal, scale, color });
const P = (kind: string, x: number, scale = 1, fire?: number): V2Prop => ({ kind, x, scale, ...(fire != null ? { fire } : {}) });
const kf = (v: number, state: SceneState) => ({ v, state });

export const EZRA_SCENES: Record<number, ChapterScript> = {
  1: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.4, props: [P("tower", 0.82, 1.1)], actors: [F(0.4, "king", "raise", "gold"), F(0.62, "servant", "stand", "sand")] }),
      kf(3, { terrain: "city", glory: 0.6, crowd: 0.7, actors: [F(0.4, "king", "raise", "gold"), F(0.66, "man", "stand", "brown")] }),
      kf(7, { terrain: "city", glory: 0.5, crowd: 0.6, props: [P("lampstand", 0.68, 1, 1)], actors: [F(0.34, "servant", "carry", "sand"), F(0.56, "man", "carry", "purple")] }),
    ],
    beats: [
      { upTo: 2, god: "O SENHOR despertou o espírito de Ciro, rei da Pérsia.", reaction: "Ciro proclama: 'O SENHOR me encarregou de edificar-lhe uma casa!' 👑" },
      { upTo: 6, reaction: "Israel pode voltar a Jerusalém e reconstruir o templo. ✨" },
      { upTo: 99, reaction: "Ciro devolve os utensílios de ouro tomados por Nabucodonosor. 🕎" },
    ],
  },
  2: {
    keyframes: [
      kf(1, { terrain: "desert", crowd: 0.8, actors: [F(0.3, "man", "walk", "brown"), F(0.5, "elder", "walk", "gray"), F(0.7, "man", "walk", "sand")] }),
      kf(64, { terrain: "plain", crowd: 0.85, actors: [F(0.35, "man", "carry", "brown"), F(0.58, "woman", "carry", "green"), AN(0.8, "camel", 0.9)] }),
      kf(68, { terrain: "city", crowd: 0.6, props: [P("altar", 0.7)], actors: [F(0.4, "elder", "bow", "gray")] }),
    ],
    beats: [
      { upTo: 63, reaction: "A relação dos que voltam do exílio, família por família. 📜" },
      { upTo: 67, reaction: "Quase cinquenta mil pessoas retornam à terra dos pais. 🐫" },
      { upTo: 99, reaction: "Ao chegar, oferecem donativos para a Casa de Deus. 🎁" },
    ],
  },
  3: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.7, props: [P("altar", 0.5, 1.1, 0.8)], actors: [F(0.32, "man", "stand", "gold"), F(0.56, "elder", "raise", "gray")] }),
      kf(3, { terrain: "city", crowd: 0.6, props: [P("altar", 0.5, 1.2, 1)], actors: [F(0.34, "man", "raise", "gold"), AN(0.66, "ox", 0.9)] }),
      kf(10, { terrain: "city", crowd: 0.7, glory: 0.3, props: [P("altar", 0.28, 1, 0.6), P("tower", 0.7, 1.1)], actors: [F(0.4, "man", "raise", "white"), F(0.6, "man", "stand", "brown")] }),
      kf(12, { terrain: "city", crowd: 0.7, glory: 0.4, props: [P("tower", 0.72, 1.1)], actors: [F(0.32, "elder", "mourn", "gray"), F(0.58, "man", "raise", "brown")] }),
    ],
    beats: [
      { upTo: 6, reaction: "Josué e Zorobabel reerguem o altar e recomeçam os sacrifícios. 🔥" },
      { upTo: 9, reaction: "Lançam os alicerces do templo do SENHOR. 🧱" },
      { upTo: 11, reaction: "Cantam: 'Ele é bom; a sua misericórdia dura para sempre!' 🎶" },
      { upTo: 99, reaction: "Os velhos choram e os jovens gritam de alegria — tudo se mistura. 😢🎉" },
    ],
  },
  4: {
    keyframes: [
      kf(1, { terrain: "city", props: [P("tower", 0.72, 1)], actors: [F(0.34, "man", "stand", "brown"), F(0.62, "man", "stand", "red", { facing: -1 })] }),
      kf(4, { terrain: "city", night: 0.2, actors: [F(0.36, "man", "mourn", "brown"), F(0.64, "man", "raise", "red", { facing: -1 })] }),
      kf(23, { terrain: "city", night: 0.35, props: [P("tower", 0.7, 0.9)], actors: [F(0.44, "man", "stand", "brown")] }),
    ],
    beats: [
      { upTo: 3, reaction: "Adversários se oferecem para ajudar, mas são recusados. ✋" },
      { upTo: 16, reaction: "Eles enfraquecem as mãos do povo e acusam-no ao rei. 📩" },
      { upTo: 99, reaction: "Por ordem real, a obra do templo para. A construção cessa. 🚧" },
    ],
  },
  5: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.4, actors: [F(0.32, "elder", "raise", "white"), F(0.5, "elder", "raise", "gray")] }),
      kf(2, { terrain: "city", crowd: 0.6, props: [P("tower", 0.7, 1.1)], actors: [F(0.34, "man", "carry", "brown"), F(0.58, "man", "carry", "sand")] }),
      kf(3, { terrain: "city", props: [P("tower", 0.7, 1)], actors: [F(0.34, "man", "stand", "brown"), F(0.64, "servant", "stand", "purple")] }),
    ],
    beats: [
      { upTo: 2, god: "Os profetas Ageu e Zacarias profetizam em nome do Deus de Israel.", reaction: "A obra recomeça com novo ânimo! 🛠️" },
      { upTo: 5, reaction: "Os olhos de Deus velam pelos anciãos, e ninguém os detém. 👁️" },
      { upTo: 99, reaction: "Perguntam quem os autorizou; escrevem ao rei Dario. 📜" },
    ],
  },
  6: {
    keyframes: [
      kf(1, { terrain: "city", actors: [F(0.4, "king", "stand", "purple"), F(0.64, "servant", "kneel", "sand")] }),
      kf(13, { terrain: "city", crowd: 0.6, props: [P("tower", 0.72, 1.2)], actors: [F(0.32, "man", "carry", "brown"), F(0.56, "man", "raise", "sand")] }),
      kf(15, { terrain: "city", glory: 0.6, crowd: 0.7, props: [P("tower", 0.7, 1.3), P("altar", 0.3, 1, 0.8)], actors: [F(0.42, "man", "raise", "white")] }),
      kf(16, { terrain: "city", glory: 0.8, crowd: 0.8, props: [P("altar", 0.5, 1.2, 1)], actors: [F(0.34, "man", "raise", "gold"), F(0.6, "elder", "bow", "gray")] }),
    ],
    beats: [
      { upTo: 12, reaction: "Acha-se o rolo de Ciro; Dario confirma e ordena ajudar a obra. 📜" },
      { upTo: 14, reaction: "Os anciãos edificam e prosperam pela palavra dos profetas. 🧱" },
      { upTo: 18, reaction: "O templo é concluído e dedicado com grande alegria! ✨🎉" },
      { upTo: 99, reaction: "Celebram a Páscoa, purificados, cheios de júbilo. 🐑" },
    ],
  },
  7: {
    keyframes: [
      kf(1, { terrain: "city", actors: [F(0.4, "man", "stand", "white"), F(0.62, "elder", "stand", "gray")] }),
      kf(6, { terrain: "city", glory: 0.4, props: [P("tablets", 0.66, 1)], actors: [F(0.4, "man", "raise", "white")] }),
      kf(9, { terrain: "desert", glory: 0.3, crowd: 0.5, actors: [F(0.34, "man", "walk", "white"), F(0.58, "elder", "walk", "gray")] }),
    ],
    beats: [
      { upTo: 5, reaction: "Esdras, sacerdote e escriba, versado na Lei de Moisés. 📖" },
      { upTo: 10, god: undefined, reaction: "Ele dispôs o coração para buscar e ensinar a Lei do SENHOR. 🤍" },
      { upTo: 99, reaction: "O rei Artaxerxes concede tudo o que Esdras pede. 👑" },
    ],
  },
  8: {
    keyframes: [
      kf(1, { terrain: "river", crowd: 0.7, props: [P("reeds", 0.18), P("reeds", 0.82)], actors: [F(0.4, "man", "stand", "white"), F(0.62, "elder", "stand", "gray")] }),
      kf(21, { terrain: "river", glory: 0.3, props: [P("reeds", 0.2)], actors: [F(0.44, "man", "kneel", "white"), F(0.66, "man", "kneel", "brown")] }),
      kf(31, { terrain: "desert", crowd: 0.7, actors: [F(0.32, "man", "walk", "white"), AN(0.6, "camel", 0.9), F(0.82, "servant", "carry", "sand")] }),
      kf(33, { terrain: "city", glory: 0.4, props: [P("lampstand", 0.68, 1, 1)], actors: [F(0.4, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 20, reaction: "Esdras reúne o povo junto ao rio Aava. 🌊" },
      { upTo: 23, reaction: "Proclamam jejum, buscando de Deus caminho seguro. 🙏" },
      { upTo: 32, reaction: "A mão de Deus os guarda dos inimigos na jornada. 🛡️" },
      { upTo: 99, reaction: "Chegam a Jerusalém e entregam o ouro e a prata na Casa. 🕎" },
    ],
  },
  9: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.2, actors: [F(0.4, "man", "mourn", "white"), F(0.64, "man", "stand", "brown")] }),
      kf(3, { terrain: "city", night: 0.35, actors: [F(0.44, "man", "mourn", "white")] }),
      kf(5, { terrain: "city", glory: 0.3, props: [P("altar", 0.6, 1, 0.5)], actors: [F(0.42, "man", "kneel", "white")] }),
    ],
    beats: [
      { upTo: 2, reaction: "Denunciam a Esdras: o povo se misturou com os pagãos. 😔" },
      { upTo: 4, reaction: "Esdras rasga as vestes e arranca os cabelos, atônito. 😢" },
      { upTo: 99, god: undefined, reaction: "De joelhos, confessa: 'Deus meu, envergonho-me diante de ti.' 🙏" },
    ],
  },
  10: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.7, actors: [F(0.4, "man", "kneel", "white"), F(0.62, "man", "mourn", "brown")] }),
      kf(9, { terrain: "city", storm: 0.4, rain: 0.6, crowd: 0.8, props: [P("tablets", 0.7, 1)], actors: [F(0.36, "man", "raise", "white"), F(0.6, "man", "mourn", "sand")] }),
      kf(11, { terrain: "city", glory: 0.4, crowd: 0.7, props: [P("tablets", 0.7, 1.1)], actors: [F(0.4, "man", "raise", "white")] }),
      kf(12, { terrain: "city", glory: 0.6, crowd: 0.8, actors: [F(0.34, "man", "raise", "brown"), F(0.6, "elder", "bow", "gray")] }),
    ],
    beats: [
      { upTo: 8, reaction: "O povo chora amargamente junto com Esdras. 😢" },
      { upTo: 10, reaction: "Reunidos sob a chuva, tremem diante da Lei. 🌧️📜" },
      { upTo: 11, god: undefined, reaction: "'Confessai ao SENHOR e apartai-vos do pecado!' ✨" },
      { upTo: 99, reaction: "O povo responde: 'Faremos conforme a tua palavra.' 🤍" },
    ],
  },
};
