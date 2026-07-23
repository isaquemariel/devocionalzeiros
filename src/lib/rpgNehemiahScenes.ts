// ============================================================================
// Roteiros de cena (Living Scene v2) — NEEMIAS, capítulo por capítulo.
// O copeiro do rei chora pela ruína de Jerusalém, é enviado pelo rei persa,
// inspeciona os muros de noite e reconstrói a cidade com a espada numa mão e
// a ferramenta na outra, sob zombaria e ameaça. A obra termina em 52 dias;
// Esdras lê a Lei, o povo chora e depois se alegra, e o muro é dedicado.
// Puramente visual/narrativo — não toca em progresso. Segue o padrão do Êxodo.
// ============================================================================

import type { ChapterScript, V2Actor, V2Prop, SceneState } from "@/lib/rpgLivingV2";

const F = (x: number, role: V2Actor["role"], action: V2Actor["action"], palette?: V2Actor["palette"], extra: Partial<V2Actor> = {}): V2Actor => ({ x, role, action, palette, ...extra });
const AN = (x: number, animal: NonNullable<V2Actor["animal"]>, scale = 1, color?: string): V2Actor => ({ x, kind: "animal", animal, scale, color });
const P = (kind: string, x: number, scale = 1, fire?: number): V2Prop => ({ kind, x, scale, ...(fire != null ? { fire } : {}) });
const kf = (v: number, state: SceneState) => ({ v, state });

export const NEHEMIAH_SCENES: Record<number, ChapterScript> = {
  1: {
    keyframes: [
      kf(1, { terrain: "city", props: [P("tower", 0.7, 0.9)], actors: [F(0.3, "man", "stand", "purple"), F(0.6, "man", "walk", "sand")] }),
      kf(4, { terrain: "city", night: 0.6, props: [P("tower", 0.72, 0.8)], actors: [F(0.45, "man", "mourn", "purple")] }),
      kf(5, { terrain: "city", night: 0.7, glory: 0.3, actors: [F(0.45, "man", "kneel", "purple")] }),
    ],
    beats: [
      { upTo: 3, reaction: "Chega notícia: o muro de Jerusalém está em ruínas e as portas queimadas. 🧱" },
      { upTo: 4, reaction: "Neemias chora, jejua e ora dias a fio. 😢" },
      { upTo: 99, god: undefined, reaction: "'Ó SENHOR, lembra-te da promessa ao teu servo.' 🙏" },
    ],
  },
  2: {
    keyframes: [
      kf(1, { terrain: "city", props: [P("tower", 0.18, 1.1)], actors: [F(0.3, "king", "stand", "gold"), F(0.58, "servant", "bow", "purple")] }),
      kf(6, { terrain: "city", props: [P("tower", 0.16, 1.1)], actors: [F(0.32, "king", "raise", "gold"), F(0.6, "man", "stand", "purple")] }),
      kf(12, { terrain: "city", night: 0.8, props: [P("tower", 0.68, 0.7)], actors: [F(0.4, "man", "walk", "purple")] }),
      kf(17, { terrain: "city", night: 0.4, crowd: 0.5, props: [P("tower", 0.72, 0.8)], actors: [F(0.4, "man", "raise", "purple")] }),
    ],
    beats: [
      { upTo: 5, reaction: "Diante do rei, o copeiro está triste. 'Envia-me a Judá para reconstruir.' 👑" },
      { upTo: 11, reaction: "O rei concede cartas e escolta; Neemias parte para Jerusalém. ✉️" },
      { upTo: 16, reaction: "De noite, ele inspecia sozinho os muros derrubados. 🌙" },
      { upTo: 99, reaction: "'Vinde, edifiquemos o muro!' O povo anima-se para a obra. 💪" },
    ],
  },
  3: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.5, props: [P("tower", 0.2, 0.9), P("altar", 0.55)], actors: [F(0.35, "elder", "carry", "white"), F(0.6, "man", "carry", "brown")] }),
      kf(13, { terrain: "city", crowd: 0.6, props: [P("tower", 0.3, 1), P("ladder", 0.6)], actors: [F(0.4, "man", "carry", "sand"), F(0.66, "man", "stand", "brown")] }),
      kf(28, { terrain: "city", crowd: 0.5, props: [P("tower", 0.5, 1.1)], actors: [F(0.3, "servant", "carry", "gray"), F(0.7, "man", "carry", "sand")] }),
    ],
    beats: [
      { upTo: 12, reaction: "O sumo sacerdote começa: a Porta das Ovelhas é reerguida. 🐑" },
      { upTo: 27, reaction: "Cada família repara o trecho diante da sua casa. 🔨" },
      { upTo: 99, reaction: "Portas, fechaduras e ferrolhos — o muro toma forma. 🧱" },
    ],
  },
  4: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.5, props: [P("tower", 0.3, 1)], actors: [F(0.2, "man", "raise", "red"), F(0.55, "man", "carry", "brown")] }),
      kf(7, { terrain: "city", crowd: 0.4, props: [P("tower", 0.28, 1)], actors: [F(0.4, "man", "kneel", "purple")] }),
      kf(16, { terrain: "city", crowd: 0.6, props: [P("tower", 0.35, 1.1), P("ladder", 0.62)], actors: [F(0.3, "warrior", "stand", "gray"), F(0.6, "man", "carry", "brown")] }),
      kf(18, { terrain: "city", crowd: 0.6, props: [P("tower", 0.4, 1.1)], actors: [F(0.35, "warrior", "fight", "gray", { facing: 1 }), F(0.68, "man", "carry", "brown")] }),
    ],
    beats: [
      { upTo: 6, reaction: "Sambalate e Tobias zombam: 'Se uma raposa subir, derrubará este muro!' 😏" },
      { upTo: 9, reaction: "Ameaçam atacar; Neemias ora e põe guardas. 🛡️" },
      { upTo: 15, reaction: "Deus dissipa o plano deles; a obra continua. ✨" },
      { upTo: 99, reaction: "Com a espada numa mão e a ferramenta na outra, edificam. ⚔️🔨" },
    ],
  },
  5: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.7, actors: [F(0.35, "man", "mourn", "sand"), F(0.6, "woman", "mourn", "brown")] }),
      kf(6, { terrain: "city", crowd: 0.5, actors: [F(0.4, "man", "raise", "purple"), F(0.66, "elder", "bow", "gray")] }),
      kf(14, { terrain: "city", crowd: 0.5, props: [P("tower", 0.7, 0.9)], actors: [F(0.4, "man", "stand", "purple")] }),
    ],
    beats: [
      { upTo: 5, reaction: "Os pobres clamam: penhoram filhos e campos por causa da fome. 😔" },
      { upTo: 13, reaction: "Neemias repreende os nobres: 'Devolvei o que tomastes!' ⚖️" },
      { upTo: 99, reaction: "Como governador, ele não pesa sobre o povo. Serve de coração. 🤍" },
    ],
  },
  6: {
    keyframes: [
      kf(1, { terrain: "plain", props: [P("tent", 0.7)], actors: [F(0.3, "man", "stand", "purple"), F(0.62, "man", "raise", "red")] }),
      kf(10, { terrain: "city", props: [P("tower", 0.4, 1.1)], actors: [F(0.4, "man", "stand", "purple"), F(0.66, "man", "kneel", "sand")] }),
      kf(15, { terrain: "city", glory: 0.4, crowd: 0.7, props: [P("tower", 0.4, 1.2), P("tower", 0.7, 1.1)], actors: [F(0.35, "man", "raise", "purple")] }),
    ],
    beats: [
      { upTo: 9, reaction: "Os inimigos convocam Neemias à planície para lhe fazer mal. Ele recusa. 🚫" },
      { upTo: 14, reaction: "Tentam intimidá-lo com falsos profetas; ele não teme. 🛡️" },
      { upTo: 99, reaction: "O muro se conclui em cinquenta e dois dias! As nações se assombram. 🏆" },
    ],
  },
  7: {
    keyframes: [
      kf(1, { terrain: "city", props: [P("tower", 0.25, 1.1)], actors: [F(0.4, "man", "stand", "purple"), F(0.66, "servant", "stand", "gray")] }),
      kf(5, { terrain: "city", crowd: 0.6, actors: [F(0.35, "man", "stand", "purple"), F(0.62, "elder", "stand", "white")] }),
      kf(66, { terrain: "city", crowd: 0.8, actors: [F(0.4, "man", "raise", "purple")] }),
    ],
    beats: [
      { upTo: 4, reaction: "Postos os porteiros, a cidade é grande, mas ainda pouco habitada. 🏙️" },
      { upTo: 65, reaction: "Neemias registra as famílias que voltaram do exílio. 📜" },
      { upTo: 99, reaction: "Toda a congregação: um povo que retorna ao seu lar. 🤝" },
    ],
  },
  8: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.8, props: [P("tablets", 0.5, 1.1)], actors: [F(0.5, "elder", "raise", "white")] }),
      kf(6, { terrain: "city", crowd: 0.8, glory: 0.3, props: [P("tablets", 0.5, 1.1)], actors: [F(0.5, "elder", "stand", "white"), F(0.7, "man", "raise", "sand")] }),
      kf(9, { terrain: "city", crowd: 0.7, actors: [F(0.3, "man", "mourn", "brown"), F(0.6, "woman", "mourn", "sand")] }),
      kf(17, { terrain: "city", crowd: 0.8, glory: 0.4, props: [P("tent", 0.3, 0.9), P("palm", 0.7)], actors: [F(0.4, "man", "raise", "purple")] }),
    ],
    beats: [
      { upTo: 5, reaction: "Esdras abre o livro da Lei diante de todo o povo. 📖" },
      { upTo: 8, god: undefined, reaction: "Leem com clareza, e todos compreendem. 🙌" },
      { upTo: 12, reaction: "O povo chora ao ouvir a Palavra. 'Não choreis: a alegria do SENHOR é a vossa força!' 😢➡️😊" },
      { upTo: 99, reaction: "Guardam a Festa das Cabanas com grande alegria. 🌿" },
    ],
  },
  9: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.3, crowd: 0.7, actors: [F(0.35, "man", "mourn", "gray"), F(0.6, "woman", "kneel", "brown")] }),
      kf(5, { terrain: "city", glory: 0.4, crowd: 0.7, actors: [F(0.4, "elder", "raise", "white")] }),
      kf(32, { terrain: "city", glory: 0.3, crowd: 0.6, actors: [F(0.45, "man", "kneel", "purple")] }),
    ],
    beats: [
      { upTo: 4, reaction: "Em pano de saco e cinza, o povo confessa os seus pecados. 😔" },
      { upTo: 31, reaction: "Os levitas recontam a história: Deus foi fiel em tudo. ✨" },
      { upTo: 99, reaction: "Firmam um pacto solene diante do SENHOR. ✍️" },
    ],
  },
  10: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.6, props: [P("tablets", 0.55)], actors: [F(0.35, "man", "stand", "purple"), F(0.62, "elder", "bow", "white")] }),
      kf(28, { terrain: "city", crowd: 0.7, props: [P("altar", 0.5, 1, 0.6)], actors: [F(0.4, "man", "kneel", "sand")] }),
    ],
    beats: [
      { upTo: 27, reaction: "Líderes, levitas e sacerdotes selam o pacto com seus nomes. 🖋️" },
      { upTo: 99, reaction: "Comprometem-se a guardar a Lei, o sábado e a Casa de Deus. 🕯️" },
    ],
  },
  11: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.7, props: [P("tower", 0.3, 1.1)], actors: [F(0.4, "man", "stand", "purple"), F(0.66, "man", "walk", "sand")] }),
      kf(20, { terrain: "field", crowd: 0.5, actors: [F(0.35, "man", "walk", "brown"), F(0.6, "woman", "carry", "sand")] }),
    ],
    beats: [
      { upTo: 19, reaction: "Lançam sortes: um de cada dez habitará a cidade santa. 🎲" },
      { upTo: 99, reaction: "Os demais moram nas aldeias ao redor de Judá. 🏡" },
    ],
  },
  12: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.5, props: [P("tower", 0.28, 1)], actors: [F(0.4, "elder", "stand", "white"), F(0.66, "man", "stand", "sand")] }),
      kf(27, { terrain: "city", glory: 0.4, crowd: 0.8, props: [P("tower", 0.3, 1.1), P("tower", 0.7, 1.1)], actors: [F(0.5, "man", "raise", "purple")] }),
      kf(43, { terrain: "city", glory: 0.6, crowd: 0.9, props: [P("tower", 0.35, 1.2), P("tower", 0.72, 1.1)], actors: [F(0.4, "man", "raise", "white"), F(0.66, "woman", "raise", "green")] }),
    ],
    beats: [
      { upTo: 26, reaction: "Registram-se os sacerdotes e levitas de cada geração. 📜" },
      { upTo: 42, reaction: "Dois grandes coros percorrem o muro em ação de graças. 🎶" },
      { upTo: 99, reaction: "Dedicam o muro com grande alegria — ouve-se de longe! 🎉" },
    ],
  },
  13: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.5, props: [P("tablets", 0.5)], actors: [F(0.45, "elder", "raise", "white")] }),
      kf(8, { terrain: "city", props: [P("tent", 0.6)], actors: [F(0.4, "man", "fight", "purple", { facing: 1 }), F(0.68, "man", "walk", "red")] }),
      kf(15, { terrain: "city", night: 0.3, props: [P("tower", 0.7, 0.9)], actors: [F(0.4, "man", "raise", "purple"), F(0.66, "man", "carry", "sand")] }),
      kf(23, { terrain: "city", crowd: 0.4, actors: [F(0.4, "man", "raise", "purple"), F(0.66, "man", "mourn", "brown")] }),
    ],
    beats: [
      { upTo: 3, reaction: "Lê-se a Lei, e o povo separa de si tudo o que era misturado. 📖" },
      { upTo: 9, reaction: "Neemias expulsa Tobias das câmaras do templo. 🚪" },
      { upTo: 22, reaction: "Ele restaura o sábado e fecha as portas ao comércio. 🚫🛒" },
      { upTo: 99, god: undefined, reaction: "'Lembra-te de mim, meu Deus, para o meu bem.' 🙏" },
    ],
  },
};
