// ============================================================================
// Roteiros de cena (Living Scene v2) — JOEL, capítulo por capítulo.
// A praga de gafanhotos que devasta a terra, o lamento do povo; o Dia do
// SENHOR com escuridão e o exército invasor, o apelo "rasgai o coração"; a
// promessa do Espírito derramado sobre toda carne e o juízo das nações no
// vale. Puramente visual/narrativo — não toca em progresso.
// Segue o padrão de Êxodo (rpgExodusScenes).
// ============================================================================

import type { ChapterScript, V2Actor, V2Prop, SceneState } from "@/lib/rpgLivingV2";

const F = (x: number, role: V2Actor["role"], action: V2Actor["action"], palette?: V2Actor["palette"], extra: Partial<V2Actor> = {}): V2Actor => ({ x, role, action, palette, ...extra });
const AN = (x: number, animal: NonNullable<V2Actor["animal"]>, scale = 1, color?: string): V2Actor => ({ x, kind: "animal", animal, scale, color });
const P = (kind: string, x: number, scale = 1, fire?: number): V2Prop => ({ kind, x, scale, ...(fire != null ? { fire } : {}) });
const kf = (v: number, state: SceneState) => ({ v, state });

export const JOEL_SCENES: Record<number, ChapterScript> = {
  1: {
    keyframes: [
      kf(1, { terrain: "field", locusts: 0.6, props: [P("tree", 0.2), P("palm", 0.82)], actors: [F(0.4, "elder", "stand", "gray"), F(0.6, "man", "stand", "sand")] }),
      kf(4, { terrain: "field", locusts: 0.95, props: [P("tree", 0.22)], actors: [F(0.45, "man", "mourn", "brown")] }),
      kf(11, { terrain: "field", locusts: 0.7, night: 0.2, props: [P("altar", 0.5)], actors: [F(0.3, "man", "mourn", "sand"), F(0.62, "woman", "mourn", "blue")] }),
      kf(19, { terrain: "field", fire: 0.4, night: 0.3, props: [P("altar", 0.5, 1, 0.5)], actors: [F(0.45, "man", "raise", "brown"), AN(0.72, "ox", 0.9)] }),
    ],
    beats: [
      { upTo: 3, reaction: "Contai a vossos filhos: nunca houve dia como este. 📜" },
      { upTo: 7, reaction: "O gafanhoto devorou a vinha e a figueira. 🦗" },
      { upTo: 18, reaction: "A terra pranteia; até os animais gemem de fome. 😢" },
      { upTo: 99, god: undefined, reaction: "'A ti, ó SENHOR, clamo!' O campo está devastado. 🔥" },
    ],
  },
  2: {
    keyframes: [
      kf(1, { terrain: "mountain", darkness: 0.7, night: 0.5, actors: [F(0.4, "man", "raise", "brown")] }),
      kf(2, { terrain: "hills", darkness: 0.85, storm: 0.4, actors: [F(0.4, "man", "stand", "sand")] }),
      kf(5, { terrain: "plain", fire: 0.7, storm: 0.6, darkness: 0.4, crowd: 0.5, actors: [F(0.25, "warrior", "fight", "red", { facing: 1 }), F(0.5, "warrior", "fight", "gray", { facing: 1 }), F(0.75, "warrior", "walk", "brown", { facing: 1 })] }),
      kf(12, { terrain: "city", night: 0.3, props: [P("altar", 0.5, 1, 0.4)], actors: [F(0.35, "man", "mourn", "sand"), F(0.55, "elder", "kneel", "gray"), F(0.72, "woman", "kneel", "blue")] }),
      kf(28, { terrain: "city", glory: 0.85, crowd: 0.7, actors: [F(0.3, "elder", "raise", "white"), F(0.5, "man", "raise", "brown"), F(0.7, "child", "raise", "green")] }),
    ],
    beats: [
      { upTo: 2, reaction: "Tocai a trombeta! Vem o Dia do SENHOR — dia de trevas. 🌑" },
      { upTo: 11, reaction: "Um exército como nunca houve; diante dele treme a terra. ⚔️🔥" },
      { upTo: 17, god: "Convertei-vos a mim de todo o coração; rasgai o coração, e não as vestes.", reaction: "O apelo à contrição do povo. 💔" },
      { upTo: 27, god: "Restituir-vos-ei os anos que o gafanhoto comeu.", reaction: "Deus promete restaurar a terra. 🌾" },
      { upTo: 99, god: "Derramarei o meu Espírito sobre toda a carne.", reaction: "Filhos e filhas profetizarão! ✨" },
    ],
  },
  3: {
    keyframes: [
      kf(1, { terrain: "plain", crowd: 0.8, storm: 0.4, actors: [F(0.3, "king", "stand", "gold"), F(0.55, "warrior", "stand", "gray"), F(0.78, "man", "stand", "sand")] }),
      kf(9, { terrain: "plain", fire: 0.5, crowd: 0.7, storm: 0.5, actors: [F(0.3, "warrior", "fight", "red", { facing: -1 }), F(0.68, "warrior", "fight", "brown", { facing: 1 })] }),
      kf(14, { terrain: "mountain", darkness: 0.7, glory: 0.4, actors: [F(0.45, "man", "raise", "brown")] }),
      kf(18, { terrain: "hills", glory: 0.9, props: [P("altar", 0.5), P("tree", 0.75)], actors: [F(0.4, "elder", "raise", "white"), F(0.62, "man", "raise", "green")] }),
    ],
    beats: [
      { upTo: 8, god: "Ajuntarei todas as nações e as farei descer ao vale de Josafá.", reaction: "Deus chama as nações a juízo. ⚖️" },
      { upTo: 13, god: "Lançai a foice, porque a seara está madura.", reaction: "No vale da decisão, multidões se reúnem. 🌾" },
      { upTo: 17, reaction: "O sol e a lua escurecem; o SENHOR ruge de Sião. 🌑" },
      { upTo: 99, god: "Judá será habitada para sempre, e Jerusalém de geração em geração.", reaction: "Das montanhas correrá vinho; a terra florescerá. 🍇✨" },
    ],
  },
};
