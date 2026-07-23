import type { BookChallenges } from "@/lib/rpgChallengeContent";

// Ezequiel — parte B (caps. 25 a 48). Livro de 48 caps.
// Ciclo por capítulo c: (c-1)%6 → 0 order, 1 wordsearch, 2 crossword, 3 complete, 4 connect, 5 quiz (IA).
// Cap. 48 é o ÚLTIMO → boss ("Gogue, de Magogue"); não gera o jogo do ciclo.
export const EZEKIEL_B: BookChallenges = {
  order: {
    25: {
      title: "Ordene: juízo contra as nações", sub: "Toque nas cartas na sequência certa.", verse: 17,
      win: "🎉 Os oráculos em ordem!",
      items: [
        { d: 1, em: "🏹", l: "Contra Amom, que zombou do santuário" },
        { d: 2, em: "🍇", l: "Contra Moabe, que desprezou Judá" },
        { d: 3, em: "⚔️", l: "Contra Edom, que se vingou" },
        { d: 4, em: "🛡️", l: "Contra os filisteus, de ódio antigo" },
      ],
    },
    31: {
      title: "Ordene: o cedro do Egito", sub: "Toque nas cartas na sequência certa.", verse: 18,
      win: "🎉 A queda do soberbo em ordem!",
      items: [
        { d: 1, em: "🌲", l: "O Egito é como um cedro majestoso" },
        { d: 2, em: "☁️", l: "Sua copa se ergue até as nuvens" },
        { d: 3, em: "😤", l: "Exalta-se em soberba no coração" },
        { d: 4, em: "🪓", l: "É cortado e desce à sepultura" },
      ],
    },
    37: {
      title: "Ordene: o vale dos ossos secos", sub: "Toque nas cartas na sequência certa.", verse: 28,
      win: "🎉 O exército da vida em ordem!",
      items: [
        { d: 1, em: "💀", l: "Ezequiel vê o vale cheio de ossos secos" },
        { d: 2, em: "🗣️", l: "Profetiza, e os ossos se ajuntam" },
        { d: 3, em: "🌬️", l: "O espírito entra e eles vivem: grande exército" },
        { d: 4, em: "🪵", l: "Dois paus tornam-se um: Judá e Israel unidos" },
      ],
    },
    43: {
      title: "Ordene: a glória volta ao templo", sub: "Toque nas cartas na sequência certa.", verse: 27,
      win: "🎉 A glória de volta em ordem!",
      items: [
        { d: 1, em: "✨", l: "A glória do Senhor vem pelo oriente" },
        { d: 2, em: "🏛️", l: "A glória enche a casa/templo" },
        { d: 3, em: "🙇", l: "Ezequiel cai com o rosto em terra" },
        { d: 4, em: "🔥", l: "São dadas as ordenanças do altar" },
      ],
    },
  },
  wordsearch: {
    26: {
      title: "Caça-palavras — o juízo sobre Tiro",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["TIRO", "MAR", "PEDRA", "REDES", "NAVIOS", "TORRES"],
    },
    32: {
      title: "Caça-palavras — lamento sobre o Faraó",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["FARAO", "EGITO", "MONSTRO", "MARES", "ESPADA", "ABISMO"],
    },
    38: {
      title: "Caça-palavras — Gogue e Magogue",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["GOGUE", "MAGOGUE", "NORTE", "EXERCITO", "ESPADA", "TERREMOTO"],
    },
    44: {
      title: "Caça-palavras — a porta e os sacerdotes",
      sub: "Arraste sobre as letras, uma a uma, para formar cada palavra.",
      words: ["PORTA", "ORIENTE", "FECHADA", "PRINCIPE", "ZADOQUE", "SANTO"],
    },
  },
  crossword: {
    27: {
      title: "Palavra cruzada — o naufrágio de Tiro",
      grid: ["MAR", "E..", "R..", "C..", "A..", "D..", "O.."],
      across: ["→ Por onde Tiro navegava e negociava (3)"],
      down: ["↓ Tiro enriqueceu com o seu ... entre as nações (7)"],
    },
    33: {
      title: "Palavra cruzada — o atalaia",
      grid: ["VIGIA", "I....", "D....", "A...."],
      across: ["→ O que o profeta é, para advertir o povo (5)"],
      down: ["↓ Se o ímpio se converte, terá ... (4)"],
    },
    39: {
      title: "Palavra cruzada — a derrota de Gogue",
      grid: ["GOGUE", "U....", "E....", "R....", "R....", "A...."],
      across: ["→ O invasor do norte, derrotado por Deus (5)"],
      down: ["↓ O que Deus vence nos montes de Israel (6)"],
    },
    45: {
      title: "Palavra cruzada — a porção santa",
      grid: ["TERRA", "E....", "M....", "P....", "L....", "O...."],
      across: ["→ Dividida como herança entre as tribos (5)"],
      down: ["↓ A porção santa é reservada para o ... (6)"],
    },
  },
  complete: {
    28: {
      ref: "Ezequiel 28:2",
      before: "O teu coração se elevou, e dizes: Eu sou um",
      answer: "deus",
      after: ", na cadeira de Deus me assento no meio dos mares.",
      options: ["deus", "rei", "anjo", "senhor"],
    },
    34: {
      ref: "Ezequiel 34:23",
      before: "E suscitarei sobre elas um só",
      answer: "pastor",
      after: ", o meu servo Davi, e ele as apascentará.",
      options: ["pastor", "rei", "juiz", "profeta"],
    },
    40: {
      ref: "Ezequiel 40:3",
      before: "e tinha na mão um cordel de linho e uma cana de",
      answer: "medir",
      after: "; e ele estava em pé na porta.",
      options: ["medir", "ouro", "fogo", "pedra"],
    },
    46: {
      ref: "Ezequiel 46:1",
      before: "estará fechada nos seis dias de trabalho, mas no dia de",
      answer: "sábado",
      after: " se abrirá.",
      options: ["sábado", "festa", "luto", "jejum"],
    },
  },
  connect: {
    29: {
      title: "Ligue — o juízo sobre o Egito", sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Faraó", b: "o grande dragão do Nilo" },
        { a: "Egito", b: "cana quebrada que fere a mão" },
        { a: "40 anos", b: "tempo de desolação do Egito" },
        { a: "Nabucodonosor", b: "receberá o Egito como paga" },
      ],
    },
    35: {
      title: "Ligue — contra o monte Seir", sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Monte Seir", b: "Edom, alvo da profecia" },
        { a: "Ódio perpétuo", b: "a culpa de Edom contra Israel" },
        { a: "Sangue", b: "perseguirá quem sangue derramou" },
        { a: "Desolação", b: "a sorte reservada à montanha" },
      ],
    },
    41: {
      title: "Ligue — o interior do templo", sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Santo dos santos", b: "o lugar mais interior medido" },
        { a: "Querubins", b: "esculpidos pelas paredes" },
        { a: "Palmeiras", b: "entalhadas entre os querubins" },
        { a: "Altar de madeira", b: "a mesa diante do Senhor" },
      ],
    },
    47: {
      title: "Ligue — o rio que sai do templo", sub: "Conecte cada termo ao seu par.",
      pairs: [
        { a: "Águas do templo", b: "brotam sob o limiar, ao oriente" },
        { a: "Rio profundo", b: "águas que já não se podia atravessar" },
        { a: "Árvores", b: "suas folhas servem de remédio" },
        { a: "Mar Morto", b: "suas águas ficam saudáveis" },
      ],
    },
  },
  boss: {
    questions: [
      { question: "Quem é o invasor do norte que Deus promete derrotar?", options: ["Gogue, de Magogue", "Faraó do Egito", "O rei de Tiro", "Senaqueribe"], correct: "Gogue, de Magogue" },
      { question: "O que Ezequiel viu no vale, que voltou a viver?", options: ["Ossos secos", "Águas paradas", "Árvores caídas", "Pedras"], correct: "Ossos secos" },
      { question: "Que coração Deus prometeu dar ao seu povo?", options: ["Um coração novo", "Um coração de pedra", "Um coração dividido", "Um coração de rei"], correct: "Um coração novo" },
      { question: "Como Deus se apresenta em Ezequiel 34, cuidando do povo?", options: ["O bom Pastor", "Um guerreiro", "Um mercador", "Um juiz severo"], correct: "O bom Pastor" },
      { question: "O que fluía do novo templo, dando vida por onde passava?", options: ["Um rio", "Fogo", "Fumaça", "Vento"], correct: "Um rio" },
    ],
    story: {
      open: "Eis que sou contra ti, ó Gogue! Do extremo norte vieste, mas neste dia hei de me engrandecer diante das nações.",
      turns: [
        { ask: "Sobes com hordas e cavalos, cobrindo a terra como nuvem.", hit: "O Senhor te derruba dos montes! 💥", miss: "Firma o coração — a batalha é do Senhor." },
        { ask: "Confias na espada e no ferro das tuas tropas.", hit: "A terra treme e a tua espada cai! ⚔️", miss: "Ergue-te outra vez." },
        { ask: "Endureces o coração como pedra diante de Deus.", hit: "Ele dá um coração novo — o teu se quebra! ❤️‍🔥", miss: "Persiste; o Senhor é forte." },
        { ask: "Zombas dos ossos secos e sem vida no vale.", hit: "O sopro os levanta em exército — recua, Gogue! 🦴", miss: "Não desanimes." },
        { ask: "Tentas deter o rio que sai do templo.", hit: "Golpe final — as águas de vida te varrem! 🌊", miss: "A vitória do Senhor não falha." },
      ],
      win: "Gogue caiu sobre os montes de Israel, e as nações souberam que o Senhor é o Santo. Do templo brotou um rio, e a cidade recebeu seu nome: O Senhor está ali.",
      winHero: "O invasor caiu — vida nova brota da vitória! 🙌",
    },
  },
};
