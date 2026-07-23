// ============================================================================
// Roteiros de cena (Living Scene v2) — 2 TIMÓTEO, capítulo por capítulo.
// A última carta de Paulo, preso e perto do fim: "não te envergonhes do
// testemunho", o soldado, o atleta e o lavrador, "toda Escritura é inspirada"
// e "combati o bom combate, acabei a carreira, guardei a fé — a coroa me está
// guardada". Puramente visual/narrativo — não toca em progresso.
// Segue o padrão de Êxodo (rpgExodusScenes).
// ============================================================================

import type { ChapterScript, V2Actor, V2Prop, SceneState } from "@/lib/rpgLivingV2";

const F = (x: number, role: V2Actor["role"], action: V2Actor["action"], palette?: V2Actor["palette"], extra: Partial<V2Actor> = {}): V2Actor => ({ x, role, action, palette, ...extra });
const AN = (x: number, animal: NonNullable<V2Actor["animal"]>, scale = 1, color?: string): V2Actor => ({ x, kind: "animal", animal, scale, color });
const P = (kind: string, x: number, scale = 1, fire?: number): V2Prop => ({ kind, x, scale, ...(fire != null ? { fire } : {}) });
const kf = (v: number, state: SceneState) => ({ v, state });

export const TIMOTHY2_SCENES: Record<number, ChapterScript> = {
  1: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.6, props: [P("tower", 0.82, 1.1)], actors: [F(0.4, "man", "stand", "white")] }),
      kf(5, { terrain: "city", night: 0.4, glory: 0.3, actors: [F(0.32, "woman", "stand", "purple"), F(0.5, "woman", "stand", "blue"), F(0.7, "child", "stand", "sand")] }),
      kf(8, { terrain: "city", night: 0.6, glory: 0.35, props: [P("tower", 0.82, 1.1)], actors: [F(0.45, "man", "raise", "white")] }),
      kf(13, { terrain: "city", night: 0.55, glory: 0.3, actors: [F(0.42, "man", "kneel", "white")] }),
    ],
    beats: [
      { upTo: 5, reaction: "Paulo lembra a fé sincera de Timóteo — vinda de Loide e Eunice. 🤍" },
      { upTo: 7, reaction: "Reaviva o dom de Deus: não de temor, mas de poder e amor. 🔥" },
      { upTo: 12, reaction: "'Não te envergonhes do testemunho do Senhor, nem de mim, preso.' ⛓️" },
      { upTo: 99, reaction: "Guarda o bom depósito pelo Espírito que habita em nós. 📖" },
    ],
  },
  2: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.3, actors: [F(0.4, "man", "stand", "white"), F(0.6, "man", "stand", "blue")] }),
      kf(3, { terrain: "field", actors: [F(0.5, "warrior", "stand", "red")] }),
      kf(5, { terrain: "field", glory: 0.4, actors: [F(0.5, "man", "raise", "sand")] }),
      kf(6, { terrain: "field", actors: [F(0.4, "man", "carry", "brown"), AN(0.7, "ox", 0.9)] }),
    ],
    beats: [
      { upTo: 2, reaction: "'O que ouviste de mim, confia a homens fiéis.' 🤝" },
      { upTo: 4, reaction: "Sofre como bom soldado de Cristo Jesus. ⚔️" },
      { upTo: 6, reaction: "O atleta só é coroado se competir segundo as regras; o lavrador trabalha primeiro. 🌾" },
      { upTo: 99, reaction: "Lembra-te de Jesus Cristo, ressuscitado dentre os mortos. ✨" },
    ],
  },
  3: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.4, crowd: 0.5, actors: [F(0.3, "man", "fight", "gray", { facing: 1 }), F(0.6, "man", "stand", "sand")] }),
      kf(10, { terrain: "city", night: 0.25, actors: [F(0.4, "man", "walk", "white"), F(0.6, "man", "stand", "blue")] }),
      kf(14, { terrain: "city", glory: 0.5, actors: [F(0.5, "man", "stand", "blue")] }),
      kf(16, { terrain: "city", glory: 0.7, props: [P("tablets", 0.5, 1.1)], actors: [F(0.42, "man", "kneel", "blue")] }),
    ],
    beats: [
      { upTo: 9, reaction: "Nos últimos dias virão tempos difíceis, homens amantes de si mesmos. ⚠️" },
      { upTo: 13, reaction: "Mas tu segue meu ensino, minha fé e minha perseverança. 🛡️" },
      { upTo: 15, reaction: "Desde a infância conheces as Sagradas Letras. 📖" },
      { upTo: 99, reaction: "'Toda Escritura é inspirada por Deus e útil para ensinar.' ✨📜" },
    ],
  },
  4: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.4, glory: 0.3, actors: [F(0.42, "man", "raise", "white")] }),
      kf(6, { terrain: "city", night: 0.6, props: [P("tower", 0.82, 1.1)], actors: [F(0.45, "man", "stand", "white")] }),
      kf(7, { terrain: "city", glory: 0.7, actors: [F(0.45, "man", "raise", "white")] }),
      kf(18, { terrain: "city", glory: 0.9, actors: [F(0.45, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 5, reaction: "'Prega a palavra, insta a tempo e fora de tempo.' 📣" },
      { upTo: 6, reaction: "'O tempo da minha partida está próximo.' ⛓️" },
      { upTo: 8, reaction: "'Combati o bom combate, acabei a carreira, guardei a fé — a coroa me está guardada.' 🏆" },
      { upTo: 99, reaction: "O Senhor esteve ao seu lado e o fortaleceu. A ele a glória para sempre! ✨" },
    ],
  },
};
