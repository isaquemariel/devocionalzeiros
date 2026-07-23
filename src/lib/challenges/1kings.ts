import type { BookChallenges } from "@/lib/rpgChallengeContent";

// 1 Reis (22 caps). Ciclo (c-1)%6: 0=ordenar, 1=caça, 2=cruzada, 3=completar, 4=ligar, 5=quiz(IA).
// Cap. 22 (último) = boss "Os Profetas de Baal".
export const KINGS1_CH: BookChallenges = {
  order: {
    1: {
      title: "Ordene: Salomão é feito rei", sub: "Toque nas cartas na sequência certa.", verse: 39,
      win: "🎉 O trono passa a Salomão!",
      items: [
        { d: 1, em: "🤴", l: "Adonias se autoproclama rei" },
        { d: 2, em: "🗣️", l: "Natã e Bate-Seba avisam Davi" },
        { d: 3, em: "📜", l: "Davi ordena ungir Salomão" },
        { d: 4, em: "🎺", l: "Salomão é ungido em Giom" },
      ],
    },
    7: {
      title: "Ordene: as obras de bronze e ouro", sub: "Toque nas cartas na sequência certa.", verse: 51,
      win: "🎉 A casa do Senhor ganha esplendor!",
      items: [
        { d: 1, em: "🏛️", l: "Salomão constrói o seu palácio" },
        { d: 2, em: "🏗️", l: "Hirão funde as colunas Jaquim e Boaz" },
        { d: 3, em: "🌊", l: "Faz o mar de fundição de bronze" },
        { d: 4, em: "✨", l: "Termina os utensílios de ouro" },
      ],
    },
    13: {
      title: "Ordene: o profeta e o altar de Betel", sub: "Toque nas cartas na sequência certa.", verse: 26,
      win: "🎉 A palavra do Senhor se cumpre!",
      items: [
        { d: 1, em: "📢", l: "O homem de Deus clama contra o altar" },
        { d: 2, em: "🖐️", l: "A mão de Jeroboão seca" },
        { d: 3, em: "💥", l: "O altar se fende e derrama as cinzas" },
        { d: 4, em: "🦁", l: "Um leão mata o profeta desobediente" },
      ],
    },
    19: {
      title: "Ordene: Elias no monte Horebe", sub: "Toque nas cartas na sequência certa.", verse: 12,
      win: "🎉 Deus fala na brisa suave!",
      items: [
        { d: 1, em: "🏃", l: "Elias foge de Jezabel ao deserto" },
        { d: 2, em: "🍞", l: "O anjo lhe dá pão e água" },
        { d: 3, em: "🌪️", l: "Vento, terremoto e fogo passam" },
        { d: 4, em: "🍃", l: "O Senhor fala na brisa suave" },
      ],
    },
  },
  wordsearch: {
    2: {
      title: "Caça-palavras — Salomão firma o reino",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["DAVI", "SALOMAO", "TRONO", "REINO", "JOABE", "SIMEI"],
    },
    8: {
      title: "Caça-palavras — a dedicação do templo",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["ARCA", "TEMPLO", "ALIANCA", "GLORIA", "ORACAO", "NUVEM"],
    },
    14: {
      title: "Caça-palavras — o juízo sobre Jeroboão",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["AIAS", "JEROBOAO", "PROFETA", "SILO", "ROBOAO", "SISAQUE"],
    },
    20: {
      title: "Caça-palavras — as guerras contra a Síria",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["SIRIA", "ARAMEU", "ACABE", "GUERRA", "BENADADE", "VITORIA"],
    },
  },
  crossword: {
    3: {
      title: "Palavra cruzada — O pedido de Salomão",
      grid: ["SALOMAO", "A......", "B......", "I......", "O......"],
      across: ["→ O rei que pediu sabedoria a Deus (7)"],
      down: ["↓ O que Salomão se tornou ao julgar com justiça (5)"],
    },
    9: {
      title: "Palavra cruzada — A aliança confirmada",
      grid: ["ALIANCA", "L......", "T......", "A......", "R......"],
      across: ["→ O pacto que Deus confirma com Salomão (7)"],
      down: ["↓ Lugar onde se ofereciam os sacrifícios (5)"],
    },
    15: {
      title: "Palavra cruzada — O coração de Asa",
      grid: ["CORACAO", "U......", "L......", "T......", "O......"],
      across: ["→ Asa o teve perfeito para com o Senhor (7)"],
      down: ["↓ A adoração dirigida a Deus ou a falsos deuses (5)"],
    },
    21: {
      title: "Palavra cruzada — A vinha de Nabote",
      grid: ["VINHA", "I....", "N....", "H....", "O...."],
      across: ["→ A propriedade de Nabote cobiçada por Acabe (5)"],
      down: ["↓ O fruto da videira, símbolo de alegria (5)"],
    },
  },
  complete: {
    4: {
      ref: "1 Reis 4:29",
      before: "E deu Deus a Salomão",
      answer: "sabedoria",
      after: "e muita inteligência, e largueza de coração.",
      options: ["sabedoria", "riqueza", "força", "glória"],
    },
    10: {
      ref: "1 Reis 10:1",
      before: "E ouvindo a rainha de",
      answer: "Sabá",
      after: "a fama de Salomão, veio prová-lo com enigmas.",
      options: ["Sabá", "Tiro", "Egito", "Ofir"],
    },
    16: {
      ref: "1 Reis 16:31",
      before: "E tomou por mulher a",
      answer: "Jezabel",
      after: ", filha de Etbaal, rei dos sidônios.",
      options: ["Jezabel", "Mical", "Atalia", "Ester"],
    },
  },
  connect: {
    5: {
      title: "Ligue — Os preparativos do templo",
      sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Hirão", b: "rei de Tiro, amigo de Davi" },
        { a: "Cedro", b: "madeira trazida do Líbano" },
        { a: "Templo", b: "casa ao nome do Senhor" },
        { a: "Adonirão", b: "chefe dos homens da leva" },
      ],
    },
    11: {
      title: "Ligue — A queda de Salomão",
      sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Mulheres estrangeiras", b: "desviaram o coração de Salomão" },
        { a: "Astarote", b: "deusa dos sidônios cultuada" },
        { a: "Jeroboão", b: "recebeu de Aías dez pedaços" },
        { a: "Hadade", b: "adversário edomita levantado" },
      ],
    },
    17: {
      title: "Ligue — Elias e a seca",
      sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Corvos", b: "traziam pão e carne a Elias" },
        { a: "Querite", b: "ribeiro onde Elias se escondeu" },
        { a: "Viúva de Sarepta", b: "farinha e azeite não faltaram" },
        { a: "Filho da viúva", b: "Elias o ressuscitou" },
      ],
    },
  },
  boss: {
    questions: [
      { question: "O que Salomão pediu a Deus em sonho, em Gibeão?", options: ["Sabedoria para governar", "Muitas riquezas", "Vida longa", "Vitória sobre os inimigos"], correct: "Sabedoria para governar" },
      { question: "Quem visitou Salomão atraída por sua fama e sabedoria?", options: ["A rainha de Sabá", "A rainha Ester", "Dalila", "Jezabel"], correct: "A rainha de Sabá" },
      { question: "Após Salomão, como ficou o reino de Israel?", options: ["Dividido em Israel e Judá", "Unido como antes", "Dividido em três", "Extinto"], correct: "Dividido em Israel e Judá" },
      { question: "No monte Carmelo, o que consumiu o sacrifício de Elias?", options: ["Fogo do céu", "Um raio comum", "A lenha seca", "Nada o consumiu"], correct: "Fogo do céu" },
      { question: "Como o Senhor falou a Elias no monte Horebe?", options: ["Numa brisa suave", "No terremoto", "No fogo", "No vento forte"], correct: "Numa brisa suave" },
    ],
    story: {
      open: "Sobe ao Carmelo, meu profeta; hoje o povo saberá quem é o verdadeiro Deus.",
      turns: [
        { ask: "Propõe ao povo: quem responder pelo fogo, esse é Deus.", hit: "O desafio está lançado! 🔥", miss: "Ergue a voz outra vez." },
        { ask: "Deixa os profetas de Baal clamarem em vão o dia inteiro.", hit: "Baal se cala — não há resposta! 🤫", miss: "Aguarda; o silêncio deles falará." },
        { ask: "Repara o altar do Senhor com doze pedras.", hit: "O altar está de pé! 🪨", miss: "Refaz o que foi derrubado." },
        { ask: "Encharca o sacrifício com água, três vezes.", hit: "Nada esconderá o milagre! 💧", miss: "Não hesites diante do povo." },
        { ask: "Ora, e que desça o fogo do céu.", hit: "Cai o fogo — o Senhor é Deus! ⚡", miss: "Clama com fé; Ele responde." },
      ],
      win: "O fogo consumiu tudo, e o povo caiu por terra clamando: 'O Senhor é Deus!' Baal foi derrotado e a chuva voltou à terra.",
      winHero: "O Senhor é o Deus verdadeiro! 🙌",
    },
  },
};
