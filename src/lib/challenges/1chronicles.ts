import type { BookChallenges } from "@/lib/rpgChallengeContent";

// 1 Crônicas (29 caps). Ciclo por capítulo: (c-1)%6 → 0 order, 1 wordsearch,
// 2 crossword, 3 complete, 4 connect, 5 quiz (IA, sem conteúdo). Cap. 29 = boss.
export const CHRON1_CH: BookChallenges = {
  order: {
    1: {
      title: "Ordene: de Adão a Abraão", sub: "Toque nas cartas na sequência certa.", verse: 28,
      win: "🎉 A linhagem da promessa em ordem!",
      items: [
        { d: 1, em: "🌍", l: "Adão, o primeiro homem" },
        { d: 2, em: "🚢", l: "Noé e seus filhos após o dilúvio" },
        { d: 3, em: "⭐", l: "Abraão, o pai da fé" },
        { d: 4, em: "👥", l: "Isaque e Ismael, filhos de Abraão" },
      ],
    },
    7: {
      title: "Ordene: a casa de Efraim", sub: "Toque nas cartas na sequência certa.", verse: 24,
      win: "🎉 A história de Efraim em ordem!",
      items: [
        { d: 1, em: "😢", l: "Filhos de Efraim mortos pelos homens de Gate" },
        { d: 2, em: "🕯️", l: "Efraim pranteia muitos dias" },
        { d: 3, em: "👶", l: "Nasce-lhe o filho Berias" },
        { d: 4, em: "🏘️", l: "Seera edifica cidades (Bete-Horom)" },
      ],
    },
    13: {
      title: "Ordene: a arca sobe e a falha de Uzá", sub: "Toque nas cartas na sequência certa.", verse: 14,
      win: "🎉 A lição da reverência em ordem!",
      items: [
        { d: 1, em: "🐂", l: "A arca é posta sobre um carro novo" },
        { d: 2, em: "🤚", l: "Uzá estende a mão para segurar a arca" },
        { d: 3, em: "⚡", l: "Uzá cai morto ao tocá-la" },
        { d: 4, em: "🏠", l: "A arca fica na casa de Obede-Edom" },
      ],
    },
    19: {
      title: "Ordene: a afronta dos amonitas", sub: "Toque nas cartas na sequência certa.", verse: 19,
      win: "🎉 A vitória do reino em ordem!",
      items: [
        { d: 1, em: "🕊️", l: "Davi envia mensageiros para consolar Hanum" },
        { d: 2, em: "✂️", l: "Hanum rapa-lhes as barbas e corta as vestes" },
        { d: 3, em: "💰", l: "Os amonitas contratam carros e sírios" },
        { d: 4, em: "⚔️", l: "Joabe e Abisai derrotam os inimigos" },
      ],
    },
    25: {
      title: "Ordene: os cantores do Senhor", sub: "Toque nas cartas na sequência certa.", verse: 8,
      win: "🎉 O louvor organizado em ordem!",
      items: [
        { d: 1, em: "🎵", l: "Davi separa os filhos de Asafe, Hemã e Jedutum" },
        { d: 2, em: "🎼", l: "Eles profetizam com harpas e címbalos" },
        { d: 3, em: "🎓", l: "Contam-se 288 mestres no canto ao Senhor" },
        { d: 4, em: "🎲", l: "Lançam sortes para as suas turmas" },
      ],
    },
  },
  wordsearch: {
    2: {
      title: "Caça-palavras — a linhagem de Judá",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["JUDÁ", "PEREZ", "BOAZ", "OBEDE", "JESSÉ", "DAVI"],
    },
    8: {
      title: "Caça-palavras — a casa de Saul",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["BENJAMIM", "SAUL", "QUIS", "JÔNATAS", "GIBEÁ", "NER"],
    },
    14: {
      title: "Caça-palavras — as vitórias de Davi",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["DAVI", "HIRÃO", "CEDRO", "FILISTEUS", "REFAIM", "VITÓRIA"],
    },
    20: {
      title: "Caça-palavras — os gigantes vencidos",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["RABÁ", "GIGANTE", "GATE", "LANÇA", "ESPADA", "GOLIAS"],
    },
    26: {
      title: "Caça-palavras — os porteiros do templo",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["PORTEIRO", "PORTAS", "TESOURO", "SORTES", "LEVITAS", "GUARDA"],
    },
  },
  crossword: {
    3: {
      title: "Palavra cruzada — os filhos de Davi",
      grid: ["SALOMAO", "E......", "D......", "E......", "C......", "I......", "A......", "S......"],
      across: ["→ O filho de Davi que reinaria depois dele (7)"],
      down: ["↓ Último rei de Judá antes do exílio (8)"],
    },
    9: {
      title: "Palavra cruzada — os que voltaram",
      grid: ["JERUSALEM", "O........", "N........", "A........", "T........", "A........", "S........"],
      across: ["→ Cidade onde habitaram os que voltaram do exílio (9)"],
      down: ["↓ Filho de Saul citado na genealogia (7)"],
    },
    15: {
      title: "Palavra cruzada — a arca aos ombros",
      grid: ["ARCA", "S...", "A...", "F...", "E..."],
      across: ["→ Levada aos ombros pelos levitas, como convém (4)"],
      down: ["↓ Cantor levita nomeado por Davi para o louvor (5)"],
    },
    21: {
      title: "Palavra cruzada — a eira de Ornã",
      grid: ["ALTAR", "N....", "J....", "O...."],
      across: ["→ Davi o edificou na eira de Ornã (5)"],
      down: ["↓ Davi o viu com a espada sobre Jerusalém (4)"],
    },
    27: {
      title: "Palavra cruzada — o exército de Davi",
      grid: ["TURMAS", "R.....", "I.....", "B.....", "O.....", "S....."],
      across: ["→ As divisões do exército que serviam mês a mês (6)"],
      down: ["↓ Cada uma tinha seu líder em Israel (6)"],
    },
  },
  complete: {
    4: {
      ref: "1 Crônicas 4:10",
      before: "Jabez invocou o Deus de Israel, dizendo: Se me",
      answer: "abençoares",
      after: "muito, e alargares os meus termos",
      options: ["abençoares", "guardares", "ouvires", "livrares"],
    },
    10: {
      ref: "1 Crônicas 10:13",
      before: "Assim morreu Saul pela",
      answer: "transgressão",
      after: "que cometeu contra o Senhor",
      options: ["transgressão", "coroa", "batalha", "tristeza"],
    },
    16: {
      ref: "1 Crônicas 16:34",
      before: "Louvai ao Senhor, porque ele é",
      answer: "bom",
      after: "porque a sua benignidade dura perpetuamente",
      options: ["bom", "fiel", "santo", "forte"],
    },
    22: {
      ref: "1 Crônicas 22:10",
      before: "Ele edificará uma",
      answer: "casa",
      after: "ao meu nome; ele me será por filho",
      options: ["casa", "cidade", "torre", "tenda"],
    },
    28: {
      ref: "1 Crônicas 28:20",
      before: "Esforça-te, e tem bom",
      answer: "ânimo",
      after: "e faze a obra; não temas nem te espantes",
      options: ["ânimo", "zelo", "juízo", "temor"],
    },
  },
  connect: {
    5: {
      title: "Ligue — as tribos além do Jordão",
      sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Rúben", b: "perdeu a primogenitura" },
        { a: "Gade", b: "habitou em Gileade e Basã" },
        { a: "Meia tribo de Manassés", b: "ficou a leste do Jordão" },
        { a: "Hagareus", b: "povo vencido em batalha" },
      ],
    },
    11: {
      title: "Ligue — Davi e os seus valentes",
      sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Hebrom", b: "onde Davi foi ungido rei" },
        { a: "Sião", b: "fortaleza tomada em Jerusalém" },
        { a: "Joabe", b: "tornou-se chefe do exército" },
        { a: "Água do poço de Belém", b: "derramada ao Senhor" },
      ],
    },
    17: {
      title: "Ligue — a aliança com Davi",
      sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Natã", b: "profeta que trouxe a palavra" },
        { a: "Davi", b: "queria edificar a casa de Deus" },
        { a: "O filho de Davi", b: "edificaria o templo" },
        { a: "O trono de Davi", b: "firmado para sempre" },
      ],
    },
    23: {
      title: "Ligue — os levitas e o seu serviço",
      sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Gérson, Coate e Merari", b: "os filhos de Levi" },
        { a: "38 mil levitas", b: "contados por Davi" },
        { a: "Casa do Senhor", b: "servida por turmas" },
        { a: "De vinte anos para cima", b: "idade do serviço" },
      ],
    },
  },
  boss: {
    questions: [
      { question: "Com quem começa a genealogia de 1 Crônicas?", options: ["Adão", "Noé", "Abraão", "Davi"], correct: "Adão" },
      { question: "Quem morreu ao estender a mão à arca?", options: ["Uzá", "Obede-Edom", "Joabe", "Natã"], correct: "Uzá" },
      { question: "O que Davi levou em festa para Jerusalém?", options: ["A arca do Senhor", "O trono", "A espada de Golias", "As tábuas novas"], correct: "A arca do Senhor" },
      { question: "O que Deus prometeu a Davi por meio de Natã?", options: ["Um trono firmado para sempre", "Muito ouro", "Uma vida longa", "A cidade de Hebrom"], correct: "Um trono firmado para sempre" },
      { question: "O que Davi preparou para Salomão edificar?", options: ["O templo do Senhor", "Um palácio", "Uma muralha", "Uma frota"], correct: "O templo do Senhor" },
    ],
    story: {
      open: "Levanta-te, Davi; as guerras do reino são minhas, e minha também será a vitória.",
      turns: [
        { ask: "Une as tribos e assume o trono em Hebrom.", hit: "O reino se firma! 👑", miss: "Aguarda o meu tempo, ungido." },
        { ask: "Sobe a arca aos ombros dos levitas, como convém.", hit: "A glória entra em Sião! 🎺", miss: "Busca-me segundo a ordem certa." },
        { ask: "Enfrenta filisteus e amonitas que afrontam o meu povo.", hit: "As nações caem! ⚔️", miss: "Não temas os gigantes." },
        { ask: "Recebe a aliança: da tua casa virá um trono eterno.", hit: "A promessa se sela! 📜", miss: "Confia na minha palavra." },
        { ask: "Ajunta ouro e prata para a casa que teu filho edificará.", hit: "Golpe final — o templo está provido! 🏛️", miss: "Oferta de coração, e eu proverei." },
      ],
      win: "As guerras cessaram; o reino repousa, e a casa do Senhor será levantada por Salomão.",
      winHero: "Tudo vem de ti, Senhor, e da tua mão te damos! 🙌",
    },
  },
};
