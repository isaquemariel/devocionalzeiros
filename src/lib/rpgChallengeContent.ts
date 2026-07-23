// ============================================================================
// Registro de CONTEÚDO DE DESAFIOS por livro (jogos + boss), capítulo a capítulo.
// Cada livro contribui com um objeto BookChallenges (em src/lib/challenges/<id>.ts)
// e aqui viram mapas achatados por "book:chapter" que os componentes de desafio
// mesclam com o conteúdo embutido (Gênesis/Êxodo). Assim os 6 jogos revezam e o
// boss dispara no último capítulo de TODOS os livros.
// ============================================================================

// ---- formatos (iguais aos dos componentes) ----
export interface OrderCfg { title: string; sub: string; verse: number; items: { d: number; em: string; l: string }[]; win?: string }
export interface WSCfg { title: string; sub: string; words: string[] }
export interface CrossCfg { title: string; grid: string[]; across: string[]; down: string[] }
export interface CompleteCfg { ref: string; before: string; answer: string; after: string; options: string[] }
export interface ConnectCfg { title: string; sub: string; pairs: { a: string; b: string }[] }
export interface MemoryCfg { title: string; sub: string; pairs: { em: string; l: string }[] }
export interface BossQ { question: string; options: string[]; correct: string }
export interface BossTurn { ask: string; hit: string; miss: string }
export interface BossStory { open: string; turns: BossTurn[]; win: string; winHero: string }
export interface BookChallenges {
  order?: Record<number, OrderCfg>;
  wordsearch?: Record<number, WSCfg>;
  crossword?: Record<number, CrossCfg>;
  complete?: Record<number, CompleteCfg>;
  connect?: Record<number, ConnectCfg>;
  memory?: Record<number, MemoryCfg>;
  boss?: { questions: BossQ[]; story?: BossStory };
}

// ---- livros com conteúdo curado (além de Gênesis/Êxodo, que ficam nos componentes) ----
import { RUTH_CH } from "@/lib/challenges/ruth";

const REGISTRY: Record<string, BookChallenges> = {
  ruth: RUTH_CH,
};

// ---- achata para mapas "book:chapter" que os componentes mesclam ----
function flatten<T>(pick: (bc: BookChallenges) => Record<number, T> | undefined): Record<string, T> {
  const out: Record<string, T> = {};
  for (const [book, bc] of Object.entries(REGISTRY)) {
    const m = pick(bc);
    if (!m) continue;
    for (const [ch, cfg] of Object.entries(m)) out[`${book}:${ch}`] = cfg;
  }
  return out;
}

export const EXT_ORDER = flatten((b) => b.order);
export const EXT_WORDS = flatten((b) => b.wordsearch);
export const EXT_CROSS = flatten((b) => b.crossword);
export const EXT_COMPLETE = flatten((b) => b.complete);
export const EXT_CONNECT = flatten((b) => b.connect);
export const EXT_MEMORY = flatten((b) => b.memory);

// boss por livro (id do livro -> perguntas + roteiro)
export const EXT_BOSS_QUESTIONS: Record<string, BossQ[]> = Object.fromEntries(
  Object.entries(REGISTRY).filter(([, b]) => b.boss?.questions?.length).map(([book, b]) => [book, b.boss!.questions]),
);
export const EXT_BOSS_STORY: Record<string, BossStory> = Object.fromEntries(
  Object.entries(REGISTRY).filter(([, b]) => b.boss?.story).map(([book, b]) => [book, b.boss!.story!]),
);
