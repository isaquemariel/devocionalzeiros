import { mergeBC, type BookChallenges } from "@/lib/rpgChallengeContent";
import { EZEKIEL_A } from "@/lib/challenges/ezekiel_a";
import { EZEKIEL_B } from "@/lib/challenges/ezekiel_b";
export const EZEKIEL_CH: BookChallenges = mergeBC(EZEKIEL_A, EZEKIEL_B);
