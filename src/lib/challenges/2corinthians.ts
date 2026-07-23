import type { BookChallenges } from "@/lib/rpgChallengeContent";

// 2 Coríntios (13 caps). Ciclo (c-1)%6: 0=order,1=wordsearch,2=crossword,
// 3=complete,4=connect,5=quiz(nada). Cap.13 (último) = boss "O Espinho na Carne".
export const CORINTHIANS2_CH: BookChallenges = {
  order: {
    1: {
      title: "Ordene: o Deus de toda consolação", sub: "Toque nas cartas na sequência certa.", verse: 20,
      win: "🎉 Nele há o 'Sim' e o 'Amém'!",
      items: [
        { d: 1, em: "✉️", l: "Paulo saúda a igreja de Corinto" },
        { d: 2, em: "🙌", l: "Bendito seja o Deus de toda consolação" },
        { d: 3, em: "🔥", l: "A grande tribulação sofrida na Ásia" },
        { d: 4, em: "✅", l: "Em Cristo, o 'Sim' e o 'Amém' de Deus" },
      ],
    },
    7: {
      title: "Ordene: a consolação por meio de Tito", sub: "Toque nas cartas na sequência certa.", verse: 13,
      win: "🎉 A tristeza segundo Deus gerou alegria!",
      items: [
        { d: 1, em: "😟", l: "Paulo sem descanso, aflito em toda parte" },
        { d: 2, em: "🤝", l: "Deus o consola com a chegada de Tito" },
        { d: 3, em: "🙏", l: "A tristeza segundo Deus gera arrependimento" },
        { d: 4, em: "😊", l: "Paulo se enche de alegria e confiança" },
      ],
    },
  },
  wordsearch: {
    2: {
      title: "Caça-palavras — o bom perfume de Cristo",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["PERFUME", "CRISTO", "TRIUNFO", "PERDÃO", "AROMA", "AMOR"],
    },
    8: {
      title: "Caça-palavras — a graça de contribuir",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["MACEDONIA", "OFERTA", "GRAÇA", "POBREZA", "RIQUEZA", "TITO"],
    },
  },
  crossword: {
    3: {
      title: "Palavra cruzada — o ministério do Espírito",
      grid: ["LIBERDADE", "E........", "T........", "R........", "A........"],
      across: ["→ Onde está o Espírito do Senhor, aí há... (9)"],
      down: ["↓ Ela mata, mas o Espírito vivifica (5)"],
    },
    9: {
      title: "Palavra cruzada — o dador alegre",
      grid: ["SEMEADOR", "E.......", "A.......", "R.......", "A......."],
      across: ["→ Quem espalha a semente para depois colher (8)"],
      down: ["↓ O campo onde se ceifa a colheita (5)"],
    },
  },
  complete: {
    4: {
      ref: "2 Coríntios 4:7",
      before: "Temos, porém, este tesouro em vasos de ",
      answer: "barro",
      after: ", para que a excelência do poder seja de Deus e não de nós.",
      options: ["barro", "ouro", "prata", "cristal"],
    },
    10: {
      ref: "2 Coríntios 10:5",
      before: "levando cativo todo ",
      answer: "pensamento",
      after: " à obediência de Cristo.",
      options: ["pensamento", "desejo", "coração", "caminho"],
    },
  },
  connect: {
    5: {
      title: "Ligue — a nova criatura e a reconciliação",
      sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Nova criatura", b: "as coisas velhas já passaram" },
        { a: "Embaixador", b: "suplica em nome de Cristo" },
        { a: "Por fé", b: "e não por vista andamos" },
        { a: "Casa eterna", b: "não feita por mãos, nos céus" },
      ],
    },
    11: {
      title: "Ligue — as marcas do apóstolo",
      sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Satanás", b: "disfarça-se em anjo de luz" },
        { a: "Cinco vezes", b: "quarenta açoites menos um" },
        { a: "Três vezes", b: "sofreu naufrágio no mar" },
        { a: "Damasco", b: "desceu num cesto pela muralha" },
      ],
    },
  },
  boss: {
    questions: [
      { question: "Como Paulo chama Deus no início da carta?", options: ["O Deus de toda consolação", "O Deus dos exércitos", "O Deus de Abraão", "O Deus escondido"], correct: "O Deus de toda consolação" },
      { question: "Onde está guardado o tesouro do evangelho?", options: ["Em vasos de barro", "Em cofres de ouro", "Em tábuas de pedra", "No templo"], correct: "Em vasos de barro" },
      { question: "O que é aquele que está em Cristo?", options: ["Nova criatura", "Um servo temporário", "Um estrangeiro", "Um juiz"], correct: "Nova criatura" },
      { question: "Como Deus ama aquele que contribui?", options: ["Ao que dá com alegria", "Ao que dá com tristeza", "Ao que dá por obrigação", "Ao que dá em segredo"], correct: "Ao que dá com alegria" },
      { question: "O que o Senhor respondeu a Paulo sobre o espinho na carne?", options: ["'A minha graça te basta'", "'Eu o removerei já'", "'Cala-te e espera'", "'Não te ouvirei'"], correct: "'A minha graça te basta'" },
    ],
    story: {
      open: "Não temas a fraqueza, filho; o meu poder se aperfeiçoa na tua debilidade.",
      turns: [
        { ask: "Recebe a consolação com que eu mesmo te consolo.", hit: "O consolo te fortalece! 🙌", miss: "Firma-te — eu não te deixo." },
        { ask: "Este tesouro guardo em vaso de barro.", hit: "O poder é de Deus, não teu! 🏺", miss: "Não desanimes; o vaso é meu." },
        { ask: "Eu te reconciliei comigo por Cristo.", hit: "Nova criatura vence! ✨", miss: "Ergue-te, coisa nova." },
        { ask: "Semeia com alegria e colherás com fartura.", hit: "A graça transborda! 🌾", miss: "Continua a semear." },
        { ask: "Este espinho não te vencerá.", hit: "Golpe final — a minha graça te basta! 💥", miss: "No fraco, forte eu te faço." },
      ],
      win: "O espinho permaneceu, mas a graça foi maior — e a fraqueza virou glória.",
      winHero: "Quando sou fraco, então sou forte! 🙌",
    },
  },
};
