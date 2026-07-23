import type { BookChallenges } from "@/lib/rpgChallengeContent";

// Eclesiastes (12 caps). Ciclo (c-1)%6: 1/7=ordenar, 2/8=caça-palavras,
// 3/9=cruzada, 4/10=completar, 5/11=ligar, 6=quiz(IA), 12=boss (último).
export const ECCLESIASTES_CH: BookChallenges = {
  order: {
    1: {
      title: "Ordene: a busca do Pregador", sub: "Toque nas cartas na sequência certa.", verse: 18,
      win: "🎉 A vaidade de tudo, posta em ordem!",
      items: [
        { d: 1, em: "🗣️", l: "O Pregador, filho de Davi, começa a falar" },
        { d: 2, em: "♾️", l: "'Vaidade de vaidades, tudo é vaidade'" },
        { d: 3, em: "🌅", l: "O sol nasce e se põe; tudo se repete" },
        { d: 4, em: "📚", l: "Buscou a sabedoria — e achou dor e fadiga" },
      ],
    },
    7: {
      title: "Ordene: os ditos do sábio", sub: "Toque nas cartas na sequência certa.", verse: 29,
      win: "🎉 A sabedoria de Eclesiastes 7, em ordem!",
      items: [
        { d: 1, em: "🏷️", l: "'Melhor é o bom nome que o bom perfume'" },
        { d: 2, em: "😢", l: "Melhor a casa do luto que a do banquete" },
        { d: 3, em: "🛡️", l: "A sabedoria protege como o dinheiro" },
        { d: 4, em: "🙏", l: "Considera a obra de Deus e teme-o" },
      ],
    },
  },
  wordsearch: {
    2: {
      title: "Caça-palavras — prazeres e trabalho",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["PRAZER", "VINHO", "TRABALHO", "RIQUEZA", "VAIDADE", "SABEDORIA"],
    },
    8: {
      title: "Caça-palavras — o sábio e o rei",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["REI", "SABIO", "OBEDECER", "ROSTO", "MORTE", "TEMOR"],
    },
  },
  crossword: {
    3: {
      title: "Palavra cruzada — há tempo para tudo",
      grid: ["TEMPO", "U....", "D....", "O...."],
      across: ["→ Para tudo há um ___ debaixo do céu (5)"],
      down: ["↓ Para ___ o que se faz há uma hora certa (4)"],
    },
    9: {
      title: "Palavra cruzada — os vivos e a vida",
      grid: ["VIVOS", "I....", "D....", "A...."],
      across: ["→ Os ___ sabem que hão de morrer (5)"],
      down: ["↓ Goza a ___ com quem amas, todos os teus dias (4)"],
    },
  },
  complete: {
    4: {
      ref: "Eclesiastes 4:9",
      before: "Melhores são dois do que ",
      answer: "um",
      after: ", porque têm melhor paga do seu trabalho.",
      options: ["um", "três", "muitos", "poucos"],
    },
    10: {
      ref: "Eclesiastes 10:8",
      before: "Aquele que abre uma ",
      answer: "cova",
      after: ", nela cairá.",
      options: ["cova", "porta", "vala", "janela"],
    },
  },
  connect: {
    5: {
      title: "Ligue — diante da casa de Deus",
      sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Casa de Deus", b: "guarda o teu pé ao entrar" },
        { a: "Voto a Deus", b: "cumpre sem demora" },
        { a: "Amante do dinheiro", b: "nunca se farta dele" },
        { a: "Diante de Deus", b: "sejam poucas as palavras" },
      ],
    },
    11: {
      title: "Ligue — semeia e alegra-te",
      sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "O teu pão", b: "lança sobre as águas" },
        { a: "De manhã", b: "semeia a tua semente" },
        { a: "O jovem", b: "alegra-te na tua mocidade" },
        { a: "A luz", b: "é doce aos olhos" },
      ],
    },
  },
  boss: {
    questions: [
      { question: "Como se resume a mensagem de abertura de Eclesiastes?", options: ["'Vaidade de vaidades, tudo é vaidade'", "'No princípio criou Deus'", "'O Senhor é o meu pastor'", "'Bem-aventurado o homem'"], correct: "'Vaidade de vaidades, tudo é vaidade'" },
      { question: "Quem é o 'Pregador', filho de Davi, rei em Jerusalém?", options: ["Salomão", "Roboão", "Ezequias", "Josias"], correct: "Salomão" },
      { question: "Segundo Eclesiastes 3, para tudo há um ___ debaixo do céu.", options: ["tempo", "lugar", "preço", "rei"], correct: "tempo" },
      { question: "De que o Pregador manda lembrar nos dias da mocidade?", options: ["Do teu Criador", "Da tua riqueza", "Dos teus prazeres", "Da tua fama"], correct: "Do teu Criador" },
      { question: "Qual é a conclusão de todo o livro (Ec 12:13)?", options: ["Teme a Deus e guarda os seus mandamentos", "Ajunta muitas riquezas", "Busca somente o prazer", "Segue o teu próprio coração"], correct: "Teme a Deus e guarda os seus mandamentos" },
    ],
    story: {
      open: "Não temas a Vaidade que tudo esvazia; a sabedoria que vem de mim há de vencer o vazio.",
      turns: [
        { ask: "A Vaidade sussurra que tudo é em vão.", hit: "Mas há tempo para tudo debaixo do céu! ⏳", miss: "Não te deixes vencer pelo vazio." },
        { ask: "Ela te oferece prazeres e riquezas sem fim.", hit: "Tudo isso é vaidade e correr atrás do vento! 💨", miss: "Firma o coração, não te enganes." },
        { ask: "A Vaidade te quer sozinho e sem forças.", hit: "Melhores são dois do que um — o cordão triplo não se rompe! 🪢", miss: "Ergue-te, não caminhes só." },
        { ask: "Ela zomba: 'esqueceste o teu Criador?'", hit: "Lembra-te do Criador nos dias da tua mocidade! 🌱", miss: "Volta o teu olhar para o alto." },
        { ask: "Resta o golpe final contra o vazio.", hit: "Teme a Deus e guarda os mandamentos — eis o dever do homem! 👑", miss: "A conclusão de tudo ainda há de vencer." },
      ],
      win: "A Vaidade se desfez como o vento, e permaneceu o temor do Senhor.",
      winHero: "O vazio foi vencido pela sabedoria! 🙌",
    },
  },
};
