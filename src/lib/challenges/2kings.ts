import type { BookChallenges } from "@/lib/rpgChallengeContent";

// 2 Reis (25 caps). Ciclo (c-1)%6: 0=ordenar, 1=caça-palavras, 2=cruzada,
// 3=completar, 4=ligar, 5=quiz(IA). Último cap (25) = boss.
// order:1,7,13,19  wordsearch:2,8,14,20  crossword:3,9,15,21
// complete:4,10,16,22  connect:5,11,17,23  quiz:6,12,18,24  boss:25
export const KINGS2_CH: BookChallenges = {
  order: {
    1: {
      title: "Ordene: Acazias e o fogo do céu", sub: "Toque nas cartas na sequência certa.", verse: 17,
      win: "🎉 A palavra do Senhor não cai por terra!",
      items: [
        { d: 1, em: "🪟", l: "Acazias cai pela grade e adoece" },
        { d: 2, em: "🗿", l: "Manda consultar Baal-Zebube" },
        { d: 3, em: "🔥", l: "Fogo consome os capitães enviados" },
        { d: 4, em: "⚰️", l: "Acazias morre, como Elias falou" },
      ],
    },
    7: {
      title: "Ordene: o fim do cerco de Samaria", sub: "Toque nas cartas na sequência certa.", verse: 16,
      win: "🎉 A fome deu lugar à fartura!",
      items: [
        { d: 1, em: "🍞", l: "Eliseu anuncia farinha barata amanhã" },
        { d: 2, em: "🚶", l: "Quatro leprosos vão ao acampamento" },
        { d: 3, em: "🏕️", l: "Acham o arraial arameu abandonado" },
        { d: 4, em: "🎉", l: "O povo saqueia e a fome acaba" },
      ],
    },
    13: {
      title: "Ordene: os últimos dias de Eliseu", sub: "Toque nas cartas na sequência certa.", verse: 21,
      win: "🎉 Até nos ossos há sinal de vida!",
      items: [
        { d: 1, em: "🤒", l: "Eliseu adoece da enfermidade mortal" },
        { d: 2, em: "🏹", l: "Manda o rei ferir o chão com flechas" },
        { d: 3, em: "⚰️", l: "Eliseu morre e é sepultado" },
        { d: 4, em: "💫", l: "Morto revive ao tocar seus ossos" },
      ],
    },
    19: {
      title: "Ordene: o livramento de Jerusalém", sub: "Toque nas cartas na sequência certa.", verse: 35,
      win: "🎉 O Senhor defendeu a cidade!",
      items: [
        { d: 1, em: "📜", l: "Senaqueribe envia carta de ameaça" },
        { d: 2, em: "🙏", l: "Ezequias a estende diante do Senhor" },
        { d: 3, em: "🗣️", l: "Isaías profetiza a queda do assírio" },
        { d: 4, em: "😇", l: "O anjo fere 185 mil numa só noite" },
      ],
    },
  },
  wordsearch: {
    2: {
      title: "Caça-palavras — Elias sobe ao céu",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["ELIAS", "ELISEU", "CARRO", "FOGO", "MANTO", "JORDÃO"],
    },
    8: {
      title: "Caça-palavras — Hazael e a Síria",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["HAZAEL", "SÍRIA", "PROFETA", "DAMASCO", "REI", "TERRA"],
    },
    14: {
      title: "Caça-palavras — Amazias de Judá",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["AMAZIAS", "EDOM", "GUERRA", "JUDÁ", "ISRAEL", "VITÓRIA"],
    },
    20: {
      title: "Caça-palavras — A cura de Ezequias",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["EZEQUIAS", "DOENÇA", "SOMBRA", "DEGRAUS", "CURA", "SINAL"],
    },
  },
  crossword: {
    3: {
      title: "Palavra cruzada — Guerra contra Moabe",
      grid: ["ELISEU", "D.....", "O.....", "M....."],
      across: ["→ O profeta que fez a água aparecer nas covas (6)"],
      down: ["↓ Reino aliado no caminho do ataque a Moabe (4)"],
    },
    9: {
      title: "Palavra cruzada — A queda de Jezabel",
      grid: ["JEZABEL", "E......", "U......"],
      across: ["→ Rainha lançada da janela (7)"],
      down: ["↓ Rei ungido que a derrotou (3)"],
    },
    15: {
      title: "Palavra cruzada — Azarias, o leproso",
      grid: ["AZARIAS", "S......", "S......", "I......", "R......", "I......", "A......"],
      across: ["→ Rei de Judá (Uzias) ferido com lepra (7)"],
      down: ["↓ Império a quem Menaém pagou tributo (7)"],
    },
    21: {
      title: "Palavra cruzada — O reinado de Manassés",
      grid: ["MANASSES", "A.......", "G.......", "I.......", "A......."],
      across: ["→ Rei que fez o que era mau por muitos anos (8)"],
      down: ["↓ Prática proibida de feitiçaria que ele adotou (5)"],
    },
  },
  complete: {
    4: {
      ref: "2 Reis 4:6",
      before: "Cheios os vasos, disse ela ao filho: Traze-me ainda um vaso. Ele respondeu: Não há mais vaso nenhum. Então parou o ",
      answer: "azeite",
      after: " de correr.",
      options: ["azeite", "vinho", "leite", "mel"],
    },
    10: {
      ref: "2 Reis 10:28",
      before: "Assim Jeú exterminou de Israel a adoração a ",
      answer: "Baal",
      after: ", derrubando a sua casa.",
      options: ["Baal", "Aserá", "Moloque", "Dagom"],
    },
    16: {
      ref: "2 Reis 16:7",
      before: "E Acaz enviou mensageiros a Tiglate-Pileser, rei da ",
      answer: "Assíria",
      after: ", dizendo: Sou teu servo e teu filho.",
      options: ["Assíria", "Babilônia", "Síria", "Pérsia"],
    },
    22: {
      ref: "2 Reis 22:8",
      before: "Disse o sumo sacerdote Hilquias ao escrivão Safã: Achei o livro da ",
      answer: "Lei",
      after: " na casa do Senhor.",
      options: ["Lei", "Aliança", "Profecia", "Sabedoria"],
    },
  },
  connect: {
    5: {
      title: "Ligue — Naamã curado no Jordão",
      sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Naamã", b: "comandante sírio leproso" },
        { a: "Eliseu", b: "profeta que mandou curar-se" },
        { a: "Sete", b: "mergulhos no rio Jordão" },
        { a: "Geazi", b: "servo tomado pela lepra" },
      ],
    },
    11: {
      title: "Ligue — Atalia e o menino Joás",
      sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Atalia", b: "rainha que usurpou o trono" },
        { a: "Joás", b: "menino escondido no templo" },
        { a: "Joiada", b: "sacerdote que o coroou" },
        { a: "Jeoseba", b: "quem salvou o menino" },
      ],
    },
    17: {
      title: "Ligue — A queda de Samaria",
      sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Oséias", b: "último rei de Israel" },
        { a: "Salmaneser", b: "rei da Assíria que cercou" },
        { a: "Samaria", b: "capital do norte que caiu" },
        { a: "Exílio", b: "Israel levado à Assíria" },
      ],
    },
    23: {
      title: "Ligue — As reformas de Josias",
      sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Josias", b: "rei que renovou a aliança" },
        { a: "Ídolos", b: "queimados fora de Jerusalém" },
        { a: "Páscoa", b: "celebrada como há muito não se via" },
        { a: "Megido", b: "onde o rei foi ferido de morte" },
      ],
    },
  },
  boss: {
    questions: [
      { question: "Como Elias foi arrebatado ao céu?", options: ["Num carro de fogo com cavalos de fogo", "Numa nuvem brilhante", "Num vento manso", "Em segredo, à noite"], correct: "Num carro de fogo com cavalos de fogo" },
      { question: "Quantas vezes Naamã mergulhou no Jordão para ser curado?", options: ["Sete", "Três", "Doze", "Uma"], correct: "Sete" },
      { question: "Quantos soldados assírios o anjo do Senhor feriu numa só noite?", options: ["185 mil", "10 mil", "50 mil", "1 mil"], correct: "185 mil" },
      { question: "O que foi achado no templo nos dias de Josias?", options: ["O livro da Lei", "A arca da aliança", "Uma coroa de ouro", "Um tesouro escondido"], correct: "O livro da Lei" },
      { question: "Quem destruiu Jerusalém e levou Judá ao exílio?", options: ["Nabucodonosor, rei da Babilônia", "Faraó Neco do Egito", "Senaqueribe da Assíria", "Ciro da Pérsia"], correct: "Nabucodonosor, rei da Babilônia" },
    ],
    story: {
      open: "O cerco da Assíria cerca a cidade — mas eu sou o Senhor que livra os que confiam.",
      turns: [
        { ask: "O assírio zomba do meu nome diante dos muros.", hit: "A blasfêmia não prevalece! 💥", miss: "Não temas as palavras altivas." },
        { ask: "Estende a carta da ameaça diante de mim.", hit: "A oração sobe ao trono! 🙏", miss: "Volta-te a mim outra vez." },
        { ask: "Pela boca do profeta anuncio a queda do soberbo.", hit: "A palavra se cumpre! 📜", miss: "Espera, e verás a salvação." },
        { ask: "O meu anjo sai pelo acampamento na calada da noite.", hit: "O exército cai por terra! 😇", miss: "Firma-te, o livramento vem." },
        { ask: "O rei da Assíria foge e cai por sua própria espada.", hit: "Golpe final — a cidade é livre! 👑", miss: "A vitória é do Senhor." },
      ],
      win: "Jerusalém foi poupada; o orgulho da Assíria ruiu diante do Deus vivo.",
      winHero: "O cerco foi quebrado — o Senhor livrou o seu povo! 🙌",
    },
  },
};
