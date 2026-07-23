// ============================================================================
// Roteiros de cena (Living Scene v2) — MATEUS, capítulo por capítulo.
// A genealogia e o nascimento de Jesus, a estrela e os magos, João Batista e
// o batismo, a tentação no deserto, o Sermão do Monte, milagres e parábolas,
// a entrada triunfal, a Última Ceia, o Getsêmani, a crucificação, a
// ressurreição e a Grande Comissão. Puramente visual/narrativo — não toca em
// progresso. Segue o padrão de Êxodo (rpgExodusScenes).
// ============================================================================

import type { ChapterScript, V2Actor, V2Prop, SceneState } from "@/lib/rpgLivingV2";

const F = (x: number, role: V2Actor["role"], action: V2Actor["action"], palette?: V2Actor["palette"], extra: Partial<V2Actor> = {}): V2Actor => ({ x, role, action, palette, ...extra });
const AN = (x: number, animal: NonNullable<V2Actor["animal"]>, scale = 1, color?: string): V2Actor => ({ x, kind: "animal", animal, scale, color });
const P = (kind: string, x: number, scale = 1, fire?: number): V2Prop => ({ kind, x, scale, ...(fire != null ? { fire } : {}) });
const kf = (v: number, state: SceneState) => ({ v, state });

export const MATTHEW_SCENES: Record<number, ChapterScript> = {
  1: {
    keyframes: [
      kf(1, { terrain: "city", props: [P("tower", 0.16, 1.1), P("tower", 0.84, 0.9)], actors: [F(0.3, "elder", "stand", "gray"), F(0.5, "king", "stand", "gold"), F(0.7, "man", "stand", "brown")] }),
      kf(18, { terrain: "city", night: 0.4, props: [P("tent", 0.72)], actors: [F(0.4, "man", "stand", "brown"), F(0.6, "woman", "stand", "blue")] }),
      kf(20, { terrain: "city", night: 0.5, glory: 0.4, actors: [F(0.4, "man", "kneel", "brown"), F(0.62, "angel", "raise", "white")] }),
      kf(24, { terrain: "city", night: 0.35, props: [P("manger", 0.6)], actors: [F(0.42, "man", "stand", "brown"), F(0.58, "woman", "kneel", "blue")] }),
    ],
    beats: [
      { upTo: 17, reaction: "A genealogia de Jesus: de Abraão a Davi, até o Cristo. 📜" },
      { upTo: 19, reaction: "Maria está grávida pelo Espírito Santo; José pondera. 🤍" },
      { upTo: 23, god: "Ela dará à luz um filho, e o chamarás Jesus: Deus conosco.", reaction: "Um anjo fala a José em sonho. 👼" },
      { upTo: 99, reaction: "José recebe Maria — nasce o Emanuel. ✨" },
    ],
  },
  2: {
    keyframes: [
      kf(1, { terrain: "desert", night: 0.7, props: [P("star", 0.5, 1.4)], actors: [F(0.3, "elder", "walk", "purple"), F(0.46, "elder", "walk", "red"), AN(0.7, "camel", 1.1), AN(0.85, "camel", 0.95)] }),
      kf(3, { terrain: "city", night: 0.4, props: [P("tower", 0.18, 1.2)], actors: [F(0.5, "king", "stand", "gold")] }),
      kf(9, { terrain: "city", night: 0.75, props: [P("star", 0.55, 1.5), P("manger", 0.42)], actors: [F(0.28, "elder", "bow", "purple"), F(0.62, "woman", "kneel", "blue"), F(0.72, "child", "stand", "white")] }),
      kf(13, { terrain: "desert", night: 0.5, actors: [F(0.34, "man", "walk", "brown"), F(0.5, "woman", "carry", "blue"), AN(0.72, "camel", 0.9)] }),
    ],
    beats: [
      { upTo: 2, reaction: "Magos do Oriente seguem uma estrela até Jerusalém. 🌟" },
      { upTo: 8, reaction: "Herodes se perturba e indaga onde nasceria o Cristo. 👑" },
      { upTo: 12, reaction: "Os magos adoram o menino e ofertam ouro, incenso e mirra. 🎁" },
      { upTo: 99, god: "Levanta-te, toma o menino e foge para o Egito.", reaction: "A fuga para o Egito escapa da fúria de Herodes. 🐪" },
    ],
  },
  3: {
    keyframes: [
      kf(1, { terrain: "river", props: [P("reeds", 0.2), P("reeds", 0.82)], actors: [F(0.4, "man", "raise", "brown"), F(0.66, "man", "stand", "sand")] }),
      kf(5, { terrain: "river", crowd: 0.6, props: [P("reeds", 0.85)], actors: [F(0.35, "man", "raise", "brown"), F(0.6, "man", "kneel", "sand")] }),
      kf(13, { terrain: "river", props: [P("reeds", 0.18)], actors: [F(0.42, "man", "stand", "white"), F(0.62, "man", "raise", "brown")] }),
      kf(16, { terrain: "river", glory: 0.7, props: [P("dove", 0.5, 1.1)], actors: [F(0.46, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 6, reaction: "João Batista prega no deserto: 'Arrependei-vos!' 🐫" },
      { upTo: 12, reaction: "Ele batiza no Jordão e anuncia Aquele que há de vir. 💧" },
      { upTo: 15, reaction: "Jesus vem a João para ser batizado. 🤍" },
      { upTo: 99, god: "Este é o meu Filho amado, em quem me comprazo.", reaction: "O Espírito desce como pomba e a voz vem do céu. 🕊️✨" },
    ],
  },
  4: {
    keyframes: [
      kf(1, { terrain: "desert", actors: [F(0.45, "man", "stand", "white")] }),
      kf(5, { terrain: "city", night: 0.3, props: [P("tower", 0.62, 1.3)], actors: [F(0.4, "man", "stand", "white")] }),
      kf(8, { terrain: "mountain", night: 0.4, actors: [F(0.42, "man", "raise", "white")] }),
      kf(18, { terrain: "sea", props: [P("boat", 0.66, 1.1)], actors: [F(0.32, "man", "walk", "white"), F(0.55, "man", "stand", "brown"), F(0.72, "man", "stand", "sand")] }),
    ],
    beats: [
      { upTo: 4, reaction: "Jesus jejua quarenta dias e é tentado no deserto. 🏜️" },
      { upTo: 7, god: "Nem só de pão viverá o homem, mas de toda palavra de Deus.", reaction: "Ele responde às tentações com a Escritura. 📖" },
      { upTo: 11, reaction: "'Ao Senhor teu Deus adorarás.' Os anjos o servem. 👼" },
      { upTo: 99, god: "Vinde após mim, e vos farei pescadores de homens.", reaction: "Jesus chama os primeiros discípulos junto ao mar. 🎣" },
    ],
  },
  5: {
    keyframes: [
      kf(1, { terrain: "mountain", crowd: 0.7, actors: [F(0.45, "man", "raise", "white")] }),
      kf(13, { terrain: "mountain", crowd: 0.6, actors: [F(0.44, "man", "stand", "white"), F(0.66, "man", "stand", "brown")] }),
      kf(21, { terrain: "mountain", crowd: 0.5, actors: [F(0.46, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 12, god: "Bem-aventurados os humildes de espírito: deles é o reino dos céus.", reaction: "As Bem-aventuranças abrem o Sermão do Monte. ⛰️" },
      { upTo: 20, god: "Vós sois a luz do mundo. Brilhe a vossa luz.", reaction: "Sal da terra e luz do mundo. 🌟" },
      { upTo: 99, god: "Amai os vossos inimigos e orai pelos que vos perseguem.", reaction: "A justiça do reino supera a da letra. 🤍" },
    ],
  },
  6: {
    keyframes: [
      kf(1, { terrain: "mountain", crowd: 0.5, actors: [F(0.45, "man", "raise", "white")] }),
      kf(9, { terrain: "mountain", glory: 0.4, actors: [F(0.46, "man", "raise", "white")] }),
      kf(25, { terrain: "field", actors: [F(0.4, "man", "stand", "white"), F(0.66, "man", "stand", "brown")] }),
    ],
    beats: [
      { upTo: 8, god: "Quando orardes, entrai no vosso quarto e orai em secreto.", reaction: "Jesus ensina a esmola e a oração sinceras. 🙏" },
      { upTo: 15, god: "Pai nosso que estás nos céus, santificado seja o teu nome.", reaction: "O Pai-Nosso, modelo de oração. ✨" },
      { upTo: 99, god: "Buscai primeiro o reino de Deus, e tudo mais vos será dado.", reaction: "Não andeis ansiosos: olhai as aves e os lírios. 🕊️🌿" },
    ],
  },
  7: {
    keyframes: [
      kf(1, { terrain: "mountain", crowd: 0.6, actors: [F(0.45, "man", "raise", "white")] }),
      kf(13, { terrain: "mountain", actors: [F(0.44, "man", "stand", "white")] }),
      kf(24, { terrain: "hills", actors: [F(0.42, "man", "raise", "white"), F(0.68, "man", "stand", "brown")] }),
    ],
    beats: [
      { upTo: 12, god: "Tudo quanto quereis que os homens vos façam, fazei-o também a eles.", reaction: "Não julgueis; a Regra de Ouro. ⚖️" },
      { upTo: 23, god: "Entrai pela porta estreita que conduz à vida.", reaction: "A porta estreita e os falsos profetas. 🚪" },
      { upTo: 99, god: "Quem ouve estas palavras e as pratica é o que edifica sobre a rocha.", reaction: "As multidões se admiram da sua autoridade. 🏠" },
    ],
  },
  8: {
    keyframes: [
      kf(1, { terrain: "hills", crowd: 0.5, actors: [F(0.4, "man", "raise", "white"), F(0.62, "man", "kneel", "brown")] }),
      kf(14, { terrain: "city", actors: [F(0.4, "man", "raise", "white"), F(0.6, "woman", "lie", "sand")] }),
      kf(23, { terrain: "sea", storm: 0.8, props: [P("boat", 0.5, 1.2)], actors: [F(0.44, "man", "stand", "white"), F(0.6, "man", "mourn", "brown")] }),
      kf(28, { terrain: "sea", night: 0.4, actors: [F(0.36, "man", "raise", "white"), F(0.64, "man", "mourn", "gray")] }),
    ],
    beats: [
      { upTo: 4, reaction: "Jesus estende a mão e cura um leproso. 🤍" },
      { upTo: 13, god: "Vai, e conforme creste te seja feito.", reaction: "A fé do centurião admira a Jesus. 🙌" },
      { upTo: 27, god: "Por que temeis, homens de pequena fé?", reaction: "Ele acalma a tempestade no mar. 🌊" },
      { upTo: 99, reaction: "Ele liberta os endemoninhados de Gadara. ⛓️" },
    ],
  },
  9: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.5, actors: [F(0.4, "man", "raise", "white"), F(0.62, "man", "lie", "sand")] }),
      kf(9, { terrain: "city", actors: [F(0.38, "man", "raise", "white"), F(0.6, "man", "stand", "brown")] }),
      kf(18, { terrain: "city", crowd: 0.6, actors: [F(0.4, "man", "raise", "white"), F(0.62, "woman", "kneel", "sand")] }),
      kf(35, { terrain: "field", crowd: 0.7, actors: [F(0.42, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 8, god: "Tem bom ânimo, filho, perdoados são os teus pecados.", reaction: "Jesus perdoa e cura o paralítico. 🛏️" },
      { upTo: 17, reaction: "Ele chama Mateus, o publicano, e come com pecadores. 🍞" },
      { upTo: 34, reaction: "A mulher toca-lhe a orla; a menina é ressuscitada. ✨" },
      { upTo: 99, god: "A seara é grande, mas os trabalhadores são poucos.", reaction: "Ele se compadece das multidões cansadas. 🌾" },
    ],
  },
  10: {
    keyframes: [
      kf(1, { terrain: "hills", crowd: 0.4, actors: [F(0.35, "man", "raise", "white"), F(0.55, "man", "stand", "brown"), F(0.72, "man", "stand", "sand")] }),
      kf(16, { terrain: "field", actors: [F(0.4, "man", "raise", "white"), F(0.64, "man", "walk", "brown")] }),
      kf(32, { terrain: "hills", glory: 0.3, actors: [F(0.44, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 15, god: "Ide, pregai: é chegado o reino dos céus. De graça recebestes, de graça dai.", reaction: "Jesus envia os doze apóstolos. ✝️" },
      { upTo: 31, god: "Eis que vos envio como ovelhas ao meio de lobos.", reaction: "Ele os prepara para a perseguição. 🐺" },
      { upTo: 99, god: "Quem vos recebe, a mim me recebe.", reaction: "Nem um copo de água fria fica sem recompensa. 💧" },
    ],
  },
  11: {
    keyframes: [
      kf(1, { terrain: "city", actors: [F(0.4, "man", "stand", "white"), F(0.62, "man", "stand", "sand")] }),
      kf(7, { terrain: "desert", actors: [F(0.44, "man", "raise", "white")] }),
      kf(28, { terrain: "hills", glory: 0.4, crowd: 0.4, actors: [F(0.45, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 6, reaction: "João, na prisão, pergunta: 'És tu Aquele que havia de vir?' 🕊️" },
      { upTo: 24, reaction: "Jesus exalta João e adverte as cidades impenitentes. ⚠️" },
      { upTo: 99, god: "Vinde a mim, todos os cansados, e eu vos aliviarei.", reaction: "O jugo suave do Senhor. 🤍" },
    ],
  },
  12: {
    keyframes: [
      kf(1, { terrain: "field", actors: [F(0.38, "man", "walk", "white"), F(0.6, "man", "stand", "brown")] }),
      kf(9, { terrain: "city", crowd: 0.4, actors: [F(0.4, "man", "raise", "white"), F(0.62, "man", "stand", "sand")] }),
      kf(22, { terrain: "city", crowd: 0.5, actors: [F(0.4, "man", "raise", "white"), F(0.62, "man", "kneel", "gray")] }),
      kf(46, { terrain: "city", actors: [F(0.42, "man", "raise", "white"), F(0.66, "woman", "stand", "blue")] }),
    ],
    beats: [
      { upTo: 8, god: "O Filho do Homem é senhor do sábado.", reaction: "Colhem espigas no sábado; a lei da misericórdia. 🌾" },
      { upTo: 21, reaction: "Ele cura a mão ressequida e o servo escolhido. 🤍" },
      { upTo: 45, reaction: "Confronta os fariseus sobre o reino dividido. 🗣️" },
      { upTo: 99, god: "Quem faz a vontade de meu Pai, esse é meu irmão e irmã e mãe.", reaction: "A verdadeira família de Jesus. 🤝" },
    ],
  },
  13: {
    keyframes: [
      kf(1, { terrain: "sea", crowd: 0.7, props: [P("boat", 0.4, 1.1)], actors: [F(0.42, "man", "raise", "white")] }),
      kf(24, { terrain: "field", actors: [F(0.35, "man", "raise", "white"), F(0.62, "man", "carry", "brown")] }),
      kf(31, { terrain: "field", props: [P("tree", 0.66, 1.1)], actors: [F(0.4, "man", "raise", "white")] }),
      kf(44, { terrain: "field", actors: [F(0.4, "man", "kneel", "brown")] }),
    ],
    beats: [
      { upTo: 23, god: "Saiu o semeador a semear.", reaction: "A parábola do semeador e dos solos. 🌱" },
      { upTo: 30, reaction: "O joio e o trigo crescem juntos até a ceifa. 🌾" },
      { upTo: 43, reaction: "O grão de mostarda e o fermento: o reino cresce. 🌳" },
      { upTo: 99, reaction: "O tesouro escondido e a pérola de grande valor. 💎" },
    ],
  },
  14: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.4, props: [P("tower", 0.7, 1.2)], actors: [F(0.5, "king", "stand", "gold"), F(0.7, "man", "mourn", "sand")] }),
      kf(15, { terrain: "field", crowd: 0.8, actors: [F(0.4, "man", "raise", "white"), F(0.62, "man", "carry", "brown")] }),
      kf(22, { terrain: "sea", night: 0.6, storm: 0.5, props: [P("boat", 0.62, 1.1)], actors: [F(0.34, "man", "walk", "white"), F(0.5, "man", "raise", "brown")] }),
    ],
    beats: [
      { upTo: 12, reaction: "Herodes manda decapitar João Batista. 😢" },
      { upTo: 21, god: undefined, reaction: "Cinco pães e dois peixes saciam cinco mil. 🍞🐟" },
      { upTo: 99, god: "Tem bom ânimo, sou eu; não temas.", reaction: "Jesus anda sobre as águas e ampara Pedro. 🌊" },
    ],
  },
  15: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.4, actors: [F(0.4, "man", "raise", "white"), F(0.64, "elder", "stand", "gray")] }),
      kf(21, { terrain: "hills", actors: [F(0.4, "man", "raise", "white"), F(0.62, "woman", "kneel", "sand")] }),
      kf(32, { terrain: "hills", crowd: 0.7, actors: [F(0.42, "man", "raise", "white"), F(0.66, "man", "carry", "brown")] }),
    ],
    beats: [
      { upTo: 20, god: "O que sai da boca, do coração procede, e isto contamina o homem.", reaction: "Jesus expõe a tradição vazia dos fariseus. 🗣️" },
      { upTo: 28, god: "Ó mulher, grande é a tua fé!", reaction: "A fé persistente da cananeia. 🤍" },
      { upTo: 99, reaction: "Sete pães alimentam quatro mil. 🍞" },
    ],
  },
  16: {
    keyframes: [
      kf(1, { terrain: "sea", actors: [F(0.4, "man", "stand", "white"), F(0.64, "elder", "stand", "gray")] }),
      kf(13, { terrain: "hills", actors: [F(0.4, "man", "raise", "white"), F(0.62, "man", "kneel", "brown")] }),
      kf(21, { terrain: "hills", night: 0.3, actors: [F(0.42, "man", "stand", "white"), F(0.66, "man", "mourn", "brown")] }),
    ],
    beats: [
      { upTo: 12, reaction: "Guardai-vos do fermento dos fariseus e saduceus. ⚠️" },
      { upTo: 20, god: "Tu és Pedro, e sobre esta pedra edificarei a minha igreja.", reaction: "Pedro confessa: 'Tu és o Cristo!' 🗝️" },
      { upTo: 99, god: "Quem quiser seguir-me, tome a sua cruz e siga-me.", reaction: "Jesus anuncia sua paixão. ✝️" },
    ],
  },
  17: {
    keyframes: [
      kf(1, { terrain: "mountain", glory: 0.9, actors: [F(0.45, "man", "raise", "white"), F(0.3, "elder", "stand", "gray"), F(0.66, "man", "bow", "brown")] }),
      kf(14, { terrain: "hills", crowd: 0.4, actors: [F(0.4, "man", "raise", "white"), F(0.62, "child", "kneel", "sand")] }),
      kf(24, { terrain: "city", actors: [F(0.4, "man", "stand", "white"), F(0.62, "man", "stand", "brown")] }),
    ],
    beats: [
      { upTo: 8, god: "Este é o meu Filho amado; a ele ouvi.", reaction: "A Transfiguração no monte: rosto como o sol. 🌟" },
      { upTo: 21, god: "Se tiverdes fé como um grão de mostarda, nada vos será impossível.", reaction: "Jesus cura o menino epiléptico. 🤍" },
      { upTo: 99, reaction: "A moeda na boca do peixe paga o tributo. 🐟" },
    ],
  },
  18: {
    keyframes: [
      kf(1, { terrain: "city", actors: [F(0.4, "man", "raise", "white"), F(0.62, "child", "stand", "sand")] }),
      kf(12, { terrain: "hills", actors: [F(0.4, "shepherd", "raise", "white"), AN(0.66, "sheep"), AN(0.8, "sheep")] }),
      kf(21, { terrain: "city", actors: [F(0.4, "man", "raise", "white"), F(0.64, "man", "kneel", "brown")] }),
    ],
    beats: [
      { upTo: 11, god: "Quem se humilhar como esta criança, esse é o maior no reino.", reaction: "Sede humildes como as crianças. 🧒" },
      { upTo: 20, god: "Onde dois ou três se reúnem em meu nome, ali estou no meio deles.", reaction: "A ovelha perdida e a busca do Pai. 🐑" },
      { upTo: 99, god: "Perdoa setenta vezes sete.", reaction: "A parábola do servo impiedoso. 🤝" },
    ],
  },
  19: {
    keyframes: [
      kf(1, { terrain: "field", crowd: 0.4, actors: [F(0.4, "man", "raise", "white"), F(0.62, "man", "stand", "brown")] }),
      kf(13, { terrain: "field", actors: [F(0.4, "man", "raise", "white"), F(0.6, "child", "stand", "sand"), F(0.74, "woman", "stand", "blue")] }),
      kf(16, { terrain: "city", actors: [F(0.4, "man", "stand", "white"), F(0.64, "king", "mourn", "gold")] }),
    ],
    beats: [
      { upTo: 12, god: "O que Deus ajuntou não o separe o homem.", reaction: "Jesus ensina sobre o casamento. 💍" },
      { upTo: 15, god: "Deixai vir a mim as crianças, porque delas é o reino dos céus.", reaction: "Ele abençoa as crianças. 🧒" },
      { upTo: 99, god: "É mais fácil um camelo passar pelo fundo de uma agulha que um rico entrar no reino.", reaction: "O jovem rico se retira triste. 😔" },
    ],
  },
  20: {
    keyframes: [
      kf(1, { terrain: "field", actors: [F(0.4, "king", "raise", "gold"), F(0.64, "man", "carry", "brown")] }),
      kf(17, { terrain: "hills", night: 0.2, actors: [F(0.4, "man", "stand", "white"), F(0.64, "man", "stand", "brown")] }),
      kf(29, { terrain: "city", crowd: 0.6, actors: [F(0.4, "man", "raise", "white"), F(0.64, "man", "kneel", "gray")] }),
    ],
    beats: [
      { upTo: 16, god: "Assim os últimos serão os primeiros, e os primeiros, últimos.", reaction: "A parábola dos trabalhadores da vinha. 🍇" },
      { upTo: 28, god: "O Filho do Homem veio para servir e dar a sua vida em resgate.", reaction: "A grandeza está em servir. 🤍" },
      { upTo: 99, reaction: "Jesus dá vista a dois cegos em Jericó. 👁️" },
    ],
  },
  21: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.8, props: [P("palm", 0.2, 1.1), P("palm", 0.82, 0.9)], actors: [F(0.45, "man", "raise", "white"), F(0.66, "man", "bow", "brown")] }),
      kf(12, { terrain: "city", props: [P("tower", 0.72, 1.3)], actors: [F(0.4, "man", "fight", "white", { facing: 1 }), F(0.64, "man", "mourn", "sand")] }),
      kf(18, { terrain: "field", props: [P("tree", 0.6, 1.1)], actors: [F(0.42, "man", "raise", "white")] }),
      kf(23, { terrain: "city", crowd: 0.4, actors: [F(0.4, "man", "raise", "white"), F(0.64, "elder", "stand", "gray")] }),
    ],
    beats: [
      { upTo: 11, god: undefined, reaction: "Entrada triunfal: 'Hosana ao Filho de Davi!' 🌿" },
      { upTo: 17, reaction: "Jesus purifica o templo: 'Casa de oração!' 🕊️" },
      { upTo: 22, reaction: "A figueira sem fruto seca ao seu comando. 🌳" },
      { upTo: 99, god: "A pedra que os construtores rejeitaram tornou-se a principal.", reaction: "Ele confronta os líderes com parábolas. 🗣️" },
    ],
  },
  22: {
    keyframes: [
      kf(1, { terrain: "city", props: [P("tower", 0.18, 1.2)], actors: [F(0.4, "king", "raise", "gold"), F(0.66, "man", "stand", "brown")] }),
      kf(15, { terrain: "city", crowd: 0.4, actors: [F(0.4, "man", "stand", "white"), F(0.64, "elder", "stand", "gray")] }),
      kf(34, { terrain: "city", actors: [F(0.42, "man", "raise", "white"), F(0.66, "man", "stand", "sand")] }),
    ],
    beats: [
      { upTo: 14, god: "Muitos são chamados, mas poucos escolhidos.", reaction: "A parábola das bodas do rei. 👑" },
      { upTo: 33, god: "Dai a César o que é de César, e a Deus o que é de Deus.", reaction: "Perguntas sobre tributo e ressurreição. 🪙" },
      { upTo: 99, god: "Amarás o Senhor teu Deus e ao teu próximo como a ti mesmo.", reaction: "O maior mandamento. 🤍" },
    ],
  },
  23: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.5, actors: [F(0.4, "man", "raise", "white"), F(0.66, "elder", "stand", "gray")] }),
      kf(13, { terrain: "city", actors: [F(0.42, "man", "raise", "white")] }),
      kf(37, { terrain: "city", night: 0.3, props: [P("tower", 0.72, 1.3)], actors: [F(0.42, "man", "mourn", "white")] }),
    ],
    beats: [
      { upTo: 12, god: "Quem se exaltar será humilhado; quem se humilhar será exaltado.", reaction: "Jesus adverte contra a hipocrisia. ⚠️" },
      { upTo: 36, god: "Ai de vós, escribas e fariseus hipócritas!", reaction: "Os sete ais sobre os líderes religiosos. 🗣️" },
      { upTo: 99, god: "Jerusalém, quantas vezes quis reunir os teus filhos!", reaction: "Ele lamenta sobre Jerusalém. 😢" },
    ],
  },
  24: {
    keyframes: [
      kf(1, { terrain: "city", props: [P("tower", 0.7, 1.4)], actors: [F(0.4, "man", "raise", "white"), F(0.64, "man", "stand", "brown")] }),
      kf(15, { terrain: "mountain", night: 0.4, storm: 0.4, actors: [F(0.42, "man", "raise", "white")] }),
      kf(29, { terrain: "mountain", night: 0.6, glory: 0.5, actors: [F(0.44, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 14, god: "Este evangelho será pregado a todas as nações, e então virá o fim.", reaction: "Jesus anuncia o fim da era. ⏳" },
      { upTo: 28, reaction: "Sinais de tribulação; não vos deixeis enganar. ⚠️" },
      { upTo: 99, god: "Vigiai, pois não sabeis o dia nem a hora.", reaction: "O Filho do Homem virá em glória. 🌟" },
    ],
  },
  25: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.6, actors: [F(0.3, "woman", "stand", "white"), F(0.5, "woman", "kneel", "blue"), F(0.7, "woman", "stand", "purple")] }),
      kf(14, { terrain: "city", actors: [F(0.4, "king", "raise", "gold"), F(0.64, "servant", "kneel", "brown")] }),
      kf(31, { terrain: "mountain", glory: 0.7, actors: [F(0.45, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 13, god: "Vigiai, pois não sabeis o dia nem a hora.", reaction: "As dez virgens e suas lâmpadas. 🪔" },
      { upTo: 30, god: "Bom e fiel servo, entra no gozo do teu senhor.", reaction: "A parábola dos talentos. 💰" },
      { upTo: 99, god: "O que fizestes a um destes pequeninos, a mim o fizestes.", reaction: "O juízo das nações: ovelhas e cabritos. 🐑" },
    ],
  },
  26: {
    keyframes: [
      kf(1, { terrain: "city", actors: [F(0.4, "man", "stand", "white"), F(0.62, "woman", "kneel", "purple")] }),
      kf(17, { terrain: "city", night: 0.5, props: [P("tent", 0.72)], actors: [F(0.45, "man", "raise", "white"), F(0.66, "man", "stand", "brown")] }),
      kf(36, { terrain: "garden", night: 0.75, props: [P("tree", 0.7, 1.1)], actors: [F(0.42, "man", "kneel", "white"), F(0.66, "man", "lie", "brown")] }),
      kf(47, { terrain: "garden", night: 0.8, actors: [F(0.36, "man", "stand", "white"), F(0.55, "man", "stand", "gray"), F(0.72, "warrior", "stand", "red")] }),
    ],
    beats: [
      { upTo: 16, reaction: "Uma mulher unge Jesus; Judas trama a traição. 💰" },
      { upTo: 35, god: "Isto é o meu corpo. Isto é o meu sangue da aliança.", reaction: "A Última Ceia. 🍷🍞" },
      { upTo: 46, god: "Pai, não seja como eu quero, mas como tu queres.", reaction: "Agonia no Getsêmani. 🌿" },
      { upTo: 99, reaction: "Judas o trai com um beijo; Pedro nega três vezes. 😢" },
    ],
  },
  27: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.3, actors: [F(0.4, "man", "stand", "white"), F(0.64, "king", "stand", "gold")] }),
      kf(27, { terrain: "city", crowd: 0.6, actors: [F(0.42, "man", "mourn", "white"), F(0.68, "warrior", "stand", "red")] }),
      kf(33, { terrain: "hills", darkness: 0.8, props: [P("cross", 0.5, 1.4)], actors: [F(0.34, "woman", "mourn", "blue"), F(0.7, "warrior", "stand", "gray")] }),
      kf(57, { terrain: "hills", night: 0.5, props: [P("tomb", 0.6, 1.1)], actors: [F(0.4, "man", "carry", "brown"), F(0.62, "woman", "mourn", "purple")] }),
    ],
    beats: [
      { upTo: 26, reaction: "Diante de Pilatos, a multidão pede a crucificação. 😢" },
      { upTo: 44, reaction: "Coroam-no de espinhos e o pregam na cruz. ✝️" },
      { upTo: 56, god: "Deus meu, Deus meu, por que me desamparaste?", reaction: "Trevas cobrem a terra; o véu se rasga. 🌑" },
      { upTo: 99, reaction: "José de Arimateia o sepulta e rola a pedra. ⚰️" },
    ],
  },
  28: {
    keyframes: [
      kf(1, { terrain: "hills", glory: 0.6, props: [P("tomb", 0.55, 1.1)], actors: [F(0.34, "angel", "raise", "white"), F(0.66, "woman", "kneel", "purple")] }),
      kf(9, { terrain: "garden", glory: 0.7, props: [P("tree", 0.72, 1)], actors: [F(0.42, "man", "raise", "white"), F(0.62, "woman", "bow", "blue")] }),
      kf(16, { terrain: "mountain", glory: 0.9, actors: [F(0.45, "man", "raise", "white"), F(0.66, "man", "bow", "brown")] }),
    ],
    beats: [
      { upTo: 8, god: "Ele não está aqui: ressuscitou, como havia dito!", reaction: "O anjo anuncia a ressurreição no túmulo vazio. 👼" },
      { upTo: 15, reaction: "Jesus vivo encontra as mulheres a caminho. ✨" },
      { upTo: 99, god: "Ide e fazei discípulos de todas as nações; eis que estou convosco todos os dias.", reaction: "A Grande Comissão no monte. 🌍🌟" },
    ],
  },
};
