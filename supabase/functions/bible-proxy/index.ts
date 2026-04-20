import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

function isVerseTruncated(text: string): boolean {
  const clean = text.replace(/<[^>]*>/g, '').trim();
  if (clean.length < 15) return true;
  const lastChar = clean[clean.length - 1];
  if (!['.', '!', '?', ';', ':', '"', "'", '»', '…'].includes(lastChar)) {
    if (clean.length < 60) return true;
  }
  return false;
}

function chapterHasCorruptedVerses(verses: { verse: number; text: string }[]): boolean {
  return verses.some(v => isVerseTruncated(v.text));
}

async function fetchFromBolls(translation: string, bookNumber: number, chapter: number): Promise<{ verse: number; text: string }[] | null> {
  try {
    const url = `https://bolls.life/get-chapter/${translation}/${bookNumber}/${chapter}/`;
    const response = await fetch(url, {
      headers: { 'Accept': 'application/json' },
      signal: AbortSignal.timeout(8000),
    });

    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        return data;
      }
    }
  } catch (e) {
    console.log(`bolls.life ${translation} failed:`, e);
  }
  return null;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { bookNumber, chapter, translation = 'ARC' } = await req.json();

    if (!bookNumber || !chapter) {
      return new Response(JSON.stringify({ error: 'bookNumber and chapter are required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    let verses: { verse: number; text: string }[] | null = null;

    // 1. Tenta APENAS a tradução solicitada (sem trocar silenciosamente entre versões,
    // o que causaria mistura de traduções e incoerência percebida pelo usuário).
    verses = await fetchFromBolls(translation, bookNumber, chapter);

    // 2. Se a tradução pedida não retornou nada, recorre a ARC como último recurso de fonte.
    if ((!verses || verses.length === 0) && translation !== 'ARC') {
      console.log(`${translation} indisponível para livro ${bookNumber} ch ${chapter}, tentando ARC...`);
      verses = await fetchFromBolls('ARC', bookNumber, chapter);
    }

    // 3. Fallback: bible-api.com (Almeida em português - estável)
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
    }

    if (!verses || verses.length === 0) {
      return new Response(JSON.stringify({ error: 'Could not load chapter from any source' }), {
        status: 503,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Sanitize and sort
    verses = verses
      .map(v => ({ verse: v.verse, text: v.text.replace(/<[^>]*>/g, '').trim() }))
      .sort((a, b) => a.verse - b.verse);

    return new Response(JSON.stringify({ verses }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Bible proxy error:', error);
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
