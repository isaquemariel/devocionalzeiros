import type { BookChallenges } from "@/lib/rpgChallengeContent";

// Juízes (21 caps). Ciclo (c-1)%6: 0=ordenar, 1=caça-palavras, 2=cruzada,
// 3=completar, 4=ligar, 5=quiz(IA). Cap. 21 (último) = boss.
export const JUDGES_CH: BookChallenges = {
  order: {
    1: {
      title: "Ordene: a conquista continua", sub: "Toque nas cartas na sequência certa.", verse: 15,
      win: "🎉 A conquista de Judá em ordem!",
      items: [
        { d: 1, em: "🕊️", l: "Após Josué, Israel consulta o Senhor" },
        { d: 2, em: "⚔️", l: "Judá sobe primeiro à batalha" },
        { d: 3, em: "👑", l: "Adoni-Bezeque é derrotado" },
        { d: 4, em: "💍", l: "Otniel toma a cidade e recebe Acsa" },
      ],
    },
    7: {
      title: "Ordene: os 300 de Gideão", sub: "Toque nas cartas na sequência certa.", verse: 22,
      win: "🎉 A vitória dos 300 em ordem!",
      items: [
        { d: 1, em: "🛡️", l: "Gideão reúne trinta e dois mil homens" },
        { d: 2, em: "💧", l: "Deus os prova junto à água" },
        { d: 3, em: "🔦", l: "Restam somente trezentos homens" },
        { d: 4, em: "🎺", l: "Com trombetas e cântaros, Midiã é derrotado" },
      ],
    },
    13: {
      title: "Ordene: o anúncio de Sansão", sub: "Toque nas cartas na sequência certa.", verse: 24,
      win: "🎉 O nascimento do nazireu em ordem!",
      items: [
        { d: 1, em: "🥀", l: "A mulher de Manoá era estéril" },
        { d: 2, em: "👼", l: "O anjo do Senhor lhe aparece" },
        { d: 3, em: "📜", l: "Anuncia um filho nazireu de Deus" },
        { d: 4, em: "💪", l: "Nasce Sansão e o Espírito o move" },
      ],
    },
    19: {
      title: "Ordene: a tragédia de Gibeá", sub: "Toque nas cartas na sequência certa.", verse: 29,
      win: "🎉 A sequência lamentável em ordem.",
      items: [
        { d: 1, em: "🚶", l: "Um levita vai buscar sua concubina" },
        { d: 2, em: "🏠", l: "Hospedam-se em Gibeá de Benjamim" },
        { d: 3, em: "🔥", l: "Homens perversos cercam a casa" },
        { d: 4, em: "📨", l: "O levita clama às tribos de Israel" },
      ],
    },
  },
  wordsearch: {
    2: {
      title: "Caça-palavras — O anjo em Boquim",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["ANJO", "BOQUIM", "JUÍZES", "BAAL", "ALIANÇA", "PECADO"],
    },
    8: {
      title: "Caça-palavras — Gideão vence Midiã",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["GIDEÃO", "MIDIÃ", "ÉFODE", "ESPADA", "OURO", "PAZ"],
    },
    14: {
      title: "Caça-palavras — O enigma de Sansão",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["SANSÃO", "LEÃO", "MEL", "ENIGMA", "TIMNA", "FESTA"],
    },
    20: {
      title: "Caça-palavras — A guerra contra Benjamim",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["ISRAEL", "BENJAMIM", "GIBEÁ", "GUERRA", "TRIBOS", "MIZPÁ"],
    },
  },
  crossword: {
    3: {
      title: "Palavra cruzada — Os primeiros juízes",
      grid: ["EUDE", "G...", "L...", "O...", "M..."],
      across: ["→ Juiz canhoto que matou o rei de Moabe (4)"],
      down: ["↓ Rei gordo de Moabe morto pelo punhal (5)"],
    },
    9: {
      title: "Palavra cruzada — Abimeleque em Siquém",
      grid: ["SIQUEM", "E.....", "T.....", "E.....", "N.....", "T.....", "A....."],
      across: ["→ Cidade onde Abimeleque foi feito rei (6)"],
      down: ["↓ Número de irmãos que Abimeleque matou (7)"],
    },
    15: {
      title: "Palavra cruzada — Sansão e as searas",
      grid: ["FOGO", "I...", "L...", "I...", "S...", "T...", "E...", "U...", "S..."],
      across: ["→ O que Sansão levou às searas pelas raposas (4)"],
      down: ["↓ Povo inimigo derrotado por Sansão (9)"],
    },
  },
  complete: {
    4: {
      ref: "Juízes 4:14",
      before: "Então Débora disse a Baraque: Levanta-te, porque este é o dia em que o Senhor entregou",
      answer: "Sísera",
      after: "na tua mão.",
      options: ["Sísera", "Jabim", "Baal", "Eglom"],
    },
    10: {
      ref: "Juízes 10:16",
      before: "E tiraram os deuses alheios do meio de si, e serviram ao",
      answer: "Senhor",
      after: "; então a sua alma se angustiou por causa de Israel.",
      options: ["Senhor", "Baal", "rei", "ídolo"],
    },
    16: {
      ref: "Juízes 16:17",
      before: "Nunca subiu navalha à minha cabeça, porque sou nazireu de Deus; se eu for rapado, se irá de mim a minha",
      answer: "força",
      after: ", e ficarei fraco como qualquer homem.",
      options: ["força", "fé", "glória", "vida"],
    },
  },
  connect: {
    5: {
      title: "Ligue — O cântico de Débora",
      sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Débora", b: "profetisa e juíza" },
        { a: "Jael", b: "cravou a estaca na tenda" },
        { a: "Sísera", b: "comandante derrotado" },
        { a: "Tabor", b: "monte da batalha" },
      ],
    },
    11: {
      title: "Ligue — O voto de Jefté",
      sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Jefté", b: "gileadita expulso pelos irmãos" },
        { a: "Amom", b: "nação que oprimia Israel" },
        { a: "Voto", b: "promessa precipitada ao Senhor" },
        { a: "Filha", b: "a primeira a sair ao encontro" },
      ],
    },
    17: {
      title: "Ligue — Os ídolos de Mica",
      sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Mica", b: "fez ídolos em sua casa" },
        { a: "Levita", b: "contratado como sacerdote" },
        { a: "Éfode", b: "objeto de culto indevido" },
        { a: "Prata", b: "fundida para a imagem" },
      ],
    },
  },
  boss: {
    questions: [
      { question: "Quem foi a profetisa que julgou Israel e convocou Baraque?", options: ["Débora", "Jael", "Ana", "Miriã"], correct: "Débora" },
      { question: "Com quantos homens Gideão derrotou os midianitas?", options: ["300", "3.000", "30", "600"], correct: "300" },
      { question: "Onde estava a força de Sansão?", options: ["No cabelo", "Nas mãos", "Nos olhos", "Na espada"], correct: "No cabelo" },
      { question: "Quem traiu Sansão revelando seu segredo?", options: ["Dalila", "Débora", "Jael", "Rute"], correct: "Dalila" },
      { question: "Que voto precipitado Jefté fez ao Senhor?", options: ["Sacrificar o primeiro que saísse de sua casa", "Construir um templo", "Jejuar quarenta dias", "Nunca mais guerrear"], correct: "Sacrificar o primeiro que saísse de sua casa" },
    ],
    story: {
      open: "Eu levantarei libertadores no meio do meu povo; as nações opressoras não prevalecerão.",
      turns: [
        { ask: "Eúde erguerá o punhal contra o opressor de Moabe.", hit: "O jugo se quebra! 🗡️", miss: "Firma o teu coração e avança." },
        { ask: "Débora e Baraque desçam do monte Tabor.", hit: "Sísera cai por terra! ⚡", miss: "Não temas; o Senhor vai adiante." },
        { ask: "Gideão, toma os trezentos e as trombetas.", hit: "Midiã foge em pânico! 🎺", miss: "A vitória é do Senhor, não da multidão." },
        { ask: "Jefté, atravessa contra os filhos de Amom.", hit: "Amom é subjugado! 🛡️", miss: "Levanta-te outra vez, valente." },
        { ask: "Sansão, apoia-te nas colunas uma última vez.", hit: "Golpe final — o templo desaba! 💥", miss: "Clama ao Senhor pela força que resta." },
      ],
      win: "As nações opressoras foram abatidas, e a terra teve descanso diante do Senhor.",
      winHero: "Os juízes venceram — Israel respira em paz! 🙌",
    },
  },
};
