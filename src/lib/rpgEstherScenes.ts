// ============================================================================
// Roteiros de cena (Living Scene v2) — ESTER, capítulo por capítulo.
// O palácio persa de Susã e o banquete de Assuero, a rainha Vasti deposta,
// Ester feita rainha, a trama de Hamã, o luto de Mardoqueu, a coragem da
// rainha diante do rei, a queda de Hamã na própria forca e a salvação dos
// judeus na festa de Purim. Puramente visual/narrativo — não toca em progresso.
// Segue o padrão de Êxodo (rpgExodusScenes).
// ============================================================================

import type { ChapterScript, V2Actor, V2Prop, SceneState } from "@/lib/rpgLivingV2";

const F = (x: number, role: V2Actor["role"], action: V2Actor["action"], palette?: V2Actor["palette"], extra: Partial<V2Actor> = {}): V2Actor => ({ x, role, action, palette, ...extra });
const AN = (x: number, animal: NonNullable<V2Actor["animal"]>, scale = 1, color?: string): V2Actor => ({ x, kind: "animal", animal, scale, color });
const P = (kind: string, x: number, scale = 1, fire?: number): V2Prop => ({ kind, x, scale, ...(fire != null ? { fire } : {}) });
const kf = (v: number, state: SceneState) => ({ v, state });

export const ESTHER_SCENES: Record<number, ChapterScript> = {
  1: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.7, props: [P("tower", 0.16, 1.2), P("tower", 0.84, 1)], actors: [F(0.5, "king", "stand", "gold")] }),
      kf(3, { terrain: "city", glory: 0.2, crowd: 0.8, props: [P("tower", 0.15, 1.1)], actors: [F(0.3, "king", "raise", "gold"), F(0.58, "man", "stand", "purple"), F(0.74, "servant", "carry", "sand")] }),
      kf(10, { terrain: "city", night: 0.3, crowd: 0.6, actors: [F(0.34, "king", "raise", "gold"), F(0.6, "servant", "bow", "sand")] }),
      kf(12, { terrain: "city", night: 0.4, actors: [F(0.4, "king", "raise", "gold"), F(0.66, "woman", "stand", "purple", { facing: -1 })] }),
    ],
    beats: [
      { upTo: 4, reaction: "Assuero reina da Índia à Etiópia, sobre 127 províncias. 👑" },
      { upTo: 9, reaction: "Cento e oitenta dias de banquete em Susã, a capital. 🍷" },
      { upTo: 11, reaction: "Alegre de vinho, o rei manda chamar a rainha Vasti. 🍷" },
      { upTo: 99, reaction: "Vasti recusa vir; por decreto, é deposta do trono. 😔" },
    ],
  },
  2: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.5, props: [P("tower", 0.85, 0.9)], actors: [F(0.4, "king", "stand", "gold"), F(0.64, "servant", "bow", "sand")] }),
      kf(7, { terrain: "city", actors: [F(0.36, "elder", "stand", "brown"), F(0.56, "woman", "stand", "blue")] }),
      kf(8, { terrain: "city", crowd: 0.4, actors: [F(0.3, "woman", "walk", "blue"), F(0.5, "woman", "stand", "purple"), F(0.7, "woman", "stand", "green")] }),
      kf(17, { terrain: "city", glory: 0.35, props: [P("tower", 0.16, 1)], actors: [F(0.4, "king", "raise", "gold"), F(0.6, "woman", "kneel", "purple")] }),
    ],
    beats: [
      { upTo: 4, reaction: "Buscam por todo o reino uma nova rainha. 👑" },
      { upTo: 7, reaction: "Mardoqueu cria Ester, sua prima órfã, jovem e formosa. 🤍" },
      { upTo: 16, reaction: "Ester é levada ao palácio e agrada a todos. ✨" },
      { upTo: 99, reaction: "O rei a ama e põe a coroa real sobre a jovem judia. 👑" },
    ],
  },
  3: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.6, props: [P("tower", 0.84, 1)], actors: [F(0.5, "man", "stand", "red"), F(0.72, "servant", "bow", "sand")] }),
      kf(2, { terrain: "city", crowd: 0.5, actors: [F(0.4, "man", "raise", "red"), F(0.66, "elder", "stand", "brown")] }),
      kf(8, { terrain: "city", night: 0.25, actors: [F(0.42, "man", "raise", "red"), F(0.68, "king", "stand", "gold")] }),
      kf(13, { terrain: "city", night: 0.45, crowd: 0.4, actors: [F(0.5, "man", "raise", "red")] }),
    ],
    beats: [
      { upTo: 2, reaction: "O rei exalta Hamã acima de todos os príncipes. 👑" },
      { upTo: 6, reaction: "Mardoqueu não se curva; Hamã se enche de furor. 😠" },
      { upTo: 11, reaction: "Hamã compra do rei o direito de destruir os judeus. 💰" },
      { upTo: 99, reaction: "Sai o decreto: matar todos os judeus num só dia. 😢" },
    ],
  },
  4: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.3, actors: [F(0.5, "man", "mourn", "gray")] }),
      kf(3, { terrain: "city", night: 0.35, crowd: 0.6, actors: [F(0.34, "man", "mourn", "gray"), F(0.6, "woman", "mourn", "sand"), F(0.78, "elder", "mourn", "brown")] }),
      kf(9, { terrain: "city", night: 0.25, actors: [F(0.4, "man", "raise", "gray"), F(0.62, "woman", "stand", "purple")] }),
      kf(16, { terrain: "city", glory: 0.3, actors: [F(0.5, "woman", "kneel", "purple")] }),
    ],
    beats: [
      { upTo: 3, reaction: "Mardoqueu rasga as vestes e clama em pano de saco. 😢" },
      { upTo: 8, reaction: "O luto se espalha entre os judeus por toda parte. 🖤" },
      { upTo: 14, reaction: "'Quem sabe se para tempo como este chegaste ao reino?' 🌟" },
      { upTo: 99, reaction: "Ester decide: 'Se perecer, pereci.' Jejuai por mim! 🙏" },
    ],
  },
  5: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.3, props: [P("tower", 0.16, 1)], actors: [F(0.4, "woman", "stand", "purple"), F(0.66, "king", "raise", "gold")] }),
      kf(2, { terrain: "city", glory: 0.4, actors: [F(0.42, "woman", "bow", "purple"), F(0.64, "king", "raise", "gold")] }),
      kf(4, { terrain: "city", crowd: 0.3, props: [P("tower", 0.85, 0.9)], actors: [F(0.32, "king", "stand", "gold"), F(0.5, "woman", "stand", "purple"), F(0.7, "man", "stand", "red")] }),
      kf(14, { terrain: "city", night: 0.5, props: [P("tower", 0.6, 1.5)], actors: [F(0.5, "man", "raise", "red")] }),
    ],
    beats: [
      { upTo: 2, reaction: "Ester arrisca a vida; o rei estende o cetro de ouro. 👑" },
      { upTo: 8, reaction: "Ela convida o rei e Hamã a um banquete. 🍷" },
      { upTo: 12, reaction: "Hamã se gaba de sua honra, mas Mardoqueu o irrita. 😤" },
      { upTo: 99, reaction: "Por conselho, ergue-se uma forca de cinquenta côvados. ⚰️" },
    ],
  },
  6: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.6, actors: [F(0.45, "king", "lie", "gold"), F(0.68, "servant", "stand", "sand")] }),
      kf(4, { terrain: "city", night: 0.3, actors: [F(0.4, "king", "stand", "gold"), F(0.64, "man", "bow", "red")] }),
      kf(11, { terrain: "city", crowd: 0.6, actors: [F(0.34, "man", "walk", "red", { facing: 1 }), F(0.56, "elder", "stand", "purple")] }),
      kf(12, { terrain: "city", night: 0.35, actors: [F(0.5, "man", "mourn", "red")] }),
    ],
    beats: [
      { upTo: 3, reaction: "Sem dormir, o rei lê as crônicas: Mardoqueu o salvara. 📖" },
      { upTo: 9, reaction: "Hamã aconselha honras — pensando ser para si. 😏" },
      { upTo: 11, reaction: "Mas é ele quem conduz Mardoqueu honrado pela praça! 😲" },
      { upTo: 99, reaction: "Hamã volta para casa, humilhado e de luto. 😔" },
    ],
  },
  7: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.25, props: [P("tower", 0.85, 0.9)], actors: [F(0.3, "king", "stand", "gold"), F(0.5, "woman", "stand", "purple"), F(0.7, "man", "stand", "red")] }),
      kf(3, { terrain: "city", actors: [F(0.34, "king", "raise", "gold"), F(0.56, "woman", "raise", "purple", { facing: 1 }), F(0.76, "man", "stand", "red")] }),
      kf(7, { terrain: "garden", night: 0.3, actors: [F(0.4, "king", "raise", "gold"), F(0.64, "man", "kneel", "red")] }),
      kf(10, { terrain: "city", night: 0.4, props: [P("tower", 0.6, 1.5)], actors: [F(0.5, "man", "lie", "red")] }),
    ],
    beats: [
      { upTo: 4, reaction: "No banquete, Ester revela: querem destruir o meu povo! 😢" },
      { upTo: 6, reaction: "'O adversário é este perverso Hamã!' 😠" },
      { upTo: 9, reaction: "O rei se levanta em furor; Hamã suplica em vão. ⚖️" },
      { upTo: 99, reaction: "Hamã é enforcado na forca que armara para outro. ⚰️" },
    ],
  },
  8: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.3, actors: [F(0.36, "king", "stand", "gold"), F(0.56, "woman", "stand", "purple"), F(0.74, "man", "kneel", "brown")] }),
      kf(2, { terrain: "city", glory: 0.4, actors: [F(0.4, "king", "raise", "gold"), F(0.62, "man", "raise", "purple")] }),
      kf(9, { terrain: "city", crowd: 0.5, actors: [F(0.45, "man", "raise", "purple"), F(0.68, "servant", "carry", "sand")] }),
      kf(15, { terrain: "city", crowd: 0.8, glory: 0.4, actors: [F(0.4, "man", "raise", "purple", { facing: 1 }), F(0.62, "man", "raise", "blue"), F(0.8, "woman", "raise", "green")] }),
    ],
    beats: [
      { upTo: 2, reaction: "O rei dá a Mardoqueu o anel real que fora de Hamã. 💍" },
      { upTo: 8, reaction: "Ester implora, e sai novo decreto para salvar os judeus. 📜" },
      { upTo: 14, reaction: "Cavaleiros correm com a ordem por todas as províncias. 🐎" },
      { upTo: 99, reaction: "Susã exulta; os judeus têm luz, alegria e honra! ✨" },
    ],
  },
  9: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.7, actors: [F(0.35, "warrior", "fight", "blue", { facing: 1 }), F(0.62, "warrior", "stand", "purple")] }),
      kf(5, { terrain: "city", night: 0.2, crowd: 0.6, actors: [F(0.4, "man", "raise", "purple"), F(0.66, "man", "stand", "blue")] }),
      kf(20, { terrain: "city", crowd: 0.8, glory: 0.4, actors: [F(0.4, "man", "raise", "purple"), F(0.6, "woman", "raise", "green")] }),
      kf(22, { terrain: "city", crowd: 0.9, glory: 0.5, actors: [F(0.32, "woman", "raise", "red"), F(0.52, "man", "raise", "blue"), F(0.74, "child", "raise", "sand")] }),
    ],
    beats: [
      { upTo: 4, reaction: "No dia marcado, os judeus se defendem e prevalecem. ⚔️" },
      { upTo: 19, reaction: "Descanso dos inimigos — dias de banquete e alegria. 🍷" },
      { upTo: 21, reaction: "Mardoqueu institui a festa de Purim para sempre. 📜" },
      { upTo: 99, reaction: "Tristeza virou júbilo; luto virou dia bom! 🎉" },
    ],
  },
  10: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.4, props: [P("tower", 0.16, 1.2), P("tower", 0.84, 1)], actors: [F(0.5, "king", "stand", "gold")] }),
      kf(3, { terrain: "city", glory: 0.6, crowd: 0.6, actors: [F(0.44, "man", "raise", "purple"), F(0.68, "man", "bow", "blue")] }),
    ],
    beats: [
      { upTo: 2, reaction: "Grande é o poder do rei Assuero por todo o reino. 👑" },
      { upTo: 99, reaction: "Mardoqueu, segundo do rei, busca o bem do seu povo. 🤍" },
    ],
  },
};
