import type { BookChallenges } from "@/lib/rpgChallengeContent";

// 1 Coríntios (16 caps). Ciclo (c-1)%6: 0 ordenar, 1 caça, 2 cruzada, 3 completar,
// 4 ligar, 5 quiz(IA). Cap.16 (último) = boss "O Aguilhão da Morte".
export const CORINTHIANS1_CH: BookChallenges = {
  order: {
    1: {
      title: "Ordene: a cruz, sabedoria de Deus", sub: "Toque nas cartas na sequência certa.", verse: 18,
      win: "🎉 A loucura da cruz é o poder de Deus!",
      items: [
        { d: 1, em: "🙏", l: "Paulo agradece pela graça dada aos coríntios" },
        { d: 2, em: "⚔️", l: "Há contendas: 'eu sou de Paulo, eu de Apolo'" },
        { d: 3, em: "📣", l: "Cristo o enviou a pregar, não a batizar" },
        { d: 4, em: "✝️", l: "A cruz: loucura ao mundo, poder de Deus" },
      ],
    },
    7: {
      title: "Ordene: conselhos sobre o casamento", sub: "Toque nas cartas na sequência certa.", verse: 24,
      win: "🎉 Cada um permaneça no chamado do Senhor!",
      items: [
        { d: 1, em: "💍", l: "Cada homem tenha a sua esposa" },
        { d: 2, em: "🤝", l: "Marido e mulher não se privem um do outro" },
        { d: 3, em: "🕊️", l: "Aos solteiros: é bom ficarem como eu" },
        { d: 4, em: "📿", l: "Permaneça na vocação em que foi chamado" },
      ],
    },
    13: {
      title: "Ordene: o caminho do amor", sub: "Toque nas cartas na sequência certa.", verse: 13,
      win: "🎉 O maior de todos é o amor!",
      items: [
        { d: 1, em: "🗣️", l: "Ainda que eu fale as línguas dos homens e dos anjos" },
        { d: 2, em: "💝", l: "O amor é sofredor, é benigno" },
        { d: 3, em: "🔍", l: "Agora vemos por espelho, em enigma" },
        { d: 4, em: "✝️", l: "Permanecem fé, esperança e amor; o maior é o amor" },
      ],
    },
  },
  wordsearch: {
    2: {
      title: "Caça-palavras — a sabedoria de Deus em mistério",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["CRUZ", "SABEDORIA", "ESPIRITO", "MISTERIO", "PODER", "CRISTO"],
    },
    8: {
      title: "Caça-palavras — a ciência incha, o amor edifica",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["AMOR", "CIENCIA", "IDOLOS", "COMIDA", "IRMAO", "TROPECO"],
    },
    14: {
      title: "Caça-palavras — profecia e ordem na igreja",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["PROFECIA", "LINGUAS", "IGREJA", "EDIFICAR", "ORDEM", "PAZ"],
    },
  },
  crossword: {
    3: {
      title: "Palavra cruzada — o templo e a obra provada pelo fogo",
      grid: ["PALHA", "R....", "A....", "T....", "A...."],
      across: ["→ Material que o fogo consome na obra (5)"],
      down: ["↓ Metal precioso da obra que resiste ao fogo (5)"],
    },
    9: {
      title: "Palavra cruzada — a corrida e o prêmio",
      grid: ["CORRIDA", "O......", "R......", "O......", "A......"],
      across: ["→ A prova em que todos correm, mas um leva o prêmio (7)"],
      down: ["↓ O prêmio incorruptível que o vencedor recebe (5)"],
    },
    15: {
      title: "Palavra cruzada — a ressurreição dos mortos",
      grid: ["VITORIA", "I......", "D......", "A......"],
      across: ["→ 'Onde está, o morte, a tua ___?' (7)"],
      down: ["↓ O que a ressurreicao traz sobre a morte (4)"],
    },
  },
  complete: {
    4: {
      ref: "1 Coríntios 4:2",
      before: "Além disso, requer-se dos despenseiros que cada um seja achado",
      answer: "fiel",
      after: ".",
      options: ["fiel", "sábio", "rico", "forte"],
    },
    10: {
      ref: "1 Coríntios 10:13",
      before: "Não vos sobreveio tentação, senão humana; mas",
      answer: "fiel",
      after: "é Deus, que não vos deixará tentar acima do que podeis.",
      options: ["fiel", "justo", "santo", "bom"],
    },
  },
  connect: {
    5: {
      title: "Ligue — um pouco de fermento",
      sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Fermento", b: "leveda toda a massa" },
        { a: "Páscoa", b: "Cristo, nosso Cordeiro, imolado" },
        { a: "Pães asmos", b: "sinceridade e verdade" },
        { a: "Disciplina", b: "entregar tal homem a Satanás" },
      ],
    },
    11: {
      title: "Ligue — a ceia do Senhor",
      sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "O pão", b: "o corpo partido por vós" },
        { a: "O cálice", b: "a nova aliança no meu sangue" },
        { a: "Fazei isto", b: "em memória de mim" },
        { a: "Cada um", b: "examine-se a si mesmo" },
      ],
    },
  },
  boss: {
    questions: [
      { question: "Qual igreja Paulo repreende pelas divisões ('eu sou de Paulo, eu de Apolo')?", options: ["A igreja de Corinto", "A igreja de Roma", "A igreja de Éfeso", "A igreja da Galácia"], correct: "A igreja de Corinto" },
      { question: "Segundo Paulo, o que a pregação da cruz é para os que se salvam?", options: ["Poder de Deus", "Loucura", "Tropeço", "Sabedoria humana"], correct: "Poder de Deus" },
      { question: "Como Paulo chama o corpo do cristão?", options: ["Templo do Espírito Santo", "Casa de barro", "Tenda passageira", "Altar de pedra"], correct: "Templo do Espírito Santo" },
      { question: "Segundo 1 Coríntios 13, qual é o maior entre fé, esperança e amor?", options: ["O amor", "A fé", "A esperança", "A profecia"], correct: "O amor" },
      { question: "Sobre o que trata principalmente o capítulo 15?", options: ["A ressurreição dos mortos", "O dízimo", "O casamento", "As viagens de Paulo"], correct: "A ressurreição dos mortos" },
    ],
    story: {
      open: "Levanta-te, guerreiro da fé! O Aguilhão da Morte ergue-se, mas a cruz já venceu.",
      turns: [
        { ask: "Rejeita as divisões — não sejas de homens, mas de Cristo.", hit: "A unidade quebra a discórdia! 🤝", miss: "Não te firmes em homens; firma-te em mim." },
        { ask: "Empunha a cruz — loucura ao mundo, poder de Deus.", hit: "A cruz golpeia as trevas! ✝️", miss: "Não te envergonhes do madeiro." },
        { ask: "Guarda o teu corpo, templo do Espírito Santo.", hit: "O templo resplandece! 🕊️", miss: "Purifica o santuário outra vez." },
        { ask: "Reveste-te do amor que tudo sofre e tudo espera.", hit: "O amor jamais falha! 💝", miss: "Sem amor, nada és — volta a amar." },
        { ask: "Proclama: 'Onde está, ó morte, o teu aguilhão?'", hit: "Golpe final — a morte é tragada na vitória! 🏆", miss: "A trombeta ainda há de soar." },
      ],
      win: "A morte foi tragada na vitória; graças a Deus, que nos dá a vitória por nosso Senhor Jesus Cristo.",
      winHero: "O aguilhão foi quebrado — em Cristo vivemos! 🙌",
    },
  },
};
