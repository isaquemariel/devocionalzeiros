// ============================================================================
// Roteiros de cena (Living Scene v2) — SALMOS 101 a 150.
// Poesia hebraica: cenas atmosféricas conforme o tom — a Palavra e a Lei
// (Sl 119), o olhar aos montes (Sl 121), os cânticos de romaria (Sl 120-134),
// o pranto junto aos rios da Babilônia (Sl 137) e o grande louvor final
// (Sl 146-150). Puramente visual/narrativo — não toca em progresso.
// Segue o padrão de Gênesis/Êxodo (rpgExodusScenes).
// ============================================================================

import type { ChapterScript, V2Actor, V2Prop, SceneState } from "@/lib/rpgLivingV2";

const F = (x: number, role: V2Actor["role"], action: V2Actor["action"], palette?: V2Actor["palette"], extra: Partial<V2Actor> = {}): V2Actor => ({ x, role, action, palette, ...extra });
const AN = (x: number, animal: NonNullable<V2Actor["animal"]>, scale = 1, color?: string): V2Actor => ({ x, kind: "animal", animal, scale, color });
const P = (kind: string, x: number, scale = 1, fire?: number): V2Prop => ({ kind, x, scale, ...(fire != null ? { fire } : {}) });
const kf = (v: number, state: SceneState) => ({ v, state });

export const PSALMS_3: Record<number, ChapterScript> = {
  101: {
    keyframes: [
      kf(1, { terrain: "city", actors: [F(0.45, "king", "raise", "purple"), F(0.66, "man", "stand", "white")] }),
      kf(6, { terrain: "city", glory: 0.3, actors: [F(0.45, "king", "stand", "purple")] }),
    ],
    beats: [
      { upTo: 5, reaction: "Cantarei a misericórdia e o juízo. 👑" },
      { upTo: 99, reaction: "Andarei com integridade de coração em minha casa. 🤍" },
    ],
  },
  102: {
    keyframes: [
      kf(1, { terrain: "desert", night: 0.5, actors: [F(0.45, "man", "mourn", "gray")] }),
      kf(12, { terrain: "desert", night: 0.3, glory: 0.4, actors: [F(0.45, "man", "kneel", "gray")] }),
      kf(25, { terrain: "mountain", glory: 0.6, actors: [F(0.45, "man", "raise", "brown")] }),
    ],
    beats: [
      { upTo: 11, reaction: "Oração do aflito: meus dias somem como fumaça. 🌫️" },
      { upTo: 24, god: undefined, reaction: "Mas tu, SENHOR, permaneces para sempre. 🕊️" },
      { upTo: 99, reaction: "Os céus perecem, mas tu és o mesmo. ✨" },
    ],
  },
  103: {
    keyframes: [
      kf(1, { terrain: "hills", glory: 0.4, actors: [F(0.45, "man", "raise", "blue")] }),
      kf(11, { terrain: "hills", glory: 0.6, props: [P("dove", 0.66)], actors: [F(0.4, "man", "stand", "blue")] }),
    ],
    beats: [
      { upTo: 10, reaction: "Bendize, ó minha alma, ao SENHOR! 🙌" },
      { upTo: 99, reaction: "Como o pai se compadece dos filhos, assim o SENHOR. 🤍" },
    ],
  },
  104: {
    keyframes: [
      kf(1, { terrain: "mountain", glory: 0.6, actors: [F(0.4, "man", "raise", "brown")] }),
      kf(10, { terrain: "river", props: [P("tree", 0.66), P("reeds", 0.2)], actors: [AN(0.5, "goat", 0.8)] }),
      kf(19, { terrain: "sea", night: 0.4, actors: [] }),
    ],
    beats: [
      { upTo: 9, reaction: "SENHOR, quão manifestas são as tuas obras! 🌄" },
      { upTo: 23, reaction: "Fontes, árvores e feras — tudo espera por ti. 🌿" },
      { upTo: 99, reaction: "Enviaste o teu espírito e renovaste a terra. 🌊" },
    ],
  },
  105: {
    keyframes: [
      kf(1, { terrain: "desert", crowd: 0.5, props: [P("pillarCloud", 0.5, 1)], actors: [F(0.4, "man", "raise", "brown")] }),
      kf(37, { terrain: "desert", night: 0.4, props: [P("pillarFire", 0.5, 1)], actors: [F(0.4, "man", "walk", "brown")] }),
    ],
    beats: [
      { upTo: 25, reaction: "Lembrai-vos das maravilhas que Deus fez. 📖" },
      { upTo: 99, reaction: "Guiou seu povo com nuvem e fogo até a herança. 🔥" },
    ],
  },
  106: {
    keyframes: [
      kf(1, { terrain: "desert", crowd: 0.4, actors: [F(0.45, "man", "kneel", "gray")] }),
      kf(19, { terrain: "desert", night: 0.2, actors: [AN(0.5, "ox", 1, "#e8b04b"), F(0.3, "man", "mourn", "sand")] }),
      kf(44, { terrain: "hills", glory: 0.4, actors: [F(0.45, "man", "raise", "brown")] }),
    ],
    beats: [
      { upTo: 18, reaction: "Pecamos como nossos pais no deserto. 😔" },
      { upTo: 43, reaction: "Eles esqueceram, mas ele lembrou da aliança. 🐂" },
      { upTo: 99, reaction: "Salva-nos, SENHOR, e ajunta-nos! 🙏" },
    ],
  },
  107: {
    keyframes: [
      kf(1, { terrain: "desert", actors: [F(0.4, "man", "walk", "sand")] }),
      kf(23, { terrain: "sea", storm: 0.7, rain: 0.4, actors: [F(0.45, "man", "raise", "blue")] }),
      kf(35, { terrain: "field", glory: 0.4, props: [P("well", 0.6), P("tree", 0.3)], actors: [F(0.4, "man", "stand", "green")] }),
    ],
    beats: [
      { upTo: 22, reaction: "Rendei graças ao SENHOR, pois ele é bom. 🤍" },
      { upTo: 32, reaction: "Clamaram na tempestade, e ele os acalmou. 🌊" },
      { upTo: 99, reaction: "Transforma o deserto em mananciais. 💧" },
    ],
  },
  108: {
    keyframes: [
      kf(1, { terrain: "hills", glory: 0.4, actors: [F(0.45, "man", "raise", "blue")] }),
      kf(6, { terrain: "mountain", actors: [F(0.45, "warrior", "raise", "red")] }),
    ],
    beats: [
      { upTo: 5, reaction: "Preparado está o meu coração: cantarei! 🎶" },
      { upTo: 99, reaction: "Em Deus faremos proezas. ⚔️" },
    ],
  },
  109: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.4, actors: [F(0.45, "man", "mourn", "gray")] }),
      kf(21, { terrain: "city", glory: 0.3, actors: [F(0.45, "man", "kneel", "gray")] }),
    ],
    beats: [
      { upTo: 20, reaction: "Ó Deus do meu louvor, não te cales. 😔" },
      { upTo: 99, reaction: "Ajuda-me, SENHOR, por tua misericórdia. 🙏" },
    ],
  },
  110: {
    keyframes: [
      kf(1, { terrain: "mountain", glory: 0.6, actors: [F(0.45, "king", "stand", "gold")] }),
      kf(4, { terrain: "mountain", glory: 0.7, props: [P("altar", 0.66, 1, 0.6)], actors: [F(0.4, "king", "raise", "gold")] }),
    ],
    beats: [
      { upTo: 3, god: "Assenta-te à minha direita até que eu ponha teus inimigos por estrado.", reaction: "O Senhor fala ao meu Senhor. 👑" },
      { upTo: 99, god: "Tu és sacerdote eterno, segundo a ordem de Melquisedeque.", reaction: "Rei e sacerdote para sempre. ✨" },
    ],
  },
  111: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.5, glory: 0.3, actors: [F(0.45, "man", "raise", "blue")] }),
    ],
    beats: [
      { upTo: 9, reaction: "Louvarei ao SENHOR de todo o coração na assembleia. 🙌" },
      { upTo: 99, reaction: "O temor do SENHOR é o princípio da sabedoria. 📖" },
    ],
  },
  112: {
    keyframes: [
      kf(1, { terrain: "field", glory: 0.3, props: [P("tree", 0.66)], actors: [F(0.45, "man", "stand", "white")] }),
    ],
    beats: [
      { upTo: 5, reaction: "Bem-aventurado o que teme ao SENHOR. 🌾" },
      { upTo: 99, reaction: "O justo será lembrado para sempre. 🤍" },
    ],
  },
  113: {
    keyframes: [
      kf(1, { terrain: "hills", glory: 0.5, actors: [F(0.45, "servant", "raise", "sand")] }),
      kf(7, { terrain: "city", glory: 0.4, actors: [F(0.4, "man", "kneel", "gray"), F(0.6, "woman", "raise", "green")] }),
    ],
    beats: [
      { upTo: 6, reaction: "Louvai, servos do SENHOR, do nascer ao pôr do sol! ☀️" },
      { upTo: 99, reaction: "Levanta o pobre do pó e o assenta com príncipes. 🙌" },
    ],
  },
  114: {
    keyframes: [
      kf(1, { terrain: "sea", seaSplit: 0.7, crowd: 0.5, actors: [F(0.4, "man", "walk", "brown")] }),
      kf(4, { terrain: "mountain", glory: 0.4, actors: [] }),
    ],
    beats: [
      { upTo: 3, reaction: "O mar viu e fugiu; o Jordão retrocedeu. 🌊" },
      { upTo: 99, reaction: "Os montes saltaram como carneiros diante do SENHOR. ⛰️" },
    ],
  },
  115: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.4, crowd: 0.5, actors: [F(0.45, "man", "raise", "blue")] }),
      kf(12, { terrain: "city", actors: [F(0.4, "man", "stand", "white"), F(0.6, "woman", "stand", "green")] }),
    ],
    beats: [
      { upTo: 11, reaction: "Não a nós, SENHOR, mas ao teu nome dá glória. 🙌" },
      { upTo: 99, reaction: "O SENHOR se lembra de nós e nos abençoa. 🤍" },
    ],
  },
  116: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.3, actors: [F(0.45, "man", "kneel", "gray")] }),
      kf(12, { terrain: "city", glory: 0.4, props: [P("altar", 0.66, 0.9, 0.5)], actors: [F(0.45, "man", "raise", "blue")] }),
    ],
    beats: [
      { upTo: 11, reaction: "Amo ao SENHOR, porque ouviu a minha súplica. 🤍" },
      { upTo: 99, reaction: "Tomarei o cálice da salvação e o invocarei. 🍷" },
    ],
  },
  117: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.6, glory: 0.4, actors: [F(0.4, "man", "raise", "blue"), F(0.6, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 99, reaction: "Louvai ao SENHOR, todas as nações! 🌍🙌" },
    ],
  },
  118: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.5, actors: [F(0.45, "man", "raise", "blue")] }),
      kf(19, { terrain: "city", glory: 0.5, props: [P("tower", 0.7)], actors: [F(0.4, "man", "walk", "white")] }),
      kf(22, { terrain: "city", glory: 0.6, actors: [F(0.45, "man", "kneel", "brown")] }),
    ],
    beats: [
      { upTo: 18, reaction: "Rendei graças: a sua misericórdia dura para sempre. 🤍" },
      { upTo: 24, reaction: "Abri-me as portas da justiça para eu entrar. 🚪" },
      { upTo: 99, reaction: "A pedra rejeitada tornou-se a principal. Este é o dia do SENHOR! ✨" },
    ],
  },
  119: {
    keyframes: [
      kf(1, { terrain: "mountain", glory: 0.5, props: [P("tablets", 0.5, 1.1)], actors: [F(0.45, "man", "kneel", "white")] }),
      kf(57, { terrain: "garden", glory: 0.4, props: [P("lampstand", 0.66, 1, 1)], actors: [F(0.4, "man", "stand", "blue")] }),
      kf(105, { terrain: "hills", night: 0.5, props: [P("lampstand", 0.5, 1, 1)], actors: [F(0.45, "man", "walk", "brown")] }),
      kf(129, { terrain: "mountain", glory: 0.7, props: [P("tablets", 0.5, 1.1)], actors: [F(0.45, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 40, reaction: "Bem-aventurados os que andam na lei do SENHOR. 📜" },
      { upTo: 96, reaction: "Oh! Quanto amo a tua lei; é minha meditação o dia todo. 🤍" },
      { upTo: 128, reaction: "Lâmpada para os meus pés é a tua palavra. 🕯️" },
      { upTo: 99, reaction: "Tua palavra é firme nos céus para sempre. ✨" },
    ],
  },
  120: {
    keyframes: [
      kf(1, { terrain: "desert", night: 0.4, actors: [F(0.45, "man", "mourn", "gray")] }),
      kf(5, { terrain: "hills", actors: [F(0.45, "man", "walk", "brown")] }),
    ],
    beats: [
      { upTo: 4, reaction: "Cântico de romaria: na angústia clamei, e ele me ouviu. 🙏" },
      { upTo: 99, reaction: "Sou pela paz; peregrino em terra distante. 🕊️" },
    ],
  },
  121: {
    keyframes: [
      kf(1, { terrain: "mountain", glory: 0.4, actors: [F(0.45, "man", "raise", "brown")] }),
      kf(5, { terrain: "mountain", glory: 0.6, actors: [F(0.45, "man", "stand", "brown")] }),
    ],
    beats: [
      { upTo: 4, reaction: "Levanto os olhos para os montes: de onde virá o socorro? ⛰️" },
      { upTo: 99, reaction: "O meu socorro vem do SENHOR, que não dorme. 🌟" },
    ],
  },
  122: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.7, glory: 0.3, props: [P("tower", 0.72), P("tower", 0.2, 0.8)], actors: [F(0.45, "man", "raise", "blue")] }),
    ],
    beats: [
      { upTo: 5, reaction: "Alegrei-me: vamos à casa do SENHOR! 🏛️" },
      { upTo: 99, reaction: "Orai pela paz de Jerusalém. 🕊️" },
    ],
  },
  123: {
    keyframes: [
      kf(1, { terrain: "hills", glory: 0.5, actors: [F(0.45, "servant", "raise", "sand")] }),
    ],
    beats: [
      { upTo: 2, reaction: "A ti levanto os olhos, ó tu que habitas nos céus. 🙏" },
      { upTo: 99, reaction: "Tem piedade de nós, SENHOR. 🤍" },
    ],
  },
  124: {
    keyframes: [
      kf(1, { terrain: "sea", flood: 0.6, crowd: 0.4, actors: [F(0.45, "man", "raise", "blue")] }),
      kf(7, { terrain: "hills", glory: 0.4, props: [P("dove", 0.6)], actors: [F(0.45, "man", "stand", "brown")] }),
    ],
    beats: [
      { upTo: 5, reaction: "Se o SENHOR não estivera por nós, as águas nos teriam afogado. 🌊" },
      { upTo: 99, reaction: "Escapamos como ave do laço do passarinheiro. 🕊️" },
    ],
  },
  125: {
    keyframes: [
      kf(1, { terrain: "mountain", glory: 0.4, props: [P("tower", 0.7)], actors: [F(0.45, "man", "stand", "brown")] }),
    ],
    beats: [
      { upTo: 3, reaction: "Os que confiam no SENHOR são como o monte Sião. ⛰️" },
      { upTo: 99, reaction: "Paz sobre Israel! 🕊️" },
    ],
  },
  126: {
    keyframes: [
      kf(1, { terrain: "field", glory: 0.4, crowd: 0.4, actors: [F(0.45, "man", "raise", "green")] }),
      kf(5, { terrain: "field", props: [P("basket", 0.66)], actors: [F(0.4, "man", "carry", "sand")] }),
    ],
    beats: [
      { upTo: 4, reaction: "Quando o SENHOR trouxe os cativos, éramos como sonhadores. 😊" },
      { upTo: 99, reaction: "Os que semeiam com lágrimas ceifarão com alegria. 🌾" },
    ],
  },
  127: {
    keyframes: [
      kf(1, { terrain: "city", props: [P("tower", 0.66)], actors: [F(0.4, "man", "carry", "brown")] }),
      kf(3, { terrain: "city", glory: 0.3, actors: [F(0.4, "man", "stand", "blue"), F(0.6, "child", "stand", "green")] }),
    ],
    beats: [
      { upTo: 2, reaction: "Se o SENHOR não edificar a casa, em vão trabalham. 🏗️" },
      { upTo: 99, reaction: "Os filhos são herança do SENHOR. 👨‍👦" },
    ],
  },
  128: {
    keyframes: [
      kf(1, { terrain: "garden", glory: 0.3, props: [P("tree", 0.66)], actors: [F(0.4, "man", "stand", "brown"), F(0.6, "woman", "stand", "green")] }),
    ],
    beats: [
      { upTo: 3, reaction: "Bem-aventurado o que teme ao SENHOR. 🍇" },
      { upTo: 99, reaction: "Tua esposa como videira; teus filhos, como oliveiras. 🌿" },
    ],
  },
  129: {
    keyframes: [
      kf(1, { terrain: "field", night: 0.3, actors: [F(0.45, "man", "mourn", "gray")] }),
      kf(5, { terrain: "hills", glory: 0.3, actors: [F(0.45, "man", "stand", "brown")] }),
    ],
    beats: [
      { upTo: 4, reaction: "Muitas vezes me afligiram desde a minha mocidade. 😔" },
      { upTo: 99, reaction: "Mas o SENHOR é justo e cortou as cordas dos ímpios. ✂️" },
    ],
  },
  130: {
    keyframes: [
      kf(1, { terrain: "sea", night: 0.6, actors: [F(0.45, "man", "kneel", "gray")] }),
      kf(5, { terrain: "sea", night: 0.3, glory: 0.4, actors: [F(0.45, "man", "raise", "blue")] }),
    ],
    beats: [
      { upTo: 4, reaction: "Das profundezas clamo a ti, SENHOR. 🌊" },
      { upTo: 99, reaction: "A minha alma espera no SENHOR mais que os guardas pela manhã. 🌅" },
    ],
  },
  131: {
    keyframes: [
      kf(1, { terrain: "hills", glory: 0.4, actors: [F(0.45, "woman", "stand", "blue"), F(0.6, "child", "stand", "white")] }),
    ],
    beats: [
      { upTo: 2, reaction: "Não é soberbo o meu coração, SENHOR. 🤍" },
      { upTo: 99, reaction: "Aquietei a minha alma como criança desmamada. 🕊️" },
    ],
  },
  132: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.5, props: [P("arkCovenant", 0.6, 1)], actors: [F(0.4, "king", "kneel", "gold")] }),
      kf(13, { terrain: "mountain", glory: 0.6, props: [P("tower", 0.7)], actors: [F(0.45, "king", "raise", "purple")] }),
    ],
    beats: [
      { upTo: 12, reaction: "Lembra-te, SENHOR, de Davi e de todas as suas aflições. 📦" },
      { upTo: 99, god: "Escolhi Sião; aqui habitarei, pois a desejei.", reaction: "O SENHOR escolheu Sião por morada. ✨" },
    ],
  },
  133: {
    keyframes: [
      kf(1, { terrain: "mountain", glory: 0.4, crowd: 0.5, actors: [F(0.4, "man", "stand", "white"), F(0.6, "man", "stand", "brown")] }),
    ],
    beats: [
      { upTo: 2, reaction: "Oh! Quão bom é os irmãos viverem em união. 🤝" },
      { upTo: 99, reaction: "Como o orvalho do Hermom que desce sobre Sião. 💧" },
    ],
  },
  134: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.6, glory: 0.4, props: [P("lampstand", 0.66, 1, 1)], actors: [F(0.45, "servant", "raise", "white")] }),
    ],
    beats: [
      { upTo: 2, reaction: "Bendizei ao SENHOR, vós que servis de noite na casa dele. 🌙" },
      { upTo: 99, reaction: "O SENHOR te abençoe desde Sião! 🙌" },
    ],
  },
  135: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.6, glory: 0.4, props: [P("lampstand", 0.7, 1, 1)], actors: [F(0.45, "servant", "raise", "white")] }),
      kf(15, { terrain: "city", night: 0.2, actors: [F(0.5, "man", "stand", "gray")] }),
    ],
    beats: [
      { upTo: 14, reaction: "Louvai ao SENHOR, servos que estais em sua casa. 🙌" },
      { upTo: 99, reaction: "Os ídolos são obra de mãos; o SENHOR reina. ✨" },
    ],
  },
  136: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.5, glory: 0.4, actors: [F(0.45, "man", "raise", "blue")] }),
      kf(10, { terrain: "sea", seaSplit: 0.6, actors: [F(0.4, "man", "walk", "brown")] }),
    ],
    beats: [
      { upTo: 9, reaction: "Rendei graças ao SENHOR, porque ele é bom. 🤍" },
      { upTo: 99, reaction: "Dividiu o Mar Vermelho — a sua misericórdia dura para sempre. 🌊" },
    ],
  },
  137: {
    keyframes: [
      kf(1, { terrain: "river", night: 0.5, props: [P("tree", 0.3), P("reeds", 0.8)], actors: [F(0.45, "man", "mourn", "gray")] }),
      kf(4, { terrain: "river", night: 0.6, props: [P("tree", 0.66)], actors: [F(0.4, "man", "lie", "gray"), F(0.6, "woman", "mourn", "blue")] }),
    ],
    beats: [
      { upTo: 3, reaction: "Junto aos rios da Babilônia, ali choramos por Sião. 😢" },
      { upTo: 99, reaction: "Penduramos nossas harpas nos salgueiros. 🎼🌙" },
    ],
  },
  138: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.5, actors: [F(0.45, "man", "bow", "purple")] }),
    ],
    beats: [
      { upTo: 3, reaction: "Louvar-te-ei de todo o coração diante dos deuses. 🙌" },
      { upTo: 99, reaction: "O SENHOR aperfeiçoará o que me diz respeito. 🤍" },
    ],
  },
  139: {
    keyframes: [
      kf(1, { terrain: "hills", glory: 0.5, actors: [F(0.45, "man", "kneel", "blue")] }),
      kf(7, { terrain: "sea", night: 0.5, glory: 0.3, actors: [F(0.45, "man", "stand", "gray")] }),
      kf(13, { terrain: "garden", glory: 0.5, actors: [F(0.45, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 6, reaction: "SENHOR, tu me sondas e me conheces. 🌟" },
      { upTo: 12, reaction: "Para onde fugir do teu Espírito? 🌊" },
      { upTo: 99, reaction: "Formaste o meu interior; sou obra maravilhosa. 🤍" },
    ],
  },
  140: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.4, actors: [F(0.45, "man", "mourn", "gray")] }),
      kf(6, { terrain: "city", glory: 0.3, actors: [F(0.45, "man", "kneel", "blue")] }),
    ],
    beats: [
      { upTo: 5, reaction: "Livra-me, SENHOR, do homem violento. 🙏" },
      { upTo: 99, reaction: "Tu és o meu Deus; ouve a voz das minhas súplicas. 🤍" },
    ],
  },
  141: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.5, props: [P("altar", 0.66, 0.9, 0.5), P("smoke", 0.66, 1.4)], actors: [F(0.4, "man", "raise", "blue")] }),
    ],
    beats: [
      { upTo: 4, reaction: "Suba a minha oração como incenso diante de ti. 🌫️" },
      { upTo: 99, reaction: "Põe guarda à minha boca, SENHOR. 🤍" },
    ],
  },
  142: {
    keyframes: [
      kf(1, { terrain: "desert", night: 0.5, props: [P("bush", 0.7)], actors: [F(0.45, "man", "kneel", "gray")] }),
    ],
    beats: [
      { upTo: 4, reaction: "Na caverna, derramo diante dele a minha queixa. 🕯️" },
      { upTo: 99, reaction: "Tu és o meu refúgio e a minha porção. 🤍" },
    ],
  },
  143: {
    keyframes: [
      kf(1, { terrain: "desert", night: 0.6, actors: [F(0.45, "man", "mourn", "gray")] }),
      kf(8, { terrain: "hills", glory: 0.4, actors: [F(0.45, "man", "raise", "blue")] }),
    ],
    beats: [
      { upTo: 7, reaction: "Ouve a minha oração, SENHOR; minha alma tem sede de ti. 🙏" },
      { upTo: 99, reaction: "Faze-me ouvir de manhã a tua benignidade. 🌅" },
    ],
  },
  144: {
    keyframes: [
      kf(1, { terrain: "mountain", storm: 0.4, actors: [F(0.45, "warrior", "raise", "red")] }),
      kf(9, { terrain: "field", glory: 0.4, props: [P("tree", 0.3)], actors: [F(0.4, "king", "raise", "purple")] }),
    ],
    beats: [
      { upTo: 8, reaction: "Bendito o SENHOR, que adestra minhas mãos para a guerra. ⚔️" },
      { upTo: 99, reaction: "Bem-aventurado o povo cujo Deus é o SENHOR. 🌾" },
    ],
  },
  145: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.5, crowd: 0.5, actors: [F(0.45, "king", "raise", "purple")] }),
      kf(10, { terrain: "hills", glory: 0.6, actors: [F(0.45, "man", "raise", "blue")] }),
    ],
    beats: [
      { upTo: 9, reaction: "Exaltar-te-ei, ó Deus, meu Rei; bendirei o teu nome. 👑" },
      { upTo: 99, reaction: "O SENHOR é bondoso para com todos. 🤍" },
    ],
  },
  146: {
    keyframes: [
      kf(1, { terrain: "hills", glory: 0.5, actors: [F(0.45, "man", "raise", "blue")] }),
      kf(7, { terrain: "city", glory: 0.4, actors: [F(0.4, "man", "kneel", "gray"), F(0.6, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 6, reaction: "Aleluia! Louva, ó minha alma, ao SENHOR! 🙌" },
      { upTo: 99, reaction: "Ele faz justiça aos oprimidos e liberta os cativos. ✨" },
    ],
  },
  147: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.5, crowd: 0.5, props: [P("tower", 0.7)], actors: [F(0.45, "man", "raise", "blue")] }),
      kf(8, { terrain: "mountain", glory: 0.5, rain: 0.3, actors: [F(0.4, "man", "stand", "brown")] }),
    ],
    beats: [
      { upTo: 7, reaction: "Louvai ao SENHOR: ele conta as estrelas e as chama pelo nome. ⭐" },
      { upTo: 99, reaction: "Cobre os céus de nuvens e faz crescer a erva nos montes. 🌧️" },
    ],
  },
  148: {
    keyframes: [
      kf(1, { terrain: "mountain", glory: 0.7, actors: [F(0.45, "angel", "raise", "white")] }),
      kf(7, { terrain: "sea", glory: 0.4, props: [P("tree", 0.3)], actors: [AN(0.6, "lion", 0.9)] }),
    ],
    beats: [
      { upTo: 6, reaction: "Louvai-o, sol e lua; louvai-o, todas as estrelas! ☀️🌙" },
      { upTo: 99, reaction: "Montes, feras, aves e todos os povos: louvai ao SENHOR! 🦁🕊️" },
    ],
  },
  149: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.7, glory: 0.5, actors: [F(0.4, "man", "raise", "blue"), F(0.6, "woman", "raise", "green")] }),
      kf(6, { terrain: "city", glory: 0.4, actors: [F(0.45, "warrior", "raise", "red")] }),
    ],
    beats: [
      { upTo: 5, reaction: "Cantai ao SENHOR um cântico novo na congregação dos santos! 🎶" },
      { upTo: 99, reaction: "Os louvores de Deus na boca deles. ✨" },
    ],
  },
  150: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.7, crowd: 0.8, actors: [F(0.35, "man", "raise", "blue"), F(0.55, "woman", "raise", "purple"), F(0.72, "man", "raise", "white")] }),
      kf(3, { terrain: "city", glory: 0.9, crowd: 0.9, actors: [F(0.4, "man", "raise", "gold"), F(0.62, "woman", "raise", "green")] }),
    ],
    beats: [
      { upTo: 2, reaction: "Louvai a Deus no seu santuário! 🙌" },
      { upTo: 99, reaction: "Tudo o que respira louve ao SENHOR. Aleluia! 🎺✨" },
    ],
  },
};
