// ============================================================================
// Roteiros de cena (Living Scene v2) — SALMOS 1 a 50, salmo por salmo.
// Poesia hebraica: louvor, lamento, confiança e súplica. Cenas atmosféricas
// conforme o tom de cada salmo. Puramente visual/narrativo — não toca em
// progresso. Segue o padrão de Êxodo (rpgExodusScenes).
// ============================================================================

import type { ChapterScript, V2Actor, V2Prop, SceneState } from "@/lib/rpgLivingV2";

const F = (x: number, role: V2Actor["role"], action: V2Actor["action"], palette?: V2Actor["palette"], extra: Partial<V2Actor> = {}): V2Actor => ({ x, role, action, palette, ...extra });
const AN = (x: number, animal: NonNullable<V2Actor["animal"]>, scale = 1, color?: string): V2Actor => ({ x, kind: "animal", animal, scale, color });
const P = (kind: string, x: number, scale = 1, fire?: number): V2Prop => ({ kind, x, scale, ...(fire != null ? { fire } : {}) });
const kf = (v: number, state: SceneState) => ({ v, state });

export const PSALMS_1: Record<number, ChapterScript> = {
  1: {
    keyframes: [
      kf(1, { terrain: "field", actors: [F(0.4, "man", "walk", "brown")] }),
      kf(3, { terrain: "river", props: [P("tree", 0.55, 1.4), P("reeds", 0.85)], actors: [F(0.3, "man", "stand", "white")] }),
      kf(4, { terrain: "field", storm: 0.3, actors: [F(0.5, "man", "mourn", "gray")] }),
    ],
    beats: [
      { upTo: 2, reaction: "Bem-aventurado quem se deleita na lei do SENHOR. 📖" },
      { upTo: 3, reaction: "Ele é como árvore junto a correntes de águas. 🌳💧" },
      { upTo: 99, reaction: "Mas os ímpios são como a palha que o vento leva. 🍃" },
    ],
  },
  2: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.7, storm: 0.3, actors: [F(0.3, "king", "raise", "red"), F(0.7, "king", "stand", "gray")] }),
      kf(6, { terrain: "mountain", glory: 0.6, actors: [F(0.45, "king", "stand", "gold")] }),
    ],
    beats: [
      { upTo: 5, reaction: "Por que se enfurecem as nações contra o SENHOR? 😠" },
      { upTo: 6, god: "Eu constituí o meu Rei sobre Sião, o meu santo monte.", reaction: "Deus ri dos que se rebelam. 👑" },
      { upTo: 99, god: "Tu és meu Filho; hoje te gerei.", reaction: "Refugiam-se nele todos os que nele confiam. 🤍" },
    ],
  },
  3: {
    keyframes: [
      kf(1, { terrain: "hills", night: 0.4, actors: [F(0.35, "man", "mourn", "blue"), F(0.7, "warrior", "stand", "gray")] }),
      kf(5, { terrain: "hills", night: 0.6, actors: [F(0.45, "man", "lie", "blue")] }),
      kf(6, { terrain: "hills", glory: 0.4, actors: [F(0.45, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 2, reaction: "SENHOR, como se multiplicam os que me afligem! 😔" },
      { upTo: 5, reaction: "Eu me deito e durmo; o SENHOR me sustém. 🌙" },
      { upTo: 99, reaction: "A salvação pertence ao SENHOR. 🙌" },
    ],
  },
  4: {
    keyframes: [
      kf(1, { terrain: "hills", night: 0.5, actors: [F(0.4, "man", "raise", "blue")] }),
      kf(8, { terrain: "hills", night: 0.7, actors: [F(0.45, "man", "lie", "blue")] }),
    ],
    beats: [
      { upTo: 3, reaction: "Ouve-me quando eu clamo, ó Deus da minha justiça. 🙏" },
      { upTo: 99, reaction: "Em paz me deito e logo adormeço, ó SENHOR. 🌙" },
    ],
  },
  5: {
    keyframes: [
      kf(1, { terrain: "hills", glory: 0.35, actors: [F(0.4, "man", "kneel", "blue")] }),
      kf(7, { terrain: "city", glory: 0.5, props: [P("tower", 0.7, 1.1)], actors: [F(0.35, "man", "bow", "white")] }),
    ],
    beats: [
      { upTo: 3, reaction: "De manhã ouvirás a minha voz, ó SENHOR. 🌅" },
      { upTo: 99, reaction: "Alegrem-se todos os que em ti confiam. 🤍" },
    ],
  },
  6: {
    keyframes: [
      kf(1, { terrain: "hills", night: 0.6, storm: 0.2, actors: [F(0.45, "man", "mourn", "gray")] }),
      kf(6, { terrain: "hills", night: 0.7, rain: 0.4, actors: [F(0.45, "man", "lie", "blue")] }),
      kf(9, { terrain: "hills", glory: 0.3, actors: [F(0.45, "man", "kneel", "white")] }),
    ],
    beats: [
      { upTo: 5, reaction: "SENHOR, tem misericórdia, pois desfaleço. 😢" },
      { upTo: 7, reaction: "Toda noite inundo de pranto a minha cama. 💧" },
      { upTo: 99, reaction: "O SENHOR ouviu a voz do meu choro. 🤍" },
    ],
  },
  7: {
    keyframes: [
      kf(1, { terrain: "mountain", storm: 0.3, actors: [F(0.4, "man", "kneel", "blue"), AN(0.72, "lion", 0.9)] }),
      kf(10, { terrain: "mountain", glory: 0.5, actors: [F(0.42, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 5, reaction: "Em ti confio; livra-me dos que me perseguem. 🦁" },
      { upTo: 99, reaction: "Deus é justo juiz e escudo dos retos. ⚖️" },
    ],
  },
  8: {
    keyframes: [
      kf(1, { terrain: "mountain", night: 0.7, glory: 0.3, props: [P("star", 0.2), P("star", 0.4), P("star", 0.65), P("star", 0.82)], actors: [F(0.45, "man", "raise", "blue")] }),
      kf(6, { terrain: "hills", night: 0.5, props: [P("star", 0.3), P("star", 0.7)], actors: [F(0.4, "shepherd", "stand", "brown"), AN(0.66, "sheep"), AN(0.8, "ox", 0.9)] }),
    ],
    beats: [
      { upTo: 4, reaction: "Quando vejo os teus céus, a lua e as estrelas... 🌙✨" },
      { upTo: 99, reaction: "Ó SENHOR, quão magnífico é o teu nome em toda a terra! 🌍" },
    ],
  },
  9: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.5, crowd: 0.4, actors: [F(0.45, "man", "raise", "white")] }),
      kf(11, { terrain: "city", glory: 0.6, props: [P("tower", 0.72, 1.1)], actors: [F(0.4, "man", "raise", "gold")] }),
    ],
    beats: [
      { upTo: 10, reaction: "Louvarei ao SENHOR de todo o meu coração. 🙌" },
      { upTo: 99, reaction: "O SENHOR é refúgio para o oprimido. 🏰" },
    ],
  },
  10: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.5, actors: [F(0.4, "man", "mourn", "gray"), F(0.72, "man", "stand", "red")] }),
      kf(16, { terrain: "city", glory: 0.4, actors: [F(0.45, "man", "kneel", "white")] }),
    ],
    beats: [
      { upTo: 11, reaction: "Por que te conservas longe, SENHOR? 😔" },
      { upTo: 99, reaction: "O SENHOR é Rei eterno; ouve o clamor do humilde. 🤍" },
    ],
  },
  11: {
    keyframes: [
      kf(1, { terrain: "mountain", glory: 0.4, actors: [F(0.42, "man", "stand", "blue")] }),
      kf(4, { terrain: "city", glory: 0.7, props: [P("tower", 0.65, 1.2)], actors: [F(0.38, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 3, reaction: "No SENHOR confio; como dizeis à minha alma que fuja? 🕊️" },
      { upTo: 99, reaction: "O SENHOR está no seu santo templo. ✨" },
    ],
  },
  12: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.5, actors: [F(0.4, "man", "mourn", "gray")] }),
      kf(6, { terrain: "city", glory: 0.5, actors: [F(0.42, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 5, reaction: "Salva-nos, SENHOR, pois faltam os fiéis. 😔" },
      { upTo: 99, god: "Por causa do gemido dos necessitados, agora me levantarei.", reaction: "As palavras do SENHOR são puras como prata refinada. 🤍" },
    ],
  },
  13: {
    keyframes: [
      kf(1, { terrain: "hills", night: 0.7, actors: [F(0.45, "man", "mourn", "gray")] }),
      kf(5, { terrain: "hills", glory: 0.4, actors: [F(0.45, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 4, reaction: "Até quando, SENHOR? Para sempre te esquecerás de mim? 😢" },
      { upTo: 99, reaction: "Mas eu confio na tua benignidade. 🤍" },
    ],
  },
  14: {
    keyframes: [
      kf(1, { terrain: "plain", night: 0.4, actors: [F(0.45, "man", "stand", "gray")] }),
      kf(7, { terrain: "city", glory: 0.5, actors: [F(0.4, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 6, reaction: "Diz o insensato no seu coração: 'Não há Deus.' 😔" },
      { upTo: 99, reaction: "Oh, se de Sião viesse a salvação de Israel! ✨" },
    ],
  },
  15: {
    keyframes: [
      kf(1, { terrain: "mountain", glory: 0.5, props: [P("tent", 0.6, 1.2)], actors: [F(0.4, "man", "stand", "white")] }),
    ],
    beats: [
      { upTo: 2, reaction: "SENHOR, quem habitará no teu tabernáculo? ⛺" },
      { upTo: 99, reaction: "Aquele que anda em integridade e pratica a justiça. 🤍" },
    ],
  },
  16: {
    keyframes: [
      kf(1, { terrain: "hills", glory: 0.4, actors: [F(0.42, "man", "kneel", "blue")] }),
      kf(11, { terrain: "hills", glory: 0.6, actors: [F(0.42, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 5, reaction: "Guarda-me, ó Deus, pois em ti me refugio. 🕊️" },
      { upTo: 99, reaction: "Na tua presença há plenitude de alegria. ✨" },
    ],
  },
  17: {
    keyframes: [
      kf(1, { terrain: "hills", night: 0.4, actors: [F(0.42, "man", "kneel", "blue")] }),
      kf(8, { terrain: "hills", glory: 0.5, props: [P("dove", 0.62, 0.8)], actors: [F(0.4, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 7, reaction: "Ouve, SENHOR, a justiça; atende ao meu clamor. 🙏" },
      { upTo: 99, reaction: "Guarda-me à sombra das tuas asas. 🕊️" },
    ],
  },
  18: {
    keyframes: [
      kf(1, { terrain: "mountain", storm: 0.5, actors: [F(0.42, "man", "raise", "blue")] }),
      kf(7, { terrain: "mountain", storm: 0.9, fire: 0.4, rain: 0.4, actors: [F(0.4, "man", "bow", "gray")] }),
      kf(16, { terrain: "sea", seaSplit: 0.5, glory: 0.5, actors: [F(0.4, "man", "raise", "white")] }),
      kf(46, { terrain: "city", glory: 0.7, props: [P("tower", 0.7, 1.1)], actors: [F(0.42, "king", "raise", "gold")] }),
    ],
    beats: [
      { upTo: 6, reaction: "Eu te amo, ó SENHOR, força minha, minha rocha. 🪨" },
      { upTo: 15, reaction: "A terra tremeu; ele trovejou dos céus! ⚡" },
      { upTo: 45, reaction: "Ele me tirou das muitas águas e me livrou. 🌊" },
      { upTo: 99, reaction: "Vive o SENHOR! Bendita seja a minha rocha! 🙌" },
    ],
  },
  19: {
    keyframes: [
      kf(1, { terrain: "mountain", night: 0.6, glory: 0.3, props: [P("star", 0.25), P("star", 0.55), P("star", 0.78)], actors: [] }),
      kf(4, { terrain: "hills", glory: 0.7, actors: [F(0.42, "man", "raise", "white")] }),
      kf(7, { terrain: "hills", glory: 0.4, props: [P("tree", 0.6, 1.1)], actors: [F(0.4, "man", "kneel", "blue")] }),
    ],
    beats: [
      { upTo: 6, reaction: "Os céus proclamam a glória de Deus. ✨🌙" },
      { upTo: 10, reaction: "A lei do SENHOR é perfeita e restaura a alma. 📖" },
      { upTo: 99, reaction: "Sejam aceitas as palavras da minha boca. 🤍" },
    ],
  },
  20: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.4, crowd: 0.5, actors: [F(0.4, "king", "kneel", "purple")] }),
      kf(7, { terrain: "plain", glory: 0.5, actors: [F(0.35, "warrior", "raise", "blue"), F(0.68, "warrior", "stand", "gray")] }),
    ],
    beats: [
      { upTo: 6, reaction: "O SENHOR te responda no dia da angústia. 👑" },
      { upTo: 99, reaction: "Uns confiam em carros; nós, no nome do SENHOR. 🙌" },
    ],
  },
  21: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.6, crowd: 0.5, actors: [F(0.42, "king", "raise", "gold")] }),
      kf(8, { terrain: "city", glory: 0.7, props: [P("tower", 0.7, 1.1)], actors: [F(0.42, "king", "stand", "gold")] }),
    ],
    beats: [
      { upTo: 7, reaction: "O rei se alegra na tua força, SENHOR. 👑✨" },
      { upTo: 99, reaction: "Exalta-te, SENHOR, na tua força! 🙌" },
    ],
  },
  22: {
    keyframes: [
      kf(1, { terrain: "hills", night: 0.7, storm: 0.3, actors: [F(0.45, "man", "mourn", "gray")] }),
      kf(12, { terrain: "hills", night: 0.5, actors: [F(0.45, "man", "lie", "gray"), AN(0.72, "ox", 0.9)] }),
      kf(22, { terrain: "city", glory: 0.5, crowd: 0.4, actors: [F(0.42, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 11, reaction: "Deus meu, Deus meu, por que me desamparaste? 😢" },
      { upTo: 21, reaction: "Cercam-me touros; mas não te afastes de mim! 🙏" },
      { upTo: 99, reaction: "Anunciarei o teu nome aos meus irmãos. 🙌" },
    ],
  },
  23: {
    keyframes: [
      kf(1, { terrain: "hills", glory: 0.35, actors: [F(0.35, "shepherd", "walk", "white"), AN(0.62, "sheep"), AN(0.75, "sheep"), AN(0.88, "sheep")] }),
      kf(2, { terrain: "river", props: [P("well", 0.72), P("reeds", 0.9)], actors: [F(0.3, "shepherd", "stand", "white"), AN(0.55, "sheep"), AN(0.68, "sheep")] }),
      kf(4, { terrain: "mountain", night: 0.5, actors: [F(0.4, "shepherd", "walk", "white"), AN(0.66, "sheep")] }),
      kf(5, { terrain: "hills", glory: 0.6, props: [P("altar", 0.55, 0.9)], actors: [F(0.42, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 1, reaction: "O SENHOR é o meu pastor; nada me faltará. 🐑" },
      { upTo: 3, reaction: "Guia-me a águas tranquilas; refrigera a minha alma. 💧" },
      { upTo: 4, reaction: "Ainda que eu ande pelo vale da sombra, não temerei. 🌙" },
      { upTo: 99, reaction: "Bondade e misericórdia me seguirão todos os dias. ✨" },
    ],
  },
  24: {
    keyframes: [
      kf(1, { terrain: "mountain", glory: 0.4, actors: [F(0.42, "man", "stand", "blue")] }),
      kf(3, { terrain: "city", glory: 0.6, props: [P("tower", 0.3, 1.2), P("tower", 0.72, 1.2)], actors: [F(0.5, "man", "raise", "white")] }),
      kf(7, { terrain: "city", glory: 0.9, crowd: 0.5, actors: [F(0.45, "king", "raise", "gold")] }),
    ],
    beats: [
      { upTo: 2, reaction: "Do SENHOR é a terra e a sua plenitude. 🌍" },
      { upTo: 6, reaction: "Quem subirá ao monte do SENHOR? O de mãos limpas. 🤍" },
      { upTo: 99, reaction: "Levantai as portas! Entrará o Rei da glória! 👑✨" },
    ],
  },
  25: {
    keyframes: [
      kf(1, { terrain: "hills", glory: 0.35, actors: [F(0.42, "man", "kneel", "blue")] }),
      kf(15, { terrain: "hills", glory: 0.5, actors: [F(0.42, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 7, reaction: "A ti, SENHOR, elevo a minha alma. 🙏" },
      { upTo: 99, reaction: "Guia-me na tua verdade e ensina-me. 🕊️" },
    ],
  },
  26: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.4, props: [P("altar", 0.55, 0.9)], actors: [F(0.42, "man", "stand", "white")] }),
    ],
    beats: [
      { upTo: 6, reaction: "Julga-me, SENHOR, pois ando em integridade. ⚖️" },
      { upTo: 99, reaction: "Amo, SENHOR, a habitação da tua casa. 🤍" },
    ],
  },
  27: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.6, actors: [F(0.42, "man", "raise", "white")] }),
      kf(4, { terrain: "city", glory: 0.7, props: [P("tent", 0.62, 1.2), P("lampstand", 0.35, 0.9, 1)], actors: [F(0.5, "man", "kneel", "blue")] }),
      kf(14, { terrain: "hills", glory: 0.4, actors: [F(0.42, "man", "stand", "white")] }),
    ],
    beats: [
      { upTo: 3, reaction: "O SENHOR é a minha luz e a minha salvação; a quem temerei? 🔥" },
      { upTo: 6, reaction: "Uma coisa peço: habitar na casa do SENHOR. 🏠" },
      { upTo: 99, reaction: "Espera no SENHOR e tem bom ânimo. 🤍" },
    ],
  },
  28: {
    keyframes: [
      kf(1, { terrain: "mountain", glory: 0.4, actors: [F(0.42, "man", "raise", "blue")] }),
      kf(6, { terrain: "hills", glory: 0.6, actors: [F(0.42, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 5, reaction: "A ti clamo, SENHOR, rocha minha. 🪨" },
      { upTo: 99, reaction: "O SENHOR é a minha força e o meu escudo. 🛡️" },
    ],
  },
  29: {
    keyframes: [
      kf(1, { terrain: "sea", storm: 0.7, glory: 0.4, actors: [F(0.42, "man", "bow", "blue")] }),
      kf(3, { terrain: "sea", storm: 0.95, rain: 0.5, fire: 0.3, actors: [] }),
      kf(10, { terrain: "city", glory: 0.7, actors: [F(0.42, "king", "stand", "gold")] }),
    ],
    beats: [
      { upTo: 2, reaction: "Tributai ao SENHOR a glória do seu nome. 🙌" },
      { upTo: 9, reaction: "A voz do SENHOR está sobre as águas; troveja! ⚡🌊" },
      { upTo: 99, reaction: "O SENHOR dá força e paz ao seu povo. 🕊️" },
    ],
  },
  30: {
    keyframes: [
      kf(1, { terrain: "hills", glory: 0.5, actors: [F(0.42, "man", "raise", "white")] }),
      kf(5, { terrain: "hills", night: 0.6, actors: [F(0.45, "man", "mourn", "gray")] }),
      kf(11, { terrain: "hills", glory: 0.7, actors: [F(0.42, "man", "raise", "gold")] }),
    ],
    beats: [
      { upTo: 4, reaction: "Exaltar-te-ei, SENHOR, porque me exalçaste. 🙌" },
      { upTo: 10, reaction: "O choro pode durar a noite, mas a alegria vem de manhã. 🌙🌅" },
      { upTo: 99, reaction: "Mudaste o meu pranto em dança. 💃" },
    ],
  },
  31: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.4, props: [P("tower", 0.68, 1.1)], actors: [F(0.4, "man", "kneel", "blue")] }),
      kf(14, { terrain: "city", glory: 0.6, actors: [F(0.42, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 5, reaction: "Nas tuas mãos entrego o meu espírito. 🙏" },
      { upTo: 99, reaction: "Esforçai-vos, e ele fortalecerá o vosso coração. 🤍" },
    ],
  },
  32: {
    keyframes: [
      kf(1, { terrain: "field", glory: 0.4, actors: [F(0.42, "man", "raise", "white")] }),
      kf(8, { terrain: "field", glory: 0.5, props: [P("tree", 0.6, 1.1)], actors: [F(0.4, "man", "stand", "blue")] }),
    ],
    beats: [
      { upTo: 5, reaction: "Bem-aventurado aquele cuja transgressão é perdoada. 🤍" },
      { upTo: 99, god: "Instruir-te-ei e te ensinarei o caminho que deves seguir.", reaction: "Alegrai-vos, ó justos, no SENHOR. 🙌" },
    ],
  },
  33: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.5, crowd: 0.6, actors: [F(0.35, "man", "raise", "white"), F(0.6, "man", "raise", "blue")] }),
      kf(6, { terrain: "sea", glory: 0.6, night: 0.3, props: [P("star", 0.3), P("star", 0.7)], actors: [] }),
    ],
    beats: [
      { upTo: 5, reaction: "Regozijai-vos no SENHOR, ó justos; cantai-lhe! 🎶" },
      { upTo: 99, reaction: "Pela palavra do SENHOR foram feitos os céus. ✨" },
    ],
  },
  34: {
    keyframes: [
      kf(1, { terrain: "hills", glory: 0.5, actors: [F(0.42, "man", "raise", "white")] }),
      kf(8, { terrain: "hills", glory: 0.6, crowd: 0.4, actors: [F(0.35, "man", "stand", "blue"), F(0.6, "child", "raise", "green")] }),
    ],
    beats: [
      { upTo: 7, reaction: "Louvarei ao SENHOR em todo o tempo. 🙌" },
      { upTo: 99, reaction: "Provai e vede que o SENHOR é bom. 🤍" },
    ],
  },
  35: {
    keyframes: [
      kf(1, { terrain: "plain", storm: 0.4, actors: [F(0.35, "man", "raise", "blue"), F(0.7, "warrior", "fight", "red", { facing: -1 })] }),
      kf(9, { terrain: "hills", glory: 0.5, actors: [F(0.42, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 8, reaction: "Contende, SENHOR, com os que contendem comigo. ⚔️" },
      { upTo: 99, reaction: "Minha alma se alegrará na tua salvação. 🙌" },
    ],
  },
  36: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.5, actors: [F(0.7, "man", "stand", "gray")] }),
      kf(7, { terrain: "river", glory: 0.6, props: [P("well", 0.6), P("tree", 0.78, 1.1)], actors: [F(0.32, "man", "kneel", "white")] }),
    ],
    beats: [
      { upTo: 6, reaction: "A tua benignidade, SENHOR, chega até os céus. ✨" },
      { upTo: 99, reaction: "Em ti está o manancial da vida. 💧" },
    ],
  },
  37: {
    keyframes: [
      kf(1, { terrain: "field", glory: 0.35, actors: [F(0.42, "man", "stand", "blue")] }),
      kf(11, { terrain: "field", glory: 0.5, props: [P("tree", 0.55, 1.2)], actors: [F(0.35, "man", "stand", "white"), AN(0.72, "sheep")] }),
    ],
    beats: [
      { upTo: 8, reaction: "Não te irrites por causa dos malfeitores. 🌾" },
      { upTo: 99, reaction: "Os mansos herdarão a terra e viverão em paz. 🤍" },
    ],
  },
  38: {
    keyframes: [
      kf(1, { terrain: "hills", night: 0.6, actors: [F(0.45, "man", "mourn", "gray")] }),
      kf(15, { terrain: "hills", glory: 0.3, actors: [F(0.45, "man", "kneel", "blue")] }),
    ],
    beats: [
      { upTo: 8, reaction: "Não há saúde na minha carne por causa do meu pecado. 😢" },
      { upTo: 99, reaction: "Em ti espero, SENHOR; tu me responderás. 🙏" },
    ],
  },
  39: {
    keyframes: [
      kf(1, { terrain: "plain", night: 0.4, actors: [F(0.42, "man", "stand", "gray")] }),
      kf(7, { terrain: "hills", glory: 0.4, actors: [F(0.42, "man", "kneel", "blue")] }),
    ],
    beats: [
      { upTo: 6, reaction: "Faze-me conhecer, SENHOR, quão passageiro sou. ⏳" },
      { upTo: 99, reaction: "Agora, que espero eu? A minha esperança está em ti. 🤍" },
    ],
  },
  40: {
    keyframes: [
      kf(1, { terrain: "hills", glory: 0.4, actors: [F(0.45, "man", "raise", "white")] }),
      kf(3, { terrain: "city", glory: 0.6, crowd: 0.4, actors: [F(0.42, "man", "raise", "gold")] }),
    ],
    beats: [
      { upTo: 5, reaction: "Ele me tirou do poço e pôs um novo cântico em minha boca. 🎶" },
      { upTo: 99, reaction: "Grande é o SENHOR! Não te detenhas, ó meu Deus. 🙌" },
    ],
  },
  41: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.4, actors: [F(0.35, "man", "stand", "white"), F(0.62, "man", "lie", "gray")] }),
      kf(11, { terrain: "hills", glory: 0.5, actors: [F(0.42, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 10, reaction: "Bem-aventurado o que atende ao pobre. 🤍" },
      { upTo: 99, reaction: "Bendito seja o SENHOR, Deus de Israel! 🙌" },
    ],
  },
  42: {
    keyframes: [
      kf(1, { terrain: "river", glory: 0.35, props: [P("reeds", 0.85)], actors: [F(0.4, "man", "kneel", "blue"), AN(0.68, "goat", 0.9)] }),
      kf(6, { terrain: "mountain", night: 0.5, storm: 0.3, actors: [F(0.42, "man", "mourn", "gray")] }),
      kf(11, { terrain: "hills", glory: 0.5, actors: [F(0.42, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 5, reaction: "Como suspira a corça pelas águas, suspira minha alma por ti. 🦌💧" },
      { upTo: 10, reaction: "Todas as tuas ondas passaram sobre mim. 🌊" },
      { upTo: 99, reaction: "Espera em Deus, pois ainda o louvarei. 🤍" },
    ],
  },
  43: {
    keyframes: [
      kf(1, { terrain: "hills", night: 0.4, actors: [F(0.42, "man", "kneel", "blue")] }),
      kf(3, { terrain: "mountain", glory: 0.7, props: [P("altar", 0.55, 0.9), P("lampstand", 0.72, 0.9, 1)], actors: [F(0.35, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 2, reaction: "Julga-me, ó Deus; defende a minha causa. 🙏" },
      { upTo: 99, reaction: "Envia a tua luz; leva-me ao teu santo monte. 🔥✨" },
    ],
  },
  44: {
    keyframes: [
      kf(1, { terrain: "plain", glory: 0.4, actors: [F(0.42, "man", "stand", "blue")] }),
      kf(9, { terrain: "plain", storm: 0.5, night: 0.4, actors: [F(0.4, "warrior", "mourn", "gray")] }),
      kf(23, { terrain: "hills", glory: 0.3, actors: [F(0.42, "man", "kneel", "white")] }),
    ],
    beats: [
      { upTo: 8, reaction: "Ó Deus, ouvimos o que fizeste nos dias antigos. 📖" },
      { upTo: 22, reaction: "Mas agora nos rejeitaste e nos humilhaste. 😢" },
      { upTo: 99, reaction: "Levanta-te! Redime-nos por tua misericórdia. 🙏" },
    ],
  },
  45: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.6, crowd: 0.4, actors: [F(0.42, "king", "stand", "gold")] }),
      kf(9, { terrain: "city", glory: 0.7, actors: [F(0.35, "king", "stand", "gold"), F(0.62, "woman", "stand", "purple")] }),
    ],
    beats: [
      { upTo: 8, reaction: "O meu coração transborda; canto ao rei. 👑" },
      { upTo: 99, reaction: "Entra a princesa em vestes de ouro. ✨" },
    ],
  },
  46: {
    keyframes: [
      kf(1, { terrain: "mountain", storm: 0.6, flood: 0.4, actors: [F(0.42, "man", "stand", "blue")] }),
      kf(4, { terrain: "river", glory: 0.6, props: [P("tower", 0.7, 1.2), P("tree", 0.3, 1.1)], actors: [F(0.4, "man", "raise", "white")] }),
      kf(10, { terrain: "city", glory: 0.7, actors: [F(0.42, "man", "kneel", "white")] }),
    ],
    beats: [
      { upTo: 3, reaction: "Deus é o nosso refúgio; não temeremos ainda que a terra se mude. 🏔️" },
      { upTo: 9, reaction: "Há um rio que alegra a cidade de Deus. 💧" },
      { upTo: 99, god: "Aquietai-vos e sabei que eu sou Deus.", reaction: "O SENHOR dos Exércitos está conosco. 🛡️" },
    ],
  },
  47: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.6, crowd: 0.8, actors: [F(0.35, "man", "raise", "white"), F(0.6, "man", "raise", "blue")] }),
      kf(5, { terrain: "city", glory: 0.8, crowd: 0.6, actors: [F(0.45, "king", "raise", "gold")] }),
    ],
    beats: [
      { upTo: 4, reaction: "Batei palmas, todos os povos; celebrai a Deus! 👏" },
      { upTo: 99, reaction: "Deus reina sobre as nações. 👑🙌" },
    ],
  },
  48: {
    keyframes: [
      kf(1, { terrain: "mountain", glory: 0.6, props: [P("tower", 0.3, 1.2), P("tower", 0.72, 1.2)], actors: [F(0.5, "man", "raise", "white")] }),
      kf(9, { terrain: "city", glory: 0.7, crowd: 0.4, actors: [F(0.42, "man", "stand", "blue")] }),
    ],
    beats: [
      { upTo: 8, reaction: "Grande é o SENHOR; formosa é Sião, o monte santo. 🏰✨" },
      { upTo: 99, reaction: "Este Deus é o nosso Deus para todo o sempre. 🙌" },
    ],
  },
  49: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.3, crowd: 0.4, actors: [F(0.4, "elder", "stand", "gray")] }),
      kf(15, { terrain: "hills", glory: 0.5, actors: [F(0.42, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 12, reaction: "Ouvi isto, todos os povos: ninguém leva a riqueza consigo. ⏳" },
      { upTo: 99, reaction: "Mas Deus remirá a minha alma do poder da morte. 🤍" },
    ],
  },
  50: {
    keyframes: [
      kf(1, { terrain: "mountain", glory: 0.8, fire: 0.5, storm: 0.4, actors: [F(0.42, "man", "bow", "gray")] }),
      kf(7, { terrain: "mountain", glory: 0.9, props: [P("altar", 0.55, 0.9, 0.6)], actors: [F(0.42, "man", "kneel", "white")] }),
      kf(14, { terrain: "hills", glory: 0.6, actors: [F(0.42, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 6, reaction: "O Deus dos deuses fala; convoca a terra. ⚡🔥" },
      { upTo: 15, god: "Oferece a Deus ação de graças e invoca-me no dia da angústia.", reaction: "Meu é o gado dos montes, diz o SENHOR. 🐂" },
      { upTo: 99, god: "Quem oferece louvor me glorifica.", reaction: "Considerai isto, vós que vos esqueceis de Deus. 🙏" },
    ],
  },
};
