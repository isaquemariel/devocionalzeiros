import type { BookChallenges } from "@/lib/rpgChallengeContent";

// 2 Tessalonicenses (3 caps). Ciclo: 1=ordenar, 2=caça-palavras, 3=boss (último).
export const THESS2_CH: BookChallenges = {
  order: {
    1: {
      title: "Ordene: firmeza e o juízo em chamas", sub: "Toque nas cartas na sequência certa.", verse: 10,
      win: "🎉 A fé firme e a justiça de Deus em ordem!",
      items: [
        { d: 1, em: "🙏", l: "Paulo agradece pela fé que cresce" },
        { d: 2, em: "⚔️", l: "Firmes na perseverança em meio às perseguições" },
        { d: 3, em: "🔥", l: "Jesus se revela do céu em chamas de fogo" },
        { d: 4, em: "⚖️", l: "Descanso aos fiéis, juízo aos que afligem" },
      ],
    },
  },
  wordsearch: {
    2: {
      title: "Caça-palavras — O homem da iniquidade",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["APOSTASIA", "PERDIÇÃO", "ENGANO", "VERDADE", "SINAIS", "MENTIRA"],
    },
  },
  boss: {
    questions: [
      { question: "Quem escreveu 2 Tessalonicenses à igreja?", options: ["Paulo", "Pedro", "Tiago", "João"], correct: "Paulo" },
      { question: "Como o Senhor Jesus se manifestará do céu (cap. 1)?", options: ["Em chamas de fogo, com anjos poderosos", "Numa nuvem silenciosa", "Como um cordeiro manso", "Sobre um cavalo branco"], correct: "Em chamas de fogo, com anjos poderosos" },
      { question: "O que precisa vir antes do Dia do Senhor (cap. 2)?", options: ["A apostasia e o homem da iniquidade", "Um grande avivamento", "A reconstrução do templo", "Sete anos de paz"], correct: "A apostasia e o homem da iniquidade" },
      { question: "Como o Senhor destruirá o iníquo (cap. 2)?", options: ["Pelo sopro da sua boca", "Com uma espada de ferro", "Por meio de anjos guerreiros", "Com fogo do altar"], correct: "Pelo sopro da sua boca" },
      { question: "Que regra Paulo deu sobre o trabalho (cap. 3)?", options: ["Quem não quer trabalhar, também não coma", "O ocioso descanse", "Trabalhe só quem quiser", "Ninguém precisa trabalhar"], correct: "Quem não quer trabalhar, também não coma" },
    ],
    story: {
      open: "Eis que se levanta o filho da perdição; mas não temas, pois a minha vinda o consumirá.",
      turns: [
        { ask: "Ele se assenta no templo, mostrando-se como Deus.", hit: "A soberba cai por terra! ⚖️", miss: "Firme-te — a verdade prevalece." },
        { ask: "Vem com sinais e prodígios de mentira.", hit: "O engano se desfaz! 🔥", miss: "Não te deixes seduzir; resiste." },
        { ask: "Semeia a apostasia entre os que se afastaram.", hit: "A fé permanece de pé! 🙏", miss: "Guarda as tradições que recebeste." },
        { ask: "Aflige os santos com perseguição e tribulação.", hit: "O descanso vem para os fiéis! 🕊️", miss: "Persevera; o juízo é justo." },
        { ask: "Ergue-se contra o próprio Deus vivo.", hit: "Golpe final — o sopro da sua boca! 💥", miss: "A promessa não falha." },
      ],
      win: "O homem da iniquidade foi consumido pelo esplendor da vinda do Senhor.",
      winHero: "A verdade venceu a mentira! 🙌",
    },
  },
};
