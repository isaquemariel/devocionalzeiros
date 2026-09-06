import type { BookChallenges } from "@/lib/rpgChallengeContent";

// Êxodo (40 caps). Ciclo (c-1)%6: 0=ordenar,1=caça,2=cruzada,3=completar,4=ligar,5=quiz(IA).
// Os caps 1-17 e o jogo da memória de 24 continuam EMBUTIDOS nos componentes
// RPGChallenge*.tsx (e o EXT vence por cima, então não se repetem aqui).
// Este arquivo cobre os 18 buracos de 19 em diante — Sinai, os Dez Mandamentos,
// o bezerro de ouro e o tabernáculo. Os slots (c-1)%6===5 (caps 6,12,18,24,30,36)
// são o quiz do próprio ciclo (24 já tem memória embutida) e o cap. 40 é o boss.
export const EXODUS_CH: BookChallenges = {
  order: {
    19: {
      title: "Ordene: o SENHOR desce ao Sinai", sub: "Toque nas cartas na sequência certa.", verse: 18,
      win: "🎉 O monte fumegou porque o SENHOR desceu!",
      items: [
        { d: 1, em: "⛺", l: "Ao terceiro mês, Israel se acampa em frente ao monte" },
        { d: 2, em: "🦅", l: "'Vos levei sobre asas de águias, e vos trouxe a mim'" },
        { d: 3, em: "🚧", l: "Moisés santifica o povo e marca limites ao redor" },
        { d: 4, em: "🔥", l: "Ao terceiro dia: trovões, buzina e o monte fumegando" },
      ],
    },
    25: {
      title: "Ordene: a oferta e a arca", sub: "Toque nas cartas na sequência certa.", verse: 22,
      win: "🎉 'E me farão um santuário, e habitarei no meio deles'!",
      items: [
        { d: 1, em: "💛", l: "Traga oferta alçada todo o coração voluntário" },
        { d: 2, em: "🏕️", l: "'E me farão um santuário, e habitarei no meio deles'" },
        { d: 3, em: "📦", l: "A arca de acácia, coberta de ouro, guarda o testemunho" },
        { d: 4, em: "👼", l: "Sobre ela, o propiciatório e os dois querubins de ouro batido" },
      ],
    },
    31: {
      title: "Ordene: Bezalel e as tábuas", sub: "Toque nas cartas na sequência certa.", verse: 18,
      win: "🎉 Tábuas escritas pelo dedo de Deus!",
      items: [
        { d: 1, em: "🛠️", l: "O SENHOR chama pelo nome a Bezalel, da tribo de Judá" },
        { d: 2, em: "✨", l: "E o enche do Espírito de Deus em sabedoria e ciência" },
        { d: 3, em: "🤝", l: "Aoliabe, da tribo de Dã, é posto para trabalhar com ele" },
        { d: 4, em: "🪨", l: "As duas tábuas de pedra, escritas pelo dedo de Deus" },
      ],
    },
    37: {
      title: "Ordene: a obra de Bezalel", sub: "Toque nas cartas na sequência certa.", verse: 24,
      win: "🎉 Um talento de ouro puro, obra batida!",
      items: [
        { d: 1, em: "📦", l: "Bezalel faz a arca de acácia e a cobre de ouro puro" },
        { d: 2, em: "👼", l: "Faz o propiciatório e os dois querubins de obra batida" },
        { d: 3, em: "🍞", l: "Faz a mesa, com os seus pratos, colheres e tigelas" },
        { d: 4, em: "🕎", l: "Faz o candelabro de um talento de ouro puro" },
      ],
    },
  },
  wordsearch: {
    20: {
      title: "Caça-palavras — os Dez Mandamentos",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["SÁBADO", "HONRA", "IMAGEM", "ZELOSO", "TROVÕES", "LONGE"],
    },
    26: {
      title: "Caça-palavras — o tabernáculo",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["CORTINAS", "QUERUBINS", "TÁBUAS", "ACÁCIA", "LINHO", "VÉU"],
    },
    32: {
      title: "Caça-palavras — o bezerro de ouro",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["BEZERRO", "BURIL", "OURO", "FESTA", "DANÇAS", "TÁBUAS"],
    },
    38: {
      title: "Caça-palavras — o altar e o pátio",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["ESPELHOS", "PIA", "PÁTIO", "COBRE", "PRATA", "TALENTOS"],
    },
  },
  crossword: {
    21: {
      title: "Palavra cruzada — as leis do servo hebreu",
      grid: ["SETIMO", "O.....", "V.....", "E.....", "L.....", "A....."],
      across: ["→ Ao … ano o servo hebreu sai livre, de graça (6)"],
      down: ["↓ Com ela furavam a orelha do servo que não queria sair (6)"],
    },
    27: {
      title: "Palavra cruzada — o altar e a lâmpada",
      grid: ["ALTAR", "Z....", "E....", "I....", "T....", "E...."],
      across: ["→ Quadrado, de acácia, com pontas nos quatro cantos e coberto de cobre (5)"],
      down: ["↓ Puro, de oliveiras, batido, para fazer arder as lâmpadas continuamente (6)"],
    },
    33: {
      title: "Palavra cruzada — a glória que passa",
      grid: ["PENHA", "R....", "E....", "S....", "E....", "N....", "C....", "A...."],
      across: ["→ Na fenda dela Moisés foi posto, e viu a Deus pelas costas (5)"],
      down: ["↓ 'Irá a minha … contigo para te fazer descansar' (8)"],
    },
    39: {
      title: "Palavra cruzada — as vestes acabadas",
      grid: ["MOISES", "I.....", "T.....", "R.....", "A....."],
      across: ["→ 'Como o Senhor ordenara a …' — o refrão do capítulo (6)"],
      down: ["↓ Nela se atou a lâmina da coroa de santidade (5)"],
    },
  },
  complete: {
    22: {
      ref: "Êxodo 22:27",
      before: "Porque aquela é a sua",
      answer: "cobertura",
      after: ", e o vestido da sua pele; em que se deitaria?",
      options: ["cobertura", "herança", "morada", "riqueza"],
    },
    28: {
      ref: "Êxodo 28:15",
      before: "Farás também o",
      answer: "peitoral",
      after: "do juízo de obra esmerada, conforme à obra do éfode o farás.",
      options: ["peitoral", "manto", "cinto", "mitra"],
    },
    34: {
      ref: "Êxodo 34:6",
      before: "O Senhor, o Senhor Deus, misericordioso e",
      answer: "piedoso",
      after: ", tardio em irar-se e grande em beneficência e verdade.",
      options: ["piedoso", "terrível", "justo", "santo"],
    },
  },
  connect: {
    23: {
      title: "Ligue — o Anjo e as festas", sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Três vezes no ano", b: "me celebrareis festa" },
        { a: "O Anjo que vai adiante", b: "'porque o meu nome está nele'" },
        { a: "Os vespões", b: "lançam fora heveus, cananeus e heteus" },
        { a: "Do Mar Vermelho ao rio", b: "os termos que Deus porá à tua terra" },
      ],
    },
    29: {
      title: "Ligue — a consagração dos sacerdotes", sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Um novilho e dois carneiros", b: "sem mácula, trazidos no cesto com os pães ázimos" },
        { a: "O sangue do segundo carneiro", b: "na orelha direita, no polegar e no dedo do pé" },
        { a: "A coroa da santidade", b: "posta sobre a mitra, na cabeça de Arão" },
        { a: "Dois cordeiros por dia", b: "o holocausto contínuo, de manhã e à tarde" },
      ],
    },
    35: {
      title: "Ligue — a oferta voluntária", sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Coração voluntariamente disposto", b: "trazia ouro, prata e cobre por oferta alçada" },
        { a: "As mulheres sábias de coração", b: "fiavam com as suas mãos o azul e a púrpura" },
        { a: "Os príncipes", b: "traziam pedras de ônix e pedras de engaste" },
        { a: "Nenhum fogo nas moradas", b: "o sábado do repouso ao Senhor" },
      ],
    },
  },
};
