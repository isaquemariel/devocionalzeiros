import type { BookChallenges } from "@/lib/rpgChallengeContent";

// 1 Tessalonicenses (5 caps). Ciclo (c-1)%6: 1=ordenar, 2=caça-palavras,
// 3=cruzada, 4=completar, 5=boss (último capítulo).
export const THESS1_CH: BookChallenges = {
  order: {
    1: {
      title: "Ordene: um exemplo de fé", sub: "Toque nas cartas na sequência certa.", verse: 10,
      win: "🎉 A fé que se espalhou em ordem!",
      items: [
        { d: 1, em: "🔥", l: "O evangelho chega com poder e Espírito Santo" },
        { d: 2, em: "😊", l: "Acolhem a palavra com alegria na tribulação" },
        { d: 3, em: "🌍", l: "Tornam-se exemplo na Macedônia e Acaia" },
        { d: 4, em: "🙌", l: "Deixam os ídolos e servem ao Deus vivo" },
      ],
    },
  },
  wordsearch: {
    2: {
      title: "Caça-palavras — o ministério terno",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["TERNURA", "EVANGELHO", "TRABALHO", "COROA", "AMOR", "VERDADE"],
    },
  },
  crossword: {
    3: {
      title: "Palavra cruzada — firmes na tribulação",
      grid: ["TIMOTEO", "R......", "I......", "B......", "U......", "L......", "A......", "C......", "A......", "O......"],
      across: ["→ O companheiro enviado para vos confirmar na fé (7)"],
      down: ["↓ A aflição que devemos suportar firmes (10)"],
    },
  },
  complete: {
    4: {
      ref: "1 Tessalonicenses 4:17",
      before: "seremos arrebatados juntamente com eles nas ",
      answer: "nuvens",
      after: ", a encontrar o Senhor nos ares, e assim estaremos sempre com o Senhor",
      options: ["nuvens", "águas", "montanhas", "trevas"],
    },
  },
  boss: {
    questions: [
      { question: "Como Paulo diz que vem o Dia do Senhor?", options: ["Como ladrão de noite", "Ao meio-dia", "Com aviso prévio", "No fim do ano"], correct: "Como ladrão de noite" },
      { question: "O que Paulo manda fazer 'sem cessar'?", options: ["Orar", "Dormir", "Viajar", "Trabalhar"], correct: "Orar" },
      { question: "De que os crentes são chamados filhos?", options: ["Da luz e do dia", "Da noite", "Da lei", "Do medo"], correct: "Da luz e do dia" },
      { question: "Na vinda do Senhor, o que acontece primeiro?", options: ["Os mortos em Cristo ressuscitam", "Os vivos partem", "Os anjos descansam", "O sol se apaga"], correct: "Os mortos em Cristo ressuscitam" },
      { question: "Onde os vivos irão encontrar o Senhor ao serem arrebatados?", options: ["Nas nuvens, nos ares", "No templo", "No deserto", "No mar"], correct: "Nas nuvens, nos ares" },
    ],
    story: {
      open: "Eis que venho como ladrão de noite; vela, pois, e não durmas — tu és filho da luz.",
      turns: [
        { ask: "Enquanto dizem 'paz e segurança', eu me aproximo em silêncio.", hit: "Vigilância acesa! 🕯️", miss: "Não te embriagues de sono, desperta." },
        { ask: "As trevas querem apagar a tua lâmpada.", hit: "És filho do dia! ☀️", miss: "A noite ainda te pesa, ergue-te." },
        { ask: "Reveste-te da couraça da fé e do amor.", hit: "A armadura resiste! 🛡️", miss: "Descobriste o flanco, protege-te." },
        { ask: "Alegra-te sempre e ora sem cessar.", hit: "A oração fura a escuridão! 🙏", miss: "O silêncio te enfraquece, clama." },
        { ask: "Guarda a esperança: os mortos em Cristo ressuscitarão.", hit: "Golpe final — a luz vence a noite! 🌅", miss: "Não desanimes, a promessa não falha." },
      ],
      win: "O Ladrão da Noite foi surpreendido pelos que velavam sóbrios, vestidos de fé, amor e esperança.",
      winHero: "A noite passou — somos filhos da luz! 🙌",
    },
  },
};
