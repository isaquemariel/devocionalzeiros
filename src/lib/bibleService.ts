// Bible API Service using bolls.life API
// API pública gratuita e estável com Bíblia em português
// Usando versão Almeida Revista e Atualizada (ARA)

const CACHE_KEY = 'bible_almeida_cache_v7';
const CACHE_VERSION = '7.0';

// API Base - bolls.life (API gratuita e estável)
const API_BASE = 'https://bolls.life/get-chapter';

// Map of book IDs to API book numbers and Portuguese names
export const BOOK_ID_MAP: Record<string, { apiNumber: number; name: string; chapters: number }> = {
  genesis: { apiNumber: 1, name: 'Gênesis', chapters: 50 },
  exodus: { apiNumber: 2, name: 'Êxodo', chapters: 40 },
  leviticus: { apiNumber: 3, name: 'Levítico', chapters: 27 },
  numbers: { apiNumber: 4, name: 'Números', chapters: 36 },
  deuteronomy: { apiNumber: 5, name: 'Deuteronômio', chapters: 34 },
  joshua: { apiNumber: 6, name: 'Josué', chapters: 24 },
  judges: { apiNumber: 7, name: 'Juízes', chapters: 21 },
  ruth: { apiNumber: 8, name: 'Rute', chapters: 4 },
  '1samuel': { apiNumber: 9, name: '1 Samuel', chapters: 31 },
  '2samuel': { apiNumber: 10, name: '2 Samuel', chapters: 24 },
  '1kings': { apiNumber: 11, name: '1 Reis', chapters: 22 },
  '2kings': { apiNumber: 12, name: '2 Reis', chapters: 25 },
  '1chronicles': { apiNumber: 13, name: '1 Crônicas', chapters: 29 },
  '2chronicles': { apiNumber: 14, name: '2 Crônicas', chapters: 36 },
  ezra: { apiNumber: 15, name: 'Esdras', chapters: 10 },
  nehemiah: { apiNumber: 16, name: 'Neemias', chapters: 13 },
  esther: { apiNumber: 17, name: 'Ester', chapters: 10 },
  job: { apiNumber: 18, name: 'Jó', chapters: 42 },
  psalms: { apiNumber: 19, name: 'Salmos', chapters: 150 },
  proverbs: { apiNumber: 20, name: 'Provérbios', chapters: 31 },
  ecclesiastes: { apiNumber: 21, name: 'Eclesiastes', chapters: 12 },
  songofsolomon: { apiNumber: 22, name: 'Cânticos', chapters: 8 },
  isaiah: { apiNumber: 23, name: 'Isaías', chapters: 66 },
  jeremiah: { apiNumber: 24, name: 'Jeremias', chapters: 52 },
  lamentations: { apiNumber: 25, name: 'Lamentações', chapters: 5 },
  ezekiel: { apiNumber: 26, name: 'Ezequiel', chapters: 48 },
  daniel: { apiNumber: 27, name: 'Daniel', chapters: 12 },
  hosea: { apiNumber: 28, name: 'Oséias', chapters: 14 },
  joel: { apiNumber: 29, name: 'Joel', chapters: 3 },
  amos: { apiNumber: 30, name: 'Amós', chapters: 9 },
  obadiah: { apiNumber: 31, name: 'Obadias', chapters: 1 },
  jonah: { apiNumber: 32, name: 'Jonas', chapters: 4 },
  micah: { apiNumber: 33, name: 'Miquéias', chapters: 7 },
  nahum: { apiNumber: 34, name: 'Naum', chapters: 3 },
  habakkuk: { apiNumber: 35, name: 'Habacuque', chapters: 3 },
  zephaniah: { apiNumber: 36, name: 'Sofonias', chapters: 3 },
  haggai: { apiNumber: 37, name: 'Ageu', chapters: 2 },
  zechariah: { apiNumber: 38, name: 'Zacarias', chapters: 14 },
  malachi: { apiNumber: 39, name: 'Malaquias', chapters: 4 },
  matthew: { apiNumber: 40, name: 'Mateus', chapters: 28 },
  mark: { apiNumber: 41, name: 'Marcos', chapters: 16 },
  luke: { apiNumber: 42, name: 'Lucas', chapters: 24 },
  john: { apiNumber: 43, name: 'João', chapters: 21 },
  acts: { apiNumber: 44, name: 'Atos', chapters: 28 },
  romans: { apiNumber: 45, name: 'Romanos', chapters: 16 },
  '1corinthians': { apiNumber: 46, name: '1 Coríntios', chapters: 16 },
  '2corinthians': { apiNumber: 47, name: '2 Coríntios', chapters: 13 },
  galatians: { apiNumber: 48, name: 'Gálatas', chapters: 6 },
  ephesians: { apiNumber: 49, name: 'Efésios', chapters: 6 },
  philippians: { apiNumber: 50, name: 'Filipenses', chapters: 4 },
  colossians: { apiNumber: 51, name: 'Colossenses', chapters: 4 },
  '1thessalonians': { apiNumber: 52, name: '1 Tessalonicenses', chapters: 5 },
  '2thessalonians': { apiNumber: 53, name: '2 Tessalonicenses', chapters: 3 },
  '1timothy': { apiNumber: 54, name: '1 Timóteo', chapters: 6 },
  '2timothy': { apiNumber: 55, name: '2 Timóteo', chapters: 4 },
  titus: { apiNumber: 56, name: 'Tito', chapters: 3 },
  philemon: { apiNumber: 57, name: 'Filemom', chapters: 1 },
  hebrews: { apiNumber: 58, name: 'Hebreus', chapters: 13 },
  james: { apiNumber: 59, name: 'Tiago', chapters: 5 },
  '1peter': { apiNumber: 60, name: '1 Pedro', chapters: 5 },
  '2peter': { apiNumber: 61, name: '2 Pedro', chapters: 3 },
  '1john': { apiNumber: 62, name: '1 João', chapters: 5 },
  '2john': { apiNumber: 63, name: '2 João', chapters: 1 },
  '3john': { apiNumber: 64, name: '3 João', chapters: 1 },
  jude: { apiNumber: 65, name: 'Judas', chapters: 1 },
  revelation: { apiNumber: 66, name: 'Apocalipse', chapters: 22 },
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

// Buscar capítulo da API bolls.life
async function fetchChapterFromAPI(bookId: string, chapter: number): Promise<string[] | null> {
  const bookInfo = BOOK_ID_MAP[bookId];
  if (!bookInfo) {
    console.error(`Livro não encontrado: ${bookId}`);
    return null;
  }

  // bolls.life API URL: /get-chapter/ARA/{bookNumber}/{chapter}
  // ARA = Almeida Revista e Atualizada
  const url = `${API_BASE}/ARA/${bookInfo.apiNumber}/${chapter}/`;
  
  try {
    console.log(`Buscando capítulo da API: ${url}`);
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const data = await response.json();
    
    // A API retorna array de objetos: [{ verse: 1, text: "..." }, ...]
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
