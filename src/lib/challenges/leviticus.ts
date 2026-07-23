import type { BookChallenges } from "@/lib/rpgChallengeContent";

// Levítico (27 caps). Ciclo por cap.: (c-1)%6 → 0 ordenar,1 caça,2 cruzada,3 completar,4 ligar,5 quiz(IA).
// Cap.27 (último) = boss "O Fogo do Altar".
export const LEVITICUS_CH: BookChallenges = {
  order: {
    1: {
      title: "Ordene: o holocausto no altar", sub: "Toque nas cartas na sequência certa.", verse: 9,
      win: "🔥 A oferta subiu como aroma suave!",
      items: [
        { d: 1, em: "🐂", l: "Trazer um animal sem defeito" },
        { d: 2, em: "✋", l: "Impor a mão sobre a cabeça do animal" },
        { d: 3, em: "🩸", l: "Degolar e aspergir o sangue no altar" },
        { d: 4, em: "🔥", l: "O sacerdote queima tudo: aroma suave" },
      ],
    },
    7: {
      title: "Ordene: as ofertas de Levítico", sub: "Toque nas cartas na sequência certa.", verse: 37,
      win: "🎉 As cinco ofertas em ordem!",
      items: [
        { d: 1, em: "🔥", l: "Holocausto (cap. 1)" },
        { d: 2, em: "🌾", l: "Oferta de cereais (cap. 2)" },
        { d: 3, em: "🕊️", l: "Oferta pacífica (cap. 3)" },
        { d: 4, em: "🙏", l: "Oferta pelo pecado (cap. 4)" },
      ],
    },
    13: {
      title: "Ordene: o exame da lepra", sub: "Toque nas cartas na sequência certa.", verse: 3,
      win: "🎉 O juízo do sacerdote em ordem!",
      items: [
        { d: 1, em: "🫥", l: "Surge uma mancha na pele" },
        { d: 2, em: "🚶", l: "A pessoa é levada ao sacerdote" },
        { d: 3, em: "🔍", l: "O sacerdote examina e a isola sete dias" },
        { d: 4, em: "⚖️", l: "Declara-a limpa ou imunda" },
      ],
    },
    19: {
      title: "Ordene: a lei da colheita para o pobre", sub: "Toque nas cartas na sequência certa.", verse: 9,
      win: "💛 A santidade que cuida do próximo!",
      items: [
        { d: 1, em: "🌾", l: "Ao ceifar a messe da tua terra" },
        { d: 2, em: "🚫", l: "Não segar até os cantos do campo" },
        { d: 3, em: "🍇", l: "Não rabiscar o que restou na vinha" },
        { d: 4, em: "🤲", l: "Deixar para o pobre e o estrangeiro" },
      ],
    },
    25: {
      title: "Ordene: o ano do Jubileu", sub: "Toque nas cartas na sequência certa.", verse: 10,
      win: "🎺 Proclamada a liberdade na terra!",
      items: [
        { d: 1, em: "🗓️", l: "Contar sete semanas de anos (49)" },
        { d: 2, em: "🎺", l: "No 50º ano, tocar a trombeta na Expiação" },
        { d: 3, em: "🕊️", l: "Proclamar liberdade a todos" },
        { d: 4, em: "🏡", l: "Cada um volta à sua propriedade" },
      ],
    },
  },
  wordsearch: {
    2: {
      title: "Caça-palavras — a oferta de cereais",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["FARINHA", "AZEITE", "INCENSO", "SAL", "OFERTA", "MEMORIAL"],
    },
    8: {
      title: "Caça-palavras — a consagração de Arão",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["ARÃO", "ÓLEO", "SANGUE", "ÉFODE", "CARNEIRO", "TURBANTE"],
    },
    14: {
      title: "Caça-palavras — a purificação do leproso",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["LEPROSO", "PUREZA", "CEDRO", "HISSOPO", "ESCARLATA", "LAVAR"],
    },
    20: {
      title: "Caça-palavras — sede santos",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["SANTO", "POVO", "MOLOQUE", "SEPARAR", "PECADO", "JUSTIÇA"],
    },
    26: {
      title: "Caça-palavras — bênçãos e maldições",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["BÊNÇÃO", "MALDIÇÃO", "CHUVA", "PAZ", "ESPADA", "ALIANÇA"],
    },
  },
  crossword: {
    3: {
      title: "Palavra cruzada — a oferta pacífica",
      grid: ["PACIFICA", "A.......", "Z......."],
      across: ["→ A oferta de comunhão diante do Senhor (8)"],
      down: ["↓ O que esta oferta celebra (3)"],
    },
    9: {
      title: "Palavra cruzada — o fogo do Senhor",
      grid: ["ALTAR", "R....", "A....", "O...."],
      across: ["→ Onde o fogo do Senhor consumiu a oferta (5)"],
      down: ["↓ O primeiro sumo sacerdote (4)"],
    },
    15: {
      title: "Palavra cruzada — puro e imundo",
      grid: ["PUREZA", "U.....", "R.....", "O....."],
      across: ["→ O estado limpo diante do Senhor (6)"],
      down: ["↓ Aquele que está limpo (4)"],
    },
    21: {
      title: "Palavra cruzada — os sacerdotes",
      grid: ["SACERDOTE", "A........", "N........", "T........", "O........"],
      across: ["→ Quem serve no altar do Senhor (9)"],
      down: ["↓ Consagrado, separado para Deus (5)"],
    },
  },
  complete: {
    4: {
      ref: "Levítico 4:20",
      before: "Assim o sacerdote fará expiação por eles, e lhes será",
      answer: "perdoado",
      after: "o pecado.",
      options: ["perdoado", "condenado", "lembrado", "cobrado"],
    },
    10: {
      ref: "Levítico 10:1",
      before: "Nadabe e Abiú, filhos de Arão, ofereceram fogo",
      answer: "estranho",
      after: "perante o Senhor, o que não lhes ordenara.",
      options: ["estranho", "santo", "novo", "aceito"],
    },
    16: {
      ref: "Levítico 16:22",
      before: "Assim aquele bode levará sobre si todas as",
      answer: "iniquidades",
      after: "deles para uma terra solitária.",
      options: ["iniquidades", "bênçãos", "ofertas", "riquezas"],
    },
    22: {
      ref: "Levítico 22:21",
      before: "Para que seja aceito, nenhum",
      answer: "defeito",
      after: "haverá nele.",
      options: ["defeito", "sangue", "preço", "sinal"],
    },
  },
  connect: {
    5: {
      title: "Ligue — a oferta pela culpa",
      sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Oferta pela culpa", b: "repara o dano cometido" },
        { a: "Quinta parte", b: "acrescentada na restituição" },
        { a: "Cordeiro ou cabra", b: "o sacrifício comum" },
        { a: "Duas rolas", b: "oferta de quem tem pouco" },
      ],
    },
    11: {
      title: "Ligue — limpo e imundo",
      sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Rumina e casco fendido", b: "animal limpo" },
        { a: "Porco", b: "imundo para vós" },
        { a: "Barbatana e escama", b: "peixe que pode comer" },
        { a: "Aves de rapina", b: "abomináveis" },
      ],
    },
    17: {
      title: "Ligue — o sangue e a vida",
      sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "O sangue", b: "faz expiação pela alma" },
        { a: "A vida da carne", b: "está no sangue" },
        { a: "Comer sangue", b: "proibido ao povo" },
        { a: "Sacrifícios", b: "só à porta do tabernáculo" },
      ],
    },
    23: {
      title: "Ligue — as festas do Senhor",
      sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Páscoa", b: "cordeiro no mês de Abibe" },
        { a: "Pentecostes", b: "festa das primícias" },
        { a: "Dia da Expiação", b: "afligir a alma em jejum" },
        { a: "Tabernáculos", b: "habitar em cabanas" },
      ],
    },
  },
  boss: {
    questions: [
      { question: "Qual era a função do bode emissário no Dia da Expiação?", options: ["Levar as iniquidades do povo para o deserto", "Ser oferecido em holocausto", "Guardar o santuário", "Marcar o início do ano"], correct: "Levar as iniquidades do povo para o deserto" },
      { question: "Quais filhos de Arão morreram ao oferecer fogo estranho?", options: ["Nadabe e Abiú", "Eleazar e Itamar", "Coré e Datã", "Hofni e Fineias"], correct: "Nadabe e Abiú" },
      { question: "Que mandamento resume a santidade em Levítico 19?", options: ["Amarás o teu próximo como a ti mesmo", "Não farás imagem de escultura", "Guardarás o dízimo", "Não jurarás em vão"], correct: "Amarás o teu próximo como a ti mesmo" },
      { question: "O que acontecia no ano do Jubileu?", options: ["Havia liberdade e cada um voltava à sua propriedade", "Todos jejuavam por sete dias", "O templo era reconstruído", "Cobrava-se o dobro dos impostos"], correct: "Havia liberdade e cada um voltava à sua propriedade" },
      { question: "Qual oferta era totalmente queimada no altar?", options: ["O holocausto", "A oferta de cereais", "A oferta pacífica", "O dízimo"], correct: "O holocausto" },
    ],
    story: {
      open: "Sede santos, porque eu, o Senhor vosso Deus, sou santo. Achega-te ao meu altar.",
      turns: [
        { ask: "Trouxeste a oferta sem defeito diante de mim?", hit: "O aroma suave sobe ao céu! 🔥", miss: "Purifica a tua oferta e volta." },
        { ask: "Guardaste o fogo santo, sem fogo estranho?", hit: "O fogo do altar não se apaga! 🕯️", miss: "Não te aproximes com descuido." },
        { ask: "No Dia da Expiação, confessaste sobre o bode?", hit: "As iniquidades foram levadas para longe! 🐐", miss: "A culpa ainda pesa; retorna." },
        { ask: "Amaste o teu próximo como a ti mesmo?", hit: "A santidade se faz amor! 💛", miss: "A lei sem amor é vazia." },
        { ask: "Proclamaste a liberdade do Jubileu?", hit: "Golpe final — soa a trombeta da graça! 🎺", miss: "A promessa da liberdade não falha." },
      ],
      win: "O fogo do altar apontava para o sangue que de fato purifica: o Cordeiro que tira o pecado.",
      winHero: "A santidade venceu — expiação plena! 🙌",
    },
  },
};
