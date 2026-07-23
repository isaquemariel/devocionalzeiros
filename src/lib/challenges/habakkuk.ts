import type { BookChallenges } from "@/lib/rpgChallengeContent";

// Habacuque (3 caps). Ciclo: 1=ordenar, 2=caça-palavras, 3=boss (último).
export const HABAKKUK_CH: BookChallenges = {
  order: {
    1: {
      title: "Ordene: o clamor do profeta", sub: "Toque nas cartas na sequência certa.", verse: 17,
      win: "🎉 O diálogo com Deus em ordem!",
      items: [
        { d: 1, em: "🗣️", l: "Habacuque clama: 'Até quando, Senhor?'" },
        { d: 2, em: "⚖️", l: "Ele lamenta a violência e a injustiça" },
        { d: 3, em: "👁️", l: "Deus responde: levantarei os caldeus" },
        { d: 4, em: "❓", l: "O profeta questiona a escolha de Deus" },
      ],
    },
  },
  wordsearch: {
    2: {
      title: "Caça-palavras — O justo viverá pela fé",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["JUSTO", "FÉ", "VISÃO", "ATALAIA", "TÁBUAS", "ESPERA"],
    },
  },
  boss: {
    questions: [
      { question: "Quantos capítulos tem o livro de Habacuque?", options: ["Três", "Cinco", "Dez", "Doze"], correct: "Três" },
      { question: "Que povo Deus disse que levantaria para julgar Judá?", options: ["Os caldeus", "Os filisteus", "Os egípcios", "Os moabitas"], correct: "Os caldeus" },
      { question: "Complete: 'O justo viverá pela sua ___.'", options: ["fé", "força", "sabedoria", "riqueza"], correct: "fé" },
      { question: "Onde Habacuque se pôs para esperar a resposta de Deus?", options: ["Na torre de vigia", "No deserto", "No templo", "Junto ao rio"], correct: "Na torre de vigia" },
      { question: "Como Habacuque termina seu cântico? 'Ainda que a figueira não floresça... eu me alegrarei no ___.'", options: ["Senhor", "campo", "monte", "povo"], correct: "Senhor" },
    ],
    story: {
      open: "Eis que os caldeus avançam, terríveis e violentos; mas fica firme, profeta — o justo viverá pela fé.",
      turns: [
        { ask: "Clamaste diante da violência que te cercava.", hit: "O teu clamor foi ouvido! 🗣️", miss: "Não te cales; continua a orar." },
        { ask: "Subiste à torre de vigia para esperar a resposta.", hit: "A visão se cumpre no tempo certo! 👁️", miss: "Aguarda com paciência." },
        { ask: "Escreveste a visão sobre tábuas, bem legível.", hit: "A promessa está firmada! 📜", miss: "Não a esqueças." },
        { ask: "Confiaste que o justo viveria pela sua fé.", hit: "A fé derruba o violento! 💥", miss: "Firma o teu coração na confiança." },
        { ask: "Ainda que a figueira não floresça, te alegraste no Senhor.", hit: "Golpe final — alegria que vence tudo! 🙌", miss: "Ergue o louvor mesmo na escassez." },
      ],
      win: "Os caldeus violentos caem, e o Deus da salvação torna-se a força do profeta.",
      winHero: "Ainda que tudo falhe, eu me alegro no Senhor! 🙌",
    },
  },
};
