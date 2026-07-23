import type { BookChallenges } from "@/lib/rpgChallengeContent";

// 2 Pedro (3 caps). Ciclo: 1=ordenar, 2=caça-palavras, 3=boss (último).
export const PETER2_CH: BookChallenges = {
  order: {
    1: {
      title: "Ordene: fé, monte e lâmpada", sub: "Toque nas cartas na sequência certa.", verse: 21,
      win: "🎉 A fé firmada na palavra!",
      items: [
        { d: 1, em: "🌱", l: "Crescei na fé, somando virtudes" },
        { d: 2, em: "🤝", l: "Tornai firme a vocação e a eleição" },
        { d: 3, em: "⛰️", l: "Testemunhamos a majestade no monte" },
        { d: 4, em: "🔦", l: "A palavra profética, lâmpada no escuro" },
      ],
    },
  },
  wordsearch: {
    2: {
      title: "Caça-palavras — Os falsos mestres",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["FALSOS", "MESTRES", "BALAAO", "NOE", "SODOMA", "HERESIA"],
    },
  },
  boss: {
    questions: [
      { question: "O que Pedro diz ter testemunhado no monte santo?", options: ["A majestade de Cristo", "A abertura do mar", "A queda de Jericó", "A visão do trono"], correct: "A majestade de Cristo" },
      { question: "A que Pedro compara a palavra profética?", options: ["A uma lâmpada em lugar escuro", "A uma espada afiada", "A um rio caudaloso", "A uma rocha firme"], correct: "A uma lâmpada em lugar escuro" },
      { question: "Segundo Pedro, ao que devemos nos tornar participantes?", options: ["Da natureza divina", "Do reino terreno", "Da lei antiga", "Da glória dos anjos"], correct: "Da natureza divina" },
      { question: "Qual profeta ganancioso Pedro cita ao denunciar os falsos mestres?", options: ["Balaão", "Elias", "Jonas", "Natã"], correct: "Balaão" },
      { question: "Como Pedro diz que virá o Dia do Senhor?", options: ["Como um ladrão", "Ao amanhecer", "Com trombetas antes", "Após mil anos"], correct: "Como um ladrão" },
    ],
    story: {
      open: "Levanta-te contra os que negam o Senhor; a minha verdade é lâmpada que não se apaga.",
      turns: [
        { ask: "Cresce na fé e acrescenta virtude ao teu andar.", hit: "A virtude firma teus passos! 🌱", miss: "Não desfaleças; soma mais." },
        { ask: "Lembra: testemunhamos a majestade no monte santo.", hit: "A glória confirma a verdade! ⛰️", miss: "Firma-te no que viste." },
        { ask: "Segura a palavra profética como lâmpada no escuro.", hit: "A luz dissipa o engano! 🔦", miss: "Ergue a lâmpada de novo." },
        { ask: "Desmascara os falsos mestres e sua ganância.", hit: "A heresia cai por terra! ⚔️", miss: "Resiste; não recues." },
        { ask: "O Dia do Senhor vem como ladrão — vela!", hit: "Golpe final — vêm novos céus e nova terra! 🌅", miss: "Aguarda vigiando." },
      ],
      win: "Os falsos mestres foram desmascarados; aguardamos novos céus e nova terra, onde habita a justiça.",
      winHero: "A verdade venceu o engano! 🙌",
    },
  },
};
