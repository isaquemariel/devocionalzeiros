import type { BookChallenges } from "@/lib/rpgChallengeContent";

// Hebreus (13 caps). Ciclo (c-1)%6: 0=ordenar,1=caça,2=cruzada,3=completar,4=ligar,5=quiz.
// Caps 6 e 12 = quiz por IA (nada aqui). Cap 13 (último) = boss.
export const HEBREWS_CH: BookChallenges = {
  order: {
    1: {
      title: "Ordene: o Filho superior aos anjos", sub: "Toque nas cartas na sequência certa.", verse: 4,
      win: "🎉 O Filho é maior que os anjos!",
      items: [
        { d: 1, em: "🗣️", l: "Outrora Deus falou pelos profetas" },
        { d: 2, em: "👑", l: "Nestes últimos dias falou-nos pelo Filho" },
        { d: 3, em: "✝️", l: "O Filho fez a purificação dos pecados" },
        { d: 4, em: "🌟", l: "Assentou-se à direita da Majestade, acima dos anjos" },
      ],
    },
    7: {
      title: "Ordene: Melquisedeque e o dízimo", sub: "Toque nas cartas na sequência certa.", verse: 17,
      win: "🎉 Sacerdote para sempre segundo Melquisedeque!",
      items: [
        { d: 1, em: "🍞", l: "Melquisedeque, rei de Salém, encontra Abraão" },
        { d: 2, em: "🙌", l: "Abençoa Abraão em nome do Deus Altíssimo" },
        { d: 3, em: "💰", l: "Abraão lhe dá o dízimo de tudo" },
        { d: 4, em: "♾️", l: "Cristo é sacerdote eterno segundo essa ordem" },
      ],
    },
  },
  wordsearch: {
    2: {
      title: "Caça-palavras — Tão grande salvação",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["JESUS", "MORTE", "IRMÃOS", "GLÓRIA", "HONRA", "SALVAÇÃO"],
    },
    8: {
      title: "Caça-palavras — A nova aliança",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["NOVA", "ALIANÇA", "MEDIADOR", "CORAÇÃO", "LEIS", "PERDÃO"],
    },
  },
  crossword: {
    3: {
      title: "Palavra cruzada — Fiel sobre a casa",
      grid: ["CRISTO", "A.....", "S.....", "A....."],
      across: ["→ Ele é fiel como Filho sobre a casa de Deus (6)"],
      down: ["↓ Cristo é digno de mais glória do que quem edifica a ___ (4)"],
    },
    9: {
      title: "Palavra cruzada — Sem derramamento não há remissão",
      grid: ["SANGUE", "A.....", "N.....", "T.....", "O....."],
      across: ["→ Sem derramamento dele não há remissão (6)"],
      down: ["↓ Cristo entrou uma vez por todas no Lugar ___ (5)"],
    },
  },
  complete: {
    4: {
      ref: "Hebreus 4:14",
      before: "Visto que temos um grande sumo",
      answer: "sacerdote",
      after: "que penetrou nos céus, Jesus, o Filho de Deus, retenhamos firme a nossa confissão.",
      options: ["sacerdote", "profeta", "rei", "juiz"],
    },
    10: {
      ref: "Hebreus 10:12",
      before: "Mas este, havendo oferecido um único",
      answer: "sacrifício",
      after: "pelos pecados, assentou-se para sempre à direita de Deus.",
      options: ["sacrifício", "cordeiro", "altar", "templo"],
    },
  },
  connect: {
    5: {
      title: "Ligue — O Sumo Sacerdote que compadece",
      sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Melquisedeque", b: "ordem do sacerdócio de Cristo" },
        { a: "Arão", b: "sacerdote chamado por Deus" },
        { a: "Obediência", b: "aprendida pelo que padeceu" },
        { a: "Leite", b: "alimento dos iniciantes na fé" },
      ],
    },
    11: {
      title: "Ligue — A galeria da fé",
      sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Abel", b: "ofereceu sacrifício mais excelente" },
        { a: "Noé", b: "preparou a arca com temor" },
        { a: "Abraão", b: "partiu sem saber para onde ia" },
        { a: "Moisés", b: "preferiu ser maltratado com o povo" },
      ],
    },
  },
  boss: {
    questions: [
      { question: "No capítulo 1, Cristo é apresentado como superior a quem?", options: ["Aos anjos", "Aos profetas", "Aos reis", "Aos apóstolos"], correct: "Aos anjos" },
      { question: "Qual figura, sem princípio de dias nem fim de vida, retrata o sacerdócio de Cristo?", options: ["Melquisedeque", "Arão", "Levi", "Abraão"], correct: "Melquisedeque" },
      { question: "Complete: 'Sem derramamento de ___ não há remissão.'", options: ["sangue", "água", "fogo", "óleo"], correct: "sangue" },
      { question: "Como Hebreus 11 define a fé?", options: ["A certeza das coisas que se esperam", "Um sentimento passageiro", "A obediência à lei", "O temor do castigo"], correct: "A certeza das coisas que se esperam" },
      { question: "Ao correr a carreira (cap. 12), para quem devemos olhar?", options: ["Para Jesus, autor e consumador da fé", "Para os anjos", "Para Moisés", "Para os profetas"], correct: "Para Jesus, autor e consumador da fé" },
    ],
    story: {
      open: "Deixa todo peso e o pecado que tão de perto te assedia — corre para mim.",
      turns: [
        { ask: "O Filho é superior a todos os anjos.", hit: "O peso da dúvida cai! ⭐", miss: "Ergue os olhos, filho — eu falo pelo Filho." },
        { ask: "Tens um grande Sumo Sacerdote que se compadece.", hit: "O peso da culpa cede! ✝️", miss: "Chega com confiança ao trono da graça." },
        { ask: "Sem derramamento de sangue não há remissão.", hit: "O peso do pecado se rompe! 🩸", miss: "A minha aliança não falha." },
        { ask: "A fé é a certeza das coisas que se esperam.", hit: "O peso do medo se desfaz! 🔥", miss: "Crê, e verás a recompensa." },
        { ask: "Corre a carreira olhando somente para Jesus.", hit: "Golpe final — o Peso é vencido! 🏃‍♂️", miss: "Não desfaleças; o galardão te espera." },
      ],
      win: "O Peso que Assedia foi lançado fora, e a carreira terminou na presença do Rei.",
      winHero: "Corri com perseverança e cheguei a Jesus! 🙌",
    },
  },
};
