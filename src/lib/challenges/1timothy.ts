import type { BookChallenges } from "@/lib/rpgChallengeContent";

// 1 Timóteo (6 caps). Ciclo por capítulo: (c-1)%6.
// 1=order, 2=wordsearch, 3=crossword, 4=complete, 5=connect, 6=boss (último).
export const TIMOTHY1_CH: BookChallenges = {
  order: {
    1: {
      title: "Ordene: a sã doutrina em Éfeso", sub: "Toque nas cartas na sequência certa.", verse: 20,
      win: "🎉 A sã doutrina posta em ordem!",
      items: [
        { d: 1, em: "📜", l: "Paulo deixa Timóteo em Éfeso" },
        { d: 2, em: "🚫", l: "Que refute fábulas e falsos mestres" },
        { d: 3, em: "⚖️", l: "A lei é boa, se bem usada" },
        { d: 4, em: "🙏", l: "Paulo: 'fui o principal dos pecadores'" },
      ],
    },
  },
  wordsearch: {
    2: {
      title: "Caça-palavras — Oração por todos",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["ORAÇÃO", "SÚPLICA", "TODOS", "PAZ", "MEDIADOR", "VERDADE"],
    },
  },
  crossword: {
    3: {
      title: "Palavra cruzada — Bispos e diáconos",
      grid: ["BISPO", "O....", "M...."],
      across: ["→ Quem aspira a este ofício deseja excelente obra (5)"],
      down: ["↓ O bispo deve ter ___ testemunho dos de fora (3)"],
    },
  },
  complete: {
    4: {
      ref: "1 Timóteo 4:7-8",
      before: "Exercita-te a ti mesmo em ",
      answer: "piedade",
      after: ", porque o exercício corporal para pouco aproveita.",
      options: ["piedade", "riqueza", "fábulas", "ciência"],
    },
  },
  connect: {
    5: {
      title: "Ligue — Honra na casa de Deus", sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Viúvas", b: "amparar as verdadeiramente desamparadas" },
        { a: "Presbíteros", b: "dignos de dobrada honra" },
        { a: "Ancião", b: "exortar como a um pai" },
        { a: "Vinho", b: "um pouco, por causa do estômago" },
      ],
    },
  },
  boss: {
    questions: [
      { question: "Quem Paulo deixou em Éfeso para corrigir os falsos mestres?", options: ["Timóteo", "Tito", "Silas", "Lucas"], correct: "Timóteo" },
      { question: "Por quem Paulo manda que se faça oração?", options: ["Por todos os homens e autoridades", "Só pelos apóstolos", "Só pelos ricos", "Só por Israel"], correct: "Por todos os homens e autoridades" },
      { question: "O que o bispo deve governar bem, segundo 1 Timóteo 3?", options: ["A sua própria casa", "O exército", "As finanças da cidade", "O templo"], correct: "A sua própria casa" },
      { question: "Complete: 'O amor ao dinheiro é a raiz de...'", options: ["todos os males", "toda sabedoria", "toda paz", "todo poder"], correct: "todos os males" },
      { question: "Que combate Paulo ordena que se combata?", options: ["O bom combate da fé", "A batalha por terras", "A guerra contra Roma", "A disputa por honras"], correct: "O bom combate da fé" },
    ],
    story: {
      open: "Levanta-te, soldado da fé: os Falsos Ensinadores semeiam fábulas — combate o bom combate.",
      turns: [
        { ask: "Eles ensinam outra doutrina e vãs contendas.", hit: "A sã doutrina prevalece! 📜", miss: "Retém a verdade e persiste." },
        { ask: "Desprezam a oração por todos os homens.", hit: "A súplica rompe as trevas! 🙏", miss: "Não cesses de orar." },
        { ask: "Distorcem os requisitos de bispos e diáconos.", hit: "A casa de Deus se firma! 🏛️", miss: "Guarda o bom depósito." },
        { ask: "Zombam da piedade e amam o dinheiro.", hit: "A piedade com contentamento vence! 💰", miss: "Foge da cobiça, busca a justiça." },
        { ask: "Querem sufocar a tua fé jovem.", hit: "Golpe final — pelejaste o bom combate! 🛡️", miss: "A coroa da fé te espera." },
      ],
      win: "Os Falsos Ensinadores caem: guardou-se a fé e conservou-se a sã doutrina.",
      winHero: "Combati o bom combate — a fé venceu! 🙌",
    },
  },
};
