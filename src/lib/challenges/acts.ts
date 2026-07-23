import type { BookChallenges } from "@/lib/rpgChallengeContent";

// Atos (28 caps). Ciclo (c-1)%6: 0=ordenar, 1=caça-palavras, 2=cruzada,
// 3=completar, 4=ligar, 5=quiz(IA). Cap.28 (último) = boss.
export const ACTS_CH: BookChallenges = {
  order: {
    1: {
      title: "Ordene: a ascensão de Jesus", sub: "Toque nas cartas na sequência certa.", verse: 26,
      win: "🎉 A promessa do Alto em ordem!",
      items: [
        { d: 1, em: "📖", l: "Jesus ensina os apóstolos por 40 dias" },
        { d: 2, em: "🕊️", l: "Promete o Espírito Santo em breve" },
        { d: 3, em: "☁️", l: "Sobe ao céu numa nuvem" },
        { d: 4, em: "🎲", l: "Matias é escolhido no lugar de Judas" },
      ],
    },
    7: {
      title: "Ordene: o martírio de Estêvão", sub: "Toque nas cartas na sequência certa.", verse: 60,
      win: "🎉 A fé firme até o fim!",
      items: [
        { d: 1, em: "📜", l: "Estêvão relembra a história de Israel" },
        { d: 2, em: "⚡", l: "Acusa os líderes de resistir ao Espírito" },
        { d: 3, em: "✨", l: "Vê os céus abertos e Jesus à direita de Deus" },
        { d: 4, em: "🙏", l: "É apedrejado e ora perdoando" },
      ],
    },
    13: {
      title: "Ordene: a primeira viagem missionária", sub: "Toque nas cartas na sequência certa.", verse: 52,
      win: "🎉 A missão começa!",
      items: [
        { d: 1, em: "🕊️", l: "O Espírito separa Barnabé e Saulo" },
        { d: 2, em: "⛵", l: "Partem de Antioquia em missão" },
        { d: 3, em: "🌑", l: "Elimas, o mago, fica cego" },
        { d: 4, em: "🗣️", l: "Paulo prega em Antioquia da Pisídia" },
      ],
    },
    19: {
      title: "Ordene: Paulo em Éfeso", sub: "Toque nas cartas na sequência certa.", verse: 41,
      win: "🎉 A Palavra prevalece!",
      items: [
        { d: 1, em: "🏫", l: "Paulo ensina em Éfeso por dois anos" },
        { d: 2, em: "💫", l: "Deus faz milagres extraordinários" },
        { d: 3, em: "🔥", l: "Os livros de magia são queimados" },
        { d: 4, em: "🥈", l: "Tumulto dos ourives por causa de Diana" },
      ],
    },
    25: {
      title: "Ordene: Paulo apela a César", sub: "Toque nas cartas na sequência certa.", verse: 27,
      win: "🎉 Rumo a Roma!",
      items: [
        { d: 1, em: "🏛️", l: "Festo assume o governo" },
        { d: 2, em: "⚖️", l: "Os judeus acusam Paulo" },
        { d: 3, em: "👑", l: "Paulo apela a César" },
        { d: 4, em: "🤝", l: "Festo consulta o rei Agripa" },
      ],
    },
  },
  wordsearch: {
    2: {
      title: "Caça-palavras — o dia de Pentecostes",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["ESPIRITO", "FOGO", "LINGUAS", "PEDRO", "VENTO", "BATISMO"],
    },
    8: {
      title: "Caça-palavras — Filipe e o etíope",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["FELIPE", "SAMARIA", "ETIOPE", "CARRO", "SIMAO", "BATISMO"],
    },
    14: {
      title: "Caça-palavras — Listra e Derbe",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["LISTRA", "ICONIO", "DERBE", "COXO", "PAULO", "IDOLOS"],
    },
    20: {
      title: "Caça-palavras — a despedida em Mileto",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["EUTICO", "MILETO", "PAULO", "ANCIAOS", "JANELA", "ADEUS"],
    },
    26: {
      title: "Caça-palavras — Paulo diante de Agripa",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["AGRIPA", "FESTO", "PAULO", "CESAR", "VISAO", "CORRENTE"],
    },
  },
  crossword: {
    3: {
      title: "Palavra cruzada — o coxo curado",
      grid: ["PEDRO", "O....", "R....", "T....", "A...."],
      across: ["→ O apóstolo que curou o coxo no templo (5)"],
      down: ["↓ Junto à ___ Formosa o coxo mendigava (5)"],
    },
    9: {
      title: "Palavra cruzada — a conversão de Saulo",
      grid: ["DAMASCO", "E......", "U......", "S......"],
      across: ["→ Cidade a que Saulo ia para perseguir cristãos (7)"],
      down: ["↓ A quem Saulo, sem saber, resistia (4)"],
    },
    15: {
      title: "Palavra cruzada — o concílio de Jerusalém",
      grid: ["GRACA", "E....", "N....", "T....", "I....", "O...."],
      across: ["→ Somos salvos pela ___ do Senhor Jesus (5)"],
      down: ["↓ O que não era judeu, acolhido na fé (6)"],
    },
    21: {
      title: "Palavra cruzada — Paulo preso em Jerusalém",
      grid: ["PAULO", "R....", "E....", "S....", "O...."],
      across: ["→ O apóstolo capturado no templo (5)"],
      down: ["↓ Como Paulo ficou ao ser levado pelos soldados (5)"],
    },
    27: {
      title: "Palavra cruzada — o naufrágio",
      grid: ["NAVIO", "A....", "U....", "F....", "R....", "A....", "G....", "I....", "O...."],
      across: ["→ Embarcação que levava Paulo a Roma (5)"],
      down: ["↓ O desastre no mar durante a tempestade (9)"],
    },
  },
  complete: {
    4: {
      ref: "Atos 4:12",
      before: "E em nenhum outro há ",
      answer: "salvação",
      after: ", pois não há debaixo do céu outro nome dado entre os homens.",
      options: ["salvação", "esperança", "justiça", "paz"],
    },
    10: {
      ref: "Atos 10:34",
      before: "Reconheço que Deus não faz acepção de ",
      answer: "pessoas",
      after: ", mas em toda nação lhe é agradável quem o teme.",
      options: ["pessoas", "riquezas", "nações", "sábios"],
    },
    16: {
      ref: "Atos 16:31",
      before: "Crê no Senhor Jesus Cristo e serás ",
      answer: "salvo",
      after: ", tu e a tua casa.",
      options: ["salvo", "curado", "livre", "forte"],
    },
    22: {
      ref: "Atos 22:16",
      before: "Levanta-te, batiza-te e lava os teus ",
      answer: "pecados",
      after: ", invocando o nome do Senhor.",
      options: ["pecados", "temores", "pés", "olhos"],
    },
  },
  connect: {
    5: {
      title: "Ligue — a igreja sob prova",
      sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Ananias", b: "mentiu ao Espírito Santo" },
        { a: "Safira", b: "caiu morta como o marido" },
        { a: "Anjo", b: "abriu a prisão dos apóstolos" },
        { a: "Gamaliel", b: "aconselhou prudência ao conselho" },
      ],
    },
    11: {
      title: "Ligue — o evangelho se espalha",
      sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Antioquia", b: "ali os chamaram 'cristãos'" },
        { a: "Cornélio", b: "primeiro gentio batizado" },
        { a: "Ágabo", b: "profetizou uma grande fome" },
        { a: "Barnabé", b: "enviado para fortalecer os irmãos" },
      ],
    },
    17: {
      title: "Ligue — Paulo entre os gregos",
      sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Tessalônica", b: "onde causaram tumulto" },
        { a: "Bereia", b: "examinavam as Escrituras cada dia" },
        { a: "Atenas", b: "altar ao deus desconhecido" },
        { a: "Areópago", b: "Paulo pregou aos filósofos" },
      ],
    },
    23: {
      title: "Ligue — Paulo diante do conselho",
      sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Fariseus", b: "creem na ressurreição" },
        { a: "Saduceus", b: "negam a ressurreição" },
        { a: "Quarenta homens", b: "juraram matar Paulo" },
        { a: "Sobrinho de Paulo", b: "revelou a conspiração" },
      ],
    },
  },
  boss: {
    questions: [
      { question: "O que desceu sobre os discípulos no dia de Pentecostes?", options: ["O Espírito Santo, em línguas de fogo", "Uma nuvem escura", "Um anjo com espada", "Um vento gelado"], correct: "O Espírito Santo, em línguas de fogo" },
      { question: "Quem foi o primeiro mártir da igreja?", options: ["Estêvão", "Tiago", "Pedro", "Paulo"], correct: "Estêvão" },
      { question: "Onde Saulo encontrou Jesus e se converteu?", options: ["No caminho de Damasco", "Em Jerusalém", "Em Antioquia", "Em Roma"], correct: "No caminho de Damasco" },
      { question: "Quem foi o primeiro gentio batizado por Pedro?", options: ["Cornélio", "Lídia", "Ágabo", "Barnabé"], correct: "Cornélio" },
      { question: "Como o livro de Atos termina, com Paulo em Roma?", options: ["Preso, mas pregando livremente", "Executado na praça", "Fugindo da cidade", "Silenciado pelos guardas"], correct: "Preso, mas pregando livremente" },
    ],
    story: {
      open: "Nem correntes, nem tempestade, nem prisão hão de calar a minha Palavra. Avança!",
      turns: [
        { ask: "Pregas mesmo acorrentado, sem temer os poderosos.", hit: "A corrente não prende a Palavra! ⛓️", miss: "Ergue a voz outra vez, servo meu." },
        { ask: "À meia-noite, louvas na prisão de Filipos.", hit: "A terra treme e as portas se abrem! 🌍", miss: "Canta ainda, que eu te ouço." },
        { ask: "A tempestade quer te tragar no alto mar.", hit: "Todos chegam vivos à praia! 🌊", miss: "Firma-te, o anjo já falou." },
        { ask: "A víbora crava a presa na tua mão em Malta.", hit: "Sacode-a ao fogo, ileso! 🐍🔥", miss: "Não temas o veneno, filho." },
        { ask: "Em Roma, o império inteiro quer te silenciar.", hit: "Golpe final — o evangelho chega ao mundo! 🏛️", miss: "A minha Palavra não se algema." },
      ],
      win: "De Jerusalém aos confins da terra, o Espírito venceu toda corrente.",
      winHero: "As correntes se romperam — o evangelho corre livre! 🙌",
    },
  },
};
