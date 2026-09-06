// O pacote de fichas de 2chronicles — capítulo, personagem e objeto-marco num módulo só,
// para que o registro o traga com UM import() quando o livro abrir. O nome do
// arquivo leva o prefixo `stageinfo-` porque é ele que nomeia o pedaço no
// build, e o service worker precisa reconhecê-lo para NÃO o pré-cachear.
import type { StageInfoPack } from "@/lib/rpgStageInfo";
import { CHAPTER_ACTORS } from "@/lib/stageInfo/2chronicles";
import { CHARS } from "@/lib/stageInfo/chars/2chronicles";
import { TAGS } from "@/lib/stageInfo/tags/2chronicles";

export const PACK: StageInfoPack = { chapterActors: CHAPTER_ACTORS, chars: CHARS, tags: TAGS };
