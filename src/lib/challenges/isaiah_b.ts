import type { BookChallenges } from "@/lib/rpgChallengeContent";

// Isaías — parte B (caps. 34–66). Ciclo por capítulo: (c-1)%6 →
// 0 order, 1 wordsearch, 2 crossword, 3 complete, 4 connect, 5 quiz (IA).
// Cap. 66 é o último do livro → boss ("O Rei da Babilônia"), sem jogo do ciclo.
export const ISAIAH_B: BookChallenges = {
  order: {
    // 37 → slot 0
    37: {
      title: "Ordene: o livramento de Jerusalém", sub: "Toque nas cartas na sequência certa.", verse: 38,
      win: "🎉 O Senhor guardou a cidade!",
      items: [
        { d: 1, em: "😠", l: "A Assíria zomba e desafia o Deus vivo" },
        { d: 2, em: "🙏", l: "Ezequias estende a carta diante do Senhor" },
        { d: 3, em: "📜", l: "Isaías anuncia o livramento de Jerusalém" },
        { d: 4, em: "⚔️", l: "O anjo fere 185 mil assírios numa noite" },
      ],
    },
    // 43 → slot 0
    43: {
      title: "Ordene: eu te remi", sub: "Toque nas cartas na sequência certa.", verse: 28,
      win: "🎉 O Redentor não te abandona!",
      items: [
        { d: 1, em: "💛", l: "'Não temas, eu te remi e te chamei pelo nome'" },
        { d: 2, em: "🌊", l: "'Quando passares pelas águas, estarei contigo'" },
        { d: 3, em: "🗣️", l: "'Vós sois as minhas testemunhas'" },
        { d: 4, em: "✨", l: "'Eis que faço uma coisa nova'" },
      ],
    },
    // 49 → slot 0
    49: {
      title: "Ordene: o Servo e a luz dos gentios", sub: "Toque nas cartas na sequência certa.", verse: 26,
      win: "🎉 Ele não te esquece!",
      items: [
        { d: 1, em: "⚔️", l: "'Fez a minha boca como espada aguda'" },
        { d: 2, em: "🌟", l: "'Eu te dei para luz dos gentios'" },
        { d: 3, em: "👶", l: "'Pode uma mãe esquecer o seu filho?'" },
        { d: 4, em: "✋", l: "'Eis que nas palmas das mãos te gravei'" },
      ],
    },
    // 55 → slot 0
    55: {
      title: "Ordene: vinde às águas", sub: "Toque nas cartas na sequência certa.", verse: 13,
      win: "🎉 A Palavra não volta vazia!",
      items: [
        { d: 1, em: "💧", l: "'Ó vós todos os sedentos, vinde às águas'" },
        { d: 2, em: "🔎", l: "'Buscai ao Senhor enquanto se pode achar'" },
        { d: 3, em: "☁️", l: "'Os meus pensamentos não são os vossos'" },
        { d: 4, em: "🌱", l: "'A minha palavra não voltará vazia'" },
      ],
    },
    // 61 → slot 0
    61: {
      title: "Ordene: o ano aceitável do Senhor", sub: "Toque nas cartas na sequência certa.", verse: 11,
      win: "🎉 Beleza em vez de cinzas!",
      items: [
        { d: 1, em: "🕊️", l: "'O Espírito do Senhor Deus está sobre mim'" },
        { d: 2, em: "📣", l: "'A pregar boas novas aos mansos'" },
        { d: 3, em: "❤️‍🩹", l: "'A curar os quebrantados de coração'" },
        { d: 4, em: "🌸", l: "Beleza em vez de cinzas, óleo de alegria" },
      ],
    },
  },
  wordsearch: {
    // 38 → slot 1
    38: {
      title: "Caça-palavras — a cura de Ezequias",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["EZEQUIAS", "DOENÇA", "CURA", "QUINZE", "SOMBRA", "ORAÇÃO"],
    },
    // 44 → slot 1
    44: {
      title: "Caça-palavras — os ídolos são nada",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["ÍDOLOS", "MADEIRA", "FOGO", "PRIMEIRO", "ÚLTIMO", "CIRO"],
    },
    // 50 → slot 1
    50: {
      title: "Caça-palavras — o Servo obediente",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["COSTAS", "AÇOITES", "FACE", "AJUDA", "SENHOR", "VERGONHA"],
    },
    // 56 → slot 1
    56: {
      title: "Caça-palavras — casa de oração",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["ORAÇÃO", "POVOS", "EUNUCOS", "ATALAIAS", "JUSTIÇA", "ALIANÇA"],
    },
    // 62 → slot 1
    62: {
      title: "Caça-palavras — o novo nome de Sião",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["SIÃO", "MUROS", "ATALAIAS", "BEULÁ", "HEFZIBÁ", "COROA"],
    },
  },
  crossword: {
    // 39 → slot 2
    39: {
      title: "Palavra cruzada — os enviados da Babilônia",
      grid: ["EZEQUIAS", "N.......", "V.......", "I.......", "A.......", "D.......", "O.......", "S......."],
      across: ["→ Rei de Judá que mostrou os tesouros (8)"],
      down: ["↓ Os que vieram da Babilônia a Jerusalém (8)"],
    },
    // 45 → slot 2
    45: {
      title: "Palavra cruzada — não há outro",
      grid: ["SALVACAO", "E.......", "N.......", "H.......", "O.......", "R......."],
      across: ["→ 'Olhai para mim e sereis salvos' (8)"],
      down: ["↓ 'Eu sou o ___, e não há outro' (6)"],
    },
    // 51 → slot 2
    51: {
      title: "Palavra cruzada — a rocha e os remidos",
      grid: ["REMIDOS", "O......", "C......", "H......", "A......"],
      across: ["→ Os resgatados que voltam a Sião (7)"],
      down: ["↓ 'Olhai para a ___ de onde fostes cortados' (5)"],
    },
    // 57 → slot 2
    57: {
      title: "Palavra cruzada — o coração contrito",
      grid: ["HUMILDE", "A......", "B......", "I......", "T......", "A......"],
      across: ["→ Com o contrito e o de espírito ___ Deus mora (7)"],
      down: ["↓ O que o Altíssimo faz no lugar alto e santo (6)"],
    },
    // 63 → slot 2
    63: {
      title: "Palavra cruzada — o pisador do lagar",
      grid: ["VESTES", "I.....", "N.....", "G.....", "A.....", "N.....", "C.....", "A....."],
      across: ["→ As ___ tintas de vermelho, vindas de Bozra (6)"],
      down: ["↓ 'O dia da ___ estava no meu coração' (8)"],
    },
  },
  complete: {
    // 34 → slot 3
    34: {
      ref: "Isaías 34:8", before: "Porque será o dia da ", answer: "vingança",
      after: " do Senhor, ano de retribuições pela causa de Sião.",
      options: ["vingança", "alegria", "paz", "glória"],
    },
    // 40 → slot 3
    40: {
      ref: "Isaías 40:31", before: "mas os que esperam no Senhor renovarão as suas ", answer: "forças",
      after: "; subirão com asas como águias.",
      options: ["forças", "casas", "obras", "vidas"],
    },
    // 46 → slot 3
    46: {
      ref: "Isaías 46:9", before: "eu sou ", answer: "Deus",
      after: ", e não há outro semelhante a mim.",
      options: ["Deus", "rei", "juiz", "pai"],
    },
    // 52 → slot 3
    52: {
      ref: "Isaías 52:7", before: "Quão formosos são sobre os montes os ", answer: "pés",
      after: " do que anuncia as boas novas.",
      options: ["pés", "olhos", "passos", "braços"],
    },
    // 58 → slot 3
    58: {
      ref: "Isaías 58:8", before: "Então romperá a tua ", answer: "luz",
      after: " como a alva, e a tua cura brotará depressa.",
      options: ["luz", "voz", "fé", "paz"],
    },
    // 64 → slot 3
    64: {
      ref: "Isaías 64:8", before: "nós somos o barro, e tu, o nosso ", answer: "oleiro",
      after: "; e todos nós, obra das tuas mãos.",
      options: ["oleiro", "pastor", "escudo", "guia"],
    },
  },
  connect: {
    // 35 → slot 4
    35: {
      title: "Ligue — o deserto floresce", sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Deserto", b: "floresce como a rosa" },
        { a: "Cegos", b: "os olhos se abrem" },
        { a: "Coxo", b: "saltará como cervo" },
        { a: "Caminho Santo", b: "por ele voltam os remidos" },
      ],
    },
    // 41 → slot 4
    41: {
      title: "Ligue — não temas", sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "'Não temas'", b: "'porque estou contigo'" },
        { a: "Destra da justiça", b: "eu te sustento" },
        { a: "'Bichinho de Jacó'", b: "Israel consolado" },
        { a: "Ídolos", b: "nada podem fazer" },
      ],
    },
    // 47 → slot 4
    47: {
      title: "Ligue — a queda da Babilônia", sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Virgem da Babilônia", b: "'senta-te no pó'" },
        { a: "Astrólogos", b: "não podem salvar" },
        { a: "Feitiçarias", b: "em vão os encantos" },
        { a: "'Só eu existo'", b: "soberba da cidade" },
      ],
    },
    // 53 → slot 4
    53: {
      title: "Ligue — o Servo Sofredor", sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Varão de dores", b: "desprezado dos homens" },
        { a: "Ferido", b: "pelas nossas transgressões" },
        { a: "Como ovelhas", b: "desviados nos desgarramos" },
        { a: "Cordeiro", b: "mudo ante os tosquiadores" },
      ],
    },
    // 59 → slot 4
    59: {
      title: "Ligue — a separação e o Redentor", sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Iniquidades", b: "separam de Deus" },
        { a: "Mão do Senhor", b: "não se encolheu" },
        { a: "Verdade", b: "tropeça na praça" },
        { a: "Redentor", b: "virá a Sião" },
      ],
    },
    // 65 → slot 4
    65: {
      title: "Ligue — novos céus e nova terra", sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Novos céus", b: "e nova terra" },
        { a: "Lobo e cordeiro", b: "pastarão juntos" },
        { a: "Não se ouvirá mais", b: "voz de choro" },
        { a: "Buscado", b: "pelos que não perguntavam" },
      ],
    },
  },
  boss: {
    questions: [
      { question: "Que palavra abre a mensagem de consolação no capítulo 40?", options: ["'Consolai o meu povo'", "'Ai de ti'", "'Buscai-me'", "'Levantai-vos'"], correct: "'Consolai o meu povo'" },
      { question: "Segundo Isaías 40, o que farão os que esperam no Senhor?", options: ["Renovarão as forças", "Herdarão ouro", "Nunca dormirão", "Verão anjos"], correct: "Renovarão as forças" },
      { question: "Como o capítulo 53 descreve o Servo Sofredor?", options: ["Um varão de dores, ferido por nossas transgressões", "Um rei guerreiro vitorioso", "Um profeta que desce fogo do céu", "Um anjo enviado do Senhor"], correct: "Um varão de dores, ferido por nossas transgressões" },
      { question: "O que Isaías 55 convida a fazer 'enquanto se pode achar'?", options: ["Buscar ao Senhor", "Construir muros", "Contar as estrelas", "Guardar tesouros"], correct: "Buscar ao Senhor" },
      { question: "O que Deus promete criar nos capítulos 65 e 66?", options: ["Novos céus e nova terra", "Um novo templo de ouro", "Um exército de anjos", "Um rio de fogo"], correct: "Novos céus e nova terra" },
    ],
    story: {
      open: "Eis que o Rei da Babilônia se ergue em soberba; mas eu, o Senhor, declaro o fim desde o princípio. Avança, minha testemunha!",
      turns: [
        { ask: "O tirano ameaça: 'Ninguém vos livrará da minha mão!'", hit: "Consolai o meu povo — a Palavra do Senhor permanece! 💥", miss: "Não temas; eu estou contigo." },
        { ask: "Ele zomba: 'Vossas forças se esgotarão no cativeiro.'", hit: "Os que esperam no Senhor renovam as forças! 🦅", miss: "Espera, e subirás com asas como águia." },
        { ask: "Ergue os seus ídolos de ouro e de prata.", hit: "Bel se abate, Nebo se encurva — só há um Deus! 💥", miss: "Firma-te; os ídolos nada são." },
        { ask: "Debocha da esperança no Servo ferido.", hit: "Pelas suas pisaduras fomos sarados! 🌿", miss: "Levanta-te; o Cordeiro venceu." },
        { ask: "Faz o último assalto contra Sião.", hit: "Golpe final — novos céus e nova terra! 💥", miss: "A promessa do Senhor não falha." },
      ],
      win: "A Babilônia caiu no pó, e os remidos do Senhor voltaram a Sião com júbilo eterno.",
      winHero: "A soberba tombou — buscai ao Senhor e vivei! 🙌",
    },
  },
};
