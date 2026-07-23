import type { BookChallenges } from "@/lib/rpgChallengeContent";

// Jó (42 caps). Ciclo (c-1)%6: 0=ordenar,1=caça,2=cruzada,3=completar,4=ligar,5=quiz(IA).
// Último cap. 42 → boss ("O Acusador"). Slots-5 (6,12,18,24,30,36,42) caem no quiz.
export const JOB_CH: BookChallenges = {
  order: {
    1: {
      title: "Ordene: Jó perde tudo", sub: "Toque nas cartas na sequência certa.", verse: 21,
      win: "🎉 A fé que adora mesmo na perda!",
      items: [
        { d: 1, em: "🐑", l: "Jó, íntegro e rico, teme a Deus" },
        { d: 2, em: "😈", l: "O Acusador o desafia diante do Senhor" },
        { d: 3, em: "💥", l: "Num só dia perde bens e filhos" },
        { d: 4, em: "🙏", l: "'O Senhor deu, o Senhor tomou'" },
      ],
    },
    7: {
      title: "Ordene: o lamento de Jó", sub: "Toque nas cartas na sequência certa.", verse: 17,
      win: "🎉 O clamor sincero em ordem!",
      items: [
        { d: 1, em: "⏳", l: "A vida é dura como a de um servo" },
        { d: 2, em: "🌬️", l: "'Meus dias voam como a lançadeira'" },
        { d: 3, em: "😢", l: "Jó clama na amargura da alma" },
        { d: 4, em: "🙋", l: "'Que é o homem, para dele te ocupares?'" },
      ],
    },
    13: {
      title: "Ordene: Jó quer arrazoar com Deus", sub: "Toque nas cartas na sequência certa.", verse: 15,
      win: "🎉 A confiança que não desiste!",
      items: [
        { d: 1, em: "👀", l: "'Meus olhos já viram tudo isso'" },
        { d: 2, em: "🩺", l: "'Vós sois médicos que não valem nada'" },
        { d: 3, em: "⚖️", l: "Deseja defender-se diante do Todo-Poderoso" },
        { d: 4, em: "🤲", l: "'Ainda que ele me mate, nele esperarei'" },
      ],
    },
    19: {
      title: "Ordene: o Redentor vive", sub: "Toque nas cartas na sequência certa.", verse: 25,
      win: "🎉 A esperança no Redentor!",
      items: [
        { d: 1, em: "💔", l: "'Até quando afligireis a minha alma?'" },
        { d: 2, em: "🚪", l: "Família e amigos o abandonam" },
        { d: 3, em: "✍️", l: "'Quem me dera que se escrevessem minhas palavras!'" },
        { d: 4, em: "✝️", l: "'Eu sei que o meu Redentor vive!'" },
      ],
    },
    25: {
      title: "Ordene: Bildade e a pequenez do homem", sub: "Toque nas cartas na sequência certa.", verse: 6,
      win: "🎉 O temor diante do Eterno!",
      items: [
        { d: 1, em: "👑", l: "Deus tem domínio e impõe temor" },
        { d: 2, em: "🌙", l: "Nem a lua brilha pura diante dele" },
        { d: 3, em: "❓", l: "'Como seria justo o homem para com Deus?'" },
        { d: 4, em: "🐛", l: "O homem é como um verme diante dele" },
      ],
    },
    31: {
      title: "Ordene: Jó jura sua integridade", sub: "Toque nas cartas na sequência certa.", verse: 6,
      win: "🎉 A vida reta posta à prova!",
      items: [
        { d: 1, em: "👁️", l: "'Fiz um pacto com os meus olhos'" },
        { d: 2, em: "🍞", l: "Repartiu o pão com o órfão e a viúva" },
        { d: 3, em: "🤝", l: "Nunca desprezou o direito do servo" },
        { d: 4, em: "⚖️", l: "'Pese-me Deus em balança justa'" },
      ],
    },
    37: {
      title: "Ordene: Eliú exalta o poder de Deus", sub: "Toque nas cartas na sequência certa.", verse: 14,
      win: "🎉 As maravilhas de Deus em ordem!",
      items: [
        { d: 1, em: "⛈️", l: "O trovão é a voz majestosa de Deus" },
        { d: 2, em: "❄️", l: "Ele diz à neve: 'Cai sobre a terra'" },
        { d: 3, em: "🌥️", l: "Dirige as nuvens conforme sua vontade" },
        { d: 4, em: "🛑", l: "'Para, e considera as maravilhas de Deus'" },
      ],
    },
  },
  wordsearch: {
    2: {
      title: "Caça-palavras — Jó ferido e provado",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["SATANÁS", "ÚLCERAS", "CINZA", "CACO", "ESPOSA", "AMIGOS"],
    },
    8: {
      title: "Caça-palavras — Bildade fala",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["BILDADE", "JUSTIÇA", "PAPIRO", "TEIA", "RAÍZES", "ESPERANÇA"],
    },
    14: {
      title: "Caça-palavras — a fragilidade do homem",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["FLOR", "SOMBRA", "ÁRVORE", "RENOVO", "FRÁGIL", "MORTE"],
    },
    20: {
      title: "Caça-palavras — Zofar e o ímpio",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["ZOFAR", "ÍMPIO", "TRIUNFO", "VENENO", "RIQUEZA", "BREVE"],
    },
    26: {
      title: "Caça-palavras — a majestade de Deus",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["TERRA", "NADA", "NUVENS", "COLUNAS", "ABISMO", "PODER"],
    },
    32: {
      title: "Caça-palavras — Eliú entra em cena",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["ELIÚ", "BUZITA", "JOVEM", "ESPÍRITO", "SABEDORIA", "IRA"],
    },
    38: {
      title: "Caça-palavras — Deus fala do redemoinho",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["ALICERCES", "ESTRELAS", "AURORA", "MAR", "NEVE", "ÓRION"],
    },
  },
  crossword: {
    3: {
      title: "Palavra cruzada — Jó amaldiçoa o dia",
      grid: ["TREVAS", "U.....", "M.....", "U.....", "L.....", "O....."],
      across: ["→ Escuridão que Jó desejou sobre o dia do seu nascimento (6)"],
      down: ["↓ A sepultura, o descanso que Jó ansiava (6)"],
    },
    9: {
      title: "Palavra cruzada — quem é justo diante de Deus",
      grid: ["JUSTO", "U....", "I....", "Z...."],
      across: ["→ Ninguém é assim diante de Deus, diz Jó (5)"],
      down: ["↓ Jó anseia por um que decida entre ele e Deus (4)"],
    },
    15: {
      title: "Palavra cruzada — Elifaz repreende Jó",
      grid: ["VENTO", "E....", "L....", "H....", "O....", "S...."],
      across: ["→ Elifaz diz que Jó enche o ventre disto (5)"],
      down: ["↓ Os de cabelos grisalhos que apoiam Elifaz (6)"],
    },
    21: {
      title: "Palavra cruzada — a prosperidade dos ímpios",
      grid: ["PODER", "R....", "O....", "L....", "E...."],
      across: ["→ Os ímpios envelhecem e crescem nisto, estranha Jó (5)"],
      down: ["↓ A descendência dos ímpios se firma diante deles (5)"],
    },
    27: {
      title: "Palavra cruzada — Jó guarda sua integridade",
      grid: ["RETO", "U...", "I...", "N...", "A..."],
      across: ["→ Jó jura manter-se assim e não negar sua integridade (4)"],
      down: ["↓ Fim que aguarda a herança do ímpio (5)"],
    },
    33: {
      title: "Palavra cruzada — Eliú fala a Jó",
      grid: ["SONHO", "U....", "P....", "L....", "I....", "C....", "A...."],
      across: ["→ Deus fala ao homem nisto e em visões da noite (5)"],
      down: ["↓ Quando o homem a faz, Deus lhe é favorável (7)"],
    },
    39: {
      title: "Palavra cruzada — Deus e os animais",
      grid: ["CAVALO", "A.....", "B.....", "R.....", "A....."],
      across: ["→ Deus deu força e coragem a este animal de guerra (6)"],
      down: ["↓ Deus sabe quando a montês dá cria (5)"],
    },
  },
  complete: {
    4: {
      ref: "Jó 4:7",
      before: "Lembra-te agora: qual foi o inocente que jamais",
      answer: "pereceu",
      after: "? E onde foram os retos destruídos?",
      options: ["pereceu", "venceu", "pecou", "fugiu"],
    },
    10: {
      ref: "Jó 10:8",
      before: "As tuas mãos me formaram e me",
      answer: "fizeram",
      after: "; contudo, agora me destróis por completo.",
      options: ["fizeram", "deixaram", "feriram", "salvaram"],
    },
    16: {
      ref: "Jó 16:2",
      before: "Já ouvi muitas coisas como essas; consoladores",
      answer: "molestos",
      after: "sois todos vós.",
      options: ["molestos", "fiéis", "sábios", "amados"],
    },
    22: {
      ref: "Jó 22:21",
      before: "Apega-te, pois, a Deus, e tem",
      answer: "paz",
      after: ", e assim te sobrevirá o bem.",
      options: ["paz", "guerra", "medo", "riqueza"],
    },
    28: {
      ref: "Jó 28:28",
      before: "Eis que o temor do Senhor é a",
      answer: "sabedoria",
      after: ", e o apartar-se do mal é o entendimento.",
      options: ["sabedoria", "riqueza", "glória", "força"],
    },
    34: {
      ref: "Jó 34:12",
      before: "Longe de Deus o praticar maldade, e do Todo-Poderoso o perverter o",
      answer: "juízo",
      after: ".",
      options: ["juízo", "povo", "caminho", "trono"],
    },
    40: {
      ref: "Jó 40:15",
      before: "Contempla agora o",
      answer: "beemote",
      after: ", que eu criei contigo, que come a erva como o boi.",
      options: ["beemote", "leviatã", "leão", "dragão"],
    },
  },
  connect: {
    5: {
      title: "Ligue — Elifaz continua", sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Faíscas", b: "o homem nasce para o trabalho" },
        { a: "Correção", b: "bem-aventurado quem Deus disciplina" },
        { a: "Deus fere", b: "e as suas mãos curam" },
        { a: "Feixe maduro", b: "a velhice como colheita" },
      ],
    },
    11: {
      title: "Ligue — Zofar responde", sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Zofar", b: "o terceiro amigo a falar" },
        { a: "Mistérios de Deus", b: "mais altos que os céus" },
        { a: "Coração firme", b: "esquecerás a tua miséria" },
        { a: "Segurança", b: "deitarás sem temer ninguém" },
      ],
    },
    17: {
      title: "Ligue — o espírito quebrantado", sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Espírito quebrado", b: "os dias de Jó se apagam" },
        { a: "A sepultura", b: "'é a minha casa', diz Jó" },
        { a: "Zombadores", b: "cercam a Jó por toda parte" },
        { a: "Esperança", b: "desce com ele até o pó" },
      ],
    },
    23: {
      title: "Ligue — a busca por Deus", sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "'Onde o acharei?'", b: "Jó anseia encontrar a Deus" },
        { a: "Provado como ouro", b: "Jó sairá refinado" },
        { a: "O caminho de Jó", b: "Deus o conhece bem" },
        { a: "A Palavra", b: "guardada mais que o pão diário" },
      ],
    },
    29: {
      title: "Ligue — os dias de outrora", sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "A lâmpada de Deus", b: "brilhava sobre sua cabeça" },
        { a: "Olhos ao cego", b: "Jó socorria o necessitado" },
        { a: "Pai dos pobres", b: "defendia a causa do órfão" },
        { a: "Assento à porta", b: "Jó era honrado como chefe" },
      ],
    },
    35: {
      title: "Ligue — Eliú prossegue", sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "O teu pecado", b: "nada tira do Altíssimo" },
        { a: "A tua justiça", b: "só ao homem aproveita" },
        { a: "Clamor vazio", b: "Deus não o atende" },
        { a: "Eliú", b: "o jovem que repreende Jó" },
      ],
    },
    41: {
      title: "Ligue — o Leviatã", sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Leviatã", b: "não se prende com anzol" },
        { a: "Escamas", b: "são como escudos firmes" },
        { a: "Seu bafo", b: "acende brasas de fogo" },
        { a: "Rei dos soberbos", b: "não há igual sobre a terra" },
      ],
    },
  },
  boss: {
    questions: [
      { question: "Como a Bíblia descreve Jó no início do livro?", options: ["Íntegro, reto e temente a Deus", "Um rei poderoso", "Um sacerdote de Israel", "Um profeta errante"], correct: "Íntegro, reto e temente a Deus" },
      { question: "O que Jó disse ao perder bens e filhos?", options: ["'O Senhor deu, o Senhor tomou; bendito seja o nome do Senhor'", "'Deus me abandonou de vez'", "'Vingarei toda a minha perda'", "'Nunca mais crerei'"], correct: "'O Senhor deu, o Senhor tomou; bendito seja o nome do Senhor'" },
      { question: "Quantos amigos vieram consolar Jó e depois debateram com ele?", options: ["Três", "Dois", "Cinco", "Sete"], correct: "Três" },
      { question: "Quem foi o jovem que falou depois dos três amigos?", options: ["Eliú", "Elifaz", "Bildade", "Zofar"], correct: "Eliú" },
      { question: "De onde o Senhor respondeu a Jó?", options: ["Do meio de um redemoinho", "De uma sarça ardente", "Do alto de um monte", "De uma nuvem no templo"], correct: "Do meio de um redemoinho" },
    ],
    story: {
      open: "Acusador, apontaste o dedo contra o meu servo Jó. Vem, e vê a fé que não se compra.",
      turns: [
        { ask: "Perdeu bens e filhos, e ainda assim se prostrou em adoração.", hit: "'O Senhor deu, o Senhor tomou'! 💥", miss: "Ergue-te, Jó — eu te sustento." },
        { ask: "Feriste-lhe o corpo de úlceras, e ele não pecou com os lábios.", hit: "A integridade resiste! 🛡️", miss: "Não desfaleças; permanece firme." },
        { ask: "Sua esposa disse 'amaldiçoa a Deus', mas ele guardou a fé.", hit: "'Receberíamos o bem e não o mal?' 🙏", miss: "Segura-te em mim, filho." },
        { ask: "Os amigos o acusaram, mas ele confiou no seu Redentor.", hit: "'Eu sei que o meu Redentor vive!' ✝️", miss: "Levanta a cabeça outra vez." },
        { ask: "Do redemoinho falei, e ele se humilhou no pó.", hit: "Golpe final — o Acusador é vencido! 👑", miss: "A minha voz te basta." },
      ],
      win: "O Acusador foi calado: a fé de Jó não estava à venda. E o Senhor lhe restaurou tudo em dobro.",
      winHero: "Da cinza à restauração — Deus é fiel! 🙌",
    },
  },
};
