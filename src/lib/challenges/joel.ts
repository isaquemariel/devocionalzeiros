import type { BookChallenges } from "@/lib/rpgChallengeContent";

// Joel (3 caps). Ciclo: 1=ordenar, 2=caça-palavras, 3=boss (último).
export const JOEL_CH: BookChallenges = {
  order: {
    1: {
      title: "Ordene: a praga de gafanhotos", sub: "Toque nas cartas na sequência certa.", verse: 15,
      win: "🎉 O clamor sobe ao Senhor!",
      items: [
        { d: 1, em: "🦗", l: "Enxames de gafanhotos devoram a terra" },
        { d: 2, em: "🍇", l: "A videira seca e o vinho cessa" },
        { d: 3, em: "😭", l: "Os sacerdotes pranteiam no templo" },
        { d: 4, em: "🙏", l: "Joel convoca jejum e clamor a Deus" },
      ],
    },
  },
  wordsearch: {
    2: {
      title: "Caça-palavras — Rasgai o coração",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["ESPÍRITO", "CORAÇÃO", "SENHOR", "TROMBETA", "GAFANHOTO", "SIÃO"],
    },
  },
  boss: {
    questions: [
      { question: "Que praga devastou a terra no livro de Joel?", options: ["Gafanhotos", "Sapos", "Granizo", "Trevas"], correct: "Gafanhotos" },
      { question: "'Rasgai o vosso ___, e não as vossas vestes.'", options: ["coração", "manto", "pão", "caminho"], correct: "coração" },
      { question: "O que o Senhor prometeu derramar sobre toda a carne?", options: ["O seu Espírito", "Água viva", "Fogo do céu", "Maná"], correct: "O seu Espírito" },
      { question: "Que grande dia Joel anuncia como próximo?", options: ["O Dia do Senhor", "O Dia do Descanso", "O Dia da Colheita", "O Dia das Festas"], correct: "O Dia do Senhor" },
      { question: "Onde Joel manda tocar a trombeta e reunir o povo?", options: ["Em Sião", "Em Ninive", "Em Babilônia", "No Egito"], correct: "Em Sião" },
    ],
    story: {
      open: "Vem o Dia do Senhor; toca a trombeta e volta-te a mim de todo o coração.",
      turns: [
        { ask: "O enxame devorou a tua terra — clamas a mim?", hit: "O clamor rasga os céus! 🦗", miss: "Ergue a voz, filho — eu ouço." },
        { ask: "Rasga o coração, e não as vestes.", hit: "O coração contrito me alcança! 💔", miss: "Não te escondas atrás do pano." },
        { ask: "Voltai a mim com jejum, choro e pranto.", hit: "O arrependimento vence! ✨", miss: "Ainda é tempo — retorna." },
        { ask: "Derramarei o meu Espírito sobre toda a carne.", hit: "O Espírito desce em poder! 🕊️", miss: "Espera a promessa do alto." },
        { ask: "O Dia do Senhor há de amanhecer.", hit: "Golpe final — a praga é desfeita! ☀️", miss: "A promessa não falha." },
      ],
      win: "O Senhor restaurou os anos que o gafanhoto comeu, e derramou o seu Espírito.",
      winHero: "A praga virou promessa cumprida! 🙌",
    },
  },
};
