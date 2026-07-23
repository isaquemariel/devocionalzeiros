import type { BookChallenges } from "@/lib/rpgChallengeContent";

// Lamentações (5 caps). Ciclo por capítulo: (c-1)%6 →
// 1=ordenar, 2=caça-palavras, 3=cruzada, 4=completar, 5=boss (último cap.).
export const LAMENTATIONS_CH: BookChallenges = {
  order: {
    1: {
      title: "Ordene: a queda de Jerusalém", sub: "Toque nas cartas na sequência certa.", verse: 22,
      win: "🎉 O lamento em ordem!",
      items: [
        { d: 1, em: "🍞", l: "A fome aperta a cidade sitiada" },
        { d: 2, em: "⚔️", l: "O inimigo rompe e entra em Sião" },
        { d: 3, em: "⛓️", l: "O povo é levado ao cativeiro" },
        { d: 4, em: "😢", l: "A cidade fica solitária e viúva" },
      ],
    },
  },
  wordsearch: {
    2: {
      title: "Caça-palavras — a ruína de Sião",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["SIÃO", "IRA", "LUTO", "MURO", "ALTAR", "RUÍNA"],
    },
  },
  crossword: {
    3: {
      title: "Palavra cruzada — grande é a tua fidelidade",
      grid: ["FIDELIDADE", "I.........", "E.........", "L........."],
      across: ["→ Grande é a tua ... , ó Senhor (10)"],
      down: ["↓ Como é o Senhor: digno de confiança (4)"],
    },
  },
  complete: {
    4: {
      ref: "Lamentações 4:4",
      before: "A língua da criança de peito apega-se pela sede ao paladar; os meninos pedem",
      answer: "pão",
      after: ", e ninguém lho reparte.",
      options: ["pão", "água", "carne", "abrigo"],
    },
  },
  boss: {
    questions: [
      { question: "Qual cidade é lamentada no livro de Lamentações?", options: ["Jerusalém", "Nínive", "Babilônia", "Samaria"], correct: "Jerusalém" },
      { question: "Como está descrita a cidade no início do livro?", options: ["Solitária como viúva", "Próspera e festiva", "Fortificada e segura", "Cheia de riquezas"], correct: "Solitária como viúva" },
      { question: "Segundo o capítulo 3, as misericórdias do Senhor se renovam a cada...", options: ["Manhã", "Tarde", "Ano", "Sábado"], correct: "Manhã" },
      { question: "Complete: 'Grande é a tua ...'", options: ["Fidelidade", "Glória", "Força", "Ira"], correct: "Fidelidade" },
      { question: "Que aflições marcam o povo nos capítulos 4 e 5?", options: ["Fome e cativeiro", "Guerra e vitória", "Festa e fartura", "Paz e descanso"], correct: "Fome e cativeiro" },
    ],
    story: {
      open: "Ainda que a cidade caia em ruínas, a minha compaixão não se esgota; enfrenta a Ruína de Sião.",
      turns: [
        { ask: "Choras a cidade solitária e desolada.", hit: "O lamento sobe como oração! 😢", miss: "Não cales o teu clamor." },
        { ask: "Encaras a ira que derrubou os muros.", hit: "Firme diante da ruína! 🧱", miss: "Ergue-te outra vez." },
        { ask: "No meio do luto, lembras a minha misericórdia.", hit: "Novas a cada manhã! 🌅", miss: "Não esqueças a esperança." },
        { ask: "Atravessas a fome e o cativeiro sem desistir.", hit: "A fé resiste à fome! 🍞", miss: "Espera no Senhor." },
        { ask: "Elevas a súplica final: faze-nos voltar a ti.", hit: "Golpe final — Sião é restaurada! 🙏", miss: "A promessa não falha." },
      ],
      win: "Do lamento nasce a esperança: grande é a fidelidade do Senhor, que renova o seu povo.",
      winHero: "O luto virou esperança! 🙌",
    },
  },
};
