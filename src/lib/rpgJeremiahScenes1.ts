// ============================================================================
// Roteiros de cena (Living Scene v2) — JEREMIAS, capítulos 1 a 26.
// O chamado do jovem profeta, a vara de amendoeira e a panela fervente, a
// fonte de água viva abandonada, a casa do oleiro, o jarro quebrado, o profeta
// chorão perseguido e no tronco, e a ameaça contra o templo. Tom de lamento e
// advertência. Puramente visual/narrativo — não toca em progresso.
// Segue o padrão de Êxodo (rpgExodusScenes).
// ============================================================================

import type { ChapterScript, V2Actor, V2Prop, SceneState } from "@/lib/rpgLivingV2";

const F = (x: number, role: V2Actor["role"], action: V2Actor["action"], palette?: V2Actor["palette"], extra: Partial<V2Actor> = {}): V2Actor => ({ x, role, action, palette, ...extra });
const AN = (x: number, animal: NonNullable<V2Actor["animal"]>, scale = 1, color?: string): V2Actor => ({ x, kind: "animal", animal, scale, color });
const P = (kind: string, x: number, scale = 1, fire?: number): V2Prop => ({ kind, x, scale, ...(fire != null ? { fire } : {}) });
const kf = (v: number, state: SceneState) => ({ v, state });

export const JEREMIAH_1: Record<number, ChapterScript> = {
  1: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.6, actors: [F(0.5, "child", "stand", "blue")] }),
      kf(5, { terrain: "city", glory: 0.85, actors: [F(0.48, "child", "bow", "blue")] }),
      kf(11, { terrain: "hills", glory: 0.5, props: [P("tree", 0.6, 1.1)], actors: [F(0.35, "man", "stand", "brown")] }),
      kf(13, { terrain: "city", fire: 0.5, props: [P("smoke", 0.55, 2)], actors: [F(0.35, "man", "raise", "brown", { facing: 1 })] }),
    ],
    beats: [
      { upTo: 4, god: "Antes que te formasse no ventre, eu te conheci.", reaction: "Deus chama Jeremias ainda jovem. 🕊️" },
      { upTo: 10, god: "Não digas: Sou uma criança. Aonde eu te enviar, irás.", reaction: "'Eis que ponho as minhas palavras na tua boca.' ✨" },
      { upTo: 12, god: "Bem viste, porque eu velo sobre a minha palavra.", reaction: "A vara de amendoeira que desperta. 🌿" },
      { upTo: 99, god: "Do norte se derramará o mal sobre os habitantes da terra.", reaction: "A panela fervente inclinada do norte. 🍲🔥" },
    ],
  },
  2: {
    keyframes: [
      kf(1, { terrain: "desert", actors: [F(0.4, "man", "walk", "brown"), F(0.6, "woman", "walk", "white")] }),
      kf(13, { terrain: "desert", props: [P("well", 0.55)], actors: [F(0.4, "man", "mourn", "brown")] }),
      kf(20, { terrain: "hills", night: 0.3, props: [P("altar", 0.6)], actors: [F(0.5, "woman", "stand", "red")] }),
      kf(31, { terrain: "desert", actors: [F(0.45, "man", "raise", "brown")] }),
    ],
    beats: [
      { upTo: 12, reaction: "Deus lembra o amor dos primeiros dias no deserto. 💛" },
      { upTo: 13, god: "A mim me deixaram, a fonte de água viva, e cavaram cisternas rotas.", reaction: "Trocaram a fonte por poços quebrados. 💧" },
      { upTo: 30, reaction: "O povo corre atrás de ídolos e altares nos altos. 😔" },
      { upTo: 99, god: "Por que contendeis comigo? Todos vós transgredistes.", reaction: "Advertência contra a infidelidade. ⚠️" },
    ],
  },
  3: {
    keyframes: [
      kf(1, { terrain: "hills", night: 0.2, actors: [F(0.5, "woman", "stand", "red")] }),
      kf(12, { terrain: "hills", glory: 0.4, actors: [F(0.4, "man", "raise", "brown")] }),
      kf(22, { terrain: "field", glory: 0.5, crowd: 0.3, actors: [F(0.45, "man", "kneel", "brown")] }),
    ],
    beats: [
      { upTo: 11, reaction: "Israel, a infiel, se contaminou com muitos amantes. 💔" },
      { upTo: 21, god: "Volta, ó desviada, e sararei as vossas rebeldias.", reaction: "Deus chama o povo a voltar. 🕊️" },
      { upTo: 99, god: "Eis-nos aqui, vimos a ti, porque tu és o SENHOR nosso Deus.", reaction: "Um convite ao arrependimento sincero. 🤍" },
    ],
  },
  4: {
    keyframes: [
      kf(1, { terrain: "plain", actors: [F(0.45, "man", "raise", "brown")] }),
      kf(6, { terrain: "hills", storm: 0.5, props: [P("tower", 0.7)], actors: [F(0.35, "man", "stand", "brown")] }),
      kf(19, { terrain: "city", storm: 0.7, fire: 0.4, actors: [F(0.4, "man", "mourn", "brown")] }),
      kf(23, { terrain: "desert", darkness: 0.7, storm: 0.5, actors: [] }),
    ],
    beats: [
      { upTo: 5, god: "Se voltares, ó Israel, volta para mim.", reaction: "Rompei o vosso novilho e não semeeis entre espinhos. 🌾" },
      { upTo: 18, reaction: "Alerta! O mal vem do norte, um leão sobe. 🦁" },
      { upTo: 22, reaction: "'Ai de mim! Minha alma se aflige.' O profeta geme. 😢" },
      { upTo: 99, reaction: "A terra fica sem forma e vazia, sem luz. ⬛" },
    ],
  },
  5: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.6, actors: [F(0.4, "man", "walk", "brown")] }),
      kf(14, { terrain: "city", fire: 0.4, actors: [F(0.4, "man", "raise", "brown")] }),
      kf(22, { terrain: "sea", actors: [F(0.4, "man", "stand", "brown")] }),
    ],
    beats: [
      { upTo: 9, god: "Percorrei as ruas de Jerusalém: achai um só que faça justiça.", reaction: "A busca por um justo na cidade. 🔍" },
      { upTo: 21, god: "As minhas palavras serão como fogo na tua boca.", reaction: "Povo tolo, que tem olhos e não vê. 😔" },
      { upTo: 99, god: "Pus a areia por limite ao mar; a mim não temeis?", reaction: "Até o mar respeita os limites de Deus. 🌊" },
    ],
  },
  6: {
    keyframes: [
      kf(1, { terrain: "city", storm: 0.5, props: [P("tower", 0.72)], actors: [F(0.35, "warrior", "fight", "red", { facing: -1 })] }),
      kf(9, { terrain: "city", crowd: 0.5, actors: [F(0.4, "man", "raise", "brown")] }),
      kf(22, { terrain: "hills", storm: 0.6, actors: [F(0.3, "warrior", "fight", "gray", { facing: -1 }), F(0.6, "warrior", "fight", "red", { facing: -1 })] }),
    ],
    beats: [
      { upTo: 8, god: "Preparai-vos contra ela; subamos ao meio-dia.", reaction: "Cerco a Jerusalém! O inimigo se aproxima. ⚔️" },
      { upTo: 21, god: "Paz, paz, quando não há paz — assim dizem falsamente.", reaction: "Do menor ao maior, todos buscam ganância. 😞" },
      { upTo: 99, reaction: "Um povo cruel vem das terras do norte. 🐎" },
    ],
  },
  7: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.7, glory: 0.4, actors: [F(0.4, "man", "raise", "brown")] }),
      kf(9, { terrain: "city", crowd: 0.6, props: [P("altar", 0.65)], actors: [F(0.38, "man", "stand", "brown")] }),
      kf(30, { terrain: "hills", night: 0.4, fire: 0.5, props: [P("altar", 0.6, 1, 1)], actors: [F(0.45, "man", "mourn", "brown")] }),
    ],
    beats: [
      { upTo: 8, god: "Não confieis em palavras falsas: Templo do SENHOR, Templo do SENHOR!", reaction: "O sermão à porta do templo. 🏛️" },
      { upTo: 20, god: "Emendai os vossos caminhos e vos deixarei habitar aqui.", reaction: "A casa que leva o meu Nome virou covil? 😔" },
      { upTo: 99, reaction: "Advertência contra os sacrifícios impuros de Tofete. ⚠️" },
    ],
  },
  8: {
    keyframes: [
      kf(1, { terrain: "field", night: 0.3, actors: [F(0.45, "man", "mourn", "brown")] }),
      kf(13, { terrain: "field", actors: [F(0.4, "man", "stand", "brown")] }),
      kf(18, { terrain: "hills", night: 0.4, actors: [F(0.45, "man", "mourn", "brown")] }),
    ],
    beats: [
      { upTo: 12, reaction: "Nem a cegonha erra o tempo; meu povo não conhece o SENHOR. 🕊️" },
      { upTo: 17, god: "Não há uvas na vide nem figos na figueira.", reaction: "A colheita passou e não fomos salvos. 🍂" },
      { upTo: 99, reaction: "'Não há bálsamo em Gileade?' O profeta chora. 😢" },
    ],
  },
  9: {
    keyframes: [
      kf(1, { terrain: "hills", night: 0.4, actors: [F(0.45, "man", "mourn", "blue")] }),
      kf(10, { terrain: "desert", night: 0.3, actors: [F(0.4, "man", "mourn", "brown")] }),
      kf(17, { terrain: "city", night: 0.4, crowd: 0.4, actors: [F(0.35, "woman", "mourn", "gray"), F(0.6, "woman", "mourn", "gray")] }),
    ],
    beats: [
      { upTo: 9, reaction: "'Prouvera que meus olhos fossem fontes de lágrimas!' 💧" },
      { upTo: 16, god: "A língua deles é uma seta mortífera, fala engano.", reaction: "A terra deserta, sem quem passe. 🏜️" },
      { upTo: 99, god: "Quem se gloriar, glorie-se em me conhecer.", reaction: "Chamam as carpideiras para o pranto. 😭" },
    ],
  },
  10: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.3, props: [P("tree", 0.6)], actors: [F(0.4, "man", "stand", "brown")] }),
      kf(10, { terrain: "hills", storm: 0.5, glory: 0.5, actors: [F(0.45, "man", "raise", "brown")] }),
      kf(19, { terrain: "desert", night: 0.4, props: [P("tent", 0.65)], actors: [F(0.4, "man", "mourn", "brown")] }),
    ],
    beats: [
      { upTo: 9, reaction: "Os ídolos são como espantalhos: não falam nem andam. 🪵" },
      { upTo: 16, god: "O SENHOR é o Deus verdadeiro, o Deus vivo e Rei eterno.", reaction: "Ele fez a terra com o seu poder. ⚡" },
      { upTo: 99, reaction: "'A minha tenda está destruída' — o lamento pela terra. 😔" },
    ],
  },
  11: {
    keyframes: [
      kf(1, { terrain: "city", actors: [F(0.4, "man", "raise", "brown")] }),
      kf(9, { terrain: "hills", night: 0.3, props: [P("altar", 0.65)], actors: [F(0.5, "man", "stand", "sand")] }),
      kf(18, { terrain: "field", night: 0.4, actors: [F(0.4, "man", "mourn", "brown"), F(0.65, "man", "stand", "red", { facing: -1 })] }),
    ],
    beats: [
      { upTo: 8, god: "Ouvi as palavras desta aliança e cumpri-as.", reaction: "A aliança quebrada por Judá. 📜" },
      { upTo: 17, reaction: "Idolatria em cada rua de Jerusalém. 😞" },
      { upTo: 99, god: "Eu era como um cordeiro que se leva ao matadouro.", reaction: "Conspiram contra Jeremias em Anatote. ⚠️" },
    ],
  },
  12: {
    keyframes: [
      kf(1, { terrain: "field", actors: [F(0.4, "man", "kneel", "brown")] }),
      kf(7, { terrain: "hills", night: 0.3, actors: [F(0.45, "man", "mourn", "brown")] }),
      kf(14, { terrain: "desert", actors: [F(0.4, "man", "stand", "brown")] }),
    ],
    beats: [
      { upTo: 6, reaction: "'Por que prospera o caminho dos ímpios?' 🤔" },
      { upTo: 13, god: "Abandonei a minha casa, deixei a minha herança.", reaction: "A terra amada agora chora deserta. 🍂" },
      { upTo: 99, god: "Se aprenderem os caminhos do meu povo, serão edificados.", reaction: "Ainda há esperança de compaixão. 🤍" },
    ],
  },
  13: {
    keyframes: [
      kf(1, { terrain: "river", props: [P("reeds", 0.75)], actors: [F(0.4, "man", "kneel", "white")] }),
      kf(12, { terrain: "city", actors: [F(0.4, "man", "raise", "brown"), F(0.65, "king", "stand", "gold")] }),
      kf(15, { terrain: "hills", night: 0.5, actors: [F(0.45, "man", "mourn", "brown")] }),
    ],
    beats: [
      { upTo: 11, reaction: "O cinto de linho apodrecido: sinal do orgulho de Judá. 🧵" },
      { upTo: 14, god: "Todo odre se encherá de vinho — e se quebrarão uns nos outros.", reaction: "Os jarros cheios que se despedaçam. 🏺" },
      { upTo: 99, god: "Dai glória ao SENHOR antes que venham as trevas.", reaction: "'Pode o etíope mudar a sua pele?' 😔" },
    ],
  },
  14: {
    keyframes: [
      kf(1, { terrain: "desert", actors: [F(0.4, "man", "mourn", "brown")] }),
      kf(7, { terrain: "field", actors: [F(0.4, "man", "kneel", "brown")] }),
      kf(17, { terrain: "hills", night: 0.4, actors: [F(0.45, "man", "mourn", "brown")] }),
    ],
    beats: [
      { upTo: 6, reaction: "A seca resseca a terra; as cisternas vazias. 🏜️" },
      { upTo: 16, god: "Os profetas profetizam mentira em meu nome.", reaction: "O povo clama por chuva e perdão. 🙏" },
      { upTo: 99, god: "Os meus olhos derramem lágrimas noite e dia.", reaction: "Jeremias intercede pelo povo ferido. 💧" },
    ],
  },
  15: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.3, actors: [F(0.4, "man", "stand", "brown")] }),
      kf(10, { terrain: "hills", night: 0.4, actors: [F(0.45, "man", "mourn", "brown")] }),
      kf(19, { terrain: "hills", glory: 0.5, actors: [F(0.42, "man", "raise", "brown")] }),
    ],
    beats: [
      { upTo: 9, god: "Ainda que Moisés e Samuel se pusessem diante de mim...", reaction: "O juízo não se demora sobre Judá. ⚠️" },
      { upTo: 18, reaction: "'Ai de mim, minha mãe, que me deste à luz!' 😢" },
      { upTo: 99, god: "Se tirares o precioso do vil, serás como a minha boca.", reaction: "Deus renova as forças do profeta. 🛡️" },
    ],
  },
  16: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.3, actors: [F(0.45, "man", "stand", "brown")] }),
      kf(10, { terrain: "hills", night: 0.4, actors: [F(0.4, "man", "raise", "brown"), F(0.65, "man", "stand", "sand")] }),
      kf(14, { terrain: "sea", glory: 0.4, actors: [F(0.4, "man", "walk", "brown")] }),
    ],
    beats: [
      { upTo: 9, god: "Não tomarás mulher, nem terás filhos neste lugar.", reaction: "A vida do profeta vira sinal do juízo. 🕊️" },
      { upTo: 13, reaction: "Por abandonarem a Deus, serão lançados para longe. 😔" },
      { upTo: 99, god: "Farei que conheçam a minha mão e o meu nome: o SENHOR.", reaction: "Promessa de um novo êxodo. 🌊" },
    ],
  },
  17: {
    keyframes: [
      kf(1, { terrain: "hills", night: 0.3, actors: [F(0.4, "man", "stand", "brown")] }),
      kf(7, { terrain: "river", glory: 0.4, props: [P("tree", 0.6, 1.2), P("reeds", 0.82)], actors: [F(0.32, "man", "stand", "green")] }),
      kf(19, { terrain: "city", crowd: 0.5, actors: [F(0.4, "man", "raise", "brown")] }),
    ],
    beats: [
      { upTo: 6, god: "Maldito o homem que confia no homem.", reaction: "O coração é enganoso — quem o conhecerá? 💔" },
      { upTo: 18, god: "Bendito o que confia no SENHOR: será como árvore junto às águas.", reaction: "Raízes firmes junto ao rio. 🌳💧" },
      { upTo: 99, god: "Santificai o dia de sábado.", reaction: "Guardar o descanso do SENHOR. 🕯️" },
    ],
  },
  18: {
    keyframes: [
      kf(1, { terrain: "city", actors: [F(0.4, "man", "kneel", "brown")] }),
      kf(3, { terrain: "city", props: [P("well", 0.6)], actors: [F(0.35, "man", "stand", "brown"), F(0.62, "man", "kneel", "sand")] }),
      kf(18, { terrain: "hills", night: 0.4, actors: [F(0.4, "man", "mourn", "brown"), F(0.65, "man", "stand", "red", { facing: -1 })] }),
    ],
    beats: [
      { upTo: 2, god: "Levanta-te e desce à casa do oleiro.", reaction: "Jeremias vai ver o oleiro trabalhar. 🏺" },
      { upTo: 12, god: "Não poderei eu fazer de vós como este oleiro, ó casa de Israel?", reaction: "O barro na mão do Oleiro. 🤲" },
      { upTo: 99, reaction: "Conspiram de novo contra o profeta. ⚠️" },
    ],
  },
  19: {
    keyframes: [
      kf(1, { terrain: "city", actors: [F(0.4, "man", "carry", "brown"), F(0.62, "elder", "stand", "gray")] }),
      kf(10, { terrain: "hills", night: 0.4, actors: [F(0.4, "man", "raise", "brown"), F(0.6, "elder", "stand", "sand")] }),
      kf(14, { terrain: "city", glory: 0.3, crowd: 0.4, actors: [F(0.4, "man", "raise", "brown")] }),
    ],
    beats: [
      { upTo: 9, god: "Farei desta cidade um espanto, por me abandonarem.", reaction: "Jeremias leva a botija de barro a Tofete. 🏺" },
      { upTo: 13, god: "Assim quebrarei este povo, como se quebra um vaso de oleiro.", reaction: "O jarro é despedaçado diante dos anciãos! 💥" },
      { upTo: 99, reaction: "No átrio do templo, o profeta anuncia o juízo. ⚠️" },
    ],
  },
  20: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.5, actors: [F(0.4, "man", "lie", "brown"), F(0.65, "man", "stand", "red")] }),
      kf(7, { terrain: "hills", night: 0.5, actors: [F(0.45, "man", "mourn", "brown")] }),
      kf(9, { terrain: "hills", fire: 0.5, night: 0.4, props: [P("smoke", 0.55, 1.6)], actors: [F(0.4, "man", "raise", "brown")] }),
      kf(14, { terrain: "hills", night: 0.7, actors: [F(0.45, "man", "mourn", "brown")] }),
    ],
    beats: [
      { upTo: 6, reaction: "Pasur açoita Jeremias e o põe no tronco. ⛓️" },
      { upTo: 8, reaction: "'Enganaste-me, SENHOR!' — a dor do profeta chorão. 😢" },
      { upTo: 13, god: "O SENHOR está comigo como um valente terrível.", reaction: "Sua palavra é como fogo ardente nos meus ossos! 🔥" },
      { upTo: 99, reaction: "'Maldito o dia em que nasci.' A noite da alma. 🌑" },
    ],
  },
  21: {
    keyframes: [
      kf(1, { terrain: "city", actors: [F(0.4, "man", "stand", "brown"), F(0.66, "king", "stand", "gold")] }),
      kf(8, { terrain: "city", fire: 0.4, storm: 0.4, actors: [F(0.4, "man", "raise", "brown")] }),
    ],
    beats: [
      { upTo: 7, reaction: "O rei Zedequias consulta o profeta sobre a Babilônia. 👑" },
      { upTo: 99, god: "Ponho diante de vós o caminho da vida e o caminho da morte.", reaction: "A cidade será entregue ao rei da Babilônia. ⚠️" },
    ],
  },
  22: {
    keyframes: [
      kf(1, { terrain: "city", props: [P("tower", 0.72)], actors: [F(0.4, "man", "raise", "brown"), F(0.68, "king", "stand", "gold")] }),
      kf(13, { terrain: "city", night: 0.3, actors: [F(0.4, "man", "mourn", "brown"), F(0.66, "king", "stand", "purple")] }),
    ],
    beats: [
      { upTo: 12, god: "Executai o juízo e a justiça; livrai o oprimido.", reaction: "Advertência aos reis de Judá. 👑" },
      { upTo: 99, god: "Ai daquele que edifica a casa com injustiça!", reaction: "O trono que esqueceu a justiça cai. 😔" },
    ],
  },
  23: {
    keyframes: [
      kf(1, { terrain: "field", actors: [F(0.4, "shepherd", "stand", "brown"), AN(0.66, "sheep"), AN(0.82, "sheep")] }),
      kf(5, { terrain: "field", glory: 0.6, props: [P("tree", 0.6, 1.2)], actors: [F(0.4, "man", "raise", "brown")] }),
      kf(16, { terrain: "hills", night: 0.4, storm: 0.4, actors: [F(0.45, "man", "raise", "brown")] }),
    ],
    beats: [
      { upTo: 4, god: "Ai dos pastores que destroem as ovelhas do meu pasto!", reaction: "Deus reunirá o rebanho disperso. 🐑" },
      { upTo: 8, god: "Levantarei a Davi um Renovo justo, e ele reinará.", reaction: "A promessa do Rebento justo. 🌱👑" },
      { upTo: 99, god: "Não os enviei, mas eles correram; não lhes falei.", reaction: "Contra os falsos profetas de sonhos vãos. ⚠️" },
    ],
  },
  24: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.3, props: [P("basket", 0.38), P("basket", 0.62)], actors: [F(0.5, "man", "stand", "brown")] }),
      kf(4, { terrain: "field", glory: 0.5, props: [P("basket", 0.5)], actors: [F(0.4, "man", "raise", "brown")] }),
      kf(8, { terrain: "desert", night: 0.4, props: [P("basket", 0.55)], actors: [F(0.4, "man", "mourn", "brown")] }),
    ],
    beats: [
      { upTo: 3, reaction: "Dois cestos de figos diante do templo. 🧺🍈" },
      { upTo: 7, god: "Como estes bons figos, reconhecerei os cativos para o bem.", reaction: "Deus dará coração para o conhecerem. 🤍" },
      { upTo: 99, god: "Como os figos maus, que não se podem comer, assim tratarei os rebeldes.", reaction: "O juízo sobre os que ficaram. ⚠️" },
    ],
  },
  25: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.5, actors: [F(0.4, "man", "raise", "brown")] }),
      kf(11, { terrain: "desert", night: 0.5, actors: [F(0.4, "man", "stand", "brown")] }),
      kf(15, { terrain: "hills", storm: 0.6, fire: 0.4, actors: [F(0.4, "man", "raise", "brown")] }),
    ],
    beats: [
      { upTo: 10, reaction: "Vinte e três anos de aviso, e o povo não ouviu. 😔" },
      { upTo: 14, god: "Toda esta terra servirá ao rei da Babilônia setenta anos.", reaction: "Os setenta anos de cativeiro anunciados. ⏳" },
      { upTo: 99, god: "Toma da minha mão este copo do vinho do furor.", reaction: "O cálice da ira derramado sobre as nações. 🍷" },
    ],
  },
  26: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.7, glory: 0.4, actors: [F(0.4, "man", "raise", "brown")] }),
      kf(8, { terrain: "city", crowd: 0.8, actors: [F(0.4, "man", "stand", "brown"), F(0.65, "elder", "raise", "red", { facing: -1 })] }),
      kf(16, { terrain: "city", crowd: 0.6, actors: [F(0.4, "man", "stand", "brown"), F(0.6, "elder", "stand", "gray")] }),
    ],
    beats: [
      { upTo: 7, god: "Farei a esta casa como fiz a Siló, se não me ouvirdes.", reaction: "Ameaça contra o templo no átrio. 🏛️" },
      { upTo: 15, reaction: "Sacerdotes e profetas gritam: 'Deves morrer!' 😨" },
      { upTo: 99, reaction: "Os anciãos defendem Jeremias e sua vida é poupada. 🕊️" },
    ],
  },
};
