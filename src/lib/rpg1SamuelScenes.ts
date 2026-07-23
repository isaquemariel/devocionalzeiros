// ============================================================================
// Roteiros de cena (Living Scene v2) — 1 SAMUEL, capítulo por capítulo.
// A oração de Ana e o nascimento de Samuel, o chamado noturno de Deus, a arca
// capturada pelos filisteus, a unção de Saul, a unção de Davi, Davi e Golias,
// a amizade com Jônatas e a fuga diante de Saul. Puramente visual/narrativo —
// não toca em progresso. Segue o padrão de Êxodo (rpgExodusScenes).
// ============================================================================

import type { ChapterScript, V2Actor, V2Prop, SceneState } from "@/lib/rpgLivingV2";

const F = (x: number, role: V2Actor["role"], action: V2Actor["action"], palette?: V2Actor["palette"], extra: Partial<V2Actor> = {}): V2Actor => ({ x, role, action, palette, ...extra });
const AN = (x: number, animal: NonNullable<V2Actor["animal"]>, scale = 1, color?: string): V2Actor => ({ x, kind: "animal", animal, scale, color });
const P = (kind: string, x: number, scale = 1, fire?: number): V2Prop => ({ kind, x, scale, ...(fire != null ? { fire } : {}) });
const kf = (v: number, state: SceneState) => ({ v, state });

export const SAMUEL1_SCENES: Record<number, ChapterScript> = {
  1: {
    keyframes: [
      kf(1, { terrain: "hills", props: [P("tent", 0.7)], actors: [F(0.35, "man", "stand", "brown"), F(0.55, "woman", "mourn", "blue"), F(0.72, "woman", "stand", "sand")] }),
      kf(9, { terrain: "city", glory: 0.3, props: [P("tent", 0.6, 1.3)], actors: [F(0.4, "woman", "kneel", "blue"), F(0.66, "elder", "stand", "white")] }),
      kf(19, { terrain: "hills", props: [P("tent", 0.7)], actors: [F(0.45, "woman", "carry", "blue"), F(0.6, "man", "stand", "brown")] }),
      kf(24, { terrain: "city", glory: 0.4, props: [P("tent", 0.62, 1.3), P("altar", 0.4)], actors: [F(0.36, "woman", "raise", "blue"), F(0.55, "child", "stand", "white"), F(0.72, "elder", "stand", "white")] }),
    ],
    beats: [
      { upTo: 8, reaction: "Ana, sem filhos, chora e é provocada por Penina. 😢" },
      { upTo: 18, reaction: "No templo, Ana ora em silêncio e faz um voto ao SENHOR. 🙏" },
      { upTo: 20, god: "O SENHOR se lembrou dela.", reaction: "Nasce Samuel — 'do SENHOR o pedi'. 👶" },
      { upTo: 99, reaction: "Ana entrega o menino para servir a Deus em Siló. 🤍" },
    ],
  },
  2: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.6, props: [P("tent", 0.66, 1.2)], actors: [F(0.45, "woman", "raise", "blue")] }),
      kf(11, { terrain: "city", glory: 0.3, props: [P("altar", 0.4), P("lampstand", 0.7, 1, 1)], actors: [F(0.5, "child", "stand", "white"), F(0.7, "elder", "stand", "white")] }),
      kf(18, { terrain: "city", glory: 0.4, props: [P("tent", 0.7)], actors: [F(0.5, "child", "stand", "white"), F(0.3, "woman", "carry", "blue")] }),
      kf(22, { terrain: "city", night: 0.3, props: [P("altar", 0.5)], actors: [F(0.35, "man", "stand", "sand"), F(0.6, "elder", "mourn", "white")] }),
    ],
    beats: [
      { upTo: 10, god: undefined, reaction: "Cântico de Ana: 'O meu coração exulta no SENHOR!' 🎶" },
      { upTo: 17, reaction: "Samuel serve diante do SENHOR; os filhos de Eli pecam. 🕯️" },
      { upTo: 26, reaction: "O menino Samuel cresce em graça diante de Deus e dos homens. 🌱" },
      { upTo: 99, god: "Honrarei os que me honram; os que me desprezam serão aviltados.", reaction: "Um homem de Deus anuncia juízo à casa de Eli. ⚖️" },
    ],
  },
  3: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.7, props: [P("lampstand", 0.7, 1, 1), P("arkCovenant", 0.3)], actors: [F(0.5, "child", "lie", "white")] }),
      kf(4, { terrain: "city", night: 0.6, glory: 0.5, props: [P("lampstand", 0.7, 1, 1)], actors: [F(0.5, "child", "stand", "white")] }),
      kf(8, { terrain: "city", night: 0.5, glory: 0.4, actors: [F(0.4, "child", "stand", "white"), F(0.66, "elder", "stand", "white")] }),
      kf(10, { terrain: "city", night: 0.4, glory: 0.8, actors: [F(0.5, "child", "kneel", "white")] }),
    ],
    beats: [
      { upTo: 3, reaction: "De noite, a palavra do SENHOR era rara em Israel. 🌙" },
      { upTo: 9, god: "Samuel! Samuel!", reaction: "Uma voz chama o menino no escuro. ✨" },
      { upTo: 14, god: "Fala, SENHOR, que o teu servo ouve.", reaction: "Deus revela o seu juízo a Samuel. 🕯️" },
      { upTo: 99, reaction: "Todo o Israel soube: Samuel é profeta do SENHOR. 📜" },
    ],
  },
  4: {
    keyframes: [
      kf(1, { terrain: "field", crowd: 0.6, actors: [F(0.3, "warrior", "fight", "brown", { facing: 1 }), F(0.7, "warrior", "fight", "red", { facing: -1 })] }),
      kf(4, { terrain: "field", crowd: 0.6, props: [P("arkCovenant", 0.5, 1.1)], actors: [F(0.32, "man", "raise", "brown"), F(0.66, "warrior", "stand", "red")] }),
      kf(10, { terrain: "field", storm: 0.4, crowd: 0.7, props: [P("arkCovenant", 0.7, 0.9)], actors: [F(0.35, "warrior", "fight", "red", { facing: -1 }), F(0.6, "warrior", "lie", "brown")] }),
      kf(17, { terrain: "city", night: 0.4, props: [P("tent", 0.7)], actors: [F(0.4, "man", "mourn", "sand"), F(0.62, "elder", "lie", "white")] }),
    ],
    beats: [
      { upTo: 3, reaction: "Israel é derrotado pelos filisteus em Ebenézer. ⚔️" },
      { upTo: 9, reaction: "Levam a arca da aliança para a batalha. 📦" },
      { upTo: 11, reaction: "A arca é capturada; os filhos de Eli morrem. 😢" },
      { upTo: 99, reaction: "Eli cai e morre ao saber: 'A glória se foi de Israel.' 💔" },
    ],
  },
  5: {
    keyframes: [
      kf(1, { terrain: "city", props: [P("arkCovenant", 0.5, 1.1), P("tower", 0.82, 1.1)], actors: [F(0.7, "warrior", "bow", "red")] }),
      kf(3, { terrain: "city", night: 0.3, props: [P("arkCovenant", 0.5), P("tower", 0.8, 1.1)], actors: [F(0.4, "warrior", "mourn", "red")] }),
      kf(9, { terrain: "city", night: 0.4, props: [P("arkCovenant", 0.5)], actors: [F(0.35, "man", "mourn", "sand"), F(0.62, "man", "mourn", "gray")] }),
    ],
    beats: [
      { upTo: 5, reaction: "Diante da arca, o ídolo Dagom cai por terra, quebrado. 🗿" },
      { upTo: 8, reaction: "A mão do SENHOR pesa sobre as cidades filisteias. 😣" },
      { upTo: 99, reaction: "Aflitos com tumores, clamam: tirem daqui a arca! 😰" },
    ],
  },
  6: {
    keyframes: [
      kf(1, { terrain: "city", props: [P("arkCovenant", 0.5), P("tower", 0.82, 1)], actors: [F(0.35, "man", "stand", "gray"), F(0.6, "man", "stand", "sand")] }),
      kf(10, { terrain: "field", props: [P("arkCovenant", 0.5, 1)], actors: [AN(0.34, "ox", 1), AN(0.5, "ox", 1)] }),
      kf(13, { terrain: "field", glory: 0.4, crowd: 0.5, props: [P("arkCovenant", 0.5, 1)], actors: [F(0.36, "man", "raise", "brown"), F(0.7, "man", "bow", "sand")] }),
    ],
    beats: [
      { upTo: 9, reaction: "Os filisteus devolvem a arca com ofertas de ouro. 🎁" },
      { upTo: 12, reaction: "Duas vacas puxam o carro direto para Israel. 🐂" },
      { upTo: 99, reaction: "Bete-Semes se alegra ao ver voltar a arca do SENHOR. ✨" },
    ],
  },
  7: {
    keyframes: [
      kf(1, { terrain: "hills", props: [P("arkCovenant", 0.5), P("tent", 0.76)], actors: [F(0.36, "man", "stand", "white")] }),
      kf(5, { terrain: "hills", glory: 0.3, props: [P("altar", 0.5, 1, 0.6)], actors: [F(0.4, "man", "kneel", "white"), F(0.66, "man", "kneel", "brown")] }),
      kf(10, { terrain: "field", storm: 0.7, crowd: 0.5, actors: [F(0.35, "man", "raise", "white"), F(0.7, "warrior", "mourn", "red")] }),
      kf(12, { terrain: "hills", glory: 0.4, props: [P("altar", 0.5)], actors: [F(0.45, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 4, reaction: "Samuel chama Israel: 'Deixai os deuses estranhos!' 🙏" },
      { upTo: 9, reaction: "O povo se reúne em Mispá, jejua e confessa. 🕯️" },
      { upTo: 11, god: "O SENHOR trovejou naquele dia sobre os filisteus.", reaction: "Deus dispersa o inimigo com grande trovão. ⚡" },
      { upTo: 99, reaction: "Samuel ergue a pedra Ebenézer: 'Até aqui nos ajudou o SENHOR.' 🪨" },
    ],
  },
  8: {
    keyframes: [
      kf(1, { terrain: "city", actors: [F(0.4, "elder", "stand", "white"), F(0.6, "man", "stand", "brown")] }),
      kf(4, { terrain: "city", crowd: 0.7, actors: [F(0.35, "elder", "raise", "white"), F(0.62, "man", "raise", "sand")] }),
      kf(19, { terrain: "city", crowd: 0.7, actors: [F(0.4, "elder", "mourn", "white"), F(0.66, "man", "raise", "brown")] }),
    ],
    beats: [
      { upTo: 3, reaction: "Samuel envelhece e seus filhos não andam nos seus caminhos. 👴" },
      { upTo: 9, god: "Não te rejeitaram a ti, mas a mim, para eu não reinar sobre eles.", reaction: "Os anciãos pedem: 'Dá-nos um rei!' 👑" },
      { upTo: 18, reaction: "Samuel adverte: o rei vos exigirá filhos, campos e tributos. ⚖️" },
      { upTo: 99, reaction: "O povo insiste: 'Queremos um rei como as outras nações!' 🗣️" },
    ],
  },
  9: {
    keyframes: [
      kf(1, { terrain: "desert", actors: [F(0.4, "king", "walk", "sand"), F(0.6, "servant", "walk", "brown")] }),
      kf(5, { terrain: "hills", actors: [F(0.4, "king", "stand", "sand"), F(0.62, "servant", "stand", "brown")] }),
      kf(14, { terrain: "city", glory: 0.3, props: [P("well", 0.72)], actors: [F(0.36, "king", "stand", "sand"), F(0.6, "man", "raise", "white")] }),
      kf(22, { terrain: "city", props: [P("tent", 0.7)], actors: [F(0.4, "man", "stand", "white"), F(0.64, "king", "bow", "sand")] }),
    ],
    beats: [
      { upTo: 4, reaction: "Saul, um jovem alto, sai à procura das jumentas perdidas. 🫏" },
      { upTo: 13, reaction: "O servo sugere consultar o vidente da cidade. 👀" },
      { upTo: 17, god: "Eis o homem de quem te falei; ele reinará sobre o meu povo.", reaction: "Deus mostra Saul a Samuel. ✨" },
      { upTo: 99, reaction: "Samuel honra Saul num banquete e o retém. 🍽️" },
    ],
  },
  10: {
    keyframes: [
      kf(1, { terrain: "hills", glory: 0.6, actors: [F(0.4, "man", "raise", "white"), F(0.62, "king", "bow", "sand")] }),
      kf(9, { terrain: "hills", glory: 0.5, actors: [F(0.5, "king", "raise", "gold")] }),
      kf(17, { terrain: "city", crowd: 0.8, actors: [F(0.35, "man", "raise", "white"), F(0.66, "king", "stand", "gold")] }),
      kf(24, { terrain: "city", glory: 0.4, crowd: 0.8, actors: [F(0.5, "king", "raise", "gold")] }),
    ],
    beats: [
      { upTo: 8, reaction: "Samuel derrama o azeite sobre Saul: eis o ungido do SENHOR. 🫒👑" },
      { upTo: 13, god: "O Espírito do SENHOR se apoderará de ti, e serás outro homem.", reaction: "Saul profetiza com os profetas. 🔥" },
      { upTo: 23, reaction: "Em Mispá, a sorte recai sobre Saul, que se escondera. 🎲" },
      { upTo: 99, reaction: "O povo aclama: 'Viva o rei!' 🎉" },
    ],
  },
  11: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.5, props: [P("tower", 0.82, 1.1)], actors: [F(0.4, "man", "mourn", "sand"), F(0.7, "warrior", "stand", "red")] }),
      kf(6, { terrain: "hills", glory: 0.4, actors: [F(0.5, "king", "raise", "gold")] }),
      kf(11, { terrain: "field", storm: 0.4, crowd: 0.7, actors: [F(0.3, "warrior", "fight", "brown", { facing: 1 }), F(0.7, "warrior", "fight", "red", { facing: -1 })] }),
      kf(15, { terrain: "hills", glory: 0.4, crowd: 0.6, props: [P("altar", 0.5)], actors: [F(0.5, "king", "raise", "gold")] }),
    ],
    beats: [
      { upTo: 5, reaction: "Naás, o amonita, cerca Jabes-Gileade e a ameaça. ⚔️" },
      { upTo: 10, god: "O Espírito de Deus se apoderou de Saul com grande força.", reaction: "Saul convoca todo o Israel à guerra. 🔥" },
      { upTo: 13, reaction: "Ao amanhecer, os amonitas são derrotados e dispersos. 🌅" },
      { upTo: 99, reaction: "Em Gilgal, confirmam Saul como rei diante do SENHOR. 👑" },
    ],
  },
  12: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.7, actors: [F(0.5, "elder", "raise", "white")] }),
      kf(6, { terrain: "city", crowd: 0.6, actors: [F(0.4, "elder", "stand", "white"), F(0.66, "king", "stand", "gold")] }),
      kf(16, { terrain: "field", storm: 0.8, rain: 0.7, crowd: 0.5, actors: [F(0.45, "elder", "raise", "white")] }),
    ],
    beats: [
      { upTo: 5, reaction: "Samuel se despede: 'De quem tomei algo? Testemunhai contra mim.' 🤍" },
      { upTo: 15, reaction: "Ele relembra a fidelidade de Deus na história de Israel. 📜" },
      { upTo: 18, god: undefined, reaction: "Ao clamor de Samuel, Deus envia trovões e chuva na ceifa. ⚡🌧️" },
      { upTo: 99, god: undefined, reaction: "'Servi ao SENHOR de todo o coração', exorta o profeta. 🙏" },
    ],
  },
  13: {
    keyframes: [
      kf(1, { terrain: "hills", crowd: 0.5, actors: [F(0.4, "king", "stand", "gold"), F(0.66, "warrior", "stand", "brown")] }),
      kf(5, { terrain: "hills", storm: 0.3, crowd: 0.7, actors: [F(0.7, "warrior", "fight", "red", { facing: -1 })] }),
      kf(9, { terrain: "hills", props: [P("altar", 0.5, 1, 0.7)], actors: [F(0.45, "king", "raise", "gold")] }),
      kf(11, { terrain: "hills", glory: 0.3, props: [P("altar", 0.5)], actors: [F(0.35, "man", "raise", "white"), F(0.64, "king", "mourn", "gold")] }),
    ],
    beats: [
      { upTo: 4, reaction: "Jônatas fere a guarnição filisteia; a guerra se acende. ⚔️" },
      { upTo: 8, reaction: "Os filisteus se ajuntam como areia; o povo treme e se esconde. 😨" },
      { upTo: 10, reaction: "Impaciente, Saul oferece o holocausto ele mesmo. 🔥" },
      { upTo: 99, god: "Procedeste loucamente; o teu reino não permanecerá.", reaction: "Samuel repreende a desobediência de Saul. 😔" },
    ],
  },
  14: {
    keyframes: [
      kf(1, { terrain: "mountain", actors: [F(0.4, "warrior", "stand", "blue"), F(0.6, "servant", "stand", "brown")] }),
      kf(6, { terrain: "mountain", glory: 0.4, actors: [F(0.35, "warrior", "fight", "blue", { facing: 1 }), F(0.66, "warrior", "fight", "red", { facing: -1 })] }),
      kf(15, { terrain: "mountain", storm: 0.6, crowd: 0.6, actors: [F(0.4, "warrior", "fight", "brown", { facing: 1 }), F(0.7, "warrior", "mourn", "red")] }),
      kf(24, { terrain: "field", night: 0.3, actors: [F(0.45, "king", "stand", "gold"), F(0.66, "warrior", "stand", "blue")] }),
    ],
    beats: [
      { upTo: 5, reaction: "Jônatas e seu escudeiro sobem sozinhos contra os filisteus. ⚔️" },
      { upTo: 14, god: "Para o SENHOR não é difícil salvar com muitos ou com poucos.", reaction: "Deus dá vitória pela fé de Jônatas. 🙌" },
      { upTo: 23, reaction: "O terror de Deus cai sobre o arraial filisteu. ⚡" },
      { upTo: 99, reaction: "O juramento precipitado de Saul quase mata Jônatas. 😰" },
    ],
  },
  15: {
    keyframes: [
      kf(1, { terrain: "city", actors: [F(0.4, "man", "raise", "white"), F(0.64, "king", "stand", "gold")] }),
      kf(7, { terrain: "desert", crowd: 0.6, actors: [F(0.35, "king", "fight", "gold", { facing: 1 }), F(0.7, "warrior", "mourn", "red")] }),
      kf(13, { terrain: "field", actors: [F(0.35, "man", "stand", "white"), F(0.64, "king", "raise", "gold"), AN(0.82, "sheep")] }),
      kf(22, { terrain: "field", night: 0.3, actors: [F(0.4, "man", "mourn", "white"), F(0.64, "king", "mourn", "gold")] }),
    ],
    beats: [
      { upTo: 6, god: "Vai e fere Amaleque; não poupes nada do que é dele.", reaction: "Deus ordena o juízo contra Amaleque. ⚔️" },
      { upTo: 12, reaction: "Saul poupa o rei Agague e o melhor do gado. 🐑" },
      { upTo: 21, god: "Eis que o obedecer é melhor do que o sacrificar.", reaction: "Samuel confronta a rebeldia de Saul. ⚖️" },
      { upTo: 99, reaction: "O SENHOR rejeita Saul como rei; Samuel se entristece. 💔" },
    ],
  },
  16: {
    keyframes: [
      kf(1, { terrain: "hills", props: [P("tent", 0.74)], actors: [F(0.4, "man", "walk", "white"), AN(0.7, "sheep")] }),
      kf(6, { terrain: "city", crowd: 0.5, actors: [F(0.35, "man", "stand", "white"), F(0.55, "man", "stand", "brown"), F(0.72, "man", "stand", "sand")] }),
      kf(11, { terrain: "hills", glory: 0.4, actors: [F(0.4, "man", "stand", "white"), F(0.62, "shepherd", "walk", "brown"), AN(0.82, "sheep")] }),
      kf(13, { terrain: "hills", glory: 0.85, props: [P("altar", 0.3)], actors: [F(0.4, "man", "raise", "white"), F(0.62, "child", "kneel", "red")] }),
    ],
    beats: [
      { upTo: 5, god: "Não olhes para a sua aparência; o SENHOR olha o coração.", reaction: "Deus envia Samuel a Belém, à casa de Jessé. 🫒" },
      { upTo: 10, reaction: "Sete filhos passam, mas nenhum é o escolhido. 👀" },
      { upTo: 12, god: "Levanta-te e unge-o; é este mesmo!", reaction: "Vem Davi, o mais novo, dos rebanhos. 🐑" },
      { upTo: 99, reaction: "Samuel unge Davi, e o Espírito do SENHOR desce sobre ele. ✨👑" },
    ],
  },
  17: {
    keyframes: [
      kf(1, { terrain: "hills", crowd: 0.6, actors: [F(0.3, "warrior", "stand", "brown", { facing: 1 }), F(0.72, "warrior", "stand", "red", { facing: -1, scale: 1.6 })] }),
      kf(16, { terrain: "field", actors: [F(0.4, "shepherd", "walk", "brown"), F(0.66, "warrior", "stand", "red", { scale: 1.6 })] }),
      kf(40, { terrain: "field", actors: [F(0.3, "child", "stand", "brown", { facing: 1 }), F(0.72, "warrior", "fight", "red", { facing: -1, scale: 1.6 })] }),
      kf(48, { terrain: "hills", glory: 0.3, actors: [F(0.34, "child", "raise", "brown", { facing: 1 }), F(0.68, "warrior", "lie", "red", { scale: 1.5 })] }),
    ],
    beats: [
      { upTo: 11, reaction: "O gigante Golias desafia Israel, e todos tremem. 😨" },
      { upTo: 30, reaction: "Davi chega ao acampamento e ouve a afronta. 🗣️" },
      { upTo: 47, god: undefined, reaction: "'Tu vens com espada; eu, em nome do SENHOR dos Exércitos!' 🙌" },
      { upTo: 99, reaction: "Uma pedra da funda derruba o gigante. Israel vence! 🪨⚔️" },
    ],
  },
  18: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.3, actors: [F(0.4, "warrior", "stand", "blue"), F(0.6, "warrior", "stand", "brown")] }),
      kf(6, { terrain: "city", crowd: 0.7, actors: [F(0.35, "woman", "raise", "purple"), F(0.55, "woman", "raise", "green"), F(0.75, "king", "mourn", "gold")] }),
      kf(10, { terrain: "city", night: 0.4, props: [P("staff", 0.72)], actors: [F(0.35, "warrior", "stand", "brown"), F(0.66, "king", "fight", "gold", { facing: -1 })] }),
    ],
    beats: [
      { upTo: 5, reaction: "A alma de Jônatas se liga à de Davi; tornam-se amigos. 🤝" },
      { upTo: 9, reaction: "As mulheres cantam: 'Saul, mil; Davi, dez mil!' 🎶" },
      { upTo: 16, reaction: "Saul, com inveja, olha Davi com maus olhos. 😠" },
      { upTo: 99, reaction: "Davi casa com Mical; Saul o teme cada vez mais. 💍" },
    ],
  },
  19: {
    keyframes: [
      kf(1, { terrain: "city", actors: [F(0.4, "warrior", "stand", "blue"), F(0.62, "king", "stand", "gold")] }),
      kf(10, { terrain: "city", night: 0.6, props: [P("staff", 0.7)], actors: [F(0.35, "warrior", "walk", "brown", { facing: -1 }), F(0.66, "king", "fight", "gold", { facing: -1 })] }),
      kf(12, { terrain: "city", night: 0.7, props: [P("tower", 0.8, 1)], actors: [F(0.4, "woman", "raise", "green"), F(0.6, "man", "walk", "brown", { facing: -1 })] }),
      kf(20, { terrain: "hills", glory: 0.4, actors: [F(0.4, "man", "raise", "white"), F(0.64, "man", "kneel", "gold")] }),
    ],
    beats: [
      { upTo: 7, reaction: "Jônatas defende Davi diante do pai. 🤝" },
      { upTo: 11, reaction: "Saul atira a lança, mas Davi escapa. 🏃" },
      { upTo: 17, reaction: "Mical desce Davi por uma janela; ele foge de noite. 🌙" },
      { upTo: 99, reaction: "Em Ramá, o Espírito de Deus surpreende os mensageiros. ✨" },
    ],
  },
  20: {
    keyframes: [
      kf(1, { terrain: "city", actors: [F(0.4, "warrior", "mourn", "brown"), F(0.62, "warrior", "stand", "blue")] }),
      kf(11, { terrain: "field", actors: [F(0.4, "warrior", "stand", "brown"), F(0.6, "warrior", "raise", "blue")] }),
      kf(18, { terrain: "city", night: 0.4, actors: [F(0.66, "king", "fight", "gold", { facing: -1 })] }),
      kf(35, { terrain: "field", night: 0.2, actors: [F(0.4, "warrior", "raise", "blue"), F(0.7, "child", "walk", "brown")] }),
    ],
    beats: [
      { upTo: 10, reaction: "Davi teme por sua vida; Jônatas promete ajudá-lo. 🤝" },
      { upTo: 23, reaction: "Fazem um pacto de lealdade diante do SENHOR. 🤍" },
      { upTo: 34, reaction: "À mesa, a ira de Saul revela seu intento contra Davi. 😠" },
      { upTo: 99, reaction: "Pelas flechas, Jônatas avisa o amigo; despedem-se chorando. 😢" },
    ],
  },
  21: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.3, props: [P("altar", 0.7)], actors: [F(0.4, "warrior", "stand", "brown"), F(0.64, "elder", "stand", "white")] }),
      kf(8, { terrain: "city", props: [P("staff", 0.7)], actors: [F(0.5, "warrior", "carry", "brown")] }),
      kf(10, { terrain: "city", crowd: 0.5, actors: [F(0.4, "warrior", "bow", "brown"), F(0.66, "king", "stand", "red")] }),
    ],
    beats: [
      { upTo: 6, reaction: "Faminto e em fuga, Davi recebe os pães sagrados em Nobe. 🍞" },
      { upTo: 9, reaction: "Recebe também a espada de Golias, guardada ali. ⚔️" },
      { upTo: 99, reaction: "Diante de Aquis, Davi finge loucura para escapar. 😜" },
    ],
  },
  22: {
    keyframes: [
      kf(1, { terrain: "mountain", crowd: 0.5, actors: [F(0.4, "warrior", "stand", "brown"), F(0.6, "man", "stand", "sand")] }),
      kf(6, { terrain: "city", night: 0.3, props: [P("staff", 0.72)], actors: [F(0.55, "king", "raise", "gold")] }),
      kf(18, { terrain: "city", night: 0.5, props: [P("altar", 0.7)], actors: [F(0.4, "warrior", "fight", "red", { facing: 1 }), F(0.66, "elder", "lie", "white")] }),
    ],
    beats: [
      { upTo: 5, reaction: "Na caverna de Adulão, ajuntam-se os aflitos a Davi. 🕳️" },
      { upTo: 10, reaction: "Doegue denuncia o sacerdote que ajudou Davi. 🗣️" },
      { upTo: 99, reaction: "Saul manda matar os sacerdotes de Nobe; só Abiatar escapa. 😢" },
    ],
  },
  23: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.3, actors: [F(0.4, "warrior", "raise", "brown"), F(0.7, "warrior", "fight", "red", { facing: -1 })] }),
      kf(14, { terrain: "desert", actors: [F(0.4, "warrior", "walk", "brown")] }),
      kf(16, { terrain: "mountain", glory: 0.3, actors: [F(0.4, "warrior", "stand", "brown"), F(0.6, "warrior", "raise", "blue")] }),
      kf(26, { terrain: "mountain", actors: [F(0.3, "warrior", "walk", "brown", { facing: -1 }), F(0.72, "king", "walk", "gold", { facing: 1 })] }),
    ],
    beats: [
      { upTo: 5, god: "Vai, e ferirás os filisteus; salvarás Queila.", reaction: "Davi consulta o SENHOR e livra a cidade. ⚔️" },
      { upTo: 13, reaction: "Saul o persegue; Davi se refugia nos montes. 🏔️" },
      { upTo: 18, reaction: "Jônatas o encontra e fortalece sua fé em Deus. 🤝" },
      { upTo: 99, reaction: "No deserto de Maom, Davi escapa por pouco. 😅" },
    ],
  },
  24: {
    keyframes: [
      kf(1, { terrain: "mountain", actors: [F(0.66, "king", "walk", "gold", { facing: 1 })] }),
      kf(3, { terrain: "mountain", night: 0.4, actors: [F(0.4, "warrior", "kneel", "brown"), F(0.62, "king", "lie", "gold")] }),
      kf(8, { terrain: "mountain", glory: 0.3, actors: [F(0.35, "warrior", "raise", "brown", { facing: 1 }), F(0.66, "king", "bow", "gold", { facing: -1 })] }),
    ],
    beats: [
      { upTo: 2, reaction: "Saul entra na caverna onde Davi se esconde. 🕳️" },
      { upTo: 7, reaction: "Davi corta a orla do manto, mas poupa o rei. 🗡️" },
      { upTo: 99, god: undefined, reaction: "'Não estenderei a mão contra o ungido do SENHOR.' 🤍" },
    ],
  },
  25: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.4, props: [P("tent", 0.7)], actors: [F(0.5, "man", "mourn", "white")] }),
      kf(10, { terrain: "desert", actors: [F(0.4, "warrior", "stand", "brown"), F(0.66, "man", "raise", "red")] }),
      kf(23, { terrain: "hills", glory: 0.3, actors: [F(0.35, "woman", "bow", "purple"), F(0.62, "warrior", "stand", "brown"), AN(0.85, "sheep")] }),
      kf(36, { terrain: "city", night: 0.4, actors: [F(0.5, "man", "lie", "red")] }),
    ],
    beats: [
      { upTo: 9, reaction: "Morre Samuel; todo o Israel o pranteia. 😢" },
      { upTo: 13, reaction: "O rico Nabal insulta os mensageiros de Davi. 😠" },
      { upTo: 35, reaction: "A prudente Abigail sai ao encontro e acalma Davi. 🤍" },
      { upTo: 99, reaction: "Nabal morre; Abigail se torna esposa de Davi. 💍" },
    ],
  },
  26: {
    keyframes: [
      kf(1, { terrain: "desert", night: 0.6, actors: [F(0.66, "king", "lie", "gold")] }),
      kf(7, { terrain: "desert", night: 0.7, props: [P("staff", 0.55)], actors: [F(0.35, "warrior", "kneel", "brown"), F(0.6, "warrior", "stand", "blue")] }),
      kf(13, { terrain: "mountain", night: 0.5, actors: [F(0.3, "warrior", "raise", "brown", { facing: 1 }), F(0.7, "king", "stand", "gold", { facing: -1 })] }),
    ],
    beats: [
      { upTo: 6, reaction: "De noite, Davi e Abisai entram no arraial adormecido. 🌙" },
      { upTo: 12, reaction: "Ele leva a lança e a bilha, mas não fere Saul. 🗡️" },
      { upTo: 99, god: undefined, reaction: "Do alto, Davi clama; Saul reconhece: 'Pequei.' 😔" },
    ],
  },
  27: {
    keyframes: [
      kf(1, { terrain: "desert", actors: [F(0.4, "warrior", "walk", "brown"), F(0.6, "woman", "walk", "purple")] }),
      kf(5, { terrain: "city", crowd: 0.4, props: [P("tower", 0.8, 1)], actors: [F(0.4, "warrior", "bow", "brown"), F(0.66, "king", "stand", "red")] }),
      kf(8, { terrain: "desert", crowd: 0.5, actors: [F(0.4, "warrior", "fight", "brown", { facing: 1 })] }),
    ],
    beats: [
      { upTo: 4, reaction: "Cansado da fuga, Davi se refugia em terra filisteia. 🏃" },
      { upTo: 7, reaction: "Aquis lhe dá a cidade de Ziclague. 🏘️" },
      { upTo: 99, reaction: "Davi faz incursões, mas engana Aquis sobre seus alvos. 🤫" },
    ],
  },
  28: {
    keyframes: [
      kf(1, { terrain: "hills", crowd: 0.5, actors: [F(0.66, "king", "stand", "gold")] }),
      kf(5, { terrain: "city", night: 0.6, actors: [F(0.5, "king", "mourn", "gold")] }),
      kf(8, { terrain: "city", night: 0.85, darkness: 0.5, props: [P("tent", 0.74)], actors: [F(0.35, "king", "bow", "gray"), F(0.62, "woman", "raise", "gray")] }),
      kf(13, { terrain: "city", night: 0.8, glory: 0.3, darkness: 0.4, actors: [F(0.4, "king", "mourn", "gray"), F(0.66, "elder", "raise", "white")] }),
    ],
    beats: [
      { upTo: 4, reaction: "Os filisteus se reúnem; o coração de Saul treme. 😨" },
      { upTo: 7, reaction: "Sem resposta de Deus, Saul busca uma médium em En-Dor. 🌑" },
      { upTo: 14, reaction: "Sobe a figura de Samuel, e Saul se prostra em terror. 👤" },
      { upTo: 99, god: undefined, reaction: "'Amanhã, tu e teus filhos estareis comigo.' 💀" },
    ],
  },
  29: {
    keyframes: [
      kf(1, { terrain: "field", crowd: 0.7, actors: [F(0.7, "warrior", "stand", "red")] }),
      kf(3, { terrain: "field", crowd: 0.6, actors: [F(0.4, "warrior", "stand", "brown"), F(0.66, "king", "raise", "red")] }),
      kf(11, { terrain: "desert", actors: [F(0.4, "warrior", "walk", "brown", { facing: -1 })] }),
    ],
    beats: [
      { upTo: 5, reaction: "Os príncipes filisteus desconfiam de Davi. 🤨" },
      { upTo: 10, reaction: "Aquis o dispensa: 'És reto, mas os chefes não te querem.' 🙏" },
      { upTo: 99, reaction: "Ao amanhecer, Davi retorna, livre da batalha contra Israel. 🌅" },
    ],
  },
  30: {
    keyframes: [
      kf(1, { terrain: "desert", fire: 0.7, props: [P("smoke", 0.5, 1.8)], actors: [F(0.4, "warrior", "mourn", "brown")] }),
      kf(7, { terrain: "desert", glory: 0.3, actors: [F(0.45, "warrior", "kneel", "brown")] }),
      kf(17, { terrain: "desert", crowd: 0.6, actors: [F(0.3, "warrior", "fight", "brown", { facing: 1 }), F(0.7, "warrior", "mourn", "red")] }),
      kf(26, { terrain: "city", glory: 0.3, crowd: 0.5, actors: [F(0.45, "warrior", "raise", "brown")] }),
    ],
    beats: [
      { upTo: 6, reaction: "Ziclague é queimada e as famílias, levadas cativas. 🔥😢" },
      { upTo: 8, god: "Persegue-os, porque de tudo os livrarás.", reaction: "Davi busca forças no SENHOR e consulta a Deus. 🙏" },
      { upTo: 20, reaction: "Ele alcança os amalequitas e recupera tudo. ⚔️" },
      { upTo: 99, reaction: "Reparte o despojo com todos, até os que ficaram. 🤝" },
    ],
  },
  31: {
    keyframes: [
      kf(1, { terrain: "mountain", storm: 0.4, crowd: 0.6, actors: [F(0.3, "warrior", "fight", "red", { facing: 1 }), F(0.66, "warrior", "mourn", "brown")] }),
      kf(4, { terrain: "mountain", night: 0.4, actors: [F(0.45, "king", "lie", "gold")] }),
      kf(8, { terrain: "mountain", night: 0.5, props: [P("tower", 0.8, 1)], actors: [F(0.7, "warrior", "stand", "red")] }),
      kf(11, { terrain: "city", night: 0.5, props: [P("altar", 0.5)], actors: [F(0.4, "man", "mourn", "brown"), F(0.62, "man", "carry", "sand")] }),
    ],
    beats: [
      { upTo: 3, reaction: "Em Gilboa, Israel é derrotado; os filhos de Saul tombam. ⚔️😢" },
      { upTo: 6, reaction: "Ferido, Saul cai sobre a própria espada. 💔" },
      { upTo: 10, reaction: "Os filisteus expõem os corpos nos muros de Bete-Seã. 🌑" },
      { upTo: 99, reaction: "Os homens de Jabes resgatam os corpos e os sepultam. 🕯️" },
    ],
  },
};
