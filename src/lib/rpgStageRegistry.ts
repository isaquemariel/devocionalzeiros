// ============================================================================
// Registro do modo CENA VIVA — CARREGAMENTO POR LIVRO.
//
// O roteiro da cena viva são 500 capítulos: 11 MB de JS. Enquanto este arquivo
// importava os 21 livros estaticamente, abrir o modo RPG uma vez baixava tudo —
// inclusive os dezoito livros que o leitor não ia abrir. Agora:
//
//   • `hasStageScript` responde pelo `STAGE_INDEX` (2,5 KB, gerado por
//     scripts/gen-stage-index.mjs), então a decisão de mostrar o palco não
//     custa nada e continua SÍNCRONA;
//   • `loadStageScript` traz o livro por `import()` dinâmico, e o Rollup faz
//     um pedaço por livro. Quem lê Rute baixa Rute.
//
// O mapa completo continua em `rpgStageAll.ts`, para os validadores de
// `scripts/` — **o app não o importa**, e é isso que mantém o split.
// ============================================================================

import type { StageScript } from "@/lib/rpgStage";
import { STAGE_INDEX } from "@/lib/stageIndex";

export { STAGE_INDEX };

/** Há roteiro de cena viva para este capítulo? Síncrono e barato (só o índice). */
export function hasStageScript(bookId: string, chapter: number): boolean {
  return STAGE_INDEX[bookId]?.includes(chapter) ?? false;
}

/** Os livros com cena viva, na ordem em que entraram. */
export function stageBooks(): string[] {
  return Object.keys(STAGE_INDEX);
}

// Cada ramo é um `import()` com caminho literal — é assim que o Rollup
// consegue cortar um pedaço por livro. Nada de template string aqui.
const CARREGADORES: Record<string, () => Promise<Record<number, StageScript>>> = {
  genesis: () => import("@/lib/rpgGenesisStage").then((m) => m.GENESIS_STAGE),
  exodus: () => import("@/lib/rpgExodusStage").then((m) => m.EXODUS_STAGE),
  leviticus: () => import("@/lib/rpgLeviticusStage").then((m) => m.LEVITICUS_STAGE),
  numbers: () => import("@/lib/rpgNumbersStage").then((m) => m.NUMBERS_STAGE),
  deuteronomy: () => import("@/lib/rpgDeuteronomyStage").then((m) => m.DEUTERONOMY_STAGE),
  joshua: () => import("@/lib/rpgJoshuaStage").then((m) => m.JOSHUA_STAGE),
  judges: () => import("@/lib/rpgJudgesStage").then((m) => m.JUDGES_STAGE),
  ruth: () => import("@/lib/rpgRuthStage").then((m) => m.RUTH_STAGE),
  "1samuel": () => import("@/lib/rpg1SamuelStage").then((m) => m.FIRST_SAMUEL_STAGE),
  "2samuel": () => import("@/lib/rpg2SamuelStage").then((m) => m.SECOND_SAMUEL_STAGE),
  "1kings": () => import("@/lib/rpg1KingsStage").then((m) => m.FIRST_KINGS_STAGE),
  "2kings": () => import("@/lib/rpg2KingsStage").then((m) => m.SECOND_KINGS_STAGE),
  "1chronicles": () => import("@/lib/rpg1ChroniclesStage").then((m) => m.FIRST_CHRONICLES_STAGE),
  "2chronicles": () => import("@/lib/rpg2ChroniclesStage").then((m) => m.SECOND_CHRONICLES_STAGE),
  ezra: () => import("@/lib/rpgEzraStage").then((m) => m.EZRA_STAGE),
  nehemiah: () => import("@/lib/rpgNehemiahStage").then((m) => m.NEHEMIAH_STAGE),
  esther: () => import("@/lib/rpgEstherStage").then((m) => m.ESTHER_STAGE),
  job: () => import("@/lib/rpgJobStage").then((m) => m.JOB_STAGE),
  revelation: () => import("@/lib/rpgRevelationStage").then((m) => m.REVELATION_STAGE),
};

const cache = new Map<string, Promise<Record<number, StageScript>>>();

/** Carrega o roteiro do capítulo. O livro fica em cache depois da 1ª vez. */
export async function loadStageScript(bookId: string, chapter: number): Promise<StageScript | undefined> {
  if (!hasStageScript(bookId, chapter)) return undefined;
  let p = cache.get(bookId);
  if (!p) {
    const carregar = CARREGADORES[bookId];
    if (!carregar) return undefined;
    p = carregar();
    cache.set(bookId, p);
  }
  try {
    return (await p)[chapter];
  } catch {
    cache.delete(bookId);          // rede caiu no meio: deixa tentar de novo
    return undefined;
  }
}
