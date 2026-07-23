import type { BookChallenges } from "@/lib/rpgChallengeContent";

// Romanos (16 caps). Ciclo (c-1)%6: 0=order,1=wordsearch,2=crossword,3=complete,4=connect,5=quiz.
// order:1,7,13 | wordsearch:2,8,14 | crossword:3,9,15 | complete:4,10 | connect:5,11 | boss:16 (último).
export const ROMANS_CH: BookChallenges = {
  order: {
    1: {
      title: "Ordene: o evangelho chega a Roma", sub: "Toque nas cartas na sequência certa.", verse: 32,
      win: "🎉 O poder de Deus para a salvação!",
      items: [
        { d: 1, em: "✉️", l: "Paulo deseja visitar os irmãos em Roma" },
        { d: 2, em: "📜", l: "'O justo viverá pela fé'" },
        { d: 3, em: "🗿", l: "Os homens adoram a criatura, não o Criador" },
        { d: 4, em: "🔥", l: "A ira de Deus se revela contra a injustiça" },
      ],
    },
    7: {
      title: "Ordene: a luta interior", sub: "Toque nas cartas na sequência certa.", verse: 25,
      win: "🎉 Graças a Deus, por Jesus Cristo!",
      items: [
        { d: 1, em: "⛓️", l: "Pela morte de Cristo, livres da lei" },
        { d: 2, em: "🔍", l: "A lei revela o que é o pecado" },
        { d: 3, em: "😣", l: "'Não faço o bem que quero, mas o mal'" },
        { d: 4, em: "🙏", l: "'Miserável homem! Quem me livrará?'" },
      ],
    },
    13: {
      title: "Ordene: o amor e a lei", sub: "Toque nas cartas na sequência certa.", verse: 14,
      win: "🎉 O amor é o cumprimento da lei!",
      items: [
        { d: 1, em: "🏛️", l: "Sujeitem-se às autoridades constituídas" },
        { d: 2, em: "💰", l: "Deem a cada um o que lhe é devido" },
        { d: 3, em: "💛", l: "'A ninguém devais nada, senão o amor'" },
        { d: 4, em: "📖", l: "O amor é o cumprimento da lei" },
      ],
    },
  },
  wordsearch: {
    2: {
      title: "Caça-palavras — o justo juízo de Deus",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["JUÍZO", "LEI", "JUDEU", "GENTIO", "CORAÇÃO", "VERDADE"],
    },
    8: {
      title: "Caça-palavras — mais que vencedores",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["ESPÍRITO", "VIDA", "FILHOS", "VENCEDOR", "AMOR", "GLÓRIA"],
    },
    14: {
      title: "Caça-palavras — não julgue o irmão",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["JULGAR", "FRACO", "IRMÃO", "PAZ", "ALEGRIA", "REINO"],
    },
  },
  crossword: {
    3: {
      title: "Palavra cruzada — todos pecaram",
      grid: ["GRACA", "L....", "O....", "R....", "I....", "A...."],
      across: ["→ Justificados gratuitamente pela sua ... (5)"],
      down: ["↓ Destituídos estão da ... de Deus (6)"],
    },
    9: {
      title: "Palavra cruzada — Israel e a promessa",
      grid: ["ISRAEL", "S.....", "A.....", "Q.....", "U.....", "E....."],
      across: ["→ Povo escolhido, descendência de Jacó (6)"],
      down: ["↓ Filho da promessa de Abraão (6)"],
    },
    15: {
      title: "Palavra cruzada — o Deus da esperança",
      grid: ["ESPERANCA", "S........", "P........", "A........", "N........", "H........", "A........"],
      across: ["→ O Deus dela vos encha de alegria e paz (9)"],
      down: ["↓ Terra aonde Paulo desejava ir pregar (7)"],
    },
  },
  complete: {
    4: {
      ref: "Romanos 4:3",
      before: "Creu Abraão a Deus, e isso lhe foi imputado como ",
      answer: "justiça",
      after: ".",
      options: ["justiça", "fé", "graça", "lei"],
    },
    10: {
      ref: "Romanos 10:17",
      before: "A fé vem pelo ouvir, e o ouvir pela ",
      answer: "palavra",
      after: " de Cristo.",
      options: ["palavra", "lei", "voz", "promessa"],
    },
  },
  connect: {
    5: {
      title: "Ligue — paz com Deus",
      sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Justificados pela fé", b: "paz com Deus" },
        { a: "A tribulação", b: "produz perseverança" },
        { a: "Por um só homem, Adão", b: "entrou o pecado" },
        { a: "Cristo morreu por nós", b: "quando éramos pecadores" },
      ],
    },
    11: {
      title: "Ligue — a oliveira de Israel",
      sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Restante escolhido", b: "pela graça" },
        { a: "Os gentios", b: "enxertados na oliveira" },
        { a: "Não te glories", b: "contra os ramos" },
        { a: "Todo o Israel", b: "será salvo" },
      ],
    },
  },
  boss: {
    questions: [
      { question: "Segundo Romanos, quantos pecaram e carecem da glória de Deus?", options: ["Todos", "Apenas alguns", "Só os gentios", "Só os judeus"], correct: "Todos" },
      { question: "Como o pecador é justificado diante de Deus?", options: ["Pela fé", "Pelas obras da lei", "Por sacrifícios de animais", "Pelo nascimento"], correct: "Pela fé" },
      { question: "Quem é o pai da fé citado em Romanos 4?", options: ["Abraão", "Moisés", "Davi", "Noé"], correct: "Abraão" },
      { question: "Segundo Romanos 6, qual é o salário do pecado?", options: ["A morte", "A pobreza", "A doença", "O exílio"], correct: "A morte" },
      { question: "Em Romanos 8, o que pode nos separar do amor de Deus?", options: ["Nada", "A morte", "Os anjos", "As tribulações"], correct: "Nada" },
    ],
    story: {
      open: "Levanta-te, guerreiro: hoje enfrentas o Poder do Pecado, que a todos escraviza. Mas onde ele abundou, a graça superabunda.",
      turns: [
        { ask: "O Pecado declara: 'Todos são meus, todos pecaram!'", hit: "Todos pecaram — mas todos podem ser justificados! 💥", miss: "Não recues; a verdade te sustenta." },
        { ask: "'Nenhuma obra vossa vos salvará', ele zomba.", hit: "A justificação vem pela fé, não pelas obras! ⚔️", miss: "Firma o pé na fé." },
        { ask: "'A lei vos condena', ruge o inimigo.", hit: "Cristo cumpriu a lei e nos deu paz com Deus! ✨", miss: "Ergue o escudo da fé." },
        { ask: "'O meu salário é a morte', ameaça o Pecado.", hit: "Mas o dom de Deus é a vida eterna em Cristo! 🕊️", miss: "Resiste; a vida é mais forte." },
        { ask: "'Eu vos separarei do amor de Deus!'", hit: "Nada nos separa — somos mais que vencedores! 🙌", miss: "Segura firme; o amor não falha." },
      ],
      win: "O Poder do Pecado caiu por terra: onde o pecado abundou, superabundou a graça.",
      winHero: "Mais que vencedores, por aquele que nos amou! 🙌",
    },
  },
};
