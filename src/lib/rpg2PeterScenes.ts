// ============================================================================
// Roteiros de cena (Living Scene v2) — 2 PEDRO, capítulo por capítulo.
// Crescimento na fé, o testemunho da transfiguração no monte santo, a palavra
// profética como lâmpada em lugar escuro, a advertência contra falsos mestres
// e o Dia do Senhor que virá como ladrão, com novos céus e nova terra.
// Puramente visual/narrativo — não toca em progresso.
// ============================================================================

import type { ChapterScript, V2Actor, V2Prop, SceneState } from "@/lib/rpgLivingV2";

const F = (x: number, role: V2Actor["role"], action: V2Actor["action"], palette?: V2Actor["palette"], extra: Partial<V2Actor> = {}): V2Actor => ({ x, role, action, palette, ...extra });
const AN = (x: number, animal: NonNullable<V2Actor["animal"]>, scale = 1, color?: string): V2Actor => ({ x, kind: "animal", animal, scale, color });
const P = (kind: string, x: number, scale = 1, fire?: number): V2Prop => ({ kind, x, scale, ...(fire != null ? { fire } : {}) });
const kf = (v: number, state: SceneState) => ({ v, state });

export const PETER2_SCENES: Record<number, ChapterScript> = {
  1: {
    keyframes: [
      kf(1, { terrain: "hills", glory: 0.3, actors: [F(0.4, "elder", "stand", "white"), F(0.6, "man", "stand", "brown")] }),
      kf(5, { terrain: "hills", glory: 0.4, props: [P("tree", 0.7)], actors: [F(0.35, "man", "raise", "brown"), F(0.55, "man", "stand", "blue")] }),
      kf(16, { terrain: "mountain", glory: 0.95, actors: [F(0.5, "man", "raise", "white"), F(0.3, "man", "bow", "brown"), F(0.68, "man", "bow", "blue")] }),
      kf(19, { terrain: "mountain", night: 0.75, glory: 0.4, props: [P("lampstand", 0.5, 1.1, 1), P("star", 0.75, 0.8)], actors: [F(0.35, "elder", "stand", "white")] }),
    ],
    beats: [
      { upTo: 4, god: undefined, reaction: "Fostes feitos participantes da natureza divina. 🤍" },
      { upTo: 11, reaction: "Acrescentai à fé a virtude, o saber, o amor — e crescei! 🌱" },
      { upTo: 18, god: "Este é o meu Filho amado, em quem me comprazo.", reaction: "Fomos testemunhas oculares no monte santo. ✨" },
      { upTo: 99, reaction: "Atendei à palavra profética: lâmpada em lugar escuro, até raiar o dia. 🔦" },
    ],
  },
  2: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.4, crowd: 0.5, actors: [F(0.35, "man", "raise", "purple"), F(0.6, "man", "stand", "gray")] }),
      kf(9, { terrain: "sea", storm: 0.7, night: 0.5, rain: 0.4, actors: [F(0.4, "man", "kneel", "brown")] }),
      kf(17, { terrain: "desert", storm: 0.6, night: 0.6, darkness: 0.5, props: [P("well", 0.6)], actors: [F(0.45, "man", "stand", "gray")] }),
      kf(22, { terrain: "desert", night: 0.5, actors: [F(0.5, "man", "walk", "gray")], props: [P("well", 0.55)] }),
    ],
    beats: [
      { upTo: 3, reaction: "Surgirão falsos mestres, com heresias de perdição. ⚠️" },
      { upTo: 10, god: undefined, reaction: "O Senhor sabe livrar da provação os piedosos. 🙏" },
      { upTo: 16, reaction: "Fontes sem água, névoas levadas pela tempestade. 🌫️⛈️" },
      { upTo: 99, reaction: "Prometem liberdade, sendo escravos da corrupção. 🔗" },
    ],
  },
  3: {
    keyframes: [
      kf(1, { terrain: "sea", night: 0.5, actors: [F(0.4, "elder", "stand", "white"), F(0.62, "man", "stand", "blue")] }),
      kf(10, { terrain: "city", night: 0.85, storm: 0.6, actors: [F(0.5, "man", "walk", "gray", { facing: 1 })] }),
      kf(12, { terrain: "mountain", fire: 0.95, storm: 0.5, actors: [F(0.4, "man", "bow", "brown")] }),
      kf(13, { terrain: "hills", glory: 0.9, rainbow: 0.5, props: [P("tree", 0.7)], actors: [F(0.45, "man", "raise", "white")] }),
    ],
    beats: [
      { upTo: 9, god: undefined, reaction: "Um dia é como mil anos; o Senhor não tarda, é paciente. ⏳" },
      { upTo: 10, reaction: "O Dia do Senhor virá como ladrão de noite. 🌑" },
      { upTo: 12, reaction: "Os céus passarão com estrondo e os elementos arderão em fogo. 🔥" },
      { upTo: 99, god: undefined, reaction: "Esperamos novos céus e nova terra, onde habita a justiça. 🌟" },
    ],
  },
};
