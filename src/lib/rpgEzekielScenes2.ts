// ============================================================================
// Roteiros de cena (Living Scene v2) — EZEQUIEL, capítulos 25 a 48.
// Juízos contra as nações (Tiro, Egito), o profeta atalaia, os pastores
// infiéis e o bom Pastor, o vale dos ossos secos que ganham vida, Gogue e
// Magogue, e a visão do novo Templo com o rio que dá vida. Puramente
// visual/narrativo — não toca em progresso. Segue o padrão de Êxodo.
// ============================================================================

import type { ChapterScript, V2Actor, V2Prop, SceneState } from "@/lib/rpgLivingV2";

const F = (x: number, role: V2Actor["role"], action: V2Actor["action"], palette?: V2Actor["palette"], extra: Partial<V2Actor> = {}): V2Actor => ({ x, role, action, palette, ...extra });
const AN = (x: number, animal: NonNullable<V2Actor["animal"]>, scale = 1, color?: string): V2Actor => ({ x, kind: "animal", animal, scale, color });
const P = (kind: string, x: number, scale = 1, fire?: number): V2Prop => ({ kind, x, scale, ...(fire != null ? { fire } : {}) });
const kf = (v: number, state: SceneState) => ({ v, state });

export const EZEKIEL_2: Record<number, ChapterScript> = {
  25: {
    keyframes: [
      kf(1, { terrain: "plain", night: 0.2, actors: [F(0.4, "man", "raise", "brown"), F(0.66, "warrior", "stand", "red")] }),
      kf(8, { terrain: "hills", fire: 0.4, actors: [F(0.4, "warrior", "fight", "red", { facing: -1 }), F(0.66, "man", "mourn", "sand")] }),
      kf(15, { terrain: "city", fire: 0.5, actors: [F(0.5, "warrior", "fight", "gray", { facing: 1 })] }),
    ],
    beats: [
      { upTo: 7, god: "Porque bateste palmas contra a minha terra, eis que estendo a mão sobre ti.", reaction: "Juízo contra Amom. ⚔️" },
      { upTo: 11, god: "Executarei juízos em Moabe.", reaction: "Moabe e Seir serão humilhados. 🔥" },
      { upTo: 99, god: "Farei grande vingança sobre os filisteus.", reaction: "Edom e Filístia caem sob a mão do SENHOR." },
    ],
  },
  26: {
    keyframes: [
      kf(1, { terrain: "sea", actors: [F(0.4, "man", "raise", "brown")], props: [P("tower", 0.66, 1.2)] }),
      kf(7, { terrain: "sea", storm: 0.5, actors: [F(0.5, "king", "stand", "gold"), F(0.72, "warrior", "fight", "red")] }),
      kf(15, { terrain: "sea", flood: 0.7, storm: 0.6, props: [P("tower", 0.6, 0.8)], actors: [F(0.3, "man", "mourn", "sand")] }),
      kf(19, { terrain: "sea", flood: 0.85, night: 0.3, actors: [] }),
    ],
    beats: [
      { upTo: 6, god: "Eis que eu sou contra ti, ó Tiro, e farei subir contra ti muitas nações, como o mar faz subir as suas ondas.", reaction: "Juízo sobre Tiro, rainha dos mares. 🌊" },
      { upTo: 14, god: "Farei de ti uma penha descalvada; virás a ser um lugar para estender redes.", reaction: "Nabucodonosor cerca a cidade. 🏰" },
      { upTo: 99, god: "Far-te-ei descer com os que descem à cova.", reaction: "A soberba de Tiro afunda no mar. 😔" },
    ],
  },
  27: {
    keyframes: [
      kf(1, { terrain: "sea", actors: [F(0.4, "man", "mourn", "purple")], props: [P("tower", 0.68, 1)] }),
      kf(25, { terrain: "sea", actors: [F(0.5, "man", "carry", "sand")], props: [P("basket", 0.3), P("basket", 0.66)] }),
      kf(32, { terrain: "sea", storm: 0.7, flood: 0.7, actors: [F(0.4, "man", "mourn", "sand")] }),
    ],
    beats: [
      { upTo: 24, reaction: "Lamento por Tiro, navio de perfeita formosura. ⛵" },
      { upTo: 31, reaction: "Suas mercadorias enchiam os povos; agora tudo se perde. 📦" },
      { upTo: 99, god: undefined, reaction: "O grande navio naufraga no coração dos mares. 🌊😢" },
    ],
  },
  28: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.2, actors: [F(0.5, "king", "stand", "purple")], props: [P("tower", 0.72, 1.1)] }),
      kf(7, { terrain: "city", fire: 0.6, storm: 0.4, actors: [F(0.5, "king", "mourn", "gold"), F(0.72, "warrior", "fight", "red", { facing: -1 })] }),
      kf(20, { terrain: "sea", fire: 0.5, actors: [F(0.4, "man", "raise", "brown")] }),
      kf(25, { terrain: "field", glory: 0.4, crowd: 0.4, actors: [F(0.4, "man", "stand", "brown")] }),
    ],
    beats: [
      { upTo: 10, god: "Por se elevar o teu coração, e dizeres: Eu sou Deus — tu és homem, e não Deus.", reaction: "A soberba do príncipe de Tiro. 👑" },
      { upTo: 19, god: "Perfeito eras nos teus caminhos, desde o dia em que foste criado, até que se achou iniquidade em ti.", reaction: "A queda do que fora ungido. 🔥" },
      { upTo: 24, god: "Serei glorificado no meio de ti, ó Sidom.", reaction: "Juízo contra Sidom. ⚔️" },
      { upTo: 99, god: "Habitarão seguros, e saberão que eu sou o SENHOR.", reaction: "Israel será reajuntado em paz. 🤍" },
    ],
  },
  29: {
    keyframes: [
      kf(1, { terrain: "river", actors: [F(0.4, "man", "raise", "brown")], props: [P("serpent", 0.66, 1.4), P("reeds", 0.85)] }),
      kf(8, { terrain: "river", fire: 0.5, storm: 0.4, actors: [F(0.5, "king", "mourn", "gold")], props: [P("reeds", 0.2)] }),
      kf(17, { terrain: "sea", actors: [F(0.5, "warrior", "stand", "gray")], props: [P("tower", 0.72, 0.9)] }),
    ],
    beats: [
      { upTo: 7, god: "Eis que eu sou contra ti, Faraó, grande dragão que jazes no meio dos teus rios.", reaction: "Juízo contra o Egito. 🐊" },
      { upTo: 16, god: "Reduzirei o Egito ao mais humilde dos reinos.", reaction: "A confiança do Egito é quebrada. 🏜️" },
      { upTo: 99, god: "Darei a terra do Egito a Nabucodonosor como paga.", reaction: "O Egito entregue à Babilônia." },
    ],
  },
  30: {
    keyframes: [
      kf(1, { terrain: "river", night: 0.3, actors: [F(0.4, "man", "raise", "brown")] }),
      kf(10, { terrain: "city", fire: 0.7, storm: 0.5, actors: [F(0.4, "warrior", "fight", "red", { facing: 1 }), F(0.66, "man", "mourn", "sand")] }),
      kf(20, { terrain: "river", fire: 0.5, actors: [F(0.5, "king", "mourn", "gold")] }),
    ],
    beats: [
      { upTo: 9, god: "Uivai: Ai daquele dia! Porque o dia está perto, o dia do SENHOR.", reaction: "O dia do juízo sobre o Egito. 🌑" },
      { upTo: 19, god: "Porei fogo no Egito, e todos os seus ajudadores serão destruídos.", reaction: "As cidades do Egito em chamas. 🔥" },
      { upTo: 99, god: "Quebrarei os braços de Faraó, rei do Egito.", reaction: "O braço do Faraó é despedaçado. ⚔️" },
    ],
  },
  31: {
    keyframes: [
      kf(1, { terrain: "hills", glory: 0.3, actors: [F(0.4, "man", "stand", "brown")], props: [P("tree", 0.66, 1.6)] }),
      kf(10, { terrain: "hills", storm: 0.4, actors: [F(0.5, "king", "stand", "purple")], props: [P("tree", 0.62, 1.5)] }),
      kf(15, { terrain: "plain", night: 0.4, props: [P("tree", 0.5, 0.7)], actors: [F(0.4, "man", "mourn", "sand")] }),
    ],
    beats: [
      { upTo: 9, god: "Eis que a Assíria era um cedro no Líbano, formoso de ramos.", reaction: "O cedro que a todos ultrapassava. 🌲" },
      { upTo: 14, god: "Por te elevares na tua altura, entreguei-o.", reaction: "A soberba derruba o grande cedro." },
      { upTo: 99, god: "A quem és semelhante em glória? Também descerás à cova.", reaction: "O Egito é advertido pela queda da Assíria. 😔" },
    ],
  },
  32: {
    keyframes: [
      kf(1, { terrain: "sea", actors: [F(0.4, "man", "mourn", "brown")], props: [P("serpent", 0.66, 1.3)] }),
      kf(7, { terrain: "sea", darkness: 0.7, night: 0.5, actors: [F(0.4, "man", "raise", "brown")] }),
      kf(17, { terrain: "plain", night: 0.6, darkness: 0.5, actors: [F(0.4, "king", "lie", "gold"), F(0.66, "warrior", "lie", "gray")] }),
    ],
    beats: [
      { upTo: 6, god: "Espalharei a tua carne pelos montes, e encherei os vales da tua altura.", reaction: "Lamento sobre o Faraó, dragão dos mares. 🐊" },
      { upTo: 16, god: "Cobrirei os céus, e enegrecerei as suas estrelas.", reaction: "As luzes do céu se apagam sobre o Egito. 🌑" },
      { upTo: 99, god: "Ali está Faraó, e toda a sua multidão.", reaction: "As nações jazem na sepultura. ⚰️" },
    ],
  },
  33: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.3, props: [P("tower", 0.7, 1.2)], actors: [F(0.4, "man", "raise", "white")] }),
      kf(10, { terrain: "city", night: 0.4, actors: [F(0.4, "man", "stand", "white"), F(0.66, "man", "kneel", "sand")] }),
      kf(21, { terrain: "city", night: 0.5, darkness: 0.3, actors: [F(0.4, "man", "mourn", "brown")] }),
      kf(30, { terrain: "plain", actors: [F(0.4, "man", "stand", "white"), F(0.62, "man", "stand", "brown"), F(0.76, "elder", "stand", "gray")] }),
    ],
    beats: [
      { upTo: 9, god: "A ti, ó filho do homem, te dei por atalaia sobre a casa de Israel.", reaction: "O profeta atalaia deve soar a trombeta. 📯" },
      { upTo: 20, god: "Vivo eu, não tenho prazer na morte do ímpio, mas em que se converta e viva.", reaction: "Deus chama à conversão. 🤍" },
      { upTo: 29, reaction: "Chega a notícia: a cidade foi ferida! 😢" },
      { upTo: 99, god: "Eles ouvem as tuas palavras, mas não as põem por obra.", reaction: "O povo ouve, mas não obedece." },
    ],
  },
  34: {
    keyframes: [
      kf(1, { terrain: "field", night: 0.3, actors: [F(0.4, "shepherd", "stand", "purple"), AN(0.66, "sheep"), AN(0.8, "sheep")] }),
      kf(11, { terrain: "hills", glory: 0.4, actors: [F(0.4, "shepherd", "carry", "white"), AN(0.62, "sheep"), AN(0.76, "sheep"), AN(0.88, "sheep")] }),
      kf(23, { terrain: "field", glory: 0.6, actors: [F(0.4, "shepherd", "raise", "white"), AN(0.64, "sheep"), AN(0.78, "sheep")] }),
    ],
    beats: [
      { upTo: 10, god: "Ai dos pastores de Israel que se apascentam a si mesmos! Não deviam os pastores apascentar as ovelhas?", reaction: "Os pastores infiéis abandonaram o rebanho. 😠" },
      { upTo: 22, god: "Eis que eu mesmo buscarei as minhas ovelhas, e as procurarei.", reaction: "Deus será o Pastor do seu povo. 🐑" },
      { upTo: 99, god: "Suscitarei sobre elas um só pastor, o meu servo Davi.", reaction: "A promessa do bom Pastor. ✨" },
    ],
  },
  35: {
    keyframes: [
      kf(1, { terrain: "mountain", night: 0.3, actors: [F(0.4, "man", "raise", "brown")] }),
      kf(10, { terrain: "mountain", fire: 0.5, storm: 0.4, actors: [F(0.5, "warrior", "fight", "red", { facing: -1 })] }),
    ],
    beats: [
      { upTo: 9, god: "Eis que eu sou contra ti, ó monte Seir, e farei de ti uma assolação.", reaction: "Juízo contra o monte Seir (Edom). ⛰️" },
      { upTo: 99, god: "Como te alegraste da herança da casa de Israel, assim farei a ti.", reaction: "A inimizade de Edom é retribuída. ⚔️" },
    ],
  },
  36: {
    keyframes: [
      kf(1, { terrain: "hills", actors: [F(0.4, "man", "raise", "brown")] }),
      kf(8, { terrain: "field", glory: 0.4, props: [P("tree", 0.68, 1.2)], actors: [F(0.4, "man", "stand", "brown")] }),
      kf(25, { terrain: "river", glory: 0.6, actors: [F(0.4, "man", "kneel", "brown")] }),
      kf(33, { terrain: "field", glory: 0.5, crowd: 0.4, props: [P("tree", 0.66, 1.1)], actors: [F(0.4, "man", "stand", "green")] }),
    ],
    beats: [
      { upTo: 7, god: "Ó montes de Israel, ouvi a palavra do SENHOR.", reaction: "Deus fala aos montes de Israel. ⛰️" },
      { upTo: 24, god: "Tomar-vos-ei dentre as nações, e vos trarei à vossa terra.", reaction: "O povo será restaurado. 🌾" },
      { upTo: 32, god: "Dar-vos-ei um coração novo, e porei dentro de vós um espírito novo.", reaction: "Coração novo, espírito novo. 💧🤍" },
      { upTo: 99, god: "Esta terra que estava assolada tem-se tornado como o jardim do Éden.", reaction: "A terra deserta floresce de novo. 🌳" },
    ],
  },
  37: {
    keyframes: [
      kf(1, { terrain: "desert", night: 0.4, darkness: 0.3, props: [P("basket", 0.2, 0.7), P("basket", 0.5, 0.7), P("basket", 0.78, 0.7)], actors: [F(0.4, "man", "stand", "brown")] }),
      kf(7, { terrain: "desert", night: 0.3, storm: 0.4, actors: [F(0.4, "man", "raise", "brown"), F(0.62, "man", "lie", "sand"), F(0.78, "man", "lie", "gray")] }),
      kf(10, { terrain: "desert", glory: 0.6, actors: [F(0.4, "man", "raise", "brown"), F(0.58, "man", "stand", "sand"), F(0.72, "man", "stand", "gray"), F(0.86, "man", "stand", "brown")] }),
      kf(15, { terrain: "field", glory: 0.7, crowd: 0.4, actors: [F(0.4, "shepherd", "raise", "white"), F(0.66, "man", "stand", "brown")] }),
    ],
    beats: [
      { upTo: 6, god: "Ó ossos secos, ouvi a palavra do SENHOR: Farei entrar em vós o espírito, e vivereis.", reaction: "O vale cheio de ossos secos. 💀" },
      { upTo: 10, god: "Vem dos quatro ventos, ó espírito, e assopra sobre estes mortos.", reaction: "Os ossos se ajuntam e ganham vida — um exército em pé! ✨" },
      { upTo: 14, god: "Porei em vós o meu espírito, e vivereis.", reaction: "Israel ressurge da sepultura. 🌟" },
      { upTo: 99, god: "Farei deles uma nação, e um rei será rei de todos eles.", reaction: "Dois paus, um só povo, um só Rei. 🤝" },
    ],
  },
  38: {
    keyframes: [
      kf(1, { terrain: "mountain", night: 0.3, actors: [F(0.4, "king", "stand", "gray"), F(0.66, "warrior", "stand", "red")] }),
      kf(8, { terrain: "hills", storm: 0.5, crowd: 0.5, actors: [F(0.3, "warrior", "fight", "red", { facing: 1 }), F(0.5, "warrior", "stand", "gray")] }),
      kf(18, { terrain: "mountain", storm: 0.8, fire: 0.6, hail: 0.5, actors: [F(0.4, "man", "raise", "brown")] }),
    ],
    beats: [
      { upTo: 9, god: "Eis que eu sou contra ti, ó Gogue, príncipe de Meseque e Tubal.", reaction: "Gogue, da terra de Magogue, se levanta. ⚔️" },
      { upTo: 16, god: "Subirás contra o meu povo Israel, como uma nuvem, para cobrir a terra.", reaction: "As nações marcham contra Israel. 🌩️" },
      { upTo: 99, god: "A minha indignação subirá; falarei com fogo e com saraiva.", reaction: "Deus responde com tempestade e fogo. ⚡🔥" },
    ],
  },
  39: {
    keyframes: [
      kf(1, { terrain: "mountain", storm: 0.6, fire: 0.5, actors: [F(0.4, "man", "raise", "brown"), F(0.66, "warrior", "lie", "red")] }),
      kf(9, { terrain: "hills", fire: 0.6, actors: [F(0.4, "man", "carry", "brown"), F(0.66, "man", "stand", "sand")] }),
      kf(21, { terrain: "field", glory: 0.6, crowd: 0.4, actors: [F(0.4, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 8, god: "Ferirei o teu arco da tua mão esquerda, e farei cair as tuas flechas.", reaction: "Gogue cai sobre os montes de Israel. ⚔️" },
      { upTo: 20, reaction: "Sete anos queimam as armas; sete meses sepultam os mortos. 🔥" },
      { upTo: 99, god: "Não esconderei mais deles o meu rosto, pois derramei o meu espírito.", reaction: "A glória do SENHOR entre as nações. ✨" },
    ],
  },
  40: {
    keyframes: [
      kf(1, { terrain: "mountain", glory: 0.5, actors: [F(0.4, "man", "stand", "brown"), F(0.64, "angel", "stand", "white")] }),
      kf(5, { terrain: "city", glory: 0.5, props: [P("tower", 0.7, 1.3)], actors: [F(0.3, "man", "walk", "brown"), F(0.5, "angel", "raise", "white")] }),
      kf(28, { terrain: "city", glory: 0.6, props: [P("tower", 0.3, 1), P("altar", 0.66, 1)], actors: [F(0.4, "angel", "stand", "white")] }),
    ],
    beats: [
      { upTo: 4, god: undefined, reaction: "Levado em visão a um alto monte, Ezequiel vê uma cidade. 🏙️" },
      { upTo: 27, reaction: "Um homem com cordel de medir revela as portas do Templo. 📐" },
      { upTo: 99, reaction: "O átrio, as câmaras e o pórtico da Casa. 🏛️" },
    ],
  },
  41: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.5, props: [P("tower", 0.5, 1.3)], actors: [F(0.4, "angel", "raise", "white"), F(0.66, "man", "stand", "brown")] }),
      kf(15, { terrain: "city", glory: 0.5, props: [P("tree", 0.28, 0.9), P("tree", 0.72, 0.9)], actors: [F(0.5, "man", "stand", "brown")] }),
    ],
    beats: [
      { upTo: 14, reaction: "A medida do santuário e do Santo dos Santos. 📏" },
      { upTo: 99, reaction: "Palmeiras e querubins gravados nas paredes. 🌴" },
    ],
  },
  42: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.4, props: [P("tower", 0.3, 1), P("tower", 0.68, 1)], actors: [F(0.4, "angel", "walk", "white"), F(0.62, "man", "stand", "brown")] }),
      kf(15, { terrain: "city", glory: 0.5, actors: [F(0.45, "angel", "raise", "white")] }),
    ],
    beats: [
      { upTo: 14, reaction: "As câmaras santas dos sacerdotes. 🏛️" },
      { upTo: 99, reaction: "Mede-se o recinto ao redor: santo e comum separados. 📐" },
    ],
  },
  43: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.7, actors: [F(0.4, "man", "bow", "brown"), F(0.66, "angel", "stand", "white")] }),
      kf(4, { terrain: "city", glory: 0.95, props: [P("tower", 0.7, 1.2)], actors: [F(0.4, "man", "kneel", "brown")] }),
      kf(13, { terrain: "city", glory: 0.6, props: [P("altar", 0.5, 1.3, 0.8)], actors: [F(0.4, "man", "stand", "gold")] }),
    ],
    beats: [
      { upTo: 3, reaction: "A glória do Deus de Israel vem do lado do oriente. 🌅" },
      { upTo: 12, god: "Este é o lugar do meu trono, onde habitarei no meio dos filhos de Israel para sempre.", reaction: "A glória enche a Casa! 🌟" },
      { upTo: 99, god: "Estas são as medidas do altar.", reaction: "O altar do novo Templo. 🔥" },
    ],
  },
  44: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.6, props: [P("tower", 0.66, 1.2)], actors: [F(0.4, "man", "stand", "brown"), F(0.64, "angel", "raise", "white")] }),
      kf(15, { terrain: "city", glory: 0.5, props: [P("altar", 0.66, 1, 0.7)], actors: [F(0.4, "man", "stand", "gold")] }),
    ],
    beats: [
      { upTo: 14, god: "Esta porta estará fechada, porque o SENHOR, Deus de Israel, entrou por ela.", reaction: "A porta oriental permanece fechada. 🚪" },
      { upTo: 99, god: "Os sacerdotes levitas, filhos de Zadoque, se chegarão a mim para me servir.", reaction: "Os sacerdotes fiéis servem no santuário. 🕯️" },
    ],
  },
  45: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.4, props: [P("tower", 0.5, 1.1)], actors: [F(0.4, "man", "stand", "brown")] }),
      kf(13, { terrain: "field", actors: [F(0.4, "king", "stand", "purple"), F(0.66, "man", "carry", "sand")], props: [P("basket", 0.8)] }),
      kf(18, { terrain: "city", glory: 0.4, props: [P("altar", 0.55, 1, 0.7)], actors: [F(0.4, "man", "stand", "gold")] }),
    ],
    beats: [
      { upTo: 12, god: "Separareis uma porção santa da terra para o SENHOR.", reaction: "A porção santa e a cidade. 🏙️" },
      { upTo: 17, god: "Tereis balanças justas.", reaction: "Justiça e ofertas honestas. ⚖️" },
      { upTo: 99, reaction: "As festas solenes e a Páscoa no Templo. 🎉" },
    ],
  },
  46: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.4, props: [P("altar", 0.5, 1.1, 0.7)], actors: [F(0.4, "king", "bow", "purple")] }),
      kf(9, { terrain: "city", crowd: 0.6, props: [P("tower", 0.72, 1)], actors: [F(0.4, "man", "walk", "brown"), F(0.62, "man", "walk", "sand")] }),
      kf(19, { terrain: "city", actors: [F(0.4, "angel", "walk", "white"), F(0.64, "man", "stand", "brown")] }),
    ],
    beats: [
      { upTo: 8, god: "A porta do átrio interior estará fechada nos seis dias de trabalho, mas no sábado se abrirá.", reaction: "As ofertas do príncipe no sábado. 🕯️" },
      { upTo: 18, reaction: "O povo adora diante do SENHOR nas festas. 🙏" },
      { upTo: 99, reaction: "As cozinhas onde se preparam os sacrifícios. 🍲" },
    ],
  },
  47: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.6, props: [P("tower", 0.66, 1.2)], actors: [F(0.4, "man", "stand", "brown"), F(0.64, "angel", "raise", "white")] }),
      kf(3, { terrain: "river", glory: 0.5, actors: [F(0.4, "man", "walk", "brown"), F(0.66, "angel", "stand", "white")] }),
      kf(7, { terrain: "river", glory: 0.6, props: [P("tree", 0.24, 1.1), P("tree", 0.76, 1.1)], actors: [F(0.5, "man", "stand", "brown")] }),
      kf(13, { terrain: "field", glory: 0.4, props: [P("tree", 0.68, 1)], actors: [F(0.4, "angel", "raise", "white")] }),
    ],
    beats: [
      { upTo: 2, reaction: "Águas saem de baixo do limiar do Templo, para o oriente. 💧" },
      { upTo: 6, god: undefined, reaction: "O rio cresce: águas até os tornozelos, joelhos, cintura, e então um rio para nadar. 🌊" },
      { upTo: 12, god: "Tudo por onde entrar este rio viverá; suas folhas servirão de remédio.", reaction: "Árvores frutíferas nas margens dão vida! 🌳" },
      { upTo: 99, reaction: "A terra é repartida entre as tribos. 🗺️" },
    ],
  },
  48: {
    keyframes: [
      kf(1, { terrain: "plain", glory: 0.4, crowd: 0.4, actors: [F(0.3, "elder", "stand", "gray"), F(0.5, "man", "stand", "brown"), F(0.7, "man", "stand", "sand")] }),
      kf(15, { terrain: "city", glory: 0.5, props: [P("tower", 0.5, 1.2)], actors: [F(0.4, "man", "stand", "brown")] }),
      kf(30, { terrain: "city", glory: 0.8, props: [P("tower", 0.3, 1.1), P("tower", 0.7, 1.1)], actors: [F(0.4, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 14, reaction: "A herança repartida entre as doze tribos de Israel. 🗺️" },
      { upTo: 29, reaction: "A porção santa, os sacerdotes e a cidade no meio. 🏙️" },
      { upTo: 99, god: "E o nome da cidade desde aquele dia será: O SENHOR ESTÁ ALI.", reaction: "As doze portas da cidade; e Deus habita entre os seus. ✨🌟" },
    ],
  },
};
