// ============================================================================
// Roteiros de cena (Living Scene v2) — JOÃO, capítulo por capítulo.
// "No princípio era o Verbo", a luz que brilha nas trevas, água em vinho em
// Caná, a samaritana no poço, o pão da vida, "Eu sou a luz do mundo", a
// ressurreição de Lázaro, o lava-pés, "Eu sou o caminho", a cruz e o "está
// consumado", a ressurreição e Tomé, e o café da manhã à beira-mar.
// Puramente visual/narrativo — não toca em progresso.
// Segue o padrão de Êxodo (rpgExodusScenes).
// ============================================================================

import type { ChapterScript, V2Actor, V2Prop, SceneState } from "@/lib/rpgLivingV2";

const F = (x: number, role: V2Actor["role"], action: V2Actor["action"], palette?: V2Actor["palette"], extra: Partial<V2Actor> = {}): V2Actor => ({ x, role, action, palette, ...extra });
const AN = (x: number, animal: NonNullable<V2Actor["animal"]>, scale = 1, color?: string): V2Actor => ({ x, kind: "animal", animal, scale, color });
const P = (kind: string, x: number, scale = 1, fire?: number): V2Prop => ({ kind, x, scale, ...(fire != null ? { fire } : {}) });
const kf = (v: number, state: SceneState) => ({ v, state });

export const JOHN_SCENES: Record<number, ChapterScript> = {
  1: {
    keyframes: [
      kf(1, { terrain: "plain", night: 0.85, glory: 0.3, props: [P("star", 0.2), P("star", 0.5, 0.8), P("star", 0.78)], actors: [] }),
      kf(4, { terrain: "plain", night: 0.4, glory: 0.7, actors: [] }),
      kf(29, { terrain: "river", glory: 0.4, props: [P("reeds", 0.2), P("dove", 0.5, 1.1), P("reeds", 0.82)], actors: [F(0.4, "man", "raise", "white"), F(0.58, "man", "stand", "brown")] }),
      kf(43, { terrain: "hills", actors: [F(0.35, "man", "walk", "white"), F(0.55, "man", "stand", "brown"), F(0.72, "man", "stand", "sand")] }),
    ],
    beats: [
      { upTo: 3, reaction: "No princípio era o Verbo, e o Verbo era Deus. ✨" },
      { upTo: 13, reaction: "A luz brilha nas trevas, e as trevas não a venceram. 🌟" },
      { upTo: 34, reaction: "João Batista o aponta: 'Eis o Cordeiro de Deus!' 🕊️" },
      { upTo: 99, reaction: "Jesus chama os primeiros discípulos: 'Segue-me.' 🤝" },
    ],
  },
  2: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.7, props: [P("tent", 0.2), P("tent", 0.8)], actors: [F(0.42, "man", "stand", "white"), F(0.6, "woman", "stand", "blue")] }),
      kf(7, { terrain: "city", crowd: 0.6, props: [P("basket", 0.32), P("basket", 0.5), P("basket", 0.68)], actors: [F(0.4, "man", "raise", "white"), F(0.62, "servant", "carry", "sand")] }),
      kf(13, { terrain: "city", crowd: 0.6, props: [P("tower", 0.8, 1.1)], actors: [F(0.4, "man", "raise", "white", { facing: 1 })] }),
    ],
    beats: [
      { upTo: 6, reaction: "Nas bodas de Caná, o vinho acaba. 🍷" },
      { upTo: 11, reaction: "Jesus transforma água em vinho — o primeiro sinal! ✨" },
      { upTo: 99, reaction: "Ele purifica o templo: 'Não façais casa de negócio.' 🔥" },
    ],
  },
  3: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.85, props: [P("tower", 0.2), P("star", 0.7)], actors: [F(0.4, "man", "stand", "white"), F(0.6, "elder", "stand", "purple")] }),
      kf(14, { terrain: "desert", night: 0.5, glory: 0.3, props: [P("serpent", 0.55)], actors: [F(0.42, "man", "raise", "white")] }),
      kf(22, { terrain: "river", props: [P("reeds", 0.24), P("reeds", 0.8)], actors: [F(0.4, "man", "stand", "white"), F(0.62, "man", "raise", "brown")] }),
    ],
    beats: [
      { upTo: 13, god: "Quem não nascer de novo não pode ver o reino de Deus.", reaction: "Nicodemos vem a Jesus de noite. 🌙" },
      { upTo: 21, god: "Deus amou o mundo de tal maneira que deu o seu Filho.", reaction: "João 3:16 — o amor que salva. ❤️" },
      { upTo: 99, reaction: "João Batista: 'É necessário que ele cresça e eu diminua.' 🕊️" },
    ],
  },
  4: {
    keyframes: [
      kf(1, { terrain: "field", actors: [F(0.35, "man", "walk", "white"), F(0.55, "man", "walk", "brown")] }),
      kf(6, { terrain: "field", props: [P("well", 0.5, 1.1)], actors: [F(0.38, "man", "stand", "white"), F(0.64, "woman", "carry", "sand")] }),
      kf(28, { terrain: "city", crowd: 0.5, props: [P("well", 0.24)], actors: [F(0.5, "woman", "raise", "sand")] }),
      kf(46, { terrain: "city", actors: [F(0.4, "man", "raise", "white"), F(0.66, "man", "kneel", "purple")] }),
    ],
    beats: [
      { upTo: 15, god: "A água que eu der será fonte para a vida eterna.", reaction: "Jesus conversa com a samaritana no poço. 💧" },
      { upTo: 26, god: "Eu o sou, eu que falo contigo.", reaction: "Ele se revela o Messias. ✨" },
      { upTo: 42, reaction: "A mulher corre e a cidade toda crê. 🏃‍♀️" },
      { upTo: 99, reaction: "Jesus cura o filho de um oficial em Cafarnaum. 🙏" },
    ],
  },
  5: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.6, props: [P("well", 0.4, 1.2)], actors: [F(0.62, "man", "lie", "sand")] }),
      kf(8, { terrain: "city", crowd: 0.5, actors: [F(0.4, "man", "raise", "white"), F(0.6, "man", "carry", "brown")] }),
      kf(16, { terrain: "city", actors: [F(0.4, "man", "stand", "white"), F(0.66, "elder", "stand", "purple", { facing: -1 })] }),
    ],
    beats: [
      { upTo: 9, god: "Levanta-te, toma o teu leito e anda.", reaction: "Jesus cura o paralítico de Betesda. 🚶" },
      { upTo: 18, reaction: "A cura no sábado provoca os líderes. 😠" },
      { upTo: 99, god: "O Filho não pode fazer nada de si mesmo, senão o que vê o Pai fazer.", reaction: "Jesus testemunha da sua autoridade. ✨" },
    ],
  },
  6: {
    keyframes: [
      kf(1, { terrain: "hills", crowd: 0.85, actors: [F(0.4, "man", "stand", "white"), F(0.64, "child", "carry", "sand")] }),
      kf(11, { terrain: "hills", crowd: 0.8, glory: 0.3, props: [P("basket", 0.3), P("basket", 0.5), P("basket", 0.7)], actors: [F(0.42, "man", "raise", "white")] }),
      kf(16, { terrain: "sea", night: 0.7, storm: 0.5, props: [P("boat", 0.5, 1.1)], actors: [F(0.3, "man", "walk", "white")] }),
      kf(35, { terrain: "sea", props: [P("boat", 0.78)], actors: [F(0.42, "man", "raise", "white"), F(0.66, "man", "kneel", "brown")] }),
    ],
    beats: [
      { upTo: 13, reaction: "Cinco pães e dois peixes alimentam cinco mil! 🐟🍞" },
      { upTo: 21, reaction: "Jesus caminha sobre o mar até os discípulos. 🌊" },
      { upTo: 40, god: "Eu sou o pão da vida; quem vem a mim não terá fome.", reaction: "O pão que desceu do céu. 🤍" },
      { upTo: 99, reaction: "Pedro confessa: 'Tu tens as palavras de vida eterna.' 🙏" },
    ],
  },
  7: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.6, props: [P("tower", 0.8, 1.1)], actors: [F(0.4, "man", "stand", "white")] }),
      kf(14, { terrain: "city", crowd: 0.7, actors: [F(0.42, "man", "raise", "white")] }),
      kf(37, { terrain: "city", crowd: 0.7, glory: 0.2, actors: [F(0.44, "man", "raise", "white", { facing: 1 })] }),
    ],
    beats: [
      { upTo: 13, reaction: "Jesus sobe à festa dos Tabernáculos. 🎪" },
      { upTo: 36, reaction: "Ele ensina no templo, e o povo se divide. 🤔" },
      { upTo: 99, god: "Se alguém tem sede, venha a mim e beba.", reaction: "Rios de água viva! 💧" },
    ],
  },
  8: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.6, actors: [F(0.4, "man", "kneel", "white"), F(0.62, "woman", "mourn", "sand"), F(0.8, "elder", "stand", "purple", { facing: -1 })] }),
      kf(11, { terrain: "city", actors: [F(0.42, "man", "raise", "white"), F(0.62, "woman", "stand", "sand")] }),
      kf(12, { terrain: "city", glory: 0.6, actors: [F(0.44, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 11, god: "Quem de vós está sem pecado, atire a primeira pedra.", reaction: "Jesus perdoa a adúltera: 'Vai e não peques mais.' 🤍" },
      { upTo: 30, god: "Eu sou a luz do mundo; quem me segue não andará em trevas.", reaction: "A luz do mundo. 🌟" },
      { upTo: 99, god: "Antes que Abraão existisse, EU SOU.", reaction: "Jesus declara sua eternidade. ✨" },
    ],
  },
  9: {
    keyframes: [
      kf(1, { terrain: "city", actors: [F(0.4, "man", "stand", "white"), F(0.64, "man", "kneel", "sand")] }),
      kf(7, { terrain: "city", props: [P("well", 0.7)], actors: [F(0.5, "man", "raise", "sand")] }),
      kf(35, { terrain: "city", glory: 0.3, actors: [F(0.42, "man", "raise", "white"), F(0.62, "man", "bow", "sand")] }),
    ],
    beats: [
      { upTo: 7, god: "Vai, lava-te no tanque de Siloé.", reaction: "Jesus cura o cego de nascença. 👁️" },
      { upTo: 34, reaction: "Os fariseus interrogam e expulsam o homem. 😠" },
      { upTo: 99, god: "Tu crês no Filho do Homem?", reaction: "O cego crê e adora a Jesus. 🙏" },
    ],
  },
  10: {
    keyframes: [
      kf(1, { terrain: "field", actors: [F(0.4, "shepherd", "stand", "white"), AN(0.62, "sheep"), AN(0.76, "sheep"), AN(0.88, "sheep")] }),
      kf(11, { terrain: "hills", glory: 0.3, actors: [F(0.4, "shepherd", "raise", "white"), AN(0.66, "sheep"), AN(0.8, "sheep")] }),
      kf(22, { terrain: "city", crowd: 0.5, actors: [F(0.42, "man", "stand", "white"), F(0.66, "elder", "stand", "purple", { facing: -1 })] }),
    ],
    beats: [
      { upTo: 10, god: "Eu sou a porta; quem por mim entrar será salvo.", reaction: "A porta das ovelhas. 🚪" },
      { upTo: 21, god: "Eu sou o bom pastor; dou a minha vida pelas ovelhas.", reaction: "O bom Pastor. 🐑" },
      { upTo: 99, god: "Eu e o Pai somos um.", reaction: "Jesus declara sua unidade com o Pai. ✨" },
    ],
  },
  11: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.3, actors: [F(0.4, "man", "stand", "white"), F(0.62, "woman", "mourn", "blue")] }),
      kf(17, { terrain: "city", mourn: 0.7, night: 0.2, crowd: 0.5, actors: [F(0.4, "man", "stand", "white"), F(0.6, "woman", "kneel", "blue"), F(0.72, "woman", "mourn", "purple")] }),
      kf(38, { terrain: "hills", glory: 0.4, props: [P("tomb", 0.6, 1.2)], actors: [F(0.38, "man", "raise", "white")] }),
      kf(44, { terrain: "hills", glory: 0.7, props: [P("tomb", 0.62, 1.2)], actors: [F(0.38, "man", "raise", "white"), F(0.62, "man", "stand", "sand")] }),
    ],
    beats: [
      { upTo: 16, reaction: "Lázaro adoece e morre em Betânia. 😢" },
      { upTo: 27, god: "Eu sou a ressurreição e a vida.", reaction: "Marta encontra Jesus no caminho. 🤍" },
      { upTo: 37, reaction: "Jesus chora diante do túmulo. 😭" },
      { upTo: 99, god: "Lázaro, vem para fora!", reaction: "O morto ressuscita! ✨" },
    ],
  },
  12: {
    keyframes: [
      kf(1, { terrain: "city", props: [P("tent", 0.8)], actors: [F(0.4, "man", "stand", "white"), F(0.62, "woman", "kneel", "purple")] }),
      kf(12, { terrain: "city", crowd: 0.85, props: [P("palm", 0.2), P("palm", 0.82)], actors: [F(0.5, "man", "walk", "white")] }),
      kf(27, { terrain: "city", glory: 0.4, crowd: 0.5, actors: [F(0.44, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 11, reaction: "Maria unge os pés de Jesus com perfume. 🌿" },
      { upTo: 19, reaction: "Entrada triunfal em Jerusalém: 'Hosana!' 🌴" },
      { upTo: 99, god: "Se o grão de trigo não morrer, fica só.", reaction: "Uma voz do céu glorifica o Filho. 🌟" },
    ],
  },
  13: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.6, props: [P("tent", 0.2), P("tent", 0.82)], actors: [F(0.4, "man", "kneel", "white"), F(0.62, "man", "stand", "brown")] }),
      kf(12, { terrain: "city", night: 0.6, glory: 0.2, actors: [F(0.4, "man", "raise", "white"), F(0.58, "man", "stand", "brown"), F(0.74, "man", "stand", "sand")] }),
      kf(21, { terrain: "city", night: 0.8, actors: [F(0.42, "man", "stand", "white"), F(0.7, "man", "walk", "gray", { facing: 1 })] }),
    ],
    beats: [
      { upTo: 11, reaction: "Jesus lava os pés dos discípulos. 🦶💧" },
      { upTo: 20, god: "Dei-vos o exemplo, para que também façais.", reaction: "O Mestre serve como um servo. 🤍" },
      { upTo: 99, god: "Novo mandamento vos dou: que vos ameis uns aos outros.", reaction: "O amor será a marca dos discípulos. ❤️" },
    ],
  },
  14: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.5, glory: 0.3, actors: [F(0.4, "man", "raise", "white"), F(0.62, "man", "stand", "brown")] }),
      kf(6, { terrain: "city", night: 0.4, glory: 0.5, actors: [F(0.44, "man", "raise", "white")] }),
      kf(25, { terrain: "city", night: 0.4, glory: 0.4, props: [P("dove", 0.7)], actors: [F(0.42, "man", "stand", "white")] }),
    ],
    beats: [
      { upTo: 5, god: "Na casa de meu Pai há muitas moradas.", reaction: "'Não se turbe o vosso coração.' 🕊️" },
      { upTo: 14, god: "Eu sou o caminho, a verdade e a vida.", reaction: "Ninguém vem ao Pai senão por mim. ✨" },
      { upTo: 99, god: "Deixo-vos a paz; enviarei o Consolador.", reaction: "A promessa do Espírito Santo. 🕊️" },
    ],
  },
  15: {
    keyframes: [
      kf(1, { terrain: "garden", glory: 0.3, props: [P("tree", 0.3, 1.2), P("tree", 0.7, 1.1)], actors: [F(0.5, "man", "raise", "white")] }),
      kf(9, { terrain: "garden", glory: 0.4, props: [P("tree", 0.5, 1.3)], actors: [F(0.4, "man", "stand", "white"), F(0.62, "man", "stand", "brown")] }),
      kf(18, { terrain: "garden", night: 0.3, actors: [F(0.42, "man", "stand", "white")] }),
    ],
    beats: [
      { upTo: 8, god: "Eu sou a videira, vós as varas.", reaction: "Permanecei em mim e dareis muito fruto. 🍇" },
      { upTo: 17, god: "Amai-vos uns aos outros como eu vos amei.", reaction: "Ninguém tem maior amor do que dar a vida. ❤️" },
      { upTo: 99, reaction: "'Se o mundo vos odeia, saiba que a mim me odiou primeiro.'" },
    ],
  },
  16: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.5, actors: [F(0.4, "man", "stand", "white"), F(0.62, "man", "mourn", "brown")] }),
      kf(12, { terrain: "city", night: 0.4, glory: 0.3, props: [P("dove", 0.68)], actors: [F(0.42, "man", "raise", "white")] }),
      kf(32, { terrain: "city", night: 0.4, glory: 0.5, actors: [F(0.44, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 11, god: "Convém-vos que eu vá, para que venha o Consolador.", reaction: "O Espírito guiará a toda a verdade. 🕊️" },
      { upTo: 24, reaction: "'A vossa tristeza se converterá em alegria.' 😊" },
      { upTo: 99, god: "Tende bom ânimo; eu venci o mundo.", reaction: "A vitória de Cristo. ✨" },
    ],
  },
  17: {
    keyframes: [
      kf(1, { terrain: "garden", night: 0.4, glory: 0.6, actors: [F(0.5, "man", "raise", "white")] }),
      kf(9, { terrain: "garden", night: 0.3, glory: 0.7, actors: [F(0.48, "man", "kneel", "white")] }),
      kf(20, { terrain: "garden", night: 0.3, glory: 0.8, actors: [F(0.48, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 8, god: "Pai, chegou a hora; glorifica o teu Filho.", reaction: "A oração sacerdotal de Jesus. 🙏" },
      { upTo: 19, god: "Santifica-os na verdade; a tua palavra é a verdade.", reaction: "Jesus ora pelos discípulos. ✨" },
      { upTo: 99, god: "Que todos sejam um, como nós somos um.", reaction: "Ele ora por todos os que hão de crer. 🤍" },
    ],
  },
  18: {
    keyframes: [
      kf(1, { terrain: "garden", night: 0.85, props: [P("tree", 0.25), P("tree", 0.78)], actors: [F(0.4, "man", "stand", "white"), F(0.66, "warrior", "stand", "gray", { facing: -1 })] }),
      kf(10, { terrain: "garden", night: 0.8, actors: [F(0.4, "man", "raise", "white"), F(0.6, "man", "fight", "brown"), F(0.76, "servant", "mourn", "sand")] }),
      kf(28, { terrain: "city", night: 0.7, actors: [F(0.4, "man", "stand", "white"), F(0.66, "king", "stand", "purple", { facing: -1 })] }),
    ],
    beats: [
      { upTo: 9, reaction: "Judas trai Jesus no Getsêmani. 🌙" },
      { upTo: 27, reaction: "Pedro nega a Jesus três vezes. 🐓😢" },
      { upTo: 99, god: "O meu reino não é deste mundo.", reaction: "Jesus diante de Pilatos. 👑" },
    ],
  },
  19: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.7, actors: [F(0.4, "man", "stand", "white"), F(0.66, "king", "stand", "purple")] }),
      kf(16, { terrain: "hills", darkness: 0.4, crowd: 0.6, actors: [F(0.4, "man", "carry", "white")] }),
      kf(18, { terrain: "hills", darkness: 0.7, night: 0.3, mourn: 0.6, props: [P("cross", 0.5, 1.3)], actors: [F(0.32, "woman", "mourn", "blue"), F(0.68, "man", "mourn", "brown")] }),
      kf(30, { terrain: "hills", darkness: 0.95, night: 0.5, mourn: 0.8, props: [P("cross", 0.5, 1.3)], actors: [F(0.32, "woman", "kneel", "blue")] }),
    ],
    beats: [
      { upTo: 15, reaction: "'Crucifica-o!' Pilatos o entrega. 😢" },
      { upTo: 27, reaction: "Jesus é crucificado no Gólgota. ✝️" },
      { upTo: 30, god: "Está consumado.", reaction: "Ele entrega o espírito. 🌑" },
      { upTo: 99, reaction: "O corpo é sepultado num túmulo novo. 🪦" },
    ],
  },
  20: {
    keyframes: [
      kf(1, { terrain: "garden", night: 0.3, glory: 0.4, props: [P("tomb", 0.6, 1.2)], actors: [F(0.4, "woman", "kneel", "blue")] }),
      kf(11, { terrain: "garden", glory: 0.7, props: [P("tomb", 0.62, 1.2)], actors: [F(0.4, "woman", "raise", "blue"), F(0.62, "man", "stand", "white")] }),
      kf(19, { terrain: "city", glory: 0.5, actors: [F(0.42, "man", "raise", "white"), F(0.64, "man", "bow", "brown")] }),
      kf(26, { terrain: "city", glory: 0.5, actors: [F(0.42, "man", "raise", "white"), F(0.64, "man", "kneel", "brown")] }),
    ],
    beats: [
      { upTo: 10, reaction: "O túmulo está vazio! A pedra foi removida. 🪦" },
      { upTo: 18, god: "Maria! Vai aos meus irmãos e dize-lhes.", reaction: "Jesus ressuscitado aparece a Maria Madalena. ✨" },
      { upTo: 25, reaction: "Ele aparece aos discípulos: 'Paz seja convosco!' 🕊️" },
      { upTo: 99, god: "Bem-aventurados os que não viram e creram.", reaction: "Tomé crê: 'Senhor meu e Deus meu!' 🙏" },
    ],
  },
  21: {
    keyframes: [
      kf(1, { terrain: "sea", night: 0.4, props: [P("boat", 0.4, 1.1)], actors: [F(0.3, "man", "stand", "brown"), F(0.5, "man", "carry", "sand")] }),
      kf(6, { terrain: "sea", glory: 0.3, props: [P("boat", 0.5, 1.1)], actors: [F(0.72, "man", "raise", "white")] }),
      kf(9, { terrain: "sea", fire: 0.4, props: [P("altar", 0.55, 0.8, 0.9)], actors: [F(0.42, "man", "stand", "white"), F(0.66, "man", "kneel", "brown")] }),
      kf(15, { terrain: "sea", glory: 0.4, actors: [F(0.4, "man", "raise", "white"), F(0.62, "man", "stand", "brown")] }),
    ],
    beats: [
      { upTo: 8, reaction: "Ao amanhecer, uma pesca milagrosa à beira-mar. 🐟" },
      { upTo: 14, reaction: "Jesus prepara o café da manhã na brasa. 🔥🍞" },
      { upTo: 19, god: "Simão, tu me amas? Apascenta as minhas ovelhas.", reaction: "Jesus restaura Pedro. 🐑" },
      { upTo: 99, reaction: "'Segue-me.' O Evangelho de João se encerra. 📖" },
    ],
  },
};
