import type { BookChallenges } from "@/lib/rpgChallengeContent";

// 2 João (1 cap). Cap.1 é o último → apenas o boss ("O Enganador").
export const JOHN2_CH: BookChallenges = {
  boss: {
    questions: [
      { question: "A quem João escreve a carta?", options: ["À senhora eleita e a seus filhos", "A um jovem discípulo", "A uma cidade inteira", "Aos anciãos de Éfeso"], correct: "À senhora eleita e a seus filhos" },
      { question: "Que mandamento João pede que se cumpra desde o princípio?", options: ["Que nos amemos uns aos outros", "Que jejuemos sempre", "Que guardemos o sábado", "Que ofertemos ao templo"], correct: "Que nos amemos uns aos outros" },
      { question: "Como se define o amor, segundo a carta?", options: ["Andar segundo os mandamentos de Deus", "Sentir emoção pelo próximo", "Fazer grandes obras", "Falar palavras bonitas"], correct: "Andar segundo os mandamentos de Deus" },
      { question: "Quem é o enganador e o anticristo?", options: ["Quem nega que Jesus Cristo veio em carne", "Quem viaja muito", "Quem escreve cartas", "Quem não tem filhos"], correct: "Quem nega que Jesus Cristo veio em carne" },
      { question: "O que João manda fazer com quem não traz a doutrina de Cristo?", options: ["Não o receber em casa nem o saudar", "Segui-lo em silêncio", "Dar-lhe presentes", "Ensiná-lo à força"], correct: "Não o receber em casa nem o saudar" },
    ],
    story: {
      open: "Não te deixes seduzir, filho da verdade; permanece no que ouviste desde o princípio.",
      turns: [
        { ask: "Andas tu na verdade, como recebeste o mandamento?", hit: "A verdade te firma! 📜", miss: "Volta ao princípio, não te desvies." },
        { ask: "Amas os irmãos, guardando os meus mandamentos?", hit: "O amor te sustenta! 💛", miss: "Sem amor, o coração vacila." },
        { ask: "Confessas que Jesus Cristo veio em carne?", hit: "A confissão desmascara o engano! ✝️", miss: "Cuidado — o enganador espreita." },
        { ask: "Guardarás a doutrina para não perder o galardão?", hit: "Permaneces em Cristo! 🛡️", miss: "Quem não permanece, perde o Pai." },
        { ask: "Fecharás a porta ao que nega o Filho?", hit: "Golpe final — o enganador é vencido! 🚪", miss: "Não saúdes o erro; resiste." },
      ],
      win: "Quem permanece na doutrina de Cristo tem o Pai e o Filho — e o enganador nada pode.",
      winHero: "A verdade e o amor venceram o engano! 🙌",
    },
  },
};
