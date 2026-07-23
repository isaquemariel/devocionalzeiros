import type { BookChallenges } from "@/lib/rpgChallengeContent";

// Malaquias (4 caps). Ciclo: 1=ordenar, 2=caça-palavras, 3=cruzada, 4=boss (último).
export const MALACHI_CH: BookChallenges = {
  order: {
    1: {
      title: "Ordene: o amor questionado", sub: "Toque nas cartas na sequência certa.", verse: 14,
      win: "🎉 A repreensão do Senhor em ordem!",
      items: [
        { d: 1, em: "💛", l: "Deus declara: 'Eu vos amei'" },
        { d: 2, em: "❓", l: "O povo replica: 'Em que nos amaste?'" },
        { d: 3, em: "🐑", l: "Sacerdotes trazem animais cegos e coxos" },
        { d: 4, em: "⛔", l: "Deus rejeita a oferta defeituosa" },
      ],
    },
  },
  wordsearch: {
    2: {
      title: "Caça-palavras — A aliança de Levi",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["LEVI", "ALIANÇA", "SACERDOTE", "PACTO", "VERDADE", "PAZ"],
    },
  },
  crossword: {
    3: {
      title: "Palavra cruzada — À casa do tesouro",
      grid: ["DIZIMO", "E.....", "U.....", "S....."],
      across: ["→ O que se traz à casa do tesouro (6)"],
      down: ["↓ Aquele a quem o dízimo pertence (4)"],
    },
  },
  boss: {
    questions: [
      { question: "Duvidando do amor de Deus, o que o povo perguntava?", options: ["'Em que nos amaste?'", "'Onde está o rei?'", "'Quem é o Senhor?'", "'Por que jejuamos?'"], correct: "'Em que nos amaste?'" },
      { question: "Que animais os sacerdotes ofereciam de modo reprovável?", options: ["Cegos, coxos e doentes", "Cordeiros perfeitos", "Bois primogênitos", "Pombas puras"], correct: "Cegos, coxos e doentes" },
      { question: "O que Deus mandou trazer à casa do tesouro?", options: ["Todos os dízimos", "Ouro e prata", "As primícias do vinho", "Os melhores bois"], correct: "Todos os dízimos" },
      { question: "Quem Deus prometeu enviar antes do grande dia do Senhor?", options: ["O profeta Elias", "O rei Davi", "O sacerdote Levi", "O profeta Isaías"], correct: "O profeta Elias" },
      { question: "Que título é dado ao Messias em Malaquias 4?", options: ["O Sol da Justiça", "O Leão de Judá", "A Estrela da Manhã", "O Bom Pastor"], correct: "O Sol da Justiça" },
    ],
    story: {
      open: "Quem suportará o dia da minha vinda? Sou como o fogo do ourives.",
      turns: [
        { ask: "Provaste-me o coração com ofertas defeituosas.", hit: "O fogo purifica a oferta! 🔥", miss: "Traze o teu melhor, filho." },
        { ask: "Quebraste a aliança sagrada de Levi.", hit: "O pacto é restaurado! 🕊️", miss: "Volta ao teu primeiro amor." },
        { ask: "Retiveste os dízimos que são meus.", hit: "As janelas dos céus se abrem! 🌧️", miss: "Não me roubes, ó povo." },
        { ask: "Duvidaste de que vejo o justo e o ímpio.", hit: "O livro de memórias se abre! 📜", miss: "Espera, que eu não esqueço." },
        { ask: "Eis que o Sol da Justiça se levanta sobre ti.", hit: "Golpe final — cura em suas asas! ☀️", miss: "A minha luz não se apaga." },
      ],
      win: "Purificado como ouro, o povo tornou a distinguir o justo do ímpio.",
      winHero: "O refino terminou — brilho de manhã nova! 🙌",
    },
  },
};
