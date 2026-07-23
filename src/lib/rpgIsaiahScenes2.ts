// ============================================================================
// Roteiros de cena (Living Scene v2) — ISAÍAS 34–66, capítulo por capítulo.
// O juízo das nações, o deserto que floresce, o cerco assírio e o anjo que
// fere o exército, "Consolai o meu povo", o Servo Sofredor, o convite gratuito
// e os novos céus e nova terra. Puramente visual/narrativo — não toca em
// progresso. Segue o padrão de Êxodo (rpgExodusScenes).
// ============================================================================

import type { ChapterScript, V2Actor, V2Prop, SceneState } from "@/lib/rpgLivingV2";

const F = (x: number, role: V2Actor["role"], action: V2Actor["action"], palette?: V2Actor["palette"], extra: Partial<V2Actor> = {}): V2Actor => ({ x, role, action, palette, ...extra });
const AN = (x: number, animal: NonNullable<V2Actor["animal"]>, scale = 1, color?: string): V2Actor => ({ x, kind: "animal", animal, scale, color });
const P = (kind: string, x: number, scale = 1, fire?: number): V2Prop => ({ kind, x, scale, ...(fire != null ? { fire } : {}) });
const kf = (v: number, state: SceneState) => ({ v, state });

export const ISAIAH_2: Record<number, ChapterScript> = {
  34: {
    keyframes: [
      kf(1, { terrain: "mountain", storm: 0.4, crowd: 0.5, actors: [F(0.45, "warrior", "raise", "red")] }),
      kf(5, { terrain: "desert", fire: 0.5, blood: 0.4, actors: [F(0.4, "warrior", "fight", "red", { facing: 1 })] }),
      kf(11, { terrain: "desert", night: 0.4, darkness: 0.3, props: [P("tower", 0.7, 0.9)], actors: [] }),
    ],
    beats: [
      { upTo: 4, god: "Chegai-vos, nações, para ouvir; atenda a terra.", reaction: "O SENHOR chama as nações a juízo. ⚔️" },
      { upTo: 10, reaction: "A espada do SENHOR desce sobre Edom. 🩸" },
      { upTo: 99, reaction: "A terra soberba vira deserto e ruína. 🏚️" },
    ],
  },
  35: {
    keyframes: [
      kf(1, { terrain: "desert", actors: [] }),
      kf(2, { terrain: "field", glory: 0.5, props: [P("palm", 0.28), P("tree", 0.7)], actors: [] }),
      kf(6, { terrain: "field", glory: 0.6, props: [P("well", 0.6), P("palm", 0.8)], actors: [F(0.4, "man", "raise", "white")] }),
      kf(8, { terrain: "field", glory: 0.7, crowd: 0.5, props: [P("palm", 0.2), P("palm", 0.85)], actors: [F(0.5, "man", "walk", "white")] }),
    ],
    beats: [
      { upTo: 2, reaction: "O deserto se alegra e floresce como a rosa. 🌸" },
      { upTo: 7, god: "Esforçai-vos, não temais; eis o vosso Deus.", reaction: "Águas brotam no ermo e o coxo salta. 💧" },
      { upTo: 99, reaction: "Há um caminho: a Estrada da Santidade. 🛤️" },
    ],
  },
  36: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.5, props: [P("tower", 0.8, 1.1)], actors: [F(0.6, "warrior", "stand", "red")] }),
      kf(2, { terrain: "city", crowd: 0.6, props: [P("tower", 0.82, 1.1)], actors: [F(0.3, "warrior", "raise", "red", { facing: 1 }), F(0.7, "man", "stand", "blue")] }),
      kf(13, { terrain: "city", crowd: 0.7, actors: [F(0.35, "warrior", "raise", "red"), F(0.72, "man", "mourn", "blue")] }),
    ],
    beats: [
      { upTo: 3, reaction: "Senaqueribe cerca Jerusalém; o Rabsaqué se aproxima. 🏰" },
      { upTo: 12, god: undefined, reaction: "O arauto assírio zomba: 'Em quem confias?' 😤" },
      { upTo: 99, reaction: "O povo se cala; nada respondem à afronta. 🤐" },
    ],
  },
  37: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.2, props: [P("altar", 0.55, 0.9, 0.5)], actors: [F(0.45, "king", "mourn", "blue")] }),
      kf(14, { terrain: "city", glory: 0.5, props: [P("altar", 0.55, 0.9, 0.6)], actors: [F(0.45, "king", "kneel", "blue")] }),
      kf(36, { terrain: "city", night: 0.7, glory: 0.4, props: [P("tower", 0.8, 1)], actors: [F(0.45, "angel", "raise", "white"), F(0.7, "warrior", "lie", "red")] }),
    ],
    beats: [
      { upTo: 13, reaction: "Ezequias rasga as vestes e vai à Casa do SENHOR. 😢" },
      { upTo: 35, god: "Por mim mesmo defenderei esta cidade e a salvarei.", reaction: "Isaías traz a palavra de livramento. 📜" },
      { upTo: 99, reaction: "De noite, o anjo fere 185 mil no arraial assírio. 👼🌙" },
    ],
  },
  38: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.3, props: [P("tent", 0.7)], actors: [F(0.45, "king", "lie", "blue")] }),
      kf(5, { terrain: "city", glory: 0.5, actors: [F(0.4, "king", "kneel", "blue"), F(0.62, "man", "stand", "white")] }),
      kf(8, { terrain: "city", glory: 0.6, props: [P("star", 0.6)], actors: [F(0.45, "king", "raise", "blue")] }),
    ],
    beats: [
      { upTo: 4, reaction: "Ezequias adoece de morte e chora diante do SENHOR. 😔" },
      { upTo: 7, god: "Ouvi a tua oração; acrescento quinze anos à tua vida.", reaction: "Deus cura o rei. 🤍" },
      { upTo: 99, reaction: "A sombra do relógio recua dez graus. ☀️" },
    ],
  },
  39: {
    keyframes: [
      kf(1, { terrain: "city", props: [P("tower", 0.78, 1)], actors: [F(0.35, "king", "stand", "blue"), F(0.62, "servant", "carry", "purple")] }),
      kf(3, { terrain: "city", night: 0.2, actors: [F(0.4, "king", "stand", "blue"), F(0.62, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 2, reaction: "Ezequias mostra todos os tesouros aos enviados de Babilônia. 🎁" },
      { upTo: 99, god: "Dias virão em que tudo será levado a Babilônia.", reaction: "Isaías anuncia o exílio futuro. 🌫️" },
    ],
  },
  40: {
    keyframes: [
      kf(1, { terrain: "desert", glory: 0.5, actors: [F(0.4, "man", "raise", "white")] }),
      kf(3, { terrain: "desert", glory: 0.6, actors: [F(0.45, "man", "raise", "white")] }),
      kf(11, { terrain: "hills", glory: 0.5, actors: [F(0.4, "shepherd", "carry", "white"), AN(0.66, "sheep"), AN(0.82, "sheep", 0.8)] }),
      kf(31, { terrain: "mountain", glory: 0.7, props: [P("dove", 0.55, 1.2)], actors: [F(0.4, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 2, god: "Consolai, consolai o meu povo, diz o vosso Deus.", reaction: "Palavra de consolo para Jerusalém. 🤍" },
      { upTo: 10, reaction: "Voz que clama no deserto: 'Preparai o caminho!' 📣" },
      { upTo: 30, god: "A erva seca, mas a palavra do nosso Deus subsiste.", reaction: "Ele apascenta o rebanho como pastor. 🐑" },
      { upTo: 99, god: "Os que esperam no SENHOR renovam as forças.", reaction: "Sobem com asas como águias! 🦅" },
    ],
  },
  41: {
    keyframes: [
      kf(1, { terrain: "sea", storm: 0.3, actors: [F(0.4, "man", "stand", "blue")] }),
      kf(10, { terrain: "hills", glory: 0.5, actors: [F(0.45, "man", "raise", "white")] }),
      kf(18, { terrain: "desert", props: [P("well", 0.5), P("palm", 0.75)], actors: [] }),
    ],
    beats: [
      { upTo: 9, god: "Não temas, porque eu sou contigo; eu te ajudo.", reaction: "Deus segura a mão do seu servo. 🤝" },
      { upTo: 20, god: "Abrirei rios nos altos e fontes no deserto.", reaction: "Água na terra seca. 💧" },
      { upTo: 99, reaction: "Os ídolos nada são; só o SENHOR é Deus. 🚫" },
    ],
  },
  42: {
    keyframes: [
      kf(1, { terrain: "hills", glory: 0.6, props: [P("dove", 0.55)], actors: [F(0.45, "man", "stand", "white")] }),
      kf(6, { terrain: "hills", glory: 0.7, actors: [F(0.4, "man", "raise", "white")] }),
      kf(10, { terrain: "sea", glory: 0.4, crowd: 0.5, actors: [F(0.45, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 5, god: "Eis o meu servo; nele a minha alma se compraz.", reaction: "O Servo escolhido, cheio do Espírito. 🕊️" },
      { upTo: 9, god: "Eu te dei por luz das nações.", reaction: "Ele abrirá os olhos cegos. ✨" },
      { upTo: 99, reaction: "Cantai ao SENHOR um cântico novo! 🎶" },
    ],
  },
  43: {
    keyframes: [
      kf(1, { terrain: "river", glory: 0.5, actors: [F(0.4, "man", "walk", "white")] }),
      kf(2, { terrain: "sea", fire: 0.3, glory: 0.4, actors: [F(0.45, "man", "raise", "white")] }),
      kf(19, { terrain: "desert", props: [P("well", 0.55), P("palm", 0.78)], actors: [F(0.4, "man", "stand", "white")] }),
    ],
    beats: [
      { upTo: 1, god: "Não temas, porque eu te remi; és meu.", reaction: "Deus resgata o seu povo. 🤍" },
      { upTo: 13, god: "Quando passares pelas águas, estarei contigo.", reaction: "Nem rios nem fogo o consumirão. 🔥💧" },
      { upTo: 99, god: "Eis que faço coisa nova; abrirei caminho no deserto.", reaction: "Um caminho novo se abre. 🛤️" },
    ],
  },
  44: {
    keyframes: [
      kf(1, { terrain: "field", glory: 0.4, props: [P("tree", 0.3), P("well", 0.7)], actors: [F(0.45, "man", "stand", "white")] }),
      kf(9, { terrain: "city", night: 0.2, props: [P("tree", 0.7)], actors: [F(0.4, "man", "carry", "brown")] }),
      kf(23, { terrain: "hills", glory: 0.6, props: [P("tree", 0.25), P("tree", 0.8)], actors: [] }),
    ],
    beats: [
      { upTo: 5, god: "Derramarei água sobre o sedento e o meu Espírito.", reaction: "Bênção sobre a semente de Jacó. 💧" },
      { upTo: 20, reaction: "Que loucura: o homem adora o que ele mesmo talhou. 🪵" },
      { upTo: 99, god: "Eu sou o primeiro e eu sou o último.", reaction: "Cantai, ó céus! O SENHOR redimiu. 🎶" },
    ],
  },
  45: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.4, props: [P("tower", 0.8, 1)], actors: [F(0.45, "king", "stand", "gold")] }),
      kf(8, { terrain: "hills", glory: 0.7, actors: [F(0.45, "man", "raise", "white")] }),
      kf(23, { terrain: "plain", glory: 0.6, crowd: 0.6, actors: [F(0.35, "man", "kneel", "blue"), F(0.6, "elder", "bow", "sand")] }),
    ],
    beats: [
      { upTo: 7, god: "Assim diz o SENHOR ao seu ungido, a Ciro.", reaction: "Deus chama Ciro pelo nome. 👑" },
      { upTo: 22, god: "Eu sou o SENHOR, e não há outro.", reaction: "Olhai para mim e sede salvos! ✨" },
      { upTo: 99, god: "A mim se dobrará todo joelho.", reaction: "Toda língua confessará o SENHOR. 🙇" },
    ],
  },
  46: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.2, actors: [F(0.35, "man", "carry", "brown"), F(0.6, "man", "carry", "sand")] }),
      kf(3, { terrain: "hills", glory: 0.5, actors: [F(0.45, "elder", "stand", "white")] }),
    ],
    beats: [
      { upTo: 2, reaction: "Bel se abaixa, Nebo se encurva — ídolos que só pesam. 🐫" },
      { upTo: 99, god: "Até à velhice eu vos levarei; eu vos carregarei.", reaction: "Deus carrega o seu povo. 🤲" },
    ],
  },
  47: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.3, actors: [F(0.45, "woman", "mourn", "purple")] }),
      kf(11, { terrain: "city", darkness: 0.4, night: 0.5, actors: [F(0.4, "woman", "kneel", "gray")] }),
    ],
    beats: [
      { upTo: 7, reaction: "Desce, filha de Babilônia, senta-te no pó. 😔" },
      { upTo: 99, god: "O mal virá sobre ti, e não saberás afastá-lo.", reaction: "Feitiços e astrólogos nada podem salvar. 🌑" },
    ],
  },
  48: {
    keyframes: [
      kf(1, { terrain: "city", actors: [F(0.4, "man", "stand", "blue")] }),
      kf(10, { terrain: "desert", fire: 0.5, actors: [F(0.45, "man", "stand", "white")] }),
      kf(20, { terrain: "desert", glory: 0.4, crowd: 0.5, props: [P("well", 0.7)], actors: [F(0.35, "man", "walk", "blue")] }),
    ],
    beats: [
      { upTo: 11, god: "Eis que te provei na fornalha da aflição.", reaction: "Deus refina o seu povo. 🔥" },
      { upTo: 19, reaction: "Ah, se tivesses atentado aos meus mandamentos! 🌊" },
      { upTo: 99, god: "Saí de Babilônia; fugi dos caldeus com júbilo!", reaction: "Água da rocha no deserto do caminho. 💧" },
    ],
  },
  49: {
    keyframes: [
      kf(1, { terrain: "sea", glory: 0.5, crowd: 0.5, actors: [F(0.45, "man", "raise", "white")] }),
      kf(6, { terrain: "hills", glory: 0.7, actors: [F(0.4, "man", "raise", "white")] }),
      kf(15, { terrain: "city", glory: 0.5, actors: [F(0.4, "woman", "carry", "blue"), F(0.62, "child", "stand", "sand")] }),
    ],
    beats: [
      { upTo: 5, god: "Desde o ventre me chamou o SENHOR pelo nome.", reaction: "O Servo chamado desde antes de nascer. 🌅" },
      { upTo: 13, god: "Também te dei por luz das nações.", reaction: "Salvação até aos confins da terra. ✨" },
      { upTo: 99, god: "Eis que nas palmas das mãos eu te gravei.", reaction: "Deus não esquece Sião. 🤍" },
    ],
  },
  50: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.2, actors: [F(0.45, "man", "stand", "white")] }),
      kf(6, { terrain: "city", night: 0.4, actors: [F(0.4, "man", "mourn", "white"), F(0.66, "man", "fight", "red", { facing: -1 })] }),
      kf(10, { terrain: "hills", glory: 0.4, actors: [F(0.45, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 5, god: "O Senhor me deu língua de discípulos, para sustentar o cansado.", reaction: "O Servo escuta cada manhã. 🌄" },
      { upTo: 9, reaction: "Ofereceu as costas aos que o feriam. 😢" },
      { upTo: 99, god: "Quem anda em trevas, confie no nome do SENHOR.", reaction: "Ainda na escuridão, há em quem confiar. 🕯️" },
    ],
  },
  51: {
    keyframes: [
      kf(1, { terrain: "mountain", glory: 0.4, actors: [F(0.4, "elder", "stand", "white")] }),
      kf(9, { terrain: "sea", storm: 0.4, glory: 0.4, actors: [F(0.45, "man", "raise", "white")] }),
      kf(17, { terrain: "city", night: 0.3, glory: 0.4, actors: [F(0.45, "woman", "kneel", "blue")] }),
    ],
    beats: [
      { upTo: 8, god: "Olhai para Abraão, vosso pai; eu o abençoei.", reaction: "A rocha de onde foram cortados. 🪨" },
      { upTo: 16, god: "Desperta, desperta, braço do SENHOR!", reaction: "O SENHOR consola Sião. 🌊" },
      { upTo: 99, reaction: "Desperta, Jerusalém; passou o cálice da ira. 🍷" },
    ],
  },
  52: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.5, actors: [F(0.45, "woman", "raise", "purple")] }),
      kf(7, { terrain: "mountain", glory: 0.6, actors: [F(0.4, "man", "walk", "white")] }),
      kf(13, { terrain: "hills", glory: 0.7, actors: [F(0.45, "man", "stand", "white")] }),
    ],
    beats: [
      { upTo: 6, god: "Desperta, desperta, veste a tua fortaleza, ó Sião!", reaction: "Levanta-te do pó, Jerusalém. ✨" },
      { upTo: 12, reaction: "Que formosos os pés de quem anuncia boas novas! 👣" },
      { upTo: 99, god: "Eis que o meu servo será exaltado e sublimado.", reaction: "O Servo, muitos se admirarão dele. 🌟" },
    ],
  },
  53: {
    keyframes: [
      kf(1, { terrain: "desert", night: 0.4, actors: [F(0.5, "man", "stand", "gray")] }),
      kf(3, { terrain: "desert", night: 0.5, actors: [F(0.5, "man", "mourn", "gray")] }),
      kf(7, { terrain: "city", night: 0.6, actors: [F(0.5, "man", "mourn", "white")] }),
      kf(9, { terrain: "desert", night: 0.5, actors: [F(0.5, "man", "lie", "gray")] }),
      kf(11, { terrain: "hills", glory: 0.8, actors: [F(0.45, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 3, reaction: "Desprezado e rejeitado, homem de dores. 😔" },
      { upTo: 6, reaction: "Ele foi ferido pelas nossas transgressões. 🩹" },
      { upTo: 9, reaction: "Como cordeiro mudo ao matadouro, não abriu a boca. 🐑" },
      { upTo: 99, god: "Verá o fruto do trabalho da sua alma e se fartará.", reaction: "Depois da dor, o Servo é exaltado. 🌟" },
    ],
  },
  54: {
    keyframes: [
      kf(1, { terrain: "desert", props: [P("tent", 0.5, 1.4)], actors: [F(0.4, "woman", "raise", "purple")] }),
      kf(9, { terrain: "hills", glory: 0.5, rainbow: 0.5, actors: [F(0.45, "woman", "stand", "blue")] }),
    ],
    beats: [
      { upTo: 8, god: "Canta, ó estéril; alarga o lugar da tua tenda.", reaction: "A alegria da que estava desolada. ⛺" },
      { upTo: 99, god: "A minha benignidade não se apartará de ti.", reaction: "Aliança de paz que não vacila. 🌈" },
    ],
  },
  55: {
    keyframes: [
      kf(1, { terrain: "field", props: [P("well", 0.5), P("tree", 0.78)], actors: [F(0.4, "man", "raise", "white"), F(0.62, "man", "stand", "sand")] }),
      kf(6, { terrain: "field", glory: 0.5, actors: [F(0.45, "man", "kneel", "blue")] }),
      kf(12, { terrain: "hills", glory: 0.7, props: [P("tree", 0.25), P("tree", 0.8)], actors: [] }),
    ],
    beats: [
      { upTo: 5, god: "Ó vós, todos os sedentos, vinde às águas!", reaction: "Comprai sem dinheiro, sem preço. 💧" },
      { upTo: 11, god: "Buscai o SENHOR enquanto se pode achar.", reaction: "A palavra de Deus não volta vazia. 🌱" },
      { upTo: 99, reaction: "Os montes cantam e as árvores batem palmas! 🌳" },
    ],
  },
  56: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.4, props: [P("altar", 0.6, 0.9, 0.4)], actors: [F(0.4, "man", "stand", "white"), F(0.62, "servant", "kneel", "sand")] }),
      kf(7, { terrain: "mountain", glory: 0.5, crowd: 0.6, actors: [F(0.4, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 6, god: "Guardai o direito; a minha salvação está prestes a vir.", reaction: "Estrangeiros e eunucos são acolhidos. 🤍" },
      { upTo: 99, god: "A minha casa será chamada casa de oração para todos.", reaction: "Templo aberto a todos os povos. 🙏" },
    ],
  },
  57: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.3, actors: [F(0.45, "man", "lie", "gray")] }),
      kf(15, { terrain: "hills", glory: 0.5, actors: [F(0.45, "man", "kneel", "blue")] }),
    ],
    beats: [
      { upTo: 13, reaction: "O justo morre, e ninguém repara; não há paz para os ímpios. 😔" },
      { upTo: 99, god: "Habito com o contrito e abatido de espírito.", reaction: "Deus vivifica o coração humilde. 🤍" },
    ],
  },
  58: {
    keyframes: [
      kf(1, { terrain: "city", actors: [F(0.4, "man", "raise", "white")] }),
      kf(6, { terrain: "city", glory: 0.4, actors: [F(0.35, "man", "stand", "blue"), F(0.6, "man", "kneel", "gray")] }),
      kf(11, { terrain: "field", glory: 0.6, props: [P("well", 0.6), P("tree", 0.82)], actors: [F(0.4, "man", "stand", "white")] }),
    ],
    beats: [
      { upTo: 5, god: "Clama em alta voz; anuncia ao meu povo a sua transgressão.", reaction: "Jejum que não agrada a Deus. 📣" },
      { upTo: 10, god: "Não é este o jejum: soltar as ligaduras da impiedade?", reaction: "Reparte o pão com o faminto. 🍞" },
      { upTo: 99, god: "Serás como jardim regado, como fonte que não seca.", reaction: "Luz que rompe como a alva. 🌅" },
    ],
  },
  59: {
    keyframes: [
      kf(1, { terrain: "city", darkness: 0.4, night: 0.3, actors: [F(0.45, "man", "stand", "gray")] }),
      kf(9, { terrain: "city", darkness: 0.5, actors: [F(0.4, "man", "mourn", "gray")] }),
      kf(16, { terrain: "hills", glory: 0.7, actors: [F(0.45, "warrior", "raise", "white")] }),
    ],
    beats: [
      { upTo: 8, reaction: "As vossas iniquidades separam de Deus. 🌫️" },
      { upTo: 15, reaction: "Andamos apalpando como cegos ao meio-dia. 🤲" },
      { upTo: 99, god: "Virá o Redentor a Sião; o meu Espírito não se apartará.", reaction: "O braço do SENHOR traz salvação. 💪" },
    ],
  },
  60: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.8, actors: [F(0.45, "woman", "raise", "purple")] }),
      kf(3, { terrain: "city", glory: 0.7, crowd: 0.6, props: [P("star", 0.7)], actors: [F(0.35, "king", "walk", "gold"), AN(0.66, "camel", 1.1)] }),
      kf(19, { terrain: "city", glory: 0.95, actors: [F(0.45, "woman", "stand", "white")] }),
    ],
    beats: [
      { upTo: 2, god: "Levanta-te, resplandece, porque vem a tua luz!", reaction: "A glória do SENHOR nasce sobre ti. 🌟" },
      { upTo: 18, reaction: "As nações caminham para a tua luz. 🐫👑" },
      { upTo: 99, god: "O SENHOR será a tua luz perpétua.", reaction: "Não haverá mais noite. ✨" },
    ],
  },
  61: {
    keyframes: [
      kf(1, { terrain: "hills", glory: 0.7, props: [P("dove", 0.55)], actors: [F(0.45, "man", "raise", "white")] }),
      kf(3, { terrain: "field", glory: 0.5, props: [P("tree", 0.3), P("tree", 0.8)], actors: [F(0.4, "man", "stand", "white")] }),
      kf(10, { terrain: "city", glory: 0.6, actors: [F(0.45, "man", "raise", "gold")] }),
    ],
    beats: [
      { upTo: 3, god: "O Espírito do SENHOR está sobre mim, para pregar boas novas.", reaction: "Liberdade aos cativos, óleo de alegria. 🕊️" },
      { upTo: 9, reaction: "Árvores de justiça, plantação do SENHOR. 🌳" },
      { upTo: 99, god: "Regozijar-me-ei muito no SENHOR.", reaction: "Vestido com as vestes da salvação. ✨" },
    ],
  },
  62: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.6, actors: [F(0.45, "woman", "stand", "purple")] }),
      kf(4, { terrain: "field", glory: 0.5, props: [P("tree", 0.3), P("palm", 0.78)], actors: [F(0.4, "woman", "raise", "white")] }),
      kf(6, { terrain: "city", glory: 0.5, props: [P("tower", 0.75, 1.1)], actors: [F(0.7, "warrior", "stand", "blue")] }),
    ],
    beats: [
      { upTo: 3, god: "Por amor de Sião não me calarei.", reaction: "Um novo nome para a cidade. 📖" },
      { upTo: 5, reaction: "'Minha-delícia': a terra desposada. 💍" },
      { upTo: 99, god: "Pus atalaias sobre os teus muros, ó Jerusalém.", reaction: "Vigias que não se calam. 🏰" },
    ],
  },
  63: {
    keyframes: [
      kf(1, { terrain: "desert", blood: 0.5, fire: 0.3, actors: [F(0.45, "warrior", "walk", "red", { facing: 1 })] }),
      kf(7, { terrain: "hills", glory: 0.5, actors: [F(0.45, "man", "raise", "white")] }),
      kf(15, { terrain: "mountain", night: 0.3, glory: 0.4, actors: [F(0.4, "man", "kneel", "blue")] }),
    ],
    beats: [
      { upTo: 6, reaction: "Quem é este que vem de Edom, de vestes rubras? 🍷" },
      { upTo: 14, god: "Certamente eles são o meu povo, filhos que não mentirão.", reaction: "Lembram das misericórdias do SENHOR. 🤍" },
      { upTo: 99, reaction: "'Onde está aquele que os fez subir do mar?' 🙏" },
    ],
  },
  64: {
    keyframes: [
      kf(1, { terrain: "mountain", storm: 0.6, fire: 0.5, glory: 0.5, actors: [F(0.45, "man", "raise", "blue")] }),
      kf(8, { terrain: "field", glory: 0.4, actors: [F(0.45, "man", "kneel", "gray")] }),
    ],
    beats: [
      { upTo: 7, god: undefined, reaction: "'Oh! Se fendesses os céus e descesses!' ⚡" },
      { upTo: 99, god: undefined, reaction: "Tu és o oleiro, nós o barro. 🏺" },
    ],
  },
  65: {
    keyframes: [
      kf(1, { terrain: "hills", glory: 0.5, actors: [F(0.45, "man", "raise", "white")] }),
      kf(17, { terrain: "city", glory: 0.8, crowd: 0.5, actors: [F(0.4, "man", "stand", "white"), F(0.62, "child", "stand", "green")] }),
      kf(25, { terrain: "field", glory: 0.7, props: [P("tree", 0.75)], actors: [AN(0.45, "lion", 1.1), AN(0.6, "sheep"), AN(0.72, "sheep", 0.8)] }),
    ],
    beats: [
      { upTo: 16, god: "Estendi as minhas mãos todo o dia a um povo rebelde.", reaction: "Deus se revela aos que não o buscavam. 🤲" },
      { upTo: 24, god: "Eis que crio novos céus e nova terra.", reaction: "As coisas passadas não serão lembradas. 🌟" },
      { upTo: 99, god: "O lobo e o cordeiro se apascentarão juntos.", reaction: "O leão comerá palha como o boi. 🦁🐑" },
    ],
  },
  66: {
    keyframes: [
      kf(1, { terrain: "mountain", glory: 0.7, actors: [F(0.45, "man", "bow", "white")] }),
      kf(10, { terrain: "city", glory: 0.6, crowd: 0.7, actors: [F(0.4, "woman", "raise", "purple"), F(0.62, "child", "stand", "green")] }),
      kf(22, { terrain: "hills", glory: 0.9, crowd: 0.6, actors: [F(0.45, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 9, god: "O céu é o meu trono, e a terra o estrado dos meus pés.", reaction: "Deus atenta ao humilde e contrito. 🙇" },
      { upTo: 21, god: "Alegrai-vos com Jerusalém; como quem a mãe consola, vos consolarei.", reaction: "Consolo como a de mãe. 🤍" },
      { upTo: 99, god: "Os novos céus e a nova terra permanecerão diante de mim.", reaction: "Toda carne virá adorar diante do SENHOR. 🌟" },
    ],
  },
};
