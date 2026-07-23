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
import { LEVITICUS_SCENES } from "@/lib/rpgLeviticusScenes";
import { NUMBERS_SCENES } from "@/lib/rpgNumbersScenes";
import { DEUTERONOMY_SCENES } from "@/lib/rpgDeuteronomyScenes";
import { JOSHUA_SCENES } from "@/lib/rpgJoshuaScenes";
import { JUDGES_SCENES } from "@/lib/rpgJudgesScenes";
import { RUTH_SCENES } from "@/lib/rpgRuthScenes";
import { SAMUEL1_SCENES } from "@/lib/rpg1SamuelScenes";
import { SAMUEL2_SCENES } from "@/lib/rpg2SamuelScenes";
import { KINGS1_SCENES } from "@/lib/rpg1KingsScenes";
import { KINGS2_SCENES } from "@/lib/rpg2KingsScenes";
import { CHRON1_SCENES } from "@/lib/rpg1ChroniclesScenes";
import { CHRON2_SCENES } from "@/lib/rpg2ChroniclesScenes";
import { EZRA_SCENES } from "@/lib/rpgEzraScenes";
import { NEHEMIAH_SCENES } from "@/lib/rpgNehemiahScenes";
import { ESTHER_SCENES } from "@/lib/rpgEstherScenes";
import { JOB_SCENES } from "@/lib/rpgJobScenes";
import { PROVERBS_SCENES } from "@/lib/rpgProverbsScenes";
import { ECCLESIASTES_SCENES } from "@/lib/rpgEcclesiastesScenes";
import { SONG_SCENES } from "@/lib/rpgSongScenes";

const SCENE_REGISTRY: Record<string, Record<number, ChapterScript>> = {
  genesis: GENESIS_SCENES,
  exodus: EXODUS_SCENES,
  leviticus: LEVITICUS_SCENES,
  numbers: NUMBERS_SCENES,
  deuteronomy: DEUTERONOMY_SCENES,
  joshua: JOSHUA_SCENES,
  judges: JUDGES_SCENES,
  ruth: RUTH_SCENES,
  "1samuel": SAMUEL1_SCENES,
  "2samuel": SAMUEL2_SCENES,
  "1kings": KINGS1_SCENES,
  "2kings": KINGS2_SCENES,
  "1chronicles": CHRON1_SCENES,
  "2chronicles": CHRON2_SCENES,
  ezra: EZRA_SCENES,
  nehemiah: NEHEMIAH_SCENES,
  esther: ESTHER_SCENES,
  job: JOB_SCENES,
  proverbs: PROVERBS_SCENES,
  ecclesiastes: ECCLESIASTES_SCENES,
  songofsolomon: SONG_SCENES,
};

export function hasV2Scene(bookId: string, chapter: number): boolean {
  return !!SCENE_REGISTRY[bookId]?.[chapter];
}
export function getV2Script(bookId: string, chapter: number): ChapterScript | undefined {
  return SCENE_REGISTRY[bookId]?.[chapter];
}
