import type { BookChallenges } from "@/lib/rpgChallengeContent";

// Filemom (1 cap). Livro de um só capítulo → o cap.1 é o último: gera apenas o boss.
export const PHILEMON_CH: BookChallenges = {
  boss: {
    questions: [
      { question: "Quem escreveu a carta a Filemom?", options: ["Paulo, prisioneiro por Cristo", "Pedro", "Tiago", "Barnabé"], correct: "Paulo, prisioneiro por Cristo" },
      { question: "Quem era Onésimo?", options: ["Um escravo fugitivo de Filemom", "Um centurião romano", "Um irmão de Paulo", "Um sacerdote"], correct: "Um escravo fugitivo de Filemom" },
      { question: "O que Paulo pede a Filemom quanto a Onésimo?", options: ["Que o receba como irmão amado", "Que o castigue", "Que o venda", "Que o expulse"], correct: "Que o receba como irmão amado" },
      { question: "O que Paulo se oferece para fazer com a dívida de Onésimo?", options: ["Pagá-la ele mesmo", "Ignorá-la", "Cobrá-la em dobro", "Deixá-la a Deus"], correct: "Pagá-la ele mesmo" },
      { question: "Como Onésimo mudou depois de conhecer a Cristo?", options: ["De inútil tornou-se útil", "Fugiu de novo", "Ficou rico", "Voltou a Roma"], correct: "De inútil tornou-se útil" },
    ],
    story: {
      open: "A mágoa pesa e a dívida acusa; mas o amor cobre tudo — vem, aprende a perdoar.",
      turns: [
        { ask: "Alguém te fez mal e fugiu do seu dever.", hit: "A mágoa cede ao amor! 💥", miss: "Guarda o coração da amargura." },
        { ask: "Aquele que era inútil voltou transformado.", hit: "A graça faz novo o velho! ✨", miss: "Não desprezes o arrependido." },
        { ask: "A dívida antiga ainda te acusa.", hit: "Outro pagou por ti! 🕊️", miss: "Solta o que já foi quitado." },
        { ask: "Recebe o irmão não como escravo, mas como amado.", hit: "A reconciliação vence! 🤝", miss: "Abre a porta do perdão." },
        { ask: "Deixa que o amor apague a ofensa de vez.", hit: "Golpe final — a paz reina! 💛", miss: "O perdão liberta a ti também." },
      ],
      win: "Onésimo, o fugitivo, tornou-se irmão amado; a mágoa e a dívida foram vencidas pelo perdão.",
      winHero: "A ofensa virou reconciliação! 🙌",
    },
  },
};
