import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { bookName, chapter, verseNumber, verseText, commentary } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `Você é um escritor devocional cristão experiente, inspirado por autores como Max Lucado, Charles Spurgeon e C.S. Lewis. 
    Sua tarefa é criar um devocional profundo, edificante e prático baseado em um versículo bíblico específico e seu contexto.
    
    REGRAS IMPORTANTES:
    1. O devocional deve ser fiel ao contexto bíblico e teologicamente correto
    2. A meditação deve ter aproximadamente 200-300 palavras, profunda mas acessível
    3. A oração deve ser sincera e pessoal (50-100 palavras)
    4. A frase do dia deve ser inspiradora e memorável
    5. A aplicação deve ser prática e específica
    6. Não invente fatos históricos ou informações que não são verdadeiras
    7. Responda APENAS em JSON válido, sem markdown ou texto adicional`;

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
  "meditation": "Texto da meditação profunda (200-300 palavras)",
  "prayer": "Oração sincera e pessoal (50-100 palavras)",
  "phraseOfDay": {
    "text": "Frase inspiradora do dia",
    "author": "Nome do autor cristão reconhecido"
  },
  "application": "Aplicação prática para o dia (2-3 frases)"
}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
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
        return new Response(JSON.stringify({ error: "Limite de requisições excedido. Tente novamente mais tarde." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Créditos insuficientes. Por favor, adicione fundos." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "Erro ao gerar devocional" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No content in response");
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

    return new Response(JSON.stringify(devotional), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("verse-devotional-generator error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Erro desconhecido" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
