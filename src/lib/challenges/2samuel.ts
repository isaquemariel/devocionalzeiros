import type { BookChallenges } from "@/lib/rpgChallengeContent";

// 2 Samuel (24 caps). Ciclo por capítulo (c-1)%6: 0=ordenar,1=caça,2=cruzada,
// 3=completar,4=ligar,5=quiz(IA). Cap.24 (último) = boss "A Revolta de Absalão".
export const SAMUEL2_CH: BookChallenges = {
  order: {
    1: {
      title: "Ordene: a morte de Saul chega a Davi", sub: "Toque nas cartas na sequência certa.", verse: 17,
      win: "🎉 O lamento na ordem certa!",
      items: [
        { d: 1, em: "🏃", l: "Um amalequita traz notícias do monte Gilboa" },
        { d: 2, em: "😢", l: "Davi rasga as vestes e chora por Saul" },
        { d: 3, em: "⚔️", l: "Davi manda executar o mensageiro" },
        { d: 4, em: "🏹", l: "Davi entoa o lamento chamado 'O Arco'" },
      ],
    },
    7: {
      title: "Ordene: a aliança com a casa de Davi", sub: "Toque nas cartas na sequência certa.", verse: 16,
      win: "🎉 A promessa eterna em ordem!",
      items: [
        { d: 1, em: "🏛️", l: "Davi mora em casa de cedro e pensa na arca" },
        { d: 2, em: "🌙", l: "Natã recebe a palavra de Deus à noite" },
        { d: 3, em: "👑", l: "Deus promete um trono eterno à casa de Davi" },
        { d: 4, em: "🙏", l: "Davi ora agradecido diante do Senhor" },
      ],
    },
    13: {
      title: "Ordene: Tamar e a vingança de Absalão", sub: "Toque nas cartas na sequência certa.", verse: 38,
      win: "🎉 A tragédia na ordem certa.",
      items: [
        { d: 1, em: "💔", l: "Amnom finge doença e viola Tamar" },
        { d: 2, em: "🤐", l: "Absalão acolhe Tamar e cala-se" },
        { d: 3, em: "🍷", l: "Absalão convida Amnom para a tosquia" },
        { d: 4, em: "🗡️", l: "Absalão manda matar Amnom e foge" },
      ],
    },
    19: {
      title: "Ordene: o retorno do rei", sub: "Toque nas cartas na sequência certa.", verse: 15,
      win: "🎉 O rei voltou ao trono!",
      items: [
        { d: 1, em: "😭", l: "Davi chora por Absalão sem consolo" },
        { d: 2, em: "🗣️", l: "Joabe repreende o rei pelo luto" },
        { d: 3, em: "🌊", l: "Judá conduz o rei de volta pelo Jordão" },
        { d: 4, em: "👑", l: "Davi retorna a Jerusalém como rei" },
      ],
    },
  },
  wordsearch: {
    2: {
      title: "Caça-palavras — Davi rei em Hebrom",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["DAVI", "HEBROM", "JUDA", "ABNER", "ASAEL", "GIBEAO"],
    },
    8: {
      title: "Caça-palavras — as vitórias de Davi",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["DAVI", "MOABE", "EDOM", "VITORIA", "DESPOJO", "JUSTICA"],
    },
    14: {
      title: "Caça-palavras — o retorno de Absalão",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["ABSALAO", "TECOA", "JOABE", "CABELO", "BEIJO", "PERDAO"],
    },
    20: {
      title: "Caça-palavras — a revolta de Seba",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["SEBA", "BICRI", "JOABE", "AMASA", "ABEL", "TROMBETA"],
    },
  },
  crossword: {
    3: {
      title: "Palavra cruzada — Abner e Joabe",
      grid: ["ABNER", "S....", "A....", "E....", "L...."],
      across: ["→ Comandante de Saul que passou para Davi (5)"],
      down: ["↓ Irmão de Joabe morto por Abner (5)"],
    },
    9: {
      title: "Palavra cruzada — a bondade a Mefibosete",
      grid: ["MESA", "E...", "F...", "I...", "B...", "O...", "S...", "E...", "T...", "E..."],
      across: ["→ Mefibosete comia continuamente à ___ do rei (4)"],
      down: ["↓ O filho de Jônatas a quem Davi mostrou bondade (10)"],
    },
    15: {
      title: "Palavra cruzada — a revolta de Absalão",
      grid: ["ABSALAO", "I......", "T......", "O......", "F......", "E......", "L......"],
      across: ["→ O filho que se revoltou contra Davi (7)"],
      down: ["↓ O conselheiro que traiu o rei Davi (7)"],
    },
    21: {
      title: "Palavra cruzada — a fome e os gigantes",
      grid: ["GIGANTE", "I......", "B......", "E......", "A......", "O......"],
      across: ["→ Os filisteus que Davi e seus homens venceram (7)"],
      down: ["↓ O povo que Saul havia maltratado (6)"],
    },
  },
  complete: {
    4: {
      ref: "2 Samuel 4:9",
      before: "Vive o Senhor, que remiu a minha",
      answer: "alma",
      after: "de toda a angústia",
      options: ["alma", "vida", "casa", "terra"],
    },
    10: {
      ref: "2 Samuel 10:12",
      before: "Esforça-te, e esforcemo-nos pelo nosso",
      answer: "povo",
      after: "e pelas cidades do nosso Deus",
      options: ["povo", "rei", "exército", "reino"],
    },
    16: {
      ref: "2 Samuel 16:12",
      before: "Porventura atentará o Senhor para a minha",
      answer: "aflição",
      after: "e me pagará com bem",
      options: ["aflição", "oração", "tristeza", "voz"],
    },
    22: {
      ref: "2 Samuel 22:3",
      before: "Deus é a minha rocha, nele confiarei; o meu",
      answer: "escudo",
      after: "e a força da minha salvação",
      options: ["escudo", "refúgio", "castelo", "rochedo"],
    },
  },
  connect: {
    5: {
      title: "Ligue — Davi rei sobre todo o Israel",
      sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Hebrom", b: "onde Davi foi ungido sobre Israel" },
        { a: "Sião", b: "a fortaleza que Davi conquistou" },
        { a: "Jerusalém", b: "passou a ser a Cidade de Davi" },
        { a: "Refaim", b: "o vale onde caíram os filisteus" },
      ],
    },
    11: {
      title: "Ligue — Davi e Bate-Seba",
      sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Bate-Seba", b: "a mulher que Davi cobiçou" },
        { a: "Urias", b: "o soldado heteu que foi leal" },
        { a: "Joabe", b: "o general que recebeu a carta fatal" },
        { a: "Terraço", b: "de onde Davi a viu banhar-se" },
      ],
    },
    17: {
      title: "Ligue — conselho contra conselho",
      sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Aitofel", b: "conselheiro que depois se enforcou" },
        { a: "Husai", b: "o arquita, amigo fiel de Davi" },
        { a: "Absalão", b: "seguiu o conselho de Husai" },
        { a: "Jordão", b: "rio que o rei atravessou de noite" },
      ],
    },
    23: {
      title: "Ligue — os valentes de Davi",
      sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Josebe-Bassebete", b: "o chefe dos três valentes" },
        { a: "Eleazar", b: "feriu filisteus até cansar a mão" },
        { a: "Samá", b: "defendeu um campo de lentilhas" },
        { a: "Os três", b: "buscaram água do poço de Belém" },
      ],
    },
  },
  boss: {
    questions: [
      { question: "Sobre qual tribo Davi tornou-se rei primeiro, em Hebrom?", options: ["Judá", "Israel", "Benjamim", "Efraim"], correct: "Judá" },
      { question: "O que Davi trouxe para Jerusalém dançando com todas as suas forças?", options: ["A arca da aliança", "O trono real", "O altar de ouro", "As tábuas da lei"], correct: "A arca da aliança" },
      { question: "Quem repreendeu Davi com a parábola da ovelhinha do pobre?", options: ["Natã", "Samuel", "Gade", "Abiatar"], correct: "Natã" },
      { question: "Qual filho de Davi liderou a revolta e tomou Jerusalém?", options: ["Absalão", "Amnom", "Salomão", "Adonias"], correct: "Absalão" },
      { question: "Como Absalão ficou preso na floresta de Efraim?", options: ["Pelos cabelos num carvalho", "Numa rede de caça", "Afogado no Jordão", "Num poço seco"], correct: "Pelos cabelos num carvalho" },
    ],
    story: {
      open: "Levanta-te, ó rei ferido; a batalha é minha, e a tua casa não há de cair.",
      turns: [
        { ask: "Teu próprio filho ergueu-se e roubou o coração de Israel.", hit: "A conspiração se desfaz! 💥", miss: "Não temas — eu pelejo por ti." },
        { ask: "Foges de Jerusalém, chorando pelo monte das Oliveiras.", hit: "A fé te sustém na fuga! 🕊️", miss: "Ergue os olhos, o socorro vem do alto." },
        { ask: "Simei te amaldiçoa e te atira pedras pelo caminho.", hit: "A humildade vence o insulto! ✨", miss: "Cala-te e espera no Senhor." },
        { ask: "O astuto conselho de Aitofel precisa ser frustrado.", hit: "A sabedoria de Deus prevalece! 📜", miss: "Confia: o conselho ímpio não vingará." },
        { ask: "Na floresta de Efraim decide-se toda a batalha.", hit: "Golpe final — o trono é restaurado! 👑", miss: "A vitória pertence ao Senhor." },
      ],
      win: "A revolta foi vencida; mas o coração do rei chorou pelo filho perdido, e o trono de Davi permaneceu firme.",
      winHero: "Absalão caiu, e o reino voltou às mãos do ungido! 🙌",
    },
  },
};
