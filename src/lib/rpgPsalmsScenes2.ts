// ============================================================================
// Roteiros de cena (Living Scene v2) — SALMOS 51 a 100.
// Poesia de arrependimento, lamento, confiança, refúgio e louvor. Cenas
// atmosféricas conforme o tom de cada salmo. Puramente visual/narrativo —
// não toca em progresso. Segue o padrão de Êxodo (rpgExodusScenes).
// ============================================================================

import type { ChapterScript, V2Actor, V2Prop, SceneState } from "@/lib/rpgLivingV2";

const F = (x: number, role: V2Actor["role"], action: V2Actor["action"], palette?: V2Actor["palette"], extra: Partial<V2Actor> = {}): V2Actor => ({ x, role, action, palette, ...extra });
const AN = (x: number, animal: NonNullable<V2Actor["animal"]>, scale = 1, color?: string): V2Actor => ({ x, kind: "animal", animal, scale, color });
const P = (kind: string, x: number, scale = 1, fire?: number): V2Prop => ({ kind, x, scale, ...(fire != null ? { fire } : {}) });
const kf = (v: number, state: SceneState) => ({ v, state });

export const PSALMS_2: Record<number, ChapterScript> = {
  51: {
    keyframes: [
      kf(1, { terrain: "plain", night: 0.6, actors: [F(0.5, "king", "mourn", "gray")] }),
      kf(7, { terrain: "plain", night: 0.4, glory: 0.3, actors: [F(0.5, "king", "kneel", "white")] }),
      kf(17, { terrain: "plain", glory: 0.6, props: [P("altar", 0.6, 1, 0.5)], actors: [F(0.42, "king", "bow", "white")] }),
    ],
    beats: [
      { upTo: 6, reaction: "'Tem misericórdia de mim, ó Deus.' 😢" },
      { upTo: 12, reaction: "'Cria em mim um coração puro.' 🤍" },
      { upTo: 99, reaction: "Sacrifício a Deus é o espírito quebrantado. 🙏" },
    ],
  },
  52: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.3, actors: [F(0.62, "warrior", "stand", "red")] }),
      kf(8, { terrain: "garden", glory: 0.4, props: [P("tree", 0.5, 1.2)], actors: [F(0.4, "man", "stand", "green")] }),
    ],
    beats: [
      { upTo: 7, reaction: "Por que te glorias na maldade, ó valente? 😠" },
      { upTo: 99, reaction: "Sou como oliveira verde na Casa de Deus. 🌿" },
    ],
  },
  53: {
    keyframes: [
      kf(1, { terrain: "plain", night: 0.35, actors: [F(0.5, "man", "stand", "gray")] }),
      kf(6, { terrain: "city", glory: 0.4, actors: [F(0.45, "man", "raise", "brown")] }),
    ],
    beats: [
      { upTo: 5, reaction: "Diz o insensato: 'Não há Deus.' 🌑" },
      { upTo: 99, reaction: "Que de Sião venha a salvação! ✨" },
    ],
  },
  54: {
    keyframes: [
      kf(1, { terrain: "desert", night: 0.3, actors: [F(0.5, "man", "raise", "brown")] }),
      kf(6, { terrain: "desert", glory: 0.5, props: [P("altar", 0.6, 0.9, 0.5)], actors: [F(0.42, "man", "kneel", "white")] }),
    ],
    beats: [
      { upTo: 5, reaction: "'Salva-me, ó Deus, pelo teu nome.' 🙏" },
      { upTo: 99, reaction: "De bom grado te oferecerei sacrifício. 🔥" },
    ],
  },
  55: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.5, actors: [F(0.5, "man", "mourn", "gray")] }),
      kf(6, { terrain: "hills", night: 0.3, props: [P("dove", 0.5, 1.1)], actors: [F(0.4, "man", "raise", "blue")] }),
      kf(22, { terrain: "hills", glory: 0.4, actors: [F(0.45, "man", "kneel", "white")] }),
    ],
    beats: [
      { upTo: 5, reaction: "'Escuta, ó Deus, a minha oração.' 😔" },
      { upTo: 15, reaction: "'Quem me dera asas como a pomba, para voar!' 🕊️" },
      { upTo: 99, reaction: "Lança teu cuidado sobre o SENHOR. 🤍" },
    ],
  },
  56: {
    keyframes: [
      kf(1, { terrain: "desert", night: 0.4, actors: [F(0.5, "man", "stand", "brown")] }),
      kf(9, { terrain: "desert", glory: 0.5, actors: [F(0.45, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 8, reaction: "'No dia em que temo, ponho em ti a confiança.' 🌙" },
      { upTo: 99, reaction: "Em Deus confio, nada temerei. 🤍" },
    ],
  },
  57: {
    keyframes: [
      kf(1, { terrain: "mountain", night: 0.55, actors: [F(0.5, "man", "kneel", "brown")] }),
      kf(7, { terrain: "mountain", glory: 0.6, props: [P("dove", 0.62, 0.9)], actors: [F(0.42, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 6, reaction: "'À sombra das tuas asas me abrigo.' 🕊️" },
      { upTo: 99, reaction: "'Cantarei, despertará minha alma!' 🎶" },
    ],
  },
  58: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.4, actors: [F(0.4, "king", "stand", "red"), F(0.66, "elder", "stand", "gray")] }),
      kf(11, { terrain: "city", glory: 0.4, actors: [F(0.5, "man", "stand", "white")] }),
    ],
    beats: [
      { upTo: 5, reaction: "Falais justiça de verdade, ó poderosos? ⚖️" },
      { upTo: 99, reaction: "Há um Deus que julga na terra. ✨" },
    ],
  },
  59: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.6, actors: [F(0.5, "man", "stand", "brown")] }),
      kf(16, { terrain: "hills", glory: 0.5, actors: [F(0.45, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 9, reaction: "'Livra-me dos meus inimigos, ó Deus.' 🌑" },
      { upTo: 99, reaction: "'Cantarei o teu poder, meu alto refúgio.' 🏔️" },
    ],
  },
  60: {
    keyframes: [
      kf(1, { terrain: "plain", storm: 0.4, actors: [F(0.5, "warrior", "mourn", "gray")] }),
      kf(6, { terrain: "plain", glory: 0.5, actors: [F(0.45, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 5, reaction: "Ó Deus, tu nos rejeitaste; restaura-nos! 😔" },
      { upTo: 99, god: "Meu é Gileade, e meu é Manassés.", reaction: "Em Deus faremos proezas. ⚔️" },
    ],
  },
  61: {
    keyframes: [
      kf(1, { terrain: "sea", night: 0.3, actors: [F(0.5, "man", "raise", "brown")] }),
      kf(4, { terrain: "mountain", glory: 0.55, actors: [F(0.45, "man", "kneel", "white")] }),
    ],
    beats: [
      { upTo: 3, reaction: "'Guia-me à rocha mais alta do que eu.' 🪨" },
      { upTo: 99, reaction: "Habitarei no teu tabernáculo para sempre. 🕊️" },
    ],
  },
  62: {
    keyframes: [
      kf(1, { terrain: "mountain", night: 0.3, actors: [F(0.5, "man", "stand", "brown")] }),
      kf(7, { terrain: "mountain", glory: 0.55, actors: [F(0.45, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 6, reaction: "Só em Deus espera, ó minha alma. 🪨" },
      { upTo: 99, reaction: "Só ele é a minha rocha e salvação. ✨" },
    ],
  },
  63: {
    keyframes: [
      kf(1, { terrain: "desert", actors: [F(0.5, "man", "kneel", "sand")] }),
      kf(5, { terrain: "desert", glory: 0.5, actors: [F(0.45, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 4, reaction: "'A minha alma tem sede de ti, em terra seca.' 🏜️" },
      { upTo: 99, reaction: "'À sombra das tuas asas me regozijo.' 🕊️" },
    ],
  },
  64: {
    keyframes: [
      kf(1, { terrain: "plain", night: 0.4, actors: [F(0.5, "man", "stand", "brown")] }),
      kf(9, { terrain: "plain", glory: 0.45, actors: [F(0.45, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 6, reaction: "'Esconde-me do secreto conselho dos ímpios.' 🌙" },
      { upTo: 99, reaction: "O justo se alegra no SENHOR. 🤍" },
    ],
  },
  65: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.5, props: [P("altar", 0.6, 0.9, 0.4)], actors: [F(0.4, "man", "raise", "white")] }),
      kf(9, { terrain: "field", glory: 0.4, props: [P("river", 0.7, 1) ], actors: [AN(0.55, "sheep"), AN(0.72, "ox", 0.9)] }),
    ],
    beats: [
      { upTo: 8, reaction: "A ti se deve o louvor em Sião, ó Deus. 🎶" },
      { upTo: 99, reaction: "Coroas o ano da tua bondade; os campos transbordam. 🌾" },
    ],
  },
  66: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.5, crowd: 0.7, actors: [F(0.4, "man", "raise", "white"), F(0.6, "man", "raise", "blue")] }),
      kf(13, { terrain: "city", glory: 0.5, props: [P("altar", 0.6, 1, 0.6)], actors: [F(0.45, "man", "kneel", "white")] }),
    ],
    beats: [
      { upTo: 12, reaction: "'Celebrai a Deus com júbilo, toda a terra!' 🎉" },
      { upTo: 99, reaction: "'Vinde e vede as obras de Deus.' ✨" },
    ],
  },
  67: {
    keyframes: [
      kf(1, { terrain: "field", glory: 0.55, crowd: 0.5, actors: [F(0.45, "man", "raise", "white")] }),
      kf(6, { terrain: "field", glory: 0.4, actors: [AN(0.55, "ox", 0.9), F(0.35, "man", "carry", "green")] }),
    ],
    beats: [
      { upTo: 5, reaction: "'Deus tenha piedade e nos abençoe.' 🤍" },
      { upTo: 99, reaction: "A terra dá o seu fruto; louvem-te os povos! 🌾" },
    ],
  },
  68: {
    keyframes: [
      kf(1, { terrain: "mountain", glory: 0.6, actors: [F(0.45, "man", "raise", "white")] }),
      kf(17, { terrain: "mountain", glory: 0.7, crowd: 0.6, props: [P("arkCovenant", 0.5, 1) ], actors: [F(0.3, "king", "walk", "gold")] }),
      kf(24, { terrain: "city", glory: 0.6, crowd: 0.7, actors: [F(0.4, "man", "raise", "purple")] }),
    ],
    beats: [
      { upTo: 6, reaction: "Levante-se Deus, e dispersem-se os inimigos! ⚡" },
      { upTo: 23, reaction: "A procissão de Deus sobe ao santuário. 👑" },
      { upTo: 99, reaction: "Bendito o Senhor, que nos carrega dia a dia. ✨" },
    ],
  },
  69: {
    keyframes: [
      kf(1, { terrain: "sea", flood: 0.7, night: 0.3, actors: [F(0.5, "man", "raise", "blue")] }),
      kf(13, { terrain: "sea", glory: 0.4, actors: [F(0.45, "man", "kneel", "white")] }),
      kf(30, { terrain: "city", glory: 0.5, actors: [F(0.45, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 12, reaction: "'Salva-me, as águas chegam ao pescoço!' 🌊" },
      { upTo: 29, reaction: "'Ouve-me, ó Deus, na multidão da tua misericórdia.' 🙏" },
      { upTo: 99, reaction: "Louvarei o nome de Deus com cântico. 🎶" },
    ],
  },
  70: {
    keyframes: [
      kf(1, { terrain: "plain", night: 0.3, actors: [F(0.5, "man", "raise", "brown")] }),
      kf(4, { terrain: "plain", glory: 0.45, actors: [F(0.45, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 3, reaction: "'Apressa-te, ó Deus, a livrar-me!' ⏳" },
      { upTo: 99, reaction: "Alegrem-se os que te buscam. 🤍" },
    ],
  },
  71: {
    keyframes: [
      kf(1, { terrain: "mountain", glory: 0.4, actors: [F(0.5, "elder", "kneel", "gray")] }),
      kf(17, { terrain: "mountain", glory: 0.6, props: [P("lampstand", 0.66, 0.9, 0.6)], actors: [F(0.42, "elder", "raise", "white")] }),
    ],
    beats: [
      { upTo: 8, reaction: "'Em ti, SENHOR, confio; és meu refúgio.' 🪨" },
      { upTo: 99, reaction: "Na velhice não me desampares; louvarei sempre. 🕯️" },
    ],
  },
  72: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.5, props: [P("tower", 0.2, 1.2)], actors: [F(0.5, "king", "stand", "gold")] }),
      kf(12, { terrain: "city", glory: 0.5, crowd: 0.6, actors: [F(0.4, "king", "raise", "gold"), F(0.65, "man", "bow", "brown")] }),
    ],
    beats: [
      { upTo: 11, reaction: "Julgue o rei o povo com justiça. 👑⚖️" },
      { upTo: 99, reaction: "Toda a terra se encha da sua glória! ✨" },
    ],
  },
  73: {
    keyframes: [
      kf(1, { terrain: "plain", night: 0.35, actors: [F(0.5, "man", "mourn", "gray")] }),
      kf(17, { terrain: "city", glory: 0.55, props: [P("altar", 0.62, 0.9, 0.4)], actors: [F(0.42, "man", "kneel", "white")] }),
    ],
    beats: [
      { upTo: 16, reaction: "Por que prosperam os ímpios? 😕" },
      { upTo: 99, reaction: "No santuário de Deus, entendi o seu fim. ✨" },
    ],
  },
  74: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.5, fire: 0.4, actors: [F(0.5, "man", "mourn", "gray")] }),
      kf(12, { terrain: "sea", glory: 0.4, seaSplit: 0.4, actors: [F(0.45, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 11, reaction: "O inimigo destruiu o santuário. 🔥😢" },
      { upTo: 99, reaction: "Mas Deus é meu Rei desde a antiguidade. 🌊" },
    ],
  },
  75: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.5, actors: [F(0.45, "man", "raise", "white")] }),
      kf(6, { terrain: "mountain", glory: 0.6, storm: 0.3, actors: [F(0.5, "man", "stand", "white")] }),
    ],
    beats: [
      { upTo: 5, god: "No tempo determinado, eu julgarei com retidão.", reaction: "Deus levanta e abate. ⚖️" },
      { upTo: 99, reaction: "Louvarei ao Deus de Jacó para sempre. 🎶" },
    ],
  },
  76: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.55, props: [P("tower", 0.2, 1.1)], actors: [F(0.45, "man", "raise", "white")] }),
      kf(7, { terrain: "mountain", glory: 0.6, storm: 0.3, actors: [F(0.5, "man", "bow", "white")] }),
    ],
    beats: [
      { upTo: 6, reaction: "Deus é conhecido em Judá; grande é o seu nome. 🏰" },
      { upTo: 99, reaction: "Tremenda é a tua presença, ó Deus. ⚡" },
    ],
  },
  77: {
    keyframes: [
      kf(1, { terrain: "sea", night: 0.6, actors: [F(0.5, "man", "mourn", "gray")] }),
      kf(11, { terrain: "sea", glory: 0.4, storm: 0.3, actors: [F(0.45, "man", "raise", "white")] }),
      kf(16, { terrain: "sea", seaSplit: 0.7, glory: 0.4, actors: [F(0.4, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 10, reaction: "'A minha alma recusa consolo.' 🌙" },
      { upTo: 15, reaction: "Lembrarei das obras do SENHOR. ✨" },
      { upTo: 99, reaction: "As águas te viram, ó Deus, e tremeram. 🌊" },
    ],
  },
  78: {
    keyframes: [
      kf(1, { terrain: "plain", actors: [F(0.4, "elder", "stand", "gray"), F(0.65, "child", "stand", "sand")] }),
      kf(13, { terrain: "sea", seaSplit: 0.7, crowd: 0.5, actors: [F(0.4, "man", "raise", "brown")] }),
      kf(52, { terrain: "desert", crowd: 0.6, props: [P("pillarCloud", 0.5, 1)], actors: [F(0.35, "man", "walk", "brown")] }),
    ],
    beats: [
      { upTo: 12, reaction: "Contaremos às gerações os feitos do SENHOR. 📖" },
      { upTo: 51, reaction: "Ele abriu o mar e os guiou pelo deserto. 🌊" },
      { upTo: 99, reaction: "Escolheu Davi para apascentar seu povo. 🐑" },
    ],
  },
  79: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.55, fire: 0.5, actors: [F(0.5, "man", "mourn", "gray")] }),
      kf(8, { terrain: "city", glory: 0.4, actors: [F(0.45, "man", "kneel", "white")] }),
    ],
    beats: [
      { upTo: 7, reaction: "As nações profanaram Jerusalém. 🔥😢" },
      { upTo: 99, reaction: "'Ajuda-nos, ó Deus da nossa salvação.' 🙏" },
    ],
  },
  80: {
    keyframes: [
      kf(1, { terrain: "hills", night: 0.3, actors: [F(0.4, "shepherd", "raise", "brown"), AN(0.6, "sheep"), AN(0.75, "sheep")] }),
      kf(8, { terrain: "field", glory: 0.4, props: [P("tree", 0.5, 1.2)], actors: [F(0.42, "man", "kneel", "white")] }),
    ],
    beats: [
      { upTo: 7, reaction: "Ó Pastor de Israel, resplandece! 🐑" },
      { upTo: 99, reaction: "Restaura-nos, ó Deus; faze brilhar teu rosto. 🌿" },
    ],
  },
  81: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.5, crowd: 0.7, props: [P("ram", 0.7, 0.8)], actors: [F(0.45, "man", "raise", "purple")] }),
      kf(8, { terrain: "city", glory: 0.6, actors: [F(0.5, "man", "stand", "white")] }),
    ],
    beats: [
      { upTo: 7, reaction: "'Cantai alegres a Deus, nossa força!' 🎺" },
      { upTo: 99, god: "Eu sou o SENHOR teu Deus, que te tirei do Egito.", reaction: "Deus chama o povo a ouvi-lo. ✨" },
    ],
  },
  82: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.5, actors: [F(0.35, "king", "stand", "purple"), F(0.6, "elder", "stand", "gray")] }),
      kf(8, { terrain: "city", glory: 0.6, actors: [F(0.5, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 7, god: "Até quando julgareis injustamente?", reaction: "Deus preside no meio dos poderosos. ⚖️" },
      { upTo: 99, reaction: "Levanta-te, ó Deus, julga a terra! ✨" },
    ],
  },
  83: {
    keyframes: [
      kf(1, { terrain: "plain", storm: 0.4, night: 0.3, actors: [F(0.4, "warrior", "stand", "red"), F(0.65, "warrior", "stand", "gray")] }),
      kf(13, { terrain: "plain", storm: 0.6, fire: 0.4, actors: [F(0.5, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 12, reaction: "As nações conspiram contra o teu povo. ⚔️" },
      { upTo: 99, reaction: "Saibam que só tu és o Altíssimo. ⚡" },
    ],
  },
  84: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.55, props: [P("dove", 0.3, 0.8), P("altar", 0.6, 0.9, 0.4)], actors: [F(0.45, "man", "raise", "white")] }),
      kf(10, { terrain: "city", glory: 0.6, actors: [F(0.5, "man", "bow", "white")] }),
    ],
    beats: [
      { upTo: 9, reaction: "'Quão amáveis são os teus tabernáculos!' 🕊️" },
      { upTo: 99, reaction: "Melhor um dia nos teus átrios do que mil. ✨" },
    ],
  },
  85: {
    keyframes: [
      kf(1, { terrain: "field", night: 0.25, actors: [F(0.5, "man", "kneel", "brown")] }),
      kf(10, { terrain: "field", glory: 0.5, actors: [F(0.4, "man", "raise", "white"), F(0.6, "woman", "stand", "green")] }),
    ],
    beats: [
      { upTo: 9, reaction: "'Aviva-nos, ó Deus da nossa salvação.' 🌱" },
      { upTo: 99, reaction: "Misericórdia e verdade se encontraram. 🤍" },
    ],
  },
  86: {
    keyframes: [
      kf(1, { terrain: "mountain", glory: 0.4, actors: [F(0.5, "man", "kneel", "brown")] }),
      kf(11, { terrain: "mountain", glory: 0.6, actors: [F(0.45, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 10, reaction: "'Inclina, SENHOR, os teus ouvidos.' 🙏" },
      { upTo: 99, reaction: "'Ensina-me o teu caminho, ó SENHOR.' ✨" },
    ],
  },
  87: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.6, props: [P("tower", 0.2, 1.2), P("tower", 0.82, 1)], actors: [F(0.5, "man", "raise", "white")] }),
      kf(5, { terrain: "city", glory: 0.55, crowd: 0.6, actors: [F(0.45, "man", "raise", "purple")] }),
    ],
    beats: [
      { upTo: 4, reaction: "Seus fundamentos estão nos montes santos. 🏰" },
      { upTo: 99, reaction: "Coisas gloriosas se dizem de ti, cidade de Deus. ✨" },
    ],
  },
  88: {
    keyframes: [
      kf(1, { terrain: "sea", night: 0.8, darkness: 0.5, actors: [F(0.5, "man", "mourn", "gray")] }),
      kf(9, { terrain: "sea", night: 0.85, darkness: 0.6, actors: [F(0.5, "man", "raise", "gray")] }),
    ],
    beats: [
      { upTo: 8, reaction: "'A minha alma está cheia de angústias.' 🌑" },
      { upTo: 99, reaction: "'Clamo a ti, SENHOR, na treva.' 😢" },
    ],
  },
  89: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.6, actors: [F(0.45, "man", "raise", "white")] }),
      kf(19, { terrain: "city", glory: 0.6, props: [P("tower", 0.75, 1.1)], actors: [F(0.4, "king", "stand", "gold")] }),
      kf(38, { terrain: "plain", night: 0.4, actors: [F(0.5, "man", "mourn", "gray")] }),
    ],
    beats: [
      { upTo: 18, reaction: "'Cantarei as misericórdias do SENHOR!' 🎶" },
      { upTo: 37, god: "Fiz aliança com o meu escolhido; jurei a Davi.", reaction: "O trono de Davi firmado para sempre. 👑" },
      { upTo: 99, reaction: "'Até quando, SENHOR?' Bendito seja para sempre. 🙏" },
    ],
  },
  90: {
    keyframes: [
      kf(1, { terrain: "mountain", glory: 0.5, actors: [F(0.5, "elder", "stand", "white")] }),
      kf(12, { terrain: "field", glory: 0.4, props: [P("tree", 0.6, 0.9)], actors: [F(0.45, "man", "kneel", "brown")] }),
    ],
    beats: [
      { upTo: 11, reaction: "SENHOR, tu és nosso refúgio de geração em geração. ⛰️" },
      { upTo: 99, reaction: "Ensina-nos a contar nossos dias. 🌿" },
    ],
  },
  91: {
    keyframes: [
      kf(1, { terrain: "mountain", glory: 0.6, actors: [F(0.5, "man", "stand", "white")] }),
      kf(11, { terrain: "mountain", glory: 0.7, props: [P("dove", 0.3, 0.8)], actors: [F(0.4, "angel", "raise", "white"), F(0.62, "angel", "stand", "white")] }),
      kf(14, { terrain: "mountain", glory: 0.85, actors: [F(0.45, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 10, reaction: "Quem habita no abrigo do Altíssimo descansa. 🏔️" },
      { upTo: 13, reaction: "Ele dará ordens aos seus anjos por ti. 👼" },
      { upTo: 99, god: "Porque me amou, eu o livrarei e o exaltarei.", reaction: "A promessa do Altíssimo. ✨" },
    ],
  },
  92: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.55, props: [P("lampstand", 0.66, 0.9, 0.6)], actors: [F(0.45, "man", "raise", "white")] }),
      kf(12, { terrain: "garden", glory: 0.4, props: [P("palm", 0.4, 1.2), P("tree", 0.7, 1.1)], actors: [F(0.55, "man", "stand", "green")] }),
    ],
    beats: [
      { upTo: 11, reaction: "Bom é louvar ao SENHOR no dia de sábado. 🎶" },
      { upTo: 99, reaction: "O justo floresce como a palmeira. 🌴" },
    ],
  },
  93: {
    keyframes: [
      kf(1, { terrain: "sea", glory: 0.6, actors: [F(0.5, "king", "stand", "gold")] }),
      kf(3, { terrain: "sea", glory: 0.5, flood: 0.5, storm: 0.4, actors: [F(0.45, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 2, reaction: "O SENHOR reina, vestido de majestade. 👑" },
      { upTo: 99, reaction: "Mais que o bramido das águas, forte é o SENHOR! 🌊" },
    ],
  },
  94: {
    keyframes: [
      kf(1, { terrain: "plain", storm: 0.4, actors: [F(0.5, "man", "raise", "brown")] }),
      kf(16, { terrain: "mountain", glory: 0.5, actors: [F(0.45, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 15, reaction: "Ó Deus das vinganças, resplandece! ⚡" },
      { upTo: 99, reaction: "O SENHOR é o meu alto refúgio. 🪨" },
    ],
  },
  95: {
    keyframes: [
      kf(1, { terrain: "hills", glory: 0.6, crowd: 0.7, actors: [F(0.4, "man", "raise", "white"), F(0.6, "man", "raise", "purple")] }),
      kf(6, { terrain: "hills", glory: 0.55, actors: [F(0.4, "man", "kneel", "white"), AN(0.65, "sheep"), AN(0.8, "sheep")] }),
    ],
    beats: [
      { upTo: 5, reaction: "'Vinde, cantemos ao SENHOR com júbilo!' 🎶" },
      { upTo: 99, god: "Não endureçais o coração como em Meribá.", reaction: "Somos o povo do seu pasto. 🐑" },
    ],
  },
  96: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.6, crowd: 0.7, actors: [F(0.4, "man", "raise", "white"), F(0.62, "woman", "raise", "purple")] }),
      kf(11, { terrain: "sea", glory: 0.5, actors: [F(0.5, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 10, reaction: "'Cantai ao SENHOR um cântico novo!' 🎶" },
      { upTo: 99, reaction: "Alegrem-se os céus, o mar e os campos! 🌊🌾" },
    ],
  },
  97: {
    keyframes: [
      kf(1, { terrain: "mountain", glory: 0.7, storm: 0.5, fire: 0.4, actors: [F(0.5, "man", "bow", "white")] }),
      kf(9, { terrain: "city", glory: 0.6, crowd: 0.5, actors: [F(0.45, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 8, reaction: "O SENHOR reina! Nuvens e fogo o cercam. ⚡🔥" },
      { upTo: 99, reaction: "Alegrai-vos, ó justos, no SENHOR! ✨" },
    ],
  },
  98: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.6, crowd: 0.7, props: [P("ram", 0.72, 0.8)], actors: [F(0.4, "man", "raise", "white"), F(0.62, "man", "raise", "purple")] }),
      kf(7, { terrain: "sea", glory: 0.55, props: [P("river", 0.7, 1)], actors: [F(0.5, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 6, reaction: "'Cantai ao SENHOR um cântico novo!' 🎺" },
      { upTo: 99, reaction: "Brame o mar, os rios batam palmas! 🌊👏" },
    ],
  },
  99: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.7, props: [P("tower", 0.2, 1.1)], actors: [F(0.5, "king", "stand", "gold")] }),
      kf(6, { terrain: "city", glory: 0.6, props: [P("altar", 0.62, 0.9, 0.5)], actors: [F(0.45, "man", "kneel", "white")] }),
    ],
    beats: [
      { upTo: 5, reaction: "O SENHOR reina; tremam os povos. 👑" },
      { upTo: 99, reaction: "Santo é o SENHOR, nosso Deus! ✨" },
    ],
  },
  100: {
    keyframes: [
      kf(1, { terrain: "hills", glory: 0.6, crowd: 0.8, actors: [F(0.4, "man", "raise", "white"), AN(0.62, "sheep"), AN(0.78, "sheep")] }),
      kf(4, { terrain: "city", glory: 0.65, crowd: 0.7, actors: [F(0.45, "man", "raise", "purple")] }),
    ],
    beats: [
      { upTo: 3, reaction: "'Celebrai com júbilo ao SENHOR, toda a terra!' 🎉" },
      { upTo: 99, reaction: "Entrai pelas portas com ação de graças. Somos suas ovelhas. 🐑" },
    ],
  },
};
