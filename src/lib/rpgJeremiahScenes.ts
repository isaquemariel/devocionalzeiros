// Roteiros de cena (Living Scene v2) — JEREMIAS, montado de dois blocos.
import type { ChapterScript } from "@/lib/rpgLivingV2";
import { JEREMIAH_1 } from "@/lib/rpgJeremiahScenes1";
import { JEREMIAH_2 } from "@/lib/rpgJeremiahScenes2";

export const JEREMIAH_SCENES: Record<number, ChapterScript> = { ...JEREMIAH_1, ...JEREMIAH_2 };
