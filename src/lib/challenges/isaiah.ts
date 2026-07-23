import { mergeBC, type BookChallenges } from "@/lib/rpgChallengeContent";
import { ISAIAH_A } from "@/lib/challenges/isaiah_a";
import { ISAIAH_B } from "@/lib/challenges/isaiah_b";
export const ISAIAH_CH: BookChallenges = mergeBC(ISAIAH_A, ISAIAH_B);
