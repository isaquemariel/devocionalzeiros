// ============================================================================
// Roteiros de cena (Living Scene v2) — JEREMIAS, capítulos 27 a 52.
// O jugo de madeira, a nova aliança escrita no coração, a compra do campo em
// Anatote, o rolo queimado por Jeoaquim, o profeta na cisterna de lama, a queda
// de Jerusalém, o templo em chamas e o exílio na Babilônia.
// Puramente visual/narrativo — não toca em progresso.
// Segue o padrão de Êxodo (rpgExodusScenes).
// ============================================================================

import type { ChapterScript, V2Actor, V2Prop, SceneState } from "@/lib/rpgLivingV2";

const F = (x: number, role: V2Actor["role"], action: V2Actor["action"], palette?: V2Actor["palette"], extra: Partial<V2Actor> = {}): V2Actor => ({ x, role, action, palette, ...extra });
const AN = (x: number, animal: NonNullable<V2Actor["animal"]>, scale = 1, color?: string): V2Actor => ({ x, kind: "animal", animal, scale, color });
const P = (kind: string, x: number, scale = 1, fire?: number): V2Prop => ({ kind, x, scale, ...(fire != null ? { fire } : {}) });
const kf = (v: number, state: SceneState) => ({ v, state });

export const JEREMIAH_2: Record<number, ChapterScript> = {
  27: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.4, actors: [F(0.42, "elder", "carry", "brown"), F(0.66, "man", "stand", "sand")] }),
      kf(3, { terrain: "city", crowd: 0.5, actors: [F(0.4, "elder", "raise", "brown"), F(0.62, "king", "stand", "purple"), F(0.78, "king", "stand", "red")] }),
      kf(12, { terrain: "city", crowd: 0.4, props: [P("tower", 0.82, 0.9)], actors: [F(0.4, "elder", "raise", "brown"), F(0.66, "king", "mourn", "purple")] }),
    ],
    beats: [
      { upTo: 2, god: "Faze cordas e canzis, e põe-nos sobre o teu pescoço.", reaction: "Jeremias carrega um jugo de madeira. 🪵" },
      { upTo: 11, god: "Entreguei estas terras nas mãos de Nabucodonosor, meu servo.", reaction: "A nação que curvar o pescoço viverá. 👑" },
      { upTo: 99, god: "Servi ao rei da Babilônia e vivereis.", reaction: "'Não deis ouvidos aos falsos profetas.' 🙏" },
    ],
  },
  28: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.5, props: [P("tower", 0.84, 0.9)], actors: [F(0.4, "elder", "carry", "brown"), F(0.64, "man", "raise", "white")] }),
      kf(10, { terrain: "city", crowd: 0.4, actors: [F(0.42, "elder", "stand", "brown"), F(0.62, "man", "fight", "white", { facing: -1 })] }),
      kf(13, { terrain: "city", night: 0.2, actors: [F(0.42, "elder", "raise", "brown"), F(0.66, "man", "mourn", "white")] }),
    ],
    beats: [
      { upTo: 4, reaction: "O falso profeta Hananias promete paz em dois anos. 🕊️" },
      { upTo: 11, reaction: "Ele quebra o jugo de madeira do pescoço de Jeremias. 💥" },
      { upTo: 99, god: "Quebraste jugos de madeira, mas farás jugos de ferro.", reaction: "Hananias morre naquele ano. 😔" },
    ],
  },
  29: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.5, actors: [F(0.4, "elder", "carry", "brown"), F(0.68, "servant", "walk", "sand")] }),
      kf(4, { terrain: "river", crowd: 0.6, props: [P("tower", 0.16, 1.1), P("tower", 0.86, 0.9)], actors: [F(0.4, "man", "stand", "blue"), F(0.6, "woman", "carry", "purple"), F(0.76, "child", "stand", "green")] }),
      kf(11, { terrain: "city", glory: 0.4, actors: [F(0.45, "man", "kneel", "blue")] }),
    ],
    beats: [
      { upTo: 3, reaction: "Jeremias envia uma carta aos exilados na Babilônia. ✉️" },
      { upTo: 10, god: "Edificai casas, plantai hortas e buscai a paz da cidade.", reaction: "Setenta anos, e Deus os visitará. 🏡" },
      { upTo: 99, god: "Eu sei os planos que tenho para vós: planos de paz.", reaction: "'Buscar-me-eis e me achareis de todo o coração.' ✨" },
    ],
  },
  30: {
    keyframes: [
      kf(1, { terrain: "hills", night: 0.3, actors: [F(0.42, "elder", "stand", "brown")] }),
      kf(10, { terrain: "hills", glory: 0.4, actors: [F(0.44, "elder", "raise", "brown")] }),
      kf(18, { terrain: "city", glory: 0.5, props: [P("tower", 0.8, 1)], actors: [F(0.4, "man", "raise", "blue")] }),
    ],
    beats: [
      { upTo: 9, god: "Escreve num livro todas as palavras que te falei.", reaction: "Tempo de angústia para Jacó — mas será salvo. 📖" },
      { upTo: 17, god: "Restaurarei a tua saúde e sararei as tuas feridas.", reaction: "O SENHOR promete cura ao seu povo. 🤍" },
      { upTo: 99, god: "Sereis o meu povo, e eu serei o vosso Deus.", reaction: "A cidade será reedificada sobre o seu monte. 🏛️" },
    ],
  },
  31: {
    keyframes: [
      kf(1, { terrain: "hills", glory: 0.4, actors: [F(0.4, "woman", "raise", "purple"), F(0.6, "woman", "stand", "green")] }),
      kf(13, { terrain: "field", glory: 0.5, actors: [F(0.35, "woman", "raise", "purple"), F(0.55, "man", "raise", "blue"), F(0.72, "child", "stand", "green")] }),
      kf(15, { terrain: "hills", night: 0.4, actors: [F(0.5, "woman", "mourn", "gray")] }),
      kf(31, { terrain: "mountain", glory: 0.9, props: [P("tablets", 0.5, 1.1)], actors: [F(0.4, "man", "kneel", "white")] }),
      kf(33, { terrain: "mountain", glory: 0.95, crowd: 0.4, props: [P("tablets", 0.52, 1.1)], actors: [F(0.42, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 6, god: "Com amor eterno eu te amei; por isso te atraí com benignidade.", reaction: "Deus promete restaurar Israel. 💗" },
      { upTo: 14, reaction: "Alegria em vez de tristeza: dançam moças e anciãos. 🎶" },
      { upTo: 30, reaction: "Raquel chora por seus filhos — mas há esperança no fim. 😢" },
      { upTo: 99, god: "Porei a minha Lei no seu interior e a escreverei no seu coração.", reaction: "A nova aliança! 'Serei o seu Deus.' 📜✨" },
    ],
  },
  32: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.4, props: [P("tower", 0.82, 1)], actors: [F(0.42, "elder", "stand", "brown"), F(0.66, "king", "stand", "purple")] }),
      kf(8, { terrain: "field", glory: 0.3, props: [P("tree", 0.7), P("well", 0.28)], actors: [F(0.4, "elder", "carry", "brown"), F(0.6, "man", "stand", "sand")] }),
      kf(9, { terrain: "field", glory: 0.4, props: [P("tree", 0.72), P("basket", 0.5)], actors: [F(0.42, "elder", "kneel", "brown")] }),
      kf(17, { terrain: "field", glory: 0.6, actors: [F(0.44, "elder", "raise", "brown")] }),
    ],
    beats: [
      { upTo: 5, reaction: "Jerusalém está sitiada; Jeremias, preso no pátio da guarda. 🏰" },
      { upTo: 15, god: "Compra o campo, pois ainda se comprarão casas e vinhas nesta terra.", reaction: "Jeremias compra um campo em Anatote — sinal de esperança! 🌾" },
      { upTo: 26, god: "Eis que eu sou o SENHOR; acaso há coisa demasiado difícil para mim?", reaction: "O profeta ora, guardando a escritura num vaso. 🏺" },
      { upTo: 99, god: "De todo o meu coração os plantarei nesta terra.", reaction: "Deus jura restaurar o povo. ✨" },
    ],
  },
  33: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.3, actors: [F(0.45, "elder", "kneel", "brown")] }),
      kf(6, { terrain: "city", glory: 0.5, props: [P("tower", 0.8, 1)], actors: [F(0.44, "man", "raise", "blue")] }),
      kf(15, { terrain: "field", glory: 0.5, props: [P("tree", 0.7)], actors: [F(0.4, "man", "stand", "purple")] }),
    ],
    beats: [
      { upTo: 5, god: "Clama a mim, e responder-te-ei; anunciar-te-ei coisas grandes.", reaction: "Deus fala ao profeta ainda preso. 🙏" },
      { upTo: 13, god: "Trarei a esta cidade saúde e cura; farei voltar o cativeiro.", reaction: "Voltará o som de alegria às ruas. 🎶" },
      { upTo: 99, god: "Farei brotar a Davi um Renovo de justiça.", reaction: "A promessa do Rei justo. 🌿👑" },
    ],
  },
  34: {
    keyframes: [
      kf(1, { terrain: "city", fire: 0.3, crowd: 0.4, props: [P("tower", 0.82, 1)], actors: [F(0.42, "elder", "raise", "brown"), F(0.66, "king", "mourn", "purple")] }),
      kf(8, { terrain: "city", crowd: 0.5, actors: [F(0.4, "king", "stand", "purple"), F(0.62, "servant", "kneel", "gray")] }),
      kf(16, { terrain: "city", night: 0.3, actors: [F(0.42, "elder", "raise", "brown"), F(0.66, "man", "mourn", "sand")] }),
    ],
    beats: [
      { upTo: 7, god: "Esta cidade será entregue nas mãos do rei da Babilônia.", reaction: "Nabucodonosor cerca Jerusalém. 🔥" },
      { upTo: 15, reaction: "Zedequias liberta os escravos hebreus — depois os retoma. ⛓️" },
      { upTo: 99, god: "Por não guardardes a aliança, entrego-vos à espada.", reaction: "A palavra quebrada traz juízo. 😔" },
    ],
  },
  35: {
    keyframes: [
      kf(1, { terrain: "city", actors: [F(0.4, "elder", "stand", "brown"), F(0.6, "man", "stand", "sand"), F(0.74, "man", "stand", "brown")] }),
      kf(5, { terrain: "city", props: [P("tent", 0.78)], actors: [F(0.42, "elder", "raise", "brown"), F(0.64, "man", "stand", "sand")] }),
    ],
    beats: [
      { upTo: 11, reaction: "Os recabitas recusam beber vinho, fiéis ao mandamento do pai. 🍷🚫" },
      { upTo: 99, god: "Os recabitas guardaram a ordem, mas vós não me ouvis.", reaction: "A fidelidade deles condena a rebeldia de Judá. 🤍" },
    ],
  },
  36: {
    keyframes: [
      kf(1, { terrain: "city", actors: [F(0.4, "elder", "stand", "brown"), F(0.62, "servant", "kneel", "sand")] }),
      kf(4, { terrain: "city", props: [P("basket", 0.7)], actors: [F(0.4, "elder", "raise", "brown"), F(0.62, "servant", "carry", "sand")] }),
      kf(21, { terrain: "city", night: 0.6, fire: 0.7, props: [P("altar", 0.5, 0.8, 0.9)], actors: [F(0.4, "king", "stand", "purple"), F(0.62, "servant", "stand", "gray")] }),
      kf(27, { terrain: "city", night: 0.5, actors: [F(0.42, "elder", "stand", "brown"), F(0.62, "servant", "carry", "sand")] }),
    ],
    beats: [
      { upTo: 8, god: "Toma um rolo e escreve nele todas as palavras que te falei.", reaction: "Baruque escreve o rolo do profeta. 📜✍️" },
      { upTo: 20, reaction: "O rolo é lido diante do rei Jeoaquim. 👑" },
      { upTo: 26, reaction: "O rei corta o rolo e o lança ao fogo, coluna por coluna! 🔥" },
      { upTo: 99, god: "Toma outro rolo e escreve tudo de novo.", reaction: "A palavra de Deus não se queima — reescrita! ✨" },
    ],
  },
  37: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.4, actors: [F(0.4, "king", "stand", "purple"), F(0.62, "elder", "stand", "brown")] }),
      kf(11, { terrain: "plain", actors: [F(0.4, "elder", "walk", "brown"), F(0.66, "warrior", "fight", "gray", { facing: -1 })] }),
      kf(15, { terrain: "city", night: 0.6, props: [P("tower", 0.8, 0.9)], actors: [F(0.45, "elder", "lie", "brown")] }),
    ],
    beats: [
      { upTo: 10, god: "Ainda que ferísseis todo o exército, esta cidade seria queimada.", reaction: "Zedequias busca a palavra do profeta. 🏰" },
      { upTo: 16, reaction: "Jeremias é preso, acusado de desertar. ⛓️" },
      { upTo: 99, reaction: "O rei, em segredo, o transfere ao pátio da guarda. 🗝️" },
    ],
  },
  38: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.4, actors: [F(0.42, "elder", "stand", "brown"), F(0.66, "man", "fight", "gray", { facing: -1 })] }),
      kf(6, { terrain: "city", night: 0.6, props: [P("well", 0.5, 1.2)], actors: [F(0.5, "elder", "mourn", "brown")] }),
      kf(11, { terrain: "city", night: 0.4, props: [P("well", 0.5, 1.2)], actors: [F(0.4, "servant", "raise", "sand"), F(0.58, "elder", "kneel", "brown")] }),
      kf(14, { terrain: "city", actors: [F(0.4, "king", "stand", "purple"), F(0.62, "elder", "stand", "brown")] }),
    ],
    beats: [
      { upTo: 5, reaction: "Os príncipes acusam Jeremias de desanimar o povo. 😠" },
      { upTo: 9, reaction: "Lançam-no na cisterna: afunda na lama, sem água. 🕳️" },
      { upTo: 13, reaction: "Ebede-Meleque o resgata com cordas e trapos. 🪢" },
      { upTo: 99, god: "Se saíres aos príncipes da Babilônia, viverás e a cidade não se queimará.", reaction: "Jeremias adverte Zedequias em segredo. 🙏" },
    ],
  },
  39: {
    keyframes: [
      kf(1, { terrain: "city", fire: 0.4, crowd: 0.5, props: [P("tower", 0.82, 1)], actors: [F(0.4, "warrior", "fight", "gray"), F(0.66, "man", "mourn", "purple")] }),
      kf(4, { terrain: "plain", night: 0.5, actors: [F(0.4, "king", "walk", "purple"), F(0.64, "warrior", "fight", "red", { facing: -1 })] }),
      kf(8, { terrain: "city", fire: 0.85, night: 0.5, crowd: 0.5, props: [P("tower", 0.8, 1)], actors: [F(0.5, "man", "mourn", "sand")] }),
      kf(11, { terrain: "city", night: 0.4, actors: [F(0.4, "elder", "stand", "brown"), F(0.62, "warrior", "stand", "gray")] }),
    ],
    beats: [
      { upTo: 3, reaction: "No 11º ano, rompem os muros de Jerusalém. 💥" },
      { upTo: 7, reaction: "Zedequias foge, é capturado e cegado. 😢" },
      { upTo: 10, reaction: "A cidade e o palácio são queimados; o povo, levado. 🔥⛓️" },
      { upTo: 99, god: "Livrar-te-ei naquele dia, porque confiaste em mim.", reaction: "Jeremias é poupado; Ebede-Meleque é salvo. 🤍" },
    ],
  },
  40: {
    keyframes: [
      kf(1, { terrain: "plain", crowd: 0.4, actors: [F(0.4, "elder", "stand", "brown"), F(0.64, "warrior", "stand", "gray")] }),
      kf(6, { terrain: "city", actors: [F(0.4, "man", "stand", "purple"), F(0.62, "elder", "stand", "brown")] }),
      kf(9, { terrain: "field", crowd: 0.5, props: [P("tree", 0.72)], actors: [F(0.4, "man", "raise", "purple"), F(0.62, "man", "carry", "sand")] }),
    ],
    beats: [
      { upTo: 5, reaction: "Jeremias é libertado e escolhe ficar na terra. 🕊️" },
      { upTo: 12, reaction: "Gedalias é feito governador; o remanescente colhe frutos. 🌾" },
      { upTo: 99, reaction: "Avisam Gedalias de uma conspiração — ele não crê. ⚠️" },
    ],
  },
  41: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.4, actors: [F(0.4, "man", "stand", "purple"), F(0.62, "warrior", "fight", "red", { facing: 1 })] }),
      kf(7, { terrain: "city", night: 0.5, props: [P("well", 0.72)], actors: [F(0.5, "man", "mourn", "sand")] }),
      kf(11, { terrain: "field", actors: [F(0.4, "warrior", "walk", "gray"), F(0.66, "man", "walk", "red", { facing: -1 })] }),
    ],
    beats: [
      { upTo: 3, reaction: "Ismael assassina Gedalias à mesa. 🗡️" },
      { upTo: 10, reaction: "Mata peregrinos e leva cativos os que restam. 😢" },
      { upTo: 99, reaction: "Joanã persegue Ismael e livra o povo. 🛡️" },
    ],
  },
  42: {
    keyframes: [
      kf(1, { terrain: "plain", crowd: 0.5, actors: [F(0.4, "elder", "stand", "brown"), F(0.6, "man", "kneel", "sand"), F(0.76, "man", "kneel", "gray")] }),
      kf(7, { terrain: "plain", glory: 0.4, actors: [F(0.42, "elder", "raise", "brown")] }),
    ],
    beats: [
      { upTo: 6, reaction: "O povo pede a Jeremias que consulte a Deus. 🙏" },
      { upTo: 12, god: "Se ficardes nesta terra, eu vos edificarei e não vos destruirei.", reaction: "Deus manda permanecer, sem temer a Babilônia. 🤍" },
      { upTo: 99, god: "Se entrardes no Egito, ali morrereis à espada e à fome.", reaction: "Advertência contra a fuga ao Egito. ⚠️" },
    ],
  },
  43: {
    keyframes: [
      kf(1, { terrain: "plain", crowd: 0.5, actors: [F(0.4, "elder", "raise", "brown"), F(0.64, "man", "fight", "gray", { facing: -1 })] }),
      kf(7, { terrain: "desert", crowd: 0.6, actors: [F(0.35, "elder", "walk", "brown"), F(0.6, "man", "carry", "sand")] }),
      kf(8, { terrain: "city", props: [P("pyramid", 0.82, 1), P("altar", 0.4, 0.9)], actors: [F(0.4, "elder", "raise", "brown")] }),
    ],
    beats: [
      { upTo: 7, reaction: "Rejeitam a palavra e descem ao Egito, levando Jeremias. 😔" },
      { upTo: 99, god: "Nabucodonosor virá e ferirá a terra do Egito.", reaction: "O profeta esconde pedras: até ali chegará o juízo. 🪨" },
    ],
  },
  44: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.5, props: [P("pyramid", 0.84, 0.9)], actors: [F(0.4, "elder", "raise", "brown"), F(0.66, "woman", "stand", "purple")] }),
      kf(15, { terrain: "city", night: 0.3, props: [P("altar", 0.5, 0.8, 0.5)], actors: [F(0.4, "woman", "kneel", "purple"), F(0.62, "man", "stand", "sand")] }),
      kf(24, { terrain: "city", fire: 0.3, actors: [F(0.42, "elder", "raise", "brown")] }),
    ],
    beats: [
      { upTo: 14, god: "Por que fazeis tão grande mal contra vós mesmos?", reaction: "Idolatria persiste entre os judeus no Egito. 😔" },
      { upTo: 23, reaction: "Insistem em queimar incenso à 'rainha dos céus'. 🌫️" },
      { upTo: 99, god: "Entregarei Faraó Hofra nas mãos dos seus inimigos.", reaction: "Um sinal de juízo sobre o Egito. ⚔️" },
    ],
  },
  45: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.3, actors: [F(0.42, "elder", "stand", "brown"), F(0.62, "servant", "mourn", "sand")] }),
      kf(5, { terrain: "city", glory: 0.4, actors: [F(0.44, "servant", "kneel", "sand")] }),
    ],
    beats: [
      { upTo: 3, reaction: "Baruque geme sob o peso da tristeza. 😢" },
      { upTo: 99, god: "Buscas grandezas? Não as busques. Mas dar-te-ei a tua vida.", reaction: "Deus consola o fiel escriba. 🤍" },
    ],
  },
  46: {
    keyframes: [
      kf(1, { terrain: "river", crowd: 0.5, props: [P("pyramid", 0.16, 1.1)], actors: [F(0.4, "warrior", "fight", "gray"), F(0.66, "warrior", "fight", "red", { facing: -1 })] }),
      kf(13, { terrain: "plain", storm: 0.4, crowd: 0.5, actors: [F(0.4, "warrior", "fight", "gray")] }),
      kf(27, { terrain: "hills", glory: 0.4, actors: [F(0.44, "man", "raise", "blue")] }),
    ],
    beats: [
      { upTo: 12, god: "O Egito subiu como o Nilo, mas cairá junto ao Eufrates.", reaction: "A derrota do Egito em Carquemis. ⚔️" },
      { upTo: 26, reaction: "Nabucodonosor ferirá a terra do Egito. 🌊" },
      { upTo: 99, god: "Não temas, servo Jacó, porque estou contigo.", reaction: "Palavra de consolo a Israel. 🤍" },
    ],
  },
  47: {
    keyframes: [
      kf(1, { terrain: "sea", storm: 0.6, flood: 0.5, crowd: 0.4, actors: [F(0.4, "warrior", "fight", "gray")] }),
      kf(5, { terrain: "sea", night: 0.4, actors: [F(0.5, "man", "mourn", "sand")] }),
    ],
    beats: [
      { upTo: 4, god: "Eis que sobem águas do norte e inundam a terra.", reaction: "Juízo contra os filisteus. 🌊" },
      { upTo: 99, reaction: "Gaza e Ascalom clamam em desespero. 😢" },
    ],
  },
  48: {
    keyframes: [
      kf(1, { terrain: "mountain", night: 0.3, crowd: 0.4, actors: [F(0.4, "warrior", "fight", "gray")] }),
      kf(11, { terrain: "hills", actors: [F(0.4, "man", "stand", "purple")] }),
      kf(31, { terrain: "hills", night: 0.4, actors: [F(0.5, "man", "mourn", "sand")] }),
    ],
    beats: [
      { upTo: 10, god: "Ai de Nebo, porque foi destruída!", reaction: "Juízo sobre Moabe, orgulhoso e confiante. 🏔️" },
      { upTo: 30, god: "Moabe esteve descansado desde a mocidade, sem ser mudado.", reaction: "Seu orgulho será quebrado. 🍷" },
      { upTo: 99, god: "Contudo, farei voltar o cativeiro de Moabe nos últimos dias.", reaction: "Até no juízo, um resto de esperança. 🤍" },
    ],
  },
  49: {
    keyframes: [
      kf(1, { terrain: "plain", crowd: 0.4, actors: [F(0.4, "warrior", "fight", "gray"), F(0.66, "man", "mourn", "sand")] }),
      kf(7, { terrain: "mountain", night: 0.3, props: [P("tower", 0.82, 0.9)], actors: [F(0.4, "warrior", "stand", "red")] }),
      kf(23, { terrain: "desert", storm: 0.4, actors: [F(0.4, "man", "mourn", "sand")] }),
    ],
    beats: [
      { upTo: 6, god: "Contra os amonitas: por que Milcom herdou Gade?", reaction: "Juízo sobre Amom. ⚔️" },
      { upTo: 22, god: "Edom será assombro; farei descer o teu ninho das alturas.", reaction: "A soberba de Edom cairá. 🦅" },
      { upTo: 99, reaction: "Damasco, Quedar e Elão também são julgados. 🌪️" },
    ],
  },
  50: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.5, props: [P("tower", 0.16, 1.2), P("tower", 0.84, 1)], actors: [F(0.4, "man", "raise", "brown")] }),
      kf(4, { terrain: "plain", glory: 0.4, crowd: 0.5, actors: [F(0.35, "man", "walk", "blue"), F(0.58, "man", "walk", "sand")] }),
      kf(9, { terrain: "city", fire: 0.6, night: 0.4, props: [P("tower", 0.82, 1)], actors: [F(0.4, "warrior", "fight", "gray")] }),
    ],
    beats: [
      { upTo: 3, god: "Anunciai entre as nações: Babilônia foi tomada!", reaction: "A sentença contra a grande cidade. 🏛️" },
      { upTo: 8, god: "Naqueles dias virão os filhos de Israel buscando o SENHOR.", reaction: "O povo voltará chorando a Sião. 🕊️" },
      { upTo: 99, god: "Uma nação do norte subirá contra ela.", reaction: "A queda da Babilônia se aproxima. 🔥" },
    ],
  },
  51: {
    keyframes: [
      kf(1, { terrain: "river", crowd: 0.5, props: [P("tower", 0.16, 1.2), P("tower", 0.86, 1)], actors: [F(0.4, "warrior", "fight", "gray")] }),
      kf(37, { terrain: "city", fire: 0.7, night: 0.5, props: [P("tower", 0.82, 1)], actors: [F(0.5, "man", "mourn", "sand")] }),
      kf(59, { terrain: "river", night: 0.4, props: [P("reeds", 0.2), P("reeds", 0.82)], actors: [F(0.42, "servant", "carry", "sand")] }),
    ],
    beats: [
      { upTo: 24, god: "Suscitarei contra a Babilônia um vento destruidor.", reaction: "Retribuição pelo mal feito a Sião. 🌪️" },
      { upTo: 58, god: "Os largos muros da Babilônia serão derrubados por terra.", reaction: "A cidade orgulhosa vira ruína. 🔥" },
      { upTo: 99, reaction: "Seraías lê o rolo e o lança no Eufrates: 'Assim se afundará.' 📜🌊" },
    ],
  },
  52: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.4, props: [P("tower", 0.82, 1)], actors: [F(0.4, "king", "stand", "purple")] }),
      kf(4, { terrain: "city", fire: 0.4, crowd: 0.5, props: [P("tower", 0.16, 1.1), P("tower", 0.84, 1)], actors: [F(0.4, "warrior", "fight", "gray"), F(0.66, "man", "mourn", "sand")] }),
      kf(12, { terrain: "city", fire: 0.9, night: 0.5, crowd: 0.5, props: [P("altar", 0.5, 1, 0.9), P("tower", 0.82, 1)], actors: [F(0.4, "warrior", "stand", "red")] }),
      kf(28, { terrain: "desert", night: 0.5, crowd: 0.8, actors: [F(0.32, "man", "walk", "sand"), F(0.5, "woman", "mourn", "purple"), F(0.7, "child", "walk", "green")] }),
      kf(31, { terrain: "city", glory: 0.3, props: [P("tower", 0.8, 1)], actors: [F(0.45, "king", "stand", "purple")] }),
    ],
    beats: [
      { upTo: 3, reaction: "Zedequias faz o mal, e o SENHOR se irou contra Jerusalém. 😔" },
      { upTo: 11, reaction: "Os muros são rompidos; o rei é preso e cegado. 😢" },
      { upTo: 23, reaction: "O templo é incendiado e seus tesouros, levados. 🔥🏛️" },
      { upTo: 30, reaction: "O povo é levado cativo à Babilônia. ⛓️" },
      { upTo: 99, reaction: "Anos depois, Joaquim é erguido do cárcere — um lampejo de graça. 🕊️" },
    ],
  },
};
