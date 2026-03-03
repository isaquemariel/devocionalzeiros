import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { bookNumber, chapter } = await req.json();

    if (!bookNumber || !chapter) {
      return new Response(JSON.stringify({ error: 'bookNumber and chapter are required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Try bolls.life first (ARA - Almeida Revista e Atualizada)
    let verses: { verse: number; text: string }[] | null = null;

    try {
      const bollsUrl = `https://bolls.life/get-chapter/ARA/${bookNumber}/${chapter}/`;
      const response = await fetch(bollsUrl, {
        headers: { 'Accept': 'application/json' },
        signal: AbortSignal.timeout(8000),
      });

      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          verses = data;
        }
      }
    } catch (e) {
      console.log('bolls.life failed, trying fallback:', e);
    }

    // Fallback: try getBible.net API (also has ARA)
    if (!verses) {
      try {
        const getBibleUrl = `https://getbible.net/json?scrip=${bookNumber}+${chapter}&v=almeida`;
        const response = await fetch(getBibleUrl, {
          signal: AbortSignal.timeout(8000),
        });

        if (response.ok) {
          let text = await response.text();
          // getBible wraps in jQuery callback
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

    // Sort and return
    verses.sort((a, b) => a.verse - b.verse);

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
