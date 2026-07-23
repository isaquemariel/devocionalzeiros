// ============================================================================
// Roteiros de cena (Living Scene v2) — ISAÍAS 1 a 33, capítulo por capítulo.
// O chamado de Judá ao arrependimento, o monte do SENHOR e as espadas em arados,
// a visão do trono e os serafins, Emanuel e o Menino que nos nasce, a Vara de
// Jessé com o lobo e o cordeiro, os juízos contra as nações, e os cânticos de
// louvor e confiança. Puramente visual/narrativo — não toca em progresso.
// Segue o padrão de Êxodo (rpgExodusScenes).
// ============================================================================

import type { ChapterScript, V2Actor, V2Prop, SceneState } from "@/lib/rpgLivingV2";

const F = (x: number, role: V2Actor["role"], action: V2Actor["action"], palette?: V2Actor["palette"], extra: Partial<V2Actor> = {}): V2Actor => ({ x, role, action, palette, ...extra });
const AN = (x: number, animal: NonNullable<V2Actor["animal"]>, scale = 1, color?: string): V2Actor => ({ x, kind: "animal", animal, scale, color });
const P = (kind: string, x: number, scale = 1, fire?: number): V2Prop => ({ kind, x, scale, ...(fire != null ? { fire } : {}) });
const kf = (v: number, state: SceneState) => ({ v, state });

export const ISAIAH_1: Record<number, ChapterScript> = {
  1: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.5, props: [P("tower", 0.2, 1.1), P("altar", 0.6)], actors: [F(0.4, "elder", "raise", "white")] }),
      kf(11, { terrain: "city", props: [P("altar", 0.5, 1.1, 0.7)], actors: [F(0.42, "king", "stand", "gold"), F(0.66, "man", "bow", "sand")] }),
      kf(18, { terrain: "city", glory: 0.6, props: [P("altar", 0.55)], actors: [F(0.45, "man", "kneel", "brown")] }),
      kf(27, { terrain: "city", glory: 0.4, actors: [F(0.4, "elder", "raise", "white"), F(0.62, "man", "stand", "sand")] }),
    ],
    beats: [
      { upTo: 10, god: "Ouvi, ó céus; escuta, ó terra: criei filhos, e eles se rebelaram.", reaction: "O SENHOR chama Judá diante das nações. ⚖️" },
      { upTo: 17, god: "De que me serve a multidão dos vossos sacrifícios? Aprendei a fazer o bem.", reaction: "Deus rejeita o culto vazio e pede justiça." },
      { upTo: 26, god: "Ainda que os vossos pecados sejam como a escarlata, ficarão brancos como a neve.", reaction: "O convite ao arrependimento. 🤍" },
      { upTo: 99, reaction: "Sião será remida pela justiça. ✨" },
    ],
  },
  2: {
    keyframes: [
      kf(1, { terrain: "mountain", glory: 0.6, crowd: 0.6, props: [P("tower", 0.5, 1.3)], actors: [F(0.35, "elder", "raise", "white")] }),
      kf(3, { terrain: "mountain", glory: 0.8, crowd: 0.7, props: [P("tower", 0.5, 1.3)], actors: [F(0.28, "man", "walk", "sand"), F(0.7, "man", "walk", "blue")] }),
      kf(4, { terrain: "hills", glory: 0.4, props: [P("altar", 0.6)], actors: [F(0.4, "man", "kneel", "brown"), AN(0.7, "ox", 0.9)] }),
      kf(12, { terrain: "mountain", storm: 0.5, actors: [F(0.45, "king", "bow", "gold")] }),
    ],
    beats: [
      { upTo: 3, god: "Vinde, subamos ao monte do SENHOR; ele nos ensinará os seus caminhos.", reaction: "O monte da Casa do SENHOR se ergue acima de tudo. ⛰️" },
      { upTo: 4, god: "Das suas espadas farão arados, e das suas lanças, foices.", reaction: "Nação não levantará espada contra nação. 🕊️" },
      { upTo: 11, reaction: "O orgulho do homem será abatido." },
      { upTo: 99, god: "Só o SENHOR será exaltado naquele dia.", reaction: "Deixai o homem cujo fôlego está no nariz." },
    ],
  },
  3: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.2, props: [P("tower", 0.2)], actors: [F(0.4, "elder", "mourn", "gray"), F(0.64, "man", "stand", "sand")] }),
      kf(13, { terrain: "city", glory: 0.4, actors: [F(0.45, "elder", "raise", "white"), F(0.68, "man", "bow", "brown")] }),
      kf(16, { terrain: "city", crowd: 0.5, actors: [F(0.4, "woman", "stand", "purple"), F(0.6, "woman", "walk", "gold")] }),
    ],
    beats: [
      { upTo: 12, god: "Tiro de Jerusalém o sustento; darei meninos por príncipes.", reaction: "Judá cambaleia sem líderes justos. 😟" },
      { upTo: 15, god: "Que fazeis, que esmagais o meu povo e moeis a face dos pobres?", reaction: "O SENHOR entra em juízo com os anciãos." },
      { upTo: 99, reaction: "O orgulho das filhas de Sião será humilhado." },
    ],
  },
  4: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.4, actors: [F(0.4, "woman", "stand", "sand"), F(0.6, "woman", "mourn", "gray")] }),
      kf(2, { terrain: "mountain", glory: 0.7, props: [P("tree", 0.6, 1.1)], actors: [F(0.4, "man", "raise", "white")] }),
      kf(5, { terrain: "mountain", glory: 0.6, night: 0.3, props: [P("pillarCloud", 0.4, 1), P("pillarFire", 0.6, 1)], actors: [] }),
    ],
    beats: [
      { upTo: 1, reaction: "Dias de vergonha para as filhas de Sião." },
      { upTo: 4, god: "O renovo do SENHOR será formoso e glorioso.", reaction: "O remanescente será chamado santo. 🌿" },
      { upTo: 99, god: "Criarei nuvem de dia e fumaça e fogo de noite sobre Sião.", reaction: "A glória cobrirá o monte como um dossel. ☁️🔥" },
    ],
  },
  5: {
    keyframes: [
      kf(1, { terrain: "hills", props: [P("tower", 0.7, 1.1), P("tree", 0.3), P("tree", 0.5)], actors: [F(0.4, "man", "stand", "green")] }),
      kf(7, { terrain: "hills", night: 0.2, props: [P("tree", 0.4)], actors: [F(0.4, "man", "mourn", "sand")] }),
      kf(26, { terrain: "field", storm: 0.5, crowd: 0.5, actors: [F(0.3, "warrior", "fight", "red", { facing: 1 }), F(0.7, "warrior", "stand", "gray")] }),
    ],
    beats: [
      { upTo: 6, god: "O meu amado tinha uma vinha; esperava uvas boas, mas deu bravas.", reaction: "O cântico da vinha do SENHOR. 🍇" },
      { upTo: 23, reaction: "Ai dos que ajuntam casa a casa e chamam o mal de bem! 😔" },
      { upTo: 99, god: "Levantarei um sinal às nações de longe e virão veloz.", reaction: "Um povo distante vem como juízo." },
    ],
  },
  6: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.9, smoke: 0.5, props: [P("smoke", 0.5, 2.2)], actors: [F(0.5, "king", "stand", "gold")] }),
      kf(2, { terrain: "city", glory: 0.95, smoke: 0.6, props: [P("smoke", 0.5, 2.4)], actors: [F(0.3, "angel", "raise", "white"), F(0.7, "angel", "raise", "white")] }),
      kf(5, { terrain: "city", glory: 0.8, smoke: 0.5, actors: [F(0.45, "man", "bow", "brown")] }),
      kf(6, { terrain: "city", glory: 0.9, fire: 0.6, props: [P("altar", 0.6, 1, 1)], actors: [F(0.4, "man", "kneel", "brown"), F(0.62, "angel", "raise", "white")] }),
      kf(8, { terrain: "city", glory: 0.8, actors: [F(0.45, "man", "raise", "brown")] }),
    ],
    beats: [
      { upTo: 4, reaction: "Vi o Senhor num alto trono; os serafins clamavam. 👑" },
      { upTo: 5, god: "Santo, Santo, Santo é o SENHOR dos Exércitos; a terra está cheia da sua glória.", reaction: "'Ai de mim! Sou homem de lábios impuros.' 😢" },
      { upTo: 7, reaction: "Um serafim toca seus lábios com brasa do altar. 🔥" },
      { upTo: 99, god: "A quem enviarei? Quem há de ir por nós?", reaction: "'Eis-me aqui, envia-me a mim!' ✨" },
    ],
  },
  7: {
    keyframes: [
      kf(1, { terrain: "city", storm: 0.3, props: [P("tower", 0.2)], actors: [F(0.4, "king", "mourn", "gold"), F(0.66, "man", "stand", "sand")] }),
      kf(3, { terrain: "field", actors: [F(0.35, "man", "raise", "white"), F(0.55, "child", "stand", "sand"), F(0.72, "king", "stand", "gold")] }),
      kf(14, { terrain: "field", glory: 0.7, actors: [F(0.4, "woman", "carry", "blue"), F(0.6, "child", "stand", "white")] }),
    ],
    beats: [
      { upTo: 9, god: "Se não crerdes, certamente não permanecereis.", reaction: "Isaías conforta o rei Acaz temeroso." },
      { upTo: 13, god: "Pede para ti um sinal ao SENHOR teu Deus.", reaction: "Acaz recusa pedir o sinal." },
      { upTo: 99, god: "Eis que a virgem conceberá e dará à luz um filho, e será chamado Emanuel.", reaction: "Deus conosco. 👶✨" },
    ],
  },
  8: {
    keyframes: [
      kf(1, { terrain: "city", actors: [F(0.4, "man", "raise", "brown"), F(0.62, "woman", "carry", "blue")] }),
      kf(7, { terrain: "river", flood: 0.7, storm: 0.4, actors: [F(0.4, "man", "stand", "sand")] }),
      kf(11, { terrain: "city", glory: 0.4, actors: [F(0.45, "man", "stand", "white")] }),
      kf(19, { terrain: "city", night: 0.6, darkness: 0.5, actors: [F(0.4, "man", "mourn", "gray")] }),
    ],
    beats: [
      { upTo: 4, reaction: "Nasce um filho como sinal: 'Depressa despojo'." },
      { upTo: 10, god: "Tramai, mas será desfeito, porque Deus é conosco.", reaction: "As águas da Assíria transbordam sobre a terra. 🌊" },
      { upTo: 18, god: "Ao SENHOR santificai; ele seja o vosso temor.", reaction: "Ele será santuário para os que nele confiam." },
      { upTo: 99, reaction: "Os que buscam os mortos andam em trevas. ⬛" },
    ],
  },
  9: {
    keyframes: [
      kf(1, { terrain: "hills", night: 0.7, darkness: 0.4, actors: [F(0.4, "man", "stand", "gray")] }),
      kf(2, { terrain: "hills", glory: 0.8, night: 0.3, actors: [F(0.4, "man", "raise", "white"), F(0.62, "man", "stand", "sand")] }),
      kf(6, { terrain: "hills", glory: 0.9, props: [P("star", 0.5, 1.2)], actors: [F(0.4, "woman", "carry", "blue"), F(0.6, "child", "stand", "white")] }),
      kf(8, { terrain: "city", storm: 0.4, actors: [F(0.45, "man", "mourn", "sand")] }),
    ],
    beats: [
      { upTo: 5, reaction: "O povo que andava em trevas viu grande luz. 💡" },
      { upTo: 6, god: "Um menino nos nasceu, um filho se nos deu; o governo está sobre os seus ombros.", reaction: "Maravilhoso, Deus Forte, Pai da Eternidade, Príncipe da Paz. 👶✨" },
      { upTo: 7, god: "Não haverá fim ao crescimento do seu governo e da sua paz.", reaction: "O trono de Davi estabelecido para sempre. 👑" },
      { upTo: 99, reaction: "Mas a ira sobre o orgulho não se apartou. ⚡" },
    ],
  },
  10: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.2, actors: [F(0.4, "man", "mourn", "sand"), F(0.66, "elder", "stand", "gray")] }),
      kf(5, { terrain: "plain", storm: 0.5, crowd: 0.5, actors: [F(0.4, "king", "raise", "red"), F(0.7, "warrior", "fight", "gray")] }),
      kf(20, { terrain: "hills", glory: 0.5, actors: [F(0.42, "man", "raise", "white")] }),
      kf(33, { terrain: "mountain", storm: 0.6, props: [P("tree", 0.5, 1.2)], actors: [F(0.4, "warrior", "stand", "gray")] }),
    ],
    beats: [
      { upTo: 4, reaction: "Ai dos que decretam leis injustas! ⚖️" },
      { upTo: 19, god: "Ó Assíria, vara da minha ira! Acaso a machadinha se gloria contra quem corta?", reaction: "A Assíria é instrumento, mas será julgada." },
      { upTo: 27, god: "Não temas a Assíria, ó povo meu que habitas em Sião.", reaction: "Um remanescente voltará ao Deus forte. 🌿" },
      { upTo: 99, reaction: "O SENHOR desbasta os ramos altivos como floresta. 🌲" },
    ],
  },
  11: {
    keyframes: [
      kf(1, { terrain: "hills", glory: 0.7, props: [P("tree", 0.5, 1.3)], actors: [F(0.4, "man", "stand", "white")] }),
      kf(2, { terrain: "hills", glory: 0.9, props: [P("dove", 0.5, 1)], actors: [F(0.42, "man", "raise", "white")] }),
      kf(6, { terrain: "garden", glory: 0.5, props: [P("tree", 0.75)], actors: [F(0.5, "child", "stand", "white"), AN(0.28, "lion", 1), AN(0.44, "sheep"), AN(0.66, "goat", 0.9), AN(0.82, "ox", 0.9)] }),
      kf(10, { terrain: "mountain", glory: 0.7, crowd: 0.6, props: [P("star", 0.5, 1.1)], actors: [F(0.4, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 3, god: "Sairá um rebento do tronco de Jessé; repousará sobre ele o Espírito do SENHOR.", reaction: "A Vara de Jessé. 🌿" },
      { upTo: 5, god: "Julgará com justiça os pobres e ferirá a terra com a vara da sua boca.", reaction: "Justiça e fidelidade cingem-lhe os lombos." },
      { upTo: 9, god: "O lobo habitará com o cordeiro, e um menino os guiará.", reaction: "Nada fará mal no monte santo. 🐺🐑" },
      { upTo: 99, god: "A raiz de Jessé será um estandarte aos povos.", reaction: "As nações o buscarão. ✨" },
    ],
  },
  12: {
    keyframes: [
      kf(1, { terrain: "river", glory: 0.7, crowd: 0.5, actors: [F(0.4, "man", "raise", "white")] }),
      kf(3, { terrain: "river", glory: 0.6, props: [P("well", 0.6)], actors: [F(0.35, "woman", "carry", "blue"), F(0.6, "man", "kneel", "brown")] }),
      kf(6, { terrain: "mountain", glory: 0.8, crowd: 0.7, actors: [F(0.4, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 2, god: "Eis que Deus é a minha salvação; confiarei e não temerei.", reaction: "Louvarei ao SENHOR, minha força e cântico. 🎶" },
      { upTo: 3, reaction: "Com alegria tirareis águas das fontes da salvação. 💧" },
      { upTo: 99, god: "Grande é no meio de ti o Santo de Israel.", reaction: "'Exulta e canta, ó habitante de Sião!' ✨" },
    ],
  },
  13: {
    keyframes: [
      kf(1, { terrain: "mountain", storm: 0.5, actors: [F(0.4, "man", "raise", "white")] }),
      kf(6, { terrain: "city", storm: 0.7, darkness: 0.5, night: 0.4, actors: [F(0.4, "man", "mourn", "gray"), F(0.66, "warrior", "fight", "red")] }),
      kf(19, { terrain: "city", fire: 0.7, night: 0.6, props: [P("tower", 0.3, 1.2)], actors: [F(0.5, "king", "mourn", "gold")] }),
    ],
    beats: [
      { upTo: 5, reaction: "Sentença contra a Babilônia. 🏙️" },
      { upTo: 16, god: "O dia do SENHOR vem cruel, com furor e ira acesa.", reaction: "O sol se escurece; as estrelas não brilham. ⬛" },
      { upTo: 99, god: "Babilônia, glória dos reinos, será como Sodoma.", reaction: "A soberba cidade cairá. 🔥" },
    ],
  },
  14: {
    keyframes: [
      kf(1, { terrain: "hills", glory: 0.5, crowd: 0.6, actors: [F(0.4, "man", "raise", "white"), F(0.66, "man", "stand", "sand")] }),
      kf(12, { terrain: "city", night: 0.7, darkness: 0.5, actors: [F(0.5, "king", "mourn", "gray")] }),
      kf(24, { terrain: "mountain", storm: 0.5, actors: [F(0.4, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 11, god: "O SENHOR se compadecerá de Jacó e o porá na sua terra.", reaction: "Israel entoa provérbio sobre o rei caído." },
      { upTo: 23, god: "Como caíste do céu, ó estrela da manhã? Ao inferno serás abatido.", reaction: "A queda do soberbo. 🌑" },
      { upTo: 99, god: "Como pensei, assim sucederá; como determinei, assim ficará.", reaction: "O propósito do SENHOR sobre as nações." },
    ],
  },
  15: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.4, fire: 0.4, actors: [F(0.45, "man", "mourn", "gray")] }),
      kf(5, { terrain: "hills", night: 0.3, actors: [F(0.4, "man", "mourn", "sand"), F(0.64, "woman", "mourn", "gray")] }),
    ],
    beats: [
      { upTo: 4, reaction: "Sentença contra Moabe: numa noite é destruída. 🌑" },
      { upTo: 99, god: "O meu coração clama por Moabe.", reaction: "Choro e lamento por toda parte. 😢" },
    ],
  },
  16: {
    keyframes: [
      kf(1, { terrain: "hills", props: [P("tree", 0.4)], actors: [F(0.4, "man", "carry", "sand"), AN(0.68, "sheep")] }),
      kf(6, { terrain: "city", night: 0.3, actors: [F(0.45, "king", "mourn", "gold")] }),
      kf(9, { terrain: "field", props: [P("tree", 0.3), P("tree", 0.6)], actors: [F(0.4, "man", "mourn", "brown")] }),
    ],
    beats: [
      { upTo: 5, god: "Firmar-se-á um trono em benignidade; sobre ele se assentará quem julga com justiça.", reaction: "Moabe busca refúgio e justiça." },
      { upTo: 12, reaction: "A soberba de Moabe abate a sua alegria. 🍇" },
      { upTo: 99, reaction: "Dentro de três anos a glória de Moabe será desprezada." },
    ],
  },
  17: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.4, props: [P("tower", 0.3)], actors: [F(0.45, "man", "mourn", "gray")] }),
      kf(6, { terrain: "field", props: [P("tree", 0.5, 1.1)], actors: [F(0.4, "man", "stand", "sand")] }),
      kf(12, { terrain: "sea", storm: 0.7, actors: [F(0.4, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 5, reaction: "Sentença contra Damasco: deixará de ser cidade. 🏚️" },
      { upTo: 11, god: "Naquele dia o homem atentará para o seu Criador.", reaction: "Restará pouca respiga, como após a colheita. 🌾" },
      { upTo: 99, god: "As nações bramam como bramam muitas águas, mas Deus as repreende.", reaction: "O tumulto dos povos se aquieta. 🌊" },
    ],
  },
  18: {
    keyframes: [
      kf(1, { terrain: "river", crowd: 0.4, props: [P("reeds", 0.2), P("reeds", 0.8)], actors: [F(0.45, "man", "stand", "sand")] }),
      kf(4, { terrain: "hills", glory: 0.5, actors: [F(0.4, "man", "stand", "white")] }),
      kf(7, { terrain: "mountain", glory: 0.6, crowd: 0.5, actors: [F(0.4, "man", "carry", "sand")] }),
    ],
    beats: [
      { upTo: 3, reaction: "Sentença sobre a terra dos rios distantes." },
      { upTo: 6, god: "Estarei quieto e olharei da minha morada, como calor sereno na luz.", reaction: "Deus observa antes de agir. ☀️" },
      { upTo: 99, reaction: "Trarão presentes ao SENHOR no monte Sião. 🎁" },
    ],
  },
  19: {
    keyframes: [
      kf(1, { terrain: "river", storm: 0.4, props: [P("pyramid", 0.2, 1.1), P("reeds", 0.8)], actors: [F(0.5, "man", "mourn", "sand")] }),
      kf(5, { terrain: "river", night: 0.3, props: [P("reeds", 0.3), P("reeds", 0.7)], actors: [F(0.45, "man", "mourn", "brown")] }),
      kf(19, { terrain: "river", glory: 0.6, props: [P("altar", 0.5), P("pyramid", 0.8, 0.9)], actors: [F(0.4, "man", "kneel", "white")] }),
      kf(23, { terrain: "plain", glory: 0.5, crowd: 0.6, actors: [F(0.3, "man", "walk", "sand"), F(0.7, "man", "walk", "blue")] }),
    ],
    beats: [
      { upTo: 4, god: "Eis que o SENHOR vem sobre o Egito montado numa nuvem veloz.", reaction: "Os ídolos do Egito estremecem. ☁️" },
      { upTo: 15, reaction: "As águas do Nilo secam; o conselho se torna néscio. 🌊" },
      { upTo: 22, god: "Naquele dia haverá altar ao SENHOR no meio do Egito.", reaction: "O Egito conhecerá o SENHOR. 🕯️" },
      { upTo: 99, god: "Bendito seja o Egito meu povo, e a Assíria obra das minhas mãos.", reaction: "Egito, Assíria e Israel, bênção na terra. ✨" },
    ],
  },
  20: {
    keyframes: [
      kf(1, { terrain: "city", storm: 0.4, props: [P("tower", 0.25)], actors: [F(0.4, "king", "raise", "red"), F(0.7, "warrior", "fight", "gray")] }),
      kf(2, { terrain: "plain", actors: [F(0.45, "man", "walk", "sand")] }),
      kf(4, { terrain: "desert", crowd: 0.5, actors: [F(0.35, "man", "walk", "sand"), F(0.6, "man", "mourn", "sand")] }),
    ],
    beats: [
      { upTo: 1, reaction: "Assíria toma Asdode. ⚔️" },
      { upTo: 2, god: "Vai, solta o pano de saco e tira a sandália do pé.", reaction: "Isaías anda descalço como sinal." },
      { upTo: 99, god: "Assim serão levados os cativos do Egito e da Etiópia.", reaction: "Vã é a confiança nas nações. 😔" },
    ],
  },
  21: {
    keyframes: [
      kf(1, { terrain: "desert", storm: 0.6, actors: [F(0.4, "man", "mourn", "white")] }),
      kf(6, { terrain: "city", night: 0.6, props: [P("tower", 0.5, 1.2)], actors: [F(0.5, "man", "stand", "gray")] }),
      kf(9, { terrain: "desert", night: 0.4, actors: [F(0.35, "man", "raise", "sand"), AN(0.7, "camel", 0.9)] }),
    ],
    beats: [
      { upTo: 5, reaction: "Sentença do deserto do mar: visão dura. 🌪️" },
      { upTo: 8, god: "Vai, põe uma sentinela que anuncie o que vir.", reaction: "A sentinela vigia na torre." },
      { upTo: 99, reaction: "'Caiu, caiu Babilônia!' 🏙️" },
    ],
  },
  22: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.6, props: [P("tower", 0.3, 1.1)], actors: [F(0.4, "man", "mourn", "sand")] }),
      kf(8, { terrain: "city", storm: 0.3, actors: [F(0.4, "warrior", "stand", "gray"), F(0.66, "man", "raise", "sand")] }),
      kf(20, { terrain: "city", glory: 0.5, actors: [F(0.45, "man", "stand", "white")] }),
    ],
    beats: [
      { upTo: 7, reaction: "Sentença do vale da visão: Jerusalém em tumulto. 😟" },
      { upTo: 14, god: "Comamos e bebamos, porque amanhã morreremos — este pecado não será perdoado.", reaction: "O povo se alegra em vez de chorar." },
      { upTo: 99, god: "Porei sobre o seu ombro a chave da casa de Davi.", reaction: "Eliaquim, servo fiel, é levantado. 🔑" },
    ],
  },
  23: {
    keyframes: [
      kf(1, { terrain: "sea", storm: 0.5, actors: [F(0.4, "man", "mourn", "sand")] }),
      kf(8, { terrain: "city", night: 0.4, props: [P("tower", 0.35, 1.1)], actors: [F(0.5, "king", "mourn", "purple")] }),
      kf(17, { terrain: "sea", glory: 0.4, actors: [F(0.4, "man", "stand", "sand")] }),
    ],
    beats: [
      { upTo: 7, reaction: "Sentença de Tiro: uivai, navios! 🚢" },
      { upTo: 14, god: "O SENHOR dos Exércitos decretou isto para abater a soberba.", reaction: "A cidade mercadora é humilhada." },
      { upTo: 99, reaction: "Depois de setenta anos, seu ganho será consagrado ao SENHOR." },
    ],
  },
  24: {
    keyframes: [
      kf(1, { terrain: "plain", storm: 0.6, darkness: 0.4, actors: [F(0.4, "man", "mourn", "gray")] }),
      kf(4, { terrain: "field", night: 0.4, props: [P("tree", 0.5)], actors: [F(0.45, "man", "mourn", "sand")] }),
      kf(14, { terrain: "sea", glory: 0.5, crowd: 0.5, actors: [F(0.4, "man", "raise", "white")] }),
      kf(23, { terrain: "mountain", glory: 0.9, actors: [F(0.45, "elder", "bow", "white")] }),
    ],
    beats: [
      { upTo: 3, god: "Eis que o SENHOR esvazia a terra e a assola.", reaction: "A terra inteira treme. 🌍" },
      { upTo: 13, reaction: "Poucos restam, como respiga da vindima. 🌾" },
      { upTo: 16, reaction: "Dos confins da terra cânticos ao Justo. 🎶" },
      { upTo: 99, god: "O SENHOR dos Exércitos reinará no monte Sião com glória.", reaction: "A lua se envergonha diante da sua glória. ✨" },
    ],
  },
  25: {
    keyframes: [
      kf(1, { terrain: "mountain", glory: 0.7, actors: [F(0.4, "man", "raise", "white")] }),
      kf(6, { terrain: "mountain", glory: 0.8, crowd: 0.7, props: [P("altar", 0.6)], actors: [F(0.35, "man", "stand", "sand"), F(0.6, "man", "raise", "blue")] }),
      kf(8, { terrain: "mountain", glory: 0.9, actors: [F(0.45, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 5, god: "Ó SENHOR, tu és o meu Deus; exaltar-te-ei, pois fizeste maravilhas.", reaction: "Louvor: refúgio do pobre na angústia. 🎶" },
      { upTo: 7, god: "Neste monte darei a todos os povos um banquete de vinhos puros.", reaction: "O véu que cobre as nações será destruído. 🍷" },
      { upTo: 99, god: "Ele destruirá a morte para sempre e enxugará as lágrimas de todos os rostos.", reaction: "'Eis que este é o nosso Deus!' ✨" },
    ],
  },
  26: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.6, crowd: 0.5, props: [P("tower", 0.25, 1.1)], actors: [F(0.4, "man", "raise", "white")] }),
      kf(3, { terrain: "city", glory: 0.5, actors: [F(0.45, "man", "kneel", "brown")] }),
      kf(19, { terrain: "hills", glory: 0.8, actors: [F(0.4, "man", "raise", "white"), F(0.66, "man", "stand", "sand")] }),
    ],
    beats: [
      { upTo: 2, reaction: "Temos uma cidade forte; a salvação é o seu muro. 🏰" },
      { upTo: 4, god: "Tu conservarás em paz aquele cujo pensamento está firme em ti.", reaction: "'Confiai no SENHOR perpetuamente!' 🕊️" },
      { upTo: 99, god: "Os teus mortos viverão; despertai e exultai, os que habitais no pó.", reaction: "A esperança da ressurreição. 🌅" },
    ],
  },
  27: {
    keyframes: [
      kf(1, { terrain: "sea", storm: 0.6, props: [P("serpent", 0.5, 1.3)], actors: [F(0.4, "man", "raise", "white")] }),
      kf(2, { terrain: "hills", glory: 0.5, props: [P("tree", 0.4), P("tree", 0.6)], actors: [F(0.4, "man", "stand", "green")] }),
      kf(12, { terrain: "mountain", glory: 0.6, crowd: 0.6, actors: [F(0.42, "man", "bow", "white")] }),
    ],
    beats: [
      { upTo: 1, god: "Naquele dia o SENHOR castigará com sua espada o leviatã, a serpente veloz.", reaction: "O monstro do mar é vencido. 🐉" },
      { upTo: 11, god: "Eu, o SENHOR, a guardo e a rego a cada momento; sou a vinha aprazível.", reaction: "A vinha do SENHOR florescerá. 🍇" },
      { upTo: 99, reaction: "A trombeta soa; os dispersos adoram no monte santo. 📯" },
    ],
  },
  28: {
    keyframes: [
      kf(1, { terrain: "hills", night: 0.2, props: [P("tree", 0.5)], actors: [F(0.4, "man", "mourn", "gold")] }),
      kf(7, { terrain: "city", night: 0.3, props: [P("altar", 0.6)], actors: [F(0.4, "elder", "lie", "purple"), F(0.66, "man", "mourn", "sand")] }),
      kf(16, { terrain: "city", glory: 0.6, props: [P("altar", 0.5, 1.1)], actors: [F(0.45, "man", "stand", "white")] }),
    ],
    beats: [
      { upTo: 6, reaction: "Ai da coroa de soberba dos bêbados de Efraim! 🍷" },
      { upTo: 15, god: "Preceito sobre preceito, um pouco aqui, um pouco ali.", reaction: "Zombam da palavra do SENHOR." },
      { upTo: 99, god: "Eis que ponho em Sião uma pedra angular, preciosa; quem crer não foge.", reaction: "A pedra de esquina, fundamento firme. 🪨" },
    ],
  },
  29: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.4, props: [P("altar", 0.5, 1, 0.6), P("tower", 0.25)], actors: [F(0.45, "man", "mourn", "sand")] }),
      kf(9, { terrain: "city", darkness: 0.5, night: 0.4, actors: [F(0.4, "man", "stand", "gray"), F(0.66, "elder", "lie", "gray")] }),
      kf(18, { terrain: "field", glory: 0.6, props: [P("tree", 0.5)], actors: [F(0.4, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 8, god: "Ai de Ariel, a cidade onde Davi acampou!", reaction: "Jerusalém será cercada e humilhada." },
      { upTo: 16, god: "Este povo honra-me com os lábios, mas seu coração está longe de mim.", reaction: "A sabedoria dos sábios perecerá." },
      { upTo: 99, god: "Naquele dia os surdos ouvirão e os olhos dos cegos verão.", reaction: "Os mansos terão nova alegria no SENHOR. ✨" },
    ],
  },
  30: {
    keyframes: [
      kf(1, { terrain: "desert", crowd: 0.5, actors: [F(0.35, "man", "walk", "sand"), AN(0.68, "camel", 0.9)] }),
      kf(8, { terrain: "city", glory: 0.4, actors: [F(0.45, "man", "raise", "white")] }),
      kf(18, { terrain: "field", glory: 0.6, props: [P("tree", 0.6), P("well", 0.3)], actors: [F(0.4, "man", "stand", "brown")] }),
      kf(27, { terrain: "mountain", storm: 0.6, fire: 0.6, glory: 0.5, props: [P("smoke", 0.5, 2)], actors: [F(0.45, "man", "bow", "white")] }),
    ],
    beats: [
      { upTo: 7, god: "Ai dos filhos rebeldes que descem ao Egito sem me consultar!", reaction: "Vã é a ajuda do Egito. 🐪" },
      { upTo: 17, god: "No voltar e no descanso está a vossa salvação; na tranquilidade, a força.", reaction: "Mas eles não quiseram." },
      { upTo: 26, god: "O SENHOR espera para ter misericórdia de vós.", reaction: "'Este é o caminho, andai por ele.' 🌾" },
      { upTo: 99, reaction: "O SENHOR desce com fogo e ira contra a Assíria. 🔥" },
    ],
  },
  31: {
    keyframes: [
      kf(1, { terrain: "plain", storm: 0.3, actors: [F(0.35, "warrior", "stand", "gray"), AN(0.68, "ox", 0.9)] }),
      kf(4, { terrain: "mountain", glory: 0.6, actors: [F(0.4, "man", "raise", "white"), AN(0.7, "lion", 1)] }),
      kf(8, { terrain: "hills", fire: 0.5, storm: 0.4, actors: [F(0.4, "warrior", "mourn", "gray")] }),
    ],
    beats: [
      { upTo: 3, god: "Ai dos que descem ao Egito por socorro e confiam em cavalos!", reaction: "Os egípcios são homens, não Deus. 🐎" },
      { upTo: 5, god: "Como o leão ruge sobre a presa, assim o SENHOR pelejará por Sião.", reaction: "Como aves, o SENHOR protege Jerusalém. 🦁" },
      { upTo: 99, god: "Convertei-vos àquele de quem vos afastastes profundamente.", reaction: "A Assíria cairá por espada não humana. ⚔️" },
    ],
  },
  32: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.6, props: [P("tower", 0.25)], actors: [F(0.45, "king", "stand", "white")] }),
      kf(9, { terrain: "field", night: 0.2, props: [P("tree", 0.5)], actors: [F(0.4, "woman", "mourn", "purple")] }),
      kf(15, { terrain: "garden", glory: 0.7, props: [P("tree", 0.4), P("palm", 0.7)], actors: [F(0.4, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 8, god: "Eis que reinará um rei com justiça, e será como refúgio contra o vento.", reaction: "O rei justo e os príncipes retos. 👑" },
      { upTo: 14, reaction: "Aviso às mulheres que vivem em falsa segurança." },
      { upTo: 99, god: "Até que se derrame sobre nós o Espírito do alto.", reaction: "O deserto vira pomar; a paz habita a terra. 🌿" },
    ],
  },
  33: {
    keyframes: [
      kf(1, { terrain: "city", storm: 0.5, actors: [F(0.4, "man", "mourn", "gray")] }),
      kf(2, { terrain: "city", glory: 0.6, actors: [F(0.45, "man", "kneel", "white")] }),
      kf(17, { terrain: "mountain", glory: 0.8, props: [P("tower", 0.5, 1.2)], actors: [F(0.4, "king", "stand", "gold")] }),
      kf(20, { terrain: "mountain", glory: 0.9, crowd: 0.6, props: [P("tower", 0.5, 1.3)], actors: [F(0.42, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 1, reaction: "Ai de ti, destruidor, que não foste destruído! ⚔️" },
      { upTo: 6, god: "SENHOR, tem misericórdia de nós; a ti esperamos.", reaction: "Sê o nosso braço cada manhã. 🙏" },
      { upTo: 19, god: "Os teus olhos verão o rei na sua formosura.", reaction: "Verão a terra que se estende para longe. 👑" },
      { upTo: 99, god: "O SENHOR é o nosso juiz, legislador e rei; ele nos salvará.", reaction: "Sião, cidade das nossas solenidades. ✨" },
    ],
  },
};
