import type { BookChallenges } from "@/lib/rpgChallengeContent";

// Mateus (28 caps). Ciclo por capítulo (c-1)%6: 0=ordenar, 1=caça-palavras,
// 2=cruzada, 3=completar, 4=ligar, 5=quiz(IA). Cap. 28 (último) = boss.
export const MATTHEW_CH: BookChallenges = {
  order: {
    1: {
      title: "Ordene: o nascimento de Jesus", sub: "Toque nas cartas na sequência certa.", verse: 23,
      win: "🎉 Nasce o Emanuel — Deus conosco!",
      items: [
        { d: 1, em: "📜", l: "A genealogia de Abraão a Cristo" },
        { d: 2, em: "💍", l: "José e Maria estão desposados" },
        { d: 3, em: "😴", l: "O anjo fala a José em sonho" },
        { d: 4, em: "👶", l: "Nasce Jesus, o Emanuel" },
      ],
    },
    7: {
      title: "Ordene: o fim do Sermão do Monte", sub: "Toque nas cartas na sequência certa.", verse: 24,
      win: "🎉 Casa firme sobre a rocha!",
      items: [
        { d: 1, em: "⚖️", l: "'Não julgueis, para não serdes julgados'" },
        { d: 2, em: "🚪", l: "'Entrai pela porta estreita'" },
        { d: 3, em: "🍇", l: "Pelos frutos se conhece a árvore" },
        { d: 4, em: "🪨", l: "O prudente edifica sobre a rocha" },
      ],
    },
    13: {
      title: "Ordene: parábolas do Reino", sub: "Toque nas cartas na sequência certa.", verse: 3,
      win: "🎉 Os mistérios do Reino revelados!",
      items: [
        { d: 1, em: "🌱", l: "O semeador e as quatro terras" },
        { d: 2, em: "🌾", l: "O joio no meio do trigo" },
        { d: 3, em: "🌳", l: "O grão de mostarda cresce" },
        { d: 4, em: "💎", l: "A pérola de grande valor" },
      ],
    },
    19: {
      title: "Ordene: no caminho para Jerusalém", sub: "Toque nas cartas na sequência certa.", verse: 24,
      win: "🎉 Para Deus tudo é possível!",
      items: [
        { d: 1, em: "💍", l: "O ensino sobre o casamento" },
        { d: 2, em: "🧒", l: "'Deixai vir a mim os pequeninos'" },
        { d: 3, em: "💰", l: "O jovem rico se afasta triste" },
        { d: 4, em: "🐫", l: "'Mais fácil o camelo pela agulha'" },
      ],
    },
    25: {
      title: "Ordene: as parábolas do fim", sub: "Toque nas cartas na sequência certa.", verse: 13,
      win: "🎉 Vigiai, pois não sabeis o dia!",
      items: [
        { d: 1, em: "🪔", l: "As dez virgens esperam o noivo" },
        { d: 2, em: "💰", l: "Os talentos são distribuídos" },
        { d: 3, em: "📊", l: "Os servos prestam contas" },
        { d: 4, em: "🐑", l: "O Rei separa ovelhas dos cabritos" },
      ],
    },
  },
  wordsearch: {
    2: {
      title: "Caça-palavras — Os magos e a estrela",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["MAGOS", "ESTRELA", "HERODES", "OURO", "INCENSO", "MIRRA"],
    },
    8: {
      title: "Caça-palavras — Milagres de Jesus",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["LEPROSO", "CENTURIAO", "BARCO", "VENTO", "MAR", "FÉ"],
    },
    14: {
      title: "Caça-palavras — Os pães e os peixes",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["PAES", "PEIXES", "CESTOS", "PEDRO", "AGUA", "FÉ"],
    },
    20: {
      title: "Caça-palavras — Os obreiros da vinha",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["VINHA", "DENARIO", "OBREIROS", "HORA", "SENHOR", "JUSTIÇA"],
    },
    26: {
      title: "Caça-palavras — A última ceia",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["CEIA", "PAO", "VINHO", "JUDAS", "GETSEMANI", "PEDRO"],
    },
  },
  crossword: {
    3: {
      title: "Palavra cruzada — O batismo de Jesus",
      grid: ["JORDAO", "O.....", "A.....", "O....."],
      across: ["→ Rio onde Jesus foi batizado (6)"],
      down: ["↓ O batista que preparava o caminho (4)"],
    },
    9: {
      title: "Palavra cruzada — O chamado de Mateus",
      grid: ["MATEUS", "E.....", "S.....", "T.....", "R.....", "E....."],
      across: ["→ O cobrador de impostos que Jesus chamou (6)"],
      down: ["↓ Como chamavam a Jesus, o... (6)"],
    },
    15: {
      title: "Palavra cruzada — A grande fé",
      grid: ["CANANEIA", "E.......", "S.......", "T.......", "O.......", "S......."],
      across: ["→ A mulher de grande fé que buscou Jesus (8)"],
      down: ["↓ Recipientes com as sobras dos pães (6)"],
    },
    21: {
      title: "Palavra cruzada — A entrada triunfal",
      grid: ["JERUSALEM", "U........", "M........", "E........", "N........", "T........", "O........"],
      across: ["→ Cidade onde Jesus entrou triunfante (9)"],
      down: ["↓ Animal humilde em que Jesus montou (7)"],
    },
    27: {
      title: "Palavra cruzada — A crucificação",
      grid: ["CRUZ", "R...", "I...", "S...", "T...", "O..."],
      across: ["→ Onde Jesus foi crucificado (4)"],
      down: ["↓ O Ungido que morreu por nós (6)"],
    },
  },
  complete: {
    4: {
      ref: "Mateus 4:4",
      before: "Nem só de pão viverá o ",
      answer: "homem",
      after: ", mas de toda palavra que sai da boca de Deus.",
      options: ["homem", "povo", "justo", "filho"],
    },
    10: {
      ref: "Mateus 10:16",
      before: "Eis que vos envio como ovelhas ao meio de ",
      answer: "lobos",
      after: "; sede, pois, prudentes como as serpentes.",
      options: ["lobos", "leões", "aves", "feras"],
    },
    16: {
      ref: "Mateus 16:16",
      before: "Tu és o ",
      answer: "Cristo",
      after: ", o Filho do Deus vivo.",
      options: ["Cristo", "profeta", "mestre", "rei"],
    },
    22: {
      ref: "Mateus 22:37",
      before: "Amarás o Senhor teu Deus de todo o teu ",
      answer: "coração",
      after: ", de toda a tua alma e de todo o teu entendimento.",
      options: ["coração", "poder", "tesouro", "caminho"],
    },
  },
  connect: {
    5: {
      title: "Ligue — As Bem-aventuranças", sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Pobres de espírito", b: "deles é o reino" },
        { a: "Os que choram", b: "serão consolados" },
        { a: "Os mansos", b: "herdarão a terra" },
        { a: "Os pacificadores", b: "filhos de Deus" },
      ],
    },
    11: {
      title: "Ligue — João e o descanso", sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "João pergunta", b: "'És tu aquele?'" },
        { a: "Corazim e Betsaida", b: "cidades repreendidas" },
        { a: "'Vinde a mim'", b: "os cansados" },
        { a: "O meu jugo", b: "é suave" },
      ],
    },
    17: {
      title: "Ligue — A transfiguração", sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Rosto de Jesus", b: "brilhou como o sol" },
        { a: "Moisés e Elias", b: "apareceram no monte" },
        { a: "Voz da nuvem", b: "'Este é meu Filho'" },
        { a: "A moeda", b: "na boca do peixe" },
      ],
    },
    23: {
      title: "Ligue — Ais aos fariseus", sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Escribas e fariseus", b: "hipócritas" },
        { a: "Copo limpo por fora", b: "sujo por dentro" },
        { a: "Sepulcros caiados", b: "belos por fora" },
        { a: "Jerusalém", b: "'quantas vezes quis...'" },
      ],
    },
  },
  boss: {
    questions: [
      { question: "Quem visitou o menino Jesus guiado por uma estrela?", options: ["Os magos do Oriente", "Os pastores", "Os sacerdotes", "Os soldados romanos"], correct: "Os magos do Oriente" },
      { question: "Onde Jesus foi tentado pelo diabo?", options: ["No deserto", "No templo", "No monte", "No jardim"], correct: "No deserto" },
      { question: "Como é chamado o grande sermão de Jesus em Mateus 5-7?", options: ["O Sermão do Monte", "O Sermão da Planície", "As Sete Palavras", "O Discurso da Ceia"], correct: "O Sermão do Monte" },
      { question: "O que Pedro confessou sobre Jesus em Cesareia de Filipe?", options: ["'Tu és o Cristo'", "'Tu és Elias'", "'Tu és João'", "'Tu és um profeta'"], correct: "'Tu és o Cristo'" },
      { question: "Qual ordem Jesus deu ao ressuscitar (a Grande Comissão)?", options: ["'Fazei discípulos de todas as nações'", "'Ficai em Jerusalém'", "'Guardai segredo'", "'Voltai para casa'"], correct: "'Fazei discípulos de todas as nações'" },
    ],
    story: {
      open: "Quarenta dias em jejum no deserto... agora o Tentador se aproxima. Responde com a Palavra!",
      turns: [
        { ask: "Manda estas pedras se tornarem pão.", hit: "'Nem só de pão vive o homem!' 💥", miss: "Não cedas à fome — resiste." },
        { ask: "Lança-te do templo; os anjos te sustêm.", hit: "'Não tentarás o Senhor teu Deus!' 💥", miss: "Não provoques o Altíssimo." },
        { ask: "Adora-me e todos os reinos serão teus.", hit: "'Ao Senhor adorarás e só a ele servirás!' ✨", miss: "Não te curves ao inimigo." },
        { ask: "Ninguém dará ouvidos à tua palavra.", hit: "As multidões ouvem o Sermão do Monte! 🙌", miss: "Sê firme — a semente frutifica." },
        { ask: "A cruz te calará para sempre.", hit: "Golpe final — a tumba está vazia! 👑", miss: "A promessa da ressurreição não falha." },
      ],
      win: "O Tentador fugiu, e anjos vieram servir ao Filho. A vitória da Palavra ecoou do deserto até a ressurreição e a Grande Comissão.",
      winHero: "Está escrito — e a Palavra venceu! 🙌",
    },
  },
};
