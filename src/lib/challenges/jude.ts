import type { BookChallenges } from "@/lib/rpgChallengeContent";

// Judas (1 cap). Cap. 1 é o último → gera apenas o boss.
export const JUDE_CH: BookChallenges = {
  boss: {
    questions: [
      { question: "A que Judas exortou os crentes que batalhassem?", options: ["Pela fé entregue aos santos", "Pela terra prometida", "Por riquezas", "Por um trono"], correct: "Pela fé entregue aos santos" },
      { question: "Como Judas se apresenta na carta?", options: ["Servo de Jesus Cristo e irmão de Tiago", "Rei de Israel", "Sumo sacerdote", "Profeta de Judá"], correct: "Servo de Jesus Cristo e irmão de Tiago" },
      { question: "Que perigo Judas denuncia dentro da igreja?", options: ["Falsos mestres ímpios", "Um exército inimigo", "A fome na terra", "Um dilúvio"], correct: "Falsos mestres ímpios" },
      { question: "Sobre o corpo de quem o arcanjo Miguel disputou com o diabo?", options: ["De Moisés", "de Elias", "de Abraão", "de Enoque"], correct: "De Moisés" },
      { question: "Como começa a doxologia final de Judas?", options: ["'Àquele que é poderoso para vos guardar de tropeçar'", "'Bem-aventurado o homem'", "'No princípio era o Verbo'", "'Graça e paz vos sejam multiplicadas'"], correct: "'Àquele que é poderoso para vos guardar de tropeçar'" },
    ],
    story: {
      open: "Batalhai pela fé que uma vez foi dada aos santos; os intrusos ímpios não prevalecerão.",
      turns: [
        { ask: "Intrusos se infiltraram para torcer a graça em dissolução.", hit: "A fé entregue aos santos resiste! 🛡️", miss: "Contende sem temer, filho." },
        { ask: "Falsos mestres, nuvens sem água, apascentam a si mesmos.", hit: "A verdade os desmascara! ⚡", miss: "Não te deixes seduzir." },
        { ask: "Que Miguel não ousou blasfemar; disse: 'O Senhor te repreenda'.", hit: "O respeito ao Senhor vence o orgulho! 🌟", miss: "Ergue de novo a tua fé." },
        { ask: "Edifica-te na santíssima fé, orando no Espírito Santo.", hit: "Guardado no amor de Deus! 🙏", miss: "Firma-te outra vez." },
        { ask: "Àquele que é poderoso para vos guardar de tropeçar.", hit: "Golpe final — de pé, sem mácula, na glória! 👑", miss: "A doxologia não falha." },
      ],
      win: "Os intrusos ímpios caíram, e os santos foram apresentados sem mácula, com grande alegria.",
      winHero: "Batalhei pela fé — e Ele me guardou de tropeçar! 🙌",
    },
  },
};
