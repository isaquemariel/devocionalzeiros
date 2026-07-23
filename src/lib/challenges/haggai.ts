import type { BookChallenges } from "@/lib/rpgChallengeContent";

// Ageu (2 caps). Ciclo: 1=ordenar (slot 0), 2=boss (último).
export const HAGGAI_CH: BookChallenges = {
  order: {
    1: {
      title: "Ordene: considerai os vossos caminhos", sub: "Toque nas cartas na sequência certa.", verse: 15,
      win: "🎉 A casa do Senhor começa a se erguer!",
      items: [
        { d: 1, em: "🗣️", l: "O povo diz: não é tempo de reedificar" },
        { d: 2, em: "🤔", l: "'Considerai os vossos caminhos'" },
        { d: 3, em: "🌾", l: "Semeaste muito e colheste pouco" },
        { d: 4, em: "🏗️", l: "O povo trabalha na casa do Senhor" },
      ],
    },
  },
  boss: {
    questions: [
      { question: "Que obra Deus ordenou reconstruir por meio de Ageu?", options: ["O templo do Senhor", "As muralhas de Jerusalém", "O palácio do rei", "A cidade de Belém"], correct: "O templo do Senhor" },
      { question: "Que exame Ageu repete ao povo negligente?", options: ["'Considerai os vossos caminhos'", "'Guardai o sábado'", "'Contai as estrelas'", "'Lavai as mãos'"], correct: "'Considerai os vossos caminhos'" },
      { question: "Por que o povo semeava muito e colhia pouco?", options: ["Descuidavam da casa de Deus", "Faltava chuva apenas", "Havia guerra", "Não tinham sementes"], correct: "Descuidavam da casa de Deus" },
      { question: "O que Deus prometeu sobre a última casa?", options: ["Sua glória seria maior que a da primeira", "Seria menor e humilde", "Nunca seria terminada", "Ficaria vazia"], correct: "Sua glória seria maior que a da primeira" },
      { question: "Quem era o governador chamado a liderar a obra?", options: ["Zorobabel", "Neemias", "Esdras", "Ciro"], correct: "Zorobabel" },
    ],
    story: {
      open: "Considerai os vossos caminhos: subi ao monte e edificai a minha casa.",
      turns: [
        { ask: "Deixaste a minha casa em ruínas enquanto forravas a tua.", hit: "O descuido é vencido! 🏚️", miss: "Considera os teus caminhos, filho." },
        { ask: "Semeaste muito, mas o pouco te escapou das mãos.", hit: "A escassez cede! 🌾", miss: "Volta-te para mim." },
        { ask: "Sobe ao monte, traze madeira e reedifica.", hit: "A obra avança! 🏗️", miss: "Não te detenhas agora." },
        { ask: "Esforça-te, Zorobabel, porque eu estou convosco.", hit: "A coragem prevalece! 💪", miss: "Firma o coração no Senhor." },
        { ask: "A glória desta última casa será maior que a da primeira.", hit: "Golpe final — a glória enche o templo! ✨", miss: "A promessa não falha." },
      ],
      win: "Da obediência do povo o templo se ergueu, e a glória do Senhor o encheu.",
      winHero: "As ruínas viraram glória! 🙌",
    },
  },
};
