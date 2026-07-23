import type { BookChallenges } from "@/lib/rpgChallengeContent";

// Zacarias (14 caps). Ciclo (c-1)%6: 0=ordenar,1=caça,2=cruzada,3=completar,4=ligar,5=quiz.
// order:1,7,13 · wordsearch:2,8 · crossword:3,9 · complete:4,10 · connect:5,11 · cap.14=boss.
export const ZECHARIAH_CH: BookChallenges = {
  order: {
    1: {
      title: "Ordene: o chamado e as visões noturnas", sub: "Toque nas cartas na sequência certa.", verse: 21,
      win: "🎉 A palavra do Senhor em ordem!",
      items: [
        { d: 1, em: "📜", l: "Zacarias profetiza nos dias de Dario" },
        { d: 2, em: "🔄", l: "'Voltai para mim, e eu voltarei para vós'" },
        { d: 3, em: "🐴", l: "Visão do homem entre as murtas e os cavalos" },
        { d: 4, em: "🔨", l: "Visão dos quatro chifres e dos ferreiros" },
      ],
    },
    7: {
      title: "Ordene: o jejum e o juízo verdadeiro", sub: "Toque nas cartas na sequência certa.", verse: 14,
      win: "🎉 A justiça acima do rito!",
      items: [
        { d: 1, em: "❓", l: "Homens de Betel perguntam sobre o jejum" },
        { d: 2, em: "🍽️", l: "Deus indaga: 'Jejuastes para mim?'" },
        { d: 3, em: "⚖️", l: "Ordena: 'Julgai com verdade e misericórdia'" },
        { d: 4, em: "💨", l: "O povo endurece o coração e é disperso" },
      ],
    },
    13: {
      title: "Ordene: a fonte e o refino do povo", sub: "Toque nas cartas na sequência certa.", verse: 9,
      win: "🎉 Provados como ouro!",
      items: [
        { d: 1, em: "⛲", l: "Abre-se uma fonte contra o pecado" },
        { d: 2, em: "🛑", l: "Ídolos e falsos profetas são eliminados" },
        { d: 3, em: "🐑", l: "'Fere o pastor, e as ovelhas se dispersarão'" },
        { d: 4, em: "🔥", l: "O remanescente é provado como ouro no fogo" },
      ],
    },
  },
  wordsearch: {
    2: {
      title: "Caça-palavras — O homem com o cordel de medir",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["MEDIDA", "CORDEL", "JERUSALÉM", "MURO", "FOGO", "SIÃO"],
    },
    8: {
      title: "Caça-palavras — Jerusalém restaurada",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["VERDADE", "JERUSALÉM", "ANCIÃO", "ALEGRIA", "PRÓXIMO", "FESTA"],
    },
  },
  crossword: {
    3: {
      title: "Palavra cruzada — Josué, o sumo sacerdote",
      grid: ["JOSUE", "U....", "S....", "T....", "O...."],
      across: ["→ O sumo sacerdote acusado diante do anjo (5)"],
      down: ["↓ Como Deus torna o pecador ao trocar-lhe as vestes (5)"],
    },
    9: {
      title: "Palavra cruzada — O Rei humilde",
      grid: ["JUMENTO", "U......", "S......", "T......", "O......"],
      across: ["→ Sobre o que o Rei entra em Jerusalém (7)"],
      down: ["↓ Como o profeta descreve o Rei que vem a Sião (5)"],
    },
  },
  complete: {
    4: {
      ref: "Zacarias 4:6",
      before: "Não por força nem por violência, mas pelo meu",
      answer: "Espírito",
      after: ", diz o Senhor dos Exércitos.",
      options: ["Espírito", "poder", "exército", "braço"],
    },
    10: {
      ref: "Zacarias 10:12",
      before: "Eu os fortalecerei no Senhor, e andarão no seu",
      answer: "nome",
      after: ", diz o Senhor.",
      options: ["nome", "poder", "temor", "caminho"],
    },
  },
  connect: {
    5: {
      title: "Ligue — O rolo e o efa", sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Rolo voante", b: "maldição sobre o ladrão e o perjuro" },
        { a: "O efa", b: "a medida que sai por toda a terra" },
        { a: "A mulher no efa", b: "a impiedade escondida" },
        { a: "Terra de Sinar", b: "para onde o efa é levado" },
      ],
    },
    11: {
      title: "Ligue — Os pastores e o salário", sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Trinta moedas de prata", b: "o preço lançado ao oleiro" },
        { a: "Cajado Suavidade", b: "o concerto quebrado com os povos" },
        { a: "Cajado União", b: "a irmandade entre Judá e Israel" },
        { a: "O pastor insensato", b: "que abandona o rebanho" },
      ],
    },
  },
  boss: {
    questions: [
      { question: "Segundo Zacarias 4:6, como se realiza a obra de Deus?", options: ["'Não por força nem violência, mas pelo meu Espírito'", "'Pela espada e pelo arco'", "'Pela riqueza dos reis'", "'Pelo número dos exércitos'"], correct: "'Não por força nem violência, mas pelo meu Espírito'" },
      { question: "Sobre o que o Rei humilde entra em Jerusalém (cap. 9)?", options: ["Sobre um jumentinho", "Num cavalo de guerra", "Num carro de ouro", "Sobre um camelo"], correct: "Sobre um jumentinho" },
      { question: "O que o profeta viu no candelabro de ouro (cap. 4)?", options: ["Duas oliveiras ao lado dele", "Sete leões", "Quatro anjos", "Um trono de fogo"], correct: "Duas oliveiras ao lado dele" },
      { question: "O que o povo fará ao olhar para aquele a quem traspassaram (cap. 12)?", options: ["Prantearão como por um filho único", "Fugirão para os montes", "Guardarão silêncio", "Erguerão um altar"], correct: "Prantearão como por um filho único" },
      { question: "Por quanto foi avaliado o pastor em Zacarias 11?", options: ["Trinta moedas de prata", "Dez peças de ouro", "Cem siclos", "Um cordeiro"], correct: "Trinta moedas de prata" },
    ],
    story: {
      open: "Eu sou o Adversário, o acusador diante do trono. Que tens tu, pó da terra, para responder às minhas acusações?",
      turns: [
        { ask: "Vejo tuas vestes imundas — quem te declararia limpo?", hit: "O Senhor te repreenda! As vestes sujas caem e a justiça me cobre! ✨", miss: "A acusação pesa... firma-te." },
        { ask: "Tua força é pequena; teu templo jamais se erguerá.", hit: "Não por força nem violência, mas pelo Espírito do Senhor! 💥", miss: "Não confies no teu próprio braço — espera." },
        { ask: "Teu rei virá com carros e cavalos de guerra, como todos.", hit: "Não! Vem justo e humilde, sobre um jumentinho! 🐴", miss: "Ergue os olhos outra vez." },
        { ask: "Aquele a quem traspassaram foi esquecido para sempre.", hit: "Olharão para Ele e prantearão — e a fonte se abrirá! ⛲", miss: "A ferida ainda dói; resiste." },
        { ask: "Nenhum rei reinará sobre toda a terra.", hit: "Golpe final — o Senhor será Rei sobre toda a terra! 👑", miss: "A promessa não falha; volta a crer." },
      ],
      win: "O acusador é repreendido, o monte das Oliveiras se abre e as águas vivas correm de Jerusalém. 'Naquele dia um será o Senhor, e um será o seu nome.'",
      winHero: "Santidade ao Senhor — o Adversário caiu! 🙌",
    },
  },
};
