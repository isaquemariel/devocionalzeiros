// Roteiros de cena (Living Scene v2) — EZEQUIEL, montado de dois blocos.
import type { ChapterScript } from "@/lib/rpgLivingV2";
import { EZEKIEL_1 } from "@/lib/rpgEzekielScenes1";
import { EZEKIEL_2 } from "@/lib/rpgEzekielScenes2";

export const EZEKIEL_SCENES: Record<number, ChapterScript> = { ...EZEKIEL_1, ...EZEKIEL_2 };
