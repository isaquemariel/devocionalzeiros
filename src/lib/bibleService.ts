// Bible API Service using bolls.life API
// API pública gratuita e estável com Bíblia em português
// Usando versão Almeida Revista e Atualizada (ARA)

const CACHE_KEY = 'bible_almeida_cache_v7';
const CACHE_VERSION = '7.0';

// API Base - bolls.life (API gratuita e estável)
const API_BASE = 'https://bolls.life/get-chapter';

// Map of book IDs to API book numbers and Portuguese names
export const BOOK_ID_MAP: Record<string, { apiNumber: number; name: string; aliases: string[]; chapters: number }> = {
  genesis: { apiNumber: 1, name: 'Gênesis', aliases: ['gênesis', 'genesis', 'gn', 'gen'], chapters: 50 },
  exodus: { apiNumber: 2, name: 'Êxodo', aliases: ['êxodo', 'exodo', 'ex'], chapters: 40 },
  leviticus: { apiNumber: 3, name: 'Levítico', aliases: ['levítico', 'levitico', 'lv', 'lev'], chapters: 27 },
  numbers: { apiNumber: 4, name: 'Números', aliases: ['números', 'numeros', 'nm', 'num'], chapters: 36 },
  deuteronomy: { apiNumber: 5, name: 'Deuteronômio', aliases: ['deuteronômio', 'deuteronomio', 'dt', 'deut'], chapters: 34 },
  joshua: { apiNumber: 6, name: 'Josué', aliases: ['josué', 'josue', 'js', 'jos'], chapters: 24 },
  judges: { apiNumber: 7, name: 'Juízes', aliases: ['juízes', 'juizes', 'jz', 'jui'], chapters: 21 },
  ruth: { apiNumber: 8, name: 'Rute', aliases: ['rute', 'rt', 'rut'], chapters: 4 },
  '1samuel': { apiNumber: 9, name: '1 Samuel', aliases: ['1 samuel', '1samuel', '1sm', '1sam', '1 sm', 'i samuel'], chapters: 31 },
  '2samuel': { apiNumber: 10, name: '2 Samuel', aliases: ['2 samuel', '2samuel', '2sm', '2sam', '2 sm', 'ii samuel'], chapters: 24 },
  '1kings': { apiNumber: 11, name: '1 Reis', aliases: ['1 reis', '1reis', '1rs', '1re', '1 rs', 'i reis'], chapters: 22 },
  '2kings': { apiNumber: 12, name: '2 Reis', aliases: ['2 reis', '2reis', '2rs', '2re', '2 rs', 'ii reis'], chapters: 25 },
  '1chronicles': { apiNumber: 13, name: '1 Crônicas', aliases: ['1 crônicas', '1 cronicas', '1cr', '1 cr', 'i crônicas', 'i cronicas'], chapters: 29 },
  '2chronicles': { apiNumber: 14, name: '2 Crônicas', aliases: ['2 crônicas', '2 cronicas', '2cr', '2 cr', 'ii crônicas', 'ii cronicas'], chapters: 36 },
  ezra: { apiNumber: 15, name: 'Esdras', aliases: ['esdras', 'ed', 'esd'], chapters: 10 },
  nehemiah: { apiNumber: 16, name: 'Neemias', aliases: ['neemias', 'ne', 'nee'], chapters: 13 },
  esther: { apiNumber: 17, name: 'Ester', aliases: ['ester', 'et', 'est'], chapters: 10 },
  job: { apiNumber: 18, name: 'Jó', aliases: ['jó', 'jo', 'job'], chapters: 42 },
  psalms: { apiNumber: 19, name: 'Salmos', aliases: ['salmos', 'salmo', 'sl', 'sal', 'ps'], chapters: 150 },
  proverbs: { apiNumber: 20, name: 'Provérbios', aliases: ['provérbios', 'proverbios', 'pv', 'prov'], chapters: 31 },
  ecclesiastes: { apiNumber: 21, name: 'Eclesiastes', aliases: ['eclesiastes', 'ec', 'ecl'], chapters: 12 },
  songofsolomon: { apiNumber: 22, name: 'Cânticos', aliases: ['cânticos', 'canticos', 'cantares', 'ct', 'can'], chapters: 8 },
  isaiah: { apiNumber: 23, name: 'Isaías', aliases: ['isaías', 'isaias', 'is', 'isa'], chapters: 66 },
  jeremiah: { apiNumber: 24, name: 'Jeremias', aliases: ['jeremias', 'jr', 'jer'], chapters: 52 },
  lamentations: { apiNumber: 25, name: 'Lamentações', aliases: ['lamentações', 'lamentacoes', 'lm', 'lam'], chapters: 5 },
  ezekiel: { apiNumber: 26, name: 'Ezequiel', aliases: ['ezequiel', 'ez', 'eze'], chapters: 48 },
  daniel: { apiNumber: 27, name: 'Daniel', aliases: ['daniel', 'dn', 'dan'], chapters: 12 },
  hosea: { apiNumber: 28, name: 'Oséias', aliases: ['oséias', 'oseias', 'os', 'ose'], chapters: 14 },
  joel: { apiNumber: 29, name: 'Joel', aliases: ['joel', 'jl', 'joe'], chapters: 3 },
  amos: { apiNumber: 30, name: 'Amós', aliases: ['amós', 'amos', 'am', 'amo'], chapters: 9 },
  obadiah: { apiNumber: 31, name: 'Obadias', aliases: ['obadias', 'ob', 'oba'], chapters: 1 },
  jonah: { apiNumber: 32, name: 'Jonas', aliases: ['jonas', 'jn', 'jon'], chapters: 4 },
  micah: { apiNumber: 33, name: 'Miquéias', aliases: ['miquéias', 'miqueias', 'mq', 'miq'], chapters: 7 },
  nahum: { apiNumber: 34, name: 'Naum', aliases: ['naum', 'na', 'nau'], chapters: 3 },
  habakkuk: { apiNumber: 35, name: 'Habacuque', aliases: ['habacuque', 'hc', 'hab'], chapters: 3 },
  zephaniah: { apiNumber: 36, name: 'Sofonias', aliases: ['sofonias', 'sf', 'sof'], chapters: 3 },
  haggai: { apiNumber: 37, name: 'Ageu', aliases: ['ageu', 'ag', 'age'], chapters: 2 },
  zechariah: { apiNumber: 38, name: 'Zacarias', aliases: ['zacarias', 'zc', 'zac'], chapters: 14 },
  malachi: { apiNumber: 39, name: 'Malaquias', aliases: ['malaquias', 'ml', 'mal'], chapters: 4 },
  matthew: { apiNumber: 40, name: 'Mateus', aliases: ['mateus', 'mt', 'mat'], chapters: 28 },
  mark: { apiNumber: 41, name: 'Marcos', aliases: ['marcos', 'mc', 'mar'], chapters: 16 },
  luke: { apiNumber: 42, name: 'Lucas', aliases: ['lucas', 'lc', 'luc'], chapters: 24 },
  john: { apiNumber: 43, name: 'João', aliases: ['joão', 'joao', 'jo'], chapters: 21 },
  acts: { apiNumber: 44, name: 'Atos', aliases: ['atos', 'at', 'ato'], chapters: 28 },
  romans: { apiNumber: 45, name: 'Romanos', aliases: ['romanos', 'rm', 'rom'], chapters: 16 },
  '1corinthians': { apiNumber: 46, name: '1 Coríntios', aliases: ['1 coríntios', '1 corintios', '1co', '1cor', '1 co', 'i coríntios', 'i corintios'], chapters: 16 },
  '2corinthians': { apiNumber: 47, name: '2 Coríntios', aliases: ['2 coríntios', '2 corintios', '2co', '2cor', '2 co', 'ii coríntios', 'ii corintios'], chapters: 13 },
  galatians: { apiNumber: 48, name: 'Gálatas', aliases: ['gálatas', 'galatas', 'gl', 'gal'], chapters: 6 },
  ephesians: { apiNumber: 49, name: 'Efésios', aliases: ['efésios', 'efesios', 'ef', 'efe'], chapters: 6 },
  philippians: { apiNumber: 50, name: 'Filipenses', aliases: ['filipenses', 'fp', 'fil'], chapters: 4 },
  colossians: { apiNumber: 51, name: 'Colossenses', aliases: ['colossenses', 'cl', 'col'], chapters: 4 },
  '1thessalonians': { apiNumber: 52, name: '1 Tessalonicenses', aliases: ['1 tessalonicenses', '1ts', '1tes', '1 ts', 'i tessalonicenses'], chapters: 5 },
  '2thessalonians': { apiNumber: 53, name: '2 Tessalonicenses', aliases: ['2 tessalonicenses', '2ts', '2tes', '2 ts', 'ii tessalonicenses'], chapters: 3 },
  '1timothy': { apiNumber: 54, name: '1 Timóteo', aliases: ['1 timóteo', '1 timoteo', '1tm', '1tim', '1 tm', 'i timóteo', 'i timoteo'], chapters: 6 },
  '2timothy': { apiNumber: 55, name: '2 Timóteo', aliases: ['2 timóteo', '2 timoteo', '2tm', '2tim', '2 tm', 'ii timóteo', 'ii timoteo'], chapters: 4 },
  titus: { apiNumber: 56, name: 'Tito', aliases: ['tito', 'tt', 'tit'], chapters: 3 },
  philemon: { apiNumber: 57, name: 'Filemom', aliases: ['filemom', 'fm', 'fil'], chapters: 1 },
  hebrews: { apiNumber: 58, name: 'Hebreus', aliases: ['hebreus', 'hb', 'heb'], chapters: 13 },
  james: { apiNumber: 59, name: 'Tiago', aliases: ['tiago', 'tg', 'tia'], chapters: 5 },
  '1peter': { apiNumber: 60, name: '1 Pedro', aliases: ['1 pedro', '1pe', '1ped', '1 pe', 'i pedro'], chapters: 5 },
  '2peter': { apiNumber: 61, name: '2 Pedro', aliases: ['2 pedro', '2pe', '2ped', '2 pe', 'ii pedro'], chapters: 3 },
  '1john': { apiNumber: 62, name: '1 João', aliases: ['1 joão', '1 joao', '1jo', '1joa', '1 jo', 'i joão', 'i joao'], chapters: 5 },
  '2john': { apiNumber: 63, name: '2 João', aliases: ['2 joão', '2 joao', '2jo', '2joa', '2 jo', 'ii joão', 'ii joao'], chapters: 1 },
  '3john': { apiNumber: 64, name: '3 João', aliases: ['3 joão', '3 joao', '3jo', '3joa', '3 jo', 'iii joão', 'iii joao'], chapters: 1 },
  jude: { apiNumber: 65, name: 'Judas', aliases: ['judas', 'jd', 'jud'], chapters: 1 },
  revelation: { apiNumber: 66, name: 'Apocalipse', aliases: ['apocalipse', 'ap', 'apo', 'revelação'], chapters: 22 },
};

// Encontrar bookId pelo nome/alias
export function findBookIdByName(bookName: string): string | null {
  const normalizedName = bookName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
  
  for (const [bookId, info] of Object.entries(BOOK_ID_MAP)) {
    // Verificar nome exato
    if (info.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') === normalizedName) {
      return bookId;
    }
    // Verificar aliases
    for (const alias of info.aliases) {
      if (alias.normalize('NFD').replace(/[\u0300-\u036f]/g, '') === normalizedName) {
        return bookId;
      }
    }
  }
  return null;
}

// Parse referência bíblica em vários formatos (suporta intervalos como João 3:1-5)
export function parseReference(reference: string): { bookId: string; chapter: number; verseStart: number; verseEnd: number } | null {
  // Normalizar a referência
  const ref = reference.trim();
  
  // Padrões suportados:
  // "João 3:16", "1 João 4:8", "Gn 1:1", "Sl 23:1", "1Co 13:4", "Romanos 8.28", "João 3:1-5"
  
  // Regex mais flexível que captura livros com números e intervalos de versículos
  const match = ref.match(/^(\d?\s*[^\d:.,]+)\s*(\d+)[:.,-](\d+)(?:[-.,-](\d+))?$/i);
  
  if (!match) {
    // Tentar formato alternativo: "Sl 23.1"
    const altMatch = ref.match(/^(\d?\s*[^\d]+)\s*(\d+)\.(\d+)$/i);
    if (!altMatch) return null;
    
    const [, bookPart, chapterStr, verseStr] = altMatch;
    const bookId = findBookIdByName(bookPart.trim());
    if (!bookId) return null;
    
    const verse = parseInt(verseStr);
    return {
      bookId,
      chapter: parseInt(chapterStr),
      verseStart: verse,
      verseEnd: verse,
    };
  }
  
  const [, bookPart, chapterStr, verseStartStr, verseEndStr] = match;
  const bookId = findBookIdByName(bookPart.trim());
  
  if (!bookId) return null;
  
  const verseStart = parseInt(verseStartStr);
  const verseEnd = verseEndStr ? parseInt(verseEndStr) : verseStart;
  
  return {
    bookId,
    chapter: parseInt(chapterStr),
    verseStart,
    verseEnd,
  };
}

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

// Buscar capítulo via edge function proxy (server-side, sem CORS)
async function fetchChapterViaProxy(bookId: string, chapter: number): Promise<string[] | null> {
  const bookInfo = BOOK_ID_MAP[bookId];
  if (!bookInfo) return null;

  try {
    const { supabase } = await import('@/integrations/supabase/client');
    const { data, error } = await supabase.functions.invoke('bible-proxy', {
      body: { bookNumber: bookInfo.apiNumber, chapter },
    });

    if (error || !data?.verses?.length) return null;

    const verses = data.verses.map((v: { text: string }) => v.text);
    saveChapterToCache(bookId, chapter, verses);
    return verses;
  } catch (error) {
    console.error('Erro no proxy da Bíblia:', error);
    return null;
  }
}

// Buscar capítulo da API bolls.life diretamente
async function fetchChapterFromAPI(bookId: string, chapter: number): Promise<string[] | null> {
  const bookInfo = BOOK_ID_MAP[bookId];
  if (!bookInfo) {
    console.error(`Livro não encontrado: ${bookId}`);
    return null;
  }

  // bolls.life API URL: /get-chapter/ARA/{bookNumber}/{chapter}
  const url = `${API_BASE}/ARA/${bookInfo.apiNumber}/${chapter}/`;
  
  try {
    console.log(`Buscando capítulo da API: ${url}`);
    const response = await fetch(url, { signal: AbortSignal.timeout(8000) });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const data = await response.json();
    
    if (Array.isArray(data) && data.length > 0) {
      data.sort((a: { verse: number }, b: { verse: number }) => a.verse - b.verse);
      const verses = data.map((v: { text: string }) => v.text);
      saveChapterToCache(bookId, chapter, verses);
      return verses;
    }
    
    return null;
  } catch (error) {
    console.error('Erro ao buscar da API direta, tentando proxy...', error);
    // Fallback para o proxy (server-side)
    return fetchChapterViaProxy(bookId, chapter);
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

// Buscar palavra INTEIRA na Bíblia (busca em toda a Bíblia, carregando da API quando necessário)
export async function searchBible(query: string, maxResults = 50): Promise<SearchResult[]> {
  const results: SearchResult[] = [];
  
  if (!query || query.length < 3) return results;
  
  // Normalizar termo de busca
  const searchTerm = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  
  // Criar regex para buscar PALAVRA INTEIRA (não substring)
  // \b não funciona bem com português, então usamos boundary personalizado
  const wordBoundaryStart = '(?:^|[\\s.,;:!?\\"\\\'()\\[\\]{}])';
  const wordBoundaryEnd = '(?:[\\s.,;:!?\\"\\\'()\\[\\]{}]|$)';
  const searchRegex = new RegExp(
    wordBoundaryStart + escapeRegExp(searchTerm) + wordBoundaryEnd,
    'i'
  );
  
  // Buscar em todos os livros da Bíblia
  const allBookIds = Object.keys(BOOK_ID_MAP);
  
  // Contador de requisições à API para evitar sobrecarga
  let apiRequestCount = 0;
  const MAX_API_REQUESTS = 20; // Limite de requisições por busca
  
  for (const bookId of allBookIds) {
    if (results.length >= maxResults) break;
    
    const bookInfo = BOOK_ID_MAP[bookId];
    if (!bookInfo) continue;
    
    // Buscar em cada capítulo do livro
    for (let chapter = 1; chapter <= bookInfo.chapters; chapter++) {
      if (results.length >= maxResults) break;
      
      // Tentar do cache primeiro
      let verses = getChapterFromCache(bookId, chapter);
      
      // Se não tiver no cache e ainda temos requisições disponíveis, buscar da API
      if ((!verses || verses.length === 0) && apiRequestCount < MAX_API_REQUESTS) {
        verses = await fetchChapterFromAPI(bookId, chapter);
        apiRequestCount++;
        // Pequeno delay para não sobrecarregar a API
        if (apiRequestCount < MAX_API_REQUESTS) {
          await new Promise(resolve => setTimeout(resolve, 50));
        }
      }
      
      // Se ainda não temos versículos, pular
      if (!verses || verses.length === 0) continue;
      
      for (let verseIdx = 0; verseIdx < verses.length; verseIdx++) {
        if (results.length >= maxResults) break;
        
        const verseText = verses[verseIdx];
        if (!verseText) continue;
        
        const normalizedText = verseText.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        
        // Buscar palavra INTEIRA
        if (searchRegex.test(' ' + normalizedText + ' ')) {
          // Encontrar posição para highlight
          const plainMatch = normalizedText.indexOf(searchTerm);
          const start = Math.max(0, plainMatch - 30);
          const end = Math.min(verseText.length, plainMatch + query.length + 30);
          let highlight = verseText.substring(start, end);
          if (start > 0) highlight = '...' + highlight;
          if (end < verseText.length) highlight = highlight + '...';
          
          results.push({
            bookId,
            bookName: bookInfo.name,
            chapter,
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

// Escape caracteres especiais para regex
function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
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
