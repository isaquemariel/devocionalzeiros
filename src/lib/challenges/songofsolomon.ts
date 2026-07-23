import type { BookChallenges } from "@/lib/rpgChallengeContent";

// Cantares (8 caps). Ciclo: 1=ordenar, 2=caça-palavras, 3=cruzada, 4=completar,
// 5=ligar, 6=quiz (IA), 7=ordenar, 8=boss (último).
export const SONG_CH: BookChallenges = {
  order: {
    1: {
      title: "Ordene: o despertar do amor", sub: "Toque nas cartas na sequência certa.", verse: 17,
      win: "🌿 O cântico começa em ternura!",
      items: [
        { d: 1, em: "💋", l: "'Beije-me com os beijos da tua boca'" },
        { d: 2, em: "🌞", l: "'Sou morena, porém formosa'" },
        { d: 3, em: "🐑", l: "Ela busca onde ele apascenta ao meio-dia" },
        { d: 4, em: "💚", l: "Louvores mútuos: 'és formoso, amado meu'" },
      ],
    },
    7: {
      title: "Ordene: o convite ao campo", sub: "Toque nas cartas na sequência certa.", verse: 13,
      win: "🍇 O amor floresce entre as vinhas!",
      items: [
        { d: 1, em: "👑", l: "Louvor à amada, dos pés à cabeça" },
        { d: 2, em: "💞", l: "'Eu sou do meu amado, e ele me deseja'" },
        { d: 3, em: "🏞️", l: "'Vem, saiamos ao campo', diz a amada" },
        { d: 4, em: "🌸", l: "Ver se florescem as vides; mandrágoras exalam perfume" },
      ],
    },
  },
  wordsearch: {
    2: {
      title: "Caça-palavras — O lírio dos vales",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["LÍRIO", "VALES", "ROSA", "VINHA", "RAPOSAS", "AMOR"],
    },
  },
  crossword: {
    3: {
      title: "Palavra cruzada — Busca pela cidade",
      grid: ["AMADO", "C....", "H....", "E....", "I...."],
      across: ["→ Aquele a quem a alma ama; ela o procura pela cidade à noite (5)"],
      down: ["↓ 'Achei aquele a quem ama a minha alma' — o que ela fez (5)"],
    },
  },
  complete: {
    4: {
      ref: "Cantares 4:7",
      before: "Tu és toda",
      answer: "formosa",
      after: ", querida minha, e em ti não há defeito.",
      options: ["formosa", "amável", "gentil", "serena"],
    },
  },
  connect: {
    5: {
      title: "Ligue — O sonho da amada", sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "O amado", b: "alvo e rubro" },
        { a: "Entre dez mil", b: "o mais notável" },
        { a: "As mãos dele", b: "gotejam mirra" },
        { a: "Os guardas", b: "tiraram-lhe o véu" },
      ],
    },
  },
  boss: {
    questions: [
      { question: "Como é descrito o amor em Cantares 8?", options: ["Forte como a morte", "Frágil como o vento", "Breve como a flor", "Frio como a neve"], correct: "Forte como a morte" },
      { question: "O que as muitas águas não podem fazer ao amor?", options: ["Apagá-lo", "Escondê-lo", "Comprá-lo", "Multiplicá-lo"], correct: "Apagá-lo" },
      { question: "Como a amada é chamada no capítulo 2?", options: ["O lírio dos vales", "A roseira do deserto", "O cedro do Líbano", "A oliveira do monte"], correct: "O lírio dos vales" },
      { question: "O que a amada procurava pela cidade à noite (cap. 3)?", options: ["O seu amado", "O seu rebanho", "A sua mãe", "A sua vinha"], correct: "O seu amado" },
      { question: "Que animais estragam as vinhas em flor (cap. 2)?", options: ["As raposas", "Os leões", "As gazelas", "As pombas"], correct: "As raposas" },
    ],
    story: {
      open: "Guardai a vinha do amor: as raposinhas espreitam entre as flores, mas o amor verdadeiro não se deixa roubar.",
      turns: [
        { ask: "Sela o amor como selo sobre o teu coração.", hit: "Forte como a morte — o selo se firma! 💗", miss: "Não temas; o amor te sustenta." },
        { ask: "Enxota as raposas que destroem as vinhas em flor.", hit: "A vinha está guardada! 🍇", miss: "Vigia outra vez, com mansidão." },
        { ask: "As muitas águas vêm apagar a chama.", hit: "As águas não a apagam! 🕊️", miss: "A chama resiste; persevera." },
        { ask: "És o lírio dos vales, entre os espinhos.", hit: "O lírio floresce puro! 🌿", miss: "Ergue-te, formosa, e floresce." },
        { ask: "Quiseram comprar o amor com riquezas.", hit: "Golpe final — o amor não se vende! 💞", miss: "Guarda o coração; espera." },
      ],
      win: "As raposas fugiram, e a vinha do amor permaneceu em flor — forte como a morte, casta como o lírio.",
      winHero: "O amor venceu, terno e inteiro! 🙌",
    },
  },
};
