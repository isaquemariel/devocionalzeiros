import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// CDN-based Bible JSON files (thiagobodruk/bible repository)
// Available versions: acf (Almeida Corrigida Fiel), nvi, ra (Revista e Atualizada)
const VERSION_FILES: Record<string, string> = {
  nvi: "nvi",
  naa: "nvi", // fallback to NVI
  ntlh: "nvi", // fallback to NVI
  acf: "acf", // Almeida Corrigida Fiel (similar to King James)
  ara: "ra", // Almeida Revista e Atualizada
};

// Book index mapping (0-based index in the JSON array)
const BOOK_INDEX_MAP: Record<string, number> = {
  genesis: 0, exodus: 1, leviticus: 2, numbers: 3, deuteronomy: 4,
  joshua: 5, judges: 6, ruth: 7, "1samuel": 8, "2samuel": 9,
  "1kings": 10, "2kings": 11, "1chronicles": 12, "2chronicles": 13,
  ezra: 14, nehemiah: 15, esther: 16, job: 17, psalms: 18, proverbs: 19,
  ecclesiastes: 20, songofsolomon: 21, isaiah: 22, jeremiah: 23,
  lamentations: 24, ezekiel: 25, daniel: 26, hosea: 27, joel: 28,
  amos: 29, obadiah: 30, jonah: 31, micah: 32, nahum: 33, habakkuk: 34,
  zephaniah: 35, haggai: 36, zechariah: 37, malachi: 38,
  matthew: 39, mark: 40, luke: 41, john: 42, acts: 43, romans: 44,
  "1corinthians": 45, "2corinthians": 46, galatians: 47, ephesians: 48,
  philippians: 49, colossians: 50, "1thessalonians": 51, "2thessalonians": 52,
  "1timothy": 53, "2timothy": 54, titus: 55, philemon: 56, hebrews: 57,
  james: 58, "1peter": 59, "2peter": 60, "1john": 61, "2john": 62,
  "3john": 63, jude: 64, revelation: 65,
};

// Cache for loaded Bible data
const bibleCache: Record<string, unknown[]> = {};

async function loadBibleVersion(version: string): Promise<unknown[]> {
  const versionKey = VERSION_FILES[version] || "nvi";
  
  if (bibleCache[versionKey]) {
    console.log(`Using cached version: ${versionKey}`);
    return bibleCache[versionKey];
  }

  const cdnUrl = `https://cdn.jsdelivr.net/gh/thiagobodruk/bible@master/json/${versionKey}.json`;
  console.log(`Fetching Bible from CDN: ${cdnUrl}`);

  const response = await fetch(cdnUrl, {
    headers: { "Accept": "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Failed to load Bible version: ${response.status}`);
  }

  const data = await response.json();
  bibleCache[versionKey] = data;
  console.log(`Loaded and cached version: ${versionKey}, ${data.length} books`);
  
  return data;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { bookId, chapter, version } = await req.json();

    if (!bookId || !chapter) {
      throw new Error("Missing required fields: bookId, chapter");
    }

    const bookIndex = BOOK_INDEX_MAP[bookId.toLowerCase()];
    if (bookIndex === undefined) {
      throw new Error(`Book not found: ${bookId}`);
    }

    const versionKey = VERSION_FILES[version?.toLowerCase()] || "nvi";
    console.log(`Loading ${bookId} chapter ${chapter} in ${versionKey}`);

    const bibleData = await loadBibleVersion(versionKey);
    
    // Get the book data
    const book = bibleData[bookIndex] as { 
      name?: string; 
      abbrev?: string;
      chapters: string[][] 
    };
    
    if (!book || !book.chapters) {
      throw new Error(`Book data not found for index: ${bookIndex}`);
    }

    // Chapters are 0-indexed in the JSON
    const chapterIndex = chapter - 1;
    const chapterVerses = book.chapters[chapterIndex];

    if (!chapterVerses || !Array.isArray(chapterVerses)) {
      throw new Error(`Chapter ${chapter} not found in ${bookId}`);
    }

    // Transform to our format (verses are strings in the JSON)
    const verses = chapterVerses.map((text: string, index: number) => ({
      number: index + 1,
      text: text,
    }));

    console.log(`Returning ${verses.length} verses for ${bookId} ${chapter}`);

    return new Response(
      JSON.stringify({
        bookId,
        chapter,
        version: versionKey,
        verses,
        bookName: book.name || bookId,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error in bible-text:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Unknown error",
        verses: [] 
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});