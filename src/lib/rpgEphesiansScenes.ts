// ============================================================================
// Roteiros de cena (Living Scene v2) — EFÉSIOS, capítulo por capítulo.
// Carta de Paulo escrita na prisão: as bênçãos espirituais em Cristo, a
// salvação pela graça, judeus e gentios reconciliados num só corpo, o mistério
// da igreja, o novo homem, a armadura de Deus e o apelo final do apóstolo
// prisioneiro. Puramente visual/narrativo — não toca em progresso.
// Segue o padrão de Êxodo (rpgExodusScenes).
// ============================================================================

import type { ChapterScript, V2Actor, V2Prop, SceneState } from "@/lib/rpgLivingV2";

const F = (x: number, role: V2Actor["role"], action: V2Actor["action"], palette?: V2Actor["palette"], extra: Partial<V2Actor> = {}): V2Actor => ({ x, role, action, palette, ...extra });
const AN = (x: number, animal: NonNullable<V2Actor["animal"]>, scale = 1, color?: string): V2Actor => ({ x, kind: "animal", animal, scale, color });
const P = (kind: string, x: number, scale = 1, fire?: number): V2Prop => ({ kind, x, scale, ...(fire != null ? { fire } : {}) });
const kf = (v: number, state: SceneState) => ({ v, state });

export const EPHESIANS_SCENES: Record<number, ChapterScript> = {
  1: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.4, props: [P("cross", 0.5, 1.1)], actors: [F(0.32, "man", "raise", "white"), F(0.7, "man", "stand", "brown")] }),
      kf(3, { terrain: "city", glory: 0.7, props: [P("cross", 0.5, 1.1), P("dove", 0.66)], actors: [F(0.4, "man", "raise", "blue")] }),
      kf(15, { terrain: "city", glory: 0.6, props: [P("cross", 0.52)], actors: [F(0.42, "man", "kneel", "brown")] }),
      kf(20, { terrain: "city", glory: 0.9, props: [P("cross", 0.5, 1.2)], actors: [F(0.5, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 2, reaction: "Paulo saúda os santos que estão em Éfeso. ✍️" },
      { upTo: 14, reaction: "Bendito o Deus que nos abençoou com toda bênção espiritual! ✨" },
      { upTo: 19, reaction: "Paulo ora por olhos iluminados para conhecer a esperança. 🙏" },
      { upTo: 99, reaction: "Deus ressuscitou a Cristo e o pôs acima de todo poder. 👑" },
    ],
  },
  2: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.6, actors: [F(0.4, "man", "lie", "gray"), F(0.66, "man", "mourn", "gray")] }),
      kf(4, { terrain: "city", glory: 0.7, props: [P("cross", 0.5, 1.1)], actors: [F(0.42, "man", "raise", "white")] }),
      kf(8, { terrain: "city", glory: 0.6, props: [P("cross", 0.5)], actors: [F(0.4, "man", "kneel", "brown")] }),
      kf(14, { terrain: "city", crowd: 0.7, glory: 0.4, props: [P("cross", 0.5), P("tower", 0.8, 1.1)], actors: [F(0.3, "man", "stand", "blue"), F(0.66, "man", "stand", "sand")] }),
    ],
    beats: [
      { upTo: 3, reaction: "Estáveis mortos em vossos delitos e pecados. 🌑" },
      { upTo: 7, reaction: "Mas Deus, rico em misericórdia, nos vivificou com Cristo! 💛" },
      { upTo: 10, reaction: "Pela graça sois salvos, por meio da fé — dom de Deus. 🎁" },
      { upTo: 99, reaction: "Judeus e gentios: um só povo, um só templo no Senhor. 🕊️" },
    ],
  },
  3: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.4, props: [P("tower", 0.82, 1.1)], actors: [F(0.4, "man", "stand", "white")] }),
      kf(6, { terrain: "city", glory: 0.6, crowd: 0.6, props: [P("cross", 0.5)], actors: [F(0.3, "man", "raise", "blue"), F(0.68, "man", "stand", "sand")] }),
      kf(14, { terrain: "city", glory: 0.8, props: [P("cross", 0.5, 1.1)], actors: [F(0.45, "man", "kneel", "brown")] }),
    ],
    beats: [
      { upTo: 5, reaction: "Paulo, prisioneiro por Cristo, revela um mistério. 🔓" },
      { upTo: 13, reaction: "O mistério: os gentios são co-herdeiros da promessa. ✨" },
      { upTo: 99, reaction: "Paulo dobra os joelhos: 'que conheçais o amor de Cristo!' 🙏" },
    ],
  },
  4: {
    keyframes: [
      kf(1, { terrain: "city", props: [P("tower", 0.84, 1)], actors: [F(0.4, "man", "stand", "white")] }),
      kf(4, { terrain: "city", crowd: 0.7, glory: 0.4, props: [P("dove", 0.5)], actors: [F(0.3, "man", "stand", "blue"), F(0.5, "woman", "stand", "green"), F(0.7, "man", "stand", "sand")] }),
      kf(17, { terrain: "city", night: 0.4, actors: [F(0.4, "man", "walk", "gray")] }),
      kf(22, { terrain: "city", glory: 0.6, props: [P("cross", 0.55)], actors: [F(0.42, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 3, reaction: "Andai com toda humildade, suportando-vos em amor. 🤝" },
      { upTo: 16, reaction: "Um só corpo, um só Espírito, um só Senhor. ✝️" },
      { upTo: 24, reaction: "Despi o velho homem e revesti-vos do novo. 🌱" },
      { upTo: 99, reaction: "Sede bondosos e perdoai como Deus vos perdoou. 💛" },
    ],
  },
  5: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.5, props: [P("cross", 0.5)], actors: [F(0.4, "man", "walk", "white"), F(0.62, "man", "walk", "brown")] }),
      kf(8, { terrain: "city", glory: 0.6, actors: [F(0.42, "man", "raise", "gold")] }),
      kf(19, { terrain: "city", crowd: 0.6, glory: 0.4, actors: [F(0.35, "woman", "raise", "purple"), F(0.6, "man", "raise", "blue")] }),
      kf(22, { terrain: "city", glory: 0.5, props: [P("cross", 0.5)], actors: [F(0.4, "man", "stand", "brown"), F(0.6, "woman", "stand", "green")] }),
    ],
    beats: [
      { upTo: 7, reaction: "Sede imitadores de Deus, andai em amor. 💗" },
      { upTo: 14, reaction: "Éreis trevas, mas agora sois luz no Senhor. 💡" },
      { upTo: 21, reaction: "Enchei-vos do Espírito, cantando ao Senhor. 🎶" },
      { upTo: 99, reaction: "O casamento espelha Cristo e a igreja. 💍" },
    ],
  },
  6: {
    keyframes: [
      kf(1, { terrain: "city", actors: [F(0.34, "man", "stand", "brown"), F(0.5, "woman", "stand", "green"), F(0.68, "child", "stand", "sand")] }),
      kf(10, { terrain: "city", glory: 0.5, actors: [F(0.45, "warrior", "stand", "gray")] }),
      kf(13, { terrain: "city", glory: 0.7, storm: 0.3, actors: [F(0.45, "warrior", "fight", "gray", { facing: 1 })] }),
      kf(19, { terrain: "city", night: 0.5, props: [P("tower", 0.82, 1.1)], actors: [F(0.42, "man", "kneel", "white")] }),
    ],
    beats: [
      { upTo: 9, reaction: "Filhos, obedecei; senhores, tratai bem os servos. 🏠" },
      { upTo: 12, reaction: "Nossa luta não é contra sangue, mas contra potestades. ⚔️" },
      { upTo: 18, reaction: "Revesti-vos de toda a armadura de Deus! 🛡️" },
      { upTo: 99, reaction: "Paulo, embaixador em cadeias, pede oração. ⛓️🙏" },
    ],
  },
};
