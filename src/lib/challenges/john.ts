import type { BookChallenges } from "@/lib/rpgChallengeContent";

// João (21 caps). Ciclo (c-1)%6: 0=ordenar, 1=caça-palavras, 2=cruzada,
// 3=completar, 4=ligar, 5=quiz(IA). Cap. 21 (último) = boss.
export const JOHN_CH: BookChallenges = {
  order: {
    1: {
      title: "Ordene: o Verbo e a luz", sub: "Toque nas cartas na sequência certa.", verse: 51,
      win: "🎉 A luz veio ao mundo!",
      items: [
        { d: 1, em: "📖", l: "No princípio era o Verbo, e o Verbo estava com Deus" },
        { d: 2, em: "🔦", l: "João Batista vem dar testemunho da luz" },
        { d: 3, em: "👶", l: "O Verbo se fez carne e habitou entre nós" },
        { d: 4, em: "🎣", l: "Jesus chama os primeiros discípulos" },
      ],
    },
    7: {
      title: "Ordene: Jesus na festa dos tabernáculos", sub: "Toque nas cartas na sequência certa.", verse: 53,
      win: "🎉 Rios de água viva!",
      items: [
        { d: 1, em: "🤨", l: "Os irmãos de Jesus não creem e o desafiam" },
        { d: 2, em: "🚶", l: "Jesus sobe à festa em segredo" },
        { d: 3, em: "🗣️", l: "No meio da festa, ensina no templo" },
        { d: 4, em: "💧", l: "No último dia clama: quem tem sede venha a mim" },
      ],
    },
    13: {
      title: "Ordene: o lava-pés", sub: "Toque nas cartas na sequência certa.", verse: 38,
      win: "🎉 O maior serve como o menor!",
      items: [
        { d: 1, em: "🍽️", l: "Durante a ceia, Jesus se levanta da mesa" },
        { d: 2, em: "🧺", l: "Cinge-se com a toalha e enche a bacia" },
        { d: 3, em: "🦶", l: "Lava os pés dos discípulos, um a um" },
        { d: 4, em: "💗", l: "Dá o novo mandamento: amai-vos uns aos outros" },
      ],
    },
    19: {
      title: "Ordene: está consumado", sub: "Toque nas cartas na sequência certa.", verse: 42,
      win: "🎉 A obra foi cumprida!",
      items: [
        { d: 1, em: "⚖️", l: "Pilatos entrega Jesus para ser crucificado" },
        { d: 2, em: "✝️", l: "Crucificam-no no Gólgota, entre dois outros" },
        { d: 3, em: "🩸", l: "Jesus diz: Está consumado, e entrega o espírito" },
        { d: 4, em: "🪦", l: "José de Arimateia o sepulta no jardim" },
      ],
    },
  },
  wordsearch: {
    2: {
      title: "Caça-palavras — água em vinho em Caná",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["CANA", "VINHO", "ÁGUA", "MARIA", "TALHAS", "MILAGRE"],
    },
    8: {
      title: "Caça-palavras — Eu sou a luz do mundo",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["LUZ", "MUNDO", "VERDADE", "LIBERTA", "PECADO", "ABRAÃO"],
    },
    14: {
      title: "Caça-palavras — Eu sou o caminho",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["CAMINHO", "VERDADE", "VIDA", "PAI", "MORADAS", "PAZ"],
    },
    20: {
      title: "Caça-palavras — a ressurreição e Tomé",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["TÚMULO", "MARIA", "TOMÉ", "SENHOR", "CREIO", "PAZ"],
    },
  },
  crossword: {
    3: {
      title: "Palavra cruzada — Nicodemos",
      grid: ["NASCER", "O.....", "I.....", "T.....", "E....."],
      across: ["→ É preciso ... de novo, do alto (6)"],
      down: ["↓ Nicodemos veio a Jesus de (5)"],
    },
    9: {
      title: "Palavra cruzada — o cego de nascença",
      grid: ["CEGO", "U...", "R...", "A..."],
      across: ["→ Nasceu ... e Jesus o fez ver (4)"],
      down: ["↓ O que Jesus operou nos olhos dele (4)"],
    },
    15: {
      title: "Palavra cruzada — Eu sou a videira",
      grid: ["VIDEIRA", "A......", "R......", "A......"],
      across: ["→ 'Eu sou a ... verdadeira' (7)"],
      down: ["↓ Nome dos ramos ligados à videira (4)"],
    },
  },
  complete: {
    4: {
      ref: "João 4:14",
      before: "Aquele que beber da água que eu lhe der nunca terá ",
      answer: "sede",
      after: "; ela se fará nele fonte de água para a vida eterna.",
      options: ["sede", "fome", "medo", "frio"],
    },
    10: {
      ref: "João 10:11",
      before: "Eu sou o bom ",
      answer: "pastor",
      after: "; o bom pastor dá a vida pelas ovelhas.",
      options: ["pastor", "rei", "mestre", "servo"],
    },
    16: {
      ref: "João 16:33",
      before: "No mundo tereis aflições, mas tende bom ânimo: eu ",
      answer: "venci",
      after: " o mundo.",
      options: ["venci", "amei", "criei", "julguei"],
    },
  },
  connect: {
    5: {
      title: "Ligue — a cura em Betesda",
      sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Betesda", b: "tanque de cinco alpendres" },
        { a: "38 anos", b: "tempo do homem enfermo" },
        { a: "'Levanta-te'", b: "ordem de Jesus ao paralítico" },
        { a: "Sábado", b: "dia em que houve a cura" },
      ],
    },
    11: {
      title: "Ligue — a ressurreição de Lázaro",
      sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Lázaro", b: "amigo que morreu e ressuscitou" },
        { a: "Betânia", b: "aldeia de Marta e Maria" },
        { a: "'Vem para fora'", b: "clamor de Jesus ao túmulo" },
        { a: "Quatro dias", b: "tempo de Lázaro sepultado" },
      ],
    },
    17: {
      title: "Ligue — a oração sacerdotal",
      sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "'Que todos sejam um'", b: "pedido pela unidade dos seus" },
        { a: "Vida eterna", b: "conhecer o único Deus verdadeiro" },
        { a: "Glória", b: "a que o Pai tinha antes do mundo" },
        { a: "Chegou a hora", b: "o momento de Jesus ser glorificado" },
      ],
    },
  },
  boss: {
    questions: [
      { question: "Qual foi o primeiro sinal de Jesus no Evangelho de João?", options: ["Transformar água em vinho em Caná", "Multiplicar pães", "Curar um leproso", "Andar sobre o mar"], correct: "Transformar água em vinho em Caná" },
      { question: "O que Jesus disse a Nicodemos ser necessário?", options: ["Nascer de novo", "Jejuar quarenta dias", "Guardar toda a lei", "Ser circuncidado"], correct: "Nascer de novo" },
      { question: "A quem Jesus ressuscitou em Betânia?", options: ["Lázaro", "João", "Estêvão", "Jairo"], correct: "Lázaro" },
      { question: "Qual foi a última palavra de Jesus na cruz em João?", options: ["'Está consumado'", "'Tenho sede'", "'Pai, em tuas mãos'", "'Por que me desamparaste'"], correct: "'Está consumado'" },
      { question: "O que Tomé exclamou ao ver Jesus ressurreto?", options: ["'Senhor meu e Deus meu'", "'Tu és o Cristo'", "'Onde estavas?'", "'Não posso crer'"], correct: "'Senhor meu e Deus meu'" },
    ],
    story: {
      open: "A Sombra da Morte se ergue, mas eu sou a luz, e as trevas não prevaleceram. Ergue-te comigo.",
      turns: [
        { ask: "A Sombra diz que não há vida. Declara o Verbo!", hit: "'No princípio era o Verbo' — a luz rompe as trevas! ✨", miss: "Não recues; a luz virá." },
        { ask: "Ela seca toda a alegria. Transforma a água!", hit: "Água em vinho — a festa recomeça! 🍷", miss: "Espera o sinal." },
        { ask: "Ela oferece só fome. Reparte o pão!", hit: "'Eu sou o pão da vida' — a fome se rende! 🍞", miss: "Firma-te ainda." },
        { ask: "Ela sela o túmulo. Chama Lázaro!", hit: "'Lázaro, vem para fora!' — a morte solta o preso! ⛓️", miss: "A voz há de ecoar." },
        { ask: "Ela aponta a cruz como fim. Fala da manhã!", hit: "O túmulo vazio — golpe final, a Vida ressurge! 🌅", miss: "A pedra ainda há de rolar." },
      ],
      win: "À beira-mar Ele repartiu o pão outra vez: a Sombra da Morte foi vencida pela Vida.",
      winHero: "A morte não teve a palavra final! 🙌",
    },
  },
};
