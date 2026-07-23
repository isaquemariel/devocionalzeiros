// ============================================================================
// Roteiros de cena (Living Scene v2) — 1 CRÔNICAS, capítulo por capítulo.
// As genealogias de Adão a Israel, a morte de Saul, a ascensão de Davi, a arca
// trazida a Jerusalém com louvor, os valentes de Davi, a aliança davídica e os
// preparativos para o templo. Puramente visual/narrativo — não toca em progresso.
// Segue o padrão de Êxodo (rpgExodusScenes).
// ============================================================================

import type { ChapterScript, V2Actor, V2Prop, SceneState } from "@/lib/rpgLivingV2";

const F = (x: number, role: V2Actor["role"], action: V2Actor["action"], palette?: V2Actor["palette"], extra: Partial<V2Actor> = {}): V2Actor => ({ x, role, action, palette, ...extra });
const AN = (x: number, animal: NonNullable<V2Actor["animal"]>, scale = 1, color?: string): V2Actor => ({ x, kind: "animal", animal, scale, color });
const P = (kind: string, x: number, scale = 1, fire?: number): V2Prop => ({ kind, x, scale, ...(fire != null ? { fire } : {}) });
const kf = (v: number, state: SceneState) => ({ v, state });

export const CHRON1_SCENES: Record<number, ChapterScript> = {
  1: {
    keyframes: [
      kf(1, { terrain: "plain", glory: 0.3, actors: [F(0.4, "man", "stand", "brown"), F(0.6, "elder", "stand", "gray")] }),
      kf(24, { terrain: "plain", actors: [F(0.35, "elder", "walk", "white"), F(0.55, "man", "stand", "sand"), F(0.72, "child", "stand", "brown")] }),
      kf(34, { terrain: "field", crowd: 0.3, actors: [F(0.4, "elder", "stand", "gray"), F(0.62, "man", "stand", "brown")] }),
    ],
    beats: [
      { upTo: 23, reaction: "De Adão a Noé e Abraão — as raízes da humanidade. 📜" },
      { upTo: 33, reaction: "Os filhos de Abraão e as nações que deles vieram. 🌾" },
      { upTo: 99, reaction: "As gerações de Esaú e de Edom. 👥" },
    ],
  },
  2: {
    keyframes: [
      kf(1, { terrain: "plain", crowd: 0.3, actors: [F(0.35, "elder", "stand", "gray"), F(0.55, "man", "stand", "brown"), F(0.72, "man", "stand", "sand")] }),
      kf(10, { terrain: "field", actors: [F(0.4, "man", "walk", "brown"), F(0.62, "elder", "stand", "white")] }),
    ],
    beats: [
      { upTo: 9, reaction: "Os doze filhos de Israel e a descendência de Judá. 📜" },
      { upTo: 99, reaction: "A linhagem que chega até Jessé, pai de Davi. 🌿" },
    ],
  },
  3: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.3, actors: [F(0.4, "king", "stand", "gold"), F(0.62, "child", "stand", "brown")] }),
      kf(10, { terrain: "city", actors: [F(0.4, "king", "stand", "purple"), F(0.6, "king", "stand", "gold")] }),
    ],
    beats: [
      { upTo: 9, reaction: "Os filhos de Davi nascidos em Hebrom e Jerusalém. 👑" },
      { upTo: 99, reaction: "A descendência real de Salomão, rei após rei. 📜" },
    ],
  },
  4: {
    keyframes: [
      kf(1, { terrain: "field", actors: [F(0.4, "man", "stand", "brown"), F(0.62, "elder", "stand", "sand")] }),
      kf(9, { terrain: "hills", glory: 0.4, actors: [F(0.45, "man", "kneel", "brown")] }),
      kf(24, { terrain: "plain", crowd: 0.3, actors: [F(0.4, "man", "walk", "brown"), F(0.62, "shepherd", "stand", "sand"), AN(0.82, "sheep")] }),
    ],
    beats: [
      { upTo: 8, reaction: "As famílias de Judá e seus lugares. 🌾" },
      { upTo: 10, god: undefined, reaction: "Jabez clama, e Deus lhe concede a bênção. 🙏" },
      { upTo: 99, reaction: "As gerações de Simeão e suas terras. 🐑" },
    ],
  },
  5: {
    keyframes: [
      kf(1, { terrain: "plain", crowd: 0.3, actors: [F(0.4, "elder", "stand", "gray"), F(0.62, "man", "stand", "brown")] }),
      kf(18, { terrain: "hills", actors: [F(0.35, "warrior", "stand", "red"), F(0.55, "warrior", "raise", "brown")] }),
    ],
    beats: [
      { upTo: 17, reaction: "As tribos de Rúben, Gade e a meia tribo de Manassés. 📜" },
      { upTo: 99, reaction: "Eles clamam na batalha e Deus os atende. 🙌" },
    ],
  },
  6: {
    keyframes: [
      kf(1, { terrain: "plain", glory: 0.35, actors: [F(0.4, "elder", "stand", "white"), F(0.6, "man", "stand", "sand")] }),
      kf(31, { terrain: "city", glory: 0.4, props: [P("lampstand", 0.7, 1, 1)], actors: [F(0.4, "man", "raise", "white")] }),
      kf(54, { terrain: "hills", crowd: 0.3, actors: [F(0.4, "elder", "stand", "gray"), F(0.62, "shepherd", "stand", "sand"), AN(0.82, "sheep")] }),
    ],
    beats: [
      { upTo: 30, reaction: "A linhagem sacerdotal de Levi e Arão. 📜" },
      { upTo: 48, reaction: "Os cantores postos por Davi na Casa do SENHOR. 🎶" },
      { upTo: 99, reaction: "As cidades dadas aos levitas por todo Israel. 🏘️" },
    ],
  },
  7: {
    keyframes: [
      kf(1, { terrain: "plain", crowd: 0.3, actors: [F(0.4, "elder", "stand", "gray"), F(0.62, "man", "stand", "brown")] }),
      kf(20, { terrain: "field", actors: [F(0.4, "warrior", "stand", "brown"), F(0.62, "man", "stand", "sand")] }),
    ],
    beats: [
      { upTo: 19, reaction: "As tribos de Issacar, Benjamim e Naftali. 📜" },
      { upTo: 99, reaction: "Os homens valentes de Efraim e Aser. ⚔️" },
    ],
  },
  8: {
    keyframes: [
      kf(1, { terrain: "plain", crowd: 0.3, actors: [F(0.4, "elder", "stand", "gray"), F(0.62, "man", "stand", "brown")] }),
      kf(28, { terrain: "city", actors: [F(0.4, "man", "stand", "sand"), F(0.6, "king", "stand", "gold")] }),
    ],
    beats: [
      { upTo: 27, reaction: "As famílias da tribo de Benjamim. 📜" },
      { upTo: 99, reaction: "A casa de Saul, o primeiro rei. 👑" },
    ],
  },
  9: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.4, actors: [F(0.4, "elder", "stand", "gray"), F(0.62, "man", "walk", "brown")] }),
      kf(17, { terrain: "city", glory: 0.4, props: [P("lampstand", 0.7, 1, 1)], actors: [F(0.4, "servant", "stand", "white"), F(0.62, "man", "carry", "sand")] }),
    ],
    beats: [
      { upTo: 16, reaction: "Os que voltaram e habitaram em Jerusalém. 🏙️" },
      { upTo: 99, reaction: "Porteiros e levitas guardam a Casa de Deus. 🗝️" },
    ],
  },
  10: {
    keyframes: [
      kf(1, { terrain: "mountain", storm: 0.5, night: 0.3, actors: [F(0.35, "warrior", "fight", "red", { facing: -1 }), F(0.62, "king", "lie", "gold")] }),
      kf(8, { terrain: "hills", night: 0.4, actors: [F(0.45, "warrior", "mourn", "brown")] }),
      kf(11, { terrain: "city", night: 0.35, actors: [F(0.4, "man", "carry", "sand"), F(0.62, "man", "mourn", "brown")] }),
    ],
    beats: [
      { upTo: 7, reaction: "Saul cai na batalha do monte Gilboa. ⚔️" },
      { upTo: 10, reaction: "Os filisteus tomam suas armas em despojo. 😔" },
      { upTo: 99, reaction: "Saul morre por sua infidelidade ao SENHOR. 🌑" },
    ],
  },
  11: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.6, actors: [F(0.45, "king", "raise", "gold"), F(0.65, "elder", "bow", "white")] }),
      kf(4, { terrain: "city", crowd: 0.4, props: [P("tower", 0.72, 1.2)], actors: [F(0.35, "king", "stand", "gold"), F(0.6, "warrior", "fight", "brown", { facing: 1 })] }),
      kf(10, { terrain: "hills", actors: [F(0.3, "warrior", "raise", "red"), F(0.5, "warrior", "fight", "brown"), F(0.7, "warrior", "stand", "sand")] }),
    ],
    beats: [
      { upTo: 3, reaction: "Todo Israel unge Davi rei em Hebrom. 👑" },
      { upTo: 9, reaction: "Davi toma Sião — a Cidade de Davi. 🏰" },
      { upTo: 99, reaction: "Os valentes de Davi, homens de grandes feitos. ⚔️" },
    ],
  },
  12: {
    keyframes: [
      kf(1, { terrain: "hills", crowd: 0.5, actors: [F(0.35, "warrior", "stand", "brown"), F(0.58, "warrior", "raise", "red")] }),
      kf(23, { terrain: "city", crowd: 0.8, actors: [F(0.4, "king", "raise", "gold"), F(0.62, "warrior", "stand", "brown")] }),
      kf(38, { terrain: "city", crowd: 0.85, actors: [F(0.4, "king", "raise", "gold"), F(0.6, "man", "carry", "sand")] }),
    ],
    beats: [
      { upTo: 22, reaction: "Homens valentes vêm a Davi em Ziclague. 🛡️" },
      { upTo: 37, reaction: "De todas as tribos, guerreiros se juntam a ele. ⚔️" },
      { upTo: 99, reaction: "Grande alegria em Hebrom — festa por três dias! 🎉" },
    ],
  },
  13: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.6, actors: [F(0.45, "king", "stand", "gold"), F(0.66, "elder", "stand", "white")] }),
      kf(7, { terrain: "plain", crowd: 0.7, props: [P("arkCovenant", 0.5, 1.1)], actors: [F(0.32, "man", "raise", "brown"), AN(0.7, "ox", 0.9)] }),
      kf(9, { terrain: "plain", glory: 0.6, props: [P("arkCovenant", 0.5, 1.1)], actors: [F(0.4, "man", "lie", "sand"), F(0.62, "king", "mourn", "gold")] }),
    ],
    beats: [
      { upTo: 6, reaction: "Davi resolve trazer a arca de volta. 📦" },
      { upTo: 8, reaction: "O povo festeja diante da arca com todo instrumento. 🎶" },
      { upTo: 99, reaction: "Uzá toca a arca e morre; Davi teme ao SENHOR. 😢" },
    ],
  },
  14: {
    keyframes: [
      kf(1, { terrain: "city", props: [P("tower", 0.72, 1.2)], actors: [F(0.4, "king", "stand", "gold"), F(0.62, "servant", "carry", "sand")] }),
      kf(8, { terrain: "hills", crowd: 0.4, actors: [F(0.35, "king", "raise", "gold"), F(0.6, "warrior", "fight", "brown", { facing: 1 })] }),
      kf(11, { terrain: "hills", glory: 0.4, actors: [F(0.4, "king", "raise", "gold")] }),
    ],
    beats: [
      { upTo: 7, reaction: "A casa de Davi se estabelece em Jerusalém. 🏰" },
      { upTo: 10, god: "Sobe, que eu os entregarei nas tuas mãos.", reaction: "Davi consulta a Deus antes da guerra. 🙏" },
      { upTo: 99, reaction: "Deus dá a vitória sobre os filisteus. ⚔️✨" },
    ],
  },
  15: {
    keyframes: [
      kf(1, { terrain: "city", actors: [F(0.4, "king", "stand", "gold"), F(0.62, "elder", "stand", "white")] }),
      kf(11, { terrain: "city", glory: 0.4, props: [P("arkCovenant", 0.5, 1.1)], actors: [F(0.35, "man", "carry", "white"), F(0.6, "man", "carry", "sand")] }),
      kf(25, { terrain: "city", crowd: 0.7, glory: 0.4, props: [P("arkCovenant", 0.5, 1.1)], actors: [F(0.32, "king", "raise", "gold"), F(0.58, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 10, reaction: "Só os levitas devem carregar a arca de Deus. 📖" },
      { upTo: 24, reaction: "Cantores e músicos são postos para o louvor. 🎺" },
      { upTo: 99, reaction: "A arca sobe a Jerusalém com júbilo e trombetas! 🎶✨" },
    ],
  },
  16: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.5, props: [P("tent", 0.5, 1.3), P("arkCovenant", 0.5, 0.8), P("altar", 0.72, 1, 0.8)], actors: [F(0.32, "king", "raise", "gold")] }),
      kf(7, { terrain: "city", crowd: 0.6, glory: 0.4, actors: [F(0.35, "man", "raise", "white"), F(0.58, "man", "raise", "sand")] }),
      kf(37, { terrain: "city", glory: 0.4, props: [P("lampstand", 0.7, 1, 1)], actors: [F(0.4, "man", "stand", "white")] }),
    ],
    beats: [
      { upTo: 6, reaction: "A arca é posta na tenda; Davi oferece sacrifícios. 🕯️" },
      { upTo: 36, reaction: "'Louvai ao SENHOR, invocai o seu nome!' 🎶", god: undefined },
      { upTo: 99, reaction: "Asafe e os levitas ministram diante da arca. 🎺" },
    ],
  },
  17: {
    keyframes: [
      kf(1, { terrain: "city", props: [P("tent", 0.66, 1.2)], actors: [F(0.4, "king", "stand", "gold"), F(0.62, "man", "stand", "white")] }),
      kf(3, { terrain: "city", glory: 0.5, night: 0.3, actors: [F(0.45, "man", "stand", "white")] }),
      kf(16, { terrain: "city", glory: 0.6, actors: [F(0.45, "king", "kneel", "gold")] }),
    ],
    beats: [
      { upTo: 2, reaction: "Davi deseja edificar uma casa para o SENHOR. 🏛️" },
      { upTo: 15, god: "Não me edificarás casa; teu filho a edificará, e firmarei seu trono para sempre.", reaction: "A aliança de Deus com Davi. 🤝" },
      { upTo: 99, reaction: "Davi se assenta diante do SENHOR e ora agradecido. 🙏" },
    ],
  },
  18: {
    keyframes: [
      kf(1, { terrain: "hills", crowd: 0.4, actors: [F(0.35, "king", "raise", "gold"), F(0.6, "warrior", "fight", "brown", { facing: 1 })] }),
      kf(9, { terrain: "city", glory: 0.35, props: [P("tent", 0.7)], actors: [F(0.4, "king", "stand", "gold"), F(0.62, "servant", "carry", "sand")] }),
    ],
    beats: [
      { upTo: 8, reaction: "Davi vence filisteus, moabitas e arameus. ⚔️" },
      { upTo: 99, reaction: "O SENHOR dá vitória a Davi por onde quer que vai. 👑✨" },
    ],
  },
  19: {
    keyframes: [
      kf(1, { terrain: "city", actors: [F(0.4, "king", "stand", "gold"), F(0.62, "servant", "walk", "sand")] }),
      kf(6, { terrain: "field", crowd: 0.5, actors: [F(0.3, "warrior", "fight", "red", { facing: -1 }), F(0.55, "warrior", "raise", "brown")] }),
      kf(16, { terrain: "hills", storm: 0.3, actors: [F(0.35, "warrior", "fight", "brown", { facing: 1 }), F(0.6, "warrior", "mourn", "red")] }),
    ],
    beats: [
      { upTo: 5, reaction: "Os embaixadores de Davi são humilhados por Amom. 😠" },
      { upTo: 15, reaction: "Joabe enfrenta amonitas e arameus. ⚔️" },
      { upTo: 99, reaction: "Os arameus são derrotados e fogem diante de Israel. 🐎" },
    ],
  },
  20: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.4, props: [P("tower", 0.7, 1.2)], actors: [F(0.35, "warrior", "fight", "brown", { facing: 1 }), F(0.6, "king", "stand", "gold")] }),
      kf(4, { terrain: "hills", actors: [F(0.35, "warrior", "fight", "red", { facing: -1 }), F(0.62, "warrior", "raise", "brown")] }),
    ],
    beats: [
      { upTo: 3, reaction: "Joabe toma Rabá; Davi recebe a coroa. 👑" },
      { upTo: 99, reaction: "Os valentes derrotam os gigantes dos filisteus. 🛡️" },
    ],
  },
  21: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.4, actors: [F(0.4, "king", "stand", "gold"), F(0.62, "warrior", "stand", "brown")] }),
      kf(14, { terrain: "plain", darkness: 0.4, fire: 0.4, actors: [F(0.45, "king", "mourn", "gold")] }),
      kf(16, { terrain: "plain", glory: 0.5, actors: [F(0.35, "king", "bow", "gold"), F(0.6, "angel", "raise", "white")] }),
      kf(26, { terrain: "hills", glory: 0.6, props: [P("altar", 0.5, 1.2, 1)], actors: [F(0.42, "king", "raise", "gold")] }),
    ],
    beats: [
      { upTo: 13, reaction: "Davi ordena o censo e peca contra Deus. 😔" },
      { upTo: 15, reaction: "Uma peste cai sobre Israel como juízo. 🌑" },
      { upTo: 25, reaction: "O anjo do SENHOR sobre a eira de Ornã. 👼" },
      { upTo: 99, reaction: "Davi levanta um altar; o fogo desce do céu. 🔥✨" },
    ],
  },
  22: {
    keyframes: [
      kf(1, { terrain: "city", actors: [F(0.4, "king", "raise", "gold"), F(0.62, "servant", "carry", "sand")] }),
      kf(2, { terrain: "city", crowd: 0.5, props: [P("tower", 0.7, 1.1)], actors: [F(0.3, "man", "carry", "brown"), F(0.55, "man", "carry", "sand")] }),
      kf(6, { terrain: "city", glory: 0.4, actors: [F(0.38, "king", "stand", "gold"), F(0.6, "man", "kneel", "purple")] }),
    ],
    beats: [
      { upTo: 1, reaction: "'Aqui será a Casa do SENHOR Deus.' 🏛️" },
      { upTo: 5, reaction: "Davi ajunta ferro, bronze e cedro para o templo. 🪨" },
      { upTo: 99, god: undefined, reaction: "Davi encarrega Salomão de edificar a Casa. 🤝" },
    ],
  },
  23: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.5, actors: [F(0.4, "king", "stand", "gold"), F(0.62, "man", "stand", "purple")] }),
      kf(6, { terrain: "city", glory: 0.4, props: [P("lampstand", 0.7, 1, 1)], actors: [F(0.35, "elder", "stand", "white"), F(0.58, "man", "stand", "sand")] }),
      kf(28, { terrain: "city", glory: 0.35, actors: [F(0.4, "man", "raise", "white"), F(0.62, "man", "carry", "sand")] }),
    ],
    beats: [
      { upTo: 5, reaction: "Davi, já velho, faz Salomão rei. 👑" },
      { upTo: 27, reaction: "Os levitas são contados e organizados. 📜" },
      { upTo: 99, reaction: "Cada um em seu ofício na Casa do SENHOR. 🕯️" },
    ],
  },
  24: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.4, glory: 0.4, props: [P("altar", 0.7, 1, 0.7)], actors: [F(0.4, "elder", "stand", "white"), F(0.62, "man", "stand", "sand")] }),
      kf(20, { terrain: "city", actors: [F(0.4, "man", "stand", "white"), F(0.62, "man", "stand", "brown")] }),
    ],
    beats: [
      { upTo: 19, reaction: "As vinte e quatro turmas dos sacerdotes. 📜" },
      { upTo: 99, reaction: "As demais famílias de Levi, por sorte. 🎲" },
    ],
  },
  25: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.4, crowd: 0.4, actors: [F(0.35, "man", "raise", "white"), F(0.58, "man", "raise", "purple")] }),
      kf(6, { terrain: "city", glory: 0.5, props: [P("lampstand", 0.72, 1, 1)], actors: [F(0.4, "man", "raise", "white"), F(0.62, "man", "raise", "sand")] }),
    ],
    beats: [
      { upTo: 5, reaction: "Asafe, Hemã e Jedutum profetizam com harpas. 🎶" },
      { upTo: 99, reaction: "Os músicos organizados para o louvor no templo. 🎺✨" },
    ],
  },
  26: {
    keyframes: [
      kf(1, { terrain: "city", props: [P("tower", 0.72, 1.2)], actors: [F(0.4, "man", "stand", "brown"), F(0.62, "servant", "stand", "sand")] }),
      kf(20, { terrain: "city", glory: 0.35, actors: [F(0.4, "man", "carry", "gold"), F(0.62, "man", "stand", "white")] }),
    ],
    beats: [
      { upTo: 19, reaction: "Os porteiros guardam as portas da Casa. 🗝️" },
      { upTo: 99, reaction: "Os tesoureiros zelam pelas coisas sagradas. 💰" },
    ],
  },
  27: {
    keyframes: [
      kf(1, { terrain: "field", crowd: 0.5, actors: [F(0.35, "warrior", "stand", "brown"), F(0.58, "warrior", "stand", "red")] }),
      kf(16, { terrain: "city", actors: [F(0.4, "elder", "stand", "white"), F(0.62, "man", "stand", "sand")] }),
    ],
    beats: [
      { upTo: 15, reaction: "As divisões do exército, mês a mês. 🛡️" },
      { upTo: 99, reaction: "Os chefes das tribos e os oficiais do rei. 📜" },
    ],
  },
  28: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.7, actors: [F(0.4, "king", "raise", "gold"), F(0.64, "elder", "stand", "white")] }),
      kf(9, { terrain: "city", glory: 0.4, actors: [F(0.35, "king", "stand", "gold"), F(0.58, "man", "kneel", "purple")] }),
      kf(11, { terrain: "city", glory: 0.5, props: [P("altar", 0.68, 1, 0.7), P("lampstand", 0.82, 0.9, 1)], actors: [F(0.4, "king", "raise", "gold")] }),
    ],
    beats: [
      { upTo: 8, reaction: "Davi reúne os líderes de Israel. 👥" },
      { upTo: 10, god: undefined, reaction: "'Serve a Deus com coração perfeito, Salomão.' 🤍" },
      { upTo: 99, reaction: "Davi entrega a Salomão a planta do templo. 📐✨" },
    ],
  },
  29: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.6, actors: [F(0.4, "king", "raise", "gold"), F(0.64, "man", "carry", "sand")] }),
      kf(10, { terrain: "city", glory: 0.6, actors: [F(0.45, "king", "kneel", "gold")] }),
      kf(20, { terrain: "city", crowd: 0.8, glory: 0.4, props: [P("altar", 0.7, 1.1, 1)], actors: [F(0.35, "king", "raise", "gold"), F(0.6, "man", "bow", "white")] }),
      kf(28, { terrain: "city", night: 0.3, glory: 0.35, actors: [F(0.4, "king", "lie", "gold"), F(0.62, "king", "stand", "purple")] }),
    ],
    beats: [
      { upTo: 9, reaction: "O povo oferta com alegria para a Casa de Deus. 🎁" },
      { upTo: 19, god: undefined, reaction: "'Tua é a grandeza e o poder, ó SENHOR!' 🙏" },
      { upTo: 27, reaction: "Salomão é proclamado rei com sacrifícios e júbilo. 👑🎶" },
      { upTo: 99, reaction: "Davi morre em boa velhice, e Salomão reina. ✨" },
    ],
  },
};
