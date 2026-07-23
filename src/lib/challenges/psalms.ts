import { mergeBC, type BookChallenges } from "@/lib/rpgChallengeContent";
import { PSALMS_A } from "@/lib/challenges/psalms_a";
import { PSALMS_B } from "@/lib/challenges/psalms_b";
import { PSALMS_C } from "@/lib/challenges/psalms_c";
export const PSALMS_CH: BookChallenges = mergeBC(PSALMS_A, PSALMS_B, PSALMS_C);
