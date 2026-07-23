import type { BookChallenges } from "@/lib/rpgChallengeContent";

// Neemias (13 caps). Ciclo (c-1)%6: 0=ordenar, 1=caça, 2=cruzada, 3=completar,
// 4=ligar, 5=quiz(IA). Caps 6 e 12 caem no quiz. Cap 13 (último) = boss.
export const NEHEMIAH_CH: BookChallenges = {
  order: {
    1: {
      title: "Ordene: o clamor por Jerusalém", sub: "Toque nas cartas na sequência certa.", verse: 11,
      win: "🎉 A oração que moveu um coração!",
      items: [
        { d: 1, em: "📜", l: "Hanani traz notícias da cidade em ruínas" },
        { d: 2, em: "😢", l: "Neemias chora, jejua e se assenta" },
        { d: 3, em: "🙏", l: "Ora e confessa os pecados do povo" },
        { d: 4, em: "🍷", l: "Copeiro do rei, pede graça diante dele" },
      ],
    },
    7: {
      title: "Ordene: muro pronto, cidade guardada", sub: "Toque nas cartas na sequência certa.", verse: 73,
      win: "🎉 A obra concluída e o povo em ordem!",
      items: [
        { d: 1, em: "🧱", l: "O muro é concluído e as portas colocadas" },
        { d: 2, em: "🎺", l: "Porteiros, cantores e levitas designados" },
        { d: 3, em: "🛡️", l: "Hanani e Hananias guardam Jerusalém" },
        { d: 4, em: "📜", l: "Acha-se o registro dos que voltaram primeiro" },
      ],
    },
  },
  wordsearch: {
    2: {
      title: "Caça-palavras — O rei o envia",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["REI", "COPEIRO", "CARTAS", "MUROS", "NOITE", "JERUSALEM"],
    },
    8: {
      title: "Caça-palavras — Esdras lê a Lei",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["ESDRAS", "LEI", "LIVRO", "PULPITO", "ALEGRIA", "CABANAS"],
    },
  },
  crossword: {
    3: {
      title: "Palavra cruzada — Mãos à obra nas portas",
      grid: ["PORTAS", "O.....", "V.....", "O....."],
      across: ["→ Reconstruídas por famílias ao longo da muralha (6)"],
      down: ["↓ Que trabalhou de todo o coração na obra (4)"],
    },
    9: {
      title: "Palavra cruzada — A aliança do povo",
      grid: ["ALIANCA", "D......", "O......", "R......", "A......", "R......"],
      across: ["→ Pacto firme que o povo fez com Deus (7)"],
      down: ["↓ O que o povo fez ao Senhor, prostrado em terra (6)"],
    },
  },
  complete: {
    4: {
      ref: "Neemias 4:17",
      before: "Os que edificavam o muro, com uma das mãos faziam a obra e com a outra seguravam a ",
      answer: "arma",
      after: ", sempre vigilantes.",
      options: ["arma", "harpa", "coroa", "cesta"],
    },
    10: {
      ref: "Neemias 10:39",
      before: "E não desampararemos a casa do nosso ",
      answer: "Deus",
      after: ", firmando o pacto por escrito.",
      options: ["Deus", "Senhor", "rei", "povo"],
    },
  },
  connect: {
    5: {
      title: "Ligue — Justiça entre irmãos", sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Nobres", b: "emprestavam a juros aos pobres" },
        { a: "Povo aflito", b: "empenhava filhos e campos" },
        { a: "Neemias", b: "não exigiu o pão de governador" },
        { a: "O povo", b: "'assim o faremos', prometeram" },
      ],
    },
    11: {
      title: "Ligue — Quem habitaria na cidade santa", sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Sortes", b: "definiam quem moraria em Jerusalém" },
        { a: "Um de cada dez", b: "habitaria na cidade santa" },
        { a: "Voluntários", b: "eram abençoados pelo povo" },
        { a: "As nove partes", b: "ficavam nas outras cidades" },
      ],
    },
  },
  boss: {
    questions: [
      { question: "Que cargo Neemias ocupava na corte?", options: ["Copeiro do rei", "General", "Escriba", "Sacerdote"], correct: "Copeiro do rei" },
      { question: "Qual rei permitiu que Neemias fosse a Jerusalém?", options: ["Artaxerxes", "Ciro", "Dario", "Nabucodonosor"], correct: "Artaxerxes" },
      { question: "Em quantos dias o muro foi reconstruído?", options: ["52 dias", "7 dias", "40 dias", "100 dias"], correct: "52 dias" },
      { question: "Quem zombava e conspirava contra a obra?", options: ["Sambalate e Tobias", "Golias", "Faraó", "Herodes"], correct: "Sambalate e Tobias" },
      { question: "Quem leu a Lei ao povo, que chorou e se alegrou?", options: ["Esdras", "Moisés", "Davi", "Paulo"], correct: "Esdras" },
    ],
    story: {
      open: "A zombaria ergue-se contra a obra — mas quem edifica comigo não teme o escárnio.",
      turns: [
        { ask: "Sambalate ri: 'que fazem esses fracos judeus?'", hit: "O escárnio cai por terra! 🧱", miss: "Não temas o riso do inimigo." },
        { ask: "Tobias caçoa: 'até uma raposa derrubaria esse muro'.", hit: "O muro se firma na tua mão! 💪", miss: "Ergue a pedra outra vez." },
        { ask: "Conspiram para atacar-te em segredo.", hit: "Espada numa mão, ferramenta na outra! ⚔️", miss: "Vigia e ora, filho." },
        { ask: "Tentam distrair-te para a planície de Ono.", hit: "'Faço grande obra, não posso descer!' 🛡️", miss: "Não desças da muralha." },
        { ask: "Resta selar a obra diante do povo.", hit: "Golpe final — em 52 dias o muro está de pé! 🎉", miss: "A obra é de Deus; não falhará." },
      ],
      win: "Os inimigos temeram, pois viram que a obra fora feita pelo nosso Deus.",
      winHero: "O muro está de pé e a zombaria calou-se! 🙌",
    },
  },
};
