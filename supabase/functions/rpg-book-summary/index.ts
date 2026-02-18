import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { type, bookName, chapter } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

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
  "funFact": "Um fato curioso ou interessante sobre o livro (1 frase)"
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
      const status = response.status;
      if (status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded" }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      if (status === 402) {
        return new Response(JSON.stringify({ error: "Credits required" }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      throw new Error(`AI gateway error: ${status}`);
    }

    const aiData = await response.json();
    const content = aiData.choices?.[0]?.message?.content || "";
    
    // Parse JSON from content (handle markdown code blocks)
    let parsed;
    try {
      const jsonStr = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      parsed = JSON.parse(jsonStr);
    } catch {
      parsed = { greeting: "Vamos nessa! 📖", summary: content, error: "parse_fallback" };
    }

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("rpg-book-summary error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
