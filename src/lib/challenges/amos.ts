import type { BookChallenges } from "@/lib/rpgChallengeContent";

// Amós (9 caps). Ciclo (c-1)%6: 0=order,1=wordsearch,2=crossword,3=complete,4=connect,5=quiz.
// Cap.1 order, 2 wordsearch, 3 crossword, 4 complete, 5 connect, 6 quiz,
// 7 order, 8 wordsearch, 9=boss (último capítulo).
export const AMOS_CH: BookChallenges = {
  order: {
    1: {
      title: "Ordene: o juízo contra as nações", sub: "Toque nas cartas na sequência certa.", verse: 15,
      win: "🎉 O rugido de Sião ecoou na ordem certa!",
      items: [
        { d: 1, em: "⚔️", l: "Juízo contra Damasco" },
        { d: 2, em: "🏙️", l: "Juízo contra Gaza" },
        { d: 3, em: "🌊", l: "Juízo contra Tiro" },
        { d: 4, em: "🗡️", l: "Juízo contra Edom" },
      ],
    },
    7: {
      title: "Ordene: as visões de Amós", sub: "Toque nas cartas na sequência certa.", verse: 17,
      win: "🎉 As visões do profeta em ordem!",
      items: [
        { d: 1, em: "🦗", l: "Visão dos gafanhotos" },
        { d: 2, em: "🔥", l: "Visão do fogo consumidor" },
        { d: 3, em: "📏", l: "Visão do prumo" },
        { d: 4, em: "🚫", l: "Amazias manda Amós embora" },
      ],
    },
  },
  wordsearch: {
    2: {
      title: "Caça-palavras — Israel julgada",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["MOABE", "JUDA", "ISRAEL", "PRATA", "POBRE", "NAZIREU"],
    },
    8: {
      title: "Caça-palavras — O cesto de frutos",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["CESTO", "FRUTOS", "VERAO", "FOME", "PALAVRA", "BALANCA"],
    },
  },
  crossword: {
    3: {
      title: "Palavra cruzada — O leão rugiu",
      grid: ["LEAO", "A...", "C...", "O..."],
      across: ["→ Rugiu, quem não temerá? (4)"],
      down: ["↓ Armadilha para prender a ave (4)"],
    },
  },
  complete: {
    4: {
      ref: "Amós 4:12",
      before: "Prepara-te para te ",
      answer: "encontrares",
      after: " com o teu Deus, ó Israel.",
      options: ["encontrares", "esconderes", "afastares", "alegrares"],
    },
  },
  connect: {
    5: {
      title: "Ligue — Buscai-me e vivei",
      sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Buscai-me", b: "e vivei" },
        { a: "Corra o juízo", b: "como as águas" },
        { a: "A justiça", b: "como ribeiro perene" },
        { a: "Dia do Senhor", b: "trevas, e não luz" },
      ],
    },
  },
  boss: {
    questions: [
      { question: "Qual era o ofício de Amós antes de profetizar?", options: ["Pastor de ovelhas em Tecoa", "Sacerdote em Jerusalém", "Rei de Israel", "Escriba do templo"], correct: "Pastor de ovelhas em Tecoa" },
      { question: "Que célebre apelo Amós fez sobre juízo e justiça?", options: ["'Corra o juízo como as águas'", "'Amai os vossos inimigos'", "'Fazei discípulos'", "'Guardai o sábado'"], correct: "'Corra o juízo como as águas'" },
      { question: "O que o Senhor mostrou a Amós na terceira visão?", options: ["Um prumo", "Uma espada", "Uma coroa", "Um cordeiro"], correct: "Um prumo" },
      { question: "Quem confrontou e mandou Amós embora de Betel?", options: ["Amazias, o sacerdote", "Jeroboão, o rei", "Elias, o profeta", "Uzias, o rei"], correct: "Amazias, o sacerdote" },
      { question: "Com que promessa de restauração o livro termina?", options: ["Levantar o tabernáculo caído de Davi", "Destruir toda a terra", "Enviar um novo dilúvio", "Construir um novo templo"], correct: "Levantar o tabernáculo caído de Davi" },
    ],
    story: {
      open: "O SENHOR ruge de Sião; prepara-te para te encontrares com o teu Deus.",
      turns: [
        { ask: "O leão rugiu — quem não temerá?", hit: "O rugido abala a terra! 🦁", miss: "Ainda não estremeces; ouve de novo." },
        { ask: "Julguei as nações e não voltei atrás.", hit: "O juízo é justo! ⚔️", miss: "Firma-te diante da verdade." },
        { ask: "Pus o prumo no meio do meu povo.", hit: "A medida revela o coração! 📏", miss: "Endireita-te outra vez." },
        { ask: "Enviarei fome de ouvir a minha palavra.", hit: "A palavra é o pão que sustenta! 📖", miss: "Não desprezes a voz do céu." },
        { ask: "Mas erguerei o tabernáculo caído de Davi.", hit: "Golpe final — a restauração amanhece! 🌅", miss: "A promessa de restauro não falha." },
      ],
      win: "O juízo correu como as águas, mas a misericórdia plantou de novo o povo em sua terra.",
      winHero: "Do rugido do juízo brotou a esperança! 🙌",
    },
  },
};
