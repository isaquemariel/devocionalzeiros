import { mergeBC, type BookChallenges } from "@/lib/rpgChallengeContent";
import { JEREMIAH_A } from "@/lib/challenges/jeremiah_a";
import { JEREMIAH_B } from "@/lib/challenges/jeremiah_b";
export const JEREMIAH_CH: BookChallenges = mergeBC(JEREMIAH_A, JEREMIAH_B);
