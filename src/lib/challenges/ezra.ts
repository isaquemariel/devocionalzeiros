import type { BookChallenges } from "@/lib/rpgChallengeContent";

// Esdras (10 caps). Ciclo (c-1)%6: 0=order,1=wordsearch,2=crossword,3=complete,4=connect,5=quiz.
// Cap.10 (último) = boss. Slots: 1=order, 2=wordsearch, 3=crossword, 4=complete,
// 5=connect, 6=quiz(pula), 7=order, 8=wordsearch, 9=crossword, 10=boss.
export const EZRA_CH: BookChallenges = {
  order: {
    1: {
      title: "Ordene: o decreto de Ciro", sub: "Toque nas cartas na sequência certa.", verse: 11,
      win: "🎉 O caminho de volta em ordem!",
      items: [
        { d: 1, em: "📜", l: "Ciro proclama o decreto de retorno" },
        { d: 2, em: "🔥", l: "Deus desperta o espírito dos líderes" },
        { d: 3, em: "🏺", l: "Devolvem os utensílios de ouro do templo" },
        { d: 4, em: "🧳", l: "Os exilados partem rumo a Jerusalém" },
      ],
    },
    7: {
      title: "Ordene: a chegada de Esdras", sub: "Toque nas cartas na sequência certa.", verse: 28,
      win: "🎉 O escriba pronto para ensinar!",
      items: [
        { d: 1, em: "📖", l: "Esdras, escriba hábil na Lei de Moisés" },
        { d: 2, em: "📜", l: "O rei Artaxerxes lhe concede o pedido" },
        { d: 3, em: "🧳", l: "Esdras sobe da Babilônia a Jerusalém" },
        { d: 4, em: "🙌", l: "Prepara o coração para ensinar a Lei" },
      ],
    },
  },
  wordsearch: {
    2: {
      title: "Caça-palavras — Os que retornaram",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["ZOROBABEL", "JESUA", "EXILADOS", "LEVITAS", "CANTORES", "JUDÁ"],
    },
    8: {
      title: "Caça-palavras — A jornada de Esdras",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["ESDRAS", "JEJUM", "VIAGEM", "TESOURO", "PRATA", "OURO"],
    },
  },
  crossword: {
    3: {
      title: "Palavra cruzada — O altar reerguido",
      grid: ["ALTAR", "L....", "I....", "C....", "E....", "R....", "C....", "E...."],
      across: ["→ Reerguido primeiro para os sacrifícios (5)"],
      down: ["↓ Base sobre a qual se levanta o templo (8)"],
    },
    9: {
      title: "Palavra cruzada — A confissão de Esdras",
      grid: ["PECADO", "R.....", "A.....", "N.....", "T.....", "O....."],
      across: ["→ A transgressão que Esdras confessa (6)"],
      down: ["↓ Choro e lamento do povo arrependido (6)"],
    },
  },
  complete: {
    4: {
      ref: "Esdras 4:24",
      before: "Então cessou a ",
      answer: "obra",
      after: " da casa de Deus, que está em Jerusalém.",
      options: ["obra", "festa", "viagem", "carta"],
    },
  },
  connect: {
    5: {
      title: "Ligue — A obra recomeça",
      sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Ageu", b: "profeta que anima a reconstrução" },
        { a: "Zacarias", b: "profeta filho de Ido" },
        { a: "Tatenai", b: "governador que questiona a obra" },
        { a: "Dario", b: "rei que confirma o decreto de Ciro" },
      ],
    },
  },
  boss: {
    questions: [
      { question: "Qual rei proclamou o decreto que permitiu o retorno dos exilados?", options: ["Ciro", "Nabucodonosor", "Faraó", "Herodes"], correct: "Ciro" },
      { question: "O que o povo voltou para reconstruir em Jerusalém?", options: ["O templo", "As muralhas da cidade", "O palácio do rei", "Uma estrada"], correct: "O templo" },
      { question: "Quem tentou paralisar a obra da reconstrução?", options: ["Os povos vizinhos da terra", "Os egípcios", "Os filisteus", "Os romanos"], correct: "Os povos vizinhos da terra" },
      { question: "Quem foi o escriba que subiu para ensinar a Lei ao povo?", options: ["Esdras", "Neemias", "Moisés", "Elias"], correct: "Esdras" },
      { question: "Do que o povo se arrependeu ao fim do livro?", options: ["Dos casamentos com mulheres estrangeiras", "Da idolatria do bezerro de ouro", "De murmurar no deserto", "De adorar Baal"], correct: "Dos casamentos com mulheres estrangeiras" },
    ],
    story: {
      open: "Não temas os adversários da obra; eu desperto reis e derrubo muralhas de oposição.",
      turns: [
        { ask: "Levantei o coração de Ciro para libertar o meu povo.", hit: "O decreto rompe as correntes! 📜", miss: "Confia — eu abro o caminho de volta." },
        { ask: "Reergam o altar e lancem os alicerces do templo.", hit: "O alicerce está firme! 🧱", miss: "Não desanimes; a base se assenta." },
        { ask: "Os inimigos vêm para paralisar a construção.", hit: "A oposição é vencida! 🛡️", miss: "Resiste, a obra não cairá." },
        { ask: "A casa está pronta — dediquem-na com alegria.", hit: "O templo é consagrado! 🎶", miss: "Persevera até a dedicação." },
        { ask: "Ensinem a minha Lei e voltem-se de coração.", hit: "Golpe final — o povo se arrepende! 🙏", miss: "Volta a mim, e eu te sararei." },
      ],
      win: "Do exílio ao louvor: a casa foi reconstruída e a Palavra restaurou o povo.",
      winHero: "A obra venceu os adversários! 🙌",
    },
  },
};
