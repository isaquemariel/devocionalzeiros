import type { BookChallenges } from "@/lib/rpgChallengeContent";

// Salmos 1 a 50 (bloco A). Ciclo por capítulo c: (c-1)%6 →
// 0=order, 1=wordsearch, 2=crossword, 3=complete, 4=connect, 5=quiz(IA, sem conteúdo).
// SEM boss (bloco parcial do livro).
export const PSALMS_A: BookChallenges = {
  order: {
    1: {
      title: "Ordene: a árvore junto às águas", sub: "Toque nas cartas na sequência certa.", verse: 3,
      win: "🎉 Bem-aventurado o que medita na lei!",
      items: [
        { d: 1, em: "🚫", l: "Não anda no conselho dos ímpios" },
        { d: 2, em: "📖", l: "Tem prazer na lei do Senhor" },
        { d: 3, em: "🌳", l: "É como árvore junto às correntes de águas" },
        { d: 4, em: "🍃", l: "Os ímpios são como a palha que o vento leva" },
      ],
    },
    7: {
      title: "Ordene: o Senhor, justo juiz", sub: "Toque nas cartas na sequência certa.", verse: 17,
      win: "🎉 A justiça de Deus prevalece!",
      items: [
        { d: 1, em: "🛡️", l: "Davi busca refúgio no Senhor" },
        { d: 2, em: "⚖️", l: "Pede que Deus, justo juiz, o julgue" },
        { d: 3, em: "🕳️", l: "O ímpio cava uma cova e cai nela" },
        { d: 4, em: "🎵", l: "Louva ao Senhor pela sua justiça" },
      ],
    },
    13: {
      title: "Ordene: do lamento à confiança", sub: "Toque nas cartas na sequência certa.", verse: 6,
      win: "🎉 A confiança venceu a angústia!",
      items: [
        { d: 1, em: "😢", l: "'Até quando, Senhor, te esquecerás de mim?'" },
        { d: 2, em: "🙏", l: "'Considera-me e responde-me'" },
        { d: 3, em: "💗", l: "'Eu confio na tua benignidade'" },
        { d: 4, em: "🎶", l: "'Cantarei ao Senhor, porque me fez bem'" },
      ],
    },
    19: {
      title: "Ordene: os céus e a lei", sub: "Toque nas cartas na sequência certa.", verse: 14,
      win: "🎉 Céus e Palavra proclamam a glória!",
      items: [
        { d: 1, em: "🌌", l: "Os céus declaram a glória de Deus" },
        { d: 2, em: "☀️", l: "O sol percorre os céus como um herói" },
        { d: 3, em: "📜", l: "A lei do Senhor é perfeita e restaura a alma" },
        { d: 4, em: "🙏", l: "'Sejam agradáveis as palavras da minha boca'" },
      ],
    },
    25: {
      title: "Ordene: a ti elevo a alma", sub: "Toque nas cartas na sequência certa.", verse: 5,
      win: "🎉 O Senhor guia os humildes!",
      items: [
        { d: 1, em: "🙌", l: "'A ti, Senhor, elevo a minha alma'" },
        { d: 2, em: "🧭", l: "'Guia-me na tua verdade e ensina-me'" },
        { d: 3, em: "🙏", l: "'Lembra-te das tuas misericórdias'" },
        { d: 4, em: "🛡️", l: "'Guarda a minha alma e livra-me'" },
      ],
    },
    31: {
      title: "Ordene: nas tuas mãos", sub: "Toque nas cartas na sequência certa.", verse: 24,
      win: "🎉 Esforçai-vos, e Ele fortalece o coração!",
      items: [
        { d: 1, em: "🪨", l: "'Em ti, Senhor, confio; sê a minha rocha'" },
        { d: 2, em: "🤲", l: "'Nas tuas mãos entrego o meu espírito'" },
        { d: 3, em: "😟", l: "'Os meus olhos se consomem de tristeza'" },
        { d: 4, em: "💪", l: "'Esforçai-vos, e Ele fortalecerá o coração'" },
      ],
    },
    37: {
      title: "Ordene: não te indignes", sub: "Toque nas cartas na sequência certa.", verse: 11,
      win: "🎉 Os mansos herdarão a terra!",
      items: [
        { d: 1, em: "😌", l: "'Não te indignes por causa dos malfeitores'" },
        { d: 2, em: "🌿", l: "'Confia no Senhor e faze o bem'" },
        { d: 3, em: "💗", l: "'Deleita-te no Senhor e Ele te concederá'" },
        { d: 4, em: "🕊️", l: "'Os mansos herdarão a terra'" },
      ],
    },
    43: {
      title: "Ordene: envia a tua luz", sub: "Toque nas cartas na sequência certa.", verse: 4,
      win: "🎉 A luz e a verdade guiam ao altar!",
      items: [
        { d: 1, em: "⚖️", l: "'Julga-me, ó Deus, e pleiteia a minha causa'" },
        { d: 2, em: "💡", l: "'Envia a tua luz e a tua verdade'" },
        { d: 3, em: "⛰️", l: "'Que me levem ao teu santo monte'" },
        { d: 4, em: "🎶", l: "'Louvarei a Deus com a harpa'" },
      ],
    },
    49: {
      title: "Ordene: a vaidade das riquezas", sub: "Toque nas cartas na sequência certa.", verse: 15,
      win: "🎉 Só Deus resgata a alma do sepulcro!",
      items: [
        { d: 1, em: "👂", l: "'Ouvi isto, todos os povos'" },
        { d: 2, em: "💰", l: "O rico não pode remir a si nem ao irmão" },
        { d: 3, em: "⚰️", l: "'O homem na honra não permanece'" },
        { d: 4, em: "🙌", l: "'Deus resgatará a minha alma do sepulcro'" },
      ],
    },
  },
  wordsearch: {
    2: {
      title: "Caça-palavras — O Rei ungido em Sião",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["NAÇÕES", "UNGIDO", "SIÃO", "REI", "FILHO", "HERANÇA"],
    },
    8: {
      title: "Caça-palavras — Quão magnífico é o teu nome",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["SENHOR", "NOME", "CÉUS", "LUA", "ESTRELAS", "GLÓRIA"],
    },
    14: {
      title: "Caça-palavras — Disse o louco: não há Deus",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["LOUCO", "DEUS", "CORAÇÃO", "INSENSATO", "SIÃO", "SALVAÇÃO"],
    },
    20: {
      title: "Caça-palavras — Uns confiam em carros",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["ANGÚSTIA", "CARROS", "CAVALOS", "SENHOR", "NOME", "VITÓRIA"],
    },
    26: {
      title: "Caça-palavras — Julga-me, Senhor",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["INOCÊNCIA", "ALTAR", "CASA", "GLÓRIA", "MÃOS", "VERDADE"],
    },
    32: {
      title: "Caça-palavras — Bem-aventurado o perdoado",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["PERDÃO", "PECADO", "CONFESSAR", "ALEGRIA", "REFÚGIO", "JÚBILO"],
    },
    38: {
      title: "Caça-palavras — Súplica do penitente",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["PECADO", "IRA", "GEMIDO", "AFLIÇÃO", "SENHOR", "ESPERO"],
    },
    44: {
      title: "Caça-palavras — Ouvimos com os ouvidos",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["OUVIMOS", "PAIS", "VITÓRIA", "REDIME", "DESPERTA", "BRAÇO"],
    },
    50: {
      title: "Caça-palavras — O Poderoso Deus fala",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["DEUS", "CÉUS", "TERRA", "JUÍZO", "LOUVOR", "GRATIDÃO"],
    },
  },
  crossword: {
    3: {
      title: "Palavra cruzada — Tu és escudo ao meu redor",
      grid: ["SALVACAO", "E.......", "N.......", "H.......", "O.......", "R......."],
      across: ["→ 'A ___ pertence ao Senhor' (8)"],
      down: ["↓ Aquele que é escudo ao redor de Davi (6)"],
    },
    9: {
      title: "Palavra cruzada — O Senhor julga com retidão",
      grid: ["JUSTICA", "U......", "I......", "Z......"],
      across: ["→ Deus julga o mundo com... (7)"],
      down: ["↓ O Senhor se assenta como um justo... (4)"],
    },
    15: {
      title: "Palavra cruzada — Quem habitará no teu monte",
      grid: ["MONTE", "O....", "R....", "A....", "R...."],
      across: ["→ 'Quem habitará no teu ___ santo?' (5)"],
      down: ["↓ Habitar; quem faz o bem irá ___ com Deus (5)"],
    },
    21: {
      title: "Palavra cruzada — O rei se alegra na tua força",
      grid: ["COROA", "O....", "N....", "F....", "I....", "A...."],
      across: ["→ De ouro fino, posta na cabeça do rei (5)"],
      down: ["↓ O rei ___ no Senhor e não será abalado (6)"],
    },
    27: {
      title: "Palavra cruzada — O Senhor é a minha luz",
      grid: ["TEMER", "E....", "N....", "D....", "A...."],
      across: ["→ 'O Senhor é a minha luz; a quem ___?' (5)"],
      down: ["↓ No dia mau, Deus o esconde na sua... (5)"],
    },
    33: {
      title: "Palavra cruzada — Cântico novo ao Senhor",
      grid: ["CANTAI", "E.....", "U.....", "S....."],
      across: ["→ 'Cantai ao Senhor um cântico novo' (6)"],
      down: ["↓ Feitos pela palavra do Senhor (4)"],
    },
    39: {
      title: "Palavra cruzada — O homem é apenas um sopro",
      grid: ["SOPRO", "I....", "L....", "E....", "N....", "C....", "I....", "O...."],
      across: ["→ O que o homem é: apenas um... (5)"],
      down: ["↓ 'Emudeci, fiquei em ___' diante do Senhor (8)"],
    },
    45: {
      title: "Palavra cruzada — Cântico do casamento do Rei",
      grid: ["NOIVA", "O....", "M....", "E...."],
      across: ["→ Trazida ao rei, vestida de ouro (5)"],
      down: ["↓ 'Farei lembrado o teu ___' entre as gerações (4)"],
    },
  },
  complete: {
    4: { ref: "Salmos 4:8", before: "Em paz me deitarei e logo", answer: "dormirei", after: ", porque só tu, Senhor, me fazes habitar em segurança", options: ["dormirei", "chorarei", "clamarei", "cantarei"] },
    10: { ref: "Salmos 10:16", before: "O Senhor é", answer: "Rei", after: "eterno; da sua terra perecerão os gentios", options: ["Rei", "juiz", "pastor", "escudo"] },
    16: { ref: "Salmos 16:11", before: "Na tua presença há fartura de", answer: "alegrias", after: ", e delícias à tua direita perpetuamente", options: ["alegrias", "riquezas", "tristezas", "sombras"] },
    22: { ref: "Salmos 22:1", before: "Deus meu, Deus meu, por que me", answer: "desamparaste", after: "? Por que te alongas do meu auxílio?", options: ["desamparaste", "esqueceste", "chamaste", "buscaste"] },
    28: { ref: "Salmos 28:7", before: "O Senhor é a minha força e o meu", answer: "escudo", after: "; nele confiou o meu coração e fui socorrido", options: ["escudo", "trono", "caminho", "cântico"] },
    34: { ref: "Salmos 34:8", before: "Provai e vede que o Senhor é", answer: "bom", after: "; bem-aventurado o homem que nele confia", options: ["bom", "forte", "justo", "fiel"] },
    40: { ref: "Salmos 40:1", before: "Ele se inclinou para mim e ouviu o meu", answer: "clamor", after: ", e me tirou de um lago horrível", options: ["clamor", "canto", "choro", "voto"] },
    46: { ref: "Salmos 46:1", before: "Deus é o nosso refúgio e", answer: "fortaleza", after: ", socorro bem presente na angústia", options: ["fortaleza", "esperança", "herança", "lembrança"] },
  },
  connect: {
    5: {
      title: "Ligue — Oração da manhã", sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Pela manhã", b: "ouves a minha voz" },
        { a: "Os ímpios", b: "não subsistem diante de ti" },
        { a: "Os justos", b: "cercados de benevolência" },
        { a: "À tua casa", b: "entro pela tua bondade" },
      ],
    },
    11: {
      title: "Ligue — No Senhor confio", sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Refúgio", b: "no Senhor confio" },
        { a: "Templo santo", b: "o Senhor ali está" },
        { a: "Trono", b: "está nos céus" },
        { a: "Olhos do Senhor", b: "provam os filhos dos homens" },
      ],
    },
    17: {
      title: "Ligue — À sombra das tuas asas", sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Menina dos olhos", b: "guarda-me como" },
        { a: "Sombra das asas", b: "esconde-me à" },
        { a: "Lábios enganosos", b: "não vêm da oração justa" },
        { a: "Ao despertar", b: "me fartarei da tua imagem" },
      ],
    },
    23: {
      title: "Ligue — O Senhor é o meu pastor", sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "O Senhor", b: "é o meu pastor" },
        { a: "Pastos verdes", b: "me faz repousar" },
        { a: "Vale da sombra", b: "não temerei mal algum" },
        { a: "Vara e cajado", b: "me consolam" },
      ],
    },
    29: {
      title: "Ligue — A voz do Senhor", sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "A voz do Senhor", b: "quebra os cedros" },
        { a: "Glória e força", b: "dai ao Senhor" },
        { a: "Sobre as águas", b: "troveja a sua voz" },
        { a: "Ao seu povo", b: "dá paz e força" },
      ],
    },
    35: {
      title: "Ligue — Pleiteia a minha causa", sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Escudo e lança", b: "toma para meu socorro" },
        { a: "O anjo do Senhor", b: "os persiga" },
        { a: "A minha alma", b: "se alegrará no Senhor" },
        { a: "A minha língua", b: "falará da tua justiça" },
      ],
    },
    41: {
      title: "Ligue — Bem-aventurado quem cuida do pobre", sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Quem atende ao pobre", b: "o Senhor o livra" },
        { a: "No leito da dor", b: "o Senhor o sustém" },
        { a: "A minha integridade", b: "tu me susténs" },
        { a: "Bendito o Senhor", b: "de eternidade a eternidade" },
      ],
    },
    47: {
      title: "Ligue — Batei palmas, todos os povos", sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Batei palmas", b: "todos os povos" },
        { a: "Deus subiu", b: "entre gritos de júbilo" },
        { a: "Cantai louvores", b: "ao nosso Rei" },
        { a: "Rei de toda a terra", b: "Deus reina" },
      ],
    },
  },
};
