import type { BookChallenges } from "@/lib/rpgChallengeContent";

// Salmos 51–100 (id: psalms). Sem boss. Ciclo por capítulo: slot = (c-1) % 6.
// 0=order, 1=wordsearch, 2=crossword, 3=complete, 4=connect, 5=quiz (omitido).
export const PSALMS_B: BookChallenges = {
  order: {
    55: {
      title: "Ordene: lança o teu cuidado sobre o Senhor", sub: "Toque nas cartas na sequência certa.", verse: 22,
      win: "🎉 O peso entregue, a alma firmada!",
      items: [
        { d: 1, em: "🕊️", l: "'Quem me dera asas de pomba, para voar e descansar'" },
        { d: 2, em: "💔", l: "O amigo íntimo se torna traidor" },
        { d: 3, em: "🎒", l: "'Lança o teu cuidado sobre o Senhor'" },
        { d: 4, em: "🙏", l: "'Ele te susterá; não deixará abalar o justo'" },
      ],
    },
    61: {
      title: "Ordene: leva-me à rocha mais alta", sub: "Toque nas cartas na sequência certa.", verse: 4,
      win: "🎉 Refúgio à sombra das tuas asas!",
      items: [
        { d: 1, em: "📣", l: "'Ouve, ó Deus, o meu clamor'" },
        { d: 2, em: "🪨", l: "'Leva-me à rocha mais alta do que eu'" },
        { d: 3, em: "🏕️", l: "'Habitarei no teu tabernáculo para sempre'" },
        { d: 4, em: "🕊️", l: "Abrigo à sombra das tuas asas" },
      ],
    },
    67: {
      title: "Ordene: Deus se compadeça e nos abençoe", sub: "Toque nas cartas na sequência certa.", verse: 6,
      win: "🎉 A terra deu o seu fruto, Deus nos abençoou!",
      items: [
        { d: 1, em: "🙏", l: "'Deus tenha misericórdia de nós e nos abençoe'" },
        { d: 2, em: "🌍", l: "'Para que se conheça na terra o teu caminho'" },
        { d: 3, em: "🎶", l: "'Alegrem-se e cantem de júbilo as nações'" },
        { d: 4, em: "🌾", l: "'A terra deu o seu fruto; Deus nos abençoará'" },
      ],
    },
    73: {
      title: "Ordene: até que entrei no santuário", sub: "Toque nas cartas na sequência certa.", verse: 17,
      win: "🎉 Bom é aproximar-me de Deus!",
      items: [
        { d: 1, em: "😔", l: "Quase tropecei, invejando os arrogantes" },
        { d: 2, em: "⚖️", l: "Vi a prosperidade dos ímpios" },
        { d: 3, em: "⛪", l: "'Até que entrei no santuário de Deus'" },
        { d: 4, em: "🤝", l: "'Bom é para mim aproximar-me de Deus'" },
      ],
    },
    79: {
      title: "Ordene: o clamor por Jerusalém", sub: "Toque nas cartas na sequência certa.", verse: 13,
      win: "🎉 O povo e as ovelhas te louvam para sempre!",
      items: [
        { d: 1, em: "🔥", l: "As nações profanaram o teu santo templo" },
        { d: 2, em: "😢", l: "'Derramaram sangue como água'" },
        { d: 3, em: "🙏", l: "'Não te lembres das nossas iniquidades passadas'" },
        { d: 4, em: "🐑", l: "'Nós, teu povo e ovelhas, te louvaremos para sempre'" },
      ],
    },
    85: {
      title: "Ordene: restaura-nos, ó Deus", sub: "Toque nas cartas na sequência certa.", verse: 12,
      win: "🎉 A terra dará o seu fruto!",
      items: [
        { d: 1, em: "🌱", l: "'Abençoaste, Senhor, a tua terra'" },
        { d: 2, em: "🙏", l: "'Restaura-nos, ó Deus da nossa salvação'" },
        { d: 3, em: "🤝", l: "'A misericórdia e a verdade se encontraram'" },
        { d: 4, em: "🌾", l: "'O Senhor dará o que é bom; a terra dará o fruto'" },
      ],
    },
    91: {
      title: "Ordene: o refúgio do Altíssimo", sub: "Toque nas cartas na sequência certa.", verse: 11,
      win: "🎉 Guardado à sombra do Onipotente!",
      items: [
        { d: 1, em: "🏠", l: "'Aquele que habita no esconderijo do Altíssimo'" },
        { d: 2, em: "🕊️", l: "'Com suas penas te cobrirá; refúgio sob suas asas'" },
        { d: 3, em: "🛡️", l: "'Não temerás o terror da noite'" },
        { d: 4, em: "👼", l: "'Aos seus anjos dará ordem a teu respeito'" },
      ],
    },
    97: {
      title: "Ordene: o Senhor reina, regozije-se a terra", sub: "Toque nas cartas na sequência certa.", verse: 1,
      win: "🎉 Alegrai-vos, ó justos, no Senhor!",
      items: [
        { d: 1, em: "👑", l: "'O Senhor reina; regozije-se a terra'" },
        { d: 2, em: "☁️", l: "'Nuvens e escuridão o rodeiam'" },
        { d: 3, em: "⚡", l: "'Os seus relâmpagos alumiam o mundo'" },
        { d: 4, em: "😊", l: "'Alegrai-vos, ó justos, no Senhor'" },
      ],
    },
  },
  wordsearch: {
    56: {
      title: "Caça-palavras — quando temo, em ti confio",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["CONFIO", "TEMOR", "DEUS", "LOUVOR", "LÁGRIMAS", "PROMESSA"],
    },
    62: {
      title: "Caça-palavras — a alma espera em silêncio por Deus",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["SILÊNCIO", "ROCHA", "REFÚGIO", "SALVAÇÃO", "ESPERA", "PODER"],
    },
    68: {
      title: "Caça-palavras — pai dos órfãos, defensor das viúvas",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["PAI", "ÓRFÃOS", "VIÚVAS", "INIMIGOS", "CATIVOS", "MONTE"],
    },
    74: {
      title: "Caça-palavras — lembra-te da tua congregação",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["SANTUÁRIO", "RUÍNAS", "REBANHO", "ALIANÇA", "INIMIGO", "DEUS"],
    },
    80: {
      title: "Caça-palavras — o Pastor de Israel e a videira",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["PASTOR", "VIDEIRA", "ISRAEL", "RESTAURA", "ROSTO", "VINHA"],
    },
    86: {
      title: "Caça-palavras — ensina-me o teu caminho",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["CAMINHO", "CORAÇÃO", "VERDADE", "CLEMENTE", "GRANDE", "GLÓRIA"],
    },
    92: {
      title: "Caça-palavras — bom é louvar ao Senhor",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["LOUVOR", "PALMEIRA", "CEDRO", "JUSTO", "GRATIDÃO", "HARPA"],
    },
    98: {
      title: "Caça-palavras — cantai ao Senhor um cântico novo",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["CÂNTICO", "NOVO", "TROMBETA", "ALEGRIA", "TERRA", "SALMOS"],
    },
  },
  crossword: {
    51: {
      title: "Palavra cruzada — cria em mim um coração puro",
      grid: ["PURO", "E...", "C...", "A...", "D...", "O..."],
      across: ["→ O coração que Deus cria em mim (4)"],
      down: ["↓ Aquilo que Davi confessa diante de Deus (6)"],
    },
    57: {
      title: "Palavra cruzada — à sombra das tuas asas",
      grid: ["ABRIGO", "S.....", "A.....", "S....."],
      across: ["→ Onde a alma se esconde à sombra das asas (6)"],
      down: ["↓ As de Deus, sob as quais nos refugiamos (4)"],
    },
    63: {
      title: "Palavra cruzada — a minha alma tem sede de ti",
      grid: ["ALMA", "G...", "U...", "A..."],
      across: ["→ O que tem sede de Deus (4)"],
      down: ["↓ Falta dela na terra seca e cansada (4)"],
    },
    69: {
      title: "Palavra cruzada — as águas me chegaram ao pescoço",
      grid: ["AGUAS", "F....", "L....", "I....", "C....", "A....", "O...."],
      across: ["→ Subiram até o pescoço do salmista (5)"],
      down: ["↓ O sofrimento profundo do salmo (7)"],
    },
    75: {
      title: "Palavra cruzada — Deus é o juiz",
      grid: ["JUIZ", "U...", "S...", "T...", "I...", "C...", "A..."],
      across: ["→ Deus é quem julga: abaixa a um e exalta a outro (4)"],
      down: ["↓ Com ela Deus julga retamente (7)"],
    },
    81: {
      title: "Palavra cruzada — ouve, povo meu",
      grid: ["EGITO", "S....", "C....", "U....", "T....", "A...."],
      across: ["→ Terra de onde Deus tirou o seu povo (5)"],
      down: ["↓ O apelo de Deus: 'ouve, povo meu' (6)"],
    },
    87: {
      title: "Palavra cruzada — a cidade de Deus",
      grid: ["SIAO", "A...", "N...", "T...", "A..."],
      across: ["→ A cidade fundada por Deus nos montes santos (4)"],
      down: ["↓ Como é a cidade de Deus (5)"],
    },
    93: {
      title: "Palavra cruzada — o Senhor reina",
      grid: ["REINA", "I....", "O....", "S...."],
      across: ["→ O que o Senhor faz, vestido de majestade (5)"],
      down: ["↓ Levantam a sua voz, mas Deus é maior (4)"],
    },
    99: {
      title: "Palavra cruzada — santo é o Senhor",
      grid: ["SANTO", "I....", "A....", "O...."],
      across: ["→ Três vezes o salmo declara que Deus é isto (5)"],
      down: ["↓ Cidade onde o Senhor é grande (4)"],
    },
  },
  complete: {
    52: {
      ref: "Salmos 52:8", before: "Mas eu sou como a", answer: "oliveira",
      after: "verde na casa de Deus; confio na misericórdia de Deus para sempre.",
      options: ["oliveira", "videira", "figueira", "palmeira"],
    },
    58: {
      ref: "Salmos 58:11", before: "Há verdadeiramente um Deus que", answer: "julga",
      after: "na terra.",
      options: ["julga", "reina", "ampara", "ouve"],
    },
    64: {
      ref: "Salmos 64:10", before: "O justo se", answer: "alegrará",
      after: "no Senhor e confiará nele.",
      options: ["alegrará", "refugiará", "lembrará", "calará"],
    },
    70: {
      ref: "Salmos 70:5", before: "Senhor, dá-te", answer: "pressa",
      after: "em me socorrer; tu és o meu auxílio e o meu libertador.",
      options: ["pressa", "força", "glória", "paz"],
    },
    76: {
      ref: "Salmos 76:1", before: "Conhecido é Deus em", answer: "Judá",
      after: "; grande é o seu nome em Israel.",
      options: ["Judá", "Sião", "Belém", "Egito"],
    },
    82: {
      ref: "Salmos 82:3", before: "Defendei o pobre e o", answer: "órfão",
      after: "; fazei justiça ao aflito e necessitado.",
      options: ["órfão", "estrangeiro", "rei", "juiz"],
    },
    88: {
      ref: "Salmos 88:2", before: "Chegue a minha", answer: "oração",
      after: "à tua presença; inclina os teus ouvidos ao meu clamor.",
      options: ["oração", "alma", "voz", "dor"],
    },
    94: {
      ref: "Salmos 94:22", before: "Mas o Senhor é o meu alto", answer: "refúgio",
      after: ", e o meu Deus, a rocha do meu amparo.",
      options: ["refúgio", "escudo", "pastor", "cântico"],
    },
    100: {
      ref: "Salmos 100:4", before: "Entrai pelas suas portas com ações de graças, e nos seus átrios com", answer: "louvor",
      after: "; louvai-o e bendizei o seu nome.",
      options: ["louvor", "cânticos", "alegria", "festa"],
    },
  },
  connect: {
    53: {
      title: "Ligue — o insensato e o Deus que olha", sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Insensato", b: "diz: não há Deus" },
        { a: "Deus", b: "olha desde os céus" },
        { a: "Todos", b: "se desviaram" },
        { a: "De Sião", b: "virá a salvação" },
      ],
    },
    59: {
      title: "Ligue — o Senhor, minha fortaleza", sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Meu Deus", b: "alto refúgio" },
        { a: "Inimigos", b: "cercam a cidade" },
        { a: "De manhã", b: "cantarei tua força" },
        { a: "O Senhor", b: "é a minha fortaleza" },
      ],
    },
    65: {
      title: "Ligue — coroas o ano com a tua bondade", sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Coroas o ano", b: "com a tua bondade" },
        { a: "Os vales", b: "cobertos de cereais" },
        { a: "Aquietas", b: "o bramido dos mares" },
        { a: "A ti", b: "se paga o voto" },
      ],
    },
    71: {
      title: "Ligue — desde a mocidade até à velhice", sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Desde a mocidade", b: "me ensinaste" },
        { a: "Na velhice", b: "não me desampares" },
        { a: "Tu és", b: "a minha esperança" },
        { a: "A minha boca", b: "anunciará tua justiça" },
      ],
    },
    77: {
      title: "Ligue — lembrarei os feitos do Senhor", sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Clamo a Deus", b: "e ele me ouve" },
        { a: "Recordo", b: "os feitos do Senhor" },
        { a: "Teu caminho", b: "passou pelo mar" },
        { a: "Guiaste teu povo", b: "como rebanho" },
      ],
    },
    83: {
      title: "Ligue — as nações conspiram contra Deus", sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "As nações", b: "conspiram unidas" },
        { a: "Contra ti", b: "fizeram aliança" },
        { a: "Faze-os", b: "como o restolho" },
        { a: "Saibam", b: "que só tu és o Altíssimo" },
      ],
    },
    89: {
      title: "Ligue — cantarei as misericórdias do Senhor", sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "As misericórdias", b: "cantarei para sempre" },
        { a: "Aliança", b: "feita com Davi" },
        { a: "Justiça e juízo", b: "base do teu trono" },
        { a: "Os céus", b: "celebram tuas maravilhas" },
      ],
    },
    95: {
      title: "Ligue — vinde, adoremos ao Senhor", sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Vinde", b: "cantemos ao Senhor" },
        { a: "Grande Rei", b: "acima de todos os deuses" },
        { a: "Prostremo-nos", b: "diante do Criador" },
        { a: "Não endureçais", b: "o vosso coração" },
      ],
    },
  },
};
