import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Mapping of book IDs to API abbreviations for A Bíblia Digital
const BOOK_ABBREV_MAP: Record<string, { pt: string; en: string }> = {
  genesis: { pt: "gn", en: "gn" },
  exodus: { pt: "ex", en: "ex" },
  leviticus: { pt: "lv", en: "lv" },
  numbers: { pt: "nm", en: "nm" },
  deuteronomy: { pt: "dt", en: "dt" },
  joshua: { pt: "js", en: "js" },
  judges: { pt: "jz", en: "jg" },
  ruth: { pt: "rt", en: "rt" },
  "1samuel": { pt: "1sm", en: "1sm" },
  "2samuel": { pt: "2sm", en: "2sm" },
  "1kings": { pt: "1rs", en: "1kgs" },
  "2kings": { pt: "2rs", en: "2kgs" },
  "1chronicles": { pt: "1cr", en: "1ch" },
  "2chronicles": { pt: "2cr", en: "2ch" },
  ezra: { pt: "ed", en: "ezr" },
  nehemiah: { pt: "ne", en: "neh" },
  esther: { pt: "et", en: "est" },
  job: { pt: "jó", en: "job" },
  psalms: { pt: "sl", en: "ps" },
  proverbs: { pt: "pv", en: "prv" },
  ecclesiastes: { pt: "ec", en: "eccl" },
  songofsolomon: { pt: "ct", en: "sng" },
  isaiah: { pt: "is", en: "isa" },
  jeremiah: { pt: "jr", en: "jer" },
  lamentations: { pt: "lm", en: "lam" },
  ezekiel: { pt: "ez", en: "ezk" },
  daniel: { pt: "dn", en: "dan" },
  hosea: { pt: "os", en: "hos" },
  joel: { pt: "jl", en: "jol" },
  amos: { pt: "am", en: "amo" },
  obadiah: { pt: "ob", en: "oba" },
  jonah: { pt: "jn", en: "jon" },
  micah: { pt: "mq", en: "mic" },
  nahum: { pt: "na", en: "nam" },
  habakkuk: { pt: "hc", en: "hab" },
  zephaniah: { pt: "sf", en: "zep" },
  haggai: { pt: "ag", en: "hag" },
  zechariah: { pt: "zc", en: "zec" },
  malachi: { pt: "ml", en: "mal" },
  matthew: { pt: "mt", en: "mt" },
  mark: { pt: "mc", en: "mk" },
  luke: { pt: "lc", en: "lk" },
  john: { pt: "jo", en: "jn" },
  acts: { pt: "at", en: "act" },
  romans: { pt: "rm", en: "rom" },
  "1corinthians": { pt: "1co", en: "1cor" },
  "2corinthians": { pt: "2co", en: "2cor" },
  galatians: { pt: "gl", en: "gal" },
  ephesians: { pt: "ef", en: "eph" },
  philippians: { pt: "fp", en: "php" },
  colossians: { pt: "cl", en: "col" },
  "1thessalonians": { pt: "1ts", en: "1thess" },
  "2thessalonians": { pt: "2ts", en: "2thess" },
  "1timothy": { pt: "1tm", en: "1tim" },
  "2timothy": { pt: "2tm", en: "2tim" },
  titus: { pt: "tt", en: "tit" },
  philemon: { pt: "fm", en: "phlm" },
  hebrews: { pt: "hb", en: "heb" },
  james: { pt: "tg", en: "jas" },
  "1peter": { pt: "1pe", en: "1pet" },
  "2peter": { pt: "2pe", en: "2pet" },
  "1john": { pt: "1jo", en: "1jn" },
  "2john": { pt: "2jo", en: "2jn" },
  "3john": { pt: "3jo", en: "3jn" },
  jude: { pt: "jd", en: "jude" },
  revelation: { pt: "ap", en: "rev" },
};

const systemPrompt = `Você é um teólogo protestante reformado, especializado em exegese bíblica, hermenêutica e teologia sistemática.

SUAS FONTES PRIMÁRIAS (cite sempre):
1. Comentário Bíblico de Matthew Henry - Exegese clássica reformada
2. Comentário Bíblico Moody - Análise evangélica conservadora  
3. Comentários de Hernandes Dias Lopes - Perspectiva brasileira contemporânea
4. Bíblia de Estudo Spurgeon - Insights de Charles Spurgeon
5. Bíblia Thompson - Referências em cadeia temáticas
6. Bíblia de Estudo Palavra-Chave - Análise léxica hebraico/grego

DIRETRIZES ESTRITAS:
1. Para o Antigo Testamento: Identifique 1-3 palavras-chave em HEBRAICO com:
   - A palavra em caracteres hebraicos (ex: אֱלֹהִים)
   - Transliteração precisa (ex: Elohim)
   - Significado teológico profundo baseado em léxicos como Strong's, TWOT ou BDB

2. Para o Novo Testamento: Identifique 1-3 palavras-chave em GREGO com:
   - A palavra em caracteres gregos (ex: ἀγάπη)
   - Transliteração precisa (ex: agapē)
   - Significado baseado em léxicos como Thayer, BDAG ou Strong's

3. Forneça uma exegese concisa (2-3 parágrafos):
   - Contexto histórico-gramatical
   - Aplicação prática para o cristão hoje
   - Sempre com perspectiva protestante/reformada

4. Inclua 2-4 referências cruzadas relevantes (formato: "Livro Capítulo:Versículo")

5. SEMPRE cite a fonte específica do comentário usado (ex: "Baseado em Matthew Henry, Comentário Bíblico Completo")

FORMATO DE RESPOSTA (JSON PURO, sem markdown):
{
  "commentary": "Texto do comentário exegético aqui...",
  "keyWords": [
    {
      "word": "palavra traduzida",
      "original": "palavra original com caracteres",
      "language": "hebrew" ou "greek",
      "transliteration": "transliteração",
      "meaning": "significado profundo baseado em léxico"
    }
  ],
  "crossReferences": ["Gn 1:1", "Jo 1:1", "Hb 1:1"],
  "source": "Baseado em [Nome do Comentarista], [Nome da Obra]"
}`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { bookId, bookName, chapter, verseNumber, verseText, testament } = await req.json();

    if (!bookName || !chapter || !verseNumber || !verseText) {
      throw new Error("Missing required fields: bookName, chapter, verseNumber, verseText");
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Create Supabase client for cache operations
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Check cache first
    const cacheKey = bookId || bookName.toLowerCase().replace(/\s+/g, '');
    const { data: cachedStudy } = await supabase
      .from("verse_studies_cache")
      .select("*")
      .eq("book_id", cacheKey)
      .eq("chapter_number", chapter)
      .eq("verse_number", verseNumber)
      .maybeSingle();

    if (cachedStudy) {
      console.log(`Cache hit for ${bookName} ${chapter}:${verseNumber}`);
      return new Response(
        JSON.stringify({
          verseNumber,
          commentary: cachedStudy.commentary,
          keyWords: cachedStudy.key_words || [],
          crossReferences: cachedStudy.cross_references || [],
          source: cachedStudy.source,
          fromCache: true,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Generating study for ${bookName} ${chapter}:${verseNumber}`);

    const userPrompt = `Analise o seguinte versículo bíblico e forneça um comentário de estudo detalhado:

Livro: ${bookName}
Capítulo: ${chapter}
Versículo: ${verseNumber}
Texto: "${verseText}"
Testamento: ${testament === 'old' ? 'Antigo Testamento (use análise do HEBRAICO)' : 'Novo Testamento (use análise do GREGO)'}

Forneça:
1. Exegese prática baseada em comentaristas confiáveis
2. Palavras-chave no idioma original (${testament === 'old' ? 'hebraico com caracteres hebraicos' : 'grego com caracteres gregos'})
3. Referências cruzadas relevantes
4. Cite a fonte específica do comentário

Responda APENAS com JSON válido, sem markdown ou formatação.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Limite de requisições atingido. Tente novamente em alguns segundos." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Créditos insuficientes. Contate o suporte." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No content in AI response");
    }

    // Parse JSON response from AI
    let study;
    try {
      // Extract JSON from markdown code blocks if present
      let jsonStr = content.trim();
      const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
      if (jsonMatch) {
        jsonStr = jsonMatch[1].trim();
      }
      study = JSON.parse(jsonStr);
    } catch (parseError) {
      console.error("JSON parse error:", parseError, "Content:", content);
      // Create a fallback response
      study = {
        commentary: content.replace(/```json|```/g, '').trim(),
        keyWords: [],
        crossReferences: [],
        source: "Comentário gerado por IA baseado em fontes teológicas protestantes",
      };
    }

    // Save to cache
    try {
      await supabase.from("verse_studies_cache").upsert({
        book_id: cacheKey,
        chapter_number: chapter,
        verse_number: verseNumber,
        verse_text: verseText,
        commentary: study.commentary,
        key_words: study.keyWords || [],
        cross_references: study.crossReferences || [],
        source: study.source,
      }, {
        onConflict: 'book_id,chapter_number,verse_number'
      });
      console.log(`Cached study for ${bookName} ${chapter}:${verseNumber}`);
    } catch (cacheError) {
      console.error("Cache save error:", cacheError);
      // Continue even if cache fails
    }

    return new Response(
      JSON.stringify({
        verseNumber,
        commentary: study.commentary,
        keyWords: study.keyWords || [],
        crossReferences: study.crossReferences || [],
        source: study.source,
        fromCache: false,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error in verse-study:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});