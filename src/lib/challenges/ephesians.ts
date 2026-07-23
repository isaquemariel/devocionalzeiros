import type { BookChallenges } from "@/lib/rpgChallengeContent";

// Efésios (6 caps). Ciclo por capítulo: 1=ordenar, 2=caça-palavras, 3=cruzada,
// 4=completar, 5=ligar, 6=boss (último capítulo — A ARMADURA DE DEUS).
export const EPHESIANS_CH: BookChallenges = {
  order: {
    1: {
      title: "Ordene: as bênçãos espirituais em Cristo", sub: "Toque nas cartas na sequência certa.", verse: 14,
      win: "🎉 Toda bênção espiritual em ordem!",
      items: [
        { d: 1, em: "🙌", l: "Deus nos escolheu antes da fundação do mundo" },
        { d: 2, em: "💗", l: "Predestinou-nos para a adoção de filhos" },
        { d: 3, em: "🩸", l: "Redenção e perdão pelo seu sangue" },
        { d: 4, em: "🕊️", l: "Selados com o Espírito Santo prometido" },
      ],
    },
  },
  wordsearch: {
    2: {
      title: "Caça-palavras — Salvos pela graça mediante a fé",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["GRAÇA", "FÉ", "SALVOS", "DÁDIVA", "CRISTO", "PAZ"],
    },
  },
  crossword: {
    3: {
      title: "Palavra cruzada — O mistério da igreja",
      grid: ["MISTERIO", "E.......", "M.......", "B.......", "R.......", "O.......", "S......."],
      across: ["→ O segredo revelado: gentios co-herdeiros em Cristo (8)"],
      down: ["↓ Judeus e gentios são deste mesmo corpo (7)"],
    },
  },
  complete: {
    4: {
      ref: "Efésios 4:24",
      before: "e vos revistais do novo",
      answer: "homem",
      after: ", criado segundo Deus, em verdadeira justiça e santidade",
      options: ["homem", "coração", "espírito", "caminho"],
    },
  },
  connect: {
    5: {
      title: "Ligue — Maridos e esposas em Cristo",
      sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Maridos", b: "amai vossas esposas" },
        { a: "Esposas", b: "sujeitas como ao Senhor" },
        { a: "Cristo e a Igreja", b: "grande mistério" },
        { a: "Cheios", b: "do Espírito, não de vinho" },
      ],
    },
  },
  boss: {
    questions: [
      { question: "Segundo Efésios, somos salvos pela graça mediante o quê?", options: ["A fé", "As obras", "A lei", "Os sacrifícios"], correct: "A fé" },
      { question: "Qual peça da armadura de Deus é a Palavra de Deus?", options: ["A espada do Espírito", "O capacete", "As sandálias", "O cinto"], correct: "A espada do Espírito" },
      { question: "Contra quem é a nossa luta, segundo Efésios 6?", options: ["Contra os principados e potestades", "Contra carne e sangue", "Contra reis da terra", "Contra nós mesmos"], correct: "Contra os principados e potestades" },
      { question: "O que apaga todos os dardos inflamados do maligno?", options: ["O escudo da fé", "O capacete da salvação", "As sandálias da paz", "A couraça da justiça"], correct: "O escudo da fé" },
      { question: "Judeus e gentios foram reconciliados em Cristo, tornando-se o quê?", options: ["Um só corpo", "Dois povos", "Inimigos", "Estrangeiros"], correct: "Um só corpo" },
    ],
    story: {
      open: "Revesti-vos de toda a minha armadura, para poderdes resistir no dia mau, filhos meus.",
      turns: [
        { ask: "Cingi os vossos lombos com a verdade.", hit: "O cinto da verdade te firma! 🥋", miss: "Não vacile — cinge-te de novo." },
        { ask: "Vesti a couraça da justiça sobre o peito.", hit: "A couraça te guarda o coração! 🛡️", miss: "Ergue a defesa outra vez." },
        { ask: "Calçai os pés com o evangelho da paz.", hit: "A paz te faz avançar! 👣", miss: "Firma o passo, não recues." },
        { ask: "Tomai o escudo da fé contra os dardos.", hit: "Os dardos inflamados se apagam! ✨", miss: "Levanta o escudo, resiste!" },
        { ask: "Empunhai o capacete da salvação e a espada do Espírito.", hit: "Golpe final — a Palavra prevalece! ⚔️", miss: "A vitória é minha; permanece." },
      ],
      win: "As potestades das trevas caem diante do Cristo vencedor — firmes até o fim.",
      winHero: "A armadura resistiu — vitória em Cristo! 🙌",
    },
  },
};
