import type { BookChallenges } from "@/lib/rpgChallengeContent";

// Miquéias (7 caps). Ciclo: 1=ordenar, 2=caça-palavras, 3=cruzada,
// 4=completar, 5=ligar, 6=quiz (IA), 7=boss (último). Chefe: "O Invasor Assírio".
export const MICAH_CH: BookChallenges = {
  order: {
    1: {
      title: "Ordene: o juízo desce sobre Samaria", sub: "Toque nas cartas na sequência certa.", verse: 16,
      win: "🎉 O juízo anunciado, em ordem!",
      items: [
        { d: 1, em: "👁️", l: "O Senhor sai do seu santo templo" },
        { d: 2, em: "⛰️", l: "Os montes se derretem sob seus pés" },
        { d: 3, em: "🪨", l: "Samaria vira um montão de pedras" },
        { d: 4, em: "😭", l: "Miquéias lamenta, descalço e nu" },
      ],
    },
  },
  wordsearch: {
    2: {
      title: "Caça-palavras — os que tramam o mal",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["COBICA", "CAMPOS", "CASAS", "JACO", "REBANHO", "REI"],
    },
  },
  crossword: {
    3: {
      title: "Palavra cruzada — líderes que aborrecem o direito",
      grid: ["JUSTICA", "U......", "I......", "Z......", "E......", "S......"],
      across: ["→ O que os líderes de Israel aborreciam (7)"],
      down: ["↓ Os que julgavam por suborno (6)"],
    },
  },
  complete: {
    4: {
      ref: "Miquéias 4:3",
      before: "e converterão as suas ",
      answer: "espadas",
      after: " em relhas de arado, e as suas lanças em foices",
      options: ["espadas", "lanças", "foices", "escudos"],
    },
  },
  connect: {
    5: {
      title: "Ligue — a promessa de Belém",
      sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Belém Efrata", b: "pequena entre os milhares de Judá" },
        { a: "O que dela sairá", b: "regente em Israel" },
        { a: "Suas origens", b: "desde os dias da eternidade" },
        { a: "Este será", b: "a nossa paz" },
      ],
    },
  },
  boss: {
    questions: [
      { question: "De onde sairia o governador de Israel, segundo Miquéias?", options: ["Belém Efrata", "Jerusalém", "Samaria", "Hebrom"], correct: "Belém Efrata" },
      { question: "O Senhor pede: praticar a justiça, amar a misericórdia e o quê?", options: ["Andar humildemente com Deus", "Oferecer mil carneiros", "Construir altares", "Jejuar sempre"], correct: "Andar humildemente com Deus" },
      { question: "Qual cidade seria feita um montão de pedras?", options: ["Samaria", "Belém", "Nínive", "Babilônia"], correct: "Samaria" },
      { question: "Em que as nações converteriam suas espadas, no monte do Senhor?", options: ["Em relhas de arado", "Em escudos", "Em coroas", "Em correntes"], correct: "Em relhas de arado" },
      { question: "O que Deus faz com os pecados do seu povo, no fim do livro?", options: ["Lança-os nas profundezas do mar", "Escreve-os num livro", "Esquece-os no deserto", "Queima-os no altar"], correct: "Lança-os nas profundezas do mar" },
    ],
    story: {
      open: "O assírio pisa a minha terra; mas eis que de Belém levanto o vosso Pastor. Erguei-vos!",
      turns: [
        { ask: "O invasor cerca as cidades de Judá.", hit: "Samaria caiu, mas o remanescente resiste! 💥", miss: "Firma-te; o Senhor é a tua defesa." },
        { ask: "Ele zomba: 'onde está o vosso Deus?'", hit: "O Senhor sai do seu lugar e desce! ⛰️", miss: "Não temas a zombaria do inimigo." },
        { ask: "As espadas do assírio brilham no vale.", hit: "Elas se tornam relhas de arado! ✝️", miss: "Espera na paz que vem do alto." },
        { ask: "O invasor exige sacrifícios e mil carneiros.", hit: "Justiça, misericórdia e humildade o derrotam! ⚖️", miss: "Volta ao que o Senhor pede de ti." },
        { ask: "O assírio ergue o seu último ataque.", hit: "Golpe final — de Belém vem a nossa paz! 👑", miss: "A promessa do Pastor não falha." },
      ],
      win: "O invasor foi lançado por terra; e os pecados, nas profundezas do mar.",
      winHero: "De Belém veio a paz — o inimigo caiu! 🙌",
    },
  },
};
