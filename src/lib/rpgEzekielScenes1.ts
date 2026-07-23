// ============================================================================
// Roteiros de cena (Living Scene v2) — EZEQUIEL, capítulos 1 a 24.
// A visão junto ao rio Quebar — os seres viventes, as rodas e o trono de
// safira, a glória do SENHOR; Ezequiel come o rolo doce como mel; sinais
// proféticos do cerco de Jerusalém; a glória do SENHOR deixa o templo;
// parábolas e juízos; a morte da esposa como sinal.
// Puramente visual/narrativo — não toca em progresso.
// Segue o padrão de Êxodo (rpgExodusScenes).
// ============================================================================

import type { ChapterScript, V2Actor, V2Prop, SceneState } from "@/lib/rpgLivingV2";

const F = (x: number, role: V2Actor["role"], action: V2Actor["action"], palette?: V2Actor["palette"], extra: Partial<V2Actor> = {}): V2Actor => ({ x, role, action, palette, ...extra });
const AN = (x: number, animal: NonNullable<V2Actor["animal"]>, scale = 1, color?: string): V2Actor => ({ x, kind: "animal", animal, scale, color });
const P = (kind: string, x: number, scale = 1, fire?: number): V2Prop => ({ kind, x, scale, ...(fire != null ? { fire } : {}) });
const kf = (v: number, state: SceneState) => ({ v, state });

export const EZEKIEL_1: Record<number, ChapterScript> = {
  1: {
    keyframes: [
      kf(1, { terrain: "river", storm: 0.6, props: [P("reeds", 0.18), P("reeds", 0.84)], actors: [F(0.4, "man", "stand", "brown")] }),
      kf(4, { terrain: "river", storm: 0.8, fire: 0.6, glory: 0.4, props: [P("reeds", 0.2)], actors: [F(0.38, "man", "bow", "brown")] }),
      kf(15, { terrain: "river", glory: 0.6, fire: 0.5, props: [P("reeds", 0.16), P("reeds", 0.86)], actors: [F(0.4, "angel", "stand", "gold")] }),
      kf(26, { terrain: "river", glory: 0.95, storm: 0.3, props: [], actors: [F(0.4, "man", "bow", "brown")] }),
    ],
    beats: [
      { upTo: 3, reaction: "Junto ao rio Quebar, os céus se abrem sobre Ezequiel. 🌊" },
      { upTo: 14, reaction: "Do norte vem um vento tempestuoso: fogo e quatro seres viventes. 🔥" },
      { upTo: 25, reaction: "Ao lado deles, rodas dentro de rodas, cheias de olhos. ⚙️" },
      { upTo: 99, reaction: "Sobre um trono de safira, a semelhança da glória do SENHOR. 👑✨" },
    ],
  },
  2: {
    keyframes: [
      kf(1, { terrain: "river", glory: 0.7, props: [P("reeds", 0.2)], actors: [F(0.42, "man", "kneel", "brown")] }),
      kf(3, { terrain: "river", glory: 0.6, actors: [F(0.42, "man", "stand", "brown")] }),
      kf(9, { terrain: "river", glory: 0.7, props: [P("tablets", 0.55, 0.9)], actors: [F(0.4, "man", "raise", "brown")] }),
    ],
    beats: [
      { upTo: 2, god: "Filho do homem, põe-te em pé, e falarei contigo.", reaction: "O Espírito ergue Ezequiel diante da glória. 🌟" },
      { upTo: 8, god: "Eu te envio aos filhos de Israel, nação rebelde.", reaction: "Deus chama o profeta ao seu povo obstinado." },
      { upTo: 99, god: "Come o que te dou; abre a boca e come este rolo.", reaction: "Uma mão estende um livro, escrito por dentro e por fora. 📜" },
    ],
  },
  3: {
    keyframes: [
      kf(1, { terrain: "river", glory: 0.7, props: [P("tablets", 0.55, 0.9)], actors: [F(0.42, "man", "stand", "brown")] }),
      kf(12, { terrain: "river", glory: 0.9, storm: 0.3, props: [P("reeds", 0.2)], actors: [F(0.4, "man", "raise", "brown")] }),
      kf(15, { terrain: "river", glory: 0.4, props: [P("reeds", 0.18), P("reeds", 0.85)], actors: [F(0.4, "man", "lie", "brown")] }),
      kf(22, { terrain: "plain", glory: 0.7, actors: [F(0.42, "man", "bow", "brown")] }),
    ],
    beats: [
      { upTo: 3, god: "Come este rolo e enche as tuas entranhas.", reaction: "Ezequiel o come, e é doce como mel na boca. 🍯" },
      { upTo: 11, god: "Vai, entra e fala ao povo as minhas palavras.", reaction: "Deus o envia aos do cativeiro." },
      { upTo: 15, reaction: "O Espírito o leva, e ele fica sete dias atônito entre os exilados. 😶" },
      { upTo: 99, god: "Filho do homem, eu te dei por atalaia à casa de Israel.", reaction: "O profeta é posto como vigia. 👁️" },
    ],
  },
  4: {
    keyframes: [
      kf(1, { terrain: "city", props: [P("basket", 0.55), P("tower", 0.78, 0.8)], actors: [F(0.38, "man", "kneel", "brown")] }),
      kf(4, { terrain: "city", night: 0.2, props: [P("tower", 0.8, 0.8)], actors: [F(0.42, "man", "lie", "brown")] }),
      kf(9, { terrain: "city", props: [P("basket", 0.5), P("altar", 0.7, 0.7, 0.4)], actors: [F(0.4, "man", "stand", "brown")] }),
    ],
    beats: [
      { upTo: 3, god: "Toma um tijolo e grava nele a cidade de Jerusalém.", reaction: "Ezequiel encena o cerco num sinal profético. 🧱" },
      { upTo: 8, god: "Deita-te sobre o teu lado e leva a iniquidade da casa de Israel.", reaction: "Dia por ano, o profeta jaz sob o peso do juízo. ⏳" },
      { upTo: 99, god: "Comerás o teu pão por peso e beberás a água por medida.", reaction: "Comida racionada — o retrato da fome no cerco. 🍞" },
    ],
  },
  5: {
    keyframes: [
      kf(1, { terrain: "city", props: [P("tower", 0.8, 0.8)], actors: [F(0.4, "man", "stand", "brown"), F(0.6, "warrior", "stand", "gray")] }),
      kf(2, { terrain: "city", fire: 0.4, actors: [F(0.4, "man", "raise", "brown")] }),
      kf(12, { terrain: "city", fire: 0.7, storm: 0.4, actors: [F(0.36, "man", "stand", "brown"), F(0.66, "warrior", "fight", "red", { facing: -1 })] }),
    ],
    beats: [
      { upTo: 4, god: "Toma uma espada afiada e rapa com ela a tua cabeça.", reaction: "O cabelo cortado e dividido em três — sinal do destino de Jerusalém. ⚔️" },
      { upTo: 11, god: "Esta é Jerusalém; puse-a no meio das nações.", reaction: "A cidade escolhida se rebelou mais que os povos." },
      { upTo: 99, god: "Um terço morrerá de peste, outro à espada, outro ao vento.", reaction: "Juízo tríplice sobre a cidade rebelde. 🔥" },
    ],
  },
  6: {
    keyframes: [
      kf(1, { terrain: "mountain", actors: [F(0.4, "man", "raise", "brown")] }),
      kf(4, { terrain: "mountain", fire: 0.5, props: [P("altar", 0.55, 0.9, 0.6)], actors: [F(0.38, "man", "stand", "brown")] }),
      kf(11, { terrain: "hills", fire: 0.6, storm: 0.3, actors: [F(0.4, "man", "mourn", "brown")] }),
    ],
    beats: [
      { upTo: 3, god: "Montes de Israel, ouvi a palavra do Senhor DEUS.", reaction: "O profeta volta o rosto contra os altos idólatras. ⛰️" },
      { upTo: 10, god: "Quebrarei os vossos altares e derrubarei os ídolos.", reaction: "Os lugares altos serão desolados." },
      { upTo: 99, god: "Então sabereis que eu sou o SENHOR.", reaction: "Bate com o pé: a espada, a fome e a peste chegam. 😔" },
    ],
  },
  7: {
    keyframes: [
      kf(1, { terrain: "city", storm: 0.5, actors: [F(0.4, "man", "raise", "brown")] }),
      kf(10, { terrain: "city", fire: 0.5, storm: 0.5, actors: [F(0.4, "man", "stand", "brown"), F(0.66, "man", "mourn", "sand")] }),
      kf(19, { terrain: "city", fire: 0.7, darkness: 0.3, actors: [F(0.4, "man", "mourn", "sand"), F(0.6, "woman", "mourn", "gray")] }),
    ],
    beats: [
      { upTo: 9, god: "Vem o fim, o fim vem sobre os quatro cantos da terra.", reaction: "O dia da ira se aproxima de Israel. 🌩️" },
      { upTo: 18, god: "A minha face desviarei deles, e profanarão o meu tesouro.", reaction: "O ouro e a prata não os salvarão. 💧" },
      { upTo: 99, reaction: "Angústia sobre angústia — o fim chegou. 😢" },
    ],
  },
  8: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.6, props: [P("tent", 0.72)], actors: [F(0.36, "man", "stand", "brown"), F(0.55, "elder", "stand", "gray")] }),
      kf(3, { terrain: "city", glory: 0.7, storm: 0.2, actors: [F(0.4, "man", "raise", "brown")] }),
      kf(10, { terrain: "city", night: 0.3, props: [P("altar", 0.6, 0.8, 0.4), P("smoke", 0.45, 1.4)], actors: [F(0.35, "man", "stand", "brown"), F(0.62, "elder", "kneel", "gray")] }),
      kf(16, { terrain: "city", night: 0.2, props: [P("altar", 0.5, 0.8)], actors: [F(0.4, "elder", "bow", "sand"), F(0.6, "man", "bow", "brown")] }),
    ],
    beats: [
      { upTo: 4, god: "Levanta os olhos para o norte, e verás a imagem dos ciúmes.", reaction: "O Espírito leva Ezequiel em visão a Jerusalém. 🌟" },
      { upTo: 12, reaction: "Nas câmaras secretas, os anciãos queimam incenso a ídolos. 🌫️" },
      { upTo: 99, reaction: "No átrio, homens adoram o sol de costas ao templo. 😞" },
    ],
  },
  9: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.6, props: [P("altar", 0.6, 0.8)], actors: [F(0.3, "man", "stand", "white"), F(0.6, "warrior", "stand", "gray")] }),
      kf(4, { terrain: "city", glory: 0.5, actors: [F(0.32, "man", "raise", "white"), F(0.55, "man", "kneel", "brown")] }),
      kf(8, { terrain: "city", night: 0.3, glory: 0.4, actors: [F(0.42, "man", "bow", "brown")] }),
    ],
    beats: [
      { upTo: 3, god: "Vinde vós, executores da cidade, cada um com sua arma.", reaction: "Seis homens chegam; entre eles, um vestido de linho. 🖊️" },
      { upTo: 7, god: "Passa e marca a testa dos que gemem pelas abominações.", reaction: "O sinal na fronte dos que choram poupa a vida. ✍️" },
      { upTo: 99, god: "Começai pelo meu santuário.", reaction: "Ezequiel cai e intercede: 'Destruirás todo o resto?' 🙏" },
    ],
  },
  10: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.8, fire: 0.4, props: [P("altar", 0.6, 0.8)], actors: [F(0.3, "man", "stand", "white"), F(0.55, "man", "kneel", "brown")] }),
      kf(4, { terrain: "city", glory: 0.9, fire: 0.5, actors: [F(0.4, "man", "bow", "brown")] }),
      kf(15, { terrain: "city", glory: 0.7, storm: 0.3, actors: [F(0.4, "angel", "raise", "gold")] }),
      kf(18, { terrain: "city", glory: 0.5, actors: [F(0.42, "man", "mourn", "brown")] }),
    ],
    beats: [
      { upTo: 3, reaction: "A glória enche o templo; os querubins e as rodas se movem. ⚙️✨" },
      { upTo: 8, god: "Enche as mãos de brasas dentre os querubins e espalha-as sobre a cidade.", reaction: "O homem de linho toma o fogo do meio do trono. 🔥" },
      { upTo: 17, reaction: "As rodas cheias de olhos giram com os seres viventes." },
      { upTo: 99, reaction: "A glória do SENHOR sai de sobre a soleira do templo. 😢" },
    ],
  },
  11: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.4, props: [P("tower", 0.8, 0.8)], actors: [F(0.36, "man", "raise", "brown"), F(0.6, "king", "stand", "gray")] }),
      kf(13, { terrain: "city", night: 0.2, glory: 0.3, actors: [F(0.4, "man", "bow", "brown")] }),
      kf(22, { terrain: "mountain", glory: 0.85, actors: [F(0.42, "man", "stand", "brown")] }),
    ],
    beats: [
      { upTo: 12, god: "Ai dos que maquinam iniquidade nesta cidade!", reaction: "Deus julga os príncipes que dizem 'a cidade é a panela'. 🍲" },
      { upTo: 21, god: "Dar-lhes-ei um só coração e um espírito novo.", reaction: "Promessa aos exilados: serei o vosso Deus. 🤍" },
      { upTo: 99, reaction: "A glória do SENHOR sobe e se detém sobre o monte a oriente. 🌄" },
    ],
  },
  12: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.4, props: [P("basket", 0.55), P("tower", 0.8, 0.8)], actors: [F(0.4, "man", "carry", "brown")] }),
      kf(7, { terrain: "city", night: 0.6, actors: [F(0.4, "man", "carry", "brown", { facing: 1 })] }),
      kf(17, { terrain: "city", actors: [F(0.4, "man", "stand", "brown"), F(0.62, "man", "mourn", "sand")] }),
    ],
    beats: [
      { upTo: 6, god: "Prepara a bagagem de mudança e sai de dia à vista deles.", reaction: "Ezequiel encena o exílio, cavando pela parede. 🎒" },
      { upTo: 16, god: "Assim como fiz, assim lhes será feito: irão para o cativeiro.", reaction: "O sinal anuncia a fuga do príncipe. 🌙" },
      { upTo: 99, god: "Não se adiará mais nenhuma das minhas palavras.", reaction: "Comer o pão tremendo — o juízo não tarda. 😰" },
    ],
  },
  13: {
    keyframes: [
      kf(1, { terrain: "city", actors: [F(0.36, "man", "raise", "brown"), F(0.6, "man", "stand", "white")] }),
      kf(10, { terrain: "city", rain: 0.4, storm: 0.5, props: [P("tower", 0.72, 0.9)], actors: [F(0.4, "man", "stand", "brown")] }),
      kf(17, { terrain: "city", actors: [F(0.4, "man", "raise", "brown"), F(0.62, "woman", "stand", "purple")] }),
    ],
    beats: [
      { upTo: 9, god: "Ai dos profetas insensatos que seguem o seu próprio espírito!", reaction: "Contra os que profetizam mentira em meu nome. 🚫" },
      { upTo: 16, god: "A parede caiu; onde está a caiadura com que a rebocastes?", reaction: "A muralha caiada desaba na tempestade. 🌧️" },
      { upTo: 99, god: "Rasgarei os vossos véus e livrarei o meu povo.", reaction: "Contra as profetisas que caçam almas. 🕊️" },
    ],
  },
  14: {
    keyframes: [
      kf(1, { terrain: "city", actors: [F(0.36, "man", "stand", "brown"), F(0.55, "elder", "kneel", "gray"), F(0.72, "elder", "kneel", "sand")] }),
      kf(12, { terrain: "plain", fire: 0.3, actors: [F(0.4, "man", "raise", "brown")] }),
      kf(20, { terrain: "plain", glory: 0.4, actors: [F(0.3, "elder", "stand", "white"), F(0.5, "man", "stand", "brown"), F(0.7, "elder", "stand", "gray")] }),
    ],
    beats: [
      { upTo: 11, god: "Estes homens levantaram os seus ídolos no coração.", reaction: "Anciãos idólatras buscam o profeta. 🗿" },
      { upTo: 19, god: "Quando uma terra pecar, estenderei a mão contra ela.", reaction: "Quatro juízos: espada, fome, feras e peste. ⚔️" },
      { upTo: 99, god: "Ainda que Noé, Daniel e Jó estivessem nela, só se salvariam a si mesmos.", reaction: "Nem os justos poderiam livrar os outros. 🙏" },
    ],
  },
  15: {
    keyframes: [
      kf(1, { terrain: "field", props: [P("tree", 0.55, 0.9)], actors: [F(0.4, "man", "stand", "brown")] }),
      kf(4, { terrain: "field", fire: 0.7, props: [P("tree", 0.55, 0.9, 1)], actors: [F(0.38, "man", "stand", "brown")] }),
    ],
    beats: [
      { upTo: 5, god: "Que é a videira mais que outra árvore da floresta?", reaction: "A parábola da videira inútil. 🍇" },
      { upTo: 99, god: "Entreguei os moradores de Jerusalém ao fogo.", reaction: "Sarmento que só serve de lenha à chama. 🔥" },
    ],
  },
  16: {
    keyframes: [
      kf(1, { terrain: "city", actors: [F(0.4, "child", "lie", "sand")] }),
      kf(8, { terrain: "city", glory: 0.4, actors: [F(0.4, "woman", "stand", "purple")] }),
      kf(15, { terrain: "city", night: 0.2, props: [P("altar", 0.66, 0.7, 0.3)], actors: [F(0.42, "woman", "stand", "red")] }),
      kf(60, { terrain: "city", glory: 0.5, rainbow: 0.3, actors: [F(0.42, "woman", "kneel", "white")] }),
    ],
    beats: [
      { upTo: 7, reaction: "Jerusalém: uma menina abandonada que Deus fez viver. 👶" },
      { upTo: 14, god: "Adornei-te de ouro e prata; tornaste-te formosa.", reaction: "Deus a veste como noiva e a torna rainha. 👑" },
      { upTo: 43, god: "Mas confiaste na tua formosura e te prostituíste.", reaction: "A esposa infiel troca o SENHOR por ídolos. 💔" },
      { upTo: 99, god: "Estabelecerei a minha aliança contigo, e saberás que eu sou o SENHOR.", reaction: "Ainda assim, Deus promete lembrar da aliança. 🌈" },
    ],
  },
  17: {
    keyframes: [
      kf(1, { terrain: "field", props: [P("tree", 0.6, 1.1)], actors: [F(0.4, "man", "raise", "brown")] }),
      kf(11, { terrain: "city", night: 0.2, props: [P("tower", 0.75, 0.9)], actors: [F(0.38, "king", "mourn", "gray")] }),
      kf(22, { terrain: "mountain", glory: 0.5, props: [P("tree", 0.55, 1.2)], actors: [F(0.42, "man", "stand", "brown")] }),
    ],
    beats: [
      { upTo: 10, god: "Propõe um enigma à casa de Israel.", reaction: "Duas grandes águias e a videira transplantada. 🦅" },
      { upTo: 21, god: "Menosprezou o juramento, quebrando a aliança.", reaction: "O rei que se rebelou não escapará. ⚖️" },
      { upTo: 99, god: "Plantarei um ramo tenro no monte alto de Israel.", reaction: "Deus promete um cedro que dará sombra às aves. 🌳" },
    ],
  },
  18: {
    keyframes: [
      kf(1, { terrain: "plain", actors: [F(0.35, "elder", "stand", "gray"), F(0.55, "man", "stand", "brown"), F(0.72, "child", "stand", "sand")] }),
      kf(21, { terrain: "plain", glory: 0.4, actors: [F(0.42, "man", "kneel", "brown")] }),
      kf(30, { terrain: "plain", glory: 0.6, actors: [F(0.42, "man", "raise", "brown")] }),
    ],
    beats: [
      { upTo: 9, god: "A alma que pecar, essa morrerá.", reaction: "Fim do provérbio dos pais e dos filhos. ⚖️" },
      { upTo: 24, god: "O filho não levará a iniquidade do pai.", reaction: "Cada um responde pelo próprio caminho." },
      { upTo: 99, god: "Convertei-vos e vivei! Não desejo a morte do que morre.", reaction: "Fazei-vos um coração novo e vivei. 🤍" },
    ],
  },
  19: {
    keyframes: [
      kf(1, { terrain: "hills", night: 0.2, actors: [F(0.4, "woman", "mourn", "purple"), AN(0.66, "lion", 0.9)] }),
      kf(5, { terrain: "hills", night: 0.3, actors: [AN(0.5, "lion", 1)] }),
      kf(10, { terrain: "field", fire: 0.4, props: [P("tree", 0.55, 1)], actors: [F(0.42, "woman", "mourn", "gray")] }),
    ],
    beats: [
      { upTo: 4, god: undefined, reaction: "Lamentação pelos príncipes: a leoa e seus filhotes. 🦁" },
      { upTo: 9, reaction: "Os leõezinhos são capturados e levados cativos. ⛓️" },
      { upTo: 99, reaction: "A videira arrancada e queimada — uma endecha de luto. 😢" },
    ],
  },
  20: {
    keyframes: [
      kf(1, { terrain: "city", actors: [F(0.36, "man", "stand", "brown"), F(0.58, "elder", "kneel", "gray")] }),
      kf(10, { terrain: "desert", glory: 0.4, props: [P("pillarCloud", 0.5, 1)], actors: [F(0.4, "man", "walk", "brown")] }),
      kf(33, { terrain: "desert", fire: 0.4, glory: 0.5, actors: [F(0.42, "man", "raise", "brown")] }),
    ],
    beats: [
      { upTo: 9, god: "Vieram consultar-me? Vivo eu, não me deixarei consultar.", reaction: "Os anciãos buscam a Deus; ele recorda a rebeldia. 📜" },
      { upTo: 26, god: "Dei-lhes os meus sábados por sinal, e eles os profanaram.", reaction: "A história da rebelião no deserto. 🏜️" },
      { upTo: 99, god: "Com braço estendido vos tirarei dos povos.", reaction: "Deus purificará e reunirá o seu povo. ✨" },
    ],
  },
  21: {
    keyframes: [
      kf(1, { terrain: "city", storm: 0.4, actors: [F(0.4, "man", "raise", "brown")] }),
      kf(9, { terrain: "city", fire: 0.5, storm: 0.5, actors: [F(0.36, "man", "stand", "brown"), F(0.64, "warrior", "fight", "red", { facing: -1 })] }),
      kf(19, { terrain: "plain", storm: 0.5, actors: [F(0.4, "warrior", "walk", "gray"), F(0.62, "king", "stand", "gold")] }),
    ],
    beats: [
      { upTo: 8, god: "Tirarei a minha espada da bainha contra toda carne.", reaction: "O SENHOR desembainha a espada do juízo. ⚔️" },
      { upTo: 17, god: "Espada, espada, está afiada e polida para matar.", reaction: "Bate as mãos: a espada reluz para a matança. 🗡️" },
      { upTo: 99, reaction: "O rei da Babilônia decide o caminho: contra Jerusalém. 🌩️" },
    ],
  },
  22: {
    keyframes: [
      kf(1, { terrain: "city", blood: 0.4, actors: [F(0.4, "man", "raise", "brown")] }),
      kf(17, { terrain: "city", fire: 0.7, props: [P("altar", 0.6, 0.9, 0.7), P("smoke", 0.5, 1.6)], actors: [F(0.38, "man", "stand", "brown")] }),
      kf(23, { terrain: "city", blood: 0.5, storm: 0.4, actors: [F(0.35, "king", "stand", "gray"), F(0.6, "man", "mourn", "sand")] }),
    ],
    beats: [
      { upTo: 16, god: "Cidade sanguinária, chegou o teu tempo.", reaction: "Jerusalém julgada por seus crimes de sangue. 🩸" },
      { upTo: 22, god: "Vos ajuntarei e vos fundirei no fogo da minha ira.", reaction: "A cidade é escória fundida na fornalha. 🔥" },
      { upTo: 99, god: "Busquei entre eles um homem que se pusesse na brecha, e não o achei.", reaction: "Profetas, sacerdotes e príncipes — todos corromperam. 😔" },
    ],
  },
  23: {
    keyframes: [
      kf(1, { terrain: "city", actors: [F(0.36, "woman", "stand", "red"), F(0.62, "woman", "stand", "purple")] }),
      kf(11, { terrain: "city", night: 0.2, props: [P("tower", 0.78, 0.8)], actors: [F(0.42, "woman", "stand", "purple")] }),
      kf(22, { terrain: "city", fire: 0.6, storm: 0.4, actors: [F(0.35, "warrior", "fight", "gray", { facing: -1 }), F(0.62, "woman", "mourn", "purple")] }),
    ],
    beats: [
      { upTo: 10, god: "Havia duas mulheres, filhas de uma só mãe.", reaction: "Oolá e Oolibá — Samaria e Jerusalém. 👭" },
      { upTo: 21, god: "Oolibá corrompeu-se mais que sua irmã.", reaction: "Jerusalém se prostitui com os povos vizinhos. 💔" },
      { upTo: 99, god: "Trarei sobre ti os teus amantes, e te julgarão.", reaction: "Os amantes se tornam carrascos. 🔥" },
    ],
  },
  24: {
    keyframes: [
      kf(1, { terrain: "city", fire: 0.6, props: [P("altar", 0.5, 1, 0.8), P("smoke", 0.5, 1.8)], actors: [F(0.38, "man", "stand", "brown")] }),
      kf(15, { terrain: "city", night: 0.5, props: [P("tent", 0.68)], actors: [F(0.42, "man", "stand", "brown"), F(0.6, "woman", "lie", "gray")] }),
      kf(18, { terrain: "city", night: 0.7, actors: [F(0.42, "man", "mourn", "brown")] }),
    ],
    beats: [
      { upTo: 14, god: "Põe a panela ao fogo e enche-a de água.", reaction: "A parábola da panela enferrujada — o cerco começa. 🍲" },
      { upTo: 17, god: "Tirarei de ti a delícia dos teus olhos, mas não pranteies.", reaction: "A esposa de Ezequiel morre; ele não deve chorar. 🌙" },
      { upTo: 99, god: "Assim Ezequiel vos servirá de sinal.", reaction: "O luto silencioso anuncia a queda de Jerusalém. 😔" },
    ],
  },
};
