// ============================================================================
// Roteiros de cena (Living Scene v2) — APOCALIPSE, capítulo por capítulo.
// As visões de João em Patmos: o Filho do Homem entre os candelabros, as cartas
// às sete igrejas, o trono e o Cordeiro, os sete selos e cavaleiros, as sete
// trombetas, a mulher e o dragão, as sete taças da ira, a queda da Babilônia, o
// Cavaleiro Fiel e Verdadeiro, o juízo final e a Nova Jerusalém.
// Puramente visual/narrativo — não toca em progresso.
// Segue o padrão de Gênesis/Êxodo (rpgGenesisScenes / rpgExodusScenes).
// ============================================================================

import type { ChapterScript, V2Actor, V2Prop, SceneState } from "@/lib/rpgLivingV2";

const F = (x: number, role: V2Actor["role"], action: V2Actor["action"], palette?: V2Actor["palette"], extra: Partial<V2Actor> = {}): V2Actor => ({ x, role, action, palette, ...extra });
const AN = (x: number, animal: NonNullable<V2Actor["animal"]>, scale = 1, color?: string): V2Actor => ({ x, kind: "animal", animal, scale, color });
const P = (kind: string, x: number, scale = 1, fire?: number): V2Prop => ({ kind, x, scale, ...(fire != null ? { fire } : {}) });
const kf = (v: number, state: SceneState) => ({ v, state });

export const REVELATION_SCENES: Record<number, ChapterScript> = {
  1: {
    keyframes: [
      kf(1, { terrain: "sea", night: 0.5, actors: [F(0.4, "elder", "stand", "gray")] }),
      kf(10, { terrain: "sea", night: 0.4, glory: 0.5, props: [P("lampstand", 0.28, 1, 1), P("lampstand", 0.72, 1, 1)], actors: [F(0.45, "elder", "kneel", "gray")] }),
      kf(12, { terrain: "sea", glory: 0.85, props: [P("lampstand", 0.2, 1, 1), P("lampstand", 0.36, 1, 1), P("lampstand", 0.64, 1, 1), P("lampstand", 0.8, 1, 1)], actors: [F(0.5, "man", "raise", "white")] }),
      kf(17, { terrain: "sea", glory: 0.9, props: [P("lampstand", 0.24, 1, 1), P("lampstand", 0.76, 1, 1)], actors: [F(0.5, "man", "stand", "white"), F(0.4, "elder", "bow", "gray")] }),
    ],
    beats: [
      { upTo: 9, reaction: "João, exilado em Patmos, ouve uma voz como trombeta. 🌊" },
      { upTo: 16, reaction: "Volta-se e vê o Filho do Homem entre sete candelabros de ouro. 🕎" },
      { upTo: 99, god: "Não temas. Eu sou o Primeiro e o Último, e o que vive.", reaction: "João cai como morto aos seus pés. ✨" },
    ],
  },
  2: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.5, props: [P("lampstand", 0.72, 1, 1)], actors: [F(0.4, "man", "raise", "white")] }),
      kf(8, { terrain: "city", glory: 0.5, props: [P("lampstand", 0.7, 1, 0.7)], actors: [F(0.4, "man", "stand", "white"), F(0.62, "elder", "kneel", "gray")] }),
      kf(12, { terrain: "city", glory: 0.4, night: 0.2, props: [P("lampstand", 0.72, 1, 0.9)], actors: [F(0.4, "man", "raise", "white")] }),
      kf(18, { terrain: "city", glory: 0.5, props: [P("lampstand", 0.7, 1, 1)], actors: [F(0.42, "man", "stand", "white")] }),
    ],
    beats: [
      { upTo: 7, god: "Conheço as tuas obras, mas deixaste o teu primeiro amor.", reaction: "Carta a Éfeso: volta ao amor primeiro. 💌" },
      { upTo: 11, god: "Sê fiel até à morte, e dar-te-ei a coroa da vida.", reaction: "Cartas a Esmirna e Pérgamo. 👑" },
      { upTo: 99, god: "Ao que vencer, dar-lhe-ei a estrela da manhã.", reaction: "Carta a Tiatira: guardai as minhas obras. ⭐" },
    ],
  },
  3: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.4, night: 0.25, props: [P("lampstand", 0.72, 1, 0.4)], actors: [F(0.4, "man", "raise", "white")] }),
      kf(7, { terrain: "city", glory: 0.6, props: [P("lampstand", 0.7, 1, 1)], actors: [F(0.42, "man", "stand", "white")] }),
      kf(14, { terrain: "city", glory: 0.5, props: [P("lampstand", 0.72, 1, 0.6)], actors: [F(0.4, "man", "raise", "white")] }),
      kf(20, { terrain: "city", glory: 0.7, props: [P("lampstand", 0.7, 1, 1)], actors: [F(0.42, "man", "stand", "white")] }),
    ],
    beats: [
      { upTo: 6, god: "Tens nome de que vives, e estás morto. Vigia!", reaction: "Carta a Sardes: desperta. ⏰" },
      { upTo: 13, god: "Guardaste a minha palavra; eis uma porta aberta.", reaction: "Carta a Filadélfia: porta aberta. 🚪" },
      { upTo: 99, god: "Eis que estou à porta e bato; se alguém ouvir, entrarei.", reaction: "Carta a Laodiceia: nem frio nem quente. 🔥❄️" },
    ],
  },
  4: {
    keyframes: [
      kf(1, { terrain: "sea", glory: 0.7, actors: [F(0.5, "elder", "raise", "gray")] }),
      kf(2, { terrain: "sea", glory: 0.9, rainbow: 0.6, actors: [F(0.5, "king", "stand", "gold")] }),
      kf(4, { terrain: "sea", glory: 0.85, rainbow: 0.5, crowd: 0.7, actors: [F(0.5, "king", "stand", "gold"), F(0.24, "elder", "bow", "white"), F(0.76, "elder", "bow", "white")] }),
      kf(8, { terrain: "sea", glory: 0.95, rainbow: 0.5, crowd: 0.8, actors: [F(0.5, "king", "stand", "gold"), F(0.3, "elder", "kneel", "white"), F(0.7, "elder", "kneel", "white")] }),
    ],
    beats: [
      { upTo: 3, reaction: "Uma porta aberta no céu — e um trono no meio. 🌈" },
      { upTo: 7, reaction: "Ao redor, vinte e quatro anciãos e quatro seres viventes. 👑" },
      { upTo: 99, god: "Santo, Santo, Santo é o Senhor Deus, o Todo-Poderoso!", reaction: "O louvor eterno diante do trono. ✨" },
    ],
  },
  5: {
    keyframes: [
      kf(1, { terrain: "sea", glory: 0.7, actors: [F(0.5, "king", "stand", "gold"), F(0.66, "elder", "raise", "white")] }),
      kf(4, { terrain: "sea", glory: 0.5, night: 0.2, actors: [F(0.45, "elder", "mourn", "gray")] }),
      kf(6, { terrain: "sea", glory: 0.9, props: [P("ram", 0.5, 1.1)], actors: [F(0.5, "king", "stand", "gold")] }),
      kf(11, { terrain: "sea", glory: 0.95, crowd: 0.85, props: [P("ram", 0.5, 1.1)], actors: [F(0.28, "elder", "kneel", "white"), F(0.72, "elder", "kneel", "white")] }),
    ],
    beats: [
      { upTo: 5, reaction: "Quem é digno de abrir o livro selado? Ninguém... 📜" },
      { upTo: 9, reaction: "Eis o Leão de Judá — que aparece como um Cordeiro! 🐑" },
      { upTo: 99, god: "Digno é o Cordeiro que foi morto de receber poder e glória!", reaction: "Toda criatura canta ao Cordeiro. 🎶" },
    ],
  },
  6: {
    keyframes: [
      kf(1, { terrain: "plain", glory: 0.4, props: [P("ram", 0.7, 0.8)], actors: [F(0.35, "warrior", "stand", "white")] }),
      kf(3, { terrain: "plain", fire: 0.6, storm: 0.3, actors: [F(0.4, "warrior", "fight", "red", { facing: 1 })] }),
      kf(5, { terrain: "field", night: 0.4, actors: [F(0.4, "warrior", "stand", "gray"), F(0.66, "man", "mourn", "sand")] }),
      kf(8, { terrain: "plain", night: 0.6, blood: 0.4, actors: [F(0.4, "warrior", "walk", "gray")] }),
      kf(12, { terrain: "mountain", darkness: 0.7, storm: 0.6, actors: [F(0.4, "king", "mourn", "purple"), F(0.62, "man", "mourn", "sand")] }),
    ],
    beats: [
      { upTo: 2, reaction: "O Cordeiro abre o primeiro selo: o cavaleiro branco. 🐎" },
      { upTo: 8, reaction: "Guerra, fome e morte cavalgam sobre a terra. ⚔️" },
      { upTo: 11, reaction: "As almas dos mártires clamam sob o altar. 🩸" },
      { upTo: 99, reaction: "O sexto selo: o sol se escurece, e os montes tremem. 🌑" },
    ],
  },
  7: {
    keyframes: [
      kf(1, { terrain: "plain", glory: 0.4, actors: [F(0.24, "angel", "raise", "white"), F(0.5, "angel", "raise", "white"), F(0.76, "angel", "raise", "white")] }),
      kf(4, { terrain: "plain", glory: 0.6, crowd: 0.8, actors: [F(0.5, "angel", "stand", "white")] }),
      kf(9, { terrain: "sea", glory: 0.9, crowd: 0.9, props: [P("palm", 0.2), P("palm", 0.82)], actors: [F(0.5, "king", "stand", "gold")] }),
    ],
    beats: [
      { upTo: 8, reaction: "Quatro anjos seguram os ventos; os servos de Deus são selados. ✨" },
      { upTo: 12, reaction: "Uma multidão sem conta, de toda nação, diante do trono. 🌴" },
      { upTo: 99, god: "Enxugarei toda lágrima dos seus olhos.", reaction: "Vestidos de branco, com palmas nas mãos. 🤍" },
    ],
  },
  8: {
    keyframes: [
      kf(1, { terrain: "sea", night: 0.4, glory: 0.4, actors: [F(0.5, "angel", "stand", "white")] }),
      kf(6, { terrain: "field", fire: 0.7, storm: 0.5, actors: [F(0.3, "angel", "raise", "white")] }),
      kf(8, { terrain: "sea", fire: 0.6, blood: 0.5, actors: [F(0.4, "angel", "raise", "white")] }),
      kf(12, { terrain: "mountain", darkness: 0.6, fire: 0.4, actors: [F(0.5, "angel", "stand", "white")] }),
    ],
    beats: [
      { upTo: 5, reaction: "Silêncio no céu; sete anjos recebem sete trombetas. 🎺" },
      { upTo: 7, reaction: "1ª trombeta: granizo e fogo caem sobre a terra. 🔥" },
      { upTo: 11, reaction: "Mar e rios feridos; a estrela Absinto amarga as águas. ☄️" },
      { upTo: 99, reaction: "A quarta parte do sol e das estrelas se escurece. 🌘" },
    ],
  },
  9: {
    keyframes: [
      kf(1, { terrain: "desert", darkness: 0.7, fire: 0.3, actors: [F(0.5, "angel", "stand", "gray")] }),
      kf(3, { terrain: "desert", locusts: 0.9, darkness: 0.5, actors: [F(0.4, "man", "mourn", "sand")] }),
      kf(13, { terrain: "river", fire: 0.6, storm: 0.4, actors: [F(0.4, "warrior", "fight", "red", { facing: 1 })] }),
      kf(16, { terrain: "plain", fire: 0.5, darkness: 0.5, crowd: 0.6, actors: [F(0.4, "warrior", "stand", "gray")] }),
    ],
    beats: [
      { upTo: 6, reaction: "5ª trombeta: do abismo sobem gafanhotos como escorpiões. 🦗" },
      { upTo: 12, reaction: "Os homens buscam a morte, e ela foge deles. 😖" },
      { upTo: 19, reaction: "6ª trombeta: soltam-se os anjos do Eufrates. ⚔️" },
      { upTo: 99, reaction: "Um terço da humanidade cai, mas os demais não se arrependem. 🌑" },
    ],
  },
  10: {
    keyframes: [
      kf(1, { terrain: "sea", glory: 0.85, rainbow: 0.6, actors: [F(0.5, "angel", "raise", "white")] }),
      kf(2, { terrain: "sea", glory: 0.8, storm: 0.4, actors: [F(0.5, "angel", "stand", "white"), F(0.72, "elder", "stand", "gray")] }),
      kf(8, { terrain: "sea", glory: 0.7, actors: [F(0.55, "angel", "raise", "white"), F(0.35, "elder", "kneel", "gray")] }),
    ],
    beats: [
      { upTo: 4, reaction: "Um anjo forte desce com um livrinho aberto na mão. 🌈" },
      { upTo: 7, god: "Não haverá mais demora: cumpre-se o mistério de Deus.", reaction: "Sete trovões falam, mas são selados. ⚡" },
      { upTo: 99, reaction: "João come o livrinho: doce na boca, amargo no ventre. 📖" },
    ],
  },
  11: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.4, actors: [F(0.5, "elder", "stand", "gray")] }),
      kf(3, { terrain: "city", fire: 0.4, actors: [F(0.4, "warrior", "raise", "sand"), F(0.6, "warrior", "raise", "sand")] }),
      kf(7, { terrain: "city", night: 0.6, blood: 0.4, actors: [F(0.4, "man", "lie", "sand"), F(0.6, "man", "lie", "sand")] }),
      kf(15, { terrain: "sea", glory: 0.95, crowd: 0.8, actors: [F(0.5, "king", "stand", "gold")] }),
    ],
    beats: [
      { upTo: 6, reaction: "As duas testemunhas profetizam com poder de fogo. 🔥" },
      { upTo: 13, reaction: "Mortas e ressuscitadas, sobem numa nuvem. ☁️" },
      { upTo: 99, god: "O reino do mundo se tornou do nosso Senhor e do seu Cristo!", reaction: "A sétima trombeta: Ele reinará para sempre! 👑" },
    ],
  },
  12: {
    keyframes: [
      kf(1, { terrain: "sea", night: 0.5, glory: 0.7, actors: [F(0.4, "woman", "stand", "gold")] }),
      kf(3, { terrain: "sea", night: 0.7, fire: 0.4, props: [P("serpent", 0.62, 1.6)], actors: [F(0.35, "woman", "mourn", "gold")] }),
      kf(7, { terrain: "sea", night: 0.6, storm: 0.5, props: [P("serpent", 0.66, 1.5)], actors: [F(0.32, "angel", "fight", "white", { facing: 1 })] }),
      kf(13, { terrain: "desert", night: 0.4, glory: 0.4, props: [P("serpent", 0.72, 1.2)], actors: [F(0.35, "woman", "walk", "gold")] }),
    ],
    beats: [
      { upTo: 2, reaction: "Uma mulher vestida do sol, com a lua sob os pés. 🌟🌙" },
      { upTo: 6, reaction: "Um dragão vermelho espera para devorar o filho. 🐉" },
      { upTo: 12, god: "Agora veio a salvação e o poder do nosso Deus!", reaction: "Miguel peleja: o dragão é lançado à terra. ⚔️" },
      { upTo: 99, reaction: "A mulher foge ao deserto; o dragão a persegue. 🏜️" },
    ],
  },
  13: {
    keyframes: [
      kf(1, { terrain: "sea", night: 0.5, storm: 0.4, props: [P("serpent", 0.55, 1.4)], actors: [F(0.35, "warrior", "stand", "red")] }),
      kf(4, { terrain: "city", fire: 0.4, crowd: 0.7, actors: [F(0.4, "king", "raise", "purple"), F(0.66, "man", "bow", "sand")] }),
      kf(11, { terrain: "field", night: 0.4, props: [P("serpent", 0.6, 1)], actors: [F(0.4, "warrior", "stand", "gray")] }),
      kf(16, { terrain: "city", fire: 0.3, crowd: 0.7, actors: [F(0.5, "man", "raise", "sand")] }),
    ],
    beats: [
      { upTo: 4, reaction: "Sobe do mar uma besta; o dragão lhe dá poder. 🐉" },
      { upTo: 10, reaction: "Toda a terra se admira e adora a besta. 😰" },
      { upTo: 14, reaction: "Outra besta sobe da terra e faz sinais enganosos. 🔥" },
      { upTo: 99, reaction: "A marca da besta: seu número é 666. ⚠️" },
    ],
  },
  14: {
    keyframes: [
      kf(1, { terrain: "mountain", glory: 0.9, crowd: 0.85, props: [P("ram", 0.5, 1)], actors: [] }),
      kf(6, { terrain: "sea", glory: 0.7, actors: [F(0.3, "angel", "raise", "white"), F(0.5, "angel", "raise", "white"), F(0.7, "angel", "raise", "white")] }),
      kf(14, { terrain: "field", glory: 0.8, actors: [F(0.5, "man", "raise", "white")] }),
      kf(18, { terrain: "field", fire: 0.5, blood: 0.4, actors: [F(0.4, "angel", "raise", "white")] }),
    ],
    beats: [
      { upTo: 5, reaction: "O Cordeiro sobre o monte Sião, com os 144 mil. 🐑" },
      { upTo: 13, god: "Temei a Deus e dai-lhe glória, pois é chegada a hora do juízo.", reaction: "O evangelho eterno é anunciado a toda nação. 📣" },
      { upTo: 16, reaction: "O Filho do Homem lança a foice: a seara está madura. 🌾" },
      { upTo: 99, reaction: "A vindima da ira é pisada fora da cidade. 🍇" },
    ],
  },
  15: {
    keyframes: [
      kf(1, { terrain: "sea", glory: 0.7, fire: 0.3, actors: [F(0.3, "angel", "stand", "white"), F(0.7, "angel", "stand", "white")] }),
      kf(2, { terrain: "sea", glory: 0.85, crowd: 0.7, actors: [F(0.5, "elder", "raise", "white")] }),
      kf(6, { terrain: "sea", glory: 0.6, fire: 0.4, actors: [F(0.24, "angel", "carry", "gold"), F(0.5, "angel", "carry", "gold"), F(0.76, "angel", "carry", "gold")] }),
    ],
    beats: [
      { upTo: 4, god: "Grandes e admiráveis são as tuas obras, Senhor Deus!", reaction: "Os vencedores cantam o cântico de Moisés e do Cordeiro. 🎶" },
      { upTo: 99, reaction: "Sete anjos recebem as sete taças da ira de Deus. 🏺" },
    ],
  },
  16: {
    keyframes: [
      kf(1, { terrain: "plain", fire: 0.6, actors: [F(0.5, "angel", "raise", "white")] }),
      kf(3, { terrain: "sea", blood: 0.9, actors: [F(0.4, "angel", "raise", "white")] }),
      kf(8, { terrain: "desert", fire: 0.85, darkness: 0.3, actors: [F(0.5, "man", "mourn", "sand")] }),
      kf(17, { terrain: "city", storm: 0.9, hail: 0.9, darkness: 0.6, actors: [F(0.4, "king", "mourn", "purple")] }),
    ],
    beats: [
      { upTo: 2, god: "Ide e derramai as sete taças da ira de Deus sobre a terra.", reaction: "1ª taça: chagas malignas sobre os homens. 🏺" },
      { upTo: 9, reaction: "Mar e rios viram sangue; o sol queima com fogo. 🩸🔥" },
      { upTo: 16, reaction: "Trevas sobre o trono da besta; reúnem-se no Armagedom. 🌑" },
      { upTo: 99, god: "Está feito!", reaction: "7ª taça: relâmpagos, terremoto e granizo enorme. ⚡🧊" },
    ],
  },
  17: {
    keyframes: [
      kf(1, { terrain: "desert", night: 0.4, props: [P("serpent", 0.6, 1.4)], actors: [F(0.4, "woman", "stand", "purple")] }),
      kf(3, { terrain: "desert", night: 0.5, fire: 0.3, props: [P("serpent", 0.62, 1.4)], actors: [F(0.4, "woman", "raise", "purple")] }),
      kf(14, { terrain: "sea", glory: 0.7, props: [P("ram", 0.55, 0.9)], actors: [F(0.4, "king", "stand", "gold")] }),
    ],
    beats: [
      { upTo: 6, reaction: "A grande prostituta, sentada sobre a besta escarlate. 🍷" },
      { upTo: 13, reaction: "Babilônia, a mãe das abominações da terra. 🏛️" },
      { upTo: 99, god: "O Cordeiro os vencerá, porque é Senhor dos senhores.", reaction: "A besta e os reis guerreiam contra o Cordeiro — e perdem. 👑" },
    ],
  },
  18: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.6, actors: [F(0.5, "angel", "raise", "white")] }),
      kf(9, { terrain: "city", fire: 0.85, darkness: 0.4, actors: [F(0.4, "king", "mourn", "purple"), F(0.66, "man", "mourn", "sand")] }),
      kf(21, { terrain: "sea", night: 0.5, fire: 0.4, actors: [F(0.4, "angel", "raise", "white")] }),
    ],
    beats: [
      { upTo: 8, god: "Caiu, caiu a grande Babilônia!", reaction: "Um anjo anuncia a ruína da cidade. 🏙️" },
      { upTo: 20, reaction: "Reis e mercadores choram a fumaça do seu incêndio. 🔥😢" },
      { upTo: 99, reaction: "Como pedra lançada ao mar, jamais se achará. 🌊" },
    ],
  },
  19: {
    keyframes: [
      kf(1, { terrain: "sea", glory: 0.85, crowd: 0.9, actors: [F(0.28, "elder", "raise", "white"), F(0.72, "elder", "raise", "white")] }),
      kf(7, { terrain: "sea", glory: 0.9, crowd: 0.8, actors: [F(0.5, "woman", "stand", "white")] }),
      kf(11, { terrain: "sea", glory: 0.7, storm: 0.3, actors: [F(0.5, "warrior", "stand", "white")] }),
      kf(14, { terrain: "plain", glory: 0.8, crowd: 0.85, actors: [F(0.5, "warrior", "raise", "white"), F(0.28, "warrior", "walk", "white"), F(0.72, "warrior", "walk", "white")] }),
    ],
    beats: [
      { upTo: 6, god: "Aleluia! Reina o Senhor, o nosso Deus, o Todo-Poderoso.", reaction: "O céu ecoa em louvor. 🎺" },
      { upTo: 10, reaction: "Chegaram as bodas do Cordeiro; a esposa se aprontou. 💍" },
      { upTo: 16, reaction: "O céu se abre: o Cavaleiro Fiel e Verdadeiro cavalga! 🐎👑" },
      { upTo: 99, reaction: "Os exércitos do céu o seguem; a besta é vencida. ⚔️" },
    ],
  },
  20: {
    keyframes: [
      kf(1, { terrain: "plain", night: 0.6, glory: 0.4, props: [P("serpent", 0.6, 1.2)], actors: [F(0.4, "angel", "raise", "white")] }),
      kf(4, { terrain: "sea", glory: 0.7, crowd: 0.7, actors: [F(0.5, "king", "stand", "gold")] }),
      kf(11, { terrain: "plain", glory: 0.95, actors: [F(0.5, "king", "stand", "white")] }),
      kf(14, { terrain: "plain", fire: 0.8, darkness: 0.4, actors: [F(0.5, "man", "mourn", "gray")] }),
    ],
    beats: [
      { upTo: 3, reaction: "O dragão é preso e lançado no abismo por mil anos. 🔒" },
      { upTo: 10, reaction: "Após o milênio, Satanás é lançado no lago de fogo. 🔥" },
      { upTo: 12, reaction: "O grande trono branco; os livros são abertos. 📖" },
      { upTo: 99, reaction: "Cada um é julgado segundo as suas obras. ⚖️" },
    ],
  },
  21: {
    keyframes: [
      kf(1, { terrain: "sea", glory: 0.8, actors: [F(0.5, "elder", "raise", "gray")] }),
      kf(2, { terrain: "city", glory: 0.95, actors: [F(0.5, "woman", "stand", "white")] }),
      kf(10, { terrain: "city", glory: 0.9, rainbow: 0.4, props: [P("tower", 0.24, 1.1), P("tower", 0.76, 1.1)], actors: [F(0.5, "angel", "raise", "white")] }),
      kf(22, { terrain: "city", glory: 1, props: [P("tower", 0.2, 1), P("tower", 0.8, 1)], actors: [F(0.5, "king", "stand", "gold")] }),
    ],
    beats: [
      { upTo: 4, god: "Eis que faço novas todas as coisas. Não haverá mais morte.", reaction: "Um novo céu e uma nova terra! 🌟" },
      { upTo: 9, reaction: "A Nova Jerusalém desce do céu, como noiva enfeitada. 👰" },
      { upTo: 21, reaction: "Muralhas de jaspe, ruas de ouro, portas de pérola. 💎" },
      { upTo: 99, reaction: "Não há templo: o Senhor Deus e o Cordeiro são o seu templo. ✨" },
    ],
  },
  22: {
    keyframes: [
      kf(1, { terrain: "river", glory: 0.9, props: [P("tree", 0.3, 1.2), P("tree", 0.72, 1.2)], actors: [F(0.5, "angel", "raise", "white")] }),
      kf(3, { terrain: "river", glory: 0.95, props: [P("tree", 0.28), P("arkCovenant", 0.5, 1.1), P("tree", 0.74)], actors: [F(0.5, "king", "stand", "gold")] }),
      kf(12, { terrain: "river", glory: 1, props: [P("tree", 0.3), P("tree", 0.72)], actors: [F(0.5, "man", "raise", "white")] }),
      kf(20, { terrain: "river", glory: 0.9, props: [P("tree", 0.3, 1.1), P("tree", 0.72, 1.1)], actors: [F(0.45, "elder", "kneel", "gray")] }),
    ],
    beats: [
      { upTo: 5, reaction: "Um rio de água da vida, e a árvore da vida em cada margem. 🌳💧" },
      { upTo: 11, god: "Eis que venho sem demora; o meu galardão está comigo.", reaction: "O trono de Deus e do Cordeiro; reinarão para sempre. 👑" },
      { upTo: 17, god: "Quem tem sede, venha; e quem quiser, receba de graça a água da vida.", reaction: "O Espírito e a esposa dizem: Vem! 🤍" },
      { upTo: 99, god: "Certamente cedo venho. Amém!", reaction: "Ora vem, Senhor Jesus! A graça seja com todos. ✨" },
    ],
  },
};
