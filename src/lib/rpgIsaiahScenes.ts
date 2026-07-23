// Roteiros de cena (Living Scene v2) — ISAÍAS, montado de dois blocos.
import type { ChapterScript } from "@/lib/rpgLivingV2";
import { ISAIAH_1 } from "@/lib/rpgIsaiahScenes1";
import { ISAIAH_2 } from "@/lib/rpgIsaiahScenes2";

export const ISAIAH_SCENES: Record<number, ChapterScript> = { ...ISAIAH_1, ...ISAIAH_2 };
