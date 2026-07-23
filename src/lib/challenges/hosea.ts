import type { BookChallenges } from "@/lib/rpgChallengeContent";

// Oséias (14 caps). Ciclo (c-1)%6: 0=ordenar,1=caça,2=cruzada,3=completar,4=ligar,5=quiz.
// order:1,7,13 | wordsearch:2,8 | crossword:3,9 | complete:4,10 | connect:5,11 | boss:14 (último).
export const HOSEA_CH: BookChallenges = {
  order: {
    1: {
      title: "Ordene: Oséias e Gômer", sub: "Toque nas cartas na sequência certa.", verse: 9,
      win: "🎉 Os sinais da infidelidade em ordem!",
      items: [
        { d: 1, em: "💍", l: "Deus manda Oséias casar com Gômer" },
        { d: 2, em: "👶", l: "Nasce Jezreel, o primeiro filho" },
        { d: 3, em: "💔", l: "Nasce Lo-Ruama: 'não amada'" },
        { d: 4, em: "🚫", l: "Nasce Lo-Ami: 'não meu povo'" },
      ],
    },
    7: {
      title: "Ordene: a corrupção de Efraim", sub: "Toque nas cartas na sequência certa.", verse: 16,
      win: "🎉 O retrato de Efraim revelado!",
      items: [
        { d: 1, em: "🩹", l: "Deus quer curar, mas surge a maldade" },
        { d: 2, em: "🔥", l: "Acendem o coração como um forno" },
        { d: 3, em: "🥮", l: "Efraim é bolo não virado, meio cru" },
        { d: 4, em: "🕊️", l: "Como pomba tola, clamam ao Egito" },
      ],
    },
    13: {
      title: "Ordene: o juízo e a esperança", sub: "Toque nas cartas na sequência certa.", verse: 14,
      win: "🎉 Do juízo brota a esperança!",
      items: [
        { d: 1, em: "🐂", l: "Efraim se exalta e peca com Baal" },
        { d: 2, em: "🪙", l: "Fazem ídolos de prata para si" },
        { d: 3, em: "🦁", l: "Deus os encontra como leão no caminho" },
        { d: 4, em: "🌅", l: "'Ó morte, onde estão as tuas pragas?'" },
      ],
    },
  },
  wordsearch: {
    2: {
      title: "Caça-palavras — Desposar-te-ei para sempre",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["ISRAEL", "DESERTO", "DESPOSAR", "JUSTIÇA", "AMOR", "ALIANÇA"],
    },
    8: {
      title: "Caça-palavras — Semeiam vento",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["VENTO", "BEZERRO", "SAMARIA", "ÍDOLO", "ALTAR", "ESQUECEU"],
    },
  },
  crossword: {
    3: {
      title: "Palavra cruzada — A esposa recomprada",
      grid: ["AMOR", "M...", "A...", "D...", "A..."],
      across: ["→ O que Deus tem pela esposa infiel (4)"],
      down: ["↓ Como Deus chama a mulher que recompra (5)"],
    },
    9: {
      title: "Palavra cruzada — O exílio anunciado",
      grid: ["EGITO", "F....", "R....", "A....", "I....", "M...."],
      across: ["→ Para onde Israel voltaria no cativeiro (5)"],
      down: ["↓ O reino do norte que é repreendido (6)"],
    },
  },
  complete: {
    4: {
      ref: "Oséias 4:6",
      before: "O meu povo foi destruído, porque lhe faltou o ",
      answer: "conhecimento",
      after: " de Deus.",
      options: ["conhecimento", "ouro", "pão", "descanso"],
    },
    10: {
      ref: "Oséias 10:12",
      before: "Semeai para vós em justiça, e segai segundo a ",
      answer: "misericórdia",
      after: "; lavrai o campo de lavoura.",
      options: ["misericórdia", "riqueza", "força", "glória"],
    },
  },
  connect: {
    5: {
      title: "Ligue — o juízo sobre Efraim", sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Sacerdotes", b: "repreendidos por tropeçar" },
        { a: "Efraim", b: "ferido no dia do juízo" },
        { a: "Deus", b: "como leão contra os infiéis" },
        { a: "O Senhor", b: "recolhe-se até que o busquem" },
      ],
    },
    11: {
      title: "Ligue — o amor do Pai por Efraim", sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Menino Israel", b: "a quem Deus amou" },
        { a: "Do Egito", b: "chamei o meu filho" },
        { a: "Efraim", b: "ensinado a andar por Deus" },
        { a: "Cordas de amor", b: "laços com que os atraí" },
      ],
    },
  },
  boss: {
    questions: [
      { question: "Com quem Deus mandou Oséias se casar?", options: ["Gômer", "Rute", "Ester", "Ana"], correct: "Gômer" },
      { question: "O que os nomes dos filhos de Oséias anunciavam?", options: ["O juízo sobre Israel", "A vitória de Judá", "A queda do Egito", "A paz eterna"], correct: "O juízo sobre Israel" },
      { question: "Por quanto Oséias recomprou Gômer?", options: ["Quinze peças de prata e cevada", "Trinta moedas de ouro", "Um rebanho de ovelhas", "Uma casa em Belém"], correct: "Quinze peças de prata e cevada" },
      { question: "Que promessa Deus fez: '___-te-ei comigo para sempre'?", options: ["Desposar", "Julgar", "Esquecer", "Vender"], correct: "Desposar" },
      { question: "O que Deus disse desejar mais do que sacrifício?", options: ["Misericórdia", "Ouro", "Jejum", "Templos"], correct: "Misericórdia" },
    ],
    story: {
      open: "A Infidelidade ergue-se contra o meu povo; mas o meu amor é mais forte. Levanta-te!",
      turns: [
        { ask: "Casaste com Gômer por ordenança do meu amor.", hit: "O amor busca a infiel! 💍", miss: "Não recues; eu te sustento." },
        { ask: "Recompraste a esposa vendida ao pecado.", hit: "O resgate quebra as cadeias! ⛓️", miss: "Firma-te outra vez." },
        { ask: "Anunciaste: quero misericórdia, não sacrifício.", hit: "A misericórdia vence! 🕊️", miss: "Espera em mim." },
        { ask: "Chamaste Israel de volta pelo deserto.", hit: "O deserto vira porta de esperança! 🌅", miss: "Ergue a voz de novo." },
        { ask: "'Desposar-te-ei comigo para sempre.'", hit: "Golpe final — o amor restaura! 💛", miss: "A promessa não falha." },
      ],
      win: "A Infidelidade caiu; Deus curou a apostasia e amou o seu povo livremente — Israel floresce como o lírio.",
      winHero: "O amor fiel restaurou a esposa infiel! 🙌",
    },
  },
};
