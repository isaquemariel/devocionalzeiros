import type { BookChallenges } from "@/lib/rpgChallengeContent";

// Apocalipse (22 caps). Ciclo (c-1)%6: 0=ordenar,1=caça,2=cruzada,3=completar,4=ligar,5=quiz(IA).
// Cap. 22 (último) = boss "O Dragão". Slots: order 1,7,13,19 · wordsearch 2,8,14,20 ·
// crossword 3,9,15,21 · complete 4,10,16 · connect 5,11,17 · (6,12,18 caem no quiz por IA).
export const REVELATION_CH: BookChallenges = {
  order: {
    1: {
      title: "Ordene: a visão do Filho do Homem", sub: "Toque nas cartas na sequência certa.", verse: 20,
      win: "🎉 A visão gloriosa em ordem!",
      items: [
        { d: 1, em: "🏝️", l: "João, exilado na ilha de Patmos" },
        { d: 2, em: "🌀", l: "No Espírito, ouve voz como trombeta" },
        { d: 3, em: "🕎", l: "Vê sete candeeiros de ouro" },
        { d: 4, em: "👤", l: "O Filho do Homem aparece; João cai como morto" },
      ],
    },
    7: {
      title: "Ordene: os selados e a grande multidão", sub: "Toque nas cartas na sequência certa.", verse: 17,
      win: "🎉 A multidão diante do trono!",
      items: [
        { d: 1, em: "🌬️", l: "Quatro anjos seguram os ventos da terra" },
        { d: 2, em: "🏷️", l: "Um anjo sela os servos de Deus na testa" },
        { d: 3, em: "🔢", l: "Cento e quarenta e quatro mil são selados" },
        { d: 4, em: "🤍", l: "Grande multidão de vestes brancas louva o Cordeiro" },
      ],
    },
    13: {
      title: "Ordene: a besta e a sua marca", sub: "Toque nas cartas na sequência certa.", verse: 18,
      win: "🎉 O engano desmascarado!",
      items: [
        { d: 1, em: "🌊", l: "Sobe do mar a besta de sete cabeças" },
        { d: 2, em: "🐉", l: "O dragão lhe dá o seu poder e trono" },
        { d: 3, em: "🐑", l: "Outra besta sobe da terra, com chifres de cordeiro" },
        { d: 4, em: "🔢", l: "A marca da besta: o número 666" },
      ],
    },
    19: {
      title: "Ordene: o Cavaleiro Fiel e Verdadeiro", sub: "Toque nas cartas na sequência certa.", verse: 21,
      win: "🎉 O Rei dos reis cavalga!",
      items: [
        { d: 1, em: "🎉", l: "Aleluia! O céu louva pela queda de Babilônia" },
        { d: 2, em: "💍", l: "Chegaram as bodas do Cordeiro" },
        { d: 3, em: "🐎", l: "O céu se abre: o Cavaleiro Fiel e Verdadeiro" },
        { d: 4, em: "⚔️", l: "A besta e o falso profeta caem no lago de fogo" },
      ],
    },
  },
  wordsearch: {
    2: {
      title: "Caça-palavras — cartas às igrejas",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["EFESO", "ESMIRNA", "PERGAMO", "TIATIRA", "COROA", "MANA"],
    },
    8: {
      title: "Caça-palavras — as sete trombetas",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["TROMBETA", "ANJO", "GRANIZO", "ABSINTO", "ESTRELA", "INCENSO"],
    },
    14: {
      title: "Caça-palavras — o Cordeiro e a colheita",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["CORDEIRO", "SIAO", "COLHEITA", "FOICE", "VINDIMA", "EVANGELHO"],
    },
    20: {
      title: "Caça-palavras — o juízo final",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["DRAGAO", "ABISMO", "LIVROS", "TRONO", "JUIZO", "FOGO"],
    },
  },
  crossword: {
    3: {
      title: "Palavra cruzada — a igreja morna",
      grid: ["LAODICEIA", "I........", "V........", "R........", "O........"],
      across: ["→ A igreja nem fria nem quente, que Deus repreende (9)"],
      down: ["↓ O rolo da vida, onde estão escritos os nomes (5)"],
    },
    9: {
      title: "Palavra cruzada — o poço do abismo",
      grid: ["ABISMO", "P.....", "O.....", "L.....", "I.....", "O.....", "M....."],
      across: ["→ Poço de onde sobe fumaça e gafanhotos (6)"],
      down: ["↓ O anjo do abismo, o Destruidor (7)"],
    },
    15: {
      title: "Palavra cruzada — os vasos da ira",
      grid: ["TACAS", "E....", "M....", "P....", "L....", "O...."],
      across: ["→ Os sete vasos de ouro cheios da ira de Deus (5)"],
      down: ["↓ Encheu-se de fumaça pela glória de Deus (6)"],
    },
    21: {
      title: "Palavra cruzada — a cidade santa",
      grid: ["JERUSALEM", "A........", "S........", "P........", "E........"],
      across: ["→ A cidade santa e nova que desce do céu (9)"],
      down: ["↓ Pedra preciosa do muro da cidade (5)"],
    },
  },
  complete: {
    4: {
      ref: "Apocalipse 4:8",
      before: "Santo, Santo, Santo é o Senhor Deus, o",
      answer: "Todo-Poderoso",
      after: ", que era, e que é, e que há de vir.",
      options: ["Todo-Poderoso", "Altíssimo", "Eterno", "Criador"],
    },
    10: {
      ref: "Apocalipse 10:10",
      before: "Comi o livrinho, e na minha boca era doce como o",
      answer: "mel",
      after: ", mas depois amargou-me o ventre.",
      options: ["mel", "fel", "pão", "vinho"],
    },
    16: {
      ref: "Apocalipse 16:1",
      before: "Ide, e derramai sobre a terra as sete taças da",
      answer: "ira",
      after: "de Deus.",
      options: ["ira", "graça", "luz", "paz"],
    },
  },
  connect: {
    5: {
      title: "Ligue — o trono e o Cordeiro",
      sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "O livro", b: "selado com sete selos" },
        { a: "O Cordeiro", b: "em pé, como que imolado" },
        { a: "Leão de Judá", b: "digno de abrir o livro" },
        { a: "Os anciãos", b: "vinte e quatro, com harpas" },
      ],
    },
    11: {
      title: "Ligue — as duas testemunhas",
      sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Duas testemunhas", b: "profetizam por 1260 dias" },
        { a: "Duas oliveiras", b: "figura das testemunhas" },
        { a: "A besta do abismo", b: "as mata na grande cidade" },
        { a: "Sétima trombeta", b: "o reino passa a ser do Senhor" },
      ],
    },
    17: {
      title: "Ligue — a grande Babilônia",
      sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "A meretriz", b: "assentada sobre muitas águas" },
        { a: "Besta escarlate", b: "sete cabeças e dez chifres" },
        { a: "Babilônia", b: "mãe das prostituições da terra" },
        { a: "O Cordeiro", b: "os vencerá, Rei dos reis" },
      ],
    },
  },
  boss: {
    questions: [
      { question: "Em que ilha João recebeu as visões do Apocalipse?", options: ["Patmos", "Chipre", "Creta", "Malta"], correct: "Patmos" },
      { question: "Quantas igrejas receberam cartas no início do livro?", options: ["Sete", "Doze", "Três", "Dez"], correct: "Sete" },
      { question: "Qual é o número da besta?", options: ["666", "777", "144", "1000"], correct: "666" },
      { question: "Como é chamado aquele que aparece no cavalo branco?", options: ["Fiel e Verdadeiro", "O grande dragão", "O falso profeta", "O anjo do abismo"], correct: "Fiel e Verdadeiro" },
      { question: "Qual é o nome da cidade santa que desce do céu?", options: ["Nova Jerusalém", "Babilônia", "Nínive", "Sião terrena"], correct: "Nova Jerusalém" },
    ],
    story: {
      open: "Ergue-te contra o dragão, a antiga serpente; a vitória do Cordeiro já está selada.",
      turns: [
        { ask: "O dragão persegue a mulher e a sua descendência.", hit: "Miguel e seus anjos o expulsam do céu! 💥", miss: "Resiste firme na fé." },
        { ask: "A besta blasfema e faz guerra aos santos.", hit: "A perseverança dos santos vence! ✊", miss: "Guarda a tua constância." },
        { ask: "As sete taças da ira são derramadas sobre a terra.", hit: "Está consumado o juízo! 🌩️", miss: "Espera no Senhor." },
        { ask: "A grande Babilônia se ergue em soberba.", hit: "Caiu! Caiu a grande Babilônia! 🏛️", miss: "Não te apegues ao mundo." },
        { ask: "O dragão reúne os reis para a batalha final.", hit: "Golpe final — lançado no lago de fogo! 🔥", miss: "A promessa não falha." },
      ],
      win: "O dragão foi vencido, e Deus enxugou toda lágrima: eis a Nova Jerusalém e o rio da vida.",
      winHero: "O Cordeiro venceu — e nós com Ele! 🙌",
    },
  },
};
