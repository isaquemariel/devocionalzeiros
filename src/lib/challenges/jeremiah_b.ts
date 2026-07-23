import type { BookChallenges } from "@/lib/rpgChallengeContent";

// Jeremias — parte B (caps. 27–52). Livro de 52 capítulos.
// Ciclo (c-1)%6: 0=order,1=wordsearch,2=crossword,3=complete,4=connect,5=quiz(IA).
// Cap. 52 é o último → boss "O Leão do Norte" (sem jogo do ciclo).
export const JEREMIAH_B: BookChallenges = {
  order: {
    31: {
      title: "Ordene: a nova aliança", sub: "Toque nas cartas na sequência certa.", verse: 33,
      win: "🎉 A lei escrita no coração!",
      items: [
        { d: 1, em: "💗", l: "'Com amor eterno te amei'" },
        { d: 2, em: "😢", l: "Raquel chora por seus filhos" },
        { d: 3, em: "🔄", l: "Efraim se arrepende e volta" },
        { d: 4, em: "❤️", l: "Nova aliança: a lei no coração" },
      ],
    },
    37: {
      title: "Ordene: o profeta preso", sub: "Toque nas cartas na sequência certa.", verse: 21,
      win: "🎉 A palavra não foi silenciada!",
      items: [
        { d: 1, em: "🙏", l: "Zedequias pede oração ao profeta" },
        { d: 2, em: "🐫", l: "O Egito faz os caldeus recuarem" },
        { d: 3, em: "⛓️", l: "Jeremias é preso como desertor" },
        { d: 4, em: "🤫", l: "O rei o consulta em segredo" },
      ],
    },
    43: {
      title: "Ordene: a fuga para o Egito", sub: "Toque nas cartas na sequência certa.", verse: 13,
      win: "🎉 A palavra alcança até o Egito!",
      items: [
        { d: 1, em: "🚫", l: "Rejeitam a ordem de ficar na terra" },
        { d: 2, em: "⛓️", l: "Arrastam Jeremias para o Egito" },
        { d: 3, em: "🏜️", l: "Chegam a Tafnes" },
        { d: 4, em: "🪨", l: "Pedras escondidas anunciam Babilônia" },
      ],
    },
    49: {
      title: "Ordene: o juízo das nações", sub: "Toque nas cartas na sequência certa.", verse: 39,
      win: "🎉 Nenhuma nação escapa ao juízo!",
      items: [
        { d: 1, em: "🏹", l: "Contra Amom e seus ídolos" },
        { d: 2, em: "🏔️", l: "Contra Edom, morada nas rochas" },
        { d: 3, em: "🏙️", l: "Contra Damasco, em pânico" },
        { d: 4, em: "🏕️", l: "Contra Quedar e Elão" },
      ],
    },
  },
  wordsearch: {
    32: {
      title: "Caça-palavras — Jeremias compra o campo",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["CAMPO", "ANATOTE", "PRATA", "ESCRITURA", "COMPRA", "SINAL"],
    },
    38: {
      title: "Caça-palavras — Jeremias no poço",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["POÇO", "LAMA", "CORDAS", "TRAPOS", "CISTERNA", "RESGATE"],
    },
    44: {
      title: "Caça-palavras — advertência no Egito",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["EGITO", "ÍDOLOS", "INCENSO", "RAINHA", "JUÍZO", "CÉUS"],
    },
    50: {
      title: "Caça-palavras — a queda de Babilônia",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["BABILÔNIA", "BEL", "QUEDA", "CALDEUS", "REDENTOR", "REBANHO"],
    },
  },
  crossword: {
    27: {
      title: "Palavra cruzada — o jugo de Babilônia",
      grid: ["JUGO", "U...", "D...", "A..."],
      across: ["→ Símbolo de madeira que Jeremias pôs ao pescoço (4)"],
      down: ["↓ O reino do sul, terra do profeta (4)"],
    },
    33: {
      title: "Palavra cruzada — chama-me e responder-te-ei",
      grid: ["RENOVO", "E.....", "I.....", "N.....", "O....."],
      across: ["→ O justo rebento prometido da casa de Davi (6)"],
      down: ["↓ Governo restaurado do trono de Davi (5)"],
    },
    39: {
      title: "Palavra cruzada — a queda de Jerusalém",
      grid: ["FUGA", "O...", "G...", "O..."],
      across: ["→ O que Zedequias tentou ao ver a cidade tomada (4)"],
      down: ["↓ O que consumiu o templo e a cidade (4)"],
    },
    45: {
      title: "Palavra cruzada — palavra a Baruque",
      grid: ["BARUQUE", "U......", "S......", "C......", "A......"],
      across: ["→ O escriba fiel a quem Deus falou (7)"],
      down: ["↓ O que ele não devia fazer por grandezas (5)"],
    },
    51: {
      title: "Palavra cruzada — o fim de Babilônia",
      grid: ["EUFRATES", "X.......", "I.......", "L.......", "I.......", "O......."],
      across: ["→ Rio onde o livro contra Babilônia foi lançado (8)"],
      down: ["↓ O cativeiro do qual o povo voltaria (6)"],
    },
  },
  complete: {
    28: {
      ref: "Jeremias 28:13",
      before: "Jugos de madeira quebraste; farei, porém, em seu lugar, jugos de ",
      answer: "ferro",
      after: ".",
      options: ["ferro", "ouro", "prata", "barro"],
    },
    34: {
      ref: "Jeremias 34:15",
      before: "Vós vos convertestes e fizestes o que é reto, proclamando cada um ",
      answer: "liberdade",
      after: " ao seu próximo.",
      options: ["liberdade", "justiça", "paz", "riqueza"],
    },
    40: {
      ref: "Jeremias 40:9",
      before: "Não temais servir aos caldeus; habitai na ",
      answer: "terra",
      after: " e servi ao rei da Babilônia.",
      options: ["terra", "cidade", "montanha", "casa"],
    },
    46: {
      ref: "Jeremias 46:2",
      before: "O exército de Faraó Neco estava junto ao rio ",
      answer: "Eufrates",
      after: ", em Carquemis.",
      options: ["Eufrates", "Nilo", "Jordao", "Tigre"],
    },
  },
  connect: {
    29: {
      title: "Ligue — a carta aos exilados",
      sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "70 anos", b: "tempo do exílio na Babilônia" },
        { a: "Casas", b: "'edificai e plantai jardins'" },
        { a: "Paz da cidade", b: "'buscai a paz de onde vos levei'" },
        { a: "29:11", b: "'planos de paz e não de mal'" },
      ],
    },
    35: {
      title: "Ligue — os recabitas fiéis",
      sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Recabitas", b: "recusaram-se a beber vinho" },
        { a: "Jonadabe", b: "pai que ordenou a abstinência" },
        { a: "Tendas", b: "morar sem casas nem plantações" },
        { a: "Obediência", b: "exemplo contra a rebeldia de Judá" },
      ],
    },
    41: {
      title: "Ligue — a traição em Mispá",
      sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Ismael", b: "assassinou o governador" },
        { a: "Gedalias", b: "governador morto à mesa" },
        { a: "Mispá", b: "lugar da traição" },
        { a: "Joanã", b: "perseguiu o assassino" },
      ],
    },
    47: {
      title: "Ligue — o juízo dos filisteus",
      sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Filisteus", b: "povo alvo da profecia" },
        { a: "Gaza", b: "cidade filisteia ferida" },
        { a: "Ascalom", b: "cidade que seria destruída" },
        { a: "Águas do norte", b: "inundação vinda do inimigo" },
      ],
    },
  },
  boss: {
    questions: [
      { question: "Na nova aliança, onde Deus prometeu escrever a sua lei?", options: ["No coração", "Em tábuas de pedra", "No templo", "Nos livros"], correct: "No coração" },
      { question: "Onde Jeremias foi lançado e afundou na lama?", options: ["Numa cisterna", "Numa cova de leões", "Numa fornalha", "Num navio"], correct: "Numa cisterna" },
      { question: "Quem tirou Jeremias do poço com cordas e trapos?", options: ["Ebede-Meleque", "Baruque", "Gedalias", "Zedequias"], correct: "Ebede-Meleque" },
      { question: "O que aconteceu a Jerusalém no fim do livro?", options: ["Foi tomada e queimada", "Foi poupada", "Tornou-se capital", "Foi reconstruída"], correct: "Foi tomada e queimada" },
      { question: "Que reino do norte Deus usou como instrumento de juízo?", options: ["Babilônia", "Egito", "Assíria", "Pérsia"], correct: "Babilônia" },
    ],
    story: {
      open: "Eis que sobe o leão do norte; mas não temas, pois a minha palavra não voltará vazia.",
      turns: [
        { ask: "O jugo de ferro se aproxima sobre a terra.", hit: "A palavra resiste ao rugido! 💥", miss: "Firma-te, profeta — eu te sustento." },
        { ask: "Lançaram-te ao poço, e a lama te prende.", hit: "As cordas te erguem — vives! 🪢", miss: "Não te afundes; clama a mim." },
        { ask: "O leão devora os muros de Jerusalém.", hit: "Ainda assim, a promessa permanece! 🔥", miss: "A cidade cai, mas eu não caio." },
        { ask: "Escreverei a minha lei no coração do meu povo.", hit: "A aliança nova vence! ❤️", miss: "Espera — o coração será renovado." },
        { ask: "E o próprio leão do norte há de cair por fim.", hit: "Golpe final — Babilônia tomba! 👑", miss: "O juízo dele também está marcado." },
      ],
      win: "O leão do norte rugiu e passou; mas a palavra do Senhor permanece para sempre.",
      winHero: "Da queda brotou a nova aliança! 🙌",
    },
  },
};
