import type { BookChallenges } from "@/lib/rpgChallengeContent";

// 1 Pedro (5 caps). Ciclo: 1=ordenar, 2=caça-palavras, 3=cruzada, 4=completar, 5=boss (último).
export const PETER1_CH: BookChallenges = {
  order: {
    1: {
      title: "Ordene: a esperança viva e o ouro provado", sub: "Toque nas cartas na sequência certa.", verse: 21,
      win: "🎉 A fé provada resplandece como ouro!",
      items: [
        { d: 1, em: "🕊️", l: "Renascidos para uma esperança viva" },
        { d: 2, em: "🏆", l: "Herança incorruptível guardada nos céus" },
        { d: 3, em: "🔥", l: "A fé provada como ouro no fogo" },
        { d: 4, em: "🩸", l: "Remidos pelo sangue precioso de Cristo" },
      ],
    },
  },
  wordsearch: {
    2: {
      title: "Caça-palavras — A pedra viva e o sacerdócio real",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["PEDRA", "VIVA", "REAL", "SACERDOTE", "POVO", "LUZ"],
    },
  },
  crossword: {
    3: {
      title: "Palavra cruzada — O sofrimento como Cristo",
      grid: ["CRISTO", "R.....", "U.....", "Z....."],
      across: ["→ Aquele que padeceu uma vez pelos pecados (6)"],
      down: ["↓ O madeiro onde Ele levou nossos pecados (4)"],
    },
  },
  complete: {
    4: {
      ref: "1 Pedro 4:8",
      before: "Tende, acima de tudo, ardente ",
      answer: "amor",
      after: " uns para com os outros, porque o amor cobre a multidão de pecados.",
      options: ["amor", "temor", "zelo", "juízo"],
    },
  },
  boss: {
    questions: [
      { question: "Sobre quem devemos lançar toda a nossa ansiedade?", options: ["Sobre Ele, porque Ele tem cuidado de nós", "Sobre os amigos", "Sobre nós mesmos", "Sobre a sorte"], correct: "Sobre Ele, porque Ele tem cuidado de nós" },
      { question: "Como Pedro descreve o adversário, o diabo?", options: ["Um leão que ruge, buscando a quem devorar", "Uma serpente adormecida", "Um lobo manso", "Um vento passageiro"], correct: "Um leão que ruge, buscando a quem devorar" },
      { question: "Que título é dado a Cristo em 1 Pedro 5?", options: ["O Sumo Pastor", "O Cordeiro mudo", "O Leão de Judá", "O bom samaritano"], correct: "O Sumo Pastor" },
      { question: "O que recebem os que apascentam o rebanho quando o Sumo Pastor se manifestar?", options: ["A coroa imarcescível da glória", "Um trono de ouro", "Muitas terras", "Um cetro"], correct: "A coroa imarcescível da glória" },
      { question: "A quem Deus resiste e a quem concede graça?", options: ["Resiste aos soberbos e dá graça aos humildes", "Resiste aos pobres", "Dá graça aos orgulhosos", "Resiste aos fracos"], correct: "Resiste aos soberbos e dá graça aos humildes" },
    ],
    story: {
      open: "O leão ruge nas trevas, mas humilha-te sob a minha poderosa mão, e eu te exaltarei.",
      turns: [
        { ask: "Humilha-te debaixo da minha mão forte.", hit: "A humildade desarma o inimigo! 🙇", miss: "Baixa a cabeça, filho — eu te sustento." },
        { ask: "Lança sobre mim toda a tua ansiedade.", hit: "O peso caiu — Ele cuida de ti! 🕊️", miss: "Solta o fardo; não o carregues só." },
        { ask: "Sê sóbrio e vigia: o leão ronda e ruge.", hit: "Vigilante, tu resistes ao rugido! 👁️", miss: "Desperta — o inimigo se aproxima." },
        { ask: "Resiste-lhe firme na fé.", hit: "A fé firme faz o leão recuar! ✝️", miss: "Firma os pés; não vaciles." },
        { ask: "Eis que o Sumo Pastor se manifesta.", hit: "Golpe final — a coroa da glória! 👑", miss: "Espera: a promessa não falha." },
      ],
      win: "O leão que ruge foi silenciado; o Sumo Pastor reúne o seu rebanho e coroa os fiéis.",
      winHero: "A ansiedade virou paz — o rugido calou! 🙌",
    },
  },
};
