import type { BookChallenges } from "@/lib/rpgChallengeContent";

// Colossenses (4 caps). Ciclo por capítulo: 1=ordenar, 2=caça-palavras, 3=cruzada, 4=boss (último).
export const COLOSSIANS_CH: BookChallenges = {
  order: {
    1: {
      title: "Ordene: a supremacia de Cristo", sub: "Toque nas cartas na sequência certa.", verse: 20,
      win: "🎉 Cristo tem a primazia em tudo!",
      items: [
        { d: 1, em: "🙏", l: "Paulo dá graças pela fé e amor dos santos" },
        { d: 2, em: "👑", l: "Cristo é a imagem do Deus invisível" },
        { d: 3, em: "🌍", l: "Nele foram criadas todas as coisas" },
        { d: 4, em: "✝️", l: "Reconciliação e paz pelo sangue da cruz" },
      ],
    },
  },
  wordsearch: {
    2: {
      title: "Caça-palavras — Plenitude em Cristo",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["CRISTO", "PLENITUDE", "FILOSOFIA", "RAIZ", "VITÓRIA", "FÉ"],
    },
  },
  crossword: {
    3: {
      title: "Palavra cruzada — As coisas do alto",
      grid: ["ALTO", "M...", "O...", "R..."],
      across: ["→ Buscai as coisas do ___ (4)"],
      down: ["↓ Sobre tudo isto, revesti-vos de ___ (4)"],
    },
  },
  boss: {
    questions: [
      { question: "Cristo é descrito em Colossenses como a imagem de quem?", options: ["Do Deus invisível", "Dos anjos", "De Moisés", "Do templo"], correct: "Do Deus invisível" },
      { question: "Por meio de que Cristo reconciliou todas as coisas?", options: ["Pelo sangue da sua cruz", "Pela lei de Moisés", "Por ritos e festas", "Por sabedoria humana"], correct: "Pelo sangue da sua cruz" },
      { question: "Contra o que Paulo adverte em Colossenses 2?", options: ["A vã filosofia dos homens", "A oração constante", "O canto de salmos", "A gratidão"], correct: "A vã filosofia dos homens" },
      { question: "O que os cristãos devem buscar, segundo Colossenses 3?", options: ["As coisas do alto", "As riquezas do mundo", "A honra dos homens", "Os prazeres da carne"], correct: "As coisas do alto" },
      { question: "Como deve ser a palavra do cristão, segundo Colossenses 4:6?", options: ["Com graça, temperada com sal", "Cheia de queixas", "Sempre em segredo", "Dura e severa"], correct: "Com graça, temperada com sal" },
    ],
    story: {
      open: "As Filosofias Vãs erguem-se com falsa sabedoria; mas em Cristo estão todos os tesouros do saber.",
      turns: [
        { ask: "Dizem que Cristo é apenas mais um entre muitos.", hit: "Ele é a imagem do Deus invisível! 👑", miss: "Não te deixes enganar por palavras persuasivas." },
        { ask: "Ostentam tradições de homens contra ti.", hit: "Em Cristo habita toda a plenitude! ✨", miss: "Firma-te na Cabeça, que é Cristo." },
        { ask: "Prendem-te a ritos, festas e sombras.", hit: "A cruz triunfou sobre os principados! ✝️", miss: "As sombras passam; o corpo é de Cristo." },
        { ask: "Puxam o teu olhar para as coisas da terra.", hit: "Buscas as coisas do alto! 🕊️", miss: "Ergue os olhos ao que está acima." },
        { ask: "Tentam calar a tua palavra de graça.", hit: "Golpe final — palavra temperada com sal! 🧂", miss: "Fala sempre com graça, e vencerás." },
      ],
      win: "As Filosofias Vãs se desfazem: em Cristo se escondem todos os tesouros da sabedoria.",
      winHero: "A vã sabedoria caiu diante da plenitude de Cristo! 🙌",
    },
  },
};
