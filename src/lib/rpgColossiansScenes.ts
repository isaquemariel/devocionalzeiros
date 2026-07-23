// ============================================================================
// Roteiros de cena (Living Scene v2) — COLOSSENSES, capítulo por capítulo.
// Carta de Paulo aos colossenses: a supremacia de Cristo, imagem do Deus
// invisível, criador de todas as coisas, reconciliador pela cruz. "Buscai as
// coisas do alto", o novo homem, a vida em família e no trabalho. Paulo escreve
// da prisão. Puramente visual/narrativo — não toca em progresso.
// Segue o padrão de Êxodo (rpgExodusScenes).
// ============================================================================

import type { ChapterScript, V2Actor, V2Prop, SceneState } from "@/lib/rpgLivingV2";

const F = (x: number, role: V2Actor["role"], action: V2Actor["action"], palette?: V2Actor["palette"], extra: Partial<V2Actor> = {}): V2Actor => ({ x, role, action, palette, ...extra });
const AN = (x: number, animal: NonNullable<V2Actor["animal"]>, scale = 1, color?: string): V2Actor => ({ x, kind: "animal", animal, scale, color });
const P = (kind: string, x: number, scale = 1, fire?: number): V2Prop => ({ kind, x, scale, ...(fire != null ? { fire } : {}) });
const kf = (v: number, state: SceneState) => ({ v, state });

export const COLOSSIANS_SCENES: Record<number, ChapterScript> = {
  1: {
    keyframes: [
      kf(1, { terrain: "city", props: [P("tower", 0.82, 0.9)], actors: [F(0.4, "man", "stand", "white"), F(0.62, "man", "stand", "brown")] }),
      kf(9, { terrain: "city", glory: 0.4, actors: [F(0.42, "man", "kneel", "white")] }),
      kf(15, { terrain: "plain", night: 0.8, glory: 0.5, props: [P("star", 0.2), P("star", 0.4, 0.8), P("star", 0.6), P("star", 0.8, 0.9)], actors: [F(0.5, "man", "raise", "white")] }),
      kf(20, { terrain: "hills", glory: 0.85, props: [P("cross", 0.5, 1.2)], actors: [F(0.5, "man", "kneel", "brown")] }),
    ],
    beats: [
      { upTo: 8, reaction: "Paulo agradece pela fé e pelo amor dos colossenses. 🤍" },
      { upTo: 14, reaction: "Ele ora para que andem de modo digno do Senhor. 🙏" },
      { upTo: 17, reaction: "Cristo é a imagem do Deus invisível: tudo foi criado por Ele. ✨🌌" },
      { upTo: 99, reaction: "E por Ele Deus reconciliou tudo, fazendo a paz pela cruz. ✝️" },
    ],
  },
  2: {
    keyframes: [
      kf(1, { terrain: "city", props: [P("tower", 0.8, 0.9)], actors: [F(0.42, "man", "stand", "white"), F(0.66, "man", "stand", "sand")] }),
      kf(6, { terrain: "garden", glory: 0.4, props: [P("tree", 0.5, 1.3)], actors: [F(0.34, "man", "stand", "brown")] }),
      kf(15, { terrain: "hills", glory: 0.7, props: [P("cross", 0.5, 1.2)], actors: [F(0.5, "man", "raise", "brown")] }),
    ],
    beats: [
      { upTo: 5, reaction: "Paulo luta em oração para que sejam firmes na fé. 💪" },
      { upTo: 14, reaction: "Enraizados em Cristo, guardai-vos de filosofias vãs. 🌳" },
      { upTo: 99, reaction: "Na cruz, Ele triunfou sobre os principados e potestades. ✝️✨" },
    ],
  },
  3: {
    keyframes: [
      kf(1, { terrain: "mountain", glory: 0.85, actors: [F(0.5, "man", "raise", "white")] }),
      kf(9, { terrain: "field", glory: 0.4, actors: [F(0.4, "man", "stand", "green"), F(0.6, "man", "raise", "white")] }),
      kf(18, { terrain: "city", crowd: 0.5, props: [P("tent", 0.78)], actors: [F(0.32, "man", "stand", "brown"), F(0.48, "woman", "stand", "purple"), F(0.62, "child", "stand", "sand")] }),
      kf(22, { terrain: "city", crowd: 0.6, actors: [F(0.38, "servant", "carry", "sand"), F(0.66, "man", "stand", "brown")] }),
    ],
    beats: [
      { upTo: 4, reaction: "Buscai as coisas do alto, onde Cristo está. 🌟" },
      { upTo: 11, reaction: "Despi o velho homem e revesti-vos do novo. 🕊️" },
      { upTo: 17, reaction: "Sobre tudo, revesti-vos do amor, que é o vínculo perfeito. 🤍" },
      { upTo: 99, reaction: "Na família e no trabalho, tudo fazei de coração, para o Senhor. 🏠🛠️" },
    ],
  },
  4: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.4, actors: [F(0.4, "man", "raise", "white"), F(0.66, "servant", "stand", "sand")] }),
      kf(7, { terrain: "city", props: [P("tower", 0.8, 0.9)], actors: [F(0.5, "man", "walk", "brown")] }),
      kf(18, { terrain: "city", glory: 0.35, props: [P("tower", 0.82, 0.85)], actors: [F(0.5, "man", "stand", "white")] }),
    ],
    beats: [
      { upTo: 6, reaction: "Perseverai na oração; que a vossa palavra seja com graça. 🙏" },
      { upTo: 17, reaction: "Paulo envia os irmãos e manda saudações à igreja. 🤝" },
      { upTo: 99, reaction: "'Lembrai-vos das minhas cadeias.' Paulo assina de próprio punho. ✒️" },
    ],
  },
};
