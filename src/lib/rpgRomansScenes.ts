// ============================================================================
// Roteiros de cena (Living Scene v2) — ROMANOS, capítulo por capítulo.
// A grande carta doutrinária de Paulo à igreja de Roma: o pecado do mundo,
// a justificação pela fé, a graça em Cristo, a vida no Espírito, "mais que
// vencedores", o corpo como sacrifício vivo e a vida em amor. Puramente
// visual/narrativo — não toca em progresso. Segue o padrão de Êxodo.
// ============================================================================

import type { ChapterScript, V2Actor, V2Prop, SceneState } from "@/lib/rpgLivingV2";

const F = (x: number, role: V2Actor["role"], action: V2Actor["action"], palette?: V2Actor["palette"], extra: Partial<V2Actor> = {}): V2Actor => ({ x, role, action, palette, ...extra });
const AN = (x: number, animal: NonNullable<V2Actor["animal"]>, scale = 1, color?: string): V2Actor => ({ x, kind: "animal", animal, scale, color });
const P = (kind: string, x: number, scale = 1, fire?: number): V2Prop => ({ kind, x, scale, ...(fire != null ? { fire } : {}) });
const kf = (v: number, state: SceneState) => ({ v, state });

export const ROMANS_SCENES: Record<number, ChapterScript> = {
  1: {
    keyframes: [
      kf(1, { terrain: "city", props: [P("tablets", 0.62), P("tower", 0.85, 1.1)], actors: [F(0.4, "man", "stand", "white")] }),
      kf(8, { terrain: "city", crowd: 0.6, props: [P("tower", 0.84, 1.1)], actors: [F(0.4, "man", "raise", "white")] }),
      kf(18, { terrain: "city", night: 0.55, storm: 0.4, props: [P("tower", 0.85, 1)], actors: [F(0.45, "man", "mourn", "brown"), F(0.65, "man", "bow", "gray")] }),
    ],
    beats: [
      { upTo: 7, reaction: "Paulo, servo de Cristo, escreve aos amados em Roma. ✍️" },
      { upTo: 17, god: "O justo viverá pela fé.", reaction: "O evangelho é poder de Deus para salvação. ✨" },
      { upTo: 99, reaction: "A ira de Deus se revela contra a impiedade dos homens. 🌩️" },
    ],
  },
  2: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.4, props: [P("tower", 0.85, 1)], actors: [F(0.4, "man", "stand", "brown"), F(0.62, "man", "stand", "gray")] }),
      kf(12, { terrain: "city", night: 0.3, props: [P("tablets", 0.55)], actors: [F(0.45, "man", "stand", "white")] }),
    ],
    beats: [
      { upTo: 11, reaction: "Não julgues o outro: Deus não faz acepção de pessoas. ⚖️" },
      { upTo: 99, god: "Deus retribuirá a cada um segundo as suas obras.", reaction: "A lei está escrita no coração. 🤍" },
    ],
  },
  3: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.35, props: [P("tower", 0.85, 1)], actors: [F(0.4, "man", "stand", "white")] }),
      kf(10, { terrain: "city", night: 0.5, actors: [F(0.35, "man", "bow", "brown"), F(0.55, "man", "mourn", "gray"), F(0.72, "man", "bow", "sand")] }),
      kf(21, { terrain: "city", glory: 0.6, props: [P("cross", 0.6, 1.1)], actors: [F(0.4, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 9, reaction: "Todos pecaram e estão debaixo do pecado. 😔" },
      { upTo: 20, reaction: "Não há um justo sequer diante de Deus." },
      { upTo: 99, god: "A justiça de Deus vem pela fé em Jesus Cristo.", reaction: "Justificados gratuitamente pela sua graça. ✨" },
    ],
  },
  4: {
    keyframes: [
      kf(1, { terrain: "field", glory: 0.35, props: [P("tent", 0.7), P("star", 0.5, 0.8)], actors: [F(0.35, "elder", "stand", "white")] }),
      kf(18, { terrain: "field", glory: 0.5, props: [P("star", 0.45, 0.8), P("star", 0.6, 0.7)], actors: [F(0.4, "elder", "raise", "white")] }),
    ],
    beats: [
      { upTo: 12, reaction: "Abraão creu, e isso lhe foi imputado como justiça. 🌟" },
      { upTo: 99, god: "Assim será a tua descendência.", reaction: "Ele esperou contra a esperança, e creu. 🤍" },
    ],
  },
  5: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.5, actors: [F(0.4, "man", "raise", "white")] }),
      kf(8, { terrain: "city", glory: 0.7, props: [P("cross", 0.6, 1.2)], actors: [F(0.4, "man", "kneel", "brown")] }),
      kf(18, { terrain: "city", glory: 0.8, props: [P("cross", 0.6, 1.1)], actors: [F(0.42, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 7, reaction: "Justificados pela fé, temos paz com Deus. 🕊️" },
      { upTo: 11, god: "Deus prova o seu amor: Cristo morreu por nós.", reaction: "O amor de Deus derramado em nossos corações. ❤️" },
      { upTo: 99, reaction: "Onde abundou o pecado, superabundou a graça. ✨" },
    ],
  },
  6: {
    keyframes: [
      kf(1, { terrain: "river", glory: 0.4, actors: [F(0.4, "man", "stand", "white")] }),
      kf(4, { terrain: "river", glory: 0.55, props: [P("tomb", 0.7, 1)], actors: [F(0.4, "man", "kneel", "brown")] }),
      kf(11, { terrain: "river", glory: 0.7, actors: [F(0.42, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 5, reaction: "Batizados na morte de Cristo, sepultados com ele. 💧" },
      { upTo: 14, god: "O pecado não terá domínio sobre vós.", reaction: "Andar em novidade de vida. 🌱" },
      { upTo: 99, reaction: "O dom de Deus é a vida eterna em Cristo Jesus. ✨" },
    ],
  },
  7: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.35, props: [P("tablets", 0.6)], actors: [F(0.42, "man", "stand", "brown")] }),
      kf(15, { terrain: "city", night: 0.5, actors: [F(0.45, "man", "mourn", "brown")] }),
      kf(24, { terrain: "city", glory: 0.4, actors: [F(0.42, "man", "kneel", "white")] }),
    ],
    beats: [
      { upTo: 14, reaction: "A lei é santa, mas o pecado habita em mim. 📜" },
      { upTo: 23, reaction: "O bem que quero, não faço; o mal que não quero, faço. 😔" },
      { upTo: 99, god: undefined, reaction: "'Quem me livrará?' Graças a Deus por Jesus Cristo! 🙏" },
    ],
  },
  8: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.6, actors: [F(0.4, "man", "raise", "white")] }),
      kf(14, { terrain: "hills", glory: 0.6, props: [P("dove", 0.5, 0.9)], actors: [F(0.42, "man", "raise", "white")] }),
      kf(28, { terrain: "hills", glory: 0.8, actors: [F(0.4, "man", "raise", "white")] }),
      kf(37, { terrain: "mountain", glory: 0.95, crowd: 0.4, actors: [F(0.42, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 13, reaction: "Nenhuma condenação para os que estão em Cristo Jesus. 🕊️" },
      { upTo: 27, god: "O Espírito intercede por nós com gemidos.", reaction: "Filhos de Deus, guiados pelo Espírito. ✨" },
      { upTo: 36, god: "Todas as coisas cooperam para o bem dos que amam a Deus.", reaction: "Chamados segundo o seu propósito. 🤍" },
      { upTo: 99, reaction: "Mais que vencedores! Nada nos separa do amor de Deus. 🌟" },
    ],
  },
  9: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.4, actors: [F(0.42, "man", "mourn", "brown")] }),
      kf(14, { terrain: "field", glory: 0.4, props: [P("tent", 0.72)], actors: [F(0.4, "man", "stand", "white")] }),
      kf(30, { terrain: "city", glory: 0.35, actors: [F(0.42, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 13, reaction: "Paulo lamenta pelos seus irmãos segundo a carne. 😢" },
      { upTo: 29, god: "Terei misericórdia de quem eu quiser.", reaction: "O oleiro tem poder sobre o barro. 🏺" },
      { upTo: 99, reaction: "A justiça alcançada pela fé, não pelas obras. ✨" },
    ],
  },
  10: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.4, actors: [F(0.42, "man", "kneel", "white")] }),
      kf(9, { terrain: "city", glory: 0.6, props: [P("cross", 0.62, 1)], actors: [F(0.4, "man", "raise", "white")] }),
      kf(14, { terrain: "hills", glory: 0.4, crowd: 0.3, actors: [F(0.35, "man", "walk", "white"), F(0.6, "man", "stand", "sand")] }),
    ],
    beats: [
      { upTo: 8, reaction: "O coração de Paulo ora pela salvação de Israel. 🙏" },
      { upTo: 13, god: "Todo o que invocar o nome do Senhor será salvo.", reaction: "Crer no coração, confessar com a boca. ❤️" },
      { upTo: 99, reaction: "Como ouvirão sem quem pregue? Que belos os pés dos mensageiros! 👣" },
    ],
  },
  11: {
    keyframes: [
      kf(1, { terrain: "hills", glory: 0.35, props: [P("tree", 0.6, 1.2)], actors: [F(0.4, "man", "stand", "white")] }),
      kf(17, { terrain: "hills", glory: 0.5, props: [P("tree", 0.55, 1.3)], actors: [F(0.42, "man", "raise", "white")] }),
      kf(33, { terrain: "mountain", glory: 0.85, actors: [F(0.42, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 16, reaction: "Deus não rejeitou o seu povo; há um remanescente. 🌿" },
      { upTo: 32, god: "Enxertado pela fé, permanece na bondade de Deus.", reaction: "A oliveira: ramos naturais e enxertados. 🫒" },
      { upTo: 99, reaction: "Ó profundidade das riquezas da sabedoria de Deus! 🌟" },
    ],
  },
  12: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.5, props: [P("altar", 0.55, 1, 0.5)], actors: [F(0.42, "man", "kneel", "white")] }),
      kf(9, { terrain: "city", crowd: 0.6, actors: [F(0.35, "man", "stand", "white"), F(0.55, "woman", "carry", "green"), F(0.72, "man", "raise", "sand")] }),
      kf(17, { terrain: "city", crowd: 0.5, actors: [F(0.4, "man", "stand", "white"), F(0.62, "man", "stand", "brown")] }),
    ],
    beats: [
      { upTo: 8, god: "Apresentai os vossos corpos em sacrifício vivo.", reaction: "Transformados pela renovação da mente. 🔥" },
      { upTo: 16, reaction: "Um corpo, muitos membros, cada um com seu dom. 🤝" },
      { upTo: 99, reaction: "Vencei o mal com o bem. Amai sem fingimento. ❤️" },
    ],
  },
  13: {
    keyframes: [
      kf(1, { terrain: "city", props: [P("tower", 0.82, 1.1)], actors: [F(0.4, "man", "stand", "white"), F(0.65, "king", "stand", "purple")] }),
      kf(8, { terrain: "city", crowd: 0.5, actors: [F(0.4, "man", "stand", "white"), F(0.6, "man", "stand", "sand")] }),
      kf(11, { terrain: "city", night: 0.6, glory: 0.35, actors: [F(0.42, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 7, reaction: "Sujeitai-vos às autoridades: dai a cada um o que é devido. ⚖️" },
      { upTo: 10, god: "Amarás o teu próximo como a ti mesmo.", reaction: "O amor é o cumprimento da lei. ❤️" },
      { upTo: 99, reaction: "A noite vai adiantada; revesti-vos de Cristo, a luz! 🌅" },
    ],
  },
  14: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.5, actors: [F(0.35, "man", "stand", "white"), F(0.6, "man", "stand", "brown")] }),
      kf(10, { terrain: "city", glory: 0.4, actors: [F(0.4, "man", "kneel", "white"), F(0.62, "man", "bow", "sand")] }),
      kf(17, { terrain: "city", crowd: 0.5, actors: [F(0.4, "man", "stand", "white")] }),
    ],
    beats: [
      { upTo: 9, reaction: "Não julgueis o irmão mais fraco na fé. 🤍" },
      { upTo: 16, god: "Cada um dará conta de si mesmo a Deus.", reaction: "Todos nos apresentaremos diante de Deus." },
      { upTo: 99, reaction: "O Reino é justiça, paz e alegria no Espírito. 🕊️" },
    ],
  },
  15: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.5, actors: [F(0.35, "man", "carry", "white"), F(0.6, "man", "stand", "sand")] }),
      kf(13, { terrain: "city", glory: 0.6, actors: [F(0.42, "man", "raise", "white")] }),
      kf(22, { terrain: "hills", glory: 0.35, crowd: 0.3, actors: [F(0.35, "man", "walk", "white")] }),
    ],
    beats: [
      { upTo: 12, reaction: "Acolhei-vos uns aos outros, como Cristo vos acolheu. 🤝" },
      { upTo: 21, god: "O Deus da esperança vos encha de todo o gozo e paz.", reaction: "Cheios de esperança pela força do Espírito. ✨" },
      { upTo: 99, reaction: "Paulo deseja levar o evangelho a novos lugares. 🗺️" },
    ],
  },
  16: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.6, props: [P("tower", 0.85, 1)], actors: [F(0.35, "woman", "stand", "purple"), F(0.55, "man", "stand", "white"), F(0.75, "man", "raise", "sand")] }),
      kf(17, { terrain: "city", crowd: 0.4, actors: [F(0.42, "man", "stand", "white")] }),
      kf(25, { terrain: "city", glory: 0.7, actors: [F(0.42, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 16, reaction: "Paulo saúda os irmãos pelo nome, com afeto. 💌" },
      { upTo: 24, reaction: "Guardai-vos dos que causam divisões. A graça esteja convosco. 🕊️" },
      { upTo: 99, god: "Ao único Deus sábio, glória para sempre por Jesus Cristo.", reaction: "Amém! A carta se encerra em louvor. 🌟" },
    ],
  },
};
