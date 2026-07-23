import type { BookChallenges } from "@/lib/rpgChallengeContent";

// Ester (10 caps). Ciclo (c-1)%6: 1=ordenar, 2=caça, 3=cruzada, 4=completar,
// 5=ligar, 6=quiz(IA), 7=ordenar, 8=caça, 9=cruzada, 10=boss (último).
export const ESTHER_CH: BookChallenges = {
  order: {
    1: {
      title: "Ordene: o banquete do rei e a queda de Vasti",
      sub: "Toque nas cartas na sequência certa.", verse: 22,
      win: "🎉 O trono aguarda uma nova rainha!",
      items: [
        { d: 1, em: "🏛️", l: "Assuero reina da Índia à Etiópia" },
        { d: 2, em: "🍷", l: "O rei oferece grande banquete em Susã" },
        { d: 3, em: "🚫", l: "A rainha Vasti recusa vir ao rei" },
        { d: 4, em: "👑", l: "Vasti é deposta por decreto real" },
      ],
    },
    7: {
      title: "Ordene: o banquete que desmascarou Hamã",
      sub: "Toque nas cartas na sequência certa.", verse: 10,
      win: "🎉 A justiça alcançou o perseguidor!",
      items: [
        { d: 1, em: "🍽️", l: "No banquete, Ester implora pela sua vida" },
        { d: 2, em: "🗣️", l: "Ela denuncia: o inimigo é este Hamã!" },
        { d: 3, em: "😡", l: "O rei, furioso, sai para o jardim" },
        { d: 4, em: "⚖️", l: "Hamã é enforcado na forca que armara" },
      ],
    },
  },
  wordsearch: {
    2: {
      title: "Caça-palavras — Ester torna-se rainha",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["ESTER", "RAINHA", "MARDOQUEU", "COROA", "SUSÃ", "FAVOR"],
    },
    8: {
      title: "Caça-palavras — Os judeus são salvos",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["DECRETO", "JUDEUS", "ANEL", "MARDOQUEU", "ALEGRIA", "SALVAÇÃO"],
    },
  },
  crossword: {
    3: {
      title: "Palavra cruzada — A trama de Hamã",
      grid: ["HAMA", "O...", "N...", "R...", "A..."],
      across: ["→ O inimigo dos judeus, que tramou o mal (4)"],
      down: ["↓ O que Hamã exigia e não recebeu de Mardoqueu (5)"],
    },
    9: {
      title: "Palavra cruzada — A festa de Purim",
      grid: ["PURIM", "O....", "V....", "O...."],
      across: ["→ A festa que celebra a salvação dos judeus (5)"],
      down: ["↓ O que foi salvo da destruição (4)"],
    },
  },
  complete: {
    4: {
      ref: "Ester 4:16",
      before: "e, se perecer, ",
      answer: "pereço",
      after: ".",
      options: ["pereço", "espero", "descanso", "recuo"],
    },
  },
  connect: {
    5: {
      title: "Ligue — Os banquetes de Ester",
      sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Cetro de ouro", b: "estendido para receber Ester" },
        { a: "Primeiro banquete", b: "Ester adia o pedido ao rei" },
        { a: "Hamã", b: "ergue uma forca para Mardoqueu" },
        { a: "Zeres", b: "esposa que aconselha a forca" },
      ],
    },
  },
  boss: {
    questions: [
      { question: "Quem era o rei da Pérsia no tempo de Ester?", options: ["Assuero", "Nabucodonosor", "Dario", "Ciro"], correct: "Assuero" },
      { question: "Por que a rainha Vasti foi deposta?", options: ["Recusou comparecer ao banquete do rei", "Adorou ídolos", "Fugiu do palácio", "Traiu o reino"], correct: "Recusou comparecer ao banquete do rei" },
      { question: "Quem criou Ester como filha?", options: ["Mardoqueu", "Hegai", "Bigtã", "Memucã"], correct: "Mardoqueu" },
      { question: "Na forca que preparou para Mardoqueu, quem acabou enforcado?", options: ["Hamã", "Assuero", "Vasti", "Zeres"], correct: "Hamã" },
      { question: "Que festa celebra a salvação dos judeus nesse livro?", options: ["Purim", "Páscoa", "Pentecostes", "Tabernáculos"], correct: "Purim" },
    ],
    story: {
      open: "Levanta-te, Ester: contra o perseguidor do meu povo, a coragem será a tua arma.",
      turns: [
        { ask: "Não escondas quem és — foste feita rainha para este tempo.", hit: "A coragem desperta! 👑", miss: "Não temas, filha — eu estou contigo." },
        { ask: "Jejua com o teu povo e busca a minha face.", hit: "O céu ouve o clamor! 🙏", miss: "Persiste na oração." },
        { ask: "Entra à presença do rei sem seres chamada.", hit: "O cetro se estende! ✨", miss: "Avança pela fé." },
        { ask: "No banquete, revela a trama do perseguidor.", hit: "A verdade fere o mal! 💥", miss: "Fala, não te cales." },
        { ask: "O laço que ele armou se voltará contra ele.", hit: "Golpe final — a forca é dele! ⚖️", miss: "A justiça não tarda." },
      ],
      win: "Hamã caiu na própria forca, e os judeus passaram da morte para a festa.",
      winHero: "De tristeza em alegria — o povo está salvo! 🙌",
    },
  },
};
