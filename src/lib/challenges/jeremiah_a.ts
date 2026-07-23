import type { BookChallenges } from "@/lib/rpgChallengeContent";

// Jeremias — parte A (caps. 1 a 26). Ciclo por slot (c-1)%6:
// 0=order, 1=wordsearch, 2=crossword, 3=complete, 4=connect, 5=quiz(IA, sem conteúdo).
// Primeira metade do livro: NÃO gera boss.
export const JEREMIAH_A: BookChallenges = {
  order: {
    1: {
      title: "Ordene: o chamado de Jeremias", sub: "Toque nas cartas na sequência certa.", verse: 5,
      win: "🎉 O jovem profeta foi enviado!",
      items: [
        { d: 1, em: "🤰", l: "Deus o conhece antes de formá-lo no ventre" },
        { d: 2, em: "🧒", l: "Jeremias diz: 'sou apenas um menino'" },
        { d: 3, em: "👄", l: "Deus toca a boca do profeta" },
        { d: 4, em: "🌰", l: "Visões: a amendoeira e a panela fervendo" },
      ],
    },
    7: {
      title: "Ordene: o sermão no templo", sub: "Toque nas cartas na sequência certa.", verse: 11,
      win: "🎉 A advertência foi proclamada!",
      items: [
        { d: 1, em: "🚪", l: "Jeremias fica à porta do templo do SENHOR" },
        { d: 2, em: "⚠️", l: "Adverte: não confiem em palavras enganosas" },
        { d: 3, em: "🏚️", l: "A casa tornou-se covil de salteadores" },
        { d: 4, em: "🔥", l: "Denúncia os sacrifícios em Tofete" },
      ],
    },
    13: {
      title: "Ordene: o cinto de linho", sub: "Toque nas cartas na sequência certa.", verse: 7,
      win: "🎉 O sinal foi cumprido!",
      items: [
        { d: 1, em: "🧵", l: "Deus manda comprar um cinto de linho" },
        { d: 2, em: "🌊", l: "Jeremias o esconde junto ao Eufrates" },
        { d: 3, em: "🕳️", l: "O cinto volta apodrecido, imprestável" },
        { d: 4, em: "⚖️", l: "Sinal: assim se estraga a soberba de Judá" },
      ],
    },
    19: {
      title: "Ordene: a botija quebrada", sub: "Toque nas cartas na sequência certa.", verse: 11,
      win: "🎉 O juízo foi anunciado!",
      items: [
        { d: 1, em: "🏺", l: "Deus manda comprar uma botija de barro" },
        { d: 2, em: "🏞️", l: "Jeremias vai ao vale de Ben-Hinom" },
        { d: 3, em: "💥", l: "Quebra a botija diante dos anciãos" },
        { d: 4, em: "🏙️", l: "Sinal: o Senhor quebrará povo e cidade" },
      ],
    },
    25: {
      title: "Ordene: os setenta anos", sub: "Toque nas cartas na sequência certa.", verse: 11,
      win: "🎉 A profecia do cativeiro foi selada!",
      items: [
        { d: 1, em: "📢", l: "Jeremias prega por vinte e três anos" },
        { d: 2, em: "⚔️", l: "Anúncio: Nabucodonosor virá do norte" },
        { d: 3, em: "⏳", l: "Setenta anos de cativeiro na Babilônia" },
        { d: 4, em: "🍷", l: "O cálice do furor passa às nações" },
      ],
    },
  },
  wordsearch: {
    2: {
      title: "Caça-palavras — a fonte de águas vivas",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["FONTE", "ÁGUAS", "VIVAS", "CISTERNA", "ÍDOLOS", "DESERTO"],
    },
    8: {
      title: "Caça-palavras — não há bálsamo em Gileade",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["BÁLSAMO", "GILEADE", "COLHEITA", "VERÃO", "CEGONHA", "FERIDA"],
    },
    14: {
      title: "Caça-palavras — a grande seca",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["SECA", "CHUVA", "CISTERNA", "FOME", "ESPADA", "PROFETAS"],
    },
    20: {
      title: "Caça-palavras — fogo nos ossos",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["PASUR", "TRONCO", "FOGO", "OSSOS", "TERROR", "PROFETA"],
    },
    26: {
      title: "Caça-palavras — o profeta ameaçado",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["TEMPLO", "SILÓ", "MIQUEIAS", "URIAS", "SACERDOTE", "PROFETA"],
    },
  },
  crossword: {
    3: {
      title: "Palavra cruzada — Israel infiel",
      grid: ["APOSTATA", "D.......", "U.......", "L.......", "T.......", "E.......", "R.......", "A......."],
      across: ["→ Israel que se desviou do Senhor (8)"],
      down: ["↓ Como o Senhor chama a nação infiel (8)"],
    },
    9: {
      title: "Palavra cruzada — o profeta que chora",
      grid: ["LAGRIMAS", "A.......", "M.......", "E.......", "N.......", "T.......", "O......."],
      across: ["→ O que corria dos olhos do profeta (8)"],
      down: ["↓ O choro do profeta pela nação (7)"],
    },
    15: {
      title: "Palavra cruzada — as tuas palavras",
      grid: ["PALAVRAS", "R.......", "O.......", "F.......", "E.......", "T.......", "A......."],
      across: ["→ O que Jeremias comeu com alegria (8)"],
      down: ["↓ O que Jeremias era para o Senhor (7)"],
    },
    21: {
      title: "Palavra cruzada — vida e morte",
      grid: ["CAMINHO", "E......", "R......", "C......", "O......"],
      across: ["→ O Senhor pôs o da vida e o da morte (7)"],
      down: ["↓ O que o inimigo pôs contra a cidade (5)"],
    },
  },
  complete: {
    4: { ref: "Jeremias 4:14", before: "Lava o teu", answer: "coração", after: "da malícia, ó Jerusalém, para que sejas salva.", options: ["coração", "caminho", "rosto", "altar"] },
    10: { ref: "Jeremias 10:10", before: "Mas o SENHOR é o", answer: "verdadeiro", after: "Deus; ele é o Deus vivo e o Rei eterno.", options: ["verdadeiro", "único", "eterno", "santo"] },
    16: { ref: "Jeremias 16:19", before: "SENHOR, fortaleza minha e força minha, e", answer: "refúgio", after: "meu no dia da angústia.", options: ["refúgio", "escudo", "abrigo", "socorro"] },
    22: { ref: "Jeremias 22:3", before: "Exercei o juízo e a", answer: "justiça", after: "e livrai o oprimido da mão do opressor.", options: ["justiça", "paz", "verdade", "misericórdia"] },
  },
  connect: {
    5: {
      title: "Ligue — a busca por um justo", sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Nas ruas", b: "buscar um só homem justo" },
        { a: "A areia", b: "limite que o mar não passa" },
        { a: "Os profetas", b: "profetizam mentira" },
        { a: "O povo", b: "recusou-se a voltar" },
      ],
    },
    11: {
      title: "Ligue — a aliança quebrada", sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "A aliança", b: "quebrada por Judá" },
        { a: "Anatote", b: "conspira contra o profeta" },
        { a: "Cordeiro manso", b: "levado ao matadouro" },
        { a: "Maldito", b: "quem não ouve a aliança" },
      ],
    },
    17: {
      title: "Ligue — o coração e a confiança", sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "O coração", b: "enganoso mais que tudo" },
        { a: "Quem confia no Senhor", b: "árvore junto às águas" },
        { a: "Quem confia no homem", b: "arbusto no deserto" },
        { a: "Pecado de Judá", b: "escrito com ponta de diamante" },
      ],
    },
    23: {
      title: "Ligue — pastores e o Renovo", sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Os pastores", b: "que dispersam o rebanho" },
        { a: "O Renovo justo", b: "levantado a Davi" },
        { a: "Falsos profetas", b: "contam sonhos vãos" },
        { a: "A palavra de Deus", b: "martelo que quebra a rocha" },
      ],
    },
  },
};
