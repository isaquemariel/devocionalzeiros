import type { BookChallenges } from "@/lib/rpgChallengeContent";

// Gálatas (6 caps). Ciclo: 1=ordenar, 2=caça-palavras, 3=cruzada, 4=completar,
// 5=ligar pares, 6=boss (último capítulo).
export const GALATIANS_CH: BookChallenges = {
  order: {
    1: {
      title: "Ordene: o único evangelho", sub: "Toque nas cartas na sequência certa.", verse: 24,
      win: "🎉 O evangelho da graça em ordem!",
      items: [
        { d: 1, em: "⛓️", l: "Paulo perseguia a igreja de Deus" },
        { d: 2, em: "✨", l: "Deus o chama pela graça e revela o Filho" },
        { d: 3, em: "🏜️", l: "Ele parte para a Arábia e volta a Damasco" },
        { d: 4, em: "🤝", l: "Sobe a Jerusalém para ver Pedro" },
      ],
    },
  },
  wordsearch: {
    2: {
      title: "Caça-palavras — Justificados pela fé",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["FÉ", "CRISTO", "GRAÇA", "LEI", "PEDRO", "VIVE"],
    },
  },
  crossword: {
    3: {
      title: "Palavra cruzada — A lei e a promessa",
      grid: ["PROMESSA", "A.......", "U.......", "L.......", "O......."],
      across: ["→ O que Deus deu a Abraão, anterior à lei (8)"],
      down: ["↓ O apóstolo que escreveu aos gálatas (5)"],
    },
  },
  complete: {
    4: {
      ref: "Gálatas 4:7",
      before: "assim já não és mais servo, mas filho; e, sendo filho, és também ",
      answer: "herdeiro",
      after: " de Deus por meio de Cristo.",
      options: ["herdeiro", "escravo", "estranho", "juiz"],
    },
  },
  connect: {
    5: {
      title: "Ligue — Liberdade e o fruto do Espírito",
      sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Liberdade", b: "para ela Cristo nos libertou" },
        { a: "Fruto do Espírito", b: "amor, alegria, paz" },
        { a: "Obras da carne", b: "discórdia e inveja" },
        { a: "Toda a lei se cumpre", b: "ama o próximo como a ti mesmo" },
      ],
    },
  },
  boss: {
    questions: [
      { question: "Quem escreveu a carta aos Gálatas?", options: ["Paulo", "Pedro", "Tiago", "João"], correct: "Paulo" },
      { question: "Por meio de que o homem é justificado, segundo Gálatas?", options: ["Pela fé em Cristo", "Pelas obras da lei", "Pela circuncisão", "Pelos sacrifícios"], correct: "Pela fé em Cristo" },
      { question: "Complete: 'Já não sou eu quem vive, mas ___ vive em mim.'", options: ["Cristo", "a lei", "o mundo", "o profeta"], correct: "Cristo" },
      { question: "Qual é o primeiro fruto do Espírito citado por Paulo?", options: ["O amor", "A riqueza", "O medo", "A força"], correct: "O amor" },
      { question: "Complete: 'Cada um ___ o que semeia.'", options: ["colhe", "esquece", "esconde", "vende"], correct: "colhe" },
    ],
    story: {
      open: "Não voltes ao jugo da escravidão; para a liberdade eu te chamei.",
      turns: [
        { ask: "Confias na lei para te salvar?", hit: "A fé em Cristo te justifica! ⚖️", miss: "Não te submetas de novo ao jugo." },
        { ask: "Quem agora vive dentro de ti?", hit: "Cristo vive em mim! ✝️", miss: "Ergue os olhos ao Filho." },
        { ask: "A promessa a Abraão veio antes da lei.", hit: "A promessa não se anula! 📜", miss: "Lembra da aliança da graça." },
        { ask: "Andarás segundo a carne ou o Espírito?", hit: "O fruto do Espírito floresce! 🍇", miss: "Não semeies para a carne." },
        { ask: "Cada um colherá o que semeia.", hit: "Golpe final — a graça vence a lei! 🙌", miss: "Não te canses de fazer o bem." },
      ],
      win: "A escravidão da lei foi quebrada; em Cristo somos filhos e herdeiros livres.",
      winHero: "A liberdade em Cristo triunfou! 🕊️",
    },
  },
};
