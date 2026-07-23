import type { BookChallenges } from "@/lib/rpgChallengeContent";

// Salmos — parte C (capítulos 101 a 150 do livro de 150 caps).
// Ciclo por capítulo c: (c-1)%6 → 0 ordenar, 1 caça-palavras, 2 cruzada,
// 3 completar, 4 ligar, 5 quiz(IA, sem conteúdo). Cap. 150 é o ÚLTIMO → boss.
export const PSALMS_C: BookChallenges = {
  order: {
    103: {
      title: "Ordene: bendize, ó minha alma", sub: "Toque nas cartas na sequência certa.", verse: 4,
      win: "🎉 A alma que não esquece os benefícios!",
      items: [
        { d: 1, em: "🙌", l: "'Bendize, ó minha alma, ao Senhor'" },
        { d: 2, em: "🕊️", l: "Ele perdoa todas as tuas iniquidades" },
        { d: 3, em: "💚", l: "Sara todas as tuas enfermidades" },
        { d: 4, em: "👑", l: "Coroa-te de benignidade e misericórdia" },
      ],
    },
    109: {
      title: "Ordene: a causa do necessitado", sub: "Toque nas cartas na sequência certa.", verse: 31,
      win: "🎉 A defesa é entregue nas mãos de Deus!",
      items: [
        { d: 1, em: "🗣️", l: "Bocas mentirosas se abrem contra Davi" },
        { d: 2, em: "💢", l: "Cercam-no com palavras de ódio sem causa" },
        { d: 3, em: "🙏", l: "Davi entrega a causa ao Deus do seu louvor" },
        { d: 4, em: "🛡️", l: "O Senhor põe-se à direita do necessitado" },
      ],
    },
    115: {
      title: "Ordene: não a nós, mas ao teu nome", sub: "Toque nas cartas na sequência certa.", verse: 1,
      win: "🎉 Só o Deus vivo merece a glória!",
      items: [
        { d: 1, em: "🙌", l: "'Não a nós, Senhor, mas ao teu nome dá glória'" },
        { d: 2, em: "🪙", l: "Os ídolos das nações são prata e ouro" },
        { d: 3, em: "🗿", l: "Têm boca, mas não falam; olhos, e não veem" },
        { d: 4, em: "🛡️", l: "Confia no Senhor: ele é amparo e escudo" },
      ],
    },
    121: {
      title: "Ordene: levanto os olhos para os montes", sub: "Toque nas cartas na sequência certa.", verse: 1,
      win: "🎉 O teu Guarda não dormita nem dorme!",
      items: [
        { d: 1, em: "⛰️", l: "'Levanto os meus olhos para os montes'" },
        { d: 2, em: "🙏", l: "O socorro vem do Senhor, que fez os céus" },
        { d: 3, em: "👁️", l: "Aquele que te guarda não dormita nem dorme" },
        { d: 4, em: "🚪", l: "O Senhor te guarda na saída e na entrada" },
      ],
    },
    127: {
      title: "Ordene: se o Senhor não edificar", sub: "Toque nas cartas na sequência certa.", verse: 1,
      win: "🎉 Sem o Senhor, todo trabalho é em vão!",
      items: [
        { d: 1, em: "🏠", l: "Se o Senhor não edificar a casa, é vão o labor" },
        { d: 2, em: "🌒", l: "Inútil madrugar em ansiedade e comer pão de dores" },
        { d: 3, em: "😴", l: "Aos seus amados o Senhor dá o sono" },
        { d: 4, em: "👶", l: "Os filhos são herança do Senhor" },
      ],
    },
    133: {
      title: "Ordene: irmãos em união", sub: "Toque nas cartas na sequência certa.", verse: 1,
      win: "🎉 Ali o Senhor ordena a bênção!",
      items: [
        { d: 1, em: "🤝", l: "Como é bom os irmãos viverem em união" },
        { d: 2, em: "🫒", l: "É como o óleo precioso sobre a cabeça" },
        { d: 3, em: "🧔", l: "Que desce pela barba de Arão" },
        { d: 4, em: "💧", l: "Como o orvalho de Hermom sobre Sião" },
      ],
    },
    139: {
      title: "Ordene: tu me sondas e me conheces", sub: "Toque nas cartas na sequência certa.", verse: 14,
      win: "🎉 De modo assombroso e maravilhoso fui feito!",
      items: [
        { d: 1, em: "🔍", l: "'Senhor, tu me sondas e me conheces'" },
        { d: 2, em: "🌌", l: "Para onde fugirei da tua presença?" },
        { d: 3, em: "🤰", l: "Tu me formaste no ventre de minha mãe" },
        { d: 4, em: "✨", l: "De modo assombroso e maravilhoso fui feito" },
      ],
    },
    145: {
      title: "Ordene: exaltar-te-ei, ó Rei", sub: "Toque nas cartas na sequência certa.", verse: 1,
      win: "🎉 Todo dia se bendiz o seu nome!",
      items: [
        { d: 1, em: "👑", l: "'Exaltar-te-ei, ó Deus meu e Rei'" },
        { d: 2, em: "🙌", l: "Cada dia te bendirei e louvarei o teu nome" },
        { d: 3, em: "💛", l: "O Senhor é benigno e cheio de compaixão" },
        { d: 4, em: "⚖️", l: "O Senhor é justo em todos os seus caminhos" },
      ],
    },
  },
  wordsearch: {
    104: {
      title: "Caça-palavras — o Senhor, Criador",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["CRIACAO", "LUZ", "CEUS", "MONTES", "MAR", "VENTO"],
    },
    110: {
      title: "Caça-palavras — Sacerdote e Rei",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["SENHOR", "DIREITA", "SACERDOTE", "CETRO", "REI", "VITORIA"],
    },
    116: {
      title: "Caça-palavras — amo o Senhor",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["AMOR", "SALVACAO", "CALICE", "MORTE", "CLAMOR", "VOTOS"],
    },
    122: {
      title: "Caça-palavras — à casa do Senhor",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["JERUSALEM", "PAZ", "CASA", "ALEGRIA", "TRONOS", "PORTAS"],
    },
    128: {
      title: "Caça-palavras — bem-aventurado o que teme",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["TEMOR", "VIDEIRA", "OLIVEIRA", "FILHOS", "BENCAO", "MESA"],
    },
    134: {
      title: "Caça-palavras — servos na noite",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["SERVOS", "NOITE", "CASA", "MAOS", "BENDIZEI", "SIAO"],
    },
    140: {
      title: "Caça-palavras — livra-me do mal",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["LIVRAI", "MALIGNO", "REFUGIO", "JUSTICA", "LINGUA", "AMPARO"],
    },
    146: {
      title: "Caça-palavras — louva, ó minha alma",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["ALELUIA", "PRINCIPES", "JUSTICA", "CATIVOS", "CEGOS", "REINA"],
    },
  },
  crossword: {
    105: {
      title: "Palavra cruzada — o pacto de Deus",
      grid: ["ALIANCA", "B......", "R......", "A......", "A......", "O......"],
      across: ["→ Pacto que Deus firmou com seu povo (7)"],
      down: ["↓ O pai da fé, com quem Deus fez a promessa (6)"],
    },
    111: {
      title: "Palavra cruzada — o princípio de tudo",
      grid: ["SABEDORIA", "E........", "N........", "H........", "O........", "R........"],
      across: ["→ Seu princípio é o temor do Senhor (9)"],
      down: ["↓ Aquele a quem se deve todo o temor (6)"],
    },
    117: {
      title: "Palavra cruzada — louvor de todos",
      grid: ["NACOES", "O.....", "M.....", "E....."],
      across: ["→ Todas elas devem louvar ao Senhor (6)"],
      down: ["↓ O que se exalta: o ___ do Senhor (4)"],
    },
    123: {
      title: "Palavra cruzada — olhos que esperam",
      grid: ["SENHOR", "E.....", "R.....", "V.....", "O....."],
      across: ["→ A ele erguemos os olhos, que habita nos céus (6)"],
      down: ["↓ Como o ___ olha para a mão de seu senhor (5)"],
    },
    129: {
      title: "Palavra cruzada — afligido, mas firme",
      grid: ["SIAO", "U...", "L...", "C...", "O..."],
      across: ["→ De lá vem o povo que não foi vencido (4)"],
      down: ["↓ Sobre as costas os aradores abriram longos ___ (5)"],
    },
    135: {
      title: "Palavra cruzada — nada como o Deus vivo",
      grid: ["IDOLOS", "S.....", "R.....", "A.....", "E.....", "L....."],
      across: ["→ Obra de mãos humanas, prata e ouro sem vida (6)"],
      down: ["↓ Povo que o Senhor escolheu para si (6)"],
    },
    141: {
      title: "Palavra cruzada — sobe como incenso",
      grid: ["ORACAO", "L.....", "H.....", "O.....", "S....."],
      across: ["→ Suba como incenso diante de ti, Senhor (6)"],
      down: ["↓ A ti, Senhor, se voltam os meus ___ (5)"],
    },
    147: {
      title: "Palavra cruzada — ele conta as estrelas",
      grid: ["ESTRELAS", "S.......", "P.......", "E.......", "R.......", "A.......", "N.......", "C.......", "A......."],
      across: ["→ Ele conta o número delas e a todas dá nome (8)"],
      down: ["↓ O Senhor se agrada dos que nele põem a ___ (9)"],
    },
  },
  complete: {
    106: {
      ref: "Salmo 106:1",
      before: "Rendei graças ao Senhor, porque ele é bom, porque a sua",
      answer: "misericórdia",
      after: "dura para sempre.",
      options: ["misericórdia", "glória", "justiça", "força"],
    },
    112: {
      ref: "Salmo 112:1",
      before: "Bem-aventurado o homem que teme ao Senhor e que muito se",
      answer: "deleita",
      after: "nos seus mandamentos.",
      options: ["deleita", "esforça", "alegra", "confia"],
    },
    118: {
      ref: "Salmo 118:22",
      before: "A pedra que os edificadores rejeitaram tornou-se a cabeça da",
      answer: "esquina",
      after: ".",
      options: ["esquina", "casa", "torre", "muralha"],
    },
    124: {
      ref: "Salmo 124:8",
      before: "O nosso socorro está no",
      answer: "nome",
      after: "do Senhor, que fez o céu e a terra.",
      options: ["nome", "poder", "trono", "braço"],
    },
    130: {
      ref: "Salmo 130:1",
      before: "Das",
      answer: "profundezas",
      after: "a ti clamo, ó Senhor.",
      options: ["profundezas", "alturas", "trevas", "águas"],
    },
    136: {
      ref: "Salmo 136:1",
      before: "Louvai ao Senhor, porque ele é bom, porque a sua",
      answer: "benignidade",
      after: "dura para sempre.",
      options: ["benignidade", "majestade", "fidelidade", "bondade"],
    },
    142: {
      ref: "Salmo 142:4",
      before: "Refúgio me faltou; não havia quem cuidasse da minha",
      answer: "alma",
      after: ".",
      options: ["alma", "vida", "casa", "honra"],
    },
    148: {
      ref: "Salmo 148:3",
      before: "Louvai-o, sol e lua; louvai-o, todas as",
      answer: "estrelas",
      after: "luzentes.",
      options: ["estrelas", "nuvens", "aves", "águas"],
    },
  },
  connect: {
    101: {
      title: "Ligue — o voto de integridade",
      sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Coração perfeito", b: "andar com integridade" },
        { a: "Nada de vil", b: "diante dos meus olhos" },
        { a: "Cantarei", b: "de misericórdia e justiça" },
        { a: "Os fiéis da terra", b: "habitarão comigo" },
      ],
    },
    107: {
      title: "Ligue — os remidos do Senhor",
      sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Errantes no deserto", b: "acharam cidade para morar" },
        { a: "Presos nas trevas", b: "cadeias despedaçadas" },
        { a: "Enfermos", b: "enviou a palavra e os sarou" },
        { a: "Homens no mar", b: "aquietou a tempestade" },
      ],
    },
    113: {
      title: "Ligue — do pó ele levanta",
      sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Do nascente ao poente", b: "louvado seja o nome" },
        { a: "O pobre do pó", b: "Deus o levanta" },
        { a: "A estéril", b: "torna-se mãe alegre" },
        { a: "Acima das nações", b: "exaltado é o Senhor" },
      ],
    },
    119: {
      title: "Ligue — lâmpada para os meus pés",
      sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Lâmpada para os pés", b: "a tua palavra" },
        { a: "Escondi no coração", b: "para não pecar" },
        { a: "Abre os meus olhos", b: "verei as maravilhas da lei" },
        { a: "Mais doce que o mel", b: "as tuas palavras" },
      ],
    },
    125: {
      title: "Ligue — firmes como o monte Sião",
      sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Quem confia no Senhor", b: "é como o monte Sião" },
        { a: "Montes ao redor", b: "assim o Senhor cerca o povo" },
        { a: "Cetro do ímpio", b: "não repousa sobre os justos" },
        { a: "Paz", b: "sobre Israel" },
      ],
    },
    131: {
      title: "Ligue — alma como criança desmamada",
      sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Coração não altivo", b: "olhos não soberbos" },
        { a: "Não me ocupo", b: "de coisas grandiosas demais" },
        { a: "Alma aquietada", b: "como criança desmamada" },
        { a: "Espera no Senhor", b: "desde agora e para sempre" },
      ],
    },
    137: {
      title: "Ligue — junto aos rios da Babilônia",
      sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Junto aos rios da Babilônia", b: "assentamo-nos e choramos" },
        { a: "As nossas harpas", b: "penduradas nos salgueiros" },
        { a: "Cântico do Senhor", b: "em terra estranha" },
        { a: "Se eu me esquecer de ti", b: "ó Jerusalém" },
      ],
    },
    143: {
      title: "Ligue — ensina-me a tua vontade",
      sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Ouve a minha oração", b: "na tua fidelidade" },
        { a: "Minha alma tem sede", b: "como terra sedenta" },
        { a: "Ensina-me", b: "a fazer a tua vontade" },
        { a: "Guia-me", b: "por terra plana" },
      ],
    },
    149: {
      title: "Ligue — cantai um cântico novo",
      sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Cântico novo", b: "cantai ao Senhor" },
        { a: "Louvai com danças", b: "ao som do tamborim" },
        { a: "O Senhor se agrada", b: "do seu povo" },
        { a: "Louvores de Deus", b: "na boca dos santos" },
      ],
    },
  },
  boss: {
    questions: [
      { question: "Como começa o Salmo 103?", options: ["'Bendize, ó minha alma, ao Senhor'", "'O Senhor é o meu pastor'", "'Feliz o homem'", "'Guarda-me, ó Deus'"], correct: "'Bendize, ó minha alma, ao Senhor'" },
      { question: "Segundo o Salmo 119, o que é lâmpada para os pés?", options: ["A tua palavra", "O sol", "O templo", "A lei dos anciãos"], correct: "A tua palavra" },
      { question: "No Salmo 121, de onde vem o socorro?", options: ["Do Senhor, que fez o céu e a terra", "Dos montes", "Dos exércitos", "Dos reis da terra"], correct: "Do Senhor, que fez o céu e a terra" },
      { question: "Onde o povo cativo pendurou as harpas, no Salmo 137?", options: ["Nos salgueiros junto aos rios da Babilônia", "Nas portas de Jerusalém", "No pátio do templo", "Nas árvores do deserto"], correct: "Nos salgueiros junto aos rios da Babilônia" },
      { question: "Como termina o Salmo 150, o último dos Salmos?", options: ["'Tudo quanto tem fôlego louve ao Senhor'", "'Amém e amém'", "'O Senhor reina'", "'Aleluia, para sempre'"], correct: "'Tudo quanto tem fôlego louve ao Senhor'" },
    ],
    story: {
      open: "Ainda que andes pelo vale da sombra da morte, não temerás mal algum, porque eu estou contigo.",
      turns: [
        { ask: "Bendize a minha alma em meio à escuridão.", hit: "A alma que bendiz vence a sombra! 🙌", miss: "Ergue a voz, filho; louva mesmo aqui." },
        { ask: "Levanta os teus olhos para os montes.", hit: "O socorro desce dos altos! ⛰️", miss: "Olha para cima; não desanimes." },
        { ask: "Acende a minha palavra como lâmpada aos teus pés.", hit: "A luz rasga as trevas! 🕯️", miss: "Segura firme a lâmpada." },
        { ask: "Ainda que estejas junto aos rios do cativeiro, canta.", hit: "O cântico quebra as correntes! 🎶", miss: "Não penduures a harpa ainda; canta." },
        { ask: "Que tudo quanto tem fôlego me louve!", hit: "Golpe final — a sombra se desfaz em aleluia! 🎺", miss: "Toma fôlego e louva outra vez." },
      ],
      win: "O vale encheu-se de louvor; a sombra fugiu diante do aleluia dos santos.",
      winHero: "Tudo quanto respira louva ao Senhor! 🙌",
    },
  },
};
