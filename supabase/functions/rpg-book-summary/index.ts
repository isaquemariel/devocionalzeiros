import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    // User authentication required
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Não autorizado" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const authClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: claimsData, error: claimsError } = await authClient.auth.getClaims(
      authHeader.replace("Bearer ", "")
    );
    if (claimsError || !claimsData?.claims?.sub) {
      return new Response(JSON.stringify({ error: "Token inválido" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { type, bookName, chapter } = await req.json();
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const summaryType = type === "book" ? "book" : "chapter";
    const chapterNum = type === "book" ? 0 : (chapter || 0);

    // Check cache first
    const { data: cached } = await supabase
      .from("rpg_summaries_cache")
      .select("summary_data")
      .eq("summary_type", summaryType)
      .eq("book_name", bookName)
      .eq("chapter_number", chapterNum)
      .maybeSingle();

    if (cached) {
      console.log("Cache hit for", summaryType, bookName, chapterNum);
      return new Response(JSON.stringify(cached.summary_data), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("Cache miss, generating for", summaryType, bookName, chapterNum);

    const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
    if (!OPENAI_API_KEY) throw new Error("OPENAI_API_KEY not configured");

    let systemPrompt: string;
    let userPrompt: string;

    if (type === "book") {
      systemPrompt = `Você é um teólogo bíblico carismático que serve como guia em um RPG bíblico. Fale de forma empolgante mas teologicamente precisa, como um mentor animado. Use emojis com moderação. Responda em JSON válido.`;
      userPrompt = `Gere um resumo introdutório do livro "${bookName}" da Bíblia para um jogador que está prestes a começar a lê-lo em um RPG bíblico.

Retorne JSON com esta estrutura:
{
  "greeting": "Uma saudação empolgante do mascote ao jogador (1 frase curta)",
  "title": "Título criativo para a introdução (ex: 'Bem-vindo ao Livro de Gênesis!')",
  "author": "Quem escreveu e quando (1-2 frases)",
  "context": "Contexto histórico essencial (2-3 frases)",
  "mainTheme": "O tema central do livro (1-2 frases)",
  "whatToExpect": "O que o jogador vai encontrar nessa jornada (2-3 frases empolgantes)",
  "funFact": "Uma curiosidade teológica REAL e surpreendente sobre o livro — algo acadêmico, histórico ou exegético pouco conhecido (NÃO repita o significado do nome do livro, isso já é mostrado em outro lugar). Exemplos: manuscritos antigos, controvérsias rabínicas, paralelos com textos do Antigo Oriente Próximo, detalhes do texto original hebraico/grego, descobertas arqueológicas relacionadas. (1-2 frases)"
}

Seja CONCISO mas EMPOLGANTE. Máximo 200 palavras total.`;
    } else {
      systemPrompt = `Você é um teólogo bíblico carismático que serve como guia em um RPG bíblico. Fale de forma empolgante mas teologicamente precisa. Use emojis com moderação. Responda em JSON válido.`;
      userPrompt = `Gere um breve resumo introdutório para ${bookName} capítulo ${chapter} da Bíblia, para preparar o jogador antes da leitura.

Retorne JSON com esta estrutura:
{
  "greeting": "Uma frase curta do mascote motivando o jogador para este capítulo",
  "summary": "Resumo do que acontece neste capítulo (3-4 frases, sem spoilers demais)",
  "keyVerse": "Um versículo-chave para prestar atenção durante a leitura",
  "challenge": "Um desafio ou pergunta para o jogador refletir durante a leitura (1 frase)"
}

Seja CONCISO. Máximo 120 palavras total.`;
    }

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
      }),
    });

    if (!response.ok) {
      const status = response.status;
      if (status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded" }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      throw new Error(`AI error: ${status}`);
    }

    const aiData = await response.json();
    const content = aiData.choices?.[0]?.message?.content || "";
    
    let parsed;
    try {
      const jsonStr = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      parsed = JSON.parse(jsonStr);
    } catch {
      parsed = { greeting: "Vamos nessa! 📖", summary: content, error: "parse_fallback" };
    }

    // Save to cache
    const { error: cacheError } = await supabase
      .from("rpg_summaries_cache")
      .upsert({
        summary_type: summaryType,
        book_name: bookName,
        chapter_number: chapterNum,
        summary_data: parsed,
      }, {
        onConflict: "summary_type,book_name,chapter_number",
        ignoreDuplicates: false,
      });

    if (cacheError) {
      console.error("Cache save error:", cacheError);
    } else {
      console.log("Cached successfully for", summaryType, bookName, chapterNum);
    }

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("rpg-book-summary error:", e);
    return new Response(JSON.stringify({ error: "Erro interno. Tente novamente." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
