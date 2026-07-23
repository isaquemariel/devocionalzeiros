// ============================================================================
// Roteiros de cena (Living Scene v2) — 1 TIMÓTEO, capítulo por capítulo.
// Carta pastoral de Paulo ao jovem Timóteo: sã doutrina, oração, os requisitos
// dos bispos e diáconos, o mistério da piedade, "combate o bom combate da fé",
// cuidado com o amor ao dinheiro e a guarda do bom depósito.
// Puramente visual/narrativo — não toca em progresso. Segue o padrão de Êxodo.
// ============================================================================

import type { ChapterScript, V2Actor, V2Prop, SceneState } from "@/lib/rpgLivingV2";

const F = (x: number, role: V2Actor["role"], action: V2Actor["action"], palette?: V2Actor["palette"], extra: Partial<V2Actor> = {}): V2Actor => ({ x, role, action, palette, ...extra });
const AN = (x: number, animal: NonNullable<V2Actor["animal"]>, scale = 1, color?: string): V2Actor => ({ x, kind: "animal", animal, scale, color });
const P = (kind: string, x: number, scale = 1, fire?: number): V2Prop => ({ kind, x, scale, ...(fire != null ? { fire } : {}) });
const kf = (v: number, state: SceneState) => ({ v, state });

export const TIMOTHY1_SCENES: Record<number, ChapterScript> = {
  1: {
    keyframes: [
      kf(1, { terrain: "city", props: [P("tower", 0.82, 0.9)], actors: [F(0.34, "elder", "raise", "white"), F(0.6, "man", "stand", "blue")] }),
      kf(3, { terrain: "city", crowd: 0.4, actors: [F(0.34, "elder", "stand", "white"), F(0.58, "man", "stand", "blue")] }),
      kf(12, { terrain: "city", glory: 0.4, actors: [F(0.42, "elder", "kneel", "white")] }),
      kf(18, { terrain: "city", glory: 0.35, actors: [F(0.36, "elder", "raise", "white"), F(0.6, "man", "stand", "blue")] }),
    ],
    beats: [
      { upTo: 2, reaction: "Paulo, apóstolo, escreve a Timóteo, seu verdadeiro filho na fé. ✍️" },
      { upTo: 11, reaction: "Fica em Éfeso e adverte contra a falsa doutrina. 📖" },
      { upTo: 17, reaction: "'Cristo veio salvar os pecadores, dos quais eu sou o principal.' 🤍" },
      { upTo: 99, reaction: "'Milita a boa milícia, guardando a fé e a boa consciência.' 🛡️" },
    ],
  },
  2: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.4, props: [P("altar", 0.5, 0.9)], actors: [F(0.3, "man", "kneel", "blue"), F(0.5, "man", "raise", "brown"), F(0.7, "woman", "kneel", "purple")] }),
      kf(5, { terrain: "city", glory: 0.6, actors: [F(0.45, "man", "raise", "white")] }),
      kf(8, { terrain: "city", glory: 0.45, crowd: 0.4, actors: [F(0.32, "man", "raise", "brown"), F(0.66, "woman", "stand", "purple")] }),
    ],
    beats: [
      { upTo: 4, reaction: "'Faça-se oração e súplica por todos os homens.' 🙏" },
      { upTo: 7, reaction: "Há um só Deus e um só Mediador: Cristo Jesus. ✨" },
      { upTo: 99, reaction: "Que os homens orem erguendo mãos santas, e as mulheres, com recato. 🤍" },
    ],
  },
  3: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.4, props: [P("tower", 0.8, 1), P("altar", 0.5, 0.8)], actors: [F(0.36, "elder", "stand", "white")] }),
      kf(8, { terrain: "city", crowd: 0.4, actors: [F(0.3, "man", "stand", "blue"), F(0.5, "man", "carry", "brown"), F(0.7, "man", "stand", "sand")] }),
      kf(16, { terrain: "city", glory: 0.7, actors: [F(0.45, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 7, reaction: "O bispo seja irrepreensível, sóbrio, apto para ensinar. 👤" },
      { upTo: 13, reaction: "Os diáconos, honestos, provados e fiéis no serviço. 🤝" },
      { upTo: 99, reaction: "Grande é o mistério da piedade: Deus manifestado em carne. ✨" },
    ],
  },
  4: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.3, actors: [F(0.4, "man", "stand", "gray")] }),
      kf(6, { terrain: "city", glory: 0.35, actors: [F(0.34, "elder", "stand", "white"), F(0.6, "child", "stand", "blue")] }),
      kf(12, { terrain: "city", glory: 0.4, crowd: 0.4, actors: [F(0.42, "child", "raise", "blue")] }),
    ],
    beats: [
      { upTo: 5, reaction: "Nos últimos tempos alguns se apartarão da fé. ⚠️" },
      { upTo: 11, reaction: "'Exercita-te na piedade; ela para tudo é proveitosa.' 💪" },
      { upTo: 99, reaction: "'Ninguém despreze a tua mocidade; sê exemplo dos fiéis.' 🕊️" },
    ],
  },
  5: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.4, actors: [F(0.28, "elder", "stand", "gray"), F(0.5, "man", "stand", "blue"), F(0.72, "woman", "stand", "purple")] }),
      kf(3, { terrain: "city", actors: [F(0.4, "woman", "mourn", "gray"), F(0.62, "woman", "stand", "sand")] }),
      kf(17, { terrain: "city", glory: 0.35, props: [P("altar", 0.6, 0.8)], actors: [F(0.36, "elder", "stand", "white")] }),
    ],
    beats: [
      { upTo: 2, reaction: "Trata os mais velhos como pais, os moços como irmãos. 👥" },
      { upTo: 16, reaction: "Honra as viúvas que verdadeiramente o são. 🤍" },
      { upTo: 99, reaction: "Os presbíteros que bem governam sejam dignamente honrados. 🕯️" },
    ],
  },
  6: {
    keyframes: [
      kf(1, { terrain: "city", crowd: 0.4, actors: [F(0.3, "servant", "stand", "sand"), F(0.6, "man", "stand", "brown")] }),
      kf(6, { terrain: "city", night: 0.25, actors: [F(0.4, "man", "kneel", "gold"), F(0.66, "man", "stand", "gray")] }),
      kf(11, { terrain: "city", glory: 0.4, actors: [F(0.4, "man", "fight", "blue", { facing: 1 })] }),
      kf(20, { terrain: "city", glory: 0.6, props: [P("ark", 0.62, 0.9)], actors: [F(0.36, "man", "raise", "blue")] }),
    ],
    beats: [
      { upTo: 5, reaction: "A piedade com contentamento é grande ganho. 🤍" },
      { upTo: 10, reaction: "'O amor ao dinheiro é a raiz de todos os males.' 💰⚠️" },
      { upTo: 16, reaction: "'Combate o bom combate da fé; toma posse da vida eterna.' 🛡️" },
      { upTo: 99, reaction: "'Ó Timóteo, guarda o bom depósito que te foi confiado.' 🗝️" },
    ],
  },
};
