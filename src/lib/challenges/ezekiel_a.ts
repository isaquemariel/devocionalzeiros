import type { BookChallenges } from "@/lib/rpgChallengeContent";

// Ezequiel — primeira metade (caps. 1-24). Sem boss (só a 2ª metade fecha o livro).
// Ciclo por capítulo (c-1)%6: 0=order,1=wordsearch,2=crossword,3=complete,4=connect,5=quiz.
export const EZEKIEL_A: BookChallenges = {
  order: {
    1: {
      title: "Ordene: a visão junto ao rio Quebar", sub: "Toque nas cartas na sequência certa.", verse: 28,
      win: "🎉 A glória do Senhor em ordem!",
      items: [
        { d: 1, em: "🌪️", l: "Vem do norte um vento tempestuoso" },
        { d: 2, em: "🦅", l: "Surgem os quatro seres viventes" },
        { d: 3, em: "🛞", l: "As rodas altíssimas ao lado deles" },
        { d: 4, em: "🌈", l: "Sobre o trono, a glória do Senhor" },
      ],
    },
    7: {
      title: "Ordene: chegou o fim", sub: "Toque nas cartas na sequência certa.", verse: 6,
      win: "🎉 O juízo anunciado, em ordem!",
      items: [
        { d: 1, em: "⏳", l: "O Senhor anuncia: chegou o fim" },
        { d: 2, em: "📅", l: "Vem o dia da perturbação" },
        { d: 3, em: "💰", l: "Lançam a prata pelas ruas" },
        { d: 4, em: "⚔️", l: "A espada, a peste e a fome" },
      ],
    },
    13: {
      title: "Ordene: o muro caiado", sub: "Toque nas cartas na sequência certa.", verse: 14,
      win: "🎉 A parede sem firmeza, em ordem!",
      items: [
        { d: 1, em: "🚫", l: "Deus condena os falsos profetas" },
        { d: 2, em: "🕊️", l: "Anunciam 'paz' onde não há paz" },
        { d: 3, em: "🧱", l: "Rebocam o muro com cal solta" },
        { d: 4, em: "🌧️", l: "A tempestade derruba a parede" },
      ],
    },
    19: {
      title: "Ordene: lamento pelos príncipes", sub: "Toque nas cartas na sequência certa.", verse: 14,
      win: "🎉 O lamento em ordem!",
      items: [
        { d: 1, em: "🦁", l: "A leoa cria os seus filhotes" },
        { d: 2, em: "🪝", l: "Um é levado cativo ao Egito" },
        { d: 3, em: "⛓️", l: "Outro é arrastado à Babilônia" },
        { d: 4, em: "🍇", l: "A videira é arrancada e seca" },
      ],
    },
  },
  wordsearch: {
    2: {
      title: "Caça-palavras — a vocação de Ezequiel",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["PROFETA", "ROLO", "ISRAEL", "REBELDES", "ESPÍRITO", "FILHO"],
    },
    8: {
      title: "Caça-palavras — abominações no templo",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["TEMPLO", "IDOLOS", "TAMUZ", "SOL", "CIÚME", "GLÓRIA"],
    },
    14: {
      title: "Caça-palavras — só a própria alma",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["NOÉ", "DANIEL", "IDOLOS", "CORAÇÃO", "JUSTOS", "PESTE"],
    },
    20: {
      title: "Caça-palavras — a história rebelde",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["EGITO", "DESERTO", "SÁBADOS", "IDOLOS", "ALIANÇA", "REBELIÃO"],
    },
  },
  crossword: {
    3: {
      title: "Palavra cruzada — a atalaia",
      grid: ["ATALAIA", "V......", "I......", "S......", "A......", "R......"],
      across: ["→ O vigia posto para advertir o povo (7)"],
      down: ["↓ O que a sentinela faz ao ver o perigo (6)"],
    },
    9: {
      title: "Palavra cruzada — a marca na testa",
      grid: ["SINAL", "E....", "I....", "S...."],
      across: ["→ A marca posta na testa dos que gemem (5)"],
      down: ["↓ Quantos homens vieram com armas de matar (4)"],
    },
    15: {
      title: "Palavra cruzada — a lenha inútil",
      grid: ["VIDEIRA", "I......", "N......", "H......", "A......"],
      across: ["→ A madeira sem valor, entregue ao fogo (7)"],
      down: ["↓ De onde vem esse ramo imprestável (5)"],
    },
    21: {
      title: "Palavra cruzada — a espada do Senhor",
      grid: ["ESPADA", "X.....", "I.....", "L.....", "I.....", "O....."],
      across: ["→ A arma afiada e polida para o juízo (6)"],
      down: ["↓ Destino de Judá após o castigo (6)"],
    },
  },
  complete: {
    4: {
      ref: "Ezequiel 4:1",
      before: "Toma um tijolo, e grava nele uma cidade, a saber, ",
      answer: "Jerusalém",
      after: ", e põe-lhe um cerco em redor.",
      options: ["Jerusalém", "Babilônia", "Nínive", "Samaria"],
    },
    10: {
      ref: "Ezequiel 10:18",
      before: "Então a ",
      answer: "glória",
      after: " do Senhor saiu de sobre a entrada da casa.",
      options: ["glória", "nuvem", "arca", "voz"],
    },
    16: {
      ref: "Ezequiel 16:6",
      before: "E, passando eu por ti, disse-te: Ainda que estejas no teu sangue, ",
      answer: "vive",
      after: "; sim, disse-te: no teu sangue, vive.",
      options: ["vive", "morre", "clama", "descansa"],
    },
    22: {
      ref: "Ezequiel 22:30",
      before: "Busquei entre eles um homem que estivesse na ",
      answer: "brecha",
      after: " perante mim, mas a ninguém achei.",
      options: ["brecha", "porta", "muralha", "torre"],
    },
  },
  connect: {
    5: {
      title: "Ligue — o sinal da navalha", sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Navalha afiada", b: "rapa o cabelo e a barba" },
        { a: "Fogo", b: "queima a terça parte" },
        { a: "Espada", b: "fere ao redor da cidade" },
        { a: "Vento", b: "espalha o último terço" },
      ],
    },
    11: {
      title: "Ligue — juízo e promessa", sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "A panela", b: "a falsa segurança da cidade" },
        { a: "Pelatias", b: "morre durante a profecia" },
        { a: "Coração novo", b: "a promessa de Deus ao povo" },
        { a: "Glória do Senhor", b: "sobe ao monte a leste" },
      ],
    },
    17: {
      title: "Ligue — as duas águias", sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Primeira águia", b: "leva o topo do cedro" },
        { a: "Segunda águia", b: "o Egito buscado em vão" },
        { a: "A videira", b: "volta-se para outra águia" },
        { a: "Renovo tenro", b: "o reino que Deus plantará" },
      ],
    },
    23: {
      title: "Ligue — as duas irmãs infiéis", sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Oolá", b: "Samaria, a irmã mais velha" },
        { a: "Oolibá", b: "Jerusalém, a irmã mais nova" },
        { a: "Assíria", b: "os amantes de Oolá" },
        { a: "Babilônia", b: "os amantes de Oolibá" },
      ],
    },
  },
};
