import type { BookChallenges } from "@/lib/rpgChallengeContent";

// Isaías, caps. 1–33 (primeira metade). Ciclo (c-1)%6: 0=ordenar, 1=caça,
// 2=cruzada, 3=completar, 4=ligar, 5=quiz (IA, sem conteúdo). SEM boss aqui.
export const ISAIAH_A: BookChallenges = {
  order: {
    1: {
      title: "Ordene: o chamado ao arrependimento", sub: "Toque nas cartas na sequência certa.", verse: 18,
      win: "🎉 Da escarlata à brancura da neve!",
      items: [
        { d: 1, em: "🐂", l: "O boi conhece o dono, mas Israel não" },
        { d: 2, em: "🩸", l: "O Senhor rejeita os sacrifícios vazios" },
        { d: 3, em: "🧼", l: "'Lavai-vos, purificai-vos'" },
        { d: 4, em: "❄️", l: "'Ainda que os vossos pecados sejam como a escarlata'" },
      ],
    },
    7: {
      title: "Ordene: o sinal de Emanuel", sub: "Toque nas cartas na sequência certa.", verse: 14,
      win: "🎉 'Deus conosco' — Emanuel!",
      items: [
        { d: 1, em: "⚔️", l: "Rezim e Peca sobem contra Jerusalém" },
        { d: 2, em: "😨", l: "O coração de Acaz treme como árvores ao vento" },
        { d: 3, em: "🚫", l: "Acaz recusa pedir um sinal ao Senhor" },
        { d: 4, em: "👶", l: "'A virgem conceberá e dará à luz Emanuel'" },
      ],
    },
    13: {
      title: "Ordene: o oráculo contra Babilônia", sub: "Toque nas cartas na sequência certa.", verse: 19,
      win: "🎉 O dia do Senhor cumprido!",
      items: [
        { d: 1, em: "🚩", l: "Erguem bandeira sobre o monte escaldado" },
        { d: 2, em: "📢", l: "O Senhor convoca os exércitos para o seu dia" },
        { d: 3, em: "🌑", l: "O sol e a lua se escurecem" },
        { d: 4, em: "🏛️", l: "Babilônia cai como Sodoma e Gomorra" },
      ],
    },
    19: {
      title: "Ordene: a carga contra o Egito", sub: "Toque nas cartas na sequência certa.", verse: 19,
      win: "🎉 Bendito o Egito, povo do Senhor!",
      items: [
        { d: 1, em: "☁️", l: "O Senhor cavalga sobre nuvem ligeira ao Egito" },
        { d: 2, em: "⚔️", l: "Egípcio peleja contra egípcio" },
        { d: 3, em: "🏜️", l: "O Nilo seca e os canais se esgotam" },
        { d: 4, em: "⛪", l: "Haverá um altar ao Senhor no meio do Egito" },
      ],
    },
    25: {
      title: "Ordene: o banquete no monte", sub: "Toque nas cartas na sequência certa.", verse: 8,
      win: "🎉 A morte foi tragada para sempre!",
      items: [
        { d: 1, em: "🏚️", l: "A cidade forte é reduzida a ruínas" },
        { d: 2, em: "🍷", l: "O Senhor prepara um banquete no monte" },
        { d: 3, em: "⚰️", l: "Ele destrói a morte para sempre" },
        { d: 4, em: "😢", l: "Enxuga as lágrimas de todos os rostos" },
      ],
    },
    31: {
      title: "Ordene: a vã confiança no Egito", sub: "Toque nas cartas na sequência certa.", verse: 5,
      win: "🎉 O Senhor defende Jerusalém!",
      items: [
        { d: 1, em: "🐎", l: "Descem ao Egito em busca de cavalos" },
        { d: 2, em: "🙅", l: "Confiam na força, não no Santo de Israel" },
        { d: 3, em: "🕊️", l: "O Senhor ampara Jerusalém como aves voando" },
        { d: 4, em: "🔥", l: "A Assíria cai por espada que não é de homem" },
      ],
    },
  },
  wordsearch: {
    2: {
      title: "Caça-palavras — o monte do Senhor",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["MONTE", "NAÇÕES", "ESPADAS", "ARADOS", "PAZ", "ORGULHO"],
    },
    8: {
      title: "Caça-palavras — Emanuel e a pedra",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["EMANUEL", "SILOÉ", "PEDRA", "TROPEÇO", "LEI", "ASSÍRIA"],
    },
    14: {
      title: "Caça-palavras — a queda do soberbo",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["LÚCIFER", "QUEDA", "CÉU", "ABISMO", "ORGULHO", "BABILÔNIA"],
    },
    20: {
      title: "Caça-palavras — o sinal contra o Egito",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["ISAÍAS", "DESCALÇO", "SINAL", "EGITO", "ETIÓPIA", "TRÊS"],
    },
    26: {
      title: "Caça-palavras — perfeita paz",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["PAZ", "CIDADE", "FIRME", "ROCHA", "CONFIANÇA", "VIDA"],
    },
    32: {
      title: "Caça-palavras — o rei justo",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["REI", "JUSTIÇA", "ESPÍRITO", "DESERTO", "POMAR", "PAZ"],
    },
  },
  crossword: {
    3: {
      title: "Palavra cruzada — o juízo sobre Sião",
      grid: ["SIAO", "O...", "B...", "E...", "R...", "B...", "A..."],
      across: ["→ Monte e cidade de Jerusalém (4)"],
      down: ["↓ O orgulho das filhas, que será condenado (7)"],
    },
    9: {
      title: "Palavra cruzada — um menino nos nasceu",
      grid: ["PRINCIPE", "A.......", "Z......."],
      across: ["→ Título do menino: ___ da Paz (8)"],
      down: ["↓ O Príncipe da ___ (3)"],
    },
    15: {
      title: "Palavra cruzada — o pranto de Moabe",
      grid: ["MOABE", "O....", "N....", "T....", "E....", "S...."],
      across: ["→ A nação lamentada neste oráculo (5)"],
      down: ["↓ Sobem aos ___ para chorar (6)"],
    },
    21: {
      title: "Palavra cruzada — caiu Babilônia",
      grid: ["CAIU", "A...", "V...", "A...", "L...", "E...", "I...", "R...", "O..."],
      across: ["→ 'Caiu, ___ Babilônia!' (4)"],
      down: ["↓ Vem em pares sobre cavalos (9)"],
    },
    27: {
      title: "Palavra cruzada — a vinha desejável",
      grid: ["VINHA", "I....", "N....", "H....", "O...."],
      across: ["→ Cantai a ela naquele dia (5)"],
      down: ["↓ A vinha era de ___ tinto (5)"],
    },
    33: {
      title: "Palavra cruzada — o Rei em sua formosura",
      grid: ["SIAO", "E...", "N...", "H...", "O...", "R..."],
      across: ["→ Cidade das nossas solenidades (4)"],
      down: ["↓ Nosso juiz, legislador e rei (6)"],
    },
  },
  complete: {
    4: {
      ref: "Isaías 4:2",
      before: "Naquele dia o",
      answer: "renovo",
      after: "do Senhor será belo e glorioso",
      options: ["renovo", "fruto", "monte", "povo"],
    },
    10: {
      ref: "Isaías 10:15",
      before: "Porventura gloriar-se-á o",
      answer: "machado",
      after: "contra o que corta com ele?",
      options: ["machado", "martelo", "cetro", "fogo"],
    },
    16: {
      ref: "Isaías 16:5",
      before: "E com misericórdia se firmará o",
      answer: "trono",
      after: "e sobre ele se assentará em verdade",
      options: ["trono", "altar", "muro", "monte"],
    },
    22: {
      ref: "Isaías 22:22",
      before: "Porei a chave da casa de Davi sobre o seu",
      answer: "ombro",
      after: "; ele abrirá, e ninguém fechará",
      options: ["ombro", "trono", "peito", "altar"],
    },
    28: {
      ref: "Isaías 28:16",
      before: "Eis que assento em Sião uma pedra, uma pedra",
      answer: "angular",
      after: ", preciosa, de firme fundamento",
      options: ["angular", "escarlata", "redonda", "quebrada"],
    },
  },
  connect: {
    5: {
      title: "Ligue — o cântico da vinha", sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "A vinha", b: "é a casa de Israel" },
        { a: "Uvas bravas", b: "o fruto da injustiça" },
        { a: "Ai dos que ajuntam", b: "casa a casa e campo a campo" },
        { a: "Nação de longe", b: "vem com rapidez" },
      ],
    },
    11: {
      title: "Ligue — o Renovo de Jessé", sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Renovo", b: "do tronco de Jessé" },
        { a: "Lobo", b: "habitará com o cordeiro" },
        { a: "Leopardo", b: "deitar-se-á com o cabrito" },
        { a: "Menino pequeno", b: "os guiará" },
      ],
    },
    17: {
      title: "Ligue — a carga contra Damasco", sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Damasco", b: "deixará de ser cidade" },
        { a: "Efraim", b: "perde a sua fortaleza" },
        { a: "A colheita", b: "restam poucas espigas" },
        { a: "As nações", b: "bramam como muitas águas" },
      ],
    },
    23: {
      title: "Ligue — a carga contra Tiro", sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Tiro", b: "mercado das nações" },
        { a: "Navios de Társis", b: "uivai, pois foi destruída" },
        { a: "Sidom", b: "envergonhada pelo mar" },
        { a: "Setenta anos", b: "o tempo do esquecimento" },
      ],
    },
    29: {
      title: "Ligue — o ai de Ariel", sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Ariel", b: "a cidade onde Davi acampou" },
        { a: "Este povo", b: "honra-me com os lábios" },
        { a: "Livro selado", b: "não pode ser lido" },
        { a: "Os surdos", b: "ouvirão as palavras" },
      ],
    },
  },
};
