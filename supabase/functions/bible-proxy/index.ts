import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.89.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const ALLOWED_TRANSLATIONS = new Set([
  'ARC', 'ARA', 'NVI', 'NTLH', 'ACF', 'AA', 'BLT', 'KJV', 'NIV', 'ESV', 'SKTD',
]);

function isVerseTruncated(text: string): boolean {
  const clean = text.replace(/<[^>]*>/g, '').trim();
  if (clean.length < 15) return true;
  const lastChar = clean[clean.length - 1];
  if (!['.', '!', '?', ';', ':', '"', "'", '»', '…'].includes(lastChar)) {
    if (clean.length < 60) return true;
  }
  return false;
}

async function fetchFromBolls(translation: string, bookNumber: number, chapter: number): Promise<{ verse: number; text: string }[] | null> {
  const url = `https://bolls.life/get-chapter/${encodeURIComponent(translation)}/${bookNumber}/${chapter}/`;
  // Retry com backoff curto — bolls.life dá "Connection reset by peer" esporádico
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await fetch(url, {
        headers: { 'Accept': 'application/json' },
        signal: AbortSignal.timeout(8000),
      });
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) return data;
      }
    } catch (e) {
      console.log(`bolls.life ${translation} attempt ${attempt + 1} failed:`, (e as Error).message);
    }
    if (attempt < 2) await new Promise(r => setTimeout(r, 300 * (attempt + 1)));
  }
  return null;
}

// Fallback adicional via CDN jsDelivr (wldeh/bible-api) — Português Almeida
async function fetchFromWldeh(bookSlug: string, chapter: number): Promise<{ verse: number; text: string }[] | null> {
  const WLDEH_SLUGS: Record<string, string> = {
    genesis: 'GEN', exodus: 'EXO', leviticus: 'LEV', numbers: 'NUM', deuteronomy: 'DEU',
    joshua: 'JOS', judges: 'JDG', ruth: 'RUT', '1samuel': '1SA', '2samuel': '2SA',
    '1kings': '1KI', '2kings': '2KI', '1chronicles': '1CH', '2chronicles': '2CH',
    ezra: 'EZR', nehemiah: 'NEH', esther: 'EST', job: 'JOB', psalms: 'PSA',
    proverbs: 'PRO', ecclesiastes: 'ECC', 'song of solomon': 'SNG', isaiah: 'ISA',
    jeremiah: 'JER', lamentations: 'LAM', ezekiel: 'EZK', daniel: 'DAN', hosea: 'HOS',
    joel: 'JOL', amos: 'AMO', obadiah: 'OBA', jonah: 'JON', micah: 'MIC', nahum: 'NAM',
    habakkuk: 'HAB', zephaniah: 'ZEP', haggai: 'HAG', zechariah: 'ZEC', malachi: 'MAL',
    matthew: 'MAT', mark: 'MRK', luke: 'LUK', john: 'JHN', acts: 'ACT', romans: 'ROM',
    '1corinthians': '1CO', '2corinthians': '2CO', galatians: 'GAL', ephesians: 'EPH',
    philippians: 'PHP', colossians: 'COL', '1thessalonians': '1TH', '2thessalonians': '2TH',
    '1timothy': '1TI', '2timothy': '2TI', titus: 'TIT', philemon: 'PHM', hebrews: 'HEB',
    james: 'JAS', '1peter': '1PE', '2peter': '2PE', '1john': '1JN', '2john': '2JN',
    '3john': '3JN', jude: 'JUD', revelation: 'REV',
  };
  const code = WLDEH_SLUGS[bookSlug];
  if (!code) return null;
  try {
    const url = `https://cdn.jsdelivr.net/gh/wldeh/bible-api/bibles/pt-almeida/books/${code}/chapters/${chapter}.json`;
    const response = await fetch(url, { signal: AbortSignal.timeout(10000) });
    if (!response.ok) return null;
    const data = await response.json();
    const verses = data?.data;
    if (!Array.isArray(verses) || verses.length === 0) return null;
    return verses.map((v: { verse: string | number; text: string }) => ({
      verse: typeof v.verse === 'string' ? parseInt(v.verse, 10) : v.verse,
      text: String(v.text).trim(),
    }));
  } catch (e) {
    console.log('wldeh CDN failed:', (e as Error).message);
    return null;
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Require authenticated user
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
    );
    const token = authHeader.replace('Bearer ', '');
    const { data: claimsData, error: claimsError } = await supabase.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const body = await req.json();
    const rawBook = body?.bookNumber;
    const rawChapter = body?.chapter;
    const rawTranslation = typeof body?.translation === 'string' ? body.translation : 'ARC';

    const bookNumber = Number(rawBook);
    const chapter = Number(rawChapter);

    if (!Number.isInteger(bookNumber) || bookNumber < 1 || bookNumber > 66) {
      return new Response(JSON.stringify({ error: 'bookNumber must be an integer between 1 and 66' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    if (!Number.isInteger(chapter) || chapter < 1 || chapter > 200) {
      return new Response(JSON.stringify({ error: 'chapter must be a positive integer' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Sanitize translation: only allow A-Z0-9, max 10 chars, must be in allowlist (fallback to ARC)
    const cleanTranslation = rawTranslation.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10);
    const translation = ALLOWED_TRANSLATIONS.has(cleanTranslation) ? cleanTranslation : 'ARC';

    let verses: { verse: number; text: string }[] | null = null;

    verses = await fetchFromBolls(translation, bookNumber, chapter);

    if ((!verses || verses.length === 0) && translation !== 'ARC') {
      console.log(`${translation} indisponível para livro ${bookNumber} ch ${chapter}, tentando ARC...`);
      verses = await fetchFromBolls('ARC', bookNumber, chapter);
    }

    if (!verses || verses.length === 0) {
      try {
        const BOOK_SLUGS: Record<number, string> = {
          1:'genesis',2:'exodus',3:'leviticus',4:'numbers',5:'deuteronomy',6:'joshua',7:'judges',8:'ruth',
          9:'1samuel',10:'2samuel',11:'1kings',12:'2kings',13:'1chronicles',14:'2chronicles',15:'ezra',
          16:'nehemiah',17:'esther',18:'job',19:'psalms',20:'proverbs',21:'ecclesiastes',22:'song of solomon',
          23:'isaiah',24:'jeremiah',25:'lamentations',26:'ezekiel',27:'daniel',28:'hosea',29:'joel',30:'amos',
          31:'obadiah',32:'jonah',33:'micah',34:'nahum',35:'habakkuk',36:'zephaniah',37:'haggai',38:'zechariah',
          39:'malachi',40:'matthew',41:'mark',42:'luke',43:'john',44:'acts',45:'romans',46:'1corinthians',
          47:'2corinthians',48:'galatians',49:'ephesians',50:'philippians',51:'colossians',52:'1thessalonians',
          53:'2thessalonians',54:'1timothy',55:'2timothy',56:'titus',57:'philemon',58:'hebrews',59:'james',
          60:'1peter',61:'2peter',62:'1john',63:'2john',64:'3john',65:'jude',66:'revelation',
        };
        const slug = BOOK_SLUGS[bookNumber];
        if (slug) {
          const url = `https://bible-api.com/${encodeURIComponent(slug)}+${chapter}?translation=almeida`;
          const response = await fetch(url, { signal: AbortSignal.timeout(10000) });
          if (response.ok) {
            const data = await response.json();
            if (data?.verses && Array.isArray(data.verses)) {
              verses = data.verses.map((v: { verse: number; text: string }) => ({
                verse: v.verse,
                text: v.text.trim(),
              }));
              console.log(`bible-api.com fallback succeeded for ${slug} ${chapter}`);
            }
          }
        }
      } catch (e) {
        console.log('bible-api.com fallback also failed:', e);
      }

      // Terceiro fallback: CDN jsDelivr (wldeh/bible-api) — pt-almeida
      if (!verses || verses.length === 0) {
        const slug = BOOK_SLUGS[bookNumber];
        if (slug) {
          verses = await fetchFromWldeh(slug, chapter);
          if (verses && verses.length > 0) {
            console.log(`wldeh CDN fallback succeeded for ${slug} ${chapter}`);
          }
        }
      }
    }

    if (!verses || verses.length === 0) {
      return new Response(JSON.stringify({ error: 'Could not load chapter from any source' }), {
        status: 503,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    verses = verses
      .map(v => ({ verse: v.verse, text: v.text.replace(/<[^>]*>/g, '').trim() }))
      .sort((a, b) => a.verse - b.verse);

    return new Response(JSON.stringify({ verses }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Bible proxy error:', error);
    return new Response(JSON.stringify({ error: 'Internal error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
