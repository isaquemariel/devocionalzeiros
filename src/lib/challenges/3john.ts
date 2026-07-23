import type { BookChallenges } from "@/lib/rpgChallengeContent";

// 3 João (1 cap). Único capítulo é o último → apenas o boss.
export const JOHN3_CH: BookChallenges = {
  boss: {
    questions: [
      { question: "A quem João dirige a carta de 3 João?", options: ["A Gaio, o amado", "A Timóteo", "A Filemom", "A Tito"], correct: "A Gaio, o amado" },
      { question: "Pelo que João mais se alegra a respeito de Gaio?", options: ["Por ele andar na verdade", "Por sua riqueza", "Por sua eloquência", "Por sua idade"], correct: "Por ele andar na verdade" },
      { question: "Que virtude Gaio praticava com os irmãos e forasteiros?", options: ["A hospitalidade", "O jejum", "O silêncio", "A profecia"], correct: "A hospitalidade" },
      { question: "Qual era o pecado de Diótrefes?", options: ["Amava ter a preeminência", "Adorava ídolos", "Negava a ressurreição", "Roubava as ofertas"], correct: "Amava ter a preeminência" },
      { question: "Quem recebe bom testemunho de todos e da própria verdade?", options: ["Demétrio", "Diótrefes", "Diótrefes e Gaio", "Barnabé"], correct: "Demétrio" },
    ],
    story: {
      open: "Não imites o mal, mas o bem; quem faz o bem é de Deus.",
      turns: [
        { ask: "Andas na verdade, como o amado Gaio.", hit: "A verdade te firma! 📜", miss: "Volta a andar na luz." },
        { ask: "Abre a tua casa aos irmãos peregrinos.", hit: "A hospitalidade vence o orgulho! 🚪", miss: "Não feches a porta." },
        { ask: "Não busques a preeminência como Diótrefes.", hit: "A humildade derruba o soberbo! 🙇", miss: "Guarda-te da vaidade." },
        { ask: "Recebe os que saem pelo Nome, sem nada tomar dos gentios.", hit: "Cooperas com a verdade! 🤝", miss: "Não recuses os enviados." },
        { ask: "Dá bom testemunho, como Demétrio.", hit: "Golpe final — o bem prevalece! 🙌", miss: "A verdade não falha." },
      ],
      win: "O amor à verdade e a hospitalidade venceram a soberba de Diótrefes.",
      winHero: "O orgulho caiu; a verdade permaneceu! 🙌",
    },
  },
};
