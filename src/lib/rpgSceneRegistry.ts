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
import { PSALMS_SCENES } from "@/lib/rpgPsalmsScenes";
import { LAMENTATIONS_SCENES } from "@/lib/rpgLamentationsScenes";
import { DANIEL_SCENES } from "@/lib/rpgDanielScenes";
import { ISAIAH_SCENES } from "@/lib/rpgIsaiahScenes";
import { JEREMIAH_SCENES } from "@/lib/rpgJeremiahScenes";
import { EZEKIEL_SCENES } from "@/lib/rpgEzekielScenes";
import { HOSEA_SCENES } from "@/lib/rpgHoseaScenes";
import { JOEL_SCENES } from "@/lib/rpgJoelScenes";
import { AMOS_SCENES } from "@/lib/rpgAmosScenes";
import { OBADIAH_SCENES } from "@/lib/rpgObadiahScenes";
import { JONAH_SCENES } from "@/lib/rpgJonahScenes";
import { MICAH_SCENES } from "@/lib/rpgMicahScenes";
import { NAHUM_SCENES } from "@/lib/rpgNahumScenes";
import { HABAKKUK_SCENES } from "@/lib/rpgHabakkukScenes";
import { ZEPHANIAH_SCENES } from "@/lib/rpgZephaniahScenes";
import { HAGGAI_SCENES } from "@/lib/rpgHaggaiScenes";
import { ZECHARIAH_SCENES } from "@/lib/rpgZechariahScenes";
import { MALACHI_SCENES } from "@/lib/rpgMalachiScenes";
import { MATTHEW_SCENES } from "@/lib/rpgMatthewScenes";
import { MARK_SCENES } from "@/lib/rpgMarkScenes";
import { LUKE_SCENES } from "@/lib/rpgLukeScenes";
import { JOHN_SCENES } from "@/lib/rpgJohnScenes";
import { ACTS_SCENES } from "@/lib/rpgActsScenes";
import { ROMANS_SCENES } from "@/lib/rpgRomansScenes";
import { CORINTHIANS1_SCENES } from "@/lib/rpg1CorinthiansScenes";
import { CORINTHIANS2_SCENES } from "@/lib/rpg2CorinthiansScenes";
import { GALATIANS_SCENES } from "@/lib/rpgGalatiansScenes";
import { EPHESIANS_SCENES } from "@/lib/rpgEphesiansScenes";
import { PHILIPPIANS_SCENES } from "@/lib/rpgPhilippiansScenes";
import { COLOSSIANS_SCENES } from "@/lib/rpgColossiansScenes";
import { THESS1_SCENES } from "@/lib/rpg1ThessaloniansScenes";
import { THESS2_SCENES } from "@/lib/rpg2ThessaloniansScenes";
import { TIMOTHY1_SCENES } from "@/lib/rpg1TimothyScenes";
import { TIMOTHY2_SCENES } from "@/lib/rpg2TimothyScenes";

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
  psalms: PSALMS_SCENES,
  proverbs: PROVERBS_SCENES,
  ecclesiastes: ECCLESIASTES_SCENES,
  songofsolomon: SONG_SCENES,
  isaiah: ISAIAH_SCENES,
  jeremiah: JEREMIAH_SCENES,
  lamentations: LAMENTATIONS_SCENES,
  ezekiel: EZEKIEL_SCENES,
  daniel: DANIEL_SCENES,
  hosea: HOSEA_SCENES,
  joel: JOEL_SCENES,
  amos: AMOS_SCENES,
  obadiah: OBADIAH_SCENES,
  jonah: JONAH_SCENES,
  micah: MICAH_SCENES,
  nahum: NAHUM_SCENES,
  habakkuk: HABAKKUK_SCENES,
  zephaniah: ZEPHANIAH_SCENES,
  haggai: HAGGAI_SCENES,
  zechariah: ZECHARIAH_SCENES,
  malachi: MALACHI_SCENES,
  matthew: MATTHEW_SCENES,
  mark: MARK_SCENES,
  luke: LUKE_SCENES,
  john: JOHN_SCENES,
  acts: ACTS_SCENES,
  romans: ROMANS_SCENES,
  "1corinthians": CORINTHIANS1_SCENES,
  "2corinthians": CORINTHIANS2_SCENES,
  galatians: GALATIANS_SCENES,
  ephesians: EPHESIANS_SCENES,
  philippians: PHILIPPIANS_SCENES,
  colossians: COLOSSIANS_SCENES,
  "1thessalonians": THESS1_SCENES,
  "2thessalonians": THESS2_SCENES,
  "1timothy": TIMOTHY1_SCENES,
  "2timothy": TIMOTHY2_SCENES,
};

export function hasV2Scene(bookId: string, chapter: number): boolean {
  return !!SCENE_REGISTRY[bookId]?.[chapter];
}
export function getV2Script(bookId: string, chapter: number): ChapterScript | undefined {
  return SCENE_REGISTRY[bookId]?.[chapter];
}
