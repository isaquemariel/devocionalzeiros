import type { BookChallenges } from "@/lib/rpgChallengeContent";

// Naum (3 caps). Ciclo: 1=ordenar, 2=caça-palavras, 3=boss (último).
export const NAHUM_CH: BookChallenges = {
  order: {
    1: {
      title: "Ordene: a sentença contra Nínive", sub: "Toque nas cartas na sequência certa.", verse: 15,
      win: "🎉 A justiça do Senhor em ordem!",
      items: [
        { d: 1, em: "🔥", l: "O Senhor zeloso e vingador se levanta" },
        { d: 2, em: "🌊", l: "Repreende o mar; os montes tremem" },
        { d: 3, em: "🛡️", l: "'O Senhor é bom, refúgio no dia da angústia'" },
        { d: 4, em: "📜", l: "Ele decreta o fim total de Nínive" },
      ],
    },
  },
  wordsearch: {
    2: {
      title: "Caça-palavras — O cerco a Nínive",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["NINIVE", "CARROS", "ESCUDO", "LEÕES", "SAQUE", "PRATA"],
    },
  },
  boss: {
    questions: [
      { question: "Contra qual cidade o profeta Naum anunciou a sentença?", options: ["Nínive", "Babilônia", "Tiro", "Damasco"], correct: "Nínive" },
      { question: "Segundo Naum 1:7, o Senhor é bom e serve de quê no dia da angústia?", options: ["Fortaleza", "Espada", "Riqueza", "Trono"], correct: "Fortaleza" },
      { question: "Como Naum chama Nínive por causa de sua violência?", options: ["Cidade de sangue", "Cidade de ouro", "Cidade santa", "Cidade de paz"], correct: "Cidade de sangue" },
      { question: "Qual cidade forte, lembrada por Naum, também havia caído apesar de suas defesas?", options: ["Nô-Amom (Tebas)", "Jerusalém", "Nínive", "Roma"], correct: "Nô-Amom (Tebas)" },
      { question: "A que Naum compara Nínive em sua ferocidade e presa?", options: ["A um covil de leões", "A um jardim", "A um rebanho", "A um rio manso"], correct: "A um covil de leões" },
    ],
    story: {
      open: "Eu sou bom, fortaleza no dia da angústia; agora entro em juízo contra a cidade violenta.",
      turns: [
        { ask: "A cidade de sangue confiou na sua força.", hit: "As muralhas cedem! 🧱", miss: "Firma-te — o juízo é do Senhor." },
        { ask: "As comportas dos rios se abrem sobre Nínive.", hit: "A corrente arromba os portões! 🌊", miss: "Aguarda; a hora chega." },
        { ask: "Os carros correm furiosos pelas praças.", hit: "O saque começa — prata e ouro! ⚔️", miss: "Não recues agora." },
        { ask: "Onde está agora o covil dos leões?", hit: "O covil está vazio! 🦁", miss: "Ergue-te outra vez." },
        { ask: "A ferida de Nínive é incurável.", hit: "Golpe final — a cidade violenta cai! 💥", miss: "A sentença não volta atrás." },
      ],
      win: "Nínive caiu, mas o Senhor permanece bom, refúgio dos que nele confiam.",
      winHero: "A cidade de sangue tombou — o Senhor reina! 🙌",
    },
  },
};
