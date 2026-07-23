// Roteiros de cena (Living Scene v2) — SALMOS. Os 150 salmos, montados a partir
// de três blocos (1-50, 51-100, 101-150) gerados separadamente.
import type { ChapterScript } from "@/lib/rpgLivingV2";
import { PSALMS_1 } from "@/lib/rpgPsalmsScenes1";
import { PSALMS_2 } from "@/lib/rpgPsalmsScenes2";
import { PSALMS_3 } from "@/lib/rpgPsalmsScenes3";

export const PSALMS_SCENES: Record<number, ChapterScript> = {
  ...PSALMS_1,
  ...PSALMS_2,
  ...PSALMS_3,
};
