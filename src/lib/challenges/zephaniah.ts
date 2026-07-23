import type { BookChallenges } from "@/lib/rpgChallengeContent";

// Sofonias (3 caps). Ciclo: 1=ordenar, 2=caça-palavras, 3=boss (último).
export const ZEPHANIAH_CH: BookChallenges = {
  order: {
    1: {
      title: "Ordene: o grande Dia do Senhor", sub: "Toque nas cartas na sequência certa.", verse: 14,
      win: "🎉 O anúncio do Dia em ordem!",
      items: [
        { d: 1, em: "🌍", l: "O Senhor anuncia: consumirei tudo sobre a terra" },
        { d: 2, em: "✋", l: "Estende a mão contra Judá e Jerusalém" },
        { d: 3, em: "🔥", l: "Corta os que adoram Baal e o exército dos céus" },
        { d: 4, em: "⚖️", l: "Perto está o grande Dia do Senhor, dia de ira" },
      ],
    },
  },
  wordsearch: {
    2: {
      title: "Caça-palavras — Chamado ao arrependimento",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["BUSCAI", "JUSTIÇA", "MANSIDÃO", "GAZA", "MOABE", "NÍNIVE"],
    },
  },
  boss: {
    questions: [
      { question: "Qual é o tema central da profecia de Sofonias?", options: ["O grande Dia do Senhor", "A construção do templo", "O êxodo do Egito", "A criação do mundo"], correct: "O grande Dia do Senhor" },
      { question: "O que Deus manda buscar no capítulo 2?", options: ["A justiça e a mansidão", "Riquezas e honra", "Poder e domínio", "Alianças de guerra"], correct: "A justiça e a mansidão" },
      { question: "Contra qual cidade inimiga Sofonias profetiza juízo?", options: ["Nínive", "Roma", "Atenas", "Corinto"], correct: "Nínive" },
      { question: "Como é descrito o Dia do Senhor no capítulo 1?", options: ["Dia de ira, angústia e trevas", "Dia de festa e alegria", "Dia de descanso e paz", "Dia de colheita farta"], correct: "Dia de ira, angústia e trevas" },
      { question: "Que promessa Deus faz a Jerusalém no capítulo 3?", options: ["Está no meio de ti e se alegra em ti com júbilo", "Enviará outro profeta", "Reconstruirá os muros", "Multiplicará os rebanhos"], correct: "Está no meio de ti e se alegra em ti com júbilo" },
    ],
    story: {
      open: "Perto está o grande Dia; mas quem me busca não será consumido pela ira.",
      turns: [
        { ask: "Ergo a mão contra a idolatria da terra.", hit: "Os ídolos caem! 🔥", miss: "Não te afastes de mim." },
        { ask: "Convoca os humildes antes que venha a ira.", hit: "Os mansos são abrigados! 🕊️", miss: "Volta, e busca-me." },
        { ask: "As nações soberbas serão humilhadas.", hit: "A soberba se desfaz! ⚖️", miss: "Firma o teu coração." },
        { ask: "No meio de ti estou, ó filha de Sião.", hit: "O temor se dissipa! ✨", miss: "Não desanimes." },
        { ask: "Sobre ti me alegrarei com júbilo e cânticos.", hit: "Golpe final — a alegria vence a ira! 🙌", miss: "A promessa não falha." },
      ],
      win: "A ira deu lugar ao júbilo: o Senhor, poderoso, se alegra sobre o seu povo.",
      winHero: "Do juízo brotou o cântico! 🙌",
    },
  },
};
