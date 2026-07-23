import type { BookChallenges } from "@/lib/rpgChallengeContent";

// 2 Crônicas (36 caps). Ciclo por capítulo: (c-1)%6 =>
// 0=order, 1=wordsearch, 2=crossword, 3=complete, 4=connect, 5=quiz(IA).
// Último capítulo (36) => boss: "O Fogo da Babilônia" (queda de Jerusalém e o exílio).
export const CHRON2_CH: BookChallenges = {
  order: {
    1: {
      title: "Ordene: Salomão pede sabedoria", sub: "Toque nas cartas na sequência certa.", verse: 17,
      win: "🎉 A sabedoria em primeiro lugar!",
      items: [
        { d: 1, em: "⛰️", l: "Salomão sobe ao altar em Gibeom" },
        { d: 2, em: "🌙", l: "Deus lhe aparece de noite" },
        { d: 3, em: "🙏", l: "Ele pede sabedoria, não riquezas" },
        { d: 4, em: "👑", l: "Deus lhe dá sabedoria e riquezas" },
      ],
    },
    7: {
      title: "Ordene: o fogo desce do céu", sub: "Toque nas cartas na sequência certa.", verse: 22,
      win: "🎉 A glória encheu o templo!",
      items: [
        { d: 1, em: "🙏", l: "Salomão termina a oração" },
        { d: 2, em: "🔥", l: "Desce fogo e consome o holocausto" },
        { d: 3, em: "☁️", l: "A glória do Senhor enche a casa" },
        { d: 4, em: "🛐", l: "O povo se prostra e adora" },
      ],
    },
    13: {
      title: "Ordene: Abias contra Jeroboão", sub: "Toque nas cartas na sequência certa.", verse: 22,
      win: "🎉 Deus firmou a vitória de Judá!",
      items: [
        { d: 1, em: "👑", l: "Abias reina sobre Judá" },
        { d: 2, em: "📣", l: "Ele proclama que o Senhor é com Judá" },
        { d: 3, em: "⚔️", l: "Jeroboão arma uma emboscada" },
        { d: 4, em: "🎺", l: "Judá clama, e Deus os socorre" },
      ],
    },
    19: {
      title: "Ordene: Josafá restabelece a justiça", sub: "Toque nas cartas na sequência certa.", verse: 11,
      win: "🎉 A justiça de volta a Judá!",
      items: [
        { d: 1, em: "🏙️", l: "Josafá volta em paz a Jerusalém" },
        { d: 2, em: "🗣️", l: "O vidente Jeú o repreende" },
        { d: 3, em: "🚶", l: "Ele percorre o povo e o reconduz a Deus" },
        { d: 4, em: "⚖️", l: "Estabelece juízes pela terra" },
      ],
    },
    25: {
      title: "Ordene: a queda de Amazias", sub: "Toque nas cartas na sequência certa.", verse: 28,
      win: "🎉 Coração dividido não permanece!",
      items: [
        { d: 1, em: "👑", l: "Amazias assume o reino de Judá" },
        { d: 2, em: "🪖", l: "Dispensa os soldados de Israel" },
        { d: 3, em: "⚔️", l: "Vence Edom no Vale do Sal" },
        { d: 4, em: "🗿", l: "Adora os deuses de Edom e é julgado" },
      ],
    },
    31: {
      title: "Ordene: as reformas de Ezequias", sub: "Toque nas cartas na sequência certa.", verse: 21,
      win: "🎉 O templo restaurado e provido!",
      items: [
        { d: 1, em: "🪓", l: "Ezequias destrói os ídolos e altares" },
        { d: 2, em: "👥", l: "Organiza os sacerdotes e levitas" },
        { d: 3, em: "🌾", l: "Ordena ao povo trazer os dízimos" },
        { d: 4, em: "📦", l: "Montões se empilham nos depósitos" },
      ],
    },
  },
  wordsearch: {
    2: {
      title: "Caça-palavras — Salomão prepara o Templo",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["SALOMÃO", "TEMPLO", "HIRÃO", "TIRO", "CEDRO", "MADEIRA"],
    },
    8: {
      title: "Caça-palavras — As obras de Salomão",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["SALOMÃO", "CIDADES", "TADMOR", "NAVIOS", "OFIR", "OURO"],
    },
    14: {
      title: "Caça-palavras — A fé do rei Asa",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["ASA", "PAZ", "ÍDOLOS", "ZERÁ", "ETÍOPE", "VITÓRIA"],
    },
    20: {
      title: "Caça-palavras — A batalha de Josafá",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["JOSAFÁ", "MOABE", "AMOM", "JEJUM", "CANTORES", "LOUVOR"],
    },
    26: {
      title: "Caça-palavras — O orgulho de Uzias",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["UZIAS", "FORTE", "ORGULHO", "INCENSO", "LEPRA", "TEMPLO"],
    },
    32: {
      title: "Caça-palavras — O livramento de Ezequias",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["EZEQUIAS", "ASSÍRIA", "ANJO", "ORAÇÃO", "MURALHA", "ISAÍAS"],
    },
  },
  crossword: {
    3: {
      title: "Palavra cruzada — A casa no monte Moriá",
      grid: ["TEMPLO", "I.....", "R.....", "O....."],
      across: ["→ A casa que Salomão edificou ao Senhor (6)"],
      down: ["↓ Reino de Hirão, que enviou o cedro (4)"],
    },
    9: {
      title: "Palavra cruzada — A rainha e o rei sábio",
      grid: ["SABA", "A...", "L...", "O...", "M...", "A...", "O..."],
      across: ["→ A rainha que veio provar a sabedoria (4)"],
      down: ["↓ O rei sábio que a recebeu (7)"],
    },
    15: {
      title: "Palavra cruzada — O pacto de Asa",
      grid: ["ASA", "L..", "I..", "A..", "N..", "C..", "A.."],
      across: ["→ Rei de Judá que buscou o Senhor (3)"],
      down: ["↓ Pacto que o povo fez de buscar a Deus (7)"],
    },
    21: {
      title: "Palavra cruzada — A carta a Jeorão",
      grid: ["ELIAS", "D....", "O....", "M...."],
      across: ["→ Profeta cuja carta advertiu Jeorão (5)"],
      down: ["↓ Povo que se rebelou contra Judá (4)"],
    },
    27: {
      title: "Palavra cruzada — O reto rei Jotão",
      grid: ["JOTAO", "U....", "D....", "A...."],
      across: ["→ Rei que fez o que era reto diante do Senhor (5)"],
      down: ["↓ Reino que ele governou (4)"],
    },
    33: {
      title: "Palavra cruzada — O rei que se humilhou",
      grid: ["MANASSES", "U.......", "R.......", "O......."],
      across: ["→ Rei que se humilhou e voltou ao Senhor (8)"],
      down: ["↓ O que ele reedificou em Jerusalém (4)"],
    },
  },
  complete: {
    4: {
      ref: "2 Crônicas 4:7", before: "Fez também dez", answer: "castiçais",
      after: "de ouro, segundo a sua forma, e os pôs no templo.",
      options: ["castiçais", "altares", "mesas", "bacias"],
    },
    10: {
      ref: "2 Crônicas 10:11", before: "Meu pai vos castigou com açoites, porém eu vos castigarei com",
      answer: "escorpiões", after: ".",
      options: ["escorpiões", "espadas", "correntes", "varas"],
    },
    16: {
      ref: "2 Crônicas 16:9", before: "Os olhos do Senhor passam por toda a",
      answer: "terra", after: ", para mostrar-se forte com aqueles cujo coração é perfeito para com ele.",
      options: ["terra", "cidade", "casa", "montanha"],
    },
    22: {
      ref: "2 Crônicas 22:12", before: "E esteve com eles escondido na casa de",
      answer: "Deus", after: "por seis anos, enquanto Atalia reinava sobre a terra.",
      options: ["Deus", "Davi", "campo", "rei"],
    },
    28: {
      ref: "2 Crônicas 28:3", before: "Queimou os seus filhos no fogo, no vale do filho de",
      answer: "Hinom", after: ", conforme as abominações dos gentios.",
      options: ["Hinom", "Sarom", "Elá", "Jezreel"],
    },
    34: {
      ref: "2 Crônicas 34:14", before: "Achou o sacerdote Hilquias o livro da",
      answer: "lei", after: "do Senhor, dada por meio de Moisés.",
      options: ["lei", "aliança", "vida", "promessa"],
    },
  },
  connect: {
    5: {
      title: "Ligue — A arca entra no Templo", sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "A arca", b: "levada ao Santo dos Santos" },
        { a: "Os sacerdotes", b: "saíram do santuário" },
        { a: "A nuvem", b: "encheu a casa do Senhor" },
        { a: "Os cantores", b: "louvaram a uma só voz" },
      ],
    },
    11: {
      title: "Ligue — Roboão fortifica Judá", sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Roboão", b: "fortificou as cidades de Judá" },
        { a: "Sacerdotes e levitas", b: "vieram de Israel para Judá" },
        { a: "Jeroboão", b: "os rejeitou do sacerdócio" },
        { a: "Semaías", b: "proibiu a guerra entre irmãos" },
      ],
    },
    17: {
      title: "Ligue — Josafá ensina a Lei", sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Josafá", b: "andou nos primeiros caminhos de Davi" },
        { a: "Príncipes e levitas", b: "ensinaram a Lei em Judá" },
        { a: "O temor do Senhor", b: "caiu sobre os reinos vizinhos" },
        { a: "Filisteus e árabes", b: "trouxeram tributos" },
      ],
    },
    23: {
      title: "Ligue — Joás é coroado rei", sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Joiada", b: "o sacerdote que liderou" },
        { a: "Joás", b: "coroado rei aos sete anos" },
        { a: "Atalia", b: "morta à espada" },
        { a: "A aliança", b: "reconduziu o povo ao Senhor" },
      ],
    },
    29: {
      title: "Ligue — Ezequias purifica o Templo", sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Ezequias", b: "abriu as portas do templo" },
        { a: "Os levitas", b: "purificaram a casa do Senhor" },
        { a: "Os holocaustos", b: "oferecidos com cânticos" },
        { a: "Os instrumentos de Davi", b: "tocaram no louvor" },
      ],
    },
    35: {
      title: "Ligue — A Páscoa de Josias", sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Josias", b: "celebrou grande Páscoa" },
        { a: "Os cordeiros", b: "doados ao povo pelo rei" },
        { a: "Neco", b: "faraó do Egito" },
        { a: "Megido", b: "onde Josias foi ferido" },
      ],
    },
  },
  boss: {
    questions: [
      { question: "O que desceu do céu quando Salomão terminou de orar na dedicação do templo?", options: ["Fogo", "Chuva", "Maná", "Trovão"], correct: "Fogo" },
      { question: "Qual rainha veio de longe provar a sabedoria de Salomão?", options: ["A rainha de Sabá", "A rainha Ester", "A rainha Vasti", "A rainha Jezabel"], correct: "A rainha de Sabá" },
      { question: "Qual rei purificou o templo e celebrou grande Páscoa em Judá?", options: ["Ezequias", "Acaz", "Manassés", "Jeroboão"], correct: "Ezequias" },
      { question: "Que livro foi achado no templo nos dias do rei Josias?", options: ["O livro da Lei", "O livro dos Salmos", "O livro dos Reis", "O livro de Rute"], correct: "O livro da Lei" },
      { question: "Para onde foi levado o povo de Judá quando Jerusalém caiu?", options: ["Babilônia", "Egito", "Assíria", "Pérsia"], correct: "Babilônia" },
    ],
    story: {
      open: "As chamas da Babilônia se levantam sobre Jerusalém; mas a minha palavra não cai por terra.",
      turns: [
        { ask: "Os muros de Jerusalém foram derrubados.", hit: "Mas a fé não se derruba! 🧱", miss: "Firma o coração; eu ainda reino." },
        { ask: "A casa do Senhor foi entregue ao fogo.", hit: "A chama não consome a promessa! 🔥", miss: "Não temas — eu guardo o meu nome." },
        { ask: "O povo foi levado cativo para a Babilônia.", hit: "No cativeiro, a esperança resiste! ⛓️", miss: "Ergue-te; o exílio tem um fim." },
        { ask: "Setenta anos a terra guardará os seus sábados.", hit: "O tempo se cumpre — a contagem termina! ⏳", miss: "Espera, pois a minha palavra é fiel." },
        { ask: "Ciro proclamará: subi e reedificai a casa do Senhor.", hit: "Golpe final — o exílio é vencido, o povo volta! 🕊️", miss: "A promessa do retorno não falha." },
      ],
      win: "Jerusalém caiu e o templo ardeu, mas a palavra de Deus permaneceu: ao fim dos setenta anos, Ciro abriu as portas e o povo voltou para reedificar a casa do Senhor.",
      winHero: "Das cinzas do exílio, a esperança se levantou! 🙌",
    },
  },
};
