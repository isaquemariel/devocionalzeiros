// ============================================================================
// Roteiros de cena (Living Scene v2) — DANIEL, capítulo por capítulo.
// Daniel e os amigos na corte da Babilônia, o sonho da estátua, a fornalha
// ardente e o quarto homem, a loucura de Nabucodonosor, a escrita na parede,
// a cova dos leões e as grandes visões do fim. Puramente visual/narrativo —
// não toca em progresso. Segue o padrão de Êxodo (rpgExodusScenes).
// ============================================================================

import type { ChapterScript, V2Actor, V2Prop, SceneState } from "@/lib/rpgLivingV2";

const F = (x: number, role: V2Actor["role"], action: V2Actor["action"], palette?: V2Actor["palette"], extra: Partial<V2Actor> = {}): V2Actor => ({ x, role, action, palette, ...extra });
const AN = (x: number, animal: NonNullable<V2Actor["animal"]>, scale = 1, color?: string): V2Actor => ({ x, kind: "animal", animal, scale, color });
const P = (kind: string, x: number, scale = 1, fire?: number): V2Prop => ({ kind, x, scale, ...(fire != null ? { fire } : {}) });
const kf = (v: number, state: SceneState) => ({ v, state });

export const DANIEL_SCENES: Record<number, ChapterScript> = {
  1: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.5, props: [P("tower", 0.16, 1.2), P("tower", 0.86, 1)], actors: [F(0.3, "king", "stand", "gold"), F(0.6, "child", "walk", "blue")] }),
      kf(6, { terrain: "city", props: [P("tower", 0.85, 0.9)], actors: [F(0.3, "child", "stand", "blue"), F(0.44, "child", "stand", "white"), F(0.58, "child", "stand", "green"), F(0.72, "child", "stand", "sand")] }),
      kf(8, { terrain: "city", props: [P("basket", 0.5)], actors: [F(0.36, "child", "stand", "blue"), F(0.66, "servant", "stand", "gray")] }),
      kf(17, { terrain: "city", glory: 0.35, props: [P("tower", 0.16, 1.1)], actors: [F(0.35, "child", "raise", "blue"), F(0.6, "king", "stand", "gold")] }),
    ],
    beats: [
      { upTo: 5, reaction: "Nabucodonosor leva jovens de Judá para a corte da Babilônia. 👑" },
      { upTo: 7, reaction: "Daniel, Hananias, Misael e Azarias recebem novos nomes." },
      { upTo: 16, reaction: "Daniel recusa a comida do rei e pede só legumes e água. 🥬" },
      { upTo: 99, god: undefined, reaction: "Deus lhes dá sabedoria; ficam dez vezes melhores. ✨" },
    ],
  },
  2: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.6, props: [P("tower", 0.84, 1)], actors: [F(0.5, "king", "lie", "gold")] }),
      kf(14, { terrain: "city", night: 0.3, actors: [F(0.35, "child", "stand", "blue"), F(0.62, "servant", "stand", "gray")] }),
      kf(19, { terrain: "city", glory: 0.6, actors: [F(0.45, "child", "raise", "blue")] }),
      kf(31, { terrain: "city", glory: 0.5, props: [P("tower", 0.5, 1.6)], actors: [F(0.3, "child", "raise", "blue"), F(0.7, "king", "bow", "gold")] }),
    ],
    beats: [
      { upTo: 13, reaction: "O rei tem um sonho que ninguém sabe revelar. 😨" },
      { upTo: 18, reaction: "Daniel e os amigos clamam a Deus pelo mistério. 🙏" },
      { upTo: 30, god: "Há um Deus nos céus que revela os segredos.", reaction: "O mistério é desvendado a Daniel. ✨" },
      { upTo: 99, reaction: "A estátua: ouro, prata, bronze, ferro — e uma pedra a destrói. 🗿" },
    ],
  },
  3: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.7, props: [P("tower", 0.5, 1.8)], actors: [F(0.7, "king", "stand", "gold")] }),
      kf(13, { terrain: "city", crowd: 0.5, props: [P("tower", 0.85, 1)], actors: [F(0.28, "child", "stand", "blue"), F(0.42, "child", "stand", "white"), F(0.56, "child", "stand", "green"), F(0.72, "king", "raise", "gold")] }),
      kf(21, { terrain: "city", fire: 0.95, night: 0.3, actors: [F(0.7, "king", "stand", "gold")] }),
      kf(25, { terrain: "city", fire: 0.9, glory: 0.5, actors: [F(0.28, "child", "stand", "blue"), F(0.42, "child", "stand", "white"), F(0.56, "child", "stand", "green"), F(0.72, "angel", "raise", "white")] }),
    ],
    beats: [
      { upTo: 12, reaction: "Todos se curvam à estátua de ouro — menos os três. 🗿" },
      { upTo: 18, god: undefined, reaction: "'O nosso Deus pode nos livrar; e, se não, não te serviremos.' 🤍" },
      { upTo: 23, reaction: "A fornalha é sete vezes mais quente; eles são lançados. 🔥" },
      { upTo: 99, reaction: "Um quarto homem caminha no fogo — sem queimar! 👼🔥" },
    ],
  },
  4: {
    keyframes: [
      kf(1, { terrain: "city", props: [P("tower", 0.16, 1.2)], actors: [F(0.5, "king", "stand", "gold")] }),
      kf(10, { terrain: "field", glory: 0.4, props: [P("tree", 0.5, 1.8)], actors: [F(0.35, "child", "stand", "blue")] }),
      kf(28, { terrain: "field", night: 0.6, actors: [F(0.5, "king", "lie", "sand")] }),
      kf(34, { terrain: "field", glory: 0.6, actors: [F(0.45, "king", "raise", "gold")] }),
    ],
    beats: [
      { upTo: 9, reaction: "Nabucodonosor sonha com uma árvore imensa que é cortada. 🌳" },
      { upTo: 18, reaction: "Daniel interpreta: o rei será humilhado. 😔" },
      { upTo: 33, god: "Até que saibas que o Altíssimo domina sobre os reinos.", reaction: "O rei enlouquece e vive como os animais no campo. 🌾" },
      { upTo: 99, reaction: "Recobrada a razão, ele louva ao Rei dos céus. 🙌" },
    ],
  },
  5: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.55, crowd: 0.6, actors: [F(0.5, "king", "stand", "purple")] }),
      kf(5, { terrain: "city", night: 0.5, glory: 0.6, actors: [F(0.7, "king", "mourn", "purple")] }),
      kf(13, { terrain: "city", night: 0.5, glory: 0.4, actors: [F(0.35, "elder", "raise", "blue"), F(0.68, "king", "stand", "purple")] }),
      kf(30, { terrain: "city", night: 0.8, actors: [F(0.5, "king", "lie", "purple")] }),
    ],
    beats: [
      { upTo: 4, reaction: "Belsazar dá um banquete com os vasos do templo. 🍷" },
      { upTo: 9, reaction: "Uma mão escreve na parede; o rei empalidece. ✍️😨" },
      { upTo: 29, god: "Mene, Mene, Tequel, Ufarsim: contado, pesado, dividido.", reaction: "Daniel lê a sentença do juízo. ⚖️" },
      { upTo: 99, reaction: "Naquela noite, o rei é morto; a Babilônia cai. 🌑" },
    ],
  },
  6: {
    keyframes: [
      kf(1, { terrain: "city", actors: [F(0.35, "elder", "stand", "blue"), F(0.65, "king", "stand", "gold")] }),
      kf(10, { terrain: "city", glory: 0.4, actors: [F(0.45, "elder", "kneel", "blue")] }),
      kf(16, { terrain: "city", night: 0.8, actors: [F(0.5, "elder", "kneel", "blue"), AN(0.28, "lion", 1), AN(0.75, "lion", 1)] }),
      kf(22, { terrain: "city", night: 0.6, glory: 0.6, actors: [F(0.4, "elder", "kneel", "blue"), F(0.62, "angel", "raise", "white"), AN(0.85, "lion", 0.9)] }),
    ],
    beats: [
      { upTo: 9, reaction: "Invejosos armam uma lei para prender Daniel. 📜" },
      { upTo: 15, reaction: "Ele continua a orar de joelhos, como sempre. 🙏" },
      { upTo: 18, reaction: "Daniel é lançado na cova dos leões. 🦁" },
      { upTo: 99, god: "O meu Deus enviou o seu anjo e fechou a boca dos leões.", reaction: "De manhã, Daniel está ileso! 👼✨" },
    ],
  },
  7: {
    keyframes: [
      kf(1, { terrain: "sea", night: 0.7, storm: 0.7, actors: [F(0.5, "elder", "lie", "blue")] }),
      kf(4, { terrain: "sea", storm: 0.6, night: 0.4, actors: [AN(0.35, "lion", 1.1), AN(0.7, "goat", 0.9)] }),
      kf(9, { terrain: "city", glory: 0.9, props: [P("tower", 0.5, 1.6)], actors: [F(0.5, "elder", "stand", "white")] }),
      kf(13, { terrain: "city", glory: 0.85, actors: [F(0.45, "man", "raise", "white"), F(0.62, "elder", "stand", "gold")] }),
    ],
    beats: [
      { upTo: 3, reaction: "Daniel sonha: quatro ventos agitam o grande mar. 🌊⚡" },
      { upTo: 8, reaction: "Quatro feras sobem — quatro reinos da terra. 🦁" },
      { upTo: 12, reaction: "O Ancião de Dias assenta-se; tronos são postos. ✨" },
      { upTo: 99, god: "Foi-lhe dado domínio, glória e um reino que não passará.", reaction: "Vem um como o Filho do Homem nas nuvens. 👑" },
    ],
  },
  8: {
    keyframes: [
      kf(1, { terrain: "river", night: 0.4, props: [P("reeds", 0.2), P("reeds", 0.85)], actors: [F(0.5, "elder", "stand", "blue")] }),
      kf(3, { terrain: "plain", actors: [F(0.3, "elder", "stand", "blue"), AN(0.66, "ram", 1)] }),
      kf(5, { terrain: "plain", storm: 0.4, actors: [AN(0.32, "ram", 0.9), AN(0.7, "goat", 1.1)] }),
      kf(15, { terrain: "river", glory: 0.6, actors: [F(0.4, "elder", "bow", "blue"), F(0.62, "angel", "raise", "white")] }),
    ],
    beats: [
      { upTo: 4, reaction: "Daniel vê um carneiro de dois chifres junto ao rio. 🐏" },
      { upTo: 8, reaction: "Um bode veloz vem do ocidente e o derruba. 🐐" },
      { upTo: 14, reaction: "Chifres pequenos crescem; o santuário é profanado." },
      { upTo: 99, god: "Gabriel, faze este homem entender a visão.", reaction: "O anjo explica: reis da Média, Pérsia e Grécia. 👼" },
    ],
  },
  9: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.6, actors: [F(0.5, "elder", "kneel", "blue")] }),
      kf(3, { terrain: "city", night: 0.5, props: [P("altar", 0.5, 0.9, 0.4)], actors: [F(0.45, "elder", "mourn", "gray")] }),
      kf(20, { terrain: "city", glory: 0.7, actors: [F(0.4, "elder", "kneel", "blue"), F(0.62, "angel", "raise", "white")] }),
    ],
    beats: [
      { upTo: 2, reaction: "Daniel lê Jeremias: setenta anos de exílio. 📖" },
      { upTo: 19, god: undefined, reaction: "Ele confessa os pecados do povo em jejum e cinzas. 🙏" },
      { upTo: 99, god: "Setenta semanas estão determinadas sobre o teu povo.", reaction: "Gabriel traz a profecia das setenta semanas. 👼" },
    ],
  },
  10: {
    keyframes: [
      kf(1, { terrain: "river", night: 0.4, props: [P("reeds", 0.18), P("reeds", 0.84)], actors: [F(0.5, "elder", "mourn", "gray")] }),
      kf(5, { terrain: "river", glory: 0.85, storm: 0.4, actors: [F(0.3, "elder", "bow", "blue"), F(0.6, "angel", "raise", "white")] }),
      kf(10, { terrain: "river", glory: 0.7, actors: [F(0.4, "elder", "kneel", "blue"), F(0.62, "angel", "stand", "white")] }),
    ],
    beats: [
      { upTo: 4, reaction: "Após três semanas de luto, Daniel está junto ao Tigre. 🌊" },
      { upTo: 9, reaction: "Surge um homem vestido de linho, rosto como relâmpago. ⚡" },
      { upTo: 99, god: "Não temas, homem muito amado; a paz seja contigo.", reaction: "O mensageiro celeste o fortalece. 👼" },
    ],
  },
  11: {
    keyframes: [
      kf(1, { terrain: "plain", glory: 0.4, actors: [F(0.45, "angel", "raise", "white")] }),
      kf(5, { terrain: "hills", storm: 0.4, actors: [F(0.3, "king", "stand", "gold"), F(0.7, "warrior", "fight", "red", { facing: -1 })] }),
      kf(21, { terrain: "hills", storm: 0.6, night: 0.3, actors: [F(0.32, "warrior", "fight", "gray", { facing: 1 }), F(0.68, "warrior", "fight", "red", { facing: -1 })] }),
      kf(36, { terrain: "city", storm: 0.5, actors: [F(0.5, "king", "raise", "purple")] }),
    ],
    beats: [
      { upTo: 4, reaction: "O anjo revela os reis que hão de vir. 👑" },
      { upTo: 20, reaction: "Guerras entre o rei do Norte e o do Sul. ⚔️" },
      { upTo: 35, reaction: "Um rei ímpio se levanta e profana o santuário. 🌩️" },
      { upTo: 99, god: undefined, reaction: "Seu fim virá, e ninguém o socorrerá." },
    ],
  },
  12: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.6, glory: 0.6, actors: [F(0.5, "angel", "raise", "white")] }),
      kf(2, { terrain: "field", night: 0.7, glory: 0.5, actors: [F(0.35, "man", "raise", "white"), F(0.6, "man", "stand", "gray")] }),
      kf(5, { terrain: "river", glory: 0.7, props: [P("reeds", 0.2), P("reeds", 0.82)], actors: [F(0.35, "elder", "stand", "blue"), F(0.6, "angel", "raise", "white")] }),
    ],
    beats: [
      { upTo: 1, god: "Naquele tempo se levantará Miguel, o grande príncipe.", reaction: "O tempo do fim e o livramento do povo. ✨" },
      { upTo: 4, god: "Muitos dos que dormem no pó acordarão para a vida eterna.", reaction: "Os sábios resplandecerão como as estrelas. 🌟" },
      { upTo: 99, god: "Vai até ao fim; descansarás e te levantarás na tua herança.", reaction: "Daniel guarda as palavras seladas até o fim. 📜" },
    ],
  },
};
