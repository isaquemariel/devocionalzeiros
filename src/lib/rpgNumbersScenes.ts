// ============================================================================
// Roteiros de cena (Living Scene v2) — NÚMEROS, capítulo por capítulo.
// O censo do povo, o acampamento em torno da tenda, a jornada pelo deserto,
// as murmurações e o maná, os doze espias, a rebelião de Corá, a vara de Arão
// que floresce, a serpente de bronze, Balaão e a jumenta, o segundo censo e as
// fronteiras da Terra Prometida. Puramente visual/narrativo — não toca em
// progresso. Segue o padrão de Êxodo (rpgExodusScenes).
// ============================================================================

import type { ChapterScript, V2Actor, V2Prop, SceneState } from "@/lib/rpgLivingV2";

const F = (x: number, role: V2Actor["role"], action: V2Actor["action"], palette?: V2Actor["palette"], extra: Partial<V2Actor> = {}): V2Actor => ({ x, role, action, palette, ...extra });
const AN = (x: number, animal: NonNullable<V2Actor["animal"]>, scale = 1, color?: string): V2Actor => ({ x, kind: "animal", animal, scale, color });
const P = (kind: string, x: number, scale = 1, fire?: number): V2Prop => ({ kind, x, scale, ...(fire != null ? { fire } : {}) });
const kf = (v: number, state: SceneState) => ({ v, state });

export const NUMBERS_SCENES: Record<number, ChapterScript> = {
  1: {
    keyframes: [
      kf(1, { terrain: "desert", props: [P("tent", 0.5, 1.3)], actors: [F(0.32, "man", "stand", "brown"), F(0.5, "man", "stand", "white")] }),
      kf(4, { terrain: "desert", crowd: 0.7, props: [P("tent", 0.7, 1.1)], actors: [F(0.3, "elder", "stand", "gray"), F(0.5, "elder", "stand", "sand"), F(0.7, "man", "stand", "brown")] }),
      kf(20, { terrain: "desert", crowd: 0.8, actors: [F(0.4, "warrior", "stand", "red"), F(0.6, "warrior", "stand", "brown")] }),
    ],
    beats: [
      { upTo: 3, god: "Levantai o censo de toda a congregação de Israel.", reaction: "Deus manda contar o povo no deserto do Sinai. 📜" },
      { upTo: 19, reaction: "Um chefe de cada tribo auxilia na contagem. 🏕️" },
      { upTo: 99, reaction: "Seiscentos e três mil homens de guerra. ⚔️" },
    ],
  },
  2: {
    keyframes: [
      kf(1, { terrain: "desert", props: [P("tent", 0.5, 1.4)], actors: [F(0.32, "man", "stand", "brown")] }),
      kf(3, { terrain: "desert", crowd: 0.7, props: [P("tent", 0.5, 1.3), P("tent", 0.24), P("tent", 0.78)], actors: [F(0.4, "warrior", "stand", "red"), F(0.62, "warrior", "stand", "blue")] }),
      kf(17, { terrain: "desert", crowd: 0.8, props: [P("tent", 0.5, 1.4), P("tent", 0.2), P("tent", 0.8)], actors: [F(0.5, "elder", "stand", "white")] }),
    ],
    beats: [
      { upTo: 2, god: "Cada um acampará junto ao seu estandarte.", reaction: "Deus ordena a formação do acampamento. 🚩" },
      { upTo: 16, reaction: "As tribos se dispõem ao redor da tenda. 🏕️" },
      { upTo: 99, reaction: "No centro, a Tenda do Encontro. ⛺" },
    ],
  },
  3: {
    keyframes: [
      kf(1, { terrain: "desert", props: [P("tent", 0.6, 1.3)], actors: [F(0.34, "man", "stand", "gold"), F(0.52, "man", "stand", "white")] }),
      kf(12, { terrain: "desert", glory: 0.35, props: [P("tent", 0.62, 1.3)], actors: [F(0.4, "elder", "raise", "white")] }),
      kf(38, { terrain: "desert", crowd: 0.6, props: [P("tent", 0.5, 1.4), P("altar", 0.32, 0.9, 0.6)], actors: [F(0.36, "man", "stand", "white")] }),
    ],
    beats: [
      { upTo: 10, reaction: "Os filhos de Arão, os sacerdotes. 🕯️" },
      { upTo: 37, god: "Os levitas serão meus, em lugar dos primogênitos.", reaction: "Deus separa os levitas para o seu serviço. 🤍" },
      { upTo: 99, reaction: "Cada família levita guarda a tenda. ⛺" },
    ],
  },
  4: {
    keyframes: [
      kf(1, { terrain: "desert", props: [P("tent", 0.5, 1.3), P("arkCovenant", 0.5, 0.6)], actors: [F(0.32, "man", "carry", "white")] }),
      kf(15, { terrain: "desert", crowd: 0.5, props: [P("arkCovenant", 0.5, 0.9)], actors: [F(0.3, "man", "carry", "white"), F(0.7, "man", "carry", "sand")] }),
      kf(21, { terrain: "desert", props: [P("tent", 0.4, 1.2), P("lampstand", 0.7, 0.9, 1)], actors: [F(0.4, "man", "carry", "sand")] }),
    ],
    beats: [
      { upTo: 14, god: "Os coatitas levarão as coisas santíssimas.", reaction: "As tarefas dos coatitas com a arca. 📦" },
      { upTo: 20, reaction: "Não tocarão o santuário, para que não morram. 🙏" },
      { upTo: 99, reaction: "Gersonitas e meraritas carregam a tenda. 🛠️" },
    ],
  },
  5: {
    keyframes: [
      kf(1, { terrain: "desert", props: [P("tent", 0.6, 1.2)], actors: [F(0.34, "man", "stand", "white"), F(0.58, "man", "walk", "sand")] }),
      kf(11, { terrain: "desert", props: [P("altar", 0.5, 0.9, 0.5)], actors: [F(0.36, "man", "stand", "white"), F(0.6, "woman", "stand", "sand")] }),
    ],
    beats: [
      { upTo: 10, god: "Lançai para fora do arraial todo impuro.", reaction: "A pureza do acampamento. 🕊️" },
      { upTo: 99, reaction: "A oferta dos ciúmes diante do SENHOR. ⚖️" },
    ],
  },
  6: {
    keyframes: [
      kf(1, { terrain: "desert", props: [P("altar", 0.6, 0.9, 0.6)], actors: [F(0.4, "man", "stand", "white")] }),
      kf(18, { terrain: "desert", props: [P("altar", 0.6, 0.9, 0.8)], actors: [F(0.4, "man", "kneel", "sand")] }),
      kf(22, { terrain: "desert", glory: 0.5, props: [P("tent", 0.6, 1.2)], actors: [F(0.4, "man", "raise", "gold")] }),
    ],
    beats: [
      { upTo: 17, god: "Quem fizer voto de nazireu se consagrará a mim.", reaction: "O voto do nazireu. 🌾" },
      { upTo: 21, reaction: "Cabelo, altar e consagração. 🕯️" },
      { upTo: 99, god: "O SENHOR te abençoe e te guarde; faça resplandecer o seu rosto sobre ti.", reaction: "A bênção sacerdotal. ✨" },
    ],
  },
  7: {
    keyframes: [
      kf(1, { terrain: "desert", glory: 0.4, props: [P("tent", 0.5, 1.4), P("altar", 0.32, 1, 0.9)], actors: [F(0.5, "man", "stand", "white")] }),
      kf(12, { terrain: "desert", crowd: 0.6, props: [P("altar", 0.4, 1, 0.7)], actors: [F(0.3, "elder", "carry", "sand"), F(0.6, "man", "carry", "brown"), AN(0.8, "ox", 0.9)] }),
      kf(89, { terrain: "desert", glory: 0.7, props: [P("arkCovenant", 0.5, 1)], actors: [F(0.42, "man", "kneel", "brown")] }),
    ],
    beats: [
      { upTo: 11, reaction: "Moisés unge e consagra o tabernáculo. 🎁" },
      { upTo: 88, reaction: "Os príncipes trazem ofertas de dedicação. 🐂" },
      { upTo: 99, god: undefined, reaction: "Deus fala a Moisés de sobre o propiciatório. 🗣️" },
    ],
  },
  8: {
    keyframes: [
      kf(1, { terrain: "desert", glory: 0.3, props: [P("lampstand", 0.5, 1.2, 1)], actors: [F(0.36, "man", "raise", "white")] }),
      kf(5, { terrain: "desert", crowd: 0.5, props: [P("tent", 0.7, 1.1)], actors: [F(0.34, "man", "stand", "white"), F(0.6, "man", "kneel", "sand")] }),
      kf(23, { terrain: "desert", actors: [F(0.4, "man", "stand", "white")] }),
    ],
    beats: [
      { upTo: 4, god: "As sete lâmpadas alumiarão em frente do candelabro.", reaction: "Arão acende o candelabro. 🕎" },
      { upTo: 22, reaction: "Os levitas são purificados e apresentados. 🤍" },
      { upTo: 99, reaction: "Servirão no ministério dos vinte e cinco aos cinquenta anos. 🛠️" },
    ],
  },
  9: {
    keyframes: [
      kf(1, { terrain: "desert", night: 0.4, props: [P("altar", 0.5, 0.9, 0.6)], actors: [F(0.36, "man", "stand", "brown"), AN(0.64, "sheep")] }),
      kf(15, { terrain: "desert", glory: 0.4, props: [P("tent", 0.5, 1.4), P("pillarCloud", 0.5, 1.1)], actors: [F(0.34, "man", "stand", "brown")] }),
      kf(16, { terrain: "desert", night: 0.7, props: [P("tent", 0.5, 1.4), P("pillarFire", 0.5, 1.1)], actors: [F(0.34, "man", "stand", "brown")] }),
    ],
    beats: [
      { upTo: 14, god: "Celebrai a Páscoa a seu tempo determinado.", reaction: "A Páscoa no deserto do Sinai. 🐑" },
      { upTo: 15, reaction: "A nuvem cobre o tabernáculo de dia. ☁️" },
      { upTo: 99, reaction: "De noite, como fogo — o povo só anda quando ela se levanta. 🔥" },
    ],
  },
  10: {
    keyframes: [
      kf(1, { terrain: "desert", glory: 0.3, actors: [F(0.4, "man", "raise", "white")] }),
      kf(11, { terrain: "desert", crowd: 0.8, props: [P("pillarCloud", 0.5, 1.1)], actors: [F(0.3, "man", "walk", "brown")] }),
      kf(33, { terrain: "desert", crowd: 0.7, props: [P("arkCovenant", 0.5, 0.9)], actors: [F(0.3, "man", "carry", "white"), F(0.62, "man", "walk", "brown")] }),
    ],
    beats: [
      { upTo: 10, god: "Faze duas trombetas de prata para convocar a congregação.", reaction: "As trombetas de prata. 🎺" },
      { upTo: 28, reaction: "A nuvem se ergue: Israel parte do Sinai. 🏕️" },
      { upTo: 99, god: "Levanta-te, SENHOR, e dissipem-se os teus inimigos.", reaction: "A arca segue adiante para buscar descanso. 📦" },
    ],
  },
  11: {
    keyframes: [
      kf(1, { terrain: "desert", fire: 0.6, actors: [F(0.4, "man", "raise", "brown"), F(0.66, "man", "mourn", "sand")] }),
      kf(4, { terrain: "desert", crowd: 0.6, actors: [F(0.4, "man", "mourn", "sand"), F(0.62, "man", "stand", "brown")] }),
      kf(16, { terrain: "desert", glory: 0.5, props: [P("tent", 0.6, 1.2)], actors: [F(0.3, "man", "raise", "brown"), F(0.5, "elder", "stand", "white"), F(0.7, "elder", "stand", "gray")] }),
      kf(31, { terrain: "desert", props: [P("quail", 0.28), P("quail", 0.44), P("quail", 0.6), P("quail", 0.76, 0.9)], actors: [F(0.5, "man", "stand", "brown")] }),
    ],
    beats: [
      { upTo: 3, reaction: "O povo se queixa e fogo do SENHOR consome as bordas do arraial. 🔥" },
      { upTo: 15, reaction: "Cansados do maná, choram por carne. 😔" },
      { upTo: 30, god: "Ajunta-me setenta anciãos; porei sobre eles do teu espírito.", reaction: "Setenta anciãos profetizam. 🕯️" },
      { upTo: 99, reaction: "Codornizes cobrem o acampamento — mas vem juízo. 🐦" },
    ],
  },
  12: {
    keyframes: [
      kf(1, { terrain: "desert", props: [P("tent", 0.6, 1.2)], actors: [F(0.3, "man", "stand", "brown"), F(0.5, "woman", "raise", "sand"), F(0.7, "man", "stand", "white")] }),
      kf(5, { terrain: "desert", glory: 0.5, props: [P("tent", 0.5, 1.2), P("pillarCloud", 0.5, 1)], actors: [F(0.4, "man", "bow", "brown")] }),
      kf(10, { terrain: "desert", props: [P("tent", 0.6, 1.1)], actors: [F(0.4, "woman", "mourn", "white"), F(0.62, "man", "kneel", "brown")] }),
    ],
    beats: [
      { upTo: 4, reaction: "Miriã e Arão falam contra Moisés. 😟" },
      { upTo: 9, god: "Boca a boca falo com ele; por que não temestes falar contra o meu servo?", reaction: "A glória do SENHOR desce na nuvem. ☁️" },
      { upTo: 99, reaction: "Miriã fica leprosa; Moisés intercede por ela. 🙏" },
    ],
  },
  13: {
    keyframes: [
      kf(1, { terrain: "desert", crowd: 0.5, actors: [F(0.4, "man", "raise", "brown"), F(0.62, "warrior", "stand", "red")] }),
      kf(21, { terrain: "hills", actors: [F(0.3, "man", "walk", "brown"), F(0.5, "man", "walk", "sand"), F(0.7, "man", "stand", "brown")] }),
      kf(23, { terrain: "hills", props: [P("tree", 0.72, 1.1)], actors: [F(0.4, "man", "carry", "sand"), F(0.6, "man", "carry", "brown")] }),
      kf(31, { terrain: "desert", crowd: 0.6, actors: [F(0.4, "man", "mourn", "sand"), F(0.62, "man", "raise", "brown")] }),
    ],
    beats: [
      { upTo: 20, god: "Envia homens que espiem a terra de Canaã.", reaction: "Doze espias partem para reconhecer a terra. 🗺️" },
      { upTo: 24, reaction: "Trazem um cacho de uvas do vale de Escol. 🍇" },
      { upTo: 30, reaction: "Calebe: 'Subamos, porque podemos vencê-la!' 💪" },
      { upTo: 99, reaction: "Dez espias espalham medo: 'Há gigantes na terra.' 😨" },
    ],
  },
  14: {
    keyframes: [
      kf(1, { terrain: "desert", night: 0.3, crowd: 0.7, actors: [F(0.4, "man", "mourn", "sand"), F(0.62, "man", "mourn", "brown")] }),
      kf(5, { terrain: "desert", props: [P("tent", 0.7, 1.1)], actors: [F(0.34, "man", "bow", "brown"), F(0.5, "man", "bow", "white"), F(0.68, "man", "raise", "sand")] }),
      kf(10, { terrain: "desert", glory: 0.7, props: [P("tent", 0.6, 1.2)], actors: [F(0.42, "man", "kneel", "brown")] }),
      kf(39, { terrain: "desert", crowd: 0.5, actors: [F(0.4, "man", "mourn", "sand")] }),
    ],
    beats: [
      { upTo: 4, reaction: "O povo chora e quer voltar ao Egito. 😢" },
      { upTo: 9, reaction: "Josué e Calebe rasgam as vestes: 'O SENHOR está conosco!' 🙌" },
      { upTo: 38, god: "Nesta terra cairão os vossos cadáveres; quarenta anos andareis no deserto.", reaction: "A geração incrédula não entrará na terra. 🕳️" },
      { upTo: 99, reaction: "Ainda assim tentam subir — e são derrotados. ⚔️" },
    ],
  },
  15: {
    keyframes: [
      kf(1, { terrain: "desert", props: [P("altar", 0.5, 0.9, 0.6)], actors: [F(0.4, "man", "stand", "white")] }),
      kf(32, { terrain: "desert", crowd: 0.5, actors: [F(0.4, "man", "stand", "brown"), F(0.62, "man", "lie", "sand")] }),
      kf(37, { terrain: "desert", actors: [F(0.44, "man", "stand", "blue")] }),
    ],
    beats: [
      { upTo: 31, god: "Quando entrardes na terra, fareis oferta ao SENHOR.", reaction: "Leis das ofertas na terra prometida. 🌾" },
      { upTo: 36, reaction: "Um homem profana o sábado e é punido. ⚖️" },
      { upTo: 99, god: "Fareis franjas nas bordas das vestes, para vos lembrardes dos meus mandamentos.", reaction: "As franjas azuis, sinal da aliança. 🧵" },
    ],
  },
  16: {
    keyframes: [
      kf(1, { terrain: "desert", crowd: 0.6, actors: [F(0.3, "man", "raise", "sand"), F(0.5, "man", "stand", "brown"), F(0.7, "man", "raise", "red")] }),
      kf(19, { terrain: "desert", glory: 0.7, props: [P("tent", 0.6, 1.2), P("altar", 0.34, 0.9, 0.7)], actors: [F(0.4, "man", "bow", "brown")] }),
      kf(31, { terrain: "desert", fire: 0.5, actors: [F(0.4, "man", "raise", "brown"), F(0.66, "man", "lie", "red")] }),
      kf(46, { terrain: "desert", crowd: 0.6, props: [P("altar", 0.5, 0.9, 0.9), P("smoke", 0.5, 1.6)], actors: [F(0.4, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 15, reaction: "Corá, Datã e Abirão se rebelam contra Moisés. 😠" },
      { upTo: 30, god: "Apartai-vos, para que eu os consuma num momento.", reaction: "A glória do SENHOR aparece a todos. ☁️" },
      { upTo: 40, reaction: "A terra se abre e os engole; fogo consome os duzentos e cinquenta. 🕳️🔥" },
      { upTo: 99, reaction: "Arão corre com o incenso e detém a praga. 🌫️" },
    ],
  },
  17: {
    keyframes: [
      kf(1, { terrain: "desert", props: [P("tent", 0.6, 1.2), P("staff", 0.3), P("staff", 0.42), P("staff", 0.56)], actors: [F(0.7, "man", "stand", "brown")] }),
      kf(8, { terrain: "desert", glory: 0.5, props: [P("staff", 0.5, 1.2), P("tree", 0.5, 0.7)], actors: [F(0.4, "man", "raise", "white")] }),
      kf(10, { terrain: "desert", glory: 0.4, props: [P("arkCovenant", 0.5, 0.9), P("staff", 0.5, 0.8)], actors: [F(0.4, "man", "stand", "white")] }),
    ],
    beats: [
      { upTo: 7, god: "Cada príncipe porá a sua vara diante do testemunho.", reaction: "Doze varas diante da tenda. 🌿" },
      { upTo: 9, reaction: "A vara de Arão brota, floresce e dá amêndoas! 🌸" },
      { upTo: 99, god: "Guarda a vara diante do testemunho, por sinal aos rebeldes.", reaction: "A vara é guardada junto à arca. 📦" },
    ],
  },
  18: {
    keyframes: [
      kf(1, { terrain: "desert", glory: 0.3, props: [P("tent", 0.6, 1.2), P("altar", 0.32, 0.9, 0.6)], actors: [F(0.4, "man", "stand", "gold")] }),
      kf(21, { terrain: "desert", crowd: 0.4, actors: [F(0.4, "man", "stand", "white"), F(0.62, "man", "carry", "sand")] }),
    ],
    beats: [
      { upTo: 20, god: "Tu e teus filhos guardareis o sacerdócio.", reaction: "As responsabilidades dos sacerdotes. 🕯️" },
      { upTo: 99, god: "Eu sou a tua parte e a tua herança entre os filhos de Israel.", reaction: "Os dízimos sustentam os levitas. 🌾" },
    ],
  },
  19: {
    keyframes: [
      kf(1, { terrain: "desert", props: [P("altar", 0.6, 1)], actors: [F(0.34, "man", "stand", "white"), AN(0.62, "ox", 1, "#b5432b")] }),
      kf(2, { terrain: "desert", fire: 0.4, props: [P("altar", 0.6, 1, 0.9), P("smoke", 0.6, 1.6)], actors: [F(0.4, "man", "stand", "white")] }),
      kf(11, { terrain: "desert", props: [P("well", 0.6)], actors: [F(0.4, "man", "kneel", "sand")] }),
    ],
    beats: [
      { upTo: 10, god: "Traze uma novilha ruiva, sem defeito, sobre a qual não se pôs jugo.", reaction: "A novilha vermelha, para a purificação. 🐂" },
      { upTo: 13, reaction: "As cinzas guardam a água da separação. 💧" },
      { upTo: 99, god: "Quem tocar num morto será purificado com esta água.", reaction: "A água que purifica do contato com a morte. 🕊️" },
    ],
  },
  20: {
    keyframes: [
      kf(1, { terrain: "desert", night: 0.3, props: [P("tent", 0.6, 1.1)], actors: [F(0.4, "woman", "lie", "white"), F(0.6, "man", "mourn", "brown")] }),
      kf(8, { terrain: "desert", crowd: 0.6, props: [P("staff", 0.5)], actors: [F(0.4, "man", "raise", "brown"), F(0.62, "man", "stand", "white")] }),
      kf(11, { terrain: "desert", props: [P("well", 0.6)], actors: [F(0.4, "man", "fight", "brown", { facing: 1 })] }),
      kf(22, { terrain: "mountain", glory: 0.4, actors: [F(0.4, "man", "mourn", "brown"), F(0.6, "man", "lie", "gold")] }),
    ],
    beats: [
      { upTo: 6, reaction: "Miriã morre em Cades; falta água ao povo. 😔" },
      { upTo: 9, god: "Falai à rocha, e ela dará a sua água.", reaction: "O povo contende com Moisés. 💧" },
      { upTo: 13, reaction: "Moisés fere a rocha duas vezes — e não santifica a Deus. 😢" },
      { upTo: 99, reaction: "No monte Hor, Arão morre; Eleazar o sucede. ⛰️" },
    ],
  },
  21: {
    keyframes: [
      kf(1, { terrain: "desert", actors: [F(0.34, "warrior", "fight", "brown", { facing: 1 }), F(0.66, "warrior", "fight", "red", { facing: -1 })] }),
      kf(6, { terrain: "desert", fire: 0.3, props: [P("serpent", 0.3), P("serpent", 0.5, 0.9), P("serpent", 0.7)], actors: [F(0.45, "man", "mourn", "sand")] }),
      kf(8, { terrain: "desert", glory: 0.5, props: [P("staff", 0.5, 1.2), P("serpent", 0.5, 1.3)], actors: [F(0.4, "man", "raise", "brown")] }),
      kf(23, { terrain: "hills", storm: 0.3, actors: [F(0.34, "warrior", "fight", "brown", { facing: 1 }), F(0.66, "warrior", "fight", "gray", { facing: -1 })] }),
    ],
    beats: [
      { upTo: 5, reaction: "O povo murmura contra Deus e contra Moisés. 😔" },
      { upTo: 7, reaction: "Serpentes ardentes mordem o povo; muitos morrem. 🐍" },
      { upTo: 9, god: "Faze uma serpente de bronze e põe-na sobre uma haste; quem a olhar viverá.", reaction: "A serpente de bronze levantada. ✨" },
      { upTo: 99, reaction: "Israel vence Seom e Ogue, reis dos amorreus. ⚔️" },
    ],
  },
  22: {
    keyframes: [
      kf(1, { terrain: "plain", crowd: 0.5, actors: [F(0.3, "king", "stand", "purple"), F(0.6, "man", "walk", "sand")] }),
      kf(20, { terrain: "desert", night: 0.5, glory: 0.3, actors: [F(0.45, "man", "lie", "sand")] }),
      kf(23, { terrain: "desert", glory: 0.6, actors: [F(0.34, "angel", "raise", "white"), AN(0.62, "camel", 1), F(0.72, "man", "stand", "sand")] }),
      kf(31, { terrain: "desert", glory: 0.5, actors: [F(0.34, "angel", "stand", "white"), F(0.6, "man", "bow", "sand")] }),
    ],
    beats: [
      { upTo: 14, reaction: "Balaque, rei de Moabe, manda chamar Balaão para amaldiçoar Israel. 👑" },
      { upTo: 21, god: "Vai com eles; mas só farás o que eu te disser.", reaction: "Balaão parte montado na jumenta. 🐫" },
      { upTo: 30, reaction: "O anjo barra o caminho; a jumenta fala! 😲" },
      { upTo: 99, reaction: "Balaão vê o anjo do SENHOR e se prostra. 👼" },
    ],
  },
  23: {
    keyframes: [
      kf(1, { terrain: "mountain", props: [P("altar", 0.3, 0.9, 0.8), P("altar", 0.5, 0.9, 0.8), P("altar", 0.7, 0.9, 0.8)], actors: [F(0.4, "man", "stand", "sand"), F(0.62, "king", "stand", "purple")] }),
      kf(11, { terrain: "mountain", crowd: 0.3, actors: [F(0.4, "man", "raise", "sand"), F(0.62, "king", "mourn", "purple")] }),
      kf(27, { terrain: "hills", props: [P("altar", 0.5, 0.9, 0.7)], actors: [F(0.4, "man", "raise", "sand")] }),
    ],
    beats: [
      { upTo: 10, god: undefined, reaction: "Balaão abençoa: 'Como amaldiçoarei a quem Deus não amaldiçoou?' 🌟" },
      { upTo: 24, reaction: "De novo abençoa Israel, e Balaque se irrita. 😠" },
      { upTo: 99, reaction: "Levam Balaão a outro monte para uma terceira tentativa. ⛰️" },
    ],
  },
  24: {
    keyframes: [
      kf(1, { terrain: "hills", glory: 0.4, actors: [F(0.4, "man", "raise", "sand")] }),
      kf(2, { terrain: "hills", glory: 0.5, crowd: 0.6, props: [P("tent", 0.7, 1), P("tent", 0.84, 0.9)], actors: [F(0.34, "man", "raise", "sand")] }),
      kf(17, { terrain: "hills", night: 0.5, glory: 0.4, props: [P("star", 0.5, 1.3)], actors: [F(0.4, "man", "raise", "sand")] }),
    ],
    beats: [
      { upTo: 9, god: undefined, reaction: "'Quão formosas são as tuas tendas, ó Jacó!' ⛺" },
      { upTo: 16, reaction: "O Espírito de Deus vem sobre Balaão. ✨" },
      { upTo: 99, reaction: "'Uma estrela procederá de Jacó, um cetro de Israel.' ⭐" },
    ],
  },
  25: {
    keyframes: [
      kf(1, { terrain: "plain", night: 0.3, crowd: 0.5, actors: [F(0.4, "man", "stand", "sand"), F(0.6, "woman", "stand", "red")] }),
      kf(6, { terrain: "desert", fire: 0.3, props: [P("tent", 0.7, 1.1)], actors: [F(0.4, "man", "raise", "white"), F(0.66, "man", "lie", "sand")] }),
      kf(10, { terrain: "desert", glory: 0.4, actors: [F(0.42, "man", "kneel", "white")] }),
    ],
    beats: [
      { upTo: 5, reaction: "Israel se prostitui com Moabe e adora Baal-Peor. 😔" },
      { upTo: 9, reaction: "Finéias, zeloso, detém a praga que matou milhares. ⚔️" },
      { upTo: 99, god: "Eis que lhe dou a minha aliança de paz.", reaction: "Deus honra o zelo de Finéias. 🕊️" },
    ],
  },
  26: {
    keyframes: [
      kf(1, { terrain: "desert", props: [P("tent", 0.6, 1.2)], actors: [F(0.34, "man", "stand", "brown"), F(0.52, "man", "stand", "white")] }),
      kf(2, { terrain: "desert", crowd: 0.8, actors: [F(0.4, "warrior", "stand", "red"), F(0.6, "warrior", "stand", "brown")] }),
      kf(52, { terrain: "desert", glory: 0.3, actors: [F(0.4, "man", "raise", "brown")] }),
    ],
    beats: [
      { upTo: 4, god: "Levantai o censo da nova geração, de vinte anos para cima.", reaction: "O segundo censo, na planície de Moabe. 📜" },
      { upTo: 51, reaction: "A nova geração conta seiscentos mil homens. ⚔️" },
      { upTo: 99, god: "Conforme o número, se repartirá a terra por herança.", reaction: "A terra será dividida por sorte. 🗺️" },
    ],
  },
  27: {
    keyframes: [
      kf(1, { terrain: "desert", props: [P("tent", 0.7, 1.1)], actors: [F(0.3, "woman", "stand", "sand"), F(0.46, "woman", "stand", "green"), F(0.6, "man", "stand", "brown")] }),
      kf(12, { terrain: "mountain", glory: 0.5, actors: [F(0.42, "man", "stand", "brown")] }),
      kf(18, { terrain: "desert", glory: 0.4, props: [P("tent", 0.7, 1.1)], actors: [F(0.36, "man", "raise", "white"), F(0.6, "man", "kneel", "brown")] }),
    ],
    beats: [
      { upTo: 11, god: "As filhas de Zelofeade têm direito à herança do pai.", reaction: "Justiça para as filhas de Zelofeade. ⚖️" },
      { upTo: 17, reaction: "Moisés vê a terra de longe, mas não entrará. ⛰️" },
      { upTo: 99, god: "Toma Josué, homem em quem há o Espírito, e impõe-lhe as mãos.", reaction: "Josué é escolhido como sucessor. 🙌" },
    ],
  },
  28: {
    keyframes: [
      kf(1, { terrain: "desert", props: [P("altar", 0.5, 1, 0.8), P("smoke", 0.5, 1.6)], actors: [F(0.38, "man", "stand", "white")] }),
      kf(16, { terrain: "desert", glory: 0.3, props: [P("altar", 0.5, 1, 0.9)], actors: [F(0.4, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 15, god: "Cuidareis de me oferecer a oferta a seu tempo determinado.", reaction: "O holocausto contínuo, manhã e tarde. 🔥" },
      { upTo: 99, reaction: "As ofertas do sábado, das luas novas e da Páscoa. 🌾" },
    ],
  },
  29: {
    keyframes: [
      kf(1, { terrain: "desert", props: [P("altar", 0.5, 1, 0.8)], actors: [F(0.38, "man", "raise", "white")] }),
      kf(12, { terrain: "desert", glory: 0.3, props: [P("tent", 0.3, 1), P("altar", 0.6, 1, 0.8), P("palm", 0.82, 1.1)], actors: [F(0.4, "man", "stand", "white")] }),
    ],
    beats: [
      { upTo: 11, god: "No sétimo mês tereis santa convocação ao som das trombetas.", reaction: "A festa das trombetas e o dia da expiação. 🎺" },
      { upTo: 99, reaction: "A festa dos tabernáculos, com suas ofertas. ⛺" },
    ],
  },
  30: {
    keyframes: [
      kf(1, { terrain: "desert", props: [P("tent", 0.7, 1.1)], actors: [F(0.36, "man", "stand", "white"), F(0.6, "man", "raise", "brown")] }),
      kf(3, { terrain: "desert", props: [P("tent", 0.7, 1.1)], actors: [F(0.4, "woman", "stand", "sand"), F(0.62, "elder", "stand", "gray")] }),
    ],
    beats: [
      { upTo: 2, god: "Quando alguém fizer voto ao SENHOR, não violará a sua palavra.", reaction: "A força do voto e do juramento. 🤍" },
      { upTo: 99, reaction: "As leis sobre os votos das mulheres na casa. ⚖️" },
    ],
  },
  31: {
    keyframes: [
      kf(1, { terrain: "desert", crowd: 0.4, actors: [F(0.4, "man", "raise", "brown"), F(0.62, "warrior", "stand", "red")] }),
      kf(7, { terrain: "plain", storm: 0.3, actors: [F(0.34, "warrior", "fight", "brown", { facing: 1 }), F(0.66, "warrior", "fight", "purple", { facing: -1 })] }),
      kf(48, { terrain: "desert", props: [P("altar", 0.5, 0.9, 0.6)], actors: [F(0.4, "man", "stand", "white"), F(0.62, "warrior", "carry", "sand")] }),
    ],
    beats: [
      { upTo: 6, god: "Vinga os filhos de Israel dos midianitas.", reaction: "Israel se arma contra Midiã. ⚔️" },
      { upTo: 12, reaction: "Midiã é vencida; Balaão também é morto. 🗡️" },
      { upTo: 99, reaction: "O despojo é repartido e uma oferta é levada ao SENHOR. 🎁" },
    ],
  },
  32: {
    keyframes: [
      kf(1, { terrain: "field", crowd: 0.4, actors: [F(0.34, "man", "stand", "brown"), AN(0.6, "sheep"), AN(0.74, "ox", 0.9), AN(0.88, "sheep")] }),
      kf(16, { terrain: "desert", props: [P("tent", 0.7, 1.1)], actors: [F(0.36, "man", "stand", "brown"), F(0.6, "warrior", "raise", "red")] }),
      kf(33, { terrain: "hills", crowd: 0.5, props: [P("tower", 0.7, 1.1)], actors: [F(0.4, "man", "walk", "brown")] }),
    ],
    beats: [
      { upTo: 15, reaction: "Rúben e Gade pedem terra a leste do Jordão para os rebanhos. 🐑" },
      { upTo: 27, reaction: "Prometem lutar com os irmãos até a conquista. 🤝" },
      { upTo: 99, reaction: "Recebem Gileade e edificam suas cidades. 🏙️" },
    ],
  },
  33: {
    keyframes: [
      kf(1, { terrain: "desert", crowd: 0.7, props: [P("pillarCloud", 0.5, 1)], actors: [F(0.3, "man", "walk", "brown")] }),
      kf(9, { terrain: "desert", props: [P("well", 0.4), P("palm", 0.6, 1.1), P("palm", 0.76, 1)], actors: [F(0.4, "man", "kneel", "brown")] }),
      kf(50, { terrain: "plain", glory: 0.3, actors: [F(0.4, "man", "raise", "brown")] }),
    ],
    beats: [
      { upTo: 8, reaction: "As etapas da jornada, desde o Egito. 🗺️" },
      { upTo: 49, reaction: "De Elim ao Jordão, o SENHOR os guiou por tudo. 🏕️" },
      { upTo: 99, god: "Expulsareis os moradores da terra e a possuireis.", reaction: "Israel se prepara para entrar em Canaã. ⚔️" },
    ],
  },
  34: {
    keyframes: [
      kf(1, { terrain: "hills", glory: 0.3, actors: [F(0.4, "man", "raise", "brown")] }),
      kf(13, { terrain: "field", crowd: 0.4, actors: [F(0.34, "man", "stand", "white"), F(0.58, "elder", "stand", "sand")] }),
    ],
    beats: [
      { upTo: 12, god: "Esta será a vossa terra, com os seus limites ao redor.", reaction: "As fronteiras da Terra Prometida. 🗺️" },
      { upTo: 99, god: "Estes são os homens que vos repartirão a terra por herança.", reaction: "Os chefes que dividirão a herança. ⚖️" },
    ],
  },
  35: {
    keyframes: [
      kf(1, { terrain: "hills", props: [P("tower", 0.5, 1.1)], actors: [F(0.34, "man", "stand", "white"), F(0.6, "man", "stand", "brown")] }),
      kf(9, { terrain: "city", crowd: 0.4, props: [P("tower", 0.3, 1), P("tower", 0.72, 1.1)], actors: [F(0.5, "man", "walk", "sand")] }),
    ],
    beats: [
      { upTo: 8, god: "Dareis aos levitas cidades para habitarem, com seus arredores.", reaction: "As cidades dos levitas. 🏙️" },
      { upTo: 99, god: "Sereis seis cidades de refúgio para o que matar sem intenção.", reaction: "As cidades de refúgio, para a justiça. 🕊️" },
    ],
  },
  36: {
    keyframes: [
      kf(1, { terrain: "desert", props: [P("tent", 0.7, 1.1)], actors: [F(0.3, "elder", "stand", "gray"), F(0.5, "man", "stand", "brown")] }),
      kf(10, { terrain: "field", glory: 0.3, actors: [F(0.36, "woman", "stand", "sand"), F(0.56, "woman", "stand", "green"), F(0.74, "woman", "stand", "blue")] }),
    ],
    beats: [
      { upTo: 9, god: "As filhas de Zelofeade se casarão na tribo de seus pais.", reaction: "A herança permanece dentro da tribo. 🤝" },
      { upTo: 99, reaction: "Assim se cumprem os mandamentos nas planícies de Moabe. ✨" },
    ],
  },
};
