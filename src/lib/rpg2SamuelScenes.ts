// ============================================================================
// Roteiros de cena (Living Scene v2) — 2 SAMUEL, capítulo por capítulo.
// O lamento por Saul e Jônatas, Davi rei em Hebrom e Jerusalém, a arca que sobe
// entre danças, a aliança davídica, Davi e Bate-Seba com a repreensão de Natã,
// a revolta e a morte de Absalão, e os últimos feitos de Davi. Puramente
// visual/narrativo — não toca em progresso. Segue o padrão de Êxodo.
// ============================================================================

import type { ChapterScript, V2Actor, V2Prop, SceneState } from "@/lib/rpgLivingV2";

const F = (x: number, role: V2Actor["role"], action: V2Actor["action"], palette?: V2Actor["palette"], extra: Partial<V2Actor> = {}): V2Actor => ({ x, role, action, palette, ...extra });
const AN = (x: number, animal: NonNullable<V2Actor["animal"]>, scale = 1, color?: string): V2Actor => ({ x, kind: "animal", animal, scale, color });
const P = (kind: string, x: number, scale = 1, fire?: number): V2Prop => ({ kind, x, scale, ...(fire != null ? { fire } : {}) });
const kf = (v: number, state: SceneState) => ({ v, state });

export const SAMUEL2_SCENES: Record<number, ChapterScript> = {
  1: {
    keyframes: [
      kf(1, { terrain: "desert", night: 0.3, actors: [F(0.4, "man", "stand", "purple"), F(0.62, "man", "mourn", "sand")] }),
      kf(11, { terrain: "desert", night: 0.5, actors: [F(0.45, "king", "mourn", "purple"), F(0.66, "man", "mourn", "brown")] }),
      kf(17, { terrain: "hills", night: 0.6, actors: [F(0.5, "king", "mourn", "purple")] }),
    ],
    beats: [
      { upTo: 10, reaction: "Um amalequita traz a coroa de Saul e a notícia de sua morte. 👑" },
      { upTo: 16, reaction: "Davi rasga as vestes e chora o rei e o povo do SENHOR. 😢" },
      { upTo: 99, reaction: "O cântico do arco: 'Como caíram os valentes!' Saul e Jônatas. 🏹" },
    ],
  },
  2: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.3, props: [P("altar", 0.6)], actors: [F(0.4, "king", "kneel", "purple")] }),
      kf(4, { terrain: "city", crowd: 0.5, actors: [F(0.45, "king", "stand", "gold"), F(0.66, "elder", "bow", "sand")] }),
      kf(12, { terrain: "field", props: [P("well", 0.5)], actors: [F(0.3, "warrior", "fight", "purple", { facing: 1 }), F(0.68, "warrior", "fight", "red", { facing: -1 })] }),
    ],
    beats: [
      { upTo: 3, god: "Sobe a Hebrom.", reaction: "Davi consulta o SENHOR e sobe a Hebrom. 🕊️" },
      { upTo: 7, reaction: "Os homens de Judá ungem Davi por rei. 👑" },
      { upTo: 99, reaction: "As casas de Davi e de Saul se enfrentam junto ao tanque de Gibeão. ⚔️" },
    ],
  },
  3: {
    keyframes: [
      kf(1, { terrain: "city", actors: [F(0.5, "king", "stand", "purple")] }),
      kf(12, { terrain: "city", actors: [F(0.36, "king", "stand", "purple"), F(0.64, "warrior", "bow", "gray")] }),
      kf(27, { terrain: "city", night: 0.4, blood: 0.4, actors: [F(0.5, "warrior", "lie", "gray"), F(0.68, "warrior", "stand", "red")] }),
    ],
    beats: [
      { upTo: 5, reaction: "A casa de Davi se fortalece; a de Saul enfraquece. 📈" },
      { upTo: 21, reaction: "Abner busca a paz e vem fazer aliança com Davi. 🤝" },
      { upTo: 99, reaction: "Joabe mata Abner por vingança; Davi o pranteia. 😔" },
    ],
  },
  4: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.5, actors: [F(0.5, "king", "mourn", "sand")] }),
      kf(5, { terrain: "city", night: 0.7, actors: [F(0.4, "man", "lie", "sand"), F(0.66, "warrior", "stand", "red")] }),
      kf(9, { terrain: "city", night: 0.5, actors: [F(0.5, "king", "stand", "purple")] }),
    ],
    beats: [
      { upTo: 4, reaction: "Isbosete perde o ânimo com a morte de Abner. 😨" },
      { upTo: 8, reaction: "Dois homens assassinam Isbosete enquanto dorme. 🌑" },
      { upTo: 99, reaction: "Davi condena os assassinos: não se alegra com sangue inocente. ⚖️" },
    ],
  },
  5: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.7, glory: 0.3, actors: [F(0.45, "king", "raise", "gold"), F(0.68, "elder", "bow", "sand")] }),
      kf(6, { terrain: "city", props: [P("tower", 0.7, 1.2)], actors: [F(0.35, "warrior", "fight", "purple", { facing: 1 })] }),
      kf(17, { terrain: "hills", storm: 0.3, actors: [F(0.4, "king", "fight", "purple", { facing: 1 }), F(0.68, "warrior", "fight", "red", { facing: -1 })] }),
    ],
    beats: [
      { upTo: 5, reaction: "Todo o Israel unge Davi rei em Hebrom. 👑✨" },
      { upTo: 12, reaction: "Davi toma Sião: a cidade de Davi, Jerusalém. 🏰" },
      { upTo: 99, god: "Sobe, porque entregarei os filisteus nas tuas mãos.", reaction: "Davi derrota os filisteus. 🙌" },
    ],
  },
  6: {
    keyframes: [
      kf(1, { terrain: "field", crowd: 0.7, props: [P("arkCovenant", 0.5, 1.1)], actors: [F(0.3, "king", "raise", "purple"), F(0.7, "man", "carry", "sand")] }),
      kf(6, { terrain: "field", glory: 0.5, props: [P("arkCovenant", 0.5, 1.1)], actors: [F(0.5, "man", "lie", "sand")] }),
      kf(14, { terrain: "city", crowd: 0.8, glory: 0.4, props: [P("arkCovenant", 0.55, 1.1)], actors: [F(0.35, "king", "raise", "white")] }),
      kf(20, { terrain: "city", actors: [F(0.4, "king", "stand", "purple"), F(0.64, "woman", "stand", "gold")] }),
    ],
    beats: [
      { upTo: 5, reaction: "A arca sobe a Jerusalém entre cânticos e festa. 🎶" },
      { upTo: 11, reaction: "Uzá toca a arca e morre; Davi teme ao SENHOR. 😨" },
      { upTo: 19, reaction: "Davi dança com toda a força diante da arca! 💃🙌" },
      { upTo: 99, reaction: "Mical o despreza, mas Davi honra ao SENHOR. 👑" },
    ],
  },
  7: {
    keyframes: [
      kf(1, { terrain: "city", props: [P("tent", 0.7, 1.2)], actors: [F(0.4, "king", "stand", "purple"), F(0.64, "elder", "stand", "white")] }),
      kf(4, { terrain: "city", night: 0.4, glory: 0.6, actors: [F(0.5, "elder", "stand", "white")] }),
      kf(18, { terrain: "city", glory: 0.7, props: [P("arkCovenant", 0.66)], actors: [F(0.45, "king", "kneel", "purple")] }),
    ],
    beats: [
      { upTo: 3, reaction: "Davi deseja edificar uma casa para o SENHOR. 🏛️" },
      { upTo: 17, god: "Estabelecerei o teu trono para sempre.", reaction: "A aliança davídica: um reino eterno. ✨👑" },
      { upTo: 99, reaction: "Davi se assenta diante do SENHOR e ora agradecido. 🙏" },
    ],
  },
  8: {
    keyframes: [
      kf(1, { terrain: "hills", storm: 0.3, actors: [F(0.4, "king", "fight", "purple", { facing: 1 }), F(0.68, "warrior", "fight", "red", { facing: -1 })] }),
      kf(9, { terrain: "city", crowd: 0.5, props: [P("altar", 0.68)], actors: [F(0.45, "king", "raise", "gold")] }),
    ],
    beats: [
      { upTo: 8, reaction: "Davi vence filisteus, moabitas e arameus. ⚔️" },
      { upTo: 99, reaction: "O SENHOR dá vitória a Davi por onde quer que vá. 🛡️" },
    ],
  },
  9: {
    keyframes: [
      kf(1, { terrain: "city", actors: [F(0.4, "king", "stand", "purple"), F(0.66, "servant", "bow", "sand")] }),
      kf(6, { terrain: "city", glory: 0.3, actors: [F(0.4, "king", "raise", "purple"), F(0.66, "man", "bow", "gray")] }),
    ],
    beats: [
      { upTo: 5, reaction: "Davi busca alguém da casa de Saul para abençoar. 🤍" },
      { upTo: 99, reaction: "Mefibosete, filho de Jônatas, come à mesa do rei. 🍞" },
    ],
  },
  10: {
    keyframes: [
      kf(1, { terrain: "city", actors: [F(0.4, "king", "stand", "purple"), F(0.66, "servant", "walk", "sand")] }),
      kf(7, { terrain: "field", storm: 0.4, crowd: 0.6, actors: [F(0.3, "warrior", "fight", "purple", { facing: 1 }), F(0.7, "warrior", "fight", "red", { facing: -1 })] }),
    ],
    beats: [
      { upTo: 5, reaction: "Os amonitas humilham os mensageiros de Davi. 😤" },
      { upTo: 99, reaction: "Joabe confia no SENHOR e derrota amonitas e arameus. ⚔️" },
    ],
  },
  11: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.4, props: [P("tower", 0.3, 1.2)], actors: [F(0.4, "king", "stand", "purple")] }),
      kf(2, { terrain: "city", night: 0.6, actors: [F(0.35, "king", "stand", "purple"), F(0.66, "woman", "stand", "white")] }),
      kf(14, { terrain: "field", storm: 0.4, actors: [F(0.4, "warrior", "fight", "brown", { facing: 1 }), F(0.66, "warrior", "lie", "gray")] }),
      kf(26, { terrain: "city", night: 0.5, actors: [F(0.4, "woman", "mourn", "blue"), F(0.64, "king", "stand", "purple")] }),
    ],
    beats: [
      { upTo: 5, reaction: "Do terraço, Davi vê Bate-Seba e a manda buscar. 🌙" },
      { upTo: 13, reaction: "Ele tenta encobrir o pecado, mas Urias é fiel. 😔" },
      { upTo: 25, reaction: "Urias cai na batalha por ordem de Davi. ⚔️" },
      { upTo: 99, reaction: "Isto que Davi fez desagradou ao SENHOR. 😢" },
    ],
  },
  12: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.3, actors: [F(0.4, "king", "stand", "purple"), F(0.64, "elder", "raise", "white")] }),
      kf(13, { terrain: "city", night: 0.3, actors: [F(0.5, "king", "kneel", "brown")] }),
      kf(15, { terrain: "city", night: 0.5, actors: [F(0.5, "king", "mourn", "brown")] }),
      kf(24, { terrain: "city", glory: 0.3, actors: [F(0.4, "king", "stand", "purple"), F(0.6, "woman", "carry", "blue")] }),
    ],
    beats: [
      { upTo: 6, reaction: "Natã conta a parábola da ovelhinha do pobre. 🐑" },
      { upTo: 14, god: "Tu és este homem!", reaction: "Natã repreende Davi, que confessa seu pecado. 😢" },
      { upTo: 23, reaction: "O menino morre; Davi se humilha diante do SENHOR. 🙏" },
      { upTo: 99, reaction: "Nasce Salomão, amado pelo SENHOR. 🤍" },
    ],
  },
  13: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.3, actors: [F(0.4, "man", "stand", "red"), F(0.66, "woman", "mourn", "white")] }),
      kf(20, { terrain: "city", night: 0.4, actors: [F(0.5, "woman", "mourn", "gray")] }),
      kf(28, { terrain: "field", night: 0.5, blood: 0.4, actors: [F(0.4, "man", "lie", "red"), F(0.66, "warrior", "stand", "purple")] }),
    ],
    beats: [
      { upTo: 19, reaction: "Amnom viola Tamar e a rejeita; grande vergonha. 😢" },
      { upTo: 22, reaction: "Absalão guarda ódio no coração pela irmã. 🌑" },
      { upTo: 99, reaction: "Absalão manda matar Amnom e foge para Gesur. ⚔️" },
    ],
  },
  14: {
    keyframes: [
      kf(1, { terrain: "city", actors: [F(0.4, "warrior", "stand", "purple"), F(0.66, "woman", "bow", "gray")] }),
      kf(21, { terrain: "city", actors: [F(0.4, "king", "stand", "purple"), F(0.66, "man", "walk", "red")] }),
      kf(33, { terrain: "city", actors: [F(0.45, "king", "stand", "purple"), F(0.64, "man", "bow", "red")] }),
    ],
    beats: [
      { upTo: 20, reaction: "A mulher de Tecoa intercede por meio de uma parábola. 🗣️" },
      { upTo: 24, reaction: "Joabe traz Absalão de volta a Jerusalém. 🏰" },
      { upTo: 99, reaction: "Após dois anos, o rei enfim recebe Absalão. 🤝" },
    ],
  },
  15: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.6, actors: [F(0.5, "man", "stand", "red")] }),
      kf(7, { terrain: "city", crowd: 0.7, actors: [F(0.5, "warrior", "raise", "red")] }),
      kf(23, { terrain: "hills", night: 0.4, crowd: 0.6, actors: [F(0.35, "king", "mourn", "brown"), F(0.66, "man", "walk", "sand")] }),
      kf(30, { terrain: "mountain", night: 0.5, actors: [F(0.5, "king", "mourn", "brown")] }),
    ],
    beats: [
      { upTo: 6, reaction: "Absalão rouba o coração dos homens de Israel. 🐍" },
      { upTo: 12, reaction: "Ergue-se a conspiração: 'Absalão reina em Hebrom!' ⚔️" },
      { upTo: 29, reaction: "Davi foge de Jerusalém, chorando ao subir o Olival. 😢" },
      { upTo: 99, reaction: "Husai volta para frustrar o conselho de Aitofel. 🕊️" },
    ],
  },
  16: {
    keyframes: [
      kf(1, { terrain: "hills", actors: [F(0.4, "king", "walk", "brown"), F(0.66, "servant", "carry", "sand")] }),
      kf(5, { terrain: "hills", night: 0.3, actors: [F(0.35, "king", "mourn", "brown"), F(0.7, "man", "raise", "gray")] }),
      kf(15, { terrain: "city", actors: [F(0.4, "warrior", "stand", "red"), F(0.66, "elder", "bow", "gray")] }),
    ],
    beats: [
      { upTo: 4, reaction: "Ziba traz provisões a Davi no caminho. 🍞" },
      { upTo: 14, reaction: "Simei amaldiçoa e atira pedras; Davi se cala. 🪨" },
      { upTo: 99, reaction: "Absalão entra em Jerusalém e ouve Aitofel. 🏰" },
    ],
  },
  17: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.3, actors: [F(0.4, "warrior", "stand", "red"), F(0.66, "elder", "raise", "gray")] }),
      kf(15, { terrain: "hills", night: 0.5, props: [P("well", 0.6)], actors: [F(0.4, "man", "walk", "brown"), F(0.66, "woman", "stand", "sand")] }),
      kf(23, { terrain: "city", night: 0.6, actors: [F(0.5, "elder", "mourn", "gray")] }),
    ],
    beats: [
      { upTo: 14, god: "O SENHOR ordenara frustrar o bom conselho de Aitofel.", reaction: "Vence o conselho de Husai. 🕊️" },
      { upTo: 22, reaction: "Avisado, Davi atravessa o Jordão em segurança. 🏃" },
      { upTo: 99, reaction: "Aitofel, desprezado, tira a própria vida. 😔" },
    ],
  },
  18: {
    keyframes: [
      kf(1, { terrain: "field", crowd: 0.6, actors: [F(0.4, "king", "stand", "purple"), F(0.66, "warrior", "raise", "gray")] }),
      kf(6, { terrain: "hills", storm: 0.5, props: [P("tree", 0.3, 1.3), P("tree", 0.72, 1.1)], actors: [F(0.5, "warrior", "fight", "brown", { facing: 1 })] }),
      kf(9, { terrain: "hills", storm: 0.6, props: [P("tree", 0.5, 1.5)], actors: [F(0.5, "man", "lie", "red")] }),
      kf(33, { terrain: "city", night: 0.5, actors: [F(0.5, "king", "mourn", "brown")] }),
    ],
    beats: [
      { upTo: 5, reaction: "Davi ordena: 'Tratai bem o jovem Absalão.' 🤍" },
      { upTo: 8, reaction: "A batalha se trava no bosque de Efraim. ⚔️" },
      { upTo: 18, reaction: "Absalão fica preso pelos cabelos num carvalho e morre. 🌳" },
      { upTo: 99, reaction: "'Absalão, meu filho!' Davi chora amargamente. 😢" },
    ],
  },
  19: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.4, actors: [F(0.5, "king", "mourn", "brown"), F(0.7, "warrior", "stand", "gray")] }),
      kf(15, { terrain: "river", crowd: 0.6, actors: [F(0.4, "king", "stand", "purple"), F(0.66, "elder", "bow", "sand")] }),
      kf(31, { terrain: "river", actors: [F(0.4, "king", "stand", "purple"), F(0.66, "elder", "bow", "white")] }),
    ],
    beats: [
      { upTo: 8, reaction: "Joabe adverte Davi a consolar o povo. 🗣️" },
      { upTo: 30, reaction: "O rei volta; Simei e Mefibosete o recebem. 🤝" },
      { upTo: 99, reaction: "Judá e Israel disputam a honra de trazer o rei. 👑" },
    ],
  },
  20: {
    keyframes: [
      kf(1, { terrain: "hills", actors: [F(0.5, "man", "raise", "gray")] }),
      kf(8, { terrain: "field", blood: 0.4, actors: [F(0.4, "warrior", "stand", "gray"), F(0.66, "warrior", "lie", "red")] }),
      kf(16, { terrain: "city", props: [P("tower", 0.68, 1.3)], actors: [F(0.4, "warrior", "stand", "gray"), F(0.68, "woman", "stand", "white")] }),
    ],
    beats: [
      { upTo: 7, reaction: "Seba se rebela: 'Não temos parte em Davi!' 📯" },
      { upTo: 13, reaction: "Joabe mata Amasa e persegue o rebelde. ⚔️" },
      { upTo: 99, reaction: "Uma mulher sábia salva a cidade de Abel. 🏰" },
    ],
  },
  21: {
    keyframes: [
      kf(1, { terrain: "field", storm: 0.3, actors: [F(0.5, "king", "kneel", "brown")] }),
      kf(10, { terrain: "mountain", night: 0.4, actors: [F(0.5, "woman", "mourn", "gray")] }),
      kf(15, { terrain: "hills", storm: 0.4, props: [P("tower", 0.72, 1.1)], actors: [F(0.35, "warrior", "fight", "purple", { facing: 1 }), F(0.7, "warrior", "fight", "red", { facing: -1 })] }),
    ],
    beats: [
      { upTo: 9, reaction: "Fome de três anos; Davi busca a face do SENHOR. 🌾" },
      { upTo: 14, reaction: "Rispa vela os mortos; Davi honra Saul e Jônatas. 🤍" },
      { upTo: 99, reaction: "Os valentes de Davi vencem os gigantes filisteus. ⚔️" },
    ],
  },
  22: {
    keyframes: [
      kf(1, { terrain: "mountain", glory: 0.5, actors: [F(0.5, "king", "raise", "purple")] }),
      kf(8, { terrain: "mountain", storm: 0.7, glory: 0.5, actors: [F(0.5, "king", "raise", "purple")] }),
      kf(29, { terrain: "hills", glory: 0.7, actors: [F(0.5, "king", "raise", "white")] }),
    ],
    beats: [
      { upTo: 7, reaction: "Davi canta: 'O SENHOR é a minha rocha e libertador.' 🎶" },
      { upTo: 20, god: "Ele me tirou das muitas águas e me livrou.", reaction: "Deus desce entre relâmpagos para salvar. ⚡" },
      { upTo: 99, reaction: "'Tu és a minha lâmpada, ó SENHOR!' 🕯️" },
    ],
  },
  23: {
    keyframes: [
      kf(1, { terrain: "hills", glory: 0.5, actors: [F(0.5, "king", "stand", "white")] }),
      kf(8, { terrain: "field", actors: [F(0.35, "warrior", "stand", "gray"), F(0.6, "warrior", "raise", "purple")] }),
      kf(13, { terrain: "hills", props: [P("well", 0.5)], actors: [F(0.4, "king", "stand", "purple"), F(0.66, "warrior", "carry", "gray")] }),
    ],
    beats: [
      { upTo: 7, reaction: "As últimas palavras de Davi, o ungido do SENHOR. 📜" },
      { upTo: 12, reaction: "Os valentes de Davi e seus grandes feitos. 🛡️" },
      { upTo: 99, reaction: "Três heróis trazem água de Belém; Davi a derrama ao SENHOR. 💧" },
    ],
  },
  24: {
    keyframes: [
      kf(1, { terrain: "city", actors: [F(0.4, "king", "stand", "purple"), F(0.66, "warrior", "stand", "gray")] }),
      kf(15, { terrain: "city", darkness: 0.4, glory: 0.4, crowd: 0.4, actors: [F(0.5, "angel", "raise", "white")] }),
      kf(18, { terrain: "mountain", glory: 0.5, props: [P("altar", 0.55, 1.1, 1)], actors: [F(0.4, "king", "kneel", "brown")] }),
    ],
    beats: [
      { upTo: 9, reaction: "Davi ordena o censo do povo, contra o conselho de Joabe. 📊" },
      { upTo: 17, reaction: "A peste fere Israel; Davi clama: 'Sou eu que pequei!' 😢" },
      { upTo: 99, god: "Levanta um altar na eira de Araúna.", reaction: "Davi edifica o altar e a praga cessa. 🔥🙏" },
    ],
  },
};
