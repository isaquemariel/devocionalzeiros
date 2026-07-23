import type { BookChallenges } from "@/lib/rpgChallengeContent";

// 1 Samuel (31 caps). Ciclo por capítulo: (c-1)%6 → 0 ordenar, 1 caça-palavras,
// 2 cruzada, 3 completar, 4 ligar, 5 quiz(IA). Cap. 31 (último) = boss "O Gigante Golias".
export const SAMUEL1_CH: BookChallenges = {
  order: {
    1: {
      title: "Ordene: Ana e o menino Samuel", sub: "Toque nas cartas na sequência certa.", verse: 28,
      win: "🎉 A oração de Ana foi respondida!",
      items: [
        { d: 1, em: "😢", l: "Ana chora no templo, sem filhos" },
        { d: 2, em: "🙏", l: "Ana ora e promete o filho ao Senhor" },
        { d: 3, em: "👶", l: "Nasce Samuel: 'ao Senhor o pedi'" },
        { d: 4, em: "🏛️", l: "Ana entrega o menino ao sacerdote Eli" },
      ],
    },
    7: {
      title: "Ordene: a pedra Ebenézer", sub: "Toque nas cartas na sequência certa.", verse: 12,
      win: "🎉 Até aqui nos ajudou o Senhor!",
      items: [
        { d: 1, em: "🔥", l: "Israel deixa os ídolos e volta ao Senhor" },
        { d: 2, em: "🙌", l: "Samuel reúne o povo em Mispa e ora" },
        { d: 3, em: "⛈️", l: "O Senhor troveja e derrota os filisteus" },
        { d: 4, em: "🪨", l: "Samuel ergue a pedra Ebenézer" },
      ],
    },
    13: {
      title: "Ordene: o sacrifício de Saul", sub: "Toque nas cartas na sequência certa.", verse: 14,
      win: "🎉 Obediência vale mais que pressa!",
      items: [
        { d: 1, em: "⚔️", l: "Os filisteus se ajuntam em grande número" },
        { d: 2, em: "😨", l: "O povo se esconde, tomado de medo" },
        { d: 3, em: "🔥", l: "Saul, impaciente, oferece o holocausto" },
        { d: 4, em: "🗣️", l: "Samuel chega e repreende o rei" },
      ],
    },
    19: {
      title: "Ordene: a fuga de Davi", sub: "Toque nas cartas na sequência certa.", verse: 12,
      win: "🎉 O Senhor guardou a vida de Davi!",
      items: [
        { d: 1, em: "😡", l: "Saul ordena que matem Davi" },
        { d: 2, em: "🤝", l: "Jônatas intercede pelo amigo" },
        { d: 3, em: "🗡️", l: "Saul atira a lança contra Davi" },
        { d: 4, em: "🪟", l: "Mical o ajuda a descer pela janela" },
      ],
    },
    25: {
      title: "Ordene: Nabal e Abigail", sub: "Toque nas cartas na sequência certa.", verse: 42,
      win: "🎉 A prudência de Abigail evitou o mal!",
      items: [
        { d: 1, em: "🐑", l: "Davi pede provisões a Nabal" },
        { d: 2, em: "🙅", l: "Nabal responde com desprezo" },
        { d: 3, em: "🎁", l: "Abigail sai ao encontro de Davi com presentes" },
        { d: 4, em: "💍", l: "Nabal morre e Abigail se torna esposa de Davi" },
      ],
    },
  },
  wordsearch: {
    2: {
      title: "Caça-palavras — O cântico de Ana",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["ANA", "ELI", "SENHOR", "OFNI", "FINEIAS", "TEMPLO"],
    },
    8: {
      title: "Caça-palavras — Israel pede um rei",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["REI", "ISRAEL", "SAMUEL", "POVO", "PROFETA", "SENHOR"],
    },
    14: {
      title: "Caça-palavras — Jônatas em Micmás",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["JÔNATAS", "MEL", "ESCUDEIRO", "FILISTEU", "VITÓRIA", "CORAGEM"],
    },
    20: {
      title: "Caça-palavras — A amizade com Jônatas",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["DAVI", "JÔNATAS", "FLECHA", "ALIANÇA", "AMIZADE", "PACTO"],
    },
    26: {
      title: "Caça-palavras — Davi poupa Saul",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["SAUL", "DAVI", "LANÇA", "BILHA", "ABISAI", "EXÉRCITO"],
    },
  },
  crossword: {
    3: {
      title: "Palavra cruzada — O chamado de Samuel",
      grid: ["SAMUEL", "E.....", "N.....", "H.....", "O.....", "R....."],
      across: ["→ O menino que o Senhor chamou de noite (6)"],
      down: ["↓ Aquele que chamava: 'Samuel, Samuel!' (6)"],
    },
    9: {
      title: "Palavra cruzada — Saul procura as jumentas",
      grid: ["SAUL..", "A.....", "M.....", "U.....", "E.....", "L....."],
      across: ["→ O jovem alto que buscava as jumentas (4)"],
      down: ["↓ O profeta que o ungiu rei (6)"],
    },
    15: {
      title: "Palavra cruzada — Saul é rejeitado",
      grid: ["AGAGUE..", "M.......", "A.......", "L.......", "E.......", "Q.......", "U.......", "E......."],
      across: ["→ Rei poupado por Saul, contra a ordem (6)"],
      down: ["↓ Povo que Saul devia destruir por completo (8)"],
    },
    21: {
      title: "Palavra cruzada — Davi foge para Nobe",
      grid: ["GATE..", "O.....", "L.....", "I.....", "A.....", "S....."],
      across: ["→ Cidade filisteia onde Davi fingiu loucura (4)"],
      down: ["↓ Dono da espada que Davi levou de Nobe (6)"],
    },
    27: {
      title: "Palavra cruzada — Davi entre os filisteus",
      grid: ["FILISTEU", "U.......", "G.......", "A......."],
      across: ["→ Povo entre quem Davi foi morar (8)"],
      down: ["↓ O que Davi fazia de Saul (4)"],
    },
  },
  complete: {
    4: {
      ref: "1 Samuel 4:21",
      before: "E chamou ao menino Icabode, dizendo: Foi-se a",
      answer: "glória",
      after: "de Israel, pois a arca de Deus foi tomada.",
      options: ["glória", "força", "paz", "luz"],
    },
    10: {
      ref: "1 Samuel 10:1",
      before: "Então Samuel tomou um vaso de",
      answer: "azeite",
      after: "e o derramou sobre a cabeça de Saul, e o beijou.",
      options: ["azeite", "água", "vinho", "mel"],
    },
    16: {
      ref: "1 Samuel 16:7",
      before: "O homem olha para o que está diante dos olhos, porém o Senhor olha para o",
      answer: "coração",
      after: ".",
      options: ["coração", "rosto", "poder", "tamanho"],
    },
    22: {
      ref: "1 Samuel 22:2",
      before: "Ajuntaram-se a Davi todos os que estavam em",
      answer: "aperto",
      after: ", e ele se tornou o chefe deles.",
      options: ["aperto", "festa", "paz", "descanso"],
    },
    28: {
      ref: "1 Samuel 28:7",
      before: "Saul disse aos seus servos: Buscai-me uma mulher médium em",
      answer: "Endor",
      after: ", para que eu vá a ela e a consulte.",
      options: ["Endor", "Belém", "Gate", "Mispa"],
    },
  },
  connect: {
    5: {
      title: "Ligue — A arca entre os inimigos", sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Dagom", b: "ídolo que caiu diante da arca" },
        { a: "Asdode", b: "cidade onde a arca foi levada" },
        { a: "Tumores", b: "praga sobre os filisteus" },
        { a: "Arca", b: "presença do Senhor entre inimigos" },
      ],
    },
    11: {
      title: "Ligue — Saul liberta Jabes-Gileade", sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Naás", b: "rei amonita que ameaçou a cidade" },
        { a: "Jabes-Gileade", b: "cidade cercada e libertada" },
        { a: "Saul", b: "reuniu Israel para a batalha" },
        { a: "Gilgal", b: "onde confirmaram o reino" },
      ],
    },
    17: {
      title: "Ligue — Davi e Golias", sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Golias", b: "gigante de Gate" },
        { a: "Funda", b: "arma simples de Davi" },
        { a: "Cinco pedras", b: "colhidas no ribeiro" },
        { a: "Vale de Elá", b: "lugar da batalha" },
      ],
    },
    23: {
      title: "Ligue — Davi salva Queila", sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Queila", b: "cidade que Davi livrou dos filisteus" },
        { a: "Jônatas", b: "fortaleceu a mão de Davi em Deus" },
        { a: "Zife", b: "deserto onde Davi se escondeu" },
        { a: "Éfode", b: "consultado por Davi para decidir" },
      ],
    },
    29: {
      title: "Ligue — Os filisteus desconfiam de Davi", sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Aquis", b: "rei que confiava em Davi" },
        { a: "Príncipes", b: "o mandaram voltar por desconfiança" },
        { a: "Afeque", b: "onde os filisteus se reuniram" },
        { a: "Davi", b: "poupado de lutar contra Israel" },
      ],
    },
  },
  boss: {
    questions: [
      { question: "Quem orou por um filho e gerou o menino Samuel?", options: ["Ana", "Raquel", "Débora", "Noemi"], correct: "Ana" },
      { question: "O que os filisteus capturaram na batalha contra Israel?", options: ["A arca de Deus", "O templo", "A coroa", "A harpa"], correct: "A arca de Deus" },
      { question: "Quem foi o primeiro rei de Israel?", options: ["Saul", "Davi", "Samuel", "Jônatas"], correct: "Saul" },
      { question: "Com que arma Davi venceu o gigante Golias?", options: ["Uma funda e uma pedra", "Uma espada", "Um arco", "Uma lança"], correct: "Uma funda e uma pedra" },
      { question: "Quem foi o amigo fiel de Davi, filho de Saul?", options: ["Jônatas", "Abner", "Naás", "Doegue"], correct: "Jônatas" },
    ],
    story: {
      open: "O gigante desafia os exércitos do Senhor; mas não é pela espada que eu salvo. Avança, servo meu.",
      turns: [
        { ask: "O gigante zomba dos exércitos do Deus vivo.", hit: "A afronta é derrubada! 💥", miss: "Não temas o rugido dele." },
        { ask: "Recusaste a armadura pesada de Saul.", hit: "A fé pesa mais que o bronze! 🛡️", miss: "Confia — não é na força." },
        { ask: "Colheste cinco pedras lisas no ribeiro.", hit: "Preparado pela mão do Senhor! 💧", miss: "Ergue-te e escolhe de novo." },
        { ask: "Corres ao encontro do gigante sem temor.", hit: "A coragem avança! 🏃", miss: "Firma o teu coração." },
        { ask: "Lanças a pedra em nome do Senhor dos Exércitos.", hit: "Golpe final — o gigante tomba! 👑", miss: "O nome do Senhor não falha." },
      ],
      win: "A pedra feriu a testa do gigante, e ele caiu por terra: a batalha é do Senhor.",
      winHero: "O gigante caiu — a vitória é do Senhor! 🙌",
    },
  },
};
