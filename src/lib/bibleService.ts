// Bible API Service using ABibliaDigital API
// API pública gratuita com Bíblia em português
// Documentação: https://www.abibliadigital.com.br/

const CACHE_KEY = 'bible_almeida_cache_v6';
const CACHE_VERSION = '6.0';

// API Base - ABibliaDigital (API pública e gratuita)
const API_BASE = 'https://www.abibliadigital.com.br/api';

// Map of book IDs to API abbreviations and Portuguese names
export const BOOK_ID_MAP: Record<string, { apiName: string; name: string; chapters: number }> = {
  genesis: { apiName: 'gn', name: 'Gênesis', chapters: 50 },
  exodus: { apiName: 'ex', name: 'Êxodo', chapters: 40 },
  leviticus: { apiName: 'lv', name: 'Levítico', chapters: 27 },
  numbers: { apiName: 'nm', name: 'Números', chapters: 36 },
  deuteronomy: { apiName: 'dt', name: 'Deuteronômio', chapters: 34 },
  joshua: { apiName: 'js', name: 'Josué', chapters: 24 },
  judges: { apiName: 'jz', name: 'Juízes', chapters: 21 },
  ruth: { apiName: 'rt', name: 'Rute', chapters: 4 },
  '1samuel': { apiName: '1sm', name: '1 Samuel', chapters: 31 },
  '2samuel': { apiName: '2sm', name: '2 Samuel', chapters: 24 },
  '1kings': { apiName: '1rs', name: '1 Reis', chapters: 22 },
  '2kings': { apiName: '2rs', name: '2 Reis', chapters: 25 },
  '1chronicles': { apiName: '1cr', name: '1 Crônicas', chapters: 29 },
  '2chronicles': { apiName: '2cr', name: '2 Crônicas', chapters: 36 },
  ezra: { apiName: 'ed', name: 'Esdras', chapters: 10 },
  nehemiah: { apiName: 'ne', name: 'Neemias', chapters: 13 },
  esther: { apiName: 'et', name: 'Ester', chapters: 10 },
  job: { apiName: 'jó', name: 'Jó', chapters: 42 },
  psalms: { apiName: 'sl', name: 'Salmos', chapters: 150 },
  proverbs: { apiName: 'pv', name: 'Provérbios', chapters: 31 },
  ecclesiastes: { apiName: 'ec', name: 'Eclesiastes', chapters: 12 },
  songofsolomon: { apiName: 'ct', name: 'Cânticos', chapters: 8 },
  isaiah: { apiName: 'is', name: 'Isaías', chapters: 66 },
  jeremiah: { apiName: 'jr', name: 'Jeremias', chapters: 52 },
  lamentations: { apiName: 'lm', name: 'Lamentações', chapters: 5 },
  ezekiel: { apiName: 'ez', name: 'Ezequiel', chapters: 48 },
  daniel: { apiName: 'dn', name: 'Daniel', chapters: 12 },
  hosea: { apiName: 'os', name: 'Oséias', chapters: 14 },
  joel: { apiName: 'jl', name: 'Joel', chapters: 3 },
  amos: { apiName: 'am', name: 'Amós', chapters: 9 },
  obadiah: { apiName: 'ob', name: 'Obadias', chapters: 1 },
  jonah: { apiName: 'jn', name: 'Jonas', chapters: 4 },
  micah: { apiName: 'mq', name: 'Miquéias', chapters: 7 },
  nahum: { apiName: 'na', name: 'Naum', chapters: 3 },
  habakkuk: { apiName: 'hc', name: 'Habacuque', chapters: 3 },
  zephaniah: { apiName: 'sf', name: 'Sofonias', chapters: 3 },
  haggai: { apiName: 'ag', name: 'Ageu', chapters: 2 },
  zechariah: { apiName: 'zc', name: 'Zacarias', chapters: 14 },
  malachi: { apiName: 'ml', name: 'Malaquias', chapters: 4 },
  matthew: { apiName: 'mt', name: 'Mateus', chapters: 28 },
  mark: { apiName: 'mc', name: 'Marcos', chapters: 16 },
  luke: { apiName: 'lc', name: 'Lucas', chapters: 24 },
  john: { apiName: 'jo', name: 'João', chapters: 21 },
  acts: { apiName: 'at', name: 'Atos', chapters: 28 },
  romans: { apiName: 'rm', name: 'Romanos', chapters: 16 },
  '1corinthians': { apiName: '1co', name: '1 Coríntios', chapters: 16 },
  '2corinthians': { apiName: '2co', name: '2 Coríntios', chapters: 13 },
  galatians: { apiName: 'gl', name: 'Gálatas', chapters: 6 },
  ephesians: { apiName: 'ef', name: 'Efésios', chapters: 6 },
  philippians: { apiName: 'fp', name: 'Filipenses', chapters: 4 },
  colossians: { apiName: 'cl', name: 'Colossenses', chapters: 4 },
  '1thessalonians': { apiName: '1ts', name: '1 Tessalonicenses', chapters: 5 },
  '2thessalonians': { apiName: '2ts', name: '2 Tessalonicenses', chapters: 3 },
  '1timothy': { apiName: '1tm', name: '1 Timóteo', chapters: 6 },
  '2timothy': { apiName: '2tm', name: '2 Timóteo', chapters: 4 },
  titus: { apiName: 'tt', name: 'Tito', chapters: 3 },
  philemon: { apiName: 'fm', name: 'Filemom', chapters: 1 },
  hebrews: { apiName: 'hb', name: 'Hebreus', chapters: 13 },
  james: { apiName: 'tg', name: 'Tiago', chapters: 5 },
  '1peter': { apiName: '1pe', name: '1 Pedro', chapters: 5 },
  '2peter': { apiName: '2pe', name: '2 Pedro', chapters: 3 },
  '1john': { apiName: '1jo', name: '1 João', chapters: 5 },
  '2john': { apiName: '2jo', name: '2 João', chapters: 1 },
  '3john': { apiName: '3jo', name: '3 João', chapters: 1 },
  jude: { apiName: 'jd', name: 'Judas', chapters: 1 },
  revelation: { apiName: 'ap', name: 'Apocalipse', chapters: 22 },
};

interface BibleBookData {
  abbrev: string;
  book: string;
  chapters: string[][];
}

interface CacheData {
  version: string;
  books: Record<string, BibleBookData>;
}

// Obter cache do localStorage
function getCache(): CacheData | null {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;
    
    const data: CacheData = JSON.parse(cached);
    if (data.version !== CACHE_VERSION) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

// Salvar capítulo no cache
function saveChapterToCache(bookId: string, chapter: number, verses: string[]): void {
  try {
    let cache = getCache();
    if (!cache) {
      cache = { version: CACHE_VERSION, books: {} };
    }
    
    if (!cache.books[bookId]) {
      const bookInfo = BOOK_ID_MAP[bookId];
      cache.books[bookId] = {
        abbrev: bookId,
        book: bookInfo?.name || bookId,
        chapters: [],
      };
    }
    
    // Garantir que o array tenha tamanho suficiente
    while (cache.books[bookId].chapters.length < chapter) {
      cache.books[bookId].chapters.push([]);
    }
    
    cache.books[bookId].chapters[chapter - 1] = verses;
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch (e) {
    console.warn('Erro ao salvar cache da Bíblia:', e);
  }
}

// Obter capítulo do cache
function getChapterFromCache(bookId: string, chapter: number): string[] | null {
  const cache = getCache();
  const bookData = cache?.books[bookId];
  if (!bookData || !bookData.chapters[chapter - 1]?.length) return null;
  return bookData.chapters[chapter - 1];
}

// Buscar capítulo da API ABibliaDigital
async function fetchChapterFromAPI(bookId: string, chapter: number): Promise<string[] | null> {
  const bookInfo = BOOK_ID_MAP[bookId];
  if (!bookInfo) {
    console.error(`Livro não encontrado: ${bookId}`);
    return null;
  }

  // ABibliaDigital API URL: /verses/{version}/{abbrev}/{chapter}
  // Usando versão "acf" (Almeida Corrigida Fiel)
  const url = `${API_BASE}/verses/acf/${bookInfo.apiName}/${chapter}`;
  
  try {
    console.log(`Buscando capítulo da API: ${url}`);
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const data = await response.json();
    
    // A API retorna: { book: {...}, chapter: {...}, verses: [{number, text}, ...] }
    if (data && data.verses && Array.isArray(data.verses)) {
      // Ordenar por número do versículo
      data.verses.sort((a: { number: number }, b: { number: number }) => a.number - b.number);
      const verses = data.verses.map((v: { text: string }) => v.text);
      
      // Salvar no cache para uso offline
      saveChapterToCache(bookId, chapter, verses);
      return verses;
    }
    
    return null;
  } catch (error) {
    console.error('Erro ao buscar da API:', error);
    return null;
  }
}

// Função principal: buscar capítulo
export async function fetchChapterVerses(
  bookId: string,
  chapter: number
): Promise<{ number: number; text: string }[]> {
  // Primeiro, tentar do cache
  let verses = getChapterFromCache(bookId, chapter);
  
  // Se não estiver no cache, buscar da API
  if (!verses || verses.length === 0) {
    verses = await fetchChapterFromAPI(bookId, chapter);
  }
  
  if (!verses || verses.length === 0) {
    return [];
  }
  
  // Converter para formato esperado
  return verses.map((text, index) => ({
    number: index + 1,
    text: text,
  }));
}

// Verificar se está offline
export function isOffline(): boolean {
  return !navigator.onLine;
}

// Obter nome do livro em português
export function getCachedBookName(bookId: string): string | null {
  return BOOK_ID_MAP[bookId]?.name || null;
}

// Limpar cache (útil para debug)
export function clearBibleCache(): void {
  localStorage.removeItem(CACHE_KEY);
}

// Verificar quantos capítulos estão em cache
export function getCacheStats(): { booksCount: number; chaptersCount: number } {
  const cache = getCache();
  if (!cache) return { booksCount: 0, chaptersCount: 0 };
  
  let chaptersCount = 0;
  for (const book of Object.values(cache.books)) {
    chaptersCount += book.chapters.filter(ch => ch && ch.length > 0).length;
  }
  
  return {
    booksCount: Object.keys(cache.books).length,
    chaptersCount,
  };
}

// Buscar versículo específico
export async function fetchSpecificVerse(
  bookId: string,
  chapter: number,
  verse: number
): Promise<{ number: number; text: string } | null> {
  const verses = await fetchChapterVerses(bookId, chapter);
  return verses.find(v => v.number === verse) || null;
}

// Interface para resultados de busca
export interface SearchResult {
  bookId: string;
  bookName: string;
  chapter: number;
  verse: number;
  text: string;
  highlight: string;
}

// Buscar palavra na Bíblia (usando cache local)
export async function searchBible(query: string, maxResults = 50): Promise<SearchResult[]> {
  const cache = getCache();
  const results: SearchResult[] = [];
  
  if (!query || query.length < 3) return results;
  
  const searchTerm = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  
  if (!cache || Object.keys(cache.books).length === 0) {
    console.log('Cache vazio. Leia alguns capítulos para habilitar a busca offline.');
    return results;
  }
  
  // Buscar em todos os livros do cache
  for (const [bookId, bookData] of Object.entries(cache.books)) {
    if (results.length >= maxResults) break;
    
    const bookName = bookData.book;
    
    for (let chapterIdx = 0; chapterIdx < bookData.chapters.length; chapterIdx++) {
      if (results.length >= maxResults) break;
      
      const chapter = bookData.chapters[chapterIdx];
      if (!chapter) continue;
      
      for (let verseIdx = 0; verseIdx < chapter.length; verseIdx++) {
        if (results.length >= maxResults) break;
        
        const verseText = chapter[verseIdx];
        if (!verseText) continue;
        
        const normalizedText = verseText.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        
        if (normalizedText.includes(searchTerm)) {
          const originalIndex = normalizedText.indexOf(searchTerm);
          const start = Math.max(0, originalIndex - 30);
          const end = Math.min(verseText.length, originalIndex + query.length + 30);
          let highlight = verseText.substring(start, end);
          if (start > 0) highlight = '...' + highlight;
          if (end < verseText.length) highlight = highlight + '...';
          
          results.push({
            bookId,
            bookName,
            chapter: chapterIdx + 1,
            verse: verseIdx + 1,
            text: verseText,
            highlight,
          });
        }
      }
    }
  }
  
  return results;
}

// Obter todos os bookIds
export function getAllBookIds(): string[] {
  return Object.keys(BOOK_ID_MAP);
}

// Precarregar um livro inteiro
export async function preloadBook(bookId: string, totalChapters: number): Promise<boolean> {
  try {
    for (let ch = 1; ch <= totalChapters; ch++) {
      const cached = getChapterFromCache(bookId, ch);
      if (!cached || cached.length === 0) {
        await fetchChapterFromAPI(bookId, ch);
        // Pequeno delay para não sobrecarregar a API
        await new Promise(resolve => setTimeout(resolve, 200));
      }
    }
    return true;
  } catch {
    return false;
  }
}

// Obter número de capítulos de um livro
export function getBookChapterCount(bookId: string): number {
  return BOOK_ID_MAP[bookId]?.chapters || 0;
}
