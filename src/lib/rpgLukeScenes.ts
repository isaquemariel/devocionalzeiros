// ============================================================================
// Roteiros de cena (Living Scene v2) — LUCAS, capítulo por capítulo.
// O anúncio a Maria, o nascimento em Belém e os pastores, o batismo e a
// tentação, as parábolas exclusivas (o bom samaritano, o filho pródigo),
// Zaqueu na árvore, a Última Ceia, a cruz, o sepulcro vazio e a estrada de
// Emaús. Puramente visual/narrativo — não toca em progresso.
// Segue o padrão de Gênesis/Êxodo (rpgExodusScenes).
// ============================================================================

import type { ChapterScript, V2Actor, V2Prop, SceneState } from "@/lib/rpgLivingV2";

const F = (x: number, role: V2Actor["role"], action: V2Actor["action"], palette?: V2Actor["palette"], extra: Partial<V2Actor> = {}): V2Actor => ({ x, role, action, palette, ...extra });
const AN = (x: number, animal: NonNullable<V2Actor["animal"]>, scale = 1, color?: string): V2Actor => ({ x, kind: "animal", animal, scale, color });
const P = (kind: string, x: number, scale = 1, fire?: number): V2Prop => ({ kind, x, scale, ...(fire != null ? { fire } : {}) });
const kf = (v: number, state: SceneState) => ({ v, state });

export const LUKE_SCENES: Record<number, ChapterScript> = {
  1: {
    keyframes: [
      kf(1, { terrain: "city", props: [P("lampstand", 0.5, 1, 1), P("altar", 0.66, 0.9, 0.5)], actors: [F(0.4, "elder", "stand", "white")] }),
      kf(11, { terrain: "city", glory: 0.6, props: [P("altar", 0.6, 0.9, 0.6)], actors: [F(0.36, "elder", "bow", "white"), F(0.58, "angel", "raise", "white")] }),
      kf(26, { terrain: "plain", glory: 0.7, actors: [F(0.38, "woman", "kneel", "blue"), F(0.6, "angel", "raise", "white")] }),
      kf(39, { terrain: "hills", actors: [F(0.4, "woman", "raise", "blue"), F(0.6, "woman", "raise", "purple")] }),
      kf(57, { terrain: "city", glory: 0.3, actors: [F(0.4, "elder", "raise", "white"), F(0.6, "woman", "carry", "purple")] }),
    ],
    beats: [
      { upTo: 10, reaction: "Zacarias serve no templo, oferecendo incenso. 🕯️" },
      { upTo: 25, god: "Não temas, Zacarias! Tua oração foi ouvida.", reaction: "Um anjo anuncia o nascimento de João. 👼" },
      { upTo: 38, god: "Eis que conceberás e darás à luz um filho: Jesus.", reaction: "Gabriel anuncia a Maria. 'Faça-se em mim!' 🌟" },
      { upTo: 56, reaction: "Maria visita Isabel; o Magnificat brota do coração. 🎶" },
      { upTo: 99, reaction: "Nasce João; a língua de Zacarias se solta em louvor. ✨" },
    ],
  },
  2: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.7, actors: [F(0.4, "man", "walk", "white"), F(0.56, "woman", "walk", "blue")] }),
      kf(7, { terrain: "city", night: 0.6, props: [P("manger", 0.5, 1.1), P("star", 0.5, 0.8)], actors: [F(0.34, "man", "stand", "white"), F(0.5, "woman", "kneel", "blue"), F(0.66, "child", "lie", "white")] }),
      kf(8, { terrain: "field", night: 0.75, glory: 0.7, actors: [F(0.32, "shepherd", "bow", "brown"), F(0.5, "angel", "raise", "white"), AN(0.72, "sheep"), AN(0.86, "sheep")] }),
      kf(16, { terrain: "city", night: 0.5, props: [P("manger", 0.5, 1.1)], actors: [F(0.3, "shepherd", "kneel", "brown"), F(0.5, "woman", "kneel", "blue"), F(0.68, "child", "lie", "white")] }),
      kf(41, { terrain: "city", glory: 0.3, props: [P("lampstand", 0.7, 1, 1)], actors: [F(0.4, "elder", "raise", "white"), F(0.6, "child", "stand", "white")] }),
    ],
    beats: [
      { upTo: 6, reaction: "César decreta o recenseamento; José e Maria vão a Belém. 🚶" },
      { upTo: 7, reaction: "Nasce Jesus e é deitado numa manjedoura. 👶" },
      { upTo: 14, god: "Hoje vos nasceu o Salvador, que é Cristo, o Senhor!", reaction: "O anjo brilha aos pastores na noite. 🌟" },
      { upTo: 20, reaction: "Os pastores adoram o menino e glorificam a Deus. 🐑" },
      { upTo: 99, reaction: "Aos doze anos, Jesus ensina no templo. 📖" },
    ],
  },
  3: {
    keyframes: [
      kf(1, { terrain: "river", crowd: 0.6, actors: [F(0.4, "man", "raise", "brown")] }),
      kf(16, { terrain: "river", crowd: 0.5, actors: [F(0.36, "man", "raise", "brown"), F(0.58, "man", "kneel", "white")] }),
      kf(21, { terrain: "river", glory: 0.8, props: [P("dove", 0.5, 0.9)], actors: [F(0.5, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 15, reaction: "João Batista prega no deserto do Jordão. 💧" },
      { upTo: 20, god: undefined, reaction: "'Preparai o caminho do Senhor!' 🛤️" },
      { upTo: 99, god: "Tu és o meu Filho amado; em ti me comprazo.", reaction: "Jesus é batizado; o Espírito desce como pomba. 🕊️" },
    ],
  },
  4: {
    keyframes: [
      kf(1, { terrain: "desert", night: 0.2, actors: [F(0.4, "man", "stand", "white")] }),
      kf(5, { terrain: "mountain", darkness: 0.4, props: [P("tower", 0.7, 1.1)], actors: [F(0.36, "man", "raise", "white")] }),
      kf(16, { terrain: "city", crowd: 0.5, props: [P("lampstand", 0.7, 1, 1)], actors: [F(0.4, "man", "raise", "white")] }),
      kf(38, { terrain: "city", actors: [F(0.4, "man", "raise", "white"), F(0.62, "woman", "kneel", "sand")] }),
    ],
    beats: [
      { upTo: 4, god: "Nem só de pão viverá o homem, mas de toda palavra.", reaction: "Jesus é tentado no deserto. 🌵" },
      { upTo: 13, reaction: "Ele vence o tentador pela Palavra. ✨" },
      { upTo: 30, god: "Hoje se cumpriu esta Escritura aos vossos ouvidos.", reaction: "Em Nazaré, o povo se enfurece. 😠" },
      { upTo: 99, reaction: "Jesus cura e liberta em Cafarnaum. 🙌" },
    ],
  },
  5: {
    keyframes: [
      kf(1, { terrain: "sea", props: [P("boat", 0.5, 1.1)], actors: [F(0.38, "man", "raise", "white"), F(0.58, "man", "kneel", "brown")] }),
      kf(12, { terrain: "hills", actors: [F(0.4, "man", "raise", "white"), F(0.6, "man", "kneel", "sand")] }),
      kf(18, { terrain: "city", crowd: 0.6, actors: [F(0.4, "man", "raise", "white"), F(0.6, "man", "lie", "sand")] }),
      kf(27, { terrain: "city", actors: [F(0.4, "man", "walk", "white"), F(0.6, "man", "stand", "brown")] }),
    ],
    beats: [
      { upTo: 11, god: "Não temas; de agora em diante serás pescador de homens.", reaction: "A pesca milagrosa; Pedro deixa tudo. 🎣" },
      { upTo: 16, reaction: "Jesus cura um leproso e se retira a orar. 🙏" },
      { upTo: 26, reaction: "O paralítico desce pelo telhado e anda! 🛏️" },
      { upTo: 99, reaction: "Levi, o publicano, é chamado e o segue. 🤝" },
    ],
  },
  6: {
    keyframes: [
      kf(1, { terrain: "field", actors: [F(0.4, "man", "walk", "white"), F(0.6, "man", "stand", "brown")] }),
      kf(12, { terrain: "mountain", glory: 0.4, actors: [F(0.5, "man", "kneel", "white")] }),
      kf(17, { terrain: "plain", crowd: 0.8, actors: [F(0.4, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 11, reaction: "Jesus cura no sábado; o bem acima da lei. 🌾" },
      { upTo: 16, reaction: "Após orar toda a noite, escolhe os doze. 🌙" },
      { upTo: 49, god: "Amai os vossos inimigos e fazei o bem.", reaction: "O Sermão da Planície: bem-aventurados! 🤍" },
    ],
  },
  7: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.5, actors: [F(0.4, "man", "raise", "white"), F(0.62, "warrior", "stand", "red")] }),
      kf(11, { terrain: "city", crowd: 0.6, actors: [F(0.38, "man", "raise", "white"), F(0.58, "woman", "mourn", "gray"), F(0.72, "man", "lie", "sand")] }),
      kf(36, { terrain: "city", props: [P("lampstand", 0.72, 0.9, 1)], actors: [F(0.4, "man", "stand", "white"), F(0.6, "woman", "kneel", "purple")] }),
    ],
    beats: [
      { upTo: 10, god: "Nem mesmo em Israel achei tamanha fé.", reaction: "Jesus cura o servo do centurião. 🙌" },
      { upTo: 17, reaction: "Em Naim, ressuscita o filho da viúva. 💫" },
      { upTo: 99, reaction: "A pecadora unge os pés de Jesus com lágrimas. 💧" },
    ],
  },
  8: {
    keyframes: [
      kf(1, { terrain: "field", crowd: 0.6, actors: [F(0.4, "man", "raise", "white")] }),
      kf(22, { terrain: "sea", storm: 0.8, rain: 0.5, props: [P("boat", 0.5, 1.1)], actors: [F(0.5, "man", "raise", "white")] }),
      kf(26, { terrain: "hills", darkness: 0.5, actors: [F(0.4, "man", "raise", "white"), F(0.62, "man", "kneel", "gray")] }),
      kf(43, { terrain: "city", crowd: 0.7, actors: [F(0.4, "man", "stand", "white"), F(0.6, "woman", "kneel", "sand")] }),
    ],
    beats: [
      { upTo: 18, god: "A semente é a palavra de Deus.", reaction: "A parábola do semeador. 🌱" },
      { upTo: 25, god: "Onde está a vossa fé?", reaction: "Jesus acalma a tempestade! 🌊" },
      { upTo: 39, reaction: "Ele liberta o endemoninhado gadareno. ⛓️" },
      { upTo: 99, reaction: "Cura a hemorroíssa e ressuscita a filha de Jairo. 💫" },
    ],
  },
  9: {
    keyframes: [
      kf(1, { terrain: "plain", crowd: 0.8, props: [P("basket", 0.4), P("basket", 0.6)], actors: [F(0.5, "man", "raise", "white")] }),
      kf(18, { terrain: "hills", actors: [F(0.4, "man", "stand", "white"), F(0.6, "man", "kneel", "brown")] }),
      kf(28, { terrain: "mountain", glory: 0.9, actors: [F(0.5, "man", "raise", "white"), F(0.32, "man", "stand", "sand"), F(0.68, "man", "stand", "sand")] }),
      kf(37, { terrain: "hills", crowd: 0.5, actors: [F(0.4, "man", "raise", "white"), F(0.62, "child", "kneel", "sand")] }),
    ],
    beats: [
      { upTo: 17, god: "Dai-lhes vós de comer.", reaction: "Jesus alimenta cinco mil. 🍞🐟" },
      { upTo: 27, god: "Tu és o Cristo de Deus.", reaction: "A confissão de Pedro. ✨" },
      { upTo: 36, god: "Este é o meu Filho amado; a ele ouvi!", reaction: "A transfiguração no monte. 🌟" },
      { upTo: 99, reaction: "'Quem quiser seguir-me, tome a sua cruz.' 🚶" },
    ],
  },
  10: {
    keyframes: [
      kf(1, { terrain: "hills", crowd: 0.6, actors: [F(0.4, "man", "raise", "white")] }),
      kf(25, { terrain: "city", actors: [F(0.4, "man", "stand", "white"), F(0.62, "elder", "stand", "purple")] }),
      kf(30, { terrain: "desert", night: 0.2, actors: [F(0.3, "man", "lie", "sand"), F(0.55, "man", "kneel", "brown")] }),
      kf(38, { terrain: "city", props: [P("well", 0.7)], actors: [F(0.4, "man", "raise", "white"), F(0.6, "woman", "kneel", "green")] }),
    ],
    beats: [
      { upTo: 24, reaction: "Os setenta voltam com alegria da missão. 🌾" },
      { upTo: 29, god: "Ama o teu próximo como a ti mesmo.", reaction: "'E quem é o meu próximo?' 🤔" },
      { upTo: 37, god: "Vai e faze da mesma maneira.", reaction: "A parábola do bom samaritano. 🤍" },
      { upTo: 99, reaction: "Marta se afadiga; Maria escolhe a boa parte. 🌸" },
    ],
  },
  11: {
    keyframes: [
      kf(1, { terrain: "hills", actors: [F(0.42, "man", "kneel", "white"), F(0.62, "man", "kneel", "brown")] }),
      kf(14, { terrain: "city", crowd: 0.5, actors: [F(0.4, "man", "raise", "white"), F(0.62, "man", "stand", "sand")] }),
      kf(37, { terrain: "city", props: [P("lampstand", 0.7, 0.9, 1)], actors: [F(0.4, "man", "stand", "white"), F(0.6, "elder", "stand", "purple")] }),
    ],
    beats: [
      { upTo: 13, god: "Pai nosso, que estás nos céus, santificado seja o teu nome.", reaction: "Jesus ensina a orar. 🙏" },
      { upTo: 28, reaction: "Ele expulsa um demônio e confronta os acusadores. ✨" },
      { upTo: 99, reaction: "Ai dos fariseus hipócritas! Advertência severa. ⚠️" },
    ],
  },
  12: {
    keyframes: [
      kf(1, { terrain: "plain", crowd: 0.9, actors: [F(0.5, "man", "raise", "white")] }),
      kf(16, { terrain: "field", props: [P("tower", 0.68, 1.1)], actors: [F(0.4, "man", "stand", "gold")] }),
      kf(22, { terrain: "field", actors: [F(0.4, "man", "raise", "white"), AN(0.7, "sheep")] }),
    ],
    beats: [
      { upTo: 12, reaction: "Nada há encoberto que não venha a ser revelado. 👁️" },
      { upTo: 21, god: "Louco! Esta noite te pedirão a tua alma.", reaction: "A parábola do rico insensato. 🌾" },
      { upTo: 99, reaction: "Não andeis ansiosos: buscai primeiro o Reino. 🌸" },
    ],
  },
  13: {
    keyframes: [
      kf(1, { terrain: "field", props: [P("tree", 0.6, 1.2)], actors: [F(0.4, "man", "raise", "white")] }),
      kf(10, { terrain: "city", crowd: 0.5, actors: [F(0.4, "man", "raise", "white"), F(0.62, "woman", "raise", "gray")] }),
      kf(31, { terrain: "hills", actors: [F(0.42, "man", "mourn", "white")] }),
    ],
    beats: [
      { upTo: 9, reaction: "A figueira estéril ganha mais um ano. 🌳" },
      { upTo: 21, reaction: "Cura a mulher encurvada no sábado. 🙌" },
      { upTo: 99, god: "Jerusalém, quantas vezes quis reunir os teus filhos!", reaction: "O lamento sobre a cidade. 😢" },
    ],
  },
  14: {
    keyframes: [
      kf(1, { terrain: "city", actors: [F(0.4, "man", "raise", "white"), F(0.62, "man", "lie", "sand")] }),
      kf(15, { terrain: "city", crowd: 0.6, props: [P("tent", 0.72, 1.2)], actors: [F(0.4, "man", "raise", "white")] }),
      kf(25, { terrain: "hills", crowd: 0.5, actors: [F(0.42, "man", "stand", "white")] }),
    ],
    beats: [
      { upTo: 14, god: "Todo o que se exalta será humilhado.", reaction: "Cura no sábado; lição de humildade. 🍞" },
      { upTo: 24, god: "Sai pelos caminhos e obriga-os a entrar.", reaction: "A parábola da grande ceia. 🍷" },
      { upTo: 99, reaction: "Calcular o custo de seguir a Cristo. 🧮" },
    ],
  },
  15: {
    keyframes: [
      kf(1, { terrain: "field", crowd: 0.4, actors: [F(0.4, "man", "raise", "white"), AN(0.66, "sheep"), AN(0.8, "sheep")] }),
      kf(11, { terrain: "field", night: 0.3, actors: [F(0.42, "man", "mourn", "sand")] }),
      kf(17, { terrain: "field", actors: [F(0.4, "man", "kneel", "sand"), AN(0.66, "goat", 0.8)] }),
      kf(20, { terrain: "city", glory: 0.6, actors: [F(0.36, "elder", "raise", "purple"), F(0.56, "man", "kneel", "sand")] }),
    ],
    beats: [
      { upTo: 10, reaction: "A ovelha perdida e a moeda achada. 🐑" },
      { upTo: 16, reaction: "O filho mais novo desperdiça tudo em terra distante. 😔" },
      { upTo: 19, reaction: "Faminto, ele resolve voltar ao pai. 🌾" },
      { upTo: 99, god: "Este meu filho estava morto e reviveu!", reaction: "O pai corre e o abraça — festa! 🎉" },
    ],
  },
  16: {
    keyframes: [
      kf(1, { terrain: "city", actors: [F(0.4, "man", "raise", "white"), F(0.62, "servant", "stand", "sand")] }),
      kf(19, { terrain: "city", actors: [F(0.34, "king", "stand", "purple"), F(0.6, "man", "lie", "gray")] }),
      kf(22, { terrain: "city", darkness: 0.5, glory: 0.4, actors: [F(0.36, "man", "mourn", "purple"), F(0.62, "elder", "raise", "white")] }),
    ],
    beats: [
      { upTo: 13, god: "Não podeis servir a Deus e às riquezas.", reaction: "O administrador infiel. 💰" },
      { upTo: 18, reaction: "A fidelidade no pouco e no muito. ⚖️" },
      { upTo: 99, reaction: "O rico e Lázaro: um grande abismo. 🔥" },
    ],
  },
  17: {
    keyframes: [
      kf(1, { terrain: "hills", actors: [F(0.4, "man", "raise", "white"), F(0.62, "man", "kneel", "brown")] }),
      kf(11, { terrain: "plain", actors: [F(0.4, "man", "raise", "white"), F(0.6, "man", "bow", "sand"), F(0.74, "man", "stand", "sand")] }),
      kf(20, { terrain: "field", darkness: 0.3, actors: [F(0.42, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 10, god: "Se tiverdes fé como um grão de mostarda...", reaction: "Perdão e fé. 🌱" },
      { upTo: 19, god: "Levanta-te e vai; a tua fé te salvou.", reaction: "Dez leprosos curados, só um agradece. 🙏" },
      { upTo: 99, reaction: "O dia do Filho do Homem virá como relâmpago. ⚡" },
    ],
  },
  18: {
    keyframes: [
      kf(1, { terrain: "city", actors: [F(0.4, "man", "raise", "white"), F(0.62, "woman", "kneel", "gray")] }),
      kf(9, { terrain: "city", props: [P("lampstand", 0.72, 0.9, 1)], actors: [F(0.4, "man", "bow", "sand"), F(0.62, "elder", "stand", "purple")] }),
      kf(15, { terrain: "hills", crowd: 0.4, actors: [F(0.4, "man", "kneel", "white"), F(0.62, "child", "stand", "sand")] }),
      kf(35, { terrain: "city", crowd: 0.5, actors: [F(0.4, "man", "raise", "white"), F(0.62, "man", "kneel", "gray")] }),
    ],
    beats: [
      { upTo: 8, reaction: "A viúva persistente e o juiz injusto. ⚖️" },
      { upTo: 14, god: "Todo o que se humilha será exaltado.", reaction: "O fariseu e o publicano oram. 🙏" },
      { upTo: 30, god: "Deixai vir a mim os pequeninos.", reaction: "As crianças e o jovem rico. 👶" },
      { upTo: 99, reaction: "O cego de Jericó recobra a vista. 👁️" },
    ],
  },
  19: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.6, props: [P("tree", 0.66, 1.3)], actors: [F(0.4, "man", "raise", "white"), F(0.68, "man", "stand", "gold", { scale: 0.8 })] }),
      kf(11, { terrain: "city", actors: [F(0.4, "man", "raise", "white"), F(0.62, "servant", "stand", "sand")] }),
      kf(28, { terrain: "city", crowd: 0.8, actors: [F(0.5, "man", "raise", "white")] }),
      kf(41, { terrain: "mountain", glory: 0.3, actors: [F(0.42, "man", "mourn", "white")] }),
    ],
    beats: [
      { upTo: 10, god: "Hoje veio a salvação a esta casa.", reaction: "Zaqueu desce da árvore para receber Jesus. 🌳" },
      { upTo: 27, reaction: "A parábola das dez minas. 💰" },
      { upTo: 40, reaction: "Entrada triunfal em Jerusalém: 'Hosana!' 🌿" },
      { upTo: 99, reaction: "Jesus chora sobre a cidade e purifica o templo. 😢" },
    ],
  },
  20: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.5, props: [P("lampstand", 0.72, 0.9, 1)], actors: [F(0.4, "man", "raise", "white"), F(0.62, "elder", "stand", "purple")] }),
      kf(9, { terrain: "field", props: [P("tower", 0.7, 1.1)], actors: [F(0.4, "man", "raise", "white")] }),
      kf(20, { terrain: "city", actors: [F(0.4, "man", "stand", "white"), F(0.62, "elder", "stand", "gray")] }),
    ],
    beats: [
      { upTo: 8, reaction: "Questionam a autoridade de Jesus. 🤨" },
      { upTo: 19, god: "A pedra que os construtores rejeitaram...", reaction: "A parábola dos lavradores maus. 🍇" },
      { upTo: 99, god: "Dai a César o que é de César, e a Deus o que é de Deus.", reaction: "Ele silencia os que o testam. ⚖️" },
    ],
  },
  21: {
    keyframes: [
      kf(1, { terrain: "city", props: [P("basket", 0.6, 0.7)], actors: [F(0.4, "man", "stand", "white"), F(0.62, "woman", "kneel", "gray")] }),
      kf(5, { terrain: "city", props: [P("tower", 0.7, 1.2)], actors: [F(0.4, "man", "raise", "white")] }),
      kf(25, { terrain: "mountain", darkness: 0.6, storm: 0.5, glory: 0.4, actors: [F(0.42, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 4, god: "Esta viúva pobre deu mais do que todos.", reaction: "A oferta da viúva. 🪙" },
      { upTo: 24, reaction: "Sinais do fim e a queda de Jerusalém. ⚠️" },
      { upTo: 99, god: "O céu e a terra passarão, mas as minhas palavras não.", reaction: "A vinda do Filho do Homem. 🌟" },
    ],
  },
  22: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.5, actors: [F(0.4, "man", "stand", "gray"), F(0.62, "elder", "stand", "purple")] }),
      kf(14, { terrain: "city", night: 0.6, props: [P("lampstand", 0.7, 0.9, 1)], actors: [F(0.5, "man", "raise", "white")] }),
      kf(39, { terrain: "garden", night: 0.8, glory: 0.3, actors: [F(0.5, "man", "kneel", "white")] }),
      kf(47, { terrain: "garden", night: 0.85, actors: [F(0.4, "man", "stand", "white"), F(0.6, "man", "stand", "gray"), F(0.76, "warrior", "stand", "red")] }),
      kf(54, { terrain: "city", night: 0.9, props: [P("altar", 0.7, 0.7, 0.4)], actors: [F(0.4, "man", "mourn", "brown")] }),
    ],
    beats: [
      { upTo: 13, reaction: "Judas trai; preparam a Páscoa. 🌙" },
      { upTo: 23, god: "Isto é o meu corpo, que por vós é dado.", reaction: "A Última Ceia: o pão e o cálice. 🍷" },
      { upTo: 46, god: "Pai, não se faça a minha vontade, mas a tua.", reaction: "Agonia no Getsêmani. 😢" },
      { upTo: 53, reaction: "Judas o entrega com um beijo; Jesus é preso. 🔦" },
      { upTo: 99, reaction: "Pedro nega três vezes; o galo canta. 🐓" },
    ],
  },
  23: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.7, actors: [F(0.4, "man", "stand", "white"), F(0.66, "king", "stand", "purple")] }),
      kf(26, { terrain: "city", crowd: 0.8, props: [P("cross", 0.6, 1.2)], actors: [F(0.36, "man", "carry", "white"), F(0.6, "man", "walk", "brown")] }),
      kf(33, { terrain: "mountain", darkness: 0.85, props: [P("cross", 0.5, 1.4), P("cross", 0.3, 1), P("cross", 0.7, 1)], actors: [F(0.5, "man", "raise", "white"), F(0.66, "woman", "mourn", "blue")] }),
      kf(50, { terrain: "mountain", night: 0.6, props: [P("tomb", 0.6, 1.2)], actors: [F(0.4, "elder", "carry", "gray"), F(0.62, "woman", "mourn", "blue")] }),
    ],
    beats: [
      { upTo: 25, reaction: "Diante de Pilatos e Herodes; a multidão grita. 😔" },
      { upTo: 32, reaction: "Simão carrega a cruz até o Calvário. ✝️" },
      { upTo: 49, god: "Pai, perdoa-lhes, não sabem o que fazem.", reaction: "A crucificação; as trevas cobrem a terra. 🌑" },
      { upTo: 99, reaction: "José de Arimateia sepulta o corpo de Jesus. 🪦" },
    ],
  },
  24: {
    keyframes: [
      kf(1, { terrain: "mountain", glory: 0.7, props: [P("tomb", 0.6, 1.2)], actors: [F(0.36, "woman", "raise", "blue"), F(0.58, "angel", "raise", "white")] }),
      kf(13, { terrain: "hills", night: 0.2, actors: [F(0.36, "man", "walk", "brown"), F(0.52, "man", "walk", "sand"), F(0.7, "man", "walk", "white")] }),
      kf(30, { terrain: "city", glory: 0.5, props: [P("lampstand", 0.72, 0.9, 1)], actors: [F(0.4, "man", "raise", "white"), F(0.6, "man", "kneel", "brown")] }),
      kf(36, { terrain: "city", glory: 0.6, actors: [F(0.5, "man", "raise", "white"), F(0.32, "man", "bow", "brown"), F(0.68, "man", "bow", "sand")] }),
      kf(50, { terrain: "mountain", glory: 0.95, actors: [F(0.5, "man", "raise", "white"), F(0.34, "man", "bow", "brown"), F(0.68, "man", "raise", "sand")] }),
    ],
    beats: [
      { upTo: 12, god: "Por que buscais entre os mortos o que vive?", reaction: "O sepulcro está vazio! Ele ressuscitou! ✨" },
      { upTo: 27, reaction: "Dois discípulos caminham para Emaús com o Ressurreto. 🚶" },
      { upTo: 35, reaction: "No partir do pão, os olhos se abrem — é Ele! 🍞" },
      { upTo: 49, god: "Paz seja convosco.", reaction: "Jesus aparece aos discípulos. 🤍" },
      { upTo: 99, reaction: "Ele os abençoa e sobe ao céu. Grande alegria! 🌟" },
    ],
  },
};
