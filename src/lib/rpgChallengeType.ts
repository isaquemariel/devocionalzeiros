import { hasOrderChallenge } from "@/components/rpg/RPGChallengeOrder";
import { hasWordSearch } from "@/components/rpg/RPGChallengeWordSearch";
import { hasCrossword } from "@/components/rpg/RPGChallengeCrossword";
import { hasComplete } from "@/components/rpg/RPGChallengeComplete";
import { hasConnect } from "@/components/rpg/RPGChallengeConnect";
import { hasMemory } from "@/components/rpg/RPGChallengeMemory";
import { hasBossBattle } from "@/components/rpg/RPGBossBattle";

// 6 tipos de jogo revezando por capítulo (índice = (cap-1) % 6). Se o conteúdo
// curado daquele capítulo/tipo ainda não existe, cai no quiz por IA (nunca quebra).
// Prioridades: último capítulo = batalha de chefe; capítulos com jogo da memória
// curado = memória (7º jogo, entra como destaque sem mexer no revezamento dos 6).
export type ChallengeType = "ordenar" | "cacapalavras" | "cruzada" | "completar" | "ligar" | "memoria" | "quiz" | "boss";
export const CHALLENGE_CYCLE: ChallengeType[] = ["ordenar", "cacapalavras", "cruzada", "completar", "ligar", "quiz"];
const HAS_CONTENT: Partial<Record<ChallengeType, (b: string, c: number) => boolean>> = {
  ordenar: hasOrderChallenge, cacapalavras: hasWordSearch, cruzada: hasCrossword, completar: hasComplete, ligar: hasConnect,
};

export function resolveChallenge(bookId: string, chapter: number, isLastChapter: boolean): ChallengeType {
  if (isLastChapter && hasBossBattle(bookId, chapter)) return "boss";
  if (hasMemory(bookId, chapter)) return "memoria";
  const want = CHALLENGE_CYCLE[(chapter - 1) % CHALLENGE_CYCLE.length];
  if (want === "quiz") return "quiz";
  return HAS_CONTENT[want]?.(bookId, chapter) ? want : "quiz";
}

/** Desafio próprio (não usa quiz por IA no servidor) → o limite é consumido na ENTRADA do estágio. */
export function isCustomChallenge(type: ChallengeType): boolean {
  return type !== "quiz";
}
