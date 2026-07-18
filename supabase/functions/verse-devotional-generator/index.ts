import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { enforceUsage, refundUsage } from "../_shared/enforce-usage.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// A single verse (+ optional commentary) is short; cap incoming free text to
// bound prompt-injection surface and token cost.
const MAX_VERSE_TEXT_LEN = 2000;
const MAX_COMMENTARY_LEN = 8000;

// Normalize verse text for equality comparison, tolerating cosmetic differences.
function normalizeVerseText(t: unknown): string {
  return String(t ?? "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  let committedFeatureKey: string | null = null;
  const authHeader = req.headers.get("Authorization");

  try {
    // ===== AUTHENTICATION CHECK =====
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

    const { bookName, chapter, verseNumber, verseText, commentary, bookId } = await req.json();

    if (typeof verseText !== "string" || verseText.length > MAX_VERSE_TEXT_LEN ||
        (commentary != null && (typeof commentary !== "string" || commentary.length > MAX_COMMENTARY_LEN))) {
      return new Response(
        JSON.stringify({ error: "Conteúdo do versículo inválido." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create service role client for cache operations
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const cacheBookId = bookId || bookName;

    // Check cache first
    const { data: cachedDevotional } = await supabase
      .from("verse_devotionals_cache")
      .select("devotional_data, verse_text")
      .eq("book_id", cacheBookId)
      .eq("chapter_number", chapter)
      .eq("verse_number", verseNumber)
      .maybeSingle();

    // Only serve cache when the stored verse text matches the request. The cache
    // is shared across users by verse coordinates but the output is derived from
    // the client-supplied verseText; serving only on a text match prevents a
    // manipulated verse text from poisoning the devotional shown to everyone.
    if (cachedDevotional &&
        normalizeVerseText(cachedDevotional.verse_text) === normalizeVerseText(verseText)) {
      console.log("Returning cached devotional for", bookName, chapter, verseNumber);
      return new Response(JSON.stringify(cachedDevotional.devotional_data), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("No cache found, generating new devotional for", bookName, chapter, verseNumber, "by user", userId);

    const gate = await enforceUsage(authHeader, "reading_verse_explanation");
    if (gate) return gate;
    committedFeatureKey = "reading_verse_explanation";

    
    const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
    if (!OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is not configured");
    }

    const systemPrompt = `Você é um escritor devocional cristão experiente, inspirado por autores como Max Lucado, Charles Spurgeon e C.S. Lewis. 
    Sua tarefa é criar um devocional profundo, edificante e prático baseado em um versículo bíblico específico e seu contexto.
    
    REGRAS IMPORTANTES:
    1. O devocional deve ser fiel ao contexto bíblico e teologicamente correto
    2. A meditação DEVE ter EXATAMENTE 2 parágrafos: primeiro parágrafo com a reflexão teológica profunda, segundo parágrafo com aplicação pessoal. Total de 100-150 palavras
    3. Seja CONCISO e PROFUNDO - cada palavra deve ter peso
    4. A oração deve ser sincera e pessoal (40-60 palavras)
    5. A frase do dia deve ser inspiradora e memorável
    6. A aplicação deve ser prática e específica (1-2 frases)
    7. Não invente fatos históricos ou informações que não são verdadeiras
    8. Responda APENAS em JSON válido, sem markdown ou texto adicional`;

    const userPrompt = `Crie um devocional completo baseado neste versículo:

Livro: ${bookName}
Capítulo: ${chapter}
Versículo: ${verseNumber}
Texto: "${verseText}"

${commentary ? `Contexto teológico do comentário bíblico: ${commentary}` : ''}

Retorne APENAS um JSON válido com esta estrutura exata:
{
  "title": "Título criativo e relevante para o devocional",
  "verse": {
    "text": "${verseText}",
    "reference": "${bookName} ${chapter}:${verseNumber}"
  },
  "meditation": "EXATAMENTE 2 parágrafos separados por \\n\\n: Primeiro parágrafo com reflexão teológica profunda. Segundo parágrafo com aplicação pessoal. Total 100-150 palavras.",
  "prayer": "Oração sincera e pessoal (40-60 palavras)",
  "phraseOfDay": {
    "text": "Frase inspiradora do dia",
    "author": "Nome do autor cristão reconhecido"
  },
  "application": "Aplicação prática para o dia (1-2 frases curtas)"
}`;

    // Retry logic for more resilience
    const MAX_RETRIES = 3;
    let lastError: Error | null = null;
    let content: string | null = null;

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        console.log(`Attempt ${attempt}/${MAX_RETRIES} to generate devotional`);
        
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: userPrompt },
            ],
            temperature: 0.7,
            max_tokens: 2000,
          }),
        });

        if (!response.ok) {
          if (response.status === 429) {
            if (committedFeatureKey) await refundUsage(authHeader, committedFeatureKey);
            return new Response(JSON.stringify({ error: "Limite de requisições excedido. Tente novamente mais tarde." }), {
              status: 429,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
          }
          if (response.status === 402) {
            if (committedFeatureKey) await refundUsage(authHeader, committedFeatureKey);
            return new Response(JSON.stringify({ error: "Créditos insuficientes. Por favor, adicione fundos." }), {
              status: 402,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
          }
          const errorText = await response.text();
          console.error(`AI gateway error (attempt ${attempt}):`, response.status, errorText);
          lastError = new Error(`AI gateway error: ${response.status}`);
          continue;
        }

        const data = await response.json();
        content = data.choices?.[0]?.message?.content;

        if (content && content.trim().length > 0) {
          console.log(`Successfully got content on attempt ${attempt}`);
          break;
        } else {
          console.warn(`Empty content on attempt ${attempt}, retrying...`);
          lastError = new Error("Empty response from AI");
        }
      } catch (fetchError) {
        console.error(`Fetch error on attempt ${attempt}:`, fetchError);
        lastError = fetchError instanceof Error ? fetchError : new Error(String(fetchError));
      }

      // Wait before retry (exponential backoff)
      if (attempt < MAX_RETRIES) {
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
      }
    }

    if (!content || content.trim().length === 0) {
      console.error("All retries failed:", lastError);
      if (committedFeatureKey) await refundUsage(authHeader, committedFeatureKey);
      return new Response(JSON.stringify({
        error: "Não foi possível gerar o devocional. Por favor, tente novamente."
      }), {
        status: 503,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Parse the JSON response
    let devotional;
    try {
      // Clean the response if it has markdown code blocks
      let cleanContent = content.trim();
      if (cleanContent.startsWith("```json")) {
        cleanContent = cleanContent.slice(7);
      }
      if (cleanContent.startsWith("```")) {
        cleanContent = cleanContent.slice(3);
      }
      if (cleanContent.endsWith("```")) {
        cleanContent = cleanContent.slice(0, -3);
      }
      devotional = JSON.parse(cleanContent.trim());
    } catch (e) {
      console.error("Failed to parse devotional JSON:", content);
      throw new Error("Failed to parse devotional content");
    }

    // Save to cache
    const { error: cacheError } = await supabase
      .from("verse_devotionals_cache")
      .upsert({
        book_id: cacheBookId,
        chapter_number: chapter,
        verse_number: verseNumber,
        verse_text: verseText,
        devotional_data: devotional,
      }, {
        onConflict: "book_id,chapter_number,verse_number"
      });

    if (cacheError) {
      console.error("Failed to cache devotional:", cacheError);
      // Don't fail the request, just log the error
    } else {
      console.log("Devotional cached successfully for", bookName, chapter, verseNumber);
    }

    return new Response(JSON.stringify(devotional), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("verse-devotional-generator error:", e);
    if (committedFeatureKey) await refundUsage(authHeader, committedFeatureKey);
    return new Response(JSON.stringify({ error: "Erro interno. Tente novamente." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
