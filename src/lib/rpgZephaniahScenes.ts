// ============================================================================
// Roteiros de cena (Living Scene v2) — SOFONIAS, capítulo por capítulo.
// O grande e terrível Dia do SENHOR: juízo sobre Judá e sobre as nações;
// buscai o SENHOR, ó humildes da terra; mas no fim, canto de alegria —
// "o SENHOR se regozija sobre ti com júbilo" — e a restauração do remanescente.
// Puramente visual/narrativo — não toca em progresso.
// Segue o padrão de Êxodo (rpgExodusScenes).
// ============================================================================

import type { ChapterScript, V2Actor, V2Prop, SceneState } from "@/lib/rpgLivingV2";

const F = (x: number, role: V2Actor["role"], action: V2Actor["action"], palette?: V2Actor["palette"], extra: Partial<V2Actor> = {}): V2Actor => ({ x, role, action, palette, ...extra });
const AN = (x: number, animal: NonNullable<V2Actor["animal"]>, scale = 1, color?: string): V2Actor => ({ x, kind: "animal", animal, scale, color });
const P = (kind: string, x: number, scale = 1, fire?: number): V2Prop => ({ kind, x, scale, ...(fire != null ? { fire } : {}) });
const kf = (v: number, state: SceneState) => ({ v, state });

export const ZEPHANIAH_SCENES: Record<number, ChapterScript> = {
  1: {
    keyframes: [
      kf(1, { terrain: "city", night: 0.35, darkness: 0.3, actors: [F(0.4, "man", "raise", "brown"), F(0.66, "king", "stand", "gold")] }),
      kf(4, { terrain: "city", darkness: 0.5, night: 0.4, props: [P("altar", 0.5, 1, 0.4)], actors: [F(0.36, "man", "mourn", "brown")] }),
      kf(14, { terrain: "city", storm: 0.7, darkness: 0.6, night: 0.5, actors: [F(0.4, "man", "raise", "brown"), F(0.68, "warrior", "fight", "red", { facing: -1 })] }),
      kf(18, { terrain: "city", fire: 0.8, storm: 0.5, darkness: 0.5, props: [P("smoke", 0.5, 2)], actors: [F(0.42, "man", "mourn", "gray")] }),
    ],
    beats: [
      { upTo: 3, god: "Consumirei tudo de sobre a face da terra, diz o SENHOR.", reaction: "O anúncio do juízo sobre toda a criação. 🌑" },
      { upTo: 6, god: "Estenderei a mão sobre Judá e sobre os que adoram a Baal.", reaction: "Juízo contra a idolatria em Jerusalém. ⚖️" },
      { upTo: 13, reaction: "Aproxima-se o grande Dia do SENHOR, perto e apressado. ⛈️" },
      { upTo: 99, god: "Dia de ira é aquele dia, dia de angústia e de trevas.", reaction: "Nem prata nem ouro os poderá livrar. 🔥" },
    ],
  },
  2: {
    keyframes: [
      kf(1, { terrain: "plain", darkness: 0.3, night: 0.3, actors: [F(0.4, "man", "raise", "brown"), F(0.6, "elder", "kneel", "gray")] }),
      kf(3, { terrain: "hills", glory: 0.35, actors: [F(0.38, "man", "kneel", "white"), F(0.58, "woman", "bow", "blue")] }),
      kf(4, { terrain: "sea", storm: 0.6, darkness: 0.4, props: [P("tower", 0.7, 1.1)], actors: [F(0.4, "warrior", "fight", "red", { facing: 1 })] }),
      kf(13, { terrain: "city", fire: 0.7, darkness: 0.5, night: 0.4, props: [P("smoke", 0.5, 2), P("tower", 0.75, 0.9)], actors: [F(0.4, "man", "mourn", "gray")] }),
    ],
    beats: [
      { upTo: 2, reaction: "Recolhei-vos antes que passe o dia como a palha. 🍂" },
      { upTo: 3, god: "Buscai ao SENHOR, todos os humildes da terra; buscai a justiça.", reaction: "Talvez sejais escondidos no dia da ira. 🤍" },
      { upTo: 12, reaction: "Juízo sobre Gaza, Moabe, Amom e Etiópia. ⚔️" },
      { upTo: 99, god: "Estenderei a mão e destruirei a soberba Assíria.", reaction: "Nínive tornada em desolação. 🔥" },
    ],
  },
  3: {
    keyframes: [
      kf(1, { terrain: "city", darkness: 0.4, night: 0.35, actors: [F(0.4, "man", "mourn", "gray"), F(0.66, "king", "stand", "purple")] }),
      kf(8, { terrain: "city", fire: 0.6, storm: 0.4, darkness: 0.4, props: [P("smoke", 0.5, 1.8)], actors: [F(0.42, "man", "raise", "brown")] }),
      kf(9, { terrain: "hills", glory: 0.5, crowd: 0.5, actors: [F(0.35, "man", "kneel", "white"), F(0.58, "woman", "bow", "blue")] }),
      kf(14, { terrain: "city", glory: 0.8, crowd: 0.8, actors: [F(0.3, "woman", "raise", "purple"), F(0.5, "man", "raise", "white"), F(0.72, "child", "raise", "green")] }),
      kf(17, { terrain: "city", glory: 0.95, crowd: 0.7, actors: [F(0.42, "woman", "raise", "gold"), F(0.62, "child", "stand", "white")] }),
    ],
    beats: [
      { upTo: 7, reaction: "Ai da cidade rebelde e contaminada! Não ouviu a voz. 😔" },
      { upTo: 8, god: "Esperai-me até o dia em que me levantar para o despojo.", reaction: "Toda a terra será consumida pelo fogo do meu zelo. 🔥" },
      { upTo: 13, god: "Darei aos povos lábios puros, para que invoquem o meu nome.", reaction: "Restará um povo humilde que confia no SENHOR. 🕊️" },
      { upTo: 16, reaction: "Canta, ó filha de Sião! O SENHOR está no meio de ti. 🎶" },
      { upTo: 99, god: "O SENHOR se regozija sobre ti com júbilo; ele te aquietará no seu amor.", reaction: "Trocarei o vosso pranto em louvor. Eu vos farei voltar. ✨" },
    ],
  },
};
