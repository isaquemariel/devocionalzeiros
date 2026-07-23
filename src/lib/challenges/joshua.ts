import type { BookChallenges } from "@/lib/rpgChallengeContent";

// Josué (24 caps). Ciclo (c-1)%6: 0=ordenar,1=caça,2=cruzada,3=completar,4=ligar,5=quiz.
// Cap. 24 (último) → boss "Os Muros de Jericó".
export const JOSHUA_CH: BookChallenges = {
  order: {
    1: {
      title: "Ordene: o chamado de Josué", sub: "Toque nas cartas na sequência certa.", verse: 9,
      win: "🎉 O sucessor de Moisés está pronto!",
      items: [
        { d: 1, em: "🕊️", l: "Morre Moisés, servo do Senhor" },
        { d: 2, em: "🗣️", l: "Deus chama Josué: 'Levanta-te'" },
        { d: 3, em: "💪", l: "'Sê forte e corajoso'" },
        { d: 4, em: "📜", l: "Josué manda o povo se preparar" },
      ],
    },
    7: {
      title: "Ordene: o pecado de Acã", sub: "Toque nas cartas na sequência certa.", verse: 26,
      win: "🎉 A justiça restaurou o acampamento!",
      items: [
        { d: 1, em: "⚔️", l: "Israel é derrotada em Ai" },
        { d: 2, em: "🙇", l: "Josué clama prostrado diante da arca" },
        { d: 3, em: "🎯", l: "O sorteio aponta Acã" },
        { d: 4, em: "🪨", l: "Julgamento no vale de Acor" },
      ],
    },
    13: {
      title: "Ordene: a partilha começa", sub: "Toque nas cartas na sequência certa.", verse: 1,
      win: "🎉 A herança começa a ser repartida!",
      items: [
        { d: 1, em: "👴", l: "Josué já era velho e avançado em idade" },
        { d: 2, em: "🗺️", l: "Muita terra ainda restava a conquistar" },
        { d: 3, em: "🌊", l: "Rúben e Gade ficam a leste do Jordão" },
        { d: 4, em: "📏", l: "Começa a repartir a herança às tribos" },
      ],
    },
    19: {
      title: "Ordene: as heranças das tribos", sub: "Toque nas cartas na sequência certa.", verse: 49,
      win: "🎉 Cada tribo em seu lugar!",
      items: [
        { d: 1, em: "🎲", l: "Lançam-se as sortes diante do Senhor" },
        { d: 2, em: "🏞️", l: "As tribos recebem seus limites" },
        { d: 3, em: "🏘️", l: "Dá-se herança até a última tribo" },
        { d: 4, em: "🏡", l: "Josué recebe Timnate-Sera" },
      ],
    },
  },
  wordsearch: {
    2: {
      title: "Caça-palavras — Raabe e os espias",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["RAABE", "ESPIAS", "JERICO", "CORDA", "JANELA", "LINHO"],
    },
    8: {
      title: "Caça-palavras — Ai e o altar no Ebal",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["AI", "EMBOSCADA", "ALTAR", "EBAL", "LEI", "PEDRAS"],
    },
    14: {
      title: "Caça-palavras — Calebe pede Hebrom",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["CALEBE", "HEBROM", "MONTE", "ANAQUINS", "HERANÇA", "FÉ"],
    },
    20: {
      title: "Caça-palavras — As cidades de refúgio",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["REFÚGIO", "CIDADES", "QUEDES", "SIQUEM", "HEBROM", "GOLÃ"],
    },
  },
  crossword: {
    3: {
      title: "Palavra cruzada — A travessia do Jordão",
      grid: ["JORDAO", "O.....", "S.....", "U.....", "E....."],
      across: ["→ O rio que Israel atravessou em seco (6)"],
      down: ["↓ O líder que sucedeu Moisés (5)"],
    },
    9: {
      title: "Palavra cruzada — O engano dos gibeonitas",
      grid: ["PACTO", "A....", "O...."],
      across: ["→ A aliança que Josué fez sem consultar a Deus (5)"],
      down: ["↓ O alimento velho e mofado, sinal do engano (3)"],
    },
    15: {
      title: "Palavra cruzada — A herança de Calebe",
      grid: ["HEBROM", "E.....", "R.....", "A.....", "N.....", "C.....", "A....."],
      across: ["→ A cidade que Calebe recebeu por herança (6)"],
      down: ["↓ A porção que cada tribo recebeu (7)"],
    },
    21: {
      title: "Palavra cruzada — As cidades dos levitas",
      grid: ["LEVITAS", "E......", "V......", "I......"],
      across: ["→ Os que receberam 48 cidades, sem herança de terra (7)"],
      down: ["↓ A tribo dos sacerdotes (4)"],
    },
  },
  complete: {
    4: {
      ref: "Josué 4:7",
      before: "Estas pedras serão por ",
      answer: "memorial",
      after: " aos filhos de Israel para sempre.",
      options: ["memorial", "tesouro", "altar", "muralha"],
    },
    10: {
      ref: "Josué 10:12",
      before: "Sol, detém-te em ",
      answer: "Gibeom",
      after: ", e tu, lua, no vale de Aijalom.",
      options: ["Gibeom", "Jericó", "Belém", "Hebrom"],
    },
    16: {
      ref: "Josué 16:4",
      before: "Assim receberam a sua herança os filhos de ",
      answer: "José",
      after: ", Manassés e Efraim.",
      options: ["José", "Judá", "Levi", "Benjamim"],
    },
    22: {
      ref: "Josué 22:34",
      before: "Deram àquele altar o nome de Ede, pois disseram: É ",
      answer: "testemunha",
      after: " entre nós de que o Senhor é Deus.",
      options: ["testemunha", "memória", "fronteira", "aliança"],
    },
  },
  connect: {
    5: {
      title: "Ligue — Gilgal, a nova consagração",
      sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Gilgal", b: "onde o povo foi circuncidado" },
        { a: "Páscoa", b: "celebrada nas planícies de Jericó" },
        { a: "Maná", b: "cessou ao comerem da terra" },
        { a: "Príncipe do exército", b: "apareceu de espada em punho" },
      ],
    },
    11: {
      title: "Ligue — A campanha do norte",
      sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Jabim", b: "rei de Hazor" },
        { a: "Hazor", b: "cabeça dos reinos, foi queimada" },
        { a: "Cavalos", b: "tiveram os jarretes cortados" },
        { a: "Carros", b: "queimados a fogo" },
      ],
    },
    17: {
      title: "Ligue — A herança de José",
      sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Manassés", b: "meia tribo a oeste do Jordão" },
        { a: "Filhas de Zelofeade", b: "pediram herança e a receberam" },
        { a: "Cananeus", b: "não foram totalmente expulsos" },
        { a: "José", b: "pai de Efraim e Manassés" },
      ],
    },
    23: {
      title: "Ligue — A despedida de Josué",
      sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Josué idoso", b: "reúne os anciãos de Israel" },
        { a: "Um só homem", b: "perseguirá mil, pois Deus peleja" },
        { a: "Apegar-se ao Senhor", b: "o centro da exortação" },
        { a: "Povos restantes", b: "advertência contra as alianças" },
      ],
    },
  },
  boss: {
    questions: [
      { question: "Quem sucedeu Moisés na liderança de Israel?", options: ["Josué", "Calebe", "Arão", "Eleazar"], correct: "Josué" },
      { question: "Como caíram os muros de Jericó?", options: ["Após rodearem a cidade e darem um grande brado", "Com aríetes e catapultas", "Por um terremoto casual", "Foram escalados à noite"], correct: "Após rodearem a cidade e darem um grande brado" },
      { question: "Quem escondeu os espias em Jericó?", options: ["Raabe", "Débora", "Ana", "Mical"], correct: "Raabe" },
      { question: "O que aconteceu com o sol em Gibeom?", options: ["Deteve-se por quase um dia inteiro", "Escureceu ao meio-dia", "Tornou-se vermelho", "Dividiu-se em dois"], correct: "Deteve-se por quase um dia inteiro" },
      { question: "O que Josué declarou em Siquém sobre sua casa?", options: ["'Eu e a minha casa serviremos ao Senhor'", "'Faremos como bem quisermos'", "'Voltaremos ao Egito'", "'Seguiremos os deuses de Canaã'"], correct: "'Eu e a minha casa serviremos ao Senhor'" },
    ],
    story: {
      open: "Sê forte e corajoso, Josué; não temas, porque eu estou contigo. Marcha contra os muros de Jericó.",
      turns: [
        { ask: "Atravessa o Jordão com a arca à frente.", hit: "As águas se abrem — passa em seco! 🌊", miss: "Confia, e as águas hão de parar." },
        { ask: "Rodeia a cidade em silêncio por seis dias.", hit: "O cerco se aperta! 🐏", miss: "Persevera mais um dia." },
        { ask: "No sétimo dia, rodeia sete vezes.", hit: "Chega a hora derradeira! 🔄", miss: "Não pares agora." },
        { ask: "Tocai as trombetas e dai um grande brado!", hit: "As trombetas ressoam — a fortaleza estremece! 📯", miss: "Ergue a voz outra vez." },
        { ask: "Que os muros venham abaixo!", hit: "Golpe final — os muros caem por terra! 🧱", miss: "A vitória é do Senhor; insiste." },
      ],
      win: "Ao brado do povo, os muros de Jericó ruíram, e a cidade foi tomada — como o Senhor prometera.",
      winHero: "Os muros caíram! A fé derrubou a fortaleza! 🙌",
    },
  },
};
