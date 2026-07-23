import type { BookChallenges } from "@/lib/rpgChallengeContent";

// Rute (4 caps). Ciclo: 1=ordenar, 2=caça-palavras, 3=cruzada, 4=boss (último).
export const RUTH_CH: BookChallenges = {
  order: {
    1: {
      title: "Ordene: a volta de Noemi", sub: "Toque nas cartas na sequência certa.", verse: 22,
      win: "🎉 A jornada de fé em ordem!",
      items: [
        { d: 1, em: "🌾", l: "A fome leva a família a Moabe" },
        { d: 2, em: "🥀", l: "Morrem o marido e os filhos" },
        { d: 3, em: "🧳", l: "Noemi decide voltar a Belém" },
        { d: 4, em: "💛", l: "Rute se apega: 'teu povo é meu'" },
      ],
    },
  },
  wordsearch: {
    2: {
      title: "Caça-palavras — Rute respiga no campo",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["RUTE", "BOAZ", "CAMPO", "ESPIGA", "CEVADA", "GRAÇA"],
    },
  },
  crossword: {
    3: {
      title: "Palavra cruzada — O resgatador",
      grid: ["RESGATE", "U......", "T......", "E......"],
      across: ["→ O que o parente próximo faz pela família (7)"],
      down: ["↓ A moabita fiel a Noemi (4)"],
    },
  },
  boss: {
    questions: [
      { question: "De qual país era Rute?", options: ["Moabe", "Egito", "Assíria", "Canaã"], correct: "Moabe" },
      { question: "O que Rute disse a Noemi ao não abandoná-la?", options: ["'O teu povo é o meu povo'", "'Voltarei depois'", "'Fica em paz'", "'Segue sem mim'"], correct: "'O teu povo é o meu povo'" },
      { question: "Em qual campo Rute foi respigar?", options: ["No campo de Boaz", "No campo de Labão", "No campo de Jessé", "No campo de Ló"], correct: "No campo de Boaz" },
      { question: "O que Boaz era da família de Noemi?", options: ["Parente resgatador", "Um rei", "Um sacerdote", "Um soldado"], correct: "Parente resgatador" },
      { question: "Rute tornou-se bisavó de qual rei?", options: ["Davi", "Saul", "Salomão", "Josias"], correct: "Davi" },
    ],
    story: {
      open: "Não temas a sombra da perda; a tua fidelidade será recompensada.",
      turns: [
        { ask: "Deixaste a tua terra para seguir o meu povo.", hit: "A fidelidade vence a perda! 🌾", miss: "Firme-te, filha — eu te vejo." },
        { ask: "Respigaste com humildade nos campos alheios.", hit: "A graça te cobre! ✨", miss: "Não desanimes; continua." },
        { ask: "Buscaste refúgio debaixo das minhas asas.", hit: "O refúgio te guarda! 🕊️", miss: "Ergue-te outra vez." },
        { ask: "O resgatador não te desamparará.", hit: "O resgate chegou! 💛", miss: "Espera no Senhor." },
        { ask: "Da tua casa há de vir um rei.", hit: "Golpe final — nasce a esperança! 👑", miss: "A promessa não falha." },
      ],
      win: "Da linhagem de Rute nasceria Davi — e, dele, o Redentor.",
      winHero: "A perda virou redenção! 🙌",
    },
  },
};
