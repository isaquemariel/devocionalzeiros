// Bible Service - Busca versículos da versão Almeida via API com cache local

const CACHE_KEY = 'bible_almeida_cache_v2';
const CACHE_VERSION = '2.0';

// API da ABibliaDigital (mais confiável)
const API_BASE = 'https://www.abibliadigital.com.br/api';

interface BibleBookData {
  abbrev: string;
  book: string;
  chapters: string[][];
}

interface CacheData {
  version: string;
  books: Record<string, BibleBookData>;
}

// Mapeamento de bookId para abreviação da API
const BOOK_ABBREV_MAP: Record<string, { abbrev: string; name: string }> = {
  genesis: { abbrev: 'gn', name: 'Gênesis' },
  exodus: { abbrev: 'ex', name: 'Êxodo' },
  leviticus: { abbrev: 'lv', name: 'Levítico' },
  numbers: { abbrev: 'nm', name: 'Números' },
  deuteronomy: { abbrev: 'dt', name: 'Deuteronômio' },
  joshua: { abbrev: 'js', name: 'Josué' },
  judges: { abbrev: 'jz', name: 'Juízes' },
  ruth: { abbrev: 'rt', name: 'Rute' },
  '1samuel': { abbrev: '1sm', name: '1 Samuel' },
  '2samuel': { abbrev: '2sm', name: '2 Samuel' },
  '1kings': { abbrev: '1rs', name: '1 Reis' },
  '2kings': { abbrev: '2rs', name: '2 Reis' },
  '1chronicles': { abbrev: '1cr', name: '1 Crônicas' },
  '2chronicles': { abbrev: '2cr', name: '2 Crônicas' },
  ezra: { abbrev: 'ed', name: 'Esdras' },
  nehemiah: { abbrev: 'ne', name: 'Neemias' },
  esther: { abbrev: 'et', name: 'Ester' },
  job: { abbrev: 'jó', name: 'Jó' },
  psalms: { abbrev: 'sl', name: 'Salmos' },
  proverbs: { abbrev: 'pv', name: 'Provérbios' },
  ecclesiastes: { abbrev: 'ec', name: 'Eclesiastes' },
  songofsolomon: { abbrev: 'ct', name: 'Cânticos' },
  isaiah: { abbrev: 'is', name: 'Isaías' },
  jeremiah: { abbrev: 'jr', name: 'Jeremias' },
  lamentations: { abbrev: 'lm', name: 'Lamentações' },
  ezekiel: { abbrev: 'ez', name: 'Ezequiel' },
  daniel: { abbrev: 'dn', name: 'Daniel' },
  hosea: { abbrev: 'os', name: 'Oséias' },
  joel: { abbrev: 'jl', name: 'Joel' },
  amos: { abbrev: 'am', name: 'Amós' },
  obadiah: { abbrev: 'ob', name: 'Obadias' },
  jonah: { abbrev: 'jn', name: 'Jonas' },
  micah: { abbrev: 'mq', name: 'Miquéias' },
  nahum: { abbrev: 'na', name: 'Naum' },
  habakkuk: { abbrev: 'hc', name: 'Habacuque' },
  zephaniah: { abbrev: 'sf', name: 'Sofonias' },
  haggai: { abbrev: 'ag', name: 'Ageu' },
  zechariah: { abbrev: 'zc', name: 'Zacarias' },
  malachi: { abbrev: 'ml', name: 'Malaquias' },
  matthew: { abbrev: 'mt', name: 'Mateus' },
  mark: { abbrev: 'mc', name: 'Marcos' },
  luke: { abbrev: 'lc', name: 'Lucas' },
  john: { abbrev: 'jo', name: 'João' },
  acts: { abbrev: 'at', name: 'Atos' },
  romans: { abbrev: 'rm', name: 'Romanos' },
  '1corinthians': { abbrev: '1co', name: '1 Coríntios' },
  '2corinthians': { abbrev: '2co', name: '2 Coríntios' },
  galatians: { abbrev: 'gl', name: 'Gálatas' },
  ephesians: { abbrev: 'ef', name: 'Efésios' },
  philippians: { abbrev: 'fp', name: 'Filipenses' },
  colossians: { abbrev: 'cl', name: 'Colossenses' },
  '1thessalonians': { abbrev: '1ts', name: '1 Tessalonicenses' },
  '2thessalonians': { abbrev: '2ts', name: '2 Tessalonicenses' },
  '1timothy': { abbrev: '1tm', name: '1 Timóteo' },
  '2timothy': { abbrev: '2tm', name: '2 Timóteo' },
  titus: { abbrev: 'tt', name: 'Tito' },
  philemon: { abbrev: 'fm', name: 'Filemom' },
  hebrews: { abbrev: 'hb', name: 'Hebreus' },
  james: { abbrev: 'tg', name: 'Tiago' },
  '1peter': { abbrev: '1pe', name: '1 Pedro' },
  '2peter': { abbrev: '2pe', name: '2 Pedro' },
  '1john': { abbrev: '1jo', name: '1 João' },
  '2john': { abbrev: '2jo', name: '2 João' },
  '3john': { abbrev: '3jo', name: '3 João' },
  jude: { abbrev: 'jd', name: 'Judas' },
  revelation: { abbrev: 'ap', name: 'Apocalipse' },
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
      const bookInfo = BOOK_ABBREV_MAP[bookId];
      cache.books[bookId] = {
        abbrev: bookInfo?.abbrev || bookId,
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
  const bookInfo = BOOK_ABBREV_MAP[bookId];
  if (!bookInfo) {
    console.error(`Livro não encontrado: ${bookId}`);
    return null;
  }

  const url = `${API_BASE}/verses/aa/${bookInfo.abbrev}/${chapter}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.verses && Array.isArray(data.verses)) {
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
  return BOOK_ABBREV_MAP[bookId]?.name || null;
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
  return Object.keys(BOOK_ABBREV_MAP);
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
