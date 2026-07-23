import type { BookChallenges } from "@/lib/rpgChallengeContent";

// Deuteronômio (34 caps). Ciclo (c-1)%6: 0 order, 1 wordsearch, 2 crossword,
// 3 complete, 4 connect, 5 quiz(IA). Cap.34 (último) = boss.
export const DEUTERONOMY_CH: BookChallenges = {
  order: {
    1: {
      title: "Ordene: a recordação da jornada", sub: "Toque nas cartas na sequência certa.", verse: 46,
      win: "🎉 A jornada relembrada em ordem!",
      items: [
        { d: 1, em: "🏔️", l: "Deus manda partir do Horebe" },
        { d: 2, em: "⚖️", l: "Moisés nomeia chefes e juízes" },
        { d: 3, em: "🔭", l: "Doze espiões exploram a terra" },
        { d: 4, em: "😔", l: "O povo se recusa a entrar" },
      ],
    },
    7: {
      title: "Ordene: o povo escolhido", sub: "Toque nas cartas na sequência certa.", verse: 26,
      win: "🎉 A escolha de Deus em ordem!",
      items: [
        { d: 1, em: "💛", l: "O Senhor te escolhe como povo santo" },
        { d: 2, em: "⚔️", l: "Ele expulsa as sete nações maiores" },
        { d: 3, em: "🔥", l: "Destrói os altares e ídolos delas" },
        { d: 4, em: "🌾", l: "Bênção e fruto sobre o povo fiel" },
      ],
    },
    13: {
      title: "Ordene: o falso profeta", sub: "Toque nas cartas na sequência certa.", verse: 18,
      win: "🎉 A fidelidade guardada em ordem!",
      items: [
        { d: 1, em: "🌟", l: "Surge um profeta com sinais e prodígios" },
        { d: 2, em: "🗣️", l: "Ele diz: 'Sigamos outros deuses'" },
        { d: 3, em: "🚫", l: "Não ouvirás as suas palavras" },
        { d: 4, em: "⚖️", l: "O sedutor é tirado do meio de ti" },
      ],
    },
    19: {
      title: "Ordene: as cidades de refúgio", sub: "Toque nas cartas na sequência certa.", verse: 21,
      win: "🎉 A justiça em ordem!",
      items: [
        { d: 1, em: "🏙️", l: "Separam-se três cidades de refúgio" },
        { d: 2, em: "🏃", l: "Quem mata sem querer foge para lá" },
        { d: 3, em: "🛡️", l: "O vingador do sangue não o alcança" },
        { d: 4, em: "🧑‍⚖️", l: "Duas ou três testemunhas confirmam a causa" },
      ],
    },
    25: {
      title: "Ordene: leis e memória", sub: "Toque nas cartas na sequência certa.", verse: 19,
      win: "🎉 As leis em ordem!",
      items: [
        { d: 1, em: "⚖️", l: "O juiz açoita o culpado com medida" },
        { d: 2, em: "🐂", l: "Não atarás a boca ao boi que debulha" },
        { d: 3, em: "👣", l: "A lei do resgate do irmão pela sandália" },
        { d: 4, em: "⚔️", l: "Lembra o que Amaleque te fez no caminho" },
      ],
    },
    31: {
      title: "Ordene: a passagem da liderança", sub: "Toque nas cartas na sequência certa.", verse: 30,
      win: "🎉 A sucessão em ordem!",
      items: [
        { d: 1, em: "📜", l: "Moisés termina de escrever a Lei" },
        { d: 2, em: "🤝", l: "Ele encoraja Josué: 'Sê forte'" },
        { d: 3, em: "🏺", l: "A Lei é posta junto à arca da aliança" },
        { d: 4, em: "🎵", l: "Deus manda escrever um cântico" },
      ],
    },
  },
  wordsearch: {
    2: {
      title: "Caça-palavras — a marcha pelo deserto",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["DESERTO", "EDOM", "MOABE", "SEOM", "HESBOM", "VITORIA"],
    },
    8: {
      title: "Caça-palavras — lembrar o caminho",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["DESERTO", "MANA", "PAO", "PROVA", "TERRA", "LEMBRAR"],
    },
    14: {
      title: "Caça-palavras — limpo e imundo",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["LIMPO", "IMUNDO", "DIZIMO", "SANTO", "COMIDA", "POVO"],
    },
    20: {
      title: "Caça-palavras — as leis da guerra",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["GUERRA", "BATALHA", "MEDO", "CIDADE", "PAZ", "EXERCITO"],
    },
    26: {
      title: "Caça-palavras — as primícias",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["PRIMICIAS", "CESTO", "ALTAR", "DIZIMO", "ARAMEU", "POVO"],
    },
    32: {
      title: "Caça-palavras — o cântico de Moisés",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["CANTICO", "ROCHA", "FIEL", "JUSTO", "AGUIA", "SENHOR"],
    },
  },
  crossword: {
    3: {
      title: "Palavra cruzada — a travessia adiante",
      grid: ["JOSUE", "O....", "R....", "D....", "A....", "O...."],
      across: ["→ O sucessor que Moisés encorajou (5)"],
      down: ["↓ O rio que Israel iria atravessar (6)"],
    },
    9: {
      title: "Palavra cruzada — o intercessor",
      grid: ["MOISES", "O.....", "N.....", "T.....", "E....."],
      across: ["→ Quem subiu ao monte e intercedeu pelo povo (6)"],
      down: ["↓ Lugar onde ele recebeu as tábuas (5)"],
    },
    15: {
      title: "Palavra cruzada — o ano da remissão",
      grid: ["LIVRE", "I....", "B....", "E....", "R....", "T....", "A....", "R...."],
      across: ["→ Como o escravo sai no ano da remissão (5)"],
      down: ["↓ O que se faz ao servo no sétimo ano (8)"],
    },
    21: {
      title: "Palavra cruzada — a expiação do sangue",
      grid: ["SANGUE", "A.....", "C.....", "E.....", "R.....", "D.....", "O.....", "T.....", "E....."],
      across: ["→ O que a novilha expia pela morte sem autor (6)"],
      down: ["↓ Filhos de Levi que se aproximam na cerimônia (9)"],
    },
    27: {
      title: "Palavra cruzada — o altar no monte Ebal",
      grid: ["ALTAR", "M....", "E....", "M...."],
      across: ["→ O que se edifica de pedras no monte Ebal (5)"],
      down: ["↓ Palavra que o povo responde a cada maldição (4)"],
    },
    33: {
      title: "Palavra cruzada — a bênção às tribos",
      grid: ["BENCAO", "E.....", "N.....", "J.....", "A.....", "M.....", "I.....", "M....."],
      across: ["→ O que Moisés deu às tribos antes de morrer (6)"],
      down: ["↓ Tribo amada, que habita segura junto a Deus (8)"],
    },
  },
  complete: {
    4: {
      ref: "Deuteronômio 4:24",
      before: "Porque o Senhor teu Deus é um ",
      answer: "fogo",
      after: " consumidor, um Deus zeloso.",
      options: ["fogo", "vento", "rio", "monte"],
    },
    10: {
      ref: "Deuteronômio 10:12",
      before: "Que é que o Senhor teu Deus pede de ti, senão que ",
      answer: "temas",
      after: " o Senhor teu Deus, andando em todos os seus caminhos?",
      options: ["temas", "ames", "sirvas", "ouças"],
    },
    16: {
      ref: "Deuteronômio 16:20",
      before: "A ",
      answer: "justiça",
      after: ", somente a justiça seguirás, para que vivas.",
      options: ["justiça", "paz", "verdade", "glória"],
    },
    22: {
      ref: "Deuteronômio 22:8",
      before: "Quando edificares uma casa nova, farás um ",
      answer: "parapeito",
      after: " no teu terraço, para não pores culpa de sangue na tua casa.",
      options: ["parapeito", "altar", "jardim", "poço"],
    },
    28: {
      ref: "Deuteronômio 28:13",
      before: "E o Senhor te porá por ",
      answer: "cabeça",
      after: " e não por cauda; e só estarás em cima.",
      options: ["cabeça", "servo", "escravo", "último"],
    },
  },
  connect: {
    5: {
      title: "Ligue — os Dez Mandamentos", sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Horebe", b: "Monte onde a aliança foi feita" },
        { a: "Sábado", b: "Dia de descanso, lembrando o Egito" },
        { a: "Honra teus pais", b: "Para que se prolonguem teus dias" },
        { a: "Dez Palavras", b: "Escritas em duas tábuas de pedra" },
      ],
    },
    11: {
      title: "Ligue — bênção, maldição e chuva", sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Chuva temporã", b: "Cai no outono sobre a terra" },
        { a: "Chuva serôdia", b: "Cai na primavera para a colheita" },
        { a: "Monte Gerizim", b: "A bênção" },
        { a: "Monte Ebal", b: "A maldição" },
      ],
    },
    17: {
      title: "Ligue — a lei do rei", sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "O rei", b: "Não multiplicará cavalos" },
        { a: "Cópia da Lei", b: "O rei a lerá todos os dias" },
        { a: "Duas testemunhas", b: "Confirmam a sentença de morte" },
        { a: "Idolatria", b: "Punida fora das portas da cidade" },
      ],
    },
    23: {
      title: "Ligue — a congregação do Senhor", sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Amonita e moabita", b: "Não entram na congregação" },
        { a: "Edomita", b: "Não o aborrecerás, é teu irmão" },
        { a: "Voto ao Senhor", b: "Não tardarás em cumpri-lo" },
        { a: "Escravo fugido", b: "Não o entregarás ao seu senhor" },
      ],
    },
    29: {
      title: "Ligue — a aliança em Moabe", sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Terra de Moabe", b: "Onde a aliança foi renovada" },
        { a: "Quarenta anos", b: "As vestes não se envelheceram" },
        { a: "Coisas encobertas", b: "Pertencem ao Senhor nosso Deus" },
        { a: "Coisas reveladas", b: "São para nós e nossos filhos" },
      ],
    },
  },
  boss: {
    questions: [
      { question: "Onde Moisés viu a Terra Prometida antes de morrer?", options: ["Monte Nebo", "Monte Sinai", "Monte Carmelo", "Monte Hermom"], correct: "Monte Nebo" },
      { question: "Qual oração começa com 'Ouve, ó Israel'?", options: ["O Shemá", "O Pai Nosso", "O Magnificat", "O Salmo 23"], correct: "O Shemá" },
      { question: "Quantos mandamentos Moisés repetiu no capítulo 5?", options: ["Dez", "Sete", "Doze", "Cinco"], correct: "Dez" },
      { question: "Quem sucedeu Moisés como líder de Israel?", options: ["Josué", "Arão", "Calebe", "Eleazar"], correct: "Josué" },
      { question: "No capítulo 30, entre o que Moisés mandou o povo escolher?", options: ["A vida e a morte", "O ouro e a prata", "A guerra e a paz", "O sol e a lua"], correct: "A vida e a morte" },
    ],
    story: {
      open: "Não temas os filhos de Anaque, altos como cedros; eu vou adiante de ti como fogo consumidor.",
      turns: [
        { ask: "Recordas toda a jornada de quarenta anos no deserto?", hit: "A memória fortalece a fé — golpe certeiro! 🏜️", miss: "Não esqueças o caminho por onde te trouxe." },
        { ask: "Guardaste as Dez Palavras escritas nas tábuas?", hit: "A Lei é escudo — o gigante recua! 📜", miss: "Firma-te nos mandamentos e avança." },
        { ask: "Amas o Senhor de todo o teu coração, ó Israel?", hit: "'Ouve, ó Israel!' — o Shemá derruba o inimigo! ❤️", miss: "Ama-me sobre todas as coisas e vence." },
        { ask: "Escolhes a vida e a bênção diante de mim?", hit: "Escolheste a vida — o gigante cai! 🌿", miss: "Diante de ti estão a vida e a morte; escolhe bem." },
        { ask: "Crês que atravessarás o Jordão com Josué?", hit: "Golpe final — Anaque é derrotado! ⚔️", miss: "Sê forte e corajoso; a terra será tua." },
      ],
      win: "Os gigantes de Anaque tombaram, e do alto do monte Nebo brilhou a Terra Prometida.",
      winHero: "A fé venceu os gigantes! 🙌",
    },
  },
};
