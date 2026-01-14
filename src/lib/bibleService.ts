// Bible API Service using wldeh/bible-api via jsDelivr CDN
// Using Almeida Revista e Corrigida (pt-arc) version
// CDN source: https://cdn.jsdelivr.net/gh/wldeh/bible-api/bibles/pt-arc/

const CACHE_KEY = 'bible_almeida_cache_v4';
const CACHE_VERSION = '4.0';

// API base URL - jsDelivr CDN (highly reliable and fast)
const API_BASE = 'https://cdn.jsdelivr.net/gh/wldeh/bible-api/bibles/pt-arc/books';

// Map of book IDs to API folder names and Portuguese names
export const BOOK_ID_MAP: Record<string, { apiName: string; name: string }> = {
  genesis: { apiName: 'genesis', name: 'Gênesis' },
  exodus: { apiName: 'exodus', name: 'Êxodo' },
  leviticus: { apiName: 'leviticus', name: 'Levítico' },
  numbers: { apiName: 'numbers', name: 'Números' },
  deuteronomy: { apiName: 'deuteronomy', name: 'Deuteronômio' },
  joshua: { apiName: 'joshua', name: 'Josué' },
  judges: { apiName: 'judges', name: 'Juízes' },
  ruth: { apiName: 'ruth', name: 'Rute' },
  '1samuel': { apiName: '1-samuel', name: '1 Samuel' },
  '2samuel': { apiName: '2-samuel', name: '2 Samuel' },
  '1kings': { apiName: '1-kings', name: '1 Reis' },
  '2kings': { apiName: '2-kings', name: '2 Reis' },
  '1chronicles': { apiName: '1-chronicles', name: '1 Crônicas' },
  '2chronicles': { apiName: '2-chronicles', name: '2 Crônicas' },
  ezra: { apiName: 'ezra', name: 'Esdras' },
  nehemiah: { apiName: 'nehemiah', name: 'Neemias' },
  esther: { apiName: 'esther', name: 'Ester' },
  job: { apiName: 'job', name: 'Jó' },
  psalms: { apiName: 'psalms', name: 'Salmos' },
  proverbs: { apiName: 'proverbs', name: 'Provérbios' },
  ecclesiastes: { apiName: 'ecclesiastes', name: 'Eclesiastes' },
  songofsolomon: { apiName: 'song-of-solomon', name: 'Cânticos' },
  isaiah: { apiName: 'isaiah', name: 'Isaías' },
  jeremiah: { apiName: 'jeremiah', name: 'Jeremias' },
  lamentations: { apiName: 'lamentations', name: 'Lamentações' },
  ezekiel: { apiName: 'ezekiel', name: 'Ezequiel' },
  daniel: { apiName: 'daniel', name: 'Daniel' },
  hosea: { apiName: 'hosea', name: 'Oséias' },
  joel: { apiName: 'joel', name: 'Joel' },
  amos: { apiName: 'amos', name: 'Amós' },
  obadiah: { apiName: 'obadiah', name: 'Obadias' },
  jonah: { apiName: 'jonah', name: 'Jonas' },
  micah: { apiName: 'micah', name: 'Miquéias' },
  nahum: { apiName: 'nahum', name: 'Naum' },
  habakkuk: { apiName: 'habakkuk', name: 'Habacuque' },
  zephaniah: { apiName: 'zephaniah', name: 'Sofonias' },
  haggai: { apiName: 'haggai', name: 'Ageu' },
  zechariah: { apiName: 'zechariah', name: 'Zacarias' },
  malachi: { apiName: 'malachi', name: 'Malaquias' },
  matthew: { apiName: 'matthew', name: 'Mateus' },
  mark: { apiName: 'mark', name: 'Marcos' },
  luke: { apiName: 'luke', name: 'Lucas' },
  john: { apiName: 'john', name: 'João' },
  acts: { apiName: 'acts', name: 'Atos' },
  romans: { apiName: 'romans', name: 'Romanos' },
  '1corinthians': { apiName: '1-corinthians', name: '1 Coríntios' },
  '2corinthians': { apiName: '2-corinthians', name: '2 Coríntios' },
  galatians: { apiName: 'galatians', name: 'Gálatas' },
  ephesians: { apiName: 'ephesians', name: 'Efésios' },
  philippians: { apiName: 'philippians', name: 'Filipenses' },
  colossians: { apiName: 'colossians', name: 'Colossenses' },
  '1thessalonians': { apiName: '1-thessalonians', name: '1 Tessalonicenses' },
  '2thessalonians': { apiName: '2-thessalonians', name: '2 Tessalonicenses' },
  '1timothy': { apiName: '1-timothy', name: '1 Timóteo' },
  '2timothy': { apiName: '2-timothy', name: '2 Timóteo' },
  titus: { apiName: 'titus', name: 'Tito' },
  philemon: { apiName: 'philemon', name: 'Filemom' },
  hebrews: { apiName: 'hebrews', name: 'Hebreus' },
  james: { apiName: 'james', name: 'Tiago' },
  '1peter': { apiName: '1-peter', name: '1 Pedro' },
  '2peter': { apiName: '2-peter', name: '2 Pedro' },
  '1john': { apiName: '1-john', name: '1 João' },
  '2john': { apiName: '2-john', name: '2 João' },
  '3john': { apiName: '3-john', name: '3 João' },
  jude: { apiName: 'jude', name: 'Judas' },
  revelation: { apiName: 'revelation', name: 'Apocalipse' },
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

// Buscar capítulo da CDN jsDelivr
async function fetchChapterFromAPI(bookId: string, chapter: number): Promise<string[] | null> {
  const bookInfo = BOOK_ID_MAP[bookId];
  if (!bookInfo) {
    console.error(`Livro não encontrado: ${bookId}`);
    return null;
  }

  // jsDelivr CDN URL: /books/{book}/chapters/{chapter}.json
  const url = `${API_BASE}/${bookInfo.apiName}/chapters/${chapter}.json`;
  
  try {
    console.log(`Buscando capítulo da CDN: ${url}`);
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const data = await response.json();
    
    // A CDN retorna array de objetos com { book, chapter, verse, text }
    if (Array.isArray(data) && data.length > 0) {
      // Ordenar por número do versículo
      data.sort((a: { verse: number }, b: { verse: number }) => a.verse - b.verse);
      const verses = data.map((v: { text: string }) => v.text);
      
      // Salvar no cache para uso offline
      saveChapterToCache(bookId, chapter, verses);
      return verses;
    }
    
    return null;
  } catch (error) {
    console.error('Erro ao buscar da CDN:', error);
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
  
  // Se não estiver no cache, buscar da CDN
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
        // Pequeno delay para não sobrecarregar
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
    return true;
  } catch {
    return false;
  }
}
