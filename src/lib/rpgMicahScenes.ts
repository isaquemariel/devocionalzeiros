// ============================================================================
// Roteiros de cena (Living Scene v2) — MIQUÉIAS, capítulo por capítulo.
// O juízo do SENHOR contra Samaria e Jerusalém pela injustiça, o monte da
// casa do SENHOR e as espadas convertidas em arados, Belém de onde virá o
// Governador, e o que o SENHOR pede: praticar a justiça e amar a misericórdia.
// Puramente visual/narrativo — não toca em progresso.
// Segue o padrão de Êxodo (rpgExodusScenes).
// ============================================================================

import type { ChapterScript, V2Actor, V2Prop, SceneState } from "@/lib/rpgLivingV2";

const F = (x: number, role: V2Actor["role"], action: V2Actor["action"], palette?: V2Actor["palette"], extra: Partial<V2Actor> = {}): V2Actor => ({ x, role, action, palette, ...extra });
const AN = (x: number, animal: NonNullable<V2Actor["animal"]>, scale = 1, color?: string): V2Actor => ({ x, kind: "animal", animal, scale, color });
const P = (kind: string, x: number, scale = 1, fire?: number): V2Prop => ({ kind, x, scale, ...(fire != null ? { fire } : {}) });
const kf = (v: number, state: SceneState) => ({ v, state });

export const MICAH_SCENES: Record<number, ChapterScript> = {
  1: {
    keyframes: [
      kf(1, { terrain: "mountain", glory: 0.6, actors: [F(0.4, "man", "stand", "brown")] }),
      kf(3, { terrain: "mountain", glory: 0.8, fire: 0.4, props: [P("smoke", 0.5, 2)], actors: [F(0.42, "man", "raise", "brown")] }),
      kf(6, { terrain: "city", fire: 0.5, actors: [F(0.7, "elder", "mourn", "gray")] }),
      kf(16, { terrain: "hills", night: 0.3, actors: [F(0.4, "woman", "mourn", "gray"), F(0.6, "man", "mourn", "sand")] }),
    ],
    beats: [
      { upTo: 2, reaction: "Ouvi, todos os povos: o SENHOR sai do seu santo templo. 👂" },
      { upTo: 5, god: "Desço e piso os altos da terra por causa da transgressão de Jacó.", reaction: "Os montes se derretem diante dele. ⛰️🔥" },
      { upTo: 9, reaction: "Samaria vira um montão de ruínas; a ferida chega a Jerusalém. 💔" },
      { upTo: 99, reaction: "Faze-te calva e pranteia por teus filhos: eles vão ao cativeiro. 😢" },
    ],
  },
  2: {
    keyframes: [
      kf(1, { terrain: "field", night: 0.4, actors: [F(0.35, "man", "stand", "purple"), F(0.6, "man", "carry", "sand")] }),
      kf(2, { terrain: "field", actors: [F(0.3, "man", "raise", "purple"), F(0.55, "man", "mourn", "brown"), F(0.72, "woman", "mourn", "gray")] }),
      kf(12, { terrain: "hills", crowd: 0.6, glory: 0.4, actors: [F(0.4, "shepherd", "raise", "white"), AN(0.66, "sheep"), AN(0.82, "sheep")] }),
    ],
    beats: [
      { upTo: 5, reaction: "Ai dos que, deitados, tramam iniquidade e cobiçam campos! 😠" },
      { upTo: 11, god: "Contra esta família estou planejando um mal do qual não fugireis.", reaction: "Roubam casas e heranças do povo. ⚖️" },
      { upTo: 99, god: "Reunirei todo o Jacó, ajuntarei o remanescente de Israel.", reaction: "O SENHOR promete recolher o seu rebanho. 🐑" },
    ],
  },
  3: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.3, actors: [F(0.3, "king", "stand", "purple"), F(0.55, "man", "mourn", "sand"), F(0.72, "man", "mourn", "gray")] }),
      kf(5, { terrain: "city", night: 0.4, actors: [F(0.4, "man", "raise", "red"), F(0.66, "elder", "stand", "gray")] }),
      kf(12, { terrain: "field", mourn: 0.6, actors: [F(0.45, "man", "mourn", "brown")] }),
    ],
    beats: [
      { upTo: 4, reaction: "Ouvi, chefes: aborreceis o bem e amais o mal. 😔" },
      { upTo: 8, god: "Estou cheio do poder do Espírito, para anunciar a Jacó a sua transgressão.", reaction: "Falsos profetas por dinheiro; Miquéias fala a verdade. 🗣️" },
      { upTo: 99, reaction: "Sião será lavrada como um campo, e Jerusalém, um montão de ruínas. 🌾💔" },
    ],
  },
  4: {
    keyframes: [
      kf(1, { terrain: "mountain", glory: 0.9, crowd: 0.7, props: [P("altar", 0.5, 1.2)], actors: [F(0.5, "man", "raise", "white")] }),
      kf(3, { terrain: "mountain", glory: 0.7, crowd: 0.6, actors: [F(0.35, "man", "stand", "brown"), F(0.6, "man", "kneel", "sand")] }),
      kf(4, { terrain: "hills", glory: 0.5, props: [P("tree", 0.3), P("palm", 0.72)], actors: [F(0.45, "man", "stand", "green")] }),
      kf(9, { terrain: "city", night: 0.3, crowd: 0.5, actors: [F(0.4, "woman", "mourn", "gray")] }),
    ],
    beats: [
      { upTo: 2, god: "De Sião sairá a lei, e a palavra do SENHOR, de Jerusalém.", reaction: "O monte da casa do SENHOR se firma no alto; as nações afluem. ⛰️✨" },
      { upTo: 4, reaction: "Das espadas farão arados; ninguém aprenderá mais a guerra. ⚔️➡️🌾" },
      { upTo: 8, reaction: "Cada um sob a sua videira e figueira, sem susto. 🍇" },
      { upTo: 99, god: "Levanta-te e trilha, ó filha de Sião: eu te resgatarei.", reaction: "Da angústia à libertação em Babilônia. 🙌" },
    ],
  },
  5: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.5, glory: 0.4, actors: [F(0.4, "man", "stand", "brown")] }),
      kf(2, { terrain: "city", night: 0.6, glory: 0.7, props: [P("star", 0.5, 1.1)], actors: [F(0.45, "shepherd", "stand", "white")] }),
      kf(4, { terrain: "hills", glory: 0.5, actors: [F(0.4, "shepherd", "raise", "white"), AN(0.64, "sheep"), AN(0.8, "sheep")] }),
      kf(10, { terrain: "field", actors: [F(0.4, "man", "raise", "brown")] }),
    ],
    beats: [
      { upTo: 1, reaction: "Ferem com a vara a face do juiz de Israel. 😔" },
      { upTo: 3, god: "De ti, Belém Efrata, me sairá o que há de reinar em Israel.", reaction: "De Belém virá o Governador; suas origens são de eternidade. 🌟" },
      { upTo: 9, reaction: "Ele apascentará na força do SENHOR; e ele será a paz. 🐑☮️" },
      { upTo: 99, god: "Exterminarei do meio de ti as tuas imagens de escultura.", reaction: "Deus purifica o povo dos ídolos. 🔥" },
    ],
  },
  6: {
    keyframes: [
      kf(1, { terrain: "mountain", glory: 0.5, actors: [F(0.4, "man", "raise", "brown")] }),
      kf(6, { terrain: "hills", props: [P("altar", 0.55, 1)], actors: [F(0.4, "man", "kneel", "sand"), AN(0.68, "ox", 0.9)] }),
      kf(8, { terrain: "field", glory: 0.6, actors: [F(0.45, "man", "stand", "white")] }),
      kf(10, { terrain: "city", night: 0.3, actors: [F(0.35, "man", "raise", "purple"), F(0.6, "man", "mourn", "gray")] }),
    ],
    beats: [
      { upTo: 5, god: "Povo meu, que te fiz eu? Testemunha contra mim!", reaction: "O SENHOR contende com o seu povo diante dos montes. ⚖️" },
      { upTo: 7, reaction: "Com que me apresentarei ao SENHOR? Com milhares de carneiros? 🐏" },
      { upTo: 9, god: "Que é que o SENHOR pede de ti: pratica a justiça, ama a misericórdia e anda humildemente com o teu Deus.", reaction: "O coração da fé em três palavras. 🤍" },
      { upTo: 99, reaction: "Balanças enganosas e violência: a cidade será punida. 😔" },
    ],
  },
  7: {
    keyframes: [
      kf(1, { terrain: "field", mourn: 0.6, night: 0.4, actors: [F(0.45, "man", "mourn", "gray")] }),
      kf(7, { terrain: "hills", glory: 0.4, actors: [F(0.42, "man", "raise", "brown")] }),
      kf(14, { terrain: "hills", glory: 0.5, props: [P("tree", 0.7)], actors: [F(0.4, "shepherd", "stand", "white"), AN(0.66, "sheep")] }),
      kf(18, { terrain: "mountain", glory: 0.8, actors: [F(0.45, "man", "kneel", "brown")] }),
    ],
    beats: [
      { upTo: 6, reaction: "Ai de mim! O piedoso desapareceu da terra. 😢" },
      { upTo: 10, god: undefined, reaction: "Eu, porém, esperarei no SENHOR; o meu Deus me ouvirá. 🙏" },
      { upTo: 17, god: "Apascenta o teu povo com o teu cajado, como nos dias antigos.", reaction: "Deus mostrará maravilhas ao seu rebanho. 🐑✨" },
      { upTo: 99, god: "Tu lançarás todos os pecados nas profundezas do mar.", reaction: "Quem é Deus como tu, que perdoa e se compraz na misericórdia? 🌊🤍" },
    ],
  },
};
