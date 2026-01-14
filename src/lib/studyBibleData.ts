// Bible Study Data - Versões e estrutura para a Bíblia de Estudo

export type BibleVersion = 'nvi' | 'naa' | 'ntlh' | 'acf' | 'ara';

export const BIBLE_VERSIONS: Record<BibleVersion, { name: string; fullName: string }> = {
  nvi: { name: 'NVI', fullName: 'Nova Versão Internacional' },
  naa: { name: 'NAA', fullName: 'Nova Almeida Atualizada' },
  ntlh: { name: 'NTLH', fullName: 'Nova Tradução na Linguagem de Hoje' },
  acf: { name: 'ACF', fullName: 'Almeida Corrigida Fiel' },
  ara: { name: 'ARA', fullName: 'Almeida Revista e Atualizada' },
};

export interface BibleBook {
  id: string;
  name: string;
  shortName: string;
  chapters: number;
  testament: 'old' | 'new';
}

export const STUDY_BIBLE_BOOKS: BibleBook[] = [
  // Antigo Testamento
  { id: 'genesis', name: 'Gênesis', shortName: 'Gn', chapters: 50, testament: 'old' },
  { id: 'exodus', name: 'Êxodo', shortName: 'Êx', chapters: 40, testament: 'old' },
  { id: 'leviticus', name: 'Levítico', shortName: 'Lv', chapters: 27, testament: 'old' },
  { id: 'numbers', name: 'Números', shortName: 'Nm', chapters: 36, testament: 'old' },
  { id: 'deuteronomy', name: 'Deuteronômio', shortName: 'Dt', chapters: 34, testament: 'old' },
  { id: 'joshua', name: 'Josué', shortName: 'Js', chapters: 24, testament: 'old' },
  { id: 'judges', name: 'Juízes', shortName: 'Jz', chapters: 21, testament: 'old' },
  { id: 'ruth', name: 'Rute', shortName: 'Rt', chapters: 4, testament: 'old' },
  { id: '1samuel', name: '1 Samuel', shortName: '1Sm', chapters: 31, testament: 'old' },
  { id: '2samuel', name: '2 Samuel', shortName: '2Sm', chapters: 24, testament: 'old' },
  { id: '1kings', name: '1 Reis', shortName: '1Rs', chapters: 22, testament: 'old' },
  { id: '2kings', name: '2 Reis', shortName: '2Rs', chapters: 25, testament: 'old' },
  { id: '1chronicles', name: '1 Crônicas', shortName: '1Cr', chapters: 29, testament: 'old' },
  { id: '2chronicles', name: '2 Crônicas', shortName: '2Cr', chapters: 36, testament: 'old' },
  { id: 'ezra', name: 'Esdras', shortName: 'Ed', chapters: 10, testament: 'old' },
  { id: 'nehemiah', name: 'Neemias', shortName: 'Ne', chapters: 13, testament: 'old' },
  { id: 'esther', name: 'Ester', shortName: 'Et', chapters: 10, testament: 'old' },
  { id: 'job', name: 'Jó', shortName: 'Jó', chapters: 42, testament: 'old' },
  { id: 'psalms', name: 'Salmos', shortName: 'Sl', chapters: 150, testament: 'old' },
  { id: 'proverbs', name: 'Provérbios', shortName: 'Pv', chapters: 31, testament: 'old' },
  { id: 'ecclesiastes', name: 'Eclesiastes', shortName: 'Ec', chapters: 12, testament: 'old' },
  { id: 'songofsolomon', name: 'Cantares', shortName: 'Ct', chapters: 8, testament: 'old' },
  { id: 'isaiah', name: 'Isaías', shortName: 'Is', chapters: 66, testament: 'old' },
  { id: 'jeremiah', name: 'Jeremias', shortName: 'Jr', chapters: 52, testament: 'old' },
  { id: 'lamentations', name: 'Lamentações', shortName: 'Lm', chapters: 5, testament: 'old' },
  { id: 'ezekiel', name: 'Ezequiel', shortName: 'Ez', chapters: 48, testament: 'old' },
  { id: 'daniel', name: 'Daniel', shortName: 'Dn', chapters: 12, testament: 'old' },
  { id: 'hosea', name: 'Oséias', shortName: 'Os', chapters: 14, testament: 'old' },
  { id: 'joel', name: 'Joel', shortName: 'Jl', chapters: 3, testament: 'old' },
  { id: 'amos', name: 'Amós', shortName: 'Am', chapters: 9, testament: 'old' },
  { id: 'obadiah', name: 'Obadias', shortName: 'Ob', chapters: 1, testament: 'old' },
  { id: 'jonah', name: 'Jonas', shortName: 'Jn', chapters: 4, testament: 'old' },
  { id: 'micah', name: 'Miquéias', shortName: 'Mq', chapters: 7, testament: 'old' },
  { id: 'nahum', name: 'Naum', shortName: 'Na', chapters: 3, testament: 'old' },
  { id: 'habakkuk', name: 'Habacuque', shortName: 'Hc', chapters: 3, testament: 'old' },
  { id: 'zephaniah', name: 'Sofonias', shortName: 'Sf', chapters: 3, testament: 'old' },
  { id: 'haggai', name: 'Ageu', shortName: 'Ag', chapters: 2, testament: 'old' },
  { id: 'zechariah', name: 'Zacarias', shortName: 'Zc', chapters: 14, testament: 'old' },
  { id: 'malachi', name: 'Malaquias', shortName: 'Ml', chapters: 4, testament: 'old' },
  // Novo Testamento
  { id: 'matthew', name: 'Mateus', shortName: 'Mt', chapters: 28, testament: 'new' },
  { id: 'mark', name: 'Marcos', shortName: 'Mc', chapters: 16, testament: 'new' },
  { id: 'luke', name: 'Lucas', shortName: 'Lc', chapters: 24, testament: 'new' },
  { id: 'john', name: 'João', shortName: 'Jo', chapters: 21, testament: 'new' },
  { id: 'acts', name: 'Atos', shortName: 'At', chapters: 28, testament: 'new' },
  { id: 'romans', name: 'Romanos', shortName: 'Rm', chapters: 16, testament: 'new' },
  { id: '1corinthians', name: '1 Coríntios', shortName: '1Co', chapters: 16, testament: 'new' },
  { id: '2corinthians', name: '2 Coríntios', shortName: '2Co', chapters: 13, testament: 'new' },
  { id: 'galatians', name: 'Gálatas', shortName: 'Gl', chapters: 6, testament: 'new' },
  { id: 'ephesians', name: 'Efésios', shortName: 'Ef', chapters: 6, testament: 'new' },
  { id: 'philippians', name: 'Filipenses', shortName: 'Fp', chapters: 4, testament: 'new' },
  { id: 'colossians', name: 'Colossenses', shortName: 'Cl', chapters: 4, testament: 'new' },
  { id: '1thessalonians', name: '1 Tessalonicenses', shortName: '1Ts', chapters: 5, testament: 'new' },
  { id: '2thessalonians', name: '2 Tessalonicenses', shortName: '2Ts', chapters: 3, testament: 'new' },
  { id: '1timothy', name: '1 Timóteo', shortName: '1Tm', chapters: 6, testament: 'new' },
  { id: '2timothy', name: '2 Timóteo', shortName: '2Tm', chapters: 4, testament: 'new' },
  { id: 'titus', name: 'Tito', shortName: 'Tt', chapters: 3, testament: 'new' },
  { id: 'philemon', name: 'Filemom', shortName: 'Fm', chapters: 1, testament: 'new' },
  { id: 'hebrews', name: 'Hebreus', shortName: 'Hb', chapters: 13, testament: 'new' },
  { id: 'james', name: 'Tiago', shortName: 'Tg', chapters: 5, testament: 'new' },
  { id: '1peter', name: '1 Pedro', shortName: '1Pe', chapters: 5, testament: 'new' },
  { id: '2peter', name: '2 Pedro', shortName: '2Pe', chapters: 3, testament: 'new' },
  { id: '1john', name: '1 João', shortName: '1Jo', chapters: 5, testament: 'new' },
  { id: '2john', name: '2 João', shortName: '2Jo', chapters: 1, testament: 'new' },
  { id: '3john', name: '3 João', shortName: '3Jo', chapters: 1, testament: 'new' },
  { id: 'jude', name: 'Judas', shortName: 'Jd', chapters: 1, testament: 'new' },
  { id: 'revelation', name: 'Apocalipse', shortName: 'Ap', chapters: 22, testament: 'new' },
];

export interface Verse {
  number: number;
  text: string;
  highlightWords?: HighlightWord[];
}

export interface HighlightWord {
  word: string;
  original: string;
  language: 'hebrew' | 'greek';
  transliteration: string;
  meaning: string;
}

export interface VerseStudy {
  verseNumber: number;
  commentary: string;
  keyWords?: HighlightWord[];
  crossReferences?: string[];
  source?: string;
}

export interface ChapterContent {
  bookId: string;
  chapter: number;
  verses: Verse[];
}

// API para buscar o texto bíblico (A Bíblia Digital)
export const BIBLE_API_BASE = 'https://www.abibliadigital.com.br/api';

// Mapeamento de versões para API
export const VERSION_API_MAP: Record<BibleVersion, string> = {
  nvi: 'nvi',
  naa: 'naa',
  ntlh: 'ntlh',
  acf: 'acf',
  ara: 'ra',
};

// Função para obter o nome do livro em inglês para a API
export function getBookApiName(bookId: string): string {
  const bookMap: Record<string, string> = {
    'genesis': 'Genesis',
    'exodus': 'Exodus',
    'leviticus': 'Leviticus',
    'numbers': 'Numbers',
    'deuteronomy': 'Deuteronomy',
    'joshua': 'Joshua',
    'judges': 'Judges',
    'ruth': 'Ruth',
    '1samuel': '1 Samuel',
    '2samuel': '2 Samuel',
    '1kings': '1 Kings',
    '2kings': '2 Kings',
    '1chronicles': '1 Chronicles',
    '2chronicles': '2 Chronicles',
    'ezra': 'Ezra',
    'nehemiah': 'Nehemiah',
    'esther': 'Esther',
    'job': 'Job',
    'psalms': 'Psalms',
    'proverbs': 'Proverbs',
    'ecclesiastes': 'Ecclesiastes',
    'songofsolomon': 'Song of Solomon',
    'isaiah': 'Isaiah',
    'jeremiah': 'Jeremiah',
    'lamentations': 'Lamentations',
    'ezekiel': 'Ezekiel',
    'daniel': 'Daniel',
    'hosea': 'Hosea',
    'joel': 'Joel',
    'amos': 'Amos',
    'obadiah': 'Obadiah',
    'jonah': 'Jonah',
    'micah': 'Micah',
    'nahum': 'Nahum',
    'habakkuk': 'Habakkuk',
    'zephaniah': 'Zephaniah',
    'haggai': 'Haggai',
    'zechariah': 'Zechariah',
    'malachi': 'Malachi',
    'matthew': 'Matthew',
    'mark': 'Mark',
    'luke': 'Luke',
    'john': 'John',
    'acts': 'Acts',
    'romans': 'Romans',
    '1corinthians': '1 Corinthians',
    '2corinthians': '2 Corinthians',
    'galatians': 'Galatians',
    'ephesians': 'Ephesians',
    'philippians': 'Philippians',
    'colossians': 'Colossians',
    '1thessalonians': '1 Thessalonians',
    '2thessalonians': '2 Thessalonians',
    '1timothy': '1 Timothy',
    '2timothy': '2 Timothy',
    'titus': 'Titus',
    'philemon': 'Philemon',
    'hebrews': 'Hebrews',
    'james': 'James',
    '1peter': '1 Peter',
    '2peter': '2 Peter',
    '1john': '1 John',
    '2john': '2 John',
    '3john': '3 John',
    'jude': 'Jude',
    'revelation': 'Revelation',
  };
  return bookMap[bookId] || bookId;
}

export function getBookById(bookId: string): BibleBook | undefined {
  return STUDY_BIBLE_BOOKS.find(book => book.id === bookId);
}

export function getOldTestamentBooks(): BibleBook[] {
  return STUDY_BIBLE_BOOKS.filter(book => book.testament === 'old');
}

export function getNewTestamentBooks(): BibleBook[] {
  return STUDY_BIBLE_BOOKS.filter(book => book.testament === 'new');
}
