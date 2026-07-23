import type { BookChallenges } from "@/lib/rpgChallengeContent";

// Lucas (24 caps). Ciclo (c-1)%6: 0=ordenar,1=caça,2=cruzada,3=completar,4=ligar,5=quiz(IA).
// Cap.24 = boss "A Grande Tempestade".
export const LUKE_CH: BookChallenges = {
  order: {
    1: {
      title: "Ordene: a anunciação", sub: "Toque nas cartas na sequência certa.", verse: 80,
      win: "🎉 A promessa se cumpre!",
      items: [
        { d: 1, em: "🕯️", l: "Gabriel anuncia João a Zacarias no templo" },
        { d: 2, em: "👼", l: "Gabriel anuncia Jesus a Maria" },
        { d: 3, em: "🤰", l: "Maria visita Isabel e canta o Magnificat" },
        { d: 4, em: "👶", l: "Nasce João Batista" },
      ],
    },
    7: {
      title: "Ordene: sinais de compaixão", sub: "Toque nas cartas na sequência certa.", verse: 50,
      win: "🎉 O Mestre revela seu poder!",
      items: [
        { d: 1, em: "⚔️", l: "Cura o servo do centurião" },
        { d: 2, em: "⚰️", l: "Ressuscita o filho da viúva de Naim" },
        { d: 3, em: "✉️", l: "João Batista envia mensageiros a Jesus" },
        { d: 4, em: "💧", l: "A mulher pecadora unge os pés de Jesus" },
      ],
    },
    13: {
      title: "Ordene: chamado e Reino", sub: "Toque nas cartas na sequência certa.", verse: 35,
      win: "🎉 Arrependei-vos e crede!",
      items: [
        { d: 1, em: "🔥", l: "Jesus chama todos ao arrependimento" },
        { d: 2, em: "🌳", l: "Conta a parábola da figueira estéril" },
        { d: 3, em: "🙆", l: "Cura a mulher encurvada no sábado" },
        { d: 4, em: "🌱", l: "Ensina o grão de mostarda e o fermento" },
      ],
    },
    19: {
      title: "Ordene: Zaqueu e a entrada", sub: "Toque nas cartas na sequência certa.", verse: 48,
      win: "🎉 Hosana ao Rei que vem!",
      items: [
        { d: 1, em: "🌳", l: "Zaqueu sobe no sicômoro para ver Jesus" },
        { d: 2, em: "🏠", l: "Jesus se hospeda com Zaqueu: veio a salvação" },
        { d: 3, em: "💰", l: "Conta a parábola das dez minas" },
        { d: 4, em: "🐴", l: "Entrada triunfal em Jerusalém" },
      ],
    },
  },
  wordsearch: {
    2: {
      title: "Caça-palavras — o nascimento em Belém",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["BELEM", "PASTORES", "ANJOS", "MARIA", "JOSE", "SALVADOR"],
    },
    8: {
      title: "Caça-palavras — o semeador e a tempestade",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["SEMEADOR", "SEMENTE", "BARCO", "JAIRO", "VENTO", "FÉ"],
    },
    14: {
      title: "Caça-palavras — a grande ceia",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["CONVITE", "CEIA", "CRUZ", "HUMILDADE", "SABADO", "FESTA"],
    },
    20: {
      title: "Caça-palavras — perguntas no templo",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["CESAR", "TRIBUTO", "MOEDA", "VINHA", "PARABOLA", "TEMPLO"],
    },
  },
  crossword: {
    3: {
      title: "Palavra cruzada — o batismo",
      grid: ["JORDAO", "E.....", "S.....", "U.....", "S....."],
      across: ["→ Rio onde Jesus foi batizado (6)"],
      down: ["↓ O Filho de Deus batizado por João (5)"],
    },
    9: {
      title: "Palavra cruzada — a transfiguração",
      grid: ["MONTE", "O....", "I....", "S....", "E....", "S...."],
      across: ["→ Lugar onde Jesus se transfigurou (5)"],
      down: ["↓ Apareceu com Elias ao lado de Jesus (6)"],
    },
    15: {
      title: "Palavra cruzada — o filho pródigo",
      grid: ["PERDIDO", "R......", "O......", "D......", "I......", "G......", "O......"],
      across: ["→ O filho estava assim, e foi achado (7)"],
      down: ["↓ O filho que desperdiçou a herança (7)"],
    },
    21: {
      title: "Palavra cruzada — a oferta e a vigília",
      grid: ["VIUVA", "I....", "G....", "I....", "A....", "I...."],
      across: ["→ A pobre que deu duas moedinhas (5)"],
      down: ["↓ 'Estai de sobreaviso' — o mandado de Jesus (6)"],
    },
  },
  complete: {
    4: {
      ref: "Lucas 4:4",
      before: "Está escrito: Nem só de",
      answer: "pão",
      after: "viverá o homem, mas de toda palavra de Deus.",
      options: ["pão", "trigo", "vinho", "mel"],
    },
    10: {
      ref: "Lucas 10:27",
      before: "Amarás o Senhor teu Deus de todo o teu coração, e ao teu",
      answer: "próximo",
      after: "como a ti mesmo.",
      options: ["próximo", "irmão", "amigo", "povo"],
    },
    16: {
      ref: "Lucas 16:13",
      before: "Não podeis servir a Deus e às",
      answer: "riquezas",
      after: ", pois amareis a um e desprezareis o outro.",
      options: ["riquezas", "nações", "trevas", "glórias"],
    },
    22: {
      ref: "Lucas 22:19",
      before: "Isto é o meu",
      answer: "corpo",
      after: "que é dado por vós; fazei isto em memória de mim.",
      options: ["corpo", "sangue", "pão", "reino"],
    },
  },
  connect: {
    5: {
      title: "Ligue — o chamado à beira-mar",
      sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Pedro", b: "pescador que deixou tudo e seguiu" },
        { a: "Pesca", b: "redes cheias que quase rompiam" },
        { a: "Leproso", b: "purificado ao toque de Jesus" },
        { a: "Levi", b: "cobrador chamado do posto de tributos" },
      ],
    },
    11: {
      title: "Ligue — o ensino sobre a oração",
      sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Pai Nosso", b: "a oração que Jesus ensinou" },
        { a: "Pedi", b: "e vos será dado" },
        { a: "Bater", b: "e abrir-se-vos-á a porta" },
        { a: "Belzebu", b: "falsa acusação dos que O ouviam" },
      ],
    },
    17: {
      title: "Ligue — os dez leprosos",
      sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Dez leprosos", b: "curados no caminho" },
        { a: "Um só", b: "voltou para agradecer" },
        { a: "Samaritano", b: "o que deu glória a Deus" },
        { a: "Fé", b: "do tamanho de um grão de mostarda" },
      ],
    },
    23: {
      title: "Ligue — a crucificação",
      sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Pilatos", b: "entregou Jesus para ser crucificado" },
        { a: "Simão Cireneu", b: "carregou a cruz atrás de Jesus" },
        { a: "Bom ladrão", b: "'hoje estarás comigo no paraíso'" },
        { a: "José de Arimateia", b: "pediu o corpo e o sepultou" },
      ],
    },
  },
  boss: {
    questions: [
      { question: "Em que cidade Jesus nasceu?", options: ["Belém", "Nazaré", "Jerusalém", "Cafarnaum"], correct: "Belém" },
      { question: "Quem apareceu aos pastores anunciando o nascimento?", options: ["Um anjo do Senhor", "Um profeta", "João Batista", "O ancião Simeão"], correct: "Um anjo do Senhor" },
      { question: "Na parábola exclusiva de Lucas, quem socorreu o homem ferido na estrada?", options: ["O bom samaritano", "O sacerdote", "O levita", "O fariseu"], correct: "O bom samaritano" },
      { question: "Qual homem de baixa estatura subiu numa árvore para ver Jesus?", options: ["Zaqueu", "Nicodemos", "Bartimeu", "Simeão"], correct: "Zaqueu" },
      { question: "No caminho de Emaús, quando os discípulos reconheceram Jesus?", options: ["Ao partir o pão", "Ao verem o túmulo", "Ao ouvirem os anjos", "Ao entrarem no templo"], correct: "Ao partir o pão" },
    ],
    story: {
      open: "Levanta-te contra a Grande Tempestade; a minha palavra acalma todo furacão.",
      turns: [
        { ask: "As ondas se erguem contra a tua barca no lago.", hit: "'Aquieta-te!' — e o mar se cala! 🌊", miss: "Onde está a tua fé?" },
        { ask: "O deserto te tenta com pão e poder.", hit: "'Nem só de pão viverá o homem!' ✨", miss: "Resiste à tentação, filho." },
        { ask: "A noite cai sobre a estrada de Jericó.", hit: "O bom samaritano vence a indiferença! 💛", miss: "Não passes ao largo do caído." },
        { ask: "As trevas cobrem o Calvário ao meio-dia.", hit: "'Pai, nas tuas mãos entrego o meu espírito!' 🌑", miss: "A tempestade ainda ruge." },
        { ask: "O túmulo tenta reter a Vida.", hit: "Golpe final — Ele ressuscitou! ✝️", miss: "A morte não é o fim." },
      ],
      win: "Ao partir do pão em Emaús os olhos se abriram: o Senhor vive, e diante deles subiu aos céus.",
      winHero: "A Grande Tempestade se calou diante do Ressuscitado! 🙌",
    },
  },
};
