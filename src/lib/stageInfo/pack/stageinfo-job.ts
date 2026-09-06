// O pacote de fichas de job — capítulo, personagem e objeto-marco num módulo só,
// para que o registro o traga com UM import() quando o livro abrir. O nome do
// arquivo leva o prefixo `stageinfo-` porque é ele que nomeia o pedaço no
// build, e o service worker precisa reconhecê-lo para NÃO o pré-cachear.
import type { StageInfoPack } from "@/lib/rpgStageInfo";
import { CHAPTER_ACTORS } from "@/lib/stageInfo/job";
import { CHARS } from "@/lib/stageInfo/chars/job";
import { TAGS } from "@/lib/stageInfo/tags/job";

export const PACK: StageInfoPack = { chapterActors: CHAPTER_ACTORS, chars: CHARS, tags: TAGS };
