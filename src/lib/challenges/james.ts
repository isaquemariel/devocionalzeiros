import type { BookChallenges } from "@/lib/rpgChallengeContent";

// Tiago (5 caps). Ciclo: 1=ordenar, 2=caça-palavras, 3=cruzada, 4=completar, 5=boss (último).
export const JAMES_CH: BookChallenges = {
  order: {
    1: {
      title: "Ordene: a provação e a sabedoria", sub: "Toque nas cartas na sequência certa.", verse: 27,
      win: "🎉 A fé provada, em ordem!",
      items: [
        { d: 1, em: "🔥", l: "Ter por alegria as várias provações" },
        { d: 2, em: "🙏", l: "Pedir sabedoria a Deus, com fé, sem duvidar" },
        { d: 3, em: "👑", l: "Quem persevera recebe a coroa da vida" },
        { d: 4, em: "📖", l: "Ser praticante da Palavra, não só ouvinte" },
      ],
    },
  },
  wordsearch: {
    2: {
      title: "Caça-palavras — Fé sem obras é morta",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["FÉ", "OBRAS", "ABRAÃO", "RAABE", "PRÓXIMO", "LEI"],
    },
  },
  crossword: {
    3: {
      title: "Palavra cruzada — O domínio da língua",
      grid: ["LINGUA", "E.....", "M.....", "E....."],
      across: ["→ Pequeno membro que se gaba de grandes coisas (6)"],
      down: ["↓ O que dirige o navio, como a palavra guia a vida (4)"],
    },
  },
  complete: {
    4: {
      ref: "Tiago 4:4",
      before: "Não sabeis que a amizade do ",
      answer: "mundo",
      after: " é inimizade contra Deus?",
      options: ["mundo", "dinheiro", "poder", "prazer"],
    },
  },
  boss: {
    questions: [
      { question: "A quem devemos pedir quando nos falta sabedoria?", options: ["A Deus", "Aos amigos", "Aos ricos", "A si mesmo"], correct: "A Deus" },
      { question: "Segundo Tiago, a fé sem obras é o quê?", options: ["Morta", "Forte", "Suficiente", "Escondida"], correct: "Morta" },
      { question: "A que Tiago compara a língua?", options: ["A um pequeno leme que guia o navio", "A uma âncora", "A uma vela", "A um remo"], correct: "A um pequeno leme que guia o navio" },
      { question: "A amizade do mundo é o quê diante de Deus?", options: ["Inimizade", "Aliança", "Indiferença", "Sabedoria"], correct: "Inimizade" },
      { question: "Quem deve orar e ungir o enfermo com óleo?", options: ["Os presbíteros da igreja", "Os profetas", "Os reis", "Os escribas"], correct: "Os presbíteros da igreja" },
    ],
    story: {
      open: "Ergue-te contra a Língua Indômita! A sabedoria que vem do alto será a tua espada.",
      turns: [
        { ask: "As provações querem te abater.", hit: "A perseverança te forja! 🔥", miss: "Pede sabedoria e não desanimes." },
        { ask: "De que vale ouvir sem praticar?", hit: "Fé viva em obras — golpe certeiro! 🛠️", miss: "Não sejas só ouvinte da Palavra." },
        { ask: "A língua incendeia como fogo.", hit: "Domada pela graça! 🐎", miss: "Refreia a língua, guerreiro." },
        { ask: "O mundo te seduz com sua amizade.", hit: "Resististe ao diabo e ele fugiu! 🛡️", miss: "Chega-te a Deus outra vez." },
        { ask: "Há um enfermo clamando por cura.", hit: "A oração da fé o levanta! 🙏", miss: "Ora com fé, sem duvidar." },
      ],
      win: "A Língua Indômita foi domada pela sabedoria do alto, e a fé venceu com obras.",
      winHero: "A Palavra virou vida! 🙌",
    },
  },
};
