// ============================================================================
// Roteiros de cena (Living Scene v2) — ZACARIAS, capítulo por capítulo.
// As visões noturnas: o homem entre as murtas e os cavalos, o candelabro de
// ouro e as duas oliveiras, o sumo sacerdote Josué com vestes limpas; "não por
// força nem violência, mas pelo meu Espírito"; o Rei humilde no jumentinho;
// "olharão para aquele a quem traspassaram"; e o SENHOR rei sobre toda a terra.
// Puramente visual/narrativo — não toca em progresso. Segue o padrão de Êxodo.
// ============================================================================

import type { ChapterScript, V2Actor, V2Prop, SceneState } from "@/lib/rpgLivingV2";

const F = (x: number, role: V2Actor["role"], action: V2Actor["action"], palette?: V2Actor["palette"], extra: Partial<V2Actor> = {}): V2Actor => ({ x, role, action, palette, ...extra });
const AN = (x: number, animal: NonNullable<V2Actor["animal"]>, scale = 1, color?: string): V2Actor => ({ x, kind: "animal", animal, scale, color });
const P = (kind: string, x: number, scale = 1, fire?: number): V2Prop => ({ kind, x, scale, ...(fire != null ? { fire } : {}) });
const kf = (v: number, state: SceneState) => ({ v, state });

export const ZECHARIAH_SCENES: Record<number, ChapterScript> = {
  1: {
    keyframes: [
      kf(1, { terrain: "hills", actors: [F(0.4, "elder", "raise", "gray"), F(0.62, "man", "stand", "brown")] }),
      kf(8, { terrain: "garden", night: 0.75, glory: 0.2, props: [P("tree", 0.18), P("tree", 0.32), P("tree", 0.8)], actors: [F(0.5, "angel", "stand", "white"), F(0.68, "warrior", "stand", "red"), F(0.84, "warrior", "stand", "white")] }),
      kf(18, { terrain: "hills", night: 0.45, actors: [F(0.35, "warrior", "stand", "gray"), F(0.6, "man", "stand", "brown")] }),
    ],
    beats: [
      { upTo: 6, god: "Voltai para mim, e eu voltarei para vós, diz o SENHOR.", reaction: "O chamado ao arrependimento. 🤍" },
      { upTo: 17, god: "Tenho grande zelo por Jerusalém e por Sião.", reaction: "Visão noturna: o homem entre as murtas e os cavalos. 🌙🐎" },
      { upTo: 99, reaction: "Quatro chifres e quatro ferreiros: o que espalhou será derrubado. ⚒️" },
    ],
  },
  2: {
    keyframes: [
      kf(1, { terrain: "plain", night: 0.35, actors: [F(0.4, "angel", "raise", "white"), F(0.62, "man", "stand", "brown")] }),
      kf(4, { terrain: "city", crowd: 0.6, actors: [F(0.38, "angel", "raise", "white"), F(0.66, "man", "walk", "brown")] }),
      kf(10, { terrain: "city", glory: 0.7, crowd: 0.5, actors: [F(0.5, "man", "raise", "brown")] }),
    ],
    beats: [
      { upTo: 5, god: "Serei para ela, diz o SENHOR, muro de fogo em redor.", reaction: "O anjo mede Jerusalém com um cordel. 📏" },
      { upTo: 9, reaction: "Jerusalém será habitada sem muros, transbordando de gente. 🏙️" },
      { upTo: 99, god: "Canta e alegra-te, ó filha de Sião, pois venho habitar no meio de ti.", reaction: "A promessa da presença de Deus. ✨" },
    ],
  },
  3: {
    keyframes: [
      kf(1, { terrain: "plain", night: 0.35, actors: [F(0.4, "man", "stand", "gray"), F(0.62, "angel", "stand", "white")] }),
      kf(4, { terrain: "plain", glory: 0.55, actors: [F(0.45, "man", "stand", "white"), F(0.66, "angel", "raise", "white")] }),
      kf(8, { terrain: "plain", glory: 0.75, props: [P("star", 0.7)], actors: [F(0.45, "man", "kneel", "white")] }),
    ],
    beats: [
      { upTo: 3, reaction: "O sumo sacerdote Josué diante do anjo, com vestes sujas. 😔" },
      { upTo: 7, god: "Tira-lhe as vestes sujas; fiz passar de ti a tua iniquidade.", reaction: "Josué recebe vestes limpas e o turbante puro. 🤍" },
      { upTo: 99, god: "Eis que farei vir o meu servo, o Renovo.", reaction: "A promessa do Renovo. 🌱" },
    ],
  },
  4: {
    keyframes: [
      kf(1, { terrain: "plain", night: 0.35, props: [P("lampstand", 0.5, 1.2, 1)], actors: [F(0.28, "angel", "stand", "white"), F(0.72, "man", "stand", "brown")] }),
      kf(3, { terrain: "plain", glory: 0.5, props: [P("tree", 0.28), P("lampstand", 0.5, 1.3, 1), P("tree", 0.72)], actors: [] }),
      kf(6, { terrain: "plain", glory: 0.85, props: [P("lampstand", 0.5, 1.3, 1)], actors: [F(0.5, "man", "raise", "brown")] }),
    ],
    beats: [
      { upTo: 5, reaction: "Visão do candelabro de ouro e das duas oliveiras. 🕎🫒" },
      { upTo: 10, god: "Não por força nem por violência, mas pelo meu Espírito, diz o SENHOR.", reaction: "A obra se completa pelo Espírito de Deus. 🌬️" },
      { upTo: 99, reaction: "As duas oliveiras: os ungidos que servem ao Senhor. 🫒" },
    ],
  },
  5: {
    keyframes: [
      kf(1, { terrain: "plain", night: 0.4, props: [P("tablets", 0.5, 1.2)], actors: [F(0.35, "angel", "raise", "white"), F(0.66, "man", "stand", "brown")] }),
      kf(5, { terrain: "field", night: 0.3, props: [P("basket", 0.5, 1.2)], actors: [F(0.4, "woman", "lie", "gray")] }),
      kf(9, { terrain: "field", night: 0.4, props: [P("basket", 0.5)], actors: [F(0.3, "angel", "raise", "white"), F(0.7, "angel", "raise", "white")] }),
    ],
    beats: [
      { upTo: 4, reaction: "O rolo voante: a maldição sobre o ladrão e o perjuro. 📜" },
      { upTo: 8, reaction: "A mulher dentro do efa é a impiedade. 🧺" },
      { upTo: 99, reaction: "Levam o efa para longe, à terra de Sinar. 🌫️" },
    ],
  },
  6: {
    keyframes: [
      kf(1, { terrain: "hills", night: 0.5, actors: [F(0.3, "warrior", "stand", "red"), F(0.5, "warrior", "stand", "gray"), F(0.72, "warrior", "stand", "white")] }),
      kf(8, { terrain: "hills", glory: 0.4, actors: [F(0.3, "warrior", "walk", "white"), F(0.6, "warrior", "walk", "gray")] }),
      kf(11, { terrain: "city", glory: 0.6, crowd: 0.4, actors: [F(0.5, "king", "stand", "gold")] }),
    ],
    beats: [
      { upTo: 8, reaction: "Quatro carros entre montes de bronze: os quatro ventos do céu. 🐎" },
      { upTo: 13, god: "Eis o homem cujo nome é Renovo; ele edificará o templo do SENHOR.", reaction: "Coroam Josué, o sumo sacerdote. 👑" },
      { upTo: 99, reaction: "Sacerdote e rei em concórdia de paz. 🤝" },
    ],
  },
  7: {
    keyframes: [
      kf(1, { terrain: "city", actors: [F(0.4, "man", "mourn", "gray"), F(0.62, "elder", "stand", "sand")] }),
      kf(8, { terrain: "city", crowd: 0.4, actors: [F(0.45, "elder", "raise", "white")] }),
      kf(11, { terrain: "hills", night: 0.3, actors: [F(0.4, "man", "walk", "brown")] }),
    ],
    beats: [
      { upTo: 7, reaction: "Perguntam: devemos jejuar e chorar como fazíamos? 😔" },
      { upTo: 10, god: "Executai juízo verdadeiro e usai de misericórdia uns com os outros.", reaction: "Deus deseja justiça, não rito vazio. ⚖️" },
      { upTo: 99, reaction: "Por endurecerem o coração, foram espalhados entre as nações. 🍃" },
    ],
  },
  8: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.4, actors: [F(0.5, "man", "stand", "brown")] }),
      kf(4, { terrain: "city", crowd: 0.5, actors: [F(0.3, "elder", "stand", "gray"), F(0.58, "child", "stand", "green"), F(0.78, "child", "walk", "sand")] }),
      kf(20, { terrain: "city", glory: 0.5, crowd: 0.75, actors: [F(0.4, "man", "walk", "brown"), F(0.62, "man", "walk", "blue")] }),
    ],
    beats: [
      { upTo: 3, god: "Voltei para Sião e habitarei em Jerusalém, a cidade da verdade.", reaction: "Deus promete restaurar Jerusalém. 🏙️" },
      { upTo: 8, god: "Ainda se assentarão anciãos nas praças, e meninos e meninas brincarão nas ruas.", reaction: "Paz e alegria nas ruas da cidade. 👶" },
      { upTo: 99, reaction: "Povos de muitas nações buscarão ao SENHOR em Jerusalém. 🌍" },
    ],
  },
  9: {
    keyframes: [
      kf(1, { terrain: "city", actors: [F(0.5, "warrior", "stand", "gray")] }),
      kf(9, { terrain: "city", glory: 0.5, crowd: 0.8, props: [P("palm", 0.18), P("palm", 0.84)], actors: [F(0.5, "king", "raise", "gold")] }),
      kf(14, { terrain: "hills", storm: 0.5, glory: 0.3, actors: [F(0.42, "warrior", "fight", "white", { facing: 1 })] }),
    ],
    beats: [
      { upTo: 8, reaction: "Juízo sobre as nações vizinhas. ⚔️" },
      { upTo: 10, god: "Alegra-te, ó filha de Sião! Eis que o teu Rei vem a ti, humilde, montado num jumentinho.", reaction: "O Rei humilde e salvador. 👑🌿" },
      { upTo: 99, god: "O SENHOR aparecerá sobre eles, e a sua flecha sairá como o relâmpago.", reaction: "Deus defende o seu povo. ⚡" },
    ],
  },
  10: {
    keyframes: [
      kf(1, { terrain: "field", rain: 0.5, actors: [F(0.5, "man", "raise", "brown")] }),
      kf(3, { terrain: "hills", actors: [F(0.4, "shepherd", "stand", "brown"), AN(0.62, "sheep"), AN(0.75, "sheep"), AN(0.88, "goat")] }),
      kf(6, { terrain: "hills", glory: 0.4, crowd: 0.5, actors: [F(0.4, "warrior", "stand", "white"), F(0.62, "man", "walk", "brown")] }),
    ],
    beats: [
      { upTo: 2, god: "Pedi ao SENHOR chuva no tempo das águas serôdias.", reaction: "Só o SENHOR dá a chuva e o pão. 🌧️" },
      { upTo: 5, god: "Contra os pastores se acendeu a minha ira; visitarei o meu rebanho.", reaction: "Deus cuidará de Judá na batalha. 🐎" },
      { upTo: 99, god: "Eu os fortalecerei no SENHOR, e no seu nome andarão.", reaction: "O povo disperso é reunido. 🤍" },
    ],
  },
  11: {
    keyframes: [
      kf(1, { terrain: "mountain", fire: 0.4, props: [P("tree", 0.3), P("tree", 0.7)], actors: [] }),
      kf(7, { terrain: "hills", props: [P("staff", 0.4), P("staff", 0.6)], actors: [F(0.5, "shepherd", "stand", "brown"), AN(0.74, "sheep")] }),
      kf(12, { terrain: "city", night: 0.3, actors: [F(0.5, "man", "stand", "gray"), F(0.68, "man", "stand", "sand")] }),
    ],
    beats: [
      { upTo: 6, reaction: "Uivai, ó cedros! O rebanho é entregue à matança. 🔥" },
      { upTo: 11, reaction: "O bom Pastor toma duas varas: Graça e União. 🪵" },
      { upTo: 99, reaction: "Pesam o preço: trinta moedas de prata. 🪙" },
    ],
  },
  12: {
    keyframes: [
      kf(1, { terrain: "city", storm: 0.4, actors: [F(0.5, "warrior", "stand", "gray")] }),
      kf(3, { terrain: "city", crowd: 0.5, actors: [F(0.4, "warrior", "fight", "white", { facing: 1 }), F(0.7, "warrior", "stand", "red")] }),
      kf(10, { terrain: "city", night: 0.4, glory: 0.3, actors: [F(0.4, "man", "mourn", "blue"), F(0.62, "woman", "mourn", "purple")] }),
    ],
    beats: [
      { upTo: 6, god: "Farei de Jerusalém um copo de tontear para todos os povos ao redor.", reaction: "Deus protege Jerusalém no cerco. 🛡️" },
      { upTo: 9, reaction: "Naquele dia buscarei destruir as nações que vierem contra a cidade. ⚔️" },
      { upTo: 99, god: "Olharão para mim, a quem traspassaram, e prantearão como por um filho único.", reaction: "Um pranto de arrependimento. 😢" },
    ],
  },
  13: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.4, props: [P("well", 0.5)], actors: [F(0.5, "man", "kneel", "white")] }),
      kf(7, { terrain: "hills", night: 0.4, actors: [F(0.45, "shepherd", "lie", "brown"), AN(0.7, "sheep"), AN(0.85, "sheep")] }),
      kf(9, { terrain: "hills", fire: 0.5, glory: 0.4, actors: [F(0.5, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 6, god: "Naquele dia haverá uma fonte aberta para lavar o pecado e a impureza.", reaction: "Uma fonte que purifica. 💧" },
      { upTo: 8, god: "Fere o pastor, e as ovelhas se dispersarão.", reaction: "O Pastor ferido, o rebanho espalhado. 🐑" },
      { upTo: 99, god: "Eu os purificarei como se purifica a prata. Dirão: O SENHOR é o meu Deus.", reaction: "O remanescente refinado pelo fogo. 🔥" },
    ],
  },
  14: {
    keyframes: [
      kf(1, { terrain: "city", storm: 0.5, crowd: 0.5, actors: [F(0.5, "warrior", "fight", "gray", { facing: -1 })] }),
      kf(4, { terrain: "mountain", glory: 0.6, props: [P("tree", 0.2), P("tree", 0.8)], actors: [F(0.5, "man", "stand", "white")] }),
      kf(8, { terrain: "river", glory: 0.6, actors: [F(0.5, "man", "raise", "white")] }),
      kf(9, { terrain: "mountain", glory: 0.95, crowd: 0.7, actors: [F(0.5, "king", "raise", "gold")] }),
      kf(16, { terrain: "mountain", glory: 0.7, crowd: 0.8, props: [P("tent", 0.3), P("tent", 0.72)], actors: [F(0.4, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 3, reaction: "Todas as nações se ajuntam contra Jerusalém. ⚔️" },
      { upTo: 8, god: "O monte das Oliveiras se fenderá ao meio; e correrão águas vivas de Jerusalém.", reaction: "O Senhor vem, e todos os santos com ele! ⛰️💧" },
      { upTo: 15, god: "O SENHOR será rei sobre toda a terra; naquele dia um será o SENHOR, e um o seu nome.", reaction: "O reinado universal de Deus! 👑" },
      { upTo: 99, reaction: "As nações sobem ano após ano para adorar o Rei na Festa dos Tabernáculos. ⛺🌍" },
    ],
  },
};
