import type { BookChallenges } from "@/lib/rpgChallengeContent";

// Filipenses (4 caps). Ciclo: 1=ordenar, 2=caça-palavras, 3=cruzada, 4=boss (último).
export const PHILIPPIANS_CH: BookChallenges = {
  order: {
    1: {
      title: "Ordene: o viver é Cristo", sub: "Toque nas cartas na sequência certa.", verse: 30,
      win: "🎉 Para mim o viver é Cristo — em ordem!",
      items: [
        { d: 1, em: "🖋️", l: "Paulo saúda os santos em Filipos" },
        { d: 2, em: "🙏", l: "Dá graças e ora com alegria pela igreja" },
        { d: 3, em: "⛓️", l: "Sua prisão faz avançar o evangelho" },
        { d: 4, em: "✝️", l: "'Para mim o viver é Cristo, e o morrer, lucro'" },
      ],
    },
  },
  wordsearch: {
    2: {
      title: "Caça-palavras — O esvaziamento de Cristo",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["HUMILDADE", "SERVO", "CRUZ", "CRISTO", "EXALTADO", "JOELHO"],
    },
  },
  crossword: {
    3: {
      title: "Palavra cruzada — Prossigo para o alvo",
      grid: ["PROSSIGO", "R.......", "E.......", "M.......", "I.......", "O......."],
      across: ["→ Sigo em frente, rumo ao alvo (8)"],
      down: ["↓ O galardão do soberano chamamento de Deus (6)"],
    },
  },
  boss: {
    questions: [
      { question: "Segundo Filipenses, para Paulo o viver é o quê?", options: ["Cristo", "A lei", "O templo", "A riqueza"], correct: "Cristo" },
      { question: "Em Filipenses 2, Cristo tomou a forma de quê ao se esvaziar?", options: ["De servo", "De rei", "De anjo", "De juiz"], correct: "De servo" },
      { question: "Para qual 'alvo' Paulo diz prosseguir?", options: ["O prêmio do soberano chamamento de Deus", "A cidade de Roma", "O trono de Israel", "As riquezas do mundo"], correct: "O prêmio do soberano chamamento de Deus" },
      { question: "Qual o remédio de Paulo contra a ansiedade?", options: ["Oração e súplica com ações de graças", "Fugir para longe", "Guardar silêncio", "Trabalhar mais"], correct: "Oração e súplica com ações de graças" },
      { question: "Complete: 'Posso todas as coisas naquele que me...'", options: ["fortalece", "ensina", "chama", "vê"], correct: "fortalece" },
    ],
    story: {
      open: "Não andes ansioso por coisa alguma; eis que Eu enfrento contigo a Ansiedade.",
      turns: [
        { ask: "Alegra-te em mim sempre; e outra vez digo: alegra-te.", hit: "A alegria rompe o medo! 😊", miss: "Ergue os olhos, filho." },
        { ask: "Traze-me tudo em oração e súplica, com ações de graças.", hit: "A oração desarma a angústia! 🙏", miss: "Fala comigo mais uma vez." },
        { ask: "Recebe a minha paz, que excede todo o entendimento.", hit: "A paz guarda o teu coração! 🕊️", miss: "Descansa em mim." },
        { ask: "Pensa no que é verdadeiro, nobre e digno de louvor.", hit: "A mente renovada vence! ✨", miss: "Volta o pensamento a mim." },
        { ask: "Tudo podes naquele que te fortalece.", hit: "Golpe final — a Ansiedade cai! 💪", miss: "A força é minha; recebe-a." },
      ],
      win: "A paz de Deus, que excede todo o entendimento, guardou o coração — e a Ansiedade foi vencida.",
      winHero: "Aprendi o segredo de viver contente em toda circunstância! 🙌",
    },
  },
};
