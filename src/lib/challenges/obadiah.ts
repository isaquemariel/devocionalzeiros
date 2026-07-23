import type { BookChallenges } from "@/lib/rpgChallengeContent";

// Obadias (1 cap). Único capítulo → só o boss "O Orgulho de Edom".
export const OBADIAH_CH: BookChallenges = {
  boss: {
    questions: [
      { question: "Contra qual nação Obadias profetiza?", options: ["Edom", "Egito", "Babilônia", "Nínive"], correct: "Edom" },
      { question: "O que enganou o coração de Edom?", options: ["A soberba do seu coração", "A sua pobreza", "A sua ignorância", "O seu medo"], correct: "A soberba do seu coração" },
      { question: "Onde Edom fazia o seu ninho, pensando estar seguro?", options: ["Nas alturas das rochas", "No meio do mar", "Nos vales férteis", "Nas cidades muradas"], correct: "Nas alturas das rochas" },
      { question: "Qual foi o pecado de Edom contra o seu irmão Jacó?", options: ["A violência", "A generosidade", "O silêncio", "A aliança"], correct: "A violência" },
      { question: "De quem é o reino, segundo o fim da profecia?", options: ["Do Senhor", "De Edom", "de Babilônia", "Dos sábios"], correct: "Do Senhor" },
    ],
    story: {
      open: "Ainda que subas como a águia, dali te derrubarei, diz o Senhor.",
      turns: [
        { ask: "Tu te ergueste na altura das rochas, confiando na tua fortaleza.", hit: "A altura não te salva! 🦅", miss: "A tua soberba te engana ainda." },
        { ask: "A soberba do teu coração te enganou, ó Edom.", hit: "Cai o orgulho! 💥", miss: "Endurece-te se puderes." },
        { ask: "Ficaste de longe enquanto feriam o teu irmão Jacó.", hit: "A tua violência é julgada! ⚖️", miss: "Não escaparás do juízo." },
        { ask: "Entraste pela porta do meu povo no dia da sua ruína.", hit: "O saque volta sobre ti! 🔥", miss: "Ainda te exaltas em vão." },
        { ask: "Como fizeste, assim se fará contigo — o teu feito recai sobre a tua cabeça.", hit: "Golpe final — o orgulho é derrubado! 👑", miss: "O reino é do Senhor, não teu." },
      ],
      win: "Edom caiu, mas em Sião haverá livramento — e o reino será do Senhor.",
      winHero: "O orgulho foi humilhado; o Senhor reina! 🙌",
    },
  },
};
