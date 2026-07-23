// ============================================================================
// Roteiros de cena (Living Scene v2) — ATOS DOS APÓSTOLOS, capítulo por capítulo.
// A ascensão de Jesus, Pentecostes e as línguas de fogo, a igreja primitiva e
// os milagres, o martírio de Estêvão, a conversão de Saulo, a visão de Pedro,
// as viagens missionárias de Paulo, o naufrágio e a pregação em Roma.
// Puramente visual/narrativo — não toca em progresso.
// Segue o padrão de Êxodo (rpgExodusScenes).
// ============================================================================

import type { ChapterScript, V2Actor, V2Prop, SceneState } from "@/lib/rpgLivingV2";

const F = (x: number, role: V2Actor["role"], action: V2Actor["action"], palette?: V2Actor["palette"], extra: Partial<V2Actor> = {}): V2Actor => ({ x, role, action, palette, ...extra });
const AN = (x: number, animal: NonNullable<V2Actor["animal"]>, scale = 1, color?: string): V2Actor => ({ x, kind: "animal", animal, scale, color });
const P = (kind: string, x: number, scale = 1, fire?: number): V2Prop => ({ kind, x, scale, ...(fire != null ? { fire } : {}) });
const kf = (v: number, state: SceneState) => ({ v, state });

export const ACTS_SCENES: Record<number, ChapterScript> = {
  1: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.4, crowd: 0.4, actors: [F(0.5, "man", "raise", "white"), F(0.34, "man", "stand", "brown"), F(0.66, "man", "stand", "blue")] }),
      kf(9, { terrain: "mountain", glory: 0.85, crowd: 0.5, actors: [F(0.5, "man", "raise", "white"), F(0.3, "man", "bow", "brown"), F(0.7, "man", "raise", "sand")] }),
      kf(10, { terrain: "mountain", glory: 0.6, crowd: 0.4, actors: [F(0.35, "angel", "stand", "white"), F(0.65, "angel", "stand", "white"), F(0.5, "man", "raise", "blue")] }),
      kf(15, { terrain: "city", crowd: 0.5, actors: [F(0.4, "man", "raise", "brown"), F(0.6, "man", "stand", "sand")] }),
    ],
    beats: [
      { upTo: 8, god: "Recebereis poder ao descer sobre vós o Espírito Santo.", reaction: "Jesus promete o Espírito aos discípulos. 🕊️" },
      { upTo: 9, reaction: "Jesus é elevado ao céu diante de todos. ☁️✨" },
      { upTo: 11, god: "Homens da Galileia, este Jesus voltará como o vistes ir.", reaction: "Dois anjos falam aos discípulos. 👼" },
      { upTo: 99, reaction: "Reunidos em oração, escolhem Matias entre os doze. 🙏" },
    ],
  },
  2: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.5, actors: [F(0.4, "man", "kneel", "brown"), F(0.6, "man", "kneel", "blue")] }),
      kf(2, { terrain: "city", fire: 0.8, glory: 0.7, crowd: 0.5, props: [P("dove", 0.5, 0.9)], actors: [F(0.35, "man", "raise", "white"), F(0.55, "man", "raise", "sand"), F(0.72, "man", "raise", "blue")] }),
      kf(14, { terrain: "city", crowd: 0.85, glory: 0.3, actors: [F(0.42, "man", "raise", "brown"), F(0.66, "man", "stand", "sand")] }),
      kf(41, { terrain: "city", crowd: 0.9, glory: 0.4, actors: [F(0.4, "man", "raise", "brown"), F(0.6, "man", "kneel", "blue")] }),
    ],
    beats: [
      { upTo: 1, reaction: "No dia de Pentecostes, todos estão reunidos. 🙏" },
      { upTo: 13, reaction: "Vento e línguas de fogo pousam sobre cada um! 🔥🕊️" },
      { upTo: 40, reaction: "Pedro se levanta e prega a Cristo à multidão. 📢" },
      { upTo: 99, reaction: "Três mil almas são batizadas naquele dia! ✨" },
    ],
  },
  3: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.5, actors: [F(0.36, "man", "walk", "brown"), F(0.5, "man", "walk", "blue"), F(0.7, "man", "lie", "sand")] }),
      kf(6, { terrain: "city", glory: 0.4, crowd: 0.5, actors: [F(0.4, "man", "raise", "brown"), F(0.62, "man", "raise", "sand")] }),
      kf(11, { terrain: "city", crowd: 0.8, actors: [F(0.42, "man", "raise", "brown"), F(0.66, "man", "stand", "blue")] }),
    ],
    beats: [
      { upTo: 5, reaction: "Um coxo pede esmola à porta do templo. 🙏" },
      { upTo: 10, god: undefined, reaction: "'Em nome de Jesus, levanta-te e anda!' O homem salta! 🦵✨" },
      { upTo: 99, reaction: "O povo se admira; Pedro anuncia o Autor da vida. 📢" },
    ],
  },
  4: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.4, actors: [F(0.34, "man", "stand", "brown"), F(0.5, "man", "stand", "blue"), F(0.72, "elder", "stand", "purple")] }),
      kf(8, { terrain: "city", glory: 0.4, actors: [F(0.4, "man", "raise", "brown"), F(0.68, "elder", "mourn", "purple")] }),
      kf(31, { terrain: "city", glory: 0.6, crowd: 0.6, actors: [F(0.4, "man", "raise", "brown"), F(0.6, "man", "raise", "blue")] }),
    ],
    beats: [
      { upTo: 7, reaction: "Pedro e João são presos pelos líderes. ⛓️" },
      { upTo: 22, god: undefined, reaction: "'Não podemos deixar de falar o que vimos.' 🙌" },
      { upTo: 99, reaction: "A igreja ora e o lugar treme; todos cheios do Espírito. 🕊️" },
    ],
  },
  5: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.2, actors: [F(0.4, "man", "stand", "sand"), F(0.6, "woman", "lie", "gray")] }),
      kf(12, { terrain: "city", crowd: 0.8, glory: 0.4, actors: [F(0.4, "man", "raise", "brown"), F(0.62, "man", "lie", "sand"), F(0.78, "woman", "kneel", "blue")] }),
      kf(19, { terrain: "city", night: 0.6, glory: 0.5, actors: [F(0.5, "angel", "raise", "white"), F(0.34, "man", "stand", "brown")] }),
      kf(29, { terrain: "city", crowd: 0.5, actors: [F(0.4, "man", "raise", "brown"), F(0.7, "elder", "stand", "purple")] }),
    ],
    beats: [
      { upTo: 11, reaction: "Ananias e Safira mentem ao Espírito e caem. 😔" },
      { upTo: 18, reaction: "Muitos sinais e curas pelas mãos dos apóstolos. 🙌✨" },
      { upTo: 26, god: undefined, reaction: "Um anjo abre a prisão de noite e os liberta. 👼" },
      { upTo: 99, reaction: "'Importa obedecer a Deus mais que aos homens.' 🙏" },
    ],
  },
  6: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.7, actors: [F(0.36, "man", "stand", "brown"), F(0.55, "man", "carry", "sand"), F(0.75, "woman", "stand", "blue")] }),
      kf(5, { terrain: "city", glory: 0.4, actors: [F(0.4, "man", "raise", "white"), F(0.6, "man", "kneel", "sand")] }),
      kf(8, { terrain: "city", glory: 0.5, crowd: 0.5, actors: [F(0.42, "man", "raise", "white"), F(0.68, "man", "stand", "purple")] }),
    ],
    beats: [
      { upTo: 7, reaction: "Escolhem sete servos para a mesa; a Palavra cresce. 🍞" },
      { upTo: 10, reaction: "Estêvão, cheio de graça, faz grandes prodígios. ✨" },
      { upTo: 99, reaction: "Falsas testemunhas o acusam; seu rosto brilha como de anjo. 😇" },
    ],
  },
  7: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.5, actors: [F(0.4, "man", "raise", "white"), F(0.66, "elder", "stand", "purple")] }),
      kf(54, { terrain: "city", glory: 0.7, actors: [F(0.42, "man", "raise", "white"), F(0.66, "man", "stand", "brown")] }),
      kf(58, { terrain: "city", night: 0.3, crowd: 0.5, actors: [F(0.4, "man", "kneel", "white"), F(0.62, "man", "fight", "sand", { facing: -1 }), F(0.78, "man", "mourn", "brown")] }),
      kf(59, { terrain: "city", glory: 0.85, night: 0.2, actors: [F(0.42, "man", "kneel", "white")] }),
    ],
    beats: [
      { upTo: 53, reaction: "Estêvão relembra toda a história de Israel. 📖" },
      { upTo: 56, god: undefined, reaction: "'Vejo os céus abertos e Jesus à direita de Deus!' 🌟" },
      { upTo: 58, reaction: "Arrastam-no para fora e o apedrejam. 😢" },
      { upTo: 99, god: undefined, reaction: "'Senhor, não lhes imputes este pecado.' O primeiro mártir. 🕊️" },
    ],
  },
  8: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.3, crowd: 0.5, actors: [F(0.4, "man", "stand", "sand"), F(0.66, "man", "walk", "brown")] }),
      kf(5, { terrain: "hills", crowd: 0.5, glory: 0.4, actors: [F(0.4, "man", "raise", "white"), F(0.66, "man", "kneel", "blue")] }),
      kf(26, { terrain: "desert", actors: [F(0.35, "man", "walk", "white"), F(0.62, "man", "stand", "purple")] }),
      kf(38, { terrain: "river", glory: 0.4, props: [P("reeds", 0.2), P("reeds", 0.82)], actors: [F(0.4, "man", "raise", "white"), F(0.6, "man", "kneel", "purple")] }),
    ],
    beats: [
      { upTo: 4, reaction: "Grande perseguição espalha os crentes. 🌬️" },
      { upTo: 25, reaction: "Filipe prega em Samaria; muitos creem. 🙌" },
      { upTo: 35, god: undefined, reaction: "Filipe encontra o eunuco etíope na estrada. 📜" },
      { upTo: 99, reaction: "O eunuco é batizado e segue seu caminho alegre. 💧✨" },
    ],
  },
  9: {
    keyframes: [
      kf(1, { terrain: "desert", night: 0.3, actors: [F(0.4, "man", "walk", "gray", { facing: 1 }), F(0.58, "man", "stand", "sand")] }),
      kf(3, { terrain: "desert", glory: 0.95, night: 0.4, actors: [F(0.45, "man", "lie", "gray")] }),
      kf(10, { terrain: "city", glory: 0.5, actors: [F(0.38, "man", "raise", "white"), F(0.62, "man", "kneel", "gray")] }),
      kf(20, { terrain: "city", crowd: 0.5, actors: [F(0.42, "man", "raise", "brown")] }),
    ],
    beats: [
      { upTo: 2, reaction: "Saulo parte a Damasco para prender os crentes. 😠" },
      { upTo: 9, god: "Saulo, Saulo, por que me persegues?", reaction: "Uma luz do céu o derruba e o cega! ⚡🌟" },
      { upTo: 19, god: undefined, reaction: "Ananias impõe as mãos; Saulo torna a ver. 🙌" },
      { upTo: 99, reaction: "Saulo, transformado, prega a Cristo com ousadia. 📢✨" },
    ],
  },
  10: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.4, actors: [F(0.45, "warrior", "kneel", "red"), F(0.66, "angel", "raise", "white")] }),
      kf(9, { terrain: "city", glory: 0.6, props: [P("dove", 0.5, 0.9)], actors: [F(0.4, "man", "raise", "brown")] }),
      kf(24, { terrain: "city", crowd: 0.5, actors: [F(0.38, "man", "raise", "brown"), F(0.62, "warrior", "bow", "red")] }),
      kf(44, { terrain: "city", fire: 0.4, glory: 0.6, crowd: 0.5, actors: [F(0.4, "man", "raise", "brown"), F(0.6, "man", "kneel", "red")] }),
    ],
    beats: [
      { upTo: 8, god: undefined, reaction: "Um anjo fala a Cornélio, o centurião. 👼" },
      { upTo: 16, god: "O que Deus purificou, não o chames comum.", reaction: "Pedro vê a visão do lençol do céu. 🕊️" },
      { upTo: 43, reaction: "Pedro entra na casa de Cornélio, um gentio. 🤝" },
      { upTo: 99, reaction: "O Espírito desce também sobre os gentios! ✨" },
    ],
  },
  11: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.5, actors: [F(0.4, "man", "raise", "brown"), F(0.66, "elder", "stand", "sand")] }),
      kf(19, { terrain: "city", crowd: 0.6, glory: 0.3, actors: [F(0.4, "man", "stand", "blue"), F(0.62, "man", "raise", "brown")] }),
      kf(27, { terrain: "city", glory: 0.4, actors: [F(0.45, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 18, reaction: "Pedro explica: Deus abriu a porta aos gentios. 🚪✨" },
      { upTo: 26, reaction: "Em Antioquia, os discípulos são chamados cristãos. 🙌" },
      { upTo: 99, reaction: "Ágabo profetiza fome; a igreja envia socorro. 🌾" },
    ],
  },
  12: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.4, actors: [F(0.4, "king", "raise", "gold"), F(0.66, "man", "lie", "brown")] }),
      kf(7, { terrain: "city", night: 0.6, glory: 0.6, actors: [F(0.5, "angel", "raise", "white"), F(0.34, "man", "stand", "brown")] }),
      kf(12, { terrain: "city", night: 0.4, actors: [F(0.4, "man", "stand", "brown"), F(0.62, "woman", "raise", "blue")] }),
      kf(23, { terrain: "city", crowd: 0.5, actors: [F(0.5, "king", "lie", "gold")] }),
    ],
    beats: [
      { upTo: 6, reaction: "Herodes prende Pedro e mata Tiago. ⛓️😢" },
      { upTo: 11, god: undefined, reaction: "Um anjo o desperta; as correntes caem! 👼✨" },
      { upTo: 17, reaction: "Pedro bate à porta; a igreja mal acredita. 🚪🙏" },
      { upTo: 99, reaction: "Herodes é ferido, mas a Palavra cresce. 📖" },
    ],
  },
  13: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.4, actors: [F(0.36, "man", "kneel", "brown"), F(0.55, "man", "kneel", "white"), F(0.74, "man", "raise", "sand")] }),
      kf(4, { terrain: "sea", crowd: 0.3, props: [P("boat", 0.5, 1.1)], actors: [F(0.4, "man", "stand", "brown"), F(0.6, "man", "stand", "white")] }),
      kf(16, { terrain: "city", crowd: 0.7, glory: 0.3, actors: [F(0.42, "man", "raise", "brown"), F(0.66, "man", "stand", "sand")] }),
    ],
    beats: [
      { upTo: 3, god: "Separai-me Barnabé e Saulo para a obra a que os chamei.", reaction: "A igreja envia os primeiros missionários. 🕊️" },
      { upTo: 12, reaction: "Em Chipre, o procônsul crê no Senhor. ⛵" },
      { upTo: 99, reaction: "Paulo prega Cristo na sinagoga de Antioquia. 📢" },
    ],
  },
  14: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.7, glory: 0.3, actors: [F(0.4, "man", "raise", "brown"), F(0.66, "man", "stand", "white")] }),
      kf(8, { terrain: "city", glory: 0.4, crowd: 0.5, actors: [F(0.4, "man", "raise", "brown"), F(0.66, "man", "lie", "sand")] }),
      kf(19, { terrain: "plain", night: 0.2, actors: [F(0.45, "man", "lie", "brown"), F(0.66, "man", "kneel", "white")] }),
    ],
    beats: [
      { upTo: 7, reaction: "Paulo e Barnabé pregam em Icônio. 🙌" },
      { upTo: 18, reaction: "Curam um coxo; a multidão quer adorá-los. 🦵" },
      { upTo: 99, reaction: "Paulo é apedrejado, mas se levanta e segue. 💪✨" },
    ],
  },
  15: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.6, actors: [F(0.36, "man", "stand", "brown"), F(0.55, "man", "raise", "white"), F(0.74, "elder", "stand", "purple")] }),
      kf(12, { terrain: "city", glory: 0.4, actors: [F(0.4, "man", "raise", "brown"), F(0.66, "elder", "stand", "sand")] }),
      kf(36, { terrain: "city", actors: [F(0.4, "man", "stand", "brown"), F(0.62, "man", "stand", "white")] }),
    ],
    beats: [
      { upTo: 11, reaction: "O concílio de Jerusalém debate a lei e a graça. ⚖️" },
      { upTo: 35, god: undefined, reaction: "Decidem: os gentios são salvos pela graça. 🤝✨" },
      { upTo: 99, reaction: "Paulo e Barnabé se separam em novos caminhos. 🛤️" },
    ],
  },
  16: {
    keyframes: [
      kf(1, { terrain: "city", actors: [F(0.4, "man", "stand", "brown"), F(0.62, "man", "stand", "green")] }),
      kf(9, { terrain: "sea", night: 0.5, glory: 0.5, props: [P("boat", 0.5, 1.1)], actors: [F(0.45, "man", "lie", "brown")] }),
      kf(16, { terrain: "city", crowd: 0.5, actors: [F(0.4, "man", "raise", "brown"), F(0.62, "woman", "kneel", "purple")] }),
      kf(25, { terrain: "city", night: 0.7, glory: 0.4, actors: [F(0.4, "man", "raise", "brown"), F(0.6, "man", "kneel", "white")] }),
    ],
    beats: [
      { upTo: 8, reaction: "Timóteo se junta a Paulo na viagem. 🤝" },
      { upTo: 15, god: undefined, reaction: "Uma visão os chama à Macedônia; Lídia crê. ⛵🌟" },
      { upTo: 24, reaction: "Presos em Filipos, cantam a Deus na masmorra. ⛓️🎶" },
      { upTo: 99, reaction: "Um terremoto abre as portas; o carcereiro crê! ✨" },
    ],
  },
  17: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.6, actors: [F(0.4, "man", "raise", "brown"), F(0.66, "man", "stand", "sand")] }),
      kf(16, { terrain: "city", crowd: 0.4, actors: [F(0.4, "man", "stand", "brown")] }),
      kf(22, { terrain: "hills", crowd: 0.5, glory: 0.3, actors: [F(0.42, "man", "raise", "brown"), F(0.68, "elder", "stand", "purple")] }),
    ],
    beats: [
      { upTo: 15, reaction: "Em Tessalônica e Bereia, examinam as Escrituras. 📖" },
      { upTo: 21, reaction: "Em Atenas, Paulo se comove com os ídolos. 🗿" },
      { upTo: 99, god: undefined, reaction: "No Areópago: 'O Deus desconhecido eu vos anuncio.' 📢✨" },
    ],
  },
  18: {
    keyframes: [
      kf(1, { terrain: "city", actors: [F(0.4, "man", "carry", "brown"), F(0.62, "man", "stand", "sand"), F(0.78, "woman", "stand", "blue")] }),
      kf(9, { terrain: "city", night: 0.5, glory: 0.5, actors: [F(0.45, "man", "kneel", "brown")] }),
      kf(24, { terrain: "city", crowd: 0.4, actors: [F(0.4, "man", "raise", "sand"), F(0.62, "woman", "stand", "blue")] }),
    ],
    beats: [
      { upTo: 8, reaction: "Em Corinto, Paulo trabalha com Áquila e Priscila. 🧵" },
      { upTo: 17, god: "Não temas, fala e não te cales, pois estou contigo.", reaction: "O Senhor anima Paulo em visão. 🌟" },
      { upTo: 99, reaction: "Apolo, eloquente, é instruído no Caminho. 📖" },
    ],
  },
  19: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.4, crowd: 0.4, actors: [F(0.4, "man", "raise", "brown"), F(0.62, "man", "kneel", "sand")] }),
      kf(11, { terrain: "city", crowd: 0.5, glory: 0.4, actors: [F(0.4, "man", "raise", "brown"), F(0.66, "man", "lie", "gray")] }),
      kf(23, { terrain: "city", crowd: 0.85, actors: [F(0.4, "man", "stand", "brown"), F(0.66, "man", "raise", "purple")] }),
    ],
    beats: [
      { upTo: 10, reaction: "Em Éfeso, o Espírito desce sobre os discípulos. 🕊️" },
      { upTo: 22, reaction: "Milagres extraordinários; os livros mágicos queimam. 🔥📚" },
      { upTo: 99, reaction: "Tumulto dos ourives: 'Grande é Diana dos efésios!' 😠" },
    ],
  },
  20: {
    keyframes: [
      kf(1, { terrain: "sea", crowd: 0.3, props: [P("boat", 0.5, 1.1)], actors: [F(0.4, "man", "stand", "brown")] }),
      kf(7, { terrain: "city", night: 0.6, glory: 0.4, actors: [F(0.4, "man", "raise", "brown"), F(0.66, "child", "lie", "sand")] }),
      kf(17, { terrain: "sea", glory: 0.3, crowd: 0.5, actors: [F(0.4, "man", "raise", "brown"), F(0.6, "elder", "mourn", "sand")] }),
    ],
    beats: [
      { upTo: 6, reaction: "Paulo viaja por mar visitando as igrejas. ⛵" },
      { upTo: 12, god: undefined, reaction: "Êutico cai da janela e é revivido. 🙌✨" },
      { upTo: 99, reaction: "Despedida em Mileto: 'Não mais vereis meu rosto.' 😢🙏" },
    ],
  },
  21: {
    keyframes: [
      kf(1, { terrain: "sea", crowd: 0.3, props: [P("boat", 0.5, 1.1)], actors: [F(0.4, "man", "stand", "brown")] }),
      kf(10, { terrain: "city", glory: 0.4, actors: [F(0.4, "man", "raise", "white"), F(0.62, "man", "stand", "brown")] }),
      kf(27, { terrain: "city", crowd: 0.7, night: 0.2, actors: [F(0.4, "man", "mourn", "brown"), F(0.62, "warrior", "stand", "red")] }),
    ],
    beats: [
      { upTo: 9, reaction: "Paulo navega rumo a Jerusalém. ⛵" },
      { upTo: 16, god: undefined, reaction: "Ágabo o avisa das cadeias que o esperam. 🔗" },
      { upTo: 99, reaction: "No templo, é preso em meio ao tumulto. ⛓️" },
    ],
  },
  22: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.7, actors: [F(0.42, "man", "raise", "brown"), F(0.66, "warrior", "stand", "red")] }),
      kf(6, { terrain: "desert", glory: 0.85, actors: [F(0.45, "man", "lie", "brown")] }),
      kf(24, { terrain: "city", actors: [F(0.4, "man", "stand", "brown"), F(0.62, "warrior", "mourn", "red")] }),
    ],
    beats: [
      { upTo: 5, reaction: "Paulo conta sua história ao povo. 📢" },
      { upTo: 21, reaction: "Relembra a luz de Damasco e seu chamado. 🌟" },
      { upTo: 99, reaction: "Revela ser cidadão romano; soltam suas amarras. 🔓" },
    ],
  },
  23: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.6, actors: [F(0.4, "man", "raise", "brown"), F(0.66, "elder", "raise", "purple")] }),
      kf(11, { terrain: "city", night: 0.7, glory: 0.6, actors: [F(0.45, "man", "kneel", "brown")] }),
      kf(23, { terrain: "city", night: 0.5, actors: [F(0.4, "warrior", "walk", "red"), F(0.6, "man", "stand", "brown"), F(0.78, "warrior", "walk", "red")] }),
    ],
    beats: [
      { upTo: 10, reaction: "Diante do Sinédrio, fariseus e saduceus se dividem. ⚖️" },
      { upTo: 22, god: "Tem bom ânimo! Como testemunhaste em Jerusalém, o farás em Roma.", reaction: "O Senhor conforta Paulo de noite. 🌟" },
      { upTo: 99, reaction: "Descoberto o complô, os soldados o levam a Cesareia. 🐎" },
    ],
  },
  24: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.4, actors: [F(0.36, "man", "stand", "brown"), F(0.58, "elder", "raise", "purple"), F(0.76, "king", "stand", "gold")] }),
      kf(10, { terrain: "city", actors: [F(0.4, "man", "raise", "brown"), F(0.68, "king", "stand", "gold")] }),
    ],
    beats: [
      { upTo: 9, reaction: "Acusam Paulo diante do governador Félix. ⚖️" },
      { upTo: 21, god: undefined, reaction: "Paulo faz sua defesa: 'Sirvo ao Deus dos meus pais.' 🙏" },
      { upTo: 99, reaction: "Félix o mantém preso, adiando o julgamento. ⏳" },
    ],
  },
  25: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.4, actors: [F(0.4, "man", "stand", "brown"), F(0.66, "king", "stand", "gold")] }),
      kf(11, { terrain: "city", actors: [F(0.42, "man", "raise", "brown"), F(0.68, "king", "stand", "gold")] }),
      kf(23, { terrain: "city", crowd: 0.5, actors: [F(0.38, "man", "stand", "brown"), F(0.58, "king", "stand", "gold"), F(0.76, "king", "stand", "purple")] }),
    ],
    beats: [
      { upTo: 10, reaction: "Festo assume; os judeus renovam as acusações. ⚖️" },
      { upTo: 12, god: undefined, reaction: "'Apelo para César!' A César irá Paulo. 👑" },
      { upTo: 99, reaction: "O rei Agripa deseja ouvir o prisioneiro. 🏛️" },
    ],
  },
  26: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.5, actors: [F(0.4, "man", "raise", "brown"), F(0.68, "king", "stand", "purple")] }),
      kf(12, { terrain: "desert", glory: 0.8, actors: [F(0.45, "man", "raise", "brown")] }),
      kf(24, { terrain: "city", crowd: 0.4, actors: [F(0.4, "man", "raise", "brown"), F(0.66, "king", "stand", "purple")] }),
    ],
    beats: [
      { upTo: 11, reaction: "Paulo narra sua vida diante do rei Agripa. 📢" },
      { upTo: 23, god: "Eu sou Jesus, a quem tu persegues.", reaction: "Revive a luz e o chamado no caminho. 🌟" },
      { upTo: 99, god: undefined, reaction: "'Por pouco me persuades a ser cristão!' 🙏" },
    ],
  },
  27: {
    keyframes: [
      kf(1, { terrain: "sea", crowd: 0.4, props: [P("boat", 0.5, 1.1)], actors: [F(0.4, "man", "stand", "brown"), F(0.62, "warrior", "stand", "red")] }),
      kf(14, { terrain: "sea", storm: 0.85, night: 0.5, rain: 0.5, props: [P("boat", 0.5, 1)], actors: [F(0.45, "man", "raise", "brown")] }),
      kf(23, { terrain: "sea", storm: 0.7, night: 0.7, glory: 0.4, props: [P("boat", 0.5, 1)], actors: [F(0.45, "man", "raise", "brown")] }),
      kf(41, { terrain: "sea", storm: 0.6, flood: 0.5, crowd: 0.4, actors: [F(0.4, "man", "raise", "brown"), F(0.66, "man", "kneel", "sand")] }),
    ],
    beats: [
      { upTo: 13, reaction: "Embarcam rumo a Roma sob custódia. ⛵" },
      { upTo: 22, reaction: "Uma tempestade violenta os açoita por dias. 🌊⚡" },
      { upTo: 26, god: "Não temas, Paulo; é necessário que compareças diante de César.", reaction: "Um anjo garante: ninguém perecerá. 👼🌟" },
      { upTo: 99, reaction: "O navio encalha, mas todos chegam salvos à terra! 🏝️✨" },
    ],
  },
  28: {
    keyframes: [
      kf(1, { terrain: "sea", props: [P("altar", 0.5, 0.9, 0.7)], actors: [F(0.4, "man", "raise", "brown"), F(0.66, "man", "stand", "sand")] }),
      kf(8, { terrain: "city", glory: 0.4, actors: [F(0.4, "man", "raise", "brown"), F(0.66, "man", "lie", "gray")] }),
      kf(16, { terrain: "city", crowd: 0.5, glory: 0.4, actors: [F(0.42, "man", "raise", "brown")] }),
      kf(30, { terrain: "city", glory: 0.6, crowd: 0.5, actors: [F(0.42, "man", "raise", "brown"), F(0.66, "man", "kneel", "sand")] }),
    ],
    beats: [
      { upTo: 6, reaction: "Em Malta, a víbora não fere Paulo. 🐍✨" },
      { upTo: 15, reaction: "Cura os enfermos da ilha; enfim chegam a Roma. 🙌" },
      { upTo: 29, reaction: "Paulo prega aos judeus de Roma. 📖" },
      { upTo: 99, god: undefined, reaction: "Prega o Reino com toda ousadia, sem impedimento! 📢✨" },
    ],
  },
};
