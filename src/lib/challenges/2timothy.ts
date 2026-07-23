import type { BookChallenges } from "@/lib/rpgChallengeContent";

// 2 Timóteo (4 caps). Ciclo: 1=ordenar, 2=caça-palavras, 3=cruzada, 4=boss (último).
export const TIMOTHY2_CH: BookChallenges = {
  order: {
    1: {
      title: "Ordene: sem espírito de covardia", sub: "Toque nas cartas na sequência certa.", verse: 18,
      win: "🎉 O dom avivado, sem covardia!",
      items: [
        { d: 1, em: "🙏", l: "Paulo saúda Timóteo, seu filho amado" },
        { d: 2, em: "👵", l: "Lembra a fé de Lóide e Eunice" },
        { d: 3, em: "🔥", l: "'Aviva o dom de Deus que há em ti'" },
        { d: 4, em: "⛓️", l: "Onesíforo não se envergonha das cadeias" },
      ],
    },
  },
  wordsearch: {
    2: {
      title: "Caça-palavras — O soldado, o atleta e o lavrador",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["SOLDADO", "ATLETA", "LAVRADOR", "COROA", "GRAÇA", "FIRME"],
    },
  },
  crossword: {
    3: {
      title: "Palavra cruzada — Toda Escritura é inspirada por Deus",
      grid: ["ESCRITURA", "N........", "S........", "I........", "N........", "O........"],
      across: ["→ Toda ela é inspirada por Deus (9)"],
      down: ["↓ A Escritura é útil para o... na justiça (6)"],
    },
  },
  boss: {
    questions: [
      { question: "Que espírito Deus NÃO nos deu (2 Tm 1:7)?", options: ["O de covardia", "O de poder", "O de amor", "O de moderação"], correct: "O de covardia" },
      { question: "Quais três figuras Paulo usa no capítulo 2?", options: ["Soldado, atleta e lavrador", "Rei, sacerdote e profeta", "Pastor, pescador e servo", "Pai, filho e mestre"], correct: "Soldado, atleta e lavrador" },
      { question: "Complete: 'Toda Escritura é ______ por Deus.'", options: ["inspirada", "copiada", "esquecida", "escondida"], correct: "inspirada" },
      { question: "O que Paulo declara ao final (2 Tm 4:7)?", options: ["'Combati o bom combate, acabei a carreira, guardei a fé'", "'Fugi da luta e do combate'", "'Abandonei a corrida'", "'Perdi a fé no caminho'"], correct: "'Combati o bom combate, acabei a carreira, guardei a fé'" },
      { question: "Quem eram a avó e a mãe de fé de Timóteo?", options: ["Lóide e Eunice", "Sara e Rebeca", "Ana e Isabel", "Maria e Marta"], correct: "Lóide e Eunice" },
    ],
    story: {
      open: "Contra a Apostasia que esfria os corações: não te deixo espírito de covardia, mas de poder.",
      turns: [
        { ask: "A covardia quer calar o teu dom.", hit: "Aviva-se o fogo — não há medo! 🔥", miss: "Ergue-te; o dom ainda arde em ti." },
        { ask: "Sofre como bom soldado de Cristo.", hit: "O soldado não recua! ⚔️", miss: "Firma o pé na batalha." },
        { ask: "Corre como atleta que busca a coroa.", hit: "A corrida avança! 🏃", miss: "Não pares a meio caminho." },
        { ask: "Guarda a Escritura inspirada por Deus.", hit: "A Palavra te arma e te vence! 📖", miss: "Volta ao que aprendeste." },
        { ask: "Acaba a carreira e guarda a fé.", hit: "Golpe final — a fé foi guardada! 👑", miss: "A coroa da justiça te espera." },
      ],
      win: "A Apostasia caiu: o bom combate foi combatido, a carreira acabada, a fé guardada.",
      winHero: "Combati o bom combate! Está reservada a coroa! 🙌",
    },
  },
};
