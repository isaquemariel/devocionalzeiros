import type { BookChallenges } from "@/lib/rpgChallengeContent";

// Jonas (4 caps). Ciclo: 1=ordenar, 2=caça-palavras, 3=cruzada, 4=boss (último).
export const JONAH_CH: BookChallenges = {
  order: {
    1: {
      title: "Ordene: a fuga de Jonas", sub: "Toque nas cartas na sequência certa.", verse: 17,
      win: "🎉 A fuga terminou no fundo do mar!",
      items: [
        { d: 1, em: "🧭", l: "Deus manda Jonas pregar em Nínive" },
        { d: 2, em: "🚢", l: "Jonas foge num navio para Társis" },
        { d: 3, em: "⛈️", l: "Uma grande tempestade se levanta" },
        { d: 4, em: "🌊", l: "Os marinheiros lançam Jonas ao mar" },
      ],
    },
  },
  wordsearch: {
    2: {
      title: "Caça-palavras — O grande peixe e a oração",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["JONAS", "PEIXE", "VENTRE", "ORAÇÃO", "MAR", "SALVAÇÃO"],
    },
  },
  crossword: {
    3: {
      title: "Palavra cruzada — Nínive se arrepende",
      grid: ["JEJUM", "O....", "N....", "A....", "S...."],
      across: ["→ Sinal do arrependimento de Nínive (5)"],
      down: ["↓ O profeta enviado a Nínive (5)"],
    },
  },
  boss: {
    questions: [
      { question: "Para qual cidade Deus mandou Jonas pregar?", options: ["Nínive", "Babilônia", "Jerusalém", "Társis"], correct: "Nínive" },
      { question: "Para onde Jonas fugiu de navio?", options: ["Társis", "Nínive", "Egito", "Sidom"], correct: "Társis" },
      { question: "O que engoliu Jonas no mar?", options: ["Um grande peixe", "Uma baleia branca", "Um redemoinho", "Uma tempestade"], correct: "Um grande peixe" },
      { question: "Quantos dias e noites Jonas ficou no ventre do peixe?", options: ["Três", "Sete", "Um", "Quarenta"], correct: "Três" },
      { question: "O que fez secar a planta que abrigava Jonas?", options: ["Um verme", "O fogo", "O vento", "A chuva"], correct: "Um verme" },
    ],
    story: {
      open: "Não fujas mais da minha voz; até o abismo obedece ao meu chamado.",
      turns: [
        { ask: "Buscaste fugir de mim rumo a Társis.", hit: "Não há esconderijo longe de Deus! 🚢", miss: "Volta o rosto para mim." },
        { ask: "As ondas se ergueram contra a tua rota.", hit: "A tempestade se aquieta! ⛈️", miss: "Firme-te no meio do mar." },
        { ask: "Do ventre do peixe clamaste a mim.", hit: "A oração sobe das profundezas! 🐟", miss: "Ergue a tua voz outra vez." },
        { ask: "Levaste a minha palavra a Nínive.", hit: "A cidade se arrepende! 🙇", miss: "Anuncia sem temer." },
        { ask: "Aprende a misericórdia sob a sombra da planta.", hit: "Golpe final — a graça alcança todos! 🌿", miss: "Compreende o meu amor." },
      ],
      win: "Do fundo do mar à cidade poupada, a misericórdia de Deus prevaleceu.",
      winHero: "A fuga virou missão cumprida! 🙌",
    },
  },
};
