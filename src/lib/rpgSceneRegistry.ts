// ============================================================================
// Registro central de cenas (Living Scene v2), livro por livro.
// Cada livro contribui com um mapa { capítulo -> ChapterScript }. O motor
// (RPGReadingScene / RPGSceneBackdrop) consulta aqui. Livros sem cena curada
// caem no cenário genérico por região (fallback do próprio RPGReadingScene).
//
// Para adicionar um livro: crie src/lib/rpg<Livro>Scenes.ts exportando o mapa
// e registre-o abaixo. Nada mais precisa mudar.
// ============================================================================

import type { ChapterScript } from "@/lib/rpgLivingV2";
import { GENESIS_SCENES } from "@/lib/rpgGenesisScenes";
import { EXODUS_SCENES } from "@/lib/rpgExodusScenes";

const SCENE_REGISTRY: Record<string, Record<number, ChapterScript>> = {
  genesis: GENESIS_SCENES,
  exodus: EXODUS_SCENES,
};

export function hasV2Scene(bookId: string, chapter: number): boolean {
  return !!SCENE_REGISTRY[bookId]?.[chapter];
}
export function getV2Script(bookId: string, chapter: number): ChapterScript | undefined {
  return SCENE_REGISTRY[bookId]?.[chapter];
}
