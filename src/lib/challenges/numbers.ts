import type { BookChallenges } from "@/lib/rpgChallengeContent";

// Números (36 caps). Ciclo (c-1)%6: 0=ordenar, 1=caça-palavras, 2=cruzada,
// 3=completar, 4=ligar, 5=quiz(IA). Cap.36 = boss (As Serpentes Ardentes).
export const NUMBERS_CH: BookChallenges = {
  order: {
    1: {
      title: "Ordene: o censo no Sinai", sub: "Toque nas cartas na sequência certa.", verse: 46,
      win: "🎉 O povo contado, tribo a tribo!",
      items: [
        { d: 1, em: "🗣️", l: "Deus manda contar o povo no Sinai" },
        { d: 2, em: "🧑‍🤝‍🧑", l: "Um líder de cada tribo é escolhido" },
        { d: 3, em: "⚔️", l: "Contam os homens de 20 anos para cima" },
        { d: 4, em: "🔢", l: "Total: 603.550; os levitas à parte" },
      ],
    },
    7: {
      title: "Ordene: a dedicação do altar", sub: "Toque nas cartas na sequência certa.", verse: 89,
      win: "🎉 As ofertas dos príncipes em ordem!",
      items: [
        { d: 1, em: "⛺", l: "Moisés levanta e unge o tabernáculo" },
        { d: 2, em: "🐂", l: "Líderes trazem seis carros e doze bois" },
        { d: 3, em: "🎁", l: "Cada príncipe oferta em seu dia" },
        { d: 4, em: "🗣️", l: "Deus fala do alto do propiciatório" },
      ],
    },
    13: {
      title: "Ordene: os doze espias", sub: "Toque nas cartas na sequência certa.", verse: 33,
      win: "🎉 A missão de espiar Canaã!",
      items: [
        { d: 1, em: "🗺️", l: "Deus manda espiar a terra de Canaã" },
        { d: 2, em: "🧭", l: "Doze homens, um por tribo, partem" },
        { d: 3, em: "🍇", l: "Cortam um cacho de uvas em Escol" },
        { d: 4, em: "😱", l: "Dez espias: 'há gigantes na terra'" },
      ],
    },
    19: {
      title: "Ordene: a novilha vermelha", sub: "Toque nas cartas na sequência certa.", verse: 9,
      win: "🎉 A água da purificação preparada!",
      items: [
        { d: 1, em: "🐄", l: "Deus pede uma novilha vermelha sem defeito" },
        { d: 2, em: "🔥", l: "A novilha é queimada fora do arraial" },
        { d: 3, em: "🏺", l: "As cinzas são guardadas com cuidado" },
        { d: 4, em: "💧", l: "A água purifica quem tocou um morto" },
      ],
    },
    25: {
      title: "Ordem: o zelo de Fineias", sub: "Toque nas cartas na sequência certa.", verse: 9,
      win: "🎉 A praga cessou pelo zelo!",
      items: [
        { d: 1, em: "💔", l: "Israel se une às mulheres de Moabe" },
        { d: 2, em: "🛐", l: "O povo adora Baal-Peor" },
        { d: 3, em: "☠️", l: "Uma praga irrompe no arraial" },
        { d: 4, em: "🗡️", l: "Fineias age e a praga cessa" },
      ],
    },
    31: {
      title: "Ordene: a guerra contra Midiã", sub: "Toque nas cartas na sequência certa.", verse: 27,
      win: "🎉 O despojo repartido com justiça!",
      items: [
        { d: 1, em: "🗣️", l: "Deus manda vingar Israel de Midiã" },
        { d: 2, em: "⚔️", l: "Mil de cada tribo vão à guerra" },
        { d: 3, em: "🩸", l: "Balaão é morto à espada" },
        { d: 4, em: "⚖️", l: "Repartem o despojo entre povo e sacerdotes" },
      ],
    },
  },
  wordsearch: {
    2: {
      title: "Caça-palavras — O arraial em ordem",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["TRIBOS", "BANDEIRA", "JUDÁ", "ARRAIAL", "ORDEM", "ORIENTE"],
    },
    8: {
      title: "Caça-palavras — As lâmpadas e os levitas",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["CANDEIA", "LÂMPADAS", "LEVITAS", "PURIFICAR", "OURO", "SERVIÇO"],
    },
    14: {
      title: "Caça-palavras — A rebelião no deserto",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["REBELIÃO", "CALEBE", "JOSUÉ", "DESERTO", "PRAGA", "QUARENTA"],
    },
    20: {
      title: "Caça-palavras — As águas de Meribá",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["MERIBÁ", "ROCHA", "ÁGUA", "MIRIÃ", "ARÃO", "EDOM"],
    },
    26: {
      title: "Caça-palavras — O segundo censo",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["CENSO", "MOABE", "TRIBOS", "HERANÇA", "SORTE", "NÚMERO"],
    },
    32: {
      title: "Caça-palavras — A terra de além do Jordão",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["RÚBEN", "GADE", "JORDÃO", "REBANHO", "GILEADE", "GUERRA"],
    },
  },
  crossword: {
    3: {
      title: "Palavra cruzada — Os levitas do santuário",
      grid: ["ARAO", "R...", "C...", "A..."],
      across: ["→ O sacerdote, irmão de Moisés (4)"],
      down: ["↓ Os coatitas a carregavam nos ombros (4)"],
    },
    9: {
      title: "Palavra cruzada — A nuvem que guiava",
      grid: ["NUVEM", "O....", "I....", "T....", "E...."],
      across: ["→ Cobria o tabernáculo de dia (5)"],
      down: ["↓ Sobre a tenda parecia fogo à ___ (5)"],
    },
    15: {
      title: "Palavra cruzada — As franjas de lembrança",
      grid: ["FRANJAS", "I......", "O......"],
      across: ["→ Deviam usá-las nas bordas das vestes (7)"],
      down: ["↓ O cordão azul era um ___ de lembrança (3)"],
    },
    21: {
      title: "Palavra cruzada — A haste no deserto",
      grid: ["SERPENTE", "I.......", "O.......", "M......."],
      across: ["→ Moisés fez uma de bronze na haste (8)"],
      down: ["↓ Rei amorreu vencido por Israel (4)"],
    },
    27: {
      title: "Palavra cruzada — A herança das filhas",
      grid: ["HERDAR", "E.....", "R.....", "A.....", "N.....", "C.....", "A....."],
      across: ["→ O que as filhas de Zelofeade puderam fazer (6)"],
      down: ["↓ A porção que lhes coube por direito (7)"],
    },
    33: {
      title: "Palavra cruzada — As jornadas do deserto",
      grid: ["ETAPAS", "G.....", "I.....", "T.....", "O....."],
      across: ["→ As muitas jornadas registradas (6)"],
      down: ["↓ De onde Israel partiu (5)"],
    },
  },
  complete: {
    4: {
      ref: "Números 4:15",
      before: "os filhos de Coate virão para levá-lo; mas não tocarão coisa ",
      answer: "santa",
      after: ", para que não morram.",
      options: ["santa", "comum", "velha", "seca"],
    },
    10: {
      ref: "Números 10:2",
      before: "Faze-te duas trombetas de ",
      answer: "prata",
      after: "; de obra batida as farás.",
      options: ["prata", "ouro", "bronze", "ferro"],
    },
    16: {
      ref: "Números 16:32",
      before: "a terra abriu a sua ",
      answer: "boca",
      after: " e os tragou com as suas casas.",
      options: ["boca", "porta", "mão", "cova"],
    },
    22: {
      ref: "Números 22:28",
      before: "o SENHOR abriu a boca da ",
      answer: "jumenta",
      after: ", que disse a Balaão: Que te fiz eu?",
      options: ["jumenta", "ovelha", "águia", "serpente"],
    },
    28: {
      ref: "Números 28:3",
      before: "dois cordeiros de um ano, sem defeito, cada ",
      answer: "dia",
      after: ", em contínuo holocausto.",
      options: ["dia", "mês", "ano", "sábado"],
    },
    34: {
      ref: "Números 34:2",
      before: "esta é a terra que vos cairá em ",
      answer: "herança",
      after: ", a terra de Canaã segundo os seus limites.",
      options: ["herança", "guerra", "cinzas", "exílio"],
    },
  },
  connect: {
    5: {
      title: "Ligue — As leis do arraial",
      sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Águas amargas", b: "provam a fidelidade" },
        { a: "Leproso", b: "posto fora do arraial" },
        { a: "Restituição", b: "devolver com mais um quinto" },
        { a: "Oferta de ciúmes", b: "farinha de cevada" },
      ],
    },
    11: {
      title: "Ligue — As queixas no deserto",
      sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Taberá", b: "fogo do Senhor no arraial" },
        { a: "Maná", b: "gosto de bolo de azeite" },
        { a: "Setenta anciãos", b: "receberam o Espírito" },
        { a: "Codornizes", b: "vieram do mar pelo vento" },
      ],
    },
    17: {
      title: "Ligue — A vara que floresceu",
      sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Doze varas", b: "uma por tribo" },
        { a: "Vara de Arão", b: "floresceu amêndoas" },
        { a: "Guardada na arca", b: "sinal contra rebeldes" },
        { a: "A vara escolhida", b: "tribo de Levi" },
      ],
    },
    23: {
      title: "Ligue — Os oráculos de Balaão",
      sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Balaão", b: "não podia amaldiçoar" },
        { a: "Sete altares", b: "novilhos e carneiros" },
        { a: "Bênção no lugar da maldição", b: "vontade de Deus" },
        { a: "Jacó", b: "nenhum encanto prevalece" },
      ],
    },
    29: {
      title: "Ligue — As festas do sétimo mês",
      sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Primeiro dia", b: "festa das trombetas" },
        { a: "Dia dez", b: "Dia da Expiação" },
        { a: "Dia quinze", b: "festa dos Tabernáculos" },
        { a: "Sete dias", b: "ofertas que diminuem" },
      ],
    },
    35: {
      title: "Ligue — As cidades de refúgio",
      sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Quarenta e oito cidades", b: "dadas aos levitas" },
        { a: "Seis cidades", b: "de refúgio" },
        { a: "Homicida involuntário", b: "foge para lá" },
        { a: "Vingador do sangue", b: "não podia alcançá-lo" },
      ],
    },
  },
  boss: {
    questions: [
      { question: "Quantos espias foram enviados a Canaã?", options: ["Doze", "Sete", "Quarenta", "Dez"], correct: "Doze" },
      { question: "Quais dois espias confiaram em Deus?", options: ["Josué e Calebe", "Arão e Hur", "Datã e Abirão", "Nadabe e Abiú"], correct: "Josué e Calebe" },
      { question: "O que a vara de Arão fez como sinal?", options: ["Floresceu amêndoas", "Virou serpente", "Secou de vez", "Frutificou uvas"], correct: "Floresceu amêndoas" },
      { question: "Como Moisés curou os mordidos pelas serpentes?", options: ["Levantou uma serpente de bronze", "Orou em silêncio", "Ofereceu um cordeiro", "Bateu na rocha"], correct: "Levantou uma serpente de bronze" },
      { question: "Quem teve a jumenta que falou?", options: ["Balaão", "Balaque", "Coré", "Fineias"], correct: "Balaão" },
    ],
    story: {
      open: "Ergue os olhos, filho: as serpentes ardentes cercam o arraial, mas o meu remédio já está na haste.",
      turns: [
        { ask: "O veneno do murmúrio se espalha no arraial.", hit: "A confissão quebra o veneno! 💥", miss: "Não te deixes morder pela queixa." },
        { ask: "A serpente ardente investe contra ti.", hit: "O olhar de fé a repele! 💥", miss: "Levanta os olhos, não os baixes." },
        { ask: "Moisés ergue a serpente de bronze na haste.", hit: "Quem olha, vive! 🐍", miss: "Olha para o alto e serás curado." },
        { ask: "O medo sussurra que é tarde demais.", hit: "A cura não falha a quem crê! 💥", miss: "Ainda há tempo — olha e vive." },
        { ask: "A última serpente ergue-se sibilando.", hit: "Golpe final — o veneno é vencido! 🙌", miss: "Firma o olhar na promessa." },
      ],
      win: "Assim como a serpente foi levantada no deserto, também seria levantado o Filho do Homem — e quem olhar, viverá.",
      winHero: "As serpentes ardentes foram vencidas pelo olhar da fé! 🙌",
    },
  },
};
