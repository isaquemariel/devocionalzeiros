import type { BookChallenges } from "@/lib/rpgChallengeContent";

// Daniel (12 caps). Ciclo por capítulo: (c-1)%6 → 0 order, 1 wordsearch, 2 crossword,
// 3 complete, 4 connect, 5 quiz (nada). Cap.6 cai no quiz. Cap.12 (último) = boss.
export const DANIEL_CH: BookChallenges = {
  order: {
    1: {
      title: "Ordene: Daniel e os amigos na corte", sub: "Toque nas cartas na sequência certa.", verse: 21,
      win: "🎉 A fidelidade em ordem!",
      items: [
        { d: 1, em: "🏰", l: "Jovens de Judá são levados ao palácio da Babilônia" },
        { d: 2, em: "🥗", l: "Daniel pede só legumes e água, sem se contaminar" },
        { d: 3, em: "💪", l: "Após dez dias, parecem mais saudáveis que os outros" },
        { d: 4, em: "📚", l: "Deus lhes dá sabedoria dez vezes maior que a dos sábios" },
      ],
    },
    7: {
      title: "Ordene: a visão das feras e o Ancião de Dias", sub: "Toque nas cartas na sequência certa.", verse: 28,
      win: "🎉 A visão do Reino eterno em ordem!",
      items: [
        { d: 1, em: "🦁", l: "Sobe do mar o leão com asas de águia" },
        { d: 2, em: "🐻", l: "Surge o urso com três costelas na boca" },
        { d: 3, em: "🐆", l: "Aparece o leopardo com quatro asas e cabeças" },
        { d: 4, em: "👑", l: "O Ancião de Dias se assenta para julgar" },
      ],
    },
  },
  wordsearch: {
    2: {
      title: "Caça-palavras — o sonho da estátua",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["SONHO", "ESTATUA", "OURO", "FERRO", "BARRO", "PEDRA"],
    },
    8: {
      title: "Caça-palavras — o carneiro e o bode",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["CARNEIRO", "BODE", "CHIFRE", "GABRIEL", "VISAO", "ANJO"],
    },
  },
  crossword: {
    3: {
      title: "Palavra cruzada — a fornalha ardente",
      grid: ["FORNALHA", "O.......", "G.......", "O......."],
      across: ["→ O forno aceso sete vezes mais que o normal (8)"],
      down: ["↓ O que ardia mas não queimou os três amigos (4)"],
    },
    9: {
      title: "Palavra cruzada — as setenta semanas",
      grid: ["SETENTA", "E......", "M......", "A......", "N......", "A......", "S......"],
      across: ["→ O número de semanas decretadas na visão (7)"],
      down: ["↓ As setenta ___ até o Ungido (7)"],
    },
  },
  complete: {
    4: {
      ref: "Daniel 4:33",
      before: "No mesmo instante se cumpriu a palavra sobre Nabucodonosor; foi tirado dentre os homens e comia ",
      answer: "erva",
      after: " como os bois, e o seu corpo foi molhado do orvalho do céu.",
      options: ["erva", "pão", "frutas", "mel"],
    },
    10: {
      ref: "Daniel 10:19",
      before: "E disse: Não temas, homem muito ",
      answer: "amado",
      after: "; paz seja contigo; esforça-te, sim, esforça-te.",
      options: ["amado", "forte", "justo", "fiel"],
    },
  },
  connect: {
    5: {
      title: "Ligue — a escrita na parede",
      sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Belsazar", b: "o rei da festa profana" },
        { a: "MENE, TEQUEL, PARSIM", b: "a escrita na parede" },
        { a: "Daniel", b: "interpretou o mistério" },
        { a: "Dario, o medo", b: "tomou o reino naquela noite" },
      ],
    },
    11: {
      title: "Ligue — os reis do Norte e do Sul",
      sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Rei do Sul", b: "o poder do Egito" },
        { a: "Rei do Norte", b: "o poder da Síria" },
        { a: "Aliança pelo casamento", b: "não há de prevalecer" },
        { a: "O rei arrogante", b: "exalta-se sobre todo deus" },
      ],
    },
  },
  boss: {
    questions: [
      { question: "Na Babilônia, o que Daniel pediu para comer em vez da porção do rei?", options: ["Legumes e água", "Carne e vinho", "Pão e mel", "Frutas e leite"], correct: "Legumes e água" },
      { question: "De que era feita a cabeça da estátua no sonho de Nabucodonosor?", options: ["De ouro", "De prata", "De ferro", "De barro"], correct: "De ouro" },
      { question: "Quantos amigos de Daniel foram lançados na fornalha ardente?", options: ["Três", "Dois", "Quatro", "Sete"], correct: "Três" },
      { question: "Quem interpretou a escrita 'MENE, MENE, TEQUEL, PARSIM'?", options: ["Daniel", "Belsazar", "Gabriel", "Dario"], correct: "Daniel" },
      { question: "O que Deus enviou para fechar a boca dos leões na cova?", options: ["Um anjo", "Fogo", "Uma tempestade", "Um trovão"], correct: "Um anjo" },
    ],
    story: {
      open: "Não temas a cova nem a boca dos leões; o teu Deus, a quem serves continuamente, te livrará.",
      turns: [
        { ask: "Recusaste a mesa do rei para não te contaminar.", hit: "A fidelidade te fortalece! 🥗", miss: "Firme-te, servo — eu te sustento." },
        { ask: "Revelaste o sonho e a estátua que ninguém sabia.", hit: "A sabedoria do céu resplandece! 🗿", miss: "Não temas; a revelação é minha." },
        { ask: "Teus amigos andaram no meio do fogo comigo.", hit: "O quarto homem os guardou! 🔥", miss: "Ergue-te; o fogo não queima os meus." },
        { ask: "Leste na parede a sentença dos reinos.", hit: "O mistério foi desvendado! ✍️", miss: "Espera — a palavra se cumprirá." },
        { ask: "Oraste de janelas abertas rumo a Jerusalém.", hit: "Golpe final — a boca dos leões se fecha! 🦁", miss: "A oração não volta vazia." },
      ],
      win: "Ao amanhecer, Daniel saiu ileso da cova, e o Deus vivo foi exaltado por todo o reino.",
      winHero: "Os leões se calaram — o Deus vivo me livrou! 🙌",
    },
  },
};
