import type { BookChallenges } from "@/lib/rpgChallengeContent";

// 1 João (5 caps). Ciclo: 1=ordenar, 2=caça-palavras, 3=cruzada, 4=completar, 5=boss (último).
export const JOHN1_CH: BookChallenges = {
  order: {
    1: {
      title: "Ordene: Deus é luz", sub: "Toque nas cartas na sequência certa.", verse: 10,
      win: "🎉 Na luz e perdoados!",
      items: [
        { d: 1, em: "👂", l: "Ouvimos e vimos o Verbo da vida" },
        { d: 2, em: "🤝", l: "Anunciamos para terdes comunhão" },
        { d: 3, em: "💡", l: "Deus é luz, sem treva alguma" },
        { d: 4, em: "🙏", l: "Confessamos, e Ele nos perdoa" },
      ],
    },
  },
  wordsearch: {
    2: {
      title: "Caça-palavras — Não ameis o mundo",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["MUNDO", "LUZ", "IRMÃO", "VERDADE", "UNÇÃO", "PAI"],
    },
  },
  crossword: {
    3: {
      title: "Palavra cruzada — Filhos de Deus",
      grid: ["FILHOS", "I.....", "E.....", "L....."],
      across: ["→ O que somos chamados: '... de Deus' (6)"],
      down: ["↓ Constante e firme na verdade (4)"],
    },
  },
  complete: {
    4: {
      ref: "1 João 4:8",
      before: "Aquele que não ama não conhece a Deus, porque Deus é",
      answer: "amor",
      after: ".",
      options: ["amor", "luz", "juiz", "rei"],
    },
  },
  boss: {
    questions: [
      { question: "Como 1 João descreve Deus em 1:5?", options: ["Deus é luz", "Deus é fogo", "Deus é vento", "Deus é juiz"], correct: "Deus é luz" },
      { question: "O que acontece se confessarmos os nossos pecados?", options: ["Ele é fiel para nos perdoar", "Nada muda", "Somos condenados", "Ficamos sem esperança"], correct: "Ele é fiel para nos perdoar" },
      { question: "O que João manda não amar?", options: ["O mundo", "Os irmãos", "A verdade", "A luz"], correct: "O mundo" },
      { question: "Como somos chamados por causa do amor do Pai?", options: ["Filhos de Deus", "Servos", "Anjos", "Juízes"], correct: "Filhos de Deus" },
      { question: "O que vence o mundo, segundo 1 João 5?", options: ["A nossa fé", "A nossa força", "As riquezas", "A lei"], correct: "A nossa fé" },
    ],
    story: {
      open: "O espírito do anticristo se ergue contra a verdade — mas quem permanece em mim tem vencido o mundo.",
      turns: [
        { ask: "Andas na luz e confessas os teus pecados?", hit: "A luz dissipa a treva! 💡", miss: "Volta à luz, filho." },
        { ask: "Recusas amar o mundo e o que nele há?", hit: "O mundo passa, mas tu permaneces! 🌍", miss: "Não te apegues ao que perece." },
        { ask: "Vives como filho de Deus, praticando a justiça?", hit: "Grande amor te fez filho! 👑", miss: "Firma-te na tua filiação." },
        { ask: "Amas os irmãos, porque Deus é amor?", hit: "O amor lança fora o temor! ❤️", miss: "Ama, e conhecerás a Deus." },
        { ask: "Crês que Jesus é o Filho de Deus?", hit: "Golpe final — a fé vence o mundo! 🙌", miss: "Crê, e terás a vitória." },
      ],
      win: "Estas coisas foram escritas para que saibais que tendes a vida eterna — e a vossa fé venceu o mundo.",
      winHero: "A fé venceu o mundo! 🙌",
    },
  },
};
