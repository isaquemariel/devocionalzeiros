import type { BookChallenges } from "@/lib/rpgChallengeContent";

// Provérbios (31 caps). Ciclo por capítulo: (c-1)%6 →
// 0=ordenar, 1=caça-palavras, 2=cruzada, 3=completar, 4=ligar, 5=quiz(IA).
// Cap. 31 (último) = boss "A Voz da Insensatez".
export const PROVERBS_CH: BookChallenges = {
  order: {
    1: {
      title: "Ordene: o princípio da sabedoria", sub: "Toque nas cartas na sequência certa.", verse: 33,
      win: "🎉 O temor do Senhor em primeiro lugar!",
      items: [
        { d: 1, em: "📜", l: "Provérbios para dar sabedoria e instrução" },
        { d: 2, em: "🙏", l: "O temor do Senhor é o princípio do saber" },
        { d: 3, em: "⚠️", l: "Filho, não consintas com os pecadores" },
        { d: 4, em: "📢", l: "A Sabedoria clama nas praças da cidade" },
      ],
    },
    7: {
      title: "Ordene: o jovem sem juízo", sub: "Toque nas cartas na sequência certa.", verse: 27,
      win: "🎉 A advertência do pai bem guardada!",
      items: [
        { d: 1, em: "📖", l: "Guarda as palavras e mandamentos do teu pai" },
        { d: 2, em: "🪟", l: "Da janela vê o jovem falto de juízo" },
        { d: 3, em: "💋", l: "A mulher sedutora o encontra e o beija" },
        { d: 4, em: "🐂", l: "Ele a segue como boi ao matadouro" },
      ],
    },
    13: {
      title: "Ordene: o caminho do diligente", sub: "Toque nas cartas na sequência certa.", verse: 25,
      win: "🎉 A diligência dá árvore de vida!",
      items: [
        { d: 1, em: "🎧", l: "O filho sábio ouve a correção do pai" },
        { d: 2, em: "👄", l: "Quem guarda a boca conserva a vida" },
        { d: 3, em: "🐜", l: "A alma do diligente se fartará" },
        { d: 4, em: "🌳", l: "O desejo cumprido é árvore de vida" },
      ],
    },
    19: {
      title: "Ordene: ouvir o conselho", sub: "Toque nas cartas na sequência certa.", verse: 29,
      win: "🎉 Sábio nos teus últimos dias!",
      items: [
        { d: 1, em: "🚶", l: "Melhor o pobre íntegro que o mentiroso" },
        { d: 2, em: "🤝", l: "Muitos buscam o favor do generoso" },
        { d: 3, em: "🕊️", l: "O bom senso torna o homem longânimo" },
        { d: 4, em: "👂", l: "Ouve o conselho e serás sábio no fim" },
      ],
    },
    25: {
      title: "Ordene: provérbios de Salomão", sub: "Toque nas cartas na sequência certa.", verse: 28,
      win: "🎉 Palavras a tempo, maçãs de ouro!",
      items: [
        { d: 1, em: "👑", l: "Provérbios copiados pelos homens de Ezequias" },
        { d: 2, em: "🔍", l: "Glória de Deus é encobrir as coisas" },
        { d: 3, em: "🍎", l: "Palavra a tempo: maçãs de ouro em prata" },
        { d: 4, em: "🔥", l: "Ao inimigo faminto, dá-lhe pão" },
      ],
    },
  },
  wordsearch: {
    2: {
      title: "Caça-palavras — a sabedoria como tesouro",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["SABEDORIA", "TESOURO", "ENTENDER", "JUSTIÇA", "VEREDAS", "TEMOR"],
    },
    8: {
      title: "Caça-palavras — a Sabedoria personificada",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["SABEDORIA", "CLAMA", "VERDADE", "CRIAÇÃO", "PRUDÊNCIA", "PRINCÍPIO"],
    },
    14: {
      title: "Caça-palavras — o sábio e o insensato",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["SÁBIA", "INSENSATO", "VEREDA", "NAÇÃO", "JUSTIÇA", "FONTE"],
    },
    20: {
      title: "Caça-palavras — o vinho, o rei e a balança",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["VINHO", "BALANÇA", "PESO", "REI", "JUSTO", "LÂMPADA"],
    },
    26: {
      title: "Caça-palavras — o tolo e o preguiçoso",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["TOLO", "PREGUIÇA", "MENTIRA", "FOGO", "LENHA", "INTRIGA"],
    },
  },
  crossword: {
    3: {
      title: "Palavra cruzada — confia no Senhor",
      grid: ["CONFIA", "O.....", "R.....", "A.....", "C.....", "A.....", "O....."],
      across: ["→ '____ no Senhor de todo o teu coração' (6)"],
      down: ["↓ De todo o teu ____ confia no Senhor (7)"],
    },
    9: {
      title: "Palavra cruzada — a casa da Sabedoria",
      grid: ["SABEDORIA", "E........", "T........", "E........"],
      across: ["→ Ela edificou a sua casa e a sustenta (9)"],
      down: ["↓ Número de colunas da casa da Sabedoria (4)"],
    },
    15: {
      title: "Palavra cruzada — o coração alegre",
      grid: ["CORACAO", "A......", "M......", "I......", "N......", "H......", "O......"],
      across: ["→ Alegre, ele aformoseia o rosto (7)"],
      down: ["↓ O ____ dos justos é uma estrada aplanada (7)"],
    },
    21: {
      title: "Palavra cruzada — a vitória vem do Senhor",
      grid: ["CAVALO", "O.....", "R.....", "A.....", "C.....", "A.....", "O....."],
      across: ["→ Prepara-se para a batalha, mas a vitória vem do Senhor (6)"],
      down: ["↓ O ____ do rei está nas mãos do Senhor (7)"],
    },
    27: {
      title: "Palavra cruzada — o amigo que afia",
      grid: ["FERRO", "I....", "E....", "L...."],
      across: ["→ Com ele o ____ se afia; assim um amigo afia o outro (5)"],
      down: ["↓ Leais são as feridas de um amigo ____ (4)"],
    },
  },
  complete: {
    4: {
      ref: "Provérbios 4:23",
      before: "Sobre tudo o que se deve guardar, guarda o teu ",
      answer: "coração",
      after: ", porque dele procedem as fontes da vida.",
      options: ["coração", "tesouro", "caminho", "conselho"],
    },
    10: {
      ref: "Provérbios 10:12",
      before: "O ódio excita contendas, mas o amor cobre todos os ",
      answer: "pecados",
      after: ".",
      options: ["pecados", "erros", "males", "enganos"],
    },
    16: {
      ref: "Provérbios 16:18",
      before: "A soberba precede a ",
      answer: "ruína",
      after: ", e a altivez do espírito precede a queda.",
      options: ["ruína", "honra", "glória", "riqueza"],
    },
    22: {
      ref: "Provérbios 22:6",
      before: "Ensina a criança no caminho em que deve andar, e até quando ",
      answer: "envelhecer",
      after: " não se desviará dele.",
      options: ["envelhecer", "crescer", "partir", "dormir"],
    },
    28: {
      ref: "Provérbios 28:13",
      before: "O que encobre as suas transgressões nunca prosperará, mas o que as confessa e deixa alcançará ",
      answer: "misericórdia",
      after: ".",
      options: ["misericórdia", "riqueza", "glória", "descanso"],
    },
  },
  connect: {
    5: {
      title: "Ligue — o alerta contra a sedução", sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Mulher estranha", b: "lábios que destilam mel" },
        { a: "Cisterna", b: "bebe da tua própria água" },
        { a: "Os pés dela", b: "descem à morte" },
        { a: "Olhos do Senhor", b: "veem todos os caminhos" },
      ],
    },
    11: {
      title: "Ligue — justo e ímpio", sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Balança enganosa", b: "abominação ao Senhor" },
        { a: "Vem a soberba", b: "vem também a desonra" },
        { a: "Alma generosa", b: "será fartada e prosperará" },
        { a: "Bela sem juízo", b: "joia de ouro em focinho de porco" },
      ],
    },
    17: {
      title: "Ligue — o coração provado", sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Coração alegre", b: "serve de bom remédio" },
        { a: "O amigo", b: "ama em todo o tempo" },
        { a: "Cadinho e forno", b: "o Senhor prova os corações" },
        { a: "Quem tapa a boca", b: "é tido por prudente" },
      ],
    },
    23: {
      title: "Ligue — os prazeres que enganam", sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "O vinho, ao fim", b: "morde como serpente" },
        { a: "As riquezas", b: "criam asas e voam" },
        { a: "Corrigir o menino", b: "livra a sua alma da morte" },
        { a: "Não te fatigues", b: "para enriqueceres" },
      ],
    },
    29: {
      title: "Ligue — visão e correção", sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Sem profecia", b: "o povo se corrompe" },
        { a: "A vara e a repreensão", b: "dão sabedoria" },
        { a: "O tolo", b: "derrama toda a sua ira" },
        { a: "O temor do homem", b: "é um laço, mas o Senhor guarda" },
      ],
    },
  },
  boss: {
    questions: [
      { question: "Qual é o princípio da sabedoria, segundo Provérbios?", options: ["O temor do Senhor", "A riqueza", "O trabalho", "A fama"], correct: "O temor do Senhor" },
      { question: "Quem é o autor da maior parte dos Provérbios?", options: ["Salomão", "Davi", "Moisés", "Isaías"], correct: "Salomão" },
      { question: "No capítulo 8, quem clama nas alturas do caminho?", options: ["A Sabedoria", "O rei", "O profeta", "A insensata"], correct: "A Sabedoria" },
      { question: "Como termina o livro, no capítulo 31?", options: ["Com o elogio da mulher virtuosa", "Com uma batalha", "Com um salmo", "Com uma genealogia"], correct: "Com o elogio da mulher virtuosa" },
      { question: "Segundo Provérbios 31, o que é enganoso e a formosura é vã?", options: ["A graça", "A riqueza", "A juventude", "A honra"], correct: "A graça" },
    ],
    story: {
      open: "Ergue-te, filho: a Voz da Insensatez clama nas esquinas. Empunha o temor do Senhor, que é o princípio da sabedoria.",
      turns: [
        { ask: "Ela sussurra: 'águas roubadas são doces'.", hit: "O temor do Senhor cala o engano! 🙏", miss: "Não te inclines; firma o coração." },
        { ask: "Ela seduz com lábios que destilam mel.", hit: "A prudência te guarda! 🍯", miss: "Guarda os teus passos, filho." },
        { ask: "Ela promete riquezas pelo caminho torto.", hit: "Melhor o pouco com justiça! ⚖️", miss: "Resiste; a ganância engana." },
        { ask: "Ela ri da correção e despreza o saber.", hit: "O sábio ouve e cresce! 📖", miss: "Inclina o ouvido ao conselho." },
        { ask: "Ela oferece a formosura vã e a graça enganosa.", hit: "Golpe final: quem teme ao Senhor vence! 👑", miss: "A promessa da sabedoria não falha." },
      ],
      win: "A Voz da Insensatez emudeceu; a Sabedoria edificou a sua casa sobre sete colunas.",
      winHero: "O temor do Senhor triunfou — eis o princípio da sabedoria! 🙌",
    },
  },
};
