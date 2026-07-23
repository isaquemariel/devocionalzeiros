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
import { NUMBERS_CH } from "@/lib/challenges/numbers";
import { JOSHUA_CH } from "@/lib/challenges/joshua";
import { JUDGES_CH } from "@/lib/challenges/judges";
import { LEVITICUS_CH } from "@/lib/challenges/leviticus";
import { DEUTERONOMY_CH } from "@/lib/challenges/deuteronomy";
import { SAMUEL1_CH } from "@/lib/challenges/1samuel";
import { SAMUEL2_CH } from "@/lib/challenges/2samuel";
import { KINGS1_CH } from "@/lib/challenges/1kings";
import { KINGS2_CH } from "@/lib/challenges/2kings";
import { CHRON1_CH } from "@/lib/challenges/1chronicles";
import { CHRON2_CH } from "@/lib/challenges/2chronicles";
import { MATTHEW_CH } from "@/lib/challenges/matthew";
import { MARK_CH } from "@/lib/challenges/mark";
import { LUKE_CH } from "@/lib/challenges/luke";
import { JOHN_CH } from "@/lib/challenges/john";
import { ACTS_CH } from "@/lib/challenges/acts";
import { ROMANS_CH } from "@/lib/challenges/romans";
import { HEBREWS_CH } from "@/lib/challenges/hebrews";
import { REVELATION_CH } from "@/lib/challenges/revelation";
import { CORINTHIANS1_CH } from "@/lib/challenges/1corinthians";
import { CORINTHIANS2_CH } from "@/lib/challenges/2corinthians";
import { GALATIANS_CH } from "@/lib/challenges/galatians";
import { EPHESIANS_CH } from "@/lib/challenges/ephesians";
import { PHILIPPIANS_CH } from "@/lib/challenges/philippians";
import { COLOSSIANS_CH } from "@/lib/challenges/colossians";
import { THESS1_CH } from "@/lib/challenges/1thessalonians";
import { THESS2_CH } from "@/lib/challenges/2thessalonians";
import { TITUS_CH } from "@/lib/challenges/titus";
import { PHILEMON_CH } from "@/lib/challenges/philemon";
import { JAMES_CH } from "@/lib/challenges/james";
import { PETER1_CH } from "@/lib/challenges/1peter";
import { PETER2_CH } from "@/lib/challenges/2peter";
import { JOHN1_CH } from "@/lib/challenges/1john";
import { JOHN2_CH } from "@/lib/challenges/2john";
import { JOHN3_CH } from "@/lib/challenges/3john";
import { JUDE_CH } from "@/lib/challenges/jude";
import { EZRA_CH } from "@/lib/challenges/ezra";
import { NEHEMIAH_CH } from "@/lib/challenges/nehemiah";
import { ESTHER_CH } from "@/lib/challenges/esther";
import { JOB_CH } from "@/lib/challenges/job";
import { PROVERBS_CH } from "@/lib/challenges/proverbs";
import { ECCLESIASTES_CH } from "@/lib/challenges/ecclesiastes";
import { SONG_CH } from "@/lib/challenges/songofsolomon";
import { DANIEL_CH } from "@/lib/challenges/daniel";
import { HOSEA_CH } from "@/lib/challenges/hosea";
import { JOEL_CH } from "@/lib/challenges/joel";
import { AMOS_CH } from "@/lib/challenges/amos";
import { OBADIAH_CH } from "@/lib/challenges/obadiah";
import { JONAH_CH } from "@/lib/challenges/jonah";
import { MICAH_CH } from "@/lib/challenges/micah";
import { NAHUM_CH } from "@/lib/challenges/nahum";
import { HABAKKUK_CH } from "@/lib/challenges/habakkuk";
import { ZEPHANIAH_CH } from "@/lib/challenges/zephaniah";
import { HAGGAI_CH } from "@/lib/challenges/haggai";
import { ZECHARIAH_CH } from "@/lib/challenges/zechariah";
import { MALACHI_CH } from "@/lib/challenges/malachi";

const REGISTRY: Record<string, BookChallenges> = {
  ruth: RUTH_CH,
  numbers: NUMBERS_CH,
  joshua: JOSHUA_CH,
  judges: JUDGES_CH,
  leviticus: LEVITICUS_CH,
  deuteronomy: DEUTERONOMY_CH,
  "1samuel": SAMUEL1_CH,
  "2samuel": SAMUEL2_CH,
  "1kings": KINGS1_CH,
  "2kings": KINGS2_CH,
  "1chronicles": CHRON1_CH,
  "2chronicles": CHRON2_CH,
  matthew: MATTHEW_CH,
  mark: MARK_CH,
  luke: LUKE_CH,
  john: JOHN_CH,
  acts: ACTS_CH,
  romans: ROMANS_CH,
  hebrews: HEBREWS_CH,
  revelation: REVELATION_CH,
  "1corinthians": CORINTHIANS1_CH,
  "2corinthians": CORINTHIANS2_CH,
  galatians: GALATIANS_CH,
  ephesians: EPHESIANS_CH,
  philippians: PHILIPPIANS_CH,
  colossians: COLOSSIANS_CH,
  "1thessalonians": THESS1_CH,
  "2thessalonians": THESS2_CH,
  titus: TITUS_CH,
  philemon: PHILEMON_CH,
  james: JAMES_CH,
  "1peter": PETER1_CH,
  "2peter": PETER2_CH,
  "1john": JOHN1_CH,
  "2john": JOHN2_CH,
  "3john": JOHN3_CH,
  jude: JUDE_CH,
  ezra: EZRA_CH,
  nehemiah: NEHEMIAH_CH,
  esther: ESTHER_CH,
  job: JOB_CH,
  proverbs: PROVERBS_CH,
  ecclesiastes: ECCLESIASTES_CH,
  songofsolomon: SONG_CH,
  daniel: DANIEL_CH,
  hosea: HOSEA_CH,
  joel: JOEL_CH,
  amos: AMOS_CH,
  obadiah: OBADIAH_CH,
  jonah: JONAH_CH,
  micah: MICAH_CH,
  nahum: NAHUM_CH,
  habakkuk: HABAKKUK_CH,
  zephaniah: ZEPHANIAH_CH,
  haggai: HAGGAI_CH,
  zechariah: ZECHARIAH_CH,
  malachi: MALACHI_CH,
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
