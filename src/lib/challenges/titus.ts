import type { BookChallenges } from "@/lib/rpgChallengeContent";

// Tito (3 caps). Ciclo: 1=ordenar, 2=caça-palavras, 3=boss (último).
export const TITUS_CH: BookChallenges = {
  order: {
    1: {
      title: "Ordene: pôr em ordem a igreja em Creta", sub: "Toque nas cartas na sequência certa.", verse: 16,
      win: "🎉 A sã doutrina em ordem!",
      items: [
        { d: 1, em: "⛵", l: "Paulo deixa Tito em Creta" },
        { d: 2, em: "🏛️", l: "Constituir presbíteros em cada cidade" },
        { d: 3, em: "✅", l: "O bispo deve ser irrepreensível" },
        { d: 4, em: "🗣️", l: "Repreender os faladores vãos para serem sãos na fé" },
      ],
    },
  },
  wordsearch: {
    2: {
      title: "Caça-palavras — o ensino e a graça manifestada",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["GRAÇA", "JOVENS", "SERVOS", "ENSINO", "SALVAÇÃO", "ESPERANÇA"],
    },
  },
  boss: {
    questions: [
      { question: "Em que ilha Paulo deixou Tito para constituir presbíteros?", options: ["Creta", "Chipre", "Malta", "Patmos"], correct: "Creta" },
      { question: "Como deveria ser o bispo (presbítero) segundo Tito 1?", options: ["Irrepreensível", "Rico", "Eloquente", "Idoso"], correct: "Irrepreensível" },
      { question: "Segundo Tito 2:11, o que se manifestou trazendo salvação a todos?", options: ["A graça de Deus", "A lei de Moisés", "A sabedoria dos homens", "O templo"], correct: "A graça de Deus" },
      { question: "Por qual meio, segundo Tito 3:5, fomos salvos?", options: ["Pela lavagem da regeneração e renovação do Espírito", "Por obras de justiça", "Por genealogias", "Pela circuncisão"], correct: "Pela lavagem da regeneração e renovação do Espírito" },
      { question: "O que Tito devia evitar, conforme Tito 3:9?", options: ["Contendas e genealogias", "As boas obras", "A oração", "A hospitalidade"], correct: "Contendas e genealogias" },
    ],
    story: {
      open: "Não te enredes com os faladores vãos; a sã doutrina os fará calar.",
      turns: [
        { ask: "Põe em ordem a minha casa e constitui fiéis presbíteros.", hit: "A igreja se firma! 🏛️", miss: "Persevera na ordem, servo." },
        { ask: "Tapa a boca dos enganadores com a sã doutrina.", hit: "A verdade silencia o engano! 📖", miss: "Não recues diante do vão falar." },
        { ask: "Anuncia: a graça de Deus se manifestou a todos!", hit: "A graça resplandece! ✨", miss: "Ergue de novo a voz da graça." },
        { ask: "Lembra que fomos salvos pela regeneração do Espírito.", hit: "O Espírito renova! 🕊️", miss: "Confia na obra que renova." },
        { ask: "Foge das contendas e aplica-te às boas obras.", hit: "Golpe final — os faladores vãos caem! 💥", miss: "Evita a contenda e vencerás." },
      ],
      win: "Calados os faladores vãos, a graça e a sã doutrina prevaleceram em Creta.",
      winHero: "A verdade venceu o vão falar! 🙌",
    },
  },
};
