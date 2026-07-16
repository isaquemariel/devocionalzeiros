import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { enforceUsage } from "../_shared/enforce-usage.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
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

SUAS FONTES PRIMÁRIAS (cite SEMPRE de forma específica):
1. Comentário Bíblico de Matthew Henry (1662-1714) - Exegese clássica reformada
2. Comentário Bíblico Moody - Análise evangélica conservadora  
3. Comentários de Hernandes Dias Lopes - Perspectiva brasileira contemporânea
4. Comentários de Charles Spurgeon (1834-1892) - O Príncipe dos Pregadores
5. Comentário Bíblico de John MacArthur - Teologia reformada moderna
6. Comentário Bíblico de Warren Wiersbe - Aplicação prática
7. Léxico Strong's para palavras hebraicas/gregas

REGRAS DE VERACIDADE (CRÍTICO):
1. NUNCA invente citações ou atribuições falsas
2. Cite APENAS informações verificáveis de comentaristas reconhecidos
3. Se não tiver certeza sobre uma fonte específica, use: "Baseado na tradição exegética reformada"
4. Palavras no original DEVEM ser verificáveis nos léxicos Strong's/TWOT/BDAG
5. Referências cruzadas devem ser RELEVANTES e REAIS - verifique que existem na Bíblia

DIRETRIZES ESTRITAS:
1. Para o Antigo Testamento: Identifique 1-3 palavras-chave em HEBRAICO com:
   - A palavra em caracteres hebraicos (ex: אֱלֹהִים)
   - Transliteração precisa (ex: Elohim)
   - Número Strong's quando relevante (ex: H430)
   - Significado teológico baseado em léxicos como Strong's, TWOT ou BDB

2. Para o Novo Testamento: Identifique 1-3 palavras-chave em GREGO com:
   - A palavra em caracteres gregos (ex: ἀγάπη)
   - Transliteração precisa (ex: agapē)
   - Número Strong's quando relevante (ex: G26)
   - Significado baseado em léxicos como Thayer, BDAG ou Strong's

3. Forneça uma exegese concisa (2-3 parágrafos):
   - Contexto histórico-gramatical verificável
   - Aplicação prática para o cristão hoje
   - Sempre com perspectiva protestante/reformada

4. Inclua 2-4 referências cruzadas relevantes (formato: "Livro Capítulo:Versículo")
   - Verifique que as referências existem e são tematicamente relacionadas

5. SEMPRE cite a fonte específica do comentário usado de forma honesta

FORMATO DE RESPOSTA (JSON PURO, sem markdown):
{
  "commentary": "Texto do comentário exegético aqui...",
  "keyWords": [
    {
      "word": "palavra traduzida",
      "original": "palavra original com caracteres",
      "language": "hebrew" ou "greek",
      "transliteration": "transliteração",
      "meaning": "significado profundo baseado em léxico (cite Strong's se aplicável)"
    }
  ],
  "crossReferences": ["Gn 1:1", "Jo 1:1", "Hb 1:1"],
  "source": "Baseado em [Nome do Comentarista], [Nome da Obra] ou 'Tradição exegética reformada'"
}`;

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000;
// A single verse is short; cap incoming text to bound prompt-injection surface
// and token cost. Longer payloads are rejected.
const MAX_VERSE_TEXT_LEN = 2000;

// Normalize verse text for equality comparison (whitespace/case/punctuation-insensitive
// enough to tolerate cosmetic differences while still detecting a different text).
function normalizeVerseText(t: unknown): string {
  return String(t ?? "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

async function callAIWithRetry(
  apiKey: string,
  userPrompt: string,
  retryCount: number = 0
): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`AI Gateway error (attempt ${retryCount + 1}):`, response.status, errorText);
      
      // Don't retry on rate limit or payment errors
      if (response.status === 429 || response.status === 402) {
        return { success: false, error: response.status === 429 
          ? "Limite de requisições atingido. Tente novamente em alguns segundos." 
          : "Créditos insuficientes. Contate o suporte."
        };
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
      let jsonStr = content.trim();
      const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
      if (jsonMatch) {
        jsonStr = jsonMatch[1].trim();
      }
      study = JSON.parse(jsonStr);
      
      // Validate required fields
      if (!study.commentary || study.commentary.length < 50) {
        throw new Error("Commentary too short or missing");
      }
    } catch (parseError) {
      console.error("JSON parse error:", parseError, "Content:", content.substring(0, 200));
      // Create a fallback response from raw text
      study = {
        commentary: content.replace(/```json|```/g, '').trim(),
        keyWords: [],
        crossReferences: [],
        source: "Baseado na tradição exegética reformada",
      };
    }

    return { success: true, data: study };
  } catch (err) {
    console.error(`Error calling AI (attempt ${retryCount + 1}/${MAX_RETRIES}):`, err);
    
    if (retryCount < MAX_RETRIES - 1) {
      console.log(`Retrying in ${RETRY_DELAY_MS}ms...`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
      return callAIWithRetry(apiKey, userPrompt, retryCount + 1);
    }
    
    return { success: false, error: "Falha ao gerar comentário após várias tentativas." };
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // ===== AUTHENTICATION CHECK =====
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.error("Missing or invalid Authorization header");
      return new Response(
        JSON.stringify({ error: "Não autorizado. Faça login para continuar." }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // Create auth client to verify user
    const authClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } }
    });

    const { data: { user }, error: authError } = await authClient.auth.getUser();

    if (authError || !user) {
      console.error("Authentication failed:", authError);
      return new Response(
        JSON.stringify({ error: "Token inválido ou expirado. Faça login novamente." }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const userId = user.id;
    console.log("Authenticated user:", userId);
    // ===== END AUTHENTICATION CHECK =====

    const { bookId, bookName, chapter, verseNumber, verseText, testament } = await req.json();

    if (!bookName || !chapter || !verseNumber || !verseText) {
      throw new Error("Missing required fields: bookName, chapter, verseNumber, verseText");
    }

    if (typeof verseText !== "string" || verseText.length > MAX_VERSE_TEXT_LEN) {
      return new Response(
        JSON.stringify({ error: "Texto do versículo inválido." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
    if (!OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is not configured");
    }

    // Create service role client for cache operations
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Check cache first
    const cacheKey = bookId || bookName.toLowerCase().replace(/\s+/g, '');
    const { data: cachedStudy, error: cacheError } = await supabase
      .from("verse_studies_cache")
      .select("*")
      .eq("book_id", cacheKey)
      .eq("chapter_number", chapter)
      .eq("verse_number", verseNumber)
      .maybeSingle();

    if (cacheError) {
      console.error("Cache lookup error:", cacheError);
    }

    // Only serve cache when the stored verse text matches the requested text.
    // The cache is shared across all users by verse coordinates, but the AI
    // output is derived from the client-supplied verseText. Serving only on a
    // text match prevents one user's manipulated/injected verse text from
    // poisoning the commentary shown to everyone; a mismatch regenerates and
    // overwrites the entry with the correct text (self-healing).
    const cacheTextMatches =
      cachedStudy && normalizeVerseText(cachedStudy.verse_text) === normalizeVerseText(verseText);

    if (cacheTextMatches && cachedStudy.commentary && cachedStudy.commentary.length > 50) {
      console.log(`Cache hit for ${bookName} ${chapter}:${verseNumber}`);
      return new Response(
        JSON.stringify({
          verseNumber,
          commentary: cachedStudy.commentary,
          keyWords: cachedStudy.key_words || [],
          crossReferences: cachedStudy.cross_references || [],
          source: cachedStudy.source || "Tradição exegética reformada",
          fromCache: true,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Generating study for ${bookName} ${chapter}:${verseNumber} by user ${userId}`);

    const gate = await enforceUsage(authHeader, "study_bible_verse_explanation");
    if (gate) return gate;


    const userPrompt = `Analise o seguinte versículo bíblico e forneça um comentário de estudo detalhado:

Livro: ${bookName}
Capítulo: ${chapter}
Versículo: ${verseNumber}
Texto: "${verseText}"
Testamento: ${testament === 'old' ? 'Antigo Testamento (use análise do HEBRAICO)' : 'Novo Testamento (use análise do GREGO)'}

IMPORTANTE:
1. Forneça exegese VERDADEIRA baseada em comentaristas REAIS (Matthew Henry, Spurgeon, MacArthur, etc.)
2. Palavras-chave DEVEM ser verificáveis no léxico Strong's
3. Referências cruzadas DEVEM existir na Bíblia e ser tematicamente relevantes
4. Cite a fonte de forma honesta - não invente atribuições

Responda APENAS com JSON válido, sem markdown ou formatação.`;

    const aiResult = await callAIWithRetry(OPENAI_API_KEY, userPrompt);

    if (!aiResult.success) {
      return new Response(
        JSON.stringify({ error: aiResult.error }),
        { status: aiResult.error?.includes("Limite") ? 429 : 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const study = aiResult.data;

    // Save to cache for future requests (saves tokens)
    try {
      const { error: upsertError } = await supabase.from("verse_studies_cache").upsert({
        book_id: cacheKey,
        chapter_number: chapter,
        verse_number: verseNumber,
        verse_text: verseText,
        commentary: study.commentary,
        key_words: study.keyWords || [],
        cross_references: study.crossReferences || [],
        source: study.source || "Baseado na tradição exegética reformada",
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'book_id,chapter_number,verse_number'
      });
      
      if (upsertError) {
        console.error("Cache save error:", upsertError);
      } else {
        console.log(`Cached study for ${bookName} ${chapter}:${verseNumber}`);
      }
    } catch (cacheError) {
      console.error("Cache save exception:", cacheError);
      // Continue even if cache fails
    }

    return new Response(
      JSON.stringify({
        verseNumber,
        commentary: study.commentary,
        keyWords: study.keyWords || [],
        crossReferences: study.crossReferences || [],
        source: study.source || "Baseado na tradição exegética reformada",
        fromCache: false,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error in verse-study:", error);
    return new Response(
      JSON.stringify({ error: "Erro interno. Tente novamente." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
