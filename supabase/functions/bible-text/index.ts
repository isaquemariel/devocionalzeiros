import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// API Bíblia Digital - versões suportadas
const VERSION_MAP: Record<string, string> = {
  nvi: "nvi",
  naa: "naa", 
  ntlh: "ntlh",
  acf: "acf", // Almeida Corrigida Fiel (similar à BKJ)
  ara: "ra", // Almeida Revista e Atualizada
};

// Mapping of book IDs to API abbreviations
const BOOK_ABBREV_MAP: Record<string, string> = {
  genesis: "gn",
  exodus: "ex",
  leviticus: "lv",
  numbers: "nm",
  deuteronomy: "dt",
  joshua: "js",
  judges: "jz",
  ruth: "rt",
  "1samuel": "1sm",
  "2samuel": "2sm",
  "1kings": "1rs",
  "2kings": "2rs",
  "1chronicles": "1cr",
  "2chronicles": "2cr",
  ezra: "ed",
  nehemiah: "ne",
  esther: "et",
  job: "jó",
  psalms: "sl",
  proverbs: "pv",
  ecclesiastes: "ec",
  songofsolomon: "ct",
  isaiah: "is",
  jeremiah: "jr",
  lamentations: "lm",
  ezekiel: "ez",
  daniel: "dn",
  hosea: "os",
  joel: "jl",
  amos: "am",
  obadiah: "ob",
  jonah: "jn",
  micah: "mq",
  nahum: "na",
  habakkuk: "hc",
  zephaniah: "sf",
  haggai: "ag",
  zechariah: "zc",
  malachi: "ml",
  matthew: "mt",
  mark: "mc",
  luke: "lc",
  john: "jo",
  acts: "at",
  romans: "rm",
  "1corinthians": "1co",
  "2corinthians": "2co",
  galatians: "gl",
  ephesians: "ef",
  philippians: "fp",
  colossians: "cl",
  "1thessalonians": "1ts",
  "2thessalonians": "2ts",
  "1timothy": "1tm",
  "2timothy": "2tm",
  titus: "tt",
  philemon: "fm",
  hebrews: "hb",
  james: "tg",
  "1peter": "1pe",
  "2peter": "2pe",
  "1john": "1jo",
  "2john": "2jo",
  "3john": "3jo",
  jude: "jd",
  revelation: "ap",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { bookId, chapter, version } = await req.json();

    if (!bookId || !chapter) {
      throw new Error("Missing required fields: bookId, chapter");
    }

    const abbrev = BOOK_ABBREV_MAP[bookId.toLowerCase()];
    if (!abbrev) {
      throw new Error(`Book not found: ${bookId}`);
    }

    const apiVersion = VERSION_MAP[version?.toLowerCase()] || "nvi";
    
    // Fetch from A Bíblia Digital API
    const apiUrl = `https://www.abibliadigital.com.br/api/verses/${apiVersion}/${abbrev}/${chapter}`;
    
    console.log(`Fetching: ${apiUrl}`);
    
    const response = await fetch(apiUrl, {
      headers: {
        "Accept": "application/json",
      },
    });

    if (!response.ok) {
      console.error(`API error: ${response.status}`);
      throw new Error(`Bible API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.verses || !Array.isArray(data.verses)) {
      throw new Error("Invalid response from Bible API");
    }

    // Transform to our format
    const verses = data.verses.map((v: { number: number; text: string }) => ({
      number: v.number,
      text: v.text,
    }));

    return new Response(
      JSON.stringify({
        bookId,
        chapter,
        version: apiVersion,
        verses,
        bookName: data.book?.name || bookId,
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