// ============================================================================
// Roteiros de cena (Living Scene v2) — MALAQUIAS, capítulo por capítulo.
// O amor do SENHOR por Israel, a repreensão aos sacerdotes por ofertas impuras
// sobre o altar, a infidelidade do povo, o roubo nos dízimos e a promessa das
// janelas do céu; o mensageiro que prepara o caminho, o fogo do refinador, o
// Sol da Justiça que nasce com cura nas asas e a vinda de Elias antes do grande
// Dia do SENHOR. Puramente visual/narrativo — não toca em progresso.
// Segue o padrão de Êxodo (rpgExodusScenes).
// ============================================================================

import type { ChapterScript, V2Actor, V2Prop, SceneState } from "@/lib/rpgLivingV2";

const F = (x: number, role: V2Actor["role"], action: V2Actor["action"], palette?: V2Actor["palette"], extra: Partial<V2Actor> = {}): V2Actor => ({ x, role, action, palette, ...extra });
const AN = (x: number, animal: NonNullable<V2Actor["animal"]>, scale = 1, color?: string): V2Actor => ({ x, kind: "animal", animal, scale, color });
const P = (kind: string, x: number, scale = 1, fire?: number): V2Prop => ({ kind, x, scale, ...(fire != null ? { fire } : {}) });
const kf = (v: number, state: SceneState) => ({ v, state });

export const MALACHI_SCENES: Record<number, ChapterScript> = {
  1: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.35, actors: [F(0.4, "elder", "raise", "white"), F(0.62, "man", "stand", "brown")] }),
      kf(6, { terrain: "city", props: [P("altar", 0.5, 1.1, 0.4)], actors: [F(0.3, "man", "stand", "gold"), F(0.68, "man", "carry", "sand")] }),
      kf(8, { terrain: "city", night: 0.2, props: [P("altar", 0.5, 1.1, 0.3)], actors: [F(0.34, "man", "stand", "gold"), AN(0.66, "goat", 0.8)] }),
      kf(11, { terrain: "plain", glory: 0.5, crowd: 0.4, props: [P("altar", 0.5, 1, 0.7)], actors: [F(0.5, "man", "bow", "white")] }),
    ],
    beats: [
      { upTo: 5, god: "Eu vos amei, diz o SENHOR. Amei a Jacó.", reaction: "O SENHOR declara o seu amor por Israel. 💛" },
      { upTo: 7, god: "O filho honra o pai. Onde está a minha honra?", reaction: "Os sacerdotes desprezam o nome do SENHOR. 😔" },
      { upTo: 10, god: "Trazeis o cego e o coxo para o sacrifício. Isso não é mal?", reaction: "Ofertas impuras poluem o altar. 🐐" },
      { upTo: 99, god: "Do nascente ao poente, grande é o meu nome entre as nações.", reaction: "O SENHOR busca oferta pura. ✨" },
    ],
  },
  2: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.25, props: [P("altar", 0.5, 1)], actors: [F(0.36, "man", "stand", "gold"), F(0.66, "man", "stand", "sand")] }),
      kf(5, { terrain: "city", glory: 0.4, props: [P("altar", 0.5, 1, 0.6)], actors: [F(0.5, "elder", "raise", "white")] }),
      kf(11, { terrain: "city", night: 0.3, actors: [F(0.34, "man", "mourn", "brown"), F(0.6, "woman", "mourn", "gray")] }),
      kf(14, { terrain: "city", night: 0.4, props: [P("altar", 0.5, 0.9)], actors: [F(0.5, "man", "kneel", "brown")] }),
    ],
    beats: [
      { upTo: 4, god: "Se não me ouvirdes, amaldiçoarei as vossas bênçãos.", reaction: "Advertência severa aos sacerdotes. ⚠️" },
      { upTo: 9, god: "Meu concerto com Levi era de vida e paz.", reaction: "O sacerdócio corrompeu a aliança. 📜" },
      { upTo: 13, reaction: "Judá agiu com traição; o altar se cobre de lágrimas. 😢" },
      { upTo: 99, god: "Eu aborreço o repúdio, diz o SENHOR. Guardai o vosso espírito.", reaction: "Deus condena a infidelidade. 🤍" },
    ],
  },
  3: {
    keyframes: [
      kf(1, { terrain: "city", glory: 0.5, props: [P("altar", 0.5, 1.1, 0.6)], actors: [F(0.4, "angel", "raise", "white"), F(0.66, "man", "stand", "brown")] }),
      kf(2, { terrain: "city", glory: 0.6, fire: 0.7, props: [P("altar", 0.5, 1.1, 1), P("smoke", 0.5, 1.6)], actors: [F(0.36, "man", "bow", "white")] }),
      kf(8, { terrain: "crowd", night: 0.2, actors: [F(0.32, "man", "carry", "brown"), F(0.5, "man", "stand", "sand"), F(0.7, "man", "carry", "gray")] }),
      kf(10, { terrain: "city", glory: 0.85, props: [P("tower", 0.2, 1.1), P("altar", 0.6, 1, 0.5)], actors: [F(0.44, "man", "raise", "brown")] }),
    ],
    beats: [
      { upTo: 1, god: "Eis que envio o meu mensageiro, e ele preparará o caminho.", reaction: "O Senhor virá de repente ao seu templo. 📯" },
      { upTo: 7, god: "Ele é como o fogo do refinador; purificará os filhos de Levi.", reaction: "Fogo que purifica a oferta. 🔥" },
      { upTo: 9, god: "Roubará o homem a Deus? E vós me roubais nos dízimos!", reaction: "O povo é acusado de roubar nos dízimos. 😔" },
      { upTo: 99, god: "Trazei todos os dízimos à casa do tesouro, e vede se não vos abrirei as janelas do céu.", reaction: "A promessa da bênção transbordante! 🌟" },
    ],
  },
  4: {
    keyframes: [
      kf(1, { terrain: "field", fire: 0.85, storm: 0.4, props: [P("smoke", 0.5, 2)], actors: [F(0.4, "man", "stand", "brown")] }),
      kf(2, { terrain: "field", glory: 0.9, actors: [F(0.3, "man", "raise", "white"), F(0.55, "child", "raise", "sand"), AN(0.78, "ox", 0.9)] }),
      kf(5, { terrain: "mountain", glory: 0.7, fire: 0.4, actors: [F(0.42, "elder", "raise", "white")] }),
      kf(6, { terrain: "mountain", glory: 0.85, crowd: 0.4, actors: [F(0.36, "elder", "raise", "white"), F(0.6, "child", "stand", "brown")] }),
    ],
    beats: [
      { upTo: 1, god: "Vem o dia que arde como fornalha; os soberbos serão restolho.", reaction: "O grande Dia do SENHOR se aproxima. 🔥" },
      { upTo: 3, god: "Nascerá o Sol da Justiça, e cura trará nas suas asas.", reaction: "Luz e cura para os que temem o Nome. ☀️" },
      { upTo: 5, god: "Eis que vos enviarei o profeta Elias, antes do grande Dia.", reaction: "A promessa da vinda de Elias. ⛰️" },
      { upTo: 99, god: "Ele converterá o coração dos pais aos filhos.", reaction: "Corações reconciliados antes do Dia. 🤍" },
    ],
  },
};
