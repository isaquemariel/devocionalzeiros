import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const systemPrompt = `Você é um teólogo protestante especializado em exegese bíblica e hermenêutica. 
Você conhece profundamente os comentários de Matthew Henry, Moody Bible Commentary e Hernandes Dias Lopes.
Sua tarefa é fornecer comentários versículo por versículo de passagens bíblicas.

DIRETRIZES:
1. Para versículos do Antigo Testamento, destaque palavras-chave em hebraico com transliteração e significado.
2. Para versículos do Novo Testamento, destaque palavras-chave em grego com transliteração e significado.
3. Forneça uma breve exegese prática (máximo 2-3 parágrafos).
4. Use uma teologia sistemática protestante/reformada.
5. Inclua referências cruzadas relevantes quando apropriado.
6. Cite a fonte do comentário quando baseado em autores específicos.

FORMATO DE RESPOSTA (JSON):
{
  "commentary": "Texto do comentário exegético",
  "keyWords": [
    {
      "word": "palavra em português",
      "original": "palavra original",
      "language": "hebrew" ou "greek",
      "transliteration": "transliteração",
      "meaning": "significado profundo"
    }
  ],
  "crossReferences": ["Gn 1:1", "Jo 1:1"],
  "source": "Baseado em Matthew Henry / Moody / Hernandes Dias Lopes"
}`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { bookName, chapter, verseNumber, verseText, testament } = await req.json();

    if (!bookName || !chapter || !verseNumber || !verseText) {
      throw new Error("Missing required fields: bookName, chapter, verseNumber, verseText");
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const userPrompt = `Analise o seguinte versículo bíblico e forneça um comentário de estudo:

Livro: ${bookName}
Capítulo: ${chapter}
Versículo: ${verseNumber}
Texto: "${verseText}"
Testamento: ${testament === 'old' ? 'Antigo Testamento' : 'Novo Testamento'}

Forneça um comentário exegético prático e destaque as palavras-chave no idioma original (${testament === 'old' ? 'hebraico' : 'grego'}).`;

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
        max_tokens: 1500,
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
      let jsonStr = content;
      const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/);
      if (jsonMatch) {
        jsonStr = jsonMatch[1];
      }
      study = JSON.parse(jsonStr);
    } catch {
      // If parsing fails, create a simple response
      study = {
        commentary: content,
        keyWords: [],
        crossReferences: [],
        source: "Comentário gerado por IA",
      };
    }

    return new Response(
      JSON.stringify({
        verseNumber,
        ...study,
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
