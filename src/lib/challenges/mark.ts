import type { BookChallenges } from "@/lib/rpgChallengeContent";

// Marcos (16 caps). Ciclo (c-1)%6: 0=order,1=wordsearch,2=crossword,3=complete,4=connect,5=quiz.
// Cap.16 (último) = boss. Slots gerados: order 1/7/13, wordsearch 2/8/14,
// crossword 3/9/15, complete 4/10, connect 5/11 (6 e 12 caem no quiz por IA).
export const MARK_CH: BookChallenges = {
  order: {
    1: {
      title: "Ordene: batismo e chamado", sub: "Toque nas cartas na sequência certa.", verse: 20,
      win: "🎉 O Evangelho começa em ordem!",
      items: [
        { d: 1, em: "🐫", l: "João Batista prega no deserto" },
        { d: 2, em: "💧", l: "Jesus é batizado no Jordão" },
        { d: 3, em: "🏜️", l: "É tentado quarenta dias no deserto" },
        { d: 4, em: "🎣", l: "Chama os pescadores: 'Vinde após mim'" },
      ],
    },
    7: {
      title: "Ordene: o que contamina o homem", sub: "Toque nas cartas na sequência certa.", verse: 37,
      win: "🎉 O coração vem primeiro!",
      items: [
        { d: 1, em: "🧼", l: "Fariseus criticam as mãos por lavar" },
        { d: 2, em: "❤️", l: "Jesus ensina: o mal vem do coração" },
        { d: 3, em: "🙇‍♀️", l: "A mulher siro-fenícia intercede pela filha" },
        { d: 4, em: "👂", l: "Cura o surdo dizendo 'Efatá, abre-te'" },
      ],
    },
    13: {
      title: "Ordene: o discurso do fim", sub: "Toque nas cartas na sequência certa.", verse: 37,
      win: "🎉 Vigiai — em ordem!",
      items: [
        { d: 1, em: "🏛️", l: "Jesus prediz a queda do templo" },
        { d: 2, em: "⚠️", l: "Adverte sobre falsos cristos" },
        { d: 3, em: "☁️", l: "Anuncia o Filho do Homem nas nuvens" },
        { d: 4, em: "👁️", l: "Ordena a todos: 'Vigiai!'" },
      ],
    },
  },
  wordsearch: {
    2: {
      title: "Caça-palavras — o paralítico e Levi",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["TELHADO", "MACA", "PERDAO", "LEVI", "SABADO", "JEJUM"],
    },
    8: {
      title: "Caça-palavras — pães e a confissão de Pedro",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["PAES", "CESTOS", "CEGO", "BETSAIDA", "PEDRO", "CRISTO"],
    },
    14: {
      title: "Caça-palavras — a última ceia e a prisão",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["CEIA", "PERFUME", "JUDAS", "GETSEMANI", "CALICE", "GALO"],
    },
  },
  crossword: {
    3: {
      title: "Palavra cruzada — os Doze escolhidos",
      grid: ["DOZE", "E...", "M...", "O...", "N...", "I...", "O...", "S..."],
      across: ["→ Número de apóstolos que Jesus escolheu (4)"],
      down: ["↓ O que Jesus expulsava com autoridade (8)"],
    },
    9: {
      title: "Palavra cruzada — a transfiguração",
      grid: ["MONTE", "O....", "I....", "S....", "E....", "S...."],
      across: ["→ Onde Jesus se transfigurou em glória (5)"],
      down: ["↓ Apareceu ao lado de Elias com Jesus (6)"],
    },
    15: {
      title: "Palavra cruzada — o Calvário",
      grid: ["CRUZ", "A...", "L...", "V...", "A...", "R...", "I...", "O..."],
      across: ["→ O madeiro onde Jesus foi crucificado (4)"],
      down: ["↓ Monte da caveira, o Gólgota (8)"],
    },
  },
  complete: {
    4: {
      ref: "Marcos 4:41",
      before: "Quem é este, a quem até o vento e o",
      answer: "mar",
      after: "obedecem?",
      options: ["mar", "céu", "monte", "povo"],
    },
    10: {
      ref: "Marcos 10:45",
      before: "Pois o Filho do Homem também não veio para ser servido, mas para",
      answer: "servir",
      after: ", e dar a sua vida em resgate de muitos.",
      options: ["servir", "reinar", "julgar", "descansar"],
    },
  },
  connect: {
    5: {
      title: "Ligue — o endemoninhado e Jairo",
      sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Legião", b: "muitos demônios num só homem" },
        { a: "Porcos", b: "despencam no mar" },
        { a: "Jairo", b: "pai da menina ressuscitada" },
        { a: "Manto", b: "tocado pela mulher enferma" },
      ],
    },
    11: {
      title: "Ligue — a entrada em Jerusalém",
      sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Jumentinho", b: "Jesus entra montado nele" },
        { a: "Ramos", b: "estendidos pelo caminho" },
        { a: "Hosana", b: "o clamor da multidão" },
        { a: "Figueira", b: "amaldiçoada por não dar fruto" },
      ],
    },
  },
  boss: {
    questions: [
      { question: "Quem batizou Jesus no rio Jordão?", options: ["João Batista", "Pedro", "Elias", "André"], correct: "João Batista" },
      { question: "O que Jesus fez ao mar durante a tempestade?", options: ["Acalmou-o", "Secou-o", "Dividiu-o", "Incendiou-o"], correct: "Acalmou-o" },
      { question: "Com quantos pães Jesus alimentou os cinco mil?", options: ["Cinco", "Doze", "Dois", "Sete"], correct: "Cinco" },
      { question: "Quem apareceu com Jesus na transfiguração?", options: ["Moisés e Elias", "Abraão e Isaque", "Davi e Salomão", "Pedro e Tiago"], correct: "Moisés e Elias" },
      { question: "O que as mulheres encontraram no domingo?", options: ["O túmulo vazio", "Guardas dormindo", "Uma tempestade", "Um anjo em chamas"], correct: "O túmulo vazio" },
    ],
    story: {
      open: "Ainda que a tua legião seja incontável, a minha palavra tem autoridade sobre ti.",
      turns: [
        { ask: "Sai deste homem, espírito imundo!", hit: "A Legião recua diante da tua palavra! 💥", miss: "Não te cales — ordena outra vez." },
        { ask: "Aquietei o vento e o mar; também te aquieto.", hit: "A tempestade e o mal se calam! 🌊", miss: "Firme-te; a fé não afunda." },
        { ask: "Reparti cinco pães e saciei a multidão.", hit: "A escassez se rende à provisão! 🍞", miss: "Confia — nada te faltará." },
        { ask: "No monte fui transfigurado em glória.", hit: "A luz dispersa as trevas! ✨", miss: "Ergue os olhos ao alto." },
        { ask: "Desci à cruz e ressurgi do túmulo.", hit: "Golpe final — a morte é vencida! ✝️", miss: "A pedra há de rolar." },
      ],
      win: "A Legião foi expulsa; o túmulo vazio proclama que o Rei vive.",
      winHero: "As trevas fugiram — Cristo venceu! 🙌",
    },
  },
};
