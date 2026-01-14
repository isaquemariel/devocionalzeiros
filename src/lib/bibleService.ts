// Bible Service - Busca versículos da versão Almeida via API com cache local

const CACHE_KEY = 'bible_almeida_cache_v3';
const CACHE_VERSION = '3.0';

// API bolls.life (gratuita e estável) - Bible ID 12 = Almeida Revista e Corrigida
const API_BASE = 'https://bolls.life/get-chapter/12';

interface BibleBookData {
  abbrev: string;
  book: string;
  chapters: string[][];
}

interface CacheData {
  version: string;
  books: Record<string, BibleBookData>;
}

// Mapeamento de bookId para ID do livro na API bolls.life
const BOOK_ID_MAP: Record<string, { id: number; name: string }> = {
  genesis: { id: 1, name: 'Gênesis' },
  exodus: { id: 2, name: 'Êxodo' },
  leviticus: { id: 3, name: 'Levítico' },
  numbers: { id: 4, name: 'Números' },
  deuteronomy: { id: 5, name: 'Deuteronômio' },
  joshua: { id: 6, name: 'Josué' },
  judges: { id: 7, name: 'Juízes' },
  ruth: { id: 8, name: 'Rute' },
  '1samuel': { id: 9, name: '1 Samuel' },
  '2samuel': { id: 10, name: '2 Samuel' },
  '1kings': { id: 11, name: '1 Reis' },
  '2kings': { id: 12, name: '2 Reis' },
  '1chronicles': { id: 13, name: '1 Crônicas' },
  '2chronicles': { id: 14, name: '2 Crônicas' },
  ezra: { id: 15, name: 'Esdras' },
  nehemiah: { id: 16, name: 'Neemias' },
  esther: { id: 17, name: 'Ester' },
  job: { id: 18, name: 'Jó' },
  psalms: { id: 19, name: 'Salmos' },
  proverbs: { id: 20, name: 'Provérbios' },
  ecclesiastes: { id: 21, name: 'Eclesiastes' },
  songofsolomon: { id: 22, name: 'Cânticos' },
  isaiah: { id: 23, name: 'Isaías' },
  jeremiah: { id: 24, name: 'Jeremias' },
  lamentations: { id: 25, name: 'Lamentações' },
  ezekiel: { id: 26, name: 'Ezequiel' },
  daniel: { id: 27, name: 'Daniel' },
  hosea: { id: 28, name: 'Oséias' },
  joel: { id: 29, name: 'Joel' },
  amos: { id: 30, name: 'Amós' },
  obadiah: { id: 31, name: 'Obadias' },
  jonah: { id: 32, name: 'Jonas' },
  micah: { id: 33, name: 'Miquéias' },
  nahum: { id: 34, name: 'Naum' },
  habakkuk: { id: 35, name: 'Habacuque' },
  zephaniah: { id: 36, name: 'Sofonias' },
  haggai: { id: 37, name: 'Ageu' },
  zechariah: { id: 38, name: 'Zacarias' },
  malachi: { id: 39, name: 'Malaquias' },
  matthew: { id: 40, name: 'Mateus' },
  mark: { id: 41, name: 'Marcos' },
  luke: { id: 42, name: 'Lucas' },
  john: { id: 43, name: 'João' },
  acts: { id: 44, name: 'Atos' },
  romans: { id: 45, name: 'Romanos' },
  '1corinthians': { id: 46, name: '1 Coríntios' },
  '2corinthians': { id: 47, name: '2 Coríntios' },
  galatians: { id: 48, name: 'Gálatas' },
  ephesians: { id: 49, name: 'Efésios' },
  philippians: { id: 50, name: 'Filipenses' },
  colossians: { id: 51, name: 'Colossenses' },
  '1thessalonians': { id: 52, name: '1 Tessalonicenses' },
  '2thessalonians': { id: 53, name: '2 Tessalonicenses' },
  '1timothy': { id: 54, name: '1 Timóteo' },
  '2timothy': { id: 55, name: '2 Timóteo' },
  titus: { id: 56, name: 'Tito' },
  philemon: { id: 57, name: 'Filemom' },
  hebrews: { id: 58, name: 'Hebreus' },
  james: { id: 59, name: 'Tiago' },
  '1peter': { id: 60, name: '1 Pedro' },
  '2peter': { id: 61, name: '2 Pedro' },
  '1john': { id: 62, name: '1 João' },
  '2john': { id: 63, name: '2 João' },
  '3john': { id: 64, name: '3 João' },
  jude: { id: 65, name: 'Judas' },
  revelation: { id: 66, name: 'Apocalipse' },
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

// Buscar capítulo da API
async function fetchChapterFromAPI(bookId: string, chapter: number): Promise<string[] | null> {
  const bookInfo = BOOK_ID_MAP[bookId];
  if (!bookInfo) {
    console.error(`Livro não encontrado: ${bookId}`);
    return null;
  }

  // API bolls.life: /get-chapter/{bible_id}/{book_id}/{chapter}
  const url = `${API_BASE}/${bookInfo.id}/${chapter}/`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const data = await response.json();
    
    // A API retorna array de objetos com { pk, verse, text }
    if (Array.isArray(data) && data.length > 0) {
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
    // Se não houver cache, retornar mensagem
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
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
    return true;
  } catch {
    return false;
  }
}
