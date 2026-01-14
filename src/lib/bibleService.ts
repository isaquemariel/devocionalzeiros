// Bible Service - Busca versículos da versão Almeida via CDN com cache local

const CDN_BASE = 'https://cdn.jsdelivr.net/gh/thiagobodruk/bible@master/json';
const CACHE_KEY = 'bible_almeida_cache';
const CACHE_VERSION = '1.0';

interface BibleBookData {
  abbrev: string;
  book: string;
  chapters: string[][];
}

interface CacheData {
  version: string;
  books: Record<string, BibleBookData>;
}

// Mapeamento de bookId para índice no CDN (0-65)
const BOOK_INDEX_MAP: Record<string, number> = {
  genesis: 0, exodus: 1, leviticus: 2, numbers: 3, deuteronomy: 4,
  joshua: 5, judges: 6, ruth: 7, '1samuel': 8, '2samuel': 9,
  '1kings': 10, '2kings': 11, '1chronicles': 12, '2chronicles': 13,
  ezra: 14, nehemiah: 15, esther: 16, job: 17, psalms: 18, proverbs: 19,
  ecclesiastes: 20, songofsolomon: 21, isaiah: 22, jeremiah: 23,
  lamentations: 24, ezekiel: 25, daniel: 26, hosea: 27, joel: 28,
  amos: 29, obadiah: 30, jonah: 31, micah: 32, nahum: 33, habakkuk: 34,
  zephaniah: 35, haggai: 36, zechariah: 37, malachi: 38,
  matthew: 39, mark: 40, luke: 41, john: 42, acts: 43, romans: 44,
  '1corinthians': 45, '2corinthians': 46, galatians: 47, ephesians: 48,
  philippians: 49, colossians: 50, '1thessalonians': 51, '2thessalonians': 52,
  '1timothy': 53, '2timothy': 54, titus: 55, philemon: 56, hebrews: 57,
  james: 58, '1peter': 59, '2peter': 60, '1john': 61, '2john': 62,
  '3john': 63, jude: 64, revelation: 65,
};

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

// Salvar no cache
function saveToCache(bookId: string, bookData: BibleBookData): void {
  try {
    let cache = getCache();
    if (!cache) {
      cache = { version: CACHE_VERSION, books: {} };
    }
    cache.books[bookId] = bookData;
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch (e) {
    console.warn('Erro ao salvar cache da Bíblia:', e);
  }
}

// Obter livro do cache
function getBookFromCache(bookId: string): BibleBookData | null {
  const cache = getCache();
  return cache?.books[bookId] || null;
}

// Buscar livro do CDN
async function fetchBookFromCDN(bookId: string): Promise<BibleBookData | null> {
  const index = BOOK_INDEX_MAP[bookId];
  if (index === undefined) {
    console.error(`Livro não encontrado: ${bookId}`);
    return null;
  }

  // O CDN tem arquivo aa.json com toda a Bíblia Almeida
  const url = `${CDN_BASE}/aa.json`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const allBooks: BibleBookData[] = await response.json();
    const bookData = allBooks[index];
    
    if (bookData) {
      // Salvar todos os livros no cache para uso offline
      allBooks.forEach((book, idx) => {
        const bookIdForIndex = Object.entries(BOOK_INDEX_MAP).find(([_, i]) => i === idx)?.[0];
        if (bookIdForIndex) {
          saveToCache(bookIdForIndex, book);
        }
      });
      
      return bookData;
    }
    return null;
  } catch (error) {
    console.error('Erro ao buscar do CDN:', error);
    return null;
  }
}

// Função principal: buscar capítulo
export async function fetchChapterVerses(
  bookId: string,
  chapter: number
): Promise<{ number: number; text: string }[]> {
  // Primeiro, tentar do cache
  let bookData = getBookFromCache(bookId);
  
  // Se não estiver no cache, buscar do CDN
  if (!bookData) {
    bookData = await fetchBookFromCDN(bookId);
  }
  
  if (!bookData || !bookData.chapters) {
    return [];
  }
  
  // Capítulos são indexados a partir de 0
  const chapterIndex = chapter - 1;
  const chapterVerses = bookData.chapters[chapterIndex];
  
  if (!chapterVerses) {
    return [];
  }
  
  // Converter para formato esperado
  return chapterVerses.map((text, index) => ({
    number: index + 1,
    text: text,
  }));
}

// Verificar se está offline
export function isOffline(): boolean {
  return !navigator.onLine;
}

// Obter nome do livro em português a partir do cache
export function getCachedBookName(bookId: string): string | null {
  const bookData = getBookFromCache(bookId);
  return bookData?.book || null;
}

// Limpar cache (útil para debug)
export function clearBibleCache(): void {
  localStorage.removeItem(CACHE_KEY);
}

// Verificar se todo o cache está carregado
export function isCacheComplete(): boolean {
  const cache = getCache();
  if (!cache) return false;
  return Object.keys(cache.books).length === 66;
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

// Buscar palavra em toda a Bíblia (usando cache)
export async function searchBible(query: string, maxResults = 50): Promise<SearchResult[]> {
  const cache = getCache();
  const results: SearchResult[] = [];
  
  if (!query || query.length < 3) return results;
  
  const searchTerm = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  
  // Se não tiver cache, tentar carregar do CDN primeiro
  if (!cache || Object.keys(cache.books).length === 0) {
    await fetchBookFromCDN('genesis'); // Isso carrega toda a Bíblia no cache
  }
  
  const updatedCache = getCache();
  if (!updatedCache) return results;
  
  // Buscar em todos os livros do cache
  for (const [bookId, bookData] of Object.entries(updatedCache.books)) {
    if (results.length >= maxResults) break;
    
    const bookName = bookData.book;
    
    for (let chapterIdx = 0; chapterIdx < bookData.chapters.length; chapterIdx++) {
      if (results.length >= maxResults) break;
      
      const chapter = bookData.chapters[chapterIdx];
      
      for (let verseIdx = 0; verseIdx < chapter.length; verseIdx++) {
        if (results.length >= maxResults) break;
        
        const verseText = chapter[verseIdx];
        const normalizedText = verseText.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        
        if (normalizedText.includes(searchTerm)) {
          // Criar highlight com contexto
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
  return Object.keys(BOOK_INDEX_MAP);
}

// Carregar toda a Bíblia no cache (para busca offline)
export async function preloadBibleCache(): Promise<boolean> {
  try {
    await fetchBookFromCDN('genesis');
    return isCacheComplete();
  } catch {
    return false;
  }
}
