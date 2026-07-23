// ============================================================================
// Roteiros de cena (Living Scene v2) — JONAS, capítulo por capítulo.
// A fuga de Jonas num navio e a tempestade no mar, a oração do ventre nas
// profundezas, a pregação em Nínive que se arrepende e a lição da planta e
// da compaixão de Deus. Puramente visual/narrativo — não toca em progresso.
// Segue o padrão de Êxodo (rpgExodusScenes).
// ============================================================================

import type { ChapterScript, V2Actor, V2Prop, SceneState } from "@/lib/rpgLivingV2";

const F = (x: number, role: V2Actor["role"], action: V2Actor["action"], palette?: V2Actor["palette"], extra: Partial<V2Actor> = {}): V2Actor => ({ x, role, action, palette, ...extra });
const AN = (x: number, animal: NonNullable<V2Actor["animal"]>, scale = 1, color?: string): V2Actor => ({ x, kind: "animal", animal, scale, color });
const P = (kind: string, x: number, scale = 1, fire?: number): V2Prop => ({ kind, x, scale, ...(fire != null ? { fire } : {}) });
const kf = (v: number, state: SceneState) => ({ v, state });

export const JONAH_SCENES: Record<number, ChapterScript> = {
  1: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.3, props: [P("tower", 0.82, 1.1)], actors: [F(0.4, "man", "stand", "brown")] }),
      kf(3, { terrain: "sea", props: [P("reeds", 0.86)], actors: [F(0.4, "man", "walk", "brown", { facing: 1 })] }),
      kf(4, { terrain: "sea", storm: 0.8, rain: 0.5, night: 0.3, actors: [F(0.35, "man", "lie", "brown"), F(0.6, "man", "mourn", "sand")] }),
      kf(12, { terrain: "sea", storm: 0.95, rain: 0.7, night: 0.5, actors: [F(0.4, "man", "raise", "brown"), F(0.66, "man", "mourn", "sand")] }),
      kf(15, { terrain: "sea", storm: 0.4, night: 0.5, actors: [F(0.6, "man", "kneel", "sand")] }),
    ],
    beats: [
      { upTo: 2, god: "Levanta-te, vai à grande cidade de Nínive e clama contra ela.", reaction: "O SENHOR chama Jonas. 📣" },
      { upTo: 3, reaction: "Mas Jonas foge para Társis, num navio no mar. ⛵" },
      { upTo: 11, reaction: "Grande tempestade se levanta; os marinheiros temem morrer. 🌊⚡" },
      { upTo: 99, reaction: "Lançam Jonas às águas, e o mar se aquieta. 💧" },
    ],
  },
  2: {
    keyframes: [
      kf(1, { terrain: "sea", night: 0.8, flood: 0.7, actors: [F(0.45, "man", "lie", "blue")] }),
      kf(2, { terrain: "sea", night: 0.9, flood: 0.8, actors: [F(0.45, "man", "kneel", "blue")] }),
      kf(7, { terrain: "sea", night: 0.6, glory: 0.4, flood: 0.5, props: [P("dove", 0.62, 0.9)], actors: [F(0.4, "man", "raise", "blue")] }),
      kf(10, { terrain: "sea", glory: 0.6, night: 0.3, props: [P("dove", 0.64, 0.9)], actors: [F(0.42, "man", "kneel", "brown")] }),
    ],
    beats: [
      { upTo: 1, reaction: "Nas profundezas, Jonas é tragado pelas águas. 🌊" },
      { upTo: 6, god: undefined, reaction: "Do ventre da angústia, Jonas ora ao SENHOR. 🙏" },
      { upTo: 9, reaction: "'A salvação vem do SENHOR!' — sua voz sobe do abismo. 🕊️" },
      { upTo: 99, god: "Ele o vomitou em terra seca.", reaction: "Deus livra Jonas e o devolve à vida. ✨" },
    ],
  },
  3: {
    keyframes: [
      kf(1, { terrain: "city", props: [P("tower", 0.8, 1.2), P("tower", 0.15, 0.9)], actors: [F(0.4, "man", "walk", "brown")] }),
      kf(4, { terrain: "city", crowd: 0.7, props: [P("tower", 0.82, 1.1)], actors: [F(0.35, "man", "raise", "brown")] }),
      kf(6, { terrain: "city", crowd: 0.5, night: 0.2, actors: [F(0.45, "king", "mourn", "gray")] }),
      kf(8, { terrain: "city", crowd: 0.8, night: 0.2, actors: [F(0.3, "man", "kneel", "sand"), F(0.55, "woman", "mourn", "gray"), F(0.75, "child", "kneel", "brown")] }),
    ],
    beats: [
      { upTo: 2, god: "Levanta-te e prega a Nínive a mensagem que eu te disser.", reaction: "O SENHOR chama Jonas outra vez. 📣" },
      { upTo: 4, reaction: "'Ainda quarenta dias, e Nínive será destruída!' ⏳" },
      { upTo: 7, reaction: "O rei desce do trono, cobre-se de saco e clama a Deus. 👑" },
      { upTo: 99, god: undefined, reaction: "A cidade inteira se arrepende, e Deus se compadece. 🤍" },
    ],
  },
  4: {
    keyframes: [
      kf(1, { terrain: "desert", actors: [F(0.4, "man", "mourn", "brown")] }),
      kf(5, { terrain: "desert", props: [P("tree", 0.55, 1.2)], actors: [F(0.4, "man", "stand", "brown")] }),
      kf(7, { terrain: "desert", fire: 0.3, props: [P("tree", 0.55, 0.6)], actors: [F(0.4, "man", "mourn", "brown")] }),
      kf(10, { terrain: "desert", glory: 0.6, props: [P("tree", 0.55, 0.6)], actors: [F(0.4, "man", "kneel", "brown")] }),
    ],
    beats: [
      { upTo: 3, reaction: "Jonas se irrita porque Deus poupou a cidade. 😤" },
      { upTo: 6, god: undefined, reaction: "Uma planta cresce e o abriga do calor. 🌱" },
      { upTo: 8, reaction: "A planta seca, e Jonas deseja morrer sob o sol. ☀️" },
      { upTo: 99, god: "E não hei de eu ter compaixão da grande cidade de Nínive?", reaction: "Deus ensina a lição da misericórdia. 🤍" },
    ],
  },
};
