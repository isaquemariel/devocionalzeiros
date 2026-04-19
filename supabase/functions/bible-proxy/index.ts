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

    // 3. Final fallback: getBible.net
    if (!verses || verses.length === 0) {
      try {
        const getBibleUrl = `https://getbible.net/json?scrip=${bookNumber}+${chapter}&v=almeida`;
        const response = await fetch(getBibleUrl, {
          signal: AbortSignal.timeout(8000),
        });

        if (response.ok) {
          let text = await response.text();
          text = text.replace(/^.*?\(/, '').replace(/\);?$/, '');
          const data = JSON.parse(text);
          if (data && data.chapter) {
            verses = Object.entries(data.chapter).map(([key, val]: [string, unknown]) => ({
              verse: parseInt(key),
              text: (val as { verse: string }).verse,
            }));
          }
        }
      } catch (e) {
        console.log('getBible fallback also failed:', e);
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
