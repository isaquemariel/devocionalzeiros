// ============================================================================
// Roteiros de cena (Living Scene v2) — 1 JOÃO, capítulo por capítulo.
// A Palavra da vida, "Deus é luz" e a comunhão, a confissão dos pecados,
// o Advogado, o mandamento do amor, não amar o mundo, os filhos de Deus,
// "Deus é amor" e amai-vos uns aos outros, a fé que vence o mundo, o
// testemunho do Filho e a certeza da vida eterna. Puramente visual/narrativo.
// Segue o padrão de Gênesis/Êxodo (rpgExodusScenes).
// ============================================================================

import type { ChapterScript, V2Actor, V2Prop, SceneState } from "@/lib/rpgLivingV2";

const F = (x: number, role: V2Actor["role"], action: V2Actor["action"], palette?: V2Actor["palette"], extra: Partial<V2Actor> = {}): V2Actor => ({ x, role, action, palette, ...extra });
const AN = (x: number, animal: NonNullable<V2Actor["animal"]>, scale = 1, color?: string): V2Actor => ({ x, kind: "animal", animal, scale, color });
const P = (kind: string, x: number, scale = 1, fire?: number): V2Prop => ({ kind, x, scale, ...(fire != null ? { fire } : {}) });
const kf = (v: number, state: SceneState) => ({ v, state });

export const JOHN1_SCENES: Record<number, ChapterScript> = {
  1: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.5, props: [P("lampstand", 0.7, 1, 1)], actors: [F(0.4, "elder", "stand", "white")] }),
      kf(5, { terrain: "city", night: 0.35, glory: 0.5, props: [P("lampstand", 0.7, 1, 1)], actors: [F(0.4, "elder", "raise", "white")] }),
      kf(7, { terrain: "glory", glory: 0.8, actors: [F(0.35, "man", "walk", "white"), F(0.6, "man", "walk", "sand")] }),
      kf(9, { terrain: "glory", glory: 0.7, actors: [F(0.45, "man", "kneel", "brown")] }),
    ],
    beats: [
      { upTo: 4, reaction: "João anuncia a Palavra da vida que ouviu, viu e tocou. ✍️" },
      { upTo: 6, god: "Deus é luz, e nele não há treva nenhuma.", reaction: "Comunhão com Deus é andar na luz. 💡" },
      { upTo: 99, god: "Se confessarmos os pecados, ele é fiel para nos perdoar.", reaction: "O sangue de Jesus nos purifica de todo pecado. 🤍" },
    ],
  },
  2: {
    keyframes: [
      kf(1, { terrain: "glory", glory: 0.6, props: [P("cross", 0.66, 0.9)], actors: [F(0.4, "man", "raise", "white")] }),
      kf(7, { terrain: "city", glory: 0.35, crowd: 0.4, actors: [F(0.35, "elder", "raise", "white"), F(0.6, "man", "stand", "brown")] }),
      kf(15, { terrain: "city", night: 0.55, crowd: 0.6, actors: [F(0.45, "man", "walk", "gray")] }),
      kf(24, { terrain: "glory", glory: 0.7, actors: [F(0.42, "elder", "stand", "white")] }),
    ],
    beats: [
      { upTo: 6, god: "Temos um Advogado junto ao Pai: Jesus Cristo, o justo.", reaction: "Quem guarda a sua palavra, nele o amor é aperfeiçoado. ⚖️" },
      { upTo: 14, reaction: "Mandamento antigo e novo: quem ama o irmão está na luz. 💡" },
      { upTo: 17, god: "Não ameis o mundo nem o que há no mundo.", reaction: "O mundo passa, mas quem faz a vontade de Deus permanece. 🌍" },
      { upTo: 99, reaction: "Permanecei nele; a unção vos ensina todas as coisas. ✨" },
    ],
  },
  3: {
    keyframes: [
      kf(1, { terrain: "glory", glory: 0.8, actors: [F(0.35, "child", "raise", "white"), F(0.55, "child", "stand", "blue"), F(0.72, "child", "stand", "green")] }),
      kf(11, { terrain: "city", crowd: 0.5, actors: [F(0.35, "man", "stand", "brown"), F(0.6, "man", "stand", "sand")] }),
      kf(16, { terrain: "glory", glory: 0.6, props: [P("cross", 0.68, 0.9)], actors: [F(0.4, "man", "kneel", "white")] }),
      kf(18, { terrain: "city", crowd: 0.5, actors: [F(0.35, "man", "carry", "brown"), F(0.62, "man", "kneel", "sand")] }),
    ],
    beats: [
      { upTo: 10, god: "Vede que grande amor: sermos chamados filhos de Deus.", reaction: "Somos filhos de Deus agora! 👶✨" },
      { upTo: 15, reaction: "Amai-vos uns aos outros — não como Caim, que era do maligno. 🤍" },
      { upTo: 18, reaction: "Ele deu a vida por nós; amemos por obras e em verdade. 💗" },
      { upTo: 99, god: "Este é o seu mandamento: crer e amar uns aos outros.", reaction: "Nisto sabemos que ele permanece em nós. 🕊️" },
    ],
  },
  4: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.3, actors: [F(0.4, "elder", "raise", "white"), F(0.65, "man", "stand", "gray")] }),
      kf(7, { terrain: "glory", glory: 0.85, props: [P("dove", 0.5, 1.1)], actors: [F(0.4, "man", "raise", "white")] }),
      kf(11, { terrain: "glory", glory: 0.6, crowd: 0.6, actors: [F(0.3, "man", "stand", "brown"), F(0.5, "woman", "stand", "purple"), F(0.7, "man", "stand", "sand")] }),
      kf(16, { terrain: "glory", glory: 0.8, props: [P("dove", 0.52, 1)], actors: [F(0.45, "man", "kneel", "white")] }),
    ],
    beats: [
      { upTo: 6, reaction: "Provai os espíritos: todo espírito que confessa Jesus é de Deus. 🕊️" },
      { upTo: 10, god: "Deus é amor. Nisto se manifestou: enviou o seu Filho.", reaction: "O amor vem de Deus — ele nos amou primeiro. 💗" },
      { upTo: 15, god: "Se amamos uns aos outros, Deus permanece em nós.", reaction: "Amai-vos: quem permanece no amor permanece em Deus. 🤝" },
      { upTo: 99, reaction: "No amor não há temor; o perfeito amor lança fora o medo. ✨" },
    ],
  },
  5: {
    keyframes: [
      kf(1, { terrain: "glory", glory: 0.6, actors: [F(0.4, "man", "stand", "white"), F(0.62, "man", "stand", "brown")] }),
      kf(4, { terrain: "glory", glory: 0.7, crowd: 0.4, actors: [F(0.42, "warrior", "raise", "white")] }),
      kf(7, { terrain: "glory", glory: 0.85, props: [P("dove", 0.5, 1), P("cross", 0.72, 0.85)], actors: [F(0.35, "man", "raise", "white")] }),
      kf(11, { terrain: "glory", glory: 0.9, actors: [F(0.45, "elder", "raise", "white")] }),
    ],
    beats: [
      { upTo: 5, god: "Esta é a vitória que vence o mundo: a nossa fé.", reaction: "Todo o que crê que Jesus é o Filho vence o mundo. 🛡️" },
      { upTo: 10, reaction: "Três dão testemunho: o Espírito, a água e o sangue. 🕊️💧🩸" },
      { upTo: 13, god: "Quem tem o Filho tem a vida.", reaction: "Escrito para que saibais que tendes a vida eterna. ✨" },
      { upTo: 99, god: "O Filho de Deus veio e nos deu entendimento.", reaction: "Ele é o verdadeiro Deus e a vida eterna. 🤍" },
    ],
  },
};
